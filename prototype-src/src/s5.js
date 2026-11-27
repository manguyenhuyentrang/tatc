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
  { ma: 'TB-2026-0018', loai: 'CHI_PHI_TT', nd: 'Chi phí xem xét, thẩm định tại chỗ', hs: 'DS-2026-0018', tien: 1500000, han: '05-11-2026', dl: 2, mo: 1, vb: 'Thông báo nộp chi phí tố tụng', so: '[Số thông báo]', bh: '28-10-2026', td: '29-10-2026', hauQua: 'Quá hạn không nộp, Tòa án đình chỉ việc xem xét, thẩm định tại chỗ theo yêu cầu.', moTa: 'Khoản tiền đương sự phải nộp theo thông báo của Tòa án.', mien: 1 },
  { ma: 'TB-2026-0012', loai: 'TAM_UNG_AP_ST', nd: 'Tạm ứng án phí vụ án dân sự', hs: 'DS-2026-0012', tien: 3000000, tienDau: 6000000, giam: '[Lý do miễn, giảm]' /* v366: lyDoMienGiam do hệ thống trả về – trước đây là số quyết định tự đặt */, ngayGiam: '25-10-2026', han: '10-11-2026', dl: 7, mo: 1, vb: 'Thông báo nộp tạm ứng án phí', so: '[Số thông báo]', bh: '20-10-2026', td: '21-10-2026', moTa: 'Khoản tiền đương sự phải nộp theo thông báo của Tòa án.', mien: 1 },
  { ma: 'TB-2026-0021', loai: 'LE_PHI', nd: 'Lệ phí giải quyết việc dân sự', hs: 'DS-2026-0021', cxd: 1, mo: 1, vb: 'Thông báo nộp lệ phí', so: '[Số thông báo]', bh: '30-10-2026', td: '31-10-2026' },
  { ma: 'TB-2026-0030', loai: 'TAM_UNG_AP_PT', nd: 'Tạm ứng án phí phúc thẩm', hs: 'DS-2026-0018', tien: 300000, han: '01-11-2026', dl: -2, mo: 1, nopThay: 1, dinhDanh: 'Hoàng Minh Quân · 001085004321', vb: 'Thông báo nộp tạm ứng án phí phúc thẩm', so: '[Số thông báo]', bh: '25-10-2026', td: '26-10-2026', hauQua: 'Quá hạn không nộp, Tòa án đình chỉ việc xem xét, thẩm định tại chỗ theo yêu cầu.' },
  { ma: 'TB-2026-0005', loai: 'TAM_UNG_AP_ST', nd: 'Tạm ứng án phí sơ thẩm', hs: 'DS-2026-0012', tien: 300000, da: 1, ngay: '20-10-2026', kenh: 'Cổng Dịch vụ công quốc gia', bienLai: 'BL-2026-000123', vb: 'Thông báo nộp tạm ứng án phí', so: '[Số thông báo]', bh: '10-10-2026', td: '11-10-2026' },
  { ma: 'TB-2026-0003', loai: 'LE_PHI', nd: 'Lệ phí cấp bản sao bản án', hs: 'DS-2026-0012', tien: 300000, duocMien: 1, ngay: '15-10-2026', lyDo: '[Lý do miễn, giảm]' /* v366 */, vb: 'Thông báo nộp lệ phí', so: '[Số thông báo]', bh: '08-10-2026', td: '09-10-2026' }];
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
/* đối chiếu 2B.2 / 2B.3 (21/11/2026): giữ "Nhập lại" trong bảng Bộ lọc (bảng từ đáy của app); bảng chọn Hồ sơ, vụ án có ô tìm khi trên 10 mục, tìm không phân biệt dấu */
function NvLocSheet(p) {
  var l = React.useState(p.loc), v = l[0], set = function (k, x) { var n = Object.assign({}, v); n[k] = x; l[1](n); };
  var hsIds = (p.nv || NV).filter(function (k) { return p.nhom === 'mo' ? k.mo : !k.mo; }).map(function (k) { return k.hs; }).filter(function (x, i, a) { return a.indexOf(x) === i; });
  return h(LvSheet, { host: p.host, title: 'Bộ lọc', onClose: p.onClose,
    foot: h(F, null, h(T.Button, { variant: 'secondary', onClick: function () { l[1](Object.assign({}, v, { hs: 'all', ky: 'all', loai: 'all' })); } }, 'Nhập lại'), h(T.Button, { onClick: function () { p.onApply(v); } }, 'Áp dụng')) },
    h('div', { className: 'ib-loc' },
      p.chips ? h(IbPick, { host: p.host, label: 'Loại khoản', v: v.loai, onPick: function (x) { set('loai', x); }, items: p.chips.map(function (c) { return { id: c.key, name: c.label + ' (' + c.count + ')' }; }) }) : null,
      h(NvPick, { host: p.host, label: 'Hồ sơ, vụ án', v: v.hs, moSan: p.moHs, q0: p.qHs, onPick: function (x) { set('hs', x); }, items: [{ id: 'all', name: 'Tất cả hồ sơ, vụ án (' + hsIds.length + ')' }].concat(hsIds.map(function (x) { return { id: x, name: nvHsText(x) }; })) }),
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
/* đối chiếu 2C.1: chưa phát sinh khoản – câu web, không bị khối trống chung v518 thay */
function FinanceEmpty() {
  return Sub('Nghĩa vụ tài chính', h(F, null,
    h(ES0, { variant: 'center', icon: 'wallet', title: 'Chưa phát sinh khoản nào phải nộp', text: 'Tạm ứng án phí, án phí, lệ phí, chi phí tố tụng và tiền bảo đảm sẽ hiển thị tại đây khi Tòa án ra thông báo nộp tiền.' })));
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
/* đối chiếu web – prototype (21/11/2026):
   2D.1 đầu màn: mã thông báo; nhãn loại khoản trước nhãn trạng thái; dòng phụ "{họ tên} · {hồ sơ}"; lịch sử mỗi mốc có ngày
   2A.2 "Đề nghị miễn, giảm" mở đúng vụ án (hoặc đúng đơn) gắn với khoản
   2A.3 "Xem văn bản gốc…" chỉ hiện khi khoản có văn bản tống đạt, mở đúng văn bản đó; nộp thay chỉ hiện số định danh người phải nộp; ô trống "—"
   2D.4 tải biên lai không thông báo khi thành công; lỗi tải hiện thanh lỗi */
function FinanceDetail(p) {
  p = p || {};
  var k = nvSel(), tt = nvTrangThai(k), hn = nvHan(k), ten = 'Hoàng Dương';
  /* 2A.2 (21/11, người dùng chọn PA-A): khối việc Nộp tiền gom hạn + hậu quả, 2 nút Nộp tiền / Đề nghị miễn, giảm */
  var vanBan = k.vb + ' số ' + k.so + ' ngày ' + k.bh;
  var ghi = [];
  if (hn && hn.gap && (hn.qua || !nvNopDuoc(k))) ghi.push(['danger', hn.qua ? 'Đã quá hạn nộp.' : 'Sắp hết hạn nộp.', (k.hauQua || '') + (hn.qua ? ' Nếu bạn đã nộp, liên hệ Tòa án để được xác nhận.' : '')]);
  if (k.nopThay && k.mo) ghi.push(['info', 'Nộp thay.', 'Bạn nhận thông báo này với tư cách người đại diện và có thể nộp thay. Khi bạn hoặc người phải nộp (hay người đại diện khác) nộp xong, trạng thái khoản được cập nhật chung cho tất cả.']);
  if (k.giam) ghi.push(['info', 'Được giảm.', 'Từ ' + nvTien(k.tienDau) + ' còn ' + nvTien(k.tien) + ' theo ' + k.giam + '.']);
  if (k.cxd) ghi.push(['warning', 'Chưa xác định số tiền.', 'Văn bản tống đạt chưa ghi số tiền cụ thể. Tra số tiền trong văn bản gốc hoặc chờ Tòa án thông báo.']);
  if (k.duocMien) ghi.push(['success', 'Được miễn toàn bộ ' + nvTien(k.tien) + '.', 'Theo ' + k.lyDo + '. Không phải nộp.']);
  var info = [['Mã thông báo', h('span', { className: 'tp-num' }, k.ma)], ['Người phải nộp', k.nopThay ? nvSoDd(k) : ten + ' · 001090012345']].concat(k.nopThay ? [['Tư cách của bạn', 'Người đại diện (nộp thay)']] : [],
    [['Gắn với', nvHsText(k.hs)], ['Văn bản căn cứ', vanBan], ['Ngày nhận văn bản', k.td || '—'], ['Hạn nộp', k.han || '—']], k.hauQua ? [['Nếu quá hạn', k.hauQua]] : []);
  var dichMien = k.vuAn ? 'caseDetail' : k.don ? 'appDetailFee' : null;
  function mienCap() { if (k.vuAn) window.__vaSel = { ma: k.vuAn, ten: nvHsText(k.hs).split(' · ')[1] || '' }; }
  return h(DtScreen, { title: 'Chi tiết khoản', tabLabel: 'Nội dung khoản', tabs: [{ key: 'tt', label: 'Thông tin chung' }, { key: 'ls', label: 'Lịch sử' }], headCls: 'dt-head-don', tab0: p.tab0,
    meta: h('span', { className: 'tp-num' }, k.ma), name: k.nd,
    badges: h(F, null, h('span', { className: 'nv-loai' }, nvTenLoai(k.loai)), h(T.StatusBadge, { tone: tt[1], icon: false }, tt[0]), hn ? h('span', { className: 'ib-due ib-due-' + (hn.qua ? 'qua' : hn.gap ? 'sap' : 'an') }, hn.text) : null),
    headExtra: h(F, null, h('p', { className: 'nv-dh-sub' }, ten + ' · ' + nvHsText(k.hs)),
      h('div', { className: 'nv-dh-amt' }, k.tienDau ? h('s', { className: 'nv-was tp-num' }, nvTien(k.tienDau)) : null,
        h('b', { className: 'tp-num' + (k.cxd ? ' nv-amt-cxd' : '') }, k.mo ? nvTienText(k) : nvTien(k.tien)), !k.cxd ? h('em', null, '(' + nvBangChu(k.tien) + ')') : null)),
    pre: nvNopDuoc(k) ? KhoiViec({ t: 'Nộp tiền', han: k.han ? 'Hạn ' + k.han : null, con: hn ? hn.text.toLowerCase() : null, note: hn && hn.gap && !hn.qua ? k.hauQua : null,
      btns: [Btn('Nộp tiền', 'primary', { 'data-pt-go': 'financePay' })].concat(k.mien && dichMien ? [Btn('Đề nghị miễn, giảm', 'secondary', { 'data-pt-go': dichMien, onClickCapture: mienCap })] : []) }) : null,
    render: function (t) {
      if (t === 'ls') return h(NvLs, { ds: nvLichSu(k) });
      return h(F, null,
        ghi.map(function (g, i) { return h(NvCall, { key: i, tone: g[0], title: g[1] }, g[2]); }),
        k.mo ? FCard('Cách nộp', h(F, null, P('Nộp trước ' + (k.han || 'khi bản án có hiệu lực') + '. Một khoản nộp một lần, đủ số tiền. Tình trạng chỉ đổi sang "Đã nộp" khi Tòa án xác nhận.', 'ph-muted'),
          !nvNopDuoc(k) && k.mien && dichMien ? h(T.Button, { block: true, variant: 'secondary', className: 'nv-mien-cn', 'data-pt-go': dichMien, onClickCapture: mienCap }, 'Đề nghị miễn, giảm') : null, /* v603 (1.24) */
          h('p', { className: 'nv-foot' }, 'Tòa án thường xác nhận trong ' + NV_XN + ' sau khi bạn nộp; tình trạng sẽ tự cập nhật.')), true) : null,
        k.da ? FCard('Biên lai ' + k.bienLai + ' · Tòa án đã xác nhận', h(F, null, RvKV([['Ngày nộp', k.ngay], ['Kênh nộp', k.kenh], ['Số tiền', h('span', { className: 'tp-num' }, nvTien(k.tien))]]),
          k.bienLai ? h(T.Button, { block: true, variant: 'secondary', icon: 'download', className: 'nv-tai-bl', onClick: function () { nvTaiBl(k, p.blLoi); } }, 'Tải biên lai PDF') : null), true) : null,
        FCard('Thông tin khoản', h(F, null, RvKV(info),
          k.moTa ? h(T.Notice, { icon: 'info' }, h('b', null, 'Đây là khoản gì? '), k.moTa) : null,
          k.ib != null ? h(T.Button, { block: true, variant: 'secondary', icon: 'mail', 'data-pt-go': 'mailDetail', onClickCapture: function () { window.__ibSel = k.ib; } }, 'Xem văn bản gốc trong Hộp thư tống đạt') : null), true));
    } });
}
function nvDetailOf(i) { return function () { window.__nvSel = i; return FinanceDetail(); }; }
/* UC-NV-02 Nộp tiền – bước 1 xác nhận khoản */
/* đối chiếu 2D.2 / 2D.3 (21/11/2026): sao chép mã báo ngay tại dòng (không thanh đáy), lỗi sao chép chữ đỏ dưới dòng; "Tiếp tục sang Cổng DVCQG" khóa + đang xử lý;
   lỗi "Khoản chưa có số tiền phải nộp." (lỗi máy chủ) hiện thanh lỗi, ở lại bước này; khoản không nộp được → biến thể "Khoản không cần nộp"; "Để sau" về chi tiết khoản */
function FinancePay(p) {
  p = p || {};
  var k = nvSel(), ten = 'Hoàng Dương';
  if (!nvNopDuoc(k)) return Sub('Nộp tiền', h('div', { className: 'ph-success nv-res' }, h('span', { className: 'ph-success-ico' }, h(T.Icon, { name: 'check' })), h('h2', null, 'Khoản không cần nộp'),
      P('Khoản này đã được Tòa án xác nhận (đã nộp hoặc được miễn) hoặc chưa có số tiền phải nộp.', 'ph-muted')),
    h('div', { className: 'ph-col' }, Btn('Về chi tiết khoản', 'secondary', { 'data-pt-go': 'backTo:financeDetail' })));
  return h(NvPayXn, { k: k, ten: ten, cp0: p.cp0, ban0: p.ban0, copyLoi: p.copyLoi, noAmount: p.noAmount });
}
/* bước 2: đã mở Cổng DVCQG */
/* đối chiếu 2D.2: "Mở lại Cổng DVCQG" mở trình duyệt (không thanh thông báo) */
function FinancePayOpen() {
  var k = nvSel();
  return Sub('Nộp tiền', h(F, null,
    h('div', { className: 'ph-success nv-res' }, h('span', { className: 'ph-success-ico nv-res-info' }, h(T.Icon, { name: 'arrowRight' })), h('h2', null, 'Đã mở Cổng DVCQG trên trình duyệt'),
      P('Tình trạng khoản vẫn là "Chưa nộp" cho đến khi Tòa án xác nhận, thường trong ' + NV_XN + '. Khi đó khoản tự chuyển "Đã nộp" và có biên lai. Nếu tiền đã bị trừ, không cần nộp lại.', 'ph-muted')),
    Blk(null, Rows([['Mã thông báo', k.ma, 1], ['Số tiền', nvTien(k.tien), 1], ['Tình trạng khoản', 'Chưa nộp']]))),
    h('div', { className: 'ph-col' }, Btn('Về chi tiết khoản', 'primary', { 'data-pt-go': 'backTo:financeDetail' }), Btn('Mở lại Cổng DVCQG', 'secondary', { 'data-pt-go': 'dvcqgExt' })));
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
  { k: 'khoikien', lv: 'DS', ma: 'TN-20261020-0012', ngay: '20-10-2026', t: 'Tranh chấp hợp đồng vay tài sản', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Yêu cầu sửa đổi, bổ sung đơn', 'bo-sung'], han: ['Còn 3 ngày', 'sap'], hd: ['A021'], go: 'appDetail', ghim: 1 },
  /* v215: đơn khởi kiện có 2 việc cùng lúc, mỗi việc một hạn (dữ liệu demo, ghép từ RS-02 + RS-07 / RS-01 + RS-02) */
  { k: 'khoikien', lv: 'DS', ma: 'TN-20261024-0018', ngay: '24-10-2026', t: 'Tranh chấp hợp đồng xây dựng nhà ở', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Công ty Xây dựng Thành Công', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng án phí / lệ phí', 'an-phi'], hd: ['A017', 'A022'], hanHd: { A017: ['Còn 3 ngày', 'sap'], A022: ['Còn 9 ngày', 'an'] }, go: 'appDetailFee' },
  { k: 'khoikien', lv: 'HC', ma: 'TN-20261023-0015', ngay: '23-10-2026', t: 'Khiếu kiện quyết định thu hồi giấy phép kinh doanh', tom: 'Người khởi kiện: Hoàng Dương · Người bị kiện: Sở Công Thương Hà Nội', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Yêu cầu sửa đổi, bổ sung đơn', 'bo-sung'], hd: ['A021', 'A017'], hanHd: { A021: ['Còn 2 ngày', 'sap'], A017: ['Quá hạn 1 ngày', 'qua'] }, go: 'appDetail' },
  { k: 'khoikien', lv: 'DS', ma: '—', ngay: '22-10-2026', t: 'Tranh chấp hợp đồng mua bán', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Công ty An Phú', vt: 'Người khởi kiện', tt: 'ST-01b', tinh: ['Chờ đủ chữ ký số của người đồng khởi kiện', 'cho'], cta: ['Ký số', 'appDetailSign'], go: 'appDetailSign' },
  { k: 'khoikien', lv: 'KD', ma: 'TN-20261012-0007', ngay: '12-10-2026', t: 'Tranh chấp hợp đồng cung ứng dịch vụ', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Công ty Minh Long', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng án phí / lệ phí', 'an-phi'], han: ['Quá hạn 1 ngày', 'qua'], hd: ['A017'], go: 'appDetailFeeLate' },
  { k: 'khoikien', lv: 'DS', ma: 'TN-20261016-0010', ngay: '16-10-2026', t: 'Tranh chấp bồi thường thiệt hại ngoài hợp đồng', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Đặng Văn Tú', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng chi phí tố tụng', 'an-phi'], han: ['Còn 4 ngày', 'sap'], hd: ['A022'], go: 'appDetailFee' },
  { k: 'khoikien', lv: 'DS', ma: 'TN-20261005-0003', ngay: '05-10-2026', t: 'Tranh chấp quyền sử dụng đất', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Nguyễn Văn Hải', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Đã thụ lý vụ án', 'xong'], go: 'appDetailAccepted' },
  { k: 'khoikien', lv: 'HN', ma: 'TN-20260920-0001', ngay: '20-09-2026', t: 'Ly hôn, tranh chấp nuôi con', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Lê Minh Tú', vt: 'Người khởi kiện', tt: 'ST-04', tinh: ['Đã trả lại đơn', 'xong'], han: ['Còn 5 ngày', 'an'], hd: ['A015'], go: 'appDetailReturned' },
  { k: 'khoikien', lv: 'DS', ma: 'TN-20260915-0006', ngay: '15-09-2026', t: 'Tranh chấp hợp đồng góp vốn', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Vũ Thị Hạnh', vt: 'Người khởi kiện', tt: 'ST-04', tinh: ['Đã giải quyết khiếu nại — giữ nguyên việc trả lại đơn', 'xong'], han: ['Còn 7 ngày', 'an'], hd: ['A008'], go: 'appDetailReturned' },
  { k: 'khoikien', lv: 'HC', ma: 'TN-20261021-0013', ngay: '21-10-2026', t: 'Khiếu kiện quyết định thu hồi đất', tom: 'Người khởi kiện: Hoàng Dương · Người bị kiện: UBND quận Đống Đa', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Yêu cầu sửa đổi, bổ sung đơn', 'bo-sung'], han: ['Còn 6 ngày', 'an'], hd: ['A021'], go: 'appDetail' },
  { k: 'khoikien', lv: 'HC', ma: 'TN-20261019-0011', ngay: '19-10-2026', t: 'Khiếu kiện quyết định xử phạt vi phạm hành chính', tom: 'Người khởi kiện: Hoàng Dương · Người bị kiện: Chi cục Thuế khu vực I', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng án phí / lệ phí', 'an-phi'], han: ['Còn 5 ngày', 'an'], hd: ['A017'], go: 'appDetailFee' },
  { k: 'khoikien', lv: 'HC', ma: 'TN-20261014-0008', ngay: '14-10-2026', t: 'Khiếu kiện quyết định cưỡng chế tháo dỡ công trình', tom: 'Người khởi kiện: Hoàng Dương · Người bị kiện: UBND phường Láng', vt: 'Người khởi kiện', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng chi phí tố tụng', 'an-phi'], han: ['Còn 2 ngày', 'sap'], hd: ['A022'], go: 'appDetailFee' },
  { k: 'khoikien', lv: 'HC', ma: 'TN-20260925-0002', ngay: '25-09-2026', t: 'Khiếu kiện quyết định không cấp giấy phép xây dựng', tom: 'Người khởi kiện: Hoàng Dương · Người bị kiện: Sở Xây dựng Hà Nội', vt: 'Người khởi kiện', tt: 'ST-04', tinh: ['Đã trả lại đơn', 'xong'], han: ['Còn 4 ngày', 'an'], hd: ['A015'], go: 'appDetailReturned' },
  { k: 'khoikien', lv: 'DS', ma: '—', ngay: '18-10-2026', t: 'Tranh chấp hợp đồng thuê nhà', tom: 'Nguyên đơn: Hoàng Dương · Bị đơn: Phạm Thị Lan', vt: 'Người khởi kiện', tt: 'ST-01', cta: ['Tiếp tục soạn', 'draftLoad'], go: 'draftLoad' }, /* v332: mở nháp → hộp đang tải */
  { k: 'khoikien', lv: 'LĐ', ma: 'TN-20261001-0002', ngay: '01-10-2026', t: 'Tranh chấp về tiền lương', tom: 'Nguyên đơn: Trần Văn Bình · Bị đơn: Công ty Sao Mai', vt: 'Người đồng khởi kiện', tt: 'ST-02b', tinh: ['Đang chờ Tòa án xem xét đơn', 'cho'], go: 'appDetail' },
  { k: 'viecdansu', lv: 'DS', ma: 'TN-20261015-0009', ngay: '15-10-2026', t: 'Yêu cầu tuyên bố một người mất tích', tom: 'Người yêu cầu: Hoàng Dương · Người bị yêu cầu: Hoàng Văn Nam', vt: 'Người yêu cầu', tt: 'ST-02b', tinh: ['Đang chờ Tòa án xem xét đơn', 'cho'], go: 'appDetail' },
  { k: 'viecdansu', lv: 'DS', ma: 'TN-20261022-0014', ngay: '22-10-2026', t: 'Yêu cầu công nhận thuận tình ly hôn', tom: 'Người yêu cầu: Hoàng Dương, Lê Minh Tú · Người bị yêu cầu: —', vt: 'Người yêu cầu', tt: 'ST-03', tinh: ['Yêu cầu sửa đổi, bổ sung đơn', 'bo-sung'], han: ['Còn 3 ngày', 'sap'], hd: ['A028'], go: 'appDetail' },
  { k: 'viecdansu', lv: 'DS', ma: 'TN-20261017-0010', ngay: '17-10-2026', t: 'Yêu cầu tuyên bố hợp đồng vô hiệu', tom: 'Người yêu cầu: Hoàng Dương · Người bị yêu cầu: Công ty Bất động sản Phú Gia', vt: 'Người yêu cầu', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng án phí / lệ phí', 'an-phi'], han: ['Còn 5 ngày', 'an'], hd: ['A034'], go: 'appDetailFee' },
  { k: 'viecdansu', lv: 'DS', ma: 'TN-20260928-0003', ngay: '28-09-2026', t: 'Yêu cầu hạn chế năng lực hành vi dân sự', tom: 'Người yêu cầu: Hoàng Dương · Người bị yêu cầu: Hoàng Minh Quân', vt: 'Người yêu cầu', tt: 'ST-04', tinh: ['Đã trả lại đơn', 'xong'], han: ['Còn 6 ngày', 'an'], hd: ['A026'], go: 'appDetailReturned' },
  { k: 'viecdansu', lv: 'DS', ma: 'TN-20260910-0001', ngay: '10-09-2026', t: 'Yêu cầu công nhận kết quả hòa giải thành ngoài Tòa án', tom: 'Người yêu cầu: Hoàng Dương · Người bị yêu cầu: Nguyễn Thị Hằng', vt: 'Người yêu cầu', tt: 'ST-04', tinh: ['Đã giải quyết khiếu nại — giữ nguyên việc trả lại đơn', 'xong'], han: ['Còn 8 ngày', 'an'], hd: ['A008'], go: 'appDetailReturned' },
  { k: 'phasan', lv: 'PS', ma: 'TN-20261008-0004', ngay: '08-10-2026', t: 'Yêu cầu mở thủ tục phá sản', tom: 'Người yêu cầu: Hoàng Dương · Tổ chức, doanh nghiệp bị yêu cầu: Công ty TNHH Thương mại Minh Phát', vt: 'Chủ nợ', tt: 'ST-03', tinh: ['Đã thụ lý', 'xong'], go: 'psDonDetail' }, /* v396: mở chi tiết đơn như web */
  { k: 'khangcao', lv: 'KC', ma: 'TN-20261025-0015', ngay: '25-10-2026', t: 'Kháng cáo bản án sơ thẩm số 25/2026/DS-ST', tom: 'Vụ án: DS-2026-0012 · Tòa án: ' + COURT1, vt: 'Người kháng cáo', tt: 'ST-02b', tinh: ['Đang chờ Tòa án xem xét đơn', 'cho'], go: 'appealDetail', xem: 1 },
  { k: 'khangcao', lv: 'KC', ma: 'TN-20261023-0014', ngay: '23-10-2026', t: 'Kháng cáo bản án sơ thẩm số 21/2026/DS-ST', tom: 'Vụ án: DS-2026-0031 · Tòa án: ' + COURT1, vt: 'Người kháng cáo', tt: 'ST-03', tinh: ['Yêu cầu làm lại / sửa đổi đơn kháng cáo', 'bo-sung'], han: ['Còn 4 ngày', 'sap'], hd: ['A016'], go: 'appealSua' },
  { k: 'khangcao', lv: 'KC', ma: 'TN-20261020-0013', ngay: '20-10-2026', t: 'Kháng cáo quá hạn bản án sơ thẩm số 15/2026/KDTM-ST', tom: 'Vụ án: KD-2026-0004 · Tòa án: ' + COURT1, vt: 'Người kháng cáo', tt: 'ST-03', tinh: ['Đang xem xét lý do kháng cáo quá hạn', 'cho'], han: ['Còn 6 ngày', 'an'], hd: ['A020', 'LICH'], hanHd: { A020: ['Còn 6 ngày', 'an'], LICH: ['Còn 2 ngày', 'sap'] }, go: 'appealQuaHan' },
  { k: 'khangcao', lv: 'KC', ma: 'TN-20261018-0012', ngay: '18-10-2026', t: 'Kháng cáo bản án sơ thẩm số [Số bản án]', tom: 'Vụ án: HN-2026-0007 · Tòa án: ' + COURT1, vt: 'Người kháng cáo', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng án phí phúc thẩm', 'an-phi'], han: ['Còn 3 ngày', 'sap'], hd: ['A018'], go: 'appealTamUng' },
  { k: 'khangcao', lv: 'KC', ma: 'TN-20261011-0009', ngay: '11-10-2026', t: 'Kháng cáo bản án sơ thẩm số 12/2026/DS-ST (đương sự khác)', tom: 'Vụ án: DS-2026-0018 · Tòa án: ' + COURT1, vt: 'Bị đơn', tt: 'ST-03', tinh: ['Vụ án có kháng cáo', 'cho'], han: ['Còn 9 ngày', 'an'], hd: ['A009'], go: 'appealDetail' },
  { k: 'phanto', lv: 'PT', ma: 'TN-20261028-0018', ngay: '28-10-2026', t: 'Phản tố · Tranh chấp hợp đồng vay tài sản', tom: 'Vụ án: DS-2026-0012 · Tòa án: ' + COURT1, vt: 'Bị đơn', tt: 'ST-02b', tinh: ['Đang chờ Tòa án xem xét đơn', 'cho'], go: 'ptDetail', xem: 1 },
  { k: 'phanto', lv: 'PT', ma: 'TN-20261026-0017', ngay: '26-10-2026', t: 'Phản tố · Tranh chấp hợp đồng mua bán hàng hóa', tom: 'Vụ án: KD-2026-0004 · Tòa án: ' + COURT1, vt: 'Bị đơn', tt: 'ST-03', tinh: ['Đã đưa vào vụ án (phản tố / yêu cầu độc lập)', 'xong'], han: ['Còn 10 ngày', 'an'], hd: ['A047'], go: 'ptDetail' },
  { k: 'phanto', lv: 'PT', ma: 'TN-20261024-0016', ngay: '24-10-2026', t: 'Phản tố · Tranh chấp quyền sử dụng đất', tom: 'Vụ án: DS-2026-0031 · Tòa án: ' + COURT1, vt: 'Bị đơn', tt: 'ST-03', tinh: ['Yêu cầu sửa đổi, bổ sung đơn', 'bo-sung'], han: ['Còn 4 ngày', 'sap'], hd: ['A049'], go: 'ptDetail' },
  { k: 'phanto', lv: 'PT', ma: 'TN-20261021-0015', ngay: '21-10-2026', t: 'Phản tố · Tranh chấp hợp đồng thuê tài sản', tom: 'Vụ án: DS-2026-0027 · Tòa án: ' + COURT1, vt: 'Bị đơn', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng án phí / lệ phí', 'an-phi'], han: ['Còn 5 ngày', 'an'], hd: ['A017'], go: 'ptDetail' },
  { k: 'phanto', lv: 'PT', ma: 'TN-20261009-0005', ngay: '09-10-2026', t: 'Phản tố · Tranh chấp hợp đồng dịch vụ', tom: 'Vụ án: DS-2026-0021 · Tòa án: ' + COURT1, vt: 'Bị đơn', tt: 'ST-04', tinh: ['Đã trả lại đơn', 'xong'], han: ['Còn 6 ngày', 'an'], hd: ['A050'], go: 'ptDetailReturned' },
  { k: 'phanto', lv: 'YC', ma: 'TN-20261027-0019', ngay: '27-10-2026', t: 'Yêu cầu độc lập · Tranh chấp di sản thừa kế', tom: 'Vụ án: DS-2026-0033 · Tòa án: ' + COURT1, vt: 'Người có quyền lợi, nghĩa vụ liên quan', tt: 'ST-03', tinh: ['Đã đưa vào vụ án (phản tố / yêu cầu độc lập)', 'xong'], han: ['Còn 12 ngày', 'an'], hd: ['A048'], go: 'ycDetail' },
  { k: 'phanto', lv: 'YC', ma: 'TN-20261025-0016', ngay: '25-10-2026', t: 'Yêu cầu độc lập · Tranh chấp tài sản chung', tom: 'Vụ án: DS-2026-0029 · Tòa án: ' + COURT1, vt: 'Người có quyền lợi, nghĩa vụ liên quan', tt: 'ST-03', tinh: ['Yêu cầu sửa đổi, bổ sung đơn', 'bo-sung'], han: ['Còn 3 ngày', 'sap'], hd: ['A051'], go: 'ycDetail' },
  { k: 'phanto', lv: 'YC', ma: 'TN-20261022-0015', ngay: '22-10-2026', t: 'Yêu cầu độc lập · Tranh chấp hợp đồng tặng cho', tom: 'Vụ án: DS-2026-0025 · Tòa án: ' + COURT1, vt: 'Người có quyền lợi, nghĩa vụ liên quan', tt: 'ST-03', tinh: ['Chờ nộp tạm ứng án phí / lệ phí', 'an-phi'], han: ['Còn 6 ngày', 'an'], hd: ['A017'], go: 'ycDetail' },
  { k: 'phanto', lv: 'YC', ma: 'TN-20261007-0004', ngay: '07-10-2026', t: 'Yêu cầu độc lập · Tranh chấp hợp đồng chuyển nhượng', tom: 'Vụ án: DS-2026-0019 · Tòa án: ' + COURT1, vt: 'Người có quyền lợi, nghĩa vụ liên quan', tt: 'ST-04', tinh: ['Đã trả lại đơn', 'xong'], han: ['Còn 5 ngày', 'an'], hd: ['A052'], go: 'ycDetailReturned' },
  { k: 'gdt', lv: 'GĐT', ma: 'TN-20261029-0020', ngay: '29-10-2026', t: 'Đề nghị xem xét theo thủ tục giám đốc thẩm', tom: 'Bản án: số 18/2026/DS-PT · Tòa án: Tòa án nhân dân thành phố Hà Nội', vt: 'Người đề nghị', tt: 'ST-02b', tinh: ['Đang chờ Tòa án xem xét đơn', 'cho'], go: 'gdtDetail', xem: 1 },
  { k: 'gdt', lv: 'GĐT', ma: 'TN-20261019-0012', ngay: '19-10-2026', t: 'Đề nghị xem xét theo thủ tục giám đốc thẩm', tom: 'Bản án: số 09/2026/DS-PT · Tòa án: Tòa án nhân dân thành phố Hà Nội', vt: 'Người đề nghị', tt: 'ST-03', tinh: ['Yêu cầu sửa đổi, bổ sung đơn đề nghị', 'bo-sung'], han: ['Còn 5 ngày', 'an'], hd: ['A019'], go: 'gdtDetailFix' },
  { k: 'gdt', lv: 'TT', ma: 'TN-20260930-0006', ngay: '30-09-2026', t: 'Đề nghị xem xét theo thủ tục tái thẩm', tom: 'Bản án: số 05/2026/DS-PT · Tòa án: Tòa án nhân dân thành phố Hà Nội', vt: 'Người đề nghị', tt: 'ST-03', tinh: ['Phiên tòa GĐT / tái thẩm hoãn', 'cho'], han: ['Còn 5 ngày', 'an'], hd: ['LICHH'], go: 'gdtTt' }];
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
  if (d.hd) hdActs(d.hd).forEach(function (a) { var code = d.hd.filter(function (c) { return HD[c] && HD[c][0] === a[0]; })[0]; var hn = hh[code] || (d.hd.length === 1 ? d.han : null); ds.push({ t: a[0], go: a[1], hn: hn, lock: !!hn && hn[1] === 'qua' && a[1] === 'dvcqgExt' }); }); /* v215: khóa theo hạn riêng của từng việc */
  else if (d.cta) ds.push({ t: d.cta[0], go: d.cta[1], hn: d.han, lock: false });
  return ds;
}
function qdViecIc(g, t) { return g === 'dvcqgExt' ? 'wallet' : /^cal|^hearing/.test(g) ? 'calendar' : /^kq|^kr/.test(g) ? 'alert' : /Ký số/.test(t) ? 'pen' : /soạn/.test(t) ? 'file' : 'filePlus'; }
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
/* đối chiếu (21/11/2026): thuộc tính tùy chọn – demDu: chip "Tất cả" có số, chip số 0 vẫn hiện "0" (như web); khongSapXep: bỏ nút Sắp xếp. Mặc định giữ như cũ */
function StRow(p) {
  var o = React.useState(false), sv = React.useState((p.sorts || ['Mới nhất'])[0]), anchor = React.useRef(null), host = useHost(anchor);
  var sorts = p.sorts || ['Mới nhất', 'Cũ nhất'], cur = p.sort || sv[0];
  if (p.boLoc) return h(StBoLoc, p);
  return h('div', { className: 'ib-docrow st-row' }, h('span', { ref: anchor, hidden: true }),
    h('div', { className: 'ib-chips2 st-chips', role: 'radiogroup', 'aria-label': p.label }, p.items.map(function (x, i) {
      var on = p.value === x.key;
      return h('button', { key: x.key, type: 'button', role: 'radio', 'aria-checked': on, className: 'ib-chip2' + (on ? ' ib-chip2-on' : ''), onClick: function () { p.onChange(x.key); } }, x.label, p.demDu ? (x.count != null ? h('span', { className: 'ib-chip2-n tp-num' }, x.count) : null) : i > 0 && x.count ? h('span', { className: 'ib-chip2-n tp-num' }, x.count) : null);
    })),
    p.khongSapXep ? null : h('button', { type: 'button', className: 'ph-ibar-sort ib-sort2', 'aria-label': 'Sắp xếp: ' + cur, onClick: function () { o[1](true); } }, h(T.Icon, { name: 'sortDesc' }), cur),
    o[0] && host ? h(LvSheet, { host: host, title: 'Sắp xếp', onClose: function () { o[1](false); } }, h(LvRows, { label: 'Sắp xếp', cur: cur, items: sorts.map(function (x) { return { id: x, name: x }; }), onPick: function (id) { if (p.onSort) p.onSort(id); else sv[1](id); o[1](false); } })) : null);
}
/* v206 (04/11/2026): Danh sách đơn – trạng thái đơn vào bộ lọc, chọn B: nút "Bộ lọc" (phễu) mở bảng "Bộ lọc" có nhóm chip Trạng thái đơn (kèm số đơn) + Xóa lọc / Áp dụng; khi đang lọc nút đỏ có số 1 và chip trạng thái ✕ để bỏ nhanh; "Sắp xếp" giữ bên phải */
/* đối chiếu (21/11/2026): thuộc tính tùy chọn khongSapXep – bỏ nút Sắp xếp; tieuDeLoc – tên bảng lọc (bỏ nhãn nhóm trùng). Mặc định giữ như cũ */
function StBoLoc(p) {
  var o = React.useState(null), sv = React.useState((p.sorts || ['Mới nhất'])[0]), tmp = React.useState(p.value), anchor = React.useRef(null), host = useHost(anchor);
  var sorts = p.sorts || ['Mới nhất', 'Cũ nhất'], cur = p.sort || sv[0], tatCa = p.items[0].key;
  var curIt = p.items.filter(function (x) { return x.key === p.value; })[0], loc = !!curIt && p.value !== tatCa;
  return h('div', { className: 'ib-docrow st-row sf-row' }, h('span', { ref: anchor, hidden: true }),
    p.khongSapXep ? null : h('button', { type: 'button', className: 'ph-ibar-sort ib-sort2', 'aria-label': 'Sắp xếp: ' + cur, onClick: function () { o[1]('sort'); } }, h(T.Icon, { name: 'sortDesc' }), cur), /* v210: đổi chỗ – Sắp xếp bên trái, Bộ lọc bên phải */
    h('span', { className: 'sf-sp' }),
    loc ? h('button', { type: 'button', className: 'sf-chip', 'aria-label': 'Bỏ lọc ' + curIt.label, onClick: function () { p.onChange(tatCa); } }, curIt.label, h(T.Icon, { name: 'x' })) : null,
    h('button', { type: 'button', className: 'sf-pill' + (loc ? ' sf-on' : ''), 'aria-label': loc ? 'Bộ lọc, đang lọc 1 điều kiện' : 'Bộ lọc', onClick: function () { tmp[1](p.value || tatCa); o[1]('loc'); } }, h(T.Icon, { name: 'filter' }), 'Bộ lọc', loc ? h('span', { className: 'sf-badge tp-num', 'aria-hidden': 'true' }, '1') : null),
    o[0] === 'sort' && host ? h(LvSheet, { host: host, title: 'Sắp xếp', onClose: function () { o[1](null); } }, h(LvRows, { label: 'Sắp xếp', cur: cur, items: sorts.map(function (x) { return { id: x, name: x }; }), onPick: function (id) { if (p.onSort) p.onSort(id); else sv[1](id); o[1](null); } })) : null,
    o[0] === 'loc' && host ? h(LvSheet, { host: host, title: p.tieuDeLoc || 'Bộ lọc', onClose: function () { o[1](null); },
      /* v265 (05/11/2026): theo kiểu Phân loại thư – nhãn nhóm xám, dòng tên + số đơn, dòng đang chọn nền xám (surface-sunken) chữ đậm, không dấu tích; chân bảng chỉ còn "Áp dụng" (bỏ lọc = chọn Tất cả) */
      foot: h(T.Button, { block: true, onClick: function () { p.onChange(tmp[0]); o[1](null); } }, 'Áp dụng') },
      h('div', { className: 'ib-pl sf-pl' }, p.tieuDeLoc ? null : h('p', { className: 'ib-pl-h' }, p.nhom || 'Trạng thái'),
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
    h('header', { className: 'qh' + HdCls() }, h('button', { type: 'button', className: 'tp-icon-btn qh-back', 'aria-label': 'Quay lại', 'data-pt-go': 'back' }, h(T.Icon, { name: 'chevronLeft' })),
      h('button', { type: 'button', className: 'qh-sel qh-lq qh-lqE', 'aria-haspopup': 'dialog', 'aria-label': 'Loại đơn: ' + cur[1] + '. Đổi loại đơn', onClick: function () { o[1](true); } }, QdSelIn(cur[1], cur[0])),
      HdNut('draftAsk', 'Nộp đơn mới') /* v204: cỡ sm của DS (cao 36px) · v208: bỏ dấu +, nhãn 'Nộp đơn mới' */),
    h(Body, { cls: 'ph-plain' }, p.body),
    o[0] && host ? h(LvSheet, { host: host, title: 'Danh sách đơn và tiến trình', onClose: function () { o[1](false); } }, QdLoaiList(p.kinds, function (id) { p.onPick(id); o[1](false); })) : null);
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
  return h(DonChiTiet, { meta: h(F, null, h('span', { className: 'tp-num' }, '-'), ' · Ngày tạo 22-10-2026'), name: 'Đơn khởi kiện – Tranh chấp hợp đồng mua bán',
    badges: qdBadges(['Chờ ký số', 'warning']),
    /* v252: nút Nộp đơn lên khối đầu màn (xám – không có hạn); danh sách người ký giữ ở tab */
    viec: { tone: 'neutral', t: 'Tiến độ ký số', btn: du ? { l: 'Nộp đơn', ic: 'send', go: 'snack:Đã gửi đơn khởi kiện thành công.' } : { l: 'Chờ đủ chữ ký để nộp đơn', dis: true } },
    top: Blk('Tiến độ ký số', h(F, null,
      h(T.SignerList, { document: 'Hồ sơ đơn khởi kiện', onView: noop, signers: [{ name: 'Hoàng Dương', role: 'Người khởi kiện', signed: true, signedAt: 'Đã ký 22-10-2026 09:12' },
        { name: 'Trần Văn Bình', role: 'Người đồng khởi kiện', signed: !!du, signedAt: du ? 'Đã ký 23-10-2026 14:30' : undefined }] }),
      du ? null : P('Hồ sơ đang có người ký, hệ thống đang xử lý — vui lòng chờ rồi thử lại.', 'ph-muted dt-small')), { cls: 'qd-ky' }) });
}
/* đơn đã thụ lý thành vụ án – banner ở mọi tab */
function AppDetailAccepted() {
  return h(DonChiTiet, { nd: 'file', vuAn: 1, meta: h(F, null, h('span', { className: 'tp-num' }, 'TN-20261005-0003'), ' · Ngày tạo 05-10-2026'), name: 'Đơn khởi kiện – Tranh chấp quyền sử dụng đất',
    badges: qdBadges(['Đang xử lý', 'info'], ['Đã thụ lý vụ án', 'success']),
    /* v252: banner đỏ "VỤ ÁN ĐÃ THỤ LÝ" thay bằng khối đầu màn (xám – thông tin) */
    viec: { tone: 'neutral', t: 'Đơn đã được thụ lý thành Vụ án DS-2026-0012', han: COURT1 + ' · Thụ lý 15-10-2026', btn: { l: 'Xem chi tiết Vụ án', v: 'secondary', go: 'caseDetail' } } });
}
/* tạm ứng án phí: còn hạn – 2 nút; quá hạn – chỉ thông báo đỏ, ẩn nút */
function AppDetailFee(tre) {
  return h(DonChiTiet, { nd: tre ? 'file' : 'nhap', tamUng: tre ? 'tre' : 'con', meta: h(F, null, h('span', { className: 'tp-num' }, 'TN-20261012-0007'), ' · Ngày tạo 12-10-2026'), name: 'Đơn khởi kiện – Tranh chấp hợp đồng cung ứng dịch vụ',
    badges: qdBadges(['Đang xử lý', 'info'], ['Chờ nộp tạm ứng án phí / lệ phí', 'warning']),
    /* v252: khối đầu màn – còn hạn: vàng, nút Thanh toán + mũi tên mở "Đề nghị miễn, giảm án phí"; quá hạn: đỏ, không nút ("Quá hạn 1 ngày" theo thẻ danh sách) */
    viec: tre ? { tone: 'danger', t: 'Nộp tạm ứng án phí 1.250.000 đ', han: 'Hạn 02-11-2026', con: 'Quá hạn 1 ngày' }
      : { mg2a2: 1, t: 'Nộp tạm ứng án phí 1.250.000 đ', han: 'Hạn 06-11-2026', btn: { l: 'Thanh toán qua Cổng Dịch vụ công Quốc gia', go: 'dvcqgExt' }, more: [{ l: 'Đề nghị miễn, giảm án phí', go: 'mg1' }] } });
}
var QD_PHAN = [['Thông tin các bên và địa chỉ', 'Giữ nguyên, dùng lại được cho đơn mới.', 1], ['Nội dung yêu cầu khởi kiện', 'Giữ nguyên phần mô tả quan hệ tranh chấp và yêu cầu cụ thể.', 1], ['Tài liệu, chứng cứ đã nộp', '3 tệp còn hiệu lực, tự đính kèm lại vào đơn mới.', 1], ['Nội dung Tòa án nêu chưa đạt', 'Người khởi kiện không sửa đổi, bổ sung đơn khởi kiện theo yêu cầu của Thẩm phán trong thời hạn (điểm e khoản 1 Điều 192 BLTTDS).', 0]];
/* đơn bị trả lại: Lập lại đơn từ phần hợp lệ + Khiếu nại việc trả lại đơn */
function AppDetailReturned() {
  return h(DonChiTiet, { nd: 'file', kq: 1, meta: h(F, null, h('span', { className: 'tp-num' }, 'TN-20260920-0001'), ' · Ngày tạo 20-09-2026'), name: 'Đơn khởi kiện – Ly hôn, tranh chấp nuôi con',
    badges: qdBadges(['Đã xử lý', 'success'], ['Đã trả lại đơn', 'neutral']),
    /* v252: khối đầu màn đỏ (bị trả lại); chưa xác định nút chính nên hiện cả 2 nút, chia đôi hàng dưới */
    viec: { tone: 'danger', t: 'Đã trả lại đơn', han: 'Thông báo trả lại đơn khởi kiện số [Số thông báo]', two: [{ l: 'Lập đơn mới từ đơn này', go: 'sub1' }, { l: 'Khiếu nại việc trả lại đơn (Trong 10 ngày)', v: 'secondary', go: 'kr1' }] },
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
      h('span', { className: 'mg-opt-r', 'aria-hidden': 'true' }), h('span', { className: 'mg-opt-tx' }, h('b', null, x.t), x.d ? h('small', null, x.d) : null, x.d2 ? h('small', null, x.d2) : null, x.tag ? h('em', { className: x.tone ? 'mg-em-' + x.tone : undefined }, x.tag) : null)); /* v400: d2, tone */
  }));
}
/* ô chọn → bảng từ đáy (dùng IbPick) */
function ChonO(p) { return h(IbPick, { host: p.host, label: p.label, v: p.v, placeholder: p.placeholder || 'Chọn', onPick: p.onPick, items: p.items }); }

/* ---------- Đề nghị miễn, giảm tạm ứng án phí (web /mien-giam-an-phi) ---------- */
var MG_STEPS = ['Vụ việc và diện miễn, giảm', 'Căn cứ và lý do', 'Tài liệu chứng minh', 'Xem lại và ký gửi'];
var MG_UI = { loai: 'mien' };
/* danh mục DIEN_MIEN_100 (Điều 12) và CAN_CU_GIAM_50 (Điều 13) – lib/danh-muc-don-phu.ts */
var MG_MIEN = [['Người lao động khởi kiện về quyền lợi lao động', 'Giấy tờ, thẻ chứng minh thuộc đối tượng ưu tiên chính sách'], ['Yêu cầu cấp dưỡng, xác định cha, mẹ cho con chưa thành niên', 'Giấy tờ, thẻ chứng minh thuộc đối tượng ưu tiên chính sách'], ['Cá nhân thuộc hộ nghèo', 'Giấy chứng nhận hộ nghèo hoặc giấy xác nhận của UBND cấp xã'], ['Cá nhân thuộc hộ cận nghèo', 'Giấy chứng nhận hộ cận nghèo hoặc giấy xác nhận của UBND cấp xã'], ['Người cao tuổi (từ đủ 60 tuổi trở lên)', 'Căn cước công dân gắn chip — hệ thống tự nhận diện ngày sinh'], ['Người khuyết tật', 'Giấy xác nhận mức độ khuyết tật do UBND cấp xã cấp'], ['Người có công với cách mạng', 'Quyết định phong tặng danh hiệu, thẻ thương binh hoặc giấy chứng nhận người có công'], ['Đồng bào dân tộc thiểu số ở xã có điều kiện kinh tế – xã hội đặc biệt khó khăn', 'Giấy xác nhận nơi cư trú tại xã đặc biệt khó khăn'], ['Thân nhân liệt sĩ', 'Giấy chứng nhận gia đình liệt sĩ']];
var MG_GIAM = [['Bị thiệt hại nặng nề do thiên tai, bão lũ, hỏa hoạn', 'Văn bản xác nhận của UBND cấp xã về sự kiện bất khả kháng và hoàn cảnh khó khăn'], ['Mắc bệnh hiểm nghèo, tai nạn nghiêm trọng phải điều trị dài ngày', 'Văn bản xác nhận của UBND cấp xã về sự kiện bất khả kháng và hoàn cảnh khó khăn'], ['Mất toàn bộ hoặc phần lớn tài sản do sự kiện bất khả kháng khác', 'Văn bản xác nhận của UBND cấp xã về sự kiện bất khả kháng và hoàn cảnh khó khăn']];
function Mg1() {
  var l = React.useState(MG_UI.loai); MG_UI.loai = l[0];
  return Wz({ title: 'Miễn, giảm án phí', steps: MG_STEPS, n: 1, go: 'mg2', body: h(F, null,
    FCard('Nghĩa vụ tạm ứng án phí', RvKV([['Mã vụ việc, đơn khởi kiện liên quan', h('span', { className: 'tp-num' }, 'TN-20261012-0007')], ['Loại việc', 'Tranh chấp hợp đồng cung ứng dịch vụ'], ['Tòa án tiếp nhận và giải quyết', COURT1],
      ['Số tiền tạm ứng theo thông báo', '1.250.000 đ'], ['Hạn nộp', '06-11-2026'], ['Số tiền nếu được giảm 50%', '625.000 đ'], ['Tình trạng', 'Chưa nộp']]), true),
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
  return SubS('Miễn, giảm án phí', h(F, null, h(IbEmpty, { title: 'Đã quá hạn nộp tạm ứng án phí', text: 'Hạn nộp đề nghị miễn, giảm là 02-11-2026, đã quá 1 ngày. Đơn được nộp đề nghị miễn, giảm trong 07 ngày kể từ ngày nhận thông báo nộp tiền (Điều 195 Bộ luật Tố tụng dân sự 2015).' }),
    h('div', { className: 'qd-empty-act' }, h(T.Button, { size: 'sm', variant: 'secondary', icon: 'arrowLeft', 'data-pt-go': 'back' }, 'Về chi tiết đơn'))));
}
function MgDenied() {
  return SubS('Miễn, giảm án phí', h(F, null, h(IbEmpty, { title: 'Không thể nộp đề nghị miễn, giảm', text: 'Bạn không có quyền nộp đề nghị miễn, giảm tạm ứng án phí cho đơn này theo thông báo hiện tại của Tòa án.' }),
    h('div', { className: 'qd-empty-act' }, h(T.Button, { size: 'sm', variant: 'secondary', icon: 'arrowLeft', 'data-pt-go': 'back' }, 'Về chi tiết đơn'))));
}

/* ---------- Yêu cầu rút đơn khởi kiện (web /rut-don) ---------- */
var RD_STEPS = ['Đơn cần rút', 'Lý do và hệ quả', 'Xác nhận và ký gửi'];
var RD_LYDO = [['RD-1', 'Các bên đã tự thỏa thuận được với nhau', 'Không cần Tòa án tiếp tục giải quyết.'], ['RD-2', 'Không còn nhu cầu giải quyết tại Tòa án'], ['RD-3', 'Nộp nhầm loại đơn hoặc sai thẩm quyền', 'Bạn sẽ nộp lại đơn đúng loại việc, đúng Tòa án.'], ['RD-4', 'Cần chuẩn bị lại hồ sơ, chứng cứ'], ['RD-5', 'Lý do khác', 'Trình bày cụ thể ở ô bên dưới.']];
function Rd1() {
  return Wz({ title: 'Rút đơn', steps: RD_STEPS, n: 1, go: 'rd2', body: FCard('Đơn bạn đề nghị rút', h(F, null, Lead('Kiểm tra đúng đơn trước khi tiếp tục. Thông tin lấy tự động, không sửa được.'),
    RvKV([['Mã đơn', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Loại đơn', 'Đơn khởi kiện – Tranh chấp hợp đồng vay tài sản'], ['Ngày gửi', '20-10-2026'], ['Tòa án tiếp nhận', COURT1], ['Trạng thái hiện tại', 'Đã gửi đơn'], ['Vụ án liên quan', 'Chưa phát sinh']])), true) });
}
function Rd2() {
  var l = React.useState('RD-1'), t = React.useState('');
  return Wz({ title: 'Rút đơn', steps: RD_STEPS, n: 2, go: 'rd3', body: h(F, null,
    FCard('Lý do rút đơn', h(F, null, Lead('Thông tin này giúp Tòa án xử lý yêu cầu nhanh hơn.'),
      h(ChonThe, { label: 'Lý do rút đơn', v: l[0], onPick: l[1], items: RD_LYDO.map(function (x) { return { id: x[0], t: x[1], d: x[2] }; }) }),
      Tf('Trình bày', { required: l[0] === 'RD-5', multiline: true, value: t[0], onChange: function (e) { t[1](e.target.value); }, placeholder: 'Hai bên đã thỏa thuận xong ngày 20-06-2026…', error: l[0] === 'RD-5' && t[0].length > 0 && t[0].length < 15 ? 'Nêu rõ lý do rút đơn (tối thiểu 15 ký tự).' : undefined })), true),
    h('div', { className: 'rd-hq' }, h('p', { className: 'rd-hq-h' }, h(T.Icon, { name: 'alert' }), 'Hệ quả của việc rút đơn ở trạng thái hiện tại'),
      h('div', { className: 'rd-hq-c' }, h('b', null, 'Việc giải quyết đơn sẽ chấm dứt'), h('p', null, 'Tòa án ra quyết định phù hợp với giai đoạn hiện tại của đơn.'))),
    FCard('Tiền tạm ứng án phí liên quan', RvKV([['Số tiền theo thông báo', '—'], ['Tình trạng nộp', 'Chưa nộp'], ['Nếu đã nộp', 'Quyền hoàn trả được xử lý tại mục Nghĩa vụ tài chính']]), true)) });
}
function Rd3() {
  return h(KyGuiDon, { title: 'Rút đơn', steps: RD_STEPS, kyTitle: 'Xem lại và ký gửi', ok: 'rdOk', tep: ['Đơn yêu cầu rút đơn khởi kiện'], tepMeta: 'Xem trước đơn', vaiTro: 'Người khởi kiện',
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
    footer: h(F, null, h(T.Button, { variant: 'secondary', 'data-pt-go': 'back' }, p.cancel || 'Huỷ'), h(T.Button, { variant: p.danger ? 'primary' : undefined, 'data-pt-go': p.go, 'data-pt-snack': p.snack, onClickCapture: p.onOk }, p.ok)) }), host) : null);
}

/* ---------- Sửa đổi, bổ sung đơn theo yêu cầu của Tòa án (web /sua-doi-bo-sung) ---------- */
var SD_STEPS = ['Đơn cần sửa và yêu cầu của Tòa án', 'Nội dung sửa đổi, bổ sung', 'Tài liệu kèm theo', 'Xem lại và ký gửi'];
function Sd1() {
  return Wz({ title: 'Sửa đơn theo yêu cầu', steps: SD_STEPS, n: 1, go: 'sd2', body: h(F, null,
    FCard('Đơn đang có yêu cầu sửa đổi, bổ sung', RvKV([['Mã hồ sơ', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Đơn liên quan', 'Đơn khởi kiện – Tranh chấp hợp đồng vay tài sản'], ['Trạng thái', 'Đã gửi đơn']]), true),
    FCard('Yêu cầu của Tòa án', h(F, null, RvKV([['Văn bản yêu cầu', 'Thông báo yêu cầu sửa đổi, bổ sung đơn khởi kiện số [Số thông báo]'], ['Đơn liên quan', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Tòa án yêu cầu', COURT1], ['Ngày tống đạt', '22-10-2026']]),
      h('p', { className: 'sd-han' }, h('span', { className: 'ib-due ib-due-sap' }, 'Còn 3 ngày'), 'Hạn 06-11-2026 (tính từ ngày tống đạt 22-10-2026).'),
      HopGhi('Nội dung Tòa án yêu cầu', '[Nội dung yêu cầu sửa đổi, bổ sung theo thông báo]')), true)) });
}
function Sd2() {
  return Wz({ title: 'Sửa đơn theo yêu cầu', steps: SD_STEPS, n: 2, go: 'sd3', body: h(F, null,
    FCard('Biểu mẫu điện tử', h(F, null, Lead('Biểu mẫu điện tử "Tranh chấp hợp đồng vay tài sản" bên dưới đã nạp lại toàn bộ nội dung đơn ban đầu. Bạn có thể sửa đổi, bổ sung trực tiếp trên biểu mẫu theo yêu cầu của Tòa án.'),
      Tf('Nội dung yêu cầu khởi kiện', { required: true, multiline: true, defaultValue: 'Đề nghị Tòa án buộc ông Trần Văn Bình trả số tiền vay 200.000.000 đồng và tiền lãi theo hợp đồng vay tài sản ngày 10-01-2026.' }),
      Tf('Yêu cầu khác', { multiline: true, placeholder: 'Không bắt buộc' }),
      P('Viết thành nội dung hoàn chỉnh để Tòa án đưa nguyên văn vào hồ sơ, không viết dạng ghi chú sửa đổi.', 'ph-muted dt-small')), true),
    FCard('Đơn đã nộp', DtDocs([['Đơn khởi kiện', 'don-khoi-kien-TN-20261020-0012.pdf · Đã ký số']]), true /* v380: mở sẵn */)) });
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
function trSteps() { return ['Loại điều chỉnh', TR_UI.loai === 'TD-02' ? 'Yêu cầu cần rút' : 'Yêu cầu cần thay đổi', 'Lý do và hệ quả', 'Tài liệu kèm theo', 'Xem lại và ký gửi']; }
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
  return h(KyGuiDon, { title: 'Thay đổi, rút yêu cầu', steps: trSteps(), kyTitle: 'Xem lại và ký gửi', ok: 'trOk', vaiTro: 'Nguyên đơn', tep: [rut ? 'Bản in Đơn đề nghị rút một phần yêu cầu' : 'Bản in Đơn thay đổi, bổ sung yêu cầu'], tepMeta: 'Xem trước đơn',
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
var BP_STEPS = ['Biện pháp cần áp dụng', 'Đối tượng và lý do', 'Tài liệu và biện pháp bảo đảm', 'Xem lại và ký gửi'];
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
function sgSteps() { return ['Cách thực hiện', 'Tài liệu cần sao gửi', 'Người nhận', SG_UI.cach === 'ht' ? 'Lý do đề nghị hỗ trợ' : 'Phương thức sao gửi', 'Tình hình sao gửi', 'Xem lại và ký gửi']; }
var SG_TL = ['Sao kê chuyển khoản', 'Tin nhắn trao đổi'];
function Sg1() {
  var c = React.useState(SG_UI.cach); SG_UI.cach = c[0];
  return Wz({ title: 'Sao gửi tài liệu, chứng cứ', steps: sgSteps(), n: 1, go: 'sg2', body: h(F, null,
    FCard('Lần giao nộp đang sao gửi', RvKV([['Vụ án', h(F, null, h('span', { className: 'tp-num' }, 'DS-2026-0012'), ' · Tranh chấp hợp đồng vay tài sản')], ['Biên nhận giao nộp', 'Giao nộp 24-10-2026 · Biên nhận BN-2026-0105'], ['Tài liệu đã giao nộp', '2 tài liệu'], ['Đương sự khác trong vụ án', '2 đương sự']]), true),
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
  return h(KyGuiDon, { title: 'Sao gửi tài liệu, chứng cứ', steps: sgSteps(), kyTitle: 'Xem trước và ký số văn bản', ok: 'sgOk', sendLabel: 'Ký gửi', vaiTro: 'Nguyên đơn', tep: [ht ? 'Đơn đề nghị Tòa án hỗ trợ sao gửi tài liệu, chứng cứ' : 'Thông báo về việc sao gửi tài liệu, chứng cứ'], tepMeta: 'Xem trước văn bản',
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
    info: [['Vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Số thụ lý vụ án', h('span', { className: 'tp-num' }, '12/2026/TLST-DS')], ['Ngày thụ lý vụ án', '15-10-2026'], ['Tòa án xét xử sơ thẩm', COURT1], ['Loại kháng cáo', st === 'quaHan' ? 'Kháng cáo quá hạn' : 'Kháng cáo bản án'], ['Văn bản bị kháng cáo', 'Bản án số 25/2026/DS-ST'], ['Tư cách', 'Nguyên đơn'], ['Mã tiếp nhận kháng cáo', h('span', { className: 'tp-num' }, st === 'nhap' || st === 'ky' ? '—' : 'TN-20261025-0015')]],
    viec: kcViec(st), acts: KcTienTrinh(st),
    render: function (t) {
      if (t === 'noi-dung') return h(F, null, FCard('Nội dung kháng cáo', RvKV([['Phạm vi kháng cáo', 'Một phần bản án / quyết định'], ['Chi tiết phần bị kháng cáo', 'Mục 2 phần Quyết định của bản án'], ['Nội dung không đồng ý', 'Không đồng ý với việc Tòa án buộc nguyên đơn chịu toàn bộ án phí sơ thẩm.'], ['Lý do kháng cáo', 'Tòa án cấp sơ thẩm chưa xem xét chứng cứ chuyển khoản ngày 05-01-2026 do nguyên đơn giao nộp.'], ['Yêu cầu Tòa án cấp phúc thẩm', 'Sửa phần án phí của bản án sơ thẩm.']]), true),
        FCard('Tài liệu đính kèm', DtDocs([['Đơn kháng cáo', 'don-khang-cao.pdf · Đã ký số'], ['Bản án sơ thẩm', 'ban-an-25-2026-DS-ST.pdf']], { tai: true, the: true }), true)); /* v352 (QLD3-W06: thêm nút Tải về */
      if (t === 'van-ban') return kcVanBan();
      if (t === 'phat-sinh') return kcPhatSinh();
      return dkLichSu([{ title: 'Đang xử lý đơn', date: '28-10-2026', state: 'current' }, { title: 'Đã gửi đơn', date: '25-10-2026', state: 'done' }, { title: 'Chờ đủ chữ ký', date: '25-10-2026', state: 'done' }]);
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
    info: [['Mã tiếp nhận', h('span', { className: 'tp-num' }, st === 'nhap' ? '—' : 'TN-20261029-0020')], ['Tòa án nhận đơn', 'Tòa án nhân dân cấp cao tại Hà Nội'], ['Ngày nộp', st === 'nhap' ? '—' : '29-10-2026'], ['Số bản án / quyết định', '18/2026/DS-PT'], ['Mã vụ án', h('span', { className: 'tp-num' }, 'DS-2025-0098')], ['Ngày ban hành', '15-09-2026'], ['Tòa án ban hành', 'Tòa án nhân dân thành phố Hà Nội'], ['Đối tượng', 'Bản án phúc thẩm'], ['Loại án', 'Dân sự']].concat(tt ? [['Ngày biết căn cứ', '15-09-2025 · đã quá hạn 59 ngày']] : []), /* v353 (QLD4-W02 */
    viec: gdtViec(st, ten),
    render: function (t) {
      if (t === 'noi-dung') return h(F, null, FCard('Căn cứ đề nghị ' + ten, P(tt ? 'Mới phát hiện được tình tiết quan trọng của vụ án mà đương sự đã không thể biết được trong quá trình giải quyết vụ án (khoản 1 Điều 352 BLTTDS)' : 'Có vi phạm nghiêm trọng thủ tục tố tụng (khoản 1 Điều 326 BLTTDS)', 'ph-muted'), true),
        tt ? FCard('Cách biết được căn cứ', P('Nhận được biên bản đo đạc hiện trạng năm 2020 do UBND phường cung cấp ngày 15-09-2025.', 'ph-muted'), true) : null, /* v353 (QLD4-W02: chỉ đơn tái thẩm */
        FCard('Nội dung đề nghị xem xét theo thủ tục ' + ten, P('Tôi đề nghị xem xét lại Bản án số 18/2026/DS-PT vì Tòa án đã áp dụng sai Điều…', 'ph-muted'), true),
        FCard('Biên nhận tiếp nhận điện tử', DtDocs([['Biên nhận tiếp nhận đơn đề nghị giám đốc thẩm, tái thẩm điện tử', 'Biên nhận điện tử TN-20261029-0020']], { the: true }), true), /* v353 (QLD4-W03 */
        FCard('Tài liệu đính kèm', h(F, null, h('p', { className: 'dt-grp-t' }, 'Bản án, quyết định điện tử'), DtDocs([['Bản án số 18/2026/DS-PT', 'ban-an-18-2026.pdf']], DOC_THE), h('p', { className: 'dt-grp-t' }, 'Tài liệu, chứng cứ'), DtDocs([['Chứng cứ mới', 'chung-cu-moi.pdf']], DOC_THE)), true));
      if (t === 'van-ban') return gdtVanBan();
      if (t === 'phat-sinh') return gdtPhatSinh(ten);
      return dkLichSu([{ title: 'Đã gửi đơn', date: '29-10-2026', state: 'current' }]);
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
    info: [['Vụ án', h('span', { className: 'tp-num' }, c.va)], ['Số thụ lý vụ án', h('span', { className: 'tp-num' }, c.tl)], ['Tòa án', COURT1], ['Tư cách', c.tc], ['Ngày gửi đơn', st === 'ky' ? 'Chưa gửi' : '28-10-2026 09:15'], ['Mã tiếp nhận', h('span', { className: 'tp-num' }, st === 'ky' ? '—' : c.ma)]],
    acts: h(CaseProgress3, { cur: /tra/.test(st) ? 3 : st === 'ky' ? 0 : 1 }),
    viec: ptViec(st, c),
    render: function (t) {
      if (t === 'noi-dung') return FCard('Nội dung yêu cầu', RvKV([['Yêu cầu', c.yc], ['Giá trị yêu cầu', c.gt], ['Bên bị yêu cầu', c.bb]]), true); /* M02: bỏ dòng "Nội dung yêu cầu" thứ tư */
      if (t === 'tai-lieu') return FCard('Tài liệu đính kèm', DtDocs([['Đơn ' + c.ten, 'don-' + (o.loai === 'YC' ? 'yeu-cau-doc-lap' : 'phan-to') + '.pdf · Đã ký số'], ['Biên nhận đặt cọc', 'bien-nhan-dat-coc.pdf']], DOC_THE), true);
      if (t === 'van-ban') return dkVanBan([['Thông báo thụ lý yêu cầu ' + c.ten, 'Số [Số thông báo] · Tống đạt 30-10-2026']]);
      if (t === 'phat-sinh') return ptPhatSinh(c);
      return dkLichSu([{ title: /tra/.test(st) ? 'Kết quả · Trả lại đơn' : 'Xem xét đơn', date: /tra/.test(st) ? '31-10-2026' : '29-10-2026', state: 'current' }, { title: 'Gửi đơn', date: '28-10-2026', state: 'done' }]);
    } }), o.dlg ? h(DlgOver, o.dlg) : null, o.snack ? h(AutoSnack, { m: o.snack }) : null);
}
/* tiến trình 3 bước của đơn phản tố/YCĐL: Gửi đơn → Xem xét đơn → Kết quả */
function CaseProgress3(p) { return h(T.CaseProgress, { label: 'Tiến trình', steps: ['Gửi đơn', 'Xem xét đơn', 'Kết quả'], current: Math.min(p.cur, 2) }); }

/* =====================================================================
   03/11/2026 (v149): Vụ án của tôi – vẽ lại theo web /vu-an (index.tsx, chi-tiet.tsx, sao-chup/*, moi-sao-chup).
   ===================================================================== */
var VA = [
  { ma: 'DS-2026-0012', lv: 'DS', loai: 'Dân sự', tt: ['Đang giải quyết', 'info'], t: 'Tranh chấp hợp đồng vay tài sản', vt: 'Nguyên đơn', cap: [['Sơ thẩm', 'cur']], toa: COURT1, thuLy: '15-10-2026', phien: ['Phiên tòa · 14:00, 05-11-2026', 'sap'], ghim: 1, go: 'caseDetail' },
  { ma: 'HN-2026-0007', lv: 'HN', loai: 'Hôn nhân và gia đình', tt: ['Tạm đình chỉ', 'warning'], t: 'Ly hôn, tranh chấp nuôi con', vt: 'Bị đơn', cap: [['Sơ thẩm', 'cur']], toa: 'Tòa án nhân dân khu vực 2 - Hà Nội', thuLy: '02-09-2026', go: 'caseDetailPaused' },
  { ma: 'DS-2025-0098', lv: 'DS', loai: 'Dân sự', tt: ['Đã giải quyết', 'success'], t: 'Tranh chấp quyền sử dụng đất', vt: 'Nguyên đơn', cap: [['Sơ thẩm', 'done'], ['Phúc thẩm', 'cur']], toa: 'Tòa án nhân dân thành phố Hà Nội', thuLy: '10-03-2025', han: 'Hạn kháng cáo: 12-11-2026', go: 'caseDetailReview' }];
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
  { ma: 'PS-2026-0001', lv: 'PS', loai: 'Phá sản', tt: ['Đang giải quyết', 'info'], tinh: ['Đã mở thủ tục phá sản', 'info'], t: 'Yêu cầu mở thủ tục phá sản Công ty TNHH Thương mại Minh Phát', vt: 'Chủ nợ', cap: [['Sơ thẩm', 'cur']], toa: COURT1, thuLy: '15-10-2026', hd: ['LICH'], go: 'proceedingDetail' },
  { ma: 'PS-2026-0002', lv: 'PS', loai: 'Phục hồi', tt: ['Đang giải quyết', 'info'], tinh: ['Đang thực hiện phương án phục hồi', 'info'], t: 'Yêu cầu áp dụng thủ tục phục hồi Công ty Cổ phần Xây dựng Hòa Bình An', vt: 'Chủ nợ', cap: [['Sơ thẩm', 'cur']], toa: COURT1, thuLy: '02-10-2026', go: 'proceedingDetail' },
  { ma: 'PS-2026-0003', lv: 'PS', loai: 'Phá sản', tt: ['Đang giải quyết', 'info'], tinh: ['Yêu cầu bổ sung tài liệu, chứng cứ', 'warning'], t: 'Yêu cầu mở thủ tục phá sản Hợp tác xã Nông nghiệp Đông Anh', vt: 'Người yêu cầu', cap: [['Sơ thẩm', 'cur']], toa: COURT1, thuLy: '24-09-2026', hd: ['A025'], go: 'proceedingDetail' },
  { ma: 'PS-2026-0004', lv: 'PS', loai: 'Phá sản', tt: ['Đang xử lý đơn', 'info'], tinh: ['Tòa án đã nhận đơn', 'info'], t: 'Yêu cầu mở thủ tục phá sản Công ty TNHH Vận tải Sao Mai', vt: 'Người lao động', cap: [['Sơ thẩm', 'cur']], toa: COURT1, thuLy: '18-09-2026', go: 'proceedingDetail' },
  { ma: 'PS-2026-0005', lv: 'PS', loai: 'Phá sản', tt: ['Đã giải quyết', 'success'], tinh: ['Đã tuyên bố phá sản', 'neutral'], t: 'Yêu cầu mở thủ tục phá sản Công ty TNHH Dệt may Phú Hưng', vt: 'Chủ nợ', cap: [['Sơ thẩm', 'done']], toa: COURT1, thuLy: '12-05-2026', go: 'proceedingDetail' }];
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
/* đối chiếu 4B.1–4B.4 (21/11/2026): thẻ vụ án theo web VuAnCard – ô viết tắt loại án, mã + sao chép · loại án, 1 nhãn trạng thái + sao;
   "Vai trò: …" · chuỗi cấp · Tòa án; chân "Thụ lý: {ngày}" + nhãn phiên + hạn kháng cáo + "Xem chi tiết ›"; thanh tiến trình tố tụng; bỏ khối Việc cần làm */
function VaCard(p) {
  var v = p.v, gd = vaGd(v);
  return h('li', { className: 'va4-c', 'data-ma': v.ma },
    h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem chi tiết vụ án ' + v.ma, 'data-pt-go': v.go, onClickCapture: function () { window.__vaSel = { ma: v.ma, ten: v.t }; } }),
    h(VaO, { v: v }),
    h('div', { className: 'va4-c-b' },
      h('div', { className: 'va4-r1' }, h('span', { className: 'va4-ma tp-num' }, v.ma), /* v583 (1.9): bỏ nút sao chép mã */ v.loai ? h('span', { className: 'va4-loai' }, v.loai) : null,
        h('span', { className: 'va4-sp' }), h(T.StatusBadge, { tone: v.tt[1], icon: false }, v.tt[0]),
        h('button', { type: 'button', className: 'ph-mail2-btn qd-star va4-star' + (v.ghim ? ' ph-mail2-on' : ''), 'aria-pressed': !!v.ghim, 'aria-label': v.ghim ? 'Bỏ đánh dấu' : 'Đánh dấu theo dõi', onClick: function () { v.ghim = !v.ghim; p.onDoi(); } }, h(T.Icon, { name: 'star' }))),
      h('b', { className: 'va4-t' }, v.t),
      h('div', { className: 'va4-r2' }, h('span', { className: 'va4-vt' }, 'Tư cách: ' + v.vt), h('span', { className: 'va4-vach', 'aria-hidden': 'true' }), h(VaChuoi, { cap: v.cap }), h('span', { className: 'va4-toa' }, '· ' + v.toa)),
      h('div', { className: 'va4-f' }, h('span', { className: 'va4-thuly' }, 'Thụ lý: ', h('b', { className: 'tp-num' }, v.thuLy)), v.ph ? VaPhien(v.ph) : null,
        v.han ? h('span', { className: 'va4-hkc' }, h(T.Icon, { name: 'scale' }), v.han) : null, h('span', { className: 'va4-xem' }, 'Xem chi tiết', h(T.Icon, { name: 'chevronRight' }))),
      gd ? h('div', { className: 'va4-c-gd' }, h(VaGdStep, gd)) : null));
}
/* đối chiếu 4A.1–4A.4 (21/11/2026): nhận trạng thái lọc sẵn (từ thẻ Trang chủ, window.__vaTt / p.tt0; giá trị lạ → Tất cả trạng thái);
   banner phiên gần nhất theo dữ liệu, "Xem vụ án" mở tab Lịch phiên tòa, đóng thì không hiện lại cho tới phiên khác (window.__vaBanDong);
   lọc Cấp xét xử theo cấp hiện tại; bỏ nút sắp xếp (đã đánh dấu lên đầu, rồi ngày thụ lý mới nhất);
   cuộn tới cuối tải thêm 10 vụ; đang tải, lỗi (Mã lỗi, Thử lại), rỗng theo câu web (không dùng khối trống chung v518), "Xóa bộ lọc" */
function VaList(p) {
  var L = p.vv ? VV_LOC : VA_LOC;
  var lc = React.useState(function () {
    var t0 = p.tt0 !== undefined ? p.tt0 : window.__vaTt; window.__vaTt = undefined;
    var i = typeof t0 === 'number' ? t0 : L[2][2].indexOf(t0); if (!(i > 0 && i < L[2][2].length)) i = 0;
    return Object.assign({}, VA_LOC0, p.loc0 || {}, i ? { tt: i } : {});
  });
  var q = React.useState(p.q0 || ''), sh = React.useState(p.ttMo ? 'tt' : null), rr = React.useState(0), so = React.useState(p.n0 || 10), anchor = React.useRef(null), host = useHost(anchor);
  if (p.banDong && window.__vaBanDong == null) window.__vaBanDong = VA_PGN.id;
  var tk = khongDau(q[0].trim()), v = lc[0], soLoc = ['loai', 'cap', 'tt', 'vt'].filter(function (k) { return v[k]; }).length;
  var ds = (p.rong ? [] : p.vv ? VV : VA).filter(function (x) { return (!tk || khongDau([x.ma, vaMaDd(x), x.t].join(' ')).indexOf(tk) >= 0) && (!v.tt || x.tt[0] === L[2][2][v.tt]) && (!v.loai || x.loai === L[0][2][v.loai]) && (!v.vt || x.vt === L[3][2][v.vt]) && (!v.cap || vaCapCur(x) === L[1][2][v.cap]); });
  ds = ds.slice().sort(function (a, b) { return (b.ghim ? 1 : 0) - (a.ghim ? 1 : 0) || vaNgay(b.thuLy) - vaNgay(a.thuLy); });
  var coLoc = !!tk || soLoc, pg = p.phienGN || VA_PGN, hienBan = !p.rong && !p.vv && !p.tai && window.__vaBanDong !== pg.id;
  var xoaLoc = function () { q[1](''); lc[1](VA_LOC0); so[1](10); };
  var hien = ds.slice(0, so[0]);
  return Sub(p.vv ? 'Vụ việc phục hồi phá sản' : 'Vụ án, vụ việc của tôi', h(F, null, h('span', { ref: anchor, hidden: true }),
    h('div', { className: 'nv-stick qd-stick' },
      h('div', { className: 'ph-ibar tl-ibar' }, h('div', { className: 'fx-search' }, Tf(p.vv ? 'Tìm vụ việc' : 'Tìm vụ án', { icon: 'search', placeholder: p.vv ? 'Tìm theo mã vụ việc, tên vụ việc…' : 'Tìm theo mã vụ án, tên vụ án, mã đơn…', value: q[0], onChange: function (e) { q[1](e.target.value); so[1](10); }, onClear: function () { q[1](''); so[1](10); } })),
      /* người dùng 22/11 (4A.2): ô tìm và Bộ lọc cùng 1 hàng (như quy tắc 1A.2) */
        /* v583 (1.1 – PA C kiểu Hộp thư): hàng 1 ô tìm + nút vuông Trạng thái vụ án (biểu đồ tròn); hàng 2 số vụ án trái, Bộ lọc phải */
        /* v591: bỏ nút Trạng thái vụ án; Bộ lọc lên cùng hàng ô tìm (ô tìm bo tròn theo quy tắc chung) */
        h('button', { type: 'button', className: 'sf-pill' + (soLoc ? ' sf-on' : ''), 'aria-label': soLoc ? 'Bộ lọc, đang lọc ' + soLoc + ' điều kiện' : 'Bộ lọc', onClick: function () { sh[1]('loc'); } }, h(T.Icon, { name: 'filter' }), 'Bộ lọc', soLoc ? h('span', { className: 'sf-badge tp-num', 'aria-hidden': 'true' }, soLoc) : null)) /* v592: bỏ dòng số vụ án */),
    /* v588: dải nhắc phiên tòa theo kiểu dải nhắc Danh sách đơn (QdBand) – chép style, giữ nội dung phiên */
    hienBan ? h('section', { className: 'ckb qbx-b va5-ban', role: 'status' }, h('span', { className: 'qbx-ic', 'aria-hidden': 'true' }, h(T.Illustration, { name: 'nhacViec' })),
      h('div', { className: 'ckb-tx' }, h('p', { className: 'qbx-p' }, h('b', null, pg.tieuDe), ' — ' + pg.moTa.replace(pg.ma, vaMaDd(vaTim(pg.ma) || { ma: pg.ma })) + '. ' /* v590 */, h('button', { type: 'button', className: 'qd-band-link', 'data-pt-go': 'caseDetailHear', onClickCapture: function () { window.__vaSel = { ma: pg.ma, ten: pg.ten }; } }, 'Xem vụ án →'))),
      h('button', { type: 'button', className: 'ckb-x', 'aria-label': 'Đóng thông báo', onClick: function () { window.__vaBanDong = pg.id; rr[1](rr[0] + 1); } }, h(T.Icon, { name: 'x' }))) : null,
    p.tai === 'loading' ? VaTai('Đang tải danh sách vụ án…') : p.tai === 'err' ? VaLoi('Không tải được danh sách vụ án.')
      : ds.length ? h('ul', { className: 'va4-list' }, hien.map(function (x) { return h(VaCard, { key: x.ma, v: x, cp0: p.cp0, onDoi: function () { rr[1](rr[0] + 1); } }); }),
          ds.length > so[0] ? (p.moreErr ? h('li', { className: 'va4-more-loi', role: 'alert' }, h('span', null, 'Không tải được danh sách vụ án.'), h(T.Button, { size: 'sm', variant: 'secondary', icon: 'swap', className: 'va4-thulai' }, 'Thử lại'))
            : h(VaMore, { tinh: p.tinh, onMore: function () { so[1](so[0] + 10); } })) : null)
      : h(T.EmptyState, { goc: true, variant: 'center', icon: 'folder', title: coLoc ? 'Không có vụ án phù hợp' : 'Bạn chưa có vụ án nào', text: coLoc ? 'Không tìm thấy vụ án nào với bộ lọc hiện tại. Thử đổi bộ lọc hoặc xóa từ khóa tìm kiếm.' : 'Khi đơn khởi kiện của bạn được Tòa án thụ lý, vụ án tương ứng sẽ hiển thị tại đây.', actionLabel: coLoc ? 'Xóa bộ lọc' : undefined, onAction: xoaLoc }),
    sh[0] === 'loc' && host ? h(VaLocSheet, { host: host, L: L, loc: v, onClose: function () { sh[1](null); }, onApply: function (x) { lc[1](x); sh[1](null); so[1](10); } }) : null,
    sh[0] === 'tt' && host ? h(VaTtSheet, { host: host, L: L, ds: p.rong ? [] : p.vv ? VV : VA, cur: v.tt, onClose: function () { sh[1](null); }, onApply: function (i) { lc[1](Object.assign({}, v, { tt: i })); sh[1](null); so[1](10); } }) : null));
}
function Cases() { return h(VaList); }
function CasesEmpty() { return h(VaList, { rong: true }); }
/* chi tiết vụ án – tình huống tạm đình chỉ / xem xét lại GĐT, TT */
/* v583 (1.22): câu web + nút đỏ cỡ nhỏ Đề nghị tiếp tục giải quyết vụ án */
function CaseDetailPaused() { return h(VuAnChiTiet, { top: h('div', { className: 'nv-call nv-call-warning va5-tdc' }, h(T.Icon, { name: 'alert' }), h('div', null, h('p', null, h('b', null, 'Vụ án đang tạm đình chỉ giải quyết (Điều 214, 215 BLTTDS) '), 'Thời hạn tố tụng tạm dừng tính. Đương sự có quyền yêu cầu Tòa án tiếp tục giải quyết vụ án khi lý do tạm đình chỉ không còn.'),
  Btn('Đề nghị tiếp tục giải quyết vụ án', 'primary', { size: 'sm', icon: 'pen', 'data-pt-go': 'dyc1' }))) }); }
/* v583 (1.23): câu web */
function CaseDetailReview() { return h(VuAnChiTiet, { top: h(NvCall, { tone: 'info', title: 'Vụ án đang được xem xét lại theo thủ tục Giám đốc thẩm / Tái thẩm' }, 'Bản án/quyết định đang được Tòa án cấp có thẩm quyền xem xét lại theo quyết định kháng nghị. Việc thi hành án có thể bị tạm đình chỉ theo quyết định của người có thẩm quyền kháng nghị.') }); }
/* tạo đơn liên quan – giai đoạn sau thụ lý (TaoDonLienQuan của chi tiết vụ án) */
var VA_TAO = [
  ['Đơn liên quan đến vụ án', 'Rút đơn khởi kiện, sửa đổi, bổ sung và thay đổi, rút yêu cầu khởi kiện', [['Yêu cầu rút đơn khởi kiện', 'Đề nghị Tòa án cho rút toàn bộ đơn khởi kiện trong quá trình giải quyết vụ án', 'rd1'], ['Thay đổi, rút một phần yêu cầu khởi kiện', 'Sửa đổi nội dung yêu cầu, bổ sung yêu cầu mới, hoặc bỏ bớt yêu cầu', 'tr1']]],
  ['Đơn liên quan biện pháp khẩn cấp tạm thời', 'Áp dụng, thay đổi hoặc hủy bỏ biện pháp khẩn cấp tạm thời', [['Yêu cầu áp dụng biện pháp khẩn cấp tạm thời', 'Bảo vệ tài sản, chứng cứ hoặc giữ nguyên tình trạng hiện có', 'bp1'], ['Đề nghị thay đổi biện pháp đang áp dụng', 'Đổi sang biện pháp khác, thu hẹp hoặc mở rộng phạm vi áp dụng', 'bpt1'], ['Đề nghị hủy bỏ biện pháp đang áp dụng', 'Chấm dứt hoàn toàn biện pháp vì lý do áp dụng không còn', 'bph1']]],
  ['Đơn liên quan án phí, lệ phí, chi phí tố tụng', 'Miễn, giảm tạm ứng và các đề nghị về chi phí trong quá trình giải quyết', [['Đề nghị về chi phí tố tụng', 'Chi phí giám định, định giá, người làm chứng, người phiên dịch', 'dyc1_gd']]],
  ['Đơn yêu cầu khác', 'Yêu cầu, đề nghị phát sinh trong tố tụng và các thủ tục riêng', [['Đơn yêu cầu, đề nghị khác trong tố tụng', 'Hoãn phiên tòa · chứng cứ · người làm chứng · giám định, định giá · tạm đình chỉ', 'dyc1']]],
  ['Giao nộp và sao gửi tài liệu, chứng cứ', 'Nộp bổ sung tài liệu, chứng cứ cho vụ án và thực hiện nghĩa vụ sao gửi cho đương sự khác', [['Giao nộp tài liệu, chứng cứ cho vụ án', 'Nộp bổ sung tài liệu, chứng cứ cho hồ sơ vụ án đang giải quyết (Điều 96 BLTTDS)', 'evidence2'], ['Sao gửi tài liệu, chứng cứ cho đương sự khác', 'Tự sao gửi hoặc đề nghị Tòa án hỗ trợ khi không tự thực hiện được (Khoản 5 Điều 96, Khoản 9 Điều 70)', 'sg1']]]];
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
/* đối chiếu 1B.3, 1H.1–1H.4 (21/11/2026): tiêu đề theo nguồn, Căn cứ pháp lý; đương sự không chọn sẵn + câu danh mục + hàng tổng + trạng thái tải; gợi ý nhanh trên ô lý do;
   hình thức nhận "Hình thức nhận bản sao chụp" ô trống, 6 lỗi; xem trước đơn trước khi ký (Tải về, Chỉnh sửa, nhắc cập nhật khi sửa); tổ chức 2 ô ký; cam đoan; chân 3 nút; nạp bản nháp */
function CaseCopy(p) {
  p = p || {};
  var nguon = p.nguon || 'duong_su', ds0 = nguon === 'toa_an';
  var ld = React.useState(p.nhap ? 'Nghiên cứu hồ sơ chuẩn bị phiên tòa' : p.ld0 || ''), ht = React.useState(p.nhap || p.bc ? 'bc' : 'toa'), ds = React.useState(p.nhap ? [0] : p.ds0 || []);
  var dc = React.useState(Object.assign({}, p.nhap ? TL_DC_MAU : TL_DC0)), cdan = React.useState(!!p.cd0), kt = React.useState(!!p.kt), nhac = React.useState(p.nhac || '');
  var xem = React.useState(p.xem || null), ky = React.useState(!!p.ky0), sh = React.useState(false), gui = React.useState(false), gg = React.useState({ so: '', ngay: '' }), anchor = React.useRef(null), host = useHost(anchor);
  var tc = !!p.tc || laTC(), ktGui = React.useState(!!p.kt); /* lỗi cam đoan chỉ khi bấm Gửi */
  var tieuDe = ds0 ? 'Yêu cầu sao chụp tài liệu, chứng cứ do Tòa án thu thập' : 'Yêu cầu sao chụp tài liệu, chứng cứ do đương sự khác xuất trình';
  if (p.nhapTai) return SubS(tieuDe, h(TlTrang, { spin: true, text: 'Đang tải bản nháp…' }));
  if (p.nhapLoi) return SubS(tieuDe, h(TlTrang, { loi: 1, title: 'Không tải được bản nháp.', btns: TlThuLai() }));
  var ben = [['Trần Văn Bình', 'Bị đơn'], ['Lê Thị Hoa', 'Người có quyền lợi, nghĩa vụ liên quan']];
  var eDs = !ds0 && !ds[0].length ? 'Vui lòng chọn ít nhất 1 đương sự cần sao chụp.' : '', eLd = !ld[0].trim() ? 'Vui lòng nhập lý do cần sao chụp.' : '';
  var eDc = ht[0] === 'bc' ? tlLoiDc(dc[0]) : {}, eGg = tc ? tlLoiGgt(gg[0], false) : {};
  var formOk = !eDs && !eLd && !tlCoLoi(eDc) && !tlCoLoi(eGg);
  function suaForm(f) { return function (x) { f(x); if (xem[0] === 'xem') { xem[1]('doi'); ky[1](false); } nhac[1](''); }; }
  /* 1H.3 (người dùng 21/11: theo form chung khối Ký số): bấm Ký số → kiểm form → tạo đơn → mở bảng ký */
  function kySo() { kt[1](true); nhac[1](''); if (!formOk) { nhac[1]('Vui lòng điền đủ thông tin phía trên trước khi ký số.'); return; }
    if (xem[0] === 'xem') { sh[1](true); return; }
    xem[1]('tao'); setTimeout(function () { xem[1](p.loiXem ? 'loi' : 'xem'); if (!p.loiXem) sh[1](true); }, 800); }
  function guiYc() {
    kt[1](true); ktGui[1](true);
    var nh = formOk ? (!ky[0] ? 'Vui lòng ký số trước khi gửi yêu cầu.' : '') : '';
    nhac[1](nh); if (!formOk || nh || !cdan[0]) return;
    gui[1](true); setTimeout(function () { window.__ptGo('replace:caseCopyOk'); }, 900);
  }
  var khoiXem = xem[0] === 'tao' ? TlDang('Đang tạo đơn để ký số…')
    : xem[0] === 'loi' ? h('div', { className: 'tl-loitao' }, TlLoi('Không tạo được đơn để ký số.'), h(T.Button, { variant: 'secondary', size: 'sm', icon: 'swap', className: 'pt-chk', onClick: kySo }, 'Thử lại'))
    : h('ul', { className: 'ph-ky' }, h('li', null, h('div', null, h('b', null, 'Đơn yêu cầu sao chụp tài liệu, chứng cứ')), IcoBtn('eye', 'Xem don-yeu-cau-sao-chup.pdf')),
      tc ? h(KyTcRows, { tep: ['Đơn yêu cầu sao chụp tài liệu, chứng cứ'], onXong: function () { ky[1](true); nhac[1](''); } })
        : h('li', null, h('span', { className: 'ph-ky-no' }, '1'), h('div', null, h('b', null, 'Hoàng Dương'), h('small', null, 'Người yêu cầu'), ky[0] ? h('small', { className: 'ph-ky-da' }, KY_LUC) : null),
          ky[0] ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn', onClick: kySo }, 'Ký số')));
  var doiNote = xem[0] === 'doi' ? h('p', { className: 'q3-note' }, 'Nội dung đã thay đổi — vui lòng ký số lại.') : null;
  var tatCa = ds[0].length === ben.length;
  var dsKhoi = p.dsTai ? TlDang('Đang tải danh mục đương sự…') : p.dsLoi ? TlLoi('Không tải được danh mục đương sự.') : p.dsRong ? P('Chưa có đương sự khác trong vụ án này. Vui lòng liên hệ Thư ký Tòa án.', 'ph-muted') : h(F, null,
    /* 1H (người dùng 21/11 chọn PA-B): bỏ link đỏ "Chọn tất cả đương sự" – nút viền nhỏ Chọn tất cả / Bỏ chọn ở dòng "Đã chọn n/N" */
    h('div', { className: 'tr-yc' }, ben.map(function (b, i) { return h(T.Checkbox, { key: b[0], checked: ds[0].indexOf(i) >= 0, onChange: function (e) { suaForm(ds[1])(e.target.checked ? ds[0].concat([i]) : ds[0].filter(function (x) { return x !== i; })); }, label: h('span', { className: 'sg-ng' }, h('b', null, b[0]), h('small', null, b[1])) }); })),
    kt[0] ? TlLoi(eDs) : null,
    h('div', { className: 'sc-tong-b' }, h('p', { className: 'tl-sc-tong' }, h('b', null, 'Đã chọn ' + ds[0].length + '/' + ben.length + ' đương sự'), h('span', null, 'Tòa án xem xét, chốt phạm vi tài liệu sao chụp khi duyệt yêu cầu')),
      h(T.Button, { variant: 'secondary', size: 'sm', onClick: function () { suaForm(ds[1])(tatCa ? [] : [0, 1]); } }, tatCa ? 'Bỏ chọn' : 'Chọn tất cả')));
  var nutGui = gui[0] ? h(T.Button, { loading: true, disabled: true }, 'Đang gửi yêu cầu…') : h(T.Button, { className: 'pt-chk', onClick: guiYc }, 'Gửi yêu cầu');
  return SubSNhap(tieuDe, gui[0], h(F, null, h('span', { ref: anchor, hidden: true }),
    FCard('Vụ án', RvKV([['Mã vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Tên vụ án', 'Tranh chấp hợp đồng vay tài sản'], ['Nguồn tài liệu', ds0 ? 'Do Tòa án thu thập' : 'Do đương sự khác xuất trình'],
      ['Căn cứ pháp lý', ds0 ? 'Điều 70.8, Điều 97 và Điều 109.2 Bộ luật Tố tụng dân sự 2015' : 'Điều 70.8 và Điều 109.2 Bộ luật Tố tụng dân sự 2015']]), true),
    ds0 ? null : FCard('Chọn đương sự cần sao chụp', dsKhoi, true),
    FCard('Lý do và hình thức nhận', h(F, null, /* 1H (người dùng 21/11): bỏ câu dẫn và Gợi ý nhanh */
      Tf('Lý do cần sao chụp', { required: true, multiline: true, value: ld[0], onChange: function (e) { suaForm(ld[1])(e.target.value); }, error: kt[0] && eLd ? eLd : undefined, placeholder: 'Nhập lý do cần sao chụp' }),
      Lbl('Hình thức nhận bản sao chụp', 1),
      h(ChonThe, { label: 'Hình thức nhận bản sao chụp', v: ht[0], onPick: suaForm(ht[1]), items: [{ id: 'toa', t: 'Nhận bản giấy tại Tòa án', d: 'Mang giấy tờ tùy thân đến bộ phận hành chính tư pháp để nhận.' }, { id: 'bc', t: 'Nhận bản giấy qua bưu chính', d: 'Gửi tới địa chỉ bạn nhập bên dưới, cước do người yêu cầu trả.' }] }),
      ht[0] === 'bc' ? h(TlDiaChi, { v: dc[0], set: suaForm(dc[1]), kt: kt[0] }) : null), true),
    tc ? h(TlGiayGT, { v: gg[0], set: suaForm(gg[1]), kt: kt[0], bb: false }) : null,
    FCard('Ký số', h(F, null, khoiXem, doiNote, TlLoi(nhac[0])), true),
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { checked: cdan[0], onChange: function (e) { cdan[1](e.target.checked); }, label: 'Tôi cam đoan chỉ sử dụng tài liệu sao chụp cho việc thực hiện quyền và nghĩa vụ tố tụng trong vụ án này, không cung cấp cho người không có quyền và không sử dụng vào mục đích khác.' }),
      ktGui[0] && !cdan[0] ? TlLoi('Vui lòng tích cam đoan trước khi gửi') : null),
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: ['Đơn yêu cầu sao chụp tài liệu, chứng cứ'], onClose: function () { sh[1](false); }, onKy: function () { sh[1](false); ky[1](true); nhac[1](''); } }), host) : null),
    Bar(Btn('Hủy', 'secondary', { 'data-pt-go': 'backTo:caseDetail', disabled: gui[0] }), nutGui)); /* 1B.3 (người dùng 21/11, LOGIC CHUNG): "Lưu nháp" luôn ở thanh đầu màn bên phải; chân màn 2 nút */
}
/* đối chiếu 1H.4 (21/11/2026): câu chữ màn đã gửi theo web; bỏ nút "Theo dõi yêu cầu" (web chỉ có "Về hồ sơ vụ án") */
function CaseCopyOk() {
  return h(OkScr, { title: 'Đã gửi yêu cầu sao chụp', text: 'Yêu cầu sao chụp đã được ghi nhận. Tòa án xem xét và thông báo chi phí sao chụp, thời điểm nhận tài liệu qua Hộp thư tống đạt điện tử.',
    info: [['Mã yêu cầu', '[Mã yêu cầu]', 1], ['Khối lượng dự kiến', '[Số trang dự kiến] trang'], ['Trạng thái', 'Chờ Tòa án xem xét']],
    btns: Btn('Về hồ sơ vụ án', 'primary', { 'data-pt-go': 'backTo:caseDetail' }) });
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
  var cfH = React.useState(false); /* v534: hỏi xác nhận trước khi hủy yêu cầu */
  var x = p.x, l = PT_LOAI[x.pv], t = PT_TT[x.tt];
  var rows = [[l[0], h('span', { className: 'tp-num' }, x.ma)], ['Tòa án', COURT1], ['Tư cách', x.vt.join(', ')]].concat(x.alt && x.tt !== 'PT-01' ? [['Tống đạt qua', x.alt]] : []);
  var act = x.tt === 'PT-01' ? h('div', { className: 'pt-btns' }, Btn('Tạm chuyển sang giấy', 'secondary', { size: 'sm', onClick: ptWzMoi, 'data-pt-go': 'ptSus1' }), Btn('Chuyển giấy đến khi kết thúc', 'secondary', { size: 'sm', onClick: ptWzMoi, 'data-pt-go': 'ptCan1' }))
    : x.tt === 'PT-02' ? (x.huy ? h('div', { className: 'pt-btns' }, Btn('Hủy yêu cầu', 'secondary', { size: 'sm', className: 'xn-l', onClick: function () { cfH[1](true); } }), cfH[0] ? h(XnDlg, { title: 'Hủy yêu cầu chuyển phương thức?', text: 'Yêu cầu của hồ sơ ' + x.ma + ' đang chờ Tòa án xét duyệt sẽ bị hủy và không khôi phục được. Hồ sơ tiếp tục giao dịch điện tử.', cancel: 'Không', ok: 'Hủy yêu cầu', go: 'snack:Đã hủy yêu cầu.', onKhong: function () { cfH[1](false); }, onOk: function () { cfH[1](false); p.onDoi(x, 'PT-01'); } }) : null) : h('p', { className: 'pt-c-note' }, 'Đang chờ Tòa án xét duyệt'))
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
    { id: 1, q: 'Thay đổi thông tin liên hệ ở đâu?', a: 'Mở Thông tin tài khoản và chọn Chỉnh sửa tại Thông tin liên hệ. Thông tin định danh là thông tin chỉ đọc.', d: '20-10-2026' },
    { id: 2, q: 'Đổi mật khẩu đăng nhập như thế nào?', a: 'Mở Cá nhân và chọn Đổi mật khẩu.', d: '20-10-2026' }] },
  { id: 'td', ten: 'Tống đạt văn bản', ds: [{ id: 3, q: 'Xem văn bản Tòa án gửi ở đâu?', a: 'Mở Hộp thư để xem văn bản Tòa án đã tống đạt cho bạn.', d: '18-10-2026' }] },
  { id: 'ks', ten: 'Ký số', ds: [{ id: 4, q: 'Khai báo phương thức ký số ở đâu?', a: 'Mở Cá nhân, chọn Quản lý chữ ký số, sau đó chọn Khai báo chứng thư số.', d: '15-10-2026' }] },
  { id: 'gd', ten: 'Giao dịch điện tử', ds: [{ id: 5, q: 'Đổi phương thức giao dịch điện tử của một hồ sơ như thế nào?', a: PT_SUB + ' Mở Cá nhân, chọn Phương thức giao dịch điện tử.', d: '12-10-2026' }] }];
var FAQ_GOPY = [
  { ma: '[Mã góp ý 1]', q: 'Xem văn bản Tòa án gửi ở đâu?', nd: 'Câu trả lời nên nói rõ cách xem văn bản đã lưu trữ.', d: '01-11-2026' },
  { ma: '[Mã góp ý 2]', q: null, nd: 'Cần thêm hướng dẫn khi quên mật khẩu.', d: '25-10-2026' }];
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
  { nhom: 'VU_AN', loai: 'Vụ án · Sơ thẩm', t: 'Tranh chấp hợp đồng vay tài sản', ma: 'DS-2026-0012', kq: '22-10-2026', han: '21-11-2026' },
  { nhom: 'VU_AN', loai: 'Vụ án · Phúc thẩm', t: 'Tranh chấp hợp đồng mua bán tài sản', ma: 'DS-2026-0018', kq: '15-10-2026', han: '14-11-2026' },
  { nhom: 'DON', loai: 'Đơn khởi kiện', t: 'Tranh chấp hợp đồng vay tài sản', ma: 'TN-20261020-0012', kq: '20-10-2026', han: '19-11-2026' }];
var DG_GUI = [
  { nhom: 'VU_AN', loai: 'Vụ án · Sơ thẩm', t: 'Ly hôn, tranh chấp nuôi con', ma: 'HN-2026-0007', sao: 5, d: '02-10-2026', an: true, gy: 'Cán bộ hướng dẫn rõ ràng, lịch phiên tòa được thông báo sớm.', tc: [5, 5, 4, 5] },
  { nhom: 'DON', loai: 'Đơn yêu cầu', t: 'Yêu cầu công nhận thỏa thuận dân sự', ma: 'VDS-2026-0003', sao: 4, d: '28-09-2026', tc: [4, 4, 4, 3] }];
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
  return h('section', { className: 'dg-phieu' }, h('div', { className: 'dg-phieu-h' }, h(T.Icon, { name: 'checkCircle' }), h('div', null, h('h2', null, 'Đã đánh giá ' + DG_KY), h('p', null, 'Gửi ngày 01-11-2026' + (p.sua ? ' · Sửa ngày 03-11-2026' : '')))),
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
  return h(F, null, h('div', { className: 'dg-ck-h' }, h('h2', null, 'Kết quả đánh giá của người dân, doanh nghiệp'), h('p', null, 'Quý III/2026 (01-07-2026 – 30-09-2026) · Cập nhật 05-10-2026')),
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
  ['Thông báo về việc lựa chọn hòa giải viên', 'Số [Số thông báo] · ' + COURT1 + ' · Tống đạt 30-10-2026', 'tra-loi'],
  ['Thông báo nhận đơn khởi kiện và quyền lựa chọn hòa giải, đối thoại', 'Số [Số thông báo] · ' + COURT1 + ' · Tống đạt 20-10-2026']];
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
  var moc = p.ttRong ? [] : xong ? [['Quyết định công nhận kết quả hòa giải thành', '25-10-2026', '[Số quyết định] · ' + COURT1 + ' · Tống đạt 25-10-2026', null, null, 'mediationDoc'], ['Biên bản hòa giải thành', '20-10-2026', COURT1 + ' · Tống đạt 20-10-2026', null, null, 'mediationDoc'], ['Đã trả lời — Đồng ý hòa giải', '12-10-2026', 'Người khởi kiện: Hoàng Dương - 12-10-2026', null, null, 'hgReplyView']]
    : phien ? [['Đề nghị hoãn phiên ' + hg.ten, '01-11-2026', 'Người khởi kiện: Hoàng Dương - 01-11-2026', null, null, 'hgDelayView'], ['Giấy triệu tập tham gia phiên ' + hg.ten, '28-10-2026', '[Số giấy triệu tập] · ' + COURT1 + ' · Tống đạt 28-10-2026', null, null, 'mediationDoc'], ['Đã trả lời — Đồng ý ' + hg.ten, '22-10-2026', 'Người khởi kiện: Hoàng Dương - 22-10-2026', null, null, 'hgReplyView']]
    : [['Thông báo về việc lựa chọn ' + hg.tv, '30-10-2026', '[Số thông báo] · ' + COURT1 + ' · Tống đạt 30-10-2026', p.het ? null : 'Đang chờ bạn trả lời', 'cam', 'mediationDoc'], ['Thông báo nhận đơn khởi kiện và quyền lựa chọn hòa giải, đối thoại', '20-10-2026', '[Số thông báo] · ' + COURT1 + ' · Tống đạt 20-10-2026', null, null, 'mediationDoc']];
  var lk = xong ? [['calendar', 'Xem lịch của bạn', 'calPersonal'], ['download', 'Xem / tải biên bản hòa giải', 'snack:Đang tải biên bản hòa giải'], ['scale', 'Xem vụ án liên quan (DS-2026-0031)', 'caseDetail']] : [['calendar', 'Xem lịch của bạn', 'calPersonal']];
  /* việc cần làm: khối gọn như Chi tiết đơn – tên việc, hạn, nút chính; nút mũi tên mở các hành động khác */
  var viec = xong ? { t: 'Đề nghị xem xét lại quyết định công nhận', han: 'Hạn 06-11-2026', con: 'còn 12 ngày', btn: { l: 'Đề nghị xem xét lại', go: 'hgReview' }, sub: 'Theo văn bản: Quyết định công nhận kết quả hòa giải thành · số [Số quyết định] · 25-10-2026' }
    : phien ? { t: 'Đề nghị hoãn phiên ' + hg.ten, han: 'Hạn 05-11-2026', con: 'còn 2 ngày', btn: { l: 'Đề nghị hoãn phiên', go: 'hgDelay' + S }, more: [{ l: 'Đề nghị thay đổi ' + hg.tv, go: 'hgChange' + S }, { l: 'Vào phòng họp trực tuyến', go: p.khongLink ? 'snack:Lịch phiên chưa có đường dẫn phòng họp trực tuyến.' : 'snack:Đang mở phòng họp trực tuyến' }, { l: 'Rút đơn khởi kiện', go: 'rd1' }], sub: 'Theo văn bản: Giấy triệu tập tham gia phiên ' + hg.ten + ' · số [Số giấy triệu tập] · 28-10-2026' }
    : { t: 'Trả lời lựa chọn ' + hg.ten, han: p.het ? 'Hạn 30-10-2026' : 'Hạn 06-11-2026', con: p.het ? 'đã quá hạn 4 ngày' : 'còn 3 ngày', tone: p.het ? 'danger' : 'warning', btn: { l: 'Trả lời', go: 'hgReply' + S, dis: !!p.het }, more: [{ l: 'Rút đơn khởi kiện', go: 'rd1' }],
        sub: (p.het ? 'Đã hết thời hạn thực hiện (hạn 30-10-2026). ' : '') + 'Đối tượng xử lý: Hoàng Dương (Người khởi kiện) · Theo văn bản: Thông báo về việc lựa chọn ' + hg.tv + ' · số [Số thông báo] · 30-10-2026' };
  var vb = p.tbRong || p.tbLoi ? [] : xong ? [{ t: 'Quyết định công nhận kết quả hòa giải thành', so: '[Số quyết định]', tg: '25-10-2026' }]
    : [{ t: 'Thông báo về việc lựa chọn ' + hg.tv, so: '[Số thông báo]', tg: '30-10-2026', moi: true }, { t: 'Thông báo nhận đơn khởi kiện và quyền lựa chọn hòa giải, đối thoại', so: '[Số thông báo]', tg: '20-10-2026', soHoa: 'chua' }];
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
    FCard('1. Thông tin tống đạt tư pháp', RvKV([['Số hiệu văn bản', '[Số thông báo]'], ['Mã biểu mẫu', 'Mẫu [mã biểu mẫu]'], ['Cơ quan ban hành', COURT1], ['Người ký và chức danh', '[Họ tên] – Thẩm phán'], ['Ngày ban hành', '30-10-2026'], ['Ngày tống đạt chính thức', '30-10-2026']]), true),
    FCard('2. Tệp văn bản tống đạt chính thức', p.noFile ? P('Văn bản tống đạt — chưa có bản số hóa của văn bản trên hệ thống.', 'ph-muted') /* v348 (HG-W08) */ : DtDocs([['Văn bản tống đạt.pdf', 'PDF']], DOC_THE), true),
    FCard('3. Dữ liệu nghiệp vụ', RvKV([['Thời hạn xử lý', '06-11-2026']]), true),
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
    FCard('Lựa chọn ' + hg.ten, h(F, null, h('p', { className: 'nv-sub' }, 'Phiếu ý kiến — văn bản điện tử của Cổng' + (ro ? '' : ', ký số trước khi gửi')), h(ChonThe, { label: 'Lựa chọn ' + hg.ten + '', v: loai[0], onPick: function (x) { if (!ro && !ky[0]) loai[1](x); }, items: [{ id: 'co', t: 'Đồng ý tham gia ' + hg.ten + '', d: 'Lựa chọn giải quyết tranh chấp qua ' + hg.ten + ' tiền tố tụng tại Tòa án và chọn ' + hg.Tv + '.' }, { id: 'khong', t: 'Không đồng ý ' + hg.ten + '', d: 'Chấm dứt ' + hg.ten + ' để Tòa án chuyển hồ sơ sang thụ lý vụ án theo quy định của pháp luật tố tụng (Điều 16.4.b).' }] })), true) /* v387: gom vào khối trắng, không để trên nền */,
    FCard('Ý kiến của các đồng nguyên đơn', h(F, null, Lead('Vụ việc có 1 đồng nguyên đơn cùng đứng đơn. Nếu tất cả người khởi kiện và các đồng nguyên đơn thống nhất cùng chọn 01 ' + hg.Tv + ', Tòa án sẽ chỉ định theo lựa chọn đó. Nếu không thống nhất được, bạn có thể chọn phương án "Thẩm phán chỉ định" để gửi hồ sơ sang Tòa án giải quyết ngay mà không bị gián đoạn.'),
      h('ul', { className: 'hg-yk' }, h('li', null, h('div', null, h('b', null, 'Hoàng Dương'), h('small', null, 'Người khởi kiện (Bạn)')), h('span', null, khong ? 'Không đồng ý ' + hg.ten : hgv[0] === 'tp' ? 'Thẩm phán chỉ định' : hgv[0] ? (HG_HGV.filter(function (x) { return x.id === hgv[0]; })[0] || {}).name : '— Chưa chọn ' + hg.Tv + ' —'), ro ? h(T.StatusBadge, { tone: 'success', icon: false }, 'Đã gửi Tòa án (12-10-2026)') : h(T.StatusBadge, { tone: 'neutral', icon: false }, 'Đang thao tác')),
        h('li', null, h('div', null, h('b', null, 'Nguyễn Thị Lan'), h('small', null, 'Đồng nguyên đơn')), h('span', null, 'Nguyễn Văn An'), ro ? h(T.StatusBadge, { tone: 'success', icon: false }, 'Đã gửi Tòa án (13-10-2026)') : h(T.StatusBadge, { tone: 'warning', icon: false }, 'Đã lưu lựa chọn (01-11-2026)'))),
      co && !ro ? (!hgv[0] ? NvCallS('info', 'Vui lòng chọn ' + hg.Tv + ' ở danh mục bên dưới để kiểm tra tính thống nhất với các đồng nguyên đơn.')
        : thongNhat ? NvCallS('success', hgv[0] === 'tp' ? 'Bạn chọn "Không lựa chọn — Thẩm phán chỉ định": có thể ký số và gửi Tòa án ngay.' : 'Lựa chọn của bạn đã thống nhất với tất cả các đồng nguyên đơn — có thể ký số và gửi Tòa án.')
          : NvCallS('warning', 'Chưa thống nhất ' + hg.Tv + ' với các đồng nguyên đơn. Hãy lưu lựa chọn và chờ thống nhất, hoặc chọn "Không lựa chọn — Thẩm phán chỉ định" để gửi ngay.')) : null), true),
    co ? FCard('' + hg.Tv + '', h(F, null,
      h(SelSheet, { label: 'Phạm vi lựa chọn ' + hg.Tv + '', req: true, v: pv[0], ph: '— Chọn phạm vi —', opts: [{ id: 'cung', name: 'Thuộc Tòa án đang giải quyết' }, { id: 'khac', name: 'Thuộc Tòa án khác' }], onChange: pv[1] }),
      pv[0] === 'khac' ? h(SelSheet, { label: 'Tòa án nơi ' + hg.Tv + ' công tác', req: true, ph: '— Chọn Tòa án cùng khu vực —', opts: ['Tòa án nhân dân khu vực 2 - Hà Nội', 'Tòa án nhân dân khu vực 3 - Hà Nội'] }) : pv[0] ? Tf('Tòa án nơi ' + hg.Tv + ' công tác', { required: true, value: COURT1, readOnly: true }) : null,
      h(SelSheet, { label: 'Chọn ' + hg.Tv + '', req: true, v: hgv[0], ph: pv[0] ? '— Chọn ' + hg.Tv + ' —' : '— Chọn phạm vi ở trên, hoặc "Thẩm phán chỉ định" —', opts: (pv[0] === 'khac' ? HG_HGV.slice(0, 2) : HG_HGV).map(function (x) { return x.desc ? Object.assign({}, x, { desc: hg.Tv }) : x; }), onChange: hgv[1] })), true) : null,
    loai[0] ? FCard(khong ? 'Lý do và ghi chú' : 'Ghi chú', h(F, null, khong ? Tf('Lý do không đồng ý', { multiline: true, maxLength: 500, value: ly[0], onChange: function (e) { ly[1](e.target.value); }, placeholder: 'Nhập lý do từ chối', help: ly[0].length + '/500' }) : null, Tf('Ghi chú (nếu có)', { multiline: true, maxLength: 500, value: gc[0], onChange: function (e) { gc[1](e.target.value); }, placeholder: 'Ý kiến/ghi chú bổ sung (không bắt buộc)' })), true) : null, /* v387: gom vào khối trắng */
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
  var ro = !!p.view, ph = React.useState('p1'), ld = React.useState(ro ? HG_LD_HOAN[3] : ''), gt = React.useState(ro ? 'Tôi đi công tác theo quyết định của cơ quan từ 05/11 đến 10-11-2026.' : ''), dx = React.useState(''), ky = React.useState(false), du = ld[0] && gt[0].trim();
  return SubS(ro ? 'Chi tiết đề nghị hoãn phiên ' + hg.ten + '' : 'Đề nghị hoãn phiên ' + hg.ten + '', h(F, null, NvCallS('info', h(F, null, 'Đề nghị hoãn phiên ' + hg.ten + ' gắn liền với mã tiếp nhận đơn: ', h('b', { className: 'tp-num' }, 'HG-2026-0018'), '.')),
    p.khongPhien ? Sf('Phiên ' + hg.ten + ' đề nghị hoãn', { required: true, disabled: true, placeholder: 'Chưa có phiên ' + hg.ten + ' được xếp lịch' }) /* v348 (HG-W13) */
      : h(SelSheet, { label: 'Phiên ' + hg.ten + ' đề nghị hoãn', req: !ro, v: ph[0], opts: [{ id: 'p1', name: 'Phiên ' + hg.ten + ' 08:30, 06-11-2026', desc: COURT1 }], onChange: ph[1] }),
    h(SelSheet, { label: 'Lý do xin hoãn phiên ' + hg.ten + '', req: !ro, v: ld[0], ph: '— Chọn lý do chính đáng theo luật định —', opts: HG_LD_HOAN, onChange: ld[1] }),
    Tf('Trình bày chi tiết lý do', { required: !ro, multiline: true, value: gt[0], readOnly: ro, onChange: function (e) { gt[1](e.target.value); }, placeholder: 'Nêu rõ hoàn cảnh, lý do không thể tham gia phiên ' + hg.ten + ' đúng thời gian đã định...', help: ro ? undefined : gt[0].length + '/1000' }),
    Tf('Thời gian đề xuất mở lại phiên (trong thời hạn ' + hg.ten + ')', { value: dx[0], readOnly: ro, onChange: function (e) { dx[1](e.target.value); }, placeholder: 'Ví dụ: Ngày 15-09-2026 lúc 09:00 hoặc tuần tiếp theo...' }),
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
    FCard('Thông tin đề nghị', RvKV([['Tòa án nhận đơn', 'Tòa án nhân dân Thành phố Hà Nội'], ['Người đề nghị', 'Hoàng Dương — Sinh năm [năm sinh]'], ['Quyết định công nhận bị đề nghị xem xét lại', qd ? 'Quyết định công nhận kết quả hòa giải thành - 25-10-2026 - ' + COURT1 : 'Chưa có quyết định công nhận trên tiến trình'], ['Ngày nhận được/biết được quyết định', qd ? '25-10-2026' : 'Chưa xác định được ngày tống đạt quyết định công nhận']]), true),
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
  { ma: 'TL-2026-0031', loai: 'TL', vb: 'Quyết định', so: '[Số quyết định]', va: 'Tranh chấp hợp đồng vay tài sản', tt: 'ST-03', nhan: ['Yêu cầu bổ sung', 'warning'], gui: '28-10-2026', du: 'Cập nhật sau khi bổ sung', bs: '06-11-2026', go: 'copyDetailSupp' },
  { ma: 'TL-2026-0027', loai: 'BS', giay: 1, vb: 'Bản án', so: '45/2026/DS-ST', va: 'Tranh chấp hợp đồng vay tài sản', tt: 'ST-03', nhan: ['Yêu cầu nộp lệ phí', 'warning'], gui: '25-10-2026', du: '08-11-2026', nv: '07-11-2026', go: 'copyDetailFee' },
  { ma: 'TL-2026-0024', loai: 'TL', vb: 'Bản án', so: '45/2026/DS-ST', va: 'Tranh chấp hợp đồng vay tài sản', tt: 'ST-03', nhan: ['Đang giải quyết', 'warning'], gui: '20-10-2026', du: '08-11-2026', go: 'copyDetail' },
  { ma: 'TL-2026-0035', loai: 'BS', vb: 'Quyết định', so: '[Số quyết định]', va: 'Tranh chấp hợp đồng mua bán tài sản', tt: 'ST-01', nhan: ['Chưa gửi (nháp)', 'neutral'], du: 'Chưa gửi', nhap: true, go: 'copyDetailDraft' },
  { ma: 'TL-2026-0019', loai: 'BS', vb: 'Bản án', so: '[Số bản án]', va: 'Ly hôn, tranh chấp nuôi con', tt: 'ST-04', nhan: ['Đã cấp', 'success'], gui: '10-10-2026', du: '15-10-2026', go: 'copyDetailDone' },
  { ma: 'TL-2026-0011', loai: 'TL', vb: 'Bản án', so: '18/2026/DS-ST', va: 'Yêu cầu độc lập', tt: 'ST-04', nhan: ['Từ chối cấp', 'danger'], gui: '02-10-2026', du: '06-10-2026', go: 'copyDetailRejected' }];
/* chi tiết yêu cầu: dang (đang giải quyết) · bs (bổ sung) · nv (nghĩa vụ TC) · cap (đã cấp) · tc (từ chối) · nhap */
var TLY_DB = {
  dang: [['Nộp hồ sơ', 'Hệ thống đã ghi nhận và tự động xác nhận gửi yêu cầu thành công.', '20-10-2026 09:12', 'done'], ['Tiếp nhận hồ sơ', 'Tòa án đã tiếp nhận hồ sơ.', '20-10-2026 14:30', 'done'], ['Thẩm định hồ sơ', 'Đang chờ Thư ký/Thẩm phán thẩm định hồ sơ.', '', 'current'], ['Trả kết quả', 'Chờ Tòa án ban hành kết quả.', '', 'todo']],
  cap: [['Nộp hồ sơ', 'Hệ thống đã ghi nhận và tự động xác nhận gửi yêu cầu thành công.', '10-10-2026 08:40', 'done'], ['Tiếp nhận hồ sơ', 'Tòa án đã tiếp nhận hồ sơ.', '10-10-2026 10:05', 'done'], ['Thẩm định hồ sơ', 'Thư ký/Thẩm phán đã thẩm định hồ sơ.', '12-10-2026 15:20', 'done'], ['Trả kết quả', 'Kết quả điện tử đã được ký số và tự động lưu vào Kho dữ liệu M03.', '15-10-2026 09:00', 'done']],
  tc: [['Nộp hồ sơ', 'Hệ thống đã ghi nhận và tự động xác nhận gửi yêu cầu thành công.', '02-10-2026 10:00', 'done'], ['Tiếp nhận hồ sơ', 'Tòa án đã tiếp nhận hồ sơ.', '02-10-2026 15:10', 'done'], ['Trả kết quả', 'Yêu cầu đã bị từ chối cấp — xem lý do ở khối phía trên.', '06-10-2026 16:45', 'done']] };
var TLY_BUOC = { dang: 'DVCQG: 2 · Tiếp nhận hồ sơ', bs: 'DVCQG: 3 · Bổ sung hồ sơ', nv: 'DVCQG: 6 · Thực hiện nghĩa vụ tài chính', cap: 'DVCQG: 5 · Trả kết quả', tc: 'DVCQG: 7 · Dừng xử lý', nhap: null };
/* đối chiếu 1C.4 (21/11/2026): diễn biến dạng sự kiện như web – tiêu đề, thời điểm, nội dung, hạn, "{đơn vị xử lý} · {Tòa án}"; mục cuối "Bước tiếp theo" (không có khi đã kết thúc) */
function TlyDB(k) {
  var s = TLY_SK[k] || TLY_SK.dang, tiep = TLY_TIEP[k];
  return FCard('Diễn biến xử lý', h('ol', { className: 'tl-sk' }, s.map(function (e, i) {
    return h('li', { key: i }, h('span', { className: 'tl-sk-dot', 'aria-hidden': 'true' }), h('div', { className: 'tl-sk-c' }, h('b', null, e.t), h('time', { className: 'tp-num' }, e.tg),
      e.nd ? h('p', null, e.nd) : null, e.han ? h('p', { className: 'tl-sk-han' }, e.han) : null, e.dv ? h('small', null, e.dv) : null));
  }), tiep ? h('li', { className: 'tl-sk-next' }, h('span', { className: 'tl-sk-dot', 'aria-hidden': 'true' }), h('div', { className: 'tl-sk-c' }, h('b', null, 'Bước tiếp theo'), h('p', null, tiep))) : null), true);
}
/* đối chiếu 1A.4, 1B.1, 1B.3, 1C.1–1C.4 (21/11/2026): đang tải / lỗi / không xác định; thêm trạng thái rut, gq, cho, sc; nháp có "DVCQG: 1 · Nộp hồ sơ" và chân 3 nút;
   "Xem vụ án" mở đúng vụ án; dải bổ sung có hạn kèm giờ, quá hạn, đã gửi; QR; Thông tin yêu cầu 9 dòng; p.bao – dải xanh sau thao tác thành công */
function TlyDetail(p) {
  var k = p.k || 'dang', nhap = k === 'nhap', sc = k === 'sc' || (nhap && p.sc);
  if (p.tai) return SubS('Chi tiết yêu cầu', h(TlTrang, { spin: true, text: 'Đang tải chi tiết yêu cầu…' }));
  if (p.loi) return SubS('Chi tiết yêu cầu', p.loi === 'ko' ? h(TlTrang, { icon: 'info', text: 'Không xác định được yêu cầu cần xem.' }) /* LOGIC CHUNG (người dùng 21/11): màn chi tiết không có nút về danh sách – dùng nút quay lại đầu trang */
    : h(TlTrang, { loi: 1, title: 'Không tải được chi tiết yêu cầu.', text: 'Mã lỗi: [mã lỗi]', btns: TlThuLai() }));
  var nhan = { dang: ['Đang giải quyết', 'warning'], bs: ['Yêu cầu bổ sung', 'warning'], nv: ['Yêu cầu nộp lệ phí', 'warning'], cap: ['Đã cấp', 'success'], tc: ['Từ chối cấp', 'danger'], nhap: ['Chưa gửi (nháp)', 'neutral'],
    rut: ['Đã rút yêu cầu', 'danger'], gq: ['Đã giải quyết', 'success'], cho: ['Chờ tiếp nhận', 'info'], sc: ['Chờ tiếp nhận', 'info'] }[k];
  var du = { dang: '08-11-2026 17:00', bs: 'Cập nhật sau khi bổ sung', nv: '08-11-2026 17:00', cap: 'Đã cấp', tc: 'Từ chối cấp', nhap: 'Chưa gửi', rut: 'Đã rút yêu cầu', gq: 'Đã giải quyết', cho: 'Chờ tòa án tiếp nhận', sc: 'Chờ tòa án tiếp nhận' }[k];
  var ma = { dang: 'TL-2026-0024', bs: 'TL-2026-0031', nv: 'TL-2026-0027', cap: 'TL-2026-0019', tc: 'TL-2026-0011', nhap: sc ? '[Mã yêu cầu]' : 'TL-2026-0035' }[k] || '[Mã yêu cầu]';
  var loai = sc ? 'Sao chụp tài liệu, chứng cứ' : k === 'bs' || k === 'dang' || k === 'tc' || k === 'cho' || k === 'gq' ? 'Trích lục bản án/quyết định' : 'Bản sao bản án/quyết định';
  var coRut = k === 'dang' || k === 'bs' || k === 'nv' || k === 'cho' || k === 'sc';
  var vaCap = k === 'cap', tenVa = k === 'tc' ? 'Yêu cầu độc lập' : vaCap ? 'Ly hôn, tranh chấp nuôi con' : nhap && !sc ? 'Tranh chấp hợp đồng mua bán tài sản' : 'Tranh chấp hợp đồng vay tài sản';
  var maVa = vaCap ? 'HN-2026-0007' : nhap && !sc ? 'DS-2026-0018' : 'DS-2026-0012', goVa = vaCap ? 'caseDetailPaused' : 'caseDetail';
  var vb = k === 'bs' || (nhap && !sc) ? ['Quyết định', '[Số quyết định]', nhap ? 'Quyết định tạm đình chỉ giải quyết vụ án' : 'Quyết định công nhận sự thỏa thuận', nhap ? '12-10-2026' : '15-10-2026']
    : vaCap ? ['Bản án', '[Số bản án]', 'Bản án hôn nhân và gia đình sơ thẩm', '05-08-2026'] : k === 'tc' ? ['Bản án', '18/2026/DS-ST', '', '02-09-2026'] : ['Bản án', '45/2026/DS-ST', 'Bản án dân sự sơ thẩm', '20-10-2026'];
  var hanBs = '06-11-2026 17:00';
  var tt = sc ? [['Bản án / quyết định', '—'], ['Tòa án giải quyết', COURT1], ['Loại yêu cầu', loai], ['Tư cách người yêu cầu', 'Đương sự — Nguyên đơn'], ['Mục đích sử dụng', 'Nghiên cứu hồ sơ chuẩn bị phiên tòa'], ['Hình thức nhận', '[Hình thức nhận]']]
    : [[vb[0], h('span', { className: 'tl-vbso' }, h('span', { className: 'tl-so' }, vb[1]), vb[2] ? h('small', null, vb[2]) : null)], ['Ngày ban hành', vb[3]], ['Tòa án ra bản án', COURT1]]
      .concat(k === 'tc' ? [] : [['Tòa án giải quyết', p.chuyenToa ? 'Tòa án nhân dân khu vực 2 - Hà Nội (chuyển tòa ngày 25-10-2026: [Lý do chuyển tòa])' : COURT1]],
        k === 'bs' ? [['Nội dung yêu cầu bổ sung', 'Văn bản ủy quyền đính kèm thiếu chứng thực chữ ký. Vui lòng bổ sung bản có chứng thực chữ ký theo quy định.'], ['Lần yêu cầu bổ sung', '1/2 – Tòa án còn có thể yêu cầu thêm 1 lần']] : [],
        [['Loại văn bản', vaCap ? 'Hôn nhân và gia đình' : 'Dân sự'], ['Loại yêu cầu', loai], ['Tư cách người yêu cầu', k === 'tc' ? 'Công dân quan tâm / Nghiên cứu học tập' : 'Đương sự — Nguyên đơn'], ['Mục đích sử dụng', 'Thi hành án'],
          ['Hình thức nhận', k === 'cap' || k === 'tc' ? 'Bản điện tử' : nhap ? '2 bản giấy (Gửi bưu chính)' : '1 bản giấy (Gửi bưu chính)']]);
  var tiepSoan = sc ? 'caseCopyNhap' : 'tl2Nhap';
  return SubS('Chi tiết yêu cầu', h(F, null,
    p.bao ? NvCallS('success', p.bao) : null,
    h('section', { className: 'tly-head' }, h('div', { className: 'dg-tags' }, h('b', { className: 'tp-num' }, ma), h(T.StatusBadge, { tone: nhan[1] }, nhan[0]), TLY_BUOC[sc && !nhap ? 'sc' : k] ? h('span', { className: 'dg-an' }, TLY_BUOC[sc && !nhap ? 'sc' : k]) : null),
      h('h1', null, tenVa),
      k === 'tc' ? null : h('button', { type: 'button', className: 'vk-link tly-va', 'data-pt-go': goVa, onClickCapture: function () { window.__vaSel = { ma: maVa, ten: tenVa }; } }, h('span', { className: 'tp-num' }, maVa), ' · Xem vụ án', h(T.Icon, { name: 'arrowRight' })),
      h('p', { className: 'tly-du' }, h('small', null, 'Dự kiến trả kết quả'), h('b', null, du))),
    k === 'bs' ? h('section', { className: 'dt-pre' }, TlBsKhoi({ qua: p.qua, daGui: p.daGui, han: hanBs })) : null, /* 1C.2 (người dùng 21/11: rối mắt → đề xuất lại): xem TlBsKhoi */
    k === 'nv' ? h('div', { className: 'tly-band tly-band-l' }, h('p', null, h(T.Icon, { name: 'alert' }), h('span', null, h('b', null, 'Thực hiện nghĩa vụ tài chính (lệ phí, án phí).'), ' Hạn thanh toán đến 07-11-2026.')), Btn('Thanh toán', 'primary', { size: 'sm', 'data-pt-go': 'snack:Mở Cổng Dịch vụ công quốc gia để thanh toán' })) : null,
    k === 'tc' ? NvCallS('danger', h(F, null, h('b', null, 'Từ chối cấp. '), 'Tài liệu yêu cầu thuộc diện không được cung cấp bản sao theo quy định.')) : null,
    k === 'cap' ? TlKqKhoi() : null, /* 1C.3 (người dùng 21/11: khối kết quả lộn xộn → đề xuất lại): xem TlKqKhoi */
    FCard('Hồ sơ bạn đã gửi', DtDocs(nhap ? [['Đơn yêu cầu', 'Chưa ký số']] : [['Đơn yêu cầu đã ký số', (ma.charAt(0) === '[' ? 'don-yeu-cau' : ma + '-don') + '-da-ky.pdf'], ['Tài liệu đính kèm', 'giay-uy-quyen.pdf']]), true),
    FCard('Thông tin yêu cầu', RvKV(tt), true),
    nhap ? null : TlyDB(k),
    p.xoa ? h(QdConfirm, { title: 'Xóa bản nháp', text: 'Bạn có chắc chắn muốn xóa bản nháp yêu cầu ' + ma + ' này không? Dữ liệu bản nháp sẽ không thể khôi phục sau khi xóa.', ok: 'Xóa bản nháp', danger: true, go: 'backTo:copyList', snack: 'Đã xóa bản nháp thành công.' }) : null),
    /* LOGIC CHUNG (người dùng 21/11): bỏ nút "Về danh sách" ở màn chi tiết (đầu trang đã có nút quay lại); bản nháp không có màn chi tiết (1B.1) */
    nhap ? Bar(Btn('Xóa nháp', 'secondary', { 'data-pt-go': 'copyDraftDelete' }), Btn('Tiếp tục soạn', 'primary', { 'data-pt-go': tiepSoan }))
      : coRut ? Bar(Btn('Rút yêu cầu', 'secondary', { 'data-pt-go': 'copyWithdraw' })) : null);
}
/* nộp tài liệu bổ sung (ModalBoSungHoSo) */
/* đối chiếu 1D.2 (21/11/2026): khối tệp đầy đủ (tên, loại, Xem, sửa/Thay/xóa, kho chọn nhiều, "Đã đính kèm: n/10 tệp"), giải trình n/2000, lỗi chỉ sau khi bấm;
   nút trái "Đóng"; gửi xong về chi tiết có dòng "Bạn đã gửi bổ sung lúc …" (không thanh thông báo đáy); giữ bước ký số (Mobile: gửi bắt buộc ký số) */
function TlySupp(p) {
  p = p || {};
  var gt = React.useState(p.gt0 || ''), sdt = React.useState(''), em = React.useState(''), tep = React.useState(p.tep0 || []), kt = React.useState(!!p.kt), sh = React.useState(false), gui = React.useState(false), anchor = React.useRef(null), host = useHost(anchor);
  var g = gt[0], n = g.trim().length;
  var loiGt = g && !g.trim() ? 'Nội dung giải trình không được chỉ chứa khoảng trắng.' : g && n < 30 ? 'Nội dung giải trình tối thiểu 30 ký tự (hiện có ' + n + ' ký tự).' : '';
  var loiSdt = sdt[0].trim() && !/^\+?\d{8,14}$/.test(sdt[0].trim()) ? 'Chỉ gồm chữ số (8–14), có thể bắt đầu bằng +.' : undefined;
  var loiEm = em[0].trim() && !/^\S+@\S+\.\S+$/.test(em[0].trim()) ? 'Email không hợp lệ.' : undefined;
  var coGi = !!g.trim() || tep[0].length, mo = coGi && !loiSdt && !loiEm;
  function bam() { kt[1](true); if (loiGt || tep[0].some(function (f) { return tlLoiTep(f).length; })) return; sh[1](true); }
  function kyXong() { sh[1](false); gui[1](true); setTimeout(function () { window.__ptGo('back'); window.__ptGo('replace:copyDetailSuppSent'); }, 900); }
  return SubS('Nộp tài liệu bổ sung', h(F, null, h('span', { ref: anchor, hidden: true }),
    p.qua ? NvCallS('danger', 'Đã quá thời hạn bổ sung. Bạn vẫn có thể gửi, Tòa án sẽ ghi nhận là nộp quá hạn.') : null,
    h(TlTep, { title: 'Tài liệu bạn muốn nộp thêm', toiDa: 10, kt: kt[0], ds0: tep[0], onDoi: tep[1], khoMo: p.kho, sua0: p.sua0,
      desc: 'Tệp không bắt buộc nếu bạn đã nhập nội dung giải trình. Chấp nhận PDF, JPG, PNG, DOCX — tối đa 10 MB mỗi tệp, tối đa 10 tệp; ảnh và Word được tự động chuyển sang PDF. Mỗi tài liệu bắt buộc có tên và loại tài liệu.' }),
    FCard('Nội dung giải trình', h('div', { className: 'tl-giaitrinh' }, Tf('Nội dung giải trình', { multiline: true, maxLength: 2000, value: g, onChange: function (e) { gt[1](e.target.value); }, placeholder: 'Nội dung giải trình bổ sung… (bắt buộc nếu không chọn tệp)', error: kt[0] && loiGt ? loiGt : undefined, help: kt[0] && loiGt ? undefined : g.length + '/2000' })), true),
    FCard('Thông tin liên hệ mới (không bắt buộc)', h(F, null, Lead('Chỉ gửi cho Tòa án để liên hệ về yêu cầu này, không thay đổi thông tin tài khoản của bạn.'),
      Tf('Số điện thoại mới', { type: 'tel', maxLength: 15, placeholder: 'VD: 0912345678', value: sdt[0], onChange: function (e) { sdt[1](e.target.value); }, error: loiSdt }), Tf('Email mới', { type: 'email', maxLength: 100, placeholder: 'VD: ten@example.com', value: em[0], onChange: function (e) { em[1](e.target.value); }, error: loiEm })), true),
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: ['Tài liệu bổ sung'], onClose: function () { sh[1](false); }, onKy: kyXong }), host) : null),
    Bar(Btn('Đóng', 'secondary', { 'data-pt-go': 'back', disabled: gui[0] }), gui[0] || p.gui ? h(T.Button, { loading: true, disabled: true }, 'Đang gửi bổ sung…')
      : h(T.Button, { className: 'pt-chk', disabled: !mo, onClick: bam }, 'Ký số và gửi bổ sung')));
}
/* rút yêu cầu (ModalRutYeuCau) – lý do lấy từ danh mục, dưới đây là mẫu */
var TLY_LD_RUT = ['Không còn nhu cầu sử dụng', 'Đã có văn bản từ nguồn khác', 'Nộp nhầm yêu cầu', 'Lý do khác'];
/* đối chiếu 1D.1 (21/11/2026): lý do theo danh mục TRICHLUC_LYDORUT; lỗi chỉ hiện sau khi bấm xác nhận (khoảng trắng → dưới 30); nút xác nhận chỉ khóa khi chưa đánh dấu;
   bỏ bộ đếm n/500 (web không có); nút trái "Hủy"; rút xong ở lại chi tiết (trạng thái Đã rút yêu cầu) + dải xanh, không thanh thông báo đáy */
function TlyWithdraw(p) {
  p = p || {};
  var ld = React.useState(p.khac ? 'Khác' : TLY_LD_RUT2[0]), ct = React.useState(p.ct0 || ''), xn = React.useState(!!p.khac), kt = React.useState(!!p.kt), ban = React.useState(!!p.ban);
  var khac = ld[0] === 'Khác', n = ct[0].trim().length;
  var loi = !khac ? '' : ct[0] && !ct[0].trim() ? 'Lý do rút không được chỉ chứa khoảng trắng.' : n < 30 ? 'Vui lòng nêu rõ lý do rút yêu cầu, tối thiểu 30 ký tự (hiện có ' + n + ' ký tự).' : '';
  function xacNhan() { kt[1](true); if (loi) return; ban[1](true); setTimeout(function () { window.__ptGo('back'); window.__ptGo('replace:copyDetailRutOk'); }, 900); }
  return SubS('Rút yêu cầu', h(F, null,
    h(TlSel, { label: 'Lý do rút yêu cầu', opts: TLY_LD_RUT2, v: ld[0], onChange: ld[1], ph: 'Chọn lý do' }),
    khac ? Tf('Vui lòng nêu rõ lý do rút yêu cầu', { required: true, multiline: true, maxLength: 500, value: ct[0], onChange: function (e) { ct[1](e.target.value); }, placeholder: 'Nhập lý do rút yêu cầu cụ thể (từ 30 đến 500 ký tự)…', error: kt[0] && loi ? loi : undefined }) : null,
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { checked: xn[0], onChange: function (e) { xn[1](e.target.checked); }, label: 'Tôi hiểu rằng sau khi rút, yêu cầu này sẽ bị hủy bỏ vĩnh viễn.' }))),
    Bar(Btn('Hủy', 'secondary', { 'data-pt-go': 'back', disabled: ban[0] }), ban[0] ? h(T.Button, { loading: true, disabled: true }, 'Đang xử lý…') : h(T.Button, { className: 'pt-chk', disabled: !xn[0], onClick: xacNhan }, 'Xác nhận rút yêu cầu')));
}
/* ===== 9. Theo dõi đơn khiếu nại, tố cáo (web /khieu-nai-to-cao: 2 nguồn, chi tiết, rút, lần hai, tố cáo tiếp, ý kiến, khiếu nại trả lại đơn) ===== */
var KN_TT_HS = [
  { ma: 'KNTT-2026-0012', thuTuc: 'KN Quyết định', tom: 'Khiếu nại quyết định tạm đình chỉ giải quyết vụ án', goc: ['Vụ án liên quan', 'DS-2026-0018'], loai: 'Khiếu nại quyết định tố tụng', qla: 'QLA-2026-00081', han: '15 ngày kể từ ngày thụ lý', bar: [6, 15, 'Còn 9 ngày', 'an', '12-11-2026'], tt: ['Đang xử lý đơn', 'info'], tinh: 'Đang xem xét, giải quyết khiếu nại', hd: ['LICH'], tien: 'dang', go: 'complaintTt' },
  { ma: 'KNTT-2026-0009', thuTuc: 'KN Trả lại đơn', tom: 'Khiếu nại việc trả lại đơn khởi kiện', goc: ['Đơn khởi kiện bị trả lại', 'TN-20261012-0007'], loai: 'Khiếu nại việc trả lại đơn', qla: 'QLA-2026-00064', han: '05 ngày làm việc kể từ ngày được phân công', kq: true, tt: ['Đã xử lý đơn', 'success'], tinh: 'Đã giải quyết khiếu nại', lan2: [7, '10-11-2026'], tien: 'kq', go: 'complaintTtDone' },
  { ma: 'KNTT-2026-0005', thuTuc: 'Tố cáo', tom: 'Tố cáo hành vi của Thư ký phiên tòa', goc: ['Vụ án liên quan', 'DS-2026-0012'], loai: 'Tố cáo trong vụ án', qla: 'QLA-2026-00042', han: '30 ngày kể từ ngày thụ lý', bar: [32, 30, 'Quá hạn 2 ngày', 'qua', '01-11-2026'], tt: ['Đã gửi đơn', 'info'], tinh: 'Tòa án đã nhận đơn', tien: 'qua', go: 'complaintTt' },
  { ma: 'Bản nháp', thuTuc: 'KN Hành vi', tom: 'Khiếu nại hành vi của Thẩm phán', goc: ['Vụ án liên quan', 'DS-2026-0012'], loai: 'Khiếu nại hành vi tố tụng', nhap: true, tt: ['Lưu nháp', 'neutral'], tien: 'nhap', go: 'khv1' }];
var KN_HC_HS = [
  { ma: 'KN-2026-0012', loai: 'Khiếu nại', tom: 'Khiếu nại về việc chậm trả kết quả cấp bản sao', chu: 'Hoàng Dương', grp: ['Đang giải quyết', 'warning'], gui: '23-10-2026', ban: 'Hạn giải quyết của Tòa án: 22-11-2026 · Đang chờ Tòa án trả kết quả giải quyết.', go: 'complaintDetail' },
  { ma: 'TC-2026-0004', loai: 'Tố cáo', tom: 'Tố cáo hành vi nhận tiền của cán bộ tiếp công dân', chu: 'Hoàng Dương', grp: ['Đã có kết quả', 'success'], gui: '05-10-2026', go: 'complaintDetailTc' },
  { ma: 'KN-2026-0007', loai: 'Khiếu nại', tom: 'Khiếu nại thái độ tiếp công dân', chu: 'Hoàng Dương', grp: ['Đề nghị rút đơn', 'neutral'], gui: '01-10-2026', ban: 'Bạn đã đề nghị rút đơn — chờ Tòa án xác nhận.', go: 'complaintDetailRut' }];
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
function Complaints() { return h(KnHome, { nhap: 1 }); } /* v574 (phiên fork 23/11, cau-tra-loi-don-chua-luu-kntc-2026-11-23.md): vào chức năng từ menu luôn thấy khối "Đơn chưa lưu" dữ liệu demo – đang khai, bước 2/5 */
/* chi tiết hồ sơ hành chính: k = kn (đang giải quyết) · tc (tố cáo đã có kết quả) · rut (đề nghị rút) */
function KnHcDetail(p) {
  var k = p.k || 'kn', tc = k === 'tc', word = tc ? 'tố cáo' : 'khiếu nại';
  var buoc = k === 'rut' ? [['Đề nghị rút đơn', 'Bạn đã đề nghị rút đơn — chờ Tòa án ra quyết định đình chỉ giải quyết.', '', 'current'], ['Gửi đơn khiếu nại trực tuyến', 'Đơn đã được ký số và ghi nhận trên Cổng dịch vụ tư pháp điện tử.', '01-10-2026', 'done']]
    : tc ? [['Kết luận nội dung tố cáo', 'Kết quả giải quyết đã được ban hành.', '28-10-2026', 'done'], ['Chờ trả kết quả', 'Đang chuẩn bị văn bản trả kết quả cho bạn.', '', 'done'], ['Xác minh nội dung tố cáo', 'Người giải quyết làm việc với các bên, thu thập tài liệu và lập báo cáo xác minh.', '', 'done'], ['Thụ lý tố cáo', 'Đơn đã được phân công cho người có thẩm quyền giải quyết.', '', 'done'], ['Gửi đơn tố cáo trực tuyến', 'Đơn đã được ký số và ghi nhận trên Cổng dịch vụ tư pháp điện tử.', '05-10-2026', 'done']]
      : [['Quyết định giải quyết khiếu nại', 'Chưa ban hành.', '', undefined], ['Chờ trả kết quả', 'Đang chuẩn bị văn bản trả kết quả cho bạn.', '', undefined], ['Xác minh nội dung khiếu nại', 'Người giải quyết làm việc với các bên, thu thập tài liệu và lập báo cáo xác minh.', '', 'current'], ['Thụ lý khiếu nại', 'Đơn đã được phân công cho người có thẩm quyền giải quyết.', '', 'done'], ['Gửi đơn khiếu nại trực tuyến', 'Đơn đã được ký số và ghi nhận trên Cổng dịch vụ tư pháp điện tử.', '23-10-2026', 'done']];
  var hs = tc ? KN_HC_HS[1] : k === 'rut' ? KN_HC_HS[2] : KN_HC_HS[0];
  if (p.grp) hs = Object.assign({}, hs, { grp: p.grp }); if (p.kpa) hs = Object.assign({}, hs, { loai: 'Kiến nghị, phản ánh', ma: 'KP-2026-0003', tom: 'Kiến nghị về việc niêm yết lịch tiếp công dân' }); /* v399: mẫu theo nhóm trạng thái */
  if (p.v2 || KNH_V2) return h(KnHcDetail2, { p: p, k: k, tc: tc, word: word, buoc: buoc, hs: hs }); /* v449 */
  var tab = React.useState(p.tab0 || 'nd'); /* v446 */
  return SubS('Chi tiết hồ sơ', h(F, null,
    true ? h('section', { className: 'dt-head dt-head-don knh-head' }, h('p', { className: 'dt-meta' }, h('span', { className: 'tp-num' }, hs.ma), ' · Ngày gửi ' + hs.gui), h('h1', null, hs.tom), /* v442: đầu màn kiểu Chi tiết đơn */
      h('div', { className: 'dt-badges' }, h(T.StatusBadge, { tone: hs.grp[1], icon: false }, hs.grp[0]), h(T.StatusBadge, { tone: 'neutral', icon: false }, hs.loai)), h('p', { className: 'knh-toa' }, 'Tòa án tiếp nhận: ' + COURT1),
      KNH_ACT(k, tc, p)) :
    h('section', { className: 'tly-head' }, h('div', { className: 'dg-tags' }, h('span', { className: 'tly-loai tly-loai-TL' }, hs.loai), h('b', { className: 'tp-num' }, hs.ma), h(T.StatusBadge, { tone: hs.grp[1] }, hs.grp[0])), h('h1', null, hs.tom), h('p', { className: 'pt-c-m' }, 'Gửi ' + hs.gui + ' · ' + COURT1), k === 'rut' || p.kpa ? null : h('div', { className: 'kn-act kn-head-act' }, tc ? h(F, null, Btn('Cho ý kiến dự thảo kết luận', 'secondary', { icon: 'message', block: true, 'data-pt-go': 'knOpinion' }), Btn('Tố cáo tiếp', 'secondary', { icon: 'send', block: true, 'data-pt-go': 'knNext' }))
      : Btn('Khiếu nại lần hai', 'secondary', { icon: 'arrowRight', block: true, 'data-pt-go': 'knSecond' }), Btn('Rút đơn', 'secondary', { icon: 'logout', block: true, 'data-pt-go': tc ? 'withdrawTc' : 'withdraw' }))), /* v399: nút hành động ở khối đầu, bỏ khối Hành động tiếp theo */
    tc ? h('div', { className: 'kn-bv' }, h(T.Icon, { name: 'lock' }), h('p', null, h('b', null, 'Bảo vệ người tố cáo. '), 'Danh tính của bạn được giữ bí mật với người bị tố cáo. Hồ sơ này chỉ người có thẩm quyền giải quyết được truy cập.')) : null,
    h('div', { className: 'dt-tabs knh-tabs' }, h(T.Tabs, { label: 'Nội dung hồ sơ', value: tab[0], onChange: tab[1], items: [{ key: 'nd', label: 'Nội dung khiếu nại, tố cáo' }, { key: 'tt', label: 'Tiến trình giải quyết' }] })), /* v448: 2 tab */
    tab[0] === 'tt' ? h(F, null, /* v448: tab Tiến trình giải quyết = Văn bản kết quả xử lý, giải quyết + Tiến trình xử lý */
      tc ? FCard('Văn bản kết quả xử lý, giải quyết', DtDocs([['Kết luận nội dung tố cáo', 'Số [Số kết luận] · 28-10-2026']]), true) : null, /* v519: không có văn bản kết quả thì ẩn cả khối */
      FCard('Tiến trình xử lý', G1Std(buoc.map(function (b) { return { t: b[0], d: b[1], ngay: b[2], state: b[3] }; })), true)) : h(F, null,
    FCard('Nội dung đơn' /* v448 */, h(F, null, P(hs.tom + '. ' + (word === 'tố cáo' ? 'Cán bộ tiếp công dân yêu cầu nộp tiền ngoài quy định khi nhận hồ sơ.' : 'Bộ phận tiếp nhận trả kết quả cấp bản sao bản án chậm 15 ngày so với giấy hẹn.')), RvKV([['Yêu cầu giải quyết của người làm đơn', 'Đề nghị xem xét, xử lý trách nhiệm cán bộ liên quan và trả kết quả đúng hạn.']])), true),
    FCard('Tài liệu đã nộp', DtDocs([['Đơn ' + word + ' đã ký số', hs.ma + '.pdf'], ['Tài liệu, chứng cứ', 'tai-lieu-1.pdf']]), true), /* v448 */
    FCard('Người gửi đơn', RvKV([['Họ và tên', 'Hoàng Dương'], ['Số định danh', h('span', { className: 'tp-num' }, '001090012345')], ['Số điện thoại', '0912345678'], ['Địa chỉ', 'Số 8 Phạm Hùng, Phường Từ Liêm, Thành phố Hà Nội']]), true), /* v448 */
    FCard('Người/đơn vị bị khiếu nại, tố cáo', RvKV([['Họ và tên', (word === 'tố cáo' ? 'Phạm Văn Đức' : 'Nguyễn Văn Long')], ['Chức danh', 'Cán bộ bộ phận tiếp nhận hồ sơ'], ['Đơn vị', COURT1]]), true),
    FCard('Thông tin xử lý', RvKV([['Mã hồ sơ', h('span', { className: 'tp-num' }, hs.ma)], ['Ngày gửi', hs.gui], ['Trạng thái Tòa án', hs.grp[0]], ['Cơ quan giải quyết', COURT1], ['Số người đứng đơn', '1'], ['Bộ phận tiếp nhận', '—']]), true),
    FCard('Thủ tục và căn cứ pháp lý', RvKV(tc ? [['Thủ tục áp dụng', 'Tố cáo hành vi vi phạm pháp luật của người tiến hành tố tụng'], ['Căn cứ pháp lý', 'Luật Tố cáo 2018, sửa đổi bổ sung năm 2025 (Luật số 136/2025/QH15)'], ['Thời hạn giải quyết', 'Thụ lý trong 07 ngày làm việc; giải quyết trong 30 ngày kể từ ngày thụ lý']] : [['Thủ tục áp dụng', 'Khiếu nại quyết định, hành vi hành chính của Tòa án'], ['Căn cứ pháp lý', 'Luật Khiếu nại 2011, sửa đổi bổ sung năm 2025 (Luật số 136/2025/QH15)'], ['Thời hạn giải quyết', KN_30]]), true),
    )), null); /* v398: bỏ nút Về danh sách · v399: Rút đơn chuyển lên khối đầu */
}
function ComplaintDetail() { return h(KnHcDetail); }
/* chi tiết hồ sơ tố tụng (QLA): 3 tab */
function KnTtDetail(p) {
  var r = p.kq ? KN_TT_HS[1] : KN_TT_HS[0];
  return h(DtScreen, { title: 'Hồ sơ tố tụng', tabLabel: 'Nội dung hồ sơ tố tụng', tabs: [{ key: 'nd', label: 'Nội dung khiếu nại, tố cáo' }, { key: 'vb', label: 'Văn bản tống đạt', count: p.kq ? 2 : 1 }, { key: 'ls', label: 'Lịch sử tiến trình', count: p.kq ? 3 : 2 }],
    meta: h(F, null, h('span', { className: 'tp-num' }, r.ma), ' · ' + r.thuTuc), name: r.tom,
    badges: h(F, null, h(T.StatusBadge, { tone: r.tt[1] }, r.tt[0]), h('span', { className: 'qd-tinh qd-tinh-' + (p.kq ? 'success' : 'info') }, r.tinh)),
    top: p.kq ? DtTodo({ t: 'Khiếu nại lần hai', d: 'Tòa án đã gửi Quyết định giải quyết khiếu nại · hạn khiếu nại lần hai 10-11-2026.', btns: Btn('Khiếu nại lần hai · còn 7 ngày', 'primary', { size: 'sm', 'data-pt-go': 'kqd1L' }) }) : null /* v426: bỏ thanh thời hạn */,
    render: function (t) {
      if (t === 'vb') return FCard('Văn bản tống đạt', DtDocs(p.kq ? [['Quyết định giải quyết khiếu nại', 'Số 03/2026/QĐ-GQKN · Tống đạt 31-10-2026'], ['Thông báo thụ lý khiếu nại', 'Tống đạt 22-10-2026']] : [['Thông báo thụ lý khiếu nại', 'Tống đạt 30-10-2026']]), true);
      if (t === 'ls') return FCard('Lịch sử tiến trình', h(T.Timeline, { steps: (p.kq ? [{ title: 'Đã giải quyết khiếu nại', date: '31-10-2026', state: 'current' }, { title: 'Tòa án đã nhận đơn', date: '22-10-2026', state: 'done' }, { title: 'Đã gửi', date: '20-10-2026', state: 'done' }] : [{ title: 'Tòa án đã nhận đơn', date: '30-10-2026', state: 'current' }, { title: 'Đã gửi', date: '28-10-2026', state: 'done' }]) }), true);
      return h(F, null,
        FCard('Thông tin hồ sơ', RvKV([['Tòa án tiếp nhận', COURT1], ['Ngày gửi', p.kq ? '20-10-2026' : '28-10-2026'], ['Mã tiếp nhận tại Tòa án', h('span', { className: 'tp-num' }, r.qla)], [r.goc[0], h('span', { className: 'tp-num' }, r.goc[1])], ['Thời hạn giải quyết', r.han], ['Căn cứ pháp lý', p.kq ? 'Điều 194 Bộ luật Tố tụng dân sự 2015' : 'Chương XLI Bộ luật Tố tụng dân sự 2015'], ['Trạng thái tại Tòa án', r.tt[0]], ['Tình trạng', r.tinh], ['Tư cách tố tụng', 'Nguyên đơn']]), true),
        FCard(p.kq ? 'Quyết định, văn bản bị khiếu nại' : 'Quyết định, văn bản bị khiếu nại', P(p.kq ? 'Thông báo trả lại đơn khởi kiện · TN-20261012-0007' : 'Quyết định tạm đình chỉ giải quyết vụ án · Số [Số quyết định]'), true),
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
  var hd = h(T.Stepper, { steps: ['Lý do rút', 'Xác nhận và gửi'], current: b[0] });
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
    p.yKien ? FCard('Văn bản kết quả', DtDocs([['Dự thảo kết luận nội dung tố cáo', 'Kết quả xử lý đã nhận · 28-10-2026']]), true) : null,
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
var KR_STEPS = ['Đối tượng và thời hiệu', 'Nội dung và người khiếu nại', 'Tài liệu, chứng cứ', 'Xem lại và ký số'];
var KR_TITLE = 'Khiếu nại việc trả lại đơn';
function KrThuTuc() {
  return h('section', { className: 'kr-tt' }, h('p', { className: 'kr-tt-h' }, h('span', null, 'Thủ tục bạn đã chọn'), h('span', { className: 'dg-an' }, 'ĐIỀU 194 BLTTDS')),
    h('b', null, 'Khiếu nại việc trả lại đơn khởi kiện'), RvKV([['Gửi tới', 'Chánh án Tòa án đã trả lại đơn khởi kiện'], ['Hạn cuối khiếu nại', '10-11-2026'], ['Thủ tục áp dụng', '10 ngày kể từ ngày nhận được văn bản trả lại đơn khởi kiện (Điều 194.1)']]));
}
function Kr1() {
  return Wz({ title: KR_TITLE, steps: KR_STEPS, n: 1, go: 'kr2', body: h(F, null, KrThuTuc(),
    NvCallS('warning', h(F, null, h('b', null, 'Sắp hết thời hạn khiếu nại — chỉ còn 3 ngày. '), 'Hạn cuối: 10-11-2026. Tính từ ngày nhận thông báo 31-10-2026.')),
    FCard('Vụ việc bị trả lại đơn', RvKV([['Vụ việc', 'Tranh chấp hợp đồng cung ứng dịch vụ · TN-20261012-0007'], ['V/v', 'Khiếu nại việc trả lại đơn khởi kiện'], ['Văn bản trả lại', 'Thông báo trả lại đơn khởi kiện · 31-10-2026'], ['Kính gửi', 'Chánh án Tòa án nhân dân khu vực 1 - Hà Nội']]), true),
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
  return h(KyGuiDon, { title: KR_TITLE, steps: KR_STEPS, kyTitle: 'Xem lại và ký gửi', ok: 'krOk', tep: ['Đơn khiếu nại việc trả lại đơn', 'Tài liệu, chứng cứ'], tepMeta: 'Xem trước đơn', vaiTro: 'Người khiếu nại', sendLabel: 'Ký số và gửi đơn',
    lead: 'Kiểm tra lại toàn bộ thông tin trước khi ký số và gửi đến Tòa án.', camDoan: 'Tôi cam đoan nội dung khiếu nại là đúng sự thật và chịu trách nhiệm trước pháp luật.',
    top: FCard('Thông tin đơn', RvKV([['Vụ việc liên quan', 'Tranh chấp hợp đồng cung ứng dịch vụ · TN-20261012-0007'], ['Tóm tắt', 'Khiếu nại việc Tòa án trả lại đơn khởi kiện khi chưa hết thời hạn sửa đổi, bổ sung.'], ['Yêu cầu giải quyết', 'Đề nghị xem xét, xử lý trách nhiệm cán bộ liên quan và trả kết quả đúng hạn.'], ['Người khiếu nại', 'Hoàng Dương (chính bạn)'], ['Tài liệu kèm theo', '2 tệp']]), true) });
}
function KrOk() {
  return h(OkScr, { title: 'Đã gửi đơn thành công', text: 'Chánh án phân công Thẩm phán mở phiên họp xem xét trong 05 ngày làm việc kể từ ngày được phân công (Điều 194.2).', info: [['Mã tiếp nhận', '[Mã tiếp nhận]'], ['Cơ quan giải quyết', 'Chánh án Tòa án đã trả lại đơn khởi kiện'], ['Trạng thái', 'Chờ tiếp nhận']],
    btns: h(F, null, Btn('Xem tiến trình giải quyết', 'primary', { 'data-pt-go': 'reset:home,complaints,complaintTt' }), Btn('Về danh sách hồ sơ', 'secondary', { 'data-pt-go': 'reset:home,complaints' })) });
}
/* ===== Cá nhân / Giao dịch điện tử (web /giao-dich-dien-tu, 03/11/2026 v162): cam kết lại theo vai trò + lịch sử xác nhận ===== */
/* nội dung điều khoản lấy từ API theo vai trò – dưới đây dùng nội dung Quy chế mẫu của web (components/gddt/quy-che-gddt) */
var GD_QC = [['Điều 1. Phạm vi và đối tượng áp dụng', 'Quy chế này quy định việc thực hiện các giao dịch điện tử giữa cá nhân, cơ quan, tổ chức với Tòa án nhân dân trên Cổng dịch vụ tư pháp, bao gồm nộp đơn, nhận tống đạt văn bản tố tụng, thanh toán án phí và các thủ tục hành chính tư pháp khác.'],
  ['Điều 2. Điều kiện tham gia', 'Người dùng phải có tài khoản định danh điện tử hợp lệ (VNeID) và cam kết tuân thủ Quy chế này. Việc xác thực khi giao dịch được thực hiện bằng chữ ký số hoặc phương thức xác thực điện tử hợp lệ do Hệ thống chấp nhận.'],
  ['Điều 3. Giá trị pháp lý', 'Thông điệp dữ liệu, tài liệu điện tử được tạo lập, gửi, nhận đúng quy định có giá trị pháp lý như văn bản giấy. Thời điểm gửi, nhận được ghi nhận bằng dấu thời gian của Hệ thống và là căn cứ xác định thời hạn tố tụng.'],
  ['Điều 4. Trách nhiệm của người dùng', 'Người dùng tự chịu trách nhiệm về tính chính xác, trung thực của thông tin cung cấp; bảo mật tài khoản, thiết bị và phương tiện xác thực; thường xuyên theo dõi hộp thư điện tử để nhận văn bản tống đạt đúng hạn.'],
  ['Điều 5. Tạm ngưng, hủy giao dịch điện tử', 'Người dùng có quyền yêu cầu tạm ngưng hoặc hủy giao dịch điện tử. Khi tạm ngưng hoặc hủy, người dùng phải đăng ký phương thức nhận văn bản thay thế; nghĩa vụ tố tụng và thời hạn không thay đổi. Tòa án trả lời yêu cầu trong tối đa 03 ngày làm việc.'],
  ['Điều 6. Xử lý sự cố', 'Trường hợp Hệ thống gặp sự cố kéo dài quá 03 ngày, Tòa án chuyển sang phương thức giao dịch thay thế để bảo đảm quyền, lợi ích hợp pháp của người dùng. Thời gian sự cố không tính vào thời hạn tố tụng.'],
  ['Điều 7. Điều khoản thi hành', 'Quy chế có hiệu lực kể từ ngày ban hành. Việc sửa đổi, bổ sung do Tòa án nhân dân tối cao quyết định và thông báo trên Cổng. — Hết —']];
var GD_QD = [['[Tên quy định đính kèm]', '01-07-2026']];
/* v175: quy định đính kèm của điều khoản – có thể nhiều tệp (dữ liệu mẫu) */
var GD_QDK = [['[Tên quy định đính kèm 1]', '01-07-2026', 'PDF', '1,2 MB'], ['[Tên quy định đính kèm 2]', '01-07-2026', 'PDF', '860 KB'], ['[Tên quy định đính kèm 3]', '15-08-2026', 'DOCX', '240 KB']];
/* v167: hiển thị chữ thường (web trả tên in hoa) */
var GD_DK = 'Cam kết thực hiện các điều kiện pháp lý khi giao dịch điện tử với Tòa án';
/* bản ghi 1 theo dữ liệu web (ảnh người dùng gửi 03/11/2026); các bản ghi sau là mẫu để thể hiện nhiều phiên ký */
var GD_LS0 = [{ ma: 'CK-2026-310', dk: GD_DK, ngayDk: '02-10-2026', vt: ['Đương sự'], tg: '08-10-2026', gio: '10:22:33', qd: 1 },
  { ma: 'CK-2026-[mẫu 2]', dk: GD_DK, ngayDk: '01-07-2026', vt: ['Đương sự', 'Người đại diện'], tg: '15-08-2026', gio: '14:05:10', qd: 1 },
  { ma: 'CK-2026-[mẫu 1]', dk: GD_DK, ngayDk: '01-07-2026', vt: ['Đương sự'], tg: '02-07-2026', gio: '08:45:03', qd: 2 }];
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
  { id: 1, ca: 'VNPT-CA', chu: 'HOÀNG DƯƠNG', cap: 'VNPT Certification Authority', serial: '5401…A7C2', hl: '15-03-2026 – 15-03-2027', dung: '28-10-2026', kiem: '15-03-2026', tt: ['Còn hạn', 'success'] },
  { id: 2, ca: 'Viettel-CA', chu: 'HOÀNG DƯƠNG', cap: 'Viettel Certificate Authority', serial: '7A10…09BE', hl: '20-11-2025 – 20-11-2026', dung: 'Chưa dùng', kiem: '20-11-2025', tt: ['Sắp hết hạn', 'warning'] }];
var SK_CA = ['VNPT-CA', 'Viettel-CA', 'BKAV-CA', 'FPT-CA'];
var SK_LS = [
  { tg: '28-10-2026 10:15', don: 'TN-20261020-0012 · Đơn khởi kiện', tt: ['Thành công', 'success'], ca: 'VNPT-CA · 5401…A7C2', tep: [2, 2], ds: [['Don-khoi-kien.pdf', 'Đã ký', true], ['Ban-ke-tai-lieu-chung-cu.pdf', 'Đã ký', true]] },
  { tg: '21-10-2026 09:02', don: 'KN-2026-0012 · Đơn khiếu nại', tt: ['Ký một phần', 'warning'], ly: '[Lý do theo mã lỗi của phiên ký]', ca: 'VNPT-CA · 5401…A7C2', tep: [1, 2], ds: [['Don-khieu-nai.pdf', 'Đã ký', true], ['Tai-lieu-kem-theo.pdf', 'Lỗi', false, '[Mô tả lỗi của tệp]']] },
  { tg: '15-10-2026 16:40', don: 'Đơn #1024 · Đơn đề nghị miễn, giảm án phí', tt: ['Thất bại', 'danger'], ly: '[Lý do theo mã lỗi của phiên ký]', ca: 'Viettel-CA · 7A10…09BE', tep: [0, 1], ds: [['De-nghi-mien-giam.pdf', 'Lỗi', false, '[Mô tả lỗi của tệp]']] }];
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
    Filt(h('div', { className: 'sk-ngay' }, Tf('Từ ngày', Dt({ value: p.sai ? '28-10-2026' : '05-10-2026' })), Tf('Đến ngày', Dt({ value: p.sai ? '01-10-2026' : '04-11-2026' }))),
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
    Bar(Btn('Hủy', 'secondary', { 'data-pt-go': 'back' }), Btn('Kiểm tra và khai báo', 'primary', (p.ca || ca[0]) && sdt[0] ? { 'data-pt-go': 'backTo:sign', 'data-pt-snack': 'Đã khai báo chứng thư số' } : { disabled: true })));
}
function SignFile() {
  return Sub('Thử ký tệp', h(F, null, h('p', { className: 'sk-note' }, '[Màn chỉ có ở bản chạy thử (dev/test) – không có mục điều hướng trên bản phát hành]'),
    Blk('Thử ký tệp', h(T.FileUpload, { hint: 'Chưa chọn tài liệu', uploadLabel: 'Chọn tài liệu PDF', accept: '.pdf' }))), Bar(Btn('Kiểm tra trước khi ký')));
}

/* ===== 11. Trợ giúp pháp lý (web /tro-giup-phap-ly, công khai: Tra cứu điểm · Điều kiện miễn phí) – v179 ===== */
/* điểm lấy từ DM_DIEM_TGPL, diện lấy từ DM_DIEN_TGPL – dữ liệu dưới đây là mẫu */
var TG_DIEM = [
  { ma: 'd1', loai: 'Trung tâm TGPL nhà nước', ten: 'Trung tâm Trợ giúp pháp lý nhà nước TP. Hà Nội', dc: 'Số 1 Tôn Thất Thuyết, Phường Cầu Giấy, Thành phố Hà Nội', tinh: 'TP. Hà Nội', lv: ['Hình sự', 'Dân sự', 'Hành chính'], dd: 'Trần Thị Mai', sdt: '024 3833 0001', gio: 'Thứ Hai – Thứ Sáu, 8:00 – 17:00', tu: '01-01-2020' },
  { ma: 'd2', loai: 'Trung tâm TGPL nhà nước', ten: 'Trung tâm Trợ giúp pháp lý nhà nước TP. Hồ Chí Minh', dc: 'Số 141 Pasteur, Phường Xuân Hòa, Thành phố Hồ Chí Minh', tinh: 'TP. Hồ Chí Minh', lv: ['Dân sự', 'Lao động'], dd: 'Lê Văn Khoa', sdt: '028 3829 0002', tu: '01-01-2020' },
  { ma: 'd3', loai: 'Tổ chức hành nghề luật sư', ten: 'Công ty Luật TNHH Minh Pháp', dc: 'Số 25 Láng Hạ, Phường Láng, Thành phố Hà Nội', tinh: 'TP. Hà Nội', lv: ['Hình sự'], dd: 'Nguyễn Hữu Thắng', sdt: '024 3562 0003', tu: '15-06-2023' }];
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
    Bar(Btn('Xem vị trí và chỉ đường', 'primary', { icon: 'mapPin', block: true, 'data-pt-go': 'snack:Mở bản đồ chỉ đường' })));
}

/* ===== 12. Đơn phản tố / yêu cầu độc lập + nộp ý kiến (web /nop-don-phan-to, /nop-don-yeu-cau-doc-lap, /nop-y-kien-phan-to, /nop-y-kien-yeu-cau-doc-lap) – v182 ===== */
var PX_STEPS = ['Giải thích', 'Thông tin vụ án', 'Các bên', 'Nội dung yêu cầu', 'Tài liệu', 'Xem lại và gửi'];
var PX = {
  pt: { id: 'px', ten: 'Nộp đơn phản tố', don: 'đơn phản tố', donHoa: 'Đơn phản tố', yc: 'yêu cầu phản tố', la: '“Phản tố” là gì?',
    dn: 'Là quyền của bị đơn đưa ra yêu cầu kiện ngược lại nguyên đơn, được xem xét, giải quyết ngay trong vụ án đang diễn ra — không phải khởi kiện thành vụ án mới.',
    phi: 'Chưa nộp tạm ứng án phí phản tố', phiT: 'Yêu cầu phản tố sẽ KHÔNG được đưa vào vụ án cho đến khi bạn hoàn thành nộp tạm ứng án phí theo thông báo của Tòa án.',
    vt: 'Bị đơn', benT: 'Bên bị phản tố', benD: 'Bạn là bị đơn trong vụ án. Chọn bên bị phản tố — thường là nguyên đơn.', ben: [['Nguyễn Văn Hùng', 'Nguyên đơn']],
    vd: 'Ví dụ: Yêu cầu nguyên đơn hoàn trả tiền đặt cọc 50.000.000 VNĐ và bồi thường chi phí sửa chữa 30.000.000 VNĐ.',
    xn: h(F, null, 'Tôi xác nhận yêu cầu phản tố này nhằm ', h('b', null, 'bù trừ, loại trừ hoặc có liên quan'), ' đến yêu cầu của nguyên đơn trong vụ án.'),
    gc: 'Tòa án sẽ thẩm định phạm vi phản tố khi tiếp nhận — yêu cầu phản tố phải nhằm bù trừ, loại trừ hoặc có liên quan đến yêu cầu của nguyên đơn. Nếu không thuộc phạm vi đó, bạn có thể được hướng dẫn khởi kiện thành vụ án riêng.',
    chan: [['Vụ án đã qua giai đoạn cho phép nộp phản tố', 'Đơn phản tố chỉ được nộp khi vụ án đang ở giai đoạn Sơ thẩm — chuẩn bị xét xử.'], ['Bạn không có quyền nộp đơn phản tố', 'Chỉ bị đơn trong vụ án mới có quyền nộp đơn phản tố.'], ['Vụ án đã có bản án', 'Vụ án này đã được giải quyết, không thể nộp đơn phản tố nữa.'], ['Đã quá hạn nộp đơn phản tố', 'Hạn nộp đơn phản tố của vụ án này là 25-10-2026 và đã qua, bạn không thể nộp đơn phản tố nữa.']] },
  yc: { id: 'yx', ten: 'Nộp đơn yêu cầu độc lập', don: 'đơn yêu cầu độc lập', donHoa: 'Đơn yêu cầu độc lập', yc: 'yêu cầu độc lập', la: '“Yêu cầu độc lập” là gì?',
    dn: 'Là quyền của người có quyền lợi, nghĩa vụ liên quan đưa ra yêu cầu riêng của mình, được xem xét, giải quyết cùng vụ án đang diễn ra.',
    phi: 'Chưa nộp tạm ứng án phí yêu cầu độc lập', phiT: 'Yêu cầu độc lập sẽ KHÔNG được đưa vào vụ án cho đến khi bạn hoàn thành nộp tạm ứng án phí theo thông báo của Tòa án.',
    vt: 'Người có quyền lợi, nghĩa vụ liên quan', benT: 'Bên bị yêu cầu', benD: 'Chọn (các) đương sự trong vụ án mà yêu cầu độc lập của bạn hướng tới.', ben: [['Nguyễn Văn Hùng', 'Nguyên đơn'], ['Trần Văn Bình', 'Bị đơn']],
    vd: 'Ví dụ: Yêu cầu được ưu tiên thanh toán khoản vay 800.000.000 VNĐ có tài sản bảo đảm là công trình đang tranh chấp.',
    xn: h(F, null, 'Tôi xác nhận yêu cầu độc lập này ', h('b', null, 'có liên quan'), ' đến việc giải quyết vụ án đang tiến hành.'),
    gc: 'Tòa án sẽ thẩm định yêu cầu độc lập khi tiếp nhận — yêu cầu phải liên quan đến việc giải quyết vụ án đang tiến hành. Nếu không thuộc phạm vi đó, bạn có thể được hướng dẫn khởi kiện thành vụ án riêng.',
    chan: [['Vụ án đã qua giai đoạn cho phép nộp yêu cầu độc lập', 'Đơn yêu cầu độc lập chỉ được nộp khi vụ án đang ở giai đoạn Sơ thẩm — chuẩn bị xét xử.'], ['Bạn không có quyền nộp đơn yêu cầu độc lập', 'Chỉ người có quyền lợi, nghĩa vụ liên quan trong vụ án mới có quyền nộp đơn yêu cầu độc lập.'], ['Vụ án đã có bản án', 'Vụ án này đã được giải quyết, không thể nộp đơn yêu cầu độc lập nữa.'], ['Đã quá hạn nộp đơn yêu cầu độc lập', 'Hạn nộp đơn yêu cầu độc lập của vụ án này là 25-10-2026 và đã qua, bạn không thể nộp đơn yêu cầu độc lập nữa.']] } };
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
  return PxWz(p.k, 5, FCard('Tài liệu và chứng cứ', h(F, null, Lead('Định dạng PDF, JPG, PNG, DOCX · tối đa 10MB/tệp. Không bắt buộc đính kèm tài liệu.'),
    h(T.FileUpload, { hint: 'Chỉ chọn được tệp PDF, JPG, PNG, DOCX tối đa 10MB.', uploadLabel: 'Tải lên tài liệu bổ sung', libraryLabel: 'Lấy từ kho dữ liệu cá nhân', files: [{ name: 'bien-ban-dat-coc.pdf', meta: 'Loại tài liệu: [Chọn loại tài liệu] · 640 KB', status: 'done' }] })), true));
}
function Px6(p) {
  var c = PX[p.k];
  return h(KyGuiDon, { title: c.ten, steps: PX_STEPS, lead: 'Kiểm tra lại thông tin trước khi gửi đến Tòa án.', ok: c.id + 'Ok', tep: ['Xem trước ' + c.don, 'bien-ban-dat-coc.pdf'], tepMeta: 'Bản in đơn', vaiTro: c.vt,
    kyTitle: 'Xem lại và gửi', kyNote: 'Vui lòng ký số đơn trước khi gửi.',
    top: FCard('Thông tin đơn', RvKV([['Loại đơn', c.donHoa], ['Vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Người nộp', 'Hoàng Dương (Bạn)'], [c.benT, c.ben[0][0]], ['Yêu cầu cụ thể', PX_ND[p.k]], ['Giá trị tranh chấp', 'Không nêu'], ['Tài liệu đính kèm (1 tệp)', 'bien-ban-dat-coc.pdf']]), true),
    bottom: HopGhi('Trước khi gửi, xin lưu ý', 'Sau khi Tòa án tiếp nhận, bạn sẽ nhận thông báo nộp tạm ứng án phí. Không nộp trong hạn, yêu cầu sẽ không được xem xét.'),
    camDoan: 'Tôi cam đoan các thông tin và tài liệu đã cung cấp là đúng sự thật và chịu trách nhiệm trước pháp luật.' });
}
function PxOk(p) {
  var c = PX[p.k];
  return h(OkScr, { title: 'Đã gửi ' + c.don + ' thành công', text: c.donHoa + ' của bạn đã được tiếp nhận. Tòa án sẽ xem xét và thông báo qua Hộp thư tống đạt.', info: [['Mã đơn', h('span', { className: 'tp-num' }, p.k === 'pt' ? 'PT-2026-0004' : 'YCDL-2026-0002')], ['Thời điểm gửi', '04-11-2026 09:30']],
    btns: h(F, null, Btn('Xem tại Vụ án của tôi', 'primary', { 'data-pt-go': 'reset:records,cases' }), Btn('Về Trang chủ', 'secondary', { 'data-pt-go': 'tab:home' })) });
}
function PxChan(p) {
  var c = PX[p.k], x = p.i < 0 ? ['Thiếu vụ án', 'Bạn cần mở màn này từ 1 vụ án cụ thể trong "Vụ án của tôi".'] : c.chan[p.i];
  return SubS(c.ten, h(F, null, h(T.EmptyState, { variant: 'center', icon: 'lock', title: x[0], text: x[1], actionLabel: 'Về Vụ án của tôi', onAction: noop, className: 'nv-err px-chan' })));
}
/* nộp ý kiến về yêu cầu phản tố / yêu cầu độc lập của đương sự khác (4 bước) */
var YK_STEPS = ['Thông báo của Tòa án', 'Ý kiến của bạn', 'Tài liệu, chứng cứ', 'Xem lại và ký gửi'];
var YK_LOAI = [['DONG_Y_TOAN_BO', 'Đồng ý toàn bộ yêu cầu', 'Tòa án ghi nhận sự thừa nhận của bạn; bên nộp đơn không phải chứng minh phần bạn đã thừa nhận.'], ['DONG_Y_MOT_PHAN', 'Đồng ý một phần', 'Nêu rõ phần bạn đồng ý và phần bạn không đồng ý.'], ['KHONG_DONG_Y', 'Không đồng ý', 'Trình bày lý do và căn cứ bác bỏ yêu cầu.']];
var YK = { pt: { id: 'pyk', nguoi: 'Trần Văn Bình', vb: 'Thông báo thụ lý yêu cầu phản tố số [Số thông báo]' }, yc: { id: 'yyk', nguoi: 'Lê Thị Hoa', vb: 'Thông báo thụ lý yêu cầu độc lập số [Số thông báo]' } };
function YkWz(k, n, body, go) { var c = PX[k]; return Wz({ title: 'Nộp ý kiến', steps: YK_STEPS, n: n, go: go || (YK[k].id + (n + 1)), body: body }); }
function Yk1(p) {
  var c = PX[p.k], y = YK[p.k];
  return YkWz(p.k, 1, h(F, null, h(NvCall, { tone: 'warning', icon: 'clock', title: 'Hạn nộp ý kiến — Còn 12 ngày' }, ''),
    FCard('Thông báo của Tòa án', h(F, null, Lead('Văn bản Tòa án đã tống đạt cho bạn về ' + c.yc + '.'), RvKV([['Văn bản', y.vb], ['Người ký', 'Trần Văn Anh — Thẩm phán'], ['Ngày tống đạt', '20-10-2026'], ['Người nộp đơn', y.nguoi]])), true),
    FCard('Văn bản Tòa án', h(F, null, Lead('Đọc kỹ nội dung ' + c.yc + ' trước khi nêu ý kiến.'), h('div', { className: 'vk-tabs' }, h(T.Tabs, { variant: 'chip', label: 'Tệp', items: [{ key: 'v', label: 'Văn bản' }, { key: 't', label: 'Tệp kèm · Tệp 1' }] })),
      DtDocs([[y.vb, y.vb + '.pdf · PDF']], { the: true })), true))); /* v351: bỏ xem trực tiếp, nút Xem mở màn xem tệp */
}
function Yk2(p) {
  var c = PX[p.k], l = React.useState(p.err ? '' : 'DONG_Y_MOT_PHAN'), pd = React.useState(p.err ? '' : 'Đồng ý hoàn trả 20.000.000 VNĐ tiền đặt cọc.'), nd = React.useState(p.err ? '' : 'Tôi chỉ nhận đặt cọc 20.000.000 VNĐ theo biên bản ngày 05-01-2026, không có khoản chi phí sửa chữa.');
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
    top: FCard('Ý kiến', RvKV([['Vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Người nộp', 'Hoàng Dương (Bạn)'], ['Ý kiến', 'Đồng ý một phần'], ['Thời hạn', 'Còn 12 ngày'], ['Phần yêu cầu đồng ý', 'Đồng ý hoàn trả 20.000.000 VNĐ tiền đặt cọc.'], ['Trình bày', 'Tôi chỉ nhận đặt cọc 20.000.000 VNĐ theo biên bản ngày 05-01-2026, không có khoản chi phí sửa chữa.'], ['Tài liệu đính kèm (0 tệp)', 'Chưa đính kèm tài liệu nào.']]), true),
    camDoan: 'Tôi cam đoan các thông tin và tài liệu đã cung cấp là đúng sự thật và chịu trách nhiệm trước pháp luật.' });
}
function YkOk(p) {
  var c = PX[p.k];
  return h(OkScr, { title: 'Đã gửi ý kiến thành công', text: 'Ý kiến của bạn về ' + c.yc + ' đã được tiếp nhận và đưa vào hồ sơ vụ án. Tòa án sẽ thông báo qua Hộp thư tống đạt.', info: [['Mã ý kiến', h('span', { className: 'tp-num' }, 'YK-2026-0007')], ['Thời điểm gửi', '04-11-2026 09:30']],
    btns: h(F, null, Btn('Về chi tiết vụ án', 'primary', { 'data-pt-go': 'backTo:caseDetail' }), Btn('Về Trang chủ', 'secondary', { 'data-pt-go': 'tab:home' })) });
}
/* chi tiết vụ án theo vai trò: bị đơn (phản tố) / người có QL, NV liên quan (YCĐL) – nút nộp đơn + "Nộp ý kiến tố tụng" */
function VaVaiTro(p) {
  var sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), pt = p.vt === 'bd';
  var muc = pt ? [['Yêu cầu độc lập của', 'Lê Thị Hoa', 'yyk1'], ['Ý kiến về yêu cầu khởi kiện của', 'Nguyễn Văn Hùng', 'kkyk1'], ['Ý kiến về yêu cầu của nguyên đơn', 'Nguyễn Văn Hùng', 'ndyk1']] : [['Đơn phản tố của', 'Trần Văn Bình', 'pyk1'], ['Ý kiến về yêu cầu của người yêu cầu', 'Nguyễn Văn Hùng', 'nyyk1']]; /* v397: thêm ACTION_029/030/031 */
  return h('div', { className: 'px-acts' }, h('span', { ref: anchor, hidden: true }),
    h('p', { className: 'px-acts-h' }, 'Tư cách của bạn: ', h('b', null, pt ? 'Bị đơn' : 'Người có quyền lợi, nghĩa vụ liên quan')),
    h('div', { className: 'ph-2btn' }, Btn(pt ? 'Nộp đơn phản tố' : 'Nộp đơn yêu cầu độc lập', 'primary', { size: 'sm', icon: 'plus', disabled: !!p.khoa, className: p.khoa ? 'va4-khoa' : undefined /* v583 (1.24) */, 'data-pt-go': p.khoa ? undefined : p.cho ? 'snack:Bạn đang có một đơn chờ Tòa án giải quyết. Vui lòng đợi xử lý xong trước khi nộp đơn mới.' : (pt ? 'px1' : 'yx1') }),
      Btn('Nộp ý kiến tố tụng', 'secondary', { size: 'sm', onClick: function () { sh[1](true); } })),
    p.khoa ? VaLy('[Lý do khóa của hệ thống]') : null,
    sh[0] && host ? h(LvSheet, { host: host, title: 'Nộp ý kiến tố tụng', onClose: function () { sh[1](false); } }, h('ul', { className: 'ph-lvr' }, muc.map(function (m) { return h('li', { key: m[1] }, h('button', { type: 'button', className: 'ph-lvr-it', 'data-pt-go': m[2] }, h('span', { className: 'ph-lvr-tx' }, h('span', { className: 'ph-lvr-d' }, m[0]), h('span', { className: 'ph-lvr-t' }, m[1])), h(T.Icon, { name: 'chevronRight' }))); }))) : null);
}

/* ===== 13. Đề nghị giám đốc thẩm / tái thẩm (web /nop-don-giam-doc-tham, /nop-don-tai-tham) – v183 ===== */
var GX_STEPS = ['Bản án, quyết định', 'Căn cứ đề nghị', 'Nội dung đề nghị', 'Tài liệu kèm theo', 'Xem lại và ký số'];
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
var GX_BA = [{ so: 'Bản án số 45/2025/DS-PT', loai: 'Bản án dân sự phúc thẩm', vu: 'Tranh chấp hợp đồng chuyển nhượng quyền sử dụng đất', toa: 'TAND cấp cao tại Hà Nội', hl: '12-03-2026', con: 231 },
  { so: 'Quyết định số 12/2024/QĐ-PT', loai: 'Quyết định giải quyết việc dân sự phúc thẩm', vu: 'Yêu cầu tuyên bố văn bản công chứng vô hiệu', toa: 'TAND thành phố Hà Nội', hl: '28-11-2025', con: 114, nhap: true }];
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
  var c = GX[p.k], v = React.useState(p.err ? [] : [0]), ng = React.useState('15-01-2026'), cb = React.useState('');
  return GxWz(p.k, 2, h(F, null, FCard(c.ccT, h(F, null, Lead(c.ccD),
    h('div', { className: 'gd-vt-l gd-vt-cb' }, c.cc.map(function (t, i) { var on = v[0].indexOf(i) >= 0; return h(T.Checkbox, { key: i, checked: on, onChange: function () { v[1](on ? v[0].filter(function (x) { return x !== i; }) : v[0].concat([i])); }, label: h('span', { className: 'gd-vt-lb' }, t) }); })),
    !v[0].length ? h('p', { className: 'px-err', role: 'alert' }, c.ccErr) : null), true),
    p.k === 'tt' ? FCard('Thời điểm biết được căn cứ', h(F, null, Lead('Dùng để xác định thời hạn 01 năm đề nghị tái thẩm (Điều 355 BLTTDS).'),
      Tf('Ngày biết được căn cứ', Dt({ required: true, value: ng[0], onChange: function (e) { ng[1](e.target.value); } })),
      h('p', { className: 'gx-han' }, 'Hạn đề nghị: 15-01-2027 — còn 72 ngày'),
      Tf('Bạn biết được căn cứ này như thế nào?', { required: true, multiline: true, maxLength: 2000, showCount: true, value: cb[0], onChange: function (e) { cb[1](e.target.value); }, placeholder: 'Ví dụ: Ngày 15-01-2026, tôi nhận được thông báo từ cơ quan công an xác nhận lời khai của nhân chứng X trong hồ sơ vụ án là giả mạo...' })), true) : null));
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
      FCard('Nội dung đề nghị xem xét lại', P('Bản án phúc thẩm số 45/2025/DS-PT đã xác định diện tích đất chuyển nhượng 240 m² là không phù hợp với thực tế hợp đồng công chứng và biên bản đo đạc hiện trạng ngày 15-04-2020…'), true),
      FCard('Tài liệu đính kèm (2)', DtDocs([['Bản sao Bản án: số 45/2025/DS-PT', 'Tài liệu 1'], ['bien-ban-do-dac-hien-trang.pdf', 'Tài liệu 2 (bổ sung)']]), true)),
    camDoan: 'Tôi cam đoan nội dung đề nghị và tài liệu kèm theo là đúng sự thật, và chịu hoàn toàn trách nhiệm trước pháp luật.' });
}
function GxOk(p) {
  var c = GX[p.k];
  return h(OkScr, { title: 'Đã gửi đơn đề nghị ' + c.thuTuc + ' thành công', text: c.ok, info: [['Mã tiếp nhận', h('span', { className: 'tp-num' }, p.k === 'gdt' ? 'GDT-2026-0007' : 'TT-2026-0003')], ['Bản án đề nghị', h('span', { className: 'tp-num' }, GX_BA[0].so)], ['Trạng thái', h(T.StatusBadge, { tone: 'info', icon: false }, 'Đã gửi đơn')]],
    btns: h(F, null, Btn('Xem tại Quản lý đơn', 'primary', { icon: 'file', 'data-pt-go': 'reset:records,applicationsGdt' }), Btn('Về Trang chủ', 'secondary', { 'data-pt-go': 'tab:home' })) });
}

/* ===== 14. Rút đơn / sửa đổi, bổ sung đơn đề nghị GĐT, tái thẩm (web quan-ly-don/:id/giam-doc-tham-rut-don, giam-doc-tham-sua-doi-bo-sung) – v184 ===== */
var GR_STEPS = ['Đơn cần rút', 'Lý do và hệ quả', 'Xác nhận và ký gửi'];
/* lý do rút lấy từ DM_DANHMUCCHUNG LYDO_RUTDONGDT – tên dưới đây là mẫu; "Lý do khác" (LDRDGDT_05) bắt buộc trình bày ≥15 ký tự */
var GR_LYDO = [['LDRDGDT_01', '[Các bên đã thỏa thuận được việc thi hành bản án]'], ['LDRDGDT_02', '[Không còn nhu cầu đề nghị xem xét lại]'], ['LDRDGDT_03', '[Nộp nhầm đơn, nhầm bản án]'], ['LDRDGDT_04', '[Sẽ nộp lại đơn đầy đủ căn cứ hơn]'], ['LDRDGDT_05', 'Lý do khác', 'Trình bày cụ thể ở ô bên dưới.']];
function grTen(k) { return k === 'tt' ? 'tái thẩm' : 'giám đốc thẩm'; }
function GrWz(k, n, body, go) { return Wz({ title: 'Rút đơn', steps: GR_STEPS, n: n, go: go || ('gr' + k + (n + 1)), body: h(F, null, n === 1 ? Lead('Bạn đang đề nghị Tòa án cho rút đơn. Đơn chỉ được rút sau khi Tòa án phê duyệt.') : null, body) }); }
/* v353 (QLD4-W15): p.nhap – nạp lại bản nháp, có thông báo */
function Gr1(p) {
  return h(F, null, GrWz(p.k, 1, FCard('Đơn bạn đề nghị rút', h(F, null, Lead('Kiểm tra đúng đơn trước khi tiếp tục. Thông tin lấy tự động, không sửa được.'),
    RvKV([['Mã đơn', h('span', { className: 'tp-num' }, 'GT-2026-0049 · TN-20261029-0020')], ['Loại đơn', p.k === 'tt' ? 'Đơn đề nghị tái thẩm' : 'Đơn đề nghị giám đốc thẩm'], ['Bản án, quyết định', 'Bản án phúc thẩm số 18/2026/DS-PT · TAND cấp cao tại Hà Nội'], ['Tòa án đang giải quyết', 'Tòa án nhân dân cấp cao tại Hà Nội'], ['Ngày gửi', '29-10-2026'], ['Trạng thái hiện tại', p.sua ? 'Yêu cầu sửa đổi, bổ sung đơn' : 'Đã gửi đơn']])), true), p.sua ? 'grgdt2sua' : undefined),
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
      Tf(khac ? 'Trình bày thêm' : 'Trình bày thêm (tùy chọn)', { required: khac, multiline: true, maxLength: 2000, showCount: true, value: t[0], onChange: function (e) { t[1](e.target.value); }, placeholder: 'Hai bên đã thỏa thuận xong việc thi hành bản án ngày 05-10-2026…',
        help: khac ? 'Bắt buộc khi chọn lý do này, tối thiểu 15 ký tự.' : 'Nêu thêm nếu bạn muốn Tòa án biết rõ hoàn cảnh.', error: khac && d > 0 && d < 15 ? 'Nội dung trình bày thêm phải có tối thiểu 15 ký tự.' : undefined })), true)));
}
/* v353 (QLD4-W10): ô cam đoan bắt buộc */
function Gr3(p) {
  return h(KyGuiDon, { title: 'Rút đơn', steps: GR_STEPS, kyTitle: 'Xem lại và ký gửi', lead: 'Cổng tự sinh đơn từ thông tin bạn đã khai. Muốn sửa, bấm Quay lại.', ok: 'gr' + p.k + 'Ok', tep: ['Xem trước đơn'], tepMeta: 'Đơn yêu cầu rút đơn đề nghị ' + grTen(p.k), vaiTro: 'Người đề nghị',
    top: FCard('Yêu cầu rút đơn', RvKV([['Đơn cần rút', h('span', { className: 'tp-num' }, 'GT-2026-0049')], ['Bản án, quyết định', 'Bản án phúc thẩm số 18/2026/DS-PT'], ['Lý do rút đơn', '[Các bên đã thỏa thuận được việc thi hành bản án]']]), true),
    camDoan: 'Tôi hiểu hệ quả của việc rút đơn và tự nguyện đề nghị Tòa án cho rút đơn này.' });
}
function GrOk(p) { return h(OkScr, { title: 'Đã gửi yêu cầu rút đơn đề nghị ' + grTen(p.k) + '.', text: 'Đơn chỉ được rút sau khi Tòa án phê duyệt. Kết quả gửi qua Hộp thư tống đạt.', btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'backTo:gdtDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applicationsGdt' })) }); }
/* sửa đổi, bổ sung đơn đề nghị GĐT/TT theo thông báo của Tòa án (4 bước) */
var GS_STEPS = ['Bản án, vụ án và thông báo', 'Nội dung sửa đổi, bổ sung', 'Tài liệu kèm theo', 'Xem lại và ký nộp'];
function GsWz(k, n, body, go) { return Wz({ title: 'Sửa đổi, bổ sung đơn', steps: GS_STEPS, n: n, go: go || ('gs' + k + (n + 1)), body: body }); }
/* v353 (QLD4-W12, bỏ M02): banner hạn nộp bản sửa (Còn N ngày / ≤3 ngày đỏ / Quá hạn / Vô thời hạn); bỏ thẻ "Thông báo của Tòa án" */
function Gs1(p) {
  var t = grTen(p.k), han = p.han || 'con', do_ = han === 'sap' || han === 'qua';
  var gt = { con: 'Còn 26 ngày', sap: 'Còn 2 ngày', qua: 'Quá hạn 3 ngày', vo: 'Vô thời hạn' }[han];
  var dong = han === 'vo' ? 'Thông báo này không quy định hạn nộp bản sửa đổi, bổ sung (tống đạt ngày 30-10-2026).' : h(F, null, 'Hạn cuối: ', h('strong', null, han === 'qua' ? '10-11-2026' : han === 'sap' ? '15-11-2026' : '29-11-2026'), ' – tối đa 30 ngày kể từ ngày tống đạt thông báo (' + (han === 'qua' ? '11-10-2026' : han === 'sap' ? '16-10-2026' : '30-10-2026') + ').');
  return GsWz(p.k, 1, h(F, null,
    FCard('Đơn đang có yêu cầu sửa đổi, bổ sung', h(F, null, Lead('Danh sách lấy từ các thông báo Tòa án đã tống đạt cho bạn.'),
      h('div', { className: 'mg-opts' }, h('button', { type: 'button', role: 'radio', 'aria-checked': true, className: 'mg-opt mg-opt-on' }, h('span', { className: 'mg-opt-r', 'aria-hidden': 'true' }),
        h('span', { className: 'mg-opt-tx' }, h('b', null, 'Đề nghị ' + t + ' đối với Bản án số 18/2026/DS-PT'), h('small', null, h('span', { className: 'tp-num' }, 'TN-20261029-0020'), ' · Tranh chấp hợp đồng chuyển nhượng quyền sử dụng đất'))))), true),
    h('section', { className: 'q4-han' + (do_ ? ' q4-han-do' : '') }, h('small', null, 'Hạn nộp bản sửa đổi, bổ sung'), h('b', null, gt), h('p', null, dong), h('p', { className: 'q4-han-hq' }, '* Không sửa đổi, bổ sung đúng hạn thì đơn đề nghị ' + t + ' sẽ bị Tòa án trả lại theo quy định.'))));
}
function Gs2(p) {
  var v = React.useState(p.err ? 'Bổ sung căn cứ' : 'Tôi đề nghị xem xét lại Bản án phúc thẩm số 18/2026/DS-PT theo thủ tục ' + grTen(p.k) + ' vì Tòa án cấp phúc thẩm đã không xem xét biên bản đo đạc hiện trạng ngày 15-04-2020…'), d = v[0].trim().length;
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
  return h(KyGuiDon, { title: 'Sửa đổi, bổ sung đơn', steps: GS_STEPS, kyTitle: 'Xem lại và ký gửi', lead: 'Kiểm tra lại đơn, ký số rồi gửi tới Tòa án.', ok: 'gs' + p.k + 'Ok', tep: ['Xem trước đơn', 'bien-ban-do-dac-hien-trang.pdf'], tepMeta: 'Đơn sửa đổi, bổ sung', vaiTro: 'Người đề nghị',
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
  { ma: 'DKBV-2026-000123', hs: 'DS-2026-0012', toa: COURT1, nbv: 'Trần Minh Khoa', ds: 'Hoàng Dương', tc: 'Luật sư', gui: '28-10-2026', tt: 'DA_GUI', go: 'defenderView' },
  { ma: 'DKBV-2026-000118', hs: 'DON-2026-000245', toa: COURT1, nbv: 'Lê Thu Hà', ds: 'Hoàng Dương', tc: 'Trợ giúp viên', gui: '20-10-2026', tt: 'CHAP_NHAN', go: 'defenderViewOk' },
  { ma: 'DKBV-2026-000097', hs: 'DS-2026-0018', toa: COURT1, nbv: 'Phạm Quốc Bảo', ds: 'Hoàng Dương', tc: 'Công dân Việt Nam', gui: '10-10-2026', tt: 'TU_CHOI', go: 'defenderViewNo' }];
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
    BvNhom('Thông tin người đăng ký', h(F, null, RvKV([['Họ và tên', 'Hoàng Dương'], ['CCCD', '001090012345'], ['Ngày sinh', '12-05-1990'], ['Giới tính', 'Nam']]),
      AddrG('Địa chỉ hiện tại', 0, 'full', BV_DIA, true), AddrG('Địa chỉ thường trú', 0, 'full', BV_DIA, true)))), true);
}
/* thông tin người bảo vệ: định danh → Xác thực → giới tính, quốc tịch, dân tộc, địa chỉ */
function BvNbv(p) {
  var xt = React.useState(!!p.xt);
  return FCard('Thông tin người bảo vệ', h(F, null,
    Tf('Số CCCD', { required: true, inputMode: 'numeric', placeholder: 'Nhập 12 chữ số', defaultValue: p.rong ? '' : '001085012345', maxLength: 12, onChange: function () { xt[1](false); } }),
    Tf('Họ và tên', { required: true, defaultValue: p.rong ? '' : 'Trần Minh Khoa', onChange: function () { xt[1](false); } }),
    Tf('Ngày sinh', Dt({ required: true, defaultValue: p.rong ? '' : '20-03-1985' })),
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
      Tf('Ngày sinh', Dt({ required: true, defaultValue: p.err ? '' : '12-05-1990', error: p.err ? 'Vui lòng nhập ngày sinh.' : undefined })),
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
    FCard('Thông tin người bảo vệ', RvKV([['Họ và tên', 'Trần Minh Khoa'], ['Số CCCD', '001085012345'], ['Ngày sinh', '20-03-1985'], ['Giới tính', 'Nam'], ['Quốc tịch', 'Việt Nam'], ['Dân tộc', 'Kinh'],
      ['Địa chỉ hiện tại', 'Số 12 Trần Thái Tông, Phường Cầu Giấy, Thành phố Hà Nội'], ['Địa chỉ thường trú', 'Số 12 Trần Thái Tông, Phường Cầu Giấy, Thành phố Hà Nội'],
      ['Tư cách bảo vệ', 'Luật sư'], ['Thẻ luật sư', '12345/TLS'], ['Tên văn phòng/Công ty luật', 'Công ty Luật TNHH Minh Khoa'], ['Đoàn luật sư', BV_DOAN[0]]]), true),
    FCard('Đương sự được bảo vệ', RvKV([['Mã đơn/Mã vụ án/vụ việc', 'DS-2026-0012']].concat(r === 'n' ? [['Đơn khởi kiện/vụ án hành chính', 'Không']] : [],
      [['Tòa án', COURT1], ['Họ và tên', 'Hoàng Dương'], ['CCCD', '001090012345'], ['Ngày sinh', '12-05-1990'], ['Vai trò tố tụng', 'Người đứng đơn']])), true),
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
  var rows = [['Ngày gửi', r.gui]].concat(tt !== 'DA_GUI' ? [['Ngày có kết quả', tt === 'CHAP_NHAN' ? '24-10-2026' : '15-10-2026']] : [], [['Đã ký số', r.gui + ' 09:15 · Ký số từ xa']]);
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
      RvKV([['Hình thức', e.ht === 'Trực tiếp' ? 'Tại trụ sở Tòa án' : 'Trực tuyến qua hệ thống xét xử điện tử của Tòa án'], ['Địa điểm', e.dd], ['Tòa án', e.toa]].concat(e.va ? [['Vụ án', e.va], ['Văn bản ấn định', 'Quyết định đưa vụ án ra xét xử · số [Số quyết định]']] : [], [['Trạng thái phiên', 'Sắp diễn ra']]))));
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
    h(T.CalendarCard, { monthLabel: mode[0] === 'week' ? '02/11 – 08-11-2026' : 'Tháng 11, 2026', mode: mode[0], onModeChange: mode[1], offset: 6, days: 30, week: LC_WEEK, today: 4, selected: sel[0],
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
  { id: 'p1', loai: 'PT', ten: 'Phiên tòa sơ thẩm', va: 'DS-2026-0012', vaTen: 'Tranh chấp hợp đồng vay tài sản', vt: 'Nguyên đơn', tg: '14:00 · 06-11-2026', con: 'Còn 2 ngày 3 giờ', ht: 'Có mặt trực tiếp tại Tòa án', toa: COURT1, giay: ['Giấy triệu tập', '[Số giấy triệu tập] · Đã tống đạt ngày 28-10-2026'], ph: 'CHUA', han: '05-11-2026', go: 'hearingDetail' },
  { id: 'p2', loai: 'PH', ten: 'Phiên họp kiểm tra việc giao nộp, tiếp cận, công khai chứng cứ', va: 'DS-2026-0018', vaTen: 'Tranh chấp hợp đồng mua bán tài sản', vt: 'Bị đơn', tg: '08:30 · 05-11-2026', con: 'Còn 20 giờ 15 phút', ht: 'Tham dự trực tuyến tại điểm cầu tự chọn', toa: COURT1, giay: ['Giấy triệu tập', '[Số giấy triệu tập] · Đã tống đạt ngày 26-10-2026'], ph: 'CO_MAT', luc: '09:12 03-11-2026', online: true, go: 'hearingDetailDone' },
  { id: 'p3', loai: 'HG', ten: 'Phiên hòa giải', va: 'HG-2026-0018', vaTen: 'Hòa giải tranh chấp hợp đồng thuê nhà', vt: 'Người khởi kiện', tg: '09:00 · 10-11-2026', con: 'Còn 5 ngày', ht: 'Có mặt trực tiếp tại Tòa án', toa: KV2, giay: ['Thông báo hòa giải', '[Số thông báo] · Đã tống đạt ngày 30-10-2026'], ph: 'CHUA', han: '08-11-2026', go: 'hearingDetail' },
  { id: 'p4', loai: 'PT', ten: 'Phiên tòa sơ thẩm', va: 'DS-2026-0021', vaTen: 'Tranh chấp quyền sử dụng đất', vt: 'Người có quyền lợi, nghĩa vụ liên quan', tg: '08:00 · 04-11-2026', ht: 'Có mặt trực tiếp tại Tòa án', toa: KV2, giay: ['Giấy triệu tập', '[Số giấy triệu tập] · Đã tống đạt ngày 20-10-2026'], hoan: { qd: '[Số quyết định]', moi: null }, go: 'hearingDetailPost' }];
var LC_QUA = [
  { id: 'q1', loai: 'PT', ten: 'Phiên tòa sơ thẩm', va: 'DS-2026-0008', vaTen: 'Tranh chấp hợp đồng tín dụng', tg: '09:00 · 20-10-2026', toa: COURT1, kq: ['Đã tham dự', 'success'], nd: 'Bản án/QĐ số 45/2026/DS-ST ngày 20-10-2026. Chưa có hiệu lực pháp luật', nut: ['Xem quyết định', 'Xem biên bản'] },
  { id: 'q2', loai: 'HG', ten: 'Phiên hòa giải', va: 'HG-2026-0011', vaTen: 'Hòa giải tranh chấp lối đi chung', tg: '14:00 · 15-10-2026', toa: KV2, kq: ['Đã hoãn', 'warning'], nd: 'Hoãn do vắng mặt người bị kiện có lý do chính đáng.', nut: ['Xem thông báo hoãn'] },
  { id: 'q3', loai: 'PH', ten: 'Phiên họp kiểm tra việc giao nộp chứng cứ', va: 'DS-2026-0012', vaTen: 'Tranh chấp hợp đồng vay tài sản', tg: '08:30 · 08-10-2026', toa: COURT1, kq: ['Vắng mặt', 'danger'], nd: 'Đã hoàn thành phiên theo kế hoạch của Tòa án.', nut: ['Xem biên bản'] }];
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
  var nhan = r.hoan ? ['Đã hoãn', 'danger'] : r.tamDung ? ['Tạm dừng · vụ án tạm đình chỉ', 'neutral'] : ['Sắp diễn ra', 'info']; /* v583 (1.30): thêm báo vắng, hết hạn, tạm dừng */
  return h('li', { key: r.id, className: 'qd-c lc-c' }, h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem chi tiết ' + r.ten, 'data-pt-go': r.go }),
    h('div', { className: 'tly-h' }, LcTag(r.loai), r.moLai ? h('span', { className: 'lc-tags' }, h('span', { className: 'va4-tag va4-tag-cam' }, 'Mở lại sau tạm ngừng'), h(T.StatusBadge, { tone: nhan[1] }, nhan[0])) : h(T.StatusBadge, { tone: nhan[1] }, nhan[0])), /* v613 (1.30a): Mở lại sau tạm ngừng */
    h('b', { className: 'pt-c-t' }, r.ten), h('p', { className: 'pt-c-m' }, h('b', { className: 'tp-num' }, r.va), ' · ' + r.vaTen), h('p', { className: 'pt-c-m' }, 'Tư cách: ' + r.vt),
    r.hoan ? h('div', { className: 'lc-khan', role: 'alert' }, h(T.Icon, { name: 'alert' }), h('div', null, h('b', null, 'CẢNH BÁO KHẨN: Phiên tòa đã bị hoãn theo Quyết định của Tòa án'), h('p', null, 'Quyết định hoãn số ' + r.hoan.qd + '. Đương sự vui lòng không di chuyển đến trụ sở Tòa án.'), h('p', null, 'Lịch cũ: ' + r.tg + ' → Lịch mới: Tòa án sẽ thông báo sau'))) : null,
    h('ul', { className: 'lc-li' }, [['clock', r.tg + (r.con ? ' · ' + r.con : '')], ['mapPin', r.ht], /* v616 (1.30): Điểm cầu tham dự – chỉ thẻ tab Lịch phiên tòa, phiên trực tuyến (web phien-vu-an-section.tsx 802-837) */ r.va5 && r.online ? ['phone', h('span', null, 'Điểm cầu tham dự: ', r.dc ? h('b', null, r.dc) : r.ph === 'CO_MAT' ? 'Điểm cầu cá nhân (tự bảo đảm thiết bị qua Tokenized URL)' : 'Chưa đăng ký điểm cầu (mặc định Điểm cầu cá nhân)')] : null, ['building', r.toa], ['file', r.giay[0] + ' · ' + r.giay[1]]].filter(Boolean).map(function (x) { return h('li', { key: x[0] }, h(T.Icon, { name: x[0] }), x[1]); })),
    r.hoan || r.tamDung ? null : r.ph === 'VANG' ? h('p', { className: 'lc-ph lc-ph-vang' }, h(T.Icon, { name: 'checkCircle' }), 'Đã báo vắng mặt lúc ' + r.luc)
      : r.ph === 'HET' ? h('p', { className: 'lc-ph lc-ph-het' }, h(T.Icon, { name: 'clock' }), r.va5 ? h('span', null, h('b', null, 'Hết hạn xác nhận. '), 'Đã hết thời hạn xác nhận trực tuyến. Vui lòng liên hệ trực tiếp Thư ký phiên tòa nếu có thay đổi đột xuất.') : 'Đã hết thời hạn xác nhận trực tuyến. Vui lòng liên hệ trực tiếp Thư ký phiên tòa nếu có thay đổi đột xuất.')
      : r.ph === 'CO_MAT' ? h('p', { className: 'lc-ph lc-ph-ok' }, h(T.Icon, { name: 'checkCircle' }), (r.va5 ? 'Đã xác nhận tham dự lúc ' : 'Đã xác nhận có mặt lúc ') + r.luc)
      : h('p', { className: 'lc-ph' }, h(T.Icon, { name: 'clock' }), (r.va5 ? 'Chưa trả lời · hạn ' : 'Chưa phản hồi tham dự · hạn ') + r.han), /* v613 (1.30c): r.va5 = tab Lịch phiên tòa của Chi tiết vụ án – chữ theo web */
    r.ls ? h('div', { className: 'va4-ls lc-lsdl' }, h('b', null, 'Lịch sử thay đổi lịch (' + r.ls.length + ' lần)'), r.ls.map(function (x, i) { /* v613 (1.30a) */
      return h('div', { key: i, className: 'va4-ls-i' }, h('span', { className: 'va4-tag va4-tag-vang' }, x.nhan),
        h('p', null, 'Lịch cũ ', h('b', null, x.cu), ' → Lịch mới ', h('b', null, x.moi), ' · ghi nhận ' + x.ghi + ' · văn bản ', h('b', { className: 'tp-num' }, x.vb)), h('p', { className: 'va4-ls-ld' }, 'Lý do: ' + x.lyDo));
    })) : null,
    r.hoan ? h('div', { className: 'lc-c-a' }, Btn('Xem thông báo hoãn', 'secondary', { size: 'sm', icon: 'file', 'data-pt-go': 'snack:Đang mở quyết định hoãn phiên tòa (PDF).' }), r.va5 ? Btn('Chi tiết phiên', 'secondary', { size: 'sm', 'data-pt-go': r.go }) : null)
      : h('div', { className: 'lc-c-a' }, r.ph === 'CHUA' ? Btn('Phản hồi tham dự', 'primary', { size: 'sm', 'data-pt-go': 'attendReply' }) : null, r.online && r.ph !== 'VANG' && !r.tamDung ? Btn(r.va5 ? 'Vào phòng chờ trực tuyến' : 'Vào phòng chờ', r.ph === 'CHUA' ? 'secondary' : 'primary', { size: 'sm', icon: 'arrowRight', 'data-pt-go': 'waitingRoom' }) : null,
        Btn(r.va5 ? 'Xem văn bản gốc' : 'Xem giấy triệu tập', 'secondary', { size: 'sm', icon: 'file', 'data-pt-go': 'snack:Đang mở ' + r.giay[0].toLowerCase() + ' (PDF).' }),
        r.va5 ? Btn('Chi tiết phiên', 'secondary', { size: 'sm', 'data-pt-go': r.go }) : null)); /* v613 (1.30b, c) */
}
function LcDu(p) {
  var an = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), trung = React.useState(!!p.trung);
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    !an[0] ? h('div', { className: 'lc-khan lc-khan-top', role: 'alert' }, h(T.Icon, { name: 'alert' }), h('div', null, h('b', null, 'Phiên tòa hôm nay đã bị hoãn'), h('p', null, 'Phiên tòa sơ thẩm DS-2026-0021 lúc 08:00 · 04-11-2026 · Đã hoãn.'),
      h('button', { type: 'button', className: 'ph-link', onClick: function () { an[1](true); } }, 'Đã hiểu, đóng cảnh báo'))) : null,
    h(LcLoc, { dem: LC_DU.length + ' buổi phải dự' }), h('ul', { className: 'qd-list' }, LC_DU.map(LcDuCard)),
    trung[0] && host ? h(LvSheet, { host: host, title: 'Cảnh báo trùng lịch', onClose: function () { trung[1](false); }, foot: Btn('Đóng', 'secondary', { block: true, onClick: function () { trung[1](false); } }) },
      h('div', { className: 'lc-trung' }, P('Bạn có 2 buổi phải dự trùng giờ hoặc cách nhau dưới 120 phút khác tòa án:', 'ph-muted'),
        h('ul', { className: 'lc-li' }, h('li', null, h(T.Icon, { name: 'clock' }), '14:00 · 12-11-2026 – Phiên đối thoại HC-2026-0004 · ' + COURT1), h('li', null, h(T.Icon, { name: 'clock' }), '15:30 · 12-11-2026 – Phiên họp DS-2026-0021 · ' + KV2)),
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
var LC_LS = [['Ấn định phiên', '28-10-2026', 'Quyết định đưa vụ án ra xét xử số [Số quyết định] – mở phiên 14:00 06-11-2026'], ['Tống đạt giấy triệu tập', '28-10-2026', 'Giấy triệu tập số [Số giấy triệu tập]']];
function LcDetail(p) {
  var anchor = React.useRef(null), host = useHost(anchor), sh = React.useState(p.sheet || null), hoan = !!p.hoan, done = !!p.done, online = !!p.online;
  var tieu = hoan ? 'Phiên tòa sơ thẩm' : 'Phiên tòa sơ thẩm', va = hoan ? 'DS-2026-0021 · Tranh chấp quyền sử dụng đất' : 'DS-2026-0012 · Tranh chấp hợp đồng vay tài sản';
  return SubS('Chi tiết phiên tòa', h(F, null, h('span', { ref: anchor, hidden: true }),
    hoan ? h('div', { className: 'lc-khan', role: 'alert' }, h(T.Icon, { name: 'alert' }), h('div', null, h('b', null, 'KHẨN CẤP · Hoãn phiên trong vòng 24 giờ'), h('p', null, 'Thay đổi lịch do Tòa án quyết định · Hoãn theo Quyết định số [Số quyết định]. Đương sự vui lòng không di chuyển đến trụ sở Tòa án.'))) : null,
    h('section', { className: 'lc-hd' }, h('div', { className: 'tly-h' }, LcTag('PT'), h(T.StatusBadge, { tone: hoan ? 'danger' : 'info' }, hoan ? 'Đã hoãn' : 'Sắp diễn ra')),
      h('b', { className: 'lc-hd-t' }, tieu), h('p', { className: 'pt-c-m' }, va), h('p', { className: 'lc-hd-m' }, hoan ? 'Phiên tòa đã có quyết định hoãn' : 'Ấn định phiên · Phiên mở lúc ' + (online ? '08:30 05-11-2026' : '14:00 06-11-2026')),
      hoan ? null : h('p', { className: 'lc-dem-ng tp-num' }, h(T.Icon, { name: 'clock' }), online ? 'Còn 20 giờ 15 phút' : 'Còn 2 ngày 3 giờ')),
    FCard('Thông tin phiên', RvKV([['Vụ án', va], ['Tư cách tham gia', hoan ? 'Người có quyền lợi, nghĩa vụ liên quan' : 'Nguyên đơn'], [hoan ? 'Thời gian (lịch đã hoãn)' : 'Thời gian', hoan ? '08:00 · 04-11-2026' : online ? '08:30 · 05-11-2026' : '14:00 · 06-11-2026'],
      ['Địa điểm / hình thức', online ? 'Trực tuyến · Phòng họp trực tuyến số 2' : 'Trực tiếp · Phòng xử án số 1'], ['Tòa án', hoan ? KV2 : COURT1]]), true),
    hoan ? FCard('Quyết định hoãn phiên tòa', h(F, null, RvKV([['Số quyết định', '[Số quyết định]'], ['Ngày ban hành', '03-11-2026'], ['Lý do hoãn', 'Thẩm phán được phân công giải quyết vắng mặt vì lý do bất khả kháng']]),
      Btn('Xem quyết định hoãn', 'secondary', { size: 'sm', icon: 'file', 'data-pt-go': 'mailDetail', onClickCapture: vaMoVb('Quyết định hoãn phiên tòa', '[Số quyết định]', '03-11-2026') }), NoteBox(h('p', null, 'Chưa ấn định lịch mới. Bạn sẽ nhận thông báo khi Tòa án có lịch mới.'))), true) : null,
    FCard('Văn bản ấn định', h('ul', { className: 'lc-vb' }, [['Quyết định đưa vụ án ra xét xử', 'Số [Số quyết định] · Ban hành ngày 27-10-2026'], ['Giấy triệu tập', 'Số [Số giấy triệu tập] · Đã tống đạt ngày 28-10-2026']].map(function (x) {
      return h('li', { key: x[0] }, h('div', null, h('b', null, x[0]), h('small', null, x[1])), h(T.Button, { variant: 'secondary', size: 'sm', icon: 'eye', className: 'ph-lib-view', 'aria-label': 'Xem ' + x[0], 'data-pt-go': 'mailDetail', onClickCapture: vaMoVb(x[0] === 'Giấy triệu tập' ? 14 : x[0], '[Số quyết định]', '27-10-2026') }));
    })), true),
    online && !hoan ? FCard('Tham dự trực tuyến', h(F, null, RvKV([['Điểm cầu của bạn', 'Điểm cầu cá nhân (tự bảo đảm thiết bị)'], ['Mã phòng', h('span', { className: 'tp-num' }, 'TA1-7Q4K-29')], ['Mật khẩu', h('span', { className: 'tp-num' }, '••••••')], ['Trạng thái', 'Mở trước giờ xử 30 phút']]),
      P('Mã phòng họp bảo mật · Cấp tự động từ Hệ thống Quản lý án', 'ph-muted lc-sm'),
      h('div', { className: 'ph-2btn' }, Btn('Vào phòng chờ', 'primary', { icon: 'arrowRight', 'data-pt-go': 'waitingRoom' }), Btn('Nội quy', 'secondary', { onClick: function () { sh[1]('nq'); } }))), true) : null,
    FCard('Phản hồi tham dự của bạn', hoan ? P('Buổi này không còn ở trạng thái cần phản hồi (đã hoãn/huỷ/đã diễn ra).', 'ph-muted')
      : done ? h(F, null, h('p', { className: 'lc-ph lc-ph-ok' }, h(T.Icon, { name: 'checkCircle' }), 'Đã xác nhận có mặt lúc 09:12 03-11-2026'), RvKV([['Điểm cầu', 'Điểm cầu cá nhân (tự bảo đảm thiết bị)']]), Btn('Đổi sang báo vắng', 'secondary', { size: 'sm', 'data-pt-go': 'attendAbsent' }))
      : h(F, null, h('p', { className: 'lc-ph' }, h(T.Icon, { name: 'clock' }), 'Chưa phản hồi · hạn xác nhận trực tuyến 05-11-2026'), P('Phiên tòa xét xử thuộc diện phải gửi phản hồi xác nhận tham dự trước (Điều 227, 228 BLTTDS).', 'ph-muted lc-sm'),
        h('div', { className: 'ph-2btn' }, Btn('Xác nhận có mặt', 'primary', { 'data-pt-go': 'attendReply' }), Btn('Báo vắng mặt', 'secondary', { 'data-pt-go': 'attendAbsent' }))), true),
    h('button', { type: 'button', className: 'lc-ls', onClick: function () { sh[1]('ls'); } }, h(T.Icon, { name: 'clock' }), h('span', null, h('b', null, 'Lịch sử tố tụng'), h('small', null, hoan ? 'Các lần ấn định, hoãn và biến động lịch của phiên này (3 mốc), theo thứ tự từ cũ đến mới.' : 'Mốc ấn định và diễn biến xét xử của phiên này, ghi nhận từ Tòa án.')), h(T.Icon, { name: 'chevronRight' })),
    sh[0] === 'ls' && host ? h(LvSheet, { host: host, title: 'Lịch sử tố tụng', onClose: function () { sh[1](null); } }, G1Std(LC_LS.concat(hoan ? [['Hoãn', '03-11-2026', 'Lịch cũ: 08:00 04-11-2026 → Lịch mới: chưa ấn định · Lý do: Thẩm phán vắng mặt vì lý do bất khả kháng · Quyết định số [Số quyết định]']] : []).slice().reverse().map(function (x) {
      return { t: x[0], ngay: x[1], d: x[2], state: 'done' };
    }))) : null, /* v441 */
    sh[0] === 'nq' && host ? h(LvSheet, { host: host, title: 'Nội quy phiên tòa, phiên họp trực tuyến', onClose: function () { sh[1](null); } }, h('div', { className: 'lc-nq' },
      NvCall({ tone: 'info', icon: 'info', title: 'Căn cứ' }, 'Nghị quyết số 33/2021/QH15 của Quốc hội và Thông tư liên tịch số 05/2021/TTLT-TANDTC-VKSNDTC-BCA-BQP-BTP.'),
      h('ol', null, [['Thời gian tham gia', 'Có mặt tại phòng xử án trực tuyến trước giờ mở phiên ít nhất 15–30 phút để Thư ký kiểm tra căn cước, phổ biến nội quy và kiểm tra kỹ thuật.'], ['Trang phục và tác phong', 'Mặc trang phục lịch sự, nghiêm túc; nơi đủ ánh sáng, phông nền trang nghiêm, yên tĩnh, không có người ngoài tham gia.'],
        ['Thiết bị và đường truyền', 'Luôn bật camera trong suốt phiên; chỉ bật micrô khi được Chủ tọa cho phép phát biểu.'], ['Giấy tờ tùy thân', 'Chuẩn bị sẵn Thẻ CCCD gắn chip hoặc tài khoản định danh điện tử VNeID để xuất trình khi được yêu cầu.'], ['Nghiêm cấm', 'Có mặt trước giờ mở phiên tòa 15 phút; tắt chuông điện thoại trong phòng xử án']].map(function (x) { return h('li', { key: x[0] }, h('b', null, x[0] + ': '), x[1]); })))) : null), null);
}
/* Phản hồi tham dự phiên (ModalPhanHoi) */
var LC_LYDO = ['Ốm đau điều trị tại viện', 'Công tác nước ngoài/đột xuất', 'Trở ngại khách quan, thiên tai', 'Lý do cá nhân khác'];
/* đối chiếu 4E.2 / 4E.3 (21/11/2026): Phản hồi tham dự phiên theo web ModalPhanHoi – 2 lựa chọn dạng nút chọn; ô "Điểm cầu tham dự" chỉ khi phiên trực tuyến và chọn Xác nhận có mặt (bảng chọn từ đáy, danh mục DIEM_CAU_THAM_DU);
   Báo vắng: cảnh báo hậu quả, lý do (— Chọn lý do —), chi tiết lý do 50–1000 ký tự (không chặn, không bộ đếm), tài liệu chứng minh tối đa 3 tệp (một nguồn chọn tệp, có nút Xem),
   ô Điều 227, khối xin hoãn; hết hạn: banner + khóa nút gửi; lỗi chữ đỏ dưới từng ô (hiện cùng lúc khi bấm gửi); thanh đáy Hủy + Gửi ("Đang gửi…"); thành công không thanh thông báo */
var LC_DC = [{ id: 'DIEM_CAU_CA_NHAN', name: 'Điểm cầu cá nhân tự bảo đảm thiết bị' }, { id: 'DIEM_CAU_TAND_HUYEN', name: 'Điểm cầu TAND cấp huyện' }, { id: 'DIEM_CAU_TRU_SO_CO_QUAN', name: 'Điểm cầu trụ sở cơ quan' }];
var LC_TEP = ['giay-ra-vien.pdf', 'don-thuoc.jpg', 'xac-nhan-benh-vien.png'];
var LC_CT = 'Tôi đang điều trị nội trú tại Bệnh viện Bạch Mai từ ngày 03-11-2026, dự kiến ra viện sau ngày 10-11-2026 nên không thể có mặt tại phiên tòa.';
function LcReply(p) {
  p = p || {};
  var tu = window.__lcTu, on = p.online != null ? p.online : !!(tu === 'va' && window.__lcOn), het = !!p.expired;
  var v = React.useState(p.vang ? 'vang' : 'co'), dc = React.useState(LC_DC[0].id);
  var ly = React.useState(p.err || p.short || p.long ? '' : LC_LYDO[0]);
  var ct = React.useState(p.err ? '' : p.short ? 'Tôi bị ốm, không thể đến phiên tòa.' : p.long ? new Array(52).join('Tôi đang điều trị nội trú tại bệnh viện. ').slice(0, 1012) : LC_CT);
  var fs = React.useState(p.err ? [] : p.full ? LC_TEP.slice() : [LC_TEP[0]]), dang = React.useState(!!p.uploading), fe = React.useState(p.fileErr ? 'Định dạng tệp không hợp lệ. Chỉ chấp nhận tệp PDF, JPG, PNG.' : p.fileBig ? 'Dung lượng tệp vượt quá 10MB. Vui lòng chọn tệp nhỏ hơn hoặc bằng 10MB.' /* v583 (1.33) */ : null);
  var err = React.useState(!!(p.err || p.short || p.long)), gui = React.useState(false), d227 = React.useState(false);
  var vang = v[0] === 'vang', n = ct[0].trim().length;
  var eLy = !ly[0] ? 'Vui lòng chọn lý do vắng mặt.' : null;
  var eCt = !n ? 'Vui lòng nhập chi tiết lý do vắng mặt.' : n < 50 ? 'Chi tiết lý do vắng mặt cần tối thiểu 50 ký tự (hiện có ' + n + ' ký tự).' : n > 1000 ? 'Chi tiết lý do vắng mặt không được vượt quá 1000 ký tự.' : null;
  var eTep = !fs[0].length ? 'Vui lòng đính kèm ít nhất 1 tài liệu chứng minh.' : null;
  var dich = vang || tu === 'va' ? 'back' : 'replace:hearingDetailDone'; /* v539: gửi xong không thanh thông báo; Chi tiết vụ án giữ bản gốc */
  function them() { if (fs[0].length >= 3) { fe[1]('Chỉ được đính kèm tối đa 3 tệp.'); return; } fe[1](null); dang[1](true); setTimeout(function () { dang[1](false); fs[1](function (a) { return a.concat([LC_TEP.filter(function (x) { return a.indexOf(x) < 0; })[0]]); }); }, 700); }
  function guiDi() { if (vang && (eLy || eCt || eTep)) { err[1](true); return; } gui[1](true); setTimeout(function () { window.__ptGo(dich); }, 800); }
  return SubS('Phản hồi tham dự phiên', h(F, null,
    h('section', { className: 'lc-hd va4-full' }, LcTag('PT'), h('b', { className: 'lc-hd-t' }, 'Phiên tòa sơ thẩm — DS-2026-0012'), h('p', { className: 'pt-c-m tp-num' }, on ? '05-11-2026 08:30' : '06-11-2026 14:00'),
      h('p', { className: 'pt-c-m' }, on ? COURT1 + ' – Phòng họp trực tuyến số 2' : COURT1 + ' – Phòng xử án số 1'),
      /* người dùng 22/11: giữ nút chuyển 2 đoạn, gộp chung khối thông tin phiên */
      h('div', { className: 'va4-seg-o' }, h(T.SegmentedControl, { label: 'Phản hồi', value: v[0], onChange: v[1], disabled: het, className: 'va4-seg' + (vang ? ' va4-seg-vang' : ''), options: [{ value: 'co', label: 'Xác nhận có mặt' }, { value: 'vang', label: 'Báo vắng mặt' }] }))),
    het ? h('div', { className: 'va4-loi va4-full', role: 'alert' }, h('b', null, 'Đã hết thời hạn xác nhận trực tuyến.'), ' Vui lòng liên hệ trực tiếp Thư ký phiên tòa nếu có thay đổi đột xuất.') : null,
    !vang && on ? Blk('Điểm cầu tham dự', h(ChonThe, { label: 'Điểm cầu tham dự', v: dc[0], onPick: dc[1], items: LC_DC.map(function (x) { return { id: x.id, t: x.name }; }) }), { cls: 'bx-blk' }) : null, /* người dùng 22/11 (4E.2): điểm cầu hiện luôn trên màn, không mở bảng từ đáy */
    vang ? h(F, null,
      Blk(null, h(F, null,
        h('div', { className: 'va4-cb', role: 'note' }, h(T.Icon, { name: 'alert' }), h('p', null, 'Nếu vắng mặt không có lý do chính đáng hoặc không có đơn xin xét xử vắng mặt, Tòa án có quyền đình chỉ giải quyết hoặc tiến hành xét xử vắng mặt theo quy định của pháp luật.')),
        h('div', { className: err[0] && eLy ? 'va4-sel-loi' : undefined }, h(SelSheet, { label: 'Lý do vắng mặt', req: true, ph: '— Chọn lý do —', v: ly[0], opts: LC_LYDO, onChange: ly[1] }), err[0] && eLy ? h('p', { className: 'q2-err va4-loi12' }, eLy) : null), /* 22/11: ô chọn lỗi viền đỏ như ô nhập, câu lỗi cùng cỡ 12px */
        Tf('Chi tiết lý do', { required: true, multiline: true, rows: 4, value: ct[0], onChange: function (e) { ct[1](e.target.value); }, placeholder: 'Trình bày hoàn cảnh, thời gian và lý do không thể tham dự…', error: err[0] && eCt ? eCt : undefined }),
        null), { cls: 'bx-blk' }),
      /* người dùng 22/11 (4E.3): "đính kèm tài liệu cần theo design chung" – khối Tài liệu chứng minh theo khối tài liệu chung (TaiLieuCard / FileUploadC): dòng mô tả + số tệp, dòng tệp có ô tích, nút Xem / Xóa;
         ô nét đứt "Tải lên tài liệu" (không có Kho – như web); đang tải: vòng quay trong ô; đủ 3 tệp ẩn ô tải; lỗi chữ đỏ dưới ô */
      /* người dùng 22/11 (4E.3): khối tải tệp KHÔNG có Kho theo quy tắc v391 (như Cung cấp tài liệu, chứng cứ – FileUploadD): mô tả, dòng số tệp, thẻ tệp có nhãn loại tệp (+ Xem / Xóa),
         hàng "Tải lên tài liệu" có nút tròn "+"; đang tải: vòng quay thay nút +; đủ 3 tệp ẩn hàng tải lên */
      FCard('Tài liệu chứng minh', h('div', { className: 'tp-upload-list fub' }, P('Tối đa 3 tệp PDF, JPG, PNG · tối đa 10MB/tệp. Bắt buộc ít nhất 1 tài liệu.', 'ph-muted fub-h'),
        fs[0].length ? h('div', { className: 'tp-upload-head' }, h('span'), h('span', { className: 'tp-num' }, fs[0].length + ' / 3 tệp')) : null,
        fs[0].length ? h('ul', { className: 'tp-files' }, fs[0].map(function (f) {
          return h('li', { key: f, className: 'tp-file va4-tf' }, h('span', { className: 'tp-file-type', 'aria-hidden': 'true' }, (f.split('.').pop() || '').toUpperCase()),
            h('span', { className: 'tp-file-text' }, h('span', { className: 'tp-file-name' }, f)),
            h(T.Button, { variant: 'secondary', size: 'sm', icon: 'eye', className: 'ph-lib-view', 'aria-label': 'Xem ' + f, 'data-pt-go': 'attachment', onClickCapture: function () { window.__ibFile = f; } }),
            h(T.Button, { variant: 'secondary', size: 'sm', icon: 'trash', className: 'ph-lib-view', 'aria-label': 'Xóa ' + f, onClick: function () { fs[1](fs[0].filter(function (x) { return x !== f; })); fe[1](null); } }));
        })) : null,
        fs[0].length < 3 ? h('div', { className: 'tp-upload-row' }, h('span', { className: 'tp-upload-ico' }, h(T.Icon, { name: 'upload' })), h('span', { className: 'tp-upload-row-text' }, h('span', null, dang[0] ? 'Đang tải lên…' : 'Tải lên tài liệu')),
          dang[0] ? h('span', { className: 'tp-upload-add va4-ua-dang', 'aria-hidden': 'true' }, h('span', { className: 'tp-spinner' }))
            : h('button', { type: 'button', className: 'tp-upload-add', 'aria-label': 'Tải lên tài liệu', onClick: them }, h(T.Icon, { name: 'plus' }))) : null,
        fe[0] ? h('p', { className: 'q2-err va4-loi12' }, fe[0]) : err[0] && eTep ? h('p', { className: 'q2-err va4-loi12' }, eTep) : null), true),
      h('div', { className: 'ph-commit' }, h(T.Checkbox, { label: 'Đề nghị Tòa án xét xử/hòa giải vắng mặt theo Điều 227 Bộ luật Tố tụng Dân sự.', checked: d227[0], onChange: function (e) { d227[1](e.target.checked); } })),
      h('div', { className: 'va4-hoan va4-full' }, h('b', null, 'Bạn muốn xin hoãn thay vì xét xử vắng mặt?'), h('p', null, 'Nếu bạn không muốn xét xử vắng mặt mà muốn hoãn phiên tòa, hãy nộp Đơn yêu cầu hoãn phiên tòa.'),
        h(T.Button, { size: 'sm', variant: 'secondary', icon: 'pen', 'data-pt-go': 'caseDetailHoan' }, 'Làm đơn xin hoãn phiên này'))) : null,
    het ? VaLy('Đã hết thời hạn xác nhận trực tuyến.') : null),
    Bar(Btn('Hủy', 'tonal', { 'data-pt-go': 'back' }), /* 22/11: chân màn theo thanh nút chuẩn (có lề), Hủy nền xám như Quay lại */
      h(T.Button, { disabled: het || gui[0] || dang[0], className: 'va4-gui', onClick: het || gui[0] || dang[0] ? undefined : guiDi }, gui[0] ? 'Đang gửi…' : vang ? 'Gửi báo vắng mặt' : 'Gửi xác nhận')));
}
/* Phòng chờ trực tuyến (modal-phong-cho) */
/* đối chiếu 4E.4 (21/11/2026): Phòng chờ theo web ModalPhongCho – nhãn Chưa đến giờ / Phòng chờ đã mở / Đang diễn ra + số giấy triệu tập; giờ mở phòng; Mã phòng, Mật khẩu hiện đủ;
   lưu ý ghi âm; bỏ "Kiểm tra thiết bị", dòng Điểm cầu; nút "Vào phòng xét xử trực tuyến" khóa theo giờ (chữ phụ thay tooltip); lỗi tải nội dung; thiếu đường dẫn hợp lệ: khung lỗi trong màn */
function LcRoom(p) {
  p = p || {};
  var tt = p.tt || (p.loi ? 'err' : 'open'), nl = React.useState(!!p.bam);
  var nhan = tt === 'early' ? ['Chưa đến giờ', 'info'] : tt === 'live' ? ['Đang diễn ra', 'success'] : ['Phòng chờ đã mở', 'success'];
  var tieu = tt === 'early' ? 'Phòng chờ mở trước giờ khai mạc 30 phút' : tt === 'live' ? 'Phiên đang diễn ra' : 'Phòng chờ đã mở';
  var vao = function () { if (tt === 'nolink' || tt === 'err') nl[1](true); else window.__ptGo('phongHopExt'); };
  return SubS('Phòng chờ trực tuyến', h(F, null,
    h('section', { className: 'lc-hd va4-full' }, h('div', { className: 'tly-h' }, h(T.StatusBadge, { tone: nhan[1] }, nhan[0]), h('span', { className: 'va4-room-so tp-num' }, '[Số giấy triệu tập]')),
      h('b', { className: 'lc-hd-t' }, 'Phiên tòa sơ thẩm'), h('p', { className: 'pt-c-m tp-num' }, '05-11-2026 08:30 · Vụ án DS-2026-0012')),
    /* người dùng 22/11: khối 100% như Soạn đơn – thông tin phòng, lưu ý ghi âm, lỗi trong cùng một khối */
    Blk(null, h(F, null, tt === 'err' ? h('p', { className: 'va4-loi', role: 'alert' }, 'Không tải được nội dung văn bản của Tòa án (đường dẫn phòng họp). Vui lòng thử lại sau.') : h('div', { className: 'va4-room' }, h('span', { className: 'va4-room-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: 'calendar' })), h('div', null, h('b', null, tieu),
        tt === 'early' ? h('p', { className: 'ph-muted' }, 'Phòng chờ mở lúc 08:00 ngày 05-11-2026.') : null,
        RvKV([['Mã phòng', h('span', { className: 'tp-num' }, 'TA1-7Q4K-29')], ['Mật khẩu', h('span', { className: 'tp-num' }, '583 214')]]))),
      h('div', { className: 'va4-cb', role: 'note' }, h(T.Icon, { name: 'info' }), h('p', null, 'Phiên tòa trực tuyến được ghi âm, ghi hình. Bạn phải ngồi tại điểm cầu đã đăng ký, giữ nghiêm túc như tại phòng xử án; tự ý rời điểm cầu bị coi là vắng mặt. Nếu mất kết nối quá 10 phút, Hội đồng xét xử quyết định tiếp tục hay tạm ngừng phiên.')),
      nl[0] ? h('p', { className: 'va4-loi', role: 'alert' }, 'Văn bản chưa có đường dẫn phòng họp trực tuyến hợp lệ.') : null), { cls: 'bx-blk va4-room-b' })),
    h('div', { className: 'va4-room-f' }, tt === 'early' ? h('p', { className: 'va4-han' }, 'Mở vào phòng lúc 08:00 ngày 05-11-2026') : null,
      Bar(h(T.Button, { block: true, disabled: tt === 'early', className: 'va4-vao' + (tt === 'early' ? ' va4-khoa' : ''), onClick: tt === 'early' ? undefined : vao }, 'Vào phòng xét xử trực tuyến'))));
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
  A017: ['Nộp tiền tạm ứng án phí', 'dvcqgExt'],
  A018: ['Nộp tiền tạm ứng án phí phúc thẩm và nộp biên lai cho Tòa án', 'dvcqgExt'],
  A019: ['Sửa đổi, bổ sung đơn đề nghị giám đốc thẩm / tái thẩm', 'gsgdt1'],
  A020: ['Trình bày lý do và xuất trình chứng cứ về việc kháng cáo quá hạn', 'kqh1'],
  A021: ['Sửa đổi, bổ sung đơn khởi kiện', 'sd1'],
  A022: ['Nộp tiền tạm ứng chi phí tố tụng', 'dvcqgExt'],
  A023: ['Đề nghị thay đổi đối thoại viên', 'hgChange'],
  A025: ['Bổ sung tài liệu, chứng cứ', 'evidence1'],
  A026: ['Khiếu nại việc trả lại đơn yêu cầu', 'kqd1Tong'],
  A027: ['Đề nghị xem xét kết quả công nhận hòa giải', 'hgReview'],
  A028: ['Sửa đổi, bổ sung đơn yêu cầu', 'sd1'],
  A029: ['Nộp văn bản ghi ý kiến đối với yêu cầu của người yêu cầu', HD_DEV],
  A030: ['Nộp văn bản ghi ý kiến đối với yêu cầu khởi kiện', HD_DEV],
  A031: ['Nộp văn bản ghi ý kiến đối với yêu cầu của nguyên đơn (kèm yêu cầu phản tố / yêu cầu độc lập nếu có)', HD_DEV],
  A033: ['Kháng cáo quyết định đình chỉ giải quyết việc dân sự', 'kc1'],
  A034: ['Nộp lệ phí giải quyết việc dân sự', 'dvcqgExt'],
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
    var lock = p.khoa && x[1] === 'dvcqgExt';
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
function n7Tep(lead, hint, files, kho) { return FCard('Tài liệu kèm theo', h(F, null, lead ? Lead(lead) : null, h(T.FileUpload, { kho: kho, hint: hint || 'PDF, JPG, PNG, DOCX · tối đa 10MB/tệp. Không bắt buộc đính kèm tài liệu.', uploadLabel: 'Tải lên tệp mới', libraryLabel: 'Chọn từ Kho dữ liệu cá nhân', files: files })), true); }
function n7Len(v, a, b) { var d = v.trim().length; return !d ? null : d < a ? 'Cần ít nhất ' + a + ' ký tự.' : d > b ? 'Tối đa ' + b + ' ký tự.' : null; }
function n7Tf(label, st, o) { o = o || {}; return Tf(label, Object.assign({ multiline: true, rows: o.rows || 4, value: st[0], onChange: function (e) { st[1](e.target.value); }, error: o.min ? n7Len(st[0], o.min, o.max || 5000) || undefined : undefined, showCount: !!o.max }, o)); }
function n7Pham(st, p0) {
  var phan = React.useState(p0 || '');
  return h(F, null, h(ChonThe, { label: 'Phạm vi kháng cáo', v: st[0], onPick: st[1], items: [{ id: 'all', t: 'Kháng cáo toàn bộ bản án', d: 'Bạn không đồng ý với toàn bộ nội dung bản án.' }, { id: 'part', t: 'Kháng cáo một phần bản án', d: 'Ghi rõ phần bản án bạn kháng cáo.' }] }),
    st[0] === 'part' ? n7Tf('Phần bản án bạn kháng cáo', phan, { required: true, rows: 3, max: 2000, help: 'Ghi theo phần quyết định của bản án, nếu có số tiền thì ghi rõ số tiền.' }) : null);
}

/* ---- 1. Nộp đơn kháng cáo (ACTION_004/006/007/014/033) ---- */
var KC_STEPS = ['Văn bản bị kháng cáo', 'Phạm vi kháng cáo', 'Lý do và yêu cầu', 'Tài liệu kèm theo', 'Xem lại và ký gửi'];
function KcWz(n, body) { return Wz({ title: 'Nộp đơn kháng cáo', steps: KC_STEPS, n: n, go: 'kc' + (n + 1), body: body }); }
function Kc1() {
  return KcWz(1, h(F, null, h(NvCall, { tone: 'warning', icon: 'clock', title: 'Thời hạn kháng cáo đến hết ngày 05-11-2026 — còn 1 ngày.' }, '15 ngày kể từ ngày tuyên án nếu bạn có mặt tại phiên tòa; nếu vắng mặt, tính từ ngày bạn nhận được bản án hoặc ngày bản án được niêm yết.'),
    FCard('Bản án bị kháng cáo', h(F, null, Lead('Thông tin lấy tự động từ hồ sơ vụ án, bạn chỉ cần xác nhận đúng văn bản.'),
      RvKV([['Loại văn bản', 'Bản án sơ thẩm'], ['Số văn bản', h('span', { className: 'tp-num' }, '25/2026/DS-ST')], ['Ngày tuyên án', '21-10-2026'], ['Ngày tống đạt', '22-10-2026'], ['Tòa án xét xử', COURT1], ['Vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0043')], ['Tư cách của bạn', 'Nguyên đơn'], ['Tòa án phúc thẩm dự kiến', 'Tòa án nhân dân thành phố Hà Nội']])), true),
    HopGhi('Kháng cáo không tạo vụ án mới', 'Đơn kháng cáo gắn vào vụ án DS-2026-0043, mã vụ án giữ nguyên qua các cấp xét xử.')));
}
function Kc2() { var ph = React.useState('part'); return KcWz(2, FCard('Phạm vi kháng cáo', h(F, null, Lead('Mặc định là kháng cáo toàn bộ bản án.'), n7Pham(ph, 'Phần quyết định buộc nguyên đơn chịu 12.000.000 đồng án phí.')), true)); }
function Kc3() {
  var ld = React.useState('Bản án chưa xem xét chứng cứ chuyển khoản ngày 05-01-2026 mà tôi đã giao nộp.'), yc = React.useState('Đề nghị Tòa án cấp phúc thẩm sửa bản án sơ thẩm, chấp nhận toàn bộ yêu cầu khởi kiện.');
  return KcWz(3, h(F, null, FCard('Lý do của việc kháng cáo', n7Tf('Lý do của việc kháng cáo', ld, { required: true, min: 30, max: 5000, placeholder: 'Trình bày lý do của việc kháng cáo...', help: 'Nêu cụ thể vì sao bạn cho rằng bản án chưa đúng.' }), true),
    FCard('Yêu cầu Tòa án giải quyết', n7Tf('Yêu cầu Tòa án giải quyết', yc, { required: true, max: 2000, help: 'Nêu rõ những yêu cầu bạn đề nghị Tòa án giải quyết.' }), true)));
}
function Kc4() { return KcWz(4, n7Tep('Tài liệu, chứng cứ bổ sung chứng minh cho kháng cáo (nếu có).')); }
function Kc5() {
  return h(KyGuiDon, { title: 'Nộp đơn kháng cáo', steps: KC_STEPS, ok: 'kcOk', tep: ['Đơn kháng cáo.pdf'], tepMeta: 'Bản in đơn kháng cáo', vaiTro: 'Nguyên đơn', lead: 'Kiểm tra lại thông tin, ký số rồi gửi đơn kháng cáo đến Tòa án.',
    top: FCard('Đơn kháng cáo', RvKV([['Văn bản bị kháng cáo', 'Bản án số 25/2026/DS-ST'], ['Vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0043')], ['Phạm vi', 'Kháng cáo một phần bản án'], ['Lý do', 'Bản án chưa xem xét chứng cứ chuyển khoản ngày 05-01-2026 mà tôi đã giao nộp.'], ['Tài liệu kèm theo', 'Không có']]), true),
    camDoan: N7_CAMDOAN });
}
function KcOk() {
  return h(OkScr, { title: 'Đã gửi đơn kháng cáo thành công', text: 'Đơn kháng cáo đã được gửi đến Tòa án. Kết quả xem xét sẽ được thông báo qua Hộp thư tống đạt.', info: [['Mã đơn', 'Chờ cấp mã'], ['Thời điểm gửi', '04-11-2026 09:30'], ['Trạng thái', 'Đã gửi đơn']],
    btns: h(F, null, Btn('Xem tại Quản lý đơn', 'primary', { 'data-pt-go': 'reset:records,appK_khangcao' }), Btn('Về Trang chủ', 'secondary', { 'data-pt-go': 'tab:home' })) });
}

/* ---- 2. Làm lại / sửa đổi, bổ sung đơn kháng cáo (ACTION_016) ---- */
var KCS_STEPS = ['Yêu cầu của Tòa án và đơn cũ', 'Sửa nội dung đơn kháng cáo', 'Tài liệu kèm theo', 'Xem lại và ký gửi'];
function KcsWz(n, body) { return Wz({ title: 'Sửa đơn theo yêu cầu', steps: KCS_STEPS, n: n, go: 'kcs' + (n + 1), body: body }); }
function Kcs1() {
  return KcsWz(1, h(F, null, h(NvCall, { tone: 'warning', icon: 'clock', title: 'Hạn sửa đổi, bổ sung: 08-11-2026 — còn 4 ngày.' }, 'Quá thời hạn nêu trên đơn kháng cáo sẽ bị trả lại theo quy định và bản án sơ thẩm sẽ có hiệu lực pháp luật.'),
    FCard('Yêu cầu của Tòa án', RvKV([['Văn bản', 'Thông báo yêu cầu sửa đổi, bổ sung đơn kháng cáo số [Số thông báo]'], ['Ngày tống đạt', '29-10-2026'], ['Hạn sửa đổi, bổ sung', '08-11-2026'], ['Tòa án', COURT1]]), true),
    FCard('Nội dung Tòa án yêu cầu', h('ul', { className: 'n7-ul' }, h('li', null, h('b', null, 'Bổ sung tài liệu'), h('small', null, 'Nộp bổ sung các tài liệu, chứng cứ kèm theo chứng minh cho yêu cầu')), h('li', null, h('b', null, 'Sửa thông tin'), h('small', null, 'Hoàn thiện thông tin liên hệ và chữ ký người làm đơn theo quy định'))), true),
    FCard('Đơn kháng cáo cũ', RvKV([['Mã đơn', h('span', { className: 'tp-num' }, 'KC-2026-0014')], ['Mã tiếp nhận', h('span', { className: 'tp-num' }, 'TN-20261023-0014')], ['Loại đơn', 'Kháng cáo bản án sơ thẩm'], ['Ngày gửi', '23-10-2026'], ['Văn bản bị kháng cáo', 'Bản án số 21/2026/DS-ST ngày 12-10-2026']]), true)));
}
function Kcs2() {
  var ph = React.useState('part'), ld = React.useState('Tòa án sơ thẩm chưa xem xét biên bản đo đạc ngày 10-08-2026.'), dn = React.useState('Đề nghị Tòa án cấp phúc thẩm hủy phần quyết định về ranh giới đất.'), qh = React.useState('');
  return KcsWz(2, h(F, null, NoteBox(h(F, null, h('b', null, 'Tòa án yêu cầu: '), 'Bổ sung tài liệu chứng minh; hoàn thiện thông tin liên hệ.')),
    FCard('Phạm vi kháng cáo', h(F, null, Lead('Đã điền sẵn từ đơn cũ.'), n7Pham(ph, 'Phần quyết định về ranh giới thửa đất số 125.')), true),
    FCard('Lý do kháng cáo', n7Tf('Lý do kháng cáo', ld, { required: true, min: 10, max: 5000, help: 'Trình bày lý do đối với từng phần kháng cáo.' }), true),
    FCard('Đề nghị Tòa án giải quyết', n7Tf('Đề nghị Tòa án giải quyết', dn, { required: true, max: 2000 }), true),
    FCard('Lý do nộp sau thời hạn (nếu có)', n7Tf('Lý do nộp sau thời hạn (nếu có)', qh, { rows: 3, max: 2000 }), true)));
}
function Kcs3() { return KcsWz(3, n7Tep('Tài liệu kèm theo đơn kháng cáo sau khi sửa đổi, bổ sung.', 'PDF, JPG, PNG, DOCX · tối đa 10MB/tệp', [{ name: 'bien-ban-do-dac.pdf', size: '1,2 MB' }])); }
function Kcs4() {
  return h(KyGuiDon, { title: 'Sửa đơn theo yêu cầu', steps: KCS_STEPS, ok: 'kcsOk', tep: ['Đơn kháng cáo (sửa đổi, bổ sung).pdf', 'bien-ban-do-dac.pdf'], tepMeta: 'Bản in đơn sau khi sửa', vaiTro: 'Người kháng cáo',
    top: FCard('Nội dung sửa đổi, bổ sung', RvKV([['Gắn vào đơn', h('span', { className: 'tp-num' }, 'TN-20261023-0014')], ['Phạm vi kháng cáo', 'Một phần bản án'], ['Lý do kháng cáo', 'Tòa án sơ thẩm chưa xem xét biên bản đo đạc ngày 10-08-2026.'], ['Đề nghị Tòa án cấp phúc thẩm', 'Hủy phần quyết định về ranh giới đất.'], ['Tài liệu đính kèm', '1 tệp']]), true),
    camDoan: N7_CAMDOAN });
}
function KcsOk() {
  return h(OkScr, { title: 'Đã nộp đơn sửa đổi, bổ sung thành công', text: 'Đơn sửa đổi, bổ sung đã được gửi đến Tòa án và gắn vào đơn kháng cáo của bạn.', info: [['Mã hồ sơ sửa đổi', h('span', { className: 'tp-num' }, 'SDBS-2026-0021')], ['Gắn vào đơn', h('span', { className: 'tp-num' }, 'TN-20261023-0014')], ['Thời điểm gửi', '04-11-2026 09:30']],
    btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'reset:records,appK_khangcao,appealDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,appK_khangcao' })) });
}

/* ---- 3. Trình bày lý do kháng cáo quá hạn (ACTION_020) ---- */
var KQH_STEPS = ['Yêu cầu của Tòa án', 'Lý do nộp sau thời hạn', 'Chứng cứ trở ngại', 'Xem lại và ký gửi'];
function KqhWz(n, body) { return Wz({ title: 'Trình bày lý do kháng cáo quá hạn', steps: KQH_STEPS, n: n, go: 'kqh' + (n + 1), body: body }); }
function Kqh1() {
  return KqhWz(1, h(F, null, h(NvCall, { tone: 'warning', icon: 'clock', title: 'Hạn trình bày lý do — Còn 6 ngày.' }, 'Hạn 10-11-2026, tính từ ngày tống đạt văn bản yêu cầu, không tính từ ngày bạn mở đọc. Không trình bày, Tòa án cấp phúc thẩm vẫn xem xét và có thể không chấp nhận kháng cáo quá hạn (Điều 275).'),
    FCard('Tòa án yêu cầu', RvKV([['Văn bản', 'Thông báo về việc kháng cáo quá hạn số [Số thông báo]'], ['Ngày tống đạt', '27-10-2026'], ['Hạn trình bày lý do', '10-11-2026']]), true),
    FCard('Nội dung Tòa án yêu cầu', h(F, null, Lead('Trích nguyên văn từ văn bản đã tống đạt.'), P('[Nội dung Tòa án yêu cầu trình bày lý do và xuất trình chứng cứ về việc kháng cáo quá hạn]', 'n7-quote')), true),
    FCard('Đơn kháng cáo gốc', h(F, null, RvKV([['Mã đơn', h('span', { className: 'tp-num' }, 'KC-2026-0013')], ['Mã tiếp nhận', h('span', { className: 'tp-num' }, 'TN-20261020-0013')], ['Ngày gửi', '20-10-2026'], ['Văn bản bị kháng cáo', 'Bản án số 15/2026/KDTM-ST']]), P('Hệ thống tạo đơn mới bằng bản sao đơn này. Đơn gốc giữ nguyên, chỉ đọc.', 'ph-muted dt-small')), true)));
}
function Kqh2() {
  var ld = React.useState('Từ ngày 02-10-2026 đến 18-10-2026 tôi điều trị nội trú tại Bệnh viện Bạch Mai nên không thể nộp đơn kháng cáo đúng hạn.');
  return KqhWz(2, FCard('Lý do nộp sau thời hạn', n7Tf('Lý do nộp sau thời hạn', ld, { required: true, min: 30, max: 5000, rows: 6, placeholder: 'Nhập lý do nộp sau thời hạn', help: 'Nêu trở ngại khách quan hoặc sự kiện bất khả kháng, thời gian bị trở ngại và vì sao không thể nộp đúng hạn.' }), true));
}
function Kqh3() { return KqhWz(3, FCard('Chứng cứ về trở ngại khách quan', h(T.FileUpload, { hint: 'Giấy ra viện, xác nhận của cơ quan có thẩm quyền… PDF, JPG, PNG, tối đa 10 MB mỗi tệp.', uploadLabel: 'Tải lên tệp mới', libraryLabel: 'Chọn từ Kho dữ liệu cá nhân', files: [{ name: 'giay-ra-vien.pdf', size: '820 KB' }] }), true)); }
function Kqh4() {
  return h(KyGuiDon, { title: 'Trình bày lý do kháng cáo quá hạn', steps: KQH_STEPS, ok: 'kqhOk', tep: ['Bản trình bày lý do kháng cáo quá hạn.pdf', 'giay-ra-vien.pdf'], tepMeta: 'Bản in trình bày lý do', vaiTro: 'Người kháng cáo',
    top: FCard('Xem lại lý do nộp sau thời hạn', RvKV([['Đơn kháng cáo', h('span', { className: 'tp-num' }, 'TN-20261020-0013')], ['Lý do nộp sau thời hạn', 'Từ ngày 02-10-2026 đến 18-10-2026 tôi điều trị nội trú tại Bệnh viện Bạch Mai nên không thể nộp đơn kháng cáo đúng hạn.'], ['Chứng cứ trở ngại', 'Tệp 1 · giay-ra-vien.pdf']]), true),
    camDoan: 'Tôi cam đoan nội dung trình bày và tài liệu chứng minh là đúng sự thật.' });
}
function KqhOk() {
  return h(OkScr, { title: 'Đã gửi bản trình bày lý do', text: 'Đã gửi bản trình bày lý do đến Tòa án. Kết quả xem xét sẽ được thông báo qua Hộp thư tống đạt.', info: [['Gắn vào đơn', h('span', { className: 'tp-num' }, 'TN-20261020-0013')], ['Thời điểm gửi', '04-11-2026 09:30']],
    btns: h(F, null, Btn('Xem chi tiết đơn', 'primary', { 'data-pt-go': 'reset:records,appK_khangcao,appealDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,appK_khangcao' })) });
}

/* ---- 4. Nộp ý kiến đối với kháng cáo của đương sự khác – đơn yêu cầu khác YCNEUYEKIEN (ACTION_009) ---- */
var YKC_STEPS = ['Vụ án và kháng cáo', 'Nội dung ý kiến', 'Tài liệu kèm theo', 'Xem lại và ký gửi'];
function YkcWz(n, body) { return Wz({ title: 'Nộp ý kiến đối với kháng cáo', steps: YKC_STEPS, n: n, go: 'ykc' + (n + 1), body: body }); }
function Ykc1() {
  return YkcWz(1, h(F, null, h(NvCall, { tone: 'info', icon: 'clock', title: 'Hạn nộp ý kiến đối với kháng cáo.' }, 'Nên nộp trước khi Tòa án cấp phúc thẩm ra quyết định đưa vụ án ra xét xử. Không nộp ý kiến thì bạn vẫn được trình bày tại phiên tòa, nhưng Hội đồng phúc thẩm không có ý kiến của bạn trong hồ sơ khi nghiên cứu.'),
    FCard('Vụ án', RvKV([['Mã vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0018')], ['Tên vụ án', 'Tranh chấp hợp đồng vay tài sản'], ['Tòa án', COURT1], ['Tư cách của bạn', 'Bị đơn']]), true),
    FCard('Kháng cáo của đương sự khác', h(F, null, Lead('Nội dung lấy từ đơn kháng cáo đã được Tòa án tiếp nhận và tống đạt cho bạn.'),
      RvKV([['Người kháng cáo', 'Trần Văn Bình — Nguyên đơn'], ['Văn bản bị kháng cáo', 'Bản án số 12/2026/DS-ST'], ['Phạm vi kháng cáo', 'Một phần bản án'], ['Nội dung kháng cáo', '[Nội dung kháng cáo của đương sự khác]'], ['Ngày tống đạt', '28-10-2026']])), true)));
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
  return h(OkScr, { title: 'Đã gửi ý kiến thành công', text: 'Ý kiến của bạn đối với kháng cáo đã được gửi đến Tòa án và đưa vào hồ sơ vụ án.', info: [['Mã đơn', h('span', { className: 'tp-num' }, 'YCK-2026-0009')], ['Thời điểm gửi', '04-11-2026 09:30']],
    btns: h(F, null, Btn('Về Quản lý đơn', 'primary', { 'data-pt-go': 'reset:records,appK_khangcao' }), Btn('Về Trang chủ', 'secondary', { 'data-pt-go': 'tab:home' })) });
}

/* ---- 5. Cung cấp tài liệu, chứng cứ theo yêu cầu của Tòa án – Mẫu 12-DS (ACTION_010) ---- */
var CC_STEPS = ['Yêu cầu của Tòa', 'Tài liệu', 'Xem lại và ký số'];
function CcWz(n, body) { return Wz({ title: 'Cung cấp tài liệu, chứng cứ', steps: CC_STEPS, n: n, go: 'cc' + (n + 1), body: body }); }
function Cc1() {
  return CcWz(1, h(F, null, null /* v389: bỏ dòng hạn đầu màn (hạn vẫn ở Hạn cung cấp trong khối Yêu cầu của Tòa án) */,
    FCard('Yêu cầu của Tòa án', h(F, null, Lead('Quyết định yêu cầu cung cấp tài liệu, chứng cứ — Mẫu số 12-DS.'),
      RvKV([['Số quyết định', h('span', { className: 'tp-num' }, '[Số quyết định]')], ['Tòa án ra quyết định', COURT1], ['Thẩm phán', 'Trần Văn Anh'], ['Vụ án', h('span', { className: 'tp-num' }, 'Mã DS-2026-0031')], ['Ngày nhận', '31-10-2026'], ['Hạn cung cấp', '15-11-2026']])), true),
    FCard('Tài liệu, chứng cứ Tòa án yêu cầu', h('ul', { className: 'n7-ul' }, h('li', null, h('b', null, 'Bản gốc hợp đồng đặt cọc ngày 05-01-2026')), h('li', null, h('b', null, 'Sao kê tài khoản từ 01-01-2026 đến 31-03-2026'))), true),
    FCard('Nội dung quyết định', DtDocs([['Quyết định [Số quyết định]', 'Quyết định [Số quyết định].pdf · PDF']], { the: true }), true) /* v351 */,
    null /* v382: bỏ ghi chú "Trong thời hạn 15 ngày" */));
}
function Cc2() {
  var ko = React.useState(true), ten = React.useState('Sao kê tài khoản từ 01-01-2026 đến 31-03-2026'), ld = React.useState('Ngân hàng chưa cấp sao kê do tài khoản đã đóng; tôi đã gửi văn bản đề nghị ngày 01-11-2026 và đang chờ trả lời.');
  return CcWz(2, h(F, null, FCard('Tài liệu, chứng cứ cung cấp', h(T.FileUpload, { goc: true /* v390: giữ kiểu khối tải tệp cũ theo yêu cầu */, kho: false, hint: 'PDF, JPG, PNG, DOCX · tối đa 10MB/tệp', uploadLabel: 'Tải lên tệp mới', libraryLabel: 'Chọn từ Kho dữ liệu cá nhân', files: [{ name: 'hop-dong-dat-coc-ban-goc.pdf', size: '1,6 MB' }] }), true),
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { label: 'Có tài liệu, chứng cứ không cung cấp được.', checked: ko[0], onChange: function (e) { ko[1](e.target.checked); } })),
    ko[0] ? FCard('Tài liệu không cung cấp được', h(F, null, Tf('Tài liệu không cung cấp được', { required: true, value: ten[0], onChange: function (e) { ten[1](e.target.value); }, placeholder: 'Nhập tên tài liệu, chứng cứ không cung cấp được' }),
      n7Tf('Lý do và giải trình chi tiết', ld, { required: true, min: 30, max: 2000, placeholder: 'Nêu rõ lý do không cung cấp được và giải trình chi tiết' })), true) : null));
}
function Cc3() {
  return h(KyGuiDon, { title: 'Cung cấp tài liệu, chứng cứ', steps: CC_STEPS, ok: 'ccOk', tep: ['Văn bản phản hồi.pdf', 'hop-dong-dat-coc-ban-goc.pdf'], tepMeta: 'Hệ thống tự lập, cần ký số trước khi gửi Tòa án.', vaiTro: 'Người cung cấp', sendLabel: 'Ký số và gửi Tòa án', kyNote: 'Cần ký số một lần cho văn bản và 1 tài liệu đính kèm trước khi gửi.',
    top: FCard('Phiếu cung cấp', RvKV([['Quyết định, vụ án', '[Số quyết định] · DS-2026-0031'], ['Tòa án nhận', COURT1 + ' · Thẩm phán Trần Văn Anh'], ['Người cung cấp', 'Hoàng Dương · Ký số · nộp trực tuyến'], ['Tài liệu cung cấp · 1', 'hop-dong-dat-coc-ban-goc.pdf'], ['Không cung cấp được', 'Sao kê tài khoản từ 01-01-2026 đến 31-03-2026']]), true),
    camDoan: N7_CAMDOAN });
}
function CcOk() {
  return h(OkScr, { title: 'Đã gửi văn bản phản hồi - cung cấp tài liệu chứng cứ', text: 'Có thông báo không cung cấp được 1 tài liệu. Tòa án sẽ xem xét và thông báo qua Hộp thư tống đạt.', info: [['Biên nhận', h('span', { className: 'tp-num' }, 'BN-2026-0117')], ['Thời điểm gửi', '04-11-2026 09:30']],
    btns: h(F, null, Btn('Về chi tiết vụ án', 'primary', { 'data-pt-go': 'reset:records,cases,caseDetail' }), Btn('Về Hộp thư tống đạt', 'secondary', { 'data-pt-go': 'tab:inbox' })) });
}

/* ---- 6. Đề nghị thay đổi / hủy bỏ biện pháp khẩn cấp tạm thời (ACTION_045 / 046) ---- */
var BX = { t: { id: 'bpt', ten: 'Đề nghị thay đổi, áp dụng bổ sung biện pháp khẩn cấp tạm thời', ngan: 'Thay đổi BPKCTT', steps: ['Biện pháp đang áp dụng', 'Nội dung thay đổi', 'Tài liệu kèm theo', 'Xem lại và ký gửi'] },
  h: { id: 'bph', ten: 'Đề nghị hủy bỏ biện pháp khẩn cấp tạm thời', ngan: 'Hủy bỏ BPKCTT', steps: ['Biện pháp đang áp dụng', 'Căn cứ hủy bỏ', 'Tài liệu kèm theo', 'Xem lại và ký gửi'] } };
var BX_HUONG = ['Đổi sang biện pháp khác phù hợp hơn', 'Thu hẹp phạm vi áp dụng', 'Mở rộng phạm vi áp dụng', 'Điều chỉnh đối tượng bị áp dụng', 'Áp dụng bổ sung biện pháp khẩn cấp tạm thời khác'];
var BX_CANCU = ['Điểm a: Người yêu cầu áp dụng biện pháp khẩn cấp tạm thời đề nghị hủy bỏ', 'Điểm b: Người phải thi hành quyết định đã nộp tài sản, hoặc có người khác thực hiện biện pháp bảo đảm thi hành nghĩa vụ đối với bên có yêu cầu', 'Điểm c: Nghĩa vụ dân sự của bên có nghĩa vụ đã chấm dứt theo quy định của Bộ luật Dân sự', 'Điểm d: Việc giải quyết vụ án đã được đình chỉ', 'Điểm đ: Quyết định áp dụng biện pháp khẩn cấp tạm thời không đúng quy định của Bộ luật Tố tụng dân sự', 'Điểm e: Căn cứ của việc áp dụng biện pháp khẩn cấp tạm thời không còn', 'Điểm g: Vụ việc đã được giải quyết bằng bản án, quyết định của Tòa án đã có hiệu lực pháp luật', 'Điểm h: Tòa án đã trả lại đơn khởi kiện'];
var BX_QD = [{ id: 'q1', t: 'Quyết định áp dụng BPKCTT số 03/2026/QĐ-BPKCTT', d: 'Phong tỏa tài khoản 650.000.000 đ · Ban hành 12-10-2026 · Tống đạt 14-10-2026' }, { id: 'q2', t: 'Quyết định áp dụng BPKCTT số 05/2026/QĐ-BPKCTT', d: 'Cấm chuyển dịch quyền về tài sản · Ban hành 20-10-2026 · Tống đạt 22-10-2026' }];
function BxWz(k, n, body) { var c = BX[k]; return Wz({ title: c.ngan, steps: c.steps, n: n, go: c.id + (n + 1), body: body }); }
function Bx1(p) {
  var q = React.useState('q1');
  return BxWz(p.k, 1, h(F, null, Lead(p.k === 'h' ? 'Đề nghị Tòa án hủy bỏ một biện pháp khẩn cấp tạm thời đang được áp dụng trong vụ án.' : 'Đề nghị Tòa án thay đổi hoặc áp dụng bổ sung biện pháp khẩn cấp tạm thời khi biện pháp đang áp dụng không còn phù hợp.'),
    FCard('Vụ án', RvKV([['Vụ án', h('span', { className: 'tp-num' }, 'HC-2026-0023')], ['Đơn khởi kiện', h('span', { className: 'tp-num' }, 'TN-20261014-0008')], ['Cấp xét xử hiện tại', 'Sơ thẩm']]), true),
    FCard('Quyết định cần điều chỉnh', h(F, null, Lead('Chọn quyết định áp dụng biện pháp khẩn cấp tạm thời bạn muốn thay đổi hoặc hủy bỏ. Bấm "Xem" để đọc nội dung văn bản quyết định và tệp đính kèm trước khi chọn.'),
      h(OptCards, { label: 'Quyết định cần điều chỉnh', cur: q[0], onPick: q[1], items: BX_QD })), true)));
}
function Bx2(p) {
  var hu = React.useState(p.k === 'h' ? 'cc5' : 'hg1'), pv = React.useState('Giảm số tiền phong tỏa từ 650.000.000 đ xuống 420.000.000 đ trên cùng tài khoản'), ld = React.useState('Số tiền tranh chấp đã giảm sau khi tôi rút một phần yêu cầu ngày 25-10-2026.'), cc = React.useState('Căn cứ phong tỏa không còn vì bị đơn đã thanh toán toàn bộ số tiền tranh chấp ngày 28-10-2026.');
  if (p.k === 'h') return BxWz('h', 2, h(F, null, Blk(null, h(F, null, h(SelSheet, { label: 'Căn cứ đề nghị hủy bỏ', req: true, title: 'Chọn căn cứ đề nghị hủy bỏ', ph: '— Chọn căn cứ —', v: hu[0], onChange: hu[1], opts: BX_CANCU.map(function (x, i) { return { id: 'cc' + i, name: x }; }) }) /* v392: bỏ lời dẫn; căn cứ thành ô chọn mở bảng từ đáy */,
    n7Tf('Trình bày căn cứ hủy bỏ', cc, { required: true, min: 20, max: 2000, placeholder: 'Ngày… bị đơn đã thanh toán toàn bộ số tiền tranh chấp nên căn cứ phong tỏa không còn…' })), { cls: 'bx-blk' }))); /* v392: bỏ ghi chú "Sau khi gửi" · v393: gộp 1 khối, bỏ tiêu đề và thu gọn */
  return BxWz('t', 2, h(F, null, FCard('Bạn muốn thay đổi theo hướng nào?', h(ChonThe, { label: 'Hướng thay đổi', v: hu[0], onPick: hu[1], items: BX_HUONG.map(function (x, i) { return { id: 'hg' + i, t: x }; }) }), true),
    FCard('Phạm vi, đối tượng sau khi thay đổi', n7Tf('Phạm vi, đối tượng sau khi thay đổi', pv, { required: true, max: 2000, help: 'Ghi rõ tài sản, tài khoản, số tiền hoặc hành vi bị hạn chế sau điều chỉnh, để Tòa án ra quyết định đúng phạm vi.' }), true),
    FCard('Trình bày lý do thay đổi', n7Tf('Trình bày lý do thay đổi', ld, { required: true, min: 20, max: 2000, placeholder: 'Số tiền tranh chấp đã giảm sau khi tôi rút một phần yêu cầu ngày…' }), true),
    HopGhi('Sau khi gửi', 'Biện pháp cũ vẫn có hiệu lực đến khi có quyết định mới · Có thể phải bổ sung biện pháp bảo đảm.')));
}
function Bx3(p) { return BxWz(p.k, 3, n7Tep('Tài liệu chứng minh cho đề nghị của bạn.', undefined, undefined, false)); }
function Bx4(p) {
  var c = BX[p.k], hb = p.k === 'h';
  return h(KyGuiDon, { title: c.ngan, steps: c.steps, ok: c.id + 'Ok', tep: [(hb ? 'Đơn đề nghị hủy bỏ BPKCTT' : 'Đơn đề nghị thay đổi BPKCTT') + '.pdf'], tepMeta: 'Bản in đơn đề nghị', vaiTro: 'Nguyên đơn',
    top: FCard(hb ? 'Xem lại đơn đề nghị hủy bỏ' : 'Xem lại đơn đề nghị thay đổi', RvKV([['Loại đề nghị', c.ten], ['Quyết định điều chỉnh', 'Số 03/2026/QĐ-BPKCTT · Ban hành 12-10-2026'], hb ? ['Căn cứ hủy bỏ', BX_CANCU[5]] : ['Hướng thay đổi', BX_HUONG[1]], hb ? ['Trình bày', 'Căn cứ phong tỏa không còn vì bị đơn đã thanh toán toàn bộ số tiền tranh chấp ngày 28-10-2026.'] : ['Phạm vi sau thay đổi', 'Giảm số tiền phong tỏa từ 650.000.000 đ xuống 420.000.000 đ trên cùng tài khoản'], ['Vụ án', h('span', { className: 'tp-num' }, 'HC-2026-0023')], ['Tài liệu kèm theo', 'Không có']]), true),
    bottom: HopGhi('Trách nhiệm khi đề nghị không đúng', hb ? 'Nếu việc hủy bỏ dẫn đến bên kia tẩu tán tài sản và gây thiệt hại cho chính bạn, bạn tự chịu hậu quả. Ngược lại, nếu biện pháp đã áp dụng là không đúng, người yêu cầu áp dụng phải bồi thường cho người bị áp dụng.' : 'Việc thay đổi biện pháp khẩn cấp tạm thời không đúng và gây thiệt hại thì bạn phải bồi thường theo biện pháp bảo đảm đã cam kết. Tòa án xem xét và ra quyết định trong thời hạn luật định.'),
    camDoan: N7_CAMDOAN });
}
function BxOk(p) {
  var hb = p.k === 'h';
  return h(OkScr, { title: hb ? 'Đã gửi đơn đề nghị hủy bỏ biện pháp khẩn cấp tạm thời' : 'Đã gửi đơn đề nghị thay đổi biện pháp khẩn cấp tạm thời', text: hb ? 'Đơn đã được gửi đến Tòa án. Văn bản trả lời của Tòa án sẽ đến Hộp thư tống đạt.' : 'Đơn đã được gửi đến Tòa án. Biện pháp hiện tại vẫn có hiệu lực cho đến khi có quyết định mới. Văn bản trả lời của Tòa án sẽ đến Hộp thư tống đạt.',
    info: [['Vụ án liên quan', h('span', { className: 'tp-num' }, 'HC-2026-0023')], ['Thời điểm gửi', '04-11-2026 09:30']],
    btns: h(F, null, Btn('Xem vụ án', 'primary', { 'data-pt-go': 'reset:records,cases,caseDetail' }), Btn('Về Vụ án của tôi', 'secondary', { 'data-pt-go': 'reset:records,cases' })) });
}

/* ---- 7. Bổ sung hồ sơ đơn phản tố / yêu cầu độc lập – v351: PbsS1…PbsS4, PbsOk ở cuối tệp ---- */
var PBS_STEPS = ['Yêu cầu của Tòa án', 'Bổ sung tài liệu', 'Sửa đổi nội dung đơn', 'Xem lại và ký gửi'];
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
var SK_CT_DD = [{ id: 11, ca: 'VNPT-CA', chu: 'NGUYỄN VĂN BÌNH', cap: 'VNPT Certification Authority', serial: '5402…B1D4', hl: '01-02-2026 – 01-02-2027', dung: '28-10-2026', kiem: '01-02-2026', tt: ['Còn hạn', 'success'] }];
var SK_CT_TO = [{ id: 12, ca: 'Viettel-CA', chu: 'CÔNG TY ABC', cap: 'Viettel Certificate Authority', serial: '7B20…11CF', hl: '10-01-2026 – 10-01-2027', dung: '28-10-2026', kiem: '10-01-2026', tt: ['Còn hạn', 'success'] }];
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
  return h(Phone, { cls: 'ph-hd qh-ph' }, h('header', { className: 'qh' + HdCls() }, h('button', { type: 'button', className: 'tp-icon-btn qh-back', 'aria-label': 'Quay lại', 'data-pt-go': 'back' }, h(T.Icon, { name: 'chevronLeft' })),
    h('div', { className: 'qh-sel qh-tt' }, h('span', null, h('b', null, title))), nut ? HdNut(go, nut) : null), h(Body, { cls: 'ph-plain' }, body));
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
/* đối chiếu 1B.1 / 1B.3 (21/11/2026): thẻ nháp – việc "Tiếp tục soạn" kèm câu web, mở thẳng bước 2 (sao chụp → màn sao chụp đã nạp nháp); thẻ sao chụp – dòng Văn bản là mã vụ án */
function TlyCard(p) {
  var x = p.x, st = TLY_NHOM[x.tt], tinh = x.nhan[0] !== st[0] ? x.nhan : null;
  var viec = [].concat(x.bs ? [{ t: 'Bổ sung hồ sơ', han: 'đến ' + x.bs, go: 'copySupp', m: 'sap' }] : [], x.nv ? [{ t: 'Thực hiện nghĩa vụ tài chính (lệ phí, án phí)', han: 'đến ' + x.nv, go: 'snack:Mở Cổng Dịch vụ công quốc gia để thanh toán', m: 'sap' }] : []);
  if (x.nhap && !viec.length) viec.push({ t: 'Tiếp tục soạn', sub: 'Bản nháp chưa gửi — dữ liệu nhập đã được giữ.', go: x.loai === 'SC' ? 'caseCopyNhap' : 'tl2Nhap' });
  return h('li', { className: 'qd-c qc' },
    /* 1B.1 (người dùng 21/11): bản nháp không có màn xem chi tiết – chạm thẻ nháp vào thẳng màn soạn tiếp */
    h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': (x.nhap ? 'Tiếp tục soạn yêu cầu ' : 'Xem chi tiết yêu cầu ') + x.ma, 'data-pt-go': x.nhap ? (x.loai === 'SC' ? 'caseCopyNhap' : 'tl2Nhap') : x.go }),
    dsTop(st, tinh ? tinh[0] : null, tinh ? (tinh[1] === 'danger' ? 'warning' : tinh[1] === 'success' ? 'success' : 'warning') : null),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, x.va)),
    dsRows([['Mã yêu cầu', h('span', { className: 'tp-num' }, x.ma + (x.gui ? ' - ' + x.gui : ''))], ['Loại yêu cầu', TLY_LOAI[x.loai] + (x.giay ? ' · +' + x.giay + ' bản giấy' : '')],
      ['Văn bản', x.loai === 'SC' ? h('span', { className: 'tp-num' }, x.maVa || '—') : h(F, null, x.vb + ' ', h('span', { className: 'tp-num' }, x.so))], ['Tòa án', COURT1], ['Dự kiến trả', x.du]]),
    tlViec(viec));
}
/* đối chiếu 1A.1–1A.4, 1G.3 (21/11/2026): chip có số ở mọi trạng thái (kể cả 0), bỏ nút sắp xếp; cuộn tới cuối tải thêm 10 yêu cầu;
   đang tải / lỗi / trống theo câu web (không qua khối trống chung, không nút Xóa bộ lọc); p.daLuu – dải xanh "Đã lưu nháp …" đầu màn (thay thanh thông báo đáy) */
function TlyList(p) {
  p = p || {};
  var all = p.rong ? [] : p.nhieu ? tlyNhieu(27) : TLY, tt = React.useState(p.tt0 || 'all'), q = React.useState(p.q0 || ''), n = React.useState(10);
  var tieuDe = 'Cấp trích lục, bản sao';
  if (p.tai) return DsShell(tieuDe, h(TlTrang, { spin: true, text: 'Đang tải danh sách yêu cầu…' }), 'Tạo yêu cầu mới', 'tl1');
  if (p.loi) return DsShell(tieuDe, h(TlTrang, { loi: 1, title: 'Không tải được danh sách yêu cầu.', text: 'Mã lỗi: [mã lỗi]', btns: TlThuLai() }), 'Tạo yêu cầu mới', 'tl1');
  var k = khongDau(q[0].trim()), ds = all.filter(function (x) { return (tt[0] === 'all' || x.tt === tt[0]) && (!k || khongDau(x.ma + ' ' + x.va).indexOf(k) >= 0); }), coLoc = tt[0] !== 'all' || !!k;
  var chips = TLY_TT.map(function (t) { return { key: t[0], label: t[1], count: t[0] === 'all' ? all.length : all.filter(function (x) { return x.tt === t[0]; }).length }; });
  return DsShell(tieuDe, h(F, null,
    p.daLuu ? h('div', { className: 'tl-bao' }, NvCallS('success', 'Đã lưu nháp [mã yêu cầu]. Bạn có thể tiếp tục chỉnh sửa và gửi sau.')) : null,
    /* 1A.2 (người dùng 21/11): nút Bộ lọc nằm bên phải ô tìm kiếm, cùng một hàng */
    h('div', { className: 'nv-stick qd-stick' }, h('div', { className: 'ph-ibar tl-ibar' }, h('div', { className: 'fx-search' }, Tf('Tìm yêu cầu', { icon: 'search', placeholder: 'Tìm kiếm mã yêu cầu, tên vụ án', value: q[0], onChange: function (e) { q[1](e.target.value); n[1](10); }, onClear: function () { q[1](''); n[1](10); } })),
      h(StRow, { label: 'Lọc yêu cầu theo trạng thái', value: tt[0], onChange: function (x) { tt[1](x); n[1](10); }, items: chips, boLoc: true, khongSapXep: true, tieuDeLoc: 'Trạng thái' }) /* 1A.1 (người dùng 21/11): chip trạng thái đưa vào bảng Bộ lọc (dòng trạng thái + số, kể cả 0) */)),
    ds.length ? h('ul', { className: 'qd-list' }, ds.slice(0, n[0]).map(function (x, i) { return h(TlyCard, { key: i, x: x }); }),
        n[0] < ds.length ? h(TlMore, { onMore: function () { n[1](function (v) { return v + 10; }); } }) : null) /* 1A.3 (người dùng 21/11): bỏ dòng "Đã hiển thị hết" */
      : h(IbEmpty, { goc: !coLoc /* 1A.2 (người dùng 21/11): tìm/lọc không có kết quả dùng khối trống chung "Không tìm thấy kết quả phù hợp" */, icon: 'file', title: coLoc ? 'Không có yêu cầu phù hợp' : 'Chưa có yêu cầu nào', text: coLoc ? 'Không có yêu cầu nào thuộc trạng thái/từ khóa đã chọn.' : 'Yêu cầu cấp trích lục, bản sao bản án/quyết định của Tòa án sẽ hiển thị tại đây.' })),
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
var BS_STEPS = ['Lý do bổ sung', 'Bổ sung tài liệu', 'Sửa đổi nội dung đơn', 'Xem lại và ký gửi'];
/* v354: theo chuẩn Soạn đơn */
function BsWz(n, body, last) { return Wz({ title: 'Bổ sung, sửa đổi hồ sơ', steps: BS_STEPS, n: n, go: n < 4 ? 'bs' + (n + 1) : undefined, last: last, body: body }); } /* v355: bỏ thẻ loại đơn đầu bước */
/* v354: theo chuẩn Soạn đơn */
function Bs1() {
  var ld = React.useState('Bổ sung giấy nhận tiền lần 2 mà tôi mới tìm được, chứng minh khoản vay đã giao đủ.');
  return BsWz(1, h(F, null,
    FCard('Hồ sơ bạn muốn bổ sung', RvKV([['Mã tiếp nhận', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Loại đơn', 'Đơn khởi kiện'], ['Trạng thái hiện tại', 'Yêu cầu sửa đổi, bổ sung đơn'], ['Thời hạn', '26-10-2026']]), true),
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
  var rows = [['Mã tiếp nhận', h('span', { className: 'ph-ok-ma' }, '[Mã tiếp nhận]')], ['Đơn liên quan', 'TN-20261020-0012'], ['Thời điểm gửi', '09:30:12 13-11-2026'], ['Trạng thái', h(T.StatusBadge, { tone: 'info', icon: false }, 'Đã gửi')]];
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
  var het = !!p.het, han = h('span', { className: 'q1n-han' + (het ? ' q1n-han-het' : '') }, h(T.Icon, { name: 'clock' }), het ? 'Đã quá hạn: 20-10-2026' : 'Hạn bổ sung: 26-10-2026');
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
    h('p', null, 'Nếu cho rằng văn bản, thông báo tố tụng này trái pháp luật, bạn có quyền gửi đơn khiếu nại tới Tòa án. Hạn khiếu nại: ' + (p.het ? '05-11-2026' : '23-11-2026') + '.' + (p.het ? ' Đã hết thời hiệu khiếu nại.' : '')),
    h(T.Button, { size: 'sm', variant: 'secondary', disabled: !!p.het, 'data-pt-go': p.het ? undefined : 'complaintForm' }, 'Khiếu nại văn bản này'));
}
function VuAnKhoi() { return FCard('Vụ án', h(F, null, h('div', { className: 'q1-badge' }, h(T.StatusBadge, { tone: 'info', icon: false }, '[Trạng thái vụ án]')), RvKV([['Tên vụ án', 'Tranh chấp quyền sử dụng đất'], ['Ngày thụ lý', '15-10-2026']])), true); }
function TamUngKhoi(p) { return FCard('Tạm ứng án phí', RvKV([['Số tiền', '1.250.000 đ'], ['Trạng thái', '[Trạng thái nộp tạm ứng]'], ['Hạn nộp', p.tre ? '02-11-2026' : '06-11-2026']].concat(p.da ? [['Ngày nộp', '01-11-2026']] : [])), true); }

/* v350 (QLD1-W10: chấm đỏ trên tab Văn bản tống đạt khi còn văn bản chưa xem */
function donTabs(chamVb) { return DON_TABS.map(function (t) { return t.key === 'vb' && chamVb ? Object.assign({}, t, { label: h('span', { className: 'q1-tdot' }, t.label, h('i', { className: 'q1-dot', title: 'Có văn bản chưa xem', 'aria-label': 'Có văn bản chưa xem' })) }) : t; }); }

function AppBsHet() { return h(DonChiTiet, { viec: { tone: 'danger', t: 'Tòa yêu cầu bổ sung hồ sơ – Đã hết hạn', han: 'Hạn 20-10-2026', two: [{ l: 'Sửa đổi, bổ sung đơn', dis: true }, { l: 'Nộp tài liệu bổ sung', v: 'secondary', dis: true }] } }); }
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
    case 'choRut': return { tone: 'info', t: 'Đang chờ xử lý yêu cầu rút đơn', han: 'Hệ thống đã tiếp nhận yêu cầu rút đơn của bạn vào lúc 09:30 - 03-11-2026. Yêu cầu này đang chờ Tòa án xem xét.',
      two: [{ l: 'Bổ sung', v: 'secondary', khoa: '[Lý do khóa: đang chờ xử lý yêu cầu rút đơn]' }, { l: 'Thay đổi, bổ sung yêu cầu', v: 'secondary', khoa: '[Lý do khóa: đang chờ xử lý yêu cầu rút đơn]' }] };
    case 'bs': return { t: 'Tòa án yêu cầu sửa đổi, bổ sung đơn · hạn 08-11-2026', han: 'Đọc văn bản [Số thông báo] (tống đạt 30-10-2026) trong Hộp thư tống đạt. Quá hạn không bổ sung, Tòa án trả lại đơn.', btn: { l: 'Bổ sung', go: c === PT_L.PT ? 'pbs1' : 'ybs1' } };
    case 'bsHet': return { tone: 'danger', t: 'Tòa yêu cầu bổ sung hồ sơ – Đã hết hạn (hạn 25-10-2026)', btn: { l: 'Bổ sung', khoa: '[Lý do khóa từ hệ thống]' } };
    case 'au': return { t: 'Nộp tạm ứng án phí · hạn 06-11-2026', han: 'Nộp và gửi biên lai trong hạn. Quá hạn không nộp, Tòa án trả lại đơn.', btn: { l: 'Nộp tạm ứng án phí', go: 'dvcqgExt' } };
    case 'auHet': return { tone: 'danger', t: 'Đã hết hạn nộp tạm ứng án phí (hạn 02-11-2026)', han: 'Công dân không thể nộp sau khi hết hạn — vui lòng liên hệ Tòa án.', btn: { l: 'Nộp tạm ứng án phí', khoa: 'Đã hết hạn nộp tạm ứng án phí.' } };
    case 'ky': return { tone: 'neutral', t: 'Đơn chưa được gửi đến Tòa án', han: 'Đang chờ đủ chữ ký số. Ngày nộp đơn tính từ lúc đủ chữ ký và gửi thành công.', btn: { l: 'Rút đơn', v: 'secondary', khoa: '[Lý do khóa: đơn chưa có mã tiếp nhận]' } };
    case 'tra': return { tone: 'danger', t: 'Tòa án đã trả lại đơn · ngày 31-10-2026', han: 'Còn lại 6 ngày để khiếu nại việc trả lại đơn.', btn: { l: 'Khiếu nại việc trả lại đơn', go: c === PT_L.PT ? 'pkn1' : 'ykn1' } };
    case 'traHet': return { tone: 'danger', t: 'Tòa án đã trả lại đơn · ngày 15-10-2026', han: 'Đã hết thời hạn khiếu nại việc trả lại đơn.', btn: { l: 'Khiếu nại việc trả lại đơn', khoa: '[Lý do khóa từ hệ thống]' } };
    case 'vaoVA': return { tone: 'neutral', t: 'Yêu cầu đã được đưa vào vụ án ' + c.va, two: [{ l: 'Thay đổi, bổ sung yêu cầu', v: 'secondary', go: dkL }, { l: 'Rút toàn bộ yêu cầu', v: 'secondary', go: c === PT_L.PT ? 'prdVA1' : 'yrd1' }] };
    default: return { tone: 'info', t: 'Đơn đã đến hệ thống Tòa án', han: 'Chờ Tòa án vào sổ nhận đơn. Bạn vẫn rút được đơn ở giai đoạn này.', two: [{ l: 'Rút đơn', v: 'secondary', go: c === PT_L.PT ? 'prd1' : 'yrd1' }, { l: 'Thay đổi yêu cầu', v: 'secondary', go: dkL }] };
  }
}
var PT_BADGE = { gui: [['Đã gửi đơn', 'info']], choRut: [['Đang xử lý', 'info']], bs: [['Đang xử lý', 'info'], ['Yêu cầu sửa đổi, bổ sung đơn', 'warning']], bsHet: [['Đang xử lý', 'info'], ['Yêu cầu sửa đổi, bổ sung đơn', 'warning']], au: [['Đang xử lý', 'info'], ['Chờ nộp tạm ứng án phí', 'warning']], auHet: [['Đang xử lý', 'info'], ['Chờ nộp tạm ứng án phí', 'warning']], ky: [['Chờ ký số', 'warning']], tra: [['Đã xử lý', 'success'], ['Đã trả lại đơn', 'neutral']], traHet: [['Đã xử lý', 'success'], ['Đã trả lại đơn', 'neutral']], vaoVA: [['Đang xử lý', 'info'], ['Đã đưa vào vụ án', 'success']] };
/* v351 (QLD2-W07: Đơn phát sinh – đã gửi: bấm thẻ xem đơn (PDF); nháp: Tiếp tục soạn mở đúng trình tự */
function ptPhatSinh(c) {
  var bsGo = c === PT_L.PT ? 'pbs1' : 'ybs1';
  var ds = [
    { loai: 'Đơn rút', t: 'Rút đơn ' + c.ten, tt: ['Đã gửi', 'info'], ma: 'TN-20261103-0040', ngay: ['Ngày gửi', '03-11-2026 09:30'], file: 'Don-rut-TN-20261103-0040.pdf' },
    { loai: 'Hồ sơ bổ sung', t: 'Bổ sung hồ sơ đơn ' + c.ten, tt: ['Lưu nháp', 'neutral'], ma: null, ngay: ['Lưu nháp', '30-10-2026 16:05'], go: bsGo }];
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
    top: FCard('Xem lại', RvKV([['Đơn ' + c.ten, h('span', { className: 'tp-num' }, c.ma)], ['Văn bản yêu cầu', '[Số thông báo]'], ['Tài liệu đã bổ sung', 'bien-nhan-dat-coc.pdf'], ['Trường đã sửa', 'Nội dung yêu cầu'], ['Hạn', '08-11-2026']]), true),
    bottom: HopGhi('Sau khi gửi', 'Hồ sơ bổ sung là đơn phát sinh, chỉ có trạng thái Đã gửi. Đơn ' + c.ma + ' vẫn ở "Đang xử lý đơn" cho đến khi Tòa án có kết quả.'),
    camDoan: 'Tôi cam đoan nội dung sửa đổi, bổ sung và tài liệu kèm theo là đúng sự thật.' });
}
function PbsOk() { return h(PtDaGui, { title: 'Đã gửi hồ sơ bổ sung', text: 'Tòa án sẽ kiểm tra hồ sơ bổ sung và thông báo kết quả qua Hộp thư tống đạt.' }); }

/* v351 (QLD2-W10, M03: rút đơn phản tố / yêu cầu độc lập – 3 bước riêng, không còn khối hệ quả và thẻ tạm ứng của đơn khởi kiện */
var PRD_STEPS = ['Đơn cần rút', 'Lý do và hệ quả', 'Xác nhận và ký gửi'];
function prdTen(c, va) { return (va ? 'Rút toàn bộ yêu cầu ' : 'Rút đơn ') + c.ten; }
function prdId(loai, va) { return loai === 'YC' ? 'yrd' : va ? 'prdVA' : 'prd'; }
function Prd1(loai, va) {
  var c = PT_L[loai || 'PT'];
  return Wz({ title: prdTen(c, va), steps: PRD_STEPS, n: 1, go: prdId(loai, va) + '2', body: h(F, null, Lead('Bạn đề nghị Tòa án cho rút. Việc rút chỉ có hiệu lực khi Tòa án chấp nhận.'),
    FCard('Đơn bạn đề nghị rút', h(F, null, Lead('Kiểm tra đúng đơn trước khi tiếp tục. Thông tin lấy tự động, không sửa được.'),
      RvKV([['Mã tiếp nhận', h('span', { className: 'tp-num' }, c.ma)], ['Loại đơn', c.tieu], ['Ngày gửi', '28-10-2026 09:15'], ['Tòa án tiếp nhận', COURT1], ['Trạng thái hiện tại', va ? 'Đang xử lý · Đã đưa vào vụ án' : 'Đã gửi đơn'], ['Vụ án liên quan', c.va + ' · ' + c.vu]])), true)) });
}
function Prd2(p) {
  var c = PT_L[p.loai || 'PT'], ld = React.useState(p.err ? '' : 'r0'), tb = React.useState(p.err ? 'Đã xong' : 'Hai bên đã thỏa thuận xong ngày 01-11-2026, bị đơn đã trả đủ tiền.');
  return Wz({ title: prdTen(c, p.va), steps: PRD_STEPS, n: 2, go: prdId(p.loai, p.va) + '3', body: h(F, null,
    FCard('Lý do rút', h(F, null, h(ChonThe, { label: 'Lý do rút', v: ld[0], onPick: ld[1], items: PT_RUT.map(function (x, i) { return { id: 'r' + i, t: x }; }) }), p.err && !ld[0] ? h('p', { className: 'q2-err', role: 'alert' }, h(T.Icon, { name: 'alert' }), 'Vui lòng chọn lý do rút.') : null), true),
    FCard('Trình bày', h(F, null, n7Tf('Trình bày', tb, { required: true, min: 10, max: 2000, placeholder: 'Hai bên đã thỏa thuận xong ngày …', error: p.err ? 'Trình bày lý do rút (tối thiểu 10 ký tự).' : undefined })), true)) });
}
function Prd3(loai, va) {
  var c = PT_L[loai || 'PT'], ten = va ? 'yêu cầu' : 'đơn';
  return h(KyGuiDon, { title: prdTen(c, va), steps: PRD_STEPS, ok: prdId(loai, va) + 'Ok', tep: [prdTen(c, va) + '.pdf'], tepMeta: 'Bản in đơn rút', vaiTro: c.tc, sendLabel: 'Gửi đơn',
    top: FCard('Xem lại', RvKV([['Loại', va ? 'Rút toàn bộ yêu cầu' : 'Rút đơn'], ['Đơn ' + c.ten, h('span', { className: 'tp-num' }, c.ma)], ['Lý do', PT_RUT[0]], ['Trình bày', 'Hai bên đã thỏa thuận xong ngày 01-11-2026, bị đơn đã trả đủ tiền.']]), true),
    camDoan: 'Tôi hiểu hệ quả của việc rút ' + ten + ' ' + c.ten + ' và tự nguyện đề nghị Tòa án cho rút.' });
}
function PrdOk(loai) { return h(PtDaGui, { loai: loai, title: 'Đã gửi đơn rút', text: 'Trong lúc chờ Tòa án xử lý, bạn không nộp bổ sung hay thay đổi yêu cầu được. Kết quả hiện trên đơn gốc khi Tòa án gửi văn bản.' }); }

/* v351 (QLD2-W11, M04: thay đổi / rút một phần yêu cầu phản tố – 5 bước riêng */
var PTD_LD = { 'TD-01': ['Có thêm chứng cứ làm thay đổi giá trị yêu cầu', 'Phát sinh thiệt hại mới sau khi nộp đơn', 'Tính lại giá trị yêu cầu', 'Bổ sung yêu cầu có liên quan', 'Lý do khác'], 'TD-02': ['Các bên đã thỏa thuận được phần này', 'Bên kia đã thực hiện xong nghĩa vụ', 'Không đủ chứng cứ chứng minh phần này', 'Muốn khởi kiện riêng phần này', 'Lý do khác'] };
function ptdSteps(rut) { return ['Loại điều chỉnh', rut ? 'Yêu cầu cần rút' : 'Yêu cầu cần thay đổi', 'Lý do và hệ quả', 'Tài liệu kèm theo', 'Xem lại và ký gửi']; }
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
  var rut = !!p.rut, ld = React.useState('l1'), tb = React.useState('Sau khi có kết quả giám định ngày 05-11-2026, thiệt hại thực tế là 65.000.000 đồng.'), ds = PTD_LD[rut ? 'TD-02' : 'TD-01'];
  return PtdWz(p, 3, h(F, null, FCard(rut ? 'Lý do rút một phần yêu cầu' : 'Lý do thay đổi, bổ sung yêu cầu', h(ChonThe, { label: 'Lý do', v: ld[0], onPick: ld[1], items: ds.map(function (x, i) { return { id: 'l' + i, t: x }; }) }), true),
    FCard('Trình bày cụ thể', h(F, null, Lead('Nêu diễn biến dẫn đến việc điều chỉnh và căn cứ kèm theo.'), n7Tf('Trình bày cụ thể', tb, { required: ld[0] === 'l4', max: 2000, placeholder: 'Sau khi có kết quả giám định ngày …, thiệt hại thực tế là …' })), true)), rut);
}
function Ptd4(p) { return PtdWz(p, 4, n7TepTuyChon(p.rut), p.rut); }
function n7TepTuyChon(rut) { return FCard('Tài liệu kèm theo (tùy chọn)', h(F, null, Lead(rut ? 'Tài liệu chứng minh lý do rút, ví dụ biên bản thỏa thuận, biên nhận thanh toán.' : 'Chứng cứ cho phần yêu cầu thay đổi, bổ sung, ví dụ chứng từ thiệt hại mới, kết quả giám định.'), h(T.FileUpload, { hint: 'PDF, JPG, PNG, DOCX · tối đa 10MB/tệp', uploadLabel: 'Tải lên tệp mới', libraryLabel: 'Chọn từ Kho dữ liệu cá nhân', files: [] })), true); }
function Ptd5(p) {
  var c = PT_L[p.loai || 'PT'], rut = !!p.rut, id = p.loai === 'YC' ? 'ytd' : 'ptd';
  return h(KyGuiDon, { title: ptdTen(c, rut), steps: ptdSteps(rut), ok: id + 'Ok', tep: [ptdTen(c, rut) + '.pdf'], tepMeta: 'Bản in đơn', vaiTro: c.tc, sendLabel: 'Gửi đơn',
    top: FCard('Xem lại', RvKV([['Loại điều chỉnh', rut ? 'Rút một phần yêu cầu' : 'Thay đổi, bổ sung yêu cầu'], ['Đơn ' + c.ten, h('span', { className: 'tp-num' }, c.ma)], ['Vụ án', c.va + ' · ' + c.vu], ['Nội dung đã nộp', c.yc], [rut ? 'Phần yêu cầu xin rút' : 'Nội dung sau thay đổi, bổ sung', rut ? 'Tiền lãi chậm trả' : c.yc + ' và tiền lãi chậm trả tính đến ngày xét xử sơ thẩm.'], ['Lý do', PTD_LD[rut ? 'TD-02' : 'TD-01'][1]], ['Trình bày', 'Sau khi có kết quả giám định ngày 05-11-2026, thiệt hại thực tế là 65.000.000 đồng.'], ['Tài liệu kèm theo', 'Không có']]), true),
    camDoan: rut ? 'Tôi tự nguyện rút phần yêu cầu đã nêu và hiểu rằng phần đó sẽ bị đình chỉ giải quyết.' : 'Tôi cam đoan nội dung yêu cầu thay đổi, bổ sung và tài liệu kèm theo là đúng sự thật.' });
}
function PtdOk(loai) { var c = PT_L[loai || 'PT']; return h(PtDaGui, { loai: loai, title: 'Đã gửi đơn thay đổi, bổ sung yêu cầu ' + c.ten, text: 'Tòa án sẽ chuyển nội dung yêu cầu mới cho nguyên đơn và người có quyền lợi, nghĩa vụ liên quan để lấy ý kiến, sau đó thông báo qua Hộp thư tống đạt.' }); }

/* v351 (QLD2-W12, M05: khiếu nại việc trả lại đơn phản tố / yêu cầu độc lập – 3 bước riêng, không còn thẻ "Đơn của bạn còn nội dung…" và "Người khiếu nại" */
var PKN_STEPS = ['Nội dung khiếu nại', 'Tài liệu, chứng cứ', 'Xem lại và ký gửi'];
function PknWz(loai, n, body) { return Wz({ title: 'Khiếu nại việc trả lại đơn', steps: PKN_STEPS, n: n, go: (loai === 'YC' ? 'ykn' : 'pkn') + (n + 1), body: body }); }
function Pkn1(p) {
  var c = PT_L[p.loai || 'PT'], tt = React.useState('Tòa án trả lại đơn ' + c.ten + ' khi tôi đã nộp đủ tài liệu'), db = React.useState('Ngày 25-10-2026 tôi đã nộp đủ biên nhận đặt cọc theo Thông báo [Số thông báo], nhưng ngày 31-10-2026 Tòa án vẫn trả lại đơn với lý do chưa bổ sung tài liệu.'), yc = React.useState('Đề nghị Chánh án hủy thông báo trả lại đơn ' + c.ten + ' và yêu cầu Tòa án nhận lại đơn');
  return PknWz(p.loai, 1, h(F, null, Lead('Gửi Chánh án Tòa án cấp trên trực tiếp xem xét việc trả lại [đơn bị trả lại] ([căn cứ]).'),
    h(NvCall, { tone: 'info', icon: 'clock', title: 'Hạn khiếu nại: 10-11-2026 · Còn 6 ngày' }, ''),
    FCard('Đơn bị trả lại', h(F, null, Lead('Thông tin lấy tự động từ đơn và văn bản Tòa án đã gửi, không sửa được.'),
      RvKV([['Loại đơn', c.tieu], ['Mã tiếp nhận', h('span', { className: 'tp-num' }, c.ma)], ['Vụ án', c.va + ' · ' + c.vu], ['Tòa án đã trả lại đơn', COURT1], ['Văn bản trả lại', 'số [Số thông báo] · tống đạt 31-10-2026'], ['Tòa án nhận đơn khiếu nại', 'Tòa án nhân dân thành phố Hà Nội'], ['Căn cứ', '[Căn cứ]']])), true),
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
  return PbsWz2(loai, 1, h(F, null, Lead('Nộp tài liệu và sửa nội dung đơn theo yêu cầu của Tòa án.'), h(NvCall, { tone: 'warning', icon: 'clock', title: 'Hạn bổ sung hồ sơ: 08-11-2026 — Còn 4 ngày' }, ''),
    FCard('Nội dung Tòa án yêu cầu', h(F, null, Lead('Thông tin văn bản đã tống đạt. Mở văn bản để đọc nội dung Tòa án yêu cầu.'), RvKV([['Văn bản', 'số [Số thông báo]'], ['Ngày tống đạt', '30-10-2026']]),
      DtDocs([['Thông báo [Số thông báo]', 'Thong-bao-[Số thông báo].pdf · PDF']], { the: true })), true)));
}

/* ===== v352 (13/11/2026): Quản lý đơn nhóm 3 – Kháng cáo theo web (QLD3-W01…W09), người dùng duyệt demo ===== */
/* v352 (QLD3-W02 + W04: khối đầu màn theo tình trạng (cau-hinh.ts) – nút theo ma trận, nút khóa có dòng lý do, có nút X đóng */
var KC_KHOA_BS = '[Lý do khóa: Tòa án chưa yêu cầu sửa đổi, bổ sung]';
function kcViec(st) {
  switch (st) {
    case 'sua': case 'suaLai': return { dong: 1, t: 'Tòa án yêu cầu sửa đổi, bổ sung đơn kháng cáo · hạn 08-11-2026', han: 'Đọc văn bản yêu cầu trong Hộp thư tống đạt, sau đó sửa đổi, bổ sung đơn kháng cáo.', btn: { l: 'Bổ sung', go: st === 'suaLai' ? 'appealLai' : 'kcs1' }, more: [{ l: 'Xem văn bản', go: 'mailDetail' }, { l: 'Rút đơn', go: 'kct1' }] };
    case 'quaHan': return { dong: 1, t: 'Kháng cáo quá hạn, cần giải trình · hạn 08-11-2026', han: 'Trình bày lý do trở ngại khách quan dẫn đến việc kháng cáo quá hạn để Tòa án xem xét.', btn: { l: 'Trình bày lý do và xuất trình chứng cứ về việc kháng cáo quá hạn', go: 'kqh1' } };
    case 'tamUng': return { dong: 1, t: 'Nộp tạm ứng án phí phúc thẩm · hạn 06-11-2026', han: 'Nộp tạm ứng án phí và gửi biên lai cho Tòa án trong thời hạn.', btn: { l: 'Nộp tạm ứng', go: 'dvcqgExt' } };
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
  return FCard('Văn bản tống đạt', h(F, null, P('Văn bản Tòa án gửi về đơn này', 'ph-muted dt-small'), VbCards([{ t: 'Thông báo yêu cầu sửa đổi, bổ sung đơn kháng cáo', so: '[Số thông báo]', tg: '28-10-2026', moi: true }]),
    h('ul', { className: 'vb1' }, h('li', { className: 'ib-c q3-khac' }, h('div', { className: 'ib-c-h' }, h('span', { className: 'vk-tag' + ibTag('THONG_BAO') }, IB_NHAN_TEN.THONG_BAO), h('span', { className: 'vk-code tp-num' }, '[Số thông báo]')),
      h('b', null, 'Thông báo về việc kháng cáo'), h('small', null, 'Văn bản tống đạt · 29-10-2026'), h('span', { className: 'q3-khac-t' }, 'Không có trong Hộp thư của bạn')))), true);
}
/* v352 (QLD3-W08: Đơn phát sinh – đơn đã gửi bấm xem đơn; nháp Tiếp tục soạn mở đúng trình tự */
function kcPhatSinh() {
  return FCard('Đơn phát sinh', h(F, null, P('Đơn kháng cáo ban đầu và các đơn sửa đổi, bổ sung, thay đổi/rút yêu cầu, trình bày lý do quá hạn.', 'ph-muted dt-small'), h('ul', { className: 'qd-list dt-qc' }, [
    { loai: 'Đơn ban đầu', t: 'Kháng cáo bản án sơ thẩm số 25/2026/DS-ST', tt: ['Đã gửi', 'info'], ma: 'TN-20261025-0015', ngay: ['Ngày gửi', '25-10-2026 10:20'], file: 'Don-khang-cao-TN-20261025-0015.pdf' },
    { loai: 'Đơn sửa đổi, bổ sung', t: 'Sửa đổi, bổ sung đơn kháng cáo', tt: ['Lưu nháp', 'neutral'], ma: null, ngay: ['Lưu nháp', '29-10-2026 15:40'], go: 'kcs1' },
    { loai: 'Trình bày lý do quá hạn', t: 'Trình bày lý do kháng cáo quá hạn', tt: ['Lưu nháp', 'neutral'], ma: null, ngay: ['Lưu nháp', '30-10-2026 08:05'], go: 'kqh1' }].map(DtDonThe))), true);
}

/* v352 (QLD3-W01: Thay đổi, rút kháng cáo – 3 bước (khang-cao-thay-doi-rut) */
var KCT_STEPS = ['Đơn kháng cáo và việc cần làm', 'Nội dung', 'Xem lại và ký gửi'];
var KCT_LOAI = [{ id: 'td', t: 'Thay đổi, bổ sung kháng cáo', d: 'Sửa phạm vi, lý do hoặc đề nghị của kháng cáo.' }, { id: 'rmp', t: 'Rút một phần kháng cáo', d: 'Tòa án cấp phúc thẩm không xem xét phần bạn đã rút.' }, { id: 'rtb', t: 'Rút toàn bộ kháng cáo', d: 'Tòa án đình chỉ xét xử phúc thẩm; phần bản án bạn kháng cáo có hiệu lực pháp luật.' }];
function kctLoai(id) { return KCT_LOAI.filter(function (x) { return x.id === id; })[0]; }
function Kct1() {
  var v = React.useState('td');
  return Wz({ title: 'Thay đổi, rút kháng cáo', steps: KCT_STEPS, n: 1, save: false, go: 'kct2', body: h(F, null,
    FCard('Đơn kháng cáo của bạn', RvKV([['Mã đơn', h('span', { className: 'tp-num' }, 'TN-20261025-0015')], ['Văn bản bị kháng cáo', 'Bản án số 25/2026/DS-ST ngày 21-10-2026'], ['Phạm vi hiện tại', 'Một phần bản án'], ['Giai đoạn', '[Giai đoạn]'], ['Tòa án nhận đơn kháng cáo', COURT1]]), true),
    FCard('Bạn muốn làm gì với kháng cáo?', h(OptCards, { label: 'Việc thực hiện', cur: v[0], onPick: v[1], items: KCT_LOAI }), true)) });
}
function Kct2(p) {
  var rtb = p.loai === 'rtb', rmp = p.loai === 'rmp', nd = React.useState(rmp ? 'Rút phần kháng cáo về án phí sơ thẩm (Mục 2 phần Quyết định).' : 'Bổ sung đề nghị Tòa án cấp phúc thẩm xem xét chứng cứ chuyển khoản ngày 05-01-2026.'), ld = React.useState('');
  return Wz({ title: 'Thay đổi, rút kháng cáo', steps: KCT_STEPS, n: 2, save: false, go: 'kct3' + (p.loai && p.loai !== 'td' ? p.loai : ''), body: h(F, null,
    rtb ? null : FCard(rmp ? 'Phần kháng cáo muốn rút' : 'Nội dung thay đổi, bổ sung', n7Tf(rmp ? 'Phần kháng cáo muốn rút' : 'Nội dung thay đổi, bổ sung', nd, { required: true, rows: 5, max: 2000, placeholder: rmp ? 'Mô tả cụ thể phần nào trong kháng cáo bạn muốn rút...' : 'Mô tả cụ thể phần nào trong kháng cáo bạn muốn thay đổi hoặc bổ sung thêm...' }), true),
    FCard('Lý do (không bắt buộc)', n7Tf('Lý do', ld, { rows: 4, max: 2000, placeholder: rtb ? 'Ví dụ: Các bên đã tự thỏa thuận được; bị đơn đã thi hành án tự nguyện...' : 'Trình bày lý do thay đổi hoặc rút kháng cáo nếu muốn...' }), true),
    rtb ? null : HopGhi('Giới hạn khi đã hết thời hạn kháng cáo', 'Nếu thời hạn kháng cáo đã hết, việc thay đổi, bổ sung không được vượt quá phạm vi kháng cáo ban đầu. Tòa án xác định việc này.')) });
}
function Kct3(loai) {
  var l = kctLoai(loai || 'td'), rut = loai === 'rmp' || loai === 'rtb';
  return h(KyGuiDon, { title: 'Thay đổi, rút kháng cáo', steps: KCT_STEPS, save: false, ok: 'kctOk' + (loai && loai !== 'td' ? loai : ''), tep: ['Đơn ' + l.t.charAt(0).toLowerCase() + l.t.slice(1) + '.pdf'], tepMeta: 'Xem trước đơn', vaiTro: 'Người kháng cáo', sendLabel: 'Gửi đơn',
    top: FCard('Xác nhận thông tin', RvKV([['Đơn kháng cáo', h(F, null, 'Kháng cáo bản án sơ thẩm số 25/2026/DS-ST · ', h('span', { className: 'tp-num' }, 'TN-20261025-0015'))], ['Tòa án nhận đơn', COURT1], ['Việc thực hiện', l.t]].concat(loai === 'rtb' ? [] : [[loai === 'rmp' ? 'Phần kháng cáo muốn rút' : 'Nội dung', loai === 'rmp' ? 'Rút phần kháng cáo về án phí sơ thẩm (Mục 2 phần Quyết định).' : 'Bổ sung đề nghị Tòa án cấp phúc thẩm xem xét chứng cứ chuyển khoản ngày 05-01-2026.']], [['Lý do', 'Không có']])), true),
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
    case 'sua': case 'suaLai': return { t: 'Tòa án yêu cầu sửa đổi, bổ sung đơn đề nghị · hạn 29-11-2026', han: 'Đọc văn bản yêu cầu trong Hộp thư tống đạt, sau đó sửa đổi, bổ sung đơn đề nghị.', btn: { l: 'Bổ sung', go: st === 'suaLai' ? 'gdtLai' : 'gsgdt1' }, more: [{ l: 'Rút đơn', go: 'grgdt1sua' }] };
    case 'suaHet': return { tone: 'danger', t: 'Tòa án yêu cầu sửa đổi, bổ sung đơn đề nghị · hạn 25-10-2026', han: 'Đọc văn bản yêu cầu trong Hộp thư tống đạt, sau đó sửa đổi, bổ sung đơn đề nghị.', two: [{ l: 'Bổ sung', khoa: '[Lý do khóa: đã quá hạn sửa đổi, bổ sung]' }, { l: 'Rút đơn', v: 'secondary', go: 'grgdt1sua' }], note: '[Lý do khóa: đã quá hạn sửa đổi, bổ sung]' };
    case 'nhap': return { tone: 'neutral', t: 'Đơn đang lưu tạm', han: 'Đơn đề nghị chưa được gửi đến Tòa án. Tiếp tục soạn để hoàn tất và gửi đơn.', btn: { l: 'Tiếp tục soạn', go: ten === 'tái thẩm' ? 'tx1' : 'gx1' } };
    case 'taiChinh': return { tone: 'neutral', t: '[Tình trạng giải quyết của đơn]', two: [{ l: 'Nộp tiền', go: 'dvcqgExt' }, { l: 'Đề nghị miễn, giảm án phí', v: 'secondary', go: 'mg1' }] };
    default: return { tone: 'info', t: 'Đơn đã đến hệ thống Tòa án', han: 'Đang chờ Tòa án vào sổ nhận đơn đề nghị.', btn: { l: 'Rút đơn', v: 'secondary', go: 'grgdt1' } };
  }
}
var GDT_BADGE = { gui: [['Đã gửi đơn', 'info']], sua: [['Đang xử lý', 'info'], ['Yêu cầu sửa đổi, bổ sung đơn đề nghị', 'warning']], suaLai: [['Đang xử lý', 'info'], ['Yêu cầu sửa đổi, bổ sung đơn đề nghị', 'warning']], suaHet: [['Đang xử lý', 'info'], ['Yêu cầu sửa đổi, bổ sung đơn đề nghị', 'warning']], nhap: [['Chưa gửi', 'neutral']], taiChinh: [['Đang xử lý', 'info'], ['[Tình trạng giải quyết]', 'warning']] };
/* v353 (QLD4-W04: văn bản tống đạt – nút Xem ngay tại dòng; văn bản của người khác ghi "Không có trong Hộp thư của bạn" */
function gdtVanBan() {
  return FCard('Văn bản tống đạt', h(F, null, P('Văn bản Tòa án gửi về đơn này', 'ph-muted dt-small'),
    DtDocs([['Thông báo yêu cầu sửa đổi, bổ sung đơn đề nghị', 'Văn bản tống đạt · 30-10-2026', null]], { the: true }),
    h('ul', { className: 'ph-ky dt-docs dt-docs-the' }, h('li', null, h('div', null, h('b', null, 'Thông báo thụ lý đơn đề nghị'), h('small', null, 'Văn bản tống đạt · 31-10-2026')), h('span', { className: 'q3-khac-t' }, 'Không có trong Hộp thư của bạn')))), true);
}
/* v353 (QLD4-W08: Danh sách đơn – nháp Tiếp tục soạn mở đúng trình tự theo loại nháp */
function gdtPhatSinh(ten) {
  return FCard('Danh sách đơn', h(F, null, P('Đơn ban đầu và các đơn sửa đổi, bổ sung, rút đơn đề nghị.', 'ph-muted dt-small'), h('ul', { className: 'qd-list dt-qc' }, [
    { loai: 'Đơn ban đầu', t: 'Đề nghị ' + ten + ' – 18/2026/DS-PT', tt: ['Đã gửi', 'info'], ma: 'TN-20261029-0020', ngay: ['Ngày gửi', '29-10-2026 09:00'], file: 'Don-de-nghi-TN-20261029-0020.pdf' },
    { loai: 'Đơn sửa đổi, bổ sung', t: 'Sửa đổi, bổ sung đơn đề nghị', tt: ['Lưu nháp', 'neutral'], ma: null, ngay: ['Lưu nháp', '02-11-2026 14:10'], go: 'gsgdt1' },
    { loai: 'Đơn rút', t: 'Yêu cầu rút đơn đề nghị ' + ten, tt: ['Lưu nháp', 'neutral'], ma: null, ngay: ['Lưu nháp', '03-11-2026 08:40'], go: 'grgdt1nhap' }].map(DtDonThe))), true);
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
    FCard(o.kyTitle || 'Ký số', h(F, null, o.kyMoTa === false ? null : P(o.kyMoTa || 'Ký số bản đơn và toàn bộ tài liệu đính kèm trước khi gửi.', 'ph-muted'),
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
    top: h(F, null, h(T.FormSection, { title: PBS_STEPS[0], sdGo: (loai === 'YC' ? 'ybs' : 'pbs') + '1' }, RvKV([['Đơn ' + c.ten, h('span', { className: 'tp-num' }, c.ma)], ['Văn bản yêu cầu', '[Số thông báo]'], ['Hạn', '08-11-2026']])), h(T.FormSection, { title: PBS_STEPS[1], sdGo: (loai === 'YC' ? 'ybs' : 'pbs') + '2' }, RvKV([['Tài liệu đã bổ sung', 'bien-nhan-dat-coc.pdf']])), h(T.FormSection, { title: PBS_STEPS[2], sdGo: (loai === 'YC' ? 'ybs' : 'pbs') + '3' }, RvKV([['Trường đã sửa', 'Nội dung yêu cầu']]))),
    bottom: HopGhi('Sau khi gửi', 'Hồ sơ bổ sung là đơn phát sinh, chỉ có trạng thái Đã gửi. Đơn ' + c.ma + ' vẫn ở "Đang xử lý đơn" cho đến khi Tòa án có kết quả.'),
    camDoan: 'Tôi cam đoan nội dung sửa đổi, bổ sung và tài liệu kèm theo là đúng sự thật.' });
}

function Prd1(loai, va) {
  var c = PT_L[loai || 'PT'];
  return WzSd({ tag: sdTagPT(loai),  title: prdTen(c, va), steps: PRD_STEPS, n: 1, go: prdId(loai, va) + '2', body: h(F, null, Lead('Bạn đề nghị Tòa án cho rút. Việc rút chỉ có hiệu lực khi Tòa án chấp nhận.'),
    FCard('Đơn bạn đề nghị rút', h(F, null, Lead('Kiểm tra đúng đơn trước khi tiếp tục. Thông tin lấy tự động, không sửa được.'),
      RvKV([['Mã tiếp nhận', h('span', { className: 'tp-num' }, c.ma)], ['Loại đơn', c.tieu], ['Ngày gửi', '28-10-2026 09:15'], ['Tòa án tiếp nhận', COURT1], ['Trạng thái hiện tại', va ? 'Đang xử lý · Đã đưa vào vụ án' : 'Đã gửi đơn'], ['Vụ án liên quan', c.va + ' · ' + c.vu]])), true)) });
}

function Prd2(p) {
  var c = PT_L[p.loai || 'PT'], ld = React.useState(p.err ? '' : 'r0'), tb = React.useState(p.err ? 'Đã xong' : 'Hai bên đã thỏa thuận xong ngày 01-11-2026, bị đơn đã trả đủ tiền.');
  return WzSd({ tag: sdTagPT(p.loai),  title: prdTen(c, p.va), steps: PRD_STEPS, n: 2, go: prdId(p.loai, p.va) + '3', body: h(F, null,
    FCard('Lý do rút', h(F, null, h(ChonThe, { label: 'Lý do rút', v: ld[0], onPick: ld[1], items: PT_RUT.map(function (x, i) { return { id: 'r' + i, t: x }; }) }), p.err && !ld[0] ? h('p', { className: 'q2-err', role: 'alert' }, h(T.Icon, { name: 'alert' }), 'Vui lòng chọn lý do rút.') : null), true),
    FCard('Trình bày', h(F, null, n7Tf('Trình bày', tb, { required: true, min: 10, max: 2000, placeholder: 'Hai bên đã thỏa thuận xong ngày …', error: p.err ? 'Trình bày lý do rút (tối thiểu 10 ký tự).' : undefined })), true)) });
}

function Prd3(loai, va) {
  var c = PT_L[loai || 'PT'], ten = va ? 'yêu cầu' : 'đơn';
  return h(KyGuiSd, { tag: sdTagPT(loai), sua: prdId(loai, va) + '2',  title: prdTen(c, va), steps: PRD_STEPS, ok: prdId(loai, va) + 'Ok', tep: [prdTen(c, va) + '.pdf'], tepMeta: 'Bản in đơn rút', vaiTro: c.tc, sendLabel: 'Gửi đơn',
    top: h(F, null, h(T.FormSection, { title: PRD_STEPS[0], sdGo: prdId(loai, va) + '1' }, RvKV([['Loại', va ? 'Rút toàn bộ yêu cầu' : 'Rút đơn'], ['Đơn ' + c.ten, h('span', { className: 'tp-num' }, c.ma)]])), h(T.FormSection, { title: PRD_STEPS[1], sdGo: prdId(loai, va) + '2' }, RvKV([['Lý do', PT_RUT[0]], ['Trình bày', 'Hai bên đã thỏa thuận xong ngày 01-11-2026, bị đơn đã trả đủ tiền.']]))),
    camDoan: 'Tôi hiểu hệ quả của việc rút ' + ten + ' ' + c.ten + ' và tự nguyện đề nghị Tòa án cho rút.' });
}

function PtdWz(p, n, body, rut) { var c = PT_L[p.loai || 'PT'], id = p.loai === 'YC' ? 'ytd' : 'ptd'; return WzSd({ tag: sdTagPT(p.loai),  title: ptdTen(c, n === 1 ? undefined : !!rut), steps: ptdSteps(rut), n: n, go: id + (rut ? 'R' : '') + (n + 1), body: body }); }

function Ptd5(p) {
  var c = PT_L[p.loai || 'PT'], rut = !!p.rut, id = p.loai === 'YC' ? 'ytd' : 'ptd';
  return h(KyGuiSd, { tag: sdTagPT(p.loai), sua: id + (rut ? 'R' : '') + '2',  title: ptdTen(c, rut), steps: ptdSteps(rut), ok: id + 'Ok', tep: [ptdTen(c, rut) + '.pdf'], tepMeta: 'Bản in đơn', vaiTro: c.tc, sendLabel: 'Gửi đơn',
    top: h(F, null, h(T.FormSection, { title: ptdSteps(rut)[0], sdGo: id + '1' }, RvKV([['Loại điều chỉnh', rut ? 'Rút một phần yêu cầu' : 'Thay đổi, bổ sung yêu cầu']])), h(T.FormSection, { title: ptdSteps(rut)[1], sdGo: id + (rut ? 'R' : '') + '2' }, RvKV([['Đơn ' + c.ten, h('span', { className: 'tp-num' }, c.ma)], ['Vụ án', c.va + ' · ' + c.vu], ['Nội dung đã nộp', c.yc], [rut ? 'Phần yêu cầu xin rút' : 'Nội dung sau thay đổi, bổ sung', rut ? 'Tiền lãi chậm trả' : c.yc + ' và tiền lãi chậm trả tính đến ngày xét xử sơ thẩm.']])), h(T.FormSection, { title: ptdSteps(rut)[2], sdGo: id + '3' }, RvKV([['Lý do', PTD_LD[rut ? 'TD-02' : 'TD-01'][1]], ['Trình bày', 'Sau khi có kết quả giám định ngày 05-11-2026, thiệt hại thực tế là 65.000.000 đồng.']])), h(T.FormSection, { title: ptdSteps(rut)[3], sdGo: id + '4' }, RvKV([['Tài liệu kèm theo', 'Không có']]))),
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
    FCard('Đơn kháng cáo của bạn', RvKV([['Mã đơn', h('span', { className: 'tp-num' }, 'TN-20261025-0015')], ['Văn bản bị kháng cáo', 'Bản án số 25/2026/DS-ST ngày 21-10-2026'], ['Phạm vi hiện tại', 'Một phần bản án'], ['Giai đoạn', '[Giai đoạn]'], ['Tòa án nhận đơn kháng cáo', COURT1]]), true),
    FCard('Bạn muốn làm gì với kháng cáo?', h(OptCards, { label: 'Việc thực hiện', cur: v[0], onPick: v[1], items: KCT_LOAI }), true)) });
}

function Kct2(p) {
  var rtb = p.loai === 'rtb', rmp = p.loai === 'rmp', nd = React.useState(rmp ? 'Rút phần kháng cáo về án phí sơ thẩm (Mục 2 phần Quyết định).' : 'Bổ sung đề nghị Tòa án cấp phúc thẩm xem xét chứng cứ chuyển khoản ngày 05-01-2026.'), ld = React.useState('');
  return WzSd({ tag: SD_KC,  title: 'Thay đổi, rút kháng cáo', steps: KCT_STEPS, n: 2, save: false, go: 'kct3' + (p.loai && p.loai !== 'td' ? p.loai : ''), body: h(F, null,
    rtb ? null : FCard(rmp ? 'Phần kháng cáo muốn rút' : 'Nội dung thay đổi, bổ sung', n7Tf(rmp ? 'Phần kháng cáo muốn rút' : 'Nội dung thay đổi, bổ sung', nd, { required: true, rows: 5, max: 2000, placeholder: rmp ? 'Mô tả cụ thể phần nào trong kháng cáo bạn muốn rút...' : 'Mô tả cụ thể phần nào trong kháng cáo bạn muốn thay đổi hoặc bổ sung thêm...' }), true),
    FCard('Lý do (không bắt buộc)', n7Tf('Lý do', ld, { rows: 4, max: 2000, placeholder: rtb ? 'Ví dụ: Các bên đã tự thỏa thuận được; bị đơn đã thi hành án tự nguyện...' : 'Trình bày lý do thay đổi hoặc rút kháng cáo nếu muốn...' }), true),
    rtb ? null : HopGhi('Giới hạn khi đã hết thời hạn kháng cáo', 'Nếu thời hạn kháng cáo đã hết, việc thay đổi, bổ sung không được vượt quá phạm vi kháng cáo ban đầu. Tòa án xác định việc này.')) });
}

function Kct3(loai) {
  var l = kctLoai(loai || 'td'), rut = loai === 'rmp' || loai === 'rtb';
  return h(KyGuiSd, { tag: SD_KC, sua: 'kct2',  title: 'Thay đổi, rút kháng cáo', steps: KCT_STEPS, save: false, ok: 'kctOk' + (loai && loai !== 'td' ? loai : ''), tep: ['Đơn ' + l.t.charAt(0).toLowerCase() + l.t.slice(1) + '.pdf'], tepMeta: 'Xem trước đơn', vaiTro: 'Người kháng cáo', sendLabel: 'Gửi đơn',
    top: FCard('Xác nhận thông tin', RvKV([['Đơn kháng cáo', h(F, null, 'Kháng cáo bản án sơ thẩm số 25/2026/DS-ST · ', h('span', { className: 'tp-num' }, 'TN-20261025-0015'))], ['Tòa án nhận đơn', COURT1], ['Việc thực hiện', l.t]].concat(loai === 'rtb' ? [] : [[loai === 'rmp' ? 'Phần kháng cáo muốn rút' : 'Nội dung', loai === 'rmp' ? 'Rút phần kháng cáo về án phí sơ thẩm (Mục 2 phần Quyết định).' : 'Bổ sung đề nghị Tòa án cấp phúc thẩm xem xét chứng cứ chuyển khoản ngày 05-01-2026.']], [['Lý do', 'Không có']])), true),
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
    top: FCard('Nội dung sửa đổi, bổ sung', RvKV([['Gắn vào đơn', h('span', { className: 'tp-num' }, 'TN-20261023-0014')], ['Phạm vi kháng cáo', 'Một phần bản án'], ['Lý do kháng cáo', 'Tòa án sơ thẩm chưa xem xét biên bản đo đạc ngày 10-08-2026.'], ['Đề nghị Tòa án cấp phúc thẩm', 'Hủy phần quyết định về ranh giới đất.'], ['Tài liệu đính kèm', '1 tệp']]), true),
    camDoan: N7_CAMDOAN });
}

function KcsOk() {
  return h(OkSd, { title: 'Đã nộp đơn sửa đổi, bổ sung thành công', text: 'Đơn sửa đổi, bổ sung đã được gửi đến Tòa án và gắn vào đơn kháng cáo của bạn.', info: [['Mã hồ sơ sửa đổi', h('span', { className: 'tp-num' }, 'SDBS-2026-0021')], ['Gắn vào đơn', h('span', { className: 'tp-num' }, 'TN-20261023-0014')], ['Thời điểm gửi', '04-11-2026 09:30']],
    btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'reset:records,appK_khangcao,appealDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,appK_khangcao' })) });
}

function KqhWz(n, body) { return WzSd({ tag: SD_KCQ,  title: 'Trình bày lý do kháng cáo quá hạn', steps: KQH_STEPS, n: n, go: 'kqh' + (n + 1), body: body }); }

function Kqh4() {
  return h(KyGuiSd, { tag: SD_KCQ, sua: 'kqh2',  title: 'Trình bày lý do kháng cáo quá hạn', steps: KQH_STEPS, ok: 'kqhOk', tep: ['Bản trình bày lý do kháng cáo quá hạn.pdf', 'giay-ra-vien.pdf'], tepMeta: 'Bản in trình bày lý do', vaiTro: 'Người kháng cáo',
    top: FCard('Xem lại lý do nộp sau thời hạn', RvKV([['Đơn kháng cáo', h('span', { className: 'tp-num' }, 'TN-20261020-0013')], ['Lý do nộp sau thời hạn', 'Từ ngày 02-10-2026 đến 18-10-2026 tôi điều trị nội trú tại Bệnh viện Bạch Mai nên không thể nộp đơn kháng cáo đúng hạn.'], ['Chứng cứ trở ngại', 'Tệp 1 · giay-ra-vien.pdf']]), true),
    camDoan: 'Tôi cam đoan nội dung trình bày và tài liệu chứng minh là đúng sự thật.' });
}

function KqhOk() {
  return h(OkSd, { title: 'Đã gửi bản trình bày lý do', text: 'Đã gửi bản trình bày lý do đến Tòa án. Kết quả xem xét sẽ được thông báo qua Hộp thư tống đạt.', info: [['Gắn vào đơn', h('span', { className: 'tp-num' }, 'TN-20261020-0013')], ['Thời điểm gửi', '04-11-2026 09:30']],
    btns: h(F, null, Btn('Xem chi tiết đơn', 'primary', { 'data-pt-go': 'reset:records,appK_khangcao,appealDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,appK_khangcao' })) });
}

function GrWz(k, n, body, go) { return WzSd({ tag: sdTagGdt(k),  title: 'Rút đơn', steps: GR_STEPS, n: n, go: go || ('gr' + k + (n + 1)), body: h(F, null, n === 1 ? Lead('Bạn đang đề nghị Tòa án cho rút đơn. Đơn chỉ được rút sau khi Tòa án phê duyệt.') : null, body) }); }

function Gr3(p) {
  return h(KyGuiSd, { tag: sdTagGdt(p.k), sua: 'gr' + p.k + '2',  title: 'Rút đơn', steps: GR_STEPS, kyTitle: 'Xem lại và ký gửi', lead: 'Cổng tự sinh đơn từ thông tin bạn đã khai. Muốn sửa, bấm Quay lại.', ok: 'gr' + p.k + 'Ok', tep: ['Xem trước đơn'], tepMeta: 'Đơn yêu cầu rút đơn đề nghị ' + grTen(p.k), vaiTro: 'Người đề nghị',
    top: FCard('Yêu cầu rút đơn', RvKV([['Đơn cần rút', h('span', { className: 'tp-num' }, 'GT-2026-0049')], ['Bản án, quyết định', 'Bản án phúc thẩm số 18/2026/DS-PT'], ['Lý do rút đơn', '[Các bên đã thỏa thuận được việc thi hành bản án]']]), true),
    camDoan: 'Tôi hiểu hệ quả của việc rút đơn và tự nguyện đề nghị Tòa án cho rút đơn này.' });
}

function GrOk(p) { return h(OkSd, { title: 'Đã gửi yêu cầu rút đơn đề nghị ' + grTen(p.k) + '.', text: 'Đơn chỉ được rút sau khi Tòa án phê duyệt. Kết quả gửi qua Hộp thư tống đạt.', btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'backTo:gdtDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applicationsGdt' })) }); }

function GsWz(k, n, body, go) { return WzSd({ tag: sdTagGdt(k),  title: 'Sửa đổi, bổ sung đơn', steps: GS_STEPS, n: n, go: go || ('gs' + k + (n + 1)), body: body }); }

function Gs4(p) {
  return h(KyGuiSd, { tag: sdTagGdt(p.k), sua: 'gs' + p.k + '2',  title: 'Sửa đổi, bổ sung đơn', steps: GS_STEPS, kyTitle: 'Xem lại và ký gửi', lead: 'Kiểm tra lại đơn, ký số rồi gửi tới Tòa án.', ok: 'gs' + p.k + 'Ok', tep: ['Xem trước đơn', 'bien-ban-do-dac-hien-trang.pdf'], tepMeta: 'Đơn sửa đổi, bổ sung', vaiTro: 'Người đề nghị',
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
        ['Số tiền tạm ứng theo thông báo', '1.250.000 đ'], ['Hạn nộp', sap ? '15-11-2026' : '06-11-2026'], ['Số tiền nếu được giảm 50%', '625.000 đ'], ['Tình trạng', 'Chưa nộp']]), true),
      FCard('Bạn đề nghị miễn hay giảm?', h(F, null, Lead('Hai thủ tục khác nhau về mức miễn giảm, đối tượng áp dụng và giấy tờ phải có.'),
        h(ChonThe, { label: 'Bạn đề nghị miễn hay giảm?', v: l[0], onPick: l[1], items: [
          { id: 'mien', t: 'Miễn 100% tạm ứng án phí, án phí', d: 'Dành cho người lao động đòi quyền lợi, người yêu cầu cấp dưỡng, hộ nghèo, hộ cận nghèo, người cao tuổi, người khuyết tật, người có công, đồng bào dân tộc thiểu số ở xã đặc biệt khó khăn, thân nhân liệt sĩ (Điều 12 Nghị quyết 326/2016/UBTVQH14).', tag: 'Không phải nộp' },
          { id: 'giam', t: 'Giảm 50% tạm ứng án phí, án phí', d: 'Dành cho người gặp sự kiện bất khả kháng dẫn đến không còn đủ tài sản để nộp (Điều 13 Nghị quyết 326/2016/UBTVQH14). Bắt buộc có giấy xác nhận của UBND cấp xã.', tag: 'Còn nộp 625.000 đ' }] })), true)))) }),
    p.daGui ? h(DlgOver, { title: 'Bạn đã nộp đơn đề nghị miễn, giảm', desc: 'Bạn đã nộp 1 đơn đề nghị miễn, giảm cho đơn này (MG-2026-0012, gần nhất lúc 05-11-2026 09:30). Bạn có muốn tiếp tục nộp thêm đơn mới không?', ok: 'Tiếp tục nộp', huy: 'Quay lại', go: 'mg1' } /* W01 */) : null);
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
    RvKV([['Mã đơn', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Loại đơn', 'Đơn khởi kiện – Tranh chấp hợp đồng vay tài sản'], ['Ngày gửi', '20-10-2026'], ['Tòa án tiếp nhận', COURT1], ['Trạng thái hiện tại', 'Đã gửi đơn'], ['Vụ án liên quan', 'Chưa phát sinh']])), true) });
}

function Rd2() {
  var l = React.useState('RD-1'), t = React.useState('');
  return WzSd({ tag: SD_KK,  title: 'Rút đơn', steps: RD_STEPS, n: 2, go: 'rd3', body: h(F, null,
    FCard('Lý do rút đơn', h(F, null, Lead('Thông tin này giúp Tòa án xử lý yêu cầu nhanh hơn.'),
      h(ChonThe, { label: 'Lý do rút đơn', v: l[0], onPick: l[1], items: RD_LYDO.map(function (x) { return { id: x[0], t: x[1], d: x[2] }; }) }),
      Tf('Trình bày', { required: l[0] === 'RD-5', multiline: true, value: t[0], onChange: function (e) { t[1](e.target.value); }, placeholder: 'Hai bên đã thỏa thuận xong ngày 20-06-2026…', error: l[0] === 'RD-5' && t[0].length > 0 && t[0].length < 15 ? 'Nêu rõ lý do rút đơn (tối thiểu 15 ký tự).' : undefined })), true),
    h('div', { className: 'rd-hq' }, h('p', { className: 'rd-hq-h' }, h(T.Icon, { name: 'alert' }), 'Hệ quả của việc rút đơn ở trạng thái hiện tại'),
      h('div', { className: 'rd-hq-c' }, h('b', null, 'Việc giải quyết đơn sẽ chấm dứt'), h('p', null, 'Tòa án ra quyết định phù hợp với giai đoạn hiện tại của đơn.'))),
    FCard('Tiền tạm ứng án phí liên quan', RvKV([['Số tiền theo thông báo', '—'], ['Tình trạng nộp', 'Chưa nộp'], ['Nếu đã nộp', 'Quyền hoàn trả được xử lý tại mục Nghĩa vụ tài chính']]), true)) });
}

function Rd3(p) {
  p = p || {};
  return h(F, null, h(KyGuiSd, { tag: SD_KK, sua: 'rd2',  title: 'Rút đơn', steps: RD_STEPS, kyTitle: 'Xem lại và ký gửi', ok: 'rdOk', tep: ['Đơn yêu cầu rút đơn khởi kiện'], tepMeta: 'Xem trước đơn', vaiTro: 'Người khởi kiện',
    top: h(F, null, p.chan ? h('div', { className: 'q2-chan q5-chan', role: 'alert' }, h('p', null, 'Chỉ người khởi kiện, đồng khởi kiện hoặc người đại diện được tạo đơn yêu cầu rút đơn.')) : null,
      FCard('Yêu cầu rút đơn', RvKV([['Đơn cần rút', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Lý do rút đơn', 'Các bên đã tự thỏa thuận được với nhau']]), true)) }));
}

function RdOk() { return h(OkSd, { title: 'Đã gửi yêu cầu rút đơn.', btns: h(F, null, Btn('Về chi tiết đơn', 'primary', { 'data-pt-go': 'backTo:appDetail' }), Btn('Về Quản lý đơn', 'secondary', { 'data-pt-go': 'reset:records,applications' })) }); }

function Sd1(p) {
  p = p || {}; var han = p.han || 'con';
  var pill = { con: ['Còn 3 ngày', 'sap'], qua: ['Quá hạn 2 ngày', 'qua'], vo: ['Vô thời hạn', 'an'] }[han];
  var dong = han === 'vo' ? 'Văn bản tống đạt ngày 22-10-2026 không quy định hạn nộp bản sửa.' : 'Hạn ' + (han === 'qua' ? '11-11-2026' : '06-11-2026') + ' (tính từ ngày tống đạt 22-10-2026).';
  return WzSd({ tag: SD_KK,  title: 'Sửa đơn theo yêu cầu', steps: SD_STEPS, n: 1, go: 'sd2', body: h(F, null,
    FCard('Đơn đang có yêu cầu sửa đổi, bổ sung', RvKV([['Mã hồ sơ', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Đơn liên quan', 'Đơn khởi kiện – Tranh chấp hợp đồng vay tài sản'], ['Trạng thái', 'Đã gửi đơn']]), true),
    FCard('Yêu cầu của Tòa án', h(F, null, RvKV([['Văn bản yêu cầu', 'Thông báo yêu cầu sửa đổi, bổ sung đơn khởi kiện số [Số thông báo]'], ['Đơn liên quan', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Tòa án yêu cầu', COURT1], ['Ngày tống đạt', '22-10-2026']]),
      h('p', { className: 'sd-han' }, h('span', { className: 'ib-due ib-due-' + pill[1] }, pill[0]), dong),
      HopGhi('Nội dung Tòa án yêu cầu', '[Nội dung yêu cầu sửa đổi, bổ sung theo thông báo]')), true)) });
}

function Sd2(p) {
  p = p || {};
  if (!p.tep) return WzSd({ tag: SD_KK,  title: 'Sửa đơn theo yêu cầu', steps: SD_STEPS, n: 2, go: 'sd3', body: h(F, null,
    FCard('Biểu mẫu điện tử', h(F, null, Lead('Biểu mẫu điện tử "Tranh chấp hợp đồng vay tài sản" bên dưới đã nạp lại toàn bộ nội dung đơn ban đầu. Bạn có thể sửa đổi, bổ sung trực tiếp trên biểu mẫu theo yêu cầu của Tòa án.'),
      Tf('Nội dung yêu cầu khởi kiện', { required: true, multiline: true, defaultValue: 'Đề nghị Tòa án buộc ông Trần Văn Bình trả số tiền vay 200.000.000 đồng và tiền lãi theo hợp đồng vay tài sản ngày 10-01-2026.' }),
      Tf('Yêu cầu khác', { multiline: true, placeholder: 'Không bắt buộc' }),
      P('Viết thành nội dung hoàn chỉnh để Tòa án đưa nguyên văn vào hồ sơ, không viết dạng ghi chú sửa đổi.', 'ph-muted dt-small')), true),
    FCard('Đơn đã nộp', DtDocs([['Đơn khởi kiện', 'don-khoi-kien-TN-20261020-0012.pdf · Đã ký số']]), true /* v380: mở sẵn */)) });
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
  var rows = React.useState(p.err ? [] : [{ nd: 'Buộc bị đơn trả số tiền vay', gt: '200.000.000', mt: 'Theo hợp đồng vay ngày 10-01-2026' }, { nd: 'Buộc bị đơn trả tiền lãi', gt: '18.000.000', mt: 'Lãi 9%/năm tính đến ngày nộp đơn' }]);
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
    Tf('Tóm tắt quá trình sự việc', { required: true, multiline: true, rows: 4, defaultValue: 'Ngày 10-01-2026 tôi cho ông Trần Văn Bình vay 200.000.000 đồng, có hợp đồng vay tài sản và giấy nhận tiền. Đến hạn ông Bình chỉ trả 100.000.000 đồng tiền gốc, tôi đã nhiều lần nhắc nhưng không trả phần còn lại.' })), true);
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
  return h(KyGuiSd, { tag: SD_KK3, sua: 'tr2',  title: 'Thay đổi, rút yêu cầu', steps: trSteps(), kyTitle: 'Xem lại và ký gửi', ok: 'trOk', vaiTro: 'Nguyên đơn', tep: [rut ? 'Bản in Đơn đề nghị rút một phần yêu cầu' : 'Bản in Đơn thay đổi, bổ sung yêu cầu'], tepMeta: 'Xem trước đơn',
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
var HGR_STEPS = ['Quyết định đề nghị xem xét lại', 'Căn cứ đề nghị', 'Tài liệu kèm theo', 'Xem lại và ký gửi'];
var HGR_QD = [{ id: 'q1', t: 'QĐ-15/2026/QĐ-CNHG', d: 'Ngày 25-10-2026 · Tranh chấp hợp đồng mua bán · còn 6 ngày' }, { id: 'q2', t: 'QĐ-09/2026/QĐ-CNHG', d: 'Ngày 12-10-2026 · Tranh chấp hợp đồng thuê nhà · quá hạn 3 ngày' }];
function HgrWz(n, body, nhap) { return WzSd({ title: 'Đề nghị xem xét lại quyết định công nhận', tag: SD_HG, steps: HGR_STEPS, n: n, go: 'hgr' + (n + 1), body: h(F, null, nhap ? h('div', { className: 'q6-nhap' }, h(T.StatusBadge, { tone: 'neutral', icon: false }, 'Đang soạn nháp')) : null, body) }); }
function Hgr1(p) {
  p = p || {}; var q = React.useState(p.qua ? 'q2' : 'q1'), tn = React.useState(false), lt = React.useState(''), qua = q[0] === 'q2';
  return h(F, null, HgrWz(1, h(F, null,
    FCard('Quyết định công nhận kết quả hòa giải thành', h(F, null, Lead('Chọn quyết định bạn đề nghị xem xét lại.'), h(OptCards, { label: 'Quyết định công nhận', cur: q[0], onPick: q[1], items: HGR_QD })), true),
    h('section', { className: 'q4-han' + (qua ? ' q4-han-do' : '') }, h('small', null, 'Thời hạn đề nghị (15 ngày)'), h('b', null, qua ? 'Đã quá hạn 3 ngày' : 'Hạn xử lý: Còn 6 ngày (đến ngày 09-11-2026)'),
      h('p', { className: 'q4-han-hq' }, 'Lưu ý: Tính từ ngày nhận được quyết định hoặc từ ngày biết được nội dung quyết định. Quá thời hạn này, đề nghị xem xét lại sẽ không được chấp nhận thụ lý.')),
    h('div', { className: 'ph-commit hg-cb' }, h(T.Checkbox, { checked: tn[0], onChange: function (e) { tn[1](e.target.checked); }, label: 'Có thời gian bất khả kháng/trở ngại khách quan cần loại trừ khi tính hạn' }),
      tn[0] ? Tf('Thời gian, lý do bất khả kháng hoặc trở ngại khách quan', { required: true, value: lt[0], onChange: function (e) { lt[1](e.target.value); }, placeholder: 'Nêu khoảng thời gian và lý do bất khả kháng/trở ngại khách quan' }) : null),
    FCard('Chi tiết quyết định', RvKV([['Số quyết định', qua ? 'QĐ-09/2026/QĐ-CNHG' : 'QĐ-15/2026/QĐ-CNHG'], ['Ngày ra quyết định', qua ? '12-10-2026' : '25-10-2026'], ['Vụ việc liên quan', qua ? 'Tranh chấp hợp đồng thuê nhà' : 'Tranh chấp hợp đồng mua bán'], ['Tòa án ra quyết định', COURT1], ['Hòa giải viên', '[Hòa giải viên]'], ['Nội dung công nhận', '[Nội dung công nhận]']]), true)), p.nhap),
    p.nhap ? h(AutoSnack, { m: '[Đã nạp bản nháp]' }) : null);
}
function Hgr2(p) {
  p = p || {}; var cc = React.useState(p.err ? '' : 'c2'), nd = React.useState(p.err ? 'Không tự nguyện' : 'Tại buổi hòa giải ngày 15-10-2026, tôi đã nêu ý kiến không đồng ý nhưng biên bản vẫn ghi là thỏa thuận thành, xâm phạm đến quyền lợi của tôi.');
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
  return h(KyGuiSd, { title: 'Đề nghị xem xét lại quyết định công nhận', tag: SD_HG, steps: HGR_STEPS, ok: 'hgrOk', sua: 'hgr2', kyTitle: 'Ký số đơn đề nghị xem xét lại', tep: ['Đơn đề nghị xem xét lại.pdf', 'bien-ban-hoa-giai.pdf'], tepMeta: 'Xem trước đơn', vaiTro: 'Người đề nghị', sendLabel: 'Ký và Gửi đơn', lead: 'Kiểm tra lại đơn, ký số rồi gửi tới Tòa án.',
    top: FCard('Đề nghị xem xét lại', RvKV([['Quyết định bị đề nghị xem xét lại', 'QĐ-15/2026/QĐ-CNHG · ' + COURT1], ['Tòa án nhân dân giải quyết đề nghị', 'Tòa án nhân dân cấp trên trực tiếp của ' + COURT1], ['Hòa giải viên tiến hành hòa giải', '[Hòa giải viên]'], ['Thời hạn đề nghị (15 ngày)', 'Còn 6 ngày'], ['Căn cứ đề nghị (Điều 33 Luật Hòa giải, đối thoại tại Tòa án)', HG_CC_33[2]], ['Nội dung trình bày đề nghị xem xét lại', 'Tại buổi hòa giải ngày 15-10-2026, tôi đã nêu ý kiến không đồng ý nhưng biên bản vẫn ghi là thỏa thuận thành…']]), true),
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
function KnhWz(k, n, body, last) { var t = knhTiep(); return Wz({ title: KNH[k].ten, steps: knhSteps(k), n: n, go: k + (n + 1) + (t ? 'T' : ''), body: t ? h(F, null, KnhTiepBanner(), body) : body, last: last }); } /* v458: tố cáo tiếp */
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
/* KyGui: nếu có o.chia thì phần Xem lại hiện các khối con gập/mở có nút sửa (như bước 6 Soạn đơn); không có thì giữ như cũ
   đối chiếu 1G.1 / 1G.2 (21/11/2026) – thuộc tính tùy chọn, mặc định giữ như cũ: o.wz/o.sub (khung có dòng phụ), o.dangTao / o.loiTao (đang tạo đơn, lỗi + Thử lại),
   o.donDaKy (nhãn "Đã ký" ở dòng đơn), o.cdCtrl (nút gửi mở khi đã ký VÀ đã tích cam đoan), o.daKy0 / o.cd0 (trạng thái ban đầu), o.dangGui, o.onGui */
function KyGui(o) {
  var ky = React.useState(!!o.daKy0), sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), da = ky[0], cd = React.useState(!!o.cd0);
  var tep = [o.donTep].concat(o.tl.map(function (d) { return d[1]; })), mo = da && (!o.cdCtrl || cd[0]);
  var dsKy = o.dangTao ? TlDang('Đang tạo đơn để ký số…') : o.loiTao ? h('div', { className: 'tl-loitao' }, TlLoi(o.loiTao), TlThuLai()) : h('ul', { className: 'ph-ky' },
    h('li', null, h('div', null, h('b', null, o.don)), o.donDaKy && da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : null, IcoBtn('eye', 'Xem ' + o.don)),
    laTC() ? h(KyTcRows, { tep: tep, onXong: function () { ky[1](true); } }) : h('li', null, h('span', { className: 'ph-ky-no' }, '1'), h('div', null, h('b', null, 'Hoàng Dương'), h('small', null, o.vaiTro), da ? h('small', { className: 'ph-ky-da' }, KY_LUC) : null),
      da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn', onClick: function () { sh[1](true); } }, 'Ký số')));
  var last = o.dangGui ? h(T.Button, { loading: true, disabled: true }, 'Đang gửi yêu cầu…')
    : o.onGui && mo ? h(T.Button, { className: 'pt-chk', onClick: o.onGui }, o.btn)
    : Btn(o.btn, 'primary', mo ? { 'data-pt-go': 'replace:' + o.ok } : o.cdCtrl ? { disabled: true } : { disabled: true, title: 'Vui lòng ký số trước khi gửi' });
  return (o.wz || Wz)({ title: o.title, sub: o.sub, nguonB: o.nguonB, steps: o.steps, n: o.n, body: h(F, null, h('span', { ref: anchor, hidden: true }), o.top || null, /* v458: khung đầu bước (tố cáo tiếp) */
    o.review ? FCard(o.rvTitle, h(F, null, o.rvDesc ? Lead(o.rvDesc) : null, o.chia ? knChia(o.review, o.chia) : RvKV(o.review)), true) : null, /* v406: qd không có khối xem lại như web */
    FCard('Ký số', h(F, null, o.moTa ? kyMoTa(o.moTa) : null, dsKy), true, da ? 'signed' : 'unsigned'),
    o.tl.length ? FCard('Tài liệu đính kèm (' + o.tl.length + ' tệp)', h('ul', { className: 'ph-ky' }, o.tl.map(function (d) {
      return h('li', { key: d[1] }, h('div', null, h('b', null, d[0]), h('small', null, d[1])), da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : null, IcoBtn('eye', 'Xem ' + d[1]));
    })), true) : null,
    h('div', { className: 'ph-commit' }, o.cdCtrl ? h(T.Checkbox, { label: o.camDoan, checked: cd[0], onChange: function (e) { cd[1](e.target.checked); } }) : h(T.Checkbox, { label: o.camDoan })),
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: tep, onClose: function () { sh[1](false); }, onKy: function () { sh[1](false); ky[1](true); } }), host) : null),
    last: last });
}
/* khiếu nại trả lại đơn: "Thủ tục bạn đã chọn" dùng khối thường như các luồng trong vụ án */
function KrThuTuc() {
  return FCard('Thủ tục bạn đã chọn', h(F, null, h('div', { className: 'kn-tt-h' }, h('b', null, 'Khiếu nại việc trả lại đơn khởi kiện'), h(T.Tag, null, 'Điều 194 BLTTDS')),
    RvKV([['Gửi tới', 'Chánh án Tòa án đã trả lại đơn khởi kiện'], ['Hạn cuối khiếu nại', '10-11-2026'], ['Thủ tục áp dụng', '10 ngày kể từ ngày nhận được văn bản trả lại đơn khởi kiện (Điều 194.1)']])), true);
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
      h('span', { className: 'q1n-han' + (p.het ? ' q1n-han-het' : '') }, h(T.Icon, { name: 'clock' }), p.het ? 'Đã hết thời hiệu khiếu nại' : 'Hạn khiếu nại: 23-11-2026')),
    h('p', null, 'Nếu cho rằng văn bản, thông báo tố tụng này trái pháp luật, bạn có quyền gửi đơn khiếu nại tới Tòa án.' + (p.het ? ' Hạn khiếu nại: 05-11-2026.' : '')),
    h(T.Button, { variant: 'secondary', icon: 'pen', className: 'kn-vb-btn', disabled: !!p.het, 'data-pt-go': p.het ? undefined : 'complaintForm' }, 'Khiếu nại văn bản này'));
}
function Knh5(k) {
  var x = KNH[k], t = knhTiep(); /* v458 */
  return KyGui({ top: t ? KnhTiepBanner() : null, title: KNH[k].ten, steps: knhSteps(k), n: 5, rvTitle: 'Xem lại, ký số và gửi', rvDesc: 'Sau khi gửi, bạn không sửa được đơn. Muốn thay đổi thì rút đơn và gửi đơn mới.',
    chia: [[knhSteps(k)[0], ['Loại đơn', 'Hồ sơ đã tố cáo', 'Người đại diện', 'Tổ chức gửi đơn'], k + '1' + (t ? 'T' : '')], [knhSteps(k)[1], [x.b2], k + '2' + (t ? 'T' : '')], [knhSteps(k)[2], ['Tòa án nhận đơn', 'Tiêu đề đơn', 'Nội dung', 'Lý do tố cáo tiếp'], k + '3' + (t ? 'T' : '')], [knhSteps(k)[3], ['Tài liệu kèm theo', 'Tùy chọn tố cáo'], k + '4' + (t ? 'T' : '')]], review: [['Loại đơn', (t ? 'Tố cáo tiếp' : x.loai) + ' — ' + x.ten]].concat(t ? [['Hồ sơ đã tố cáo', h('span', { className: 'tp-num' }, 'TC-2026-0004')]] : [], [ [laTC() ? 'Tổ chức gửi đơn' : 'Người đại diện', 'Hoàng Dương · CCCD: 001090012345 · SĐT: 0912345678 · [địa chỉ liên hệ]'], [x.b2, t ? 'Phạm Văn Đức · Cán bộ bộ phận tiếp nhận hồ sơ · ' + COURT1 : '[Họ tên] · [Chức vụ] · [Nơi công tác]'], ['Tòa án nhận đơn', t ? 'Tòa án nhân dân Thành phố Hà Nội' : COURT1], ['Tiêu đề đơn', '[Tiêu đề đơn]'], [t ? 'Lý do tố cáo tiếp' : 'Nội dung', t ? '[Lý do tố cáo tiếp]' : '[Nội dung]'], ['Tài liệu kèm theo', t ? 'Kết luận nội dung tố cáo (văn bản kết quả hồ sơ gốc), Ảnh chụp biên bản (Khác)' : 'Ảnh chụp biên bản (Khác)']]).concat(k === 'ktc' ? [['Tùy chọn tố cáo', t ? 'Đề nghị áp dụng biện pháp bảo vệ người tố cáo' : 'Không']] : []),
    moTa: 'Đơn và toàn bộ tài liệu kèm theo được ký một lần bằng chữ ký số cá nhân của Hoàng Dương.', don: 'Đơn ' + x.w, donTep: 'don-' + k + '.pdf', vaiTro: 'Người gửi đơn', tl: (t ? [['Kết luận nội dung tố cáo', 'ket-luan-noi-dung-to-cao.pdf']] : []).concat([['Ảnh chụp biên bản', 'anh-chup-bien-ban.pdf']]),
    camDoan: 'Tôi cam đoan nội dung đơn và tài liệu kèm theo là đúng sự thật, chịu trách nhiệm trước pháp luật.', btn: 'Gửi đơn', ok: k + 'Ok' });
}

function Knv4(k, o) {
  o = o || {}; var t = knvTT(k), tc = k === 'ktv', qd = k === 'kqd';
  var va = o.kg ? 'Không gắn vụ án' : 'DS-2026-0012 · Tranh chấp hợp đồng vay tài sản';
  var review = qd ? [['Thủ tục', knvTen(k, o)], o.don ? ['Đơn', 'Đơn [Số tiếp nhận] — Tranh chấp hợp đồng thuê nhà'] : ['Vụ án', va], o.lan2 ? ['Hồ sơ lần đầu', 'KNTT-2026-0009'] : null, ['Văn bản bị khiếu nại', o.lan2 ? 'Quyết định giải quyết khiếu nại · số 12/2026/QĐ-GQKN' : o.don ? 'Thông báo trả lại đơn khởi kiện · số [Số thông báo]' : 'Thông báo không chấp nhận yêu cầu thu thập chứng cứ · số [Số thông báo]'],
    ['Cơ quan giải quyết', o.lan2 ? 'Chánh án Tòa án cấp trên trực tiếp' : o.don ? 'Chánh án Tòa án đã trả lại đơn' : 'Chánh án Tòa án đang giải quyết vụ án'], ['Tóm tắt', '[Tóm tắt nội dung khiếu nại]'], ['Yêu cầu giải quyết', '[Yêu cầu giải quyết khiếu nại]'], ['Tài liệu, chứng cứ', '[Tài liệu, chứng cứ]']]
    : [['Loại việc', knvTen(k, o)], ['Vụ án liên quan', va], ['Tòa án', o.lan2 ? 'Tòa án nhân dân Thành phố Hà Nội' : COURT1], o.kg ? ['Số hồ sơ, vụ việc khai', '45/2026/TLST-DS'] : null,
      /* v406: bỏ dòng Hồ sơ lần đầu (web không có) */
      [tc ? 'Người bị tố cáo' : 'Người có hành vi bị khiếu nại', 'Nguyễn Văn B · Thư ký Tòa án'], tc ? null : ['Ngày biết được hành vi', '10-10-2026'], ['Thủ tục áp dụng', t.ten], ['Cơ quan giải quyết', t.cq],
      [tc ? 'Nội dung tố cáo (tóm tắt)' : 'Tóm tắt', '[Tóm tắt]'], [tc ? 'Yêu cầu, đề nghị' : 'Yêu cầu giải quyết', '[Yêu cầu]'],
      ['Tư cách người ' + KNV[k].w, 'Hoàng Dương (chính bạn) · ' + (o.kg && !tc ? 'Người bảo vệ quyền và lợi ích hợp pháp của đương sự' : o.kg ? '—' : 'Nguyên đơn')],
      tc ? ['Bảo vệ người tố cáo', 'Giữ bí mật họ tên, địa chỉ, bút tích và thông tin cá nhân của người tố cáo; đề nghị áp dụng biện pháp bảo vệ người tố cáo'] : null];
  var tl = qd ? [] /* v406: web chỉ ký đơn và tài liệu người dùng tải lên */ : o.kg && k === 'khv' ? [['Giấy tờ chứng minh tư cách người bảo vệ', 'giay-chung-nhan-nguoi-bao-ve.pdf']] : tc ? [['Tài liệu, chứng cứ chứng minh nội dung tố cáo', 'chung-cu-to-cao.pdf']] : [];
  return KyGui({ title: knvTen(k, o), steps: knvSteps(k), n: 4, rvTitle: 'Xem lại và ký gửi', rvDesc: 'Kiểm tra lại toàn bộ thông tin trước khi ký số và gửi đến Tòa án.',
    review: qd ? null : review.filter(Boolean), /* v406 */ chia: [[knvSteps(k)[0], ['Thủ tục', 'Loại việc', 'Đơn', 'Vụ án', 'Tòa án', 'Số hồ sơ', 'Hồ sơ lần đầu', 'Văn bản bị khiếu nại', 'Cơ quan giải quyết', 'Người có hành vi', 'Người bị tố cáo', 'Ngày biết'], k + '1' + knvSfx(o)], [knvSteps(k)[1], ['Tóm tắt', 'Nội dung tố cáo', 'Yêu cầu', 'Tư cách', 'Bảo vệ người tố cáo'], k + '2' + knvSfx(o)], [knvSteps(k)[2], ['Tài liệu'], k + '3' + knvSfx(o)]],
    moTa: null, /* v408: bỏ lời dẫn ký số */ don: o.lan2 ? KNV[k].don + ' lần 2' : KNV[k].don, donTep: 'don-' + KNV[k].w.replace(/ /g, '-') + (o.lan2 ? '-lan-2' : '') + '.pdf', vaiTro: 'Người ' + KNV[k].w, tl: tl,
    camDoan: tc ? 'Tôi cam đoan những nội dung tố cáo và tài liệu kèm theo là đúng sự thật; tôi hiểu rằng việc tố cáo sai sự thật có thể bị xử lý theo quy định của pháp luật.' : 'Tôi cam đoan những nội dung khiếu nại và tài liệu kèm theo là đúng sự thật; tôi hiểu rằng việc khiếu nại sai sự thật có thể bị xử lý theo quy định của pháp luật.',
    btn: 'Gửi đơn', ok: 'kvaOk' + (o.don ? 'Don' : '') + (o.lan2 ? 'L' : '') + (tc ? 'Tc' : '') });
}

function KnTiep(p) {
  var nd = React.useState(''), ck = React.useState(false), yk = React.useState(p.yKien ? '' : null), tr = React.useState(false), ky = React.useState(false), sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor);
  var loi = yk[0] === '' ? 'Chọn đồng ý hoặc không đồng ý với dự thảo kết luận.' : (p.yKien ? (yk[0] === 'khong' && nd[0].trim().length < 10 ? 'Nêu rõ căn cứ bạn không đồng ý (tối thiểu 10 ký tự).' : null) : (nd[0].trim().length < 15 ? p.loiNd : null)) || (!ck[0] ? 'Vui lòng xác nhận cam kết trước khi gửi.' : null);
  return SubS(p.eyebrow, h(F, null, h('span', { ref: anchor, hidden: true }), h('p', { className: 'kn-eb' }, p.title),
    FCard('Hồ sơ', RvKV([['Hồ sơ gốc', h('span', { className: 'tp-num' }, p.goc)], ['Mã hồ sơ mới', 'Cấp sau khi gửi']]), true),
    p.note || null,
    p.yKien ? FCard('Văn bản kết quả', DtDocs([['Dự thảo kết luận nội dung tố cáo', 'Kết quả xử lý đã nhận · 28-10-2026']]), true) : null,
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
  var hd = h(T.Stepper, { steps: ['Lý do rút', 'Xác nhận và gửi'], current: b[0] });
  var body = b[0] === 0 ? h(F, null, NvCallS('info', tc ? 'Người tố cáo có quyền rút toàn bộ hoặc một phần nội dung tố cáo trước khi người giải quyết ra kết luận nội dung tố cáo (Điều 33 Luật Tố cáo 2018).' : 'Người khiếu nại có thể rút khiếu nại tại bất cứ thời điểm nào trong quá trình khiếu nại và giải quyết khiếu nại (Điều 10 Luật Khiếu nại 2011; Điều 194, 504 Bộ luật Tố tụng dân sự 2015 đối với khiếu nại trong tố tụng).'),
    FCard('Hình thức rút', h(F, null, h(T.Tabs, { variant: 'chip', label: 'Hình thức rút', value: ht[0], onChange: ht[1], items: [{ key: '1', label: 'Rút toàn bộ' }, { key: '0', label: 'Rút một phần' }] }),
      ht[0] === '0' ? Tf('Phần nội dung muốn rút', { multiline: true, value: pr[0], onChange: function (e) { pr[1](e.target.value); }, placeholder: 'Nêu rõ phần nội dung ' + word + ' muốn rút…', error: tr[0] && loiPr ? loiPr : undefined }) : null), true),
    FCard('Lý do rút đơn', h(F, null, h(ChonThe, { label: 'Lý do rút đơn', v: ld[0], onPick: ld[1], items: KN_LD_RUT }),
      ld[0] === 'khac' ? Tf('Lý do khác', { multiline: true, value: lk[0], onChange: function (e) { lk[1](e.target.value); }, placeholder: 'Nêu rõ lý do rút đơn…', error: tr[0] && loiLd ? loiLd : undefined }) : null), true))
    : h(F, null, FCard('Xác nhận', RvKV([['Hồ sơ rút', h('span', { className: 'tp-num' }, ma)], ['Hình thức', ht[0] === '1' ? 'Rút toàn bộ' : 'Rút một phần'], ['Lý do', lyDo]].concat(ht[0] === '0' ? [['Phần nội dung xin rút', pr[0]]] : [])), true),
      NvCallS('warning', 'Sau khi rút, hồ sơ sẽ không được xem xét tiếp.'),
      h('div', { className: 'ph-commit' }, h(T.Checkbox, { checked: xn[0], onChange: function (e) { xn[1](e.target.checked); }, label: 'Tôi xác nhận rút đơn ' + word + ' này.', error: tr[0] && !xn[0] ? 'Vui lòng xác nhận trước khi gửi' : undefined })));
  return SubStep('Rút đơn ' + word, ['Lý do rút', 'Xác nhận và gửi'], b[0] + 1, body,
    b[0] === 0 ? Bar(Btn('Hủy', 'secondary', { 'data-pt-go': 'back' }), Btn(h(F, null, 'Tiếp tục', h(T.Icon, { name: 'chevronRight' })), 'primary', { onClick: function () { if (loiPr || loiLd) tr[1](true); else { tr[1](false); b[1](1); } } }))
      : Bar(Btn('Quay lại', 'secondary', { onClick: function () { b[1](0); } }), xn[0] ? Btn('Xác nhận rút đơn', 'primary', { 'data-pt-go': 'backTo:complaints', 'data-pt-snack': 'Đã rút ' + word + ' hồ sơ ' + ma + '.' }) : Btn('Xác nhận rút đơn', 'primary', { onClick: function () { tr[1](true); } })));
}

function Kr3() {
  return Wz({ title: KR_TITLE, steps: KR_STEPS, n: 3, go: 'kr4', body: h(F, null,
    h(TaiLieuCard, { title: 'Tài liệu, chứng cứ kèm theo', desc: 'Hệ thống tự lấy các tài liệu đã có trên Cổng. Bạn chỉ cần tải lên tài liệu, chứng cứ do bạn cung cấp.', he: [['Đơn khiếu nại — hệ thống tạo tự động từ nội dung bạn đã khai', 'Đã có trên hệ thống'], ['Thông báo trả lại đơn khởi kiện', 'Đã có trên hệ thống']], bat: [], bb0: {}, bs0: [] }),
    NvCallS('info', h(F, null, h('b', null, 'Lưu ý định dạng tệp. '), 'Tài liệu, chứng cứ có thể được bổ sung sau theo yêu cầu của người giải quyết.'))) });
}

function Kr4() {
  return h(KyGuiSd, { sua: 'kr2',  title: KR_TITLE, steps: KR_STEPS, kyTitle: 'Xem lại và ký số', ok: 'krOk', tep: ['Đơn khiếu nại việc trả lại đơn', 'Tài liệu, chứng cứ'], tepMeta: 'Xem trước đơn', vaiTro: 'Người khiếu nại', sendLabel: 'Ký số và gửi đơn',
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
/* đối chiếu 3A.1 (21/11/2026): huy hiệu = số chưa đọc của thư mục "Hộp thư" – không tính văn bản đã lưu trữ (web: lát "Chưa đọc" của SP DON_THONGKEHOPTHUTONGDAT_API) */
function ibSoChuaDoc() { return IB.filter(function (m) { return !m.doc && !m.arch; }).length; }
function Nav(active) {
  var n = ibSoChuaDoc();
  return h('div', { className: 'ph-nav' }, h('nav', { className: 'tp-nav tp-nav2', 'aria-label': 'Điều hướng chính' }, NAV.map(function (it) {
    var on = it.key === active, bd = it.key === 'inbox' && n > 0 ? (n > 99 ? '99+' : String(n)) : null;
    return h('button', { key: it.key, type: 'button', className: 'tp-nav-item' + (on ? ' tp-nav-on' : ''), 'aria-current': on ? 'page' : undefined, 'aria-describedby': bd ? 'ib-nav-n' : undefined }, /* không dùng aria-label: luật điều hướng đọc aria-label trước chữ của nút */
      h('span', { className: 'ib-nav-ic', 'data-n': bd || undefined }, h(T.Icon, { name: it.icon })), it.label);
  })), n > 0 ? h('span', { id: 'ib-nav-n', className: 'pt-sr' }, n + ' văn bản chưa đọc') : null);
}
/* (3) bảng Bộ lọc: số đếm cạnh cả 3 lựa chọn Tất cả / Chưa đọc / Đã đọc (web luôn hiện số, kể cả 0) */
/* đối chiếu 3B.2 (21/11/2026): "Nhập lại" giữ Hồ sơ, vụ án (như web – ô Theo hồ sơ nằm riêng, không bị đặt lại);
   3C.1: bảng chọn Hồ sơ, vụ án có ô tìm khi trên 10 mục (IbPick) */
function IbLocSheet(p) {
  var l = React.useState(p.loc), v = l[0], set = function (k, x) { var n = Object.assign({}, v); n[k] = x; l[1](n); };
  var dem = p.dem || { all: 0, unread: p.chuaDoc || 0, read: 0 };
  return h(LvSheet, { host: p.host, title: 'Bộ lọc hộp thư', onClose: p.onClose,
    foot: h(F, null, h(T.Button, { variant: 'secondary', onClick: function () { l[1](Object.assign({}, v, { doc: 'all', toa: 'all', khoang: 'all', tu: '', den: '' })); } }, 'Nhập lại'), h(T.Button, { onClick: function () { p.onApply(v); } }, 'Áp dụng')) },
    h('div', { className: 'ib-loc' },
      h('div', null, h('p', { className: 'sf-h' }, 'Trạng thái đọc'), h('div', { className: 'sf-grid', role: 'radiogroup', 'aria-label': 'Trạng thái đọc' }, [['all', 'Tất cả'], ['unread', 'Chưa đọc'], ['read', 'Đã đọc']].map(function (o) {
        var on = v.doc === o[0];
        return h('button', { key: o[0], type: 'button', role: 'radio', 'aria-checked': on, className: 'ib-chip2' + (on ? ' ib-chip2-on' : ''), onClick: function () { set('doc', o[0]); } }, o[1], h('span', { className: 'ib-chip2-n tp-num' }, dem[o[0]]));
      }))),
      h(IbPick, { host: p.host, label: 'Hồ sơ, vụ án', v: v.hs, moSan: p.moHs, q0: p.qHs, onPick: function (x) { set('hs', x); }, items: [{ id: '', name: 'Tất cả' }].concat(IB_HS.map(function (x) { return { id: x[0], name: x[0] + ' · ' + x[1] }; })).concat(p.hsThem || []) }),
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
    dem ? h('p', { className: 'ib-han' + (het ? ' ib-han-qua' : '') }, h(T.Icon, { name: 'clock' }), 'Hạn: ' + m.han.split('-').join('-') + ' · ' + (het ? 'đã quá ' + (-dem.con) + ' ngày' : dem.con === 0 ? 'hết hạn hôm nay' : 'còn ' + dem.con + ' ngày'))
      : k.vo ? h('p', { className: 'ib-han' }, h(T.Icon, { name: 'clock' }), 'Hạn: Vô thời hạn') : null,
    het ? h('p', { className: 'ib-het-han' }, 'Đã hết hạn — công dân không thể thực hiện. Vui lòng liên hệ Tòa án để được hướng dẫn.') : null,
    nut.length ? h('div', { className: 'ib-khoi-b' }, nut.map(function (x) {
      return h(F, { key: x.b[0] }, h(T.Button, { block: true, variant: 'secondary', disabled: x.tat, 'data-pt-go': x.tat ? undefined : x.b[1] }, x.b[0]), x.ly && !chung ? lyEl(x.ly) : null);
    }), chung ? lyEl(lys[0]) : null) : null);
}
/* nút đã có màn trong prototype thì gắn màn; giữ "Chọn hòa giải viên" làm mẫu chưa có đường dẫn ("Gửi ý kiến, phản hồi" chưa có màn tương ứng) */
IB_KHOI['ban-an'].b[0][1] = 'kc1'; IB_KHOI['phan-hoi'].b[0][1] = 'ykc1'; IB_KHOI['hoa-giai'].b[0][1] = 'hgReply';
/* đối chiếu web – prototype (21/11/2026), Hộp thư tống đạt – danh sách (giữ bố cục đã chốt 20/11):
   3A.2 lọc theo văn bản mở từ liên kết (p.lk): danh sách chỉ còn văn bản đó, dòng "Đang lọc: văn bản được chọn từ liên kết — 1 văn bản"; gõ vào ô tìm thì bỏ lọc liên kết
   3B.2 dòng "Đang lọc: {điều kiện} — {tổng} văn bản" + "Xóa lọc" dưới hàng Sắp xếp / Bộ lọc (Xóa lọc giữ thư mục, nhãn, hồ sơ, từ khóa, sắp xếp)
   3B.4 bỏ nhấn giữ / chọn nhiều / "Đánh dấu đã đọc"
   3C.1 đang tải (p.tai), lỗi có/không có thông báo máy chủ, Thử lại → đang tải → danh sách; câu trống theo trường hợp như web (không nút, không dùng khối trống chung v518);
        "có lọc" tính như web (nhãn, hồ sơ, từ khóa, liên kết, trạng thái đọc, khoảng thời gian, Tòa án – không tính thư mục) */
function InboxScr(p) {
  p = p || {};
  var ghiUi = !p.fd0 && !p.loc0 && !p.du;
  var fd = React.useState(p.fd0 || IB_UI.folder), lc = React.useState(p.loc0 || IB_UI.loc), sx = React.useState(IB_UI.sap), q = React.useState(p.q0 || ''), sh = React.useState(p.sh0 || null), n = React.useState(10), tai = React.useState(false), lk = React.useState(p.lk != null ? p.lk : null);
  var anchor = React.useRef(null), host = useHost(anchor), end = React.useRef(null);
  /* 3B.4 (người dùng: giữ nguyên prototype) – giữ chế độ chọn nhiều (nhấn giữ thẻ), thanh "Đã chọn n văn bản · Đánh dấu đã đọc", nút Quan trọng / Lưu trữ trên thẻ */
  var dv = React.useState(0), doi = function () { dv[1](function (x) { return x + 1; }); }, chon = React.useState(null);
  var chonGiu = function (m) { chon[1]([m]); };
  var chonTick = function (m) { var c = chon[0] || [], i = c.indexOf(m), n2 = i >= 0 ? c.filter(function (x) { return x !== m; }) : c.concat([m]); if (!n2.length) { chon[1](null); return; } chon[1](n2); };
  var chonLam = function (f, msg) { var c = chon[0] || []; c.forEach(f); chon[1](null); doi(); if (window.__ptSnack) window.__ptSnack(msg.replace('{n}', c.length)); };
  if (ghiUi) { IB_UI.folder = fd[0]; IB_UI.loc = lc[0]; IB_UI.sap = sx[0]; }
  htTuChuyen(p.tai, 'inbox');
  var v = lc[0], nguon = p.du || IB, coLk = lk[0] != null && !!IB[lk[0]];
  var ds = coLk ? [IB[lk[0]]] : ibSapXep(htLocDs(nguon, v, q[0], fd[0]), sx[0]), hien = ds.slice(0, n[0]);
  var soLoc = [v.doc !== 'all', !!v.hs, v.toa !== 'all', v.khoang !== 'all'].filter(Boolean).length, locOn = soLoc > 0, plOn = fd[0] !== 'inbox' || !!v.nhan;
  var nenDoc = htLocDs(nguon, Object.assign({}, v, { doc: 'all' }), q[0], fd[0]), chuaDoc = nenDoc.filter(function (m) { return !m.doc; }).length;
  var coLoc = !!v.nhan || !!v.hs || !!q[0].trim() || coLk || v.doc !== 'all' || v.khoang !== 'all' || v.toa !== 'all';
  var tomTat = htTomTat(v, coLk);
  React.useEffect(function () { n[1](10); }, [fd[0], lc[0], sx[0], q[0], lk[0]]);
  React.useEffect(function () { /* tự tải thêm 10 văn bản khi cuộn tới cuối danh sách */
    var el = end.current; if (!el || n[0] >= ds.length || typeof IntersectionObserver === 'undefined') return;
    var ob = new IntersectionObserver(function (e) { if (e[0].isIntersecting && !tai[0]) { tai[1](true); setTimeout(function () { n[1](function (x) { return x + 10; }); tai[1](false); }, 700); } });
    ob.observe(el); return function () { ob.disconnect(); };
  }, [n[0], ds.length, tai[0]]);
  var boLk = function () { if (lk[0] != null) { lk[1](null); IB_UI.lk = null; } };
  var xoaLoc = function () { boLk(); lc[1](Object.assign({}, v, { doc: 'all', khoang: 'all', tu: '', den: '', toa: 'all' })); };
  var sapCur = IB_SAP.filter(function (x) { return x[0] === sx[0]; })[0];
  var rong = coLoc ? ['Không có văn bản phù hợp', 'Không có văn bản nào thuộc nhãn/điều kiện đã chọn.'] : IB_RONG[fd[0]];
  var ct = h(F, null, h('span', { ref: anchor, hidden: true }),
    h('div', { className: 'ib-stick' },
    h('div', { className: 'ph-ibar' },
      h('div', { className: 'fx-search' }, Tf('Tìm văn bản', { icon: 'search', placeholder: 'Tìm số hiệu, loại, tòa án, hồ sơ…', value: q[0], onChange: function (e) { q[1](e.target.value); if (e.target.value) boLk(); }, onClear: function () { q[1](''); } })),
      h('button', { type: 'button', className: 'ph-ibar-btn' + (plOn ? ' ib-loc-on' : ''), 'aria-label': plOn ? 'Phân loại thư (đang lọc)' : 'Phân loại thư', onClick: function () { sh[1]('pl'); } }, h(T.Icon, { name: 'grid' }))),
    h('div', { className: 'ib-docrow st-row sf-row' },
      h('button', { type: 'button', className: 'ph-ibar-sort ib-sort2', 'aria-label': 'Sắp xếp: ' + sapCur[2], onClick: function () { sh[1]('sap'); } }, h(T.Icon, { name: 'sortDesc' }), sapCur[2]),
      h('span', { className: 'sf-sp' }),
      h('button', { type: 'button', className: 'sf-pill' + (locOn ? ' sf-on' : ''), 'aria-label': locOn ? 'Bộ lọc, đang lọc ' + soLoc + ' điều kiện' : 'Bộ lọc', onClick: function () { sh[1]('loc'); } }, h(T.Icon, { name: 'filter' }), 'Bộ lọc', locOn ? h('span', { className: 'sf-badge tp-num', 'aria-hidden': 'true' }, soLoc) : null)),
    /* 3B.2: dòng tóm tắt điều kiện lọc (web index.tsx:678-691) */
    null /* 3B.2 (người dùng 21/11): bỏ dòng "Đang lọc" + Xóa lọc như Nghĩa vụ tài chính – xóa điều kiện bằng Nhập lại trong Bộ lọc, từ khóa bằng ✕ ô tìm */),
    p.tai ? htTai('Đang tải hộp thư…')
    : p.loi ? h(T.EmptyState, { variant: 'center', icon: 'alert', title: p.loi === 'may' ? '[Thông báo lỗi của hệ thống]' : 'Không tải được hộp thư.', text: 'Mã lỗi: [mã lỗi]', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: function () { htThuLai('inboxTai'); }, className: 'nv-err ht-thulai' })
    : ds.length ? h('ul', { className: 'ib-cardlist' }, hien.map(function (m) { return h(MailCard, { key: m.so + '|' + m.t + '|' + m.time, m: m, folder: fd[0], onDoi: doi, sel: chon[0] ? chon[0].indexOf(m) >= 0 : undefined, onHold: chonGiu, onTick: chonTick }); }),
      n[0] < ds.length ? h('li', { ref: end, className: 'ph-loadmore ib-more', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), h('span', null, 'Đang tải thêm văn bản…'))
        : null) /* 1A.3 (người dùng 21/11, áp mọi danh sách): bỏ dòng "Đã hiển thị hết" */
      : h(IbEmpty, { goc: true, title: rong[0], text: rong[1] }),
    sh[0] === 'pl' && host ? h(IbPlSheet, { host: host, loc: v, folder: fd[0], onClose: function () { sh[1](null); }, onApply: function (x, f) { lc[1](x); fd[1](f); sh[1](null); } }) : null,
    sh[0] === 'loc' && host ? h(IbLocSheet, { host: host, loc: v, folder: fd[0], chuaDoc: chuaDoc, dem: { all: nenDoc.length, unread: chuaDoc, read: nenDoc.length - chuaDoc }, hsThem: p.hsThem, moHs: p.moHs, qHs: p.qHs, onClose: function () { sh[1](null); }, onApply: function (x) { lc[1](x); sh[1](null); } }) : null,
    sh[0] === 'sap' && host ? h(LvSheet, { host: host, title: 'Sắp xếp', onClose: function () { sh[1](null); } }, h(LvRows, { label: 'Sắp xếp', cur: sx[0], items: IB_SAP.map(function (x) { return { id: x[0], name: x[1] }; }), onPick: function (id) { sx[1](id); sh[1](null); } })) : null);
  return h(Phone, { cls: 'ph-main' }, h(T.AppBar, { variant: 'page', title: 'Hộp thư tống đạt' }), h(Body, { cls: 'tp-sheet' }, ct),
    chon[0] ? h('div', { className: 'ib-chon-bar', role: 'toolbar', 'aria-label': 'Thao tác với văn bản đã chọn' },
      h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Bỏ chọn', onClick: function () { chon[1](null); } }, h(T.Icon, { name: 'x' })),
      h('b', { role: 'status' }, 'Đã chọn ' + chon[0].length + ' văn bản'),
      h(T.Button, { size: 'sm', icon: 'check', onClick: function () { chonLam(function (m) { m.doc = true; }, 'Đã đánh dấu đã đọc {n} văn bản.'); } }, 'Đánh dấu đã đọc')) : Nav('inbox'));
}

/* đối chiếu web – prototype (21/11/2026), Hộp thư tống đạt – màn văn bản:
   3A.2 mở từ liên kết (không phải từ thẻ danh sách) → nút quay lại về danh sách lọc theo văn bản đó (màn inboxLienKet)
   3C.1 đang tải (p.tai); lỗi tải có / không có thông báo máy chủ; Thử lại → đang tải → văn bản
   3D.1 Tải xuống không thông báo khi thành công (IbFile); tên tệp chính {số hiệu}.pdf, thiếu số hiệu thì van-ban.pdf
   3D.2 dòng "Hồ sơ:" chỉ có nút mã đơn, chỉ khi văn bản gắn với đơn (m.don); bỏ nút mở vụ án
   3D.3 lần mở đầu văn bản chưa đọc: ghi nhận đã đọc ngay và hiện dòng "Bạn đã mở văn bản này lần đầu lúc …"
   3D.4 nút thủ tục vụ việc phá sản (văn bản của vụ việc PS) sau khối hành động, trước Tài liệu đính kèm */
function MailDetailScr(p) {
  p = p || {};
  var i = p.i != null ? p.i : window.__ibSel, m = i >= 1000 ? IB_X[i - 1000] : IB[i || 0], rr = React.useState(0); /* v246: chỉ số từ 1000 = văn bản trong tab Văn bản tống đạt của chi tiết đơn */
  var giu = !!p.giu; /* v345 (HT-W07): mở từ Việc cần làm (nộp tạm ứng án phí, bổ sung hồ sơ) – xem nhưng không ghi nhận đã đọc */
  var idx = i >= 1000 ? -1 : (i || 0);
  var lk = idx >= 0 && !!(p.lk || (p.i == null && window.__ibSel != null && window.__ibTuDs !== window.__ibSel));
  window.__ibLkBack = lk; if (lk) IB_UI.lk = idx;
  htTuChuyen(p.tai, 'mailDetail');
  var doi = function () { rr[1](rr[0] + 1); };
  if (p.tai) return Sub('Văn bản tống đạt', htTai('Đang tải văn bản…'));
  if (p.loi) return Sub('Văn bản tống đạt', h(T.EmptyState, { variant: 'center', icon: 'alert', title: p.loi === 'may' ? '[Thông báo lỗi của hệ thống]' : 'Không tải được văn bản.', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: function () { htThuLai('mailDetailTai'); }, className: 'nv-err ht-thulai' }));
  if (!m.moLan) m.moLan = m.doc ? '28-10-2026 09:02' : '02-11-2026 09:15';
  if (!giu && !m.doc) m.doc = true; /* 3D.3: mở văn bản = ghi nhận đã đọc ngay trong lần mở này */
  var daDoc = m.doc && !giu, ngay = m.time.slice(0, 10), gio = m.time.slice(11, 16);
  var cta = IB_CTA[p.cta || 'hs'], tep = (m.so ? m.so.replace(/\//g, '-') : 'van-ban') + '.pdf', xxl = p.xxl || m.xxl;
  return Sub('Văn bản tống đạt', h(F, null,
    h('section', { className: 'ph-blk ib-dh ib-dh2' },
      h('div', { className: 'ib-c-h' }, h('span', { className: 'vk-tag' + ibTag(m.nh) }, IB_NHAN_TEN[m.nh]), h('span', { className: 'ib-so tp-num' }, m.so),
        h('span', { className: 'ib-c-act' },
          h('button', { type: 'button', className: 'ph-mail2-btn' + (m.star ? ' ph-mail2-on' : ''), 'aria-pressed': !!m.star, 'aria-label': 'Đánh dấu quan trọng', onClick: function () { m.star = !m.star; doi(); } }, h(T.Icon, { name: 'star' })),
          h('button', { type: 'button', className: 'ph-mail2-btn' + (m.arch ? ' ph-mail2-on' : ''), 'aria-pressed': !!m.arch, 'aria-label': m.arch ? 'Bỏ lưu trữ' : 'Lưu trữ', 'data-pt-go': 'snack:' + (m.arch ? 'Đã đưa văn bản trở lại Hộp thư.' : 'Đã lưu trữ văn bản.'), onClickCapture: function () { m.arch = !m.arch; doi(); } }, h(T.Icon, { name: 'archive' })))),
      h('h1', null, m.t),
      h('p', { className: 'ib-from2' }, h('b', null, m.from), h('small', null, 'Người ký ', h('strong', null, 'Nguyễn Văn An'), ' (Thẩm phán) · ' + ngay)),
      h('p', { className: 'ib-ty' }, '[Trích yếu văn bản]'),
      /* 3D.2: chỉ nút mã đơn, chỉ khi văn bản gắn với đơn (web index.tsx:1315-1331) */
      m.don ? h('p', { className: 'ib-hsl' }, 'Hồ sơ:', h('button', { type: 'button', className: 'ib-hs-pill tp-num', 'aria-label': 'Mở đơn ' + m.don, 'data-pt-go': 'appDetail' }, m.don)) : null,
      p.noFile ? h('p', { className: 'ib-nofile' }, h(T.Icon, { name: 'info' }), 'Bản số hóa của văn bản đang được chuẩn bị. Trường hợp chưa sẵn sàng, Tòa án sẽ tống đạt bản giấy theo quy định.')
        : IbFile(tep)),
    p.viec ? h('section', { className: 'ph-blk ib-khoi' },
      p.viec === 'het' ? h(F, null, h('p', { className: 'ib-han ib-han-qua' }, h(T.Icon, { name: 'clock' }), 'Đã hết hạn nộp: 30-10-2026'), h('p', { className: 'ib-het-han' }, 'Đã hết hạn — công dân không thể thực hiện. Vui lòng liên hệ Tòa án để được hướng dẫn.')) : null,
      h('p', { className: 'ib-viec-h' }, '[Tên tình trạng] — việc bạn có thể làm:'),
      h('div', { className: 'ib-khoi-b' }, h(T.Button, { block: true, variant: 'secondary', disabled: p.viec === 'het' }, '[Tên việc 1]'), h(T.Button, { block: true, variant: 'secondary', disabled: p.viec === 'het' }, '[Tên việc 2]')))
    : m.nhom ? IbKhoi(m, p.thay, p.khoa)
    : h('section', { className: 'ph-blk ib-cta' }, h('p', null, cta[0]), h(T.Button, { block: true, variant: 'secondary', 'data-pt-go': p.khongHs ? 'snack:Không xác định được hồ sơ liên quan.' : cta[2] }, cta[1])),
    xxl ? HtXxl(xxl) : null, /* 3D.4 */
    m.dk || m.dkThem ? Blk('Tài liệu đính kèm', h('div', { className: 'ib-files' }, m.dk ? [IbFile('Phu-luc-01.pdf'), IbFile('Danh-sach-tai-lieu.pdf')] : null, (m.dkThem || []).map(function (x) { return IbFile(x); }))) : null,
    h('section', { className: 'ph-blk ib-kyso' },
      h('p', { className: 'ib-ks-r' }, h(T.Icon, { name: 'checkCircle' }), h('span', null, 'Đã ký số bởi ', h('b', null, m.from), ' · CKS hợp lệ')),
      h('p', { className: 'ib-ks-r ib-ks-g' }, h(T.Icon, { name: 'send' }), h('span', null, 'Tống đạt điện tử ', h('b', { className: 'tp-num' }, ngay + ' ' + gio))),
      daDoc ? h('p', { className: 'ib-ks-r ib-ks-g' }, h(T.Icon, { name: 'eye' }), h('span', null, 'Bạn đã mở văn bản này lần đầu lúc ', h('b', { className: 'tp-num' }, m.moLan), '. Thông tin này được ghi nhận và gửi về Tòa án.')) : null)));
}

/* ===== v359: Nghĩa vụ tài chính – thẻ khoản đồng nhất với thẻ danh sách chuẩn (Danh sách đơn, Khiếu nại, Trích lục): nhãn có dấu hai chấm, ghi chú dạng dòng gọn, "Chưa xác định" cỡ chữ thường ===== */
/* đối chiếu 2B.4 (21/11/2026): bỏ nút "Đánh dấu quan trọng" (web không có); 2D.4: tải biên lai không hiện thông báo khi thành công, lỗi tải là lỗi gọi máy chủ */
function NvCard(p) {
  var k = p.k, tt = nvTrangThai(k), hn = nvHan(k), muc = hn ? (hn.qua ? 'qua' : hn.gap ? 'sap' : 'an') : null;
  var rows = [['Số tiền', h('span', { className: 'nv-c-amt tp-num' + (k.cxd ? ' nv-amt-cxd' : '') }, k.tienDau ? h('s', { className: 'nv-was' }, nvTien(k.tienDau)) : null, k.tienDau ? ' ' : null, k.mo ? nvTienText(k) : nvTien(k.tien))],
    ['Loại khoản', nvTenLoai(k.loai)], ['Mã thông báo', h('span', { className: 'tp-num' }, k.ma)], ['Hồ sơ, vụ án', nvHsText(k.hs)]]
    .concat(k.mo ? [['Hạn nộp', k.han || '— (không có hạn nộp trên Cổng)']] : [[k.duocMien ? 'Ngày miễn' : 'Ngày nộp', k.ngay + (k.duocMien ? ' · Không phải nộp' : ' · ' + k.kenh)]]); /* v603 (1.17) */
  var xong = !k.mo, coBl = k.da && k.bienLai; /* v603 (1.18): nhóm Đã nộp, được miễn – không chạm cả thẻ, chỉ bấm nút */
  return h('li', { className: 'qd-c qc nv-c' + (xong ? ' nv-c-xong' : '') },
    xong ? null : h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem chi tiết: ' + k.nd, 'data-pt-go': 'financeDetail', onClickCapture: nvPick(k) }),
    xong && !k.duocMien ? null : h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: tt[1], icon: false }, tt[0]), hn ? h('span', { className: 'qd-tinh qc-tinh qd-tinh-' + (hn.qua ? 'warning' : hn.gap ? 'warning' : 'info') }, h('span', { className: 'qc-tinh-tx' }, hn.text)) : null),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, k.nd)),
    h('dl', { className: 'qc-ben' }, rows.map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0] + ':'), h('dd', null, r[1])); })),
    k.mo ? nvGhiChuThe(k).map(function (n, i) { return h('p', { key: i, className: 'kn-ban nv-ban nv-ban-' + n[0] }, h(T.Icon, { name: n[0] === 'info' ? 'info' : 'alert' }), n[1]); }) : null,
    nvNopDuoc(k) ? h('div', { className: 'qd-c-f qc-vk vkx-box' }, h('p', { className: 'qc-vk-h vkx-h' }, 'Việc cần làm'), h('ul', { className: 'qc-vk-l' },
      h('li', { className: 'vk-card vka vkx vkx-' + (muc || 'none') }, h('button', { type: 'button', className: 'vka-b', 'data-pt-go': 'financePay', onClickCapture: nvPick(k) },
        h('span', { className: 'vka-tx' }, h('b', null, 'Nộp tiền'), h('small', null, hn ? h(F, null, 'Hạn xử lý · ', h('span', { className: 'vka-han vka-han-' + muc }, hn.text)) : 'Không có thời hạn')))))) : null,
    coBl ? h('div', { className: 'qd-c-f nv-c-bl' }, h('span', { className: 'nv-bl tp-num' }, k.bienLai), h(T.Button, { size: 'sm', variant: 'secondary', icon: 'download', className: 'nv-tai-bl', onClick: function () { nvTaiBl(k, p.blLoi); } }, 'Tải biên lai PDF'))
      : xong ? h('div', { className: 'qd-c-f nv-c-bl nv-c-xem' }, h('span', { className: 'qc-sp' }), h(T.Button, { size: 'sm', variant: 'secondary', icon: k.duocMien ? 'file' : 'eye', 'data-pt-go': k.duocMien ? 'financeDetailExempt' : 'financeDetail', onClickCapture: nvPick(k) }, k.duocMien ? 'Xem quyết định miễn' : 'Xem chi tiết')) : null);
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
/* đối chiếu 1B.2, 1E.1–1E.4 (21/11/2026): dòng phụ + nhãn nguồn trên thanh tiêu đề (giữ "Lưu nháp"); chọn văn bản → loại chọn sẵn; Tiếp theo kiểm tra như web; vào từ vụ án → khối "Thông tin vụ án đã chọn" */
function Tl1(p) {
  p = p || {};
  var tab = React.useState(p.tuKhai ? 'tk' : 'va'), sel = React.useState(p.sel || ''), lp = React.useState(p.lp || ''), kt = React.useState(!!p.loi);
  var tk = React.useState(Object.assign({ lv: 'BAN_AN', so: '', nam: '', loaiAn: '', toa: '', ben: '' }, p.tk0 || {}));
  if (p.va) return h(Tl1Va, p);
  var d = sel[0] ? tlTimVb(sel[0]) : null;
  if (d && !lp[0]) lp[0] = d.l === 'QD' ? (d.khoaTl ? 'bs' : 'tl') : d.khoaTl ? 'bs' : 'tl';
  function chon(id) { var b = tlTimVb(id); sel[1](id); lp[1](b.khoaTl ? (b.khoaBs ? '' : 'bs') : 'tl'); }
  function tiep() {
    kt[1](true);
    if (tab[0] === 'va') { if (!d || !lp[0]) return; Object.assign(TL_CHON, { nguon: 'va', ma: d.va.ma, vt: d.va.vt, l: d.l, so: d.so, toa: d.toa, loai: lp[0] === 'bs' ? 'BAN_SAO' : 'TRICH_LUC' }); window.__ptGo('tl2'); return; }
    var t = tk[0]; if (!t.so.trim() || !t.toa) return;
    Object.assign(TL_CHON, { nguon: 'tk', loaiVb: t.lv, loai: t.lv === 'QUYET_DINH' ? 'TRICH_LUC' : 'BAN_SAO', so: t.so, toa: t.toa }); window.__ptGo('tl2k');
  }
  var c = tab[0] === 'tk' ? { nguon: 'tk' } : d ? { nguon: 'va', ma: d.va.ma, l: d.l, so: d.so } : { nguon: 'va' };
  return TlWz({ title: TL_TITLE, sub: tlSub(c, d || tab[0] === 'tk' ? null : 'trong', p.pa), nguonB: tlWzNguon(c, p.pa), steps: TL_STEPS, n: 1, last: TlNext(tiep), body: FCard('Chọn bản án / quyết định', h(F, null,
    Lead('Chọn từ vụ án của bạn (thông tin được điền tự động, không thể sai) hoặc nhập thông tin bản án để Tòa án đối chiếu.'),
    h(T.SegmentedControl, { label: 'Nguồn thông tin bản án', value: tab[0], onChange: function (x) { tab[1](x); kt[1](false); }, options: [{ value: 'va', label: 'Từ vụ án của tôi' }, { value: 'tk', label: 'Nhập thông tin bản án' }], className: 'sk-seg' }),
    tab[0] === 'va' ? h(TlTuVuAn, { sel: sel[0], onSel: chon, lp: lp[0], onLp: lp[1], err: kt[0], q0: p.q0, all: p.all, tai: p.tai, dsLoi: p.dsLoi, rong: p.rong })
      : h(TlTuKhai, { v: tk[0], set: tk[1], err: kt[0] })), true) });
}

/* ===== v364: Nghĩa vụ tài chính – tab "Đã nộp, được miễn": bỏ dòng "Tổng đã nộp: …" trên danh sách ===== */
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
    ds.length ? h('ul', { className: 'qd-list nv-list' }, ds.map(function (k) { return h(NvCard, { key: k.ma, k: k, onDoi: function () { rr[1](rr[0] + 1); } }); }))
      : h(IbEmpty, { title: nh[0] === 'mo' ? 'Không có khoản nào phải nộp theo bộ lọc này' : 'Không có khoản đã nộp trong khoảng thời gian này', text: coLoc ? 'Bỏ bớt bộ lọc để xem các khoản còn lại.' : '', action: coLoc ? 'Xóa bộ lọc' : null, onAction: function () { lc[1](NV_LOC0); } }),
    nh[0] === 'mo' && mo.length ? h('p', { className: 'nv-foot' }, 'Sau khi nộp trên Cổng Dịch vụ công quốc gia, Tòa án thường xác nhận trong ' + NV_XN + '; khi đó khoản tự chuyển "Đã nộp" và có biên lai.') : null,
    sh[0] === 'loc' && host ? h(NvLocSheet, { host: host, nhom: nh[0], loc: v, chips: chips, onClose: function () { sh[1](null); }, onApply: function (x) { lc[1](x); sh[1](null); } }) : null));
}

/* ===== v365: Nghĩa vụ tài chính – tab "Phải nộp": bỏ dòng ghi chú cuối danh sách "Sau khi nộp trên Cổng Dịch vụ công quốc gia…" ===== */
/* đối chiếu web – prototype (21/11/2026), Nghĩa vụ tài chính:
   2B.1 chỉ tiêu "quá hạn hoặc còn ≤ 3 ngày" luôn hiện (kể cả 0); tab Đã nộp có dòng "{n} khoản theo bộ lọc · Tổng đã nộp: {tiền}"
   2B.2 đổi nhóm giữ từ khóa, Loại khoản, Ngày nộp (chỉ bỏ Hồ sơ, vụ án); không có nút "Xóa bộ lọc" (người dùng 21/11 chọn PA-A)
   2B.3 tìm không phân biệt dấu, theo cả tên hồ sơ; lọc Ngày nộp lọc thật theo ngày nộp / ngày miễn; tab Đã nộp xếp ngày mới nhất trước
   2B.4 cuộn tới cuối thì tải thêm 10 khoản; 2C.1 câu trống theo web (không nút trong khối) */
function NvList(p) {
  var NVX = p.nv || NV;
  var nh = React.useState(p.nhom || 'mo'), lc = React.useState(p.loc0 || NV_LOC0), sh = React.useState(p.moLoc ? 'loc' : null), so = React.useState(p.n0 || 10);
  var anchor = React.useRef(null), host = useHost(anchor), v = lc[0], set = function (k, x) { var n = Object.assign({}, v); n[k] = x; lc[1](n); so[1](10); };
  var mo = NVX.filter(function (k) { return k.mo; }), xong = NVX.filter(function (k) { return !k.mo; }), daNop = xong.filter(function (k) { return k.da; });
  var tong = function (ds) { return nvTien(ds.reduce(function (s, k) { return s + (k.cxd ? 0 : k.tien || 0); }, 0)); };
  var goc = nh[0] === 'mo' ? mo : xong, tk = khongDau(v.q.trim());
  var qua = function (k) { return (v.hs === 'all' || k.hs === v.hs) && (!tk || khongDau([k.ma, k.so, k.vb, k.nd, k.hs, nvHsText(k.hs), k.vuAn || '', k.don || ''].join(' ')).indexOf(tk) >= 0)
    && (nh[0] !== 'xong' || nvTrongKy(k, v.ky)); };
  var coSo = goc.filter(qua), ds = coSo.filter(function (k) { return v.loai === 'all' || k.loai === v.loai; });
  if (nh[0] === 'mo') ds.sort(function (a, b) { return (a.dl == null ? 99999 : a.dl) - (b.dl == null ? 99999 : b.dl); });
  else ds.sort(function (a, b) { return (nvNgay(b.ngay) || 0) - (nvNgay(a.ngay) || 0); });
  var coLoc = !!tk || v.hs !== 'all' || v.loai !== 'all' || (nh[0] === 'xong' && v.ky !== 'all');
  var soLoc = [v.loai !== 'all', v.hs !== 'all', nh[0] === 'xong' && v.ky !== 'all'].filter(Boolean).length;
  var doiNh = function (x) { nh[1](x); lc[1](Object.assign({}, v, { hs: 'all' })); so[1](10); };
  var seg = h(T.SegmentedControl, { label: 'Nhóm khoản', value: nh[0], onChange: doiNh, options: [{ value: 'mo', label: 'Phải nộp (' + mo.length + ')' }, { value: 'xong', label: 'Đã nộp, được miễn (' + xong.length + ')' }], className: 'nv-seg' });
  var chips = [{ key: 'all', label: 'Tất cả', count: coSo.length }].concat(NV_LOAI.map(function (l) { return { key: l[0], label: l[1], count: coSo.filter(function (k) { return k.loai === l[0]; }).length }; }));
  var hien = ds.slice(0, so[0]);
  return Sub('Nghĩa vụ tài chính', h(F, null, h('span', { ref: anchor, hidden: true }),
    (function () { var tien = function (d) { return d.reduce(function (s, k) { return s + (k.cxd ? 0 : k.tien || 0); }, 0); }, a = tien(mo), b = tien(daNop), pc = a + b ? Math.max(2, Math.round(b * 100 / (a + b))) : 0, g = mo.filter(function (k) { var x = nvHan(k); return x && x.gap; }).length;
      return h('section', { className: 'nv-tong', 'aria-label': 'Tổng hợp nghĩa vụ tài chính' },
        h('div', { className: 'nv-tong-h' }, h('span', null, h('small', null, 'Còn phải nộp · ' + mo.length + ' khoản'), h('b', { className: 'tp-num' }, tong(mo))), h('span', { className: 'nv-tong-r' }, h('small', null, 'Đã nộp · ' + daNop.length + ' khoản'), h('b', { className: 'tp-num' }, tong(daNop)))),
        h('div', { className: 'nv-tong-bar', role: 'progressbar', 'aria-label': 'Tỷ lệ đã nộp', 'aria-valuenow': pc, 'aria-valuemin': 0, 'aria-valuemax': 100 }, h('i', { style: { width: pc + '%' } })),
        /* 2B.1: luôn hiện, kể cả 0 khoản */
        h('p', { className: 'nv-tong-w' + (g ? '' : ' nv-tong-w0') }, h('i', { className: 'ib-dot', 'aria-hidden': 'true' }), 'Quá hạn hoặc còn ≤ 3 ngày: ', h('b', null, g + ' khoản'))); })(),
    /* tab + ô tìm (người dùng 21/11 chọn PA-C): dải trắng, ô tìm + Bộ lọc ở trên, nút chuyển 2 nhóm (SegmentedControl) ở dưới */
    h('div', { className: 'nv-stick nv-tk-c' },
      /* 1A.2 áp chung: Bộ lọc bên phải ô tìm kiếm; "Xóa bộ lọc" chỉ hiện khi đang lọc, dòng riêng bên dưới */
      h('div', { className: 'ph-ibar tl-ibar' },
        h('div', { className: 'fx-search' }, Tf('Tìm kiếm', { icon: 'search', placeholder: 'Mã thông báo, số văn bản, mã hồ sơ', value: v.q, onChange: function (e) { set('q', e.target.value); }, onClear: function () { set('q', ''); } })),
        h('button', { type: 'button', className: 'sf-pill' + (soLoc ? ' sf-on' : ''), 'aria-label': soLoc ? 'Bộ lọc, đang lọc ' + soLoc + ' điều kiện' : 'Bộ lọc', onClick: function () { sh[1]('loc'); } }, h(T.Icon, { name: 'filter' }), 'Bộ lọc', soLoc ? h('span', { className: 'sf-badge tp-num', 'aria-hidden': 'true' }, soLoc) : null)),
      seg,
      /* người dùng 21/11 chọn PA-A: bỏ "Xóa bộ lọc" – xóa từ khóa bằng ✕ trong ô tìm, điều kiện lọc bằng "Nhập lại" trong bảng Bộ lọc */
      null),
    nh[0] === 'xong' ? h('p', { className: 'nv-tomtat' }, h('span', null, ds.length + ' khoản theo bộ lọc'), h('span', null, 'Tổng đã nộp: ', h('b', { className: 'tp-num' }, tong(ds.filter(function (k) { return k.da; }))))) : null,
    ds.length ? h('ul', { className: 'qd-list nv-list' }, hien.map(function (k) { return h(NvCard, { key: k.ma, k: k, blLoi: p.blLoi }); }),
        ds.length > so[0] ? h(NvMore, { onMore: function () { so[1](so[0] + 10); } }) : null)
      : coLoc ? h(IbEmpty, { goc: true, title: 'Không có khoản nào phù hợp' }) /* tìm/lọc không có kết quả: khối trống chung (người dùng 21/11) */
        : h(ES0, { variant: 'center', icon: 'wallet', title: nh[0] === 'mo' ? 'Không có khoản nào phải nộp' : 'Không có khoản đã nộp trong khoảng thời gian này' }), /* nhóm rỗng: khối trống (không chữ trơn trên nền), câu web */
    sh[0] === 'loc' && host ? h(NvLocSheet, { host: host, nhom: nh[0], nv: NVX, loc: v, chips: chips, moHs: p.moHs, qHs: p.qHs, onClose: function () { sh[1](null); }, onApply: function (x) { lc[1](x); sh[1](null); so[1](10); } }) : null));
}

/* ===== v368: Khiếu nại — Tố cáo (danh sách) bổ sung theo web /khieu-nai-to-cao (develop ae854d37)
   W1 khối Đơn chưa lưu · W2 đơn đang soạn trên máy chủ · W3 4 ô thống kê (hành chính) · W4 chip trạng thái · W5 ô tìm · W6 thẻ hành chính
   W7 đang tải / lỗi · W8 chip Đang gửi · W9 bộ lọc tố tụng · W10 Theo dõi thời hạn · W11 dòng thẻ tố tụng · W12 nút lần hai · W13 thẻ nháp
   W14 câu rỗng theo mục · M1 bỏ "Người gửi" · M2 bỏ "Xem Lịch" · M3 câu rỗng theo web · M4 bỏ Sắp xếp · L1 tên nút lần hai · L2 chip Gửi lỗi ẩn khi 0 ===== */
/* chip không kèm nút Sắp xếp (web không có sắp xếp ở 2 tab) */
function KnChips(p) {
  return h('div', { className: 'ib-docrow st-row' }, h('div', { className: 'ib-chips2 st-chips', role: 'radiogroup', 'aria-label': p.label }, p.items.map(function (x) {
    var on = p.value === x.key;
    return h('button', { key: x.key, type: 'button', role: 'radio', 'aria-checked': on, className: 'ib-chip2' + (on ? ' ib-chip2-on' : ''), onClick: function () { p.onChange(x.key); } }, x.label, h('span', { className: 'ib-chip2-n tp-num' }, x.count));
  })));
}
/* ---------- Tab hành chính ---------- */
var KNHC_NHOM = [['gnhap', 'Đơn đang soạn', 'warning'], ['g1', 'Đã gửi — chờ tiếp nhận', 'warning'], ['gerr', 'Gửi không thành công', 'danger'], ['g2', 'Đang kiểm tra điều kiện thụ lý', 'info'], ['g3', 'Đang giải quyết', 'info'],
  ['g4', 'Chờ trả kết quả', 'warning'], ['g5', 'Đã có kết quả', 'success'], ['g6', 'Không thụ lý', 'danger'], ['g0', 'Lưu theo dõi', 'neutral']];
function knhcTone(n) { var x = KNHC_NHOM.filter(function (g) { return g[0] === n; })[0]; return x ? x[2] : n === 'grut' ? 'neutral' : 'warning'; }
var KNHC_DS = [
  { ma: 'KN-2026-0015', loai: 'Khiếu nại', tom: '', nhom: 'gnhap', st: 'Đơn đang soạn', go: 'khc3' },
  { ma: 'KN-2026-0012', loai: 'Khiếu nại', tom: 'Khiếu nại về việc chậm trả kết quả cấp bản sao', nhom: 'g3', st: 'Đang giải quyết', gui: '23-10-2026', han: 'qua', go: 'complaintDetail' },
  { ma: 'TC-2026-0004', loai: 'Tố cáo', tom: 'Tố cáo hành vi nhận tiền của cán bộ tiếp công dân', nhom: 'g5', st: 'Đã có kết quả', gui: '05-10-2026', baoVe: true, han: 'kq', go: 'complaintDetailTc' },
  { ma: 'KN-2026-0007', loai: 'Khiếu nại', tom: 'Khiếu nại thái độ tiếp công dân', nhom: 'grut', st: 'Đề nghị rút đơn', gui: '01-10-2026', go: 'complaintDetailRut' }];
function knhcLoaiCls(l) { return /^Rút đơn/.test(l) ? 'rut' : /^Tố cáo/.test(l) ? 'tc' : /^Kiến nghị/.test(l) ? 'pakn' : 'kn'; }
function KnHcCard(p) {
  var c = p.c, nhap = c.nhom === 'gnhap';
  return h('li', { className: 'qd-c qc kn-c' }, h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': nhap ? 'Tiếp tục soạn đơn ' + c.ma : 'Xem chi tiết hồ sơ ' + c.ma, 'data-pt-go': c.go }),
    h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: knhcTone(c.nhom), icon: false }, c.st),
      h('span', { className: 'knd-pill knd-pill-' + knhcLoaiCls(c.loai) }, c.loai), c.baoVe ? h('span', { className: 'knd-pill knd-pill-bv' }, 'Bảo vệ người tố cáo') : null),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, c.tom || (nhap ? 'Chưa nhập nội dung' : ''))),
    dsRows([['Mã tiếp nhận' /* v420 */, h('span', { className: 'tp-num' }, c.ma)], nhap ? null : ['Tòa án tiếp nhận', COURT1], nhap ? null : ['Ngày gửi', c.gui], ['Thủ tục', KNHC_TT_TEN[c.ma] || '—']]), /* v415 */
    null /* v416: bỏ nhãn hạn */);
}
function KnNhapHc(p) { /* W1 – phiên soạn dở lưu trên máy (localStorage của web) */
  var ky = !!p.ky, buoc = ky ? 5 : 2, ten = ['Người gửi đơn', 'Cá nhân, đơn vị bị khiếu nại', 'Nội dung và nơi nhận', 'Tài liệu kèm theo', 'Xem lại và ký gửi'][buoc - 1];
  return h('section', { className: 'knd-nhap' }, h('div', { className: 'knd-nhap-h' }, h('span', { className: 'knd-pill knd-pill-rut' }, ky ? 'Đơn chưa lưu — đã ký số, chưa gửi' : 'Đơn chưa lưu'), h('small', null, 'Đang ở bước ' + buoc + '/5 · ' + ten)),
    h('b', null, 'Hành vi hành chính của Tòa án'), h('p', null, ky ? '[Tiêu đề đơn]' : 'Chưa nhập tóm tắt nội dung'),
    h('span', { className: 'dg-bar' }, h('i', { className: 'dg-bar-info', style: { width: (buoc * 20) + '%' } })),
    h(T.Button, { size: 'sm', variant: 'secondary', 'data-pt-go': ky ? 'khc5' : 'khc2' }, ky ? 'Tiếp tục gửi đơn' : 'Tiếp tục khai')); /* v575 (người dùng 23/11 "Kiểu trong ảnh"): nút viền đỏ cỡ nhỏ căn trái như cũ, không mũi tên */
}
function KnHc(p) {
  var all = p.rong ? [] : KNHC_DS, nh = React.useState('all'), q = React.useState(p.q || '');
  var k = khongDau(q[0].trim()), ds = all.filter(function (c) { return (nh[0] === 'all' || c.nhom === nh[0]) && (!k || khongDau(c.ma + ' ' + c.tom).indexOf(k) >= 0); });
  var gui = all.filter(function (c) { return c.nhom !== 'gnhap'; });
  var the = [['Tổng hồ sơ', gui.length], ['Đang xử lý', gui.filter(function (c) { return /g2|g3|g4/.test(c.nhom); }).length], ['Đã có kết quả', gui.filter(function (c) { return c.nhom === 'g5'; }).length], ['Quá hạn xử lý', gui.filter(function (c) { return c.han === 'qua'; }).length]];
  var chips = [{ key: 'all', label: 'Tất cả', count: all.length }].concat(KNHC_NHOM.filter(function (g) { return all.some(function (c) { return c.nhom === g[0]; }) || nh[0] === g[0]; }).map(function (g) { return { key: g[0], label: g[1], count: all.filter(function (c) { return c.nhom === g[0]; }).length }; }));
  return h(F, null,
    h('div', { className: 'kn-the knd-the' }, the.map(function (t) { return h('div', { key: t[0], className: 'knd-the-it' }, h('small', null, t[0]), h('b', null, p.rong ? 0 : t[1])); })),
    h('div', { className: 'nv-stick' }, h('div', { className: 'ph-ibar' }, h('div', { className: 'fx-search' }, Tf('Tìm theo mã đơn, tiêu đề đơn', { icon: 'search', placeholder: 'Tìm mã đơn, tiêu đề đơn,…', value: q[0], maxLength: 100, onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } }))),
      h(KnChips, { label: 'Lọc theo trạng thái', value: nh[0], onChange: nh[1], items: chips })),
    ds.length ? h('ul', { className: 'qd-list' }, ds.map(function (c) { return h(KnHcCard, { key: c.ma, c: c }); }))
      : k ? h(IbEmpty, { icon: 'search', title: 'Không tìm thấy hồ sơ phù hợp', text: 'Không có hồ sơ nào khớp “' + q[0].trim() + '”. Thử mã đơn hoặc từ khoá khác.' })
      : h(IbEmpty, { icon: 'building', title: 'Không có hồ sơ nào trong mục này', text: 'Chọn mục khác hoặc nộp đơn khiếu nại, tố cáo hành chính mới.' }));
}
/* ---------- Tab tố tụng ---------- */
var KNTT_LOAI = [['qd', 'KN Quyết định'], ['tra', 'KN Trả lại đơn'], ['hv', 'KN Hành vi'], ['tc', 'Tố cáo']];
function kntcThuTucLoai(r) { return r.thuTuc === 'KN Quyết định' ? 'qd' : r.thuTuc === 'KN Trả lại đơn' ? 'tra' : r.thuTuc === 'KN Hành vi' ? 'hv' : 'tc'; }
var KNTT_THEM = { /* W11 – các dòng web hiện trên thẻ */
  'KNTT-2026-0012': { maDon: '[Mã đơn tại Tòa án]', loaiTd: 'Quyết định', tenTd: 'Quyết định tạm đình chỉ giải quyết vụ án', cap: 'Sơ thẩm', yc: '[Yêu cầu giải quyết]', ngay: '28-10-2026' },
  'KNTT-2026-0009': { maDon: '[Mã đơn tại Tòa án]', loaiTd: 'Thông báo', tenTd: 'Thông báo trả lại đơn khởi kiện', yc: '[Yêu cầu giải quyết]', ngay: '03-11-2026' },
  'KNTT-2026-0005': { maDon: '[Mã đơn tại Tòa án]', yc: '[Yêu cầu, đề nghị]', ngay: '01-10-2026' } };
function KnTtCard(p) {
  var r = p.r, o = KNTT_THEM[r.ma] || {}, lan2 = r.lan2Goc, tc = kntcThuTucLoai(r) === 'tc', ten2 = tc ? 'Tố cáo lần hai' : 'Khiếu nại lần hai';
  var chan = r.nhap && r.lan2Het;
  return h('li', { className: 'qd-c qc kn-c' },
    h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': r.nhap ? 'Tiếp tục soạn bản nháp' : 'Xem chi tiết hồ sơ ' + r.ma, 'data-pt-go': chan ? 'snack:Không còn điều kiện gửi lần hai. Bản nháp này không còn soạn tiếp hoặc nộp được, bạn có thể xóa nháp.' : r.go }),
    h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: r.tt[1], icon: false }, r.tt[0]), r.tinh ? h('span', { className: 'qd-tinh qc-tinh qd-tinh-' + (r.kq ? 'success' : 'info') }, h('span', { className: 'qc-tinh-tx' }, r.tinh)) : null,
      lan2 ? h('span', { className: 'knd-pill knd-pill-rut' }, ten2) : null),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, r.tom)),
    dsRows([['Mã hồ sơ', h('span', { className: 'tp-num' }, r.ma)], ['Thủ tục', r.thuTuc], ['Loại', r.loai], r.qla ? ['Mã QLA', h('span', { className: 'tp-num' }, r.qla)] : null,
      lan2 ? ['Hồ sơ lần đầu', h('span', { className: 'tp-num' }, lan2)] : null,
      o.maDon ? ['Mã đơn tại Tòa án', o.maDon] : null, o.loaiTd ? ['Loại tống đạt', o.loaiTd] : null, o.tenTd ? ['Tên tống đạt (văn bản bị khiếu nại)', o.tenTd + (o.cap ? ' · ' + o.cap : '')] : null,
      [r.goc[0], h('span', { className: 'tp-num' }, r.goc[1])], o.yc ? ['Yêu cầu', o.yc] : null, r.nhap ? null : ['Người làm đơn', 'Hoàng Dương'],
      r.nhap ? null : ['Ngày gửi', o.ngay || '—'], r.nhap ? null : ['Tòa án tiếp nhận', COURT1], r.nhap ? null : ['Thời hạn giải quyết', r.han || '—']]),
    r.nhap ? h('p', { className: 'kn-ban' }, h(T.Icon, { name: 'file' }), 'Bản nháp, chưa tính thời hạn · Lưu lúc 12-11-2026 09:30') : r.kq ? h('p', { className: 'kn-kq' }, h(T.Icon, { name: 'checkCircle' }), 'Tòa án đã có văn bản giải quyết') : r.bar ? KnBar(r.bar) : null,
    r.nhap && lan2 ? (r.lan2Het ? h('p', { className: 'knd-ly' }, 'Không còn điều kiện gửi lần hai.') : h('p', { className: 'knd-han2' }, 'Hạn khiếu nại lần hai: 10-11-2026 · còn 7 ngày')) : null,
    r.lan2 ? h('div', { className: 'kn-lan2' },
      r.lan2Da ? h('button', { type: 'button', className: 'knd-link', 'data-pt-go': 'complaintTt' }, 'Đã gửi ' + ten2.toLowerCase() + ': [Mã hồ sơ lần hai]')
        : h(F, null, h(T.Button, { size: 'sm', variant: 'secondary', block: true, disabled: !!r.lan2Khoa, 'data-pt-go': r.lan2Khoa ? undefined : 'kqd1L' }, ten2 + (r.lan2Khoa ? '' : ' · còn ' + r.lan2[0] + ' ngày')),
          h('small', null, r.lan2Khoa ? '[Lý do không còn điều kiện gửi lần hai]' : 'Tòa án đã gửi Quyết định giải quyết khiếu nại · hạn ' + r.lan2[1] + '.'))) : null,
    r.nhap ? h('div', { className: 'qd-c-f qc-vk vkx-box ds-nhap' }, h('p', { className: 'qc-vk-h vkx-h' }, 'Việc cần làm'), h('div', { className: 'ph-2btn' }, Btn('Xóa nháp', 'secondary', { size: 'sm', 'data-pt-go': 'complaintsDraftDel' }),
      Btn('Tiếp tục soạn', 'secondary', chan ? { size: 'sm', disabled: true, title: 'Không còn điều kiện gửi lần hai.' } : { size: 'sm', 'data-pt-go': r.go || 'kqd1' }))) : null);
}
function KnTtBang(p) { /* W10 – Theo dõi thời hạn: mỗi hồ sơ một dòng gọn */
  return h('ul', { className: 'knd-bang' }, p.ds.map(function (r) {
    return h('li', { key: r.ma + r.tom }, h('button', { type: 'button', 'data-pt-go': r.go },
      h('span', { className: 'knd-bang-h' }, h('b', { className: 'tp-num' }, r.ma), h('span', { className: 'knd-pill knd-pill-kn' }, r.thuTuc)), h('span', { className: 'knd-bang-t' }, r.tom),
      h('small', null, 'Mã QLA: ' + (r.qla || 'Chưa cấp') + ' · ' + (r.han || 'Chưa xác định thời hạn')),
      r.nhap ? h('small', { className: 'knd-bang-n' }, 'Bản nháp, chưa tính thời hạn') : r.kq ? h('small', { className: 'knd-bang-k' }, 'Đã có kết quả giải quyết') : r.bar ? KnBar(r.bar) : null));
  }));
}
function KnTtLoc(p) { /* W9 – bảng Bộ lọc hồ sơ */
  var lo = React.useState(p.loai), tu = React.useState(p.loi ? '2026-11-10' : ''), den = React.useState(p.loi ? '2026-11-01' : ''), sai = tu[0] && den[0] && tu[0] > den[0];
  var dem = function (k) { return p.ds.filter(function (r) { return !k || kntcThuTucLoai(r) === k; }).length; };
  return h(LvSheet, { host: p.host, title: 'Bộ lọc hồ sơ', onClose: p.onClose,
    foot: h(F, null, h(T.Button, { variant: 'secondary', onClick: function () { lo[1](''); tu[1](''); den[1](''); } }, 'Xóa bộ lọc'), h(T.Button, { variant: 'secondary', onClick: p.onClose }, 'Hủy'),
      h(T.Button, { disabled: !!sai, onClick: function () { p.onApply(lo[0], (lo[0] ? 1 : 0) + (tu[0] ? 1 : 0) + (den[0] ? 1 : 0)); } }, 'Áp dụng')) },
    h('div', { className: 'kn-loc' }, P('Lọc hồ sơ khiếu nại, tố cáo trong tố tụng của bạn.', 'ph-muted'),
      h('p', { className: 'sf-h' }, 'Loại việc'), h('div', { className: 'sf-grid', role: 'radiogroup', 'aria-label': 'Loại việc' }, [['', 'Tất cả']].concat(KNTT_LOAI).map(function (x) {
        var on = lo[0] === x[0];
        return h('button', { key: x[0] || 'all', type: 'button', role: 'radio', 'aria-checked': on, className: 'ib-chip2' + (on ? ' ib-chip2-on' : ''), onClick: function () { lo[1](x[0]); } }, x[1], h('span', { className: 'ib-chip2-n tp-num' }, dem(x[0])));
      })),
      h('p', { className: 'sf-h' }, 'Ngày gửi'),
      h('div', { className: 'ib-loc-2' }, Tf('Từ ngày', { labelVisible: true, type: 'date', value: tu[0], onChange: function (e) { tu[1](e.target.value); } }), Tf('Đến ngày', { labelVisible: true, type: 'date', value: den[0], onChange: function (e) { den[1](e.target.value); } })),
      sai ? h('p', { className: 'q2-err', role: 'alert' }, h(T.Icon, { name: 'alert' }), '“Từ ngày” không được sau “Đến ngày”.') : null));
}
function KnTt(p) {
  var base = p.rong ? [] : KN_TT_HS.map(function (r) { return Object.assign({}, r, { hd: null }); }); /* M2: bỏ nút Xem Lịch */
  if (p.lan2 && base[1]) base[1] = Object.assign({}, base[1], p.lan2 === 'khoa' ? { lan2Khoa: true } : { lan2Da: true });
  if (p.nhapLan2) base.push(Object.assign({}, base[3], { tom: 'Khiếu nại lần hai quyết định giải quyết khiếu nại', thuTuc: 'KN Quyết định', loai: 'Khiếu nại quyết định tố tụng', lan2Goc: 'KNTT-2026-0009', lan2Het: p.nhapLan2 === 'het', go: 'kqd1L' }));
  if (p.dangGui) base.push({ ma: 'KNTT-2026-0014', thuTuc: 'KN Hành vi', tom: 'Khiếu nại hành vi của Thư ký Tòa án', goc: ['Vụ án liên quan', 'DS-2026-0012'], loai: 'Khiếu nại hành vi tố tụng', tt: ['Đang gửi', 'warning'], tien: 'dang', gui: 'dang', go: 'complaintTt' });
  var all = base, ti = React.useState(''), tt = React.useState('all'), q = React.useState(''), sh = React.useState(!!p.locMo), lo = React.useState(''), nLoc = React.useState(0), bang = React.useState(!!p.bang), anchor = React.useRef(null), host = useHost(anchor);
  var gui = all.filter(function (r) { return !r.nhap && r.gui !== 'dang'; }), k = khongDau(q[0].trim());
  if (!all.length) return h(IbEmpty, { icon: 'scale', title: 'Chưa có hồ sơ khiếu nại, tố cáo trong tố tụng', text: 'Bạn chưa nộp đơn khiếu nại, tố cáo nào gắn với các vụ án của mình.', action: 'Nộp đơn mới', onAction: noop });
  var st = function (r) { return r.nhap ? 'nhap' : r.gui === 'dang' ? 'dang' : 'gui'; };
  var ds = all.filter(function (r) { return (!ti[0] || r.tien === ti[0]) && (tt[0] === 'all' || st(r) === tt[0]) && (!lo[0] || kntcThuTucLoai(r) === lo[0]) && (!k || khongDau([r.ma, r.qla, r.goc[1], r.tom].join(' ')).indexOf(k) >= 0); });
  var dem = function (s) { return all.filter(function (r) { return st(r) === s; }).length; };
  var chips = [{ key: 'all', label: 'Tất cả', count: all.length }, { key: 'gui', label: 'Đã gửi', count: dem('gui') }, { key: 'nhap', label: 'Lưu nháp', count: dem('nhap') }]
    .concat(dem('dang') || tt[0] === 'dang' ? [{ key: 'dang', label: 'Đang gửi', count: dem('dang') }] : []).concat(tt[0] === 'loi' ? [{ key: 'loi', label: 'Gửi lỗi', count: 0 }] : []); /* L2 */
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    h('div', { className: 'kn-the' }, KN_TIEN.map(function (t) { var n = t[0] ? gui.filter(function (r) { return r.tien === t[0]; }).length : gui.length; return h('button', { key: t[1], type: 'button', 'aria-pressed': ti[0] === t[0], className: ti[0] === t[0] ? 'kn-the-on' : undefined, onClick: function () { ti[1](t[0]); tt[1]('all'); } }, h('small', null, t[1]), h('b', null, n)); })),
    h('div', { className: 'nv-stick' }, h('div', { className: 'ph-ibar' }, h('div', { className: 'fx-search' }, Tf('Tìm hồ sơ khiếu nại, tố cáo', { icon: 'search', placeholder: 'Tìm theo mã hồ sơ, mã tiếp nhận, mã vụ án, nội dung…', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } }))),
      h('div', { className: 'ib-docrow st-row sf-row' },
        h('button', { type: 'button', className: 'sf-pill' + (bang[0] ? ' sf-on' : ''), 'aria-pressed': bang[0], onClick: function () { bang[1](!bang[0]); } }, h(T.Icon, { name: bang[0] ? 'grid' : 'clock' }), 'Theo dõi thời hạn'),
        h('span', { className: 'sf-sp' }),
        h('button', { type: 'button', className: 'sf-pill' + (nLoc[0] ? ' sf-on' : ''), onClick: function () { sh[1](true); } }, h(T.Icon, { name: 'filter' }), 'Bộ lọc', nLoc[0] ? h('span', { className: 'sf-badge tp-num' }, nLoc[0]) : null)),
      h(KnChips, { label: 'Trạng thái', value: tt[0], onChange: function (x) { tt[1](x); ti[1](''); }, items: chips })),
    !ds.length ? h(IbEmpty, { icon: 'search', title: 'Không có hồ sơ phù hợp', text: 'Thử đổi trạng thái hoặc bộ lọc.', action: 'Xóa bộ lọc', onAction: function () { ti[1](''); tt[1]('all'); q[1](''); lo[1](''); nLoc[1](0); } })
      : bang[0] ? h(KnTtBang, { ds: ds }) : h('ul', { className: 'qd-list' }, ds.map(function (r) { return h(KnTtCard, { key: r.ma + r.tom, r: r }); })),
    sh[0] && host ? h(KnTtLoc, { host: host, ds: all, loai: lo[0], loi: p.locLoi, onClose: function () { sh[1](false); }, onApply: function (x, n) { lo[1](x); nLoc[1](n); sh[1](false); } }) : null);
}
/* ---------- Màn chung ---------- */
function KnHome(p) {
  var tab = React.useState(p.tab || 'hc'), rong = p.rong, tai = p.tai, loi = p.loi;
  var src = [['hc', 'Khiếu nại, tố cáo hành chính', 'Hệ thống KNTC', rong ? 0 : KNHC_DS.length], ['tt', 'Khiếu nại, tố cáo trong tố tụng', 'Hệ thống QLA', rong ? 0 : KN_TT_HS.filter(function (r) { return !r.nhap; }).length]];
  var noiDung = tai ? h('div', { className: 'knd-tai', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), tab[0] === 'tt' ? 'Đang tải hồ sơ khiếu nại, tố cáo trong tố tụng...' : 'Đang tải…')
    : loi ? h(T.EmptyState, { variant: 'center', icon: 'alert', title: '[Thông báo lỗi của hệ thống]', text: 'Không có thông báo thì hiện: Không tải được danh sách hồ sơ.', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: noop, className: 'nv-err' })
    : tab[0] === 'tt' ? h(KnTt, p) : h(KnHc, p);
  return DsShell('Khiếu nại — Tố cáo', h(F, null,
    tab[0] === 'hc' && p.nhap ? h(KnNhapHc, { ky: p.nhap === 'ky' }) : null,
    h('div', { className: 'kn-src', role: 'tablist', 'aria-label': 'Nguồn hệ thống tiếp nhận' }, src.map(function (s) {
      return h('button', { key: s[0], type: 'button', role: 'tab', 'aria-selected': tab[0] === s[0], className: 'kn-src-it' + (tab[0] === s[0] ? ' kn-src-on' : ''), onClick: function () { tab[1](s[0]); } },
        h('span', { className: 'kn-src-top' }, h('span', { className: 'kn-src-ic', 'aria-hidden': 'true' }, h(T.Illustration, { name: s[0] === 'hc' ? 'hanhChinh' : 'banAn' })), h('span', { className: 'kn-src-b kn-src-b-' + s[0] }, h(T.Icon, { name: 'swap' }), s[2])), h('b', null, s[1]), h('small', null, tai ? 'Đang tải…' : s[3] + ' hồ sơ'));
    })),
    noiDung, p.top || null), 'Nộp đơn mới', 'choose');
}

/* ===== v369: Khiếu nại — Tố cáo – bỏ khối 4 ô thống kê (Tổng hồ sơ / Đang xử lý / Đã có kết quả / Quá hạn xử lý) ở cả 2 tab ===== */
function KnHc(p) {
  var all = p.rong ? [] : knThem(KNHC_DS, 23), qa = React.useState(p.q || ''), nT = React.useState(10), nh = React.useState(p.tt || 'all'), q = React.useState(p.q || ''), sh = React.useState(!!p.locMo), anchor = React.useRef(null), host = useHost(anchor); /* v467 */
  var k = khongDau(qa[0].trim()), ds = all.filter(function (c) { return (nh[0] === 'all' || c.nhom === nh[0]) && (!k || khongDau(c.ma + ' ' + c.tom).indexOf(k) >= 0); });
  var gui = all.filter(function (c) { return c.nhom !== 'gnhap'; });
  var the = [['Tổng hồ sơ', gui.length], ['Đang xử lý', gui.filter(function (c) { return /g2|g3|g4/.test(c.nhom); }).length], ['Đã có kết quả', gui.filter(function (c) { return c.nhom === 'g5'; }).length], ['Quá hạn xử lý', gui.filter(function (c) { return c.han === 'qua'; }).length]];
  var chips = [{ key: 'all', label: 'Tất cả', count: all.length }].concat(KNHC_NHOM.filter(function (g) { return all.some(function (c) { return c.nhom === g[0]; }) || nh[0] === g[0]; }).map(function (g) { return { key: g[0], label: g[1], count: all.filter(function (c) { return c.nhom === g[0]; }).length }; }));
  var soLoc = nh[0] !== 'all' ? 1 : 0;
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    h('div', { className: 'nv-stick' }, h('div', { className: 'ph-ibar' }, h('div', { className: 'fx-search' }, Tf('Tìm theo mã đơn, tiêu đề đơn', { icon: 'search', placeholder: 'Tìm mã đơn, tiêu đề đơn,…', value: q[0], maxLength: 100, onChange: function (e) { q[1](e.target.value); }, onKeyDown: function (e) { if (e.key === 'Enter') { qa[1](q[0]); e.currentTarget.blur(); } }, onBlur: function () { qa[1](q[0]); }, onClear: function () { q[1](''); qa[1](''); } })),
        /* v467: bỏ hàng chip trạng thái; Trạng thái vào Bộ lọc, ô tìm và Bộ lọc cùng hàng như tab tố tụng */
        h('button', { type: 'button', className: 'sf-pill kn-loc-pill' /* v472: kiểu viên Bộ lọc như các danh sách khác */ + (soLoc ? ' sf-on' : ''), 'aria-label': 'Bộ lọc' + (soLoc ? ', đang lọc ' + soLoc + ' điều kiện' : ''), onClick: function () { sh[1](true); } },
          h(T.Icon, { name: 'filter' }), 'Bộ lọc', soLoc ? h('span', { className: 'sf-badge tp-num' }, soLoc) : null))),
    ds.length ? h('ul', { className: 'qd-list' }, ds.slice(0, nT[0]).map(function (c) { return h(KnHcCard, { key: c.ma, c: c }); }), nT[0] < ds.length ? h(KnMore, { onMore: function () { nT[1](nT[0] + 10); } }) : null)
      : k ? h(IbEmpty, { icon: 'search', title: 'Không tìm thấy hồ sơ phù hợp', text: 'Không có hồ sơ nào khớp “' + qa[0].trim() + '”. Thử mã đơn hoặc từ khoá khác.' })
      : h(IbEmpty, { icon: 'building', title: 'Không có hồ sơ nào trong mục này', text: 'Thử đổi bộ lọc hoặc nộp đơn khiếu nại, tố cáo hành chính mới.' }),
    sh[0] && host ? h(KnHcLoc, { host: host, tt: nh[0], ttItems: chips, onClose: function () { sh[1](false); }, onApply: function (t) { nh[1](t); sh[1](false); } }) : null);
}
function KnTt(p) {
  var base = p.rong ? [] : KN_TT_HS.map(function (r) { return Object.assign({}, r, { hd: null }); }); /* M2: bỏ nút Xem Lịch */
  if (p.lan2 && base[1]) base[1] = Object.assign({}, base[1], p.lan2 === 'khoa' ? { lan2Khoa: true } : { lan2Da: true });
  if (p.nhapLan2) base.push(Object.assign({}, base[3], { tom: 'Khiếu nại lần hai quyết định giải quyết khiếu nại', thuTuc: 'KN Quyết định', loai: 'Khiếu nại quyết định tố tụng', lan2Goc: 'KNTT-2026-0009', lan2Het: p.nhapLan2 === 'het', go: 'kqd1L' }));
  if (p.l2Gui) base.unshift(Object.assign({}, base[3], { ma: 'KNTT-2026-0011', tom: 'Khiếu nại lần hai quyết định giải quyết khiếu nại', thuTuc: 'KN Quyết định', loai: 'Khiếu nại quyết định tố tụng', lan2Goc: 'KNTT-2026-0009', nhap: false, tt: ['Đang giải quyết', 'info'], go: 'complaintTt' }));
  if (p.dangGui) base.push({ ma: 'KNTT-2026-0014', thuTuc: 'KN Hành vi', tom: 'Khiếu nại hành vi của Thư ký Tòa án', goc: ['Vụ án liên quan', 'DS-2026-0012'], loai: 'Khiếu nại hành vi tố tụng', tt: ['Đang gửi', 'warning'], tien: 'dang', gui: 'dang', go: 'complaintTt' });
  /* v578 (rà soát 11 điểm, phiên fork 23/11 – tai-lieu/ra-soat-kntc-11-diem-2026-11-23.md):
     lỗi 9 – thêm hồ sơ mẫu "Gửi lỗi"; lỗi 4 – bản nháp đã xóa (KNTT_XOA) không còn trên danh sách; lỗi 2 – lọc thật theo Ngày gửi (Từ ngày – Đến ngày);
     lỗi 11 – p.taiLoi: đổi Bộ lọc / tìm kiếm mà tải lỗi thì giữ ô tìm, Bộ lọc, phần danh sách thay bằng màn lỗi có Thử lại */
  if (!p.rong) base.unshift({ ma: 'KNTT-2026-0015', thuTuc: 'KN Quyết định', tom: 'Khiếu nại quyết định đình chỉ giải quyết vụ án', goc: ['Vụ án liên quan', 'DS-2026-0018'], loai: 'Khiếu nại quyết định tố tụng', tt: ['Gửi lỗi', 'danger'], tien: 'loi', gui: 'loi', go: 'complaintTt' });
  base = base.filter(function (r) { return !(r.nhap && KNTT_XOA[r.ma + '|' + r.tom]); });
  var tl0 = p.taiLoi === 'loc' || p.taiLoi === 'tim';
  var all = knThem(base, base.length ? 14 : 0), qa = React.useState(p.taiLoi === 'tim' ? 'KNTT-2026' : ''), nT = React.useState(10), ti = React.useState(''), tt = React.useState(p.tt || 'all'), q = React.useState(p.taiLoi === 'tim' ? 'KNTT-2026' : ''), sh = React.useState(!!p.locMo), lo = React.useState(p.taiLoi === 'loc' ? KNTT_LOAI[0][0] : ''), nLoc = React.useState(p.taiLoi === 'loc' ? 1 : 0), bang = React.useState(!!p.bang), vs = React.useState(!!p.kieuMo), anchor = React.useRef(null), host = useHost(anchor);
  var ng = React.useState(['', '']), loiT = React.useState(tl0), taiT = React.useState(false);
  var guiLoi = function () { if (p.taiLoi) loiT[1](true); };
  var thuLai = function () { loiT[1](false); taiT[1](true); setTimeout(function () { taiT[1](false); }, 900); };
  var so = function (d) { var m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(d || ''); return m ? m[3] + m[2] + m[1] : ''; };
  var tuS = so(ng[0][0]), denS = so(ng[0][1]);
  var gui = all.filter(function (r) { return !r.nhap && r.gui !== 'dang'; }), k = khongDau(qa[0].trim());
  if (!all.length) return h(IbEmpty, { icon: 'scale', title: 'Chưa có hồ sơ khiếu nại, tố cáo trong tố tụng', text: 'Bạn chưa nộp đơn khiếu nại, tố cáo nào gắn với các vụ án của mình.', action: 'Nộp đơn mới', onAction: noop });
  var st = function (r) { return r.nhap ? 'nhap' : r.gui === 'dang' ? 'dang' : r.gui === 'loi' ? 'loi' : 'gui'; };
  var ngayOk = function (r) { if (!tuS && !denS) return true; var d = so((KNTT_THEM[r.ma] || {}).ngay); return !!d && (!tuS || d >= tuS) && (!denS || d <= denS); }; /* v578 lỗi 2 */
  var ds = all.filter(function (r) { return (!ti[0] || r.tien === ti[0]) && (tt[0] === 'all' || st(r) === tt[0]) && (!lo[0] || kntcThuTucLoai(r) === lo[0]) && ngayOk(r) && (!k || khongDau([r.ma, r.qla, r.goc[1], r.tom].join(' ')).indexOf(k) >= 0); });
  var dem = function (s) { return all.filter(function (r) { return st(r) === s; }).length; };
  var chips = [{ key: 'all', label: 'Tất cả', count: all.length }, { key: 'gui', label: 'Đã gửi', count: dem('gui') }, { key: 'nhap', label: 'Lưu nháp', count: dem('nhap') }]
    .concat(dem('dang') || tt[0] === 'dang' ? [{ key: 'dang', label: 'Đang gửi', count: dem('dang') }] : []).concat(dem('loi') || tt[0] === 'loi' ? [{ key: 'loi', label: 'Gửi lỗi', count: dem('loi') }] : []); /* L2; v578 lỗi 9: Gửi lỗi hiện khi có hồ sơ hoặc đang chọn (như web) */
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    h('div', { className: 'nv-stick' }, h('div', { className: 'ph-ibar' }, h('div', { className: 'fx-search' }, Tf('Tìm hồ sơ khiếu nại, tố cáo', { icon: 'search', placeholder: 'Tìm theo mã hồ sơ, mã tiếp nhận, mã vụ án, nội dung…', value: q[0], onChange: function (e) { q[1](e.target.value); }, onKeyDown: function (e) { if (e.key === 'Enter') { qa[1](q[0]); guiLoi(); e.currentTarget.blur(); } }, onBlur: function () { qa[1](q[0]); }, onClear: function () { q[1](''); qa[1](''); } })),
        /* v466: ô tìm và Bộ lọc gộp một hàng (v465: đã bỏ Theo dõi thời hạn) */
        h('button', { type: 'button', className: 'sf-pill kn-loc-pill' /* v472: kiểu viên Bộ lọc như các danh sách khác */ + (nLoc[0] + (tt[0] !== 'all' ? 1 : 0) ? ' sf-on' : ''), 'aria-label': 'Bộ lọc' + (nLoc[0] + (tt[0] !== 'all' ? 1 : 0) ? ', đang lọc ' + (nLoc[0] + (tt[0] !== 'all' ? 1 : 0)) + ' điều kiện' : ''), onClick: function () { sh[1](true); } }, h(T.Icon, { name: 'filter' }), 'Bộ lọc', nLoc[0] + (tt[0] !== 'all' ? 1 : 0) ? h('span', { className: 'sf-badge tp-num' }, nLoc[0] + (tt[0] !== 'all' ? 1 : 0)) : null))),
    loiT[0] ? h(T.EmptyState, { variant: 'center', icon: 'alert', title: '[Thông báo lỗi của hệ thống]', text: 'Không có thông báo thì hiện: Không tải được danh sách hồ sơ.', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: thuLai, className: 'nv-err' }) /* v578 lỗi 11 */
    : taiT[0] ? h('div', { className: 'knd-tai', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), 'Đang tải hồ sơ khiếu nại, tố cáo trong tố tụng...')
    : !ds.length ? h(IbEmpty, { icon: 'search', title: 'Không có hồ sơ phù hợp', text: 'Thử đổi bộ lọc.' }) /* v418: bỏ nút Xóa bộ lọc */
      : h('ul', { className: 'qd-list' }, ds.slice(0, nT[0]).map(function (r, i) { return h(KnTtCard, { key: r.ma + r.tom + i, r: r }); }), nT[0] < ds.length ? h(KnMore, { onMore: function () { nT[1](nT[0] + 10); } }) : null),
    sh[0] && host ? h(KnTtLoc2, { host: host, ds: all, loai: lo[0], loi: p.locLoi, tt: tt[0], tu: ng[0][0], den: ng[0][1], ttItems: chips, /* v463: Trạng thái trong Bộ lọc */ /* v417 */ onClose: function () { sh[1](false); }, onApply: function (x, n, t, tu, den) { lo[1](x); nLoc[1](n); ng[1]([tu || '', den || '']); if (t) { tt[1](t); ti[1](''); } sh[1](false); guiLoi(); } }) : null);
}

/* ===== v370: thẻ Khiếu nại tố tụng chỉ giữ Mã hồ sơ, Thủ tục, Loại, Vụ án/đơn liên quan, Người làm đơn, Ngày gửi, Tòa án tiếp nhận ===== */
function KnTtCard(p) {
  var r = p.r, o = KNTT_THEM[r.ma] || {}, lan2 = r.lan2Goc, tc = kntcThuTucLoai(r) === 'tc', ten2 = tc ? 'Tố cáo lần hai' : 'Khiếu nại lần hai';
  var chan = r.nhap && r.lan2Het;
  return h('li', { className: 'qd-c qc kn-c' },
    h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': r.nhap ? 'Tiếp tục soạn bản nháp' : 'Xem chi tiết hồ sơ ' + r.ma, 'data-pt-go': chan ? 'snack:Không còn điều kiện gửi lần hai. Bản nháp này không còn soạn tiếp hoặc nộp được, bạn có thể xóa nháp.' : r.go }),
    h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: r.tt[1], icon: false }, r.tt[0]), r.tinh ? h('span', { className: 'qd-tinh qc-tinh qd-tinh-' + (r.kq ? 'success' : 'info') }, h('span', { className: 'qc-tinh-tx' }, r.tinh)) : null,
      lan2 ? h('span', { className: 'knd-pill knd-pill-rut' }, ten2) : null),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, r.tom)),
    dsRows([['Mã hồ sơ', h('span', { className: 'tp-num' }, r.ma)], ['Thủ tục', r.thuTuc], ['Loại', r.loai], [r.goc[0], h('span', { className: 'tp-num' }, r.goc[1])], r.nhap ? null : ['Người làm đơn', 'Hoàng Dương'], r.nhap ? null : ['Ngày gửi', o.ngay || '—'], r.nhap ? null : ['Tòa án tiếp nhận', COURT1]]),
    r.nhap ? h('p', { className: 'kn-ban' }, h(T.Icon, { name: 'file' }), 'Bản nháp, chưa tính thời hạn · Lưu lúc 12-11-2026 09:30') : r.kq ? h('p', { className: 'kn-kq' }, h(T.Icon, { name: 'checkCircle' }), 'Tòa án đã có văn bản giải quyết') : r.bar ? KnBar(r.bar) : null,
    r.nhap && lan2 ? (r.lan2Het ? h('p', { className: 'knd-ly' }, 'Không còn điều kiện gửi lần hai.') : h('p', { className: 'knd-han2' }, 'Hạn khiếu nại lần hai: 10-11-2026 · còn 7 ngày')) : null,
    r.lan2 ? h('div', { className: 'kn-lan2' },
      r.lan2Da ? h('button', { type: 'button', className: 'knd-link', 'data-pt-go': 'complaintTt' }, 'Đã gửi ' + ten2.toLowerCase() + ': [Mã hồ sơ lần hai]')
        : h(F, null, h(T.Button, { size: 'sm', variant: 'secondary', block: true, disabled: !!r.lan2Khoa, 'data-pt-go': r.lan2Khoa ? undefined : 'kqd1L' }, ten2 + (r.lan2Khoa ? '' : ' · còn ' + r.lan2[0] + ' ngày')),
          h('small', null, r.lan2Khoa ? '[Lý do không còn điều kiện gửi lần hai]' : 'Tòa án đã gửi Quyết định giải quyết khiếu nại · hạn ' + r.lan2[1] + '.'))) : null,
    r.nhap ? h('div', { className: 'qd-c-f qc-vk vkx-box ds-nhap' }, h('p', { className: 'qc-vk-h vkx-h' }, 'Việc cần làm'), h('div', { className: 'ph-2btn' }, Btn('Xóa nháp', 'secondary', { size: 'sm', 'data-pt-go': 'complaintsDraftDel' }),
      Btn('Tiếp tục soạn', 'secondary', chan ? { size: 'sm', disabled: true, title: 'Không còn điều kiện gửi lần hai.' } : { size: 'sm', 'data-pt-go': r.go || 'kqd1' }))) : null);
}

/* ===== v371: thẻ Khiếu nại tố tụng bỏ dòng "Loại" ===== */
function KnTtCard(p) {
  var r = p.r, o = KNTT_THEM[r.ma] || {}, lan2 = r.lan2Goc, tc = kntcThuTucLoai(r) === 'tc', ten2 = tc ? 'Tố cáo lần hai' : 'Khiếu nại lần hai';
  var chan = r.nhap && r.lan2Het;
  return h('li', { className: 'qd-c qc kn-c' },
    h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': r.nhap ? 'Tiếp tục soạn bản nháp' : 'Xem chi tiết hồ sơ ' + r.ma, 'data-pt-go': chan ? 'snack:Không còn điều kiện gửi lần hai. Bản nháp này không còn soạn tiếp hoặc nộp được, bạn có thể xóa nháp.' : r.go }),
    h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: r.tt[1], icon: false, className: 'kntt-st kntt-st-' + (KNTT_MAU[r.tt[0]] || 0) }, r.tt[0]), r.tinh ? h('span', { className: 'qd-tinh qc-tinh qd-tinh-' + (r.kq ? 'success' : 'info') + ' kntt-dot kntt-dot-' + (KNTT_MAU[r.tt[0]] || 0) }, h('span', { className: 'qc-tinh-tx' }, r.tinh)) : null,
      lan2 ? (KNTT_L2PA === 'P' ? h('span', { className: 'knd-pill knd-pill-rut' }, ten2) : KNTT_L2PA === 'E' || KNTT_L2PA === 'G' ? null : h(T.Tag, null, ten2)) : null), /* v461: nhãn lần hai theo design system */
    lan2 && KNTT_L2PA === 'E' ? h('p', { className: 'tp-hs-kind kl2-kind' }, ten2) : null,
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, r.tom)),
    dsRows([['Mã tiếp nhận' /* v420 */, h('span', { className: 'tp-num' }, r.ma)], r.nhap ? null : ['Tòa án tiếp nhận', COURT1], r.nhap ? null : ['Ngày gửi', o.ngay || '—'],
      r.nhap && KNTT_NHPA === 'C' ? ['Lưu lúc', KNTT_LUU] : null, ['Thủ tục', KNTT_TT_DAY[kntcThuTucLoai(r)]], ['Hồ sơ bị khiếu nại' /* v421 */, h('span', null, h('span', { className: 'tp-num' }, r.goc[1]), KNTT_HS_TEN[r.goc[1]] ? ' — ' + KNTT_HS_TEN[r.goc[1]] : '')]]), /* v414 */
    null /* v422: bỏ thanh thời hạn; v424: bỏ dòng Tòa án đã có văn bản giải quyết và dòng Bản nháp, chưa tính thời hạn */,
    r.nhap && lan2 ? (r.lan2Het ? h('p', { className: 'knd-ly' }, 'Không còn điều kiện gửi lần hai.') : h('p', { className: 'knd-han2' }, 'Hạn khiếu nại lần hai: 10-11-2026 · còn 7 ngày')) : null,
    r.lan2 ? h('div', { className: 'kn-lan2' },
      r.lan2Da ? h('button', { type: 'button', className: 'knd-link kntt-l2-link', 'data-pt-go': 'complaintTtL2' }, 'Đã gửi ' + ten2.toLowerCase() + ': [Mã hồ sơ lần hai]') /* v578 lỗi 7: bấm được, mở Chi tiết hồ sơ lần hai */
        : KnLan2The(ten2, r)) : null, /* v425: nút lần hai thành thẻ kiểu Việc cần làm */
    null /* v423: bỏ khối Việc cần làm (Xóa nháp, Tiếp tục soạn) */,
    lan2 && KNTT_L2PA === 'F' ? h('div', { className: 'tp-hs-extra kl2-x' }, h('p', { className: 'tp-hs-note' }, h(T.Icon, { name: 'file' }), h('span', null, 'Lần hai của hồ sơ ', h('b', { className: 'tp-num' }, lan2)))) : null,
    lan2 && (KNTT_L2PA === 'D' || KNTT_L2PA === 'E' || KNTT_L2PA === 'G') ? h('div', { className: 'tp-hs-case kl2-case' }, h('span', null, 'Hồ sơ lần đầu ', h('b', { className: 'tp-num' }, lan2), KNTT_L2TEN[lan2] ? ' · ' + KNTT_L2TEN[lan2] : '')) : null,
    r.nhap ? KnNhapNut(r, chan) : null); /* v462: Tiếp tục soạn, Xóa nháp như web, cuối thẻ */
}

/* ===== v373: Khiếu nại, tố cáo – Chọn thủ tục: bảng từ đáy, mỗi thủ tục là thẻ viền có ô tròn chọn, dòng "tên nhóm · n thủ tục" (người dùng hủy PA C của v372, chọn PA A) ===== */
function CtRadio(on) { return h('span', { className: 'ct-rd' + (on ? ' ct-rd-on' : ''), 'aria-hidden': 'true' }); }
function CtList(p) { /* pa A: thẻ viền có ô tròn chọn · pa B: dòng gọn có ô tròn, mô tả 1 dòng */
  return h('ul', { className: 'ct-l ct-l-' + p.pa, role: 'radiogroup', 'aria-label': 'Thủ tục' }, p.items.map(function (t) {
    var on = p.v === t.ma;
    return h('li', { key: t.ma }, h('button', { type: 'button', role: 'radio', 'aria-checked': on, className: 'ct-it' + (on ? ' ct-on' : ''), onClick: function () { p.onPick(t.ma); } },
      CtRadio(on), h('span', { className: 'ct-tx' }, h('b', null, t.ten), h('small', null, t.desc))));
  }));
}
function KnThuTucPa(p) {
  var o = React.useState(!!p.open), q = React.useState(''), anchor = React.useRef(null), host = useHost(anchor);
  var list = KN_TT.filter(function (t) { return t.n === p.nhom; }), cur = list.filter(function (t) { return t.ma === p.v; })[0];
  var kq = khongDau(q[0].trim()), loc = list.filter(function (t) { return !kq || khongDau(t.ten + ' ' + t.desc).indexOf(kq) >= 0; });
  var tim = list.length > 6 ? h('div', { className: 'fx-search' }, Tf('Tìm thủ tục', { icon: 'search', placeholder: 'Tìm theo nội dung, VD: kỷ luật, mua sắm, đạo đức…', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })) : null;
  var rong = h('p', { className: 'ph-lv-empty' }, 'Không có thủ tục nào khớp «' + q[0] + '».');
  if (p.pa === 'C') return h('div', { className: 'ct-c' }, tim, h('p', { className: 'ct-dem' }, loc.length + ' thủ tục'), loc.length ? h(CtList, { pa: 'A', items: loc, v: p.v, onPick: p.onChange }) : rong);
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    h(T.SelectField, { label: 'Thủ tục', placeholder: '— Chọn thủ tục —', value: cur ? cur.ten : undefined, open: o[0], onClick: function () { q[1](''); o[1](true); } }),
    o[0] && host ? h(LvSheet, { host: host, title: 'Chọn thủ tục', onClose: function () { o[1](false); }, top: h(F, null, tim, h('p', { className: 'ct-dem' }, KnTenNhom(p.nhom) + ' · ' + loc.length + ' thủ tục')) },
      loc.length ? h(CtList, { pa: p.pa, items: loc, v: p.v, onPick: function (id) { p.onChange(id); o[1](false); } }) : rong) : null);
}
function ChooseKn(p) {
  p = p || {};
  var nh = React.useState(p.nhom || null), tt = React.useState(p.tt || '');
  var t = tt[0] && KN_TT.filter(function (x) { return x.ma === tt[0]; })[0], so = nh[0] ? KN_TT.filter(function (x) { return x.n === nh[0]; }).length : 0;
  function chonNhom(k) { if (k !== nh[0]) { nh[1](k); tt[1](''); } }
  return h(Phone, { cls: 'ph-hd' }, h(T.AppBar, { variant: 'plain', title: 'Chọn thủ tục', onBack: noop }),
    h(Body, { cls: 'ph-plain ph-s1 ct2' },
      /* v476: bỏ câu dẫn "Bạn muốn khiếu nại hoặc tố cáo việc gì?" */
      h('section', { className: 'ph-s1-sec' }, Hd('Nhóm thủ tục', 1), PickRow('Nhóm thủ tục', KN_NHOM_PICK, nh[0], chonNhom),
        null), /* v476: bỏ dòng nhóm đã chọn · số thủ tục */
      nh[0] ? h('section', { className: 'ph-s1-sec' }, Hd('Thủ tục', 1), h(KnThuTucPa, { pa: 'A', nhom: nh[0], v: tt[0], onChange: tt[1] }), t ? KnChiTiet2(t) : null) : null),
    h('div', { className: 'ph-foot' }, Bar(Btn('Bắt đầu khai đơn', 'primary', t ? { 'data-pt-go': knDau(t) + '1' } : { disabled: true }))));
}

/* ===== v374: Chọn thủ tục khiếu nại, tố cáo – bỏ ô tròn chọn trên thẻ; chạm thẻ chỉ đánh dấu, bấm "Áp dụng" ở chân bảng mới chọn và đóng bảng ===== */
function CtList(p) {
  return h('ul', { className: 'ct-l ct-l-' + p.pa, role: 'radiogroup', 'aria-label': 'Thủ tục' }, p.items.map(function (t) {
    var on = p.v === t.ma;
    return h('li', { key: t.ma }, h('button', { type: 'button', role: 'radio', 'aria-checked': on, className: 'ct-it' + (on ? ' ct-on' : ''), onClick: function () { p.onPick(t.ma); } },
      h('span', { className: 'ct-tx' }, h('b', null, t.ten), h('small', null, t.desc))));
  }));
}
function KnThuTucPa(p) {
  var o = React.useState(!!p.open), q = React.useState(''), tam = React.useState(p.v || ''), anchor = React.useRef(null), host = useHost(anchor);
  var list = KN_TT.filter(function (t) { return t.n === p.nhom; }), cur = list.filter(function (t) { return t.ma === p.v; })[0];
  var kq = khongDau(q[0].trim()), loc = list.filter(function (t) { return !kq || khongDau(t.ten + ' ' + t.desc).indexOf(kq) >= 0; });
  var tim = list.length > 6 ? h('div', { className: 'fx-search' }, Tf('Tìm thủ tục', { icon: 'search', placeholder: 'Tìm theo nội dung, VD: kỷ luật, mua sắm, đạo đức…', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })) : null;
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    h(T.SelectField, { label: 'Thủ tục', placeholder: '— Chọn thủ tục —', value: cur ? cur.ten : undefined, open: o[0], onClick: function () { q[1](''); tam[1](p.v || ''); o[1](true); } }),
    o[0] && host ? h(LvSheet, { host: host, title: 'Chọn thủ tục', onClose: function () { o[1](false); }, top: h(F, null, tim, h('p', { className: 'ct-dem' }, KnTenNhom(p.nhom) + ' · ' + loc.length + ' thủ tục')),
      foot: h(T.Button, { block: true, disabled: !tam[0], onClick: function () { p.onChange(tam[0]); o[1](false); } }, 'Áp dụng') },
      loc.length ? h(CtList, { pa: 'A', items: loc, v: tam[0], onPick: tam[1] }) : h('p', { className: 'ph-lv-empty' }, 'Không có thủ tục nào khớp «' + q[0] + '».')) : null);
}

/* ===== v376 (16/11/2026): khối hành động đầu màn chi tiết – mỗi hành động một thẻ (người dùng chọn PA B, các thẻ cùng kiểu).
   Mỗi thẻ: nội dung yêu cầu + hạn bên trái, nút hành động bên phải (tối đa 2 dòng chữ). Các thẻ cùng kiểu thẻ đầu: nền vàng, nút chính; mức gấp thể hiện ở màu dòng hạn.
   Hạn theo web: mỗi hành động có hạn riêng theo ma trận tống đạt – hành động (hanhDongMaTran[].han / ngayHan; null = không giới hạn thời hạn).
   Hành động phụ cùng trả lời một yêu cầu có hạn (VD hết hạn bổ sung) dùng hạn của yêu cầu đó; chưa xác định được thì [Hạn thực hiện].
   Bỏ nút mũi tên xuống và bảng chọn từ đáy. ===== */
var TDX_INFO = {
  'Đề nghị miễn, giảm án phí': { nd: 'Đề nghị miễn, giảm tạm ứng án phí', han: 'Hạn [Hạn đề nghị miễn, giảm]' },
  'Lập đơn mới từ đơn này': { han: null },
  'Khiếu nại việc trả lại đơn (Trong 10 ngày)': { nd: 'Khiếu nại việc trả lại đơn', han: 'Hạn cuối [Hạn khiếu nại] · trong 10 ngày', l: 'Khiếu nại việc trả lại đơn' },
  'Đề nghị thay đổi hòa giải viên': { han: 'Hạn [Hạn đề nghị thay đổi]' },
  'Đề nghị thay đổi người đối thoại': { han: 'Hạn [Hạn đề nghị thay đổi]' },
  'Vào phòng họp trực tuyến': { nd: 'Tham gia phiên họp trực tuyến', han: null },
  'Rút đơn khởi kiện': { nd: 'Yêu cầu rút đơn khởi kiện', han: null },
  'Xem văn bản': { nd: 'Văn bản yêu cầu sửa đổi, bổ sung', han: null },
  'Rút đơn': { han: null }
};
function tdxHan(txt, con, gap) {
  return h('p', { className: 'tdx-han ' + (!txt ? 'tdx-han-0' : gap ? 'tdx-han-danger' : 'tdx-han-warning') }, h(T.Icon, { name: 'clock' }),
    txt ? h('span', null, txt, con ? ' · ' : null, con ? h('strong', null, con) : null) : 'Không giới hạn thời hạn');
}
function tdxBtn(b) {
  return h(T.Button, { size: 'sm', variant: 'primary', disabled: b.dis, className: 'tdx-btn' + (b.khoa ? ' q2-khoa' : ''), 'aria-label': (b.lb || b.l) + (b.khoa ? ', đang bị khóa: ' + b.khoa : ''), 'aria-disabled': b.khoa ? true : undefined, 'data-pt-go': b.dis ? undefined : b.khoa ? 'snack:' + b.khoa : b.go },
    b.khoa ? h(T.Icon, { name: 'lock' }) : null, h('span', { className: 'tdx-lb' }, b.lb || b.l));
}
/* mỗi hành động → { nd, han, con, gap, b, note } */
function tdxCards(o) {
  var ds = o.btn ? [o.btn].concat(o.more || []) : (o.two || []);
  var t = o.t, hanA = null, m = /^(.*) · hạn (\S+)$/.exec(o.t || '');
  if (m) { t = m[1]; hanA = 'Hạn ' + m[2]; }
  if (o.han && /^Hạn /.test(o.han)) hanA = o.han;
  var gapA = o.tone === 'danger' || /quá hạn/.test(o.con || ''), i0 = ds[0] ? (TDX_INFO[ds[0].l] || {}) : {};
  var hanYc = hanA; /* hạn của yêu cầu trong khối – hành động phụ chưa có hạn riêng dùng chung */
  if (!hanA && i0.han) hanA = i0.han;
  var noteA = o.note && !ds.some(function (x) { return x.khoa === o.note; }) ? o.note : null;
  return [{ k: 'a', nd: t, han: hanA, con: o.con, gap: gapA, b: ds[0] ? Object.assign({}, ds[0], { lb: i0.l }) : null, note: noteA }]
    .concat(ds.slice(1).map(function (b, i) {
      var f = TDX_INFO[b.l] || {}, han = f.han !== undefined ? f.han : hanYc || '[Hạn thực hiện]';
      return { k: 'p' + i, nd: f.nd || b.l, han: han, con: han === hanYc ? o.con : null, gap: han === hanYc && gapA, b: Object.assign({}, b, { lb: f.l }) };
    }));
}
function DtViec(o) {
  var an = React.useState(false);
  if (an[0]) return null;
  return h('div', { className: 'tdx', role: 'status' }, tdxCards(o).map(function (c) {
    return h('section', { key: c.k, className: 'tdx-c' + (c.k === 'a' && o.dong ? ' tdx-dong' : '') },
      c.k === 'a' && o.dong ? h('button', { type: 'button', className: 'q3-x', 'aria-label': 'Đóng thông báo', onClick: function () { an[1](true); } }, h(T.Icon, { name: 'x' })) : null,
      h('div', { className: 'tdx-r' }, h('div', { className: 'tdx-t' }, h('b', { className: 'tdx-nd' }, c.nd), tdxHan(c.han, c.con, c.gap)), c.b ? tdxBtn(c.b) : null),
      c.b && c.b.khoa ? h('p', { className: 'q3-note' }, c.b.khoa) : null, c.note ? h('p', { className: 'q3-note' }, c.note) : null);
  }));
}

/* ===== v377 (16/11/2026): thẻ đơn (tab Danh sách đơn / Đơn phát sinh) – "Xem đơn" thành dòng tệp đơn (người dùng chọn PA A): ô xám có nhãn PDF, tên tệp, "Bản đơn đã ký số", biểu tượng mắt; chạm mở màn xem tệp ===== */
var XD_PA = 'A';
function DtDonThe(d) {
  var pa = XD_PA, xem = function () { window.__ibFile = d.file; };
  var hit = d.go ? h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Tiếp tục soạn: ' + d.t, 'data-pt-go': d.go })
    : d.file ? h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem đơn: ' + d.t, 'data-pt-go': 'attachment', onClickCapture: xem }) : null;
  var nut = !d.file ? null
    : pa === 'A' ? h('button', { type: 'button', className: 'xd-file', 'data-pt-go': 'attachment', onClickCapture: xem, 'aria-label': 'Xem đơn ' + d.file }, /* A: dòng tệp đơn */
        h('span', { className: 'nd-file-ic', 'aria-hidden': 'true' }, 'PDF'), h('span', { className: 'xd-file-tx' }, h('b', null, d.file), h('small', null, 'Bản đơn đã ký số')), h(T.Icon, { name: 'eye' }))
    : pa === 'B' ? h('div', { className: 'xd-foot' }, h(T.Button, { size: 'sm', variant: 'secondary', icon: 'eye', 'data-pt-go': 'attachment', onClickCapture: xem }, 'Xem đơn')) /* B: nút viền bên phải chân thẻ */
    : null;
  return h('li', { key: d.t, className: 'qd-c qc' }, pa === 'C' ? null : hit,
    h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: d.tt[1], icon: false }, d.tt[0]),
      pa === 'C' && d.file ? h('button', { type: 'button', className: 'tp-icon-btn xd-ic', 'aria-label': 'Xem đơn: ' + d.t, 'data-pt-go': 'attachment', onClickCapture: xem }, h(T.Icon, { name: 'eye' })) : null), /* C: biểu tượng mắt góc phải */
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, d.t)),
    h('dl', { className: 'qc-ben' }, [['Loại đơn', d.loai], ['Mã tiếp nhận', h('span', { className: 'tp-num' }, vd(d.ma))], d.ngay].map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0]), h('dd', null, r[1])); })),
    nut,
    d.go ? h('div', { className: 'qd-c-f qc-vk vkx-box' }, h('p', { className: 'qc-vk-h vkx-h' }, 'Việc cần làm'), h('ul', { className: 'qc-vk-l' },
      h('li', { className: 'vk-card vka vkx vkx-none' }, h('button', { type: 'button', className: 'vka-b', 'data-pt-go': d.go }, h('span', { className: 'vka-tx' }, h('b', null, 'Tiếp tục soạn'), h('small', null, 'Không có thời hạn')))))) : null);
}

/* v542 (23/11/2026): thẻ nháp – nút "Tiếp tục soạn" cũng qua hộp "Đang tải đơn để chỉnh sửa…" (draftLoad) rồi mới vào màn soạn đơn, đồng nhất với chạm thẻ */
/* ===== v379 (16/11/2026): Danh sách đơn và tiến trình – dữ liệu thẻ đơn mới: mỗi đơn 1 việc cần làm (thẻ đầu 2), đủ các hành động có đường dẫn trong DM_HANHDONG (CSDL 10.14.142.30), bỏ việc "Xem đơn" (trùng bấm thẻ).
   Trạng thái + tình trạng đơn (+ tình trạng vụ án) đúng với hành động: hành động ma trận theo Hanh_dong_theo_trang_thai (DM-03), hành động khác theo DM_TINHTRANG_HANHDONG / DM_TINHTRANG.
   Hạn mẫu đủ 3 trường hợp, thẻ việc tô màu: còn hạn (xanh) · sắp hết hạn (vàng) · quá hạn (đỏ; việc nộp tiền quá hạn bị khóa); hành động không theo ma trận: không có thời hạn.
   Giữ thẻ đơn phá sản cũ (không có hành động DM_HANHDONG thuộc loại này). Bảng đối chiếu: prototype-src/shots/viec-can-lam/bang-trang-thai.md ===== */
function qdViec(d) {
  if (d.vk) return d.vk.map(function (v) { var hn = v[2] || null; return { t: v[0], go: v[1], hn: hn, lock: !!hn && hn[1] === 'qua' && v[1] === 'dvcqgExt' }; });
  var hh = d.hanHd || {}, ds = [];
  if (d.hd) hdActs(d.hd).forEach(function (a) { var code = d.hd.filter(function (c) { return HD[c] && HD[c][0] === a[0]; })[0]; var hn = hh[code] || (d.hd.length === 1 ? d.han : null); ds.push({ t: a[0], go: a[1], hn: hn, lock: !!hn && hn[1] === 'qua' && a[1] === 'dvcqgExt' }); });
  else if (d.cta) ds.push({ t: d.cta[0], go: d.cta[1], hn: d.han, lock: false });
  return ds;
}
var QD_VK = [{"k": "khoikien", "lv": "DS", "ma": "TN-20261000-0001", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng vay tài sản", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Yêu cầu sửa đổi, bổ sung đơn", "bo-sung"], "go": "appDetail", "vk": [["Sửa đổi, bổ sung đơn khởi kiện", "sd1", ["Còn 5 ngày", "an"]], ["Bổ sung", "appYcFiles", null]]}, {"k": "khoikien", "lv": "DS", "ma": "—", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng mua bán hàng hóa", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-01b", "tinh": ["Chờ đủ chữ ký của các nguyên đơn", "cho"], "go": "appDetailSign", "vk": [["Ký đơn", "appDetailSign", null]]}, {"k": "khoikien", "lv": "DS", "ma": "—", "ngay": "20-10-2026", "t": "Tranh chấp quyền sử dụng đất", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-01", "tinh": ["Lưu tạm", "cho"], "go": "draftLoad", "vk": [["Tiếp tục soạn", "draftLoad", null]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261003-0004", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng thuê nhà", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-02b", "tinh": ["Đang chờ Tòa chấp nhận", "cho"], "go": "mediationDetail", "vk": []}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261004-0005", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng cung ứng dịch vụ", "tom": "Vụ án: DS-2026-0016 · Tình trạng vụ án: Yêu cầu bổ sung tài liệu, chứng cứ · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetailAccepted", "vk": [["Cung cấp tài liệu, chứng cứ theo yêu cầu của Tòa án", "cc1", ["Còn 2 ngày", "sap"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261005-0006", "ngay": "20-10-2026", "t": "Ly hôn, tranh chấp nuôi con", "tom": "Vụ án: DS-2026-0017 · Tình trạng vụ án: Yêu cầu bổ sung tài liệu, chứng cứ · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetailAccepted", "vk": [["Bổ sung tài liệu, chứng cứ", "appYcFiles", null]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261006-0007", "ngay": "20-10-2026", "t": "Tranh chấp thừa kế tài sản", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Chờ nộp tạm ứng án phí / lệ phí", "an-phi"], "go": "appDetail", "vk": [["Nộp tiền tạm ứng án phí", "dvcqgExt", ["Quá hạn 1 ngày", "qua"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261007-0008", "ngay": "20-10-2026", "t": "Đòi bồi thường thiệt hại ngoài hợp đồng", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Chờ nộp tạm ứng chi phí tố tụng", "an-phi"], "go": "appDetail", "vk": [["Nộp tiền tạm ứng chi phí tố tụng", "dvcqgExt", ["Còn 5 ngày", "an"]]]}, {"k": "viecdansu", "lv": "DS", "ma": "TN-20261008-0009", "ngay": "20-10-2026", "t": "Yêu cầu công nhận kết quả hòa giải thành ngoài Tòa án", "tom": "Người yêu cầu: Hoàng Dương · Người bị yêu cầu: Nguyễn Thị Hằng", "vt": "Người yêu cầu", "tt": "ST-03", "tinh": ["Chờ nộp tạm ứng án phí / lệ phí", "an-phi"], "go": "appDetail", "vk": [["Nộp lệ phí giải quyết việc dân sự", "dvcqgExt", ["Còn 2 ngày", "sap"]]]}, {"k": "khangcao", "lv": "DS", "ma": "TN-20261009-0010", "ngay": "20-10-2026", "t": "Kháng cáo bản án sơ thẩm", "tom": "Vụ án: DS-2026-0012", "vt": "Người kháng cáo", "tt": "ST-03", "tinh": ["Chờ nộp tạm ứng án phí phúc thẩm", "an-phi"], "go": "appealDetail", "vk": [["Nộp tiền tạm ứng án phí phúc thẩm và nộp biên lai cho Tòa án", "dvcqgExt", ["Quá hạn 1 ngày", "qua"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261010-0011", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng góp vốn", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-04", "tinh": ["Đã trả lại đơn", "xong"], "go": "appDetail", "vk": [["Khiếu nại việc trả lại đơn khởi kiện", "kqd1Tong", ["Còn 5 ngày", "an"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261011-0012", "ngay": "20-10-2026", "t": "Tranh chấp về tiền lương", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-04", "tinh": ["Đã giải quyết khiếu nại — giữ nguyên việc trả lại đơn", "xong"], "go": "appDetail", "vk": [["Khiếu nại lên Chánh án Tòa án trên một cấp trực tiếp", "kqd1L", ["Còn 2 ngày", "sap"]]]}, {"k": "viecdansu", "lv": "DS", "ma": "TN-20261012-0013", "ngay": "20-10-2026", "t": "Yêu cầu tuyên bố hợp đồng vô hiệu", "tom": "Người yêu cầu: Hoàng Dương · Người bị yêu cầu: Nguyễn Thị Hằng", "vt": "Người yêu cầu", "tt": "ST-04", "tinh": ["Đã trả lại đơn", "xong"], "go": "appDetail", "vk": [["Khiếu nại việc trả lại đơn yêu cầu", "kqd1Tong", ["Quá hạn 1 ngày", "qua"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261013-0014", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng vay tài sản", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetail", "vk": [["Khiếu nại quyết định về biện pháp khẩn cấp tạm thời", "kqd1Tong", ["Còn 5 ngày", "an"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261014-0015", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng mua bán hàng hóa", "tom": "Vụ án: DS-2026-0026 · Tình trạng vụ án: Đã có QĐ đưa ra xét xử theo thủ tục rút gọn · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetailAccepted", "vk": [["Khiếu nại quyết định đưa vụ án ra xét xử theo thủ tục rút gọn", "kqd1Tong", ["Còn 2 ngày", "sap"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261015-0016", "ngay": "20-10-2026", "t": "Tranh chấp quyền sử dụng đất", "tom": "Vụ án: DS-2026-0027 · Tình trạng vụ án: Đã thụ lý — chuẩn bị xét xử · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetailAccepted", "vk": [["Khiếu nại văn bản, thông báo tố tụng khác (dân sự 15 ngày, hành chính 10 ngày)", "kqd1Tong", ["Quá hạn 1 ngày", "qua"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261016-0017", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng thuê nhà", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã chuyển Tòa án khác", "cho"], "go": "appDetail", "vk": [["Khiếu nại quyết định chuyển hồ sơ vụ việc cho Tòa án khác (3 ngày làm việc)", "kqd1Tong", ["Còn 5 ngày", "an"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261017-0018", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng cung ứng dịch vụ", "tom": "Vụ án: DS-2026-0029 · Tình trạng vụ án: Đã tuyên án / ra quyết định sơ thẩm · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-04", "tinh": ["Đã xét xử — có bản án / quyết định", "xong"], "go": "appDetailAccepted", "vk": [["Kháng cáo bản án, quyết định sơ thẩm", "kc1", ["Còn 2 ngày", "sap"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261018-0019", "ngay": "20-10-2026", "t": "Ly hôn, tranh chấp nuôi con", "tom": "Vụ án: DS-2026-0030 · Tình trạng vụ án: Đã tuyên án / ra quyết định sơ thẩm · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-04", "tinh": ["Đã xét xử — có bản án / quyết định", "xong"], "go": "appDetailAccepted", "vk": [["Nộp đơn kháng cáo", "kc1", null]]}, {"k": "viecdansu", "lv": "DS", "ma": "TN-20261019-0020", "ngay": "20-10-2026", "t": "Yêu cầu công nhận thuận tình ly hôn", "tom": "Người yêu cầu: Hoàng Dương · Người bị yêu cầu: Nguyễn Thị Hằng", "vt": "Người yêu cầu", "tt": "ST-04", "tinh": ["Đã xét xử — có bản án / quyết định", "xong"], "go": "appDetail", "vk": [["Kháng cáo quyết định giải quyết việc dân sự", "kc1", ["Quá hạn 1 ngày", "qua"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261020-0021", "ngay": "20-10-2026", "t": "Tranh chấp thừa kế tài sản", "tom": "Vụ án: DS-2026-0032 · Tình trạng vụ án: Tạm đình chỉ · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetailAccepted", "vk": [["Kháng cáo quyết định tạm đình chỉ", "kc1", ["Còn 5 ngày", "an"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261021-0022", "ngay": "20-10-2026", "t": "Đòi bồi thường thiệt hại ngoài hợp đồng", "tom": "Vụ án: DS-2026-0033 · Tình trạng vụ án: Tạm đình chỉ · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetailAccepted", "vk": [["Kháng cáo quyết định tạm đình chỉ", "kc1", null]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261022-0023", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng góp vốn", "tom": "Vụ án: DS-2026-0034 · Tình trạng vụ án: Đình chỉ · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetailAccepted", "vk": [["Kháng cáo quyết định đình chỉ", "kc1", ["Còn 2 ngày", "sap"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261023-0024", "ngay": "20-10-2026", "t": "Tranh chấp về tiền lương", "tom": "Vụ án: DS-2026-0035 · Tình trạng vụ án: Đình chỉ · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetailAccepted", "vk": [["Kháng cáo quyết định đình chỉ", "kc1", null]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261024-0025", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng vay tài sản", "tom": "Vụ án: DS-2026-0036 · Tình trạng vụ án: Đình chỉ · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetailAccepted", "vk": [["Kháng cáo quyết định đình chỉ giải quyết việc dân sự", "kc1", ["Quá hạn 1 ngày", "qua"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261025-0026", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng mua bán hàng hóa", "tom": "Vụ án: DS-2026-0037 · Tình trạng vụ án: Đã công nhận sự thỏa thuận · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-04", "tinh": ["Hòa giải thành — đã công nhận", "xong"], "go": "appDetailAccepted", "vk": [["Kháng cáo quyết định công nhận", "kc1", null]]}, {"k": "khangcao", "lv": "DS", "ma": "TN-20261026-0027", "ngay": "20-10-2026", "t": "Kháng cáo bản án sơ thẩm", "tom": "Vụ án: DS-2026-0012", "vt": "Người kháng cáo", "tt": "ST-03", "tinh": ["Yêu cầu làm lại / sửa đổi đơn kháng cáo", "bo-sung"], "go": "appealDetail", "vk": [["Làm lại hoặc sửa đổi, bổ sung đơn kháng cáo", "kcs1", ["Còn 5 ngày", "an"]]]}, {"k": "khangcao", "lv": "DS", "ma": "TN-20261027-0028", "ngay": "20-10-2026", "t": "Kháng cáo bản án sơ thẩm", "tom": "Vụ án: DS-2026-0012", "vt": "Người kháng cáo", "tt": "ST-03", "tinh": ["Yêu cầu làm lại / sửa đổi đơn kháng cáo", "bo-sung"], "go": "appealDetail", "vk": [["Làm lại / sửa đổi đơn kháng cáo", "kc1", null]]}, {"k": "khangcao", "lv": "DS", "ma": "TN-20261028-0029", "ngay": "20-10-2026", "t": "Kháng cáo bản án sơ thẩm", "tom": "Vụ án: DS-2026-0012", "vt": "Người kháng cáo", "tt": "ST-03", "tinh": ["Đang xem xét lý do kháng cáo quá hạn", "cho"], "go": "appealDetail", "vk": [["Trình bày lý do và xuất trình chứng cứ về việc kháng cáo quá hạn", "kqh1", ["Còn 2 ngày", "sap"]]]}, {"k": "khangcao", "lv": "DS", "ma": "TN-20261029-0030", "ngay": "20-10-2026", "t": "Kháng cáo bản án sơ thẩm", "tom": "Vụ án: DS-2026-0012", "vt": "Người kháng cáo", "tt": "ST-03", "tinh": ["Vụ án có kháng cáo", "cho"], "go": "appealDetail", "vk": [["Gửi văn bản nêu ý kiến về nội dung kháng cáo", "ykc1", ["Quá hạn 1 ngày", "qua"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261030-0031", "ngay": "20-10-2026", "t": "Tranh chấp quyền sử dụng đất", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Chờ lựa chọn hòa giải / đối thoại (lần 1)", "cho"], "go": "mediationDetail", "vk": [["Trả lời lựa chọn hòa giải - vụ việc dân sự", "hgReply", ["Còn 5 ngày", "an"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261031-0032", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng thuê nhà", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Chờ lựa chọn hòa giải / đối thoại (lần 1)", "cho"], "go": "mediationDetail", "vk": [["Chọn Hòa giải viên", "hgReply", null]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261032-0033", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng cung ứng dịch vụ", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Chờ lựa chọn hòa giải / đối thoại (lần 2)", "cho"], "go": "mediationDetail", "vk": [["Trả lời lựa chọn hòa giải", "hgChange", null]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261033-0034", "ngay": "20-10-2026", "t": "Ly hôn, tranh chấp nuôi con", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã chỉ định Hòa giải viên", "cho"], "go": "mediationDetail", "vk": [["Đề nghị thay đổi hòa giải viên", "hgChange", ["Còn 2 ngày", "sap"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261034-0035", "ngay": "20-10-2026", "t": "Tranh chấp thừa kế tài sản", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đang hòa giải / đối thoại tiền tố tụng", "cho"], "go": "mediationDetail", "vk": [["Đề nghị hoãn phiên hòa giải", "hgDelay", ["Quá hạn 1 ngày", "qua"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261035-0036", "ngay": "20-10-2026", "t": "Đòi bồi thường thiệt hại ngoài hợp đồng", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã xếp lịch phiên hòa giải", "cho"], "go": "mediationDetail", "vk": [["Tham gia phiên tòa trực tuyến", "snack:Đang mở phòng họp trực tuyến", null]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261036-0037", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng góp vốn", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Chờ phiên họp ghi nhận kết quả hòa giải", "cho"], "go": "mediationDetail", "vk": [["Xem lịch phiên họp", "mediationDetail", null]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261037-0038", "ngay": "20-10-2026", "t": "Tranh chấp về tiền lương", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-04", "tinh": ["Công nhận kết quả hòa giải tiền tố tụng — kết thúc", "xong"], "go": "mediationDetail", "vk": [["Đề nghị xem xét kết quả công nhận hòa giải", "hgReview", ["Còn 5 ngày", "an"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261038-0039", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng vay tài sản", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Chờ lựa chọn hòa giải / đối thoại (lần 1)", "cho"], "go": "mediationDetail", "vk": [["Trả lời bằng lựa chọn hòa giải - vụ việc hành chính", "hgReply", ["Còn 2 ngày", "sap"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261039-0040", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng mua bán hàng hóa", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã chỉ định Hòa giải viên", "cho"], "go": "mediationDetail", "vk": [["Đề nghị thay đổi đối thoại viên", "hgChange", ["Quá hạn 1 ngày", "qua"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261040-0041", "ngay": "20-10-2026", "t": "Tranh chấp quyền sử dụng đất", "tom": "Vụ án: DS-2026-0052 · Tình trạng vụ án: Phiên tòa hoãn · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetailAccepted", "vk": [["Xem Lịch", "calEvent", ["Còn 5 ngày", "an"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261041-0042", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng thuê nhà", "tom": "Vụ án: DS-2026-0053 · Tình trạng vụ án: Đã có QĐ đưa vụ án ra xét xử · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetailAccepted", "vk": [["Đề nghị hoãn phiên tòa", "caseDetailHoan", ["Còn 2 ngày", "sap"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261042-0043", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng cung ứng dịch vụ", "tom": "Vụ án: DS-2026-0054 · Tình trạng vụ án: Đã có QĐ đưa vụ án ra xét xử · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetailAccepted", "vk": [["Xem lịch phiên tòa", "caseDetail", null]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261043-0044", "ngay": "20-10-2026", "t": "Ly hôn, tranh chấp nuôi con", "tom": "Vụ án: DS-2026-0055 · Tình trạng vụ án: Phiên tòa hoãn · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetailAccepted", "vk": [["Xem lịch phiên tòa mới", "caseDetail", null]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261044-0045", "ngay": "20-10-2026", "t": "Tranh chấp thừa kế tài sản", "tom": "Vụ án: DS-2026-0056 · Tình trạng vụ án: Đã có QĐ đưa ra xét xử phúc thẩm · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetailAccepted", "vk": [["Xem lịch phiên tòa phúc thẩm", "caseDetail", null]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261045-0046", "ngay": "20-10-2026", "t": "Đòi bồi thường thiệt hại ngoài hợp đồng", "tom": "Vụ án: DS-2026-0057 · Tình trạng vụ án: [Tình trạng vụ án] · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetailAccepted", "vk": [["Xem vụ án", "caseDetail", null]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261046-0047", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng góp vốn", "tom": "Vụ án: DS-2026-0058 · Tình trạng vụ án: Đã thụ lý — chuẩn bị xét xử · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetailAccepted", "vk": [["Nộp đơn phản tố", "px1", ["Quá hạn 1 ngày", "qua"]]]}, {"k": "phanto", "lv": "DS", "ma": "TN-20261047-0048", "ngay": "20-10-2026", "t": "Phản tố yêu cầu bồi thường thiệt hại", "tom": "Vụ án: DS-2026-0012", "vt": "Bị đơn", "tt": "ST-03", "tinh": ["Yêu cầu sửa đổi, bổ sung đơn", "bo-sung"], "go": "ptDetail", "vk": [["Sửa đổi, bổ sung đơn phản tố", "pbs1", ["Còn 5 ngày", "an"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261048-0049", "ngay": "20-10-2026", "t": "Tranh chấp về tiền lương", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetail", "vk": [["Đề nghị thay đổi biện pháp khẩn cấp tạm thời", "bpt1", ["Còn 2 ngày", "sap"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261049-0050", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng vay tài sản", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-03", "tinh": ["Đã thụ lý", "xong"], "go": "appDetail", "vk": [["Đề nghị hủy bỏ biện pháp khẩn cấp tạm thời", "bph1", ["Quá hạn 1 ngày", "qua"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261050-0051", "ngay": "20-10-2026", "t": "Tranh chấp hợp đồng mua bán hàng hóa", "tom": "Vụ án: DS-2026-0062 · Tình trạng vụ án: Đã công nhận sự thỏa thuận · Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-04", "tinh": ["Hòa giải thành — đã công nhận", "xong"], "go": "appDetailAccepted", "vk": [["Đề nghị xem xét theo thủ tục giám đốc thẩm", "gx1", ["Còn 5 ngày", "an"]]]}, {"k": "gdt", "lv": "DS", "ma": "TN-20261051-0052", "ngay": "20-10-2026", "t": "Đề nghị giám đốc thẩm bản án phúc thẩm", "tom": "Vụ án: DS-2026-0012", "vt": "Người đề nghị", "tt": "ST-03", "tinh": ["Yêu cầu sửa đổi, bổ sung đơn đề nghị", "bo-sung"], "go": "gdtDetail", "vk": [["Sửa đổi, bổ sung đơn đề nghị giám đốc thẩm / tái thẩm", "gsgdt1", ["Còn 2 ngày", "sap"]]]}, {"k": "viecdansu", "lv": "DS", "ma": "TN-20261052-0053", "ngay": "20-10-2026", "t": "Yêu cầu tuyên bố một người mất tích", "tom": "Người yêu cầu: Hoàng Dương · Người bị yêu cầu: Nguyễn Thị Hằng", "vt": "Người yêu cầu", "tt": "ST-03", "tinh": ["Yêu cầu sửa đổi, bổ sung đơn", "bo-sung"], "go": "appDetail", "vk": [["Sửa đổi, bổ sung đơn yêu cầu", "sd1", ["Quá hạn 1 ngày", "qua"]]]}, {"k": "khoikien", "lv": "DS", "ma": "TN-20261053-0054", "ngay": "20-10-2026", "t": "Tranh chấp quyền sử dụng đất", "tom": "Nguyên đơn: Hoàng Dương · Bị đơn: Trần Văn Bình", "vt": "Người khởi kiện", "tt": "ST-04", "tinh": ["[Tình trạng đã xử lý của đơn]", "xong"], "go": "appDetail", "vk": [["Xem kết quả", "appTabVb", null]]}];
QD = QD_VK.concat(QD.filter(function (d) { return d.k === 'phasan'; }));

/* ===== v384 (16/11/2026): thống nhất khối tải tệp: khối tải tệp FileUpload (kiểu A khung trống, kiểu B danh sách + hàng tải lên) hiển thị theo kiểu C dùng chung:
   dòng định dạng · thẻ tệp (dấu tích, tên tệp, dung lượng, nút sửa) · ô nét đứt "Tải lên …" và "Từ kho dữ liệu cá nhân".
   Không có ô Kho ở luồng web không cho chọn từ kho (Cung cấp tài liệu, chứng cứ; Thay đổi / Hủy bỏ BPKCTT – kho: false). Giữ khối thử ký tệp. ===== */
var FU_GOC = T.FileUpload;
function FileUploadC(p) {
  if (p.uploadLabel === 'Chọn tài liệu PDF' || p.goc) return h(FU_GOC, p); /* v390: p.goc – dùng khối tải tệp gốc */
  var files = p.files || [], kho = p.kho !== false;
  return h('div', { className: 'fuc' }, p.title ? h('p', { className: 'fuc-t' }, p.title) : null, p.hint || files.length ? h('p', { className: 'fuc-h' }, h('span', null, p.hint || ''), files.length ? h('span', { className: 'tp-num' }, files.length + ' / ' + (p.max || 10) + ' tệp') : null) : null,
    files.length ? h('ul', { className: 'ph-tlr' }, files.map(function (f) {
      return h('li', { key: f.name }, h('span', { className: 'ph-up3-ic ph-tl-ic ph-tl-ok', 'aria-hidden': 'true' }, h(T.Icon, { name: 'check' })),
        h('span', { className: 'ph-tlr-tx' }, h('b', null, f.name), h('small', null, f.meta || f.size || '')),
        h(T.Button, { variant: 'secondary', size: 'sm', icon: 'pen', className: 'ph-lib-view ph-tlr-edit', 'aria-label': 'Sửa ' + f.name }));
    })) : null,
    h('div', { className: 'ph-up2 ph-up3' + (kho ? '' : ' ph-up1') },
      h('button', { type: 'button', className: 'ph-up2-it' }, h('span', { className: 'ph-up3-ic' }, h(T.Icon, { name: 'upload' })), h('b', null, p.uploadLabel || 'Tải lên tài liệu')),
      kho ? h('button', { type: 'button', className: 'ph-up2-it' }, h('span', { className: 'ph-up3-ic' }, h(T.Icon, { name: 'folder' })), h('b', null, 'Từ kho dữ liệu cá nhân')) : null));
}
T.FileUpload = FileUploadC;

/* v391 (16/11/2026): khối tải tệp KHÔNG có nguồn Kho dữ liệu cá nhân dùng kiểu như màn Cung cấp tài liệu, chứng cứ (màn có Kho giữ kiểu v384): dòng số tệp, thẻ tệp có nhãn PDF, hàng "Tải lên …" có nút tròn "+" (viền nhạt) */
function FileUploadD(p) {
  if (p.uploadLabel === 'Chọn tài liệu PDF' || p.goc) return h(FU_GOC, p);
  if (p.kho !== false) return FileUploadC(p);
  var files = p.files || [];
  return h('div', { className: 'tp-upload-list fub' }, p.hint ? P(p.hint, 'ph-muted fub-h') : null,
    files.length ? h('div', { className: 'tp-upload-head' }, h('span'), h('span', { className: 'tp-num' }, files.length + ' / ' + (p.max || 10) + ' tệp')) : null,
    files.length ? h('ul', { className: 'tp-files' }, files.map(function (f) {
      return h('li', { key: f.name, className: 'tp-file' }, h('span', { className: 'tp-file-type', 'aria-hidden': 'true' }, 'PDF'),
        h('span', { className: 'tp-file-text' }, h('span', { className: 'tp-file-name' }, f.name), f.meta || f.size ? h('span', { className: 'tp-file-meta' }, f.meta || f.size) : null));
    })) : null,
    h('div', { className: 'tp-upload-row' }, h('span', { className: 'tp-upload-ico' }, h(T.Icon, { name: 'upload' })), h('span', { className: 'tp-upload-row-text' }, h('span', null, p.uploadLabel || 'Tải lên tài liệu')),
      h('label', { className: 'tp-upload-add' }, h('input', { type: 'file', className: 'tp-file-input', multiple: true }), h('span', { className: 'tp-sr' }, p.uploadLabel || 'Tải lên tài liệu'), h(T.Icon, { name: 'plus' }))));
}
T.FileUpload = FileUploadD;

/* ===== v395: Văn bản phát sinh của đơn yêu cầu phá sản, phục hồi (web /quan-ly-don/$id/phps, UC-115 ND-03..06).
   Lối vào: nút "Tạo văn bản" ở tab Thông tin chung của chi tiết vụ việc → bảng chọn từ đáy, nhóm "Quản lý đơn yêu cầu đã nộp";
   mục chưa gửi được hiện mờ kèm lý do. 4 bước như web; bước cuối thêm ký số (quy tắc Mobile: mọi đơn ký số). Dữ liệu mẫu. ===== */
var PS_VB = {
  nd03: { ten: 'Sửa đổi, bổ sung đơn', tuTd: true, nd: 'Nội dung đã sửa đổi, bổ sung', goiY: 'Trình bày nội dung đã sửa đổi, bổ sung theo từng yêu cầu của Tòa án.', tl: 'Tài liệu sửa đổi, bổ sung theo thông báo', bb: true,
    camDoan: 'Tôi cam đoan nội dung sửa đổi, bổ sung và tài liệu kèm theo là đúng sự thật.', canCu: 'Luật Phá sản 142/2025: Điều 25 khoản 2 điểm b; Điều 39 khoản 2 điểm b', td: 'Thông báo sửa đổi, bổ sung đơn' },
  nd04: { ten: 'Đề nghị xem xét lại việc trả lại đơn', tuTd: true, nd: 'Nội dung đề nghị xem xét lại', goiY: 'Nêu căn cứ cho rằng việc trả lại đơn chưa đúng.', tl: 'Tài liệu chứng minh',
    camDoan: 'Tôi cam đoan nội dung đề nghị và tài liệu kèm theo là đúng sự thật.', canCu: 'Luật Phá sản 142/2025: Điều 25 khoản 4; Điều 39 khoản 4', td: 'Thông báo trả lại đơn', guiDen: 'Chánh án ' + COURT1 },
  nd05: { ten: 'Rút đơn yêu cầu mở thủ tục phá sản', nd: 'Lý do rút đơn', goiY: 'Nêu lý do bạn đề nghị Tòa án cho rút đơn.', tl: 'Tài liệu kèm theo', lead: 'Đề nghị Tòa án cho rút đơn. Việc rút chỉ có hiệu lực khi Tòa án chấp nhận.',
    camDoan: 'Tôi hiểu hệ quả của việc rút đơn và tự nguyện đề nghị Tòa án cho rút đơn.', canCu: 'Luật Phá sản 142/2025: Điều 39 khoản 3 điểm d' },
  nd06: { ten: 'Rút đơn yêu cầu áp dụng thủ tục phục hồi', nd: 'Lý do rút đơn', goiY: 'Nêu lý do bạn đề nghị Tòa án cho rút đơn.', tl: 'Tài liệu kèm theo', lead: 'Đề nghị Tòa án cho rút đơn. Việc rút chỉ có hiệu lực khi Tòa án chấp nhận.', phucHoi: true,
    camDoan: 'Tôi hiểu hệ quả của việc rút đơn và tự nguyện đề nghị Tòa án cho rút đơn.', canCu: 'Luật Phá sản 142/2025: Điều 37 khoản 1 điểm a' } };
var PS_STEPS = ['Người gửi', 'Nội dung', 'Tài liệu', 'Xem lại và ký gửi'];
var PS_DON = 'TN-20261008-0004';
/* bảng chọn "Tạo văn bản": [mã, dòng phụ, lý do khóa] – mẫu đơn phá sản đã thụ lý */
var PS_MENU = [['nd03', 'Theo văn bản số [Số thông báo] · hạn [Hạn bổ sung]', null], ['nd04', null, 'Chưa có thông báo trả lại đơn của Tòa án.'], ['nd05', null, 'Đơn đã được thụ lý hoặc đã bị trả lại.']];
function PsTaoVb(p) {
  p = p || {};
  var o = React.useState(!!p.open), anchor = React.useRef(null), host = useHost(anchor), menu = p.menu || PS_MENU;
  return h(T.ActionBar, null, h('div', { className: 'tao-wrap tao-bar' }, h('span', { ref: anchor, hidden: true }),
    h(T.Button, { block: true, variant: 'tint', icon: 'plus', onClick: function () { o[1](true); } }, 'Tạo văn bản')),
    o[0] && host ? h(LvSheet, { host: host, title: 'Tạo văn bản', onClose: function () { o[1](false); } },
      h('div', { className: 'tc3' }, h('section', null, h('p', { className: 'tc-gh' }, 'Quản lý đơn yêu cầu đã nộp'), h('ul', { className: 'tc3-l' }, menu.map(function (x) {
        var c = PS_VB[x[0]], khoa = !!x[2];
        return h('li', { key: x[0] }, h('button', { type: 'button', className: 'tc3-it ps-it', disabled: khoa, 'aria-disabled': khoa, 'data-pt-go': khoa ? undefined : 'ps' + x[0].slice(2) + '_1' },
          h('span', { className: 'td3 td-do', 'aria-hidden': 'true' },
            h('svg', { viewBox: '0 0 40 40', className: 'td3-doc' }, h('path', { d: 'M9 4h15l7 7v23a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', className: 'td3-p' }), h('path', { d: 'M24 4v7h7', className: 'td3-f' }), h('path', { d: 'M12 16h12M12 21h14M12 26h8', className: 'td3-l' })),
            h('span', { className: 'td3-b' }, h(T.Icon, { name: /^nd0[56]/.test(x[0]) ? 'logout' : x[0] === 'nd04' ? 'swap' : 'pen' }))),
          h('span', { className: 'tc-t' }, c.ten, x[1] ? h('small', { className: 'ps-it-s' }, x[1]) : null, khoa ? h('small', { className: 'ps-it-s ps-it-k' }, x[2]) : null)));
      }))))) : null);
}
function PsWz(m, n, body) { var c = PS_VB[m]; return Wz({ title: c.ten, steps: PS_STEPS, n: n, go: 'ps' + m.slice(2) + '_' + (n + 1), body: body }); }
function PsVanBanRows(c) { return c.tuTd ? [['Văn bản căn cứ', h(F, null, h('span', { className: 'tp-num' }, '[Số thông báo]'), ' ngày [Ngày tống đạt]')], ['Hạn', c.bb ? '[Hạn bổ sung]' : '[Hạn]']] : []; }
function Ps1(p) {
  var c = PS_VB[p.m];
  return PsWz(p.m, 1, h(F, null, c.lead ? Lead(c.lead) : null, p.khoa ? h(NvCall, { tone: 'warning', title: 'Chưa gửi được' }, '[Lý do chưa gửi được do Tòa án ghi]') : null, /* v396 */
    FCard('Người gửi và nơi nhận', h(F, null, P('Thông tin lấy tự động, không sửa được.', 'ph-muted'),
      RvKV([['Người gửi', laTC() ? TC_TEN : 'Hoàng Dương'], ['Gửi đến', c.guiDen || COURT1], ['Đơn yêu cầu', h('span', { className: 'tp-num' }, PS_DON)], ['Loại đơn', c.phucHoi ? 'Đơn yêu cầu áp dụng thủ tục phục hồi' : 'Đơn yêu cầu mở thủ tục phá sản'], ['Loại văn bản', c.ten]].concat(PsVanBanRows(c), [['Căn cứ pháp lý', c.canCu]]))), true)));
}
function Ps2(p) {
  var c = PS_VB[p.m], v = React.useState('');
  return PsWz(p.m, 2, h(F, null,
    c.tuTd ? FCard('Nội dung Tòa án yêu cầu', P('[Nội dung yêu cầu trong ' + c.td.toLowerCase() + ']'), true) : null,
    Blk(null, n7Tf(c.nd, v, { required: true, min: 10, max: 4000, placeholder: c.goiY }), { cls: 'bx-blk' })));
}
function Ps3(p) { var c = PS_VB[p.m]; return PsWz(p.m, 3, n7Tep(c.tl + (c.bb ? ' (bắt buộc).' : ''), c.bb ? 'PDF, JPG, PNG, DOCX · tối đa 10MB/tệp. Bắt buộc tải lên ít nhất 1 tệp.' : undefined, undefined, false)); }
function Ps4(p) {
  var c = PS_VB[p.m];
  return h(KyGuiDon, { title: c.ten, steps: PS_STEPS, ok: 'ps' + p.m.slice(2) + 'Ok', tep: [c.ten + '.pdf'], tepMeta: 'Bản in văn bản', vaiTro: 'Chủ nợ',
    top: FCard('Xem lại trước khi gửi', RvKV([['Loại văn bản', c.ten], ['Gửi đến', c.guiDen || COURT1], ['Đơn yêu cầu', h('span', { className: 'tp-num' }, PS_DON)]].concat(c.tuTd ? [['Văn bản căn cứ', h('span', { className: 'tp-num' }, '[Số thông báo]')]] : [], [[c.nd, '[' + c.nd + ']'], ['Tài liệu', c.bb ? 'tai-lieu-sua-doi-bo-sung.pdf' : 'Không có']])), true),
    bottom: HopGhi('Sau khi gửi', 'Văn bản được gửi sang Tòa án. Lỗi kết nối thì văn bản chưa được gửi, bạn có thể gửi lại.'),
    camDoan: c.camDoan });
}
function PsOk(p) {
  var c = PS_VB[p.m];
  return h(OkScr, { title: 'Đã gửi ' + c.ten.toLowerCase(), text: 'Kết quả xử lý hiện trên chi tiết đơn khi Tòa án gửi văn bản.',
    info: [['Số tiếp nhận', 'Đang chờ Tòa án cấp'], ['Đơn liên quan', h('span', { className: 'tp-num' }, PS_DON)], ['Trạng thái', 'Đã gửi, chờ Tòa án xử lý']],
    btns: h(F, null, Btn('Xem chi tiết vụ việc', 'primary', { 'data-pt-go': 'reset:records,proceedings,proceedingDetail' }), Btn('Về Vụ việc phục hồi phá sản', 'secondary', { 'data-pt-go': 'reset:records,proceedings' })) });
}
function PsTaoMo() { return h(ProceedingDetail); }

/* ===== v396: Chi tiết đơn yêu cầu phá sản, phục hồi (web /quan-ly-don/$id, 5 tab như chi tiết đơn) – mở từ thẻ đơn ở tab "Đơn yêu cầu phá sản, phục hồi".
   Tab Danh sách đơn có dòng nháp văn bản phát sinh (PHPS) → bấm mở lại form đúng loại văn bản. Dữ liệu mẫu theo vụ việc PS-2026-0001. ===== */
var PSD_DONS = [
  { loai: 'Đơn yêu cầu mở thủ tục phá sản · ban đầu', t: 'Yêu cầu mở thủ tục phá sản Công ty TNHH Thương mại Minh Phát', tt: ['Đã thụ lý', 'success'], ma: PS_DON, ngay: ['Ngày gửi', '08-10-2026'], file: 'Don-yeu-cau-mo-thu-tuc-pha-san-' + PS_DON + '.pdf' },
  { loai: 'Văn bản phát sinh', t: 'Sửa đổi, bổ sung đơn', tt: ['Bản nháp', 'neutral'], ma: null, ngay: ['Lưu nháp', '16-11-2026 09:40'], go: 'ps03_1' }];
function PsDonChiTiet(p) {
  p = p || {};
  return h(DtScreen, { title: 'Chi tiết đơn', tabLabel: 'Nội dung chi tiết đơn', tabs: donTabs(false), tab0: p.tab0, headCls: 'dt-head-don',
    meta: h(F, null, h('span', { className: 'tp-num' }, PS_DON), ' · Ngày tạo 08-10-2026'),
    name: 'Đơn yêu cầu mở thủ tục phá sản – Công ty TNHH Thương mại Minh Phát',
    badges: h(F, null, h(T.StatusBadge, { tone: 'success', icon: false }, 'Đã thụ lý')),
    render: function (t) {
      if (t === 'tt') return h(F, null,
        FCard('Vụ việc', h('button', { type: 'button', className: 'dt-link-row', 'data-pt-go': 'proceedingDetail' }, h('span', null, h('b', null, 'Yêu cầu mở thủ tục phá sản Công ty TNHH Thương mại Minh Phát'), h('small', { className: 'tp-num' }, 'PS-2026-0001')), h('span', { className: 'dt-link-t' }, 'Xem vụ việc', h(T.Icon, { name: 'chevronRight' }))), true),
        FCard('Các bên trong đơn', h(F, null,
          h(DtParty, { tat: 'CN', ten: laTC() ? TC_TEN : 'Hoàng Dương', ban: true, vt: 'Người yêu cầu · Chủ nợ', rows: [['Số CCCD', h('span', { className: 'tp-num' }, '001090012345')], ['Điện thoại', '0912345678'], ['Địa chỉ', 'Số 8 Phạm Hùng, Phường Từ Liêm, Thành phố Hà Nội']] }),
          h(DtParty, { tat: 'DN', ten: 'Công ty TNHH Thương mại Minh Phát', vt: 'Tổ chức, doanh nghiệp bị yêu cầu', rows: [['Mã số thuế', h('span', { className: 'tp-num' }, '0100000123')], ['Địa chỉ', '—'], ['Người đại diện theo pháp luật', '—']] })), true),
        FCard('Nội dung yêu cầu', RvKV([['Yêu cầu', '[Nội dung yêu cầu mở thủ tục phá sản]'], ['Khoản nợ đến hạn', '[Khoản nợ đến hạn]']]), true),
        FCard('Tòa án xử lý đơn', RvKV([['Tòa án xử lý đơn', COURT1], ['Thẩm phán phụ trách', '—'], ['Số thụ lý', '[Số thụ lý]'], ['Mã vụ việc', h('span', { className: 'tp-num' }, 'PS-2026-0001')]]), true),
        FCard('Thông tin đơn và hồ sơ pháp lý', RvKV([['Số tiếp nhận', h('span', { className: 'tp-num' }, PS_DON)], ['Lĩnh vực', 'Phá sản'], ['Hình thức nộp', 'Trực tuyến qua Cổng DVTP'], ['Ngày tạo', '08-10-2026'], ['Ngày gửi', '08-10-2026'], ['Tòa tiếp nhận', COURT1], ['Tài liệu đính kèm', '2 tài liệu'], ['Loại đơn', 'Đơn yêu cầu mở thủ tục phá sản']]), true));
      if (t === 'ds') return FCard('Danh sách đơn trong vụ việc', h('ul', { className: 'qd-list dt-qc' }, PSD_DONS.map(DtDonThe)), true);
      if (t === 'tl') return FCard('Thứ Năm, 08-10-2026', DtDocs([['Đơn yêu cầu mở thủ tục phá sản', 'don-yeu-cau-pha-san.pdf · PDF'], ['Tài liệu chứng minh khoản nợ đến hạn', 'chung-minh-khoan-no.pdf · Bản sao có chứng thực']], { tai: true, the: true }), true);
      if (t === 'vb') return FCard('Văn bản tống đạt từ Tòa án', VbCards([{ t: 'Thông báo sửa đổi, bổ sung đơn', so: '[Số thông báo]', tg: '14-11-2026', moi: true }, { t: 'Thông báo thụ lý đơn yêu cầu mở thủ tục phá sản', so: '[Số thông báo]', tg: '15-10-2026' }]), true);
      return LsG1([['Thông báo sửa đổi, bổ sung đơn', '14-11-2026', 'Số [Số thông báo]'], ['Thông báo thụ lý đơn yêu cầu mở thủ tục phá sản', '15-10-2026', 'Số [Số thông báo] · ' + COURT1], ['Gửi đơn yêu cầu mở thủ tục phá sản', '08-10-2026', PS_DON]]);
    } });
}
/* form PHPS – không mở được (thiếu loại văn bản) / không tìm thấy đơn (web ManThieuNguCanh) */
function PsLoi(p) {
  var ko = p.loi === 'ko';
  return h(Phone, { cls: 'ph-hd' }, h(T.AppBar, { variant: 'plain', title: 'Văn bản phát sinh', onBack: noop }), h(Body, { cls: 'ph-plain dt-body' },
    h('div', { className: 'q1-err' }, h(T.EmptyState, { variant: 'center', icon: 'alert', title: ko ? 'Không tìm thấy đơn' : 'Không mở được văn bản', text: ko ? 'Đơn không tồn tại hoặc bạn không có quyền với đơn này.' : 'Đường dẫn thiếu loại văn bản hoặc đơn.', className: 'nv-err' }),
      h('div', { className: 'q1-err-b' }, h(T.Button, { size: 'sm', variant: 'secondary', icon: 'chevronLeft', 'data-pt-go': 'reset:records,appK_phasan' }, 'Về danh sách đơn')))));
}

/* ===== v397: Ý kiến về yêu cầu trong đơn khởi kiện của đương sự khác (web /nop-y-kien-nguoi-yeu-cau, -khoi-kien, -nguyen-don; ACTION_029/030/031).
   Web dùng chung cấu hình với ý kiến về phản tố / yêu cầu độc lập → dùng lại luồng Nộp ý kiến 4 bước. ===== */
PX.nyc = { yc: 'yêu cầu của người yêu cầu' }; PX.kk = { yc: 'yêu cầu khởi kiện' }; PX.nd = { yc: 'yêu cầu của nguyên đơn' };
YK.nyc = { id: 'nyyk', nguoi: 'Nguyễn Văn Hùng', vb: 'Thông báo thụ lý đơn yêu cầu số [Số thông báo]' };
YK.kk = { id: 'kkyk', nguoi: 'Nguyễn Văn Hùng', vb: 'Thông báo thụ lý vụ án số [Số thông báo]' };
YK.nd = { id: 'ndyk', nguoi: 'Nguyễn Văn Hùng', vb: 'Thông báo thụ lý vụ án số [Số thông báo]' };

/* ===== v397: Đơn yêu cầu, đề nghị khác trong tố tụng (web /don-yeu-cau-khac, M01-1.6). 11 loại theo danh-muc.ts; 2 loại web đang khóa hiện mờ "Đang xây dựng";
   "Nộp ý kiến đối với kháng cáo" mở luồng Ý kiến về kháng cáo đã có (ykc1). Loại giám định, định giá có thêm bước "Chi phí tố tụng". Dữ liệu mẫu. ===== */
var DYC_L = {"BP": [{"id": "BP-01", "t": "Lấy lời khai của đương sự, người làm chứng", "d": "Đề nghị Tòa án trực tiếp lấy lời khai của người liên quan đến tình tiết vụ án.", "phu": ""}, {"id": "BP-02", "t": "Đối chất giữa các đương sự", "d": "Lời khai của các bên mâu thuẫn nhau về cùng một tình tiết.", "phu": ""}, {"id": "BP-03", "t": "Xem xét, thẩm định tại chỗ", "d": "Cần xem xét hiện trạng tài sản, nhà đất, công trình tại thực địa.", "phu": ""}, {"id": "BP-04", "t": "Yêu cầu cơ quan, tổ chức cung cấp tài liệu", "d": "Tài liệu do cơ quan nhà nước, ngân hàng, doanh nghiệp lưu giữ.", "phu": ""}, {"id": "BP-05", "t": "Ủy thác thu thập chứng cứ", "d": "Chứng cứ ở địa phương khác hoặc ở nước ngoài, cần Tòa án ủy thác.", "phu": ""}, {"id": "BP-06", "t": "Biện pháp thu thập khác", "d": "Trình bày cụ thể biện pháp bạn đề nghị ở ô bên dưới.", "phu": ""}], "GD": [{"id": "GD-01", "t": "Giám định chữ ký, chữ viết, tài liệu", "d": "Xác định chữ ký, con dấu, tài liệu là thật hay bị làm giả, sửa chữa.", "phu": "8.000.000 – 15.000.000 đ"}, {"id": "GD-02", "t": "Giám định chất lượng, khối lượng công trình xây dựng", "d": "Xác định mức độ hư hỏng, khối lượng thi công, nguyên nhân sự cố công trình.", "phu": "25.000.000 – 60.000.000 đ"}, {"id": "GD-03", "t": "Định giá tài sản đang tranh chấp", "d": "Hội đồng định giá do Tòa án thành lập xác định giá trị tài sản.", "phu": "12.000.000 – 30.000.000 đ"}, {"id": "GD-04", "t": "Thẩm định giá qua tổ chức thẩm định giá", "d": "Thuê tổ chức thẩm định giá độc lập thay cho hội đồng định giá.", "phu": "15.000.000 – 40.000.000 đ"}, {"id": "GD-05", "t": "Giám định thương tật, sức khỏe", "d": "Xác định tỷ lệ tổn thương cơ thể làm căn cứ tính bồi thường.", "phu": "3.000.000 – 8.000.000 đ"}, {"id": "GD-06", "t": "Giám định chuyên môn khác", "d": "Trình bày cụ thể nội dung cần giám định ở ô bên dưới.", "phu": "Theo báo giá"}], "CD": [{"id": "CD-01", "t": "Thẩm phán", "d": "", "phu": ""}, {"id": "CD-02", "t": "Hội thẩm nhân dân", "d": "", "phu": ""}, {"id": "CD-03", "t": "Thư ký Tòa án", "d": "", "phu": ""}, {"id": "CD-04", "t": "Thẩm tra viên", "d": "", "phu": ""}, {"id": "CD-05", "t": "Kiểm sát viên", "d": "", "phu": ""}, {"id": "CD-06", "t": "Người giám định, người phiên dịch", "d": "", "phu": ""}], "TDC": [{"id": "TDC-01", "t": "Đương sự là cá nhân đã chết, mất năng lực hành vi dân sự — chưa có người kế thừa", "d": "Chờ xác định người kế thừa quyền, nghĩa vụ tố tụng.", "phu": ""}, {"id": "TDC-02", "t": "Cơ quan, tổ chức đương sự đã sáp nhập, chia tách, giải thể", "d": "Chưa xác định được tổ chức kế thừa quyền, nghĩa vụ tố tụng.", "phu": ""}, {"id": "TDC-03", "t": "Cần đợi kết quả giải quyết một vụ việc khác có liên quan", "d": "Kết quả vụ việc đó là căn cứ để giải quyết vụ án này.", "phu": ""}, {"id": "TDC-04", "t": "Cần đợi kết quả ủy thác tư pháp hoặc văn bản của cơ quan có thẩm quyền", "d": "Đã ủy thác nhưng chưa nhận được kết quả.", "phu": ""}, {"id": "TDC-05", "t": "Cần đợi kết quả giám định, định giá đang thực hiện", "d": "Việc giám định, định giá kéo dài quá thời hạn chuẩn bị xét xử.", "phu": ""}, {"id": "TDC-06", "t": "Căn cứ khác theo quy định pháp luật", "d": "Trình bày cụ thể ở ô bên dưới.", "phu": ""}], "HP": [{"id": "HP-1", "t": "Ốm đau, điều trị bệnh", "d": "", "phu": ""}, {"id": "HP-2", "t": "Sự kiện bất khả kháng, trở ngại khách quan", "d": "", "phu": ""}, {"id": "HP-3", "t": "Cần thêm thời gian thu thập chứng cứ", "d": "", "phu": ""}, {"id": "HP-4", "t": "Người bảo vệ quyền và lợi ích hợp pháp vắng mặt", "d": "", "phu": ""}, {"id": "HP-5", "t": "Lý do khác", "d": "", "phu": ""}]};
var DYC = [
  ['hoan', 'Xin hoãn phiên tòa', 'Bạn không thể có mặt tại phiên tòa đã ấn định và đề nghị Tòa án dời lịch.'],
  ['ph', 'Nộp ý kiến phản hồi theo yêu cầu của Tòa án', 'Tòa án hỏi ý kiến bạn về một nội dung trong vụ án và có thời hạn trả lời.', 'khoa'],
  ['ykc', 'Nộp ý kiến đối với kháng cáo của đương sự khác', 'Đương sự khác đã kháng cáo bản án. Bạn được đọc nội dung kháng cáo của họ và trả lời từng điểm trước khi Tòa án cấp phúc thẩm xét xử.'],
  ['bs', 'Đề nghị bổ sung đương sự vào vụ án', 'Có người liên quan đến vụ án nhưng chưa được đưa vào tham gia tố tụng.'],
  ['vt', 'Đề nghị thay đổi vai trò tố tụng', 'Bạn cho rằng vai trò tố tụng hiện tại của mình chưa đúng.', 'khoa'],
  ['tt', 'Đề nghị Tòa án xác minh, thu thập tài liệu, chứng cứ', 'Bạn đã tự mình thu thập nhưng không được, đề nghị Tòa án thu thập thay.'],
  ['xt', 'Đề nghị yêu cầu xuất trình tài liệu, chứng cứ đang do người khác giữ', 'Tài liệu cần cho vụ án đang do cá nhân, cơ quan khác nắm giữ và không giao cho bạn.'],
  ['tl', 'Đề nghị triệu tập người làm chứng', 'Có người biết tình tiết của vụ án và cần được Tòa án triệu tập để lấy lời khai.'],
  ['gd', 'Đề nghị trưng cầu giám định, định giá tài sản', 'Cần kết luận chuyên môn hoặc xác định giá trị tài sản đang tranh chấp. Phát sinh chi phí tố tụng.'],
  ['thtt', 'Yêu cầu thay đổi người tiến hành tố tụng', 'Có căn cứ cho rằng người tiến hành tố tụng không vô tư khi làm nhiệm vụ.'],
  ['tdc', 'Đề nghị Tòa án tạm đình chỉ giải quyết vụ việc', 'Có sự kiện làm việc giải quyết vụ án phải tạm dừng cho đến khi sự kiện đó chấm dứt.']];
function dycTen(k) { return (DYC.filter(function (x) { return x[0] === k; })[0] || DYC[0])[1]; }
function dycSteps(k) { return k === 'gd' ? ['Loại yêu cầu và vụ án', 'Nội dung yêu cầu', 'Chi phí tố tụng', 'Tài liệu kèm theo', 'Xem lại và ký gửi'] : ['Loại yêu cầu và vụ án', 'Nội dung yêu cầu', 'Tài liệu kèm theo', 'Xem lại và ký gửi']; }
function DycWz(k, n, body, go) { return Wz({ title: 'Đơn yêu cầu, đề nghị khác', steps: dycSteps(k), n: n, go: go, body: body }); }
function dycOpts(k) { return DYC_L[k].map(function (x) { return { id: x.id, t: x.t, d: x.d || undefined, name: x.t }; }); }
function DycVuAn() { return FCard('Vụ án liên quan', RvKV([['Mã vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Tên vụ án', 'Tranh chấp hợp đồng vay tài sản'], ['Vai trò của bạn', 'Nguyên đơn'], ['Giai đoạn của vụ án', 'Sơ thẩm']]), true); }
function Dyc1(p) {
  var v = React.useState(p.k || 'hoan'), mo = DYC.filter(function (x) { return !x[3]; }), khoa = DYC.filter(function (x) { return x[3]; });
  return DycWz(v[0], 1, h(F, null, DycVuAn(),
    FCard('Bạn muốn đề nghị điều gì?', h(F, null, h(ChonThe, { label: 'Loại yêu cầu', v: v[0], onPick: v[1], items: mo.map(function (x) { return { id: x[0], t: x[1], d: x[2] }; }) }),
      h('div', { className: 'dyc-khoa', 'aria-disabled': 'true' }, h(ChonThe, { label: 'Loại yêu cầu đang xây dựng', v: null, onPick: noop, items: khoa.map(function (x) { return { id: x[0], t: x[1], d: x[2], tag: 'Đang xây dựng' }; }) }))), true),
    v[0] === 'hoan' ? FCard('Phiên tòa đề nghị hoãn', RvKV([['Phiên tòa sắp tới', 'Phiên tòa sơ thẩm · 14:00, 05-11-2026'], ['Địa điểm', COURT1 + ' – Phòng xử án số 2']]), true) : null),
    v[0] === 'ykc' ? 'ykc1' : 'dyc2_' + v[0]);
}
function DycTf(label, ph, req) { var v = React.useState(''); return n7Tf(label, v, { required: req !== false, min: 20, max: 2000, placeholder: ph }); }
function Dyc2(p) {
  var k = p.k, ch = React.useState(null), cn = React.useState('cn'), body;
  var the = function (t, l) { return FCard(t, h(ChonThe, { label: t, v: ch[0], onPick: ch[1], items: dycOpts(l) }), true); };
  if (k === 'hoan') body = h(F, null, Blk(null, h(F, null, h(SelSheet, { label: 'Lý do đề nghị hoãn phiên tòa', req: true, ph: '— Chọn lý do —', v: '', onChange: noop, opts: dycOpts('HP') }), DycTf('Trình bày nội dung yêu cầu', 'Nêu rõ lý do bạn không thể có mặt tại phiên tòa và thời gian đề nghị dời lịch…')), { cls: 'bx-blk' }));
  else if (k === 'bs') body = h(F, null, FCard('Người bạn đề nghị bổ sung là cá nhân hay tổ chức?', h(ChonThe, { label: 'Loại đương sự', v: cn[0], onPick: cn[1], items: [{ id: 'cn', t: 'Cá nhân' }, { id: 'tc', t: 'Tổ chức, doanh nghiệp' }] }), true),
    Blk(null, cn[0] === 'cn' ? h(F, null, Tf('Họ và tên', { required: true }), Tf('Năm sinh', { help: '(nếu biết)' }), Tf('Địa chỉ thường trú', { help: '(nếu biết)' }), Tf('Số điện thoại', { help: '(nếu biết)', type: 'tel' }))
      : h(F, null, Tf('Tên tổ chức, doanh nghiệp', { required: true }), Tf('Địa chỉ trụ sở', { required: true }), Tf('Người đại diện theo pháp luật')), { cls: 'bx-blk' }),
    Blk(null, h(F, null, DycTf('Quan hệ của người này với vụ án', 'Người này liên quan thế nào đến tranh chấp…'), DycTf('Trình bày nội dung yêu cầu', 'Vì sao cần đưa người này tham gia tố tụng…')), { cls: 'bx-blk' }));
  else if (k === 'tt') body = h(F, null, the('Biện pháp thu thập chứng cứ bạn đề nghị', 'BP'), Blk(null, h(F, null, DycTf('Tài liệu, chứng cứ cần thu thập và nơi đang lưu giữ', 'Tên tài liệu, chứng cứ và cơ quan, tổ chức, cá nhân đang giữ…'), DycTf('Lý do bạn không tự thu thập được', 'Bạn đã yêu cầu nhưng bị từ chối, hoặc không được cung cấp…')), { cls: 'bx-blk' }));
  else if (k === 'xt') body = Blk(null, h(F, null, DycTf('Cá nhân, cơ quan đang giữ tài liệu, chứng cứ', 'Họ tên hoặc tên cơ quan, địa chỉ…'), DycTf('Tài liệu, chứng cứ đề nghị được xuất trình', 'Tên, số, ngày của tài liệu…'), DycTf('Căn cứ cho rằng người đó đang giữ tài liệu', 'Vì sao bạn biết người đó đang giữ tài liệu…')), { cls: 'bx-blk' });
  else if (k === 'tl') body = h(F, null, Blk(null, h(F, null, Tf('Họ và tên người làm chứng', { required: true }), Tf('Năm sinh', { help: '(nếu biết)' }), Tf('Nơi ở hiện tại', { help: '(nếu biết)' }), Tf('Số điện thoại', { help: '(nếu biết)', type: 'tel' })), { cls: 'bx-blk' }),
    Blk(null, h(F, null, DycTf('Tình tiết mà người làm chứng biết được', 'Người làm chứng biết gì về vụ án…'), DycTf('Lý do cần triệu tập người làm chứng', 'Vì sao cần Tòa án triệu tập…')), { cls: 'bx-blk' }));
  else if (k === 'gd') body = h(F, null, FCard('Nội dung cần giám định, định giá', h(ChonThe, { label: 'Nội dung cần giám định, định giá', v: ch[0] || 'GD-03', onPick: ch[1], items: DYC_L.GD.map(function (x) { return { id: x.id, t: x.t, d: x.d, tag: x.phu }; }) }), true),
    Blk(null, h(F, null, DycTf('Tài sản, tài liệu cần giám định hoặc định giá', 'Mô tả tài sản, tài liệu: tên, vị trí, hiện trạng…'), DycTf('Vấn đề cần kết luận giám định, định giá', 'Câu hỏi bạn muốn tổ chức giám định trả lời…')), { cls: 'bx-blk' }));
  else if (k === 'thtt') body = Blk(null, h(F, null, h(SelSheet, { label: 'Chức danh người bạn yêu cầu thay đổi', req: true, ph: '— Chọn chức danh —', v: '', onChange: noop, opts: dycOpts('CD') }), Tf('Người tiến hành tố tụng bạn yêu cầu thay đổi', { required: true, placeholder: 'Họ và tên' }), DycTf('Căn cứ yêu cầu thay đổi', 'Nêu căn cứ cho rằng người này không vô tư khi làm nhiệm vụ…')), { cls: 'bx-blk' });
  else body = h(F, null, the('Căn cứ đề nghị tạm đình chỉ', 'TDC'), Blk(null, DycTf('Trình bày sự kiện làm căn cứ tạm đình chỉ', 'Sự kiện gì, xảy ra khi nào, ảnh hưởng thế nào đến việc giải quyết vụ án…'), { cls: 'bx-blk' }));
  return DycWz(k, 2, h(F, null, P(dycTen(k), 'ph-muted'), body), k === 'gd' ? 'dycCp' : 'dyc3');
}
function DycCp() {
  var x = React.useState(false), g = DYC_L.GD.filter(function (z) { return z.id === 'GD-03'; })[0];
  return DycWz('gd', 3, h(F, null,
    FCard('Ước tính chi phí tố tụng', h(F, null, P('Con số tham khảo theo mặt bằng chi phí hiện hành, không phải mức Tòa án ấn định.', 'ph-muted'),
      RvKV([['Nội dung đề nghị', g.t], ['Khoảng chi phí tham khảo', g.phu], ['Người phải nộp tạm ứng', 'Người đề nghị — tức là bạn'], ['Thời hạn nộp', '05 ngày làm việc kể từ ngày nhận được thông báo của Tòa án'], ['Hình thức nộp', 'Cổng Dịch vụ công Quốc gia hoặc nộp trực tiếp tại Tòa án']])), true),
    h(NvCall, { tone: 'warning', title: 'Không nộp tạm ứng chi phí thì đề nghị không được thực hiện' }, 'Sau khi chấp nhận đề nghị, Tòa án ra thông báo nộp tạm ứng chi phí giám định, định giá.'),
    HopGhi('Chi phí cuối cùng do bên thua kiện chịu', 'Bạn nộp tạm ứng trước; khi xét xử, Tòa án quyết định ai phải chịu chi phí giám định, định giá theo kết quả giải quyết vụ án.'),
    HopGhi('Được miễn, giảm nếu thuộc diện chính sách', 'Người thuộc hộ nghèo, đối tượng chính sách có thể đề nghị miễn, giảm tạm ứng chi phí tố tụng cùng lúc với đề nghị này.'),
    FCard('Xác nhận nghĩa vụ chi phí', h(T.Checkbox, { checked: x[0], onChange: function (e) { x[1](e.target.checked); }, label: 'Tôi hiểu và đồng ý nộp tạm ứng chi phí giám định, định giá theo thông báo của Tòa án. Nếu không nộp trong hạn, đề nghị này sẽ không được thực hiện.' }), true)), 'dyc3g');
}
function Dyc3(p) { var k = p.gd ? 'gd' : 'tt'; return DycWz(k, p.gd ? 4 : 3, n7Tep('Tài liệu, chứng cứ kèm theo đề nghị (không bắt buộc).', undefined, undefined, false), p.gd ? 'dyc4g' : 'dyc4'); }
function Dyc4(p) {
  var k = p.gd ? 'gd' : 'tt';
  return h(KyGuiDon, { title: 'Đơn yêu cầu, đề nghị khác', steps: dycSteps(k), ok: 'dycOk', tep: ['Don-yeu-cau-de-nghi.pdf'], tepMeta: 'Bản in đơn yêu cầu, đề nghị', vaiTro: 'Nguyên đơn',
    top: FCard('Xem lại đơn', RvKV([['Loại yêu cầu', dycTen(k)], ['Vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Nội dung yêu cầu', '[Nội dung yêu cầu]'], ['Tài liệu kèm theo', 'Không có']]), true),
    camDoan: N7_CAMDOAN });
}
function DycOk() {
  return h(OkScr, { title: 'Đã gửi đơn yêu cầu, đề nghị', text: 'Đơn đã được gửi đến Tòa án. Kết quả xem xét sẽ được gửi qua Hộp thư tống đạt.', info: [['Số tiếp nhận', 'Đang chờ Tòa án cấp'], ['Vụ án liên quan', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Trạng thái', 'Chờ Tòa án xem xét']],
    btns: h(F, null, Btn('Xem đơn đã gửi', 'primary', { 'data-pt-go': 'dycXem' }), Btn('Về chi tiết vụ án', 'secondary', { 'data-pt-go': 'reset:records,cases,caseDetail' })) });
}
/* xem đơn yêu cầu khác đã gửi (web /don-yeu-cau-khac/xem/$id) */
function DycXem() {
  return Sub('Đơn yêu cầu, đề nghị khác', h(F, null,
    FCard('Thông tin đơn', h(F, null, h('div', { className: 'q1-badge' }, h(T.StatusBadge, { tone: 'warning', icon: false }, 'Chờ Tòa án xem xét')),
      RvKV([['Loại yêu cầu', dycTen('tt')], ['Số tiếp nhận', '[Số tiếp nhận]'], ['Ngày gửi', '16-11-2026'], ['Vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Tòa án', COURT1]])), true),
    FCard('Nội dung yêu cầu', RvKV([['Biện pháp thu thập chứng cứ', DYC_L.BP[3].t], ['Tài liệu, chứng cứ cần thu thập và nơi đang lưu giữ', '[Nội dung]'], ['Lý do bạn không tự thu thập được', '[Nội dung]']]), true),
    FCard('Tài liệu', DtDocs([['Đơn yêu cầu, đề nghị', 'Don-yeu-cau-de-nghi.pdf · Bản đơn đã ký số']], { the: true }), true)));
}

/* v414: tên thủ tục đầy đủ và tên hồ sơ (đơn hoặc vụ án) trên thẻ danh sách tố tụng – tên là dữ liệu mẫu */
var KNTT_TT_DAY = { qd: 'Khiếu nại quyết định', tra: 'Khiếu nại trả lại đơn', hv: 'Khiếu nại hành vi', tc: 'Tố cáo' };
var KNTT_HS_TEN = { 'DS-2026-0018': 'Tranh chấp hợp đồng mua bán tài sản', 'DS-2026-0012': 'Tranh chấp hợp đồng vay tài sản', 'TN-20261012-0007': 'Tranh chấp hợp đồng thuê nhà' };

/* v415: tên thủ tục trên thẻ danh sách hành chính (dữ liệu mẫu, lấy từ danh mục thủ tục KN_TT) */
var KNHC_TT_TEN = { 'KN-2026-0015': 'Hành vi hành chính của Tòa án', 'KN-2026-0012': 'Hành vi hành chính của Tòa án', 'TC-2026-0004': 'Hành vi vi phạm của cán bộ, công chức trong nhiệm vụ, công vụ', 'KN-2026-0007': 'Hành vi hành chính của Tòa án' };

/* v417: Bộ lọc hồ sơ tố tụng – cùng kiểu Bộ lọc hộp thư (IbLocSheet) */
function KnTtLoc2(p) { /* v419: kiểu Bộ lọc hộp thư, trường giữ đúng web: Loại việc (số hồ sơ) · Ngày gửi: Từ ngày | Đến ngày */
  var tt = React.useState(p.tt || 'all'), lo = React.useState(p.loai), tu = React.useState(p.loi ? '10-11-2026' : (p.tu || '')), den = React.useState(p.loi ? '01-11-2026' : (p.den || ''));
  var so = function (d) { var m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(d || ''); return m ? m[3] + m[2] + m[1] : ''; };
  var sai = tu[0] && den[0] && so(tu[0]) > so(den[0]); /* v578: ngày dạng DD-MM-YYYY */
  var dem = function (k) { return p.ds.filter(function (r) { return !k || kntcThuTucLoai(r) === k; }).length; };
  return h(LvSheet, { host: p.host, title: 'Bộ lọc hồ sơ', onClose: p.onClose,
    foot: h(F, null, h(T.Button, { variant: 'secondary', onClick: function () { tt[1]('all'); lo[1](''); tu[1](''); den[1](''); } }, 'Nhập lại'),
      h(T.Button, { disabled: !!sai, onClick: function () { p.onApply(lo[0], (lo[0] ? 1 : 0) + (tu[0] ? 1 : 0) + (den[0] ? 1 : 0), tt[0], tu[0], den[0]); } }, 'Áp dụng')) },
    h('div', { className: 'ib-loc' }, /* v427: bỏ lời dẫn */
      p.ttItems ? h(IbPick, { host: p.host, label: 'Trạng thái', v: tt[0], onPick: tt[1], items: p.ttItems.map(function (x) { return { id: x.key, name: x.label + ' · ' + x.count }; }) }) : null, /* v463; v471: tab tố tụng quay lại ô chọn (droplist) như Loại việc */
      h(IbPick, { host: p.host, label: 'Loại việc', v: lo[0], onPick: lo[1], items: [['', 'Tất cả']].concat(KNTT_LOAI).map(function (x) { return { id: x[0], name: x[1] + ' · ' + dem(x[0]) }; }) }),
      h('div', null, h('p', { className: 'sf-h' }, 'Ngày gửi'), h('div', { className: 'ib-loc-2' },
        h(NgayChonO, { label: 'Từ ngày', v: tu[0], maxNay: true, onDoi: tu[1] }), /* v578 lỗi 3 (PA A): bánh xe Ngày – Tháng – Năm, không hiện ngày sau hôm nay */
        h(NgayChonO, { label: 'Đến ngày', v: den[0], maxNay: true, onDoi: den[1] }))),
      sai ? h('p', { className: 'q2-err', role: 'alert' }, h(T.Icon, { name: 'alert' }), '“Từ ngày” không được sau “Đến ngày”.') : null));
}

/* v425: khiếu nại (tố cáo) lần hai trên thẻ danh sách – thẻ kiểu Việc cần làm (tên việc · "Hạn xử lý · Còn N ngày", màu theo mức hạn: ≤3 ngày vàng, còn lại xanh); hết điều kiện: thẻ xám, không bấm được, dòng lý do */
function KnLan2The(ten, r) {
  var khoa = !!r.lan2Khoa, n = r.lan2[0], m = khoa ? 'none' : n < 0 ? 'qua' : n <= 3 ? 'sap' : 'an';
  return h('div', { className: 'qc-vk vkx-box kn-l2' }, h('ul', { className: 'qc-vk-l' }, h('li', { className: 'vk-card vka vkx vkx-' + m },
    h('button', { type: 'button', className: 'vka-b', disabled: khoa, 'data-pt-go': khoa ? undefined : 'kqd1L' }, h('span', { className: 'vka-tx' }, h('b', null, ten),
      h('small', null, khoa ? '[Lý do không còn điều kiện gửi lần hai]' : h(F, null, 'Hạn xử lý · ', h('span', { className: 'vka-han vka-han-' + m }, n === 0 ? 'Hết hạn hôm nay' : 'Còn ' + n + ' ngày'))))))));
}

/* v428: Chi tiết hồ sơ tố tụng – thứ tự như web (chi-tiet-to-tung.tsx):
   Đầu trang: loại việc · mã hồ sơ · trạng thái · tình trạng → tiêu đề (tóm tắt) → tên thủ tục → [khiếu nại lần hai: nút + chữ] → dãy thông tin (Tòa án tiếp nhận, Ngày gửi, Mã tiếp nhận tại Tòa án,
   Loại tống đạt, Biểu mẫu tống đạt, Tên tống đạt, Cấp xét xử, Thời hạn giải quyết, Căn cứ pháp lý, Mã đơn tại Tòa án, Trạng thái tại Tòa án, Tình trạng, Mã hồ sơ trên hệ thống Gtel, Vụ án/đơn gốc, Tư cách tố tụng, Ngày lập hồ sơ).
   Tab Nội dung: Nội dung khiếu nại, tố cáo (Tóm tắt nội dung · Diễn biến · Yêu cầu giải quyết · Quyết định, văn bản bị khiếu nại) → Người gửi đơn → Tài liệu đã nộp (Xem, Tải về). Dữ liệu trong [ngoặc vuông] là dữ liệu hệ thống. */
function KnTtDetail3(p) {
  var r = p.kq ? KN_TT_HS[1] : KN_TT_HS[0], o = KNTT_THEM[r.ma] || {}, gui = '09:15 ' + (o.ngay || '—'), tt0 = p.kq ? r.tt : ['Đã gửi đơn', 'info'], tinh0 = p.kq ? r.tinh : 'Tòa án đã nhận đơn';
  var meta = [['Tòa án tiếp nhận', COURT1], ['Ngày gửi', gui], ['Mã tiếp nhận tại Tòa án', h('span', { className: 'tp-num' }, r.qla)]]
    .concat(o.loaiTd ? [['Loại tống đạt', o.loaiTd]] : [], [['Biểu mẫu tống đạt', '[Mã biểu mẫu] — [Tên biểu mẫu]']], o.tenTd ? [['Tên tống đạt (văn bản bị khiếu nại)', o.tenTd]] : [],
      o.cap ? [['Cấp xét xử của văn bản bị khiếu nại', o.cap]] : [], [['Thời hạn giải quyết', r.han], ['Căn cứ pháp lý', p.kq ? 'Điều 194 Bộ luật Tố tụng dân sự 2015' : 'Chương XLI Bộ luật Tố tụng dân sự 2015'],
      ['Mã đơn tại Tòa án', '[Mã đơn tại Tòa án]'], ['Trạng thái tại Tòa án', r.tt[0]], ['Tình trạng', r.tinh],       [r.goc[0], h('span', { className: 'tp-num' }, r.goc[1])], ['Tư cách tố tụng', 'Nguyên đơn'], ['Ngày lập hồ sơ', '09:10 ' + (o.ngay || '—')]]);
  if (!p.kq) meta = [['Tòa án tiếp nhận', COURT1], ['Ngày gửi', '16:11 27-10-2026'], ['Mã tiếp nhận tại Tòa án', h('span', { className: 'tp-num' }, 'GIALAP-KN-2026-68007')], /* v430: như ảnh người dùng gửi */
    ['Loại tống đạt', 'Quyết định, thông báo về biện pháp khẩn cấp tạm thời'], ['Biểu mẫu tống đạt', '19-DS — Quyết định thay đổi biện pháp khẩn cấp tạm thời'],
    ['Tên tống đạt (văn bản bị khiếu nại)', 'Quyết định thay đổi biện pháp khẩn cấp tạm thời (dành cho Hội đồng xét xử) số 26102702/19-DS'], ['Cấp xét xử của văn bản bị khiếu nại', 'Sơ thẩm'],
    ['Thời hạn giải quyết', '03 ngày làm việc kể từ ngày nhận được khiếu nại; quyết định của Chánh án là quyết định cuối cùng (Điều 140)'], ['Căn cứ pháp lý', 'Điều 140 BLTTDS (VBHN 99/VBHN-VPQH)'],
    ['Mã đơn tại Tòa án', 'Chưa có (Tòa án cấp khi gửi văn bản đầu tiên)'], ['Trạng thái tại Tòa án', 'Đã gửi đơn'], ['Tình trạng', 'Tòa án đã nhận đơn'],
    ['Vụ án liên quan', h('span', { className: 'tp-num' }, 'VA-2026-20261002154326')], ['Tư cách tố tụng', 'Người khởi kiện'], ['Ngày lập hồ sơ', '16:11 27-10-2026']];
  /* v434: đầu màn như thẻ danh sách (trạng thái · tình trạng → tiêu đề → Mã tiếp nhận, Tòa án tiếp nhận, Ngày gửi, Thủ tục, Hồ sơ bị khiếu nại); bỏ dòng trùng ở khối Thông tin chung */
  var guiDau = p.kq ? gui : '16:11 27-10-2026', hsDau = p.kq ? [r.goc[1], KNTT_HS_TEN[r.goc[1]]] : ['VA-2026-20261002154326', '[Tên vụ án]'];
  var dau = dsRows([['Mã tiếp nhận', h('span', { className: 'tp-num' }, r.ma)], ['Tòa án tiếp nhận', COURT1], ['Ngày gửi', guiDau], ['Thủ tục', KNTT_TT_DAY[kntcThuTucLoai(r)]],
    ['Hồ sơ bị khiếu nại', h('span', null, h('span', { className: 'tp-num' }, hsDau[0]), hsDau[1] ? ' — ' + hsDau[1] : '')]]);
  meta = meta.filter(function (x) { return ['Tòa án tiếp nhận', 'Ngày gửi', 'Trạng thái tại Tòa án', 'Tình trạng', 'Vụ án liên quan', 'Đơn khởi kiện bị trả lại'].indexOf(x[0]) < 0; });
  var lan2 = p.kq ? h('div', { className: 'tdx kct-tdx', role: 'status' }, h('section', { className: 'tdx-c' }, h('div', { className: 'tdx-r' },
    h('div', { className: 'tdx-t' }, h('b', { className: 'tdx-nd' }, 'Khiếu nại lần hai'), h('p', { className: 'tdx-han tdx-han-warning' }, h(T.Icon, { name: 'clock' }), h('span', null, 'Hạn ' + r.lan2[1] + ' · ', h('strong', null, 'còn ' + r.lan2[0] + ' ngày')))),
    h(T.Button, { size: 'sm', className: 'tdx-btn', 'data-pt-go': 'kqd1L' }, h('span', { className: 'tdx-lb' }, 'Khiếu nại lần hai'))))) : null;
  var muc = function (n, v) { return h('div', { key: n, className: 'kct-muc' }, h('b', null, n), h('p', null, v)); };
  var HD = true; if (HD) meta = [['Tòa án tiếp nhận', COURT1], ['Thủ tục', KNTT_TT_DAY[kntcThuTucLoai(r)]], ['Hồ sơ bị khiếu nại', h('span', null, h('span', { className: 'tp-num' }, hsDau[0]), hsDau[1] ? ' — ' + hsDau[1] : '')]].concat(meta); /* v442: 3 dòng từ đầu màn chuyển vào khối Thông tin chung */
  return h(DtScreen, { title: 'Chi tiết khiếu nại' /* v442: đổi từ Hồ sơ tố tụng */, tabLabel: 'Nội dung hồ sơ tố tụng', headCls: HD ? 'kct-head dt-head-don' : 'kct-head', tab0: p.tab0,
    tabs: [{ key: 'tt', label: 'Thông tin chung' }, { key: 'nd', label: 'Nội dung khiếu nại, tố cáo' } /* v445: tách lại tab Thông tin chung */, { key: 'vb', label: 'Văn bản tống đạt', count: p.kq ? 2 : 1 }, { key: 'ls', label: 'Lịch sử tiến trình', count: p.kq ? 3 : 2 }],
    meta: HD ? KctNhan('B', r, tt0, tinh0, p) /* v444 */ : h(F, null, h(T.StatusBadge, { tone: tt0[1], icon: false }, tt0[0]), h('span', { className: 'qd-tinh qc-tinh qd-tinh-' + (p.kq ? 'success' : 'info') }, h('span', { className: 'qc-tinh-tx' }, tinh0))),
    name: p.l2 ? 'Khiếu nại lần hai quyết định giải quyết khiếu nại' : r.tom, badges: HD ? KctMa('B', r, guiDau, p) /* v444 */ : null,
    headExtra: HD ? lan2 : h(F, null, h('div', { className: 'kct-dau' }, dau), lan2), /* v442: đầu màn kiểu Chi tiết đơn */ /* v429: dãy thông tin chuyển sang tab Thông tin chung */
    render: function (t) {
      if (t === 'tt') return FCard('Thông tin chung', RvKV(meta), true); /* v445 */
      if (t === 'vb') { /* như web KhoiVanBanToaAn: tên · "số · ngày" · Xem tệp · Xem trong Hộp thư tống đạt ›; thư không có trong Hộp thư thì chỉ ghi chú */
        var vb = p.vbRong ? [] : p.kq ? [['QUYET_DINH', 'Quyết định', '03/2026/QĐ-GQKN', 'Quyết định giải quyết khiếu nại', '31-10-2026 10:20', 1, 1], ['THONG_BAO', 'Thông báo', '[Số thông báo]', 'Thông báo thụ lý khiếu nại', '22-10-2026 08:30', 0, 0]]
          : [['THONG_BAO', 'Thông báo', '[Số thông báo]', 'Thông báo thụ lý khiếu nại', '30-10-2026 14:05', 1, 1]];
        return FCard('Văn bản tống đạt', vb.length ? h('ul', { className: 'vb1 kct-vb2' }, vb.map(function (v) { /* như thẻ văn bản tống đạt của Chi tiết đơn: nhãn loại · số · tên (đậm, chấm đỏ khi chưa xem) · Tòa án · ngày giờ; chạm thẻ mở thư */
          return h('li', { key: v[3], className: 'ib-c' + (v[6] ? ' ib-un' : '') }, h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': (v[6] ? 'Chưa xem. ' : '') + v[3], 'data-pt-go': 'mailDetail' }),
            h('div', { className: 'ib-c-h' }, h('span', { className: 'vk-tag' + ibTag(v[0]) }, v[1]), h('span', { className: 'vk-code tp-num' }, v[2])),
            h('b', null, v[6] ? h('i', { className: 'ib-dot', 'aria-hidden': 'true' }) : null, v[3]), h('small', null, COURT1 + ' · ' + v[4]));
        })) : h('p', { className: 'kct-rong' }, 'Tòa án chưa gửi văn bản nào về đơn này.'), true);
      }
      if (t === 'ls') return FCard('Lịch sử tiến trình', G1Std((p.kq ? [{ title: 'Đã giải quyết khiếu nại', date: '31-10-2026', state: 'current' }, { title: 'Tòa án đã nhận đơn', date: '22-10-2026', state: 'done' }, { title: 'Đã gửi', date: '20-10-2026', state: 'done' }] : [{ title: 'Tòa án đã nhận đơn', date: '30-10-2026', state: 'current' }, { title: 'Đã gửi', date: '28-10-2026', state: 'done' }]).map(function (x) { return { t: x.title, ngay: x.date, state: x.state }; })), true); /* v441 */
      return h(F, null,
        FCard('Nội dung khiếu nại, tố cáo', h('div', { className: 'kct-nd' }, muc('Tóm tắt nội dung', r.tom), muc('Diễn biến, nội dung khiếu nại', '[Diễn biến, nội dung khiếu nại]'), muc('Yêu cầu giải quyết', '[Yêu cầu giải quyết]'),
          h('div', { className: 'kct-muc' }, h('b', null, 'Quyết định, văn bản bị khiếu nại'), h('div', { className: 'kct-bi' }, h('b', null, p.kq ? 'Thông báo trả lại đơn khởi kiện' : 'Quyết định tạm đình chỉ giải quyết vụ án'), h('small', null, p.kq ? 'TN-20261012-0007' : 'Số [Số quyết định]')))), true),
        FCard('Người gửi đơn', RvKV([['Họ và tên', 'Hoàng Dương'], ['Số định danh', h('span', { className: 'tp-num' }, '001090012345')], ['Số điện thoại', '0912345678'], ['Địa chỉ', 'Số 8 Phạm Hùng, Phường Từ Liêm, Thành phố Hà Nội']]), true),
        FCard('Tài liệu đã nộp', DtDocs([['Đơn đã ký số', r.ma + '.pdf · PDF'], [p.kq ? 'Thông báo trả lại đơn' : 'Bản sao quyết định bị khiếu nại', (p.kq ? 'thong-bao-tra-lai-don.pdf' : 'ban-sao-quyet-dinh.pdf') + ' · PDF']], { tai: true, the: true }), true) /* v435: thẻ tài liệu như ảnh – tên đậm, "tên tệp · loại", nút xem, tải về */);
    } });
}

/* v441: dòng tiến trình chuẩn (theo tab Lịch sử Chi tiết đơn, v440) – x = { t, d, ngay, gio, pill, mau, state }; mốc mới nhất ở trên.
   Cột trái: giờ đậm + ngày bên dưới; không có giờ thì ngày đậm; chưa có ngày thì để trống. Mốc hiện tại (hoặc mốc đã xong mới nhất) chấm đỏ; mốc chưa tới chữ xám, chấm nét đứt. */
function G1Std(items) {
  var now = -1;
  items.forEach(function (x, i) { if (now < 0 && x.state === 'current') now = i; });
  if (now < 0) items.forEach(function (x, i) { if (now < 0 && x.state === 'done') now = i; });
  return h('ol', { className: 'g1 g1s' }, items.map(function (x, i) {
    var fut = !x.state || x.state === 'todo';
    return h('li', { key: x.t + i, className: 'g1-2' + (i === now ? ' g1-now' : '') + (fut ? ' g1-fut' : '') },
      h('time', { className: 'g1-t2 tp-num' }, x.gio ? h('b', null, x.gio) : x.ngay ? h('b', null, x.ngay) : null, x.gio && x.ngay ? h('small', null, x.ngay) : null),
      h('span', { className: 'g1-dot', 'aria-hidden': 'true' }),
      h('div', { className: 'g1-c' }, h('b', null, x.t), x.d ? h('small', null, x.d) : null, x.pill ? h('span', { className: 'ls-pill ls-pill-' + (x.mau || 'cam') }, x.pill) : null));
  }));
}

/* v442: nút hành động của Chi tiết khiếu nại, tố cáo hành chính đặt trong khối việc cần làm (như "Yêu cầu bổ sung tài liệu" của Chi tiết đơn) */
function KNH_ACT(k, tc, p) {
  if (k === 'rut' || p.kpa) return null;
  var bt = tc ? [['Cho ý kiến dự thảo kết luận', 'knOpinion'], ['Tố cáo tiếp', 'knNext'], ['Rút đơn', 'withdrawTc']] : [['Khiếu nại lần hai', 'knSecond'], ['Rút đơn', 'withdraw']];
  return h('div', { className: 'tdx knh-tdx', role: 'status' }, h('section', { className: 'tdx-c' },
    h('b', { className: 'tdx-nd' }, 'Việc bạn có thể làm'),
    h('div', { className: 'knh-btns' }, bt.map(function (x, i) { return h(T.Button, { key: x[0], size: 'sm', variant: i === 0 ? 'primary' : 'secondary', 'data-pt-go': x[1] }, x[0]); }))));
}

/* v444: nhãn loại việc (web loaiToTungMeta) và liên kết hồ sơ lần đầu (web: "Khiếu nại lần hai của hồ sơ [mã]", chỉ khi là hồ sơ lần hai) */
var KCT_LOAI_MAU = { qd: 'pakn', tra: 'pakn', hv: 'kn', tc: 'tc' };
function kttLoaiTag(r) { return h('span', { className: 'knd-pill knd-pill-' + KCT_LOAI_MAU[kntcThuTucLoai(r)] }, r.thuTuc); }
function kctGoc(p) { return h('button', { type: 'button', className: 'knd-link tp-num kct-goc-l', 'data-pt-go': 'complaintTtDone' }, 'KNTT-2026-0009'); }
function KctNhan(pa, r, tt0, tinh0, p) {
  return h(F, null, pa === 'A' ? kttLoaiTag(r) : null, h(T.StatusBadge, { tone: tt0[1], icon: false }, tt0[0]), h(T.StatusBadge, { tone: p.kq ? 'success' : 'info', icon: false }, tinh0));
}
function KctMa(pa, r, gui, p) {
  var ma = h('p', { className: 'dt-meta kct-ma' }, pa === 'B' ? kttLoaiTag(r) : null, h('span', { className: 'tp-num' }, p.l2 ? 'KNTT-2026-0015' : r.ma), ' · Ngày gửi ' + gui);
  if (pa === 'C') return h(F, null, ma, h('dl', { className: 'kct-lq' }, h('div', null, h('dt', null, 'Loại việc'), h('dd', null, r.thuTuc)),
    p.l2 ? h('div', null, h('dt', null, 'Hồ sơ lần đầu'), h('dd', null, kctGoc(p), ' ›')) : null));
  return h(F, null, ma, p.l2 ? h('p', { className: 'kct-goc' }, 'Khiếu nại lần hai của hồ sơ ', kctGoc(p)) : null);
}

/* v449: Chi tiết khiếu nại, tố cáo hành chính theo web chi-tiet.tsx – giữ 2 tab (Nội dung khiếu nại, tố cáo · Tiến trình giải quyết).
   Đầu màn: dòng mã · Gửi ngày, tiêu đề, nhãn trạng thái + loại, dòng Cơ quan tiếp nhận, [hồ sơ gốc], các nút theo web.
   Tab 1: Nội dung đơn và đối tượng bị khiếu nại, tố cáo · Tài liệu đã nộp (Xem, Tải về) · Người gửi đơn · [Người cùng đứng đơn] · [Yêu cầu rút đơn].
   Tab 2: Văn bản kết quả xử lý, giải quyết · Tiến trình xử lý. Bỏ 2 khối web không có: Thông tin xử lý, Thủ tục và căn cứ pháp lý. */
var KNH_V2 = true;
function KnHcDetail2(o) {
  var p = o.p, k = o.k, tc = o.tc, hs = o.hs, rut = k === 'rut', tab = React.useState(p.tab0 || 'nd');
  /* v452: nút theo trạng thái (dữ liệu demo) – đang giải quyết: rút đơn; đã có kết quả: cho ý kiến dự thảo + tố cáo tiếp; đang soạn, gửi không thành công: sửa đơn + gửi lại đơn; trạng thái khác: không có nút */
  var g = hs.grp[0];
  var nut = rut || p.kpa ? [] : knhcNutWeb({ nhom: knhcNhomTen(g), loai: hs.loai, han: (KNHC_DS.filter(function (c) { return c.ma === hs.ma; })[0] || {}).han, rutYc: hs.rutYc }); /* v515: nút theo web (KntcHanhChinhService.toDetail) */
  var head = h('section', { className: 'dt-head dt-head-don knh-head' }, h('p', { className: 'dt-meta' }, h('span', { className: 'tp-num' }, hs.ma), ' · Gửi ngày ' + hs.gui), h('h1', null, hs.tom),
    h('div', { className: 'dt-badges' }, hs.nhom ? h('span', { className: 'tp-badge knst knst-' + hs.nhom }, hs.grp[0]) : h(T.StatusBadge, { tone: hs.grp[1], icon: false }, hs.grp[0]), h(T.StatusBadge, { tone: 'neutral', icon: false }, p.kpa ? 'Kiến nghị, phản ánh' : hs.loai)),
    h('p', { className: 'knh-toa' }, 'Cơ quan tiếp nhận: ' + COURT1), hs.nhom && KNHC_TT_TEN[hs.ma] ? h('p', { className: 'knh-toa' }, 'Thủ tục: ' + KNHC_TT_TEN[hs.ma]) : null, /* v517 */
    nut.length ? h('div', { className: 'knh-nut' }, nut.map(function (x) { return h(T.Button, { key: x[0], size: 'sm', block: true, variant: x[2] ? 'primary' : 'secondary', 'data-pt-go': x[1] }, x[0]); })) : null);
  var tabs = h('div', { className: 'dt-tabs knh-tabs' }, h(T.Tabs, { label: 'Nội dung hồ sơ', value: tab[0], onChange: tab[1], items: [{ key: 'nd', label: 'Nội dung khiếu nại, tố cáo' }, { key: 'tt', label: 'Tiến trình giải quyết' }].concat(hs.rutYc ? [{ key: 'rut', label: 'Yêu cầu rút đơn' }] : []) /* v520 */ }));
  var doiTuong = h('div', { className: 'knh-dt' }, h('p', { className: 'knh-dt-h' }, 'Đối tượng bị khiếu nại, tố cáo'),
    RvKV([['Loại đối tượng', 'Cá nhân'], ['Họ tên', tc ? 'Phạm Văn Đức' : 'Nguyễn Văn Long'], ['Chức vụ', 'Cán bộ bộ phận tiếp nhận hồ sơ'], ['Nơi công tác', COURT1], ['Địa chỉ', '-']]));
  var tab1 = h(F, null,
    FCard('Người gửi đơn', RvKV([['Họ và tên', 'Hoàng Dương'], ['Số định danh', h('span', { className: 'tp-num' }, '001090012345')], ['Số điện thoại', '0912345678'], ['Tư cách', tc ? 'Người tố cáo' : 'Người khiếu nại']]
      .concat(tc && hs.baoVe !== false ? [['Đề nghị bảo vệ', 'Có — đề nghị áp dụng biện pháp bảo vệ người tố cáo']] : [])), true), /* v451: Người gửi đơn lên đầu */
    FCard('Nội dung đơn' /* v450 */, h(F, null, P(hs.tom + '. ' + (hs.nhom ? '' : tc ? 'Cán bộ tiếp công dân yêu cầu nộp tiền ngoài quy định khi nhận hồ sơ.' : 'Bộ phận tiếp nhận trả kết quả cấp bản sao bản án chậm 15 ngày so với giấy hẹn.')), doiTuong), true),
    FCard('Tài liệu đã nộp', DtDocs([['Đơn ' + o.word + ' đã ký số', hs.ma + '.pdf · Đơn đã ký số'], ['Tài liệu, chứng cứ', 'tai-lieu-1.pdf · Bản sao']], { tai: true, the: true }), true),
    rut ? FCard('Yêu cầu rút đơn', h(F, null, RvKV([['Mã đơn rút', '[Mã đơn rút]'], ['Trạng thái', 'Chờ Tòa án xác nhận'], ['Người yêu cầu', 'Hoàng Dương'], ['Hình thức', 'Rút toàn bộ'], ['Ngày gửi', '[Ngày gửi]'], ['Lý do', 'Vấn đề đã được khắc phục, giải quyết thỏa đáng']]),
      h(T.Button, { size: 'sm', variant: 'secondary', icon: 'eye', 'data-pt-go': 'attachment', onClickCapture: function () { window.__ibFile = 'don-rut-da-ky.pdf'; } }, 'Xem đơn rút đã ký')), true) : null);
  var tab2 = h(F, null,
    (hs.nhom ? hs.nhom === 'g5' : tc) ? FCard('Văn bản kết quả xử lý, giải quyết', DtDocs([[tc ? 'Kết luận nội dung tố cáo' : 'Quyết định giải quyết khiếu nại', '28-10-2026']], { the: true }), true) : null, /* v519: không có văn bản kết quả thì ẩn cả khối */
    FCard('Tiến trình xử lý', G1Std(o.buoc.map(function (b) { return { t: b[0], d: b[1], ngay: b[2], state: b[3] }; })), true));
  return SubS('Chi tiết hồ sơ', h(F, null, head,
    tc && hs.baoVe !== false ? h('div', { className: 'kn-bv' }, h(T.Icon, { name: 'lock' }), h('p', null, h('b', null, 'Bảo vệ người tố cáo. '), 'Danh tính của bạn được giữ bí mật với người bị tố cáo. Hồ sơ này chỉ người có thẩm quyền giải quyết được truy cập.')) : null,
    tabs, tab[0] === 'tt' ? tab2 : tab[0] === 'rut' && hs.rutYc ? KnRutTab(hs) : tab1), null);
}

/* v453: Rút đơn khiếu nại, tố cáo hành chính – như web RutDonModal: người yêu cầu rút (chỉ xem, lấy từ hồ sơ) · Hình thức rút · Lý do rút đơn (≥15 ký tự) · Ký số đơn rút (bắt buộc) · Hủy | Gửi yêu cầu rút */
function KnRut2(p) {
  var tc = !!p.tc, tu = tc ? 'tố cáo' : 'khiếu nại', ma = tc ? 'TC-2026-0004' : 'KN-2026-0012', org = p.org || window.LOAI_TK === 'tc';
  var tom = tc ? 'Tố cáo hành vi nhận tiền của cán bộ tiếp công dân' : 'Khiếu nại về việc chậm trả kết quả cấp bản sao';
  var ht = React.useState('1'), ld = React.useState(p.ld || ''), ky = React.useState(!!p.ky), tr = React.useState(!!p.tr), sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor);
  var loiLd = ld[0].trim().length < 15 ? 'Bạn nhập lý do rút đơn, tối thiểu 15 ký tự.' : null, loiKy = ky[0] ? null : 'Đơn rút phải được ký số trước khi gửi.';
  var nguoi = org ? [['Tên tổ chức', 'Công ty TNHH Thương mại An Phú'], ['Mã số thuế / mã định danh', h('span', { className: 'tp-num' }, '0105987654')], ['Số điện thoại tổ chức', '024 3766 8899'],
      ['Người đại diện theo pháp luật', 'Hoàng Dương'], ['Chức vụ người đại diện', 'Giám đốc'], ['Địa chỉ trụ sở', 'Số 45 Nguyễn Chí Thanh, Phường Láng, Thành phố Hà Nội']]
    : [['Họ tên người yêu cầu rút', 'Hoàng Dương'], ['Số điện thoại liên hệ', '0912345678'], ['Số định danh cá nhân', h('span', { className: 'tp-num' }, '001090012345')]];
  var khoiKy = h('section', { className: 'rut-ky' + (ky[0] ? ' rut-ky-ok' : tr[0] && loiKy ? ' rut-ky-loi' : '') },
    h('div', { className: 'rut-ky-h' }, h('b', null, 'Ký số đơn rút'), h(T.StatusBadge, { tone: 'warning', icon: false }, 'Bắt buộc'), ky[0] ? h(T.StatusBadge, { tone: 'success', icon: false }, 'Đã ký số') : null),
    h('p', null, ky[0] ? 'Đã ký số lúc 10:24 17-11-2026 bằng chữ ký số của ' + (org ? 'Công ty TNHH Thương mại An Phú' : 'Hoàng Dương') + '.'
      : org ? 'Đơn rút được kết xuất PDF và ký số 2 lần: ký số của người đại diện, sau đó ký số của tổ chức.' : 'Đơn rút được kết xuất PDF và ký bằng chữ ký số cá nhân của người rút, như đơn khiếu nại, tố cáo.'),
    h('div', { className: 'rut-ky-b' }, h(T.Button, { size: 'sm', block: !ky[0], onClick: function () { sh[1](true); } }, ky[0] ? 'Ký lại' : 'Ký số đơn rút'),
      ky[0] ? h(F, null, h(T.Button, { size: 'sm', variant: 'secondary', icon: 'eye', 'data-pt-go': 'attachment', onClickCapture: function () { window.__ibFile = 'don-rut-' + ma + '.pdf'; } }, 'Xem đơn đã ký'),
        h(T.Button, { size: 'sm', variant: 'secondary', icon: 'download', 'data-pt-go': 'snack:Đã tải về don-rut-' + ma + '.pdf' }, 'Tải về')) : null),
    tr[0] && loiKy ? h('p', { className: 'q2-err', role: 'alert' }, h(T.Icon, { name: 'alert' }), loiKy) : null);
  var body = h(F, null, h('span', { ref: anchor, hidden: true }),
    /* v454: bỏ khối đầu màn (Rút đơn · mã, tiêu đề, tóm tắt) */
    /* v454: bỏ khối Người yêu cầu rút */
    FCard('Nội dung rút đơn', h(F, null,
      h('div', { className: 'rut-ht' }, h('p', { className: 'sf-h' }, 'Hình thức rút'), h('div', { className: 'rut-rd', role: 'radiogroup', 'aria-label': 'Hình thức rút' }, [['1', 'Rút toàn bộ'], ['0', 'Rút một phần']].map(function (x) { var on = ht[0] === x[0]; return h('button', { key: x[0], type: 'button', role: 'radio', 'aria-checked': on, className: 'rut-rd-it' + (on ? ' rut-rd-on' : ''), onClick: function () { ht[1](x[0]); } }, CtRadio(on), x[1]); }))), /* v454: ô chọn tròn */
      Tf('Lý do rút đơn', { required: true, multiline: true, value: ld[0], onChange: function (e) { ld[1](e.target.value); }, maxLength: 1000, showCount: true, placeholder: 'Lý do rút đơn', error: tr[0] && loiLd ? loiLd : undefined })), true),
    true ? RutKySo(tu, ma, org, ky, sh, tr[0] && loiKy) : khoiKy, /* v455 */
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: ['Đơn rút ' + tu + ' – ' + ma + '.pdf'], onClose: function () { sh[1](false); }, onKy: function () { sh[1](false); ky[1](true); } }), host) : null);
  return SubS('Rút đơn ' + tu, body,
    Bar(Btn('Hủy', 'secondary', { 'data-pt-go': 'back' }), loiLd || loiKy ? Btn('Gửi yêu cầu rút', 'primary', { onClick: function () { tr[1](true); } })
      : Btn('Gửi yêu cầu rút', 'primary', { 'data-pt-go': 'backTo:' + (tc ? 'complaintDetailTc' : 'complaintDetail'), 'data-pt-snack': 'Đã gửi yêu cầu rút đơn.' })));
}

/* v455: Ký số đơn rút theo kiểu khối Ký số của soạn đơn khởi kiện */
function RutKySo(tu, ma, org, ky, sh, loi) {
  var da = ky[0], don = 'Đơn rút ' + tu;
  return FCard('Ký số', h(F, null, kyMoTa(org ? 'Đơn rút được kết xuất PDF và ký số 2 lần: ký số của người đại diện, sau đó ký số của tổ chức.' : 'Đơn rút được kết xuất PDF và ký bằng chữ ký số cá nhân của người rút, như đơn khiếu nại, tố cáo.'),
    h('ul', { className: 'ph-ky' },
      h('li', null, h('div', null, h('b', null, don), h('small', null, 'don-rut-' + ma + '.pdf')), da ? IcoBtn('download', 'Tải về ' + don, 'snack:Đã tải về don-rut-' + ma + '.pdf') : null, IcoBtn('eye', 'Xem ' + don)),
      org ? h(KyTcRows, { tep: [don + ' – ' + ma + '.pdf'], onXong: function () { ky[1](true); } })
        : h('li', null, h('span', { className: 'ph-ky-no' }, '1'), h('div', null, h('b', null, 'Hoàng Dương'), h('small', null, 'Người yêu cầu rút'), da ? h('small', { className: 'ph-ky-da' }, 'Đã ký lúc 17-11-2026 10:24') : null),
          da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn', onClick: function () { sh[1](true); } }, 'Ký số'))),
    loi ? h('p', { className: 'q2-err', role: 'alert' }, h(T.Icon, { name: 'alert' }), loi) : null), true, da ? 'signed' : 'unsigned');
}

/* v458: đơn tố cáo tiếp (web soan-don?…&maHoSoGoc=…) */
function knhTiep() { return !!(KNH_O && KNH_O.tiep); }
function KnhTiepBanner() {
  return h('div', { className: 'tct-bn' }, NvCall({ tone: 'warning', icon: 'info', title: 'Đơn tố cáo tiếp — hồ sơ gốc TC-2026-0004 · ' + KNH.ktc.ten + '.', children:
    'Gửi đến cơ quan cấp trên của người đã giải quyết khi bạn cho rằng việc giải quyết tố cáo không đúng pháp luật, hoặc đã quá thời hạn mà tố cáo chưa được giải quyết. Không áp dụng thời hiệu.' }));
}

/* v461: nhãn lần hai kèm mã hồ sơ lần đầu trên thẻ khiếu nại tố tụng (design system: Tag, RecordCard) */
var KNTT_L2PA = 'G';
var KNTT_L2TEN = { 'KNTT-2026-0009': 'Khiếu nại việc trả lại đơn khởi kiện' };

/* v462: nút bản nháp trên thẻ khiếu nại tố tụng (web NutNhap): Lưu lúc · Tiếp tục soạn (khóa khi nháp lần hai hết điều kiện) · Xóa nháp (hỏi xác nhận) */
var KNTT_NHPA = 'B', KNTT_LUU = '10:26 18-11-2026';
/* v578: bản nháp đã xóa (lỗi 4); màu nhãn trạng thái thẻ tố tụng theo bảng màu Tag của design system (lỗi 10, PA G) */
var KNTT_XOA = {};
var KNTT_MAU = { 'Lưu nháp': 10, 'Đang gửi': 3, 'Gửi lỗi': 1, 'Đã gửi đơn': 7, 'Đang xử lý đơn': 9, 'Đã xử lý đơn': 6 };
function KnNhapNut(r, chan) {
  var ghi = function () { window.__knttXoa = r.ma + '|' + r.tom; }; /* v578 lỗi 4 */
  var tiep = Btn('Tiếp tục soạn', 'primary', chan ? { size: 'sm', disabled: true, title: 'Không còn điều kiện gửi lần hai.' } : { size: 'sm', 'data-pt-go': r.go || 'kqd1' });
  var xoa = Btn('Xóa nháp', 'secondary', { size: 'sm', 'data-pt-go': 'complaintsDraftDel' });
  if (KNTT_NHPA === 'B') return h('div', { className: 'knn-f knn-b' }, h('small', null, 'Lưu lúc ' + KNTT_LUU), h('span', { className: 'knn-acts' }, tiep, h('span', { style: { display: 'contents' }, onClickCapture: ghi }, h(T.Button, { size: 'sm', variant: 'secondary', icon: 'trash', 'aria-label': 'Xóa nháp', 'data-pt-go': 'complaintsDraftDel' }, 'Xóa'))));
  if (KNTT_NHPA === 'C') return h('div', { className: 'knn-f knn-c' }, h('div', { className: 'ph-2btn' }, xoa, tiep));
  return h('div', { className: 'knn-f knn-a' }, h('small', null, 'Lưu lúc ' + KNTT_LUU), h('div', { className: 'ph-2btn' }, xoa, tiep));
}

/* v463: nút Theo dõi thời hạn – 'P' nút chữ, 'I' nút biểu tượng */
var KNTT_TDPA2 = 'P';

/* v464: chuyển giữa Danh sách và Theo dõi thời hạn (danh sách khiếu nại, tố cáo trong tố tụng) */
var KNTT_XPA = '2';
function KnXemTrai(bang, vs, n) {
  if (KNTT_XPA === '3') return h('p', { className: 'kxv-dem' }, h('b', { className: 'tp-num' }, n), ' hồ sơ');
  if (KNTT_XPA === '2') return h('button', { type: 'button', className: 'sf-pill kxv-link', 'data-pt-go': 'complaintsTtBang' }, h(T.Icon, { name: 'clock' }), 'Theo dõi thời hạn');
  return h('button', { type: 'button', className: 'sf-pill kxv-kieu', 'aria-haspopup': 'dialog', 'aria-label': 'Kiểu hiển thị: ' + (bang[0] ? 'Theo dõi thời hạn' : 'Danh sách'), onClick: function () { vs[1](true); } },
    h(T.Icon, { name: bang[0] ? 'clock' : 'menu' }), bang[0] ? 'Theo dõi thời hạn' : 'Danh sách', h(T.Icon, { name: 'chevronDown' }));
}
function KnXemSheet(p) {
  return h(LvSheet, { host: p.host, title: 'Kiểu hiển thị', onClose: p.onClose },
    h(LvRows, { label: 'Kiểu hiển thị', cur: p.bang[0] ? 'han' : 'ds', onPick: function (id) { p.bang[1](id === 'han'); p.onClose(); }, items: [
      { id: 'ds', name: 'Danh sách', desc: 'Xem trạng thái, Tòa án tiếp nhận, thủ tục và hồ sơ bị khiếu nại của từng hồ sơ.' },
      { id: 'han', name: 'Theo dõi thời hạn', desc: 'Xem hạn xử lý và số ngày còn lại của từng hồ sơ.' }] }));
}
function KnXemIco(bang) {
  return h('div', { className: 'kxv-ico', role: 'radiogroup', 'aria-label': 'Kiểu hiển thị' }, [['ds', 'menu', 'Xem dạng danh sách'], ['han', 'clock', 'Xem theo dõi thời hạn']].map(function (x) {
    var on = (bang[0] ? 'han' : 'ds') === x[0];
    return h('button', { key: x[0], type: 'button', role: 'radio', 'aria-checked': on, 'aria-label': x[2], title: x[2], className: 'kxv-b' + (on ? ' kxv-on' : ''), onClick: function () { bang[1](x[0] === 'han'); } }, h(T.Icon, { name: x[1] }));
  }));
}
/* PA 2: màn Theo dõi thời hạn – nhóm theo mức hạn, hồ sơ cần chú ý ở trên; bản nháp không tính thời hạn */
function KnTtHan() {
  var gui = KN_TT_HS.filter(function (r) { return !r.nhap; }), muc = function (r) { return r.kq ? 'kq' : r.bar ? r.bar[3] : 'an'; };
  var nhom = [['qua', 'Quá hạn xử lý'], ['sap', 'Sắp hết hạn'], ['an', 'Còn hạn'], ['kq', 'Đã có kết quả']];
  return SubS('Theo dõi thời hạn', h(F, null,
    h('p', { className: 'kxh-lead' }, 'Hồ sơ đã gửi, xếp theo mức hạn: hồ sơ cần chú ý ở trên. Bản nháp chưa gửi nên chưa tính thời hạn.'),
    nhom.map(function (g) {
      var ds = gui.filter(function (r) { return muc(r) === g[0]; });
      return ds.length ? h('section', { key: g[0], className: 'kxh-g' }, h('h3', { className: 'kxh-h' }, g[1], h('span', { className: 'tp-num' }, ds.length)),
        h('ul', { className: 'kxh-l' }, ds.map(function (r) {
          return h('li', { key: r.ma }, h('button', { type: 'button', className: 'kxh-it', 'data-pt-go': r.go },
            h('span', { className: 'knd-bang-h' }, h('b', { className: 'tp-num' }, r.ma), h('span', { className: 'knd-pill knd-pill-kn' }, r.thuTuc)),
            h('span', { className: 'kxh-t' }, r.tom),
            r.kq ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã có kết quả giải quyết')
              : r.bar ? h(T.DeadlineBar, { label: r.bar[2], level: r.bar[3], due: 'Hạn ' + r.bar[4], value: r.bar[0], max: r.bar[1] }) : null,
            h('small', null, 'Thời hạn: ' + (r.han || 'Chưa xác định'))));
        }))) : null;
    })));
}

/* v467: Bộ lọc hồ sơ – tab hành chính (kiểu như Bộ lọc tab tố tụng; trường: Trạng thái) */
function KnHcLoc(p) {
  var tt = React.useState(p.tt || 'all');
  return h(LvSheet, { host: p.host, title: 'Trạng thái hồ sơ', /* v470 */ onClose: p.onClose,
    foot: h(F, null, h(T.Button, { variant: 'secondary', onClick: function () { tt[1]('all'); } }, 'Nhập lại'),
      h(T.Button, { onClick: function () { p.onApply(tt[0]); } }, 'Áp dụng')) },
    h('div', { className: 'ib-loc' },
      KnTrangThaiChip(tt, p.ttItems, true))); /* v468: hiện sẵn các trạng thái, bỏ ô chọn */
}

/* v468: trường Trạng thái trong Bộ lọc hồ sơ khiếu nại, tố cáo – các lựa chọn hiện sẵn (viên chọn có số hồ sơ), như "Trạng thái đọc" của Bộ lọc hộp thư */
function KnTrangThaiChip(tt, items) {
  return h('div', null, h('p', { className: 'sf-h' }, 'Trạng thái'), h('div', { className: 'sf-grid', role: 'radiogroup', 'aria-label': 'Trạng thái' }, items.map(function (x) {
    var on = tt[0] === x.key;
    return h('button', { key: x.key, type: 'button', role: 'radio', 'aria-checked': on, className: 'ib-chip2' + (on ? ' ib-chip2-on' : ''), onClick: function () { tt[1](x.key); } }, x.label, h('span', { className: 'ib-chip2-n tp-num' }, x.count));
  })));
}


/* v469: trường Trạng thái trong Bộ lọc hồ sơ khiếu nại, tố cáo – kiểu danh sách như bảng chọn "Hồ sơ, vụ án" (LvRows: mỗi dòng một lựa chọn, ngăn bằng đường kẻ mảnh, dòng đang chọn chữ đỏ đậm + dấu tích), hiện sẵn trong bảng Bộ lọc; ghi đè bản viên chọn v468 */
function KnTrangThaiChip(tt, items, anNhan) { /* v470: anNhan – bảng chỉ có trường này (tab hành chính) thì bỏ nhãn Trạng thái, tiêu đề bảng là Trạng thái hồ sơ */
  return h('div', { className: 'kn-tt-l' }, anNhan ? null : h('p', { className: 'sf-h' }, 'Trạng thái'),
    h(LvRows, { ngay: true, label: 'Trạng thái', cur: tt[0], items: items.map(function (x) { return { id: x.key, name: x.label, n: x.count }; }), onPick: tt[1] }));
}

/* v473: Trang chủ gồm Theo dõi vụ án, vụ việc (chuyển từ tab Hồ sơ) và Việc cần làm; khối Dịch vụ và hỗ trợ thành tab riêng thay tab Hồ sơ */
NAV = [{ key: 'home', icon: 'home', label: 'Trang chủ' }, { key: 'svc', icon: 'grid', label: 'Dịch vụ' }, { key: 'inbox', icon: 'mail', label: 'Hộp thư' }, { key: 'me', icon: 'menu', label: 'Cài đặt' }];
function RecList() {
  var mo = React.useState(false);
  return h('div', { className: 'rn-groups' }, REC_MENU.map(function (g, i) {
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
  }));
}
function Home(all) {
  return h(Phone, { cls: 'ph-main' },
    HomeBg(),
    h(Body, { cls: 'tp-sheet ph-home-sheet' },
      h(T.BannerCarousel, { slides: [Object.assign({ imageSrc: HERO || undefined }, BANNER_HOME[0])] }),
      Blk('Theo dõi vụ án, vụ việc', h(RecList), { cls: 'hm-rec' }),
      Blk('Việc cần làm', h('ul', { className: 'vk-list' }, (all ? VK : VK.slice(0, 3)).map(VkCard)), { action: h(T.LinkArrow, { arrow: false }, all ? 'Thu gọn' : 'Xem tất cả') })),
    Nav('home'), all ? null : h(CkPopup));
}
function DvTab() {
  return Main('svc', 'Dịch vụ và hỗ trợ', Blk(null, h('div', { className: 'tp-tile-grid tp-tile-grid-illo ph-svc' }, HOME_TILES.map(function (x) { return h(T.ServiceTile, { key: x[1], illustration: x[0], label: x[1] }); }))));
}

/* v473: đổi kiểu – Trang chủ: Theo dõi vụ án, vụ việc dạng lưới ô; tab Dịch vụ: danh sách dòng */
var HM_REC_TEN = { 'Danh sách đơn và tiến trình': 'Danh sách đơn\nvà tiến trình', 'Hòa giải, đối thoại': 'Hòa giải,\nđối thoại', 'Giao nộp tài liệu, chứng cứ': 'Giao nộp\ntài liệu,\nchứng cứ', 'Đăng ký người bảo vệ': 'Đăng ký\nngười bảo vệ', 'Vụ án, vụ việc của tôi': 'Vụ án, vụ việc\ncủa tôi', 'Vụ việc phục hồi phá sản': 'Vụ việc\nphục hồi\nphá sản', 'Nghĩa vụ tài chính': 'Nghĩa vụ\ntài chính' };
function RecList() {
  var all = [].concat.apply([], REC_MENU);
  return h('div', { className: 'tp-tile-grid tp-tile-grid-illo ph-svc hm-rec-grid' }, all.map(function (x) { return h(T.ServiceTile, { key: x.label, illustration: REC_ILLO[x.label], label: HM_REC_TEN[x.label] || x.label }); }));
}
var DV_MO = { lichTiepDan: 'Đăng ký và quản lý lịch hẹn', lichXetXu: 'Buổi phải dự, phiên đã diễn ra, nhắc lịch', trichLuc: 'Gửi yêu cầu và theo dõi kết quả', khieuNai: 'Nộp đơn và theo dõi giải quyết' };
function DvTab() {
  return Main('svc', 'Dịch vụ và hỗ trợ', h('div', { className: 'rn-groups' }, h('div', { className: 'rn-list', role: 'group', 'aria-label': 'Dịch vụ và hỗ trợ' }, HOME_TILES.map(function (x) {
    return h('button', { key: x[0], type: 'button', className: 'rn-row' },
      h('span', { className: 'tp-illo-circle rn-row-ic' }, h(T.Illustration, { name: x[0] })),
      h('span', { className: 'rn-row-tx' }, h('b', null, x[1].replace('\n', ' ')), h('small', null, DV_MO[x[0]])), h(T.Icon, { name: 'chevronRight' }));
  }))));
}
/* v473: tab Hồ sơ đã bỏ – màn records hiển thị Trang chủ (Theo dõi vụ án, vụ việc nằm ở Trang chủ) */
function Records() { return Home(false); }

/* v474: Lịch tố tụng ra Trang chủ – ô cuối lưới Theo dõi vụ án, vụ việc; tab Dịch vụ bỏ dòng Lịch tố tụng */
function RecList() {
  var all = [].concat.apply([], REC_MENU);
  return h('div', { className: 'tp-tile-grid tp-tile-grid-illo ph-svc hm-rec-grid' }, all.map(function (x) { return h(T.ServiceTile, { key: x.label, illustration: REC_ILLO[x.label], label: HM_REC_TEN[x.label] || x.label }); }),
    h(T.ServiceTile, { key: 'lichXetXu', illustration: 'lichXetXu', label: 'Lịch\ntố tụng' }));
}
function DvTab() {
  return Main('svc', 'Dịch vụ và hỗ trợ', h('div', { className: 'rn-groups' }, h('div', { className: 'rn-list', role: 'group', 'aria-label': 'Dịch vụ và hỗ trợ' }, HOME_TILES.filter(function (x) { return x[0] !== 'lichXetXu'; }).map(function (x) {
    return h('button', { key: x[0], type: 'button', className: 'rn-row' },
      h('span', { className: 'tp-illo-circle rn-row-ic' }, h(T.Illustration, { name: x[0] })),
      h('span', { className: 'rn-row-tx' }, h('b', null, x[1].replace('\n', ' ')), h('small', null, DV_MO[x[0]])), h(T.Icon, { name: 'chevronRight' }));
  }))));
}

/* v475: thẻ quyết định, văn bản trong bảng chọn – đủ thông tin như web (hangVanBan): tên, tên biểu mẫu, Mẫu · số · nhận ngày · hạn cuối, nhãn Thủ tục, nhãn hạn */
var KQV_PA = 'W';
function KqdVbList(pa, ds, cur, pick) {
  var m = window.__kqvPa || KQV_PA;
  return h('div', { className: 'mg-opts kqb kqv2', role: 'radiogroup', 'aria-label': 'Quyết định, văn bản bị khiếu nại' }, ds.map(function (x) {
    var on = cur === x.id;
    return h('button', { key: x.id, type: 'button', role: 'radio', 'aria-checked': on, className: 'mg-opt' + (on ? ' mg-opt-on' : ''), onClick: function () { pick(x.id); } },
      h('span', { className: 'mg-opt-tx kqb-tx' },
        h('b', null, x.ten),
        x.bm && x.bm !== x.ten ? h('small', null, x.bm) : null,
        h('small', { className: 'tp-num' }, x.code + ' · ' + x.so + ' · nhận ngày ' + x.nhan + ' · hạn cuối ' + x.hanCuoi),
        m === 'X' ? h('small', null, (x.toa || COURT1) + ' · ' + (x.cap || '[Cấp xét xử]')) : null,
        h('span', { className: 'kqv2-tag' }, h(T.StatusBadge, { tone: 'info', icon: false }, 'Thủ tục: ' + KQD_TT[x.tt].ten),
          h(T.StatusBadge, { tone: x.con <= 2 ? 'warning' : 'success', icon: false }, kqdCon(x.con)))));
  }));
}

/* v479: tách Khiếu nại, tố cáo thành 2 mục ở tab Dịch vụ; màn danh sách bỏ hàng tab nguồn (Hành chính / Tố tụng) */
var DV_KN = [['knTt', 'banAn', 'Khiếu nại, tố cáo trong tố tụng', 'Quyết định, hành vi trong vụ án, vụ việc của bạn'], ['knHc', 'hanhChinh', 'Khiếu nại, tố cáo hành chính', 'Quyết định, hành vi hành chính tại Tòa án']];
function DvTab() {
  var dong = function (k, illo, ten, mo) {
    return h('button', { key: k, type: 'button', className: 'rn-row' }, h('span', { className: 'tp-illo-circle rn-row-ic' }, h(T.Illustration, { name: illo })),
      h('span', { className: 'rn-row-tx' }, h('b', null, ten), h('small', null, mo)), h(T.Icon, { name: 'chevronRight' }));
  };
  var ds = HOME_TILES.filter(function (x) { return x[0] !== 'lichXetXu' && x[0] !== 'khieuNai'; }).map(function (x) { return dong(x[0], x[0], x[1].replace('\n', ' '), DV_MO[x[0]]); })
    .concat(DV_KN.map(function (x) { return dong(x[0], x[1], x[2], x[3]); }));
  return Main('svc', 'Dịch vụ và hỗ trợ', h('div', { className: 'rn-groups' }, h('div', { className: 'rn-list', role: 'group', 'aria-label': 'Dịch vụ và hỗ trợ' }, ds)));
}
function KnHome(p) {
  var tt = p.tab === 'tt', rong = p.rong, tl = React.useState(p.loi ? 'loi' : ''), tai = p.tai || tl[0] === 'tai', loi = tl[0] === 'loi';
  var thuLai = function () { tl[1]('tai'); setTimeout(function () { tl[1](''); }, 900); }; /* v578 lỗi 5: Thử lại → đang tải → danh sách (cả hành chính và tố tụng) */
  var noiDung = tai ? h('div', { className: 'knd-tai', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), tt ? 'Đang tải hồ sơ khiếu nại, tố cáo trong tố tụng...' : 'Đang tải…')
    : loi ? h(T.EmptyState, { variant: 'center', icon: 'alert', title: '[Thông báo lỗi của hệ thống]', text: 'Không có thông báo thì hiện: Không tải được danh sách hồ sơ.', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: thuLai, className: 'nv-err' })
    : tt ? h(KnTt, p) : h(KnHc, p);
  return DsShell(tt ? 'Khiếu nại, tố cáo trong tố tụng' : 'Khiếu nại, tố cáo hành chính', h(F, null,
    !tt && p.nhap ? h(KnNhapHc, { ky: p.nhap === 'ky' }) : null,
    noiDung, p.top || null), 'Nộp đơn mới', 'choose');
}

/* v480: tab Dịch vụ – chức năng dạng banner */
var DVB_PA = 'B';
var DVB_TONE = ['brand', 'warning', 'success', 'danger'];
function dvbItems() {
  return HOME_TILES.filter(function (x) { return x[0] !== 'lichXetXu' && x[0] !== 'khieuNai'; }).map(function (x) { return { k: x[0], illo: x[0], ten: x[1].replace('\n', ' '), mo: DV_MO[x[0]] }; })
    .concat(DV_KN.map(function (x) { return { k: x[0], illo: x[1], ten: x[2], mo: x[3] }; }));
}
function DvTab() {
  var m = window.__dvbPa || DVB_PA, ds = dvbItems(), body;
  if (m === 'A') body = h('div', { className: 'dvb dvb-a' }, ds.map(function (x) {
    return h('button', { key: x.k, type: 'button', className: 'tp-slide dvb-a-it' },
      h('span', { className: 'dvb-a-ic', 'aria-hidden': 'true' }, h(T.Illustration, { name: x.illo })),
      h('span', { className: 'tp-slide-body dvb-a-tx' }, h('b', { className: 'tp-slide-t' }, x.ten), h('small', { className: 'tp-slide-d' }, x.mo),
        h('span', { className: 'tp-btn tp-btn-gold tp-slide-cta dvb-a-cta' }, 'Bắt đầu')));
  }));
  else if (m === 'B') body = h('div', { className: 'dvb dvb-b' }, ds.map(function (x, i) {
    return h('button', { key: x.k, type: 'button', className: 'dvb-b-it dvb-t-' + DVB_TONE[i % 4] },
      h('span', { className: 'dvb-b-tx' }, h('b', null, x.ten), h('small', null, x.mo), h('span', { className: 'dvb-b-go' }, 'Bắt đầu', h(T.Icon, { name: 'chevronRight' }))),
      h('span', { className: 'dvb-b-ic', 'aria-hidden': 'true' }, h(T.Illustration, { name: x.illo })));
  }));
  else body = h('div', { className: 'dvb dvb-c' }, ds.map(function (x, i) {
    return h('button', { key: x.k, type: 'button', className: 'dvb-c-it dvb-t-' + DVB_TONE[i % 4] },
      h('span', { className: 'dvb-c-ic', 'aria-hidden': 'true' }, h(T.Illustration, { name: x.illo })),
      h('b', null, x.ten), h('small', null, x.mo));
  }));
  return Main('svc', 'Dịch vụ và hỗ trợ', body);
}

/* v480: tab Dịch vụ – banner hướng hiện đại */
var DVM_PA = 'D1';
var DVM_TONE = { lichTiepDan: 'teal', trichLuc: 'navy', knTt: 'red', knHc: 'amber' };
function DvmGo() { return h('span', { className: 'dvm-go', 'aria-hidden': 'true' }, h(T.Icon, { name: 'arrowRight' })); }
function DvTab() {
  var m = window.__dvmPa || DVM_PA, ds = dvbItems(), body;
  if (m === 'D' || m === 'D1') body = h('div', { className: 'dvm dvm-d' }, ds.map(function (x, i) {
    return h('button', { key: x.k, type: 'button', className: 'dvm-d-it dvm-t-' + DVM_TONE[x.k] + (i < 2 && m === 'D' ? ' dvm-d-sq' : ' dvm-d-wide') }, /* D1: mỗi thẻ một dòng */
      h('span', { className: 'dvm-tx' }, h('b', null, x.ten), h('small', null, x.mo)), /* bỏ nút mũi tên */
      h('span', { className: 'dvm-d-ic', 'aria-hidden': 'true' }, h(T.Illustration, { name: x.illo })));
  }));
  else if (m === 'E') body = h('div', { className: 'dvm dvm-e' }, ds.map(function (x) {
    return h('button', { key: x.k, type: 'button', className: 'dvm-e-it dvm-e-' + DVM_TONE[x.k] },
      h('span', { className: 'dvm-tx' }, h('b', null, x.ten), h('small', null, x.mo), h('span', { className: 'dvm-e-cta' }, 'Bắt đầu', h(T.Icon, { name: 'arrowRight' }))),
      h('span', { className: 'dvm-e-ic', 'aria-hidden': 'true' }, h(T.Illustration, { name: x.illo })));
  }));
  else body = h('div', { className: 'dvm dvm-f' }, ds.map(function (x) {
    return h('button', { key: x.k, type: 'button', className: 'dvm-f-it dvm-t-' + DVM_TONE[x.k] },
      h('span', { className: 'dvm-f-ic', 'aria-hidden': 'true' }, h(T.Illustration, { name: x.illo })),
      h('span', { className: 'dvm-tx' }, h('b', null, x.ten), h('small', null, x.mo)), DvmGo());
  }));
  return Main('svc', 'Dịch vụ và hỗ trợ', body);
}

/* v480: tab Cài đặt đổi thành Cá nhân (biểu tượng user); Câu hỏi thường gặp, Đánh giá mức độ hài lòng sang tab Dịch vụ */
NAV = NAV.map(function (it) { return it.key === 'me' ? { key: 'me', icon: 'user', label: 'Cá nhân' } : it; });
DVM_PA = 'D1';
DVM_TONE.faq = 'violet'; DVM_TONE.danhGia = 'blue';
var DV_HT = [['faq', 'hoiDap', 'Câu hỏi thường gặp', 'Giải đáp những vấn đề phổ biến'], ['danhGia', 'danhGia', 'Đánh giá mức độ hài lòng', 'Đánh giá chất lượng cung cấp dịch vụ']];
var dvbItems0 = dvbItems;
dvbItems = function () { return dvbItems0().concat(DV_HT.map(function (x) { return { k: x[0], illo: x[1], ten: x[2], mo: x[3] }; })); };
var meMenu0 = meMenu;
meMenu = function () { return meMenu0().filter(function (g) { return !g.some(function (x) { return x.label === 'Câu hỏi thường gặp' || x.label === 'Đánh giá mức độ hài lòng'; }); }); };

/* v481: tab Cá nhân – menu dạng danh sách dòng (hình minh họa, tên, mô tả) như danh sách Dịch vụ cũ */
var ME_PA = 'A';
var ME_ROWS = {
  'Hồ sơ cá nhân': ['cccd', 'Định danh, thông tin liên hệ, xác thực hai yếu tố'],
  'Hồ sơ tổ chức': ['cccd', 'Thông tin tổ chức, người đại diện pháp luật, xác thực hai yếu tố'],
  'Cam kết giao dịch điện tử': ['yeuCau', 'Xác nhận cam kết theo vai trò tham gia tố tụng'],
  'Quản lý chữ ký số': ['uyQuyen', 'Chứng thư số và lịch sử ký'],
  'Phương thức giao dịch điện tử': ['phanTo', 'Giao dịch điện tử hoặc giấy theo từng hồ sơ'],
  'Đổi mật khẩu': ['caiDat', 'Thay đổi mật khẩu đăng nhập'],
  'Đăng ký lại thiết bị': ['huongDanSD', 'Đăng ký điện thoại đang dùng với tài khoản'] };
function MeRow(x) {
  var r = ME_ROWS[x.label] || ['caiDat', ''];
  return h('button', { key: x.label, type: 'button', className: 'rn-row me-row' },
    h('span', { className: 'tp-illo-circle rn-row-ic' }, h(T.Illustration, { name: r[0] })),
    h('span', { className: 'rn-row-tx' }, h('b', null, x.label), r[1] ? h('small', null, r[1]) : null), h(T.Icon, { name: 'chevronRight' }));
}
function MeOut(nut) {
  return nut ? h('button', { type: 'button', className: 'me-out-btn' }, h(T.Icon, { name: 'logout' }), 'Đăng xuất')
    : h('div', { className: 'rn-list me-out' }, h('button', { type: 'button', className: 'rn-row me-row me-row-out' },
      h('span', { className: 'tp-illo-circle rn-row-ic me-out-ic' }, h(T.Icon, { name: 'logout' })), h('span', { className: 'rn-row-tx' }, h('b', null, 'Đăng xuất'))));
}
function Personal() {
  var m = window.__mePa || ME_PA, g = meMenu(), muc = g.filter(function (x) { return !x.some(function (y) { return y.label === 'Đăng xuất'; }); });
  var body = m === 'B'
    ? h('div', { className: 'rn-groups me-groups' }, h('div', { className: 'rn-list', role: 'group', 'aria-label': 'Cá nhân' }, [].concat.apply([], muc).map(MeRow)), MeOut(true))
    : h('div', { className: 'rn-groups me-groups' }, muc.map(function (x, i) { return h('div', { key: i, className: 'rn-list', role: 'group' }, x.map(MeRow)); }), MeOut(false));
  return h(Phone, { cls: 'ph-main' },
    h('div', { className: 'ph-me-top me-s2', style: { backgroundImage: 'linear-gradient(90deg,rgba(99,7,13,.95) 30%,rgba(163,19,28,.55)),url(' + HERO + ')' } },
      h('span', { className: 'me-s2-av', 'aria-hidden': 'true' }, laTC() ? TC_TAT : 'HD'),
      h('span', { className: 'me-s2-tx' }, h('b', null, laTC() ? TC_TEN : 'Hoàng Dương'),
        h('button', { type: 'button', className: 'me-chip me-s2-chip', 'aria-label': 'Vai trò sử dụng: ' + (laTC() ? 'Tổ chức' : 'Công dân'), onClick: noop }, laTC() ? 'Tổ chức' : 'Công dân', h(T.Icon, { name: 'chevronDown' })))),
    h(Body, { cls: 'tp-sheet' }, body), Nav('me'));
}


/* v481: menu Cá nhân – Phương thức giao dịch điện tử lên trước Quản lý chữ ký số */
var meMenu1 = meMenu;
meMenu = function () { return meMenu1().map(function (g) {
  var a = g.findIndex(function (x) { return x.label === 'Quản lý chữ ký số'; }), b = g.findIndex(function (x) { return x.label === 'Phương thức giao dịch điện tử'; });
  if (a < 0 || b < 0) return g; g = g.slice(); var t = g[a]; g[a] = g[b]; g[b] = t; return g; }); };

/* v482: tab Dịch vụ – thẻ chức năng rõ hơn so với nền màn */
var DVX_PA = 'E';
function DvTab() {
  var m = window.__dvxPa || DVX_PA, ds = dvbItems();
  return Main('svc', 'Dịch vụ và hỗ trợ', h('div', { className: 'dvm dvm-d dvx-' + m }, ds.map(function (x) {
    return h('button', { key: x.k, type: 'button', className: 'dvm-d-it dvm-d-wide dvm-t-' + DVM_TONE[x.k] },
      h('span', { className: 'dvm-tx' }, h('b', null, x.ten), h('small', null, x.mo)),
      h('span', { className: 'dvm-d-ic', 'aria-hidden': 'true' }, h(T.Illustration, { name: x.illo })));
  })));
}


/* v484: mô tả thẻ tab Dịch vụ theo web */
DV_MO.trichLuc = 'Yêu cầu bản điện tử có chữ ký số của Tòa án';
DV_HT[0][3] = 'Tra cứu câu hỏi và góp ý câu trả lời';
DV_HT[1][3] = 'Đánh giá dịch vụ và xem kết quả công khai';

/* v486: Trang chủ – Theo dõi vụ án, vụ việc lưới 3x3, ô 9 "Xem tất cả" kiểu thư mục (chọn C); màn Tất cả chức năng dạng danh sách dòng theo nhóm (chọn B) */
var HM9_TEN_DV = { lichTiepDan: 'Đăng ký lịch\ntiếp dân', trichLuc: 'Cấp trích lục,\nbản sao', knTt: 'Khiếu nại,\ntố cáo\ntrong tố tụng', knHc: 'Khiếu nại,\ntố cáo\nhành chính', faq: 'Câu hỏi\nthường gặp', danhGia: 'Đánh giá\nmức độ\nhài lòng' };
function hm9Nhom() {
  var g1 = REC_MENU[0].map(function (x) { return { illo: REC_ILLO[x.label], ten: x.label, tile: HM_REC_TEN[x.label] || x.label, mo: x.description }; });
  var g2 = REC_MENU[1].map(function (x) { return { illo: REC_ILLO[x.label], ten: x.label, tile: HM_REC_TEN[x.label] || x.label, mo: x.description }; })
    .concat([{ illo: 'lichXetXu', ten: 'Lịch tố tụng', tile: 'Lịch\ntố tụng', mo: DV_MO.lichXetXu }]);
  var g3 = dvbItems().map(function (x) { return { illo: x.illo, ten: x.ten, tile: HM9_TEN_DV[x.k] || x.ten, mo: x.mo }; });
  return [['Đơn và thủ tục', g1], ['Vụ án, vụ việc và nghĩa vụ', g2], ['Dịch vụ và hỗ trợ', g3]];
}
function RecList() {
  var ng = hm9Nhom(), tam = ng[0][1].concat(ng[1][1]);
  return h('div', { className: 'tp-tile-grid tp-tile-grid-illo ph-svc hm-rec-grid hm9' }, tam.map(function (x) { return h(T.ServiceTile, { key: x.ten, illustration: x.illo, label: x.tile }); }),
    h('button', { key: 'all', type: 'button', className: 'tp-tile hm9-all' },
      h('span', { className: 'hm9-folder', 'aria-hidden': 'true' }, ng[2][1].slice(0, 4).map(function (x) { return h(T.Illustration, { key: x.illo, name: x.illo }); })), h('span', null, 'Xem tất cả')));
}
function AllFn() {
  return DsShell('Tất cả chức năng', h('div', { className: 'rn-groups hm9-l' }, hm9Nhom().map(function (g) {
    return h('section', { key: g[0] }, h('h3', { className: 'hm9-h' }, g[0]), h('div', { className: 'rn-list', role: 'group', 'aria-label': g[0] }, g[1].map(function (x) {
      return h('button', { key: x.ten, type: 'button', className: 'rn-row' }, h('span', { className: 'tp-illo-circle rn-row-ic' }, h(T.Illustration, { name: x.illo })),
        h('span', { className: 'rn-row-tx' }, h('b', null, x.ten), h('small', null, x.mo)), h(T.Icon, { name: 'chevronRight' }));
    })));
  })));
}

/* v488: nút (+) giữa thanh điều hướng (chọn B, thẻ rộng 80%) – bấm: nền tối, 3 thẻ bung ngay trên nút, (+) đổi thành X */
var NW_DS = [['nopDon', 'Nộp đơn khởi kiện'], ['khieuNai', 'Nộp đơn khiếu nại, tố cáo'], ['trichLuc', 'Yêu cầu cấp trích lục, bản sao']];
function nwDich(k) { return k === 'nopDon' ? (laTC() ? 'draftNoRep' : 'draftAsk') : k === 'khieuNai' ? 'choose' : 'tl1'; }
function NavB(p) {
  var mo = React.useState(!!window.__nwMo), n = ibSoChuaDoc(), dong = function () { mo[1](false); };
  var ds = NAV.map(function (it) {
    var on = it.key === p.active, bd = it.key === 'inbox' && n > 0 ? (n > 99 ? '99+' : String(n)) : null;
    return h('button', { key: it.key, type: 'button', className: 'tp-nav-item' + (on ? ' tp-nav-on' : ''), 'aria-current': on ? 'page' : undefined, 'aria-describedby': bd ? 'ib-nav-n' : undefined },
      h('span', { className: 'ib-nav-ic', 'data-n': bd || undefined }, h(T.Icon, { name: it.icon })), it.label);
  });
  ds.splice(2, 0, h('button', { key: 'nw', type: 'button', className: 'tp-nav-main nw-main pt-chk' + (mo[0] ? ' nw-on' : ''), 'aria-label': mo[0] ? 'Đóng' : 'Tạo mới', 'aria-expanded': mo[0], 'aria-haspopup': 'menu', onClick: function () { mo[1](!mo[0]); } },
    h('span', { className: 'tp-nav-fab' }, h(T.Icon, { name: mo[0] ? 'x' : 'plus' }))));
  return h('div', { className: 'ph-nav nw-nav' }, h('nav', { className: 'tp-nav tp-nav2', 'aria-label': 'Điều hướng chính' }, ds),
    n > 0 ? h('span', { id: 'ib-nav-n', className: 'pt-sr' }, n + ' văn bản chưa đọc') : null,
    mo[0] ? h('div', { className: 'nw-ov' }, h('div', { className: 'ph-scrim nw-scrim pt-chk', 'aria-hidden': 'true', onClick: dong }),
      h('ul', { className: 'nw-dial', role: 'menu', 'aria-label': 'Tạo mới' }, NW_DS.map(function (x) {
        return h('li', { key: x[0], role: 'none' }, h('button', { type: 'button', role: 'menuitem', className: 'nw-dial-it', 'data-pt-go': nwDich(x[0]) },
          h('span', { className: 'tp-illo-circle nw-dial-ic' }, h(T.Illustration, { name: x[0] })), h('span', null, x[1])));
      }))) : null);
}
function Nav(active) { return h(NavB, { active: active }); }
/* v488: ô lưới Trang chủ – tên tối đa 2 dòng */
HM_REC_TEN['Giao nộp tài liệu, chứng cứ'] = 'Giao nộp tài liệu,\nchứng cứ';
HM_REC_TEN['Vụ việc phục hồi phá sản'] = 'Vụ việc phục hồi\nphá sản';

/* v489: Theo dõi vụ án, vụ việc gọn – lưới 4 cột × 2 hàng (8 chức năng, Lịch tố tụng ở ô 8), tên tối đa 2 dòng (dài quá thì "…"); "Xem tất cả" thành liên kết ở tiêu đề khối (chọn B1) */
function RecList() {
  var ng = hm9Nhom();
  return h('div', { className: 'rg rg-b hm-rec-grid' }, ng[0][1].concat(ng[1][1]).map(function (x) {
    return h('button', { key: x.ten, type: 'button', className: 'tp-tile rg-it', title: x.ten },
      h('span', { className: 'tp-illo-circle rg-ic' }, h(T.Illustration, { name: x.illo })), h('span', { className: 'rg-tx' }, x.ten));
  }));
}
function Home(all) {
  return h(Phone, { cls: 'ph-main' },
    HomeBg(),
    h(Body, { cls: 'tp-sheet ph-home-sheet' },
      h(T.BannerCarousel, { slides: [Object.assign({ imageSrc: HERO || undefined }, BANNER_HOME[0])] }),
      Blk('Theo dõi vụ án, vụ việc', h(RecList), { cls: 'hm-rec', action: h(T.LinkArrow, { arrow: false }, 'Xem tất cả') }),
      Blk('Việc cần làm', h('ul', { className: 'vk-list' }, (all ? VK : VK.slice(0, 3)).map(VkCard)), { action: h(T.LinkArrow, { arrow: false }, all ? 'Thu gọn' : 'Xem tất cả') })),
    Nav('home'), all ? null : h(CkPopup));
}

/* v492: trả khối Theo dõi vụ án, vụ việc về giao diện v488 – lưới 3x3, ô 9 "Xem tất cả" kiểu thư mục, tên tối đa 2 dòng; tiêu đề khối không có liên kết (bỏ thay đổi v489, v491) */
function RecList() {
  var ng = hm9Nhom(), tam = ng[0][1].concat(ng[1][1]);
  return h('div', { className: 'tp-tile-grid tp-tile-grid-illo ph-svc hm-rec-grid hm9' }, tam.map(function (x) { return h(T.ServiceTile, { key: x.ten, illustration: x.illo, label: x.tile }); }),
    h('button', { key: 'all', type: 'button', className: 'tp-tile hm9-all' },
      h('span', { className: 'hm9-folder', 'aria-hidden': 'true' }, ng[2][1].slice(0, 4).map(function (x) { return h(T.Illustration, { key: x.illo, name: x.illo }); })), h('span', null, 'Xem tất cả')));
}
function Home(all) {
  return h(Phone, { cls: 'ph-main' },
    HomeBg(),
    h(Body, { cls: 'tp-sheet ph-home-sheet' },
      h(T.BannerCarousel, { slides: [Object.assign({ imageSrc: HERO || undefined }, BANNER_HOME[0])] }),
      Blk('Theo dõi vụ án, vụ việc', h(RecList), { cls: 'hm-rec' }),
      Blk('Việc cần làm', h('ul', { className: 'vk-list' }, (all ? VK : VK.slice(0, 3)).map(VkCard)), { action: h(T.LinkArrow, { arrow: false }, all ? 'Thu gọn' : 'Xem tất cả') })),
    Nav('home'), all ? null : h(CkPopup));
}

/* v496: thanh điều hướng – đổi chỗ Dịch vụ và Hộp thư: Trang chủ · Hộp thư · (+) · Dịch vụ · Cá nhân */
NAV = ['home', 'inbox', 'svc', 'me'].map(function (k) { return NAV.filter(function (it) { return it.key === k; })[0]; });


/* v498: Trang chủ làm lại từng khối (người dùng chọn 19/11/2026)
   – Header: bỏ "Xin chào", tên 20px + Định danh VNeID; vai trò thành nhãn dưới tên, nút tròn chuyển vai trò bên trái chuông (chọn R2)
   – Theo dõi vụ án, vụ việc: 4 cột × 2 hàng, bỏ ô Lịch tố tụng (tách thành khối riêng)
   – Việc cần làm: dạng dòng – trái "Hạn cuối dd/mm" + "Còn N ngày", phải tên việc + loại · mã
   – Khối Lịch tố tụng riêng: dải 7 ngày trong tuần (chấm ngày có lịch) + buổi gần nhất (chọn L2) */
HomeBg = function () {
  var tc = laTC(), vt = tc ? 'Tổ chức' : 'Công dân';
  return h('div', { className: 'ph-me-top ph-home-hd rh-hd' },
    h('div', { className: 'rh-row' },
      h('div', { className: 'rh-tx' }, h('b', null, tc ? TC_TEN : 'Hoàng Dương'),
        h('small', null, h('span', { className: 'rh-vt' }, vt), h('span', { className: 'rh-id' }, h(T.Icon, { name: 'shield' }), 'Định danh VNeID'))),
      h('button', { type: 'button', className: 'rh-ic pt-chk', 'aria-label': 'Chuyển vai trò: ' + vt }, h(T.Icon, { name: 'swap' })),
      h('button', { type: 'button', className: 'rh-bell', 'aria-label': 'Thông báo' }, h(T.Icon, { name: 'bell' }), h('span', { className: 'rh-dot' }))));
};
function RecList() {
  var ng = hm9Nhom(), tam = ng[0][1].concat(ng[1][1]).filter(function (x) { return x.ten !== 'Lịch tố tụng'; });
  return h('div', { className: 'tp-tile-grid tp-tile-grid-illo ph-svc hm-rec-grid hm9 hm8' }, tam.map(function (x) { return h(T.ServiceTile, { key: x.ten, illustration: x.illo, label: x.tile }); }),
    h('button', { key: 'all', type: 'button', className: 'tp-tile hm9-all' }, h('span', { className: 'hm9-folder', 'aria-hidden': 'true' }, ng[2][1].slice(0, 4).map(function (x) { return h(T.Illustration, { key: x.illo, name: x.illo }); })), h('span', null, 'Xem tất cả')));
}
function VkRows(all) {
  return h('ul', { className: 'vr' }, (all ? VK : VK.slice(0, 3)).map(function (x) {
    var p = x.han.split(' · '), coHan = x.han !== 'Không có thời hạn', ngay = coHan ? (p[1] || '').replace(/^hạn /, '') : ''; /* v499: "Hạn: dd/mm/yyyy" */
    return h('li', { key: x.t.title }, h('button', { type: 'button', className: 'vr-it', 'data-pt-go': x.go },
      h('span', { className: 'vr-han' }, h('small', null, coHan ? 'Hạn: ' : 'Không có', h('span', { className: 'tp-num' }, ngay)), h('b', { className: 'vka-han' + (coHan ? ' vka-han-' + x.muc : '') }, coHan ? p[0] : 'thời hạn')),
      h('span', { className: 'vr-tx' }, h('b', null, x.t.title), h('small', null, x.loai + ' · ', h('span', { className: 'tp-num' }, x.t.code)))));
  }));
}
function lcTag(e) { var l = LC_LOAI[e.loai]; return h('span', { className: 'lc-tag', style: { background: 'var(--tag-' + l[1] + '-bg)', color: 'var(--tag-' + l[1] + '-text)' } }, l[0]); }
function LichHome() {
  var thu = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'], co = LC_EV.map(function (e) { return e.d; }), e0 = LC_EV[0];
  return Blk('Lịch tố tụng', h(F, null,
    h('div', { className: 'lc2-w' }, LC_WEEK.map(function (d, i) {
      return h('span', { key: d, className: 'lc2-day' + (d === e0.d ? ' lc2-on' : '') + (d === 4 ? ' lc2-today' : '') }, h('small', null, thu[i]), h('b', { className: 'tp-num' }, d), h('i', { className: co.indexOf(d) >= 0 ? '' : 'lc2-no' }));
    })),
    h('button', { type: 'button', className: 'lc2-ev', 'data-pt-go': 'calPersonal' }, h('span', { className: 'lc2-time tp-num' }, e0.gio), h('span', { className: 'lc2-tx' }, h('b', null, e0.ten), h('small', null, e0.ht + ' · ' + e0.dd)))),
    { action: h(T.LinkArrow, { arrow: false }, 'Xem lịch đầy đủ'), cls: 'lc-blk' });
}
/* đối chiếu 3A.1 / 3A.2 (21/11/2026): Trang chủ theo thứ tự web – thẻ "Vụ án của tôi" (phần vuan, 4A.1) rồi thẻ "Hộp thư tống đạt", trước "Việc cần làm" */
function Home(all, o) {
  o = o || {};
  return h(Phone, { cls: 'ph-main' },
    HomeBg(),
    h(Body, { cls: 'tp-sheet ph-home-sheet' },
      h(T.BannerCarousel, { slides: [Object.assign({ imageSrc: HERO || undefined }, BANNER_HOME[0])] }),
      Blk('Theo dõi vụ án, vụ việc', h(RecList), { cls: 'hm-rec' }),
      /* v582 (người dùng 23/11): bỏ thẻ "Vụ án của tôi" (biểu đồ) và thẻ "Hộp thư tống đạt" (biểu đồ) khỏi Trang chủ */
      Blk('Việc cần làm', VkRows(all), { action: h(T.LinkArrow, { arrow: false }, all ? 'Thu gọn' : 'Xem tất cả'), cls: 'vr-blk' }),
      h(LichHome)),
    Nav('home'), all ? null : h(CkPopup));
}


/* v500: ô "Xem tất cả" – cùng khung ô vuông bo mềm như các ô khác, biểu tượng mũi tên sang phải màu đỏ (chọn phương án 2) */
function RecList() {
  var ng = hm9Nhom(), tam = ng[0][1].concat(ng[1][1]).filter(function (x) { return x.ten !== 'Lịch tố tụng'; });
  return h('div', { className: 'tp-tile-grid tp-tile-grid-illo ph-svc hm-rec-grid hm9 hm8' }, tam.map(function (x) { return h(T.ServiceTile, { key: x.ten, illustration: x.illo, label: x.tile }); }),
    h('button', { key: 'all', type: 'button', className: 'tp-tile hm9-all hm-xtc' }, h('span', { className: 'tp-illo-circle hm-xtc-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: 'arrowRight' })), h('span', null, 'Xem tất cả')));
}

/* v503: biểu tượng mục Dịch vụ trên thanh điều hướng – 4 ô vuông bo góc (chọn số 18), cùng nét với bộ biểu tượng */
var ICON_THEM = { gridRound: ['M6 4h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M16 4h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M6 14h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z', 'M16 14h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z'] };
var IconGoc = T.Icon;
T.Icon = function (p) {
  var d = ICON_THEM[p.name]; if (!d) return IconGoc(p);
  return h('svg', { className: 'tp-ico' + (p.className ? ' ' + p.className : ''), viewBox: '0 0 24 24', 'aria-hidden': 'true' }, d.map(function (x, i) { return h('path', { key: i, d: x }); }));
};
NAV = NAV.map(function (it) { return it.key === 'svc' ? Object.assign({}, it, { icon: 'gridRound' }) : it; });

/* v506: khối Lịch tố tụng ở Trang chủ – chạm ngày bất kỳ trong dải tuần để xem lịch của ngày đó (mỗi buổi một mục dòng thời gian); ngày không có lịch dùng câu rỗng của màn Lịch tố tụng.
   Sửa kèm: bỏ hàm lcNgay trùng tên thêm ở v498 (làm màn Lịch tố tụng hiện "Ngày 05" thay vì "Ngày 05/11/2026"). */
function LichHome() {
  var thu = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'], co = LC_EV.map(function (e) { return e.d; });
  var sel = React.useState(LC_EV[0].d), ds = LC_EV.filter(function (e) { return e.d === sel[0]; });
  return Blk('Lịch tố tụng', h(F, null,
    h('div', { className: 'lc2-w', role: 'radiogroup', 'aria-label': 'Chọn ngày' }, LC_WEEK.map(function (d, i) {
      var on = d === sel[0];
      return h('button', { key: d, type: 'button', role: 'radio', 'aria-checked': on, 'aria-label': thu[i] + ' ' + d + '/11' + (co.indexOf(d) >= 0 ? ', có lịch' : ''), className: 'lc2-day pt-chk' + (on ? ' lc2-on' : '') + (d === 4 ? ' lc2-today' : ''), onClick: function () { sel[1](d); } },
        h('small', null, thu[i]), h('b', { className: 'tp-num' }, d), h('i', { className: co.indexOf(d) >= 0 ? '' : 'lc2-no' }));
    })),
    ds.length ? ds.map(function (e) {
      return h('button', { key: e.id, type: 'button', className: 'lc2-ev', 'data-pt-go': 'calPersonal' }, h('span', { className: 'lc2-time tp-num' }, e.gio), h('span', { className: 'lc2-tx' }, h('b', null, e.ten), h('small', null, e.ht + ' · ' + e.dd)));
    }) : h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tìm thấy kết quả phù hợp' })),
    { action: h(T.LinkArrow, { arrow: false }, 'Xem lịch đầy đủ'), cls: 'lc-blk' });
}

/* v510: bảng Trạng thái hồ sơ (tab hành chính) theo kiểu bảng Sắp xếp – danh sách chọn một, chọn xong tự đóng, bỏ chân Nhập lại/Áp dụng */
KnHcLoc = function (p) {
  return h(LvSheet, { host: p.host, title: 'Trạng thái hồ sơ', onClose: p.onClose },
    h(LvRows, { label: 'Trạng thái hồ sơ', cur: p.tt || 'all', items: p.ttItems.map(function (x) { return { id: x.key, name: x.label, n: x.count }; }), onPick: p.onApply }));
};

/* v511: Khiếu nại, tố cáo hành chính – dữ liệu mẫu đủ 9 trạng thái (thứ tự theo bảng nhóm), mỗi trạng thái một màu nhãn riêng (lớp knst-<nhóm>) */
KNHC_NHOM = [['gnhap', 'Đơn đang soạn'], ['gerr', 'Gửi không thành công'], ['g0', 'Lưu theo dõi'], ['g1', 'Đã gửi — chờ tiếp nhận'],
  ['g2', 'Đang kiểm tra điều kiện thụ lý'], ['g3', 'Đang giải quyết'], ['g4', 'Chờ trả kết quả'], ['g5', 'Đã có kết quả'], ['g6', 'Không thụ lý']];
KNHC_DS.splice(1, 0,
  { ma: 'KN-2026-0016', loai: 'Khiếu nại', tom: 'Khiếu nại việc không cấp bản sao bản án', nhom: 'gerr', st: 'Gửi không thành công', gui: '28-10-2026', go: 'complaintDetail' },
  { ma: 'KN-2026-0014', loai: 'Khiếu nại', tom: 'Khiếu nại việc trả lại đơn yêu cầu cấp trích lục', nhom: 'g1', st: 'Đã gửi — chờ tiếp nhận', gui: '27-10-2026', go: 'complaintDetail' },
  { ma: 'TC-2026-0006', loai: 'Tố cáo', tom: 'Tố cáo hành vi gây phiền hà khi tiếp nhận hồ sơ', nhom: 'g2', st: 'Đang kiểm tra điều kiện thụ lý', gui: '25-10-2026', go: 'complaintDetailTc' });
KNHC_DS.splice(KNHC_DS.length - 2, 0,
  { ma: 'KN-2026-0010', loai: 'Khiếu nại', tom: 'Khiếu nại việc chậm giải quyết yêu cầu sao chụp tài liệu', nhom: 'g4', st: 'Chờ trả kết quả', gui: '15-10-2026', go: 'complaintDetail' });
KNHC_DS.push(
  { ma: 'KN-2026-0005', loai: 'Khiếu nại', tom: 'Khiếu nại việc thu phí cấp trích lục', nhom: 'g6', st: 'Không thụ lý', gui: '28-09-2026', go: 'complaintDetail' },
  { ma: 'KN-2026-0003', loai: 'Khiếu nại', tom: 'Khiếu nại việc hẹn trả kết quả không đúng ngày', nhom: 'g0', st: 'Lưu theo dõi', gui: '20-09-2026', go: 'complaintDetail' });
Object.assign(KNHC_TT_TEN, { 'KN-2026-0016': 'Hành vi hành chính của Tòa án', 'KN-2026-0014': 'Hành vi hành chính của Tòa án', 'TC-2026-0006': 'Hành vi vi phạm của cán bộ, công chức trong nhiệm vụ, công vụ',
  'KN-2026-0010': 'Hành vi hành chính của Tòa án', 'KN-2026-0005': 'Quyết định hành chính của Tòa án', 'KN-2026-0003': 'Hành vi hành chính của Tòa án' });
/* v576 (phiên fork 23/11 – tai-lieu/cau-tra-loi-don-chua-luu-kntc-2026-11-23.md, mục "Nhãn quá dài"): bỏ nhãn loại đơn ("Khiếu nại", "Tố cáo"…) trên thẻ,
   loại đơn ghi vào đầu dòng Thủ tục: "{Loại đơn} - {tên thủ tục, chữ đầu viết thường}"; hàng trên chỉ còn nhãn trạng thái và "Bảo vệ người tố cáo" (nếu có) */
function knhcThuTuc(c) {
  var tt = KNHC_TT_TEN[c.ma];
  if (!c.loai) return tt || '—';
  return tt ? c.loai + ' - ' + tt.charAt(0).toLowerCase() + tt.slice(1) : c.loai;
}
KnHcCard = function (p) {
  var c = p.c, nhap = c.nhom === 'gnhap';
  return h('li', { className: 'qd-c qc kn-c' }, h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': nhap ? 'Tiếp tục soạn đơn ' + c.ma : 'Xem chi tiết hồ sơ ' + c.ma, 'data-pt-go': c.go }),
    h('div', { className: 'qc-top' }, h('span', { className: 'tp-badge knst knst-' + c.nhom }, c.st),
      c.baoVe ? h('span', { className: 'knd-pill knd-pill-bv' }, 'Bảo vệ người tố cáo') : null),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, c.tom || (nhap ? 'Chưa nhập nội dung' : ''))),
    dsRows([['Mã tiếp nhận', h('span', { className: 'tp-num' }, c.ma)], nhap ? null : ['Tòa án tiếp nhận', COURT1], nhap ? null : ['Ngày gửi', c.gui], ['Thủ tục', knhcThuTuc(c)]]));
};

/* v512: bỏ hồ sơ Đề nghị rút đơn (nhóm grut, không có trong bảng 9 trạng thái) khỏi danh sách hành chính */
KNHC_DS = KNHC_DS.filter(function (c) { return c.nhom !== 'grut'; });

/* v513: thẻ hồ sơ khiếu nại, tố cáo hành chính – khối Việc cần làm theo trạng thái (cùng quy tắc nút ở Chi tiết hồ sơ v452) */
function knhcViec(c) {
  var tc = c.loai === 'Tố cáo';
  return c.nhom === 'gnhap' || c.nhom === 'gerr' ? [{ t: 'Sửa đơn', go: 'khc1', chinh: 1 }, { t: 'Gửi lại đơn', go: 'snack:Đã gửi lại đơn thành công.' }]
    : c.nhom === 'g3' ? [{ t: 'Gửi yêu cầu rút đơn', go: tc ? 'withdrawTc' : 'withdraw', chinh: 1 }]
    : c.nhom === 'g5' && tc ? [{ t: 'Cho ý kiến về dự thảo kết luận nội dung tố cáo', go: 'kpa1', chinh: 1 }, { t: 'Gửi đơn tố cáo tiếp', go: 'ktc1T' }] : [];
}
var KnHcCard0 = KnHcCard;
KnHcCard = function (p) {
  var v = knhcViec(p.c), el = KnHcCard0(p);
  if (!v.length) return el;
  /* nút cùng kiểu màn Chi tiết hồ sơ: T.Button size sm, rộng hết thẻ; việc chính màu đỏ (primary), việc còn lại viền (secondary) */
  return React.cloneElement(el, null, [].concat(el.props.children, h('div', { key: 'vk', className: 'qd-c-f knc-nut' },
    v.map(function (x) { return h(T.Button, { key: x.t, size: 'sm', block: true, variant: x.chinh ? 'primary' : 'secondary', 'data-pt-go': x.go }, x.t); }))));
};


/* v514: thẻ Đơn đang soạn chỉ còn nút Sửa đơn (bỏ Gửi lại đơn) */
var knhcViec0 = knhcViec;
knhcViec = function (c) { var v = knhcViec0(c); return c.nhom === 'gnhap' ? v.filter(function (x) { return x.t !== 'Gửi lại đơn'; }) : v; };

/* v515: nút hành động theo web develop 19/11 (coreapi KntcHanhChinhService.toDetail → HanhDong; web chi-tiet.tsx), dùng chung cho thẻ danh sách và Chi tiết hồ sơ.
   Thứ tự như web: Rút · Khiếu nại lần hai · Ý kiến dự thảo · Tố cáo tiếp · Sửa · Gửi lại. Đỏ đặc: Rút, Sửa; còn lại viền.
   - Rút: nhóm g1–g4 (đang xử lý), đã có hồ sơ VNPT, chưa có yêu cầu rút đang chờ (dữ liệu mẫu: g2, g3, g4; g1 mẫu chưa có hồ sơ VNPT).
   - Khiếu nại lần hai: đơn khiếu nại lần đầu có văn bản kết quả (30 ngày từ ngày nhận) hoặc quá hạn giải quyết khi đang xử lý; nhãn kèm "· còn N ngày".
   - Ý kiến dự thảo: nhóm g5 (mọi loại đơn). - Tố cáo tiếp: đơn tố cáo có kết luận hoặc quá hạn khi đang xử lý.
   - Sửa đơn: Gửi không thành công, chưa có hồ sơ VNPT. - Gửi lại đơn: Gửi không thành công (hoặc chờ gửi lại).
   - Đơn đang soạn: không nút (bấm thẻ mở lại soạn đơn); Lưu theo dõi, Không thụ lý: không nút. */
function knhcNhomTen(ten) { var x = KNHC_NHOM.filter(function (g) { return g[1] === ten; })[0]; return x ? x[0] : ''; }
function knhcNutWeb(c) {
  var n = c.nhom, tc = /^Tố cáo/.test(c.loai || ''), kn = !tc, dangXl = /^g[1-4]$/.test(n), kq = n === 'g5', qua = c.han === 'qua' && dangXl, vnpt = n !== 'g1' && n !== 'gerr' && n !== 'gnhap';
  var r = [];
  if (dangXl && vnpt) r.push(['Gửi yêu cầu rút đơn', tc ? 'withdrawTc' : 'withdraw', 1]);
  if (kn && vnpt && (kq || qua)) r.push(['Khiếu nại lần hai', 'knSecond']);
  if (kq) r.push(['Cho ý kiến về dự thảo kết luận nội dung tố cáo', 'kpa1']);
  if (tc && vnpt && (kq || qua)) r.push(['Gửi đơn tố cáo tiếp', 'ktc1T']);
  if (n === 'gerr') r.push(['Sửa đơn', 'khc1', 1], ['Gửi lại đơn', 'snack:Đã gửi lại đơn thành công.']);
  return r;
}
knhcViec = function (c) { return knhcNutWeb(c).map(function (x) { return { t: x[0], go: x[1], chinh: x[2] }; }); };


/* v516: Đơn đang soạn có nút Sửa đơn (đỏ) – mở lại soạn đơn (người dùng yêu cầu; web không có nút, bấm thẻ mở soạn đơn) */
var knhcNutWeb0 = knhcNutWeb;
knhcNutWeb = function (c) { return c.nhom === 'gnhap' ? [['Sửa đơn', 'khc3', 1]] : knhcNutWeb0(c); };

/* v517: bấm thẻ hồ sơ khiếu nại, tố cáo hành chính → màn Chi tiết hồ sơ lấy đúng dữ liệu thẻ đó (mã, tiêu đề, trạng thái + màu nhãn, loại đơn, ngày gửi, thủ tục, nút, tiến trình, văn bản kết quả) */
var KNHC_TIEN = { gerr: 0, g1: 1, g2: 2, g3: 3, g4: 4, g5: 5, g6: 2, g0: 3 };
function knhcBuoc(c) {
  var w = c.loai === 'Tố cáo' ? 'tố cáo' : 'khiếu nại', n = KNHC_TIEN[c.nhom] || 0;
  var ds = [['Gửi đơn ' + w + ' trực tuyến', 'Đơn đã được ký số và gửi đến Tòa án.', c.gui], ['Tòa án tiếp nhận đơn', 'Đơn đã được tiếp nhận, đang chờ xem xét.', ''],
    ['Kiểm tra điều kiện thụ lý', 'Tòa án kiểm tra điều kiện thụ lý đơn.', ''], ['Giải quyết ' + w, 'Người giải quyết xác minh nội dung, thu thập tài liệu.', ''],
    ['Chờ trả kết quả', 'Đang chuẩn bị văn bản trả kết quả cho bạn.', ''], [w === 'tố cáo' ? 'Kết luận nội dung tố cáo' : 'Quyết định giải quyết khiếu nại', 'Kết quả giải quyết đã được ban hành.', '']];
  if (c.nhom === 'gerr') return [['Gửi không thành công', 'Đơn chưa gửi được đến Tòa án. Bạn sửa đơn hoặc gửi lại đơn.', c.gui, 'current']];
  var r = ds.slice(0, n + 1).map(function (x, i) { return [x[0], x[1], x[2], i < n ? 'done' : 'current']; });
  if (c.nhom === 'g6') r.push(['Không thụ lý', 'Tòa án không thụ lý đơn. Xem văn bản thông báo trong hồ sơ.', '', 'current']);
  if (c.nhom === 'g0') r.push(['Lưu theo dõi', 'Đơn được lưu theo dõi, không giải quyết.', '', 'current']);
  if (c.nhom === 'g6' || c.nhom === 'g0') r[r.length - 2][3] = 'done';
  if (c.nhom === 'g5') r[r.length - 1][3] = 'done';
  return r.reverse();
}
var KnHcDetail0 = KnHcDetail;
KnHcDetail = function (p) {
  var c = window.__knhcMa && KNHC_DS.filter(function (x) { return x.ma === window.__knhcMa; })[0];
  if (!c || p.grp || p.kpa || p.k === 'rut') return h(KnHcDetail0, p);
  var tc = c.loai === 'Tố cáo';
  var hs = { ma: c.ma, loai: c.loai, tom: c.tom, chu: 'Hoàng Dương', gui: c.gui, grp: [c.st, 'neutral'], nhom: c.nhom, baoVe: !!c.baoVe };
  return h(KnHcDetail2, { p: p, k: tc ? 'tc' : 'kn', tc: tc, word: tc ? 'tố cáo' : 'khiếu nại', buoc: knhcBuoc(c), hs: hs });
};
var KnHcCard1 = KnHcCard;
KnHcCard = function (p) {
  var el = KnHcCard1(p), ma = p.c.ma, kids = [].concat(el.props.children);
  kids[0] = React.cloneElement(kids[0], { onClickCapture: function () { window.__knhcMa = ma; }, 'data-pt-go': p.c.nhom === 'gnhap' ? p.c.go : 'complaintDetail' });
  return React.cloneElement(el, null, kids);
};

/* v518: mẫu khối trống thống nhất – danh sách chưa có dữ liệu hoặc tìm/lọc không có kết quả: 1 biểu tượng tam giác cảnh báo + 1 dòng "Không tìm thấy kết quả phù hợp"
   (như màn lỗi tải), bỏ câu phụ và nút. Không áp cho lỗi tải, không mở được, không tìm thấy hồ sơ/đơn ở màn chi tiết, chặn quyền/giai đoạn/hạn. */
var RONG_DS = ['Bạn chưa có đơn nào', 'Bạn chưa có hồ sơ nào', 'Chưa có hồ sơ nào đang mở', 'Chưa có hồ sơ', '[Không có hồ sơ chờ đánh giá]', '[Bạn chưa gửi đánh giá nào]',
  'Bạn chưa có vụ án nào', 'Không có hồ sơ nào trong mục này', 'Chưa có yêu cầu nào', 'Chưa có tiến trình', 'Chưa có văn bản tống đạt', 'Bạn chưa gửi góp ý nào về câu hỏi thường gặp.',
  'Bạn chưa có đăng ký người bảo vệ nào', 'Chưa có kết quả đánh giá được công bố', 'Không có lần ký nào trong khoảng đã chọn.', 'Hiện bạn không có bản án, quyết định nào đã có hiệu lực pháp luật.'];
function laRong(t) {
  if (typeof t !== 'string') return false;
  return RONG_DS.indexOf(t) >= 0 || /^Chưa có chứng thư nào/.test(t) || /phù hợp|nào chờ đánh giá|chưa gửi đánh giá/.test(t);
}
var ES0 = T.EmptyState, IbEmpty1 = IbEmpty;
function KhoiRong() { return h(ES0, { variant: 'center', icon: 'alert', title: 'Không tìm thấy kết quả phù hợp' }); }
IbEmpty = function (p) { return (p.goc ? laKhongKhop(p.title) : laRong(p.title)) ? KhoiRong() : h(IbEmpty1, p); };
T.EmptyState = function (p) { return (p.goc ? laKhongKhop(p.title || p.text) : laRong(p.title || p.text)) ? KhoiRong() : h(ES0, p); };
LcRong = function () { return KhoiRong(); };

/* v520: Chi tiết hồ sơ khiếu nại, tố cáo hành chính – tab "Yêu cầu rút đơn" (chỉ có khi hồ sơ có yêu cầu rút), nội dung như khối Yêu cầu rút đơn của web chi-tiet.tsx:
   Mã đơn rút · Trạng thái · Người yêu cầu · Hình thức · Ngày gửi · Lý do · nút Xem đơn rút đã ký. Có yêu cầu rút đang chờ thì không hiện nút Gửi yêu cầu rút đơn (web rutDangCho). */
function KnRutTab(hs) {
  var y = hs.rutYc;
  return FCard('Yêu cầu rút đơn', h(F, null, RvKV([['Mã đơn rút', h('span', { className: 'tp-num' }, y.ma)], ['Trạng thái', y.tt], ['Người yêu cầu', y.nguoi], ['Hình thức', y.ht], ['Ngày gửi', y.ngay], ['Lý do', y.lyDo]]),
    h(T.Button, { size: 'sm', variant: 'secondary', icon: 'eye', 'data-pt-go': 'attachment', onClickCapture: function () { window.__ibFile = 'don-rut-' + y.ma + '.pdf'; } }, 'Xem đơn rút đã ký')), true);
}
KNHC_DS.forEach(function (c) { if (c.ma === 'KN-2026-0010') c.rutYc = { ma: '[Mã đơn rút]', tt: 'Đã gửi, chờ cơ quan giải quyết phản hồi', nguoi: 'Hoàng Dương', ht: 'Rút toàn bộ', ngay: '17-11-2026', lyDo: 'Vấn đề đã được Tòa án khắc phục, tôi không còn nhu cầu giải quyết.' }; });
var knhcNutWeb1 = knhcNutWeb;
knhcNutWeb = function (c) { var r = knhcNutWeb1(c); var x = c.rutYc || (KNHC_DS.filter(function (y) { return y.ma === c.ma; })[0] || {}).rutYc; return x ? r.filter(function (b) { return b[0] !== 'Gửi yêu cầu rút đơn'; }) : r; };
var KnHcDetail1 = KnHcDetail;
KnHcDetail = function (p) {
  var c = window.__knhcMa && KNHC_DS.filter(function (x) { return x.ma === window.__knhcMa; })[0];
  if (!c || !c.rutYc || p.grp || p.kpa || p.k === 'rut') return h(KnHcDetail1, p);
  var tc = c.loai === 'Tố cáo';
  return h(KnHcDetail2, { p: p, k: tc ? 'tc' : 'kn', tc: tc, word: tc ? 'tố cáo' : 'khiếu nại', buoc: knhcBuoc(c), hs: { ma: c.ma, loai: c.loai, tom: c.tom, chu: 'Hoàng Dương', gui: c.gui, grp: [c.st, 'neutral'], nhom: c.nhom, baoVe: !!c.baoVe, rutYc: c.rutYc } });
};

/* v521: header tên dài + nút bên phải – phương án A */
function HdPa() { return 'A'; }
function HdCls() { var m = HdPa(); return m ? ' qh-pa' + m : ''; }
function HdNut(go, label) {
  var m = HdPa();
  if (m === 'A') return h('button', { type: 'button', className: 'qh-icnut', 'aria-label': label, title: label, 'data-pt-go': go }, h(T.Icon, { name: 'plus' }));
  if (m === 'C') return h(T.Button, { className: 'qh-nop qh-fab', icon: 'plus', 'data-pt-go': go }, label);
  return h(T.Button, { size: 'sm', className: 'qh-nop', 'data-pt-go': go }, label);
}

/* v522: nút (+) thanh điều hướng – đủ 10 việc tạo mới, chia nhóm (kiểu A) */
var NW_NHOM = [['Nộp đơn', [['nopDon', 'Đơn khởi kiện', 'K'], ['yeuCau', 'Đơn yêu cầu việc dân sự', 'draftAsk'], ['phaSan', 'Đơn yêu cầu phá sản, phục hồi', 'draftAsk'],
    ['xemXet', 'Đơn giám đốc thẩm, tái thẩm', 'gx1']]],
  ['Khiếu nại, tố cáo', [['khieuNai', 'Khiếu nại, tố cáo', 'choose']]],
  ['Yêu cầu khác', [['trichLuc', 'Cấp trích lục, bản sao', 'tl1'], ['nguoiBaoVe', 'Đăng ký người bảo vệ', 'bvd1']]]];
function nwGo(x) { return x[2] === 'K' ? nwDich('nopDon') : x[2]; }
function NwMode() { return 'A'; }
function NwPanel(dong) {
  var m = NwMode();
  if (m === 'A') { var tat = [].concat.apply([], NW_NHOM.map(function (g) { return g[1]; }));
    return h('div', { className: 'nw-sh', role: 'menu', 'aria-label': 'Tạo mới' }, h('div', { className: 'nw-sh-h' }, h('b', null, 'Tạo mới')),
      h('div', { className: 'nw-sh-l' }, tat.map(function (x) {
        return h('button', { key: x[0] + x[1], type: 'button', role: 'menuitem', className: 'nw-sh-it', 'data-pt-go': nwGo(x) }, h('span', { className: 'tp-illo-circle nw-sh-ic' }, h(T.Illustration, { name: x[0] })), h('span', null, x[1]), h(T.Icon, { name: 'chevronRight' }));
      }))); }
  if (m === 'B') return h('div', { className: 'nw-gr', role: 'menu', 'aria-label': 'Tạo mới' }, NW_NHOM.map(function (g) {
    return h('div', { key: g[0], className: 'nw-gr-g' }, h('p', { className: 'nw-gr-gh' }, g[0]), h('div', { className: 'nw-gr-l' }, g[1].map(function (x) {
      return h('button', { key: x[0] + x[1], type: 'button', role: 'menuitem', className: 'nw-gr-it', 'data-pt-go': nwGo(x) }, h('span', { className: 'tp-illo-circle nw-gr-ic' }, h(T.Illustration, { name: x[0] })), h('span', null, x[1]));
    })));
  }));
  var all = [].concat.apply([], NW_NHOM.map(function (g) { return g[1]; }));
  return h('ul', { className: 'nw-dial nw-dial-c', role: 'menu', 'aria-label': 'Tạo mới' }, all.map(function (x) {
    return h('li', { key: x[0] + x[1], role: 'none' }, h('button', { type: 'button', role: 'menuitem', className: 'nw-dial-it', 'data-pt-go': nwGo(x) }, h('span', { className: 'tp-illo-circle nw-dial-ic' }, h(T.Illustration, { name: x[0] })), h('span', null, x[1])));
  }));
}
NavB = function (p) {
  var mo = React.useState(!!window.__nwMo), n = ibSoChuaDoc(), dong = function () { mo[1](false); };
  var ds = NAV.map(function (it) {
    var on = it.key === p.active, bd = it.key === 'inbox' && n > 0 ? (n > 99 ? '99+' : String(n)) : null;
    return h('button', { key: it.key, type: 'button', className: 'tp-nav-item' + (on ? ' tp-nav-on' : ''), 'aria-current': on ? 'page' : undefined, 'aria-describedby': bd ? 'ib-nav-n' : undefined },
      h('span', { className: 'ib-nav-ic', 'data-n': bd || undefined }, h(T.Icon, { name: it.icon })), it.label);
  });
  ds.splice(2, 0, h('button', { key: 'nw', type: 'button', className: 'tp-nav-main nw-main pt-chk' + (mo[0] ? ' nw-on' : ''), 'aria-label': mo[0] ? 'Đóng' : 'Tạo mới', 'aria-expanded': mo[0], 'aria-haspopup': 'menu', onClick: function () { mo[1](!mo[0]); } },
    h('span', { className: 'tp-nav-fab' }, h(T.Icon, { name: mo[0] ? 'x' : 'plus' }))));
  return h('div', { className: 'ph-nav nw-nav' }, h('nav', { className: 'tp-nav tp-nav2', 'aria-label': 'Điều hướng chính' }, ds),
    n > 0 ? h('span', { id: 'ib-nav-n', className: 'pt-sr' }, n + ' văn bản chưa đọc') : null,
    mo[0] ? h('div', { className: 'nw-ov' }, h('div', { className: 'ph-scrim nw-scrim pt-chk', 'aria-hidden': 'true', onClick: dong }), NwPanel(dong)) : null);
};

/* v524: khối Lịch tố tụng ở Trang chủ – bỏ nhãn loại sự kiện (Phiên tòa, Phiên họp…) ở từng sự kiện; tên sự kiện đã nêu loại */

/* v525: header Danh sách đơn – bỏ dòng nhỏ "Danh sách đơn và tiến trình"; nút tròn viền riêng cạnh nút (+) để đổi loại đơn (biểu tượng menu) */
var QD_LQ_ILLO = { khoikien: 'nopDon', viecdansu: 'yeuCau', phasan: 'phaSan', khangcao: 'banAn', gdt: 'xemXet', phanto: 'phanTo' };
function QdEi() { return 'menu'; }
function QdSelIn(ten, k) {
  var ei = QdEi();
  var inner = ei === 'illo' ? h(T.Illustration, { name: QD_LQ_ILLO[k] || 'nopDon' })
    : ei === 'filechev' ? h(F, null, h(T.Icon, { name: 'file' }), h('span', { className: 'qh-lq-badge' }, h(T.Icon, { name: 'chevronDown' })))
    : h(T.Icon, { name: ei });
  return h('span', null, h('b', null, ten), h('i', { className: 'qh-lq-ic qh-lq-ei-' + ei, 'aria-hidden': 'true' }, inner));
}

/* v525: Danh sách đơn – bảng đổi loại đơn giống bảng "Danh sách đơn và tiến trình" ở Trang chủ (LoaiDonList): hình minh họa, tên loại đơn, số đơn, mũi tên; chọn thì đổi loại tại chỗ */
function QdLoaiList(kinds, pick) {
  return h('div', { className: 'rn-list ld-list', role: 'list' }, kinds.map(function (k) {
    return h('button', { key: k[0], type: 'button', className: 'rn-row ld-row', onClick: function () { pick(k[0]); } },
      h('span', { className: 'tp-illo-circle rn-row-ic' }, h(T.Illustration, { name: LD_ILLO[k[0]] })),
      h('span', { className: 'rn-row-tx' }, h('b', null, k[1])),
      h('span', { className: 'qk-cnt tp-num' }, qdDem(k[0])), h(T.Icon, { name: 'chevronRight' }));
  }));
}

/* v526: thẻ hồ sơ khiếu nại, tố cáo hành chính – bỏ khối nút hành động (người dùng yêu cầu). Bấm thẻ vẫn mở Chi tiết hồ sơ (đơn đang soạn: mở lại soạn đơn);
   nút hành động chỉ còn ở màn Chi tiết hồ sơ (knhcNutWeb). Khối "Đơn chưa lưu" đầu danh sách giữ nút Tiếp tục. */
knhcViec = function () { return []; };

/* v527: Trang chủ – khối Việc cần làm (chọn I): giữ đủ thông tin; tên việc + "loại · mã hồ sơ" bên trái, "Hạn: dd/mm/yyyy" + "Còn n ngày" (tô theo mức hạn) căn phải */
VkRows = function (all) {
  return h('ul', { className: 'vr vr-I' }, (all ? VK : VK.slice(0, 3)).map(function (x) {
    var p = x.han.split(' · '), coHan = x.han !== 'Không có thời hạn', ngay = coHan ? (p[1] || '').replace(/^hạn /, '') : '', con = coHan ? p[0] : 'Không có thời hạn';
    return h('li', { key: x.t.title }, h('button', { type: 'button', className: 'vr-it', 'data-pt-go': x.go, 'aria-label': x.btn + ': ' + x.t.title + ', ' + x.loai + ', ' + x.t.code + (coHan ? ', hạn ' + ngay + ', ' + con.toLowerCase() : ', không có thời hạn') },
      h('span', { className: 'vr-tx' }, h('b', null, x.t.title), h('small', null, x.loai, ' · ', h('span', { className: 'tp-num' }, x.t.code))),
      h('span', { className: 'vrI-r' }, coHan ? h('small', null, 'Hạn: ', h('span', { className: 'tp-num' }, ngay)) : null, h('b', { className: 'vka-han' + (coHan ? ' vka-han-' + x.muc : '') }, con))));
  }));
};

/* v529: Trang chủ – liên kết đầu khối Việc cần làm ("Xem tất cả" / "Thu gọn") và Lịch tố tụng ("Xem lịch đầy đủ") thành nút tròn chỉ biểu tượng, nền đỏ nhạt (chọn B):
   mũi tên sang phải; "Thu gọn" là mũi tên xuống xoay lên. Chữ cũ giữ làm nhãn đọc màn hình (aria-label) nên luật bấm theo nhãn vẫn dẫn đúng màn */
var Blk0x = Blk;
Blk = function (title, children, o) {
  var a = o && o.action;
  if (a && a.type === T.LinkArrow && (title === 'Việc cần làm' || title === 'Lịch tố tụng')) {
    var txt = a.props.children, thu = txt === 'Thu gọn';
    o = Object.assign({}, o, { action: h(T.IconButton, { icon: thu ? 'chevronDown' : 'arrowRight', label: txt, className: 'xa-ib' + (thu ? ' xa-up' : '') }) });
  }
  return Blk0x(title, children, o);
};

/* v530: Trang chủ – ô "Xem tất cả" ở lưới Theo dõi vụ án, vụ việc: biểu tượng ba chấm ngang (⋯) màu đỏ thay mũi tên (chọn C).
   Bộ biểu tượng design system chưa có ba chấm nên dựng bằng 3 chấm tròn 6px màu brand-800. */
RecList = function () {
  var ng = hm9Nhom(), tam = ng[0][1].concat(ng[1][1]).filter(function (x) { return x.ten !== 'Lịch tố tụng'; });
  return h('div', { className: 'tp-tile-grid tp-tile-grid-illo ph-svc hm-rec-grid hm9 hm8' }, tam.map(function (x) { return h(T.ServiceTile, { key: x.ten, illustration: x.illo, label: x.tile }); }),
    h('button', { key: 'all', type: 'button', className: 'tp-tile hm9-all hm-xtc' }, h('span', { className: 'tp-illo-circle hm-xtc-ic', 'aria-hidden': 'true' }, h('span', { className: 'xt-dots' }, h('i'), h('i'), h('i'))), h('span', null, 'Xem tất cả')));
};

/* v532: rà soát UX (APP-6) – vùng chạm tối thiểu 44×44px cho mọi nút nhỏ trong khung điện thoại, KHÔNG đổi hình nút:
   gắn lớp hit44 (vùng chạm vô hình bằng ::after) hoặc hit44b (bằng ::before khi ::after đã dùng); nút đang position static thì thêm hit44r làm mốc.
   Bỏ qua liên kết nằm trong câu chữ và nút có overflow khác visible (vùng chạm sẽ bị cắt). Quét lại sau mỗi lần màn vẽ lại. */
(function () {
  var hen = 0, SEL = '.pt-phone .ph button, .pt-phone .ph a[href], .pt-phone .ph [role="button"], .pt-phone .ph [role="tab"]';
  function rong(c) { return !c || c === 'none' || c === 'normal'; }
  function quet() {
    hen = 0;
    document.querySelectorAll(SEL).forEach(function (el) {
      if (el.classList.contains('hit44') || el.classList.contains('hit44b')) return;
      var r = el.getBoundingClientRect(); if (!r.width || !r.height || (r.width >= 44 && r.height >= 44)) return;
      var cs = getComputedStyle(el); if (cs.display === 'inline' || cs.overflowX !== 'visible' || cs.overflowY !== 'visible') return;
      if (rong(getComputedStyle(el, '::after').content)) el.classList.add('hit44');
      else if (rong(getComputedStyle(el, '::before').content)) el.classList.add('hit44b');
      else return;
      if (cs.position === 'static') el.classList.add('hit44r');
    });
  }
  new MutationObserver(function () { if (!hen) hen = requestAnimationFrame(quet); })
    .observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  if (document.readyState !== 'loading') quet(); else document.addEventListener('DOMContentLoaded', quet);
})();

/* v534: rà soát UX (UX-35) – hộp thoại xác nhận dùng chung cho thao tác không hoàn tác ngay trong màn (không chuyển màn); nút xử lý tại chỗ mang lớp xn-l */
function XnDlg(p) {
  var anchor = React.useRef(null), host = useHost(anchor);
  return h(F, null, h('span', { ref: anchor, hidden: true }), host ? ReactDOM.createPortal(h(T.Dialog, { variant: 'center', inline: true, open: true, className: 'qd-dlg', title: p.title, description: p.text,
    footer: h(F, null, h(T.Button, { variant: 'secondary', className: 'xn-l', onClick: p.onKhong }, p.cancel || 'Không'), h(T.Button, { variant: 'primary', className: 'xn-l', onClick: p.onOk, 'data-pt-go': p.go }, p.ok)) }), host) : null);
}

/* ===== v535: rà soát UI (Khiếu nại tố cáo sheet 1) – case 1.8 / 1.18: cuộn tới cuối danh sách thì tải thêm 10 hồ sơ (như Hộp thư tống đạt);
   dữ liệu mẫu nhân thêm hồ sơ đã gửi (mã nối số thứ tự) để danh sách có hơn 10 hồ sơ. Case 1.14: ô tìm chỉ lọc khi nhấn Enter hoặc rời ô (cả hai màn). ===== */
function knThem(ds, tong) {
  var goc = ds.filter(function (c) { return !c.nhap && c.nhom !== 'gnhap' && c.gui !== 'dang' && c.gui !== 'loi'; }), kq = ds.slice(), i = 0;
  if (!goc.length) return kq;
  /* v577 (người dùng 23/11 "sửa luôn"): mã hồ sơ nhân thêm không trùng nhau, không trùng mã có sẵn – trước đây số = số gốc + 100 + thứ tự nên hai hồ sơ gốc khác nhau có thể ra cùng mã (vd. KN-2026-0115 hai lần); trùng thì tăng tiếp tới mã chưa dùng */
  var daDung = {}; ds.forEach(function (x) { daDung[x.ma] = 1; });
  function maMoi(goc0, cong) { var m = /\d+$/.exec(goc0); return m ? goc0.slice(0, m.index) + String(+m[0] + cong).padStart(m[0].length, '0') : goc0 + '-' + cong; }
  while (kq.length < tong) { var c = goc[i % goc.length], cong = 100 + i, ma = maMoi(c.ma, cong);
    while (daDung[ma]) { cong++; ma = maMoi(c.ma, cong); }
    daDung[ma] = 1;
    if (typeof KNTT_THEM !== 'undefined' && KNTT_THEM[c.ma]) KNTT_THEM[ma] = KNTT_THEM[c.ma];
    if (typeof KNHC_TT_TEN !== 'undefined' && KNHC_TT_TEN[c.ma]) KNHC_TT_TEN[ma] = KNHC_TT_TEN[c.ma]; /* v576: hồ sơ nhân thêm mang theo tên thủ tục của hồ sơ gốc (trước hiện "—") */
    kq.push(Object.assign({}, c, { ma: ma })); i++; }
  return kq;
}
function KnMore(p) {
  var end = React.useRef(null), on = React.useRef(p.onMore); on.current = p.onMore;
  React.useEffect(function () { var el = end.current; if (!el || typeof IntersectionObserver === 'undefined') return;
    var t = null, ob = new IntersectionObserver(function (e) { if (e[0].isIntersecting && !t) t = setTimeout(function () { t = null; on.current(); }, 700); });
    ob.observe(el); return function () { ob.disconnect(); clearTimeout(t); }; }, []);
  return h('li', { ref: end, className: 'ph-loadmore ib-more', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), h('span', null, 'Đang tải thêm hồ sơ…'));
}

/* ===== Đối chiếu web – prototype (demo 21/11/2026), phần dùng chung ===== */
/* người dùng 21/11 (câu 1A.2, áp chung): tìm/lọc không có kết quả → khối trống chung "Không tìm thấy kết quả phù hợp" */
function laKhongKhop(t) { return typeof t === 'string' && /phù hợp|theo bộ lọc này|trong khoảng thời gian này/.test(t); }
/* 1G.2 áp chung (demo 21/11): khối "Ký số" không hiện trạng thái Đã ký số / Chưa ký số ở tiêu đề – nhãn "Đã ký" chỉ ở dòng người ký và từng tệp */
var FCard_goc = FCard;
FCard = function (title, children, open, status) { return FCard_goc(title, children, open, /ký số$/i.test(title) ? undefined : status); };
/* Quy tắc chung (người dùng 21/11): chữ gợi ý theo tiêu đề – gõ bàn phím "Nhập <tiêu đề>", chọn trong danh sách "Chọn <tiêu đề>" (kể cả nhãn dạng câu hỏi).
   Giữ nguyên: ô tìm kiếm (icon search / nhãn "Tìm…"), ô ngày (dd-mm-yyyy), ô mật khẩu, ô không có nhãn. */
function goiYTheoTieuDe(p) {
  if (p && p.goiYGiu) return Object.assign({}, p, { goiYGiu: undefined }); /* v541: ô địa chỉ giữ chữ gợi ý riêng (Nhập địa chỉ chi tiết) */
  if (!p || typeof p.label !== 'string' || !p.label.trim()) return p;
  var lb = p.label.replace(/\*/g, '').replace(/\s*\((nếu có|không bắt buộc)\)\s*$/i, '').trim();
  if (p.icon === 'search' || /^Tìm/i.test(lb) || p.type === 'password' || /dd-mm-yyyy/i.test(p.placeholder || '')) return p;
  var c2 = lb.charAt(1), dau = c2 && c2 === c2.toLowerCase() ? lb.charAt(0).toLowerCase() + lb.slice(1) : lb;
  return Object.assign({}, p, { placeholder: 'Nhập ' + dau.replace(/[?:]\s*$/, '') });
}
var TextField_goc = T.TextField;
T.TextField = function (p) { return h(TextField_goc, goiYTheoTieuDe(p)); };

function chonTheoTieuDe(p) {
  if (p && p.goiYGiu) return Object.assign({}, p, { goiYGiu: undefined }); /* v541: ô địa chỉ giữ "Chọn Tỉnh/TP", "Chọn Phường/Xã" */
  if (!p || typeof p.label !== 'string' || !p.label.trim() || /trước/.test(p.placeholder || '')) return p; /* giữ "Chọn tỉnh trước"… */
  var lb = p.label.replace(/\*/g, '').replace(/\s*\((nếu có|không bắt buộc)\)\s*$/i, '').trim(), c2 = lb.charAt(1);
  return Object.assign({}, p, { placeholder: 'Chọn ' + (c2 && c2 === c2.toLowerCase() ? lb.charAt(0).toLowerCase() + lb.slice(1) : lb).replace(/[?:]\s*$/, '') });
}
var SelectField_goc = T.SelectField;
T.SelectField = function (p) { return h(SelectField_goc, chonTheoTieuDe(p)); };

/* demo 21/11 (2A.2 – người dùng chê "trông gớm"): dòng chức năng trong khung viền (mẫu B4 đã chọn ở Chi tiết vụ án)
   rows: [{ icon, t, sub, subTone: 'warning'|'danger', go, cap }] */
function KhungDong(rows) {
  return h('div', { className: 'va-actl va-actl-the kd' }, rows.map(function (r) {
    return h('button', { key: r.t, type: 'button', className: 'va-actl-it', 'data-pt-go': r.go, onClickCapture: r.cap },
      h('span', { className: 'va-actl-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: r.icon })),
      h('span', { className: 'va-actl-tx' }, r.t, r.sub ? h('small', { className: 'kd-sub' + (r.subTone ? ' kd-' + r.subTone : '') }, r.sub) : null), h(T.Icon, { name: 'chevronRight' }));
  }));
}
/* khối việc: tên + hạn, nút trải ngang ở dưới (không ép nút bên phải) */
function KhoiViec(o) {
  return h('section', { className: 'kv kv-' + (o.tone || 'warning') }, h('b', { className: 'kv-t' }, o.t), o.han ? h('small', { className: 'kv-han' }, o.han, o.con ? h('strong', null, ' · ' + o.con) : null) : null,
    o.note ? h('p', { className: 'kv-note' }, o.note) : null, o.btns ? h('div', { className: o.btns.length > 1 ? 'ph-2btn kv-btns' : 'kv-btns' }, o.btns) : null);
}
/* Quy tắc chung (người dùng 21/11, câu 2B.3): bảng từ đáy có ô tìm – tìm không ra kết quả thì KHÔNG đổi chiều cao bảng.
   Khi bảng mở, ghi lại chiều cao ban đầu làm chiều cao tối thiểu. */
(function () {
  if (typeof MutationObserver === 'undefined' || typeof document === 'undefined') return;
  function khoa(el) { if (el.__khoaCao || !el.querySelector('input')) return; el.__khoaCao = 1; requestAnimationFrame(function () { el.style.minHeight = el.offsetHeight + 'px'; }); }
  new MutationObserver(function (ms) { ms.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType !== 1) return;
    if (n.matches && n.matches('.tp-dlg-sheet')) khoa(n); if (n.querySelectorAll) n.querySelectorAll('.tp-dlg-sheet').forEach(khoa); }); }); })
    .observe(document.documentElement, { childList: true, subtree: true });
})();
/* Người dùng 21/11 (2B.3): bảng chọn từ đáy tìm không ra → khối trống chung "Không tìm thấy kết quả phù hợp" (thay "Không có mục khớp «…»."), áp mọi bảng chọn có ô tìm */
(function () {
  var hGoc = h;
  h = function (t, p) {
    if (t === 'p' && p && p.className === 'ph-lv-empty') return hGoc('div', { className: 'ph-lv-empty2' }, KhoiRong());
    return hGoc.apply(null, arguments);
  };
})();

/* ===== Đối chiếu web – prototype (demo 21/11/2026), Đợt 2 – Nghĩa vụ tài chính ===== */
/* dữ liệu: khoản gắn đúng vụ án / đơn (2A.2), khoản có văn bản tống đạt (2A.3) */
(function () {
  NV[0].vuAn = 'DS-2026-0018'; NV[1].vuAn = 'DS-2026-0012'; NV[2].don = 'DS-2026-0021'; NV[2].mien = 1; NV[3].vuAn = 'DS-2026-0018';
  NV[3].ib = 9; /* thư "Thông báo nộp tiền" mẫu (IB[9]) là văn bản tống đạt của khoản TB-2026-0030 */
})();
function nvNgay(s) { var m = /^(\d{2})-(\d{2})-(\d{4})/.exec(s || ''); return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null; }
/* 2B.3: lọc Ngày nộp – ngày so là ngày nộp / ngày miễn; khoản không có ngày luôn giữ; "hôm nay" mẫu là IB_TODAY (02-11-2026) */
function nvTrongKy(k, ky) {
  if (!ky || ky === 'all') return true; var d = nvNgay(k.ngay); if (!d) return true;
  if (ky === '90' || ky === '365') return (IB_TODAY - d) / 86400000 <= +ky;
  if (ky.charAt(0) === 'y') return d.getFullYear() === +ky.slice(1);
  return true;
}
/* 2A.3: khoản nộp thay – "Người phải nộp" chỉ hiện số định danh */
function nvSoDd(k) { var s = (k.dinhDanh || '').split(' · '); return s[s.length - 1] || '—'; }
/* 2D.4: tải biên lai – tệp BienLai-{số biên lai}.pdf; thành công không thông báo; lỗi gọi máy chủ → thanh lỗi */
function nvTaiBl(k, loi) { if (loi) window.__ptSnackLoi('Không tải được biên lai.'); }
/* 2B.4: dòng đang tải thêm ở cuối danh sách (như Hộp thư) */
function NvMore(p) {
  var end = React.useRef(null), on = React.useRef(p.onMore); on.current = p.onMore;
  React.useEffect(function () { var el = end.current; if (!el || typeof IntersectionObserver === 'undefined') return;
    var t = null, ob = new IntersectionObserver(function (e) { if (e[0].isIntersecting && !t) t = setTimeout(function () { t = null; on.current(); }, 700); });
    ob.observe(el); return function () { ob.disconnect(); clearTimeout(t); }; }, []);
  return h('li', { ref: end, className: 'ph-loadmore ib-more', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), h('span', null, 'Đang tải thêm khoản…'));
}
/* 2B.3: ô chọn có bảng chọn từ đáy; trên 10 mục thì có ô tìm (không phân biệt dấu) – theo mẫu bảng chọn hệ thống (1.29 Nộp đơn) */
function NvPick(p) {
  var o = React.useState(false), q = React.useState(''), cur = p.items.filter(function (x) { return x.id === p.v; })[0];
  /* màn demo mở sẵn bảng chọn: mở sau khi bảng Bộ lọc đã gắn để bảng chọn nằm trên */
  React.useEffect(function () { if (p.moSan) { var t = setTimeout(function () { o[1](true); }, 50), t2 = p.q0 ? setTimeout(function () { q[1](p.q0); }, 400) : null; return function () { clearTimeout(t); clearTimeout(t2); }; /* mở bảng trước rồi mới gõ – thấy chiều cao giữ nguyên */ } }, []);
  var kq = khongDau(q[0].trim()), loc = p.items.filter(function (x) { return !kq || khongDau(x.name).indexOf(kq) >= 0; });
  return h(F, null, h(T.SelectField, { label: p.label, labelVisible: true, value: cur ? cur.name : undefined, open: o[0], onClick: function () { q[1](''); o[1](true); } }),
    o[0] ? h(LvSheet, { host: p.host, title: 'Chọn ' + p.label.charAt(0).toLowerCase() + p.label.slice(1), onClose: function () { o[1](false); },
      top: p.items.length > 10 ? h('div', { className: 'fx-search' }, Tf('Tìm', { icon: 'search', placeholder: 'Nhập để tìm', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })) : null },
      loc.length ? h(LvRows, { label: p.label, cur: p.v, items: loc, onPick: function (id) { p.onPick(id); o[1](false); } }) : h('p', { className: 'ph-lv-empty' }, 'Không có mục khớp «' + q[0] + '».')) : null);
}
/* 2D.1: lịch sử khoản – mỗi mốc có ngày (DD-MM-YYYY), mới nhất trước */
function NvLs(p) {
  return h('section', { className: 'tp-sec-card tp-sec-open ls-card' }, h('div', { className: 'tp-sec-body' }, h('ol', { className: 'g1 nv-ls' }, p.ds.map(function (x, i) {
    return h('li', { key: i, className: (i === 0 ? 'g1-now ' : '') + 'g1-2' }, h('time', { className: 'g1-t2 tp-num' }, h('b', null, x.date || '—')),
      h('span', { className: 'g1-dot', 'aria-hidden': 'true' }), h('div', { className: 'g1-c' }, h('b', null, x.title), x.description ? h('small', null, x.description) : null));
  }))));
}
/* 2D.2: bước xác nhận Nộp tiền */
function NvPayXn(p) {
  var k = p.k, cp = React.useState(p.cp0 || null), ban = React.useState(!!p.ban0);
  function chep() { cp[1](p.copyLoi ? 'loi' : 'ok'); if (!p.copyLoi) setTimeout(function () { cp[1](null); }, 2500); }
  function tiep() {
    ban[1](true);
    setTimeout(function () {
      ban[1](false);
      if (p.noAmount) { window.__ptSnackLoi('Khoản chưa có số tiền phải nộp.'); return; }
      if (k.daDong) { window.__ptGo('replace:financePayClosed'); return; }
      window.__ptGo('replace:financePayOpen');
    }, 900);
  }
  return Sub('Nộp tiền', h(F, null,
    Blk(null, h('div', { className: 'nv-pay' }, h('h2', null, 'Nộp trên Cổng Dịch vụ công quốc gia'),
      P('Cổng Dịch vụ Tư pháp không thu tiền. Cổng DVCQG sẽ mở trên trình duyệt; nhập đúng mã thông báo dưới đây khi nộp.', 'ph-muted'))),
    Blk(null, h(F, null, h(T.InfoList, { variant: 'rows', items: [{ label: 'Khoản nộp', value: k.nd }, { label: 'Loại khoản', value: nvTenLoai(k.loai) },
      { label: 'Mã thông báo', mono: true, value: h('span', { className: 'nv-copy' + (cp[0] === 'ok' ? ' nv-copy-ok' : '') }, k.ma,
        h('button', { type: 'button', className: 'nv-copy-btn', 'aria-label': cp[0] === 'ok' ? 'Đã sao chép mã thông báo' : 'Sao chép mã thông báo', onClick: chep }, h(T.Icon, { name: cp[0] === 'ok' ? 'check' : 'copy' })),
        cp[0] === 'ok' ? h('small', { className: 'nv-copy-tx', role: 'status' }, 'Đã sao chép') : null) },
      { label: 'Người phải nộp', value: k.nopThay ? nvSoDd(k) : p.ten + ' · 001090012345' }].concat(k.nopThay ? [{ label: 'Tư cách của bạn', value: 'Người đại diện (nộp thay)' }] : [], [{ label: 'Hạn nộp', value: k.han || 'khi bản án có hiệu lực' }]) }),
      cp[0] === 'loi' ? h('p', { className: 'q2-err nv-copy-loi', role: 'alert' }, 'Không sao chép được, hãy chép tay mã thông báo.') : null,
      h('div', { className: 'nv-pay-sum' }, h('span', null, 'Số tiền'), h('b', { className: 'tp-num' }, nvTien(k.tien)))))),
    Bar(Btn('Để sau', 'secondary', { 'data-pt-go': 'backTo:financeDetail', disabled: ban[0] }), h(T.Button, { loading: ban[0], disabled: ban[0], className: 'pt-chk', onClick: ban[0] ? undefined : tiep }, ban[0] ? 'Đang xử lý…' : 'Tiếp tục sang Cổng DVCQG')));
}
/* 2A.1 / 2D.2: Cổng DVCQG là trang ngoài – app mở trình duyệt; màn mô phỏng trình duyệt */
function DvcqgExt() {
  return h(Phone, { cls: 'ph-ext' },
    h('div', { className: 'ext-bar' }, h('button', { type: 'button', className: 'ext-x', 'aria-label': 'Đóng trình duyệt', 'data-pt-go': 'back' }, h(T.Icon, { name: 'x' })),
      h('span', { className: 'ext-url' }, h(T.Icon, { name: 'lock' }), 'dichvucong.gov.vn/thanh-toan-truc-tuyen')),
    h('div', { className: 'ext-body' }, h('p', null, '[Trang Thanh toán trực tuyến của Cổng Dịch vụ công quốc gia]')));
}
/* demo: nhân dữ liệu mẫu */
function nvNhieu(tong) {
  var goc = NV.filter(function (k) { return k.mo && nvNopDuoc(k); }), kq = NV.slice(), i = 0;
  while (kq.filter(function (k) { return k.mo; }).length < tong) { var c = goc[i % goc.length]; kq.push(Object.assign({}, c, { ma: c.ma.replace(/\d+$/, function (x) { return String(+x + 100 + i).padStart(x.length, '0'); }) })); i++; }
  return kq;
}
var NV_HS_THEM = [['DS-2026-0101', 'Tranh chấp hợp đồng thuê nhà'], ['DS-2026-0102', 'Tranh chấp quyền sử dụng đất'], ['DS-2026-0103', 'Tranh chấp hợp đồng mua bán hàng hóa'], ['DS-2026-0104', 'Tranh chấp thừa kế tài sản'],
  ['HNGĐ-2026-0105', 'Ly hôn, tranh chấp nuôi con'], ['DS-2026-0106', 'Đòi bồi thường thiệt hại ngoài hợp đồng'], ['KDTM-2026-0107', 'Tranh chấp hợp đồng tín dụng'], ['DS-2026-0108', 'Tranh chấp hợp đồng đặt cọc'],
  ['LĐ-2026-0109', 'Tranh chấp về tiền lương'], ['DS-2026-0110', 'Tranh chấp hợp đồng gửi giữ tài sản'], ['DS-2026-0111', 'Tranh chấp hợp đồng vận chuyển']];
NV_HS_THEM.forEach(function (x) { NV_HS.push([x[0], 'Vụ án ' + x[0] + ' · ' + x[1]]); });
function nvNhieuHs() { return NV.concat(NV_HS_THEM.map(function (x, i) { return Object.assign({}, NV[0], { ma: 'TB-2026-0' + (200 + i), hs: x[0], vuAn: x[0], dl: 8 + i, han: '1' + (i % 9) + '-11-2026', ib: undefined }); })); }
function nvKhongGap() { return NV.map(function (k) { return k.mo && k.dl != null && k.dl <= 3 ? Object.assign({}, k, { dl: 12, han: '14-11-2026' }) : k; }); }
function FinanceLoading() {
  return Sub('Nghĩa vụ tài chính', h('div', { className: 'nv-tai', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), h('span', null, 'Đang tải nghĩa vụ tài chính…')));
}

/* 2A.2 (21/11, người dùng chọn PA-A): khối việc Chi tiết đơn (tạm ứng án phí) – 2 dòng trong khung viền, chạm dòng để thực hiện */
var DtViec_goc2a2 = DtViec;
DtViec = function (o) {
  if (!o || !o.mg2a2) return h(DtViec_goc2a2, o);
  return KhungDong([{ icon: 'wallet', t: 'Nộp tạm ứng án phí 1.250.000 đ', sub: 'Hạn 06-11-2026 · còn 4 ngày', subTone: 'warning', go: 'dvcqgExt' },
    { icon: 'filePlus', t: 'Đề nghị miễn, giảm tạm ứng án phí', sub: 'Hạn [Hạn đề nghị miễn, giảm]', subTone: 'warning', go: 'mg1' }]);
};
/* ===== Đối chiếu web – prototype (demo 21/11/2026), Đợt 1 – Trích lục, bản sao: dữ liệu mẫu + thành phần dùng riêng ===== */
/* lựa chọn của trình tự tạo yêu cầu (bước 1 ghi khi bấm Tiếp theo, bước 2–4 đọc) – 1E.3 */
var TL_CHON = { nguon: 'va', ma: 'DS-2026-0012', vt: 'Nguyên đơn', l: 'BA', so: '45/2026/DS-ST', toa: COURT1, loai: 'TRICH_LUC', loaiVb: 'BAN_AN', tcach: '', tep: null };
var TL_NGUON_PA = 'A'; /* 1E.1 [chưa rõ] vị trí nhãn nguồn: A = ghép vào dòng phụ, B = thẻ nhỏ đầu bước */
/* vụ án và văn bản để chọn ở bước 1 (1E.2) – dữ liệu mẫu; hiệu lực, trạng thái vụ án do máy chủ trả */
var TLV = [
  { ma: 'DS-2026-0012', ten: 'Tranh chấp hợp đồng vay tài sản', vt: 'Nguyên đơn', tt: 'Đang giải quyết', vb: [
    { id: 'v1', l: 'BA', so: '45/2026/DS-ST', ten: 'Bản án dân sự sơ thẩm', ngay: '20-10-2026', cap: 'Sơ thẩm', hl: '[Hiệu lực]', toa: COURT1 },
    { id: 'v2', l: 'QD', so: '[Số quyết định]', ten: 'Quyết định công nhận sự thỏa thuận', ngay: '15-10-2026', hl: '[Hiệu lực]', toa: COURT1 }] },
  { ma: 'DS-2026-0018', ten: 'Tranh chấp hợp đồng mua bán tài sản', vt: 'Bị đơn', tt: 'Đang giải quyết', vb: [
    { id: 'v3', l: 'QD', so: '[Số quyết định]', ten: 'Quyết định tạm đình chỉ giải quyết vụ án', ngay: '12-10-2026', toa: COURT1 }] },
  { ma: 'HN-2026-0007', ten: 'Ly hôn, tranh chấp nuôi con', vt: 'Bị đơn', tt: 'Tạm đình chỉ', vb: [
    { id: 'v4', l: 'BA', so: '[Số bản án]', ten: 'Bản án hôn nhân và gia đình sơ thẩm', ngay: '05-08-2026', cap: 'Sơ thẩm', hl: '[Hiệu lực]', toa: 'Tòa án nhân dân khu vực 2 - Hà Nội' },
    { id: 'v5', l: 'QD', so: '[Số quyết định]', ten: 'Quyết định áp dụng biện pháp khẩn cấp tạm thời', ngay: '10-09-2026', toa: 'Tòa án nhân dân khu vực 2 - Hà Nội', khoaBs: 'Không thể yêu cầu bản sao văn bản này.' },
    { id: 'v6', l: 'QD', so: '[Số quyết định]', ten: 'Quyết định tạm đình chỉ giải quyết vụ án', ngay: '02-10-2026', toa: 'Tòa án nhân dân khu vực 2 - Hà Nội' },
    { id: 'v7', l: 'QD', so: '[Số quyết định]', ten: 'Quyết định đưa vụ án ra xét xử', ngay: '20-08-2026', toa: 'Tòa án nhân dân khu vực 2 - Hà Nội', khoaTl: 'Không thể yêu cầu trích lục văn bản này.', khoaBs: 'Không thể yêu cầu bản sao văn bản này.' }] }];
function tlTimVb(id) { for (var i = 0; i < TLV.length; i++) { var b = TLV[i].vb.filter(function (x) { return x.id === id; })[0]; if (b) return Object.assign({ va: TLV[i] }, b); } return null; }
/* tỉnh/thành phố mẫu (34 đơn vị) để có ô tìm trong bảng chọn; danh mục thật do máy chủ trả */
var TL_TINH = ['Thành phố Hà Nội', 'Thành phố Hồ Chí Minh', 'Thành phố Hải Phòng', 'Thành phố Đà Nẵng', 'Thành phố Cần Thơ', 'Thành phố Huế', 'Tỉnh An Giang', 'Tỉnh Bắc Ninh', 'Tỉnh Cà Mau', 'Tỉnh Cao Bằng', 'Tỉnh Đắk Lắk', 'Tỉnh Điện Biên',
  'Tỉnh Đồng Nai', 'Tỉnh Đồng Tháp', 'Tỉnh Gia Lai', 'Tỉnh Hà Tĩnh', 'Tỉnh Hưng Yên', 'Tỉnh Khánh Hòa', 'Tỉnh Lai Châu', 'Tỉnh Lâm Đồng', 'Tỉnh Lạng Sơn', 'Tỉnh Lào Cai', 'Tỉnh Nghệ An', 'Tỉnh Ninh Bình', 'Tỉnh Phú Thọ',
  'Tỉnh Quảng Ngãi', 'Tỉnh Quảng Ninh', 'Tỉnh Quảng Trị', 'Tỉnh Sơn La', 'Tỉnh Tây Ninh', 'Tỉnh Thái Nguyên', 'Tỉnh Thanh Hóa', 'Tỉnh Tuyên Quang', 'Tỉnh Vĩnh Long'];
/* lý do rút yêu cầu: danh mục TRICHLUC_LYDORUT (CSDL môi trường thử 21-11-2026) */
var TLY_LD_RUT2 = ['Các bên đã tự hòa giải xong', 'Không còn nhu cầu sử dụng', 'Gửi nhầm thông tin', 'Khác'];
var TL4_TEP = [['Giấy ủy quyền', 'giay-uy-quyen.pdf'], ['Giấy tờ chứng minh mục đích sử dụng', 'giay-to-muc-dich.pdf']];
var TL_HOM_NAY = IB_TODAY; /* "hôm nay" mẫu của prototype */

/* ---------- dữ liệu danh sách, chi tiết yêu cầu ---------- */
(function () {
  /* 1C.1: thêm 3 trạng thái; 1B.3: yêu cầu và bản nháp sao chụp – thứ tự như web: cần hành động → đang xử lý → nháp → đã xong */
  var cho = { ma: '[Mã yêu cầu]', loai: 'TL', vb: 'Bản án', so: '45/2026/DS-ST', va: 'Tranh chấp hợp đồng vay tài sản', tt: 'ST-02a', nhan: ['Chờ tiếp nhận', 'info'], gui: '02-11-2026', du: 'Chờ tòa án tiếp nhận', go: 'copyDetailWait' };
  var sc = { ma: '[Mã yêu cầu]', loai: 'SC', maVa: 'DS-2026-0012', va: 'Tranh chấp hợp đồng vay tài sản', tt: 'ST-02a', nhan: ['Chờ tiếp nhận', 'info'], gui: '01-11-2026', du: 'Chờ tòa án tiếp nhận', go: 'copyDetailSc' };
  var scNhap = { ma: '[Mã yêu cầu]', loai: 'SC', maVa: 'DS-2026-0012', va: 'Tranh chấp hợp đồng vay tài sản', tt: 'ST-01', nhan: ['Chưa gửi (nháp)', 'neutral'], du: 'Chưa gửi', nhap: true, go: 'copyDetailScNhap' };
  var gq = { ma: '[Mã yêu cầu]', loai: 'TL', vb: 'Bản án', so: '45/2026/DS-ST', va: 'Tranh chấp hợp đồng vay tài sản', tt: 'ST-04', nhan: ['Đã giải quyết', 'success'], gui: '05-10-2026', du: 'Đã giải quyết', go: 'copyDetailSolved' };
  var rut = { ma: '[Mã yêu cầu]', loai: 'BS', vb: 'Bản án', so: '45/2026/DS-ST', va: 'Tranh chấp hợp đồng vay tài sản', tt: 'ST-04', nhan: ['Đã rút yêu cầu', 'danger'], gui: '03-10-2026', du: 'Đã rút yêu cầu', go: 'copyDetailRut' };
  var i = TLY.map(function (x) { return x.ma; }).indexOf('TL-2026-0035');
  TLY.splice(i, 0, cho, sc); TLY.splice(i + 3, 0, scNhap); TLY.push(gq, rut);
  TLY_BUOC.nhap = 'DVCQG: 1 · Nộp hồ sơ'; TLY_BUOC.rut = 'DVCQG: 7 · Dừng xử lý'; TLY_BUOC.gq = 'DVCQG: 5 · Trả kết quả'; TLY_BUOC.cho = 'DVCQG: 2 · Tiếp nhận hồ sơ'; TLY_BUOC.sc = 'DVCQG: 2 · Tiếp nhận hồ sơ';
  /* 1H.2: gợi ý nhanh nguồn đương sự khác theo web */
  SC_GOIY.duong_su = ['Nghiên cứu hồ sơ chuẩn bị phiên tòa', 'Đối chiếu số liệu công nợ và biên bản nghiệm thu', 'Thu thập chứng cứ đối tụng'];
})();
/* 1A.3: dữ liệu nhiều yêu cầu (nhân bản mẫu đang giải quyết) */
function tlyNhieu(tong) { var kq = TLY.slice(), goc = TLY.filter(function (x) { return x.tt === 'ST-03' && !x.bs && !x.nv; })[0]; while (kq.length < tong) kq.splice(3, 0, Object.assign({}, goc, { ma: '[Mã yêu cầu]' })); return kq; }
/* 1C.4: diễn biến xử lý dạng sự kiện – tiêu đề sự kiện do máy chủ đặt (để ngoặc vuông) */
var TLY_DV = '[Đơn vị xử lý] · ' + COURT1;
var TLY_SK = (function () {
  var gui = { t: '[Gửi yêu cầu]', tg: '20-10-2026 09:12' }, tn = { t: '[Tiếp nhận hồ sơ]', tg: '20-10-2026 14:30', dv: TLY_DV };
  return {
    dang: [gui, tn],
    bs: [gui, tn, { t: '[Yêu cầu bổ sung hồ sơ]', tg: '30-10-2026 10:00', nd: 'Văn bản ủy quyền đính kèm thiếu chứng thực chữ ký. Vui lòng bổ sung bản có chứng thực chữ ký theo quy định.', han: 'Hạn bổ sung: 06-11-2026', dv: TLY_DV }],
    nv: [gui, tn, { t: '[Thực hiện nghĩa vụ tài chính]', tg: '01-11-2026 08:00', han: 'Hạn thanh toán: 07-11-2026', dv: TLY_DV }],
    cap: [{ t: '[Gửi yêu cầu]', tg: '10-10-2026 08:40' }, { t: '[Tiếp nhận hồ sơ]', tg: '10-10-2026 10:05', dv: TLY_DV }, { t: '[Trả kết quả]', tg: '15-10-2026 09:00', nd: 'Kết quả điện tử đã được ký số và tự động lưu vào Kho dữ liệu.', dv: TLY_DV }],
    tc: [{ t: '[Gửi yêu cầu]', tg: '02-10-2026 10:00' }, { t: '[Tiếp nhận hồ sơ]', tg: '02-10-2026 15:10', dv: TLY_DV }, { t: '[Từ chối cấp]', tg: '06-10-2026 16:45', nd: 'Tài liệu yêu cầu thuộc diện không được cung cấp bản sao theo quy định.', dv: TLY_DV }],
    gq: [{ t: '[Gửi yêu cầu]', tg: '05-10-2026 09:00' }, { t: '[Tiếp nhận hồ sơ]', tg: '05-10-2026 13:20', dv: TLY_DV }, { t: '[Giải quyết xong]', tg: '09-10-2026 16:00', dv: TLY_DV }],
    rut: [{ t: '[Gửi yêu cầu]', tg: '03-10-2026 08:30' }, { t: '[Rút yêu cầu]', tg: '04-10-2026 10:15', nd: 'Không còn nhu cầu sử dụng' }],
    cho: [{ t: '[Gửi yêu cầu]', tg: '02-11-2026 09:12' }], sc: [{ t: '[Gửi yêu cầu]', tg: '01-11-2026 15:40' }] };
})();
var TLY_TIEP = { dang: 'Chờ Thư ký/Thẩm phán thẩm định hồ sơ.', bs: 'Chờ bạn nộp hồ sơ bổ sung theo yêu cầu của Tòa án.', nv: 'Chờ bạn thực hiện nghĩa vụ tài chính.', cho: 'Chờ Tòa án tiếp nhận yêu cầu.', sc: 'Chờ Tòa án tiếp nhận yêu cầu.' };

/* ---------- thành phần ---------- */
/* khối trạng thái giữa màn: đang tải / lỗi / không xác định */
function TlTrang(p) {
  return h('div', { className: 'tl-trang', role: p.loi ? 'alert' : 'status' },
    p.spin ? h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }) : h('span', { className: 'tl-trang-ic' + (p.loi ? ' tl-trang-loi' : ''), 'aria-hidden': 'true' }, h(T.Icon, { name: p.icon || 'alert' })),
    p.title ? h('p', { className: 'tl-trang-t' }, p.title) : null, p.text ? h('p', { className: 'tl-trang-d' }, p.text) : null,
    p.btns ? h('div', { className: 'tl-trang-b' }, p.btns) : null);
}
function TlThuLai() { return h(T.Button, { variant: 'secondary', size: 'sm', icon: 'swap', className: 'pt-chk' }, 'Thử lại'); }
/* dòng đang tải nhỏ trong khối */
function TlDang(t) { return h('p', { className: 'tl-dang', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), t); }
function TlLoi(t) { return t ? h('p', { className: 'q2-err', role: 'alert' }, t) : null; }
/* chân màn 3 nút (0.4 [chưa rõ]): hàng trên nút chính rộng hết, hàng dưới 2 nút phụ */
function TlFoot3(chinh, a, b) { return h('div', { className: 'tp-actionbar tl-foot3' }, chinh, h('div', { className: 'ph-2btn' }, a, b)); }
/* cuộn tới cuối tự tải thêm (1A.3) */
function TlMore(p) {
  var end = React.useRef(null), on = React.useRef(p.onMore); on.current = p.onMore;
  React.useEffect(function () { var el = end.current; if (!el || typeof IntersectionObserver === 'undefined') return;
    var t = null, ob = new IntersectionObserver(function (e) { if (e[0].isIntersecting && !t) t = setTimeout(function () { t = null; on.current(); }, 700); });
    ob.observe(el); return function () { ob.disconnect(); clearTimeout(t); }; }, []);
  return h('li', { ref: end, className: 'ph-loadmore ib-more', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), h('span', null, 'Đang tải thêm yêu cầu…'));
}
/* "Việc cần làm" trên thẻ yêu cầu – như dsViec, thêm chữ phụ riêng (1B.1) */
function tlViec(ds) {
  if (!ds.length) return null;
  return h('div', { className: 'qd-c-f qc-vk vkx-box' }, h('p', { className: 'qc-vk-h vkx-h' }, 'Việc cần làm'), h('ul', { className: 'qc-vk-l' }, ds.map(function (v) {
    return h('li', { key: v.t, className: 'vk-card vka vkx vkx-' + (v.m || 'none') }, h('button', { type: 'button', className: 'vka-b', 'data-pt-go': v.go, 'aria-label': v.t },
      h('span', { className: 'vka-tx' }, h('b', null, v.t), h('small', null, v.sub ? v.sub : v.han ? h(F, null, 'Hạn xử lý · ', h('span', { className: 'vka-han vka-han-' + (v.m || 'an') }, v.han)) : 'Không có thời hạn'))));
  })));
}
/* khung trình tự có dòng phụ (1E.1); giữ "Lưu nháp" ở thanh tiêu đề mọi bước */
function TlWz(o) {
  var nx = o.last || (o.go ? NextGo(o.go) : Next());
  return h(Phone, { cls: 'ph-hd' },
    h('div', { className: 'ph-hd-step' }, h(T.AppBar, { variant: 'plain', className: o.sub ? 'tl-sub' : undefined, title: o.title, subtitle: o.sub || undefined, onBack: noop, actions: [{ text: 'Lưu nháp' }] }),
      h(StepStrip, { cur: o.n, steps: o.steps })),
    h(Body, { cls: 'ph-plain ph-steps' + (o.cls ? ' ' + o.cls : '') }, o.nguonB ? h('p', { className: 'tl-nguon' }, h(T.Icon, { name: o.nguonB === 'Yêu cầu độc lập' ? 'file' : 'scale' }), o.nguonB) : null, o.body),
    h('div', { className: 'ph-foot' }, o.n === 1 ? Bar(nx) : Bar(Btn('Quay lại', 'tonal'), nx)));
}
/* nút Tiếp theo tự kiểm tra (lỗi chỉ hiện sau khi bấm – 1E.4) */
function TlNext(fn) { return h(T.Button, { className: 'pt-chk', onClick: fn }, 'Tiếp theo', h(T.Icon, { name: 'chevronRight' })); }
/* dòng phụ + nhãn nguồn của trình tự */
function tlNguon(c) { return c.nguon === 'tk' ? 'Yêu cầu độc lập' : 'Từ vụ án của tôi'; }
function tlSub(c, chi, pa) {
  var s = c.nguon === 'tk' ? 'Theo thông tin bản án tự khai' : chi === 'va' ? c.ma + ' · ' + c.toa : chi === 'trong' ? '' : c.ma + ' · ' + (c.l === 'QD' ? 'Quyết định ' : 'Bản án ') + c.so;
  if ((pa || TL_NGUON_PA) === 'A') return [tlNguon(c), s].filter(Boolean).join(' · ');
  return s;
}
function tlWzNguon(c, pa) { return (pa || TL_NGUON_PA) === 'B' ? tlNguon(c) : null; }
/* bộ đếm số lượng có giới hạn (1E.4): "−" khóa ở 1, "+" khóa ở tối đa */
function TlDem(p) {
  return h('div', { className: 'ph-dem-row' }, h('span', { className: 'ph-dem-l' }, p.label),
    h('div', { className: 'ph-dem', role: 'group', 'aria-label': p.label },
      h('button', { type: 'button', 'aria-label': 'Giảm số lượng', disabled: p.v <= 1, onClick: function () { p.set(p.v - 1); } }, '−'),
      h('b', { className: 'tp-num' }, p.v),
      h('button', { type: 'button', 'aria-label': 'Tăng số lượng', disabled: p.v >= p.max, onClick: function () { p.set(p.v + 1); } }, '+')));
}
/* ô chọn → bảng từ đáy, có điều khiển và lỗi dưới ô; trên 10 mục có ô tìm không phân biệt dấu */
function TlSel(p) {
  var o = React.useState(!!p.moSan), q = React.useState(p.q0 || ''), anchor = React.useRef(null), host = useHost(anchor);
  var items = p.opts.map(function (x) { return typeof x === 'string' ? { id: x, name: x } : x; }), ci = items.filter(function (x) { return x.id === p.v; })[0];
  var kq = khongDau(q[0].trim()), loc = items.filter(function (x) { return !kq || khongDau(x.name).indexOf(kq) >= 0; });
  return h('div', { className: 'ph-selsh' }, h('span', { ref: anchor, hidden: true }),
    h(T.SelectField, { label: p.label, labelVisible: true, required: p.req, placeholder: p.ph, value: ci ? ci.name : undefined, open: o[0], error: p.err || undefined, disabled: !!p.disabled, onClick: function () { if (p.disabled) return; q[1](''); o[1](true); } }),
    o[0] && host ? h(LvSheet, { host: host, title: p.title || 'Chọn ' + p.label.charAt(0).toLowerCase() + p.label.slice(1), onClose: function () { o[1](false); },
      top: items.length > 10 || p.search ? h('div', { className: 'fx-search' }, Tf('Tìm', { icon: 'search', placeholder: 'Nhập để tìm', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })) : null },
      loc.length ? h(LvRows, { label: p.label, cur: p.v, items: loc, onPick: function (id) { p.onChange(id); o[1](false); } }) : h('p', { className: 'ph-lv-empty' }, 'Không có mục khớp «' + q[0] + '».')) : null);
}
/* địa chỉ nhận qua bưu chính (1E.4, 1H.3): lỗi khoảng trắng hiện ngay khi gõ, các lỗi khác sau khi bấm */
function tlLoiDc(v) {
  return { ten: !v.ten ? 'Vui lòng nhập tên người nhận.' : !v.ten.trim() ? 'Tên người nhận không được chỉ chứa khoảng trắng.' : '',
    sdt: !v.sdt ? 'Vui lòng nhập số điện thoại người nhận.' : !/^0\d{9}$/.test(v.sdt) ? 'Số điện thoại sai định dạng.' : '',
    tinh: v.tinh ? '' : 'Vui lòng chọn tỉnh / thành phố.', xa: v.xa ? '' : 'Vui lòng chọn phường / xã.',
    ct: !v.ct ? 'Vui lòng nhập địa chỉ chi tiết.' : !v.ct.trim() ? 'Địa chỉ nhận không được chỉ chứa khoảng trắng.' : '' };
}
function tlCoLoi(e) { return Object.keys(e).some(function (k) { return !!e[k]; }); }
function TlDiaChi(p) {
  var v = p.v, e = tlLoiDc(v), hien = function (k) { return p.kt || (v[k] && !v[k].trim()) ? e[k] || undefined : undefined; };
  function set(k, x) { var n = Object.assign({}, v); n[k] = x; if (k === 'tinh' && x !== v.tinh) n.xa = ''; p.set(n); }
  var dsX = XA_MAU[v.tinh] || ['[Phường/Xã 1]', '[Phường/Xã 2]', '[Phường/Xã 3]'];
  return h('div', { className: 'tl-dc' },
    Tf('Tên người nhận', { required: true, maxLength: 250, placeholder: 'Tên người nhận', value: v.ten, onChange: function (ev) { set('ten', ev.target.value); }, error: hien('ten') }),
    Tf('Số điện thoại', { required: true, type: 'tel', inputMode: 'numeric', maxLength: 10, placeholder: 'Số điện thoại', value: v.sdt, onChange: function (ev) { set('sdt', ev.target.value.replace(/\D/g, '')); }, error: p.kt ? e.sdt || undefined : undefined }),
    h(TlSel, { label: 'Tỉnh/Thành phố', req: true, ph: 'Chọn Tỉnh/Thành phố', title: 'Chọn Tỉnh/Thành phố', opts: TL_TINH, v: v.tinh, moSan: p.moTinh, onChange: function (x) { set('tinh', x); }, err: p.kt ? e.tinh : '' }),
    h(TlSel, { label: 'Phường / Xã', req: true, ph: v.tinh ? 'Chọn phường/xã' : 'Chọn tỉnh trước', title: 'Chọn phường/xã', opts: dsX, v: v.xa, disabled: !v.tinh, onChange: function (x) { set('xa', x); }, err: p.kt ? e.xa : '' }),
    Tf('Địa chỉ chi tiết', { required: true, maxLength: 250, placeholder: 'Số nhà, tên đường', value: v.ct, onChange: function (ev) { set('ct', ev.target.value); }, error: hien('ct') }));
}
var TL_DC0 = { ten: '', sdt: '', tinh: '', xa: '', ct: '' }, TL_DC_MAU = { ten: 'Hoàng Dương', sdt: '0912345678', tinh: 'Thành phố Hà Nội', xa: 'Phường Ba Đình', ct: '[Số nhà, tên đường]' };
/* Giấy giới thiệu / Công văn (tài khoản tổ chức) có kiểm tra (1E.4, giay-gioi-thieu-quy-tac.ts) */
function tlNgay(s) { var m = /^(\d{2})-(\d{2})-(\d{4})$/.exec((s || '').trim()); return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null; }
function tlLoiGgt(v, bb) {
  var so = (v.so || '').trim(), ng = (v.ngay || '').trim(), can = bb || !!so || !!ng, e = {}, d = tlNgay(ng);
  if (so.length > 50) e.so = 'Số giấy giới thiệu/công văn không được vượt quá 50 ký tự.'; else if (can && !so) e.so = 'Vui lòng nhập số giấy giới thiệu/công văn.';
  if (can && !ng) e.ngay = 'Vui lòng nhập ngày ký.'; else if (d && d > TL_HOM_NAY) e.ngay = 'Ngày ký không được sau ngày hiện tại.';
  return e;
}
function TlGiayGT(p) {
  var v = p.v, e = tlLoiGgt(v, p.bb), set = function (k, x) { var n = Object.assign({}, v); n[k] = x; p.set(n); };
  return FCard('Giấy giới thiệu / Công văn', h(F, null,
    Lead(p.bb ? 'Cơ quan nhà nước cần cung cấp số và ngày ký giấy giới thiệu hoặc công văn đề nghị cấp.' : 'Không bắt buộc. Nhập nếu cơ quan, tổ chức có giấy giới thiệu hoặc công văn đề nghị cấp.'),
    Tf('Số / ký hiệu', { required: p.bb, maxLength: 50, placeholder: 'VD: 125/GT-UBND', value: v.so, onChange: function (ev) { set('so', ev.target.value); }, error: p.kt ? e.so : undefined }),
    Tf('Ngày ký', Dt({ required: p.bb, value: v.ngay, onChange: function (ev) { set('ngay', ev.target.value); }, error: p.kt ? e.ngay : undefined }))), true);
}
/* tài liệu đính kèm (1F.1 – tối đa 9; 1D.2 – tối đa 10): tải nhiều tệp, chọn nhiều từ kho, bộ đếm, tên + loại bắt buộc, Xem → màn xem tệp, sửa bằng bảng */
function tlLoiTep(f) { return [!(f.ten || '').trim() ? 'Vui lòng nhập tên tài liệu.' : null, !f.loai ? 'Vui lòng chọn loại tài liệu.' : null].filter(Boolean); }
function TlTep(p) {
  var toiDa = p.toiDa || 9, ds = React.useState(p.ds0 || []), ed = React.useState(p.sua0 != null ? { i: p.sua0, d: Object.assign({}, (p.ds0 || [])[p.sua0]) } : null);
  var lib = React.useState(p.khoMo ? 'them' : null), loi = React.useState(p.loiTai || ''), dang = React.useState(false), seq = React.useRef(100), anchor = React.useRef(null), host = useHost(anchor);
  function doi(n) { ds[1](n); if (p.onDoi) p.onDoi(n); }
  function them(fs, nguon) {
    var n = ds[0].slice(), bo = 0;
    fs.forEach(function (f) { if (n.length >= toiDa) { bo++; return; } seq.current++; n.push({ k: seq.current, tep: f.tep, ten: '', loai: '', nguon: nguon }); });
    doi(n); loi[1](bo ? 'Chỉ đính kèm tối đa ' + toiDa + ' tệp; các tệp vượt giới hạn đã bị bỏ qua.' : '');
  }
  function tai() { dang[1](true); setTimeout(function () { dang[1](false); them([KHO[2], KHO[5]], 'tb'); }, 600); }
  function luu(d) { var i = ed[0].i; ed[1](null); doi(d ? ds[0].map(function (f, j) { return j === i ? Object.assign({}, f, d) : f; }) : ds[0].filter(function (f, j) { return j !== i; })); }
  return FCard(p.title, h(F, null, h('span', { ref: anchor, hidden: true }),
    P(p.desc, 'ph-muted'),
    ds[0].length ? P('Đã đính kèm: ' + ds[0].length + '/' + toiDa + ' tệp', 'tl-tep-dem') : null,
    ds[0].length ? h('ul', { className: 'ph-tlr' }, ds[0].map(function (f, i) {
      var lr = p.kt ? tlLoiTep(f) : [];
      return h('li', { key: f.k || i, className: lr.length ? 'ph-tlr-li-loi' : null },
        h('span', { className: 'ph-up3-ic ph-tl-ic ph-tl-ok', 'aria-hidden': 'true' }, h(T.Icon, { name: 'check' })),
        h('span', { className: 'ph-tlr-tx' }, h('b', { className: f.ten ? null : 'tl-chua' }, f.ten || 'Chưa nhập tên tài liệu'), h('small', null, f.tep + ' · ' + (f.loai || 'Chưa chọn loại tài liệu')),
          lr.map(function (t) { return h('small', { key: t, className: 'ph-tlr-loi' }, t); })),
        h(T.Button, { variant: 'secondary', size: 'sm', icon: 'eye', className: 'ph-lib-view', 'aria-label': 'Xem ' + (f.ten || f.tep), 'data-pt-go': 'attachment', onClickCapture: function () { window.__ibFile = f.tep; } }),
        h(T.Button, { variant: 'secondary', size: 'sm', icon: 'pen', className: 'ph-lib-view ph-tlr-edit', 'aria-label': 'Sửa ' + (f.ten || f.tep), onClick: function () { ed[1]({ i: i, d: { tep: f.tep, ten: f.ten || '', loai: f.loai || '' } }); } }));
    })) : null,
    h('div', { className: 'ph-up2 ph-up3' },
      h('button', { type: 'button', className: 'ph-up2-it', disabled: dang[0], onClick: tai }, h('span', { className: 'ph-up3-ic' }, dang[0] ? h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }) : h(T.Icon, { name: 'upload' })), h('b', null, dang[0] ? 'Đang tải lên…' : 'Tải lên từ máy')),
      h('button', { type: 'button', className: 'ph-up2-it', onClick: function () { lib[1]('them'); } }, h('span', { className: 'ph-up3-ic' }, h(T.Icon, { name: 'folder' })), h('b', null, 'Chọn từ Kho dữ liệu cá nhân'))),
    TlLoi(loi[0]),
    ed[0] && host ? ReactDOM.createPortal(h(TLSheet, { title: 'Tài liệu đính kèm', loai: LOAI_TL, ktLoi: true, r: { bat: false, tep: ed[0].d.tep }, d: ed[0].d, set: function (o) { ed[1]({ i: ed[0].i, d: Object.assign({}, ed[0].d, o) }); },
      onClose: function () { ed[1](null); }, onSave: luu, onDev: function () { ed[1]({ i: ed[0].i, d: Object.assign({}, ed[0].d, { tep: KHO[1].tep }) }); }, onLib: function () { lib[1]('thay'); } }), host) : null,
    lib[0] && host ? ReactDOM.createPortal(h(LibSheet, { chosen: null, nhieu: lib[0] === 'them', moTa: 'Định dạng PDF, JPG, PNG tối đa 20MB. Có thể chọn nhiều tệp cùng lúc.', daCo: ds[0].map(function (f) { return f.tep; }),
      onClose: function () { lib[1](null); }, onPick: function (f) { lib[1](null); if (ed[0]) ed[1]({ i: ed[0].i, d: Object.assign({}, ed[0].d, { tep: f.tep }) }); },
      onPickNhieu: function (fs) { lib[1](null); them(fs, 'kho'); } }), host) : null), true);
}
var TL_TEP_MAU = [{ k: 1, tep: 'giay-uy-quyen.pdf', ten: 'Giấy ủy quyền', loai: 'Bản sao có chứng thực' }, { k: 2, tep: 'giay-to-muc-dich.pdf', ten: 'Giấy tờ chứng minh mục đích sử dụng', loai: 'Bản chính' }];
function tlTepNhieu(n) { var a = []; for (var i = 0; i < n; i++) a.push({ k: i + 1, tep: 'tai-lieu-' + (i + 1) + '.pdf', ten: 'Tài liệu ' + (i + 1), loai: 'Bản chính' }); return a; }
/* thông tin vụ án đã chọn – vào từ chi tiết vụ án (1B.2) */
function Tl1Va(p) {
  var lp = React.useState(p.chuaBa || p.kt || p.loiKt ? '' : 'tl'), e = React.useState(!!p.loi), c = { nguon: 'va', ma: 'DS-2026-0012', toa: COURT1 };
  var hop = !p.chuaBa && !p.kt && !p.loiKt;
  function tiep() { e[1](true); if (!hop || !lp[0]) return; Object.assign(TL_CHON, { nguon: 'va', ma: 'DS-2026-0012', vt: 'Nguyên đơn', l: 'BA', so: '45/2026/DS-ST', toa: COURT1, loai: lp[0] === 'bs' ? 'BAN_SAO' : 'TRICH_LUC' }); window.__ptGo('tl2'); }
  var khoi = p.kt ? TlDang('Đang kiểm tra điều kiện cấp trích lục/bản sao…') : p.loiKt ? P('Không kiểm tra được điều kiện cấp trích lục/bản sao.', 'tl-loikt') : h(F, null,
    h('b', { className: 'tl-va-ten' }, 'Tranh chấp hợp đồng vay tài sản'), h('small', null, 'Nguyên đơn · DS-2026-0012'),
    p.chuaBa ? null : h('small', null, '45/2026/DS-ST · Bản án DS sơ thẩm · 20-10-2026 · ' + COURT1));
  return TlWz({ title: TL_TITLE, sub: tlSub(c, 'va'), nguonB: tlWzNguon(c), steps: TL_STEPS, n: 1, last: TlNext(tiep), body: FCard('Chọn bản án / quyết định', h(F, null,
    h('section', { className: 'tl-vachon' }, h('div', { className: 'tl-vachon-h' }, h('span', null, 'Thông tin vụ án đã chọn'), h('button', { type: 'button', className: 'vk-link', 'data-pt-go': 'replace:tl1' }, 'Đổi vụ án khác')), khoi),
    hop || p.chuaBa ? h('section', { className: 'ph-s1-sec ph-fsec' }, Lbl('Loại sản phẩm cần cấp', 1), h(OptCards, { label: 'Loại sản phẩm cần cấp', cur: lp[0], onPick: lp[1], items: [
      { id: 'tl', t: 'Trích lục bản án/quyết định', d: 'Theo quyền đương sự.', off: !!p.chuaBa },
      { id: 'bs', t: 'Bản sao toàn văn bản án/quyết định', d: p.chuaBa ? 'Vụ án chưa có bản án/quyết định — không thể yêu cầu cấp bản sao.' : 'Được cấp từ sổ gốc, có giá trị sử dụng thay cho bản chính trong các giao dịch theo quy định pháp luật.', off: !!p.chuaBa }] })) : null,
    p.chuaBa ? h('div', { className: 'tl-canh' }, h(T.Icon, { name: 'alert' }), h('p', null, 'Vụ án này chưa có bản án/quyết định nào — chưa thể tạo yêu cầu cấp trích lục hoặc bản sao. Vui lòng quay lại khi Tòa án đã tuyên án.')) : null,
    e[0] && (!hop || !lp[0]) ? TlLoi('Vui lòng chọn vụ án đã có bản án hoặc quyết định hợp lệ để tiếp tục.') : null), true) });
}
/* thẻ xác minh tư cách từ vụ án (1F.2): web "Đương sự — {vai trò} trong vụ án {mã}" */
function tlTuCachVa(vt, ma) { return /đương sự/i.test(vt) ? vt + ' trong vụ án ' + ma : 'Đương sự — ' + vt + ' trong vụ án ' + ma; }

/* 1B.3 (người dùng 21/11, LOGIC CHUNG): màn soạn một khối – "Lưu nháp" luôn ở thanh đầu màn bên phải */
function SubSNhap(title, khoa, body, footer) {
  return h(Phone, { cls: 'ph-hd' }, h(T.AppBar, { variant: 'plain', title: title, onBack: noop, actions: [{ text: 'Lưu nháp', disabled: !!khoa, onClick: function () { window.__ptGo('reset:home,copyListSaved'); } }] }),
    h(Body, { cls: 'ph-plain ph-steps' }, body), footer ? h('div', { className: 'ph-foot' }, footer) : null);
}

/* 1C.2 (người dùng 21/11: dải vàng rối mắt → đề xuất lại). Chọn qua ?bs=a|b (mặc định a)
   PA-A: khối trắng "Yêu cầu bổ sung hồ sơ" – lý do (1 đoạn), dòng nhãn–giá trị (Hạn bổ sung + chip trạng thái, Lần yêu cầu, Đã gửi), ghi chú ngắn theo trạng thái, nút rộng hết
   PA-B: dòng việc gọn như "Việc cần làm" – tên việc + hạn (màu theo trạng thái) + nút bên phải; dưới là lý do chữ xám và 1 dòng trạng thái */
function TlBsKhoi(o) {
  var pa = 'c' /* 1C.2 chốt PA-C */;
  /* PA-C (người dùng 21/11: đồng nhất design system màn tương tự): khối việc DtViec như "Yêu cầu bổ sung tài liệu" ở Chi tiết đơn – tên việc, hạn · còn/quá, nút bên phải;
     đã gửi: dòng ghi chú dưới; lý do và lần yêu cầu đưa vào khối "Thông tin yêu cầu" */
  if (pa === 'c') return h(DtViec, { t: 'Yêu cầu bổ sung hồ sơ', tone: o.qua ? 'danger' : 'warning', han: 'Hạn ' + o.han, con: o.qua ? 'quá hạn' : 'còn 2 ngày', btn: { l: 'Bổ sung hồ sơ', go: o.qua ? 'copySuppLate' : 'copySupp' },
    note: o.daGui ? 'Đã gửi bổ sung lúc 05-11-2026 09:30 (2 tệp), đang chờ Tòa án kiểm tra.' : o.qua ? 'Vẫn gửi được; Tòa án sẽ ghi nhận là nộp quá hạn.' : null });
  var lyDo = 'Văn bản ủy quyền đính kèm thiếu chứng thực chữ ký. Vui lòng bổ sung bản có chứng thực chữ ký theo quy định.';
  var go = o.qua ? 'copySuppLate' : 'copySupp';
  var chip = o.qua ? h('span', { className: 'tlb-chip tlb-chip-qua' }, 'Quá hạn') : o.daGui ? h('span', { className: 'tlb-chip tlb-chip-gui' }, 'Đã gửi, chờ kiểm tra') : h('span', { className: 'tlb-chip' }, 'Còn hạn');
  var ghi = o.qua ? 'Vẫn gửi được; Tòa án sẽ ghi nhận là nộp quá hạn.' : o.daGui ? 'Có thể gửi thêm cho đến khi Tòa án xử lý.' : 'Tòa án còn có thể yêu cầu bổ sung thêm 1 lần.';
  if (pa === 'b') return h('section', { className: 'tlb-b' },
    h('div', { className: 'tlb-b-h' }, h('div', null, h('b', null, 'Bổ sung hồ sơ'), h('small', { className: o.qua ? 'tlb-qua' : '' }, (o.qua ? 'Quá hạn · ' : 'Hạn · ') + o.han)), Btn('Bổ sung hồ sơ', 'primary', { size: 'sm', 'data-pt-go': go })),
    h('p', { className: 'tlb-ly' }, lyDo),
    h('p', { className: 'tlb-tt' + (o.qua ? ' tlb-qua' : o.daGui ? ' tlb-gui' : '') }, o.daGui ? 'Đã gửi lúc 05-11-2026 09:30 (2 tệp) · ' + ghi : 'Lần 1/2 · ' + ghi));
  return FCard('Yêu cầu bổ sung hồ sơ', h(F, null, h('p', { className: 'tlb-ly' }, lyDo),
    RvKV([['Hạn bổ sung', h('span', { className: 'tlb-han' }, o.han, chip)], ['Lần yêu cầu', '1/2']].concat(o.daGui ? [['Đã gửi bổ sung', '05-11-2026 09:30 · 2 tệp']] : [])),
    h('p', { className: 'tlb-ghi' + (o.qua ? ' tlb-qua' : '') }, ghi),
    h(T.Button, { block: true, 'data-pt-go': go }, 'Bổ sung hồ sơ')), true);
}
/* 1C.3 (người dùng 21/11: khối "Kết quả đã cấp" lộn xộn → đề xuất lại). Người dùng chọn PA-B (giữ nền xanh, xếp dọc).
   Nội dung giữ đúng web: tên tệp + "Đã có chữ ký số của Tòa án", Xem trước, Tải xuống, "Đã ký số hợp lệ" + Tòa án · thời điểm, Quét QR để đối chiếu, ghi chú.
   Dòng tệp dùng mẫu dòng tệp của "Hồ sơ bạn đã gửi" (nút biểu tượng Xem, Tải xuống); Quét QR thành nút viền trải ngang; tải xong không thông báo. */
function TlKqKhoi() {
  var ten = 'TL-2026-0019.pdf';
  var tep = h('ul', { className: 'ph-ky dt-docs dt-docs-the' }, h('li', null, h('div', null, h('b', null, ten), h('small', null, 'Đã có chữ ký số của Tòa án')),
    XemTep(ten), h(T.Button, { variant: 'secondary', size: 'sm', icon: 'download', className: 'ph-lib-view', 'aria-label': 'Tải xuống ' + ten })));
  var ky = h('p', { className: 'tly-ky tlk-ky' }, h(T.Icon, { name: 'shield' }), h('span', null, h('b', null, 'Đã ký số hợp lệ'), h('small', null, COURT1 + ' · 15-10-2026 09:00')));
  var qr = h(T.Button, { variant: 'secondary', block: true, icon: 'grid', 'data-pt-go': 'snack:Quét QR để đối chiếu đang được phát triển.' }, 'Quét QR để đối chiếu');
  var ghi = P('Bản sao/trích lục điện tử này có giá trị sử dụng thay cho bản chính trong các giao dịch. File đã được lưu vào Kho quản lý dữ liệu điện tử của bạn.', 'ph-muted dt-small');
  return h('section', { className: 'tly-kq tlk' }, h('p', { className: 'tly-kq-h' }, h(T.Icon, { name: 'checkCircle' }), 'Kết quả đã cấp — Bản điện tử'), tep, ky, qr, ghi);
}
/* ===== Đối chiếu web – prototype (demo 21/11/2026), Đợt 3 – Hộp thư tống đạt: dữ liệu mẫu, hàm phụ, màn demo ===== */
/* biểu tượng kẹp giấy (3B.3) – bộ biểu tượng design system chưa có, thêm theo cơ chế ICON_THEM (v503), cùng nét 24px */
ICON_THEM.paperclip = ['M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48'];
/* 3D.4: văn bản mẫu thuộc vụ việc phá sản PS-2026-0001 (Quyết định mở thủ tục phá sản – đã có ở Chi tiết vụ việc, ban hành 20-10-2026) */
IB.push({ t: 'Quyết định mở thủ tục phá sản', so: '[Số quyết định]', nh: 'QUYET_DINH', from: COURT1, time: '20-10-2026 10:00', va: 'PS-2026-0001', doc: true, arch: false, can: false, xxl: 'moi' });
var IB_PS = IB.length - 1;
/* 3D.2: văn bản gắn với đơn (hồ sơ là đơn chưa thụ lý – IB_VA không có số thụ lý) → mã đơn = mã hồ sơ của văn bản */
IB.forEach(function (m) { var v = IB_VA[m.va]; if (v && !v[2]) m.don = m.va; });
/* 3C.1: tệp đính kèm định dạng không xem trực tiếp được (mẫu) */
IB[0].dkThem = ['Phu-luc-02.docx'];
/* 3D.4: "Sửa đổi, bổ sung đơn khởi kiện" mở chức năng sửa đổi đơn đã nộp (sd1), không mở soạn đơn mới */
IB_KHOI['bo-sung'].b[0][1] = 'sd1';
/* 3A.2: lối vào mở đúng văn bản – Việc cần làm "Văn bản tống đạt có thời hạn · DS-2026-0012" → IB[3]; thông báo "Tòa án gửi văn bản tống đạt" → IB[0]; Lịch "Xem giấy triệu tập" → IB[14] */
VK[0].go = 'mailDetailVk';
NOTI_GO['Tòa án gửi văn bản tống đạt'] = 'mailDetailTb';
var lcGo0ht = lcGo;
lcGo = function (a) { return a === 'Xem giấy triệu tập' ? 'mailDetailGtt' : lcGo0ht(a); };

/* lọc theo danh sách bất kỳ (như ibLocDs, nhận nguồn dữ liệu – để dựng màn trống) */
function htLocDs(nguon, loc, q, folder) {
  var kq = khongDau(q.trim());
  return nguon.filter(function (m) {
    if (folder === 'archive' ? !m.arch : m.arch) return false;
    if (folder === 'starred' && !m.star) return false;
    if (loc.hs && m.va !== loc.hs) return false;
    if (loc.nhan && m.nh !== loc.nhan) return false;
    if (loc.doc === 'unread' && m.doc) return false;
    if (loc.doc === 'read' && !m.doc) return false;
    if (loc.toa !== 'all' && m.from !== loc.toa) return false;
    var d = ibNgay(m.time);
    if (loc.khoang === 'nam' && d.getFullYear() !== IB_TODAY.getFullYear()) return false;
    if (/^\d+$/.test(loc.khoang) && (IB_TODAY - d) / 86400000 > +loc.khoang) return false;
    if (loc.khoang === 'custom') { var iso = ibIso(m.time); if (loc.tu && iso < loc.tu) return false; if (loc.den && iso > loc.den) return false; }
    if (kq && khongDau([m.t, m.so, m.from, m.va, IB_NHAN_TEN[m.nh]].join(' ')).indexOf(kq) < 0) return false;
    return true;
  });
}
/* 3B.2: điều kiện của dòng "Đang lọc" theo thứ tự web (hop-thu/index.tsx:267-281) – liên kết, khoảng thời gian, Tòa án, trạng thái đọc; không gồm thư mục, nhãn, hồ sơ, từ khóa */
function htTomTat(loc, coLk) {
  var r = [], ngay = function (s) { return s ? s.split('-').reverse().join('-') : '…'; };
  if (coLk) r.push('văn bản được chọn từ liên kết');
  if (loc.khoang !== 'all') r.push(loc.khoang === 'custom' && (loc.tu || loc.den) ? ngay(loc.tu) + ' – ' + ngay(loc.den) : IB_KHOANG.filter(function (x) { return x[0] === loc.khoang; })[0][2]);
  if (loc.toa !== 'all') r.push(loc.toa);
  if (loc.doc === 'unread') r.push('chưa đọc'); else if (loc.doc === 'read') r.push('đã đọc');
  return r;
}
/* 3A.1: số văn bản còn hạn xử lý (mẫu: văn bản có hạn, chưa lưu trữ, chưa quá hạn – web lấy từ Quản lý thời hạn: khẩn cấp + sắp tới hạn + trong hạn) */
function htSoCoHan() { return IB.filter(function (m) { return m.han && !m.arch && ibCon(m) >= 0; }).length; }
/* 3D.1: tải tệp – thành công không thông báo (trình duyệt tự tải tệp mẫu); tệp lỗi mẫu → thanh lỗi "Không tải được tệp." (lỗi gọi máy chủ) */
function htTaiTep(name, chacChan) {
  if (IB_LOI_TEP[name] && !chacChan) { if (window.__ptSnackLoi) window.__ptSnackLoi('Không tải được tệp.'); return; }
  try {
    var pdf = /\.pdf$/i.test(name), nd = pdf ? '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n' : 'Tep mau cua prototype TATC';
    var url = URL.createObjectURL(new Blob([nd], { type: pdf ? 'application/pdf' : 'application/octet-stream' })), a = document.createElement('a');
    a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  } catch (e) { /* không tải được trong môi trường xem trước: bỏ qua, không thông báo */ }
}
function htXemDuoc(name) { return /\.(pdf|png|jpe?g|gif|webp|bmp|svg|mp4|webm|mov|mp3|wav|ogg|m4a)$/i.test(name); }
function htTai(chu) { return h('div', { className: 'ht-tai', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), h('span', null, chu)); }
/* Thử lại (3C.1): sang màn đang tải, màn đang tải tự chuyển về màn dữ liệu sau ~0,7 giây (chỉ khi đi từ Thử lại) */
function htThuLai(den) { window.__ibThuLai = true; if (window.__ptGo) window.__ptGo('replace:' + den); }
function htTuChuyen(tai, den) {
  React.useEffect(function () {
    if (!tai || !window.__ibThuLai) return;
    window.__ibThuLai = false; var t = setTimeout(function () { if (window.__ptGo) window.__ptGo('replace:' + den); }, 700);
    return function () { clearTimeout(t); };
  }, []);
}
/* 3C.1: hồ sơ mẫu thêm để bảng chọn "Hồ sơ, vụ án" có trên 10 mục (không đặt mã mới – dữ liệu hệ thống để trong ngoặc vuông) */
var HT_HS_THEM = [1, 2, 3, 4, 5, 6, 7, 8].map(function (i) { return { id: 'x' + i, name: '[Mã hồ sơ] · [Tên vụ án]' }; }).concat([{ id: 'x9', name: '[Mã hồ sơ] · Vụ án' }, { id: 'x10', name: '[Mã hồ sơ] · Đơn' }]);

/* 3A.1 + 3A.2: khối "Hộp thư tống đạt" ở Trang chủ (web trang-chu/index.tsx:537-610) – tiêu đề + "{tổng} văn bản" + nút Mở hộp thư; biểu đồ tròn Chưa đọc / Đã đọc;
   dải "{n} văn bản có hạn xử lý"; khối "ĐÃ ĐÁNH DẤU (n)" thu gọn mặc định, tối đa 3 văn bản quan trọng */
function htDonut(chua, da) {
  var t = chua + da, pc = t ? chua * 100 / t : 0, r = 15.9155;
  return h('span', { className: 'ht-donut' },
    h('svg', { viewBox: '0 0 36 36', 'aria-hidden': 'true' },
      h('circle', { cx: 18, cy: 18, r: r, className: 'ht-d-da' }),
      pc ? h('circle', { cx: 18, cy: 18, r: r, className: 'ht-d-chua', strokeDasharray: pc + ' ' + (100 - pc), strokeDashoffset: 25 }) : null),
    h('b', { className: 'tp-num' }, t));
}
function HomeHopThu(p) {
  var mo = React.useState(!!p.ghimMo), rr = React.useState(0);
  var tong = IB.length, chua = ibSoChuaDoc(), da = tong - chua, coHan = htSoCoHan();
  var ghim = IB.filter(function (m) { return m.star && !m.arch; }).slice(0, 3);
  var veHt = function () { IB_UI.folder = 'inbox'; IB_UI.lk = null; };
  return h('section', { className: 'ph-blk ht-home', 'aria-label': 'Hộp thư tống đạt' },
    h('div', { className: 'ph-blk-head' }, h('h3', null, 'Hộp thư tống đạt', h('small', { className: 'tp-num' }, tong + ' văn bản')),
      h('span', { className: 'ht-home-mo', onClickCapture: veHt }, h(T.IconButton, { icon: 'arrowRight', label: 'Mở hộp thư', className: 'xa-ib' }))),
    h('div', { className: 'ht-home-c' }, htDonut(chua, da),
      h('ul', { className: 'ht-lg' }, [['Chưa đọc', chua, 'ht-lg-chua'], ['Đã đọc', da, 'ht-lg-da']].map(function (x) {
        return h('li', { key: x[0] }, h('i', { className: x[2], 'aria-hidden': 'true' }), h('span', null, x[0]), h('b', { className: 'tp-num' }, x[1]));
      }))),
    coHan > 0 ? h('button', { type: 'button', className: 'ht-home-han', 'data-pt-go': 'tab:inbox', onClickCapture: veHt }, h(T.Icon, { name: 'clock' }), h('span', null, coHan + ' văn bản có hạn xử lý'), h(T.Icon, { name: 'arrowRight' })) : null,
    h('div', { className: 'ht-ghim' },
      h('button', { type: 'button', className: 'ht-ghim-h', 'aria-expanded': mo[0], onClick: function () { mo[1](!mo[0]); } }, h('span', null, 'ĐÃ ĐÁNH DẤU' + (ghim.length ? ' (' + ghim.length + ')' : '')), h('i', { 'aria-hidden': 'true' }), h(T.Icon, { name: 'chevronDown' })),
      mo[0] && ghim.length ? h('ul', { className: 'ht-ghim-l' }, ghim.map(function (m) {
        var k = IB.indexOf(m);
        return h('li', { key: k, className: 'ht-ghim-r' },
          h('button', { type: 'button', className: 'ht-ghim-sao', 'aria-label': 'Bỏ đánh dấu theo dõi', title: 'Bỏ đánh dấu theo dõi', onClick: function () { if (p.ghimLoi) { if (window.__ptSnackLoi) window.__ptSnackLoi('Không cập nhật được đánh dấu'); return; } m.star = false; rr[1](rr[0] + 1); } }, h(T.Icon, { name: 'star' })),
          h('button', { type: 'button', className: 'ht-ghim-b', 'aria-label': 'Mở văn bản: ' + (m.t || m.so), 'data-pt-go': 'mailDetail', onClickCapture: function () { window.__ibSel = k; window.__ibTuDs = null; } },
            h('span', { className: 'ht-ghim-tx' }, h('small', { className: 'tp-num' }, m.don || m.va || '—'), h('b', null, m.t || m.so)),
            h('span', { className: 'ht-ghim-tt' }, '[Tên trạng thái]')));
      })) : null));
}
/* 3D.4: nút thủ tục vụ việc phá sản trên văn bản (M01-UC-116, web nut-xxl.tsx) – 4 trạng thái: chưa soạn / đang soạn dở / đã gửi / quá hạn */
function HtXxl(tt) {
  var nd = tt === 'gui' ? h(T.StatusBadge, { tone: 'success', icon: false }, 'Đã gửi · [Số tiếp nhận]')
    : tt === 'het' ? h(T.StatusBadge, { tone: 'neutral', icon: false }, 'Đã hết hạn')
    : h(T.Button, { block: true, 'data-pt-go': 'xxl1' }, tt === 'tiep' ? 'Tiếp tục' : 'Đề nghị xem xét lại QĐ mở / không mở thủ tục phá sản');
  return h('section', { className: 'ph-blk ht-xxl' }, nd);
}
/* 3C.1: màn xem tệp – đang tải bản số hóa; định dạng không xem trực tiếp được (nút Tải về) */
function AttachmentTai() {
  var name = window.__ibFile || '[Số quyết định].pdf';
  return Sub(name, htTai('Đang tải bản số hóa…'));
}
function AttachmentKhongXem() {
  var name = window.__ibFile && !htXemDuoc(window.__ibFile) ? window.__ibFile : 'Phu-luc-02.docx';
  return Sub(name, h('div', { className: 'pdf-err ht-khongxem' }, h(T.Icon, { name: 'file' }), h('p', null, 'Định dạng này chưa xem trực tiếp được. Vui lòng tải về để mở.'),
    h(T.Button, { variant: 'secondary', icon: 'download', onClick: function () { htTaiTep(name); } }, 'Tải về')));
}

/* ===== 3D.4 (người dùng 22/11): màn soạn UC-116 PS-02 "Đề nghị xem xét lại quyết định mở / không mở thủ tục phá sản" theo web
   /vu-viec/$id/phps-xxl (form/index.tsx, buoc-nguoi-gui, buoc-noi-dung, buoc-tai-lieu; trường TG-01 theo LoaiVanBanXxl.fXxl()).
   Người dùng 22/11: vẽ theo mẫu Soạn đơn (WzSd, TlSd, RvKhoi, KyGuiSd, OkSd), tiêu đề không viết tắt; 5 bước như web. ===== */
var XXL_TEN = 'Đề nghị xem xét lại quyết định mở / không mở thủ tục phá sản';
var XXL_STEPS = ['Người gửi', 'Nội dung', 'Tài liệu', 'Xem lại', 'Ký số'];
var XXL_DN = ['Hủy toàn bộ', 'Sửa đổi một phần', 'Xem xét lại và ra văn bản khác'];
var XXL_PV = ['Tham gia toàn bộ thủ tục phá sản, phục hồi', 'Riêng văn bản này'];
var XXL_CC = 'Quyết định mở thủ tục phá sản số [Số quyết định]';
var XXL_NC = [['Vụ việc', 'PS-2026-0001 · Công ty TNHH Thương mại Minh Phát'], ['Văn bản căn cứ', XXL_CC], ['Hạn thực hiện', '[Hạn thực hiện]'], ['Gửi đến', 'Chánh án Tòa án đang giải quyết · ' + COURT1]];
function XxlWz(n, body, last) { return WzSd({ title: XXL_TEN, steps: XXL_STEPS, n: n, go: 'xxl' + (n + 1), body: body, last: last }); }
function Xxl1(p) {
  var tc = laTC(), c = React.useState(p.uq ? 'UY_QUYEN' : (tc ? 'DAI_DIEN_PL' : 'TU_THUC_HIEN'));
  var items = tc
    ? [{ id: 'DAI_DIEN_PL', t: 'Người đại diện theo pháp luật của ' + TC_TEN, d: 'Theo thông tin đăng ký doanh nghiệp, hợp tác xã' }, { id: 'UY_QUYEN', t: 'Người được ' + TC_TEN + ' ủy quyền', d: 'Cần tải giấy ủy quyền' }]
    : [{ id: 'TU_THUC_HIEN', t: 'Tự mình thực hiện', d: 'Gửi với tư cách chủ nợ' }, { id: 'UY_QUYEN', t: 'Người được ủy quyền', d: 'Cần tải giấy ủy quyền' }];
  return XxlWz(1, h(F, null,
    FCard('Văn bản', RvKV(XXL_NC), true),
    FCard('Người gửi', h(F, null, P('Thông tin lấy từ tài khoản định danh và hồ sơ vụ việc do Tòa án đồng bộ.', 'ph-muted'),
      h(RvKhoi, { t: 'Đương sự', ro: true }, RvKV(tc
        ? [['Tên doanh nghiệp, hợp tác xã', TC_TEN], ['Mã số thuế', '[Mã số thuế]'], ['Tư cách tham gia vụ việc', 'Chủ nợ'], ['Điện thoại', '[Điện thoại]'], ['Địa chỉ', '[Địa chỉ]']]
        : [['Họ và tên', 'Hoàng Dương'], ['Số CCCD', '[Số CCCD]'], ['Tư cách tham gia vụ việc', 'Chủ nợ'], ['Điện thoại', '[Điện thoại]'], ['Địa chỉ', '[Địa chỉ]']])),
      h(RvKhoi, { t: 'Người thực hiện', ro: true }, RvKV([['Họ và tên', tc ? '[Họ và tên]' : 'Hoàng Dương'], ['Chức danh', tc ? '[Chức danh]' : ''], ['Số CCCD', '[Số CCCD]'], ['Điện thoại', '[Điện thoại]'], ['Thư điện tử', '[Thư điện tử]']]))), true),
    FCard('Tư cách gửi văn bản', h(ChonThe, { label: 'Tư cách gửi văn bản', v: c[0], onPick: c[1], items: items }), true),
    c[0] === 'UY_QUYEN' ? FCard('Thông tin ủy quyền', h(F, null,
      Tf('Số văn bản ủy quyền', { required: true }), Tf('Ngày ủy quyền', Dt({ required: true })),
      h(SelSheet, { label: 'Phạm vi ủy quyền', req: true, opts: XXL_PV, v: XXL_PV[0] }),
      h('div', { className: 'xxl-tep' }, Lbl('Giấy ủy quyền', 1), h(T.FileUpload, { kho: false, max: 1, uploadLabel: 'Tải lên giấy ủy quyền', hint: 'PDF, JPG, PNG · tối đa 10MB' }))), true) : null));
}
function Xxl2(p) {
  var m = React.useState(p.tai ? 'tai' : 'nhap'), kd = React.useState(''), cl = React.useState(''), tt = React.useState('');
  return XxlWz(2, FCard('Nội dung văn bản', h(F, null,
    h(T.SegmentedControl, { label: 'Cách tạo văn bản', value: m[0], onChange: m[1], options: [{ value: 'nhap', label: 'Nhập thông tin' }, { value: 'tai', label: 'Tải đơn có sẵn' }] }),
    m[0] === 'nhap'
      ? h(F, null, RvKV([['Quyết định đề nghị xem xét lại', XXL_CC + ' ngày 20-10-2026']]),
          n7Tf('Nội dung không đồng ý', kd, { required: true, max: 4000 }), n7Tf('Căn cứ, lý do đề nghị', cl, { required: true, max: 4000 }),
          h(SelSheet, { label: 'Đề nghị Tòa án', req: true, opts: XXL_DN }))
      : h(F, null, h('div', { className: 'xxl-tep' }, Lbl('Văn bản đã soạn sẵn', 1), h(T.FileUpload, { max: 1, uploadLabel: 'Tải lên văn bản', hint: 'PDF, DOCX · tối đa 10MB' })),
          n7Tf('Tóm tắt nội dung', tt, { required: true, min: 20, max: 4000 }))), true));
}
function Xxl3() { return XxlWz(3, TlSd({ title: 'Tài liệu', desc: 'Tải lên tài liệu kèm theo văn bản. Định dạng PDF, JPG, PNG, DOCX · tối đa 10MB/tệp.' })); }
function Xxl4() {
  var cd = React.useState(false);
  return XxlWz(4, h(F, null,
    FCard('Xem lại và xác nhận', h(F, null, P('Kiểm tra lại thông tin trước khi chuyển sang ký số.', 'ph-muted'),
      h(RvKhoi, { t: 'Vụ việc', ro: true }, RvKV([['Mã hồ sơ vụ việc', 'PS-2026-0001'], ['Doanh nghiệp, hợp tác xã', 'Công ty TNHH Thương mại Minh Phát'], ['Loại vụ việc', 'Phá sản'], ['Tòa án đang giải quyết', COURT1], ['Thẩm phán', '[Thẩm phán]']])),
      h(RvKhoi, { t: 'Người gửi', go: 'xxl1' }, RvKV([['Đương sự', 'Hoàng Dương'], ['Tư cách tham gia vụ việc', 'Chủ nợ'], ['Người thực hiện', 'Hoàng Dương'], ['Tư cách gửi văn bản', 'Tự mình thực hiện']])),
      h(RvKhoi, { t: 'Văn bản căn cứ', ro: true }, RvKV([['Văn bản', XXL_CC], ['Ngày ban hành', '20-10-2026'], ['Hạn thực hiện', '[Hạn thực hiện]']])),
      h(RvKhoi, { t: 'Nội dung', go: 'xxl2' }, RvKV([['Nội dung không đồng ý', '[Nội dung không đồng ý]'], ['Căn cứ, lý do đề nghị', '[Căn cứ, lý do đề nghị]'], ['Đề nghị Tòa án', 'Hủy toàn bộ']])),
      h(RvKhoi, { t: 'Tài liệu kèm theo', go: 'xxl3' }, RvKV([['Tài liệu', 'Không có']]))), true),
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { label: 'Tôi cam đoan nội dung văn bản và tài liệu kèm theo là đúng sự thật.', checked: cd[0], onChange: function (e) { cd[1](e.target.checked); } }))),
    Btn('Tiếp tục ký số', 'primary', cd[0] ? { 'data-pt-go': 'xxl5' } : { disabled: true }));
}
function Xxl5() {
  return h(KyGuiSd, { title: XXL_TEN, steps: XXL_STEPS, ok: 'xxlOk', tep: ['De-nghi-xem-xet-lai-quyet-dinh-mo-thu-tuc-pha-san.pdf'], tepMeta: 'Bản in văn bản', vaiTro: 'Chủ nợ', sendLabel: 'Gửi Tòa án',
    kyMoTa: false /* người dùng 22/11: bỏ câu mô tả Ký số và hộp "Sau khi gửi" */ });
}
function XxlOk() {
  return h(OkSd, { title: 'Đã gửi đề nghị xem xét lại quyết định mở / không mở thủ tục phá sản', text: 'Kết quả xử lý hiện khi Tòa án gửi văn bản.',
    info: [['Số tiếp nhận', '[Số tiếp nhận]'], ['Trạng thái', 'Đã gửi, chờ Tòa án xử lý']],
    btns: Btn('Về chi tiết vụ việc', 'primary', { 'data-pt-go': 'reset:records,proceedings,proceedingDetail' }) });
}

/* ===== Đối chiếu web – prototype (demo 21/11/2026), Đợt 4 – Vụ án (4A.1 … 4F.4) ===== */
/* 4B.1: màu ô viết tắt theo loại án (web LOAI_MAU, mặc định dan-su) – chỉ token design system */
var VA_LV = { DS: 'ds', VD: 'ds', PS: 'ds', HN: 'hn', KT: 'kd', KD: 'kd', HC: 'hc', LD: 'ld', ST: 'st', XL: 'xl' };
/* 4B.3 / 4D.4: tên bước tiến trình tố tụng – DM_DANHMUCCHUNG loại GIAI_DOAN_TO_TUNG (đã tra CSDL 21-11-2026), nhóm theo cấp, sắp theo mã */
var VA_GD = { ST: ['Nộp, tiếp nhận đơn', 'Xem xét, xử lý đơn', 'Hòa giải, đối thoại tại Tòa án (trước thụ lý)', 'Thụ lý', 'Chuẩn bị xét xử', 'Xét xử sơ thẩm', 'Kết thúc sơ thẩm'],
  PT: ['Kháng cáo', 'Thụ lý phúc thẩm', 'Chuẩn bị xét xử phúc thẩm', 'Xét xử phúc thẩm', 'Kết thúc phúc thẩm'] };
/* 4A.2: phiên gần nhất (dữ liệu máy chủ trả – mẫu) */
var VA_PGN = { id: 'PT-DS-2026-0012-1', ma: 'DS-2026-0012', ten: 'Tranh chấp hợp đồng vay tài sản', tieuDe: 'Phiên tòa sơ thẩm — Tranh chấp hợp đồng vay tài sản', moTa: 'DS-2026-0012 · 06-11-2026 14:00 · Phòng xử án số 1' };
var VA_PGN2 = { id: 'PT-DS-2026-0039-1', ma: 'DS-2026-0039', ten: 'Tranh chấp bồi thường thiệt hại do tài sản gây ra', tieuDe: 'Phiên tòa sơ thẩm — Tranh chấp bồi thường thiệt hại do tài sản gây ra', moTa: 'DS-2026-0039 · 12-11-2026 08:30 · Phòng xử án số 3' };
(function () {
  /* 4B.2: ngày thụ lý DD-MM-YYYY */
  VA.concat(VV).forEach(function (v) { if (v.thuLy) v.thuLy = v.thuLy.replace(/\//g, '-'); });
  VA[0].gs = 'GS-28'; VA[0].tinh = [GS['GS-28'], 'warning']; /* v602: vụ án mẫu có việc Cung cấp tài liệu → tình trạng GS-28 (người dùng chọn 25/11) */ VA[0].ph = ['06-11-2026 14:00', 'SAP_TOI'];
  VA[1].gs = 'GS-05'; VA[1].tinh = [GS['GS-05'], 'warning'];
  VA[2].gs = 'GS-04'; VA[2].tinh = [GS['GS-04'], 'neutral']; VA[2].gdI = 0;
  /* 4B.3: nhãn phiên 3 trạng thái (mẫu) */
  var dat = function (ma, ph) { var v = vaTim(ma); if (v) v.ph = ph; };
  dat('HC-2026-0015', ['10-11-2026 08:30', 'SAP_TOI']); dat('HC-2026-0016', ['02-11-2026 14:00', 'DANG_DIEN_RA']); dat('HC-2026-0017', ['28-10-2026 09:00', 'DA_KET_THUC']);
})();
function vaTim(ma) { return ma ? VA.concat(VV).filter(function (x) { return x.ma === ma; })[0] : null; }
function vaChon(ma) {
  var s = window.__vaSel || {}, v = vaTim(ma || s.ma);
  if (v) return v;
  return s.ma ? Object.assign({}, VA[0], { ma: s.ma, t: s.ten || VA[0].t, lv: s.ma.split('-')[0] }) : VA[0];
}
function vaNgay(s) { var m = /^(\d{2})-(\d{2})-(\d{4})/.exec(s || ''); return m ? new Date(+m[3], +m[2] - 1, +m[1]).getTime() : 0; }
function vaCapCur(v) { return (v.cap.filter(function (c) { return c[1] === 'cur'; })[0] || v.cap[v.cap.length - 1] || ['Sơ thẩm'])[0]; }
function vaGd(v) {
  if (!v || !v.cap || v.lv === 'PS') return null;
  var pt = /Phúc/.test(vaCapCur(v)), g = v.gs || '';
  if (pt) return { steps: VA_GD.PT, cur: v.gdI != null ? v.gdI : g === 'GS-17' ? 2 : g === 'GS-18' ? 3 : g === 'GS-21' ? 4 : 1 };
  return { steps: VA_GD.ST, cur: /^(GIU|RS-)/.test(g) ? 1 : /GS-(02|10|11|12)/.test(g) ? 5 : /GS-(04|06|09)/.test(g) ? 6 : 4 };
}
function vaTinhTone(t) { return t === 'neutral' ? 'neutral' : t || 'info'; }
/* ô viết tắt loại án */
function VaO(p) { return h('span', { className: 'va4-o va4-lv-' + (VA_LV[p.v.lv] || 'ds') + (p.nho ? ' va4-o-sm' : ''), 'aria-hidden': 'true' }, p.v.lv); }
/* 4B.1 / 4C.1: nút sao chép mã vụ án – thành công: đổi dấu tích tạm thời (không thanh thông báo đáy) */
function VaCopy(p) {
  var s = React.useState(p.ok0 ? 'ok' : null);
  return h('span', { className: 'va4-cp' }, h('button', { type: 'button', className: 'va4-cp-b' + (s[0] ? ' va4-cp-ok' : ''), 'aria-label': s[0] ? 'Đã sao chép mã vụ án' : 'Sao chép mã vụ án',
    onClick: function (e) { e.stopPropagation(); s[1]('ok'); if (!p.ok0) setTimeout(function () { s[1](null); }, 2500); } }, h(T.Icon, { name: s[0] ? 'check' : 'copy' })),
    s[0] ? h('small', { className: 'tp-sr', role: 'status' }, 'Đã sao chép') /* người dùng 22/11 (4B.1): chỉ hiện dấu tích, chữ chỉ cho trình đọc màn hình */ : null);
}
/* 4B.3: chuỗi cấp – cấp đã qua dấu tích, cấp hiện tại (phần tử cuối) chấm tròn */
function VaChuoi(p) {
  var n = p.cap.length;
  return h('span', { className: 'va4-chuoi' }, p.cap.map(function (c, i) {
    return h(F, { key: i }, i ? h('span', { className: 'va4-chuoi-s', 'aria-hidden': 'true' }, '›') : null,
      h('span', { className: 'va4-chuoi-i va4-chuoi-' + (i === n - 1 ? 'cur' : 'done') }, i === n - 1 ? h('i', { className: 'va4-chuoi-dot', 'aria-hidden': 'true' }) : h(T.Icon, { name: 'check' }), c[0]));
  }));
}
/* 4B.3: nhãn phiên theo trạng thái – tính theo ngày */
function VaPhien(ph) {
  var k = ph[1] === 'DANG_DIEN_RA' ? 'dang' : ph[1] === 'DA_KET_THUC' ? 'xong' : 'sap';
  return h('span', { className: 'va4-ph va4-ph-' + k }, h(T.Icon, { name: 'calendar' }), { dang: 'Đang diễn ra', xong: 'Đã kết thúc', sap: 'Phiên tòa' }[k] + ': ' + ph[0]);
}
/* 4B.3 / 4D.4: thanh tiến trình tố tụng (GiaiDoanStepper) – cuộn ngang, tự cuộn tới bước hiện tại */
function VaGdStep(p) {
  var ref = React.useRef(null);
  React.useEffect(function () { var el = ref.current; if (!el) return; /* người dùng 22/11 (4B.3): bước đầu không bị che – cuộn tới đúng mép một bước (bước trước bước hiện tại) */
    var li = el.children, cur = p.cur, max = el.scrollWidth - el.clientWidth, s = Math.max(0, cur - 1); if (max <= 0 || !li[s]) return;
    while (s > 0 && li[s].offsetLeft > max) s--; el.scrollLeft = li[s].offsetLeft; }, []);
  return h('ol', { ref: ref, className: 'va4-gd', 'aria-label': p.label || 'Tiến trình tố tụng' }, p.steps.map(function (s, i) {
    var st = i < p.cur ? 'done' : i === p.cur ? 'cur' : 'todo';
    return h('li', { key: i, className: 'va4-gd-' + st, 'aria-current': st === 'cur' ? 'step' : undefined }, h('i', { 'aria-hidden': 'true' }, st === 'done' ? h(T.Icon, { name: 'check' }) : i + 1), h('span', null, s));
  }));
}
/* 4A.4: dòng đang tải thêm ở cuối danh sách (cuộn tới thì nối 10 vụ) */
function VaMore(p) {
  var end = React.useRef(null), on = React.useRef(p.onMore); on.current = p.onMore;
  React.useEffect(function () { var el = end.current; if (p.tinh || !el || typeof IntersectionObserver === 'undefined') return;
    var t = null, ob = new IntersectionObserver(function (e) { if (e[0].isIntersecting && !t) t = setTimeout(function () { t = null; on.current(); }, 700); });
    ob.observe(el); return function () { ob.disconnect(); clearTimeout(t); }; }, []);
  return h('li', { ref: end, className: 'ph-loadmore ib-more va4-more', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), h('span', null, 'Đang tải danh sách vụ án…'));
}
function VaTai(t) { return h('div', { className: 'va4-tai', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), h('span', null, t)); }
function VaLoi(t, ma, them) {
  return h('div', { className: 'va4-loi-k' }, h(T.EmptyState, { goc: true, variant: 'center', icon: 'alert', title: t, text: ma === false ? undefined : 'Mã lỗi: [Mã lỗi]', className: 'nv-err' }),
    h('div', { className: 'va4-loi-b' }, h(T.Button, { size: 'sm', variant: 'secondary', icon: 'swap', className: 'va4-thulai' }, 'Thử lại'), them || null));
}
/* nút / mục bị khóa: dòng lý do hiện sẵn dưới nút (mobile không có tooltip) */
function VaLy(t) { return t ? h('p', { className: 'va4-ly' }, t) : null; }

/* ---------- 4A.1: thẻ "Vụ án của tôi" ở Trang chủ (Home của phần hopthu gọi) ---------- */
var VA_DN = ['dn0', 'dn1', 'dn2', 'dn3', 'dn4', 'dn5'];
function HomeVuAnCard(p) {
  p = p || {};
  var mo = React.useState(!!p.moGhim), rr = React.useState(0);
  var L = VA_LOC[2][2].slice(1), dem = L.map(function (n) { return VA.filter(function (v) { return v.tt[0] === n; }).length; }), tong = VA.length;
  var C = 2 * Math.PI * 44, acc = 0;
  var moLoc = function (i) { return function () { window.__vaTt = i + 1; }; };
  var ghim = VA.filter(function (v) { return v.ghim; });
  return h('section', { className: 'ph-blk va4-home' },
    h('div', { className: 'ph-blk-head va4-home-h' }, h('span', { className: 'va4-home-t' }, h('h3', null, 'Vụ án của tôi'), h('span', { className: 'va4-home-n tp-num' }, tong + ' vụ')),
      h('button', { type: 'button', className: 'va4-home-all', 'data-pt-go': 'cases', onClickCapture: function () { window.__vaTt = 0; } }, 'Xem tất cả vụ án →')),
    h('div', { className: 'va4-dn' },
      h('svg', { viewBox: '0 0 120 120', className: 'va4-dn-svg', role: 'img', 'aria-label': 'Biểu đồ vụ án theo trạng thái, tổng ' + tong + ' vụ' },
        h('circle', { cx: 60, cy: 60, r: 44, className: 'va4-dn-nen' }),
        dem.map(function (n, i) {
          if (!n) return null; var len = n / tong * C, off = -acc; acc += len;
          return h('circle', { key: i, cx: 60, cy: 60, r: 44, className: 'va4-dn-sl va4-' + VA_DN[i], strokeDasharray: len + ' ' + (C - len), strokeDashoffset: off, transform: 'rotate(-90 60 60)',
            onClick: function () { window.__vaTt = i + 1; window.__ptGo('cases'); } });
        }),
        h('text', { x: 60, y: 58, className: 'va4-dn-so' }, tong), h('text', { x: 60, y: 76, className: 'va4-dn-dv' }, 'vụ')),
      h('ul', { className: 'va4-lg' }, L.map(function (n, i) {
        return h('li', { key: n }, h('button', { type: 'button', className: 'va4-lg-it', 'aria-label': 'Xem danh sách: ' + n, 'data-pt-go': 'cases', onClickCapture: moLoc(i) },
          h('i', { className: 'va4-' + VA_DN[i], 'aria-hidden': 'true' }), h('span', null, n), h('b', { className: 'tp-num' }, dem[i])));
      }))),
    h('div', { className: 'va4-pin' },
      h('button', { type: 'button', className: 'va4-pin-t', 'aria-expanded': mo[0], onClick: function () { mo[1](!mo[0]); } }, h('span', null, 'ĐÃ ĐÁNH DẤU' + (ghim.length ? ' (' + ghim.length + ')' : '')), h('i', { 'aria-hidden': 'true' }), h(T.Icon, { name: 'chevronDown', className: mo[0] ? 'va4-up' : undefined })),
      mo[0] && ghim.length ? h('ul', { className: 'va4-pin-l' }, ghim.slice(0, 3).map(function (v) {
        return h('li', { key: v.ma }, h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem vụ án ' + v.ma, 'data-pt-go': v.go, onClickCapture: function () { window.__vaSel = { ma: v.ma, ten: v.t }; } }),
          h(VaO, { v: v, nho: true }), h('div', { className: 'va4-pin-b' }, h('span', { className: 'va4-ma tp-num' }, v.ma),
            h('div', { className: 'va4-pin-r' }, h(T.StatusBadge, { tone: v.tt[1] }, v.tt[0]), h('span', { className: 'va4-pin-d' }, v.t))),
          h('button', { type: 'button', className: 'va4-pin-x', 'aria-label': 'Bỏ đánh dấu theo dõi', onClick: function () { v.ghim = false; rr[1](rr[0] + 1); } }, h(T.Icon, { name: 'star' })));
      })) : null));
}
/* màn demo Trang chủ có thẻ "Vụ án của tôi" (khi dựng riêng phần vuan, chưa có Home của phần hopthu) */
function HomeVaDemo(p) {
  return h(Phone, { cls: 'ph-main' }, HomeBg(), h(Body, { cls: 'tp-sheet ph-home-sheet' }, Blk('Theo dõi vụ án, vụ việc', h(RecList), { cls: 'hm-rec' }), h(HomeVuAnCard, p)), Nav('home'));
}

/* ---------- Chi tiết vụ án: khung màn (tab có chấm "Có mục mới", đầu màn chuyển tab được) ---------- */
function VaDt(o) {
  var tabsRef = React.useRef(null);
  React.useEffect(function () { var b = tabsRef.current && tabsRef.current.querySelector('.tp-tabs'), t = b && b.querySelector('.tp-tab-on'); if (!b || !t) return;
    var tr = t.getBoundingClientRect(), br = b.getBoundingClientRect(); b.scrollLeft += (tr.left + tr.width / 2) - (br.left + br.width / 2); }, [o.tab]);
  return h(Phone, { cls: 'ph-hd' }, h(T.AppBar, { variant: 'plain', title: 'Chi tiết vụ án', onBack: noop }),
    h(Body, { cls: 'ph-plain ph-steps dt-body' },
      h('section', { className: 'dt-head dt-head-don va4-head' }, o.head),
      o.pre ? h('section', { className: 'dt-pre va4-pre' }, o.pre) : null,
      h('div', { className: 'dt-tabs', ref: tabsRef }, h(T.Tabs, { label: 'Nội dung chi tiết vụ án', value: o.tab, onChange: o.setTab, items: o.tabs })),
      o.render(o.tab)),
    o.foot || null);
}
function vaTabs(p) {
  var cham = function (t) { return h(F, null, t, h('i', { className: 'va4-tdot', role: 'img', 'aria-label': 'Có mục mới' })); };
  return VA_TABS.filter(function (t) { return !(p.noJudg && t.key === 'judgments'); }).map(function (t) {
    return (t.key === 'don' || t.key === 'docs') && !p.khongCham ? { key: t.key, label: cham(t.label) } : t;
  });
}
/* 4C.1: đầu màn – ô viết tắt, mã + sao chép, loại án, nhãn trạng thái + tình trạng chi tiết, Vai trò của bạn, Xem bản án / quyết định đình chỉ; 4C.3 banner tạm đình chỉ trong thẻ đầu */
function VaHead(p) {
  var v = p.va, capI = v.cap.map(function (c) { return c[0]; }), cur = vaCapCur(v), allDone = v.cap.every(function (c) { return c[1] === 'done'; });
  var buoc = ['Thụ lý', 'Sơ thẩm', 'Phúc thẩm'], ci = allDone ? 3 : Math.max(1, buoc.indexOf(cur));
  return h(F, null,
    h('div', { className: 'va4-hd1' }, h('span', { className: 'va4-ma tp-num' }, vaMaDd(v)), /* v590: mã định danh HSVA; v583 (1.9): bỏ nút sao chép mã; v610: bỏ ô chữ viết tắt lĩnh vực, dòng mã · loại chữ thường xám như Chi tiết đơn */ v.loai ? h('span', { className: 'va4-loai' }, v.loai) : null),
    h('h1', null, v.t), VaNhapDong(v, true), /* v606 */
    h('div', { className: 'dt-badges' }, VaNhanTT(v), v.tinh ? VaNhanTinh(v, true) : null), /* v596: bộ màu trạng thái, tình trạng */
    /* v610 (PA 3B, 26/11/2026): khối xám Tư cách của bạn + Lần thụ lý hiện tại (web chi-tiet.tsx: cacLanThuLy[0].maVuAn ?? maVuAn, chỉ hiện khi có mã hồ sơ) */
    h('div', { className: 'va4-tcl' }, h('p', null, h(T.Icon, { name: 'user' }), 'Tư cách của bạn:', h('b', null, p.vaiTro || v.vt)),
      vaMaDd(v) !== v.ma ? h('p', null, h(T.Icon, { name: 'scale' }), 'Lần thụ lý hiện tại:', h('b', { className: 'tp-num' }, v.ma)) : null),
    p.banAn ? h(T.Button, { size: 'sm', icon: 'eye', className: 'va4-xba va4-xba-' + p.banAn, onClick: p.onBanAn }, p.banAn === 'dc' ? 'Xem quyết định đình chỉ' : 'Xem bản án') : null,
    h(T.CaseProgress, { label: 'Cấp xét xử', steps: buoc, current: ci }),
    false /* v539: 4C.3 không áp – banner tạm đình chỉ giữ ở khối nhắc gốc (p.top) */ && v.tt[0] === 'Tạm đình chỉ' ? h('div', { className: 'va4-tdc', role: 'status' }, h(T.Icon, { name: 'shield' }),
      h('div', null, h('b', null, 'Vụ án đang tạm đình chỉ giải quyết (Điều 214, 215 BLTTDS)'),
        h('p', null, 'Thời hạn tố tụng tạm dừng tính. Đương sự có quyền yêu cầu Tòa án tiếp tục giải quyết vụ án khi lý do tạm đình chỉ không còn.'),
        h(T.Button, { size: 'sm', icon: 'pen', className: 'va4-tdc-b', 'data-pt-go': 'dyc1_tdc' }, 'Đề nghị tiếp tục giải quyết vụ án'))) : null);
}
/* 4C.2: banner gợi ý hành động (máy chủ trả) – trước thanh tab */
function VaGoiY(g) {
  var tien = g.kieu === 'NOP_TIEN', k = tien ? 'tien' : g.kieu === 'KHAN' ? 'khan' : g.kieu === 'THONG_TIN' ? 'tt' : 'cb';
  return h('section', { key: g.t, className: 'va4-gy va4-gy-' + k, role: 'status' },
    h('div', { className: 'va4-gy-h' }, tien ? null : h(T.Icon, { name: 'scale' }), h('b', null, g.t)),
    g.d ? h('p', null, g.d) : null, g.gc && g.gc !== g.d ? h('p', { className: 'va4-gy-gc' }, g.gc) : null,
    g.nut ? h(T.Button, { size: 'sm', block: true, disabled: !!g.dis, className: 'va4-gy-b' + (g.dis ? ' va4-khoa' : ''), 'data-pt-go': g.dis ? undefined : g.go }, g.nut) : null,
    g.dis ? VaLy(g.lyDo || 'Chức năng đang được phát triển') : null);
}
var VA_GY = {
  kc: { kieu: 'CANH_BAO', t: 'Bản án sơ thẩm chưa có hiệu lực — thời hạn kháng cáo đến 12-11-2026 (còn 10 ngày)', d: 'Nếu không đồng ý với bản án, bạn có quyền kháng cáo trong thời hạn trên. Hết hạn mà không có kháng cáo, kháng nghị, bản án sẽ có hiệu lực pháp luật.', nut: 'Kháng cáo bản án (còn 10 ngày)', go: 'kc1' },
  tat: { kieu: 'THONG_TIN', t: '[Tiêu đề gợi ý]', d: '[Mô tả gợi ý]', nut: '[Nhãn nút]', dis: true },
  qua: { kieu: 'THONG_TIN', t: 'Đã hết thời hạn kháng cáo — hạn cuối 12-11-2026', d: 'Quá hạn vẫn nộp được, nhưng bạn phải trình bày lý do trở ngại khách quan và kèm tài liệu chứng minh; Tòa án sẽ xem xét có chấp nhận kháng cáo quá hạn hay không.', nut: 'Nộp đơn kháng cáo', go: 'kc1' },
  tien: { kieu: 'NOP_TIEN', t: '[Tiêu đề gợi ý nộp tiền]', d: '[Mô tả gợi ý nộp tiền]', nut: '[Nhãn nút nộp tiền]', go: 'dvcqgExt' }
};

/* ---------- 4D.1: tab Thông tin chung ---------- */
function VaTabInfo(p, va) {
  var cc = p.cc || 'con', khoa = cc === 'qua', ccT = { con: ' (còn 5 ngày)', hom: ' (hết hạn hôm nay)', qua: ' (đã quá 3 ngày)' }[cc];
  return h(F, null,
    /* 2A.2 (21/11, người dùng chọn PA-A): khối việc + 2 dòng khung viền Xem đơn, In / xuất hồ sơ */
    (function () { var han = cc === 'hom' ? '02-11-2026' : '07-11-2026';
      var viec = KhoiViec({ tone: khoa ? 'danger' : 'warning', t: 'Cung cấp tài liệu, chứng cứ theo yêu cầu của Tòa án', han: 'Hạn ' + han, con: { con: 'còn 5 ngày', hom: 'hết hạn hôm nay', qua: 'đã quá 3 ngày' }[cc],
        note: khoa ? 'Đã quá hạn cung cấp tài liệu, chứng cứ.' : null, btns: khoa ? null : [Btn('Cung cấp tài liệu, chứng cứ', 'primary', { icon: 'upload', 'data-pt-go': 'cc1' })] });
      var xem = function () { window.__ibFile = '[Hồ sơ vụ án].pdf'; };
      return h(VaViecDs, { els: vaViecTheoTt(va, p, viec) }); /* v602: việc theo MATRAN_BIEUMAU_HANHDONG (tình trạng × tư cách) */ })(),
    FCard('Các bên đương sự', h(F, null, /* v612: bỏ dòng đếm đương sự */
          h(NvCall, { tone: 'warning', icon: 'lock' }, 'Một số thông tin của đương sự khác được ẩn nhằm bảo vệ dữ liệu cá nhân.'), /* v597: ghi chú ẩn thông tin – khung cảnh báo đầu khối (PA A) */
      p.vaiTro ? h(DtParty, { vtNhan: 1, tat: 'NĐ', ten: 'Nguyễn Văn Hùng', vt: 'Nguyên đơn', rows: [['Số CCCD', '—'], ['Địa chỉ', '—']] }) : null, h(DtParty, { vtNhan: 1, tat: p.vaiTro === 'Bị đơn' ? 'BĐ' : p.vaiTro ? 'LQ' : 'NĐ', ten: 'Hoàng Dương', ban: true, vt: p.vaiTro || va.vt, rows: [['Số CCCD', h('span', { className: 'tp-num' }, '001090012345')], ['Người đại diện / ủy quyền', '—'], ['Người bảo vệ lợi ích hợp pháp', '—'], ['Địa chỉ', 'Số 8 Phạm Hùng, Phường Từ Liêm, Thành phố Hà Nội']] }),
      p.vaiTro === 'Bị đơn' ? null : h(DtParty, { vtNhan: 1, tat: 'BĐ', ten: 'Trần Văn Bình', vt: 'Bị đơn', rows: [['Số CCCD', '—'], ['Người đại diện / ủy quyền', '—'], ['Địa chỉ', '—']] }),
      p.vaiTro && p.vaiTro !== 'Bị đơn' ? null : h(DtParty, { vtNhan: 1, tat: 'LQ', ten: 'Lê Thị Hoa', vt: 'Người có quyền lợi, nghĩa vụ liên quan', rows: [['Số CCCD', '—'], ['Địa chỉ', '—']] }),
      h(VaActs)), true),
    FCard('Tòa án & hội đồng xét xử', RvKV([['Tòa án đang giải quyết', va.toa || COURT1], ['Thẩm phán / HĐXX', 'Trần Văn Anh'], ['Cấp xét xử hiện tại', vaCapCur(va)], ['Số thụ lý giai đoạn hiện tại', h('span', { className: 'tp-num' }, '12/2026/TLST-DS')], ['Ngày thụ lý giai đoạn hiện tại', va.thuLy]]), true),
    FCard('Định danh & tình trạng vụ án', RvKV([['Mã định danh', h('span', { className: 'tp-num' }, vaMaDd(va))] /* v590 */, ['Loại án', va.loai], ['Trạng thái vụ án', va.tt[0]], ['Số giai đoạn đã qua', va.cap.length + ' giai đoạn'], ['Quan hệ tranh chấp', va.t]]), true),
    FCard('Án phí', p.noFee ? P('Chưa phát sinh khoản án phí', 'ph-muted') : h('div', { className: 'dt-fee' }, h('div', null, h('b', null, 'Tạm ứng án phí sơ thẩm'), h('small', null, 'Hạn nộp 30-10-2026')),
      h('div', { className: 'dt-fee-r' }, h('b', { className: 'tp-num' }, '1.250.000 đ'), h(T.StatusBadge, { tone: 'warning', icon: false }, 'Chưa nộp'))), true));
}

/* ---------- 4D.2: tab Đơn trong vụ án ---------- */
function vaXemTep(ten) { return function () { window.__ibFile = ten; }; }
/* xin-sua (hopthu, 3A.2): mọi lối "Xem văn bản", "Mở ở Hộp thư", "Xem văn bản gốc" mở văn bản tống đạt tương ứng (màn mailDetail, mở từ liên kết) */
function vaIbIdx(t, so, ngay, moi) { var k = -1; IB.forEach(function (x, j) { if (k < 0 && x.t === t && x.va === 'DS-2026-0012') k = j; }); return k >= 0 ? k : 1000 + vbReg({ t: t, so: so, tg: ngay, moi: moi }); }
function vaMoVb(t, so, ngay, moi) { return function () { window.__ibSel = typeof t === 'number' ? t : vaIbIdx(t, so, ngay, moi); window.__ibTuDs = null; }; }
function VaDonRow(d) {
  return h('li', { key: d.t + (d.sub || ''), className: 'va4-dr' + (d.mo ? ' va4-dr-mo' : '') },
    h('div', { className: 'va4-dr-b' }, d.tag ? h('span', { className: 'va4-chip' }, d.tag) : null, h('b', null, d.t), d.sub ? h('small', null, d.sub) : null, d.tt ? h(T.StatusBadge, { tone: d.tt[1], icon: false }, d.tt[0]) : null, d.loi ? h('p', { className: 'va4-ly va4-ly-do' }, d.loi) : null),
    d.nut ? h(T.Button, { size: 'sm', variant: 'secondary', 'data-pt-go': d.nut[1], onClickCapture: d.nut[2] }, d.nut[0]) : null);
}
function VaTabDon(p) {
  return h(F, null,
    Blk('Đơn trong vụ án', P('Đơn khởi kiện, đơn phản tố, đơn yêu cầu độc lập cùng được giải quyết trong vụ án này, và đơn kháng cáo đã nộp cho bản án / quyết định của vụ án.', 'ph-muted')),
    Blk('Đơn gốc của vụ án', p.donNoGoc ? h('div', { className: 'va4-ng' }, h(T.Icon, { name: 'file' }), h('b', null, 'Không có đơn khởi kiện nộp trực tuyến'),
        P('Vụ án này được thụ lý từ hồ sơ nộp trực tiếp tại Tòa án hoặc bạn tham gia với tư cách Bị đơn / Người có quyền lợi, nghĩa vụ liên quan. Thông tin đơn khởi kiện được Tòa án tống đạt kèm thông báo thụ lý vụ án theo Điều 196 BLTTDS.', 'ph-muted'))
      : h('div', { className: 'va4-dg' },
        h('div', { className: 'va4-dg-h' }, h('span', { className: 'va4-chip va4-chip-kk' }, 'Đơn khởi kiện'), h('span', { className: 'tp-num va4-dg-ma' }, 'TN-20261020-0012')),
        h('div', { className: 'dt-badges' }, h(T.StatusBadge, { tone: 'info', icon: false }, 'Đã gửi đơn'), h(T.StatusBadge, { tone: 'success', icon: false }, 'Đã thụ lý')),
        h('div', { className: 'va4-dg-ng' }, h('span', { className: 'va4-o va4-o-sm va4-lv-xl', 'aria-hidden': 'true' }, 'HD'), h('div', null, h('b', null, 'Hoàng Dương ', h('span', { className: 'va4-chip va4-chip-ban' }, 'Bạn')), h('small', null, 'Nguyên đơn · Ngày nộp 20-10-2026'))),
        h('p', { className: 'va4-dg-yc' }, 'Buộc ông Trần Văn Bình trả 400.000.000 đồng tiền gốc còn nợ và tiền lãi chậm trả.'),
        h(T.Button, { size: 'sm', variant: 'secondary', block: true, 'data-pt-go': 'attachment', onClickCapture: vaXemTep('don-khoi-kien-TN-20261020-0012.pdf') }, 'Xem chi tiết →'))),
    Blk('Đơn yêu cầu khác đã nộp', h('ul', { className: 'va4-drl' },
      VaDonRow({ t: 'Đơn yêu cầu, đề nghị khác trong tố tụng', sub: '[Mã loại việc] · [Số tiếp nhận] · Ngày nộp 25-10-2026 09:15', tt: ['Đã gửi', 'info'], nut: ['Xem chi tiết →', 'attachment', vaXemTep('don-yeu-cau-khac.pdf')] }),
      VaDonRow({ t: 'Đơn yêu cầu, đề nghị khác trong tố tụng', mo: true }))),
    Blk('Bản nháp của bạn', h('ul', { className: 'va4-drl' },
      VaDonRow({ tag: '[Mã loại việc]', t: 'Đơn yêu cầu, đề nghị khác trong tố tụng', sub: 'Lưu tạm 26-10-2026 10:20', tt: ['Lưu nháp', 'neutral'], nut: ['Soạn tiếp', 'dyc1'] }),
      VaDonRow({ tag: '[Mã loại việc]', t: 'Đề nghị Tòa án xác minh, thu thập tài liệu, chứng cứ', sub: 'Lưu tạm 18-10-2026 08:45', tt: ['Lưu nháp', 'neutral'], loi: 'Đã quá hạn nộp, không thể soạn tiếp' }))),
    Blk('Giao nộp / sao gửi / cung cấp tài liệu, chứng cứ', h('ul', { className: 'va4-drl' },
      VaDonRow({ tag: 'Giao nộp tài liệu, chứng cứ', t: 'Biên nhận BN-2026-0105', sub: 'Đã gửi 24-10-2026 15:30 · Bạn', nut: ['Xem đơn', 'attachment', vaXemTep('bien-nhan-BN-2026-0105.pdf')] }),
      VaDonRow({ tag: 'Sao gửi tài liệu, chứng cứ', t: 'Trần Văn Bình — Bị đơn', sub: 'Đã gửi 25-10-2026 08:00 · Bạn', nut: ['Xem đơn', 'attachment', vaXemTep('sao-gui-tai-lieu.pdf')] }))));
}

/* ---------- 4D.3: Tạo đơn liên quan – nút ghim + bảng từ đáy (cách mobile v251), nội dung theo web ---------- */
var VA_TAO4 = [
  ['Đơn liên quan đến vụ án', 'Rút đơn khởi kiện, sửa đổi, bổ sung và thay đổi, rút yêu cầu khởi kiện', 'g1', [
    { k: 'rut', t: 'Yêu cầu rút đơn khởi kiện', d: 'Đề nghị Tòa án cho rút toàn bộ đơn khởi kiện trong quá trình giải quyết vụ án', go: 'rd1', ic: 'logout', gd: 'ts' },
    { k: 'tr', t: 'Thay đổi, rút một phần yêu cầu khởi kiện', d: 'Sửa đổi nội dung yêu cầu, bổ sung yêu cầu mới, hoặc bỏ bớt yêu cầu', go: 'tr1', ic: 'swap', gd: 's' }]],
  ['Đơn liên quan biện pháp khẩn cấp tạm thời', 'Áp dụng, thay đổi hoặc hủy bỏ biện pháp khẩn cấp tạm thời', 'g2', [
    { t: 'Yêu cầu áp dụng biện pháp khẩn cấp tạm thời', d: 'Bảo vệ tài sản, chứng cứ hoặc giữ nguyên tình trạng hiện có', go: 'bp1', ic: 'shield', gd: 'ts' },
    { t: 'Đề nghị thay đổi biện pháp đang áp dụng', d: 'Đổi sang biện pháp khác, thu hẹp hoặc mở rộng phạm vi áp dụng', go: 'bpt1', ic: 'pen', gd: 's' },
    { t: 'Đề nghị hủy bỏ biện pháp đang áp dụng', d: 'Chấm dứt hoàn toàn biện pháp vì lý do áp dụng không còn', go: 'bph1', ic: 'x', gd: 's' }]],
  ['Đơn liên quan án phí, lệ phí, chi phí tố tụng', 'Miễn, giảm tạm ứng và các đề nghị về chi phí trong quá trình giải quyết', 'g3', [
    { k: 'mg', t: 'Đề nghị miễn, giảm tạm ứng án phí', d: 'Đề nghị Tòa án miễn, giảm tạm ứng án phí theo thông báo nộp tiền đã nhận', go: 'mg1', ic: 'wallet', gd: 's' },
    { t: 'Đề nghị về chi phí tố tụng', d: 'Chi phí giám định, định giá, người làm chứng, người phiên dịch', go: 'dyc1_gd', ic: 'wallet', gd: 's' }]],
  ['Đơn yêu cầu khác', 'Yêu cầu, đề nghị phát sinh trong tố tụng và các thủ tục riêng', 'g4', [
    { k: 'dyc', t: 'Đơn yêu cầu, đề nghị khác trong tố tụng', d: 'Hoãn phiên tòa · chứng cứ · người làm chứng · giám định, định giá · tạm đình chỉ', go: 'dyc1', ic: 'pen', gd: 's' }]],
  ['Giao nộp & sao gửi tài liệu, chứng cứ', 'Nộp bổ sung tài liệu, chứng cứ cho vụ án và thực hiện nghĩa vụ sao gửi cho đương sự khác', 'g5', [
    { k: 'gn', t: 'Giao nộp tài liệu, chứng cứ cho vụ án', d: 'Nộp bổ sung tài liệu, chứng cứ cho hồ sơ vụ án đang giải quyết (Điều 96 BLTTDS)', go: 'evidence2', ic: 'upload', gd: 's' },
    { k: 'gn', t: 'Sao gửi tài liệu, chứng cứ cho đương sự khác', d: 'Tự sao gửi hoặc đề nghị Tòa án hỗ trợ khi không tự thực hiện được (Khoản 5 Điều 96, Khoản 9 Điều 70)', go: 'sg1', ic: 'send', gd: 's' }]]];
/* trạng thái vụ án: 'dgq' đang giải quyết | 'tdc' tạm đình chỉ | 'xong' đã giải quyết; nhomKK: người dùng thuộc nhóm khởi kiện */
function vaTaoMuc(x, tt, nhomKK) {
  if (x.k === 'rut') return (tt === 'dgq' || tt === 'tdc') && nhomKK ? {} : null;
  if (x.k === 'tr') return tt !== 'dgq' && tt !== 'tdc' ? { khoa: 'Chỉ thao tác được khi vụ án ở trạng thái "Đang giải quyết" hoặc "Tạm đình chỉ".' } : !nhomKK ? { khoa: 'Chỉ người khởi kiện, đồng khởi kiện, người yêu cầu hoặc người đại diện của họ mới được thao tác.' } : {};
  if (x.k === 'mg') return tt === 'dgq' ? {} : { khoa: 'Đã hết hạn nộp đề nghị miễn, giảm (hạn 30-10-2026).' };
  if (x.k === 'dyc') return tt === 'dgq' ? {} : { khoa: 'Chỉ được nộp đơn yêu cầu khác khi vụ án ở trạng thái "Đang giải quyết".' };
  if (x.k === 'gn') return tt === 'xong' ? { khoa: 'Vụ án không ở trong giai đoạn giải quyết — không thể giao nộp/sao gửi tài liệu, chứng cứ.' } : {};
  return {};
}
function VaTaoBtn(p) {
  var o = React.useState(!!p.open), dl = React.useState(!!p.rutLai), anchor = React.useRef(null), host = useHost(anchor), hlRef = React.useRef(null);
  var tt = p.tt || 'dgq', nhomKK = p.nhomKK !== false;
  React.useEffect(function () { if (!o[0] || !p.hl || !host) return; var t = setTimeout(function () { var e = hlRef.current, b = e && e.closest('.tp-dlg-body'); if (e && b) b.scrollTop = e.offsetTop - 8; }, 80); return function () { clearTimeout(t); }; }, [o[0], host]);
  return h(T.ActionBar, null, h('div', { className: 'tao-wrap tao-bar' }, h('span', { ref: anchor, hidden: true }),
    h(T.Button, { block: true, variant: 'tint', icon: 'plus', onClick: function () { o[1](true); } }, 'Tạo đơn liên quan đến vụ việc')),
    o[0] && host ? h(LvSheet, { host: host, title: 'Tạo đơn liên quan — giai đoạn sau thụ lý', onClose: function () { o[1](false); } },
      h('div', { className: 'va4-tao' }, h('p', { className: 'va4-tao-d' }, 'Các đơn phát sinh trong quá trình giải quyết vụ án. Đơn của giai đoạn trước thụ lý nằm ở ', h('b', null, 'Chi tiết đơn · thẻ Danh sách đơn'), '.'),
        VA_TAO4.map(function (g, gi) {
          var ds = g[3].map(function (x) { var m = vaTaoMuc(x, tt, nhomKK); return m ? Object.assign({}, x, m) : null; }).filter(Boolean);
          if (!ds.length) return null;
          var hl = p.hl === g[0];
          return h('section', { key: g[0], ref: hl ? hlRef : undefined, className: 'va4-tg' + (hl ? ' va4-tg-hl' : '') },
            h('div', { className: 'va4-tg-h' }, h('span', { className: 'va4-tg-n va4-' + g[2] }, gi + 1), h('div', null, h('b', null, g[0]), h('small', null, g[1])), h('span', { className: 'va4-chip' }, ds.length + ' đơn')),
            hl ? h('p', { className: 'tc3-hl-t va4-tg-hlt' }, 'Nộp đơn đề nghị hoãn phiên tòa tại đây') : null,
            h('ul', null, ds.map(function (x) {
              var rut = x.k === 'rut' && p.daRut;
              return h('li', { key: x.t }, h('button', { type: 'button', className: 'va4-ti' + (x.khoa ? ' va4-ti-khoa' : ''), disabled: !!x.khoa, 'aria-disabled': x.khoa ? 'true' : undefined,
                  'data-pt-go': x.khoa || rut ? undefined : x.go, onClick: rut ? function () { dl[1](true); } : undefined },
                h('span', { className: 'va4-ti-ic va4-' + g[2] }, h(T.Icon, { name: x.ic })),
                h('span', { className: 'va4-ti-b' }, h('b', null, x.t), h('span', { className: 'va4-gdc va4-gdc-' + x.gd }, x.gd === 'ts' ? 'Trước & sau thụ lý' : 'Sau thụ lý'), h('small', null, x.d), x.khoa ? h('span', { className: 'va4-ly' }, x.khoa) : null),
                x.khoa ? h(T.Icon, { name: 'lock' }) : h(T.Icon, { name: 'chevronRight' })));
            })));
        }))) : null,
    dl[0] && host ? ReactDOM.createPortal(h(T.Dialog, { variant: 'center', inline: true, open: true, className: 'qd-dlg', title: 'Tạo thêm yêu cầu rút đơn?', description: 'Vụ án này đã có yêu cầu rút đơn rồi. Bạn có chắc chắn muốn tạo và nộp thêm yêu cầu rút đơn mới không?',
      footer: h(F, null, h(T.Button, { variant: 'secondary', className: 'va4-dl-huy', onClick: function () { dl[1](false); } }, 'Huỷ'), h(T.Button, { 'data-pt-go': 'rd1' }, 'Tạo yêu cầu mới')) }), host) : null);
}

/* ---------- 4D.4: tab Các cấp xét xử ---------- */
function VaCap(c) {
  var mo = React.useState(!!c.mo);
  return h('section', { className: 'tp-sec-card va4-cap' + (mo[0] ? ' tp-sec-open' : '') },
    h('button', { type: 'button', className: 'va4-cap-h', 'aria-expanded': mo[0], onClick: function () { mo[1](!mo[0]); } }, h(T.Icon, { name: 'chevronDown', className: mo[0] ? 'va4-up' : undefined }), h('b', null, c.ten), h('span', { className: 'tp-num' }, c.so)),
    mo[0] ? h('div', { className: 'va4-cap-b' }, RvKV(c.fields),
      c.gd ? h('div', { className: 'va4-cap-gd' }, h('p', { className: 'va4-sub' }, 'Giai đoạn tố tụng'), h(VaGdStep, c.gd)) : null,
      c.phien ? h('div', { className: 'va4-cap-ph' }, h(T.Icon, { name: 'calendar' }), h('span', null, c.phien[0]), h(T.StatusBadge, { tone: c.phien[2] }, c.phien[1])) : null,
      c.lyDo ? h('p', { className: 'va4-cap-ld' }, h(T.Icon, { name: 'info' }), h('span', null, h('b', null, 'Lý do mở giai đoạn: '), c.lyDo)) : null,
      c.kq ? h('div', { className: 'va4-kq' }, h('div', { className: 'va4-kq-h' }, h('b', null, c.kq.loai), h('span', { className: 'tp-num' }, c.kq.so), h('span', null, '· Tuyên ngày ' + c.kq.ngay)),
        h(T.StatusBadge, { tone: 'neutral', icon: false }, c.kq.hl), h('p', null, c.kq.tomTat),
        h('button', { type: 'button', className: 'vk-link', 'data-pt-go': 'mailDetail', onClickCapture: vaMoVb(c.kq.vb || 'Bản án dân sự sơ thẩm', c.kq.so, c.kq.ngay) }, 'Xem văn bản →')) : null) : null);
}
function VaTabStages(p, va) {
  if (p.stages === 'loading') return VaTai('Đang tải các cấp xét xử…');
  if (p.stages === 'err') return VaLoi('Không tải được các cấp xét xử.');
  if (p.stages === 'empty') return h(T.EmptyState, { goc: true, variant: 'center', icon: 'folder', title: 'Vụ án chưa có thông tin cấp xét xử.' });
  if (p.stages === 'kq') return h(F, null,
    h(VaCap, { ten: 'Sơ thẩm', so: '[Số thụ lý sơ thẩm]', fields: [['Tòa án', COURT1], ['Ngày thụ lý', '10-03-2025'], ['Thẩm phán', 'Trần Văn Anh']], gd: { steps: VA_GD.ST, cur: 7 },
      kq: { loai: 'Bản án', so: '[Số bản án]', ngay: '20-10-2026', hl: '[Nhãn hiệu lực]', tomTat: '[Tóm tắt kết quả]' } }),
    h(VaCap, { mo: true, ten: 'Phúc thẩm', so: '[Số thụ lý phúc thẩm]', fields: [['Tòa án', 'Tòa án nhân dân thành phố Hà Nội'], ['Ngày thụ lý', '[Ngày thụ lý]'], ['Thẩm phán', '[Thẩm phán]']], gd: { steps: VA_GD.PT, cur: 1 }, lyDo: '[Lý do mở giai đoạn]' }));
  var gd = vaGd(va) || { steps: VA_GD.ST, cur: 4 };
  return h(VaCap, { mo: true, ten: vaCapCur(va), so: '12/2026/TLST-DS', fields: [['Tòa án', va.toa || COURT1], ['Ngày thụ lý', va.thuLy], ['Thẩm phán', 'Trần Văn Anh']], gd: gd,
    phien: ['06-11-2026 14:00 · Trực tiếp · Phòng xử án số 1', 'Sắp diễn ra', 'warning'] });
}

/* ---------- 4E.1 / 4E.2: tab Lịch phiên tòa – thẻ phiên theo web ---------- */
var VH0 = { tieu: 'Phiên tòa sơ thẩm', tg: '06-11-2026 14:00', dd: COURT1 + ' – Phòng xử án số 1', ht: 'Có mặt trực tiếp tại Tòa án', vt: 'Nguyên đơn', giay: '[Số giấy triệu tập] · Đã tống đạt ngày 28-10-2026', ph: 'chua' };
var VH_ON = Object.assign({}, VH0, { tg: '05-11-2026 08:30', dd: COURT1 + ' – Phòng họp trực tuyến số 2', ht: 'Tham dự trực tuyến tại điểm cầu tự chọn', online: true });
var VA_HEAR = {
  chua: [VH0], online: [VH_ON], done: [Object.assign({}, VH_ON, { ph: 'xn', dc: 'Điểm cầu cá nhân' })], doneTt: [Object.assign({}, VH0, { ph: 'xn' })],
  absent: [Object.assign({}, VH_ON, { ph: 'vang', phongKhoa: 'Bạn đã báo vắng mặt tại phiên này' })], absentTt: [Object.assign({}, VH0, { ph: 'vang' })],
  expired: [Object.assign({}, VH0, { ph: 'het' })],
  post: [Object.assign({}, VH0, { thayDoi: { khan: true, loai: 'Hoãn', lyDo: 'Thẩm phán được phân công giải quyết vắng mặt vì lý do bất khả kháng.' },
    ls: [{ nhan: 'Hoãn', cu: '06-11-2026 14:00', moi: '—', ghi: '05-11-2026 16:20', vb: '[Số quyết định]', lyDo: 'Thẩm phán được phân công giải quyết vắng mặt vì lý do bất khả kháng.' }] })],
  change: [Object.assign({}, VH0, { tg: '13-11-2026 14:00', thayDoi: { loai: 'Đổi lịch', tieuDe: 'Lịch cũ 06-11-2026 14:00', nd: 'Phiên tòa đã được thay đổi thời gian/địa điểm theo thông báo của Tòa án.' },
      ls: [{ nhan: 'Đổi lịch', cu: '06-11-2026 14:00', moi: '13-11-2026 14:00', ghi: '03-11-2026 09:10', vb: '[Số thông báo]', lyDo: '[Lý do thay đổi lịch]' }] }),
    Object.assign({}, VH0, { tg: '20-11-2026 08:00', moLai: true, giay: '[Số giấy triệu tập] · Đã tống đạt ngày 12-11-2026' })],
  paused: [Object.assign({}, VH_ON, { tamDung: true })],
  empty: []
};
function VaHear(o) {
  var con = !o.thayDoi && !o.tamDung, chua = o.ph === 'chua' || o.ph === 'het', het = o.ph === 'het';
  var ct = o.online ? 'hearingDetailDone' : 'hearingDetail';
  var tag = !con ? null : o.ph === 'xn' ? h(T.StatusBadge, { tone: 'success', icon: false }, 'Đã xác nhận tham dự' + (o.online && o.dc ? ' · ' + o.dc : ''))
    : o.ph === 'vang' ? h(T.StatusBadge, { tone: 'warning', icon: false }, 'Đã báo vắng mặt') : het ? h(T.StatusBadge, { tone: 'danger', icon: false, variant: 'outline' }, 'Hết hạn xác nhận') : h(T.StatusBadge, { tone: 'danger', icon: false }, 'Chưa trả lời');
  var td = o.thayDoi;
  var rows = [['Thời gian', o.tg], ['Địa điểm', o.dd], ['Hình thức', o.ht]].concat(o.online ? [['Điểm cầu tham dự', o.dc ? h('b', null, o.dc) : o.ph === 'xn' ? 'Điểm cầu cá nhân (tự bảo đảm thiết bị qua Tokenized URL)' : h('span', { className: 'va4-mo' }, 'Chưa đăng ký điểm cầu (mặc định Điểm cầu cá nhân)')]] : [],
    [['Tư cách tham gia', o.vt], ['Giấy triệu tập', o.giay || h('em', { className: 'va4-mo' }, 'Chưa ban hành văn bản tống đạt')]]);
  return h('article', { className: 'va4-hr', onClickCapture: function () { window.__lcTu = 'va'; window.__lcOn = !!o.online; } },
    h('div', { className: 'va4-hr-tags' }, LcTag('PT'), o.moLai ? h('span', { className: 'va4-tag va4-tag-cam' }, 'Mở lại sau tạm ngừng') : null, o.tamDung ? h('span', { className: 'va4-tag va4-tag-xam' }, 'Tạm dừng · vụ án tạm đình chỉ') : null, tag),
    h('button', { type: 'button', className: 'va4-hr-t', 'data-pt-go': ct }, o.tieu),
    RvKV(rows),
    td ? h('div', { className: 'va4-td va4-td-' + (td.khan ? 'khan' : 'thuong'), role: 'alert' },
      td.khan ? h('span', { className: 'va4-td-k' }, 'KHẨN CẤP') : null,
      h('b', null, td.khan ? 'CẢNH BÁO KHẨN: Phiên tòa đã bị hoãn theo Quyết định của Tòa án' : 'Thay đổi lịch do Tòa án quyết định'), h('span', { className: 'va4-tag va4-tag-cam' }, td.loai),
      td.khan ? h('p', null, h('b', null, 'Đương sự vui lòng không di chuyển đến trụ sở Tòa án.'), ' — ' + td.lyDo) : h('p', null, h('b', null, td.tieuDe), ' — ' + td.nd)) : null,
    o.ls ? h('div', { className: 'va4-ls' }, h('b', null, 'Lịch sử thay đổi lịch (' + o.ls.length + ' lần)'), o.ls.map(function (x, i) {
      return h('div', { key: i, className: 'va4-ls-i' }, h('span', { className: 'va4-tag va4-tag-vang' }, x.nhan),
        h('p', null, 'Lịch cũ ', h('b', null, x.cu), ' → Lịch mới ', h('b', null, x.moi), ' · ghi nhận ' + x.ghi + ' · văn bản ', h('button', { type: 'button', className: 'vk-link va4-ls-vb', 'data-pt-go': 'mailDetail', onClickCapture: vaMoVb(x.vbT || 'Quyết định hoãn phiên tòa', x.vb, x.ghi.split(' ')[0]) }, x.vb)),
        h('p', { className: 'va4-ls-ld' }, 'Lý do: ' + x.lyDo));
    })) : null,
    h('div', { className: 'va4-hr-a' },
      con && chua ? h('div', { className: 'ph-2btn' }, h(T.Button, { size: 'sm', disabled: het, className: het ? 'va4-khoa' : undefined, 'data-pt-go': het ? undefined : o.online ? 'attendReplyOnline' : 'attendReply' }, 'Xác nhận tham dự'),
        h(T.Button, { size: 'sm', variant: 'secondary', disabled: het, className: 'va4-vang' + (het ? ' va4-khoa' : ''), 'data-pt-go': het ? undefined : 'attendAbsent' }, 'Báo vắng mặt')) : null,
      het && con ? h('p', { className: 'va4-ly va4-ly-do' }, 'Đã hết thời hạn xác nhận trực tuyến. Vui lòng liên hệ trực tiếp Thư ký phiên tòa nếu có thay đổi đột xuất.') : null,
      o.online && con ? h(T.Button, { size: 'sm', variant: 'secondary', block: true, icon: 'arrowRight', disabled: !!o.phongKhoa, className: o.phongKhoa ? 'va4-khoa' : undefined, 'data-pt-go': o.phongKhoa ? undefined : 'waitingRoom' }, 'Vào phòng chờ trực tuyến') : null,
      o.online && con ? VaLy(o.phongKhoa) : null,
      h('div', { className: 'ph-2btn' }, o.giay ? h(T.Button, { size: 'sm', variant: 'secondary', icon: 'file', 'data-pt-go': 'mailDetail', onClickCapture: vaMoVb(14) }, 'Xem văn bản gốc') : null,
        h(T.Button, { size: 'sm', variant: 'secondary', 'data-pt-go': ct }, 'Chi tiết phiên'))));
}
function VaTabHear(p) {
  var ds = VA_HEAR[p.hear || 'chua'] || VA_HEAR.chua;
  if (!ds.length) return h(T.EmptyState, { goc: true, variant: 'center', icon: 'calendar', title: 'Chưa có phiên tòa nào được lên lịch cho vụ án này.' });
  return h('div', { className: 'va4-hrl' }, ds.map(function (o, i) { return h(VaHear, Object.assign({ key: i }, o)); }));
}

/* ---------- 4F.1: tab Văn bản tống đạt ---------- */
function VaVbRow(d) {
  var i = vbReg({ t: d.t, so: d.so, tg: d.ngay, moi: d.moi }), s = React.useState(!IB_X[i].doc), moi = s[0];
  return h('li', { className: 'va4-vb' + (moi ? ' va4-vb-moi' : '') }, h('span', { className: 'va4-vb-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: 'file' })),
    h('div', { className: 'va4-vb-b' }, h('b', null, moi ? h('i', { className: 'ib-dot', role: 'img', 'aria-label': 'Chưa xem' }) : null, d.t), h('small', null, 'Số ' + d.so + ' · Tống đạt ' + d.ngay),
      h('div', { className: 'va4-vb-a' }, d.kc ? h(T.Button, { size: 'sm', icon: 'scale', className: 'va4-kc', 'data-pt-go': d.kc[1] }, d.kc[0]) : null,
        h(T.Button, { size: 'sm', variant: moi ? 'primary' : 'secondary', icon: 'eye', 'data-pt-go': 'mailDetail', onClickCapture: function () { IB_X[i].doc = true; vaMoVb(d.t, d.so, d.ngay)(); } }, 'Xem'))));
}
function VaTabDocs(p) {
  if (p.docs === 'empty') return h(T.EmptyState, { goc: true, variant: 'center', icon: 'mail', title: 'Chưa có văn bản tống đạt nào cho vụ án này.' });
  var ds = [{ t: 'Quyết định đưa vụ án ra xét xử', so: '[Số quyết định]', ngay: '21-10-2026', moi: true }, { t: 'Thông báo thụ lý vụ án', so: '[Số thông báo]', ngay: '15-10-2026' }];
  if (p.docs === 'kc') ds.unshift({ t: 'Bản án dân sự sơ thẩm', so: '[Số bản án]', ngay: '28-10-2026', kc: ['Kháng cáo bản án, quyết định sơ thẩm', 'kc1'] });
  return FCard('Văn bản tống đạt từ Tòa án', h('ul', { className: 'va4-vbl' }, ds.map(function (d) { return h(VaVbRow, Object.assign({ key: d.t }, d)); })), true);
}

/* ---------- 4F.2: tab Tài liệu, chứng cứ ---------- */
function VaTlRow(d) {
  var tai = React.useState(false), khoa = !!d.khoa;
  return h('li', { className: 'va4-tl' + (khoa ? ' va4-tl-khoa' : '') }, h('div', { className: 'va4-tl-b' }, h('b', null, d.t), d.chip ? h('span', { className: 'va4-chip' }, d.chip) : null, d.sub ? h('small', null, d.sub) : null),
    h('div', { className: 'va4-tl-a' }, h(T.Button, { variant: 'secondary', size: 'sm', icon: 'eye', disabled: khoa, 'aria-label': 'Xem ' + d.t, className: 'ph-lib-view', 'data-pt-go': khoa ? undefined : 'attachment', onClickCapture: vaXemTep(d.tep || d.t + '.pdf') }),
      h(T.Button, { variant: 'secondary', size: 'sm', icon: tai[0] ? 'check' : 'download', disabled: khoa, 'aria-label': tai[0] ? 'Đã tải về ' + d.t : 'Tải về ' + d.t, className: 'ph-lib-view va4-tai-b' + (tai[0] ? ' va4-tai-ok' : ''), onClick: function () { tai[1](true); } })));
}
function VaNhomTl(t, rows) { return h('div', { key: t, className: 'va4-ntl' }, h('p', { className: 'dt-grp-t' }, t), h('ul', { className: 'va4-tll' }, rows.map(function (r) { return h(VaTlRow, Object.assign({ key: r.t + (r.sub || '') }, r)); }))); }
function VaTabEvi(p) {
  var rong = p.evi === 'empty', loi = p.evi === 'err';
  return h(F, null,
    FCard('Tài liệu, chứng cứ đã nộp', h(F, null, rong || loi ? null : h('span', { className: 'va4-chip va4-chip-dem' }, '9 tài liệu'),
      loi ? VaLoi('Không tải được danh sách tài liệu.', false) : rong ? h(T.EmptyState, { goc: true, variant: 'center', icon: 'folder', title: 'Chưa có tài liệu, chứng cứ nào được giao nộp cho vụ án này.' }) : h(F, null,
        VaNhomTl('Thứ Ba, 20-10-2026', [{ t: 'Hợp đồng vay tài sản', sub: 'Bản sao có chứng thực · Đã nộp lúc 20-10-2026 16:05', tep: 'hop-dong-vay.pdf' }, { t: 'Giấy nhận tiền', sub: 'Bản chính · Đã nộp lúc 20-10-2026 16:05', tep: 'giay-nhan-tien.jpg' }]),
        VaNhomTl('Giao nộp bổ sung 24-10-2026 15:30', [{ t: 'Sao kê chuyển khoản', chip: 'Giao nộp bổ sung', sub: 'Biên nhận BN-2026-0105' }, { t: 'Tin nhắn trao đổi', chip: 'Giao nộp bổ sung', sub: 'Biên nhận BN-2026-0105' }]),
        VaNhomTl('Cung cấp theo yêu cầu của Tòa án 28-10-2026 10:00', [{ t: 'Bản tự khai bổ sung', chip: 'Cung cấp theo yêu cầu của Tòa án', sub: 'Biên nhận [Số biên nhận]' }]),
        VaNhomTl('Được sao gửi từ đương sự khác', [{ t: 'Biên bản đối chiếu công nợ', chip: 'Sao gửi bởi Trần Văn Bình', sub: 'Nhận lúc 29-10-2026 09:00' }, { t: 'Giấy xác nhận thanh toán', chip: 'Sao gửi bởi Trần Văn Bình', sub: 'Nhận lúc 29-10-2026 09:00' }]),
        VaNhomTl('Đơn phản tố', [{ t: 'Đơn phản tố', chip: 'Đơn phản tố · Trần Văn Bình', sub: 'Đã nộp lúc 27-10-2026 14:20' }, { t: 'Hợp đồng ủy quyền', chip: 'Đơn phản tố · Trần Văn Bình', sub: 'Đã nộp lúc 27-10-2026 14:20' }]))), true),
    FCard('Tài liệu, chứng cứ của tòa', h(F, null, loi || rong ? null : h('span', { className: 'va4-chip va4-chip-dem' }, '2 tài liệu'),
      loi ? VaTai('Đang tải tài liệu của tòa…') : rong ? h(T.EmptyState, { goc: true, variant: 'center', icon: 'folder', title: 'Chưa có tài liệu, chứng cứ do Tòa án cung cấp.' })
        : VaNhomTl('Quyết định đưa vụ án ra xét xử · 21-10-2026', [{ t: 'Quyết định đưa vụ án ra xét xử', sub: 'Số [Số quyết định]' }, { t: 'Tệp đính kèm', sub: 'Tệp chưa sẵn sàng để xem', khoa: true }]),
      h(T.Button, { variant: 'secondary', block: true, icon: 'plus', className: 'va4-ttcc', 'data-pt-go': 'dyc1_tt' }, 'Yêu cầu Tòa án thu thập chứng cứ')), true),
    FCard('Quyền yêu cầu sao chụp tài liệu, chứng cứ', h(F, null, P('Đương sự và người bảo vệ quyền, lợi ích hợp pháp của đương sự có quyền yêu cầu sao chụp tài liệu, chứng cứ trong hồ sơ vụ án, trừ những tài liệu, chứng cứ không được phép sao chụp theo quy định pháp luật.', 'ph-muted'),
      h('div', { className: 'dt-acts dt-acts-col' }, h(T.Button, { variant: 'secondary', icon: 'copy', 'data-pt-go': 'caseCopy' }, 'Sao chụp tài liệu do đương sự khác xuất trình'), h(T.Button, { variant: 'secondary', icon: 'copy', 'data-pt-go': 'caseCopyCourt' }, 'Sao chụp tài liệu do Tòa án thu thập'))), true));
}

/* ---------- 4F.3: tab Bản án / Quyết định ---------- */
function VaBaRow(d) {
  return h('li', { className: 'va4-ba' }, h('span', { className: 'va4-vb-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: 'file' })),
    h('div', { className: 'va4-ba-b' }, h('b', null, d.t), h('div', { className: 'va4-ba-r' }, h('span', { className: 'tp-num' }, d.so), h('span', { className: 'va4-chip' }, d.cap)),
      h('small', null, 'Tuyên / ban hành ngày ' + d.ngay + ' · ' + (d.dv || COURT1)), h(T.StatusBadge, { tone: 'neutral', icon: false }, '[Nhãn hiệu lực]'),
      h('div', { className: 'va4-ba-a' }, h(T.Button, { size: 'sm', disabled: !!d.khoa, className: 'va4-kc' + (d.khoa ? ' va4-khoa' : ''), 'data-pt-go': d.khoa ? undefined : d.tl === 'Yêu cầu cấp trích lục quyết định' && SCR.tl2Va ? 'tl2Va' /* xin-sua (trichluc, 1B.2) */ : 'tl1' }, d.tl),
        h(T.Button, { size: 'sm', variant: 'secondary', icon: 'mail', 'data-pt-go': 'mailDetail', onClickCapture: vaMoVb(d.t, d.so, d.ngay) }, 'Mở ở Hộp thư'), XemTep(d.tep)),
      d.khoa ? h('p', { className: 'va4-ly va4-ly-i' }, h(T.Icon, { name: 'info' }), d.khoa) : null));
}
function VaTabJudg(p) {
  var k = p.judg, khoa = k === 'khoa';
  var ba = k === 'ba' || khoa ? [{ t: 'Bản án dân sự sơ thẩm', so: '[Số bản án]', cap: 'Sơ thẩm', ngay: '20-10-2026', tl: 'Yêu cầu cấp trích lục bản án', tep: 'ban-an-so-tham.pdf', khoa: khoa ? 'Bản án này chưa có dữ liệu để cấp trích lục. Nếu cần, vui lòng liên hệ Tòa án đã ban hành.' : null }] : [];
  var qd = (k === 'dc' ? [{ t: 'Quyết định đình chỉ giải quyết vụ án dân sự', so: '[Số quyết định]', cap: 'Sơ thẩm', ngay: '28-10-2026', tl: 'Yêu cầu cấp trích lục quyết định', tep: 'quyet-dinh-dinh-chi.pdf' }] : [])
    .concat([{ t: 'Quyết định đưa vụ án ra xét xử', so: '[Số quyết định]', cap: 'Sơ thẩm', ngay: '21-10-2026', tl: 'Yêu cầu cấp trích lục quyết định', tep: 'quyet-dinh-dua-ra-xet-xu.pdf', khoa: khoa ? 'Số [Số quyết định] đang dùng chung với văn bản khác trong vụ án nên chưa thể cấp trích lục. Vui lòng liên hệ Tòa án đã ban hành.' : null }]);
  return h(F, null, ba.length ? FCard('Bản án', h('ul', { className: 'va4-bal' }, ba.map(function (d) { return h(VaBaRow, Object.assign({ key: d.t }, d)); })), true) : null,
    FCard('Quyết định của Tòa án', h('ul', { className: 'va4-bal' }, qd.map(function (d) { return h(VaBaRow, Object.assign({ key: d.t }, d)); })), true));
}

/* ---------- 4F.4: tab Lịch sử vụ án ---------- */
function VaTabHist(p) {
  if (p.hist === 'loading') return VaTai('Đang tải lịch sử vụ án…');
  if (p.hist === 'err') return VaLoi('Không tải được lịch sử vụ án.');
  if (p.hist === 'empty') return h(T.EmptyState, { goc: true, variant: 'center', icon: 'clock', title: 'Chưa có diễn biến nào', text: 'Lịch sử vụ án được ghi từ các văn bản Tòa án tống đạt cho vụ án. Khi có văn bản đầu tiên, các mốc sẽ hiển thị tại đây.' });
  var ds = [{ ngay: '21-10-2026', tt: ['Đang giải quyết', 'info'], moi: true, t: 'Đã có QĐ đưa vụ án ra xét xử', vb: 'Quyết định đưa vụ án ra xét xử', so: '[Số quyết định]', nhan: true },
    { ngay: '17-10-2026', tt: ['Đang giải quyết', 'info'], t: 'Bổ sung người tham gia tố tụng', vb: 'Thông báo về việc bổ sung người tham gia tố tụng', so: '[Số thông báo]' },
    { ngay: '15-10-2026', tt: ['Đang giải quyết', 'info'], t: 'Đã thụ lý — chuẩn bị xét xử', vb: 'Thông báo thụ lý vụ án', so: '[Số thông báo]', nhan: true }];
  return h('section', { className: 'tp-sec-card tp-sec-open ls-card' }, h('div', { className: 'tp-sec-body' }, h('ol', { className: 'va4-hs' }, ds.map(function (x, i) {
    var noi = h(F, null, h('span', { className: 'va4-hs-dot', 'aria-hidden': 'true' }),
      h('div', { className: 'va4-hs-c' }, h('div', { className: 'va4-hs-r' }, h('span', { className: 'tp-num' }, x.ngay), h(T.StatusBadge, { tone: x.tt[1] }, x.tt[0]), x.moi ? h('span', { className: 'va4-chip va4-chip-moi' }, 'Chưa đọc') : null),
        h('b', null, x.t), h('small', null, x.vb + ' · Số ' + x.so + ' · Sơ thẩm')), x.nhan ? h(T.Icon, { name: 'chevronRight' }) : null);
    return h('li', { key: i, className: (i === 0 ? 'va4-hs-now ' : '') + (x.nhan ? 'va4-hs-bam' : '') }, x.nhan ? h('button', { type: 'button', className: 'va4-hs-it', 'data-pt-go': 'mailDetail', onClickCapture: vaMoVb(x.vb, x.so, x.ngay, x.moi) }, noi) : h('div', { className: 'va4-hs-it' }, noi));
  }))));
}

/* ---------- 4E.3 / 4E.4: thành phần phụ ---------- */
/* ô chọn có bảng từ đáy (mở sẵn được) */
function VaSel(p) {
  var o = React.useState(!!p.moSan), anchor = React.useRef(null), host = useHost(anchor), cur = p.items.filter(function (x) { return x.id === p.v; })[0];
  return h('div', { className: 'ph-selsh' }, h('span', { ref: anchor, hidden: true }), h(T.SelectField, { label: p.label, labelVisible: true, required: p.req, value: cur ? cur.name : undefined, open: o[0], onClick: function () { o[1](true); } }),
    o[0] && host ? h(LvSheet, { host: host, title: 'Chọn ' + p.label.charAt(0).toLowerCase() + p.label.slice(1), onClose: function () { o[1](false); } }, h(LvRows, { label: p.label, cur: p.v, items: p.items, onPick: function (id) { p.onPick(id); o[1](false); } })) : null);
}
/* mở đường dẫn phòng họp = mở trình duyệt / ứng dụng họp ngoài app */
function PhongHopExt() {
  return h(Phone, { cls: 'ph-ext va4-ext' },
    h('div', { className: 'va4-ext-bar' }, h('button', { type: 'button', className: 'va4-ext-x', 'aria-label': 'Đóng trình duyệt', 'data-pt-go': 'back' }, h(T.Icon, { name: 'x' })),
      h('span', { className: 'va4-ext-url' }, h(T.Icon, { name: 'lock' }), '[Đường dẫn phòng họp trực tuyến]')),
    h('div', { className: 'va4-ext-body' }, h('p', null, '[Phòng xét xử trực tuyến – mở trên trình duyệt]')));
}

/* Chi tiết vụ án – nhóm nút chức năng ở cuối khối Các bên đương sự (người dùng 21/11 chọn B4): dòng biểu tượng + tên + mũi tên, gom trong khung viền.
   Web hiện cả 3 nút cố định, không theo trạng thái vụ án (vu-an/chi-tiet.tsx). */
var VA_ACTS = [['user', 'Bổ sung đương sự', 'dyc1_bs'], ['swap', 'Đổi vai trò tố tụng', 'dyc1'], ['filePlus', 'Đề nghị về chứng cứ, người tham gia tố tụng', 'dyc1_tt']];
function VaActs() {
  return h('div', { className: 'va-actl va-actl-the' }, VA_ACTS.map(function (x) { return h('button', { key: x[1], type: 'button', className: 'va-actl-it', 'data-pt-go': x[2] }, h('span', { className: 'va-actl-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: x[0] })), h('span', { className: 'va-actl-tx' }, x[1]), h(T.Icon, { name: 'chevronRight' })); }));
}


/* v539: nội dung các tab Chi tiết vụ án giữ nguyên bản gốc (người dùng 22/11: không sửa màn Chi tiết vụ án) – chỉ tab Thông tin chung dùng bản đã duyệt (2A.1, 2A.2) */
function VaTabGoc(p, t) {
      if (t === 'info') return h(F, null,
        FCard('Các bên đương sự', h(F, null, /* v612: bỏ dòng đếm đương sự */
          h(NvCall, { tone: 'warning', icon: 'lock' }, 'Một số thông tin của đương sự khác được ẩn nhằm bảo vệ dữ liệu cá nhân.'), /* v597: ghi chú ẩn thông tin – khung cảnh báo đầu khối (PA A) */
          p.vaiTro ? h(DtParty, { vtNhan: 1, tat: 'NĐ', ten: 'Nguyễn Văn Hùng', vt: 'Nguyên đơn', rows: [['Số CCCD', '—'], ['Địa chỉ', '—']] }) : null, h(DtParty, { vtNhan: 1, tat: p.vaiTro === 'Bị đơn' ? 'BĐ' : p.vaiTro ? 'LQ' : 'NĐ', ten: 'Hoàng Dương', ban: true, vt: p.vaiTro || 'Nguyên đơn', rows: [['Số CCCD', h('span', { className: 'tp-num' }, '001090012345')], ['Người đại diện / ủy quyền', '—'], ['Người bảo vệ lợi ích hợp pháp', '—'], ['Địa chỉ', 'Số 8 Phạm Hùng, Phường Từ Liêm, Thành phố Hà Nội']] }),
          p.vaiTro === 'Bị đơn' ? null : h(DtParty, { vtNhan: 1, tat: 'BĐ', ten: 'Trần Văn Bình', vt: 'Bị đơn', rows: [['Số CCCD', '—'], ['Người đại diện / ủy quyền', '—'], ['Địa chỉ', '—']] }),
          p.vaiTro && p.vaiTro !== 'Bị đơn' ? null : h(DtParty, { vtNhan: 1, tat: 'LQ', ten: 'Lê Thị Hoa', vt: 'Người có quyền lợi, nghĩa vụ liên quan', rows: [['Số CCCD', '—'], ['Địa chỉ', '—']] }),
          h('div', { className: 'dt-acts' }, ['Bổ sung đương sự', 'Đổi vai trò tố tụng', 'Đề nghị về chứng cứ, người tham gia tố tụng'].map(function (x) { return h(T.Button, { key: x, variant: 'secondary', size: 'sm', 'data-pt-go': x === 'Bổ sung đương sự' ? 'dyc1_bs' : 'dyc1' }, x); } /* v397: mở Đơn yêu cầu khác */))), true),
        FCard('Tòa án và hội đồng xét xử', RvKV([['Tòa án đang giải quyết', COURT1], ['Thẩm phán / HĐXX', 'Trần Văn Anh'], ['Cấp xét xử hiện tại', 'Sơ thẩm'], ['Số thụ lý giai đoạn hiện tại', h('span', { className: 'tp-num' }, '12/2026/TLST-DS')], ['Ngày thụ lý giai đoạn hiện tại', '15-10-2026']]), true),
        FCard('Định danh và tình trạng vụ án', RvKV([['Mã vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Loại án', 'Dân sự'], ['Trạng thái vụ án', 'Đang giải quyết'], ['Số giai đoạn đã qua', '1 giai đoạn'], ['Quan hệ tranh chấp', 'Tranh chấp hợp đồng vay tài sản']]), true),
        FCard('Án phí', h(F, null, h('div', { className: 'dt-fee' }, h('div', null, h('b', null, 'Tạm ứng án phí sơ thẩm'), h('small', null, 'Hạn nộp 30-10-2026')), h('div', { className: 'dt-fee-r' }, h('b', { className: 'tp-num' }, '1.250.000 đ'), h(T.StatusBadge, { tone: 'warning', icon: false }, 'Chưa nộp'))),
          h('button', { type: 'button', className: 'vk-link', 'data-pt-go': 'financeDetail' }, 'Xem nghĩa vụ tài chính', h(T.Icon, { name: 'chevronRight' }))), true),
        FCard('Đơn gốc của bạn', h('button', { type: 'button', className: 'dt-link-row', 'data-pt-go': 'appDetail' }, h('span', null, h('b', null, 'Đơn khởi kiện'), h('small', { className: 'tp-num' }, 'TN-20261020-0012')), h('span', { className: 'dt-link-t' }, 'Xem đơn', h(T.Icon, { name: 'chevronRight' }))), true));
      if (t === 'don') return FCard('Đơn trong vụ án', h('ul', { className: 'qd-list dt-qc' },
        DonThe2({ loai: 'Đơn khởi kiện · ban đầu', t: 'Tranh chấp hợp đồng vay tài sản', tt: ['Đã thụ lý', 'success'], go: 'appDetail', rows: [['Loại đơn', 'Đơn khởi kiện · ban đầu'], ['Mã tiếp nhận', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Ngày gửi', '20-10-2026']] }),
        DonThe2({ loai: 'Giao nộp tài liệu, chứng cứ', t: 'Biên nhận BN-2026-0105', tt: ['Đã gửi', 'info'], rows: [['Loại đơn', 'Giao nộp tài liệu, chứng cứ'], ['Số tài liệu', '2 tài liệu'], ['Ngày gửi', '24-10-2026']] })), true);
      if (t === 'stages') return h(F, null,
        FCard('Sơ thẩm · Đang giải quyết', RvKV([['Tòa án', COURT1], ['Số thụ lý', h('span', { className: 'tp-num' }, '12/2026/TLST-DS')], ['Ngày thụ lý', '15-10-2026'], ['Thẩm phán', 'Trần Văn Anh'], ['Kết quả', '—']]), true),
        FCard('Phúc thẩm · Chưa phát sinh', P('Thông tin cấp phúc thẩm sẽ hiển thị khi vụ án được thụ lý phúc thẩm.', 'ph-muted'), true));
      if (t === 'hearings') return FCard('Lịch phiên tòa', h('div', { className: 'dt-hear' },
        h('div', { className: 'dt-hear-d' }, h('b', { className: 'tp-num' }, '28'), h('span', null, 'T10')),
        h('div', { className: 'dt-hear-b' }, h('div', { className: 'dt-don-h' }, h(T.StatusBadge, { tone: 'warning', icon: false }, 'Sắp diễn ra')), h('b', null, 'Phiên tòa sơ thẩm'), RvKV([['Thời gian', '14:00, 28-10-2026'], ['Hình thức', 'Trực tiếp'], ['Địa điểm', 'Phòng xử án số 2 – ' + COURT1]]),
          h('div', { className: 'dt-acts' }, h(T.Button, { size: 'sm', 'data-pt-go': 'attendReply' }, 'Xác nhận tham dự'), h(T.Button, { size: 'sm', variant: 'secondary', icon: 'pen' }, 'Đề nghị hoãn phiên')))), true);
      if (t === 'docs') return FCard('Văn bản tống đạt từ Tòa án', VbCards([{ t: 'Quyết định đưa vụ án ra xét xử', so: '[Số quyết định]', tg: '21-10-2026', moi: true }, { t: 'Thông báo thụ lý vụ án', so: '[Số thông báo]', tg: '15-10-2026' }]), true);
      if (t === 'evidence') return h(F, null,
        h('div', { className: 'ph-s1-note dt-info' }, h('p', null, 'Đương sự được quyền tiếp cận tài liệu, chứng cứ do bên khác nộp hoặc Tòa án thu thập, trừ tài liệu liên quan đến bí mật nhà nước, thuần phong mỹ tục, bí mật nghề nghiệp, bí mật kinh doanh, bí mật cá nhân, bí mật gia đình.')),
        FCard('Tài liệu, chứng cứ đã giao nộp · 4 tài liệu', h(F, null,
          h('p', { className: 'dt-grp-t' }, 'Nộp kèm đơn khởi kiện · 20-10-2026'), DtDocs([['Hợp đồng vay tài sản', 'Bản sao có chứng thực · Đã nộp lúc 20-10-2026 16:05'], ['Giấy nhận tiền', 'Bản chính · Đã nộp lúc 20-10-2026 16:05']], DOC_THE),
          h('p', { className: 'dt-grp-t' }, 'Giao nộp bổ sung · 24-10-2026'), DtDocs([['Sao kê chuyển khoản', 'Biên nhận BN-2026-0105'], ['Tin nhắn trao đổi', 'Biên nhận BN-2026-0105']], DOC_THE),
          h(T.Button, { variant: 'tint', icon: 'upload', className: 'ph-co-add', 'data-pt-go': 'evidence2' }, 'Giao nộp tài liệu, chứng cứ')), true),
        FCard('Tài liệu do Tòa án cung cấp · 0 tài liệu', h(F, null, P('Chưa có tài liệu, chứng cứ do Tòa án cung cấp.', 'ph-muted'),
          h(T.Button, { variant: 'tint', icon: 'plus', className: 'ph-co-add' }, 'Yêu cầu Tòa án thu thập chứng cứ')), true),
        FCard('Sao chụp tài liệu, chứng cứ', h(F, null, P('Đương sự và người bảo vệ quyền, lợi ích hợp pháp của đương sự có quyền yêu cầu sao chụp tài liệu, chứng cứ trong hồ sơ vụ án, trừ những tài liệu, chứng cứ không được phép sao chụp theo quy định pháp luật.', 'ph-muted'),
          h('div', { className: 'dt-acts dt-acts-col' }, h(T.Button, { variant: 'secondary', icon: 'copy', 'data-pt-go': 'caseCopy' }, 'Sao chụp tài liệu do đương sự khác xuất trình'), h(T.Button, { variant: 'secondary', icon: 'copy', 'data-pt-go': 'caseCopyCourt' }, 'Sao chụp tài liệu do Tòa án thu thập'))), true));
      if (t === 'judgments') return FCard('Bản án / Quyết định', h(F, null,
        DtDocs([['Quyết định đưa vụ án ra xét xử', 'Tuyên / ban hành ngày 21-10-2026 · ' + COURT1]], DOC_THE),
        h('button', { type: 'button', className: 'vk-link', 'data-pt-go': 'tl1' }, 'Yêu cầu cấp trích lục quyết định', h(T.Icon, { name: 'chevronRight' })),
        P('Trường hợp bản số hóa chưa sẵn sàng, Tòa án sẽ tống đạt bản giấy theo quy định (Điều 219 BLTTDS).', 'ph-muted dt-small')), true);
      return LsG1([['Quyết định đưa vụ án ra xét xử', '21-10-2026', 'Số [Số quyết định]'], ['Thông báo thụ lý vụ án', '15-10-2026', 'Số [Số thông báo] · ' + COURT1]]);
}

/* ===== v583 (24-11-2026): áp kết quả chốt ca F sheet 1 TATC_Mobile_TC_VuAn.xlsx (phiên fork – tai-lieu/ra-soat-vuan-sheet1-2026-11-24.md).
   Người dùng duyệt sửa màn Chi tiết vụ án theo các ca 1.18–1.42 (thay quyết định v539 giữ nguyên các tab). ===== */
/* 1.1: biểu tượng biểu đồ tròn cho nút Trạng thái vụ án (bổ sung vào bộ biểu tượng) */
ICON_THEM.chartPie = ['M21.2 15.9A10 10 0 1 1 8.1 2.8', 'M22 12A10 10 0 0 0 12 2v10z'];

/* 1.1 (PA C – kiểu Hộp thư tống đạt): bảng từ đáy "Trạng thái vụ án" – biểu đồ tròn + danh sách kiểu Phân loại thư + Áp dụng */
function VaTtSheet(p) {
  var L = p.L[2][2].slice(1), src = p.ds, s = React.useState(p.cur || 0);
  var dem = L.map(function (n) { return src.filter(function (v) { return v.tt[0] === n; }).length; }), tong = src.length;
  var C = 2 * Math.PI * 44, acc = 0;
  var rows = [['Tất cả trạng thái', tong, -1]].concat(L.map(function (n, i) { return [n, dem[i], i]; }));
  return h(LvSheet, { host: p.host, title: 'Trạng thái vụ án', onClose: p.onClose, foot: h(T.Button, { block: true, onClick: function () { p.onApply(s[0]); } }, 'Áp dụng') },
    h('div', { className: 'ib-pl va5-tt' },
      h('svg', { viewBox: '0 0 120 120', className: 'va4-dn-svg va5-tt-svg', role: 'img', 'aria-label': 'Biểu đồ vụ án theo trạng thái, tổng ' + tong + ' vụ' },
        h('circle', { cx: 60, cy: 60, r: 44, className: 'va4-dn-nen' }),
        dem.map(function (n, i) {
          if (!n) return null; var len = n / tong * C, off = -acc; acc += len;
          return h('circle', { key: i, cx: 60, cy: 60, r: 44, className: 'va4-dn-sl va4-' + VA_DN[i], strokeDasharray: len + ' ' + (C - len), strokeDashoffset: off, transform: 'rotate(-90 60 60)', onClick: function () { s[1](i + 1); } });
        }),
        h('text', { x: 60, y: 58, className: 'va4-dn-so' }, tong), h('text', { x: 60, y: 76, className: 'va4-dn-dv' }, 'vụ')),
      h('ul', { className: 'ib-pl-list', role: 'radiogroup', 'aria-label': 'Trạng thái vụ án' }, rows.map(function (r, k) {
        var on = s[0] === k;
        return h('li', { key: r[0] }, h('button', { type: 'button', role: 'radio', 'aria-checked': on, className: 'ib-pl-it' + (on ? ' ib-pl-on' : ''), onClick: function () { s[1](k); } },
          r[2] < 0 ? null : h('i', { className: 'va5-tt-dot va4-' + VA_DN[r[2]], 'aria-hidden': 'true' }), h('span', { className: 'ib-pl-t' }, r[0]), h('span', { className: 'ib-pl-n tp-num' }, r[1])));
      }))));
}

/* 1.18: trạng thái riêng từng tab – [đang tải, lỗi, rỗng, biểu tượng] theo câu web (vu-an/chi-tiet.tsx) */
var VA_TT5 = {
  stages: ['Đang tải các cấp xét xử…', 'Không tải được các cấp xét xử.', 'Vụ án chưa có thông tin cấp xét xử.', 'scale'],
  hearings: ['Đang tải…', 'Không tải được danh sách phiên.', 'Chưa có phiên tòa nào được lên lịch cho vụ án này.', 'calendar'],
  docs: [null, null, 'Chưa có văn bản tống đạt nào cho vụ án này.', 'file'],
  process: ['Đang tải lịch sử vụ án…', 'Không tải được lịch sử vụ án.', null, 'calendar']
};
function vaHistRong() { return h(T.EmptyState, { goc: true, variant: 'center', icon: 'calendar', title: 'Chưa có diễn biến nào', text: 'Lịch sử vụ án được ghi từ các văn bản Tòa án tống đạt cho vụ án. Khi có văn bản đầu tiên, các mốc sẽ hiển thị tại đây.' }); }
function vaTabTt(t, k) {
  var c = VA_TT5[t];
  if (k === 'loading') return VaTai(c[0]);
  if (k === 'err') return VaLoi(c[1], false);
  return t === 'process' ? vaHistRong() : h(T.EmptyState, { goc: true, variant: 'center', icon: c[3], title: c[2] });
}

/* 1.26: tab Đơn trong vụ án theo web mới (bang-don-trong-vu-an.tsx, 23-11-2026) */
var VA_KENH = { CONG: 'Qua Cổng', TRUC_TIEP: 'Nộp trực tiếp tại Tòa án' };
var VA_DON5 = [
  { tt: ['Đã thụ lý', 'success'], loai: 'Đơn khởi kiện', ma: 'TN-20261020-0012', nguoi: 'Hoàng Dương', ban: true, kenh: 'CONG', ngay: '20-10-2026', lan: 'DS-2026-0012', tep: 'don-khoi-kien-TN-20261020-0012.pdf' },
  { loai: 'Đơn phản tố', ma: '[Mã đơn]', nguoi: 'Trần Văn Bình', kenh: 'TRUC_TIEP', ngay: '[Ngày nộp]', lan: 'DS-2026-0012' }];
var VA_YCDL5 = { tt: ['Đã gửi', 'info'], loai: 'Đơn yêu cầu độc lập', ma: '[Mã đơn]', nguoi: 'Lê Thị Hoa', kenh: 'CONG', ngay: '[Ngày nộp]', lan: 'DS-2026-0012', tep: 'don-yeu-cau-doc-lap.pdf' };
var VA_GN5 = [
  { loai: 'Cung cấp tài liệu, chứng cứ theo yêu cầu của Tòa án', t: 'Bản nháp chưa gửi', rows: [['Số tài liệu', '2 tài liệu']], ban: true, nut: ['Soạn tiếp', 'cc1'] },
  { loai: 'Giao nộp tài liệu, chứng cứ', t: 'Biên nhận BN-2026-0105', rows: [['Ngày gửi', '24-10-2026'], ['Người nộp', h(F, null, 'Hoàng Dương', h('span', { className: 'va4-chip va4-chip-ban' }, 'Bạn'))]], nut: ['Xem đơn', 'attachment', 'bien-nhan-BN-2026-0105.pdf'] },
  { loai: 'Sao gửi tài liệu, chứng cứ', t: 'Trần Văn Bình — Bị đơn', rows: [['Ngày gửi', '[Ngày gửi]']], nut: ['Xem đơn', 'attachment', 'sao-gui-tai-lieu.pdf'] }];
function VaDonLoc(p) {
  var o = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), cur = p.items.filter(function (x) { return x.id === p.v; })[0] || p.items[0];
  return h('div', { className: 'va5-loc' }, h('span', { ref: anchor, hidden: true }),
    h('button', { type: 'button', className: 'va5-loc-b', 'aria-label': p.title + ': ' + cur.name, onClick: function () { o[1](true); } }, h('span', null, cur.name), h(T.Icon, { name: 'chevronDown' })),
    o[0] && host ? h(LvSheet, { host: host, title: p.title, onClose: function () { o[1](false); } }, h(LvRows, { label: p.title, cur: p.v, items: p.items, onPick: function (id) { p.onPick(id); o[1](false); } })) : null);
}
function vaDl(rows) { return h('dl', { className: 'qc-ben' }, rows.map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0]), h('dd', null, r[1])); })); }
function VaDonThe5(d) {
  var tt = d.kenh === 'TRUC_TIEP';
  return h('li', { key: d.loai + d.ma, className: 'qd-c qc va5-don' },
    d.tt ? h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: d.tt[1], icon: false }, d.tt[0])) : null,
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, d.loai)),
    vaDl([['Mã đơn', h('span', { className: 'va5-don-ma' }, h('span', { className: 'tp-num' }, d.ma), tt ? h('small', null, 'Mã đơn do Tòa án cấp') : null)],
      ['Người nộp', h(F, null, d.nguoi, d.ban ? h('span', { className: 'va4-chip va4-chip-ban' }, 'Bạn') : null)],
      ['Kênh nộp', h('span', { className: 'va5-kenh va5-kenh-' + (tt ? 'tt' : 'cong') }, VA_KENH[d.kenh])], ['Ngày nộp', d.ngay], ['Lần thụ lý', h('span', { className: 'tp-num' }, d.lan)]]),
    h('div', { className: 'va5-don-f' }, d.tep ? h('button', { type: 'button', className: 'vk-link', 'data-pt-go': 'attachment', onClickCapture: vaXemTep(d.tep) }, 'Xem đơn ›') : h('span', { className: 'va5-don-no' }, 'Chưa có tệp đơn')));
}
function VaGnThe5(d) {
  return h('li', { key: d.loai + d.t, className: 'qd-c qc va5-don' }, h('small', { className: 'va5-gn-l' }, d.loai),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, d.t)), vaDl(d.rows),
    h('div', { className: 'va5-don-f' }, d.ban ? h('span', { className: 'va4-chip va4-chip-ban' }, 'Bạn') : null,
      h('button', { type: 'button', className: 'vk-link', 'data-pt-go': d.nut[1], onClickCapture: d.nut[2] ? vaXemTep(d.nut[2]) : undefined }, d.nut[0] + ' ›')));
}
function VaTabDon5(p) {
  var k = React.useState(p.kenh0 || ''), l = React.useState('');
  var ds = p.donRong ? [] : p.ycdl ? VA_DON5.concat([VA_YCDL5]) : VA_DON5;
  var lans = ds.map(function (d) { return d.lan; }).filter(function (x, i, a) { return a.indexOf(x) === i; });
  var hien = ds.filter(function (d) { return (!k[0] || d.kenh === k[0]) && (!l[0] || d.lan === l[0]); });
  return h(F, null,
    FCard('Đơn trong vụ án', h(F, null, P('Gồm đơn bạn nộp qua Cổng và đơn Tòa án tiếp nhận trực tiếp', 'ph-muted va5-sub'),
      h('div', { className: 'va5-locs' },
        h(VaDonLoc, { title: 'Kênh nộp', v: k[0], onPick: k[1], items: [{ id: '', name: 'Tất cả kênh nộp' }, { id: 'CONG', name: 'Qua Cổng' }, { id: 'TRUC_TIEP', name: 'Nộp trực tiếp tại Tòa án' }] }),
        h(VaDonLoc, { title: 'Lần thụ lý', v: l[0], onPick: l[1], items: [{ id: '', name: 'Tất cả lần thụ lý' }].concat(lans.map(function (x) { return { id: x, name: x }; })) })),
      hien.length ? h('ul', { className: 'qd-list dt-qc va5-dl' }, hien.map(VaDonThe5)) : h('div', { className: 'va5-rong' }, ds.length ? 'Không có đơn khớp bộ lọc.' : 'Chưa có đơn nào trong vụ án.'),
      p.khoaLan ? h('p', { className: 'va5-khoa' }, h(T.Icon, { name: 'lock' }), 'Chỉ hiện đơn thuộc các lần thụ lý bạn tham gia. Đơn của lần thụ lý [Mã lần thụ lý mới nhất] không hiển thị.') : null), true),
    FCard('Giao nộp / sao gửi / cung cấp tài liệu, chứng cứ', h('ul', { className: 'qd-list dt-qc va5-dl' }, VA_GN5.map(VaGnThe5)), true));
}

/* 1.28 / 1.29: tab Các cấp xét xử – khối mỗi cấp đã có dữ liệu (đầu khối "{cấp} {số thụ lý}"), giai đoạn tố tụng, phiên, lý do mở giai đoạn, kết quả */
function VaCap5(c) {
  return FCard(h('span', { className: 'va5-cap-h' }, c.ten, h('span', { className: 'tp-num' }, c.so)), h(F, null,
    RvKV(c.khoa ? [['Tòa án', c.toa], ['Số thụ lý', h('span', { className: 'tp-num' }, c.so)], ['Ngày thụ lý', c.ngay]]
      : [['Tòa án', c.toa], ['Số thụ lý', h('span', { className: 'tp-num' }, c.so)], ['Ngày thụ lý', c.ngay], ['Thẩm phán', c.tp], ['Kết quả', c.kqT || '—']]),
    c.khoa ? h('p', { className: 'va5-khoa' }, h(T.Icon, { name: 'lock' }), 'Bạn không tham gia lần thụ lý này, nên chỉ xem được tòa án, số và ngày thụ lý. Giai đoạn tố tụng, bản án và văn bản của lần thụ lý này không hiển thị.') : null,
    !c.khoa && c.gd ? h('div', { className: 'va4-cap-gd va5-cap-gd' }, h('p', { className: 'va4-sub' }, 'Giai đoạn tố tụng'), h(VaGdStep, c.gd)) : null,
    !c.khoa && c.phien ? h('p', { className: 'va5-cap-ph' }, h('span', null, c.phien[0]), h('span', { className: 'va5-ph va5-ph-' + c.phien[2] }, h('i', { 'aria-hidden': 'true' }), c.phien[1])) : null,
    !c.khoa && c.lyDo ? h('p', { className: 'va4-cap-ld' }, h(T.Icon, { name: 'info' }), h('span', null, h('b', null, 'Lý do mở giai đoạn: '), c.lyDo)) : null,
    !c.khoa && c.kq ? h('div', { className: 'va4-kq va5-kq' }, h('p', { className: 'va5-kq-h' }, h('b', null, c.kq.loai), ' ', h('span', { className: 'tp-num' }, c.kq.so), ' · Tuyên ngày ' + c.kq.ngay + ' ', h(T.StatusBadge, { tone: 'warning', icon: false }, c.kq.hl)),
      h('p', null, c.kq.tomTat), h('button', { type: 'button', className: 'vk-link', 'data-pt-go': 'mailDetail', onClickCapture: vaMoVb('Bản án dân sự sơ thẩm', c.kq.so, c.kq.ngay) }, 'Xem văn bản →')) : null), true);
}
function VaTabStages5(p, va) {
  var toa = va.toa || COURT1;
  if (p.judg === 'ba' || p.stages === 'kq') return h(F, null,
    VaCap5({ ten: 'Sơ thẩm', so: '12/2026/TLST-DS', toa: toa, ngay: '15-10-2026', tp: 'Trần Văn Anh', kqT: 'Bản án [Số bản án]', gd: { steps: VA_GD.ST, cur: 6 }, phien: ['06-11-2026 14:00 · Trực tiếp · Phòng xử án số 1', 'Đã diễn ra', 'xong'],
      kq: { loai: 'Bản án', so: '[Số bản án]', ngay: '20-10-2026', hl: 'Chưa có hiệu lực', tomTat: '[Tóm tắt kết quả]' } }),
    VaCap5({ ten: 'Phúc thẩm', so: '[Số thụ lý phúc thẩm]', toa: 'Tòa án nhân dân thành phố Hà Nội', ngay: '[Ngày thụ lý]', tp: '[Thẩm phán]', gd: { steps: VA_GD.PT, cur: 1 }, lyDo: '[Lý do mở giai đoạn]' }));
  var gd = vaGd(va) || { steps: VA_GD.ST, cur: 4 };
  return h(F, null, VaCap5({ ten: vaCapCur(va), so: '12/2026/TLST-DS', toa: toa, ngay: va.thuLy, tp: 'Trần Văn Anh', gd: gd, phien: ['06-11-2026 14:00 · Trực tiếp · Phòng xử án số 1', 'Sắp diễn ra', 'sap'] }),
    p.stages === 'khoa' ? VaCap5({ ten: 'Phúc thẩm', so: '[Số thụ lý phúc thẩm]', toa: 'Tòa án nhân dân thành phố Hà Nội', ngay: '[Ngày thụ lý]', khoa: true }) : null);
}

/* 1.30 / 1.31: tab Lịch phiên tòa – dùng lại thẻ "Buổi phải dự" của Lịch tố tụng (LcDuCard); không có nút Đề nghị hoãn phiên */
function vaHear5(k) {
  var b = Object.assign({}, LC_DU[0]), on = { ht: 'Tham dự trực tuyến tại điểm cầu tự chọn', online: true, go: 'hearingDetailDone' };
  var m = {
    chua: [b], online: [Object.assign({}, b, on)], done: [Object.assign({}, b, on, { ph: 'CO_MAT', luc: '09:12 03-11-2026', dc: 'Điểm cầu cá nhân tự bảo đảm thiết bị' })], doneTt: [Object.assign({}, b, { ph: 'CO_MAT', luc: '09:12 03-11-2026' })],
    absent: [Object.assign({}, b, on, { ph: 'VANG', luc: '10:05 03-11-2026' })], absentTt: [Object.assign({}, b, { ph: 'VANG', luc: '10:05 03-11-2026' })],
    expired: [Object.assign({}, b, { ph: 'HET', con: null })], post: [Object.assign({}, b, { hoan: { qd: '[Số quyết định]' }, go: 'hearingDetailPost' })],
    change: [Object.assign({}, b, { id: 'p1b', tg: '14:00 · 13-11-2026', con: 'Còn 9 ngày', han: '12-11-2026', ls: [{ nhan: 'Đổi lịch', cu: '06-11-2026 14:00', moi: '13-11-2026 14:00', ghi: '03-11-2026 09:10', vb: '[Số thông báo]', lyDo: '[Lý do thay đổi lịch]' }] }),
      Object.assign({}, b, { id: 'p1c', tg: '08:00 · 20-11-2026', con: 'Còn 16 ngày', han: '19-11-2026', moLai: true, giay: ['Giấy triệu tập', '[Số giấy triệu tập] · Đã tống đạt ngày 12-11-2026'] })], /* v613 (1.30a) */ paused: [Object.assign({}, b, on, { tamDung: true })], empty: [] };
  return (m[k || 'chua'] || m.chua).map(function (r) { return Object.assign({ va5: 1 }, r); }); /* v613: đánh dấu thẻ của tab Lịch phiên tòa */
}
function VaTabHear5(p) {
  var ds = vaHear5(p.hear);
  if (!ds.length) return vaTabTt('hearings', 'empty');
  return FCard('Lịch phiên tòa', h('ul', { className: 'qd-list va5-hear', onClickCapture: function () { window.__lcTu = 'va'; window.__lcOn = !!ds[0].online; } }, ds.map(LcDuCard)), true);
}

/* 1.37: tab Văn bản tống đạt – văn bản có hành động kháng cáo có nút viền cỡ nhỏ (tên theo hệ thống) */
function VaVbCards5(list) {
  return h('ul', { className: 'vb1' }, list.map(function (v) {
    var i = vbReg(v), x = IB_X[i], moi = !x.doc;
    return h('li', { key: v.so + v.t, className: 'ib-c' + (moi ? ' ib-un' : '') },
      h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': (moi ? 'Chưa xem. ' : '') + v.t, 'data-pt-go': 'mailDetail', onClickCapture: function () { window.__ibSel = 1000 + i; } }),
      h('div', { className: 'ib-c-h' }, h('span', { className: 'vk-tag' + ibTag(x.nh) }, IB_NHAN_TEN[x.nh]), h('span', { className: 'vk-code tp-num' }, v.so)),
      h('b', null, moi ? h('i', { className: 'ib-dot', 'aria-hidden': 'true' }) : null, v.t),
      h('small', null, x.from + ' · ' + v.tg),
      v.kc ? h('div', { className: 'va5-vb-a' }, h(T.Button, { size: 'sm', variant: 'secondary', icon: 'scale', 'data-pt-go': 'kc1' }, v.kc)) : null);
  }));
}
function VaTabDocs5(p) {
  if (p.docs === 'empty') return vaTabTt('docs', 'empty');
  var ds = [{ t: 'Quyết định đưa vụ án ra xét xử', so: '[Số quyết định]', tg: '21-10-2026', moi: true }, { t: 'Thông báo thụ lý vụ án', so: '[Số thông báo]', tg: '15-10-2026' }];
  if (p.judg === 'ba' || p.docs === 'kc') ds.unshift({ t: 'Bản án dân sự sơ thẩm', so: '[Số bản án]', tg: '20-10-2026', moi: true, kc: 'Kháng cáo' });
  return FCard('Văn bản tống đạt từ Tòa án', VaVbCards5(ds), true);
}

/* 1.38 / 1.39: tab Tài liệu, chứng cứ – (i) sau tiêu đề mở bảng quyền tiếp cận; không nút Thêm ở khối đã nộp; khối của tòa gom theo văn bản */
var VA_QTC = 'Đương sự được quyền tiếp cận tài liệu, chứng cứ do bên khác nộp hoặc Tòa án thu thập, trừ tài liệu liên quan đến bí mật nhà nước, thuần phong mỹ tục, bí mật nghề nghiệp, bí mật kinh doanh, bí mật cá nhân, bí mật gia đình.';
function vaTlRows(rows) {
  return h('ul', { className: 'ph-ky dt-docs dt-docs-the' }, rows.map(function (d) {
    return h('li', { key: d[0] + d[1] }, h('div', null, h('b', null, d[0]), h('small', null, d[1])), d[2] ? null : XemTep(tepTen(d)), d[2] ? null : IcoBtn('download', 'Tải về ' + d[0], 'snack:Đã tải về ' + d[0]));
  }));
}
function VaTabEvi5(p) {
  var mo = React.useState(!!p.eviInfo), anchor = React.useRef(null), host = useHost(anchor), k = p.evi;
  var nhom = function (t, rows) { return h(F, { key: t }, h('p', { className: 'dt-grp-t' }, t), vaTlRows(rows)); };
  var iBtn = h('span', { role: 'button', tabIndex: 0, className: 'va5-i', 'aria-label': 'Quyền tiếp cận tài liệu, chứng cứ', onClick: function (e) { e.stopPropagation(); mo[1](true); } }, h(T.Icon, { name: 'info' }));
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    FCard(h('span', { className: 'va5-ti' }, 'Tài liệu, chứng cứ đã nộp' + (k ? '' : ' · 8 tài liệu'), iBtn),
      k === 'loading' ? VaTai('Đang tải danh sách tài liệu…') : k === 'err' ? VaLoi('Không tải được danh sách tài liệu.', false) : k === 'empty' ? P('Chưa có tài liệu, chứng cứ nào được giao nộp cho vụ án này.', 'ph-muted') : h(F, null,
        nhom('Nộp kèm đơn khởi kiện · 20-10-2026', [['Hợp đồng vay tài sản', 'Bản sao có chứng thực · Đã nộp lúc 20-10-2026 16:05'], ['Giấy nhận tiền', 'Bản chính · Đã nộp lúc 20-10-2026 16:05']]),
        nhom('Giao nộp bổ sung · 24-10-2026', [['Sao kê chuyển khoản', 'Biên nhận BN-2026-0105'], ['Tin nhắn trao đổi', 'Biên nhận BN-2026-0105']]),
        nhom('Cung cấp theo yêu cầu của Tòa án · [Ngày gửi]', [['[Tên tài liệu]', 'Biên nhận [Số biên nhận]']]),
        nhom('Được sao gửi từ đương sự khác', [['[Tên tệp]', 'Trần Văn Bình · Nhận lúc [Ngày giờ nhận]']]),
        /* v616 (1.38): tài liệu kèm đơn phản tố / yêu cầu độc lập / BPKCTT của chính người dùng, nhóm theo loại đơn (web chi-tiet.tsx nhomPhaiSinh) */
        nhom('Đơn yêu cầu áp dụng biện pháp khẩn cấp tạm thời', [['[Tên tài liệu]', 'Đã nộp lúc [Ngày giờ nộp]'], ['[Tên tài liệu] ', 'Đã nộp lúc [Ngày giờ nộp]']])), true),
    FCard('Tài liệu, chứng cứ của tòa' + (k ? '' : ' · 2 tài liệu'), h(F, null,
      k === 'loading' ? VaTai('Đang tải tài liệu của tòa…') : k === 'err' ? VaLoi('Không tải được tài liệu của tòa.', false) : k === 'empty' ? P('Chưa có tài liệu, chứng cứ do Tòa án cung cấp.', 'ph-muted')
        : nhom('Thông báo thụ lý vụ án · [Số thông báo]', [['[Tên tệp đính kèm]', 'Số [Số văn bản]'], ['[Tên tệp đính kèm] ', 'Tệp chưa sẵn sàng để xem', true]]),
      h(T.Button, { variant: 'tint', icon: 'plus', className: 'ph-co-add', 'data-pt-go': 'dyc1_tt' }, 'Yêu cầu Tòa án thu thập chứng cứ')), true),
    FCard('Sao chụp tài liệu, chứng cứ', h(F, null, P('Đương sự và người bảo vệ quyền, lợi ích hợp pháp của đương sự có quyền yêu cầu sao chụp tài liệu, chứng cứ trong hồ sơ vụ án, trừ những tài liệu, chứng cứ không được phép sao chụp theo quy định pháp luật.', 'ph-muted'),
      h('div', { className: 'dt-acts dt-acts-col' }, h(T.Button, { variant: 'secondary', icon: 'copy', 'data-pt-go': 'caseCopy' }, 'Sao chụp tài liệu do đương sự khác xuất trình'), h(T.Button, { variant: 'secondary', icon: 'copy', 'data-pt-go': 'caseCopyCourt' }, 'Sao chụp tài liệu do Tòa án thu thập'))), true),
    mo[0] && host ? h(LvSheet, { host: host, title: 'Quyền tiếp cận tài liệu, chứng cứ', onClose: function () { mo[1](false); } }, P(VA_QTC, 'va5-qtc')) : null);
}

/* 1.40 / 1.41: tab Bản án / Quyết định – khối "Bản án" và "Quyết định của Tòa án" (khối rỗng ẩn), bỏ ghi chú Điều 219/269 */
function VaBaThe5(d) {
  return h('li', { key: d.t, className: 'va5-ba' }, h('b', { className: 'va5-ba-t' }, d.t),
    h('div', { className: 'va5-ba-tags' }, h('span', { className: 'va5-tag tp-num' }, 'Số ' + d.so), d.cap ? h('span', { className: 'va5-tag va5-tag-cap' }, d.cap) : null, d.hl ? h('span', { className: 'va5-tag va5-tag-hl' }, d.hl) : null),
    h('small', { className: 'va5-ba-d' }, 'Tuyên / ban hành ngày ' + d.ngay + ' · ' + COURT1),
    h('div', { className: 'va5-ba-a' }, h(T.Button, { size: 'sm', variant: 'secondary', 'data-pt-go': 'mailDetail', onClickCapture: vaMoVb(d.t, d.so, d.ngay) }, 'Mở ở Hộp thư'),
      h('button', { type: 'button', className: 'va5-tl' + (d.khoa ? ' va5-tl-khoa' : ''), disabled: !!d.khoa, 'data-pt-go': d.khoa ? undefined : d.qd && SCR.tl2Va ? 'tl2Va' : 'tl1' }, h('span', null, d.tl), h(T.Icon, { name: 'chevronRight' }))),
    d.khoa ? h('p', { className: 'va5-ba-ly' }, h(T.Icon, { name: 'info' }), h('span', null, d.khoa)) : null);
}
function VaTabJudg5(p) {
  var k = p.judg, khoa = k === 'khoa';
  var ba = k === 'ba' || khoa ? [{ t: 'Bản án dân sự sơ thẩm', so: '[Số bản án]', cap: 'Sơ thẩm', hl: '[Nhãn hiệu lực]', ngay: '21-10-2026', tl: 'Yêu cầu cấp trích lục bản án', khoa: khoa ? 'Bản án này chưa có dữ liệu để cấp trích lục. Nếu cần, vui lòng liên hệ Tòa án đã ban hành.' : null }] : [];
  var qd = (k === 'dc' ? [{ t: 'Quyết định đình chỉ giải quyết vụ án dân sự', so: '[Số quyết định]', cap: 'Sơ thẩm', ngay: '28-10-2026', tl: 'Yêu cầu cấp trích lục quyết định', qd: true }] : [])
    .concat([{ t: 'Quyết định đưa vụ án ra xét xử', so: '[Số quyết định]', ngay: '21-10-2026', tl: 'Yêu cầu cấp trích lục quyết định', qd: true, khoa: khoa ? 'Quyết định này chưa có dữ liệu để cấp trích lục. Nếu cần, vui lòng liên hệ Tòa án đã ban hành.' : null }]);
  return h(F, null, ba.length ? FCard('Bản án', h('ul', { className: 'va5-bal' }, ba.map(VaBaThe5)), true) : null,
    qd.length ? FCard('Quyết định của Tòa án', h('ul', { className: 'va5-bal' }, qd.map(VaBaThe5)), true) : null);
}

/* 1.42: tab Lịch sử vụ án – dòng đầu ngày ban hành + trạng thái vụ án + Chưa đọc; tiêu đề tình trạng (không có thì tên văn bản), đậm ở mốc hiện hành; không dấu › */
function VaTabHist5(p, va) {
  if (p.hist === 'empty') return vaHistRong();
  var ds = [{ ngay: '21-10-2026', tt: va.tt, moi: true, t: '[Tình trạng vụ án]', vb: 'Quyết định đưa vụ án ra xét xử', so: '[Số quyết định]', nhan: true },
    { ngay: '[Ngày ban hành]', tt: ['[Trạng thái vụ án]', 'success'], t: '[Tình trạng vụ án]', vb: 'Thông báo thụ lý vụ án', so: '[Số thông báo]' },
    { ngay: '[Ngày ban hành]', tt: ['[Trạng thái vụ án]', 'success'], t: null, vb: 'Thông báo về việc bổ sung người tham gia tố tụng', so: '[Số thông báo]', nhan: true }];
  return h('section', { className: 'tp-sec-card tp-sec-open ls-card' }, h('div', { className: 'tp-sec-body' }, h('ol', { className: 'va4-hs va5-hs' }, ds.map(function (x, i) {
    var noi = h(F, null, h('span', { className: 'va4-hs-dot', 'aria-hidden': 'true' }),
      h('div', { className: 'va4-hs-c' }, h('div', { className: 'va4-hs-r' }, h('span', { className: 'tp-num' }, x.ngay), h(T.StatusBadge, { tone: x.tt[1] }, x.tt[0]), x.moi ? h('span', { className: 'va4-chip va4-chip-moi' }, 'Chưa đọc') : null),
        h('b', { className: i === 0 ? 'va5-hs-now' : undefined }, x.t || x.vb), h('small', null, x.vb + ' · Số ' + x.so + ' · Sơ thẩm')));
    return h('li', { key: i, className: (i === 0 ? 'va4-hs-now ' : '') + (x.nhan ? 'va4-hs-bam' : '') }, x.nhan ? h('button', { type: 'button', className: 'va4-hs-it', 'data-pt-go': 'mailDetail', onClickCapture: vaMoVb(x.vb, x.so, x.ngay, x.moi) }, noi) : h('div', { className: 'va4-hs-it' }, noi));
  }))));
}

/* nội dung tab Chi tiết vụ án (v583) */
function VaTab5(p, va, t) {
  if (t === 'info') return VaTabInfo(p, va);
  if (t === 'don') return h(VaTabDon5, p);
  if (p.tabTai && VA_TT5[t]) return vaTabTt(t, p.tabTai);
  if (t === 'stages') return VaTabStages5(p, va);
  if (t === 'hearings') return VaTabHear5(p);
  if (t === 'docs') return VaTabDocs5(p);
  if (t === 'evidence') return h(VaTabEvi5, p);
  if (t === 'judgments') return VaTabJudg5(p);
  return VaTabHist5(p, va);
}
/* 1.27: bảng "Chọn loại đơn cần tạo" – thêm miễn, giảm tạm ứng án phí (khi có thông báo nộp tiền), nhãn giai đoạn (GIAI_DOAN_MUC web), loại bị khóa mờ + lý do */
var VA_TAO_GD = { rd1: 'Trước & sau thụ lý', bp1: 'Trước & sau thụ lý' };
function vaTaoG(p) {
  if (p.dmTao) return p.dmTao; /* v595 */
  var tt = p.taoTt || 'dgq', nhomKK = !p.vaiTro;
  return VA_TAO.map(function (g, i) {
    var it = g[2].slice(); if (i === 2 && !p.noFee) it.unshift(['Đề nghị miễn, giảm tạm ứng án phí', '', 'mg1']);
    var rows = it.map(function (x) {
      var k = x[2] === 'rd1' ? 'rut' : x[2] === 'tr1' ? 'tr' : x[2] === 'mg1' ? 'mg' : /^(evidence2|sg1)$/.test(x[2]) ? 'gn' : '';
      var m = vaTaoMuc({ k: k }, tt, nhomKK); if (!m) return null;
      return [x[0], x[2], VA_TAO_IC[x[2]] || (/chi phí|án phí/.test(x[0]) ? 'wallet' : 'file'), VA_TAO_GD[x[2]] || 'Sau thụ lý', m.khoa];
    }).filter(Boolean);
    return [g[0], ['do', 'xanh', 'vang', 'luc', 'luc'][i], rows];
  }).filter(function (g) { return g[2].length; });
}
/* 1.20: banner gợi ý trước thanh tab (máy chủ trả) */
function vaGoiYs(ks) { return ks.map(function (k) { return VaGoiY(VA_GY[k]); }); }

/* v585 (25/11/2026): danh sách Vụ án chép kiểu thẻ Danh sách đơn khởi kiện (QdCard) – chỉ chép style, giữ trường của vụ án:
   hàng đầu nhãn trạng thái + sao; tên vụ án; khối nhãn – giá trị (Mã vụ án, Loại án, Tư cách, Cấp xét xử, Tòa án, Thụ lý, Phiên tòa, Hạn kháng cáo);
   thanh tiến trình tố tụng dưới vạch như khối Việc cần làm; bỏ ô viết tắt loại án và "Xem chi tiết ›" (chạm cả thẻ để mở) */
/* v587 (25/11/2026): thẻ vụ án theo ảnh người dùng – 5 dòng nhãn – giá trị không dấu hai chấm: Mã định danh, Ngày thụ lý, Tư cách, Cấp xét xử (chữ thường, cấp hiện tại), Tòa án */
function VaCard(p) {
  var v = p.v, rows = [['Mã định danh', h('span', { className: 'tp-num' }, vaMaDd(v))], ['Ngày thụ lý', h('span', { className: 'tp-num' }, v.thuLy)], ['Tư cách', v.vt], ['Cấp xét xử', vaCapCur(v)], ['Tòa án', v.toa]];
  return h('li', { className: 'qd-c qc va5-c', 'data-ma': v.ma },
    h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem chi tiết vụ án ' + v.ma, 'data-pt-go': v.go, onClickCapture: function () { window.__vaSel = { ma: v.ma, ten: v.t }; } }),
    h('div', { className: 'qc-top va-mau-top' }, VaNhanTT(v), v.tinh ? VaNhanTinh(v) : null, h('span', { className: 'qc-sp' }), /* v596: đủ trạng thái + tình trạng, bộ màu */
      h('button', { type: 'button', className: 'ph-mail2-btn qd-star' + (v.ghim ? ' ph-mail2-on' : ''), 'aria-pressed': !!v.ghim, 'aria-label': v.ghim ? 'Bỏ đánh dấu' : 'Đánh dấu theo dõi', onClick: function () { v.ghim = !v.ghim; p.onDoi(); } }, h(T.Icon, { name: 'star' }))),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, v.t)),
    h('dl', { className: 'qc-ben' }, rows.map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0]), h('dd', null, r[1])); })), /* v586: bỏ thanh tiến trình tố tụng trên thẻ */
    VaNhapDong(v, false, true)); /* v607: dòng Đã nhập vào ở cuối thẻ */
}

/* v589 (25/11/2026): mã định danh vụ án theo cấu trúc HSVA{yy}-{yyyyMMddHHmmss} (ví dụ HSVA26-20261124113536) – dữ liệu mẫu suy từ ngày thụ lý + số thứ tự mã */
function vaMaDd(v) {
  var d = /^(\d{2})-(\d{2})-(\d{4})$/.exec(v.thuLy || ''), m = /(\d+)$/.exec(v.ma || ''), n = m ? parseInt(m[1], 10) : 0;
  if (!d) return v.ma;
  var z = function (x) { return (x < 10 ? '0' : '') + x; };
  return 'HSVA' + d[3].slice(2) + '-' + d[3] + d[2] + d[1] + z(8 + n % 9) + z(n * 7 % 60) + z(n * 13 % 60);
}

/* v596 (25/11/2026): bộ màu nhãn trạng thái + tình trạng giải quyết vụ án – dùng bảng màu nhãn (tag) của design system, không thêm mã màu.
   Trạng thái (không chấm): mỗi trạng thái một màu. Tình trạng (có chấm): màu theo nhóm nghĩa. Xác định theo tên (dữ liệu chỉ là ví dụ). */
var VA_MAU_TT = [
  [/tạm đình chỉ/i, 'cam'], [/^đình chỉ/i, 'xam'], [/xét lại/i, 'tim'], [/tuyên án|kháng cáo/i, 'vang'],
  [/hiệu lực|đã giải quyết|đã xử lý/i, 'la'], [/.*/, 'duong']];
var VA_MAU_TINH = [
  [/đã giải quyết kháng cáo|phiên họp giải quyết kháng cáo|một phần yêu cầu|giải quyết khiếu nại/i, 'cham'],
  [/thụ lý/i, 'duong'],
  [/^bản án \/ quyết định đã được sửa/i, 'vang'],
  [/yêu cầu bổ sung|bổ sung người|chờ nộp/i, 'nau'],
  [/tạm đình chỉ|tạm ngừng|hoãn/i, 'cam'],
  [/đình chỉ|không mở|không công nhận|trả lại|chuyển sang thủ tục phá sản/i, 'xam'],
  [/xét lại|xem xét lại|kháng nghị/i, 'tim'],
  [/hiệu lực|đã công nhận|phúc thẩm — có|buộc thi hành|quyết định gđt|sửa chữa, bổ sung/i, 'la'],
  [/tuyên án|tuyên bố phá sản/i, 'vang'],
  [/hòa giải|thỏa thuận/i, 'ngoc'],
  [/xét xử|phiên tòa|phiên họp|hội nghị chủ nợ|nghị quyết/i, 'lam'],
  [/phục hồi/i, 'cham2'],
  [/.*/, 'duong']];
function vaMau(L, s) { s = s || ''; for (var i = 0; i < L.length; i++) if (L[i][0].test(s)) return L[i][1]; return 'duong'; }
function VaNhanTT(v) { return h('span', { className: 'tp-badge va-m va-m-' + vaMau(VA_MAU_TT, v.tt[0]) }, v.tt[0]); }
function VaNhanTinh(v, du) { var s = v.tinh[0];
  return h('span', { className: 'tp-badge va-m va-mt va-m-' + vaMau(VA_MAU_TINH, s) + (du ? '' : ' va-mt-cat'), title: s }, h('span', { className: 'tp-badge-dot', 'aria-hidden': 'true' }), h('span', { className: 'va-mt-x' }, s)); }

/* v598 (25/11/2026): mỗi trạng thái một màu, mỗi tình trạng một màu (người dùng chọn: thêm bảng màu tình trạng mới, kiểu nhãn nền + chấm chữ như thẻ Đơn).
   Trạng thái: nhãn nền nhạt theo token tag. Tình trạng: chấm + chữ màu --st-1..--st-60 (dựng từ 20 sắc độ, tương phản chữ ≥ 4.5:1 trên nền trắng). */
var VA_TT_MAU = { 'Đang giải quyết': 'duong', 'Đã tuyên án - trong thời hạn kháng cáo': 'vang', 'Bản án/quyết định có hiệu lực pháp luật': 'la', 'Tạm đình chỉ': 'cam', 'Đình chỉ': 'xam', 'Đang xét lại (GĐT / tái thẩm)': 'tim',
  'Đang xử lý đơn': 'cham2', 'Đang xử lý': 'lam', 'Đã giải quyết': 'ngoc', 'Đã xử lý': 'olive' };
var VA_TINH_DS = ["Đã thụ lý — chuẩn bị xét xử", "Đã có QĐ đưa vụ án ra xét xử", "Đang xét xử", "Đang hòa giải trong tố tụng", "Đã hòa giải thành — chờ QĐ công nhận", "Đã có QĐ đưa ra xét xử theo thủ tục rút gọn", "Phiên tòa hoãn", "Phiên tòa tạm ngừng", "Tiếp tục giải quyết", "Chuyển từ rút gọn sang thủ tục thông thường", "Đã thụ lý phúc thẩm", "Đã có QĐ đưa ra xét xử phúc thẩm", "Phiên tòa phúc thẩm hoãn", "Đang thông báo tìm kiếm", "Yêu cầu bổ sung tài liệu, chứng cứ", "Đã giải quyết kháng cáo đối với QĐ tạm đình chỉ / đình chỉ", "Đã giải quyết khiếu nại về QĐ xét xử theo thủ tục rút gọn", "Bổ sung người tham gia tố tụng", "Đình chỉ một phần yêu cầu — vụ án tiếp tục", "Đã có QĐ mở phiên họp giải quyết kháng cáo QĐ tạm đình chỉ / đình chỉ", "Đã chuyển hồ sơ cho Tòa án khác", "Đã nhập vụ án", "Đã tách vụ án", "Đã xác định lại / chuyển loại vụ án, vụ việc", "Phục hồi: Đã thụ lý đơn phục hồi", "Phục hồi: Đang thực hiện phương án phục hồi", "Phục hồi: Đã chuyển sang thủ tục phá sản", "Đã thụ lý đơn", "Đã mở thủ tục phá sản", "Đang triệu tập Hội nghị chủ nợ", "Đã có Nghị quyết Hội nghị chủ nợ", "Áp dụng thủ tục phục hồi", "Đang thực hiện phương án phục hồi", "Đã tuyên án / ra quyết định sơ thẩm", "Bản án / quyết định đã được sửa chữa, bổ sung", "Không mở thủ tục phá sản", "Đã tuyên bố phá sản", "Đã công nhận sự thỏa thuận", "Đã tuyên án phúc thẩm — có hiệu lực ngay", "Đã có quyết định GĐT / tái thẩm", "Đã có QĐ buộc thi hành án hành chính", "Bản án / quyết định đã có hiệu lực pháp luật", "Không công nhận kết quả hòa giải thành ngoài Tòa án", "Bản án phúc thẩm đã được sửa chữa, bổ sung", "Tạm đình chỉ", "Tạm đình chỉ xét xử phúc thẩm", "Đình chỉ", "Đình chỉ xét xử phúc thẩm", "Đình chỉ việc xét đơn yêu cầu", "Phục hồi: Đã đình chỉ thủ tục phục hồi", "Đã đình chỉ thủ tục phá sản", "Đã đình chỉ thủ tục phục hồi", "Đang xét lại theo GĐT / tái thẩm", "Phiên tòa GĐT / tái thẩm hoãn", "Đang xem xét lại, kháng nghị", "Tòa án đã nhận đơn", "Chờ nộp tạm ứng án phí / lệ phí", "Chờ nộp tạm ứng chi phí tố tụng", "Đã trả lại đơn thay đổi, bổ sung yêu cầu"];
function vaTinhSo(s) { var i = VA_TINH_DS.indexOf(s); if (i < 0) { VA_TINH_DS.push(s); i = VA_TINH_DS.length - 1; } return i % 60 + 1; }
VaNhanTT = function (v) { return h('span', { className: 'tp-badge va-m va-tt va-m-' + (VA_TT_MAU[v.tt[0]] || vaMau(VA_MAU_TT, v.tt[0])) }, v.tt[0]); };
VaNhanTinh = function (v, du) { var s = v.tinh[0];
  return h('span', { className: 'qd-tinh qc-tinh va-st' + (du ? ' va-st-du' : ''), style: { color: 'var(--st-' + vaTinhSo(s) + ')' }, title: s }, h('span', { className: 'qc-tinh-tx' }, s)); };
/* màn tra cứu bộ màu: 6 trạng thái × 55 tình trạng */
function VaBangMau() {
  var ds = VA.filter(function (v) { return /^DM-/.test(v.ma); }), nh = [];
  ds.forEach(function (v) { if (!nh.length || nh[nh.length - 1][0] !== v.tt[0]) nh.push([v.tt[0], []]); nh[nh.length - 1][1].push(v); });
  return Sub('Bộ màu trạng thái, tình trạng vụ án', h('div', { className: 'va-bm' }, nh.map(function (g) {
    return h('section', { key: g[0], className: 'va-bm-g' }, h('div', { className: 'va-bm-h' }, VaNhanTT(g[1][0]), h('span', { className: 'va-bm-n' }, g[1].length + ' tình trạng')),
      h('ul', null, g[1].map(function (v) { return h('li', { key: v.ma }, VaNhanTinh(v, true)); })));
  })));
}

/* v600 (25/11/2026): Việc cần làm – tiêu đề + số đếm; chỉ hiện việc mới nhất được nhận (dữ liệu mẫu: phần tử đầu = mới nhất),
   nút chữ "Xem tất cả" mở rộng tại chỗ, bấm lại "Thu gọn" (người dùng chọn PA B) */
function vaViecKhoi(v, moi) { return h(F, { key: v[0] }, KhoiViec({ tone: 'warning', t: v[1], han: (moi ? 'Nhận [ngày nhận việc] · ' : '') + 'Hạn [hạn xử lý]', btns: [Btn(v[2], 'primary', { icon: v[3], 'data-pt-go': v[4] || undefined })] })); }
/* v601: dùng chung cho màn gốc (p.els = khối việc đã dựng sẵn, phần tử đầu = mới nhất); tiêu đề + số đếm luôn hiện khi có việc, "Xem tất cả" chỉ khi > 1 việc */
function VaViecDs(p) {
  var els = p.els || p.ds.map(function (v, i) { return vaViecKhoi(v, i === 0); }), n = els.length, mo = React.useState(false), m = mo[0];
  return h('div', { className: 'va4-acts dm-acts' },
    n ? h('div', { className: 'dv-h' }, h('b', null, 'Việc cần làm'), h('span', { className: 'dv-dem' }, n), h('span', { className: 'qc-sp' }),
      n > 1 ? h('button', { type: 'button', className: 'dv-link', 'aria-expanded': m, onClick: function () { mo[1](!m); } }, m ? 'Thu gọn' : 'Xem tất cả', h(T.Icon, { name: m ? 'chevronUp' : 'chevronDown' })) : null) : null,
    (m ? els : els.slice(0, 1)).map(function (e, i) { return h(F, { key: i }, e); }),
    KhungDong([{ icon: 'file', t: 'Xem đơn TN-20261020-0012', go: 'appDetail' }]));
}

/* v602 (25/11/2026): việc cần làm tuân theo trạng thái + tình trạng vụ án và tư cách người xem – MATRAN_BIEUMAU_HANHDONG (LOAI_DOITUONG TGTTDS_xx, DM_DANHMUCCHUNG TUCACHTGTTDS).
   Thứ tự mẫu: theo ma trận, phần tử đầu = mới nhất. ACTION_010 dùng khối Cung cấp tài liệu có hạn (còn / hôm nay / quá hạn). */
var VA_HD_UI = {"ACTION_001": ["Đề nghị xem xét theo thủ tục giám đốc thẩm", "Đề nghị giám đốc thẩm", "scale", "gx1"], "ACTION_055": ["Đề nghị xem xét theo thủ tục tái thẩm", "Đề nghị tái thẩm", "scale", "tx1"], "ACTION_002": ["Tham dự phiên tòa theo giấy triệu tập", "Xem lịch phiên tòa", "calendar", "caseDetailHear"], "ACTION_003": ["Tham dự phiên tòa theo giấy triệu tập", "Xem lịch phiên tòa", "calendar", "caseDetailHear"], "ACTION_005": ["Tham dự phiên tòa phúc thẩm", "Xem lịch phiên tòa", "calendar", "caseDetailHear"], "ACTION_036": ["Tham dự phiên họp, hòa giải", "Xem lịch", "calendar", "caseDetailHear"], "ACTION_037": ["Xem lịch", "Xem lịch", "calendar", "caseDetailHear"], "ACTION_040": ["Tham dự phiên tòa theo giấy triệu tập", "Xem lịch phiên tòa", "calendar", "caseDetailHear"], "ACTION_004": ["Kháng cáo bản án, quyết định sơ thẩm", "Kháng cáo", "scale", "kc1"], "ACTION_006": ["Kháng cáo quyết định giải quyết việc dân sự", "Kháng cáo", "scale", "kc1"], "ACTION_007": ["Kháng cáo quyết định tạm đình chỉ", "Kháng cáo", "scale", "kc1"], "ACTION_014": ["Kháng cáo quyết định đình chỉ", "Kháng cáo", "scale", "kc1"], "ACTION_033": ["Kháng cáo quyết định đình chỉ giải quyết việc dân sự", "Kháng cáo", "scale", "kc1"], "ACTION_010": ["Cung cấp tài liệu, chứng cứ theo yêu cầu của Tòa án", "Cung cấp tài liệu, chứng cứ", "upload", "cc1"], "ACTION_025": ["Bổ sung tài liệu, chứng cứ", "Bổ sung tài liệu, chứng cứ", "upload", "evidence1"], "ACTION_015": ["Khiếu nại việc trả lại đơn khởi kiện", "Khiếu nại", "alert", "choose"], "ACTION_132": ["Khiếu nại văn bản, thông báo tố tụng khác", "Khiếu nại", "alert", "choose"], "ACTION_029": ["Nộp văn bản ghi ý kiến đối với yêu cầu của người yêu cầu", "Nộp ý kiến", "pen", "nyyk1"], "ACTION_030": ["Nộp văn bản ghi ý kiến đối với yêu cầu khởi kiện", "Nộp ý kiến", "pen", "kkyk1"], "ACTION_031": ["Nộp văn bản ghi ý kiến đối với yêu cầu của nguyên đơn", "Nộp ý kiến", "pen", "ndyk1"], "ACTION_032": ["Rút đơn khởi kiện", "Rút đơn khởi kiện", "logout", "rd1"], "ACTION_042": ["Nộp đơn phản tố", "Nộp đơn phản tố", "pen", "px1"], "ACTION_043": ["Nộp đơn yêu cầu độc lập", "Nộp đơn yêu cầu độc lập", "pen", "yx1"], "ACTION_054": ["Thay đổi ý kiến về sự thỏa thuận", "Thay đổi ý kiến", "pen", null], "ACTION_056": ["Đề nghị miễn, giảm tạm ứng án phí", "Đề nghị miễn, giảm", "wallet", "mg1"], "HOAN_PHIEN_TOA": ["Đề nghị hoãn phiên tòa", "Đề nghị hoãn phiên tòa", "pen", "dyc2_hoan"], "ACTION_058": ["[ACTION_058 – chưa có tên trong DM_HANHDONG]", "[Nhãn nút]", "file", null], "ACTION_059": ["[ACTION_059 – chưa có tên trong DM_HANHDONG]", "[Nhãn nút]", "file", null], "ACTION_022": ["Nộp tiền tạm ứng chi phí tố tụng", "Nộp tiền", "wallet", null], "ACTION_071": ["Gửi giấy đòi nợ muộn", "Gửi giấy đòi nợ", "send", null], "ACTION_060": ["[ACTION_060 – chưa có tên trong DM_HANHDONG]", "[Nhãn nút]", "file", null]};
var VA_MT_VT = {"GS-01": {"TGTTDS_01": ["ACTION_032", "ACTION_132"], "TGTTDS_02": ["ACTION_030", "ACTION_031", "ACTION_042", "ACTION_132"], "TGTTDS_12": ["ACTION_132"], "TGTTDS_22": ["ACTION_029", "ACTION_030", "ACTION_031", "ACTION_043", "ACTION_132"], "TGTTDS_24": ["ACTION_029", "ACTION_132"]}, "GS-02": {"TGTTDS_01": ["ACTION_002", "ACTION_003", "HOAN_PHIEN_TOA"], "TGTTDS_02": ["ACTION_002", "ACTION_003", "HOAN_PHIEN_TOA"], "TGTTDS_12": ["ACTION_036", "ACTION_040", "HOAN_PHIEN_TOA"], "TGTTDS_22": ["ACTION_002", "ACTION_003", "ACTION_036", "ACTION_040", "HOAN_PHIEN_TOA"], "TGTTDS_24": ["ACTION_036", "ACTION_040", "HOAN_PHIEN_TOA"]}, "GS-04": {"TGTTDS_01": ["ACTION_004"], "TGTTDS_02": ["ACTION_004"], "TGTTDS_12": ["ACTION_006"], "TGTTDS_22": ["ACTION_004", "ACTION_006"]}, "GS-05": {"TGTTDS_01": ["ACTION_007"], "TGTTDS_02": ["ACTION_007"], "TGTTDS_22": ["ACTION_007"]}, "GS-06": {"TGTTDS_01": ["ACTION_001", "ACTION_014", "ACTION_033", "ACTION_055"], "TGTTDS_02": ["ACTION_001", "ACTION_014", "ACTION_055"], "TGTTDS_12": ["ACTION_033"], "TGTTDS_22": ["ACTION_001", "ACTION_014", "ACTION_033", "ACTION_055"], "TGTTDS_24": ["ACTION_033"]}, "GS-07": {"TGTTDS_01": ["ACTION_036"], "TGTTDS_02": ["ACTION_036"], "TGTTDS_22": ["ACTION_036"]}, "GS-08": {"TGTTDS_01": ["ACTION_054", "ACTION_132"], "TGTTDS_02": ["ACTION_054", "ACTION_132"], "TGTTDS_22": ["ACTION_054", "ACTION_132"]}, "GS-09": {"TGTTDS_01": ["ACTION_001", "ACTION_055"], "TGTTDS_02": ["ACTION_001", "ACTION_055"], "TGTTDS_12": ["ACTION_001", "ACTION_055"], "TGTTDS_22": ["ACTION_001", "ACTION_055"], "TGTTDS_24": ["ACTION_001", "ACTION_055"]}, "GS-10": {"TGTTDS_01": ["ACTION_003", "ACTION_015", "ACTION_037", "HOAN_PHIEN_TOA"], "TGTTDS_02": ["ACTION_003", "ACTION_015", "ACTION_037", "HOAN_PHIEN_TOA"], "TGTTDS_22": ["ACTION_003", "ACTION_015", "ACTION_037", "HOAN_PHIEN_TOA"]}, "GS-11": {"TGTTDS_01": ["ACTION_002"], "TGTTDS_02": ["ACTION_002"], "TGTTDS_12": ["ACTION_040"], "TGTTDS_22": ["ACTION_002", "ACTION_040"], "TGTTDS_24": ["ACTION_040"]}, "GS-12": {"TGTTDS_01": ["ACTION_002"], "TGTTDS_02": ["ACTION_002"], "TGTTDS_12": ["ACTION_040"], "TGTTDS_22": ["ACTION_002", "ACTION_040"], "TGTTDS_24": ["ACTION_040"]}, "GS-17": {"TGTTDS_01": ["ACTION_005", "HOAN_PHIEN_TOA"], "TGTTDS_02": ["ACTION_005", "HOAN_PHIEN_TOA"], "TGTTDS_12": ["ACTION_005", "HOAN_PHIEN_TOA"], "TGTTDS_22": ["ACTION_005", "HOAN_PHIEN_TOA"], "TGTTDS_24": ["ACTION_005", "HOAN_PHIEN_TOA"]}, "GS-18": {"TGTTDS_01": ["ACTION_002"], "TGTTDS_02": ["ACTION_002"], "TGTTDS_12": ["ACTION_040"], "TGTTDS_22": ["ACTION_002", "ACTION_040"], "TGTTDS_24": ["ACTION_040"]}, "GS-21": {"TGTTDS_01": ["ACTION_001", "ACTION_055"], "TGTTDS_02": ["ACTION_001", "ACTION_055"], "TGTTDS_12": ["ACTION_001", "ACTION_055"], "TGTTDS_22": ["ACTION_001", "ACTION_055"], "TGTTDS_24": ["ACTION_001", "ACTION_055"]}, "GS-26": {"TGTTDS_12": ["ACTION_033"], "TGTTDS_22": ["ACTION_033"], "TGTTDS_24": ["ACTION_033"]}, "GS-28": {"TGTTDS_01": ["ACTION_010", "ACTION_025"], "TGTTDS_02": ["ACTION_010", "ACTION_025"], "TGTTDS_12": ["ACTION_010", "ACTION_025"], "TGTTDS_22": ["ACTION_010", "ACTION_025"], "TGTTDS_24": ["ACTION_010", "ACTION_025"]}, "GS-33": {"TGTTDS_01": ["ACTION_014"], "TGTTDS_02": ["ACTION_014"], "TGTTDS_22": ["ACTION_014"]}, "GS-39": {"TGTTDS_01": ["ACTION_002"], "TGTTDS_02": ["ACTION_002"], "TGTTDS_22": ["ACTION_002"]}, "VPS-02": {"TGTTDS_01": ["ACTION_056"], "TGTTDS_02": ["ACTION_056"], "TGTTDS_12": ["ACTION_056"]}, "VPS-03": {"TGTTDS_01": ["ACTION_056"], "TGTTDS_02": ["ACTION_056"], "TGTTDS_12": ["ACTION_056"]}, "VPS-04": {"TGTTDS_01": ["ACTION_036", "ACTION_040"], "TGTTDS_02": ["ACTION_036", "ACTION_040"], "TGTTDS_12": ["ACTION_036", "ACTION_040"]}, "VPS-08": {"TGTTDS_01": ["ACTION_058", "ACTION_071"], "TGTTDS_02": ["ACTION_058", "ACTION_071"], "TGTTDS_12": ["ACTION_058", "ACTION_071"]}, "VPS-09": {"TGTTDS_01": ["ACTION_059"], "TGTTDS_02": ["ACTION_059"], "TGTTDS_12": ["ACTION_059"]}, "VPS-11": {"TGTTDS_01": ["ACTION_060"], "TGTTDS_02": ["ACTION_060"], "TGTTDS_12": ["ACTION_060"]}, "VPH-03": {"TGTTDS_01": ["ACTION_060"], "TGTTDS_02": ["ACTION_060"], "TGTTDS_12": ["ACTION_060"]}, "RS-02": {"TGTTDS_01": ["ACTION_022", "ACTION_056"], "TGTTDS_02": ["ACTION_022"], "TGTTDS_12": ["ACTION_022", "ACTION_056"], "TGTTDS_22": ["ACTION_022"]}};
function vaVtMa(s) { s = s || '';
  return /bị yêu cầu/i.test(s) ? 'TGTTDS_24' : /nguyên đơn|người khởi kiện/i.test(s) ? 'TGTTDS_01' : /bị đơn|người bị kiện/i.test(s) ? 'TGTTDS_02' : /người yêu cầu/i.test(s) ? 'TGTTDS_12' : /liên quan|QL, NV/i.test(s) ? 'TGTTDS_22' : null; }
function vaGsMa(va) { if (va.gs) return va.gs; var s = va.tinh && va.tinh[0]; for (var k in GS) if (GS[k] === s) return k; return null; }
function vaViecTheoTt(va, p, khoi010) {
  var m = VA_MT_VT[vaGsMa(va)] || {}, vt = vaVtMa(p.vaiTro || va.vt), ds = vt ? (m[vt] || []) : [];
  var da = {}; ds = ds.filter(function (a) { var k = a === 'ACTION_010' ? a : (VA_HD_UI[a] || [a])[0]; if (da[k]) return false; da[k] = 1; return true; }); /* trùng tên việc (ACTION_002/003…) chỉ hiện 1 */
  return ds.map(function (a, i) { if (a === 'ACTION_010') return khoi010; var u = VA_HD_UI[a]; return u ? vaViecKhoi([a].concat(u), i === 0) : null; }).filter(Boolean);
}


/* ===== v604 (25/11/2026): Status-color cho trạng thái + tình trạng Vụ án và Đơn (người dùng duyệt demo-status-color-2026-11-25) =====
   Trạng thái: mỗi trạng thái 1 màu cố định – nhãn nền -tint, viền -border, chữ st-N. Tình trạng: chấm -dot + chữ st-N;
   59 + 60 tình trạng > 30 màu nên dùng lại: thứ tự trong danh sách, bước 7 trên vòng 29 màu (bỏ xám xanh st-30, để cho trạng thái). */
/* v605: bỏ hồng, tím (st-18…24, st-29); Đình chỉ + Tạm đình chỉ cùng đỏ gạch st-1, nhãn đậm hơn (SC_DUNG); 8 trạng thái còn lại tông lạnh, trầm */
var SC_TT_VA = { 'Đang giải quyết': 15, 'Đã tuyên án - trong thời hạn kháng cáo': 13, 'Bản án/quyết định có hiệu lực pháp luật': 9, 'Tạm đình chỉ': 1, 'Đình chỉ': 1, 'Đang xét lại (GĐT / tái thẩm)': 17, 'Đang xử lý đơn': 27, 'Đang xử lý': 16, 'Đã giải quyết': 11, 'Đã xử lý': 30 };
var SC_DUNG = ['Tạm đình chỉ', 'Đình chỉ'];
var SC_TT_DON = { 'Chưa gửi': 30, 'Lưu tạm': 30, 'Chờ ký số': 25, 'Đã gửi đơn': 16, 'Đang xử lý': 14, 'Đã xử lý': 10 };
var SC_DON_TT = [["Chưa gửi", "Lưu tạm / Chờ ký số"], ["Chưa gửi", "Lưu tạm"], ["Chưa gửi", "Đơn nháp — chưa gửi Tòa án"], ["Chờ ký số", "Chờ đủ chữ ký của các nguyên đơn"], ["Đã gửi đơn", "Tòa án đã nhận đơn"], ["Đã gửi đơn", "Đang chờ Tòa chấp nhận"], ["Đang xử lý", "Chờ sửa đổi, bổ sung đơn"], ["Đang xử lý", "Đã sửa đổi, bổ sung, chờ Tòa án xem xét"], ["Đang xử lý", "Chờ nộp lệ phí phá sản"], ["Đang xử lý", "Đang chờ giải quyết đề nghị xem xét lại việc trả lại đơn"], ["Đang xử lý", "Đang chờ giải quyết yêu cầu rút đơn"], ["Đang xử lý", "Yêu cầu sửa đổi, bổ sung đơn"], ["Đang xử lý", "Chờ nộp tạm ứng án phí / lệ phí"], ["Đang xử lý", "Đang hòa giải / đối thoại tiền tố tụng"], ["Đang xử lý", "Đã thụ lý"], ["Đang xử lý", "Đang xem xét lý do kháng cáo quá hạn"], ["Đang xử lý", "Chờ nộp tạm ứng chi phí tố tụng"], ["Đang xử lý", "Đã chuyển Tòa án khác"], ["Đang xử lý", "Đang giải quyết khiếu nại việc trả lại đơn"], ["Đang xử lý", "Chờ lựa chọn hòa giải / đối thoại (lần 1)"], ["Đang xử lý", "Chờ lựa chọn hòa giải / đối thoại (lần 2)"], ["Đang xử lý", "Đã ghi nhận ý kiến lựa chọn"], ["Đang xử lý", "Đã chỉ định Hòa giải viên"], ["Đang xử lý", "Chờ phiên họp ghi nhận kết quả hòa giải"], ["Đang xử lý", "Đã ghi nhận kết quả hòa giải / đối thoại"], ["Đang xử lý", "Yêu cầu làm lại / sửa đổi đơn kháng cáo"], ["Đang xử lý", "Chấp nhận kháng cáo quá hạn"], ["Đang xử lý", "Chờ nộp tạm ứng án phí phúc thẩm"], ["Đang xử lý", "Đã thụ lý phúc thẩm"], ["Đang xử lý", "Đã thay đổi, bổ sung kháng cáo"], ["Đang xử lý", "Yêu cầu sửa đổi, bổ sung đơn đề nghị"], ["Đang xử lý", "Đã kháng nghị GĐT / tái thẩm"], ["Đang xử lý", "Chấm dứt hòa giải tiền tố tụng — chuyển thụ lý"], ["Đang xử lý", "Đã giải quyết khiếu nại — khôi phục xử lý đơn"], ["Đang xử lý", "Đã được miễn tạm ứng án phí / chi phí tố tụng"], ["Đang xử lý", "Không công nhận kết quả hòa giải / đối thoại thành — tiếp tục xử lý đơn"], ["Đang xử lý", "Đã thụ lý đề nghị, kiến nghị xem xét lại QĐ công nhận"], ["Đang xử lý", "QĐ công nhận bị hủy — giải quyết theo thủ tục tố tụng"], ["Đang xử lý", "Hồ sơ đang ở Viện kiểm sát"], ["Đang xử lý", "Đang xem xét, giải quyết khiếu nại"], ["Đã xử lý", "Đã chuyển đơn sang Tòa án khác"], ["Đã xử lý", "Đã trả lại đơn"], ["Đã xử lý", "Đã thụ lý · {mã vụ việc}"], ["Đã xử lý", "Đã đưa vào vụ án (phản tố / yêu cầu độc lập)"], ["Đã xử lý", "Đã trả lại đơn kháng cáo"], ["Đã xử lý", "Không chấp nhận kháng cáo quá hạn"], ["Đã xử lý", "Hòa giải thành — đã công nhận"], ["Đã xử lý", "Đã xét xử — có bản án / quyết định"], ["Đã xử lý", "Người nộp đã rút đơn"], ["Đã xử lý", "Đơn đề nghị GĐT / TT được chấp nhận"], ["Đã xử lý", "Đơn đề nghị GĐT / TT không được chấp nhận"], ["Đã xử lý", "Công nhận kết quả hòa giải tiền tố tụng — kết thúc"], ["Đã xử lý", "Từ chối xử lý"], ["Đã xử lý", "Đã cấp trích lục / bản sao"], ["Đã xử lý", "Từ chối cấp trích lục / bản sao"], ["Đã xử lý", "Đã giải quyết khiếu nại — giữ nguyên việc trả lại đơn"], ["Đã xử lý", "Đã trả lại đơn thay đổi, bổ sung yêu cầu"], ["Đã xử lý", "Đã đình chỉ xét xử GĐT / tái thẩm"], ["Đã xử lý", "Đã giải quyết khiếu nại"], ["Đã xử lý", "Đã dừng xem xét khiếu nại — trả lại đơn"]];
var SC_DON_TINH = SC_DON_TT.map(function (r) { return r[1]; });
var SC_TINH_MAU = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 25, 26, 27, 28]; /* 21 màu cho tình trạng: bỏ hồng, tím và st-30 (để cho trạng thái) */
function scSo(ds, s) { var i = ds.indexOf(s); if (i < 0) { ds.push(s); i = ds.length - 1; } return SC_TINH_MAU[(i * 5) % SC_TINH_MAU.length]; }
function scTinhVa(s) { return scSo(VA_TINH_DS, s); }
function scTinhDon(s) { return scSo(SC_DON_TINH, s); }
function scVar(n) { return { '--c': 'var(--st-' + n + ')', '--t': 'var(--st-' + n + '-tint)', '--b': 'var(--st-' + n + '-border)', '--d': 'var(--st-' + n + '-dot)' }; }
function ScNhan(s, n, cls) { return h('span', { className: 'tp-badge st-tt' + (cls ? ' ' + cls : ''), style: scVar(n) }, s); }
function ScTinh(s, n, du) { return h('span', { className: 'qd-tinh qc-tinh va-st st-ti' + (du ? ' va-st-du' : ''), style: scVar(n), title: s }, h('span', { className: 'qc-tinh-tx' }, s)); }
VaNhanTT = function (v) { var n = SC_TT_VA[v.tt[0]]; return n ? ScNhan(v.tt[0], n, SC_DUNG.indexOf(v.tt[0]) >= 0 ? 'st-dung' : null) : h('span', { className: 'tp-badge va-m va-tt va-tt-x' }, v.tt[0]); };
VaNhanTinh = function (v, du) { return ScTinh(v.tinh[0], scTinhVa(v.tinh[0]), du); };
/* Đơn: nhãn StatusBadge mang tên trạng thái / tình trạng đơn → Status-color; nhãn khác giữ 5 tông của design system */
(function () {
  var SB = T.StatusBadge;
  function txt(c) { return typeof c === 'string' ? c : Array.isArray(c) && c.every(function (y) { return typeof y === 'string'; }) ? c.join('') : null; }
  var ScSB = function (p) { var s = txt(p.children);
    if (!s || p.variant === 'outline') return h(SB, p);
    if (SC_TT_DON[s]) return ScNhan(s, SC_TT_DON[s], p.className);
    if (SC_DON_TINH.indexOf(s) >= 0) return ScTinh(s, scTinhDon(s));
    return h(SB, p); };
  try { T.StatusBadge = ScSB; } catch (e) { }
  /* chấm tình trạng trên thẻ Danh sách đơn (span qd-tinh): chỉ tô các tình trạng có trong danh mục tình trạng đơn */
  function to() { document.querySelectorAll('.qd-tinh:not(.st-ti):not([data-sc])').forEach(function (e) { var s = (e.getAttribute('title') || e.textContent || '').trim(); e.setAttribute('data-sc', 1);
    if (SC_DON_TINH.indexOf(s) < 0) return; var st = scVar(scTinhDon(s)); Object.keys(st).forEach(function (k) { e.style.setProperty(k, st[k]); }); e.classList.add('st-ti'); }); }
  new MutationObserver(to).observe(document.documentElement, { childList: true, subtree: true });
})();
/* màn tra cứu Status-color: mỗi trạng thái, tình trạng kèm số st-N */
function ScBangMau() {
  var gDon = []; SC_DON_TT.forEach(function (r) { if (!gDon.length || gDon[gDon.length - 1][0] !== r[0]) gDon.push([r[0], []]); gDon[gDon.length - 1][1].push(r[1]); });
  var k = function (n) { return h('span', { className: 'sc-k' }, 'st-' + n); };
  return Sub('Status-color – trạng thái, tình trạng', h('div', { className: 'sc-bm' },
    h('section', null, h('h3', null, 'Vụ án – ' + Object.keys(SC_TT_VA).length + ' trạng thái'), h('ul', null, Object.keys(SC_TT_VA).map(function (s) { return h('li', { key: s }, ScNhan(s, SC_TT_VA[s], SC_DUNG.indexOf(s) >= 0 ? 'st-dung' : null), k(SC_TT_VA[s])); }))),
    h('section', null, h('h3', null, 'Vụ án – ' + VA_TINH_DS.length + ' tình trạng'), h('ul', null, VA_TINH_DS.slice().map(function (s) { var n = scTinhVa(s); return h('li', { key: s }, ScTinh(s, n, true), k(n)); }))),
    h('section', null, h('h3', null, 'Đơn – 5 trạng thái, ' + SC_DON_TT.length + ' tình trạng'), gDon.map(function (g) {
      return h('div', { key: g[0] }, h('div', { className: 'sc-g' }, ScNhan(g[0], SC_TT_DON[g[0]]), k(SC_TT_DON[g[0]]), h('span', { className: 'sc-n' }, g[1].length + ' tình trạng')),
        h('ul', null, g[1].map(function (s) { var n = scTinhDon(s); return h('li', { key: s }, ScTinh(s, n, true), k(n)); }))); }))));
}

/* v606 (25-11-2026): dòng "Đã nhập vào {mã hồ sơ}" dưới tên vụ án (web: src/screens/vu-an/index.tsx – maHoSoNhapVao). Chạm → mở vụ án đích. Màu vàng nhạt (warning-tint) */
function VaNhapDong(v, dt, cuoi) {
  if (!v || !v.nhapVao) return null;
  var m = vaMaDd(vaTim(v.nhapVao) || { ma: v.nhapVao });
  return h('button', { type: 'button', className: 'nh-c' + (dt ? ' nh-c-dt' : '') + (cuoi ? ' nh-c-cuoi' : ''), 'data-pt-go': 'caseDetail', onClickCapture: function (e) { e.stopPropagation(); window.__vaSel = { ma: v.nhapVao }; } },
    h(T.Icon, { name: 'info' }), h('span', null, 'Đã nhập vào ', h('b', { className: 'tp-num' }, m)), h(T.Icon, { name: 'chevronRight' }));
}
