/* =====================================================================
   03/11/2026 (v145): Nghĩa vụ tài chính – vẽ lại đầy đủ luồng theo web /nghia-vu-tai-chinh
   (screens/nghia-vu-tai-chinh: index, danh-sach, chi-tiet, nop-tien, tien-ich, tai-bien-lai).
   Danh sách 2 nhóm (Phải nộp / Đã nộp, được miễn) · tìm + Bộ lọc (Hồ sơ, vụ án; Ngày nộp) · chip Loại khoản ·
   thẻ khoản (FinanceCard) · chi tiết (ghi chú theo tình huống, nộp tiền, biên lai, thông tin khoản, lịch sử) ·
   Nộp tiền 2 bước (xác nhận → đã mở Cổng DVCQG) · khoản đã được xác nhận giữa chừng · trống · lỗi tải.
   Số tiền, mã, ngày là dữ liệu mẫu; câu chữ lấy nguyên từ web, chỗ web lấy từ dữ liệu Tòa án để trong [ ].
   ===================================================================== */
var NV_XN = '03 ngày làm việc';
var NV_LOAI = [['TAM_UNG_AP_ST', 'Tạm ứng án phí sơ thẩm'], ['TAM_UNG_AP_PT', 'Tạm ứng án phí phúc thẩm'], ['AN_PHI_ST', 'Án phí sơ thẩm'], ['AN_PHI_PT', 'Án phí phúc thẩm'], ['LE_PHI', 'Lệ phí'], ['CHI_PHI_TT', 'Chi phí tố tụng'], ['BAO_DAM_BPKCTT', 'Tiền bảo đảm BPKCTT']];
function nvTenLoai(ma) { var x = NV_LOAI.filter(function (l) { return l[0] === ma; })[0]; return x ? x[1] : 'Khoản thu'; }
var NV_HS = [['DS-2026-0018', 'Vụ án DS-2026-0018 · Tranh chấp hợp đồng vay tài sản'], ['DS-2026-0012', 'Vụ án DS-2026-0012 · Tranh chấp hợp đồng mua bán'], ['DS-2026-0021', 'Đơn khởi kiện DS-2026-0021']];
function nvHsText(ma) { var x = NV_HS.filter(function (s) { return s[0] === ma; })[0]; return x ? x[1] : ma; }
/* mo: còn mở (nhóm Phải nộp) · dl: số ngày còn lại · nopThay: người đại diện · giam: được giảm · cxd: chưa xác định số tiền */
var NV = [
  { ma: 'TB-2026-0018', loai: 'CHI_PHI_TT', nd: 'Chi phí xem xét, thẩm định tại chỗ', hs: 'DS-2026-0018', tien: 1500000, han: '05/11/2026', dl: 2, mo: 1, vb: 'Thông báo nộp chi phí tố tụng', so: '18/2026/TB-TA', bh: '28/10/2026', td: '29/10/2026', hauQua: 'Quá hạn không nộp, Tòa án đình chỉ việc xem xét, thẩm định tại chỗ theo yêu cầu.', moTa: 'Khoản tiền đương sự phải nộp theo thông báo của Tòa án.', mien: 1 },
  { ma: 'TB-2026-0012', loai: 'TAM_UNG_AP_ST', nd: 'Tạm ứng án phí vụ án dân sự', hs: 'DS-2026-0012', tien: 3000000, tienDau: 6000000, giam: 'Quyết định số 05/2026/QĐ-MGTƯAP', ngayGiam: '25/10/2026', han: '10/11/2026', dl: 7, mo: 1, vb: 'Thông báo nộp tạm ứng án phí', so: '12/2026/TB-TA', bh: '20/10/2026', td: '21/10/2026', moTa: 'Khoản tiền đương sự phải nộp theo thông báo của Tòa án.', mien: 1 },
  { ma: 'TB-2026-0021', loai: 'LE_PHI', nd: 'Lệ phí giải quyết việc dân sự', hs: 'DS-2026-0021', cxd: 1, mo: 1, vb: 'Thông báo nộp lệ phí', so: '21/2026/TB-TA', bh: '30/10/2026', td: '31/10/2026' },
  { ma: 'TB-2026-0030', loai: 'TAM_UNG_AP_PT', nd: 'Tạm ứng án phí phúc thẩm', hs: 'DS-2026-0018', tien: 300000, han: '01/11/2026', dl: -2, mo: 1, nopThay: 1, dinhDanh: 'Hoàng Minh Quân · 001085004321', vb: 'Thông báo nộp tạm ứng án phí phúc thẩm', so: '30/2026/TB-TA', bh: '25/10/2026', td: '26/10/2026', hauQua: 'Quá hạn không nộp, Tòa án đình chỉ việc xem xét, thẩm định tại chỗ theo yêu cầu.' },
  { ma: 'TB-2026-0005', loai: 'TAM_UNG_AP_ST', nd: 'Tạm ứng án phí sơ thẩm', hs: 'DS-2026-0012', tien: 300000, da: 1, ngay: '20/10/2026', kenh: 'Cổng Dịch vụ công quốc gia', bienLai: 'BL-2026-000123', vb: 'Thông báo nộp tạm ứng án phí', so: '05/2026/TB-TA', bh: '10/10/2026', td: '11/10/2026' },
  { ma: 'TB-2026-0003', loai: 'LE_PHI', nd: 'Lệ phí cấp bản sao bản án', hs: 'DS-2026-0012', tien: 300000, duocMien: 1, ngay: '15/10/2026', lyDo: 'Quyết định số 06/2026/QĐ-MGTƯAP', vb: 'Thông báo nộp lệ phí', so: '03/2026/TB-TA', bh: '08/10/2026', td: '09/10/2026' }];
function nvTien(n) { return n == null ? '' : new Intl.NumberFormat('vi-VN').format(n) + ' đ'; }
function nvTienText(k) { return k.cxd ? 'Chưa xác định' : nvTien(k.tien); }
var NV_CS = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
function nvBaSo(n, day) {
  var tr = Math.floor(n / 100), ch = Math.floor((n % 100) / 10), dv = n % 10, t = [];
  if (tr > 0 || day) t.push(NV_CS[tr] + ' trăm');
  if (ch > 1) { t.push(NV_CS[ch] + ' mươi'); if (dv === 1) t.push('mốt'); else if (dv === 5) t.push('lăm'); else if (dv > 0) t.push(NV_CS[dv]); }
  else if (ch === 1) { t.push('mười'); if (dv === 5) t.push('lăm'); else if (dv > 0) t.push(NV_CS[dv]); }
  else if (dv > 0) { if (tr > 0 || day) t.push('lẻ'); t.push(NV_CS[dv]); }
  return t.join(' ');
}
/* số tiền bằng chữ – như tienBangChu của web */
function nvBangChu(so) {
  if (so == null) return ''; var n = Math.floor(so); if (n === 0) return 'Không đồng';
  var DV = ['', ' nghìn', ' triệu', ' tỷ'], g = [], p = [];
  while (n > 0) { g.push(n % 1000); n = Math.floor(n / 1000); }
  for (var i = g.length - 1; i >= 0; i--) { if (g[i] === 0) continue; p.push(nvBaSo(g[i], i < g.length - 1) + DV[i]); }
  var s = p.join(' ') + ' đồng'; return s.charAt(0).toUpperCase() + s.slice(1);
}
function nvHan(k) {
  if (!k.mo || k.dl == null) return null;
  var qua = k.dl < 0;
  return { text: qua ? 'Quá hạn ' + (-k.dl) + ' ngày' : k.dl === 0 ? 'Hết hạn hôm nay' : 'Còn ' + k.dl + ' ngày', gap: qua || k.dl <= 3, qua: qua, tone: qua ? 'danger' : k.dl <= 3 ? 'warning' : undefined };
}
function nvNopDuoc(k) { return k.mo && !k.cxd && k.tien > 0; }
function nvTrangThai(k) { return k.mo ? ['Chưa nộp', 'danger'] : k.duocMien ? ['Được miễn', 'success'] : ['Đã nộp', 'success']; }
function nvSel() { var i = window.__nvSel; return NV[i == null ? 0 : i]; }
function nvSelPay() { var k = nvSel(); return nvNopDuoc(k) ? k : NV[0]; }
function nvPick(k) { return function () { window.__nvSel = NV.indexOf(k); }; }

/* ghi chú màu (danger / info / warning / success) – theo ghi chú của web, dùng token trạng thái */
function NvCall(p) {
  return h('div', { className: 'nv-call nv-call-' + p.tone }, h(T.Icon, { name: p.icon || (p.tone === 'success' ? 'checkCircle' : p.tone === 'info' ? 'info' : 'alert') }),
    h('p', null, p.title ? h('b', null, p.title + ' ') : null, p.children));
}
/* ghi chú trên thẻ khoản phải nộp (AF-01 sắp/quá hạn, AF-02 được giảm, chưa có số tiền) */
function nvGhiChuThe(k) {
  var h1 = nvHan(k), ds = [];
  if (h1 && h1.gap) ds.push(['danger', (h1.qua ? 'Đã quá hạn. ' : 'Sắp hết hạn. ') + (k.hauQua || '') + (h1.qua ? ' Nếu đã nộp, liên hệ Tòa án.' : '')]);
  if (k.giam) ds.push(['info', 'Được giảm theo ' + k.giam + '.']);
  if (k.cxd) ds.push(['warning', 'Văn bản tống đạt chưa ghi số tiền cụ thể. Tra số tiền trong văn bản gốc hoặc chờ Tòa án thông báo; khoản này chưa tính vào tổng còn phải nộp.']);
  return ds;
}
/* thẻ khoản: kiểu FinanceCard của design system (vé, mã, hạn) + ghi chú + nút; chạm cả thẻ mở chi tiết */
/* v251 (04/11/2026): thẻ khoản theo kiểu thẻ đơn – nhãn trạng thái + tình trạng hạn + sao, tên khoản, nhãn – giá trị (số tiền đầu tiên), ghi chú, Việc cần làm "Nộp tiền" kèm hạn; bỏ nút Xem chi tiết (trùng với chạm thẻ) */
function NvCard(p) {
  var k = p.k, tt = nvTrangThai(k), hn = nvHan(k), muc = hn ? (hn.qua ? 'qua' : hn.gap ? 'sap' : 'an') : null;
  var rows = [['Số tiền', h('span', { className: 'nv-c-amt tp-num' + (k.cxd ? ' nv-amt-cxd' : '') }, k.tienDau ? h('s', { className: 'nv-was' }, nvTien(k.tienDau)) : null, k.tienDau ? ' ' : null, k.mo ? nvTienText(k) : nvTien(k.tien))],
    ['Loại khoản', nvTenLoai(k.loai)], ['Mã thông báo', h('span', { className: 'tp-num' }, k.ma)], ['Hồ sơ, vụ án', nvHsText(k.hs)]]
    .concat(k.mo ? [['Hạn nộp', k.han || '- (không có hạn nộp trên Cổng)']] : [[k.duocMien ? 'Ngày miễn' : 'Ngày nộp', k.ngay + (k.duocMien ? '' : ' · ' + k.kenh)]]);
  return h('li', { className: 'qd-c qc nv-c' },
    h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem chi tiết: ' + k.nd, 'data-pt-go': 'financeDetail', onClickCapture: nvPick(k) }),
    h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: tt[1], icon: false }, tt[0]), hn ? h('span', { className: 'qd-tinh qc-tinh qd-tinh-' + (hn.qua ? 'warning' : hn.gap ? 'warning' : 'info') }, h('span', { className: 'qc-tinh-tx' }, hn.text)) : null,
      h('button', { type: 'button', className: 'ph-mail2-btn qd-star' + (k.ghim ? ' ph-mail2-on' : ''), 'aria-pressed': !!k.ghim, 'aria-label': k.ghim ? 'Bỏ đánh dấu quan trọng' : 'Đánh dấu quan trọng', onClick: function () { k.ghim = !k.ghim; p.onDoi(); } }, h(T.Icon, { name: 'star' }))),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, k.nd)),
    h('dl', { className: 'qc-ben' }, rows.map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0]), h('dd', null, r[1])); })),
    k.mo ? nvGhiChuThe(k).map(function (n, i) { return h('div', { key: i, className: 'nv-card-note' }, h(NvCall, { tone: n[0] }, n[1])); }) : null,
    nvNopDuoc(k) ? h('div', { className: 'qd-c-f qc-vk vkx-box' }, h('p', { className: 'qc-vk-h vkx-h' }, 'Việc cần làm'), h('ul', { className: 'qc-vk-l' },
      h('li', { className: 'vk-card vka vkx vkx-' + (muc || 'none') }, h('button', { type: 'button', className: 'vka-b', 'data-pt-go': 'financePay', onClickCapture: nvPick(k) },
        h('span', { className: 'vka-tx' }, h('b', null, 'Nộp tiền'), h('small', null, hn ? h(F, null, 'Hạn xử lý · ', h('span', { className: 'vka-han vka-han-' + muc }, hn.text)) : 'Không có thời hạn')))))) : null,
    k.da ? h('div', { className: 'qd-c-f nv-c-bl' }, h('span', { className: 'nv-bl tp-num' }, k.bienLai), h(T.Button, { size: 'sm', variant: 'secondary', icon: 'download', 'data-pt-go': 'snack:Đã tải biên lai ' + k.bienLai + '.pdf' }, 'Tải biên lai PDF')) : null);
}
var NV_KY = [['all', 'Tất cả'], ['90', '90 ngày gần nhất'], ['365', '12 tháng gần nhất'], ['y2026', 'Năm 2026'], ['y2025', 'Năm 2025']];
function NvLocSheet(p) {
  var l = React.useState(p.loc), v = l[0], set = function (k, x) { var n = Object.assign({}, v); n[k] = x; l[1](n); };
  var hsIds = NV.filter(function (k) { return p.nhom === 'mo' ? k.mo : !k.mo; }).map(function (k) { return k.hs; }).filter(function (x, i, a) { return a.indexOf(x) === i; });
  return h(LvSheet, { host: p.host, title: 'Bộ lọc', onClose: p.onClose,
    foot: h(F, null, h(T.Button, { variant: 'secondary', onClick: function () { l[1](Object.assign({}, v, { hs: 'all', ky: 'all', loai: 'all' })); } }, 'Nhập lại'), h(T.Button, { onClick: function () { p.onApply(v); } }, 'Áp dụng')) },
    h('div', { className: 'ib-loc' },
      p.chips ? h(IbPick, { host: p.host, label: 'Loại khoản', v: v.loai, onPick: function (x) { set('loai', x); }, items: p.chips.map(function (c) { return { id: c.key, name: c.label + ' (' + c.count + ')' }; }) }) : null, /* v251: loại khoản chuyển vào Bộ lọc */
      h(IbPick, { host: p.host, label: 'Hồ sơ, vụ án', v: v.hs, onPick: function (x) { set('hs', x); }, items: [{ id: 'all', name: 'Tất cả hồ sơ, vụ án (' + hsIds.length + ')' }].concat(hsIds.map(function (x) { return { id: x, name: nvHsText(x) }; })) }),
      p.nhom === 'xong' ? h(IbPick, { host: p.host, label: 'Ngày nộp', v: v.ky, onPick: function (x) { set('ky', x); }, items: NV_KY.map(function (x) { return { id: x[0], name: x[1] }; }) }) : null));
}
var NV_LOC0 = { q: '', hs: 'all', loai: 'all', ky: 'all' };
/* Danh sách (UC-NV-01 Phải nộp, UC-NV-03 Đã nộp, được miễn) */
function NvList(p) {
  var nh = React.useState(p.nhom || 'mo'), lc = React.useState(NV_LOC0), sh = React.useState(null);
  var anchor = React.useRef(null), host = useHost(anchor), v = lc[0], set = function (k, x) { var n = Object.assign({}, v); n[k] = x; lc[1](n); };
  var mo = NV.filter(function (k) { return k.mo; }), xong = NV.filter(function (k) { return !k.mo; }), daNop = xong.filter(function (k) { return k.da; });
  var tong = function (ds) { return nvTien(ds.reduce(function (s, k) { return s + (k.cxd ? 0 : k.tien || 0); }, 0)); };
  var goc = nh[0] === 'mo' ? mo : xong, tk = v.q.trim().toLowerCase();
  var qua = function (k) { return (v.hs === 'all' || k.hs === v.hs) && (!tk || [k.ma, k.so, k.vb, k.nd, k.hs].join(' ').toLowerCase().indexOf(tk) >= 0); };
  var coSo = goc.filter(qua), ds = coSo.filter(function (k) { return v.loai === 'all' || k.loai === v.loai; });
  if (nh[0] === 'mo') ds.sort(function (a, b) { return (a.dl == null ? 99999 : a.dl) - (b.dl == null ? 99999 : b.dl); });
  var locOn = v.hs !== 'all' || (nh[0] === 'xong' && v.ky !== 'all'), coLoc = !!tk || locOn || v.loai !== 'all';
  var soLoc = [v.loai !== 'all', v.hs !== 'all', nh[0] === 'xong' && v.ky !== 'all'].filter(Boolean).length, rr = React.useState(0);
  var chips = [{ key: 'all', label: 'Tất cả', count: coSo.length }].concat(NV_LOAI.map(function (l) { return { key: l[0], label: l[1], count: coSo.filter(function (k) { return k.loai === l[0]; }).length }; }));
  return Sub('Nghĩa vụ tài chính', h(F, null, h('span', { ref: anchor, hidden: true }),
    /* v280: bỏ dòng mô tả "Bao gồm tạm ứng án phí, tạm ứng lệ phí." */
    /* v279 (chọn D): khối tổng hợp – còn phải nộp (số lớn) trái, đã nộp (xanh) phải, thanh tiến độ đã nộp / tổng, dòng cảnh báo quá hạn hoặc còn ≤ 3 ngày */
    (function () { var tien = function (ds) { return ds.reduce(function (s, k) { return s + (k.cxd ? 0 : k.tien || 0); }, 0); }, a = tien(mo), b = tien(daNop), pc = a + b ? Math.max(2, Math.round(b * 100 / (a + b))) : 0, g = mo.filter(function (k) { var x = nvHan(k); return x && x.gap; }).length;
      return h('section', { className: 'nv-tong', 'aria-label': 'Tổng hợp nghĩa vụ tài chính' },
        h('div', { className: 'nv-tong-h' }, h('span', null, h('small', null, 'Còn phải nộp · ' + mo.length + ' khoản'), h('b', { className: 'tp-num' }, tong(mo))), h('span', { className: 'nv-tong-r' }, h('small', null, 'Đã nộp · ' + daNop.length + ' khoản'), h('b', { className: 'tp-num' }, tong(daNop)))),
        h('div', { className: 'nv-tong-bar', role: 'progressbar', 'aria-label': 'Tỷ lệ đã nộp', 'aria-valuenow': pc, 'aria-valuemin': 0, 'aria-valuemax': 100 }, h('i', { style: { width: pc + '%' } })),
        g ? h('p', { className: 'nv-tong-w' }, h('i', { className: 'ib-dot', 'aria-hidden': 'true' }), h('b', null, g + ' khoản'), ' quá hạn hoặc còn ≤ 3 ngày') : null); })(),
    h('div', { className: 'nv-stick' },
      h(T.Tabs, { label: 'Nhóm khoản', value: nh[0], onChange: function (x) { nh[1](x); lc[1](Object.assign({}, v, { hs: 'all', loai: 'all' })); }, items: [{ key: 'mo', label: 'Phải nộp', count: mo.length }, { key: 'xong', label: 'Đã nộp, được miễn', count: xong.length }] }),
      h('div', { className: 'ph-ibar' },
        h('div', { className: 'fx-search' }, Tf('Tìm kiếm', { icon: 'search', placeholder: 'Mã thông báo, số văn bản, mã hồ sơ', value: v.q, onChange: function (e) { set('q', e.target.value); }, onClear: function () { set('q', ''); } }))),
      /* v251: hàng Bộ lọc như Danh sách đơn – loại khoản, hồ sơ, ngày nộp gom vào bảng Bộ lọc */
      h('div', { className: 'ib-docrow st-row sf-row' }, h('span', { className: 'sf-sp' }),
        h('button', { type: 'button', className: 'sf-pill' + (soLoc ? ' sf-on' : ''), 'aria-label': soLoc ? 'Bộ lọc, đang lọc ' + soLoc + ' điều kiện' : 'Bộ lọc', onClick: function () { sh[1]('loc'); } }, h(T.Icon, { name: 'filter' }), 'Bộ lọc', soLoc ? h('span', { className: 'sf-badge tp-num', 'aria-hidden': 'true' }, soLoc) : null))),
    nh[0] === 'xong' && ds.length ? h('p', { className: 'nv-total' }, 'Tổng đã nộp: ', h('b', { className: 'tp-num' }, tong(ds.filter(function (k) { return k.da; })))) : null,
    ds.length ? h('ul', { className: 'qd-list nv-list' }, ds.map(function (k) { return h(NvCard, { key: k.ma, k: k, onDoi: function () { rr[1](rr[0] + 1); } }); }))
      : h(IbEmpty, { title: nh[0] === 'mo' ? 'Không có khoản nào phải nộp theo bộ lọc này' : 'Không có khoản đã nộp trong khoảng thời gian này', text: coLoc ? 'Bỏ bớt bộ lọc để xem các khoản còn lại.' : '', action: coLoc ? 'Xóa bộ lọc' : null, onAction: function () { lc[1](NV_LOC0); } }),
    nh[0] === 'mo' && mo.length ? h('p', { className: 'nv-foot' }, 'Sau khi nộp trên Cổng Dịch vụ công quốc gia, Tòa án thường xác nhận trong ' + NV_XN + '; khi đó khoản tự chuyển "Đã nộp" và có biên lai.') : null,
    sh[0] === 'loc' && host ? h(NvLocSheet, { host: host, nhom: nh[0], loc: v, chips: chips, onClose: function () { sh[1](null); }, onApply: function (x) { lc[1](x); sh[1](null); } }) : null));
}
function Finance() { return h(NvList, { nhom: 'mo' }); }
function FinanceDone() { return h(NvList, { nhom: 'xong' }); }
/* chưa phát sinh khoản nào (danh sách rỗng) */
function FinanceEmpty() {
  return Sub('Nghĩa vụ tài chính', h(F, null, /* v280 */
    h(T.EmptyState, { variant: 'center', icon: 'wallet', title: 'Chưa phát sinh khoản nào phải nộp', text: 'Tạm ứng án phí, án phí, lệ phí, chi phí tố tụng và tiền bảo đảm sẽ hiển thị tại đây khi Tòa án ra thông báo nộp tiền.' })));
}
/* không tải được danh sách */
function FinanceErr() {
  return Sub('Nghĩa vụ tài chính', h(F, null, /* v280 */
    h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tải được nghĩa vụ tài chính.', text: 'Mã lỗi: [mã lỗi]', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: noop, className: 'nv-err' })));
}
/* lịch sử khoản (mới nhất trước) – dựng như lichSu() của web */
function nvLichSu(k) {
  var ds = [{ title: 'Nhận thông báo nộp tiền', description: [k.vb + ' số ' + k.so, k.tienDau ? nvTien(k.tienDau) : nvTienText(k)].join(' · '), date: k.td }];
  if (k.giam) ds.push({ title: 'Được giảm', description: 'Còn phải nộp ' + nvTien(k.tien) + (k.han ? ' · hạn ' + k.han : ''), date: k.ngayGiam });
  if (k.duocMien) ds.push({ title: 'Được miễn', description: k.lyDo || 'Tòa án quyết định miễn', date: k.ngay });
  if (k.da) ds.push({ title: 'Tòa án xác nhận đã nộp', description: 'Biên lai ' + k.bienLai + ' · ' + k.kenh, date: k.ngay });
  return ds.reverse().map(function (s) { return Object.assign(s, { state: 'done' }); });
}
/* Chi tiết khoản (UC-NV-01 bước 5) */
/* v251 (04/11/2026): chi tiết khoản theo UI chi tiết đơn – phần đầu (loại · mã, tên 16px, nhãn trạng thái + hạn, số tiền), khối nhắc "Nộp tiền" gọn trước tab, 2 tab: Thông tin chung · Lịch sử (nhóm theo ngày) */
function FinanceDetail() {
  var k = nvSel(), tt = nvTrangThai(k), hn = nvHan(k), ten = 'Hoàng Dương';
  var vanBan = k.vb + ' số ' + k.so + ' ngày ' + k.bh;
  var ghi = [];
  if (hn && hn.gap) ghi.push(['danger', hn.qua ? 'Đã quá hạn nộp.' : 'Sắp hết hạn nộp.', (k.hauQua || '') + (hn.qua ? ' Nếu bạn đã nộp, liên hệ Tòa án để được xác nhận.' : '')]);
  if (k.nopThay && k.mo) ghi.push(['info', 'Nộp thay.', 'Bạn nhận thông báo này với tư cách người đại diện và có thể nộp thay. Khi bạn hoặc người phải nộp (hay người đại diện khác) nộp xong, trạng thái khoản được cập nhật chung cho tất cả.']);
  if (k.giam) ghi.push(['info', 'Được giảm.', 'Từ ' + nvTien(k.tienDau) + ' còn ' + nvTien(k.tien) + ' theo ' + k.giam + '.']);
  if (k.cxd) ghi.push(['warning', 'Chưa xác định số tiền.', 'Văn bản tống đạt chưa ghi số tiền cụ thể. Tra số tiền trong văn bản gốc hoặc chờ Tòa án thông báo.']);
  if (k.duocMien) ghi.push(['success', 'Được miễn toàn bộ ' + nvTien(k.tien) + '.', 'Theo ' + k.lyDo + '. Không phải nộp.']);
  var info = [['Mã thông báo', h('span', { className: 'tp-num' }, k.ma)], ['Người phải nộp', k.nopThay ? k.dinhDanh : ten + ' · 001090012345']].concat(k.nopThay ? [['Tư cách của bạn', 'Người đại diện (nộp thay)']] : [],
    [['Gắn với', nvHsText(k.hs)], ['Văn bản căn cứ', vanBan], ['Ngày nhận văn bản', k.td], ['Hạn nộp', k.han || '-']], k.hauQua ? [['Nếu quá hạn', k.hauQua]] : []);
  return h(DtScreen, { title: 'Chi tiết khoản', tabLabel: 'Nội dung khoản', tabs: [{ key: 'tt', label: 'Thông tin chung' }, { key: 'ls', label: 'Lịch sử' }], headCls: 'dt-head-don',
    meta: h(F, null, nvTenLoai(k.loai) + ' · ', h('span', { className: 'tp-num' }, k.ma)), name: k.nd,
    badges: h(F, null, h(T.StatusBadge, { tone: tt[1], icon: false }, tt[0]), hn ? h('span', { className: 'ib-due ib-due-' + (hn.qua ? 'qua' : hn.gap ? 'sap' : 'an') }, hn.text) : null),
    headExtra: h('div', { className: 'nv-dh-amt' }, k.tienDau ? h('s', { className: 'nv-was tp-num' }, nvTien(k.tienDau)) : null,
      h('b', { className: 'tp-num' + (k.cxd ? ' nv-amt-cxd' : '') }, k.mo ? nvTienText(k) : nvTien(k.tien)), !k.cxd ? h('em', null, '(' + nvBangChu(k.tien) + ')') : null),
    pre: nvNopDuoc(k) ? DtTodoGon({ t: 'Nộp tiền', han: k.han ? 'Hạn ' + k.han : null, con: hn ? hn.text.toLowerCase() : null, btn: Btn('Nộp tiền', 'primary', { size: 'sm', 'data-pt-go': 'financePay' }) }) : null,
    render: function (t) {
      if (t === 'ls') return LsG1(nvLichSu(k).map(function (x) { return [x.title, x.date, x.description]; }));
      return h(F, null,
        ghi.map(function (g, i) { return h(NvCall, { key: i, tone: g[0], title: g[1] }, g[2]); }),
        k.mo ? FCard('Cách nộp', h(F, null, P('Nộp trước ' + (k.han || 'khi bản án có hiệu lực') + '. Một khoản nộp một lần, đủ số tiền. Tình trạng chỉ đổi sang "Đã nộp" khi Tòa án xác nhận.', 'ph-muted'),
          k.mien ? h(T.Button, { block: true, variant: 'secondary', 'data-pt-go': 'caseDetail' }, 'Đề nghị miễn, giảm') : null,
          h('p', { className: 'nv-foot' }, 'Tòa án thường xác nhận trong ' + NV_XN + ' sau khi bạn nộp; tình trạng sẽ tự cập nhật.')), true) : null,
        k.da ? FCard('Biên lai ' + k.bienLai + ' · Tòa án đã xác nhận', h(F, null, RvKV([['Ngày nộp', k.ngay], ['Kênh nộp', k.kenh], ['Số tiền', h('span', { className: 'tp-num' }, nvTien(k.tien))]]),
          h(T.Button, { block: true, variant: 'secondary', icon: 'download', 'data-pt-go': 'snack:Đã tải biên lai ' + k.bienLai + '.pdf' }, 'Tải biên lai PDF')), true) : null,
        FCard('Thông tin khoản', h(F, null, RvKV(info),
          k.moTa ? h(T.Notice, { icon: 'info' }, h('b', null, 'Đây là khoản gì? '), k.moTa) : null,
          h(T.Button, { block: true, variant: 'secondary', icon: 'mail', 'data-pt-go': 'mailDetail' }, 'Xem văn bản gốc trong Hộp thư tống đạt')), true));
    } });
}
function nvDetailOf(i) { return function () { window.__nvSel = i; return FinanceDetail(); }; }
/* UC-NV-02 Nộp tiền – bước 1 xác nhận khoản */
function FinancePay() {
  var k = nvSelPay(), ten = 'Hoàng Dương';
  return Sub('Nộp tiền', h(F, null,
    Blk(null, h('div', { className: 'nv-pay' }, h('h2', null, 'Nộp trên Cổng Dịch vụ công quốc gia'),
      P('Cổng Dịch vụ Tư pháp không thu tiền. Cổng DVCQG sẽ mở ở thẻ mới; nhập đúng mã thông báo dưới đây khi nộp.', 'ph-muted'))),
    Blk(null, h(F, null, h(T.InfoList, { variant: 'rows', items: [{ label: 'Khoản nộp', value: k.nd }, { label: 'Loại khoản', value: nvTenLoai(k.loai) },
      { label: 'Mã thông báo', mono: true, value: h('span', { className: 'nv-copy' }, k.ma, h('button', { type: 'button', className: 'nv-copy-btn', 'aria-label': 'Sao chép mã thông báo', 'data-pt-go': 'snack:Đã sao chép mã thông báo.' }, h(T.Icon, { name: 'copy' }))) },
      { label: 'Người phải nộp', value: k.nopThay ? k.dinhDanh : ten + ' · 001090012345' }].concat(k.nopThay ? [{ label: 'Tư cách của bạn', value: 'Người đại diện (nộp thay)' }] : [], [{ label: 'Hạn nộp', value: k.han || 'khi bản án có hiệu lực' }]) }),
      h('div', { className: 'nv-pay-sum' }, h('span', null, 'Số tiền'), h('b', { className: 'tp-num' }, nvTien(k.tien)))))),
    Bar(Btn('Để sau', 'secondary', { 'data-pt-go': 'back' }), Btn('Tiếp tục sang Cổng DVCQG', 'primary', { 'data-pt-go': 'replace:financePayOpen' })));
}
/* bước 2: đã mở Cổng DVCQG */
function FinancePayOpen() {
  var k = nvSelPay();
  return Sub('Nộp tiền', h(F, null,
    h('div', { className: 'ph-success nv-res' }, h('span', { className: 'ph-success-ico nv-res-info' }, h(T.Icon, { name: 'arrowRight' })), h('h2', null, 'Đã mở Cổng DVCQG ở thẻ mới'),
      P('Tình trạng khoản vẫn là "Chưa nộp" cho đến khi Tòa án xác nhận, thường trong ' + NV_XN + '. Khi đó khoản tự chuyển "Đã nộp" và có biên lai. Nếu tiền đã bị trừ, không cần nộp lại.', 'ph-muted')),
    Blk(null, Rows([['Mã thông báo', k.ma, 1], ['Số tiền', nvTien(k.tien), 1], ['Tình trạng khoản', 'Chưa nộp']]))),
    h('div', { className: 'ph-col' }, Btn('Về chi tiết khoản', 'primary', { 'data-pt-go': 'backTo:financeDetail' }), Btn('Mở lại Cổng DVCQG', 'secondary', { 'data-pt-go': 'snack:Đã mở lại Cổng Dịch vụ công quốc gia.' })));
}
/* khoản đã được Tòa án xác nhận giữa chừng (NV-409-DA_DONG) */
function FinancePayClosed() {
  return Sub('Nộp tiền', h('div', { className: 'ph-success nv-res' }, h('span', { className: 'ph-success-ico' }, h(T.Icon, { name: 'check' })), h('h2', null, 'Khoản đã được Tòa án xác nhận'),
    P('Trong lúc bạn thao tác, Tòa án đã xác nhận khoản này (đã nộp hoặc được miễn). Không cần nộp nữa.', 'ph-muted')),
    h('div', { className: 'ph-col' }, Btn('Về chi tiết khoản', 'secondary', { 'data-pt-go': 'backTo:financeDetail' })));
}

/* =====================================================================
   03/11/2026 (v146): Danh sách đơn và tiến trình – vẽ lại theo web /quan-ly-don (index.tsx, o-danh-sach-don, dai-canh-bao-can-xu-ly,
   status, loai-don, can-xu-ly). Tab loại đơn (chỉ tab có đơn, GĐT luôn hiện) · chip trạng thái (DM_TRANGTHAI) · tìm · Sắp xếp ·
   dải "N đơn cần bạn xử lý" · thẻ đơn (sao, ô lĩnh vực, tên loại việc, tóm tắt, vai trò, mã tiếp nhận + ngày gửi, trạng thái,
   tình trạng giải quyết, hạn thực hiện, nút thao tác) · trống theo tab · xác nhận nộp thêm đơn.
   Tên trạng thái / tình trạng / nút thao tác web lấy từ API – ở đây là dữ liệu mẫu.
   ===================================================================== */
var QD_KIND = [['khoikien', 'Đơn khởi kiện'], ['viecdansu', 'Đơn yêu cầu việc dân sự'], ['phasan', 'Đơn yêu cầu phá sản, phục hồi'], ['khangcao', 'Đơn kháng cáo'], ['gdt', 'Đơn giám đốc thẩm, tái thẩm'], ['phanto', 'Đơn phản tố, yêu cầu độc lập']];
/* trạng thái đơn (DM_TRANGTHAI, DOITUONG=DON): ST-01 chưa gửi · ST-01b chờ ký số · ST-02b đã gửi đơn · ST-03 đang giải quyết · ST-04 đã giải quyết */
var QD_TT = [['ST-01', 'Chưa gửi', 'neutral'], ['ST-01b', 'Chờ ký số', 'warning'], ['ST-02b', 'Đã gửi đơn', 'info'], ['ST-03', 'Đang xử lý', 'info'], ['ST-04', 'Đã xử lý', 'success']];
function qdTT(ma) { return QD_TT.filter(function (x) { return x[0] === ma; })[0]; }
/* lv: mã ô lĩnh vực · tt: mã trạng thái · tinh: tình trạng giải quyết [chữ, mức: bo-sung | an-phi | cho | xong] · han: hạn thực hiện · cta: [nút, đích] */
/* v207: dữ liệu demo đủ hành động theo bảng map (dòng 1–29) – tt: mã trạng thái · tinh: [tình trạng (tên RS theo bảng map), mức] · hd: mã hành động (HD) */
var QD = [
  { k: 'khoikien', lv: 'DS', ma: 'TN-20261020-0012', ngay: '20/10/2026', t: 'Tranh chấp hợp đồng vay tài sản', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Yêu cầu sửa đổi, bổ sung đơn', 'bo-sung'], han: ['Còn 3 ngày', 'sap'], hd: ['A021'], go: 'appDetail', ghim: 1 },
  /* v215: đơn khởi kiện có 2 việc cùng lúc, mỗi việc một hạn (dữ liệu demo, ghép từ RS-02 + RS-07 / RS-01 + RS-02) */
  { k: 'khoikien', lv: 'DS', ma: 'TN-20261024-0018', ngay: '24/10/2026', t: 'Tranh chấp hợp đồng xây dựng nhà ở', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Công ty Xây dựng Thành Công', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng án phí / lệ phí', 'an-phi'], hd: ['A017', 'A022'], hanHd: { A017: ['Còn 3 ngày', 'sap'], A022: ['Còn 9 ngày', 'an'] }, go: 'appDetailFee' },
  { k: 'khoikien', lv: 'HC', ma: 'TN-20261023-0015', ngay: '23/10/2026', t: 'Khiếu kiện quyết định thu hồi giấy phép kinh doanh', tom: 'Người khởi kiện: Hoàng Dương · Người bị kiện: Sở Công Thương Hà Nội', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Yêu cầu sửa đổi, bổ sung đơn', 'bo-sung'], hd: ['A021', 'A017'], hanHd: { A021: ['Còn 2 ngày', 'sap'], A017: ['Quá hạn 1 ngày', 'qua'] }, go: 'appDetail' },
  { k: 'khoikien', lv: 'DS', ma: '—', ngay: '22/10/2026', t: 'Tranh chấp hợp đồng mua bán', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Công ty An Phú', vt: 'Người khởi kiện', tt: 'ST-01b', tinh: ['Chờ đủ chữ ký số của người đồng khởi kiện', 'cho'], cta: ['Ký số', 'appDetailSign'], go: 'appDetailSign' },
  { k: 'khoikien', lv: 'KD', ma: 'TN-20261012-0007', ngay: '12/10/2026', t: 'Tranh chấp hợp đồng cung ứng dịch vụ', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Công ty Minh Long', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng án phí / lệ phí', 'an-phi'], han: ['Quá hạn 1 ngày', 'qua'], hd: ['A017'], go: 'appDetailFeeLate' },
  { k: 'khoikien', lv: 'DS', ma: 'TN-20261016-0010', ngay: '16/10/2026', t: 'Tranh chấp bồi thường thiệt hại ngoài hợp đồng', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Đặng Văn Tú', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng chi phí tố tụng', 'an-phi'], han: ['Còn 4 ngày', 'sap'], hd: ['A022'], go: 'appDetailFee' },
  { k: 'khoikien', lv: 'DS', ma: 'TN-20261005-0003', ngay: '05/10/2026', t: 'Tranh chấp quyền sử dụng đất', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Nguyễn Văn Hải', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Đã thụ lý vụ án', 'xong'], go: 'appDetailAccepted' },
  { k: 'khoikien', lv: 'HN', ma: 'TN-20260920-0001', ngay: '20/09/2026', t: 'Ly hôn, tranh chấp nuôi con', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Lê Minh Tú', vt: 'Người khởi kiện', tt: 'ST-04', tinh: ['Đã trả lại đơn', 'xong'], han: ['Còn 5 ngày', 'an'], hd: ['A015'], go: 'appDetailReturned' },
  { k: 'khoikien', lv: 'DS', ma: 'TN-20260915-0006', ngay: '15/09/2026', t: 'Tranh chấp hợp đồng góp vốn', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Vũ Thị Hạnh', vt: 'Người khởi kiện', tt: 'ST-04', tinh: ['Đã giải quyết khiếu nại — giữ nguyên việc trả lại đơn', 'xong'], han: ['Còn 7 ngày', 'an'], hd: ['A008'], go: 'appDetailReturned' },
  { k: 'khoikien', lv: 'HC', ma: 'TN-20261021-0013', ngay: '21/10/2026', t: 'Khiếu kiện quyết định thu hồi đất', tom: 'Người khởi kiện: Hoàng Dương · Người bị kiện: UBND quận Đống Đa', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Yêu cầu sửa đổi, bổ sung đơn', 'bo-sung'], han: ['Còn 6 ngày', 'an'], hd: ['A021'], go: 'appDetail' },
  { k: 'khoikien', lv: 'HC', ma: 'TN-20261019-0011', ngay: '19/10/2026', t: 'Khiếu kiện quyết định xử phạt vi phạm hành chính', tom: 'Người khởi kiện: Hoàng Dương · Người bị kiện: Chi cục Thuế khu vực I', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng án phí / lệ phí', 'an-phi'], han: ['Còn 5 ngày', 'an'], hd: ['A017'], go: 'appDetailFee' },
  { k: 'khoikien', lv: 'HC', ma: 'TN-20261014-0008', ngay: '14/10/2026', t: 'Khiếu kiện quyết định cưỡng chế tháo dỡ công trình', tom: 'Người khởi kiện: Hoàng Dương · Người bị kiện: UBND phường Láng', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng chi phí tố tụng', 'an-phi'], han: ['Còn 2 ngày', 'sap'], hd: ['A022'], go: 'appDetailFee' },
  { k: 'khoikien', lv: 'HC', ma: 'TN-20260925-0002', ngay: '25/09/2026', t: 'Khiếu kiện quyết định không cấp giấy phép xây dựng', tom: 'Người khởi kiện: Hoàng Dương · Người bị kiện: Sở Xây dựng Hà Nội', vt: 'Người khởi kiện', tt: 'ST-04', tinh: ['Đã trả lại đơn', 'xong'], han: ['Còn 4 ngày', 'an'], hd: ['A015'], go: 'appDetailReturned' },
  { k: 'khoikien', lv: 'DS', ma: '—', ngay: '18/10/2026', t: 'Tranh chấp hợp đồng thuê nhà', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Phạm Thị Lan', vt: 'Người khởi kiện', tt: 'ST-01', cta: ['Tiếp tục soạn', 'draftLoad'], go: 'draftLoad' }, /* v332: mở nháp → hộp đang tải */
  { k: 'khoikien', lv: 'LĐ', ma: 'TN-20261001-0002', ngay: '01/10/2026', t: 'Tranh chấp về tiền lương', tom: 'Nguyên đơn: Trần Văn Bình · Bị đơn: Công ty Sao Mai', vt: 'Người đồng khởi kiện', tt: 'ST-02b', tinh: ['Đang chờ Tòa án xem xét đơn', 'cho'], go: 'appDetail' },
  { k: 'viecdansu', lv: 'DS', ma: 'TN-20261015-0009', ngay: '15/10/2026', t: 'Yêu cầu tuyên bố một người mất tích', tom: 'Người yêu cầu: Hoàng Dương · Người bị yêu cầu: Hoàng Văn Nam', vt: 'Người yêu cầu', tt: 'ST-02b', tinh: ['Đang chờ Tòa án xem xét đơn', 'cho'], go: 'appDetail' },
  { k: 'viecdansu', lv: 'DS', ma: 'TN-20261022-0014', ngay: '22/10/2026', t: 'Yêu cầu công nhận thuận tình ly hôn', tom: 'Người yêu cầu: Hoàng Dương, Lê Minh Tú · Người bị yêu cầu: —', vt: 'Người yêu cầu', tt: 'ST-03', tinh: ['Yêu cầu sửa đổi, bổ sung đơn', 'bo-sung'], han: ['Còn 3 ngày', 'sap'], hd: ['A028'], go: 'appDetail' },
  { k: 'viecdansu', lv: 'DS', ma: 'TN-20261017-0010', ngay: '17/10/2026', t: 'Yêu cầu tuyên bố hợp đồng vô hiệu', tom: 'Người yêu cầu: Hoàng Dương · Người bị yêu cầu: Công ty Bất động sản Phú Gia', vt: 'Người yêu cầu', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng án phí / lệ phí', 'an-phi'], han: ['Còn 5 ngày', 'an'], hd: ['A034'], go: 'appDetailFee' },
  { k: 'viecdansu', lv: 'DS', ma: 'TN-20260928-0003', ngay: '28/09/2026', t: 'Yêu cầu hạn chế năng lực hành vi dân sự', tom: 'Người yêu cầu: Hoàng Dương · Người bị yêu cầu: Hoàng Minh Quân', vt: 'Người yêu cầu', tt: 'ST-04', tinh: ['Đã trả lại đơn', 'xong'], han: ['Còn 6 ngày', 'an'], hd: ['A026'], go: 'appDetailReturned' },
  { k: 'viecdansu', lv: 'DS', ma: 'TN-20260910-0001', ngay: '10/09/2026', t: 'Yêu cầu công nhận kết quả hòa giải thành ngoài Tòa án', tom: 'Người yêu cầu: Hoàng Dương · Người bị yêu cầu: Nguyễn Thị Hằng', vt: 'Người yêu cầu', tt: 'ST-04', tinh: ['Đã giải quyết khiếu nại — giữ nguyên việc trả lại đơn', 'xong'], han: ['Còn 8 ngày', 'an'], hd: ['A008'], go: 'appDetailReturned' },
  { k: 'phasan', lv: 'PS', ma: 'TN-20261008-0004', ngay: '08/10/2026', t: 'Yêu cầu mở thủ tục phá sản', tom: 'Người yêu cầu: Hoàng Dương · Tổ chức, doanh nghiệp bị yêu cầu: Công ty Hưng Thịnh', vt: 'Chủ nợ', tt: 'ST-03', tinh: ['Đã thụ lý', 'xong'], go: 'proceedingDetail' },
  { k: 'khangcao', lv: 'KC', ma: 'TN-20261025-0015', ngay: '25/10/2026', t: 'Kháng cáo bản án sơ thẩm số 25/2026/DS-ST', tom: 'Vụ án: DS-2026-0012 · Tòa án: ' + COURT1, vt: 'Người kháng cáo', tt: 'ST-02b', tinh: ['Đang chờ Tòa án xem xét đơn', 'cho'], go: 'appealDetail', xem: 1 },
  { k: 'khangcao', lv: 'KC', ma: 'TN-20261023-0014', ngay: '23/10/2026', t: 'Kháng cáo bản án sơ thẩm số 21/2026/DS-ST', tom: 'Vụ án: DS-2026-0031 · Tòa án: ' + COURT1, vt: 'Người kháng cáo', tt: 'ST-03', tinh: ['Yêu cầu làm lại / sửa đổi đơn kháng cáo', 'bo-sung'], han: ['Còn 4 ngày', 'sap'], hd: ['A016'], go: 'appealSua' },
  { k: 'khangcao', lv: 'KC', ma: 'TN-20261020-0013', ngay: '20/10/2026', t: 'Kháng cáo quá hạn bản án sơ thẩm số 15/2026/KDTM-ST', tom: 'Vụ án: KD-2026-0004 · Tòa án: ' + COURT1, vt: 'Người kháng cáo', tt: 'ST-03', tinh: ['Đang xem xét lý do kháng cáo quá hạn', 'cho'], han: ['Còn 6 ngày', 'an'], hd: ['A020', 'LICH'], hanHd: { A020: ['Còn 6 ngày', 'an'], LICH: ['Còn 2 ngày', 'sap'] }, go: 'appealQuaHan' },
  { k: 'khangcao', lv: 'KC', ma: 'TN-20261018-0012', ngay: '18/10/2026', t: 'Kháng cáo bản án sơ thẩm số 19/2026/HNGĐ-ST', tom: 'Vụ án: HN-2026-0007 · Tòa án: ' + COURT1, vt: 'Người kháng cáo', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng án phí phúc thẩm', 'an-phi'], han: ['Còn 3 ngày', 'sap'], hd: ['A018'], go: 'appealTamUng' },
  { k: 'khangcao', lv: 'KC', ma: 'TN-20261011-0009', ngay: '11/10/2026', t: 'Kháng cáo bản án sơ thẩm số 12/2026/DS-ST (đương sự khác)', tom: 'Vụ án: DS-2026-0018 · Tòa án: ' + COURT1, vt: 'Bị đơn', tt: 'ST-03', tinh: ['Vụ án có kháng cáo', 'cho'], han: ['Còn 9 ngày', 'an'], hd: ['A009'], go: 'appealDetail' },
  { k: 'phanto', lv: 'PT', ma: 'TN-20261028-0018', ngay: '28/10/2026', t: 'Phản tố · Tranh chấp hợp đồng vay tài sản', tom: 'Vụ án: DS-2026-0012 · Tòa án: ' + COURT1, vt: 'Bị đơn', tt: 'ST-02b', tinh: ['Đang chờ Tòa án xem xét đơn', 'cho'], go: 'ptDetail', xem: 1 },
  { k: 'phanto', lv: 'PT', ma: 'TN-20261026-0017', ngay: '26/10/2026', t: 'Phản tố · Tranh chấp hợp đồng mua bán hàng hóa', tom: 'Vụ án: KD-2026-0004 · Tòa án: ' + COURT1, vt: 'Bị đơn', tt: 'ST-03', tinh: ['Đã đưa vào vụ án (phản tố / yêu cầu độc lập)', 'xong'], han: ['Còn 10 ngày', 'an'], hd: ['A047'], go: 'ptDetail' },
  { k: 'phanto', lv: 'PT', ma: 'TN-20261024-0016', ngay: '24/10/2026', t: 'Phản tố · Tranh chấp quyền sử dụng đất', tom: 'Vụ án: DS-2026-0031 · Tòa án: ' + COURT1, vt: 'Bị đơn', tt: 'ST-03', tinh: ['Yêu cầu sửa đổi, bổ sung đơn', 'bo-sung'], han: ['Còn 4 ngày', 'sap'], hd: ['A049'], go: 'ptDetail' },
  { k: 'phanto', lv: 'PT', ma: 'TN-20261021-0015', ngay: '21/10/2026', t: 'Phản tố · Tranh chấp hợp đồng thuê tài sản', tom: 'Vụ án: DS-2026-0027 · Tòa án: ' + COURT1, vt: 'Bị đơn', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng án phí / lệ phí', 'an-phi'], han: ['Còn 5 ngày', 'an'], hd: ['A017'], go: 'ptDetail' },
  { k: 'phanto', lv: 'PT', ma: 'TN-20261009-0005', ngay: '09/10/2026', t: 'Phản tố · Tranh chấp hợp đồng dịch vụ', tom: 'Vụ án: DS-2026-0021 · Tòa án: ' + COURT1, vt: 'Bị đơn', tt: 'ST-04', tinh: ['Đã trả lại đơn', 'xong'], han: ['Còn 6 ngày', 'an'], hd: ['A050'], go: 'ptDetailReturned' },
  { k: 'phanto', lv: 'YC', ma: 'TN-20261027-0019', ngay: '27/10/2026', t: 'Yêu cầu độc lập · Tranh chấp di sản thừa kế', tom: 'Vụ án: DS-2026-0033 · Tòa án: ' + COURT1, vt: 'Người có quyền lợi, nghĩa vụ liên quan', tt: 'ST-03', tinh: ['Đã đưa vào vụ án (phản tố / yêu cầu độc lập)', 'xong'], han: ['Còn 12 ngày', 'an'], hd: ['A048'], go: 'ycDetail' },
  { k: 'phanto', lv: 'YC', ma: 'TN-20261025-0016', ngay: '25/10/2026', t: 'Yêu cầu độc lập · Tranh chấp tài sản chung', tom: 'Vụ án: DS-2026-0029 · Tòa án: ' + COURT1, vt: 'Người có quyền lợi, nghĩa vụ liên quan', tt: 'ST-03', tinh: ['Yêu cầu sửa đổi, bổ sung đơn', 'bo-sung'], han: ['Còn 3 ngày', 'sap'], hd: ['A051'], go: 'ycDetail' },
  { k: 'phanto', lv: 'YC', ma: 'TN-20261022-0015', ngay: '22/10/2026', t: 'Yêu cầu độc lập · Tranh chấp hợp đồng tặng cho', tom: 'Vụ án: DS-2026-0025 · Tòa án: ' + COURT1, vt: 'Người có quyền lợi, nghĩa vụ liên quan', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng án phí / lệ phí', 'an-phi'], han: ['Còn 6 ngày', 'an'], hd: ['A017'], go: 'ycDetail' },
  { k: 'phanto', lv: 'YC', ma: 'TN-20261007-0004', ngay: '07/10/2026', t: 'Yêu cầu độc lập · Tranh chấp hợp đồng chuyển nhượng', tom: 'Vụ án: DS-2026-0019 · Tòa án: ' + COURT1, vt: 'Người có quyền lợi, nghĩa vụ liên quan', tt: 'ST-04', tinh: ['Đã trả lại đơn', 'xong'], han: ['Còn 5 ngày', 'an'], hd: ['A052'], go: 'ycDetailReturned' },
  { k: 'gdt', lv: 'GĐT', ma: 'TN-20261029-0020', ngay: '29/10/2026', t: 'Đề nghị xem xét theo thủ tục giám đốc thẩm', tom: 'Bản án: số 18/2026/DS-PT · Tòa án: Tòa án nhân dân thành phố Hà Nội', vt: 'Người đề nghị', tt: 'ST-02b', tinh: ['Đang chờ Tòa án xem xét đơn', 'cho'], go: 'gdtDetail', xem: 1 },
  { k: 'gdt', lv: 'GĐT', ma: 'TN-20261019-0012', ngay: '19/10/2026', t: 'Đề nghị xem xét theo thủ tục giám đốc thẩm', tom: 'Bản án: số 09/2026/DS-PT · Tòa án: Tòa án nhân dân thành phố Hà Nội', vt: 'Người đề nghị', tt: 'ST-03', tinh: ['Yêu cầu sửa đổi, bổ sung đơn đề nghị', 'bo-sung'], han: ['Còn 5 ngày', 'an'], hd: ['A019'], go: 'gdtDetailFix' },
  { k: 'gdt', lv: 'TT', ma: 'TN-20260930-0006', ngay: '30/09/2026', t: 'Đề nghị xem xét theo thủ tục tái thẩm', tom: 'Bản án: số 05/2026/DS-PT · Tòa án: Tòa án nhân dân thành phố Hà Nội', vt: 'Người đề nghị', tt: 'ST-03', tinh: ['Phiên tòa GĐT / tái thẩm hoãn', 'cho'], han: ['Còn 5 ngày', 'an'], hd: ['LICHH'], go: 'gdtTt' }];
var QD_RONG = { khangcao: 'Bạn chưa có đơn kháng cáo nào. Đơn kháng cáo được tạo từ bản án hoặc quyết định sơ thẩm trong Chi tiết vụ án.', gdt: 'Bạn chưa có đơn giám đốc thẩm, tái thẩm nào.', phanto: 'Bạn chưa có đơn phản tố, yêu cầu độc lập nào. Hai loại đơn này được nộp trong phạm vi một vụ án cụ thể — mở từ trang Chi tiết vụ án liên quan.' };
var QD_SAP = [['NGAYGUI_DESC', 'Mới nhất'], ['SOTIEPNHAN_ASC', 'Mã tiếp nhận']];
var QD_TINH_DOT = { 'bo-sung': 'warning', 'an-phi': 'warning', cho: 'info', xong: 'success' };
/* thẻ đơn: một dòng của bảng 7 cột web → thẻ dọc */
/* v213 (04/11/2026): thẻ đơn sắp theo thứ tự – Trạng thái · Tình trạng · Mã tiếp nhận → Tên đơn (☆) → Nguyên đơn / Bị đơn (các bên) → "Việc cần làm":
   mỗi hành động một thẻ riêng kiểu Việc cần làm ở Trang chủ (biểu tượng · tên việc · "Hạn xử lý · …" màu theo mức hạn · ›), hạn riêng từng việc (d.hanHd; một việc thì dùng d.han).
   Ký số / Tiếp tục soạn cũng là thẻ việc. Bỏ ô lĩnh vực và nhãn vai trò. Việc nộp tiền quá hạn bị khóa. */
function qdBen(tom) { return (tom || '').split(' · ').map(function (x) { var i = x.indexOf(': '); return i > 0 ? [x.slice(0, i), x.slice(i + 2)] : null; }).filter(Boolean); }
function qdViec(d) {
  var khoa = d.han && d.han[1] === 'qua', hh = d.hanHd || {}, ds = [];
  if (d.hd) hdActs(d.hd).forEach(function (a) { var code = d.hd.filter(function (c) { return HD[c] && HD[c][0] === a[0]; })[0]; var hn = hh[code] || (d.hd.length === 1 ? d.han : null); ds.push({ t: a[0], go: a[1], hn: hn, lock: !!hn && hn[1] === 'qua' && a[1] === 'finance' }); }); /* v215: khóa theo hạn riêng của từng việc */
  else if (d.cta) ds.push({ t: d.cta[0], go: d.cta[1], hn: d.han, lock: false });
  return ds;
}
function qdViecIc(g, t) { return g === 'finance' ? 'wallet' : /^cal|^hearing/.test(g) ? 'calendar' : /^kq|^kr/.test(g) ? 'alert' : /Ký số/.test(t) ? 'pen' : /soạn/.test(t) ? 'file' : 'filePlus'; }
function QdCard(p) {
  var d = p.d, tt = qdTT(d.tt), ben = qdBen(d.tom), viec = qdViec(d);
  return h('li', { className: 'qd-c qc' },
    h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem chi tiết: ' + d.t, 'data-pt-go': d.go }),
    /* v219: nhãn trạng thái bỏ dấu chấm; ☆ ở góc phải hàng trạng thái (chọn A); mã tiếp nhận xuống dòng riêng */
    h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: tt[2], icon: false }, tt[1]), d.tinh ? h('span', { className: 'qd-tinh qc-tinh qd-tinh-' + QD_TINH_DOT[d.tinh[1]], title: d.tinh[0] }, h('span', { className: 'qc-tinh-tx' }, d.tinh[0])) : null, h('span', { className: 'qc-sp' }), /* v219: tình trạng dài – một dòng, cắt bằng … */
      h('button', { type: 'button', className: 'ph-mail2-btn qd-star' + (d.ghim ? ' ph-mail2-on' : ''), 'aria-pressed': !!d.ghim, 'aria-label': d.ghim ? 'Bỏ đánh dấu quan trọng' : 'Đánh dấu quan trọng', onClick: function () { d.ghim = !d.ghim; p.onDoi(); }, 'data-pt-go': 'snack:' + (d.ghim ? 'Đã bỏ đánh dấu đơn' : 'Đã đánh dấu đơn') }, h(T.Icon, { name: 'star' }))),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, d.t)),
    /* v221: mã tiếp nhận cùng khối nhãn – giá trị với các bên (đồng nhất kiểu chữ) */
    h('dl', { className: 'qc-ben' }, (function () { var b = ben.filter(function (x) { return x[0] !== 'Tòa án'; }), dau = b.length && (b[0][0] === 'Vụ án' || b[0][0] === 'Bản án') ? [b.shift()] : []; return [['Mã tiếp nhận', h('span', { className: 'tp-num' }, vd(d.ma) + (d.ngay && d.ma && d.ma !== '—' ? ' - ' + d.ngay : ''))]].concat( /* v329: thêm ngày tiếp nhận sau mã (đơn nháp chưa có mã thì không) */ dau, d.vt ? [['Tư cách', d.vt]] : [] /* v319: nhãn Vai trò → Tư cách */, b); })() /* v228: thêm Vai trò · v229: Vụ án / Bản án trước Vai trò, bỏ dòng Tòa án */.map(function (b) { return h('div', { key: b[0] }, h('dt', null, b[0] + ':'), h('dd', null, vd(b[1]))); })),
    !ben.length && d.tom ? h('p', { className: 'qc-tom' }, d.tom) : null,
    viec.length ? h('div', { className: 'qd-c-f qc-vk vkx-box' }, h('p', { className: 'qc-vk-h vkx-h' }, 'Việc cần làm'), /* v214: thẻ việc tô màu theo hạn · v215: bỏ huy hiệu số việc */ h('ul', { className: 'qc-vk-l' }, viec.map(function (v) {
      var m = v.hn ? v.hn[1] : 'an', ly = 'Đã hết hạn nộp tạm ứng án phí.'; /* v350 (QLD1-W14): lý do khóa theo hệ thống */
      return h('li', { key: v.t, className: 'vk-card vka vkx vkx-' + (v.hn ? m : 'none') + (v.lock ? ' q1-lock' : '') }, h('button', { type: 'button', className: 'vka-b', 'aria-disabled': v.lock || undefined, 'data-pt-go': v.lock ? 'snack:' + ly : v.go, 'aria-label': v.t + (v.lock ? ', đang bị khóa: ' + ly : v.hn ? ', hạn xử lý ' + v.hn[0] : '') },
        /* v218: bỏ biểu tượng việc */
        h('span', { className: 'vka-tx' }, h('b', null, v.t), h('small', null, v.hn ? h(F, null, 'Hạn xử lý · ', h('span', { className: 'vka-han vka-han-' + m }, v.hn[0])) : 'Không có thời hạn')),
        v.lock ? h('span', { className: 'q1-lock-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: 'lock' })) : null)); /* v216: bỏ mũi tên › */
    }))) : null); /* v225: bỏ nút Xem đơn – trùng với bấm vào thẻ */
}
/* v195 (04/11/2026): hàng trạng thái + sắp xếp dùng chung, cùng kiểu Hộp thư tống đạt – chip nhỏ bên trái (cuộn ngang khi nhiều), số đếm xám (không hiện ở "Tất cả"), nút chữ sắp xếp bên phải mở bảng chọn */
function StRow(p) {
  var o = React.useState(false), sv = React.useState((p.sorts || ['Mới nhất'])[0]), anchor = React.useRef(null), host = useHost(anchor);
  var sorts = p.sorts || ['Mới nhất', 'Cũ nhất'], cur = p.sort || sv[0];
  if (p.boLoc) return h(StBoLoc, p);
  return h('div', { className: 'ib-docrow st-row' }, h('span', { ref: anchor, hidden: true }),
    h('div', { className: 'ib-chips2 st-chips', role: 'radiogroup', 'aria-label': p.label }, p.items.map(function (x, i) {
      var on = p.value === x.key;
      return h('button', { key: x.key, type: 'button', role: 'radio', 'aria-checked': on, className: 'ib-chip2' + (on ? ' ib-chip2-on' : ''), onClick: function () { p.onChange(x.key); } }, x.label, i > 0 && x.count ? h('span', { className: 'ib-chip2-n tp-num' }, x.count) : null);
    })),
    h('button', { type: 'button', className: 'ph-ibar-sort ib-sort2', 'aria-label': 'Sắp xếp: ' + cur, onClick: function () { o[1](true); } }, h(T.Icon, { name: 'sortDesc' }), cur),
    o[0] && host ? h(LvSheet, { host: host, title: 'Sắp xếp', onClose: function () { o[1](false); } }, h(LvRows, { label: 'Sắp xếp', cur: cur, items: sorts.map(function (x) { return { id: x, name: x }; }), onPick: function (id) { if (p.onSort) p.onSort(id); else sv[1](id); o[1](false); } })) : null);
}
/* v206 (04/11/2026): Danh sách đơn – trạng thái đơn vào bộ lọc, chọn B: nút "Bộ lọc" (phễu) mở bảng "Bộ lọc" có nhóm chip Trạng thái đơn (kèm số đơn) + Xóa lọc / Áp dụng; khi đang lọc nút đỏ có số 1 và chip trạng thái ✕ để bỏ nhanh; "Sắp xếp" giữ bên phải */
function StBoLoc(p) {
  var o = React.useState(null), sv = React.useState((p.sorts || ['Mới nhất'])[0]), tmp = React.useState(p.value), anchor = React.useRef(null), host = useHost(anchor);
  var sorts = p.sorts || ['Mới nhất', 'Cũ nhất'], cur = p.sort || sv[0], tatCa = p.items[0].key;
  var curIt = p.items.filter(function (x) { return x.key === p.value; })[0], loc = !!curIt && p.value !== tatCa;
  return h('div', { className: 'ib-docrow st-row sf-row' }, h('span', { ref: anchor, hidden: true }),
    h('button', { type: 'button', className: 'ph-ibar-sort ib-sort2', 'aria-label': 'Sắp xếp: ' + cur, onClick: function () { o[1]('sort'); } }, h(T.Icon, { name: 'sortDesc' }), cur), /* v210: đổi chỗ – Sắp xếp bên trái, Bộ lọc bên phải */
    h('span', { className: 'sf-sp' }),
    loc ? h('button', { type: 'button', className: 'sf-chip', 'aria-label': 'Bỏ lọc ' + curIt.label, onClick: function () { p.onChange(tatCa); } }, curIt.label, h(T.Icon, { name: 'x' })) : null,
    h('button', { type: 'button', className: 'sf-pill' + (loc ? ' sf-on' : ''), 'aria-label': loc ? 'Bộ lọc, đang lọc 1 điều kiện' : 'Bộ lọc', onClick: function () { tmp[1](p.value || tatCa); o[1]('loc'); } }, h(T.Icon, { name: 'filter' }), 'Bộ lọc', loc ? h('span', { className: 'sf-badge tp-num', 'aria-hidden': 'true' }, '1') : null),
    o[0] === 'sort' && host ? h(LvSheet, { host: host, title: 'Sắp xếp', onClose: function () { o[1](null); } }, h(LvRows, { label: 'Sắp xếp', cur: cur, items: sorts.map(function (x) { return { id: x, name: x }; }), onPick: function (id) { if (p.onSort) p.onSort(id); else sv[1](id); o[1](null); } })) : null,
    o[0] === 'loc' && host ? h(LvSheet, { host: host, title: 'Bộ lọc', onClose: function () { o[1](null); },
      /* v265 (05/11/2026): theo kiểu Phân loại thư – nhãn nhóm xám, dòng tên + số đơn, dòng đang chọn nền xám (surface-sunken) chữ đậm, không dấu tích; chân bảng chỉ còn "Áp dụng" (bỏ lọc = chọn Tất cả) */
      foot: h(T.Button, { block: true, onClick: function () { p.onChange(tmp[0]); o[1](null); } }, 'Áp dụng') },
      h('div', { className: 'ib-pl sf-pl' }, h('p', { className: 'ib-pl-h' }, p.nhom || 'Trạng thái'),
        h('ul', { className: 'ib-pl-list', role: 'radiogroup', 'aria-label': p.nhom || 'Trạng thái' }, p.items.map(function (x) {
          var on = tmp[0] === x.key;
          return h('li', { key: x.key }, h('button', { type: 'button', role: 'radio', 'aria-checked': on, className: 'ib-pl-it' + (on ? ' ib-pl-on' : ''), onClick: function () { tmp[1](x.key); } }, h('span', { className: 'ib-pl-t' }, x.label), h('span', { className: 'ib-pl-n tp-num' }, x.count)));
        })))) : null);
}
function QdSapSheet(p) {
  return h(LvSheet, { host: p.host, title: 'Sắp xếp', onClose: p.onClose }, h(LvRows, { label: 'Sắp xếp', cur: p.cur, items: QD_SAP.map(function (x) { return { id: x[0], name: x[1] }; }), onPick: p.onPick }));
}
/* v198 (04/11/2026): thay thanh tab loại đơn bằng bộ lọc – chọn C (thanh 'Đang xem: loại · n đơn' + Đổi loại đơn → bảng 'Xem loại đơn' có mô tả, số đơn); A ô chọn, B lưới thẻ giữ làm phương án tham khảo */
var QD_KIND_MOTA = { khoikien: 'Khởi kiện vụ án dân sự, hành chính, kinh doanh, lao động…', viecdansu: 'Yêu cầu Tòa án công nhận, giải quyết việc dân sự', phasan: 'Yêu cầu mở thủ tục phá sản, phục hồi doanh nghiệp, hợp tác xã', khangcao: 'Kháng cáo bản án, quyết định sơ thẩm chưa có hiệu lực', gdt: 'Đề nghị xem xét lại bản án đã có hiệu lực pháp luật', phanto: 'Phản tố, yêu cầu độc lập trong vụ án đang giải quyết' };
function qdDem(k) { return QD.filter(function (d) { return d.k === k; }).length; }
function QdKindPick(p) {
  var o = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), cur = p.kinds.filter(function (k) { return k[0] === p.cur; })[0];
  var items = p.kinds.map(function (k) { return { id: k[0], name: k[1], desc: QD_KIND_MOTA[k[0]] + ' · ' + qdDem(k[0]) + ' đơn' }; });
  if (p.kv === 'A') return h('div', { className: 'qk-a' }, h(SelSheet, { label: 'Loại đơn', title: 'Chọn loại đơn muốn xem', v: p.cur, opts: items, onChange: p.onPick }));
  if (p.kv === 'B') return h('div', { className: 'qk-b' }, h('p', { className: 'qk-h' }, 'Bạn muốn xem loại đơn nào?'), h('div', { className: 'qk-b-g', role: 'radiogroup', 'aria-label': 'Loại đơn' }, p.kinds.map(function (k) {
    var on = k[0] === p.cur;
    return h('button', { key: k[0], type: 'button', role: 'radio', 'aria-checked': on, className: 'qk-b-it' + (on ? ' qk-on' : ''), onClick: function () { p.onPick(k[0]); } }, h('b', null, k[1]), h('small', null, qdDem(k[0]) + ' đơn'));
  })));
  return h('div', { className: 'qk-c' }, h('span', { ref: anchor, hidden: true }),
    h('button', { type: 'button', className: 'qk-c-bar', onClick: function () { o[1](true); } }, h(T.Icon, { name: 'funnel' }), h('span', null, h('small', null, 'Đang xem'), h('b', null, cur[1] + ' · ' + qdDem(cur[0]) + ' đơn')), h('em', null, 'Đổi loại đơn')),
    o[0] && host ? h(LvSheet, { host: host, title: 'Xem loại đơn', onClose: function () { o[1](false); } }, h(LvRows, { label: 'Loại đơn', cur: p.cur, items: p.kinds.map(function (k) { return { id: k[0], name: h('span', { className: 'qk-n' }, h('span', null, k[1]), h('span', { className: 'qk-cnt tp-num' }, qdDem(k[0]))) }; }), onPick: function (id) { p.onPick(id); o[1](false); } }) /* v200: bỏ mô tả, giữ số đơn */) : null);
}
/* v203 (04/11/2026, chọn A): chọn loại đơn gộp vào header – dòng nhỏ "Danh sách đơn và tiến trình", dưới là tên loại đơn lớn + ▾ (bấm mở bảng Xem loại đơn; không hiện số lượng); bên phải nút chính "+ Nộp đơn" đúng chuẩn DS (cao 46px); bỏ thanh "Đang xem" có biểu tượng phễu */
function QdShell(p) {
  var o = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), cur = p.kinds.filter(function (k) { return k[0] === p.cur; })[0];
  return h(Phone, { cls: 'ph-hd qh-ph' }, h('span', { ref: anchor, hidden: true }),
    h('header', { className: 'qh' }, h('button', { type: 'button', className: 'tp-icon-btn qh-back', 'aria-label': 'Quay lại', 'data-pt-go': 'back' }, h(T.Icon, { name: 'chevronLeft' })),
      h('button', { type: 'button', className: 'qh-sel', 'aria-haspopup': 'dialog', 'aria-label': 'Loại đơn: ' + cur[1] + '. Đổi loại đơn', onClick: function () { o[1](true); } }, h('small', null, 'Danh sách đơn và tiến trình'), h('span', null, h('b', null, cur[1]), h(T.Icon, { name: 'chevronDown' }))),
      h(T.Button, { size: 'sm', className: 'qh-nop', 'data-pt-go': 'draftAsk' }, 'Nộp đơn mới') /* v204: cỡ sm của DS (cao 36px) · v208: bỏ dấu +, nhãn 'Nộp đơn mới' */),
    h(Body, { cls: 'ph-plain' }, p.body),
    o[0] && host ? h(LvSheet, { host: host, title: 'Xem loại đơn', onClose: function () { o[1](false); } }, h(LvRows, { label: 'Loại đơn', cur: p.cur, items: p.kinds.map(function (k) { return { id: k[0], name: h('span', { className: 'qk-n' }, h('span', null, k[1]), h('span', { className: 'qk-cnt tp-num' }, qdDem(k[0]))) }; }), onPick: function (id) { p.onPick(id); o[1](false); } })) : null);
}
function QdList(p) {
  var kinds = QD_KIND.filter(function (k) { return k[0] === 'gdt' || QD.some(function (d) { return d.k === k[0]; }); });
  var kd = React.useState(p.kind || kinds[0][0]), tt = React.useState('all'), q = React.useState(''), sx = React.useState('NGAYGUI_DESC'), sh = React.useState(null), cx = React.useState(false), dong = React.useState(false), rr = React.useState(0), xn = React.useState(false), lo = React.useState('all');
  var anchor = React.useRef(null), host = useHost(anchor);
  /* v350 (QLD1-W13): lỗi tải danh sách – Mã lỗi + Thử lại */
  if (p.loi) return h(QdShell, { hv: 'A', kinds: kinds, cur: kd[0], onPick: kd[1], body: h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tải được danh sách đơn.', text: 'Mã lỗi: [mã lỗi]', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: noop, className: 'nv-err' }) });
  var trongTab = p.rong ? [] : QD.filter(function (d) { return d.k === kd[0]; }), tk = q[0].trim().toLowerCase();
  var canXuLy = trongTab.filter(function (d) { return d.tinh && (d.tinh[1] === 'bo-sung' || d.tinh[1] === 'an-phi'); });
  var ds = trongTab.filter(function (d) { return (tt[0] === 'all' || d.tt === tt[0]) && (lo[0] === 'all' || d.lv === lo[0]) && (!tk || [d.ma, d.t, d.tom].join(' ').toLowerCase().indexOf(tk) >= 0) && (!cx[0] || canXuLy.indexOf(d) >= 0); });
  if (sx[0] === 'SOTIEPNHAN_ASC') ds = ds.slice().sort(function (a, b) { return a.ma.localeCompare(b.ma); });
  var coLoc = tt[0] !== 'all' || !!tk || cx[0] || lo[0] !== 'all';
  var rongNut = kd[0] === 'phanto' ? ['Xem danh mục vụ án', 'cases'] : kd[0] === 'gdt' ? ['Đề nghị GĐT, tái thẩm', 'gx1'] : ['Nộp đơn mới', 'draftAsk']; /* v350 (QLD1-W12) */
  var chips = [{ key: 'all', label: 'Tất cả', count: trongTab.length }].concat(QD_TT.filter(function (x) { return !(kd[0] === 'phanto' && x[0] === 'ST-01b'); }).map(function (x) { return { key: x[0], label: x[1], count: trongTab.filter(function (d) { return d.tt === x[0]; }).length }; }));
  var moTa = canXuLy.slice(0, 3).map(function (d) { return (d.tinh[1] === 'an-phi' ? 'Tạm ứng án phí' : 'Bổ sung hồ sơ') + (d.han && d.han[1] !== 'qua' ? ' (' + d.han[0].toLowerCase() + ')' : ''); }).join(', ');
  var body = h(F, null, h('span', { ref: anchor, hidden: true }),
    /* v194: bỏ dòng mô tả dưới tiêu đề */
    h('div', { className: 'nv-stick qd-stick' },
      p.hv ? null : p.kv ? h(QdKindPick, { kv: p.kv, kinds: kinds, cur: kd[0], onPick: function (x) { kd[1](x); tt[1]('all'); cx[1](false); lo[1]('all'); } }) : h('div', { className: 'qd-kinds' }, h(T.Tabs, { label: 'Loại đơn', value: kd[0], onChange: function (x) { kd[1](x); tt[1]('all'); cx[1](false); lo[1]('all'); }, items: kinds.map(function (k) { return { key: k[0], label: k[1], count: QD.filter(function (d) { return d.k === k[0]; }).length }; }) })),
      h('div', { className: 'ph-ibar' },
        h('div', { className: 'fx-search' }, Tf('Tìm đơn', { icon: 'search', placeholder: 'Tìm số tiếp nhận, mã vụ án,…', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })),
        null),
      /* v350 (QLD1-W11): tab phản tố – chọn loại Tất cả loại / Phản tố / Yêu cầu độc lập */
      kd[0] === 'phanto' && trongTab.length ? h('div', { className: 'ib-chips2 st-chips q1-loai', role: 'radiogroup', 'aria-label': 'Loại đơn' }, [['all', 'Tất cả loại'], ['PT', 'Phản tố'], ['YC', 'Yêu cầu độc lập']].map(function (x) {
        var on = lo[0] === x[0];
        return h('button', { key: x[0], type: 'button', role: 'radio', 'aria-checked': on, className: 'ib-chip2' + (on ? ' ib-chip2-on' : ''), onClick: function () { lo[1](x[0]); } }, x[1]);
      })) : null,
      h(StRow, { boLoc: true, nhom: 'Trạng thái đơn', label: 'Lọc theo trạng thái', value: cx[0] ? null : tt[0], onChange: function (x) { tt[1](x); cx[1](false); }, items: chips, sorts: QD_SAP.map(function (x) { return x[1]; }), sort: QD_SAP.filter(function (x) { return x[0] === sx[0]; })[0][1], onSort: function (n) { sx[1](QD_SAP.filter(function (x) { return x[1] === n; })[0][0]); } })),
    kd[0] === 'gdt' ? h('div', { className: 'qd-gdt' }, h(T.Button, { size: 'sm', icon: 'plus', 'data-pt-go': 'tx1' }, 'Đề nghị Tái thẩm'), h(T.Button, { size: 'sm', icon: 'plus', 'data-pt-go': 'gx1' }, 'Đề nghị Giám đốc thẩm')) : null,
    canXuLy.length && !dong[0] ? h(QdBand, { n: canXuLy.length, moTa: moTa, cx: cx[0], onXem: function () { cx[1](!cx[0]); }, onClose: function () { dong[1](true); } }) : null, /* v209: kiểu khối cam kết – chọn B */
    ds.length ? h('ul', { className: 'qd-list' }, ds.map(function (d) { return h(QdCard, { key: d.ma + d.t, d: d, onDoi: function () { rr[1](rr[0] + 1); } }); }))
      : coLoc ? h(IbEmpty, { title: 'Không có đơn phù hợp', text: 'Không tìm thấy đơn nào với bộ lọc hiện tại. Thử đổi bộ lọc hoặc xóa từ khóa tìm kiếm.', action: 'Xóa bộ lọc', onAction: function () { tt[1]('all'); q[1](''); cx[1](false); lo[1]('all'); } })
      : h('div', { className: 'q1-rong' }, h(IbEmpty, { icon: 'folder', title: 'Bạn chưa có đơn nào', text: QD_RONG[kd[0]] || 'Hãy bắt đầu bằng cách nộp đơn khởi kiện đầu tiên của bạn.' }),
        h(T.Button, { size: 'sm', icon: kd[0] === 'phanto' ? undefined : 'plus', 'data-pt-go': rongNut[1] }, rongNut[0])), /* v350 (QLD1-W12) */
    p.confirm && host ? ReactDOM.createPortal(h(T.Dialog, { variant: 'center', inline: true, open: true, className: 'qd-dlg', title: 'Xác nhận nộp thêm đơn', description: '[Nội dung xác nhận theo hành động – noiDungXacNhanNopLai]',
      footer: h(F, null, h(T.Button, { variant: 'secondary', 'data-pt-go': 'back' }, 'Huỷ'), h(T.Button, { 'data-pt-go': 'replace:evidence2' }, 'Tiếp tục nộp thêm')) }), host) : null,
    sh[0] === 'sap' && host ? h(QdSapSheet, { host: host, cur: sx[0], onClose: function () { sh[1](null); }, onPick: function (id) { sx[1](id); sh[1](null); } }) : null);
  if (p.hv) return h(QdShell, { hv: p.hv, kinds: kinds, cur: kd[0], onPick: function (x) { kd[1](x); tt[1]('all'); cx[1](false); lo[1]('all'); }, body: body });
  return Sub('Danh sách đơn và tiến trình', body, null, [{ icon: 'plus', label: 'Nộp đơn mới' }]);
}
function Applications() { return h(QdList, { kv: 'C', hv: 'A' }); } /* v198: bộ lọc loại đơn chọn C */
function ApplicationsGdt() { return h(QdList, { kind: 'gdt', kv: 'C', hv: 'A' }); }
/* chưa có đơn nào (cả 6 tab đều 0 đơn) */
function ApplicationsEmpty() {
  return Sub('Danh sách đơn và tiến trình', h(F, null, 
    h(T.EmptyState, { variant: 'center', icon: 'folder', title: 'Bạn chưa có đơn nào', actionLabel: 'Nộp đơn mới', actionIcon: 'plus', onAction: noop, className: 'qd-empty-new' })), null, [{ icon: 'plus', label: 'Nộp đơn mới' }]);
}
/* xác nhận nộp thêm đơn (ModalXacNhan của web) – hộp thoại giữa màn trên danh sách */
function AppConfirmMore() { return h(QdList, { confirm: true, kv: 'C', hv: 'A' }); }

/* ---- Chi tiết đơn: các tình huống (chi-tiet.tsx: KhoiTienDoKy, BannerVuAnDaThuLy, BannerThongBaoHeader, KhoiLapLaiDon) ---- */
function qdBadges(a, b) { return h(F, null, h(T.StatusBadge, { tone: a[1], icon: false }, a[0]), b ? h(T.StatusBadge, { tone: b[1], icon: false }, b[0]) : null); }
/* đơn "Chờ ký số": tiến độ ký của người đồng khởi kiện; đủ chữ ký mới nộp được */
function AppDetailSign(du) {
  return h(DonChiTiet, { meta: h(F, null, h('span', { className: 'tp-num' }, '-'), ' · Ngày tạo 22/10/2026'), name: 'Đơn khởi kiện – Tranh chấp hợp đồng mua bán',
    badges: qdBadges(['Chờ ký số', 'warning']),
    /* v252: nút Nộp đơn lên khối đầu màn (xám – không có hạn); danh sách người ký giữ ở tab */
    viec: { tone: 'neutral', t: 'Tiến độ ký số', btn: du ? { l: 'Nộp đơn', ic: 'send', go: 'snack:Đã gửi đơn khởi kiện thành công.' } : { l: 'Chờ đủ chữ ký để nộp đơn', dis: true } },
    top: Blk('Tiến độ ký số', h(F, null,
      h(T.SignerList, { document: 'Hồ sơ đơn khởi kiện', onView: noop, signers: [{ name: 'Hoàng Dương', role: 'Người khởi kiện', signed: true, signedAt: 'Đã ký 22/10/2026 09:12' },
        { name: 'Trần Văn Bình', role: 'Người đồng khởi kiện', signed: !!du, signedAt: du ? 'Đã ký 23/10/2026 14:30' : undefined }] }),
      du ? null : P('Hồ sơ đang có người ký, hệ thống đang xử lý — vui lòng chờ rồi thử lại.', 'ph-muted dt-small')), { cls: 'qd-ky' }) });
}
/* đơn đã thụ lý thành vụ án – banner ở mọi tab */
function AppDetailAccepted() {
  return h(DonChiTiet, { nd: 'file', vuAn: 1, meta: h(F, null, h('span', { className: 'tp-num' }, 'TN-20261005-0003'), ' · Ngày tạo 05/10/2026'), name: 'Đơn khởi kiện – Tranh chấp quyền sử dụng đất',
    badges: qdBadges(['Đang xử lý', 'info'], ['Đã thụ lý vụ án', 'success']),
    /* v252: banner đỏ "VỤ ÁN ĐÃ THỤ LÝ" thay bằng khối đầu màn (xám – thông tin) */
    viec: { tone: 'neutral', t: 'Đơn đã được thụ lý thành Vụ án DS-2026-0012', han: COURT1 + ' · Thụ lý 15/10/2026', btn: { l: 'Xem chi tiết Vụ án', v: 'secondary', go: 'caseDetail' } } });
}
/* tạm ứng án phí: còn hạn – 2 nút; quá hạn – chỉ thông báo đỏ, ẩn nút */
function AppDetailFee(tre) {
  return h(DonChiTiet, { nd: tre ? 'file' : 'nhap', tamUng: tre ? 'tre' : 'con', meta: h(F, null, h('span', { className: 'tp-num' }, 'TN-20261012-0007'), ' · Ngày tạo 12/10/2026'), name: 'Đơn khởi kiện – Tranh chấp hợp đồng cung ứng dịch vụ',
    badges: qdBadges(['Đang xử lý', 'info'], ['Chờ nộp tạm ứng án phí / lệ phí', 'warning']),
    /* v252: khối đầu màn – còn hạn: vàng, nút Thanh toán + mũi tên mở "Đề nghị miễn, giảm án phí"; quá hạn: đỏ, không nút ("Quá hạn 1 ngày" theo thẻ danh sách) */
    viec: tre ? { tone: 'danger', t: 'Nộp tạm ứng án phí 1.250.000 đ', han: 'Hạn 02/11/2026', con: 'Quá hạn 1 ngày' }
      : { t: 'Nộp tạm ứng án phí 1.250.000 đ', han: 'Hạn 06/11/2026', btn: { l: 'Thanh toán qua Cổng Dịch vụ công Quốc gia', go: 'financePay' }, more: [{ l: 'Đề nghị miễn, giảm án phí', go: 'mg1' }] } });
}
var QD_PHAN = [['Thông tin các bên và địa chỉ', 'Giữ nguyên, dùng lại được cho đơn mới.', 1], ['Nội dung yêu cầu khởi kiện', 'Giữ nguyên phần mô tả quan hệ tranh chấp và yêu cầu cụ thể.', 1], ['Tài liệu, chứng cứ đã nộp', '3 tệp còn hiệu lực, tự đính kèm lại vào đơn mới.', 1], ['Nội dung Tòa án nêu chưa đạt', 'Người khởi kiện không sửa đổi, bổ sung đơn khởi kiện theo yêu cầu của Thẩm phán trong thời hạn (điểm e khoản 1 Điều 192 BLTTDS).', 0]];
/* đơn bị trả lại: Lập lại đơn từ phần hợp lệ + Khiếu nại việc trả lại đơn */
function AppDetailReturned() {
  return h(DonChiTiet, { nd: 'file', kq: 1, meta: h(F, null, h('span', { className: 'tp-num' }, 'TN-20260920-0001'), ' · Ngày tạo 20/09/2026'), name: 'Đơn khởi kiện – Ly hôn, tranh chấp nuôi con',
    badges: qdBadges(['Đã xử lý', 'success'], ['Đã trả lại đơn', 'neutral']),
    /* v252: khối đầu màn đỏ (bị trả lại); chưa xác định nút chính nên hiện cả 2 nút, chia đôi hàng dưới */
    viec: { tone: 'danger', t: 'Đã trả lại đơn', han: 'Thông báo trả lại đơn khởi kiện số 21/2026/TB-TLĐ', two: [{ l: 'Lập đơn mới từ đơn này', go: 'sub1' }, { l: 'Khiếu nại việc trả lại đơn (Trong 10 ngày)', v: 'secondary', go: 'kr1' }] },
    top: h(F, null,
      Blk('Lập lại đơn từ phần hợp lệ', h(F, null,
        P('Phần dưới đây được Cổng giữ lại từ đơn bị trả để bạn dùng làm căn cứ lập đơn mới, không phải khai lại từ đầu. Phần Tòa án nêu là chưa đạt thì phải sửa trước khi gửi.', 'ph-muted'),
        h('ul', { className: 'qd-phan' }, QD_PHAN.map(function (x) { return h('li', { key: x[0], className: x[2] ? 'qd-phan-ok' : 'qd-phan-no' }, h('span', { className: 'qd-phan-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: x[2] ? 'check' : 'x' })), h('div', null, h('b', null, x[0]), h('small', null, x[1]))); })),
        P('Luồng nộp đơn mới chưa tự nạp phần hợp lệ của đơn bị trả — bạn cần khai lại nội dung.', 'ph-muted dt-small')))) });
}

/* =====================================================================
   03/11/2026 (v147): luồng con của Danh sách đơn – các đơn liên quan tạo từ Chi tiết đơn (TaoDonLienQuan).
   Khung dùng chung: Wz (thanh bước, Lưu nháp, Quay lại / Tiếp theo), KyGuiDon (xem lại + ký số + gửi), OkScr (kết quả).
   ===================================================================== */
/* khối ký số dùng chung bước cuối: danh sách tệp ký, người ký, cam đoan; nút gửi chỉ bật khi đã ký */
function KyGuiDon(o) {
  var ky = React.useState(false), sh = React.useState(false), cd = React.useState(!o.camDoan), anchor = React.useRef(null), host = useHost(anchor), da = ky[0];
  return Wz({ title: o.title, steps: o.steps, n: o.steps.length, save: o.save, body: h(F, null, h('span', { ref: anchor, hidden: true }), o.lead ? Lead(o.lead) : null, o.top || null,
    FCard(o.kyTitle || 'Ký số', h(F, null,
      h('ul', { className: 'ph-ky' }, o.tep.map(function (f, i) { return h('li', { key: f }, h('div', null, h('b', null, f), i === 0 && o.tepMeta ? h('small', null, o.tepMeta) : null), IcoBtn('eye', 'Xem ' + f)); }),
        laTC() ? h(KyTcRows, { tep: o.tep, onXong: function () { ky[1](true); } }) /* v334 */ : h('li', null, h('span', { className: 'ph-ky-no' }, '1'), h('div', null, h('b', null, 'Hoàng Dương'), h('small', null, o.vaiTro || 'Người nộp đơn'), da ? h('small', { className: 'ph-ky-da' }, KY_LUC) : null),
          da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn', onClick: function () { sh[1](true); } }, 'Ký số'))),
      da ? null : P(o.kyNote || 'Cần ký số bản đơn và toàn bộ tài liệu đính kèm trước khi gửi.', 'ph-muted dt-small')), true, da ? 'signed' : 'unsigned'),
    o.bottom || null,
    o.camDoan ? h('div', { className: 'ph-commit' }, h(T.Checkbox, { label: o.camDoan, checked: cd[0], onChange: function (e) { cd[1](e.target.checked); } })) : null,
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: o.tep, onClose: function () { sh[1](false); }, onKy: function () { sh[1](false); ky[1](true); } }), host) : null),
    last: Btn(o.sendLabel || 'Gửi đơn', 'primary', (da || o.kyTuyChon) && cd[0] ? { 'data-pt-go': 'replace:' + o.ok } : { disabled: true, title: 'Cần ký số trước khi gửi' }) });
}
/* màn kết quả */
function OkScr(o) {
  return h(Phone, { cls: 'ph-ok' }, h(Body, { cls: 'ph-ok-b' },
    h('div', { className: 'ph-success' }, h('span', { className: 'ph-success-ico' + (o.warn ? ' nv-res-info' : '') }, h(T.Icon, { name: o.icon || 'checkCircle' })), h('h2', null, o.title), o.text ? P(o.text, 'ph-muted') : null),
    o.info ? Blk(null, Rows(o.info)) : null, o.extra || null),
    h('div', { className: 'ph-col ph-ok-foot' }, o.btns));
}
/* hộp ghi chú xám có tiêu đề (HopGhiChu của web) */
function HopGhi(t, c) { return h('div', { className: 'mg-note' }, h('b', null, t), h('p', null, c)); }
/* thẻ chọn một trong nhiều (radio dạng thẻ) */
function ChonThe(p) {
  return h('div', { className: 'mg-opts', role: 'radiogroup', 'aria-label': p.label }, p.items.map(function (x) {
    var on = p.v === x.id;
    return h('button', { key: x.id, type: 'button', role: 'radio', 'aria-checked': on, className: 'mg-opt' + (on ? ' mg-opt-on' : ''), onClick: function () { p.onPick(x.id); } },
      h('span', { className: 'mg-opt-r', 'aria-hidden': 'true' }), h('span', { className: 'mg-opt-tx' }, h('b', null, x.t), x.d ? h('small', null, x.d) : null, x.tag ? h('em', null, x.tag) : null));
  }));
}
/* ô chọn → bảng từ đáy (dùng IbPick) */
function ChonO(p) { return h(IbPick, { host: p.host, label: p.label, v: p.v, placeholder: p.placeholder || 'Chọn', onPick: p.onPick, items: p.items }); }

/* ---------- Đề nghị miễn, giảm tạm ứng án phí (web /mien-giam-an-phi) ---------- */
var MG_STEPS = ['Vụ việc & diện miễn, giảm', 'Căn cứ & lý do', 'Tài liệu chứng minh', 'Xem lại & ký gửi'];
var MG_UI = { loai: 'mien' };
/* danh mục DIEN_MIEN_100 (Điều 12) và CAN_CU_GIAM_50 (Điều 13) – lib/danh-muc-don-phu.ts */
var MG_MIEN = [['Người lao động khởi kiện về quyền lợi lao động', 'Giấy tờ, thẻ chứng minh thuộc đối tượng ưu tiên chính sách'], ['Yêu cầu cấp dưỡng, xác định cha, mẹ cho con chưa thành niên', 'Giấy tờ, thẻ chứng minh thuộc đối tượng ưu tiên chính sách'], ['Cá nhân thuộc hộ nghèo', 'Giấy chứng nhận hộ nghèo hoặc giấy xác nhận của UBND cấp xã'], ['Cá nhân thuộc hộ cận nghèo', 'Giấy chứng nhận hộ cận nghèo hoặc giấy xác nhận của UBND cấp xã'], ['Người cao tuổi (từ đủ 60 tuổi trở lên)', 'Căn cước công dân gắn chip — hệ thống tự nhận diện ngày sinh'], ['Người khuyết tật', 'Giấy xác nhận mức độ khuyết tật do UBND cấp xã cấp'], ['Người có công với cách mạng', 'Quyết định phong tặng danh hiệu, thẻ thương binh hoặc giấy chứng nhận người có công'], ['Đồng bào dân tộc thiểu số ở xã có điều kiện kinh tế – xã hội đặc biệt khó khăn', 'Giấy xác nhận nơi cư trú tại xã đặc biệt khó khăn'], ['Thân nhân liệt sĩ', 'Giấy chứng nhận gia đình liệt sĩ']];
var MG_GIAM = [['Bị thiệt hại nặng nề do thiên tai, bão lũ, hỏa hoạn', 'Văn bản xác nhận của UBND cấp xã về sự kiện bất khả kháng và hoàn cảnh khó khăn'], ['Mắc bệnh hiểm nghèo, tai nạn nghiêm trọng phải điều trị dài ngày', 'Văn bản xác nhận của UBND cấp xã về sự kiện bất khả kháng và hoàn cảnh khó khăn'], ['Mất toàn bộ hoặc phần lớn tài sản do sự kiện bất khả kháng khác', 'Văn bản xác nhận của UBND cấp xã về sự kiện bất khả kháng và hoàn cảnh khó khăn']];
function Mg1() {
  var l = React.useState(MG_UI.loai); MG_UI.loai = l[0];
  return Wz({ title: 'Miễn, giảm án phí', steps: MG_STEPS, n: 1, go: 'mg2', body: h(F, null,
    FCard('Nghĩa vụ tạm ứng án phí', RvKV([['Mã vụ việc, đơn khởi kiện liên quan', h('span', { className: 'tp-num' }, 'TN-20261012-0007')], ['Loại việc', 'Tranh chấp hợp đồng cung ứng dịch vụ'], ['Tòa án tiếp nhận và giải quyết', COURT1],
      ['Số tiền tạm ứng theo thông báo', '1.250.000 đ'], ['Hạn nộp', '06/11/2026'], ['Số tiền nếu được giảm 50%', '625.000 đ'], ['Tình trạng', 'Chưa nộp']]), true),
    FCard('Bạn đề nghị miễn hay giảm?', h(F, null, Lead('Hai thủ tục khác nhau về mức miễn giảm, đối tượng áp dụng và giấy tờ phải có.'),
      h(ChonThe, { label: 'Bạn đề nghị miễn hay giảm?', v: l[0], onPick: l[1], items: [
        { id: 'mien', t: 'Miễn 100% tạm ứng án phí, án phí', d: 'Dành cho người lao động đòi quyền lợi, người yêu cầu cấp dưỡng, hộ nghèo, hộ cận nghèo, người cao tuổi, người khuyết tật, người có công, đồng bào dân tộc thiểu số ở xã đặc biệt khó khăn, thân nhân liệt sĩ (Điều 12 Nghị quyết 326/2016/UBTVQH14).', tag: 'Không phải nộp' },
        { id: 'giam', t: 'Giảm 50% tạm ứng án phí, án phí', d: 'Dành cho người gặp sự kiện bất khả kháng dẫn đến không còn đủ tài sản để nộp (Điều 13 Nghị quyết 326/2016/UBTVQH14). Bắt buộc có giấy xác nhận của UBND cấp xã.', tag: 'Còn nộp 625.000 đ' }] })), true)) });
}
function Mg2() {
  var giam = MG_UI.loai === 'giam', anchor = React.useRef(null), host = useHost(anchor), v = React.useState(''), t = React.useState('');
  return Wz({ title: 'Miễn, giảm án phí', steps: MG_STEPS, n: 2, go: 'mg3', body: h(F, null, h('span', { ref: anchor, hidden: true }),
    FCard(giam ? 'Đề nghị giảm 50% tạm ứng án phí, án phí' : 'Đề nghị miễn 100% tạm ứng án phí, án phí', h(F, null,
      h(ChonO, { host: host, label: giam ? 'Căn cứ sự kiện bất khả kháng' : 'Diện đối tượng đề nghị miễn', v: v[0], onPick: v[1], items: (giam ? MG_GIAM : MG_MIEN).map(function (x, i) { return { id: 'c' + i, name: x[0] }; }) }),
      P(giam ? 'Danh mục theo Điều 13 Nghị quyết 326/2016/UBTVQH14.' : 'Danh mục theo Điều 12 Nghị quyết 326/2016/UBTVQH14. Chọn diện đúng với giấy tờ bạn đang có.', 'ph-muted dt-small'),
      Tf('Trình bày hoàn cảnh và lý do đề nghị', { required: true, multiline: true, value: t[0], onChange: function (e) { t[1](e.target.value); }, placeholder: 'Nêu rõ hoàn cảnh kinh tế hiện tại, lý do không có khả năng tài chính để nộp tạm ứng án phí và nguyện vọng đề nghị Tòa án xem xét…' }),
      P('Tối thiểu 50 ký tự, tối đa 2.000 ký tự. · ' + t[0].length + '/2.000', 'ph-muted dt-small'),
      v[0] ? HopGhi('Giấy tờ phải kèm cho trường hợp này', (giam ? MG_GIAM : MG_MIEN)[+v[0].slice(1)][1]) : null,
      giam ? HopGhi('Mức giảm do pháp luật ấn định', '50% — nếu được chấp nhận, số tiền còn phải nộp là 625.000 đ thay cho 1.250.000 đ.') : null), true)) });
}
function Mg3() {
  return Wz({ title: 'Miễn, giảm án phí', steps: MG_STEPS, n: 3, go: 'mg4', body: FCard('Tài liệu, chứng cứ chứng minh diện miễn, giảm',
    h(T.FileUpload, { hint: 'PDF, JPG, PNG, DOCX — tối đa 10 MB mỗi tệp. Bắt buộc ít nhất một tệp. Có thể chọn tài liệu sẵn có trong Kho dữ liệu cá nhân.', uploadLabel: 'Tải tài liệu từ thiết bị', libraryLabel: 'Chọn từ Kho dữ liệu cá nhân',
      files: [{ name: 'giay-xac-nhan-ho-ngheo.pdf', meta: 'PDF · 820 KB', status: 'done' }] }), true) });
}
function Mg4() {
  return h(KyGuiDon, { title: 'Miễn, giảm án phí', steps: MG_STEPS, lead: 'Kiểm tra lại đơn, ký số rồi gửi tới Tòa án.', ok: 'mgOk', tep: ['Đơn đề nghị miễn, giảm tạm ứng án phí', 'giay-xac-nhan-ho-ngheo.pdf'], tepMeta: 'Xem trước đơn',
    kyNote: 'Cần ký số bản đơn và toàn bộ tài liệu chứng minh trước khi gửi.',
    top: FCard('Đề nghị', RvKV([['Loại đề nghị', MG_UI.loai === 'giam' ? 'Đề nghị giảm 50% tạm ứng án phí, án phí' : 'Đề nghị miễn 100% tạm ứng án phí, án phí'], ['Căn cứ', '[Căn cứ đã chọn]'], ['Tài liệu chứng minh (1 tệp)', 'giay-xac-nhan-ho-ngheo.pdf']]), true),
    bottom: h(F, null, HopGhi('Sau khi gửi', 'Đơn khởi kiện chuyển nhãn "Đang chờ xét miễn, giảm án phí", đồng hồ 07 ngày nộp tiền tạm dừng. Thẩm phán trả lời trong 03 ngày làm việc.'),
      HopGhi('Ba kết quả có thể xảy ra', 'Miễn 100%: hủy nghĩa vụ nộp tiền, đơn chuyển sang thụ lý. Giảm 50%: số tiền phải nộp còn 625.000 đ, đồng hồ nộp tiền chạy lại kèm mã QR thanh toán mới. Không chấp nhận: bạn nộp đủ 1.250.000 đ trong thời hạn còn lại.'),
      HopGhi('Nếu không được chấp nhận', 'Trong 03 ngày làm việc kể từ ngày nhận được thông báo, bạn có quyền khiếu nại đến Chánh án Tòa án. Chánh án trả lời trong 03 ngày làm việc và quyết định đó là quyết định cuối cùng (Điều 16 Nghị quyết 326/2016/UBTVQH14).')) });
}
function MgOk() { return h(OkScr, { title: 'Đã gửi đơn đề nghị miễn, giảm tạm ứng án phí.', text: 'Thẩm phán trả lời trong 03 ngày làm việc.', btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'backTo:appDetailFee' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applications' })) }); }
function MgLate() {
  return SubS('Miễn, giảm án phí', h(F, null, h(IbEmpty, { title: 'Đã quá hạn nộp tạm ứng án phí', text: 'Hạn nộp đề nghị miễn, giảm là 02/11/2026, đã quá 1 ngày. Đơn được nộp đề nghị miễn, giảm trong 07 ngày kể từ ngày nhận thông báo nộp tiền (Điều 195 Bộ luật Tố tụng dân sự 2015).' }),
    h('div', { className: 'qd-empty-act' }, h(T.Button, { size: 'sm', variant: 'secondary', icon: 'arrowLeft', 'data-pt-go': 'back' }, 'Về chi tiết đơn'))));
}
function MgDenied() {
  return SubS('Miễn, giảm án phí', h(F, null, h(IbEmpty, { title: 'Không thể nộp đề nghị miễn, giảm', text: 'Bạn không có quyền nộp đề nghị miễn, giảm tạm ứng án phí cho đơn này theo thông báo hiện tại của Tòa án.' }),
    h('div', { className: 'qd-empty-act' }, h(T.Button, { size: 'sm', variant: 'secondary', icon: 'arrowLeft', 'data-pt-go': 'back' }, 'Về chi tiết đơn'))));
}

/* ---------- Yêu cầu rút đơn khởi kiện (web /rut-don) ---------- */
var RD_STEPS = ['Đơn cần rút', 'Lý do & hệ quả', 'Xác nhận & ký gửi'];
var RD_LYDO = [['RD-1', 'Các bên đã tự thỏa thuận được với nhau', 'Không cần Tòa án tiếp tục giải quyết.'], ['RD-2', 'Không còn nhu cầu giải quyết tại Tòa án'], ['RD-3', 'Nộp nhầm loại đơn hoặc sai thẩm quyền', 'Bạn sẽ nộp lại đơn đúng loại việc, đúng Tòa án.'], ['RD-4', 'Cần chuẩn bị lại hồ sơ, chứng cứ'], ['RD-5', 'Lý do khác', 'Trình bày cụ thể ở ô bên dưới.']];
function Rd1() {
  return Wz({ title: 'Rút đơn', steps: RD_STEPS, n: 1, go: 'rd2', body: FCard('Đơn bạn đề nghị rút', h(F, null, Lead('Kiểm tra đúng đơn trước khi tiếp tục. Thông tin lấy tự động, không sửa được.'),
    RvKV([['Mã đơn', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Loại đơn', 'Đơn khởi kiện – Tranh chấp hợp đồng vay tài sản'], ['Ngày gửi', '20/10/2026'], ['Tòa án tiếp nhận', COURT1], ['Trạng thái hiện tại', 'Đã gửi đơn'], ['Vụ án liên quan', 'Chưa phát sinh']])), true) });
}
function Rd2() {
  var l = React.useState('RD-1'), t = React.useState('');
  return Wz({ title: 'Rút đơn', steps: RD_STEPS, n: 2, go: 'rd3', body: h(F, null,
    FCard('Lý do rút đơn', h(F, null, Lead('Thông tin này giúp Tòa án xử lý yêu cầu nhanh hơn.'),
      h(ChonThe, { label: 'Lý do rút đơn', v: l[0], onPick: l[1], items: RD_LYDO.map(function (x) { return { id: x[0], t: x[1], d: x[2] }; }) }),
      Tf('Trình bày', { required: l[0] === 'RD-5', multiline: true, value: t[0], onChange: function (e) { t[1](e.target.value); }, placeholder: 'Hai bên đã thỏa thuận xong ngày 20/06/2026…', error: l[0] === 'RD-5' && t[0].length > 0 && t[0].length < 15 ? 'Nêu rõ lý do rút đơn (tối thiểu 15 ký tự).' : undefined })), true),
    h('div', { className: 'rd-hq' }, h('p', { className: 'rd-hq-h' }, h(T.Icon, { name: 'alert' }), 'Hệ quả của việc rút đơn ở trạng thái hiện tại'),
      h('div', { className: 'rd-hq-c' }, h('b', null, 'Việc giải quyết đơn sẽ chấm dứt'), h('p', null, 'Tòa án ra quyết định phù hợp với giai đoạn hiện tại của đơn.'))),
    FCard('Tiền tạm ứng án phí liên quan', RvKV([['Số tiền theo thông báo', '—'], ['Tình trạng nộp', 'Chưa nộp'], ['Nếu đã nộp', 'Quyền hoàn trả được xử lý tại mục Nghĩa vụ tài chính']]), true)) });
}
function Rd3() {
  return h(KyGuiDon, { title: 'Rút đơn', steps: RD_STEPS, kyTitle: 'Xem lại & ký gửi', ok: 'rdOk', tep: ['Đơn yêu cầu rút đơn khởi kiện'], tepMeta: 'Xem trước đơn', vaiTro: 'Người khởi kiện',
    top: FCard('Yêu cầu rút đơn', RvKV([['Đơn cần rút', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Lý do rút đơn', 'Các bên đã tự thỏa thuận được với nhau']]), true) });
}
function RdOk() { return h(OkScr, { title: 'Đã gửi yêu cầu rút đơn.', btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'backTo:appDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applications' })) }); }
/* đơn đã có yêu cầu rút: hỏi trước khi tạo thêm (modal web "Tạo thêm yêu cầu rút đơn?") */
function RdAgain() {
  return h(DonChiTiet, { top: h(QdConfirm, { title: 'Tạo thêm yêu cầu rút đơn?', text: 'Đơn này đã có yêu cầu rút đơn rồi. Bạn có chắc chắn muốn tạo và nộp thêm yêu cầu rút đơn mới không?', ok: 'Tạo yêu cầu mới', go: 'replace:rd1' }) });
}
/* hộp thoại xác nhận giữa màn, gắn vào khung điện thoại */
function QdConfirm(p) {
  var anchor = React.useRef(null), host = useHost(anchor);
  return h(F, null, h('span', { ref: anchor, hidden: true }), host ? ReactDOM.createPortal(h(T.Dialog, { variant: 'center', inline: true, open: true, className: 'qd-dlg', title: p.title, description: p.text,
    footer: h(F, null, h(T.Button, { variant: 'secondary', 'data-pt-go': 'back' }, p.cancel || 'Huỷ'), h(T.Button, { variant: p.danger ? 'primary' : undefined, 'data-pt-go': p.go, 'data-pt-snack': p.snack }, p.ok)) }), host) : null);
}

/* ---------- Sửa đổi, bổ sung đơn theo yêu cầu của Tòa án (web /sua-doi-bo-sung) ---------- */
var SD_STEPS = ['Đơn cần sửa & yêu cầu của Tòa án', 'Nội dung sửa đổi, bổ sung', 'Tài liệu kèm theo', 'Xem lại & ký gửi'];
function Sd1() {
  return Wz({ title: 'Sửa đơn theo yêu cầu', steps: SD_STEPS, n: 1, go: 'sd2', body: h(F, null,
    FCard('Đơn đang có yêu cầu sửa đổi, bổ sung', RvKV([['Mã hồ sơ', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Đơn liên quan', 'Đơn khởi kiện – Tranh chấp hợp đồng vay tài sản'], ['Trạng thái', 'Đã gửi đơn']]), true),
    FCard('Yêu cầu của Tòa án', h(F, null, RvKV([['Văn bản yêu cầu', 'Thông báo yêu cầu sửa đổi, bổ sung đơn khởi kiện số 12/2026/TB-TA'], ['Đơn liên quan', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Tòa án yêu cầu', COURT1], ['Ngày tống đạt', '22/10/2026']]),
      h('p', { className: 'sd-han' }, h('span', { className: 'ib-due ib-due-sap' }, 'Còn 3 ngày'), 'Hạn 06/11/2026 (tính từ ngày tống đạt 22/10/2026).'),
      HopGhi('Nội dung Tòa án yêu cầu', '[Nội dung yêu cầu sửa đổi, bổ sung theo thông báo]')), true)) });
}
function Sd2() {
  return Wz({ title: 'Sửa đơn theo yêu cầu', steps: SD_STEPS, n: 2, go: 'sd3', body: h(F, null,
    FCard('Biểu mẫu điện tử', h(F, null, Lead('Biểu mẫu điện tử "Tranh chấp hợp đồng vay tài sản" bên dưới đã nạp lại toàn bộ nội dung đơn ban đầu. Bạn có thể sửa đổi, bổ sung trực tiếp trên biểu mẫu theo yêu cầu của Tòa án.'),
      Tf('Nội dung yêu cầu khởi kiện', { required: true, multiline: true, defaultValue: 'Đề nghị Tòa án buộc ông Trần Văn Bình trả số tiền vay 200.000.000 đồng và tiền lãi theo hợp đồng vay tài sản ngày 10/01/2026.' }),
      Tf('Yêu cầu khác', { multiline: true, placeholder: 'Không bắt buộc' }),
      P('Viết thành nội dung hoàn chỉnh để Tòa án đưa nguyên văn vào hồ sơ, không viết dạng ghi chú sửa đổi.', 'ph-muted dt-small')), true),
    FCard('Đơn đã nộp', DtDocs([['Đơn khởi kiện', 'don-khoi-kien-TN-20261020-0012.pdf · Đã ký số']]), false)) });
}
function Sd3() {
  return Wz({ title: 'Sửa đơn theo yêu cầu', steps: SD_STEPS, n: 3, go: 'sd4', body: FCard('Tài liệu bổ sung',
    h(T.FileUpload, { hint: 'PDF, JPG, PNG, DOCX · tối đa 10MB/tệp', uploadLabel: 'Tải lên tệp mới', libraryLabel: 'Chọn từ Kho dữ liệu cá nhân', files: [{ name: 'hop-dong-vay-ban-sao.pdf', meta: 'Bản sao có chứng thực · 1,2 MB', status: 'done' }] }), true) });
}
function Sd4() {
  return h(KyGuiDon, { title: 'Sửa đơn theo yêu cầu', steps: SD_STEPS, lead: 'Kiểm tra lại đơn, ký số rồi gửi tới Tòa án.', ok: 'sdOk', tep: ['Đơn sửa đổi, bổ sung', 'hop-dong-vay-ban-sao.pdf'], tepMeta: 'Xem trước đơn', vaiTro: 'Người khởi kiện',
    top: h(F, null, HopGhi('Đơn giữ nguyên mã và thời điểm nộp ban đầu', 'Bản sửa gắn vào đơn TN-20261020-0012, không tạo đơn mới và không làm mất thời hiệu đã bảo toàn khi nộp lần đầu.'),
      HopGhi('Tòa án kiểm tra lại toàn bộ đơn', 'Sau khi nhận bản sửa, Tòa án xem xét và thông báo tiếp nhận hay tiếp tục yêu cầu sửa qua Hộp thư tống đạt.'),
      FCard('Tài liệu đính kèm (1 tệp)', DtDocs([['hop-dong-vay-ban-sao.pdf', 'Bản sao có chứng thực']]), true)) });
}
function SdOk() { return h(OkScr, { title: 'Đã gửi bản sửa đổi, bổ sung đơn', text: 'Bản sửa đã gắn vào đơn ban đầu, mã đơn và thời điểm nộp lần đầu giữ nguyên. Tòa án kiểm tra lại và thông báo kết quả qua Hộp thư tống đạt.', btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'backTo:appDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applications' })) }); }
function SdNone() { return SubS('Sửa đơn theo yêu cầu', h(IbEmpty, { title: 'Chưa có đơn cần sửa đổi, bổ sung', text: 'Chỉ thực hiện được khi hồ sơ có thông báo yêu cầu sửa đổi, bổ sung của Tòa án.' })); }

/* ---------- Thay đổi, rút một phần yêu cầu khởi kiện (web /thay-doi-rut-yeu-cau) ---------- */
var TR_UI = { loai: 'TD-02' };
function trSteps() { return ['Loại điều chỉnh', TR_UI.loai === 'TD-02' ? 'Yêu cầu cần rút' : 'Yêu cầu cần thay đổi', 'Lý do & hệ quả', 'Tài liệu kèm theo', 'Xem lại & ký gửi']; }
var TR_YC = ['Buộc bị đơn trả số tiền vay 200.000.000 đồng', 'Buộc bị đơn trả tiền lãi theo hợp đồng', 'Buộc bị đơn bồi thường chi phí đi lại 5.000.000 đồng'];
function Tr1() {
  var l = React.useState(TR_UI.loai); TR_UI.loai = l[0];
  return Wz({ title: 'Thay đổi, rút yêu cầu', steps: trSteps(), n: 1, go: 'tr2', body: h(F, null,
    FCard('Đơn và vụ án liên quan', RvKV([['Đơn khởi kiện', h('span', { className: 'tp-num' }, 'TN-20261005-0003')], ['Vụ án liên quan', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Tên vụ án', 'Tranh chấp hợp đồng vay tài sản'], ['Trạng thái', 'Đang giải quyết']]), true),
    FCard('Loại điều chỉnh', h(F, null, Lead('Chọn loại điều chỉnh bạn muốn thực hiện.'),
      h(ChonThe, { label: 'Loại điều chỉnh', v: l[0], onPick: l[1], items: [{ id: 'TD-01', t: 'Thay đổi, bổ sung yêu cầu khởi kiện', d: 'Sửa nội dung một yêu cầu đã nêu, hoặc thêm yêu cầu mới vào đơn đã nộp.' }, { id: 'TD-02', t: 'Rút một phần yêu cầu khởi kiện', d: 'Giữ vụ án nhưng bỏ bớt một hoặc vài yêu cầu. Muốn bỏ toàn bộ thì dùng đơn rút đơn khởi kiện.' }] })), true),
    h(NvCall, { tone: 'warning', title: 'Thời điểm được thay đổi yêu cầu:' }, 'Trước khi mở phiên họp kiểm tra việc giao nộp, tiếp cận, công khai chứng cứ, bạn được thay đổi, bổ sung yêu cầu không giới hạn. Sau thời điểm đó, Tòa án chỉ chấp nhận nếu việc thay đổi không vượt quá phạm vi khởi kiện ban đầu. Việc rút một phần yêu cầu thì được thực hiện ở bất kỳ giai đoạn nào.')) });
}
function Tr2() {
  var rut = TR_UI.loai === 'TD-02', c = React.useState([1]);
  return Wz({ title: 'Thay đổi, rút yêu cầu', steps: trSteps(), n: 2, go: 'tr3', body: h(F, null,
    FCard(rut ? 'Chọn yêu cầu muốn rút' : 'Chọn yêu cầu muốn thay đổi', h(F, null,
      Lead(rut ? 'Chọn (các) yêu cầu khởi kiện bạn muốn rút. Phần đã chọn sẽ bị đình chỉ giải quyết.' : 'Chọn (các) yêu cầu bạn muốn thay đổi, bổ sung, sau đó trình bày nội dung mới bên dưới.'),
      h('div', { className: 'tr-yc' }, TR_YC.map(function (y, i) { return h(T.Checkbox, { key: y, label: y, checked: c[0].indexOf(i) >= 0, onChange: function (e) { c[1](e.target.checked ? c[0].concat([i]) : c[0].filter(function (x) { return x !== i; })); } }); }))), true),
    FCard('Nội dung thay đổi', h(F, null,
      Tf(rut ? 'Nêu rõ yêu cầu khởi kiện bạn muốn rút (theo đơn đã nộp ở trên)' : 'Nêu rõ nội dung thay đổi, bổ sung so với đơn đã nộp ở trên', { required: true, multiline: true }),
      rut ? null : Tf('Tóm tắt quá trình sự việc', { required: true, multiline: true, placeholder: 'Mô tả theo trình tự thời gian (tối thiểu 100 ký tự)' })), true),
    rut ? h(NvCall, { tone: 'warning', title: 'Lưu ý về án phí khi rút yêu cầu:' }, 'Tòa án sẽ tính lại án phí theo yêu cầu còn lại khi giải quyết vụ việc; phần tạm ứng án phí chênh lệch được hoàn hoặc xử lý theo quy định của pháp luật.') : null,
    FCard('Đơn khởi kiện (tải lên)', h(F, null, P('Nội dung yêu cầu của đơn khởi kiện đã nộp (tệp do bạn tải lên), chỉ để xem.', 'ph-muted dt-small'), DtDocs([['Đơn khởi kiện', 'don-khoi-kien.pdf']])), false)) });
}
var TR_HQ_RUT = [['Tòa án ra quyết định đình chỉ với phần đã rút', 'Phần yêu cầu rút không được Tòa án xem xét nữa. Vụ án tiếp tục với các yêu cầu còn lại.'], ['Khởi kiện lại phần đã rút có thể bị hạn chế', 'Với một số loại tranh chấp, rút yêu cầu sau khi thụ lý làm mất quyền khởi kiện lại về cùng nội dung.'], ['Bị đơn được thông báo', 'Tòa án thông báo cho các đương sự khác về phạm vi yêu cầu còn lại.']];
var TR_HQ_TD = [['Bị đơn được thông báo và có thời hạn ý kiến', 'Tòa án gửi nội dung yêu cầu mới cho bị đơn và người liên quan để họ trình bày ý kiến, việc này có thể kéo dài thời gian giải quyết.'], ['Án phí tính lại nếu giá trị tranh chấp tăng', 'Tăng giá trị yêu cầu thì bạn phải nộp bổ sung tạm ứng án phí theo thông báo của Tòa án.'], ['Có thể phải giao nộp thêm chứng cứ', 'Yêu cầu mới cần được chứng minh bằng tài liệu tương ứng.']];
function Tr3() {
  var rut = TR_UI.loai === 'TD-02', l = React.useState('l1');
  return Wz({ title: 'Thay đổi, rút yêu cầu', steps: trSteps(), n: 3, go: 'tr4', body: h(F, null,
    FCard(rut ? 'Lý do rút một phần yêu cầu' : 'Lý do thay đổi, bổ sung yêu cầu', h(F, null,
      h(ChonThe, { label: 'Lý do', v: l[0], onPick: l[1], items: [{ id: 'l1', t: '[Lý do 1 theo danh mục]' }, { id: 'l2', t: '[Lý do 2 theo danh mục]' }, { id: 'lk', t: 'Lý do khác' }] }),
      Tf('Trình bày cụ thể', { required: l[0] === 'lk', multiline: true, placeholder: rut ? 'Ngày… bị đơn đã bàn giao mặt bằng nên tôi rút yêu cầu…' : 'Sau khi có kết quả đối chiếu công nợ ngày…, số tiền còn nợ là…', error: undefined }),
      l[0] === 'lk' ? P('Chọn "Lý do khác" thì bắt buộc phải trình bày cụ thể.', 'ph-muted dt-small') : null), true),
    h('div', { className: 'rd-hq' }, h('p', { className: 'rd-hq-h' }, h(T.Icon, { name: 'alert' }), 'Hệ quả'),
      (rut ? TR_HQ_RUT : TR_HQ_TD).map(function (x) { return h('div', { key: x[0], className: 'rd-hq-c' }, h('b', null, x[0]), h('p', null, x[1])); }))) });
}
function Tr4() {
  var rut = TR_UI.loai === 'TD-02';
  return Wz({ title: 'Thay đổi, rút yêu cầu', steps: trSteps(), n: 4, go: 'tr5', body: FCard('Tài liệu kèm theo', h(F, null,
    Lead(rut ? 'Tài liệu chứng minh lý do rút, ví dụ biên bản bàn giao, biên nhận thanh toán, văn bản thỏa thuận.' : 'Chứng cứ cho phần yêu cầu thay đổi, bổ sung, ví dụ biên bản đối chiếu công nợ, chứng từ thiệt hại mới.'),
    h(T.FileUpload, { hint: 'PDF, JPG, PNG, DOCX · tối đa 10MB/tệp', uploadLabel: 'Tải lên tệp mới', libraryLabel: 'Chọn từ Kho dữ liệu cá nhân' })), true) });
}
function Tr5() {
  var rut = TR_UI.loai === 'TD-02';
  return h(KyGuiDon, { title: 'Thay đổi, rút yêu cầu', steps: trSteps(), kyTitle: 'Xem lại & ký gửi', ok: 'trOk', vaiTro: 'Nguyên đơn', tep: [rut ? 'Bản in Đơn đề nghị rút một phần yêu cầu' : 'Bản in Đơn thay đổi, bổ sung yêu cầu'], tepMeta: 'Xem trước đơn',
    camDoan: rut ? 'Tôi tự nguyện rút phần yêu cầu đã chọn và hiểu rằng phần đó sẽ bị đình chỉ giải quyết, chịu mọi trách nhiệm trước pháp luật.' : 'Tôi cam đoan nội dung yêu cầu thay đổi, bổ sung và tài liệu kèm theo là đúng sự thật, chịu mọi trách nhiệm trước pháp luật.',
    top: h(F, null, FCard(rut ? 'Yêu cầu cần rút' : 'Yêu cầu cần thay đổi', RvKV([['Yêu cầu', TR_YC[1]], ['Lý do', '[Lý do đã chọn]'], ['Tài liệu đính kèm', 'Không đính kèm tài liệu bổ sung.']]), true),
      h(NvCall, { tone: 'warning', title: rut ? 'Việc rút yêu cầu không hủy được sau khi Tòa án chấp nhận:' : 'Tòa án có thể không chấp nhận nếu vượt quá phạm vi khởi kiện ban đầu:' },
        rut ? 'Sau khi Tòa án ra quyết định đình chỉ đối với phần yêu cầu đã rút, bạn không lấy lại được phần đó trong vụ án này. Kiểm tra kỹ danh sách yêu cầu còn lại trước khi ký gửi.' : 'Nếu đã qua phiên họp kiểm tra việc giao nộp, tiếp cận, công khai chứng cứ, yêu cầu thay đổi vượt quá phạm vi ban đầu sẽ bị Tòa án từ chối và bạn phải khởi kiện thành vụ án riêng.')) });
}
function TrOk() {
  var rut = TR_UI.loai === 'TD-02';
  return h(OkScr, { title: rut ? 'Đã gửi đơn rút một phần yêu cầu khởi kiện' : 'Đã gửi đơn thay đổi, bổ sung yêu cầu khởi kiện', text: rut ? 'Tòa án sẽ ra quyết định đình chỉ đối với phần yêu cầu đã rút và thông báo cho các đương sự khác. Vụ án tiếp tục với những yêu cầu còn lại.' : 'Tòa án sẽ chuyển nội dung yêu cầu mới cho bị đơn và người có quyền lợi, nghĩa vụ liên quan để lấy ý kiến, sau đó thông báo kết quả vào Hộp thư tống đạt.',
    btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'backTo:appDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applications' })) });
}

/* ---------- Yêu cầu áp dụng biện pháp khẩn cấp tạm thời (web /bpkctt) ---------- */
var BP_STEPS = ['Biện pháp cần áp dụng', 'Đối tượng & lý do', 'Tài liệu & biện pháp bảo đảm', 'Xem lại & ký gửi'];
function Bp1() {
  var anchor = React.useRef(null), host = useHost(anchor), v = React.useState('');
  return Wz({ title: 'Yêu cầu BPKCTT', steps: BP_STEPS, n: 1, go: 'bp2', body: h(F, null, h('span', { ref: anchor, hidden: true }),
    FCard('Hồ sơ liên quan', RvKV([['Đơn liên quan', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Vụ án', 'Chưa phát sinh'], ['Loại việc', 'Tranh chấp hợp đồng vay tài sản'], ['Tòa án', COURT1]]), true),
    FCard('Biện pháp khẩn cấp tạm thời cần áp dụng', h(F, null,
      Lead('Mỗi đơn yêu cầu một biện pháp; cần thêm biện pháp khác thì lập đơn mới. Bấm vào (i) để xem điều kiện áp dụng.'),
      h(ChonO, { host: host, label: 'Biện pháp cần áp dụng', v: v[0], onPick: v[1], items: [1, 2, 3, 4].map(function (i) { return { id: 'b' + i, name: '[Biện pháp ' + i + ' – danh mục BIEN_PHAP_KCTT]', desc: '[Điều kiện áp dụng]' }; }) })), true)) });
}
function Bp2() {
  var d = React.useState('bd');
  return Wz({ title: 'Yêu cầu BPKCTT', steps: BP_STEPS, n: 2, go: 'bp3', body: h(F, null,
    FCard('Đối tượng bị áp dụng biện pháp', h(F, null, Lead('Chọn đương sự của hồ sơ, hoặc người khác nếu biện pháp nhắm vào người không phải đương sự.'),
      h(ChonThe, { label: 'Đối tượng bị áp dụng', v: d[0], onPick: d[1], items: [{ id: 'bd', t: 'Trần Văn Bình', d: 'Bị đơn' }, { id: 'nk', t: 'Người khác, không phải đương sự', d: 'Ví dụ bên mời thầu, chủ tàu bay, tàu biển, người đang giữ tài sản tranh chấp. Nhập tên và địa chỉ ở các ô bên dưới.' }, { id: 'kc', t: 'Không có đối tượng bị áp dụng', d: 'Biện pháp chỉ tác động lên tài sản, hoặc giao người chưa thành niên cho người trông nom.' }] }),
      d[0] === 'nk' ? h(F, null, Tf('Họ tên hoặc tên tổ chức bị áp dụng', { required: true, placeholder: 'Ví dụ: Công ty CP Đầu tư Hạ tầng Sông Hồng' }), P('Người không có trong danh sách đương sự. Tổ chức ghi đúng tên theo đăng ký.', 'ph-muted dt-small'),
        Tf('Địa chỉ người bị áp dụng', { required: true, placeholder: 'Ví dụ: 25 Lý Thường Kiệt, phường Cửa Nam, Hà Nội' }), P('Nơi cư trú của cá nhân hoặc trụ sở của tổ chức, để Tòa án tống đạt và thi hành.', 'ph-muted dt-small')) : null), true),
    FCard('Nội dung yêu cầu', h(F, null,
      Tf('Giá trị đề nghị (đồng)', { inputMode: 'numeric' }), P('Số tiền hoặc giá trị tài sản đề nghị áp dụng, nếu có (ví dụ số tiền phong tỏa, số tiền cấp dưỡng thực hiện trước).', 'ph-muted dt-small'),
      Tf('Thông tin tài sản, tài khoản liên quan', { multiline: true, placeholder: 'Tài khoản số 0071xxxxxxx tại Ngân hàng A đứng tên bị đơn; quyền sử dụng đất thửa số 12, tờ bản đồ số 5…' }), P('Mô tả tài sản, tài khoản hoặc đối tượng mà biện pháp nhắm tới.', 'ph-muted dt-small'),
      Tf('Lý do cần áp dụng biện pháp khẩn cấp tạm thời', { required: true, multiline: true, placeholder: 'Tôi có căn cứ cho rằng bên bị đơn đang chuẩn bị chuyển nhượng tài sản tranh chấp cho bên thứ ba…' }), P('Trình bày nguy cơ nếu không áp dụng ngay (tẩu tán tài sản, hủy hoại chứng cứ, ảnh hưởng nghiêm trọng đến quyền lợi…).', 'ph-muted dt-small')), true)) });
}
function Bp3() {
  var b = React.useState('chua');
  return Wz({ title: 'Yêu cầu BPKCTT', steps: BP_STEPS, n: 3, go: 'bp4', body: h(F, null,
    FCard('Thực hiện biện pháp bảo đảm', h(F, null, Lead('Theo khoản 1 Điều 136, một số biện pháp buộc người yêu cầu gửi khoản bảo đảm. Nếu chưa gửi, Tòa án sẽ thông báo mức và hạn nộp.'),
      h(ChonThe, { label: 'Biện pháp bảo đảm', v: b[0], onPick: b[1], items: [{ id: 'chua', t: 'Chưa thực hiện', d: 'Chờ Tòa án ấn định mức bảo đảm.' }, { id: 'co', t: 'Đã hoặc sẽ gửi khoản bảo đảm', d: 'Nhập giá trị khoản bảo đảm bên dưới.' }] }),
      b[0] === 'co' ? h(F, null, Tf('Giá trị bảo đảm (đồng)', { required: true, inputMode: 'numeric' }), P('Tiền, kim khí quý, đá quý hoặc giấy tờ có giá quy ra đồng.', 'ph-muted dt-small')) : null), true),
    FCard('Tài liệu, chứng cứ chứng minh căn cứ áp dụng', h(F, null, Lead(b[0] === 'co' ? 'Tài liệu thể hiện nguy cơ hoặc quyền, lợi ích cần bảo vệ khẩn cấp, kèm chứng từ gửi khoản bảo đảm.' : 'Tài liệu thể hiện nguy cơ hoặc quyền, lợi ích cần bảo vệ khẩn cấp.'),
      h(T.FileUpload, { hint: 'PDF, JPG, PNG, DOCX · tối đa 10MB/tệp', uploadLabel: 'Tải tài liệu từ thiết bị', libraryLabel: 'Chọn từ Kho dữ liệu cá nhân' })), true)) });
}
function Bp4() {
  return h(KyGuiDon, { title: 'Yêu cầu BPKCTT', steps: BP_STEPS, lead: 'Kiểm tra lại đơn, ký số rồi gửi tới Tòa án.', ok: 'bpOk', tep: ['Đơn yêu cầu áp dụng biện pháp khẩn cấp tạm thời'], tepMeta: 'Xem trước đơn', vaiTro: 'Người yêu cầu',
    camDoan: 'Tôi cam kết thực hiện biện pháp bảo đảm khi Tòa án yêu cầu và chịu trách nhiệm bồi thường thiệt hại nếu yêu cầu áp dụng biện pháp khẩn cấp tạm thời của tôi không đúng.',
    top: h(F, null, FCard('Xem lại đơn yêu cầu', RvKV([['Biện pháp đề nghị', '[Biện pháp đã chọn]'], ['Đối tượng bị áp dụng', 'Trần Văn Bình'], ['Địa chỉ người bị áp dụng', 'Số 12 Trần Thái Tông, Phường Cầu Giấy, Thành phố Hà Nội'], ['Giá trị đề nghị', '—'], ['Biện pháp bảo đảm', 'Chưa thực hiện, chờ Tòa án ấn định'], ['Tài sản, tài khoản liên quan', '—'], ['Lý do', '[Lý do đã trình bày]'], ['Tài liệu chứng minh (0 tệp)', 'Chưa đính kèm tài liệu nào.']]), true),
      h(NvCall, { tone: 'warning', title: 'Hệ quả nếu yêu cầu không đúng' }, 'Nếu việc áp dụng biện pháp khẩn cấp tạm thời không đúng và gây thiệt hại, bạn phải bồi thường theo biện pháp bảo đảm đã cam kết.')) });
}
function BpOk() {
  return h(OkScr, { title: 'Đã gửi đơn yêu cầu áp dụng biện pháp khẩn cấp tạm thời', text: 'Đơn đã được gửi đến Tòa án. Văn bản trả lời (quyết định áp dụng hoặc thông báo không chấp nhận) và yêu cầu nộp biện pháp bảo đảm, nếu có, sẽ đến Hộp thư tống đạt và mục Nghĩa vụ tài chính.',
    info: [['Mã tiếp nhận', '[Mã tiếp nhận]', 1], ['Đơn liên quan', 'TN-20261020-0012', 1], ['Trạng thái', 'Đã gửi']],
    btns: h(F, null, Btn('Xem đơn liên quan', 'primary', { 'data-pt-go': 'backTo:appDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applications' })) });
}
function BpNone() { return SubS('Yêu cầu BPKCTT', h(F, null, h(IbEmpty, { title: 'Chưa thể yêu cầu áp dụng biện pháp khẩn cấp tạm thời', text: 'Chỉ tạo được khi hồ sơ đã có đơn khởi kiện đang được Tòa án giải quyết.' }), h('div', { className: 'qd-empty-act' }, h(T.Button, { size: 'sm', variant: 'secondary', icon: 'arrowLeft', 'data-pt-go': 'back' }, 'Quay lại chi tiết đơn')))); }

/* ---------- Sao gửi tài liệu, chứng cứ cho đương sự khác (web /sao-gui-chung-cu) ---------- */
var SG_UI = { cach: 'tu' };
function sgSteps() { return ['Cách thực hiện', 'Tài liệu cần sao gửi', 'Người nhận', SG_UI.cach === 'ht' ? 'Lý do đề nghị hỗ trợ' : 'Phương thức sao gửi', 'Tình hình sao gửi', 'Xem lại & ký gửi']; }
var SG_TL = ['Sao kê chuyển khoản', 'Tin nhắn trao đổi'];
function Sg1() {
  var c = React.useState(SG_UI.cach); SG_UI.cach = c[0];
  return Wz({ title: 'Sao gửi tài liệu, chứng cứ', steps: sgSteps(), n: 1, go: 'sg2', body: h(F, null,
    FCard('Lần giao nộp đang sao gửi', RvKV([['Vụ án', h(F, null, h('span', { className: 'tp-num' }, 'DS-2026-0012'), ' · Tranh chấp hợp đồng vay tài sản')], ['Biên nhận giao nộp', 'Giao nộp 24/10/2026 · Biên nhận BN-2026-0105'], ['Tài liệu đã giao nộp', '2 tài liệu'], ['Đương sự khác trong vụ án', '2 đương sự']]), true),
    FCard('Bạn thực hiện việc sao gửi thế nào?', h(F, null, Lead('Nghĩa vụ sao gửi thuộc về người giao nộp tài liệu, chứng cứ (Khoản 5 Điều 96 Bộ luật Tố tụng dân sự).'),
      h(ChonThe, { label: 'Cách thực hiện', v: c[0], onPick: c[1], items: [{ id: 'tu', t: 'Tôi tự sao gửi cho đương sự khác', d: 'Gửi bản sao tài liệu, chứng cứ trực tiếp đến các đương sự và báo kết quả cho Tòa án.' }, { id: 'ht', t: 'Đề nghị Tòa án hỗ trợ sao gửi', d: 'Dùng khi bạn không tự thực hiện được, ví dụ không có địa chỉ của đương sự khác.' }] })), true),
    h(NvCall, { tone: 'warning', title: 'Không sao gửi thì tài liệu có thể không được xem xét' }, 'Đương sự có nghĩa vụ gửi bản sao tài liệu, chứng cứ đã giao nộp cho các đương sự khác. Tài liệu chưa được công khai cho các bên có thể không được Tòa án sử dụng làm căn cứ giải quyết vụ án, trừ tài liệu thuộc trường hợp không phải công khai.')) });
}
function Sg2() {
  return Wz({ title: 'Sao gửi tài liệu, chứng cứ', steps: sgSteps(), n: 2, go: 'sg3', body: FCard('Tài liệu, chứng cứ cần sao gửi', h(F, null, Lead('Danh sách lấy từ lần giao nộp bạn đang sao gửi.'),
    h('div', { className: 'tr-yc' }, SG_TL.map(function (x) { return h(T.Checkbox, { key: x, label: x, defaultChecked: true }); }))), true) });
}
function Sg3() {
  var ht = SG_UI.cach === 'ht';
  return Wz({ title: 'Sao gửi tài liệu, chứng cứ', steps: sgSteps(), n: 3, go: 'sg4', body: h(F, null,
    FCard(ht ? 'Đương sự cần Tòa án hỗ trợ sao gửi' : 'Đương sự nhận bản sao', h(F, null, Lead('Chọn tất cả đương sự cần nhận tài liệu này.'),
      h('div', { className: 'tr-yc' }, h(T.Checkbox, { label: h('span', { className: 'sg-ng' }, h('b', null, 'Trần Văn Bình · Bị đơn'), h('small', null, 'Đã đăng ký giao dịch điện tử · nhận bản điện tử được')), defaultChecked: true }),
        h(T.Checkbox, { label: h('span', { className: 'sg-ng' }, h('b', null, 'Lê Thị Hoa · Người có quyền lợi, nghĩa vụ liên quan'), h('small', null, 'Chưa đăng ký giao dịch điện tử · phải gửi bản giấy')), defaultChecked: true }))), true),
    h(NvCall, { tone: 'warning', title: 'Có đương sự chưa đăng ký giao dịch điện tử' }, 'Với người chưa đăng ký, bản điện tử không có giá trị tống đạt. Bạn phải gửi bản giấy qua bưu chính hoặc giao trực tiếp, rồi tải chứng từ lên hệ thống.')) });
}
var SG_PT = [['dt', 'Gửi bản điện tử qua Cổng dịch vụ tư pháp', 'Đương sự khác nhận trong hộp thư điện tử, có xác nhận thời điểm gửi.'], ['bc', 'Gửi qua dịch vụ bưu chính có xác nhận', 'Bạn tải lên vận đơn hoặc biên nhận bưu chính sau khi gửi.'], ['tt', 'Giao trực tiếp có ký nhận', 'Bạn tải lên biên bản giao nhận có chữ ký của người nhận.']];
var SG_LD = [['l1', 'Không biết địa chỉ nơi cư trú, nơi làm việc của đương sự khác'], ['l2', 'Đã gửi nhưng bị trả lại, không giao được'], ['l3', 'Đương sự khác từ chối nhận'], ['l4', 'Tài liệu thuộc bí mật nhà nước, bí mật kinh doanh, đời tư', 'Việc sao gửi phải theo quyết định của Tòa án về phạm vi được tiếp cận.'], ['l5', 'Lý do khác', 'Trình bày cụ thể ở ô bên dưới.']];
function Sg4() {
  var ht = SG_UI.cach === 'ht', v = React.useState(ht ? 'l1' : 'bc');
  return Wz({ title: 'Sao gửi tài liệu, chứng cứ', steps: sgSteps(), n: 4, go: 'sg5', body: h(F, null,
    FCard(ht ? 'Lý do bạn không tự sao gửi được' : 'Phương thức sao gửi', h(F, null, Lead(ht ? 'Tòa án chỉ hỗ trợ khi bạn thực sự không tự thực hiện được.' : 'Chọn cách bạn gửi bản sao đến các đương sự đã chọn.'),
      h(ChonThe, { label: ht ? 'Lý do' : 'Phương thức sao gửi', v: v[0], onPick: v[1], items: (ht ? SG_LD : SG_PT).map(function (x) { return { id: x[0], t: x[1], d: x[2] }; }) }),
      Tf(ht ? 'Trình bày cụ thể' : 'Ghi chú thêm', { required: ht && v[0] === 'l5', multiline: true, placeholder: ht ? 'Tôi đã gửi bưu chính ngày… theo địa chỉ trong đơn khởi kiện nhưng bưu điện trả lại với lý do…' : 'Dự kiến gửi bưu chính trong ngày…' }),
      P(ht ? 'Nêu việc bạn đã làm để tự sao gửi và kết quả.' : 'Không bắt buộc. Ví dụ thời điểm dự kiến gửi, số vận đơn nếu đã gửi.', 'ph-muted dt-small')), true),
    !ht && v[0] !== 'dt' ? HopGhi('Phải báo kết quả cho Tòa án', 'Với phương thức bưu chính/giao trực tiếp, Cổng chỉ ghi nhận bạn đã thực hiện việc gửi — hãy giữ lại vận đơn/biên bản giao nhận để xuất trình khi Tòa án yêu cầu.') : null) });
}
function Sg5() {
  return Wz({ title: 'Sao gửi tài liệu, chứng cứ', steps: sgSteps(), n: 5, go: 'sg6', body: h(F, null,
    HopGhi('Nghĩa vụ sao gửi theo Khoản 5 Điều 96', 'Nghĩa vụ chỉ hoàn tất khi đủ mọi đương sự phải nhận. Phần còn lại vẫn theo dõi trong hồ sơ vụ án.'),
    FCard('Tình hình theo từng người nhận', h(F, null, Lead('Bốn trạng thái: chưa sao gửi, đã sao gửi một phần, đã hoàn tất, Tòa án hỗ trợ.'),
      h('ul', { className: 'ph-ky' }, h('li', null, h('div', null, h('b', null, 'Trần Văn Bình'), h('small', null, 'Bị đơn · 2/2 tài liệu')), h(T.StatusBadge, { tone: 'success', icon: false }, 'Đã hoàn tất')),
        h('li', null, h('div', null, h('b', null, 'Lê Thị Hoa'), h('small', null, 'Người có quyền lợi, nghĩa vụ liên quan · 0/2 tài liệu')), h(T.StatusBadge, { tone: 'warning', icon: false }, 'Chưa sao gửi')))), true)) });
}
function Sg6() {
  var ht = SG_UI.cach === 'ht';
  return h(KyGuiDon, { title: 'Sao gửi tài liệu, chứng cứ', steps: sgSteps(), kyTitle: 'Xem trước & ký số văn bản', ok: 'sgOk', sendLabel: 'Ký gửi', vaiTro: 'Nguyên đơn', tep: [ht ? 'Đơn đề nghị Tòa án hỗ trợ sao gửi tài liệu, chứng cứ' : 'Thông báo về việc sao gửi tài liệu, chứng cứ'], tepMeta: 'Xem trước văn bản',
    top: ht ? h(NvCall, { tone: 'warning', title: 'Tòa án có thể thu chi phí sao gửi' }, 'Khi Tòa án thực hiện việc sao gửi thay bạn, chi phí sao chụp và gửi tài liệu do bạn chịu theo thông báo của Tòa án.') : null });
}
function SgOk() {
  var ht = SG_UI.cach === 'ht';
  return h(OkScr, { title: ht ? 'Đã gửi đề nghị Tòa án hỗ trợ sao gửi' : 'Đã ghi nhận việc sao gửi tài liệu, chứng cứ', text: ht ? 'Tòa án xem xét đề nghị và thực hiện việc sao gửi nếu có căn cứ. Thông báo về chi phí sao gửi, nếu có, được gửi vào Hộp thư tống đạt.' : 'Bản điện tử đã chuyển tới đương sự đã đăng ký giao dịch điện tử. Với đương sự nhận bản giấy, hãy tự gửi và giữ chứng từ để xuất trình khi Tòa án yêu cầu.',
    info: [['Mã tham chiếu', '[Mã tham chiếu]', 1], ['Vụ án', 'DS-2026-0012', 1]], btns: Btn('Về chi tiết vụ án', 'primary', { 'data-pt-go': 'reset:records,cases,caseDetail' }) });
}

/* =====================================================================
   03/11/2026 (v148): chi tiết đơn kháng cáo / giám đốc thẩm, tái thẩm / phản tố, yêu cầu độc lập
   (quan-ly-don/chi-tiet-don-khang-cao, -giam-doc-tham, -phan-to-ycdl: đầu trang lưới thông tin, dải việc cần làm,
   thẻ chọn khối, nội dung từng khối, đơn phát sinh, tiến trình). Dữ liệu mẫu.
   ===================================================================== */
/* khung chung: đầu trang + dải việc cần làm + thanh khối (dùng DtScreen) */
/* v251 (04/11/2026): đơn khác (kháng cáo, GĐT/tái thẩm, phản tố/YCĐL) áp UI chi tiết đơn khởi kiện – tên 16px, khối nhắc gọn trước tab (o.todo), tab không số,
   văn bản tống đạt kiểu Hộp thư, đơn phát sinh dạng thẻ đơn, lịch sử nhóm theo ngày; o.foot = thanh nút ghim theo tab */
/* v252 (05/11/2026, chọn C): phần đầu chỉ còn mã, tên, nhãn + khối hành động gắn với đơn (o.viec, DtViec) + tiến trình (o.acts);
   bảng thông tin (o.info) chuyển vào đầu tab thứ nhất – tên khối chưa có trong mã nguồn nên để trong ngoặc vuông */
function DonKhac(o) {
  var tab1 = o.tabs[0].key;
  return h(DtScreen, { title: o.title, tabLabel: 'Nội dung chi tiết đơn', tabs: o.tabs, meta: o.meta, name: o.name, badges: o.badges, headCls: 'dt-head-don',
    headExtra: o.viec || o.acts ? h(F, null, o.viec ? h('div', { className: 'dk-viec' }, h(DtViec, o.viec)) : null, o.acts ? h('div', { className: 'dk-acts' }, o.acts) : null) : null,
    foot: o.foot, render: function (t, s) { var r = o.render(t, s); return t === tab1 && o.info ? h(F, null, FCard('[Thông tin đơn]', RvKV(o.info), true), r) : r; } });
}
function dkPhatSinh(lead, list) {
  return FCard('Đơn phát sinh', h(F, null, P(lead, 'ph-muted dt-small'), h('ul', { className: 'qd-list dt-qc' }, list.map(function (x) {
    var nhap = x[2] === 'Lưu nháp', ng = String(x[3]).replace(/^(Gửi|Lưu|Nộp) /, '');
    return DonThe2({ loai: x[0], t: x[1], tt: [x[2], nhap ? 'neutral' : 'info'], nhap: nhap, go: nhap ? 'sd2' : 'snack:Đang mở đơn…', rows: [['Loại đơn', x[0]], [nhap ? 'Lưu nháp' : 'Ngày gửi', ng]] });
  }))), true);
}
function dkVanBan(list) {
  return FCard('Văn bản tống đạt', list.length ? VbCards(list.map(function (x, i) {
    var p = String(x[1]).split(' · '), so = (p[0] || '').replace(/^Số /, ''), tg = ((p.filter(function (s) { return /Tống đạt/.test(s); })[0]) || '').replace('Tống đạt ', '');
    return { t: x[0], so: so, tg: tg, moi: i === 0 };
  })) : P('Tòa án chưa gửi văn bản nào về đơn này.', 'ph-muted'), true);
}
function dkLichSu(steps) { return LsG1(steps.map(function (s) { return [s.title, s.date, s.description || null]; })); }
/* ---- Đơn kháng cáo ---- */
var KC_TABS = [{ key: 'noi-dung', label: 'Nội dung kháng cáo' }, { key: 'van-ban', label: 'Văn bản tống đạt' }, { key: 'phat-sinh', label: 'Đơn phát sinh' }, { key: 'lich-su', label: 'Lịch sử đơn' }]; /* v251: bỏ số lượng */
/* v352 (13/11/2026): Chi tiết đơn kháng cáo theo web (QLD3-W02…W09) – o.st: gui | sua | suaLai | quaHan | tamUng | nhap | ky; o.loi; nút Bổ sung mở kcs1 (trước mở nhầm sd1) */
function AppealDetail(o) {
  o = o || {}; var st = o.st || 'gui', bd = KC_BADGE[st];
  if (o.loi) return h(Phone, { cls: 'ph-hd' }, h(T.AppBar, { variant: 'plain', title: 'Đơn kháng cáo', onBack: noop }), h(Body, { cls: 'ph-plain dt-body' }, /* v352 (QLD3-W09 */
    o.loi === 'ko' ? h(T.EmptyState, { variant: 'center', icon: 'search', title: 'Không tìm thấy đơn kháng cáo', text: 'Đơn không tồn tại hoặc bạn không có quyền xem đơn này.', actionLabel: 'Về danh sách đơn', onAction: noop, className: 'nv-err' })
      : h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tải được chi tiết đơn kháng cáo.', text: 'Mã lỗi: [mã lỗi]', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: noop, className: 'nv-err' })));
  return h(F, null, h(DonKhac, { title: 'Đơn kháng cáo', tabs: KC_TABS, foot: function (t) { return t === 'phat-sinh' ? h(TaoBtn, { snack: 'Chức năng đang được phát triển' }) : null; },
    meta: h(F, null, h('span', { className: 'vk-tag q3-tag' }, 'Đơn kháng cáo'), ' ', h('span', { className: 'tp-num' }, st === 'nhap' || st === 'ky' ? '—' : 'TN-20261025-0015')),
    name: 'Kháng cáo bản án sơ thẩm số 25/2026/DS-ST', badges: qdBadges(bd[0], bd[1]),
    info: [['Vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Số thụ lý vụ án', h('span', { className: 'tp-num' }, '12/2026/TLST-DS')], ['Ngày thụ lý vụ án', '15/10/2026'], ['Tòa án xét xử sơ thẩm', COURT1], ['Loại kháng cáo', st === 'quaHan' ? 'Kháng cáo quá hạn' : 'Kháng cáo bản án'], ['Văn bản bị kháng cáo', 'Bản án số 25/2026/DS-ST'], ['Tư cách', 'Nguyên đơn'], ['Mã tiếp nhận kháng cáo', h('span', { className: 'tp-num' }, st === 'nhap' || st === 'ky' ? '—' : 'TN-20261025-0015')]],
    viec: kcViec(st), acts: KcTienTrinh(st),
    render: function (t) {
      if (t === 'noi-dung') return h(F, null, FCard('Nội dung kháng cáo', RvKV([['Phạm vi kháng cáo', 'Một phần bản án / quyết định'], ['Chi tiết phần bị kháng cáo', 'Mục 2 phần Quyết định của bản án'], ['Nội dung không đồng ý', 'Không đồng ý với việc Tòa án buộc nguyên đơn chịu toàn bộ án phí sơ thẩm.'], ['Lý do kháng cáo', 'Tòa án cấp sơ thẩm chưa xem xét chứng cứ chuyển khoản ngày 05/01/2026 do nguyên đơn giao nộp.'], ['Yêu cầu Tòa án cấp phúc thẩm', 'Sửa phần án phí của bản án sơ thẩm.']]), true),
        FCard('Tài liệu đính kèm', DtDocs([['Đơn kháng cáo', 'don-khang-cao.pdf · Đã ký số'], ['Bản án sơ thẩm', 'ban-an-25-2026-DS-ST.pdf']], { tai: true, the: true }), true)); /* v352 (QLD3-W06: thêm nút Tải về */
      if (t === 'van-ban') return kcVanBan();
      if (t === 'phat-sinh') return kcPhatSinh();
      return dkLichSu([{ title: 'Đang xử lý đơn', date: '28/10/2026', state: 'current' }, { title: 'Đã gửi đơn', date: '25/10/2026', state: 'done' }, { title: 'Chờ đủ chữ ký', date: '25/10/2026', state: 'done' }]);
    } }), o.dlg ? h(DlgOver, o.dlg) : null);
}
/* ---- Đơn giám đốc thẩm, tái thẩm ---- */
var GDT_TABS = [{ key: 'noi-dung', label: 'Nội dung đề nghị' }, { key: 'van-ban', label: 'Văn bản tống đạt' }, { key: 'phat-sinh', label: 'Danh sách đơn' }, { key: 'lich-su', label: 'Lịch sử đơn' }];
/* v353 (13/11/2026): Chi tiết đơn GĐT/TT theo web (QLD4-W01…W09) – p.st: gui | sua | suaLai | suaHet | nhap | taiChinh; p.tt đơn tái thẩm; p.loi; p.sua giữ tương thích */
function GdtDetail(p) {
  p = p || {}; var st = p.st || (p.sua ? 'sua' : 'gui'), tt = !!p.tt, ten = tt ? 'tái thẩm' : 'giám đốc thẩm', bd = GDT_BADGE[st];
  if (p.loi) return h(Phone, { cls: 'ph-hd' }, h(T.AppBar, { variant: 'plain', title: 'Đơn giám đốc thẩm, tái thẩm', onBack: noop }), h(Body, { cls: 'ph-plain dt-body' }, /* v353 (QLD4-W09 */
    p.loi === 'ko' ? h(T.EmptyState, { variant: 'center', icon: 'search', title: 'Không tìm thấy đơn đề nghị', text: 'Đơn không tồn tại hoặc bạn không có quyền xem đơn này.', actionLabel: 'Về danh sách đơn', onAction: noop, className: 'nv-err' })
      : h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tải được chi tiết đơn đề nghị.', text: 'Mã lỗi: [mã lỗi]', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: noop, className: 'nv-err' })));
  return h(F, null, h(DonKhac, { title: 'Đơn giám đốc thẩm, tái thẩm', tabs: GDT_TABS,
    meta: h(F, null, h('span', { className: 'vk-tag ' + (tt ? 'q4-tag-tt' : 'q4-tag-gdt') }, tt ? 'Đơn tái thẩm' : 'Đơn giám đốc thẩm'), ' ', h('span', { className: 'tp-num' }, st === 'nhap' ? '—' : 'TN-20261029-0020')),
    name: 'Đề nghị xem xét theo thủ tục ' + ten, badges: qdBadges(bd[0], bd[1]),
    info: [['Mã tiếp nhận', h('span', { className: 'tp-num' }, st === 'nhap' ? '—' : 'TN-20261029-0020')], ['Tòa án nhận đơn', 'Tòa án nhân dân cấp cao tại Hà Nội'], ['Ngày nộp', st === 'nhap' ? '—' : '29/10/2026'], ['Số bản án / quyết định', '18/2026/DS-PT'], ['Mã vụ án', h('span', { className: 'tp-num' }, 'DS-2025-0098')], ['Ngày ban hành', '15/09/2026'], ['Tòa án ban hành', 'Tòa án nhân dân thành phố Hà Nội'], ['Đối tượng', 'Bản án phúc thẩm'], ['Loại án', 'Dân sự']].concat(tt ? [['Ngày biết căn cứ', '15/09/2025 · đã quá hạn 59 ngày']] : []), /* v353 (QLD4-W02 */
    viec: gdtViec(st, ten),
    render: function (t) {
      if (t === 'noi-dung') return h(F, null, FCard('Căn cứ đề nghị ' + ten, P(tt ? 'Mới phát hiện được tình tiết quan trọng của vụ án mà đương sự đã không thể biết được trong quá trình giải quyết vụ án (khoản 1 Điều 352 BLTTDS)' : 'Có vi phạm nghiêm trọng thủ tục tố tụng (khoản 1 Điều 326 BLTTDS)', 'ph-muted'), true),
        tt ? FCard('Cách biết được căn cứ', P('Nhận được biên bản đo đạc hiện trạng năm 2020 do UBND phường cung cấp ngày 15/09/2025.', 'ph-muted'), true) : null, /* v353 (QLD4-W02: chỉ đơn tái thẩm */
        FCard('Nội dung đề nghị xem xét theo thủ tục ' + ten, P('Tôi đề nghị xem xét lại Bản án số 18/2026/DS-PT vì Tòa án đã áp dụng sai Điều…', 'ph-muted'), true),
        FCard('Biên nhận tiếp nhận điện tử', DtDocs([['Biên nhận tiếp nhận đơn đề nghị giám đốc thẩm, tái thẩm điện tử', 'Biên nhận điện tử TN-20261029-0020']], { the: true }), true), /* v353 (QLD4-W03 */
        FCard('Tài liệu đính kèm', h(F, null, h('p', { className: 'dt-grp-t' }, 'Bản án, quyết định điện tử'), DtDocs([['Bản án số 18/2026/DS-PT', 'ban-an-18-2026.pdf']], DOC_THE), h('p', { className: 'dt-grp-t' }, 'Tài liệu, chứng cứ'), DtDocs([['Chứng cứ mới', 'chung-cu-moi.pdf']], DOC_THE)), true));
      if (t === 'van-ban') return gdtVanBan();
      if (t === 'phat-sinh') return gdtPhatSinh(ten);
      return dkLichSu([{ title: 'Đã gửi đơn', date: '29/10/2026', state: 'current' }]);
    } }), p.dlg ? h(DlgOver, p.dlg) : null);
}
/* ---- Đơn phản tố, yêu cầu độc lập ---- */
var PT_TABS = [{ key: 'noi-dung', label: 'Nội dung yêu cầu' }, { key: 'tai-lieu', label: 'Tài liệu đính kèm' }, { key: 'van-ban', label: 'Văn bản Tòa án' }, { key: 'phat-sinh', label: 'Đơn phát sinh' }, { key: 'lich-su', label: 'Lịch sử đơn' }];
/* v351 (13/11/2026): Đơn phản tố / yêu cầu độc lập theo web (QLD2-W01, W03, W04, W06, W07, W08; M02) – o.loai PT | YC, o.st trạng thái; PtDetail(false/true) giữ tương thích */
function PtDetail(a, b) {
  var o = typeof a === 'object' && a ? a : { st: a ? 'tra' : 'gui' }, c = PT_L[o.loai || 'PT'], st = o.st || 'gui', bd = PT_BADGE[st];
  if (o.loi) return h(Phone, { cls: 'ph-hd' }, h(T.AppBar, { variant: 'plain', title: c.tieu, onBack: noop }), h(Body, { cls: 'ph-plain dt-body' },
    o.loi === 'ko' ? h(T.EmptyState, { variant: 'center', icon: 'search', title: 'Không tìm thấy đơn', text: 'Đơn không tồn tại hoặc bạn không có quyền xem đơn này.', actionLabel: 'Về danh sách đơn', onAction: noop, className: 'nv-err' })
      : h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tải được chi tiết đơn.', text: 'Mã lỗi: [mã lỗi]', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: noop, className: 'nv-err' })));
  return h(F, null, h(DonKhac, { title: c.tieu, tabs: PT_TABS, meta: h(F, null, h('span', { className: 'vk-tag q2-tag-' + (o.loai || 'PT') }, c.tag), ' ', h('span', { className: 'tp-num' }, c.ma)),
    name: (o.loai === 'YC' ? 'Yêu cầu độc lập · ' : 'Phản tố · ') + c.vu, badges: qdBadges(bd[0], bd[1]),
    info: [['Vụ án', h('span', { className: 'tp-num' }, c.va)], ['Số thụ lý vụ án', h('span', { className: 'tp-num' }, c.tl)], ['Tòa án', COURT1], ['Tư cách', c.tc], ['Ngày gửi đơn', st === 'ky' ? 'Chưa gửi' : '28/10/2026 09:15'], ['Mã tiếp nhận', h('span', { className: 'tp-num' }, st === 'ky' ? '—' : c.ma)]],
    acts: h(CaseProgress3, { cur: /tra/.test(st) ? 3 : st === 'ky' ? 0 : 1 }),
    viec: ptViec(st, c),
    render: function (t) {
      if (t === 'noi-dung') return FCard('Nội dung yêu cầu', RvKV([['Yêu cầu', c.yc], ['Giá trị yêu cầu', c.gt], ['Bên bị yêu cầu', c.bb]]), true); /* M02: bỏ dòng "Nội dung yêu cầu" thứ tư */
      if (t === 'tai-lieu') return FCard('Tài liệu đính kèm', DtDocs([['Đơn ' + c.ten, 'don-' + (o.loai === 'YC' ? 'yeu-cau-doc-lap' : 'phan-to') + '.pdf · Đã ký số'], ['Biên nhận đặt cọc', 'bien-nhan-dat-coc.pdf']], DOC_THE), true);
      if (t === 'van-ban') return dkVanBan([['Thông báo thụ lý yêu cầu ' + c.ten, 'Số 33/2026/TB-TA · Tống đạt 30/10/2026']]);
      if (t === 'phat-sinh') return ptPhatSinh(c);
      return dkLichSu([{ title: /tra/.test(st) ? 'Kết quả · Trả lại đơn' : 'Xem xét đơn', date: /tra/.test(st) ? '31/10/2026' : '29/10/2026', state: 'current' }, { title: 'Gửi đơn', date: '28/10/2026', state: 'done' }]);
    } }), o.dlg ? h(DlgOver, o.dlg) : null, o.snack ? h(AutoSnack, { m: o.snack }) : null);
}
/* tiến trình 3 bước của đơn phản tố/YCĐL: Gửi đơn → Xem xét đơn → Kết quả */
function CaseProgress3(p) { return h(T.CaseProgress, { label: 'Tiến trình', steps: ['Gửi đơn', 'Xem xét đơn', 'Kết quả'], current: Math.min(p.cur, 2) }); }

/* =====================================================================
   03/11/2026 (v149): Vụ án của tôi – vẽ lại theo web /vu-an (index.tsx, chi-tiet.tsx, sao-chup/*, moi-sao-chup).
   ===================================================================== */
var VA = [
  { ma: 'DS-2026-0012', lv: 'DS', loai: 'Dân sự', tt: ['Đang giải quyết', 'info'], t: 'Tranh chấp hợp đồng vay tài sản', vt: 'Nguyên đơn', cap: [['Sơ thẩm', 'cur']], toa: COURT1, thuLy: '15/10/2026', phien: ['Phiên tòa · 14:00, 05/11/2026', 'sap'], ghim: 1, go: 'caseDetail' },
  { ma: 'HN-2026-0007', lv: 'HN', loai: 'Hôn nhân và gia đình', tt: ['Tạm đình chỉ', 'warning'], t: 'Ly hôn, tranh chấp nuôi con', vt: 'Bị đơn', cap: [['Sơ thẩm', 'cur']], toa: 'Tòa án nhân dân khu vực 2 - Hà Nội', thuLy: '02/09/2026', go: 'caseDetailPaused' },
  { ma: 'DS-2025-0098', lv: 'DS', loai: 'Dân sự', tt: ['Đã giải quyết', 'success'], t: 'Tranh chấp quyền sử dụng đất', vt: 'Nguyên đơn', cap: [['Sơ thẩm', 'done'], ['Phúc thẩm', 'cur']], toa: 'Tòa án nhân dân thành phố Hà Nội', thuLy: '10/03/2025', han: 'Hạn kháng cáo: 12/11/2026', go: 'caseDetailReview' }];
/* v207: vụ án mẫu theo bảng map (dòng 30–89) – [lv, loại án, mã tình trạng, tình trạng, mã hành động, tên vụ án, (trạng thái, tông)]
   «Giữ nguyên» (không mã GS): trạng thái "Đang xử lý đơn", tình trạng "Tòa án đã nhận đơn" (theo yêu cầu 04/11/2026) */
var GS = { 'GS-01': 'Đã thụ lý — chuẩn bị xét xử', 'GS-02': 'Đã có QĐ đưa vụ án ra xét xử', 'GS-04': 'Đã tuyên án / ra quyết định sơ thẩm', 'GS-05': 'Tạm đình chỉ', 'GS-06': 'Đình chỉ', 'GS-07': 'Đang hòa giải trong tố tụng', 'GS-08': 'Đã hòa giải thành — chờ QĐ công nhận', 'GS-09': 'Đã công nhận sự thỏa thuận', 'GS-10': 'Đã có QĐ đưa ra xét xử theo thủ tục rút gọn', 'GS-11': 'Phiên tòa hoãn', 'GS-12': 'Phiên tòa tạm ngừng', 'GS-17': 'Đã có QĐ đưa ra xét xử phúc thẩm', 'GS-18': 'Phiên tòa phúc thẩm hoãn', 'GS-21': 'Đã tuyên án phúc thẩm — có hiệu lực ngay', 'GS-28': 'Yêu cầu bổ sung tài liệu, chứng cứ', 'GS-31': 'Bổ sung người tham gia tố tụng', 'GS-33': 'Đình chỉ một phần yêu cầu — vụ án tiếp tục', 'GS-34': 'Đã có QĐ mở phiên họp giải quyết kháng cáo QĐ tạm đình chỉ / đình chỉ', GIU: 'Tòa án đã nhận đơn', 'RS-02': 'Chờ nộp tạm ứng án phí / lệ phí', 'RS-07': 'Chờ nộp tạm ứng chi phí tố tụng', 'RS-47': 'Đã trả lại đơn thay đổi, bổ sung yêu cầu' };
function gsTT(m) {
  if (m === 'GIU') return ['Đang xử lý đơn', 'info'];
  if (m === 'RS-02' || m === 'RS-07') return ['Đang xử lý', 'info'];
  if (m === 'RS-47') return ['Đã xử lý', 'success'];
  if (m === 'GS-05') return ['Tạm đình chỉ', 'warning'];
  if (m === 'GS-06' || m === 'GS-09' || m === 'GS-21') return ['Đã giải quyết', 'success'];
  return ['Đang giải quyết', 'info'];
}
function gsCap(m) { return /GS-(17|18|21)/.test(m) ? [['Sơ thẩm', 'done'], ['Phúc thẩm', m === 'GS-21' ? 'done' : 'cur']] : [['Sơ thẩm', /GS-(06|09)/.test(m) ? 'done' : 'cur']]; }
function gsTinh(m) { return /GS-28|GS-31|RS-0[27]/.test(m) ? 'warning' : /GS-(04|06|09|21|33)|RS-47/.test(m) ? 'neutral' : 'info'; }
function vaTu(rows, lv, loai, pre, nam, so0, cl) {
  return rows.map(function (r, i) {
    var so = so0 + i, ma = pre + '-2026-' + ('000' + so).slice(-4);
    return { ma: ma, lv: lv, loai: loai, tt: gsTT(r[0]), tinh: [GS[r[0]], gsTinh(r[0])], gs: r[0], t: r[2], vt: r[3] || (cl === 'vv' || cl === 'vds' ? 'Người yêu cầu' : 'Nguyên đơn'), cap: gsCap(r[0]), toa: COURT1, thuLy: ('0' + (1 + (so * 7) % 28)).slice(-2) + '/' + (so % 2 ? '09' : '08') + '/2026', hd: r[1], go: cl === 'vv' ? 'proceedingDetail' : r[0] === 'GS-05' ? 'caseDetailPaused' : 'caseDetail' };
  });
}
var VA_HC = vaTu([
  ['GS-01', ['A030'], 'Khiếu kiện quyết định thu hồi đất'], ['GS-09', ['A001', 'A055'], 'Khiếu kiện quyết định bồi thường, hỗ trợ tái định cư'], ['GS-05', ['A007'], 'Khiếu kiện quyết định xử phạt vi phạm hành chính'],
  ['GS-06', ['A014'], 'Khiếu kiện hành vi hành chính trong cấp giấy chứng nhận'], ['GS-02', ['LICHP', 'HOAN'], 'Khiếu kiện quyết định cưỡng chế thu hồi đất'], ['GS-10', ['LICHP', 'HOAN'], 'Khiếu kiện quyết định hành chính về thuế'],
  ['GS-11', ['LICHH'], 'Khiếu kiện quyết định kỷ luật buộc thôi việc'], ['GS-12', ['LICHH'], 'Khiếu kiện quyết định giải quyết khiếu nại về đất đai'], ['GS-04', ['A004'], 'Khiếu kiện quyết định không cấp giấy phép xây dựng'],
  ['GS-17', ['LICHP', 'HOAN'], 'Khiếu kiện danh sách cử tri'], ['GS-18', ['LICHH'], 'Khiếu kiện quyết định thu hồi giấy phép kinh doanh'], ['GS-21', ['A001', 'A055'], 'Khiếu kiện quyết định xử lý vụ việc cạnh tranh'],
  ['GIU', ['A045', 'A046', 'A129', 'LICH'], 'Khiếu kiện quyết định cưỡng chế tháo dỡ công trình'], ['GS-34', ['LICH'], 'Khiếu kiện quyết định hành chính về đăng ký hộ tịch'], ['GS-31', ['A030'], 'Khiếu kiện quyết định phê duyệt phương án bồi thường', 'Người có QL, NV liên quan'],
  ['GS-07', ['LICH'], 'Khiếu kiện hành vi chậm cấp sổ đỏ'], ['GS-33', ['A014'], 'Khiếu kiện quyết định giao đất, cho thuê đất'], ['RS-07', ['A022'], 'Khiếu kiện quyết định xử phạt trong lĩnh vực xây dựng']
], 'HC', 'Hành chính', 'HC', 2026, 11);
var VA_DS = vaTu([
  ['GS-28', ['A010'], 'Tranh chấp hợp đồng đặt cọc'], ['GIU', ['A045', 'A046', 'A129'], 'Tranh chấp hợp đồng chuyển nhượng quyền sử dụng đất'], ['GS-01', ['A031', 'A042', 'A043'], 'Tranh chấp hợp đồng mua bán nhà ở', 'Bị đơn'],
  ['GS-07', ['LICH'], 'Tranh chấp ranh giới quyền sử dụng đất'], ['GS-08', ['A054'], 'Tranh chấp hợp đồng vay tài sản có thế chấp'], ['GS-09', ['A001'], 'Tranh chấp chia tài sản chung'],
  ['GS-05', ['A007'], 'Tranh chấp di sản thừa kế'], ['GS-06', ['A014', 'A033'], 'Tranh chấp hợp đồng thuê quyền sử dụng đất'], ['GS-02', ['LICHP', 'HOAN'], 'Tranh chấp bồi thường thiệt hại do tài sản gây ra'],
  ['GS-11', ['LICHH'], 'Tranh chấp hợp đồng gửi giữ tài sản'], ['GS-12', ['LICHH'], 'Tranh chấp hợp đồng hợp tác'], ['GS-04', ['A004'], 'Tranh chấp quyền về lối đi qua'],
  ['GS-17', ['LICHP', 'HOAN'], 'Tranh chấp hợp đồng xây dựng nhà ở'], ['GS-18', ['LICHH'], 'Tranh chấp hợp đồng bảo hiểm'], ['GS-21', ['A001', 'A055'], 'Tranh chấp hợp đồng tín dụng'],
  ['GS-10', ['LICHP', 'HOAN', 'A130'], 'Tranh chấp hợp đồng vay tài sản'], ['GS-33', ['A014'], 'Tranh chấp hợp đồng mua bán tài sản'], ['RS-02', ['A017'], 'Tranh chấp hợp đồng thuê nhà ở'],
  ['RS-47', ['A053'], 'Tranh chấp hợp đồng dịch vụ'], ['GS-31', ['A030'], 'Tranh chấp quyền sử dụng lối đi chung', 'Người có QL, NV liên quan'], ['RS-07', ['A022'], 'Tranh chấp bồi thường thiệt hại về sức khỏe']
], 'DS', 'Dân sự', 'DS', 2026, 31);
VA = VA.concat(VA_HC, VA_DS);
/* v207: Vụ việc dân sự (dòng 90–105); v308: chuyển sang "Vụ án, vụ việc của tôi" (mở Chi tiết vụ án) */
var VA_VDS = vaTu([
  ['GS-01', ['A029'], 'Yêu cầu tuyên bố một người mất năng lực hành vi dân sự', 'Người có QL, NV liên quan'], ['GS-28', ['A025', 'A010'], 'Yêu cầu công nhận thuận tình ly hôn'], ['GS-02', ['LICHP'], 'Yêu cầu hủy việc kết hôn trái pháp luật'],
  ['GS-11', ['LICHH'], 'Yêu cầu tuyên bố một người đã chết'], ['GS-06', ['A033'], 'Yêu cầu công nhận sự thỏa thuận chia tài sản chung'], ['GS-04', ['A006'], 'Yêu cầu tuyên bố văn bản công chứng vô hiệu'],
  ['GS-17', ['LICHP'], 'Yêu cầu xác định cha cho con'], ['GS-18', ['LICHH'], 'Yêu cầu thay đổi người trực tiếp nuôi con sau ly hôn'], ['GS-21', ['A001', 'A055'], 'Yêu cầu hạn chế quyền của cha, mẹ đối với con chưa thành niên'],
  ['GS-09', ['A001', 'A055'], 'Yêu cầu công nhận kết quả hòa giải thành ngoài Tòa án'], ['GS-12', ['LICHH'], 'Yêu cầu tuyên bố hợp đồng vô hiệu'], ['GS-07', ['LICH'], 'Yêu cầu công nhận thỏa thuận cấp dưỡng'],
  ['GIU', ['LICH'], 'Yêu cầu thông báo tìm kiếm người vắng mặt tại nơi cư trú']
], 'VD', 'Việc dân sự', 'VDS', 2026, 41, 'vds');
VA = VA.concat(VA_VDS);
/* v308: Vụ việc phục hồi phá sản – chỉ hồ sơ phục hồi, phá sản (Luật Phục hồi, phá sản 2025); dữ liệu mẫu, thẻ như Vụ án, vụ việc của tôi */
var VV = [
  { ma: 'PS-2026-0001', lv: 'PS', loai: 'Phá sản', tt: ['Đang giải quyết', 'info'], tinh: ['Đã mở thủ tục phá sản', 'info'], t: 'Yêu cầu mở thủ tục phá sản Công ty TNHH Thương mại Minh Phát', vt: 'Chủ nợ', cap: [['Sơ thẩm', 'cur']], toa: COURT1, thuLy: '15/10/2026', hd: ['LICH'], go: 'proceedingDetail' },
  { ma: 'PS-2026-0002', lv: 'PS', loai: 'Phục hồi', tt: ['Đang giải quyết', 'info'], tinh: ['Đang thực hiện phương án phục hồi', 'info'], t: 'Yêu cầu áp dụng thủ tục phục hồi Công ty Cổ phần Xây dựng Hòa Bình An', vt: 'Chủ nợ', cap: [['Sơ thẩm', 'cur']], toa: COURT1, thuLy: '02/10/2026', go: 'proceedingDetail' },
  { ma: 'PS-2026-0003', lv: 'PS', loai: 'Phá sản', tt: ['Đang giải quyết', 'info'], tinh: ['Yêu cầu bổ sung tài liệu, chứng cứ', 'warning'], t: 'Yêu cầu mở thủ tục phá sản Hợp tác xã Nông nghiệp Đông Anh', vt: 'Người yêu cầu', cap: [['Sơ thẩm', 'cur']], toa: COURT1, thuLy: '24/09/2026', hd: ['A025'], go: 'proceedingDetail' },
  { ma: 'PS-2026-0004', lv: 'PS', loai: 'Phá sản', tt: ['Đang xử lý đơn', 'info'], tinh: ['Tòa án đã nhận đơn', 'info'], t: 'Yêu cầu mở thủ tục phá sản Công ty TNHH Vận tải Sao Mai', vt: 'Người lao động', cap: [['Sơ thẩm', 'cur']], toa: COURT1, thuLy: '18/09/2026', go: 'proceedingDetail' },
  { ma: 'PS-2026-0005', lv: 'PS', loai: 'Phá sản', tt: ['Đã giải quyết', 'success'], tinh: ['Đã tuyên bố phá sản', 'neutral'], t: 'Yêu cầu mở thủ tục phá sản Công ty TNHH Dệt may Phú Hưng', vt: 'Chủ nợ', cap: [['Sơ thẩm', 'done']], toa: COURT1, thuLy: '12/05/2026', go: 'proceedingDetail' }];
function Proceedings() { return h(VaList, { vv: true }); } /* v207: vẽ lại Vụ việc của tôi theo kiểu thẻ vụ án; v308: Vụ việc phục hồi phá sản */
var VA_LOC = [['loai', 'Loại án', ['Tất cả loại án', 'Dân sự', 'Hôn nhân và gia đình', 'Kinh doanh, thương mại', 'Lao động', 'Hành chính', 'Việc dân sự']], ['cap', 'Cấp xét xử', ['Tất cả cấp xét xử', 'Sơ thẩm', 'Phúc thẩm', 'Giám đốc thẩm, tái thẩm']], ['tt', 'Trạng thái', ['Tất cả trạng thái', 'Đang giải quyết', 'Tạm đình chỉ', 'Đã giải quyết', 'Đang xử lý đơn', 'Đang xử lý', 'Đã xử lý']], ['vt', 'Vai trò', ['Tất cả vai trò', 'Nguyên đơn', 'Bị đơn', 'Người có quyền lợi, nghĩa vụ liên quan']]];
/* v308: bộ lọc Vụ việc phục hồi phá sản – loại vụ việc, vai trò theo dữ liệu mẫu */
var VV_LOC = [['loai', 'Loại vụ việc', ['Tất cả loại vụ việc', 'Phục hồi', 'Phá sản']], VA_LOC[1], VA_LOC[2], ['vt', 'Vai trò', ['Tất cả vai trò', 'Chủ nợ', 'Người yêu cầu', 'Người lao động']]];
var VA_LOC0 = { loai: 0, cap: 0, tt: 0, vt: 0 };
function VaLocSheet(p) {
  var l = React.useState(p.loc), v = l[0];
  return h(LvSheet, { host: p.host, title: 'Bộ lọc', onClose: p.onClose, foot: h(F, null, h(T.Button, { variant: 'secondary', onClick: function () { l[1](VA_LOC0); } }, 'Nhập lại'), h(T.Button, { onClick: function () { p.onApply(v); } }, 'Áp dụng')) },
    h('div', { className: 'ib-loc' }, (p.L || VA_LOC).map(function (f) { return h(IbPick, { key: f[0], host: p.host, label: f[1], v: v[f[0]], onPick: function (x) { var n = Object.assign({}, v); n[f[0]] = x; l[1](n); }, items: f[2].map(function (x, i) { return { id: i, name: x }; }) }); })));
}
/* v251 (04/11/2026): Vụ án / Vụ việc của tôi – danh sách kiểu Danh sách đơn: ô tìm, Sắp xếp + nút Bộ lọc, dải nhắc kiểu khối cam kết, thẻ kiểu thẻ đơn (nhãn trạng thái + tình trạng + sao, nhãn – giá trị, Việc cần làm) */
/* v305: số thụ lý mẫu suy từ mã (số thứ tự/năm/TL + cấp hiện tại + lĩnh vực) – dữ liệu mẫu */
var VA_LV_TL = { DS: 'DS', HN: 'HNGĐ', HC: 'HC', KT: 'KDTM', KD: 'KDTM', LD: 'LĐ', PS: 'PS' };
function vaSoTL(v) { var m = /^([A-Z]+)-(\d{4})-(\d+)$/.exec(v.ma || ''); if (!m) return '—'; var cur = (v.cap.filter(function (c) { return c[1] === 'cur'; })[0] || v.cap[v.cap.length - 1] || ['Sơ thẩm'])[0];
  return parseInt(m[3], 10) + '/' + m[2] + '/' + (/Phúc/.test(cur) ? 'TLPT' : /Giám đốc/.test(cur) ? 'TLGĐT' : 'TLST') + '-' + (VA_LV_TL[m[1]] || m[1]); }
function VaCard(p) {
  var v = p.v, viec = qdViec({ hd: v.hd, hanHd: v.hanHd });
  /* v305: thẻ vụ án – Mã định danh (thay Mã vụ án), Số - Ngày thụ lý, Tư cách (thay Vai trò), Cấp xét xử, Tòa án; giữ Phiên tòa và dòng hạn khi có */
  var rows = [['Mã định danh', h('span', { className: 'tp-num' }, v.ma)], ['Số - Ngày thụ lý', h(F, null, h('span', { className: 'tp-num' }, vaSoTL(v)), ' - ', h('span', { className: 'tp-num' }, v.thuLy))], ['Tư cách', v.vt], ['Cấp xét xử', v.cap.map(function (c) { return c[0]; }).join(' › ')], ['Tòa án', v.toa]];
  if (v.phien) rows.push(['Phiên tòa', v.phien[0].replace(/^Phiên tòa · /, '')]);
  if (v.han) rows.push([v.han.split(': ')[0], v.han.split(': ')[1]]);
  return h('li', { className: 'qd-c qc' },
    h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem chi tiết vụ án ' + v.ma, 'data-pt-go': v.go }),
    h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: v.tt[1], icon: false }, v.tt[0]), v.tinh ? h('span', { className: 'qd-tinh qc-tinh qd-tinh-' + (v.tinh[1] === 'neutral' ? 'success' : v.tinh[1]), title: v.tinh[0] }, h('span', { className: 'qc-tinh-tx' }, v.tinh[0])) : null,
      h('button', { type: 'button', className: 'ph-mail2-btn qd-star' + (v.ghim ? ' ph-mail2-on' : ''), 'aria-pressed': !!v.ghim, 'aria-label': v.ghim ? 'Bỏ đánh dấu' : 'Đánh dấu theo dõi', onClick: function () { v.ghim = !v.ghim; p.onDoi(); } }, h(T.Icon, { name: 'star' }))),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, v.t)),
    h('dl', { className: 'qc-ben va-ben' } /* v306 */, rows.map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0]), h('dd', null, r[1])); })),
    viec.length ? h('div', { className: 'qd-c-f qc-vk vkx-box' }, h('p', { className: 'qc-vk-h vkx-h' }, 'Việc cần làm'), h('ul', { className: 'qc-vk-l' }, viec.map(function (x) {
      var m = x.hn ? x.hn[1] : 'an';
      return h('li', { key: x.t, className: 'vk-card vka vkx vkx-' + (x.hn ? m : 'none') }, h('button', { type: 'button', className: 'vka-b', 'data-pt-go': x.go }, h('span', { className: 'vka-tx' }, h('b', null, x.t), h('small', null, x.hn ? h(F, null, 'Hạn xử lý · ', h('span', { className: 'vka-han vka-han-' + m }, x.hn[0])) : 'Không có thời hạn'))));
    }))) : null);
}
function VaList(p) {
  var q = React.useState(''), lc = React.useState(VA_LOC0), sh = React.useState(null), rr = React.useState(0), dong = React.useState(false), sx = React.useState('Mới nhất'), anchor = React.useRef(null), host = useHost(anchor);
  var L = p.vv ? VV_LOC : VA_LOC, tk = q[0].trim().toLowerCase(), v = lc[0], soLoc = ['loai', 'cap', 'tt', 'vt'].filter(function (k) { return v[k]; }).length;
  var ds = (p.rong ? [] : p.vv ? VV : VA).filter(function (x) { return (!tk || [x.ma, x.t].join(' ').toLowerCase().indexOf(tk) >= 0) && (!v.tt || x.tt[0] === L[2][2][v.tt]) && (!v.loai || x.loai === L[0][2][v.loai]) && (!v.vt || x.vt === L[3][2][v.vt]); });
  if (sx[0] === 'Cũ nhất') ds = ds.slice().reverse();
  var coLoc = !!tk || soLoc;
  return Sub(p.vv ? 'Vụ việc phục hồi phá sản' : 'Vụ án, vụ việc của tôi' /* v308: theo tên mục ở tab Hồ sơ */, h(F, null, h('span', { ref: anchor, hidden: true }),
    h('div', { className: 'nv-stick qd-stick' },
      h('div', { className: 'ph-ibar' }, h('div', { className: 'fx-search' }, Tf(p.vv ? 'Tìm vụ việc' : 'Tìm vụ án', { icon: 'search', placeholder: p.vv ? 'Tìm theo mã vụ việc, tên vụ việc…' : 'Tìm theo mã vụ án, tên vụ án, mã đơn…', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } }))),
      h('div', { className: 'ib-docrow st-row sf-row' },
        h('button', { type: 'button', className: 'ph-ibar-sort ib-sort2', 'aria-label': 'Sắp xếp: ' + sx[0], onClick: function () { sh[1]('sort'); } }, h(T.Icon, { name: 'sortDesc' }), sx[0]),
        h('span', { className: 'sf-sp' }),
        h('button', { type: 'button', className: 'sf-pill' + (soLoc ? ' sf-on' : ''), 'aria-label': soLoc ? 'Bộ lọc, đang lọc ' + soLoc + ' điều kiện' : 'Bộ lọc', onClick: function () { sh[1]('loc'); } }, h(T.Icon, { name: 'filter' }), 'Bộ lọc', soLoc ? h('span', { className: 'sf-badge tp-num', 'aria-hidden': 'true' }, soLoc) : null))),
    p.rong || p.vv || dong[0] ? null : h('section', { className: 'ckb qbx-b', role: 'status' }, h('span', { className: 'qbx-ic', 'aria-hidden': 'true' }, h(T.Illustration, { name: 'nhacViec' })),
      h('div', { className: 'ckb-tx' }, h('p', { className: 'qbx-p' }, h('b', null, 'Phiên tòa sơ thẩm sắp diễn ra'), ' — DS-2026-0012 · 14:00, 05/11/2026. ', h('button', { type: 'button', className: 'qd-band-link', 'data-pt-go': 'caseDetail' }, 'Xem vụ án →'))),
      h('button', { type: 'button', className: 'ckb-x', 'aria-label': 'Đóng thông báo' /* v309: nhãn 'Đóng' bị luật R gán quay lại – đổi nhãn để X chỉ ẩn thông báo */, onClick: function () { dong[1](true); } }, h(T.Icon, { name: 'x' }))),
    ds.length ? h('ul', { className: 'qd-list' }, ds.map(function (x) { return h(VaCard, { key: x.ma, v: x, onDoi: function () { rr[1](rr[0] + 1); } }); }))
      : h(IbEmpty, { title: coLoc ? 'Không có vụ án phù hợp' : 'Bạn chưa có vụ án nào', text: coLoc ? 'Không tìm thấy vụ án nào với bộ lọc hiện tại. Thử đổi bộ lọc hoặc xóa từ khóa tìm kiếm.' : 'Khi đơn khởi kiện của bạn được Tòa án thụ lý, vụ án sẽ hiển thị tại đây.' }),
    sh[0] === 'sort' && host ? h(LvSheet, { host: host, title: 'Sắp xếp', onClose: function () { sh[1](null); } }, h(LvRows, { label: 'Sắp xếp', cur: sx[0], items: ['Mới nhất', 'Cũ nhất'].map(function (x) { return { id: x, name: x }; }), onPick: function (id) { sx[1](id); sh[1](null); } })) : null,
    sh[0] === 'loc' && host ? h(VaLocSheet, { host: host, L: L, loc: v, onClose: function () { sh[1](null); }, onApply: function (x) { lc[1](x); sh[1](null); } }) : null));
}
function Cases() { return h(VaList); }
function CasesEmpty() { return h(VaList, { rong: true }); }
/* chi tiết vụ án – tình huống tạm đình chỉ / xem xét lại GĐT, TT */
function CaseDetailPaused() { return h(VuAnChiTiet, { top: h(NvCall, { tone: 'warning', title: 'Vụ án đang tạm đình chỉ giải quyết (Điều 214, 215 BLTTDS)' }, 'Cần đợi kết quả giải quyết vụ việc khác có liên quan (điểm d khoản 1 Điều 214 BLTTDS).') }); }
function CaseDetailReview() { return h(VuAnChiTiet, { top: h(NvCall, { tone: 'info', title: 'Vụ án đang được xem xét lại theo thủ tục Giám đốc thẩm / Tái thẩm' }, 'Quyết định kháng nghị giám đốc thẩm số 12/2026/KN-DS ngày 20/10/2026 của Chánh án Tòa án nhân dân cấp cao tại Hà Nội.') }); }
/* tạo đơn liên quan – giai đoạn sau thụ lý (TaoDonLienQuan của chi tiết vụ án) */
var VA_TAO = [
  ['Đơn liên quan đến vụ án', 'Rút đơn khởi kiện, sửa đổi, bổ sung và thay đổi, rút yêu cầu khởi kiện', [['Yêu cầu rút đơn khởi kiện', 'Đề nghị Tòa án cho rút toàn bộ đơn khởi kiện trong quá trình giải quyết vụ án', 'rd1'], ['Thay đổi, rút một phần yêu cầu khởi kiện', 'Sửa đổi nội dung yêu cầu, bổ sung yêu cầu mới, hoặc bỏ bớt yêu cầu', 'tr1']]],
  ['Đơn liên quan biện pháp khẩn cấp tạm thời', 'Áp dụng, thay đổi hoặc hủy bỏ biện pháp khẩn cấp tạm thời', [['Yêu cầu áp dụng biện pháp khẩn cấp tạm thời', 'Bảo vệ tài sản, chứng cứ hoặc giữ nguyên tình trạng hiện có', 'bp1'], ['Đề nghị thay đổi biện pháp đang áp dụng', 'Đổi sang biện pháp khác, thu hẹp hoặc mở rộng phạm vi áp dụng', 'bpt1'], ['Đề nghị hủy bỏ biện pháp đang áp dụng', 'Chấm dứt hoàn toàn biện pháp vì lý do áp dụng không còn', 'bph1']]],
  ['Đơn liên quan án phí, lệ phí, chi phí tố tụng', 'Miễn, giảm tạm ứng và các đề nghị về chi phí trong quá trình giải quyết', [['Đề nghị về chi phí tố tụng', 'Chi phí giám định, định giá, người làm chứng, người phiên dịch', 'snack:Màn Đề nghị về chi phí tố tụng chưa có trong bản thiết kế.']]],
  ['Đơn yêu cầu khác', 'Yêu cầu, đề nghị phát sinh trong tố tụng và các thủ tục riêng', [['Đơn yêu cầu, đề nghị khác trong tố tụng', 'Hoãn phiên tòa · chứng cứ · người làm chứng · giám định, định giá · tạm đình chỉ', 'snack:Màn Đơn yêu cầu, đề nghị khác chưa có trong bản thiết kế.']]],
  ['Giao nộp & sao gửi tài liệu, chứng cứ', 'Nộp bổ sung tài liệu, chứng cứ cho vụ án và thực hiện nghĩa vụ sao gửi cho đương sự khác', [['Giao nộp tài liệu, chứng cứ cho vụ án', 'Nộp bổ sung tài liệu, chứng cứ cho hồ sơ vụ án đang giải quyết (Điều 96 BLTTDS)', 'evidence2'], ['Sao gửi tài liệu, chứng cứ cho đương sự khác', 'Tự sao gửi hoặc đề nghị Tòa án hỗ trợ khi không tự thực hiện được (Khoản 5 Điều 96, Khoản 9 Điều 70)', 'sg1']]]];
/* v251: bảng chọn loại đơn của vụ án (kiểu C3/D3, giữ tên nhóm đầy đủ): [tên nhóm, màu huy hiệu, [[tên đơn, đích, biểu tượng]]] */
var VA_TAO_IC = { rd1: 'logout', tr1: 'swap', bp1: 'shield', bpt1: 'pen', bph1: 'x', evidence2: 'filePlus', sg1: 'send' };
var VA_TAO_G = VA_TAO.map(function (g, i) { return [g[0], ['do', 'xanh', 'vang', 'luc', 'luc'][i], g[2].map(function (x) { return [x[0], x[2], VA_TAO_IC[x[2]] || (/chi phí/.test(x[0]) ? 'wallet' : 'file')]; })]; });
function DtTaoDonVA(p) {
  p = p || {}; var ref = React.useRef(null), hoan = p.noiBat === 'hoan-phien';
  React.useEffect(function () { if (!hoan) return; var t = setTimeout(function () { if (ref.current) ref.current.scrollIntoView({ block: 'center' }); }, 120); return function () { clearTimeout(t); }; }, [hoan]); /* v207: noiBat=hoan-phien – cuộn tới và làm nổi nhóm Đơn yêu cầu khác */
  return FCard('Tạo đơn liên quan — giai đoạn sau thụ lý', h(F, null, P('Chỉ người khởi kiện hoặc người đại diện mới được thao tác.', 'ph-muted'),
    VA_TAO.map(function (g) {
      var hl = hoan && g[0] === 'Đơn yêu cầu khác';
      return h('section', { key: g[0], ref: hl ? ref : undefined, className: 'dt-tao' + (hl ? ' dt-tao-hl' : '') }, hl ? h('p', { className: 'dt-tao-hl-t' }, h(T.Icon, { name: 'pen' }), 'Nộp đơn đề nghị hoãn phiên tòa tại đây') : null, h('p', { className: 'dt-tao-h' }, h('b', null, g[0]), h('small', null, g[1])),
        h('ul', null, g[2].map(function (x) { return h('li', { key: x[0] }, h('button', { type: 'button', className: 'dt-tao-it va-tao-it', 'data-pt-go': x[2] }, h('span', null, h('b', null, x[0]), h('small', null, x[1])), h(T.Icon, { name: 'chevronRight' }))); })));
    })), true);
}
/* Yêu cầu sao chụp tài liệu, chứng cứ (web /trich-luc/moi/sao-chup, mở từ tab Tài liệu, chứng cứ của vụ án) */
var SC_GOIY = { duong_su: ['Đối chiếu số liệu công nợ và biên bản nghiệm thu', 'Thu thập chứng cứ đối tụng'], toa_an: ['Nghiên cứu hồ sơ chuẩn bị phiên tòa', 'Đối chiếu kết luận định giá và biên bản thẩm định', 'Chuẩn bị bản luận cứ tranh tụng'] };
function CaseCopy(p) {
  var nguon = p.nguon || 'duong_su', ld = React.useState(''), ht = React.useState('toa'), ky = React.useState(false), sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), ds = React.useState([0]);
  var ben = [['Trần Văn Bình', 'Bị đơn · 2 tài liệu'], ['Lê Thị Hoa', 'Người có quyền lợi, nghĩa vụ liên quan · 1 tài liệu']];
  return SubS('Yêu cầu sao chụp', h(F, null, h('span', { ref: anchor, hidden: true }),
    FCard('Vụ án', RvKV([['Mã vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Tên vụ án', 'Tranh chấp hợp đồng vay tài sản'], ['Nguồn tài liệu', nguon === 'toa_an' ? 'Tài liệu do Tòa án thu thập' : 'Tài liệu do đương sự khác xuất trình']]), true),
    nguon === 'toa_an' ? null : FCard('Chọn đương sự cần sao chụp', h(F, null, h('button', { type: 'button', className: 'vk-link sc-all', onClick: function () { ds[1](ds[0].length === ben.length ? [] : [0, 1]); } }, ds[0].length === ben.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả đương sự'),
      h('div', { className: 'tr-yc' }, ben.map(function (b, i) { return h(T.Checkbox, { key: b[0], checked: ds[0].indexOf(i) >= 0, onChange: function (e) { ds[1](e.target.checked ? ds[0].concat([i]) : ds[0].filter(function (x) { return x !== i; })); }, label: h('span', { className: 'sg-ng' }, h('b', null, b[0]), h('small', null, b[1])) }); })),
      ds[0].length ? null : P('Vui lòng chọn ít nhất 1 đương sự cần sao chụp.', 'ph-muted dt-small')), true),
    FCard('Lý do và hình thức nhận', h(F, null,
      Tf('Lý do cần sao chụp', { required: true, multiline: true, value: ld[0], onChange: function (e) { ld[1](e.target.value); }, placeholder: nguon === 'toa_an' ? 'VD: Cần đối chiếu kết luận định giá tài sản và biên bản xem xét, thẩm định tại chỗ để chuẩn bị bản luận cứ tranh tụng tại phiên tòa.' : 'VD: Cần đối chiếu số liệu công nợ và biên bản nghiệm thu do phía bên kia giao nộp để chuẩn bị ý kiến tại phiên họp kiểm tra việc giao nộp, tiếp cận, công khai chứng cứ.' }),
      h('div', { className: 'sc-goiy' }, h('span', null, 'Gợi ý nhanh:'), SC_GOIY[nguon].map(function (g) { return h('button', { key: g, type: 'button', className: 'ib-chip2', onClick: function () { ld[1](g); } }, g); })),
      h(ChonThe, { label: 'Hình thức nhận', v: ht[0], onPick: ht[1], items: [{ id: 'toa', t: 'Nhận bản giấy tại Tòa án', d: 'Mang giấy tờ tùy thân đến bộ phận hành chính tư pháp để nhận.' }, { id: 'bc', t: 'Nhận bản giấy qua bưu chính', d: 'Gửi tới địa chỉ bạn nhập bên dưới, cước do người yêu cầu trả.' }] }),
      ht[0] === 'bc' ? h(F, null, Tf('Tên người nhận', { required: true, defaultValue: 'Hoàng Dương' }), Tf('Số điện thoại', { required: true, type: 'tel', defaultValue: '0912345678' }),
        h(T.SelectField, { label: 'Tỉnh / Thành phố', labelVisible: true, required: true, placeholder: 'Chọn tỉnh/thành phố' }), h(T.SelectField, { label: 'Phường / Xã', labelVisible: true, required: true, placeholder: 'Chọn tỉnh trước', disabled: true }),
        Tf('Địa chỉ chi tiết', { required: true, placeholder: 'Số nhà, tên đường' })) : null), true),
    laTC() ? h(GiayGT, { bb: false }) : null, /* v333 */
    FCard('Xem trước đơn & ký số', h(F, null, h('ul', { className: 'ph-ky' }, h('li', null, h('div', null, h('b', null, 'Đơn yêu cầu sao chụp tài liệu, chứng cứ'), h('small', null, ky[0] ? KY_LUC : 'Điền đủ thông tin phía trên rồi xem trước đơn để ký số.')),
      ky[0] ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn', onClick: function () { sh[1](true); } }, 'Ký số')))), true, ky[0] ? 'signed' : 'unsigned'),
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: ['Đơn yêu cầu sao chụp tài liệu, chứng cứ'], onClose: function () { sh[1](false); }, onKy: function () { sh[1](false); ky[1](true); } }), host) : null),
    Bar(Btn('Lưu nháp', 'secondary', { 'data-pt-go': 'snack:Đã lưu nháp [mã yêu cầu]. Bạn có thể tiếp tục chỉnh sửa và gửi sau.' }), Btn('Gửi yêu cầu', 'primary', ky[0] ? { 'data-pt-go': 'replace:caseCopyOk' } : { disabled: true, title: 'Vui lòng ký số trước khi gửi yêu cầu.' })));
}
function CaseCopyOk() {
  return h(OkScr, { title: 'Đã gửi yêu cầu [mã yêu cầu]', text: 'Chờ Tòa án xem xét', info: [['Mã yêu cầu', '[Mã yêu cầu]', 1], ['Khối lượng dự kiến', '[Số trang dự kiến]'], ['Trạng thái', 'Chờ Tòa án xem xét']],
    btns: h(F, null, Btn('Về chi tiết vụ án', 'primary', { 'data-pt-go': 'backTo:caseDetail' }), Btn('Theo dõi yêu cầu', 'secondary', { 'data-pt-go': 'reset:home,copyList' })) });
}
/* ===== 4. Phương thức giao dịch điện tử (web /phuong-thuc-giao-dich + giao-dich-dien-tu/wizard-chuyen-phuong-thuc) ===== */
var PT_TT = { 'PT-01': ['Điện tử', 'success'], 'PT-02': ['Chờ Tòa duyệt', 'warning'], 'PT-03': ['Giấy (tạm)', 'neutral'], 'PT-04': ['Giấy — đến khi kết thúc', 'danger'] };
var PT_LOAI = { DON: ['Đơn', 'file'], VUAN: ['Vụ án', 'scale'], VUVIEC: ['Vụ việc', 'briefcase'] };
var PT_HS = [
  { id: 1, pv: 'DON', ma: 'TN-20261020-0012', ten: 'Tranh chấp hợp đồng vay tài sản', vt: ['Người khởi kiện'], tt: 'PT-01' },
  { id: 2, pv: 'VUAN', ma: 'DS-2026-0018', ten: 'Tranh chấp hợp đồng mua bán tài sản', vt: ['Bị đơn'], tt: 'PT-02', con: 2, huy: true },
  { id: 3, pv: 'VUAN', ma: 'DS-2026-0012', ten: 'Tranh chấp hợp đồng vay tài sản', vt: ['Nguyên đơn'], tt: 'PT-03', alt: 'Bưu chính' },
  { id: 4, pv: 'VUVIEC', ma: 'VDS-2026-0003', ten: 'Yêu cầu công nhận thỏa thuận dân sự', vt: ['Người yêu cầu'], tt: 'PT-04', alt: 'Nhận trực tiếp tại Tòa án' },
  { id: 5, pv: 'VUAN', ma: 'HN-2026-0007', ten: 'Ly hôn, tranh chấp nuôi con', vt: ['Bị đơn'], tt: 'PT-02', con: 1, huy: false }];
var PT_LOC = [['all', 'Tất cả'], ['PT-01', 'Điện tử'], ['PT-02', 'Chờ Tòa duyệt'], ['PT-03', 'Giấy (tạm)'], ['PT-04', 'Giấy đến khi kết thúc']];
var PT_SUB = 'Mỗi đơn, vụ án chọn phương thức điện tử hoặc giấy độc lập (Điều 4.5 NQ 01/2026). Đổi phương thức giữa chừng cần lý do chính đáng và Tòa án chấp nhận.';
/* v335 (12/11/2026): thẻ Phương thức giao dịch sắp theo thẻ Danh sách đơn và tiến trình (QdCard): hàng nhãn phương thức + tình trạng · tên · dòng nhãn–giá trị · khối thao tác cuối thẻ */
function PtCard(p) {
  var x = p.x, l = PT_LOAI[x.pv], t = PT_TT[x.tt];
  var rows = [[l[0], h('span', { className: 'tp-num' }, x.ma)], ['Tòa án', COURT1], ['Tư cách', x.vt.join(', ')]].concat(x.alt && x.tt !== 'PT-01' ? [['Tống đạt qua', x.alt]] : []);
  var act = x.tt === 'PT-01' ? h('div', { className: 'pt-btns' }, Btn('Tạm chuyển sang giấy', 'secondary', { size: 'sm', onClick: ptWzMoi, 'data-pt-go': 'ptSus1' }), Btn('Chuyển giấy đến khi kết thúc', 'secondary', { size: 'sm', onClick: ptWzMoi, 'data-pt-go': 'ptCan1' }))
    : x.tt === 'PT-02' ? (x.huy ? h('div', { className: 'pt-btns' }, Btn('Hủy yêu cầu', 'secondary', { size: 'sm', onClick: function () { p.onDoi(x, 'PT-01'); }, 'data-pt-go': 'snack:Đã hủy yêu cầu.' })) : h('p', { className: 'pt-c-note' }, 'Đang chờ Tòa án xét duyệt'))
    : x.tt === 'PT-03' ? h('div', { className: 'pt-btns' }, Btn('Tiếp tục điện tử', 'primary', { size: 'sm', onClick: function () { p.onDoi(x, 'PT-01'); }, 'data-pt-go': 'snack:Đã tiếp tục giao dịch điện tử.' }), Btn('Chuyển giấy đến khi kết thúc', 'secondary', { size: 'sm', onClick: ptWzMoi, 'data-pt-go': 'ptCan1' }))
    : h('p', { className: 'pt-c-note' }, 'Giao dịch bằng giấy đến khi kết thúc — không thể quay lại điện tử.');
  return h('li', { className: 'qd-c qc ptq' },
    h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: t[1], icon: false }, t[0]), x.tt === 'PT-02' ? h('span', { className: 'qd-tinh qc-tinh qd-tinh-warning' }, h('span', { className: 'qc-tinh-tx' }, 'Còn ' + x.con + ' ngày Tòa trả lời')) : null),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, x.ten)),
    h('dl', { className: 'qc-ben' }, rows.map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0] + ':'), h('dd', null, r[1])); })),
    h('div', { className: 'ptq-a' }, act));
}
/* v313 (11/11/2026): theo web – 4 hồ sơ mỗi lần (pageSize 4); app tự tải thêm khi cuộn tới cuối (giống Hộp thư tống đạt) */
var PT_PAGE = 4;
function PtList(p) {
  var q = React.useState(''), f = React.useState('all'), ds0 = React.useState(function () { return p.rong ? [] : PT_HS.map(function (x) { return Object.assign({}, x); }); });
  var n = React.useState(PT_PAGE), tai = React.useState(false), end = React.useRef(null);
  var all = ds0[0], tk = q[0].trim().toLowerCase();
  var doi = function (x, tt) { ds0[1](all.map(function (y) { return y.id === x.id ? Object.assign({}, y, { tt: tt }) : y; })); };
  var chips = PT_LOC.map(function (c) { return { key: c[0], label: c[1], count: c[0] === 'all' ? all.length : all.filter(function (x) { return x.tt === c[0]; }).length }; });
  var ds = all.filter(function (x) { return (f[0] === 'all' || x.tt === f[0]) && (!tk || (x.ma + ' ' + x.ten).toLowerCase().indexOf(tk) >= 0); }), hien = ds.slice(0, n[0]);
  React.useEffect(function () { n[1](PT_PAGE); }, [f[0], tk]);
  React.useEffect(function () {
    var el = end.current; if (!el || n[0] >= ds.length || typeof IntersectionObserver === 'undefined') return;
    var ob = new IntersectionObserver(function (e) { if (e[0].isIntersecting && !tai[0]) { tai[1](true); setTimeout(function () { n[1](function (x) { return x + PT_PAGE; }); tai[1](false); }, 700); } });
    ob.observe(el); return function () { ob.disconnect(); };
  }, [n[0], ds.length, tai[0]]);
  var body;
  if (p.camKet === false) body = h(IbEmpty, { icon: 'folder', title: 'Chưa có hồ sơ nào đang mở', text: 'Nộp đơn để bắt đầu giao dịch điện tử.' });
  else if (p.loi) body = h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tải được danh sách hồ sơ.', text: 'Mã lỗi: [mã lỗi]', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: noop, className: 'nv-err' });
  else if (!all.length) body = h(IbEmpty, { icon: 'folder', title: 'Chưa có hồ sơ', text: 'Chưa có hồ sơ nào được Tòa án cập nhật phương thức giao dịch.' });
  else body = h(F, null,
    h('div', { className: 'nv-stick' },
      h('div', { className: 'fx-search' }, Tf('Tìm hồ sơ', { icon: 'search', placeholder: 'Tìm theo mã hoặc tên đơn, vụ án', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })),
      h('div', { className: 'vk-tabs nv-chips' }, h(T.Tabs, { variant: 'chip', label: 'Lọc theo phương thức', value: f[0], onChange: f[1], items: chips }))),
    ds.length ? h('ul', { className: 'qd-list' }, hien.map(function (x) { return h(PtCard, { key: x.id, x: x, onDoi: doi }); }),
      n[0] < ds.length ? h('li', { ref: end, className: 'ph-loadmore ib-more', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), h('span', null, 'Đang tải hồ sơ…')) : null)
      : h(IbEmpty, { icon: 'search', title: 'Không tìm thấy hồ sơ phù hợp.' }) /* v313: đúng câu web, bỏ câu phụ và nút Xóa bộ lọc */);
  return Sub('Phương thức giao dịch điện tử', h(F, null, body)); /* v318: bỏ đoạn mô tả PT_SUB đầu màn (người dùng yêu cầu) */
}
function Method() { return h(PtList); }
function MethodEmpty() { return h(PtList, { camKet: false }); }
function MethodNone() { return h(PtList, { rong: true }); }
function MethodErr() { return h(PtList, { loi: true }); }
/* wizard chuyển phương thức: suspend (tạm chuyển giấy) / cancel (giấy đến khi kết thúc) – 3 bước */
var PT_WZ_STEPS = ['Lý do chuyển', 'Phương thức thay thế', 'Xem lại và xác nhận'];
var PT_WZ = { sus: { title: 'Yêu cầu tạm chuyển sang giấy', id: 'ptSus' }, can: { title: 'Chuyển giấy đến khi kết thúc hồ sơ', id: 'ptCan' } };
var PT_ALT = [{ id: 'bc', t: 'Bưu chính', d: 'Nhận qua đường bưu điện' }, { id: 'tt', t: 'Nhận trực tiếp tại Tòa án', d: 'Đến trực tiếp trụ sở Tòa án nhận' }];
var PT_DC = 'Số 12 ngõ 34 phố Láng Hạ, Phường Láng, Thành phố Hà Nội';
function PtHoSo() {
  return h('div', { className: 'pt-hs' }, h('span', { className: 'pt-hs-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: 'file' })),
    h('div', null, h('small', null, 'Áp dụng cho hồ sơ'), h('b', null, 'Tranh chấp hợp đồng vay tài sản'), h('span', { className: 'tp-num' }, 'Đơn · TN-20261020-0012')));
}
/* v313 (11/11/2026): kiểm tra thật khi bấm (theo web Qhe): bước 1 – lý do (bỏ khoảng trắng) và ô xác nhận; bước 2 – địa chỉ khi chọn Bưu chính.
   Lỗi chỉ hiện sau khi bấm Tiếp tục, tự ẩn khi đã nhập; qua bước thì xóa cờ lỗi. Giá trị giữ trong PT_WZ_ST để bước 3 và Quay lại dùng lại. */
var PT_WZ_ST = { ld: '', ok: false, m: 'bc', dc: PT_DC };
function ptWzMoi() { PT_WZ_ST = { ld: '', ok: false, m: 'bc', dc: PT_DC }; }
/* khung prototype bắt bấm ở pha capture nên không chặn được bằng stopPropagation: chỉ gắn data-pt-go khi hợp lệ; chưa hợp lệ thì nút là .pt-chk (xử lý tại chỗ, bật cờ lỗi) */
function ptNut(hopLe, setTr, go) { return hopLe ? { 'data-pt-go': go, onClick: function () { setTr(false); } } : { className: 'pt-chk', onClick: function () { setTr(true); } }; }
function PtWz1(p) {
  var w = PT_WZ[p.k], ld = React.useState(PT_WZ_ST.ld), ok = React.useState(PT_WZ_ST.ok), tr = React.useState(false), du = !!(ld[0].trim() && ok[0]);
  PT_WZ_ST.ld = ld[0]; PT_WZ_ST.ok = ok[0];
  return Wz({ title: w.title, steps: PT_WZ_STEPS, n: 1, save: false, last: Btn(h(F, null, 'Tiếp tục', h(T.Icon, { name: 'chevronRight' })), 'primary', ptNut(du, tr[1], w.id + '2')),
    body: h(F, null,
      h(NvCall, { tone: p.k === 'can' ? 'danger' : 'warning', title: 'Nghĩa vụ tố tụng và thời hạn không thay đổi.' }, 'Sau khi tạm ngưng, văn bản của Tòa án sẽ được tống đạt qua phương thức thay thế — có thể chậm hơn. Bạn vẫn phải theo dõi và thực hiện đúng hạn mọi thủ tục.'),
      h(PtHoSo),
      Tf('Lý do chuyển phương thức', { required: true, multiline: true, maxLength: 300, value: ld[0], onChange: function (e) { ld[1](e.target.value.slice(0, 300)); }, placeholder: 'Nhập lý do chuyển sang nhận văn bản giấy…', help: ld[0].length + '/300', error: tr[0] && !ld[0].trim() ? 'Vui lòng nhập lý do chuyển phương thức.' : undefined }),
      h('div', { className: 'ph-commit' }, h(T.Checkbox, { checked: ok[0], onChange: function (e) { ok[1](e.target.checked); }, error: tr[0] && !ok[0] ? 'Vui lòng xác nhận bạn đã hiểu hậu quả.' : undefined, label: 'Tôi đã đọc và hiểu rõ hệ quả của việc ' + w.title.toLowerCase() + ' đối với hồ sơ đang giải quyết.' }))) });
}
function PtWz2(p) {
  var w = PT_WZ[p.k], m = React.useState(PT_WZ_ST.m), dc = React.useState(PT_WZ_ST.dc), tr = React.useState(false), du = m[0] === 'tt' || !!dc[0].trim();
  PT_WZ_ST.m = m[0]; PT_WZ_ST.dc = dc[0];
  return Wz({ title: w.title, steps: PT_WZ_STEPS, n: 2, save: false, last: Btn(h(F, null, 'Tiếp tục', h(T.Icon, { name: 'chevronRight' })), 'primary', ptNut(du, tr[1], w.id + '3')),
    body: h(F, null, FCard('Phương thức nhận văn bản thay thế', h(F, null,
      Lead('Theo Điều 9 NQ 01/2026, bạn phải đăng ký cách nhận văn bản của Tòa án khi không dùng giao dịch điện tử.'),
      h(ChonThe, { label: 'Phương thức nhận văn bản thay thế', v: m[0], onPick: m[1], items: PT_ALT }),
      m[0] === 'bc' ? Tf('Địa chỉ nhận bưu chính', { multiline: true, value: dc[0], onChange: function (e) { dc[1](e.target.value); }, error: tr[0] && !dc[0].trim() ? 'Vui lòng nhập địa chỉ nhận văn bản.' : undefined }) : null), true)) });
}
function PtWz3(p) {
  var w = PT_WZ[p.k], s = PT_WZ_ST, alt = s.m === 'bc' ? 'Bưu chính — ' + s.dc.trim() : 'Nhận trực tiếp tại Tòa án';
  return Wz({ title: w.title, steps: PT_WZ_STEPS, n: 3, save: false, last: Btn(p.k === 'can' ? 'Xác nhận hủy' : 'Gửi yêu cầu', 'primary', { 'data-pt-go': 'replace:' + w.id + 'Ok' }),
    body: FCard('Xem lại và xác nhận', RvKV([['Loại yêu cầu', w.title], ['Phương thức thay thế', alt], ['Lý do', s.ld.trim() || '[Lý do bạn đã nhập]']]), true) });
}
/* kết quả: chờ Tòa duyệt (PT-02) hoặc áp dụng ngay (PT-03 / PT-04) */
function PtOk(p) {
  var cho = !p.ngay, can = p.k === 'can';
  var text = cho ? 'Mã yêu cầu [mã yêu cầu]. Tòa án sẽ trả lời trong tối đa 03 ngày làm việc.' + (can ? '' : ' Trong thời gian chờ, giao dịch điện tử của bạn vẫn hoạt động bình thường.')
    : 'Mã yêu cầu [mã yêu cầu].' + (can ? ' Hồ sơ này nhận văn bản bằng giấy đến khi kết thúc và không thể quay lại điện tử.' : ' Hồ sơ này tạm nhận văn bản bằng giấy; bạn có thể quay lại giao dịch điện tử bất cứ lúc nào.');
  return h(OkScr, { title: cho ? 'Đã gửi yêu cầu ' + (can ? 'hủy' : 'tạm ngưng') : 'Đã chuyển sang ' + (can ? 'giấy đến khi kết thúc' : 'giấy (tạm)'), text: text,
    btns: Btn('Đóng', 'primary', { 'data-pt-go': 'backTo:method' }) });
}
/* ===== 5. Câu hỏi thường gặp (web /faq: tra-cuu, the-cau-hoi, phan-hoi-huu-ich, gop-y-cua-toi) ===== */
var FAQ_NHOM = [
  { id: 'tk', ten: 'Tài khoản', ds: [
    { id: 1, q: 'Thay đổi thông tin liên hệ ở đâu?', a: 'Mở Thông tin tài khoản và chọn Chỉnh sửa tại Thông tin liên hệ. Thông tin định danh là thông tin chỉ đọc.', d: '20/10/2026' },
    { id: 2, q: 'Đổi mật khẩu đăng nhập như thế nào?', a: 'Mở Cá nhân và chọn Đổi mật khẩu.', d: '20/10/2026' }] },
  { id: 'td', ten: 'Tống đạt văn bản', ds: [{ id: 3, q: 'Xem văn bản Tòa án gửi ở đâu?', a: 'Mở Hộp thư để xem văn bản Tòa án đã tống đạt cho bạn.', d: '18/10/2026' }] },
  { id: 'ks', ten: 'Ký số', ds: [{ id: 4, q: 'Khai báo phương thức ký số ở đâu?', a: 'Mở Cá nhân, chọn Quản lý chữ ký số, sau đó chọn Khai báo chứng thư số.', d: '15/10/2026' }] },
  { id: 'gd', ten: 'Giao dịch điện tử', ds: [{ id: 5, q: 'Đổi phương thức giao dịch điện tử của một hồ sơ như thế nào?', a: PT_SUB + ' Mở Cá nhân, chọn Phương thức giao dịch điện tử.', d: '12/10/2026' }] }];
var FAQ_GOPY = [
  { ma: '[Mã góp ý 1]', q: 'Xem văn bản Tòa án gửi ở đâu?', nd: 'Câu trả lời nên nói rõ cách xem văn bản đã lưu trữ.', d: '01/11/2026' },
  { ma: '[Mã góp ý 2]', q: null, nd: 'Cần thêm hướng dẫn khi quên mật khẩu.', d: '25/10/2026' }];
function faqCat(s) { return s.length <= 180 ? s : s.slice(0, 180).replace(/\s+\S*$/, '') + '…'; }
/* phản hồi mức độ hữu ích: hoi · nhap · login · huuIch · gopY */
function FaqFb(p) {
  var st = React.useState(p.st || 'hoi'), nd = React.useState(''), loi = React.useState(''), s = st[0];
  var can = function (x) { return function () { st[1](p.guest ? 'login' : x); }; };
  if (s === 'gopY') return h('p', { className: 'faq-ok' }, h(T.Icon, { name: 'checkCircle' }), h('span', null, p.st === 'gopY' ? 'Bạn đã gửi góp ý cho câu trả lời này' : h(F, null, 'Đã ghi nhận góp ý (', h('b', { className: 'tp-num' }, '[mã góp ý]'), '), cảm ơn bạn'), ' — bộ phận biên tập sẽ xem lại để cải thiện câu trả lời.'));
  if (s === 'huuIch') return h('p', { className: 'faq-ok faq-ok-b' }, h(T.Icon, { name: 'checkCircle' }), 'Cảm ơn phản hồi của bạn!');
  var gui = function () { var t = nd[0].trim(); if (!t) return loi[1]('Vui lòng nhập nội dung góp ý.'); if (t.length < 10) return loi[1]('Vui lòng nhập chi tiết hơn (tối thiểu 10 ký tự).'); loi[1](''); st[1]('gopY'); };
  return h('div', { className: 'faq-fb' },
    h('div', { className: 'faq-fb-q' }, h('span', null, 'Câu trả lời này có hữu ích không?'),
      h('div', { className: 'faq-fb-b' }, Btn('Hữu ích', 'secondary', { size: 'sm', icon: 'check', onClick: can('huuIch') }), Btn('Cần cải thiện', s === 'nhap' ? 'tint' : 'secondary', { size: 'sm', icon: 'pen', 'aria-expanded': s === 'nhap', onClick: can('nhap') }))),
    s === 'login' ? h('div', { className: 'faq-login' }, h('p', null, 'Vui lòng đăng nhập để đánh giá hoặc góp ý về câu hỏi thường gặp.'),
      h('div', { className: 'faq-login-a' }, Btn('Đăng nhập', 'primary', { size: 'sm', 'data-pt-go': 'backTo:login' }), h('button', { type: 'button', className: 'faq-x', 'aria-label': 'Đóng lời nhắc đăng nhập', onClick: function () { st[1]('hoi'); } }, h(T.Icon, { name: 'x' })))) : null,
    s === 'nhap' ? h('div', { className: 'faq-gy' },
      Tf('Nội dung góp ý', { multiline: true, maxLength: 1000, value: nd[0], onChange: function (e) { nd[1](e.target.value); if (loi[0]) loi[1](''); }, placeholder: 'Câu trả lời còn thiếu điều gì? (tối thiểu 10, tối đa 1000 ký tự)', help: nd[0].length + '/1000', error: loi[0] || undefined }),
      h('div', { className: 'ph-2btn' }, Btn('Hủy', 'secondary', { size: 'sm', onClick: function () { st[1]('hoi'); loi[1](''); } }), Btn('Gửi phản hồi', 'primary', { size: 'sm', onClick: gui }))) : null);
}
function Faq() { return h(FaqScr); }
function Answer() { return h(FaqScr, { mo: 1 }); }
/* ===== 6. Đánh giá mức độ hài lòng (web /danh-gia-hai-long: 4 tab) ===== */
var DG_KY = 'Quý IV/2026';
var DG_MUC = ['Rất không hài lòng', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Rất hài lòng'];
var DG_KHOI = { VU_AN: ['Vụ án', 'Đánh giá riêng cho từng cấp xét xử đã xét xử xong.', 'scale'], DON: ['Đơn', 'Đơn khởi kiện, đơn yêu cầu, kháng cáo, đề nghị giám đốc thẩm / tái thẩm, phản tố, yêu cầu độc lập.', 'file'] };
/* tên tiêu chí lấy từ API (/api/danh-gia/tieu-chi) – dưới đây là tên mẫu suy từ tên trường */
var DG_TC_HS = ['Thủ tục đơn giản', 'Thời gian giải quyết', 'Thái độ phục vụ', 'Thao tác trên Cổng'];
var DG_TC_CONG = ['Dễ tìm thông tin, dịch vụ', 'Dễ thao tác', 'Tốc độ xử lý', 'Thông báo kịp thời', 'Hỗ trợ người dùng'];
var DG_CHO = [
  { nhom: 'VU_AN', loai: 'Vụ án · Sơ thẩm', t: 'Tranh chấp hợp đồng vay tài sản', ma: 'DS-2026-0012', kq: '22/10/2026', han: '21/11/2026' },
  { nhom: 'VU_AN', loai: 'Vụ án · Phúc thẩm', t: 'Tranh chấp hợp đồng mua bán tài sản', ma: 'DS-2026-0018', kq: '15/10/2026', han: '14/11/2026' },
  { nhom: 'DON', loai: 'Đơn khởi kiện', t: 'Tranh chấp hợp đồng vay tài sản', ma: 'TN-20261020-0012', kq: '20/10/2026', han: '19/11/2026' }];
var DG_GUI = [
  { nhom: 'VU_AN', loai: 'Vụ án · Sơ thẩm', t: 'Ly hôn, tranh chấp nuôi con', ma: 'HN-2026-0007', sao: 5, d: '02/10/2026', an: true, gy: 'Cán bộ hướng dẫn rõ ràng, lịch phiên tòa được thông báo sớm.', tc: [5, 5, 4, 5] },
  { nhom: 'DON', loai: 'Đơn yêu cầu', t: 'Yêu cầu công nhận thỏa thuận dân sự', ma: 'VDS-2026-0003', sao: 4, d: '28/09/2026', tc: [4, 4, 4, 3] }];
function SaoDoc(p) { var a = []; for (var i = 1; i <= 5; i++) a.push(h(T.Icon, { key: i, name: 'star', className: i <= Math.round(p.v) ? 'dg-s-on' : '' })); return h('span', { className: 'dg-sao' + (p.sm ? ' dg-sao-sm' : ''), role: 'img', 'aria-label': String(p.v).replace('.', ',') + ' trên 5 sao' }, a); }
/* form chấm sao (dùng cho hồ sơ và Cổng) */
function DgForm(p) {
  var c = React.useState(p.chung || 0), tc = React.useState(p.tc || p.tieuChi.map(function () { return 0; })), gy = React.useState(p.gy || ''), an = React.useState(!!p.an), loi = React.useState(false);
  var api = { ok: function () { if (!c[0]) { loi[1](true); return false; } return true; } };
  if (p.reg) p.reg(api);
  return h(F, null,
    h('div', { className: 'dg-chung' + (loi[0] ? ' dg-chung-loi' : '') }, h(T.RatingStars, { label: p.nhanChung, required: true, value: c[0], onChange: function (v) { c[1](v); loi[1](false); } }),
      c[0] ? h('span', { className: 'dg-muc' }, DG_MUC[c[0] - 1]) : null, loi[0] ? h('p', { className: 'dg-loi', role: 'alert' }, 'Vui lòng chọn mức độ hài lòng chung trước khi gửi') : null),
    FCard(p.nhanTc || 'Đánh giá theo tiêu chí', h('ul', { className: 'dg-crit' }, p.tieuChi.map(function (t, i) {
      return h('li', { key: t }, h(T.RatingStars, { label: t, value: tc[0][i], onChange: function (v) { var n = tc[0].slice(); n[i] = v; tc[1](n); } }));
    })), true),
    h('div', { className: 'dg-fld' }, Tf(p.nhanGy, { multiline: true, maxLength: 500, value: gy[0], onChange: function (e) { gy[1](e.target.value); }, placeholder: p.phGy, help: '(không bắt buộc) · ' + gy[0].length + '/500' }), p.ghiChu || null),
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { checked: an[0], onChange: function (e) { an[1](e.target.checked); }, label: 'Gửi đánh giá ẩn danh — không hiển thị họ tên của tôi trong báo cáo chất lượng phục vụ.' })));
}
/* đánh giá 1 hồ sơ (hộp thoại web → màn riêng trên app) */
function ptSnack(m) { if (window.__ptSnack) window.__ptSnack(m); }
function Rating(p) {
  p = p || {}; /* v338: p.loi – gửi lỗi theo web (DG-409/DG-404): báo lỗi, về danh sách */
  var api = React.useRef(null), xong = React.useState(false);
  if (xong[0]) return h(RatingOk);
  return SubS('Đánh giá dịch vụ · DS-2026-0012', h(F, null, h('p', { className: 'nv-sub' }, 'Vụ án · Sơ thẩm · ' + COURT1),
    h(DgForm, { reg: function (a) { api.current = a; }, chung: p.loi ? 4 : 0, nhanChung: 'Mức độ hài lòng chung của bạn', tieuChi: DG_TC_HS, nhanGy: 'Nhận xét, góp ý', phGy: 'Chia sẻ thêm trải nghiệm của bạn…' })),
    Bar(Btn('Để sau', 'secondary', { 'data-pt-go': 'back' }), Btn('Gửi đánh giá', 'primary', p.loi ? { 'data-pt-go': 'backTo:ratings', 'data-pt-snack': p.loi } : { onClick: function () { if (api.current.ok()) xong[1](true); } })));
}
function RatingOk() {
  return h(OkScr, { title: 'Cảm ơn đánh giá của bạn', text: 'Ý kiến đánh giá được dùng để chấm điểm chất lượng phục vụ của Tòa án.', btns: Btn('Đóng', 'primary', { 'data-pt-go': 'backTo:ratings' }) });
}
function DgPhieuCong(p) {
  return h('section', { className: 'dg-phieu' }, h('div', { className: 'dg-phieu-h' }, h(T.Icon, { name: 'checkCircle' }), h('div', null, h('h2', null, 'Đã đánh giá ' + DG_KY), h('p', null, 'Gửi ngày 01/11/2026' + (p.sua ? ' · Sửa ngày 03/11/2026' : '')))),
    h('div', { className: 'dg-tags' }, h(SaoDoc, { v: 4 }), h('span', { className: 'dg-muc' }, DG_MUC[3])),
    h('ul', { className: 'dg-tc dg-tc-col' }, [5, 4, 4, 3, 4].map(function (s, i) { return h('li', { key: i }, DG_TC_CONG[i], h(SaoDoc, { v: s, sm: true })); })),
    h('p', { className: 'dg-gy' }, 'Nên có thông báo khi Tòa án cập nhật lịch phiên tòa.'),
    Btn('Sửa đánh giá kỳ này', 'secondary', { block: true, icon: 'pen', onClick: p.onSua }));
}
function DgCong(p) {
  var st = React.useState(p.st || 'form'), api = React.useRef(null), sua = st[0] === 'sua';
  var kyTruoc = h('aside', { className: 'dg-kytruoc' }, h('p', { className: 'dg-kytruoc-h' }, h(T.Icon, { name: 'grid' }), 'Kết quả các kỳ'),
    h('p', null, 'Cổng dịch vụ · Quý III/2026: ', h('b', null, '4,3/5'), ' · 12.480 lượt · Tỷ lệ hài lòng 86,2%.'),
    h('p', null, 'Kết quả kỳ này được công bố sau khi kết thúc kỳ, tại tab ', h('button', { type: 'button', className: 'vk-link dg-inl', onClick: p.onCongKhai }, 'Kết quả công khai'), '.'));
  if (st[0] === 'da') return h(F, null, h(DgPhieuCong, { sua: p.sua, onSua: function () { st[1]('sua'); } }), kyTruoc);
  return h(F, null, h('section', { className: 'dg-cong' }, h('h2', null, 'Bạn đánh giá thế nào về Cổng dịch vụ tư pháp?'),
    h('p', null, 'Đánh giá chung về trải nghiệm sử dụng Cổng trong ' + DG_KY + ', không gắn với một hồ sơ cụ thể. Mỗi kỳ bạn đánh giá một lần và được sửa trong kỳ.'),
    h(DgForm, { reg: function (a) { api.current = a; }, nhanChung: 'Mức độ hài lòng chung về Cổng', nhanTc: 'Tiêu chí về Cổng', tieuChi: DG_TC_CONG, chung: sua ? 4 : 0, tc: sua ? [5, 4, 4, 3, 4] : null, gy: sua ? 'Nên có thông báo khi Tòa án cập nhật lịch phiên tòa.' : '',
      nhanGy: 'Góp ý để Cổng tốt hơn', phGy: 'Điều bạn muốn Cổng cải thiện…',
      ghiChu: h('p', { className: 'dg-note' }, h(T.Icon, { name: 'info' }), h('span', null, 'Góp ý không được xử lý như phản ánh, kiến nghị. Muốn phản ánh, kiến nghị, bạn gửi đơn tại mục ', h('button', { type: 'button', className: 'vk-link dg-inl', 'data-pt-go': 'complaints' }, 'Khiếu nại — Tố cáo'), '.')) }),
    h('div', { className: 'ph-2btn dg-cong-a' }, sua ? Btn('Hủy', 'secondary', { onClick: function () { st[1]('da'); } }) : null,
      Btn(sua ? 'Lưu thay đổi' : 'Gửi đánh giá', 'primary', { onClick: function () { if (api.current.ok()) { ptSnack(p.loi === 'daCo' && !sua ? DG_LOI.daCo : p.loi === 'dong' && sua ? DG_LOI.dong : (sua ? 'Đã cập nhật' : 'Đã ghi nhận') + ' đánh giá Cổng dịch vụ ' + DG_KY); st[1]('da'); /* v338: lỗi theo web */ } } }))), kyTruoc);
}
var DG_TOA = [['Tòa án nhân dân khu vực 1 - Hà Nội', 3210, 4.4, 88.1], ['Tòa án nhân dân khu vực 2 - Hà Nội', 2875, 4.1, 81.6], ['Tòa án nhân dân Thành phố Hà Nội', 1940, 3.9, 76.3]];
var DG_LOAIHS = [['Đơn khởi kiện', 4120, 4.2, 84.7], ['Vụ án · Sơ thẩm', 3305, 4.1, 82.0], ['Vụ án · Phúc thẩm', 1250, 3.8, 74.5]];
function dgSo(x, le) { return x.toLocaleString('vi-VN', { minimumFractionDigits: le, maximumFractionDigits: le }); }
function dgMau(t) { return t >= 90 ? 'dg-bar-ok' : t >= 80 ? 'dg-bar-info' : 'dg-bar-warn'; }
function DgBang(tieuDe, dong) {
  return h('section', { className: 'dg-bang' }, h('h3', null, tieuDe), dong.length ? h('ul', null, dong.map(function (d) {
    return h('li', { key: d[0] }, h('b', null, d[0]), h('p', null, dgSo(d[1], 0) + ' lượt · Điểm TB ', h('b', null, dgSo(d[2], 1))),
      h('div', { className: 'dg-bar-r' }, h('span', { className: 'dg-bar' }, h('i', { className: dgMau(d[3]), style: { width: d[3] + '%' } })), h('span', { className: 'tp-num' }, dgSo(d[3], 1) + '%')));
  })) : h('p', { className: 'dg-khoi-e' }, 'Chưa có đánh giá.'));
}
function DgCongKhai(p) {
  if (p.none) return h(T.EmptyState, { variant: 'center', icon: 'grid', title: 'Chưa có kết quả đánh giá được công bố', text: 'Kết quả mỗi kỳ (quý) được công bố sau khi kỳ đó kết thúc.', className: 'nv-err' });
  var the = [['Lượt đánh giá', '12.480', '+8% so với kỳ trước'], ['Điểm trung bình', '4,3/5', 'Mức hài lòng chung'], ['Tỷ lệ hài lòng', '86,2%', 'Đánh giá từ 4 sao trở lên'], ['Tỷ lệ hồ sơ có đánh giá', '41,5%', '']];
  return h(F, null, h('div', { className: 'dg-ck-h' }, h('h2', null, 'Kết quả đánh giá của người dân, doanh nghiệp'), h('p', null, 'Quý III/2026 (01/07/2026 – 30/09/2026) · Cập nhật 05/10/2026')),
    h(SelSheet, { label: 'Kỳ công bố', v: 'q3', opts: [{ id: 'q3', name: 'Quý III/2026' }, { id: 'q2', name: 'Quý II/2026' }, { id: 'q1', name: 'Quý I/2026' }] }),
    h('div', { className: 'dg-the' }, the.map(function (t) { return h('div', { key: t[0] }, h('p', null, t[0]), h('b', null, t[1]), t[2] ? h('small', null, t[2]) : null); })),
    h('section', { className: 'dg-bang' }, h('h3', null, 'Đánh giá chung về Cổng dịch vụ'), p.low ? null : h('p', { className: 'dg-bang-s' }, '5.130 lượt · điểm TB ', h('b', null, '4,2'), ' · hài lòng ', h('b', null, '84,0%')),
      p.low ? null : h('ul', null, DG_TC_CONG.map(function (t, i) { var d = [4.4, 4.2, 3.9, 4.0, 4.3][i]; return h('li', { key: t }, h('div', { className: 'dg-bar-l' }, h('span', null, t), h('b', { className: 'tp-num' }, dgSo(d, 1))), h('span', { className: 'dg-bar' }, h('i', { className: d >= 4.2 ? 'dg-bar-ok' : d >= 4 ? 'dg-bar-info' : 'dg-bar-warn', style: { width: d / 5 * 100 + '%' } }))); }))),
    DgBang('Theo Tòa án', DG_TOA), DgBang('Theo loại hồ sơ', DG_LOAIHS));
}
function Ratings() { return h(DgScr); }
/* ===== 7. Hòa giải, đối thoại (web /hoa-giai-doi-thoai: danh sách, chi tiết, trả lời lựa chọn, đề nghị) ===== */
/* trạng thái / tình trạng lấy từ danh mục (DM_TRANGTHAI, DM_TINHTRANG) – tên dưới đây là mẫu */
/* v207: đủ hành động theo bảng map (dòng 106–119) – tình trạng theo tên RS; trạng thái ST-03 Đang xử lý / ST-04 Đã xử lý */
var HG_DX = ['Đang xử lý', 'info'], HG_XL = ['Đã xử lý', 'success'];
var HG = [
  { ma: 'HG-2026-0018', lv: 'HG', t: 'Tranh chấp quyền sử dụng đất', tom: 'Hoàng Dương, Nguyễn Thị Lan vs Lê Văn Hòa', tt: HG_DX, tinh: ['Chờ lựa chọn hòa giải / đối thoại (lần 1)', 'warning'], han: [['Trả lời lựa chọn hòa giải', 'Còn 3 ngày', 'sap']], hd: ['A011'], go: 'mediationDetail' },
  { ma: 'DT-2026-0006', lv: 'DT', t: 'Khiếu kiện quyết định thu hồi đất', tom: 'Hoàng Dương vs Ủy ban nhân dân quận Đống Đa', tt: HG_DX, tinh: ['Chờ lựa chọn hòa giải / đối thoại (lần 1)', 'warning'], han: [['Trả lời lựa chọn đối thoại', 'Còn 4 ngày', 'sap']], hd: ['A013'], go: 'mediationDetailDt' },
  { ma: 'HG-2026-0021', lv: 'HG', t: 'Tranh chấp hợp đồng vay tài sản', tom: 'Hoàng Dương vs Trần Văn Bình', tt: HG_DX, tinh: ['Chờ lựa chọn hòa giải / đối thoại (lần 2)', 'warning'], han: [['Trả lời lựa chọn hòa giải', 'Còn 5 ngày', 'an']], hd: ['A011'], go: 'mediationDetail' },
  { ma: 'DT-2026-0008', lv: 'DT', t: 'Khiếu kiện quyết định xử phạt vi phạm hành chính', tom: 'Hoàng Dương vs Chi cục Thuế khu vực I', tt: HG_DX, tinh: ['Chờ lựa chọn hòa giải / đối thoại (lần 2)', 'warning'], han: [['Trả lời lựa chọn đối thoại', 'Còn 5 ngày', 'an']], hd: ['A013'], go: 'mediationDetailDt' },
  { ma: 'HG-2026-0015', lv: 'HG', t: 'Tranh chấp hợp đồng mua bán nhà ở', tom: 'Hoàng Dương vs Công ty An Phú', tt: HG_DX, tinh: ['Đã chỉ định Hòa giải viên', 'info'], hd: ['A012'], go: 'mediationDetail' },
  { ma: 'DT-2026-0005', lv: 'DT', t: 'Khiếu kiện quyết định cưỡng chế tháo dỡ công trình', tom: 'Hoàng Dương vs Ủy ban nhân dân phường Láng', tt: HG_DX, tinh: ['Đã chỉ định Hòa giải viên', 'info'], hd: ['A023'], go: 'mediationDetailDt' },
  { ma: 'HG-2026-0012', lv: 'HG', t: 'Tranh chấp ranh giới đất liền kề', tom: 'Hoàng Dương vs Nguyễn Văn Hải', tt: HG_DX, tinh: ['Đang hòa giải / đối thoại tiền tố tụng', 'info'], han: [['Đề nghị hoãn phiên hòa giải', 'Còn 6 ngày', 'an']], hd: ['A011', 'LICH', 'A128'], go: 'mediationDetail' },
  { ma: 'DT-2026-0004', lv: 'DT', t: 'Khiếu kiện quyết định hành chính về đất đai', tom: 'Hoàng Dương vs Ủy ban nhân dân Phường Láng', tt: HG_DX, tinh: ['Đang hòa giải / đối thoại tiền tố tụng', 'info'], han: [['Đề nghị hoãn phiên đối thoại', 'Còn 6 ngày', 'an']], hd: ['A013', 'LICH', 'A128'], go: 'mediationDetailDt' },
  { ma: 'HG-2026-0010', lv: 'HG', t: 'Tranh chấp hợp đồng thuê xe', tom: 'Hoàng Dương vs Đỗ Văn Nam', tt: HG_DX, tinh: ['Chờ phiên họp ghi nhận kết quả hòa giải', 'info'], hd: ['LICH'], go: 'mediationDetail' },
  { ma: 'DT-2026-0002', lv: 'DT', t: 'Khiếu kiện hành vi chậm cấp giấy chứng nhận', tom: 'Hoàng Dương vs Văn phòng đăng ký đất đai Hà Nội', tt: HG_DX, tinh: ['Đã ghi nhận kết quả hòa giải / đối thoại', 'info'], hd: ['A035'], go: 'mediationDone' },
  { ma: 'HG-2026-0009', lv: 'HG', t: 'Tranh chấp hợp đồng dân sự', tom: 'Hoàng Dương vs Phạm Minh Đức', tt: HG_XL, tinh: ['Công nhận kết quả hòa giải tiền tố tụng — kết thúc', 'success'], han: [['Đề nghị xem xét lại', 'Còn 12 ngày', 'an']], hd: ['A027'], go: 'mediationDone' },
  { ma: 'HG-2026-0003', lv: 'HG', t: 'Tranh chấp hợp đồng thuê nhà', tom: 'Hoàng Dương vs Đỗ Văn Nam', tt: HG_XL, tinh: ['Chuyển thụ lý vụ án', 'info'], go: 'mediationDone' }];
var HG_SAP = [['MACDINH', 'Mặc định'], ['HAN_GANNHAT', 'Hạn xử lý gần nhất'], ['MOI_NHAT', 'Mới nhất'], ['MA_ASC', 'Mã hồ sơ']];
/* v251 (04/11/2026): Hòa giải, đối thoại – danh sách kiểu Danh sách đơn: thẻ (nhãn trạng thái + tình trạng + sao, tên, nhãn – giá trị, Việc cần làm kèm hạn), ô tìm, Sắp xếp + nút Bộ lọc tình trạng */
function hgHanHd(d) { var r = {}; (d.hd || []).forEach(function (c) { var a = HD[c] && HD[c][0], x = (d.han || []).filter(function (y) { return y[0] === a; })[0] || (d.hd.length === 1 && d.han ? d.han[0] : null); if (x) r[c] = [x[1], x[2]]; }); return r; }
function HgCard(p) {
  var d = p.d, viec = qdViec({ hd: d.hd, hanHd: hgHanHd(d) });
  return h('li', { className: 'qd-c qc' },
    h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem chi tiết hồ sơ hòa giải, đối thoại ' + d.ma, 'data-pt-go': d.go }),
    h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: d.tt[1], icon: false }, d.tt[0]), h('span', { className: 'qd-tinh qc-tinh qd-tinh-' + d.tinh[1], title: d.tinh[0] }, h('span', { className: 'qc-tinh-tx' }, d.tinh[0]))), /* v348 (HG-M01): bỏ nút đánh dấu quan trọng (web không có) */
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, d.t)),
    h('dl', { className: 'qc-ben' }, [['Mã hồ sơ', h('span', { className: 'tp-num' }, d.ma)], ['Loại', d.lv === 'DT' ? 'Đối thoại' : 'Hòa giải'], ['Các bên', d.tom], ['Tòa án', COURT1]].map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0]), h('dd', null, r[1])); })),
    viec.length ? h('div', { className: 'qd-c-f qc-vk vkx-box' }, h('p', { className: 'qc-vk-h vkx-h' }, 'Việc cần làm'), h('ul', { className: 'qc-vk-l' }, viec.map(function (x) {
      var m = x.hn ? x.hn[1] : 'an';
      return h('li', { key: x.t, className: 'vk-card vka vkx vkx-' + (x.hn ? m : 'none') }, h('button', { type: 'button', className: 'vka-b', 'data-pt-go': x.go }, h('span', { className: 'vka-tx' }, h('b', null, x.t), h('small', null, x.hn ? h(F, null, 'Hạn xử lý · ', h('span', { className: 'vka-han vka-han-' + m }, x.hn[0])) : 'Không có thời hạn'))));
    }))) : null);
}
function HgList(p) {
  if (p.loi) return Sub('Hòa giải đối thoại', h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tải được danh sách hồ sơ.', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: noop, className: 'nv-err' })); /* v348 (HG-W01) */
  var all = p.rong ? [] : HG, q = React.useState(''), tt = React.useState('all'), sx = React.useState('MACDINH'), rr = React.useState(0);
  var tinh = []; all.forEach(function (d) { if (tinh.indexOf(d.tinh[0]) < 0) tinh.push(d.tinh[0]); });
  var items = [{ key: 'all', label: 'Tất cả', count: all.length }].concat(tinh.map(function (x) { return { key: x, label: x, count: all.filter(function (d) { return d.tinh[0] === x; }).length }; }));
  var k = khongDau(q[0].trim()), ds = all.filter(function (d) { return (tt[0] === 'all' || d.tinh[0] === tt[0]) && (!k || khongDau(d.ma + ' ' + COURT1).indexOf(k) >= 0); });
  if (sx[0] === 'MA_ASC') ds = ds.slice().sort(function (a, b) { return a.ma < b.ma ? -1 : 1; });
  var coLoc = tt[0] !== 'all' || !!k;
  return Sub('Hòa giải đối thoại', h(F, null,
    /* v264: bỏ dòng mô tả dưới tiêu đề */
    all.length ? h('div', { className: 'nv-stick qd-stick' }, h('div', { className: 'ph-ibar' },
      h('div', { className: 'fx-search' }, Tf('Tìm hồ sơ', { icon: 'search', placeholder: 'Tìm mã tiếp nhận, tòa án', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } }))),
      h(StRow, { boLoc: true, nhom: 'Tình trạng', label: 'Lọc theo tình trạng', value: tt[0], onChange: tt[1], items: items, sorts: HG_SAP.map(function (x) { return x[1]; }), sort: HG_SAP.filter(function (x) { return x[0] === sx[0]; })[0][1], onSort: function (n) { sx[1](HG_SAP.filter(function (x) { return x[1] === n; })[0][0]); } })) : null,
    ds.length ? h('ul', { className: 'qd-list' }, ds.map(function (d) { return h(HgCard, { key: d.ma, d: d, onDoi: function () { rr[1](rr[0] + 1); } }); }))
      : h(IbEmpty, { icon: 'message', title: coLoc ? 'Không có hồ sơ phù hợp' : 'Bạn chưa có hồ sơ nào', text: coLoc ? 'Không tìm thấy hồ sơ nào với bộ lọc hiện tại. Thử đổi bộ lọc hoặc xóa từ khóa tìm kiếm.' : 'Hồ sơ sẽ xuất hiện tại đây khi vụ việc của bạn đang được hòa giải hoặc đối thoại trước khi Tòa án thụ lý.', action: coLoc ? 'Xóa bộ lọc' : null, onAction: function () { q[1](''); tt[1]('all'); } })));
}
function Mediation() { return h(HgList); }
function MediationEmpty() { return h(HgList, { rong: true }); }

/* v348 (HG-W15): nhãn theo loại hồ sơ – Hòa giải / Đối thoại (web: ten / Ten theo loai) */
function hgTen(p) { var dt = p && p.dt; return { ten: dt ? 'đối thoại' : 'hòa giải', Ten: dt ? 'Đối thoại' : 'Hòa giải', Tv: dt ? 'Đối thoại viên' : 'Hòa giải viên', tv: dt ? 'đối thoại viên' : 'hòa giải viên', dt: !!dt }; }
/* v348 (HG-W12): tài liệu đính kèm – danh sách Tài liệu i (Xem · Thay tệp · Xóa), giới hạn 20 tệp · 20MB · PDF/JPG/PNG; ký số tài liệu đính kèm (chỉ PDF) */
var HG_TEP_MAU = [['lenh-cong-tac.pdf', '0,8 MB'], ['ve-may-bay.jpg', '0,3 MB']];
function HgTepDs(p) {
  var ds = React.useState(p.mau ? HG_TEP_MAU.slice() : []), kt = React.useState(false), sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor);
  var pdf = ds[0].filter(function (f) { return /\.pdf$/i.test(f[0]); }), anh = ds[0].length - pdf.length, ok = !pdf.length || kt[0];
  React.useEffect(function () { if (p.onOk) p.onOk(ok); }, [ok]);
  return FCard(p.t, h(F, null, h('span', { ref: anchor, hidden: true }),
    ds[0].length ? h('ul', { className: 'ph-ky hgf' }, ds[0].map(function (f, i) {
      return h('li', { key: f[0] }, h('div', null, h('small', null, 'Tài liệu ' + (i + 1)), h('b', null, f[0]), h('small', null, f[1])),
        h('div', { className: 'hgf-a' }, IcoBtn('eye', 'Xem ' + f[0], 'snack:Đang mở ' + f[0]),
          h(T.Button, { size: 'sm', variant: 'ghost', className: 'pt-chk', onClick: function () { kt[1](false); ptSnack('Đã thay tệp đính kèm.'); } }, 'Thay tệp'),
          h('button', { type: 'button', className: 'tp-icon-btn pt-chk', title: 'Xoá tài liệu', 'aria-label': 'Xoá tài liệu ' + (i + 1), onClick: function () { kt[1](false); ds[1](ds[0].filter(function (x) { return x !== f; })); } }, h(T.Icon, { name: 'trash' }))));
    })) : null,
    h(T.Button, { size: 'sm', variant: 'secondary', icon: 'upload', className: 'pt-chk', onClick: function () { kt[1](false); ds[1](HG_TEP_MAU.slice()); ptSnack('Đã tải lên ' + HG_TEP_MAU.length + ' tệp đính kèm.'); } }, ds[0].length ? 'Tải lên thêm tài liệu' : 'Tải lên tài liệu chứng minh'),
    h('p', { className: 'ph-muted dt-small' }, 'Định dạng PDF, PNG, JPG · tối đa 20MB/tệp · có thể chọn nhiều tệp.'),
    pdf.length ? h('div', { className: 'hgf-ky' }, h('b', null, 'Ký số tài liệu đính kèm'), h('small', null, 'Ký số tài liệu chứng minh trước khi gửi Tòa án.'),
      h('ul', { className: 'ph-ky' }, h('li', null, h('div', null, h('b', null, pdf.map(function (f) { return f[0]; }).join(', ')), kt[0] ? h('small', { className: 'ph-ky-da' }, KY_LUC) : null),
        kt[0] ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn pt-chk', onClick: function () { sh[1](true); } }, 'Ký số'))),
      anh ? h('p', { className: 'ph-muted dt-small' }, 'Tệp (đính kèm) không phải PDF nên không ký số được — tệp vẫn được gửi kèm đề nghị.') : null) : null,
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: pdf.map(function (f) { return f[0]; }), onClose: function () { sh[1](false); }, onKy: function () { sh[1](false); kt[1](true); ptSnack('Ký số thành công.'); } }), host) : null), true);
}
/* chi tiết hồ sơ: Tiến trình (việc cần làm + liên kết + mốc) · Thông báo/Tống đạt */
var HG_VB = [
  ['Thông báo về việc lựa chọn hòa giải viên', 'Số 18/2026/TB-HG · ' + COURT1 + ' · Tống đạt 30/10/2026', 'tra-loi'],
  ['Thông báo nhận đơn khởi kiện và quyền lựa chọn hòa giải, đối thoại', 'Số 12/2026/TB-TA · ' + COURT1 + ' · Tống đạt 20/10/2026']];
function HgMoc(list, cho) {
  return h('ul', { className: 'ph-ky dt-docs hg-moc' }, list.map(function (d) {
    var on = cho && d[2] === 'tra-loi';
    return h('li', { key: d[0], className: on ? 'hg-moc-on' : undefined }, h('div', null, on ? h('span', { className: 'hg-cho' }, 'Đang chờ bạn trả lời') : null, h('b', null, d[0]), h('small', null, d[1])),
      IcoBtn('eye', 'Xem ' + d[0], d[3] || 'mediationDoc'));
  }));
}
function HgSort() { var s = React.useState(true); return h('button', { type: 'button', className: 'vk-link hg-sort', 'aria-label': 'Đổi thứ tự hiển thị', onClick: function () { s[1](!s[0]); } }, h(T.Icon, { name: 'sortDesc' }), s[0] ? 'Mới nhất trước' : 'Cũ nhất trước'); }
/* v251 (04/11/2026): chi tiết hồ sơ hòa giải theo UI chi tiết đơn khởi kiện – tên 16px, khối nhắc gọn trước tab (các đề nghị khác chuyển xuống nhóm nút ở tab Tiến trình),
   tab không số, Tiến trình dạng dòng thời gian nhóm theo ngày, văn bản kiểu Hộp thư */
function HgViec(o) {
  return h('div', { className: 'hgv-w' }, h(DtViec, o), o.sub ? h('p', { className: 'hgv-sub' }, o.sub) : null);
}
/* v348: chi tiết hồ sơ hòa giải, đối thoại theo khung Chi tiết đơn (PA B người dùng chọn): khối việc gọn (tên việc · hạn · nút chính · nút mở hành động khác),
   dòng Đối tượng xử lý · Theo văn bản; 2 tab như web: Tiến trình | Thông báo/Tống đạt */
function HgDetail(p) {
  var xong = p.xong, hg = hgTen(p), phien = p.phien;
  if (p.loi === 'ma') return Sub('Chi tiết hồ sơ', h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không xác định được hồ sơ cần xem. Vui lòng chọn lại từ danh sách.', actionLabel: 'Về danh sách', onAction: noop, className: 'nv-err' }));
  if (p.loi === 'tai') return Sub('Chi tiết hồ sơ', h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tải được chi tiết hồ sơ.', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: noop, className: 'nv-err' }));
  if (p.loi === 'kt') return Sub('Chi tiết hồ sơ', h(T.EmptyState, { variant: 'center', icon: 'file', title: 'Không tìm thấy hồ sơ này.' }));
  var ma = xong ? 'HG-2026-0009' : hg.dt ? 'DT-2026-0006' : phien ? 'HG-2026-0012' : 'HG-2026-0018', S = hg.dt ? 'Dt' : '';
  var moc = p.ttRong ? [] : xong ? [['Quyết định công nhận kết quả hòa giải thành', '25/10/2026', '05/2026/QĐST-HG · ' + COURT1 + ' · Tống đạt 25/10/2026', null, null, 'mediationDoc'], ['Biên bản hòa giải thành', '20/10/2026', COURT1 + ' · Tống đạt 20/10/2026', null, null, 'mediationDoc'], ['Đã trả lời — Đồng ý hòa giải', '12/10/2026', 'Người khởi kiện: Hoàng Dương - 12/10/2026', null, null, 'hgReplyView']]
    : phien ? [['Đề nghị hoãn phiên ' + hg.ten, '01/11/2026', 'Người khởi kiện: Hoàng Dương - 01/11/2026', null, null, 'hgDelayView'], ['Giấy triệu tập tham gia phiên ' + hg.ten, '28/10/2026', '20/2026/GTT-HG · ' + COURT1 + ' · Tống đạt 28/10/2026', null, null, 'mediationDoc'], ['Đã trả lời — Đồng ý ' + hg.ten, '22/10/2026', 'Người khởi kiện: Hoàng Dương - 22/10/2026', null, null, 'hgReplyView']]
    : [['Thông báo về việc lựa chọn ' + hg.tv, '30/10/2026', '18/2026/TB-HG · ' + COURT1 + ' · Tống đạt 30/10/2026', p.het ? null : 'Đang chờ bạn trả lời', 'cam', 'mediationDoc'], ['Thông báo nhận đơn khởi kiện và quyền lựa chọn hòa giải, đối thoại', '20/10/2026', '12/2026/TB-TA · ' + COURT1 + ' · Tống đạt 20/10/2026', null, null, 'mediationDoc']];
  var lk = xong ? [['calendar', 'Xem lịch của bạn', 'calPersonal'], ['download', 'Xem / tải biên bản hòa giải', 'snack:Đang tải biên bản hòa giải'], ['scale', 'Xem vụ án liên quan (DS-2026-0031)', 'caseDetail']] : [['calendar', 'Xem lịch của bạn', 'calPersonal']];
  /* việc cần làm: khối gọn như Chi tiết đơn – tên việc, hạn, nút chính; nút mũi tên mở các hành động khác */
  var viec = xong ? { t: 'Đề nghị xem xét lại quyết định công nhận', han: 'Hạn 06/11/2026', con: 'còn 12 ngày', btn: { l: 'Đề nghị xem xét lại', go: 'hgReview' }, sub: 'Theo văn bản: Quyết định công nhận kết quả hòa giải thành · số 05/2026/QĐST-HG · 25/10/2026' }
    : phien ? { t: 'Đề nghị hoãn phiên ' + hg.ten, han: 'Hạn 05/11/2026', con: 'còn 2 ngày', btn: { l: 'Đề nghị hoãn phiên', go: 'hgDelay' + S }, more: [{ l: 'Đề nghị thay đổi ' + hg.tv, go: 'hgChange' + S }, { l: 'Vào phòng họp trực tuyến', go: p.khongLink ? 'snack:Lịch phiên chưa có đường dẫn phòng họp trực tuyến.' : 'snack:Đang mở phòng họp trực tuyến' }, { l: 'Rút đơn khởi kiện', go: 'rd1' }], sub: 'Theo văn bản: Giấy triệu tập tham gia phiên ' + hg.ten + ' · số 20/2026/GTT-HG · 28/10/2026' }
    : { t: 'Trả lời lựa chọn ' + hg.ten, han: p.het ? 'Hạn 30/10/2026' : 'Hạn 06/11/2026', con: p.het ? 'đã quá hạn 4 ngày' : 'còn 3 ngày', tone: p.het ? 'danger' : 'warning', btn: { l: 'Trả lời', go: 'hgReply' + S, dis: !!p.het }, more: [{ l: 'Rút đơn khởi kiện', go: 'rd1' }],
        sub: (p.het ? 'Đã hết thời hạn thực hiện (hạn 30/10/2026). ' : '') + 'Đối tượng xử lý: Hoàng Dương (Người khởi kiện) · Theo văn bản: Thông báo về việc lựa chọn ' + hg.tv + ' · số 18/2026/TB-HG · 30/10/2026' };
  var vb = p.tbRong || p.tbLoi ? [] : xong ? [{ t: 'Quyết định công nhận kết quả hòa giải thành', so: '05/2026/QĐST-HG', tg: '25/10/2026' }]
    : [{ t: 'Thông báo về việc lựa chọn ' + hg.tv, so: '18/2026/TB-HG', tg: '30/10/2026', moi: true }, { t: 'Thông báo nhận đơn khởi kiện và quyền lựa chọn hòa giải, đối thoại', so: '12/2026/TB-TA', tg: '20/10/2026', soHoa: 'chua' }];
  var chuaDoc = vb.filter(function (v) { return !IB_X[vbReg(v)].doc; }).length;
  var ls = h(F, null, h('div', { className: 'hg-lk' }, lk.map(function (x) { return h(T.Button, { key: x[1], size: 'sm', variant: 'tint', icon: x[0], 'data-pt-go': x[2] }, x[1]); })),
    moc.length ? LsG1(moc) : h(IbEmpty, { icon: 'clock', title: 'Chưa có tiến trình', text: 'Văn bản Tòa án tống đạt và các việc bạn đã gửi trong quá trình ' + hg.ten + ' sẽ hiển thị tại đây.' }));
  var tb = FCard('Văn bản tống đạt', p.tbLoi ? h(T.EmptyState, { icon: 'alert', title: 'Không tải được danh sách văn bản.', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: noop, className: 'nv-err' })
    : vb.length ? h(F, null, h(HgSort), VbCards(vb)) : h(IbEmpty, { icon: 'mail', title: 'Chưa có văn bản tống đạt', text: 'Thông báo, quyết định và giấy triệu tập của Tòa án về hồ sơ này sẽ hiển thị tại đây.' }), true);
  return h(DtScreen, { title: 'Chi tiết hồ sơ', tabLabel: 'Nội dung hồ sơ ' + hg.ten, tab0: p.tab0 === 'tb' ? 'tb' : undefined, tabs: [{ key: 'ls', label: 'Tiến trình' }, { key: 'tb', label: 'Thông báo/Tống đạt', count: chuaDoc || undefined }], headCls: 'dt-head-don',
    meta: h(F, null, h('span', { className: 'tp-num' }, ma), ' · ' + hg.Ten + ' · ' + COURT1),
    name: xong ? 'Tranh chấp hợp đồng dân sự' : hg.dt ? 'Khiếu kiện quyết định thu hồi đất' : phien ? 'Tranh chấp ranh giới đất liền kề' : 'Tranh chấp quyền sử dụng đất',
    badges: xong ? h(F, null, h(T.StatusBadge, { tone: 'success', icon: false }, 'Đã giải quyết'), h('span', { className: 'qd-tinh qd-tinh-success' }, 'Hòa giải thành'))
      : h(F, null, h(T.StatusBadge, { tone: 'info', icon: false }, 'Đã gửi đơn'), h('span', { className: 'qd-tinh qd-tinh-' + (phien ? 'info' : 'warning') }, phien ? 'Đang ' + hg.ten + ' tiền tố tụng' : 'Chờ trả lời lựa chọn ' + hg.ten)),
    pre: h(HgViec, viec),
    render: function (t) { return t === 'tb' ? tb : ls; } });
}
function MediationDetail() { return h(HgDetail); }
function MediationDone() { return h(HgDetail, { xong: true }); }
/* văn bản tống đạt (modal-van-ban-qla) */
function MediationDoc(p) {
  p = p || {};
  return SubS('Văn bản tống đạt', h(F, null, h('p', { className: 'nv-sub' }, 'Trích yếu văn bản: Thông báo về việc lựa chọn hòa giải viên'),
    FCard('1. Thông tin tống đạt tư pháp', RvKV([['Số hiệu văn bản', '18/2026/TB-HG'], ['Mã biểu mẫu', 'Mẫu [mã biểu mẫu]'], ['Cơ quan ban hành', COURT1], ['Người ký & chức danh', '[Họ tên] – Thẩm phán'], ['Ngày ban hành', '30/10/2026'], ['Ngày tống đạt chính thức', '30/10/2026']]), true),
    FCard('2. Tệp văn bản tống đạt chính thức', p.noFile ? P('Văn bản tống đạt — chưa có bản số hóa của văn bản trên hệ thống.', 'ph-muted') /* v348 (HG-W08) */ : DtDocs([['Văn bản tống đạt.pdf', 'PDF']], DOC_THE), true),
    FCard('3. Dữ liệu nghiệp vụ', RvKV([['Thời hạn xử lý', '06/11/2026']]), true),
    FCard('Phòng họp trực tuyến', RvKV([['Đường dẫn', 'https://phonghop.toaan.gov.vn/p/hg20260018'], ['Mã phòng', '4815 2026'], ['Mật khẩu', 'HG0018']]), true))); /* v348 (HG-W08) */
}
/* khối ký số đơn: Tạo đơn để ký số → Ký số */
function HgKy(p) {
  var tao = React.useState(!!p.daTao), sh = React.useState(null), dd = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), tc = laTC(); /* v348 (HG-W11): tổ chức ký đại diện rồi ký tổ chức */
  var xong = function () { var w = sh[0]; sh[1](null); if (w === 'dd') { dd[1](true); ptSnack('Đã ký ô đại diện — tiếp tục ký số tổ chức.'); } else { p.onKy(); ptSnack('Ký số đơn thành công.'); } };
  return FCard('Ký số', h(F, null, h('span', { ref: anchor, hidden: true }),
    h('ul', { className: 'ph-ky' }, h('li', null, h('div', null, h('b', null, p.ten), h('small', null, p.da ? KY_LUC : tao[0] ? 'Xem đơn trước khi ký số' : (p.du ? 'Tạo đơn từ nội dung đã nhập để xem và ký số.' : p.chuaDu))),
      p.da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : tao[0] ? h(F, null, IcoBtn('eye', 'Xem đơn'), tc ? null : h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn', onClick: function () { sh[1]('ca'); } }, 'Ký số'))
        : h(T.Button, { size: 'sm', variant: 'secondary', disabled: !p.du, onClick: function () { tao[1](true); } }, 'Tạo đơn để ký số'))),
    tao[0] && tc && !p.da ? h(KyToChuc, { dd: dd[0], tc: false, onDD: function () { sh[1]('dd'); }, onTC: function () { sh[1]('tc'); } }) : null,
    p.da ? h('p', { className: 'hg-khoa' }, h(T.Icon, { name: 'lock' }), h('span', null, p.khoa || 'Đơn đã ký số nên nội dung đã khóa.', ' ', h('button', { type: 'button', className: 'vk-link pt-chk', onClick: function () { tao[1](false); dd[1](false); if (p.onSua) p.onSua(); } }, p.sua || 'Sửa nội dung và ký lại'))) : null, /* v348 (HG-W10) */
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: [p.ten], onClose: function () { sh[1](null); }, onKy: xong }), host) : null), true, p.da ? 'signed' : 'unsigned');
}
function HgGui(da, msg, khongKy) {
  return Btn('Gửi Tòa án', 'primary', da ? { 'data-pt-snack': msg, 'data-pt-go': 'backTo:mediationDetail' } : { disabled: true, title: khongKy });
}
var HG_HGV = [{ id: 'a', name: 'Nguyễn Văn An', desc: 'Hòa giải viên' }, { id: 'b', name: 'Trần Thị Bích', desc: 'Hòa giải viên' }, { id: 'tp', name: 'Không lựa chọn — Thẩm phán chỉ định' }];
function HgReply(p) {
  var hg = hgTen(p);
  var ro = !!p.view, loai = React.useState(p.loai || (ro ? 'co' : '')), pv = React.useState(ro ? 'cung' : ''), hgv = React.useState(ro ? 'a' : ''), ly = React.useState(''), gc = React.useState(''), ky = React.useState(false);
  var co = loai[0] === 'co', khong = loai[0] === 'khong', du = co ? !!pv[0] && !!hgv[0] : khong;
  var thongNhat = hgv[0] === 'tp' || hgv[0] === 'a';
  return SubS(ro ? 'Chi tiết trả lời lựa chọn ' + hg.ten + '' : 'Trả lời lựa chọn ' + hg.ten + '', h(F, null,
    h('p', { className: 'nv-sub' }, 'Phiếu ý kiến — văn bản điện tử của Cổng' + (ro ? '' : ', ký số trước khi gửi')),
    h(ChonThe, { label: 'Lựa chọn ' + hg.ten + '', v: loai[0], onPick: function (x) { if (!ro && !ky[0]) loai[1](x); }, items: [{ id: 'co', t: 'Đồng ý tham gia ' + hg.ten + '', d: 'Lựa chọn giải quyết tranh chấp qua ' + hg.ten + ' tiền tố tụng tại Tòa án và chọn ' + hg.Tv + '.' }, { id: 'khong', t: 'Không đồng ý ' + hg.ten + '', d: 'Chấm dứt ' + hg.ten + ' để Tòa án chuyển hồ sơ sang thụ lý vụ án theo quy định của pháp luật tố tụng (Điều 16.4.b).' }] }),
    FCard('Ý kiến của các đồng nguyên đơn', h(F, null, Lead('Vụ việc có 1 đồng nguyên đơn cùng đứng đơn. Nếu tất cả người khởi kiện và các đồng nguyên đơn thống nhất cùng chọn 01 ' + hg.Tv + ', Tòa án sẽ chỉ định theo lựa chọn đó. Nếu không thống nhất được, bạn có thể chọn phương án "Thẩm phán chỉ định" để gửi hồ sơ sang Tòa án giải quyết ngay mà không bị gián đoạn.'),
      h('ul', { className: 'hg-yk' }, h('li', null, h('div', null, h('b', null, 'Hoàng Dương'), h('small', null, 'Người khởi kiện (Bạn)')), h('span', null, khong ? 'Không đồng ý ' + hg.ten : hgv[0] === 'tp' ? 'Thẩm phán chỉ định' : hgv[0] ? (HG_HGV.filter(function (x) { return x.id === hgv[0]; })[0] || {}).name : '— Chưa chọn ' + hg.Tv + ' —'), ro ? h(T.StatusBadge, { tone: 'success', icon: false }, 'Đã gửi Tòa án (12/10/2026)') : h(T.StatusBadge, { tone: 'neutral', icon: false }, 'Đang thao tác')),
        h('li', null, h('div', null, h('b', null, 'Nguyễn Thị Lan'), h('small', null, 'Đồng nguyên đơn')), h('span', null, 'Nguyễn Văn An'), ro ? h(T.StatusBadge, { tone: 'success', icon: false }, 'Đã gửi Tòa án (13/10/2026)') : h(T.StatusBadge, { tone: 'warning', icon: false }, 'Đã lưu lựa chọn (01/11/2026)'))),
      co && !ro ? (!hgv[0] ? NvCallS('info', 'Vui lòng chọn ' + hg.Tv + ' ở danh mục bên dưới để kiểm tra tính thống nhất với các đồng nguyên đơn.')
        : thongNhat ? NvCallS('success', hgv[0] === 'tp' ? 'Bạn chọn "Không lựa chọn — Thẩm phán chỉ định": có thể ký số và gửi Tòa án ngay.' : 'Lựa chọn của bạn đã thống nhất với tất cả các đồng nguyên đơn — có thể ký số và gửi Tòa án.')
          : NvCallS('warning', 'Chưa thống nhất ' + hg.Tv + ' với các đồng nguyên đơn. Hãy lưu lựa chọn và chờ thống nhất, hoặc chọn "Không lựa chọn — Thẩm phán chỉ định" để gửi ngay.')) : null), true),
    co ? FCard('' + hg.Tv + '', h(F, null,
      h(SelSheet, { label: 'Phạm vi lựa chọn ' + hg.Tv + '', req: true, v: pv[0], ph: '— Chọn phạm vi —', opts: [{ id: 'cung', name: 'Thuộc Tòa án đang giải quyết' }, { id: 'khac', name: 'Thuộc Tòa án khác' }], onChange: pv[1] }),
      pv[0] === 'khac' ? h(SelSheet, { label: 'Tòa án nơi ' + hg.Tv + ' công tác', req: true, ph: '— Chọn Tòa án cùng khu vực —', opts: ['Tòa án nhân dân khu vực 2 - Hà Nội', 'Tòa án nhân dân khu vực 3 - Hà Nội'] }) : pv[0] ? Tf('Tòa án nơi ' + hg.Tv + ' công tác', { required: true, value: COURT1, readOnly: true }) : null,
      h(SelSheet, { label: 'Chọn ' + hg.Tv + '', req: true, v: hgv[0], ph: pv[0] ? '— Chọn ' + hg.Tv + ' —' : '— Chọn phạm vi ở trên, hoặc "Thẩm phán chỉ định" —', opts: (pv[0] === 'khac' ? HG_HGV.slice(0, 2) : HG_HGV).map(function (x) { return x.desc ? Object.assign({}, x, { desc: hg.Tv }) : x; }), onChange: hgv[1] })), true) : null,
    khong ? Tf('Lý do không đồng ý', { multiline: true, maxLength: 500, value: ly[0], onChange: function (e) { ly[1](e.target.value); }, placeholder: 'Nhập lý do từ chối', help: ly[0].length + '/500' }) : null,
    loai[0] ? Tf('Ghi chú (nếu có)', { multiline: true, maxLength: 500, value: gc[0], onChange: function (e) { gc[1](e.target.value); }, placeholder: 'Ý kiến/ghi chú bổ sung (không bắt buộc)' }) : null,
    ro ? null : h(HgKy, { ten: 'Văn bản ý kiến lựa chọn ' + hg.ten + '', du: du && (!co || thongNhat), chuaDu: !loai[0] ? 'Chọn Đồng ý hoặc Không đồng ý để ký số.' : 'Chọn đủ phạm vi, Tòa án và ' + hg.Tv + ' để ký số.', da: ky[0], onKy: function () { ky[1](true); }, onSua: function () { ky[1](false); }, khoa: 'Đơn đã ký số nên lựa chọn đã khóa.', sua: 'Sửa lựa chọn và ký lại' })),
    ro ? Bar(Btn('Đóng', 'secondary', { 'data-pt-go': 'back' })) : Bar(Btn('Lưu lựa chọn', 'secondary', ky[0] ? { disabled: true, title: 'Văn bản đã ký số — không lưu nháp nữa, hãy gửi Tòa án' } : { onClick: function () { ptSnack('Đã lưu lựa chọn. Các đồng nguyên đơn sẽ thấy lựa chọn của bạn.'); }, disabled: !loai[0] }), HgGui(ky[0], 'Đã gửi văn bản trả lời lựa chọn ' + hg.ten + ' đến Tòa án thành công.', 'Cần ký số đủ văn bản trả lời trước khi gửi')));
}
function NvCallS(tone, t) { return h(NvCall, { tone: tone }, t); }
var HG_CC_DOI = ['Một bên yêu cầu thay đổi do có căn cứ về tính vô tư, khách quan', 'Đương sự yêu cầu thay đổi sau thông báo chuyển vụ việc', 'Hòa giải viên / đối thoại viên xin nghỉ việc hoặc chuyển công tác', 'Các bên thống nhất thay đổi và lựa chọn người khác', 'Hòa giải viên / đối thoại viên đề nghị từ chối', 'Tòa án phát hiện căn cứ phải thay đổi', 'Sự kiện bất khả kháng hoặc trở ngại khách quan', 'Bị miễn nhiệm hoặc buộc thôi làm Hòa giải viên'];
function HgTep(t) { return FCard(t, h(F, null, h(T.FileUpload, { hint: 'Chưa có tài liệu', uploadLabel: 'Tải lên tài liệu', accept: '.pdf,.jpg,.png' }), P('Tài liệu đính kèm cần ký số trước khi gửi Tòa án.', 'ph-muted dt-small')), true); }
function HgChange(p) {
  var hg = hgTen(p), tok = React.useState(true);
  var cc = React.useState(''), ly = React.useState(''), ky = React.useState(false), du = cc[0] && ly[0].trim();
  return SubS('Đề nghị thay đổi ' + hg.Tv + '', h(F, null, NvCallS('info', h(F, null, 'Đề nghị này sẽ được gắn với mã tiếp nhận đơn QLA: ', h('b', { className: 'tp-num' }, 'HG-2026-0018'), '.')),
    h(SelSheet, { label: 'Căn cứ đề nghị thay đổi', req: true, v: cc[0], ph: '— Chọn căn cứ —', opts: HG_CC_DOI, onChange: cc[1] }),
    Tf('Lý do cụ thể', { required: true, multiline: true, maxLength: 1000, value: ly[0], onChange: function (e) { ly[1](e.target.value); }, placeholder: 'Trình bày cụ thể lý do đề nghị thay đổi ' + hg.Tv + '...', help: ly[0].length + '/1000' }),
    h(HgTepDs, { t: 'Tài liệu chứng minh (nếu có)', onOk: tok[1] }),
    h(HgKy, { ten: 'Đơn đề nghị thay đổi ' + hg.Tv + '', du: !!du, chuaDu: 'Chọn căn cứ và nhập lý do cụ thể để tạo đơn.', da: ky[0], onKy: function () { ky[1](true); }, onSua: function () { ky[1](false); } })),
    Bar(Btn('Hủy', 'secondary', { 'data-pt-go': 'back' }), HgGui(ky[0] && tok[0], 'Đã gửi đề nghị thay đổi ' + hg.tv + ' đến Tòa án thành công.', ky[0] ? 'Vui lòng ký số tài liệu chứng minh trước khi gửi Tòa án.' : 'Cần ký số đủ đơn đề nghị trước khi gửi')));
}
var HG_LD_HOAN = ['Sự kiện bất khả kháng (thiên tai, dịch bệnh, ...)', 'Trở ngại khách quan (tai nạn, sự cố không lường trước được, ...)', 'Đương sự ốm đau, bệnh tật có xác nhận của cơ sở y tế', 'Lý do công tác, đi vắng có xác nhận của cơ quan', 'Lý do khác có căn cứ hợp pháp'];
function HgDelay(p) {
  var hg = hgTen(p), tok = React.useState(true);
  var ro = !!p.view, ph = React.useState('p1'), ld = React.useState(ro ? HG_LD_HOAN[3] : ''), gt = React.useState(ro ? 'Tôi đi công tác theo quyết định của cơ quan từ 05/11 đến 10/11/2026.' : ''), dx = React.useState(''), ky = React.useState(false), du = ld[0] && gt[0].trim();
  return SubS(ro ? 'Chi tiết đề nghị hoãn phiên ' + hg.ten + '' : 'Đề nghị hoãn phiên ' + hg.ten + '', h(F, null, NvCallS('info', h(F, null, 'Đề nghị hoãn phiên ' + hg.ten + ' gắn liền với mã tiếp nhận đơn: ', h('b', { className: 'tp-num' }, 'HG-2026-0018'), '.')),
    p.khongPhien ? Sf('Phiên ' + hg.ten + ' đề nghị hoãn', { required: true, disabled: true, placeholder: 'Chưa có phiên ' + hg.ten + ' được xếp lịch' }) /* v348 (HG-W13) */
      : h(SelSheet, { label: 'Phiên ' + hg.ten + ' đề nghị hoãn', req: !ro, v: ph[0], opts: [{ id: 'p1', name: 'Phiên ' + hg.ten + ' 08:30, 06/11/2026', desc: COURT1 }], onChange: ph[1] }),
    h(SelSheet, { label: 'Lý do xin hoãn phiên ' + hg.ten + '', req: !ro, v: ld[0], ph: '— Chọn lý do chính đáng theo luật định —', opts: HG_LD_HOAN, onChange: ld[1] }),
    Tf('Trình bày chi tiết lý do', { required: !ro, multiline: true, value: gt[0], readOnly: ro, onChange: function (e) { gt[1](e.target.value); }, placeholder: 'Nêu rõ hoàn cảnh, lý do không thể tham gia phiên ' + hg.ten + ' đúng thời gian đã định...', help: ro ? undefined : gt[0].length + '/1000' }),
    Tf('Thời gian đề xuất mở lại phiên (trong thời hạn ' + hg.ten + ')', { value: dx[0], readOnly: ro, onChange: function (e) { dx[1](e.target.value); }, placeholder: 'Ví dụ: Ngày 15/09/2026 lúc 09:00 hoặc tuần tiếp theo...' }),
    ro ? FCard('Tài liệu, chứng cứ chứng minh lý do hoãn', DtDocs([['quyet-dinh-cong-tac.pdf', 'PDF · Đã ký số']]), true) : h(HgTepDs, { t: 'Tài liệu, chứng cứ chứng minh lý do hoãn (giấy ra viện, lệnh công tác, vé máy bay,...)', onOk: tok[1] }),
    ro ? FCard('Đơn đề nghị hoãn phiên ' + hg.ten + '', DtDocs([['Đơn đề nghị hoãn phiên ' + hg.ten + '', KY_LUC]]), true) : h(HgKy, { ten: 'Đơn đề nghị hoãn phiên ' + hg.ten + '', du: !!du, chuaDu: 'Chọn phiên, lý do và trình bày chi tiết lý do để tạo đơn.', da: ky[0], onKy: function () { ky[1](true); }, onSua: function () { ky[1](false); } })),
    ro ? Bar(Btn('Đóng', 'secondary', { 'data-pt-go': 'back' })) : Bar(Btn('Hủy', 'secondary', { 'data-pt-go': 'back' }), HgGui(ky[0] && tok[0] && !p.khongPhien, 'Đã gửi đề nghị hoãn phiên ' + hg.ten + ' đến Tòa án thành công.', p.khongPhien ? 'Chưa có phiên ' + hg.ten + ' được xếp lịch' : ky[0] ? 'Vui lòng ký số tài liệu đính kèm trước khi gửi Tòa án.' : 'Cần ký số đủ đơn đề nghị trước khi gửi')));
}
var HG_CC_33 = ['1. Một trong các bên không có năng lực hành vi dân sự đầy đủ tại thời điểm hòa giải, đối thoại', '2. Một trong các bên không có quyền, nghĩa vụ đối với nội dung đã thỏa thuận, thống nhất', '3. Nội dung thỏa thuận không hoàn toàn tự nguyện, vi phạm điều cấm của luật hoặc trái đạo đức xã hội', '4. Trường hợp thuận tình ly hôn nhưng thỏa thuận chưa đầy đủ nội dung về ly hôn, tài sản, con chung', '5. Nội dung thỏa thuận liên quan quyền, nghĩa vụ của người vắng mặt nhưng chưa có ý kiến đồng ý bằng văn bản của người đó', '6. Nội dung thỏa thuận mới giải quyết một phần vụ việc nhưng phần đó có liên quan đến phần khác chưa được giải quyết'];
function HgReview(p) {
  p = p || {};
  var tok = React.useState(true), qd = !p.khongQd, tn = React.useState(false), lt = React.useState(''), cc = React.useState([]), nd = React.useState(''), ky = React.useState(false), du = cc[0].length && nd[0].trim() && (!tn[0] || lt[0].trim());
  return SubS('Đề nghị xem xét lại quyết định công nhận', h(F, null, h('p', { className: 'nv-sub' }, 'Căn cứ theo Điều 33, 36 Luật Hòa giải, đối thoại tại Tòa án'),
    qd ? null : NvCallS('warning', 'Chưa xác định được ngày tống đạt quyết định công nhận, chưa thể gửi đề nghị.'),
    NvCallS('info', h(F, null, 'Theo Điều 37, đơn đề nghị phải gửi đến ', h('b', null, 'Tòa án cấp trên trực tiếp'), ' của Tòa án đã ra quyết định công nhận — không gửi lại cùng Tòa án đã ra quyết định.')),
    FCard('Thông tin đề nghị', RvKV([['Tòa án nhận đơn', 'Tòa án nhân dân Thành phố Hà Nội'], ['Người đề nghị', 'Hoàng Dương — Sinh năm [năm sinh]'], ['Quyết định công nhận bị đề nghị xem xét lại', qd ? 'Quyết định công nhận kết quả hòa giải thành - 25/10/2026 - ' + COURT1 : 'Chưa có quyết định công nhận trên tiến trình'], ['Ngày nhận được/biết được quyết định', qd ? '25/10/2026' : 'Chưa xác định được ngày tống đạt quyết định công nhận']]), true),
    h('div', { className: 'ph-commit hg-cb' }, h(T.Checkbox, { checked: tn[0], onChange: function (e) { tn[1](e.target.checked); }, label: 'Có thời gian bất khả kháng/trở ngại khách quan cần loại trừ khi tính hạn' }),
      Tf('Thời gian, lý do bất khả kháng hoặc trở ngại khách quan', { disabled: !tn[0], value: lt[0], onChange: function (e) { lt[1](e.target.value); }, placeholder: tn[0] ? 'Nêu khoảng thời gian và lý do bất khả kháng/trở ngại khách quan' : '' })),
    FCard('Căn cứ đề nghị/kiến nghị — Điều 33 *', h('div', { className: 'tr-yc' }, HG_CC_33.map(function (c, i) { return h(T.Checkbox, { key: i, checked: cc[0].indexOf(i) >= 0, label: c, onChange: function (e) { cc[1](e.target.checked ? cc[0].concat([i]).sort() : cc[0].filter(function (x) { return x !== i; })); } }); })), true),
    Tf('Nội dung cụ thể', { required: true, multiline: true, value: nd[0], onChange: function (e) { nd[1](e.target.value); }, placeholder: 'Mô tả vi phạm điều kiện công nhận và yêu cầu Tòa án xem xét...' }),
    h(HgTepDs, { t: 'Tài liệu, chứng cứ kèm theo', onOk: tok[1] }),
    h(HgKy, { ten: 'Đơn đề nghị xem xét lại quyết định công nhận', du: !!du, chuaDu: 'Chọn căn cứ và nhập nội dung cụ thể để tạo đơn.', da: ky[0], onKy: function () { ky[1](true); }, onSua: function () { ky[1](false); } }),
    P('Đề nghị được gửi đến Tòa án cấp trên trực tiếp để xem xét theo Điều 36. Mỗi người chỉ gửi 1 đề nghị xem xét lại cho quyết định này.', 'ph-muted dt-small')),
    Bar(Btn('Hủy', 'secondary', { 'data-pt-go': 'back' }), Btn('Gửi Tòa án', 'primary', ky[0] && tok[0] && qd ? { 'data-pt-snack': 'Đã gửi đề nghị xem xét lại quyết định công nhận đến Tòa án.', 'data-pt-go': 'backTo:mediationDone' } : { disabled: true, title: !qd ? 'Chưa xác định được ngày tống đạt quyết định công nhận, chưa thể gửi đề nghị.' : ky[0] ? 'Vui lòng ký số tài liệu đính kèm trước khi gửi Tòa án.' : 'Cần ký số đủ đơn đề nghị trước khi gửi' })));
}
/* ===== 8. Theo dõi yêu cầu cấp trích lục, bản sao (web /trich-luc: danh sách, chi tiết, bổ sung, rút) ===== */
var TLY_TT = [['all', 'Tất cả'], ['ST-01', 'Chưa gửi (nháp)'], ['ST-02a', 'Chờ tiếp nhận'], ['ST-02b', 'Đã tiếp nhận'], ['ST-03', 'Đang giải quyết'], ['ST-04', 'Đã giải quyết']];
var TLY_LOAI = { TL: 'Trích lục', BS: 'Bản sao', SC: 'Sao chụp' };
var TLY = [
  { ma: 'TL-2026-0031', loai: 'TL', vb: 'Quyết định', so: '12/2026/QĐ-CNTT', va: 'Tranh chấp hợp đồng vay tài sản', tt: 'ST-03', nhan: ['Yêu cầu bổ sung', 'warning'], gui: '28/10/2026', du: 'Cập nhật sau khi bổ sung', bs: '06/11/2026', go: 'copyDetailSupp' },
  { ma: 'TL-2026-0027', loai: 'BS', giay: 1, vb: 'Bản án', so: '45/2026/DS-ST', va: 'Tranh chấp hợp đồng vay tài sản', tt: 'ST-03', nhan: ['Yêu cầu nộp lệ phí', 'warning'], gui: '25/10/2026', du: '08/11/2026', nv: '07/11/2026', go: 'copyDetailFee' },
  { ma: 'TL-2026-0024', loai: 'TL', vb: 'Bản án', so: '45/2026/DS-ST', va: 'Tranh chấp hợp đồng vay tài sản', tt: 'ST-03', nhan: ['Đang giải quyết', 'warning'], gui: '20/10/2026', du: '08/11/2026', go: 'copyDetail' },
  { ma: 'TL-2026-0035', loai: 'BS', vb: 'Quyết định', so: '08/2026/QĐ-TĐC', va: 'Tranh chấp hợp đồng mua bán tài sản', tt: 'ST-01', nhan: ['Chưa gửi (nháp)', 'neutral'], du: 'Chưa gửi', nhap: true, go: 'copyDetailDraft' },
  { ma: 'TL-2026-0019', loai: 'BS', vb: 'Bản án', so: '30/2026/HNGĐ-ST', va: 'Ly hôn, tranh chấp nuôi con', tt: 'ST-04', nhan: ['Đã cấp', 'success'], gui: '10/10/2026', du: '15/10/2026', go: 'copyDetailDone' },
  { ma: 'TL-2026-0011', loai: 'TL', vb: 'Bản án', so: '18/2026/DS-ST', va: 'Yêu cầu độc lập', tt: 'ST-04', nhan: ['Từ chối cấp', 'danger'], gui: '02/10/2026', du: '06/10/2026', go: 'copyDetailRejected' }];
/* chi tiết yêu cầu: dang (đang giải quyết) · bs (bổ sung) · nv (nghĩa vụ TC) · cap (đã cấp) · tc (từ chối) · nhap */
var TLY_DB = {
  dang: [['Nộp hồ sơ', 'Hệ thống đã ghi nhận và tự động xác nhận gửi yêu cầu thành công.', '20/10/2026 · 09:12', 'done'], ['Tiếp nhận hồ sơ', 'Tòa án đã tiếp nhận hồ sơ.', '20/10/2026 · 14:30', 'done'], ['Thẩm định hồ sơ', 'Đang chờ Thư ký/Thẩm phán thẩm định hồ sơ.', '', 'current'], ['Trả kết quả', 'Chờ Tòa án ban hành kết quả.', '', 'todo']],
  cap: [['Nộp hồ sơ', 'Hệ thống đã ghi nhận và tự động xác nhận gửi yêu cầu thành công.', '10/10/2026 · 08:40', 'done'], ['Tiếp nhận hồ sơ', 'Tòa án đã tiếp nhận hồ sơ.', '10/10/2026 · 10:05', 'done'], ['Thẩm định hồ sơ', 'Thư ký/Thẩm phán đã thẩm định hồ sơ.', '12/10/2026 · 15:20', 'done'], ['Trả kết quả', 'Kết quả điện tử đã được ký số và tự động lưu vào Kho dữ liệu M03.', '15/10/2026 · 09:00', 'done']],
  tc: [['Nộp hồ sơ', 'Hệ thống đã ghi nhận và tự động xác nhận gửi yêu cầu thành công.', '02/10/2026 · 10:00', 'done'], ['Tiếp nhận hồ sơ', 'Tòa án đã tiếp nhận hồ sơ.', '02/10/2026 · 15:10', 'done'], ['Trả kết quả', 'Yêu cầu đã bị từ chối cấp — xem lý do ở khối phía trên.', '06/10/2026 · 16:45', 'done']] };
var TLY_BUOC = { dang: 'DVCQG: 2 · Tiếp nhận hồ sơ', bs: 'DVCQG: 3 · Bổ sung hồ sơ', nv: 'DVCQG: 6 · Thực hiện nghĩa vụ tài chính', cap: 'DVCQG: 5 · Trả kết quả', tc: 'DVCQG: 7 · Dừng xử lý', nhap: null };
function TlyDB(k) {
  var st = (TLY_DB[k] || TLY_DB.dang).map(function (x) { return { title: x[0], desc: x[1], date: x[2] || undefined, state: x[3] }; });
  return FCard('Diễn biến xử lý', h(F, null, h(T.Timeline, { steps: st.map(function (s) { return { title: s.title, date: [s.desc, s.date].filter(Boolean).join(' · '), state: s.state === 'todo' ? undefined : s.state }; }) }),
    k === 'cap' || k === 'tc' ? null : h('p', { className: 'tly-next' }, h('b', null, 'Bước tiếp theo: '), k === 'bs' ? 'Chờ bạn nộp hồ sơ bổ sung theo yêu cầu của Tòa án.' : k === 'nv' ? 'Chờ bạn thực hiện nghĩa vụ tài chính.' : 'Chờ Thư ký/Thẩm phán thẩm định hồ sơ.')), true);
}
function TlyDetail(p) {
  var k = p.k || 'dang', nhap = k === 'nhap';
  var nhan = { dang: ['Đang giải quyết', 'warning'], bs: ['Yêu cầu bổ sung', 'warning'], nv: ['Yêu cầu nộp lệ phí', 'warning'], cap: ['Đã cấp', 'success'], tc: ['Từ chối cấp', 'danger'], nhap: ['Chưa gửi (nháp)', 'neutral'] }[k];
  var du = { dang: '08/11/2026', bs: 'Cập nhật sau khi bổ sung', nv: '08/11/2026', cap: 'Đã cấp', tc: 'Từ chối cấp', nhap: 'Chưa gửi' }[k];
  var ma = { dang: 'TL-2026-0024', bs: 'TL-2026-0031', nv: 'TL-2026-0027', cap: 'TL-2026-0019', tc: 'TL-2026-0011', nhap: 'TL-2026-0035' }[k];
  var loai = k === 'bs' || k === 'dang' || k === 'tc' ? 'Trích lục bản án/quyết định' : 'Bản sao bản án/quyết định';
  var coRut = k === 'dang' || k === 'bs' || k === 'nv';
  return SubS('Chi tiết yêu cầu', h(F, null,
    h('section', { className: 'tly-head' }, h('div', { className: 'dg-tags' }, h('b', { className: 'tp-num' }, ma), h(T.StatusBadge, { tone: nhan[1] }, nhan[0]), TLY_BUOC[k] ? h('span', { className: 'dg-an' }, TLY_BUOC[k]) : null),
      h('h1', null, k === 'tc' ? 'Yêu cầu độc lập' : k === 'cap' ? 'Ly hôn, tranh chấp nuôi con' : 'Tranh chấp hợp đồng vay tài sản'),
      k === 'tc' ? null : h('button', { type: 'button', className: 'vk-link tly-va', 'data-pt-go': 'caseDetail' }, h('span', { className: 'tp-num' }, k === 'cap' ? 'HN-2026-0007' : 'DS-2026-0012'), ' · Xem vụ án', h(T.Icon, { name: 'arrowRight' })),
      h('p', { className: 'tly-du' }, h('small', null, 'Dự kiến trả kết quả'), h('b', null, du))),
    k === 'bs' ? h('div', { className: 'tly-band tly-band-l' }, h('p', null, h(T.Icon, { name: 'alert' }), h('span', null, 'Văn bản ủy quyền đính kèm thiếu chứng thực chữ ký. Vui lòng bổ sung bản có chứng thực chữ ký theo quy định. Còn trong hạn bổ sung đến 06/11/2026. ', h('b', null, 'Yêu cầu bổ sung lần 1/2 — Tòa án còn có thể yêu cầu thêm 1 lần.'))), Btn('Bổ sung hồ sơ', 'primary', { size: 'sm', 'data-pt-go': 'copySupp' })) : null,
    k === 'nv' ? h('div', { className: 'tly-band tly-band-l' }, h('p', null, h(T.Icon, { name: 'alert' }), h('span', null, h('b', null, 'Thực hiện nghĩa vụ tài chính (lệ phí, án phí).'), ' Hạn thanh toán đến 07/11/2026.')), Btn('Thanh toán', 'primary', { size: 'sm', 'data-pt-go': 'snack:Mở Cổng Dịch vụ công quốc gia để thanh toán' })) : null,
    k === 'tc' ? NvCallS('danger', h(F, null, h('b', null, 'Từ chối cấp. '), 'Tài liệu yêu cầu thuộc diện không được cung cấp bản sao theo quy định.')) : null,
    k === 'cap' ? h('section', { className: 'tly-kq' }, h('p', { className: 'tly-kq-h' }, h(T.Icon, { name: 'checkCircle' }), 'Kết quả đã cấp — Bản điện tử'),
      h('div', { className: 'tly-kq-f' }, h('span', { className: 'tly-kq-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: 'file' })), h('div', null, h('b', null, 'TL-2026-0019.pdf'), h('small', null, 'Đã có chữ ký số của Tòa án'))),
      h('div', { className: 'ph-2btn' }, Btn('Xem trước', 'secondary', { size: 'sm', icon: 'eye', 'data-pt-go': 'snack:Mở xem trước kết quả' }), Btn('Tải xuống', 'primary', { size: 'sm', icon: 'download', 'data-pt-go': 'snack:Đang tải kết quả' })),
      h('p', { className: 'tly-ky' }, h(T.Icon, { name: 'shield' }), h('span', null, h('b', null, 'Đã ký số hợp lệ'), h('small', null, COURT1 + ' · 15/10/2026 09:00'))),
      P('Bản sao/trích lục điện tử có chữ ký số của Tòa án có giá trị sử dụng thay cho bản chính trong các giao dịch.', 'ph-muted dt-small')) : null,
    FCard('Hồ sơ bạn đã gửi', DtDocs(nhap ? [['Đơn yêu cầu', 'Chưa ký số']] : [['Đơn yêu cầu đã ký số', ma + '-don-da-ky.pdf'], ['Tài liệu đính kèm', 'giay-uy-quyen.pdf']]), true),
    FCard('Thông tin yêu cầu', RvKV([[k === 'cap' || k === 'tc' ? 'Bản án' : k === 'bs' ? 'Quyết định' : 'Bản án', k === 'bs' ? '12/2026/QĐ-CNTT' : k === 'cap' ? '30/2026/HNGĐ-ST' : k === 'tc' ? '18/2026/DS-ST' : '45/2026/DS-ST'], ['Ngày ban hành', '20/10/2026'], ['Tòa án ra bản án', COURT1], ['Loại yêu cầu', loai], ['Tư cách người yêu cầu', k === 'tc' ? 'Công dân quan tâm / Nghiên cứu học tập' : 'Đương sự — Nguyên đơn'], ['Mục đích sử dụng', 'Thi hành án'], ['Hình thức nhận', k === 'nv' ? '1 bản giấy (Gửi bưu chính)' : 'Bản điện tử']]), true),
    nhap ? null : TlyDB(k === 'bs' || k === 'nv' ? k : k),
    p.xoa ? h(QdConfirm, { title: 'Xóa bản nháp', text: 'Bạn có chắc chắn muốn xóa bản nháp yêu cầu ' + ma + ' này không? Dữ liệu bản nháp sẽ không thể khôi phục sau khi xóa.', ok: 'Xóa bản nháp', danger: true, go: 'backTo:copyList', snack: 'Đã xóa bản nháp thành công.' }) : null),
    nhap ? Bar(Btn('Xóa nháp', 'secondary', { 'data-pt-go': 'copyDraftDelete' }), Btn('Tiếp tục soạn', 'primary', { 'data-pt-go': 'tl1' }))
      : coRut ? Bar(Btn('Về danh sách', 'secondary', { 'data-pt-go': 'backTo:copyList' }), Btn('Rút yêu cầu', 'secondary', { 'data-pt-go': 'copyWithdraw' })) : Bar(Btn('Về danh sách', 'secondary', { 'data-pt-go': 'backTo:copyList' })));
}
/* nộp tài liệu bổ sung (ModalBoSungHoSo) */
function TlySupp(p) {
  var gt = React.useState(''), sdt = React.useState(''), em = React.useState(''), tep = React.useState(false), ky = React.useState(false), sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor);
  var loiGt = gt[0].trim() && gt[0].trim().length < 30 ? 'Nội dung giải trình tối thiểu 30 ký tự (hiện có ' + gt[0].trim().length + ' ký tự).' : undefined;
  var loiSdt = sdt[0].trim() && !/^\+?\d{8,14}$/.test(sdt[0].trim()) ? 'Chỉ gồm chữ số (8–14), có thể bắt đầu bằng +.' : undefined;
  var loiEm = em[0].trim() && !/^\S+@\S+\.\S+$/.test(em[0].trim()) ? 'Email không hợp lệ.' : undefined;
  var du = (tep[0] || (gt[0].trim() && !loiGt)) && !loiSdt && !loiEm;
  return SubS('Nộp tài liệu bổ sung', h(F, null, h('span', { ref: anchor, hidden: true }),
    p.qua ? NvCallS('danger', 'Đã quá thời hạn bổ sung. Bạn vẫn có thể gửi, Tòa án sẽ ghi nhận là nộp quá hạn.') : null,
    FCard('Tài liệu bạn muốn nộp thêm', h(F, null, Lead('Tệp không bắt buộc nếu bạn đã nhập nội dung giải trình. Chấp nhận PDF, JPG, PNG, DOCX — tối đa 10 MB mỗi tệp, tối đa 10 tệp.'),
      tep[0] ? DtDocs([['Văn bản ủy quyền có chứng thực', 'van-ban-uy-quyen.pdf · PDF']]) : null,
      h(T.Button, { variant: 'tint', icon: 'upload', className: 'ph-co-add', onClick: function () { tep[1](true); } }, 'Tải lên tài liệu')), true),
    Tf('Nội dung giải trình', { multiline: true, value: gt[0], onChange: function (e) { gt[1](e.target.value); }, placeholder: 'Nội dung giải trình bổ sung… (bắt buộc nếu không chọn tệp)', error: loiGt }),
    FCard('Thông tin liên hệ mới (không bắt buộc)', h(F, null, Lead('Chỉ gửi cho Tòa án để liên hệ về yêu cầu này, không thay đổi thông tin tài khoản của bạn.'),
      Tf('Số điện thoại mới', { type: 'tel', value: sdt[0], onChange: function (e) { sdt[1](e.target.value); }, error: loiSdt }), Tf('Email mới', { type: 'email', value: em[0], onChange: function (e) { em[1](e.target.value); }, error: loiEm })), true),
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: ['Tài liệu bổ sung'], onClose: function () { sh[1](false); }, onKy: function () { sh[1](false); ky[1](true); } }), host) : null),
    Bar(Btn('Hủy', 'secondary', { 'data-pt-go': 'back' }), ky[0] ? Btn('Gửi bổ sung', 'primary', { 'data-pt-go': 'backTo:copyDetailSupp', 'data-pt-snack': 'Đã gửi bổ sung hồ sơ. Tòa án sẽ tiếp tục xử lý.' })
      : Btn('Ký số và gửi bổ sung', 'primary', du ? { onClick: function () { sh[1](true); } } : { disabled: true, title: 'Vui lòng nhập nội dung giải trình hoặc chọn ít nhất một tệp.' })));
}
/* rút yêu cầu (ModalRutYeuCau) – lý do lấy từ danh mục, dưới đây là mẫu */
var TLY_LD_RUT = ['Không còn nhu cầu sử dụng', 'Đã có văn bản từ nguồn khác', 'Nộp nhầm yêu cầu', 'Lý do khác'];
function TlyWithdraw() {
  var ld = React.useState(TLY_LD_RUT[0]), ct = React.useState(''), xn = React.useState(false), khac = ld[0] === 'Lý do khác', n = ct[0].trim().length;
  var loi = khac && ct[0] && n < 30 ? 'Vui lòng nêu rõ lý do rút yêu cầu, tối thiểu 30 ký tự (hiện có ' + n + ' ký tự).' : undefined, du = xn[0] && (!khac || n >= 30);
  return SubS('Rút yêu cầu', h(F, null,
    h(SelSheet, { label: 'Lý do rút yêu cầu', v: ld[0], opts: TLY_LD_RUT, onChange: ld[1] }),
    khac ? Tf('Vui lòng nêu rõ lý do rút yêu cầu', { required: true, multiline: true, maxLength: 500, value: ct[0], onChange: function (e) { ct[1](e.target.value); }, placeholder: 'Nhập lý do rút yêu cầu cụ thể (từ 30 đến 500 ký tự)…', error: loi, help: n + '/500' }) : null,
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { checked: xn[0], onChange: function (e) { xn[1](e.target.checked); }, label: 'Tôi hiểu rằng sau khi rút, yêu cầu này sẽ bị hủy bỏ vĩnh viễn.' }))),
    Bar(Btn('Quay lại', 'secondary', { 'data-pt-go': 'back' }), Btn('Xác nhận rút yêu cầu', 'primary', du ? { 'data-pt-go': 'backTo:copyList', 'data-pt-snack': 'Đã rút yêu cầu thành công.' } : { disabled: true, title: 'Vui lòng xác nhận hiểu rằng yêu cầu sẽ bị hủy bỏ vĩnh viễn.' })));
}
/* ===== 9. Theo dõi đơn khiếu nại, tố cáo (web /khieu-nai-to-cao: 2 nguồn, chi tiết, rút, lần hai, tố cáo tiếp, ý kiến, khiếu nại trả lại đơn) ===== */
var KN_TT_HS = [
  { ma: 'KNTT-2026-0012', thuTuc: 'KN Quyết định', tom: 'Khiếu nại quyết định tạm đình chỉ giải quyết vụ án', goc: ['Vụ án liên quan', 'DS-2026-0018'], loai: 'Khiếu nại quyết định tố tụng', qla: 'QLA-2026-00081', han: '15 ngày kể từ ngày thụ lý', bar: [6, 15, 'Còn 9 ngày', 'an', '12/11/2026'], tt: ['Đang xử lý', 'info'], tinh: 'Đang xem xét, giải quyết khiếu nại', hd: ['LICH'], tien: 'dang', go: 'complaintTt' },
  { ma: 'KNTT-2026-0009', thuTuc: 'KN Trả lại đơn', tom: 'Khiếu nại việc trả lại đơn khởi kiện', goc: ['Đơn khởi kiện bị trả lại', 'TN-20261012-0007'], loai: 'Khiếu nại việc trả lại đơn', qla: 'QLA-2026-00064', han: '05 ngày làm việc kể từ ngày được phân công', kq: true, tt: ['Đã xử lý', 'success'], tinh: 'Đã giải quyết khiếu nại', lan2: [7, '10/11/2026'], tien: 'kq', go: 'complaintTtDone' },
  { ma: 'KNTT-2026-0005', thuTuc: 'Tố cáo', tom: 'Tố cáo hành vi của Thư ký phiên tòa', goc: ['Vụ án liên quan', 'DS-2026-0012'], loai: 'Tố cáo trong vụ án', qla: 'QLA-2026-00042', han: '30 ngày kể từ ngày thụ lý', bar: [32, 30, 'Quá hạn 2 ngày', 'qua', '01/11/2026'], tt: ['Đã gửi đơn', 'info'], tinh: 'Tòa án đã nhận đơn', tien: 'qua', go: 'complaintTt' },
  { ma: 'Bản nháp', thuTuc: 'KN Hành vi', tom: 'Khiếu nại hành vi của Thẩm phán', goc: ['Vụ án liên quan', 'DS-2026-0012'], loai: 'Khiếu nại hành vi tố tụng', nhap: true, tt: ['Lưu nháp', 'neutral'], tien: 'nhap', go: 'khv1' }];
var KN_HC_HS = [
  { ma: 'KN-2026-0012', loai: 'Khiếu nại', tom: 'Khiếu nại về việc chậm trả kết quả cấp bản sao', chu: 'Hoàng Dương', grp: ['Đang giải quyết', 'warning'], gui: '23/10/2026', ban: 'Hạn giải quyết của Tòa án: 22/11/2026 · Đang chờ Tòa án trả kết quả giải quyết.', go: 'complaintDetail' },
  { ma: 'TC-2026-0004', loai: 'Tố cáo', tom: 'Tố cáo hành vi nhận tiền của cán bộ tiếp công dân', chu: 'Hoàng Dương', grp: ['Đã có kết quả', 'success'], gui: '05/10/2026', go: 'complaintDetailTc' },
  { ma: 'KN-2026-0007', loai: 'Khiếu nại', tom: 'Khiếu nại thái độ tiếp công dân', chu: 'Hoàng Dương', grp: ['Đề nghị rút đơn', 'neutral'], gui: '01/10/2026', ban: 'Bạn đã đề nghị rút đơn — chờ Tòa án xác nhận.', go: 'complaintDetailRut' }];
function KnBar(b) {
  var pc = Math.min(100, Math.round(b[0] / b[1] * 100));
  return h('div', { className: 'kn-bar' }, h('div', { className: 'kn-bar-h' }, h('span', { className: 'ib-due ib-due-' + b[3] }, b[2]), h('small', null, 'Hạn ' + b[4])),
    h('span', { className: 'dg-bar' }, h('i', { className: b[3] === 'qua' ? 'dg-bar-warn kn-bar-qua' : 'dg-bar-info', style: { width: pc + '%' } })),
    h('small', null, 'Đã gửi ' + Math.min(b[0], b[1]) + '/' + b[1] + ' ngày'));
}
var KN_TIEN = [['', 'Tổng hồ sơ'], ['dang', 'Đang xử lý'], ['kq', 'Đã có kết quả'], ['qua', 'Quá hạn xử lý']];
function KnTt(p) {
  var all = p.rong ? [] : KN_TT_HS, ti = React.useState(''), tt = React.useState('all'), q = React.useState(''), sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor);
  var gui = all.filter(function (r) { return !r.nhap; }), k = khongDau(q[0].trim());
  if (!all.length) return h(IbEmpty, { icon: 'scale', title: 'Chưa có hồ sơ khiếu nại, tố cáo trong tố tụng', text: 'Bạn chưa nộp đơn khiếu nại, tố cáo nào gắn với các vụ án của mình.', action: 'Nộp đơn mới', onAction: noop });
  var ds = all.filter(function (r) { return (!ti[0] || r.tien === ti[0]) && (tt[0] === 'all' || (tt[0] === 'nhap' ? r.nhap : tt[0] === 'gui' ? !r.nhap : false)) && (!k || khongDau([r.ma, r.qla, r.goc[1], r.tom].join(' ')).indexOf(k) >= 0); });
  var chips = [{ key: 'all', label: 'Tất cả', count: all.length }, { key: 'nhap', label: 'Lưu nháp', count: all.length - gui.length }, { key: 'gui', label: 'Đã gửi', count: gui.length }, { key: 'loi', label: 'Gửi lỗi', count: 0 }];
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    h('div', { className: 'kn-the' }, KN_TIEN.map(function (t) { var n = t[0] ? gui.filter(function (r) { return r.tien === t[0]; }).length : gui.length; return h('button', { key: t[1], type: 'button', 'aria-pressed': ti[0] === t[0], className: ti[0] === t[0] ? 'kn-the-on' : undefined, onClick: function () { ti[1](t[0]); tt[1]('all'); } }, h('small', null, t[1]), h('b', null, n)); })),
    h('div', { className: 'nv-stick' }, h('div', { className: 'ph-ibar' }, h('div', { className: 'fx-search' }, Tf('Tìm hồ sơ khiếu nại, tố cáo', { icon: 'search', placeholder: 'Tìm theo mã hồ sơ, mã tiếp nhận, mã vụ án, nội dung…', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })),
      h('button', { type: 'button', className: 'ph-ibar-btn nv-loc-btn', 'aria-label': 'Bộ lọc', onClick: function () { sh[1](true); } }, h(T.Icon, { name: 'funnel' }))),
      h(StRow, { label: 'Trạng thái', value: tt[0], onChange: function (x) { tt[1](x); ti[1](''); }, items: chips })),
    ds.length ? h('ul', { className: 'qd-list' }, ds.map(function (r) { return h(KnTtCard, { key: r.ma + r.tom, r: r }); })) : h(IbEmpty, { icon: 'search', title: 'Không có hồ sơ phù hợp', text: 'Thử đổi trạng thái hoặc bộ lọc.', action: 'Xóa bộ lọc', onAction: function () { ti[1](''); tt[1]('all'); q[1](''); } }),
    sh[0] && host ? h(LvSheet, { host: host, title: 'Bộ lọc hồ sơ', onClose: function () { sh[1](false); } }, h('div', { className: 'kn-loc' }, P('Lọc hồ sơ khiếu nại, tố cáo trong tố tụng của bạn.', 'ph-muted'),
      h(SelSheet, { label: 'Loại việc', v: 'all', opts: [{ id: 'all', name: 'Tất cả' }, { id: 'qd', name: 'KN Quyết định' }, { id: 'tra', name: 'KN Trả lại đơn' }, { id: 'hv', name: 'KN Hành vi' }, { id: 'tc', name: 'Tố cáo' }] }),
      Tf('Từ ngày', { type: 'date' }), Tf('Đến ngày', { type: 'date' }), Btn('Áp dụng', 'primary', { block: true, onClick: function () { sh[1](false); } }))) : null);
}
function Complaints() { return h(KnHome); }
/* chi tiết hồ sơ hành chính: k = kn (đang giải quyết) · tc (tố cáo đã có kết quả) · rut (đề nghị rút) */
function KnHcDetail(p) {
  var k = p.k || 'kn', tc = k === 'tc', word = tc ? 'tố cáo' : 'khiếu nại';
  var buoc = k === 'rut' ? [['Đề nghị rút đơn', 'Bạn đã đề nghị rút đơn — chờ Tòa án ra quyết định đình chỉ giải quyết.', '', 'current'], ['Gửi đơn khiếu nại trực tuyến', 'Đơn đã được ký số và ghi nhận trên Cổng dịch vụ tư pháp điện tử.', '01/10/2026', 'done']]
    : tc ? [['Kết luận nội dung tố cáo', 'Kết quả giải quyết đã được ban hành.', '28/10/2026', 'done'], ['Chờ trả kết quả', 'Đang chuẩn bị văn bản trả kết quả cho bạn.', '', 'done'], ['Xác minh nội dung tố cáo', 'Người giải quyết làm việc với các bên, thu thập tài liệu và lập báo cáo xác minh.', '', 'done'], ['Thụ lý tố cáo', 'Đơn đã được phân công cho người có thẩm quyền giải quyết.', '', 'done'], ['Gửi đơn tố cáo trực tuyến', 'Đơn đã được ký số và ghi nhận trên Cổng dịch vụ tư pháp điện tử.', '05/10/2026', 'done']]
      : [['Quyết định giải quyết khiếu nại', 'Chưa ban hành.', '', undefined], ['Chờ trả kết quả', 'Đang chuẩn bị văn bản trả kết quả cho bạn.', '', undefined], ['Xác minh nội dung khiếu nại', 'Người giải quyết làm việc với các bên, thu thập tài liệu và lập báo cáo xác minh.', '', 'current'], ['Thụ lý khiếu nại', 'Đơn đã được phân công cho người có thẩm quyền giải quyết.', '', 'done'], ['Gửi đơn khiếu nại trực tuyến', 'Đơn đã được ký số và ghi nhận trên Cổng dịch vụ tư pháp điện tử.', '23/10/2026', 'done']];
  var hs = tc ? KN_HC_HS[1] : k === 'rut' ? KN_HC_HS[2] : KN_HC_HS[0];
  return SubS('Chi tiết hồ sơ', h(F, null,
    h('section', { className: 'tly-head' }, h('div', { className: 'dg-tags' }, h('span', { className: 'tly-loai tly-loai-TL' }, hs.loai), h('b', { className: 'tp-num' }, hs.ma), h(T.StatusBadge, { tone: hs.grp[1] }, hs.grp[0])), h('h1', null, hs.tom), h('p', { className: 'pt-c-m' }, 'Gửi ' + hs.gui + ' · ' + COURT1)),
    tc ? h('div', { className: 'kn-bv' }, h(T.Icon, { name: 'lock' }), h('p', null, h('b', null, 'Bảo vệ người tố cáo. '), 'Danh tính của bạn được giữ bí mật với người bị tố cáo. Hồ sơ này chỉ người có thẩm quyền giải quyết được truy cập.')) : null,
    FCard('Tiến trình giải quyết', h(T.Timeline, { steps: buoc.map(function (b) { return { title: b[0], date: [b[1], b[2]].filter(Boolean).join(' · '), state: b[3] }; }) }), true),
    FCard('Nội dung ' + word, h(F, null, P(hs.tom + '. ' + (word === 'tố cáo' ? 'Cán bộ tiếp công dân yêu cầu nộp tiền ngoài quy định khi nhận hồ sơ.' : 'Bộ phận tiếp nhận trả kết quả cấp bản sao bản án chậm 15 ngày so với giấy hẹn.')), RvKV([['Yêu cầu giải quyết của người làm đơn', 'Đề nghị xem xét, xử lý trách nhiệm cán bộ liên quan và trả kết quả đúng hạn.']])), true),
    FCard('Người/đơn vị bị khiếu nại, tố cáo', RvKV([['Họ và tên', (word === 'tố cáo' ? 'Phạm Văn Đức' : 'Nguyễn Văn Long')], ['Chức danh', 'Cán bộ bộ phận tiếp nhận hồ sơ'], ['Đơn vị', COURT1]]), true),
    FCard('Tài liệu kèm theo', DtDocs([['Đơn ' + word + ' đã ký số', hs.ma + '.pdf'], ['Tài liệu, chứng cứ', 'tai-lieu-1.pdf']]), true),
    FCard('Thông tin xử lý', RvKV([['Mã hồ sơ', h('span', { className: 'tp-num' }, hs.ma)], ['Ngày gửi', hs.gui], ['Trạng thái Tòa án', hs.grp[0]], ['Cơ quan giải quyết', COURT1], ['Số người đứng đơn', '1'], ['Bộ phận tiếp nhận', '—']]), true),
    FCard('Thủ tục & căn cứ pháp lý', RvKV(tc ? [['Thủ tục áp dụng', 'Tố cáo hành vi vi phạm pháp luật của người tiến hành tố tụng'], ['Căn cứ pháp lý', 'Luật Tố cáo 2018, sửa đổi bổ sung năm 2025 (Luật số 136/2025/QH15)'], ['Thời hạn giải quyết', 'Thụ lý trong 07 ngày làm việc; giải quyết trong 30 ngày kể từ ngày thụ lý']] : [['Thủ tục áp dụng', 'Khiếu nại quyết định, hành vi hành chính của Tòa án'], ['Căn cứ pháp lý', 'Luật Khiếu nại 2011, sửa đổi bổ sung năm 2025 (Luật số 136/2025/QH15)'], ['Thời hạn giải quyết', KN_30]]), true),
    k === 'rut' ? null : FCard('Hành động tiếp theo', h('div', { className: 'kn-act' }, tc ? h(F, null, Btn('Cho ý kiến dự thảo kết luận', 'secondary', { icon: 'message', block: true, 'data-pt-go': 'knOpinion' }), Btn('Tố cáo tiếp', 'secondary', { icon: 'send', block: true, 'data-pt-go': 'knNext' }))
      : Btn('Khiếu nại lần hai', 'secondary', { icon: 'arrowRight', block: true, 'data-pt-go': 'knSecond' })), true)),
    k === 'rut' ? Bar(Btn('Về danh sách', 'secondary', { 'data-pt-go': 'backTo:complaints' })) : Bar(Btn('Về danh sách', 'secondary', { 'data-pt-go': 'backTo:complaints' }), Btn('Rút đơn', 'secondary', { 'data-pt-go': tc ? 'withdrawTc' : 'withdraw' })));
}
function ComplaintDetail() { return h(KnHcDetail); }
/* chi tiết hồ sơ tố tụng (QLA): 3 tab */
function KnTtDetail(p) {
  var r = p.kq ? KN_TT_HS[1] : KN_TT_HS[0];
  return h(DtScreen, { title: 'Hồ sơ tố tụng', tabLabel: 'Nội dung hồ sơ tố tụng', tabs: [{ key: 'nd', label: 'Nội dung khiếu nại, tố cáo' }, { key: 'vb', label: 'Văn bản tống đạt', count: p.kq ? 2 : 1 }, { key: 'ls', label: 'Lịch sử tiến trình', count: p.kq ? 3 : 2 }],
    meta: h(F, null, h('span', { className: 'tp-num' }, r.ma), ' · ' + r.thuTuc), name: r.tom,
    badges: h(F, null, h(T.StatusBadge, { tone: r.tt[1] }, r.tt[0]), h('span', { className: 'qd-tinh qd-tinh-' + (p.kq ? 'success' : 'info') }, r.tinh)),
    top: p.kq ? DtTodo({ t: 'Khiếu nại lần hai', d: 'Tòa án đã gửi Quyết định giải quyết khiếu nại · hạn khiếu nại lần hai 10/11/2026.', btns: Btn('Khiếu nại lần hai · còn 7 ngày', 'primary', { size: 'sm', 'data-pt-go': 'kqd1L' }) }) : h('div', { className: 'kn-top' }, KnBar(r.bar)),
    render: function (t) {
      if (t === 'vb') return FCard('Văn bản tống đạt', DtDocs(p.kq ? [['Quyết định giải quyết khiếu nại', 'Số 03/2026/QĐ-GQKN · Tống đạt 31/10/2026'], ['Thông báo thụ lý khiếu nại', 'Tống đạt 22/10/2026']] : [['Thông báo thụ lý khiếu nại', 'Tống đạt 30/10/2026']]), true);
      if (t === 'ls') return FCard('Lịch sử tiến trình', h(T.Timeline, { steps: (p.kq ? [{ title: 'Đã giải quyết khiếu nại', date: '31/10/2026', state: 'current' }, { title: 'Tòa án đã nhận đơn', date: '22/10/2026', state: 'done' }, { title: 'Đã gửi', date: '20/10/2026', state: 'done' }] : [{ title: 'Tòa án đã nhận đơn', date: '30/10/2026', state: 'current' }, { title: 'Đã gửi', date: '28/10/2026', state: 'done' }]) }), true);
      return h(F, null,
        FCard('Thông tin hồ sơ', RvKV([['Tòa án tiếp nhận', COURT1], ['Ngày gửi', p.kq ? '20/10/2026' : '28/10/2026'], ['Mã tiếp nhận tại Tòa án', h('span', { className: 'tp-num' }, r.qla)], [r.goc[0], h('span', { className: 'tp-num' }, r.goc[1])], ['Thời hạn giải quyết', r.han], ['Căn cứ pháp lý', p.kq ? 'Điều 194 Bộ luật Tố tụng dân sự 2015' : 'Chương XLI Bộ luật Tố tụng dân sự 2015'], ['Trạng thái tại Tòa án', r.tt[0]], ['Tình trạng', r.tinh], ['Tư cách tố tụng', 'Nguyên đơn']]), true),
        FCard(p.kq ? 'Quyết định, văn bản bị khiếu nại' : 'Quyết định, văn bản bị khiếu nại', P(p.kq ? 'Thông báo trả lại đơn khởi kiện · TN-20261012-0007' : 'Quyết định tạm đình chỉ giải quyết vụ án · Số 08/2026/QĐ-TĐC'), true),
        FCard('Người gửi đơn', RvKV([['Họ và tên', 'Hoàng Dương'], ['Số định danh', h('span', { className: 'tp-num' }, '001090012345')], ['Số điện thoại', '0912345678'], ['Địa chỉ', 'Số 8 Phạm Hùng, Phường Từ Liêm, Thành phố Hà Nội']]), true),
        FCard('Tài liệu đã nộp', DtDocs([['Đơn đã ký số', r.ma + '.pdf'], [p.kq ? 'Thông báo trả lại đơn' : 'Bản sao quyết định bị khiếu nại', 'Lấy từ Hộp thư tống đạt']]), true));
    } });
}
/* rút đơn (RutHoSoModal): 2 bước */
var KN_LD_RUT = [{ id: 'khac_phuc', t: 'Vấn đề đã được khắc phục, giải quyết thỏa đáng' }, { id: 'thoa_thuan', t: 'Các bên đã tự thỏa thuận, tôi không còn yêu cầu giải quyết' }, { id: 'nham', t: 'Tôi nộp chưa đúng đối tượng hoặc chưa đúng thủ tục, sẽ nộp lại' }, { id: 'khac', t: 'Lý do khác (nêu rõ bên dưới)' }];
function KnRut(p) {
  var tc = !!p.tc, word = tc ? 'tố cáo' : 'khiếu nại', b = React.useState(p.b || 0), ht = React.useState('1'), pr = React.useState(''), ld = React.useState('khac_phuc'), lk = React.useState(''), xn = React.useState(false), tr = React.useState(false);
  var loiPr = ht[0] === '0' && pr[0].trim().length < 10 ? 'Nêu rõ phần nội dung ' + word + ' muốn rút (tối thiểu 10 ký tự)' : null, loiLd = ld[0] === 'khac' && lk[0].trim().length < 10 ? 'Nêu rõ lý do rút đơn (tối thiểu 10 ký tự)' : null;
  var ma = tc ? 'TC-2026-0004' : 'KN-2026-0012', lyDo = ld[0] === 'khac' ? lk[0] : KN_LD_RUT.filter(function (x) { return x.id === ld[0]; })[0].t;
  var hd = h(T.Stepper, { steps: ['Lý do rút', 'Xác nhận & gửi'], current: b[0] });
  var body = b[0] === 0 ? h(F, null, hd, NvCallS('info', tc ? 'Người tố cáo có quyền rút toàn bộ hoặc một phần nội dung tố cáo trước khi người giải quyết ra kết luận nội dung tố cáo (Điều 33 Luật Tố cáo 2018).' : 'Người khiếu nại có thể rút khiếu nại tại bất cứ thời điểm nào trong quá trình khiếu nại và giải quyết khiếu nại (Điều 10 Luật Khiếu nại 2011; Điều 194, 504 Bộ luật Tố tụng dân sự 2015 đối với khiếu nại trong tố tụng).'),
    FCard('Hình thức rút', h(F, null, h(T.Tabs, { variant: 'chip', label: 'Hình thức rút', value: ht[0], onChange: ht[1], items: [{ key: '1', label: 'Rút toàn bộ' }, { key: '0', label: 'Rút một phần' }] }),
      ht[0] === '0' ? Tf('Phần nội dung muốn rút', { multiline: true, value: pr[0], onChange: function (e) { pr[1](e.target.value); }, placeholder: 'Nêu rõ phần nội dung ' + word + ' muốn rút…', error: tr[0] && loiPr ? loiPr : undefined }) : null), true),
    FCard('Lý do rút đơn', h(F, null, h(ChonThe, { label: 'Lý do rút đơn', v: ld[0], onPick: ld[1], items: KN_LD_RUT }),
      ld[0] === 'khac' ? Tf('Lý do khác', { multiline: true, value: lk[0], onChange: function (e) { lk[1](e.target.value); }, placeholder: 'Nêu rõ lý do rút đơn…', error: tr[0] && loiLd ? loiLd : undefined }) : null), true))
    : h(F, null, hd, FCard('Xác nhận', RvKV([['Hồ sơ rút', h('span', { className: 'tp-num' }, ma)], ['Hình thức', ht[0] === '1' ? 'Rút toàn bộ' : 'Rút một phần'], ['Lý do', lyDo]].concat(ht[0] === '0' ? [['Phần nội dung xin rút', pr[0]]] : [])), true),
      NvCallS('warning', 'Sau khi rút, hồ sơ sẽ không được xem xét tiếp.'),
      h('div', { className: 'ph-commit' }, h(T.Checkbox, { checked: xn[0], onChange: function (e) { xn[1](e.target.checked); }, label: 'Tôi xác nhận rút đơn ' + word + ' này.', error: tr[0] && !xn[0] ? 'Vui lòng xác nhận trước khi gửi' : undefined })));
  return SubS('Rút đơn ' + word, body,
    b[0] === 0 ? Bar(Btn('Hủy', 'secondary', { 'data-pt-go': 'back' }), Btn(h(F, null, 'Tiếp tục', h(T.Icon, { name: 'chevronRight' })), 'primary', { onClick: function () { if (loiPr || loiLd) tr[1](true); else { tr[1](false); b[1](1); } } }))
      : Bar(Btn('Quay lại', 'secondary', { onClick: function () { b[1](0); } }), xn[0] ? Btn('Xác nhận rút đơn', 'primary', { 'data-pt-go': 'backTo:complaints', 'data-pt-snack': 'Đã rút ' + word + ' hồ sơ ' + ma + '.' }) : Btn('Xác nhận rút đơn', 'primary', { onClick: function () { tr[1](true); } })));
}
function Withdraw() { return h(KnRut); }
/* khung hành động tiếp theo: khiếu nại lần hai · tố cáo tiếp · ý kiến dự thảo kết luận */
function KnTiep(p) {
  var nd = React.useState(''), ck = React.useState(false), yk = React.useState(p.yKien ? '' : null), tr = React.useState(false), ky = React.useState(false), sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor);
  var loi = yk[0] === '' ? 'Chọn đồng ý hoặc không đồng ý với dự thảo kết luận.' : (p.yKien ? (yk[0] === 'khong' && nd[0].trim().length < 10 ? 'Nêu rõ căn cứ bạn không đồng ý (tối thiểu 10 ký tự).' : null) : (nd[0].trim().length < 15 ? p.loiNd : null)) || (!ck[0] ? 'Vui lòng xác nhận cam kết trước khi gửi.' : null);
  return SubS(p.eyebrow, h(F, null, h('span', { ref: anchor, hidden: true }), h('p', { className: 'kn-eb' }, p.title),
    FCard('Hồ sơ', RvKV([['Hồ sơ gốc', h('span', { className: 'tp-num' }, p.goc)], ['Mã hồ sơ mới', 'Cấp sau khi gửi']]), true),
    p.note || null,
    p.yKien ? FCard('Văn bản kết quả', DtDocs([['Dự thảo kết luận nội dung tố cáo', 'Kết quả xử lý đã nhận · 28/10/2026']]), true) : null,
    p.yKien ? FCard('Ý kiến của bạn', h(ChonThe, { label: 'Ý kiến của bạn', v: yk[0], onPick: yk[1], items: [{ id: 'dong', t: 'Đồng ý' }, { id: 'khong', t: 'Không đồng ý' }] }), true) : null,
    Tf(p.nhanNd, { multiline: true, value: nd[0], onChange: function (e) { nd[1](e.target.value); }, placeholder: p.yKien ? (yk[0] === 'khong' ? 'Nêu rõ bạn không đồng ý ở điểm nào và căn cứ, tài liệu chứng minh…' : 'Ý kiến thêm (không bắt buộc)…') : p.phNd }),
    HgTep(p.nhanTl),
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { checked: ck[0], onChange: function (e) { ck[1](e.target.checked); }, label: 'Tôi cam kết nội dung trên là đúng sự thật và chịu trách nhiệm trước pháp luật về nội dung đã trình bày.' })),
    tr[0] && loi ? h('p', { className: 'dg-loi', role: 'alert' }, loi) : null,
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: [p.eyebrow], onClose: function () { sh[1](false); }, onKy: function () { sh[1](false); ky[1](true); } }), host) : null),
    Bar(Btn('Hủy', 'secondary', { 'data-pt-go': 'back' }), ky[0] ? Btn('Gửi', 'primary', { 'data-pt-go': 'backTo:' + p.ve, 'data-pt-snack': p.ok }) : Btn(p.nut, 'primary', { onClick: function () { if (loi) tr[1](true); else sh[1](true); } })));
}
function KnSecond(p) {
  var tt = !!p.tt;
  return h(KnTiep, { eyebrow: 'Khiếu nại lần hai', title: 'Khiếu nại lần hai lên Chánh án Tòa án cấp trên', goc: tt ? 'KNTT-2026-0009' : 'KN-2026-0012', ve: tt ? 'complaintTtDone' : 'complaintDetail',
    note: h(F, null, NvCallS('info', h(F, null, 'Trong thời hạn ', h('b', null, '30 ngày'), ' kể từ ngày nhận Quyết định giải quyết khiếu nại lần đầu (hoặc kể từ ngày hết thời hạn giải quyết lần đầu mà không được giải quyết), bạn có quyền khiếu nại lần hai (Điều 33 Luật Khiếu nại 2011).')),
      NvCallS('success', h(F, null, h('b', null, 'Hồ sơ sẽ được chuyển tới: Tòa án nhân dân Thành phố Hà Nội. '), 'Chánh án Tòa án cấp trên trực tiếp xem xét giải quyết khiếu nại lần hai — quyết định này là quyết định cuối cùng.'))),
    nhanNd: 'Lý do không đồng ý với Quyết định giải quyết lần đầu', phNd: 'Trình bày lý do không đồng ý và chứng cứ mới (nếu có)…', loiNd: 'Nêu rõ lý do không đồng ý với Quyết định giải quyết khiếu nại lần đầu (tối thiểu 15 ký tự).',
    nhanTl: 'Tài liệu, chứng cứ mới', nut: 'Ký số và gửi đơn khiếu nại lần hai', ok: 'Đã gửi đơn khiếu nại lần hai.' });
}
function KnNext() {
  return h(KnTiep, { eyebrow: 'Tố cáo tiếp', title: 'Tố cáo tiếp khi không đồng ý với Kết luận nội dung tố cáo', goc: 'TC-2026-0004', ve: 'complaintDetailTc',
    nhanNd: 'Căn cứ cho rằng việc giải quyết tố cáo lần đầu vi phạm pháp luật', phNd: 'Trình bày cụ thể căn cứ, tình tiết mới (nếu có)…', loiNd: 'Nêu rõ căn cứ cho rằng việc giải quyết tố cáo lần đầu vi phạm pháp luật (tối thiểu 15 ký tự).',
    nhanTl: 'Tài liệu, chứng cứ chứng minh', nut: 'Ký số và gửi văn bản tố cáo tiếp', ok: 'Đã gửi văn bản tố cáo tiếp.' });
}
function KnOpinion() {
  return h(KnTiep, { yKien: true, eyebrow: 'Cho ý kiến dự thảo kết luận', title: 'Cho ý kiến về dự thảo kết luận nội dung tố cáo', goc: 'TC-2026-0004', ve: 'complaintDetailTc',
    nhanNd: 'Nội dung ý kiến', nhanTl: 'Tài liệu kèm theo', nut: 'Ký số và gửi ý kiến', ok: 'Đã gửi ý kiến về dự thảo kết luận.' });
}
/* khiếu nại việc trả lại đơn khởi kiện (nop-don-tra-lai-don, Điều 194 BLTTDS): 4 bước */
var KR_STEPS = ['Đối tượng & thời hiệu', 'Nội dung & người khiếu nại', 'Tài liệu, chứng cứ', 'Xem lại & ký số'];
var KR_TITLE = 'Khiếu nại việc trả lại đơn';
function KrThuTuc() {
  return h('section', { className: 'kr-tt' }, h('p', { className: 'kr-tt-h' }, h('span', null, 'Thủ tục bạn đã chọn'), h('span', { className: 'dg-an' }, 'ĐIỀU 194 BLTTDS')),
    h('b', null, 'Khiếu nại việc trả lại đơn khởi kiện'), RvKV([['Gửi tới', 'Chánh án Tòa án đã trả lại đơn khởi kiện'], ['Hạn cuối khiếu nại', '10/11/2026'], ['Thủ tục áp dụng', '10 ngày kể từ ngày nhận được văn bản trả lại đơn khởi kiện (Điều 194.1)']]));
}
function Kr1() {
  return Wz({ title: KR_TITLE, steps: KR_STEPS, n: 1, go: 'kr2', body: h(F, null, KrThuTuc(),
    NvCallS('warning', h(F, null, h('b', null, 'Sắp hết thời hạn khiếu nại — chỉ còn 3 ngày. '), 'Hạn cuối: 10/11/2026. Tính từ ngày nhận thông báo 31/10/2026.')),
    FCard('Vụ việc bị trả lại đơn', RvKV([['Vụ việc', 'Tranh chấp hợp đồng cung ứng dịch vụ · TN-20261012-0007'], ['V/v', 'Khiếu nại việc trả lại đơn khởi kiện'], ['Văn bản trả lại', 'Thông báo trả lại đơn khởi kiện · 31/10/2026'], ['Kính gửi', 'Chánh án Tòa án nhân dân khu vực 1 - Hà Nội']]), true),
    NvCallS('info', 'Chánh án phân công Thẩm phán mở phiên họp xem xét trong 05 ngày làm việc kể từ ngày được phân công (Điều 194.2).')) });
}
function Kr2() {
  var tt = React.useState(''), db = React.useState(''), yc = React.useState(''), kh = React.useState([]);
  return Wz({ title: KR_TITLE, steps: KR_STEPS, n: 2, go: 'kr3', body: h(F, null,
    FCard('Nội dung khiếu nại', h(F, null, Lead('Trình bày trung thực, có mốc thời gian cụ thể — đây là căn cứ để người có thẩm quyền xác minh.'),
      Tf('Tóm tắt nội dung', { required: true, value: tt[0], onChange: function (e) { tt[1](e.target.value); }, placeholder: 'Một câu nêu rõ vấn đề, VD: Chậm giao bản sao biên bản phiên họp' }),
      Tf('Diễn biến, nội dung khiếu nại', { required: true, multiline: true, value: db[0], onChange: function (e) { db[1](e.target.value); }, placeholder: 'Nêu rõ thời gian, địa điểm, người liên quan, các mốc diễn biến và hậu quả…' }),
      Tf('Yêu cầu giải quyết khiếu nại', { required: true, multiline: true, value: yc[0], onChange: function (e) { yc[1](e.target.value); }, placeholder: 'VD: Đề nghị Chánh án hủy bỏ quyết định… / yêu cầu xác minh và xử lý theo quy định…' })), true),
    FCard('Đơn của bạn còn nội dung nào khác không?', h(F, null, Lead('Mỗi loại nội dung có luồng giải quyết, thẩm quyền và thời hạn riêng. Chọn đúng để Tòa án xử lý ngay từ đầu, tránh phải trả đơn hoặc kéo dài thời gian.'),
      h('div', { className: 'tr-yc' }, [['Có nội dung về quản lý hành chính của Tòa án', 'VD: thái độ tiếp công dân, chậm trả kết quả, thu phí không đúng.'], ['Có nội dung tố cáo hành vi vi phạm của cán bộ', 'VD: nhận tiền, tiết lộ thông tin vụ án, vi phạm quy tắc ứng xử.'], ['Có nội dung thuộc cơ quan khác ngoài Tòa án', 'VD: việc của Viện kiểm sát, cơ quan thi hành án, Ủy ban nhân dân.']].map(function (x, i) {
        return h(T.Checkbox, { key: i, checked: kh[0].indexOf(i) >= 0, onChange: function (e) { kh[1](e.target.checked ? kh[0].concat([i]) : kh[0].filter(function (y) { return y !== i; })); }, label: h('span', { className: 'sg-ng' }, h('b', null, x[0]), h('small', null, x[1])) });
      }))), true),
    FCard('Người khiếu nại', RvKV([['Họ và tên', 'Hoàng Dương (chính bạn)'], ['Số định danh', h('span', { className: 'tp-num' }, '001090012345')], ['Địa chỉ thường trú', 'Số 8 Phạm Hùng, Phường Từ Liêm, Thành phố Hà Nội']]), true)) });
}
function Kr3() {
  return Wz({ title: KR_TITLE, steps: KR_STEPS, n: 3, go: 'kr4', body: h(F, null,
    FCard('Tài liệu, chứng cứ kèm theo', h(F, null, Lead('Hệ thống tự lấy các tài liệu đã có trên Cổng. Bạn chỉ cần tải lên tài liệu, chứng cứ do bạn cung cấp.'),
      DtDocs([['Đơn khiếu nại — hệ thống tạo tự động từ nội dung bạn đã khai', 'Đã có trên hệ thống'], ['Thông báo trả lại đơn khởi kiện', 'Đã có trên hệ thống']]),
      h(T.FileUpload, { hint: 'Chưa có tài liệu', uploadLabel: 'Tải lên tài liệu, chứng cứ', accept: '.pdf,.jpg,.png,.docx' })), true),
    NvCallS('info', h(F, null, h('b', null, 'Lưu ý định dạng tệp. '), 'Tài liệu, chứng cứ có thể được bổ sung sau theo yêu cầu của người giải quyết.'))) });
}
function Kr4() {
  return h(KyGuiDon, { title: KR_TITLE, steps: KR_STEPS, kyTitle: 'Xem lại & ký gửi', ok: 'krOk', tep: ['Đơn khiếu nại việc trả lại đơn', 'Tài liệu, chứng cứ'], tepMeta: 'Xem trước đơn', vaiTro: 'Người khiếu nại', sendLabel: 'Ký số & gửi đơn',
    lead: 'Kiểm tra lại toàn bộ thông tin trước khi ký số và gửi đến Tòa án.', camDoan: 'Tôi cam đoan nội dung khiếu nại là đúng sự thật và chịu trách nhiệm trước pháp luật.',
    top: FCard('Thông tin đơn', RvKV([['Vụ việc liên quan', 'Tranh chấp hợp đồng cung ứng dịch vụ · TN-20261012-0007'], ['Tóm tắt', 'Khiếu nại việc Tòa án trả lại đơn khởi kiện khi chưa hết thời hạn sửa đổi, bổ sung.'], ['Yêu cầu giải quyết', 'Đề nghị xem xét, xử lý trách nhiệm cán bộ liên quan và trả kết quả đúng hạn.'], ['Người khiếu nại', 'Hoàng Dương (chính bạn)'], ['Tài liệu kèm theo', '2 tệp']]), true) });
}
function KrOk() {
  return h(OkScr, { title: 'Đã gửi đơn thành công', text: 'Chánh án phân công Thẩm phán mở phiên họp xem xét trong 05 ngày làm việc kể từ ngày được phân công (Điều 194.2).', info: [['Mã tiếp nhận', '[Mã tiếp nhận]'], ['Cơ quan giải quyết', 'Chánh án Tòa án đã trả lại đơn khởi kiện'], ['Trạng thái', 'Chờ tiếp nhận']],
    btns: h(F, null, Btn('Xem tiến trình giải quyết', 'primary', { 'data-pt-go': 'reset:home,complaints,complaintTt' }), Btn('Về danh sách hồ sơ', 'secondary', { 'data-pt-go': 'reset:home,complaints' })) });
}
/* ===== Cá nhân / Giao dịch điện tử (web /giao-dich-dien-tu, 03/11/2026 v162): cam kết lại theo vai trò + lịch sử xác nhận ===== */
/* nội dung điều khoản lấy từ API theo vai trò – dưới đây dùng nội dung Quy chế mẫu của web (components/gddt/quy-che-gddt) */
var GD_QC = [['Điều 1. Phạm vi & đối tượng áp dụng', 'Quy chế này quy định việc thực hiện các giao dịch điện tử giữa cá nhân, cơ quan, tổ chức với Tòa án nhân dân trên Cổng dịch vụ tư pháp, bao gồm nộp đơn, nhận tống đạt văn bản tố tụng, thanh toán án phí và các thủ tục hành chính tư pháp khác.'],
  ['Điều 2. Điều kiện tham gia', 'Người dùng phải có tài khoản định danh điện tử hợp lệ (VNeID) và cam kết tuân thủ Quy chế này. Việc xác thực khi giao dịch được thực hiện bằng chữ ký số hoặc phương thức xác thực điện tử hợp lệ do Hệ thống chấp nhận.'],
  ['Điều 3. Giá trị pháp lý', 'Thông điệp dữ liệu, tài liệu điện tử được tạo lập, gửi, nhận đúng quy định có giá trị pháp lý như văn bản giấy. Thời điểm gửi, nhận được ghi nhận bằng dấu thời gian của Hệ thống và là căn cứ xác định thời hạn tố tụng.'],
  ['Điều 4. Trách nhiệm của người dùng', 'Người dùng tự chịu trách nhiệm về tính chính xác, trung thực của thông tin cung cấp; bảo mật tài khoản, thiết bị và phương tiện xác thực; thường xuyên theo dõi hộp thư điện tử để nhận văn bản tống đạt đúng hạn.'],
  ['Điều 5. Tạm ngưng, hủy giao dịch điện tử', 'Người dùng có quyền yêu cầu tạm ngưng hoặc hủy giao dịch điện tử. Khi tạm ngưng hoặc hủy, người dùng phải đăng ký phương thức nhận văn bản thay thế; nghĩa vụ tố tụng và thời hạn không thay đổi. Tòa án trả lời yêu cầu trong tối đa 03 ngày làm việc.'],
  ['Điều 6. Xử lý sự cố', 'Trường hợp Hệ thống gặp sự cố kéo dài quá 03 ngày, Tòa án chuyển sang phương thức giao dịch thay thế để bảo đảm quyền, lợi ích hợp pháp của người dùng. Thời gian sự cố không tính vào thời hạn tố tụng.'],
  ['Điều 7. Điều khoản thi hành', 'Quy chế có hiệu lực kể từ ngày ban hành. Việc sửa đổi, bổ sung do Tòa án nhân dân tối cao quyết định và thông báo trên Cổng. — Hết —']];
var GD_QD = [['[Tên quy định đính kèm]', '01/07/2026']];
/* v175: quy định đính kèm của điều khoản – có thể nhiều tệp (dữ liệu mẫu) */
var GD_QDK = [['[Tên quy định đính kèm 1]', '01/07/2026', 'PDF', '1,2 MB'], ['[Tên quy định đính kèm 2]', '01/07/2026', 'PDF', '860 KB'], ['[Tên quy định đính kèm 3]', '15/08/2026', 'DOCX', '240 KB']];
/* v167: hiển thị chữ thường (web trả tên in hoa) */
var GD_DK = 'Cam kết thực hiện các điều kiện pháp lý khi giao dịch điện tử với Tòa án';
/* bản ghi 1 theo dữ liệu web (ảnh người dùng gửi 03/11/2026); các bản ghi sau là mẫu để thể hiện nhiều phiên ký */
var GD_LS0 = [{ ma: 'CK-2026-310', dk: GD_DK, ngayDk: '02/10/2026', vt: ['Đương sự'], tg: '08/10/2026', gio: '10:22:33', qd: 1 },
  { ma: 'CK-2026-[mẫu 2]', dk: GD_DK, ngayDk: '01/07/2026', vt: ['Đương sự', 'Người đại diện'], tg: '15/08/2026', gio: '14:05:10', qd: 1 },
  { ma: 'CK-2026-[mẫu 1]', dk: GD_DK, ngayDk: '01/07/2026', vt: ['Đương sự'], tg: '02/07/2026', gio: '08:45:03', qd: 2 }];
/* lịch sử (v164, phương án A): mỗi phiên ký cam kết 1 thẻ – đầu thẻ 'Phiên ký ngày · giờ' (+ Mới nhất), tên điều khoản, ngày điều khoản · mã giao dịch, vai trò, liên kết Điều khoản cam kết */
function GdLichSu(p) {
  if (!p.ds.length) return h('p', { className: 'dg-khoi-e' }, 'Chưa có giao dịch nào. Xác nhận cam kết để bắt đầu giao dịch điện tử với Tòa án.');
  return h('ul', { className: 'gd-ls' }, p.ds.map(function (x, i) {
    return h('li', { key: x.ma }, /* v167: bỏ dòng Phiên ký + Mới nhất */
      h('b', null, x.dk), h('small', null, 'Mã giao dịch ', h('span', { className: 'tp-num' }, x.ma), ' · Điều khoản ngày ' + x.ngayDk),
      h('div', { className: 'dg-tags' }, x.vt.map(function (v) { return h('span', { key: v, className: 'vk-tag' }, v); }))); /* v272: bỏ nút "Tải quyết định/nghị quyết (n)" */
  }));
}
/* v165 (người dùng duyệt): trang Giao dịch điện tử – khi cần ký hiện khối nhắc như Trang chủ; bấm Xác nhận cam kết ngay → màn Cam kết giao dịch điện tử riêng (CkForm) */
var GD_VT_MOI = [{ id: 1, t: 'Công dân' }, { id: 2, t: 'Luật sư' }];
var GD_VT_LAI = [{ id: 2, t: 'Luật sư' }, { id: 3, t: 'Người đại diện theo ủy quyền', k1: true }];
function GdScr(p) {
  var ls = React.useState(p.none ? [] : GD_LS0), qd = React.useState(p.qd ? GD_LS0[0] : null), anchor = React.useRef(null), host = useHost(anchor);
  var canKy = !p.ok;
  return Sub('Giao dịch điện tử', h(F, null, h('span', { ref: anchor, hidden: true }),
    /* v299: bỏ khối nhắc 'Bạn chưa hoàn thiện cam kết giao dịch điện tử' (CkBanner) */
    h('section', { className: 'gd-card' }, h('div', { className: 'gd-card-h' }, h('div', null, h('h2', null, 'Lịch sử giao dịch điện tử'), h('p', null, 'Toàn bộ lần xác nhận cam kết giao dịch điện tử theo vai trò — kèm dấu thời gian (Điều 10 NQ 01/2026).'))),
      h(GdLichSu, { ds: ls[0], onQd: qd[1] })),
    qd[0] && host ? h(LvSheet, { host: host, title: 'Danh sách quyết định/nghị quyết', onClose: function () { qd[1](null); } }, h('div', { className: 'gd-sh' }, P(qd[0].dk, 'ph-muted'),
      DtDocs(GD_QD.map(function (q) { return [q[0], 'Tệp PDF']; })), Btn('Tải quyết định/nghị quyết', 'secondary', { block: true, icon: 'download', 'data-pt-go': 'snack:Đang tải quyết định/nghị quyết' }))) : null));
}
/* màn riêng Cam kết giao dịch điện tử: chọn vai trò → điều khoản (cuộn hết) → ô xác nhận → nút */
function CkForm(p) {
  var lai = !p.moi, cho = lai ? GD_VT_LAI : GD_VT_MOI;
  var qs = React.useState(false), qa = React.useRef(null), qh = useHost(qa), chon = React.useState([]), xem = React.useState(null), doc = React.useState({}), dy = React.useState(false);
  var dangXem = xem[0], daDoc = dangXem != null && doc[0][dangXem], tatCaDoc = chon[0].length && chon[0].every(function (id) { return doc[0][id]; });
  var docXong = function (el) { if (el && dangXem != null && el.scrollHeight - el.scrollTop - el.clientHeight < 16 && !doc[0][dangXem]) { var n = Object.assign({}, doc[0]); n[dangXem] = true; doc[1](n); } };
  var bam = function (r) {
    if (r.k1) return;
    if (chon[0].indexOf(r.id) < 0) {
      var chua = chon[0].filter(function (id) { return !doc[0][id]; })[0];
      if (chua != null) { ptSnack('Vui lòng đọc hết nội dung điều khoản của vai trò đang chọn trước khi chọn thêm vai trò khác.'); xem[1](chua); return; }
      chon[1](chon[0].concat([r.id])); xem[1](r.id);
    } else { var con = chon[0].filter(function (x) { return x !== r.id; }); chon[1](con); var n = Object.assign({}, doc[0]); delete n[r.id]; doc[1](n); xem[1](con.length ? con[con.length - 1] : null); }
  };
  var vtXem = cho.filter(function (r) { return r.id === dangXem; })[0], du = dy[0] && tatCaDoc;
  return SubS('Cam kết giao dịch điện tử', h(F, null,
    lai ? h('p', { className: 'gd-lead' }, 'Điều khoản hoặc quan hệ điều khoản-vai trò dưới đây đã hết hiệu lực — vui lòng xác nhận lại để tiếp tục sử dụng đầy đủ quyền giao dịch điện tử với (các) vai trò tương ứng.')
      : h('p', { className: 'gd-lead' }, 'Xác nhận cam kết theo (các) vai trò tham gia tố tụng để nộp đơn và nhận tống đạt văn bản điện tử.'),
    FCard('Giao dịch điện tử với vai trò *', h('div', { className: 'gd-vt' }, h('p', { className: 'gd-vt-d' }, 'Mỗi vai trò có thể đang gắn với điều khoản khác nhau — bấm chọn 1 vai trò để xem đúng nội dung điều khoản của vai trò đó bên dưới.'),
      h('div', { className: 'gd-vt-l gd-vt-cb' }, cho.map(function (r) { var on = chon[0].indexOf(r.id) >= 0; return h(T.Checkbox, { key: r.id, checked: on, disabled: !!r.k1, onChange: function () { bam(r); }, label: h('span', { className: 'gd-vt-lb' }, r.t, r.k1 ? h('small', null, 'Chưa có cam kết giao dịch điện tử áp dụng, vui lòng liên hệ Tòa án') : null) }); })) /* v174: checkbox thường, không thẻ */), true),
    FCard('Điều khoản cam kết', !chon[0].length || !vtXem ? h('p', { className: 'gd-hd' }, 'Vui lòng chọn (các) vai trò ở trên để xem nội dung cam kết.')
      : h('div', { className: 'gd-dk' }, h('div', { key: dangXem, className: 'gd-dk-sc', ref: docXong, onScroll: function (e) { docXong(e.currentTarget); }, tabIndex: 0, 'aria-label': 'Nội dung điều khoản cam kết' },
          h('span', { className: 'vk-tag' }, vtXem.t), h('h3', null, 'Quy chế giao dịch điện tử'), GD_QC.map(function (d) { return h('div', { key: d[0] }, h('b', null, d[0]), h('p', null, d[1])); })),
        null /* v272: bỏ dòng "N quy định đính kèm" (và bảng Quy định đính kèm không còn lối mở) */ /* v175 (người dùng chọn C): dòng tóm tắt → bảng danh sách tệp */), true),
    h('span', { ref: qa, hidden: true }), qs[0] && qh ? h(LvSheet, { host: qh, title: 'Quy định đính kèm', onClose: function () { qs[1](false); } }, h('div', { className: 'gd-sh' }, h('ul', { className: 'gd-qdk-l' }, GD_QDK.map(function (q) { return h('li', { key: q[0] }, h('span', { className: 'tp-file-type' }, q[2]), h('span', { className: 'gd-qdk-tx' }, h('b', null, q[0]), h('small', null, 'Áp dụng từ ' + q[1] + ' · ' + q[3])), h('button', { type: 'button', className: 'tp-iconbtn gd-qdk-dl', 'aria-label': 'Tải ' + q[0], 'data-pt-go': 'snack:Đang tải file' }, h(T.Icon, { name: 'download' }))); })), Btn('Tải tất cả (' + GD_QDK.length + ')', 'secondary', { block: true, icon: 'download', 'data-pt-go': 'snack:Đang tải tất cả quy định' }))) : null, h('div', { className: 'ph-commit gd-agree' + (daDoc ? '' : ' gd-agree-off') }, h(T.Checkbox, { checked: dy[0], disabled: !daDoc, onChange: function (e) { dy[1](e.target.checked); }, label: h('span', null, 'Tôi đã đọc, hiểu và cam kết tuân thủ ', h('b', null, 'Quy chế giao dịch điện tử'), '. Tôi chịu trách nhiệm về tính chính xác của thông tin và việc bảo mật phương tiện xác thực.', daDoc ? null : h('small', { className: 'gd-agree-g' }, 'Vui lòng đọc hết nội dung điều khoản trước khi xác nhận.')) }))),
    Bar(Btn(lai ? 'Xác nhận lại' : 'Xác nhận cam kết', 'primary', du ? { 'data-pt-go': 'replace:commitOk', 'data-pt-snack': lai ? 'Đã xác nhận lại cam kết giao dịch điện tử.' : 'Đã xác nhận cam kết giao dịch điện tử.' } : { disabled: true })));
}
function Commit() { return h(GdScr); }

/* ===== 10. Quản lý chữ ký số (web /quan-ly-chu-ky-so) – v178; v235: mobile chỉ ký số từ xa – còn 2 tab Chứng thư số · Lịch sử ký ===== */
/* tài khoản cá nhân: 1 tư cách (Cá nhân) → thẻ mặc định "Chữ ký của bạn"; dữ liệu chứng thư/lịch sử là mẫu */
var SK_CT = [
  { id: 1, ca: 'VNPT-CA', chu: 'HOÀNG DƯƠNG', cap: 'VNPT Certification Authority', serial: '5401…A7C2', hl: '15/03/2026 – 15/03/2027', dung: '28/10/2026', kiem: '15/03/2026', tt: ['Còn hạn', 'success'] },
  { id: 2, ca: 'Viettel-CA', chu: 'HOÀNG DƯƠNG', cap: 'Viettel Certificate Authority', serial: '7A10…09BE', hl: '20/11/2025 – 20/11/2026', dung: 'Chưa dùng', kiem: '20/11/2025', tt: ['Sắp hết hạn', 'warning'] }];
var SK_CA = ['VNPT-CA', 'Viettel-CA', 'BKAV-CA', 'FPT-CA'];
var SK_LS = [
  { tg: '28/10/2026 10:15', don: 'TN-20261020-0012 · Đơn khởi kiện', tt: ['Thành công', 'success'], ca: 'VNPT-CA · 5401…A7C2', tep: [2, 2], ds: [['Don-khoi-kien.pdf', 'Đã ký', true], ['Ban-ke-tai-lieu-chung-cu.pdf', 'Đã ký', true]] },
  { tg: '21/10/2026 09:02', don: 'KN-2026-0012 · Đơn khiếu nại', tt: ['Ký một phần', 'warning'], ly: '[Lý do theo mã lỗi của phiên ký]', ca: 'VNPT-CA · 5401…A7C2', tep: [1, 2], ds: [['Don-khieu-nai.pdf', 'Đã ký', true], ['Tai-lieu-kem-theo.pdf', 'Lỗi', false, '[Mô tả lỗi của tệp]']] },
  { tg: '15/10/2026 16:40', don: 'Đơn #1024 · Đơn đề nghị miễn, giảm án phí', tt: ['Thất bại', 'danger'], ly: '[Lý do theo mã lỗi của phiên ký]', ca: 'Viettel-CA · 7A10…09BE', tep: [0, 1], ds: [['De-nghi-mien-giam.pdf', 'Lỗi', false, '[Mô tả lỗi của tệp]']] }];
/* v235: mobile không có USB ký số – bỏ chọn nguồn ký, chỉ còn ký số từ xa */
function SkMacDinh(p) {
  var md = !p.none;
  return h('div', { className: 'sk-md' },
    h('div', { className: 'sk-md-h' }, p.title === null ? h('span') : h('b', null, p.title || 'Chữ ký của bạn'), /* v333 */ h(T.StatusBadge, { tone: md ? 'success' : 'neutral', icon: false }, md ? 'Mặc định: Ký số từ xa · ' + (p.ct || SK_CT)[0].ca : 'Chưa đặt mặc định')),
    !p.none ? h(SelSheet, { label: 'Chứng thư ký số từ xa đã khai báo', ph: '— Chọn chứng thư —', v: md ? 'c' + (p.ct || SK_CT)[0].id : '', opts: (p.ct || SK_CT).map(function (c) { return { id: 'c' + c.id, name: [c.chu, c.ca, c.serial].join(' · '), desc: 'Hiệu lực ' + c.hl }; }) })
      : h('p', { className: 'sk-note' }, 'Chưa có chứng thư ký số từ xa còn hiệu lực cho ' + (p.dd ? 'người đại diện' : 'tư cách') + ' này. Bấm “Khai báo chứng thư” ở danh sách bên dưới để hệ thống kiểm tra và thêm vào.'),
    h('div', { className: 'sk-md-f' }, md ? h(T.Button, { size: 'sm', variant: 'secondary', 'data-pt-go': 'signDelDef' }, 'Xóa mặc định') : null,
      h(T.Button, { size: 'sm', disabled: !md, 'data-pt-go': 'snack:Đã lưu phương thức ký mặc định' }, 'Lưu mặc định')));
}
function SkThe(c) {
  return h('li', { key: c.id, className: 'sk-ct' },
    h('div', { className: 'sk-ct-h' }, h('div', null, h('small', null, 'Ký số từ xa · ' + c.ca), h('b', null, c.chu), h('span', null, c.cap)), h(T.StatusBadge, { tone: c.tt[1], icon: false }, c.tt[0])),
    h('dl', { className: 'sk-dl' }, [['Số serial', c.serial], ['Hiệu lực', c.hl], ['Dùng gần nhất', c.dung], ['Kiểm tra gần nhất', c.kiem]].map(function (r) { return h(F, { key: r[0] }, h('dt', null, r[0]), h('dd', { className: r[0] === 'Số serial' ? 'tp-num' : undefined }, r[1])); })),
    /* v311 (11/11/2026): chân thẻ chứng thư – phương án A: 2 nút nhỏ chia đôi (v343: 2 nút cùng kiểu secondary viền đỏ), thay 2 liên kết chữ căn phải */
    h('div', { className: 'sk-ct-f sk-ct-btns' }, h(T.Button, { size: 'sm', variant: 'secondary', icon: 'swap', 'data-pt-go': 'snack:Đã kiểm lại chứng thư số' }, 'Kiểm lại'),
      h(T.Button, { size: 'sm', variant: 'secondary', icon: 'trash', 'data-pt-go': 'signDelCert' }, 'Xóa khỏi danh sách')));
}
function SkPhuongThuc(p) {
  if (p.err) return h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tải được thông tin chữ ký số.', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: noop, className: 'nv-err' });
  return h(F, null,
    Blk('Chứng thư ký mặc định', h(F, null, Lead('Bước ký số sẽ chọn sẵn chứng thư mặc định này — bạn vẫn đổi được khi ký. Mặc định chọn từ chứng thư đã khai báo ở danh sách bên dưới; cũng có thể tích “Ghi nhớ lựa chọn này” ngay ở bước ký.'), (laTC() ? h(SkTcMacDinh, { none: p.none }) : h(SkMacDinh, { none: p.none })) /* v333 */)),
    Blk('Chứng thư số của bạn', h(F, null, Lead('Khai báo chứng thư để hệ thống kiểm tra trước khi ký; chứng thư cũng được tự ghi nhận sau mỗi lần ký thành công. Xóa khỏi danh sách không ảnh hưởng các văn bản đã ký.'),
      h(T.Button, { variant: 'secondary', block: true, icon: 'plus', 'data-pt-go': 'cert' }, 'Khai báo chứng thư'),
      p.none ? h(T.EmptyState, { text: 'Chưa có chứng thư nào. Bấm “Khai báo chứng thư” để thêm chứng thư ký số từ xa — hệ thống kiểm tra ngay để bạn biết trước khi ký.' })
        : skDs() /* v334 */)));
}
/* v344: Lịch sử ký – chạm vùng thẻ mở bảng từ đáy danh sách tệp đã ký (thay nút Xem tệp/Thu gọn mở rộng tại chỗ) */
function SkTepDs(p) {
  return h('ul', { className: 'sk-tep sk-tep-sh2' }, p.ds.map(function (t) {
    return h('li', { key: t[0] }, h('b', null, t[0]), h('div', null, h('span', { className: t[2] ? 'sk-ok' : 'sk-loi' }, t[1]), t[2] ? h('button', { type: 'button', className: 'me-link', 'data-pt-go': 'snack:Đang mở tệp đã ký' }, h(T.Icon, { name: 'eye' }), 'Xem') : null, t[3] ? h('small', null, t[3]) : null));
  }));
}
function SkLsThe(p) {
  var d = p.d;
  return h('li', { className: 'sk-ls sk-ls-hit' },
    h('button', { type: 'button', className: 'ph-mail2-hit pt-chk', 'aria-haspopup': 'dialog', 'aria-label': 'Xem tệp đã ký của ' + d.don, onClick: p.onMo }),
    h('div', { className: 'sk-ls-h' }, h('div', null, h('small', null, d.tg), h('b', null, d.don)), h(T.StatusBadge, { tone: d.tt[1], icon: false }, d.tt[0])),
    d.ly ? h('p', { className: 'sk-ly' }, d.ly) : null,
    h('div', { className: 'sk-ls-g' }, h('div', null, h('b', null, 'Ký số từ xa'), h('small', null, d.ca)), h('div', null, h('small', null, 'Cá nhân'), h('b', { className: 'tp-num sk-ls-n' }, d.tep[0] + '/' + d.tep[1] + ' tệp', h(T.Icon, { name: 'chevronRight' })))));
}
function SkLichSu(p) {
  var sh = React.useState(false), mo = React.useState(p.open ? 0 : null), anchor = React.useRef(null), host = useHost(anchor), ds = p.rong || p.sai ? [] : SK_LS, d = mo[0] === null ? null : ds[mo[0]];
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    Filt(h('div', { className: 'sk-ngay' }, Tf('Từ ngày', Dt({ value: p.sai ? '28/10/2026' : '05/10/2026' })), Tf('Đến ngày', Dt({ value: p.sai ? '01/10/2026' : '04/11/2026' }))),
      h(T.Button, { variant: 'secondary', size: 'sm', icon: 'filter', className: 'sk-loc-b', onClick: function () { sh[1](true); } }, 'Đơn · Trạng thái')),
    p.sai ? h('p', { className: 'sk-sai', role: 'alert' }, 'Khoảng thời gian không hợp lệ — “Đến ngày” phải sau “Từ ngày” và tối đa 12 tháng.')
      : ds.length ? h(F, null, h('p', { className: 'nv-sub' }, ds.length + ' lần ký'), h('ul', { className: 'sk-lss' }, ds.map(function (x, i) { return h(SkLsThe, { key: i, d: x, onMo: function () { mo[1](i); } }); })))
      : h(T.EmptyState, { icon: 'clock', text: 'Không có lần ký nào trong khoảng đã chọn.' }),
    sh[0] && host ? h(LvSheet, { host: host, title: 'Lọc lịch sử ký', onClose: function () { sh[1](false); }, foot: h(F, null, h(T.Button, { variant: 'secondary', onClick: noop }, 'Nhập lại'), h(T.Button, { onClick: function () { sh[1](false); } }, 'Áp dụng')) },
      h('div', { className: 'kn-loc' }, h(SelSheet, { label: 'Đơn', ph: 'Tất cả đơn', opts: SK_LS.map(function (x) { return x.don; }) }),
        h(SelSheet, { label: 'Trạng thái', ph: 'Tất cả', opts: ['Thành công', 'Ký một phần', 'Thất bại', 'Hết thời gian chờ', 'Đang chờ'] }))) : null,
    d && host ? h(LvSheet, { host: host, title: 'Danh sách tệp đã ký', onClose: function () { mo[1](null); } }, h(SkTepDs, { ds: d.ds })) : null);
}
function SignScr(p) {
  var tab = React.useState(p.tab || 'pt'), t = tab[0];
  return Sub('Quản lý chữ ký số', h(F, null,
    h('div', { className: 'dg-tabs' }, h(T.Tabs, { label: 'Quản lý chữ ký số', value: t, onChange: tab[1], items: [{ key: 'pt', label: 'Chứng thư số' }, { key: 'ls', label: 'Lịch sử ký' }] })), /* v235: bỏ tab Hướng dẫn cài USB ký số */
    t === 'pt' ? h(F, null, h(NvCall, { tone: 'info', title: 'Ký số từ xa trên điện thoại.' }, 'Ứng dụng chỉ hỗ trợ chữ ký số từ xa (VNPT, Viettel, BKAV, FPT…). Khi ký, bạn xác nhận trên ứng dụng ký số của nhà cung cấp.'), h(SkPhuongThuc, { none: p.none, err: p.err })) : h(SkLichSu, { rong: p.rong, sai: p.sai, open: p.open }),
    p.top || null));
}
function Sign() { return h(SignScr); }
/* v235: khai báo chứng thư – chỉ chứng thư ký số từ xa (bỏ USB ký số) */
function Cert(p) {
  p = p || {};
  var ca = React.useState(''), sdt = React.useState(p.ca ? '0912345678' : '');
  return Sub('Khai báo chứng thư ký số từ xa', h(F, null,
    Lead('Hệ thống kiểm tra chứng thư ngay bây giờ để bạn biết trước khi ký. Khai báo không tự đặt mặc định — bạn chọn mặc định ở phần phía trên.'),
    Blk(null, h(F, null, h(SelSheet, { label: 'Nhà cung cấp chứng thư số', ph: '— Chọn nhà cung cấp —', v: p.ca ? 'VNPT-CA' : '', opts: SK_CA, onChange: ca[1] }),
      Tf('Tài khoản ký số từ xa', { required: true, value: sdt[0], onChange: function (e) { sdt[1](e.target.value); }, placeholder: 'Số điện thoại hoặc mã định danh đã đăng ký với nhà cung cấp', help: 'Hệ thống gửi yêu cầu kiểm tra đến ứng dụng ký số của nhà cung cấp.' })))),
    Bar(Btn('Hủy', 'secondary', { 'data-pt-go': 'back' }), Btn('Kiểm tra & khai báo', 'primary', (p.ca || ca[0]) && sdt[0] ? { 'data-pt-go': 'backTo:sign', 'data-pt-snack': 'Đã khai báo chứng thư số' } : { disabled: true })));
}
function SignFile() {
  return Sub('Thử ký tệp', h(F, null, h('p', { className: 'sk-note' }, '[Màn chỉ có ở bản chạy thử (dev/test) – không có mục điều hướng trên bản phát hành]'),
    Blk('Thử ký tệp', h(T.FileUpload, { hint: 'Chưa chọn tài liệu', uploadLabel: 'Chọn tài liệu PDF', accept: '.pdf' }))), Bar(Btn('Kiểm tra trước khi ký')));
}

/* ===== 11. Trợ giúp pháp lý (web /tro-giup-phap-ly, công khai: Tra cứu điểm · Điều kiện miễn phí) – v179 ===== */
/* điểm lấy từ DM_DIEM_TGPL, diện lấy từ DM_DIEN_TGPL – dữ liệu dưới đây là mẫu */
var TG_DIEM = [
  { ma: 'd1', loai: 'Trung tâm TGPL nhà nước', ten: 'Trung tâm Trợ giúp pháp lý nhà nước TP. Hà Nội', dc: 'Số 1 Tôn Thất Thuyết, Phường Cầu Giấy, Thành phố Hà Nội', tinh: 'TP. Hà Nội', lv: ['Hình sự', 'Dân sự', 'Hành chính'], dd: 'Trần Thị Mai', sdt: '024 3833 0001', gio: 'Thứ Hai – Thứ Sáu, 8:00 – 17:00', tu: '01/01/2020' },
  { ma: 'd2', loai: 'Trung tâm TGPL nhà nước', ten: 'Trung tâm Trợ giúp pháp lý nhà nước TP. Hồ Chí Minh', dc: 'Số 141 Pasteur, Phường Xuân Hòa, Thành phố Hồ Chí Minh', tinh: 'TP. Hồ Chí Minh', lv: ['Dân sự', 'Lao động'], dd: 'Lê Văn Khoa', sdt: '028 3829 0002', tu: '01/01/2020' },
  { ma: 'd3', loai: 'Tổ chức hành nghề luật sư', ten: 'Công ty Luật TNHH Minh Pháp', dc: 'Số 25 Láng Hạ, Phường Láng, Thành phố Hà Nội', tinh: 'TP. Hà Nội', lv: ['Hình sự'], dd: 'Nguyễn Hữu Thắng', sdt: '024 3562 0003', tu: '15/06/2023' }];
var TG_TINH = ['Tất cả', 'TP. Hà Nội', 'TP. Hồ Chí Minh', 'TP. Đà Nẵng', 'TP. Hải Phòng', 'TP. Cần Thơ'];
var TG_DIEN = ['Người có công với cách mạng', 'Người thuộc hộ nghèo', 'Trẻ em', 'Người dân tộc thiểu số cư trú ở vùng có điều kiện kinh tế – xã hội đặc biệt khó khăn', 'Người bị buộc tội từ đủ 16 tuổi đến dưới 18 tuổi', 'Người bị buộc tội thuộc hộ cận nghèo', 'Người khuyết tật có khó khăn về tài chính', 'Nạn nhân trong vụ việc bạo lực gia đình có khó khăn về tài chính'];
var TG_GT = 'Liên hệ điểm trợ giúp pháp lý để được hướng dẫn';
function TgThe(d) {
  return h('li', { key: d.ma, className: 'tg-c' }, h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem chi tiết ' + d.ten, 'data-pt-go': 'aidPoint' }),
    h('span', { className: 'tg-loai' }, d.loai), h('b', null, d.ten),
    h('span', { className: 'tg-dc' }, h(T.Icon, { name: 'mapPin' }), d.dc),
    h('span', { className: 'tg-lv' }, d.lv.map(function (x) { return h('span', { key: x }, x); })),
    h(T.Button, { size: 'sm', variant: 'secondary', 'data-pt-go': 'aidPoint' }, 'Xem chi tiết'));
}
function TgDiem(p) {
  var q = React.useState(p.q || ''), tinh = React.useState(p.tinh || ''), ds = TG_DIEM.filter(function (d) {
    var k = khongDau(q[0].trim()); return (!k || khongDau(d.ten).indexOf(k) >= 0) && (!tinh[0] || tinh[0] === 'Tất cả' || d.tinh === tinh[0]);
  }), loc = !!(q[0].trim() || (tinh[0] && tinh[0] !== 'Tất cả'));
  if (p.rong) ds = [];
  return h(F, null,
    Blk('Tìm điểm trợ giúp pháp lý', h(F, null, Lead('Theo tên tổ chức hoặc địa bàn tỉnh/thành'),
      Tf('Tên tổ chức', { icon: 'search', placeholder: 'Ví dụ: Trung tâm trợ giúp pháp lý...', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } }),
      h(SelSheet, { key: 'tinh' + tinh[0], label: 'Tỉnh/Thành', ph: 'Tất cả', v: tinh[0], opts: TG_TINH, onChange: tinh[1], search: true }))),
    ds.length ? h(F, null, h('p', { className: 'nv-sub' }, h('b', null, ds.length + ' điểm'), [tinh[0] && tinh[0] !== 'Tất cả' ? tinh[0] : '', q[0].trim() ? '“' + q[0].trim() + '”' : ''].filter(Boolean).map(function (x) { return ' · ' + x; }).join('')),
      h('ul', { className: 'tg-l' }, ds.map(TgThe)), h('p', { className: 'tg-trang' }, 'Hiển thị ' + ds.length + '/' + ds.length + ' điểm'))
      : h(T.EmptyState, { icon: 'search', text: 'Không tìm thấy điểm trợ giúp pháp lý phù hợp', actionLabel: loc || p.rong ? 'Xoá bộ lọc' : undefined, onAction: function () { q[1](''); tinh[1](''); } }));
}
function TgDieuKien(p) {
  var q = React.useState(p.q || ''), k = khongDau(q[0].trim()), ds = TG_DIEN.filter(function (d) { return !k || khongDau(d).indexOf(k) >= 0; });
  return h(F, null,
    h('div', { className: 'tg-nt' }, h('p', null, h(T.Icon, { name: 'info' }), 'Vui lòng liên hệ điểm trợ giúp pháp lý để được hướng dẫn giấy tờ chứng minh cần chuẩn bị.'),
      h(T.Button, { size: 'sm', variant: 'secondary', icon: 'mapPin', onClick: p.onXemDiem }, 'Tra cứu điểm trợ giúp')),
    p.loi ? h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tải được danh sách diện, vui lòng thử lại sau.', className: 'nv-err' }) : h(F, null,
      Filt(Tf('Tìm diện được trợ giúp', { icon: 'search', placeholder: 'Tìm diện được trợ giúp, ví dụ: hộ nghèo...', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })),
      ds.length ? Blk('Diện được trợ giúp', h('ul', { className: 'tg-dien' }, ds.map(function (d) { return h('li', { key: d }, h('b', null, d), h('small', null, h('span', null, 'Giấy tờ chứng minh: '), TG_GT)); })), { flush: true })
        : h(T.EmptyState, { icon: 'search', text: 'Không tìm thấy diện phù hợp', actionLabel: 'Xoá tìm kiếm', onAction: function () { q[1](''); } })));
}
function AidScr(p) {
  var tab = React.useState(p.tab || 'diem');
  return Sub('Trợ giúp pháp lý', h(F, null,
    h('div', { className: 'dg-tabs' }, h(T.Tabs, { label: 'Trợ giúp pháp lý', value: tab[0], onChange: tab[1], items: [{ key: 'diem', label: 'Tra cứu điểm', count: p.rong ? 0 : TG_DIEM.length }, { key: 'dk', label: 'Điều kiện miễn phí' }] })),
    tab[0] === 'diem' ? h(TgDiem, { rong: p.rong, q: p.q }) : h(TgDieuKien, { q: p.q, loi: p.loi, onXemDiem: function () { tab[1]('diem'); } })));
}
function Aid() { return h(AidScr); }
function AidPoint() {
  var d = TG_DIEM[0];
  return Sub('Chi tiết điểm trợ giúp', h(F, null,
    Blk(d.ten, h(F, null, Rows([['Loại tổ chức', d.loai], ['Địa chỉ', d.dc], ['Người đại diện', d.dd], ['Số điện thoại', h('a', { className: 'tg-tel', href: '#', onClick: function (e) { e.preventDefault(); } }, d.sdt)], ['Giờ làm việc', d.gio], ['Lĩnh vực trợ giúp', d.lv.join(', ')]]),
      h('p', { className: 'tg-tu' }, 'Hoạt động từ: ' + d.tu)))),
    Bar(Btn('Xem vị trí & chỉ đường', 'primary', { icon: 'mapPin', block: true, 'data-pt-go': 'snack:Mở bản đồ chỉ đường' })));
}

/* ===== 12. Đơn phản tố / yêu cầu độc lập + nộp ý kiến (web /nop-don-phan-to, /nop-don-yeu-cau-doc-lap, /nop-y-kien-phan-to, /nop-y-kien-yeu-cau-doc-lap) – v182 ===== */
var PX_STEPS = ['Giải thích', 'Thông tin vụ án', 'Các bên', 'Nội dung yêu cầu', 'Tài liệu', 'Xem lại & gửi'];
var PX = {
  pt: { id: 'px', ten: 'Nộp đơn phản tố', don: 'đơn phản tố', donHoa: 'Đơn phản tố', yc: 'yêu cầu phản tố', la: '“Phản tố” là gì?',
    dn: 'Là quyền của bị đơn đưa ra yêu cầu kiện ngược lại nguyên đơn, được xem xét, giải quyết ngay trong vụ án đang diễn ra — không phải khởi kiện thành vụ án mới.',
    phi: 'Chưa nộp tạm ứng án phí phản tố', phiT: 'Yêu cầu phản tố sẽ KHÔNG được đưa vào vụ án cho đến khi bạn hoàn thành nộp tạm ứng án phí theo thông báo của Tòa án.',
    vt: 'Bị đơn', benT: 'Bên bị phản tố', benD: 'Bạn là bị đơn trong vụ án. Chọn bên bị phản tố — thường là nguyên đơn.', ben: [['Nguyễn Văn Hùng', 'Nguyên đơn']],
    vd: 'Ví dụ: Yêu cầu nguyên đơn hoàn trả tiền đặt cọc 50.000.000 VNĐ và bồi thường chi phí sửa chữa 30.000.000 VNĐ.',
    xn: h(F, null, 'Tôi xác nhận yêu cầu phản tố này nhằm ', h('b', null, 'bù trừ, loại trừ hoặc có liên quan'), ' đến yêu cầu của nguyên đơn trong vụ án.'),
    gc: 'Tòa án sẽ thẩm định phạm vi phản tố khi tiếp nhận — yêu cầu phản tố phải nhằm bù trừ, loại trừ hoặc có liên quan đến yêu cầu của nguyên đơn. Nếu không thuộc phạm vi đó, bạn có thể được hướng dẫn khởi kiện thành vụ án riêng.',
    chan: [['Vụ án đã qua giai đoạn cho phép nộp phản tố', 'Đơn phản tố chỉ được nộp khi vụ án đang ở giai đoạn Sơ thẩm — chuẩn bị xét xử.'], ['Bạn không có quyền nộp đơn phản tố', 'Chỉ bị đơn trong vụ án mới có quyền nộp đơn phản tố.'], ['Vụ án đã có bản án', 'Vụ án này đã được giải quyết, không thể nộp đơn phản tố nữa.'], ['Đã quá hạn nộp đơn phản tố', 'Hạn nộp đơn phản tố của vụ án này là 25/10/2026 và đã qua, bạn không thể nộp đơn phản tố nữa.']] },
  yc: { id: 'yx', ten: 'Nộp đơn yêu cầu độc lập', don: 'đơn yêu cầu độc lập', donHoa: 'Đơn yêu cầu độc lập', yc: 'yêu cầu độc lập', la: '“Yêu cầu độc lập” là gì?',
    dn: 'Là quyền của người có quyền lợi, nghĩa vụ liên quan đưa ra yêu cầu riêng của mình, được xem xét, giải quyết cùng vụ án đang diễn ra.',
    phi: 'Chưa nộp tạm ứng án phí yêu cầu độc lập', phiT: 'Yêu cầu độc lập sẽ KHÔNG được đưa vào vụ án cho đến khi bạn hoàn thành nộp tạm ứng án phí theo thông báo của Tòa án.',
    vt: 'Người có quyền lợi, nghĩa vụ liên quan', benT: 'Bên bị yêu cầu', benD: 'Chọn (các) đương sự trong vụ án mà yêu cầu độc lập của bạn hướng tới.', ben: [['Nguyễn Văn Hùng', 'Nguyên đơn'], ['Trần Văn Bình', 'Bị đơn']],
    vd: 'Ví dụ: Yêu cầu được ưu tiên thanh toán khoản vay 800.000.000 VNĐ có tài sản bảo đảm là công trình đang tranh chấp.',
    xn: h(F, null, 'Tôi xác nhận yêu cầu độc lập này ', h('b', null, 'có liên quan'), ' đến việc giải quyết vụ án đang tiến hành.'),
    gc: 'Tòa án sẽ thẩm định yêu cầu độc lập khi tiếp nhận — yêu cầu phải liên quan đến việc giải quyết vụ án đang tiến hành. Nếu không thuộc phạm vi đó, bạn có thể được hướng dẫn khởi kiện thành vụ án riêng.',
    chan: [['Vụ án đã qua giai đoạn cho phép nộp yêu cầu độc lập', 'Đơn yêu cầu độc lập chỉ được nộp khi vụ án đang ở giai đoạn Sơ thẩm — chuẩn bị xét xử.'], ['Bạn không có quyền nộp đơn yêu cầu độc lập', 'Chỉ người có quyền lợi, nghĩa vụ liên quan trong vụ án mới có quyền nộp đơn yêu cầu độc lập.'], ['Vụ án đã có bản án', 'Vụ án này đã được giải quyết, không thể nộp đơn yêu cầu độc lập nữa.'], ['Đã quá hạn nộp đơn yêu cầu độc lập', 'Hạn nộp đơn yêu cầu độc lập của vụ án này là 25/10/2026 và đã qua, bạn không thể nộp đơn yêu cầu độc lập nữa.']] } };
var PX_ND = { pt: 'Yêu cầu nguyên đơn hoàn trả tiền đặt cọc 50.000.000 VNĐ.', yc: 'Yêu cầu được ưu tiên thanh toán khoản vay 800.000.000 VNĐ.' };
function PxVuAn() { return RvKV([['Mã vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Số thụ lý', h('span', { className: 'tp-num' }, '12/2026/TLST-DS')], ['Loại án', 'Dân sự'], ['Toà án thụ lý', COURT1], ['Tên vụ án', 'Tranh chấp hợp đồng vay tài sản']]); }
function PxWz(k, n, body, go) { var c = PX[k]; return Wz({ title: c.ten, steps: PX_STEPS, n: n, go: go || (c.id + (n + 1)), body: body }); }
function Px1(p) {
  var c = PX[p.k];
  return PxWz(p.k, 1, FCard(c.ten, h(F, null, Lead('Trước khi bắt đầu, hãy đọc nhanh phần giải thích dưới đây để hiểu rõ quyền, điều kiện và hệ quả.'),
    HopGhi(c.la, c.dn),
    h(NvCall, { tone: 'success', icon: 'shield', title: 'Điều kiện' }, 'Vụ án đang ở giai đoạn Sơ thẩm – chuẩn bị xét xử. Đơn phải nộp trước khi Tòa mở phiên họp kiểm tra việc giao nộp chứng cứ và hòa giải.'),
    h(NvCall, { tone: 'warning', icon: 'wallet', title: 'Hệ quả án phí' }, 'Sau khi Tòa tiếp nhận, bạn phải nộp tạm ứng án phí trong hạn. Đơn chỉ được đưa vào vụ án khi đã hoàn thành nghĩa vụ này.'),
    p.phi ? h('div', { className: 'rd-hq' }, h('p', { className: 'rd-hq-h' }, h(T.Icon, { name: 'alert' }), c.phi), P(c.phiT, 'ph-muted dt-small')) : null,
    h('p', { className: 'ph-p ph-muted' }, 'Đơn này ', h('b', null, 'không tạo vụ án mới'), ' — yêu cầu của bạn sẽ được xem xét, giải quyết cùng vụ án DS-2026-0012.')), true));
}
function Px2(p) {
  return PxWz(p.k, 2, FCard('Thông tin vụ án', h(F, null, Lead('Đơn của bạn sẽ gắn với vụ án dưới đây. Các thông tin này được lấy tự động và không thể chỉnh sửa.'), PxVuAn(),
    h('p', { className: 'dt-note' }, h(T.Icon, { name: 'lock' }), 'Thông tin định danh vụ án chỉ đọc — đồng bộ từ hệ thống Tòa án.')), true));
}
function Px3(p) {
  var c = PX[p.k], s = React.useState(p.err ? [] : [0]);
  return PxWz(p.k, 3, FCard('Các bên', h(F, null, Lead(c.benD),
    h('p', { className: 'px-lb' }, 'Người nộp đơn'), h('div', { className: 'px-me' }, h('span', { className: 'me-av px-av', 'aria-hidden': 'true' }, 'HD'), h('div', null, h('b', null, 'Hoàng Dương'), h('small', null, c.vt + ' · (Bạn)'))),
    h('p', { className: 'px-lb' }, c.benT, h('span', { className: 'tp-req' }, ' *')), Lead('Chọn một hoặc nhiều đương sự trong vụ án.'),
    h('div', { className: 'gd-vt-l gd-vt-cb' }, c.ben.map(function (b, i) { var on = s[0].indexOf(i) >= 0; return h(T.Checkbox, { key: b[0], checked: on, onChange: function () { s[1](on ? s[0].filter(function (x) { return x !== i; }) : s[0].concat([i])); }, label: h('span', { className: 'gd-vt-lb' }, b[0], h('small', null, b[1])) }); })),
    !s[0].length ? h('p', { className: 'px-err', role: 'alert' }, 'Vui lòng chọn ít nhất một bên.') : null), true));
}
function Px4(p) {
  var c = PX[p.k], yc = React.useState(p.err ? '' : PX_ND[p.k]), gt = React.useState(''), xn = React.useState(!p.err);
  return PxWz(p.k, 4, FCard('Nội dung yêu cầu', h(F, null, Lead('Trình bày rõ yêu cầu của bạn đối với các bên đã chọn.'),
    Tf('Yêu cầu cụ thể', { required: true, multiline: true, rows: 5, value: yc[0], placeholder: c.vd, onChange: function (e) { yc[1](e.target.value); }, error: p.err && !yc[0].trim() ? 'Vui lòng trình bày yêu cầu cụ thể của bạn.' : undefined }),
    Tf('Giá trị tranh chấp (nếu có)', { value: gt[0], placeholder: '0', inputMode: 'numeric', help: 'Đơn vị: VNĐ', onChange: function (e) { gt[1](e.target.value.replace(/[^\d.]/g, '')); } }),
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { checked: xn[0], onChange: function (e) { xn[1](e.target.checked); }, label: h('span', null, c.xn), error: p.err && !xn[0] ? (p.k === 'pt' ? 'Vui lòng tích xác nhận phạm vi phản tố trước khi tiếp tục.' : 'Vui lòng tích xác nhận liên quan đến vụ án trước khi tiếp tục.') : undefined })),
    HopGhi('Lưu ý', c.gc)), true));
}
function Px5(p) {
  return PxWz(p.k, 5, FCard('Tài liệu & chứng cứ', h(F, null, Lead('Định dạng PDF, JPG, PNG, DOCX · tối đa 10MB/tệp. Không bắt buộc đính kèm tài liệu.'),
    h(T.FileUpload, { hint: 'Chỉ chọn được tệp PDF, JPG, PNG, DOCX tối đa 10MB.', uploadLabel: 'Tải lên tài liệu bổ sung', libraryLabel: 'Lấy từ kho dữ liệu cá nhân', files: [{ name: 'bien-ban-dat-coc.pdf', meta: 'Loại tài liệu: [Chọn loại tài liệu] · 640 KB', status: 'done' }] })), true));
}
function Px6(p) {
  var c = PX[p.k];
  return h(KyGuiDon, { title: c.ten, steps: PX_STEPS, lead: 'Kiểm tra lại thông tin trước khi gửi đến Tòa án.', ok: c.id + 'Ok', tep: ['Xem trước ' + c.don, 'bien-ban-dat-coc.pdf'], tepMeta: 'Bản in đơn', vaiTro: c.vt,
    kyTitle: 'Xem lại & gửi', kyNote: 'Vui lòng ký số đơn trước khi gửi.',
    top: FCard('Thông tin đơn', RvKV([['Loại đơn', c.donHoa], ['Vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Người nộp', 'Hoàng Dương (Bạn)'], [c.benT, c.ben[0][0]], ['Yêu cầu cụ thể', PX_ND[p.k]], ['Giá trị tranh chấp', 'Không nêu'], ['Tài liệu đính kèm (1 tệp)', 'bien-ban-dat-coc.pdf']]), true),
    bottom: HopGhi('Trước khi gửi, xin lưu ý', 'Sau khi Tòa án tiếp nhận, bạn sẽ nhận thông báo nộp tạm ứng án phí. Không nộp trong hạn, yêu cầu sẽ không được xem xét.'),
    camDoan: 'Tôi cam đoan các thông tin và tài liệu đã cung cấp là đúng sự thật và chịu trách nhiệm trước pháp luật.' });
}
function PxOk(p) {
  var c = PX[p.k];
  return h(OkScr, { title: 'Đã gửi ' + c.don + ' thành công', text: c.donHoa + ' của bạn đã được tiếp nhận. Tòa án sẽ xem xét và thông báo qua Hộp thư tống đạt.', info: [['Mã đơn', h('span', { className: 'tp-num' }, p.k === 'pt' ? 'PT-2026-0004' : 'YCDL-2026-0002')], ['Thời điểm gửi', '04/11/2026 09:30']],
    btns: h(F, null, Btn('Xem tại Vụ án của tôi', 'primary', { 'data-pt-go': 'reset:records,cases' }), Btn('Về Trang chủ', 'secondary', { 'data-pt-go': 'tab:home' })) });
}
function PxChan(p) {
  var c = PX[p.k], x = p.i < 0 ? ['Thiếu vụ án', 'Bạn cần mở màn này từ 1 vụ án cụ thể trong "Vụ án của tôi".'] : c.chan[p.i];
  return SubS(c.ten, h(F, null, h(T.EmptyState, { variant: 'center', icon: 'lock', title: x[0], text: x[1], actionLabel: 'Về Vụ án của tôi', onAction: noop, className: 'nv-err px-chan' })));
}
/* nộp ý kiến về yêu cầu phản tố / yêu cầu độc lập của đương sự khác (4 bước) */
var YK_STEPS = ['Thông báo của Tòa án', 'Ý kiến của bạn', 'Tài liệu, chứng cứ', 'Xem lại & ký gửi'];
var YK_LOAI = [['DONG_Y_TOAN_BO', 'Đồng ý toàn bộ yêu cầu', 'Tòa án ghi nhận sự thừa nhận của bạn; bên nộp đơn không phải chứng minh phần bạn đã thừa nhận.'], ['DONG_Y_MOT_PHAN', 'Đồng ý một phần', 'Nêu rõ phần bạn đồng ý và phần bạn không đồng ý.'], ['KHONG_DONG_Y', 'Không đồng ý', 'Trình bày lý do và căn cứ bác bỏ yêu cầu.']];
var YK = { pt: { id: 'pyk', nguoi: 'Trần Văn Bình', vb: 'Thông báo thụ lý yêu cầu phản tố số 05/2026/TB-TLPT' }, yc: { id: 'yyk', nguoi: 'Lê Thị Hoa', vb: 'Thông báo thụ lý yêu cầu độc lập số 02/2026/TB-TLYC' } };
function YkWz(k, n, body, go) { var c = PX[k]; return Wz({ title: 'Nộp ý kiến', steps: YK_STEPS, n: n, go: go || (YK[k].id + (n + 1)), body: body }); }
function Yk1(p) {
  var c = PX[p.k], y = YK[p.k];
  return YkWz(p.k, 1, h(F, null, h(NvCall, { tone: 'warning', icon: 'clock', title: 'Hạn nộp ý kiến — Còn 12 ngày' }, ''),
    FCard('Thông báo của Tòa án', h(F, null, Lead('Văn bản Tòa án đã tống đạt cho bạn về ' + c.yc + '.'), RvKV([['Văn bản', y.vb], ['Người ký', 'Trần Văn Anh — Thẩm phán'], ['Ngày tống đạt', '20/10/2026'], ['Người nộp đơn', y.nguoi]])), true),
    FCard('Văn bản Tòa án', h(F, null, Lead('Đọc kỹ nội dung ' + c.yc + ' trước khi nêu ý kiến.'), h('div', { className: 'vk-tabs' }, h(T.Tabs, { variant: 'chip', label: 'Tệp', items: [{ key: 'v', label: 'Văn bản' }, { key: 't', label: 'Tệp kèm · Tệp 1' }] })),
      DtDocs([[y.vb, y.vb + '.pdf · PDF']], { the: true })), true))); /* v351: bỏ xem trực tiếp, nút Xem mở màn xem tệp */
}
function Yk2(p) {
  var c = PX[p.k], l = React.useState(p.err ? '' : 'DONG_Y_MOT_PHAN'), pd = React.useState(p.err ? '' : 'Đồng ý hoàn trả 20.000.000 VNĐ tiền đặt cọc.'), nd = React.useState(p.err ? '' : 'Tôi chỉ nhận đặt cọc 20.000.000 VNĐ theo biên bản ngày 05/01/2026, không có khoản chi phí sửa chữa.');
  var ln = function (v, a, b) { var d = v.trim().length; return !d ? null : d < a ? 'Cần ít nhất ' + a + ' ký tự.' : d > b ? 'Tối đa ' + b + ' ký tự.' : null; };
  return YkWz(p.k, 2, h(F, null,
    FCard('Ý kiến của bạn đối với ' + c.yc, h(F, null, Lead('Chọn một lựa chọn phù hợp với ý kiến của bạn.'),
      h(ChonThe, { label: 'Ý kiến của bạn', v: l[0], onPick: l[1], items: YK_LOAI.map(function (x) { return { id: x[0], t: x[1], d: x[2] }; }) }),
      p.err && !l[0] ? h('p', { className: 'px-err', role: 'alert' }, 'Vui lòng chọn ý kiến của bạn đối với ' + c.yc + '.') : null), true),
    l[0] === 'DONG_Y_MOT_PHAN' ? FCard('Phần yêu cầu bạn đồng ý', Tf('Phần yêu cầu bạn đồng ý', { required: true, multiline: true, rows: 3, maxLength: 1000, value: pd[0], placeholder: 'Ghi rõ khoản, số tiền hoặc nội dung bạn chấp nhận.', onChange: function (e) { pd[1](e.target.value); }, error: ln(pd[0], 10, 1000) || undefined, showCount: true }), true) : null,
    l[0] ? FCard('Trình bày ý kiến và căn cứ', Tf('Trình bày ý kiến và căn cứ', { required: true, multiline: true, rows: 6, maxLength: 2000, value: nd[0], placeholder: 'Nêu lý do đồng ý hoặc không đồng ý, kèm căn cứ pháp luật, hợp đồng, chứng cứ bạn dựa vào.', onChange: function (e) { nd[1](e.target.value); }, error: ln(nd[0], 20, 2000) || undefined, showCount: true }), true) : null,
    HopGhi('Ý kiến được đưa vào hồ sơ vụ án', 'Các đương sự khác được tiếp cận văn bản này tại phiên họp kiểm tra việc giao nộp, tiếp cận, công khai chứng cứ và hòa giải.')));
}
function Yk3(p) {
  return YkWz(p.k, 3, FCard('Tài liệu, chứng cứ', h(F, null, Lead('Định dạng PDF, JPG, PNG, DOCX · tối đa 10MB/tệp. Không bắt buộc đính kèm tài liệu.'),
    h(T.FileUpload, { hint: 'Chưa đính kèm tài liệu nào.', uploadLabel: 'Tải lên tài liệu bổ sung', libraryLabel: 'Lấy từ kho dữ liệu cá nhân' })), true));
}
function Yk4(p) {
  var c = PX[p.k];
  return h(KyGuiDon, { title: 'Nộp ý kiến', steps: YK_STEPS, lead: 'Kiểm tra lại thông tin, ký số rồi gửi ý kiến đến Tòa án.', ok: YK[p.k].id + 'Ok', tep: ['Xem trước ý kiến về ' + c.yc], tepMeta: 'Bản in ý kiến', vaiTro: p.k === 'pt' ? 'Người có quyền lợi, nghĩa vụ liên quan' : 'Bị đơn',
    kyNote: 'Vui lòng ký số ý kiến trước khi gửi.', sendLabel: 'Gửi ý kiến',
    top: FCard('Ý kiến', RvKV([['Vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Người nộp', 'Hoàng Dương (Bạn)'], ['Ý kiến', 'Đồng ý một phần'], ['Thời hạn', 'Còn 12 ngày'], ['Phần yêu cầu đồng ý', 'Đồng ý hoàn trả 20.000.000 VNĐ tiền đặt cọc.'], ['Trình bày', 'Tôi chỉ nhận đặt cọc 20.000.000 VNĐ theo biên bản ngày 05/01/2026, không có khoản chi phí sửa chữa.'], ['Tài liệu đính kèm (0 tệp)', 'Chưa đính kèm tài liệu nào.']]), true),
    camDoan: 'Tôi cam đoan các thông tin và tài liệu đã cung cấp là đúng sự thật và chịu trách nhiệm trước pháp luật.' });
}
function YkOk(p) {
  var c = PX[p.k];
  return h(OkScr, { title: 'Đã gửi ý kiến thành công', text: 'Ý kiến của bạn về ' + c.yc + ' đã được tiếp nhận và đưa vào hồ sơ vụ án. Tòa án sẽ thông báo qua Hộp thư tống đạt.', info: [['Mã ý kiến', h('span', { className: 'tp-num' }, 'YK-2026-0007')], ['Thời điểm gửi', '04/11/2026 09:30']],
    btns: h(F, null, Btn('Về chi tiết vụ án', 'primary', { 'data-pt-go': 'backTo:caseDetail' }), Btn('Về Trang chủ', 'secondary', { 'data-pt-go': 'tab:home' })) });
}
/* chi tiết vụ án theo vai trò: bị đơn (phản tố) / người có QL, NV liên quan (YCĐL) – nút nộp đơn + "Nộp ý kiến tố tụng" */
function VaVaiTro(p) {
  var sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), pt = p.vt === 'bd';
  var muc = pt ? [['Yêu cầu độc lập của', 'Lê Thị Hoa', 'yyk1']] : [['Đơn phản tố của', 'Trần Văn Bình', 'pyk1']];
  return h('div', { className: 'px-acts' }, h('span', { ref: anchor, hidden: true }),
    h('p', { className: 'px-acts-h' }, 'Tư cách của bạn: ', h('b', null, pt ? 'Bị đơn' : 'Người có quyền lợi, nghĩa vụ liên quan')),
    h('div', { className: 'ph-2btn' }, Btn(pt ? 'Nộp đơn phản tố' : 'Nộp đơn yêu cầu độc lập', 'primary', { size: 'sm', icon: 'plus', 'data-pt-go': p.cho ? 'snack:Bạn đang có một đơn chờ Tòa án giải quyết. Vui lòng đợi xử lý xong trước khi nộp đơn mới.' : (pt ? 'px1' : 'yx1') }),
      Btn('Nộp ý kiến tố tụng', 'secondary', { size: 'sm', onClick: function () { sh[1](true); } })),
    sh[0] && host ? h(LvSheet, { host: host, title: 'Nộp ý kiến tố tụng', onClose: function () { sh[1](false); } }, h('ul', { className: 'ph-lvr' }, muc.map(function (m) { return h('li', { key: m[1] }, h('button', { type: 'button', className: 'ph-lvr-it', 'data-pt-go': m[2] }, h('span', { className: 'ph-lvr-tx' }, h('span', { className: 'ph-lvr-d' }, m[0]), h('span', { className: 'ph-lvr-t' }, m[1])), h(T.Icon, { name: 'chevronRight' }))); }))) : null);
}

/* ===== 13. Đề nghị giám đốc thẩm / tái thẩm (web /nop-don-giam-doc-tham, /nop-don-tai-tham) – v183 ===== */
var GX_STEPS = ['Bản án, quyết định', 'Căn cứ đề nghị', 'Nội dung đề nghị', 'Tài liệu kèm theo', 'Xem lại & ký số'];
var GX = {
  gdt: { id: 'gx', ten: 'Đề nghị giám đốc thẩm', thuTuc: 'giám đốc thẩm', sub: 'Áp dụng với bản án, quyết định đã có hiệu lực pháp luật theo Điều 326 BLTTDS.',
    ccT: 'Căn cứ đề nghị giám đốc thẩm (Điều 326 BLTTDS)', ccD: 'Chọn ít nhất một căn cứ theo quy định tại Điều 326 Bộ luật Tố tụng dân sự 2015. Mỗi căn cứ cần được chứng minh ở phần nội dung và tài liệu kèm theo.',
    cc: ['Kết luận trong bản án, quyết định không phù hợp với những tình tiết khách quan của vụ án, gây thiệt hại đến quyền, lợi ích hợp pháp của đương sự', 'Có vi phạm nghiêm trọng thủ tục tố tụng làm cho đương sự không thực hiện được quyền, nghĩa vụ tố tụng của mình', 'Có sai lầm trong việc áp dụng pháp luật dẫn đến việc ra bản án, quyết định không đúng'],
    ccErr: 'Vui lòng chọn ít nhất một căn cứ đề nghị theo Điều 326 BLTTDS.',
    canh: 'Đề nghị giám đốc thẩm không làm tạm dừng thi hành bản án. Muốn tạm dừng thi hành phải có văn bản của người có thẩm quyền kháng nghị theo quy định tại Điều 329 Bộ luật Tố tụng dân sự 2015.',
    ok: 'Đơn đề nghị xem xét theo thủ tục giám đốc thẩm của bạn đã được tiếp nhận và cấp Biên nhận điện tử. Tòa án có thẩm quyền sẽ xem xét và thông báo qua Hộp thư tống đạt.' },
  tt: { id: 'tx', ten: 'Đề nghị tái thẩm', thuTuc: 'tái thẩm', sub: 'Áp dụng với bản án, quyết định đã có hiệu lực pháp luật theo Điều 351, 352 BLTTDS.',
    ccT: 'Căn cứ đề nghị tái thẩm (Điều 352 BLTTDS)', ccD: 'Chọn ít nhất một căn cứ theo quy định tại Điều 352 Bộ luật Tố tụng dân sự 2015. Mỗi căn cứ cần được chứng minh ở phần nội dung và tài liệu kèm theo.',
    cc: ['Mới phát hiện được tình tiết quan trọng của vụ án mà đương sự đã không thể biết được trong quá trình giải quyết vụ án', 'Có cơ sở chứng minh kết luận của người giám định, lời dịch của người phiên dịch không đúng sự thật hoặc có giả mạo chứng cứ', 'Thẩm phán, Hội thẩm nhân dân, Kiểm sát viên, Thư ký Tòa án cố ý làm sai lệch hồ sơ vụ án hoặc cố ý kết luận trái pháp luật', 'Bản án, quyết định dựa trên bản án, quyết định của Tòa án hoặc quyết định của cơ quan nhà nước đã bị hủy bỏ'],
    ccErr: 'Vui lòng chọn ít nhất một căn cứ đề nghị theo Điều 352 BLTTDS.',
    canh: 'Đề nghị tái thẩm không làm tạm dừng thi hành bản án. Muốn tạm dừng thi hành phải có văn bản của người có thẩm quyền kháng nghị theo quy định tại Điều 356 Bộ luật Tố tụng dân sự 2015.',
    ok: 'Đơn đề nghị xem xét theo thủ tục tái thẩm của bạn đã được tiếp nhận. Tòa án có thẩm quyền sẽ xem xét và thông báo qua Hộp thư tống đạt.' } };
/* bản án lấy từ vụ án của người dùng (mẫu theo mock-data của web) */
var GX_BA = [{ so: 'Bản án số 45/2025/DS-PT', loai: 'Bản án dân sự phúc thẩm', vu: 'Tranh chấp hợp đồng chuyển nhượng quyền sử dụng đất', toa: 'TAND cấp cao tại Hà Nội', hl: '12/03/2026', con: 231 },
  { so: 'Quyết định số 12/2024/QĐ-PT', loai: 'Quyết định giải quyết việc dân sự phúc thẩm', vu: 'Yêu cầu tuyên bố văn bản công chứng vô hiệu', toa: 'TAND thành phố Hà Nội', hl: '28/11/2025', con: 114, nhap: true }];
function GxWz(k, n, body, go, top) { var c = GX[k]; return Wz({ title: c.ten, steps: GX_STEPS, n: n, go: go || (c.id + (n + 1)), body: h(F, null, n === 1 ? Lead(c.sub) : null, body, top || null) }); }
function GxBaThe(b, on, pick) {
  return h('button', { key: b.so, type: 'button', role: 'radio', 'aria-checked': on, className: 'mg-opt gx-ba' + (on ? ' mg-opt-on' : ''), onClick: pick },
    h('span', { className: 'mg-opt-r', 'aria-hidden': 'true' }),
    h('span', { className: 'mg-opt-tx' }, h('small', { className: 'gx-ba-l' }, b.loai, b.nhap ? h('em', null, h(T.Icon, { name: 'file' }), 'Có bản nháp đang soạn dở') : null), h('b', { className: 'tp-num' }, b.so),
      h('small', null, 'Vụ án: ' + b.vu), h('small', null, b.toa + ' • Ngày hiệu lực: ' + b.hl),
      h('span', { className: 'gx-han' }, 'Còn ' + b.con + ' ngày trong thời hạn 01 năm kể từ ngày có hiệu lực')));
}
function Gx1(p) {
  var c = GX[p.k], tab = React.useState(p.tu ? 'tu' : 'vu'), ch = React.useState(p.rong ? -1 : 0);
  if (p.co) return GxWz(p.k, 1, FCard('Bản án, quyết định đề nghị ' + c.thuTuc, h(F, null, Lead('Áp dụng cho vụ án đã chọn từ màn hình Chi tiết vụ án.'), h('span', { className: 'gx-tag' }, h(T.Icon, { name: 'check' }), 'Mặc định theo vụ án đã chọn'),
    h('div', { className: 'mg-opts' }, GxBaThe(GX_BA[0], true, noop))), true));
  return GxWz(p.k, 1, FCard('Chọn bản án / quyết định', h(F, null, Lead('Chọn từ vụ án của bạn (thông tin được điền tự động, không thể sai) hoặc nhập thông tin bản án để Tòa án đối chiếu.'),
    h(T.SegmentedControl, { label: 'Nguồn bản án', value: tab[0], onChange: tab[1], options: [{ value: 'vu', label: 'Từ vụ án của tôi' }, { value: 'tu', label: 'Nhập thông tin bản án' }], className: 'sk-seg' }),
    tab[0] === 'vu' ? (p.rong ? h(T.EmptyState, { icon: 'file', text: 'Hiện bạn không có bản án, quyết định nào đã có hiệu lực pháp luật.' })
      : h('div', { className: 'mg-opts', role: 'radiogroup', 'aria-label': 'Bản án / Quyết định' }, GX_BA.map(function (b, i) { return GxBaThe(b, ch[0] === i, function () { ch[1](i); }); })))
      : h(F, null, Tf('Số bản án / quyết định', { required: true, placeholder: 'Nhập số bản án / quyết định' }), Tf('Tên vụ án', { required: true, placeholder: 'Nhập tên vụ án' }), Tf('Ngày ban hành', Dt({ required: true })),
        h(SelSheet, { label: 'Loại án', req: true, ph: '— Chọn loại án —', opts: ['Dân sự', 'Hôn nhân và gia đình', 'Kinh doanh, thương mại', 'Lao động', 'Hành chính'] }),
        h(SelSheet, { label: 'Tòa án ban hành', req: true, ph: '— Chọn tòa án —', search: true, opts: [COURT1, 'Tòa án nhân dân Thành phố Hà Nội', 'TAND cấp cao tại Hà Nội'] }),
        h(SelSheet, { label: 'Đối tượng', req: true, ph: '— Chọn đối tượng —', opts: ['Nguyên đơn', 'Bị đơn', 'Người có quyền lợi, nghĩa vụ liên quan'] }),
        h(NvCall, { tone: 'info', title: '' }, 'Không tìm thấy dữ liệu số hóa của bản án này trên CSDL Quốc gia. Đơn của bạn sẽ được Tòa án tra cứu và đối chiếu với hồ sơ lưu trữ.'))), true), null, p.top);
}
function Gx2(p) {
  var c = GX[p.k], v = React.useState(p.err ? [] : [0]), ng = React.useState('15/01/2026'), cb = React.useState('');
  return GxWz(p.k, 2, h(F, null, FCard(c.ccT, h(F, null, Lead(c.ccD),
    h('div', { className: 'gd-vt-l gd-vt-cb' }, c.cc.map(function (t, i) { var on = v[0].indexOf(i) >= 0; return h(T.Checkbox, { key: i, checked: on, onChange: function () { v[1](on ? v[0].filter(function (x) { return x !== i; }) : v[0].concat([i])); }, label: h('span', { className: 'gd-vt-lb' }, t) }); })),
    !v[0].length ? h('p', { className: 'px-err', role: 'alert' }, c.ccErr) : null), true),
    p.k === 'tt' ? FCard('Thời điểm biết được căn cứ', h(F, null, Lead('Dùng để xác định thời hạn 01 năm đề nghị tái thẩm (Điều 355 BLTTDS).'),
      Tf('Ngày biết được căn cứ', Dt({ required: true, value: ng[0], onChange: function (e) { ng[1](e.target.value); } })),
      h('p', { className: 'gx-han' }, 'Hạn đề nghị: 15/01/2027 — còn 72 ngày'),
      Tf('Bạn biết được căn cứ này như thế nào?', { required: true, multiline: true, maxLength: 2000, showCount: true, value: cb[0], onChange: function (e) { cb[1](e.target.value); }, placeholder: 'Ví dụ: Ngày 15/01/2026, tôi nhận được thông báo từ cơ quan công an xác nhận lời khai của nhân chứng X trong hồ sơ vụ án là giả mạo...' })), true) : null));
}
function Gx3(p) {
  var c = GX[p.k], nd = React.useState(p.err ? 'Bản án sai' : '');
  return GxWz(p.k, 3, h(F, null, FCard('Nội dung và lý do đề nghị xem xét lại', h(F, null, Lead('Nêu rõ phần nào của bản án, quyết định bị đề nghị xem xét lại; lý do cụ thể và yêu cầu của người đề nghị đối với người có thẩm quyền kháng nghị.'),
    Tf('Nội dung đề nghị', { required: true, multiline: true, maxLength: 2000, showCount: true, value: nd[0], onChange: function (e) { nd[1](e.target.value); }, help: 'Tối thiểu 20 ký tự để nêu rõ lý do', error: nd[0].trim() && nd[0].trim().length < 20 ? 'Nhập Nội dung đề nghị tối thiểu 20 ký tự.' : undefined,
      placeholder: 'Ví dụ: Bản án phúc thẩm số 45/2025/DS-PT đã xác định diện tích đất chuyển nhượng 240 m² là không phù hợp với thực tế hợp đồng công chứng và biên bản đo đạc hiện trạng…' })), true),
    h(NvCall, { tone: 'warning' }, c.canh)));
}
function Gx4(p) {
  return GxWz(p.k, 4, h(F, null, FCard('Thành phần hồ sơ', h(F, null, Lead('[Danh mục thành phần hồ sơ theo loại việc – DM_TAILIEUDINHKEM]'),
    DtDocs([['Bản sao Bản án: số 45/2025/DS-PT', 'Ban-an-so-45-2025-DS-PT.pdf · lấy từ vụ án'], ['[Tên thành phần hồ sơ bắt buộc khác] *', 'Chưa đính kèm']])), true),
    FCard('Tài liệu kèm theo (bổ sung)', h(T.FileUpload, { hint: 'PDF, JPG, PNG, DOCX · tối đa 10MB/tệp', uploadLabel: 'Tải lên tệp mới', libraryLabel: 'Tài liệu từ kho', files: [{ name: 'bien-ban-do-dac-hien-trang.pdf', meta: 'Loại tài liệu: [— Chọn loại tài liệu * —] · 1,1 MB', status: 'done' }] }), true)));
}
function Gx5(p) {
  var c = GX[p.k];
  return h(KyGuiDon, { title: c.ten, steps: GX_STEPS, lead: 'Xem lại thông tin và Ký gửi đơn', ok: c.id + 'Ok', tep: ['Xem trước đơn đề nghị ' + c.thuTuc, 'bien-ban-do-dac-hien-trang.pdf'], tepMeta: 'Bản in đơn', vaiTro: 'Người đề nghị',
    kyTuyChon: true, kyNote: 'Đơn đề nghị ' + c.thuTuc + ' sẽ được in từ thông tin bạn nhập. Bấm "Ký số" để ký bằng chữ ký số/tài khoản định danh điện tử — hiện chưa bắt buộc, bạn vẫn gửi được đơn chưa ký.',
    top: h(F, null, FCard('Bản án, quyết định', RvKV([['Bản án, quyết định', h('span', { className: 'tp-num' }, GX_BA[0].so)], ['Vụ án', GX_BA[0].vu], ['Tòa án ban hành', GX_BA[0].toa], ['Gửi tới / Tòa án nhận đơn', '[Tòa án có thẩm quyền kháng nghị]'], ['Ngày hiệu lực', GX_BA[0].hl], ['Thời hạn đề nghị', h('span', { className: 'gx-han' }, 'Còn 231 ngày trong thời hạn 01 năm kể từ ngày có hiệu lực')]]), true),
      FCard('Căn cứ đề nghị', h('ul', { className: 'gx-cc' }, h('li', null, c.cc[0])), true),
      FCard('Nội dung đề nghị xem xét lại', P('Bản án phúc thẩm số 45/2025/DS-PT đã xác định diện tích đất chuyển nhượng 240 m² là không phù hợp với thực tế hợp đồng công chứng và biên bản đo đạc hiện trạng ngày 15/04/2020…'), true),
      FCard('Tài liệu đính kèm (2)', DtDocs([['Bản sao Bản án: số 45/2025/DS-PT', 'Tài liệu 1'], ['bien-ban-do-dac-hien-trang.pdf', 'Tài liệu 2 (bổ sung)']]), true)),
    camDoan: 'Tôi cam đoan nội dung đề nghị và tài liệu kèm theo là đúng sự thật, và chịu hoàn toàn trách nhiệm trước pháp luật.' });
}
function GxOk(p) {
  var c = GX[p.k];
  return h(OkScr, { title: 'Đã gửi đơn đề nghị ' + c.thuTuc + ' thành công', text: c.ok, info: [['Mã tiếp nhận', h('span', { className: 'tp-num' }, p.k === 'gdt' ? 'GDT-2026-0007' : 'TT-2026-0003')], ['Bản án đề nghị', h('span', { className: 'tp-num' }, GX_BA[0].so)], ['Trạng thái', h(T.StatusBadge, { tone: 'info', icon: false }, 'Đã gửi đơn')]],
    btns: h(F, null, Btn('Xem tại Quản lý đơn', 'primary', { icon: 'file', 'data-pt-go': 'reset:records,applicationsGdt' }), Btn('Về Trang chủ', 'secondary', { 'data-pt-go': 'tab:home' })) });
}

/* ===== 14. Rút đơn / sửa đổi, bổ sung đơn đề nghị GĐT, tái thẩm (web quan-ly-don/:id/giam-doc-tham-rut-don, giam-doc-tham-sua-doi-bo-sung) – v184 ===== */
var GR_STEPS = ['Đơn cần rút', 'Lý do & hệ quả', 'Xác nhận & ký gửi'];
/* lý do rút lấy từ DM_DANHMUCCHUNG LYDO_RUTDONGDT – tên dưới đây là mẫu; "Lý do khác" (LDRDGDT_05) bắt buộc trình bày ≥15 ký tự */
var GR_LYDO = [['LDRDGDT_01', '[Các bên đã thỏa thuận được việc thi hành bản án]'], ['LDRDGDT_02', '[Không còn nhu cầu đề nghị xem xét lại]'], ['LDRDGDT_03', '[Nộp nhầm đơn, nhầm bản án]'], ['LDRDGDT_04', '[Sẽ nộp lại đơn đầy đủ căn cứ hơn]'], ['LDRDGDT_05', 'Lý do khác', 'Trình bày cụ thể ở ô bên dưới.']];
function grTen(k) { return k === 'tt' ? 'tái thẩm' : 'giám đốc thẩm'; }
function GrWz(k, n, body, go) { return Wz({ title: 'Rút đơn', steps: GR_STEPS, n: n, go: go || ('gr' + k + (n + 1)), body: h(F, null, n === 1 ? Lead('Bạn đang đề nghị Tòa án cho rút đơn. Đơn chỉ được rút sau khi Tòa án phê duyệt.') : null, body) }); }
/* v353 (QLD4-W15): p.nhap – nạp lại bản nháp, có thông báo */
function Gr1(p) {
  return h(F, null, GrWz(p.k, 1, FCard('Đơn bạn đề nghị rút', h(F, null, Lead('Kiểm tra đúng đơn trước khi tiếp tục. Thông tin lấy tự động, không sửa được.'),
    RvKV([['Mã đơn', h('span', { className: 'tp-num' }, 'GT-2026-0049 · TN-20261029-0020')], ['Loại đơn', p.k === 'tt' ? 'Đơn đề nghị tái thẩm' : 'Đơn đề nghị giám đốc thẩm'], ['Bản án, quyết định', 'Bản án phúc thẩm số 18/2026/DS-PT · TAND cấp cao tại Hà Nội'], ['Tòa án đang giải quyết', 'Tòa án nhân dân cấp cao tại Hà Nội'], ['Ngày gửi', '29/10/2026'], ['Trạng thái hiện tại', p.sua ? 'Yêu cầu sửa đổi, bổ sung đơn' : 'Đã gửi đơn']])), true), p.sua ? 'grgdt2sua' : undefined),
    p.nhap ? h(AutoSnack, { m: 'Đã nạp bản nháp yêu cầu rút đơn bạn lưu trước đó.' }) : null);
}
function Gr2(p) {
  var l = React.useState(p.err ? '' : 'LDRDGDT_01'), t = React.useState(''), khac = l[0] === 'LDRDGDT_05', d = t[0].trim().length;
  var hq = [['Tòa án dừng xem xét đơn đề nghị này', 'Sau khi Tòa án phê duyệt, đơn chuyển "Đã rút đơn"; người có thẩm quyền không xem xét kháng nghị theo đơn này.'], ['Bản án, quyết định vẫn giữ nguyên hiệu lực', 'Việc rút đơn không làm thay đổi hay tạm dừng thi hành bản án, quyết định.'],
    ['Gửi lại đơn mới phải còn thời hạn', p.k === 'tt' ? 'Tái thẩm: 01 năm kể từ ngày biết được căn cứ (Điều 355 BLTTDS).' : 'Giám đốc thẩm: 01 năm kể từ ngày bản án, quyết định có hiệu lực (Điều 327 BLTTDS).']];
  if (p.sua) hq.push(['Yêu cầu sửa đổi, bổ sung đang mở', 'Bạn không cần bổ sung đơn nữa nếu Tòa án phê duyệt yêu cầu rút.']);
  return GrWz(p.k, 2, h(F, null,
    h('div', { className: 'rd-hq' }, h('p', { className: 'rd-hq-h' }, h(T.Icon, { name: 'alert' }), 'Hệ quả của việc rút đơn ở trạng thái hiện tại'), hq.map(function (x) { return h('div', { key: x[0], className: 'rd-hq-c' }, h('b', null, x[0]), h('p', null, x[1])); })),
    FCard('Lý do rút đơn', h(F, null, Lead('Thông tin này giúp Tòa án xử lý yêu cầu nhanh hơn.'),
      h(ChonThe, { label: 'Lý do rút đơn', v: l[0], onPick: l[1], items: GR_LYDO.map(function (x) { return { id: x[0], t: x[1], d: x[2] }; }) }),
      p.err && !l[0] ? h('p', { className: 'px-err', role: 'alert' }, 'Vui lòng chọn lý do rút đơn.') : null,
      Tf(khac ? 'Trình bày thêm' : 'Trình bày thêm (tùy chọn)', { required: khac, multiline: true, maxLength: 2000, showCount: true, value: t[0], onChange: function (e) { t[1](e.target.value); }, placeholder: 'Hai bên đã thỏa thuận xong việc thi hành bản án ngày 05/10/2026…',
        help: khac ? 'Bắt buộc khi chọn lý do này, tối thiểu 15 ký tự.' : 'Nêu thêm nếu bạn muốn Tòa án biết rõ hoàn cảnh.', error: khac && d > 0 && d < 15 ? 'Nội dung trình bày thêm phải có tối thiểu 15 ký tự.' : undefined })), true)));
}
/* v353 (QLD4-W10): ô cam đoan bắt buộc */
function Gr3(p) {
  return h(KyGuiDon, { title: 'Rút đơn', steps: GR_STEPS, kyTitle: 'Xem lại & ký gửi', lead: 'Cổng tự sinh đơn từ thông tin bạn đã khai. Muốn sửa, bấm Quay lại.', ok: 'gr' + p.k + 'Ok', tep: ['Xem trước đơn'], tepMeta: 'Đơn yêu cầu rút đơn đề nghị ' + grTen(p.k), vaiTro: 'Người đề nghị',
    top: FCard('Yêu cầu rút đơn', RvKV([['Đơn cần rút', h('span', { className: 'tp-num' }, 'GT-2026-0049')], ['Bản án, quyết định', 'Bản án phúc thẩm số 18/2026/DS-PT'], ['Lý do rút đơn', '[Các bên đã thỏa thuận được việc thi hành bản án]']]), true),
    camDoan: 'Tôi hiểu hệ quả của việc rút đơn và tự nguyện đề nghị Tòa án cho rút đơn này.' });
}
function GrOk(p) { return h(OkScr, { title: 'Đã gửi yêu cầu rút đơn đề nghị ' + grTen(p.k) + '.', text: 'Đơn chỉ được rút sau khi Tòa án phê duyệt. Kết quả gửi qua Hộp thư tống đạt.', btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'backTo:gdtDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applicationsGdt' })) }); }
/* sửa đổi, bổ sung đơn đề nghị GĐT/TT theo thông báo của Tòa án (4 bước) */
var GS_STEPS = ['Bản án, vụ án & thông báo', 'Nội dung sửa đổi, bổ sung', 'Tài liệu kèm theo', 'Xem lại & ký nộp'];
function GsWz(k, n, body, go) { return Wz({ title: 'Sửa đổi, bổ sung đơn', steps: GS_STEPS, n: n, go: go || ('gs' + k + (n + 1)), body: body }); }
/* v353 (QLD4-W12, bỏ M02): banner hạn nộp bản sửa (Còn N ngày / ≤3 ngày đỏ / Quá hạn / Vô thời hạn); bỏ thẻ "Thông báo của Tòa án" */
function Gs1(p) {
  var t = grTen(p.k), han = p.han || 'con', do_ = han === 'sap' || han === 'qua';
  var gt = { con: 'Còn 26 ngày', sap: 'Còn 2 ngày', qua: 'Quá hạn 3 ngày', vo: 'Vô thời hạn' }[han];
  var dong = han === 'vo' ? 'Thông báo này không quy định hạn nộp bản sửa đổi, bổ sung (tống đạt ngày 30/10/2026).' : h(F, null, 'Hạn cuối: ', h('strong', null, han === 'qua' ? '10/11/2026' : han === 'sap' ? '15/11/2026' : '29/11/2026'), ' – tối đa 30 ngày kể từ ngày tống đạt thông báo (' + (han === 'qua' ? '11/10/2026' : han === 'sap' ? '16/10/2026' : '30/10/2026') + ').');
  return GsWz(p.k, 1, h(F, null,
    FCard('Đơn đang có yêu cầu sửa đổi, bổ sung', h(F, null, Lead('Danh sách lấy từ các thông báo Tòa án đã tống đạt cho bạn.'),
      h('div', { className: 'mg-opts' }, h('button', { type: 'button', role: 'radio', 'aria-checked': true, className: 'mg-opt mg-opt-on' }, h('span', { className: 'mg-opt-r', 'aria-hidden': 'true' }),
        h('span', { className: 'mg-opt-tx' }, h('b', null, 'Đề nghị ' + t + ' đối với Bản án số 18/2026/DS-PT'), h('small', null, h('span', { className: 'tp-num' }, 'TN-20261029-0020'), ' · Tranh chấp hợp đồng chuyển nhượng quyền sử dụng đất'))))), true),
    h('section', { className: 'q4-han' + (do_ ? ' q4-han-do' : '') }, h('small', null, 'Hạn nộp bản sửa đổi, bổ sung'), h('b', null, gt), h('p', null, dong), h('p', { className: 'q4-han-hq' }, '* Không sửa đổi, bổ sung đúng hạn thì đơn đề nghị ' + t + ' sẽ bị Tòa án trả lại theo quy định.'))));
}
function Gs2(p) {
  var v = React.useState(p.err ? 'Bổ sung căn cứ' : 'Tôi đề nghị xem xét lại Bản án phúc thẩm số 18/2026/DS-PT theo thủ tục ' + grTen(p.k) + ' vì Tòa án cấp phúc thẩm đã không xem xét biên bản đo đạc hiện trạng ngày 15/04/2020…'), d = v[0].trim().length;
  return GsWz(p.k, 2, FCard('Nội dung sửa đổi, bổ sung', h(F, null, Lead('Viết thành nội dung hoàn chỉnh để Tòa án đưa nguyên văn vào hồ sơ, không viết dạng ghi chú sửa đổi.'),
    Tf('Nội dung đơn sau khi sửa đổi, bổ sung', { required: true, multiline: true, maxLength: 2000, showCount: true, value: v[0], onChange: function (e) { v[1](e.target.value); }, placeholder: 'Tôi đề nghị xem xét lại bản án theo thủ tục giám đốc thẩm/tái thẩm và...',
      error: !d ? 'Vui lòng nhập nội dung đơn đề nghị sau khi sửa đổi, bổ sung.' : d < 20 ? 'Nhập Nội dung sửa đổi, bổ sung tối thiểu 20 ký tự.' : undefined })), true));
}
/* v353 (QLD4-W13): mỗi tệp bắt buộc có tên và loại tài liệu (p.err) */
function Gs3(p) {
  var ten = React.useState(p.err ? '' : 'Biên bản đo đạc hiện trạng');
  return GsWz(p.k, 3, FCard('Tài liệu bổ sung', h(F, null, Lead('PDF, JPG, PNG, DOCX · tối đa 10MB/tệp'),
    h('div', { className: 'q4-tep' }, h('div', { className: 'q4-tep-h' }, h(T.Icon, { name: 'file' }), h('span', null, 'bien-ban-do-dac-hien-trang.pdf'), XemTep('bien-ban-do-dac-hien-trang.pdf'), IcoBtn('trash', 'Xóa tệp', 'snack:Đã xóa tệp.')),
      Tf('Tên tài liệu', { required: true, value: ten[0], onChange: function (e) { ten[1](e.target.value); }, placeholder: 'Nhập tên tài liệu', error: p.err && !ten[0] ? 'Tài liệu 1: Vui lòng nhập tên tài liệu.' : undefined }),
      h(SelSheet, { label: 'Loại tài liệu', req: true, v: p.err ? '' : 'Tài liệu, chứng cứ', opts: ['Tài liệu, chứng cứ', 'Bản án, quyết định', 'Giấy tờ tùy thân', 'Khác'] }),
      p.err ? h('p', { className: 'q2-err', role: 'alert' }, h(T.Icon, { name: 'alert' }), 'Tài liệu 1: Vui lòng chọn loại tài liệu.') : null),
    h(T.Button, { variant: 'tint', size: 'sm', icon: 'upload', className: 'q4-tep-up' }, 'Tải lên tệp mới')), true));
}
/* v353 (QLD4-W11): ô cam đoan bắt buộc */
function Gs4(p) {
  return h(KyGuiDon, { title: 'Sửa đổi, bổ sung đơn', steps: GS_STEPS, kyTitle: 'Xem lại & ký gửi', lead: 'Kiểm tra lại đơn, ký số rồi gửi tới Tòa án.', ok: 'gs' + p.k + 'Ok', tep: ['Xem trước đơn', 'bien-ban-do-dac-hien-trang.pdf'], tepMeta: 'Đơn sửa đổi, bổ sung', vaiTro: 'Người đề nghị',
    top: h(F, null, FCard('Đơn đề nghị', RvKV([['Bản án / Quyết định bị đề nghị', 'Bản án số 18/2026/DS-PT'], ['Tên vụ án', 'Tranh chấp hợp đồng chuyển nhượng quyền sử dụng đất'], ['Đơn đề nghị ban đầu', h('span', { className: 'tp-num' }, 'TN-20261029-0020')], ['Tòa án ban hành', 'TAND cấp cao tại Hà Nội']]), true),
      HopGhi('Đơn giữ nguyên mã và thời điểm nộp ban đầu', 'Bản sửa gắn vào đơn TN-20261029-0020, không tạo đơn mới và không làm mất thời hiệu đã bảo toàn khi nộp lần đầu.'),
      HopGhi('Tòa án kiểm tra lại toàn bộ đơn', 'Sau khi nhận bản sửa, Tòa án xem xét và thông báo tiếp nhận hay tiếp tục yêu cầu sửa qua Hộp thư tống đạt.'),
      FCard('Tài liệu đính kèm (1 tệp)', DtDocs([['bien-ban-do-dac-hien-trang.pdf', 'Tài liệu bổ sung']]), true)),
    camDoan: 'Tôi cam đoan các thông tin và tài liệu sửa đổi, bổ sung trên đây là hoàn toàn đúng sự thật, tự nguyện và chịu mọi trách nhiệm trước pháp luật về nội dung đã khai.' });
}
function GsOk(p) {
  var t = grTen(p.k);
  return h(OkScr, { title: 'Đã gửi bản sửa đổi, bổ sung đơn đề nghị ' + t, text: 'Bản sửa đổi, bổ sung đã được gắn vào hồ sơ xem xét ' + t + ' của bản án. Tòa án có thẩm quyền kiểm tra lại và gửi thông báo kết quả giải quyết qua Hộp thư tống đạt.',
    info: [['Mã tiếp nhận', h('span', { className: 'tp-num' }, 'TN-20261104-0031')], ['Bản án đề nghị', 'Bản án số 18/2026/DS-PT'], ['Đơn đề nghị ban đầu', h('span', { className: 'tp-num' }, 'TN-20261029-0020')]],
    btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'backTo:gdtDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applicationsGdt' })) });
}

/* ===== 10. Đăng ký người bảo vệ (v186, 04/11/2026 – web /dang-ky-nguoi-bao-ve: index.tsx, bieu-mau.tsx, khoi-nhap.tsx, tong-hop.tsx, buoc-ky.tsx, quy-tac.ts, ban-xem.ts)
   Lối vào: Theo dõi vụ án, vụ việc › thẻ "Đăng ký người bảo vệ" (sau Giao nộp tài liệu, chứng cứ – chọn C).
   2 luồng theo người thực hiện: d = Đương sự đăng ký cho mình, n = Người bảo vệ tự đăng ký; 5 bước như web. Dữ liệu mẫu để trong ngoặc vuông khi chưa có danh mục. */
var BV_TT = { LUU_TAM: ['Lưu nháp', 'neutral'], DA_GUI: ['Đã gửi đăng ký', 'info'], CHAP_NHAN: ['Chấp nhận đăng ký', 'success'], TU_CHOI: ['Từ chối đăng ký', 'danger'] };
var BV_DS = [
  { ma: 'DKBV-2026-000131', hs: 'DS-2026-0012', toa: COURT1, nbv: 'Trần Minh Khoa', ds: 'Hoàng Dương', tc: 'Luật sư', gui: null, tt: 'LUU_TAM', go: 'bvd4Nhap' },
  { ma: 'DKBV-2026-000123', hs: 'DS-2026-0012', toa: COURT1, nbv: 'Trần Minh Khoa', ds: 'Hoàng Dương', tc: 'Luật sư', gui: '28/10/2026', tt: 'DA_GUI', go: 'defenderView' },
  { ma: 'DKBV-2026-000118', hs: 'DON-2026-000245', toa: COURT1, nbv: 'Lê Thu Hà', ds: 'Hoàng Dương', tc: 'Trợ giúp viên', gui: '20/10/2026', tt: 'CHAP_NHAN', go: 'defenderViewOk' },
  { ma: 'DKBV-2026-000097', hs: 'DS-2026-0018', toa: COURT1, nbv: 'Phạm Quốc Bảo', ds: 'Hoàng Dương', tc: 'Công dân Việt Nam', gui: '10/10/2026', tt: 'TU_CHOI', go: 'defenderViewNo' }];
var BV_LOC = [['all', 'Tất cả'], ['DA_GUI', 'Đã gửi đăng ký'], ['CHAP_NHAN', 'Chấp nhận đăng ký'], ['TU_CHOI', 'Từ chối đăng ký']];
/* v349 (12/11/2026): Đăng ký người bảo vệ theo khung Danh sách đơn và tiến trình (người dùng chọn): header có nút "Đăng ký mới" góc phải (bỏ nút đỏ rộng),
   chip trạng thái có thêm Lưu nháp, bỏ nút đánh dấu quan trọng; thẻ: nhãn trạng thái · tiêu đề = tư cách bảo vệ + tên người bảo vệ · Mã đăng ký, Hồ sơ liên quan, Ngày gửi · Việc cần làm "Tiếp tục soạn" khi lưu nháp */
function BvCard(r) {
  var nhap = r.tt === 'LUU_TAM', st = BV_TT[r.tt];
  return h('li', { key: r.ma, className: 'qd-c qc' },
    h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': (nhap ? 'Tiếp tục soạn ' : 'Xem đăng ký ') + r.ma, 'data-pt-go': r.go }),
    dsTop([st[0], st[1]]),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, r.tc + ' ' + r.nbv)),
    dsRows([['Mã đăng ký', h('span', { className: 'tp-num' }, r.ma)], ['Hồ sơ liên quan', h('span', { className: 'tp-num' }, r.hs)], ['Ngày gửi', nhap ? '-' : r.gui]]),
    nhap ? dsViec([{ t: 'Tiếp tục soạn', go: r.go }]) : null);
}
function BvList(p) {
  var all = p.rong ? [] : BV_DS, tt = React.useState('all'), q = React.useState(''), k = khongDau(q[0].trim());
  var ds = all.filter(function (r) { return (tt[0] === 'all' || r.tt === tt[0]) && (!k || khongDau([r.ma, r.hs, r.nbv, r.ds].join(' ')).indexOf(k) >= 0); });
  var LOC = [['all', 'Tất cả'], ['LUU_TAM', 'Lưu nháp']].concat(BV_LOC.slice(1));
  return DsShell('Đăng ký người bảo vệ', h(F, null,
    all.length ? h('div', { className: 'nv-stick qd-stick' }, h('div', { className: 'ph-ibar' }, h('div', { className: 'fx-search' }, Tf('Tìm kiếm đăng ký người bảo vệ', { icon: 'search', placeholder: 'Tìm mã đăng ký, mã hồ sơ, người bảo vệ…', maxLength: 100, value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } }))),
      h(StRow, { label: 'Lọc theo trạng thái đăng ký', value: tt[0], onChange: tt[1], items: LOC.map(function (x) { return { key: x[0], label: x[1], count: x[0] === 'all' ? all.length : all.filter(function (r) { return r.tt === x[0]; }).length }; }) })) : null,
    !all.length ? h(IbEmpty, { icon: 'shield', title: 'Bạn chưa có đăng ký người bảo vệ nào', text: 'Nhấn "Đăng ký mới" để tạo đăng ký người bảo vệ.' })
      : ds.length ? h('ul', { className: 'qd-list' }, ds.map(function (r) { return BvCard(r); }))
      : h(IbEmpty, { icon: 'search', title: 'Không có đăng ký phù hợp', text: 'Thử từ khoá khác hoặc chọn bộ lọc "Tất cả".', action: 'Xóa bộ lọc', onAction: function () { tt[1]('all'); q[1](''); } })),
    'Đăng ký mới', 'bvd1');
}

/* --- biểu mẫu 5 bước --- */
var BV_STEPS = { d: ['Thông tin người đăng ký', 'Người bảo vệ', 'Tải tài liệu chứng minh', 'Xem lại', 'Ký số'], n: ['Thông tin người bảo vệ', 'Thông tin đương sự', 'Tải tài liệu chứng minh', 'Xem lại', 'Ký số'] };
var BV_VAI = { d: 'Đương sự đăng ký cho mình', n: 'Người bảo vệ tự đăng ký' };
var BV_HS = [{ id: 'DS-2026-0012', name: 'DS-2026-0012 · Tranh chấp hợp đồng vay tài sản', loai: 'VU_AN', ten: 'Tranh chấp hợp đồng vay tài sản', tt: 'Đang giải quyết', vt: 'Người đứng đơn' },
  { id: 'DON-2026-000245', name: 'DON-2026-000245 · Đơn khởi kiện tranh chấp hợp đồng thuê nhà', loai: 'DON', ten: 'Đơn khởi kiện tranh chấp hợp đồng thuê nhà', tt: 'Đã thụ lý', vt: 'Người đứng đơn' },
  { id: 'HC-2026-0004', name: 'HC-2026-0004 · Khiếu kiện quyết định hành chính về đất đai', loai: 'VU_AN', ten: 'Khiếu kiện quyết định hành chính về đất đai', tt: 'Đang giải quyết', vt: 'Người đồng khởi kiện/yêu cầu', hc: true }];
var BV_TU_CACH = [{ id: 'LUAT_SU', name: 'Luật sư' }, { id: 'TRO_GIUP_VIEN', name: 'Trợ giúp viên' }, { id: 'DAI_DIEN_LAO_DONG', name: 'Đại diện lao động', desc: 'Chỉ áp dụng cho đơn khởi kiện/vụ án hành chính' }, { id: 'CONG_DAN', name: 'Công dân Việt Nam' }];
var BV_VAI_TRO = ['Người đứng đơn', 'Người đồng khởi kiện/yêu cầu', 'Người bị khởi kiện/bị yêu cầu', 'Người có nghĩa vụ liên quan'];
var BV_DOAN = ['Đoàn Luật sư Thành phố Hà Nội', 'Đoàn Luật sư Thành phố Hồ Chí Minh', '[Danh mục DOAN_LUAT_SU]'];
var BV_LOAI_GT = ['Bản gốc', 'Bản photo', 'Bản chụp'];
var BV_DIA = ['Thành phố Hà Nội', 'Phường Từ Liêm', 'Số 8 Phạm Hùng'];
function bvGo(r, n) { return 'bv' + r + n; }
function BvWz(r, n, body, last, save) { return Wz({ title: 'Đăng ký người bảo vệ', steps: BV_STEPS[r], n: n, go: bvGo(r, n + 1), body: body, last: last, save: save ? undefined : false }); }
function BvLoi(t) { return t ? h('p', { className: 'bv-loi', role: 'alert' }, h(T.Icon, { name: 'alert' }), t) : null; }
function BvNhom(t, c) { return h('section', { className: 'bv-nhom' }, h('p', { className: 'bv-nhom-h' }, t), c); }
/* người thực hiện đăng ký – đổi luồng thì về bước 1 của luồng kia */
function BvNguoi(r) {
  return h('section', { className: 'ph-s1-sec ph-fsec' }, Lbl('Người thực hiện đăng ký', 0), h('div', { className: 'mg-opts', role: 'radiogroup', 'aria-label': 'Người thực hiện đăng ký' },
    [['d', 'Tôi là đương sự', 'Đăng ký người bảo vệ cho chính mình'], ['n', 'Tôi là người bảo vệ', 'Đăng ký tham gia bảo vệ cho đương sự']].map(function (x) {
      var on = r === x[0];
      return h('button', { key: x[0], type: 'button', role: 'radio', 'aria-checked': on, className: 'mg-opt' + (on ? ' mg-opt-on' : ''), 'data-pt-go': on ? undefined : 'replace:' + bvGo(x[0], 1) },
        h('span', { className: 'mg-opt-r', 'aria-hidden': 'true' }), h('span', { className: 'mg-opt-tx' }, h('b', null, x[1]), h('small', null, x[2])));
    })));
}
/* luồng đương sự – bước 1: chọn đơn/vụ án + thông tin người đăng ký (chỉ xem) */
function BvChonHoSo(p) {
  var loai = React.useState('Tất cả'), hs = React.useState(p.err ? '' : 'DS-2026-0012');
  var lo = BV_HS.filter(function (x) { return loai[0] === 'Tất cả' || (loai[0] === 'Đơn của người đăng ký' ? x.loai === 'DON' : x.loai === 'VU_AN'); });
  var cur = BV_HS.filter(function (x) { return x.id === hs[0]; })[0];
  return FCard('Thông tin người đăng ký', h(F, null,
    h('div', { className: 'kv-hd' }, Lbl('Chọn đơn/vụ án của người đăng ký', 0), h('small', { className: 'bv-sm' }, lo.length + ' hồ sơ')),
    h(SelSheet, { label: 'Loại hồ sơ', v: loai[0], opts: ['Tất cả', 'Đơn của người đăng ký', 'Vụ án/vụ việc của người đăng ký'], onChange: loai[1] }),
    h(SelSheet, { key: loai[0], label: 'Đơn/vụ án đăng ký người bảo vệ', req: true, ph: 'Chọn đơn hoặc vụ án của bạn', v: hs[0], opts: lo, onChange: hs[1] }),
    p.err ? BvLoi('Vui lòng chọn đơn/vụ án thuộc danh sách của bạn.') : null,
    cur ? h('div', { className: 'bv-hs' }, h('b', null, cur.ten), RvKV([['Mã hồ sơ', cur.id], ['Tòa án', COURT1], ['Trạng thái', cur.tt], ['Vai trò tố tụng', cur.vt]])) : null,
    BvNhom('Thông tin người đăng ký', h(F, null, RvKV([['Họ và tên', 'Hoàng Dương'], ['CCCD', '001090012345'], ['Ngày sinh', '12/05/1990'], ['Giới tính', 'Nam']]),
      AddrG('Địa chỉ hiện tại', 0, 'full', BV_DIA, true), AddrG('Địa chỉ thường trú', 0, 'full', BV_DIA, true)))), true);
}
/* thông tin người bảo vệ: định danh → Xác thực → giới tính, quốc tịch, dân tộc, địa chỉ */
function BvNbv(p) {
  var xt = React.useState(!!p.xt);
  return FCard('Thông tin người bảo vệ', h(F, null,
    Tf('Số CCCD', { required: true, inputMode: 'numeric', placeholder: 'Nhập 12 chữ số', defaultValue: p.rong ? '' : '001085012345', maxLength: 12, onChange: function () { xt[1](false); } }),
    Tf('Họ và tên', { required: true, defaultValue: p.rong ? '' : 'Trần Minh Khoa', onChange: function () { xt[1](false); } }),
    Tf('Ngày sinh', Dt({ required: true, defaultValue: p.rong ? '' : '20/03/1985' })),
    h('div', { className: 'bv-xt' }, xt[0] ? h(T.Button, { variant: 'secondary', size: 'sm', icon: 'checkCircle', className: 'bv-xt-ok' }, 'Đã xác thực')
      : h(T.Button, { variant: 'secondary', size: 'sm', disabled: !!p.rong, onClick: function () { xt[1](true); } }, 'Xác thực')),
    p.err ? BvLoi('Vui lòng xác thực thông tin người bảo vệ.') : null,
    xt[0] ? RvKV([['Giới tính', 'Nam'], ['Quốc tịch', 'Việt Nam'], ['Dân tộc', 'Kinh']]) : null,
    AddrG('Địa chỉ hiện tại', xt[0], 'full', xt[0] ? ['Thành phố Hà Nội', 'Phường Cầu Giấy', 'Số 12 Trần Thái Tông'] : [], !xt[0]),
    AddrG('Địa chỉ thường trú', 0, 'full', xt[0] ? ['Thành phố Hà Nội', 'Phường Cầu Giấy', 'Số 12 Trần Thái Tông'] : [], true)), true);
}
/* tư cách bảo vệ – trường con theo tư cách */
function BvTuCach(p) {
  var tc = React.useState(p.tc || 'LUAT_SU'), loiLd = tc[0] === 'DAI_DIEN_LAO_DONG' && !p.hc;
  var con = tc[0] === 'LUAT_SU' ? BvNhom('Thông tin luật sư', h(F, null, Tf('Thẻ luật sư', { required: true, maxLength: 50, defaultValue: '12345/TLS' }), Tf('Tên văn phòng/Công ty luật', { required: true, maxLength: 255, defaultValue: 'Công ty Luật TNHH Minh Khoa' }),
      h(SelSheet, { label: 'Đoàn luật sư', req: true, search: true, ph: 'Chọn đoàn luật sư', v: BV_DOAN[0], opts: BV_DOAN })))
    : tc[0] === 'TRO_GIUP_VIEN' ? BvNhom('Thông tin trợ giúp viên', h(F, null, h(SelSheet, { label: 'Điểm trợ giúp pháp lý', req: true, search: true, ph: 'Chọn điểm trợ giúp pháp lý', opts: TG_DIEM.map(function (x) { return { id: x.ma, name: x.ten, desc: x.tinh }; }) }),
      Tf('Trợ giúp viên', { disabled: true, placeholder: 'Chưa có danh mục trợ giúp viên — để trống.' })))
    : tc[0] === 'DAI_DIEN_LAO_DONG' ? BvNhom('Thông tin tổ chức lao động', h(F, null, Tf('Tên tổ chức', { required: true, maxLength: 255 }), Tf('Mã số thuế/Mã định danh tổ chức', { required: true, maxLength: 30 }), AddrG('Địa chỉ trụ sở tổ chức', 1, 'full')))
    : null;
  return FCard('Tư cách bảo vệ', h(F, null, h(SelSheet, { label: 'Tư cách bảo vệ', req: true, ph: 'Chọn tư cách bảo vệ', v: tc[0], opts: BV_TU_CACH, onChange: tc[1] }),
    loiLd ? BvLoi('Tư cách Đại diện lao động chỉ áp dụng cho đơn khởi kiện/vụ án hành chính.') : null, con), true);
}
/* luồng người bảo vệ – bước 2: hồ sơ (nhập tự do) + đương sự được bảo vệ */
function BvDuongSu(p) {
  return FCard('Thông tin đương sự', h(F, null,
    Tf('Mã đơn/Mã vụ án/vụ việc', { required: true, maxLength: 100, placeholder: 'Nhập mã đơn hoặc mã vụ án/vụ việc', defaultValue: p.err ? '' : 'DS-2026-0012', error: p.err ? 'Vui lòng nhập mã đơn hoặc mã vụ án/vụ việc.' : undefined }),
    h(T.Checkbox, { label: 'Đơn khởi kiện/vụ án hành chính', checked: p.hc[0], onChange: function (e) { p.hc[1](e.target.checked); } }),
    BvNhom('Đương sự được bảo vệ', h(F, null, Tf('Họ và tên', { required: true, defaultValue: p.err ? '' : 'Hoàng Dương', error: p.err ? 'Vui lòng nhập họ và tên.' : undefined }),
      Tf('CCCD', { required: true, inputMode: 'numeric', placeholder: 'Nhập 12 chữ số', maxLength: 12, defaultValue: p.err ? '0010900' : '001090012345', error: p.err ? 'Số CCCD phải gồm đúng 12 chữ số.' : undefined }),
      Tf('Ngày sinh', Dt({ required: true, defaultValue: p.err ? '' : '12/05/1990', error: p.err ? 'Vui lòng nhập ngày sinh.' : undefined })),
      h(SelSheet, { label: 'Vai trò tố tụng', req: true, ph: 'Chọn vai trò tố tụng', v: p.err ? '' : BV_VAI_TRO[0], opts: BV_VAI_TRO }),
      p.err ? BvLoi('Vui lòng chọn vai trò tố tụng.') : null))), true);
}
function Bv1(p) {
  var r = p.r;
  return BvWz(r, 1, h(F, null, BvNguoi(r), r === 'd' ? h(BvChonHoSo, { err: p.err }) : h(BvNbv, { err: p.err, rong: p.rong })));
}
function Bv2(p) {
  var r = p.r, hc = React.useState(false);
  return BvWz(r, 2, h(F, null, r === 'd' ? h(BvNbv, { xt: p.xt, err: p.err }) : h(BvDuongSu, { err: p.err, hc: hc }), h(BvTuCach, { hc: r === 'd' ? false : hc[0], tc: p.tc })));
}
function Bv3(p) {
  return BvWz(p.r, 3, h(TaiLieuCard, { title: 'Tải tài liệu chứng minh', desc: 'Tải lên giấy tờ chứng minh tư cách người bảo vệ. Mỗi tệp cần có tên file và loại giấy tờ (Bản gốc, Bản photo, Bản chụp).', bat: [], bb0: {}, loai: BV_LOAI_GT,
    bs0: [{ k: 1, tep: 'the-luat-su-tran-minh-khoa.pdf', ten: 'Thẻ luật sư', loai: 'Bản chụp' }, { k: 2, tep: 'giay-yeu-cau-luat-su.pdf', ten: 'Giấy yêu cầu luật sư', loai: 'Bản gốc' }] }));
}
/* tổng hợp 4 nhóm (TongHop của web) */
function BvTongHop(r) {
  return h(F, null,
    FCard('Người thực hiện đăng ký', RvKV([['Vai trò', BV_VAI[r]]]), true),
    FCard('Thông tin người bảo vệ', RvKV([['Họ và tên', 'Trần Minh Khoa'], ['Số CCCD', '001085012345'], ['Ngày sinh', '20/03/1985'], ['Giới tính', 'Nam'], ['Quốc tịch', 'Việt Nam'], ['Dân tộc', 'Kinh'],
      ['Địa chỉ hiện tại', 'Số 12 Trần Thái Tông, Phường Cầu Giấy, Thành phố Hà Nội'], ['Địa chỉ thường trú', 'Số 12 Trần Thái Tông, Phường Cầu Giấy, Thành phố Hà Nội'],
      ['Tư cách bảo vệ', 'Luật sư'], ['Thẻ luật sư', '12345/TLS'], ['Tên văn phòng/Công ty luật', 'Công ty Luật TNHH Minh Khoa'], ['Đoàn luật sư', BV_DOAN[0]]]), true),
    FCard('Đương sự được bảo vệ', RvKV([['Mã đơn/Mã vụ án/vụ việc', 'DS-2026-0012']].concat(r === 'n' ? [['Đơn khởi kiện/vụ án hành chính', 'Không']] : [],
      [['Tòa án', COURT1], ['Họ và tên', 'Hoàng Dương'], ['CCCD', '001090012345'], ['Ngày sinh', '12/05/1990'], ['Vai trò tố tụng', 'Người đứng đơn']])), true),
    FCard('Tài liệu chứng minh (2 tệp)', h('ul', { className: 'ph-tlr' }, [['Thẻ luật sư', 'Bản chụp'], ['Giấy yêu cầu luật sư', 'Bản gốc']].map(function (x) {
      return h('li', { key: x[0] }, h('span', { className: 'ph-up3-ic ph-tl-ic ph-tl-ok', 'aria-hidden': 'true' }, h(T.Icon, { name: 'file' })), h('span', { className: 'ph-tlr-tx' }, h('b', null, x[0]), h('small', null, x[1])));
    })), true));
}
/* "Gửi Tòa án có thẩm quyền": luồng đương sự tự lấy từ hồ sơ (khóa); luồng người bảo vệ chọn Tòa án */
function BvToaAn(r, chon) {
  return h('section', { className: 'bv-toa' }, h('p', { className: 'bv-toa-h' }, h(T.Icon, { name: 'building' }), 'Gửi Tòa án có thẩm quyền'),
    chon ? h(SelSheet, { label: 'Tòa án nhận đăng ký', req: true, search: true, ph: 'Chọn Tòa án nhận đăng ký', v: r === 'n' ? COURT1 : undefined, opts: TL_TOA })
      : h(T.SelectField, { label: 'Tòa án nhận đăng ký', labelVisible: true, required: true, value: COURT1, disabled: true }));
}
function BvBanGhi(o) {
  return h('section', { className: 'bv-bg' }, h('p', { className: 'bv-bg-h' }, h('b', { className: 'tp-num' }, o.ma), h('span', null, ' · ' + o.tt)),
    o.lyDo !== undefined ? h('div', { className: 'bv-bg-tc' }, h('b', null, 'Lý do từ chối'), h('p', null, o.lyDo || 'Chưa có thông tin lý do từ chối.')) : null,
    o.rows ? RvKV(o.rows) : null, o.nut || null);
}
function Bv4(p) {
  var r = p.r;
  return BvWz(r, 4, h(F, null, p.nhap ? BvBanGhi({ ma: 'DKBV-2026-000131', tt: 'Lưu nháp' }) : null, Lead('Kiểm tra lại thông tin đăng ký trước khi ký số.'), BvTongHop(r), BvToaAn(r, r === 'n')), null, true);
}
function Bv5(p) {
  var r = p.r;
  return KyGuiDon({ title: 'Đăng ký người bảo vệ', steps: BV_STEPS[r], save: false, lead: r === 'd' ? 'Bạn ký số và gửi đăng ký người bảo vệ cho mình.' : 'Người bảo vệ thực hiện ký số trước khi nộp đăng ký đến Tòa án.',
    top: p.kyLai ? NvCall({ tone: 'warning', icon: 'alert', title: 'Cần ký lại' }, 'Thông tin đăng ký đã thay đổi. Vui lòng kiểm tra và ký lại.') : null,
    tep: ['Đăng ký người bảo vệ quyền lợi và nghĩa vụ hợp pháp'], tepMeta: 'DKBV-2026-000131.pdf', vaiTro: r === 'd' ? 'Đương sự đăng ký cho mình' : 'Người bảo vệ',
    bottom: h(F, null, h('div', { className: 'ph-2btn bv-xem' }, Btn('Xem đăng ký', 'secondary', { size: 'sm', icon: 'eye', 'data-pt-go': 'defenderPreview' }), Btn('Xem bản in', 'secondary', { size: 'sm', icon: 'file', 'data-pt-go': 'snack:Đang mở bản in đăng ký (PDF).' })),
      P('Người ký: Hoàng Dương · ' + (r === 'd' ? 'Đương sự đăng ký cho mình' : 'Người bảo vệ'), 'ph-muted bv-sm')),
    kyNote: 'Ký số bản đăng ký trước khi nộp đến Tòa án.', ok: 'bvOk', sendLabel: 'Nộp đăng ký' });
}
function BvOk() {
  return OkScr({ title: 'Nộp đăng ký thành công', text: 'Đăng ký DKBV-2026-000131 đã được gửi tới ' + COURT1 + '. Kết quả chấp nhận hoặc từ chối sẽ được thông báo qua Hộp thư tống đạt.',
    extra: h('div', { className: 'bv-ok-tt' }, h(T.StatusBadge, { tone: 'info' }, 'Đã gửi đăng ký')),
    btns: h(F, null, Btn('Xem đăng ký', 'primary', { icon: 'file', 'data-pt-go': 'replace:defenderView' }), Btn('Danh sách đăng ký', 'secondary', { 'data-pt-go': 'reset:home,records,defenders' })) });
}
/* chế độ chỉ xem (đã gửi / chấp nhận / từ chối) */
/* v251: phần đầu kiểu chi tiết đơn – mã · ngày gửi, tên 16px, nhãn trạng thái; nhãn – giá trị căn trái */
/* v349: chi tiết đăng ký theo khung Chi tiết đơn: mã · ngày gửi, tên, nhãn trạng thái; khối lý do khi từ chối; 2 tab Thông tin đăng ký | Kết quả xử lý */
function BvXem(p) {
  var tt = p.tt || 'DA_GUI', r = BV_DS.filter(function (x) { return x.tt === tt; })[0];
  var rows = [['Ngày gửi', r.gui]].concat(tt !== 'DA_GUI' ? [['Ngày có kết quả', tt === 'CHAP_NHAN' ? '24/10/2026' : '15/10/2026']] : [], [['Đã ký số', r.gui + ' 09:15 · Ký số từ xa']]);
  return h(DtScreen, { title: 'Chi tiết đăng ký', tabLabel: 'Nội dung đăng ký người bảo vệ', tabs: [{ key: 'tt', label: 'Thông tin đăng ký' }, { key: 'kq', label: 'Kết quả xử lý' }], headCls: 'dt-head-don',
    meta: h(F, null, h('span', { className: 'tp-num' }, r.ma), ' · Gửi ' + r.gui),
    name: 'Đăng ký người bảo vệ – ' + r.nbv,
    badges: h(T.StatusBadge, { tone: BV_TT[tt][1], icon: false }, BV_TT[tt][0]),
    pre: tt === 'TU_CHOI' ? h(DtViec, { t: 'Tòa án từ chối đăng ký', han: '[Lý do từ chối do Tòa án ghi]', tone: 'danger' }) : null,
    render: function (t) {
      if (t === 'kq') return h(F, null, FCard('Kết quả xử lý', RvKV(rows), true), FCard('Bản đăng ký đã ký', DtDocs([['Đăng ký người bảo vệ – ' + r.ma + '.pdf', 'PDF · Đã ký số']]), true));
      return h(F, null, BvTongHop('d'), BvToaAn('d', false));
    } });
}
/* "Xem đăng ký" ở bước ký số – bản tổng hợp chỉ đọc */
function BvPreview() { return SubS('Xem đăng ký người bảo vệ', h(F, null, BvTongHop('d'), BvToaAn('d', false)), Bar(Btn('Đóng', 'secondary', { 'data-pt-go': 'back' }))); }

/* ===== 11. Quản lý lịch, phiên tòa (v199, 04/11/2026 – web /lich: screens/lich/index.tsx, phien-toa.tsx, modals/*, components/phien-vu-an-section.tsx, cai-dat-thong-bao-nhan.tsx, canh-bao-*.tsx)
   Thay toàn bộ thiết kế Lịch cũ (Lịch cá nhân / Phiên tòa, phiên họp). 4 tab như web: Lịch, phiên tòa · Buổi phải dự · Phiên đã diễn ra · Nhắc lịch.
   Màu 5 loại sự kiện lấy bảng màu nhãn của design system (tp-tag-n) – web dùng mã màu riêng. Dữ liệu mẫu tháng 11/2026, hôm nay 04/11/2026. */
var LC_LOAI = { PT: ['Phiên tòa', 9], PH: ['Phiên họp', 8], HG: ['Phiên hòa giải', 10], DT: ['Phiên đối thoại', 1], TCD: ['Tiếp công dân', 6] }; /* gần màu web: xanh lam, xanh biển, tím, hồng, xanh lục */
var LC_ORDER = ['PT', 'PH', 'HG', 'DT', 'TCD'];
var LC_EV = [
  { id: 'e1', d: 5, gio: '08:30', loai: 'PH', ten: 'Phiên họp kiểm tra việc giao nộp, tiếp cận, công khai chứng cứ', va: 'DS-2026-0018', ht: 'Trực tuyến', dd: 'Phòng họp trực tuyến số 2', toa: COURT1, act: ['Xem giấy triệu tập', 'Vào phòng chờ'] },
  { id: 'e2', d: 6, gio: '14:00', loai: 'PT', ten: 'Phiên tòa sơ thẩm – Tranh chấp hợp đồng vay tài sản', va: 'DS-2026-0012', ht: 'Trực tiếp', dd: 'Phòng xử án số 1', toa: COURT1, act: ['Xem giấy triệu tập'] },
  { id: 'e3', d: 10, gio: '09:00', loai: 'HG', ten: 'Phiên hòa giải tranh chấp hợp đồng thuê nhà', va: 'HG-2026-0018', ht: 'Trực tiếp', dd: 'Phòng hòa giải số 2', toa: KV2, act: ['Xem giấy triệu tập'] },
  { id: 'e4', d: 12, gio: '14:00', loai: 'DT', ten: 'Phiên đối thoại vụ án hành chính', va: 'HC-2026-0004', ht: 'Trực tuyến kết hợp trực tiếp', dd: 'Phòng đối thoại số 1', toa: COURT1, act: ['Xem giấy triệu tập', 'Vào phòng chờ'] },
  { id: 'e5', d: 12, gio: '15:30', loai: 'PH', ten: 'Phiên họp công khai chứng cứ và hòa giải', va: 'DS-2026-0021', ht: 'Trực tiếp', dd: 'Phòng họp số 3', toa: KV2, act: ['Xem giấy triệu tập'] },
  { id: 'e6', d: 18, gio: '08:00', loai: 'TCD', ten: 'Lịch tiếp công dân', va: null, ht: 'Trực tiếp', dd: 'Phòng tiếp công dân', toa: COURT1, act: ['Xem phiếu hẹn'] },
  { id: 'e7', d: 26, gio: '08:30', loai: 'PT', ten: 'Phiên tòa sơ thẩm – Tranh chấp hợp đồng mua bán tài sản', va: 'DS-2026-0018', ht: 'Trực tiếp', dd: 'Phòng xử án số 2', toa: COURT1, act: ['Xem giấy triệu tập'] }];
var LC_WEEK = [2, 3, 4, 5, 6, 7, 8];
function lcNgay(d) { return (d < 10 ? '0' : '') + d + '/11/2026'; }
function lcInfo(e, gio) { return [gio ? e.gio : null, e.ht, e.dd, e.toa].filter(Boolean).join(' · '); }
function LcTag(loai) { return h('span', { className: 'lc-tag tp-tag-' + LC_LOAI[loai][1] }, LC_LOAI[loai][0]); }
function lcGo(a) { return a === 'Vào phòng chờ' ? 'waitingRoom' : a === 'Xem phiếu hẹn' ? 'snack:Đang mở phiếu hẹn (PDF).' : 'snack:Đang mở giấy triệu tập (PDF).'; }
/* thẻ chi tiết trong khung "Ngày đang chọn" (ChiTietNgay): loại + giờ · tiêu đề · hình thức · địa điểm · tòa án · nút */
function LcDayCard(e, onMo) {
  return h('article', { key: e.id, className: 'lc-dc tp-tag-' + LC_LOAI[e.loai][1] },
    h('div', { className: 'lc-dc-h' }, LcTag(e.loai), h('span', { className: 'lc-dc-gio tp-num' }, h(T.Icon, { name: 'clock' }), e.gio || 'Cả ngày')),
    h('button', { type: 'button', className: 'lc-dc-t', onClick: function () { onMo(e); } }, e.ten),
    h('p', { className: 'lc-dc-i' }, lcInfo(e)),
    e.va ? h('p', { className: 'lc-dc-i' }, 'Vụ án ', h('b', { className: 'tp-num' }, e.va)) : null,
    h('div', { className: 'lc-dc-a' }, e.act.map(function (a, i) { return Btn(a, a === 'Vào phòng chờ' ? 'primary' : 'secondary', { key: a, size: 'sm', icon: a === 'Vào phòng chờ' ? 'arrowRight' : 'file', 'data-pt-go': lcGo(a) }); })));
}
/* dòng của chế độ Danh sách (SuKienCard): ngày · vạch màu · tiêu đề + giờ · hình thức · địa điểm · nhãn loại */
function LcRow(e, onMo) {
  return h('li', { key: e.id }, h('button', { type: 'button', className: 'lc-row tp-tag-' + LC_LOAI[e.loai][1], onClick: function () { onMo(e); } },
    h('span', { className: 'lc-row-d' }, h('b', { className: 'tp-num' }, (e.d < 10 ? '0' : '') + e.d), h('small', null, 'TH11')), h('i', { className: 'lc-row-bar', 'aria-hidden': 'true' }),
    h('span', { className: 'lc-row-tx' }, h('b', null, e.ten), h('small', null, lcInfo(e, true))), LcTag(e.loai)));
}
/* "Chi tiết sự kiện lịch" (modal-chi-tiet-su-kien) */
function LcEvSheet(p) {
  var e = p.e;
  return h(LvSheet, { host: p.host, title: 'Chi tiết sự kiện lịch', onClose: p.onClose, foot: h('div', { className: 'ph-2btn' }, e.act.map(function (a) { return Btn(a, a === 'Vào phòng chờ' ? 'primary' : 'secondary', { key: a, 'data-pt-go': lcGo(a) }); })) },
    h('div', { className: 'lc-ev' }, h('div', { className: 'lc-dc-h' }, LcTag(e.loai), h('span', { className: 'lc-dc-gio tp-num' }, h(T.Icon, { name: 'clock' }), e.gio + ' · ' + lcNgay(e.d))), h('b', { className: 'lc-ev-t' }, e.ten),
      RvKV([['Hình thức', e.ht === 'Trực tiếp' ? 'Tại trụ sở Tòa án' : 'Trực tuyến qua hệ thống xét xử điện tử của Tòa án'], ['Địa điểm', e.dd], ['Tòa án', e.toa]].concat(e.va ? [['Vụ án', e.va], ['Văn bản ấn định', 'Quyết định đưa vụ án ra xét xử · số 15/2026/QĐXXST-DS']] : [], [['Trạng thái phiên', 'Sắp diễn ra']]))));
}
var LC_TABS = [{ key: 'lich', label: 'Lịch tố tụng' }, { key: 'du', label: 'Buổi phải dự', count: 4 }, { key: 'qua', label: 'Phiên đã diễn ra', count: 3 }, { key: 'nhac', label: 'Nhắc lịch' }];
function LcScr(p) {
  var tab = React.useState(p.tab || 'lich');
  return Sub('Lịch tố tụng', h(F, null,
    h('div', { className: 'lc-tabs' }, h(T.Tabs, { label: 'Lịch tố tụng', value: tab[0], onChange: tab[1], items: LC_TABS })),
    tab[0] === 'lich' ? h(LcLich, p) : tab[0] === 'du' ? h(LcDu, p) : tab[0] === 'qua' ? h(LcQua, p) : h(LcNhac, p)));
}
function LcLich(p) {
  var mode = React.useState(p.mode || 'month'), sel = React.useState(p.rong ? 4 : p.sel || 5), tat = React.useState({}), q = React.useState(''), ev = React.useState(p.ev ? LC_EV[0] : null), anchor = React.useRef(null), host = useHost(anchor);
  var k = khongDau(q[0].trim());
  var ds = p.rong ? [] : LC_EV.filter(function (e) { return !tat[0][e.loai] && (!k || khongDau([e.ten, e.va, e.dd, e.toa].join(' ')).indexOf(k) >= 0); });
  if (mode[0] === 'week') ds = ds.filter(function (e) { return LC_WEEK.indexOf(e.d) >= 0; });
  var ngay = ds.filter(function (e) { return e.d === sel[0]; }), mo = function (e) { ev[1](e); };
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    h('div', { className: 'fx-search' }, Tf('Tìm sự kiện', { icon: 'search', placeholder: 'Tìm sự kiện, vụ án, địa điểm...', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })),
    h('div', { className: 'lc-leg', role: 'group', 'aria-label': 'Loại sự kiện hiển thị' }, LC_ORDER.map(function (l) {
      var off = !!tat[0][l];
      return h('button', { key: l, type: 'button', className: 'lc-leg-it tp-tag-' + LC_LOAI[l][1] + (off ? ' lc-off' : ''), 'aria-pressed': !off, title: (off ? 'Bấm để bật lại ' : 'Bấm để tắt hiển thị ') + LC_LOAI[l][0], onClick: function () { var n = Object.assign({}, tat[0]); n[l] = !off; tat[1](n); } }, h('i', { 'aria-hidden': 'true' }), LC_LOAI[l][0]);
    })),
    h(T.CalendarCard, { monthLabel: mode[0] === 'week' ? '02/11 – 08/11/2026' : 'Tháng 11, 2026', mode: mode[0], onModeChange: mode[1], offset: 6, days: 30, week: LC_WEEK, today: 4, selected: sel[0],
      eventDays: ds.map(function (e) { return e.d; }), onSelect: sel[1], onToday: function () { sel[1](4); }, onPrev: noop, onNext: noop, legend: 'Có buổi phải dự hoặc lịch hẹn' }),
    mode[0] === 'list' ? h('section', { className: 'lc-sec' }, h('p', { className: 'lc-sec-h' }, 'Danh sách sự kiện trong kỳ: ', h('b', null, ds.length)),
      ds.length ? h('ul', { className: 'lc-rows' }, ds.map(function (e) { return LcRow(e, mo); })) : LcRong())
      : h('section', { className: 'lc-sec' }, h('div', { className: 'lc-sec-hd' }, h('p', { className: 'lc-sec-h' }, 'Ngày ' + lcNgay(sel[0])), h('small', null, ngay.length + ' việc trong ngày')),
        ngay.length ? ngay.map(function (e) { return LcDayCard(e, mo); }) : LcRong()),
    ev[0] && host ? h(LcEvSheet, { host: host, e: ev[0], onClose: function () { ev[1](null); } }) : null);
}
function LcRong() { return h('div', { className: 'lc-rong' }, h(T.Icon, { name: 'calendar' }), h('b', null, 'Không có sự kiện'), h('p', null, 'Sự kiện tự xuất hiện khi có văn bản tống đạt mang mốc thời gian.')); }

/* --- Buổi phải dự / Phiên đã diễn ra (PhienVuAnSection) --- */
var LC_DU = [
  { id: 'p1', loai: 'PT', ten: 'Phiên tòa sơ thẩm', va: 'DS-2026-0012', vaTen: 'Tranh chấp hợp đồng vay tài sản', vt: 'Nguyên đơn', tg: '14:00 · 06/11/2026', con: 'Còn 2 ngày 3 giờ', ht: 'Có mặt trực tiếp tại Tòa án', toa: COURT1, giay: ['Giấy triệu tập', '22/2026/GTT · Đã tống đạt ngày 28/10/2026'], ph: 'CHUA', han: '05/11/2026', go: 'hearingDetail' },
  { id: 'p2', loai: 'PH', ten: 'Phiên họp kiểm tra việc giao nộp, tiếp cận, công khai chứng cứ', va: 'DS-2026-0018', vaTen: 'Tranh chấp hợp đồng mua bán tài sản', vt: 'Bị đơn', tg: '08:30 · 05/11/2026', con: 'Còn 20 giờ 15 phút', ht: 'Tham dự trực tuyến tại điểm cầu tự chọn', toa: COURT1, giay: ['Giấy triệu tập', '19/2026/GTT · Đã tống đạt ngày 26/10/2026'], ph: 'CO_MAT', luc: '09:12 03/11/2026', online: true, go: 'hearingDetailDone' },
  { id: 'p3', loai: 'HG', ten: 'Phiên hòa giải', va: 'HG-2026-0018', vaTen: 'Hòa giải tranh chấp hợp đồng thuê nhà', vt: 'Người khởi kiện', tg: '09:00 · 10/11/2026', con: 'Còn 5 ngày', ht: 'Có mặt trực tiếp tại Tòa án', toa: KV2, giay: ['Thông báo hòa giải', '07/2026/TB-HG · Đã tống đạt ngày 30/10/2026'], ph: 'CHUA', han: '08/11/2026', go: 'hearingDetail' },
  { id: 'p4', loai: 'PT', ten: 'Phiên tòa sơ thẩm', va: 'DS-2026-0021', vaTen: 'Tranh chấp quyền sử dụng đất', vt: 'Người có quyền lợi, nghĩa vụ liên quan', tg: '08:00 · 04/11/2026', ht: 'Có mặt trực tiếp tại Tòa án', toa: KV2, giay: ['Giấy triệu tập', '18/2026/GTT · Đã tống đạt ngày 20/10/2026'], hoan: { qd: '05/2026/QĐ-HPT', moi: null }, go: 'hearingDetailPost' }];
var LC_QUA = [
  { id: 'q1', loai: 'PT', ten: 'Phiên tòa sơ thẩm', va: 'DS-2026-0008', vaTen: 'Tranh chấp hợp đồng tín dụng', tg: '09:00 · 20/10/2026', toa: COURT1, kq: ['Đã tham dự', 'success'], nd: 'Bản án/QĐ số 45/2026/DS-ST ngày 20/10/2026. Chưa có hiệu lực pháp luật', nut: ['Xem quyết định', 'Xem biên bản'] },
  { id: 'q2', loai: 'HG', ten: 'Phiên hòa giải', va: 'HG-2026-0011', vaTen: 'Hòa giải tranh chấp lối đi chung', tg: '14:00 · 15/10/2026', toa: KV2, kq: ['Đã hoãn', 'warning'], nd: 'Hoãn do vắng mặt người bị kiện có lý do chính đáng.', nut: ['Xem thông báo hoãn'] },
  { id: 'q3', loai: 'PH', ten: 'Phiên họp kiểm tra việc giao nộp chứng cứ', va: 'DS-2026-0012', vaTen: 'Tranh chấp hợp đồng vay tài sản', tg: '08:30 · 08/10/2026', toa: COURT1, kq: ['Vắng mặt', 'danger'], nd: 'Đã hoàn thành phiên theo kế hoạch của Tòa án.', nut: ['Xem biên bản'] }];
function LcLoc(p) {
  var sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), q = React.useState('');
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    h('div', { className: 'ph-ibar' }, h('div', { className: 'fx-search' }, Tf('Tìm phiên', { icon: 'search', placeholder: 'Tìm mã vụ án, tên vụ án, đương sự…', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })),
      h('button', { type: 'button', className: 'ph-ibar-btn', 'aria-label': 'Bộ lọc', onClick: function () { sh[1](true); } }, h(T.Icon, { name: 'funnel' }))),
    h('p', { className: 'lc-dem' }, p.dem),
    sh[0] && host ? h(LvSheet, { host: host, title: 'Bộ lọc', onClose: function () { sh[1](false); }, foot: h('div', { className: 'ph-2btn' }, Btn('Đặt lại', 'secondary', { onClick: function () { sh[1](false); } }), Btn('Áp dụng', 'primary', { onClick: function () { sh[1](false); } })) },
      h('div', { className: 'kn-loc' }, h(SelSheet, { label: 'Tòa án', v: 'Tất cả', opts: ['Tất cả', COURT1, KV2] }), h(SelSheet, { label: 'Hình thức', v: 'Tất cả', opts: ['Tất cả', 'Trực tiếp', 'Trực tuyến', 'Kết hợp'] }),
        h(SelSheet, { label: 'Thời gian', v: 'Tất cả', opts: p.qua ? ['Tất cả', 'Tháng này', 'Tháng trước'] : ['Tất cả', 'Tháng này', 'Tháng tới'] }))) : null);
}
function LcDuCard(r) {
  var nhan = r.hoan ? ['Đã hoãn', 'danger'] : ['Sắp diễn ra', 'info'];
  return h('li', { key: r.id, className: 'qd-c lc-c' }, h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem chi tiết ' + r.ten, 'data-pt-go': r.go }),
    h('div', { className: 'tly-h' }, LcTag(r.loai), h(T.StatusBadge, { tone: nhan[1] }, nhan[0])),
    h('b', { className: 'pt-c-t' }, r.ten), h('p', { className: 'pt-c-m' }, h('b', { className: 'tp-num' }, r.va), ' · ' + r.vaTen), h('p', { className: 'pt-c-m' }, 'Tư cách: ' + r.vt),
    r.hoan ? h('div', { className: 'lc-khan', role: 'alert' }, h(T.Icon, { name: 'alert' }), h('div', null, h('b', null, 'CẢNH BÁO KHẨN: Phiên tòa đã bị hoãn theo Quyết định của Tòa án'), h('p', null, 'Quyết định hoãn số ' + r.hoan.qd + '. Đương sự vui lòng không di chuyển đến trụ sở Tòa án.'), h('p', null, 'Lịch cũ: ' + r.tg + ' → Lịch mới: Tòa án sẽ thông báo sau'))) : null,
    h('ul', { className: 'lc-li' }, [['clock', r.tg + (r.con ? ' · ' + r.con : '')], ['mapPin', r.ht], ['building', r.toa], ['file', r.giay[0] + ' · ' + r.giay[1]]].map(function (x) { return h('li', { key: x[0] }, h(T.Icon, { name: x[0] }), x[1]); })),
    r.hoan ? null : r.ph === 'CO_MAT' ? h('p', { className: 'lc-ph lc-ph-ok' }, h(T.Icon, { name: 'checkCircle' }), 'Đã xác nhận có mặt lúc ' + r.luc)
      : h('p', { className: 'lc-ph' }, h(T.Icon, { name: 'clock' }), 'Chưa phản hồi tham dự · hạn ' + r.han),
    r.hoan ? h('div', { className: 'lc-c-a' }, Btn('Xem thông báo hoãn', 'secondary', { size: 'sm', icon: 'file', 'data-pt-go': 'snack:Đang mở quyết định hoãn phiên tòa (PDF).' }))
      : h('div', { className: 'lc-c-a' }, r.ph === 'CHUA' ? Btn('Phản hồi tham dự', 'primary', { size: 'sm', 'data-pt-go': 'attendReply' }) : null, r.online ? Btn('Vào phòng chờ', r.ph === 'CHUA' ? 'secondary' : 'primary', { size: 'sm', icon: 'arrowRight', 'data-pt-go': 'waitingRoom' }) : null,
        Btn('Xem giấy triệu tập', 'secondary', { size: 'sm', icon: 'file', 'data-pt-go': 'snack:Đang mở ' + r.giay[0].toLowerCase() + ' (PDF).' })));
}
function LcDu(p) {
  var an = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), trung = React.useState(!!p.trung);
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    !an[0] ? h('div', { className: 'lc-khan lc-khan-top', role: 'alert' }, h(T.Icon, { name: 'alert' }), h('div', null, h('b', null, 'Phiên tòa hôm nay đã bị hoãn'), h('p', null, 'Phiên tòa sơ thẩm DS-2026-0021 lúc 08:00 · 04/11/2026 · Đã hoãn.'),
      h('button', { type: 'button', className: 'ph-link', onClick: function () { an[1](true); } }, 'Đã hiểu, đóng cảnh báo'))) : null,
    h(LcLoc, { dem: LC_DU.length + ' buổi phải dự' }), h('ul', { className: 'qd-list' }, LC_DU.map(LcDuCard)),
    trung[0] && host ? h(LvSheet, { host: host, title: 'Cảnh báo trùng lịch', onClose: function () { trung[1](false); }, foot: Btn('Đóng', 'secondary', { block: true, onClick: function () { trung[1](false); } }) },
      h('div', { className: 'lc-trung' }, P('Bạn có 2 buổi phải dự trùng giờ hoặc cách nhau dưới 120 phút khác tòa án:', 'ph-muted'),
        h('ul', { className: 'lc-li' }, h('li', null, h(T.Icon, { name: 'clock' }), '14:00 · 12/11/2026 – Phiên đối thoại HC-2026-0004 · ' + COURT1), h('li', null, h(T.Icon, { name: 'clock' }), '15:30 · 12/11/2026 – Phiên họp DS-2026-0021 · ' + KV2)),
        NoteBox(h('p', null, 'Bạn có thể làm đơn đề nghị hoãn phiên hoặc liên hệ Tòa án để được hướng dẫn.')))) : null);
}
function LcQua() {
  return h(F, null, h(LcLoc, { dem: LC_QUA.length + ' buổi đã diễn ra', qua: true }), h('ul', { className: 'qd-list' }, LC_QUA.map(function (r) {
    return h('li', { key: r.id, className: 'qd-c lc-c' }, h('div', { className: 'tly-h' }, LcTag(r.loai), h(T.StatusBadge, { tone: r.kq[1] }, r.kq[0])),
      h('b', { className: 'pt-c-t' }, r.ten), h('p', { className: 'pt-c-m' }, h('b', { className: 'tp-num' }, r.va), ' · ' + r.vaTen),
      h('ul', { className: 'lc-li' }, h('li', null, h(T.Icon, { name: 'clock' }), r.tg), h('li', null, h(T.Icon, { name: 'building' }), r.toa)), h('p', { className: 'lc-kq' }, r.nd),
      h('div', { className: 'lc-c-a' }, r.nut.map(function (n) { return Btn(n, 'secondary', { key: n, size: 'sm', icon: 'file', 'data-pt-go': 'snack:Đang mở văn bản (PDF).' }); })));
  })));
}
/* Nhắc lịch (CaiDatNhacViecSection + CaiDatThongBaoNhan): mỗi nhãn văn bản chọn nhắc trước 1/3/5/7 ngày */
var LC_NHAC = [['GIAYMOI_TT', 'Giấy mời, triệu tập', 'Phiên tòa, phiên họp, hòa giải, đối thoại bạn được triệu tập.', 'Giấy triệu tập phiên tòa sơ thẩm', 3], ['THONG_BAO', 'Thông báo', 'Thông báo của Tòa án có mốc thời gian phải thực hiện.', 'Thông báo nộp tiền tạm ứng án phí', 3],
  ['QUYET_DINH', 'Quyết định', 'Quyết định có thời hạn kháng cáo, khiếu nại.', 'Quyết định đưa vụ án ra xét xử', 5], ['BAN_AN', 'Bản án', 'Thời hạn kháng cáo bản án sơ thẩm.', null, 7], ['DON_YEUCAU', 'Đơn, yêu cầu', 'Hạn sửa đổi, bổ sung đơn, nộp tài liệu.', 'Thông báo sửa đổi, bổ sung đơn khởi kiện', 1]];
function LcNhac() {
  var v = React.useState(LC_NHAC.reduce(function (o, x) { o[x[0]] = x[4]; return o; }, {}));
  return h(F, null, h('section', { className: 'lc-nhac' }, h('b', { className: 'lc-nhac-h' }, 'Nhắc trước bao lâu'),
    /* v266: đổi tên chức năng Trung tâm thông báo → Thông báo */
    P('Với từng nhãn văn bản của Tòa án, chọn nhắc trước hạn bao nhiêu ngày. Ngoài ra, hệ thống luôn nhắc thêm một lần vào ngày trước hạn. Muốn bật hoặc tắt thông báo, vào Thông báo, mục Cài đặt.', 'ph-muted'),
    h('ul', { className: 'lc-nhac-l' }, LC_NHAC.map(function (x) {
      return h('li', { key: x[0] }, h('div', { className: 'lc-nhac-t' }, h('i', { className: 'tp-tag-' + IB_MAU[x[0]], 'aria-hidden': 'true' }), h('div', null, h('b', null, x[1]), h('p', null, x[2]), x[3] ? h('small', null, 'Ví dụ: ' + x[3]) : null)),
        h('div', { className: 'lc-nhac-o', role: 'radiogroup', 'aria-label': 'Nhắc trước – ' + x[1] }, [1, 3, 5, 7].map(function (n) { var on = v[0][x[0]] === n; return h('button', { key: n, type: 'button', role: 'radio', 'aria-checked': on, className: 'ib-chip2' + (on ? ' ib-chip2-on' : ''), onClick: function () { var o = Object.assign({}, v[0]); o[x[0]] = n; v[1](o); } }, n + ' ngày'); })));
    }))), Btn('Lưu cài đặt', 'primary', { block: true, 'data-pt-go': 'snack:Đã lưu cài đặt nhắc lịch.' }));
}

/* --- Chi tiết phiên tòa (phien-toa.tsx ChiTietPhienToa) --- */
var LC_LS = [['Ấn định phiên', '28/10/2026', 'Quyết định đưa vụ án ra xét xử số 15/2026/QĐXXST-DS – mở phiên 14:00 06/11/2026'], ['Tống đạt giấy triệu tập', '28/10/2026', 'Giấy triệu tập số 22/2026/GTT']];
function LcDetail(p) {
  var anchor = React.useRef(null), host = useHost(anchor), sh = React.useState(p.sheet || null), hoan = !!p.hoan, done = !!p.done, online = !!p.online;
  var tieu = hoan ? 'Phiên tòa sơ thẩm' : 'Phiên tòa sơ thẩm', va = hoan ? 'DS-2026-0021 · Tranh chấp quyền sử dụng đất' : 'DS-2026-0012 · Tranh chấp hợp đồng vay tài sản';
  return SubS('Chi tiết phiên tòa', h(F, null, h('span', { ref: anchor, hidden: true }),
    hoan ? h('div', { className: 'lc-khan', role: 'alert' }, h(T.Icon, { name: 'alert' }), h('div', null, h('b', null, 'KHẨN CẤP · Hoãn phiên trong vòng 24 giờ'), h('p', null, 'Thay đổi lịch do Tòa án quyết định · Hoãn theo Quyết định số 05/2026/QĐ-HPT. Đương sự vui lòng không di chuyển đến trụ sở Tòa án.'))) : null,
    h('section', { className: 'lc-hd' }, h('div', { className: 'tly-h' }, LcTag('PT'), h(T.StatusBadge, { tone: hoan ? 'danger' : 'info' }, hoan ? 'Đã hoãn' : 'Sắp diễn ra')),
      h('b', { className: 'lc-hd-t' }, tieu), h('p', { className: 'pt-c-m' }, va), h('p', { className: 'lc-hd-m' }, hoan ? 'Phiên tòa đã có quyết định hoãn' : 'Ấn định phiên · Phiên mở lúc ' + (online ? '08:30 05/11/2026' : '14:00 06/11/2026')),
      hoan ? null : h('p', { className: 'lc-dem-ng tp-num' }, h(T.Icon, { name: 'clock' }), online ? 'Còn 20 giờ 15 phút' : 'Còn 2 ngày 3 giờ')),
    FCard('Thông tin phiên', RvKV([['Vụ án', va], ['Tư cách tham gia', hoan ? 'Người có quyền lợi, nghĩa vụ liên quan' : 'Nguyên đơn'], [hoan ? 'Thời gian (lịch đã hoãn)' : 'Thời gian', hoan ? '08:00 · 04/11/2026' : online ? '08:30 · 05/11/2026' : '14:00 · 06/11/2026'],
      ['Địa điểm / hình thức', online ? 'Trực tuyến · Phòng họp trực tuyến số 2' : 'Trực tiếp · Phòng xử án số 1'], ['Tòa án', hoan ? KV2 : COURT1]]), true),
    hoan ? FCard('Quyết định hoãn phiên tòa', h(F, null, RvKV([['Số quyết định', '05/2026/QĐ-HPT'], ['Ngày ban hành', '03/11/2026'], ['Lý do hoãn', 'Thẩm phán được phân công giải quyết vắng mặt vì lý do bất khả kháng']]),
      Btn('Xem quyết định hoãn', 'secondary', { size: 'sm', icon: 'file', 'data-pt-go': 'snack:Đang mở quyết định hoãn (PDF).' }), NoteBox(h('p', null, 'Chưa ấn định lịch mới. Bạn sẽ nhận thông báo khi Tòa án có lịch mới.'))), true) : null,
    FCard('Văn bản ấn định', h('ul', { className: 'lc-vb' }, [['Quyết định đưa vụ án ra xét xử', 'Số 15/2026/QĐXXST-DS · Ban hành ngày 27/10/2026'], ['Giấy triệu tập', 'Số 22/2026/GTT · Đã tống đạt ngày 28/10/2026']].map(function (x) {
      return h('li', { key: x[0] }, h('div', null, h('b', null, x[0]), h('small', null, x[1])), IcoBtn('eye', 'Xem ' + x[0], 'snack:Đang mở ' + x[0].toLowerCase() + ' (PDF).'));
    })), true),
    online && !hoan ? FCard('Tham dự trực tuyến', h(F, null, RvKV([['Điểm cầu của bạn', 'Điểm cầu cá nhân (tự bảo đảm thiết bị)'], ['Mã phòng', h('span', { className: 'tp-num' }, 'TA1-7Q4K-29')], ['Mật khẩu', h('span', { className: 'tp-num' }, '••••••')], ['Trạng thái', 'Mở trước giờ xử 30 phút']]),
      P('Mã phòng họp bảo mật · Cấp tự động từ Hệ thống Quản lý án', 'ph-muted lc-sm'),
      h('div', { className: 'ph-2btn' }, Btn('Vào phòng chờ', 'primary', { icon: 'arrowRight', 'data-pt-go': 'waitingRoom' }), Btn('Nội quy', 'secondary', { onClick: function () { sh[1]('nq'); } }))), true) : null,
    FCard('Phản hồi tham dự của bạn', hoan ? P('Buổi này không còn ở trạng thái cần phản hồi (đã hoãn/huỷ/đã diễn ra).', 'ph-muted')
      : done ? h(F, null, h('p', { className: 'lc-ph lc-ph-ok' }, h(T.Icon, { name: 'checkCircle' }), 'Đã xác nhận có mặt lúc 09:12 03/11/2026'), RvKV([['Điểm cầu', 'Điểm cầu cá nhân (tự bảo đảm thiết bị)']]), Btn('Đổi sang báo vắng', 'secondary', { size: 'sm', 'data-pt-go': 'attendAbsent' }))
      : h(F, null, h('p', { className: 'lc-ph' }, h(T.Icon, { name: 'clock' }), 'Chưa phản hồi · hạn xác nhận trực tuyến 05/11/2026'), P('Phiên tòa xét xử thuộc diện phải gửi phản hồi xác nhận tham dự trước (Điều 227, 228 BLTTDS).', 'ph-muted lc-sm'),
        h('div', { className: 'ph-2btn' }, Btn('Xác nhận có mặt', 'primary', { 'data-pt-go': 'attendReply' }), Btn('Báo vắng mặt', 'secondary', { 'data-pt-go': 'attendAbsent' }))), true),
    h('button', { type: 'button', className: 'lc-ls', onClick: function () { sh[1]('ls'); } }, h(T.Icon, { name: 'clock' }), h('span', null, h('b', null, 'Lịch sử tố tụng'), h('small', null, hoan ? 'Các lần ấn định, hoãn và biến động lịch của phiên này (3 mốc), theo thứ tự từ cũ đến mới.' : 'Mốc ấn định và diễn biến xét xử của phiên này, ghi nhận từ Tòa án.')), h(T.Icon, { name: 'chevronRight' })),
    sh[0] === 'ls' && host ? h(LvSheet, { host: host, title: 'Lịch sử tố tụng', onClose: function () { sh[1](null); } }, h('ol', { className: 'lc-tl' }, LC_LS.concat(hoan ? [['Hoãn', '03/11/2026', 'Lịch cũ: 08:00 04/11/2026 → Lịch mới: chưa ấn định · Lý do: Thẩm phán vắng mặt vì lý do bất khả kháng · Quyết định số 05/2026/QĐ-HPT']] : []).map(function (x) {
      return h('li', { key: x[0] }, h('b', null, x[0]), h('small', { className: 'tp-num' }, x[1]), h('p', null, x[2]));
    }))) : null,
    sh[0] === 'nq' && host ? h(LvSheet, { host: host, title: 'Nội quy phiên tòa, phiên họp trực tuyến', onClose: function () { sh[1](null); } }, h('div', { className: 'lc-nq' },
      NvCall({ tone: 'info', icon: 'info', title: 'Căn cứ' }, 'Nghị quyết số 33/2021/QH15 của Quốc hội và Thông tư liên tịch số 05/2021/TTLT-TANDTC-VKSNDTC-BCA-BQP-BTP.'),
      h('ol', null, [['Thời gian tham gia', 'Có mặt tại phòng xử án trực tuyến trước giờ mở phiên ít nhất 15–30 phút để Thư ký kiểm tra căn cước, phổ biến nội quy và kiểm tra kỹ thuật.'], ['Trang phục và tác phong', 'Mặc trang phục lịch sự, nghiêm túc; nơi đủ ánh sáng, phông nền trang nghiêm, yên tĩnh, không có người ngoài tham gia.'],
        ['Thiết bị và đường truyền', 'Luôn bật camera trong suốt phiên; chỉ bật micrô khi được Chủ tọa cho phép phát biểu.'], ['Giấy tờ tùy thân', 'Chuẩn bị sẵn Thẻ CCCD gắn chip hoặc tài khoản định danh điện tử VNeID để xuất trình khi được yêu cầu.'], ['Nghiêm cấm', 'Có mặt trước giờ mở phiên tòa 15 phút; tắt chuông điện thoại trong phòng xử án']].map(function (x) { return h('li', { key: x[0] }, h('b', null, x[0] + ': '), x[1]); })))) : null), null);
}
/* Phản hồi tham dự phiên (ModalPhanHoi) */
var LC_LYDO = ['Ốm đau điều trị tại viện', 'Công tác nước ngoài/đột xuất', 'Trở ngại khách quan, thiên tai', 'Lý do cá nhân khác'];
function LcReply(p) {
  var v = React.useState(p.vang ? 'vang' : 'co'), dc = React.useState('canhan');
  return SubS('Phản hồi tham dự phiên', h(F, null,
    h('section', { className: 'lc-hd' }, LcTag('PT'), h('b', { className: 'lc-hd-t' }, 'Phiên tòa sơ thẩm'), h('p', { className: 'pt-c-m' }, '14:00 · 06/11/2026 · DS-2026-0012 · ' + COURT1)),
    FCard('Bạn sẽ tham dự phiên?', h(ChonThe, { label: 'Phản hồi', v: v[0], onPick: v[1], items: [{ id: 'co', t: 'Xác nhận có mặt', d: 'Tôi sẽ tham dự phiên theo giấy triệu tập.' }, { id: 'vang', t: 'Báo vắng mặt', d: 'Tôi không thể tham dự, gửi lý do và tài liệu chứng minh.' }] }), true),
    v[0] === 'co' ? FCard('Điểm cầu tham dự', h(F, null, P('Chỉ áp dụng khi phiên có hình thức trực tuyến.', 'ph-muted lc-sm'),
      h(ChonThe, { label: 'Điểm cầu', v: dc[0], onPick: dc[1], items: [{ id: 'canhan', t: 'Điểm cầu cá nhân', d: 'Điểm cầu cá nhân tự bảo đảm thiết bị' }, { id: 'huyen', t: 'Điểm cầu TAND cấp huyện', d: '[Danh sách điểm cầu theo Tòa án]' }, { id: 'coquan', t: 'Điểm cầu trụ sở cơ quan', d: 'Áp dụng cho cơ quan, tổ chức là đương sự' }] })), true)
      : FCard('Lý do vắng mặt', h(F, null, h(SelSheet, { label: 'Lý do vắng mặt', req: true, ph: '— Chọn lý do —', v: p.err ? '' : LC_LYDO[0], opts: LC_LYDO }), p.err ? BvLoi('Vui lòng chọn lý do vắng mặt.') : null,
        Tf('Chi tiết lý do', { required: true, multiline: true, maxLength: 1000, showCount: true, placeholder: 'Trình bày hoàn cảnh, thời gian và lý do không thể tham dự…', error: p.err ? 'Vui lòng nêu rõ lý do vắng mặt (tối thiểu 50 ký tự).' : undefined }),
        h(TaiLieuCard, { title: 'Tài liệu chứng minh', desc: 'Tối đa 3 tệp PDF, JPG, PNG · tối đa 10MB/tệp. Bắt buộc ít nhất 1 tài liệu.', bat: [], bb0: {}, bs0: p.err ? [] : [{ k: 1, tep: 'giay-ra-vien.pdf', ten: 'Giấy ra viện', loai: 'Bản sao không có chứng thực' }] }),
        p.err ? BvLoi('Vui lòng đính kèm ít nhất 1 tài liệu chứng minh.') : null), true)),
    Bar(Btn(v[0] === 'co' ? 'Gửi xác nhận' : 'Gửi báo vắng mặt', 'primary', { 'data-pt-go': 'replace:hearingDetailDone', 'data-pt-snack': v[0] === 'co' ? 'Đã gửi xác nhận tham dự thành công tới Tòa án.' : 'Đã gửi báo vắng mặt thành công tới Tòa án.' })));
}
/* Phòng chờ trực tuyến (modal-phong-cho) */
function LcRoom(p) {
  var kt = React.useState(p.loi ? 'loi' : 'dat');
  var tt = kt[0] === 'dat' ? ['Đạt', 'success'] : kt[0] === 'dang' ? ['Đang kiểm tra…', 'neutral'] : ['Chưa đạt', 'danger'];
  return SubS('Phòng chờ trực tuyến', h(F, null,
    h('section', { className: 'lc-hd' }, h('div', { className: 'tly-h' }, LcTag('PH'), h(T.StatusBadge, { tone: 'success' }, 'Phòng chờ đã mở')), h('b', { className: 'lc-hd-t' }, 'Phiên họp kiểm tra việc giao nộp, tiếp cận, công khai chứng cứ'),
      h('p', { className: 'pt-c-m' }, 'Vụ án DS-2026-0018 · 08:30 · 05/11/2026'), P('Phòng chờ mở trước giờ khai mạc 30 phút', 'ph-muted lc-sm')),
    FCard('Thông tin phòng', RvKV([['Điểm cầu', 'Điểm cầu cá nhân'], ['Mã phòng', h('span', { className: 'tp-num' }, 'TA1-7Q4K-29')], ['Mật khẩu', h('span', { className: 'tp-num' }, '583 214')]]), true),
    FCard('Kiểm tra thiết bị', h(F, null, h('ul', { className: 'lc-kt' }, [['Camera', 'eye'], ['Micrô', 'message'], ['Đường truyền', 'swap']].map(function (x, i) {
      var t = i === 2 ? tt : ['Đạt', 'success'];
      return h('li', { key: x[0] }, h(T.Icon, { name: x[1] }), h('span', null, x[0]), h(T.StatusBadge, { tone: t[1] }, t[0]));
    })), kt[0] === 'loi' ? BvLoi('Đường truyền chưa đạt. Kiểm tra kết nối mạng rồi bấm Kiểm tra lại.') : null,
      Btn('Kiểm tra lại', 'secondary', { size: 'sm', onClick: function () { kt[1]('dat'); } })), true)),
    Bar(Btn('Vào phiên trực tuyến', 'primary', kt[0] === 'dat' ? { 'data-pt-go': 'snack:Đang kết nối phòng xét xử trực tuyến…' } : { disabled: true })));
}
/* =====================================================================
   v207 (04/11/2026): Hành động theo trạng thái – bảng map "Hanh_dong_theo_trang_thai" (122 dòng).
   Mỗi hành động: [nhãn theo bảng map, màn đích trong app]. Hiện TẤT CẢ hành động của tình trạng trên thẻ (xếp dọc);
   các "Xem Lịch" (ACTION_002/003/005/036/037/040) gộp thành một nút. Hành động chưa có đường dẫn: nối màn đã có
   nếu có, còn lại báo "Chức năng đang được phát triển" (047, 048, 050, 051, 052 theo yêu cầu; 029, 030, 031, 035, 053, 054 chưa có màn).
   ===================================================================== */
var HD_DEV = 'snack:Chức năng đang được phát triển';
var HD = {
  A001: ['Đề nghị xem xét theo thủ tục giám đốc thẩm', 'gx1'],
  A004: ['Kháng cáo bản án, quyết định sơ thẩm', 'kc1'],
  A006: ['Kháng cáo quyết định giải quyết việc dân sự', 'kc1'],
  A007: ['Kháng cáo quyết định tạm đình chỉ', 'kc1'],
  A008: ['Khiếu nại lên Chánh án Tòa án trên một cấp trực tiếp', 'kqd1L'],
  A009: ['Gửi văn bản nêu ý kiến về nội dung kháng cáo', 'ykc1'],
  A010: ['Cung cấp tài liệu, chứng cứ theo yêu cầu của Tòa án', 'cc1'],
  A011: ['Trả lời lựa chọn hòa giải - vụ việc dân sự', 'hgReply'],
  A012: ['Đề nghị thay đổi hòa giải viên', 'hgChange'],
  A013: ['Trả lời bằng lựa chọn hòa giải - vụ việc hành chính', 'hgReply'],
  A014: ['Kháng cáo quyết định đình chỉ', 'kc1'],
  A015: ['Khiếu nại việc trả lại đơn khởi kiện', 'kqd1Tong'],
  A016: ['Làm lại hoặc sửa đổi, bổ sung đơn kháng cáo', 'kcs1'],
  A017: ['Nộp tiền tạm ứng án phí', 'finance'],
  A018: ['Nộp tiền tạm ứng án phí phúc thẩm và nộp biên lai cho Tòa án', 'finance'],
  A019: ['Sửa đổi, bổ sung đơn đề nghị giám đốc thẩm / tái thẩm', 'gsgdt1'],
  A020: ['Trình bày lý do và xuất trình chứng cứ về việc kháng cáo quá hạn', 'kqh1'],
  A021: ['Sửa đổi, bổ sung đơn khởi kiện', 'sd1'],
  A022: ['Nộp tiền tạm ứng chi phí tố tụng', 'finance'],
  A023: ['Đề nghị thay đổi đối thoại viên', 'hgChange'],
  A025: ['Bổ sung tài liệu, chứng cứ', 'evidence1'],
  A026: ['Khiếu nại việc trả lại đơn yêu cầu', 'kqd1Tong'],
  A027: ['Đề nghị xem xét kết quả công nhận hòa giải', 'hgReview'],
  A028: ['Sửa đổi, bổ sung đơn yêu cầu', 'sd1'],
  A029: ['Nộp văn bản ghi ý kiến đối với yêu cầu của người yêu cầu', HD_DEV],
  A030: ['Nộp văn bản ghi ý kiến đối với yêu cầu khởi kiện', HD_DEV],
  A031: ['Nộp văn bản ghi ý kiến đối với yêu cầu của nguyên đơn (kèm yêu cầu phản tố / yêu cầu độc lập nếu có)', HD_DEV],
  A033: ['Kháng cáo quyết định đình chỉ giải quyết việc dân sự', 'kc1'],
  A034: ['Nộp lệ phí giải quyết việc dân sự', 'finance'],
  A035: ['Nêu ý kiến phản đối kết quả đối thoại (nếu có)', HD_DEV],
  A042: ['Nộp đơn phản tố', 'px1'],
  A043: ['Nộp đơn yêu cầu độc lập', 'yx1'],
  A045: ['Đề nghị thay đổi biện pháp khẩn cấp tạm thời', 'bpt1'],
  A046: ['Đề nghị hủy bỏ biện pháp khẩn cấp tạm thời', 'bph1'],
  A047: ['Nộp văn bản ghi ý kiến đối với yêu cầu phản tố', HD_DEV],
  A048: ['Nộp văn bản ghi ý kiến đối với yêu cầu độc lập', HD_DEV],
  A049: ['Sửa đổi, bổ sung đơn phản tố', 'pbs1'],
  A050: ['Khiếu nại việc trả lại đơn phản tố', HD_DEV],
  A051: ['Sửa đổi, bổ sung đơn yêu cầu độc lập', HD_DEV],
  A052: ['Khiếu nại việc trả lại đơn yêu cầu độc lập', HD_DEV],
  A053: ['Khiếu nại việc trả lại đơn thay đổi, bổ sung yêu cầu khởi kiện', HD_DEV],
  A054: ['Thay đổi ý kiến về sự thỏa thuận', HD_DEV],
  A055: ['Đề nghị xem xét theo thủ tục tái thẩm', 'tx1'],
  A128: ['Đề nghị hoãn phiên hòa giải', 'hgDelay'],
  A129: ['Khiếu nại quyết định về biện pháp khẩn cấp tạm thời', 'kqd1Tong'],
  A130: ['Khiếu nại quyết định đưa vụ án ra xét xử theo thủ tục rút gọn', 'kqd1Tong'],
  HOAN: ['Đề nghị hoãn phiên tòa', 'caseDetailHoan'],
  LICH: ['Xem Lịch', 'calEvent'], LICHP: ['Xem Lịch', 'hearingDetail'], LICHH: ['Xem Lịch', 'hearingDetailPost']
};
/* danh sách mã → [[nhãn, đích]]; gộp các nút trùng nhãn (Xem Lịch) */
function hdActs(codes) { var out = [], seen = {}; (codes || []).forEach(function (c) { var a = HD[c]; if (!a || seen[a[0]]) return; seen[a[0]] = 1; out.push(a); }); return out; }
/* nhóm nút hành động trên thẻ – một nút: nằm bên phải hàng chân thẻ; nhiều nút: xếp dọc, rộng hết thẻ. `khoa`: quá hạn → khóa nút nộp tiền */
function HdBtns(p) {
  var a = hdActs(p.codes);
  if (!a.length) return null;
  return h('div', { className: 'hd-acts' + (a.length > 1 ? ' hd-acts-n' : '') }, a.map(function (x) {
    var lock = p.khoa && x[1] === 'finance';
    return h(T.Button, { key: x[0], size: 'sm', variant: 'secondary', block: a.length > 1, disabled: lock, title: lock ? 'Đã quá hạn thực hiện' : undefined, 'data-pt-go': lock ? undefined : x[1] }, x[0]);
  }));
}
/* =====================================================================
   v207 (04/11/2026): màn mới cho hành động theo trạng thái – vẽ theo web:
   /nop-don-khang-cao · /quan-ly-don/{id}/khang-cao-sua-doi-bo-sung · /quan-ly-don/{id}/khang-cao-trinh-bay-qua-han ·
   /don-yeu-cau-khac?loai=YCNEUYEKIEN · /cung-cap-tai-lieu-chung-cu · /nop-don-thay-doi-huy-bo-bpkctt ·
   /chi-tiet-don-phan-to/{id}/bo-sung-ho-so · /vu-an/{id}?tab=don&noiBat=hoan-phien
   ===================================================================== */
var N7_CAMDOAN = 'Tôi cam đoan các thông tin và tài liệu đã cung cấp là đúng sự thật và chịu trách nhiệm trước pháp luật.';
function n7Tep(lead, hint, files) { return FCard('Tài liệu kèm theo', h(F, null, lead ? Lead(lead) : null, h(T.FileUpload, { hint: hint || 'PDF, JPG, PNG, DOCX · tối đa 10MB/tệp. Không bắt buộc đính kèm tài liệu.', uploadLabel: 'Tải lên tệp mới', libraryLabel: 'Chọn từ Kho dữ liệu cá nhân', files: files })), true); }
function n7Len(v, a, b) { var d = v.trim().length; return !d ? null : d < a ? 'Cần ít nhất ' + a + ' ký tự.' : d > b ? 'Tối đa ' + b + ' ký tự.' : null; }
function n7Tf(label, st, o) { o = o || {}; return Tf(label, Object.assign({ multiline: true, rows: o.rows || 4, value: st[0], onChange: function (e) { st[1](e.target.value); }, error: o.min ? n7Len(st[0], o.min, o.max || 5000) || undefined : undefined, showCount: !!o.max }, o)); }
function n7Pham(st, p0) {
  var phan = React.useState(p0 || '');
  return h(F, null, h(ChonThe, { label: 'Phạm vi kháng cáo', v: st[0], onPick: st[1], items: [{ id: 'all', t: 'Kháng cáo toàn bộ bản án', d: 'Bạn không đồng ý với toàn bộ nội dung bản án.' }, { id: 'part', t: 'Kháng cáo một phần bản án', d: 'Ghi rõ phần bản án bạn kháng cáo.' }] }),
    st[0] === 'part' ? n7Tf('Phần bản án bạn kháng cáo', phan, { required: true, rows: 3, max: 2000, help: 'Ghi theo phần quyết định của bản án, nếu có số tiền thì ghi rõ số tiền.' }) : null);
}

/* ---- 1. Nộp đơn kháng cáo (ACTION_004/006/007/014/033) ---- */
var KC_STEPS = ['Văn bản bị kháng cáo', 'Phạm vi kháng cáo', 'Lý do & yêu cầu', 'Tài liệu kèm theo', 'Xem lại & ký gửi'];
function KcWz(n, body) { return Wz({ title: 'Nộp đơn kháng cáo', steps: KC_STEPS, n: n, go: 'kc' + (n + 1), body: body }); }
function Kc1() {
  return KcWz(1, h(F, null, h(NvCall, { tone: 'warning', icon: 'clock', title: 'Thời hạn kháng cáo đến hết ngày 05/11/2026 — còn 1 ngày.' }, '15 ngày kể từ ngày tuyên án nếu bạn có mặt tại phiên tòa; nếu vắng mặt, tính từ ngày bạn nhận được bản án hoặc ngày bản án được niêm yết.'),
    FCard('Bản án bị kháng cáo', h(F, null, Lead('Thông tin lấy tự động từ hồ sơ vụ án, bạn chỉ cần xác nhận đúng văn bản.'),
      RvKV([['Loại văn bản', 'Bản án sơ thẩm'], ['Số văn bản', h('span', { className: 'tp-num' }, '25/2026/DS-ST')], ['Ngày tuyên án', '21/10/2026'], ['Ngày tống đạt', '22/10/2026'], ['Tòa án xét xử', COURT1], ['Vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0043')], ['Tư cách của bạn', 'Nguyên đơn'], ['Tòa án phúc thẩm dự kiến', 'Tòa án nhân dân thành phố Hà Nội']])), true),
    HopGhi('Kháng cáo không tạo vụ án mới', 'Đơn kháng cáo gắn vào vụ án DS-2026-0043, mã vụ án giữ nguyên qua các cấp xét xử.')));
}
function Kc2() { var ph = React.useState('part'); return KcWz(2, FCard('Phạm vi kháng cáo', h(F, null, Lead('Mặc định là kháng cáo toàn bộ bản án.'), n7Pham(ph, 'Phần quyết định buộc nguyên đơn chịu 12.000.000 đồng án phí.')), true)); }
function Kc3() {
  var ld = React.useState('Bản án chưa xem xét chứng cứ chuyển khoản ngày 05/01/2026 mà tôi đã giao nộp.'), yc = React.useState('Đề nghị Tòa án cấp phúc thẩm sửa bản án sơ thẩm, chấp nhận toàn bộ yêu cầu khởi kiện.');
  return KcWz(3, h(F, null, FCard('Lý do của việc kháng cáo', n7Tf('Lý do của việc kháng cáo', ld, { required: true, min: 30, max: 5000, placeholder: 'Trình bày lý do của việc kháng cáo...', help: 'Nêu cụ thể vì sao bạn cho rằng bản án chưa đúng.' }), true),
    FCard('Yêu cầu Tòa án giải quyết', n7Tf('Yêu cầu Tòa án giải quyết', yc, { required: true, max: 2000, help: 'Nêu rõ những yêu cầu bạn đề nghị Tòa án giải quyết.' }), true)));
}
function Kc4() { return KcWz(4, n7Tep('Tài liệu, chứng cứ bổ sung chứng minh cho kháng cáo (nếu có).')); }
function Kc5() {
  return h(KyGuiDon, { title: 'Nộp đơn kháng cáo', steps: KC_STEPS, ok: 'kcOk', tep: ['Đơn kháng cáo.pdf'], tepMeta: 'Bản in đơn kháng cáo', vaiTro: 'Nguyên đơn', lead: 'Kiểm tra lại thông tin, ký số rồi gửi đơn kháng cáo đến Tòa án.',
    top: FCard('Đơn kháng cáo', RvKV([['Văn bản bị kháng cáo', 'Bản án số 25/2026/DS-ST'], ['Vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0043')], ['Phạm vi', 'Kháng cáo một phần bản án'], ['Lý do', 'Bản án chưa xem xét chứng cứ chuyển khoản ngày 05/01/2026 mà tôi đã giao nộp.'], ['Tài liệu kèm theo', 'Không có']]), true),
    camDoan: N7_CAMDOAN });
}
function KcOk() {
  return h(OkScr, { title: 'Đã gửi đơn kháng cáo thành công', text: 'Đơn kháng cáo đã được gửi đến Tòa án. Kết quả xem xét sẽ được thông báo qua Hộp thư tống đạt.', info: [['Mã đơn', 'Chờ cấp mã'], ['Thời điểm gửi', '04/11/2026 09:30'], ['Trạng thái', 'Đã gửi đơn']],
    btns: h(F, null, Btn('Xem tại Quản lý đơn', 'primary', { 'data-pt-go': 'reset:records,appK_khangcao' }), Btn('Về Trang chủ', 'secondary', { 'data-pt-go': 'tab:home' })) });
}

/* ---- 2. Làm lại / sửa đổi, bổ sung đơn kháng cáo (ACTION_016) ---- */
var KCS_STEPS = ['Yêu cầu của Tòa án & đơn cũ', 'Sửa nội dung đơn kháng cáo', 'Tài liệu kèm theo', 'Xem lại & ký gửi'];
function KcsWz(n, body) { return Wz({ title: 'Sửa đơn theo yêu cầu', steps: KCS_STEPS, n: n, go: 'kcs' + (n + 1), body: body }); }
function Kcs1() {
  return KcsWz(1, h(F, null, h(NvCall, { tone: 'warning', icon: 'clock', title: 'Hạn sửa đổi, bổ sung: 08/11/2026 — còn 4 ngày.' }, 'Quá thời hạn nêu trên đơn kháng cáo sẽ bị trả lại theo quy định và bản án sơ thẩm sẽ có hiệu lực pháp luật.'),
    FCard('Yêu cầu của Tòa án', RvKV([['Văn bản', 'Thông báo yêu cầu sửa đổi, bổ sung đơn kháng cáo số 08/2026/TB-TA'], ['Ngày tống đạt', '29/10/2026'], ['Hạn sửa đổi, bổ sung', '08/11/2026'], ['Tòa án', COURT1]]), true),
    FCard('Nội dung Tòa án yêu cầu', h('ul', { className: 'n7-ul' }, h('li', null, h('b', null, 'Bổ sung tài liệu'), h('small', null, 'Nộp bổ sung các tài liệu, chứng cứ kèm theo chứng minh cho yêu cầu')), h('li', null, h('b', null, 'Sửa thông tin'), h('small', null, 'Hoàn thiện thông tin liên hệ và chữ ký người làm đơn theo quy định'))), true),
    FCard('Đơn kháng cáo cũ', RvKV([['Mã đơn', h('span', { className: 'tp-num' }, 'KC-2026-0014')], ['Mã tiếp nhận', h('span', { className: 'tp-num' }, 'TN-20261023-0014')], ['Loại đơn', 'Kháng cáo bản án sơ thẩm'], ['Ngày gửi', '23/10/2026'], ['Văn bản bị kháng cáo', 'Bản án số 21/2026/DS-ST ngày 12/10/2026']]), true)));
}
function Kcs2() {
  var ph = React.useState('part'), ld = React.useState('Tòa án sơ thẩm chưa xem xét biên bản đo đạc ngày 10/08/2026.'), dn = React.useState('Đề nghị Tòa án cấp phúc thẩm hủy phần quyết định về ranh giới đất.'), qh = React.useState('');
  return KcsWz(2, h(F, null, NoteBox(h(F, null, h('b', null, 'Tòa án yêu cầu: '), 'Bổ sung tài liệu chứng minh; hoàn thiện thông tin liên hệ.')),
    FCard('Phạm vi kháng cáo', h(F, null, Lead('Đã điền sẵn từ đơn cũ.'), n7Pham(ph, 'Phần quyết định về ranh giới thửa đất số 125.')), true),
    FCard('Lý do kháng cáo', n7Tf('Lý do kháng cáo', ld, { required: true, min: 10, max: 5000, help: 'Trình bày lý do đối với từng phần kháng cáo.' }), true),
    FCard('Đề nghị Tòa án giải quyết', n7Tf('Đề nghị Tòa án giải quyết', dn, { required: true, max: 2000 }), true),
    FCard('Lý do nộp sau thời hạn (nếu có)', n7Tf('Lý do nộp sau thời hạn (nếu có)', qh, { rows: 3, max: 2000 }), true)));
}
function Kcs3() { return KcsWz(3, n7Tep('Tài liệu kèm theo đơn kháng cáo sau khi sửa đổi, bổ sung.', 'PDF, JPG, PNG, DOCX · tối đa 10MB/tệp', [{ name: 'bien-ban-do-dac.pdf', size: '1,2 MB' }])); }
function Kcs4() {
  return h(KyGuiDon, { title: 'Sửa đơn theo yêu cầu', steps: KCS_STEPS, ok: 'kcsOk', tep: ['Đơn kháng cáo (sửa đổi, bổ sung).pdf', 'bien-ban-do-dac.pdf'], tepMeta: 'Bản in đơn sau khi sửa', vaiTro: 'Người kháng cáo',
    top: FCard('Nội dung sửa đổi, bổ sung', RvKV([['Gắn vào đơn', h('span', { className: 'tp-num' }, 'TN-20261023-0014')], ['Phạm vi kháng cáo', 'Một phần bản án'], ['Lý do kháng cáo', 'Tòa án sơ thẩm chưa xem xét biên bản đo đạc ngày 10/08/2026.'], ['Đề nghị Tòa án cấp phúc thẩm', 'Hủy phần quyết định về ranh giới đất.'], ['Tài liệu đính kèm', '1 tệp']]), true),
    camDoan: N7_CAMDOAN });
}
function KcsOk() {
  return h(OkScr, { title: 'Đã nộp đơn sửa đổi, bổ sung thành công', text: 'Đơn sửa đổi, bổ sung đã được gửi đến Tòa án và gắn vào đơn kháng cáo của bạn.', info: [['Mã hồ sơ sửa đổi', h('span', { className: 'tp-num' }, 'SDBS-2026-0021')], ['Gắn vào đơn', h('span', { className: 'tp-num' }, 'TN-20261023-0014')], ['Thời điểm gửi', '04/11/2026 09:30']],
    btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'reset:records,appK_khangcao,appealDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,appK_khangcao' })) });
}

/* ---- 3. Trình bày lý do kháng cáo quá hạn (ACTION_020) ---- */
var KQH_STEPS = ['Yêu cầu của Tòa án', 'Lý do nộp sau thời hạn', 'Chứng cứ trở ngại', 'Xem lại & ký gửi'];
function KqhWz(n, body) { return Wz({ title: 'Trình bày lý do kháng cáo quá hạn', steps: KQH_STEPS, n: n, go: 'kqh' + (n + 1), body: body }); }
function Kqh1() {
  return KqhWz(1, h(F, null, h(NvCall, { tone: 'warning', icon: 'clock', title: 'Hạn trình bày lý do — Còn 6 ngày.' }, 'Hạn 10/11/2026, tính từ ngày tống đạt văn bản yêu cầu, không tính từ ngày bạn mở đọc. Không trình bày, Tòa án cấp phúc thẩm vẫn xem xét và có thể không chấp nhận kháng cáo quá hạn (Điều 275).'),
    FCard('Tòa án yêu cầu', RvKV([['Văn bản', 'Thông báo về việc kháng cáo quá hạn số 14/2026/TB-TA'], ['Ngày tống đạt', '27/10/2026'], ['Hạn trình bày lý do', '10/11/2026']]), true),
    FCard('Nội dung Tòa án yêu cầu', h(F, null, Lead('Trích nguyên văn từ văn bản đã tống đạt.'), P('[Nội dung Tòa án yêu cầu trình bày lý do và xuất trình chứng cứ về việc kháng cáo quá hạn]', 'n7-quote')), true),
    FCard('Đơn kháng cáo gốc', h(F, null, RvKV([['Mã đơn', h('span', { className: 'tp-num' }, 'KC-2026-0013')], ['Mã tiếp nhận', h('span', { className: 'tp-num' }, 'TN-20261020-0013')], ['Ngày gửi', '20/10/2026'], ['Văn bản bị kháng cáo', 'Bản án số 15/2026/KDTM-ST']]), P('Hệ thống tạo đơn mới bằng bản sao đơn này. Đơn gốc giữ nguyên, chỉ đọc.', 'ph-muted dt-small')), true)));
}
function Kqh2() {
  var ld = React.useState('Từ ngày 02/10/2026 đến 18/10/2026 tôi điều trị nội trú tại Bệnh viện Bạch Mai nên không thể nộp đơn kháng cáo đúng hạn.');
  return KqhWz(2, FCard('Lý do nộp sau thời hạn', n7Tf('Lý do nộp sau thời hạn', ld, { required: true, min: 30, max: 5000, rows: 6, placeholder: 'Nhập lý do nộp sau thời hạn', help: 'Nêu trở ngại khách quan hoặc sự kiện bất khả kháng, thời gian bị trở ngại và vì sao không thể nộp đúng hạn.' }), true));
}
function Kqh3() { return KqhWz(3, FCard('Chứng cứ về trở ngại khách quan', h(T.FileUpload, { hint: 'Giấy ra viện, xác nhận của cơ quan có thẩm quyền… PDF, JPG, PNG, tối đa 10 MB mỗi tệp.', uploadLabel: 'Tải lên tệp mới', libraryLabel: 'Chọn từ Kho dữ liệu cá nhân', files: [{ name: 'giay-ra-vien.pdf', size: '820 KB' }] }), true)); }
function Kqh4() {
  return h(KyGuiDon, { title: 'Trình bày lý do kháng cáo quá hạn', steps: KQH_STEPS, ok: 'kqhOk', tep: ['Bản trình bày lý do kháng cáo quá hạn.pdf', 'giay-ra-vien.pdf'], tepMeta: 'Bản in trình bày lý do', vaiTro: 'Người kháng cáo',
    top: FCard('Xem lại lý do nộp sau thời hạn', RvKV([['Đơn kháng cáo', h('span', { className: 'tp-num' }, 'TN-20261020-0013')], ['Lý do nộp sau thời hạn', 'Từ ngày 02/10/2026 đến 18/10/2026 tôi điều trị nội trú tại Bệnh viện Bạch Mai nên không thể nộp đơn kháng cáo đúng hạn.'], ['Chứng cứ trở ngại', 'Tệp 1 · giay-ra-vien.pdf']]), true),
    camDoan: 'Tôi cam đoan nội dung trình bày và tài liệu chứng minh là đúng sự thật.' });
}
function KqhOk() {
  return h(OkScr, { title: 'Đã gửi bản trình bày lý do', text: 'Đã gửi bản trình bày lý do đến Tòa án. Kết quả xem xét sẽ được thông báo qua Hộp thư tống đạt.', info: [['Gắn vào đơn', h('span', { className: 'tp-num' }, 'TN-20261020-0013')], ['Thời điểm gửi', '04/11/2026 09:30']],
    btns: h(F, null, Btn('Xem chi tiết đơn', 'primary', { 'data-pt-go': 'reset:records,appK_khangcao,appealDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,appK_khangcao' })) });
}

/* ---- 4. Nộp ý kiến đối với kháng cáo của đương sự khác – đơn yêu cầu khác YCNEUYEKIEN (ACTION_009) ---- */
var YKC_STEPS = ['Vụ án & kháng cáo', 'Nội dung ý kiến', 'Tài liệu kèm theo', 'Xem lại & ký gửi'];
function YkcWz(n, body) { return Wz({ title: 'Nộp ý kiến đối với kháng cáo', steps: YKC_STEPS, n: n, go: 'ykc' + (n + 1), body: body }); }
function Ykc1() {
  return YkcWz(1, h(F, null, h(NvCall, { tone: 'info', icon: 'clock', title: 'Hạn nộp ý kiến đối với kháng cáo.' }, 'Nên nộp trước khi Tòa án cấp phúc thẩm ra quyết định đưa vụ án ra xét xử. Không nộp ý kiến thì bạn vẫn được trình bày tại phiên tòa, nhưng Hội đồng phúc thẩm không có ý kiến của bạn trong hồ sơ khi nghiên cứu.'),
    FCard('Vụ án', RvKV([['Mã vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0018')], ['Tên vụ án', 'Tranh chấp hợp đồng vay tài sản'], ['Tòa án', COURT1], ['Tư cách của bạn', 'Bị đơn']]), true),
    FCard('Kháng cáo của đương sự khác', h(F, null, Lead('Nội dung lấy từ đơn kháng cáo đã được Tòa án tiếp nhận và tống đạt cho bạn.'),
      RvKV([['Người kháng cáo', 'Trần Văn Bình — Nguyên đơn'], ['Văn bản bị kháng cáo', 'Bản án số 12/2026/DS-ST'], ['Phạm vi kháng cáo', 'Một phần bản án'], ['Nội dung kháng cáo', '[Nội dung kháng cáo của đương sự khác]'], ['Ngày tống đạt', '28/10/2026']])), true)));
}
function Ykc2() {
  var yk = React.useState('Tôi không đồng ý với kháng cáo của nguyên đơn về khoản lãi chậm trả vì hợp đồng vay không có thỏa thuận về lãi suất; bản án sơ thẩm đã áp dụng đúng Điều 357 và Điều 468 Bộ luật Dân sự năm 2015.'), kl = React.useState(''), nd = React.useState('Đề nghị Tòa án cấp phúc thẩm giữ nguyên bản án sơ thẩm về phần lãi chậm trả, không chấp nhận kháng cáo của nguyên đơn.');
  return YkcWz(2, h(F, null, FCard('Ý kiến của bạn đối với kháng cáo', n7Tf('Ý kiến của bạn đối với kháng cáo', yk, { required: true, min: 100, max: 5000, rows: 6, placeholder: 'Nhập ý kiến của bạn đối với kháng cáo' }), true),
    FCard('Kháng cáo lại (nếu có)', n7Tf('Bạn có kháng cáo lại phần nào của bản án không?', kl, { rows: 3, max: 2000, placeholder: 'Nhập phần bản án bạn kháng cáo lại' }), true),
    FCard('Trình bày nội dung yêu cầu', n7Tf('Trình bày nội dung yêu cầu', nd, { required: true, min: 100, max: 2000, placeholder: 'Nhập nội dung yêu cầu' }), true)));
}
function Ykc3() { return YkcWz(3, n7Tep('Tài liệu chứng minh cho ý kiến của bạn, ví dụ hợp đồng, biên bản, hóa đơn.')); }
function Ykc4() {
  return h(KyGuiDon, { title: 'Nộp ý kiến đối với kháng cáo', steps: YKC_STEPS, ok: 'ykcOk', tep: ['Văn bản nêu ý kiến về kháng cáo.pdf'], tepMeta: 'Bản in văn bản nêu ý kiến', vaiTro: 'Bị đơn', sendLabel: 'Gửi ý kiến',
    top: FCard('Ý kiến đối với kháng cáo', RvKV([['Vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0018')], ['Kháng cáo của', 'Trần Văn Bình — Nguyên đơn'], ['Ý kiến', 'Không đồng ý với kháng cáo về khoản lãi chậm trả…'], ['Kháng cáo lại', 'Không'], ['Tài liệu kèm theo', 'Không có']]), true),
    camDoan: N7_CAMDOAN });
}
function YkcOk() {
  return h(OkScr, { title: 'Đã gửi ý kiến thành công', text: 'Ý kiến của bạn đối với kháng cáo đã được gửi đến Tòa án và đưa vào hồ sơ vụ án.', info: [['Mã đơn', h('span', { className: 'tp-num' }, 'YCK-2026-0009')], ['Thời điểm gửi', '04/11/2026 09:30']],
    btns: h(F, null, Btn('Về Quản lý đơn', 'primary', { 'data-pt-go': 'reset:records,appK_khangcao' }), Btn('Về Trang chủ', 'secondary', { 'data-pt-go': 'tab:home' })) });
}

/* ---- 5. Cung cấp tài liệu, chứng cứ theo yêu cầu của Tòa án – Mẫu 12-DS (ACTION_010) ---- */
var CC_STEPS = ['Yêu cầu của Tòa', 'Tài liệu', 'Xem lại & ký số'];
function CcWz(n, body) { return Wz({ title: 'Cung cấp tài liệu, chứng cứ', steps: CC_STEPS, n: n, go: 'cc' + (n + 1), body: body }); }
function Cc1() {
  return CcWz(1, h(F, null, h(NvCall, { tone: 'warning', icon: 'clock', title: 'Hạn 15/11/2026 · còn 11 ngày.' }, ''),
    FCard('Yêu cầu của Tòa án', h(F, null, Lead('Quyết định yêu cầu cung cấp tài liệu, chứng cứ — Mẫu số 12-DS.'),
      RvKV([['Số quyết định', h('span', { className: 'tp-num' }, '05/2026/QĐ-CCTLCC')], ['Tòa án ra quyết định', COURT1], ['Thẩm phán', 'Trần Văn Anh'], ['Vụ án', h('span', { className: 'tp-num' }, 'Mã DS-2026-0031')], ['Ngày nhận', '31/10/2026'], ['Hạn cung cấp', '15/11/2026']])), true),
    FCard('Tài liệu, chứng cứ Tòa án yêu cầu', h('ul', { className: 'n7-ul' }, h('li', null, h('b', null, 'Bản gốc hợp đồng đặt cọc ngày 05/01/2026')), h('li', null, h('b', null, 'Sao kê tài khoản từ 01/01/2026 đến 31/03/2026'))), true),
    FCard('Nội dung quyết định', DtDocs([['Quyết định 05/2026/QĐ-CCTLCC', 'Quyết định 05/2026/QĐ-CCTLCC.pdf · PDF']], { the: true }), true) /* v351 */,
    HopGhi('Trong thời hạn 15 ngày', 'Trong thời hạn 15 ngày kể từ ngày nhận quyết định, cung cấp tài liệu, chứng cứ nêu trên cho Tòa án. Không cung cấp được thì phải thông báo bằng văn bản và nêu rõ lý do.')));
}
function Cc2() {
  var ko = React.useState(true), ten = React.useState('Sao kê tài khoản từ 01/01/2026 đến 31/03/2026'), ld = React.useState('Ngân hàng chưa cấp sao kê do tài khoản đã đóng; tôi đã gửi văn bản đề nghị ngày 01/11/2026 và đang chờ trả lời.');
  return CcWz(2, h(F, null, FCard('Tài liệu, chứng cứ cung cấp', h(T.FileUpload, { hint: 'PDF, JPG, PNG, DOCX · tối đa 10MB/tệp', uploadLabel: 'Tải lên tệp mới', libraryLabel: 'Chọn từ Kho dữ liệu cá nhân', files: [{ name: 'hop-dong-dat-coc-ban-goc.pdf', size: '1,6 MB' }] }), true),
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { label: 'Có tài liệu, chứng cứ không cung cấp được.', checked: ko[0], onChange: function (e) { ko[1](e.target.checked); } })),
    ko[0] ? FCard('Tài liệu không cung cấp được', h(F, null, Tf('Tài liệu không cung cấp được', { required: true, value: ten[0], onChange: function (e) { ten[1](e.target.value); }, placeholder: 'Nhập tên tài liệu, chứng cứ không cung cấp được' }),
      n7Tf('Lý do và giải trình chi tiết', ld, { required: true, min: 30, max: 2000, placeholder: 'Nêu rõ lý do không cung cấp được và giải trình chi tiết' })), true) : null));
}
function Cc3() {
  return h(KyGuiDon, { title: 'Cung cấp tài liệu, chứng cứ', steps: CC_STEPS, ok: 'ccOk', tep: ['Văn bản phản hồi.pdf', 'hop-dong-dat-coc-ban-goc.pdf'], tepMeta: 'Hệ thống tự lập, cần ký số trước khi gửi Tòa án.', vaiTro: 'Người cung cấp', sendLabel: 'Ký số và gửi Tòa án', kyNote: 'Cần ký số một lần cho văn bản và 1 tài liệu đính kèm trước khi gửi.',
    top: FCard('Phiếu cung cấp', RvKV([['Quyết định, vụ án', '05/2026/QĐ-CCTLCC · DS-2026-0031'], ['Tòa án nhận', COURT1 + ' · Thẩm phán Trần Văn Anh'], ['Người cung cấp', 'Hoàng Dương · Ký số · nộp trực tuyến'], ['Tài liệu cung cấp · 1', 'hop-dong-dat-coc-ban-goc.pdf'], ['Không cung cấp được', 'Sao kê tài khoản từ 01/01/2026 đến 31/03/2026']]), true),
    camDoan: N7_CAMDOAN });
}
function CcOk() {
  return h(OkScr, { title: 'Đã gửi văn bản phản hồi - cung cấp tài liệu chứng cứ', text: 'Có thông báo không cung cấp được 1 tài liệu. Tòa án sẽ xem xét và thông báo qua Hộp thư tống đạt.', info: [['Biên nhận', h('span', { className: 'tp-num' }, 'BN-2026-0117')], ['Thời điểm gửi', '04/11/2026 09:30']],
    btns: h(F, null, Btn('Về chi tiết vụ án', 'primary', { 'data-pt-go': 'reset:records,cases,caseDetail' }), Btn('Về Hộp thư tống đạt', 'secondary', { 'data-pt-go': 'tab:inbox' })) });
}

/* ---- 6. Đề nghị thay đổi / hủy bỏ biện pháp khẩn cấp tạm thời (ACTION_045 / 046) ---- */
var BX = { t: { id: 'bpt', ten: 'Đề nghị thay đổi, áp dụng bổ sung biện pháp khẩn cấp tạm thời', ngan: 'Thay đổi BPKCTT', steps: ['Biện pháp đang áp dụng', 'Nội dung thay đổi', 'Tài liệu kèm theo', 'Xem lại & ký gửi'] },
  h: { id: 'bph', ten: 'Đề nghị hủy bỏ biện pháp khẩn cấp tạm thời', ngan: 'Hủy bỏ BPKCTT', steps: ['Biện pháp đang áp dụng', 'Căn cứ hủy bỏ', 'Tài liệu kèm theo', 'Xem lại & ký gửi'] } };
var BX_HUONG = ['Đổi sang biện pháp khác phù hợp hơn', 'Thu hẹp phạm vi áp dụng', 'Mở rộng phạm vi áp dụng', 'Điều chỉnh đối tượng bị áp dụng', 'Áp dụng bổ sung biện pháp khẩn cấp tạm thời khác'];
var BX_CANCU = ['Điểm a: Người yêu cầu áp dụng biện pháp khẩn cấp tạm thời đề nghị hủy bỏ', 'Điểm b: Người phải thi hành quyết định đã nộp tài sản, hoặc có người khác thực hiện biện pháp bảo đảm thi hành nghĩa vụ đối với bên có yêu cầu', 'Điểm c: Nghĩa vụ dân sự của bên có nghĩa vụ đã chấm dứt theo quy định của Bộ luật Dân sự', 'Điểm d: Việc giải quyết vụ án đã được đình chỉ', 'Điểm đ: Quyết định áp dụng biện pháp khẩn cấp tạm thời không đúng quy định của Bộ luật Tố tụng dân sự', 'Điểm e: Căn cứ của việc áp dụng biện pháp khẩn cấp tạm thời không còn', 'Điểm g: Vụ việc đã được giải quyết bằng bản án, quyết định của Tòa án đã có hiệu lực pháp luật', 'Điểm h: Tòa án đã trả lại đơn khởi kiện'];
var BX_QD = [{ id: 'q1', t: 'Quyết định áp dụng BPKCTT số 03/2026/QĐ-BPKCTT', d: 'Phong tỏa tài khoản 650.000.000 đ · Ban hành 12/10/2026 · Tống đạt 14/10/2026' }, { id: 'q2', t: 'Quyết định áp dụng BPKCTT số 05/2026/QĐ-BPKCTT', d: 'Cấm chuyển dịch quyền về tài sản · Ban hành 20/10/2026 · Tống đạt 22/10/2026' }];
function BxWz(k, n, body) { var c = BX[k]; return Wz({ title: c.ngan, steps: c.steps, n: n, go: c.id + (n + 1), body: body }); }
function Bx1(p) {
  var q = React.useState('q1');
  return BxWz(p.k, 1, h(F, null, Lead(p.k === 'h' ? 'Đề nghị Tòa án hủy bỏ một biện pháp khẩn cấp tạm thời đang được áp dụng trong vụ án.' : 'Đề nghị Tòa án thay đổi hoặc áp dụng bổ sung biện pháp khẩn cấp tạm thời khi biện pháp đang áp dụng không còn phù hợp.'),
    FCard('Vụ án', RvKV([['Vụ án', h('span', { className: 'tp-num' }, 'HC-2026-0023')], ['Đơn khởi kiện', h('span', { className: 'tp-num' }, 'TN-20261014-0008')], ['Cấp xét xử hiện tại', 'Sơ thẩm']]), true),
    FCard('Quyết định cần điều chỉnh', h(F, null, Lead('Chọn quyết định áp dụng biện pháp khẩn cấp tạm thời bạn muốn thay đổi hoặc hủy bỏ. Bấm "Xem" để đọc nội dung văn bản quyết định và tệp đính kèm trước khi chọn.'),
      h(OptCards, { label: 'Quyết định cần điều chỉnh', cur: q[0], onPick: q[1], items: BX_QD })), true)));
}
function Bx2(p) {
  var hu = React.useState(p.k === 'h' ? 'cc5' : 'hg1'), pv = React.useState('Giảm số tiền phong tỏa từ 650.000.000 đ xuống 420.000.000 đ trên cùng tài khoản'), ld = React.useState('Số tiền tranh chấp đã giảm sau khi tôi rút một phần yêu cầu ngày 25/10/2026.'), cc = React.useState('Căn cứ phong tỏa không còn vì bị đơn đã thanh toán toàn bộ số tiền tranh chấp ngày 28/10/2026.');
  if (p.k === 'h') return BxWz('h', 2, h(F, null, FCard('Căn cứ đề nghị hủy bỏ', h(F, null, Lead('Chọn căn cứ đề nghị hủy bỏ biện pháp khẩn cấp tạm thời.'), h(ChonThe, { label: 'Căn cứ đề nghị hủy bỏ', v: hu[0], onPick: hu[1], items: BX_CANCU.map(function (x, i) { return { id: 'cc' + i, t: x }; }) })), true),
    FCard('Trình bày căn cứ hủy bỏ', n7Tf('Trình bày căn cứ hủy bỏ', cc, { required: true, min: 20, max: 2000, placeholder: 'Ngày… bị đơn đã thanh toán toàn bộ số tiền tranh chấp nên căn cứ phong tỏa không còn…' }), true),
    HopGhi('Sau khi gửi', 'Biện pháp bảo đảm được xem xét trả lại · Người bị áp dụng được khôi phục quyền.')));
  return BxWz('t', 2, h(F, null, FCard('Bạn muốn thay đổi theo hướng nào?', h(ChonThe, { label: 'Hướng thay đổi', v: hu[0], onPick: hu[1], items: BX_HUONG.map(function (x, i) { return { id: 'hg' + i, t: x }; }) }), true),
    FCard('Phạm vi, đối tượng sau khi thay đổi', n7Tf('Phạm vi, đối tượng sau khi thay đổi', pv, { required: true, max: 2000, help: 'Ghi rõ tài sản, tài khoản, số tiền hoặc hành vi bị hạn chế sau điều chỉnh, để Tòa án ra quyết định đúng phạm vi.' }), true),
    FCard('Trình bày lý do thay đổi', n7Tf('Trình bày lý do thay đổi', ld, { required: true, min: 20, max: 2000, placeholder: 'Số tiền tranh chấp đã giảm sau khi tôi rút một phần yêu cầu ngày…' }), true),
    HopGhi('Sau khi gửi', 'Biện pháp cũ vẫn có hiệu lực đến khi có quyết định mới · Có thể phải bổ sung biện pháp bảo đảm.')));
}
function Bx3(p) { return BxWz(p.k, 3, n7Tep('Tài liệu chứng minh cho đề nghị của bạn.')); }
function Bx4(p) {
  var c = BX[p.k], hb = p.k === 'h';
  return h(KyGuiDon, { title: c.ngan, steps: c.steps, ok: c.id + 'Ok', tep: [(hb ? 'Đơn đề nghị hủy bỏ BPKCTT' : 'Đơn đề nghị thay đổi BPKCTT') + '.pdf'], tepMeta: 'Bản in đơn đề nghị', vaiTro: 'Nguyên đơn',
    top: FCard(hb ? 'Xem lại đơn đề nghị hủy bỏ' : 'Xem lại đơn đề nghị thay đổi', RvKV([['Loại đề nghị', c.ten], ['Quyết định điều chỉnh', 'Số 03/2026/QĐ-BPKCTT · Ban hành 12/10/2026'], hb ? ['Căn cứ hủy bỏ', BX_CANCU[5]] : ['Hướng thay đổi', BX_HUONG[1]], hb ? ['Trình bày', 'Căn cứ phong tỏa không còn vì bị đơn đã thanh toán toàn bộ số tiền tranh chấp ngày 28/10/2026.'] : ['Phạm vi sau thay đổi', 'Giảm số tiền phong tỏa từ 650.000.000 đ xuống 420.000.000 đ trên cùng tài khoản'], ['Vụ án', h('span', { className: 'tp-num' }, 'HC-2026-0023')], ['Tài liệu kèm theo', 'Không có']]), true),
    bottom: HopGhi('Trách nhiệm khi đề nghị không đúng', hb ? 'Nếu việc hủy bỏ dẫn đến bên kia tẩu tán tài sản và gây thiệt hại cho chính bạn, bạn tự chịu hậu quả. Ngược lại, nếu biện pháp đã áp dụng là không đúng, người yêu cầu áp dụng phải bồi thường cho người bị áp dụng.' : 'Việc thay đổi biện pháp khẩn cấp tạm thời không đúng và gây thiệt hại thì bạn phải bồi thường theo biện pháp bảo đảm đã cam kết. Tòa án xem xét và ra quyết định trong thời hạn luật định.'),
    camDoan: N7_CAMDOAN });
}
function BxOk(p) {
  var hb = p.k === 'h';
  return h(OkScr, { title: hb ? 'Đã gửi đơn đề nghị hủy bỏ biện pháp khẩn cấp tạm thời' : 'Đã gửi đơn đề nghị thay đổi biện pháp khẩn cấp tạm thời', text: hb ? 'Đơn đã được gửi đến Tòa án. Văn bản trả lời của Tòa án sẽ đến Hộp thư tống đạt.' : 'Đơn đã được gửi đến Tòa án. Biện pháp hiện tại vẫn có hiệu lực cho đến khi có quyết định mới. Văn bản trả lời của Tòa án sẽ đến Hộp thư tống đạt.',
    info: [['Vụ án liên quan', h('span', { className: 'tp-num' }, 'HC-2026-0023')], ['Thời điểm gửi', '04/11/2026 09:30']],
    btns: h(F, null, Btn('Xem vụ án', 'primary', { 'data-pt-go': 'reset:records,cases,caseDetail' }), Btn('Về Vụ án của tôi', 'secondary', { 'data-pt-go': 'reset:records,cases' })) });
}

/* ---- 7. Bổ sung hồ sơ đơn phản tố / yêu cầu độc lập – v351: PbsS1…PbsS4, PbsOk ở cuối tệp ---- */
var PBS_STEPS = ['Yêu cầu của Tòa án', 'Bổ sung tài liệu', 'Sửa đổi nội dung đơn', 'Xem lại & ký gửi'];
/* ---- 8. Đề nghị hoãn phiên tòa (HOAN_PHIEN_TOA): chi tiết vụ án – tab Đơn trong vụ án, làm nổi nhóm "Đơn yêu cầu khác" ---- */
function CaseDetailHoan() { return h(VuAnChiTiet, { tab0: 'don', noiBat: 'hoan-phien' }); }

/* v209 (04/11/2026): dải "n đơn cần bạn xử lý" theo kiểu khối Cam kết giao dịch điện tử – chọn B: nền vàng nhạt, viền vàng, hình chuông (Illustration nhacViec) nhỏ bên trái, một đoạn chữ + liên kết "Xem ngay →", nút đóng góc trên phải */
function QdBand(p) {
  return h('section', { className: 'ckb qbx-b', role: 'status' }, h('span', { className: 'qbx-ic', 'aria-hidden': 'true' }, h(T.Illustration, { name: 'nhacViec' })),
    h('div', { className: 'ckb-tx' }, h('p', { className: 'qbx-p' }, h('b', null, p.n + ' đơn cần bạn xử lý'), p.moTa ? ' — ' + p.moTa + '.' : '', ' ', h('button', { type: 'button', className: 'qd-band-link', onClick: p.onXem }, (p.cx ? 'Xem tất cả' : 'Xem ngay') + ' →'))),
    h('button', { type: 'button', className: 'ckb-x', 'aria-label': 'Đóng cảnh báo', onClick: p.onClose }, h(T.Icon, { name: 'x' })));
}

/* v332 (12/11/2026, chọn L3): mở đơn nháp từ Danh sách đơn và tiến trình – ở lại danh sách, hộp giữa màn "Đang tải đơn để chỉnh sửa…" (vòng quay), tải xong tự vào Bước 1 đơn soạn dở;
   lỗi: hộp cùng kiểu hộp đơn soạn dở – hình minh họa đơn + huy hiệu cảnh báo, "Không tải được đơn để chỉnh sửa.", "Thử lại" (đỏ) / "Về Quản lý đơn" (xám); câu theo web */
var DL_TAI = 'Đang tải đơn để chỉnh sửa…', DL_LOI = 'Không tải được đơn để chỉnh sửa.';
function DlTuDi(p) { var r = React.useRef(null); React.useEffect(function () { var t = setTimeout(function () { r.current && r.current.click(); }, 1200); return function () { clearTimeout(t); }; }, []); return h('button', { ref: r, type: 'button', hidden: true, 'data-pt-go': p.go }); }
function DlPortal(p) { var hs = React.useState(null); React.useEffect(function () { hs[1](document.querySelector('.pt-phone .ph')); }, []); return hs[0] ? ReactDOM.createPortal(p.children, hs[0]) : null; }
function DraftLoad() {
  return h(F, null, h(Applications), h(DlPortal, null, h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-draft' }, h('div', { className: 'ph-scrim' }),
    h('div', { className: 'ph-draft-box dl3', role: 'status' }, h('span', { className: 'tp-spinner dl-spin', 'aria-hidden': 'true' }), h('p', { className: 'ph-draft-d' }, DL_TAI)), h(DlTuDi, { go: 'replace:sub1d' }))));
}
function DraftLoadErr() {
  return h(F, null, h(Applications), h(DlPortal, null, h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-draft' }, h('div', { className: 'ph-scrim' }),
    h('div', { className: 'ph-draft-box', role: 'alertdialog', 'aria-modal': 'true' }, IlloBadge(['nopDon', 'alert']), h('p', { className: 'ph-draft-t' }, DL_LOI),
      h('div', { className: 'ph-draft-btns' }, h(T.Button, { block: true, icon: 'swap', 'data-pt-go': 'replace:draftLoad' }, 'Thử lại'), h(T.Button, { block: true, variant: 'tonal', 'data-pt-go': 'back' }, 'Về Quản lý đơn'))))));
}

/* v333: Chữ ký số – tài khoản tổ chức: chứng thư mặc định theo tư cách "Cá nhân đại diện" (mỗi người đại diện: Họ tên · Chức vụ) và "Tổ chức" (web qhe/She/Jhe/l7) */
function SkTcMacDinh(p) {
  return h(F, null, h('p', { className: 'nv-sub' }, 'Cá nhân đại diện'),
    tcDaiDien().map(function (n) { var cv = tcChucVu(n); return h(SkMacDinh, { key: n.ten, none: p.none, dd: true, title: cv ? n.ten + ' · ' + cv : n.ten, ct: SK_CT_DD }); }),
    h('p', { className: 'nv-sub' }, 'Tổ chức'), h(SkMacDinh, { none: p.none, title: null, ct: SK_CT_TO }));
}

/* v334 (12/11/2026): luồng Tổ chức
   – câu khối Ký số theo web (soạn đơn KNTC): "…bằng chữ ký số cá nhân của bạn." (P1)
   – Chữ ký số: chứng thư theo tư cách ký (web U5/Dhe) – đại diện NGUYỄN VĂN BÌNH, tổ chức CÔNG TY ABC; danh sách chia nhóm "Cá nhân đại diện · Họ tên" / "Tổ chức" (P1; dữ liệu mẫu)
   – dòng người ký ở các màn ký số dùng chung (KyGui, KyGuiDon, Giao nộp): khối "Công ty ABC – cần 2 chữ ký" như web (rO → jD/sie), giống bước 7 nộp đơn */
var SK_CT_DD = [{ id: 11, ca: 'VNPT-CA', chu: 'NGUYỄN VĂN BÌNH', cap: 'VNPT Certification Authority', serial: '5402…B1D4', hl: '01/02/2026 – 01/02/2027', dung: '28/10/2026', kiem: '01/02/2026', tt: ['Còn hạn', 'success'] }];
var SK_CT_TO = [{ id: 12, ca: 'Viettel-CA', chu: 'CÔNG TY ABC', cap: 'Viettel Certificate Authority', serial: '7B20…11CF', hl: '10/01/2026 – 10/01/2027', dung: '28/10/2026', kiem: '10/01/2026', tt: ['Còn hạn', 'success'] }];
function kyMoTa(m) { return Lead(laTC() ? m.replace('của Hoàng Dương', 'của bạn') : m); }
function skDs() {
  if (!laTC()) return h('ul', { className: 'sk-cts' }, SK_CT.map(SkThe));
  var dd = tcDaiDien()[0];
  return h(F, null, h('p', { className: 'nv-sub' }, 'Cá nhân đại diện' + (dd ? ' · ' + dd.ten : '')), h('ul', { className: 'sk-cts' }, SK_CT_DD.map(SkThe)),
    h('p', { className: 'nv-sub' }, 'Tổ chức'), h('ul', { className: 'sk-cts' }, SK_CT_TO.map(SkThe)));
}
/* khối ký của tổ chức trong danh sách ký: tự giữ trạng thái 2 chữ ký, ký đủ → báo màn cha (onXong) */
function KyTcRows(p) {
  var dd = React.useState(false), tc = React.useState(false), sh = React.useState(null), anchor = React.useRef(null), host = useHost(anchor);
  function xong() { var w = sh[0]; sh[1](null); if (w === 'dd') dd[1](true); else { tc[1](true); p.onXong(); } }
  return h('li', { className: 'kytc-li' }, h('span', { ref: anchor, hidden: true }),
    h(KyToChuc, { dd: dd[0], tc: tc[0], onDD: function () { sh[1]('dd'); }, onTC: function () { sh[1]('tc'); } }),
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: p.tep, onClose: function () { sh[1](null); }, onKy: xong }), host) : null);
}
/* v336 (12/11/2026): Theo dõi yêu cầu trích lục, bản sao + Khiếu nại — Tố cáo theo khung Danh sách đơn và tiến trình:
   nút tạo mới ở góc phải header (bỏ nút đỏ rộng + dòng mô tả), thẻ QdCard: hàng nhãn trạng thái + tình trạng · tên đậm · dòng nhãn–giá trị · "Việc cần làm" */
function DsShell(title, body, nut, go) {
  return h(Phone, { cls: 'ph-hd qh-ph' }, h('header', { className: 'qh' }, h('button', { type: 'button', className: 'tp-icon-btn qh-back', 'aria-label': 'Quay lại', 'data-pt-go': 'back' }, h(T.Icon, { name: 'chevronLeft' })),
    h('div', { className: 'qh-sel qh-tt' }, h('span', null, h('b', null, title))), nut ? h(T.Button, { size: 'sm', className: 'qh-nop', 'data-pt-go': go }, nut) : null), h(Body, { cls: 'ph-plain' }, body));
}
function dsRows(rows) { return h('dl', { className: 'qc-ben' }, rows.filter(Boolean).map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0] + ':'), h('dd', null, r[1])); })); }
function dsTop(st, tinh, tone) {
  return h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: st[1], icon: false }, st[0]),
    tinh ? h('span', { className: 'qd-tinh qc-tinh qd-tinh-' + (tone || 'warning'), title: tinh }, h('span', { className: 'qc-tinh-tx' }, tinh)) : null);
}
function dsViec(ds) {
  if (!ds.length) return null;
  return h('div', { className: 'qd-c-f qc-vk vkx-box' }, h('p', { className: 'qc-vk-h vkx-h' }, 'Việc cần làm'), h('ul', { className: 'qc-vk-l' }, ds.map(function (v) {
    return h('li', { key: v.t, className: 'vk-card vka vkx vkx-' + (v.m || 'none') }, h('button', { type: 'button', className: 'vka-b', 'data-pt-go': v.go, 'aria-label': v.t },
      h('span', { className: 'vka-tx' }, h('b', null, v.t), h('small', null, v.han ? h(F, null, 'Hạn xử lý · ', h('span', { className: 'vka-han vka-han-' + (v.m || 'an') }, v.han)) : 'Không có thời hạn'))));
  })));
}
var TLY_NHOM = { 'ST-01': ['Chưa gửi (nháp)', 'neutral'], 'ST-02a': ['Chờ tiếp nhận', 'info'], 'ST-02b': ['Đã tiếp nhận', 'info'], 'ST-03': ['Đang giải quyết', 'warning'], 'ST-04': ['Đã giải quyết', 'success'] };
function TlyCard(p) {
  var x = p.x, st = TLY_NHOM[x.tt], tinh = x.nhan[0] !== st[0] ? x.nhan : null;
  var viec = [].concat(x.bs ? [{ t: 'Bổ sung hồ sơ', han: 'đến ' + x.bs, go: 'copySupp', m: 'sap' }] : [], x.nv ? [{ t: 'Thực hiện nghĩa vụ tài chính (lệ phí, án phí)', han: 'đến ' + x.nv, go: 'snack:Mở Cổng Dịch vụ công quốc gia để thanh toán', m: 'sap' }] : [], x.nhap ? [{ t: 'Tiếp tục soạn', go: 'tl1' }] : []);
  return h('li', { className: 'qd-c qc' },
    h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem chi tiết yêu cầu ' + x.ma, 'data-pt-go': x.go }),
    dsTop(st, tinh ? tinh[0] : null, tinh ? (tinh[1] === 'danger' ? 'warning' : tinh[1] === 'success' ? 'success' : 'warning') : null),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, x.va)),
    dsRows([['Mã yêu cầu', h('span', { className: 'tp-num' }, x.ma + (x.gui ? ' - ' + x.gui : ''))], ['Loại yêu cầu', TLY_LOAI[x.loai] + (x.giay ? ' · +' + x.giay + ' bản giấy' : '')], ['Văn bản', h(F, null, x.vb + ' ', h('span', { className: 'tp-num' }, x.so))], ['Tòa án', COURT1], ['Dự kiến trả', x.du]]),
    dsViec(viec));
}
function TlyList(p) {
  var all = p.rong ? [] : TLY, tt = React.useState('all'), q = React.useState('');
  var k = khongDau(q[0].trim()), ds = all.filter(function (x) { return (tt[0] === 'all' || x.tt === tt[0]) && (!k || khongDau(x.ma + ' ' + x.va).indexOf(k) >= 0); }), coLoc = tt[0] !== 'all' || !!k;
  var chips = TLY_TT.map(function (t) { return { key: t[0], label: t[1], count: t[0] === 'all' ? all.length : all.filter(function (x) { return x.tt === t[0]; }).length }; });
  return DsShell('Cấp trích lục, bản sao', h(F, null,
    h('div', { className: 'nv-stick qd-stick' }, h('div', { className: 'ph-ibar' }, h('div', { className: 'fx-search' }, Tf('Tìm yêu cầu', { icon: 'search', placeholder: 'Tìm kiếm mã yêu cầu, tên vụ án', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } }))),
      h(StRow, { label: 'Lọc yêu cầu theo trạng thái', value: tt[0], onChange: tt[1], items: chips })),
    ds.length ? h('ul', { className: 'qd-list' }, ds.map(function (x) { return h(TlyCard, { key: x.ma, x: x }); }))
      : h(IbEmpty, { icon: 'file', title: coLoc ? 'Không có yêu cầu phù hợp' : 'Chưa có yêu cầu nào', text: coLoc ? 'Không có yêu cầu nào thuộc trạng thái/từ khóa đã chọn.' : 'Yêu cầu cấp trích lục, bản sao bản án/quyết định của Tòa án sẽ hiển thị tại đây.', action: coLoc ? 'Xóa bộ lọc' : null, onAction: function () { tt[1]('all'); q[1](''); } })),
    'Tạo yêu cầu mới', 'tl1');
}
function KnTtCard(p) {
  var r = p.r;
  var viec = r.nhap ? [{ t: 'Tiếp tục soạn', go: r.go || 'kqd1' }] : [];
  return h('li', { className: 'qd-c qc kn-c' },
    h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': r.nhap ? 'Tiếp tục soạn bản nháp' : 'Xem chi tiết hồ sơ ' + r.ma, 'data-pt-go': r.go }),
    dsTop(r.tt, r.tinh, r.kq ? 'success' : 'info'),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, r.tom)),
    dsRows([['Mã hồ sơ', h('span', { className: 'tp-num' }, r.ma)], ['Thủ tục', r.thuTuc], [r.goc[0], h('span', { className: 'tp-num' }, r.goc[1])], ['Loại', r.loai], r.qla ? ['Mã QLA', h('span', { className: 'tp-num' }, r.qla)] : null]),
    r.nhap ? h('p', { className: 'kn-ban' }, h(T.Icon, { name: 'file' }), 'Bản nháp, chưa tính thời hạn') : r.kq ? h('p', { className: 'kn-kq' }, h(T.Icon, { name: 'checkCircle' }), 'Tòa án đã có văn bản giải quyết') : r.bar ? KnBar(r.bar) : null,
    r.lan2 ? h('div', { className: 'kn-lan2' }, h('span', { className: 'ib-due ib-due-an' }, 'Còn ' + r.lan2[0] + ' ngày'), h(HdBtns, { codes: ['A008'] }), h('small', null, 'Tòa án đã gửi Quyết định giải quyết khiếu nại · hạn ' + r.lan2[1] + '.')) : null,
    r.hd ? h('div', { className: 'qd-c-f' }, h('span'), h(HdBtns, { codes: r.hd })) : null,
    r.nhap ? h('div', { className: 'qd-c-f qc-vk vkx-box ds-nhap' }, h('p', { className: 'qc-vk-h vkx-h' }, 'Việc cần làm'), h('div', { className: 'ph-2btn' }, Btn('Xóa nháp', 'secondary', { size: 'sm', 'data-pt-go': 'complaintsDraftDel' }), Btn('Tiếp tục soạn', 'secondary', { size: 'sm', 'data-pt-go': r.go || 'kqd1' }))) : null);
}
function KnHc(p) {
  var all = p.rong ? [] : KN_HC_HS;
  if (!all.length) return h(IbEmpty, { icon: 'building', title: 'Chưa có hồ sơ khiếu nại, tố cáo hành chính', text: 'Nộp đơn khiếu nại, tố cáo mới để bắt đầu theo dõi tại đây.' });
  return h('ul', { className: 'qd-list' }, all.map(function (r) {
    return h('li', { key: r.ma, className: 'qd-c qc kn-c' }, h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem chi tiết hồ sơ ' + r.ma, 'data-pt-go': r.go }),
      dsTop(r.grp), h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, r.tom)),
      dsRows([['Mã hồ sơ', h('span', { className: 'tp-num' }, r.ma + ' - ' + r.gui)], ['Loại đơn', r.loai], ['Người gửi', r.chu], ['Tòa án', COURT1]]),
      r.ban ? h('p', { className: 'kn-ban' }, h(T.Icon, { name: 'clock' }), r.ban) : null);
  }));
}
function KnHome(p) {
  var tab = React.useState(p.tab || 'hc'), rong = p.rong;
  var src = [['hc', 'Khiếu nại, tố cáo hành chính', 'Hệ thống KNTC', rong ? 0 : KN_HC_HS.length], ['tt', 'Khiếu nại, tố cáo trong tố tụng', 'Hệ thống QLA', rong ? 0 : KN_TT_HS.filter(function (r) { return !r.nhap; }).length]];
  return DsShell('Khiếu nại — Tố cáo', h(F, null,
    h('div', { className: 'kn-src', role: 'tablist', 'aria-label': 'Nguồn hệ thống tiếp nhận' }, src.map(function (s) {
      return h('button', { key: s[0], type: 'button', role: 'tab', 'aria-selected': tab[0] === s[0], className: 'kn-src-it' + (tab[0] === s[0] ? ' kn-src-on' : ''), onClick: function () { tab[1](s[0]); } },
        h('span', { className: 'kn-src-top' }, h('span', { className: 'kn-src-ic', 'aria-hidden': 'true' }, h(T.Illustration, { name: s[0] === 'hc' ? 'hanhChinh' : 'banAn' })), h('span', { className: 'kn-src-b kn-src-b-' + s[0] }, h(T.Icon, { name: 'swap' }), s[2])), h('b', null, s[1]), h('small', null, s[3] + ' hồ sơ'));
    })),
    tab[0] === 'tt' ? h(KnTt, { rong: rong }) : h(KnHc, { rong: rong }), p.top || null), 'Nộp đơn mới', 'choose');
}

/* v338 (12/11/2026): Câu hỏi thường gặp + Đánh giá mức độ hài lòng theo khung Danh sách đơn và tiến trình (DsShell, ô tìm + chip lọc dính đầu, mỗi mục một thẻ QdCard),
   bổ sung luồng web có mà app chưa có: gửi đánh giá hồ sơ lỗi DG-409-DA_DANH_GIA / DG-409-HET_HAN / DG-404-HO_SO (đóng màn, báo lỗi, về danh sách),
   đánh giá Cổng lỗi DG-409-DA_CO_PHIEU_KY / DG-409-KY_DA_DONG (báo lỗi, về phiếu đã gửi), Kết quả công khai: khối Cổng dưới ngưỡng lượt (chỉ tiêu đề) */
var DG_LOI = { da: 'Bạn đã đánh giá hồ sơ này.', het: 'Hồ sơ đã hết thời hạn đánh giá.', hs: 'Hồ sơ chưa hoàn thành hoặc không tồn tại.', daCo: 'Bạn đã đánh giá Cổng trong kỳ này. Hãy sửa đánh giá đã gửi.', dong: 'Kỳ đánh giá đã kết thúc, không sửa được phiếu.' };
function dsLoc(p) { /* khối ô tìm + chip lọc dính đầu (như Danh sách đơn) */
  return h('div', { className: 'nv-stick qd-stick' }, h('div', { className: 'ph-ibar' }, h('div', { className: 'fx-search' }, Tf(p.nhan, { icon: 'search', placeholder: p.ph, value: p.q, onChange: function (e) { p.setQ(e.target.value); }, onClear: function () { p.setQ(''); } }))),
    h(StRow, { label: p.nhanChip, value: p.f, onChange: p.setF, items: p.chips }));
}
/* v339 (12/11/2026): Câu hỏi thường gặp theo chủ đề (PA B): mỗi chủ đề 1 khối (biểu tượng · tên · số câu hỏi), câu hỏi là dòng gọn;
   chạm dòng -> chi tiết câu hỏi trong bảng từ đáy (câu hỏi, chủ đề, ngày cập nhật, câu trả lời, phản hồi Hữu ích / Cần cải thiện).
   Biểu tượng chủ đề: web/CSDL chưa có trường biểu tượng (FAQ_NHOM chỉ có TEN, MOTA, THUTU) -> [Cần bổ sung ở web], tạm gán theo chủ đề mẫu, chủ đề khác dùng biểu tượng chung */
var FAQ_IC = { tk: 'user', td: 'mail', ks: 'pen', gd: 'swap' };
function faqIc(id) { return FAQ_IC[id] || 'message'; }
function FaqRow(p) {
  var c = p.c;
  return h('li', { className: 'faqr' }, h('button', { type: 'button', className: 'faqr-q pt-chk', 'aria-haspopup': 'dialog', onClick: p.onMo }, h('span', null, c.q), h(T.Icon, { name: 'chevronRight' })));
}
function FaqSheet(p) {
  var c = p.c;
  return h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-co-sheet faq-sheet' }, h('div', { className: 'ph-scrim', onClick: p.onClose }),
    h('div', { className: 'tp-dlg tp-dlg-sheet', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'faq-sh-t' },
      h('div', { className: 'tp-dlg-head' }, h('h3', { id: 'faq-sh-t' }, 'Chi tiết câu hỏi'), h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Đóng', onClick: p.onClose }, h(T.Icon, { name: 'x' }))),
      h('div', { className: 'tp-dlg-body faq-sh-body' },
        h('p', { className: 'faq-sh-meta' }, h('span', { className: 'faq-sh-cd' }, h(T.Icon, { name: faqIc(p.nhom.id) }), p.nhom.ten), h('span', null, 'Cập nhật ' + c.d)),
        h('b', { className: 'faq-sh-q' }, c.q),
        h('p', { className: 'faqc-a' }, c.a),
        h('div', { className: 'faqc-f' }, h(FaqFb, { guest: p.guest, st: p.st })))));
}
function FaqScr(p) {
  var tab = React.useState(p.tab || 'ds'), q = React.useState(p.q || ''), cd = React.useState('all'), mo = React.useState(p.mo || null);
  var anchor = React.useRef(null), host = useHost(anchor);
  var gy = p.gyRong ? [] : FAQ_GOPY, tk = khongDau(q[0].trim());
  var kq = FAQ_NHOM.filter(function (n) { return cd[0] === 'all' || n.id === cd[0]; }).map(function (n) { return { id: n.id, ten: n.ten, ds: n.ds.filter(function (c) { return !tk || khongDau(c.q + ' ' + c.a).indexOf(tk) >= 0; }) }; }).filter(function (n) { return n.ds.length; });
  var coLoc = !!q[0].trim() || cd[0] !== 'all', xoa = function () { q[1](''); cd[1]('all'); };
  var chips = [{ key: 'all', label: 'Tất cả chủ đề', count: FAQ_NHOM.reduce(function (s, n) { return s + n.ds.length; }, 0) }].concat(FAQ_NHOM.map(function (n) { return { key: n.id, label: n.ten, count: n.ds.length }; }));
  var chon = null; FAQ_NHOM.forEach(function (n) { n.ds.forEach(function (c) { if (c.id === mo[0]) chon = { c: c, nhom: n }; }); });
  var dsBody = p.loi ? h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tải được danh sách câu hỏi.', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: noop, className: 'nv-err' }) : h(F, null,
    dsLoc({ nhan: 'Từ khóa tìm kiếm', ph: 'Ví dụ: nộp đơn, hòa giải, phục hồi…', q: q[0], setQ: q[1], nhanChip: 'Chủ đề', f: cd[0], setF: cd[1], chips: chips }),
    kq.length ? h('div', { className: 'faqk-ds' }, kq.map(function (n) {
      return h('section', { key: n.id, className: 'faqk', 'aria-label': n.ten },
        h('div', { className: 'faqk-h' }, h('span', { className: 'faqk-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: faqIc(n.id) })), h('b', null, n.ten), h('small', null, n.ds.length + ' câu hỏi')),
        h('ul', { className: 'faqk-l' }, n.ds.map(function (c) { return h(FaqRow, { key: c.id, c: c, onMo: function () { mo[1](c.id); } }); })));
    })) : h(IbEmpty, { icon: 'search', title: coLoc ? 'Không tìm thấy câu hỏi phù hợp' + (q[0].trim() ? ' với “' + q[0].trim() + '”' : '') + '.' : 'Chưa có câu hỏi nào.', text: '', action: coLoc ? 'Xóa bộ lọc' : null, onAction: xoa }));
  var gyBody = gy.length ? h('ul', { className: 'qd-list' }, gy.map(function (g) {
    return h('li', { key: g.ma, className: 'qd-c qc' }, h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, g.q || '(Câu hỏi đã được gỡ khỏi danh sách)')),
      dsRows([['Mã', h('span', { className: 'tp-num' }, g.ma)], ['Ngày gửi', g.d], ['Nội dung góp ý', g.nd]]));
  })) : h(IbEmpty, { icon: 'message', title: 'Bạn chưa gửi góp ý nào về câu hỏi thường gặp.', text: 'Khi xem một câu trả lời, chọn “Cần cải thiện” nếu câu trả lời chưa đầy đủ để gửi góp ý cho bộ phận biên tập.' });
  return DsShell('Câu hỏi thường gặp', h(F, null,
    h('span', { ref: anchor, hidden: true }),
    p.guest ? null : h('div', { className: 'faq-tabs' }, h(T.Tabs, { label: 'Câu hỏi thường gặp', value: tab[0], onChange: tab[1], items: [{ key: 'ds', label: 'Câu hỏi thường gặp' }, { key: 'gy', label: 'Góp ý của tôi', count: gy.length }] })),
    tab[0] === 'gy' && !p.guest ? gyBody : dsBody,
    chon && host && !(tab[0] === 'gy' && !p.guest) ? ReactDOM.createPortal(h(FaqSheet, { key: chon.c.id, c: chon.c, nhom: chon.nhom, guest: p.guest, st: chon.c.id === p.mo ? p.st : null, onClose: function () { mo[1](null); } }), host) : null));
}
/* danh sách hồ sơ chờ đánh giá / đánh giá đã gửi: 1 ô tìm + chip Tất cả · Vụ án · Đơn (thay 2 khối có ô tìm riêng của web) */
function DgDs(p) {
  var q = React.useState(''), f = React.useState('all'), cho = p.kieu === 'cho', k = khongDau(q[0].trim());
  var ds = p.ds.filter(function (x) { return (f[0] === 'all' || x.nhom === f[0]) && (!k || khongDau([x.t, x.ma, x.loai, COURT1].join(' ')).indexOf(k) >= 0); });
  var chips = [['all', 'Tất cả'], ['VU_AN', 'Vụ án'], ['DON', 'Đơn']].map(function (c) { return { key: c[0], label: c[1], count: c[0] === 'all' ? p.ds.length : p.ds.filter(function (x) { return x.nhom === c[0]; }).length }; });
  var ten = f[0] === 'all' ? null : DG_KHOI[f[0]][0].toLowerCase(), rong;
  if (!p.ds.length) rong = cho ? '[Không có hồ sơ chờ đánh giá]' : '[Bạn chưa gửi đánh giá nào]';
  else if (k) rong = cho ? 'Không tìm thấy ' + (ten || 'hồ sơ') + ' phù hợp với từ khoá.' : 'Không tìm thấy đánh giá ' + (ten ? ten + ' ' : '') + 'phù hợp với từ khoá.';
  else rong = cho ? 'Không có ' + ten + ' nào chờ đánh giá.' : 'Bạn chưa gửi đánh giá ' + ten + ' nào.';
  return h(F, null,
    p.ds.length ? dsLoc({ nhan: 'Tìm hồ sơ', ph: 'Tìm mã, tên hồ sơ, Tòa án…', q: q[0], setQ: q[1], nhanChip: cho ? 'Lọc hồ sơ chờ đánh giá' : 'Lọc đánh giá đã gửi', f: f[0], setF: f[1], chips: chips }) : null,
    !ds.length ? h(IbEmpty, { icon: cho ? 'checkCircle' : 'star', title: rong, text: '' }) : h('ul', { className: 'qd-list' }, ds.map(function (x) {
      if (cho) return h('li', { key: x.ma, className: 'qd-c qc' }, h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: 'warning', icon: false }, 'Chờ đánh giá'), h(T.StatusBadge, { tone: 'neutral', icon: false }, x.loai)), /* v340b: hạn chỉ ở chân thẻ; v341: Loại thành thẻ cạnh trạng thái */
        h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, x.t)),
        dsRows([[x.nhom === 'DON' ? 'Mã tiếp nhận' : 'Mã định danh', h('span', { className: 'tp-num' }, x.ma)], ['Tòa án', COURT1], ['Có kết quả', x.kq]]), /* v341: nhãn mã theo loại hồ sơ */
        h('div', { className: 'qd-c-f dgb-f' }, h('span', { className: 'dgb-han' }, h(T.Icon, { name: 'clock' }), 'Hạn đánh giá: ' + x.han), Btn('Đánh giá', 'primary', { size: 'sm', icon: 'star', 'data-pt-go': 'rating' }))); /* v340: nút Đánh giá thay khối Việc cần làm */
      return h('li', { key: x.ma, className: 'qd-c qc' }, h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: 'neutral', icon: false }, x.loai), h(SaoDoc, { v: x.sao }), x.an ? h('span', { className: 'dg-an' }, h(T.Icon, { name: 'eyeOff' }), 'Ẩn danh') : null),
        h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, x.t)),
        dsRows([[x.nhom === 'DON' ? 'Mã tiếp nhận' : 'Mã định danh', h('span', { className: 'tp-num' }, x.ma)], ['Tòa án', COURT1], ['Ngày đánh giá', x.d]]), /* v341b: như thẻ Chờ đánh giá */
        h('div', { className: 'faqc-f dgc-f' }, x.gy ? h('p', { className: 'dg-gy' }, x.gy) : null, h('ul', { className: 'dg-tc' }, x.tc.map(function (s, i) { return h('li', { key: i }, DG_TC_HS[i], h(SaoDoc, { v: s, sm: true })); }))));
    })));
}
function DgScr(p) {
  var tab = React.useState(p.tab || (p.guest ? 'ck' : 'cho')), rong = p.rong;
  var cho = rong ? [] : DG_CHO, gui = DG_GUI;
  var tabs = [{ key: 'cho', label: 'Chờ đánh giá', count: p.guest || p.loi || !cho.length ? undefined : cho.length }, { key: 'gui', label: 'Đánh giá đã gửi' }, { key: 'cong', label: 'Đánh giá Cổng dịch vụ' }, { key: 'ck', label: 'Kết quả công khai' }];
  var moTa = { cho: 'Đăng nhập để xem các vụ án, đơn đã xử lý xong của bạn và đánh giá mức độ hài lòng.', gui: 'Đăng nhập để xem lại các đánh giá bạn đã gửi.', cong: 'Đăng nhập để đánh giá chung về trải nghiệm sử dụng Cổng dịch vụ tư pháp.' };
  var t = tab[0], body;
  var LOI = { cho: 'Không tải được danh sách hồ sơ chờ đánh giá.', gui: 'Không tải được đánh giá đã gửi.', cong: 'Không tải được thông tin đánh giá Cổng.', ck: 'Không tải được kết quả đánh giá.' };
  if (p.loi) body = h(T.EmptyState, { variant: 'center', icon: 'alert', title: LOI[t], actionLabel: 'Thử lại', actionIcon: 'swap', onAction: noop, className: 'nv-err' });
  else if (t === 'ck') body = h(DgCongKhai, { none: p.ckNone, low: p.ckLow });
  else if (p.guest) body = h('div', { className: 'dg-login' }, h('span', { className: 'dg-login-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: 'lock' })), h('h2', null, 'Đăng nhập để xem đánh giá'), h('p', null, moTa[t]), Btn('Đăng nhập', 'primary', { block: true, 'data-pt-go': 'backTo:login' }));
  else if (t === 'cho') body = h(DgDs, { kieu: 'cho', ds: cho }); /* v339b: bỏ dòng tóm tắt + câu mô tả theo yêu cầu */
  else if (t === 'gui') body = h(F, null, h('section', { className: 'dg-tb' }, h('p', null, 'Điểm trung bình bạn đã chấm'), h('div', null, h('b', null, '4,5'), h('span', null, '/5'), h(SaoDoc, { v: 4.5 }))), h(DgDs, { kieu: 'gui', ds: gui }));
  else body = h(DgCong, { st: p.congSt, loi: p.congLoi, onCongKhai: function () { tab[1]('ck'); } });
  return DsShell('Đánh giá mức độ hài lòng', h(F, null, h('div', { className: 'dg-tabs' }, h(T.Tabs, { label: 'Đánh giá mức độ hài lòng', value: t, onChange: tab[1], items: tabs })), body));
}

/* ===== v350 (13/11/2026): Quản lý đơn nhóm 1 – so sánh web /quan-ly-don (QLD1-W01, W02, W04–W14), người dùng duyệt demo ===== */
/* v350 (QLD1-W01: wizard "Bổ sung, sửa đổi hồ sơ" 4 bước (web tab-bo-sung-ho-so.tsx) */
var BS_STEPS = ['Lý do bổ sung', 'Bổ sung tài liệu', 'Sửa đổi nội dung đơn', 'Xem lại & ký gửi'];
/* v354: theo chuẩn Soạn đơn */
function BsWz(n, body, last) { return Wz({ title: 'Bổ sung, sửa đổi hồ sơ', steps: BS_STEPS, n: n, go: n < 4 ? 'bs' + (n + 1) : undefined, last: last, body: body }); } /* v355: bỏ thẻ loại đơn đầu bước */
/* v354: theo chuẩn Soạn đơn */
function Bs1() {
  var ld = React.useState('Bổ sung giấy nhận tiền lần 2 mà tôi mới tìm được, chứng minh khoản vay đã giao đủ.');
  return BsWz(1, h(F, null,
    FCard('Hồ sơ bạn muốn bổ sung', RvKV([['Mã tiếp nhận', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Loại đơn', 'Đơn khởi kiện'], ['Trạng thái hiện tại', 'Yêu cầu sửa đổi, bổ sung đơn'], ['Thời hạn', '26/10/2026']]), true),
    FCard('Lý do bổ sung tài liệu', h(F, null, P('Cho Tòa án biết vì sao bạn nộp thêm tài liệu ở thời điểm này.', 'ph-muted'), n7Tf('Lý do bổ sung tài liệu', ld, { required: true, min: 15, max: 2000, rows: 4 })), true)));
}
/* v354: theo chuẩn Soạn đơn */
function Bs2() {
  return BsWz(2, h(TaiLieuCard, { title: 'Bổ sung tài liệu', desc: 'Chọn tài liệu từ Kho dữ liệu cá nhân hoặc tải lên tệp mới · PDF, JPG, PNG, DOCX · tối đa 10MB/tệp. Cần đính kèm ít nhất một tài liệu.', bat: [], bb0: {}, bs0: [{ k: 1, tep: 'giay-nhan-tien-lan-2.pdf', ten: 'Giấy nhận tiền lần 2', loai: 'Bản chính' }] }));
}
/* v354: theo chuẩn Soạn đơn */
function Bs3() {
  var gc = React.useState('');
  return BsWz(3, FCard('Ghi chú kèm theo (tùy chọn)', h(F, null, P('Ghi chú cho cán bộ tiếp nhận, nếu cần.', 'ph-muted'), n7Tf('Ghi chú kèm theo', gc, { rows: 5, max: 2000 })), true));
}
/* v354: theo chuẩn Soạn đơn */
function Bs4() {
  var ky = React.useState(false), sh = React.useState(false), cd = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), da = ky[0];
  var tep = ['Đơn đề nghị bổ sung tài liệu, chứng cứ.pdf', 'giay-nhan-tien-lan-2.pdf'];
  return BsWz(4, h(F, null, h('span', { ref: anchor, hidden: true }),
    FCard('Xem lại hồ sơ bổ sung', h(F, null, P('Kiểm tra lại toàn bộ thông tin trước khi ký số và gửi.', 'ph-muted'),
      h(RvKhoi, { t: 'Thông tin bổ sung', go: 'bs1' }, RvKV([['Đơn liên quan', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Nguồn bổ sung', '[Nguồn bổ sung]'], ['Mã yêu cầu bổ sung', '[Mã yêu cầu bổ sung]'], ['Trong hạn', '[Trong hạn]']])),
      h(RvKhoi, { t: 'Lý do bổ sung', go: 'bs1' }, P('Bổ sung giấy nhận tiền lần 2 mà tôi mới tìm được, chứng minh khoản vay đã giao đủ.')),
      h(RvKhoi, { t: 'Tài liệu đã bổ sung (1 tệp)', go: 'bs2' }, h('ul', { className: 'ph-rvdoc' }, h('li', null, h('div', null, h('b', null, 'Giấy nhận tiền lần 2'), h('small', null, 'giay-nhan-tien-lan-2.pdf · Bản chính')), IcoBtn('eye', 'Xem giay-nhan-tien-lan-2.pdf')))),
      h(RvKhoi, { t: 'Ghi chú kèm theo', go: 'bs3' }, P('Không có', 'ph-muted'))), true),
    FCard('Ký số', h(F, null, P('Ký số đơn đề nghị bổ sung tài liệu và toàn bộ tài liệu đính kèm trước khi gửi.', 'ph-muted'),
      h('ul', { className: 'ph-ky' }, h('li', null, h('div', null, h('b', null, 'Đơn đề nghị bổ sung tài liệu, chứng cứ')), IcoBtn('eye', 'Xem Đơn đề nghị bổ sung tài liệu, chứng cứ.pdf')),
        laTC() ? h(KyTcRows, { tep: tep, onXong: function () { ky[1](true); } }) : h('li', null, h('span', { className: 'ph-ky-no' }, '1'), h('div', null, h('b', null, 'Hoàng Dương'), h('small', null, 'Người khởi kiện'), da ? h('small', { className: 'ph-ky-da' }, KY_LUC) : null),
          da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn', onClick: function () { sh[1](true); } }, 'Ký số')))), true, da ? 'signed' : 'unsigned'),
    FCard('Tài liệu đính kèm (1 tệp)', h('ul', { className: 'ph-ky' }, h('li', null, h('div', null, h('b', null, 'Giấy nhận tiền lần 2'), h('small', null, 'giay-nhan-tien-lan-2.pdf')), da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : null, IcoBtn('eye', 'Xem giay-nhan-tien-lan-2.pdf'))), true),
    HopGhi('Sau khi gửi', 'Trạng thái đơn giữ nguyên. Lượt bổ sung được ghi vào Lịch sử bổ sung với nhãn "Tự bổ sung", không tính vào thời hạn xử lý của Tòa án.'),
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { label: '[Nội dung cam đoan]', checked: cd[0], onChange: function (e) { cd[1](e.target.checked); } })),
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: tep, onClose: function () { sh[1](false); }, onKy: function () { sh[1](false); ky[1](true); } }), host) : null),
    Btn('Gửi', 'primary', da && cd[0] ? { 'data-pt-go': 'replace:bsOk' } : { disabled: true, title: 'Vui lòng ký số trước khi gửi' }));
}
/* v354: theo chuẩn Soạn đơn */
function BsOk() {
  var rows = [['Mã tiếp nhận', h('span', { className: 'ph-ok-ma' }, '[Mã tiếp nhận]')], ['Đơn liên quan', 'TN-20261020-0012'], ['Thời điểm gửi', '09:30:12 13/11/2026'], ['Trạng thái', h(T.StatusBadge, { tone: 'info', icon: false }, 'Đã gửi')]];
  return h(Phone, { cls: 'ph-ok' }, h(Body, { cls: 'ph-ok-b' },
    h('div', { className: 'ph-success' }, h('span', { className: 'ph-success-ico' }, h(T.Icon, { name: 'checkCircle' })), h('h2', null, 'Đã gửi bổ sung, sửa đổi hồ sơ đến Tòa án.')),
    h('dl', { className: 'ph-rvkv ph-ok-rows' }, rows.map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0]), h('dd', null, r[1])); }))),
    h('div', { className: 'ph-col ph-ok-foot' }, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'reset:records,applications,appDetail' }), Btn('Về Danh sách đơn', 'secondary', { 'data-pt-go': 'reset:records,applications' })));
}
/* hộp "Đơn này đã được bổ sung hồ sơ" khi đã bổ sung trước đó */
function DlgOver(p) {
  var hs = React.useState(null); React.useEffect(function () { hs[1](document.querySelector('.pt-phone .ph')); }, []);
  return hs[0] ? ReactDOM.createPortal(h(T.Dialog, { variant: 'center', inline: true, open: true, className: 'qd-dlg', title: p.title, description: p.desc,
    footer: h(F, null, h(T.Button, { variant: 'secondary', 'data-pt-go': 'back' }, p.huy || 'Huỷ'), h(T.Button, { 'data-pt-go': 'replace:' + p.go }, p.ok)) }, p.body || null), hs[0]) : null;
}
/* v354: theo chuẩn Soạn đơn */
function BsAgain() {
  return h(F, null, h(DonChiTiet), h(SdDlg, { illo: ['nopDon', 'alert'], title: 'Đơn này đã được bổ sung hồ sơ', ok: 'Tiếp tục bổ sung thêm', huy: 'Không', go: 'bs1',
    body: h('div', { className: 'q1-dlg' }, P('Đã có 1 lần bổ sung, sửa đổi hồ sơ cho đơn này:'), h('ul', null, h('li', null, h('b', null, 'Bạn'), ' · [Thời điểm gửi]')), P('Bạn có muốn bổ sung thêm không?')) }));
}
/* v350 (QLD1-W05: hộp xác nhận nộp thêm (đơn đã nộp 1 lần) */
var Q1_LAI = {
  sd: ['Nộp thêm bản sửa đổi, bổ sung đơn?', 'Bạn đã nộp bản sửa đổi, bổ sung đối với đơn TN-20261020-0012. Nộp thêm sẽ tạo một bản ghi mới gửi đến Tòa án, không làm thay đổi đơn ban đầu. Bạn có muốn tiếp tục không?', 'Tiếp tục nộp thêm', 'sd1'],
  tr: ['Nộp thêm đơn thay đổi, rút một phần yêu cầu khởi kiện?', 'Bạn đã nộp đơn thay đổi, rút một phần yêu cầu khởi kiện đối với đơn TN-20261020-0012. Nộp thêm sẽ tạo một bản ghi mới, không làm thay đổi đơn ban đầu. Bạn có muốn tiếp tục không?', 'Tiếp tục nộp thêm', 'tr1'],
  bp: ['Tạo đơn yêu cầu áp dụng biện pháp khẩn cấp tạm thời?', 'Hệ thống ghi nhận hồ sơ khởi kiện TN-20261020-0012 đã có yêu cầu áp dụng biện pháp khẩn cấp tạm thời. Bạn có chắc chắn muốn tạo và nộp thêm yêu cầu mới không?', 'Tạo yêu cầu mới', 'bp1'] };
/* v354: theo chuẩn Soạn đơn */
function AppLai(k) { var c = Q1_LAI[k]; return h(F, null, h(DonChiTiet, { tab0: 'ds' }), h(SdDlg, { illo: ['nopDon', 'alert'], title: c[0], desc: c[1], ok: c[2], go: c[3] })); }

/* v350 (QLD1-W02: khối "Tòa án yêu cầu bổ sung tài liệu" ở tab Tài liệu chứng cứ */
/* v354: theo chuẩn Soạn đơn */
function TlYeuCau(p) {
  var het = !!p.het, han = h('span', { className: 'q1n-han' + (het ? ' q1n-han-het' : '') }, h(T.Icon, { name: 'clock' }), het ? 'Đã quá hạn: 20/10/2026' : 'Hạn bổ sung: 26/10/2026');
  var dau = h('div', { className: 'q1s-dau' }, han, P('[Nội dung Tòa án yêu cầu bổ sung]', 'ph-muted'));
  if (het) return h('div', { className: 'q1s' }, FCard('Tòa án yêu cầu bổ sung tài liệu', dau, true));
  return h('div', { className: 'q1s' }, h(TaiLieuCard, { title: 'Tòa án yêu cầu bổ sung tài liệu', desc: h(F, null, dau, h('span', { className: 'q1s-fmt' }, 'Định dạng PDF, JPG, PNG, DOCX · tối đa 10MB/tệp.')), bat: [], bb0: {},
    bs0: p.files ? [{ k: 1, tep: 'bien-lai-chuyen-khoan.pdf', ten: 'Biên lai chuyển khoản', loai: 'Bản chính' }] : [] }),
    p.files ? h('div', { className: 'q1s-luu' }, h(T.Button, { block: true, 'data-pt-go': 'snack:Đã bổ sung 1 tài liệu.' }, 'Lưu tài liệu bổ sung')) : null);
}

/* v350 (QLD1-W06, W07, W08: khối ở tab Thông tin chung */
function KqGiaiQuyet() { return h('section', { className: 'q1-kq' }, h(T.StatusBadge, { tone: 'neutral', icon: false }, '[Nhãn kết quả]'), h('p', null, '[Diễn giải kết quả giải quyết]')); }
function KnVanBan(p) {
  return h('section', { className: 'q1-kn' }, h('b', null, 'Khiếu nại văn bản, thông báo tố tụng'),
    h('p', null, 'Nếu cho rằng văn bản, thông báo tố tụng này trái pháp luật, bạn có quyền gửi đơn khiếu nại tới Tòa án. Hạn khiếu nại: ' + (p.het ? '05/11/2026' : '23/11/2026') + '.' + (p.het ? ' Đã hết thời hiệu khiếu nại.' : '')),
    h(T.Button, { size: 'sm', variant: 'secondary', disabled: !!p.het, 'data-pt-go': p.het ? undefined : 'complaintForm' }, 'Khiếu nại văn bản này'));
}
function VuAnKhoi() { return FCard('Vụ án', h(F, null, h('div', { className: 'q1-badge' }, h(T.StatusBadge, { tone: 'info', icon: false }, '[Trạng thái vụ án]')), RvKV([['Tên vụ án', 'Tranh chấp quyền sử dụng đất'], ['Ngày thụ lý', '15/10/2026']])), true); }
function TamUngKhoi(p) { return FCard('Tạm ứng án phí', RvKV([['Số tiền', '1.250.000 đ'], ['Trạng thái', '[Trạng thái nộp tạm ứng]'], ['Hạn nộp', p.tre ? '02/11/2026' : '06/11/2026']].concat(p.da ? [['Ngày nộp', '01/11/2026']] : [])), true); }

/* v350 (QLD1-W10: chấm đỏ trên tab Văn bản tống đạt khi còn văn bản chưa xem */
function donTabs(chamVb) { return DON_TABS.map(function (t) { return t.key === 'vb' && chamVb ? Object.assign({}, t, { label: h('span', { className: 'q1-tdot' }, t.label, h('i', { className: 'q1-dot', title: 'Có văn bản chưa xem', 'aria-label': 'Có văn bản chưa xem' })) }) : t; }); }

function AppBsHet() { return h(DonChiTiet, { viec: { tone: 'danger', t: 'Tòa yêu cầu bổ sung hồ sơ – Đã hết hạn', han: 'Hạn 20/10/2026', two: [{ l: 'Sửa đổi, bổ sung đơn', dis: true }, { l: 'Nộp tài liệu bổ sung', v: 'secondary', dis: true }] } }); }
function AppBsDaNop() { return h(DonChiTiet, { viec: { tone: 'success', t: 'Đã nộp bản sửa đổi, bổ sung đơn – Đang chờ Tòa án xem xét', han: 'Đang chờ xử lý' } }); }

/* ===== v351 (13/11/2026): Quản lý đơn nhóm 2 – Đơn phản tố, yêu cầu độc lập theo web (QLD2-W01…W13, bỏ M02…M06), người dùng duyệt demo ===== */
/* loại đơn: PT = Đơn phản tố, YC = Đơn yêu cầu độc lập (W01) */
var PT_L = {
  PT: { ten: 'phản tố', tieu: 'Đơn phản tố', tag: 'Đơn phản tố', tc: 'Bị đơn', ma: 'TN-20261028-0018', vu: 'Tranh chấp hợp đồng vay tài sản', va: 'DS-2026-0012', tl: '12/2026/TLST-DS', go: 'ptDetail', yc: 'Buộc nguyên đơn trả lại khoản tiền đặt cọc', gt: '50.000.000 đồng', bb: 'Hoàng Dương (nguyên đơn)' },
  YC: { ten: 'yêu cầu độc lập', tieu: 'Đơn yêu cầu độc lập', tag: 'Đơn yêu cầu độc lập', tc: 'Người có quyền lợi, nghĩa vụ liên quan', ma: 'TN-20261027-0019', vu: 'Tranh chấp di sản thừa kế', va: 'DS-2026-0033', tl: '33/2026/TLST-DS', go: 'ycDetail', yc: 'Chia di sản thừa kế là quyền sử dụng thửa đất số 125 theo pháp luật', gt: '1.200.000.000 đồng', bb: 'Nguyễn Văn An (nguyên đơn); Nguyễn Thị Bình (bị đơn)' } };
var PT_RUT = ['Các bên đã tự thỏa thuận được', 'Bên kia đã thực hiện xong nghĩa vụ', 'Muốn khởi kiện thành vụ án riêng', 'Không còn nhu cầu giải quyết', 'Lý do khác'];
/* v351 (QLD2-W03: khối đầu màn theo trạng thái (cau-hinh.ts bannerViecCanLam); W04: nút theo ma trận, nút khóa mờ + bấm báo lý do */
function ptViec(st, c) {
  var tra = c.tieu.charAt(0).toLowerCase() + c.tieu.slice(1), dkL = c === PT_L.PT ? 'ptd1' : 'ytd1';
  switch (st) {
    case 'choRut': return { tone: 'info', t: 'Đang chờ xử lý yêu cầu rút đơn', han: 'Hệ thống đã tiếp nhận yêu cầu rút đơn của bạn vào lúc 09:30 - 03/11/2026. Yêu cầu này đang chờ Tòa án xem xét.',
      two: [{ l: 'Bổ sung', v: 'secondary', khoa: '[Lý do khóa: đang chờ xử lý yêu cầu rút đơn]' }, { l: 'Thay đổi, bổ sung yêu cầu', v: 'secondary', khoa: '[Lý do khóa: đang chờ xử lý yêu cầu rút đơn]' }] };
    case 'bs': return { t: 'Tòa án yêu cầu sửa đổi, bổ sung đơn · hạn 08/11/2026', han: 'Đọc văn bản 11/2026/TB-TA (tống đạt 30/10/2026) trong Hộp thư tống đạt. Quá hạn không bổ sung, Tòa án trả lại đơn.', btn: { l: 'Bổ sung', go: c === PT_L.PT ? 'pbs1' : 'ybs1' } };
    case 'bsHet': return { tone: 'danger', t: 'Tòa yêu cầu bổ sung hồ sơ – Đã hết hạn (hạn 25/10/2026)', btn: { l: 'Bổ sung', khoa: '[Lý do khóa từ hệ thống]' } };
    case 'au': return { t: 'Nộp tạm ứng án phí · hạn 06/11/2026', han: 'Nộp và gửi biên lai trong hạn. Quá hạn không nộp, Tòa án trả lại đơn.', btn: { l: 'Nộp tạm ứng án phí', go: 'financePay' } };
    case 'auHet': return { tone: 'danger', t: 'Đã hết hạn nộp tạm ứng án phí (hạn 02/11/2026)', han: 'Công dân không thể nộp sau khi hết hạn — vui lòng liên hệ Tòa án.', btn: { l: 'Nộp tạm ứng án phí', khoa: 'Đã hết hạn nộp tạm ứng án phí.' } };
    case 'ky': return { tone: 'neutral', t: 'Đơn chưa được gửi đến Tòa án', han: 'Đang chờ đủ chữ ký số. Ngày nộp đơn tính từ lúc đủ chữ ký và gửi thành công.', btn: { l: 'Rút đơn', v: 'secondary', khoa: '[Lý do khóa: đơn chưa có mã tiếp nhận]' } };
    case 'tra': return { tone: 'danger', t: 'Tòa án đã trả lại đơn · ngày 31/10/2026', han: 'Còn lại 6 ngày để khiếu nại việc trả lại đơn.', btn: { l: 'Khiếu nại việc trả lại đơn', go: c === PT_L.PT ? 'pkn1' : 'ykn1' } };
    case 'traHet': return { tone: 'danger', t: 'Tòa án đã trả lại đơn · ngày 15/10/2026', han: 'Đã hết thời hạn khiếu nại việc trả lại đơn.', btn: { l: 'Khiếu nại việc trả lại đơn', khoa: '[Lý do khóa từ hệ thống]' } };
    case 'vaoVA': return { tone: 'neutral', t: 'Yêu cầu đã được đưa vào vụ án ' + c.va, two: [{ l: 'Thay đổi, bổ sung yêu cầu', v: 'secondary', go: dkL }, { l: 'Rút toàn bộ yêu cầu', v: 'secondary', go: c === PT_L.PT ? 'prdVA1' : 'yrd1' }] };
    default: return { tone: 'info', t: 'Đơn đã đến hệ thống Tòa án', han: 'Chờ Tòa án vào sổ nhận đơn. Bạn vẫn rút được đơn ở giai đoạn này.', two: [{ l: 'Rút đơn', v: 'secondary', go: c === PT_L.PT ? 'prd1' : 'yrd1' }, { l: 'Thay đổi yêu cầu', v: 'secondary', go: dkL }] };
  }
}
var PT_BADGE = { gui: [['Đã gửi đơn', 'info']], choRut: [['Đang xử lý', 'info']], bs: [['Đang xử lý', 'info'], ['Yêu cầu sửa đổi, bổ sung đơn', 'warning']], bsHet: [['Đang xử lý', 'info'], ['Yêu cầu sửa đổi, bổ sung đơn', 'warning']], au: [['Đang xử lý', 'info'], ['Chờ nộp tạm ứng án phí', 'warning']], auHet: [['Đang xử lý', 'info'], ['Chờ nộp tạm ứng án phí', 'warning']], ky: [['Chờ ký số', 'warning']], tra: [['Đã xử lý', 'success'], ['Đã trả lại đơn', 'neutral']], traHet: [['Đã xử lý', 'success'], ['Đã trả lại đơn', 'neutral']], vaoVA: [['Đang xử lý', 'info'], ['Đã đưa vào vụ án', 'success']] };
/* v351 (QLD2-W07: Đơn phát sinh – đã gửi: bấm thẻ xem đơn (PDF); nháp: Tiếp tục soạn mở đúng trình tự */
function ptPhatSinh(c) {
  var bsGo = c === PT_L.PT ? 'pbs1' : 'ybs1';
  var ds = [
    { loai: 'Đơn rút', t: 'Rút đơn ' + c.ten, tt: ['Đã gửi', 'info'], ma: 'TN-20261103-0040', ngay: ['Ngày gửi', '03/11/2026 · 09:30'], file: 'Don-rut-TN-20261103-0040.pdf' },
    { loai: 'Hồ sơ bổ sung', t: 'Bổ sung hồ sơ đơn ' + c.ten, tt: ['Lưu nháp', 'neutral'], ma: null, ngay: ['Lưu nháp', '30/10/2026 · 16:05'], go: bsGo }];
  return FCard('Đơn phát sinh', h(F, null, P('Đơn sửa đổi, bổ sung và đơn rút chỉ có trạng thái Đã gửi. Kết quả hiện trên đơn gốc khi Tòa án gửi văn bản.', 'ph-muted dt-small'), h('ul', { className: 'qd-list dt-qc' }, ds.map(DtDonThe))), true);
}
function AutoSnack(p) { React.useEffect(function () { var t = setTimeout(function () { window.__ptSnack && window.__ptSnack(p.m); }, 300); return function () { clearTimeout(t); }; }, []); return null; }
/* v351 (QLD2-W05: hộp "Xác nhận nộp thêm đơn" */
function ptLai(loai, ma, go) { return PtDetail({ loai: loai, st: 'bs', dlg: { title: 'Xác nhận nộp thêm đơn', desc: 'Bạn đã nộp ' + ma + ' trước đó rồi. Bạn có muốn tiếp tục nộp thêm đơn mới không?', ok: 'Tiếp tục nộp thêm', go: go } }); }

/* v351 (QLD2-W13: màn đã gửi dùng chung – Mã hồ sơ, Đơn liên quan, Trạng thái: Đã gửi; Xem đơn liên quan / Về danh sách đơn */
function PtDaGui(p) {
  var c = PT_L[p.loai || 'PT'];
  return h(OkScr, { title: p.title, text: p.text, info: [['Mã hồ sơ', h('span', { className: 'tp-num' }, p.ma || 'TN-20261113-0052')], ['Đơn liên quan', h('span', { className: 'tp-num' }, c.ma)], ['Trạng thái', 'Đã gửi']],
    btns: h(F, null, Btn('Xem đơn liên quan', 'primary', { 'data-pt-go': 'reset:records,appK_phanto,' + c.go }), Btn('Về danh sách đơn', 'secondary', { 'data-pt-go': 'reset:records,appK_phanto' })) });
}
/* v351 (QLD2-W02, W09, M06: bổ sung hồ sơ – phản tố và yêu cầu độc lập */
function PbsWz2(loai, n, body) { return Wz({ title: 'Bổ sung hồ sơ', steps: PBS_STEPS, n: n, go: (loai === 'YC' ? 'ybs' : 'pbs') + (n + 1), body: body }); }
function PbsS2(loai, err) {
  return PbsWz2(loai, 2, FCard('Tài liệu Tòa án yêu cầu bổ sung', h(F, null, Lead('Chọn tài liệu sẵn có trong Kho dữ liệu cá nhân hoặc tải lên tệp mới. PDF, JPG, PNG, DOCX · tối đa 10MB/tệp.'),
    h(T.FileUpload, { hint: 'PDF, JPG, PNG, DOCX · tối đa 10MB/tệp', uploadLabel: 'Tải lên tệp mới', libraryLabel: 'Chọn từ Kho dữ liệu cá nhân', files: err ? [] : [{ name: 'bien-nhan-dat-coc.pdf', size: '640 KB' }] }),
    err ? h('p', { className: 'q2-err', role: 'alert' }, h(T.Icon, { name: 'alert' }), 'Tải lên tài liệu Tòa án yêu cầu bổ sung.') : null), true));
}
function PbsS3(p) {
  var cu = PT_L[p.loai || 'PT'].yc, nd = React.useState(cu + ' và tiền lãi chậm trả tính đến ngày xét xử sơ thẩm.');
  return PbsWz2(p.loai, 3, h(F, null, FCard('Sửa nội dung yêu cầu theo đề nghị của Tòa án', n7Tf('Nội dung yêu cầu', nd, { rows: 5, max: 2000, placeholder: 'Buộc nguyên đơn hoàn trả …', help: 'Viết lại yêu cầu hoàn chỉnh (bỏ trống nếu Tòa án chỉ yêu cầu bổ sung tài liệu).' }), true),
    SoSanh(cu, nd[0])));
}
function SoSanh(cu, moi) { return FCard('So sánh trước và sau', h('div', { className: 'q2-ss' }, h('div', null, h('small', null, 'Nội dung hiện tại'), h('p', null, cu || '—')), h('div', { className: 'q2-ss-moi' }, h('small', null, 'Sau khi sửa'), h('p', null, moi || '(chưa nhập nội dung mới)'))), true); }
function PbsS4(loai) {
  var c = PT_L[loai || 'PT'];
  return h(KyGuiDon, { title: 'Bổ sung hồ sơ', steps: PBS_STEPS, ok: loai === 'YC' ? 'ybsOk' : 'pbsOk', tep: ['Hồ sơ bổ sung đơn ' + c.ten + '.pdf', 'bien-nhan-dat-coc.pdf'], tepMeta: 'Bản in hồ sơ bổ sung', vaiTro: c.tc, sendLabel: 'Ký và gửi',
    top: FCard('Xem lại', RvKV([['Đơn ' + c.ten, h('span', { className: 'tp-num' }, c.ma)], ['Văn bản yêu cầu', '11/2026/TB-TA'], ['Tài liệu đã bổ sung', 'bien-nhan-dat-coc.pdf'], ['Trường đã sửa', 'Nội dung yêu cầu'], ['Hạn', '08/11/2026']]), true),
    bottom: HopGhi('Sau khi gửi', 'Hồ sơ bổ sung là đơn phát sinh, chỉ có trạng thái Đã gửi. Đơn ' + c.ma + ' vẫn ở "Đang xử lý đơn" cho đến khi Tòa án có kết quả.'),
    camDoan: 'Tôi cam đoan nội dung sửa đổi, bổ sung và tài liệu kèm theo là đúng sự thật.' });
}
function PbsOk() { return h(PtDaGui, { title: 'Đã gửi hồ sơ bổ sung', text: 'Tòa án sẽ kiểm tra hồ sơ bổ sung và thông báo kết quả qua Hộp thư tống đạt.' }); }

/* v351 (QLD2-W10, M03: rút đơn phản tố / yêu cầu độc lập – 3 bước riêng, không còn khối hệ quả và thẻ tạm ứng của đơn khởi kiện */
var PRD_STEPS = ['Đơn cần rút', 'Lý do & hệ quả', 'Xác nhận & ký gửi'];
function prdTen(c, va) { return (va ? 'Rút toàn bộ yêu cầu ' : 'Rút đơn ') + c.ten; }
function prdId(loai, va) { return loai === 'YC' ? 'yrd' : va ? 'prdVA' : 'prd'; }
function Prd1(loai, va) {
  var c = PT_L[loai || 'PT'];
  return Wz({ title: prdTen(c, va), steps: PRD_STEPS, n: 1, go: prdId(loai, va) + '2', body: h(F, null, Lead('Bạn đề nghị Tòa án cho rút. Việc rút chỉ có hiệu lực khi Tòa án chấp nhận.'),
    FCard('Đơn bạn đề nghị rút', h(F, null, Lead('Kiểm tra đúng đơn trước khi tiếp tục. Thông tin lấy tự động, không sửa được.'),
      RvKV([['Mã tiếp nhận', h('span', { className: 'tp-num' }, c.ma)], ['Loại đơn', c.tieu], ['Ngày gửi', '28/10/2026 09:15'], ['Tòa án tiếp nhận', COURT1], ['Trạng thái hiện tại', va ? 'Đang xử lý · Đã đưa vào vụ án' : 'Đã gửi đơn'], ['Vụ án liên quan', c.va + ' · ' + c.vu]])), true)) });
}
function Prd2(p) {
  var c = PT_L[p.loai || 'PT'], ld = React.useState(p.err ? '' : 'r0'), tb = React.useState(p.err ? 'Đã xong' : 'Hai bên đã thỏa thuận xong ngày 01/11/2026, bị đơn đã trả đủ tiền.');
  return Wz({ title: prdTen(c, p.va), steps: PRD_STEPS, n: 2, go: prdId(p.loai, p.va) + '3', body: h(F, null,
    FCard('Lý do rút', h(F, null, h(ChonThe, { label: 'Lý do rút', v: ld[0], onPick: ld[1], items: PT_RUT.map(function (x, i) { return { id: 'r' + i, t: x }; }) }), p.err && !ld[0] ? h('p', { className: 'q2-err', role: 'alert' }, h(T.Icon, { name: 'alert' }), 'Vui lòng chọn lý do rút.') : null), true),
    FCard('Trình bày', h(F, null, n7Tf('Trình bày', tb, { required: true, min: 10, max: 2000, placeholder: 'Hai bên đã thỏa thuận xong ngày …', error: p.err ? 'Trình bày lý do rút (tối thiểu 10 ký tự).' : undefined })), true)) });
}
function Prd3(loai, va) {
  var c = PT_L[loai || 'PT'], ten = va ? 'yêu cầu' : 'đơn';
  return h(KyGuiDon, { title: prdTen(c, va), steps: PRD_STEPS, ok: prdId(loai, va) + 'Ok', tep: [prdTen(c, va) + '.pdf'], tepMeta: 'Bản in đơn rút', vaiTro: c.tc, sendLabel: 'Gửi đơn',
    top: FCard('Xem lại', RvKV([['Loại', va ? 'Rút toàn bộ yêu cầu' : 'Rút đơn'], ['Đơn ' + c.ten, h('span', { className: 'tp-num' }, c.ma)], ['Lý do', PT_RUT[0]], ['Trình bày', 'Hai bên đã thỏa thuận xong ngày 01/11/2026, bị đơn đã trả đủ tiền.']]), true),
    camDoan: 'Tôi hiểu hệ quả của việc rút ' + ten + ' ' + c.ten + ' và tự nguyện đề nghị Tòa án cho rút.' });
}
function PrdOk(loai) { return h(PtDaGui, { loai: loai, title: 'Đã gửi đơn rút', text: 'Trong lúc chờ Tòa án xử lý, bạn không nộp bổ sung hay thay đổi yêu cầu được. Kết quả hiện trên đơn gốc khi Tòa án gửi văn bản.' }); }

/* v351 (QLD2-W11, M04: thay đổi / rút một phần yêu cầu phản tố – 5 bước riêng */
var PTD_LD = { 'TD-01': ['Có thêm chứng cứ làm thay đổi giá trị yêu cầu', 'Phát sinh thiệt hại mới sau khi nộp đơn', 'Tính lại giá trị yêu cầu', 'Bổ sung yêu cầu có liên quan', 'Lý do khác'], 'TD-02': ['Các bên đã thỏa thuận được phần này', 'Bên kia đã thực hiện xong nghĩa vụ', 'Không đủ chứng cứ chứng minh phần này', 'Muốn khởi kiện riêng phần này', 'Lý do khác'] };
function ptdSteps(rut) { return ['Loại điều chỉnh', rut ? 'Yêu cầu cần rút' : 'Yêu cầu cần thay đổi', 'Lý do & hệ quả', 'Tài liệu kèm theo', 'Xem lại & ký gửi']; }
function ptdTen(c, rut) { return rut === undefined ? 'Điều chỉnh yêu cầu ' + c.ten : (rut ? 'Rút một phần yêu cầu ' : 'Thay đổi, bổ sung yêu cầu ') + c.ten; }
function PtdWz(p, n, body, rut) { var c = PT_L[p.loai || 'PT'], id = p.loai === 'YC' ? 'ytd' : 'ptd'; return Wz({ title: ptdTen(c, n === 1 ? undefined : !!rut), steps: ptdSteps(rut), n: n, go: id + (rut ? 'R' : '') + (n + 1), body: body }); }
function Ptd1(p) {
  var c = PT_L[p.loai || 'PT'], v = React.useState('TD-01'), khoa = p.khoa ? ['TD-02'] : [];
  return PtdWz(p, 1, h(F, null, FCard('Bạn muốn điều chỉnh yêu cầu ' + c.ten + ' thế nào?', h(F, null, Lead('Cả hai việc đều gắn với đơn ' + c.ten + ' đã được đưa vào vụ án, không tạo vụ án mới.'),
    h(OptCards, { label: 'Loại điều chỉnh', cur: v[0], onPick: v[1], items: [{ id: 'TD-01', t: 'Thay đổi, bổ sung yêu cầu ' + c.ten, d: 'Sửa nội dung một yêu cầu đã nêu, hoặc thêm yêu cầu có liên quan.' }, { id: 'TD-02', t: 'Rút một phần yêu cầu ' + c.ten, d: 'Giữ đơn nhưng bỏ bớt một hoặc vài yêu cầu. Muốn bỏ toàn bộ thì dùng đơn rút toàn bộ yêu cầu.', off: khoa.indexOf('TD-02') >= 0 }] }),
    RvKV([['Giai đoạn', 'Sơ thẩm · Yêu cầu đã được đưa vào vụ án']])), true)));
}
function Ptd2(p) {
  var c = PT_L[p.loai || 'PT'], rut = !!p.rut, nd = React.useState(p.err ? c.yc : rut ? 'Tiền lãi chậm trả' : c.yc + ' và tiền lãi chậm trả tính đến ngày xét xử sơ thẩm.');
  return PtdWz(p, 2, h(F, null, FCard('Nội dung yêu cầu ' + c.ten + ' đã nộp', h(F, null, Lead('Lấy nguyên văn từ đơn đã gửi, chỉ đọc.'), RvKV([['Nội dung', c.yc]])), true),
    FCard(rut ? 'Phần yêu cầu bạn muốn rút' : 'Nội dung yêu cầu sau khi thay đổi, bổ sung', h(F, null, Lead(rut ? 'Ô bên dưới đã điền sẵn nội dung cũ. Giữ lại đúng phần bạn muốn rút, xóa phần vẫn đề nghị Tòa án giải quyết.' : 'Ô bên dưới đã điền sẵn nội dung cũ. Sửa, bổ sung thành yêu cầu hoàn chỉnh để Tòa án đưa nguyên văn vào hồ sơ.'),
      n7Tf(rut ? 'Phần yêu cầu bạn muốn rút' : 'Nội dung yêu cầu sau khi thay đổi, bổ sung', nd, { required: true, min: 10, max: 2000, rows: 5, error: p.err ? 'Bạn chưa thay đổi, bổ sung nội dung nào so với yêu cầu đã nộp.' : undefined })), true),
    rut ? null : SoSanh(c.yc, nd[0])), rut);
}
function Ptd3(p) {
  var rut = !!p.rut, ld = React.useState('l1'), tb = React.useState('Sau khi có kết quả giám định ngày 05/11/2026, thiệt hại thực tế là 65.000.000 đồng.'), ds = PTD_LD[rut ? 'TD-02' : 'TD-01'];
  return PtdWz(p, 3, h(F, null, FCard(rut ? 'Lý do rút một phần yêu cầu' : 'Lý do thay đổi, bổ sung yêu cầu', h(ChonThe, { label: 'Lý do', v: ld[0], onPick: ld[1], items: ds.map(function (x, i) { return { id: 'l' + i, t: x }; }) }), true),
    FCard('Trình bày cụ thể', h(F, null, Lead('Nêu diễn biến dẫn đến việc điều chỉnh và căn cứ kèm theo.'), n7Tf('Trình bày cụ thể', tb, { required: ld[0] === 'l4', max: 2000, placeholder: 'Sau khi có kết quả giám định ngày …, thiệt hại thực tế là …' })), true)), rut);
}
function Ptd4(p) { return PtdWz(p, 4, n7TepTuyChon(p.rut), p.rut); }
function n7TepTuyChon(rut) { return FCard('Tài liệu kèm theo (tùy chọn)', h(F, null, Lead(rut ? 'Tài liệu chứng minh lý do rút, ví dụ biên bản thỏa thuận, biên nhận thanh toán.' : 'Chứng cứ cho phần yêu cầu thay đổi, bổ sung, ví dụ chứng từ thiệt hại mới, kết quả giám định.'), h(T.FileUpload, { hint: 'PDF, JPG, PNG, DOCX · tối đa 10MB/tệp', uploadLabel: 'Tải lên tệp mới', libraryLabel: 'Chọn từ Kho dữ liệu cá nhân', files: [] })), true); }
function Ptd5(p) {
  var c = PT_L[p.loai || 'PT'], rut = !!p.rut, id = p.loai === 'YC' ? 'ytd' : 'ptd';
  return h(KyGuiDon, { title: ptdTen(c, rut), steps: ptdSteps(rut), ok: id + 'Ok', tep: [ptdTen(c, rut) + '.pdf'], tepMeta: 'Bản in đơn', vaiTro: c.tc, sendLabel: 'Gửi đơn',
    top: FCard('Xem lại', RvKV([['Loại điều chỉnh', rut ? 'Rút một phần yêu cầu' : 'Thay đổi, bổ sung yêu cầu'], ['Đơn ' + c.ten, h('span', { className: 'tp-num' }, c.ma)], ['Vụ án', c.va + ' · ' + c.vu], ['Nội dung đã nộp', c.yc], [rut ? 'Phần yêu cầu xin rút' : 'Nội dung sau thay đổi, bổ sung', rut ? 'Tiền lãi chậm trả' : c.yc + ' và tiền lãi chậm trả tính đến ngày xét xử sơ thẩm.'], ['Lý do', PTD_LD[rut ? 'TD-02' : 'TD-01'][1]], ['Trình bày', 'Sau khi có kết quả giám định ngày 05/11/2026, thiệt hại thực tế là 65.000.000 đồng.'], ['Tài liệu kèm theo', 'Không có']]), true),
    camDoan: rut ? 'Tôi tự nguyện rút phần yêu cầu đã nêu và hiểu rằng phần đó sẽ bị đình chỉ giải quyết.' : 'Tôi cam đoan nội dung yêu cầu thay đổi, bổ sung và tài liệu kèm theo là đúng sự thật.' });
}
function PtdOk(loai) { var c = PT_L[loai || 'PT']; return h(PtDaGui, { loai: loai, title: 'Đã gửi đơn thay đổi, bổ sung yêu cầu ' + c.ten, text: 'Tòa án sẽ chuyển nội dung yêu cầu mới cho nguyên đơn và người có quyền lợi, nghĩa vụ liên quan để lấy ý kiến, sau đó thông báo qua Hộp thư tống đạt.' }); }

/* v351 (QLD2-W12, M05: khiếu nại việc trả lại đơn phản tố / yêu cầu độc lập – 3 bước riêng, không còn thẻ "Đơn của bạn còn nội dung…" và "Người khiếu nại" */
var PKN_STEPS = ['Nội dung khiếu nại', 'Tài liệu, chứng cứ', 'Xem lại & ký gửi'];
function PknWz(loai, n, body) { return Wz({ title: 'Khiếu nại việc trả lại đơn', steps: PKN_STEPS, n: n, go: (loai === 'YC' ? 'ykn' : 'pkn') + (n + 1), body: body }); }
function Pkn1(p) {
  var c = PT_L[p.loai || 'PT'], tt = React.useState('Tòa án trả lại đơn ' + c.ten + ' khi tôi đã nộp đủ tài liệu'), db = React.useState('Ngày 25/10/2026 tôi đã nộp đủ biên nhận đặt cọc theo Thông báo 11/2026/TB-TA, nhưng ngày 31/10/2026 Tòa án vẫn trả lại đơn với lý do chưa bổ sung tài liệu.'), yc = React.useState('Đề nghị Chánh án hủy thông báo trả lại đơn ' + c.ten + ' và yêu cầu Tòa án nhận lại đơn');
  return PknWz(p.loai, 1, h(F, null, Lead('Gửi Chánh án Tòa án cấp trên trực tiếp xem xét việc trả lại [đơn bị trả lại] ([căn cứ]).'),
    h(NvCall, { tone: 'info', icon: 'clock', title: 'Hạn khiếu nại: 10/11/2026 · Còn 6 ngày' }, ''),
    FCard('Đơn bị trả lại', h(F, null, Lead('Thông tin lấy tự động từ đơn và văn bản Tòa án đã gửi, không sửa được.'),
      RvKV([['Loại đơn', c.tieu], ['Mã tiếp nhận', h('span', { className: 'tp-num' }, c.ma)], ['Vụ án', c.va + ' · ' + c.vu], ['Tòa án đã trả lại đơn', COURT1], ['Văn bản trả lại', 'số 21/2026/TB-TLĐ · tống đạt 31/10/2026'], ['Tòa án nhận đơn khiếu nại', 'Tòa án nhân dân thành phố Hà Nội'], ['Căn cứ', '[Căn cứ]']])), true),
    FCard('Nội dung khiếu nại', h(F, null, Lead('Trình bày trung thực, có mốc thời gian cụ thể — đây là căn cứ để Chánh án xem xét.'),
      n7Tf('Tóm tắt nội dung', tt, { required: true, min: 10, max: 200, rows: 2 }), n7Tf('Diễn biến, nội dung khiếu nại', db, { required: true, min: 30, max: 2000, rows: 5 }), n7Tf('Yêu cầu giải quyết khiếu nại', yc, { required: true, min: 15, max: 1000, rows: 3 })), true)));
}
function Pkn2(loai) { return PknWz(loai, 2, FCard('Tài liệu, chứng cứ kèm theo', h(F, null, Lead('Thông báo trả lại [đơn bị trả lại] của Tòa án được hệ thống tự đính kèm. Bạn chỉ cần thêm tài liệu, chứng cứ do bạn cung cấp (nếu có). PDF, JPG, PNG, DOCX · tối đa 10MB/tệp.'), h(T.FileUpload, { hint: 'PDF, JPG, PNG, DOCX · tối đa 10MB/tệp', uploadLabel: 'Tải lên tệp mới', libraryLabel: 'Chọn từ Kho dữ liệu cá nhân', files: [{ name: 'bien-lai-nop-tai-lieu-25-10.pdf', size: '410 KB' }] })), true)); }
function Pkn3(loai) {
  var c = PT_L[loai || 'PT'];
  return h(KyGuiDon, { title: 'Khiếu nại việc trả lại đơn', steps: PKN_STEPS, ok: loai === 'YC' ? 'yknOk' : 'pknOk', tep: ['Đơn khiếu nại việc trả lại đơn.pdf', 'bien-lai-nop-tai-lieu-25-10.pdf'], tepMeta: 'Bản xem trước đơn', vaiTro: c.tc, sendLabel: 'Gửi đơn',
    top: FCard('Xem lại', RvKV([['Thủ tục', '[Tên thủ tục] ([căn cứ])'], ['Đơn bị trả lại', h('span', { className: 'tp-num' }, c.ma)], ['Gửi tới', 'Tòa án nhân dân thành phố Hà Nội'], ['Tóm tắt', 'Tòa án trả lại đơn ' + c.ten + ' khi tôi đã nộp đủ tài liệu'], ['Yêu cầu giải quyết', 'Đề nghị Chánh án hủy thông báo trả lại đơn ' + c.ten + ' và yêu cầu Tòa án nhận lại đơn'], ['Tài liệu kèm theo', h(F, null, 'Thông báo trả lại [đơn bị trả lại] (hệ thống tự đính kèm)', h('br'), 'bien-lai-nop-tai-lieu-25-10.pdf')]]), true) });
}
function PknOk(loai) { var c = PT_L[loai || 'PT']; return h(OkScr, { title: 'Đã gửi đơn khiếu nại việc trả lại đơn', info: [['Mã hồ sơ', h('span', { className: 'tp-num' }, 'KN-2026-0031')], ['Mã tiếp nhận', 'Chờ Tòa án tiếp nhận'], ['Đơn bị trả lại', h('span', { className: 'tp-num' }, c.ma)], ['Gửi tới', 'Tòa án nhân dân thành phố Hà Nội']],
  btns: h(F, null, Btn('Xem đơn liên quan', 'primary', { 'data-pt-go': 'reset:records,appK_phanto,' + c.go }), Btn('Về danh sách đơn', 'secondary', { 'data-pt-go': 'reset:records,appK_phanto' })) }); }
function PknChan() {
  return h(Phone, { cls: 'ph-ok' }, h(Body, { cls: 'ph-ok-b' }, h('div', { className: 'ph-success' }, h('span', { className: 'ph-success-ico q2-chan-ico' }, h(T.Icon, { name: 'shield' })), h('h2', null, 'Không thể khiếu nại việc trả lại đơn')),
    h('div', { className: 'q2-chan', role: 'alert' }, h('p', null, 'Đơn không ở trạng thái được khiếu nại việc trả lại đơn.'))),
    h('div', { className: 'ph-col ph-ok-foot' }, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'back' })));
}

/* v351: Mobile không xem tệp trực tiếp trong màn – mọi tệp có nút "Xem" mở màn xem tệp (attachment) */
function XemTep(ten) { return h(T.Button, { variant: 'secondary', size: 'sm', icon: 'eye', className: 'ph-lib-view', 'aria-label': 'Xem ' + ten, 'data-pt-go': 'attachment', onClickCapture: function () { window.__ibFile = ten; } }); }
function tepTen(d) { return /\.(pdf|jpe?g|png|docx?)\b/i.test(d[1] || '') ? (d[1] || '').split(' · ')[0] : d[0] + '.pdf'; }
function PbsS1(loai) {
  return PbsWz2(loai, 1, h(F, null, Lead('Nộp tài liệu và sửa nội dung đơn theo yêu cầu của Tòa án.'), h(NvCall, { tone: 'warning', icon: 'clock', title: 'Hạn bổ sung hồ sơ: 08/11/2026 — Còn 4 ngày' }, ''),
    FCard('Nội dung Tòa án yêu cầu', h(F, null, Lead('Thông tin văn bản đã tống đạt. Mở văn bản để đọc nội dung Tòa án yêu cầu.'), RvKV([['Văn bản', 'số 11/2026/TB-TA'], ['Ngày tống đạt', '30/10/2026']]),
      DtDocs([['Thông báo 11/2026/TB-TA', 'Thong-bao-11-2026-TB-TA.pdf · PDF']], { the: true })), true)));
}

/* ===== v352 (13/11/2026): Quản lý đơn nhóm 3 – Kháng cáo theo web (QLD3-W01…W09), người dùng duyệt demo ===== */
/* v352 (QLD3-W02 + W04: khối đầu màn theo tình trạng (cau-hinh.ts) – nút theo ma trận, nút khóa có dòng lý do, có nút X đóng */
var KC_KHOA_BS = '[Lý do khóa: Tòa án chưa yêu cầu sửa đổi, bổ sung]';
function kcViec(st) {
  switch (st) {
    case 'sua': case 'suaLai': return { dong: 1, t: 'Tòa án yêu cầu sửa đổi, bổ sung đơn kháng cáo · hạn 08/11/2026', han: 'Đọc văn bản yêu cầu trong Hộp thư tống đạt, sau đó sửa đổi, bổ sung đơn kháng cáo.', btn: { l: 'Bổ sung', go: st === 'suaLai' ? 'appealLai' : 'kcs1' }, more: [{ l: 'Xem văn bản', go: 'mailDetail' }, { l: 'Rút đơn', go: 'kct1' }] };
    case 'quaHan': return { dong: 1, t: 'Kháng cáo quá hạn, cần giải trình · hạn 08/11/2026', han: 'Trình bày lý do trở ngại khách quan dẫn đến việc kháng cáo quá hạn để Tòa án xem xét.', btn: { l: 'Trình bày lý do và xuất trình chứng cứ về việc kháng cáo quá hạn', go: 'kqh1' } };
    case 'tamUng': return { dong: 1, t: 'Nộp tạm ứng án phí phúc thẩm · hạn 06/11/2026', han: 'Nộp tạm ứng án phí và gửi biên lai cho Tòa án trong thời hạn.', btn: { l: 'Nộp tạm ứng', go: 'financePay' } };
    case 'nhap': return { tone: 'neutral', dong: 1, t: 'Đơn đang lưu tạm', han: 'Đơn kháng cáo chưa được gửi đến Tòa án. Tiếp tục soạn để hoàn tất và gửi đơn.', btn: { l: 'Tiếp tục soạn', go: 'kc1' } };
    case 'ky': return { tone: 'neutral', dong: 1, t: 'Đơn chưa được gửi đến Tòa án', han: 'Đang chờ đủ chữ ký số. Ngày nộp đơn tính từ lúc đủ chữ ký và gửi thành công.', btn: { l: 'Ký số', go: 'kc5' } };
    default: return { tone: 'info', dong: 1, t: 'Đơn đã đến hệ thống Tòa án', han: 'Đang chờ Tòa án vào sổ nhận đơn kháng cáo.', two: [{ l: 'Bổ sung', v: 'secondary', khoa: KC_KHOA_BS }, { l: 'Rút đơn', v: 'secondary', go: 'kct1' }], note: KC_KHOA_BS };
  }
}
var KC_BADGE = { gui: [['Đã gửi đơn', 'info'], ['Đang chờ Tòa án xem xét đơn', 'neutral']], sua: [['Đang xử lý', 'info'], ['Yêu cầu làm lại / sửa đổi đơn kháng cáo', 'warning']], suaLai: [['Đang xử lý', 'info'], ['Yêu cầu làm lại / sửa đổi đơn kháng cáo', 'warning']], quaHan: [['Đang xử lý', 'info'], ['Đang xem xét lý do kháng cáo quá hạn', 'warning']], tamUng: [['Đang xử lý', 'info'], ['Chờ nộp tạm ứng án phí phúc thẩm', 'warning']], nhap: [['Chưa gửi', 'neutral']], ky: [['Chờ ký số', 'warning']] };
/* v352 (QLD3-W05: tiến trình 3 bước */
function KcTienTrinh(st) { return h(T.CaseProgress, { label: 'Tiến trình', steps: ['Đã gửi đơn', 'Đang xử lý đơn', 'Đã xử lý đơn'], current: st === 'nhap' || st === 'ky' ? 0 : 1 }); }
/* v352 (QLD3-W07: văn bản tống đạt – văn bản gửi đương sự khác ghi "Không có trong Hộp thư của bạn" */
function kcVanBan() {
  return FCard('Văn bản tống đạt', h(F, null, P('Văn bản Tòa án gửi về đơn này', 'ph-muted dt-small'), VbCards([{ t: 'Thông báo yêu cầu sửa đổi, bổ sung đơn kháng cáo', so: '30/2026/TB-TA', tg: '28/10/2026', moi: true }]),
    h('ul', { className: 'vb1' }, h('li', { className: 'ib-c q3-khac' }, h('div', { className: 'ib-c-h' }, h('span', { className: 'vk-tag' + ibTag('THONG_BAO') }, IB_NHAN_TEN.THONG_BAO), h('span', { className: 'vk-code tp-num' }, '31/2026/TB-TA')),
      h('b', null, 'Thông báo về việc kháng cáo'), h('small', null, 'Văn bản tống đạt · 29/10/2026'), h('span', { className: 'q3-khac-t' }, 'Không có trong Hộp thư của bạn')))), true);
}
/* v352 (QLD3-W08: Đơn phát sinh – đơn đã gửi bấm xem đơn; nháp Tiếp tục soạn mở đúng trình tự */
function kcPhatSinh() {
  return FCard('Đơn phát sinh', h(F, null, P('Đơn kháng cáo ban đầu và các đơn sửa đổi, bổ sung, thay đổi/rút yêu cầu, trình bày lý do quá hạn.', 'ph-muted dt-small'), h('ul', { className: 'qd-list dt-qc' }, [
    { loai: 'Đơn ban đầu', t: 'Kháng cáo bản án sơ thẩm số 25/2026/DS-ST', tt: ['Đã gửi', 'info'], ma: 'TN-20261025-0015', ngay: ['Ngày gửi', '25/10/2026 · 10:20'], file: 'Don-khang-cao-TN-20261025-0015.pdf' },
    { loai: 'Đơn sửa đổi, bổ sung', t: 'Sửa đổi, bổ sung đơn kháng cáo', tt: ['Lưu nháp', 'neutral'], ma: null, ngay: ['Lưu nháp', '29/10/2026 · 15:40'], go: 'kcs1' },
    { loai: 'Trình bày lý do quá hạn', t: 'Trình bày lý do kháng cáo quá hạn', tt: ['Lưu nháp', 'neutral'], ma: null, ngay: ['Lưu nháp', '30/10/2026 · 08:05'], go: 'kqh1' }].map(DtDonThe))), true);
}

/* v352 (QLD3-W01: Thay đổi, rút kháng cáo – 3 bước (khang-cao-thay-doi-rut) */
var KCT_STEPS = ['Đơn kháng cáo & việc cần làm', 'Nội dung', 'Xem lại & ký gửi'];
var KCT_LOAI = [{ id: 'td', t: 'Thay đổi, bổ sung kháng cáo', d: 'Sửa phạm vi, lý do hoặc đề nghị của kháng cáo.' }, { id: 'rmp', t: 'Rút một phần kháng cáo', d: 'Tòa án cấp phúc thẩm không xem xét phần bạn đã rút.' }, { id: 'rtb', t: 'Rút toàn bộ kháng cáo', d: 'Tòa án đình chỉ xét xử phúc thẩm; phần bản án bạn kháng cáo có hiệu lực pháp luật.' }];
function kctLoai(id) { return KCT_LOAI.filter(function (x) { return x.id === id; })[0]; }
function Kct1() {
  var v = React.useState('td');
  return Wz({ title: 'Thay đổi, rút kháng cáo', steps: KCT_STEPS, n: 1, save: false, go: 'kct2', body: h(F, null,
    FCard('Đơn kháng cáo của bạn', RvKV([['Mã đơn', h('span', { className: 'tp-num' }, 'TN-20261025-0015')], ['Văn bản bị kháng cáo', 'Bản án số 25/2026/DS-ST ngày 21/10/2026'], ['Phạm vi hiện tại', 'Một phần bản án'], ['Giai đoạn', '[Giai đoạn]'], ['Tòa án nhận đơn kháng cáo', COURT1]]), true),
    FCard('Bạn muốn làm gì với kháng cáo?', h(OptCards, { label: 'Việc thực hiện', cur: v[0], onPick: v[1], items: KCT_LOAI }), true)) });
}
function Kct2(p) {
  var rtb = p.loai === 'rtb', rmp = p.loai === 'rmp', nd = React.useState(rmp ? 'Rút phần kháng cáo về án phí sơ thẩm (Mục 2 phần Quyết định).' : 'Bổ sung đề nghị Tòa án cấp phúc thẩm xem xét chứng cứ chuyển khoản ngày 05/01/2026.'), ld = React.useState('');
  return Wz({ title: 'Thay đổi, rút kháng cáo', steps: KCT_STEPS, n: 2, save: false, go: 'kct3' + (p.loai && p.loai !== 'td' ? p.loai : ''), body: h(F, null,
    rtb ? null : FCard(rmp ? 'Phần kháng cáo muốn rút' : 'Nội dung thay đổi, bổ sung', n7Tf(rmp ? 'Phần kháng cáo muốn rút' : 'Nội dung thay đổi, bổ sung', nd, { required: true, rows: 5, max: 2000, placeholder: rmp ? 'Mô tả cụ thể phần nào trong kháng cáo bạn muốn rút...' : 'Mô tả cụ thể phần nào trong kháng cáo bạn muốn thay đổi hoặc bổ sung thêm...' }), true),
    FCard('Lý do (không bắt buộc)', n7Tf('Lý do', ld, { rows: 4, max: 2000, placeholder: rtb ? 'Ví dụ: Các bên đã tự thỏa thuận được; bị đơn đã thi hành án tự nguyện...' : 'Trình bày lý do thay đổi hoặc rút kháng cáo nếu muốn...' }), true),
    rtb ? null : HopGhi('Giới hạn khi đã hết thời hạn kháng cáo', 'Nếu thời hạn kháng cáo đã hết, việc thay đổi, bổ sung không được vượt quá phạm vi kháng cáo ban đầu. Tòa án xác định việc này.')) });
}
function Kct3(loai) {
  var l = kctLoai(loai || 'td'), rut = loai === 'rmp' || loai === 'rtb';
  return h(KyGuiDon, { title: 'Thay đổi, rút kháng cáo', steps: KCT_STEPS, save: false, ok: 'kctOk' + (loai && loai !== 'td' ? loai : ''), tep: ['Đơn ' + l.t.charAt(0).toLowerCase() + l.t.slice(1) + '.pdf'], tepMeta: 'Xem trước đơn', vaiTro: 'Người kháng cáo', sendLabel: 'Gửi đơn',
    top: FCard('Xác nhận thông tin', RvKV([['Đơn kháng cáo', h(F, null, 'Kháng cáo bản án sơ thẩm số 25/2026/DS-ST · ', h('span', { className: 'tp-num' }, 'TN-20261025-0015'))], ['Tòa án nhận đơn', COURT1], ['Việc thực hiện', l.t]].concat(loai === 'rtb' ? [] : [[loai === 'rmp' ? 'Phần kháng cáo muốn rút' : 'Nội dung', loai === 'rmp' ? 'Rút phần kháng cáo về án phí sơ thẩm (Mục 2 phần Quyết định).' : 'Bổ sung đề nghị Tòa án cấp phúc thẩm xem xét chứng cứ chuyển khoản ngày 05/01/2026.']], [['Lý do', 'Không có']])), true),
    camDoan: rut ? 'Tôi tự nguyện rút kháng cáo và hiểu rõ hệ quả pháp lý, chịu mọi trách nhiệm trước pháp luật.' : 'Tôi cam đoan nội dung thay đổi, bổ sung là đúng sự thật, chịu mọi trách nhiệm trước pháp luật.' });
}
function KctOk(loai) {
  var T1 = { td: ['Đã gửi đơn thay đổi, bổ sung kháng cáo', 'Tòa án sẽ xem xét nội dung thay đổi và thông báo kết quả vào Hộp thư tống đạt.'], rmp: ['Đã gửi đơn rút một phần kháng cáo', 'Phần kháng cáo đã rút sẽ không được Tòa án cấp phúc thẩm xem xét nữa.'], rtb: ['Đã gửi đơn rút toàn bộ kháng cáo', 'Tòa án sẽ ra quyết định đình chỉ xét xử phúc thẩm và thông báo cho các đương sự.'] }[loai || 'td'];
  return h(OkScr, { title: T1[0], text: T1[1], info: [['Trạng thái', h(T.StatusBadge, { tone: 'info', icon: false }, 'Đã gửi đơn')]],
    btns: h(F, null, Btn('Xem đơn liên quan', 'primary', { 'data-pt-go': 'reset:records,appK_khangcao,appealDetail' }), Btn('Về danh sách đơn', 'secondary', { 'data-pt-go': 'reset:records,appK_khangcao' })) });
}

/* ===== v353 (13/11/2026): Quản lý đơn nhóm 4 – Giám đốc thẩm, tái thẩm theo web (QLD4-W01…W15, bỏ M02), người dùng duyệt demo ===== */
/* v353 (QLD4-W01, W06, W07: khối đầu màn theo tình trạng + nút theo ma trận (nút khóa có dòng lý do) */
function gdtViec(st, ten) {
  switch (st) {
    case 'sua': case 'suaLai': return { t: 'Tòa án yêu cầu sửa đổi, bổ sung đơn đề nghị · hạn 29/11/2026', han: 'Đọc văn bản yêu cầu trong Hộp thư tống đạt, sau đó sửa đổi, bổ sung đơn đề nghị.', btn: { l: 'Bổ sung', go: st === 'suaLai' ? 'gdtLai' : 'gsgdt1' }, more: [{ l: 'Rút đơn', go: 'grgdt1sua' }] };
    case 'suaHet': return { tone: 'danger', t: 'Tòa án yêu cầu sửa đổi, bổ sung đơn đề nghị · hạn 25/10/2026', han: 'Đọc văn bản yêu cầu trong Hộp thư tống đạt, sau đó sửa đổi, bổ sung đơn đề nghị.', two: [{ l: 'Bổ sung', khoa: '[Lý do khóa: đã quá hạn sửa đổi, bổ sung]' }, { l: 'Rút đơn', v: 'secondary', go: 'grgdt1sua' }], note: '[Lý do khóa: đã quá hạn sửa đổi, bổ sung]' };
    case 'nhap': return { tone: 'neutral', t: 'Đơn đang lưu tạm', han: 'Đơn đề nghị chưa được gửi đến Tòa án. Tiếp tục soạn để hoàn tất và gửi đơn.', btn: { l: 'Tiếp tục soạn', go: ten === 'tái thẩm' ? 'tx1' : 'gx1' } };
    case 'taiChinh': return { tone: 'neutral', t: '[Tình trạng giải quyết của đơn]', two: [{ l: 'Nộp tiền', go: 'financePay' }, { l: 'Đề nghị miễn, giảm án phí', v: 'secondary', go: 'mg1' }] };
    default: return { tone: 'info', t: 'Đơn đã đến hệ thống Tòa án', han: 'Đang chờ Tòa án vào sổ nhận đơn đề nghị.', btn: { l: 'Rút đơn', v: 'secondary', go: 'grgdt1' } };
  }
}
var GDT_BADGE = { gui: [['Đã gửi đơn', 'info']], sua: [['Đang xử lý', 'info'], ['Yêu cầu sửa đổi, bổ sung đơn đề nghị', 'warning']], suaLai: [['Đang xử lý', 'info'], ['Yêu cầu sửa đổi, bổ sung đơn đề nghị', 'warning']], suaHet: [['Đang xử lý', 'info'], ['Yêu cầu sửa đổi, bổ sung đơn đề nghị', 'warning']], nhap: [['Chưa gửi', 'neutral']], taiChinh: [['Đang xử lý', 'info'], ['[Tình trạng giải quyết]', 'warning']] };
/* v353 (QLD4-W04: văn bản tống đạt – nút Xem ngay tại dòng; văn bản của người khác ghi "Không có trong Hộp thư của bạn" */
function gdtVanBan() {
  return FCard('Văn bản tống đạt', h(F, null, P('Văn bản Tòa án gửi về đơn này', 'ph-muted dt-small'),
    DtDocs([['Thông báo yêu cầu sửa đổi, bổ sung đơn đề nghị', 'Văn bản tống đạt · 30/10/2026', null]], { the: true }),
    h('ul', { className: 'ph-ky dt-docs dt-docs-the' }, h('li', null, h('div', null, h('b', null, 'Thông báo thụ lý đơn đề nghị'), h('small', null, 'Văn bản tống đạt · 31/10/2026')), h('span', { className: 'q3-khac-t' }, 'Không có trong Hộp thư của bạn')))), true);
}
/* v353 (QLD4-W08: Danh sách đơn – nháp Tiếp tục soạn mở đúng trình tự theo loại nháp */
function gdtPhatSinh(ten) {
  return FCard('Danh sách đơn', h(F, null, P('Đơn ban đầu và các đơn sửa đổi, bổ sung, rút đơn đề nghị.', 'ph-muted dt-small'), h('ul', { className: 'qd-list dt-qc' }, [
    { loai: 'Đơn ban đầu', t: 'Đề nghị ' + ten + ' – 18/2026/DS-PT', tt: ['Đã gửi', 'info'], ma: 'TN-20261029-0020', ngay: ['Ngày gửi', '29/10/2026 · 09:00'], file: 'Don-de-nghi-TN-20261029-0020.pdf' },
    { loai: 'Đơn sửa đổi, bổ sung', t: 'Sửa đổi, bổ sung đơn đề nghị', tt: ['Lưu nháp', 'neutral'], ma: null, ngay: ['Lưu nháp', '02/11/2026 · 14:10'], go: 'gsgdt1' },
    { loai: 'Đơn rút', t: 'Yêu cầu rút đơn đề nghị ' + ten, tt: ['Lưu nháp', 'neutral'], ma: null, ngay: ['Lưu nháp', '03/11/2026 · 08:40'], go: 'grgdt1nhap' }].map(DtDonThe))), true);
}
/* v353 (QLD4-W10: rút đơn – ô cam đoan bắt buộc; W14: chặn khi đã có kết quả; W15: nạp lại bản nháp */
function GrChan() {
  return h(Phone, { cls: 'ph-ok' }, h(Body, { cls: 'ph-ok-b' }, h('div', { className: 'ph-success' }, h('span', { className: 'ph-success-ico q2-chan-ico' }, h(T.Icon, { name: 'alert' })), h('h2', null, 'Rút đơn')),
    h('div', { className: 'q2-chan', role: 'alert' }, h('p', null, 'Chỉ rút được đơn đề nghị chưa có kết quả giải quyết.'))),
    h('div', { className: 'ph-col ph-ok-foot' }, Btn('Về chi tiết đơn', 'primary', { icon: 'chevronLeft', 'data-pt-go': 'back' })));
}
/* v353 (QLD4-W12 + M02: bước 1 sửa đổi – banner hạn (Còn N ngày / ≤3 ngày tô đỏ / Quá hạn N ngày / Vô thời hạn); bỏ thẻ "Thông báo của Tòa án" (Tòa án tiếp nhận, Hạn xử lý) */
/* v353 (QLD4-W13: mỗi tệp bắt buộc có tên và loại tài liệu */
/* v353 (QLD4-W11: sửa đổi – ô cam đoan bắt buộc */

/* ===== v354 (13/11/2026): Quản lý đơn nhóm 1 theo chuẩn Soạn đơn (người dùng duyệt): trình tự Bổ sung, sửa đổi hồ sơ giữ tiêu đề tên chức năng, dòng thẻ loại đơn + mã ở đầu bước, bước Tài liệu kiểu bước 5, bước Xem lại có khối con + nút sửa, Ký số kiểu bước 7, màn đã gửi kiểu "Đã gửi đơn thành công"; hộp thoại có hình (W01, W05); khối Tòa án yêu cầu bổ sung tài liệu kiểu bước 5 (W02) ===== */
/* hộp thoại kiểu Soạn đơn */
function SdDlg(p) {
  var hs = React.useState(null); React.useEffect(function () { hs[1](document.querySelector('.pt-phone .ph')); }, []);
  return hs[0] ? ReactDOM.createPortal(h('div', { className: 'tp-dlg-wrap tp-dlg-inline dm-cf' }, h('div', { className: 'ph-scrim' }),
    h('div', { className: 'dm-cf-box', role: 'alertdialog', 'aria-modal': 'true' }, IlloBadge(p.illo || ['nopDon', 'alert']),
      h('p', { className: 'dm-cf-t' }, p.title), p.desc ? h('p', { className: 'dm-cf-d' }, p.desc) : null, p.body || null,
      h('div', { className: 'dm-cf-btns' }, h(T.Button, { variant: 'tonal', 'data-pt-go': 'back' }, p.huy || 'Hủy'), h(T.Button, { 'data-pt-go': 'replace:' + p.go }, p.ok)))), hs[0]) : null;
}

/* ===== v355: nhóm 2–6 Quản lý đơn theo chuẩn Soạn đơn (Nộp đơn khởi kiện); nhóm 5 bổ sung W01–W17; nhóm 6 trình tự 4 bước W01–W08, bỏ M03, M04 ===== */
/* ===== Khung chuẩn Soạn đơn dùng chung cho các luồng soạn đơn (nhóm 2–6 Quản lý đơn) ===== */
/* đầu mỗi bước: thẻ loại đơn + mã, tên đơn (tiêu đề AppBar giữ tên chức năng) */
function WzSd(o) { return Wz(Object.assign({}, o)); } /* bỏ thẻ loại đơn + mã, tên đơn ở đầu bước (13/11) */
function sdTagPT(loai) { var c = PT_L[loai || 'PT']; return [c.tieu, c.ma + ' · ' + c.vu]; }
var SD_KC = ['Đơn kháng cáo', 'TN-20261025-0015 · Kháng cáo bản án sơ thẩm số 25/2026/DS-ST'];
var SD_KCQ = ['Đơn kháng cáo', 'TN-20261020-0013 · Kháng cáo bản án sơ thẩm số 15/2026/KDTM-ST'];
var SD_KCS = ['Đơn kháng cáo', 'TN-20261023-0014 · Kháng cáo bản án sơ thẩm số 21/2026/DS-ST'];
function sdTagGdt(k) { return [k === 'tt' ? 'Đơn tái thẩm' : 'Đơn giám đốc thẩm', 'TN-20261029-0020 · Bản án số 18/2026/DS-PT']; }
var SD_KK = ['Đơn khởi kiện', 'TN-20261020-0012 · Tranh chấp hợp đồng vay tài sản'];
var SD_KK2 = ['Đơn khởi kiện', 'TN-20261012-0007 · Tranh chấp hợp đồng cung ứng dịch vụ'];
var SD_KK3 = ['Đơn khởi kiện', 'TN-20261005-0003 · Tranh chấp quyền sử dụng đất'];
var SD_HG = ['Hòa giải thành', 'HG-2026-0009 · Tranh chấp hợp đồng mua bán'];
/* khối con xem lại kiểu bước 6 Soạn đơn: mũi tên gập/mở + tiêu đề + nút sửa về đúng bước (go có thể trống) */
function SdBlk(p) {
  var op = React.useState(true);
  return h('section', { className: 'ph-rv2' + (op[0] ? ' ph-rv2-open' : '') },
    h('div', { className: 'ph-rv2-h' }, h('button', { type: 'button', className: 'ph-rv2-tg', 'aria-expanded': op[0], onClick: function () { op[1](!op[0]); } }, h(T.Icon, { name: 'chevronRight', className: 'ph-rv2-chev' }), h('span', null, p.t)),
      p.go ? IcoBtn('pen', 'Chỉnh sửa ' + p.t, 'replace:' + p.go) : null),
    op[0] ? h('div', { className: 'ph-rv2-b' }, p.children) : null);
}
/* bước cuối kiểu Soạn đơn: khối "Xem lại" gồm các khối con (lấy từ o.top: mỗi FCard → 1 khối con có nút sửa về o.sua), khối Ký số (đơn + người ký) như bước 7, khối Tài liệu đính kèm riêng, ghi chú, cam đoan */
function KyGuiSd(o) {
  var ky = React.useState(false), sh = React.useState(false), cd = React.useState(!o.camDoan), anchor = React.useRef(null), host = useHost(anchor), da = ky[0];
  var blocks = [], notes = [];
  (function walk(el) { if (!el) return; if (Array.isArray(el)) return el.forEach(walk); if (el.type === F) return walk(el.props.children);
    if (el.props && el.props.title !== undefined && el.type === T.FormSection) blocks.push(el); else notes.push(el); })(o.top);
  var don = o.tep[0], tl = o.tep.slice(1);
  return WzSd({ title: o.title, steps: o.steps, n: o.steps.length, save: o.save, tag: o.tag, body: h(F, null, h('span', { ref: anchor, hidden: true }),
    blocks.length ? FCard(o.rvTitle || 'Xem lại', h(F, null, P(o.lead || 'Kiểm tra lại toàn bộ thông tin trước khi ký số và gửi.', 'ph-muted'),
      blocks.map(function (b, i) { return h(SdBlk, { key: i, t: b.props.title, go: b.props.sdGo || o.sua }, b.props.children); })), true) : null,
    notes.length ? h(F, null, notes) : null,
    FCard(o.kyTitle || 'Ký số', h(F, null, P(o.kyMoTa || 'Ký số bản đơn và toàn bộ tài liệu đính kèm trước khi gửi.', 'ph-muted'),
      h('ul', { className: 'ph-ky' }, h('li', null, h('div', null, h('b', null, don.replace(/\.pdf$/, '')), o.tepMeta ? h('small', null, o.tepMeta) : null), IcoBtn('eye', 'Xem ' + don)),
        laTC() ? h(KyTcRows, { tep: o.tep, onXong: function () { ky[1](true); } }) : h('li', null, h('span', { className: 'ph-ky-no' }, '1'), h('div', null, h('b', null, 'Hoàng Dương'), h('small', null, o.vaiTro || 'Người nộp đơn'), da ? h('small', { className: 'ph-ky-da' }, KY_LUC) : null),
          da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn', onClick: function () { sh[1](true); } }, 'Ký số')))), true, da ? 'signed' : 'unsigned'),
    tl.length ? FCard('Tài liệu đính kèm (' + tl.length + ' tệp)', h('ul', { className: 'ph-ky' }, tl.map(function (f) { return h('li', { key: f }, h('div', null, h('b', null, f)), da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : null, IcoBtn('eye', 'Xem ' + f)); })), true) : null,
    o.bottom || null,
    o.camDoan ? h('div', { className: 'ph-commit' }, h(T.Checkbox, { label: o.camDoan, checked: cd[0], onChange: function (e) { cd[1](e.target.checked); } })) : null,
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: o.tep, onClose: function () { sh[1](false); }, onKy: function () { sh[1](false); ky[1](true); } }), host) : null),
    last: Btn(o.sendLabel || 'Gửi đơn', 'primary', (da || o.kyTuyChon) && cd[0] ? { 'data-pt-go': 'replace:' + o.ok } : { disabled: true, title: 'Vui lòng ký số trước khi gửi' }) });
}
/* màn đã gửi kiểu "Đã gửi đơn thành công": bảng viền, giá trị đầu đỏ đậm, dòng Trạng thái "Đã gửi" */
function OkSd(o) {
  var rows = (o.info || []).map(function (r, i) { return [r[0], i === 0 ? h('span', { className: 'ph-ok-ma' }, r[1]) : r[0] === 'Trạng thái' && typeof r[1] === 'string' ? h(T.StatusBadge, { tone: 'info', icon: false }, r[1]) : r[1]]; });
  if (!rows.some(function (r) { return r[0] === 'Trạng thái'; })) rows.push(['Trạng thái', h(T.StatusBadge, { tone: 'info', icon: false }, o.tt || 'Đã gửi')]);
  return h(Phone, { cls: 'ph-ok' }, h(Body, { cls: 'ph-ok-b' },
    h('div', { className: 'ph-success' }, h('span', { className: 'ph-success-ico' }, h(T.Icon, { name: 'checkCircle' })), h('h2', null, o.title), o.text ? P(o.text, 'ph-muted') : null),
    h('dl', { className: 'ph-rvkv ph-ok-rows' }, rows.map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0]), h('dd', null, r[1])); }))),
    h('div', { className: 'ph-col ph-ok-foot' }, o.btns));
}
/* hộp thoại xác nhận dùng ở chi tiết đơn → kiểu hộp có hình minh họa như Soạn đơn */
function DlgOver(p) { return h(SdDlg, { illo: ['nopDon', 'alert'], title: p.title, desc: p.desc, ok: p.ok, huy: p.huy, go: p.go, body: p.body }); }
/* bước Tài liệu kiểu bước 5 Soạn đơn: f = [[tên, tệp, loại]]; loi = câu lỗi (thiếu tài liệu / thiếu tên, loại) */
function TlSd(p) {
  return h('div', { className: 'q5s' }, h(TaiLieuCard, { title: p.title || 'Tài liệu kèm theo', desc: p.desc || 'Định dạng PDF, JPG, PNG, DOCX · tối đa 10MB/tệp.', he: p.he, bat: [], bb0: {},
    bs0: (p.f || []).map(function (x, i) { return { k: i + 1, tep: x[1], ten: x[0], loai: x[2] }; }) }),
    (p.loi || []).length ? h('div', { className: 'q5s-loi' }, p.loi.map(function (t) { return h('p', { key: t, className: 'q2-err', role: 'alert' }, h(T.Icon, { name: 'alert' }), t); })) : null);
}

var KY_KHOA_MG = 'Đơn và tài liệu đã được ký số nên không thể chỉnh sửa nữa. Bạn chỉ có thể xem lại và nộp đơn ở bước cuối.';
var KY_KHOA_BP = h(F, null, h('strong', null, 'Đơn đã có chữ ký số.'), ' Nội dung đơn và tài liệu đính kèm đã được chốt, bạn chỉ có thể xem lại. Quay về bước cuối để ký tiếp và gửi đơn.');
var KY_KHOA_TR = 'Đơn đã được ký số nên các bước trước chỉ để xem, không thể chỉnh sửa. Nếu cần sửa nội dung, hãy tạo lại đơn mới.';
function PbsWz2(loai, n, body) { return WzSd({ tag: sdTagPT(loai),  title: 'Bổ sung hồ sơ', steps: PBS_STEPS, n: n, go: (loai === 'YC' ? 'ybs' : 'pbs') + (n + 1), body: body }); }

function PbsS4(loai) {
  var c = PT_L[loai || 'PT'];
  return h(KyGuiSd, { tag: sdTagPT(loai), sua: (loai === 'YC' ? 'ybs' : 'pbs') + '3',  title: 'Bổ sung hồ sơ', steps: PBS_STEPS, ok: loai === 'YC' ? 'ybsOk' : 'pbsOk', tep: ['Hồ sơ bổ sung đơn ' + c.ten + '.pdf', 'bien-nhan-dat-coc.pdf'], tepMeta: 'Bản in hồ sơ bổ sung', vaiTro: c.tc, sendLabel: 'Ký và gửi',
    top: h(F, null, h(T.FormSection, { title: PBS_STEPS[0], sdGo: (loai === 'YC' ? 'ybs' : 'pbs') + '1' }, RvKV([['Đơn ' + c.ten, h('span', { className: 'tp-num' }, c.ma)], ['Văn bản yêu cầu', '11/2026/TB-TA'], ['Hạn', '08/11/2026']])), h(T.FormSection, { title: PBS_STEPS[1], sdGo: (loai === 'YC' ? 'ybs' : 'pbs') + '2' }, RvKV([['Tài liệu đã bổ sung', 'bien-nhan-dat-coc.pdf']])), h(T.FormSection, { title: PBS_STEPS[2], sdGo: (loai === 'YC' ? 'ybs' : 'pbs') + '3' }, RvKV([['Trường đã sửa', 'Nội dung yêu cầu']]))),
    bottom: HopGhi('Sau khi gửi', 'Hồ sơ bổ sung là đơn phát sinh, chỉ có trạng thái Đã gửi. Đơn ' + c.ma + ' vẫn ở "Đang xử lý đơn" cho đến khi Tòa án có kết quả.'),
    camDoan: 'Tôi cam đoan nội dung sửa đổi, bổ sung và tài liệu kèm theo là đúng sự thật.' });
}

function Prd1(loai, va) {
  var c = PT_L[loai || 'PT'];
  return WzSd({ tag: sdTagPT(loai),  title: prdTen(c, va), steps: PRD_STEPS, n: 1, go: prdId(loai, va) + '2', body: h(F, null, Lead('Bạn đề nghị Tòa án cho rút. Việc rút chỉ có hiệu lực khi Tòa án chấp nhận.'),
    FCard('Đơn bạn đề nghị rút', h(F, null, Lead('Kiểm tra đúng đơn trước khi tiếp tục. Thông tin lấy tự động, không sửa được.'),
      RvKV([['Mã tiếp nhận', h('span', { className: 'tp-num' }, c.ma)], ['Loại đơn', c.tieu], ['Ngày gửi', '28/10/2026 09:15'], ['Tòa án tiếp nhận', COURT1], ['Trạng thái hiện tại', va ? 'Đang xử lý · Đã đưa vào vụ án' : 'Đã gửi đơn'], ['Vụ án liên quan', c.va + ' · ' + c.vu]])), true)) });
}

function Prd2(p) {
  var c = PT_L[p.loai || 'PT'], ld = React.useState(p.err ? '' : 'r0'), tb = React.useState(p.err ? 'Đã xong' : 'Hai bên đã thỏa thuận xong ngày 01/11/2026, bị đơn đã trả đủ tiền.');
  return WzSd({ tag: sdTagPT(p.loai),  title: prdTen(c, p.va), steps: PRD_STEPS, n: 2, go: prdId(p.loai, p.va) + '3', body: h(F, null,
    FCard('Lý do rút', h(F, null, h(ChonThe, { label: 'Lý do rút', v: ld[0], onPick: ld[1], items: PT_RUT.map(function (x, i) { return { id: 'r' + i, t: x }; }) }), p.err && !ld[0] ? h('p', { className: 'q2-err', role: 'alert' }, h(T.Icon, { name: 'alert' }), 'Vui lòng chọn lý do rút.') : null), true),
    FCard('Trình bày', h(F, null, n7Tf('Trình bày', tb, { required: true, min: 10, max: 2000, placeholder: 'Hai bên đã thỏa thuận xong ngày …', error: p.err ? 'Trình bày lý do rút (tối thiểu 10 ký tự).' : undefined })), true)) });
}

function Prd3(loai, va) {
  var c = PT_L[loai || 'PT'], ten = va ? 'yêu cầu' : 'đơn';
  return h(KyGuiSd, { tag: sdTagPT(loai), sua: prdId(loai, va) + '2',  title: prdTen(c, va), steps: PRD_STEPS, ok: prdId(loai, va) + 'Ok', tep: [prdTen(c, va) + '.pdf'], tepMeta: 'Bản in đơn rút', vaiTro: c.tc, sendLabel: 'Gửi đơn',
    top: h(F, null, h(T.FormSection, { title: PRD_STEPS[0], sdGo: prdId(loai, va) + '1' }, RvKV([['Loại', va ? 'Rút toàn bộ yêu cầu' : 'Rút đơn'], ['Đơn ' + c.ten, h('span', { className: 'tp-num' }, c.ma)]])), h(T.FormSection, { title: PRD_STEPS[1], sdGo: prdId(loai, va) + '2' }, RvKV([['Lý do', PT_RUT[0]], ['Trình bày', 'Hai bên đã thỏa thuận xong ngày 01/11/2026, bị đơn đã trả đủ tiền.']]))),
    camDoan: 'Tôi hiểu hệ quả của việc rút ' + ten + ' ' + c.ten + ' và tự nguyện đề nghị Tòa án cho rút.' });
}

function PtdWz(p, n, body, rut) { var c = PT_L[p.loai || 'PT'], id = p.loai === 'YC' ? 'ytd' : 'ptd'; return WzSd({ tag: sdTagPT(p.loai),  title: ptdTen(c, n === 1 ? undefined : !!rut), steps: ptdSteps(rut), n: n, go: id + (rut ? 'R' : '') + (n + 1), body: body }); }

function Ptd5(p) {
  var c = PT_L[p.loai || 'PT'], rut = !!p.rut, id = p.loai === 'YC' ? 'ytd' : 'ptd';
  return h(KyGuiSd, { tag: sdTagPT(p.loai), sua: id + (rut ? 'R' : '') + '2',  title: ptdTen(c, rut), steps: ptdSteps(rut), ok: id + 'Ok', tep: [ptdTen(c, rut) + '.pdf'], tepMeta: 'Bản in đơn', vaiTro: c.tc, sendLabel: 'Gửi đơn',
    top: h(F, null, h(T.FormSection, { title: ptdSteps(rut)[0], sdGo: id + '1' }, RvKV([['Loại điều chỉnh', rut ? 'Rút một phần yêu cầu' : 'Thay đổi, bổ sung yêu cầu']])), h(T.FormSection, { title: ptdSteps(rut)[1], sdGo: id + (rut ? 'R' : '') + '2' }, RvKV([['Đơn ' + c.ten, h('span', { className: 'tp-num' }, c.ma)], ['Vụ án', c.va + ' · ' + c.vu], ['Nội dung đã nộp', c.yc], [rut ? 'Phần yêu cầu xin rút' : 'Nội dung sau thay đổi, bổ sung', rut ? 'Tiền lãi chậm trả' : c.yc + ' và tiền lãi chậm trả tính đến ngày xét xử sơ thẩm.']])), h(T.FormSection, { title: ptdSteps(rut)[2], sdGo: id + '3' }, RvKV([['Lý do', PTD_LD[rut ? 'TD-02' : 'TD-01'][1]], ['Trình bày', 'Sau khi có kết quả giám định ngày 05/11/2026, thiệt hại thực tế là 65.000.000 đồng.']])), h(T.FormSection, { title: ptdSteps(rut)[3], sdGo: id + '4' }, RvKV([['Tài liệu kèm theo', 'Không có']]))),
    camDoan: rut ? 'Tôi tự nguyện rút phần yêu cầu đã nêu và hiểu rằng phần đó sẽ bị đình chỉ giải quyết.' : 'Tôi cam đoan nội dung yêu cầu thay đổi, bổ sung và tài liệu kèm theo là đúng sự thật.' });
}

function PknWz(loai, n, body) { return WzSd({ tag: sdTagPT(loai),  title: 'Khiếu nại việc trả lại đơn', steps: PKN_STEPS, n: n, go: (loai === 'YC' ? 'ykn' : 'pkn') + (n + 1), body: body }); }

function Pkn3(loai) {
  var c = PT_L[loai || 'PT'];
  return h(KyGuiSd, { tag: sdTagPT(loai), sua: (loai === 'YC' ? 'ykn' : 'pkn') + '1',  title: 'Khiếu nại việc trả lại đơn', steps: PKN_STEPS, ok: loai === 'YC' ? 'yknOk' : 'pknOk', tep: ['Đơn khiếu nại việc trả lại đơn.pdf', 'bien-lai-nop-tai-lieu-25-10.pdf'], tepMeta: 'Bản xem trước đơn', vaiTro: c.tc, sendLabel: 'Gửi đơn',
    top: h(F, null, h(T.FormSection, { title: PKN_STEPS[0], sdGo: (loai === 'YC' ? 'ykn' : 'pkn') + '1' }, RvKV([['Thủ tục', '[Tên thủ tục] ([căn cứ])'], ['Đơn bị trả lại', h('span', { className: 'tp-num' }, c.ma)], ['Gửi tới', 'Tòa án nhân dân thành phố Hà Nội'], ['Tóm tắt', 'Tòa án trả lại đơn ' + c.ten + ' khi tôi đã nộp đủ tài liệu'], ['Yêu cầu giải quyết', 'Đề nghị Chánh án hủy thông báo trả lại đơn ' + c.ten + ' và yêu cầu Tòa án nhận lại đơn']])), h(T.FormSection, { title: PKN_STEPS[1], sdGo: (loai === 'YC' ? 'ykn' : 'pkn') + '2' }, RvKV([['Tài liệu kèm theo', h(F, null, 'Thông báo trả lại [đơn bị trả lại] (hệ thống tự đính kèm)', h('br'), 'bien-lai-nop-tai-lieu-25-10.pdf')]]))) });
}

function PknOk(loai) { var c = PT_L[loai || 'PT']; return h(OkSd, { title: 'Đã gửi đơn khiếu nại việc trả lại đơn', info: [['Mã hồ sơ', h('span', { className: 'tp-num' }, 'KN-2026-0031')], ['Mã tiếp nhận', 'Chờ Tòa án tiếp nhận'], ['Đơn bị trả lại', h('span', { className: 'tp-num' }, c.ma)], ['Gửi tới', 'Tòa án nhân dân thành phố Hà Nội']],
  btns: h(F, null, Btn('Xem đơn liên quan', 'primary', { 'data-pt-go': 'reset:records,appK_phanto,' + c.go }), Btn('Về danh sách đơn', 'secondary', { 'data-pt-go': 'reset:records,appK_phanto' })) }); }
function PknChan() {
  return h(Phone, { cls: 'ph-ok' }, h(Body, { cls: 'ph-ok-b' }, h('div', { className: 'ph-success' }, h('span', { className: 'ph-success-ico q2-chan-ico' }, h(T.Icon, { name: 'shield' })), h('h2', null, 'Không thể khiếu nại việc trả lại đơn')),
    h('div', { className: 'q2-chan', role: 'alert' }, h('p', null, 'Đơn không ở trạng thái được khiếu nại việc trả lại đơn.'))),
    h('div', { className: 'ph-col ph-ok-foot' }, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'back' })));
}

function PtDaGui(p) {
  var c = PT_L[p.loai || 'PT'];
  return h(OkSd, { title: p.title, text: p.text, info: [['Mã hồ sơ', h('span', { className: 'tp-num' }, p.ma || 'TN-20261113-0052')], ['Đơn liên quan', h('span', { className: 'tp-num' }, c.ma)], ['Trạng thái', 'Đã gửi']],
    btns: h(F, null, Btn('Xem đơn liên quan', 'primary', { 'data-pt-go': 'reset:records,appK_phanto,' + c.go }), Btn('Về danh sách đơn', 'secondary', { 'data-pt-go': 'reset:records,appK_phanto' })) });
}

function Kct1() {
  var v = React.useState('td');
  return WzSd({ tag: SD_KC,  title: 'Thay đổi, rút kháng cáo', steps: KCT_STEPS, n: 1, save: false, go: 'kct2', body: h(F, null,
    FCard('Đơn kháng cáo của bạn', RvKV([['Mã đơn', h('span', { className: 'tp-num' }, 'TN-20261025-0015')], ['Văn bản bị kháng cáo', 'Bản án số 25/2026/DS-ST ngày 21/10/2026'], ['Phạm vi hiện tại', 'Một phần bản án'], ['Giai đoạn', '[Giai đoạn]'], ['Tòa án nhận đơn kháng cáo', COURT1]]), true),
    FCard('Bạn muốn làm gì với kháng cáo?', h(OptCards, { label: 'Việc thực hiện', cur: v[0], onPick: v[1], items: KCT_LOAI }), true)) });
}

function Kct2(p) {
  var rtb = p.loai === 'rtb', rmp = p.loai === 'rmp', nd = React.useState(rmp ? 'Rút phần kháng cáo về án phí sơ thẩm (Mục 2 phần Quyết định).' : 'Bổ sung đề nghị Tòa án cấp phúc thẩm xem xét chứng cứ chuyển khoản ngày 05/01/2026.'), ld = React.useState('');
  return WzSd({ tag: SD_KC,  title: 'Thay đổi, rút kháng cáo', steps: KCT_STEPS, n: 2, save: false, go: 'kct3' + (p.loai && p.loai !== 'td' ? p.loai : ''), body: h(F, null,
    rtb ? null : FCard(rmp ? 'Phần kháng cáo muốn rút' : 'Nội dung thay đổi, bổ sung', n7Tf(rmp ? 'Phần kháng cáo muốn rút' : 'Nội dung thay đổi, bổ sung', nd, { required: true, rows: 5, max: 2000, placeholder: rmp ? 'Mô tả cụ thể phần nào trong kháng cáo bạn muốn rút...' : 'Mô tả cụ thể phần nào trong kháng cáo bạn muốn thay đổi hoặc bổ sung thêm...' }), true),
    FCard('Lý do (không bắt buộc)', n7Tf('Lý do', ld, { rows: 4, max: 2000, placeholder: rtb ? 'Ví dụ: Các bên đã tự thỏa thuận được; bị đơn đã thi hành án tự nguyện...' : 'Trình bày lý do thay đổi hoặc rút kháng cáo nếu muốn...' }), true),
    rtb ? null : HopGhi('Giới hạn khi đã hết thời hạn kháng cáo', 'Nếu thời hạn kháng cáo đã hết, việc thay đổi, bổ sung không được vượt quá phạm vi kháng cáo ban đầu. Tòa án xác định việc này.')) });
}

function Kct3(loai) {
  var l = kctLoai(loai || 'td'), rut = loai === 'rmp' || loai === 'rtb';
  return h(KyGuiSd, { tag: SD_KC, sua: 'kct2',  title: 'Thay đổi, rút kháng cáo', steps: KCT_STEPS, save: false, ok: 'kctOk' + (loai && loai !== 'td' ? loai : ''), tep: ['Đơn ' + l.t.charAt(0).toLowerCase() + l.t.slice(1) + '.pdf'], tepMeta: 'Xem trước đơn', vaiTro: 'Người kháng cáo', sendLabel: 'Gửi đơn',
    top: FCard('Xác nhận thông tin', RvKV([['Đơn kháng cáo', h(F, null, 'Kháng cáo bản án sơ thẩm số 25/2026/DS-ST · ', h('span', { className: 'tp-num' }, 'TN-20261025-0015'))], ['Tòa án nhận đơn', COURT1], ['Việc thực hiện', l.t]].concat(loai === 'rtb' ? [] : [[loai === 'rmp' ? 'Phần kháng cáo muốn rút' : 'Nội dung', loai === 'rmp' ? 'Rút phần kháng cáo về án phí sơ thẩm (Mục 2 phần Quyết định).' : 'Bổ sung đề nghị Tòa án cấp phúc thẩm xem xét chứng cứ chuyển khoản ngày 05/01/2026.']], [['Lý do', 'Không có']])), true),
    camDoan: rut ? 'Tôi tự nguyện rút kháng cáo và hiểu rõ hệ quả pháp lý, chịu mọi trách nhiệm trước pháp luật.' : 'Tôi cam đoan nội dung thay đổi, bổ sung là đúng sự thật, chịu mọi trách nhiệm trước pháp luật.' });
}

function KctOk(loai) {
  var T1 = { td: ['Đã gửi đơn thay đổi, bổ sung kháng cáo', 'Tòa án sẽ xem xét nội dung thay đổi và thông báo kết quả vào Hộp thư tống đạt.'], rmp: ['Đã gửi đơn rút một phần kháng cáo', 'Phần kháng cáo đã rút sẽ không được Tòa án cấp phúc thẩm xem xét nữa.'], rtb: ['Đã gửi đơn rút toàn bộ kháng cáo', 'Tòa án sẽ ra quyết định đình chỉ xét xử phúc thẩm và thông báo cho các đương sự.'] }[loai || 'td'];
  return h(OkSd, { title: T1[0], text: T1[1], info: [['Trạng thái', h(T.StatusBadge, { tone: 'info', icon: false }, 'Đã gửi đơn')]],
    btns: h(F, null, Btn('Xem đơn liên quan', 'primary', { 'data-pt-go': 'reset:records,appK_khangcao,appealDetail' }), Btn('Về danh sách đơn', 'secondary', { 'data-pt-go': 'reset:records,appK_khangcao' })) });
}

function KcsWz(n, body) { return WzSd({ tag: SD_KCS,  title: 'Sửa đơn theo yêu cầu', steps: KCS_STEPS, n: n, go: 'kcs' + (n + 1), body: body }); }

function Kcs4() {
  return h(KyGuiSd, { tag: SD_KCS, sua: 'kcs2',  title: 'Sửa đơn theo yêu cầu', steps: KCS_STEPS, ok: 'kcsOk', tep: ['Đơn kháng cáo (sửa đổi, bổ sung).pdf', 'bien-ban-do-dac.pdf'], tepMeta: 'Bản in đơn sau khi sửa', vaiTro: 'Người kháng cáo',
    top: FCard('Nội dung sửa đổi, bổ sung', RvKV([['Gắn vào đơn', h('span', { className: 'tp-num' }, 'TN-20261023-0014')], ['Phạm vi kháng cáo', 'Một phần bản án'], ['Lý do kháng cáo', 'Tòa án sơ thẩm chưa xem xét biên bản đo đạc ngày 10/08/2026.'], ['Đề nghị Tòa án cấp phúc thẩm', 'Hủy phần quyết định về ranh giới đất.'], ['Tài liệu đính kèm', '1 tệp']]), true),
    camDoan: N7_CAMDOAN });
}

function KcsOk() {
  return h(OkSd, { title: 'Đã nộp đơn sửa đổi, bổ sung thành công', text: 'Đơn sửa đổi, bổ sung đã được gửi đến Tòa án và gắn vào đơn kháng cáo của bạn.', info: [['Mã hồ sơ sửa đổi', h('span', { className: 'tp-num' }, 'SDBS-2026-0021')], ['Gắn vào đơn', h('span', { className: 'tp-num' }, 'TN-20261023-0014')], ['Thời điểm gửi', '04/11/2026 09:30']],
    btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'reset:records,appK_khangcao,appealDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,appK_khangcao' })) });
}

function KqhWz(n, body) { return WzSd({ tag: SD_KCQ,  title: 'Trình bày lý do kháng cáo quá hạn', steps: KQH_STEPS, n: n, go: 'kqh' + (n + 1), body: body }); }

function Kqh4() {
  return h(KyGuiSd, { tag: SD_KCQ, sua: 'kqh2',  title: 'Trình bày lý do kháng cáo quá hạn', steps: KQH_STEPS, ok: 'kqhOk', tep: ['Bản trình bày lý do kháng cáo quá hạn.pdf', 'giay-ra-vien.pdf'], tepMeta: 'Bản in trình bày lý do', vaiTro: 'Người kháng cáo',
    top: FCard('Xem lại lý do nộp sau thời hạn', RvKV([['Đơn kháng cáo', h('span', { className: 'tp-num' }, 'TN-20261020-0013')], ['Lý do nộp sau thời hạn', 'Từ ngày 02/10/2026 đến 18/10/2026 tôi điều trị nội trú tại Bệnh viện Bạch Mai nên không thể nộp đơn kháng cáo đúng hạn.'], ['Chứng cứ trở ngại', 'Tệp 1 · giay-ra-vien.pdf']]), true),
    camDoan: 'Tôi cam đoan nội dung trình bày và tài liệu chứng minh là đúng sự thật.' });
}

function KqhOk() {
  return h(OkSd, { title: 'Đã gửi bản trình bày lý do', text: 'Đã gửi bản trình bày lý do đến Tòa án. Kết quả xem xét sẽ được thông báo qua Hộp thư tống đạt.', info: [['Gắn vào đơn', h('span', { className: 'tp-num' }, 'TN-20261020-0013')], ['Thời điểm gửi', '04/11/2026 09:30']],
    btns: h(F, null, Btn('Xem chi tiết đơn', 'primary', { 'data-pt-go': 'reset:records,appK_khangcao,appealDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,appK_khangcao' })) });
}

function GrWz(k, n, body, go) { return WzSd({ tag: sdTagGdt(k),  title: 'Rút đơn', steps: GR_STEPS, n: n, go: go || ('gr' + k + (n + 1)), body: h(F, null, n === 1 ? Lead('Bạn đang đề nghị Tòa án cho rút đơn. Đơn chỉ được rút sau khi Tòa án phê duyệt.') : null, body) }); }

function Gr3(p) {
  return h(KyGuiSd, { tag: sdTagGdt(p.k), sua: 'gr' + p.k + '2',  title: 'Rút đơn', steps: GR_STEPS, kyTitle: 'Xem lại & ký gửi', lead: 'Cổng tự sinh đơn từ thông tin bạn đã khai. Muốn sửa, bấm Quay lại.', ok: 'gr' + p.k + 'Ok', tep: ['Xem trước đơn'], tepMeta: 'Đơn yêu cầu rút đơn đề nghị ' + grTen(p.k), vaiTro: 'Người đề nghị',
    top: FCard('Yêu cầu rút đơn', RvKV([['Đơn cần rút', h('span', { className: 'tp-num' }, 'GT-2026-0049')], ['Bản án, quyết định', 'Bản án phúc thẩm số 18/2026/DS-PT'], ['Lý do rút đơn', '[Các bên đã thỏa thuận được việc thi hành bản án]']]), true),
    camDoan: 'Tôi hiểu hệ quả của việc rút đơn và tự nguyện đề nghị Tòa án cho rút đơn này.' });
}

function GrOk(p) { return h(OkSd, { title: 'Đã gửi yêu cầu rút đơn đề nghị ' + grTen(p.k) + '.', text: 'Đơn chỉ được rút sau khi Tòa án phê duyệt. Kết quả gửi qua Hộp thư tống đạt.', btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'backTo:gdtDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applicationsGdt' })) }); }

function GsWz(k, n, body, go) { return WzSd({ tag: sdTagGdt(k),  title: 'Sửa đổi, bổ sung đơn', steps: GS_STEPS, n: n, go: go || ('gs' + k + (n + 1)), body: body }); }

function Gs4(p) {
  return h(KyGuiSd, { tag: sdTagGdt(p.k), sua: 'gs' + p.k + '2',  title: 'Sửa đổi, bổ sung đơn', steps: GS_STEPS, kyTitle: 'Xem lại & ký gửi', lead: 'Kiểm tra lại đơn, ký số rồi gửi tới Tòa án.', ok: 'gs' + p.k + 'Ok', tep: ['Xem trước đơn', 'bien-ban-do-dac-hien-trang.pdf'], tepMeta: 'Đơn sửa đổi, bổ sung', vaiTro: 'Người đề nghị',
    top: h(F, null, FCard('Đơn đề nghị', RvKV([['Bản án / Quyết định bị đề nghị', 'Bản án số 18/2026/DS-PT'], ['Tên vụ án', 'Tranh chấp hợp đồng chuyển nhượng quyền sử dụng đất'], ['Đơn đề nghị ban đầu', h('span', { className: 'tp-num' }, 'TN-20261029-0020')], ['Tòa án ban hành', 'TAND cấp cao tại Hà Nội']]), true),
      HopGhi('Đơn giữ nguyên mã và thời điểm nộp ban đầu', 'Bản sửa gắn vào đơn TN-20261029-0020, không tạo đơn mới và không làm mất thời hiệu đã bảo toàn khi nộp lần đầu.'),
      HopGhi('Tòa án kiểm tra lại toàn bộ đơn', 'Sau khi nhận bản sửa, Tòa án xem xét và thông báo tiếp nhận hay tiếp tục yêu cầu sửa qua Hộp thư tống đạt.'),
      FCard('Tài liệu đính kèm (1 tệp)', DtDocs([['bien-ban-do-dac-hien-trang.pdf', 'Tài liệu bổ sung']]), true)),
    camDoan: 'Tôi cam đoan các thông tin và tài liệu sửa đổi, bổ sung trên đây là hoàn toàn đúng sự thật, tự nguyện và chịu mọi trách nhiệm trước pháp luật về nội dung đã khai.' });
}

function GsOk(p) {
  var t = grTen(p.k);
  return h(OkSd, { title: 'Đã gửi bản sửa đổi, bổ sung đơn đề nghị ' + t, text: 'Bản sửa đổi, bổ sung đã được gắn vào hồ sơ xem xét ' + t + ' của bản án. Tòa án có thẩm quyền kiểm tra lại và gửi thông báo kết quả giải quyết qua Hộp thư tống đạt.',
    info: [['Mã tiếp nhận', h('span', { className: 'tp-num' }, 'TN-20261104-0031')], ['Bản án đề nghị', 'Bản án số 18/2026/DS-PT'], ['Đơn đề nghị ban đầu', h('span', { className: 'tp-num' }, 'TN-20261029-0020')]],
    btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'backTo:gdtDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applicationsGdt' })) });
}

function Mg1(p) {
  p = p || {}; var l = React.useState(MG_UI.loai); MG_UI.loai = l[0];
  var sap = p.han === 'sap';
  return h(F, null, WzSd({ tag: SD_KK2,  title: 'Miễn, giảm án phí', steps: MG_STEPS, n: 1, go: 'mg2', body: h(F, null, p.ky ? KyKhoa(KY_KHOA_MG) : null,
    h('section', { className: 'q4-han' + (sap ? ' q4-han-do' : '') }, h('small', null, 'Hạn nộp tạm ứng án phí — sẽ tạm dừng khi bạn gửi đơn'), h('b', null, sap ? 'Còn 2 ngày' : 'Còn 6 ngày'), /* W04 */
      h('p', null, 'Bạn được nộp đơn miễn, giảm trong 07 ngày làm việc kể từ ngày nhận được thông báo nộp tiền (Điều 195 Bộ luật Tố tụng dân sự 2015).')),
    KhoaVung(p.ky, h(F, null,
      FCard('Nghĩa vụ tạm ứng án phí', RvKV([['Mã vụ việc, đơn khởi kiện liên quan', h('span', { className: 'tp-num' }, 'TN-20261012-0007')], ['Loại việc', 'Tranh chấp hợp đồng cung ứng dịch vụ'], ['Tòa án tiếp nhận và giải quyết', COURT1],
        ['Số tiền tạm ứng theo thông báo', '1.250.000 đ'], ['Hạn nộp', sap ? '15/11/2026' : '06/11/2026'], ['Số tiền nếu được giảm 50%', '625.000 đ'], ['Tình trạng', 'Chưa nộp']]), true),
      FCard('Bạn đề nghị miễn hay giảm?', h(F, null, Lead('Hai thủ tục khác nhau về mức miễn giảm, đối tượng áp dụng và giấy tờ phải có.'),
        h(ChonThe, { label: 'Bạn đề nghị miễn hay giảm?', v: l[0], onPick: l[1], items: [
          { id: 'mien', t: 'Miễn 100% tạm ứng án phí, án phí', d: 'Dành cho người lao động đòi quyền lợi, người yêu cầu cấp dưỡng, hộ nghèo, hộ cận nghèo, người cao tuổi, người khuyết tật, người có công, đồng bào dân tộc thiểu số ở xã đặc biệt khó khăn, thân nhân liệt sĩ (Điều 12 Nghị quyết 326/2016/UBTVQH14).', tag: 'Không phải nộp' },
          { id: 'giam', t: 'Giảm 50% tạm ứng án phí, án phí', d: 'Dành cho người gặp sự kiện bất khả kháng dẫn đến không còn đủ tài sản để nộp (Điều 13 Nghị quyết 326/2016/UBTVQH14). Bắt buộc có giấy xác nhận của UBND cấp xã.', tag: 'Còn nộp 625.000 đ' }] })), true)))) }),
    p.daGui ? h(DlgOver, { title: 'Bạn đã nộp đơn đề nghị miễn, giảm', desc: 'Bạn đã nộp 1 đơn đề nghị miễn, giảm cho đơn này (MG-2026-0012, gần nhất lúc 05/11/2026 09:30). Bạn có muốn tiếp tục nộp thêm đơn mới không?', ok: 'Tiếp tục nộp', huy: 'Quay lại', go: 'mg1' } /* W01 */) : null);
}

function Mg2() {
  var giam = MG_UI.loai === 'giam', anchor = React.useRef(null), host = useHost(anchor), v = React.useState(''), t = React.useState('');
  return WzSd({ tag: SD_KK2,  title: 'Miễn, giảm án phí', steps: MG_STEPS, n: 2, go: 'mg3', body: h(F, null, h('span', { ref: anchor, hidden: true }),
    FCard(giam ? 'Đề nghị giảm 50% tạm ứng án phí, án phí' : 'Đề nghị miễn 100% tạm ứng án phí, án phí', h(F, null,
      h(ChonO, { host: host, label: giam ? 'Căn cứ sự kiện bất khả kháng' : 'Diện đối tượng đề nghị miễn', v: v[0], onPick: v[1], items: (giam ? MG_GIAM : MG_MIEN).map(function (x, i) { return { id: 'c' + i, name: x[0] }; }) }),
      P(giam ? 'Danh mục theo Điều 13 Nghị quyết 326/2016/UBTVQH14.' : 'Danh mục theo Điều 12 Nghị quyết 326/2016/UBTVQH14. Chọn diện đúng với giấy tờ bạn đang có.', 'ph-muted dt-small'),
      Tf('Trình bày hoàn cảnh và lý do đề nghị', { required: true, multiline: true, value: t[0], onChange: function (e) { t[1](e.target.value); }, placeholder: 'Nêu rõ hoàn cảnh kinh tế hiện tại, lý do không có khả năng tài chính để nộp tạm ứng án phí và nguyện vọng đề nghị Tòa án xem xét…' }),
      P('Tối thiểu 50 ký tự, tối đa 2.000 ký tự. · ' + t[0].length + '/2.000', 'ph-muted dt-small'),
      v[0] ? HopGhi('Giấy tờ phải kèm cho trường hợp này', (giam ? MG_GIAM : MG_MIEN)[+v[0].slice(1)][1]) : null,
      giam ? HopGhi('Mức giảm do pháp luật ấn định', '50% — nếu được chấp nhận, số tiền còn phải nộp là 625.000 đ thay cho 1.250.000 đ.') : null), true)) });
}

function Mg4() {
  return h(KyGuiSd, { tag: SD_KK2, sua: 'mg2',  title: 'Miễn, giảm án phí', steps: MG_STEPS, lead: 'Kiểm tra lại đơn, ký số rồi gửi tới Tòa án.', ok: 'mgOk', tep: ['Đơn đề nghị miễn, giảm tạm ứng án phí', 'giay-xac-nhan-ho-ngheo.pdf'], tepMeta: 'Xem trước đơn',
    kyNote: 'Cần ký số bản đơn và toàn bộ tài liệu chứng minh trước khi gửi.',
    top: FCard('Đề nghị', RvKV([['Loại đề nghị', MG_UI.loai === 'giam' ? 'Đề nghị giảm 50% tạm ứng án phí, án phí' : 'Đề nghị miễn 100% tạm ứng án phí, án phí'], ['Căn cứ', '[Căn cứ đã chọn]'], ['Tài liệu chứng minh (1 tệp)', 'giay-xac-nhan-ho-ngheo.pdf']]), true),
    bottom: h(F, null, HopGhi('Sau khi gửi', 'Đơn khởi kiện chuyển nhãn "Đang chờ xét miễn, giảm án phí", đồng hồ 07 ngày nộp tiền tạm dừng. Thẩm phán trả lời trong 03 ngày làm việc.'),
      HopGhi('Ba kết quả có thể xảy ra', 'Miễn 100%: hủy nghĩa vụ nộp tiền, đơn chuyển sang thụ lý. Giảm 50%: số tiền phải nộp còn 625.000 đ, đồng hồ nộp tiền chạy lại kèm mã QR thanh toán mới. Không chấp nhận: bạn nộp đủ 1.250.000 đ trong thời hạn còn lại.'),
      HopGhi('Nếu không được chấp nhận', 'Trong 03 ngày làm việc kể từ ngày nhận được thông báo, bạn có quyền khiếu nại đến Chánh án Tòa án. Chánh án trả lời trong 03 ngày làm việc và quyết định đó là quyết định cuối cùng (Điều 16 Nghị quyết 326/2016/UBTVQH14).')) });
}

function MgOk() { return h(OkSd, { title: 'Đã gửi đơn đề nghị miễn, giảm tạm ứng án phí.', text: 'Thẩm phán trả lời trong 03 ngày làm việc.', btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'backTo:appDetailFee' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applications' })) }); }

function Rd1() {
  return WzSd({ tag: SD_KK,  title: 'Rút đơn', steps: RD_STEPS, n: 1, go: 'rd2', body: FCard('Đơn bạn đề nghị rút', h(F, null, Lead('Kiểm tra đúng đơn trước khi tiếp tục. Thông tin lấy tự động, không sửa được.'),
    RvKV([['Mã đơn', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Loại đơn', 'Đơn khởi kiện – Tranh chấp hợp đồng vay tài sản'], ['Ngày gửi', '20/10/2026'], ['Tòa án tiếp nhận', COURT1], ['Trạng thái hiện tại', 'Đã gửi đơn'], ['Vụ án liên quan', 'Chưa phát sinh']])), true) });
}

function Rd2() {
  var l = React.useState('RD-1'), t = React.useState('');
  return WzSd({ tag: SD_KK,  title: 'Rút đơn', steps: RD_STEPS, n: 2, go: 'rd3', body: h(F, null,
    FCard('Lý do rút đơn', h(F, null, Lead('Thông tin này giúp Tòa án xử lý yêu cầu nhanh hơn.'),
      h(ChonThe, { label: 'Lý do rút đơn', v: l[0], onPick: l[1], items: RD_LYDO.map(function (x) { return { id: x[0], t: x[1], d: x[2] }; }) }),
      Tf('Trình bày', { required: l[0] === 'RD-5', multiline: true, value: t[0], onChange: function (e) { t[1](e.target.value); }, placeholder: 'Hai bên đã thỏa thuận xong ngày 20/06/2026…', error: l[0] === 'RD-5' && t[0].length > 0 && t[0].length < 15 ? 'Nêu rõ lý do rút đơn (tối thiểu 15 ký tự).' : undefined })), true),
    h('div', { className: 'rd-hq' }, h('p', { className: 'rd-hq-h' }, h(T.Icon, { name: 'alert' }), 'Hệ quả của việc rút đơn ở trạng thái hiện tại'),
      h('div', { className: 'rd-hq-c' }, h('b', null, 'Việc giải quyết đơn sẽ chấm dứt'), h('p', null, 'Tòa án ra quyết định phù hợp với giai đoạn hiện tại của đơn.'))),
    FCard('Tiền tạm ứng án phí liên quan', RvKV([['Số tiền theo thông báo', '—'], ['Tình trạng nộp', 'Chưa nộp'], ['Nếu đã nộp', 'Quyền hoàn trả được xử lý tại mục Nghĩa vụ tài chính']]), true)) });
}

function Rd3(p) {
  p = p || {};
  return h(F, null, h(KyGuiSd, { tag: SD_KK, sua: 'rd2',  title: 'Rút đơn', steps: RD_STEPS, kyTitle: 'Xem lại & ký gửi', ok: 'rdOk', tep: ['Đơn yêu cầu rút đơn khởi kiện'], tepMeta: 'Xem trước đơn', vaiTro: 'Người khởi kiện',
    top: h(F, null, p.chan ? h('div', { className: 'q2-chan q5-chan', role: 'alert' }, h('p', null, 'Chỉ người khởi kiện, đồng khởi kiện hoặc người đại diện được tạo đơn yêu cầu rút đơn.')) : null,
      FCard('Yêu cầu rút đơn', RvKV([['Đơn cần rút', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Lý do rút đơn', 'Các bên đã tự thỏa thuận được với nhau']]), true)) }));
}

function RdOk() { return h(OkSd, { title: 'Đã gửi yêu cầu rút đơn.', btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'backTo:appDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applications' })) }); }

function Sd1(p) {
  p = p || {}; var han = p.han || 'con';
  var pill = { con: ['Còn 3 ngày', 'sap'], qua: ['Quá hạn 2 ngày', 'qua'], vo: ['Vô thời hạn', 'an'] }[han];
  var dong = han === 'vo' ? 'Văn bản tống đạt ngày 22/10/2026 không quy định hạn nộp bản sửa.' : 'Hạn ' + (han === 'qua' ? '11/11/2026' : '06/11/2026') + ' (tính từ ngày tống đạt 22/10/2026).';
  return WzSd({ tag: SD_KK,  title: 'Sửa đơn theo yêu cầu', steps: SD_STEPS, n: 1, go: 'sd2', body: h(F, null,
    FCard('Đơn đang có yêu cầu sửa đổi, bổ sung', RvKV([['Mã hồ sơ', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Đơn liên quan', 'Đơn khởi kiện – Tranh chấp hợp đồng vay tài sản'], ['Trạng thái', 'Đã gửi đơn']]), true),
    FCard('Yêu cầu của Tòa án', h(F, null, RvKV([['Văn bản yêu cầu', 'Thông báo yêu cầu sửa đổi, bổ sung đơn khởi kiện số 12/2026/TB-TA'], ['Đơn liên quan', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Tòa án yêu cầu', COURT1], ['Ngày tống đạt', '22/10/2026']]),
      h('p', { className: 'sd-han' }, h('span', { className: 'ib-due ib-due-' + pill[1] }, pill[0]), dong),
      HopGhi('Nội dung Tòa án yêu cầu', '[Nội dung yêu cầu sửa đổi, bổ sung theo thông báo]')), true)) });
}

function Sd2(p) {
  p = p || {};
  if (!p.tep) return WzSd({ tag: SD_KK,  title: 'Sửa đơn theo yêu cầu', steps: SD_STEPS, n: 2, go: 'sd3', body: h(F, null,
    FCard('Biểu mẫu điện tử', h(F, null, Lead('Biểu mẫu điện tử "Tranh chấp hợp đồng vay tài sản" bên dưới đã nạp lại toàn bộ nội dung đơn ban đầu. Bạn có thể sửa đổi, bổ sung trực tiếp trên biểu mẫu theo yêu cầu của Tòa án.'),
      Tf('Nội dung yêu cầu khởi kiện', { required: true, multiline: true, defaultValue: 'Đề nghị Tòa án buộc ông Trần Văn Bình trả số tiền vay 200.000.000 đồng và tiền lãi theo hợp đồng vay tài sản ngày 10/01/2026.' }),
      Tf('Yêu cầu khác', { multiline: true, placeholder: 'Không bắt buộc' }),
      P('Viết thành nội dung hoàn chỉnh để Tòa án đưa nguyên văn vào hồ sơ, không viết dạng ghi chú sửa đổi.', 'ph-muted dt-small')), true),
    FCard('Đơn đã nộp', DtDocs([['Đơn khởi kiện', 'don-khoi-kien-TN-20261020-0012.pdf · Đã ký số']]), false)) });
  var nd = React.useState(p.err ? '' : 'Đề nghị Tòa án buộc ông Trần Văn Bình trả số tiền vay 200.000.000 đồng, tiền lãi theo hợp đồng và bổ sung địa chỉ nơi cư trú hiện tại của bị đơn.');
  return WzSd({ tag: SD_KK,  title: 'Sửa đơn theo yêu cầu', steps: SD_STEPS, n: 2, go: 'sd3', body: h(F, null, /* W09 */
    FCard('Đơn đã nộp', h(F, null, Lead('Đơn ban đầu của bạn hiển thị bên dưới để tham khảo. Hãy nhập nội dung đơn sau khi sửa đổi, bổ sung vào ô văn bản.'),
      DtDocs([['Đơn ban đầu', 'don-khoi-kien-TN-20261020-0012.pdf · Đã ký số']], { the: true })), true),
    FCard('Nội dung đơn sau khi sửa đổi, bổ sung', h(F, null, Lead('Viết thành nội dung hoàn chỉnh để Tòa án đưa nguyên văn vào hồ sơ, không viết dạng ghi chú sửa đổi.'),
      n7Tf('Nội dung đơn sau khi sửa đổi, bổ sung', nd, { required: true, rows: 6, max: 2000, error: p.err ? 'Vui lòng nhập nội dung đơn sau khi sửa đổi, bổ sung.' : undefined })), true)) });
}

function Sd4() {
  return h(KyGuiSd, { tag: SD_KK, sua: 'sd2',  title: 'Sửa đơn theo yêu cầu', steps: SD_STEPS, lead: 'Kiểm tra lại đơn, ký số rồi gửi tới Tòa án.', ok: 'sdOk', tep: ['Đơn sửa đổi, bổ sung', 'hop-dong-vay-ban-sao.pdf'], tepMeta: 'Xem trước đơn', vaiTro: 'Người khởi kiện',
    top: h(F, null, HopGhi('Đơn giữ nguyên mã và thời điểm nộp ban đầu', 'Bản sửa gắn vào đơn TN-20261020-0012, không tạo đơn mới và không làm mất thời hiệu đã bảo toàn khi nộp lần đầu.'),
      HopGhi('Tòa án kiểm tra lại toàn bộ đơn', 'Sau khi nhận bản sửa, Tòa án xem xét và thông báo tiếp nhận hay tiếp tục yêu cầu sửa qua Hộp thư tống đạt.'),
      FCard('Tài liệu đính kèm (1 tệp)', DtDocs([['hop-dong-vay-ban-sao.pdf', 'Bản sao có chứng thực']]), true)) });
}

function SdOk() { return h(OkSd, { title: 'Đã gửi bản sửa đổi, bổ sung đơn', text: 'Bản sửa đã gắn vào đơn ban đầu, mã đơn và thời điểm nộp lần đầu giữ nguyên. Tòa án kiểm tra lại và thông báo kết quả qua Hộp thư tống đạt.', btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'backTo:appDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applications' })) }); }

function Tr1() {
  var l = React.useState(TR_UI.loai); TR_UI.loai = l[0];
  return WzSd({ tag: SD_KK3,  title: 'Thay đổi, rút yêu cầu', steps: trSteps(), n: 1, go: 'tr2', body: h(F, null,
    FCard('Đơn và vụ án liên quan', RvKV([['Đơn khởi kiện', h('span', { className: 'tp-num' }, 'TN-20261005-0003')], ['Vụ án liên quan', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Tên vụ án', 'Tranh chấp hợp đồng vay tài sản'], ['Trạng thái', 'Đang giải quyết']]), true),
    FCard('Loại điều chỉnh', h(F, null, Lead('Chọn loại điều chỉnh bạn muốn thực hiện.'),
      h(ChonThe, { label: 'Loại điều chỉnh', v: l[0], onPick: l[1], items: [{ id: 'TD-01', t: 'Thay đổi, bổ sung yêu cầu khởi kiện', d: 'Sửa nội dung một yêu cầu đã nêu, hoặc thêm yêu cầu mới vào đơn đã nộp.' }, { id: 'TD-02', t: 'Rút một phần yêu cầu khởi kiện', d: 'Giữ vụ án nhưng bỏ bớt một hoặc vài yêu cầu. Muốn bỏ toàn bộ thì dùng đơn rút đơn khởi kiện.' }] })), true),
    h(NvCall, { tone: 'warning', title: 'Thời điểm được thay đổi yêu cầu:' }, 'Trước khi mở phiên họp kiểm tra việc giao nộp, tiếp cận, công khai chứng cứ, bạn được thay đổi, bổ sung yêu cầu không giới hạn. Sau thời điểm đó, Tòa án chỉ chấp nhận nếu việc thay đổi không vượt quá phạm vi khởi kiện ban đầu. Việc rút một phần yêu cầu thì được thực hiện ở bất kỳ giai đoạn nào.')) });
}

function Tr2(p) {
  p = p || {}; var rut = TR_UI.loai === 'TD-02', c = React.useState([1]);
  var rows = React.useState(p.err ? [] : [{ nd: 'Buộc bị đơn trả số tiền vay', gt: '200.000.000', mt: 'Theo hợp đồng vay ngày 10/01/2026' }, { nd: 'Buộc bị đơn trả tiền lãi', gt: '18.000.000', mt: 'Lãi 9%/năm tính đến ngày nộp đơn' }]);
  var tong = rows[0].reduce(function (s, r) { return s + (+String(r.gt).replace(/\./g, '') || 0); }, 0);
  var bang = h('div', { className: 'q5-bang' }, h('p', { className: 'q5-bang-h' }, 'Yêu cầu Tòa án giải quyết', h('span', { className: 'q5-req' }, ' *')),
    P('Bạn tự viết nội dung yêu cầu, mỗi yêu cầu một dòng kèm giá trị kê khai riêng. Tổng giá trị là căn cứ tính tạm ứng án phí có giá ngạch.', 'ph-muted dt-small'),
    rows[0].map(function (r, i) {
      return h('div', { key: i, className: 'q5-yc' }, h('div', { className: 'q5-yc-h' }, h('b', null, 'Yêu cầu ' + (i + 1)), IcoBtn('trash', 'Xóa dòng yêu cầu', undefined)),
        Tf('Nội dung yêu cầu', { required: true, defaultValue: r.nd, placeholder: 'Tự nhập nội dung yêu cầu' }), Tf('Giá trị kê khai (VNĐ)', { defaultValue: r.gt, placeholder: '0', help: 'Yêu cầu không tính tiền thì để trống', inputMode: 'numeric' }),
        Tf('Mô tả chi tiết yêu cầu', { multiline: true, defaultValue: r.mt, placeholder: 'Diễn giải cụ thể yêu cầu này' }));
    }),
    p.err ? h('p', { className: 'q2-err', role: 'alert' }, h(T.Icon, { name: 'alert' }), 'Vui lòng nhập ít nhất một yêu cầu khởi kiện') : null,
    h(T.Button, { variant: 'tint', size: 'sm', icon: 'plus', onClick: function () { rows[1](rows[0].concat([{ nd: '', gt: '', mt: '' }])); } }, 'Thêm nội dung yêu cầu'),
    h('p', { className: 'q5-tong' }, 'TỔNG GIÁ TRỊ KÊ KHAI: ', h('b', null, tong > 0 ? tong.toLocaleString('vi-VN') + ' đ' : '—')));
  var eform = FCard('Biểu mẫu điện tử', h(F, null, Lead(rut ? 'Biểu mẫu điện tử "Tranh chấp hợp đồng vay tài sản" bên dưới thể hiện nội dung đơn khởi kiện đã lưu. Bạn có thể xóa hoặc điều chỉnh các yêu cầu cần rút.' : 'Điền biểu mẫu điện tử "Tranh chấp hợp đồng vay tài sản" bên dưới.'),
    Tf('Nội dung yêu cầu khởi kiện', { required: true, multiline: true, rows: 4, defaultValue: '1. Buộc bị đơn trả số tiền vay 200.000.000 đồng.\n2. Buộc bị đơn trả tiền lãi theo hợp đồng.\n3. Buộc bị đơn bồi thường chi phí đi lại 5.000.000 đồng.' }),
    Tf('Tóm tắt quá trình sự việc', { required: true, multiline: true, rows: 4, defaultValue: 'Ngày 10/01/2026 tôi cho ông Trần Văn Bình vay 200.000.000 đồng, có hợp đồng vay tài sản và giấy nhận tiền. Đến hạn ông Bình chỉ trả 100.000.000 đồng tiền gốc, tôi đã nhiều lần nhắc nhưng không trả phần còn lại.' })), true);
  return WzSd({ tag: SD_KK3,  title: 'Thay đổi, rút yêu cầu', steps: trSteps(), n: 2, go: 'tr3', body: h(F, null, p.ky ? KyKhoa(KY_KHOA_TR) : null, KhoaVung(p.ky, h(F, null,
    p.eform ? eform /* W15 */ : h(F, null,
      FCard(rut ? 'Chọn yêu cầu muốn rút' : 'Chọn yêu cầu muốn thay đổi', h(F, null,
        Lead(rut ? 'Chọn (các) yêu cầu khởi kiện bạn muốn rút. Phần đã chọn sẽ bị đình chỉ giải quyết.' : 'Chọn (các) yêu cầu bạn muốn thay đổi, bổ sung, sau đó trình bày nội dung mới bên dưới.'),
        h('div', { className: 'tr-yc' }, TR_YC.map(function (y, i) { return h(T.Checkbox, { key: y, label: y, checked: c[0].indexOf(i) >= 0, onChange: function (e) { c[1](e.target.checked ? c[0].concat([i]) : c[0].filter(function (x) { return x !== i; })); } }); }))), true),
      p.bang ? FCard('Nội dung thay đổi', bang, true) /* W14 */ : FCard('Nội dung thay đổi', Tf(rut ? 'Nêu rõ yêu cầu khởi kiện bạn muốn rút (theo đơn đã nộp ở trên)' : 'Nêu rõ nội dung thay đổi, bổ sung so với đơn đã nộp ở trên', { required: true, multiline: true }), true),
      FCard('Đơn khởi kiện (tải lên)', h(F, null, P('Nội dung yêu cầu của đơn khởi kiện đã nộp (tệp do bạn tải lên), chỉ để xem.', 'ph-muted dt-small'), DtDocs([['Đơn khởi kiện', 'don-khoi-kien.pdf']])), false))))) });
}

function Tr3() {
  var rut = TR_UI.loai === 'TD-02', l = React.useState('l1');
  return WzSd({ tag: SD_KK3,  title: 'Thay đổi, rút yêu cầu', steps: trSteps(), n: 3, go: 'tr4', body: h(F, null,
    FCard(rut ? 'Lý do rút một phần yêu cầu' : 'Lý do thay đổi, bổ sung yêu cầu', h(F, null,
      h(ChonThe, { label: 'Lý do', v: l[0], onPick: l[1], items: [{ id: 'l1', t: '[Lý do 1 theo danh mục]' }, { id: 'l2', t: '[Lý do 2 theo danh mục]' }, { id: 'lk', t: 'Lý do khác' }] }),
      Tf('Trình bày cụ thể', { required: l[0] === 'lk', multiline: true, placeholder: rut ? 'Ngày… bị đơn đã bàn giao mặt bằng nên tôi rút yêu cầu…' : 'Sau khi có kết quả đối chiếu công nợ ngày…, số tiền còn nợ là…', error: undefined }),
      l[0] === 'lk' ? P('Chọn "Lý do khác" thì bắt buộc phải trình bày cụ thể.', 'ph-muted dt-small') : null), true),
    h('div', { className: 'rd-hq' }, h('p', { className: 'rd-hq-h' }, h(T.Icon, { name: 'alert' }), 'Hệ quả'),
      (rut ? TR_HQ_RUT : TR_HQ_TD).map(function (x) { return h('div', { key: x[0], className: 'rd-hq-c' }, h('b', null, x[0]), h('p', null, x[1])); }))) });
}

function Tr5() {
  var rut = TR_UI.loai === 'TD-02';
  return h(KyGuiSd, { tag: SD_KK3, sua: 'tr2',  title: 'Thay đổi, rút yêu cầu', steps: trSteps(), kyTitle: 'Xem lại & ký gửi', ok: 'trOk', vaiTro: 'Nguyên đơn', tep: [rut ? 'Bản in Đơn đề nghị rút một phần yêu cầu' : 'Bản in Đơn thay đổi, bổ sung yêu cầu'], tepMeta: 'Xem trước đơn',
    camDoan: rut ? 'Tôi tự nguyện rút phần yêu cầu đã chọn và hiểu rằng phần đó sẽ bị đình chỉ giải quyết, chịu mọi trách nhiệm trước pháp luật.' : 'Tôi cam đoan nội dung yêu cầu thay đổi, bổ sung và tài liệu kèm theo là đúng sự thật, chịu mọi trách nhiệm trước pháp luật.',
    top: h(F, null, FCard(rut ? 'Yêu cầu cần rút' : 'Yêu cầu cần thay đổi', RvKV([['Yêu cầu', TR_YC[1]], ['Lý do', '[Lý do đã chọn]'], ['Tài liệu đính kèm', 'Không đính kèm tài liệu bổ sung.']]), true),
      h(NvCall, { tone: 'warning', title: rut ? 'Việc rút yêu cầu không hủy được sau khi Tòa án chấp nhận:' : 'Tòa án có thể không chấp nhận nếu vượt quá phạm vi khởi kiện ban đầu:' },
        rut ? 'Sau khi Tòa án ra quyết định đình chỉ đối với phần yêu cầu đã rút, bạn không lấy lại được phần đó trong vụ án này. Kiểm tra kỹ danh sách yêu cầu còn lại trước khi ký gửi.' : 'Nếu đã qua phiên họp kiểm tra việc giao nộp, tiếp cận, công khai chứng cứ, yêu cầu thay đổi vượt quá phạm vi ban đầu sẽ bị Tòa án từ chối và bạn phải khởi kiện thành vụ án riêng.')) });
}

function TrOk() {
  var rut = TR_UI.loai === 'TD-02';
  return h(OkSd, { title: rut ? 'Đã gửi đơn rút một phần yêu cầu khởi kiện' : 'Đã gửi đơn thay đổi, bổ sung yêu cầu khởi kiện', text: rut ? 'Tòa án sẽ ra quyết định đình chỉ đối với phần yêu cầu đã rút và thông báo cho các đương sự khác. Vụ án tiếp tục với những yêu cầu còn lại.' : 'Tòa án sẽ chuyển nội dung yêu cầu mới cho bị đơn và người có quyền lợi, nghĩa vụ liên quan để lấy ý kiến, sau đó thông báo kết quả vào Hộp thư tống đạt.',
    btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'backTo:appDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applications' })) });
}

function Bp1() {
  var anchor = React.useRef(null), host = useHost(anchor), v = React.useState('');
  return WzSd({ tag: SD_KK,  title: 'Yêu cầu BPKCTT', steps: BP_STEPS, n: 1, go: 'bp2', body: h(F, null, h('span', { ref: anchor, hidden: true }),
    FCard('Hồ sơ liên quan', RvKV([['Đơn liên quan', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Vụ án', 'Chưa phát sinh'], ['Loại việc', 'Tranh chấp hợp đồng vay tài sản'], ['Tòa án', COURT1]]), true),
    FCard('Biện pháp khẩn cấp tạm thời cần áp dụng', h(F, null,
      Lead('Mỗi đơn yêu cầu một biện pháp; cần thêm biện pháp khác thì lập đơn mới. Bấm vào (i) để xem điều kiện áp dụng.'),
      h(ChonO, { host: host, label: 'Biện pháp cần áp dụng', v: v[0], onPick: v[1], items: [1, 2, 3, 4].map(function (i) { return { id: 'b' + i, name: '[Biện pháp ' + i + ' – danh mục BIEN_PHAP_KCTT]', desc: '[Điều kiện áp dụng]' }; }) })), true)) });
}

function Bp2(p) {
  p = p || {}; var d = React.useState('bd');
  return WzSd({ tag: SD_KK,  title: 'Yêu cầu BPKCTT', steps: BP_STEPS, n: 2, go: 'bp3', body: h(F, null, p.ky ? KyKhoa(KY_KHOA_BP) : null, KhoaVung(p.ky, h(F, null,
    FCard('Đối tượng bị áp dụng biện pháp', h(F, null, Lead('Chọn đương sự của hồ sơ, hoặc người khác nếu biện pháp nhắm vào người không phải đương sự.'),
      h(ChonThe, { label: 'Đối tượng bị áp dụng', v: d[0], onPick: d[1], items: [{ id: 'bd', t: 'Trần Văn Bình', d: 'Bị đơn' }, { id: 'nk', t: 'Người khác, không phải đương sự', d: 'Ví dụ bên mời thầu, chủ tàu bay, tàu biển, người đang giữ tài sản tranh chấp. Nhập tên và địa chỉ ở các ô bên dưới.' }, { id: 'kc', t: 'Không có đối tượng bị áp dụng', d: 'Biện pháp chỉ tác động lên tài sản, hoặc giao người chưa thành niên cho người trông nom.' }] })), true),
    FCard('Nội dung yêu cầu', h(F, null,
      Tf('Giá trị đề nghị (đồng)', { inputMode: 'numeric' }),
      Tf('Thông tin tài sản, tài khoản liên quan', { multiline: true, placeholder: 'Tài khoản số 0071xxxxxxx tại Ngân hàng A đứng tên bị đơn; quyền sử dụng đất thửa số 12, tờ bản đồ số 5…' }),
      Tf('Lý do cần áp dụng biện pháp khẩn cấp tạm thời', { required: true, multiline: true, defaultValue: p.ky ? 'Bị đơn đang rao bán căn nhà là tài sản tranh chấp.' : undefined, placeholder: 'Tôi có căn cứ cho rằng bên bị đơn đang chuẩn bị chuyển nhượng tài sản tranh chấp cho bên thứ ba…' }),
      p.khac ? HopGhi('Biện pháp khác', 'Ghi tên biện pháp và căn cứ pháp luật áp dụng ngay trong ô "Lý do" ở trên.') : null), true)))) }); /* W07 */
}

function Bp4() {
  return h(KyGuiSd, { tag: SD_KK, sua: 'bp2',  title: 'Yêu cầu BPKCTT', steps: BP_STEPS, lead: 'Kiểm tra lại đơn, ký số rồi gửi tới Tòa án.', ok: 'bpOk', tep: ['Đơn yêu cầu áp dụng biện pháp khẩn cấp tạm thời'], tepMeta: 'Xem trước đơn', vaiTro: 'Người yêu cầu',
    camDoan: 'Tôi cam kết thực hiện biện pháp bảo đảm khi Tòa án yêu cầu và chịu trách nhiệm bồi thường thiệt hại nếu yêu cầu áp dụng biện pháp khẩn cấp tạm thời của tôi không đúng.',
    top: h(F, null, FCard('Xem lại đơn yêu cầu', RvKV([['Biện pháp đề nghị', '[Biện pháp đã chọn]'], ['Đối tượng bị áp dụng', 'Trần Văn Bình'], ['Địa chỉ người bị áp dụng', 'Số 12 Trần Thái Tông, Phường Cầu Giấy, Thành phố Hà Nội'], ['Giá trị đề nghị', '—'], ['Biện pháp bảo đảm', 'Chưa thực hiện, chờ Tòa án ấn định'], ['Tài sản, tài khoản liên quan', '—'], ['Lý do', '[Lý do đã trình bày]'], ['Tài liệu chứng minh (0 tệp)', 'Chưa đính kèm tài liệu nào.']]), true),
      h(NvCall, { tone: 'warning', title: 'Hệ quả nếu yêu cầu không đúng' }, 'Nếu việc áp dụng biện pháp khẩn cấp tạm thời không đúng và gây thiệt hại, bạn phải bồi thường theo biện pháp bảo đảm đã cam kết.')) });
}

function BpOk() {
  return h(OkSd, { title: 'Đã gửi đơn yêu cầu áp dụng biện pháp khẩn cấp tạm thời', text: 'Đơn đã được gửi đến Tòa án. Văn bản trả lời (quyết định áp dụng hoặc thông báo không chấp nhận) và yêu cầu nộp biện pháp bảo đảm, nếu có, sẽ đến Hộp thư tống đạt và mục Nghĩa vụ tài chính.',
    info: [['Mã tiếp nhận', '[Mã tiếp nhận]', 1], ['Đơn liên quan', 'TN-20261020-0012', 1], ['Trạng thái', 'Đã gửi']],
    btns: h(F, null, Btn('Xem đơn liên quan', 'primary', { 'data-pt-go': 'backTo:appDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applications' })) });
}

function KyKhoa(t) { return h('div', { className: 'q5-ky', role: 'status' }, h(T.Icon, { name: 'checkCircle' }), h('p', null, t)); }

function KhoaVung(khoa, body) { return khoa ? h('div', { className: 'q5-khoa', inert: '' }, body) : body; }

function TrChan(p) {
  var thuLy = p.k === 'thuLy';
  return h(Phone, { cls: 'ph-ok' }, h(Body, { cls: 'ph-ok-b' }, h('div', { className: 'ph-success' }, h('span', { className: 'ph-success-ico q2-chan-ico' }, h(T.Icon, { name: 'alert' })), h('h2', null, 'Không thể tạo đơn thay đổi, rút yêu cầu khởi kiện'),
      P(thuLy ? h(F, null, 'Đơn khởi kiện ', h('b', null, 'TN-20261005-0003'), ' đã được Tòa án thụ lý và hình thành vụ án ', h('b', null, 'DS-2026-0012'), ' (Đã thụ lý vụ án).') : h(F, null, 'Đơn khởi kiện ', h('b', null, 'TN-20261020-0012'), ' chưa được Tòa án tiếp nhận.'), 'ph-muted')),
    thuLy ? h(F, null, P('Theo quy định tố tụng, sau khi đã hình thành vụ án (Tòa án đã thụ lý), bạn không thực hiện tạo đơn thay đổi, rút yêu cầu từ màn hình đơn khởi kiện. Mọi yêu cầu thay đổi, rút hoặc bổ sung sẽ được xem xét và xử lý trực tiếp trong quá trình giải quyết vụ án tại Tòa án.', 'ph-muted dt-small'),
      Blk(null, Rows([['Đơn khởi kiện', 'TN-20261005-0003'], ['Vụ án liên quan', 'DS-2026-0012'], ['Tên vụ án', 'Tranh chấp quyền sử dụng đất']])))
      : P('Chỉ thực hiện được khi đơn ở trạng thái "Đã tiếp nhận" hoặc "Đang giải quyết".', 'ph-muted dt-small')),
    h('div', { className: 'ph-col ph-ok-foot' }, Btn('Quay lại chi tiết đơn', 'primary', { icon: 'chevronLeft', 'data-pt-go': 'back' }), thuLy ? Btn('Về danh sách đơn', 'secondary', { 'data-pt-go': 'reset:records,applications' }) : null));
}

/* ---- bước Tài liệu theo bước 5 Soạn đơn ---- */
function PbsS2(loai, err) {
  return PbsWz2(loai, 2, TlSd({ title: 'Tài liệu Tòa án yêu cầu bổ sung', desc: 'Chọn tài liệu sẵn có trong Kho dữ liệu cá nhân hoặc tải lên tệp mới. PDF, JPG, PNG, DOCX · tối đa 10MB/tệp.', f: err ? [] : [['Biên nhận đặt cọc', 'bien-nhan-dat-coc.pdf', 'Bản chính']], loi: err ? ['Tải lên tài liệu Tòa án yêu cầu bổ sung.'] : [] }));
}
function n7TepTuyChon(rut) { return TlSd({ title: 'Tài liệu kèm theo (tùy chọn)', desc: rut ? 'Tài liệu chứng minh lý do rút, ví dụ biên bản thỏa thuận, biên nhận thanh toán.' : 'Chứng cứ cho phần yêu cầu thay đổi, bổ sung, ví dụ chứng từ thiệt hại mới, kết quả giám định.' }); }
function Pkn2(loai) {
  return PknWz(loai, 2, TlSd({ title: 'Tài liệu, chứng cứ kèm theo', desc: 'Thông báo trả lại [đơn bị trả lại] của Tòa án được hệ thống tự đính kèm. Bạn chỉ cần thêm tài liệu, chứng cứ do bạn cung cấp (nếu có). PDF, JPG, PNG, DOCX · tối đa 10MB/tệp.', he: [['Thông báo trả lại [đơn bị trả lại]', 'Hệ thống tự đính kèm']], f: [['Biên lai nộp tài liệu 25/10', 'bien-lai-nop-tai-lieu-25-10.pdf', 'Bản chính']] }));
}
function Kcs3() { return KcsWz(3, TlSd({ desc: 'Tài liệu kèm theo đơn kháng cáo sau khi sửa đổi, bổ sung. PDF, JPG, PNG, DOCX · tối đa 10MB/tệp.', f: [['Biên bản đo đạc', 'bien-ban-do-dac.pdf', 'Bản sao có chứng thực']] })); }
function Kqh3() { return KqhWz(3, TlSd({ title: 'Chứng cứ về trở ngại khách quan', desc: 'Giấy ra viện, xác nhận của cơ quan có thẩm quyền… PDF, JPG, PNG, tối đa 10 MB mỗi tệp.', f: [['Giấy ra viện', 'giay-ra-vien.pdf', 'Bản chính']] })); }
var SD_LOI_TEP = ['Tài liệu 1: Vui lòng nhập tên tài liệu.', 'Tài liệu 1: Vui lòng chọn loại tài liệu.'];
function Gs3(p) { return GsWz(p.k, 3, TlSd({ title: 'Tài liệu bổ sung', f: [[p.err ? '' : 'Biên bản đo đạc hiện trạng', 'bien-ban-do-dac-hien-trang.pdf', p.err ? '' : 'Bản sao có chứng thực']], loi: p.err ? SD_LOI_TEP : [] })); }
function Mg3(p) {
  p = p || {};
  return WzSd({ title: 'Miễn, giảm án phí', tag: SD_KK2, steps: MG_STEPS, n: 3, go: 'mg4', body: TlSd({ title: 'Tài liệu, chứng cứ chứng minh diện miễn, giảm', desc: 'PDF, JPG, PNG, DOCX — tối đa 10 MB mỗi tệp. Bắt buộc ít nhất một tệp. Có thể chọn tài liệu sẵn có trong Kho dữ liệu cá nhân.',
    f: [[p.err ? '' : 'Giấy xác nhận hộ nghèo', 'giay-xac-nhan-ho-ngheo.pdf', p.err ? '' : 'Bản chính']], loi: p.err ? SD_LOI_TEP : [] }) });
}
function Bp3(p) {
  p = p || {}; var b = React.useState('chua');
  return WzSd({ title: 'Yêu cầu BPKCTT', tag: SD_KK, steps: BP_STEPS, n: 3, go: 'bp4', body: h(F, null,
    FCard('Thực hiện biện pháp bảo đảm', h(F, null, Lead('Theo khoản 1 Điều 136, một số biện pháp buộc người yêu cầu gửi khoản bảo đảm. Nếu chưa gửi, Tòa án sẽ thông báo mức và hạn nộp.'),
      h(ChonThe, { label: 'Biện pháp bảo đảm', v: b[0], onPick: b[1], items: [{ id: 'chua', t: 'Chưa thực hiện', d: 'Chờ Tòa án ấn định mức bảo đảm.' }, { id: 'co', t: 'Đã hoặc sẽ gửi khoản bảo đảm', d: 'Nhập giá trị khoản bảo đảm bên dưới.' }] }),
      b[0] === 'co' ? Tf('Giá trị bảo đảm (đồng)', { required: true, inputMode: 'numeric' }) : null), true),
    TlSd({ title: 'Tài liệu, chứng cứ chứng minh căn cứ áp dụng', desc: 'Tài liệu thể hiện nguy cơ hoặc quyền, lợi ích cần bảo vệ khẩn cấp. PDF, JPG, PNG, DOCX · tối đa 10MB/tệp.', f: [[p.err ? '' : 'Ảnh chụp tin rao bán nhà', 'anh-chup-tin-rao-ban-nha.jpg', p.err ? '' : 'Bản chính']], loi: p.err ? SD_LOI_TEP : [] })) });
}
function Sd3(p) { p = p || {}; return WzSd({ title: 'Sửa đơn theo yêu cầu', tag: SD_KK, steps: SD_STEPS, n: 3, go: 'sd4', body: TlSd({ title: 'Tài liệu bổ sung', f: [[p.err ? '' : 'Hợp đồng vay tài sản', 'hop-dong-vay-ban-sao.pdf', p.err ? '' : 'Bản sao có chứng thực']], loi: p.err ? SD_LOI_TEP : [] }) }); }
function Tr4(p) {
  p = p || {}; var rut = TR_UI.loai === 'TD-02';
  return WzSd({ title: 'Thay đổi, rút yêu cầu', tag: SD_KK3, steps: trSteps(), n: 4, go: 'tr5', body: TlSd({ desc: rut ? 'Tài liệu chứng minh lý do rút, ví dụ biên bản bàn giao, biên nhận thanh toán, văn bản thỏa thuận.' : 'Chứng cứ cho phần yêu cầu thay đổi, bổ sung, ví dụ biên bản đối chiếu công nợ, chứng từ thiệt hại mới.',
    f: [['Biên nhận thanh toán', 'bien-nhan-thanh-toan.pdf', p.err ? '' : 'Bản chính']], loi: p.err ? ['Tài liệu 1: Vui lòng chọn loại tài liệu.'] : [] }) });
}
/* rút đơn đã có yêu cầu rút – hộp thoại kiểu Soạn đơn */
function RdAgain() { return h(F, null, h(DonChiTiet), h(SdDlg, { illo: ['nopDon', 'alert'], title: 'Tạo thêm yêu cầu rút đơn?', desc: 'Đơn này đã có yêu cầu rút đơn rồi. Bạn có chắc chắn muốn tạo và nộp thêm yêu cầu rút đơn mới không?', ok: 'Tạo yêu cầu mới', go: 'rd1' })); }

/* ===== Nhóm 6 – Đề nghị xem xét lại quyết định công nhận kết quả hòa giải thành: trình tự 4 bước theo web (W01–W08), căn cứ chọn 1 (bỏ M03), bỏ trạng thái chưa có quyết định (M04); giữ lối vào (M01), ô bất khả kháng (M02), ký số tài liệu (M05) ===== */
var HGR_STEPS = ['Quyết định đề nghị xem xét lại', 'Căn cứ đề nghị', 'Tài liệu kèm theo', 'Xem lại & ký gửi'];
var HGR_QD = [{ id: 'q1', t: 'QĐ-15/2026/QĐ-CNHG', d: 'Ngày 25/10/2026 · Tranh chấp hợp đồng mua bán · còn 6 ngày' }, { id: 'q2', t: 'QĐ-09/2026/QĐ-CNHG', d: 'Ngày 12/10/2026 · Tranh chấp hợp đồng thuê nhà · quá hạn 3 ngày' }];
function HgrWz(n, body, nhap) { return WzSd({ title: 'Đề nghị xem xét lại quyết định công nhận', tag: SD_HG, steps: HGR_STEPS, n: n, go: 'hgr' + (n + 1), body: h(F, null, nhap ? h('div', { className: 'q6-nhap' }, h(T.StatusBadge, { tone: 'neutral', icon: false }, 'Đang soạn nháp')) : null, body) }); }
function Hgr1(p) {
  p = p || {}; var q = React.useState(p.qua ? 'q2' : 'q1'), tn = React.useState(false), lt = React.useState(''), qua = q[0] === 'q2';
  return h(F, null, HgrWz(1, h(F, null,
    FCard('Quyết định công nhận kết quả hòa giải thành', h(F, null, Lead('Chọn quyết định bạn đề nghị xem xét lại.'), h(OptCards, { label: 'Quyết định công nhận', cur: q[0], onPick: q[1], items: HGR_QD })), true),
    h('section', { className: 'q4-han' + (qua ? ' q4-han-do' : '') }, h('small', null, 'Thời hạn đề nghị (15 ngày)'), h('b', null, qua ? 'Đã quá hạn 3 ngày' : 'Hạn xử lý: Còn 6 ngày (đến ngày 09/11/2026)'),
      h('p', { className: 'q4-han-hq' }, 'Lưu ý: Tính từ ngày nhận được quyết định hoặc từ ngày biết được nội dung quyết định. Quá thời hạn này, đề nghị xem xét lại sẽ không được chấp nhận thụ lý.')),
    h('div', { className: 'ph-commit hg-cb' }, h(T.Checkbox, { checked: tn[0], onChange: function (e) { tn[1](e.target.checked); }, label: 'Có thời gian bất khả kháng/trở ngại khách quan cần loại trừ khi tính hạn' }),
      tn[0] ? Tf('Thời gian, lý do bất khả kháng hoặc trở ngại khách quan', { required: true, value: lt[0], onChange: function (e) { lt[1](e.target.value); }, placeholder: 'Nêu khoảng thời gian và lý do bất khả kháng/trở ngại khách quan' }) : null),
    FCard('Chi tiết quyết định', RvKV([['Số quyết định', qua ? 'QĐ-09/2026/QĐ-CNHG' : 'QĐ-15/2026/QĐ-CNHG'], ['Ngày ra quyết định', qua ? '12/10/2026' : '25/10/2026'], ['Vụ việc liên quan', qua ? 'Tranh chấp hợp đồng thuê nhà' : 'Tranh chấp hợp đồng mua bán'], ['Tòa án ra quyết định', COURT1], ['Hòa giải viên', '[Hòa giải viên]'], ['Nội dung công nhận', '[Nội dung công nhận]']]), true)), p.nhap),
    p.nhap ? h(AutoSnack, { m: '[Đã nạp bản nháp]' }) : null);
}
function Hgr2(p) {
  p = p || {}; var cc = React.useState(p.err ? '' : 'c2'), nd = React.useState(p.err ? 'Không tự nguyện' : 'Tại buổi hòa giải ngày 15/10/2026, tôi đã nêu ý kiến không đồng ý nhưng biên bản vẫn ghi là thỏa thuận thành, xâm phạm đến quyền lợi của tôi.');
  return HgrWz(2, h(F, null,
    FCard('Căn cứ đề nghị — Điều 33 Luật Hòa giải, đối thoại tại Tòa án', h(F, null, h(ChonThe, { label: 'Căn cứ đề nghị', v: cc[0], onPick: cc[1], items: HG_CC_33.map(function (c, i) { return { id: 'c' + i, t: c }; }) }),
      p.err && !cc[0] ? h('p', { className: 'q2-err', role: 'alert' }, h(T.Icon, { name: 'alert' }), 'Vui lòng chọn căn cứ đề nghị xem xét lại.') : null), true),
    FCard('Trình bày căn cứ', h(F, null, Lead('Nêu rõ diễn biến sự việc, mốc thời gian và chỉ ra cụ thể nội dung nào của quyết định bị ảnh hưởng, vi phạm.'),
      n7Tf('Trình bày căn cứ', nd, { required: true, min: 30, max: 2000, rows: 5, placeholder: 'Tại buổi hòa giải ngày…, tôi đã nêu ý kiến không đồng ý nhưng biên bản vẫn ghi là thỏa thuận thành, xâm phạm đến quyền lợi…', error: p.err ? 'Trình bày căn cứ cụ thể (tối thiểu 30 ký tự).' : undefined })), true),
    HopGhi('Tòa án cấp trên trực tiếp giải quyết', 'Đơn được chuyển đến Tòa án cấp trên trực tiếp của Tòa án đã ra quyết định, mở phiên họp xem xét trong thời hạn luật định.'),
    HopGhi('Đề nghị không làm tạm dừng thi hành', 'Quyết định vẫn được thi hành trong thời gian chờ xem xét, trừ trường hợp có quyết định khác của Tòa án có thẩm quyền.')));
}
function Hgr3(p) {
  p = p || {};
  return HgrWz(3, TlSd({ title: 'Tài liệu chứng minh căn cứ', desc: 'Biên bản hòa giải, tài liệu về quan hệ giữa hòa giải viên và bên kia, chứng cứ cho thấy thỏa thuận không tự nguyện hoặc trái pháp luật.', f: p.err ? [] : [['Biên bản hòa giải', 'bien-ban-hoa-giai.pdf', 'Bản chính']], loi: p.err ? ['Vui lòng tải lên ít nhất một tài liệu chứng minh căn cứ đề nghị.'] : [] }));
}
function Hgr4() {
  return h(KyGuiSd, { title: 'Đề nghị xem xét lại quyết định công nhận', tag: SD_HG, steps: HGR_STEPS, ok: 'hgrOk', sua: 'hgr2', kyTitle: 'Ký số đơn đề nghị xem xét lại', tep: ['Đơn đề nghị xem xét lại.pdf', 'bien-ban-hoa-giai.pdf'], tepMeta: 'Xem trước đơn', vaiTro: 'Người đề nghị', sendLabel: 'Ký & Gửi đơn', lead: 'Kiểm tra lại đơn, ký số rồi gửi tới Tòa án.',
    top: FCard('Đề nghị xem xét lại', RvKV([['Quyết định bị đề nghị xem xét lại', 'QĐ-15/2026/QĐ-CNHG · ' + COURT1], ['Tòa án nhân dân giải quyết đề nghị', 'Tòa án nhân dân cấp trên trực tiếp của ' + COURT1], ['Hòa giải viên tiến hành hòa giải', '[Hòa giải viên]'], ['Thời hạn đề nghị (15 ngày)', 'Còn 6 ngày'], ['Căn cứ đề nghị (Điều 33 Luật Hòa giải, đối thoại tại Tòa án)', HG_CC_33[2]], ['Nội dung trình bày đề nghị xem xét lại', 'Tại buổi hòa giải ngày 15/10/2026, tôi đã nêu ý kiến không đồng ý nhưng biên bản vẫn ghi là thỏa thuận thành…']]), true),
    bottom: h(F, null, HopGhi('Tòa án cấp trên trực tiếp giải quyết đề nghị', 'Theo Điều 33 Luật Hòa giải, đối thoại tại Tòa án năm 2020, Tòa án nhân dân cấp trên trực tiếp có thẩm quyền thụ lý, xem xét ra quyết định hủy bỏ hoặc giữ nguyên quyết định công nhận kết quả hòa giải thành.'),
      HopGhi('Đây là thủ tục cuối cùng đối với quyết định này', 'Quyết định giải quyết của Tòa án nhân dân cấp trên trực tiếp là quyết định cuối cùng, có hiệu lực pháp luật thi hành ngay và không bị kháng cáo, kháng nghị theo thủ tục phúc thẩm, giám đốc thẩm hoặc tái thẩm.')),
    camDoan: 'Tôi cam đoan các thông tin đề nghị xem xét lại và tài liệu đính kèm trên đây là hoàn toàn đúng sự thật, tự nguyện và chịu mọi trách nhiệm trước pháp luật về nội dung đã khai.' });
}
function HgrOk() {
  return h(OkSd, { title: 'Đã nộp đơn đề nghị xem xét lại quyết định công nhận kết quả hòa giải thành.', text: 'Đơn được chuyển đến Tòa án cấp trên trực tiếp. Tòa án mở phiên họp xem xét trong thời hạn luật định và thông báo kết quả qua Hộp thư tống đạt. Quyết định vẫn được thi hành trong thời gian chờ xem xét.',
    info: [['Mã hồ sơ', '[Mã hồ sơ]'], ['Quyết định đề nghị', 'QĐ-15/2026/QĐ-CNHG']],
    btns: h(F, null, Btn('Xem đơn liên quan', 'primary', { 'data-pt-go': 'backTo:mediationDone' }), Btn('Về trang chủ', 'secondary', { 'data-pt-go': 'tab:home' })) });
}

/* ===== v357: soạn đơn khiếu nại, tố cáo, kiến nghị theo chuẩn Soạn đơn – tiêu đề là tên thủ tục như web, bỏ thẻ loại đơn đầu bước, Xem lại chia khối con có nút sửa, tài liệu kiểu bước 5, Rút đơn có thanh bước, màn đã gửi cho khiếu nại lần hai / tố cáo tiếp / ý kiến ===== */
/* ===== Khiếu nại, tố cáo, kiến nghị – soạn đơn theo chuẩn Soạn đơn (giữ thứ tự khối, tab) ===== */
/* bỏ khối thẻ loại đơn + tên thủ tục ở đầu bước; tiêu đề là tên thủ tục như tiêu đề trang của web */
function KnhWz(k, n, body, last) { return Wz({ title: KNH[k].ten, steps: knhSteps(k), n: n, go: k + (n + 1), body: body, last: last }); }
function KnvWz(k, n, body, last, o) { return Wz({ title: knvTen(k, o), steps: knvSteps(k), n: n, go: k + (n + 1) + knvSfx(o), body: body, last: last }); }
/* chia các dòng xem lại thành khối con theo bước: chia = [[tên khối, [nhãn đầu dòng…], màn sửa]]; dòng không khớp → khối cuối */
function knChia(rows, chia) {
  var g = chia.map(function () { return []; });
  rows.forEach(function (r) {
    var i = -1; chia.forEach(function (c, j) { if (i < 0 && c[1].some(function (l) { return String(r[0]).indexOf(l) === 0; })) i = j; });
    g[i < 0 ? g.length - 1 : i].push(r);
  });
  return chia.map(function (c, j) { return g[j].length ? h(SdBlk, { key: j, t: c[0], go: c[2] }, RvKV(g[j])) : null; });
}
/* KyGui: nếu có o.chia thì phần Xem lại hiện các khối con gập/mở có nút sửa (như bước 6 Soạn đơn); không có thì giữ như cũ */
function KyGui(o) {
  var ky = React.useState(false), sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), da = ky[0];
  var tep = [o.donTep].concat(o.tl.map(function (d) { return d[1]; }));
  return Wz({ title: o.title, steps: o.steps, n: o.n, body: h(F, null, h('span', { ref: anchor, hidden: true }),
    FCard(o.rvTitle, h(F, null, o.rvDesc ? Lead(o.rvDesc) : null, o.chia ? knChia(o.review, o.chia) : RvKV(o.review)), true),
    FCard('Ký số', h(F, null, kyMoTa(o.moTa),
      h('ul', { className: 'ph-ky' },
        h('li', null, h('div', null, h('b', null, o.don)), IcoBtn('eye', 'Xem ' + o.don)),
        laTC() ? h(KyTcRows, { tep: tep, onXong: function () { ky[1](true); } }) : h('li', null, h('span', { className: 'ph-ky-no' }, '1'), h('div', null, h('b', null, 'Hoàng Dương'), h('small', null, o.vaiTro), da ? h('small', { className: 'ph-ky-da' }, KY_LUC) : null),
          da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn', onClick: function () { sh[1](true); } }, 'Ký số')))), true, da ? 'signed' : 'unsigned'),
    o.tl.length ? FCard('Tài liệu đính kèm (' + o.tl.length + ' tệp)', h('ul', { className: 'ph-ky' }, o.tl.map(function (d) {
      return h('li', { key: d[1] }, h('div', null, h('b', null, d[0]), h('small', null, d[1])), da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : null, IcoBtn('eye', 'Xem ' + d[0]));
    })), true) : null,
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { label: o.camDoan })),
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: tep, onClose: function () { sh[1](false); }, onKy: function () { sh[1](false); ky[1](true); } }), host) : null),
    last: Btn(o.btn, 'primary', da ? { 'data-pt-go': 'replace:' + o.ok } : { disabled: true, title: 'Vui lòng ký số trước khi gửi' }) });
}
/* khiếu nại trả lại đơn: "Thủ tục bạn đã chọn" dùng khối thường như các luồng trong vụ án */
function KrThuTuc() {
  return FCard('Thủ tục bạn đã chọn', h(F, null, h('div', { className: 'kn-tt-h' }, h('b', null, 'Khiếu nại việc trả lại đơn khởi kiện'), h(T.Tag, null, 'Điều 194 BLTTDS')),
    RvKV([['Gửi tới', 'Chánh án Tòa án đã trả lại đơn khởi kiện'], ['Hạn cuối khiếu nại', '10/11/2026'], ['Thủ tục áp dụng', '10 ngày kể từ ngày nhận được văn bản trả lại đơn khởi kiện (Điều 194.1)']])), true);
}

/* màn một khối có thanh bước như trình tự soạn đơn (Rút đơn khiếu nại, tố cáo) */
function SubStep(title, steps, n, body, footer) {
  return h(Phone, { cls: 'ph-hd' }, h('div', { className: 'ph-hd-step' }, h(T.AppBar, { variant: 'plain', title: title, onBack: noop }), h(StepStrip, { cur: n, steps: steps })),
    h(Body, { cls: 'ph-plain ph-steps' }, body), footer ? h('div', { className: 'ph-foot' }, footer) : null);
}
/* đã gửi khiếu nại lần hai / tố cáo tiếp / ý kiến (web: thẻ kết quả – Mã hồ sơ mới, Hồ sơ gốc, nút Xem hồ sơ) */
function KnTiepOk(p) {
  return h(Phone, { cls: 'ph-ok' }, h(Body, { cls: 'ph-ok-b' },
    h('div', { className: 'ph-success' }, h('span', { className: 'ph-success-ico' }, h(T.Icon, { name: 'checkCircle' })), h('h2', null, p.title), P('Yêu cầu của bạn đã được ký số và chuyển tới người có thẩm quyền giải quyết. Kết quả sẽ được gửi vào Hộp thư tống đạt điện tử của bạn.', 'ph-muted')),
    h('dl', { className: 'ph-rvkv ph-ok-rows' }, [['Mã hồ sơ mới', h('span', { className: 'ph-ok-ma' }, '[Mã hồ sơ mới]')], ['Hồ sơ gốc', h('span', { className: 'tp-num' }, p.goc)]].map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0]), h('dd', null, r[1])); }))),
    h('div', { className: 'ph-col ph-ok-foot' }, Btn('Xem hồ sơ', 'primary', { 'data-pt-go': 'backTo:' + p.ve })));
}
/* khối "Khiếu nại văn bản, thông báo tố tụng" ở Chi tiết đơn: tiêu đề + nhãn hạn như khối yêu cầu bổ sung (v354), nút rộng hết khối */
function KnVanBan(p) {
  return h('section', { className: 'q1-kn kn-vb' }, h('div', { className: 'kn-vb-h' }, h('b', null, 'Khiếu nại văn bản, thông báo tố tụng'),
      h('span', { className: 'q1n-han' + (p.het ? ' q1n-han-het' : '') }, h(T.Icon, { name: 'clock' }), p.het ? 'Đã hết thời hiệu khiếu nại' : 'Hạn khiếu nại: 23/11/2026')),
    h('p', null, 'Nếu cho rằng văn bản, thông báo tố tụng này trái pháp luật, bạn có quyền gửi đơn khiếu nại tới Tòa án.' + (p.het ? ' Hạn khiếu nại: 05/11/2026.' : '')),
    h(T.Button, { variant: 'secondary', icon: 'pen', className: 'kn-vb-btn', disabled: !!p.het, 'data-pt-go': p.het ? undefined : 'complaintForm' }, 'Khiếu nại văn bản này'));
}
function Knh5(k) {
  var x = KNH[k];
  return KyGui({ title: KNH[k].ten, steps: knhSteps(k), n: 5, rvTitle: 'Xem lại, ký số và gửi', rvDesc: 'Sau khi gửi, bạn không sửa được đơn. Muốn thay đổi thì rút đơn và gửi đơn mới.',
    chia: [[knhSteps(k)[0], ['Loại đơn', 'Người đại diện', 'Tổ chức gửi đơn'], k + '1'], [knhSteps(k)[1], [x.b2], k + '2'], [knhSteps(k)[2], ['Tòa án nhận đơn', 'Tiêu đề đơn', 'Nội dung'], k + '3'], [knhSteps(k)[3], ['Tài liệu kèm theo', 'Tùy chọn tố cáo'], k + '4']], review: [['Loại đơn', x.loai + ' — ' + x.ten], [laTC() ? 'Tổ chức gửi đơn' : 'Người đại diện', 'Hoàng Dương · CCCD: 001090012345 · SĐT: 0912345678 · [địa chỉ liên hệ]'], [x.b2, '[Họ tên] · [Chức vụ] · [Nơi công tác]'], ['Tòa án nhận đơn', COURT1], ['Tiêu đề đơn', '[Tiêu đề đơn]'], ['Nội dung', '[Nội dung]'], ['Tài liệu kèm theo', 'Ảnh chụp biên bản (Khác)']].concat(k === 'ktc' ? [['Tùy chọn tố cáo', 'Không']] : []),
    moTa: 'Đơn và toàn bộ tài liệu kèm theo được ký một lần bằng chữ ký số cá nhân của Hoàng Dương.', don: 'Đơn ' + x.w, donTep: 'don-' + k + '.pdf', vaiTro: 'Người gửi đơn', tl: [['Ảnh chụp biên bản', 'anh-chup-bien-ban.pdf']],
    camDoan: 'Tôi cam đoan nội dung đơn và tài liệu kèm theo là đúng sự thật, chịu trách nhiệm trước pháp luật.', btn: 'Gửi đơn', ok: k + 'Ok' });
}

function Knv4(k, o) {
  o = o || {}; var t = knvTT(k), tc = k === 'ktv', qd = k === 'kqd';
  var va = o.kg ? 'Không gắn vụ án' : 'DS-2026-0012 · Tranh chấp hợp đồng vay tài sản';
  var review = qd ? [['Thủ tục', knvTen(k, o)], ['Vụ án', va], o.lan2 ? ['Hồ sơ lần đầu', 'KNTT-2026-0009'] : null, ['Văn bản bị khiếu nại', o.lan2 ? 'Quyết định giải quyết khiếu nại · số 12/2026/QĐ-GQKN' : 'Thông báo không chấp nhận yêu cầu thu thập chứng cứ · số 15/2026/TB-TA'],
    ['Cơ quan giải quyết', o.lan2 ? 'Chánh án Tòa án cấp trên trực tiếp' : 'Chánh án Tòa án đã ra văn bản'], ['Tóm tắt', '[Tóm tắt nội dung khiếu nại]'], ['Yêu cầu giải quyết', '[Yêu cầu giải quyết khiếu nại]'], ['Tài liệu, chứng cứ', '[Tài liệu, chứng cứ]']]
    : [['Loại việc', knvTen(k, o)], ['Vụ án liên quan', va], ['Tòa án', o.lan2 ? 'Tòa án nhân dân Thành phố Hà Nội' : COURT1], o.kg ? ['Số hồ sơ, vụ việc khai', '45/2026/TLST-DS'] : null,
      o.lan2 ? ['Hồ sơ lần đầu', 'KNTT-2026-0009'] : null,
      [tc ? 'Người bị tố cáo' : 'Người có hành vi bị khiếu nại', 'Nguyễn Văn B · Thư ký Tòa án'], tc ? null : ['Ngày biết được hành vi', '10/10/2026'], ['Thủ tục áp dụng', t.ten], ['Cơ quan giải quyết', t.cq],
      [tc ? 'Nội dung tố cáo (tóm tắt)' : 'Tóm tắt', '[Tóm tắt]'], [tc ? 'Yêu cầu, đề nghị' : 'Yêu cầu giải quyết', '[Yêu cầu]'],
      ['Tư cách người ' + KNV[k].w, 'Hoàng Dương (chính bạn) · ' + (o.kg && !tc ? 'Người bảo vệ quyền và lợi ích hợp pháp của đương sự' : o.kg ? '—' : 'Nguyên đơn')],
      tc ? ['Bảo vệ người tố cáo', 'Giữ bí mật họ tên, địa chỉ, bút tích và thông tin cá nhân của người tố cáo; đề nghị áp dụng biện pháp bảo vệ người tố cáo'] : null];
  var tl = qd && !o.lan2 ? [['Bản sao quyết định bị khiếu nại', 'ban-sao-quyet-dinh.pdf']] : o.kg && k === 'khv' ? [['Giấy tờ chứng minh tư cách người bảo vệ', 'giay-chung-nhan-nguoi-bao-ve.pdf']] : tc ? [['Tài liệu, chứng cứ chứng minh nội dung tố cáo', 'chung-cu-to-cao.pdf']] : [];
  return KyGui({ title: knvTen(k, o), steps: knvSteps(k), n: 4, rvTitle: 'Xem lại & ký gửi', rvDesc: 'Kiểm tra lại toàn bộ thông tin trước khi ký số và gửi đến Tòa án.',
    review: review.filter(Boolean), chia: [[knvSteps(k)[0], ['Thủ tục', 'Loại việc', 'Vụ án', 'Tòa án', 'Số hồ sơ', 'Hồ sơ lần đầu', 'Văn bản bị khiếu nại', 'Cơ quan giải quyết', 'Người có hành vi', 'Người bị tố cáo', 'Ngày biết'], k + '1' + knvSfx(o)], [knvSteps(k)[1], ['Tóm tắt', 'Nội dung tố cáo', 'Yêu cầu', 'Tư cách', 'Bảo vệ người tố cáo'], k + '2' + knvSfx(o)], [knvSteps(k)[2], ['Tài liệu'], k + '3' + knvSfx(o)]],
    moTa: 'Xem trước đơn và ký số từ xa bằng chữ ký số cá nhân (VNPT / Viettel / BKAV-CA). Ký xong, tích cam đoan rồi bấm “Gửi đơn”.', don: o.lan2 ? KNV[k].don + ' lần 2' : KNV[k].don, donTep: 'don-' + KNV[k].w.replace(/ /g, '-') + (o.lan2 ? '-lan-2' : '') + '.pdf', vaiTro: 'Người ' + KNV[k].w, tl: tl,
    camDoan: tc ? 'Tôi cam đoan những nội dung tố cáo và tài liệu kèm theo là đúng sự thật; tôi hiểu rằng việc tố cáo sai sự thật có thể bị xử lý theo quy định của pháp luật.' : 'Tôi cam đoan những nội dung khiếu nại và tài liệu kèm theo là đúng sự thật; tôi hiểu rằng việc khiếu nại sai sự thật có thể bị xử lý theo quy định của pháp luật.',
    btn: 'Gửi đơn', ok: 'kvaOk' + (o.lan2 ? 'L' : '') + (tc ? 'Tc' : '') });
}

function KnTiep(p) {
  var nd = React.useState(''), ck = React.useState(false), yk = React.useState(p.yKien ? '' : null), tr = React.useState(false), ky = React.useState(false), sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor);
  var loi = yk[0] === '' ? 'Chọn đồng ý hoặc không đồng ý với dự thảo kết luận.' : (p.yKien ? (yk[0] === 'khong' && nd[0].trim().length < 10 ? 'Nêu rõ căn cứ bạn không đồng ý (tối thiểu 10 ký tự).' : null) : (nd[0].trim().length < 15 ? p.loiNd : null)) || (!ck[0] ? 'Vui lòng xác nhận cam kết trước khi gửi.' : null);
  return SubS(p.eyebrow, h(F, null, h('span', { ref: anchor, hidden: true }), h('p', { className: 'kn-eb' }, p.title),
    FCard('Hồ sơ', RvKV([['Hồ sơ gốc', h('span', { className: 'tp-num' }, p.goc)], ['Mã hồ sơ mới', 'Cấp sau khi gửi']]), true),
    p.note || null,
    p.yKien ? FCard('Văn bản kết quả', DtDocs([['Dự thảo kết luận nội dung tố cáo', 'Kết quả xử lý đã nhận · 28/10/2026']]), true) : null,
    p.yKien ? FCard('Ý kiến của bạn', h(ChonThe, { label: 'Ý kiến của bạn', v: yk[0], onPick: yk[1], items: [{ id: 'dong', t: 'Đồng ý' }, { id: 'khong', t: 'Không đồng ý' }] }), true) : null,
    Tf(p.nhanNd, { multiline: true, value: nd[0], onChange: function (e) { nd[1](e.target.value); }, placeholder: p.yKien ? (yk[0] === 'khong' ? 'Nêu rõ bạn không đồng ý ở điểm nào và căn cứ, tài liệu chứng minh…' : 'Ý kiến thêm (không bắt buộc)…') : p.phNd }),
    h(TaiLieuCard, { title: p.nhanTl, desc: 'Tài liệu đính kèm cần ký số trước khi gửi Tòa án. Định dạng PDF, JPG, PNG, DOCX · tối đa 10MB/tệp.', bat: [], bb0: {}, bs0: [] }),
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { checked: ck[0], onChange: function (e) { ck[1](e.target.checked); }, label: 'Tôi cam kết nội dung trên là đúng sự thật và chịu trách nhiệm trước pháp luật về nội dung đã trình bày.' })),
    tr[0] && loi ? h('p', { className: 'dg-loi', role: 'alert' }, loi) : null,
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: [p.eyebrow], onClose: function () { sh[1](false); }, onKy: function () { sh[1](false); ky[1](true); } }), host) : null),
    Bar(Btn('Hủy', 'secondary', { 'data-pt-go': 'back' }), ky[0] ? Btn('Gửi', 'primary', { 'data-pt-go': 'replace:' + p.okId }) : Btn(p.nut, 'primary', { onClick: function () { if (loi) tr[1](true); else sh[1](true); } })));
}

function KnSecond(p) {
  var tt = !!p.tt;
  return h(KnTiep, { okId: tt ? 'knSecondTtOk' : 'knSecondOk',  eyebrow: 'Khiếu nại lần hai', title: 'Khiếu nại lần hai lên Chánh án Tòa án cấp trên', goc: tt ? 'KNTT-2026-0009' : 'KN-2026-0012', ve: tt ? 'complaintTtDone' : 'complaintDetail',
    note: h(F, null, NvCallS('info', h(F, null, 'Trong thời hạn ', h('b', null, '30 ngày'), ' kể từ ngày nhận Quyết định giải quyết khiếu nại lần đầu (hoặc kể từ ngày hết thời hạn giải quyết lần đầu mà không được giải quyết), bạn có quyền khiếu nại lần hai (Điều 33 Luật Khiếu nại 2011).')),
      NvCallS('success', h(F, null, h('b', null, 'Hồ sơ sẽ được chuyển tới: Tòa án nhân dân Thành phố Hà Nội. '), 'Chánh án Tòa án cấp trên trực tiếp xem xét giải quyết khiếu nại lần hai — quyết định này là quyết định cuối cùng.'))),
    nhanNd: 'Lý do không đồng ý với Quyết định giải quyết lần đầu', phNd: 'Trình bày lý do không đồng ý và chứng cứ mới (nếu có)…', loiNd: 'Nêu rõ lý do không đồng ý với Quyết định giải quyết khiếu nại lần đầu (tối thiểu 15 ký tự).',
    nhanTl: 'Tài liệu, chứng cứ mới', nut: 'Ký số và gửi đơn khiếu nại lần hai', ok: 'Đã gửi đơn khiếu nại lần hai.' });
}

function KnNext() {
  return h(KnTiep, { okId: 'knNextOk',  eyebrow: 'Tố cáo tiếp', title: 'Tố cáo tiếp khi không đồng ý với Kết luận nội dung tố cáo', goc: 'TC-2026-0004', ve: 'complaintDetailTc',
    nhanNd: 'Căn cứ cho rằng việc giải quyết tố cáo lần đầu vi phạm pháp luật', phNd: 'Trình bày cụ thể căn cứ, tình tiết mới (nếu có)…', loiNd: 'Nêu rõ căn cứ cho rằng việc giải quyết tố cáo lần đầu vi phạm pháp luật (tối thiểu 15 ký tự).',
    nhanTl: 'Tài liệu, chứng cứ chứng minh', nut: 'Ký số và gửi văn bản tố cáo tiếp', ok: 'Đã gửi văn bản tố cáo tiếp.' });
}

function KnOpinion() {
  return h(KnTiep, { okId: 'knOpinionOk',  yKien: true, eyebrow: 'Cho ý kiến dự thảo kết luận', title: 'Cho ý kiến về dự thảo kết luận nội dung tố cáo', goc: 'TC-2026-0004', ve: 'complaintDetailTc',
    nhanNd: 'Nội dung ý kiến', nhanTl: 'Tài liệu kèm theo', nut: 'Ký số và gửi ý kiến', ok: 'Đã gửi ý kiến về dự thảo kết luận.' });
}

function KnRut(p) {
  var tc = !!p.tc, word = tc ? 'tố cáo' : 'khiếu nại', b = React.useState(p.b || 0), ht = React.useState('1'), pr = React.useState(''), ld = React.useState('khac_phuc'), lk = React.useState(''), xn = React.useState(false), tr = React.useState(false);
  var loiPr = ht[0] === '0' && pr[0].trim().length < 10 ? 'Nêu rõ phần nội dung ' + word + ' muốn rút (tối thiểu 10 ký tự)' : null, loiLd = ld[0] === 'khac' && lk[0].trim().length < 10 ? 'Nêu rõ lý do rút đơn (tối thiểu 10 ký tự)' : null;
  var ma = tc ? 'TC-2026-0004' : 'KN-2026-0012', lyDo = ld[0] === 'khac' ? lk[0] : KN_LD_RUT.filter(function (x) { return x.id === ld[0]; })[0].t;
  var hd = h(T.Stepper, { steps: ['Lý do rút', 'Xác nhận & gửi'], current: b[0] });
  var body = b[0] === 0 ? h(F, null, NvCallS('info', tc ? 'Người tố cáo có quyền rút toàn bộ hoặc một phần nội dung tố cáo trước khi người giải quyết ra kết luận nội dung tố cáo (Điều 33 Luật Tố cáo 2018).' : 'Người khiếu nại có thể rút khiếu nại tại bất cứ thời điểm nào trong quá trình khiếu nại và giải quyết khiếu nại (Điều 10 Luật Khiếu nại 2011; Điều 194, 504 Bộ luật Tố tụng dân sự 2015 đối với khiếu nại trong tố tụng).'),
    FCard('Hình thức rút', h(F, null, h(T.Tabs, { variant: 'chip', label: 'Hình thức rút', value: ht[0], onChange: ht[1], items: [{ key: '1', label: 'Rút toàn bộ' }, { key: '0', label: 'Rút một phần' }] }),
      ht[0] === '0' ? Tf('Phần nội dung muốn rút', { multiline: true, value: pr[0], onChange: function (e) { pr[1](e.target.value); }, placeholder: 'Nêu rõ phần nội dung ' + word + ' muốn rút…', error: tr[0] && loiPr ? loiPr : undefined }) : null), true),
    FCard('Lý do rút đơn', h(F, null, h(ChonThe, { label: 'Lý do rút đơn', v: ld[0], onPick: ld[1], items: KN_LD_RUT }),
      ld[0] === 'khac' ? Tf('Lý do khác', { multiline: true, value: lk[0], onChange: function (e) { lk[1](e.target.value); }, placeholder: 'Nêu rõ lý do rút đơn…', error: tr[0] && loiLd ? loiLd : undefined }) : null), true))
    : h(F, null, FCard('Xác nhận', RvKV([['Hồ sơ rút', h('span', { className: 'tp-num' }, ma)], ['Hình thức', ht[0] === '1' ? 'Rút toàn bộ' : 'Rút một phần'], ['Lý do', lyDo]].concat(ht[0] === '0' ? [['Phần nội dung xin rút', pr[0]]] : [])), true),
      NvCallS('warning', 'Sau khi rút, hồ sơ sẽ không được xem xét tiếp.'),
      h('div', { className: 'ph-commit' }, h(T.Checkbox, { checked: xn[0], onChange: function (e) { xn[1](e.target.checked); }, label: 'Tôi xác nhận rút đơn ' + word + ' này.', error: tr[0] && !xn[0] ? 'Vui lòng xác nhận trước khi gửi' : undefined })));
  return SubStep('Rút đơn ' + word, ['Lý do rút', 'Xác nhận & gửi'], b[0] + 1, body,
    b[0] === 0 ? Bar(Btn('Hủy', 'secondary', { 'data-pt-go': 'back' }), Btn(h(F, null, 'Tiếp tục', h(T.Icon, { name: 'chevronRight' })), 'primary', { onClick: function () { if (loiPr || loiLd) tr[1](true); else { tr[1](false); b[1](1); } } }))
      : Bar(Btn('Quay lại', 'secondary', { onClick: function () { b[1](0); } }), xn[0] ? Btn('Xác nhận rút đơn', 'primary', { 'data-pt-go': 'backTo:complaints', 'data-pt-snack': 'Đã rút ' + word + ' hồ sơ ' + ma + '.' }) : Btn('Xác nhận rút đơn', 'primary', { onClick: function () { tr[1](true); } })));
}

function Kr3() {
  return Wz({ title: KR_TITLE, steps: KR_STEPS, n: 3, go: 'kr4', body: h(F, null,
    h(TaiLieuCard, { title: 'Tài liệu, chứng cứ kèm theo', desc: 'Hệ thống tự lấy các tài liệu đã có trên Cổng. Bạn chỉ cần tải lên tài liệu, chứng cứ do bạn cung cấp.', he: [['Đơn khiếu nại — hệ thống tạo tự động từ nội dung bạn đã khai', 'Đã có trên hệ thống'], ['Thông báo trả lại đơn khởi kiện', 'Đã có trên hệ thống']], bat: [], bb0: {}, bs0: [] }),
    NvCallS('info', h(F, null, h('b', null, 'Lưu ý định dạng tệp. '), 'Tài liệu, chứng cứ có thể được bổ sung sau theo yêu cầu của người giải quyết.'))) });
}

function Kr4() {
  return h(KyGuiSd, { sua: 'kr2',  title: KR_TITLE, steps: KR_STEPS, kyTitle: 'Xem lại & ký số', ok: 'krOk', tep: ['Đơn khiếu nại việc trả lại đơn', 'Tài liệu, chứng cứ'], tepMeta: 'Xem trước đơn', vaiTro: 'Người khiếu nại', sendLabel: 'Ký số & gửi đơn',
    lead: 'Kiểm tra lại toàn bộ thông tin trước khi ký số và gửi đến Tòa án.', camDoan: 'Tôi cam đoan nội dung khiếu nại là đúng sự thật và chịu trách nhiệm trước pháp luật.',
    rvTitle: 'Thông tin đơn', top: h(F, null, h(T.FormSection, { title: KR_STEPS[0], sdGo: 'kr1' }, RvKV([['Vụ việc liên quan', 'Tranh chấp hợp đồng cung ứng dịch vụ · TN-20261012-0007']])), h(T.FormSection, { title: KR_STEPS[1], sdGo: 'kr2' }, RvKV([['Tóm tắt', 'Khiếu nại việc Tòa án trả lại đơn khởi kiện khi chưa hết thời hạn sửa đổi, bổ sung.'], ['Yêu cầu giải quyết', 'Đề nghị xem xét, xử lý trách nhiệm cán bộ liên quan và trả kết quả đúng hạn.'], ['Người khiếu nại', 'Hoàng Dương (chính bạn)']])), h(T.FormSection, { title: KR_STEPS[2], sdGo: 'kr3' }, RvKV([['Tài liệu kèm theo', '2 tệp']]))) });
}

function KrOk() {
  return h(OkSd, { title: 'Đã gửi đơn thành công', text: 'Chánh án phân công Thẩm phán mở phiên họp xem xét trong 05 ngày làm việc kể từ ngày được phân công (Điều 194.2).', info: [['Mã tiếp nhận', '[Mã tiếp nhận]'], ['Cơ quan giải quyết', 'Chánh án Tòa án đã trả lại đơn khởi kiện'], ['Trạng thái', 'Chờ tiếp nhận']],
    btns: h(F, null, Btn('Xem tiến trình giải quyết', 'primary', { 'data-pt-go': 'reset:home,complaints,complaintTt' }), Btn('Về danh sách hồ sơ', 'secondary', { 'data-pt-go': 'reset:home,complaints' })) });
}

/* ===== v358: Hộp thư tống đạt – nút chưa có đường dẫn / bị khóa vô hiệu kèm lý do dưới nút (lyDoKhoa từ hệ thống), số đếm Tất cả / Chưa đọc / Đã đọc, huy hiệu chưa đọc trên mục Hộp thư ===== */
/* ===== Hộp thư tống đạt – bổ sung theo web (hop-thu/index.tsx, portal-layout.tsx) ===== */
/* (4) thanh điều hướng: huy hiệu số văn bản chưa đọc trên mục Hộp thư (web: badgeNhom – chỉ hiện khi > 0); số vẽ bằng CSS từ thuộc tính data-n để chữ của nút vẫn là "Hộp thư" (luật điều hướng so khớp theo chữ) */
function ibSoChuaDoc() { return IB.filter(function (m) { return !m.doc; }).length; }
function Nav(active) {
  var n = ibSoChuaDoc();
  return h('div', { className: 'ph-nav' }, h('nav', { className: 'tp-nav tp-nav2', 'aria-label': 'Điều hướng chính' }, NAV.map(function (it) {
    var on = it.key === active, bd = it.key === 'inbox' && n > 0 ? (n > 99 ? '99+' : String(n)) : null;
    return h('button', { key: it.key, type: 'button', className: 'tp-nav-item' + (on ? ' tp-nav-on' : ''), 'aria-current': on ? 'page' : undefined, 'aria-describedby': bd ? 'ib-nav-n' : undefined }, /* không dùng aria-label: luật điều hướng đọc aria-label trước chữ của nút */
      h('span', { className: 'ib-nav-ic', 'data-n': bd || undefined }, h(T.Icon, { name: it.icon })), it.label);
  })), n > 0 ? h('span', { id: 'ib-nav-n', className: 'pt-sr' }, n + ' văn bản chưa đọc') : null);
}
/* (3) bảng Bộ lọc: số đếm cạnh cả 3 lựa chọn Tất cả / Chưa đọc / Đã đọc (web luôn hiện số, kể cả 0) */
function IbLocSheet(p) {
  var l = React.useState(p.loc), v = l[0], set = function (k, x) { var n = Object.assign({}, v); n[k] = x; l[1](n); };
  var dem = p.dem || { all: 0, unread: p.chuaDoc || 0, read: 0 };
  return h(LvSheet, { host: p.host, title: 'Bộ lọc hộp thư', onClose: p.onClose,
    foot: h(F, null, h(T.Button, { variant: 'secondary', onClick: function () { l[1](Object.assign({}, v, { doc: 'all', hs: '', toa: 'all', khoang: 'all', tu: '', den: '' })); } }, 'Nhập lại'), h(T.Button, { onClick: function () { p.onApply(v); } }, 'Áp dụng')) },
    h('div', { className: 'ib-loc' },
      h('div', null, h('p', { className: 'sf-h' }, 'Trạng thái đọc'), h('div', { className: 'sf-grid', role: 'radiogroup', 'aria-label': 'Trạng thái đọc' }, [['all', 'Tất cả'], ['unread', 'Chưa đọc'], ['read', 'Đã đọc']].map(function (o) {
        var on = v.doc === o[0];
        return h('button', { key: o[0], type: 'button', role: 'radio', 'aria-checked': on, className: 'ib-chip2' + (on ? ' ib-chip2-on' : ''), onClick: function () { set('doc', o[0]); } }, o[1], h('span', { className: 'ib-chip2-n tp-num' }, dem[o[0]]));
      }))),
      h(IbPick, { host: p.host, label: 'Hồ sơ, vụ án', v: v.hs, onPick: function (x) { set('hs', x); }, items: [{ id: '', name: 'Tất cả' }].concat(IB_HS.map(function (x) { return { id: x[0], name: x[0] + ' · ' + x[1] }; })) }),
      h(IbPick, { host: p.host, label: 'Tòa án ban hành', v: v.toa, onPick: function (x) { set('toa', x); }, items: [{ id: 'all', name: 'Tất cả' }].concat(IB_TOA.map(function (x) { return { id: x, name: x }; })) }),
      h(IbPick, { host: p.host, label: 'Thời gian gửi', v: v.khoang, onPick: function (x) { set('khoang', x); }, items: IB_KHOANG.map(function (x) { return { id: x[0], name: x[1] }; }) }),
      v.khoang === 'custom' ? h('div', { className: 'ib-loc-2' },
        Tf('Từ ngày', { labelVisible: true, type: 'date', value: v.tu, max: v.den || undefined, onChange: function (e) { set('tu', e.target.value); } }),
        Tf('Đến ngày', { labelVisible: true, type: 'date', value: v.den, min: v.tu || undefined, onChange: function (e) { set('den', e.target.value); } })) : null));
}
/* (1)(2) nút hành động của khối theo nhóm: vô hiệu kèm lý do hiện dưới nút (app không có chú thích khi rê chuột như web)
   – khóa từ hệ thống: lý do lấy từ API (lyDoKhoa), trống thì "Bạn chưa thể thực hiện thao tác này."; hết hạn: giữ câu báo hết hạn của khối
   – chưa có đường dẫn: "Chức năng đang được cập nhật" */
function IbKhoi(m, thay, khoa0) {
  var cf = IB_NHOM[m.nhom], k = IB_KHOI[m.nhom], dem = ibDem(m), het = dem && dem.con < 0, biKhoa = thay || khoa0;
  var nut = k.b.map(function (b) {
    var ly = het ? null : biKhoa ? (thay ? '[Lý do khóa – lyDoKhoa do hệ thống trả về]' : 'Bạn chưa thể thực hiện thao tác này.') : !b[1] ? 'Chức năng đang được cập nhật' : null;
    return { b: b, tat: het || biKhoa || !b[1], ly: ly };
  });
  var lys = nut.map(function (x) { return x.ly; }).filter(Boolean), chung = lys.length > 1 && lys.every(function (x) { return x === lys[0]; }) && lys.length === nut.length;
  var lyEl = function (t) { return h('p', { className: 'ib-khoa-ly' }, h(T.Icon, { name: 'lock' }), t); };
  return h('section', { className: 'ph-blk ib-khoi' },
    h('div', { className: 'ib-khoi-h' }, h('h3', null, cf[0])),
    Rows(k.f),
    k.ph ? h('div', { className: 'ib-phong' }, h('p', null, 'Phòng họp trực tuyến'), Rows(k.ph)) : null,
    dem ? h('p', { className: 'ib-han' + (het ? ' ib-han-qua' : '') }, h(T.Icon, { name: 'clock' }), 'Hạn: ' + m.han.split('-').join('/') + ' · ' + (het ? 'đã quá ' + (-dem.con) + ' ngày' : dem.con === 0 ? 'hết hạn hôm nay' : 'còn ' + dem.con + ' ngày'))
      : k.vo ? h('p', { className: 'ib-han' }, h(T.Icon, { name: 'clock' }), 'Hạn: Vô thời hạn') : null,
    het ? h('p', { className: 'ib-het-han' }, 'Đã hết hạn — công dân không thể thực hiện. Vui lòng liên hệ Tòa án để được hướng dẫn.') : null,
    nut.length ? h('div', { className: 'ib-khoi-b' }, nut.map(function (x) {
      return h(F, { key: x.b[0] }, h(T.Button, { block: true, variant: 'secondary', disabled: x.tat, 'data-pt-go': x.tat ? undefined : x.b[1] }, x.b[0]), x.ly && !chung ? lyEl(x.ly) : null);
    }), chung ? lyEl(lys[0]) : null) : null);
}
/* nút đã có màn trong prototype thì gắn màn; giữ "Chọn hòa giải viên" làm mẫu chưa có đường dẫn ("Gửi ý kiến, phản hồi" chưa có màn tương ứng) */
IB_KHOI['ban-an'].b[0][1] = 'kc1'; IB_KHOI['phan-hoi'].b[0][1] = 'ykc1'; IB_KHOI['hoa-giai'].b[0][1] = 'hgReply';
function InboxScr(p) {
  p = p || {};
  var fd = React.useState(IB_UI.folder), lc = React.useState(IB_UI.loc), sx = React.useState(IB_UI.sap), q = React.useState(''), sh = React.useState(null), n = React.useState(10), tai = React.useState(false), rr = React.useState(0);
  var anchor = React.useRef(null), host = useHost(anchor), end = React.useRef(null);
  IB_UI.folder = fd[0]; IB_UI.loc = lc[0]; IB_UI.sap = sx[0];
  var ds = ibSapXep(ibLocDs(lc[0], q[0], fd[0]), sx[0]), hien = ds.slice(0, n[0]), tt = (fd[0] !== 'inbox' ? [IB_FD.filter(function (x) { return x[0] === fd[0]; })[0][1].toLowerCase()] : []).concat(ibTomTat(lc[0])), soLoc = [lc[0].doc !== 'all', !!lc[0].hs, lc[0].toa !== 'all', lc[0].khoang !== 'all'].filter(Boolean).length, locOn = soLoc > 0, plOn = fd[0] !== 'inbox' || !!lc[0].nhan;
  var nenDoc = ibLocDs(Object.assign({}, lc[0], { doc: 'all' }), q[0], fd[0]), chuaDoc = nenDoc.filter(function (m) { return !m.doc; }).length;
  var coLoc = tt.length > 0 || !!q[0].trim();
  React.useEffect(function () { n[1](10); }, [fd[0], lc[0], sx[0], q[0]]);
  React.useEffect(function () { /* tự tải thêm 10 văn bản khi cuộn tới cuối danh sách */
    var el = end.current; if (!el || n[0] >= ds.length || typeof IntersectionObserver === 'undefined') return;
    var ob = new IntersectionObserver(function (e) { if (e[0].isIntersecting && !tai[0]) { tai[1](true); setTimeout(function () { n[1](function (x) { return x + 10; }); tai[1](false); }, 700); } });
    ob.observe(el); return function () { ob.disconnect(); };
  }, [n[0], ds.length, tai[0]]);
  var doi = function () { rr[1](rr[0] + 1); };
  /* v256: chế độ chọn nhiều thư – chon[0] = danh sách thư đã tick (null = không ở chế độ chọn); bảng thao tác tự mở mỗi lần tick, đóng bảng vẫn ở chế độ chọn */
  var chon = React.useState(null);
  /* v257 (chọn H): bỏ bảng thao tác – chỉ còn "Đánh dấu đã đọc" trên thanh ghim đáy thay thanh điều hướng */
  var chonGiu = function (m) { chon[1]([m]); };
  var chonTick = function (m) { var c = chon[0] || [], i = c.indexOf(m), n2 = i >= 0 ? c.filter(function (x) { return x !== m; }) : c.concat([m]); if (!n2.length) { chon[1](null); return; } chon[1](n2); };
  var chonLam = function (f, msg) { var c = chon[0] || []; c.forEach(f); chon[1](null); doi(); if (window.__ptSnack) window.__ptSnack(msg.replace('{n}', c.length)); };
  var sapCur = IB_SAP.filter(function (x) { return x[0] === sx[0]; })[0];
  /* 03/11/2026 (v136): không có văn bản phù hợp – ở giữa màn: biểu tượng, tiêu đề, mô tả, nút Xóa bộ lọc (xóa từ khóa, bộ lọc, nhãn, trạng thái đọc; thư mục về Hộp thư) */
  var rong = coLoc ? ['Không có văn bản phù hợp', 'Vui lòng điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.'] : IB_RONG[fd[0]];
  var xoaLoc = function () { q[1](''); lc[1](IB_LOC0); fd[1]('inbox'); };
  var ct = h(F, null, h('span', { ref: anchor, hidden: true }),
    /* 03/11/2026 (v121): ô tìm + hàng trạng thái đọc / Sắp xếp cố định khi cuộn */
    h('div', { className: 'ib-stick' },
    h('div', { className: 'ph-ibar' },
      h('div', { className: 'fx-search' }, Tf('Tìm văn bản', { icon: 'search', placeholder: 'Tìm số hiệu, loại, tòa án, hồ sơ…', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })),
      h('button', { type: 'button', className: 'ph-ibar-btn' + (plOn ? ' ib-loc-on' : ''), 'aria-label': plOn ? 'Phân loại thư (đang lọc)' : 'Phân loại thư', onClick: function () { sh[1]('pl'); } }, h(T.Icon, { name: 'grid' }))),
    /* 03/11/2026 (v121): bỏ dòng "Đang lọc: … — n văn bản" + Xóa lọc; điều kiện lọc báo bằng chấm đỏ trên nút Bộ lọc / Phân loại thư */
    /* 03/11/2026 (v120): thay dòng "20 văn bản" – trái: chip trạng thái đọc (phương án B), phải: Sắp xếp */
    /* v211 (04/11/2026): như Danh sách đơn – trái: Sắp xếp, phải: nút "Bộ lọc" (số điều kiện đang lọc); trạng thái đọc chuyển vào bảng Bộ lọc; nút Phân loại thư (nhãn văn bản) vẫn bên phải ô tìm */
    h('div', { className: 'ib-docrow st-row sf-row' },
      h('button', { type: 'button', className: 'ph-ibar-sort ib-sort2', 'aria-label': 'Sắp xếp: ' + sapCur[2], onClick: function () { sh[1]('sap'); } }, h(T.Icon, { name: 'sortDesc' }), sapCur[2]),
      h('span', { className: 'sf-sp' }),
      h('button', { type: 'button', className: 'sf-pill' + (locOn ? ' sf-on' : ''), 'aria-label': locOn ? 'Bộ lọc, đang lọc ' + soLoc + ' điều kiện' : 'Bộ lọc', onClick: function () { sh[1]('loc'); } }, h(T.Icon, { name: 'filter' }), 'Bộ lọc', locOn ? h('span', { className: 'sf-badge tp-num', 'aria-hidden': 'true' }, soLoc) : null))),
    p.loi ? h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tải được hộp thư.', text: 'Mã lỗi: [mã lỗi]', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: noop, className: 'nv-err' }) /* v345 (HT-W06) */
    : ds.length ? h('ul', { className: 'ib-cardlist' }, hien.map(function (m) { return h(MailCard, { key: m.so, m: m, folder: fd[0], onDoi: doi, sel: chon[0] ? chon[0].indexOf(m) >= 0 : undefined, onHold: chonGiu, onTick: chonTick }); }),
      n[0] < ds.length ? h('li', { ref: end, className: 'ph-loadmore ib-more', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), h('span', null, 'Đang tải thêm văn bản…'))
        : ds.length > 10 ? h('li', { className: 'ib-het' }, 'Đã hiển thị hết ' + ds.length + ' văn bản') : null)
      : h(IbEmpty, { title: rong[0], text: rong[1], action: coLoc ? 'Xóa bộ lọc' : null, onAction: xoaLoc }),
    sh[0] === 'pl' && host ? h(IbPlSheet, { host: host, loc: lc[0], folder: fd[0], onClose: function () { sh[1](null); }, onApply: function (v, f) { lc[1](v); fd[1](f); sh[1](null); } }) : null,
    sh[0] === 'loc' && host ? h(IbLocSheet, { host: host, loc: lc[0], folder: fd[0], chuaDoc: chuaDoc, dem: { all: nenDoc.length, unread: chuaDoc, read: nenDoc.length - chuaDoc }, onClose: function () { sh[1](null); }, onApply: function (v) { lc[1](v); sh[1](null); } }) : null,
    sh[0] === 'sap' && host ? h(LvSheet, { host: host, title: 'Sắp xếp', onClose: function () { sh[1](null); } }, h(LvRows, { label: 'Sắp xếp', cur: sx[0], items: IB_SAP.map(function (x) { return { id: x[0], name: x[1] }; }), onPick: function (id) { sx[1](id); sh[1](null); } })) : null);
  /* v257: cùng khung với Main (AppBar · Body · thanh đáy) để danh sách không bị dựng lại khi vào/ra chế độ chọn */
  return h(Phone, { cls: 'ph-main' }, h(T.AppBar, { variant: 'page', title: 'Hộp thư tống đạt' }), h(Body, { cls: 'tp-sheet' }, ct),
    chon[0] ? h('div', { className: 'ib-chon-bar', role: 'toolbar', 'aria-label': 'Thao tác với văn bản đã chọn' },
      h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Bỏ chọn', onClick: function () { chon[1](null); } }, h(T.Icon, { name: 'x' })),
      h('b', { role: 'status' }, 'Đã chọn ' + chon[0].length + ' văn bản'),
      h(T.Button, { size: 'sm', icon: 'check', onClick: function () { chonLam(function (m) { m.doc = true; }, 'Đã đánh dấu đã đọc {n} văn bản.'); } }, 'Đánh dấu đã đọc')) : Nav('inbox'));
}

function MailDetailScr(p) {
  p = p || {};
  var i = p.i != null ? p.i : window.__ibSel, m = i >= 1000 ? IB_X[i - 1000] : IB[i || 0], rr = React.useState(0), /* v246: chỉ số từ 1000 = văn bản trong tab Văn bản tống đạt của chi tiết đơn */ moLan = { current: m.moLan || (m.moLan = m.doc ? '28/10/2026 · 09:02' : '02/11/2026 · 09:15') };
  var giu = !!p.giu; /* v345 (HT-W07): mở từ Việc cần làm (nộp tạm ứng án phí, bổ sung hồ sơ) – xem nhưng không ghi nhận đã đọc */
  React.useEffect(function () { if (!giu && !p.loi) m.doc = true; }, []); /* mở văn bản = ghi nhận đã đọc */
  var doi = function () { rr[1](rr[0] + 1); };
  if (p.loi) return Sub('Văn bản tống đạt', h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tải được văn bản.', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: noop, className: 'nv-err' })); /* v345 (HT-W06) */
  var daDoc = m.doc && !giu, ngay = m.time.slice(0, 10).split('-').join('/'), gio = m.time.slice(11, 16);
  var cta = IB_CTA[p.cta || 'hs'];
  return Sub('Văn bản tống đạt', h(F, null,
    /* 03/11/2026 (v127): gộp khối tiêu đề + khối đơn vị ban hành thành 1 (phương án A): nhãn + số hiệu + nút Quan trọng / Lưu trữ (biểu tượng, như C) → tên → Tòa án · người ký (không biểu tượng) → Đơn liên quan */
    h('section', { className: 'ph-blk ib-dh ib-dh2' },
      h('div', { className: 'ib-c-h' }, h('span', { className: 'vk-tag' + ibTag(m.nh) }, IB_NHAN_TEN[m.nh]), h('span', { className: 'ib-so tp-num' }, m.so),
        h('span', { className: 'ib-c-act' },
          h('button', { type: 'button', className: 'ph-mail2-btn' + (m.star ? ' ph-mail2-on' : ''), 'aria-pressed': !!m.star, 'aria-label': 'Đánh dấu quan trọng', onClick: function () { m.star = !m.star; doi(); } }, h(T.Icon, { name: 'star' })),
          h('button', { type: 'button', className: 'ph-mail2-btn' + (m.arch ? ' ph-mail2-on' : ''), 'aria-pressed': !!m.arch, 'aria-label': m.arch ? 'Bỏ lưu trữ' : 'Lưu trữ', 'data-pt-go': 'snack:' + (m.arch ? 'Đã đưa văn bản trở lại Hộp thư.' : 'Đã lưu trữ văn bản.'), onClickCapture: function () { m.arch = !m.arch; doi(); } }, h(T.Icon, { name: 'archive' })))),
      h('h1', null, m.t),
      h('p', { className: 'ib-from2' }, h('b', null, m.from), h('small', null, 'Người ký ', h('strong', null, 'Nguyễn Văn An'), ' (Thẩm phán) · ' + ngay)),
      h('p', { className: 'ib-ty' }, '[Trích yếu văn bản]'), /* v345 (HT-W09): trích yếu (trường trichYeu) */
      h('p', { className: 'ib-hsl' }, 'Hồ sơ:', h('button', { type: 'button', className: 'ib-hs-pill tp-num', 'aria-label': 'Mở đơn ĐKK-2026-000123', 'data-pt-go': 'appDetail' }, 'ĐKK-2026-000123'), h('button', { type: 'button', className: 'ib-hs-pill tp-num', 'aria-label': 'Mở vụ án ' + m.va, 'data-pt-go': 'caseDetail' }, m.va)),
      p.noFile ? h('p', { className: 'ib-nofile' }, h(T.Icon, { name: 'info' }), 'Bản số hóa của văn bản đang được chuẩn bị. Trường hợp chưa sẵn sàng, Tòa án sẽ tống đạt bản giấy theo quy định.') /* v345 (HT-W10) */
        : IbFile(m.so.replace(/\//g, '-') + '.pdf')),
    p.viec ? h('section', { className: 'ph-blk ib-khoi' }, /* v345 (HT-W14): có việc cần làm nhưng không thuộc nhóm nào */
      p.viec === 'het' ? h(F, null, h('p', { className: 'ib-han ib-han-qua' }, h(T.Icon, { name: 'clock' }), 'Đã hết hạn nộp: 30/10/2026'), h('p', { className: 'ib-het-han' }, 'Đã hết hạn — công dân không thể thực hiện. Vui lòng liên hệ Tòa án để được hướng dẫn.')) : null,
      h('p', { className: 'ib-viec-h' }, '[Tên tình trạng] — việc bạn có thể làm:'),
      h('div', { className: 'ib-khoi-b' }, h(T.Button, { block: true, variant: 'secondary', disabled: p.viec === 'het' }, '[Tên việc 1]'), h(T.Button, { block: true, variant: 'secondary', disabled: p.viec === 'het' }, '[Tên việc 2]')))
    : m.nhom ? IbKhoi(m, p.thay, p.khoa)
    : h('section', { className: 'ph-blk ib-cta' }, h('p', null, cta[0]), h(T.Button, { block: true, variant: 'secondary', 'data-pt-go': p.khongHs ? 'snack:Không xác định được hồ sơ liên quan.' : cta[2] }, cta[1])), /* v345 (HT-W15) */
    m.dk ? Blk('Tài liệu đính kèm', h('div', { className: 'ib-files' }, IbFile('Phu-luc-01.pdf'), IbFile('Danh-sach-tai-lieu.pdf'))) : null,
    h('section', { className: 'ph-blk ib-kyso' }, /* v345 (HT-W11, HT-W12); v346: 3 dòng chữ nhỏ có biểu tượng trong khối trắng (PA B) */
      h('p', { className: 'ib-ks-r' }, h(T.Icon, { name: 'checkCircle' }), h('span', null, 'Đã ký số bởi ', h('b', null, m.from), ' · CKS hợp lệ')),
      h('p', { className: 'ib-ks-r ib-ks-g' }, h(T.Icon, { name: 'send' }), h('span', null, 'Tống đạt điện tử ', h('b', { className: 'tp-num' }, ngay + ' ' + gio))),
      daDoc ? h('p', { className: 'ib-ks-r ib-ks-g' }, h(T.Icon, { name: 'eye' }), h('span', null, 'Bạn đã mở văn bản này lần đầu lúc ', h('b', { className: 'tp-num' }, moLan.current), '. Thông tin này được ghi nhận và gửi về Tòa án.')) : null)));
}

/* ===== v359: Nghĩa vụ tài chính – thẻ khoản đồng nhất với thẻ danh sách chuẩn (Danh sách đơn, Khiếu nại, Trích lục): nhãn có dấu hai chấm, ghi chú dạng dòng gọn, "Chưa xác định" cỡ chữ thường ===== */
function NvCard(p) {
  var k = p.k, tt = nvTrangThai(k), hn = nvHan(k), muc = hn ? (hn.qua ? 'qua' : hn.gap ? 'sap' : 'an') : null;
  var rows = [['Số tiền', h('span', { className: 'nv-c-amt tp-num' + (k.cxd ? ' nv-amt-cxd' : '') }, k.tienDau ? h('s', { className: 'nv-was' }, nvTien(k.tienDau)) : null, k.tienDau ? ' ' : null, k.mo ? nvTienText(k) : nvTien(k.tien))],
    ['Loại khoản', nvTenLoai(k.loai)], ['Mã thông báo', h('span', { className: 'tp-num' }, k.ma)], ['Hồ sơ, vụ án', nvHsText(k.hs)]]
    .concat(k.mo ? [['Hạn nộp', k.han || '- (không có hạn nộp trên Cổng)']] : [[k.duocMien ? 'Ngày miễn' : 'Ngày nộp', k.ngay + (k.duocMien ? '' : ' · ' + k.kenh)]]);
  return h('li', { className: 'qd-c qc nv-c' },
    h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem chi tiết: ' + k.nd, 'data-pt-go': 'financeDetail', onClickCapture: nvPick(k) }),
    h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: tt[1], icon: false }, tt[0]), hn ? h('span', { className: 'qd-tinh qc-tinh qd-tinh-' + (hn.qua ? 'warning' : hn.gap ? 'warning' : 'info') }, h('span', { className: 'qc-tinh-tx' }, hn.text)) : null,
      h('button', { type: 'button', className: 'ph-mail2-btn qd-star' + (k.ghim ? ' ph-mail2-on' : ''), 'aria-pressed': !!k.ghim, 'aria-label': k.ghim ? 'Bỏ đánh dấu quan trọng' : 'Đánh dấu quan trọng', onClick: function () { k.ghim = !k.ghim; p.onDoi(); } }, h(T.Icon, { name: 'star' }))),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, k.nd)),
    h('dl', { className: 'qc-ben' }, rows.map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0] + ':'), h('dd', null, r[1])); })),
    k.mo ? nvGhiChuThe(k).map(function (n, i) { return h('p', { key: i, className: 'kn-ban nv-ban nv-ban-' + n[0] }, h(T.Icon, { name: n[0] === 'info' ? 'info' : 'alert' }), n[1]); }) : null,
    nvNopDuoc(k) ? h('div', { className: 'qd-c-f qc-vk vkx-box' }, h('p', { className: 'qc-vk-h vkx-h' }, 'Việc cần làm'), h('ul', { className: 'qc-vk-l' },
      h('li', { className: 'vk-card vka vkx vkx-' + (muc || 'none') }, h('button', { type: 'button', className: 'vka-b', 'data-pt-go': 'financePay', onClickCapture: nvPick(k) },
        h('span', { className: 'vka-tx' }, h('b', null, 'Nộp tiền'), h('small', null, hn ? h(F, null, 'Hạn xử lý · ', h('span', { className: 'vka-han vka-han-' + muc }, hn.text)) : 'Không có thời hạn')))))) : null,
    k.da ? h('div', { className: 'qd-c-f nv-c-bl' }, h('span', { className: 'nv-bl tp-num' }, k.bienLai), h(T.Button, { size: 'sm', variant: 'secondary', icon: 'download', 'data-pt-go': 'snack:Đã tải biên lai ' + k.bienLai + '.pdf' }, 'Tải biên lai PDF')) : null);
}

/* ===== v360: Theo dõi vụ án, vụ việc – mũi tên mọi dòng là ">" (dòng Danh sách đơn và tiến trình mở danh sách loại đơn: mũi tên xoay xuống khi mở) ===== */
function RecordsScr(p) {
  /* v196 (chọn A · Danh sách dòng); v202: dòng "Danh sách đơn và tiến trình" mở rộng để chọn loại đơn (tên + số đơn), chọn loại → danh sách đơn của loại đó */
  var mo = React.useState(false);
  return Main('records', 'Theo dõi vụ án, vụ việc', h('div', { className: 'rn-groups' }, REC_MENU.map(function (g, i) {
    return h('div', { key: i, className: 'rn-list', role: 'group', 'aria-label': i ? 'Vụ án, vụ việc và nghĩa vụ' : 'Đơn và thủ tục' }, g.map(function (x, j) {
      var ex = i === 0 && j === 0;
      var row = h('button', { key: x.label, type: 'button', className: 'rn-row' + (ex ? ' rn-row-ex' : ''), 'aria-expanded': ex ? mo[0] : undefined, onClick: ex ? function () { mo[1](!mo[0]); } : undefined },
        h('span', { className: 'tp-illo-circle rn-row-ic' }, h(T.Illustration, { name: REC_ILLO[x.label] })),
        h('span', { className: 'rn-row-tx' }, h('b', null, x.label), h('small', null, x.description)), h(T.Icon, { name: 'chevronRight', className: ex && mo[0] ? 'rn-xoay90' : '' }));
      if (!ex) return row;
      return h(F, { key: x.label }, row, mo[0] ? h('ul', { className: 'rn-sub', role: 'list', 'aria-label': 'Chọn loại đơn' }, QD_KIND.map(function (k) {
        return h('li', { key: k[0] }, h('button', { type: 'button', className: 'rn-sub-it', 'data-pt-go': 'appK_' + k[0] }, h('span', null, k[1]), h('span', { className: 'qk-cnt tp-num' }, qdDem(k[0]))));
      })) : null);
    }));
  })));
}

/* ===== v361: Cấp trích lục, bản sao – bước 1: "Từ vụ án của tôi / Nhập thông tin bản án" đổi từ tab gạch chân sang ô chọn 2 nửa như Đề nghị GĐT/TT (người dùng chọn PA A) ===== */
function Tl1(p) {
  var tab = React.useState(p && p.tuKhai ? 'tk' : 'va');
  return Wz({ title: TL_TITLE, steps: TL_STEPS, n: 1, go: tab[0] === 'tk' ? 'tl2k' : 'tl2', body: FCard('Chọn bản án / quyết định', h(F, null,
    Lead('Chọn từ vụ án của bạn (thông tin được điền tự động, không thể sai) hoặc nhập thông tin bản án để Tòa án đối chiếu.'),
    h(T.SegmentedControl, { label: 'Nguồn thông tin bản án', value: tab[0], onChange: tab[1], options: [{ value: 'va', label: 'Từ vụ án của tôi' }, { value: 'tk', label: 'Nhập thông tin bản án' }], className: 'sk-seg' }),
    tab[0] === 'va' ? h(TlTuVuAn) : h(TlTuKhai)), true) });
}
