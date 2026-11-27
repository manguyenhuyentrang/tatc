/* DEMO 26/11/2026 (3): biến thể dựa trên PA 3 (khối xám) – : đầu màn Chi tiết vụ án theo kiểu Chi tiết đơn + "Lần thụ lý hiện tại" (web: chi-tiet.tsx, ct.cacLanThuLy[0].maVuAn ?? ct.maVuAn, chỉ hiện khi có mã hồ sơ) */
(function () {
  var css = [
    'html[data-dmpa] .va4-hd1 .va4-o{display:none}',
    'html[data-dmpa] .va4-hd1{gap:0}',
    'html[data-dmpa] .va4-hd1 .va4-ma,html[data-dmpa] .va4-hd1 .va4-loai{font:400 12px/16px var(--font-sans);color:var(--ink-subtle)}',
    'html[data-dmpa] .va4-hd1 .va4-loai{gap:0}',
    'html[data-dmpa] .va4-hd1 .va4-loai::before{content:" · ";white-space:pre;width:auto;height:auto;border-radius:0;background:none}',
    /* tình trạng dạng nhãn bo tròn (khi chọn) */
    'html[data-dmtinh=nhan] .dt-badges .st-ti{display:inline-flex;align-items:center;padding:3px 10px;border-radius:999px;background:var(--t);border:1px solid var(--b)}',
    'html[data-dmtinh=nhan] .dt-badges .st-ti::before{display:none}',
    /* PA 1: như web – tư cách nhãn xám + "Lần thụ lý hiện tại:" chữ xám, mã trong nhãn viền trắng, cùng hàng */
    '.dm-r1{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px}',
    '.dm-lan{font:400 12px/16px var(--font-sans);color:var(--ink-subtle)}',
    '.dm-lan-ma{display:inline-block;margin-left:4px;padding:1px 8px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);font:600 12px/16px var(--font-sans);color:var(--ink-muted)}',
    /* PA 2, 3: nhãn – giá trị hai dòng */
    '.dm-kv{margin:0;display:grid;grid-template-columns:auto 1fr;gap:4px 8px;font:400 12px/16px var(--font-sans)}',
    '.dm-kv dt{color:var(--ink-subtle)}.dm-kv dd{margin:0;color:var(--ink);font-weight:500}',
    '.dm-kv.dm-box{padding:8px 12px;border-radius:var(--radius-md,8px);background:var(--surface-sunken)}',
    /* 3A: cột 30% · 5% · 65%, 14px, giá trị chữ thường (như khối xem chi tiết) */
    '.dm-kv.dm-3a{grid-template-columns:30% 65%;column-gap:5%;row-gap:6px;font:400 14px/20px var(--font-sans)}.dm-kv.dm-3a dd{font-weight:400}',
    /* 3B: mỗi dòng có biểu tượng */
    '.dm-3b{display:flex;flex-direction:column;gap:6px;padding:8px 12px;border-radius:var(--radius-md,8px);background:var(--surface-sunken);font:400 12px/16px var(--font-sans)}',
    '.dm-3b p{margin:0;display:flex;align-items:center;gap:8px;color:var(--ink-subtle)}.dm-3b .tp-ico{width:16px;height:16px;flex:none;color:var(--ink-muted)}.dm-3b b{font-weight:500;color:var(--ink)}',
    /* 3C: hai ô cạnh nhau, nhãn trên – giá trị dưới */
    '.dm-3c{display:grid;grid-template-columns:1fr 1fr;gap:8px}.dm-3c div{padding:8px 12px;border-radius:var(--radius-md,8px);background:var(--surface-sunken);min-width:0}',
    '.dm-3c small{display:block;font:400 12px/16px var(--font-sans);color:var(--ink-subtle)}.dm-3c b{display:block;font:500 14px/20px var(--font-sans);color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'
  ].join('\n');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var MODE = { k: '', tinh: '' };
  var VaHead0 = VaHead;
  VaHead = function (p) {
    if (!MODE.k) return h(VaHead0, p);
    var v = p.va, cur = vaCapCur(v), allDone = v.cap.every(function (c) { return c[1] === 'done'; });
    var buoc = ['Thụ lý', 'Sơ thẩm', 'Phúc thẩm'], ci = allDone ? 3 : Math.max(1, buoc.indexOf(cur));
    var tc = p.vaiTro || v.vt, lan = v.ma;
    var dong = MODE.k === '3a' ? h('dl', { className: 'dm-kv dm-box dm-3a' }, h('dt', null, 'Tư cách của bạn'), h('dd', null, tc), h('dt', null, 'Lần thụ lý hiện tại'), h('dd', { className: 'tp-num' }, lan))
      : MODE.k === '3b' ? h('div', { className: 'dm-3b' }, h('p', null, h(T.Icon, { name: 'user' }), 'Tư cách của bạn:', h('b', null, tc)), h('p', null, h(T.Icon, { name: 'scale' }), 'Lần thụ lý hiện tại:', h('b', { className: 'tp-num' }, lan)))
      : MODE.k === '3c' ? h('div', { className: 'dm-3c' }, h('div', null, h('small', null, 'Tư cách của bạn'), h('b', null, tc)), h('div', null, h('small', null, 'Lần thụ lý hiện tại'), h('b', { className: 'tp-num', title: lan }, lan)))
      : MODE.k === '1'
      ? h('div', { className: 'dm-r1' }, h('span', { className: 'va4-vt' }, 'Tư cách của bạn: ' + tc), h('span', { className: 'dm-lan' }, 'Lần thụ lý hiện tại:', h('span', { className: 'dm-lan-ma tp-num' }, lan)))
      : h('dl', { className: 'dm-kv' + (MODE.k === '3' ? ' dm-box' : '') }, h('dt', null, 'Tư cách của bạn'), h('dd', null, tc), h('dt', null, 'Lần thụ lý hiện tại'), h('dd', { className: 'tp-num' }, lan));
    return h(F, null,
      h('div', { className: 'va4-hd1' }, h(VaO, { v: v }), h('span', { className: 'va4-ma tp-num' }, vaMaDd(v)), v.loai ? h('span', { className: 'va4-loai' }, v.loai) : null),
      h('h1', null, v.t), VaNhapDong(v, true),
      h('div', { className: 'dt-badges' }, VaNhanTT(v), v.tinh ? VaNhanTinh(v, true) : null),
      dong,
      p.banAn ? h(T.Button, { size: 'sm', icon: 'eye', className: 'va4-xba va4-xba-' + p.banAn, onClick: p.onBanAn }, p.banAn === 'dc' ? 'Xem quyết định đình chỉ' : 'Xem bản án') : null,
      h(T.CaseProgress, { label: 'Cấp xét xử', steps: buoc, current: ci }));
  };
  function Pa(p) {
    MODE.k = p.k; MODE.tinh = p.tinh;
    React.useEffect(function () { var e = document.documentElement;
      if (p.k) e.setAttribute('data-dmpa', p.k); else e.removeAttribute('data-dmpa');
      if (p.tinh) e.setAttribute('data-dmtinh', p.tinh); else e.removeAttribute('data-dmtinh');
      return function () { e.removeAttribute('data-dmpa'); e.removeAttribute('data-dmtinh'); MODE.k = ''; }; }, [p.k, p.tinh]);
    return h(CaseDetail);
  }
  var L = [['', '', 'Hiện tại (v609)'], ['3', '', 'PA 3 – hai dòng trong khối xám'], ['3a', '', 'PA 3A – cột 30/5/65'], ['3b', '', 'PA 3B – có biểu tượng'], ['3c', '', 'PA 3C – hai ô cạnh nhau']], ids = [];
  L.forEach(function (x) { var id = 'dmVa_' + (x[0] || 'cu'); SCR[id] = ['Đầu màn Chi tiết vụ án – ' + x[2], function () { return h(Pa, { k: x[0], tinh: x[1] }); }]; BASE[id] = 'cases'; ids.push(id); });
  GROUPS2.unshift(['DEMO – Đầu màn Chi tiết vụ án + Lần thụ lý hiện tại (biến thể PA 3)', ids]);
})();
