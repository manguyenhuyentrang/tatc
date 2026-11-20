#!/usr/bin/env node
// Dò các luật UX phải "bấm thử" mới biết, cho prototype TATC (bổ sung cho ux-audit.js). Chỉ đọc trang, không sửa gì.
// Cách dùng:
//   node ux-probe.js <url hoặc đường dẫn tệp .html> <idMàn>[,<idMàn>...] [--json] [--root "<bộ chọn>"] [--chrome "<đường dẫn chrome.exe>"]
// Kiểm:
//   UX-35  tự bấm từng nút thao tác không hoàn tác (xóa, rút, hủy đơn/yêu cầu, thu hồi, đăng xuất…, tối đa 4 nút mỗi màn, gồm cả phần phải cuộn)
//          rồi xem kết quả: mở hộp thoại xác nhận / sang màn khác (luồng có bước xác nhận) / làm ngay (chỉ hiện thông báo) / không đổi gì.
//          "làm ngay" với thao tác không hoàn tác là lỗi Bắt buộc; "không đổi" thường là xóa dòng trong biểu mẫu hoặc xóa chữ ô tìm, cần xem lại.
//   APP-11 mỗi hộp thoại / bảng từ đáy đang mở có nút thoát (Đóng, Hủy, Không, Quay lại, Bỏ qua, Để sau, Về…).
//   UX-37  chấm màu không kèm chữ (≤ 14px, tròn, có sắc màu, không aria-label, khối cha không có chữ): liệt kê để xem có phải báo trạng thái chỉ bằng màu không.
// Ghi chú: nút nhận theo chữ / aria-label; nút chỉ có biểu tượng mà thiếu tên sẽ không được bấm thử (ux-audit.js báo thiếu tên – APP-1).
'use strict';
const { spawn } = require('child_process'), fs = require('fs'), os = require('os'), path = require('path'), http = require('http'), url = require('url');
const args = process.argv.slice(2);
const opt = k => { const i = args.indexOf(k); if (i < 0) return null; const v = args[i + 1]; args.splice(i, 2); return v; };
const asJson = args.includes('--json'); if (asJson) args.splice(args.indexOf('--json'), 1);
const ROOT = opt('--root') || '.pt-phone .ph';
const CHROME = opt('--chrome') || process.env.CHROME_PATH || ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(p => { try { return fs.existsSync(p); } catch (e) { return false; } });
if (args.length < 2) { console.error('Cách dùng: node ux-probe.js <url|tệp.html> <idMàn>[,<idMàn>...] [--json] [--root "<bộ chọn>"]'); process.exit(2); }
if (!CHROME) { console.error('Không tìm thấy Chrome. Truyền --chrome "<đường dẫn>" hoặc đặt biến CHROME_PATH.'); process.exit(2); }
let base = args[0]; if (!/^(https?|file):/i.test(base)) base = url.pathToFileURL(path.resolve(base)).href;
const screens = args[1].split(',').map(s => s.trim()).filter(Boolean);

// Hàm chạy trong trang. mode: 'scan' | 'click' (bấm nút thứ idx) | 'after' (xem kết quả sau khi bấm)
const PAGE = function (ROOT_SEL, mode, idx) {
  const root = document.querySelector(ROOT_SEL); if (!root) return null;
  const RR = root.getBoundingClientRect();
  const vis = e => { const s = getComputedStyle(e); if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity < 0.05) return false; const r = e.getBoundingClientRect(); return r.width > 1 && r.height > 1 && r.bottom > RR.top && r.top < RR.bottom && r.right > RR.left && r.left < RR.right; };
  const vis2 = e => { let x = e; while (x && x.nodeType === 1) { const s = getComputedStyle(x); if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity < 0.05) return false; x = x.parentElement; } const r = e.getBoundingClientRect(); return r.width > 1 && r.height > 1; }; /* tính cả phần phải cuộn */
  const nm = e => ((e.getAttribute('aria-label') || e.innerText || '').replace(/\s+/g, ' ').trim()).slice(0, 60);
  const MODAL = '[aria-modal="true"],[role="dialog"],[role="alertdialog"]';
  const dialogs = () => [...document.querySelectorAll(ROOT_SEL.split(' ')[0] + ' ' + MODAL.split(',').join(',' + ROOT_SEL.split(' ')[0] + ' '))].filter(vis);
  const XOA = /^(xóa|xoá|gỡ|thu hồi|đăng xuất|hủy đơn|huỷ đơn|hủy yêu cầu|huỷ yêu cầu|hủy lịch|rút đơn|rút yêu cầu|rút hồ sơ|rút|tắt xác thực|đóng tài khoản|bỏ liên kết|xóa tất cả)(\s|$)/i;
  const DESTR = () => [...root.querySelectorAll('button, [role="button"], a[href]')].filter(e => vis2(e) && XOA.test(nm(e)) && !e.closest(MODAL) && !e.closest(':disabled,[aria-disabled="true"]')
    && !/^(radio|option|tab|checkbox|menuitemradio)$/.test(e.getAttribute('role') || '') && !e.closest('[role=radiogroup],[role=tablist]') && !e.hasAttribute('aria-checked') && !e.hasAttribute('aria-pressed'));
  if (mode === 'scan') {
    const dl = dialogs().map(d => { const bt = [...d.querySelectorAll('button, [role="button"], a[href]')].filter(vis).map(nm);
      return { ten: (d.getAttribute('aria-label') || (d.querySelector('h1,h2,h3') || {}).innerText || '').slice(0, 60), nut: bt.slice(0, 8), thoat: bt.filter(t => /đóng|hủy|huỷ|quay lại|không|bỏ qua|để sau|xong|trở về|thoát|^về /i.test(t)) }; });
    const cham = [...root.querySelectorAll('*')].filter(e => { if (!vis(e) || e.children.length || (e.innerText || '').trim() || e.getAttribute('aria-label')) return false; const r = e.getBoundingClientRect(); if (r.width > 14 || r.height > 14 || r.width < 4) return false;
      const s = getComputedStyle(e); if (parseFloat(s.borderRadius) < r.width / 2 - 1) return false; const m = /rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?/.exec(s.backgroundColor); if (!m || (m[4] && +m[4] < 0.3)) return false;
      return Math.max(+m[1], +m[2], +m[3]) - Math.min(+m[1], +m[2], +m[3]) > 40 && !(e.parentElement.innerText || '').trim(); })
      .map(e => ({ pt: e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className ? '.' + e.className.split(' ')[0] : ''), mau: getComputedStyle(e).backgroundColor }));
    return { dialogs: dl, xoa: DESTR().map(nm), cham };
  }
  if (mode === 'click') { const e = DESTR()[idx]; if (!e) return null; window.__uxpB = { hash: location.hash, dl: dialogs().length }; e.click(); return nm(e); }
  if (mode === 'after') { const d = dialogs();
    const snack = [...document.querySelectorAll('[role="status"], [class*="snack"], [class*="toast"]')].filter(vis).map(x => x.innerText.trim()).filter(t => t && !/^\d+ \/ \d+$/.test(t));
    return { dlMoi: d.length > window.__uxpB.dl ? d.map(x => (x.getAttribute('aria-label') || (x.querySelector('h1,h2,h3') || {}).innerText || x.innerText || '').replace(/\s+/g, ' ').slice(0, 70)) : [], snack: snack.slice(0, 2), doiMan: location.hash !== window.__uxpB.hash, hash: decodeURIComponent(location.hash) }; }
};

const PORT = 9500 + Math.floor(Math.random() * 90), PROF = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-probe-'));
const ch = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--user-data-dir=' + PROF, '--no-first-run', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJ = u => new Promise((res, rej) => http.get(u, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } }); }).on('error', rej));
(async () => {
  let tabs; for (let i = 0; i < 60 && !tabs; i++) { try { tabs = await getJ('http://127.0.0.1:' + PORT + '/json'); } catch (e) { await sleep(200); } }
  if (!tabs) throw new Error('Không kết nối được Chrome chạy ngầm.');
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let k = 0; const pend = {}; ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
  const cmd = (method, params) => new Promise(r => { const id = ++k; pend[id] = r; ws.send(JSON.stringify({ id, method, params: params || {} })); });
  const ev = async (mode, i) => { const r = await cmd('Runtime.evaluate', { expression: '(' + PAGE + ')(' + JSON.stringify(ROOT) + ',' + JSON.stringify(mode) + ',' + (i || 0) + ')', returnByValue: true }); return r.result && r.result.result ? r.result.result.value : null; };
  await cmd('Page.enable'); await cmd('Runtime.enable');
  await cmd('Emulation.setDeviceMetricsOverride', { width: 1100, height: 1000, deviceScaleFactor: 1, mobile: false });
  const open = async s => { await cmd('Page.navigate', { url: base + (base.indexOf('?') < 0 ? '?' : '&') + 'uxp=' + Date.now() + '#' + s }); await sleep(900); for (let i = 0; i < 30 && !(await ev('scan')); i++) await sleep(150); await sleep(700); };
  const out = [];
  for (const s of screens) {
    try {
      await open(s); const sc = await ev('scan'); if (!sc) { out.push({ man: s, loi: 'không mở được màn' }); continue; }
      sc.man = s; sc.bam = [];
      for (let i = 0; i < Math.min(sc.xoa.length, 4); i++) { if (i) await open(s); const t = await ev('click', i); if (!t) continue; await sleep(700); const a = await ev('after');
        a.ketQua = a.dlMoi.length ? 'hộp thoại' : a.doiMan ? 'sang màn khác' : a.snack.length ? 'làm ngay' : 'không đổi'; sc.bam.push(Object.assign({ nut: t }, a)); }
      out.push(sc);
    } catch (e) { out.push({ man: s, loi: String(e.message).slice(0, 120) }); }
  }
  ws.close(); ch.kill(); try { fs.rmSync(PROF, { recursive: true, force: true }); } catch (e) { }
  if (asJson) { console.log(JSON.stringify(out, null, 1)); return; }
  for (const m of out) {
    if (m.loi) { console.log('\n== Màn ' + m.man + ': ' + m.loi); continue; }
    const loi = [];
    m.bam.forEach(b => { if (b.ketQua === 'làm ngay') loi.push('Bắt buộc | UX-35 "' + b.nut + '" làm ngay, không hỏi xác nhận (thông báo: ' + b.snack[0] + ')');
      else if (b.ketQua === 'không đổi') loi.push('Xem lại | UX-35 "' + b.nut + '" không mở hộp thoại, không sang màn – xem có xóa ngay dữ liệu đã nhập không');
      else loi.push('ổn | UX-35 "' + b.nut + '" → ' + b.ketQua + (b.dlMoi[0] ? ' "' + b.dlMoi[0] + '"' : b.doiMan ? ' ' + b.hash : '')); });
    m.dialogs.forEach(d => { if (!d.thoat.length) loi.push('Bắt buộc | APP-11 hộp thoại "' + d.ten + '" không có nút thoát (nút: ' + d.nut.join(' / ') + ')'); });
    if (m.cham.length) loi.push('Xem lại | UX-37 ' + m.cham.length + ' chấm màu không kèm chữ (' + [...new Set(m.cham.map(c => c.pt))].slice(0, 4).join(', ') + ')');
    console.log('\n== Màn ' + m.man + (loi.length ? '' : ': không có gì cần xem'));
    loi.forEach(x => console.log('  · ' + x));
  }
})().catch(e => { console.error('Lỗi:', e.message); try { ch.kill(); } catch (x) { } process.exit(1); });
