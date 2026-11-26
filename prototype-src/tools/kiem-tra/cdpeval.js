// Chụp khung điện thoại bằng Chrome chạy ngầm qua CDP. node cdpshot.js jobs.json outDir
// jobs: [[tên tệp, url trang, id màn, cuộn (số | 'end' | 0), js chạy thêm (tùy chọn)]]
const { spawn } = require('child_process'), fs = require('fs'), path = require('path'), http = require('http');
const url = process.argv[2], expr = process.argv[3];
const PORT = +(process.env.CDP_PORT || 9334), prof = path.join(__dirname, 'cdp-prof-e' + PORT);
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
  await cmd('Emulation.setDeviceMetricsOverride', { width: 1100, height: 1000, deviceScaleFactor: 1, mobile: false });
  await cmd('Page.navigate', { url: url }); await sleep(1200);
  for (let i = 0; i < 30 && !(await ev("!!document.querySelector('.pt-phone .ph')")); i++) await sleep(150);
  console.log(JSON.stringify(await ev(expr)));
  ws.close(); ch.kill();
})().catch(e => { console.error(e); ch.kill(); process.exit(1); });
