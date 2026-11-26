
/* DEMO 25/11/2026: hộp xác nhận khi bấm ‹ ở màn soạn đơn (app: hooks/useConfirmExitWizard.tsx – Alert 3 lựa chọn Lưu nháp / Thoát / Ở lại) */
(function () {
  var TT = 'Thoát khi chưa hoàn tất?', MT = 'Bạn có muốn lưu nháp nội dung đang nhập trước khi thoát không?';
  function HopGiua(p) {
    return h('div', { className: 'tp-dlg-wrap tp-dlg-inline ph-draft' }, h('div', { className: 'ph-scrim' }),
      h('div', { className: 'ph-draft-box', role: 'alertdialog', 'aria-modal': 'true' },
        p.x ? h('button', { type: 'button', className: 'tp-icon-btn ph-draft-x', 'aria-label': 'Ở lại' }, h(T.Icon, { name: 'x' })) : null,
        IlloBadge(['nopDon', 'alert']), h('p', { className: 'ph-draft-t' }, TT), h('p', { className: 'ph-draft-d' }, MT),
        h('div', { className: 'ph-draft-btns' }, h(T.Button, { block: true }, 'Lưu nháp và thoát'), h(T.Button, { block: true, variant: 'tonal' }, 'Thoát, không lưu'),
          p.o ? h(T.Button, { block: true, variant: 'ghost' }, 'Ở lại') : null)));
  }
  function HopDay() {
    return h(T.Dialog, { variant: 'sheet', inline: true, open: true, title: TT, description: MT, onClose: function () {},
      footer: h(F, null, h(T.Button, { variant: 'tonal' }, 'Thoát, không lưu'), h(T.Button, null, 'Lưu nháp và thoát')) });
  }
  var PA = [['A', 'PA A – hộp giữa màn, 2 nút + ✕ (Ở lại)', function () { return h(HopGiua, { x: 1 }); }],
    ['B', 'PA B – hộp giữa màn, 3 nút xếp dọc', function () { return h(HopGiua, { o: 1 }); }],
    ['C', 'PA C – bảng từ đáy, 2 nút + ✕ (Ở lại)', function () { return h(HopDay); }]];
  var ids = [];
  PA.forEach(function (p) { var id = 'thoat' + p[0];
    SCR[id] = [p[1], function () { return h(F, null, h(SCR.sub2[1]), h(XnTop, null, p[2]())); }]; BASE[id] = 'sub2'; ids.push(id); });
  GROUPS2.unshift(['DEMO – Bấm ‹ ở màn soạn đơn: hỏi lưu nháp trước khi thoát', ids]);
})();
