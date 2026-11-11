// HTTP: node server.js 8080
// HTTPS: node server.js 8443 --https --cert <server.crt> --key <server.key>
const http = require('http'), https = require('https');
const fs = require('fs'), path = require('path'), os = require('os');
const crypto = require('crypto');
const args = process.argv.slice(2), secure = args.includes('--https');
const PORT = Number(args[0]) || (secure ? 8443 : 8080), ROOT = __dirname;
const option = name => args[args.indexOf(name) + 1];
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8', '.crt': 'application/x-x509-ca-cert' };
// Chỉ chia sẻ tài nguyên của bản preview, không chia sẻ mã server hay khóa TLS.
const ALLOWED = /^(?:index\.html|mobile-setup\.html|manifest\.webmanifest|sw\.js|live-reload\.js|preview-ca\.crt|vendor\/[\w.-]+\.js|icons\/[\w.-]+\.png)$/;
const clients = new Set();
function versionOfFiles() {
  const hash = crypto.createHash('sha256');
  const names = ['index.html', 'manifest.webmanifest', 'sw.js', 'live-reload.js'];
  for (const dir of ['vendor', 'icons']) {
    if (fs.existsSync(path.join(ROOT, dir))) {
      for (const file of fs.readdirSync(path.join(ROOT, dir))) {
        const name = dir + '/' + file;
        if (ALLOWED.test(name)) names.push(name);
      }
    }
  }
  for (const name of names.sort()) {
    const file = path.join(ROOT, name);
    if (fs.existsSync(file)) hash.update(name).update(fs.readFileSync(file));
  }
  return hash.digest('hex');
}
let version = versionOfFiles(), reloadTimer;
const versionEvent = () => 'event: version\ndata: ' + JSON.stringify({ version }) + '\n\n';
const watcher = fs.watch(ROOT, { recursive: true }, (event, filename) => {
  const name = filename && String(filename).replace(/\\/g, '/');
  if (!name || !ALLOWED.test(name) || name === 'preview-ca.crt' || name === 'mobile-setup.html') return;
  clearTimeout(reloadTimer);
  reloadTimer = setTimeout(() => {
    try {
      const next = versionOfFiles();
      if (next === version) return;
      version = next;
      for (const client of clients) client.write(versionEvent());
      console.log('Đã cập nhật preview: ' + version.slice(0, 12));
    } catch (err) { console.error('Chưa đọc được bản vừa lưu: ' + err.message); }
  }, 400);
});
watcher.on('error', err => console.error('Không theo dõi được thay đổi: ' + err.message));
function serve(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end();
  }
  let pathname;
  try { pathname = decodeURIComponent(req.url.split('?')[0]); }
  catch { res.writeHead(400); return res.end(); }
  if (pathname === '/_preview/version') {
    const data = JSON.stringify({ version });
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Content-Length': Buffer.byteLength(data) });
    return res.end(req.method === 'HEAD' ? undefined : data);
  }
  if (pathname === '/_preview/events') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-store, no-transform', Connection: 'keep-alive', 'X-Accel-Buffering': 'no' });
    if (req.method === 'HEAD') return res.end();
    res.flushHeaders();
    res.write('retry: 1500\n' + versionEvent());
    clients.add(res);
    const heartbeat = setInterval(() => res.write(': heartbeat\n\n'), 15000);
    res.on('close', () => { clearInterval(heartbeat); clients.delete(res); });
    return;
  }
  const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
  if (!ALLOWED.test(relative)) { res.writeHead(404); return res.end(); }
  fs.readFile(path.join(ROOT, relative), (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Không tìm thấy'); }
    if (relative === 'index.html') {
      const script = '<script src="/live-reload.js" data-preview-version="' + version + '" defer></script>';
      data = Buffer.from(data.toString('utf8').replace(/<\/body>/i, script + '</body>'));
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(relative).toLowerCase()] || 'application/octet-stream',
      'Content-Length': data.length, 'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
      ...(relative === 'sw.js' ? { 'Service-Worker-Allowed': '/' } : {})
    });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
}
let server;
try {
  if (secure && (!args.includes('--cert') || !args.includes('--key'))) throw new Error('HTTPS cần --cert và --key. Chạy start-https.bat để tạo chứng chỉ.');
  server = secure ? https.createServer({ cert: fs.readFileSync(option('--cert')), key: fs.readFileSync(option('--key')), minVersion: 'TLSv1.2' }, serve) : http.createServer(serve);
} catch (err) { console.error(err.message); process.exit(1); }
server.on('error', err => { console.error('Không khởi động được server: ' + err.message); process.exit(1); });
server.listen(PORT, '0.0.0.0', () => {
  const protocol = secure ? 'https' : 'http';
  console.log('Prototype TATC đang chạy. Điện thoại cần kết nối mạng truy cập được máy tính:');
  for (const list of Object.values(os.networkInterfaces())) for (const a of list || []) if (a.family === 'IPv4' && !a.internal) console.log('  ' + protocol + '://' + a.address + ':' + PORT);
  console.log('Trên máy này: ' + protocol + '://localhost:' + PORT + '   (nhấn Ctrl+C để dừng)');
  console.log('Live reload đang bật: lưu file để tự cập nhật trên máy tính và điện thoại.');
  if (secure) console.log('Cài và tin cậy preview-ca.crt trên điện thoại trước khi cài PWA. Xem mobile-setup.html qua HTTP.');
});
