
/* DEMO 25/11/2026 (2): hộp hỏi khi bấm ‹ cho các luồng soạn nhiều bước KHÔNG có "Lưu nháp" (v608 đã tự áp cho mọi màn có Lưu nháp trên thanh tiêu đề) */
(function () {
  function XnThoatKo() {
    return h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-draft' }, h('div', { className: 'ph-scrim' }),
      h('div', { className: 'ph-draft-box', role: 'alertdialog', 'aria-modal': 'true' },
        IlloBadge(['nopDon', 'alert']), h('p', { className: 'ph-draft-t' }, 'Thoát khi chưa hoàn tất?'),
        h('p', { className: 'ph-draft-d' }, 'Nội dung đang nhập sẽ không được lưu. Bạn có chắc muốn thoát không?'),
        h('div', { className: 'ph-draft-btns' }, h(T.Button, { block: true, className: 'xn-l' }, 'Ở lại'), h(T.Button, { block: true, variant: 'tonal', className: 'xn-l' }, 'Thoát, không lưu'))));
  }
  var L = [['evidence2', 'Giao nộp tài liệu, chứng cứ – bước 2'], ['kct2', 'Thay đổi, rút kháng cáo – bước 2'], ['bvd2', 'Đăng ký người bảo vệ – bước 2'], ['ptSus2', 'Yêu cầu tạm chuyển sang giấy – bước 2'], ['ptCan2', 'Chuyển giấy đến khi kết thúc hồ sơ – bước 2']];
  var ids = [];
  L.forEach(function (x) { var id = 'thoatKo_' + x[0];
    SCR[id] = ['Không có Lưu nháp – ' + x[1], function () { return h(F, null, h(SCR[x[0]][1]), h(XnTop, null, h(XnThoatKo))); }]; BASE[id] = BASE[x[0]] || 'home'; ids.push(id); });
  GROUPS2.unshift(['DEMO – Bấm ‹ ở luồng soạn không có Lưu nháp', ids]);
})();
