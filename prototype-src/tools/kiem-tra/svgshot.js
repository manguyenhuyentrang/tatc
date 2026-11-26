// Kết xuất tệp SVG ra PNG bằng Chrome chạy ngầm (để đối chiếu). node svgshot.js in.svg out.png width height
const { spawn } = require('child_process'), fs = require('fs'), path = require('path'), http = require('http'), url = require('url');
const [svg, png, W, H] = process.argv.slice(2);
const PORT = 9336, prof = path.join(__dirname, 'cdp-prof4');
const ch = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--remote-debugging-port=' + PORT, '--user-data-dir=' + prof, '--no-first-run', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJ = u => new Promise((res, rej) => http.get(u, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej));
(async () => {
  let tabs; for (let i = 0; i < 50; i++) { try { tabs = await getJ('http://127.0.0.1:' + PORT + '/json'); break; } catch (e) { await sleep(200); } }
  const pg = tabs.find(t => t.type === 'page'); const ws = new WebSocket(pg.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let n = 0; const pend = {}; ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
  const cmd = (method, params) => new Promise(r => { const id = ++n; pend[id] = r; ws.send(JSON.stringify({ id, method, params: params || {} })); });
  await cmd('Page.enable');
  await cmd('Emulation.setDeviceMetricsOverride', { width: +W, height: +H, deviceScaleFactor: 2, mobile: false });
  await cmd('Page.navigate', { url: url.pathToFileURL(path.resolve(svg)).href }); await sleep(2500);
  const r = await cmd('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(png, Buffer.from(r.result.data, 'base64')); console.log('ok', png);
  ws.close(); ch.kill();
})();
