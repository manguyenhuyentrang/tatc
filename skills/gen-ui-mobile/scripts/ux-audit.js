#!/usr/bin/env node
// Rà soát UX tự động cho màn prototype TATC (luật lấy từ references/ux-checklist.md).
// Cách dùng:
//   node ux-audit.js <url hoặc đường dẫn tệp .html> <idMàn>[,<idMàn>...] [--json] [--scroll] [--root "<bộ chọn CSS>"] [--chrome "<đường dẫn chrome.exe>"]
// Ví dụ:
//   node ux-audit.js http://localhost:5936/dist/prototype-test.html home,services2,complaints
//   node ux-audit.js E:/TATC/Mobile/Design_System/prototype-src/dist/prototype-test.html home --json
// Kiểm: vùng chạm < 44px (APP-6), phần tử bấm được thiếu tên đọc màn hình (APP-1, UX-40), ô nhập thiếu nhãn (UX-43),
//       ảnh thiếu alt (UX-38), tương phản chữ (UX-36), chữ < 12px và cỡ ngoài thang design system (APP-26, UX-74),
//       (UX-113 chữ bị cắt đã tắt: TATC chốt dài quá thì hiển thị "…").
// --scroll: cuộn hết từng khối cuộn dọc của màn và kiểm cả phần bên dưới (chậm hơn, nên dùng khi rà soát toàn bộ).
// Cần Node 22+ (có WebSocket sẵn) và Google Chrome. Chỉ đọc trang, không sửa gì.
'use strict';
const { spawn } = require('child_process'), fs = require('fs'), os = require('os'), path = require('path'), http = require('http'), url = require('url');

const args = process.argv.slice(2);
const opt = k => { const i = args.indexOf(k); if (i < 0) return null; const v = args[i + 1]; args.splice(i, 2); return v; };
const asJson = args.includes('--json'); if (asJson) args.splice(args.indexOf('--json'), 1);
const SCROLL = args.includes('--scroll'); if (SCROLL) args.splice(args.indexOf('--scroll'), 1);
const ROOT = opt('--root') || '.pt-phone .ph';
const CHROME = opt('--chrome') || process.env.CHROME_PATH || ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(p => { try { return fs.existsSync(p); } catch (e) { return false; } });
if (args.length < 2) { console.error('Cách dùng: node ux-audit.js <url|tệp.html> <idMàn>[,<idMàn>...] [--json] [--root "<bộ chọn>"]'); process.exit(2); }
if (!CHROME) { console.error('Không tìm thấy Chrome. Truyền --chrome "<đường dẫn>" hoặc đặt biến CHROME_PATH.'); process.exit(2); }
let base = args[0]; if (!/^(https?|file):/i.test(base)) base = url.pathToFileURL(path.resolve(base)).href;
const screens = args[1].split(',').map(s => s.trim()).filter(Boolean);

// Hàm chạy trong trang: trả về danh sách vấn đề của màn đang mở.
const AUDIT = function (ROOT_SEL) {
  const root = document.querySelector(ROOT_SEL) || document.body, RR = root.getBoundingClientRect();
  const out = [], seen = new Set();
  const add = (luat, muc, loai, el, chiTiet) => { const pt = desc(el), k = luat + loai + pt + chiTiet; if (seen.has(k)) return; seen.add(k); out.push({ luat, muc, loai, pt, chiTiet }); };
  const cut = (s, n) => (s || '').replace(/\s+/g, ' ').trim().slice(0, n);
  const desc = el => { const c = typeof el.className === 'string' ? el.className.trim().split(/\s+/).filter(Boolean).slice(0, 2).join('.') : ''; const t = cut(el.getAttribute && el.getAttribute('aria-label') || el.innerText || el.value || '', 40); return el.tagName.toLowerCase() + (c ? '.' + c : '') + (t ? ' "' + t + '"' : ''); };
  const shown = (el, r) => { /* tâm phần tử phải nằm trong vùng gốc và không bị khối cuộn (overflow) của tổ tiên cắt mất */
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2; if (cx < RR.left || cx > RR.right || cy < RR.top || cy > RR.bottom) return false;
    for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) { const s = getComputedStyle(e);
      if (s.overflowX !== 'visible' || s.overflowY !== 'visible') { const q = e.getBoundingClientRect(); if (cx < q.left || cx > q.right || cy < q.top || cy > q.bottom) return false; } }
    return true; };
  const pc = s => { const m = /rgba?\(([^)]+)\)/.exec(s || ''); if (!m) return null; const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; };
  const covered = (el, r) => { /* bị lớp khác có nền che lên (vd lớp tối sau hộp thoại, bảng từ đáy): phần này không tương tác được nên bỏ qua */
    const px = r.left + Math.min(4, r.width / 2), py = r.top + r.height / 2;
    const st = document.elementsFromPoint(px, py).filter(e => { const q = e.getBoundingClientRect(); return px >= q.left && px <= q.right && py >= q.top && py <= q.bottom; }); /* bỏ phần tử chỉ chạm điểm nhờ vùng chạm vô hình ::before/::after (hit44) */
    let i = st.indexOf(el); if (i < 0) i = st.findIndex(x => x.contains(el) && root.contains(x)); /* chữ pointer-events:none: tính từ tổ tiên gần nhất có mặt tại điểm đó */
    if (i < 0) return st.length > 0; /* không phần tử nào chứa nó có mặt tại điểm đó: bị che hoặc nằm ngoài góc bo */
    if (i === 0) return false;
    return st.slice(0, i).some(e => !el.contains(e) && !e.contains(el) && ((c => c && c[3] > 0.05)(pc(getComputedStyle(e).backgroundColor)) || getComputedStyle(e).backgroundImage !== 'none')); };
  const vis = el => { const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') return false; let o = 1, e = el; while (e && e.nodeType === 1) { o *= +getComputedStyle(e).opacity; e = e.parentElement; } if (o < 0.05) return false; const r = el.getBoundingClientRect(); return r.width > 1 && r.height > 1 && shown(el, r) && !covered(el, r); };
  const name = el => cut(el.getAttribute('aria-label') || (el.getAttribute('aria-labelledby') || '').split(/\s+/).map(id => (document.getElementById(id) || {}).textContent || '').join(' ')
    || [...(el.labels || [])].map(l => l.innerText).join(' ') || el.innerText || el.getAttribute('title') || ((el.querySelector && el.querySelector('img[alt]')) || {}).alt
    || (/^(submit|button|reset)$/i.test(el.type || '') ? el.value : '') || '', 80);
  // 1. Phần tử bấm được
  const SEL = 'button, a[href], [role="button"], [role="link"], [role="tab"], [role="checkbox"], [role="radio"], [role="switch"], input:not([type="hidden"]), select, textarea';
  const pBox = (el, ps, er) => { const p = getComputedStyle(el, ps); if (!p.content || p.content === 'none' || p.content === 'normal' || p.position !== 'absolute') return [0, 0];
    const l = parseFloat(p.left), r = parseFloat(p.right), t = parseFloat(p.top), b = parseFloat(p.bottom); let w = parseFloat(p.width) || 0, h = parseFloat(p.height) || 0;
    if (!isNaN(l) && !isNaN(r)) w = er.width - l - r; if (!isNaN(t) && !isNaN(b)) h = er.height - t - b; return [w, h]; };
  [...root.querySelectorAll(SEL)].filter(el => vis(el) && !el.closest('[aria-hidden="true"]')).forEach(el => {
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    if (!(el.tagName === 'A' && cs.display === 'inline') && !el.closest(':disabled, [aria-disabled="true"]')) { /* liên kết nằm trong câu chữ được miễn */
      const lb = el.closest('label'), lq = lb && root.contains(lb) ? lb.getBoundingClientRect() : null; /* ô chọn bọc trong nhãn: bấm cả nhãn được (tính cả vùng ::before/::after của nhãn) */
      const la = lq ? pBox(lb, '::before', lq) : [0, 0], lc = lq ? pBox(lb, '::after', lq) : [0, 0], lw = lq ? Math.max(lq.width, la[0], lc[0]) : 0, lh = lq ? Math.max(lq.height, la[1], lc[1]) : 0;
      const a = pBox(el, '::before', r), b = pBox(el, '::after', r), w = Math.max(r.width, a[0], b[0], lw), h = Math.max(r.height, a[1], b[1], lh);
      if (Math.min(w, h) < 43.5) /* chừa sai số làm tròn điểm ảnh lẻ */ add('APP-6', 'Bắt buộc', 'Vùng chạm nhỏ hơn 44px', el, Math.round(w) + '×' + Math.round(h) + 'px');
    }
    if (!name(el)) add('APP-1', 'Bắt buộc', 'Thiếu tên đọc màn hình', el, 'thêm aria-label hoặc chữ');
    if (/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName) && !(el.labels && el.labels.length) && !el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby'))
      add('UX-43', 'Bắt buộc', 'Ô nhập thiếu nhãn gắn với ô', el, 'dùng <label for> hoặc aria-labelledby');
  });
  // 2. Ảnh
  [...root.querySelectorAll('img')].filter(vis).forEach(el => { if (!el.hasAttribute('alt')) add('UX-38', 'Bắt buộc', 'Ảnh thiếu thuộc tính alt', el, 'ảnh trang trí để alt=""'); });
  // 3. Chữ: cỡ, tương phản, bị cắt
  const over = (t, b) => [0, 1, 2].map(i => t[i] * t[3] + b[i] * (1 - t[3])).concat([1]);
  const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const behind = el => { /* các phần tử nằm dưới chữ theo thứ tự hiển thị (tính cả lớp định vị tuyệt đối như thanh trạng thái); không lấy được thì đi theo tổ tiên */
    const r = el.getBoundingClientRect(), st = document.elementsFromPoint(r.left + Math.min(4, r.width / 2), r.top + r.height / 2), i = st.indexOf(el);
    if (i >= 0) return st.slice(i); if (st.length) return st; /* chữ có pointer-events:none (vd thanh trạng thái): lấy nguyên chồng phần tử tại điểm đó */
    const anc = []; let e = el; while (e && e.nodeType === 1) { anc.push(e); e = e.parentElement; } return anc; };
  const bgs = el => { /* danh sách nền đặc có thể nằm dưới chữ (nền chuyển màu: lấy từng điểm màu) */
    const layers = []; let anh = false;
    for (const e of behind(el)) { const cs = getComputedStyle(e), gi = cs.backgroundImage;
      if (gi && gi !== 'none') { if (/url\(/.test(gi)) anh = true; const cols = (gi.match(/rgba?\([^)]+\)/g) || []).map(pc); if (cols.length) { layers.push(cols); if (cols.every(c => c[3] >= 1)) break; } }
      const c = pc(cs.backgroundColor); if (c && c[3] > 0) { layers.push([c]); if (c[3] >= 1) break; } }
    let cands = [[255, 255, 255, 1]];
    for (let i = layers.length - 1; i >= 0; i--) { const nx = []; layers[i].forEach(c => cands.forEach(b => nx.push(over(c, b)))); cands = nx.slice(0, 24); }
    return { cands, anh };
  };
  const THANG = [10, 12, 14, 16, 18, 20, 22, 24]; /* thêm 18, 22 ngày 20/11/2026 */
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), xong = new Set(); let n;
  while ((n = tw.nextNode())) {
    const el = n.parentElement; if (!el || xong.has(el) || !n.nodeValue.trim() || !vis(el)) continue; xong.add(el);
    const cs = getComputedStyle(el), fs = parseFloat(cs.fontSize), fw = parseInt(cs.fontWeight, 10) || 400, txt = cut(n.nodeValue, 30);
    if (fs < 10) add('APP-26', 'Bắt buộc', 'Chữ nhỏ hơn 10px', el, fs + 'px "' + txt + '"');
    else if (fs < 12) add('APP-26', 'Xem lại', 'Chữ 10–11px (chỉ cho chú thích phụ)', el, fs + 'px "' + txt + '"');
    if (THANG.indexOf(Math.round(fs)) < 0) add('UX-74', 'Nên', 'Cỡ chữ ngoài thang design system (10·12·14·16·18·20·22·24)', el, fs + 'px "' + txt + '"');
    let o = 1, e = el; while (e && e.nodeType === 1) { o *= +getComputedStyle(e).opacity; e = e.parentElement; }
    const tatCh = el.closest(':disabled, [aria-disabled="true"]') || o <= 0.7; /* thành phần đang tắt/khóa (làm mờ) được miễn tương phản theo WCAG 1.4.3 */
    const tc = tatCh ? null : pc(cs.color); if (tc) { tc[3] *= o; const b = bgs(el);
      if (!b.anh) { const min = Math.min.apply(null, b.cands.map(bg => ratio(over(tc, bg), bg))), lon = fs >= 24 || (fs >= 18.66 && fw >= 700), can = lon ? 3 : 4.5;
        if (min < can) add('UX-36', 'Bắt buộc', 'Tương phản chữ thấp', el, min.toFixed(2) + ':1 (cần ' + can + ':1) "' + txt + '"'); } }
    const cat = (cs.textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth + 1) || (cs.webkitLineClamp && cs.webkitLineClamp !== 'none' && el.scrollHeight > el.clientHeight + 1);
    /* UX-113 tắt: TATC chốt 20/11/2026 dài quá thì hiển thị "…" ở mọi màn */ if (false && cat) add('UX-113', 'Xem lại', 'Chữ bị cắt (…) – cần đường xem đầy đủ nếu là nội dung chính', el, '"' + txt + '"');
  }
  return { goc: root === document.body ? 'body' : ROOT_SEL, vanDe: out };
};

const PORT = 9400 + Math.floor(Math.random() * 90), PROF = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-audit-'));
const ch = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--user-data-dir=' + PROF, '--no-first-run', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJ = u => new Promise((res, rej) => http.get(u, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } }); }).on('error', rej));
(async () => {
  let tabs; for (let i = 0; i < 60 && !tabs; i++) { try { tabs = await getJ('http://127.0.0.1:' + PORT + '/json'); } catch (e) { await sleep(200); } }
  if (!tabs) throw new Error('Không kết nối được Chrome chạy ngầm.');
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let k = 0; const pend = {}; ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
  const cmd = (method, params) => new Promise(r => { const id = ++k; pend[id] = r; ws.send(JSON.stringify({ id, method, params: params || {} })); });
  const ev = async x => { const r = await cmd('Runtime.evaluate', { expression: x, awaitPromise: true, returnByValue: true }); if (r.result && r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 300)); return r.result && r.result.result ? r.result.result.value : undefined; };
  await cmd('Page.enable'); await cmd('Runtime.enable');
  await cmd('Emulation.setDeviceMetricsOverride', { width: 1100, height: 1000, deviceScaleFactor: 1, mobile: false });
  const ketQua = [];
  for (const s of screens) {
    await cmd('Page.navigate', { url: base + (base.indexOf('?') < 0 ? '?' : '&') + 'ux=' + Date.now() + '#' + s }); await sleep(1000);
    for (let i = 0; i < 40 && !(await ev('!!document.querySelector(' + JSON.stringify(ROOT) + ')')); i++) await sleep(150);
    await sleep(1200);
    const chay = () => ev('(' + AUDIT.toString() + ')(' + JSON.stringify(ROOT) + ')');
    const r = await chay(); r.cuon = 0;
    if (SCROLL) try { /* --scroll: cuộn từng khối cuộn dọc trong vùng gốc, mỗi lần ~80% chiều cao, kiểm lại và gộp kết quả (bỏ trùng); màn tự chuyển giữa chừng thì ghi cuonLoi, giữ kết quả đã có */
      const da = new Set(r.vanDe.map(v => v.luat + v.loai + v.pt + v.chiTiet));
      const soKhoi = await ev('(()=>{const g=document.querySelector(' + JSON.stringify(ROOT) + ')||document.body;window.__uxS=[...g.querySelectorAll("*")].filter(e=>{const s=getComputedStyle(e);return /(auto|scroll)/.test(s.overflowY)&&e.scrollHeight>e.clientHeight+4&&e.clientHeight>80});return window.__uxS.length})()');
      for (let i = 0; i < soKhoi; i++) for (let b = 0; b < 40; b++) {
        const tiep = await ev('(()=>{const e=window.__uxS[' + i + '];if(!e||!e.isConnected||e.scrollTop+e.clientHeight>=e.scrollHeight-2)return false;e.scrollTop+=Math.round(e.clientHeight*0.8);return true})()');
        if (!tiep) break; await sleep(250); r.cuon++;
        (await chay()).vanDe.forEach(v => { const key = v.luat + v.loai + v.pt + v.chiTiet; if (!da.has(key)) { da.add(key); r.vanDe.push(v); } });
      }
    } catch (e) { r.cuonLoi = String(e.message).slice(0, 120); }
    ketQua.push(Object.assign({ man: s }, r));
  }
  ws.close(); ch.kill(); try { fs.rmSync(PROF, { recursive: true, force: true }); } catch (e) { }
  if (asJson) { console.log(JSON.stringify(ketQua, null, 1)); return; }
  for (const m of ketQua) {
    const dem = mu => m.vanDe.filter(v => v.muc === mu).length;
    console.log('\n== Màn ' + m.man + ' (vùng kiểm: ' + m.goc + '): ' + dem('Bắt buộc') + ' bắt buộc · ' + dem('Nên') + ' nên sửa · ' + dem('Xem lại') + ' xem lại');
    const nhom = {}; m.vanDe.forEach(v => { const key = v.muc + ' | ' + v.luat + ' ' + v.loai; (nhom[key] = nhom[key] || []).push(v); });
    Object.keys(nhom).sort().forEach(key => { const ds = nhom[key]; console.log('- ' + key + ' (' + ds.length + ')'); ds.slice(0, 6).forEach(v => console.log('    · ' + v.pt + ' – ' + v.chiTiet)); if (ds.length > 6) console.log('    · … và ' + (ds.length - 6) + ' chỗ khác'); });
  }
})().catch(e => { console.error('Lỗi:', e.message); try { ch.kill(); } catch (x) { } process.exit(1); });
