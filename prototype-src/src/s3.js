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
    onOk: function () { accSnack('Đã bật xác thực hai yếu tố.'); tt[1]({ bat: true, ngay: '09/11/2026', con: 10 }); b[1]('ma'); } });
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
var ACC_TC = { ten: 'Công ty ABC' /* v333 */, mst: '0101234567', truSo: 'Số 25 Láng Hạ, Phường Láng, Thành phố Hà Nội', gp: 'Giấy chứng nhận đăng ký doanh nghiệp số 0101234567 do Sở Tài chính Thành phố Hà Nội cấp ngày 12/05/2015', sdt: '02438123456', email: 'lienhe@anphat.vn' };
var ACC_NDD = [
  { ten: 'Nguyễn Văn Bình', cccd: '001085004321', ns: '20/03/1985', gt: 'Nam', qt: 'Việt Nam', xm: true, ky: [{ id: 1, tu: '01/01/2025', den: null, tt: 'DANG_HIEU_LUC', cv: 'Giám đốc' }] },
  { ten: 'Trần Thị Hoa', cccd: '001190007788', ns: '11/07/1990', gt: 'Nữ', qt: 'Việt Nam', xm: true, ky: [{ id: 2, tu: '01/03/2024', den: '31/12/2024', tt: 'HET_HIEU_LUC', cv: 'Phó Giám đốc' }] },
  { ten: 'Lê Minh Quân', cccd: '001088009911', ns: '05/09/1988', gt: 'Nam', qt: 'Việt Nam', xm: false, ky: [{ id: 3, tu: '01/06/2024', den: '30/06/2025', tt: 'HET_HIEU_LUC', cv: 'Kế toán trưởng' }, { id: 4, tu: '01/12/2026', den: null, tt: 'CHUA_TOI_HAN', cv: 'Kế toán trưởng' }] }];
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
      foot: h(F, null, AccBtn('Hủy', 'secondary', { onClick: dong }), AccBtn(cu ? 'Xác minh & bổ nhiệm lại' : 'Xác minh & thêm', 'primary', { onClick: function () { dong(); accSnack(cu ? 'Đã bổ nhiệm lại bằng một kỳ hiệu lực mới.' : 'Đã thêm người đại diện.'); } })) },
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
        Two(Tf('Hiệu lực từ', Dt({ required: true, defaultValue: cu ? '10/11/2026' : undefined })),
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
  var tt = React.useState(p.daBat || p.con != null || window.__accBat ? { bat: true, ngay: window.__accBat ? '09/11/2026' : '15/10/2026', con: p.con != null ? p.con : window.__accBat ? 10 : 8 } : { bat: false }); /* v292: demo bắt đầu từ chưa bật */
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
    h(T.Tabs, { label: 'Chữ ký số', items: [{ key: 'a', label: 'Phương thức & chứng thư' }, { key: 'b', label: 'Lịch sử ký' }, { key: 'c', label: 'Hướng dẫn cài USB ký số' }] }),
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
var SUB_STEPS = ['Loại đơn', 'Người khởi kiện', 'Người bị kiện', 'Nội dung', 'Tài liệu', 'Xem lại', 'Ký số'];
/* thanh tiến trình phương án P2 (chọn 02/11/2026): 7 đoạn ngang bằng nhau (đã qua và đang làm màu đỏ, chưa tới xám), dòng dưới "n. Tên bước" đậm + "Bước n/7", dòng tiếp bước tiếp theo; chuyển bước bằng Quay lại / Tiếp theo */
function StepStrip(p) {
  var n = p.cur, all = p.steps.length;
  /* v250: bước "Xem lại…" gắn lớp ph-stepbar-xl để khối nhãn – giá trị của màn đó dùng kiểu cột nhãn trái, giá trị căn trái, không đường kẻ */
  return h('div', { className: 'ph-stepbar' + (/Xem lại/.test(p.steps[n - 1] || '') ? ' ph-stepbar-xl' : '') },
    h('div', { className: 'ph-sbseg', role: 'progressbar', 'aria-valuemin': 1, 'aria-valuemax': all, 'aria-valuenow': n, 'aria-label': 'Tiến độ nộp đơn' },
      p.steps.map(function (s, i) { return h('i', { key: i, className: i + 1 <= n ? 'ph-sbseg-on' : null }); })),
    h('p', { className: 'ph-sb-title' }, h('b', null, n + '. ' + p.steps[n - 1]), h('span', null, 'Bước ' + n + '/' + all)),
    h('p', { className: 'ph-stepbar-t' }, n < all ? 'Tiếp theo: ' + p.steps[n] : 'Bước cuối'));
}
function Next() { return Btn(h(F, null, 'Tiếp theo', h(T.Icon, { name: 'chevronRight' }))); }
function Submit(n, body, last, cls) {
  return h(Phone, { cls: 'ph-hd' },
    h('div', { className: 'ph-hd-step' }, h(T.AppBar, { variant: 'plain', title: 'Soạn đơn', onBack: noop, actions: n < 7 ? [{ text: 'Lưu nháp' }] : [] }),
      h(StepStrip, { cur: n, steps: SUB_STEPS })),
    h(Body, { cls: 'ph-plain ph-steps' + (cls ? ' ' + cls : '') }, body),
    h('div', { className: 'ph-foot' }, n === 1 ? Bar(Next()) : Bar(Btn('Quay lại', 'tonal'), last || Next())));
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
function Dt(o) { return Object.assign({ icon: 'calendar', placeholder: 'dd/mm/yyyy', inputMode: 'numeric' }, o || {}); }
/* nhóm địa chỉ (chốt B 02/11/2026, áp dụng mọi bộ địa chỉ): 1 nhãn nhóm + Tỉnh/Phường-Xã không nhãn riêng (chữ gợi ý là tên trường) + Địa chỉ chi tiết; am = 'full' (Tỉnh/Thành phố) | 'short' (Tỉnh/TP); v = [tỉnh, xã, chi tiết]; lock = khóa (lấy từ định danh) */
function AddrG(title, req, am, v, lock) {
  v = v || [];
  return h('div', { className: 'ph-addr', role: 'group', 'aria-label': title },
    Lbl(title, req),
    h('div', { className: 'ph-addr-col' }, /* v331 (12/11/2026): Tỉnh/TP, Phường/Xã, Địa chỉ chi tiết – mỗi ô một dòng (trước: Tỉnh/TP và Phường/Xã cùng hàng) */
      h(T.SelectField, { label: title + ' – ' + (am === 'full' ? 'Tỉnh/Thành phố' : 'Tỉnh/TP'), placeholder: am === 'full' ? 'Tỉnh/Thành phố' : 'Tỉnh/TP', value: v[0], disabled: !!lock }),
      h(T.SelectField, { label: title + ' – Phường/Xã', placeholder: 'Phường/Xã', value: v[1], disabled: !!lock })),
    h(T.TextField, { label: title + ' – Địa chỉ chi tiết', placeholder: 'Địa chỉ chi tiết', defaultValue: v[2], readOnly: !!lock }));
}
function Addr(kind, req, val) {
  return h(F, null, Two(Sf('Tỉnh/TP', { required: req, placeholder: 'Chọn', value: val && val[0] }), Sf('Phường/Xã', { required: req, placeholder: 'Chọn', value: val && val[1] })),
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
function LvSheet(p) {
  return ReactDOM.createPortal(h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-co-sheet ph-lv-sheet' }, h('div', { className: 'ph-scrim', onClick: p.onClose }),
    h('div', { className: 'tp-dlg tp-dlg-sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': p.title },
      h('div', { className: 'tp-dlg-head' }, h('h3', null, p.title), h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Đóng', onClick: p.onClose }, h(T.Icon, { name: 'x' }))),
      p.top || null,
      h('div', { className: 'tp-dlg-body' }, p.children), p.foot ? h('div', { className: 'tp-dlg-foot' }, p.foot) : null)), p.host);
}
/* danh sách trong bảng chọn loại việc – phương án B (chọn 03/11/2026): mỗi mục một dòng, ngăn bằng đường kẻ mảnh, không radio; ký hiệu đỏ + tên + mô tả xám; mục đang chọn chữ đỏ đậm + dấu tích bên phải */
/* v326 (12/11/2026, chọn K1 – như web): loại việc không phù hợp loại tài khoản đang đăng nhập → bấm vào chỉ hiện thanh thông báo nổi, không chọn được, bảng chọn vẫn mở.
   Dữ liệu mẫu (web lấy từ danh mục doiTuongNguyenDon / chỉ cơ quan): Loại việc chi tiết "Bí mật kinh doanh" – không dành cho tài khoản cá nhân;
   Loại việc cụ thể VA-DS-7 – chỉ dành cho cơ quan có thẩm quyền */
var LV_KHONG_PHU_HOP = 'Bạn không thể tạo đơn với loại việc này', LV_CHI_CO_QUAN = 'Loại đơn này chỉ dành cho cơ quan có thẩm quyền.';
var LVCT_CHAN = ['Bí mật kinh doanh'], LV_CO_QUAN = ['VA-DS-7'];
function LvRows(p) {
  return h('ul', { className: 'ph-lvr', role: 'listbox', 'aria-label': p.label }, p.items.map(function (x) {
    var on = p.cur === x.id;
    return h('li', { key: x.id }, h('button', { type: 'button', role: 'option', 'aria-selected': on, className: 'ph-lvr-it' + (on ? ' ph-lvr-on' : ''), onClick: function () { p.onPick(x.id); } },
      h('span', { className: 'ph-lvr-tx' }, h('span', { className: 'ph-lvr-t' }, x.code ? h('span', { className: 'ph-lv-code' }, x.code) : null, x.name), x.desc ? h('span', { className: 'ph-lvr-d' }, x.desc) : null),
      h('span', { className: 'ph-lvr-ck', 'aria-hidden': 'true' }, on ? h(T.Icon, { name: 'check' }) : null)));
  }));
}
/* Loại việc cụ thể (chốt 02/11/2026): ô chọn → bảng từ đáy "Chọn loại việc cụ thể" (ô tìm nhanh khi trên 6 mục như web; thẻ ký hiệu + tên + mô tả); dưới ô là mô tả loại việc đã chọn */
function CaseTypes(p) {
  var o = React.useState(false), q = React.useState(''), anchor = React.useRef(null), host = useHost(anchor);
  var list = LOAI_VIEC_LV[p.lv] || [], cur = list.filter(function (x) { return x[0] === p.v; })[0];
  var kq = khongDau(q[0].trim()), loc = list.filter(function (x) { return !kq || khongDau(x[1] + ' ' + x[2] + ' ' + x[3]).indexOf(kq) >= 0; });
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    h(T.SelectField, { label: 'Loại việc cụ thể', placeholder: '— Chọn loại việc cụ thể —', value: cur ? cur[1] + ' ' + cur[2] : undefined, open: o[0], onClick: function () { q[1](''); o[1](true); } }),
    o[0] && host ? h(LvSheet, { host: host, title: 'Chọn loại việc cụ thể', onClose: function () { o[1](false); },
      top: list.length > 6 ? h('div', { className: 'fx-search' }, Tf('Tìm nhanh loại việc', { icon: 'search', placeholder: 'Ví dụ: sở hữu trí tuệ, ly hôn, đất đai', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })) : null },
      loc.length ? h(LvRows, { label: 'Loại việc cụ thể', cur: p.v, items: loc.map(function (x) { return { id: x[0], code: x[1], name: x[2], desc: x[3] }; }), onPick: function (id) { if (LV_CO_QUAN.indexOf(id) >= 0) { window.__ptSnack(LV_CHI_CO_QUAN); return; } p.onChange(id); o[1](false); } })
        : h('p', { className: 'ph-lv-empty' }, 'Không có loại việc khớp «' + q[0] + '».')) : null);
}
/* câu hỏi phân định (web CauHoiPhanDinh): khung nền xám, câu hỏi đậm + mô tả, Có/Không chưa chọn sẵn; trả lời lệch → cảnh báo vàng + nút chuyển loại việc (chuyển cả lĩnh vực) */
function PhanDinh(p) {
  var r = LV_PHAN_DINH, tl = p.tl, dangCo = p.v === r.co, lech = tl === undefined ? false : (tl ? !dangCo : dangCo);
  return h('section', { className: 'ph-pd' },
    h('p', { className: 'ph-pd-t' }, r.cauHoi), h('p', { className: 'ph-pd-d' }, r.moTa),
    h(T.SegmentedControl, { label: r.cauHoi, value: tl === undefined ? null : (tl ? 'co' : 'khong'), onChange: function (v) { p.onTl(v === 'co'); }, options: [{ value: 'co', label: 'Có' }, { value: 'khong', label: 'Không' }] }),
    lech ? h('div', { className: 'ph-pd-warn', role: 'alert' }, h(T.Icon, { name: 'alert' }),
      h('div', null, h('p', null, tl ? r.cbCo : r.cbKhong),
        h(T.Button, { size: 'sm', variant: 'secondary', onClick: function () { p.onChuyen(dangCo ? r.khong : r.co); } }, tl ? r.nutCo : r.nutKhong))) : null);
}
/* Loại việc chi tiết – phương án A (chọn 02/11/2026): ô chọn → bảng từ đáy "Chọn loại việc chi tiết", chọn xong bảng tự đóng; 03/11/2026: bỏ radio, dùng chung danh sách dòng LvRows với bảng loại việc cụ thể */
function LvChiTiet(p) {
  var o = React.useState(false), anchor = React.useRef(null), host = useHost(anchor);
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    h(T.SelectField, { label: 'Loại việc chi tiết', placeholder: '— Chọn loại việc chi tiết —', value: p.v || undefined, open: o[0], onClick: function () { o[1](true); } }),
    o[0] && host ? h(LvSheet, { host: host, title: 'Chọn loại việc chi tiết', onClose: function () { o[1](false); } },
      h(LvRows, { label: 'Loại việc chi tiết', cur: p.v, items: p.ds.map(function (t) { return { id: t, name: t }; }), onPick: function (t) { if (!laTC() && LVCT_CHAN.indexOf(t) >= 0) { window.__ptSnack(LV_KHONG_PHU_HOP); return; } /* v333: chỉ chặn tài khoản cá nhân */ p.onChange(t); o[1](false); } })) : null);
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
  var dr = p && p.draft, tt = React.useState(dr ? 'a' : null), lv = React.useState(dr ? 'ds' : null), v = React.useState(dr ? 'VA-DS-3' : ''), ct = React.useState(''), tl = React.useState(undefined);
  var cf = React.useState(p && p.mo ? { f: function () { lv[1]('hn'); v[1](''); ct[1](''); } } : null), anchor = React.useRef(null), host = useHost(anchor);
  function hoi(f) { if (dr) cf[1]({ f: f }); else f(); }
  var t = THU_TUC.filter(function (x) { return x.k === tt[0]; })[0], l = LINH_VUC.filter(function (x) { return x.k === lv[0]; })[0];
  var ds = LV_CHI_TIET[v[0]], pd = v[0] === LV_PHAN_DINH.co || v[0] === LV_PHAN_DINH.khong;
  function chonTt(k) { if (k !== tt[0]) hoi(function () { tt[1](k); }); }
  function chonLv(k) { if (k !== lv[0]) hoi(function () { lv[1](k); v[1](''); ct[1](''); }); }
  function chonV(ma) { if (ma !== v[0]) hoi(function () { v[1](ma); ct[1](''); }); }
  function chuyen(ma) { var r = lvTim(ma); if (!r) return; lv[1](r.lv); v[1](ma); ct[1](''); }
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    cf[0] && host ? ReactDOM.createPortal(h(XnDoi, { illo: ['xemXet', 'alert'], title: 'Đổi loại việc?', desc: 'Đổi loại việc sẽ xóa các thông tin riêng theo loại việc đã nhập ở bước Nội dung đơn. Thông tin các bên vẫn được giữ.', onOk: function () { var f = cf[0].f; cf[1](null); f(); }, onCancel: function () { cf[1](null); } }), host) : null,
    h('section', { className: 'ph-s1-sec' }, Hd('Loại thủ tục', 1), PickRow('Loại thủ tục', THU_TUC, tt[0], chonTt),
      t ? h('div', { className: 'ph-s1-note', 'aria-live': 'polite' }, h('p', null, t.moTa), h('p', { className: 'ph-s1-note-law' }, t.luat)) : null),
    t ? h('section', { className: 'ph-s1-sec' }, Hd('Lĩnh vực', 1), PickRow('Lĩnh vực', LINH_VUC, lv[0], chonLv),
      l ? h('p', { className: 'ph-s1-law', 'aria-live': 'polite' }, h('b', null, l.dieu), ' · ' + l.so + ' loại việc') : null) : null,
    t && l ? h('section', { className: 'ph-s1-sec' }, Hd('Loại việc cụ thể', 1), h(CaseTypes, { lv: lv[0], v: v[0], onChange: chonV })) : null,
    t && l && pd ? h(PhanDinh, { v: v[0], tl: tl[0], onTl: tl[1], onChuyen: chuyen }) : null,
    t && l && ds ? h('section', { className: 'ph-s1-sec' }, Hd('Loại việc chi tiết', 1), h(LvChiTiet, { ds: ds, v: ct[0], onChange: ct[1] })) : null);
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
      h('div', { className: 'ph-draft-btns' }, h(T.Button, { block: true }, 'Khai báo người đại diện'), h(T.Button, { block: true, variant: 'tonal', 'data-pt-go': 'replace:draftAsk' }, 'Bỏ qua') /* v324: Bỏ qua → hiện tiếp hộp đơn soạn dở, đi tiếp luồng nộp đơn */))));
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
  var st = React.useState(p.ro ? (p.v || 'nam') : null), nm = React.useRef('ph-g' + (++rid));
  return h('div', { className: 'ph-gender', role: 'radiogroup', 'aria-label': 'Giới tính' }, [['nam', 'Nam'], ['nu', 'Nữ'], ['khac', 'Khác']].map(function (g) {
    return h(Radio, { key: g[0], name: nm.current, label: g[1], checked: st[0] === g[0], disabled: !!p.ro, onChange: function () { st[1](g[0]); } });
  }));
}
/* "Có người đại diện theo ủy quyền" (radio, bấm lại để bỏ chọn). Chọn thì hiện nút "+ Thêm người đại diện" mở bảng từ đáy Thêm người đại diện (theo web, 02/11/2026); lưu xong hiện thẻ người đại diện + nút Xóa */
function useHost(ref) { var hs = React.useState(null); React.useEffect(function () { hs[1](ref.current && ref.current.closest('.ph')); }, []); return hs[0]; }
/* thẻ tóm tắt thu gọn (chọn 02/11/2026): số thứ tự tròn đỏ, tên, dòng phụ; chạm để mở/thu gọn phần chi tiết; nút thùng rác → popup xác nhận xóa */
function Sum(p) {
  var op = React.useState(!!p.open), me = React.useRef(null);
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
  return h('div', { ref: me, className: 'dm-sum' + (op[0] ? ' dm-sum-open' : '') },
    h('div', { className: 'dm-sum-head' },
      h('button', { type: 'button', className: 'dm-sum-hit', 'aria-expanded': op[0], onClick: function () { op[1](!op[0]); } },
        p.lbl ? null : h('span', { className: 'dm-sum-no' }, p.no),
        p.lbl ? h('span', { className: 'dm-sum-tx' }, h('b', null, p.lbl)) : h('span', { className: 'dm-sum-tx' }, h('b', null, p.ten), h('small', null, p.sub), p.sub2 ? h('small', null, p.sub2) : null),
        h(T.Icon, { name: 'chevronDown', className: 'dm-sum-chev' })),
      p.onDel ? h('button', { type: 'button', className: 'dm-del', 'aria-label': 'Xóa ' + (p.lbl || p.ten), onClick: p.onDel }, h(T.Icon, { name: 'trash' })) : null),
    op[0] ? h('div', { className: 'dm-sum-body' }, p.children) : null);
}
/* popup xác nhận xóa (chọn 02/11/2026): icon thùng rác, "Xóa người …?", "<Tên> sẽ bị xóa khỏi danh sách …", Hủy / Xóa */
function ConfirmDel(p) {
  return h('div', { className: 'tp-dlg-wrap tp-dlg-inline dm-cf' }, h('div', { className: 'ph-scrim', onClick: p.onNo }),
    h('div', { className: 'dm-cf-box', role: 'alertdialog', 'aria-modal': 'true', 'aria-labelledby': 'dm-cf-t' },
      p.illo ? IlloBadge(p.illo) : h('span', { className: 'dm-cf-ic' + (p.tone ? ' dm-cf-ic-' + p.tone : ''), 'aria-hidden': 'true' }, h(T.Icon, { name: p.icon || 'trash' })),
      h('p', { id: 'dm-cf-t', className: 'dm-cf-t' }, p.title),
      h('p', { className: 'dm-cf-d' }, p.desc), p.extra || null,
      h('div', { className: 'dm-cf-btns' }, h(T.Button, { variant: 'tonal', onClick: p.onNo }, 'Hủy'), h(T.Button, { onClick: p.onYes, 'data-pt-go': p.go }, p.yes || 'Xóa'))));
}
function Proxy(pp) {
  pp = pp || {};
  var st = React.useState(false), open = React.useState(false), list = React.useState([]), cf = React.useState(null), seq = React.useRef(0), anchor = React.useRef(null), host = useHost(anchor);
  function save(v) { seq.current += 1; list[1](list[0].concat([Object.assign({ k: seq.current }, v)])); open[1](false); }
  return h('div', { className: 'ph-rep' }, h('span', { ref: anchor, hidden: true }),
    h(Radio, { label: pp.label || 'Có người đại diện theo ủy quyền', checked: st[0], onClick: function () { st[1](!st[0]); } }),
    st[0] && pp.phapLuat ? h('section', { className: 'nd-box' }, pp.phapLuat) : null,
    st[0] ? h(pp.phapLuat ? 'section' : F, pp.phapLuat ? { className: 'nd-box' } : null, pp.phapLuat ? h('h3', null, 'Người đại diện theo ủy quyền') : null,
      list[0].length ? h('p', { className: 'dm-meta' }, list[0].length + ' người đại diện') : null,
      list[0].map(function (r, i) {
        var han = 'Thời hạn: từ ' + r.tu + (r.den ? ' đến ' + r.den : ' đến khi kết thúc vụ án');
        return h(Sum, { key: r.k, flat: true, ten: r.ten, sub: r.dong1, sub2: han, onDel: function () { cf[1](r); } });
      }),
      h(T.Button, { variant: 'tint', block: true, icon: 'plus', className: 'ph-rep-add', onClick: function () { open[1](true); } }, 'Thêm người đại diện')) : null,
    open[0] && host ? ReactDOM.createPortal(h(RepSheet, { onClose: function () { open[1](false); }, onSave: save }), host) : null,
    cf[0] && host ? ReactDOM.createPortal(h(ConfirmDel, { title: 'Xóa người đại diện?', desc: cf[0].ten + ' sẽ bị xóa khỏi danh sách người đại diện theo ủy quyền',
      onNo: function () { cf[1](null); }, onYes: function () { list[1](list[0].filter(function (x) { return x.k !== cf[0].k; })); cf[1](null); } }), host) : null);
}
/* bảng Thêm người đại diện: bước 1 nhập và xác minh (Cá nhân: Số định danh/Số CCCD, Họ và tên, Ngày sinh; Tổ chức: Tên tổ chức/doanh nghiệp, Mã số thuế/MSDN) → Xác minh → thẻ thông tin đã xác minh + báo thành công → bước 2 bổ sung thông tin đại diện → Lưu */
/* kho dữ liệu cá nhân (theo ảnh web 02/11/2026): tệp mẫu */
var KHO = [{ id: 'k1', ten: 'vn-11134207-820l4-mesft1tpvhmo8c', tep: 'vn-11134207-820l4-mesft1tpvhmo8c.jpg', loai: 'Tài liệu khác', kt: '118.8 KB', dang: 'JPG', nguon: 'Tải từ thiết bị', ngay: '28-10-2026' }];
/* kho mẫu 24 tệp để xem phân trang (phương án A, chọn 02/11/2026); tên, ngày, nguồn là dữ liệu mẫu. Thẻ tệp: tên tài liệu / loại văn bản · ngày / Nguồn */
(function () { var L = ['Giấy ủy quyền', 'Hợp đồng ủy quyền', 'Căn cước công dân', 'Tài liệu khác'], N = ['giay-uy-quyen', 'hop-dong-uy-quyen', 'cccd-mat-truoc', 'tai-lieu'], D = ['PDF', 'PDF', 'JPG', 'PNG'];
  for (var i = 1; i < 24; i++) KHO.push({ id: 'k' + (i + 1), ten: N[i % 4] + '-' + (24 - i), tep: N[i % 4] + '-' + (24 - i) + '.' + D[i % 4].toLowerCase(), loai: L[i % 4], kt: (80 + i * 37 % 900) + ' KB', dang: D[i % 4], nguon: i % 3 === 1 ? 'Quyết định thông báo từ tòa' : 'Tải từ thiết bị', ngay: (28 - (i % 28)) + '-' + (i < 12 ? '10' : '09') + '-2026' }); })();
/* thẻ tài liệu đã chọn: dấu tích xanh, ô tên tài liệu (sửa được), tên tệp xanh, Loại tài liệu*, nút Xem / Thay tệp (Tải từ thiết bị, Lấy từ kho) / Xóa */
function DocCard(p) {
  var menu = React.useState(false);
  return h('div', { className: 'ph-doc' },
    h('span', { className: 'ph-doc-ok', 'aria-hidden': 'true' }, h(T.Icon, { name: 'check' })),
    h('div', { className: 'ph-doc-main' },
      p.noName ? h('p', { className: 'ph-doc-file ph-doc-file1' }, p.doc.tep) : h(T.TextField, { label: 'Tên tài liệu', required: !!p.reqName, className: 'ph-doc-name', defaultValue: p.doc.ten }),
      p.noName ? null : h('p', { className: 'ph-doc-file' }, p.doc.tep),
      Sf('Loại tài liệu', { required: true }),
      h('div', { className: 'ph-doc-act' },
        h(T.Button, { variant: 'ghost', size: 'sm', icon: 'eye' }, 'Xem'),
        h('div', { className: 'ph-doc-menu' },
          h('button', { type: 'button', className: 'ph-doc-swap', 'aria-expanded': menu[0], onClick: function () { menu[1](!menu[0]); } }, 'Thay tệp', h(T.Icon, { name: 'chevronDown' })),
          null),
        h('button', { type: 'button', className: 'ph-doc-del', 'aria-label': 'Xóa tài liệu', onClick: p.onDel }, h(T.Icon, { name: 'trash' }))),
      menu[0] ? h('ul', { className: 'tp-listbox ph-doc-list', role: 'menu' },
        h('li', { role: 'menuitem', onClick: function () { menu[1](false); p.onDevice(); } }, 'Tải từ thiết bị'),
        p.onLib ? h('li', { role: 'menuitem', onClick: function () { menu[1](false); p.onLib(); } }, 'Lấy từ kho dữ liệu cá nhân') : null) : null));
}
/* bảng "Chọn tệp từ kho dữ liệu cá nhân" (chồng lên bảng Thêm người đại diện): tìm, 3 bộ lọc, danh sách tệp có ô đánh dấu + Xem; > 10 tệp thì phân trang 10 tệp/trang (phương án A, 02/11/2026); Hủy / Chọn tệp (n) – khóa khi chưa chọn */
function LibSheet(p) {
  var sel = React.useState(null), q = React.useState(''), pg = React.useState(1), body = React.useRef(null), PER = 10;
  var kq = khongDau(q[0].trim()), all = KHO.filter(function (f) { return !kq || khongDau(f.ten + ' ' + f.tep).indexOf(kq) >= 0; });
  var pages = Math.max(1, Math.ceil(all.length / PER)), cur = Math.min(pg[0], pages), list = all.slice((cur - 1) * PER, cur * PER);
  function go(n) { pg[1](n); if (body.current) body.current.scrollTop = 0; }
  return h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-co-sheet ph-rep-sheet ph-lib-sheet' }, h('div', { className: 'ph-scrim', onClick: p.onClose }),
    h('div', { className: 'tp-dlg tp-dlg-sheet', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'ph-lib-t' },
      h('span', { className: 'ph-grab', 'aria-hidden': 'true' }),
      h('div', { className: 'tp-dlg-head' }, h('h3', { id: 'ph-lib-t' }, 'Chọn tệp từ kho dữ liệu cá nhân'), h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Đóng', onClick: p.onClose }, h(T.Icon, { name: 'x' }))),
      h('p', { className: 'tp-dlg-desc' }, 'Chỉ chọn được tệp PDF, PNG, JPG tối đa 10MB.'),
      h('div', { className: 'tp-dlg-body ph-rep-body', ref: body },
        h('div', { className: 'fx-search' }, Tf('Tìm tệp', { icon: 'search', placeholder: 'Tìm theo tên tài liệu, tên tệp...', value: q[0], onChange: function (e) { q[1](e.target.value); pg[1](1); }, onClear: function () { q[1](''); pg[1](1); } })),
        h('div', { className: 'ph-lib-filt' }, ['Tất cả loại tài liệu', 'Mọi lần gắn kèm'].map(function (t) { return h(T.SelectField, { key: t, label: t, value: t }); })),
        list.length ? h('ul', { className: 'ph-lib-list' }, list.map(function (f) {
          var on = sel[0] === f.id;
          return h('li', { key: f.id, className: 'ph-lib-it' + (on ? ' ph-lib-on' : '') },
            h(T.Checkbox, { 'aria-label': 'Chọn ' + f.ten, checked: on, onChange: function () { sel[1](on ? null : f.id); } }),
            h('div', { className: 'ph-lib-tx' }, h('p', { className: 'ph-lib-n' }, f.ten), h('p', null, f.loai + ' · ' + f.ngay.replace(/-/g, '/')), h('p', null, 'Nguồn: ', h('b', null, f.nguon)),
              p.chosen && p.chosen.id === f.id ? h('p', null, 'Đã chọn cho người đại diện này') : null),
            h(T.Button, { variant: 'secondary', size: 'sm', icon: 'eye', className: 'ph-lib-view', 'aria-label': 'Xem ' + f.ten }));
        })) : h('p', { className: 'ph-lv-empty' }, 'Không có tệp khớp «' + q[0] + '».'),
        h('div', { className: 'ph-lib-pg' }, h('span', null, all.length ? ((cur - 1) * PER + 1) + '–' + ((cur - 1) * PER + list.length) + ' / ' + all.length : '0 / 0'),
          h('span', { className: 'ph-lib-pgr' }, h('button', { type: 'button', className: 'tp-icon-btn', disabled: cur <= 1, 'aria-label': 'Trang trước', onClick: function () { go(cur - 1); } }, h(T.Icon, { name: 'chevronLeft' })), cur + ' / ' + pages,
            h('button', { type: 'button', className: 'tp-icon-btn', disabled: cur >= pages, 'aria-label': 'Trang sau', onClick: function () { go(cur + 1); } }, h(T.Icon, { name: 'chevronRight' }))))),
      h('div', { className: 'tp-dlg-foot' }, h(T.Button, { variant: 'tonal', onClick: p.onClose }, 'Hủy'),
        h(T.Button, { disabled: !sel[0], onClick: function () { p.onPick(KHO.filter(function (f) { return f.id === sel[0]; })[0]); } }, sel[0] ? 'Chọn tệp (1)' : 'Chọn tệp'))));
}
function RepSheet(p) {
  var loai = React.useState('cn'), ok = React.useState(false), v = React.useState({});
  var cn = loai[0] === 'cn', doc = React.useState(null), lib = React.useState(false);
  function pickDevice() { doc[1](Object.assign({ nguon: 'Tải từ thiết bị' }, KHO[0])); }
  function set(k) { return function (e) { var o = Object.assign({}, v[0]); o[k] = e.target.value; v[1](o); }; }
  function val(k, d) { return (v[0][k] || '').trim() || d; }
  var ten = cn ? val('ten', 'Nguyễn Văn B') : val('ten', 'Công ty TNHH An Phú');
  var so = cn ? val('so', '000000000002') : val('so', '0101234567');
  var ns = val('ns', '01/01/2000');
  function save() { p.onSave({ ten: ten, dong1: cn ? 'Số định danh/Số CCCD: ' + so : 'Mã số thuế/MSDN: ' + so, tu: val('tu', '02/11/2026'), den: val('den', '') }); }
  var Thoi = h(F, null,
    TwoE(Tf('Thời hạn từ', Dt({ required: true, defaultValue: '02/11/2026', onChange: set('tu') })), Tf('Thời hạn đến', Dt({ onChange: set('den') }))),
    P('Để trống thời hạn đến nếu ủy quyền tới thời gian kết thúc vụ án', 'ph-muted fx-help'),
    h('div', { className: 'ph-gender-f' }, Lbl('Tài liệu minh chứng quyền đại diện', 1),
      doc[0] ? h(DocCard, { doc: doc[0], onDel: function () { doc[1](null); }, onDevice: pickDevice, onLib: function () { lib[1](true); } }) : h(F, null,
        /* phương án C dạng 2 ô vuông 1 hàng, không mũi tên (chọn 02/11/2026): ô biểu tượng đỏ nhạt, tiêu đề, mô tả */
        h('div', { className: 'ph-up2 ph-up3' },
          h('button', { type: 'button', className: 'ph-up2-it', onClick: pickDevice }, h('span', { className: 'ph-up3-ic' }, h(T.Icon, { name: 'upload' })), h('b', null, 'Tải lên từ thiết bị')),
          h('button', { type: 'button', className: 'ph-up2-it', onClick: function () { lib[1](true); } }, h('span', { className: 'ph-up3-ic' }, h(T.Icon, { name: 'folder' })), h('b', null, 'Từ kho dữ liệu'))),
        P('Định dạng PDF, PNG, JPG, Tối đa 10MB/tệp', 'ph-muted fx-help ph-up2-hint'))));
  var step1 = ok[0]
    ? h(F, null,
        h('div', { className: 'ph-rep-ok-card' }, h('div', { className: 'ph-rep-ok-top' }, h('p', { className: 'ph-rep-n' }, ten), h(T.StatusBadge, { tone: 'success' }, 'Đã xác minh')),
          cn ? h(F, null, h('p', null, 'Số định danh/Số CCCD: ' + so), h('p', null, 'Ngày, tháng, năm sinh: ' + ns)) : h('p', null, 'Mã số thuế/MSDN: ' + so)))
    : cn ? h(F, null,
        h(T.TextField, { label: 'Số định danh/Số CCCD', required: true, inputMode: 'numeric', placeholder: '12 số', onChange: set('so') }),
        TwoE(Tf('Họ và tên', { required: true, onChange: set('ten') }), Tf('Ngày, tháng, năm sinh', Dt({ required: true, onChange: set('ns') }))))
      : TwoE(Tf('Tên tổ chức/doanh nghiệp', { required: true, onChange: set('ten') }), h(T.TextField, { label: 'Mã số thuế/MSDN', required: true, inputMode: 'numeric', placeholder: '10 số, 13 số, hoặc 10 số-3 số', onChange: set('so') }));
  var step2 = !ok[0] ? null : cn
    ? h(F, null, h('h4', { className: 'ph-rep-h' }, '2. Bổ sung thông tin đại diện'),
        h('div', { className: 'ph-gender-f' }, Lbl('Giới tính', 1), h(Gender, {})), Thoi)
    : h(F, null, h('h4', { className: 'ph-rep-h' }, '2. Bổ sung thông tin đại diện'),
        AddrG('Địa chỉ trụ sở', true, 'short'),
        TwoE(Tf('Số điện thoại tổ chức', { required: true, type: 'tel' }), Tf('Địa chỉ thư điện tử', { type: 'email', placeholder: 'email@vidu.vn' })),
        Thoi);
  return h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-co-sheet ph-rep-sheet' }, h('div', { className: 'ph-scrim', onClick: p.onClose }),
    h('div', { className: 'tp-dlg tp-dlg-sheet', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'ph-rep-t' },
      h('span', { className: 'ph-grab', 'aria-hidden': 'true' }),
      h('div', { className: 'tp-dlg-head' }, h('h3', { id: 'ph-rep-t' }, 'Thêm người đại diện'), h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Đóng', onClick: p.onClose }, h(T.Icon, { name: 'x' }))),
      h('div', { className: 'tp-dlg-body ph-rep-body' },
        h('div', { className: 'ph-gender-f' }, Lbl('Đối tượng', 1), h('div', { className: 'ph-gender', role: 'radiogroup', 'aria-label': 'Đối tượng' }, [['cn', 'Cá nhân'], ['tc', 'Tổ chức']].map(function (o) {
          return h(Radio, { key: o[0], name: 'ph-rep-loai', label: o[1], checked: loai[0] === o[0], disabled: ok[0] && loai[0] !== o[0], onChange: function () { loai[1](o[0]); v[1]({}); } });
        }))),
        h('h4', { className: 'ph-rep-h' }, cn ? '1. Nhập và xác minh thông tin công dân' : '1. Nhập và xác minh thông tin tổ chức'),
        h(F, { key: loai[0] }, step1), step2),
      h('div', { className: 'tp-dlg-foot' }, h(T.Button, { variant: 'tonal', onClick: p.onClose }, 'Hủy'),
        ok[0] ? h(T.Button, { onClick: save }, 'Lưu') : h(T.Button, { onClick: function () { ok[1](true); } }, 'Xác minh'))),
    lib[0] ? h(LibSheet, { chosen: doc[0], onClose: function () { lib[1](false); }, onPick: function (f) { doc[1](f); lib[1](false); } }) : null);
}
function TwoE(a, b) { return h('div', { className: 'fx-2 fx-2-end' }, a, b); }
/* thứ tự trường đúng như web; ghép 2 cột theo yêu cầu 02/11/2026: Họ tên + SĐT, CCCD + Ngày cấp, Ngày sinh + Quốc tịch, Tỉnh + Phường/Xã của mỗi loại địa chỉ */
/* dữ liệu mẫu người khởi kiện; người đồng khởi kiện dùng CO_MAU (dữ liệu giả lập tra cứu theo Số CCCD/MST) – 02/11/2026: thông tin, thứ tự, trạng thái mở/khóa trường y như người khởi kiện */
var ME_MAU = { ten: 'Hoàng Dương', sdt: '0912345678', so: '001090012345', ns: '12/08/1990', qt: 'Việt Nam', tinh: 'Thành phố Hà Nội', xa: 'Phường Từ Liêm', ct: 'Số 8 Phạm Hùng', email: 'nguyen.minh.an@example.com', nc: '20/05/2021', noi: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội', gt: 'nam' };
var CO_MAU = [
  { ten: 'Trần Thị C', sdt: '0987654321', so: '001190000003', ns: '05/03/1992', qt: 'Việt Nam', tinh: 'Thành phố Hà Nội', xa: 'Phường Cầu Giấy', ct: 'Số 12 Trần Thái Tông', email: 'tran.thi.c@example.com', nc: '15/07/2021', noi: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội', gt: 'nu' },
  { ten: 'Lê Văn D', sdt: '0903111222', so: '001085000004', ns: '21/11/1985', qt: 'Việt Nam', tinh: 'Thành phố Hà Nội', xa: 'Phường Hoàn Kiếm', ct: 'Số 3 Hàng Bài', email: 'le.van.d@example.com', nc: '02/02/2022', noi: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội', gt: 'nam' }];
/* 03/11/2026: Cá nhân | Tổ chức đổi được bộ trường; Tổ chức theo web (plDescs nhánh tổ chức): Tên tổ chức / doanh nghiệp*, Mã số thuế / MSDN*, Địa chỉ trụ sở* (khóa – lấy từ tài khoản / tra cứu MST) + "Có người đại diện hợp pháp" (người đại diện theo pháp luật chọn từ danh mục – phương án C, và theo ủy quyền) */
function PersonForm(ro, pre, dat) { return h(PersonBody, { ro: ro, pre: pre, dat: dat }); }
var ORG_MAU = { ten: 'Công ty ABC', so: '0101234567', tinh: 'Thành phố Hà Nội', xa: 'Phường Láng', ct: 'Số 25 Láng Hạ' }; /* v333: = tổ chức đăng nhập (ACC_TC) */
var ORG_CO_MAU = { ten: 'Công ty Cổ phần Xây dựng Minh Long', so: '0109876543', tinh: 'Thành phố Hà Nội', xa: 'Phường Đống Đa', ct: 'Số 102 Tây Sơn' };
/* danh mục người đại diện theo pháp luật còn hiệu lực của tổ chức – dữ liệu mẫu */
var NDPL = [{ id: 'a', ten: 'Trần Văn Minh', so: '001080000011', cv: 'Giám đốc' }, { id: 'b', ten: 'Lê Thị Hương', so: '001085000022', cv: 'Phó Giám đốc' }, { id: 'c', ten: 'Phạm Quốc Bảo', so: '001090000033', cv: 'Kế toán trưởng' }];
/* Người đại diện theo pháp luật (phương án C, chọn 03/11/2026; chỉnh 03/11/2026): thẻ người đã chọn (tên, CCCD · chức vụ, nút xóa) + nút "+ Thêm người đại diện theo pháp luật" → bảng từ đáy chọn NHIỀU người (chỉ người chưa chọn; chạm dòng để đánh dấu/bỏ, dấu tích bên phải), đáy Hủy | "Thêm (n)". Không bắt buộc */
function PhapLuatPick() {
  var sel = React.useState([]), o = React.useState(false), tmp = React.useState([]), anchor = React.useRef(null), host = useHost(anchor);
  var con = NDPL.filter(function (x) { return sel[0].indexOf(x.id) < 0; });
  function tg(id) { tmp[1](tmp[0].indexOf(id) >= 0 ? tmp[0].filter(function (y) { return y !== id; }) : tmp[0].concat([id])); }
  return h('div', { className: 'nd-grp' }, h('span', { ref: anchor, hidden: true }), Lbl('Người đại diện theo pháp luật'),
    sel[0].length ? h('p', { className: 'dm-meta' }, sel[0].length + ' người đại diện') : null,
    sel[0].length ? h('ul', { className: 'nd-chosen' }, sel[0].map(function (id) { var x = NDPL.filter(function (y) { return y.id === id; })[0];
      return h('li', { key: id }, h('span', { className: 'nd-tx' }, h('b', null, x.ten), h('small', null, 'CCCD ' + x.so + ' · ' + x.cv)),
        h('button', { type: 'button', className: 'dm-del', 'aria-label': 'Bỏ chọn ' + x.ten, onClick: function () { sel[1](sel[0].filter(function (y) { return y !== id; })); } }, h(T.Icon, { name: 'trash' }))); })) : null,
    con.length ? h(T.Button, { variant: 'tint', icon: 'plus', className: 'ph-co-add', onClick: function () { tmp[1]([]); o[1](true); } }, 'Thêm người đại diện theo pháp luật') : null,
    o[0] && host ? h(LvSheet, { host: host, title: 'Thêm người đại diện theo pháp luật', onClose: function () { o[1](false); },
      foot: h(F, null, h(T.Button, { variant: 'secondary', onClick: function () { o[1](false); } }, 'Hủy'), h(T.Button, { disabled: !tmp[0].length, onClick: function () { sel[1](sel[0].concat(tmp[0])); o[1](false); } }, 'Thêm' + (tmp[0].length ? ' (' + tmp[0].length + ')' : ''))) },
      h('p', { className: 'dm-meta nd-hint' }, 'Chọn một hoặc nhiều người trong danh sách người đại diện còn hiệu lực của tổ chức.'),
      h('ul', { className: 'ph-lvr', role: 'listbox', 'aria-multiselectable': 'true', 'aria-label': 'Người đại diện theo pháp luật' }, con.map(function (x) { var on = tmp[0].indexOf(x.id) >= 0;
        return h('li', { key: x.id }, h('button', { type: 'button', role: 'option', 'aria-selected': on, className: 'ph-lvr-it' + (on ? ' ph-lvr-on' : ''), onClick: function () { tg(x.id); } },
          h('span', { className: 'ph-lvr-tx' }, h('span', { className: 'ph-lvr-t' }, x.ten), h('span', { className: 'ph-lvr-d' }, 'CCCD ' + x.so + ' · ' + x.cv)),
          h('span', { className: 'ph-lvr-ck', 'aria-hidden': 'true' }, on ? h(T.Icon, { name: 'check' }) : null))); }))) : null);
}
function PersonBody(pp) {
  var ro = pp.ro, pre = pp.pre, dat = pp.dat;
  var d = ro ? (dat || ME_MAU) : null, co = !!dat;
  var kind = React.useState((pre && pre.loai) || (ro && !co && laTC() ? 'tc' : 'cn')); /* v333 */
  var seg = h(T.SegmentedControl, { label: ro && !co ? 'Loại người khởi kiện' : 'Loại người đồng khởi kiện', value: kind[0], onChange: kind[1], options: [{ value: 'cn', label: 'Cá nhân' }, { value: 'tc', label: 'Tổ chức' }] });
  if (kind[0] === 'tc') {
    var o = co ? Object.assign({}, ORG_CO_MAU, pre && pre.so ? { so: pre.so } : {}) : ORG_MAU, khoa = !!ro;
    return h(F, null, seg, h(F, { key: 'tc' },
      khoa ? Ro('Tên tổ chức / doanh nghiệp', o.ten, { required: true }) : Tf('Tên tổ chức / doanh nghiệp', { required: true, placeholder: 'Tên tổ chức / doanh nghiệp' }),
      khoa ? Ro('Mã số thuế / MSDN', o.so, { required: true }) : Tf('Mã số thuế / MSDN', { required: true, placeholder: '10 số, 13 số', defaultValue: pre && pre.so }),
      AddrG('Địa chỉ trụ sở', true, 'short', khoa ? [o.tinh, o.xa, o.ct] : null, khoa),
      h('hr', { className: 'ph-hr' }),
      h(Proxy, { label: 'Có người đại diện hợp pháp (Đại diện theo ủy quyền và đại diện theo pháp luật)', phapLuat: h(PhapLuatPick) })));
  }
  var me = d ? [d.ten, d.sdt, d.so, d.ns, d.qt, d.tinh, d.xa, d.ct] : null;
  function T1(l, i, o) { return ro ? Ro(l, me[i], o) : Tf(l, o); }
  function S1(l, i, o) { return ro ? RoSel(l, me[i], o) : Sf(l, Object.assign({ placeholder: 'Chọn' }, o || {})); }
  return h(F, null, seg,
    TwoE(T1('Họ và tên', 0, { required: true }), T1('Số điện thoại', 1, { required: true, type: 'tel' })),
    Tf('Địa chỉ thư điện tử', { type: 'email', defaultValue: ro ? d.email : undefined }),
    TwoE(T1('Số CCCD', 2, ro ? { required: true } : { required: true, defaultValue: pre && pre.so }), Tf('Ngày cấp', Dt({ defaultValue: ro ? d.nc : undefined }))),
    Tf('Nơi cấp', { defaultValue: ro ? d.noi : undefined }),
    TwoE(T1('Ngày, tháng, năm sinh', 3, ro ? { required: true, icon: 'calendar' } : Dt({ required: true })), S1('Quốc tịch', 4, { required: true })),
    h('div', { className: 'ph-gender-f' }, Lbl('Giới tính', 1), h(Gender, { ro: ro, v: d && d.gt })),
    AddrG('Địa chỉ thường trú', true, 'short', ro ? [d.tinh, d.xa, d.ct] : null, ro),
    AddrG('Địa chỉ hiện tại', true, 'short', ro ? [d.tinh, d.xa] : null),
    AddrG('Địa chỉ tạm trú', false, 'short'),
    Tf('Nghề nghiệp', { placeholder: '(nếu có)' }),
    Tf('Nơi làm việc', { placeholder: '(nếu có)' }),
    h('hr', { className: 'ph-hr' }),
    h(Proxy));
}
/* bảng từ đáy "Thêm người khởi kiện" (theo web, 02/11/2026): chọn Đối tượng (radio Cá nhân/Tổ chức) → nhập Số CCCD (12 số) hoặc Mã số thuế; Đồng ý thêm người đồng khởi kiện vào danh sách. Vẽ vào khung điện thoại (.ph) bằng portal; nền mờ riêng để không bị khung prototype hiểu là "quay lại" */
function CoSheet(p) {
  var loai = React.useState('cn'), so = React.useState(''), err = React.useState(null);
  var cn = loai[0] === 'cn';
  /* prototype: không kiểm tra bắt buộc nhập (02/11/2026), chỉ giữ dấu * */
  function ok() { p.onOk({ loai: loai[0], so: so[0].trim() }); }
  return h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-co-sheet' }, h('div', { className: 'ph-scrim', onClick: p.onClose }),
    h('div', { className: 'tp-dlg tp-dlg-sheet', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'ph-co-t' },
      h('div', { className: 'tp-dlg-head' }, h('h3', { id: 'ph-co-t' }, 'Thêm người khởi kiện'), h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Đóng', onClick: p.onClose }, h(T.Icon, { name: 'x' }))),
      h('div', { className: 'tp-dlg-body' },
        h('div', { className: 'ph-gender-f' }, Lbl('Đối tượng', 1), h('div', { className: 'ph-gender', role: 'radiogroup', 'aria-label': 'Đối tượng' }, [['cn', 'Cá nhân'], ['tc', 'Tổ chức']].map(function (o) { return h(Radio, { key: o[0], name: 'ph-co-loai', label: o[1], checked: loai[0] === o[0], onChange: function () { loai[1](o[0]); so[1](''); err[1](null); } }); }))),
        h(T.TextField, { key: loai[0], label: cn ? 'Số CCCD' : 'Mã số thuế', required: true, inputMode: 'numeric', placeholder: cn ? '12 số' : '10 số hoặc 10 số đầu - 3 số cuối', value: so[0], error: err[0] || undefined, onChange: function (e) { so[1](e.target.value); err[1](null); } })),
      h('div', { className: 'tp-dlg-foot' }, h(T.Button, { variant: 'tonal', onClick: p.onClose }, 'Hủy'), h(T.Button, { icon: 'search', onClick: ok }, 'Đồng ý'))));
}
function CoList(p) {
  p = p || {};
  var st = React.useState(p.init || []), seq = React.useRef(p.init ? p.init.length : 0), open = React.useState(false), cf = React.useState(null), anchor = React.useRef(null), host = useHost(anchor);
  function add(v) { seq.current += 1; st[1](st[0].concat([{ k: seq.current, v: v, isNew: true }])); open[1](false); }
  return h(F, null,
    h('span', { ref: anchor, hidden: true }),
    p.chinh ? h('p', { className: 'dm-meta' }, (st[0].length + 1) + ' người khởi kiện') : st[0].length ? h('p', { className: 'dm-meta' }, st[0].length + ' người đồng khởi kiện') : null,
    /* 03/11/2026 (chinh): danh sách người khởi kiện kiểu bước 3 – thẻ "Người khởi kiện 1" là người đăng nhập, mở sẵn, không xóa; người thêm qua bảng tra CCCD/MST là "Người khởi kiện 2, 3…" */
    p.chinh ? h(Sum, { key: 'chinh', open: true, cuon: false, lbl: 'Người khởi kiện 1', ten: 'Người khởi kiện 1' }, PersonForm(true)) : null,
    st[0].map(function (x, i) {
      if (p.chinh) { var dc = Object.assign({}, x.v.loai === 'tc' ? ORG_CO_MAU : CO_MAU[(x.k - 1) % CO_MAU.length]); if (x.v.so) dc.so = x.v.so; var lb = 'Người khởi kiện ' + (i + 2);
        return h(Sum, { key: x.k, open: x.isNew, lbl: lb, ten: lb, onDel: function () { cf[1]({ k: x.k, ten: lb }); } }, PersonForm(true, x.v, dc)); }
      if (p.legacy) { var ten0 = x.v.ten || '[Họ và tên]'; return h(Sum, { key: x.k, open: x.isNew, no: i + 1, ten: ten0, sub: (x.v.loai === 'tc' ? 'Mã số thuế: ' : 'Số CCCD: ') + (x.v.so || '[số]'), onDel: function () { cf[1]({ k: x.k, ten: ten0 }); } }, PersonForm(false, x.v)); }
      var d = Object.assign({}, x.v.loai === 'tc' ? ORG_CO_MAU : CO_MAU[(x.k - 1) % CO_MAU.length]); if (x.v.so) d.so = x.v.so;
      var ten = d.ten;
      return h(Sum, { key: x.k, open: x.isNew, no: i + 1, ten: ten, sub: (x.v.loai === 'tc' ? 'Mã số thuế: ' : 'Số CCCD: ') + d.so, onDel: function () { cf[1]({ k: x.k, ten: ten }); } }, PersonForm(true, x.v, d));
    }),
    h(T.Button, { variant: 'tint', block: true, icon: 'plus', className: 'ph-co-add', onClick: function () { open[1](true); } }, 'Thêm người khởi kiện'),
    open[0] && host ? ReactDOM.createPortal(h(CoSheet, { onClose: function () { open[1](false); }, onOk: add }), host) : null,
    cf[0] && host ? ReactDOM.createPortal(h(ConfirmDel, { title: p.chinh ? 'Xóa người khởi kiện?' : 'Xóa người đồng khởi kiện?', desc: cf[0].ten + (p.chinh ? ' sẽ bị xóa khỏi danh sách người khởi kiện' : ' sẽ bị xóa khỏi danh sách người đồng khởi kiện'),
      onNo: function () { cf[1](null); }, onYes: function () { st[1](st[0].filter(function (y) { return y.k !== cf[0].k; })); cf[1](null); } }), host) : null);
}
function Sub2() {
  return Submit(2, h(F, null,
    FCard('Danh sách người khởi kiện', h(CoList, { chinh: true }), true),
    FCard('Danh sách người đồng khởi kiện', h(CoList), true)));
}
/* ===== Bước 3–7 làm lại theo web /nop-don-khoi-kien (steps/step-3…7.tsx, 02/11/2026) – áp quy tắc đã chốt ở bước 1, 2 ===== */
var KIND_TEN = { cn: 'Cá nhân', tc: 'Tổ chức' };
function KindSeg(label, v, set) { return h(T.SegmentedControl, { label: label, value: v, onChange: set, options: [{ value: 'cn', label: 'Cá nhân' }, { value: 'tc', label: 'Tổ chức' }] }); }
/* danh sách thẻ tóm tắt dùng chung bước 3: dòng đếm "n …", thẻ thu gọn (03/11/2026: chỉ nhãn vai trò + STT, ví dụ "Người bị kiện 1"; xóa có popup xác nhận), thêm mới → thẻ trống mở sẵn và cuộn tới (chọn 02/11/2026) */
function PartyList(p) {
  var st = React.useState(p.init.map(function (v, i) { return { k: i + 1, v: v, isNew: !!v.moi }; })), seq = React.useRef(p.init.length), cf = React.useState(null), anchor = React.useRef(null), host = useHost(anchor);
  function add() { seq.current += 1; st[1](st[0].concat([{ k: seq.current, v: {}, isNew: true }])); }
  return h(F, null, h('span', { ref: anchor, hidden: true }),
    st[0].length ? h('p', { className: 'dm-meta' }, st[0].length + ' ' + p.dem) : null,
    st[0].map(function (x, i) {
      var ten = x.v.ten || p.goi + ' ' + (i + 1);
      var xoa = p.giuMot && st[0].length < 2 ? null : function () { cf[1]({ k: x.k, ten: ten }); };
      return h(Sum, { key: x.k, open: x.isNew || !!x.v.mo, cuon: !!x.isNew, lbl: p.goi + ' ' + (i + 1), ten: ten, onDel: xoa }, p.form(x.v));
    }),
    h(T.Button, { variant: 'tint', block: true, icon: 'plus', className: 'ph-co-add', onClick: add }, p.them),
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
      h('input', { className: 'ph-gt-in', value: so[0], placeholder: g.ph, maxLength: g.max, inputMode: l[0] === 'HOCHIEU' ? 'text' : 'numeric', 'aria-label': 'Số ' + g.t,
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
function BiKienForm(p) {
  var v = p.v || {}, k = React.useState(v.loai || 'cn');
  return h(F, null, KindSeg('Loại người bị kiện', k[0], k[1]),
    k[0] === 'cn' ? h(F, null,
      TwoE(Tf('Họ và tên', { required: true, defaultValue: v.ten }), Tf('Số điện thoại', { type: 'tel' })),
      Tf('Địa chỉ thư điện tử', { type: 'email' }),
      h(SoGiayTo, { b3: true, init: v.gt }), TwoE(Tf('Ngày cấp', Dt()), Tf('Nơi cấp')),
      TwoE(Tf('Ngày, tháng, năm sinh', Dt()), Sf('Quốc tịch')),
      h('div', { className: 'ph-gender-f' }, Lbl('Giới tính'), h(Gender, {})),
      AddrG('Địa chỉ thường trú', true, 'short'), AddrG('Địa chỉ hiện tại', false, 'short'), AddrG('Địa chỉ tạm trú', false, 'short'),
      Tf('Nghề nghiệp', { placeholder: '(nếu có)' }), Tf('Nơi làm việc', { placeholder: '(nếu có)' }))
    : h(F, null,
      TwoE(Tf('Tên tổ chức', { required: true }), Tf('Mã số thuế', { placeholder: '(nếu có)' })),
      AddrG('Địa chỉ trụ sở', true, 'short'),
      TwoE(Tf('Số điện thoại', { type: 'tel' }), Tf('Địa chỉ thư điện tử', { type: 'email' }))),
    h('hr', { className: 'ph-hr' }), h(Proxy, { label: 'Có người đại diện hợp pháp' }));
}
/* người có quyền lợi, nghĩa vụ liên quan (web relDescs): như người bị kiện + "Mối quan hệ / Lý do liên quan" bắt buộc */
function LienQuanForm(p) {
  var k = React.useState('cn'), qh = Tf('Mối quan hệ / Lý do liên quan', { required: true, multiline: true });
  return h(F, null, KindSeg('Loại người liên quan', k[0], k[1]),
    k[0] === 'cn' ? h(F, null,
      TwoE(Tf('Họ và tên', { required: true }), Tf('Số điện thoại', { type: 'tel' })),
      Tf('Địa chỉ thư điện tử', { type: 'email' }),
      h(SoGiayTo, { b3: true }),
      TwoE(Sf('Quốc tịch'), Tf('Ngày, tháng, năm sinh', Dt())),
      AddrG('Địa chỉ thường trú', true, 'short'), AddrG('Địa chỉ hiện tại', false, 'short'), AddrG('Địa chỉ tạm trú', false, 'short'),
      qh, Tf('Nghề nghiệp', { placeholder: '(nếu có)' }), Tf('Nơi làm việc', { placeholder: '(nếu có)' }))
    : h(F, null,
      TwoE(Tf('Tên tổ chức', { required: true }), Tf('Mã số thuế', { placeholder: '(nếu là doanh nghiệp)' })),
      AddrG('Địa chỉ trụ sở', true, 'short'), qh),
    h('hr', { className: 'ph-hr' }), h(Proxy, { label: 'Có người đại diện hợp pháp' }));
}
function LamChungForm(p) {
  var v = p.v || {};
  return h(F, null, Tf('Họ và tên người làm chứng', { required: true, defaultValue: v.ten }),
    AddrG('Địa chỉ', true, 'short', v.tinh ? [v.tinh, v.xa] : null),
    Tf('Nội dung có thể làm chứng', { multiline: true }));
}
/* khối người liên quan: chọn Có/Không (bắt buộc, mặc định chưa chọn như web); Có → danh sách, có sẵn 1 thẻ trống mở */
function LienQuanBlock() {
  var co = React.useState(null), nm = React.useRef('ph-lq' + (++rid));
  return h(F, null,
    h('div', { className: 'ph-gender', role: 'radiogroup', 'aria-label': 'Có người có quyền lợi, nghĩa vụ liên quan' },
      h(Radio, { name: nm.current, label: 'Có', checked: co[0] === true, onChange: function () { co[1](true); } }),
      h(Radio, { name: nm.current, label: 'Không', checked: co[0] === false, onChange: function () { co[1](false); } })),
    co[0] ? h(PartyList, { init: [{ moi: true }], dem: 'người', goi: 'Người liên quan', tu: 'người có quyền lợi, nghĩa vụ liên quan', them: 'Thêm người liên quan',
      sub: function () { return 'Cá nhân'; }, form: function (v) { return h(LienQuanForm, { v: v }); } }) : null);
}
function Sub3(p) {
  return Submit(3, h(F, null,
    FCard('Danh sách người bị kiện', h(PartyList, { init: [{ ten: 'Trần Văn Bình', loai: 'cn', mo: true, gt: p && p.trung ? ME_MAU.so : undefined }], dem: 'người bị kiện', goi: 'Người bị kiện', tu: 'người bị kiện', them: 'Thêm người bị kiện', giuMot: true,
      sub: function (v) { return KIND_TEN[v.loai || 'cn']; }, form: function (v) { return h(BiKienForm, { v: v }); } }), true),
    FCard('Danh sách người có quyền lợi, nghĩa vụ liên quan', h(LienQuanBlock), true),
    FCard('Danh sách người làm chứng', h(PartyList, { init: [], dem: 'người', goi: 'Người làm chứng', tu: 'người làm chứng', them: 'Thêm người làm chứng',
      sub: function (v) { return v.xa ? v.xa + ', ' + v.tinh : ''; }, form: function (v) { return h(LamChungForm, { v: v }); } }), true)), h(NextB3));
}
function Sub3Trung() { return h(Sub3, { trung: true }); } /* v325: màn xem nhanh – người bị kiện trùng số giấy tờ người khởi kiện */
/* 2 ô tải tài liệu dùng chung (như bước 2): Tải lên từ thiết bị / Từ kho dữ liệu; một ô khi chỉ được tải từ thiết bị */
function UpTiles(onDev, onLib, sub) {
  return h('div', { className: 'ph-up2 ph-up3' + (onLib ? '' : ' ph-up1') },
    h('button', { type: 'button', className: 'ph-up2-it', onClick: onDev }, h('span', { className: 'ph-up3-ic' }, h(T.Icon, { name: 'upload' })), h('b', null, 'Tải lên từ thiết bị'), sub ? h('small', null, sub) : null),
    onLib ? h('button', { type: 'button', className: 'ph-up2-it', onClick: onLib }, h('span', { className: 'ph-up3-ic' }, h(T.Icon, { name: 'folder' })), h('b', null, 'Từ kho dữ liệu')) : null);
}
/* bước 4 – Nội dung (chọn 02/11/2026): Nhập thông tin = 1 ô nhập nhiều dòng cho cả bước; Tải đơn có sẵn = 1 tệp PDF/DOCX chỉ từ thiết bị, có Tên tài liệu* + Loại tài liệu* */
/* bước 4 – Tải đơn có sẵn (03/11/2026): chọn tệp → bảng từ đáy "Tài liệu đơn có sẵn" như bước 5 (dòng tệp + Thay tệp, Tên tài liệu*, Loại giấy tờ* → bảng chồng, Xóa | Hủy | Lưu); lưu xong hiện thẻ tài liệu như bước 5 (nút bút sửa) */
/* v324: web – đổi giữa "Nhập thông tin" và "Tải đơn có sẵn" khi cách đang dùng đã có nội dung → hộp "Đổi cách nhập nội dung đơn?"; Tiếp tục = đổi và xóa nội dung cách cũ, Hủy = giữ nguyên */
function NoiDungCard(p) {
  var mo = p && p.mo, m = React.useState('nhap'), doc = React.useState(null), nd = React.useState(mo ? 'Ngày 15/03/2025, tôi cho ông Trần Văn Bình vay 200.000.000 đồng…' : (p && p.nd0) || ND_ST.tt), cf = React.useState(mo ? 'file' : null), ed = React.useState(null), anchor = React.useRef(null), host = useHost(anchor);
  var TEP = 'don-khoi-kien-nguyen-minh-an.docx';
  function setD(o) { ed[1](Object.assign({}, ed[0], { d: Object.assign({}, ed[0].d, o) })); }
  return FCard('Nội dung đơn', h(F, null, h('span', { ref: anchor, hidden: true }),
    P(m[0] === 'file' ? 'Tải lên tệp đơn khởi kiện bạn đã tự soạn sẵn, thay cho việc nhập thông tin bên dưới.' : 'Trình bày diễn biến sự việc và yêu cầu cụ thể đề nghị Tòa án giải quyết.', 'ph-muted'),
    cf[0] && host ? ReactDOM.createPortal(h(XnDoi, { illo: ['banSao', 'alert'], title: 'Đổi cách nhập nội dung đơn?', desc: 'Một đơn chỉ dùng biểu mẫu điện tử HOẶC tệp đơn có sẵn, không dùng cả hai. Đổi cách nhập sẽ xóa nội dung đã nhập ở cách đang dùng.',
      onOk: function () { var k = cf[0]; cf[1](null); if (k === 'file') { nd[1](''); ND_ST.td = ''; ND_ST.tt = ''; ND_ST.cc = ''; YC_ST.rows = [{ nd: '', gt: '', mt: '' }]; } else doc[1](null); m[1](k); }, onCancel: function () { cf[1](null); } }), host) : null,
    h(T.SegmentedControl, { label: 'Cách nhập nội dung', value: m[0], onChange: function (k) { if (k === m[0]) return; var co = m[0] === 'nhap' ? !!nd[0].trim() : !!doc[0]; if (co) cf[1](k); else m[1](k); }, options: [{ value: 'nhap', label: 'Nhập thông tin' }, { value: 'file', label: 'Tải đơn có sẵn' }] }),
    m[0] === 'nhap' ? h(NoiDungTruong, { nd: nd[0], onNd: function (e) { nd[1](e.target.value); } })
      : h(F, null, doc[0] ? h('ul', { className: 'ph-tlr' }, h('li', null,
          h('span', { className: 'ph-up3-ic ph-tl-ic ph-tl-ok', 'aria-hidden': 'true' }, h(T.Icon, { name: 'check' })),
          h('span', { className: 'ph-tlr-tx' }, h('b', null, doc[0].ten), h('small', null, doc[0].tep + ' · ' + doc[0].loai)),
          h(T.Button, { variant: 'secondary', size: 'sm', icon: 'pen', className: 'ph-lib-view ph-tlr-edit', 'aria-label': 'Sửa ' + doc[0].ten, onClick: function () { ed[1]({ d: Object.assign({}, doc[0]) }); } })))
        : UpTiles(function () { ed[1]({ moi: true, d: { tep: TEP, ten: '', loai: '' } }); }, null, 'Chọn tệp đơn đã soạn sẵn trên thiết bị'),
        P('Định dạng PDF, DOCX · tối đa 10MB/tệp.', 'ph-muted fx-help ph-up2-hint')),
    ed[0] && host ? ReactDOM.createPortal(h(TLSheet, { title: 'Tài liệu đơn có sẵn', r: { bat: false, tep: ed[0].moi ? null : doc[0] && doc[0].tep }, d: ed[0].d, set: setD,
      onClose: function () { ed[1](null); }, onSave: function (d) { ed[1](null); doc[1](d ? { tep: d.tep, ten: d.ten, loai: d.loai } : null); },
      onDev: function () { setD({ tep: 'don-khoi-kien-ban-sua.pdf' }); } }), host) : null), true);
}
function Sub4() { return Submit(4, h(NoiDungCard)); }
function Sub4Doi() { return Submit(4, h(NoiDungCard, { mo: true })); } /* v324: màn có sẵn hộp Đổi cách nhập (đi tới màn bất kỳ) */
/* (cũ, thay bởi phương án S1 03/11/2026 bên dưới) bước 5 – Tài liệu & chứng cứ (theo ảnh web, phương án A, chốt 02/11/2026): mô tả định dạng → danh sách tài liệu (tài liệu bắt buộc theo loại việc + tài liệu tự tải lên) → 2 ô "Tải lên tài liệu bổ sung" / "Lấy từ kho dữ liệu cá nhân".
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
function TLSheet(p) {
  var r = p.r, d = p.d, du = d.tep && d.loai && (r.bat || (d.ten || '').trim()), o = React.useState(false), bRef = React.useRef(null), host = useHost(bRef);
  /* 03/11/2026: Loại giấy tờ chọn bằng bảng từ đáy chồng "Chọn loại giấy tờ" (danh sách dòng phương án B), chọn xong tự đóng về bảng tài liệu */
  return h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-co-sheet ph-tls' }, h('div', { className: 'ph-scrim', onClick: p.onClose }),
    h('div', { className: 'tp-dlg tp-dlg-sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': p.title || (r.bat ? 'Tài liệu bắt buộc' : 'Tài liệu bổ sung') },
      h('div', { className: 'tp-dlg-head' }, h('div', { className: 'ph-tls-head' }, h('h3', null, p.title || (r.bat ? 'Tài liệu bắt buộc' : 'Tài liệu bổ sung')), r.bat ? h('p', null, h('span', null, 'Loại văn bản: '), r.vb) : null),
        h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Đóng', onClick: p.onClose }, h(T.Icon, { name: 'x' }))),
      h('div', { className: 'tp-dlg-body ph-tls-body', ref: bRef },
        h('div', { className: 'ph-tls-tep' }, h('span', { className: 'ph-up3-ic ph-tl-ok', 'aria-hidden': 'true' }, h(T.Icon, { name: 'file' })), h('b', null, d.tep), h(NguonMenu, { label: 'Thay tệp', onDev: p.onDev, onLib: p.onLib })),
        Tf('Tên tài liệu', { required: !r.bat, value: (r.bat ? d.tep : d.ten) || '', placeholder: 'Nhập tên tài liệu', disabled: r.bat, readOnly: r.bat, onChange: function (e) { p.set({ ten: e.target.value }); } }),
        h(T.SelectField, { label: 'Loại giấy tờ', labelVisible: true, required: true, placeholder: '— Chọn loại giấy tờ —', value: d.loai || undefined, open: o[0], onClick: function () { o[1](true); } }),
        o[0] && host ? h(LvSheet, { host: host, title: 'Chọn loại giấy tờ', onClose: function () { o[1](false); } },
          h(LvRows, { label: 'Loại giấy tờ', cur: d.loai, items: (p.loai || LOAI_TL).map(function (x) { return { id: x, name: x }; }), onPick: function (x) { p.set({ loai: x }); o[1](false); } })) : null),
      h('div', { className: 'tp-dlg-foot ph-tls-foot' },
        r.tep ? h('button', { type: 'button', className: 'ph-doc-del', 'aria-label': 'Xóa tài liệu', onClick: function () { p.onSave(null); } }, h(T.Icon, { name: 'trash' })) : null,
        h(T.Button, { variant: 'secondary', onClick: p.onClose }, 'Hủy'), h(T.Button, { disabled: !du, onClick: function () { p.onSave(d); } }, 'Lưu'))));
}
/* p (03/11/2026, dùng lại ở trích lục, khiếu nại, tố cáo): title, desc, bat (tài liệu bắt buộc), bb0, bs0 (dữ liệu ban đầu), he (tài liệu hệ thống tự tạo: [tên, mô tả]) */
function TaiLieuCard(p) {
  p = p || {}; var TLB = p.bat || TL_BAT_BUOC;
  var bb = React.useState(p.bb0 || { dc: { tep: 'di-chuc-nguyen-van-a.pdf', loai: 'Bản chính' } }), bs = React.useState(p.bs0 || [{ k: 1, tep: 'bien-nhan-chuyen-khoan.pdf', ten: 'Biên nhận chuyển khoản', loai: 'Bản sao không có chứng thực' }]);
  var ed = React.useState(null), lib = React.useState(null), seq = React.useRef(1), anchor = React.useRef(null), host = useHost(anchor);
  var rows = TLB.map(function (r) { var d = bb[0][r.id]; return { key: r.id, id: r.id, bat: true, vb: r.ten, tep: d && d.tep, ten: d && d.tep, loai: d && d.loai }; })
    .concat(bs[0].map(function (x) { return { key: 'bs' + x.k, k: x.k, bat: false, tep: x.tep, ten: x.ten, loai: x.loai }; }));
  function mo(r, tep) { ed[1]({ r: r, d: { tep: tep || r.tep, ten: r.ten || '', loai: r.loai || '' } }); }
  function moi(tep) { mo({ key: 'moi', bat: false, moi: true }, tep); }
  function setD(o) { ed[1]({ r: ed[0].r, d: Object.assign({}, ed[0].d, o) }); }
  function luu(d) {
    var r = ed[0].r; ed[1](null);
    if (r.bat) { var n = Object.assign({}, bb[0]); if (d) n[r.id] = { tep: d.tep, loai: d.loai }; else delete n[r.id]; bb[1](n); return; }
    if (r.moi) { if (d) { seq.current += 1; bs[1](bs[0].concat([{ k: seq.current, tep: d.tep, ten: d.ten, loai: d.loai }])); } return; }
    bs[1](d ? bs[0].map(function (y) { return y.k === r.k ? { k: y.k, tep: d.tep, ten: d.ten, loai: d.loai } : y; }) : bs[0].filter(function (y) { return y.k !== r.k; }));
  }
  function chon(f) { var t = lib[0]; lib[1](null); if (t === 'thay') setD({ tep: f.tep }); else if (t === 'bs') moi(f.tep); else if (t) mo(t, f.tep); }
  return FCard(p.title || 'Tài liệu & chứng cứ', h(F, null, h('span', { ref: anchor, hidden: true }),
    P(p.desc || 'Định dạng PDF, JPG, PNG, DOCX · tối đa 10MB/tệp.', 'ph-muted'),
    p.he ? h('ul', { className: 'ph-tlr' }, p.he.map(function (x) {
      return h('li', { key: x[0] }, h('span', { className: 'ph-up3-ic ph-tl-ic ph-tl-ok', 'aria-hidden': 'true' }, h(T.Icon, { name: 'lock' })), h('span', { className: 'ph-tlr-tx' }, h('b', null, x[0]), h('small', null, x[1])));
    })) : null,
    rows.length ? h('ul', { className: 'ph-tlr' }, rows.map(function (r) {
      var sub = r.tep ? r.tep + ' · ' + (r.loai || 'Chưa chọn loại giấy tờ') : 'Chưa tải lên', ten = r.bat ? r.vb : (r.ten || r.tep);
      return h('li', { key: r.key },
        h('span', { className: 'ph-up3-ic ph-tl-ic' + (r.tep ? ' ph-tl-ok' : ''), 'aria-hidden': 'true' }, h(T.Icon, { name: r.tep ? 'check' : 'upload' })),
        h('span', { className: 'ph-tlr-tx' }, h('b', null, ten, r.bat ? h('span', { className: 'tp-field-req' }, ' *') : null), h('small', { className: r.tep && !r.loai ? 'ph-tlr-miss' : '' }, sub)),
        r.tep ? h(T.Button, { variant: 'secondary', size: 'sm', icon: 'pen', className: 'ph-lib-view ph-tlr-edit', 'aria-label': 'Sửa ' + ten, onClick: function () { mo(r); } })
          : h(NguonMenu, { label: 'Tải lên', onDev: function () { mo(r, KHO[0].tep); }, onLib: function () { lib[1](r); } }));
    })) : null,
    h('div', { className: 'ph-up2 ph-up3' },
      h('button', { type: 'button', className: 'ph-up2-it', onClick: function () { moi(KHO[2] ? KHO[2].tep : KHO[1].tep); } }, h('span', { className: 'ph-up3-ic' }, h(T.Icon, { name: 'upload' })), h('b', null, 'Tải lên tài liệu bổ sung')),
      h('button', { type: 'button', className: 'ph-up2-it', onClick: function () { lib[1]('bs'); } }, h('span', { className: 'ph-up3-ic' }, h(T.Icon, { name: 'folder' })), h('b', null, 'Từ kho dữ liệu cá nhân'))), /* 03/11/2026: đổi chữ ô nét đứt */
    ed[0] && host ? ReactDOM.createPortal(h(TLSheet, { loai: p.loai, r: ed[0].r, d: ed[0].d, set: setD, onClose: function () { ed[1](null); }, onSave: luu,
      onDev: function () { setD({ tep: KHO[1].tep }); }, onLib: function () { lib[1]('thay'); } }), host) : null,
    lib[0] && host ? ReactDOM.createPortal(h(LibSheet, { chosen: null, onClose: function () { lib[1](null); }, onPick: chon }), host) : null), true);
}
function Sub5() { return Submit(5, h(TaiLieuCard)); }
/* bước 6 – Xem lại & Xác nhận (phương án B có chỉnh, chốt 02/11/2026): khối cha "Xem lại & Xác nhận" (mô tả + 5 khối con gập/mở, mặc định mở); đầu khối con: mũi tên + tiêu đề + nút sửa chỉ biểu tượng bút, xám (về đúng bước);
   người khởi kiện, người bị kiện hiển thị bằng thẻ tóm tắt thu gọn như ở bước 2, 3 (không có nút xóa); tài liệu: tên, tệp · loại, nút xem chỉ biểu tượng xám. Gợi ý tòa án và cam kết là khối riêng. Xác nhận → popup "Xác nhận đơn?" → bước 7 */
function IcoBtn(icon, label, go) { return h(T.Button, { variant: 'secondary', size: 'sm', icon: icon, className: 'ph-lib-view', 'aria-label': label, 'data-pt-go': go }); }
function RvList(items) { return h(T.InfoList, { variant: 'rows', className: 'ph-rv', items: items.map(function (r) { return { label: r[0], value: r[1] }; }) }); }
/* bước 6 – phương án A (chọn 03/11/2026): nhãn xám bên trái, giá trị chữ thường bên phải, mỗi hàng 36px có kẻ mảnh; áp cho khối Loại việc và thông tin trong các khối/thẻ còn lại (người khởi kiện, người bị kiện, nội dung đơn) */
function RvKV(items) { return h('dl', { className: 'ph-rvkv' }, items.map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0]), h('dd', null, vd(r[1]))); })); } /* v232: giá trị trống → '-' */
var RV_TL = [['Di chúc / Giấy chứng tử', 'di-chuc-nguyen-van-a.pdf · Bản chính'], ['Tài liệu bổ sung', 'bien-nhan-chuyen-khoan.pdf']];
function RvKhoi(p) {
  var op = React.useState(true);
  return h('section', { className: 'ph-rv2' + (op[0] ? ' ph-rv2-open' : '') },
    h('div', { className: 'ph-rv2-h' },
      h('button', { type: 'button', className: 'ph-rv2-tg', 'aria-expanded': op[0], onClick: function () { op[1](!op[0]); } }, h(T.Icon, { name: 'chevronRight', className: 'ph-rv2-chev' }), h('span', null, p.t)),
      IcoBtn('pen', 'Chỉnh sửa ' + p.t, 'replace:' + p.go)),
    op[0] ? h('div', { className: 'ph-rv2-b' }, p.children) : null);
}
/* v328 (12/11/2026, chọn W2 + biểu tượng kiểu hộp đơn soạn dở): hộp "Xác nhận đơn?" dùng hình minh họa đơn + huy hiệu cảnh báo;
   xác nhận lại đơn đã có người ký mà danh sách đương sự phía nguyên đơn đã đổi (p.lai) → khối cảnh báo vàng có biểu tượng, cụm "toàn bộ chữ ký hiện có sẽ mất hiệu lực" đậm đỏ (câu theo web gie) */
function XemLaiScreen(p) {
  var cf = React.useState(!!(p && p.lai)), anchor = React.useRef(null), host = useHost(anchor);
  var body = h(F, null, h('span', { ref: anchor, hidden: true }),
    FCard('Xem lại & Xác nhận', h(F, null,
      P('Kiểm tra lại toàn bộ thông tin trước khi xác nhận đơn. Sau khi xác nhận, đơn chuyển sang bước Ký số — chỉ khi đủ chữ ký mới nộp được đến Tòa án.', 'ph-muted'),
      h(RvKhoi, { t: 'Loại việc', go: 'sub1d' }, RvKV([['Ngày làm đơn', '02/11/2026'], ['Loại thủ tục', 'Khởi kiện vụ án'], ['Lĩnh vực', 'Dân sự'], ['Loại việc', LOAI_VIEC[2][2]]])),
      h(RvKhoi, { t: 'Thông tin người khởi kiện', go: 'sub2' }, h('p', { className: 'dm-meta' }, '1 người khởi kiện'),
        h(Sum, { no: 1, ten: 'Hoàng Dương', sub: 'Số CCCD: 001090012345', open: true, cuon: false }, RvKV([['Số điện thoại', '0912345678'], ['Địa chỉ thư điện tử', 'nguyen.minh.an@example.com'], ['Địa chỉ thường trú', 'Số 8 Phạm Hùng, Phường Từ Liêm, Thành phố Hà Nội']]))),
      h(RvKhoi, { t: 'Thông tin người bị kiện', go: 'sub3' }, h('p', { className: 'dm-meta' }, '1 người bị kiện'),
        h(Sum, { no: 1, ten: 'Trần Văn Bình', sub: 'Cá nhân', open: true, cuon: false }, RvKV([['Loại người bị kiện', 'Cá nhân'], ['Họ và tên', 'Trần Văn Bình']]))),
      h(RvKhoi, { t: 'Nội dung đơn', go: 'sub4' }, h(RvNoiDung)), /* v327: theo web – Thời điểm phát sinh, Tóm tắt sự việc, Căn cứ pháp lý, Yêu cầu n, Tổng giá trị kê khai */
      h(RvKhoi, { t: 'Tài liệu đính kèm (' + RV_TL.length + ' tệp)', go: 'sub5' }, h('ul', { className: 'ph-rvdoc' }, RV_TL.map(function (d) {
        return h('li', { key: d[1] }, h('div', null, h('b', null, d[0]), h('small', null, d[1])), IcoBtn('eye', 'Xem ' + d[0]));
      })))), true),
    FCard('Gợi ý tòa án có thẩm quyền', h(F, null, P('Chọn Tòa án tiếp nhận đơn theo thẩm quyền luật định. Chọn không đúng, Tòa án có thể chuyển đơn.', 'ph-muted'),
      Sf('Tòa án nhận đơn', { required: true, value: COURT1 })), true),
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { label: 'Tôi xác nhận những thông tin trên là chính xác và hoàn toàn chịu trách nhiệm pháp lý về nội dung đơn khởi kiện này.' })),
    cf[0] && host ? ReactDOM.createPortal(h(ConfirmDel, { illo: ['nopDon', 'alert'], icon: 'alert', tone: 'warn', extra: p && p.lai ? h('p', { className: 'dm-cf-mk' }, h(T.Icon, { name: 'alert' }), h('span', null, 'Danh sách đương sự phía nguyên đơn đã thay đổi so với lần xác nhận trước và đã có người ký —', h('strong', null, ' toàn bộ chữ ký hiện có sẽ mất hiệu lực'), ' và cần ký lại từ đầu.')) : null, title: 'Xác nhận đơn?', desc: 'Bạn có chắc chắn xác nhận? Xác nhận sẽ không chỉnh sửa được thông tin đơn nữa — chỉ còn thực hiện ký số rồi nộp đơn.',
      yes: 'Đồng ý', go: 'sub7', onNo: function () { cf[1](false); }, onYes: function () { cf[1](false); } }), host) : null);
  return Submit(6, body, Btn(h(F, null, h(T.Icon, { name: 'checkCircle' }), 'Xác nhận'), 'primary', { className: 'ph-xn', onClick: function () { cf[1](true); } }));
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
var KY_LUC = 'Đã ký lúc 02/11/2026 · 10:30';
/* v235 (04/11/2026): mobile không có USB ký số – bảng ký chỉ còn "Ký số từ xa": chọn nhà cung cấp (chọn sẵn chứng thư mặc định VNPT CA),
   bấm Ký → bước chờ xác nhận trên ứng dụng ký số của nhà cung cấp (5 phút) → "Tôi đã xác nhận" hoàn tất ký */
function KySheet(p) {
  var ca = React.useState('VNPT CA'), buoc = React.useState('chon'), tep = p.tep || KY_TEP;
  var foot = buoc[0] === 'chon' ? h(F, null, h(T.Button, { variant: 'secondary', onClick: p.onClose }, 'Đóng'), h(T.Button, { disabled: !ca[0], onClick: function () { buoc[1]('cho'); } }, 'Ký'))
    : h(F, null, h(T.Button, { variant: 'secondary', onClick: function () { buoc[1]('chon'); } }, 'Hủy yêu cầu'), h(T.Button, { onClick: p.onKy }, 'Tôi đã xác nhận'));
  return h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-co-sheet ph-ky-sheet' }, h('div', { className: 'ph-scrim', onClick: p.onClose }),
    h('div', { className: 'tp-dlg tp-dlg-sheet', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'ph-ky-t' },
      h('div', { className: 'tp-dlg-head' }, h('h3', { id: 'ph-ky-t' }, buoc[0] === 'chon' ? 'Ký số từ xa (' + tep.length + ' tệp)' : 'Xác nhận ký trên ứng dụng'), h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Đóng', onClick: p.onClose }, h(T.Icon, { name: 'x' }))),
      buoc[0] === 'chon' ? h('div', { className: 'tp-dlg-body ph-ky-body' },
        h('ul', { className: 'ph-ky-files' }, tep.map(function (f) { return h('li', { key: f }, h(T.Icon, { name: 'clock' }), f); })),
        h('p', { className: 'ph-ky-lb' }, 'Nhà cung cấp chữ ký số'),
        h('ul', { className: 'ph-ca', role: 'radiogroup', 'aria-label': 'Nhà cung cấp chữ ký số' }, KY_CA.map(function (c) {
          var on = ca[0] === c;
          return h('li', { key: c }, h('button', { type: 'button', role: 'radio', 'aria-checked': on, className: 'ph-ca-it' + (on ? ' ph-ca-on' : ''), onClick: function () { ca[1](c); } },
            h('span', { className: 'ph-ca-logo', 'aria-hidden': 'true' }, h(T.Icon, { name: 'shield' })), h('b', null, c), c === 'VNPT CA' ? h('span', { className: 'ph-ca-md' }, 'Mặc định') : null, on ? h(T.Icon, { name: 'check', className: 'ph-ca-ok' }) : null));
        })),
        h('p', { className: 'ph-ky-note' }, h(T.Icon, { name: 'info' }), 'Ứng dụng di động chỉ hỗ trợ ký số từ xa. Sau khi bấm Ký, mở ứng dụng ký số của nhà cung cấp để xác nhận.'))
      : h('div', { className: 'tp-dlg-body ph-ky-body ph-ky-cho' },
        h('span', { className: 'ph-ky-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: 'phone' })),
        h('b', null, 'Đã gửi yêu cầu ký đến ' + ca[0]),
        h('p', null, 'Mở ứng dụng ký số của ' + ca[0] + ' trên điện thoại và xác nhận ' + tep.length + ' tệp. Yêu cầu hết hiệu lực sau 5 phút.'),
        h('span', { className: 'tdB-pill' }, h(T.Icon, { name: 'clock' }), 'Còn 04:59')),
      h('div', { className: 'tp-dlg-foot' }, foot)));
}
function KySoScreen(p) {
  var ky = React.useState(false), sh = React.useState(!!p.sheet), anchor = React.useRef(null), host = useHost(anchor);
  var dd = React.useState(false), tc = React.useState(false), ai = React.useRef('dd'), tcz = !!p.toChuc;
  var da = tcz ? dd[0] && tc[0] : ky[0];
  return Submit(7, h(F, null, h('span', { ref: anchor, hidden: true }),
    FCard('Ký số', h(F, null,
      P('Người khởi kiện và từng đồng khởi kiện (nếu có) phải ký số trước khi đơn được nộp đến Tòa án. Đồng khởi kiện đăng nhập tài khoản của mình rồi vào mục "Quản lý đơn" để ký phần của mình.', 'ph-muted'),
      h('ul', { className: 'ph-ky' },
        h('li', null, h('div', null, h('b', null, 'Đơn khởi kiện')), IcoBtn('eye', 'Xem đơn')),
        tcz ? null : h('li', null, h('span', { className: 'ph-ky-no' }, '1'), h('div', null, h('b', null, 'Hoàng Dương'), h('small', null, 'Người khởi kiện'), da ? h('small', { className: 'ph-ky-da' }, KY_LUC) : null),
          da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn', onClick: function () { sh[1](true); } }, 'Ký số'))),
      tcz ? h(KyToChuc, { dd: dd[0], tc: tc[0], ban: p.ban, loi: p.loi, onDD: function () { ai.current = 'dd'; sh[1](true); }, onTC: function () { ai.current = 'tc'; sh[1](true); } }) : null), true, da ? 'signed' : 'unsigned'),
    FCard('Tài liệu đính kèm (' + KY_TL.length + ' tệp)', h('ul', { className: 'ph-ky' }, KY_TL.map(function (d) {
      return h('li', { key: d[1] }, h('div', null, h('b', null, d[0]), h('small', null, d[1])), da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : null, IcoBtn('eye', 'Xem ' + d[0]));
    })), true),
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { onClose: function () { sh[1](false); }, onKy: function () { sh[1](false); if (tcz) (ai.current === 'tc' ? tc : dd)[1](true); else ky[1](true); } }), host) : null),
    Btn('Nộp đơn', 'primary', da ? { 'data-pt-go': 'replace:success' } : { disabled: true, title: 'Vui lòng ký số đủ trước khi nộp đơn' }));
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
function KScr(p) { return p.f(p.k, p.o); }
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
var NGUOI_ME = [['Họ và tên', 'Hoàng Dương'], ['Số định danh cá nhân', '001090012345'], ['Ngày sinh', '12/05/1990'], ['Giới tính', 'Nam']];

/* ===== Cấp trích lục, bản sao (theo web /trich-luc/moi – moi-yeu-cau.tsx, 03/11/2026): 4 bước ===== */
var TL_STEPS = ['Chọn bản án / quyết định', 'Loại & hình thức nhận', 'Tư cách người yêu cầu', 'Xem lại & gửi'];
var TL_TITLE = 'Cấp trích lục, bản sao';
/* vụ án mẫu của tài khoản và văn bản (bản án, quyết định) – dữ liệu mẫu */
var TL_VA = [{ ma: 'DS-2026-0012', ten: 'Tranh chấp hợp đồng vay tài sản', vt: 'Nguyên đơn', toa: COURT1, vb: [['BA', '45/2026/DS-ST', 'Bản án dân sự sơ thẩm', '20/10/2026'], ['QD', '12/2026/QĐ-CNTT', 'Quyết định công nhận sự thỏa thuận', '15/10/2026']] },
  { ma: 'DS-2026-0018', ten: 'Tranh chấp hợp đồng mua bán tài sản', vt: 'Bị đơn', toa: COURT1, vb: [['QD', '08/2026/QĐ-TĐC', 'Quyết định tạm đình chỉ giải quyết vụ án', '12/10/2026']] }];
var TL_MUC_DICH = ['Thi hành án', 'Làm thủ tục hành chính', 'Đăng ký hộ tịch', 'Khiếu nại, tố cáo', 'Lưu trữ cá nhân', 'Mục đích khác'];
var TL_LOAI_AN = ['Hình sự', 'Dân sự', 'Hôn nhân và gia đình', 'Kinh doanh, thương mại', 'Lao động', 'Hành chính', 'Phá sản', 'Sở hữu trí tuệ', 'Biện pháp xử lý hành chính', 'Phục hồi', 'Khiếu nại hành vi của người có thẩm quyền', 'Thi hành án'];
var TL_TU_CACH = ['Đương sự trong vụ án', 'Công dân quan tâm / Nghiên cứu học tập', 'Cơ quan báo chí / Truyền thông', 'Cơ quan nhà nước thực hiện công vụ', 'Đại diện theo ủy quyền'];
var TL_NAM = (function () { var a = []; for (var y = 2026; y >= 1990; y--) a.push(String(y)); return a; })();
var TL_TOA = [COURT1, 'Tòa án nhân dân khu vực 2 - Hà Nội', 'Tòa án nhân dân khu vực 3 - Hà Nội', 'Tòa án nhân dân Thành phố Hà Nội', '[Danh mục Tòa án – 403 đơn vị]'];
/* bước 1, nguồn "Từ vụ án của tôi": ô tìm, danh sách vụ án gập/mở, chọn văn bản → Loại sản phẩm cần cấp */
function TlTuVuAn() {
  var q = React.useState(''), mo = React.useState({ 'DS-2026-0012': true }), sel = React.useState(''), lp = React.useState('');
  var kq = khongDau(q[0].trim()), va = TL_VA.filter(function (v) { return !kq || khongDau(v.ma + ' ' + v.ten + ' ' + v.vb.map(function (b) { return b[1] + ' ' + b[2]; }).join(' ')).indexOf(kq) >= 0; });
  var tong = va.reduce(function (n, v) { return n + v.vb.length; }, 0);
  return h(F, null,
    h('div', { className: 'fx-search' }, Tf('Tìm vụ án hoặc văn bản', { icon: 'search', placeholder: 'Tìm tên vụ án, mã vụ án, số hiệu văn bản…', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })),
    h('p', { className: 'dm-meta' }, va.length + ' vụ án / ' + tong + ' bản án, quyết định'),
    h('div', { className: 'ctx-grps' }, va.map(function (v) {
      var on = !!q[0].trim() || !!mo[0][v.ma], nba = v.vb.filter(function (b) { return b[0] === 'BA'; }).length;
      return h('section', { key: v.ma, className: 'ctx-g' + (on ? ' ctx-g-on' : '') },
        h('button', { type: 'button', className: 'ctx-gh', 'aria-expanded': on, onClick: function () { var o = Object.assign({}, mo[0]); o[v.ma] = !on; mo[1](o); } },
          h('span', null, h('b', null, v.ten), h('small', null, v.ma + ' · ' + v.vt), h('small', null, v.vb.length + ' văn bản · ' + nba + ' bản án, ' + (v.vb.length - nba) + ' quyết định')), h(T.Icon, { name: 'chevronDown', className: 'ctx-chev' })),
        on ? h('div', { className: 'ctx-rows' }, h(LvRows, { label: 'Văn bản thuộc vụ án ' + v.ma, cur: sel[0], items: v.vb.map(function (b) { return { id: v.ma + b[1], code: b[1], name: '', desc: b[2] + ' · ' + b[3] }; }), onPick: function (id) { sel[1](id); lp[1](''); } })) : null);
    })),
    sel[0] ? h('section', { className: 'ph-s1-sec ph-fsec' }, Lbl('Loại sản phẩm cần cấp', 1), h(OptCards, { label: 'Loại sản phẩm cần cấp', cur: lp[0], onPick: lp[1], items: [
      { id: 'tl', t: 'Trích lục bản án/quyết định', d: 'Theo quyền đương sự.' },
      { id: 'bs', t: 'Bản sao toàn văn bản án/quyết định', d: 'Được cấp từ sổ gốc, có giá trị sử dụng thay cho bản chính trong các giao dịch theo quy định pháp luật.' }] })) : null);
}
/* bước 1, nguồn "Nhập thông tin bản án" (tự khai) */
function TlTuKhai() {
  var lv = React.useState('BAN_AN');
  return h(F, null,
    h('section', { className: 'ph-s1-sec ph-fsec' }, Lbl('Loại văn bản', 1), h(OptCards, { label: 'Loại văn bản', cur: lv[0], onPick: lv[1], items: [{ id: 'BAN_AN', t: 'Bản án', d: 'Bản án sơ thẩm, phúc thẩm của Tòa án.' }, { id: 'QUYET_DINH', t: 'Quyết định', d: 'Quyết định giải quyết vụ việc, quyết định công nhận…' }] })),
    Tf('Số bản án / quyết định', { required: true, placeholder: 'VD: 45/2026/DS-ST' }),
    h(SelSheet, { label: 'Năm ban hành', opts: TL_NAM, ph: '— Chọn năm —' }),
    h(SelSheet, { label: 'Loại án', opts: TL_LOAI_AN, ph: '— Chọn loại án —' }),
    h(SelSheet, { label: 'Tòa án ban hành', req: true, search: true, opts: TL_TOA, ph: '— Chọn tòa án —' }),
    Tf('Tên các bên đương sự', { placeholder: 'VD: Nguyễn Văn A, Trần Thị B (nếu nhớ)' }));
}
function Tl1(p) {
  var tab = React.useState(p && p.tuKhai ? 'tk' : 'va');
  return Wz({ title: TL_TITLE, steps: TL_STEPS, n: 1, go: tab[0] === 'tk' ? 'tl2k' : 'tl2', body: FCard('Chọn bản án / quyết định', h(F, null,
    Lead('Chọn từ vụ án của bạn (thông tin được điền tự động, không thể sai) hoặc nhập thông tin bản án để Tòa án đối chiếu.'),
    h(T.Tabs, { label: 'Nguồn thông tin bản án', value: tab[0], onChange: tab[1], items: [{ key: 'va', label: 'Từ vụ án của tôi' }, { key: 'tk', label: 'Nhập thông tin bản án' }] }),
    tab[0] === 'va' ? h(TlTuVuAn) : h(TlTuKhai)), true) });
}
/* bước 2 – Loại & hình thức nhận; tuKhai: có mục "Bạn cần cấp loại văn bản nào?" (từ vụ án đã chọn ở bước 1) */
function Tl2(p) {
  var tk = p && p.tuKhai, lv = React.useState(tk ? 'BAN_SAO' : 'TRICH_LUC'), ht = React.useState('buu_chinh'), md = React.useState('');
  var ghiChu = lv[0] === 'TRICH_LUC' ? h(F, null, NoteBox(h('p', null, h('b', null, 'Tòa án quyết định nội dung trích lục'), ' phù hợp với mục đích sử dụng. Bạn có thể ghi chú phần cần trích để Tòa tham khảo.')),
    Tf('Ghi chú phần cần trích', { multiline: true, placeholder: 'Ghi chú phần cần trích (nếu có, từ 30 đến 500 ký tự), VD: phần quyết định của bản án…' })) : null;
  return Wz({ title: TL_TITLE, steps: TL_STEPS, n: 2, go: tk ? 'tl3k' : 'tl3', body: h(F, null,
    tk ? FCard('Bạn cần cấp loại văn bản nào?', h(F, null, Lead('Chọn loại sản phẩm và hình thức nhận kết quả.'),
      h(OptCards, { label: 'Loại văn bản cần cấp', cur: lv[0], onPick: lv[1], items: [{ id: 'BAN_SAO', t: 'Bản sao bản án (toàn văn, có chữ ký số)', d: 'Được cấp từ sổ gốc, có giá trị sử dụng thay cho bản chính trong các giao dịch theo quy định pháp luật.' }, { id: 'TRICH_LUC', t: 'Trích lục bản án (một phần nội dung)', d: 'Trích một phần nội dung của bản án/quyết định.' }] }), ghiChu), true)
      : FCard('Trích lục bản án', ghiChu, true),
    FCard('Hình thức nhận kết quả', h(F, null, Lead('Kết quả được trả bằng bản giấy. Chọn nhận qua bưu chính hoặc nhận trực tiếp tại Tòa án.'),
      h(Dem, { label: 'Số lượng bản giấy' }),
      h(OptCards, { label: 'Hình thức nhận bản giấy', cur: ht[0], onPick: ht[1], items: [{ id: 'buu_chinh', t: 'Gửi qua bưu chính' }, { id: 'tai_toa', t: 'Nhận tại Bộ phận một cửa', d: COURT1 + ' · Mang CCCD + mã yêu cầu' }] }),
      ht[0] === 'buu_chinh' ? h(F, null, TwoE(Tf('Tên người nhận', { required: true, placeholder: 'Tên người nhận', defaultValue: 'Hoàng Dương' }), Tf('Số điện thoại', { required: true, type: 'tel', placeholder: 'Số điện thoại' })), AddrG('Địa chỉ nhận', true, 'short')) : null), true),
    h(TaiLieuCard, { title: 'Tài liệu đính kèm (nếu có)', desc: 'Đính kèm giấy tờ liên quan (ví dụ: giấy ủy quyền, giấy tờ chứng minh mục đích) — không bắt buộc, tối đa 9 tệp (+1 đơn đề nghị ký số = 10 tệp). Chấp nhận PDF, JPG, PNG, DOCX (tối đa 10 MB/tệp, ảnh và Word được tự động chuyển sang PDF). Mỗi tài liệu phải có tên và loại tài liệu.', bat: [], bb0: {}, bs0: [] }),
    FCard('Mục đích sử dụng', h(F, null, h(SelSheet, { label: 'Mục đích sử dụng', req: true, opts: TL_MUC_DICH, ph: '— Chọn mục đích —', onChange: md[1] }),
      tk || md[0] === 'Mục đích khác' ? Tf('Chi tiết mục đích sử dụng', { required: true, multiline: true, placeholder: 'Nhập mục đích sử dụng cụ thể (từ 30 đến 500 ký tự)' }) : null), true)) });
}
/* bước 3 – Tư cách người yêu cầu: từ vụ án → thẻ xác minh tự động; tự khai → chọn tư cách; ô cam kết */
function Tl3(p) {
  var tk = p && p.tuKhai, tcach = React.useState(TL_TU_CACH[0]);
  return Wz({ title: TL_TITLE, steps: TL_STEPS, n: 3, go: 'tl4', body: h(F, null,
    FCard('Tư cách người yêu cầu', h(F, null, Lead('Tòa án căn cứ tư cách người yêu cầu để thẩm định quyền được cấp theo pháp luật tố tụng.'),
      tk ? h(SelSheet, { label: 'Bạn yêu cầu với tư cách', req: true, opts: TL_TU_CACH, v: TL_TU_CACH[0], onChange: tcach[1] })
        : h('div', { className: 'ph-tlv' }, h('span', { className: 'ph-up3-ic' }, h(T.Icon, { name: 'shield' })), h('div', null, h('b', null, 'Nguyên đơn · DS-2026-0012'), h('small', null, 'Tư cách được hệ thống xác minh tự động qua liên kết vụ án — không cần khai lại.')))), true),
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { label: 'Tôi cam kết sử dụng bản sao bản án đúng mục đích đã khai báo và chịu trách nhiệm trước pháp luật.' })),
    laTC() ? h(GiayGT, { bb: tk && tcach[0] === 'Cơ quan nhà nước thực hiện công vụ' }) : null) }); /* v333 */
}
function Tl4() {
  return KyGui({ title: TL_TITLE, steps: TL_STEPS, n: 4, rvTitle: 'Xem lại thông tin trước khi gửi đến Tòa án',
    review: [['Bản án', '45/2026/DS-ST — Bản án dân sự sơ thẩm'], ['Vụ án', 'DS-2026-0012 — ' + COURT1], ['Loại yêu cầu', 'Trích lục bản án'], ['Số lượng bản', '1'], ['Hình thức nhận', 'Bản giấy có dấu đỏ (chuyển phát bưu chính)'], ['Mục đích sử dụng', 'Thi hành án'], ['Tư cách người yêu cầu', 'Nguyên đơn · DS-2026-0012']],
    moTa: 'Người yêu cầu ký số đơn và toàn bộ tài liệu đính kèm trước khi gửi yêu cầu đến Tòa án.', don: 'Đơn yêu cầu', donTep: 'don-yeu-cau-trich-luc.pdf', vaiTro: 'Người yêu cầu', tl: [],
    camDoan: 'Tôi cam đoan các thông tin và tài liệu đã cung cấp là đúng sự thật và chịu trách nhiệm trước pháp luật.', btn: 'Gửi yêu cầu', ok: 'tlOk' });
}
function TlOk() {
  return KetQua({ title: 'Đã gửi yêu cầu', desc: 'Tòa án cam kết tiếp nhận trong vòng 08 giờ làm việc.', rows: [['Mã yêu cầu', h('span', { className: 'ph-ok-ma' }, '[Mã yêu cầu]')], ['Thời điểm gửi', '[giờ, ngày gửi]'], ['Loại yêu cầu', 'Trích lục bản án']], b1: 'Về danh sách yêu cầu', b2: 'Về trang chủ' });
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
  { ma: 'pa1', n: 'pakn', ten: 'Kiến nghị, phản ánh', desc: 'Đưa ra ý kiến, đề xuất hoặc cung cấp thông tin về việc thực hiện chính sách, pháp luật, công tác quản lý và hoạt động của Tòa án. Không dùng để khiếu nại một quyết định, hành vi cụ thể.', cq: 'Tòa án nơi tiếp nhận kiến nghị, phản ánh', th: null, hg: null, cc: 'Luật Tiếp công dân 2013, sửa đổi năm 2025 (Luật 136/2025/QH15) · Nghị định 154/2026/NĐ-CP', hs: ['Tài liệu, hình ảnh minh họa (nếu có)'] }];
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
      h('p', { className: 'ct2-lead' }, 'Bạn muốn khiếu nại hoặc tố cáo việc gì?'),
      h('section', { className: 'ph-s1-sec' }, Hd('Nhóm thủ tục', 1), PickRow('Nhóm thủ tục', KN_NHOM_PICK, nh[0], chonNhom),
        nh[0] ? h('p', { className: 'ph-s1-law' }, h('b', null, KnTenNhom(nh[0])), ' · ' + so + ' thủ tục') : null),
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
    h(T.SegmentedControl, { label: 'Loại đối tượng', value: loai[0], onChange: loai[1], options: [{ value: 'cn', label: 'Cá nhân' }, { value: 'tc', label: 'Cơ quan, tổ chức' }] }),
    Tf(cn ? 'Họ tên' : 'Tên cơ quan, tổ chức', { required: k !== 'kpa', placeholder: cn ? 'Họ tên' : 'Tên cơ quan, tổ chức' }),
    cn ? Tf('Chức vụ', { placeholder: 'Chức vụ' }) : null, cn ? Tf('Nơi công tác', { placeholder: 'Nơi công tác' }) : null,
    Tf('Địa chỉ', { placeholder: 'Địa chỉ' })), true));
}
function Knh3(k) {
  var nd = React.useState('');
  return KnhWz(k, 3, FCard('Nội dung và nơi nhận', h(F, null,
    NoteBox(h('p', null, 'Mỗi đơn chỉ một loại nội dung. Nếu vừa khiếu nại vừa tố cáo, hoặc có thêm phản ánh, kiến nghị, bạn gửi các đơn riêng.')),
    Tf(KNH[k].tieuDe, { required: true, maxLength: 150, placeholder: KNH[k].tieuDe }),
    h(SelSheet, { label: 'Tòa án nhận đơn', req: true, search: true, opts: TL_TOA, ph: 'Tòa án nhận đơn' }),
    Tf(KNH[k].noiDung, { required: true, multiline: true, maxLength: 2000, placeholder: KNH[k].noiDung, value: nd[0], onChange: function (e) { nd[1](e.target.value); } }),
    h('p', { className: 'ph-count' }, nd[0].length + ' / tối thiểu 50 ký tự')), true));
}
function Knh4(k) {
  var nd = React.useState(false), bv = React.useState(false);
  return KnhWz(k, 4, h(F, null,
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
  kqd: { ma: 'qd', w: 'khiếu nại', b1: 'Đối tượng & thời hiệu', b2: 'Nội dung & người khiếu nại', don: 'Đơn khiếu nại', l2: 'Khiếu nại lần hai',
    he: [['Đơn khiếu nại', 'Hệ thống tạo từ nội dung bạn đã khai'], ['Bản sao quyết định bị khiếu nại', 'Lấy từ Hộp thư tống đạt']] },
  khv: { ma: 'hv_nttt', w: 'khiếu nại', b1: 'Đối tượng & thời hiệu', b2: 'Nội dung & người khiếu nại', don: 'Đơn khiếu nại', l2: 'Khiếu nại lần hai',
    he: [['Đơn khiếu nại', 'Hệ thống tạo từ nội dung bạn đã khai']] },
  ktv: { ma: 'tc', w: 'tố cáo', b1: 'Đối tượng & thời hiệu', b2: 'Nội dung & người tố cáo', don: 'Đơn tố cáo', l2: 'Tố cáo lần hai',
    he: [['Đơn tố cáo', 'Hệ thống tạo từ nội dung bạn đã khai']] } };
/* hậu tố mã màn theo biến thể: L = lần hai, Kg = không gắn vụ án */
function knvSfx(o) { return o && o.lan2 ? 'L' : o && o.kg ? 'Kg' : ''; }
function knvSteps(k) { return [KNV[k].b1, KNV[k].b2, 'Tài liệu, chứng cứ', 'Xem lại & ký gửi']; }
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
    h('p', null, qd ? 'Văn bản bị khiếu nại: ' : 'Văn bản giải quyết lần đầu: ', h('b', null, 'Quyết định giải quyết khiếu nại'), ' · số 12/2026/QĐ-GQKN · nhận ngày 27/10/2026'),
    h('small', null, qd ? 'Khiếu nại lần hai tạo hồ sơ mới với mã tiếp nhận mới và chỉ tạo được một lần cho mỗi hồ sơ.' : 'Hồ sơ lần hai là hồ sơ mới với mã tiếp nhận mới, chỉ tạo được một lần cho mỗi hồ sơ lần đầu.'));
}
/* văn bản tống đạt của vụ án đã chọn – chia nhóm như web (phanNhomVanBan) */
var KNV_VB = [{ id: 'v1', code: 'Mẫu 04-DS', name: 'Thông báo không chấp nhận yêu cầu thu thập chứng cứ', desc: 'số 15/2026/TB-TA · nhận ngày 25/10/2026 · hạn cuối 07/11/2026 · Còn 3 ngày' }, { id: 'v2', code: 'Mẫu 21-DS', name: 'Quyết định đình chỉ giải quyết yêu cầu', desc: 'số 09/2026/QĐ-ĐC · nhận ngày 20/10/2026 · hạn cuối 04/11/2026 · Hôm nay là ngày cuối' }];
var KNV_DA = [{ ten: 'Quyết định áp dụng biện pháp khẩn cấp tạm thời', meta: 'Mẫu 15-DS · số 03/2026/QĐ-BPKCTT · nhận ngày 10/10/2026', hs: 'KNTT-2026-0009' }];
var KNV_HET = [{ ten: 'Thông báo nộp tiền tạm ứng án phí', meta: 'Mẫu 08-DS · số 11/2026/TB-TA · nhận ngày 01/10/2026', han: 'hết hạn 08/10/2026 · Quá hạn 27 ngày' }];
var KNV_CHUA = [{ ten: 'Giấy triệu tập', meta: 'Mẫu 01-DS · số 22/2026/GTT · nhận ngày 28/10/2026' }];
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
  var ok = c[0] && l[0].trim().length >= 20;
  return h('div', { className: 'kv-guard kv-guard-' + (ok ? 'warn' : 'het') }, h(T.Icon, { name: 'alert' }), h('div', null,
    h('b', null, ok ? 'Đã hết thời hiệu — sẽ gửi kèm trình bày về trở ngại khách quan' : 'Đã hết thời hiệu khiếu nại — không thể tiếp tục'),
    h('p', null, 'Thời hiệu 15 ngày tính từ 10/10/2026 — hạn cuối 25/10/2026. ' + (ok ? 'Tòa án xem xét trở ngại khách quan khi tiếp nhận đơn.' : 'Nếu có trở ngại khách quan, tích ô bên dưới và trình bày lý do.')),
    h(T.Checkbox, { label: 'Tôi có trở ngại khách quan nên không khiếu nại đúng thời hiệu', checked: c[0], onChange: function (e) { c[1](e.target.checked); } }),
    c[0] ? Tf('Lý do trở ngại khách quan', { required: true, multiline: true, value: l[0], onChange: function (e) { l[1](e.target.value); }, maxLength: 1000, showCount: true, placeholder: 'Ví dụ: ốm đau, thiên tai, đi công tác xa… (kèm tài liệu chứng minh ở bước 3)', help: 'Tối thiểu 20 ký tự.' }) : null));
}
function Knv1(k, o) {
  o = o || {};
  var va = React.useState(o.kg ? 'none' : 'DS-2026-0012'), kg = va[0] === 'none', doi = React.useState(false), tc = k === 'ktv';
  var cur = TL_VA.filter(function (x) { return x.ma === va[0]; })[0];
  var body;
  if (o.lan2) body = FCard(k === 'ktv' ? 'Đối tượng bị tố cáo' : 'Đối tượng bị khiếu nại & thời hiệu', KnvLan2(k), true);
  else if (k === 'kqd') body = FCard('Đối tượng bị khiếu nại & thời hiệu', h(KnvQd, o), true);
  else body = FCard(tc ? 'Đối tượng bị tố cáo' : 'Đối tượng bị khiếu nại & thời hiệu', h(F, null,
    Lead(tc ? 'Khai theo thông tin bạn biết. Nếu không rõ họ tên, ghi chức danh và đơn vị để Tòa án xác định người bị tố cáo.' : 'Khai đúng người có hành vi và ngày bạn biết được hành vi để hệ thống kiểm tra thời hiệu ngay tại bước này.'),
    h('section', { className: 'ph-s1-sec ph-fsec' }, h('div', { className: 'kv-hd' }, Lbl('Vụ án liên quan', 1),
      (cur || kg) ? h('button', { type: 'button', className: 'ph-link kv-doi', onClick: function () { doi[1](!doi[0]); } }, doi[0] ? 'Giữ lựa chọn hiện tại' : 'Đổi vụ án') : null),
      !doi[0] && (cur || kg) ? h('div', { className: 'ph-boxlist' }, h(LvRows, { label: 'Vụ án đã chọn', cur: va[0], items: [cur ? { id: cur.ma, code: cur.ma, name: cur.ten, desc: cur.vt + ' · ' + cur.toa } : { id: 'none', name: 'Không gắn vụ án', desc: tc ? 'Tố cáo không bắt buộc là đương sự — bạn sẽ khai Tòa án nơi người bị tố cáo công tác.' : 'Vụ việc chưa có trên Cổng — bạn sẽ khai Tòa án đang giải quyết.' }], onPick: function () { doi[1](true); } }))
        : h(VuAnChon, { label: 'Vụ án liên quan', noLbl: true, v: va[0], onChange: function (id) { va[1](id); doi[1](false); }, khongGan: true,
          desc: tc ? 'Tố cáo không bắt buộc là đương sự. Chọn vụ án liên quan nếu có, hoặc chọn “Không gắn vụ án”.' : 'Chọn vụ án bạn là đương sự trên Cổng. Nếu vụ việc chưa có trên Cổng, chọn “Không gắn vụ án” và khai Tòa án đang giải quyết.',
          khongGanDesc: 'Bạn khai Tòa án và số hồ sơ (nếu biết) ở phần bên dưới.' })),
    kg ? h(F, null, h(SelSheet, { label: tc ? 'Tòa án nơi người bị tố cáo công tác' : 'Tòa án đang giải quyết vụ án, vụ việc', req: true, search: true, opts: TL_TOA, v: o.kg ? COURT1 : undefined }),
      Tf(tc ? 'Vụ án, vụ việc liên quan' : 'Số hồ sơ, vụ án, vụ việc', { placeholder: tc ? 'Số hồ sơ hoặc tên vụ việc, nếu có' : 'Ví dụ: 45/2026/TLST-DS', help: tc ? 'Không bắt buộc.' : 'Khai nếu biết, giúp Tòa án tìm đúng hồ sơ.' })) : null,
    !tc ? h(F, null, Tf('Họ và tên người có hành vi bị khiếu nại', { required: true, placeholder: 'Ví dụ: Nguyễn Văn B', help: 'Theo biên bản, giấy triệu tập, thông báo của Tòa án…', defaultValue: o.het ? 'Nguyễn Văn B' : undefined }),
      h(SelSheet, { label: 'Chức danh', ph: 'Chọn chức danh (nếu biết)', opts: ['Thẩm phán', 'Hội thẩm nhân dân', 'Thư ký Tòa án', 'Thẩm tra viên', 'Chánh án', 'Phó Chánh án'], v: o.het ? 'Thư ký Tòa án' : undefined }),
      Tf('Ngày bạn biết được hành vi tố tụng', Dt({ required: true, help: 'Ngày gốc để tính thời hiệu 15 ngày.', defaultValue: o.het ? '10/10/2026' : undefined })),
      o.het ? h(KnvHet) : null)
      : h(F, null, Tf('Họ và tên người bị tố cáo', { required: true, placeholder: 'Ví dụ: Nguyễn Văn B', help: 'Khai theo thông tin bạn biết. Nếu không rõ họ tên, ghi chức danh và đơn vị để Tòa án xác định người bị tố cáo.' }),
        Tf('Chức danh, đơn vị công tác', { required: true, placeholder: 'Ví dụ: Thư ký Tòa án, TAND khu vực 1, TP. Hồ Chí Minh' }),
        NoteBox(h('p', null, h('b', null, 'Cần chứng cứ.'), ' Đơn tố cáo phải kèm ít nhất một tài liệu, chứng cứ ở bước 3 (Tài liệu, chứng cứ).')))), true);
  return KnvWz(k, 1, h(F, null, KnvChon(k, { lan2: o.lan2, kg: kg, toa: kg && o.kg ? COURT1 : null, rong: o.rong, vb: o.tong ? '07/11/2026 · Còn 3 ngày' : o.lan2 ? '10/11/2026 · Còn 6 ngày' : null }), body), o.rong ? Btn('Tiếp theo', 'primary', { disabled: true }) : null, o);
}
/* tư cách tố tụng khi không gắn vụ án (danh mục TUCACHTGTTDS – tên mục là dữ liệu mẫu) */
var KNV_TU_CACH = ['Nguyên đơn', 'Bị đơn', 'Người có quyền lợi, nghĩa vụ liên quan', 'Người đại diện hợp pháp của đương sự', 'Người bảo vệ quyền và lợi ích hợp pháp của đương sự', 'Người làm chứng'];
function Knv2(k, o) {
  o = o || {}; var tc = k === 'ktv', kg = !!o.kg, bm = React.useState(true), tcach = React.useState(kg && !tc ? KNV_TU_CACH[4] : '');
  var rows = [['Họ và tên', 'Hoàng Dương'], ['Số định danh cá nhân', '001090012345'], k === 'kqd' ? ['Số điện thoại', '0912345678'] : ['Địa chỉ', 'Số 8 Phạm Hùng, Phường Từ Liêm, Thành phố Hà Nội']]
    .concat(kg ? [['Trong vụ án', 'Không gắn vụ án']] : [['Tư cách tố tụng', 'Nguyên đơn'], ['Trong vụ án', 'DS-2026-0012 · Tranh chấp hợp đồng vay tài sản']]);
  return KnvWz(k, 2, h(F, null,
    FCard('Nội dung ' + KNV[k].w, h(F, null, Lead('Trình bày trung thực, có mốc thời gian cụ thể — đây là căn cứ để người có thẩm quyền xác minh.'),
      tc ? h(F, null, Tf('Nội dung tố cáo', { required: true, multiline: true, placeholder: 'Ngày … tại phiên hòa giải, ông … đã …', help: 'Nêu rõ hành vi vi phạm, thời gian, địa điểm. Dòng đầu được dùng làm tóm tắt của hồ sơ.' }),
        Tf('Yêu cầu, đề nghị của người tố cáo', { required: true, multiline: true, placeholder: 'Đề nghị Chánh án xem xét, xử lý …' }),
        h('div', { className: 'kv-bm' }, h(T.Checkbox, { label: 'Yêu cầu giữ bí mật danh tính người tố cáo', checked: bm[0], onChange: function (e) { bm[1](e.target.checked); } }),
          P('Tòa án có trách nhiệm giữ bí mật họ tên, địa chỉ, bút tích và thông tin cá nhân khác của người tố cáo. Khi tích ô này, Cổng gửi kèm đề nghị áp dụng biện pháp bảo vệ người tố cáo; việc xem xét thuộc Tòa án.', 'ph-muted')),
        NoteBox(h('p', null, h('b', null, 'Không tiếp nhận tố cáo nặc danh.'), ' Đơn tố cáo phải ghi rõ họ tên người tố cáo.')))
        : h(F, null, Tf('Tóm tắt nội dung khiếu nại', { required: true, help: 'Một câu ngắn, dùng làm dòng “Về việc” của đơn.', placeholder: k === 'kqd' ? 'Khiếu nại thông báo không chấp nhận thu thập chứng cứ' : 'Khiếu nại hành vi không thực hiện đúng thời hạn tống đạt' }),
          Tf('Diễn biến, nội dung khiếu nại', { required: true, multiline: true, help: 'Trình bày sự việc theo thời gian, nêu điểm bạn cho là trái pháp luật.' }),
          Tf('Yêu cầu giải quyết khiếu nại', { required: true, multiline: true, placeholder: k === 'kqd' ? 'Đề nghị hủy …, thực hiện …' : 'Đề nghị xem xét lại hành vi …, xử lý …' })),
      NoteBox(h('p', null, h('b', null, 'Bạn không cần tự chia loại đơn.'), ' Khi tiếp nhận, Tòa án phân loại theo nội dung và thẩm quyền; nếu đơn có nhiều nội dung thuộc các luồng khác nhau, Tòa án sẽ hướng dẫn hoặc chuyển đến nơi có thẩm quyền.'))), true),
    FCard('Người ' + KNV[k].w + ' & tư cách', h(F, null, Lead('Tòa án căn cứ tư cách người gửi đơn để xác định quyền khiếu nại, tố cáo theo pháp luật tố tụng.'),
      h('p', { className: 'ph-me' }, h('b', null, k === 'kqd' ? 'Chính tôi khiếu nại' : kg ? 'Chính tôi tự ' + KNV[k].w : 'Thông tin lấy từ vụ án'), h(T.StatusBadge, { tone: 'success', icon: false }, 'Theo tài khoản VNeID')),
      RvKV(rows),
      kg && !tc ? h(SelSheet, { label: 'Tư cách tố tụng của bạn', req: true, ph: 'Chọn tư cách tố tụng', opts: KNV_TU_CACH, v: tcach[0], onChange: tcach[1] }) : null,
      kg && !tc && tcach[0] === KNV_TU_CACH[4] ? NoteBox(h('p', null, h('b', null, 'Cần giấy tờ chứng minh tư cách.'), ' Bạn tải lên giấy tờ chứng minh tư cách người bảo vệ quyền và lợi ích hợp pháp của đương sự ở bước 3.')) : null,
      NoteBox(h('p', null, h('b', null, 'Thông tin định danh lấy từ VNeID.'), ' Giấy tờ đã có trong Kho dữ liệu điện tử không phải nộp lại.'))), true)), null, o);
}
function Knv3(k, o) {
  o = o || {}; var tc = k === 'ktv', bv = o.kg && k === 'khv';
  var he = o.lan2 ? [[(tc ? 'Đơn tố cáo lần 2' : 'Đơn khiếu nại lần 2'), 'Hệ thống tạo từ nội dung bạn đã khai']] : KNV[k].he;
  var bat = (bv ? [{ id: 'bv', ten: 'Giấy tờ chứng minh tư cách người bảo vệ quyền và lợi ích hợp pháp của đương sự' }] : []).concat(tc ? [{ id: 'cc', ten: 'Tài liệu, chứng cứ chứng minh nội dung tố cáo' }] : []);
  return KnvWz(k, 3, h(F, null, tc ? NoteBox(h('p', null, h('b', null, 'Đơn tố cáo bắt buộc kèm chứng cứ.'), ' Người giải quyết tố cáo cần thông tin, tài liệu, chứng cứ để xác minh hành vi bị tố cáo. Bạn phải tải lên ít nhất một tài liệu, chứng cứ thì mới gửi được đơn.')) : null,
    h(TaiLieuCard, { title: 'Tài liệu, chứng cứ', desc: 'Đính kèm tài liệu, chứng cứ cho đơn. Mọi tài liệu sẽ được ký số cùng bản đơn ở bước sau.' + (tc ? '' : ' Tài liệu, chứng cứ chứng minh nội dung khiếu nại (nếu có).'), he: he,
      bat: bat, bb0: {}, bs0: [] })), null, o);
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
  return KyGui({ title: 'Soạn đơn', steps: knvSteps(k), n: 4, rvTitle: 'Xem lại & ký gửi', rvDesc: 'Kiểm tra lại toàn bộ thông tin trước khi ký số và gửi đến Tòa án.',
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
    rows: [['Mã hồ sơ', h('span', { className: 'ph-ok-ma' }, 'KNTT-2026-0031')], ['Mã tiếp nhận tại Tòa án', p.loi ? 'Chưa có' : 'Đang đồng bộ với Tòa án'], ['Vụ án', 'DS-2026-0012'],
      ['Cơ quan giải quyết', p.lan2 ? 'Chánh án Tòa án cấp trên trực tiếp' : tc ? 'Chánh án Tòa án' : 'Chánh án Tòa án đang giải quyết vụ án'],
      ['Trạng thái', h(T.StatusBadge, { tone: p.loi ? 'danger' : 'info', icon: false }, p.loi ? 'Gửi lỗi' : 'Đã gửi')]],
    han: tc ? '30 ngày kể từ ngày Tòa án nhận được tố cáo; vụ việc phức tạp gia hạn không quá 30 ngày.' : '15 ngày kể từ ngày Tòa án nhận được khiếu nại; vụ việc phức tạp gia hạn không quá 15 ngày.',
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
function YcBlock() {
  var r = React.useState(YC_ST.rows), rows = r[0];
  function luu(n) { YC_ST.rows = n; r[1](n); }
  function set(i, k, v) { luu(rows.map(function (x, j) { if (j !== i) return x; var o = Object.assign({}, x); o[k] = v; return o; })); }
  var tong = rows.reduce(function (s, x) { return s + (Number(x.gt) || 0); }, 0);
  return h('div', { className: 'yc' },
    h('div', { className: 'yc-t' }, h('b', null, 'Yêu cầu Tòa án giải quyết', h('span', { className: 'tp-field-req', 'aria-hidden': 'true' }, '*')),
      h('p', null, 'Bạn tự viết nội dung yêu cầu, mỗi yêu cầu một dòng kèm giá trị kê khai riêng. Tổng giá trị là căn cứ tính tạm ứng án phí có giá ngạch.')),
    h('div', { className: 'yc-list' }, rows.map(function (x, i) {
      return h('div', { key: i, className: 'yc-c' },
        h('div', { className: 'yc-h' }, h('b', null, 'Yêu cầu ' + (i + 1)), h('button', { type: 'button', className: 'yc-x pt-chk', 'aria-label': 'Xóa dòng yêu cầu', onClick: function () { luu(rows.filter(function (y, j) { return j !== i; })); } }, h(T.Icon, { name: 'trash' }))),
        h('div', { className: 'yc-b' },
          Tf('Nội dung yêu cầu', { required: true, multiline: true, maxLength: 500, placeholder: 'Tự nhập nội dung yêu cầu', value: x.nd, onChange: function (e) { set(i, 'nd', e.target.value); } }),
          Tf('Giá trị kê khai (VNĐ)', { inputMode: 'numeric', placeholder: '0', help: 'Yêu cầu không tính tiền thì để trống', value: soTien(x.gt), onChange: function (e) { set(i, 'gt', e.target.value.replace(/\D/g, '')); } }),
          Tf('Mô tả chi tiết yêu cầu', { multiline: true, maxLength: 2000, placeholder: 'Diễn giải cụ thể yêu cầu này', value: x.mt, onChange: function (e) { set(i, 'mt', e.target.value); } })));
    })),
    h(T.Button, { variant: 'tint', block: true, icon: 'plus', className: 'ph-co-add pt-chk', onClick: function () { luu(rows.concat([{ nd: '', gt: '', mt: '' }])); } }, 'Thêm nội dung yêu cầu'),
    h('div', { className: 'yc-tong' }, h('span', null, 'TỔNG GIÁ TRỊ KÊ KHAI'), h('b', { className: 'tp-num' }, tong > 0 ? soTien(String(tong)) + ' đ' : '—')));
}
function NoiDungTruong(p) {
  var td = React.useState(ND_ST.td), cc = React.useState(ND_ST.cc);
  return h(F, null,
    Tf('Thời điểm phát sinh vụ việc', Dt({ required: true, help: 'Là mốc đối chiếu thời hiệu khởi kiện', value: td[0], onChange: function (e) { ND_ST.td = e.target.value; td[1](e.target.value); } })),
    Tf('Tóm tắt quá trình sự việc', { required: true, multiline: true, help: 'Mô tả theo trình tự thời gian (tối thiểu 100 ký tự)', value: p.nd, onChange: function (e) { ND_ST.tt = e.target.value; p.onNd(e); } }),
    Tf('Căn cứ pháp lý', { multiline: true, placeholder: 'Điều luật, văn bản pháp luật liên quan (tùy chọn)', value: cc[0], onChange: function (e) { ND_ST.cc = e.target.value; cc[1](e.target.value); } }),
    h(YcBlock));
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
function Sub4Yc() { ND_ST.td = ND_ST.td || '15/03/2025'; ND_ST.tt = ND_ST.tt || 'Ngày 15/03/2025, tôi cho ông Trần Văn Bình vay 200.000.000 đồng, hẹn trả sau 6 tháng; đến hạn ông Bình không trả dù tôi đã nhắc nhiều lần.'; if (!YC_ST.rows.some(function (x) { return x.nd; })) YC_ST.rows = YC_MAU.map(function (x) { return Object.assign({}, x); }); return Submit(4, h(NoiDungCard, { nd0: ND_ST.tt })); } /* v327: màn xem nhanh có sẵn dữ liệu mẫu */

/* v330 (12/11/2026, chọn O1 – như web jD/sie): Bước 7 khi người khởi kiện là tổ chức – khung nhóm (biểu tượng tòa nhà + tên tổ chức + "cần 2 chữ ký"),
   dòng 1 "Chữ ký cá nhân đại diện" (Ký số đại diện), dòng 2 "Chữ ký tổ chức" (Ký số tổ chức – khóa tới khi đại diện ký xong, ghi "Cần chữ ký của cá nhân đại diện trước.");
   p.ban: "Hồ sơ đang có người ký, hệ thống đang xử lý — vui lòng chờ rồi thử lại." (khối vàng, khóa các nút); p.loi: "Không tải được tiến độ ký. Vui lòng thử lại." */
var KYTC_DD = 'Chữ ký cá nhân đại diện', KYTC_TC = 'Chữ ký tổ chức', KYTC_CAN = 'Cần chữ ký của cá nhân đại diện trước.';
function KyToChuc(p) {
  if (p.loi) return h('p', { className: 'kytc-loi', role: 'alert' }, h(T.Icon, { name: 'alert' }), 'Không tải được tiến độ ký. Vui lòng thử lại.');
  var dd = p.dd, tc = p.tc, khoa = p.ban;
  var nutDD = dd ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn pt-chk', disabled: khoa, onClick: p.onDD }, 'Ký số đại diện');
  var nutTC = tc ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: dd && !khoa ? 'pen' : 'lock', className: 'ph-ky-btn pt-chk', disabled: !dd || khoa, onClick: p.onTC }, 'Ký số tổ chức');
  return h(F, null,
    khoa ? h('p', { className: 'kytc-ban', role: 'status' }, h(T.Icon, { name: 'alert' }), h('span', null, 'Hồ sơ đang có người ký, hệ thống đang xử lý — vui lòng chờ rồi thử lại.')) : null,
    h('div', { className: 'kytc' },
      h('div', { className: 'kytc-h' }, h(T.Icon, { name: 'building' }), h('b', null, ACC_TC.ten), h('span', null, 'cần 2 chữ ký')),
      h('ul', { className: 'ph-ky kytc-l' },
        h('li', null, h('span', { className: 'ph-ky-no' }, '1'), h('div', null, h('b', null, KYTC_DD), dd ? h('small', { className: 'ph-ky-da' }, KY_LUC) : null), nutDD),
        h('li', null, h('span', { className: 'ph-ky-no' }, '2'), h('div', null, h('b', null, KYTC_TC), !dd ? h('small', null, KYTC_CAN) : tc ? h('small', { className: 'ph-ky-da' }, KY_LUC) : null), nutTC))));
}
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
