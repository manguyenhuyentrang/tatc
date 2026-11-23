/* Phần 3: Cá nhân, dịch vụ, nộp đơn khởi kiện, đăng nhập */
var ME_MENU = [
  [{ icon: 'shield', label: 'Cam kết giao dịch điện tử' }, { icon: 'pen', label: 'Quản lý chữ ký số' }, { icon: 'swap', label: 'Phương thức giao dịch điện tử' }],
  [{ icon: 'lock', label: 'Đổi mật khẩu' }, { icon: 'phone', label: 'Đăng ký lại thiết bị' }],
  [{ icon: 'message', label: 'Câu hỏi thường gặp' }, { icon: 'star', label: 'Đánh giá mức độ hài lòng' }],
  [{ icon: 'logout', label: 'Đăng xuất', danger: true }]];
/* Cá nhân (03/11/2026, phương án H): header đỏ giữ tiêu đề; thông tin tài khoản tách thành banner thẻ trắng (ảnh chữ tắt, tên, vai trò, VNeID, số định danh che, Xem) – bỏ dòng Thông tin tài khoản khỏi menu */
/* v253 (05/11/2026, chọn S2 theo ảnh mẫu): bỏ tiêu đề "Cá nhân"; header ảnh nền trang chủ phủ lớp đỏ, ảnh chữ tắt 80px viền trắng, tên 24px, chip vai trò;
   VNeID, số định danh và "Xem" bỏ khỏi header – "Thông tin tài khoản" thành dòng đầu menu */
/* v262: đổi chỗ 2 khối – Câu hỏi thường gặp / Đánh giá lên trước Đổi mật khẩu / Đăng ký lại thiết bị */
var ME_MENU_V253 = [[{ icon: 'user', label: 'Thông tin tài khoản' }].concat(ME_MENU[0]), ME_MENU[2], ME_MENU[1], ME_MENU[3]];
/* v337 (12/11/2026): mục đầu menu Cài đặt theo loại tài khoản – "Hồ sơ cá nhân" / "Hồ sơ tổ chức" (thay "Thông tin tài khoản") */
function meMenu() { var g = ME_MENU_V253.slice(); g[0] = [Object.assign({}, g[0][0], { label: laTC() ? 'Hồ sơ tổ chức' : 'Hồ sơ cá nhân' })].concat(g[0].slice(1)); return g; }
function Personal() {
  return h(Phone, { cls: 'ph-main' },
    h('div', { className: 'ph-me-top me-s2', style: { backgroundImage: 'linear-gradient(90deg,rgba(99,7,13,.95) 30%,rgba(163,19,28,.55)),url(' + HERO + ')' } },
      h('span', { className: 'me-s2-av', 'aria-hidden': 'true' }, laTC() ? TC_TAT : 'HD'), /* v333 */
      h('span', { className: 'me-s2-tx' }, h('b', null, laTC() ? TC_TEN : 'Hoàng Dương'),
        h('button', { type: 'button', className: 'me-chip me-s2-chip', 'aria-label': 'Vai trò sử dụng: ' + (laTC() ? 'Tổ chức' : 'Công dân'), onClick: noop }, laTC() ? 'Tổ chức' : 'Công dân', h(T.Icon, { name: 'chevronDown' })))),
    h(Body, { cls: 'tp-sheet' }, h(T.MenuList, { groups: meMenu() })), Nav('me'));
}
/* Thông tin tài khoản, Chỉnh sửa liên hệ (03/11/2026): khung khối 100% như Soạn đơn; thông tin chỉ đọc nhãn trái – giá trị phải (RvKV) */
/* v290 (09/11/2026): Thông tin tài khoản theo mã nguồn web /tai-khoan (screens/tai-khoan: index.tsx, ho-so-ca-nhan.tsx, ho-so-to-chuc.tsx, khoi-xac-thuc-2-lop.tsx;
   components/common: khoi-bat-xac-thuc-2-lop.tsx, modal-nhap-ma-xac-thuc.tsx, o-ma-xac-thuc.tsx). Tab demo Cá nhân / Tổ chức (chỉ để xem dữ liệu).
   Cá nhân: khối "Thông tin cá nhân" (Định danh · Chỉ đọc + Thông tin liên hệ sửa tại chỗ → hộp nhập mã 6 số). Tổ chức: "Thông tin tổ chức" (Pháp nhân + liên hệ)
   + "Người đại diện pháp luật" (danh bạ, kỳ hiệu lực, Thêm / Bổ nhiệm lại / Sửa hiệu lực / Thu hồi). Cả hai: khối "Xác thực hai yếu tố". Dữ liệu mẫu. */
function AccSec(t, c, act) { return h('section', { className: 'tp-sec-card tp-sec-open acc-sec' }, h('div', { className: 'acc-sec-h' }, h('h2', { className: 'tp-sec-head' }, h('span', null, t)), act || null), h('div', { className: 'tp-sec-body' }, c)); }
function AccSub(t, act) { return h('div', { className: 'acc-sub' }, h('h3', null, t), act || null); }
function AccBtn(label, v, o) { return h(T.Button, Object.assign({ variant: v || 'secondary', className: 'acc-l' }, o || {}), label); }
/* hộp thoại giữa màn gắn vào khung điện thoại (nền mờ không quay lại màn trước) */
function AccDlg(p) {
  return ReactDOM.createPortal(h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-co-sheet acc-dlg' }, h('div', { className: 'ph-scrim', onClick: p.onClose }),
    h('div', { className: 'tp-dlg tp-dlg-center', role: 'dialog', 'aria-modal': 'true', 'aria-label': p.title },
      h('div', { className: 'tp-dlg-head' }, h('h3', null, p.title), h('button', { type: 'button', className: 'tp-icon-btn acc-l', 'aria-label': 'Đóng hộp thoại', onClick: p.onClose }, h(T.Icon, { name: 'x' }))),
      h('div', { className: 'tp-dlg-body' }, p.children), p.foot ? h('div', { className: 'tp-dlg-foot' }, p.foot) : null)), p.host);
}
function AccSheet(p) { return h(LvSheet, { host: p.host, title: p.title, onClose: p.onClose, foot: p.foot }, p.children); }
/* hộp nhập mã 6 chữ số (ModalNhapMaXacThuc) */
function AccOtp(p) {
  var m = React.useState(''), ok = /^\d{6}$/.test(m[0]);
  return h(AccDlg, { host: p.host, title: p.title || 'Xác thực hai yếu tố', onClose: p.onClose,
    foot: h(F, null, AccBtn('Hủy', 'secondary', { onClick: p.onClose }), AccBtn('Xác nhận', 'primary', { disabled: !ok, onClick: function () { if (ok) p.onOk(); } })) },
    h('p', { className: 'acc-mota' }, p.desc || 'Nhập mã 6 chữ số trên ứng dụng Authenticator để tiếp tục.'),
    h(T.TextField, { className: 'acc-nolbl', label: 'Mã 6 chữ số trên ứng dụng Authenticator', inputMode: 'numeric', maxLength: 6, value: m[0], onChange: function (e) { m[1](e.target.value.replace(/\D/g, '').slice(0, 6)); } })); /* v298: ẩn nhãn ô mã trong hộp thoại (vẫn đọc được bằng trình đọc màn hình) */
}
function accSnack(t) { if (window.__ptSnack) window.__ptSnack(t); }

/* ---- Xác thực hai yếu tố (KhoiXacThuc2Lop) ---- */
var ACC_MA_DP = ['4821-9930', '7310-2846', '5592-0471', '1608-3725', '9047-6618', '2735-5180', '6483-0952', '3369-7714', '8150-4296', '0927-3563'];
function AccQr(p) {
  var m = React.useState(''), ok = /^\d{6}$/.test(m[0]);
  return h('div', { className: 'acc-qr' },
    p.noHead ? null : h('div', { className: 'acc-qr-h' }, h('h3', null, p.title), h('button', { type: 'button', className: 'tp-icon-btn acc-l', 'aria-label': p.huy, onClick: p.onHuy }, h(T.Icon, { name: 'x' }))),
    h('ol', { className: 'acc-qr-b' },
      h('li', null, '1. Cài ứng dụng ', h('b', null, 'Google Authenticator'), ' (hoặc Microsoft Authenticator) trên điện thoại — ', h('span', { className: 'acc-lk' }, 'Android'), ' · ', h('span', { className: 'acc-lk' }, 'iOS'), '.'),
      h('li', null, '2. Trong ứng dụng, chọn thêm tài khoản → quét mã QR bên dưới.'),
      h('li', null, '3. Nhập mã 6 chữ số ứng dụng hiển thị.')),
    h('div', { className: 'acc-qr-m' }, h('div', { className: 'acc-qr-img', role: 'img', 'aria-label': 'Mã QR xác thực hai yếu tố' }, '[Mã QR]'),
      h('div', { className: 'acc-qr-k' }, h('small', null, 'Không quét được? Nhập khóa này vào ứng dụng:'),
        h('div', { className: 'acc-qr-code' }, h('code', { className: 'tp-num' }, 'JBSW Y3DP EHPK 3PXP'), h('button', { type: 'button', className: 'tp-icon-btn acc-l', 'aria-label': 'Sao chép khóa', onClick: function () { accSnack('Đã sao chép khóa'); } }, h(T.Icon, { name: 'copy' }))))),
    h(T.TextField, { label: 'Mã 6 chữ số trên ứng dụng Authenticator', inputMode: 'numeric', maxLength: 6, value: m[0], onChange: function (e) { m[1](e.target.value.replace(/\D/g, '').slice(0, 6)); } }),
    AccBtn(p.nut, 'primary', { block: true, disabled: !ok, onClick: function () { if (ok) p.onOk(); } }));
}
function AccMaDp(p) {
  var c = React.useState(false);
  return h('div', { className: 'acc-dp' },
    h(T.Notice, { tone: 'info', icon: 'info' }, '10 mã dự phòng đã được tạo. Mỗi mã chỉ dùng để xác thực 1 lần và không thể dùng lại. Vui lòng tải xuống và lưu ở nơi an toàn.'),
    h('div', { className: 'acc-dp-g' }, ACC_MA_DP.map(function (x) { return h('code', { key: x, className: 'tp-num' }, x); })),
    AccBtn('Tải xuống (.txt)', 'secondary', { block: true, icon: 'download', onClick: function () { accSnack('Đã tải xuống ma-du-phong-xac-thuc-2-lop.txt'); } }),
    h('label', { className: 'acc-dp-ck' }, h('input', { type: 'checkbox', className: 'acc-l', checked: c[0], onChange: function (e) { c[1](e.target.checked); } }), h('span', null, 'Tôi đã lưu các mã dự phòng ở nơi an toàn.')),
    AccBtn('Xong', 'primary', { block: true, disabled: !c[0], onClick: p.onXong, 'data-pt-go': p.xongGo && c[0] ? p.xongGo : undefined, onPointerDown: p.xongGo ? function () { window.__accBat = true; } : undefined }));
}
function Acc2Lop(p) {
  /* v292: trạng thái 2 lớp giữ ở màn (p.tt) để đổi tab demo không mất; mặc định chưa bật */
  var tt = p.tt, b = React.useState(p.buoc || 'xem'), d = React.useState(null);
  var s = tt[0], buoc = b[0], veXem = function () { b[1]('xem'); d[1](null); };
  var body;
  if (buoc === 'qrDoi') body = h(AccQr, { title: 'Quét mã QR bằng ứng dụng trên thiết bị mới', huy: 'Hủy đổi thiết bị', nut: 'Xác nhận thiết bị mới', onHuy: veXem,
    onOk: function () { accSnack('Đã đổi thiết bị. Các thiết bị khác đã bị đăng xuất.'); tt[1]({ bat: true, ngay: s.ngay, con: 10 }); b[1]('ma'); } });
  else if (buoc === 'qrBat') body = h(AccQr, { title: 'Quét mã QR bằng ứng dụng Authenticator', huy: 'Hủy bật xác thực hai yếu tố', nut: 'Bật xác thực hai yếu tố', onHuy: veXem,
    onOk: function () { accSnack('Đã bật xác thực hai yếu tố.'); tt[1]({ bat: true, ngay: '09-11-2026', con: 10 }); b[1]('ma'); } });
  else if (buoc === 'ma') body = h(AccMaDp, { onXong: veXem });
  else body = h(F, null,
    RvKV([['Ngày bật', s.bat ? h('span', { className: 'tp-num' }, s.ngay) : 'Chưa bật'], ['Mã dự phòng còn lại', s.bat ? h('span', { className: 'tp-num' }, s.con + '/10') : '—']]),
    !s.bat ? AccBtn('Bật xác thực hai yếu tố', 'primary', { block: true, icon: 'shield', 'data-pt-go': 'account2faBat' }) : null, /* v293: mở màn riêng */
    s.bat && s.con <= 2 ? h(T.Notice, { tone: 'warning', icon: 'alert' }, 'Sắp hết mã dự phòng — nên sinh bộ mã mới.') : null,
    s.bat ? h('div', { className: 'acc-btns' }, AccBtn('Đổi thiết bị', 'secondary', { block: true, onClick: function () { d[1]('doi'); } }),
      AccBtn('Sinh lại mã dự phòng', 'secondary', { block: true, onClick: function () { d[1]('sinhXn'); } })) : null);
  return h(F, null, AccSec('Xác thực hai yếu tố', body, s.bat && buoc === 'xem' ? h(T.StatusBadge, { tone: 'success', icon: 'shield' }, 'Đã bật') : null),
    d[0] === 'doi' ? h(AccOtp, { host: p.host, title: 'Đổi thiết bị', desc: 'Vui lòng nhập mã 6 chữ số từ ứng dụng Google Authenticator tre thiết bị hiện tại để xác nhận đổi sang thiết bị mới.', onClose: veXem, onOk: function () { d[1](null); b[1]('qrDoi'); } }) : null,
    d[0] === 'sinhXn' ? h(AccDlg, { host: p.host, title: 'Sinh lại mã dự phòng', onClose: veXem, foot: h(F, null, AccBtn('Hủy', 'secondary', { onClick: veXem }), AccBtn('Tiếp tục', 'primary', { onClick: function () { d[1]('sinhMa'); } })) },
      h('p', { className: 'acc-mota' }, 'Bộ mã dự phòng hiện tại sẽ hết hiệu lực ngay khi sinh bộ mới. Bạn muốn tiếp tục?')) : null,
    d[0] === 'sinhMa' ? h(AccOtp, { host: p.host, title: 'Sinh lại mã dự phòng', onClose: veXem, onOk: function () { d[1](null); tt[1]({ bat: true, ngay: s.ngay, con: 10 }); b[1]('ma'); } }) : null);
}

/* ---- Thông tin liên hệ: sửa tại chỗ → hộp nhập mã ---- */
/* v297: Chỉnh sửa → bảng từ đáy (2 ô + Hủy / Lưu thay đổi) → hộp nhập mã → đóng bảng, cập nhật giá trị */
function AccLienHe(p) {
  var sua = React.useState(!!p.sua), sdt = React.useState(p.sdt), em = React.useState(p.email), luu = React.useState([p.sdt, p.email]), otp = React.useState(!!p.otp);
  var mo = function () { sdt[1](luu[0][0]); em[1](luu[0][1]); sua[1](true); }, huy = function () { sua[1](false); };
  return h(F, null,
    AccSub('Thông tin liên hệ', AccBtn('Chỉnh sửa', 'secondary', { size: 'sm', icon: 'pen', onClick: mo })),
    RvKV([['Số điện thoại', luu[0][0] ? h('span', { className: 'tp-num' }, luu[0][0]) : '—'], ['Địa chỉ email', luu[0][1] || '—']]),
    sua[0] && p.host ? h(AccSheet, { host: p.host, title: 'Thông tin liên hệ', onClose: huy,
      foot: h(F, null, AccBtn('Hủy', 'secondary', { onClick: huy }), AccBtn('Lưu thay đổi', 'primary', { onClick: function () { otp[1](true); } })) },
      h('div', { className: 'acc-form' },
        h(T.TextField, { label: 'Số điện thoại', inputMode: 'tel', placeholder: p.phSdt, value: sdt[0], onChange: function (e) { sdt[1](e.target.value.replace(/\D/g, '').slice(0, 11)); } }),
        h(T.TextField, { label: 'Địa chỉ email', inputMode: 'email', placeholder: p.phEmail, value: em[0], onChange: function (e) { em[1](e.target.value); } }))) : null,
    otp[0] ? h(AccOtp, { host: p.host, desc: 'Nhập mã 6 chữ số trên ứng dụng Authenticator để lưu thay đổi thông tin liên hệ.', onClose: function () { otp[1](false); },
      onOk: function () { otp[1](false); luu[1]([sdt[0], em[0]]); sua[1](false); accSnack('Đã lưu thông tin liên hệ.'); } }) : null);
}
function AccChiDoc() { return h(T.StatusBadge, { tone: 'neutral', icon: 'lock' }, 'Chỉ đọc'); }

/* ---- Hồ sơ cá nhân ---- */
function AccCaNhan(p) {
  var dc = ME_MAU.ct + ', ' + ME_MAU.xa + ', ' + ME_MAU.tinh;
  return AccSec('Thông tin cá nhân', h(F, null,
    AccSub('Định danh', h(AccChiDoc)),
    RvKV([['Họ và tên', ME_MAU.ten], ['Ngày sinh', h('span', { className: 'tp-num' }, ME_MAU.ns)], ['Giới tính', 'Nam'], ['Quốc tịch', ME_MAU.qt], ['Số định danh cá nhân (CCCD)', h('span', { className: 'tp-num' }, ME_MAU.so)], ['Nơi thường trú', dc], ['Nơi ở hiện tại', dc]]),
    h('div', { className: 'acc-div' }),
    h(AccLienHe, { host: p.host, sdt: ME_MAU.sdt, email: ME_MAU.email, phSdt: '09xx xxx xxx', phEmail: 'ten@example.com', sua: p.sua, otp: p.otp })));
}

/* ---- Hồ sơ tổ chức ---- */
var ACC_TC = { ten: 'Công ty ABC' /* v333 */, mst: '0101234567', truSo: 'Số 25 Láng Hạ, Phường Láng, Thành phố Hà Nội', gp: 'Giấy chứng nhận đăng ký doanh nghiệp số 0101234567 do Sở Tài chính Thành phố Hà Nội cấp ngày 12-05-2015', sdt: '02438123456', email: 'lienhe@anphat.vn' };
var ACC_NDD = [
  { ten: 'Nguyễn Văn Bình', cccd: '001085004321', ns: '20-03-1985', gt: 'Nam', qt: 'Việt Nam', xm: true, ky: [{ id: 1, tu: '01-01-2025', den: null, tt: 'DANG_HIEU_LUC', cv: 'Giám đốc' }] },
  { ten: 'Trần Thị Hoa', cccd: '001190007788', ns: '11-07-1990', gt: 'Nữ', qt: 'Việt Nam', xm: true, ky: [{ id: 2, tu: '01-03-2024', den: '31-12-2024', tt: 'HET_HIEU_LUC', cv: 'Phó Giám đốc' }] },
  { ten: 'Lê Minh Quân', cccd: '001088009911', ns: '05-09-1988', gt: 'Nam', qt: 'Việt Nam', xm: false, ky: [{ id: 3, tu: '01-06-2024', den: '30-06-2025', tt: 'HET_HIEU_LUC', cv: 'Kế toán trưởng' }, { id: 4, tu: '01-12-2026', den: null, tt: 'CHUA_TOI_HAN', cv: 'Kế toán trưởng' }] }];
var ACC_TT = { DANG_HIEU_LUC: ['Đang hiệu lực', 'success'], KET_THUC_HOM_NAY: ['Hết hiệu lực cuối hôm nay', 'warning'], CHUA_TOI_HAN: ['Chưa tới hiệu lực', 'neutral'], HET_HIEU_LUC: ['Hết hiệu lực', 'neutral'] };
var ACC_KY = ['DANG_HIEU_LUC', 'KET_THUC_HOM_NAY'];
function AccNdd(p) {
  var them = React.useState(p.them ? { moi: true } : null), hl = React.useState(null), th = React.useState(null);
  var dsKy = []; ACC_NDD.forEach(function (n) { dsKy = dsKy.concat(n.ky); });
  var conNgayMai = dsKy.filter(function (k) { return k.tt === 'DANG_HIEU_LUC'; }).length;
  var list = h('div', { className: 'acc-ndd' }, ACC_NDD.map(function (n) {
    var conQuyen = n.ky.some(function (k) { return ACC_KY.indexOf(k.tt) >= 0; }), sapToi = n.ky.some(function (k) { return k.tt === 'CHUA_TOI_HAN'; });
    return h('div', { key: n.cccd, className: 'acc-ndd-c' },
      h('div', { className: 'acc-ndd-h' }, h('b', null, n.ten),
        !n.xm ? h(T.StatusBadge, { tone: 'warning', icon: 'alert' }, 'Chưa xác minh') : null,
        n.ky.length > 1 ? h(T.StatusBadge, { tone: 'neutral', icon: false }, n.ky.length + ' kỳ hiệu lực') : null),
      RvKV([['Số căn cước', h('span', { className: 'tp-num' }, n.cccd)], ['Ngày sinh', h('span', { className: 'tp-num' }, n.ns)], ['Giới tính', n.gt], ['Quốc tịch', n.qt]]),
      !conQuyen && !sapToi ? AccBtn('Bổ nhiệm lại', 'secondary', { size: 'sm', icon: 'plus', onClick: function () { them[1]({ cu: n }); } }) : null,
      h('ul', { className: 'acc-ky' }, n.ky.map(function (k) {
        var t = ACC_TT[k.tt], thuHoi = ACC_KY.indexOf(k.tt) >= 0, suaHl = k.tt !== 'HET_HIEU_LUC';
        return h('li', { key: k.id },
          h('div', { className: 'acc-ky-t' }, h('span', { className: 'tp-num' }, k.tu + ' — ' + (k.den || 'vô thời hạn')), h(T.StatusBadge, { tone: t[1], icon: false }, t[0])),
          h('small', null, k.cv),
          suaHl || thuHoi ? h('div', { className: 'acc-ky-a' }, suaHl ? AccBtn('Sửa hiệu lực', 'secondary', { size: 'sm', onClick: function () { hl[1]({ n: n, k: k }); } }) : null,
            thuHoi ? AccBtn('Thu hồi', 'secondary', { size: 'sm', onClick: function () { th[1]({ n: n, k: k, cuoi: conNgayMai - (k.tt === 'DANG_HIEU_LUC' ? 1 : 0) === 0 }); } }) : null) : null);
      })));
  }));
  var t = them[0], cu = t && t.cu, dong = function () { them[1](null); };
  return h(F, null,
    AccSec('Người đại diện pháp luật', h(F, null,
      AccBtn('Thêm người đại diện', 'tint', { block: true, icon: 'plus', onClick: function () { them[1]({ moi: true }); } }), list)),
    t ? h(AccSheet, { host: p.host, title: cu ? 'Bổ nhiệm lại — ' + cu.ten : 'Thêm người đại diện', onClose: dong,
      foot: h(F, null, AccBtn('Hủy', 'secondary', { onClick: dong }), AccBtn(cu ? 'Xác minh và bổ nhiệm lại' : 'Xác minh và thêm', 'primary', { onClick: function () { dong(); accSnack(cu ? 'Đã bổ nhiệm lại bằng một kỳ hiệu lực mới.' : 'Đã thêm người đại diện.'); } })) },
      h('div', { className: 'acc-form' },
        Tf('Họ và tên', { required: true, placeholder: 'VD: Nguyễn Văn B', defaultValue: cu ? cu.ten : undefined, readOnly: !!cu }),
        /* v291: ghép 2 trường một hàng */
        Two(Tf('Số căn cước', { required: true, placeholder: 'Nhập 12 số CCCD', inputMode: 'numeric', maxLength: 12, defaultValue: cu ? cu.cccd : undefined, readOnly: !!cu }),
          Tf('Ngày sinh', cu ? { required: true, defaultValue: cu.ns, readOnly: true } : Dt({ required: true }))),
        Two(Sf('Giới tính', { required: true, placeholder: '— Chọn giới tính —', value: cu ? cu.gt : undefined }),
          Sf('Quốc tịch', { required: true, placeholder: '— Chọn quốc tịch —', value: 'Việt Nam' })),
        Two(Tf('Chức vụ', { required: true, placeholder: 'VD: Giám đốc', maxLength: 100 }),
          Tf('Số điện thoại', { required: true, placeholder: 'VD: 0901234567', inputMode: 'tel', maxLength: 10 })),
        Tf('Email', { placeholder: 'email@vidu.vn', inputMode: 'email', maxLength: 100 }),
        Two(Tf('Hiệu lực từ', Dt({ required: true, defaultValue: cu ? '10-11-2026' : undefined })),
          Tf('Hiệu lực đến', Dt({ help: 'Bỏ trống nếu vô thời hạn.' }))))) : null,
    hl[0] ? h(AccSheet, { host: p.host, title: 'Sửa hiệu lực — ' + hl[0].n.ten, onClose: function () { hl[1](null); },
      foot: h(F, null, AccBtn('Hủy', 'secondary', { onClick: function () { hl[1](null); } }), AccBtn('Lưu thay đổi', 'primary', { onClick: function () { hl[1](null); accSnack('Đã cập nhật khoảng hiệu lực.'); } })) },
      h('div', { className: 'acc-form' }, Tf('Hiệu lực từ', Dt({ defaultValue: hl[0].k.tu })), Tf('Hiệu lực đến', Dt({ defaultValue: hl[0].k.den || undefined, help: 'Bỏ trống nếu vô thời hạn.' })))) : null,
    th[0] ? h(AccDlg, { host: p.host, title: 'Xác nhận thu hồi', onClose: function () { th[1](null); },
      foot: h(F, null, AccBtn('Hủy', 'secondary', { onClick: function () { th[1](null); } }), AccBtn('Xác nhận thu hồi', 'primary', { onClick: function () { th[1](null); accSnack('Đã thu hồi người đại diện.'); } })) },
      h('p', { className: 'acc-mota' }, h('b', null, th[0].n.ten), ' sẽ hết tư cách người đại diện của tổ chức.'),
      h('p', { className: 'acc-mota' }, 'Quyền ký còn đến 23h59 hôm nay. Văn bản đã ký trước đó không bị ảnh hưởng.'),
      th[0].cuoi ? h(T.Notice, { tone: 'warning', icon: 'alert' }, 'Đây là người đại diện cuối cùng còn hiệu lực. Sau khi thu hồi, tổ chức sẽ không thể thực hiện ký số kể từ ngày mai. Vui lòng thêm hoặc bổ nhiệm người đại diện mới để tiếp tục thực hiện ký số.') : null) : null);
}
function AccToChuc(p) {
  return h(F, null,
    AccSec('Thông tin tổ chức', h(F, null,
      AccSub('Pháp nhân', h(AccChiDoc)),
      RvKV([['Tên tổ chức', ACC_TC.ten], ['Mã số thuế', h('span', { className: 'tp-num' }, ACC_TC.mst)], ['Địa chỉ trụ sở', ACC_TC.truSo], ['Giấy phép hoạt động', ACC_TC.gp]]),
      h('div', { className: 'acc-div' }),
      h(AccLienHe, { host: p.host, sdt: ACC_TC.sdt, email: ACC_TC.email, phSdt: '02xxxxxxxx', phEmail: 'ten@congty.vn', sua: p.sua, otp: p.otp }))),
    h(AccNdd, { host: p.host, them: p.them }));
}

/* v293: màn riêng Bật xác thực hai yếu tố (không dùng bảng từ đáy): quét QR + nhập mã → 10 mã dự phòng → Xong quay lại màn tài khoản ở trạng thái Đã bật */
function AccBuoc(i, t, st, body) {
  return h('section', { className: 'acc-st acc-st-' + st }, h('div', { className: 'acc-st-h' }, h('span', { className: 'acc-st-n' }, st === 'xong' ? h(T.Icon, { name: 'check' }) : i), h('h3', null, t),
    st === 'xong' ? h(T.StatusBadge, { tone: 'success', icon: false }, 'Đã xong') : null), st === 'dang' ? h('div', { className: 'acc-st-b' }, body) : null);
}
/* v295: chọn B – 2 bước xếp dọc trên cùng một màn (gộp Cài ứng dụng + Quét mã QR); bước xong thu gọn có dấu tích */
function Acc2LopBat(p) {
  p = p || {};
  var b = React.useState(p.ma ? 'ma' : 'qr'), ma = b[0] === 'ma';
  return SubS('Bật xác thực hai yếu tố', h('div', { className: 'tp-sec-card tp-sec-open acc-steps' },
    AccBuoc(1, 'Cài ứng dụng, quét mã QR', ma ? 'xong' : 'dang', h(AccQr, { noHead: true, nut: 'Bật xác thực hai yếu tố', onOk: function () { accSnack('Đã bật xác thực hai yếu tố.'); b[1]('ma'); } })),
    AccBuoc(2, 'Lưu mã dự phòng', ma ? 'dang' : 'cho', h(AccMaDp, { xongGo: 'back', onXong: function () {} }))));
}
/* ---- Màn Thông tin tài khoản: tab demo + biến thể theo loại tài khoản ---- */
var ACC_TABS = [{ key: 'cn', label: 'Cá nhân' }, { key: 'tc', label: 'Tổ chức' }];
function Account(p) {
  p = p || {};
  var loai = [p.loai || (laTC() ? 'tc' : 'cn')], anchor = React.useRef(null), host = useHost(anchor); /* v333: bỏ tab demo – hiện theo loại tài khoản đăng nhập */
  var tt = React.useState(p.daBat || p.con != null || window.__accBat ? { bat: true, ngay: window.__accBat ? '09-11-2026' : '15-10-2026', con: p.con != null ? p.con : window.__accBat ? 10 : 8 } : { bat: false }); /* v292: demo bắt đầu từ chưa bật */
  var tc = loai[0] === 'tc';
  return h(Phone, { cls: 'ph-hd' }, h(T.AppBar, { variant: 'plain', title: tc ? 'Hồ sơ tổ chức' : 'Hồ sơ cá nhân', onBack: noop }),
    h(Body, { cls: 'ph-plain ph-steps acc-body' }, h('span', { ref: anchor, hidden: true }),
      host ? h(F, { key: loai[0] }, tc ? h(AccToChuc, { host: host, sua: p.sua, otp: p.otp, them: p.them }) : h(AccCaNhan, { host: host, sua: p.sua, otp: p.otp }),
        h(Acc2Lop, { host: host, tt: tt, buoc: p.buoc })) : null));
}
function Contact() {
  return SubS('Chỉnh sửa liên hệ', FCard('Thông tin liên hệ', h(F, null, Tf('Số điện thoại', { required: true, type: 'tel', placeholder: 'Số điện thoại' }), Tf('Địa chỉ email', { required: true, type: 'email', placeholder: 'Địa chỉ email' })), true), Bar(Btn('Quay lại', 'tonal'), Btn('Tiếp tục')));
}
function Verify() {
  return SubS('Xác thực liên hệ', FCard('Xác thực thay đổi', h(F, null, RvKV([['Số điện thoại', '—'], ['Thư điện tử', '—']]), Tf('Mã xác thực từ ứng dụng Authenticator', { required: true, inputMode: 'numeric', placeholder: 'Mã xác thực' })), true), Bar(Btn('Rà soát thay đổi')));
}
function Review() { return SubS('Rà soát thông tin', FCard('Rà soát thông tin', RvKV([['Số điện thoại', '—'], ['Thư điện tử', '—']]), true), Bar(Btn('Quay lại', 'tonal'), Btn('Xác nhận'))); }
function Commit() {
  return Sub('Cam kết giao dịch điện tử', h(F, null,
    Sec(0, 'Vai trò giao dịch điện tử', h(F, null, P('Chọn vai trò để xem nội dung cam kết áp dụng.', 'ph-muted'), h(T.Checkbox, { label: 'Công dân', defaultChecked: true }), h(T.Checkbox, { label: 'Luật sư' })), true),
    Sec(0, 'Điều khoản cam kết', h(F, null, h('div', { className: 'ph-terms' }, h('b', null, 'Cam kết sử dụng giao dịch điện tử'),
      P('Thông tin đăng ký giao dịch được sử dụng theo vai trò đã lựa chọn.'), P('Kiểm tra thông tin tài khoản và thông tin liên hệ trước khi xác nhận.'), P('Theo dõi hồ sơ, văn bản Tòa án gửi và các yêu cầu liên quan.'), P('Việc thay đổi phương thức giao dịch được thực hiện theo từng hồ sơ.')),
      P('Đọc nội dung và kiểm tra vai trò trước khi tiếp tục.', 'ph-muted'), h(T.Button, { variant: 'secondary', size: 'sm' }, 'Xem hết nội dung cam kết'),
      h(T.Checkbox, { label: 'Tôi đã đọc, hiểu và đồng ý với nội dung cam kết.' }), h(T.Button, { block: true }, 'Rà soát cam kết')), true),
    Sec(0, 'Lịch sử giao dịch điện tử', h(T.RecordCard, { kind: 'Cam kết theo vai trò', title: 'Công dân', date: '23-10-2026 09:00', onClick: noop }), true)));
}
function Sign(empty) {
  return Sub('Quản lý chữ ký số', h(F, null,
    h(T.Tabs, { label: 'Chữ ký số', items: [{ key: 'a', label: 'Phương thức và chứng thư' }, { key: 'b', label: 'Lịch sử ký' }, { key: 'c', label: 'Hướng dẫn cài USB ký số' }] }),
    Sec(0, 'Phương thức ký mặc định', h(F, null, h(T.SelectField, { label: 'Nguồn ký', labelVisible: true, placeholder: '— Chọn —' }), h(T.SelectField, { label: 'Tư cách ký', labelVisible: true, placeholder: '— Chọn —' }), h(T.Button, { variant: 'secondary', block: true }, 'Chọn chứng thư')), true),
    Blk('Chứng thư số của bạn', h(F, null,
      h(T.EmptyState, { text: 'Chưa có chứng thư số được khai báo.', actionLabel: 'Khai báo chứng thư số' }),
      h(T.Button, { variant: 'secondary', block: true, icon: 'pen' }, 'Thử ký tệp')))));
}
function Cert() {
  return Sub('Khai báo chứng thư số', Blk('Khai báo phương thức ký', h(F, null,
    h(T.SelectField, { label: 'Nguồn ký', labelVisible: true, required: true, placeholder: '— Chọn —' }),
    h(T.SelectField, { label: 'Tư cách ký', labelVisible: true, required: true, placeholder: '— Chọn —' }),
    h(T.SelectField, { label: 'Nhà cung cấp chứng thư số', labelVisible: true, required: true, placeholder: '— Chọn —', open: true, options: ['VNPT-CA', 'Viettel-CA', 'BKAV-CA'] }),
    h('div', { style: { height: '150px' } }),
    h(T.TextField, { label: 'Tài khoản ký số / Mã định danh', required: true }))), Bar(Btn('Kiểm tra thông tin')));
}
function SignFile() {
  return Sub('Thử ký tệp', Blk('Thử ký tệp', h(T.FileUpload, { hint: 'Chưa chọn tài liệu', uploadLabel: 'Chọn tài liệu PDF', accept: '.pdf' })), Bar(Btn('Kiểm tra trước khi ký')));
}
var METHODS = [
  { status: 'Điện tử', statusTone: 'success', code: 'TN-20261020-0012', title: 'Tranh chấp hợp đồng vay tài sản', meta: ['Người khởi kiện'] },
  { status: 'Chờ Tòa duyệt', statusTone: 'warning', code: 'DS-2026-0018', title: 'Tranh chấp hợp đồng mua bán tài sản', meta: ['Bị đơn'] },
  { status: 'Giấy (tạm)', statusTone: 'info', code: 'DS-2026-0012', title: 'Tranh chấp hợp đồng vay tài sản', meta: ['Nguyên đơn'] },
  { status: 'Giấy đến khi kết thúc', statusTone: 'info', code: 'VDS-2026-0003', title: 'Yêu cầu công nhận thỏa thuận dân sự', meta: ['Người yêu cầu'] }];
function Method() {
  return Sub('Phương thức giao dịch điện tử', h(F, null,
    Filt(h(T.Tabs, { variant: 'chip', label: 'Lọc phương thức', items: [{ key: 'a', label: 'Tất cả' }, { key: 'b', label: 'Điện tử' }, { key: 'c', label: 'Chờ Tòa duyệt' }, { key: 'd', label: 'Giấy (tạm)' }, { key: 'e', label: 'Giấy đến khi kết thúc' }] })),
    METHODS.map(function (m, i) { return h(T.RecordCard, Object.assign({ key: i, onClick: noop }, m)); })));
}
function MethodDetail() {
  return Sub('Phương thức của hồ sơ', h(F, null, Head('Điện tử', 'success', 'TN-20261020-0012', 'Tranh chấp hợp đồng vay tài sản'),
    Blk(null, h(F, null, Rows([['Tên hồ sơ', 'Tranh chấp hợp đồng vay tài sản'], ['Vai trò', 'Người khởi kiện'], ['Phương thức', 'Điện tử']]),
      h(T.Button, { variant: 'secondary', block: true }, 'Tạm chuyển sang giấy'), h(T.Button, { variant: 'secondary', block: true }, 'Chuyển giấy đến khi kết thúc'))),
    Blk('Lịch sử thay đổi', h(T.EmptyState, { icon: 'clock', text: 'Chưa có lịch sử thay đổi.' }))));
}
function MethodForm() {
  return Sub('Thay đổi phương thức', h(F, null, Steps(['Hậu quả và hồ sơ', 'Phương thức thay thế', 'Xem lại và xác nhận'], 1), Blk(null, h(F, null,
    h(T.InfoList, { variant: 'box', items: [{ label: 'TN-20261020-0012', value: 'Tranh chấp hợp đồng vay tài sản' }] }),
    h(T.Notice, { icon: 'info' }, 'Nghĩa vụ tố tụng và thời hạn không thay đổi khi chuyển phương thức giao dịch.'),
    h(T.SelectField, { label: 'Yêu cầu thay đổi', labelVisible: true, required: true, placeholder: '— Chọn —' }),
    h(T.TextField, { label: 'Lý do', required: true, multiline: true }),
    h(T.FileUpload, { title: 'Tài liệu kèm theo', hint: 'PDF, JPG, PNG, DOCX · tối đa 10MB/tệp', uploadLabel: 'Tải tài liệu từ thiết bị' }),
    h(T.Checkbox, { label: 'Tôi đã hiểu nghĩa vụ theo dõi hồ sơ và thực hiện đúng thời hạn.' })))), Bar(Btn('Quay lại', 'tonal'), Btn('Tiếp tục')));
}
function Password() {
  return Sub('Đổi mật khẩu', Blk(null, h(F, null, h(T.Notice, { icon: 'user' }, 'Tài khoản •••• •••• 1234 · Hoàng Dương'),
    h(T.TextField, { label: 'Mật khẩu hiện tại', required: true, type: 'password', icon: 'lock' }),
    h(T.TextField, { label: 'Mật khẩu mới', required: true, type: 'password', icon: 'lock', help: 'Từ 8 đến 50 ký tự, gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt.' }),
    h(T.TextField, { label: 'Xác nhận mật khẩu mới', required: true, type: 'password', icon: 'lock' }))), Bar(Btn('Hủy', 'tonal'), Btn('Đổi mật khẩu')));
}
function Faq() {
  return Sub('Câu hỏi thường gặp', h(T.MenuList, { groups: [[{ icon: 'user', label: 'Thay đổi thông tin liên hệ ở đâu?', description: 'Tài khoản' }], [{ icon: 'mail', label: 'Xem văn bản Tòa án gửi ở đâu?', description: 'Tống đạt' }], [{ icon: 'pen', label: 'Khai báo phương thức ký số ở đâu?', description: 'Ký số' }]] }));
}
function Answer() {
  return Sub('Chi tiết câu hỏi', h(F, null, h(Card, null, h('p', { className: 'ph-card-title' }, 'Thay đổi thông tin liên hệ ở đâu?'), P('Mở Thông tin tài khoản và chọn Chỉnh sửa tại Thông tin liên hệ. Thông tin định danh là thông tin chỉ đọc.')),
    Blk('Câu trả lời này có hữu ích không?', h('div', { className: 'ph-2btn' }, Btn('Có', 'secondary'), Btn('Chưa hữu ích', 'tonal')))));
}
function Ratings() {
  return Sub('Đánh giá mức độ hài lòng', h(F, null,
    h(T.Tabs, { label: 'Đánh giá', items: [{ key: 'a', label: 'Chờ đánh giá' }, { key: 'b', label: 'Đánh giá đã gửi' }, { key: 'c', label: 'Đánh giá Cổng dịch vụ' }, { key: 'd', label: 'Kết quả công khai' }] }),
    h(T.RecordCard, { code: 'TN-20261020-0012', title: 'Tranh chấp hợp đồng vay tài sản', status: 'Chưa đánh giá', statusTone: 'warning', onClick: noop }),
    h(T.RecordCard, { code: 'DS-2026-0018', title: 'Tranh chấp hợp đồng mua bán tài sản', status: 'Chưa đánh giá', statusTone: 'warning', onClick: noop })));
}
function Rating() {
  return Sub('Đánh giá hồ sơ', Blk('Tranh chấp hợp đồng vay tài sản', h(F, null, h(T.RatingStars, { label: 'Mức độ hài lòng', required: true, value: 4 }),
    h(T.TextField, { label: 'Ý kiến góp ý', multiline: true }))), Bar(Btn('Rà soát đánh giá')));
}

/* ---------- dịch vụ ---------- */
function Complaints() {
  return Sub('Khiếu nại, tố cáo', h(F, null,
    Blk('Nộp đơn mới', h(T.MenuList, { items: [{ icon: 'building', label: 'Khiếu nại, tố cáo hành chính' }, { icon: 'scale', label: 'Khiếu nại, tố cáo trong tố tụng' }] }), { flush: true }),
    Blk('Đang xử lý', h(T.RecordCard, { kind: 'Khiếu nại hành chính', code: 'KN-2026-0012', title: 'Khiếu nại hành chính', date: '23-10-2026', status: 'Đang xử lý', statusTone: 'info', onClick: noop }), { flush: true })));
}
function ComplaintDetail(empty) {
  return Sub('Chi tiết đơn', h(F, null, Head('Đang xử lý', 'info', 'KN-2026-0012', 'Khiếu nại hành chính'),
    Blk(null, h(F, null, Rows([['Nội dung', 'Khiếu nại hành chính'], ['Ngày gửi', '23-10-2026', 1], ['Người gửi', 'Hoàng Dương']]),
      h('div', { className: 'ph-2btn' }, Btn('Bổ sung tài liệu', 'secondary', { icon: 'upload' }), Btn('Rút đơn', 'tonal')))),
    Blk('Tiến trình xử lý', h(T.Timeline, { steps: [{ title: 'Đang xử lý', state: 'current' }, { title: 'Đơn được tiếp nhận', state: 'done' }] })),
    Blk('Tài liệu kèm theo', h(T.EmptyState, { text: 'Chưa có tài liệu để tải xuống.' }))));
}
/* Chọn thủ tục (chốt 03/11/2026): kiểu bước 1 Soạn đơn – xem ChooseKn */
function Choose() { return h(ChooseKn); }
/* Khai đơn khiếu nại, tố cáo (03/11/2026): thay bằng luồng mới – màn này là bước 1 luồng "Quyết định tố tụng trong vụ án của tôi" (kqd1) */
function ComplaintForm() { return h(KScr, { f: Knv1, k: 'kqd' }); }
/* Rút đơn (03/11/2026): khung khối 100% như Soạn đơn */
function Withdraw() {
  return SubS('Rút đơn', h(F, null, FCard('Thông tin rút đơn', Tf('Lý do rút đơn', { required: true, multiline: true, placeholder: 'Lý do rút đơn' }), true),
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { label: 'Tôi đã kiểm tra yêu cầu rút đơn.' }))), Bar(Btn('Rà soát yêu cầu')));
}
function Aid() {
  return Sub('Trợ giúp pháp lý', h(F, null, h(T.Tabs, { label: 'Trợ giúp pháp lý', items: [{ key: 'a', label: 'Tra cứu điểm' }, { key: 'b', label: 'Điều kiện miễn phí' }] }),
    Blk(null, h(F, null, h(T.SelectField, { label: 'Tỉnh/TP', labelVisible: true, placeholder: '— Chọn —' }),
      h(T.MenuList, { items: [{ icon: 'mapPin', label: 'Trung tâm TGPL nhà nước', description: 'Hà Nội' }, { icon: 'mapPin', label: 'Trung tâm TGPL nhà nước', description: 'Thành phố Hồ Chí Minh' }] })), { flush: true })));
}
function AidPoint() {
  return Sub('Chi tiết điểm trợ giúp', h(F, null, Blk('Trung tâm TGPL nhà nước', h(F, null, Rows([['Địa bàn', 'Hà Nội'], ['Địa chỉ', '—'], ['Thời gian tiếp nhận', 'Liên hệ đơn vị để được hướng dẫn']]),
      h(T.Button, { variant: 'secondary', block: true, icon: 'mapPin' }, 'Xem vị trí và chỉ đường'))),
    Sec(0, 'Giấy tờ cần chuẩn bị', P('Liên hệ điểm trợ giúp pháp lý để được hướng dẫn theo diện trợ giúp.'), true)));
}
var NEWS = [{ kind: 'Hoạt động Tòa án', title: 'Thông tin hoạt động của Tòa án', date: '28-10-2026', meta: ['Theo dõi thông tin hoạt động và thông báo công khai của Tòa án.'] }, { kind: 'Hướng dẫn', title: 'Hướng dẫn sử dụng dịch vụ trực tuyến', date: '27-10-2026', meta: ['Các hướng dẫn hỗ trợ người sử dụng thao tác trên Cổng dịch vụ tư pháp.'] }];
function News() {
  return Sub('Tin tức', h(F, null, Filt(h(T.Tabs, { variant: 'chip', label: 'Chủ đề', items: [{ key: 'a', label: 'Tất cả' }, { key: 'b', label: 'Hoạt động Tòa án' }, { key: 'c', label: 'Hướng dẫn' }] })),
    NEWS.map(function (n, i) { return h(T.RecordCard, Object.assign({ key: i, onClick: noop }, n)); })));
}
function Article() {
  return Sub('Nội dung bài viết', h(Card, null, h('p', { className: 'tp-hs-kind' }, 'Hoạt động Tòa án · 28-10-2026'), h('p', { className: 'ph-card-title' }, 'Thông tin hoạt động của Tòa án'), P('Theo dõi thông tin hoạt động và thông báo công khai của Tòa án.'),
    h('div', { className: 'ph-center' }, h(T.LinkArrow, null, 'Xem hướng dẫn sử dụng Cổng'))));
}
var GUIDES = [{ icon: 'file', label: 'Hướng dẫn nộp đơn trực tuyến' }, { icon: 'mail', label: 'Hướng dẫn sử dụng Hộp thư tống đạt' }, { icon: 'pen', label: 'Hướng dẫn ký số từ xa' }];
function Guides(title, tabs) { return Sub(title, h(F, null, h(T.Tabs, { label: title, items: tabs.map(function (t, i) { return { key: 't' + i, label: t }; }) }), h(T.MenuList, { items: GUIDES }))); }
function Guide(title, extra) {
  return Sub(title, Blk(null, h(F, null, h(T.ProcessSteps, { variant: 'light', eyebrow: title, title: 'Hướng dẫn nộp đơn trực tuyến', steps: [{ title: 'Chọn Nộp đơn trực tuyến và loại đơn cần thực hiện.' }, { title: 'Nhập thông tin và bổ sung tài liệu theo biểu mẫu.' }, { title: 'Kiểm tra nội dung trước khi thực hiện ký và gửi đơn.' }] }),
    extra ? h('div', { className: 'ph-center' }, h(T.LinkArrow, null, extra)) : null)));
}

/* ---------- Nộp đơn khởi kiện ---------- */
/* tên bước theo ảnh mẫu (02/11/2026): bước 2, 3 là Người khởi kiện, Người bị kiện */
var SUB_STEPS = ['Loại đơn', 'Người khởi kiện', 'Người bị khởi kiện', 'Nội dung', 'Tài liệu', 'Xem lại', 'Ký số']; /* v363: bước 2–3 theo nhãn tĩnh web khi cấu hình thủ tục để trống – Khởi kiện vụ án (nop-don-khoi-kien/field-defs.ts:363-364) */
/* thanh tiến trình phương án P2 (chọn 02/11/2026): 7 đoạn ngang bằng nhau (đã qua và đang làm màu đỏ, chưa tới xám), dòng dưới "n. Tên bước" đậm + "Bước n/7", dòng tiếp bước tiếp theo; chuyển bước bằng Quay lại / Tiếp theo */
function StepStrip(p) {
  if (p.nd) ndNghe(); /* demo NDKK 1.9: tên bước 2, 3 đổi theo loại thủ tục / cấu hình nộp đơn của loại việc */
  var steps = p.nd ? ndSteps() : p.steps, n = p.cur, all = steps.length;
  /* v250: bước "Xem lại…" gắn lớp ph-stepbar-xl để khối nhãn – giá trị của màn đó dùng kiểu cột nhãn trái, giá trị căn trái, không đường kẻ */
  return h('div', { className: 'ph-stepbar' + (/Xem lại/.test(steps[n - 1] || '') ? ' ph-stepbar-xl' : '') },
    h('div', { className: 'ph-sbseg', role: 'progressbar', 'aria-valuemin': 1, 'aria-valuemax': all, 'aria-valuenow': n, 'aria-label': 'Tiến độ nộp đơn' },
      steps.map(function (s, i) { return h('i', { key: i, className: i + 1 <= n ? 'ph-sbseg-on' : null }); })),
    h('p', { className: 'ph-sb-title' }, h('b', null, n + '. ' + steps[n - 1]), h('span', null, 'Bước ' + n + '/' + all)),
    h('p', { className: 'ph-stepbar-t' }, n < all ? 'Tiếp theo: ' + steps[n] : 'Bước cuối'));
}
function Next() { return Btn(h(F, null, 'Tiếp theo', h(T.Icon, { name: 'chevronRight' }))); }
/* demo NDKK: o = { ro: đơn đã xác nhận – chỉ xem (1.81), luuLoi: lưu nháp thất bại (1.97), kt: hàm kiểm tra riêng của nút Tiếp theo (1.19) } */
function Submit(n, body, last, cls, o) {
  o = o || {}; ND_BUOC_HT = n; /* v537: bước đang soạn (NDKK 1.39 – kiểm người đại diện bên còn lại) */
  var ro = !!o.ro && n < 7;
  return h(Phone, { cls: 'ph-hd' },
    h('div', { className: 'ph-hd-step' }, h(HdSoan, { n: n, ro: o.ro, luuLoi: o.luuLoi }),
      h(StepStrip, { cur: n, nd: true })),
    h(Body, { cls: 'ph-plain ph-steps' + (cls ? ' ' + cls : '') + (ro ? ' ph-ro' : '') }, ro ? h(F, null, BannerXn(), body) : body),
    h('div', { className: 'ph-foot' }, n === 1 ? Bar(h(NextKt, { n: 1, ro: o.ro, kt: o.kt })) : Bar(Btn('Quay lại', 'tonal'), last || h(NextKt, { n: n, ro: o.ro, kt: o.kt, khoa: o.khoaTiep }))));
}
function Lbl(t, req) { return h('span', { className: 'tp-field-label' }, t, req ? h('span', { className: 'tp-field-req', 'aria-hidden': 'true' }, '*') : null); }
/* Phần nhập phương án F1 (chọn 02/11/2026): mỗi nhóm một thẻ gập/mở có nhãn Đã nhập/Chưa nhập, ô ngắn xếp 2 cột, nút "+ Thêm" nền đỏ nhạt cả hàng */
/* 02/11/2026: bỏ nhãn Đã nhập/Chưa nhập ở mọi khối; chỉ khối Ký số giữ trạng thái 'signed' (Đã ký số) / 'unsigned' (Chưa ký số) */
function FCard(title, children, open, status) { return h(T.FormSection, { title: title, defaultOpen: !!open, status: status === 'signed' || status === 'unsigned' ? status : undefined }, children); }
function Two(a, b) { return h('div', { className: 'fx-2' }, a, b); }
function SubL(t, action) { return h('div', { className: 'fx-sub' }, h('p', null, t), action || null); }
function AddBtn(t) { return h(T.Button, { variant: 'tint', block: true, icon: 'plus' }, t || 'Thêm'); }
function Del() { return h(T.Button, { variant: 'ghost', size: 'sm', icon: 'trash' }, 'Xóa'); }
function Tf(l, o) { return h(T.TextField, Object.assign({ label: l }, o || {})); }
function Sf(l, o) { return h(T.SelectField, Object.assign({ label: l, labelVisible: true }, o || {})); }
function Dt(o) { return Object.assign({ icon: 'calendar', placeholder: 'dd-mm-yyyy', inputMode: 'numeric' }, o || {}); }
/* nhóm địa chỉ (chốt B 02/11/2026, áp dụng mọi bộ địa chỉ): 1 nhãn nhóm + Tỉnh/Phường-Xã không nhãn riêng (chữ gợi ý là tên trường) + Địa chỉ chi tiết; am = 'full' (Tỉnh/Thành phố) | 'short' (Tỉnh/TP); v = [tỉnh, xã, chi tiết]; lock = khóa (lấy từ định danh) */
function AddrG(title, req, am, v, lock, o) {
  if (o && o.chon) return h(AddrChon, { title: title, req: req, am: am, v: v || [], lock: lock, ctTuyChon: o.ctTuyChon, onDoi: o.onDoi }); /* demo NDKK: ô chọn Tỉnh, Phường/Xã bấm được (để kiểm tra bắt buộc như web) */
  v = v || [];
  return h('div', { className: 'ph-addr', role: 'group', 'aria-label': title },
    Lbl(title, req),
    h('div', { className: 'ph-addr-col' }, /* v331 (12/11/2026): Tỉnh/TP, Phường/Xã, Địa chỉ chi tiết – mỗi ô một dòng (trước: Tỉnh/TP và Phường/Xã cùng hàng) */
      h(T.SelectField, { label: title + ' – ' + (am === 'full' ? 'Tỉnh/Thành phố' : 'Tỉnh/Thành phố'), goiYGiu: true, placeholder: 'Chọn ' + (am === 'full' ? 'Tỉnh/Thành phố' : 'Tỉnh/Thành phố'), value: v[0], disabled: !!lock }), /* v541 (23/11/2026): chữ gợi ý "Chọn Tỉnh/TP" · "Chọn Phường/Xã" · "Nhập địa chỉ chi tiết" – mọi nhóm địa chỉ */
      h(T.SelectField, { label: title + ' – Phường/Xã', goiYGiu: true, placeholder: 'Chọn Phường/Xã', value: v[1], disabled: !!lock || !v[0] })), /* v537 (NDKK 1.28): chưa chọn Tỉnh/TP thì Phường/Xã khóa nền xám */
    h(T.TextField, { label: title + ' – Địa chỉ chi tiết', goiYGiu: true, placeholder: 'Nhập địa chỉ chi tiết', defaultValue: v[2], readOnly: !!lock }));
}
function AddrChon(p) {
  var t = React.useState(p.v[0] || ''), x = React.useState(p.v[1] || ''), c = React.useState(p.v[2] || ''), o = React.useState(null), q = React.useState(''), anchor = React.useRef(null), host = useHost(anchor);
  var ph1 = p.am === 'full' ? 'Tỉnh/Thành phố' : 'Tỉnh/Thành phố', dsX = XA_MAU[t[0]] || ['[Phường/Xã 1]', '[Phường/Xã 2]', '[Phường/Xã 3]']; /* v544 (người dùng 23/11): mọi nhóm địa chỉ dùng "Tỉnh/Thành phố" (bỏ viết tắt Tỉnh/TP) */
  /* v538 (NDKK 1.28, như web select.tsx): bảng trên 10 mục có ô tìm "Nhập để tìm", lọc không phân biệt dấu; bảng giữ chiều cao khi lọc (LvSheet) – áp mọi nhóm địa chỉ */
  var ds = o[0] === 't' ? TINH_MAU : dsX, kq = khongDau(q[0].trim()), loc = ds.filter(function (n) { return !kq || khongDau(n).indexOf(kq) >= 0; });
  function mo(k) { q[1](''); o[1](k); }
  React.useEffect(function () { if (p.onDoi) p.onDoi([t[0], x[0], c[0]]); }, [t[0], x[0], c[0]]);
  return h('div', { className: 'ph-addr', role: 'group', 'aria-label': p.title, 'data-ct-tuy-chon': p.ctTuyChon ? '1' : undefined }, h('span', { ref: anchor, hidden: true }),
    Lbl(p.title, p.req),
    h('div', { className: 'ph-addr-col' },
      h(T.SelectField, { label: p.title + ' – ' + ph1, goiYGiu: true, placeholder: 'Chọn ' + ph1, value: t[0] || undefined, disabled: !!p.lock, onClick: function () { mo('t'); } }), /* v541: chữ gợi ý Chọn/Nhập + tên trường */
      h(T.SelectField, { label: p.title + ' – Phường/Xã', goiYGiu: true, placeholder: 'Chọn Phường/Xã', value: x[0] || undefined, disabled: !!p.lock || !t[0], onClick: function () { if (t[0]) mo('x'); } })), /* v537 (NDKK 1.28): chưa chọn Tỉnh/TP thì khóa nền xám, giữ chữ Phường/Xã; chọn tỉnh xong thì mở */
    h(T.TextField, { label: p.title + ' – Địa chỉ chi tiết', goiYGiu: true, placeholder: 'Nhập địa chỉ chi tiết' + (p.ctTuyChon ? ' (nếu có)' : ''), value: c[0], readOnly: !!p.lock, onChange: function (e) { c[1](e.target.value); } }),
    o[0] && host ? h(LvSheet, { host: host, title: o[0] === 't' ? 'Chọn Tỉnh/Thành phố' : 'Chọn phường/xã', onClose: function () { o[1](null); },
      top: ds.length > 10 ? h('div', { className: 'fx-search' }, Tf('Tìm', { icon: 'search', placeholder: 'Nhập để tìm', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })) : null },
      loc.length ? h(LvRows, { key: o[0], label: p.title, cur: o[0] === 't' ? t[0] : x[0], items: loc.map(function (n) { return { id: n, name: n }; }),
        onPick: function (n) { if (o[0] === 't') { if (n !== t[0]) x[1](''); t[1](n); } else x[1](n); o[1](null); } })
        : h('p', { className: 'ph-lv-empty' }, 'Không có mục khớp «' + q[0].trim() + '».')) : null);
}
function Addr(kind, req, val) {
  return h(F, null, Two(Sf('Tỉnh/Thành phố', { required: req, placeholder: 'Chọn', value: val && val[0] }), Sf('Phường/Xã', { required: req, placeholder: 'Chọn', value: val && val[1], disabled: !(val && val[0]) })),
    Tf('Chi tiết địa chỉ ' + kind, { required: req }));
}
/* Bước 1 theo web /nop-don-khoi-kien (steps/step-1.tsx, 02/11/2026): 1. Loại thủ tục (thẻ tên + mô tả + căn cứ luật) → 2. Lĩnh vực → 3. Loại việc cụ thể */
var THU_TUC = [
  { k: 'a', icon: 'scale', ngan: 'Khởi kiện\nvụ án', illo: 'nopDon', ten: 'Khởi kiện vụ án', moTa: 'Có tranh chấp giữa các bên. Nộp đơn khởi kiện, Tòa án giải quyết bằng bản án, quyết định.', luat: 'BLTTDS 2015 · Điều 26, 28, 30, 32' },
  { k: 'b', icon: 'copy', ngan: 'Yêu cầu việc\ndân sự', illo: 'yeuCau', ten: 'Yêu cầu giải quyết việc dân sự', moTa: 'Không có tranh chấp, chỉ đề nghị Tòa án công nhận hoặc tuyên bố một sự kiện pháp lý.', luat: 'BLTTDS 2015 · Điều 27, 29, 31, 33' },
  { k: 'c', icon: 'file', ngan: 'Khởi kiện\nhành chính', illo: 'hanhChinh', ten: 'Khởi kiện vụ án hành chính', moTa: 'Kiện quyết định hành chính, hành vi hành chính, kỷ luật buộc thôi việc, quyết định giải quyết khiếu nại về cạnh tranh và kiểm toán nhà nước, danh sách cử tri, buộc thôi việc công chức.', luat: 'Luật TTHC 2015 · sửa đổi 2019, 2024, 2025 · Điều 30' },
  { k: 'd', icon: 'briefcase', ngan: 'Phục hồi,\nphá sản', illo: 'phaSan', ten: 'Yêu cầu mở thủ tục phục hồi, phá sản', moTa: 'Doanh nghiệp, hợp tác xã mất hoặc phục hồi khả năng thanh toán hoặc cần áp dụng thủ tục phá sản hoặc phục hồi.', luat: 'Luật Phục hồi, phá sản 2025' }];
/* chọn loại thủ tục: kiểu danh sách có hình minh họa như bảng chọn từ đáy (MenuList), chọn một (02/11/2026) */
function ProcList() {
  var st = React.useState('a');
  return h('ul', { className: 'tp-menu2-group tp-menu2-illos ph-proc2', role: 'radiogroup', 'aria-label': 'Loại thủ tục' }, THU_TUC.map(function (t) {
    var on = st[0] === t.k;
    return h('li', { key: t.k }, h('button', { type: 'button', role: 'radio', 'aria-checked': on, className: 'tp-menu2-item' + (on ? ' ph-proc2-on' : ''), onClick: function () { st[1](t.k); } },
      h('span', { className: 'tp-menu2-illo' }, h(T.Illustration, { name: t.illo })),
      h('span', { className: 'tp-menu2-text' }, h('span', null, t.ten), h('small', null, t.moTa), h('small', { className: 'ph-proc2-law' }, t.luat)),
      h('span', { className: 'ph-proc2-mark', 'aria-hidden': 'true' }, on ? h(T.Icon, { name: 'check' }) : null)));
  }));
}
/* Loại việc cụ thể theo danh mục web (DM_PHANLOAIDON, thủ tục Khởi kiện vụ án, hienCong = 1; đọc 02/11/2026 từ 10.15.73.100:5180): [mã, ký hiệu điều luật, tên, mô tả], thứ tự theo mã; loại việc chi tiết = danh mục con của loại việc; câu hỏi phân định theo field-defs.ts CAU_HOI_PHAN_DINH_LOAI_VIEC */
var LOAI_VIEC_LV = {
  ds: [
    ['VA-DS-1', 'Đ.26.1', 'Tranh chấp quốc tịch Việt Nam', 'Tranh chấp về quốc tịch Việt Nam giữa cá nhân với cá nhân.'],
    ['VA-DS-2', 'Đ.26.2', 'Quyền sở hữu, đòi lại tài sản', 'Tranh chấp về quyền sở hữu và các quyền khác đối với tài sản.'],
    ['VA-DS-3', 'Đ.26.3', 'Giao dịch, hợp đồng dân sự', 'Tranh chấp về giao dịch dân sự, hợp đồng dân sự.'],
    ['VA-DS-4', 'Đ.26.4', 'Sở hữu trí tuệ, chuyển giao công nghệ', 'Tranh chấp về quyền sở hữu trí tuệ, chuyển giao công nghệ, trừ trường hợp quy định tại khoản 2 Điều 30 của Bộ luật này.'],
    ['VA-DS-5', 'Đ.26.5', 'Thừa kế tài sản', 'Tranh chấp về thừa kế tài sản.'],
    ['VA-DS-6', 'Đ.26.6', 'Bồi thường thiệt hại ngoài hợp đồng', 'Tranh chấp về bồi thường thiệt hại ngoài hợp đồng.'],
    ['VA-DS-7', 'Đ.26.7', 'Bồi thường do biện pháp ngăn chặn hành chính về cạnh tranh', 'Tranh chấp về bồi thường thiệt hại do áp dụng biện pháp ngăn chặn hành chính không đúng theo quy định của pháp luật về cạnh tranh.'],
    ['VA-DS-8', 'Đ.26.8', 'Khai thác, sử dụng tài nguyên nước, xả thải', 'Tranh chấp về khai thác, sử dụng tài nguyên nước, xả thải vào nguồn nước theo quy định của Luật tài nguyên nước.'],
    ['VA-DS-9', 'Đ.26.9', 'Tranh chấp đất đai, quyền sử dụng rừng', 'Tranh chấp đất đai theo quy định của pháp luật về đất đai; tranh chấp về quyền sở hữu, quyền sử dụng rừng.'],
    ['VA-DS-10', 'Đ.26.10', 'Hoạt động nghiệp vụ báo chí', 'Tranh chấp liên quan đến hoạt động nghiệp vụ báo chí theo quy định của pháp luật về báo chí.'],
    ['VA-DS-11', 'Đ.26.11', 'Liên quan yêu cầu tuyên bố văn bản công chứng vô hiệu', 'Tranh chấp liên quan đến yêu cầu tuyên bố văn bản công chứng vô hiệu.'],
    ['VA-DS-12', 'Đ.26.12', 'Tài sản bị cưỡng chế để thi hành án', 'Tranh chấp liên quan đến tài sản bị cưỡng chế để thi hành án theo quy định của pháp luật về thi hành án dân sự.'],
    ['VA-DS-13', 'Đ.26.13', 'Kết quả bán đấu giá tài sản', 'Tranh chấp về kết quả bán đấu giá tài sản, thanh toán phí tổn đăng ký mua tài sản bán đấu giá.'],
    ['VA-DS-14', 'Đ.26.14', 'Tranh chấp dân sự khác', 'Các tranh chấp khác về dân sự, trừ trường hợp thuộc thẩm quyền giải quyết của cơ quan, tổ chức khác.']],
  hn: [
    ['VA-HN-1', 'Đ.28.1', 'Ly hôn, nuôi con, chia tài sản khi ly hôn', 'Ly hôn, tranh chấp về nuôi con, chia tài sản khi ly hôn; chia tài sản sau khi ly hôn.'],
    ['VA-HN-2', 'Đ.28.2', 'Chia tài sản chung trong thời kỳ hôn nhân', 'Tranh chấp về chia tài sản chung của vợ chồng trong thời kỳ hôn nhân.'],
    ['VA-HN-3', 'Đ.28.3', 'Thay đổi người trực tiếp nuôi con sau ly hôn', 'Tranh chấp về thay đổi người trực tiếp nuôi con sau khi ly hôn.'],
    ['VA-HN-4', 'Đ.28.4', 'Xác định cha, mẹ cho con hoặc con cho cha, mẹ', 'Tranh chấp về xác định cha, mẹ cho con hoặc xác định con cho cha, mẹ.'],
    ['VA-HN-5', 'Đ.28.5', 'Tranh chấp về cấp dưỡng', 'Tranh chấp về cấp dưỡng.'],
    ['VA-HN-6', 'Đ.28.6', 'Hỗ trợ sinh sản, mang thai hộ vì mục đích nhân đạo', 'Tranh chấp về sinh con bằng kỹ thuật hỗ trợ sinh sản, mang thai hộ vì mục đích nhân đạo.'],
    ['VA-HN-7', 'Đ.28.7', 'Nam nữ chung sống không đăng ký kết hôn', 'Tranh chấp về nuôi con, chia tài sản của nam, nữ chung sống với nhau như vợ chồng mà không đăng ký kết hôn hoặc khi hủy kết hôn trái pháp luật.'],
    ['VA-HN-8', 'Đ.28.8', 'Tranh chấp hôn nhân và gia đình khác', 'Các tranh chấp khác về hôn nhân và gia đình.']],
  ld: [
    ['VA-LD-1', 'Đ.32.1', 'Tranh chấp lao động cá nhân đã qua hòa giải', 'Tranh chấp lao động cá nhân giữa người lao động với người sử dụng lao động phải thông qua thủ tục hòa giải của hòa giải viên lao động.'],
    ['VA-LD-2', 'Đ.32.1.a', 'Kỷ luật sa thải, đơn phương chấm dứt hợp đồng lao động', 'Tranh chấp về xử lý kỷ luật lao động theo hình thức sa thải hoặc về trường hợp bị đơn phương chấm dứt hợp đồng lao động — không bắt buộc qua hòa giải.'],
    ['VA-LD-3', 'Đ.32.1.b', 'Bồi thường, trợ cấp khi chấm dứt hợp đồng lao động', 'Tranh chấp về bồi thường thiệt hại, trợ cấp khi chấm dứt hợp đồng lao động — không bắt buộc qua hòa giải.'],
    ['VA-LD-4', 'Đ.32.1.c', 'Người giúp việc gia đình với người sử dụng lao động', 'Tranh chấp giữa người giúp việc gia đình với người sử dụng lao động — không bắt buộc qua hòa giải.'],
    ['VA-LD-5', 'Đ.32.1.d', 'Bảo hiểm xã hội, y tế, thất nghiệp, tai nạn lao động', 'Tranh chấp về bảo hiểm xã hội, bảo hiểm y tế, bảo hiểm thất nghiệp, bảo hiểm tai nạn lao động và bệnh nghề nghiệp — không bắt buộc qua hòa giải.'],
    ['VA-LD-6', 'Đ.32.1.đ', 'Bồi thường với doanh nghiệp đưa người lao động đi nước ngoài', 'Tranh chấp về bồi thường thiệt hại giữa người lao động với doanh nghiệp, đơn vị sự nghiệp công lập đưa người lao động đi làm việc ở nước ngoài theo hợp đồng — không bắt buộc qua hòa giải.'],
    ['VA-LD-7', 'Đ.32.2', 'Tranh chấp lao động tập thể về quyền', 'Tranh chấp lao động tập thể về quyền giữa tập thể lao động với người sử dụng lao động đã được Chủ tịch Ủy ban nhân dân cấp huyện giải quyết mà các bên không đồng ý hoặc quá thời hạn không giải quyết.'],
    ['VA-LD-8', 'Đ.32.3', 'Tranh chấp liên quan đến lao động', 'Tranh chấp về học nghề, tập nghề; cho thuê lại lao động; quyền công đoàn, kinh phí công đoàn; an toàn lao động, vệ sinh lao động.'],
    ['VA-LD-9', 'Đ.32.4', 'Bồi thường thiệt hại do đình công bất hợp pháp', 'Tranh chấp về bồi thường thiệt hại do đình công bất hợp pháp.'],
    ['VA-LD-10', 'Đ.32.5', 'Tranh chấp lao động khác', 'Các tranh chấp khác về lao động.']],
  kd: [
    ['VA-KD-1', 'Đ.30.1', 'Tranh chấp trong hoạt động kinh doanh, thương mại', 'Tranh chấp phát sinh trong hoạt động kinh doanh, thương mại giữa cá nhân, tổ chức có đăng ký kinh doanh với nhau và đều có mục đích lợi nhuận.'],
    ['VA-KD-2', 'Đ.30.2', 'Sở hữu trí tuệ giữa các bên có mục đích lợi nhuận', 'Tranh chấp về quyền sở hữu trí tuệ, chuyển giao công nghệ giữa cá nhân, tổ chức với nhau và đều có mục đích lợi nhuận.'],
    ['VA-KD-3', 'Đ.30.3', 'Chuyển nhượng phần vốn góp với người chưa là thành viên', 'Tranh chấp giữa người chưa phải là thành viên công ty nhưng có giao dịch về chuyển nhượng phần vốn góp với công ty, thành viên công ty.'],
    ['VA-KD-4', 'Đ.30.4', 'Tranh chấp nội bộ công ty', 'Tranh chấp giữa công ty với các thành viên, với người quản lý, hoặc giữa các thành viên với nhau liên quan đến việc thành lập, hoạt động, giải thể, sáp nhập, hợp nhất, chia, tách, chuyển đổi hình thức tổ chức của công ty.'],
    ['VA-KD-5', 'Đ.30.5', 'Tranh chấp kinh doanh, thương mại khác', 'Các tranh chấp khác về kinh doanh, thương mại.']]
};
var LV_SHTT = ['Nhãn hiệu', 'Sáng chế – giải pháp hữu ích', 'Kiểu dáng công nghiệp', 'Quyền tác giả – quyền liên quan', 'Tên thương mại – chỉ dẫn địa lý', 'Bí mật kinh doanh'];
var LV_CHI_TIET = { 'VA-DS-4': LV_SHTT, 'VA-KD-2': LV_SHTT, 'VA-LD-8': ['Học nghề, tập nghề', 'Cho thuê lại lao động', 'Quyền công đoàn, kinh phí công đoàn', 'An toàn lao động, vệ sinh lao động'] };
var LV_PHAN_DINH = { co: 'VA-KD-2', khong: 'VA-DS-4',
  cauHoi: 'Cả hai bên đều có đăng ký kinh doanh và đều nhằm mục đích lợi nhuận?',
  moTa: 'Câu trả lời quyết định tranh chấp sở hữu trí tuệ thuộc dân sự (khoản 4 Điều 26) hay kinh doanh, thương mại (khoản 2 Điều 30) — và theo đó là thẩm quyền và mức án phí.',
  cbCo: 'Cả hai bên đều có đăng ký kinh doanh và đều nhằm mục đích lợi nhuận thì tranh chấp sở hữu trí tuệ thuộc kinh doanh, thương mại theo khoản 2 Điều 30 — không phải khoản 4 Điều 26. Cách xếp loại này ảnh hưởng đến thẩm quyền và mức án phí.',
  cbKhong: 'Nếu không phải cả hai bên đều nhằm mục đích lợi nhuận thì tranh chấp sở hữu trí tuệ thuộc về dân sự theo khoản 4 Điều 26, không phải khoản 2 Điều 30.',
  nutCo: 'Chuyển sang Kinh doanh, thương mại (Đ.30.2)', nutKhong: 'Chuyển sang Dân sự (Đ.26.4)' };
var LOAI_VIEC = LOAI_VIEC_LV.ds;
function lvTim(ma) { for (var k in LOAI_VIEC_LV) { var x = LOAI_VIEC_LV[k].filter(function (y) { return y[0] === ma; })[0]; if (x) return { lv: k, x: x }; } return null; }
function khongDau(t) { return t.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); }
/* bảng chọn từ đáy của bước 1 (portal vào khung .ph) */
/* v537 (21/11/2026, chốt droplist PA2 – ra-soat-bottom-sheet-droplist mục F): bảng chọn danh sách
   – chạm mục chỉ đánh dấu (nền xám bo góc, chữ đậm màu thường, không dấu tích); bấm "Áp dụng" (nút chính toàn ngang ở chân) mới đóng và nhận giá trị;
   – tiêu đề chỉ là tên ô (bỏ chữ "Chọn"). Áp mọi bảng có LvRows (ô chọn, ô chọn trong Bộ lọc, Sắp xếp, Trạng thái hồ sơ…) và bảng truyền p.apDung. */
var LV_CTX = React.createContext(null);
function lvTenO(t) { t = String(t || ''); while (/^Chọn\s+/i.test(t)) t = t.replace(/^Chọn\s+/i, ''); return t.charAt(0).toUpperCase() + t.slice(1); }
function LvSheet(p) {
  var reg = React.useRef(null), co = React.useState(false), onClose = React.useRef(p.onClose); onClose.current = p.onClose;
  /* v568 (phiên fork 23/11, lỗi 1 – PA A): "Áp dụng" khóa khi chưa đánh dấu mục nào hoặc ô tìm không ra kết quả – danh sách trong bảng (LvRows, LvTam) báo qua ctx.bao */
  var mo = React.useState(true), moRef = React.useRef(true);
  /* v538 (NDKK 1.28 + quy tắc chung 21/11): bảng có ô tìm giữ nguyên chiều cao lúc mở – gõ tìm ít/không ra kết quả không co bảng, chân nút vẫn sát đáy */
  var dlg = React.useRef(null), caoKhoa = React.useRef(0);
  React.useLayoutEffect(function () { var el = dlg.current; if (!el || !p.top) return; var hh = el.offsetHeight; if (hh > caoKhoa.current) { caoKhoa.current = hh; el.style.minHeight = hh + 'px'; el.classList.add('ph-lv-khoa'); } }); /* chỉ tăng, không co */
  var ctx = React.useMemo(function () { return { dk: function (fn) { reg.current = fn; co[1](true); }, dong: function () { onClose.current(); }, bao: function (b) { b = !!b; if (b !== moRef.current) { moRef.current = b; mo[1](b); } } }; }, []);
  /* v568 (lỗi 2): p.chon – bảng chọn hiện chân "Áp dụng" ngay cả khi danh sách chưa có (đang tải): nút khóa tới khi danh sách sẵn sàng */
  var laChon = co[0] || !!p.apDung || !!p.chon, title = laChon && !p.giuTieuDe ? lvTenO(p.title) : p.title;
  var khoaAd = !p.apDung && (!reg.current || !mo[0]);
  var foot = p.foot || (laChon ? h(T.Button, { block: true, disabled: khoaAd, onClick: function () { if (khoaAd) return; var f = p.apDung || reg.current; if (f) f(); else p.onClose(); } }, 'Áp dụng') : null);
  return ReactDOM.createPortal(h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-co-sheet ph-lv-sheet' + (laChon ? ' ph-lv-pa2' : '') }, h('div', { className: 'ph-scrim', onClick: p.onClose }),
    h('div', { ref: dlg, className: 'tp-dlg tp-dlg-sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': title },
      h('div', { className: 'tp-dlg-head' }, h('h3', null, title), h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Đóng', onClick: p.onClose }, h(T.Icon, { name: 'x' }))),
      p.top || null,
      h('div', { className: 'tp-dlg-body' }, h(LV_CTX.Provider, { value: ctx }, p.children)), foot ? h('div', { className: 'tp-dlg-foot' }, foot) : null)), p.host);
}
/* giữ lựa chọn tạm trong bảng chọn có nút Áp dụng (dùng cho danh sách riêng không qua LvRows) */
/* danh sách riêng (thẻ, nhóm…) trong bảng chọn: giữ lựa chọn tạm, Áp dụng mới nhận – ve(sel, chon) vẽ danh sách */
function LvTam(p) {
  var ctx = React.useContext(LV_CTX), s = React.useState(p.cur);
  React.useLayoutEffect(function () { if (ctx) ctx.dk(function () { if (s[0] === p.cur || s[0] === undefined) ctx.dong(); else p.onPick(s[0]); }); });
  var coChon = s[0] !== undefined && s[0] !== null && s[0] !== ''; /* v568 (lỗi 1) */
  React.useLayoutEffect(function () { if (ctx) ctx.bao(coChon); }, [coChon]);
  React.useLayoutEffect(function () { return function () { if (ctx) ctx.bao(false); }; }, []);
  return p.ve(ctx ? s[0] : p.cur, ctx ? function (id) { s[1](id); } : p.onPick);
}
function useLvChon(cur, onPick) {
  var s = React.useState(cur);
  return { sel: s[0], chon: function (id) { s[1](id); }, apDung: function () { onPick(s[0]); } };
}
/* danh sách trong bảng chọn loại việc – phương án B (chọn 03/11/2026): mỗi mục một dòng, ngăn bằng đường kẻ mảnh, không radio; ký hiệu đỏ + tên + mô tả xám; mục đang chọn chữ đỏ đậm + dấu tích bên phải */
/* v326 (12/11/2026, chọn K1 – như web): loại việc không phù hợp loại tài khoản đang đăng nhập → bấm vào chỉ hiện thanh thông báo nổi, không chọn được, bảng chọn vẫn mở.
   Dữ liệu mẫu (web lấy từ danh mục doiTuongNguyenDon / chỉ cơ quan): Loại việc chi tiết "Bí mật kinh doanh" – không dành cho tài khoản cá nhân;
   Loại việc cụ thể VA-DS-7 – chỉ dành cho cơ quan có thẩm quyền */
var LV_KHONG_PHU_HOP = 'Bạn không thể tạo đơn với loại việc này', LV_CHI_CO_QUAN = 'Loại đơn này chỉ dành cho cơ quan có thẩm quyền.';
var LVCT_CHAN = ['Bí mật kinh doanh'], LV_CO_QUAN = []; /* demo NDKK 1.15: bỏ chặn Đ.26.7 – web không gán thuộc tính chỉ dành cho cơ quan */
function LvRows(p) {
  /* p.menu: danh sách hành động (không phải chọn giá trị) – bấm là làm ngay, không Áp dụng; p.ngay: bảng đã có chân riêng (Nhập lại | Áp dụng) – chạm cập nhật ngay trạng thái tạm của bảng */
  var ctx0 = React.useContext(LV_CTX), ctx = p.menu ? null : ctx0, cho = ctx && !p.ngay, s = React.useState(p.cur), sel = cho ? s[0] : p.cur;
  React.useLayoutEffect(function () { if (ctx) ctx.dk(p.ngay ? null : function () { if (s[0] === p.cur || s[0] === undefined) ctx.dong(); else p.onPick(s[0]); }); });
  /* v568 (lỗi 1 – PA A): báo bảng có mục đang đánh dấu và có kết quả; mục "Tất cả" mã rỗng vẫn tính là đã đánh dấu; danh sách bị thay bằng câu "Không có mục khớp" (gỡ khỏi bảng) thì khóa */
  var rongRef = React.useRef(false); if (p.items.some(function (x) { return x.id === ''; })) rongRef.current = true;
  var coChon = sel !== undefined && sel !== null && (sel !== '' || rongRef.current);
  React.useLayoutEffect(function () { if (cho) ctx.bao(p.items.length > 0 && coChon); }, [coChon, p.items.length]);
  React.useLayoutEffect(function () { return function () { if (cho) ctx.bao(false); }; }, []);
  return h('ul', { className: 'ph-lvr' + (p.the ? ' ph-lvr-the' : ''), role: 'listbox', 'aria-label': p.label }, p.items.map(function (x) { /* v581: p.the – mỗi mục một thẻ (Loại việc cụ thể) */
    var on = sel === x.id;
    return h('li', { key: x.id }, h('button', { type: 'button', role: 'option', 'aria-selected': on, className: 'ph-lvr-it' + (on ? ' ph-lvr-on' : ''), onClick: function () { if (cho) s[1](x.id); else p.onPick(x.id); } },
      h('span', { className: 'ph-lvr-tx' }, h('span', { className: 'ph-lvr-t' }, x.code ? h('span', { className: 'ph-lv-code' }, x.code) : null, x.name), x.desc ? h('span', { className: 'ph-lvr-d' }, x.desc) : null),
      x.n != null ? h('span', { className: 'ph-lvr-n tp-num' }, x.n) : null, /* v537: số đếm bên phải (Trạng thái hồ sơ…) */
      h('span', { className: 'ph-lvr-ck', 'aria-hidden': 'true' }, on ? h(T.Icon, { name: 'check' }) : null)));
  }));
}
/* Loại việc cụ thể (chốt 02/11/2026): ô chọn → bảng từ đáy "Chọn loại việc cụ thể" (ô tìm nhanh khi trên 6 mục như web; thẻ ký hiệu + tên + mô tả); dưới ô là mô tả loại việc đã chọn */
function CaseTypes(p) {
  var o = React.useState(false), q = React.useState(''), anchor = React.useRef(null), host = useHost(anchor);
  /* v537 (NDKK 1.14, như web): ẩn hẳn loại việc không dành cho loại tài khoản đang đăng nhập (đối tượng được nộp ở Bước 2 – ND_CFG.d2) */
  var lk = laTC() ? 'tc' : 'cn', list = (LOAI_VIEC_LV[p.lv] || []).filter(function (x) { var c = ND_CFG[x[0]]; return !c || !c.d2 || c.d2.indexOf(lk) >= 0; }), cur = list.filter(function (x) { return x[0] === p.v; })[0];
  var kq = khongDau(q[0].trim()), loc = list.filter(function (x) { return !kq || khongDau(x[1] + ' ' + x[2] + ' ' + x[3]).indexOf(kq) >= 0; });
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    h(T.SelectField, { label: 'Loại việc cụ thể', placeholder: '— Chọn loại việc cụ thể —', value: cur ? cur[1] + ' ' + cur[2] : undefined, open: o[0], error: p.loi ? 'x' : undefined, onClick: function () { q[1](''); o[1](true); } }),
    o[0] && host ? h(LvSheet, { host: host, title: 'Chọn loại việc cụ thể', onClose: function () { o[1](false); },
      top: list.length > 6 ? h('div', { className: 'fx-search' }, Tf('Tìm nhanh loại việc', { icon: 'search', placeholder: 'Ví dụ: sở hữu trí tuệ, ly hôn, đất đai', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })) : null },
      /* demo NDKK 1.15: bỏ chặn "chỉ dành cho cơ quan" – web không gán thuộc tính này cho thẻ nào, chọn được như mọi loại việc */
      loc.length ? h(LvRows, { label: 'Loại việc cụ thể', the: true, cur: p.v, items: loc.map(function (x) { return { id: x[0], code: x[1], name: x[2], desc: x[3] }; }), onPick: function (id) { p.onChange(id); o[1](false); } })
        : h('p', { className: 'ph-lv-empty' }, 'Không có loại việc khớp «' + q[0] + '».')) : null);
}
/* câu hỏi phân định (web CauHoiPhanDinh): khung nền xám, câu hỏi đậm + mô tả, Có/Không chưa chọn sẵn; trả lời lệch → cảnh báo vàng + nút chuyển loại việc (chuyển cả lĩnh vực) */
function PhanDinh(p) {
  var r = LV_PHAN_DINH, tl = p.tl, dangCo = p.v === r.co, lech = tl === undefined ? false : (tl ? !dangCo : dangCo);
  return h('section', { className: 'ph-pd' },
    h('p', { className: 'ph-pd-t' }, r.cauHoi), h('p', { className: 'ph-pd-d' }, r.moTa),
    h('div', { className: 'ph-seg-gon' }, h(T.SegmentedControl, { label: r.cauHoi, value: tl === undefined ? null : (tl ? 'co' : 'khong'), onChange: function (v) { p.onTl(v === 'co'); }, options: [{ value: 'co', label: 'Có' }, { value: 'khong', label: 'Không' }] })),
    lech ? h('div', { className: 'ph-pd-warn', role: 'alert' }, h(T.Icon, { name: 'alert' }),
      h('div', null, h('p', null, tl ? r.cbCo : r.cbKhong),
        h(T.Button, { size: 'sm', variant: 'secondary', onClick: function () { p.onChuyen(dangCo ? r.khong : r.co); } }, tl ? r.nutCo : r.nutKhong))) : null);
}
/* Loại việc chi tiết – phương án A (chọn 02/11/2026): ô chọn → bảng từ đáy "Chọn loại việc chi tiết", chọn xong bảng tự đóng; 03/11/2026: bỏ radio, dùng chung danh sách dòng LvRows với bảng loại việc cụ thể */
function LvChiTiet(p) {
  var o = React.useState(false), anchor = React.useRef(null), host = useHost(anchor);
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    h(T.SelectField, { label: 'Loại việc chi tiết', placeholder: '— Chọn loại việc chi tiết —', value: p.v || undefined, open: o[0], error: p.loi ? 'x' : undefined, onClick: function () { o[1](true); } }),
    o[0] && host ? h(LvSheet, { host: host, title: 'Chọn loại việc chi tiết', onClose: function () { o[1](false); } },
      h(LvRows, { label: 'Loại việc chi tiết', cur: p.v, items: p.ds.filter(function (t) { return laTC() || LVCT_CHAN.indexOf(t) < 0; }).map(function (t) { return { id: t, name: t }; }), onPick: function (t) { /* v537 (NDKK 1.14): mục không dành cho cá nhân đã ẩn, bỏ thông báo chặn */ /* v333: chỉ chặn tài khoản cá nhân */ p.onChange(t); o[1](false); } })) : null);
}
/* hình minh họa Lĩnh vực vẽ mới theo nội dung (02/11/2026), cùng kiểu và lớp màu với bộ Illustration của design system; chỉ ở mức app */
var ILLO_LV = {
  danSu: '<rect class="ipp" x="6" y="5" width="26" height="34" rx="3"/><rect class="ird" x="10" y="10" width="12" height="2.6" rx="1.3"/><rect class="il" x="10" y="16" width="18" height="2" rx="1"/><rect class="il" x="10" y="20.5" width="18" height="2" rx="1"/><rect class="il" x="10" y="25" width="12" height="2" rx="1"/><circle class="ird" cx="35" cy="35" r="9"/><rect class="iwh" x="34.2" y="30" width="1.6" height="8.6" rx=".8"/><rect class="iwh" x="29.4" y="30.9" width="11.2" height="1.6" rx=".8"/><path class="iwhs1" d="M30.5 32.3l-1.7 3.9M30.5 32.3l1.7 3.9M39.5 32.3l-1.7 3.9M39.5 32.3l1.7 3.9"/><path class="iwh" d="M28.4 36.1h4.2a2.1 2.1 0 0 1-4.2 0zM37.4 36.1h4.2a2.1 2.1 0 0 1-4.2 0z"/><rect class="iwh" x="31.6" y="38.4" width="6.8" height="1.5" rx=".75"/>',
  honNhan: '<path class="ird" d="M2 21 21 5l19 16z"/><rect class="ipp" x="6" y="18" width="30" height="23" rx="1.5"/><rect class="ib2" x="10" y="23" width="8" height="7" rx="1"/><rect class="ib" x="22" y="27" width="8" height="14" rx="1"/><circle class="iwh" cx="28" cy="34.5" r="1"/><circle class="ito" cx="37" cy="36" r="9"/><path class="iwh" d="M37 41 32.6 36.7a2.8 2.8 0 0 1 4.4-3.4 2.8 2.8 0 0 1 4.4 3.4z"/>',
  laoDong: '<path class="ioc" d="M5 28a18 18 0 0 1 36 0z"/><rect class="ioc2" x="20.5" y="8.4" width="5" height="19.6" rx="2.5"/><rect class="ioc2" x="2" y="26.5" width="42" height="5.5" rx="2.75"/><circle class="ite" cx="36" cy="37" r="8.5"/><g transform="rotate(45 36 37)"><rect class="iwh" x="35.1" y="33" width="1.8" height="9" rx=".9"/><circle class="iwh" cx="36" cy="32.9" r="2.8"/><rect class="ite" x="35.1" y="29.7" width="1.8" height="3.2"/></g>',
  kinhDoanh: '<rect class="ipp" x="6" y="17" width="32" height="24" rx="1.5"/><rect class="ib2" x="10" y="23" width="10" height="8" rx="1"/><rect class="ib" x="24" y="26" width="8" height="15" rx="1"/><rect class="ird" x="4" y="8" width="36" height="9" rx="1.5"/><rect class="ip2" x="10" y="8" width="6" height="9"/><rect class="ip2" x="22" y="8" width="6" height="9"/><rect class="ip2" x="34" y="8" width="6" height="9"/><circle class="ird" cx="7" cy="17" r="3"/><circle class="ip2" cx="13" cy="17" r="3"/><circle class="ird" cx="19" cy="17" r="3"/><circle class="ip2" cx="25" cy="17" r="3"/><circle class="ird" cx="31" cy="17" r="3"/><circle class="ip2" cx="37" cy="17" r="3"/><circle class="ig" cx="37" cy="36" r="8.5"/><path class="iwhs2" d="M32.5 39.4l3.2-3.4 2.4 2.2 3.2-3.6"/><polygon class="iwh" points="42.2,31.4 42,35.2 38.8,33"/>' };
function LvIllo(p) { return h('svg', { className: 'tp-illo', viewBox: '0 0 48 48', 'aria-hidden': 'true', dangerouslySetInnerHTML: { __html: ILLO_LV[p.name] } }); }
function Hd(t, req) { return h('h2', { className: 'ph-s1-h' }, t, req ? h('span', { className: 'ph-s1-req', 'aria-hidden': 'true' }, ' *') : null); }
/* hàng chọn ngang 4 mục (ô hình minh họa nhiều màu + tên dưới, như ô Dịch vụ trực tuyến), chọn một; bên dưới là ô chú thích điều khoản của mục đang chọn (theo ảnh mẫu 02/11/2026) */
function PickRow(label, items, val, set) {
  return h('ul', { className: 'ph-pick', role: 'radiogroup', 'aria-label': label }, items.map(function (t) {
    var on = val === t.k;
    return h('li', { key: t.k }, h('button', { type: 'button', role: 'radio', 'aria-checked': on, className: 'ph-pick-it' + (on ? ' ph-pick-on' : ''), onClick: function () { set(t.k); } },
      h('span', { className: 'ph-pick-box', 'aria-hidden': 'true' }, t.lvIllo ? h(LvIllo, { name: t.lvIllo }) : h(T.Illustration, { name: t.illo })),
      h('span', { className: 'ph-pick-t' }, t.ngan)));
  }));
}
/* lĩnh vực theo BLTTDS 2015: Dân sự Điều 26, Hôn nhân và gia đình Điều 28, Kinh doanh, thương mại Điều 30, Lao động Điều 32; số loại việc theo danh mục web */
var LINH_VUC = [
  { k: 'ds', lvIllo: 'danSu', ngan: 'Dân sự', dieu: 'Điều 26', so: '14' },
  { k: 'hn', lvIllo: 'honNhan', ngan: 'Hôn nhân và\ngia đình', dieu: 'Điều 28', so: '8' },
  { k: 'ld', lvIllo: 'laoDong', ngan: 'Lao động', dieu: 'Điều 32', so: '10' },
  { k: 'kd', lvIllo: 'kinhDoanh', ngan: 'Kinh doanh,\nthương mại', dieu: 'Điều 30', so: '5' }];
/* draft = mở lại đơn soạn dở: đã chọn sẵn thủ tục, lĩnh vực, loại việc; đơn mới: chưa chọn gì, hiện lần lượt từng mục như web (chọn 1 → hiện 2 → hiện 3);
   02/11/2026: Loại việc cụ thể là ô chọn + bảng từ đáy; Đ.26.4 / Đ.30.2 hiện câu hỏi phân định; loại việc có danh mục con hiện "Loại việc chi tiết" (đổi lĩnh vực/loại việc thì xóa lựa chọn chi tiết như web) */
/* v324 (12/11/2026, chọn M3): hộp xác nhận dùng chung kiểu hộp đơn soạn dở – hình minh họa trong vòng đỏ nhạt + huy hiệu đỏ, chữ căn giữa, nút đỏ trên + nút xám dưới */
function IlloBadge(x) { return h('span', { className: 'tp-illo-circle ph-draft-illo' }, h(T.Illustration, { name: x[0] }), h('span', { className: 'ph-draft-badge' }, h(T.Icon, { name: x[1] }))); }
function XnDoi(p) {
  return h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-draft' }, h('div', { className: 'ph-scrim' }),
    h('div', { className: 'ph-draft-box', role: 'alertdialog', 'aria-modal': 'true' }, IlloBadge(p.illo), h('p', { className: 'ph-draft-t' }, p.title), h('p', { className: 'ph-draft-d' }, p.desc),
      h('div', { className: 'ph-draft-btns' }, h(T.Button, { block: true, className: 'pt-chk', onClick: p.onOk }, 'Tiếp tục'), h(T.Button, { block: true, variant: 'tonal', className: 'pt-chk', onClick: p.onCancel }, 'Hủy'))));
}
/* v324: web – đơn đã nhập bước 4, quay lại bước 1 đổi Loại thủ tục / Lĩnh vực / Loại việc → hộp "Đổi loại việc?"; Tiếp tục = áp dụng (xóa thông tin riêng theo loại việc ở bước 4), Hủy = giữ nguyên.
   Prototype: hỏi ở bước 1 của đơn soạn dở (sub1d – đã có nội dung bước 4) */
function Step1Body(p) {
  var dr = p && p.draft, s0 = dr ? ND_DON : {};
  var tt = React.useState(dr ? s0.tt : null), lv = React.useState(dr ? s0.lv : null), v = React.useState(dr ? s0.v || '' : ''), ct = React.useState(dr ? s0.ct || '' : ''), tl = React.useState(undefined);
  var cf = React.useState(p && p.mo ? { f: function () { lv[1]('hn'); v[1](''); ct[1](''); } } : null), anchor = React.useRef(null), host = useHost(anchor);
  var b = ndNghe(), lo = (b.kt1 && b.loi1) || {}; /* demo NDKK 1.18: mục bị báo thiếu lúc bấm Tiếp theo → báo lỗi tại mục tới khi chọn */
  React.useEffect(function () { var x = !!(p && p.kt); NDB.loi1 = x ? { tt: 1, v: 1 } : null; if (!!NDB.kt1 !== x) ndbDat('kt1', x); }, []);
  React.useEffect(function () { ndLuu({ tt: tt[0], lv: lv[0], v: v[0], ct: ct[0] }); }, [tt[0], lv[0], v[0], ct[0]]);
  function hoi(f) { if (dr) cf[1]({ f: f }); else f(); }
  var t = THU_TUC.filter(function (x) { return x.k === tt[0]; })[0], dsLv = tt[0] ? lvTheoTT(tt[0]) : [], l = dsLv.filter(function (x) { return x.k === lv[0]; })[0];
  var key = lvKhoa(tt[0], lv[0]), ds = LV_CHI_TIET[v[0]], pd = v[0] === LV_PHAN_DINH.co || v[0] === LV_PHAN_DINH.khong, gy = GOI_Y_CHUYEN[v[0]];
  /* 1.11 / 1.12: đổi loại thủ tục thì danh sách lĩnh vực, loại việc đổi theo – xóa lựa chọn cũ như web */
  function chonTt(k) { if (k !== tt[0]) hoi(function () { tt[1](k); lv[1](null); v[1](''); ct[1](''); tl[1](undefined); }); }
  function chonLv(k) { if (k !== lv[0]) hoi(function () { lv[1](k); v[1](''); ct[1](''); }); }
  function chonV(ma) { if (ma !== v[0]) hoi(function () { v[1](ma); ct[1](''); }); }
  function chuyen(ma) { var r = lvTim(ma); if (!r) return; var g = LV_GOC[r.lv]; tt[1](g[0]); lv[1](g[1] || (r.lv === 'hc' && laTC() ? 'hc' : null)); v[1](ma); ct[1](''); tl[1](undefined); }
  var coViec = !!t && (!dsLv.length || !!l);
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    cf[0] && host ? ReactDOM.createPortal(h(XnDoi, { illo: ['xemXet', 'alert'], title: 'Đổi loại việc?', desc: 'Đổi loại việc sẽ xóa các thông tin riêng theo loại việc đã nhập ở bước Nội dung đơn. Thông tin các bên vẫn được giữ.', onOk: function () { var f = cf[0].f; cf[1](null); f(); }, onCancel: function () { cf[1](null); } }), host) : null,
    h('section', { className: 'ph-s1-sec' }, Hd('Loại thủ tục', 1), PickRow('Loại thủ tục', THU_TUC, tt[0], chonTt),
      lo.tt && !tt[0] ? LoiDong('Vui lòng chọn loại thủ tục.') : null,
      t ? h('div', { className: 'ph-s1-note', 'aria-live': 'polite' }, h('p', null, t.moTa), h('p', { className: 'ph-s1-note-law' }, t.luat)) : null),
    t && dsLv.length ? h('section', { className: 'ph-s1-sec' }, Hd('Lĩnh vực', 1), PickRow('Lĩnh vực', dsLv, lv[0], chonLv),
      lo.lv && !lv[0] ? LoiDong('Vui lòng chọn lĩnh vực.') : null,
      l ? h('p', { className: 'ph-s1-law', 'aria-live': 'polite' }, h('b', null, l.dieu), ' · ' + l.so + ' loại việc') : null) : null,
    coViec ? h('section', { className: 'ph-s1-sec' }, Hd('Loại việc cụ thể', 1), h(CaseTypes, { lv: key, v: v[0], onChange: chonV, loi: lo.v && !v[0] }),
      lo.v && !v[0] ? LoiDong('Vui lòng chọn loại việc cụ thể.') : null,
      gy ? h('div', { className: 'ph-goiy', role: 'note' }, h(T.Icon, { name: 'info' }), h('div', null, h('p', null, gy.nd),
        h(T.Button, { size: 'sm', variant: 'secondary', className: 'pt-chk', onClick: function () { chuyen(gy.ma); } }, gy.nut))) : null) : null,
    coViec && pd ? h(PhanDinh, { v: v[0], tl: tl[0], onTl: tl[1], onChuyen: chuyen }) : null,
    coViec && ds ? h('section', { className: 'ph-s1-sec' }, Hd('Loại việc chi tiết', 1), h(LvChiTiet, { ds: ds, v: ct[0], onChange: ct[1], loi: lo.ct && !ct[0] }),
      lo.ct && !ct[0] ? LoiDong('Vui lòng chọn loại việc chi tiết.') : null) : null);
}
/* Bước 1 (sửa theo ảnh mẫu 02/11/2026): các mục đặt phẳng trên nền trắng, tiêu đề đậm có dấu * bắt buộc; Loại thủ tục và Lĩnh vực là hàng chọn ngang + ô chú thích điều khoản; Loại việc cụ thể là ô chọn mở bảng từ đáy */
function Sub1() { return Submit(1, h(Step1Body), null, 'ph-s1'); }
function Sub1Draft() { return Submit(1, h(Step1Body, { draft: true }), null, 'ph-s1'); }
function Sub1Doi() { return Submit(1, h(Step1Body, { draft: true, mo: true }), null, 'ph-s1'); } /* v324: màn có sẵn hộp Đổi loại việc? (đi tới màn bất kỳ) */
/* hỏi đơn soạn dở khi bấm Nộp đơn khởi kiện – phương án P3 (chọn 02/11/2026): hộp giữa màn, hình minh họa nộp đơn + huy hiệu đồng hồ, "Tiếp tục" nút đỏ cả hàng, "Bắt đầu mới" nút xám; câu chữ theo web */
/* v323 (12/11/2026): web /nop-don-khoi-kien – tài khoản tổ chức chưa có người đại diện theo pháp luật đang có hiệu lực: hộp chặn hiện TRƯỚC hộp đơn soạn dở;
   1 nút "Khai báo người đại diện" mở Thông tin tài khoản – Tổ chức (web: /tai-khoan); nền mờ không đóng hộp (như web) */
function DraftNoRep() {
  return h(Phone, { cls: 'ph-dlg' }, Home(), h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-draft' }, h('div', { className: 'ph-scrim' }),
    h('div', { className: 'ph-draft-box ph-norep', role: 'alertdialog', 'aria-modal': 'true', 'aria-labelledby': 'ph-norep-t', 'aria-describedby': 'ph-norep-d' },
      IlloBadge(['cccd', 'alert']), /* v324 (chọn M3): cùng kiểu hộp đơn soạn dở */
      h('p', { id: 'ph-norep-t', className: 'ph-draft-t' }, 'Chưa có người đại diện theo pháp luật'),
      h('p', { id: 'ph-norep-d', className: 'ph-draft-d' }, 'Tổ chức chưa có người đại diện theo pháp luật đang có hiệu lực. Vui lòng khai báo người đại diện trong Hồ sơ tổ chức trước khi nộp đơn.'),
      h('div', { className: 'ph-draft-btns' }, h(T.Button, { block: true }, 'Khai báo người đại diện') /* demo NDKK 1.1: bỏ nút "Bỏ qua" – web chặn hẳn, chỉ 1 nút */))));
}
function DraftAsk() {
  return h(Phone, { cls: 'ph-dlg' }, Home(), h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-draft' }, h('div', { className: 'tp-scrim' }),
    h('div', { className: 'ph-draft-box', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'ph-draft-t' },
      h('button', { type: 'button', className: 'tp-icon-btn ph-draft-x', 'aria-label': 'Đóng', 'data-pt-go': 'back' }, h(T.Icon, { name: 'x' })), /* v321 (12/11/2026): nút đóng góc phải trên – đóng hộp, ở lại màn trước */
      h('span', { className: 'tp-illo-circle ph-draft-illo' }, h(T.Illustration, { name: 'nopDon' }), h('span', { className: 'ph-draft-badge' }, h(T.Icon, { name: 'clock' }))),
      h('p', { id: 'ph-draft-t', className: 'ph-draft-t' }, 'Bạn có một đơn đang soạn dở gần đây.'),
      h('p', { className: 'ph-draft-d' }, 'Tiếp tục hoàn thiện hoặc bắt đầu một đơn mới.'),
      h('div', { className: 'ph-draft-btns' }, h(T.Button, { block: true }, 'Tiếp tục'), h(T.Button, { block: true, variant: 'tonal' }, 'Bắt đầu mới')))));
}
/* Bước 2 sắp xếp lại theo web (02/11/2026): khối 1 "Người khởi kiện" (cá nhân: các trường như web, ô lấy từ tài khoản định danh chỉ đọc), khối 2 "Danh sách người đồng khởi kiện" (thêm được nhiều người, trường như người khởi kiện, nhập được hết) */
function Ro(l, v, o) { return Tf(l, Object.assign({ readOnly: true, defaultValue: v }, o || {})); }
function RoSel(l, v, o) { return Sf(l, Object.assign({ value: v, disabled: true }, o || {})); }
/* nút radio (mức app, 02/11/2026): vòng tròn 22px viền border-strong, chọn thì viền đỏ + chấm đỏ; khóa thì nền xám */
var rid = 0;
function Radio(p) {
  var id = React.useRef(null); if (!id.current) id.current = 'ph-r' + (++rid);
  return h('label', { className: 'ph-radio' + (p.disabled ? ' ph-radio-off' : ''), htmlFor: id.current },
    h('input', { id: id.current, type: 'radio', name: p.name, checked: !!p.checked, disabled: p.disabled, onChange: p.onChange || noop, onClick: p.onClick }),
    h('span', { className: 'ph-radio-dot', 'aria-hidden': 'true' }), h('span', null, p.label));
}
/* giới tính: radio Nam / Nữ / Khác; người khởi kiện lấy từ tài khoản định danh nên khóa */
function Gender(p) {
  var st = React.useState(p.ro ? (p.v || 'nam') : (p.v || null)), nm = React.useRef('ph-g' + (++rid));
  return h('div', { className: 'ph-gender', role: 'radiogroup', 'aria-label': p.label || 'Giới tính' }, [['nam', 'Nam'], ['nu', 'Nữ'], ['khac', 'Khác']].map(function (g) {
    return h(Radio, { key: g[0], name: nm.current, label: g[1], checked: st[0] === g[0], disabled: !!p.ro, onChange: function () { st[1](g[0]); if (p.onChange) p.onChange(g[0]); } });
  }));
}
/* "Có người đại diện theo ủy quyền" (radio, bấm lại để bỏ chọn). Chọn thì hiện nút "+ Thêm người đại diện" mở bảng từ đáy Thêm người đại diện (theo web, 02/11/2026); lưu xong hiện thẻ người đại diện + nút Xóa */
function useHost(ref) { var hs = React.useState(null); React.useEffect(function () { hs[1](ref.current && ref.current.closest('.ph')); }, []); return hs[0]; }
/* thẻ tóm tắt thu gọn (chọn 02/11/2026): số thứ tự tròn đỏ, tên, dòng phụ; chạm để mở/thu gọn phần chi tiết; nút thùng rác → popup xác nhận xóa */
function Sum(p) {
  var op = React.useState(!!p.open), me = React.useRef(null);
  React.useEffect(function () { if (p.ver) op[1](!!p.mo); }, [p.ver]); /* demo NDKK 1.22: Thu gọn / Mở rộng tất cả */
  React.useEffect(function () {
    if (p.cuon === false) return; /* thẻ mở sẵn khi vào màn: không cuộn */
    /* chỉ cuộn vùng nội dung gần nhất (không dùng scrollIntoView vì nó cuộn cả khung điện thoại và trang, làm mất header) */
    if (!p.open || !me.current) return;
    var x = me.current.parentElement;
    while (x && !/(auto|scroll)/.test(getComputedStyle(x).overflowY)) x = x.parentElement;
    if (x) x.scrollTo({ top: x.scrollTop + me.current.getBoundingClientRect().top - x.getBoundingClientRect().top - 8, behavior: 'smooth' });
  }, []);
  /* flat (thẻ người đại diện, 02/11/2026): không số thứ tự, không thu gọn/mở rộng – chỉ thông tin + nút xóa; lbl (bước 3, 03/11/2026): bỏ số tròn, tên, dòng phụ – chỉ nhãn vai trò + STT */
  if (p.flat) return h('div', { className: 'dm-sum dm-sum-flat' },
    h('div', { className: 'dm-sum-head' },
      h('div', { className: 'dm-sum-hit' }, h('span', { className: 'dm-sum-tx' }, h('b', null, p.ten), h('small', null, p.sub), p.sub2 ? h('small', null, p.sub2) : null)),
      h('button', { type: 'button', className: 'dm-del', 'aria-label': 'Xóa ' + p.ten, onClick: p.onDel }, h(T.Icon, { name: 'trash' }))));
  var the = p.the ? p.the() : null;
  return h('div', { ref: me, className: 'dm-sum' + (op[0] ? ' dm-sum-open' : '') },
    h('div', { className: 'dm-sum-head' },
      h('button', { type: 'button', className: 'dm-sum-hit', 'aria-expanded': op[0], onClick: function () { op[1](!op[0]); } },
        p.lbl || the ? null : h('span', { className: 'dm-sum-no' }, p.no),
        /* v548 (người dùng 23/11, theo web): tiêu đề thẻ đương sự – số tròn (chỉ khi danh sách trên 1 người) + "Người … n" + dòng "Họ tên · số giấy tờ" (thiếu thì bỏ phần thiếu); p.the() trả { lbl, no, ten, so } */
        the ? h(F, null, the.no ? h('span', { className: 'dm-sum-no' }, String(the.no)) : null,
          h('span', { className: 'dm-sum-tx' }, h('b', null, the.lbl), [the.ten, the.so].filter(Boolean).length ? h('small', null, [the.ten, the.so].filter(Boolean).join(' · ')) : null))
        : p.lbl ? h('span', { className: 'dm-sum-tx' }, h('b', null, p.lbl)) : h('span', { className: 'dm-sum-tx' }, h('b', null, p.ten), h('small', null, p.sub), p.sub2 ? h('small', null, p.sub2) : null),
        p.tag ? h('span', { className: 'dm-sum-tag' }, p.tag) : null), /* demo NDKK 1.24, 1.45: nhãn loại Cá nhân / Tổ chức / Cơ quan */
      p.onEdit ? h('button', { type: 'button', className: 'dm-del dm-edit', 'aria-label': 'Sửa ' + (p.lbl || p.ten), onClick: p.onEdit }, h(T.Icon, { name: 'pen' })) : null, /* demo NDKK 1.35 */
      p.onDel ? h('button', { type: 'button', className: 'dm-del', 'aria-label': 'Xóa ' + (p.lbl || p.ten), onClick: p.onDel }, h(T.Icon, { name: 'trash' })) : null,
      /* 1.22 (người dùng 20/11): mũi tên thu gọn/mở ở ngoài cùng bên phải, sau nút sửa, xóa (như web: nhãn loại → sửa → xóa → mũi tên) */
      h('button', { type: 'button', className: 'dm-sum-tg', 'aria-label': op[0] ? 'Thu gọn' : 'Mở rộng', 'aria-expanded': op[0], onClick: function () { op[1](!op[0]); } }, h(T.Icon, { name: 'chevronDown', className: 'dm-sum-chev' }))),
    op[0] ? h('div', { className: 'dm-sum-body' }, p.children) : null);
}
/* popup xác nhận xóa (chọn 02/11/2026): icon thùng rác, "Xóa người …?", "<Tên> sẽ bị xóa khỏi danh sách …", Hủy / Xóa */
function ConfirmDel(p) {
  return h('div', { className: 'tp-dlg-wrap tp-dlg-inline dm-cf' }, h('div', { className: 'ph-scrim', onClick: p.dang ? undefined : p.onNo }),
    h('div', { className: 'dm-cf-box', role: 'alertdialog', 'aria-modal': 'true', 'aria-labelledby': 'dm-cf-t' },
      p.illo ? IlloBadge(p.illo) : h('span', { className: 'dm-cf-ic' + (p.tone ? ' dm-cf-ic-' + p.tone : ''), 'aria-hidden': 'true' }, h(T.Icon, { name: p.icon || 'trash' })),
      h('p', { id: 'dm-cf-t', className: 'dm-cf-t' }, p.title),
      h('p', { className: 'dm-cf-d' }, p.desc), p.extra || null,
      /* demo NDKK 1.80: p.dang – đang xử lý (nút đồng ý hiện vòng quay + p.yesDang, khóa Hủy) */
      h('div', { className: 'dm-cf-btns' }, h(T.Button, { variant: 'tonal', disabled: !!p.dang, onClick: p.onNo }, 'Hủy'), h(T.Button, { loading: !!p.dang, onClick: p.dang ? undefined : p.onYes, 'data-pt-go': p.go }, p.dang ? p.yesDang || p.yes : p.yes || 'Xóa'))));
}
/* demo NDKK (1.34–1.37, 1.51): pp.quyen {pl, uq} – phần đại diện được phép; pp.phapLuat – khối người đại diện theo pháp luật;
   pp.init – danh sách người đại diện theo ủy quyền có sẵn (đơn nháp); pp.on – đã đánh dấu sẵn; pp.moSan – mở sẵn bảng Thêm người đại diện (màn trạng thái); pp.tuSo – số giấy tờ của chính đương sự */
/* v537 (NDKK 1.39, như web form.ts loiTrungBenToTung): số giấy tờ/MST người đại diện đã khai ở Bước 2 (nguyên đơn) và Bước 3 (bị đơn) */
var ND_BUOC_HT = 0, ND_DD_BEN = { 2: [], 3: [] }, ND_SO_BEN = { 2: [], 3: [] }; /* ND_SO_BEN: số giấy tờ/MST đương sự + người đại diện đã khai ở mỗi bước (NDKK 1.42) */
function Proxy(pp) {
  pp = pp || {};
  var q = pp.quyen || { pl: !!pp.phapLuat, uq: true };
  var st = React.useState(!!pp.on), open = React.useState(pp.moSan ? { san: pp.moSan } : null), list = React.useState(pp.init || []), cf = React.useState(null), bo = React.useState(false), seq = React.useRef((pp.init || []).length), box = React.useRef(null), anchor = React.useRef(null), host = useHost(anchor);
  var ben = ND_BUOC_HT === 3 ? 3 : 2;
  React.useEffect(function () { ND_DD_BEN[ben] = list[0].map(function (x) { return x.so; }).filter(Boolean); }, [list[0]]);
  if (!q.pl && !q.uq) return null;
  var nhan = q.pl && q.uq ? 'Có người đại diện hợp pháp (Đại diện theo ủy quyền và đại diện theo pháp luật)' : q.pl ? 'Có người đại diện theo pháp luật' : 'Có người đại diện theo ủy quyền';
  function luu(v) {
    var sua = open[0] && open[0].sua;
    if (sua) list[1](list[0].map(function (x) { return x.k === sua.k ? Object.assign({ k: x.k }, v) : x; }));
    else { seq.current += 1; list[1](list[0].concat([Object.assign({ k: seq.current, moi: true }, v)])); }
    open[1](null);
  }
  function coDuLieu() { var r = box.current; return list[0].length > 0 || !!(r && (r.querySelector('.nd-chosen li, .nd-pltay') || [].some.call(r.querySelectorAll('.nd-tay input'), function (i) { return i.value.trim(); }))); }
  function bam() { if (st[0] && coDuLieu()) { bo[1](true); return; } st[1](!st[0]); } /* 1.34: bỏ đánh dấu khi đã có dữ liệu → hỏi xác nhận */
  var suaK = open[0] && open[0].sua ? open[0].sua.k : null;
  return h('div', { className: 'ph-rep', ref: box }, h('span', { ref: anchor, hidden: true }),
    h(Radio, { label: nhan, checked: st[0], onClick: bam }),
    st[0] && q.pl && pp.phapLuat ? h('section', { className: 'nd-box' }, h('h3', null, 'Người đại diện theo pháp luật'), pp.phapLuat) : null,
    st[0] && q.uq ? h('section', { className: 'nd-box' }, h('h3', null, 'Người đại diện theo ủy quyền'), /* 1.32 (người dùng 20/11): bỏ dòng mô tả xác minh định danh */
      list[0].length ? list[0].map(function (r, i) { return h(DaiDienRow, { key: r.k, r: r, i: i, onSua: function () { open[1]({ sua: r }); }, onDel: function () { cf[1](r); } }); })
        : null, /* 1.32 (người dùng 20/11): bỏ khung trống "Chưa có người đại diện nào." */
      h(T.Button, { variant: 'tint', block: true, icon: 'plus', className: 'ph-rep-add', onClick: function () { open[1]({}); } }, 'Thêm người đại diện')) : null,
    open[0] && host ? ReactDOM.createPortal(h(RepSheet, { sua: open[0].sua, san: open[0].san, tuSo: pp.tuSo, benKhac: ND_DD_BEN[ben === 2 ? 3 : 2], daCo: list[0].filter(function (x) { return x.k !== suaK; }).map(function (x) { return x.so; }), onClose: function () { open[1](null); }, onSave: luu }), host) : null,
    cf[0] && host ? ReactDOM.createPortal(h(ConfirmDel, { title: 'Xóa người đại diện?', desc: (cf[0].ten || 'Người đại diện') + ' sẽ bị xóa khỏi danh sách người đại diện theo ủy quyền',
      onNo: function () { cf[1](null); }, onYes: function () { list[1](list[0].filter(function (x) { return x.k !== cf[0].k; })); cf[1](null); } }), host) : null,
    bo[0] && host ? ReactDOM.createPortal(h(ConfirmDel, { title: 'Bỏ người đại diện hợp pháp?', desc: 'Toàn bộ thông tin người đại diện theo pháp luật và người đại diện theo ủy quyền đã nhập của đương sự này sẽ bị xóa.',
      onNo: function () { bo[1](false); }, onYes: function () { bo[1](false); list[1]([]); st[1](false); } }), host) : null);
}
/* 1.36 / 1.37: dòng người đại diện theo ủy quyền thu gọn/mở – tiêu đề họ tên, dòng phụ "CCCD/MST · quan hệ"; dòng khai theo cách cũ chưa xác minh: không có nút Sửa */
function DaiDienRow(p) {
  var r = p.r, tc = r.loai === 'tc', han = (r.tu || '—') + ' – ' + (r.den || 'Không xác định');
  var ten = r.chuaXm ? (r.ten || 'Người đại diện') + ' (chưa xác minh danh tính)' : (r.ten || 'Người đại diện ' + (p.i + 1));
  /* 1.35 (người dùng 21/11: "nhập như thế nào thì sửa hiển thị như thế – logic chung"): chạm dòng mở bảng Sửa người đại diện (cùng bảng lúc nhập, phần định danh khóa); không nút bút, không mở chi tiết tại chỗ */
  if (!r.chuaXm) return h('div', { className: 'dm-sum nd-dd3', 'data-so': r.so || undefined, 'data-ten': ten }, h('div', { className: 'dm-sum-head' },
    h('button', { type: 'button', className: 'dm-sum-hit', 'aria-label': 'Sửa ' + ten, onClick: p.onSua }, h('span', { className: 'dm-sum-no' }, p.i + 1),
      h('span', { className: 'dm-sum-tx' }, h('b', null, ten), h('small', null, [r.so, r.qh].filter(Boolean).join(' · ') || ' '), h('small', null, 'Thời hạn: ' + han))),
    h('button', { type: 'button', className: 'dm-del', 'aria-label': 'Xóa ' + ten, onClick: p.onDel }, h(T.Icon, { name: 'trash' })),
    h('span', { className: 'nd-dd3-mt', 'aria-hidden': 'true' }, h(T.Icon, { name: 'chevronRight' }))));
  /* 1.37: dữ liệu khai theo cách cũ, chưa xác minh – không có Sửa, giữ nguyên câu web */
  return h(Sum, { no: p.i + 1, ten: ten, sub: [r.so, r.qh].filter(Boolean).join(' · ') || ' ', open: !!r.moi, cuon: false, onDel: p.onDel },
    h('p', { className: 'nd-cu' }, 'Dữ liệu khai theo cách cũ, chưa qua xác minh danh tính — xoá dòng này rồi bấm "Thêm người đại diện" để nhập lại đầy đủ thông tin.'));
}
/* bảng Thêm người đại diện: bước 1 nhập và xác minh (Cá nhân: Số định danh/Số CCCD, Họ và tên, Ngày sinh; Tổ chức: Tên tổ chức/doanh nghiệp, Mã số thuế/MSDN) → Xác minh → thẻ thông tin đã xác minh + báo thành công → bước 2 bổ sung thông tin đại diện → Lưu */
/* kho dữ liệu cá nhân (theo ảnh web 02/11/2026): tệp mẫu */
var KHO = [{ id: 'k1', ten: 'vn-11134207-820l4-mesft1tpvhmo8c', tep: 'vn-11134207-820l4-mesft1tpvhmo8c.jpg', loai: 'Tài liệu khác', kt: '118.8 KB', dang: 'JPG', nguon: 'Tải từ thiết bị', ngay: '28-10-2026' }];
/* kho mẫu 24 tệp để xem phân trang (phương án A, chọn 02/11/2026); tên, ngày, nguồn là dữ liệu mẫu. Thẻ tệp: tên tài liệu / loại văn bản · ngày / Nguồn */
(function () { var L = ['Giấy ủy quyền', 'Hợp đồng ủy quyền', 'Căn cước công dân', 'Tài liệu khác'], N = ['giay-uy-quyen', 'hop-dong-uy-quyen', 'cccd-mat-truoc', 'tai-lieu'], D = ['PDF', 'PDF', 'JPG', 'PNG'];
  for (var i = 1; i < 24; i++) KHO.push({ id: 'k' + (i + 1), ten: N[i % 4] + '-' + (24 - i), tep: N[i % 4] + '-' + (24 - i) + '.' + D[i % 4].toLowerCase(), loai: L[i % 4], kt: (80 + i * 37 % 900) + ' KB', dang: D[i % 4], nguon: i % 3 === 1 ? 'Quyết định thông báo từ tòa' : 'Tải từ thiết bị', ngay: (28 - (i % 28)) + '-' + (i < 12 ? '10' : '09') + '-2026' }); })();
/* thẻ tài liệu đã chọn: dấu tích xanh, ô tên tài liệu (sửa được), tên tệp xanh, Loại tài liệu*, nút Xem / Thay tệp (Tải từ thiết bị, Lấy từ kho) / Xóa */
/* demo NDKK 1.40: tên tài liệu bắt buộc (*), chọn loại tài liệu bằng bảng từ đáy, báo lỗi theo từng tệp */
function DocCard(p) {
  var menu = React.useState(false), o = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), d = p.doc;
  return h('div', { className: 'ph-doc' + (p.loi ? ' ph-doc-loi' : '') }, h('span', { ref: anchor, hidden: true }),
    h('span', { className: 'ph-doc-ok', 'aria-hidden': 'true' }, h(T.Icon, { name: 'check' })),
    h('div', { className: 'ph-doc-main' },
      p.noName ? h('p', { className: 'ph-doc-file ph-doc-file1' }, d.tep) : h(T.TextField, { label: 'Tên tài liệu', required: !!p.reqName, className: 'ph-doc-name', placeholder: 'Nhập tên tài liệu', value: p.onDoi ? (d.ten || '') : undefined, defaultValue: p.onDoi ? undefined : d.ten, error: p.loi && p.loi.ten || undefined, onChange: p.onDoi ? function (e) { p.onDoi({ ten: e.target.value }); } : undefined }),
      p.noName ? null : h('p', { className: 'ph-doc-file' }, d.tep),
      h(T.SelectField, { label: 'Loại tài liệu', labelVisible: true, required: true, placeholder: '— Chọn loại tài liệu —', value: d.loai || undefined, open: o[0], error: p.loi && p.loi.loai || undefined, onClick: function () { o[1](true); } }),
      h('div', { className: 'ph-doc-act' },
        h(T.Button, { variant: 'ghost', size: 'sm', icon: 'eye', 'data-pt-go': 'attachment', onClickCapture: function () { window.__ibFile = d.tep; } }, 'Xem'), /* v351 */
        h('div', { className: 'ph-doc-menu' },
          h('button', { type: 'button', className: 'ph-doc-swap', 'aria-expanded': menu[0], onClick: function () { menu[1](!menu[0]); } }, 'Thay tệp', h(T.Icon, { name: 'chevronDown' })),
          null),
        h('button', { type: 'button', className: 'ph-doc-del', 'aria-label': 'Xóa tài liệu', onClick: p.onDel }, h(T.Icon, { name: 'trash' }))),
      menu[0] ? h('ul', { className: 'tp-listbox ph-doc-list', role: 'menu' },
        h('li', { role: 'menuitem', onClick: function () { menu[1](false); p.onDevice(); } }, 'Tải từ thiết bị'),
        p.onLib ? h('li', { role: 'menuitem', onClick: function () { menu[1](false); p.onLib(); } }, 'Lấy từ kho dữ liệu cá nhân') : null) : null),
    o[0] && host ? h(LvSheet, { host: host, title: 'Chọn loại tài liệu', onClose: function () { o[1](false); } },
      h(LvRows, { label: 'Loại tài liệu', cur: d.loai, items: LOAI_TL.map(function (x) { return { id: x, name: x }; }), onPick: function (x) { if (p.onDoi) p.onDoi({ loai: x }); o[1](false); } })) : null);
}
/* bảng "Chọn tệp từ kho dữ liệu cá nhân" (chồng lên bảng Thêm người đại diện): tìm, 3 bộ lọc, danh sách tệp có ô đánh dấu + Xem; > 10 tệp thì phân trang 10 tệp/trang (phương án A, 02/11/2026); Hủy / Chọn tệp (n) – khóa khi chưa chọn */
/* demo NDKK 1.67 / 1.69: p.nhieu – chọn nhiều tệp (nút "Chọn {n} tệp"); p.moTa – mô tả định dạng theo nơi mở; p.daCo – tên tệp đã đính kèm;
   p.trang – 'loi' (không tải được) | 'rong' (kho rỗng); mỗi tệp: nhãn định dạng, tên, loại · dung lượng · ngày, Nguồn, Vụ án liên quan, huy hiệu lý do không chọn được / Đã ký số */
var LIB_LY_DO = function (f, daCo, dd) { return (daCo || []).indexOf(f.tep) >= 0 ? 'Đã đính kèm' : f.quaCo ? 'Vượt quá 10MB' : (dd || ['PDF', 'PNG', 'JPG']).indexOf(f.dang) >= 0 ? null : 'Định dạng không hỗ trợ'; };
var KHO_CHUA_GAN = 'Chưa gắn vụ án', KHO_LOAI = ['Bản án', 'Biên bản', 'Giấy mời, triệu tập', 'Giấy xác nhận', 'Quyết định', 'Thông báo', 'Giấy ủy quyền', 'Hợp đồng ủy quyền', 'Căn cước công dân', 'Tài liệu khác']; /* danh mục mẫu (web: danhMucBieuMau) */
/* v554: ô lọc trong bảng kho – chạm mở bảng chọn từ đáy luôn có ô tìm "Nhập để tìm", mục đầu là "Tất cả…" (bỏ chọn) */
function KhoLoc(p) {
  var o = React.useState(false), q = React.useState(''), anchor = React.useRef(null), host = useHost(anchor);
  var kq = khongDau(q[0].trim()), ds = [{ id: '', name: p.tatCa }].concat(p.items.map(function (x) { return { id: x, name: x }; })).filter(function (x) { return !kq || khongDau(x.name).indexOf(kq) >= 0; });
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    h(T.SelectField, { label: p.tatCa, value: p.v || p.tatCa, open: o[0], onClick: function () { q[1](''); o[1](true); } }),
    o[0] && host ? h(LvSheet, { host: host, title: p.tieuDe, giuTieuDe: true, onClose: function () { o[1](false); },
      top: h('div', { className: 'fx-search' }, Tf('Tìm', { icon: 'search', placeholder: 'Nhập để tìm', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })) },
      ds.length ? h(LvRows, { label: p.tatCa, cur: p.v || '', items: ds, onPick: function (x) { p.onDoi(x); o[1](false); } }) : h('p', { className: 'ph-lv-empty' }, 'Không có mục khớp «' + q[0].trim() + '».')) : null);
}
function LibSheet(p) {
  var sel = React.useState([]), q = React.useState(''), pg = React.useState(1), tr = React.useState(p.trang || ''), body = React.useRef(null), PER = 10, lt = React.useState(''), va = React.useState('');
  var kq = khongDau(q[0].trim()), all = tr[0] === 'rong' ? [] : KHO.filter(function (f) { return (!kq || khongDau(f.ten + ' ' + f.tep).indexOf(kq) >= 0) && (!lt[0] || f.loai === lt[0]) && (!va[0] || (va[0] === KHO_CHUA_GAN ? !f.vuAn : f.vuAn === va[0])); });
  var dsVa = [KHO_CHUA_GAN].concat(KHO.map(function (f) { return f.vuAn; }).filter(function (x, i, a) { return x && a.indexOf(x) === i; }));
  var pages = Math.max(1, Math.ceil(all.length / PER)), cur = Math.min(pg[0], pages), list = all.slice((cur - 1) * PER, cur * PER);
  function go(n) { pg[1](n); if (body.current) body.current.scrollTop = 0; }
  function bam(f) { var on = sel[0].indexOf(f.id) >= 0; sel[1](p.nhieu ? (on ? sel[0].filter(function (x) { return x !== f.id; }) : sel[0].concat([f.id])) : (on ? [] : [f.id])); }
  var n = sel[0].length, nhan = p.nhieu ? (n ? 'Chọn ' + n + ' tệp' : 'Chọn tệp') : 'Chọn tệp';
  var khoiDs = tr[0] === 'loi' ? h('div', { className: 'ph-lib-tt' }, h(T.Icon, { name: 'alert', className: 'ph-lib-tt-loi' }), h('p', null, 'Không tải được danh sách tài liệu trong kho.'),
      h(T.Button, { variant: 'secondary', size: 'sm', className: 'pt-chk', onClick: function () { tr[1](''); } }, 'Thử lại'))
    : !all.length && !kq ? h('div', { className: 'ph-lib-tt' }, h(T.Icon, { name: 'folder' }), h('p', null, 'Kho chưa có tệp phù hợp.'), h('button', { type: 'button', className: 'ph-lib-mo' }, 'Mở Kho dữ liệu điện tử'))
    : list.length ? h('ul', { className: 'ph-lib-list' }, list.map(function (f) {
      var on = sel[0].indexOf(f.id) >= 0, ly = LIB_LY_DO(f, p.daCo, p.dinhDang);
      return h('li', { key: f.id, className: 'ph-lib-it' + (on ? ' ph-lib-on' : '') + (ly ? ' ph-lib-off' : '') },
        h(T.Checkbox, { 'aria-label': 'Chọn ' + f.ten, checked: on, disabled: !!ly, onChange: function () { bam(f); } }),
        /* 1.67 (người dùng 21/11): bỏ biểu tượng loại tệp ở kho dữ liệu cá nhân */
        h('div', { className: 'ph-lib-tx' }, h('p', { className: 'ph-lib-n' }, f.ten), h('p', null, f.loai + ' · ' + f.kt + ' · ' + f.ngay),
          h('p', null, 'Nguồn: ', h('b', null, f.nguon)), f.vuAn ? h('p', null, 'Vụ án liên quan: ', h('b', null, f.vuAn)) : null,
          ly || f.daKy ? h('p', { className: 'ph-lib-hh' }, ly ? h('span', { className: 'ph-lib-ly' }, ly) : null, f.daKy ? h('span', { className: 'ph-lib-ky' }, h(T.Icon, { name: 'shield' }), 'Đã ký số') : null) : null,
          p.chosen && p.chosen.id === f.id ? h('p', null, 'Đã chọn cho người đại diện này') : null),
        h(T.Button, { variant: 'secondary', size: 'sm', icon: 'eye', className: 'ph-lib-view', 'aria-label': 'Xem ' + f.ten, 'data-pt-go': 'attachment', onClickCapture: function () { window.__ibFile = f.tep; } })); /* v351 */
    })) : h('p', { className: 'ph-lv-empty' }, q[0].trim() ? 'Không có tệp khớp «' + q[0] + '».' : 'Không có tệp phù hợp với bộ lọc.');
  return h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-co-sheet ph-rep-sheet ph-lib-sheet' }, h('div', { className: 'ph-scrim', onClick: p.onClose }),
    h('div', { className: 'tp-dlg tp-dlg-sheet', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'ph-lib-t' },
      h('span', { className: 'ph-grab', 'aria-hidden': 'true' }),
      h('div', { className: 'tp-dlg-head' }, h('h3', { id: 'ph-lib-t' }, 'Chọn tệp từ kho dữ liệu cá nhân'), h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Đóng', onClick: p.onClose }, h(T.Icon, { name: 'x' }))),
      h('p', { className: 'tp-dlg-desc' }, p.moTa || 'Chỉ chọn được tệp PDF, PNG, JPG tối đa 10MB.'),
      h('div', { className: 'tp-dlg-body ph-rep-body', ref: body },
        h('div', { className: 'fx-search' }, Tf('Tìm tệp', { icon: 'search', placeholder: 'Tìm theo tên tài liệu, tên tệp...', value: q[0], onChange: function (e) { q[1](e.target.value); pg[1](1); }, onClear: function () { q[1](''); pg[1](1); } })),
        h('div', { className: 'ph-lib-filt' }, /* v554 (người dùng 23/11): bộ lọc là bảng chọn có ô tìm, như web modal-chon-tu-kho.tsx (Select có "Tất cả", bỏ chọn được) */
          h(KhoLoc, { tatCa: 'Tất cả loại tài liệu', tieuDe: 'Chọn loại tài liệu', items: KHO_LOAI, v: lt[0], onDoi: function (x) { lt[1](x); pg[1](1); } }),
          h(KhoLoc, { tatCa: 'Mọi vụ án gắn kèm', tieuDe: 'Chọn vụ án gắn kèm', items: dsVa, v: va[0], onDoi: function (x) { va[1](x); pg[1](1); } })),
        khoiDs,
        tr[0] === 'loi' || !all.length ? null : h('div', { className: 'ph-lib-pg' }, h('span', null, ((cur - 1) * PER + 1) + '–' + ((cur - 1) * PER + list.length) + ' / ' + all.length),
          h('span', { className: 'ph-lib-pgr' }, h('button', { type: 'button', className: 'tp-icon-btn', disabled: cur <= 1, 'aria-label': 'Trang trước', onClick: function () { go(cur - 1); } }, h(T.Icon, { name: 'chevronLeft' })), cur + ' / ' + pages,
            h('button', { type: 'button', className: 'tp-icon-btn', disabled: cur >= pages, 'aria-label': 'Trang sau', onClick: function () { go(cur + 1); } }, h(T.Icon, { name: 'chevronRight' }))))),
      h('div', { className: 'tp-dlg-foot' }, h(T.Button, { variant: 'tonal', onClick: p.onClose }, 'Hủy'),
        h(T.Button, { disabled: !n, onClick: function () { var ds = KHO.filter(function (f) { return sel[0].indexOf(f.id) >= 0; }); if (p.nhieu && p.onPickNhieu) p.onPickNhieu(ds); else p.onPick(ds[0]); } }, nhan))));
}
/* demo NDKK 1.35 / 1.39 / 1.40 / 1.41: p.sua – sửa người đại diện (phần 1 khóa, mở thẳng phần 2); kiểm tra khi Xác minh / Lưu theo câu chữ web
   (them-nguoi-dai-dien-modal.tsx); tài liệu minh chứng chọn nhiều tệp; p.san – mở sẵn trạng thái (màn trạng thái): { ok, v, loiTep } */
function RepSheet(p) {
  var s = p.sua || null, san = p.san || {};
  var loai = React.useState(s ? s.loai : 'cn'), ok = React.useState(!!s || !!san.ok), v = React.useState(s ? { ten: s.ten, so: s.so, ns: s.ns } : (san.v || {})), dang = React.useState(false);
  var loi1 = React.useState(''), loi2 = React.useState(''), loiTep = React.useState(san.loiTep || ''), loiF = React.useState({});
  var gt = React.useState(s ? s.gtMa || '' : ''), tu = React.useState(s ? s.tu : '20-11-2026'), den = React.useState(s ? s.den || '' : ''), sdt = React.useState(s ? s.sdt || '' : ''), mail = React.useState(s ? s.email || '' : ''), dc = React.useState(s && s.dc ? s.dc : ['', '', '']);
  var files = React.useState(s ? (s.files || []).map(function (f, i) { return Object.assign({ k: i + 1 }, f); }) : []), lib = React.useState(false), seq = React.useRef(s ? (s.files || []).length : 0), bodyRef = React.useRef(null);
  var cn = loai[0] === 'cn';
  function set(k) { return function (e) { var o = Object.assign({}, v[0]); o[k] = k === 'so' && !cn ? e.target.value.replace(/[^0-9-]/g, '').slice(0, 14) : k === 'so' ? e.target.value.replace(/\D/g, '').slice(0, 12) : e.target.value; v[1](o); loi1[1](''); }; }
  function them(ds) { var n = files[0].slice(); ds.forEach(function (f) { seq.current += 1; n.push({ k: seq.current, tep: f.tep, ten: '', loai: '' }); }); files[1](n); loi2[1](''); }
  function pickDevice() { them([KHO[0], KHO[1]]); } /* chọn nhiều tệp một lần (giấy ủy quyền + hợp đồng ủy quyền mẫu) */
  function doiTep(k, o) { files[1](files[0].map(function (f) { return f.k === k ? Object.assign({}, f, o) : f; })); var e = Object.assign({}, loiF[0]); if (o.ten) delete (e[k] || {}).ten; if (o.loai) delete (e[k] || {}).loai; loiF[1](e); }
  function cuon() { setTimeout(function () { var b = bodyRef.current, x = b && b.querySelector('.ph-rep-loi'); if (b && x) b.scrollTo({ top: b.scrollTop + x.getBoundingClientRect().top - b.getBoundingClientRect().top - 80, behavior: 'smooth' }); }, 30); }
  function xacMinh() {
    var o = v[0], so = (o.so || '').trim(), ten = (o.ten || '').trim(), e = '';
    if (cn) { if (!/^\d{12}$/.test(so)) e = 'Số định danh/Số CCCD phải gồm 12 chữ số.'; else if (!ten) e = 'Họ và tên không được để trống.'; else if (!(o.ns || '').trim()) e = 'Ngày sinh không được để trống.'; }
    else { if (!ten) e = 'Tên tổ chức/doanh nghiệp không được để trống.'; else if (!hopLeMst(so)) e = 'Mã số thuế/MSDN phải gồm 10 chữ số, 13 chữ số, hoặc 10 chữ số kèm gạch ngang và 3 chữ số.'; }
    if (!e && (p.tuSo || []).indexOf(so) >= 0) e = cn ? 'Người này chính là đương sự đang khai — không thể tự làm người đại diện pháp lý cho chính mình.' : 'Tổ chức này chính là đương sự đang khai — không thể tự làm người đại diện pháp lý cho chính mình.';
    if (!e && (p.daCo || []).indexOf(so) >= 0) e = cn ? 'Người này đã có trong danh sách người đại diện của đương sự này — không thể thêm lần nữa (dù khác quan hệ đại diện).' : 'Tổ chức này đã có trong danh sách người đại diện của đương sự này — không thể thêm lần nữa (dù khác quan hệ đại diện).';
    if (!e && (p.benKhac || []).indexOf(so) >= 0) e = cn ? 'Người này đã được chỉ định làm người đại diện cho bên còn lại (nguyên đơn/bị đơn) trong đơn — không được đại diện đồng thời cho cả hai bên.' : 'Tổ chức này đã được chỉ định làm người đại diện cho bên còn lại (nguyên đơn/bị đơn) trong đơn — không được đại diện đồng thời cho cả hai bên.'; /* v537 (NDKK 1.39) */
    if (e) { loi1[1](e); return; }
    dang[1](true);
    setTimeout(function () {
      dang[1](false);
      if (so === SO_KHONG_THAY[0]) { loi1[1]('Thông tin không khớp trên dữ liệu dân cư quốc gia. Vui lòng kiểm tra lại.'); return; }
      if (so === SO_KHONG_THAY[1]) { loi1[1]('Không xác minh được tổ chức theo mã số thuế đã nhập. Vui lòng kiểm tra lại.'); return; }
      ok[1](true);
    }, 600);
  }
  function save() {
    var e = '', fe = {};
    if (cn && !gt[0]) e = 'Vui lòng chọn giới tính.';
    else if (!cn && !(dc[0][0] && dc[0][1] && (dc[0][2] || '').trim())) e = 'Vui lòng nhập đầy đủ địa chỉ trụ sở (Tỉnh/Phường + địa chỉ chi tiết).';
    else if (!cn && !sdt[0].trim()) e = 'Vui lòng nhập số điện thoại tổ chức.';
    else if (!(tu[0] || '').trim()) e = 'Vui lòng nhập thời hạn từ.';
    else if (den[0] && ngaySo(den[0]) != null && ngaySo(tu[0]) != null && ngaySo(den[0]) < ngaySo(tu[0])) e = 'Thời hạn đến phải sau thời hạn từ.';
    else if (!files[0].length) e = 'Vui lòng đính kèm ít nhất một tài liệu minh chứng quyền đại diện.';
    else {
      files[0].forEach(function (f) { var x = {}; if (!(f.ten || '').trim()) x.ten = 'Vui lòng nhập tên tài liệu'; if (!f.loai) x.loai = 'Vui lòng chọn loại tài liệu'; if (x.ten || x.loai) fe[f.k] = x; });
      if (Object.keys(fe).length) e = 'Vui lòng nhập tên tài liệu và chọn loại tài liệu cho mọi tệp minh chứng.';
    }
    loiF[1](fe); loi2[1](e);
    if (e) { cuon(); return; }
    var o = v[0], ten = (o.ten || '').trim(), so = (o.so || '').trim(), gtTen = { nam: 'Nam', nu: 'Nữ', khac: 'Khác' }[gt[0]] || '';
    p.onSave({ loai: loai[0], ten: ten, so: so, ns: o.ns || '', gt: gtTen, gtMa: gt[0], tu: tu[0], den: den[0], sdt: sdt[0], email: mail[0], dc: dc[0], truSo: dc[0][2] ? [dc[0][2], dc[0][1], dc[0][0]].filter(Boolean).join(', ') : '', qh: s ? s.qh : '',
      files: files[0].map(function (f) { return { tep: f.tep, ten: f.ten, loai: f.loai }; }) });
  }
  var o = v[0];
  var Thoi = h(F, null,
    TwoE(Tf('Thời hạn từ', Dt({ required: true, value: tu[0], onChange: function (e) { tu[1](e.target.value); } })), Tf('Thời hạn đến', Dt({ value: den[0], onChange: function (e) { den[1](e.target.value); } }))),
    P('Để trống thời hạn đến nếu ủy quyền tới thời gian kết thúc vụ án', 'ph-muted fx-help'),
    h('div', { className: 'ph-gender-f' }, Lbl('Tài liệu minh chứng quyền đại diện', 1),
      files[0].map(function (f) { return h(DocCard, { key: f.k, doc: f, reqName: true, loi: loiF[0][f.k], onDoi: function (x) { doiTep(f.k, x); }, onDel: function () { files[1](files[0].filter(function (y) { return y.k !== f.k; })); }, onDevice: function () { doiTep(f.k, { tep: KHO[1].tep }); }, onLib: function () { lib[1](true); } }); }),
      /* phương án C dạng 2 ô vuông 1 hàng (chọn 02/11/2026); 1.40: luôn giữ 2 ô tải để thêm tiếp tệp */
      h('div', { className: 'ph-up2 ph-up3' },
        h('button', { type: 'button', className: 'ph-up2-it', onClick: pickDevice }, h('span', { className: 'ph-up3-ic' }, h(T.Icon, { name: 'upload' })), h('b', null, 'Tải lên từ thiết bị')),
        h('button', { type: 'button', className: 'ph-up2-it', onClick: function () { lib[1](true); } }, h('span', { className: 'ph-up3-ic' }, h(T.Icon, { name: 'folder' })), h('b', null, 'Từ kho dữ liệu'))),
      P('Định dạng PDF, PNG, JPG, Tối đa 10MB/tệp', 'ph-muted fx-help ph-up2-hint'),
      loiTep[0] ? h('p', { className: 'q2-err', role: 'alert' }, h(T.Icon, { name: 'alert' }), loiTep[0]) : null));
  var step1 = ok[0]
    ? h('div', { className: 'ph-rep-ok-card' }, h('div', { className: 'ph-rep-ok-top' }, h('p', { className: 'ph-rep-n' }, o.ten), h(T.StatusBadge, { tone: 'success' }, 'Đã xác minh')),
        cn ? h(F, null, h('p', null, 'Số định danh/Số CCCD: ' + o.so), h('p', null, 'Ngày, tháng, năm sinh: ' + o.ns)) : h('p', null, 'Mã số thuế/MSDN: ' + o.so))
    : h(F, null, cn ? h(F, null,
        h(T.TextField, { label: 'Số định danh/Số CCCD', required: true, inputMode: 'numeric', placeholder: '12 số', value: o.so || '', onChange: set('so') }),
        TwoE(Tf('Họ và tên', { required: true, placeholder: 'Nguyễn Văn A', value: o.ten || '', onChange: set('ten') }), Tf('Ngày, tháng, năm sinh', Dt({ required: true, value: o.ns || '', onChange: set('ns') }))))
      : TwoE(Tf('Tên tổ chức/doanh nghiệp', { required: true, placeholder: 'Nhập tên tổ chức/doanh nghiệp', value: o.ten || '', onChange: set('ten') }), h(T.TextField, { label: 'Mã số thuế/MSDN', required: true, inputMode: 'text', placeholder: '10 số, 13 số, hoặc 10 số-3 số', value: o.so || '', onChange: set('so') })),
      loi1[0] ? h('p', { className: 'q2-err ph-rep-loi', role: 'alert' }, h(T.Icon, { name: 'alert' }), loi1[0]) : null);
  var step2 = !ok[0] ? null : cn
    ? h(F, null, h('h4', { className: 'ph-rep-h' }, '2. Bổ sung thông tin đại diện'),
        h('div', { className: 'ph-gender-f' }, Lbl('Giới tính', 1), h(Gender, { v: gt[0] || null, onChange: function (g) { gt[1](g); loi2[1](''); } })), Thoi)
    : h(F, null, h('h4', { className: 'ph-rep-h' }, '2. Bổ sung thông tin đại diện'),
        AddrG('Địa chỉ trụ sở', true, 'short', dc[0], false, { chon: true, onDoi: function (a) { dc[1](a); } }),
        TwoE(Tf('Số điện thoại tổ chức', { required: true, type: 'tel', placeholder: 'Nhập số điện thoại', value: sdt[0], onChange: function (e) { sdt[1](e.target.value); } }), Tf('Địa chỉ thư điện tử', { type: 'email', placeholder: 'email@vidu.vn', value: mail[0], onChange: function (e) { mail[1](e.target.value); } })),
        Thoi);
  return h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-co-sheet ph-rep-sheet' }, h('div', { className: 'ph-scrim', onClick: p.onClose }),
    h('div', { className: 'tp-dlg tp-dlg-sheet', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'ph-rep-t' },
      h('span', { className: 'ph-grab', 'aria-hidden': 'true' }),
      h('div', { className: 'tp-dlg-head' }, h('h3', { id: 'ph-rep-t' }, s ? 'Sửa người đại diện' : 'Thêm người đại diện'), h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Đóng', onClick: p.onClose }, h(T.Icon, { name: 'x' }))),
      h('div', { className: 'tp-dlg-body ph-rep-body', ref: bodyRef },
        h('div', { className: 'ph-gender-f' }, Lbl('Đối tượng', 1), h('div', { className: 'ph-gender', role: 'radiogroup', 'aria-label': 'Đối tượng' }, [['cn', 'Cá nhân'], ['tc', 'Tổ chức']].map(function (x) {
          return h(Radio, { key: x[0], name: 'ph-rep-loai', label: x[1], checked: loai[0] === x[0], disabled: ok[0] && loai[0] !== x[0], onChange: function () { loai[1](x[0]); v[1]({}); loi1[1](''); } });
        }))),
        h('h4', { className: 'ph-rep-h' }, cn ? '1. Nhập và xác minh thông tin công dân' : '1. Nhập và xác minh thông tin tổ chức'),
        h(F, { key: loai[0] }, step1), step2,
        loi2[0] ? h('p', { className: 'q2-err ph-rep-loi', role: 'alert' }, h(T.Icon, { name: 'alert' }), loi2[0]) : null),
      h('div', { className: 'tp-dlg-foot' }, h(T.Button, { variant: 'tonal', onClick: p.onClose }, 'Hủy'),
        ok[0] ? h(T.Button, { className: 'pt-chk', onClick: save }, 'Lưu') : h(T.Button, { className: 'pt-chk', loading: dang[0], onClick: dang[0] ? undefined : xacMinh }, dang[0] ? 'Đang xác minh…' : 'Xác minh'))),
    lib[0] ? h(LibSheet, { nhieu: true, onClose: function () { lib[1](false); }, onPickNhieu: function (ds) { them(ds); lib[1](false); }, onPick: function (f) { them([f]); lib[1](false); } }) : null);
}
function TwoE(a, b) { return h('div', { className: 'fx-2 fx-2-end' }, a, b); }
/* thứ tự trường đúng như web; ghép 2 cột theo yêu cầu 02/11/2026: Họ tên + SĐT, CCCD + Ngày cấp, Ngày sinh + Quốc tịch, Tỉnh + Phường/Xã của mỗi loại địa chỉ */
/* dữ liệu mẫu người khởi kiện; người đồng khởi kiện dùng CO_MAU (dữ liệu giả lập tra cứu theo Số CCCD/MST) – 02/11/2026: thông tin, thứ tự, trạng thái mở/khóa trường y như người khởi kiện */
var ME_MAU = { ten: 'Hoàng Dương', sdt: '0912345678', so: '001090012345', ns: '12-08-1990', qt: 'Việt Nam', tinh: 'Thành phố Hà Nội', xa: 'Phường Từ Liêm', ct: 'Số 8 Phạm Hùng', email: 'nguyen.minh.an@example.com', nc: '20-05-2021', noi: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội', gt: 'nam' };
var CO_MAU = [
  { ten: 'Trần Thị C', sdt: '0987654321', so: '001190000003', ns: '05-03-1992', qt: 'Việt Nam', tinh: 'Thành phố Hà Nội', xa: 'Phường Cầu Giấy', ct: 'Số 12 Trần Thái Tông', email: 'tran.thi.c@example.com', nc: '15-07-2021', noi: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội', gt: 'nu' },
  { ten: 'Lê Văn D', sdt: '0903111222', so: '001085000004', ns: '21-11-1985', qt: 'Việt Nam', tinh: 'Thành phố Hà Nội', xa: 'Phường Hoàn Kiếm', ct: 'Số 3 Hàng Bài', email: 'le.van.d@example.com', nc: '02-02-2022', noi: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội', gt: 'nam' }];
/* 03/11/2026: Cá nhân | Tổ chức đổi được bộ trường; Tổ chức theo web (plDescs nhánh tổ chức): Tên tổ chức / doanh nghiệp*, Mã số thuế / MSDN*, Địa chỉ trụ sở* (khóa – lấy từ tài khoản / tra cứu MST) + "Có người đại diện hợp pháp" (người đại diện theo pháp luật chọn từ danh mục – phương án C, và theo ủy quyền) */
function PersonForm(ro, pre, dat, o) { return h(PersonBody, Object.assign({ ro: ro, pre: pre, dat: dat }, o || {})); }
var ORG_MAU = { ten: 'Công ty ABC', so: '0101234567', tinh: 'Thành phố Hà Nội', xa: 'Phường Láng', ct: 'Số 25 Láng Hạ' }; /* v333: = tổ chức đăng nhập (ACC_TC) */
var ORG_CO_MAU = { ten: 'Công ty Cổ phần Xây dựng Minh Long', so: '0109876543', tinh: 'Thành phố Hà Nội', xa: 'Phường Đống Đa', ct: 'Số 102 Tây Sơn' };
/* danh mục người đại diện theo pháp luật còn hiệu lực của tổ chức – dữ liệu mẫu */
var NDPL = [{ id: 'a', ten: 'Trần Văn Minh', so: '001080000011', cv: 'Giám đốc' }, { id: 'b', ten: 'Lê Thị Hương', so: '001085000022', cv: 'Phó Giám đốc' }, { id: 'c', ten: 'Phạm Quốc Bảo', so: '001090000033', cv: 'Kế toán trưởng' }];
/* Người đại diện theo pháp luật (phương án C, chọn 03/11/2026; chỉnh 03/11/2026): thẻ người đã chọn (tên, CCCD · chức vụ, nút xóa) + nút "+ Thêm người đại diện theo pháp luật" → bảng từ đáy chọn NHIỀU người (chỉ người chưa chọn; chạm dòng để đánh dấu/bỏ, dấu tích bên phải), đáy Hủy | "Thêm (n)". Không bắt buộc */
/* demo NDKK 1.32 / 1.33: p.ds – danh mục người đại diện còn hiệu lực ([] = tổ chức chưa có ai); ô "Tìm kiếm…" khi trên 10 người; "Bỏ chọn tất cả"; p.ghiChu – ghi chú người đã lưu trong đơn nháp cũ */
function PhapLuatPick(p) {
  p = p || {};
  var DS = p.ds || NDPL;
  var sel = React.useState([]), o = React.useState(false), tmp = React.useState([]), q = React.useState(''), anchor = React.useRef(null), host = useHost(anchor);
  var con = DS.filter(function (x) { return sel[0].indexOf(x.id) < 0; }), loc = con.filter(function (x) { return khop(q[0], x.ten + ' ' + x.so + ' ' + x.cv); });
  function tg(id) { tmp[1](tmp[0].indexOf(id) >= 0 ? tmp[0].filter(function (y) { return y !== id; }) : tmp[0].concat([id])); }
  return h('div', { className: 'nd-grp' }, h('span', { ref: anchor, hidden: true }), /* 1.32: bỏ nhãn lặp – khối Người đại diện theo pháp luật đã có tiêu đề */
    /* 1.33 (người dùng 20/11): bỏ ghi chú người đại diện đã lưu trong nháp cũ */
    !DS.length ? DsRong('Tổ chức chưa có người đại diện hợp lệ nào') : null,
    sel[0].length ? h('div', { className: 'nd-dem' }, h('p', { className: 'dm-meta' }, sel[0].length + ' người đại diện')) : null, /* 1.32 (người dùng 20/11): bỏ "Bỏ chọn tất cả" */
    sel[0].length ? h('ul', { className: 'nd-chosen' }, sel[0].map(function (id) { var x = DS.filter(function (y) { return y.id === id; })[0];
      return h('li', { key: id }, h('span', { className: 'nd-tx' }, h('b', null, x.ten), h('small', null, 'CCCD ' + x.so + ' · ' + x.cv)),
        h('button', { type: 'button', className: 'dm-del', 'aria-label': 'Bỏ chọn ' + x.ten, onClick: function () { sel[1](sel[0].filter(function (y) { return y !== id; })); } }, h(T.Icon, { name: 'trash' }))); })) : null,
    con.length ? h(T.Button, { variant: 'tint', icon: 'plus', className: 'ph-co-add', onClick: function () { tmp[1]([]); q[1](''); o[1](true); } }, 'Thêm người đại diện theo pháp luật') : null,
    o[0] && host ? h(LvSheet, { host: host, title: 'Thêm người đại diện theo pháp luật', onClose: function () { o[1](false); },
      top: con.length > 10 ? h('div', { className: 'fx-search' }, Tf('Tìm', { icon: 'search', placeholder: 'Nhập để tìm', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })) : null,
      foot: h(F, null, h(T.Button, { variant: 'secondary', onClick: function () { o[1](false); } }, 'Hủy'), h(T.Button, { disabled: !tmp[0].length, onClick: function () { sel[1](sel[0].concat(tmp[0])); o[1](false); } }, 'Thêm' + (tmp[0].length ? ' (' + tmp[0].length + ')' : ''))) },
      h('p', { className: 'dm-meta nd-hint' }, 'Chọn một hoặc nhiều người trong danh sách người đại diện còn hiệu lực của tổ chức.'),
      loc.length ? h('ul', { className: 'ph-lvr', role: 'listbox', 'aria-multiselectable': 'true', 'aria-label': 'Người đại diện theo pháp luật' }, loc.map(function (x) { var on = tmp[0].indexOf(x.id) >= 0;
        return h('li', { key: x.id }, h('button', { type: 'button', role: 'option', 'aria-selected': on, className: 'ph-lvr-it' + (on ? ' ph-lvr-on' : ''), onClick: function () { tg(x.id); } },
          h('span', { className: 'ph-lvr-tx' }, h('span', { className: 'ph-lvr-t' }, x.ten), h('span', { className: 'ph-lvr-d' }, 'CCCD ' + x.so + ' · ' + x.cv)),
          h('span', { className: 'ph-lvr-ck', 'aria-hidden': 'true' }, on ? h(T.Icon, { name: 'check' }) : null))); }))
        : h('p', { className: 'ph-lv-empty' }, 'Không có mục khớp «' + q[0] + '».')) : null);
}
function PersonBody(pp) {
  var ro = pp.ro, pre = pp.pre, dat = pp.dat;
  var d = ro ? (dat || ME_MAU) : null, co = !!dat, ps = ndPhaSan();
  var kind = React.useState((pre && pre.loai) || (ro && !co && (pp.tc || laTC()) ? 'tc' : 'cn')); /* v333 */
  /* demo NDKK 1.24: thẻ người đồng khởi kiện không đổi được Cá nhân / Tổ chức (loại đối tượng chốt ở bảng Thêm, nhãn hiện trên đầu thẻ) */
  var seg = ro ? null : h('div', { className: 'ph-seg-gon' }, h(T.SegmentedControl, { label: 'Loại người đồng khởi kiện', value: kind[0], onChange: kind[1], options: [{ value: 'cn', label: 'Cá nhân' }, { value: 'tc', label: 'Tổ chức' }] }));
  if (kind[0] === 'tc') {
    var o = co ? Object.assign({}, ORG_CO_MAU, pre && pre.so ? { so: pre.so } : {}) : ORG_MAU, khoa = !!ro;
    return h(F, null, seg, h(F, { key: 'tc' },
      khoa ? Ro(ps ? 'Tên tổ chức/doanh nghiệp/cơ quan' : 'Tên tổ chức / doanh nghiệp', o.ten, { required: true }) : Tf('Tên tổ chức / doanh nghiệp', { required: true, placeholder: 'Tên tổ chức / doanh nghiệp' }),
      khoa ? Ro(ps ? 'Mã số thuế/MSDN' : 'Mã số thuế / MSDN', o.so, { required: true }) : Tf('Mã số thuế / MSDN', { required: true, placeholder: '10 số, 13 số', defaultValue: pre && pre.so }),
      AddrG('Địa chỉ trụ sở', true, 'short', khoa ? [o.tinh, o.xa, o.ct] : null, khoa),
      ps ? h(PhanLoaiTc, { mau: pp.psMau }) : null, /* 1.30 */
      h('hr', { className: 'ph-hr' }),
      h(Proxy, { quyen: { pl: true, uq: true }, phapLuat: h(PhapLuatPick, { ds: co ? null : pp.ndpl, ghiChu: co ? null : pp.ghiChu }), tuSo: [o.so], on: !co && !!pp.dd, init: !co && pp.dd ? pp.dd.init : null })));
  }
  var me = d ? [d.ten, d.sdt, d.so, d.ns, d.qt, d.tinh, d.xa, pp.thieu && !co ? '' : d.ct] : null; /* 1.20: màn trạng thái tài khoản thiếu địa chỉ thường trú */
  function T1(l, i, o) { return ro ? Ro(l, me[i], o) : Tf(l, o); }
  function S1(l, i, o) { return ro ? RoSel(l, me[i], o) : Sf(l, Object.assign({ placeholder: 'Chọn' }, o || {})); }
  return h(F, null, seg,
    T1('Họ và tên', 0, { required: true }), T1('Số điện thoại', 1, { required: true, type: 'tel' }), /* v459: tách 2 dòng */
    Tf('Địa chỉ thư điện tử', { type: 'email', defaultValue: ro ? d.email : undefined }),
    TwoE(T1('Số CCCD', 2, ro ? { required: true } : { required: true, defaultValue: pre && pre.so }), Tf('Ngày cấp', Dt({ defaultValue: ro ? d.nc : undefined }))),
    Tf('Nơi cấp', { defaultValue: ro ? d.noi : undefined }),
    TwoE(T1('Ngày, tháng, năm sinh', 3, ro ? { required: true, icon: 'calendar' } : Dt({ required: true })), S1('Quốc tịch', 4, { required: true })),
    h('div', { className: 'ph-gender-f' }, Lbl('Giới tính', 1), h(Gender, { ro: ro, v: d && d.gt })),
    AddrG('Địa chỉ thường trú', true, 'short', ro ? [me[5], me[6], me[7]] : null, ro),
    AddrG('Địa chỉ hiện tại', true, 'short', ro ? [d.tinh, d.xa] : null, false, { chon: true }),
    AddrG('Địa chỉ tạm trú', false, 'short', null, false, { chon: true }),
    Tf('Nghề nghiệp', { placeholder: '(nếu có)' }),
    Tf('Nơi làm việc', { placeholder: '(nếu có)' }),
    ps ? h(ChonDs, { label: 'Đặc điểm của người yêu cầu', req: true, ds: DAC_DIEM_PS, v: pp.psMau && pp.psMau.dd }) : null, /* 1.29 */
    h('hr', { className: 'ph-hr' }),
    h(Proxy, { quyen: { pl: false, uq: true }, tuSo: [d ? d.so : ''], on: !co && !!pp.dd, init: !co && pp.dd ? pp.dd.init : null, moSan: !co && pp.dd ? pp.dd.moSan : null }));
}
/* bảng từ đáy "Thêm người khởi kiện" (theo web, 02/11/2026): chọn Đối tượng (radio Cá nhân/Tổ chức) → nhập Số CCCD (12 số) hoặc Mã số thuế; Đồng ý thêm người đồng khởi kiện vào danh sách. Vẽ vào khung điện thoại (.ph) bằng portal; nền mờ riêng để không bị khung prototype hiểu là "quay lại" */
/* demo NDKK 1.25 / 1.26: tiêu đề theo nhãn danh sách, dòng hướng dẫn, Đối tượng chỉ hiện khi nhóm cho cả Cá nhân và Tổ chức, MST tự chèn "-",
   kiểm tra định dạng / trùng danh sách / không tìm thấy tài khoản (web them-dong-nd-modal.tsx), đang tìm: "Đang tìm…" */
function CoSheet(p) {
  var ks = (p.kinds || ['cn', 'tc']).filter(function (k) { return k === 'cn' || k === 'tc'; });
  var san = p.san || null; /* v579: màn mất kết nối – mở sẵn số đã tra, lỗi như web (them-dong-nd-modal.tsx: lỗi không phải 404 → layThongBaoLoi(e, câu Không tìm thấy…)) */
  var khongThay = function (laCn) { return laCn ? 'Không tìm thấy người dùng với số CCCD trên. Đồng ' + p.tuNhan + ' phải có tài khoản trên Cổng dịch vụ tư pháp' : 'Không tìm thấy tổ chức với mã số thuế trên. Tổ chức đồng ' + p.tuNhan + ' phải có tài khoản trên Cổng dịch vụ tư pháp'; };
  var loai = React.useState(ks.length === 1 ? ks[0] : 'cn'), so = React.useState(san ? san.so : ''), err = React.useState(san ? khongThay(true) : null), tim = React.useState(false);
  var cn = loai[0] === 'cn';
  function ok() {
    var s = so[0].trim();
    if (!s || !(cn ? /^\d{12}$/.test(s) : hopLeMst(s))) { err[1](cn ? 'Số CCCD phải gồm 12 chữ số.' : 'Mã số thuế phải gồm 10 chữ số, 13 chữ số, hoặc 10 số đầu - 3 số cuối.'); return; }
    if ((p.daCo || []).indexOf(s) >= 0) { err[1](cn ? 'Người này đã có trong danh sách.' : 'Tổ chức này đã có trong danh sách.'); return; }
    err[1](null); tim[1](true);
    setTimeout(function () {
      tim[1](false);
      if (san && san.matMang) { err[1](khongThay(cn)); return; } /* v579: còn mất kết nối → vẫn báo như web */
      if (SO_KHONG_THAY.indexOf(s) >= 0) { err[1](cn ? 'Không tìm thấy người dùng với số CCCD trên. Đồng ' + p.tuNhan + ' phải có tài khoản trên Cổng dịch vụ tư pháp' : 'Không tìm thấy tổ chức với mã số thuế trên. Tổ chức đồng ' + p.tuNhan + ' phải có tài khoản trên Cổng dịch vụ tư pháp'); return; }
      p.onOk({ loai: loai[0], so: s });
    }, 700);
  }
  return h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-co-sheet' }, h('div', { className: 'ph-scrim', onClick: p.onClose }),
    h('div', { className: 'tp-dlg tp-dlg-sheet', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'ph-co-t' },
      h('div', { className: 'tp-dlg-head' }, h('h3', { id: 'ph-co-t' }, p.tieuDe || 'Thêm người khởi kiện'), h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Đóng', onClick: p.onClose }, h(T.Icon, { name: 'x' }))),
      /* 1.25 (người dùng 20/11): bỏ dòng hướng dẫn của web */
      h('div', { className: 'tp-dlg-body' },
        ks.length > 1 ? h('div', { className: 'ph-gender-f' }, Lbl('Đối tượng', 1), h('div', { className: 'ph-gender', role: 'radiogroup', 'aria-label': 'Đối tượng' }, [['cn', 'Cá nhân'], ['tc', 'Tổ chức']].map(function (o) { return h(Radio, { key: o[0], name: 'ph-co-loai', label: o[1], checked: loai[0] === o[0], onChange: function () { loai[1](o[0]); so[1](''); err[1](null); } }); }))) : null,
        h(T.TextField, { key: loai[0], label: cn ? 'Số CCCD' : 'Mã số thuế', required: true, inputMode: cn ? 'numeric' : 'text', placeholder: cn ? '12 số' : '10 số hoặc 10 số đầu - 3 số cuối', value: so[0], error: err[0] || undefined,
          onChange: function (e) { so[1](cn ? e.target.value.replace(/\D/g, '').slice(0, 12) : dinhDangMst(e.target.value)); err[1](null); } })),
      h('div', { className: 'tp-dlg-foot' }, h(T.Button, { variant: 'tonal', onClick: p.onClose }, 'Hủy'), h(T.Button, { icon: tim[0] ? undefined : 'search', loading: tim[0], className: 'pt-chk', onClick: tim[0] ? undefined : ok }, tim[0] ? 'Đang tìm…' : 'Đồng ý'))));
}
/* demo NDKK 1.21 / 1.22 / 1.24 / 1.25: p.chinh – danh sách người khởi kiện (mục 1 là tài khoản đăng nhập); p.nhan – từ chỉ người trong danh sách; p.tuNhan – nhãn bước 2 viết thường (câu lỗi "Đồng …");
   p.kinds – đối tượng được thêm; p.tieuDeThem / p.nutThem – chữ bảng và nút Thêm; p.tc – người khởi kiện là tổ chức; p.o – tùy chọn form người khởi kiện; thanh công cụ tìm / đếm / thu gọn tất cả; nhãn loại trên đầu thẻ */
function CoList(p) {
  p = p || {};
  var nhan = p.nhan || 'người khởi kiện';
  var st = React.useState(p.init || []), seq = React.useRef(p.init ? p.init.length : 0), open = React.useState(!!p.mo), cf = React.useState(null), q = React.useState(''), gon = React.useState(false), ver = React.useState(0), anchor = React.useRef(null), host = useHost(anchor);
  function add(v) { seq.current += 1; st[1](st[0].concat([{ k: seq.current, v: v, isNew: true }])); open[1](false); q[1](''); }
  var chinhTc = !!(p.tc || laTC()), chinh = chinhTc ? ORG_MAU : ME_MAU;
  var rows = st[0].map(function (x, i) { var dc = Object.assign({}, x.v.loai === 'tc' ? ORG_CO_MAU : CO_MAU[(x.k - 1) % CO_MAU.length]); if (x.v.so) dc.so = x.v.so; return { x: x, i: i, d: dc }; });
  var tong = rows.length + (p.chinh ? 1 : 0), hienChinh = p.chinh && khop(q[0], chinh.ten + ' ' + chinh.so), hien = rows.filter(function (r) { return khop(q[0], r.d.ten + ' ' + r.d.so); });
  var daCo = [chinh.so].concat(rows.map(function (r) { return r.d.so; }));
  var nutThem = ThemNut(p.nutThem || (p.chinh ? 'Thêm ' + nhan : 'Thêm đồng khởi kiện'), function () { open[1](true); });
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    tong ? h(DsCongCu, { ph: 'Tìm theo tên, CCCD hoặc mã số thuế…', q: q[0], onQ: q[1], dem: tong + ' ' + nhan, gon: gon[0], onGon: function () { gon[1](!gon[0]); ver[1](ver[0] + 1); }, them: nutThem }) : null,
    DsThem(tong, nutThem),
    /* 03/11/2026 (chinh): thẻ "Người khởi kiện 1" là người đăng nhập, mở sẵn, không xóa; người thêm qua bảng tra CCCD/MST là "Người khởi kiện 2, 3…" */
    hienChinh ? h(Sum, { key: 'chinh', open: true, cuon: false, ver: ver[0], mo: !gon[0], lbl: hoaDau(nhan) + (rows.length ? ' 1' : ''), ten: hoaDau(nhan), tag: chinhTc ? 'Tổ chức' : 'Cá nhân', the: function () { return { lbl: hoaDau(nhan) + (rows.length ? ' 1' : ''), no: rows.length ? 1 : null, ten: chinh.ten, so: chinh.so }; } }, PersonForm(true, chinhTc ? { loai: 'tc' } : null, null, p.o)) : null,
    hien.map(function (r) {
      var x = r.x, kk = x.v.loai === 'tc' ? 'Tổ chức' : 'Cá nhân';
      if (p.chinh) { var lb = hoaDau(nhan) + ' ' + (r.i + 2); return h(Sum, { key: x.k, open: x.isNew, ver: ver[0], mo: !gon[0], lbl: lb, ten: lb, tag: kk, the: function () { return { lbl: lb, no: r.i + 2, ten: r.d.ten, so: r.d.so }; }, onDel: function () { cf[1]({ k: x.k, ten: lb }); } }, PersonForm(true, x.v, r.d)); }
      return h(Sum, { key: x.k, open: x.isNew, ver: ver[0], mo: !gon[0], no: rows.length > 1 ? r.i + 1 : null, the: function () { return { lbl: hoaDau(nhan) + (rows.length > 1 ? ' ' + (r.i + 1) : ''), no: rows.length > 1 ? r.i + 1 : null, ten: r.d.ten, so: r.d.so }; }, ten: r.d.ten, sub: (x.v.loai === 'tc' ? 'Mã số thuế: ' : 'Số CCCD: ') + r.d.so, tag: kk, onDel: function () { cf[1]({ k: x.k, ten: r.d.ten }); } }, PersonForm(true, x.v, r.d));
    }),
    tong && !hienChinh && !hien.length ? DsRong('Không có ' + nhan + ' khớp «' + q[0] + '».') : null,
    open[0] && host ? ReactDOM.createPortal(h(CoSheet, { san: p.coSan, tieuDe: p.tieuDeThem || 'Thêm ' + nhan, kinds: p.kinds, daCo: daCo, tuNhan: p.tuNhan || nhan, onClose: function () { open[1](false); }, onOk: add }), host) : null,
    cf[0] && host ? ReactDOM.createPortal(h(ConfirmDel, { title: 'Xóa ' + nhan + '?', desc: cf[0].ten + ' sẽ bị xóa khỏi danh sách ' + nhan,
      onNo: function () { cf[1](null); }, onYes: function () { st[1](st[0].filter(function (y) { return y.k !== cf[0].k; })); cf[1](null); } }), host) : null);
}
/* demo NDKK 1.19 / 1.20 / 1.21: Bước 2 theo cấu hình nộp đơn của loại việc – nhiều người hay 1 form, có nhóm đồng hay không, đối tượng được phép;
   loại tài khoản không được nộp loại việc → thẻ chặn thay toàn bộ form, Tiếp theo báo lỗi */
function Sub2(p) {
  p = p || {};
  var cfg = ndCfg(), ten = ndTen(), tc = p.tc != null ? !!p.tc : laTC(), k2 = cfg ? cfg.d2 : ['cn', 'tc'], o = { ro: p.ro, luuLoi: p.luuLoi };
  /* v537 (NDKK 1.14): bỏ thẻ chặn Bước 2 – loại việc không dành cho loại tài khoản đã ẩn ở Bước 1 */
  var nhieu = cfg ? cfg.n2 : false, dong = cfg ? cfg.dong : true, nhan = thuongDau(ten[0]);
  var fo = { tc: tc, thieu: p.thieu, ndpl: p.ndpl, ghiChu: p.ghiChu, dd: p.dd, psMau: p.psMau };
  return Submit(2, h(F, null,
    h(BannerThieu, { tc: tc }), p.thieu ? h(TuKt, { b: 2 }) : null,
    nhieu ? FCard('Danh sách ' + nhan, h(CoList, { chinh: true, tc: tc, nhan: nhan, tuNhan: nhan, kinds: k2, o: fo, init: p.chinhInit }), true)
      : FCard('Thông tin ' + nhan, PersonForm(true, tc ? { loai: 'tc' } : null, null, fo), true),
    dong ? FCard('Danh sách ' + cumDong(ten[0]), h(CoList, { nhan: 'người ' + cumDong(ten[0]), tuNhan: nhan, kinds: cfg ? cfg.dd : ['cn', 'tc'], tieuDeThem: 'Thêm ' + cumDong(ten[0]), nutThem: 'Thêm ' + cumDong(ten[0]), init: p.dongInit, mo: p.dongMo, coSan: p.dongSan }), true) : null), null, null, o);
}
/* ===== Bước 3–7 làm lại theo web /nop-don-khoi-kien (steps/step-3…7.tsx, 02/11/2026) – áp quy tắc đã chốt ở bước 1, 2 ===== */
var KIND_TEN = { cn: 'Cá nhân', tc: 'Tổ chức' };
function KindSeg(label, v, set) { return h('div', { className: 'ph-seg-gon' }, h(T.SegmentedControl, { label: label, value: v, onChange: set, options: [{ value: 'cn', label: 'Cá nhân' }, { value: 'tc', label: 'Tổ chức' }] })); }
/* danh sách thẻ tóm tắt dùng chung bước 3: dòng đếm "n …", thẻ thu gọn (03/11/2026: chỉ nhãn vai trò + STT, ví dụ "Người bị kiện 1"; xóa có popup xác nhận), thêm mới → thẻ trống mở sẵn và cuộn tới (chọn 02/11/2026) */
/* demo NDKK 1.45 / 1.46: thanh công cụ (ô tìm, số đếm, Thu gọn / Mở rộng tất cả), nhãn loại trên đầu thẻ, câu "Không có … khớp «…»."; p.ph – chữ gợi ý ô tìm, p.rong – danh từ trong câu không khớp */
function PartyList(p) {
  var st = React.useState(p.init.map(function (v, i) { return { k: i + 1, v: v, isNew: !!v.moi }; })), seq = React.useRef(p.init.length), cf = React.useState(null), q = React.useState(''), gon = React.useState(false), ver = React.useState(0), ten = React.useRef({}), loai = React.useState({}), anchor = React.useRef(null), host = useHost(anchor);
  function add() { seq.current += 1; st[1](st[0].concat([{ k: seq.current, v: {}, isNew: true }])); q[1](''); }
  var hien = st[0].filter(function (x) { return khop(q[0], (ten.current[x.k] != null ? ten.current[x.k] : x.v.ten || '') + ' ' + (x.v.gt || '') + ' ' + (x.v.tim || '')); });
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    st[0].length ? h(DsCongCu, { ph: p.ph, q: q[0], onQ: q[1], dem: st[0].length + ' ' + p.dem, gon: gon[0], onGon: function () { gon[1](!gon[0]); ver[1](ver[0] + 1); }, them: ThemNut(p.them, add) }) : null,
    DsThem(st[0].length, ThemNut(p.them, add)),
    hien.map(function (x) {
      var i = st[0].indexOf(x), stt = st[0].length > 1 ? ' ' + (i + 1) : '', nhan = x.v.ten || p.goi + stt; /* v386 */
      var xoa = p.giuMot && st[0].length < 2 ? null : function () { cf[1]({ k: x.k, ten: nhan }); };
      var kk = p.tag ? p.tag(loai[0][x.k] || x.v.loai) : null;
      return h(Sum, { key: x.k, open: x.isNew || !!x.v.mo, cuon: !!x.isNew, ver: ver[0], mo: !gon[0], lbl: p.goi + stt, ten: nhan, tag: kk, onDel: xoa, the: function () { var tn = ten.current[x.k] != null ? ten.current[x.k] : x.v.ten || ''; return { lbl: p.goi + stt, no: st[0].length > 1 ? i + 1 : null, ten: tn.trim(), so: x.v.gt || '' }; } },
        p.form(x.v, { onTen: function (t) { ten.current[x.k] = t; }, onKind: function (k) { if (loai[0][x.k] !== k) { var o = Object.assign({}, loai[0]); o[x.k] = k; loai[1](o); } } }));
    }),
    st[0].length && !hien.length ? DsRong('Không có ' + p.rong + ' khớp «' + q[0] + '».') : null,
    cf[0] && host ? ReactDOM.createPortal(h(ConfirmDel, { title: 'Xóa ' + p.tu + '?', desc: cf[0].ten + ' sẽ bị xóa khỏi danh sách ' + p.tu,
      onNo: function () { cf[1](null); }, onYes: function () { st[1](st[0].filter(function (y) { return y.k !== cf[0].k; })); cf[1](null); } }), host) : null);
}
/* Số giấy tờ có chọn loại (phương án C, chọn 02/11/2026; theo web loai-giay-to.ts): nút tiền tố "CCCD ▾" ở đầu ô số, chạm mở bảng từ đáy "Chọn loại giấy tờ" (radio, chọn xong tự đóng); CCCD 12 số / CMND 9 số / Hộ chiếu chữ và số tối đa 50; mặc định CCCD; đổi loại thì xóa số đã nhập */
var LOAI_GT = [{ v: 'CCCD', t: 'CCCD', ph: '12 số', max: 12 }, { v: 'CMND', t: 'CMND', ph: '9 số', max: 9 }, { v: 'HOCHIEU', t: 'Hộ chiếu', ph: 'Số hộ chiếu', max: 50 }];
/* v325 (12/11/2026, chọn T1): chặn trùng đương sự (web lw/uw/gw) – ở Bước 3, số giấy tờ trùng người khởi kiện / người đồng khởi kiện (Bước 2) hoặc trùng đương sự khác ở Bước 3
   → ô viền đỏ + dòng lỗi có biểu tượng; "Tiếp theo" không sang Bước 4 mà cuộn tới ô lỗi. Đủ độ dài số (CCCD 12 / CMND 9) mới kiểm tra. */
var GT3 = {}, GT3_NGHE = [];
function gt3Bao() { GT3_NGHE.forEach(function (f) { f(); }); }
function gt3Nghe() { var t = React.useState(0); React.useEffect(function () { var f = function () { t[1](function (x) { return x + 1; }); }; GT3_NGHE.push(f); return function () { GT3_NGHE = GT3_NGHE.filter(function (y) { return y !== f; }); }; }, []); }
function gt3Loi(id) {
  var o = GT3[id]; if (!o || !o.so || (o.l !== 'HOCHIEU' && o.so.length < o.max)) return null;
  var b2 = [ME_MAU.so].concat(CO_MAU.map(function (x) { return x.so; }));
  if (b2.indexOf(o.so) >= 0) return 'Người này đã có ở bước Người khởi kiện (là người khởi kiện hoặc người đại diện) — không được xuất hiện lại ở bước Bị kiện/Người liên quan.';
  for (var k in GT3) if (k !== id && GT3[k] && GT3[k].so === o.so) return 'Số giấy tờ này đã được dùng cho một đương sự khác trong đơn — mỗi người chỉ được xuất hiện 1 lần.';
  return null;
}
function NextB3() {
  gt3Nghe();
  var co = Object.keys(GT3).some(gt3Loi);
  return co ? Btn(h(F, null, 'Tiếp theo', h(T.Icon, { name: 'chevronRight' })), 'primary', { className: 'pt-chk', onClick: function (e) { var x = e.currentTarget.closest('.ph').querySelector('.ph-gt-err'); if (x) x.scrollIntoView({ behavior: 'smooth', block: 'center' }); } })
    : NextGo('sub4');
}
function SoGiayTo(p) {
  var l = React.useState('CCCD'), so = React.useState(p.init || ''), sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), nm = React.useRef('ph-gt' + (++rid));
  var g0 = LOAI_GT.filter(function (x) { return x.v === l[0]; })[0];
  if (p.b3) GT3[nm.current] = { so: so[0], l: l[0], max: g0.max };
  React.useEffect(function () { if (!p.b3) return; gt3Bao(); }, [so[0], l[0]]);
  React.useEffect(function () { return function () { if (p.b3) { delete GT3[nm.current]; gt3Bao(); } }; }, []);
  if (p.b3) gt3Nghe();
  var loi = p.b3 ? gt3Loi(nm.current) : null;
  var g = LOAI_GT.filter(function (x) { return x.v === l[0]; })[0];
  function doi(v) { if (v !== l[0]) { l[1](v); so[1](''); } sh[1](false); }
  return h('div', { className: 'tp-field ph-gt' + (loi ? ' ph-gt-err' : '') }, h('span', { ref: anchor, hidden: true }), Lbl(p.label || 'Số giấy tờ', p.required),
    h('div', { className: 'ph-gt-box' },
      h('button', { type: 'button', className: 'ph-gt-pre', 'aria-haspopup': 'dialog', 'aria-label': 'Loại giấy tờ: ' + g.t, onClick: function () { sh[1](true); } }, g.t, h(T.Icon, { name: 'chevronDown' })),
      h('input', { className: 'ph-gt-in', value: so[0], placeholder: p.ph || g.ph, maxLength: g.max, inputMode: l[0] === 'HOCHIEU' ? 'text' : 'numeric', 'aria-label': 'Số ' + g.t,
        onChange: function (e) { var r = e.target.value; so[1](l[0] === 'HOCHIEU' ? r.replace(/[^A-Za-z0-9]/g, '').toUpperCase() : r.replace(/\D/g, '')); } })),
    loi ? h('p', { className: 'ph-gt-msg', role: 'alert' }, h(T.Icon, { name: 'alert' }), loi) : null,
    sh[0] && host ? ReactDOM.createPortal(h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-co-sheet ph-gt-sheet' }, h('div', { className: 'ph-scrim', onClick: function () { sh[1](false); } }),
      h('div', { className: 'tp-dlg tp-dlg-sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Chọn loại giấy tờ' },
        h('div', { className: 'tp-dlg-head' }, h('h3', null, 'Chọn loại giấy tờ'), h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Đóng', onClick: function () { sh[1](false); } }, h(T.Icon, { name: 'x' }))),
        h('div', { className: 'tp-dlg-body ph-gt-list', role: 'radiogroup', 'aria-label': 'Loại giấy tờ' }, LOAI_GT.map(function (x) {
          return h(Radio, { key: x.v, name: nm.current, label: x.t, checked: l[0] === x.v, onChange: function () { doi(x.v); } });
        })))), host) : null);
}
/* người bị kiện (web defDescs): Cá nhân – Họ tên + SĐT, Email, Số giấy tờ + Ngày cấp, Nơi cấp, Ngày sinh + Quốc tịch, Giới tính, địa chỉ thường trú (bắt buộc), hiện tại, tạm trú, Nghề nghiệp, Nơi làm việc; Tổ chức – Tên + MST, địa chỉ trụ sở (bắt buộc), SĐT + Email; cuối là khối người đại diện hợp pháp */
/* demo NDKK 1.47 / 1.48 / 1.49 / 1.50 / 1.51: loại đối tượng theo cấu hình (Cá nhân / Tổ chức / Cơ quan; khởi kiện hành chính: "Cá nhân có thẩm quyền"); bộ trường theo thủ tục;
   tổ chức không còn ô Số điện thoại, Thư điện tử riêng; khối người đại diện theo pháp luật nhập tay + người đại diện theo ủy quyền */
function BiKienForm(p) {
  var v = p.v || {}, ks = p.kinds || ['cn', 'tc'], hc = ndHanhChinh(), ps = ndPhaSan();
  var k = React.useState(v.loai && ks.indexOf(v.loai) >= 0 ? v.loai : ks[0]), cb = p.cb || {};
  React.useEffect(function () { if (cb.onKind) cb.onKind(k[0]); }, [k[0]]);
  var tenCb = cb.onTen ? function (e) { cb.onTen(e.target.value); } : undefined;
  var seg = ks.length > 1 ? h('div', { className: 'ph-seg-gon' }, h(T.SegmentedControl, { label: 'Loại người bị kiện', value: k[0], onChange: k[1], options: ks.map(function (x) { return { value: x, label: nhanKind(x, hc) }; }) })) : null;
  var q = quyenBk(k[0]);
  var than = k[0] === 'cn'
    ? (hc ? h(F, { key: 'hc' }, /* 1.48: khởi kiện vụ án hành chính – cá nhân có thẩm quyền */
        Tf('Họ tên người có thẩm quyền', { required: true, placeholder: 'Nhập họ và tên', defaultValue: v.ten, onChange: tenCb }),
        h(SoGiayTo, { b3: true, label: 'Số giấy tờ', ph: 'Nhập số giấy tờ (nếu có)', init: v.gt }),
        Tf('Cơ quan làm việc', { required: true, placeholder: 'Nhập tên cơ quan làm việc' }),
        AddrG('Địa chỉ trụ sở', true, 'short', null, false, { chon: true, ctTuyChon: true }))
      : h(F, { key: 'cn' },
        Tf('Họ và tên', { required: true, defaultValue: v.ten, onChange: tenCb }), Tf('Số điện thoại', { type: 'tel' }), /* v459: tách 2 dòng */
        Tf('Địa chỉ thư điện tử', { type: 'email' }),
        h(SoGiayTo, { b3: true, init: v.gt }), TwoE(Tf('Ngày cấp', Dt()), Tf('Nơi cấp')),
        TwoE(Tf('Ngày, tháng, năm sinh', Dt()), Sf('Quốc tịch')),
        h('div', { className: 'ph-gender-f' }, Lbl('Giới tính'), h(Gender, {})),
        AddrG('Địa chỉ thường trú', true, 'short', null, false, { chon: true }), AddrG('Địa chỉ hiện tại', false, 'short', null, false, { chon: true }), AddrG('Địa chỉ tạm trú', false, 'short', null, false, { chon: true }),
        Tf('Nghề nghiệp', { placeholder: '(nếu có)' }), Tf('Nơi làm việc', { placeholder: '(nếu có)' })))
    : k[0] === 'cq' ? h(F, { key: 'cq' }, /* 1.47: Cơ quan – Tên cơ quan, Địa chỉ trụ sở (chi tiết không bắt buộc) */
        Tf('Tên cơ quan', { required: true, placeholder: 'Nhập tên đầy đủ của cơ quan', defaultValue: v.ten, onChange: tenCb }),
        AddrG('Địa chỉ trụ sở', true, 'short', null, false, { chon: true, ctTuyChon: true }))
    : h(F, { key: 'tc' },
        /* 1.49 (người dùng 21/11): Tên tổ chức, Mã số thuế mỗi ô một dòng */ Tf('Tên tổ chức', { required: true, placeholder: 'Tên tổ chức', defaultValue: v.ten, onChange: tenCb }), Tf('Mã số thuế', { placeholder: '(nếu có)' }),
        AddrG('Địa chỉ trụ sở', true, 'short', null, false, { chon: true }),
        ps ? h(PhanLoaiTc, { bi: true }) : null); /* 1.49 – 1.50: bỏ Số điện thoại, Thư điện tử của tổ chức */
  var dd = q.pl || q.uq ? h(F, null, h('hr', { className: 'ph-hr' }), h(Proxy, { key: k[0], quyen: q, on: !!v.dd, phapLuat: q.pl ? h(KhoiPlTay, { kind: k[0] }) : null })) : null;
  return h(F, null, seg, than, dd);
}
/* người có quyền lợi, nghĩa vụ liên quan (web relDescs): như người bị kiện + "Mối quan hệ / Lý do liên quan" bắt buộc; 1.47: thêm Cơ quan theo cấu hình */
function LienQuanForm(p) {
  var ks = p.kinds || ['cn', 'tc'], k = React.useState(ks[0]), cb = p.cb || {}, qh = Tf('Mối quan hệ / Lý do liên quan', { required: true, multiline: true, placeholder: 'Mối quan hệ / Lý do liên quan' });
  React.useEffect(function () { if (cb.onKind) cb.onKind(k[0]); }, [k[0]]);
  var tenCb = cb.onTen ? function (e) { cb.onTen(e.target.value); } : undefined, q = quyenBk(k[0]);
  return h(F, null, ks.length > 1 ? h('div', { className: 'ph-seg-gon' }, h(T.SegmentedControl, { label: 'Loại người liên quan', value: k[0], onChange: k[1], options: ks.map(function (x) { return { value: x, label: NHAN_KIND[x] }; }) })) : null,
    k[0] === 'cn' ? h(F, { key: 'cn' },
      Tf('Họ và tên', { required: true, onChange: tenCb }), Tf('Số điện thoại', { type: 'tel' }), /* v459: tách 2 dòng */
      Tf('Địa chỉ thư điện tử', { type: 'email' }),
      h(SoGiayTo, { b3: true }),
      TwoE(Sf('Quốc tịch'), Tf('Ngày, tháng, năm sinh', Dt())),
      AddrG('Địa chỉ thường trú', true, 'short', null, false, { chon: true }), AddrG('Địa chỉ hiện tại', false, 'short', null, false, { chon: true }), AddrG('Địa chỉ tạm trú', false, 'short', null, false, { chon: true }),
      qh, Tf('Nghề nghiệp', { placeholder: '(nếu có)' }), Tf('Nơi làm việc', { placeholder: '(nếu có)' }))
    : k[0] === 'cq' ? h(F, { key: 'cq' },
      Tf('Tên cơ quan', { required: true, placeholder: 'Nhập tên đầy đủ của cơ quan', onChange: tenCb }),
      AddrG('Địa chỉ trụ sở', true, 'short', null, false, { chon: true, ctTuyChon: true }), qh)
    : h(F, { key: 'tc' },
      /* 1.49 (người dùng 21/11): mỗi ô một dòng */ Tf('Tên tổ chức', { required: true, onChange: tenCb }), Tf('Mã số thuế', { placeholder: '(nếu là doanh nghiệp)' }),
      AddrG('Địa chỉ trụ sở', true, 'short', null, false, { chon: true }), qh),
    q.pl || q.uq ? h(F, null, h('hr', { className: 'ph-hr' }), h(Proxy, { key: k[0], quyen: q, phapLuat: q.pl ? h(KhoiPlTay, { kind: k[0] }) : null })) : null);
}
function LamChungForm(p) {
  var v = p.v || {}, cb = p.cb || {};
  return h(F, null, Tf('Họ và tên người làm chứng', { required: true, defaultValue: v.ten, onChange: cb.onTen ? function (e) { cb.onTen(e.target.value); } : undefined }),
    AddrG('Địa chỉ', true, 'short', v.tinh ? [v.tinh, v.xa] : null, false, { chon: true }),
    Tf('Nội dung có thể làm chứng', { multiline: true, placeholder: 'Nhập nội dung có thể làm chứng' }));
}
/* khối người liên quan: chọn Có/Không (bắt buộc, mặc định chưa chọn như web); Có → danh sách, có sẵn 1 thẻ trống mở; 1.46: thanh công cụ; 1.55: kiểm tra Có/Không khi Tiếp theo */
function LienQuanBlock(p) {
  p = p || {};
  var co = React.useState(p.co === undefined ? null : p.co), nm = React.useRef('ph-lq' + (++rid));
  return h('div', { className: 'ph-lq' },
    h('div', { className: 'ph-gender', role: 'radiogroup', 'aria-label': 'Có người có quyền lợi, nghĩa vụ liên quan' },
      h(Radio, { name: nm.current, label: 'Có', checked: co[0] === true, onChange: function () { co[1](true); } }),
      h(Radio, { name: nm.current, label: 'Không', checked: co[0] === false, onChange: function () { co[1](false); } })),
    co[0] ? h(PartyList, { init: [{ moi: true }], dem: 'người', goi: 'Người liên quan', tu: 'người có quyền lợi, nghĩa vụ liên quan', them: 'Thêm người liên quan', ph: 'Tìm theo họ tên, CCCD hoặc mã số thuế…', rong: 'người liên quan',
      tag: (p.kinds || ['cn', 'tc']).length > 1 ? function (k) { return NHAN_KIND[k || (p.kinds || ['cn'])[0]]; } : null,
      form: function (v, cb) { return h(LienQuanForm, { v: v, kinds: p.kinds, cb: cb }); } }) : null);
}
/* demo NDKK 1.45 – 1.47, 1.55: Bước 3 theo cấu hình nộp đơn – danh sách hoặc 1 form cố định, đối tượng được phép, có / không nhóm người liên quan, người làm chứng; tên khối theo tên bước 3 */
function Sub3(p) {
  p = p || {};
  var cfg = ndCfg(), ten = ndTen(), nhan = thuongDau(ten[1]), hc = ndHanhChinh();
  var c3 = cfg ? cfg.c3 : true, n3 = cfg ? cfg.n3 : true, d3 = (cfg ? cfg.d3 : ndPhaSan() ? ['tc'] : ['cn', 'tc']).filter(function (k) { return !ndPhaSan() || k !== 'cq'; });
  var lq = cfg ? cfg.lq : true, dlq = cfg ? cfg.dlq : ['cn', 'tc'], lc = cfg ? cfg.lc : true;
  var mau = p.mau || (ndPhaSan() ? { ten: 'Công ty TNHH Thương mại Hoàng Long', loai: 'tc', mo: true } : { ten: hc ? '' : 'Trần Văn Bình', loai: 'cn', mo: true, gt: p.trung ? ME_MAU.so : undefined });
  var formBk = function (v, cb) { return h(BiKienForm, { v: v, kinds: d3, cb: cb }); };
  return Submit(3, h(F, null,
    p.kt ? h(TuKt, { b: 3 }) : null,
    c3 ? (n3 ? FCard('Danh sách ' + nhan, h(PartyList, { init: [mau].concat(p.bkThem || []), dem: nhan, goi: ten[1], tu: nhan, them: 'Thêm ' + nhan, giuMot: true, ph: 'Tìm ' + nhan + ' theo tên, CCCD hoặc mã số thuế…', rong: nhan,
        tag: function (k) { return nhanKind(k || d3[0], hc); }, form: formBk }), true)
      : FCard('Thông tin ' + nhan, formBk(mau), true)) : null,
    lq ? FCard('Danh sách người có quyền lợi, nghĩa vụ liên quan', h(LienQuanBlock, { kinds: dlq, co: p.lqCo }), true) : null,
    lc ? FCard('Danh sách người làm chứng', h(PartyList, { init: p.lcInit || [], dem: 'người', goi: 'Người làm chứng', tu: 'người làm chứng', them: 'Thêm người làm chứng', ph: 'Tìm theo họ tên, địa chỉ hoặc nội dung làm chứng…', rong: 'người làm chứng',
      form: function (v, cb) { return h(LamChungForm, { v: v, cb: cb }); } }), true) : null), null, null, { ro: p.ro, luuLoi: p.luuLoi });
}
function Sub3Trung() { return h(Sub3, { trung: true }); } /* v325: màn xem nhanh – người bị kiện trùng số giấy tờ người khởi kiện */
/* 2 ô tải tài liệu dùng chung (như bước 2): Tải lên từ thiết bị / Từ kho dữ liệu; một ô khi chỉ được tải từ thiết bị; demo NDKK: o.dang – "Đang tải lên…", o.loi – viền đỏ (1.61) */
function UpTiles(onDev, onLib, sub, o) {
  o = o || {};
  return h('div', { className: 'ph-up2 ph-up3' + (onLib ? '' : ' ph-up1') + (o.loi ? ' ph-up-loi' : '') },
    h('button', { type: 'button', className: 'ph-up2-it', disabled: !!o.dang, onClick: onDev }, h('span', { className: 'ph-up3-ic' }, o.dang ? h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }) : h(T.Icon, { name: 'upload' })), h('b', null, o.dang ? 'Đang tải lên…' : 'Tải lên từ thiết bị'), sub && !o.dang ? h('small', null, sub) : null),
    onLib ? h('button', { type: 'button', className: 'ph-up2-it', onClick: onLib }, h('span', { className: 'ph-up3-ic' }, h(T.Icon, { name: 'folder' })), h('b', null, 'Từ kho dữ liệu')) : null);
}
/* bước 4 – Nội dung (chọn 02/11/2026): Nhập thông tin = 1 ô nhập nhiều dòng cho cả bước; Tải đơn có sẵn = 1 tệp PDF/DOCX chỉ từ thiết bị, có Tên tài liệu* + Loại tài liệu* */
/* bước 4 – Tải đơn có sẵn (03/11/2026): chọn tệp → bảng từ đáy "Tài liệu đơn có sẵn" như bước 5 (dòng tệp + Thay tệp, Tên tài liệu*, Loại giấy tờ* → bảng chồng, Xóa | Hủy | Lưu); lưu xong hiện thẻ tài liệu như bước 5 (nút bút sửa) */
/* v324: web – đổi giữa "Nhập thông tin" và "Tải đơn có sẵn" khi cách đang dùng đã có nội dung → hộp "Đổi cách nhập nội dung đơn?"; Tiếp tục = đổi và xóa nội dung cách cũ, Hủy = giữ nguyên */
/* demo NDKK 1.60 / 1.61 / 1.75: nhớ cách nhập + tệp đơn có sẵn cho Bước 6; báo lỗi khi bấm Tiếp theo (Bắt buộc, tối thiểu 100 ký tự, bảng yêu cầu; chưa có tệp đơn);
   p.tepLoi – màn trạng thái: tệp chọn từ thiết bị không hợp lệ (thông báo nổi như web); p.mode0 – cách nhập mở sẵn */
function NoiDungCard(p) {
  var mo = p && p.mo, m = React.useState((p && p.mode0) || ND_ST.mode || 'nhap'), doc = React.useState(ND_ST.doc || null), nd = React.useState(mo ? 'Ngày 15-03-2025, tôi cho ông Trần Văn Bình vay 200.000.000 đồng…' : (p && p.nd0) || ND_ST.tt), cf = React.useState(mo ? 'file' : null), ed = React.useState(null), dang = React.useState(false), anchor = React.useRef(null), host = useHost(anchor);
  var b = ndNghe(), loi = b.kt4 ? kt4Loi() : {}, tl = React.useState(''); /* 1.61 (người dùng 21/11): lỗi tệp hiện dưới ô tải, không dùng thanh thông báo */
  React.useEffect(function () { var x = !!(p && p.kt); if (!!NDB.kt4 !== x) ndbDat('kt4', x); }, []);
  React.useEffect(function () { ND_ST.mode = m[0]; ND_ST.doc = doc[0]; if (NDB.kt4) ndBao(); }, [m[0], doc[0]]);
  var TEP = 'don-khoi-kien-nguyen-minh-an.docx';
  function setD(o) { ed[1](Object.assign({}, ed[0], { d: Object.assign({}, ed[0].d, o) })); }
  function chonTb() {
    dang[1](true);
    setTimeout(function () { dang[1](false); tl[1](''); if (p && p.tepLoi) { tl[1](p.tepLoi); return; } ed[1]({ moi: true, d: { tep: TEP, ten: '', loai: '' } }); }, 700);
  }
  return FCard('Nội dung đơn', h(F, null, h('span', { ref: anchor, hidden: true }),
    m[0] === 'file' ? P('Tải lên tệp đơn khởi kiện bạn đã tự soạn sẵn, thay cho việc nhập thông tin bên dưới.', 'ph-muted') : null, /* v552 (người dùng 23/11): bỏ câu mô tả khi Nhập thông tin */
    cf[0] && host ? ReactDOM.createPortal(h(XnDoi, { illo: ['banSao', 'alert'], title: 'Đổi cách nhập nội dung đơn?', desc: 'Một đơn chỉ dùng biểu mẫu điện tử HOẶC tệp đơn có sẵn, không dùng cả hai. Đổi cách nhập sẽ xóa nội dung đã nhập ở cách đang dùng.',
      onOk: function () { var k = cf[0]; cf[1](null); if (k === 'file') { nd[1](''); ND_ST.td = ''; ND_ST.tt = ''; ND_ST.cc = ''; YC_ST.rows = [{ nd: '', gt: '', mt: '' }]; } else doc[1](null); m[1](k); }, onCancel: function () { cf[1](null); } }), host) : null,
    h(T.SegmentedControl, { label: 'Cách nhập nội dung', value: m[0], onChange: function (k) { if (k === m[0]) return; var co = m[0] === 'nhap' ? !!nd[0].trim() : !!doc[0]; if (co) cf[1](k); else m[1](k); }, options: [{ value: 'nhap', label: 'Nhập thông tin' }, { value: 'file', label: 'Tải đơn có sẵn' }] }),
    m[0] === 'nhap' ? h(NoiDungTruong, { nd: nd[0], loi: loi, onNd: function (e) { nd[1](e.target.value); } })
      : h(F, null, doc[0] ? h('ul', { className: 'ph-tlr' }, h('li', null,
          h('span', { className: 'ph-up3-ic ph-tl-ic ph-tl-ok', 'aria-hidden': 'true' }, h(T.Icon, { name: 'check' })),
          h('span', { className: 'ph-tlr-tx' }, h('b', null, doc[0].ten), h('small', null, doc[0].tep + ' · ' + doc[0].loai)),
          h(T.Button, { variant: 'secondary', size: 'sm', icon: 'pen', className: 'ph-lib-view ph-tlr-edit', 'aria-label': 'Sửa ' + doc[0].ten, onClick: function () { ed[1]({ d: Object.assign({}, doc[0]) }); } })))
        : UpTiles(chonTb, null, 'Chọn tệp đơn đã soạn sẵn trên thiết bị', { dang: dang[0], loi: !!loi.don }),
        !doc[0] && tl[0] ? h('p', { className: 'q2-err', role: 'alert' }, tl[0]) : !doc[0] && loi.don ? h('p', { className: 'q2-err', role: 'alert' }, h(T.Icon, { name: 'alert' }), loi.don) : null,
        P('Định dạng PDF, DOCX · tối đa 10MB/tệp.', 'ph-muted fx-help ph-up2-hint')),
    ed[0] && host ? ReactDOM.createPortal(h(TLSheet, { title: 'Tài liệu đơn có sẵn', ktLoi: true, r: { bat: false, tep: ed[0].moi ? null : doc[0] && doc[0].tep }, d: ed[0].d, set: setD,
      onClose: function () { ed[1](null); }, onSave: function (d) { ed[1](null); doc[1](d ? { tep: d.tep, ten: d.ten, loai: d.loai } : null); },
      onDev: function () { setD({ tep: 'don-khoi-kien-ban-sua.pdf' }); } }), host) : null), true);
}
function Sub4() { return Submit(4, h(NoiDungCard)); }
function Sub4Doi() { return Submit(4, h(NoiDungCard, { mo: true })); } /* v324: màn có sẵn hộp Đổi cách nhập (đi tới màn bất kỳ) */
/* (cũ, thay bởi phương án S1 03/11/2026 bên dưới) bước 5 – Tài liệu và chứng cứ (theo ảnh web, phương án A, chốt 02/11/2026): mô tả định dạng → danh sách tài liệu (tài liệu bắt buộc theo loại việc + tài liệu tự tải lên) → 2 ô "Tải lên tài liệu bổ sung" / "Lấy từ kho dữ liệu cá nhân".
   Thẻ tài liệu đã có tệp: tích xanh + tên tệp (chữ xanh); tài liệu bắt buộc: Loại tài liệu* → Tên tài liệu (khóa); tài liệu tự tải lên: Tên tài liệu* (nhập được); nút "Thay tệp ▾" (Tải từ thiết bị / Lấy từ kho dữ liệu cá nhân) + Xóa. Không có nút Xem.
   Tài liệu bắt buộc chưa có tệp: biểu tượng tải lên + tên + "Loại tài liệu*: —" + nút "Tải lên ▾". */
var TL_BAT_BUOC = [{ id: 'dc', ten: 'Di chúc / Giấy chứng tử' }, { id: 'hd', ten: 'Tài liệu chứng minh quan hệ tranh chấp (HĐ, giấy tờ giao dịch...)' }];
var LOAI_TL = ['Bản chính', 'Bản sao có chứng thực', 'Bản sao không có chứng thực', 'Khác'];
function NguonMenu(p) {
  var m = React.useState(false);
  function chon(k) { m[1](false); if (k === 'kho') p.onLib(); else p.onDev(); }
  /* chỉ tải từ thiết bị (bước 4): bấm là chọn tệp, không mở menu */
  if (!p.onLib) return h('div', { className: 'ph-doc-menu ph-tl-menu' }, h('button', { type: 'button', className: 'ph-doc-swap', onClick: p.onDev }, p.label));
  return h('div', { className: 'ph-doc-menu ph-tl-menu' },
    h('button', { type: 'button', className: 'ph-doc-swap', 'aria-haspopup': 'menu', 'aria-expanded': m[0], onClick: function () { m[1](!m[0]); } }, p.label), /* 03/11/2026: bỏ mũi tên ở "Tải lên" và "Thay tệp" */
    m[0] ? h('ul', { className: 'tp-listbox ph-tl-list', role: 'menu' },
      h('li', { role: 'menuitem', onClick: function () { chon('tb'); } }, h(T.Icon, { name: 'upload' }), 'Tải từ thiết bị'),
      h('li', { role: 'menuitem', onClick: function () { chon('kho'); } }, h(T.Icon, { name: 'folder' }), 'Lấy từ kho dữ liệu cá nhân')) : null);
}
/* bước 5 – phương án S1 (chọn 03/11/2026): thông tin của 1 tài liệu nhập trong bảng từ đáy; ô "Tải lên tài liệu bổ sung" / "Lấy từ kho dữ liệu cá nhân" và nút "Tải lên ▾" của tài liệu bắt buộc ở màn bước 5.
   Mỗi tài liệu một thẻ riêng (03/11/2026): biểu tượng trạng thái, Loại văn bản* (tài liệu bắt buộc) hoặc Tên tài liệu (tự tải lên), dòng phụ "tên tệp · Loại giấy tờ" / "Chưa tải lên"; có tệp: nút sửa chỉ biểu tượng bút xám (mở bảng), chưa có: "Tải lên ▾".
   Bảng "Tài liệu bắt buộc" / "Tài liệu bổ sung": Loại văn bản (chỉ xem) dưới tiêu đề, dòng tệp + "Thay tệp ▾", Tên tài liệu (khóa với tài liệu bắt buộc – tạm lấy tên tệp), Loại giấy tờ* (ô chọn); đáy Xóa | Hủy | Lưu (Lưu khóa tới khi đủ). */
/* demo NDKK 1.63: "Loại giấy tờ" → "Loại tài liệu" ở mọi chỗ khai tài liệu; 1.61 / 1.66 (p.ktLoi): bấm Lưu khi thiếu → câu lỗi dưới ô như web, không khóa nút Lưu */
function TLSheet(p) {
  var r = p.r, d = p.d, du = d.tep && d.loai && (r.bat || (d.ten || '').trim()), o = React.useState(false), e = React.useState(false), bRef = React.useRef(null), host = useHost(bRef);
  var loiTen = p.ktLoi && e[0] && !r.bat && !(d.ten || '').trim() ? 'Vui lòng nhập tên tài liệu' : undefined, loiLoai = p.ktLoi && e[0] && !d.loai ? 'Vui lòng chọn loại tài liệu' : undefined;
  return h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-co-sheet ph-tls' }, h('div', { className: 'ph-scrim', onClick: p.onClose }),
    h('div', { className: 'tp-dlg tp-dlg-sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': p.title || (r.bat ? 'Tài liệu bắt buộc' : 'Tài liệu bổ sung') },
      h('div', { className: 'tp-dlg-head' }, h('div', { className: 'ph-tls-head' }, h('h3', null, p.title || (r.bat ? 'Tài liệu bắt buộc' : 'Tài liệu bổ sung')), r.bat ? h('p', null, h('span', null, 'Loại văn bản: '), r.vb) : null),
        h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Đóng', onClick: p.onClose }, h(T.Icon, { name: 'x' }))),
      h('div', { className: 'tp-dlg-body ph-tls-body', ref: bRef },
        h('div', { className: 'ph-tls-tep' }, h('span', { className: 'ph-up3-ic ph-tl-ok', 'aria-hidden': 'true' }, h(T.Icon, { name: 'file' })), h('b', null, d.tep), h(NguonMenu, { label: 'Thay tệp', onDev: p.onDev, onLib: p.onLib }),
          r.tep ? h('button', { type: 'button', className: 'tp-icon-btn ph-tls-xoa', 'aria-label': 'Xóa tài liệu', onClick: function () { p.onSave(null); } }, h(T.Icon, { name: 'trash' })) : null),
        Tf('Tên tài liệu', { required: !r.bat, value: (r.bat ? d.tep : d.ten) || '', placeholder: 'Nhập tên tài liệu', disabled: r.bat, readOnly: r.bat, error: loiTen, onChange: function (ev) { p.set({ ten: ev.target.value }); } }),
        h(T.SelectField, { label: 'Loại tài liệu', labelVisible: true, required: true, placeholder: '— Chọn loại tài liệu —', value: d.loai || undefined, open: o[0], error: loiLoai, onClick: function () { o[1](true); } }),
        o[0] && host ? h(LvSheet, { host: host, title: 'Chọn loại tài liệu', onClose: function () { o[1](false); } },
          h(LvRows, { label: 'Loại tài liệu', cur: d.loai, items: (p.loai || LOAI_TL).map(function (x) { return { id: x, name: x }; }), onPick: function (x) { p.set({ loai: x }); o[1](false); } })) : null),
      h('div', { className: 'tp-dlg-foot ph-tls-foot' },
                h(T.Button, { variant: 'tonal', onClick: p.onClose }, 'Hủy'),
        p.ktLoi ? h(T.Button, { className: 'pt-chk', onClick: function () { if (!du) { e[1](true); return; } p.onSave(d); } }, 'Lưu') : h(T.Button, { disabled: !du, onClick: function () { p.onSave(d); } }, 'Lưu'))));
}
/* p (03/11/2026, dùng lại ở trích lục, khiếu nại, tố cáo): title, desc, bat (tài liệu bắt buộc), bb0, bs0 (dữ liệu ban đầu), he (tài liệu hệ thống tự tạo: [tên, mô tả]);
   demo NDKK (p.ndkk – chỉ Nộp đơn khởi kiện): 1.64 tải nhiều tệp một lần, 1.65 nút Xem cho tệp lấy từ kho, 1.66 lỗi khi Tiếp theo + đang tải, 1.67 chọn nhiều tệp từ kho,
   p.khoMo – mở sẵn kho ở trạng thái 'loi' / 'rong' (1.69), p.tepLoi – tệp tải lên không hợp lệ (thông báo nổi), p.dmTai – đang tải danh mục tài liệu */
function TaiLieuCard(p) {
  p = p || {}; var TLB = p.bat || TL_BAT_BUOC, nd = !!p.ndkk;
  var bb = React.useState(p.bb0 || { dc: { tep: 'di-chuc-nguyen-van-a.pdf', loai: 'Bản chính' } }), bs = React.useState(p.bs0 || [{ k: 1, tep: 'bien-nhan-chuyen-khoan.pdf', ten: 'Biên nhận chuyển khoản', loai: 'Bản sao không có chứng thực' }]);
  var tl = React.useState(''); /* 1.66 (người dùng 21/11): lỗi tệp dưới ô tải */
  var ed = React.useState(null), lib = React.useState(p.khoMo ? { bs: 1, trang: p.khoMo } : null), seq = React.useRef(20), dang = React.useState(false), anchor = React.useRef(null), host = useHost(anchor);
  var b = ndNghe(), kt = nd && !!b.kt5;
  React.useEffect(function () { if (nd && !!NDB.kt5 !== !!p.kt) ndbDat('kt5', !!p.kt); }, []);
  var rows = TLB.map(function (r) { var d = bb[0][r.id]; return { key: r.id, id: r.id, bat: true, vb: r.ten, tep: d && d.tep, ten: d && d.tep, loai: d && d.loai, nguon: d && d.nguon }; })
    .concat(bs[0].map(function (x) { return { key: 'bs' + x.k, k: x.k, bat: false, tep: x.tep, ten: x.ten, loai: x.loai, nguon: x.nguon }; }));
  if (nd) TL5.rows = rows;
  function mo(r, tep, nguon) { ed[1]({ r: r, d: { tep: tep || r.tep, ten: r.ten || '', loai: r.loai || '', nguon: nguon || r.nguon } }); }
  function moi(tep) { mo({ key: 'moi', bat: false, moi: true }, tep); }
  function setD(o) { ed[1]({ r: ed[0].r, d: Object.assign({}, ed[0].d, o) }); }
  function luu(d) {
    var r = ed[0].r; ed[1](null);
    if (r.bat) { var n = Object.assign({}, bb[0]); if (d) n[r.id] = { tep: d.tep, loai: d.loai, nguon: d.nguon }; else delete n[r.id]; bb[1](n); return; }
    if (r.moi) { if (d) { seq.current += 1; bs[1](bs[0].concat([{ k: seq.current, tep: d.tep, ten: d.ten, loai: d.loai, nguon: d.nguon }])); } return; }
    bs[1](d ? bs[0].map(function (y) { return y.k === r.k ? { k: y.k, tep: d.tep, ten: d.ten, loai: d.loai, nguon: d.nguon } : y; }) : bs[0].filter(function (y) { return y.k !== r.k; }));
  }
  function themNhieu(ds, nguon) { var n = bs[0].slice(); ds.forEach(function (f) { seq.current += 1; n.push({ k: seq.current, tep: f.tep, ten: nguon === 'kho' ? f.ten : '', loai: '', nguon: nguon }); }); bs[1](n); }
  function chon(f) { var t = lib[0]; lib[1](null); if (t === 'thay') setD({ tep: f.tep, nguon: 'kho' }); else if (t && t.bs) (nd ? themNhieu([f], 'kho') : moi(f.tep)); else if (t === 'bs') moi(f.tep); else if (t) mo(t, f.tep, 'kho'); }
  function taiBoSung() {
    if (!nd) { moi(KHO[2] ? KHO[2].tep : KHO[1].tep); return; }
    dang[1](true); /* 1.64: chọn nhiều tệp một lần – mỗi tệp một dòng, khai tên và loại sau */
    setTimeout(function () { dang[1](false); tl[1](''); if (p.tepLoi) { tl[1](p.tepLoi); return; } themNhieu([KHO[2], KHO[5]], 'tb'); }, 700);
  }
  var daCo = rows.filter(function (r) { return r.tep; }).map(function (r) { return r.tep; });
  return FCard(p.title || 'Tài liệu và chứng cứ', h(F, null, h('span', { ref: anchor, hidden: true }),
    p.desc === null ? null : P(p.desc || 'Định dạng PDF, JPG, PNG, DOCX · tối đa 10MB/tệp.', 'ph-muted'),
    p.he ? h('ul', { className: 'ph-tlr' }, p.he.map(function (x) {
      return h('li', { key: x[0] }, h('span', { className: 'ph-up3-ic ph-tl-ic ph-tl-ok', 'aria-hidden': 'true' }, h(T.Icon, { name: 'lock' })), h('span', { className: 'ph-tlr-tx' }, h('b', null, x[0]), h('small', null, x[1])), x[2] ? IcoBtn('eye', 'Xem ' + x[2]) : null); /* v400 */
    })) : null,
    p.batPa === 'C' ? h('p', { className: 'tlb-c-note' }, h(T.Icon, { name: 'info' }), 'Bắt buộc ít nhất một tài liệu, chứng cứ để gửi đơn.') : null, /* v413 */
    p.dmTai ? h('p', { className: 'ph-dm-tai', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), 'Đang tải danh mục tài liệu…') : null,
    rows.length && !p.dmTai ? h('ul', { className: 'ph-tlr' }, rows.map(function (r) {
      if (p.batPa && r.bat && !r.tep) return TlBatPa(p.batPa, r, function () { mo(r, KHO[0].tep); }, function () { lib[1](r); });
      var sub = r.tep ? r.tep + ' · ' + (r.loai || 'Chưa chọn loại tài liệu') : 'Chưa tải lên', ten = r.bat ? r.vb : (r.ten || r.tep);
      var loiR = kt && r.tep ? [!r.bat && !(r.ten || '').trim() ? 'Vui lòng nhập tên tài liệu' : null, !r.loai ? 'Vui lòng chọn loại tài liệu' : null].filter(Boolean) : [];
      return h('li', { key: r.key, className: loiR.length ? 'ph-tlr-li-loi' : null },
        h('span', { className: 'ph-up3-ic ph-tl-ic' + (r.tep ? ' ph-tl-ok' : ''), 'aria-hidden': 'true' }, h(T.Icon, { name: r.tep ? 'check' : 'upload' })),
        h('span', { className: 'ph-tlr-tx' }, h('b', null, ten, r.bat ? h('span', { className: 'tp-field-req' }, ' *') : null), h('small', { className: r.tep && !r.loai ? 'ph-tlr-miss' : '' }, sub),
          loiR.map(function (t) { return h('small', { key: t, className: 'ph-tlr-loi' }, h(T.Icon, { name: 'alert' }), t); })),
        r.tep ? h(F, null,
            nd ? h(T.Button, { variant: 'secondary', size: 'sm', icon: 'eye', className: 'ph-lib-view', 'aria-label': 'Xem ' + ten, 'data-pt-go': 'attachment', onClickCapture: function () { window.__ibFile = r.tep; } }) : null, /* 1.65 */
            h(T.Button, { variant: 'secondary', size: 'sm', icon: 'pen', className: 'ph-lib-view ph-tlr-edit', 'aria-label': 'Sửa ' + ten, onClick: function () { mo(r); } }))
          : h(NguonMenu, { label: 'Tải lên', onDev: function () { mo(r, KHO[0].tep, 'tb'); }, onLib: function () { lib[1](r); } }));
    })) : null,
    h('div', { className: 'ph-up2 ph-up3' },
      h('button', { type: 'button', className: 'ph-up2-it', disabled: dang[0], onClick: taiBoSung }, h('span', { className: 'ph-up3-ic' }, dang[0] ? h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }) : h(T.Icon, { name: 'upload' })), h('b', null, dang[0] ? 'Đang tải lên…' : 'Tải lên tài liệu bổ sung')),
      h('button', { type: 'button', className: 'ph-up2-it', onClick: function () { lib[1](nd ? { bs: 1 } : 'bs'); } }, h('span', { className: 'ph-up3-ic' }, h(T.Icon, { name: 'folder' })), h('b', null, 'Từ kho dữ liệu cá nhân'))), /* 03/11/2026: đổi chữ ô nét đứt */
    tl[0] ? h('p', { className: 'q2-err', role: 'alert' }, tl[0]) : null,
    ed[0] && host ? ReactDOM.createPortal(h(TLSheet, { loai: p.loai, ktLoi: nd, r: ed[0].r, d: ed[0].d, set: setD, onClose: function () { ed[1](null); }, onSave: luu,
      onDev: function () { setD({ tep: KHO[1].tep, nguon: 'tb' }); }, onLib: function () { lib[1]('thay'); } }), host) : null,
    lib[0] && host ? ReactDOM.createPortal(h(LibSheet, { chosen: null, nhieu: nd && !!lib[0].bs, trang: lib[0].trang, daCo: nd ? daCo : null, moTa: nd ? 'Chỉ chọn được tệp PDF, JPG, PNG, DOCX tối đa 10MB.' : undefined, dinhDang: nd ? ['PDF', 'JPG', 'PNG', 'DOCX'] : undefined,
      onClose: function () { lib[1](null); }, onPick: chon, onPickNhieu: function (ds) { lib[1](null); themNhieu(ds, 'kho'); } }), host) : null), true);
}
function Sub5() { return Submit(5, h(TaiLieuCard, { ndkk: true })); }
/* bước 6 – Xem lại và Xác nhận (phương án B có chỉnh, chốt 02/11/2026): khối cha "Xem lại và Xác nhận" (mô tả + 5 khối con gập/mở, mặc định mở); đầu khối con: mũi tên + tiêu đề + nút sửa chỉ biểu tượng bút, xám (về đúng bước);
   người khởi kiện, người bị kiện hiển thị bằng thẻ tóm tắt thu gọn như ở bước 2, 3 (không có nút xóa); tài liệu: tên, tệp · loại, nút xem chỉ biểu tượng xám. Gợi ý tòa án và cam kết là khối riêng. Xác nhận → popup "Xác nhận đơn?" → bước 7 */
/* v351: nút Xem (con mắt) chưa có đích hoặc chỉ báo "Đang mở…" → mở màn xem tệp (attachment) */
function IcoBtn(icon, label, go) {
  var xem = icon === 'eye' && (!go || /^snack:Đang mở/.test(go)), ten = String(label || '').replace(/^Xem /, '');
  return h(T.Button, { variant: 'secondary', size: 'sm', icon: icon, className: 'ph-lib-view', 'aria-label': label, 'data-pt-go': xem ? 'attachment' : go, onClickCapture: xem ? function () { window.__ibFile = /\.[a-z]{3,4}$/i.test(ten) ? ten : ten + '.pdf'; } : undefined });
}
function RvList(items) { return h(T.InfoList, { variant: 'rows', className: 'ph-rv', items: items.map(function (r) { return { label: r[0], value: r[1] }; }) }); }
/* bước 6 – phương án A (chọn 03/11/2026): nhãn xám bên trái, giá trị chữ thường bên phải, mỗi hàng 36px có kẻ mảnh; áp cho khối Loại việc và thông tin trong các khối/thẻ còn lại (người khởi kiện, người bị kiện, nội dung đơn) */
function RvKV(items) { return h('dl', { className: 'ph-rvkv' }, items.map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0]), h('dd', null, h(RvDai, { nhan: r[0] }, vd(r[1])))); })); }
/* v558 (người dùng 23/11): giá trị quá 5 dòng – rút 5 dòng + "Xem thêm" (chữ đỏ), bấm mở hết tại chỗ, "Thu gọn" để đóng; không quá 5 dòng thì không có nút */
/* v559 (người dùng 23/11): "Xem thêm" mở bảng từ đáy – tiêu đề là nhãn trường, nội dung đầy đủ; đóng bằng ✕ hoặc chạm nền */
function RvDai(p) {
  var ref = React.useRef(null), mo = React.useState(false), can = React.useState(false), host = useHost(ref);
  React.useLayoutEffect(function () { var el = ref.current; if (!el) return; var d = el.scrollHeight > el.clientHeight + 1; if (d !== can[0]) can[1](d); });
  return h(F, null, h('span', { ref: ref, className: 'rv-tx rv-gon' }, p.children),
    can[0] ? h('button', { type: 'button', className: 'rv-them', 'aria-haspopup': 'dialog', 'aria-label': 'Xem toàn bộ ' + thuongDau(p.nhan || ''), onClick: function () { mo[1](true); } }, h(T.Icon, { name: 'eye' }), 'Xem toàn bộ') : null, /* v567 (người dùng 23/11 chọn PA 4): nút xanh lá nhạt "Xem toàn bộ" */
    mo[0] && host ? h(LvSheet, { host: host, title: p.nhan, onClose: function () { mo[1](false); } }, h('p', { className: 'rv-toan' }, p.children)) : null);
} /* v232: giá trị trống → '-' */
var RV_TL = [['Di chúc / Giấy chứng tử', 'di-chuc-nguyen-van-a.pdf · Bản chính'], ['Tài liệu bổ sung', 'bien-nhan-chuyen-khoan.pdf']];
function RvKhoi(p) {
  var op = React.useState(true);
  return h('section', { className: 'ph-rv2' + (op[0] ? ' ph-rv2-open' : '') },
    h('div', { className: 'ph-rv2-h' },
      h('button', { type: 'button', className: 'ph-rv2-tg', 'aria-expanded': op[0], onClick: function () { op[1](!op[0]); } }, h(T.Icon, { name: 'chevronRight', className: 'ph-rv2-chev' }), h('span', null, p.t)),
      p.ro ? null : IcoBtn('pen', 'Chỉnh sửa ' + p.t, 'replace:' + p.go)), /* demo NDKK 1.81: đơn đã xác nhận – ẩn nút Chỉnh sửa */
    op[0] ? h('div', { className: 'ph-rv2-b' }, p.children) : null);
}
/* v328 (12/11/2026, chọn W2 + biểu tượng kiểu hộp đơn soạn dở): hộp "Xác nhận đơn?" dùng hình minh họa đơn + huy hiệu cảnh báo;
   xác nhận lại đơn đã có người ký mà danh sách đương sự phía nguyên đơn đã đổi (p.lai) → khối cảnh báo vàng có biểu tượng, cụm "toàn bộ chữ ký hiện có sẽ mất hiệu lực" đậm đỏ (câu theo web gie)
   demo NDKK: 1.71 – 1.77 khối xem lại theo web; 1.78 kiểm tra khi Xác nhận; 1.80 Đang xác nhận…, thông báo kết quả; 1.81 chỉ xem sau xác nhận (p.ro); 1.95 khóa chéo với Lưu nháp;
   p.don – loại việc mẫu; p.tc – tổ chức; p.daiDien – có người đại diện; p.taiDon – tệp đơn có sẵn (hoặc 'chua'); p.khongTep; p.ben – 'rong'; p.thieu – còn bước thiếu; p.xnLoi; p.toa – tòa án đã chọn */
var PS_ROWS = [['Niêm yết trên sàn chứng khoán', 'Có'], ['Loại hình kinh doanh', 'Doanh nghiệp'], ['Quy mô', 'Vừa'], ['Lĩnh vực', 'Thương mại'], ['Ngành kinh tế', 'G. BÁN BUÔN VÀ BÁN LẺ; SỬA CHỮA Ô TÔ, MÔ TÔ, XE MÁY VÀ XE CÓ ĐỘNG CƠ KHÁC'], ['Đặc điểm', 'Chủ nợ không có bảo đảm']];
/* v537 (NDKK 1.77, PA A): mở bảng thì tải danh sách tòa án – đang tải ẩn danh sách, giữa bảng vòng quay + "Đang tải danh sách tòa án…"; p.taiToa 'luon' – màn trạng thái giữ đang tải */
function ChonToaAn(p) {
  var o = React.useState(!!p.moToa), q = React.useState(''), tai = React.useState(!!p.moToa), anchor = React.useRef(null), host = useHost(anchor);
  React.useEffect(function () { if (!o[0] || p.taiToa === 'luon') return; tai[1](true); var t = setTimeout(function () { tai[1](false); }, 700); return function () { clearTimeout(t); }; }, [o[0]]);
  var loc = TOA_DS.filter(function (x) { return khop(q[0], x); });
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    h(T.SelectField, { label: 'Tòa án nhận đơn', labelVisible: true, required: true, placeholder: 'Chọn tòa án nhận đơn' /* theo mẫu SelSheet đã duyệt ở 1.29 */, value: p.v || undefined, open: o[0], disabled: !!p.ro, error: p.loi || undefined, onClick: function () { q[1](''); o[1](true); } }),
    o[0] && host ? h(LvSheet, { host: host, title: 'Tòa án nhận đơn', chon: true /* v568 (lỗi 2): đang tải vẫn có "Áp dụng", khóa */, onClose: function () { o[1](false); },
      top: !tai[0] && TOA_DS.length > 10 ? h('div', { className: 'fx-search' }, Tf('Tìm', { icon: 'search', placeholder: 'Nhập để tìm', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })) : null },
      tai[0] ? h('div', { className: 'ph-toa-tai', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), h('span', null, 'Đang tải danh sách tòa án…'))
        : loc.length ? h(LvRows, { label: 'Tòa án nhận đơn', cur: p.v, items: loc.map(function (x) { return { id: x, name: x }; }), onPick: function (x) { p.onChange(x); o[1](false); } })
        : h('p', { className: 'ph-lv-empty' }, 'Không có mục khớp «' + q[0] + '».')) : null);
}
function XemLaiScreen(p) {
  p = p || {};
  var cf = React.useState(!!p.lai), anchor = React.useRef(null), host = useHost(anchor), b = ndNghe();
  var toa = React.useState(p.toa != null ? p.toa : p.ro ? COURT1 : ND_ST.toa || ''), cam = React.useState(!!p.ro), kt = !!b.kt6;
  React.useEffect(function () { if (NDB.kt6) ndbDat('kt6', false); }, []);
  React.useEffect(function () { ND_ST.toa = toa[0]; }, [toa[0]]);
  var d = p.don || ND_DON, ten = ndTen(d), tc = p.tc != null ? !!p.tc : laTC(), ps = ndPhaSan(d);
  if (!p.thieu && ND_ST.mode !== 'file' && !String(ND_ST.tt || '').trim()) { ND_ST.td = ND_ST.td || '15-03-2025'; ND_ST.tt = ND_TT_MAU; if (!YC_ST.rows.some(function (x) { return x.nd; })) YC_ST.rows = YC_MAU.map(function (x) { return Object.assign({}, x); }); }
  var tTen = (THU_TUC.filter(function (x) { return x.k === d.tt; })[0] || {}).ten || '—';
  var lvRows = [['Ngày làm đơn', '02-11-2026'], ['Loại thủ tục', tTen]].concat(lvTheoTT(d.tt).length && d.lv ? [['Lĩnh vực', lvTen(d.lv)]] : [], [['Loại việc', lvTenViec(d.v) || '—']], d.ct ? [['Loại việc chi tiết', d.ct]] : []); /* 1.74 */
  var ddPl = ['Người đại diện pháp lý', 'Nguyễn Văn B · CCCD: 001085000123'];
  var nk = tc ? h(Sum, { no: 1, ten: ACC_TC.ten, sub: 'Mã số thuế: ' + ACC_TC.mst, open: true, cuon: false }, /* 1.72 */
      RvKV([['Mã số thuế', ACC_TC.mst], ['Địa chỉ trụ sở', ACC_TC.truSo]].concat(ps ? PS_ROWS : [], [['Người đại diện', NDPL[0].ten + ' · CCCD: ' + NDPL[0].so + ' · ' + NDPL[0].cv]], p.daiDien ? [ddPl] : [])))
    : h(Sum, { no: 1, ten: 'Hoàng Dương', sub: 'Số CCCD: 001090012345', open: true, cuon: false }, /* 1.71 */
      RvKV([['Số điện thoại', '0912345678'], ['Địa chỉ thư điện tử', 'nguyen.minh.an@example.com'], ['Địa chỉ thường trú', 'Số 8 Phạm Hùng, Phường Từ Liêm, Thành phố Hà Nội']].concat(ps ? [['Đặc điểm', 'Chủ nợ không có bảo đảm']] : [], p.daiDien ? [ddPl] : [])));
  var bkTen = ps ? 'Công ty TNHH Thương mại Hoàng Long' : 'Trần Văn Bình';
  var ben = p.ben === 'rong' ? RvKV([[ten[1], h('span', null, '—')]]) /* 1.73 */ : h(F, null, h('p', { className: 'dm-meta' }, '1 ' + thuongDau(ten[1]) + ' · 1 người liên quan · 1 người làm chứng'),
    h(Sum, { no: 1, ten: bkTen, sub: ten[1], open: true, cuon: false }, RvKV(ps ? [['Loại ' + thuongDau(ten[1]), 'Tổ chức'], ['Tên tổ chức', bkTen]] : [['Loại ' + thuongDau(ten[1]), 'Cá nhân'], ['Họ và tên', bkTen]])),
    h(Sum, { no: 2, ten: 'Nguyễn Thị Lan', sub: 'Người liên quan', open: true, cuon: false }, RvKV([['Mối quan hệ / Lý do liên quan', 'Vợ của người bị kiện, cùng ký giấy nhận nợ'], ['Địa chỉ thường trú', 'Số 15 Nguyễn Trãi, Phường Thanh Xuân, Thành phố Hà Nội']])),
    h(Sum, { no: 3, ten: 'Phạm Văn Hùng', sub: 'Người làm chứng', open: true, cuon: false }, RvKV([['Địa chỉ', 'Phường Đống Đa, Thành phố Hà Nội'], ['Nội dung có thể làm chứng', 'Chứng kiến việc giao nhận tiền vay ngày 15-03-2025']])));
  var don = p.taiDon !== undefined ? p.taiDon : ND_ST.mode === 'file' ? (ND_ST.doc || 'chua') : null; /* 1.75 */
  var ndKhoi = don ? (don === 'chua' ? RvKV([['Đơn khởi kiện (tải lên)', 'Chưa tải lên tệp']]) /* 1.75 (người dùng 21/11): tệp đơn có nút Xem như tài liệu đính kèm */ : h('ul', { className: 'ph-rvdoc' }, h('li', null, h('div', null, h('b', null, don.ten), h('small', null, don.tep + ' · ' + don.loai)), IcoBtn('eye', 'Xem ' + don.tep)))) : h(RvNoiDung);
  var tl = p.khongTep ? [] : RV_TL; /* 1.76 */
  function xacNhan() {
    if (NDB.luu || NDB.xn) return; /* 1.95: đang lưu nháp thì không xác nhận */
    if (p.thieu) { /* 1.78: kiểm tra lần lượt Bước 1 → 6, chuyển tới bước đầu tiên còn thiếu */
      ND_ST.mode = 'nhap'; ND_ST.td = ''; ND_ST.tt = ''; YC_ST.rows = [{ nd: '', gt: '', mt: '' }];
      window.__ptGo('sub4Thieu'); return;
    }
    if (kt1().length) { window.__ptGo('sub1d'); return; }
    if (!toa[0] || !cam[0]) { ndbDat('kt6', true); ktCuon(anchor.current && anchor.current.closest('.ph')); return; } /* 1.18: không thông báo nổi */
    cf[1](true);
  }
  function dongY() { /* 1.80 */
    ndbDat('xn', true);
    setTimeout(function () {
      ndbDat('xn', false);
      if (p.xnLoi) { cf[1](false); window.__ptSnackLoi('Xác nhận đơn thất bại. Vui lòng thử lại.'); return; } /* 1.80 (người dùng 21/11): thất bại thì đóng hộp xác nhận */
      cf[1](false); window.__ptGo('reset:home,sub7'); /* 1.80 (người dùng 21/11): bỏ thanh báo thành công từ đáy */
    }, 900);
  }
  var body = h(F, null, h('span', { ref: anchor, hidden: true }),
    FCard('Xem lại và xác nhận', h(F, null, /* v557 (người dùng 23/11): "xác nhận" viết thường */
      /* v555 (người dùng 23/11 chọn PA B): cảnh báo khối vàng có biểu tượng, dòng đầu đậm */
      /* v562 (người dùng 23/11): đơn đã xác nhận / đã có chữ ký số (p.ro – chỉ xem, p.lai – đơn đã có người ký) thì ẩn cảnh báo */
      p.ro || p.lai ? null : h('div', { className: 'kytc-ban', role: 'note' }, h(T.Icon, { name: 'alert' }), h('span', { className: 'kytc-ban-2' }, h('b', null, 'Kiểm tra lại toàn bộ thông tin trước khi xác nhận đơn.'), h('span', null, 'Sau khi xác nhận, đơn chuyển sang bước Ký số — chỉ khi đủ chữ ký mới nộp được đến Tòa án.'))),
      h(RvKhoi, { t: 'Loại việc', go: 'sub1d', ro: p.ro }, RvKV(lvRows)),
      h(RvKhoi, { t: 'Thông tin ' + thuongDau(ten[0]), go: 'sub2', ro: p.ro }, h('p', { className: 'dm-meta' }, '1 ' + thuongDau(ten[0])), nk),
      h(RvKhoi, { t: 'Thông tin ' + thuongDau(ten[1]), go: 'sub3', ro: p.ro }, ben),
      h(RvKhoi, { t: 'Nội dung đơn', go: 'sub4', ro: p.ro }, ndKhoi), /* v327: theo web – Thời điểm phát sinh, Tóm tắt sự việc, Căn cứ pháp lý, Yêu cầu n, Tổng giá trị kê khai */
      /* 1.76 (người dùng 21/11): không có tệp thì ẩn cả khối */ tl.length ? h(RvKhoi, { t: 'Tài liệu đính kèm (' + tl.length + ' tệp)', go: 'sub5', ro: p.ro }, h('ul', { className: 'ph-rvdoc' }, tl.map(function (x) {
        return h('li', { key: x[1] }, h('div', null, h('b', null, x[0]), h('small', null, x[1])), IcoBtn('eye', 'Xem ' + x[0]));
      }))) : null), true),
    FCard('Gợi ý tòa án có thẩm quyền', h(F, null, /* v556 (người dùng 23/11): bỏ câu mô tả */
      h(ChonToaAn, { v: toa[0], ro: p.ro, taiToa: p.taiToa, moToa: p.moToa, loi: kt && !toa[0] ? 'Vui lòng chọn tòa án nhận đơn.' : null, onChange: toa[1] })), true), /* 1.77 */
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { label: 'Tôi xác nhận những thông tin trên là chính xác và hoàn toàn chịu trách nhiệm pháp lý về nội dung đơn khởi kiện này.', checked: cam[0], disabled: !!p.ro, className: kt && !cam[0] ? 'tp-check-err' : undefined, onChange: function (e) { cam[1](e.target.checked); } })),
    cf[0] && host ? ReactDOM.createPortal(h(ConfirmDel, { illo: ['nopDon', 'alert'], icon: 'alert', tone: 'warn', extra: p.lai ? h('p', { className: 'dm-cf-mk' }, h(T.Icon, { name: 'alert' }), h('span', null, 'Danh sách đương sự phía nguyên đơn đã thay đổi so với lần xác nhận trước và đã có người ký —', h('strong', null, ' toàn bộ chữ ký hiện có sẽ mất hiệu lực'), ' và cần ký lại từ đầu.')) : null, title: 'Xác nhận đơn?', desc: 'Bạn có chắc chắn xác nhận? Xác nhận sẽ không chỉnh sửa được thông tin đơn nữa — chỉ còn thực hiện ký số rồi nộp đơn.',
      yes: 'Đồng ý', yesDang: 'Đang xác nhận…', dang: b.xn, onNo: function () { cf[1](false); }, onYes: dongY }), host) : null);
  var nut = p.ro ? Btn(h(F, null, 'Tiếp tục', h(T.Icon, { name: 'chevronRight' })), 'primary', { className: 'pt-chk', onClick: function () { window.__ptGo('replace:sub7'); } })
    : Btn(h(F, null, h(T.Icon, { name: 'checkCircle' }), 'Xác nhận'), 'primary', { className: 'ph-xn', disabled: b.luu, onClick: xacNhan });
  return Submit(6, body, nut, null, { ro: p.ro, luuLoi: p.luuLoi });
}
function Sub6() { return h(XemLaiScreen); }
function Sub6Lai() { return h(XemLaiScreen, { lai: true }); } /* v328: màn xem nhanh – xác nhận lại đơn đã có người ký */
/* bước 7 – Ký số (phương án A theo web, chốt 02/11/2026; chỉnh 02/11/2026): khối "Ký số" (nhãn Chưa ký số / Đã ký số) – mô tả theo web, "Đơn khởi kiện" + nút xem chỉ biểu tượng xám, người cần ký (số thứ tự tròn, tên, vai trò) + nút Ký số;
   khối "Tài liệu đính kèm (n tệp)" – tên tài liệu, tên tệp, nút xem chỉ biểu tượng; "Nộp đơn" (không biểu tượng) khóa tới khi ký đủ; không còn Lưu nháp.
   Ký số → bảng từ đáy "Ký số hồ sơ (n tệp)" (theo ảnh web): danh sách tệp (đồng hồ = chưa ký), danh sách nhà cung cấp chữ ký số (CA) chọn một, Đóng / Ký (khóa tới khi chọn CA);
   Ký → đơn chuyển "Đã ký số", người ký "Đã ký lúc …", tài liệu "Đã ký", mở "Nộp đơn" (→ Nộp đơn thành công) */
var KY_TL = [['Di chúc / Giấy chứng tử', 'di-chuc-nguyen-van-a.pdf'], ['Tài liệu bổ sung', 'bien-nhan-chuyen-khoan.pdf']];
var KY_TEP = ['VA-DS-5.pdf', 'di-chuc-nguyen-van-a.pdf', 'bien-nhan-chuyen-khoan.pdf'];
var KY_CA = ['Bkav CA', 'CA2', 'FPT CA', 'MISA CA', 'VNPT CA', 'Viettel CA'];
var KY_LUC = 'Đã ký lúc 02-11-2026 10:30';
/* v235 (04/11/2026): mobile không có USB ký số – bảng ký chỉ còn "Ký số từ xa": chọn nhà cung cấp (chọn sẵn chứng thư mặc định VNPT CA),
   bấm Ký → bước chờ xác nhận trên ứng dụng ký số của nhà cung cấp (5 phút) → "Tôi đã xác nhận" hoàn tất ký
   demo NDKK (p.nd – chỉ bảng ký của Nộp đơn khởi kiện): 1.87 trạng thái từng tệp + mã tệp, "Ký lại", rỗng, đang tải / lỗi danh sách nhà cung cấp; 1.88 "Ghi nhớ lựa chọn này";
   1.89 tư cách ký + chọn người đại diện ký (tổ chức); 1.91 thông báo kết quả: p.kq = 'phan' | 'het' | 'khongTra', p.ban – hồ sơ đang có người khác ký */
var KY_MD = 'VNPT CA';
/* v537 (NDKK 1.91, như web): lỗi ký – 'khongTra' khung vàng 1 câu; "Không ký được" (PA B) khung vàng tiêu đề đậm + câu theo mã lỗi web: CA_TU_CHOI / CA_LOI / lỗi khác */
var KY_KQ = { het: 'Hết thời gian chờ xác nhận từ ứng dụng chữ ký số — vui lòng ký lại.', khongTra: 'Không tra được trạng thái ký số — vui lòng ký lại.',
  tuChoi: { t: 'Không ký được', m: 'Yêu cầu ký đã bị từ chối trên ứng dụng chữ ký số.' }, caLoi: { t: 'Không ký được', m: 'Nhà cung cấp chữ ký số báo lỗi khi xử lý yêu cầu — vui lòng ký lại.' },
  loiKhac: { t: 'Không ký được', m: 'Không thể hoàn tất ký số do lỗi hệ thống — vui lòng ký lại.' } };
/* v540 (NDKK, phiên fork 22/11, PA B – như web chon-chu-ky-so-phien.tsx): phiên ký còn hạn khi đóng hẳn bảng – mở lại thì báo "Hồ sơ đang có người khác ký — còn khoảng mm:ss" */
var KY_PHIEN = { han: 0, xong: 0, nd: false, ai: null };
/* v568 (phiên fork 23/11, lỗi 3): phiên ký của Bước 7 – xong: lúc ứng dụng ký số xác nhận (mô phỏng 6 giây sau khi bấm Ký), ai: ô ký (cn | dd | tc) */
function kyPhienXoa() { KY_PHIEN.han = 0; KY_PHIEN.xong = 0; KY_PHIEN.nd = false; KY_PHIEN.ai = null; }
function KySheet(p) {
  var nd = !!p.nd, tep = p.rong ? [] : (p.tep || KY_TEP);
  var ca = React.useState(KY_MD), buoc = React.useState(p.choSan ? 'cho' : 'chon'), nho = React.useState(false), lan = React.useState(p.kqSan ? 1 : 0), tt = React.useState({}), kyLoi = React.useState(p.kqSan ? KY_KQ[p.kqSan] : ''), caTr = React.useState(p.caTrang || ''), ddv = React.useState(''), dang = React.useState(false), daKyLan = React.useState(!!p.choSan); /* v572: như web daTungKy – đã bấm Ký một lần thì nút thành "Ký lại" */
  /* v538 (NDKK 1.90, như web components/ky-so/xac-nhan-ky-so.tsx): bước chờ "Xác thực ký số" – đếm ngược thật 5 phút dạng mm:ss (PA B), tự kiểm tra trạng thái mỗi 3 giây ("kiểm tra lúc HH:mm:ss"), bỏ "Tôi đã xác nhận";
     Đóng / Gửi lại (khóa + vòng quay khi đang chờ). Mô phỏng: ứng dụng ký số xác nhận sau 2 lần kiểm tra (6 giây) → bảng tự đóng; p.choSan – màn trạng thái giữ chờ; hết 5 phút → "Hết thời gian chờ…" + Ký lại như 1.91 */
  var han = React.useRef(p.choSan ? Date.now() + 300000 : 0), bayGio = React.useState(Date.now()), ktLuc = React.useState(Date.now()), batLuc = React.useRef(p.choSan ? Date.now() : 0);
  /* v540 (PA B): phiên ký (dangCho) tách khỏi màn đang xem (buoc) – "Đóng" ở bước chờ về bảng chọn nhà cung cấp, phiên vẫn chạy, vẫn tự kiểm tra; đóng hẳn bảng khi phiên còn hạn thì lưu hạn (KY_PHIEN) */
  var dangCho = React.useState(!!p.choSan), dangRef = React.useRef(!!p.choSan); dangRef.current = dangCho[0];
  var banHan = React.useRef(p.ban ? Date.now() + 252000 : KY_PHIEN.han > Date.now() ? KY_PHIEN.han : 0);
  React.useEffect(function () { return function () { if (dangRef.current) { KY_PHIEN.han = han.current; KY_PHIEN.nd = nd; KY_PHIEN.ai = p.ai || null; KY_PHIEN.xong = p.choSan ? 0 : batLuc.current + 6000; } }; }, []); /* v568: lưu cả lúc xác nhận và ô ký để Bước 7 theo dõi */
  React.useEffect(function () { if (!banHan.current) return; var t = setInterval(function () { var n = Date.now(); bayGio[1](n); if (n >= banHan.current) { banHan.current = 0; clearInterval(t); } }, 1000); return function () { clearInterval(t); }; }, []);
  function batDauCho() { var n = Date.now(); han.current = n + 300000; batLuc.current = n; kyPhienXoa(); bayGio[1](n); ktLuc[1](n); kyLoi[1](''); daKyLan[1](true); dangCho[1](true); buoc[1]('cho'); }
  function hetPhien() { dangCho[1](false); kyPhienXoa(); }
  function hhmmss(ms) { var d = new Date(ms); return [d.getHours(), d.getMinutes(), d.getSeconds()].map(function (n) { return ('0' + n).slice(-2); }).join(':'); }
  var dsDd = tcDaiDien().map(function (n) { return n.ten + ' · ' + tcChucVu(n); });
  var canDd = nd && p.tuCach === 'DAI_DIEN', ddSan = !canDd || (!p.ddTrang && !!ddv[0]);
  var banOn = !!banHan.current && banHan.current > bayGio[0], banGiay = banOn ? Math.ceil((banHan.current - bayGio[0]) / 1000) : 0, banMmss = ('0' + Math.floor(banGiay / 60)).slice(-2) + ':' + ('0' + banGiay % 60).slice(-2);
  var sanSang = !!ca[0] && !caTr[0] && tep.length && ddSan && !banOn && !dangCho[0];
  function xong() {
    hetPhien();
    if (!nd) { p.onKy(); return; }
    var kq = lan[0] === 0 ? p.kq : null;
    (function () {
      if (kq === 'phan') { var o = {}; tep.forEach(function (f, i) { o[f] = i < tep.length - 1 ? 'da' : 'loi'; }); tt[1](o); lan[1](1); buoc[1]('chon'); kyLoi[1]('Chỉ ký được ' + (tep.length - 1) + '/' + tep.length + ' tệp — vui lòng ký lại phần còn thiếu.'); return; } /* 1.91 (người dùng 21/11): lỗi ký hiện banner trong bảng */
      if (kq && KY_KQ[kq]) { lan[1](1); buoc[1]('chon'); kyLoi[1](KY_KQ[kq]); return; }
      if (nho[0]) KY_MD = ca[0];
      p.onKy(); /* 1.91: bỏ thanh báo thành công như 1.80 */
    })();
  }
  React.useEffect(function () {
    if (!dangCho[0]) return;
    var t1 = setInterval(function () { var n = Date.now(); bayGio[1](n); if (han.current && n >= han.current) { dung(); hetPhien(); lan[1](1); buoc[1]('chon'); kyLoi[1](KY_KQ.het); } }, 1000);
    var t2 = setInterval(function () { ktLuc[1](Date.now()); }, 3000);
    var t3 = p.choSan ? null : setTimeout(function () { dung(); xong(); }, 6000);
    function dung() { clearInterval(t1); clearInterval(t2); clearTimeout(t3); }
    return dung;
  }, [dangCho[0]]);
  var conGiay = han.current ? Math.max(0, Math.ceil((han.current - bayGio[0]) / 1000)) : 300, mmss = ('0' + Math.floor(conGiay / 60)).slice(-2) + ':' + ('0' + conGiay % 60).slice(-2);
  var foot = buoc[0] === 'chon' ? h(F, null, h(T.Button, { variant: 'tonal', onClick: p.onClose }, 'Đóng'), h(T.Button, { disabled: !sanSang, loading: dangCho[0], className: 'pt-chk', onClick: batDauCho }, (nd && lan[0]) || daKyLan[0] ? 'Ký lại' : 'Ký'))
    : h(F, null, h(T.Button, { variant: 'secondary', onClick: function () { buoc[1]('chon'); } }, 'Đóng'), h(T.Button, { loading: true, disabled: true, title: 'Chỉ gửi lại được sau khi phiên hiện tại kết thúc' }, 'Gửi lại'));
  /* v572 (người dùng 23/11 "làm theo web" – chon-chu-ky-so-phien.tsx TrangThaiIcon coPhien + docId): đang trong phiên ký thì tệp chưa ký hiện vòng quay + mã tệp, không hiện lỗi của lượt trước */
  var dsTep = h('ul', { className: 'ph-ky-files' }, tep.length ? tep.map(function (f, i) {
    var s0 = tt[0][f] || 'cho', s = dangCho[0] && s0 !== 'da' ? 'dang' : s0;
    return h('li', { key: f, className: 'ph-ky-f-' + s }, s === 'dang' ? h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }) : h(T.Icon, { name: s === 'da' ? 'checkCircle' : s === 'loi' ? 'alert' : 'clock' }), h('span', { className: 'ph-ky-ft' }, f),
      (nd && lan[0]) || dangCho[0] ? h('span', { className: 'ph-ky-ma' }, '[Mã tệp]') : null,
      s === 'loi' ? h('small', { className: 'ph-ky-fl' }, 'Không ký được tệp này — vui lòng ký lại.') : null);
  }) : h('li', { className: 'ph-ky-rong' }, 'Không có tệp nào cần ký.'));
  var dsCa = caTr[0] === 'tai' ? h('p', { className: 'ph-ky-tt', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), 'Đang tải danh sách nhà cung cấp chứng thư số…')
    : caTr[0] === 'loi' ? h('div', { className: 'ph-ky-caloi', role: 'alert' }, h('p', null, 'Không tải được danh sách nhà cung cấp chứng thư số.') /* 1.26: không biểu tượng */, h(T.Button, { variant: 'secondary', size: 'sm', className: 'pt-chk', onClick: function () { caTr[1](''); } }, 'Thử lại'))
    : h('ul', { className: 'ph-ca', role: 'radiogroup', 'aria-label': 'Nhà cung cấp chữ ký số' }, KY_CA.map(function (c) {
      var on = ca[0] === c;
      return h('li', { key: c }, h('button', { type: 'button', role: 'radio', 'aria-checked': on, className: 'ph-ca-it' + (on ? ' ph-ca-on' : ''), onClick: function () { ca[1](c); } },
        h('span', { className: 'ph-ca-logo', 'aria-hidden': 'true' }, h(T.Icon, { name: 'shield' })), h('b', null, c), c === KY_MD ? h('span', { className: 'ph-ca-md' }, 'Mặc định') : null, on ? h(T.Icon, { name: 'check', className: 'ph-ca-ok' }) : null));
    }));
  var tuCach = nd && p.tuCach ? h('div', { className: 'ph-ky-tc' }, h('p', { className: 'ph-ky-lb' }, 'Tư cách ký'),
      h('span', { className: 'ph-ky-tcv' }, h(T.Icon, { name: p.tuCach === 'TO_CHUC' ? 'building' : 'user' }), p.tuCach === 'TO_CHUC' ? KYTC_TC : KYTC_DD),
      canDd ? (p.ddTrang === 'loi' ? h('p', { className: 'q2-err', role: 'alert' }, 'Không tải được danh sách người đại diện. Vui lòng đóng cửa sổ và thử lại.') /* 1.26: lỗi không biểu tượng */
        : p.ddTrang === 'tai' ? h('p', { className: 'ph-ky-tt', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), 'Đang tải danh sách người đại diện…')
        : h(ChonDs, { label: 'Người đại diện ký', req: true, ds: dsDd, v: ddv[0], onChange: ddv[1] })) : null) : null; /* v571 (người dùng 23/11): quay lại bảng ký từ "Xác thực ký số" (Đóng), hết hạn hoặc lỗi ký → ô vẫn hiện người đã chọn */
  return h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-co-sheet ph-ky-sheet' }, h('div', { className: 'ph-scrim', onClick: p.onClose }),
    h('div', { className: 'tp-dlg tp-dlg-sheet', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'ph-ky-t' },
      h('div', { className: 'tp-dlg-head' }, h('h3', { id: 'ph-ky-t' }, buoc[0] === 'chon' ? 'Ký số từ xa (' + tep.length + ' tệp)' : 'Xác thực ký số'), h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Đóng', onClick: p.onClose }, h(T.Icon, { name: 'x' }))),
      buoc[0] === 'chon' ? h('div', { className: 'tp-dlg-body ph-ky-body' },
        dsTep,
        kyLoi[0] ? h('p', { className: 'kytc-ban', role: 'alert' }, h(T.Icon, { name: 'alert' }), typeof kyLoi[0] === 'string' ? h('span', null, kyLoi[0]) : h('span', { className: 'kytc-ban-2' }, h('b', null, kyLoi[0].t), kyLoi[0].m)) : null,
        dangCho[0] ? h('p', { className: 'ph-ky-tt ph-ky-dcho', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), 'Đang chờ xác nhận trên ứng dụng ' + ca[0] + ' — còn ' + mmss + ' · kiểm tra lúc ' + hhmmss(ktLuc[0])) : null, /* v540 PA B */
        banOn ? h('p', { className: 'kytc-ban', role: 'status' }, h(T.Icon, { name: 'alert' }), h('span', null, 'Hồ sơ đang có người khác ký — còn khoảng ' + banMmss + ', vui lòng chờ rồi thử lại.')) : null, /* v540 PA B: đếm ngược thật, hết phiên thì tắt */
        /* v572 (người dùng 23/11 "làm theo web" – chon-chu-ky-so-phien.tsx điều kiện !phienId): đang trong phiên ký thì ẩn Tư cách ký + Người đại diện ký, nhà cung cấp, Ghi nhớ, câu ghi chú; phiên kết thúc (hết giờ, lỗi) thì hiện lại, giữ lựa chọn cũ */
        dangCho[0] ? null : h(F, null,
          tuCach,
          h('p', { className: 'ph-ky-lb' }, 'Nhà cung cấp chữ ký số'),
          dsCa,
          nd && !caTr[0] && ca[0] !== KY_MD ? h(T.Checkbox, { label: 'Ghi nhớ lựa chọn này', checked: nho[0], className: 'ph-ky-nho', onChange: function (e) { nho[1](e.target.checked); } }) : null,
          h('p', { className: 'ph-ky-note' }, h(T.Icon, { name: 'info' }), 'Ứng dụng di động chỉ hỗ trợ ký số từ xa. Sau khi bấm Ký, mở ứng dụng ký số của nhà cung cấp để xác nhận.')))
      : h('div', { className: 'tp-dlg-body ph-ky-body ph-ky-cho' },
        h('span', { className: 'ph-ky-ic', 'aria-hidden': 'true' }, h('svg', { className: 'tp-ico', viewBox: '0 0 24 24', 'aria-hidden': 'true' }, h('path', { d: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z' }), h('path', { d: 'm9 12 2 2 4-4' }))),
        h('p', null, 'Vui lòng mở ứng dụng ', h('b', null, ca[0]), ' trên điện thoại để xác thực. Nhấn “Xác nhận” trên ứng dụng để hoàn tất quá trình ký số.'),
        h('span', { className: 'tdB-pill', role: 'status' }, h(T.Icon, { name: 'clock' }), 'Còn ' + mmss + ' để xác nhận · kiểm tra lúc ' + hhmmss(ktLuc[0])),
        h('p', { className: 'ph-ky-cho-gc' }, 'Hệ thống đang chờ xác nhận từ ứng dụng chữ ký số — chỉ gửi lại được sau khi phiên hiện tại kết thúc.')),
      h('div', { className: 'tp-dlg-foot' }, foot)));
}
/* demo NDKK: 1.83 p.tai / p.loi / p.ban (cá nhân); 1.84 p.chuaTep / p.chuaXn; 1.85 – 1.86 p.nhom (ô ký theo đương sự), p.khongDd / p.hetDd (tổ chức); 1.87 – 1.91 bảng ký: p.kq, p.caTrang, p.rong, p.banKy, p.ddTrang;
   1.92 Nộp đơn: "Đang gửi…", p.guiLoi – gửi thất bại; p.daKy – đã ký đủ */
function KySoScreen(p) {
  var ten = ndTen(), dongTu = cumDong(ten[0]);
  var ky = React.useState(!!p.daKy), sh = React.useState(p.sheet ? { ai: p.sheetAi || 'cn' } : null), anchor = React.useRef(null), host = useHost(anchor);
  var dd = React.useState(!!p.daKy), tc = React.useState(!!p.daKy), gui = React.useState(false), tcz = !!p.toChuc;
  /* v542 (1.85, như web tien-do-ky-to-chuc.tsx – nhóm theo đương sự): đăng nhập tài khoản tổ chức thì nhóm của mình là tổ chức "cần 2 chữ ký" (ô đại diện trước, ô tổ chức sau) */
  var nhom = p.nhom && laTC() ? p.nhom.map(function (g) { return g.toi ? { ten: ACC_TC.ten, tc: true, toi: true } : g; }) : p.nhom;
  var nhomTc = !!nhom && nhom.some(function (g) { return g.toi && g.tc; }), kyTc = tcz || nhomTc;
  var conCho = nhom ? nhom.some(function (g) { return g.toi ? g.tc && !(dd[0] && tc[0]) : g.tc || !g.daKy; }) : false;
  var da = (tcz ? dd[0] && tc[0] : nhomTc ? true : ky[0]) && !conCho;
  /* v568 (phiên fork 23/11, lỗi 3 – như web step-7.tsx / tien-do-ky-to-chuc.tsx khoaChung): đóng hẳn bảng ký khi phiên còn hạn → khung vàng "Hồ sơ đang có người ký…", "Ký số" khóa;
     ứng dụng ký số xác nhận (mô phỏng 6 giây sau khi bấm Ký) → "Đã ký"; hết phiên → khung tắt, "Ký số" mở lại */
  var phien = React.useState(function () { return !!KY_PHIEN.nd && KY_PHIEN.han > Date.now(); });
  React.useEffect(function () {
    if (sh[0]) return;
    function kt() {
      var n = Date.now();
      if (!KY_PHIEN.nd || !KY_PHIEN.han) { phien[1](false); return true; }
      if (KY_PHIEN.xong && n >= KY_PHIEN.xong && n < KY_PHIEN.han) { var ai = KY_PHIEN.ai; kyPhienXoa(); phien[1](false); (ai === 'tc' ? tc : ai === 'dd' ? dd : ky)[1](true); return true; }
      if (n >= KY_PHIEN.han) { kyPhienXoa(); phien[1](false); return true; }
      phien[1](true); return false;
    }
    if (kt()) return;
    var t = setInterval(function () { if (kt()) clearInterval(t); }, 1000);
    return function () { clearInterval(t); };
  }, [sh[0]]);
  var ban = !!p.ban || phien[0], khoa = ban || !!p.chuaTep;
  function moKy(ai) { sh[1]({ ai: ai }); }
  function nop() { /* 1.92 */
    gui[1](true);
    setTimeout(function () { gui[1](false); if (p.guiLoi) { window.__ptSnackLoi('Gửi đơn thất bại. Vui lòng thử lại.'); return; } window.__ptGo('replace:success'); /* 1.92 (người dùng 21/11): bỏ thanh báo thành công */ }, 900);
  }
  var cnRow = h('li', null, h('span', { className: 'ph-ky-no' }, '1'), h('div', null, h('b', null, 'Hoàng Dương'), h('small', null, ten[0]), ky[0] ? h('small', { className: 'ph-ky-da' }, KY_LUC) : null),
    ky[0] ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn', disabled: khoa, onClick: function () { moKy('cn'); } }, 'Ký số'));
  var khoiKy = !tcz && p.chuaXn ? h('p', { className: 'kytc-ban', role: 'status' }, h(T.Icon, { name: 'alert' }), h('span', null, 'Vui lòng bấm "Xác nhận" ở bước trước để tiếp tục.')) /* 1.84 (người dùng 21/11): banner vàng */
    : !tcz && p.tai ? h('p', { className: 'ph-ky-tt', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), 'Đang tải tiến độ ký…')
    : !tcz && p.loi ? h('p', { className: 'kytc-loi', role: 'alert' }, h(T.Icon, { name: 'alert' }), 'Không tải được tiến độ ký. Vui lòng thử lại.')
    : h(F, null,
      !tcz && ban ? h('p', { className: 'kytc-ban', role: 'status' }, h(T.Icon, { name: 'alert' }), h('span', null, 'Hồ sơ đang có người ký, hệ thống đang xử lý — vui lòng chờ rồi thử lại.')) : null,
      p.chuaTep ? h('p', { className: 'kytc-ban', role: 'status' }, h(T.Icon, { name: 'alert' }), h('span', null, 'Chưa có tệp đơn khởi kiện đã tải lên. Vui lòng quay lại bước "Nội dung" để tải lên.')) : null, /* 1.84: banner vàng */
      h('ul', { className: 'ph-ky' }, p.chuaTep ? null : h('li', null, h('div', null, h('b', null, 'Đơn khởi kiện')), IcoBtn('eye', 'Xem đơn')), tcz || nhom ? null : cnRow),
      nhom ? h(KyNhom, { nhom: nhom, daKy: ky[0], dd: dd[0], tc: tc[0], khoa: khoa, onKy: function () { moKy('cn'); }, onDD: function () { moKy('dd'); }, onTC: function () { moKy('tc'); } }) : null,
      tcz ? h(KyToChuc, { dd: dd[0], tc: tc[0], ban: ban, loi: p.loi, khongDd: p.khongDd, hetDd: p.hetDd, onDD: function () { moKy('dd'); }, onTC: function () { moKy('tc'); } }) : null);
  return Submit(7, h(F, null, h('span', { ref: anchor, hidden: true }),
    FCard('Ký số', h(F, null, /* v561 (người dùng 23/11): bỏ câu mô tả */ khoiKy), true, da ? 'signed' : 'unsigned'),
    FCard('Tài liệu đính kèm (' + KY_TL.length + ' tệp)', h('ul', { className: 'ph-ky' }, KY_TL.map(function (x) {
      return h('li', { key: x[1] }, h('div', null, h('b', null, x[0]), h('small', null, x[1])), da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : null, IcoBtn('eye', 'Xem ' + x[0]));
    })), true),
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { nd: true, ai: sh[0].ai, kq: p.kq, kqSan: p.kqSan, choSan: p.choSan, caTrang: p.caTrang, rong: p.rong, ban: p.banKy, ddTrang: p.ddTrang, tuCach: kyTc ? (sh[0].ai === 'tc' ? 'TO_CHUC' : 'DAI_DIEN') : null,
      onClose: function () { sh[1](null); }, onKy: function () { var ai = sh[0].ai; sh[1](null); if (kyTc) (ai === 'tc' ? tc : dd)[1](true); else ky[1](true); } }), host) : null),
    h(T.Button, { variant: 'primary', className: 'pt-chk', loading: gui[0], disabled: !da || gui[0], title: da ? undefined : 'Vui lòng ký số đủ trước khi nộp đơn', onClick: gui[0] ? undefined : nop }, gui[0] ? 'Đang gửi…' : 'Nộp đơn'));
}
function Sub7() { return h(KySoScreen, { toChuc: laTC() }); } /* v333 */
function SignDialog() { return h(KySoScreen, { sheet: true }); }
/* Nộp đơn thành công – phương án C (chọn 03/11/2026): chỉ gồm thông tin theo ảnh web; màn kết quả toàn trang, không header (không quay lại các bước đã nộp), nền trắng, nội dung giữa màn;
   Mã tiếp nhận / Thời điểm gửi / Trạng thái dạng nhãn trái – giá trị phải có kẻ như bước 6; đáy: "Xem tại Quản lý đơn" (đỏ) trên, "Về trang chủ" (viền) dưới. Mã và thời điểm là giá trị mẫu theo ảnh web */
function Success() {
  var rows = [['Mã tiếp nhận', h('span', { className: 'ph-ok-ma' }, '20261103002548')], ['Thời điểm gửi', '00:25:48 3/11/2026'], ['Trạng thái', h(T.StatusBadge, { tone: 'info', icon: false }, 'Đã gửi đơn')]];
  return h(Phone, { cls: 'ph-ok' },
    h(Body, { cls: 'ph-ok-b' },
      h('div', { className: 'ph-success' }, h('span', { className: 'ph-success-ico' }, h(T.Icon, { name: 'checkCircle' })), h('h2', null, 'Đã gửi đơn thành công'),
        P('Đơn khởi kiện của bạn đã được tiếp nhận trên Cổng dịch vụ tư pháp. Tòa án sẽ xem xét điều kiện thụ lý và phản hồi qua Hộp thư tống đạt.', 'ph-muted')),
      h('dl', { className: 'ph-rvkv ph-ok-rows' }, rows.map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0]), h('dd', null, r[1])); }))),
    h('div', { className: 'ph-col ph-ok-foot' }, Btn('Xem tại Quản lý đơn'), Btn('Về trang chủ', 'secondary')));
}

/* ===== Khung dùng chung cho các luồng nhiều bước (03/11/2026): trích lục, bản sao; khiếu nại, tố cáo; giao nộp tài liệu – cùng quy tắc Soạn đơn (header + thanh tiến trình, khối 100%) ===== */
/* gói màn có hook: f(k) chạy trong một component riêng */
var KNH_O = null; function KScr(p) { KNH_O = p.o || null; return p.f(p.k, p.o); } /* v458: KNH_O = tùy chọn màn đang vẽ (tố cáo tiếp) */
function NextGo(go) { return Btn(h(F, null, 'Tiếp theo', h(T.Icon, { name: 'chevronRight' })), 'primary', { 'data-pt-go': go }); }
function Wz(o) {
  var nx = o.last || (o.go ? NextGo(o.go) : Next());
  return h(Phone, { cls: 'ph-hd' },
    h('div', { className: 'ph-hd-step' }, h(T.AppBar, { variant: 'plain', title: o.title, onBack: noop, actions: o.save === false ? [] : [{ text: 'Lưu nháp' }] }),
      h(StepStrip, { cur: o.n, steps: o.steps })),
    h(Body, { cls: 'ph-plain ph-steps' + (o.cls ? ' ' + o.cls : '') }, o.body),
    h('div', { className: 'ph-foot' }, o.n === 1 ? Bar(nx) : Bar(Btn('Quay lại', 'tonal'), nx)));
}
/* màn một khối (không nhiều bước) theo kiểu khối 100% */
function SubS(title, body, footer) {
  return h(Phone, { cls: 'ph-hd' }, h(T.AppBar, { variant: 'plain', title: title, onBack: noop }), h(Body, { cls: 'ph-plain ph-steps' }, body), footer ? h('div', { className: 'ph-foot' }, footer) : null);
}
/* ô chọn → bảng từ đáy, danh sách dòng (phương án B); opts: chuỗi hoặc { id, name, desc }; ô tìm khi trên 10 mục */
function SelSheet(p) {
  var o = React.useState(false), q = React.useState(''), v = React.useState(p.v || ''), anchor = React.useRef(null), host = useHost(anchor);
  var items = p.opts.map(function (x) { return typeof x === 'string' ? { id: x, name: x } : x; }), cur = v[0];
  var kq = khongDau(q[0].trim()), loc = items.filter(function (x) { return !kq || khongDau(x.name + ' ' + (x.desc || '')).indexOf(kq) >= 0; }), ci = items.filter(function (x) { return x.id === cur; })[0];
  return h('div', { className: 'ph-selsh' }, h('span', { ref: anchor, hidden: true }),
    h(T.SelectField, { label: p.label, labelVisible: true, required: p.req, placeholder: p.ph || ('Chọn ' + p.label), value: ci ? ci.name : undefined, open: o[0], onClick: function () { q[1](''); o[1](true); } }),
    o[0] && host ? h(LvSheet, { host: host, title: p.title || 'Chọn ' + p.label.charAt(0).toLowerCase() + p.label.slice(1), onClose: function () { o[1](false); },
      top: items.length > 10 || p.search ? h('div', { className: 'fx-search' }, Tf('Tìm', { icon: 'search', placeholder: 'Nhập để tìm', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })) : null },
      loc.length ? h(LvRows, { label: p.label, cur: cur, items: loc, onPick: function (id) { v[1](id); if (p.onChange) p.onChange(id); o[1](false); } }) : h('p', { className: 'ph-lv-empty' }, 'Không có mục khớp «' + q[0] + '».')) : null);
}
/* thẻ chọn một trên màn (thẻ viền: tên đậm + mô tả), mục chọn viền đỏ nền đỏ nhạt */
function OptCards(p) {
  return h('ul', { className: 'ph-lv', role: 'radiogroup', 'aria-label': p.label }, p.items.map(function (x) {
    var on = p.cur === x.id;
    return h('li', { key: x.id }, h('button', { type: 'button', role: 'radio', 'aria-checked': on, className: 'ph-lv-item' + (on ? ' ph-lv-on' : '') + (x.off ? ' ph-lv-off' : ''), disabled: !!x.off, onClick: function () { p.onPick(x.id); } },
      h('span', { className: 'ph-lv-t' }, x.code ? h('span', { className: 'ph-lv-code' }, x.code) : null, x.t), x.d ? h('span', { className: 'ph-lv-d' }, x.d) : null));
  }));
}
function Lead(t) { return P(t, 'ph-muted'); }
function NoteBox(children) { return h('div', { className: 'ph-s1-note ph-note2' }, children); }
/* bộ đếm số lượng (− n +) */
function Dem(p) {
  var n = React.useState(p.v || 1);
  return h('div', { className: 'ph-dem-row' }, h('span', { className: 'ph-dem-l' }, p.label),
    h('div', { className: 'ph-dem', role: 'group', 'aria-label': p.label },
      h('button', { type: 'button', 'aria-label': 'Giảm số lượng', disabled: n[0] <= 1, onClick: function () { n[1](n[0] - 1); } }, '−'),
      h('b', { className: 'tp-num' }, n[0]),
      h('button', { type: 'button', 'aria-label': 'Tăng số lượng', onClick: function () { n[1](n[0] + 1); } }, '+')));
}
/* bước cuối: xem lại (nhãn trái – giá trị phải) + Ký số (bảng Ký số hồ sơ như bước 7) + tài liệu + cam đoan; nút gửi mở khi đã ký */
function KyGui(o) {
  var ky = React.useState(false), sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), da = ky[0];
  var tep = [o.donTep].concat(o.tl.map(function (d) { return d[1]; }));
  return Wz({ title: o.title, steps: o.steps, n: o.n, body: h(F, null, h('span', { ref: anchor, hidden: true }),
    FCard(o.rvTitle, h(F, null, o.rvDesc ? Lead(o.rvDesc) : null, RvKV(o.review)), true),
    FCard('Ký số', h(F, null, kyMoTa(o.moTa), /* v334 */
      h('ul', { className: 'ph-ky' },
        h('li', null, h('div', null, h('b', null, o.don)), IcoBtn('eye', 'Xem ' + o.don)),
        laTC() ? h(KyTcRows, { tep: tep, onXong: function () { ky[1](true); } }) /* v334 */ : h('li', null, h('span', { className: 'ph-ky-no' }, '1'), h('div', null, h('b', null, 'Hoàng Dương'), h('small', null, o.vaiTro), da ? h('small', { className: 'ph-ky-da' }, KY_LUC) : null),
          da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn', onClick: function () { sh[1](true); } }, 'Ký số')))), true, da ? 'signed' : 'unsigned'),
    o.tl.length ? FCard('Tài liệu đính kèm (' + o.tl.length + ' tệp)', h('ul', { className: 'ph-ky' }, o.tl.map(function (d) {
      return h('li', { key: d[1] }, h('div', null, h('b', null, d[0]), h('small', null, d[1])), da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : null, IcoBtn('eye', 'Xem ' + d[0]));
    })), true) : null,
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { label: o.camDoan })),
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: tep, onClose: function () { sh[1](false); }, onKy: function () { sh[1](false); ky[1](true); } }), host) : null),
    last: Btn(o.btn, 'primary', da ? { 'data-pt-go': 'replace:' + o.ok } : { disabled: true, title: 'Vui lòng ký số trước khi gửi' }) });
}
/* màn kết quả toàn trang (phương án C của Nộp đơn thành công) */
function KetQua(o) {
  return h(Phone, { cls: 'ph-ok' },
    h(Body, { cls: 'ph-ok-b' },
      h('div', { className: 'ph-success' }, h('span', { className: 'ph-success-ico' }, h(T.Icon, { name: 'checkCircle' })), h('h2', null, o.title), P(o.desc, 'ph-muted')),
      h('dl', { className: 'ph-rvkv ph-ok-rows' }, o.rows.map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0]), h('dd', null, r[1])); })),
      o.han ? h('div', { className: 'ph-ok-han' }, h(T.Icon, { name: 'clock' }), h('p', null, h('b', null, 'Thời hạn giải quyết: '), o.han)) : null),
    h('div', { className: 'ph-col ph-ok-foot' }, Btn(o.b1), Btn(o.b2, 'secondary')));
}
var NGUOI_ME = [['Họ và tên', 'Hoàng Dương'], ['Số định danh cá nhân', '001090012345'], ['Ngày sinh', '12-05-1990'], ['Giới tính', 'Nam']];

/* ===== Cấp trích lục, bản sao (theo web /trich-luc/moi – moi-yeu-cau.tsx, 03/11/2026): 4 bước ===== */
var TL_STEPS = ['Chọn bản án / quyết định', 'Loại và hình thức nhận', 'Tư cách người yêu cầu', 'Xem lại và gửi'];
var TL_TITLE = 'Cấp trích lục, bản sao';
/* vụ án mẫu của tài khoản và văn bản (bản án, quyết định) – dữ liệu mẫu */
var TL_VA = [{ ma: 'DS-2026-0012', ten: 'Tranh chấp hợp đồng vay tài sản', vt: 'Nguyên đơn', toa: COURT1, vb: [['BA', '45/2026/DS-ST', 'Bản án dân sự sơ thẩm', '20-10-2026'], ['QD', '[Số quyết định]', 'Quyết định công nhận sự thỏa thuận', '15-10-2026']] },
  { ma: 'DS-2026-0018', ten: 'Tranh chấp hợp đồng mua bán tài sản', vt: 'Bị đơn', toa: COURT1, vb: [['QD', '[Số quyết định]', 'Quyết định tạm đình chỉ giải quyết vụ án', '12-10-2026']] }];
var TL_MUC_DICH = ['Thi hành án', 'Làm thủ tục hành chính', 'Đăng ký hộ tịch', 'Khiếu nại, tố cáo', 'Lưu trữ cá nhân', 'Mục đích khác'];
var TL_LOAI_AN = ['Hình sự', 'Dân sự', 'Hôn nhân và gia đình', 'Kinh doanh, thương mại', 'Lao động', 'Hành chính', 'Phá sản', 'Sở hữu trí tuệ', 'Biện pháp xử lý hành chính', 'Phục hồi', 'Khiếu nại hành vi của người có thẩm quyền', 'Thi hành án'];
var TL_TU_CACH = ['Đương sự trong vụ án', 'Công dân quan tâm / Nghiên cứu học tập', 'Cơ quan báo chí / Truyền thông', 'Cơ quan nhà nước thực hiện công vụ', 'Đại diện theo ủy quyền'];
var TL_NAM = (function () { var a = []; for (var y = 2026; y >= 1990; y--) a.push(String(y)); return a; })();
var TL_TOA = [COURT1, 'Tòa án nhân dân khu vực 2 - Hà Nội', 'Tòa án nhân dân khu vực 3 - Hà Nội', 'Tòa án nhân dân Thành phố Hà Nội', '[Danh mục Tòa án – 403 đơn vị]'];
/* bước 1, nguồn "Từ vụ án của tôi": ô tìm, danh sách vụ án gập/mở, chọn văn bản → Loại sản phẩm cần cấp */
/* đối chiếu 1E.2 / 1E.3 (21/11/2026): tìm cả tên Tòa án; đang tải / lỗi / trống / không khớp + "Xóa bộ lọc"; dòng đếm + Mở rộng/Thu gọn tất cả; nhóm vụ án có nhãn trạng thái;
   "Bản án, quyết định thuộc vụ án" + "Cuộn để xem đầy đủ" (trên 3); dòng văn bản: số hiệu, nhãn loại, hiệu lực, tên · ngày, Tòa án, văn bản không cấp được hiện mờ;
   chọn văn bản → loại chọn sẵn, thẻ theo loại văn bản, mô tả 3 dòng, thẻ khóa kèm lý do */
function TlTuVuAn(p) {
  var q = React.useState(p.q0 || ''), d0 = p.sel ? tlTimVb(p.sel) : null;
  var mo = React.useState(function () { var o = {}; if (p.all) TLV.forEach(function (v) { o[v.ma] = true; }); else if (d0) o[d0.va.ma] = true; else if (TLV.length === 1) o[TLV[0].ma] = true; return o; });
  if (p.tai) return TlDang('Đang tải danh sách bản án, quyết định…');
  if (p.dsLoi) return TlLoi('Không tải được danh sách bản án, quyết định.');
  if (p.rong) return P('Bạn chưa có vụ án nào đã có bản án hoặc quyết định để cấp trích lục, bản sao. Bạn có thể dùng tab “Nhập thông tin bản án”.', 'ph-muted');
  var kq = khongDau(q[0].trim()), va = TLV.filter(function (v) { return !kq || khongDau([v.ma, v.ten].concat(v.vb.map(function (b) { return b.so + ' ' + b.ten + ' ' + b.toa; })).join(' ')).indexOf(kq) >= 0; });
  var tong = va.reduce(function (n, v) { return n + v.vb.length; }, 0), tatCa = va.length && va.every(function (v) { return mo[0][v.ma]; });
  var d = p.sel ? tlTimVb(p.sel) : null;
  function moTa(b) { return h(F, null, h('span', { className: 'tl-mt' }, [(b.l === 'QD' ? 'Quyết định' : 'Bản án') + ' số ' + b.so, 'ban hành ' + b.ngay, b.cap, b.hl].filter(Boolean).join(' · ')), h('span', { className: 'tl-mt' }, b.toa),
    h('span', { className: 'tl-mt' }, b.l === 'QD' ? 'Tòa án trích nội dung quyết định phù hợp với mục đích sử dụng của bạn. Bạn có thể ghi chú phần cần trích ở bước sau.' : 'Tòa án trích phần nội dung bản án phù hợp với mục đích sử dụng của bạn (ví dụ phần quyết định). Bạn có thể ghi chú phần cần trích ở bước sau.')); }
  return h(F, null,
    h('div', { className: 'fx-search' }, Tf('Tìm vụ án hoặc văn bản', { icon: 'search', placeholder: 'Tìm tên vụ án, mã vụ án, số hiệu văn bản…', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })),
    va.length ? h('div', { className: 'tl-dem' }, h('p', { className: 'dm-meta' }, va.length + ' vụ án / ' + tong + ' bản án, quyết định'),
      h('button', { type: 'button', className: 'vk-link tl-moall', onClick: function () { var o = {}; va.forEach(function (v) { o[v.ma] = !tatCa; }); mo[1](o); } }, tatCa ? 'Thu gọn tất cả' : 'Mở rộng tất cả'))
      : KhoiRong() /* 1A.2 áp chung: tìm không ra → khối trống chung (ô tìm đã có nút xóa) */,
    h('div', { className: 'ctx-grps' }, va.map(function (v) {
      var on = !!mo[0][v.ma], nba = v.vb.filter(function (b) { return b.l === 'BA'; }).length;
      return h('section', { key: v.ma, className: 'ctx-g' + (on ? ' ctx-g-on' : '') },
        h('button', { type: 'button', className: 'ctx-gh', 'aria-expanded': on, onClick: function () { var o = Object.assign({}, mo[0]); o[v.ma] = !on; mo[1](o); } },
          h('span', null, h('b', null, v.ten || v.ma), h('small', null, v.ma + ' · ' + v.vt), h('small', null, v.vb.length + ' văn bản · ' + nba + ' bản án, ' + (v.vb.length - nba) + ' quyết định'), h('span', { className: 'tl-va-tt' }, v.tt)),
          h(T.Icon, { name: 'chevronDown', className: 'ctx-chev' })),
        on ? h('div', { className: 'ctx-rows' }, h('p', { className: 'tl-rows-h' }, h('b', null, 'Bản án, quyết định thuộc vụ án'), v.vb.length > 3 ? h('small', null, 'Cuộn để xem đầy đủ') : null),
          h('ul', { className: 'tl-vbs' + (v.vb.length > 3 ? ' tl-vbs-cuon' : ''), role: 'radiogroup', 'aria-label': 'Văn bản thuộc vụ án ' + v.ma }, v.vb.map(function (b) {
            var khoa = !!(b.khoaTl && b.khoaBs), chon = p.sel === b.id;
            return h('li', { key: b.id }, h('button', { type: 'button', role: 'radio', 'aria-checked': chon, disabled: khoa, className: 'tl-vb' + (chon ? ' tl-vb-on' : '') + (khoa ? ' tl-vb-off' : ''), onClick: function () { p.onSel(b.id); } },
              h('span', { className: 'tl-vb-tx' }, h('span', { className: 'tl-vb-1' }, h('b', { className: 'tl-so' }, b.so), h('span', { className: 'tl-tag' }, b.l === 'QD' ? 'Quyết định' : 'Bản án'), b.hl ? h('span', { className: 'tl-tag tl-tag-hl' }, b.hl) : null),
                h('small', null, b.ten + ' · ' + b.ngay), h('small', null, b.toa)),
              h('span', { className: 'ph-lvr-ck', 'aria-hidden': 'true' }, chon ? h(T.Icon, { name: 'check' }) : null)));
          }))) : null);
    })),
    p.err && !d ? TlLoi('Vui lòng chọn một bản án hoặc quyết định để tiếp tục.') : null,
    d ? h('section', { className: 'ph-s1-sec ph-fsec' }, Lbl('Loại sản phẩm cần cấp', 1), h(OptCards, { label: 'Loại sản phẩm cần cấp', cur: p.lp, onPick: p.onLp, items: [
      { id: 'tl', t: d.l === 'QD' ? 'Trích lục nội dung quyết định' : 'Trích lục bản án', d: d.khoaTl || moTa(d), off: !!d.khoaTl },
      { id: 'bs', t: d.l === 'QD' ? 'Bản sao toàn văn quyết định' : 'Bản sao toàn văn bản án', d: d.khoaBs || 'Được cấp từ sổ gốc, có giá trị sử dụng thay cho bản chính trong các giao dịch theo quy định pháp luật.', off: !!d.khoaBs }] })) : null);
}
/* bước 1, nguồn "Nhập thông tin bản án" (tự khai) */
/* đối chiếu 1E.4 (21/11/2026): có điều khiển; lỗi số bản án, Tòa án ban hành chỉ hiện sau khi bấm Tiếp theo */
function TlTuKhai(p) {
  var v = p.v, set = function (k, x) { var n = Object.assign({}, v); n[k] = x; p.set(n); };
  return h(F, null,
    h('section', { className: 'ph-s1-sec ph-fsec' }, Lbl('Loại văn bản', 1), h(OptCards, { label: 'Loại văn bản', cur: v.lv, onPick: function (x) { set('lv', x); }, items: [{ id: 'BAN_AN', t: 'Bản án', d: 'Bản án sơ thẩm, phúc thẩm của Tòa án.' }, { id: 'QUYET_DINH', t: 'Quyết định', d: 'Quyết định giải quyết vụ việc, quyết định công nhận…' }] })),
    Tf('Số bản án / quyết định', { required: true, placeholder: 'VD: 45/2026/DS-ST', value: v.so, onChange: function (e) { set('so', e.target.value); }, error: p.err && !v.so.trim() ? 'Vui lòng nhập số bản án / quyết định.' : undefined }),
    h(TlSel, { label: 'Năm ban hành', opts: TL_NAM, ph: '— Chọn năm —', v: v.nam, onChange: function (x) { set('nam', x); } }),
    h(TlSel, { label: 'Loại án', opts: TL_LOAI_AN, ph: '— Chọn loại án —', v: v.loaiAn, onChange: function (x) { set('loaiAn', x); } }),
    h(TlSel, { label: 'Tòa án ban hành', req: true, search: true, opts: TL_TOA, ph: '— Chọn tòa án —', v: v.toa, onChange: function (x) { set('toa', x); }, err: p.err && !v.toa ? 'Vui lòng chọn tòa án ban hành.' : '' }),
    Tf('Tên các bên đương sự', { placeholder: 'VD: Nguyễn Văn A, Trần Thị B (nếu nhớ)', value: v.ben, onChange: function (e) { set('ben', e.target.value); } }));
}
function Tl1(p) {
  var tab = React.useState(p && p.tuKhai ? 'tk' : 'va');
  return Wz({ title: TL_TITLE, steps: TL_STEPS, n: 1, go: tab[0] === 'tk' ? 'tl2k' : 'tl2', body: FCard('Chọn bản án / quyết định', h(F, null,
    Lead('Chọn từ vụ án của bạn (thông tin được điền tự động, không thể sai) hoặc nhập thông tin bản án để Tòa án đối chiếu.'),
    h(T.Tabs, { label: 'Nguồn thông tin bản án', value: tab[0], onChange: tab[1], items: [{ key: 'va', label: 'Từ vụ án của tôi' }, { key: 'tk', label: 'Nhập thông tin bản án' }] }),
    tab[0] === 'va' ? h(TlTuVuAn) : h(TlTuKhai)), true) });
}
/* bước 2 – Loại và hình thức nhận; tuKhai: có mục "Bạn cần cấp loại văn bản nào?" (từ vụ án đã chọn ở bước 1) */
/* đối chiếu 1B.1, 1E.3, 1E.4, 1F.1 (21/11/2026): bước 2 theo lựa chọn bước 1 (TL_CHON); từ vụ án không có khối chọn loại, ghi chú phần cần trích sau khối tài liệu khi trích lục;
   tự khai chọn sẵn theo loại văn bản; số bản giấy 1–10 / 1–20; người nhận trống ban đầu, Tỉnh / Phường mở bảng chọn; tài liệu: tên + loại, bộ đếm n/9, kho chọn nhiều; kiểm tra khi bấm Tiếp theo; p.nhap – nạp bản nháp */
function Tl2(p) {
  p = p || {};
  var nh = !!p.nhap, c = Object.assign({}, TL_CHON, nh ? { nguon: 'va', ma: 'DS-2026-0018', vt: 'Bị đơn', l: 'QD', so: '[Số quyết định]', loai: 'BAN_SAO' } : {}, p.va ? { nguon: 'va', ma: 'DS-2026-0012', vt: 'Nguyên đơn', l: 'QD', so: '[Số quyết định]', loai: 'TRICH_LUC' } : {}, p.tuKhai ? { nguon: 'tk' } : {}, p.chon || {});
  var tk = c.nguon === 'tk';
  var lv = React.useState(p.loai || (tk ? (c.loaiVb === 'QUYET_DINH' ? 'TRICH_LUC' : 'BAN_SAO') : c.loai)), sl = React.useState(p.sl || (nh ? 2 : 1)), ht = React.useState('buu_chinh');
  var dc = React.useState(Object.assign({}, nh ? TL_DC_MAU : TL_DC0, p.dc0 || {})), gc = React.useState(p.gc0 || ''), md = React.useState(p.md0 || (nh ? 'Thi hành án' : '')), ct = React.useState(p.ct0 || '');
  var tep = React.useState(p.tep0 || (nh ? [TL_TEP_MAU[0]] : [])), kt = React.useState(!!p.loi);
  var tl = lv[0] === 'TRICH_LUC', maxSl = tl ? 10 : 20, can = tk || md[0] === 'Mục đích khác';
  var g = gc[0], eGc = !tl || !g ? '' : !g.trim() ? 'Nội dung ghi chú không được chỉ chứa khoảng trắng.' : g.trim().length < 30 ? 'Vui lòng nhập tối thiểu 30 ký tự (hiện có ' + g.trim().length + ' ký tự).' : '';
  var eDc = ht[0] === 'buu_chinh' ? tlLoiDc(dc[0]) : {}, eMd = md[0] ? '' : 'Vui lòng chọn mục đích sử dụng.', eCt = can && ct[0].trim().length < 30 ? 'Vui lòng điền thông tin mục đích sử dụng (tối thiểu 30 ký tự).' : '';
  var eTep = tep[0].some(function (f) { return tlLoiTep(f).length; });
  function tiep() { kt[1](true); if (eGc || tlCoLoi(eDc) || eMd || eCt || eTep) return; Object.assign(TL_CHON, c, { loai: lv[0], tep: tep[0] }); window.__ptGo(tk ? 'tl3k' : 'tl3'); }
  var tcBm = tk && TL_CHON.tcach && TL_CHON.tcach !== TL_TU_CACH[0];
  var oGc = function (nhan) { return Tf('Ghi chú phần cần trích', { className: 'tl-nolbl', /* nhãn = tiêu đề khối (từ vụ án) / không nhãn (tự khai, như web) */ multiline: true, maxLength: 500, value: g, onChange: function (e) { gc[1](e.target.value); }, error: kt[0] && eGc ? eGc : undefined,
    placeholder: nhan ? 'Ghi chú phần cần trích (nếu có, từ 30 đến 500 ký tự), VD: phần quyết định của bản án sơ thẩm…' : 'Ghi chú phần cần trích (nếu có, từ 30 đến 500 ký tự), VD: phần quyết định của bản án…' }); };
  var hop = NoteBox(h('p', null, 'Tòa án quyết định nội dung trích lục phù hợp với mục đích sử dụng. Bạn có thể ghi chú phần cần trích để Tòa tham khảo.'));
  return TlWz({ title: TL_TITLE, sub: tlSub(c, null, p.pa), nguonB: tlWzNguon(c, p.pa), steps: TL_STEPS, n: 2, last: TlNext(tiep), body: h(F, null,
    tk ? FCard('Bạn cần cấp loại văn bản nào?', h(F, null, Lead('Chọn loại sản phẩm và hình thức nhận kết quả.'),
      h(OptCards, { label: 'Loại văn bản cần cấp', cur: lv[0], onPick: function (x) { lv[1](x); if (sl[0] > (x === 'TRICH_LUC' ? 10 : 20)) sl[1](x === 'TRICH_LUC' ? 10 : 20); }, items: [{ id: 'BAN_SAO', t: 'Bản sao bản án (toàn văn, có chữ ký số)', d: 'Được cấp từ sổ gốc, có giá trị sử dụng thay cho bản chính trong các giao dịch theo quy định pháp luật.' }, { id: 'TRICH_LUC', t: 'Trích lục bản án (một phần nội dung)', d: 'Trích một phần nội dung của bản án/quyết định.' }] }),
      tl ? h(F, null, hop, oGc(false)) : null), true) : null,
    FCard('Hình thức nhận kết quả', h(F, null, Lead('Kết quả được trả bằng bản giấy. Chọn nhận qua bưu chính hoặc nhận trực tiếp tại Tòa án.'),
      h(TlDem, { label: 'Số lượng bản giấy', v: sl[0], set: sl[1], max: maxSl }),
      h(OptCards, { label: 'Hình thức nhận bản giấy', cur: ht[0], onPick: ht[1], items: [{ id: 'buu_chinh', t: 'Gửi qua bưu chính' }, { id: 'tai_toa', t: 'Nhận tại Bộ phận một cửa', d: (tk ? 'Mang CCCD + mã yêu cầu khi đến nhận.' : (c.toa || COURT1) + ' · Mang CCCD + mã yêu cầu') }] }),
      ht[0] === 'buu_chinh' ? h(TlDiaChi, { v: dc[0], set: dc[1], kt: kt[0], moTinh: p.moTinh }) : null), true),
    h(TlTep, { title: 'Tài liệu đính kèm (nếu có)', toiDa: 9, kt: kt[0], ds0: tep[0], onDoi: tep[1], khoMo: p.kho, loiTai: p.loiTai,
      desc: 'Đính kèm giấy tờ liên quan (ví dụ: giấy ủy quyền, giấy tờ chứng minh mục đích) — không bắt buộc, tối đa 9 tệp (+1 đơn đề nghị ký số = 10 tệp). Chấp nhận PDF, JPG, PNG, DOCX (tối đa 10 MB/tệp, ảnh và Word được tự động chuyển sang PDF). Mỗi tài liệu phải có tên và loại tài liệu.' }),
    !tk && tl ? FCard('Ghi chú phần cần trích', h(F, null, hop, oGc(true)), true) : null,
    FCard('Mục đích sử dụng', h(F, null, h(TlSel, { label: 'Mục đích sử dụng', req: true, opts: TL_MUC_DICH, ph: '— Chọn mục đích —', v: md[0], onChange: md[1], err: kt[0] ? eMd : '' }),
      can ? Tf('Chi tiết mục đích sử dụng', { required: true, multiline: true, maxLength: 500, value: ct[0], onChange: function (e) { ct[1](e.target.value); }, error: kt[0] && eCt ? eCt : undefined,
        placeholder: tcBm ? 'Nhập mục đích sử dụng chi tiết từ 30 đến 500 ký tự để Tòa án xem xét xử lý thông tin bảo mật theo quy định' : 'Nhập mục đích sử dụng cụ thể (từ 30 đến 500 ký tự)' }) : null), true)) });
}
/* bước 3 – Tư cách người yêu cầu: từ vụ án → thẻ xác minh tự động; tự khai → chọn tư cách; ô cam kết */
/* đối chiếu 1E.4 / 1F.2 (21/11/2026): từ vụ án – thẻ xác minh "Đương sự — {vai trò} trong vụ án {mã}", không có ô cam kết; tự khai – ô cam kết chỉ khi tư cách khác "Đương sự trong vụ án", bắt buộc;
   giấy giới thiệu (tổ chức) có kiểm tra; lỗi hiện khi bấm Tiếp theo */
function Tl3(p) {
  p = p || {};
  var tk = !!p.tuKhai, c = Object.assign({}, TL_CHON, tk ? { nguon: 'tk' } : TL_CHON.nguon === 'tk' ? { nguon: 'va', ma: 'DS-2026-0012', vt: 'Nguyên đơn', l: 'BA', so: '45/2026/DS-ST' } : {});
  var tcach = React.useState(p.tcach0 || TL_CHON.tcach || TL_TU_CACH[0]), ck = React.useState(false), kt = React.useState(!!p.loi), gg = React.useState({ so: '', ngay: '' });
  var laToChuc = !!p.tc || laTC(), canCk = tk && tcach[0] !== TL_TU_CACH[0], eCk = canCk && !ck[0], eGg = laToChuc ? tlLoiGgt(gg[0], tk && tcach[0] === 'Cơ quan nhà nước thực hiện công vụ') : {};
  function tiep() { kt[1](true); if (eCk || tlCoLoi(eGg)) return; TL_CHON.tcach = tk ? tcach[0] : ''; window.__ptGo('tl4'); }
  return TlWz({ title: TL_TITLE, sub: tlSub(c, null, p.pa), nguonB: tlWzNguon(c, p.pa), steps: TL_STEPS, n: 3, last: TlNext(tiep), body: h(F, null,
    FCard('Tư cách người yêu cầu', h(F, null, Lead('Tòa án căn cứ tư cách người yêu cầu để thẩm định quyền được cấp theo pháp luật tố tụng.'),
      tk ? h(TlSel, { label: 'Bạn yêu cầu với tư cách', req: true, opts: TL_TU_CACH, v: tcach[0], onChange: function (x) { tcach[1](x); ck[1](false); } })
        : h('div', { className: 'ph-tlv' }, h('span', { className: 'ph-up3-ic' }, h(T.Icon, { name: 'shield' })), h('div', null, h('b', null, tlTuCachVa(c.vt || 'Nguyên đơn', c.ma || 'DS-2026-0012')), h('small', null, 'Tư cách được hệ thống xác minh tự động qua liên kết vụ án — không cần khai lại.')))), true),
    canCk ? h('div', { className: 'ph-commit' }, h(T.Checkbox, { checked: ck[0], onChange: function (e) { ck[1](e.target.checked); }, label: 'Tôi cam kết sử dụng bản sao bản án đúng mục đích đã khai báo và chịu trách nhiệm trước pháp luật.' }),
      kt[0] && eCk ? TlLoi('Vui lòng xác nhận cam kết trước khi tiếp tục.') : null) : null,
    laToChuc ? h(TlGiayGT, { v: gg[0], set: gg[1], kt: kt[0], bb: tk && tcach[0] === 'Cơ quan nhà nước thực hiện công vụ' }) : null) });
}
/* đối chiếu 1F.3, 1G.1, 1G.2 (21/11/2026): người dùng 21/11 "vẫn để xem lại" → giữ bảng "Xem lại thông tin trước khi gửi đến Tòa án" (dữ liệu theo lựa chọn các bước); tên đơn theo loại; tài liệu đính kèm theo bước 2 (nhãn "Đã ký" + Xem);
   đang tạo đơn / lỗi + Thử lại; nút "Gửi yêu cầu" mở khi đã ký và đã tích cam đoan; "Đang gửi yêu cầu…" */
function Tl4(p) {
  p = p || {};
  var c = Object.assign({}, TL_CHON, p.chon || {}), bs = (p.loai || c.loai) === 'BAN_SAO';
  var tl = c.tep && c.tep.length ? c.tep.map(function (f) { return [f.ten || f.tep, f.tep]; }) : TL4_TEP;
  var tk = c.nguon === 'tk', rv = [[c.l === 'QD' ? 'Quyết định' : 'Bản án', c.so || '[Số bản án / quyết định]']].concat(tk ? [] : [['Vụ án', c.ma + ' — ' + (c.toa || COURT1)]],
    [['Loại yêu cầu', bs ? 'Bản sao bản án/quyết định' : 'Trích lục bản án/quyết định'], ['Số lượng bản', '1'], ['Hình thức nhận', 'Bản giấy có dấu đỏ (chuyển phát bưu chính)'], ['Mục đích sử dụng', 'Thi hành án'],
     ['Tư cách người yêu cầu', tk ? (c.tcach || '[Tư cách người yêu cầu]') : 'Đương sự — ' + c.vt + ' · ' + c.ma]]);
  return KyGui({ wz: TlWz, sub: tlSub(c, null, p.pa), nguonB: tlWzNguon(c, p.pa), title: TL_TITLE, steps: TL_STEPS, n: 4, rvTitle: 'Xem lại thông tin trước khi gửi đến Tòa án', review: rv,
    moTa: 'Người yêu cầu ký số đơn và toàn bộ tài liệu đính kèm trước khi gửi yêu cầu đến Tòa án.', don: bs ? 'Đơn yêu cầu cấp bản sao' : 'Đơn yêu cầu cấp trích lục', donTep: bs ? 'don-yeu-cau-cap-ban-sao.pdf' : 'don-yeu-cau-cap-trich-luc.pdf', vaiTro: 'Người yêu cầu', tl: tl,
    camDoan: 'Tôi cam đoan các thông tin và tài liệu đã cung cấp là đúng sự thật và chịu trách nhiệm trước pháp luật.', btn: 'Gửi yêu cầu', ok: bs ? 'tlOkBs' : 'tlOk',
    cdCtrl: true, /* 1G.2 (21/11): không nhãn ở dòng đơn; trạng thái tiêu đề khối Ký số bỏ chung (them_s5_chung.js) */ daKy0: p.da, cd0: p.cd, dangTao: p.dang, loiTao: p.loiTao, dangGui: p.gui,
    onGui: p.loiGui ? function () { window.__ptSnackLoi(bs ? 'Không gửi được yêu cầu cấp bản sao.' : 'Không gửi được yêu cầu cấp trích lục.'); } : undefined });
}
/* đối chiếu 1G.3 (21/11/2026): giữ màn "Đã gửi yêu cầu"; bản sao không kèm câu cam kết 08 giờ; Loại yêu cầu theo nhãn chi tiết web; thời điểm gửi DD-MM-YYYY HH:mm */
function TlOk(p) {
  p = p || {};
  var rows = [['Mã yêu cầu', h('span', { className: 'ph-ok-ma' }, '[Mã yêu cầu]')], ['Thời điểm gửi', '[DD-MM-YYYY HH:mm]'], ['Loại yêu cầu', p.bs ? 'Bản sao bản án/quyết định' : 'Trích lục bản án/quyết định']];
  return h(Phone, { cls: 'ph-ok' },
    h(Body, { cls: 'ph-ok-b' },
      h('div', { className: 'ph-success' }, h('span', { className: 'ph-success-ico' }, h(T.Icon, { name: 'checkCircle' })), h('h2', null, 'Đã gửi yêu cầu'), p.bs ? null : P('Tòa án cam kết tiếp nhận trong vòng 08 giờ làm việc.', 'ph-muted')),
      h('dl', { className: 'ph-rvkv ph-ok-rows' }, rows.map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0]), h('dd', null, r[1])); }))),
    h('div', { className: 'ph-col ph-ok-foot' }, Btn('Về danh sách yêu cầu'), Btn('Về trang chủ', 'secondary')));
}

/* ===== Khiếu nại, tố cáo (theo web /khieu-nai-to-cao/chon-thu-tuc, 03/11/2026) ===== */

var KN_NHOM = [['vuan', 'Trong vụ án, vụ việc của tôi'], ['hc', 'Khiếu nại hành chính về hoạt động của Tòa án'], ['tc', 'Tố cáo hành vi vi phạm pháp luật'], ['pakn', 'Kiến nghị, phản ánh']];
var KN_LUAT_KN = 'Luật Khiếu nại 2011, sửa đổi bổ sung năm 2025 theo Luật số 136/2025/QH15 (Điều 9, Điều 27, Điều 28)';
var KN_LUAT_TC = 'Luật Tố cáo 2018, sửa đổi bổ sung năm 2025 theo Luật số 136/2025/QH15 · Điều 509 – 517 Bộ luật Tố tụng dân sự 2015';
var KN_TH_KN = '90 ngày kể từ ngày nhận được hoặc biết được', KN_TH_TC = 'Không áp dụng thời hiệu — tố cáo bất kỳ lúc nào phát hiện hành vi vi phạm', KN_30 = '30 ngày kể từ ngày thụ lý';
var KN_CQ_KN = 'Chánh án Tòa án nơi có hành vi bị khiếu nại', KN_CQ_TC = 'Chánh án Tòa án nơi người bị tố cáo đang công tác';
var KN_TT = [
  { ma: 'qd', n: 'vuan', ten: 'Quyết định tố tụng trong vụ án của tôi', desc: 'Chọn văn bản đã tống đạt cho bạn thuộc danh mục biểu mẫu được khiếu nại. Hệ thống tự xác định thủ tục, cơ quan giải quyết và thời hiệu theo mã mẫu.', cq: 'Chánh án Tòa án đã ra văn bản; khiếu nại lần hai việc trả lại đơn: Chánh án Tòa án trên một cấp trực tiếp', th: null, hg: 'Theo Điều 140, 194, 319 BLTTDS / Luật TTHC', cc: 'Điều 140, 194, 319, 364 BLTTDS; Điều 124 Luật TTHC', hs: ['Đơn khiếu nại (hệ thống tạo)', 'Bản sao quyết định bị khiếu nại (lấy từ Hộp thư tống đạt)', 'Giấy tờ định danh (Kho dữ liệu điện tử)', 'Tài liệu, chứng cứ (nếu có)'] },
  { ma: 'hv_nttt', n: 'vuan', ten: 'Hành vi của người tiến hành tố tụng', desc: 'Khiếu nại hành vi của người tiến hành tố tụng trong quá trình giải quyết vụ án của bạn. Thời hiệu 15 ngày kể từ ngày bạn biết được hành vi.', cq: 'Chánh án Tòa án đang giải quyết vụ án', th: null, hg: '15 ngày kể từ ngày Tòa án nhận được khiếu nại; vụ việc phức tạp gia hạn không quá 15 ngày (Điều 504)', cc: 'Chương XLI (Điều 499–508) BLTTDS 2015', hs: ['Đơn khiếu nại (hệ thống tạo)', 'Giấy tờ định danh (Kho dữ liệu điện tử)', 'Văn bản ủy quyền hoặc giấy tờ luật sư (nếu nộp thay)', 'Tài liệu, chứng cứ (nếu có)'] },
  { ma: 'tc', n: 'vuan', ten: 'Tố cáo hành vi vi phạm pháp luật', desc: 'Báo cho Tòa án hành vi vi phạm pháp luật của người tiến hành tố tụng. Mọi cá nhân đều có quyền tố cáo, không cần là đương sự hay có vụ án trên Cổng. Không áp dụng thời hiệu; có thể yêu cầu bảo vệ thông tin người tố cáo.', cq: KN_CQ_TC, th: null, hg: '30 ngày kể từ ngày Tòa án nhận được tố cáo; vụ việc phức tạp gia hạn không quá 30 ngày (Điều 513 BLTTDS 2015)', cc: 'Luật Tố cáo 2018, sửa đổi, bổ sung 2025 · Điều 509–517 BLTTDS 2015', hs: ['Đơn tố cáo (hệ thống tạo từ nội dung bạn khai)', 'Giấy tờ định danh (lấy từ Kho dữ liệu điện tử)', 'Tài liệu, chứng cứ chứng minh hành vi bị tố cáo — bắt buộc'] },
  { ma: 'hv_hc', n: 'hc', ten: 'Hành vi hành chính của Tòa án', desc: 'Bộ phận tiếp nhận đơn, hành chính tư pháp — không gắn với vụ án cụ thể.', cq: KN_CQ_KN, th: KN_TH_KN, hg: KN_30, cc: KN_LUAT_KN, hs: ['Tài liệu chứng minh hành vi hành chính bị khiếu nại'] },
  { ma: 'kn1', n: 'hc', ten: 'Tổ chức bộ máy và công tác cán bộ', desc: 'Bộ phận tiếp nhận đơn, hành chính tư pháp — không gắn với vụ án cụ thể.', cq: KN_CQ_KN, th: KN_TH_KN, hg: KN_30, cc: KN_LUAT_KN, hs: ['Quyết định hành chính bị khiếu nại', 'Tài liệu chứng minh nội dung khiếu nại'] },
  { ma: 'kn2', n: 'hc', ten: 'Ngân sách, xây dựng cơ bản, mua sắm và tài sản công', desc: 'Quản lý, sử dụng ngân sách, đầu tư xây dựng, mua sắm và quản lý tài sản công.', cq: KN_CQ_KN, th: KN_TH_KN, hg: KN_30, cc: KN_LUAT_KN, hs: ['Quyết định, hợp đồng hoặc chứng từ liên quan', 'Tài liệu chứng minh nội dung khiếu nại'] },
  { ma: 'kn3', n: 'hc', ten: 'Quản lý hành chính trong thực hiện chức năng xét xử', desc: 'Quản lý hành chính nhà nước trong thực hiện chức năng, nhiệm vụ xét xử — không phải nội dung tố tụng.', cq: KN_CQ_KN, th: KN_TH_KN, hg: '330 ngày kể từ ngày thụ lý', cc: KN_LUAT_KN, hs: ['Văn bản thể hiện quyết định hoặc hành vi bị khiếu nại'] },
  { ma: 'kn4', n: 'hc', ten: 'Quyết định kỷ luật công chức, viên chức, người lao động', desc: 'Khiếu nại quyết định kỷ luật đối với chính mình.', cq: KN_CQ_KN, th: KN_TH_KN, hg: KN_30, cc: KN_LUAT_KN, hs: ['Quyết định kỷ luật', 'Tài liệu chứng minh nội dung khiếu nại'] },
  { ma: 'kn5', n: 'hc', ten: 'Quyết định xử phạt vi phạm hành chính của Tòa án', desc: 'Quyết định xử phạt hoặc biện pháp khắc phục hậu quả do Tòa án ban hành.', cq: KN_CQ_KN, th: KN_TH_KN, hg: KN_30, cc: KN_LUAT_KN, hs: ['Quyết định xử phạt vi phạm hành chính', 'Biên lai nộp phạt (nếu đã nộp)'] },
  { ma: 'kn6', n: 'hc', ten: 'Quyết định liên quan bồi thường oan, sai', desc: 'Quyết định trong việc giải quyết yêu cầu bồi thường của người bị thiệt hại.', cq: KN_CQ_KN, th: KN_TH_KN, hg: KN_30, cc: KN_LUAT_KN, hs: ['Quyết định bị khiếu nại', 'Bản án hoặc quyết định làm căn cứ yêu cầu bồi thường'] },
  { ma: 'kn7', n: 'hc', ten: 'Lĩnh vực hoạt động khác của Tòa án', desc: 'Quản lý hành chính trong các lĩnh vực hoạt động khác không thuộc sáu nhóm trên.', cq: KN_CQ_KN, th: KN_TH_KN, hg: KN_30, cc: KN_LUAT_KN, hs: ['Tài liệu chứng minh nội dung khiếu nại'] },
  { ma: 'tc1', n: 'tc', ten: 'Hành vi vi phạm của cơ quan, đơn vị thuộc Tòa án', desc: 'Cơ quan, đơn vị thuộc Tòa án nhân dân có hành vi vi phạm trong thực hiện nhiệm vụ.', cq: KN_CQ_TC, th: KN_TH_TC, hg: KN_30, cc: KN_LUAT_TC, hs: ['Thông tin, tài liệu, chứng cứ chứng minh hành vi bị tố cáo'] },
  { ma: 'tc2', n: 'tc', ten: 'Hành vi vi phạm của cán bộ, công chức trong nhiệm vụ, công vụ', desc: 'Cán bộ, công chức, viên chức, người lao động vi phạm khi thực hiện nhiệm vụ, công vụ.', cq: KN_CQ_TC, th: KN_TH_TC, hg: KN_30, cc: KN_LUAT_TC, hs: ['Thông tin, tài liệu, chứng cứ chứng minh hành vi bị tố cáo'] },
  { ma: 'tc3', n: 'tc', ten: 'Vi phạm chuẩn mực đạo đức và quy tắc ứng xử', desc: 'Vi phạm chuẩn mực, phẩm chất đạo đức và quy tắc ứng xử của cán bộ Tòa án.', cq: null, th: KN_TH_TC, hg: KN_30, cc: KN_LUAT_TC, hs: ['Thông tin, tài liệu, chứng cứ chứng minh hành vi bị tố cáo'] },
  { ma: 'tc4', n: 'tc', ten: 'Vi phạm quản lý nhà nước trong lĩnh vực tư pháp', desc: 'Vi phạm pháp luật trong quản lý nhà nước thuộc lĩnh vực tư pháp.', cq: null, th: KN_TH_TC, hg: KN_30, cc: KN_LUAT_TC, hs: ['Thông tin, tài liệu, chứng cứ chứng minh hành vi bị tố cáo'] },
  { ma: 'pa1', n: 'pakn', ten: 'Kiến nghị, phản ánh', desc: 'Đưa ra ý kiến, đề xuất hoặc cung cấp thông tin về việc thực hiện chính sách, pháp luật, công tác quản lý và hoạt động của Tòa án. Không dùng để khiếu nại một quyết định, hành vi cụ thể.', cq: 'Tòa án nơi tiếp nhận kiến nghị, phản ánh', th: null, hg: null, cc: 'Luật Tiếp công dân 2013, sửa đổi năm 2025 (Luật 136/2025/QH15) · [Nghị định hướng dẫn]', hs: ['Tài liệu, hình ảnh minh họa (nếu có)'] }];
/* nhóm thủ tục: hàng chọn ngang 4 ô minh họa như bước 1 Soạn đơn */
var KN_NHOM_PICK = [{ k: 'vuan', illo: 'banAn', ngan: 'Trong vụ án\ncủa tôi' }, { k: 'hc', illo: 'khieuNai', ngan: 'Khiếu nại\nhành chính' }, { k: 'tc', illo: 'toCao', ngan: 'Tố cáo' }, { k: 'pakn', illo: 'chat', ngan: 'Kiến nghị,\nphản ánh' }];
function KnTenNhom(k) { return KN_NHOM.filter(function (n) { return n[0] === k; })[0][1]; }
/* Thủ tục: ô chọn → bảng từ đáy "Chọn thủ tục" (ô tìm khi trên 6 mục; danh sách dòng tên + mô tả, mục chọn chữ đỏ + dấu tích) */
function KnThuTuc(p) {
  var o = React.useState(!!p.open), q = React.useState(''), anchor = React.useRef(null), host = useHost(anchor);
  var list = KN_TT.filter(function (t) { return t.n === p.nhom; }), cur = list.filter(function (t) { return t.ma === p.v; })[0];
  var kq = khongDau(q[0].trim()), loc = list.filter(function (t) { return !kq || khongDau(t.ten + ' ' + t.desc).indexOf(kq) >= 0; });
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    h(T.SelectField, { label: 'Thủ tục', placeholder: '— Chọn thủ tục —', value: cur ? cur.ten : undefined, open: o[0], onClick: function () { q[1](''); o[1](true); } }),
    o[0] && host ? h(LvSheet, { host: host, title: 'Chọn thủ tục', onClose: function () { o[1](false); },
      top: list.length > 6 ? h('div', { className: 'fx-search' }, Tf('Tìm thủ tục', { icon: 'search', placeholder: 'Tìm theo nội dung, VD: kỷ luật, mua sắm, đạo đức…', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })) : null },
      loc.length ? h(LvRows, { label: 'Thủ tục', cur: p.v, items: loc.map(function (t) { return { id: t.ma, name: t.ten, desc: t.desc }; }), onPick: function (id) { p.onChange(id); o[1](false); } })
        : h('p', { className: 'ph-lv-empty' }, 'Không có thủ tục nào khớp «' + q[0] + '».')) : null);
}
/* chi tiết thủ tục: ô chú thích nền xám như bước 1 – mô tả, nhãn trái – giá trị phải, Hồ sơ cần có */
function KnChiTiet2(t) {
  var rows = [['Cơ quan giải quyết', t.cq || '—']].concat(t.th ? [['Thời hiệu', t.th]] : []).concat([['Thời hạn giải quyết', t.hg || '—'], ['Căn cứ pháp lý', t.cc || '—']]);
  return h('div', { className: 'ph-s1-note ct2-note' }, h('p', null, t.desc), RvKV(rows),
    h('p', { className: 'ct2-cap' }, 'Hồ sơ cần có'), h('ul', { className: 'ct2-hs' }, t.hs.map(function (x) { return h('li', { key: x }, x); })));
}
/* màn đầu luồng ghi tên thủ tục (đầu trang, dải trắng): nhãn loại đơn + tên thủ tục */
var KN_FLOW = { qd: 'kqd', hv_nttt: 'khv', tc: 'ktv', hc: 'khc', tcg: 'ktc', pakn: 'kpa' };
function knDau(t) { return t.n === 'vuan' ? KN_FLOW[t.ma] : t.n === 'tc' ? 'ktc' : t.n === 'hc' ? 'khc' : 'kpa'; }
/* Chọn thủ tục (chốt 03/11/2026, kiểu bước 1 Soạn đơn): câu dẫn → Nhóm thủ tục* (4 ô minh họa) → Thủ tục* (ô chọn → bảng từ đáy) → ô chú thích chi tiết; "Bắt đầu khai đơn" ở thanh đáy */
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
      nh[0] ? h('section', { className: 'ph-s1-sec' }, Hd('Thủ tục', 1), h(KnThuTuc, { nhom: nh[0], v: tt[0], onChange: tt[1] }), t ? KnChiTiet2(t) : null) : null),
    h('div', { className: 'ph-foot' }, Bar(Btn('Bắt đầu khai đơn', 'primary', t ? { 'data-pt-go': knDau(t) + '1' } : { disabled: true }))));
}
function KnTT(loai, ten) { return h('div', { className: 'ph-kntt' }, h(T.Tag, null, loai), h('b', null, ten)); }
function YesBox(p) { var c = React.useState(!!p.v); if (p.an) return null; return h(F, null, h(T.Checkbox, { label: p.label, checked: c[0], onChange: function (e) { c[1](e.target.checked); if (p.onChange) p.onChange(e.target.checked); } }), c[0] && p.children ? p.children : null); }

/* --- Khiếu nại hành chính / Tố cáo / Kiến nghị, phản ánh (web /khieu-nai-hanh-chinh/soan-don – 5 bước, buoc-soan.ts) --- */
var KNH = {
  khc: { loai: 'Khiếu nại hành chính', ten: 'Hành vi hành chính của Tòa án', b2: 'Cá nhân, đơn vị bị khiếu nại', w: 'khiếu nại', cung: 'Có người khác cùng khiếu nại', tieuDe: 'Tiêu đề đơn khiếu nại', noiDung: 'Nội dung khiếu nại và yêu cầu giải quyết', ok: 'Đã gửi đơn khiếu nại' },
  ktc: { loai: 'Tố cáo', ten: 'Hành vi vi phạm của cán bộ, công chức trong nhiệm vụ, công vụ', b2: 'Người, đơn vị bị tố cáo', w: 'tố cáo', cung: 'Có người khác cùng tố cáo', tieuDe: 'Tiêu đề đơn tố cáo', noiDung: 'Nội dung tố cáo', ok: 'Đã gửi đơn tố cáo' },
  kpa: { loai: 'Kiến nghị, phản ánh', ten: 'Kiến nghị, phản ánh', b2: 'Cơ quan, cá nhân liên quan', w: 'phản ánh, kiến nghị', cung: 'Có người khác cùng phản ánh, kiến nghị', tieuDe: 'Tiêu đề đơn phản ánh, kiến nghị', noiDung: 'Nội dung phản ánh, kiến nghị', ok: 'Đã gửi phản ánh, kiến nghị' } };
function knhSteps(k) { return ['Người gửi đơn', KNH[k].b2, 'Nội dung và nơi nhận', 'Tài liệu kèm theo', 'Xem lại và ký gửi']; }
function KnhWz(k, n, body, last) { return Wz({ title: 'Soạn đơn', steps: knhSteps(k), n: n, go: k + (n + 1), body: h(F, null, KnTT(KNH[k].loai, KNH[k].ten), body), last: last }); }
function CungForm() { return h(F, null, Tf('Họ tên', { required: true, placeholder: 'Họ tên' }), TwoE(Tf('Số định danh', { required: true, inputMode: 'numeric', maxLength: 12, placeholder: 'Số định danh' }), Tf('Số điện thoại', { type: 'tel', placeholder: 'Số điện thoại' }))); }
function Knh1(k) {
  return KnhWz(k, 1, FCard('Người gửi đơn', h(F, null, RvKV(laTC() ? knhTcRows() : NGUOI_ME), /* v333 */
    Tf('Số điện thoại liên hệ', { required: true, type: 'tel', defaultValue: '0912345678', placeholder: 'Số điện thoại liên hệ' }),
    AddrG('Địa chỉ liên hệ', true, 'short'),
    h(YesBox, { label: KNH[k].cung, an: laTC() }, h('div', { className: 'ph-cung' }, Lead('Bạn là người đại diện và là người duy nhất ký số đơn.'),
      h(PartyList, { init: [{ moi: true }], dem: 'người cùng đứng đơn', goi: 'Người cùng đứng đơn', tu: 'người cùng đứng đơn', them: 'Thêm người cùng đứng đơn', form: function () { return CungForm(); } })))), true));
}
function Knh2(k) {
  var loai = React.useState('cn'), cn = loai[0] === 'cn';
  return KnhWz(k, 2, FCard(KNH[k].b2, h(F, null,
    Lead(k === 'kpa' ? 'Ghi những gì bạn biết về cơ quan, cá nhân liên quan đến nội dung phản ánh, kiến nghị.' : 'Ghi những gì bạn biết về cơ quan, đơn vị hoặc người có quyết định, hành vi bạn ' + KNH[k].w + '.'),
    h('div', { className: 'ph-seg-gon' }, h(T.SegmentedControl, { label: 'Loại đối tượng', value: loai[0], onChange: loai[1], options: [{ value: 'cn', label: 'Cá nhân' }, { value: 'tc', label: 'Cơ quan, tổ chức' }] })),
    Tf(cn ? 'Họ tên' : 'Tên cơ quan, tổ chức', { required: k !== 'kpa', placeholder: cn ? 'Họ tên' : 'Tên cơ quan, tổ chức', defaultValue: knhTiep() && cn ? 'Phạm Văn Đức' : undefined }),
    cn ? Tf('Chức vụ', { placeholder: 'Chức vụ', defaultValue: knhTiep() ? 'Cán bộ bộ phận tiếp nhận hồ sơ' : undefined }) : null, cn ? Tf('Nơi công tác', { placeholder: 'Nơi công tác', defaultValue: knhTiep() ? COURT1 : undefined }) : null, /* v458: điền sẵn từ hồ sơ gốc */
    Tf('Địa chỉ', { placeholder: 'Địa chỉ' })), true));
}
function Knh3(k) {
  var nd = React.useState('');
  return KnhWz(k, 3, FCard('Nội dung và nơi nhận', h(F, null,
    NoteBox(h('p', null, 'Mỗi đơn chỉ một loại nội dung. Nếu vừa khiếu nại vừa tố cáo, hoặc có thêm phản ánh, kiến nghị, bạn gửi các đơn riêng.')),
    Tf(KNH[k].tieuDe, { required: true, maxLength: 150, placeholder: KNH[k].tieuDe }),
    h(SelSheet, { label: 'Tòa án nhận đơn', req: true, search: true, opts: TL_TOA, ph: 'Tòa án nhận đơn', v: knhTiep() ? 'Tòa án nhân dân Thành phố Hà Nội' : undefined }),
    Tf(knhTiep() ? 'Lý do tố cáo tiếp' : KNH[k].noiDung, { required: true, multiline: true, maxLength: 2000, placeholder: knhTiep() ? 'Lý do tố cáo tiếp' : KNH[k].noiDung, value: nd[0], onChange: function (e) { nd[1](e.target.value); } }),
    h('p', { className: 'ph-count' }, nd[0].length + ' / tối thiểu 50 ký tự'),
    knhTiep() ? h(F, null, h('div', { className: 'tct-goc' }, h('small', null, 'Nội dung đơn gốc (để tham chiếu)'), h('p', null, 'Tố cáo hành vi nhận tiền của cán bộ tiếp công dân. Cán bộ tiếp công dân yêu cầu nộp tiền ngoài quy định khi nhận hồ sơ.')),
      NoteBox(h('p', null, 'Đây là đơn tố cáo tiếp của hồ sơ TC-2026-0004, gửi đến cơ quan cấp trên của người đã giải quyết. Tòa án nhận đơn mặc định là Tòa án nhân dân Thành phố Hà Nội, bạn có thể chọn lại. Nêu rõ lý do tố cáo tiếp ở ô trên.'))) : null), true)); /* v458 */
}
function Knh4(k) {
  var nd = React.useState(false), bv = React.useState(knhTiep()); /* v458: tố cáo tiếp giữ đề nghị bảo vệ của hồ sơ gốc */
  return KnhWz(k, 4, h(F, null,
    knhTiep() ? FCard('Văn bản kết quả hồ sơ gốc', DtDocs([['ket-luan-noi-dung-to-cao.pdf', 'Kết luận nội dung tố cáo — Cổng tự đính kèm khi gửi']], { the: true }), true) : null,
    h(TaiLieuCard, { title: 'Tài liệu kèm theo', desc: 'Định dạng PDF, JPG, PNG, DOCX (tự chuyển sang PDF để ký số) · tối đa 10 tệp, mỗi tệp ≤ 10 MB.', bat: [], bb0: {}, bs0: [{ k: 1, tep: 'anh-chup-bien-ban.jpg', ten: 'Ảnh chụp biên bản', loai: 'Khác' }] }),
    k === 'ktc' ? FCard('Tùy chọn của đơn tố cáo', h(F, null,
      h('div', { className: 'ph-opt' }, h(T.Checkbox, { label: 'Gửi đơn nặc danh', checked: nd[0], onChange: function (e) { nd[1](e.target.checked); if (e.target.checked) bv[1](false); } }),
        P('Họ tên, địa chỉ của bạn không hiển thị với cơ quan giải quyết và trong kết quả xử lý.', 'ph-muted ph-opt-d'),
        nd[0] ? h('div', { className: 'ph-pd-warn' }, h(T.Icon, { name: 'alert' }), h('div', null, h('p', null, 'Tố cáo nặc danh không được thụ lý theo thủ tục tố cáo. Cơ quan chỉ xem xét khi nội dung rõ ràng, có chứng cứ cụ thể.'))) : null),
      h('div', { className: 'ph-opt' }, h(T.Checkbox, { label: 'Đề nghị áp dụng biện pháp bảo vệ người tố cáo', checked: bv[0], onChange: function (e) { bv[1](e.target.checked); if (e.target.checked) nd[1](false); } }),
        P('Đính kèm đơn đề nghị nêu rõ biện pháp bảo vệ bạn đề nghị.', 'ph-muted ph-opt-d'),
        bv[0] ? h(F, null, P('Cần đính kèm đơn đề nghị áp dụng biện pháp bảo vệ.', 'ph-opt-d ph-miss'), h(T.Button, { variant: 'tint', icon: 'plus', className: 'ph-co-add' }, 'Đính kèm đơn đề nghị bảo vệ')) : null)), true) : null));
}
function Knh5(k) {
  var x = KNH[k];
  return KyGui({ title: 'Soạn đơn', steps: knhSteps(k), n: 5, rvTitle: 'Xem lại, ký số và gửi', rvDesc: 'Sau khi gửi, bạn không sửa được đơn. Muốn thay đổi thì rút đơn và gửi đơn mới.',
    review: [['Loại đơn', x.loai + ' — ' + x.ten], [laTC() ? 'Tổ chức gửi đơn' : 'Người đại diện', 'Hoàng Dương · CCCD: 001090012345 · SĐT: 0912345678 · [địa chỉ liên hệ]'], [x.b2, '[Họ tên] · [Chức vụ] · [Nơi công tác]'], ['Tòa án nhận đơn', COURT1], ['Tiêu đề đơn', '[Tiêu đề đơn]'], ['Nội dung', '[Nội dung]'], ['Tài liệu kèm theo', 'Ảnh chụp biên bản (Khác)']].concat(k === 'ktc' ? [['Tùy chọn tố cáo', 'Không']] : []),
    moTa: 'Đơn và toàn bộ tài liệu kèm theo được ký một lần bằng chữ ký số cá nhân của Hoàng Dương.', don: 'Đơn ' + x.w, donTep: 'don-' + k + '.pdf', vaiTro: 'Người gửi đơn', tl: [['Ảnh chụp biên bản', 'anh-chup-bien-ban.pdf']],
    camDoan: 'Tôi cam đoan nội dung đơn và tài liệu kèm theo là đúng sự thật, chịu trách nhiệm trước pháp luật.', btn: 'Gửi đơn', ok: k + 'Ok' });
}
function KnhOk(k) {
  return KetQua({ title: KNH[k].ok, desc: 'Đơn đã ký số của bạn được lưu trên Cổng và chuyển sang Hệ thống giải quyết khiếu nại, tố cáo. Cơ quan tiếp nhận sẽ phân loại lại đơn khi tiếp nhận.',
    rows: [['Mã hồ sơ', h('span', { className: 'ph-ok-ma' }, '[Mã hồ sơ]')], ['Người đứng đơn', '1 người'], ['Trạng thái', h(T.StatusBadge, { tone: 'info', icon: false }, 'Chờ tiếp nhận')]], b1: 'Xem chi tiết hồ sơ', b2: 'Về danh sách hồ sơ' });
}

/* --- Trong vụ án, vụ việc của tôi (web trong-vu-an/: qd, hv_nttt, tc – 4 bước) ---
   v185 (04/11/2026): rà soát theo nop-don-qd.tsx, nop-don-hv-tc.tsx, man-gui-thanh-cong.tsx.
   Biến thể o: lan2 (khiếu nại/tố cáo lần hai, ?hoSoGocMa=), kg (không gắn vụ án), tong (mở từ Hộp thư, ?tongDatId=), het (hết thời hiệu), rong (chưa có vụ án). */
var KNV = {
  kqd: { ma: 'qd', w: 'khiếu nại', b1: 'Đối tượng và thời hiệu', b2: 'Nội dung và người khiếu nại', don: 'Đơn khiếu nại', l2: 'Khiếu nại lần hai',
    he: [['Đơn khiếu nại', 'Hệ thống tạo từ nội dung bạn đã khai'], ['Bản sao quyết định bị khiếu nại', 'Lấy từ Hộp thư tống đạt']] },
  khv: { ma: 'hv_nttt', w: 'khiếu nại', b1: 'Đối tượng và thời hiệu', b2: 'Nội dung và người khiếu nại', don: 'Đơn khiếu nại', l2: 'Khiếu nại lần hai',
    he: [['Đơn khiếu nại', 'Hệ thống tạo từ nội dung bạn đã khai']] },
  ktv: { ma: 'tc', w: 'tố cáo', b1: 'Đối tượng và thời hiệu', b2: 'Nội dung và người tố cáo', don: 'Đơn tố cáo', l2: 'Tố cáo lần hai',
    he: [['Đơn tố cáo', 'Hệ thống tạo từ nội dung bạn đã khai']] } };
/* hậu tố mã màn theo biến thể: L = lần hai, Kg = không gắn vụ án */
function knvSfx(o) { return o && o.lan2 ? 'L' : o && o.kg ? 'Kg' : o && o.don ? 'Don' : ''; } /* v400: Don */
function knvSteps(k) { return [KNV[k].b1, KNV[k].b2, 'Tài liệu, chứng cứ', 'Xem lại và ký gửi']; }
function knvTT(k) { return KN_TT.filter(function (t) { return t.ma === KNV[k].ma && t.n === 'vuan'; })[0]; }
function knvTen(k, o) { return o && o.lan2 ? (k === 'kqd' ? 'Khiếu nại lần hai quyết định tố tụng' : KNV[k].l2 + ' · ' + knvTT(k).ten) : knvTT(k).ten; }
function KnvWz(k, n, body, last, o) { return Wz({ title: 'Soạn đơn', steps: knvSteps(k), n: n, go: k + (n + 1) + knvSfx(o), body: h(F, null, KnTT('Trong vụ án, vụ việc của tôi', knvTen(k, o)), body), last: last }); }
/* "Thủ tục bạn đã chọn": Gửi tới (+ Thời hiệu với qd, như web) + liên kết Đổi thủ tục */
function KnvChon(k, o) {
  o = o || {}; var t = knvTT(k), toa = o.lan2 ? 'Tòa án nhân dân Thành phố Hà Nội (cấp trên trực tiếp)' : o.kg ? (o.toa || 'Tòa án bạn khai ở bước này') : o.rong ? null : COURT1;
  var rows = [['Gửi tới', toa ? toa + ' · ' + (k === 'kqd' ? 'Chánh án Tòa án đã ra văn bản' : t.cq) : 'Chọn đơn hoặc vụ án để xác định Tòa án nhận đơn']];
  if (k === 'kqd') rows.push(['Thời hiệu', o.vb ? 'Hạn cuối ' + o.vb : 'Tùy văn bản bị khiếu nại — 03 đến 15 ngày']);
  return FCard('Thủ tục bạn đã chọn', h(F, null, RvKV(rows), h('button', { type: 'button', className: 'ph-link', 'data-pt-go': 'backTo:choose' }, 'Đổi thủ tục')), true);
}
/* hồ sơ lần đầu (khiếu nại / tố cáo lần hai) – thay cho phần chọn vụ án, văn bản */
function KnvLan2(k) {
  var qd = k === 'kqd';
  return h('div', { className: 'kv-lan2' }, h('b', null, KNV[k].l2),
    h('p', null, 'Hồ sơ lần đầu ', h('b', { className: 'kv-mono' }, 'KNTT-2026-0009'), ' · mã tiếp nhận ', h('b', { className: 'kv-mono' }, 'TA-2026-001234'), ' · vụ án ', h('b', { className: 'kv-mono' }, 'DS-2026-0012')),
    qd ? null : h('p', null, 'Người bị ' + KNV[k].w + ': ', h('b', null, 'Nguyễn Văn B'), ' · Thư ký Tòa án'),
    h('p', null, qd ? 'Văn bản bị khiếu nại: ' : 'Văn bản giải quyết lần đầu: ', h('b', null, 'Quyết định giải quyết khiếu nại'), ' · số 12/2026/QĐ-GQKN · nhận ngày 27-10-2026'),
    h('small', null, qd ? 'Khiếu nại lần hai tạo hồ sơ mới với mã tiếp nhận mới và chỉ tạo được một lần cho mỗi hồ sơ.' : 'Hồ sơ lần hai là hồ sơ mới với mã tiếp nhận mới, chỉ tạo được một lần cho mỗi hồ sơ lần đầu.'));
}
/* văn bản tống đạt của vụ án đã chọn – chia nhóm như web (phanNhomVanBan) */
var KNV_VB = [{ id: 'v1', code: 'Mẫu 04-DS', name: 'Thông báo không chấp nhận yêu cầu thu thập chứng cứ', desc: 'số [Số thông báo] · nhận ngày 25-10-2026 · hạn cuối 07-11-2026 · Còn 3 ngày' }, { id: 'v2', code: 'Mẫu 21-DS', name: 'Quyết định đình chỉ giải quyết yêu cầu', desc: 'số [Số quyết định] · nhận ngày 20-10-2026 · hạn cuối 04-11-2026 · Hôm nay là ngày cuối' }];
var KNV_DA = [{ ten: 'Quyết định áp dụng biện pháp khẩn cấp tạm thời', meta: 'Mẫu 15-DS · số 03/2026/QĐ-BPKCTT · nhận ngày 10-10-2026', hs: 'KNTT-2026-0009' }];
var KNV_HET = [{ ten: 'Thông báo nộp tiền tạm ứng án phí', meta: 'Mẫu 08-DS · số [Số thông báo] · nhận ngày 01-10-2026', han: 'hết hạn 08-10-2026 · Quá hạn 27 ngày' }];
var KNV_CHUA = [{ ten: 'Giấy triệu tập', meta: 'Mẫu 01-DS · số [Số giấy triệu tập] · nhận ngày 28-10-2026' }];
function KnvVbOff(x, note) {
  return h('div', { key: x.ten, className: 'kv-vb-off', 'aria-disabled': 'true' }, h('b', null, x.ten), h('small', null, x.meta + (x.han ? ' · ' + x.han : '')), note ? h('p', null, note) : null);
}
function KnvNhom(t, d, n, tone, children, mo) {
  var hd = t + ' · ' + n;
  return h('section', { className: 'kv-nhom' }, mo ? h('button', { type: 'button', className: 'kv-nhom-h kv-nhom-' + tone + ' kv-nhom-bt', 'aria-expanded': mo[0], onClick: function () { mo[1](!mo[0]); } }, h(T.Icon, { name: 'chevronDown', className: mo[0] ? 'kv-xoay' : '' }), hd)
    : h('p', { className: 'kv-nhom-h kv-nhom-' + tone }, hd), h('small', null, d), !mo || mo[0] ? h('div', { className: 'kv-nhom-l' }, children) : null);
}
function KnvQd(o) {
  var va = React.useState(o.rong ? '' : 'DS-2026-0012'), vb = React.useState(o.tong ? 'v1' : ''), doi = React.useState(false), het = React.useState(false);
  var cur = TL_VA.filter(function (x) { return x.ma === va[0]; })[0];
  if (o.rong) return h('section', { className: 'ph-s1-sec ph-fsec' }, Lbl('Chọn đơn hoặc vụ án để xác định Tòa án nhận đơn', 1),
    h('div', { className: 'kv-rong' }, P('Chưa có đơn hay vụ án nào có quyết định, văn bản còn trong thời hiệu khiếu nại.'), Btn('Chọn thủ tục khác', 'secondary', { size: 'sm', 'data-pt-go': 'backTo:choose' })));
  return h(F, null,
    o.tong ? NoteBox(h('p', null, h('b', null, 'Mở từ Hộp thư tống đạt.'), ' Hệ thống đã chọn sẵn văn bản bị khiếu nại và vụ án chứa văn bản đó.')) : null,
    h('section', { className: 'ph-s1-sec ph-fsec' }, h('div', { className: 'kv-hd' }, Lbl('Chọn đơn hoặc vụ án để xác định Tòa án nhận đơn', 1),
      cur ? h('button', { type: 'button', className: 'ph-link kv-doi', onClick: function () { doi[1](!doi[0]); } }, doi[0] ? 'Giữ vụ án hiện tại' : 'Đổi vụ án') : null),
      !doi[0] && cur ? h(F, null, h('div', { className: 'ph-boxlist' }, h(LvRows, { label: 'Vụ án đã chọn', cur: cur.ma, items: [{ id: cur.ma, code: cur.ma, name: cur.ten, desc: cur.vt + ' · ' + cur.toa }], onPick: function () { doi[1](true); } })),
        P('Danh sách văn bản bên dưới lấy theo vụ án này.', 'ph-muted kv-sm'))
        : h(VuAnChon, { label: 'Chọn đơn hoặc vụ án để xác định Tòa án nhận đơn', v: va[0], desc: '2 vụ án, đơn có quyết định, văn bản còn hạn khiếu nại', onChange: function (id) { va[1](id); vb[1](''); doi[1](false); } })),
    cur ? h('section', { className: 'ph-s1-sec ph-fsec' }, h('div', { className: 'kv-hd' }, Lbl('Quyết định, văn bản còn trong thời hiệu khiếu nại', 1), h('span', { className: 'kv-dem' }, KNV_VB.length)),
      Lead(KNV_VB.length + ' văn bản còn hạn khiếu nại trên đơn, vụ án đã chọn của bạn'),
      h('div', { className: 'ph-boxlist' }, h(LvRows, { label: 'Quyết định, văn bản bị khiếu nại', cur: vb[0], items: KNV_VB, onPick: vb[1] })),
      KnvNhom('Đã nộp đơn khiếu nại', 'Các quyết định này bạn đã khiếu nại; không chọn lại được.', KNV_DA.length, 'warn', KNV_DA.map(function (x) {
        return KnvVbOff(x, h(F, null, 'Bạn đã nộp đơn khiếu nại cho quyết định này (hồ sơ ', h('b', { className: 'kv-mono' }, x.hs), '). Mỗi quyết định chỉ khiếu nại một lần; khiếu nại lần hai thực hiện ở chi tiết hồ sơ khi có văn bản giải quyết.'));
      })),
      KnvNhom('Đã hết thời hiệu khiếu nại', 'Văn bản đã hết thời hiệu chỉ để xem thông tin, không chọn và không thể khiếu nại qua Cổng.', KNV_HET.length, 'mute', KNV_HET.map(function (x) { return KnvVbOff(x); }), het),
      KnvNhom('Chưa mở khiếu nại qua Cổng', 'Văn bản đã tống đạt cho bạn nhưng chưa thể khiếu nại qua Cổng; không chọn được.', KNV_CHUA.length, 'warn', KNV_CHUA.map(function (x) { return KnvVbOff(x, 'Văn bản chưa được cấu hình khiếu nại qua Cổng.'); }))) : null);
}
function VuAnChon(p) {
  var q = React.useState(''), v = React.useState(p.v || '');
  var items = TL_VA.map(function (x) { return { id: x.ma, code: x.ma, name: x.ten, desc: x.vt + ' · ' + x.toa }; }).concat(p.khongGan ? [{ id: 'none', name: 'Không gắn vụ án', desc: p.khongGanDesc }] : []);
  return h('section', { className: 'ph-s1-sec ph-fsec' }, p.noLbl ? null : Lbl(p.label, p.req), p.desc ? Lead(p.desc) : null,
    h('div', { className: 'fx-search' }, Tf('Tìm vụ án', { icon: 'search', placeholder: 'Tìm theo mã vụ án, tên vụ án hoặc Tòa án…', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })),
    h('div', { className: 'ph-boxlist' }, h(LvRows, { label: p.label, cur: v[0], items: items.filter(function (x) { var kq = khongDau(q[0].trim()); return !kq || khongDau(x.id + ' ' + x.name + ' ' + x.desc).indexOf(kq) >= 0; }), onPick: function (id) { v[1](id); if (p.onChange) p.onChange(id); } })));
}
/* trở ngại khách quan – chỉ hiện khi ĐÃ HẾT thời hiệu khiếu nại hành vi (web GuardBox choMoKhoa) */
function KnvHet() {
  var c = React.useState(false), l = React.useState('');
  var ok = c[0] && l[0].trim().length >= 15;
  return h('div', { className: 'kv-guard kv-guard-' + (ok ? 'warn' : 'het') }, h(T.Icon, { name: 'alert' }), h('div', null,
    h('b', null, ok ? 'Đã hết thời hiệu — sẽ gửi kèm trình bày về trở ngại khách quan' : 'Đã hết thời hiệu khiếu nại — không thể tiếp tục'),
    h('p', null, 'Thời hiệu 15 ngày tính từ 10-10-2026 — hạn cuối 25-10-2026. ' + (ok ? 'Tòa án xem xét trở ngại khách quan khi tiếp nhận đơn.' : 'Nếu có trở ngại khách quan, tích ô bên dưới và trình bày lý do.')),
    h(T.Checkbox, { label: 'Có sự kiện bất khả kháng hoặc trở ngại khách quan làm tôi không thể khiếu nại trong thời hiệu', /* v407 */ checked: c[0], onChange: function (e) { c[1](e.target.checked); } }),
    c[0] ? h(T.TextField, { className: 'kq-nolbl', 'aria-label': 'Trình bày trở ngại khách quan', multiline: true, value: l[0], onChange: function (e) { l[1](e.target.value); }, maxLength: 1000, showCount: true, placeholder: 'Trình bày cụ thể sự kiện, thời gian và tài liệu chứng minh (tối thiểu 15 ký tự)…' }) : null)); /* v406: như web */
}
function Knv1(k, o) {
  o = o || {};
  var va = React.useState(o.kg ? 'none' : 'DS-2026-0012'), kg = va[0] === 'none', doi = React.useState(false), tc = k === 'ktv';
  var cur = TL_VA.filter(function (x) { return x.ma === va[0]; })[0];
  var body;
  if (o.lan2) body = FCard(k === 'ktv' ? 'Đối tượng bị tố cáo' : 'Đối tượng bị khiếu nại và thời hiệu', KnvLan2(k), true);
  else if (k === 'kqd') return KnvWz(k, 1, h(KnvQd2, o), o.rong || o.loi ? Btn('Tiếp theo', 'primary', { disabled: true }) : null, o); /* v400 */
  else body = FCard(tc ? 'Đối tượng bị tố cáo' : 'Đối tượng bị khiếu nại và thời hiệu', h(F, null,
    /* v412: bỏ lời dẫn */
    h(KhvVaPick, { tc: tc, v: va[0], mo: o.vaMo, onPick: va[1] }), /* v412: ô chọn mở bảng từ đáy */
    kg ? h(F, null, h(SelSheet, { label: tc ? 'Tòa án nơi người bị tố cáo công tác' : 'Tòa án đang giải quyết vụ án, vụ việc', req: true, search: true, ph: tc ? 'Chọn tòa án nơi người bị tố cáo công tác' : 'Chọn tòa án đang giải quyết vụ án, vụ việc', opts: TL_TOA, v: o.kg ? COURT1 : undefined }),
      Tf(tc ? 'Vụ án, vụ việc liên quan' : 'Số hồ sơ, vụ án, vụ việc', { placeholder: tc ? 'Nhập vụ án, vụ việc liên quan' : 'Nhập số hồ sơ, vụ án, vụ việc' })) : null,
    !tc ? h(F, null, Tf('Họ và tên người có hành vi bị khiếu nại', { required: true, placeholder: 'Nhập họ và tên người có hành vi bị khiếu nại', defaultValue: o.het ? 'Nguyễn Văn B' : undefined }),
      h(SelSheet, { label: 'Chức danh', ph: 'Chọn chức danh', opts: ['Thẩm phán', 'Hội thẩm nhân dân', 'Thư ký Tòa án', 'Thẩm tra viên', 'Chánh án', 'Phó Chánh án'], v: o.het ? 'Thư ký Tòa án' : undefined }),
      Tf('Ngày bạn biết được hành vi tố tụng', Dt({ required: true, placeholder: 'Chọn ngày bạn biết được hành vi tố tụng', defaultValue: o.het ? '10-10-2026' : undefined })),
      o.het ? h(KnvHet) : null)
      : h(F, null, Tf('Họ và tên người bị tố cáo', { required: true, placeholder: 'Nhập họ và tên người bị tố cáo' }),
        Tf('Chức danh, đơn vị công tác', { required: true, placeholder: 'Nhập chức danh, đơn vị công tác' }) /* v412: bỏ ghi chú Cần chứng cứ */)), true);
  return KnvWz(k, 1, h(F, null, KhvChon(k, cur, kg, o), body) /* v412 */, o.rong ? Btn('Tiếp theo', 'primary', { disabled: true }) : null, o);
}
/* tư cách tố tụng khi không gắn vụ án (danh mục TUCACHTGTTDS – tên mục là dữ liệu mẫu) */
var KNV_TU_CACH = ['Nguyên đơn', 'Bị đơn', 'Người có quyền lợi, nghĩa vụ liên quan', 'Người đại diện hợp pháp của đương sự', 'Người bảo vệ quyền và lợi ích hợp pháp của đương sự', 'Người làm chứng'];
function Knv2(k, o) {
  o = o || {}; var tc = k === 'ktv', kg = !!o.kg, bm = React.useState(true), tcach = React.useState(kg && !tc ? KNV_TU_CACH[4] : '');
  var rows = [['Họ và tên', 'Hoàng Dương'], ['Số định danh cá nhân', '001090012345'], k === 'kqd' ? ['Số điện thoại', '0912345678'] : ['Địa chỉ', 'Số 8 Phạm Hùng, Phường Từ Liêm, Thành phố Hà Nội']]
    .concat(kg ? [['Trong vụ án', 'Không gắn vụ án']] : o.don ? [['Tư cách tố tụng', 'Người khởi kiện'], ['Trong đơn', 'Đơn [Số tiếp nhận] — Tranh chấp hợp đồng thuê nhà']] : [['Tư cách tố tụng', 'Nguyên đơn'], ['Trong vụ án', 'DS-2026-0012 · Tranh chấp hợp đồng vay tài sản']]); /* v400 */
  return KnvWz(k, 2, h(F, null,
    FCard('Nội dung ' + KNV[k].w, h(F, null, /* v408: bỏ lời dẫn */
      tc ? h(F, null, Tf('Nội dung tố cáo', { required: true, multiline: true, placeholder: 'Nhập nội dung tố cáo' }),
        Tf('Yêu cầu, đề nghị của người tố cáo', { required: true, multiline: true, placeholder: 'Nhập yêu cầu, đề nghị của người tố cáo' }),
        h('div', { className: 'kv-bm' }, h(T.Checkbox, { label: 'Yêu cầu giữ bí mật danh tính người tố cáo', checked: bm[0], onChange: function (e) { bm[1](e.target.checked); } }),
          P('Tòa án có trách nhiệm giữ bí mật họ tên, địa chỉ, bút tích và thông tin cá nhân khác của người tố cáo. Khi tích ô này, Cổng gửi kèm đề nghị áp dụng biện pháp bảo vệ người tố cáo; việc xem xét thuộc Tòa án.', 'ph-muted')),
        NoteBox(h('p', null, h('b', null, 'Không tiếp nhận tố cáo nặc danh.'), ' Đơn tố cáo phải ghi rõ họ tên người tố cáo.')))
        : h(F, null, Tf('Tóm tắt nội dung khiếu nại', { required: true, placeholder: 'Nhập tóm tắt nội dung khiếu nại' /* v409, v412 */ }),
          Tf('Diễn biến, nội dung khiếu nại', { required: true, multiline: true, placeholder: 'Nhập diễn biến, nội dung khiếu nại' }),
          Tf('Yêu cầu giải quyết khiếu nại', { required: true, multiline: true, placeholder: 'Nhập yêu cầu giải quyết khiếu nại' })),
      null /* v408: bỏ ghi chú chia loại đơn */), true),
    FCard('Người ' + KNV[k].w + ' và tư cách', h(F, null, Lead('Tòa án căn cứ tư cách người gửi đơn để xác định quyền khiếu nại, tố cáo theo pháp luật tố tụng.'),
      h('p', { className: 'ph-me' }, h('b', null, k === 'kqd' ? 'Chính tôi khiếu nại' : kg ? 'Chính tôi tự ' + KNV[k].w : 'Thông tin lấy từ vụ án'), h(T.StatusBadge, { tone: 'success', icon: false }, 'Theo tài khoản VNeID')),
      RvKV(rows),
      kg && !tc ? h(SelSheet, { label: 'Tư cách tố tụng của bạn', req: true, ph: 'Chọn tư cách tố tụng của bạn', opts: KNV_TU_CACH, v: tcach[0], onChange: tcach[1] }) : null,
      /* v406: bỏ ghi chú Cần giấy tờ chứng minh tư cách (web không có) */
      null /* v410, v412: bỏ ghi chú VNeID */), true)), null, o);
}
function Knv3(k, o) {
  o = o || {}; var tc = k === 'ktv', bv = o.kg && k === 'khv';
  var he = o.lan2 ? [[(tc ? 'Đơn tố cáo lần 2' : 'Đơn khiếu nại lần 2'), 'Hệ thống tạo từ nội dung bạn đã khai']] : k === 'kqd' ? [KNV[k].he[0], o.don ? ['Thông báo trả lại đơn của Tòa án', 'Thông báo trả lại đơn khởi kiện · số [Số thông báo]', 'thong-bao-tra-lai-don.pdf'] : ['Bản sao quyết định bị khiếu nại', 'Thông báo không chấp nhận yêu cầu thu thập chứng cứ · số [Số thông báo]', 'thong-bao-khong-chap-nhan.pdf']] : KNV[k].he; /* v400 */
  var bat = (bv ? [{ id: 'bv', ten: 'Giấy tờ chứng minh tư cách người bảo vệ quyền và lợi ích hợp pháp của đương sự' }] : []).concat(tc ? [{ id: 'cc', ten: 'Tài liệu, chứng cứ chứng minh nội dung tố cáo' }] : []);
  return KnvWz(k, 3, h(F, null, tc && !('D') ? NoteBox(h('p', null, h('b', null, 'Đơn tố cáo bắt buộc kèm chứng cứ.'), ' Người giải quyết tố cáo cần thông tin, tài liệu, chứng cứ để xác minh hành vi bị tố cáo. Bạn phải tải lên ít nhất một tài liệu, chứng cứ thì mới gửi được đơn.')) : null,
    h(TaiLieuCard, { title: 'Tài liệu, chứng cứ', desc: null /* v408 */, he: he,
      bat: bat, bb0: {}, bs0: [], batPa: tc ? 'D' : null })), null, o); /* v413 */
}
function Knv4(k, o) {
  o = o || {}; var t = knvTT(k), tc = k === 'ktv', qd = k === 'kqd';
  var va = o.kg ? 'Không gắn vụ án' : 'DS-2026-0012 · Tranh chấp hợp đồng vay tài sản';
  var review = qd ? [['Thủ tục', knvTen(k, o)], ['Vụ án', va], o.lan2 ? ['Hồ sơ lần đầu', 'KNTT-2026-0009'] : null, ['Văn bản bị khiếu nại', o.lan2 ? 'Quyết định giải quyết khiếu nại · số 12/2026/QĐ-GQKN' : 'Thông báo không chấp nhận yêu cầu thu thập chứng cứ · số [Số thông báo]'],
    ['Cơ quan giải quyết', o.lan2 ? 'Chánh án Tòa án cấp trên trực tiếp' : 'Chánh án Tòa án đã ra văn bản'], ['Tóm tắt', '[Tóm tắt nội dung khiếu nại]'], ['Yêu cầu giải quyết', '[Yêu cầu giải quyết khiếu nại]'], ['Tài liệu, chứng cứ', '[Tài liệu, chứng cứ]']]
    : [['Loại việc', knvTen(k, o)], ['Vụ án liên quan', va], ['Tòa án', o.lan2 ? 'Tòa án nhân dân Thành phố Hà Nội' : COURT1], o.kg ? ['Số hồ sơ, vụ việc khai', '45/2026/TLST-DS'] : null,
      o.lan2 ? ['Hồ sơ lần đầu', 'KNTT-2026-0009'] : null,
      [tc ? 'Người bị tố cáo' : 'Người có hành vi bị khiếu nại', 'Nguyễn Văn B · Thư ký Tòa án'], tc ? null : ['Ngày biết được hành vi', '10-10-2026'], ['Thủ tục áp dụng', t.ten], ['Cơ quan giải quyết', t.cq],
      [tc ? 'Nội dung tố cáo (tóm tắt)' : 'Tóm tắt', '[Tóm tắt]'], [tc ? 'Yêu cầu, đề nghị' : 'Yêu cầu giải quyết', '[Yêu cầu]'],
      ['Tư cách người ' + KNV[k].w, 'Hoàng Dương (chính bạn) · ' + (o.kg && !tc ? 'Người bảo vệ quyền và lợi ích hợp pháp của đương sự' : o.kg ? '—' : 'Nguyên đơn')],
      tc ? ['Bảo vệ người tố cáo', 'Giữ bí mật họ tên, địa chỉ, bút tích và thông tin cá nhân của người tố cáo; đề nghị áp dụng biện pháp bảo vệ người tố cáo'] : null];
  var tl = qd && !o.lan2 ? [['Bản sao quyết định bị khiếu nại', 'ban-sao-quyet-dinh.pdf']] : o.kg && k === 'khv' ? [['Giấy tờ chứng minh tư cách người bảo vệ', 'giay-chung-nhan-nguoi-bao-ve.pdf']] : tc ? [['Tài liệu, chứng cứ chứng minh nội dung tố cáo', 'chung-cu-to-cao.pdf']] : [];
  return KyGui({ title: 'Soạn đơn', steps: knvSteps(k), n: 4, rvTitle: 'Xem lại và ký gửi', rvDesc: 'Kiểm tra lại toàn bộ thông tin trước khi ký số và gửi đến Tòa án.',
    review: review.filter(Boolean),
    moTa: 'Xem trước đơn và ký số từ xa bằng chữ ký số cá nhân (VNPT / Viettel / BKAV-CA). Ký xong, tích cam đoan rồi bấm “Gửi đơn”.', don: o.lan2 ? KNV[k].don + ' lần 2' : KNV[k].don, donTep: 'don-' + KNV[k].w.replace(/ /g, '-') + (o.lan2 ? '-lan-2' : '') + '.pdf', vaiTro: 'Người ' + KNV[k].w, tl: tl,
    camDoan: tc ? 'Tôi cam đoan những nội dung tố cáo và tài liệu kèm theo là đúng sự thật; tôi hiểu rằng việc tố cáo sai sự thật có thể bị xử lý theo quy định của pháp luật.' : 'Tôi cam đoan những nội dung khiếu nại và tài liệu kèm theo là đúng sự thật; tôi hiểu rằng việc khiếu nại sai sự thật có thể bị xử lý theo quy định của pháp luật.',
    btn: 'Gửi đơn', ok: 'kvaOk' + (o.lan2 ? 'L' : '') + (tc ? 'Tc' : '') });
}
/* màn "Đã gửi đơn thành công" dùng chung (web chung/man-gui-thanh-cong.tsx) */
function KvaOk(p) {
  p = p || {}; var tc = p.tc;
  return KetQua({ title: p.loi ? 'Đã lưu đơn trên Cổng' : 'Đã gửi đơn thành công',
    desc: p.loi ? 'Hồ sơ đã được lưu nhưng chưa gửi được sang Tòa án. Bạn có thể theo dõi trạng thái trong danh sách hồ sơ.'
      : p.lan2 ? 'Đơn ' + (tc ? 'tố cáo' : 'khiếu nại') + ' lần hai (hồ sơ mới, mã tiếp nhận mới) của hồ sơ KNTT-2026-0009 đã được ký số và gửi đến Tòa án.'
      : (tc ? 'Đơn tố cáo' : 'Đơn khiếu nại') + ' đã được ký số và gửi đến Tòa án. Hồ sơ nằm ở tab “Khiếu nại, tố cáo trong tố tụng”.',
    rows: [['Mã hồ sơ', h('span', { className: 'ph-ok-ma' }, 'KNTT-2026-0031')], ['Mã tiếp nhận tại Tòa án', p.loi ? 'Chưa có' : 'Đang đồng bộ với Tòa án'], p.don ? ['Đơn', 'Đơn [Số tiếp nhận] — Tranh chấp hợp đồng thuê nhà'] : ['Vụ án', 'DS-2026-0012'],
      ['Cơ quan giải quyết', p.don ? 'Chánh án Tòa án đã trả lại đơn' : p.lan2 ? 'Chánh án Tòa án cấp trên trực tiếp' : tc ? 'Chánh án Tòa án' : 'Chánh án Tòa án đang giải quyết vụ án'],
      ['Trạng thái', h(T.StatusBadge, { tone: p.loi ? 'danger' : 'info', icon: false }, p.loi ? 'Gửi lỗi' : 'Đã gửi')]],
    han: p.don ? 'Chánh án phân công Thẩm phán mở phiên họp xem xét trong 05 ngày làm việc kể từ ngày được phân công.' : tc ? '30 ngày kể từ ngày Tòa án nhận được tố cáo; vụ việc phức tạp gia hạn không quá 30 ngày.' : '15 ngày kể từ ngày Tòa án nhận được khiếu nại; vụ việc phức tạp gia hạn không quá 15 ngày.',
    b1: 'Xem chi tiết hồ sơ', b2: 'Về danh sách hồ sơ' });
}

/* ---------- khởi động ---------- */
/* ảnh nền (phương án B, chọn 30/10/2026): đặt qua biến CSS --ph-img, màu lớp phủ lấy từ token */
function BgImg(cls, src) { return h('div', { className: cls, 'aria-hidden': 'true', style: src ? { '--ph-img': 'url("' + src + '")' } : undefined }); }
function Splash() {
  return h(Phone, { cls: 'ph-splash ph-splash-img' }, BgImg('ph-splash-bg', window.__SPLASH),
    h('div', { className: 'ph-splash-in' }, h('img', { src: LOGO, alt: 'Quốc huy Tòa án nhân dân' }), /* v267: bỏ dòng "Tòa án nhân dân tối cao", tên đổi thành "Cổng dịch vụ tư pháp Tòa án" */ h('p', { className: 'ph-splash-t' }, 'CỔNG DỊCH VỤ TƯ PHÁP TÒA ÁN'), h('div', { className: 'ph-splash-bar' }, h('i'))));
}
function Login() {
  return h(Phone, { cls: 'ph-login' },
    h('div', { className: 'ph-login-top tp-on-dark' }, BgImg('ph-login-bg', window.__LOGIN_BG), h('img', { src: LOGO, alt: 'Quốc huy Tòa án nhân dân' }), /* v270: như màn chào – bỏ "Tòa án nhân dân tối cao", tên "CỔNG DỊCH VỤ TƯ PHÁP TÒA ÁN" 18px in hoa */ h('p', { className: 'ph-login-name' }, 'CỔNG DỊCH VỤ TƯ PHÁP TÒA ÁN')),
    h('div', { className: 'ph-login-card' }, h('h2', null, 'Đăng nhập'), h(LoginLoai), /* v333 */
      h(T.TextField, { label: 'Tài khoản', required: true, icon: 'idCard', inputMode: 'numeric', placeholder: 'Số định danh cá nhân hoặc tổ chức' /* v271 */ }),
      h(T.TextField, { label: 'Mật khẩu', required: true, icon: 'lock', type: 'password', placeholder: 'Nhập mật khẩu' }),
      h(T.Button, { block: true }, 'Đăng nhập'),
      h('p', { className: 'ph-or' }, 'Hoặc đăng nhập bằng'),
      h(T.Button, { variant: 'secondary', block: true, className: 'ph-idbtn' }, 'Tài khoản định danh điện tử', h('img', { className: 'ph-vneid', src: window.__VNEID, alt: '' })),
      h('p', { className: 'ph-signup' }, 'Chưa có tài khoản? ', h('button', { type: 'button' }, 'Đăng ký ngay')),
      /* v268: chân màn Đăng nhập – thay dòng phiên bản bằng tên cơ quan */ P('Tòa án nhân dân tối cao', 'ph-login-foot')));
}

/* v327 (12/11/2026): Bước 4 – Nhập thông tin theo trường web (yC + hE): Thời điểm phát sinh vụ việc*, Tóm tắt quá trình sự việc*, Căn cứ pháp lý,
   khối "Yêu cầu Tòa án giải quyết" (phương án Y1 – thẻ con): mỗi yêu cầu 1 thẻ (Nội dung yêu cầu*, Giá trị kê khai (VNĐ), Mô tả chi tiết yêu cầu, nút xóa dòng),
   "Thêm nội dung yêu cầu", "TỔNG GIÁ TRỊ KÊ KHAI"; Bước 6 đọc lại ND_ST + YC_ST */
function soTien(v) { var d = String(v || '').replace(/\D/g, ''); return d ? d.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''; }
var ND_ST = { td: '', tt: '', cc: '' }, YC_ST = { rows: [{ nd: '', gt: '', mt: '' }] };
var YC_MAU = [{ nd: 'Buộc bị đơn trả số tiền gốc đã vay', gt: '100000000', mt: '' }, { nd: 'Buộc bị đơn trả tiền lãi chậm trả', gt: '50000000', mt: '' }];
function YcBlock(p) {
  var r = React.useState(YC_ST.rows), rows = r[0], loi = (p && p.loi) || {};
  function luu(n) { YC_ST.rows = n; r[1](n); if (NDB.kt4) ndBao(); }
  function set(i, k, v) { luu(rows.map(function (x, j) { if (j !== i) return x; var o = Object.assign({}, x); o[k] = v; return o; })); }
  var tong = rows.reduce(function (s, x) { return s + (Number(x.gt) || 0); }, 0);
  return h('div', { className: 'yc' + (loi.bang ? ' yc-loi' : '') },
    h('div', { className: 'yc-t' }, h('b', null, 'Yêu cầu Tòa án giải quyết', h('span', { className: 'tp-field-req', 'aria-hidden': 'true' }, '*'))), /* v552 (người dùng 23/11): bỏ câu mô tả dưới tiêu đề */
    h('div', { className: 'yc-list' }, rows.map(function (x, i) {
      return h('div', { key: i, className: 'yc-c' },
        h('div', { className: 'yc-h' }, h('b', null, 'Yêu cầu ' + (i + 1)), h('button', { type: 'button', className: 'yc-x pt-chk', 'aria-label': 'Xóa dòng yêu cầu', onClick: function () { luu(rows.filter(function (y, j) { return j !== i; })); } }, h(T.Icon, { name: 'trash' }))),
        h('div', { className: 'yc-b' },
          Tf('Nội dung yêu cầu', { required: true, multiline: true, maxLength: 500, placeholder: 'Tự nhập nội dung yêu cầu', error: loi['nd' + i], value: x.nd, onChange: function (e) { set(i, 'nd', e.target.value); } }),
          Tf('Giá trị kê khai (VNĐ)', { inputMode: 'numeric', placeholder: '0', help: 'Yêu cầu không tính tiền thì để trống', value: soTien(x.gt), onChange: function (e) { set(i, 'gt', e.target.value.replace(/\D/g, '')); } }),
          Tf('Mô tả chi tiết yêu cầu', { multiline: true, maxLength: 2000, placeholder: 'Diễn giải cụ thể yêu cầu này', error: loi['mt' + i], value: x.mt, onChange: function (e) { set(i, 'mt', e.target.value); } })));
    })),
    loi.bang ? h('p', { className: 'q2-err', role: 'alert' }, h(T.Icon, { name: 'alert' }), loi.bang) : null,
    h(T.Button, { variant: 'tint', block: true, icon: 'plus', className: 'ph-co-add pt-chk', onClick: function () { luu(rows.concat([{ nd: '', gt: '', mt: '' }])); } }, 'Thêm nội dung yêu cầu'),
    h('div', { className: 'yc-tong' }, h('span', null, 'TỔNG GIÁ TRỊ KÊ KHAI'), h('b', { className: 'tp-num' }, tong > 0 ? soTien(String(tong)) + ' đ' : '—')));
}
/* v554 (người dùng 23/11 chọn "Bánh xe ngày/tháng/năm"): ô ngày dạng ô chọn (biểu tượng lịch), chạm mở bảng từ đáy 3 cột cuộn Ngày – Tháng – Năm, dải giữa là giá trị chọn, "Áp dụng" mới nhận */
var BX_H = 40;
function BxCot(p) {
  var ref = React.useRef(null), t = React.useRef(0), i0 = Math.max(0, p.items.indexOf(p.v));
  React.useLayoutEffect(function () { if (ref.current) ref.current.scrollTop = i0 * BX_H; }, [p.items.length]);
  function den(i, muot) { if (ref.current) ref.current.scrollTo({ top: i * BX_H, behavior: muot ? 'smooth' : 'auto' }); }
  function cuon() {
    clearTimeout(t.current);
    t.current = setTimeout(function () { var el = ref.current; if (!el) return; var i = Math.min(p.items.length - 1, Math.max(0, Math.round(el.scrollTop / BX_H))); if (Math.abs(el.scrollTop - i * BX_H) > 1) den(i, true); if (p.items[i] !== p.v) p.onDoi(p.items[i]); }, 110);
  }
  return h('div', { ref: ref, className: 'bx-cot', role: 'listbox', 'aria-label': p.label, tabIndex: 0, onScroll: cuon },
    h('div', { className: 'bx-dem' }), p.items.map(function (x, i) {
      return h('div', { key: x, role: 'option', 'aria-selected': x === p.v, className: 'bx-it' + (x === p.v ? ' bx-on' : ''), onClick: function () { den(i, true); p.onDoi(x); } }, p.hien ? p.hien(x) : x);
    }), h('div', { className: 'bx-dem' }));
}
function hai(n) { return (n < 10 ? '0' : '') + n; }
function NgayBanhXe(p) {
  var nay = new Date(), m0 = /^(\d{2})-(\d{2})-(\d{4})$/.exec(p.v || '');
  var d = React.useState(m0 ? +m0[1] : nay.getDate()), mo = React.useState(m0 ? +m0[2] : nay.getMonth() + 1), y = React.useState(m0 ? +m0[3] : nay.getFullYear());
  /* v578 (lỗi 3 KNTC tố tụng, PA A): p.maxNay – không hiện ngày, tháng sau hôm nay */
  var gioiY = !!p.maxNay && y[0] === nay.getFullYear(), soThang = gioiY ? nay.getMonth() + 1 : 12, mm = Math.min(mo[0], soThang);
  var soNgay = new Date(y[0], mm, 0).getDate(); if (gioiY && mm === nay.getMonth() + 1) soNgay = Math.min(soNgay, nay.getDate());
  var dd = Math.min(d[0], soNgay);
  var ngay = [], thang = [], nam = [];
  for (var i = 1; i <= soNgay; i++) ngay.push(i);
  for (i = 1; i <= soThang; i++) thang.push(i);
  for (i = 1950; i <= nay.getFullYear(); i++) nam.push(i);
  return h(LvSheet, { host: p.host, title: p.title, onClose: p.onClose, foot: h(T.Button, { block: true, onClick: function () { p.onOk(hai(dd) + '-' + hai(mm) + '-' + y[0]); } }, 'Áp dụng') },
    h('div', { className: 'bx' },
      h('div', { className: 'bx-nhan' }, h('span', null, 'Ngày'), h('span', null, 'Tháng'), h('span', null, 'Năm')),
      h('div', { className: 'bx-khung' }, h('div', { className: 'bx-dai', 'aria-hidden': 'true' }),
        h(BxCot, { key: 'd' + soNgay, label: 'Ngày', items: ngay, v: dd, onDoi: d[1], hien: hai }),
        h(BxCot, { key: 'm' + soThang, label: 'Tháng', items: thang, v: mm, onDoi: mo[1], hien: function (x) { return 'Tháng ' + x; } }),
        h(BxCot, { label: 'Năm', items: nam, v: y[0], onDoi: y[1] }))));
}
function NgayChonO(p) {
  var o = React.useState(false), anchor = React.useRef(null), host = useHost(anchor);
  return h('div', { className: 'ph-sel-ngay' }, h('span', { ref: anchor, hidden: true }),
    Sf(p.label, { required: p.required, error: p.error, value: p.v || undefined, open: o[0], onClick: function () { o[1](true); } }),
    o[0] && host ? h(NgayBanhXe, { host: host, title: 'Chọn ' + thuongDau(p.label), v: p.v, maxNay: p.maxNay, onClose: function () { o[1](false); }, onOk: function (x) { p.onDoi(x); o[1](false); } }) : null);
}
function NoiDungTruong(p) {
  var td = React.useState(ND_ST.td), cc = React.useState(ND_ST.cc), loi = p.loi || {};
  return h(F, null,
    h(NgayChonO, { label: 'Thời điểm phát sinh vụ việc', required: true, error: loi.td, v: td[0], onDoi: function (x) { ND_ST.td = x; td[1](x); if (NDB.kt4) ndBao(); } }), /* v554 demo: chọn ngày bằng bánh xe Ngày – Tháng – Năm */
    Tf('Tóm tắt quá trình sự việc', { required: true, multiline: true, error: loi.tt, value: p.nd, onChange: function (e) { ND_ST.tt = e.target.value; p.onNd(e); if (NDB.kt4) ndBao(); } }),
    Tf('Căn cứ pháp lý', { multiline: true, placeholder: 'Điều luật, văn bản pháp luật liên quan (tùy chọn)', value: cc[0], onChange: function (e) { ND_ST.cc = e.target.value; cc[1](e.target.value); } }),
    h(YcBlock, { loi: loi }));
}
/* Bước 6 – khối Nội dung đơn theo web: Thời điểm phát sinh (trống → —), Tóm tắt sự việc, Căn cứ pháp lý (nếu có), Yêu cầu n "nội dung — giá trị VNĐ / không kê khai giá trị",
   Tổng giá trị kê khai (chỉ khi > 0, chỉ hiển thị, không tính án phí) */
function RvNoiDung() {
  var GACH = h('span', null, '—'); /* như web: trống hiện — (không theo quy ước '-' của vd) */
  var t = [['Thời điểm phát sinh', ND_ST.td || GACH], ['Tóm tắt sự việc', ND_ST.tt.trim() || GACH]];
  if (ND_ST.cc.trim()) t.push(['Căn cứ pháp lý', ND_ST.cc.trim()]);
  var ds = YC_ST.rows.filter(function (x) { return x.nd.trim(); });
  if (ds.length) {
    ds.forEach(function (x, i) { t.push(['Yêu cầu ' + (i + 1), x.nd.trim() + ' — ' + (x.gt ? soTien(x.gt) + ' VNĐ' : 'không kê khai giá trị') + (x.mt.trim() ? '\n' + x.mt.trim() : '')]); });
    var tong = ds.reduce(function (s, x) { return s + (Number(x.gt) || 0); }, 0);
    if (tong > 0) t.push(['Tổng giá trị kê khai', h('span', { className: 'tp-num' }, soTien(String(tong)) + ' VNĐ')]);
  } else t.push(['Nội dung yêu cầu', GACH]);
  return RvKV(t);
}
/* v566 (người dùng 23/11): tóm tắt mẫu dài hơn 5 dòng để thấy "Xem thêm" ở Xem lại (dữ liệu ví dụ) */
var ND_TT_MAU = 'Ngày 15-03-2025, tôi cho ông Trần Văn Bình vay 200.000.000 đồng, hẹn trả sau 6 tháng, hai bên có lập hợp đồng vay tài sản và giấy nhận tiền. Đến hạn ngày 15-09-2025, ông Bình chỉ trả được 100.000.000 đồng tiền gốc. Tôi đã nhiều lần nhắc nhở trực tiếp và gửi văn bản yêu cầu thanh toán vào các ngày 01-10-2025 và 01-11-2025 nhưng ông Bình không trả số tiền còn lại và tiền lãi chậm trả. Hai bên đã hòa giải tại Ủy ban nhân dân phường nhưng không thành.';
function Sub4Yc() { ND_ST.td = ND_ST.td || '15-03-2025'; ND_ST.tt = ND_ST.tt || ND_TT_MAU; if (!YC_ST.rows.some(function (x) { return x.nd; })) YC_ST.rows = YC_MAU.map(function (x) { return Object.assign({}, x); }); return Submit(4, h(NoiDungCard, { nd0: ND_ST.tt })); } /* v327: màn xem nhanh có sẵn dữ liệu mẫu */

/* v330 (12/11/2026, chọn O1 – như web jD/sie): Bước 7 khi người khởi kiện là tổ chức – khung nhóm (biểu tượng tòa nhà + tên tổ chức + "cần 2 chữ ký"),
   dòng 1 "Chữ ký cá nhân đại diện" (Ký số đại diện), dòng 2 "Chữ ký tổ chức" (Ký số tổ chức – khóa tới khi đại diện ký xong, ghi "Cần chữ ký của cá nhân đại diện trước.");
   p.ban: "Hồ sơ đang có người ký, hệ thống đang xử lý — vui lòng chờ rồi thử lại." (khối vàng, khóa các nút); p.loi: "Không tải được tiến độ ký. Vui lòng thử lại." */
var KYTC_DD = 'Chữ ký cá nhân đại diện', KYTC_TC = 'Chữ ký tổ chức', KYTC_CAN = 'Cần chữ ký của cá nhân đại diện trước.';
/* demo NDKK 1.86: p.khongDd – tổ chức chưa có người đại diện hợp lệ; p.hetDd – người đại diện đã chọn trên đơn hết hiệu lực (không có nút ký, nêu lối xử lý) */
function KyToChuc(p) {
  if (p.loi) return h('p', { className: 'kytc-loi', role: 'alert' }, h(T.Icon, { name: 'alert' }), 'Không tải được tiến độ ký. Vui lòng thử lại.');
  var dd = p.dd, tc = p.tc, khoa = p.ban, chan = p.khongDd || p.hetDd;
  var nutDD = dd ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : chan ? KyChua() : h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn pt-chk', disabled: khoa, onClick: p.onDD }, 'Ký số đại diện');
  var nutTC = tc ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: dd && !khoa ? 'pen' : 'lock', className: 'ph-ky-btn pt-chk', disabled: !dd || khoa, onClick: p.onTC }, 'Ký số tổ chức');
  return h(F, null,
    khoa ? h('p', { className: 'kytc-ban', role: 'status' }, h(T.Icon, { name: 'alert' }), h('span', null, 'Hồ sơ đang có người ký, hệ thống đang xử lý — vui lòng chờ rồi thử lại.')) : null,
    h('div', { className: 'kytc' },
      h('div', { className: 'kytc-h' }, h(T.Icon, { name: 'building' }), h('b', null, ACC_TC.ten), h('span', null, 'cần 2 chữ ký')),
      h('ul', { className: 'ph-ky kytc-l' },
        h('li', null, h('span', { className: 'ph-ky-no' }, '1'), h('div', null, h('b', null, KYTC_DD), dd ? h('small', { className: 'ph-ky-da' }, KY_LUC) : null), nutDD,
          p.khongDd ? KyXuLy('Tổ chức chưa có người đại diện hợp lệ để ký.', 'Vào mục Hồ sơ tổ chức → Người đại diện để bổ sung người đại diện mới, hoặc gia hạn hiệu lực cho người đã có. Đơn vẫn được giữ ở trạng thái chờ ký, không mất dữ liệu.')
            : p.hetDd ? KyXuLy('Không còn người đại diện nào đã chọn trên đơn ký được.', 'Người đại diện đã chọn trên đơn đã hết hiệu lực hoặc chưa được xác minh danh tính. Vào mục Hồ sơ tổ chức → Người đại diện để gia hạn hoặc hoàn tất xác minh, hoặc sửa đơn để chọn người đại diện khác. Đơn vẫn được giữ ở trạng thái chờ ký, không mất dữ liệu.') : null),
        h('li', null, h('span', { className: 'ph-ky-no' }, '2'), h('div', null, h('b', null, KYTC_TC), !dd ? h('small', null, KYTC_CAN) : tc ? h('small', { className: 'ph-ky-da' }, KY_LUC) : null), nutTC))));
}
function KyChua() { return h(T.StatusBadge, { tone: 'danger', icon: 'clock' }, 'Chưa ký'); } /* 1.85 (người dùng 21/11): Chưa ký màu đỏ */
function KyXuLy(t, d) { return h('div', { className: 'ph-ky-xl' }, h(T.Icon, { name: 'info' }), h('p', null, h('b', null, t), ' ', d)); }
/* 1.85 / 1.86: ô chữ ký theo từng đương sự phía khởi kiện (web tien-do-ky-to-chuc.tsx) – tiêu đề nhóm "{tên} cần 1 chữ ký" / "cần 2 chữ ký" khi có trên 1 nhóm;
   chỉ ô của tài khoản đăng nhập có nút Ký số; tổ chức khác: "Chờ {tên} ký." + lối xử lý */
function KyNhom(p) {
  var so = 0, nhieu = p.nhom.length > 1;
  return h('div', { className: 'ky-nhom' }, p.nhom.map(function (g, gi) {
    var dongs = g.tc ? [{ nhan: KYTC_DD, ai: 'dd' }, { nhan: KYTC_TC, ai: 'tc', can: true }] : [{ nhan: g.ten, vai: g.vai, daKy: g.daKy, toi: g.toi }];
    return h('section', { key: gi, className: 'kytc ky-nhom-g' },
      nhieu || g.tc ? h('div', { className: 'kytc-h' }, h(T.Icon, { name: g.tc ? 'building' : 'user' }), h('b', null, g.ten), h('span', null, g.tc ? 'cần 2 chữ ký' : 'cần 1 chữ ký')) : null,
      h('ul', { className: 'ph-ky kytc-l' }, dongs.map(function (dg, di) {
        so += 1;
        if (g.tc && g.toi) { /* v542: tổ chức đang đăng nhập – Ký số đại diện, rồi Ký số tổ chức (khóa tới khi đại diện ký xong) */
          var daO = dg.ai === 'dd' ? p.dd : p.tc, choDd = dg.ai === 'tc' && !p.dd;
          return h('li', { key: di }, h('span', { className: 'ph-ky-no' }, String(so)), h('div', null, h('b', null, dg.nhan), daO ? h('small', { className: 'ph-ky-da' }, KY_LUC) : choDd ? h('small', null, KYTC_CAN) : null),
            daO ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: choDd || p.khoa ? 'lock' : 'pen', className: 'ph-ky-btn pt-chk', disabled: !!p.khoa || choDd, onClick: dg.ai === 'dd' ? p.onDD : p.onTC }, dg.ai === 'dd' ? 'Ký số đại diện' : 'Ký số tổ chức'));
        }
        var daKy = dg.toi ? p.daKy : !!dg.daKy, sub = [dg.vai, daKy ? (dg.toi ? KY_LUC : dg.daKy) : null].filter(Boolean).join(' · ');
        var phai = daKy ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : dg.toi ? h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn pt-chk', disabled: !!p.khoa, onClick: p.onKy }, 'Ký số') : KyChua();
        return h('li', { key: di }, h('span', { className: 'ph-ky-no' }, String(so)), h('div', null, h('b', null, dg.nhan), sub ? h('small', null, sub) : null), phai);
      })),
      null /* v543 (người dùng 23/11): bỏ ghi chú nền xám "Chờ {tổ chức} ký. …" cuối nhóm tổ chức khác (1.85 PA-B cũ) */);
  }));
}
var KYXL_TC = 'Tổ chức này phải tự ký bằng tài khoản tổ chức của mình. Nếu chưa có tài khoản trên Cổng, tổ chức cần đăng ký và khai người đại diện trước khi ký. Đơn vẫn được giữ ở trạng thái chờ ký, không mất dữ liệu.';
function Sub7Tc() { return h(KySoScreen, { toChuc: true }); }
function Sub7TcBan() { return h(KySoScreen, { toChuc: true, ban: true }); }
function Sub7TcLoi() { return h(KySoScreen, { toChuc: true, loi: true }); }

/* v333: Đăng nhập – thanh chọn loại tài khoản (Cá nhân | Tổ chức) trên ô Tài khoản */
function LoginLoai() {
  var v = React.useState(LOAI_TK);
  return h('div', { className: 'lg-loai' }, h(T.SegmentedControl, { label: 'Loại tài khoản', value: v[0], onChange: function (x) { datLoaiTK(x); v[1](x); }, options: [{ value: 'cn', label: 'Cá nhân' }, { value: 'tc', label: 'Tổ chức' }] }));
}
/* v333: người đại diện theo pháp luật đang có hiệu lực của tổ chức mẫu */
function tcDaiDien() { return ACC_NDD.filter(function (n) { return n.ky.some(function (k) { return ACC_KY.indexOf(k.tt) >= 0; }); }); }
function tcChucVu(n) { var k = n.ky.filter(function (x) { return ACC_KY.indexOf(x.tt) >= 0; })[0]; return k ? k.cv : ''; }
/* v333: Khiếu nại hành chính / Tố cáo / Kiến nghị – bước Người gửi đơn của tài khoản tổ chức (web: Tên tổ chức, Mã số thuế / mã định danh, Địa chỉ trụ sở, Người đại diện theo pháp luật, Chức vụ người đại diện) */
function knhTcRows() {
  var dd = tcDaiDien(), cv = [];
  dd.forEach(function (n) { var c = tcChucVu(n); if (c && cv.indexOf(c) < 0) cv.push(c); });
  return [['Tên tổ chức', ACC_TC.ten], ['Mã số thuế / mã định danh', ACC_TC.mst], ['Địa chỉ trụ sở', ACC_TC.truSo], ['Người đại diện theo pháp luật', dd.map(function (n) { return n.ten; }).join(', ') || '—'], ['Chức vụ người đại diện', cv.join(', ') || '—']];
}
/* v333: Giấy giới thiệu / Công văn – chỉ tài khoản tổ chức (web mJ: Trích lục – bắt buộc khi tư cách Cơ quan nhà nước và tự nhập bản án; Sao chụp tài liệu – không bắt buộc) */
function GiayGT(p) {
  var bb = !!p.bb;
  return FCard('Giấy giới thiệu / Công văn', h(F, null,
    Lead(bb ? 'Cơ quan nhà nước cần cung cấp số và ngày ký giấy giới thiệu hoặc công văn đề nghị cấp.' : 'Không bắt buộc. Nhập nếu cơ quan, tổ chức có giấy giới thiệu hoặc công văn đề nghị cấp.'),
    TwoE(Tf('Số / ký hiệu', { required: bb, maxLength: 50, placeholder: 'VD: 125/GT-UBND' }), Tf('Ngày ký', Dt({ required: bb })))), true);
}

/* ===== v400: Khiếu nại quyết định tố tụng – bước 1 (web nop-don-qd.tsx, develop 65e45a86), bố cục gọn, thứ tự như web:
   "Thủ tục bạn đã chọn" → "Đối tượng bị khiếu nại và thời hiệu" (ô chọn đơn/vụ án → bảng từ đáy; thẻ chọn văn bản; 3 nhóm văn bản không chọn được, thu gọn)
   → khối cảnh báo sắp hết thời hiệu (≤2 ngày). Dữ liệu mẫu; số hiệu văn bản để [ngoặc vuông]. ===== */
var KQD_TT = {
  c41: { ten: 'Khiếu nại văn bản, thông báo tố tụng', cq: 'Chánh án Tòa án đang giải quyết vụ án', han: '15 ngày kể từ ngày Tòa án nhận được khiếu nại; vụ việc phức tạp gia hạn không quá 15 ngày', th: '15 ngày' },
  d194: { ten: 'Khiếu nại việc trả lại đơn khởi kiện', cq: 'Chánh án Tòa án đã trả lại đơn', han: 'Chánh án phân công Thẩm phán mở phiên họp xem xét trong 05 ngày làm việc kể từ ngày được phân công', th: '10 ngày' } };
var KQD_VA = [
  { id: 'DS-2026-0012', don: false, code: 'DS-2026-0012', ten: 'Tranh chấp hợp đồng vay tài sản', vt: 'Nguyên đơn', toa: COURT1, n: 2 },
  { id: 'DON-1', don: true, code: '[Số tiếp nhận]', ten: 'Tranh chấp hợp đồng thuê nhà', vt: 'Người khởi kiện', toa: COURT1, n: 1 },
  { id: 'DS-2026-0018', don: false, code: 'DS-2026-0018', ten: 'Tranh chấp hợp đồng mua bán tài sản', vt: 'Bị đơn', toa: COURT1, n: 0, daNop: 'KNTT-2026-0009' }];
var KQD_VB = {
  'DS-2026-0012': [
    { id: 'v1', code: 'Mẫu 04-DS', ten: 'Thông báo không chấp nhận yêu cầu thu thập chứng cứ', so: 'số [Số thông báo]', tt: 'c41', con: 5, nhan: '25-10-2026', hanCuoi: '09-11-2026' },
    { id: 'v2', code: 'Mẫu 21-DS', ten: 'Quyết định đình chỉ giải quyết yêu cầu', so: 'số [Số quyết định]', tt: 'c41', con: 2, nhan: '21-10-2026', hanCuoi: '05-11-2026' }],
  'DON-1': [
    { id: 't1', code: 'Mẫu 27-DS', ten: 'Thông báo trả lại đơn khởi kiện', so: 'số [Số thông báo]', tt: 'd194', con: 5, nhan: '30-10-2026', hanCuoi: '09-11-2026' }] };
/* văn bản không chọn được – 3 nhóm, tên, lời dẫn và thứ tự như web (phanNhomVanBan) */
var KQD_NHOM = [
  { t: 'Đã nộp đơn khiếu nại', d: 'Các quyết định này bạn đã khiếu nại; không chọn lại được.', tone: 'warn',
    ds: [{ t: 'Quyết định áp dụng biện pháp khẩn cấp tạm thời', d: 'Mẫu 15-DS · số [Số quyết định] · nhận ngày 10-10-2026', g: 'Bạn đã nộp đơn khiếu nại cho quyết định này (hồ sơ KNTT-2026-0009). Khiếu nại lần hai thực hiện ở chi tiết hồ sơ khi có văn bản giải quyết.' }] },
  { t: 'Đã hết thời hiệu khiếu nại', d: 'Văn bản đã hết thời hiệu chỉ để xem thông tin, không chọn và không thể khiếu nại qua Cổng.', tone: 'mute',
    ds: [{ t: 'Thông báo nộp tiền tạm ứng án phí', d: 'Mẫu 08-DS · số [Số thông báo] · nhận ngày 01-10-2026 · hết hạn 08-10-2026', g: 'Thủ tục: Khiếu nại văn bản, thông báo tố tụng · Quá hạn 27 ngày' }] },
  { t: 'Chưa mở khiếu nại qua Cổng', d: 'Văn bản đã tống đạt cho bạn nhưng chưa thể khiếu nại qua Cổng; không chọn được.', tone: 'warn',
    ds: [{ t: 'Giấy triệu tập', d: 'Mẫu 01-DS · số [Số giấy triệu tập] · nhận ngày 28-10-2026', g: 'Văn bản chưa được cấu hình khiếu nại qua Cổng.' }] }];
function kqdCon(n) { return n === 0 ? 'Hôm nay là ngày cuối' : 'Còn ' + n + ' ngày'; }
function kqdNhan(x) { return x.code + ' — ' + x.ten; }
/* ô chọn đơn hoặc vụ án → bảng từ đáy: tìm nhanh, số mục; dòng theo thứ tự web = mã, tên · loại (Đơn/Vụ án), vai trò, Tòa án · số văn bản còn hạn; đơn/vụ án đã khiếu nại hết văn bản bị khóa */
function KqdVaPick(p) {
  var o = React.useState(!!p.mo), q = React.useState(''), anchor = React.useRef(null), host = useHost(anchor);
  var cur = KQD_VA.filter(function (x) { return x.id === p.v; })[0], kq = khongDau(q[0].trim());
  var loc = KQD_VA.filter(function (x) { return !kq || khongDau(x.code + ' ' + x.ten + ' ' + x.vt + ' ' + x.toa).indexOf(kq) >= 0; });
  function dong(x) {
    var on = p.v === x.id, tx = h('span', { className: 'ph-lvr-tx' }, h('span', { className: 'ph-lvr-t' }, h('span', { className: 'kq-code' }, x.code), x.ten),
      h('span', { className: 'ph-lvr-d' }, (x.don ? 'Đơn' : 'Vụ án') + ' · ' + x.vt + ' · ' + x.toa),
      x.daNop ? h('span', { className: 'kq-va-st kq-va-st-off' }, 'Bạn đã nộp đơn khiếu nại cho ' + (x.don ? 'đơn' : 'vụ án') + ' này (hồ sơ ' + x.daNop + '). Khiếu nại lần hai thực hiện ở chi tiết hồ sơ khi có văn bản giải quyết lần đầu.')
        : h('span', { className: 'kq-va-st' }, x.n + ' văn bản còn hạn khiếu nại'));
    if (x.daNop) return h('li', { key: x.id }, h('div', { className: 'ph-lvr-it kq-va-off', 'aria-disabled': 'true' }, tx));
    return h('li', { key: x.id }, h('button', { type: 'button', role: 'option', 'aria-selected': on, className: 'ph-lvr-it' + (on ? ' ph-lvr-on' : ''), onClick: function () { p.onPick(x.id); o[1](false); } },
      tx, h('span', { className: 'ph-lvr-ck', 'aria-hidden': 'true' }, on ? h(T.Icon, { name: 'check' }) : null)));
  }
  return h('div', { className: 'kq-f' }, h('span', { ref: anchor, hidden: true }),
    h(T.SelectField, { label: p.label, labelVisible: true, required: true, placeholder: 'Chọn đơn hoặc vụ án', value: cur ? kqdNhan(cur) : undefined, open: o[0], onClick: function () { q[1](''); o[1](true); } }),
    /* v404: bỏ dòng loại · vai trò · Tòa án dưới ô chọn đơn hoặc vụ án */
    o[0] && host ? h(LvSheet, { host: host, title: 'Chọn đơn hoặc vụ án', onClose: function () { o[1](false); },
      top: h('div', { className: 'fx-search' }, Tf('Tìm vụ án', { icon: 'search', placeholder: 'Tìm theo mã vụ án, tên vụ án hoặc Tòa án…', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })) },
      P(kq ? loc.length + ' vụ án, đơn khớp' : KQD_VA.length + ' vụ án, đơn có quyết định, văn bản còn hạn khiếu nại', 'ph-muted kq-sheet-n'),
      loc.length ? (p.pa || 'A' ? h(LvTam, { cur: p.v, onPick: function (id) { p.onPick(id); o[1](false); }, ve: function (sel, chon) { return KqdVaList(p.pa || 'A', loc, sel, chon); } }) : h('ul', { className: 'ph-lvr', role: 'listbox', 'aria-label': p.label }, loc.map(dong))) : h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tìm thấy kết quả phù hợp' })) : null);
}
/* một nhóm văn bản không chọn được – dòng tiêu đề "Tên nhóm · số" thu gọn; mở ra: lời dẫn + danh sách (tên, mô tả, ghi chú) */
function KqdNhom(p) {
  var x = p.x, mo = React.useState(!!p.mo);
  return h('div', { className: 'kq-nh' },
    h('button', { type: 'button', className: 'kq-nh-h kq-nh-' + x.tone, 'aria-expanded': mo[0], onClick: function () { mo[1](!mo[0]); } }, h('span', null, x.t + ' · ' + x.ds.length), h(T.Icon, { name: 'chevronDown', className: mo[0] ? 'kv-xoay' : '' })),
    mo[0] ? h(F, null, P(x.d, 'ph-muted kq-nh-d'), h('ul', { className: 'kq-nh-l' }, x.ds.map(function (y) {
      return h('li', { key: y.t }, h('b', null, y.t), h('small', null, y.d), y.g ? h('span', { className: 'kq-nh-g' }, y.g) : null);
    }))) : null);
}
function KnvQd2(o) {
  var va = React.useState(o.rong || o.loi ? '' : o.don ? 'DON-1' : 'DS-2026-0012'), vb = React.useState(o.don ? 't1' : o.sap ? 'v2' : o.tong || o.kc ? 'v1' : '');
  var cur = KQD_VA.filter(function (x) { return x.id === va[0]; })[0], dsVb = cur ? KQD_VB[cur.id] || [] : [];
  var vbc = dsVb.filter(function (x) { return x.id === vb[0]; })[0], t = vbc ? KQD_TT[vbc.tt] : null;
  var lbl = 'Chọn đơn hoặc vụ án để xác định Tòa án nhận đơn', vaF;
  if (o.loi) vaF = h('div', { className: 'kq-f' }, Lbl(lbl, 1),
    h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tải được danh sách vụ án và văn bản tống đạt.', actionLabel: 'Thử lại', actionIcon: 'swap', onAction: noop, className: 'nv-err' }));
  else if (o.rong) vaF = h('div', { className: 'kq-f' }, Lbl(lbl, 1),
    h('div', { className: 'kv-rong' }, P('Chưa có đơn hay vụ án nào có quyết định, văn bản còn trong thời hiệu khiếu nại.'), Btn('Chọn thủ tục khác', 'secondary', { size: 'sm', 'data-pt-go': 'backTo:choose' })));
  else vaF = h(KqdVaPick, { label: lbl, v: va[0], mo: o.doi, pa: o.vpa, onPick: function (id) { if (id !== va[0]) vb[1](''); va[1](id); } });
  var vbF = cur ? h('div', { className: 'kq-f' }, h(KqdVbPick, { ds: dsVb, v: vb[0], onPick: vb[1], mo: o.vbMo, pa: o.vbpa }), /* v403 */
    null /* v411: bỏ 3 nhóm văn bản không chọn được */) : null;
  /* 1. Thủ tục bạn đã chọn – Gửi tới, Thời hiệu (web thoiHieuHienThi), Đổi thủ tục */
  var chon = KqdChon(cur, t, vbc, lbl); /* v401: phương án B */
  /* 3. cảnh báo sắp hết thời hiệu (web GuardBox, chỉ khi còn ≤2 ngày) – dòng nhãn – giá trị nằm trong khối trắng */
  var guard = vbc && vbc.con <= 2 ? Blk(null, h('div', { className: 'kq-body kq-kq' },
    h(NvCall, { tone: 'warning', title: 'Sắp hết thời hiệu khiếu nại — chỉ còn ' + vbc.con + ' ngày.' }, 'Thời hiệu ' + t.th + ' tính từ ' + vbc.nhan + ' — hạn cuối ' + vbc.hanCuoi + '.'),
    RvKV([['Thủ tục áp dụng', t.ten], ['Cơ quan có thẩm quyền giải quyết', t.cq], ['Thời hạn giải quyết', t.han]])), { cls: 'kq-guard' }) : null;
  return h(F, null, chon,
    FCard('Đối tượng bị khiếu nại và thời hiệu', h('div', { className: 'kq-body' },
      vaF, vbF), true), /* v406: bỏ ghi chú Mở từ Hộp thư (web không có) */
    guard);
}
/* bản nháp không mở được (đã gửi hoặc đã xóa) – web NopDonQd */
function KqdNhapLoi() {
  return h(Phone, { cls: 'ph-hd' }, h(T.AppBar, { variant: 'plain', title: 'Quyết định tố tụng trong vụ án của tôi', onBack: noop }), h(Body, { cls: 'ph-plain dt-body' },
    h('div', { className: 'q1-err' }, h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không mở được bản nháp', text: 'Bản nháp có thể đã gửi hoặc đã xóa.', className: 'nv-err' }),
      h('div', { className: 'q1-err-b' }, h(T.Button, { size: 'sm', variant: 'secondary', icon: 'chevronLeft', 'data-pt-go': 'reset:home,complaintsTt' }, 'Về danh sách')))));
}

/* v401: khối "Thủ tục bạn đã chọn" – phương án B (chọn 17/11/2026). Thứ tự như web: Gửi tới (Tòa án · cơ quan giải quyết), Thời hiệu; nút Đổi thủ tục cạnh tiêu đề */
function KqdChon(cur, t, vbc, lbl) {
  var th = vbc ? 'Hạn cuối ' + vbc.hanCuoi + ' (' + (vbc.con ? 'còn ' + vbc.con + ' ngày' : 'hôm nay là ngày cuối') + ')' : 'Tùy văn bản bị khiếu nại — 03 đến 15 ngày';
  function it(ic, l, v, v2) {
    return h('div', { className: 'kqp-it' }, h('span', { className: 'kqp-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: ic })),
      h('div', null, h('small', null, l), h('b', null, v), v2 ? h('i', null, v2) : null));
  }
  return Blk('Thủ tục bạn đã chọn', h('div', { className: 'kqp-l' },
    it('building', 'Gửi tới', cur ? cur.toa : lbl, cur ? (t ? t.cq : 'Theo văn bản bị khiếu nại') : null), it('clock', 'Thời hiệu', th)),
    { action: h(T.Button, { variant: 'secondary', size: 'sm', 'data-pt-go': 'backTo:choose' }, 'Đổi thủ tục'), cls: 'kqp-blk' });
}

/* v402: dòng trong bảng chọn đơn hoặc vụ án theo design system – thứ tự như web: mã, tên · loại (Đơn/Vụ án), vai trò · Tòa án · số văn bản còn hạn.
   A: thẻ chọn (ChonThe, cùng kiểu thẻ văn bản ở bước 1); B: dòng danh sách + Tag loại + StatusBadge số văn bản; C: thẻ viền, đầu thẻ có mã + Tag, chân thẻ có StatusBadge. */
function KqdVaList(pa, items, cur, pick) {
  var mo = items.filter(function (x) { return !x.daNop; }), khoa = items.filter(function (x) { return x.daNop; });
  var loai = function (x) { return x.don ? 'Đơn' : 'Vụ án'; };
  var note = function (x) { return 'Bạn đã nộp đơn khiếu nại cho ' + (x.don ? 'đơn' : 'vụ án') + ' này (hồ sơ ' + x.daNop + '). Khiếu nại lần hai thực hiện ở chi tiết hồ sơ khi có văn bản giải quyết lần đầu.'; };
  if (pa === 'A') {
    var the = function (x) { return { id: x.id, t: x.code + ' — ' + x.ten, d: loai(x) + ' · ' + x.vt + ' · ' + x.toa, d2: x.daNop ? note(x) : null, tag: x.daNop ? 'Đã nộp đơn khiếu nại' : x.n + ' văn bản còn hạn khiếu nại', tone: x.daNop ? 'neutral' : 'success' }; };
    return h('div', { className: 'kqv-a' }, h(ChonThe, { label: 'Đơn hoặc vụ án', v: cur, onPick: pick, items: mo.map(the) }),
      khoa.length ? h('div', { className: 'dyc-khoa', 'aria-disabled': 'true' }, h(ChonThe, { label: 'Đơn, vụ án đã khiếu nại', v: null, onPick: noop, items: khoa.map(the) })) : null);
  }
  if (pa === 'B') return h('ul', { className: 'ph-lvr kqv-b', role: 'listbox', 'aria-label': 'Đơn hoặc vụ án' }, items.map(function (x) {
    var on = cur === x.id, tx = h('span', { className: 'ph-lvr-tx' },
      h('span', { className: 'kqv-code' }, x.code), h('span', { className: 'ph-lvr-t' }, x.ten),
      h('span', { className: 'kqv-meta' }, h(T.Tag, { className: 'kqv-tag' + (x.don ? ' kqv-tag-don' : '') }, loai(x)), h('span', { className: 'ph-lvr-d' }, x.vt + ' · ' + x.toa)),
      x.daNop ? h(F, null, h(T.StatusBadge, { tone: 'neutral', icon: false, className: 'kqv-st' }, 'Đã nộp đơn khiếu nại'), h('small', { className: 'kqv-note' }, note(x)))
        : h(T.StatusBadge, { tone: 'success', icon: false, className: 'kqv-st' }, x.n + ' văn bản còn hạn khiếu nại'));
    if (x.daNop) return h('li', { key: x.id }, h('div', { className: 'ph-lvr-it kqv-off', 'aria-disabled': 'true' }, tx));
    return h('li', { key: x.id }, h('button', { type: 'button', role: 'option', 'aria-selected': on, className: 'ph-lvr-it' + (on ? ' ph-lvr-on' : ''), onClick: function () { pick(x.id); } }, tx,
      h('span', { className: 'ph-lvr-ck', 'aria-hidden': 'true' }, on ? h(T.Icon, { name: 'check' }) : null)));
  }));
  return h('div', { className: 'kqv-c', role: 'radiogroup', 'aria-label': 'Đơn hoặc vụ án' }, items.map(function (x) {
    var on = cur === x.id, off = !!x.daNop;
    return h('button', { key: x.id, type: 'button', role: 'radio', 'aria-checked': on, disabled: off, className: 'kqv-card' + (on ? ' kqv-on' : '') + (off ? ' kqv-off' : ''), onClick: function () { pick(x.id); } },
      h('span', { className: 'kqv-hd' }, h('span', { className: 'kqv-code' }, x.code), h(T.Tag, { className: 'kqv-tag' + (x.don ? ' kqv-tag-don' : '') }, loai(x)), on ? h(T.Icon, { name: 'checkCircle', className: 'kqv-ck' }) : null),
      h('b', null, x.ten), h('small', null, x.vt + ' · ' + x.toa),
      h('span', { className: 'kqv-ft' }, off ? h(F, null, h(T.StatusBadge, { tone: 'neutral', icon: false }, 'Đã nộp đơn khiếu nại'), h('small', { className: 'kqv-note' }, note(x)))
        : h(T.StatusBadge, { tone: 'success', icon: false }, x.n + ' văn bản còn hạn khiếu nại')));
  }));
}

/* v403: ô chọn quyết định, văn bản bị khiếu nại → bảng từ đáy (cùng kiểu bảng chọn đơn hoặc vụ án: thẻ chọn không nút tròn).
   Thẻ theo thứ tự web: tên · Mẫu, số, ngày nhận, hạn cuối · Thủ tục · nhãn hạn (tô vàng khi còn ≤2 ngày). Dưới ô: mô tả văn bản đã chọn. */
function KqdVbPick(p) {
  var o = React.useState(!!p.mo), anchor = React.useRef(null), host = useHost(anchor);
  var cur = p.ds.filter(function (x) { return x.id === p.v; })[0];
  var meta = function (x) { return x.code + ' · ' + x.so + ' · nhận ngày ' + x.nhan + ' · hạn cuối ' + x.hanCuoi; };
  var lbl = 'Quyết định, văn bản còn trong thời hiệu khiếu nại';
  return h('div', { className: 'kq-f' }, h('span', { ref: anchor, hidden: true }),
    h(T.SelectField, { label: lbl, labelVisible: true, required: true, placeholder: 'Chọn quyết định, văn bản bị khiếu nại', value: cur ? cur.ten : undefined, open: o[0], onClick: function () { o[1](true); } }),
    cur ? h('div', { className: 'kq-vb-sel' }, P(meta(cur), 'ph-muted kq-help'),
      h('div', { className: 'kq-vb-tt' }, h('span', null, 'Thủ tục: ' + KQD_TT[cur.tt].ten), h(T.StatusBadge, { tone: cur.con <= 2 ? 'warning' : 'neutral', icon: false }, kqdCon(cur.con)))) : null,
    o[0] && host ? h(LvSheet, { host: host, title: 'Chọn quyết định, văn bản', onClose: function () { o[1](false); } },
      P(p.ds.length + ' văn bản còn hạn khiếu nại trên đơn, vụ án đã chọn của bạn', 'ph-muted kq-sheet-n'),
      (p.pa || 'C') ? h(LvTam, { cur: p.v, onPick: function (id) { p.onPick(id); o[1](false); }, ve: function (sel, chon) { return KqdVbList(p.pa || 'C', p.ds, sel, chon); } }) : h('div', { className: 'kqv-a' }, h(ChonThe, { label: 'Quyết định, văn bản bị khiếu nại', v: p.v, onPick: function (id) { p.onPick(id); o[1](false); }, items: p.ds.map(function (x) {
        return { id: x.id, t: x.ten, d: meta(x), d2: 'Thủ tục: ' + KQD_TT[x.tt].ten, tag: kqdCon(x.con), tone: x.con <= 2 ? 'warning' : 'neutral' }; }) }))) : null);
}

/* v405: thẻ văn bản tối giản trong bảng chọn (chi tiết đầy đủ hiện dưới ô sau khi chọn). Hạn chỉ tô màu khi còn ≤2 ngày.
   A: tên + hạn ở góc phải; dòng Mẫu · số · ngày nhận. B: tên; một dòng Mẫu · số · hạn cuối · còn N ngày. C: tên; một dòng hạn cuối · còn N ngày. */
function KqdVbList(pa, ds, cur, pick) {
  return h('div', { className: 'mg-opts kqb', role: 'radiogroup', 'aria-label': 'Quyết định, văn bản bị khiếu nại' }, ds.map(function (x) {
    var on = cur === x.id, han = h('span', { className: 'kqb-han' + (x.con <= 2 ? ' kqb-warn' : '') }, kqdCon(x.con));
    var body = pa === 'A' ? h(F, null, h('span', { className: 'kqb-top' }, h('b', null, x.ten), han), h('small', null, x.code + ' · ' + x.so + ' · nhận ngày ' + x.nhan))
      : pa === 'B' ? h(F, null, h('b', null, x.ten), h('small', null, x.code + ' · ' + x.so + ' · hạn cuối ' + x.hanCuoi + ' · ', han))
      : h(F, null, h('b', null, x.ten), h('small', null, 'Hạn cuối ' + x.hanCuoi + ' · ', han));
    return h('button', { key: x.id, type: 'button', role: 'radio', 'aria-checked': on, className: 'mg-opt' + (on ? ' mg-opt-on' : ''), onClick: function () { pick(x.id); } },
      h('span', { className: 'mg-opt-tx kqb-tx' }, body));
  }));
}

/* v412: Hành vi, Tố cáo – "Thủ tục bạn đã chọn" cùng kiểu Quyết định tố tụng (web chỉ có Gửi tới) */
function KhvChon(k, cur, kg, o) {
  var t = knvTT(k), toa = o.lan2 ? 'Tòa án nhân dân Thành phố Hà Nội (cấp trên trực tiếp)' : kg ? (o.kg ? COURT1 : 'Tòa án bạn khai ở bước này') : cur ? cur.toa : null;
  return Blk('Thủ tục bạn đã chọn', h('div', { className: 'kqp-l' }, h('div', { className: 'kqp-it' }, h('span', { className: 'kqp-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: 'building' })),
      h('div', null, h('small', null, 'Gửi tới'), h('b', null, toa || 'Chọn đơn hoặc vụ án để xác định Tòa án nhận đơn'), toa ? h('i', null, t.cq) : null))),
    { action: h(T.Button, { variant: 'secondary', size: 'sm', 'data-pt-go': 'backTo:choose' }, 'Đổi thủ tục'), cls: 'kqp-blk' });
}
/* v412: ô chọn vụ án liên quan → bảng từ đáy có tìm kiếm; thẻ không nút tròn; "Không gắn vụ án" luôn ở cuối (như web) */
function KhvVaPick(p) {
  var o = React.useState(!!p.mo), q = React.useState(''), anchor = React.useRef(null), host = useHost(anchor);
  var ds = TL_VA.map(function (x) { return { id: x.ma, t: x.ma + ' — ' + x.ten, d: x.vt + ' · ' + x.toa }; })
    .concat([{ id: 'none', t: 'Không gắn vụ án', d: p.tc ? 'Tố cáo không bắt buộc là đương sự — bạn sẽ khai Tòa án nơi người bị tố cáo công tác.' : 'Vụ việc chưa có trên Cổng — bạn sẽ khai Tòa án đang giải quyết.' }]);
  var kq = khongDau(q[0].trim()), loc = ds.filter(function (x) { return !kq || khongDau(x.t + ' ' + x.d).indexOf(kq) >= 0; });
  var cur = ds.filter(function (x) { return x.id === p.v; })[0];
  return h('div', { className: 'kq-f' }, h('span', { ref: anchor, hidden: true }),
    h(T.SelectField, { label: 'Vụ án liên quan', labelVisible: true, required: true, placeholder: 'Chọn vụ án liên quan', value: cur ? cur.t : undefined, open: o[0], onClick: function () { q[1](''); o[1](true); } }),
    o[0] && host ? h(LvSheet, { host: host, title: 'Chọn vụ án liên quan', onClose: function () { o[1](false); },
      top: h('div', { className: 'fx-search' }, Tf('Tìm vụ án', { icon: 'search', placeholder: 'Tìm theo mã vụ án, tên vụ án hoặc Tòa án…', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })) },
      loc.length ? h(LvTam, { cur: p.v, onPick: function (id) { p.onPick(id); o[1](false); }, ve: function (sel, chon) { return h('div', { className: 'kqv-a' }, h(ChonThe, { label: 'Vụ án liên quan', v: sel, onPick: chon, items: loc })); } })
        : h(T.EmptyState, { variant: 'center', icon: 'alert', title: 'Không tìm thấy kết quả phù hợp' })) : null);
}

/* v413: thẻ tài liệu bắt buộc chưa có tệp (Tố cáo) */
function TlBatPa(pa, r, dev, kho) {
  var ten = h('b', null, r.vb, h('span', { className: 'tp-field-req' }, ' *'));
  if (pa === 'B') return h('li', { key: r.key, className: 'tlb-b' }, h('span', { className: 'ph-up3-ic ph-tl-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: 'upload' })),
    h('span', { className: 'ph-tlr-tx' }, ten, h('small', null, 'Bắt buộc ít nhất một tài liệu để gửi đơn')),
    h('span', { className: 'tlb-b-bt' }, h(T.Button, { variant: 'secondary', size: 'sm', icon: 'upload', onClick: dev }, 'Từ thiết bị'), h(T.Button, { variant: 'secondary', size: 'sm', icon: 'folder', onClick: kho }, 'Từ kho dữ liệu')));
  if (pa === 'C') return h(TlBatC, { key: r.key, ten: ten, dev: dev, kho: kho });
  if (pa === 'D') return h(TlBatC, { key: r.key, ten: ten, dev: dev, kho: kho, icon: true });
  return h('li', { key: r.key, className: 'tlb-a' }, h('span', { className: 'ph-up3-ic ph-tl-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: 'upload' })),
    h('span', { className: 'ph-tlr-tx' }, ten, h('small', { className: 'tlb-warn' }, 'Bắt buộc ít nhất một tài liệu để gửi đơn')),
    h(NguonMenu, { label: h(T.Icon, { name: 'upload' }), onDev: dev, onLib: kho }));
}
function TlBatC(p) {
  var o = React.useState(false), a = React.useRef(null), host = useHost(a);
  var sheet = o[0] && host ? h(LvSheet, { host: host, title: 'Tải lên tài liệu, chứng cứ', onClose: function () { o[1](false); } },
      h(LvRows, { menu: true, label: 'Nguồn tệp', items: [{ id: 'tb', name: 'Tải từ thiết bị' }, { id: 'kho', name: 'Lấy từ kho dữ liệu cá nhân' }], onPick: function (x) { o[1](false); if (x === 'kho') p.kho(); else p.dev(); } })) : null;
  if (p.icon) return h('li', { className: 'tlb-a' }, h('span', { ref: a, hidden: true }), h('span', { className: 'ph-up3-ic ph-tl-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: 'upload' })),
    h('span', { className: 'ph-tlr-tx' }, p.ten, h('small', { className: 'tlb-warn' }, 'Bắt buộc ít nhất một tài liệu để gửi đơn')),
    h(T.Button, { variant: 'secondary', size: 'sm', icon: 'upload', className: 'ph-lib-view ph-tlr-edit', 'aria-label': 'Tải lên', onClick: function () { o[1](true); } }), sheet);
  return h('li', { className: 'tlb-c' }, h('span', { ref: a, hidden: true }),
    h('button', { type: 'button', className: 'tlb-c-bt', onClick: function () { o[1](true); } }, h('span', { className: 'ph-up3-ic ph-tl-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: 'upload' })),
      h('span', { className: 'ph-tlr-tx' }, p.ten, h('small', null, 'Chưa tải lên · Chạm để tải lên')), h(T.Icon, { name: 'chevronRight', className: 'tlb-c-chev' })),
    o[0] && host ? h(LvSheet, { host: host, title: 'Tải lên tài liệu, chứng cứ', onClose: function () { o[1](false); } },
      h(LvRows, { menu: true, label: 'Nguồn tệp', items: [{ id: 'tb', name: 'Tải từ thiết bị' }, { id: 'kho', name: 'Lấy từ kho dữ liệu cá nhân' }], onPick: function (x) { o[1](false); if (x === 'kho') p.kho(); else p.dev(); } })) : null);
}

/* ===================================================================================================
   Rà soát UI Nộp đơn khởi kiện (demo 20/11/2026) – sửa theo kết quả test đối chiếu Web – prototype
   (sheet 1 TATC_Mobile_TC_NopDonKhoiKien, các case người dùng chọn "Sửa"). Mã Web: nhánh develop 20/11/2026,
   cấu hình nộp đơn và danh mục: CSDL 10.15.73.100 (chỉ đọc).
   =================================================================================================== */
/* đơn đang soạn – dùng chung giữa các bước (web: form.thuTucMa / caseType / caseSubTypeMa / loaiViecChiTietMa) */
var ND_DON = { tt: 'a', lv: 'ds', v: 'VA-DS-3', ct: '' };
/* trạng thái dùng chung của khung soạn đơn: đang lưu nháp, đang xác nhận, đã bấm Tiếp theo ở từng bước (kt1…kt6) */
var NDB = { luu: false, xn: false, nghe: [] };
function ndBao() { NDB.nghe.slice().forEach(function (f) { f(); }); }
function ndbDat(k, v) { NDB[k] = v; ndBao(); }
function ndNghe() {
  var t = React.useState(0);
  React.useEffect(function () { var f = function () { t[1](function (x) { return x + 1; }); }; NDB.nghe.push(f); return function () { NDB.nghe = NDB.nghe.filter(function (y) { return y !== f; }); }; }, []);
  return NDB;
}
function ndLuu(o) { ND_DON = Object.assign({}, ND_DON, o); ndBao(); }

/* 1.9 / 1.21 / 1.45 / 1.47: cấu hình nộp đơn theo loại việc (bảng DON_CAUHINH_NOP, đọc 20-11-2026).
   Mỗi dòng: tên bước 2, nhập nhiều người (bước 2), đối tượng bước 2, có nhóm đồng, đối tượng nhóm đồng,
   tên bước 3, có nhóm bị kiện, nhập nhiều bị kiện, đối tượng bị kiện, có người liên quan, đối tượng người liên quan, có người làm chứng.
   Cấu hình kiểu cũ (mảng) không ghi người liên quan / làm chứng → để như mặc định (có, Cá nhân + Tổ chức). */
var ND_CFG = (function () {
  var c = {}, i;
  function d(ma, t2, n2, d2, dong, dd, t3, c3, n3, d3, lq, dlq, lc) {
    c[ma] = { t2: t2, n2: !!n2, d2: d2.split(','), dong: !!dong, dd: (dd || d2).split(','), t3: t3, c3: !!c3, n3: !!n3, d3: d3 ? d3.split(',') : [], lq: !!lq, dlq: (dlq || 'cn,tc').split(','), lc: !!lc };
  }
  var KK = 'Người khởi kiện', BK = 'Người bị kiện', BKK = 'Người bị khởi kiện', YC = 'Người yêu cầu', BYC = 'Người bị yêu cầu';
  for (i = 1; i <= 5; i++) d('HC-' + i, KK, 1, 'cn,tc', 1, 'cn,tc', BKK, 1, 1, 'cn,cq', 1, 'cn,tc', 1);
  d('VA-DS-1', KK, 1, 'cn,tc', 1, 'cn,tc', BK, 1, 1, 'cn,tc,cq', 1, 'cn,tc,cq', 1);
  for (i = 2; i <= 14; i++) d('VA-DS-' + i, KK, 1, 'cn,tc', 1, '', BK, 1, 1, 'cn,tc', 1, '', 1);
  d('VA-HN-1', KK, 0, 'cn,tc', 0, 'cn', BK, 1, 0, 'cn', 1, 'cn,tc', 1);
  [2, 3, 7].forEach(function (k) { d('VA-HN-' + k, KK, 1, 'cn', 0, '', BK, 1, 1, 'cn', 1, '', 1); });
  [4, 5].forEach(function (k) { d('VA-HN-' + k, KK, 1, 'cn', 1, '', BK, 1, 1, 'cn', 1, '', 1); });
  d('VA-HN-6', KK, 1, 'cn,tc', 1, '', BK, 1, 1, 'cn,tc', 1, '', 1);
  d('VA-HN-8', KK, 1, 'cn,tc', 1, '', BKK, 1, 1, 'cn,tc', 1, '', 1);
  [1, 2, 3].forEach(function (k) { d('VA-KD-' + k, KK, 1, 'cn,tc', 1, '', BK, 1, 1, 'cn,tc', 1, '', 1); });
  d('VA-KD-4', KK, 1, 'cn,tc', 1, '', BKK, 1, 1, 'cn,tc', 1, '', 1); /* dữ liệu ghi tên bước 2 là "Người bị kiện" (nghi nhập nhầm) – demo dùng "Người khởi kiện" */
  d('VA-KD-5', KK, 1, 'cn,tc', 1, '', BKK, 1, 1, 'cn,tc', 1, '', 1);
  d('VA-LD-1', KK, 1, 'cn,tc', 1, 'cn,tc', BKK, 1, 1, 'cn,tc', 1, 'cn,tc,cq', 1);
  for (i = 2; i <= 10; i++) d('VA-LD-' + i, KK, 1, 'cn,tc', 1, 'cn,tc', BK, 1, 1, 'cn,tc', 1, 'cn,tc,cq', 1);
  for (i = 1; i <= 10; i++) d('VD-DS-' + i, YC, 1, 'cn,tc', 1, 'cn,tc', BYC, 1, 1, 'cn,tc,cq', 1, 'cn,tc,cq', 1);
  for (i = 1; i <= 11; i++) if (i !== 2) d('VD-HN-' + i, YC, 0, 'cn', 0, 'cn', BYC, 1, 0, 'cn', 1, 'cn,tc', 1);
  d('VD-HN-2', YC, 1, 'cn', 0, 'cn', 'Người yêu cầu 2', 0, 0, '', 1, 'cn,tc,cq', 1);
  d('VD-KD-1', YC, 0, 'cn,tc', 1, 'cn,tc', BYC, 1, 1, 'cn,tc,cq', 1, 'cn,tc,cq', 0);
  [2, 3, 5].forEach(function (k) { d('VD-KD-' + k, YC, 1, 'cn,tc', 1, '', BYC, 1, 1, 'cn,tc', 1, '', 1); });
  d('VD-KD-4', YC, 1, 'cn,tc', 1, 'cn,tc', BYC, 1, 1, 'cn,tc', 1, 'cn,tc,cq', 1);
  d('VD-KD-6', YC, 1, 'cn,tc', 1, 'cn,tc', BYC, 1, 1, 'cn,tc', 1, 'cn,tc', 1);
  for (i = 1; i <= 5; i++) d('VD-LD-' + i, YC, 0, 'cn', 0, 'cn', BYC, 1, 0, 'cn', 1, 'cn,tc', 1);
  ['YCMTTPS_PHASAN', 'YCMTTPS_PHUCHOI'].forEach(function (m) { d(m, YC, 1, 'cn,tc', 1, 'cn,tc', 'Tổ chức/Doanh nghiệp bị yêu cầu', 1, 0, 'tc', 1, 'cn,tc,cq', 1); });
  return c;
})();
/* nhãn tĩnh theo thủ tục khi loại việc chưa có cấu hình (web field-defs.ts partyMetaTinh) – chưa chọn thủ tục / khởi kiện hành chính: Nguyên đơn / Bị đơn */
var ND_TEN_TT = { a: ['Người khởi kiện', 'Người bị khởi kiện'], b: ['Người yêu cầu', 'Người bị yêu cầu'], d: ['Người yêu cầu', 'Tổ chức/Doanh nghiệp bị yêu cầu'] };
function ndCfg(d) { return ND_CFG[(d || ND_DON).v] || null; }
function ndTen(d) { var c = ndCfg(d); return c ? [c.t2, c.t3] : ND_TEN_TT[(d || ND_DON).tt] || ['Nguyên đơn', 'Bị đơn']; }
function thuongDau(s) { return s ? s.charAt(0).toLowerCase() + s.slice(1) : s; }
function hoaDau(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
function cumDong(t2) { var g = thuongDau(t2), b = g.replace(/^người\s+/, ''); return 'đồng ' + (b || g); }
function ndSteps() { var t = ndTen(); return ['Loại đơn', t[0], t[1], 'Nội dung', 'Tài liệu', 'Xem lại', 'Ký số']; }
function ndPhaSan(d) { return (d || ND_DON).tt === 'd'; }
function ndHanhChinh(d) { return (d || ND_DON).tt === 'c'; }
var NHAN_KIND = { cn: 'Cá nhân', tc: 'Tổ chức', cq: 'Cơ quan' };
function nhanKind(k, hc) { return k === 'cn' && hc ? 'Cá nhân có thẩm quyền' : NHAN_KIND[k]; }

/* 1.11 / 1.12: lĩnh vực và loại việc cụ thể theo loại thủ tục (web thật 20-11-2026; mã + ký hiệu điều luật theo DM_PHANLOAIDON).
   Khởi kiện vụ án: Điều 26/28/32/30; Yêu cầu giải quyết việc dân sự: Điều 27/29/33/31; Khởi kiện hành chính, Phục hồi phá sản: không có Lĩnh vực. */
var LINH_VUC_TT = { a: LINH_VUC,
  b: [{ k: 'vds', lvIllo: 'danSu', ngan: 'Dân sự', dieu: 'Điều 27', so: '10' }, { k: 'vhn', lvIllo: 'honNhan', ngan: 'Hôn nhân và\ngia đình', dieu: 'Điều 29', so: '11' }, { k: 'vld', lvIllo: 'laoDong', ngan: 'Lao động', dieu: 'Điều 33', so: '5' }, { k: 'vkd', lvIllo: 'kinhDoanh', ngan: 'Kinh doanh,\nthương mại', dieu: 'Điều 31', so: '6' }] };
function lvTheoTT(tt) { return LINH_VUC_TT[tt] || []; }
function lvKhoa(tt, lv) { return lvTheoTT(tt).length ? lv : tt === 'c' ? 'hc' : tt === 'd' ? 'ps' : null; }
var LV_GOC = { ds: ['a', 'ds'], hn: ['a', 'hn'], ld: ['a', 'ld'], kd: ['a', 'kd'], vds: ['b', 'vds'], vhn: ['b', 'vhn'], vld: ['b', 'vld'], vkd: ['b', 'vkd'], hc: ['c', null], ps: ['d', null] };
function lvTen(k) { var x = LINH_VUC.concat(LINH_VUC_TT.b).filter(function (y) { return y.k === k; })[0]; return x ? x.ngan.replace('\n', ' ') : ''; }
Object.assign(LOAI_VIEC_LV, {
  vds: [['VD-DS-1', 'Đ.27.1', 'Tuyên bố mất, hạn chế năng lực hành vi dân sự', 'Yêu cầu tuyên bố hoặc hủy bỏ quyết định tuyên bố một người mất năng lực hành vi dân sự, bị hạn chế năng lực hành vi dân sự hoặc có khó khăn trong nhận thức, làm chủ hành vi.'],
    ['VD-DS-2', 'Đ.27.2', 'Thông báo tìm kiếm người vắng mặt', 'Yêu cầu thông báo tìm kiếm người vắng mặt tại nơi cư trú và quản lý tài sản của người đó.'],
    ['VD-DS-3', 'Đ.27.3', 'Tuyên bố một người mất tích', 'Yêu cầu tuyên bố hoặc hủy bỏ quyết định tuyên bố một người mất tích.'],
    ['VD-DS-4', 'Đ.27.4', 'Tuyên bố một người là đã chết', 'Yêu cầu tuyên bố hoặc hủy bỏ quyết định tuyên bố một người là đã chết.'],
    ['VD-DS-5', 'Đ.27.5', 'Công nhận, cho thi hành bản án dân sự của Tòa án nước ngoài', 'Yêu cầu công nhận và cho thi hành tại Việt Nam hoặc không công nhận bản án, quyết định về dân sự của Tòa án nước ngoài.'],
    ['VD-DS-6', 'Đ.27.6', 'Tuyên bố văn bản công chứng vô hiệu', 'Yêu cầu tuyên bố văn bản công chứng vô hiệu.'],
    ['VD-DS-7', 'Đ.27.7', 'Công nhận kết quả hòa giải thành ngoài Tòa án', 'Yêu cầu công nhận kết quả hòa giải thành ngoài Tòa án.'],
    ['VD-DS-8', 'Đ.27.8', 'Công nhận tài sản vô chủ', 'Yêu cầu công nhận tài sản có trên lãnh thổ Việt Nam là vô chủ, công nhận quyền sở hữu của người đang quản lý đối với tài sản vô chủ.'],
    ['VD-DS-9', 'Đ.27.9', 'Xác định, phân chia tài sản chung để thi hành án', 'Yêu cầu xác định quyền sở hữu, quyền sử dụng tài sản, phân chia tài sản chung để thi hành án và yêu cầu khác theo Luật thi hành án dân sự.'],
    ['VD-DS-10', 'Đ.27.10', 'Yêu cầu dân sự khác', 'Các yêu cầu khác về dân sự, trừ trường hợp thuộc thẩm quyền giải quyết của cơ quan, tổ chức khác.']],
  vhn: [['VD-HN-1', 'Đ.29.1', 'Hủy việc kết hôn trái pháp luật', 'Yêu cầu hủy việc kết hôn trái pháp luật.'],
    ['VD-HN-2', 'Đ.29.2', 'Công nhận thuận tình ly hôn', 'Yêu cầu công nhận thuận tình ly hôn, thỏa thuận nuôi con, chia tài sản khi ly hôn.'],
    ['VD-HN-3', 'Đ.29.3', 'Công nhận thỏa thuận thay đổi người trực tiếp nuôi con', 'Yêu cầu công nhận thỏa thuận của cha, mẹ về thay đổi người trực tiếp nuôi con sau khi ly hôn.'],
    ['VD-HN-4', 'Đ.29.4', 'Hạn chế quyền của cha, mẹ với con chưa thành niên', 'Yêu cầu hạn chế quyền của cha, mẹ đối với con chưa thành niên hoặc quyền thăm nom con sau khi ly hôn.'],
    ['VD-HN-5', 'Đ.29.5', 'Chấm dứt việc nuôi con nuôi', 'Yêu cầu chấm dứt việc nuôi con nuôi.'],
    ['VD-HN-6', 'Đ.29.6', 'Yêu cầu liên quan đến việc mang thai hộ', 'Yêu cầu liên quan đến việc mang thai hộ theo quy định của pháp luật hôn nhân và gia đình.'],
    ['VD-HN-7', 'Đ.29.7', 'Chấm dứt hiệu lực chia tài sản chung trong thời kỳ hôn nhân', 'Yêu cầu công nhận thỏa thuận chấm dứt hiệu lực của việc chia tài sản chung trong thời kỳ hôn nhân đã được thực hiện theo bản án, quyết định của Tòa án.'],
    ['VD-HN-8', 'Đ.29.8', 'Tuyên bố vô hiệu thỏa thuận về chế độ tài sản của vợ chồng', 'Yêu cầu tuyên bố vô hiệu thỏa thuận về chế độ tài sản của vợ chồng.'],
    ['VD-HN-9', 'Đ.29.9', 'Công nhận bản án hôn nhân gia đình của Tòa án nước ngoài', 'Yêu cầu công nhận và cho thi hành tại Việt Nam hoặc không công nhận bản án, quyết định về hôn nhân và gia đình của Tòa án nước ngoài.'],
    ['VD-HN-10', 'Đ.29.10', 'Xác định cha, mẹ cho con hoặc con cho cha, mẹ', 'Yêu cầu xác định cha, mẹ cho con hoặc con cho cha, mẹ theo quy định của pháp luật về hôn nhân và gia đình.'],
    ['VD-HN-11', 'Đ.29.11', 'Yêu cầu hôn nhân và gia đình khác', 'Các yêu cầu khác về hôn nhân và gia đình.']],
  vld: [['VD-LD-1', 'Đ.33.1', 'Tuyên bố hợp đồng lao động, thỏa ước lao động tập thể vô hiệu', 'Yêu cầu tuyên bố hợp đồng lao động, thỏa ước lao động tập thể vô hiệu.'],
    ['VD-LD-2', 'Đ.33.2', 'Xét tính hợp pháp của cuộc đình công', 'Yêu cầu xét tính hợp pháp của cuộc đình công.'],
    ['VD-LD-3', 'Đ.33.3', 'Công nhận bản án lao động của Tòa án nước ngoài', 'Yêu cầu công nhận và cho thi hành tại Việt Nam hoặc không công nhận bản án, quyết định lao động của Tòa án nước ngoài.'],
    ['VD-LD-4', 'Đ.33.4', 'Công nhận phán quyết lao động của Trọng tài nước ngoài', 'Yêu cầu công nhận và cho thi hành tại Việt Nam phán quyết lao động của Trọng tài nước ngoài.'],
    ['VD-LD-5', 'Đ.33.5', 'Yêu cầu lao động khác', 'Các yêu cầu khác về lao động.']],
  vkd: [['VD-KD-1', 'Đ.31.1', 'Hủy bỏ nghị quyết Đại hội đồng cổ đông, Hội đồng thành viên', 'Yêu cầu hủy bỏ nghị quyết của Đại hội đồng cổ đông, nghị quyết của Hội đồng thành viên theo quy định của pháp luật về doanh nghiệp.'],
    ['VD-KD-2', 'Đ.31.2', 'Yêu cầu liên quan đến Trọng tài thương mại Việt Nam', 'Yêu cầu liên quan đến việc Trọng tài thương mại Việt Nam giải quyết tranh chấp theo quy định của pháp luật về Trọng tài thương mại.'],
    ['VD-KD-3', 'Đ.31.3', 'Bắt giữ tàu bay, tàu biển', 'Yêu cầu bắt giữ tàu bay, tàu biển theo quy định của pháp luật về hàng không dân dụng, hàng hải Việt Nam, trừ trường hợp bắt giữ để bảo đảm giải quyết vụ án.'],
    ['VD-KD-4', 'Đ.31.4', 'Công nhận bản án kinh doanh, thương mại của Tòa án nước ngoài', 'Yêu cầu công nhận và cho thi hành tại Việt Nam hoặc không công nhận bản án, quyết định kinh doanh, thương mại của Tòa án nước ngoài.'],
    ['VD-KD-5', 'Đ.31.5', 'Công nhận phán quyết của Trọng tài nước ngoài', 'Yêu cầu công nhận và cho thi hành tại Việt Nam phán quyết kinh doanh, thương mại của Trọng tài nước ngoài.'],
    ['VD-KD-6', 'Đ.31.6', 'Yêu cầu kinh doanh, thương mại khác', 'Các yêu cầu khác về kinh doanh, thương mại.']],
  hc: [['HC-1', 'Đ.30.1 LTTHC', 'Khởi kiện quyết định hành chính', 'Khởi kiện quyết định hành chính của cơ quan, người có thẩm quyền trong cơ quan nhà nước. Không áp dụng với quyết định thuộc bí mật nhà nước về quốc phòng, an ninh, ngoại giao; quyết định của Tòa án khi áp dụng biện pháp xử lý hành chính, xử lý hành vi cản trở hoạt động tố tụng; quyết định mang tính nội bộ.'],
    ['HC-2', 'Đ.30.1 LTTHC', 'Khởi kiện hành vi hành chính', 'Khởi kiện hành vi hành chính của cơ quan, người có thẩm quyền trong cơ quan nhà nước. Không áp dụng với hành vi thuộc bí mật nhà nước về quốc phòng, an ninh, ngoại giao và hành vi mang tính nội bộ.'],
    ['HC-3', 'Đ.30.2 LTTHC', 'Khởi kiện quyết định hành chính và hành vi hành chính', 'Khởi kiện quyết định hành chính của cơ quan, người có thẩm quyền trong cơ quan nhà nước và hành vi hành chính của cơ quan, người có thẩm quyền trong cơ quan nhà nước. Không áp dụng với hành vi thuộc bí mật nhà nước về quốc phòng, an ninh, ngoại giao và hành vi mang tính nội bộ.']],
  ps: [['YCMTTPS_PHASAN', 'Luật PS 2025', 'Yêu cầu mở thủ tục phá sản', 'Yêu cầu giải quyết tình trạng doanh nghiệp, hợp tác xã mất khả năng thanh toán.'],
    ['YCMTTPS_PHUCHOI', 'Luật PS 2025', 'Yêu cầu mở thủ tục phục hồi', 'Yêu cầu áp dụng thủ tục phục hồi hoạt động kinh doanh theo quy định.']],
});
function lvTenViec(ma) { var r = lvTim(ma); return r ? r.x[2] : ''; }
/* 1.16: gợi ý chuyển loại việc ly hôn (web field-defs.ts GOI_Y_CHUYEN_LOAI_VIEC) – banner thông tin, đổi cả loại thủ tục */
var GOI_Y_CHUYEN = {
  'VA-HN-1': { nd: 'Hai vợ chồng đã thỏa thuận được việc ly hôn, nuôi con và tài sản? Khi đó đây là yêu cầu công nhận thuận tình ly hôn theo khoản 2 Điều 29 — một việc dân sự, không có bị đơn, Tòa án ra quyết định công nhận.', nut: 'Chuyển sang Công nhận thuận tình ly hôn', ma: 'VD-HN-2' },
  'VD-HN-2': { nd: 'Nếu hai bên chưa thỏa thuận được về việc ly hôn, nuôi con hoặc tài sản thì đây là vụ án ly hôn theo khoản 1 Điều 28, giải quyết bằng bản án.', nut: 'Chuyển sang Ly hôn (vụ án)', ma: 'VA-HN-1' } };

/* 1.29 / 1.30 / 1.49: danh mục phân loại phá sản (DM_DANHMUCCHUNG, đọc 20-11-2026) */
var DAC_DIEM_PS = ['Người lao động', 'Công đoàn', 'Cơ quan bảo hiểm xã hội', 'Cơ quan quản lý thuế', 'Ngân hàng Nhà nước Việt Nam', 'Tổ chức tín dụng', 'Người đại diện theo pháp luật của Doanh nghiệp, Hợp tác xã', 'Chủ nợ không có bảo đảm', 'Chủ nợ có bảo đảm một phần', 'Chủ nợ có bảo đảm', 'Cổ đông hoặc nhóm cổ đông, thành viên hợp tác xã hoặc hợp tác xã thành viên của liên hiệp hợp tác xã', 'Các đối tượng khác'];
var LOAI_HINH_PS = ['Doanh nghiệp', 'Hợp tác xã', 'Tổ chức tín dụng', 'Doanh nghiệp phá sản khác'];
var QUY_MO_PS = ['Lớn', 'Vừa', 'Nhỏ, siêu nhỏ'];
var LINH_VUC_KD_PS = ['Sản xuất', 'Thương mại', 'Dịch vụ', 'Nông nghiệp', 'Khác'];
var NGANH_KT_PS = ['A. NÔNG NGHIỆP, LÂM NGHIỆP VÀ THỦY SẢN', 'B. KHAI KHOÁNG', 'C. CÔNG NGHIỆP CHẾ BIẾN, CHẾ TẠO', 'D. SẢN XUẤT VÀ PHÂN PHỐI ĐIỆN, KHÍ ĐỐT, NƯỚC NÓNG, HƠI NƯỚC VÀ ĐIỀU HÒA KHÔNG KHÍ', 'E. CUNG CẤP NƯỚC; HOẠT ĐỘNG QUẢN LÝ VÀ XỬ LÝ RÁC THẢI, NƯỚC THẢI', 'F. XÂY DỰNG', 'G. BÁN BUÔN VÀ BÁN LẺ; SỬA CHỮA Ô TÔ, MÔ TÔ, XE MÁY VÀ XE CÓ ĐỘNG CƠ KHÁC', 'H. VẬN TẢI KHO BÃI', 'I. DỊCH VỤ LƯU TRÚ VÀ ĂN UỐNG', 'J. THÔNG TIN VÀ TRUYỀN THÔNG', 'K. HOẠT ĐỘNG TÀI CHÍNH, NGÂN HÀNG VÀ BẢO HIỂM', 'L. HOẠT ĐỘNG KINH DOANH BẤT ĐỘNG SẢN', 'M. HOẠT ĐỘNG CHUYÊN MÔN, KHOA HỌC VÀ CÔNG NGHỆ', 'N. HOẠT ĐỘNG HÀNH CHÍNH VÀ DỊCH VỤ HỖ TRỢ', 'O. HOẠT ĐỘNG CỦA ĐẢNG, TỔ CHỨC CHÍNH TRỊ - XÃ HỘI, QUẢN LÝ NHÀ NƯỚC, AN NINH QUỐC PHÒNG', 'P. GIÁO DỤC VÀ ĐÀO TẠO', 'Q. Y TẾ VÀ HOẠT ĐỘNG TRỢ GIÚP XÃ HỘI', 'R. NGHỆ THUẬT, VUI CHƠI VÀ GIẢI TRÍ', 'S. HOẠT ĐỘNG DỊCH VỤ KHÁC', 'T. HOẠT ĐỘNG LÀM THUÊ CÁC CÔNG VIỆC TRONG CÁC HỘ GIA ĐÌNH', 'U. HOẠT ĐỘNG CỦA CÁC TỔ CHỨC VÀ CƠ QUAN QUỐC TẾ'];
/* 1.77: danh mục đơn vị Tòa án (DM_TOAAN, mẫu 13 đơn vị khu vực Hà Nội) */
var TOA_DS = ['Tòa án nhân dân thành phố Hà Nội'].concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (i) { return 'Tòa án nhân dân khu vực ' + i + ' - Hà Nội'; }));
/* địa chỉ mẫu cho ô chọn Tỉnh/Thành phố, Phường/Xã (dữ liệu ví dụ) */
/* v538 (NDKK 1.28): thêm mẫu để danh sách quá 10 mục (web components/ui/select.tsx: trên 10 mục có ô tìm) – dữ liệu chỉ là ví dụ */
var TINH_MAU = ['Thành phố Hà Nội', 'Thành phố Hồ Chí Minh', 'Thành phố Hải Phòng', 'Thành phố Đà Nẵng', 'Tỉnh Bắc Ninh', 'Tỉnh Quảng Ninh', 'Tỉnh Thanh Hóa', 'Tỉnh Nghệ An', 'Thành phố Huế', 'Tỉnh Khánh Hòa', 'Tỉnh Lâm Đồng', 'Thành phố Cần Thơ', 'Tỉnh An Giang'];
var XA_MAU = { 'Thành phố Hà Nội': ['Phường Ba Đình', 'Phường Cầu Giấy', 'Phường Đống Đa', 'Phường Hoàn Kiếm', 'Phường Láng', 'Phường Từ Liêm', 'Phường Thanh Xuân', 'Phường Hà Đông', 'Phường Tương Mai', 'Phường Hoàng Mai', 'Phường Bồ Đề', 'Phường Long Biên', 'Xã Sóc Sơn', 'Xã Đông Anh'] };
/* số mẫu tra cứu không có tài khoản trên Cổng / không xác minh được (để xem câu lỗi) */
var SO_KHONG_THAY = ['001099999999', '0199999999'];
function dinhDangMst(raw) {
  var c = String(raw || '').replace(/[^\d-]/g, '');
  if (c.indexOf('-') >= 0) { var ps = c.split('-'), a = ps[0].replace(/\D/g, '').slice(0, 10); if (a.length < 10) return a; return a + '-' + ps.slice(1).join('').replace(/\D/g, '').slice(0, 3); }
  var d = c.replace(/\D/g, '').slice(0, 13); return d.length > 10 ? d.slice(0, 10) + '-' + d.slice(10) : d;
}
function hopLeMst(v) { return /^\d{10}$|^\d{13}$|^\d{10}-\d{3}$/.test(String(v || '').trim()); }
function ngaySo(s) { var m = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(String(s || '').trim()); return m ? Number(m[3]) * 10000 + Number(m[2]) * 100 + Number(m[1]) : null; }
function du14Tuoi(s) { var n = ngaySo(s); if (n == null) return true; return n <= 20121120; } /* hôm nay 20-11-2026 */
var LOI_ICO = '<svg class="tp-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2 20h20z"/><path d="M12 10v4"/><path d="M12 17h.01"/></svg>';
function LoiDong(s) { return s ? h('p', { className: 'ph-s1-loi', role: 'alert' }, h(T.Icon, { name: 'alert' }), s) : null; }



/* ---------- Khung soạn đơn: Lưu nháp (1.95, 1.97), Tiếp theo có kiểm tra (1.18, 1.44, 1.55, 1.60, 1.66), chỉ xem sau xác nhận (1.81) ---------- */
function HdSoan(p) {
  var b = ndNghe(), co = p.n < 7 && !p.ro;
  React.useEffect(function () { NDB.luu = false; NDB.xn = false; }, []);
  function luu() {
    if (NDB.luu || NDB.xn) return;
    ndbDat('luu', true);
    setTimeout(function () {
      ndbDat('luu', false);
      if (p.luuLoi) window.__ptSnackLoi('Lưu nháp thất bại. Vui lòng thử lại.'); /* web index.tsx luuNhap: ở lại màn hiện tại */
      else window.__ptGo('goSnack:appK_khoikien|Đã lưu nháp đơn.');
    }, 900);
  }
  return h(F, null, h(T.AppBar, { variant: 'plain', title: 'Soạn đơn', onBack: noop, actions: co ? [{ text: b.luu ? 'Đang lưu…' : 'Lưu nháp', onClick: luu }] : [] }),
    b.luu || b.xn ? h('span', { className: 'ph-hd-ban', hidden: true }) : null);
}
function BannerXn() { return h('p', { className: 'kytc-ban ph-ro-ban', role: 'status' }, h(T.Icon, { name: 'info' }), h('span', null, 'Đơn đã được xác nhận, không thể chỉnh sửa thông tin. Vui lòng chuyển sang bước Ký số để tiếp tục.')); }
var ND_NEXT = { 1: 'sub2', 2: 'sub3', 3: 'sub4', 4: 'sub5', 5: 'sub6' };
function ktMoTa(ds) { return !ds.length ? '' : ds.length === 1 ? ds[0] : ds[0] + ' (và ' + (ds.length - 1) + ' lỗi khác)'; }
function NextKt(p) {
  return Btn(h(F, null, 'Tiếp theo', h(T.Icon, { name: 'chevronRight' })), 'primary', { className: 'pt-chk', disabled: !!p.khoa, onClick: function (e) {
    if (p.ro) { window.__ptGo('replace:sub' + (p.n + 1) + 'x'); return; }
    var ph = e.currentTarget.closest('.ph'), loi = p.kt ? p.kt() : ktBuoc(p.n, ph);
    if (loi.length) { ktCuon(ph); return; } /* người dùng 20/11 (1.18): kiểm tra ở mọi bước chỉ báo lỗi tại mục, không có thông báo nổi ở đáy */
    window.__ptGo(ND_NEXT[p.n]);
  } });
}
function ktBuoc(n, ph) {
  if (n === 1) { var e1 = kt1(true); NDB.loi1 = e1.k; ndbDat('kt1', true); return e1.m; }
  if (n === 4) { ndbDat('kt4', true); return kt4(); }
  if (n === 5) { ndbDat('kt5', true); return kt5(); }
  return ktDom(ph, n);
}
function kt1(chiTiet) {
  var d = ND_DON, e = [], k = {};
  if (!d.tt) { e.push('Vui lòng chọn loại thủ tục.'); k.tt = 1; }
  if (d.tt && lvTheoTT(d.tt).length && !d.lv) { e.push('Vui lòng chọn lĩnh vực.'); k.lv = 1; }
  if (!d.v) { e.push('Vui lòng chọn loại việc cụ thể.'); k.v = 1; }
  if (d.v && LV_CHI_TIET[d.v] && !d.ct) { e.push('Vui lòng chọn loại việc chi tiết.'); k.ct = 1; }
  return chiTiet ? { m: e, k: k } : e;
}
/* bước 4 – chế độ Nhập thông tin / Tải đơn có sẵn (web index.tsx kiemTra(3)) */
function kt4Loi() {
  var o = {};
  if (ND_ST.mode === 'file') { if (!ND_ST.doc) o.don = 'Vui lòng tải lên tệp đơn khởi kiện đã soạn sẵn.'; return o; }
  if (!String(ND_ST.td || '').trim()) o.td = 'Bắt buộc';
  var tt = String(ND_ST.tt || '').trim();
  if (!tt) o.tt = 'Bắt buộc'; else if (tt.length < 100) o.tt = 'Tóm tắt quá trình sự việc tối thiểu 100 ký tự';
  var rows = YC_ST.rows.filter(function (r) { return (r.nd || '').trim() || (r.gt || '').trim() || (r.mt || '').trim(); });
  if (!rows.length) o.bang = 'Khai ít nhất một nội dung yêu cầu trong bảng.';
  YC_ST.rows.forEach(function (r, i) {
    var co = (r.nd || '').trim() || (r.gt || '').trim() || (r.mt || '').trim();
    if (co && !(r.nd || '').trim()) o['nd' + i] = 'Bắt buộc nhập nội dung yêu cầu';
    if ((r.nd || '').length > 500) o['nd' + i] = 'Tối đa 500 ký tự';
    if ((r.mt || '').length > 2000) o['mt' + i] = 'Tối đa 2.000 ký tự';
  });
  return o;
}
function kt4() { var o = kt4Loi(); return Object.keys(o).map(function (k) { return o[k]; }); }
/* bước 5 – mọi tệp đã tải phải có loại tài liệu, tài liệu bổ sung phải có tên (web tai-lieu.ts loiThongTinTaiLieu) */
var TL5 = { rows: [] };
function kt5() { var e = []; TL5.rows.forEach(function (r) { if (!r.tep) return; if (!r.bat && !(r.ten || '').trim()) e.push('Vui lòng nhập tên tài liệu'); if (!r.loai) e.push('Vui lòng chọn loại tài liệu'); }); return e; }
/* bước 2, 3 – kiểm tra trên màn đang hiển thị (web index.tsx kiemTraFields): ô bắt buộc, địa chỉ, giới tính, số giấy tờ, email, số điện thoại, đủ 14 tuổi, người đại diện */
function ktNhan(t) { t = String(t || '').trim(); return /^[A-ZĐ][a-zàáâãèéêìíòóôõùúăđĩũơưạảấầẩẫậắằẳẵặẹẻẽềếểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/.test(t) ? t.charAt(0).toLowerCase() + t.slice(1) : t; }
/* 1.42 (người dùng 21/11: "lỗi toàn dòng"): ô nằm trong hàng 2 cột (fx-2) thì dòng lỗi đặt dưới cả hàng, trải hết chiều ngang */
var LOI_SEQ = 0;
function datLoiMsg(el, m) {
  var r = el.parentElement;
  if (r && r.classList.contains('fx-2')) { if (!el.dataset.loiK) el.dataset.loiK = 'l' + (++LOI_SEQ); m.classList.add('ph-loi-dong'); m.dataset.loiK = el.dataset.loiK; var sau = r; while (sau.nextElementSibling && sau.nextElementSibling.classList.contains('ph-loi-dong')) sau = sau.nextElementSibling; sau.after(m); }
  else el.appendChild(m);
}
function ktBo(el) { if (!el) return; el.classList.remove('ph-loi'); var m = el.querySelector(':scope > .ph-loi-msg'); if (m) m.remove(); if (el.dataset.loiK) { var r = el.parentElement, n = r && r.parentElement && r.parentElement.querySelector('.ph-loi-dong[data-loi-k="' + el.dataset.loiK + '"]'); if (n) n.remove(); } }
/* v551 (người dùng 23/11, áp chung mọi trường bắt buộc): lỗi dưới ô chỉ ẩn khi NSD đã thao tác ô đó VÀ ô đã có giá trị
   (ô nhập có chữ, ô chọn hết chữ gợi ý, nhóm radio đã chọn). Theo dõi cả thay đổi DOM vì ô chọn nhận giá trị từ bảng chọn ngoài ô
   và React vẽ lại có thể làm mất lớp ph-loi nhưng còn dòng lỗi. */
function ktChu(m) { var k = m.dataset.loiK; if (!k) return m.parentElement; var r = m.parentElement; return r ? r.querySelector('[data-loi-k="' + k + '"]:not(.ph-loi-msg)') || (r.closest('.ph') || document).querySelector('[data-loi-k="' + k + '"]:not(.ph-loi-msg)') : null; }
function ktDay(el) {
  var sel = el.matches('.tp-select') ? [el] : [].slice.call(el.querySelectorAll('.tp-select'));
  if (sel.some(function (x) { return x.querySelector('.tp-select-ph'); })) return false;
  var ch = [].slice.call(el.querySelectorAll('input[type=radio], input[type=checkbox]'));
  if (ch.length && !ch.some(function (x) { return x.checked; })) return false;
  var ip = [].slice.call(el.querySelectorAll('input:not([type=radio]):not([type=checkbox]):not([type=hidden]):not([type=file]), textarea'));
  if (ip.some(function (x) { return !String(x.value || '').trim(); })) return false;
  return true;
}
function ktSoat(ph) {
  ph.querySelectorAll('.ph-loi-msg').forEach(function (m) {
    var el = ktChu(m);
    if (!el || !el.isConnected) { m.remove(); return; }
    if (el.__ktCham && ktDay(el)) { ktBo(el); if (m.isConnected) m.remove(); }
  });
}
function ktNghe(ph) {
  if (!ph || ph.__kt) return; ph.__kt = 1;
  var hen = 0, lich = function () { if (hen) return; hen = setTimeout(function () { hen = 0; ktSoat(ph); }, 30); };
  var cham = function (e) {
    var t = e.target; if (!t || !t.closest) return;
    ph.querySelectorAll('.ph-loi-msg').forEach(function (m) { var el = ktChu(m); if (el && el.contains(t)) el.__ktCham = 1; });
    lich();
  };
  ph.addEventListener('input', cham, true); ph.addEventListener('change', cham, true); ph.addEventListener('click', cham, true);
  new MutationObserver(lich).observe(ph, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class', 'value', 'aria-checked'] });
}
function ktCuon(ph) {
  setTimeout(function () {
    var x = ph && ph.querySelector('.ph-body .ph-loi, .ph-body .tp-field-error, .ph-body .tp-select-error, .ph-body .ph-s1-loi, .ph-body .q2-err'); if (!x) return;
    var c = x.parentElement; while (c && !/(auto|scroll)/.test(getComputedStyle(c).overflowY)) c = c.parentElement;
    if (c) c.scrollTo({ top: c.scrollTop + x.getBoundingClientRect().top - c.getBoundingClientRect().top - 96, behavior: 'smooth' });
  }, 60);
}
function ktTenNhan(lb) { return lb ? (lb.childNodes[0] ? lb.childNodes[0].textContent : lb.textContent).trim() : ''; }
/* v537 (NDKK 1.44): giới hạn ký tự theo web field-defs.ts (max) */
var ND_MAX = { 'họ và tên': 500, 'nơi cấp': 500, 'nghề nghiệp': 500, 'nơi làm việc': 500, 'cơ quan làm việc': 500, 'chức vụ': 500, 'địa chỉ thư điện tử': 100, 'email': 100,
  'tên tổ chức': 500, 'tên tổ chức / doanh nghiệp': 500, 'tên tổ chức/doanh nghiệp/cơ quan': 500, 'tên cơ quan': 500, 'tên cơ quan đề nghị': 500, 'người đại diện cơ quan': 500, 'họ và tên người đại diện': 500, 'mối quan hệ / lý do liên quan': 500 };
function ndMax(ten) { return ND_MAX[String(ten || '').replace(/\*/g, '').replace(/\s*\(.*\)\s*$/, '').trim().toLowerCase()] || 0; }
function ktDom(ph, b) {
  var body = ph.querySelector('.ph-body'), ds = [];
  body.querySelectorAll('.ph-loi').forEach(ktBo);
  ktNghe(ph);
  function gan(el, msg) { ds.push([el, msg]); }
  function trongDlg(el) { return !!el.closest('.tp-dlg-wrap'); }
  /* nhóm địa chỉ */
  body.querySelectorAll('.ph-addr').forEach(function (g) {
    if (trongDlg(g) || !g.querySelector(':scope > .tp-field-label .tp-field-req')) return;
    var ten = ktNhan(g.getAttribute('aria-label') || ''), sel = g.querySelectorAll('.tp-select'), ip = g.querySelector('input, textarea');
    var khoa = function (el) { return el.classList.contains('tp-select-off') || el.readOnly || el.disabled; };
    if (sel[0] && sel[0].querySelector('.tp-select-ph')) gan(sel[0], khoa(sel[0]) ? 'Tài khoản chưa có thông tin tỉnh/thành của ' + ten : 'Bắt buộc chọn tỉnh/thành');
    /* v538 (NDKK 1.55, như web index.tsx kiemTraFields): Phường/Xã khóa vì chưa chọn Tỉnh/TP không phải ô lấy từ tài khoản – xét khóa theo ô Tỉnh/TP của nhóm */
    if (sel[1] && sel[1].querySelector('.tp-select-ph')) gan(sel[1], khoa(sel[0] || sel[1]) ? 'Tài khoản chưa có thông tin phường/xã của ' + ten : 'Bắt buộc chọn phường/xã');
    if (ip && !ip.value.trim() && !g.getAttribute('data-ct-tuy-chon')) gan(ip.closest('.tp-field'), khoa(ip) ? 'Tài khoản chưa có thông tin số nhà, đường của ' + ten : 'Bắt buộc nhập số nhà, đường');
  });
  /* ô nhập, ô chọn có nhãn */
  body.querySelectorAll('.tp-field').forEach(function (f) {
    if (trongDlg(f) || f.closest('.ph-addr') || f.classList.contains('ph-gt') || f.closest('.fx-search')) return;
    var lb = f.querySelector(':scope > .tp-field-label'); if (!lb) return;
    var ten = ktTenNhan(lb), req = !!lb.querySelector('.tp-field-req');
    var ip = f.querySelector('input.tp-field-input, textarea.tp-field-input'), sb = f.querySelector('.tp-select');
    if (ip) {
      var v = ip.value.trim();
      if (req && !v) { gan(f, ip.readOnly || ip.disabled ? 'Tài khoản chưa có thông tin ' + ktNhan(ten) : 'Bắt buộc nhập ' + ktNhan(ten)); return; }
      if (!v) return;
      var mx = ndMax(ten); /* v537 (NDKK 1.44, như web index.tsx kiemTra: Tối đa {max} ký tự – max theo field-defs) */
      if (mx && v.length > mx) { f.dataset.dem = v.length + '/' + mx; gan(f, 'Tối đa ' + mx + ' ký tự'); return; }
      if (ip.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) gan(f, 'Email không đúng định dạng');
      else if (ip.type === 'tel' && !/^0\d{9,10}$/.test(v)) gan(f, 'SĐT không hợp lệ (bắt đầu bằng 0, 10–11 số)');
      else if (/năm sinh|^Ngày sinh/.test(ten) && !du14Tuoi(v)) gan(f, 'Công dân phải đủ 14 tuổi');
    } else if (sb && req && sb.querySelector('.tp-select-ph')) gan(f, sb.classList.contains('tp-select-off') ? 'Tài khoản chưa có thông tin ' + ktNhan(ten) : 'Bắt buộc chọn ' + ktNhan(ten));
  });
  /* giới tính */
  body.querySelectorAll('.ph-gender-f').forEach(function (g) {
    if (trongDlg(g)) return;
    var lb = g.querySelector(':scope > .tp-field-label'); if (!lb || !lb.querySelector('.tp-field-req')) return;
    var rg = g.querySelector(':scope > .ph-gender'); if (!rg || rg.querySelector('input:checked')) return;
    gan(g, 'Bắt buộc chọn ' + ktNhan(ktTenNhan(lb)));
  });
  /* số giấy tờ có chọn loại (bước 3) */
  body.querySelectorAll('.ph-gt').forEach(function (g) {
    if (trongDlg(g)) return;
    var dup = g.querySelector('.ph-gt-msg'); if (dup) { gan(g, dup.textContent); return; }
    var ip = g.querySelector('.ph-gt-in'), v = ip ? ip.value.trim() : '', l = (g.querySelector('.ph-gt-pre') || {}).textContent || 'CCCD';
    if (!v) { if (g.querySelector(':scope > .tp-field-label .tp-field-req')) gan(g, 'Bắt buộc nhập ' + ktNhan(ktTenNhan(g.querySelector(':scope > .tp-field-label')))); return; }
    var loi = /CMND/.test(l) ? (/^\d{9}$/.test(v) ? null : 'Số CMND phải gồm 9 chữ số') : /Hộ chiếu/.test(l) ? (/^[A-Z0-9]{1,50}$/.test(v) ? null : 'Số hộ chiếu tối đa 50 ký tự, chỉ gồm chữ và số') : (/^\d{12}$/.test(v) ? null : 'Số CCCD phải gồm 12 chữ số');
    if (loi) gan(g, loi);
  });
  /* đã đánh dấu "Có người đại diện" mà chưa khai (web dai-dien-hop-phap.ts loiThieuDaiDienHopPhap) */
  body.querySelectorAll('.ph-rep').forEach(function (r) {
    if (trongDlg(r)) return;
    var on = r.querySelector(':scope > .ph-radio input:checked'); if (!on) return;
    if (r.querySelector('.dm-sum') || r.querySelector('.nd-chosen li')) return;
    var tay = r.querySelector('.nd-tay'); if (tay && [].some.call(tay.querySelectorAll('input'), function (i) { return i.value.trim(); })) return;
    var pl = !!r.querySelector('.nd-grp, .nd-tay'), uq = !!r.querySelector('.ph-rep-add');
    gan(r, pl && uq ? 'Vui lòng nhập người đại diện theo pháp luật hoặc thêm người đại diện theo ủy quyền, hoặc bỏ tick nếu không có người đại diện hợp pháp.'
      : pl ? 'Vui lòng nhập người đại diện theo pháp luật, hoặc bỏ tick nếu không có người đại diện hợp pháp.' : 'Vui lòng bấm "Thêm người đại diện" hoặc bỏ tick nếu không có người đại diện hợp pháp.');
  });
  /* bước 3 – người có quyền lợi, nghĩa vụ liên quan: chọn Có/Không, chọn Có phải có ít nhất 1 người */
  if (b === 3) body.querySelectorAll('.ph-lq').forEach(function (q) {
    var c = q.querySelector(':scope > .ph-gender input:checked');
    if (!c) gan(q, 'Vui lòng chọn Có hoặc Không cho danh sách người có quyền lợi, nghĩa vụ liên quan.');
    else if (/Có/.test(c.closest('label').textContent) && !q.querySelector('.dm-sum')) gan(q, 'Vui lòng thêm ít nhất 1 người có quyền lợi, nghĩa vụ liên quan.');
  });
  /* v537 (NDKK 1.42, như web dedup-duong-su.ts): trùng số giấy tờ/MST giữa các đương sự trong đơn; trùng với bước kia (đương sự hoặc người đại diện);
     người đại diện trùng bước kia – PA A: viền đỏ đúng thẻ người đại diện đó, câu ngay dưới thẻ */
  if (b === 2 || b === 3) {
    var kia = b === 2 ? 3 : 2, kiaSo = ND_SO_BEN[kia] || [], dsSo = [], reps = [], dem = {};
    body.querySelectorAll('.ph-gt').forEach(function (g) { if (trongDlg(g)) return; var ip = g.querySelector('.ph-gt-in'), v = ip ? ip.value.replace(/\D/g, '') : ''; if (v) dsSo.push([g, 'cn', v]); });
    body.querySelectorAll('.tp-field').forEach(function (f) { if (trongDlg(f)) return; var lb = f.querySelector(':scope > .tp-field-label'), ip = f.querySelector('input'); if (!lb || !ip) return; var tc = /Mã số thuế/.test(lb.textContent), cn = /Số CCCD|Số định danh|Số giấy tờ|CMND|Hộ chiếu/.test(lb.textContent); if (!tc && !cn) return; var v = ip.value.replace(/\D/g, ''); if (v) dsSo.push([f, tc ? 'tc' : 'cn', v]); });
    body.querySelectorAll('.nd-dd3[data-so]').forEach(function (c) { if (!trongDlg(c)) reps.push([c, c.getAttribute('data-so').replace(/\D/g, ''), c.getAttribute('data-ten') || '']); });
    dsSo.forEach(function (x) { dem[x[2]] = (dem[x[2]] || 0) + 1; });
    dsSo.forEach(function (x) {
      var dt = x[1] === 'tc' ? 'Tổ chức này' : 'Người này';
      if (dem[x[2]] > 1) gan(x[0], x[1] === 'tc' ? 'Mã số thuế này đã được dùng cho một đương sự khác trong đơn — mỗi tổ chức chỉ được xuất hiện 1 lần.' : 'Số giấy tờ này đã được dùng cho một đương sự khác trong đơn — mỗi người chỉ được xuất hiện 1 lần.');
      else if (kiaSo.indexOf(x[2]) >= 0) gan(x[0], kia === 2 ? dt + ' đã có ở bước Người khởi kiện (là người khởi kiện hoặc người đại diện) — không được xuất hiện lại ở bước Bị kiện/Người liên quan.'
        : dt + ' đã có ở bước Bị kiện/Người liên quan (là đương sự hoặc người đại diện) — không được xuất hiện lại ở bước Người khởi kiện.');
    });
    reps.forEach(function (r) { if (r[1] && kiaSo.indexOf(r[1]) >= 0) gan(r[0], 'Người đại diện' + (r[2] ? ' «' + r[2] + '»' : '') + (kia === 2 ? ' đã có ở bước Người khởi kiện — không được xuất hiện lại ở bước Bị kiện/Người liên quan.' : ' đã có ở bước Bị kiện/Người liên quan — không được xuất hiện lại ở bước Người khởi kiện.')); });
    ND_SO_BEN[b] = dsSo.map(function (x) { return x[2]; }).concat(reps.map(function (r) { return r[1]; })).filter(Boolean);
  }
  ds.sort(function (x, y) { return x[0] === y[0] ? 0 : (x[0].compareDocumentPosition(y[0]) & 4 ? -1 : 1); });
  var msgs = [];
  ds.forEach(function (x) {
    msgs.push(x[1]);
    var el = x[0]; if (el.classList.contains('ph-loi')) return;
    el.classList.add('ph-loi');
    var m = document.createElement('div'); m.className = 'tp-field-help ph-loi-msg'; m.innerHTML = LOI_ICO; m.appendChild(document.createTextNode(x[1]));
    if (el.dataset.dem && /^Tối đa \d+ ký tự$/.test(x[1])) { var d = document.createElement('span'); d.className = 'ph-loi-dem tp-num'; d.textContent = el.dataset.dem; m.appendChild(d); } /* 1.44 PA B: bộ đếm bên phải */
    datLoiMsg(el, m);
  });
  if (b === 2) ndbDat('thieu2', msgs.some(function (m) { return m.indexOf('Tài khoản chưa có thông tin') === 0; }));
  return msgs;
}
/* tự chạy kiểm tra khi mở màn trạng thái (đã bấm Tiếp theo) */
function TuKt(p) {
  var me = React.useRef(null);
  React.useEffect(function () { var t = setTimeout(function () { var ph = me.current && me.current.closest('.ph'); if (!ph) return; ktDom(ph, p.b); }, 250); return function () { clearTimeout(t); }; }, []);
  return h('span', { ref: me, hidden: true });
}

/* ---------- 1.22 / 1.46: thanh công cụ danh sách – số đếm, Thu gọn / Mở rộng tất cả (người dùng 20/11: bỏ ô tìm kiếm ở mọi danh sách đương sự) ---------- */
function DsCongCu(p) {
  return h('div', { className: 'ph-ds-tool' },
    h('div', { className: 'ph-ds-tool-r' }, h('b', null, p.dem), p.them || null)); /* v546: nút "+ Thêm …" cùng hàng số đếm; v545 (người dùng 23/11): bỏ nút "Thu gọn tất cả / Mở rộng tất cả" ở mọi danh sách đương sự */
}
/* v546 (người dùng 23/11, PA C kiểu 2): nút thêm của danh sách đương sự – viền đỏ cỡ nhỏ, ghi đủ đối tượng; đã có người thì nằm phải hàng số đếm, chưa có ai thì căn trái dưới tiêu đề khối */
function ThemNut(t, onClick) { return h(T.Button, { variant: 'tint', size: 'sm', icon: 'plus', className: 'ph-co-add ph-them-nut', onClick: onClick }, t); }
function DsThem(tong, nut) { return tong ? null : h('div', { className: 'ph-them-rong' }, nut); }
function DsRong(t) { return h('p', { className: 'ph-ds-rong' }, t); }
function khop(q, txt) { var k = khongDau(String(q || '').trim()); return !k || khongDau(String(txt || '')).indexOf(k) >= 0; }

/* ---------- ô chọn có bảng từ đáy (dùng cho danh mục phá sản, người đại diện ký…): có ô "Tìm kiếm…" khi trên 10 mục như web ---------- */
/* 1.29 (người dùng 20/11): ô chọn danh mục dùng đúng định dạng bảng chọn hệ thống SelSheet – tiêu đề "Chọn …", placeholder "Chọn …", ô "Tìm"/"Nhập để tìm" khi trên 10 mục; thêm lỗi và khóa */
function ChonDs(p) {
  var v = React.useState(p.v || ''), o = React.useState(false), q = React.useState(''), anchor = React.useRef(null), host = useHost(anchor);
  var kq = khongDau(q[0].trim()), loc = p.ds.filter(function (x) { return !kq || khongDau(x).indexOf(kq) >= 0; });
  var thuong = p.label.charAt(0).toLowerCase() + p.label.slice(1);
  return h('div', { className: 'ph-selsh' }, h('span', { ref: anchor, hidden: true }),
    h(T.SelectField, { label: p.label, labelVisible: true, required: !!p.req, placeholder: p.ph || ('Chọn ' + thuong), value: v[0] || undefined, open: o[0], disabled: !!p.khoa, error: p.loi || undefined, onClick: function () { q[1](''); o[1](true); } }),
    o[0] && host ? h(LvSheet, { host: host, title: p.tieuDe || ('Chọn ' + thuong), onClose: function () { o[1](false); },
      top: p.ds.length > 10 ? h('div', { className: 'fx-search' }, Tf('Tìm', { icon: 'search', placeholder: 'Nhập để tìm', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })) : null },
      loc.length ? h(LvRows, { label: p.label, cur: v[0], items: loc.map(function (x) { return { id: x, name: x }; }), onPick: function (x) { v[1](x); o[1](false); if (p.onChange) p.onChange(x); } })
        : h('p', { className: 'ph-lv-empty' }, 'Không có mục khớp «' + q[0] + '».')) : null);
}
/* 1.30 / 1.49 (người dùng 20/11 chọn PA3): nhóm THÔNG TIN PHÂN LOẠI TỔ CHỨC/DOANH NGHIỆP/CƠ QUAN nằm phẳng trên form (web field-defs.ts khoiPhanLoaiToChuc):
   đường kẻ, tiêu đề đậm 14 chữ thường, 5 ô chọn (bắt buộc với bên yêu cầu, không bắt buộc với bên bị yêu cầu), Niêm yết cuối nhóm */
function plTruong(bi) {
  return [['lh', 'Loại hình kinh doanh', LOAI_HINH_PS], ['qm', 'Quy mô', QUY_MO_PS], ['lv', 'Lĩnh vực', LINH_VUC_KD_PS],
    ['dd', bi ? 'Đặc điểm của tổ chức/doanh nghiệp/cơ quan bị yêu cầu' : 'Đặc điểm của tổ chức/doanh nghiệp/cơ quan yêu cầu', DAC_DIEM_PS.slice(1)], ['nk', 'Ngành kinh tế', NGANH_KT_PS]];
}
function PhanLoaiTc(p) {
  var bb = !p.bi, tr = plTruong(p.bi), tieu = p.bi ? 'Thông tin phân loại tổ chức/doanh nghiệp/cơ quan bị yêu cầu' : 'Thông tin phân loại tổ chức/doanh nghiệp/cơ quan yêu cầu';
  var gt = React.useState(p.mau || {});
  var datG = function (k, x) { var m = Object.assign({}, gt[0]); m[k] = x; gt[1](m); };
  return h('section', { className: 'ph-pl3' }, h('h4', null, tieu),
    tr.map(function (t) { return h(ChonDs, { key: t[0], label: t[1], req: bb, ds: t[2], v: gt[0][t[0]], onChange: function (x) { datG(t[0], x); } }); }),
    h(T.Checkbox, { label: 'Niêm yết trên sàn giao dịch chứng khoán', checked: !!gt[0].ny, onChange: function (e) { datG('ny', e.target.checked); } }));
}
/* 1.51: khối người đại diện theo pháp luật nhập tay ở Bước 3 (web field-defs.ts defDescs tổ chức / khoiPhapLuatNhapTay) */
function KhoiPlTay(p) {
  var tc = p.kind === 'tc', nhanCv = tc ? 'Chức vụ' : 'Quan hệ với đương sự';
  var rec = React.useState(p.mau || null), o = React.useState(false), cf = React.useState(false), anchor = React.useRef(null), host = useHost(anchor);
  var r = rec[0];
  return h('div', { className: 'nd-grp' }, h('span', { ref: anchor, hidden: true }),
    r ? h('div', { className: 'dm-sum nd-dd3 nd-pltay' }, h('div', { className: 'dm-sum-head' },
      h('button', { type: 'button', className: 'dm-sum-hit', 'aria-label': 'Sửa ' + (r.ten || 'người đại diện theo pháp luật'), onClick: function () { o[1](true); } },
        h('span', { className: 'dm-sum-tx' }, h('b', null, r.ten || 'Người đại diện theo pháp luật'), h('small', null, [r.so, r.cv].filter(Boolean).join(' · ') || ' '))),
      h('button', { type: 'button', className: 'dm-del', 'aria-label': 'Xóa ' + (r.ten || 'người đại diện'), onClick: function () { cf[1](true); } }, h(T.Icon, { name: 'trash' })),
      h('span', { className: 'nd-dd3-mt', 'aria-hidden': 'true' }, h(T.Icon, { name: 'chevronRight' })))) : null,
    r ? null : h(T.Button, { variant: 'tint', icon: 'plus', className: 'ph-co-add', onClick: function () { o[1](true); } }, 'Thêm người đại diện theo pháp luật'),
    o[0] && host ? h(PlTaySheet, { host: host, tc: tc, nhanCv: nhanCv, v: r, onClose: function () { o[1](false); }, onSave: function (x) { rec[1](x); o[1](false); } }) : null,
    cf[0] && host ? ReactDOM.createPortal(h(ConfirmDel, { title: 'Xóa người đại diện?', desc: (r && r.ten || 'Người đại diện') + ' sẽ bị xóa khỏi người đại diện theo pháp luật', onNo: function () { cf[1](false); }, onYes: function () { rec[1](null); cf[1](false); } }), host) : null);
}
function PlTaySheet(p) {
  var v = p.v || {}, f = React.useState({ ten: v.ten || '', ns: v.ns || '', cv: v.cv || '', sdt: v.sdt || '', mail: v.mail || '' }), body = React.useRef(null), d = f[0];
  function set(k) { return function (e) { var o = Object.assign({}, f[0]); o[k] = e.target.value; f[1](o); }; }
  function luu() { var so = body.current && body.current.querySelector('.ph-sgt input, input[inputmode="numeric"]'); p.onSave(Object.assign({}, d, { so: so && so.value ? so.value : (v.so || '') })); }
  return h(LvSheet, { host: p.host, title: (p.v ? 'Sửa' : 'Thêm') + ' người đại diện theo pháp luật', onClose: p.onClose,
    foot: h(F, null, h(T.Button, { variant: 'tonal', onClick: p.onClose }, 'Hủy'), h(T.Button, { onClick: luu }, 'Lưu')) },
    h('div', { className: 'nd-tay', ref: body },
      Tf('Họ và tên người đại diện', { placeholder: 'Nguyễn Văn A', value: d.ten, onChange: set('ten') }),
      h(SoGiayTo, { label: 'Số giấy tờ người đại diện', ph: '(nếu có)' }),
      TwoE(Tf('Ngày sinh người đại diện', Dt({ value: d.ns, onChange: set('ns') })), Sf('Quốc tịch người đại diện', { placeholder: 'Chọn' })),
      h('div', { className: 'ph-gender-f' }, Lbl('Giới tính người đại diện'), h(Gender, { v: 'nam', label: 'Giới tính người đại diện' })),
      p.tc ? Tf('Chức vụ', { placeholder: '(nếu có)', value: d.cv, onChange: set('cv') }) : Tf('Quan hệ với đương sự', { placeholder: 'VD: cha, mẹ, người giám hộ', value: d.cv, onChange: set('cv') }),
      AddrG('Địa chỉ thường trú người đại diện', false, 'short', null, false, { chon: true }),
      Tf(p.tc ? 'Số điện thoại' : 'Số điện thoại người đại diện', { type: 'tel', placeholder: '(nếu có)', value: d.sdt, onChange: set('sdt') }),
      Tf(p.tc ? 'Địa chỉ thư điện tử' : 'Địa chỉ thư điện tử người đại diện', { type: 'email', placeholder: '(nếu có)', value: d.mail, onChange: set('mail') })));
}
/* quyền nhập người đại diện theo (nhóm, loại đối tượng) – mặc định web khi cấu hình không ghi: cá nhân/cơ quan chỉ ủy quyền, tổ chức cả hai; khởi kiện hành chính: cá nhân có thẩm quyền không có, cơ quan chỉ pháp luật */
function quyenBk(k) { if (ndHanhChinh()) return k === 'cq' ? { pl: true, uq: false } : { pl: false, uq: false }; return k === 'tc' ? { pl: true, uq: true } : { pl: false, uq: true }; }

/* 1.20: banner hồ sơ tài khoản còn thiếu thông tin bắt buộc (web step-2.tsx BannerThieuDuLieuTaiKhoan) – người dùng 20/11 chọn PA-A: câu đầu đậm, nút "Cập nhật hồ sơ tài khoản", nút đóng */
function BannerThieu(p) {
  var b = ndNghe();
  React.useEffect(function () { if (NDB.thieu2) ndbDat('thieu2', false); }, []);
  if (!b.thieu2) return null;
  var go = laTC() || p.tc ? 'accountOrg' : 'account';
  return h('div', { className: 'ph-thieu ph-thieu-a', role: 'alert' }, h(T.Icon, { name: 'alert' }),
    h('div', null, h('p', null, h('b', null, 'Hồ sơ tài khoản của bạn còn thiếu thông tin bắt buộc.'), ' Các ô này lấy từ tài khoản nên không sửa trực tiếp trên đơn — cập nhật hồ sơ tài khoản rồi quay lại.'),
      h(T.Button, { size: 'sm', variant: 'secondary', icon: 'user', 'data-pt-go': go }, 'Cập nhật hồ sơ tài khoản')),
    h('button', { type: 'button', className: 'tp-icon-btn ph-thieu-x', 'aria-label': 'Đóng', onClick: function () { ndbDat('thieu2', false); } }, h(T.Icon, { name: 'x' })));
}
/* 1.19: thẻ chặn Bước 2 khi loại tài khoản không được nộp loại việc (web step-2.tsx BannerKhongPhuHopLoaiTaiKhoan) – không có nút đóng */
function ChanB2() {
  return h('div', { className: 'ph-chan' }, h('span', { className: 'ph-chan-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: 'shield' })),
    h('div', null, h('p', { className: 'ph-chan-t' }, LV_KHONG_PHU_HOP), h('p', null, 'Loại tài khoản bạn đang đăng nhập không được phép nộp loại việc này. Vui lòng chọn lại loại việc khác ở bước 1.')));
}

/* demo NDKK 1.69: tệp mẫu trong kho có đủ trường hợp – đã ký số, vượt quá 10MB, định dạng không hỗ trợ, đã đính kèm, gắn vụ án */
(function () { KHO[1].vuAn = 'DS-2026-0012'; KHO[3].daKy = true; KHO[3].vuAn = 'DS-2026-0012'; KHO[4].kt = '12.6 MB'; KHO[4].quaCo = true; KHO[6].dang = 'XLSX'; KHO[6].tep = KHO[6].tep.replace(/\.[a-z]+$/, '.xlsx');
  KHO[7].ten = 'Biên nhận chuyển khoản'; KHO[7].tep = 'bien-nhan-chuyen-khoan.pdf'; KHO[7].dang = 'PDF'; })();

/* ---------- Màn trạng thái để xem nhanh từng case (danh sách "Đi tới màn bất kỳ" – nhóm Nộp đơn khởi kiện) ---------- */
function ndDat(o) { ND_DON = Object.assign({ tt: null, lv: null, v: '', ct: '' }, o); }
function TbTuDong(p) { React.useEffect(function () { var t = setTimeout(function () { if (p.loi) window.__ptSnackLoi(p.m); else window.__ptSnack(p.m); }, 300); return function () { clearTimeout(t); }; }, []); return null; }
var NDPL_NHIEU = NDPL.concat([['d', 'Nguyễn Thị Mai', '001087000044', 'Thành viên Hội đồng quản trị'], ['e', 'Đỗ Văn Nam', '001082000055', 'Thành viên Hội đồng quản trị'], ['f', 'Vũ Thị Hà', '001089000066', 'Giám đốc chi nhánh Hà Nội'],
  ['g', 'Bùi Quang Huy', '001084000077', 'Giám đốc chi nhánh Hải Phòng'], ['h', 'Hoàng Minh Đức', '001083000088', 'Phó Giám đốc'], ['i', 'Ngô Thị Thu', '001091000099', 'Trưởng phòng Pháp chế'],
  ['j', 'Trịnh Văn Long', '001081000100', 'Thành viên Hội đồng quản trị'], ['k', 'Phan Thị Ngọc', '001092000111', 'Giám đốc chi nhánh Đà Nẵng'], ['l', 'Đặng Văn Khoa', '001086000122', 'Giám đốc chi nhánh TP.HCM']].map(function (x) { return { id: x[0], ten: x[1], so: x[2], cv: x[3] }; }));
var DD_MAU = { k: 1, loai: 'cn', ten: 'Nguyễn Văn B', so: '001085000123', ns: '12-04-1985', gt: 'Nam', gtMa: 'nam', tu: '20-11-2026', den: '', moi: true, files: [{ tep: 'giay-uy-quyen-24.pdf', ten: 'Giấy ủy quyền', loai: 'Bản chính' }] };
var DD_CU = { k: 1, chuaXm: true, ten: 'Nguyễn Văn Tâm', qh: 'Con trai', moi: true };
var DD_SAN = { ok: true, v: { ten: 'Nguyễn Văn B', so: '001085000123', ns: '12-04-1985' } };
/* Bước 1 */
function Sub1Kt() { return Submit(1, h(Step1Body, { kt: true }), null, 'ph-s1'); }
function Sub1Don(o) { return function () { ndDat(o); return Submit(1, h(Step1Body, { draft: true }), null, 'ph-s1'); }; }
/* Bước 2 */
function Sub2Don(o, p) { return function () { if (o) ndDat(o); return Sub2(p); }; }
function ktTrungB2(ph) {
  var ds = ktDom(ph, 2), so = CO_MAU[0].so, msg = 'Người này đã có ở bước Bị kiện/Người liên quan (là đương sự hoặc người đại diện) — không được xuất hiện lại ở bước Người khởi kiện.';
  ph.querySelectorAll('.ph-body .tp-field').forEach(function (f) { var ip = f.querySelector('input'); if (ip && ip.value === so && !f.classList.contains('ph-loi')) { f.classList.add('ph-loi'); var m = document.createElement('div'); m.className = 'tp-field-help ph-loi-msg'; m.innerHTML = LOI_ICO; m.appendChild(document.createTextNode(msg)); datLoiMsg(f, m); } });
  return [msg].concat(ds);
}
function Sub2Trung() { ndDat({ tt: 'a', lv: 'ds', v: 'VA-DS-3' }); return Submit(2, h(F, null, /* đơn mẫu: người đồng khởi kiện Trần Thị C đã được khai ở Bước 3 là người bị kiện */
  FCard('Danh sách người khởi kiện', h(CoList, { chinh: true, nhan: 'người khởi kiện', tuNhan: 'người khởi kiện', kinds: ['cn', 'tc'] }), true),
  FCard('Danh sách đồng khởi kiện', h(CoList, { nhan: 'người đồng khởi kiện', tuNhan: 'người khởi kiện', kinds: ['cn', 'tc'], tieuDeThem: 'Thêm đồng khởi kiện', nutThem: 'Thêm đồng khởi kiện', init: [{ k: 1, v: { loai: 'cn', so: CO_MAU[0].so }, isNew: true }] }), true)), null, null,
  { kt: function () { return ktTrungB2(document.querySelector('.pt-phone .ph')); } }); }
/* Bước 3 */
function Sub3Don(o, p) { return function () { if (o) ndDat(o); return Sub3(p); }; }
/* Bước 4 */
function Sub4KtC(p) {
  React.useState(function () { ND_ST.mode = p.mode0 || 'nhap'; ND_ST.doc = null; if (!p.giu) { ND_ST.td = ''; ND_ST.tt = ''; YC_ST.rows = [{ nd: '', gt: '', mt: '' }]; } return 1; });
  return Submit(4, h(NoiDungCard, { kt: p.kt, mode0: p.mode0, tepLoi: p.tepLoi }));
}
function Sub4Kt() { return h(Sub4KtC, { kt: true }); }
function Sub4Thieu() { return h(Sub4KtC, { kt: true, giu: true }); }
function Sub4File() { return h(Sub4KtC, { kt: true, mode0: 'file' }); }
function Sub4TepLoi() { return h(Sub4KtC, { mode0: 'file', tepLoi: 'Định dạng không được hỗ trợ. Chỉ chấp nhận PDF, DOCX.' }); }
/* Bước 5 */
var BS_NHIEU = [{ k: 1, tep: 'bien-nhan-chuyen-khoan.pdf', ten: 'Biên nhận chuyển khoản', loai: 'Bản sao không có chứng thực', nguon: 'tb' }, { k: 2, tep: 'cccd-mat-truoc-22.jpg', ten: '', loai: '', nguon: 'tb' }, { k: 3, tep: 'hop-dong-uy-quyen-19.pdf', ten: '', loai: '', nguon: 'tb' }];
function Sub5Kt() { return Submit(5, h(TaiLieuCard, { ndkk: true, kt: true, bs0: BS_NHIEU })); }
function Sub5TepLoi() { return Submit(5, h(TaiLieuCard, { ndkk: true, tepLoi: 'Định dạng không được hỗ trợ. Chỉ chấp nhận PDF, JPG, PNG, DOCX.' })); }
function Sub5DmTai() { return Submit(5, h(TaiLieuCard, { ndkk: true, dmTai: true })); }
function Sub5Kho(tr) { return function () { return Submit(5, h(TaiLieuCard, { ndkk: true, khoMo: tr })); }; }
function Sub5Xem() { return Submit(5, h(TaiLieuCard, { ndkk: true, bs0: [{ k: 1, tep: 'bien-nhan-chuyen-khoan.pdf', ten: 'Biên nhận chuyển khoản', loai: 'Bản sao không có chứng thực', nguon: 'tb' }, { k: 2, tep: KHO[3].tep, ten: KHO[3].ten, loai: 'Bản chính', nguon: 'kho' }] })); }
/* Bước 6 */
function Sub6Kt() { return h(XemLaiKt); }
function XemLaiKt() { React.useEffect(function () { var t = setTimeout(function () { ndbDat('kt6', true); }, 50); return function () { clearTimeout(t); }; }, []); return h(XemLaiScreen, { toa: '' }); }
function Sub6O(o) { return function () { if (o.nd) ndDat(o.nd); return h(XemLaiScreen, o); }; }
/* đơn đã xác nhận – chỉ xem (1.81) */
function SubX(n) { return function () {
  if (n === 1) return Submit(1, h(Step1Body, { draft: true }), null, 'ph-s1', { ro: true });
  if (n === 2) return Sub2({ ro: true }); if (n === 3) return Sub3({ ro: true });
  if (n === 4) return Submit(4, h(NoiDungCard), null, null, { ro: true }); if (n === 5) return Submit(5, h(TaiLieuCard, { ndkk: true }), null, null, { ro: true });
  return h(XemLaiScreen, { ro: true });
}; }
/* Bước 7 */
var KY_NHOM_MAU = [{ ten: 'Hoàng Dương', vai: 'Người khởi kiện', toi: true }, { ten: 'Trần Thị C', vai: 'Đồng khởi kiện', daKy: 'Đã ký lúc 02-11-2026 09:15' }, { ten: 'Công ty Cổ phần Xây dựng Minh Long', tc: true, khac: true }];
function Sub7O(o) { return function () { return h(KySoScreen, o); }; }
