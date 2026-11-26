// Chuyển màn điện thoại (.pt-phone .ph) sang SVG vector: hình khối, chuyển màu tuyến tính, viền, bóng, chữ <text> theo từng dòng, icon/hình minh họa SVG nhúng.
(async () => {
  const W = ms => new Promise(r => setTimeout(r, ms));
  await W(2200);
  const root = document.querySelector('.pt-phone .ph');
  const R = root.getBoundingClientRect();
  const f2 = v => Math.round(v * 100) / 100;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const px = v => parseFloat(v) || 0;
  let uid = 0; const defs = [];
  const col = s => { const m = /rgba?\(([^)]+)\)/.exec(s || ''); if (!m) return null; const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number); return { c: 'rgb(' + p[0] + ',' + p[1] + ',' + p[2] + ')', a: p.length > 3 ? p[3] : 1 }; };
  const paint = (s, name) => { const k = col(s); if (!k || k.a === 0) return ''; return ' ' + name + '="' + k.c + '"' + (k.a < 1 ? ' ' + name + '-opacity="' + f2(k.a) + '"' : ''); };
  const splitTop = s => { const out = []; let d = 0, cur = ''; for (const ch of s) { if (ch === '(') d++; if (ch === ')') d--; if (ch === ',' && d === 0) { out.push(cur.trim()); cur = ''; } else cur += ch; } if (cur.trim()) out.push(cur.trim()); return out; };
  const rr = (x, y, w, h, r) => {
    const m = Math.min(w, h) / 2; const [a, b, c, d] = r.map(v => Math.max(0, Math.min(v, m)));
    if (a === b && b === c && c === d) return '<rect x="' + f2(x) + '" y="' + f2(y) + '" width="' + f2(w) + '" height="' + f2(h) + '"' + (a ? ' rx="' + f2(a) + '"' : '');
    const A = (q, ex, ey) => q ? 'A' + f2(q) + ' ' + f2(q) + ' 0 0 1 ' + f2(ex) + ' ' + f2(ey) : '';
    return '<path d="M' + f2(x + a) + ' ' + f2(y) + 'H' + f2(x + w - b) + A(b, x + w, y + b) + 'V' + f2(y + h - c) + A(c, x + w - c, y + h) + 'H' + f2(x + d) + A(d, x, y + h - d) + 'V' + f2(y + a) + A(a, x + a, y) + 'Z"';
  };
  const shape = (x, y, w, h, r, extra) => rr(x, y, w, h, r) + (extra || '') + '/>';
  const radii = (cs, w, h) => [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map(v => { v = String(v).split(' ')[0]; return v.endsWith('%') ? px(v) / 100 * Math.min(w, h) : px(v); });
  const linGrad = (s, x, y, w, h) => {
    const parts = splitTop(s.slice(s.indexOf('(') + 1, s.lastIndexOf(')'))); let ang = 180;
    if (/deg$/.test(parts[0])) ang = parseFloat(parts.shift());
    else if (/^to /.test(parts[0])) { const t = parts.shift(); ang = { 'to top': 0, 'to right': 90, 'to bottom': 180, 'to left': 270, 'to top right': 45, 'to right top': 45, 'to bottom right': 135, 'to right bottom': 135, 'to bottom left': 225, 'to left bottom': 225, 'to top left': 315, 'to left top': 315 }[t]; if (ang === undefined) ang = 180; }
    const th = ang * Math.PI / 180, sx = Math.sin(th), sy = -Math.cos(th), L = Math.abs(w * sx) + Math.abs(h * sy), cx = x + w / 2, cy = y + h / 2;
    const st = parts.map(p => { const m = /^(rgba?\([^)]*\))\s*(.*)$/.exec(p); return m ? { c: m[1], o: m[2].trim().split(/\s+/)[0] } : null; }).filter(Boolean);
    const n = st.length; st.forEach((q, i) => { q.v = q.o ? (q.o.endsWith('%') ? px(q.o) / 100 : px(q.o) / L) : (i === 0 ? 0 : i === n - 1 ? 1 : null); });
    for (let i = 0; i < n; i++) if (st[i].v === null) { let j = i; while (st[j].v === null) j++; const a = st[i - 1].v, b = st[j].v; for (let k = i; k < j; k++) st[k].v = a + (b - a) * (k - i + 1) / (j - i + 1); }
    const id = 'g' + (++uid);
    defs.push('<linearGradient id="' + id + '" gradientUnits="userSpaceOnUse" x1="' + f2(cx - sx * L / 2) + '" y1="' + f2(cy - sy * L / 2) + '" x2="' + f2(cx + sx * L / 2) + '" y2="' + f2(cy + sy * L / 2) + '">' +
      st.map(q => { const k = col(q.c); return '<stop offset="' + f2(q.v) + '" stop-color="' + k.c + '"' + (k.a < 1 ? ' stop-opacity="' + f2(k.a) + '"' : '') + '/>'; }).join('') + '</linearGradient>');
    return 'url(#' + id + ')';
  };
  const shadows = cs => cs.boxShadow === 'none' ? [] : splitTop(cs.boxShadow).map(s => { const cm = /rgba?\([^)]*\)/.exec(s); const nums = s.replace(cm ? cm[0] : '', '').replace('inset', '').trim().split(/\s+/).map(px); return { inset: /inset/.test(s), c: cm ? cm[0] : 'rgb(0,0,0)', x: nums[0] || 0, y: nums[1] || 0, b: nums[2] || 0, s: nums[3] || 0 }; });
  // nền, bóng, viền của một hộp (phần tử hoặc ::before/::after)
  const box = (cs, x, y, w, h, out) => {
    const rad = radii(cs, w, h);
    for (const sh of shadows(cs).filter(q => !q.inset).reverse()) {
      const k = col(sh.c); if (!k || k.a === 0) continue; let flt = '';
      if (sh.b > 0) { const id = 'f' + (++uid), m = sh.b * 2; defs.push('<filter id="' + id + '" filterUnits="userSpaceOnUse" x="' + f2(x + sh.x - sh.s - m) + '" y="' + f2(y + sh.y - sh.s - m) + '" width="' + f2(w + 2 * (sh.s + m)) + '" height="' + f2(h + 2 * (sh.s + m)) + '"><feGaussianBlur stdDeviation="' + f2(sh.b / 2) + '"/></filter>'); flt = ' filter="url(#' + id + ')"'; }
      out.push(shape(x + sh.x - sh.s, y + sh.y - sh.s, w + 2 * sh.s, h + 2 * sh.s, rad.map(v => v > 0 ? v + sh.s : 0), paint(sh.c, 'fill') + flt));
    }
    const bg = paint(cs.backgroundColor, 'fill'); if (bg) out.push(shape(x, y, w, h, rad, bg));
    if (cs.backgroundImage && cs.backgroundImage !== 'none') splitTop(cs.backgroundImage).reverse().forEach(layer => {
      if (/^linear-gradient/.test(layer)) out.push(shape(x, y, w, h, rad, ' fill="' + linGrad(layer, x, y, w, h) + '"'));
      else if (/^url\(/.test(layer)) { const u = layer.replace(/^url\(["']?|["']?\)$/g, ''); const id = 'c' + (++uid); defs.push('<clipPath id="' + id + '">' + shape(x, y, w, h, rad, '') + '</clipPath>'); out.push('<image href="' + esc(u) + '" x="' + f2(x) + '" y="' + f2(y) + '" width="' + f2(w) + '" height="' + f2(h) + '" preserveAspectRatio="xMidYMid slice" clip-path="url(#' + id + ')"/>'); }
    });
    const S = ['Top', 'Right', 'Bottom', 'Left'], bw = S.map(s => px(cs['border' + s + 'Width'])), bc = S.map(s => cs['border' + s + 'Color']), bs = S.map(s => cs['border' + s + 'Style']);
    if (bw.every(v => v > 0 && v === bw[0]) && bc.every(v => v === bc[0]) && bs.every(v => v !== 'none' && v !== 'hidden')) {
      const p = paint(bc[0], 'stroke'); if (p) out.push(shape(x + bw[0] / 2, y + bw[0] / 2, w - bw[0], h - bw[0], rad.map(v => Math.max(0, v - bw[0] / 2)), ' fill="none"' + p + ' stroke-width="' + f2(bw[0]) + '"' + (bs[0] === 'dashed' ? ' stroke-dasharray="' + f2(bw[0] * 3) + ' ' + f2(bw[0] * 2) + '"' : '')));
    } else S.forEach((s, i) => { if (!(bw[i] > 0) || bs[i] === 'none') return; const p = paint(bc[i], 'stroke'); if (!p) return; const o = bw[i] / 2;
      const L = [[x, y + o, x + w, y + o], [x + w - o, y, x + w - o, y + h], [x, y + h - o, x + w, y + h - o], [x + o, y, x + o, y + h]][i];
      out.push('<line x1="' + f2(L[0]) + '" y1="' + f2(L[1]) + '" x2="' + f2(L[2]) + '" y2="' + f2(L[3]) + '"' + p + ' stroke-width="' + f2(bw[i]) + '"/>'); });
    return { rad, bw };
  };
  const cvs = document.createElement('canvas').getContext('2d'), met = {};
  const fm = cs => { const f = cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily; if (!met[f]) { cvs.font = f; const m = cvs.measureText('Hg'); met[f] = [m.fontBoundingBoxAscent, m.fontBoundingBoxDescent]; } return met[f]; };
  const tAttr = cs => { const ls = cs.letterSpacing === 'normal' ? 0 : px(cs.letterSpacing); return ' font-family="' + esc(cs.fontFamily.replace(/"/g, "'")) + '" font-size="' + f2(px(cs.fontSize)) + '" font-weight="' + cs.fontWeight + '"' + (cs.fontStyle === 'italic' ? ' font-style="italic"' : '') + (ls ? ' letter-spacing="' + f2(ls) + '"' : '') + paint(cs.color, 'fill'); };
  const seg = new Intl.Segmenter('vi', { granularity: 'grapheme' });
  const text = (tn, cs) => {
    const t = tn.nodeValue; if (!t || !t.trim() || !col(cs.color) || col(cs.color).a === 0) return '';
    const lines = [];
    for (const g of seg.segment(t)) {
      const rg = document.createRange(); rg.setStart(tn, g.index); rg.setEnd(tn, g.index + g.segment.length);
      const rc = rg.getClientRects()[0]; if (!rc || (rc.width === 0 && /\s/.test(g.segment))) continue;
      let ln = lines.find(l => Math.abs(l.top - rc.top) < 2);
      if (!ln) { ln = { top: rc.top, left: null, s: '' }; lines.push(ln); }
      if (ln.left === null && /\s/.test(g.segment)) continue;
      if (ln.left === null) ln.left = rc.left;
      ln.s += g.segment;
    }
    const A = fm(cs)[0], up = cs.textTransform === 'uppercase';
    return lines.filter(l => l.s.trim()).map(l => { let s = l.s.replace(/\s+/g, ' ').replace(/\s+$/, ''); if (up) s = s.toUpperCase();
      return '<text x="' + f2(l.left - R.left) + '" y="' + f2(l.top - R.top + A) + '"' + tAttr(cs) + ' xml:space="preserve">' + esc(s) + '</text>'; }).join('');
  };
  const PROPS = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-dasharray', 'opacity', 'fill-opacity', 'stroke-opacity', 'fill-rule', 'clip-rule'];
  const SHAPES = ['path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse', 'g', 'text', 'use'];
  const svgEl = el => {
    const r = el.getBoundingClientRect(), cl = el.cloneNode(true), pre = 's' + (++uid) + '-';
    const oa = [el, ...el.querySelectorAll('*')], ca = [cl, ...cl.querySelectorAll('*')];
    oa.forEach((o, i) => { const c = ca[i], s = getComputedStyle(o);
      if (o !== el && SHAPES.includes(o.tagName)) PROPS.forEach(p => { const v = s.getPropertyValue(p); if (v && v !== 'normal' && v !== 'none' || p === 'fill' || p === 'stroke') c.setAttribute(p, v); });
      c.removeAttribute('class'); c.removeAttribute('style'); if (c.id) c.id = pre + c.id; });
    ['width', 'height', 'x', 'y', 'aria-hidden', 'focusable', 'role'].forEach(a => cl.removeAttribute(a));
    if (!cl.getAttribute('viewBox')) cl.setAttribute('viewBox', '0 0 ' + f2(r.width) + ' ' + f2(r.height));
    cl.setAttribute('x', f2(r.left - R.left)); cl.setAttribute('y', f2(r.top - R.top)); cl.setAttribute('width', f2(r.width)); cl.setAttribute('height', f2(r.height)); cl.setAttribute('overflow', 'visible');
    return new XMLSerializer().serializeToString(cl).replace(/ xmlns="http:\/\/www\.w3\.org\/2000\/svg"/, '')
      .replace(/url\(["']?#([^"')]+)["']?\)/g, (m, id) => 'url(#' + pre + id + ')').replace(/href="#([^"]+)"/g, (m, id) => 'href="#' + pre + id + '"');
  };
  const pseudo = (el, ps, er, out) => {
    const p = getComputedStyle(el, ps);
    if (!p.content || p.content === 'none' || p.content === 'normal' || p.display === 'none' || !/absolute|fixed/.test(p.position)) return;
    const e = getComputedStyle(el), cb = p.boxSizing === 'border-box';
    const w = px(p.width) + (cb ? 0 : px(p.paddingLeft) + px(p.paddingRight) + px(p.borderLeftWidth) + px(p.borderRightWidth));
    const h = px(p.height) + (cb ? 0 : px(p.paddingTop) + px(p.paddingBottom) + px(p.borderTopWidth) + px(p.borderBottomWidth));
    if (!(w > 0 && h > 0)) return;
    const x = (p.left !== 'auto' ? er.left + px(e.borderLeftWidth) + px(p.left) : er.right - px(e.borderRightWidth) - px(p.right) - w) + px(p.marginLeft) - R.left;
    const y = (p.top !== 'auto' ? er.top + px(e.borderTopWidth) + px(p.top) : er.bottom - px(e.borderBottomWidth) - px(p.bottom) - h) + px(p.marginTop) - R.top;
    const o = []; box(p, x, y, w, h, o);
    const t = p.content.replace(/^["']|["']$/g, '');
    if (t) { const [A, D] = fm(p); o.push('<text x="' + f2(x + w / 2) + '" y="' + f2(y + h / 2 + (A - D) / 2) + '" text-anchor="middle"' + tAttr(p) + '>' + esc(t) + '</text>'); }
    const op = px(p.opacity); out.push(op < 1 ? '<g opacity="' + f2(op) + '">' + o.join('') + '</g>' : o.join(''));
  };
  const walk = (el, out) => {
    const cs = getComputedStyle(el); if (cs.display === 'none') return;
    const r = el.getBoundingClientRect(); if (el !== root && r.width <= 1 && r.height <= 1) return;
    const x = r.left - R.left, y = r.top - R.top, w = r.width, h = r.height, vis = cs.visibility !== 'hidden';
    if (el.tagName.toLowerCase() === 'svg') { if (vis) out.push(svgEl(el)); return; }
    const parts = []; let info = { rad: [0, 0, 0, 0], bw: [0, 0, 0, 0] };
    if (el === root) { const bg = paint(cs.backgroundColor, 'fill'); if (bg) parts.push('<rect width="' + f2(w) + '" height="' + f2(h) + '"' + bg + '/>'); }
    else if (vis) info = box(cs, x, y, w, h, parts);
    if (el.tagName === 'IMG' && vis) { const fit = cs.objectFit === 'cover' ? 'xMidYMid slice' : cs.objectFit === 'contain' ? 'xMidYMid meet' : 'none'; const id = 'c' + (++uid); defs.push('<clipPath id="' + id + '">' + shape(x, y, w, h, info.rad, '') + '</clipPath>'); parts.push('<image href="' + esc(el.currentSrc || el.src) + '" x="' + f2(x) + '" y="' + f2(y) + '" width="' + f2(w) + '" height="' + f2(h) + '" preserveAspectRatio="' + fit + '" clip-path="url(#' + id + ')"/>'); }
    const kids = [], lop = []; if (vis) pseudo(el, '::before', r, kids);
    for (const n of el.childNodes) { if (n.nodeType === 3) { if (vis) kids.push(text(n, cs)); continue; } if (n.nodeType !== 1) continue;
      const nc = getComputedStyle(n), z = parseInt(nc.zIndex, 10); /* lớp con trực tiếp của màn có z-index (vd thanh trạng thái) vẽ theo thứ tự z */
      if (el === root && nc.position !== 'static' && !isNaN(z) && z !== 0) { const t = []; walk(n, t); lop.push({ z, s: t.join('') }); } else walk(n, kids); }
    lop.sort((a, b) => a.z - b.z).forEach(l => { if (l.z < 0) kids.unshift(l.s); else kids.push(l.s); });
    if (vis) pseudo(el, '::after', r, kids);
    const clip = el !== root && (cs.overflowX !== 'visible' || cs.overflowY !== 'visible'), b = info.bw;
    if (clip && kids.join('')) { const id = 'c' + (++uid); defs.push('<clipPath id="' + id + '">' + shape(x + b[3], y + b[0], w - b[1] - b[3], h - b[0] - b[2], info.rad.map(v => Math.max(0, v - Math.max(...b))), '') + '</clipPath>'); parts.push('<g clip-path="url(#' + id + ')">' + kids.join('') + '</g>'); }
    else parts.push(kids.join(''));
    const op = px(cs.opacity); out.push(op < 1 ? '<g opacity="' + f2(op) + '">' + parts.join('') + '</g>' : parts.join(''));
  };
  let font = ''; for (const sh of document.styleSheets) { let rs; try { rs = sh.cssRules; } catch (e) { continue; } for (const ru of rs) if (ru instanceof CSSFontFaceRule && /Roboto/i.test(ru.style.getPropertyValue('font-family'))) font += ru.cssText + '\n'; }
  if (font.length > 3e6) font = '';
  const body = []; walk(root, body);
  return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + f2(R.width) + '" height="' + f2(R.height) + '" viewBox="0 0 ' + f2(R.width) + ' ' + f2(R.height) + '">' + (font ? '<style>' + font + '</style>' : '') + '<defs>' + defs.join('') + '</defs>' + body.join('') + '</svg>';
})()
