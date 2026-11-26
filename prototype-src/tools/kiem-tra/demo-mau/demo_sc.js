
/* DEMO 25/11/2026: Status-color (bộ 30 màu st-1…st-30 trong skill) cho trạng thái + tình trạng Đơn, Vụ án */
(function () {
  var SC_TEN = __TEN__, DON_TT = __DON__;
  var TT_VA = { 'Đang giải quyết': 15, 'Đã tuyên án - trong thời hạn kháng cáo': 4, 'Bản án/quyết định có hiệu lực pháp luật': 9, 'Tạm đình chỉ': 3, 'Đình chỉ': 30, 'Đang xét lại (GĐT / tái thẩm)': 19, 'Đang xử lý đơn': 27, 'Đang xử lý': 13, 'Đã giải quyết': 11, 'Đã xử lý': 6 };
  var TT_DON = { 'Chưa gửi': 30, 'Lưu tạm': 30, 'Chờ ký số': 22, 'Đã gửi đơn': 16, 'Đang xử lý': 14, 'Đã xử lý': 10 };
  var DON_TINH = DON_TT.map(function (r) { return r[1]; });
  /* tình trạng: theo thứ tự trong danh sách, bước 7 trên vòng 29 màu (bỏ xám xanh st-30) – 2 tình trạng liền nhau cách nhau 7 bậc */
  function so(ds, s) { var i = ds.indexOf(s); if (i < 0) { ds.push(s); i = ds.length - 1; } return (i * 7) % 29 + 1; }
  window.scTinhVa = function (s) { return so(VA_TINH_DS, s); }; window.scTinhDon = function (s) { return so(DON_TINH, s); };
  function v(n) { return { '--c': 'var(--sc-' + n + ')', '--t': 'var(--sc-' + n + '-tint)', '--b': 'var(--sc-' + n + '-border)', '--d': 'var(--sc-' + n + '-dot)' }; }
  function Pill(s, n, cls) { return h('span', { className: 'tp-badge sc-tt' + (cls ? ' ' + cls : ''), style: v(n), title: 'st-' + n + ' ' + SC_TEN[n] }, s); }
  function Tinh(s, n, du) { return h('span', { className: 'qd-tinh qc-tinh va-st sc-ti' + (du ? ' va-st-du' : ''), style: v(n), title: s }, h('span', { className: 'qc-tinh-tx' }, s)); }
  var ttGoc = VaNhanTT, tinhGoc = VaNhanTinh;
  VaNhanTT = function (x) { return window.__pa30 === 'M' && TT_VA[x.tt[0]] ? Pill(x.tt[0], TT_VA[x.tt[0]]) : ttGoc(x); };
  VaNhanTinh = function (x, du) { return window.__pa30 === 'M' ? Tinh(x.tinh[0], scTinhVa(x.tinh[0]), du) : tinhGoc(x, du); };
  var SB = T.StatusBadge;
  function txt(c) { return typeof c === 'string' ? c : Array.isArray(c) && c.every(function (y) { return typeof y === 'string'; }) ? c.join('') : null; }
  var MoiSB = function (p) { var s = txt(p.children);
    if (window.__pa30 !== 'M' || !s || p.variant === 'outline') return h(SB, p);
    if (TT_DON[s]) return Pill(s, TT_DON[s], p.className);
    if (DON_TINH.indexOf(s) >= 0) return Tinh(s, scTinhDon(s));
    return h(SB, p); };
  try { T.StatusBadge = MoiSB; } catch (e) { }
  function to() { if (window.__pa30 !== 'M') return; document.querySelectorAll('.qd-tinh:not(.sc-ti):not([data-sc])').forEach(function (e) { var s = (e.getAttribute('title') || e.textContent || '').trim(); if (!s) return; e.setAttribute('data-sc', 1);
    var n = e.closest('.va5-c, .va4-hd1, .dt-badges.va') ? scTinhVa(s) : scTinhDon(s), st = v(n); Object.keys(st).forEach(function (k) { e.style.setProperty(k, st[k]); }); e.classList.add('sc-ti'); }); }
  new MutationObserver(to).observe(document.documentElement, { childList: true, subtree: true });
  function Bang() { window.__pa30 = 'M';
    var gDon = []; DON_TT.forEach(function (r) { if (!gDon.length || gDon[gDon.length - 1][0] !== r[0]) gDon.push([r[0], []]); gDon[gDon.length - 1][1].push(r[1]); });
    var k = function (n) { return h('span', { className: 'sc-k' }, 'st-' + n); };
    return Sub('Status-color – trạng thái, tình trạng', h('div', { className: 'sc-bm' },
      h('section', null, h('h3', null, 'Vụ án – ' + Object.keys(TT_VA).length + ' trạng thái'), h('ul', null, Object.keys(TT_VA).map(function (s) { return h('li', { key: s }, Pill(s, TT_VA[s]), k(TT_VA[s])); }))),
      h('section', null, h('h3', null, 'Vụ án – ' + VA_TINH_DS.length + ' tình trạng'), h('ul', null, VA_TINH_DS.slice().map(function (s) { var n = scTinhVa(s); return h('li', { key: s }, Tinh(s, n, true), k(n)); }))),
      h('section', null, h('h3', null, 'Đơn – 5 trạng thái, ' + DON_TT.length + ' tình trạng'), gDon.map(function (g) {
        return h('div', { key: g[0] }, h('div', { className: 'sc-g' }, Pill(g[0], TT_DON[g[0]]), k(TT_DON[g[0]]), h('span', { className: 'sc-n' }, g[1].length + ' tình trạng')),
          h('ul', null, g[1].map(function (s) { var n = scTinhDon(s); return h('li', { key: s }, Tinh(s, n, true), k(n)); }))); })))); }
  SCR.scBang = ['Status-color – bảng màu Đơn và Vụ án', function () { return h(Bang); }]; BASE.scBang = 'home';
  var ids = ['scBang'];
  [['cases', 'Danh sách vụ án'], ['caseDetail', 'Chi tiết vụ án'], ['applications', 'Danh sách đơn'], ['appDetail', 'Chi tiết đơn'], ['appDetailFee', 'Chi tiết đơn – nộp tạm ứng án phí']].forEach(function (x) {
    ['0', 'M'].forEach(function (pa) { var id = 'sc' + pa + x[0];
      SCR[id] = [(pa === 'M' ? 'Status-color – ' : 'Hiện tại (v603) – ') + x[1], function () { window.__pa30 = pa; return h(SCR[x[0]][1]); }]; BASE[id] = BASE[x[0]] || 'home'; ids.push(id); });
  });
  GROUPS2.unshift(['DEMO – Status-color cho trạng thái, tình trạng Đơn và Vụ án', ids]);
})();
