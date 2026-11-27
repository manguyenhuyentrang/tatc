/* DEMO 26/11/2026: case 1.18 (nút "Về danh sách" ở màn lỗi tải Chi tiết vụ án) và 1.30 (thẻ phiên tòa trong tab Lịch phiên tòa: a, b, c theo web phien-vu-an-section.tsx) */
(function () {
  var DM = { on: false };
  /* 1.18 */
  function Loi118() {
    return h(Phone, { cls: 'ph-hd' }, h(T.AppBar, { variant: 'plain', title: 'Chi tiết vụ án', onBack: noop }), h(Body, { cls: 'ph-plain dt-body' },
      VaLoi('Không tải được chi tiết vụ án.', null, h(T.Button, { size: 'sm', variant: 'secondary', icon: 'chevronLeft', 'data-pt-go': 'back' }, 'Về danh sách'))));
  }
  /* 1.30 – chỉ áp trong tab Lịch phiên tòa của Chi tiết vụ án (thẻ ở màn Lịch tố tụng giữ nguyên) */
  var vh0 = vaHear5;
  vaHear5 = function (k) {
    var ds = vh0(k);
    if (!DM.on) return ds;
    ds = ds.map(function (r) { return Object.assign({ dm: 1 }, r); });
    if (k === 'change') ds = [Object.assign({}, ds[0], { ls: [{ nhan: 'Đổi lịch', cu: '06-11-2026 14:00', moi: '13-11-2026 14:00', ghi: '03-11-2026 09:10', vb: '[Số thông báo]', lyDo: '[Lý do thay đổi lịch]' }] }),
      Object.assign({}, ds[0], { id: 'p1c', tg: '08:00 · 20-11-2026', con: 'Còn 16 ngày', han: '19-11-2026', moLai: true, giay: ['Giấy triệu tập', '[Số giấy triệu tập] · Đã tống đạt ngày 12-11-2026'] })];
    return ds;
  };
  var lc0 = LcDuCard;
  LcDuCard = function (r) {
    if (!r.dm) return lc0(r);
    var nhan = r.hoan ? ['Đã hoãn', 'danger'] : r.tamDung ? ['Tạm dừng · vụ án tạm đình chỉ', 'neutral'] : ['Sắp diễn ra', 'info'];
    return h('li', { key: r.id, className: 'qd-c lc-c' }, h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem chi tiết ' + r.ten, 'data-pt-go': r.go }),
      h('div', { className: 'tly-h' }, LcTag(r.loai), h('span', { style: { display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 6 } }, r.moLai ? h('span', { className: 'va4-tag va4-tag-cam' }, 'Mở lại sau tạm ngừng') : null /* (a) */, h(T.StatusBadge, { tone: nhan[1] }, nhan[0]))),
      h('b', { className: 'pt-c-t' }, r.ten), h('p', { className: 'pt-c-m' }, h('b', { className: 'tp-num' }, r.va), ' · ' + r.vaTen), h('p', { className: 'pt-c-m' }, 'Tư cách: ' + r.vt),
      r.hoan ? h('div', { className: 'lc-khan', role: 'alert' }, h(T.Icon, { name: 'alert' }), h('div', null, h('b', null, 'CẢNH BÁO KHẨN: Phiên tòa đã bị hoãn theo Quyết định của Tòa án'), h('p', null, 'Quyết định hoãn số ' + r.hoan.qd + '. Đương sự vui lòng không di chuyển đến trụ sở Tòa án.'), h('p', null, 'Lịch cũ: ' + r.tg + ' → Lịch mới: Tòa án sẽ thông báo sau'))) : null,
      h('ul', { className: 'lc-li' }, [['clock', r.tg + (r.con ? ' · ' + r.con : '')], ['mapPin', r.ht], ['building', r.toa], ['file', r.giay[0] + ' · ' + r.giay[1]]].map(function (x) { return h('li', { key: x[0] }, h(T.Icon, { name: x[0] }), x[1]); })),
      /* (c) chữ theo web */
      r.hoan || r.tamDung ? null : r.ph === 'VANG' ? h('p', { className: 'lc-ph lc-ph-vang' }, h(T.Icon, { name: 'checkCircle' }), 'Đã báo vắng mặt lúc ' + r.luc)
        : r.ph === 'HET' ? h('p', { className: 'lc-ph lc-ph-het' }, h(T.Icon, { name: 'clock' }), h('span', null, h('b', null, 'Hết hạn xác nhận. '), 'Đã hết thời hạn xác nhận trực tuyến. Vui lòng liên hệ trực tiếp Thư ký phiên tòa nếu có thay đổi đột xuất.'))
        : r.ph === 'CO_MAT' ? h('p', { className: 'lc-ph lc-ph-ok' }, h(T.Icon, { name: 'checkCircle' }), 'Đã xác nhận tham dự lúc ' + r.luc)
        : h('p', { className: 'lc-ph' }, h(T.Icon, { name: 'clock' }), 'Chưa trả lời · hạn ' + r.han),
      /* (a) lịch sử thay đổi lịch */
      r.ls ? h('div', { className: 'va4-ls' }, h('b', null, 'Lịch sử thay đổi lịch (' + r.ls.length + ' lần)'), r.ls.map(function (x, i) {
        return h('div', { key: i, className: 'va4-ls-i' }, h('span', { className: 'va4-tag va4-tag-vang' }, x.nhan),
          h('p', null, 'Lịch cũ ', h('b', null, x.cu), ' → Lịch mới ', h('b', null, x.moi), ' · ghi nhận ' + x.ghi + ' · văn bản ', h('b', { className: 'tp-num' }, x.vb)), h('p', { className: 'va4-ls-ld' }, 'Lý do: ' + x.lyDo));
      })) : null,
      r.hoan ? h('div', { className: 'lc-c-a' }, Btn('Xem thông báo hoãn', 'secondary', { size: 'sm', icon: 'file', 'data-pt-go': 'snack:Đang mở quyết định hoãn phiên tòa (PDF).' }), Btn('Chi tiết phiên', 'secondary', { size: 'sm', 'data-pt-go': r.go }))
        : h('div', { className: 'lc-c-a' }, r.ph === 'CHUA' ? Btn('Phản hồi tham dự', 'primary', { size: 'sm', 'data-pt-go': 'attendReply' }) : null,
          r.online && r.ph !== 'VANG' && !r.tamDung ? Btn('Vào phòng chờ trực tuyến', r.ph === 'CHUA' ? 'secondary' : 'primary', { size: 'sm', icon: 'arrowRight', 'data-pt-go': 'waitingRoom' }) : null,
          Btn('Xem văn bản gốc', 'secondary', { size: 'sm', icon: 'file', 'data-pt-go': 'snack:Đang mở ' + r.giay[0].toLowerCase() + ' (PDF).' }),
          Btn('Chi tiết phiên', 'secondary', { size: 'sm', 'data-pt-go': r.go }) /* (b) */));
  };
  function W(p) { DM.on = true; React.useEffect(function () { return function () { DM.on = false; }; }, []); return h(SCR[p.k][1]); }
  SCR.dm118 = ['1.18 – Lỗi tải chi tiết vụ án, có nút Về danh sách', function () { return h(Loi118); }]; BASE.dm118 = 'cases';
  SCR.caseDetailHearChange = SCR.caseDetailHearChange || ['Chi tiết vụ án – phiên đổi lịch', function () { return h(VuAnChiTiet, { tab0: 'hearings', hear: 'change' }); }];
  var L = [['caseDetailHear', 'chưa trả lời'], ['caseDetailHearOnline', 'trực tuyến'], ['caseDetailHearDone', 'đã xác nhận'], ['caseDetailHearExpired', 'hết hạn'], ['caseDetailHearChange', 'đổi lịch + mở lại sau tạm ngừng'], ['caseDetailHearPost', 'đã hoãn']], ids = ['dm118'];
  L.forEach(function (x) { var id = 'dm130_' + x[0]; SCR[id] = ['1.30 – Thẻ phiên tòa (' + x[1] + ')', function () { return h(W, { k: x[0] }); }]; BASE[id] = 'cases'; ids.push(id); });
  GROUPS2.unshift(['DEMO – Case 1.18, 1.30 (sheet 1 Vụ án)', ids]);
})();
