/* DEMO 26/11/2026: đầu màn Chi tiết vụ án theo kiểu đầu màn Chi tiết đơn (chỉ đoạn mã – tên – nhãn – tư cách) */
(function () {
  var css = [
    /* chung A, B, C: bỏ ô chữ viết tắt lĩnh vực; dòng mã · loại thành chữ thường xám như "TN-… · Ngày tạo …" */
    'html[data-dmpa] .va4-hd1 .va4-o{display:none}',
    'html[data-dmpa] .va4-hd1{gap:0}',
    'html[data-dmpa] .va4-hd1 .va4-ma,html[data-dmpa] .va4-hd1 .va4-loai{font:400 12px/16px var(--font-sans);color:var(--ink-subtle)}',
    'html[data-dmpa] .va4-hd1 .va4-loai{gap:0}',
    'html[data-dmpa] .va4-hd1 .va4-loai::before{content:" · ";white-space:pre;width:auto;height:auto;border-radius:0;background:none}',
    /* A, B: tình trạng thành nhãn bo tròn có nền, viền (màu Status-color hiện có), bỏ chấm */
    'html[data-dmpa=a] .dt-badges .st-ti,html[data-dmpa=b] .dt-badges .st-ti{display:inline-flex;align-items:center;padding:3px 10px;border-radius:999px;background:var(--t);border:1px solid var(--b)}',
    'html[data-dmpa=a] .dt-badges .st-ti::before,html[data-dmpa=b] .dt-badges .st-ti::before{display:none}',
    /* B: tư cách thành chữ thường xám, không nền */
    'html[data-dmpa=b] .va4-vt{padding:0;background:none;font:400 12px/16px var(--font-sans);color:var(--ink-muted)}'
  ].join('\n');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  function Pa(p) {
    React.useEffect(function () { if (p.k) document.documentElement.setAttribute('data-dmpa', p.k); else document.documentElement.removeAttribute('data-dmpa');
      return function () { document.documentElement.removeAttribute('data-dmpa'); }; }, [p.k]);
    return h(CaseDetail);
  }
  var L = [['', 'Hiện tại (v609)'], ['a', 'PA A – sát hình Chi tiết đơn'], ['b', 'PA B – như A, Tư cách là chữ thường'], ['c', 'PA C – như A, tình trạng giữ chấm + chữ']], ids = [];
  L.forEach(function (x) { var id = 'dmVa_' + (x[0] || 'cu'); SCR[id] = ['Đầu màn Chi tiết vụ án – ' + x[1], function () { return h(Pa, { k: x[0] }); }]; BASE[id] = 'cases'; ids.push(id); });
  GROUPS2.unshift(['DEMO – Đầu màn Chi tiết vụ án theo kiểu Chi tiết đơn', ids]);
})();
