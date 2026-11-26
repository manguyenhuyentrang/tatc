
/* DEMO 25/11/2026 (3): bộ màu 10 trạng thái Vụ án – Đình chỉ, Tạm đình chỉ nổi bật hơn (3 phương án) */
(function () {
  var DS = ['Đang giải quyết', 'Đã tuyên án - trong thời hạn kháng cáo', 'Bản án/quyết định có hiệu lực pháp luật', 'Tạm đình chỉ', 'Đình chỉ', 'Đang xét lại (GĐT / tái thẩm)', 'Đang xử lý đơn', 'Đang xử lý', 'Đã giải quyết', 'Đã xử lý'];
  var CU = { 'Đang giải quyết': 15, 'Đã tuyên án - trong thời hạn kháng cáo': 4, 'Bản án/quyết định có hiệu lực pháp luật': 9, 'Tạm đình chỉ': 3, 'Đình chỉ': 30, 'Đang xét lại (GĐT / tái thẩm)': 17, 'Đang xử lý đơn': 27, 'Đang xử lý': 13, 'Đã giải quyết': 11, 'Đã xử lý': 6 };
  /* mới: 8 trạng thái còn lại dùng tông lạnh / trầm; chỉ 2 trạng thái dừng dùng tông nóng */
  var MOI = { 'Đang giải quyết': 15, 'Đã tuyên án - trong thời hạn kháng cáo': 13, 'Bản án/quyết định có hiệu lực pháp luật': 9, 'Tạm đình chỉ': 4, 'Đình chỉ': 1, 'Đang xét lại (GĐT / tái thẩm)': 17, 'Đang xử lý đơn': 27, 'Đang xử lý': 16, 'Đã giải quyết': 11, 'Đã xử lý': 30 };
  var DUNG = ['Tạm đình chỉ', 'Đình chỉ'];
  function nhan(s, n, kieu) {
    var st = { '--c': 'var(--st-' + n + ')', '--t': 'var(--st-' + n + '-tint)', '--b': 'var(--st-' + n + '-border)' };
    return h('span', { className: 'tp-badge st-tt' + (kieu ? ' sc3-' + kieu : ''), style: st }, s);
  }
  function Khoi(p) {
    return h('section', null, h('h3', null, p.t), p.d ? h('p', { className: 'sc3-d' }, p.d) : null,
      h('ul', null, DS.map(function (s) { var n = p.m[s], dung = DUNG.indexOf(s) >= 0; return h('li', { key: s }, nhan(s, n, dung ? p.kieu : null), h('span', { className: 'sc-k' }, 'st-' + n)); })));
  }
  function Bang() {
    return Sub('Trạng thái Vụ án – đề xuất lại', h('div', { className: 'sc-bm' },
      h(Khoi, { t: 'Hiện tại', m: CU }),
      h(Khoi, { t: 'Chốt – Đình chỉ, Tạm đình chỉ cùng màu đỏ gạch st-1, kiểu PA B', d: 'Nền 16%, viền 45% màu chữ, chữ đậm 700. 8 trạng thái còn lại theo PA A.', m: Object.assign({}, MOI, { 'Tạm đình chỉ': 1 }), kieu: 'b' }),
      h(Khoi, { t: 'PA A – đổi màu', d: 'Đình chỉ đỏ gạch st-1, Tạm đình chỉ nâu vàng st-4; các trạng thái khác chuyển sang tông lạnh, trầm để 2 nhãn này tách ra. Kiểu nhãn giữ nguyên (nền, viền nhạt).', m: MOI }),
      h(Khoi, { t: 'PA B – đổi màu + nền, viền đậm hơn', d: 'Như PA A; riêng Đình chỉ, Tạm đình chỉ nền 16% và viền 45% màu chữ, chữ đậm 700.', m: MOI, kieu: 'b' }),
      h(Khoi, { t: 'PA C – đổi màu + nhãn đặc', d: 'Như PA A; riêng Đình chỉ, Tạm đình chỉ nền đặc màu st-N, chữ trắng.', m: MOI, kieu: 'c' }),
      h(Khoi, { t: 'PA C1 – nhãn đặc, màu tươi', d: 'Đình chỉ nền đỏ --danger (#b42318), chữ trắng 6,1:1. Tạm đình chỉ nền cam đậm --warning (#8c5a00), chữ trắng.', m: MOI, kieu: 'c1' }),
      h(Khoi, { t: 'PA C2 – nhãn đặc, đỏ + vàng', d: 'Đình chỉ nền đỏ --danger, chữ trắng. Tạm đình chỉ nền vàng --court-gold (#ffcd00), chữ đỏ sẫm --on-gold 10:1.', m: MOI, kieu: 'c2' })));
  }
  SCR.sc3Bang = ['Trạng thái Vụ án – Đình chỉ, Tạm đình chỉ nổi bật (PA A, B, C)', function () { return h(Bang); }]; BASE.sc3Bang = 'home';
  GROUPS2.unshift(['DEMO – Trạng thái Vụ án: Đình chỉ, Tạm đình chỉ nổi bật', ['sc3Bang']]);
})();
