// Chụp khung điện thoại bằng Chrome chạy ngầm qua CDP. node cdpshot.js jobs.json outDir
// jobs: [[tên tệp, url trang, id màn, cuộn (số | 'end' | 0), js chạy thêm (tùy chọn)]]
const { spawn } = require('child_process'), fs = require('fs'), path = require('path'), http = require('http');
const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')), out = process.argv[3]; fs.mkdirSync(out, { recursive: true });
const PORT = +(process.env.CDP_PORT || 9333), prof = path.join(__dirname, 'cdp-prof-' + PORT);
const ch = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--remote-debugging-port=' + PORT, '--user-data-dir=' + prof, '--no-first-run', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJ = u => new Promise((res, rej) => http.get(u, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej));
(async () => {
  let tabs; for (let i = 0; i < 50; i++) { try { tabs = await getJ('http://127.0.0.1:' + PORT + '/json'); break; } catch (e) { await sleep(200); } }
  const pg = tabs.find(t => t.type === 'page'); const ws = new WebSocket(pg.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let n = 0; const pend = {}; ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
  const cmd = (method, params) => new Promise(r => { const id = ++n; pend[id] = r; ws.send(JSON.stringify({ id, method, params: params || {} })); });
  const ev = async x => { const r = await cmd('Runtime.evaluate', { expression: x, awaitPromise: true, returnByValue: true }); return r.result && r.result.result ? r.result.result.value : r; };
  await cmd('Page.enable'); await cmd('Runtime.enable');
  await cmd('Emulation.setDeviceMetricsOverride', { width: 1100, height: 1000, deviceScaleFactor: 2, mobile: false });
  let k = 0;
  for (const [file, url, id, y, js] of jobs) {
    await cmd('Page.navigate', { url: url + '?r=' + (++k) + '#' + id }); await sleep(900);
    for (let i = 0; i < 20 && !(await ev("!!document.querySelector('.pt-phone .ph')")); i++) await sleep(150);
    if (js) { await ev('(async()=>{' + js + '})()'); await sleep(350); }
    if (y) { await ev("(()=>{const b=document.querySelector('.pt-phone .ph-body');if(b)b.scrollTop=" + (y === 'end' ? 99999 : y) + "})()"); await sleep(200); }
    const r = await ev("(()=>{const e=document.querySelector('.pt-phone');const b=e.getBoundingClientRect();return [b.x,b.y,b.width,b.height,location.hash]})()");
    const s = await cmd('Page.captureScreenshot', { format: 'png', clip: { x: r[0], y: r[1], width: r[2], height: r[3], scale: 1 } });
    fs.writeFileSync(path.join(out, file + '.png'), Buffer.from(s.result.data, 'base64')); console.log(file, r[4]);
  }
  ws.close(); ch.kill();
})().catch(e => { console.error(e); ch.kill(); process.exit(1); });
