/* TATC mobile – màn hình vẽ lại bằng design system TuPhap. Phần 1: khung, Trang chủ, bảng chọn, thông báo, lịch. */
var T = window.TuPhap, h = React.createElement, F = React.Fragment, LOGO = window.__LOGO, HERO = window.__HERO;
var noop = function () {};
/* placeholder toàn app (02/11/2026): ô nhập "Nhập + tiêu đề", ô chọn và ô ngày "Chọn + tiêu đề"; giữ các câu đặc biệt đã có ("(nếu có)", "12 số", "Nhập tên loại việc"…) */
(function () {
  var TF = T.TextField, SF = T.SelectField, GENERIC = { 'Chọn': 1, '— Chọn —': 1 };
  T.TextField = function (p) {
    if (p.label && !p.readOnly && (p.placeholder === undefined || p.placeholder === 'dd/mm/yyyy'))
      p = Object.assign({}, p, { placeholder: (p.placeholder === 'dd/mm/yyyy' || p.icon === 'calendar' ? 'Chọn ' : 'Nhập ') + p.label });
    return TF(p);
  };
  T.SelectField = function (p) {
    if (p.label && p.labelVisible && (p.placeholder === undefined || GENERIC[p.placeholder]))
      p = Object.assign({}, p, { placeholder: 'Chọn ' + p.label });
    return SF(p);
  };
})();
var COURT1 = 'Tòa án nhân dân khu vực 1 - Hà Nội';

/* ---------- khung ---------- */
/* thanh trạng thái giả lập 44px (chọn 02/11/2026: header màn con 120px gồm thanh trạng thái); màn có bảng từ đáy dùng thanh của màn nền */
function SBar() {
  return h('div', { className: 'ph-sb', 'aria-hidden': 'true' }, h('span', null, '9:41'),
    h('span', { className: 'ph-sb-ic' },
      h('svg', { viewBox: '0 0 18 12' }, h('rect', { x: 0, y: 8, width: 3, height: 4, rx: 1 }), h('rect', { x: 5, y: 5.5, width: 3, height: 6.5, rx: 1 }), h('rect', { x: 10, y: 3, width: 3, height: 9, rx: 1 }), h('rect', { x: 15, y: 0, width: 3, height: 12, rx: 1 })),
      h('svg', { viewBox: '0 0 16 12' }, h('path', { d: 'M8 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.3C13.5 1.5 10.9.4 8 .4S2.5 1.5.5 3.4l1.2 1.3C3.4 3.1 5.6 2.2 8 2.2zm0 3.6c1.4 0 2.7.5 3.7 1.4l1.2-1.3C11.6 4.7 9.9 4 8 4s-3.6.7-4.9 1.9l1.2 1.3C5.3 6.3 6.6 5.8 8 5.8zm0 3.6c.5 0 1 .2 1.3.5L8 11.6 6.7 9.9c.3-.3.8-.5 1.3-.5z' })),
      h('svg', { viewBox: '0 0 27 12' }, h('rect', { x: 0.5, y: 0.5, width: 22, height: 11, rx: 3, fill: 'none', stroke: 'currentColor', opacity: 0.4 }), h('rect', { x: 2, y: 2, width: 19, height: 8, rx: 1.5 }), h('rect', { x: 24, y: 4, width: 2, height: 4, rx: 1, opacity: 0.4 }))));
}
function Phone(p) { var dlg = p.cls && p.cls.indexOf('ph-dlg') >= 0; return h('div', { className: 'ph' + (p.cls ? ' ' + p.cls : '') }, dlg ? null : SBar(), p.children); }
function Body(p) { return h('div', { className: 'ph-body' + (p.cls ? ' ' + p.cls : '') }, p.children); }
/* thanh điều hướng 4 mục, chỉ biểu tượng (chọn 02/11/2026: bỏ nút Nộp đơn và tên mục) */
/* v260 (05/11/2026): thanh điều hướng hiện tên – Trang chủ · Hồ sơ · Hộp thư · Cài đặt (đổi biểu tượng người → menu 3 gạch) */
var NAV = [{ key: 'home', icon: 'home', label: 'Trang chủ' }, { key: 'records', icon: 'folder', label: 'Hồ sơ' }, { key: 'inbox', icon: 'mail', label: 'Hộp thư' }, { key: 'me', icon: 'menu', label: 'Cài đặt' }];
function Nav(active) { return h('div', { className: 'ph-nav' }, h(T.BottomNav, { active: active, items: NAV, labels: true })); }
/* màn chính của thanh điều hướng */
function Main(active, title, children, actions) {
  return h(Phone, { cls: 'ph-main' },
    h(T.AppBar, { variant: 'page', title: title, actions: actions }),
    h(Body, { cls: 'tp-sheet' }, children), Nav(active));
}
/* màn con: header trắng (AppBar plain, phương án A), tùy chọn thanh nút ở đáy */
function Sub(title, children, footer, actions) {
  return h(Phone, { cls: 'ph-hd' },
    h(T.AppBar, { variant: 'plain', title: title, onBack: noop, actions: actions }),
    h(Body, { cls: 'ph-plain' }, children),
    footer ? h('div', { className: 'ph-foot' }, footer) : null);
}
function Bar() { return h.apply(null, [T.ActionBar, null].concat([].slice.call(arguments))); }
function Btn(label, v, extra) { return h(T.Button, Object.assign({ variant: v || 'primary' }, extra || {}), label); }
function Card(p) { return h('div', { className: 'ph-card' + (p.cls ? ' ' + p.cls : '') }, p.children); }
function H2(t, action) { return h(T.SectionHeader, { variant: 'plain', title: t, action: action }); }
function Grp(t) { return h('p', { className: 'ph-grp' }, t); }
function P(t, cls) { return h('p', { className: 'ph-p' + (cls ? ' ' + cls : '') }, t); }
function Head(status, tone, code, title) {
  return h(Card, { cls: 'ph-head' }, h('div', { className: 'ph-head-top' }, h(T.StatusBadge, { tone: tone }, status), h('span', { className: 'ph-code tp-num' }, code)), h('p', { className: 'ph-head-title' }, title));
}
function Sec(no, title, children, open, status) {
  return h(T.FormSection, { title: (no ? no + '. ' : '') + title, defaultOpen: !!open, status: status }, children);
}
/* khối trắng gom một nhóm thông tin; o: {action, flush, cls} */
function Blk(title, children, o) {
  o = o || {};
  return h('section', { className: 'ph-blk' + (o.flush ? ' ph-blk-flush' : '') + (o.cls ? ' ' + o.cls : '') },
    (title || o.action) ? h('div', { className: 'ph-blk-head' }, title ? h('h3', null, title) : h('span'), o.action || null) : null, children);
}
/* khối bộ lọc: chip, ô tìm, số kết quả */
function Filt() { return h('section', { className: 'ph-blk ph-blk-filter' }, [].slice.call(arguments)); }
function Steps(steps, cur) { return h('section', { className: 'ph-blk ph-blk-step' }, h(T.Stepper, { steps: steps, current: cur })); }
function Add(label) { return h(T.Button, { variant: 'ghost', size: 'sm', icon: 'plus' }, label || 'Thêm'); }
/* v232 (04/11/2026): logic chung màn chi tiết – luôn hiện đủ nhãn, giá trị trống (null, '', '—') hiển thị '-' */
function vd(v) { return v === null || v === undefined || v === false || (typeof v === 'string' && (!v.trim() || v.trim() === '—')) ? '-' : v; }
function Rows(items) { return h(T.InfoList, { variant: 'rows', items: items.map(function (r) { return { label: r[0], value: vd(r[1]), mono: r[2] }; }) }); }
/* bảng chọn từ đáy đặt trên nền màn hình */
function SheetOver(bg, title, desc, body, footer) {
  return h(Phone, { cls: 'ph-dlg' }, bg, h(T.Dialog, { inline: true, variant: 'sheet', title: title, description: desc, onClose: noop, footer: footer }, body));
}
/* header Trang chủ (02/11/2026, kiểu Hồ sơ/Cá nhân, không tiêu đề): lời chào 16px + chuông, vai trò, Định danh VNeID; nội dung là tấm bo góc đè lên header */
function HomeBg() {
  return h('div', { className: 'ph-me-top ph-home-hd' },
    h(T.HomeHeader, { brand: false, greeting: 'Xin chào, ' + (laTC() ? TC_TEN : 'Hoàng Dương'), role: laTC() ? 'Tổ chức' : 'Công dân' /* v333 */, canSwitchRole: true, subtitle: 'Định danh VNeID', unread: true }));
}
function MenuSheet(title, desc, items, bg) {
  return SheetOver(bg || HomeBg(), title, desc, h(T.MenuList, { items: items.map(function (i) { return { illustration: i[0], label: i[1], description: i[2] }; }) }));
}

/* ---------- Trang chủ ---------- */
var TASKS = [
  { day: '25', month: 'T10', title: 'Văn bản tống đạt có thời hạn', code: 'DS-2026-0012', remain: 'Còn 2 ngày', status: 'Sắp hết hạn', tone: 'warning' },
  { day: '26', month: 'T10', title: 'Bổ sung tài liệu, chứng cứ', code: 'DS-2026-0018', remain: 'Còn 3 ngày', status: 'Sắp hết hạn', tone: 'warning' },
  { day: '30', month: 'T10', title: 'Theo dõi tạm ứng án phí', code: 'DS-2026-0012', remain: 'Còn 7 ngày', status: 'Trong hạn' },
  { day: '28', month: 'T10', title: 'Ký số đơn khởi kiện', code: 'DS-2026-0021', remain: 'Còn 5 ngày', status: 'Chờ ký số' },
  { day: '29', month: 'T10', title: 'Xác nhận đơn đồng yêu cầu', code: 'DS-2026-0022', remain: 'Còn 6 ngày', status: 'Chờ xác nhận' },
  { day: '28', month: 'T10', title: 'Xác nhận tham dự phiên tòa', code: 'DS-2026-0012', remain: 'Còn 5 ngày', status: 'Chưa xác nhận' },
  { day: '26', month: 'T10', title: 'Lịch hòa giải, đối thoại', code: 'DS-2026-0018', remain: 'Còn 3 ngày', status: 'Sắp diễn ra', tone: 'warning' },
  { day: '—', month: '', title: 'Đánh giá mức độ hài lòng', code: 'DS-2026-0008', remain: 'Không có thời hạn', status: 'Chưa đánh giá' }];
var TASK_TABS = [{ key: 'all', label: 'Tất cả', count: 8 }, { key: 'td', label: 'Tống đạt', count: 1 }, { key: 'hs', label: 'Hồ sơ và đơn', count: 3 }, { key: 'ap', label: 'Nộp án phí, lệ phí', count: 1 }, { key: 'k', label: 'Khác', count: 3 }];
/* Việc cần làm – màn riêng (03/11/2026, theo ảnh web): khối "Phân bố mức độ khẩn cấp thời hạn tố tụng" (thanh tỉ lệ đỏ/vàng/xanh + 3 ô Đã quá hạn / Sắp hết hạn / Trong hạn an toàn có số đếm) → thanh lọc theo nhóm có số đếm → danh sách thẻ (ô biểu tượng theo loại, nhãn loại, mã hồ sơ, hạn; tiêu đề đậm; nút hành động đỏ) */
var VK = [
  { t: TASKS[0], nhom: 'td', loai: 'Tống đạt', ic: 'mail', han: 'Còn 2 ngày · hạn 25/10/2026', muc: 'sap', btn: 'Xem văn bản', go: 'mailDetail' },
  { t: TASKS[1], nhom: 'hs', loai: 'Bổ sung hồ sơ', ic: 'file', han: 'Còn 3 ngày · hạn 26/10/2026', muc: 'sap', btn: 'Bổ sung hồ sơ', go: 'evidence1' },
  { t: TASKS[2], nhom: 'ap', loai: 'Nộp tiền', ic: 'wallet', han: 'Còn 7 ngày · hạn 30/10/2026', muc: 'an', btn: 'Nộp tạm ứng', go: 'financeDetail' },
  { t: TASKS[3], nhom: 'hs', loai: 'Ký số', ic: 'pen', han: 'Còn 5 ngày · hạn 28/10/2026', muc: 'an', btn: 'Ký số', go: 'sub7' },
  { t: TASKS[4], nhom: 'hs', loai: 'Xác nhận đơn', ic: 'checkCircle', han: 'Còn 6 ngày · hạn 29/10/2026', muc: 'an', btn: 'Xác nhận', go: 'appDetail' },
  { t: TASKS[5], nhom: 'k', loai: 'Phiên tòa', ic: 'scale', han: 'Còn 5 ngày · hạn 28/10/2026', muc: 'an', btn: 'Xác nhận tham dự', go: 'attendReply' },
  { t: TASKS[6], nhom: 'k', loai: 'Hòa giải', ic: 'calendar', han: 'Còn 3 ngày · 26/10/2026', muc: 'sap', btn: 'Xem lịch', go: 'mediationDetail' },
  { t: TASKS[7], nhom: 'k', loai: 'Đánh giá', ic: 'star', han: 'Không có thời hạn', muc: 'an', btn: 'Đánh giá', go: 'rating' }];
var VK_MUC = [['qua', 'Đã quá hạn', 'Cần xử lý ngay', 'alert'], ['sap', 'Sắp hết hạn', 'Cần lưu ý', 'clock'], ['an', 'Trong hạn an toàn', 'Còn thời gian', 'check']];
function TasksAll() {
  var tab = React.useState('all');
  var dem = {}; VK_MUC.forEach(function (m) { dem[m[0]] = VK.filter(function (x) { return x.muc === m[0]; }).length; });
  var ds = VK.filter(function (x) { return tab[0] === 'all' || x.nhom === tab[0]; });
  function so(n) { return (n < 10 ? '0' : '') + n; }
  return Sub('Việc cần làm', h(F, null,
    h('section', { className: 'ph-blk vk-sum' },
      h('h3', { className: 'vk-sum-h' }, h(T.Icon, { name: 'star' }), 'Phân bố mức độ khẩn cấp thời hạn tố tụng'),
      h('div', { className: 'vk-bar', role: 'img', 'aria-label': VK_MUC.map(function (m) { return m[1] + ' ' + dem[m[0]]; }).join(', ') }, VK_MUC.map(function (m) { return dem[m[0]] ? h('i', { key: m[0], className: 'vk-bar-' + m[0], style: { flexGrow: dem[m[0]] } }) : null; })),
      /* phương án A (chọn 03/11/2026): dưới thanh tỉ lệ là 3 dòng chú giải – chấm màu, tên mức đậm + mô tả xám, số đếm căn phải */
      h('ul', { className: 'vk-leg' }, VK_MUC.map(function (m) {
        return h('li', { key: m[0], className: 'vk-leg-' + m[0] }, h('span', { className: 'vk-leg-dot', 'aria-hidden': 'true' }), h('span', { className: 'vk-leg-t' }, h('b', null, m[1]), h('small', null, m[2])), h('b', { className: 'vk-leg-n tp-num' }, dem[m[0]]));
      }))),
    h('div', { className: 'vk-tabs' }, h(T.Tabs, { variant: 'chip', label: 'Phân loại việc cần làm', value: tab[0], onChange: tab[1], items: TASK_TABS })),
    /* v143: bỏ dòng "n việc cần làm"; thanh lọc nhóm cố định khi cuộn lên tới header */
    h('ul', { className: 'vk-list' }, ds.map(VkCardFull))));
}
/* v191 (04/11/2026, theo ảnh): thẻ việc ở màn riêng – ô biểu tượng trái; nhãn loại (chip xám) + mã hồ sơ; tiêu đề đậm; dòng hạn tô theo mức; kẻ mảnh; liên kết hành động đỏ có mũi tên. Trang chủ giữ VkCard */
function VkCardFull(x) {
  var coHan = x.han !== 'Không có thời hạn';
  return h('li', { key: x.t.title, className: 'vk-card vkb' },
    h('span', { className: 'vk-ic vkb-ic vk-ic-' + x.muc, 'aria-hidden': 'true' }, h(T.Icon, { name: x.ic })),
    h('div', { className: 'vkb-tx' },
      h('p', { className: 'vkb-h' }, h('span', { className: 'vk-tag' }, x.loai), h('span', { className: 'vk-code tp-num' }, x.t.code)),
      h('b', { className: 'vkb-t' }, x.t.title),
      h('p', { className: 'vkb-han' + (coHan ? ' vka-han vka-han-' + x.muc : '') }, x.han),
      h('button', { type: 'button', className: 'vkb-go', 'data-pt-go': x.go, 'aria-label': x.btn + ': ' + x.t.title }, x.btn, h(T.Icon, { name: 'chevronRight' }))));
}
/* 03/11/2026 (v141): thẻ việc dùng chung cho Trang chủ và màn Xem tất cả; dòng hạn tô theo mức (quá hạn đỏ, sắp hết hạn cam, trong hạn xanh – bộ màu trạng thái hiện có, cùng màu nhãn hạn ở thẻ Hộp thư); "Không có thời hạn" chữ xám */
/* 03/11/2026 (v160, phương án A tách thẻ riêng): biểu tượng nhỏ theo mức hạn, tên 1 dòng, dòng phụ loại · mã · còn n ngày (tô màu), mũi tên; bấm cả thẻ */
function VkCard(x) {
  var con = x.han.split(' · ')[0], coHan = x.han !== 'Không có thời hạn';
  return h('li', { key: x.t.title, className: 'vk-card vka' }, h('button', { type: 'button', className: 'vka-b', 'data-pt-go': x.go, 'aria-label': x.btn + ': ' + x.t.title },
    h('span', { className: 'vk-ic vka-ic vk-ic-' + x.muc, 'aria-hidden': 'true' }, h(T.Icon, { name: x.ic })),
    h('span', { className: 'vka-tx' }, h('b', null, x.t.title), h('small', null, x.loai + ' · ', h('span', { className: 'tp-num' }, x.t.code), ' · ', h('span', { className: coHan ? 'vka-han vka-han-' + x.muc : 'vka-han' }, con))),
    h(T.Icon, { name: 'chevronRight' })));
}
/* Trang chủ theo web /trang-chu (develop df77959): header → 4 ô dịch vụ → nhắc cam kết GDĐT → Việc cần làm → Lịch sắp tới → Tin tức & thông báo */
/* Trang chủ theo ảnh thiết kế 30/10/2026: banner trượt, 4 thẻ lớn, 8 ô "Dịch vụ khác" (không số đếm); thanh điều hướng 5 mục như các màn chính (đổi lại 02/11/2026) */
/* thẻ Nộp đơn khởi kiện cả hàng, nền ảnh và nội dung banner (02/11/2026) */
/* 03/11/2026: bỏ dòng "Tòa án điện tử" */
var BANNER_HOME = [{ title: 'Nộp đơn khởi kiện trực tuyến', description: 'Theo dõi tiến độ vụ việc theo thời gian thực', cta: 'Nộp đơn ngay' }];
/* Dịch vụ trực tuyến (02/11/2026): 8 ô, lưới 4 × 2 */
/* tên ô ngắt dòng cố định (\n) theo yêu cầu 02/11/2026 */
/* 03/11/2026 (v157): đổi tên khối thành Dịch vụ và hỗ trợ; bỏ ô Nộp đơn khởi kiện (đã có banner); thêm ô Đánh giá ở cuối */
/* 03/11/2026 (v159): đổi chỗ Trợ giúp pháp lý và Đánh giá – Đánh giá ở cuối */
/* 04/11/2026 (v190): thứ tự mới – Đăng ký lịch tiếp dân (bổ sung), Lịch phiên tòa, Cấp trích lục, Khiếu nại tố cáo | Chữ ký số, Phương thức giao dịch, Trợ giúp pháp lý; bỏ Phản ánh kiến nghị; Đánh giá chuyển sang Cá nhân (đã có mục Đánh giá mức độ hài lòng) */
var HOME_TILES = [['lichTiepDan', 'Đăng ký lịch\ntiếp dân'], ['lichXetXu', 'Lịch\ntố tụng'] /* v287 */, ['trichLuc', 'Cấp trích lục,\nbản sao'], ['khieuNai', 'Khiếu nại,\ntố cáo']]; /* v191: bỏ Chữ ký số, Phương thức giao dịch, Trợ giúp pháp lý – còn 4 ô */
/* chỉ hiện khi tài khoản chưa ký cam kết; đóng thì ẩn trong phiên */
/* v170 (người dùng chọn F): khối nhắc cam kết dạng banner nền đỏ nhạt – tiêu đề + nút nhỏ bên trái, hình minh họa lớn bên phải; nút đóng chỉ ở Trang chủ */
function CkBanner(p) {
  return h('section', { className: 'ckb', role: 'status' },
    h('div', { className: 'ckb-tx' }, h('p', { className: 'ckb-t' }, 'Bạn chưa hoàn thiện cam kết giao dịch điện tử'), h(T.Button, { size: 'sm', onClick: p.onAction }, 'Xác nhận cam kết ngay')),
    h('span', { className: 'ckb-art', 'aria-hidden': 'true' }, h(T.Illustration, { name: 'yeuCau' })),
    p.onClose ? h('button', { type: 'button', className: 'ckb-x', 'aria-label': 'Đóng thông báo', onClick: p.onClose }, h(T.Icon, { name: 'x' })) : null);
}
function CommitNotice() {
  var st = React.useState(true);
  return st[0] ? h(CkBanner, { onClose: function () { st[1](false); } }) : null;
}
/* v281 (09/11/2026): sau khi đăng nhập, tài khoản chưa ký cam kết → hiện ngay hộp yêu cầu ký cam kết giữa màn Trang chủ; lớp phủ chặn mọi chức năng khác
   (bấm lớp phủ không làm gì). Nút "Xác nhận cam kết ngay" mở màn Cam kết; nút ✕ tạm giữ để đi tiếp trong prototype. Cờ bật khi bấm nút ở màn Đăng nhập. */
window.__ckPopup = false;
document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('button'); if (b && b.closest('.ph-login')) window.__ckPopup = true; }, true);
function CkPopup() {
  var st = React.useState(!!window.__ckPopup), tat = function () { window.__ckPopup = false; st[1](false); };
  if (!st[0]) return null;
  return h('div', { className: 'tp-dlg-wrap tp-dlg-inline ck-pop' }, h('div', { className: 'ph-scrim ck-pop-scrim', 'aria-hidden': 'true' }),
    h('div', { className: 'tp-dlg tp-dlg-center ck-pop-dlg', role: 'alertdialog', 'aria-modal': 'true', 'aria-labelledby': 'ck-pop-t' },
      h('button', { type: 'button', className: 'tp-icon-btn ck-pop-x', 'aria-label': 'Đóng', onClick: tat }, h(T.Icon, { name: 'x' })),
      h('span', { className: 'tp-illo-circle ck-pop-art', 'aria-hidden': 'true' }, h(T.Illustration, { name: 'yeuCau' })),
      h('h3', { id: 'ck-pop-t' }, 'Bạn chưa hoàn thiện', h('br'), 'cam kết giao dịch điện tử'), /* v282 */
      h('p', null, 'Xác nhận cam kết theo (các) vai trò tham gia tố tụng để nộp đơn và nhận tống đạt văn bản điện tử.'),
      h(T.Button, { block: true, 'data-pt-go': 'commitFormNew', onPointerDown: function () { window.__ckPopup = false; } }, 'Ký cam kết ngay')));
}
function Home(all) {
  return h(Phone, { cls: 'ph-main' },
    HomeBg(),
    h(Body, { cls: 'tp-sheet ph-home-sheet' },
      h(T.BannerCarousel, { slides: [Object.assign({ imageSrc: HERO || undefined }, BANNER_HOME[0])] }),
      Blk('Dịch vụ và hỗ trợ', h('div', { className: 'tp-tile-grid tp-tile-grid-illo ph-svc' }, HOME_TILES.map(function (x) { return h(T.ServiceTile, { key: x[1], illustration: x[0], label: x[1] }); }))),
      /* v282: bỏ khối nhắc cam kết ở Trang chủ (đã có hộp yêu cầu ký cam kết sau đăng nhập) */
      /* 03/11/2026: bỏ thanh lọc nhóm ở Trang chủ – chỉ có ở màn Việc cần làm */
      /* 03/11/2026 (v141): khối Việc cần làm dùng thẻ như màn Xem tất cả (thay TaskList ô ngày) */
      Blk('Việc cần làm', h('ul', { className: 'vk-list' }, (all ? VK : VK.slice(0, 3)).map(VkCard)), { action: h(T.LinkArrow, { arrow: false }, all ? 'Thu gọn' : 'Xem tất cả') }),
),
    Nav('home'), all ? null : h(CkPopup));
}

/* ---------- bảng chọn ---------- */
var SHEETS = {
  services: ['Dịch vụ tư pháp', 'Lựa chọn dịch vụ cần thực hiện.', [['nopDon', 'Nộp đơn trực tuyến', 'Khởi kiện, yêu cầu và các loại đơn'], ['hoaGiai', 'Hòa giải, đối thoại', 'Theo dõi vụ việc trước khi thụ lý'], ['chungCu', 'Giao nộp tài liệu, chứng cứ', 'Bổ sung tài liệu cho đơn, vụ án'], ['trichLuc', 'Cấp trích lục, bản sao', 'Gửi yêu cầu và theo dõi kết quả'], ['khieuNai', 'Khiếu nại, tố cáo', 'Nộp đơn và theo dõi giải quyết'], ['anPhi', 'Nghĩa vụ tài chính', 'Án phí, lệ phí và các khoản phải nộp'], ['lichTiepDan', 'Tiếp công dân', 'Đăng ký và quản lý lịch hẹn'], ['huongDan', 'Tra cứu và hỗ trợ', 'Thủ tục, tài liệu, trợ giúp pháp lý']]],
  copies: ['Trích lục, bản sao', 'Yêu cầu cấp tài liệu của Tòa án.', [['trichLuc', 'Yêu cầu cấp trích lục', 'Bản án, quyết định của Tòa án'], ['banSao', 'Yêu cầu cấp bản sao', 'Bản án, quyết định của Tòa án'], ['saoChup', 'Sao chụp tài liệu, chứng cứ', 'Tài liệu trong hồ sơ có liên quan'], ['traCuuHoSo', 'Theo dõi yêu cầu', 'Trạng thái tiếp nhận, xử lý và kết quả']]],
  complaints: ['Khiếu nại, tố cáo', 'Gửi đơn và theo dõi quá trình giải quyết.', [['khieuNai', 'Nộp đơn khiếu nại', 'Khiếu nại theo nhóm thủ tục'], ['toCao', 'Nộp đơn tố cáo', 'Thực hiện quyền tố cáo'], ['traCuuHoSo', 'Theo dõi đơn đã gửi', 'Tình trạng tiếp nhận và kết quả giải quyết']]],
  mediation: ['Hòa giải, đối thoại', 'Các chức năng đối với vụ việc đang tham gia.', [['hoaGiai', 'Vụ việc hòa giải, đối thoại', 'Theo dõi tình trạng và kết quả'], ['lichHen', 'Lịch hòa giải, đối thoại', 'Lịch làm việc của vụ việc'], ['doiNguoi', 'Thay đổi hòa giải viên', 'Đề nghị thay đổi theo vụ việc'], ['hoan', 'Đề nghị hoãn', 'Đề nghị hoãn phiên hòa giải, đối thoại'], ['xemXet', 'Xem xét lại công nhận hòa giải', 'Yêu cầu đối với kết quả công nhận'], ['banAn', 'Chuyển sang thụ lý', 'Khi hòa giải, đối thoại không thành']]],
  reception: ['Tiếp công dân', 'Lịch hẹn tiếp công dân tại Tòa án.', [['lichTiepDan', 'Đăng ký lịch tiếp công dân', 'Chọn nhu cầu đăng ký lịch hẹn'], ['doiLich', 'Thay đổi, hủy lịch hẹn', 'Quản lý lịch đã đăng ký'], ['lichHen', 'Xác nhận lịch hẹn', 'Theo dõi thông tin xác nhận']]],
  support: ['Tra cứu và hỗ trợ', 'Tìm hiểu trước khi thực hiện thủ tục.', [['huongDan', 'Hướng dẫn thủ tục', 'Thông tin về trình tự và thủ tục'], ['huongDanSD', 'Hướng dẫn sử dụng', 'Tài liệu và video thao tác trên Cổng'], ['hoTro', 'Trợ giúp pháp lý', 'Thông tin và điều kiện trợ giúp'], ['hoiDap', 'Câu hỏi thường gặp', 'Giải đáp những vấn đề phổ biến'], ['tinTuc', 'Tin tức', 'Thông tin hoạt động của Tòa án'], ['danhGia', 'Đánh giá mức độ hài lòng', 'Đánh giá chất lượng cung cấp dịch vụ']]],
  'application-list': ['Danh sách đơn và tiến trình', 'Chọn loại đơn cần theo dõi.', [['nopDon', 'Đơn khởi kiện', 'Theo dõi đơn khởi kiện đã tạo'], ['yeuCau', 'Đơn yêu cầu việc dân sự', 'Theo dõi yêu cầu giải quyết việc dân sự'], ['phaSan', 'Đơn yêu cầu phá sản, phục hồi', 'Theo dõi đơn theo nhóm thủ tục'], ['phanTo', 'Đơn phản tố, yêu cầu độc lập', 'Các đơn trong vụ án đang tham gia']]]
};
function Sheet(k, bg) { var s = SHEETS[k]; return MenuSheet(s[0], s[1], s[2], bg); }

/* ---------- Trung tâm thông báo ---------- */
var NOTI_TODAY = [
  { time: '09:45', title: 'Sắp đến hạn bổ sung tài liệu, chứng cứ', description: 'Tổng quan hồ sơ cần bổ sung tài liệu trước ngày 26/10/2026.', code: 'DS-2026-0018', unread: true },
  { time: '08:30', title: 'Tòa án gửi văn bản tống đạt', description: 'Văn bản mới đã được gửi đến Hộp thư tống đạt.', code: 'DS-2026-0012', unread: true },
  { time: '08:00', title: 'Đơn khởi kiện đã được tiếp nhận', description: 'Theo dõi trạng thái xử lý trong Quản lý đơn.', code: 'DS-2026-0021' }];
var NOTI_YDAY = [
  { time: '16:00', title: 'Lịch phiên tòa được cập nhật', description: 'Vui lòng xem lịch phiên tòa, phiên họp và phản hồi tham dự.', code: 'DS-2026-0012', unread: true },
  { time: '10:15', title: 'Nhắc hạn tạm ứng án phí', description: 'Theo dõi nghĩa vụ tài chính và thời hạn nộp tạm ứng án phí.', code: 'DS-2026-0012', unread: true }];
function NotiRow() { var v = React.useState('a'); return h(StRow, { label: 'Lọc thông báo', value: v[0], onChange: v[1], items: [{ key: 'a', label: 'Tất cả' }, { key: 'u', label: 'Chưa đọc', count: 3 }, { key: 'r', label: 'Đã đọc' }] }); }
/* v266 (05/11/2026): Trung tâm thông báo vẽ lại, đổi tên chức năng thành "Thông báo"; bỏ biểu tượng đầu thẻ (chưa đọc: chấm đỏ trước tên + chữ đậm) – hàng chip Tất cả / Chưa đọc / Đã đọc + Mới nhất; nhóm Hôm nay / Hôm qua là nhãn xám; danh sách tràn mép:
   biểu tượng chuông nền xám + chấm đỏ khi chưa đọc, tên đậm khi chưa đọc, giờ bên phải, mô tả 1 dòng, mã hồ sơ dạng nhãn xám; bỏ "Đánh dấu tất cả đã đọc".
   Nhấn giữ 0,5 giây để chọn (ô tick đầu dòng) – thanh ghim đáy "✕ · Đã chọn N thông báo · Đánh dấu đã đọc" như Hộp thư (v257) */
var NOTI_GO = { 'Sắp đến hạn bổ sung tài liệu, chứng cứ': 'evidence1', 'Tòa án gửi văn bản tống đạt': 'mailDetail', 'Đơn khởi kiện đã được tiếp nhận': 'appDetail', 'Lịch phiên tòa được cập nhật': 'calDue', 'Nhắc hạn tạm ứng án phí': 'financeDetail' };
function NotiItem(p) {
  var x = p.x, tm = React.useRef(null), held = React.useRef(false), huy = function () { clearTimeout(tm.current); }, chon = p.sel !== undefined;
  return h('li', { className: 'nt-it' + (x.unread ? ' nt-un' : '') },
    h('button', { type: 'button', className: 'ph-mail2-hit', role: chon ? 'checkbox' : undefined, 'aria-checked': chon ? !!p.sel : undefined, 'aria-label': (chon ? 'Chọn: ' : (x.unread ? 'Chưa đọc. ' : '')) + x.title, 'data-pt-go': chon ? undefined : NOTI_GO[x.title],
      onPointerDown: function () { if (chon) return; held.current = false; tm.current = setTimeout(function () { held.current = true; p.onHold(x); }, 500); },
      onPointerUp: huy, onPointerLeave: huy, onPointerCancel: huy, onContextMenu: function (e) { e.preventDefault(); },
      onClickCapture: function (e) { if (held.current) { held.current = false; e.preventDefault(); e.stopPropagation(); return; } if (chon) { e.preventDefault(); e.stopPropagation(); p.onTick(x); } } }),
    chon ? h('span', { className: 'ib-ck nt-ck' + (p.sel ? ' on' : ''), 'aria-hidden': 'true' }, p.sel ? h(T.Icon, { name: 'check' }) : null) : null,
    h('span', { className: 'nt-tx' }, h('span', { className: 'nt-t1' }, h('b', null, x.unread ? h('i', { className: 'ib-dot' }) : null, x.title), h('small', { className: 'tp-num' }, x.time)),
      h('span', { className: 'nt-d' }, x.description), h('span', { className: 'nt-code tp-num' }, x.code)));
}
function NotiScr() {
  var chon = React.useState(null), rr = React.useState(0);
  var giu = function (x) { chon[1]([x]); };
  var tick = function (x) { var c = chon[0] || [], n = c.indexOf(x) >= 0 ? c.filter(function (y) { return y !== x; }) : c.concat([x]); chon[1](n.length ? n : null); };
  var doc = function () { var c = chon[0] || []; c.forEach(function (x) { x.unread = false; }); chon[1](null); rr[1](rr[0] + 1); if (window.__ptSnack) window.__ptSnack('Đã đánh dấu đã đọc ' + c.length + ' thông báo.'); };
  var nhom = function (t, list) { return h(F, { key: t }, h('p', { className: 'nt-gh' }, t), h('ul', { className: 'nt-list' }, list.map(function (x) { return h(NotiItem, { key: x.title, x: x, sel: chon[0] ? chon[0].indexOf(x) >= 0 : undefined, onHold: giu, onTick: tick }); }))); };
  return h(Phone, { cls: 'ph-hd' }, h(T.AppBar, { variant: 'plain', title: 'Thông báo', onBack: noop }),
    h(Body, { cls: 'ph-plain nt-body' }, h(NotiRow), nhom('Hôm nay', NOTI_TODAY), nhom('Hôm qua', NOTI_YDAY)),
    chon[0] ? h('div', { className: 'ib-chon-bar', role: 'toolbar', 'aria-label': 'Thao tác với thông báo đã chọn' },
      h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Bỏ chọn', onClick: function () { chon[1](null); } }, h(T.Icon, { name: 'x' })),
      h('b', { role: 'status' }, 'Đã chọn ' + chon[0].length + ' thông báo'),
      h(T.Button, { size: 'sm', icon: 'check', onClick: doc }, 'Đánh dấu đã đọc')) : null);
}
function Notifications() { return h(NotiScr); }
function NotiSettings() {
  return h(Phone, { cls: 'ph-dlg' }, Notifications(), h(T.Dialog, { inline: true, variant: 'sheet', title: 'Cài đặt thông báo', description: 'Lựa chọn nhóm thông báo cần tiếp nhận.', onClose: noop, footer: h(F, null, Btn('Hủy', 'tonal'), Btn('Lưu tùy chọn')) },
    h(T.Checkbox, { defaultChecked: true, label: h('span', null, h('b', { className: 'ph-b' }, 'Thông báo từ Tòa án'), h('br'), 'Tiếp nhận thông báo, quyết định và văn bản do Tòa án gửi.') }),
    h(T.Checkbox, { defaultChecked: true, label: h('span', null, h('b', { className: 'ph-b' }, 'Nhắc hạn'), h('br'), 'Nhắc các mốc thời hạn sắp đến hoặc quá hạn.') })));
}

/* ---------- Lịch: v199 thay bằng Quản lý lịch, phiên tòa (s5 mục 11) ---------- */

/* v333 (12/11/2026): 2 luồng theo loại tài khoản – Cá nhân / Tổ chức, chọn ở màn Đăng nhập (mặc định Cá nhân; tải lại trang về Cá nhân).
   Theo web: loaiTaiKhoan === 'DoanhNghiep' → tổ chức (Ko), tên hiển thị tên tổ chức (Jo), nhãn vai trò "Tổ chức" / "Công dân" (Yo), "Hồ sơ tổ chức" / "Hồ sơ cá nhân" (Xo) */
var LOAI_TK = 'cn', TC_TEN = 'Công ty ABC', TC_TAT = 'CA';
function laTC() { return LOAI_TK === 'tc'; }
function datLoaiTK(v) { LOAI_TK = v; }
