
/* DEMO 25/11/2026 (2): Status-color bỏ hồng, tím (st-18…24, st-29) – nhãn giữ kiểu cũ, chỉ đổi màu */
(function () {
  var BO = [18, 19, 20, 21, 22, 23, 24, 29];
  var P = []; for (var n = 1; n <= 30; n++) if (BO.indexOf(n) < 0 && n !== 30) P.push(n); /* 21 màu cho tình trạng */
  var TT_VA_MOI = Object.assign({}, SC_TT_VA, { 'Đang xét lại (GĐT / tái thẩm)': 17 });
  var TT_DON_MOI = Object.assign({}, SC_TT_DON, { 'Chờ ký số': 25 });
  var vaGoc = Object.assign({}, SC_TT_VA), donGoc = Object.assign({}, SC_TT_DON), soGoc = scSo;
  window.__scPa = 'A';
  function dat(pa) { window.__scPa = pa;
    Object.keys(SC_TT_VA).forEach(function (k) { delete SC_TT_VA[k]; }); Object.assign(SC_TT_VA, pa === 'A' ? TT_VA_MOI : vaGoc);
    Object.keys(SC_TT_DON).forEach(function (k) { delete SC_TT_DON[k]; }); Object.assign(SC_TT_DON, pa === 'A' ? TT_DON_MOI : donGoc);
    document.documentElement.classList.toggle('sc-paA', pa === 'A');
    document.querySelectorAll('[data-sc]').forEach(function (e) { e.removeAttribute('data-sc'); e.classList.remove('st-ti'); });
  }
  scSo = function (ds, s) { if (window.__scPa !== 'A') return soGoc(ds, s); var i = ds.indexOf(s); if (i < 0) { ds.push(s); i = ds.length - 1; } return P[(i * 5) % P.length]; };
  dat('A');
  var ids = [];
  [['vaBangMau', 'Bảng màu Vụ án và Đơn'], ['cases', 'Danh sách vụ án'], ['caseDetail', 'Chi tiết vụ án'], ['applications', 'Danh sách đơn'], ['appDetailFee', 'Chi tiết đơn – nộp tạm ứng án phí']].forEach(function (x) {
    ['B', 'A'].forEach(function (pa) { var id = 'sc2' + pa + x[0];
      SCR[id] = [(pa === 'A' ? 'Đề xuất – kiểu cũ, bỏ hồng tím – ' : 'v604 hiện tại – ') + x[1], function () { dat(pa); return h(SCR[x[0]][1]); }]; BASE[id] = BASE[x[0]] || 'home'; ids.push(id); });
  });
  GROUPS2.unshift(['DEMO – Status-color: giữ kiểu nhãn, bỏ hồng và tím', ids]);
})();
