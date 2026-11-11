/* @ds-bundle: {"format":4,"namespace":"TuPhap","components":[{"name":"Button"},{"name":"LinkArrow"},{"name":"TextField"},{"name":"StatusBadge"},{"name":"Tabs"},{"name":"SectionHeader"},{"name":"HeroBanner"},{"name":"ServiceTile"},{"name":"ServiceCard"},{"name":"CaseCard"},{"name":"ProcessSteps"},{"name":"Timeline"},{"name":"AppBar"},{"name":"BottomNav"},{"name":"Icon"},{"name":"Illustration"},{"name":"HomeHeader"},{"name":"BannerCarousel"},{"name":"QuickAction"},{"name":"NewsCard"},{"name":"FormSection"},{"name":"SelectField"},{"name":"OptionItem"},{"name":"SummaryBar"},{"name":"SheetMenu"},{"name":"FilterCard"},{"name":"RecordCard"},{"name":"ChatFab"},{"name":"BackLink"},{"name":"Tag"},{"name":"Notice"},{"name":"Stepper"},{"name":"Checkbox"},{"name":"SegmentedControl"},{"name":"InfoList"},{"name":"ActionBar"},{"name":"Dialog"},{"name":"Accordion"},{"name":"FileUpload"},{"name":"FileItem"},{"name":"TaskList"},{"name":"StatSummary"},{"name":"MenuList"},{"name":"ProfileCard"},{"name":"MailList"},{"name":"NotificationList"},{"name":"CalendarCard"},{"name":"EventCard"},{"name":"FinanceCard"},{"name":"CaseProgress"},{"name":"SearchToolbar"},{"name":"RatingStars"},{"name":"EmptyState"},{"name":"IconButton"},{"name":"InboxCard"},{"name":"ChoiceList"},{"name":"DocToolbar"},{"name":"IssuerInfo"},{"name":"DocumentPreview"},{"name":"DeadlineBlock"},{"name":"SignatureNote"},{"name":"UrgencySummary"},{"name":"TaskCard"},{"name":"DetailHeader"},{"name":"SignerList"},{"name":"FeatureCard"},{"name":"FeatureGrid"},{"name":"ReminderBanner"},{"name":"AccountBanner"},{"name":"TaskRow"},{"name":"SourceSwitch"},{"name":"CommitCard"},{"name":"AttachmentSummary"},{"name":"CertificateCard"},{"name":"SignSessionCard"},{"name":"PlaceCard"},{"name":"DeadlineBar"},{"name":"MethodCard"}]} */
(function () {
  var React = window.React, h = React.createElement;
  var cx = function () { return Array.prototype.filter.call(arguments, Boolean).join(' '); };

  var PATHS = {
    home: ['M3 10.5 12 3l9 7.5', 'M5 9.5V20h5v-6h4v6h5V9.5'],
    file: ['M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z', 'M14 3v5h5', 'M8.5 13h7', 'M8.5 17h5'],
    filePlus: ['M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z', 'M14 3v5h5', 'M12 11v6', 'M9 14h6'],
    scale: ['M12 3v18', 'M7 21h10', 'M5 7h14', 'M5 7l-3 7a3 3 0 0 0 6 0z', 'M19 7l-3 7a3 3 0 0 0 6 0z'],
    route: ['M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M8 17h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7'],
    send: ['M21 3 3 10.5l7 3 3 7.5z', 'M10 13.5 21 3'],
    copy: ['M9 9h11v11H9z', 'M5 15H4V4h11v1'],
    message: ['M4 5h16v11H9l-5 4z', 'M8 9.5h8', 'M8 12.5h5'],
    calendar: ['M4 6h16v14H4z', 'M4 10h16', 'M8 3v4', 'M16 3v4'],
    bell: ['M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z', 'M10 21h4'],
    user: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M4 21a8 8 0 0 1 16 0'],
    search: ['M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z', 'M20 20l-4-4'],
    chevronRight: ['M9 6l6 6-6 6'],
    arrowLeft: ['M19 12H5', 'M11 6l-6 6 6 6'],
    check: ['M5 12.5l4.5 4.5L19 7.5'],
    clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 7v5l3 2'],
    alert: ['M12 3 2 20h20z', 'M12 10v4', 'M12 17h.01'],
    x: ['M6 6l12 12', 'M18 6 6 18'],
    info: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 11v5', 'M12 8h.01'],
    grid: ['M4 4h7v7H4z', 'M13 4h7v7h-7z', 'M4 13h7v7H4z', 'M13 13h7v7h-7z'],
    building: ['M3 21h18', 'M5 21V9l7-5 7 5v12', 'M9 21v-6h6v6', 'M9 11h.01', 'M15 11h.01'],
    upload: ['M12 16V4', 'M7 9l5-5 5 5', 'M4 20h16'],
    arrowRight: ['M5 12h14', 'M13 6l6 6-6 6'],
    lock: ['M6 11h12v10H6z', 'M8.5 11V8a3.5 3.5 0 0 1 7 0v3'],
    checkCircle: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M8.5 12.5l2.5 2.5 4.5-5'],
    mail: ['M3.5 6h17v12h-17z', 'M4 7l8 6 8-6'],
    phone: ['M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z'],
    shield: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', 'M8.5 12l2.5 2.5 4.5-5'],
    mapPin: ['M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z', 'M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'],
    swap: ['M4 8h14', 'M14 4l4 4-4 4', 'M20 16H6', 'M10 12l-4 4 4 4'],
    plus: ['M12 5v14', 'M5 12h14'],
    folder: ['M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'],
    chevronLeft: ['m15 18-6-6 6-6'],
    menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
    chevronDown: ['m6 9 6 6 6-6'],
    eye: ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
    eyeOff: ['M3 3l18 18', 'M10.6 5.1A9.8 9.8 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1', 'M6.6 6.6C3.7 8.5 2 12 2 12s3.5 7 10 7a9.5 9.5 0 0 0 5.4-1.6', 'M9.9 9.9a3 3 0 0 0 4.2 4.2'],
    trash: ['M3 6h18', 'M8 6V4h8v2', 'M19 6l-1 14H6L5 6', 'M10 11v6', 'M14 11v6'],
    idCard: ['M3 6h18v12H3z', 'M8.5 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M5.5 15.5a3 3 0 0 1 6 0', 'M14 10h4', 'M14 13.5h4'],
    star: ['M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z'],
    archive: ['M3.5 5h17v4h-17z', 'M5 9v10h14V9', 'M10 13h4'],
    filter: ['M4 6h16', 'M7 12h10', 'M10 18h4'],
    sort: ['M7 4v16', 'm3 8 4-4 4 4', 'M17 20V4', 'm13 16 4 4 4-4'],
    /* 03/11/2026: Hộp thư – phễu (Bộ lọc), 3 vạch ngắn dần + mũi tên xuống (Sắp xếp) */
    funnel: ['M4 5h16l-6 7.5V19l-4-2v-4.5z'],
    sortDesc: ['M4 6h9', 'M4 12h6', 'M4 18h3', 'M17 5v14', 'm14 16 3 3 3-3'],
    /* 03/11/2026: tải xuống (thẻ tên tệp) */
    download: ['M12 4v11', 'm7 10 5 5 5-5', 'M5 20h14'],
    briefcase: ['M3 8h18v11H3z', 'M8 8V5h8v3', 'M3 13h18'],
    wallet: ['M3 7h16v12H3z', 'M3 7l12-3v3', 'M15 13h3'],
    pen: ['M4 20h4L19 9l-4-4L4 16z', 'M14 6l4 4'],
    logout: ['M10 4H5v16h5', 'M14 8l4 4-4 4', 'M18 12H9']
  };

  function Icon(p) {
    var d = PATHS[p.name] || PATHS.info;
    return h('svg', { className: cx('tp-ico', p.className), viewBox: '0 0 24 24', 'aria-hidden': p.label ? undefined : 'true', role: p.label ? 'img' : undefined, 'aria-label': p.label },
      d.map(function (x, i) { return h('path', { key: i, d: x }); }));
  }

  function Button(p) {
    var variant = p.variant || 'primary', size = p.size || 'md';
    var rest = Object.assign({}, p); ['variant', 'size', 'block', 'icon', 'className', 'children', 'loading'].forEach(function (k) { delete rest[k]; });
    return h('button', Object.assign({ type: 'button' }, rest, { 'aria-busy': p.loading ? 'true' : undefined, className: cx('tp-btn', 'tp-btn-' + variant, size === 'sm' && 'tp-btn-sm', p.block && 'tp-btn-block', p.loading && 'tp-btn-loading', p.className) }),
      p.loading ? h(Spinner) : p.icon ? h(Icon, { name: p.icon }) : null, p.children);
  }


  function LinkArrow(p) {
    var off = !!p.disabled;
    return h(p.href && !off ? 'a' : 'button', { className: cx('tp-link', p.className), href: off ? undefined : p.href, type: p.href && !off ? undefined : 'button', disabled: off || undefined, onClick: off ? undefined : p.onClick },
      p.children, p.arrow === false ? null : h(Icon, { name: 'arrowRight' }));
  }

  function IconBox(p) {
    return h('span', { className: 'tp-icobox' }, h(Icon, { name: p.icon }),
      p.count ? h('span', { className: 'tp-tile-count', 'aria-label': p.count + ' mới' }, p.count) : null);
  }

  function SectionHeader(p) {
    var center = p.align === 'center';
    return h('div', { className: cx('tp-sec', center && 'tp-sec-center', p.tone === 'dark' && 'tp-sec-dark', p.variant === 'plain' && 'tp-sec-plain', p.className) },
      h('div', null,
        p.eyebrow ? h('div', { className: 'tp-sec-eyebrow' }, p.eyebrow) : null,
        h('h2', { className: 'tp-sec-title' }, p.title),
        center ? h('div', { className: 'tp-sec-rule', 'aria-hidden': 'true' }, h('i'), h('b'), h('i')) : null),
      p.action || null);
  }

  function HeroBanner(p) {
    return h('section', { className: cx('tp-hero', 'tp-on-dark', p.className) },
      p.imageSrc ? h('img', { className: 'tp-hero-img', src: p.imageSrc, alt: '' }) : null,
      ['tl', 'tr', 'bl', 'br'].map(function (c) { return h('span', { key: c, className: 'tp-hero-corner ' + c, 'aria-hidden': 'true' }); }),
      h('div', { className: 'tp-hero-body' },
        h('h1', { className: 'tp-hero-title' }, p.title),
        p.description ? h('p', { className: 'tp-hero-desc' }, p.description) : null,
        p.actions ? h('div', { className: 'tp-hero-actions' }, p.actions) : null,
        p.note ? h('div', { className: 'tp-hero-note' }, h(Icon, { name: 'shield' }), p.note) : null,
        p.stats && p.stats.length ? h('div', { className: 'tp-stats' }, p.stats.map(function (s, i) {
          return h('div', { key: i, className: 'tp-stat' }, h('div', { className: 'tp-stat-v' }, s.value), h('div', { className: 'tp-stat-l' }, s.label));
        })) : null));
  }

  function ServiceCard(p) {
    return h('button', { type: 'button', className: cx('tp-card', 'tp-card-rule', 'tp-svc', p.className), disabled: p.disabled, onClick: p.onClick },
      h('div', { className: 'tp-svc-row' }, h(IconBox, { icon: p.icon }),
        h('div', null, h('div', { className: 'tp-svc-title' }, p.title), p.description ? h('p', { className: 'tp-svc-desc' }, p.description) : null)),
      h('div', { className: 'tp-svc-foot' }, h('span', { className: 'tp-link' }, p.linkLabel || 'Xem hướng dẫn', h(Icon, { name: 'arrowRight' }))));
  }

  function ProcessSteps(p) {
    var steps = p.steps || [], n = steps.length, pad = function (i) { return (i < 9 ? '0' : '') + (i + 1); };
    var light = p.variant === 'light';
    return h('section', { className: cx('tp-proc2', light ? 'tp-proc2-light' : 'tp-proc2-brand tp-on-dark', p.className) },
      h('p', { className: 'tp-proc2-eyebrow' }, p.eyebrow || 'Quy trình'),
      h('h3', { className: 'tp-proc2-title' }, p.title),
      h('ol', { className: 'tp-proc2-list', 'aria-label': n + ' bước' }, steps.map(function (s, i) {
        return h('li', { key: i },
          light ? h('span', { className: 'tp-proc2-num', 'aria-hidden': 'true' }, String(i + 1)) :
            h(React.Fragment, null, h('span', { className: 'tp-proc2-big tp-num', 'aria-hidden': 'true' }, pad(i)), h('span', { className: 'tp-proc2-ico' }, h(Icon, { name: s.icon || 'checkCircle' }))),
          h('div', { className: 'tp-proc2-text' },
            h('span', { className: 'tp-sr' }, 'Bước ' + (i + 1) + ' trên ' + n + ': '),
            h('div', { className: 'tp-proc2-t' }, s.title),
            s.description ? h('div', { className: 'tp-proc2-d' }, s.description) : null));
      })));
  }

  var ILLO = {"nopDon": "<rect class=\"ip2\" x=\"14\" y=\"8\" width=\"24\" height=\"32\" rx=\"3\"/><rect class=\"ipp\" x=\"9\" y=\"5\" width=\"24\" height=\"33\" rx=\"3\"/><rect class=\"ito\" x=\"13\" y=\"10\" width=\"11\" height=\"2.6\" rx=\"1.3\"/><rect class=\"il\" x=\"13\" y=\"16.0\" width=\"16\" height=\"2\" rx=\"1.0\"/><rect class=\"il\" x=\"13\" y=\"20.5\" width=\"16\" height=\"2\" rx=\"1.0\"/><rect class=\"il\" x=\"13\" y=\"25.0\" width=\"12\" height=\"2\" rx=\"1.0\"/><rect class=\"il\" x=\"13\" y=\"29.5\" width=\"9\" height=\"2\" rx=\"1.0\"/><g transform=\"rotate(38 33 24)\"><rect class=\"ito\" x=\"30.5\" y=\"8\" width=\"6\" height=\"22\" rx=\"1.6\"/><rect class=\"in\" x=\"30.5\" y=\"8\" width=\"6\" height=\"4.5\" rx=\"1.6\"/><path class=\"isk\" d=\"M30.5 30h6l-3 5.5z\"/><path class=\"in\" d=\"M32.4 33.5h2.2l-1.1 2z\"/></g><circle class=\"ird\" cx=\"34\" cy=\"37\" r=\"7\"/><polygon class=\"iwh\" points=\"34.00,33.20 35.01,35.62 37.61,35.83 35.63,37.53 36.23,40.07 34.00,38.71 31.77,40.07 32.37,37.53 30.39,35.83 32.99,35.62\"/>", "traCuuHoSo": "<path class=\"ioc2\" d=\"M5 13a3 3 0 0 1 3-3h9l3 3h19a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z\"/><rect class=\"iwh\" x=\"9\" y=\"14\" width=\"26\" height=\"14\" rx=\"2\"/><rect class=\"il\" x=\"12\" y=\"17\" width=\"14\" height=\"2\" rx=\"1.0\"/><rect class=\"il\" x=\"12\" y=\"21\" width=\"10\" height=\"2\" rx=\"1.0\"/><path class=\"ioc\" d=\"M5 21h37v15a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z\"/><path class=\"in\" d=\"M35.2 33.4l2.2-2.2 8 8a1.55 1.55 0 0 1-2.2 2.2z\"/><circle class=\"in\" cx=\"30\" cy=\"28\" r=\"8.6\"/><circle class=\"ib2\" cx=\"30\" cy=\"28\" r=\"6.2\"/><path class=\"iwh\" d=\"M26.2 26.6a4.2 4.2 0 0 1 3.4-3.2 1 1 0 0 1 .3 1.9 2.4 2.4 0 0 0-1.8 1.7 1 1 0 0 1-1.9-.4z\"/>", "lichXetXu": "<rect class=\"ipp\" x=\"5\" y=\"9\" width=\"31\" height=\"30\" rx=\"4\"/><path class=\"ird\" d=\"M5 13a4 4 0 0 1 4-4h23a4 4 0 0 1 4 4v4H5z\"/><rect class=\"in\" x=\"11\" y=\"5.5\" width=\"3.2\" height=\"7.5\" rx=\"1.6\"/><rect class=\"in\" x=\"26.8\" y=\"5.5\" width=\"3.2\" height=\"7.5\" rx=\"1.6\"/><rect class=\"il\" x=\"9.0\" y=\"21\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"ite\" x=\"15.5\" y=\"21\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"22.0\" y=\"21\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"28.5\" y=\"21\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"9.0\" y=\"27\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"15.5\" y=\"27\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"9.0\" y=\"33\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"15.5\" y=\"33\" width=\"4\" height=\"3.4\" rx=\"1\"/><g transform=\"rotate(-38 35 25)\"><rect class=\"iwd2\" x=\"33.4\" y=\"25\" width=\"3.2\" height=\"15\" rx=\"1.6\"/><rect class=\"iwd\" x=\"27.5\" y=\"18.5\" width=\"15\" height=\"7.5\" rx=\"2.2\"/><rect class=\"iwd2\" x=\"30\" y=\"18.5\" width=\"2\" height=\"7.5\"/><rect class=\"iwd2\" x=\"38\" y=\"18.5\" width=\"2\" height=\"7.5\"/></g><rect class=\"in\" x=\"30\" y=\"40.5\" width=\"15\" height=\"3.4\" rx=\"1.7\"/>", "xetXuTrucTuyen": "<rect class=\"in\" x=\"4\" y=\"7\" width=\"40\" height=\"27\" rx=\"3.5\"/><rect class=\"ib\" x=\"7\" y=\"10\" width=\"34\" height=\"21\" rx=\"1.5\"/><rect class=\"in2\" x=\"21\" y=\"34\" width=\"6\" height=\"4.5\"/><rect class=\"in\" x=\"14\" y=\"38\" width=\"20\" height=\"3.4\" rx=\"1.7\"/><rect class=\"iwh\" x=\"23.1\" y=\"13.5\" width=\"1.8\" height=\"14\"/><rect class=\"iwh\" x=\"14.5\" y=\"15.5\" width=\"19\" height=\"1.8\" rx=\".9\"/><rect class=\"iwh\" x=\"19\" y=\"26.4\" width=\"10\" height=\"1.8\" rx=\".9\"/><path class=\"iwhs1\" d=\"M16 17.3l-3.4 6.2M16 17.3l3.4 6.2M32 17.3l-3.4 6.2M32 17.3l3.4 6.2\"/><path class=\"iwh\" d=\"M11.8 23.3h8.4a4.2 4.2 0 0 1-8.4 0zM27.8 23.3h8.4a4.2 4.2 0 0 1-8.4 0z\"/><circle class=\"ir\" cx=\"38\" cy=\"13.5\" r=\"2.2\"/>", "tongDat": "<rect class=\"ib3\" x=\"4\" y=\"16\" width=\"34\" height=\"24\" rx=\"3\"/><rect class=\"iwh\" x=\"9\" y=\"7\" width=\"24\" height=\"22\" rx=\"2\"/><rect class=\"il\" x=\"13\" y=\"12.0\" width=\"12\" height=\"2\" rx=\"1.0\"/><rect class=\"il\" x=\"13\" y=\"16.2\" width=\"16\" height=\"2\" rx=\"1.0\"/><rect class=\"il\" x=\"13\" y=\"20.4\" width=\"14\" height=\"2\" rx=\"1.0\"/><path class=\"ib\" d=\"M4 21l17 10.5L38 21v16a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z\"/><circle class=\"ig\" cx=\"37\" cy=\"35\" r=\"7.6\"/><path class=\"iwhs\" d=\"M33.6 35.2l2.4 2.4 4.6-4.8\"/>", "trichLuc": "<rect class=\"ipl2\" x=\"14\" y=\"4\" width=\"25\" height=\"31\" rx=\"3\"/><rect class=\"ipp\" x=\"8\" y=\"10\" width=\"25\" height=\"32\" rx=\"3\"/><rect class=\"ipl\" x=\"12\" y=\"15\" width=\"12\" height=\"2.6\" rx=\"1.3\"/><rect class=\"il\" x=\"12\" y=\"21.0\" width=\"17\" height=\"2\" rx=\"1.0\"/><rect class=\"il\" x=\"12\" y=\"25.5\" width=\"17\" height=\"2\" rx=\"1.0\"/><rect class=\"il\" x=\"12\" y=\"30.0\" width=\"11\" height=\"2\" rx=\"1.0\"/><circle class=\"ird\" cx=\"33\" cy=\"35\" r=\"8\"/><circle class=\"iwh\" cx=\"33\" cy=\"35\" r=\"5.8\"/><polygon class=\"ird\" points=\"33.00,31.40 33.95,33.69 36.42,33.89 34.54,35.50 35.12,37.91 33.00,36.62 30.88,37.91 31.46,35.50 29.58,33.89 32.05,33.69\"/>", "khieuNai": "<path class=\"ird\" d=\"M10 7h18a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H16l-7 6 1-6a6 6 0 0 1-6-6V13a6 6 0 0 1 6-6z\"/><rect class=\"iwh\" x=\"17.3\" y=\"11\" width=\"3.4\" height=\"10\" rx=\"1.7\"/><circle class=\"iwh\" cx=\"19\" cy=\"25\" r=\"2\"/><path class=\"ito\" d=\"M30 22h10a5 5 0 0 1 5 5v6a5 5 0 0 1-5 5l1 5-6-5h-5a5 5 0 0 1-5-5v-6a5 5 0 0 1 5-5z\"/><circle class=\"iwh\" cx=\"30.5\" cy=\"30\" r=\"1.6\"/><circle class=\"iwh\" cx=\"35\" cy=\"30\" r=\"1.6\"/><circle class=\"iwh\" cx=\"39.5\" cy=\"30\" r=\"1.6\"/>", "lichTiepDan": "<circle class=\"isk\" cx=\"19\" cy=\"15.5\" r=\"6.5\"/><path class=\"ihr\" d=\"M12.3 13.6a7 7 0 0 1 13.4 0c-3-.2-6.5-1.6-8.4-3.6-1.2 1.8-3 3-5 3.6z\"/><path class=\"in\" d=\"M5 41a14 14 0 0 1 28 0z\"/><path class=\"iwh\" d=\"M15.5 27.6h7l-3.5 5z\"/><path class=\"ird\" d=\"M18.2 29.4h1.6l.6 5.2-1.4 1.4-1.4-1.4z\"/><circle class=\"ite\" cx=\"35\" cy=\"31\" r=\"9.5\"/><circle class=\"iwh\" cx=\"35\" cy=\"31\" r=\"7\"/><rect class=\"in\" x=\"34.1\" y=\"26\" width=\"1.8\" height=\"6\" rx=\".9\"/><rect class=\"in\" x=\"34.1\" y=\"30.1\" width=\"5\" height=\"1.8\" rx=\".9\"/>", "huongDan": "<path class=\"ir\" d=\"M35 4a8 8 0 1 1-6.6 12.5L25 18l1.3-4A8 8 0 0 1 35 4z\"/><circle class=\"ite\" cx=\"20\" cy=\"26\" r=\"15\"/><path class=\"ite\" d=\"M8 36l-3 7 9-4z\"/><path class=\"iwhs3\" d=\"M15.5 21.5a4.6 4.6 0 1 1 6.8 4.1c-1.5.8-2.3 1.8-2.3 3.4v.8\"/><circle class=\"iwh\" cx=\"20\" cy=\"34.4\" r=\"2.1\"/>", /* v278: thêm nguoiBaoVe, canCongLy, taiChinh (màn Theo dõi vụ án, vụ việc) */ "nguoiBaoVe": "<circle class=\"isk\" cx=\"19\" cy=\"15.5\" r=\"6.5\"/><path class=\"ihr\" d=\"M12.3 13.6a7 7 0 0 1 13.4 0c-3-.2-6.5-1.6-8.4-3.6-1.2 1.8-3 3-5 3.6z\"/><path class=\"in\" d=\"M5 41a14 14 0 0 1 28 0z\"/><path class=\"iwh\" d=\"M15.5 27.6h7l-3.5 5z\"/><path class=\"ird\" d=\"M35 22l8.5 3.2v6.3c0 5.3-3.7 9-8.5 10.5-4.8-1.5-8.5-5.2-8.5-10.5v-6.3z\"/><path class=\"iwhs2\" d=\"M31 32l2.8 2.8 5-5.4\"/>", "canCongLy": "<circle class=\"ioc\" cx=\"22\" cy=\"8\" r=\"3\"/><rect class=\"in\" x=\"21\" y=\"9\" width=\"2.4\" height=\"27\"/><rect class=\"in\" x=\"8\" y=\"12\" width=\"28\" height=\"2.4\" rx=\"1.2\"/><path class=\"ins1\" d=\"M11 14.4l-5 10M11 14.4l5 10M33 14.4l-5 10M33 14.4l5 10\"/><path class=\"ioc\" d=\"M4.5 24.5h13a6.5 6.5 0 0 1-13 0zM26.5 24.5h13a6.5 6.5 0 0 1-13 0z\"/><rect class=\"in\" x=\"14\" y=\"35\" width=\"16.5\" height=\"3.2\" rx=\"1.6\"/><g transform=\"rotate(-40 38 37)\"><rect class=\"ird\" x=\"33\" y=\"31\" width=\"10\" height=\"5.5\" rx=\"1.5\"/><rect class=\"ird\" x=\"36.8\" y=\"36\" width=\"2.4\" height=\"9\" rx=\"1.2\"/></g>", "taiChinh": "<rect class=\"ite\" x=\"3\" y=\"11\" width=\"34\" height=\"26\" rx=\"4\"/><path class=\"iwh\" d=\"M7 11l20-6 3 6z\"/><rect class=\"iwh\" x=\"24\" y=\"20\" width=\"13\" height=\"9\" rx=\"2\"/><circle class=\"in\" cx=\"29\" cy=\"24.5\" r=\"1.7\"/><circle class=\"ioc2\" cx=\"36\" cy=\"36\" r=\"9.5\"/><circle class=\"ioc\" cx=\"36\" cy=\"35\" r=\"9.5\"/><circle class=\"ioc2\" cx=\"36\" cy=\"35\" r=\"6.6\"/><text class=\"itx\" x=\"36\" y=\"39.4\" text-anchor=\"middle\">\u0111</text>", "anPhi": "<path class=\"ipp\" d=\"M8 4h24v36l-3-2-3 2-3-2-3 2-3-2-3 2-3-2-3 2z\"/><rect class=\"isg\" x=\"12\" y=\"10\" width=\"10\" height=\"2.6\" rx=\"1.3\"/><rect class=\"il\" x=\"12\" y=\"16.0\" width=\"16\" height=\"2\" rx=\"1.0\"/><rect class=\"il\" x=\"12\" y=\"20.5\" width=\"16\" height=\"2\" rx=\"1.0\"/><rect class=\"il\" x=\"12\" y=\"25.0\" width=\"12\" height=\"2\" rx=\"1.0\"/><circle class=\"ioc2\" cx=\"34\" cy=\"35\" r=\"9.5\"/><circle class=\"ioc\" cx=\"34\" cy=\"34\" r=\"9.5\"/><circle class=\"ioc2\" cx=\"34\" cy=\"34\" r=\"6.6\"/><text class=\"itx\" x=\"34\" y=\"38.4\" text-anchor=\"middle\">đ</text>", "banAn": "<path class=\"ird\" d=\"M3 13h2v25c7-1 13 0 19 3 6-3 12-4 19-3V13h2v29c-8-1-14 0-21 3-7-3-13-4-21-3z\"/><path class=\"iwh\" d=\"M24 13c-5-3-11-4-18-3v27c7-1 13 0 18 3z\"/><path class=\"ip2\" d=\"M24 13c5-3 11-4 18-3v27c-7-1-13 0-18 3z\"/><rect class=\"il\" x=\"9.5\" y=\"16.0\" width=\"10\" height=\"2\" rx=\"1.0\"/><rect class=\"il\" x=\"9.5\" y=\"20.5\" width=\"11\" height=\"2\" rx=\"1.0\"/><rect class=\"il\" x=\"9.5\" y=\"25.0\" width=\"9\" height=\"2\" rx=\"1.0\"/><path class=\"ioc\" d=\"M33 7h5v14l-2.5-2.5L33 21z\"/><rect class=\"in\" x=\"32.2\" y=\"24\" width=\"1.6\" height=\"11\"/><rect class=\"in\" x=\"27\" y=\"26\" width=\"12\" height=\"1.6\" rx=\".8\"/><path class=\"in\" d=\"M26 31.5h5.2a2.6 2.6 0 0 1-5.2 0zM34.8 31.5H40a2.6 2.6 0 0 1-5.2 0z\"/><path class=\"ins1\" d=\"M28.6 27.4l-2.4 4.1M28.6 27.4l2.4 4.1M37.4 27.4l-2.4 4.1M37.4 27.4l2.4 4.1\"/><rect class=\"in\" x=\"29.5\" y=\"34.4\" width=\"7\" height=\"1.6\" rx=\".8\"/>", "hoTro": "<path class=\"ins4\" d=\"M10 27v-4a14 14 0 0 1 28 0v4\"/><rect class=\"ite\" x=\"5\" y=\"22\" width=\"9\" height=\"14\" rx=\"3.5\"/><rect class=\"ite\" x=\"34\" y=\"22\" width=\"9\" height=\"14\" rx=\"3.5\"/><path class=\"ins3\" d=\"M38.5 35c0 5-4 8-10 8\"/><rect class=\"ird\" x=\"21\" y=\"40\" width=\"9\" height=\"5.5\" rx=\"2.75\"/>", "chungCu": "<rect class=\"ipl2\" x=\"13\" y=\"5\" width=\"27\" height=\"25\" rx=\"2.5\" transform=\"rotate(8 26 17)\"/><rect class=\"ipp\" x=\"6\" y=\"12\" width=\"30\" height=\"27\" rx=\"2.5\"/><rect class=\"ib2\" x=\"9.5\" y=\"15.5\" width=\"23\" height=\"16\" rx=\"1\"/><path class=\"isg\" d=\"M9.5 31.5l7-8.5 5 5.5 3.5-3 7.5 6z\"/><circle class=\"ioc\" cx=\"27.5\" cy=\"20.5\" r=\"2.6\"/><path class=\"ins3\" d=\"M37 8v22a4 4 0 0 1-8 0V12\"/>", "uyQuyen": "<rect class=\"ipp\" x=\"9\" y=\"4\" width=\"26\" height=\"36\" rx=\"3\"/><rect class=\"ipl\" x=\"13\" y=\"9\" width=\"14\" height=\"2.6\" rx=\"1.3\"/><rect class=\"il\" x=\"13\" y=\"15.0\" width=\"18\" height=\"2\" rx=\"1.0\"/><rect class=\"il\" x=\"13\" y=\"19.5\" width=\"18\" height=\"2\" rx=\"1.0\"/><rect class=\"il\" x=\"13\" y=\"24.0\" width=\"14\" height=\"2\" rx=\"1.0\"/><path class=\"ibs\" d=\"M12 32c2-3 3.5-3 3.5-.5s1.5 2.5 3.5 0 3-2 3.5 0\"/><circle class=\"ird\" cx=\"33\" cy=\"35\" r=\"7.5\"/><polygon class=\"iwh\" points=\"33.00,31.20 34.01,33.62 36.61,33.83 34.63,35.53 35.23,38.07 33.00,36.71 30.77,38.07 31.37,35.53 29.39,33.83 31.99,33.62\"/>", "cccd": "<rect class=\"ib\" x=\"3\" y=\"10\" width=\"42\" height=\"28\" rx=\"4\"/><path class=\"ib3\" d=\"M3 14a4 4 0 0 1 4-4h34a4 4 0 0 1 4 4v2H3z\"/><rect class=\"iwh\" x=\"7\" y=\"19\" width=\"12\" height=\"15\" rx=\"2\"/><circle class=\"in\" cx=\"13\" cy=\"25\" r=\"3\"/><path class=\"in\" d=\"M8 34a5 5 0 0 1 10 0z\"/><rect class=\"iwh\" x=\"23\" y=\"21\" width=\"16\" height=\"2.4\" rx=\"1.2\"/><rect class=\"ib2\" x=\"23\" y=\"26\" width=\"13\" height=\"2\" rx=\"1\"/><rect class=\"ib2\" x=\"23\" y=\"30.5\" width=\"10\" height=\"2\" rx=\"1\"/><rect class=\"ioc\" x=\"35\" y=\"29\" width=\"6\" height=\"5\" rx=\"1\"/>", "chat": "<path class=\"ite\" d=\"M24 5h11a9 9 0 0 1 9 9v5a9 9 0 0 1-9 9h-1v6l-6-6h-4a9 9 0 0 1-9-9v-5a9 9 0 0 1 9-9z\"/><path class=\"ird\" d=\"M12 17h12a8 8 0 0 1 8 8v5a8 8 0 0 1-8 8H15l-7 5 1.5-5.5A8 8 0 0 1 4 30v-5a8 8 0 0 1 8-8z\"/><circle class=\"iwh\" cx=\"12\" cy=\"28\" r=\"1.9\"/><circle class=\"iwh\" cx=\"18\" cy=\"28\" r=\"1.9\"/><circle class=\"iwh\" cx=\"24\" cy=\"28\" r=\"1.9\"/>", "hanhChinh": "<path class=\"ird\" d=\"M6 17 24 7l18 10z\"/><polygon class=\"iwh\" points=\"24.00,10.60 24.69,12.45 26.66,12.53 25.12,13.76 25.65,15.67 24.00,14.58 22.35,15.67 22.88,13.76 21.34,12.53 23.31,12.45\"/><rect class=\"ib3\" x=\"7\" y=\"17\" width=\"34\" height=\"3\" rx=\"1\"/><rect class=\"ib2\" x=\"9.5\" y=\"21\" width=\"5\" height=\"13\" rx=\"1\"/><rect class=\"ib2\" x=\"17.5\" y=\"21\" width=\"5\" height=\"13\" rx=\"1\"/><rect class=\"ib2\" x=\"25.5\" y=\"21\" width=\"5\" height=\"13\" rx=\"1\"/><rect class=\"ib2\" x=\"33.5\" y=\"21\" width=\"5\" height=\"13\" rx=\"1\"/><rect class=\"ib3\" x=\"6\" y=\"34\" width=\"36\" height=\"3\" rx=\"1\"/><rect class=\"ib\" x=\"4\" y=\"37\" width=\"40\" height=\"4\" rx=\"1.5\"/>", "yeuCau": "<rect class=\"iwd\" x=\"8\" y=\"7\" width=\"28\" height=\"35\" rx=\"3\"/><rect class=\"ipp\" x=\"11\" y=\"11\" width=\"22\" height=\"28\" rx=\"2\"/><rect class=\"ird\" x=\"16\" y=\"4.5\" width=\"12\" height=\"6.5\" rx=\"2\"/><rect class=\"il\" x=\"14\" y=\"17\" width=\"14\" height=\"2\" rx=\"1\"/><rect class=\"il\" x=\"14\" y=\"21.5\" width=\"16\" height=\"2\" rx=\"1\"/><rect class=\"il\" x=\"14\" y=\"26\" width=\"11\" height=\"2\" rx=\"1\"/><circle class=\"ite\" cx=\"35\" cy=\"35\" r=\"8\"/><path class=\"iwhs\" d=\"M31.4 35.2l2.6 2.6 4.6-4.9\"/>", "phaSan": "<path class=\"ins3\" d=\"M17 13v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3\"/><rect class=\"ioc\" x=\"4\" y=\"13\" width=\"36\" height=\"25\" rx=\"3.5\"/><rect class=\"ioc2\" x=\"4\" y=\"22\" width=\"36\" height=\"3\"/><rect class=\"in\" x=\"19\" y=\"19.5\" width=\"6\" height=\"8\" rx=\"1.5\"/><circle class=\"ird\" cx=\"36\" cy=\"35\" r=\"8.5\"/><path class=\"iwhs2\" d=\"M31 38.6l3.2-3.4 2.6 2.4 3.4-3.8\"/><polygon class=\"iwh\" points=\"41.6,31.6 41.3,35.4 38.2,33.2\"/>", "hoaGiai": "<circle class=\"isk\" cx=\"13\" cy=\"20\" r=\"5.6\"/><path class=\"ihr\" d=\"M7.4 19.4a5.6 5.6 0 0 1 11.2 0z\"/><path class=\"ite\" d=\"M2 42a11 11 0 0 1 22 0z\"/><circle class=\"isk\" cx=\"35\" cy=\"20\" r=\"5.6\"/><path class=\"ihr\" d=\"M29.4 19.4a5.6 5.6 0 0 1 11.2 0z\"/><path class=\"ito\" d=\"M24 42a11 11 0 0 1 22 0z\"/><rect class=\"ird\" x=\"17\" y=\"3\" width=\"14\" height=\"9\" rx=\"4.5\"/><path class=\"ird\" d=\"M22 11.5l2 3.2 2-3.2z\"/><circle class=\"iwh\" cx=\"20.6\" cy=\"7.5\" r=\"1.1\"/><circle class=\"iwh\" cx=\"24\" cy=\"7.5\" r=\"1.1\"/><circle class=\"iwh\" cx=\"27.4\" cy=\"7.5\" r=\"1.1\"/>", "banSao": "<rect class=\"ib2\" x=\"15\" y=\"5\" width=\"24\" height=\"30\" rx=\"3\"/><rect class=\"ipp\" x=\"8\" y=\"11\" width=\"24\" height=\"31\" rx=\"3\"/><rect class=\"ird\" x=\"12\" y=\"16\" width=\"11\" height=\"2.6\" rx=\"1.3\"/><rect class=\"il\" x=\"12\" y=\"21.5\" width=\"16\" height=\"2\" rx=\"1\"/><rect class=\"il\" x=\"12\" y=\"26\" width=\"16\" height=\"2\" rx=\"1\"/><rect class=\"il\" x=\"12\" y=\"30.5\" width=\"10\" height=\"2\" rx=\"1\"/><circle class=\"ib3\" cx=\"35\" cy=\"35\" r=\"8.5\"/><rect class=\"iwh\" x=\"32.6\" y=\"30.4\" width=\"6\" height=\"6.8\" rx=\"1.2\"/><rect class=\"ib3\" x=\"30.6\" y=\"32.6\" width=\"6\" height=\"6.8\" rx=\"1.2\"/><rect class=\"iwh\" x=\"31.5\" y=\"33.5\" width=\"4.2\" height=\"5\" rx=\"0.8\"/>", "saoChup": "<rect class=\"ipp\" x=\"14\" y=\"4\" width=\"20\" height=\"14\" rx=\"1.5\"/><rect class=\"il\" x=\"17\" y=\"8\" width=\"12\" height=\"2\" rx=\"1\"/><rect class=\"il\" x=\"17\" y=\"11.5\" width=\"8\" height=\"2\" rx=\"1\"/><rect class=\"ib\" x=\"4\" y=\"16\" width=\"40\" height=\"18\" rx=\"3.5\"/><rect class=\"ib3\" x=\"4\" y=\"16\" width=\"40\" height=\"4.5\" rx=\"2\"/><circle class=\"ird\" cx=\"37.5\" cy=\"24.5\" r=\"2\"/><rect class=\"ib3\" x=\"10\" y=\"28\" width=\"28\" height=\"3\" rx=\"1.5\"/><rect class=\"ipp\" x=\"12.5\" y=\"30\" width=\"23\" height=\"13\" rx=\"1.5\"/><rect class=\"il\" x=\"16\" y=\"34\" width=\"14\" height=\"2\" rx=\"1\"/><rect class=\"il\" x=\"16\" y=\"38\" width=\"9\" height=\"2\" rx=\"1\"/>", "toCao": "<rect class=\"in\" x=\"4\" y=\"18\" width=\"8\" height=\"12\" rx=\"2.5\"/><path class=\"ito\" d=\"M11 18.5 30 8v32L11 29.5z\"/><rect class=\"ird\" x=\"28.5\" y=\"6\" width=\"5.5\" height=\"36\" rx=\"2.75\"/><path class=\"in\" d=\"M13 30h5.4l2.4 8.4a2 2 0 0 1-1.9 2.6h-1.4a2 2 0 0 1-1.9-1.5z\"/><path class=\"ins3\" d=\"M38 18.5a9 9 0 0 1 0 11\"/><path class=\"ins3\" d=\"M42.5 14a15.5 15.5 0 0 1 0 20\"/>", "lichHen": "<rect class=\"ipp\" x=\"5\" y=\"9\" width=\"31\" height=\"30\" rx=\"4\"/><path class=\"ird\" d=\"M5 13a4 4 0 0 1 4-4h23a4 4 0 0 1 4 4v4H5z\"/><rect class=\"in\" x=\"11\" y=\"5.5\" width=\"3.2\" height=\"7.5\" rx=\"1.6\"/><rect class=\"in\" x=\"26.8\" y=\"5.5\" width=\"3.2\" height=\"7.5\" rx=\"1.6\"/><rect class=\"il\" x=\"9\" y=\"21\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"15.5\" y=\"21\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"22\" y=\"21\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"28.5\" y=\"21\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"9\" y=\"27\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"15.5\" y=\"27\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"22\" y=\"27\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"28.5\" y=\"27\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"9\" y=\"33\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"15.5\" y=\"33\" width=\"4\" height=\"3.4\" rx=\"1\"/><circle class=\"ig\" cx=\"36\" cy=\"35\" r=\"8.5\"/><path class=\"iwhs\" d=\"M32.4 35.2l2.6 2.6 4.6-4.9\"/>", "doiLich": "<rect class=\"ipp\" x=\"5\" y=\"9\" width=\"31\" height=\"30\" rx=\"4\"/><path class=\"ird\" d=\"M5 13a4 4 0 0 1 4-4h23a4 4 0 0 1 4 4v4H5z\"/><rect class=\"in\" x=\"11\" y=\"5.5\" width=\"3.2\" height=\"7.5\" rx=\"1.6\"/><rect class=\"in\" x=\"26.8\" y=\"5.5\" width=\"3.2\" height=\"7.5\" rx=\"1.6\"/><rect class=\"il\" x=\"9\" y=\"21\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"15.5\" y=\"21\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"22\" y=\"21\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"28.5\" y=\"21\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"9\" y=\"27\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"15.5\" y=\"27\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"22\" y=\"27\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"28.5\" y=\"27\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"9\" y=\"33\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"15.5\" y=\"33\" width=\"4\" height=\"3.4\" rx=\"1\"/><circle class=\"ite\" cx=\"36\" cy=\"35\" r=\"8.5\"/><path class=\"iwhs2\" d=\"M32.3 32.8h7.4M37.3 30.4l2.4 2.4-2.4 2.4M39.7 37.6h-7.4M34.7 35.2l-2.4 2.4 2.4 2.4\"/>", "lichHuy": "<rect class=\"ipp\" x=\"5\" y=\"9\" width=\"31\" height=\"30\" rx=\"4\"/><path class=\"ird\" d=\"M5 13a4 4 0 0 1 4-4h23a4 4 0 0 1 4 4v4H5z\"/><rect class=\"in\" x=\"11\" y=\"5.5\" width=\"3.2\" height=\"7.5\" rx=\"1.6\"/><rect class=\"in\" x=\"26.8\" y=\"5.5\" width=\"3.2\" height=\"7.5\" rx=\"1.6\"/><rect class=\"il\" x=\"9\" y=\"21\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"15.5\" y=\"21\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"22\" y=\"21\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"28.5\" y=\"21\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"9\" y=\"27\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"15.5\" y=\"27\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"22\" y=\"27\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"28.5\" y=\"27\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"9\" y=\"33\" width=\"4\" height=\"3.4\" rx=\"1\"/><rect class=\"il\" x=\"15.5\" y=\"33\" width=\"4\" height=\"3.4\" rx=\"1\"/><circle class=\"ird\" cx=\"36\" cy=\"35\" r=\"8.5\"/><path class=\"iwhs\" d=\"M33.2 32.2l5.6 5.6M38.8 32.2l-5.6 5.6\"/>", "doiNguoi": "<circle class=\"isk\" cx=\"19\" cy=\"15.5\" r=\"6.5\"/><path class=\"ihr\" d=\"M12.3 13.6a7 7 0 0 1 13.4 0c-3-.2-6.5-1.6-8.4-3.6-1.2 1.8-3 3-5 3.6z\"/><path class=\"ib\" d=\"M5 41a14 14 0 0 1 28 0z\"/><path class=\"iwh\" d=\"M15.5 27.6h7l-3.5 5z\"/><circle class=\"ite\" cx=\"35.5\" cy=\"31\" r=\"8.5\"/><path class=\"iwhs2\" d=\"M31.8 28.8h7.4M36.8 26.4l2.4 2.4-2.4 2.4M39.2 33.6h-7.4M34.2 31.2l-2.4 2.4 2.4 2.4\"/>", "vangMat": "<circle class=\"isk\" cx=\"19\" cy=\"15.5\" r=\"6.5\"/><path class=\"ihr\" d=\"M12.3 13.6a7 7 0 0 1 13.4 0c-3-.2-6.5-1.6-8.4-3.6-1.2 1.8-3 3-5 3.6z\"/><path class=\"ib\" d=\"M5 41a14 14 0 0 1 28 0z\"/><path class=\"iwh\" d=\"M15.5 27.6h7l-3.5 5z\"/><circle class=\"ird\" cx=\"35.5\" cy=\"31\" r=\"8.5\"/><rect class=\"iwh\" x=\"31.2\" y=\"29.9\" width=\"8.6\" height=\"2.4\" rx=\"1.2\"/>", "hoan": "<path class=\"ipp\" d=\"M14 9h20c0 8-6 11-7.5 15 1.5 4 7.5 7 7.5 15H14c0-8 6-11 7.5-15C20 20 14 17 14 9z\"/><path class=\"ioc\" d=\"M17.6 12.4h12.8c-.8 4.4-4.7 6.7-6.4 9.4-1.7-2.7-5.6-5-6.4-9.4z\"/><rect class=\"ioc\" x=\"23.4\" y=\"21.5\" width=\"1.2\" height=\"9\"/><path class=\"ioc\" d=\"M17.2 36c.8-3.4 4-5.3 6.8-6.8 2.8 1.5 6 3.4 6.8 6.8z\"/><rect class=\"iwd2\" x=\"11\" y=\"5\" width=\"26\" height=\"4.2\" rx=\"2.1\"/><rect class=\"iwd2\" x=\"11\" y=\"38.8\" width=\"26\" height=\"4.2\" rx=\"2.1\"/><circle class=\"ird\" cx=\"37\" cy=\"35.5\" r=\"8\"/><rect class=\"iwh\" x=\"34\" y=\"31.8\" width=\"2.2\" height=\"7.4\" rx=\"1.1\"/><rect class=\"iwh\" x=\"37.8\" y=\"31.8\" width=\"2.2\" height=\"7.4\" rx=\"1.1\"/>", "xemXet": "<rect class=\"ipp\" x=\"6\" y=\"5\" width=\"27\" height=\"35\" rx=\"3\"/><rect class=\"ird\" x=\"10\" y=\"10\" width=\"12\" height=\"2.6\" rx=\"1.3\"/><rect class=\"il\" x=\"10\" y=\"16\" width=\"19\" height=\"2\" rx=\"1\"/><rect class=\"il\" x=\"10\" y=\"20.5\" width=\"19\" height=\"2\" rx=\"1\"/><rect class=\"il\" x=\"10\" y=\"25\" width=\"13\" height=\"2\" rx=\"1\"/><path class=\"in\" d=\"M35.2 35.4l2.2-2.2 8 8a1.55 1.55 0 0 1-2.2 2.2z\"/><circle class=\"in\" cx=\"30\" cy=\"30\" r=\"8.6\"/><circle class=\"ib2\" cx=\"30\" cy=\"30\" r=\"6.2\"/><path class=\"iwh\" d=\"M26.2 28.6a4.2 4.2 0 0 1 3.4-3.2 1 1 0 0 1 .3 1.9 2.4 2.4 0 0 0-1.8 1.7 1 1 0 0 1-1.9-.4z\"/>", "huongDanSD": "<rect class=\"in\" x=\"12\" y=\"3\" width=\"24\" height=\"42\" rx=\"4.5\"/><rect class=\"ib2\" x=\"14.5\" y=\"8\" width=\"19\" height=\"30.5\" rx=\"1.5\"/><rect class=\"in2\" x=\"21\" y=\"4.8\" width=\"6\" height=\"1.4\" rx=\"0.7\"/><circle class=\"in2\" cx=\"24\" cy=\"41.6\" r=\"1.4\"/><circle class=\"ird\" cx=\"24\" cy=\"21\" r=\"6.6\"/><path class=\"iwh\" d=\"M22 17.6v6.8l5.6-3.4z\"/><rect class=\"iwh\" x=\"17.5\" y=\"31\" width=\"13\" height=\"2\" rx=\"1\"/><rect class=\"iwh\" x=\"17.5\" y=\"34.5\" width=\"9\" height=\"2\" rx=\"1\"/>", "hoiDap": "<path class=\"ioc\" d=\"M10 5h16a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6h-9l-6 5 .8-5.2A6 6 0 0 1 4 19v-8a6 6 0 0 1 6-6z\"/><text class=\"itx itx-lg\" x=\"18\" y=\"21\" text-anchor=\"middle\">?</text><path class=\"ird\" d=\"M24 20h14a6 6 0 0 1 6 6v6a6 6 0 0 1-6 6h-1l.8 5-6-5H24a6 6 0 0 1-6-6v-6a6 6 0 0 1 6-6z\"/><rect class=\"iwh\" x=\"23\" y=\"26.5\" width=\"15\" height=\"2\" rx=\"1\"/><rect class=\"iwh\" x=\"23\" y=\"31\" width=\"10\" height=\"2\" rx=\"1\"/>", "tinTuc": "<rect class=\"ip2\" x=\"9\" y=\"6\" width=\"34\" height=\"32\" rx=\"3\"/><rect class=\"ipp\" x=\"5\" y=\"10\" width=\"34\" height=\"32\" rx=\"3\"/><rect class=\"ird\" x=\"9\" y=\"14\" width=\"20\" height=\"3.4\" rx=\"1.2\"/><rect class=\"ib2\" x=\"9\" y=\"20.5\" width=\"11\" height=\"9.5\" rx=\"1\"/><path class=\"ib\" d=\"M9 30l4-4.6 3 3 1.6-1.6 2.4 3.2z\"/><circle class=\"ito\" cx=\"17\" cy=\"23.5\" r=\"1.4\"/><rect class=\"il\" x=\"23\" y=\"21\" width=\"12\" height=\"2\" rx=\"1\"/><rect class=\"il\" x=\"23\" y=\"25\" width=\"12\" height=\"2\" rx=\"1\"/><rect class=\"il\" x=\"23\" y=\"29\" width=\"9\" height=\"2\" rx=\"1\"/><rect class=\"il\" x=\"9\" y=\"33.5\" width=\"26\" height=\"2\" rx=\"1\"/><rect class=\"il\" x=\"9\" y=\"37.5\" width=\"19\" height=\"2\" rx=\"1\"/>", "danhGia": "<circle class=\"ite\" cx=\"21\" cy=\"22\" r=\"16\"/><circle class=\"iwh\" cx=\"15.5\" cy=\"18.5\" r=\"2.2\"/><circle class=\"iwh\" cx=\"26.5\" cy=\"18.5\" r=\"2.2\"/><path class=\"iwhs\" d=\"M14 25.5a8 8 0 0 0 14 0\"/><circle class=\"ird\" cx=\"36.5\" cy=\"35.5\" r=\"8.5\"/><polygon class=\"iwh\" points=\"36.50,31.00 37.68,34.18 41.07,34.32 38.40,36.42 39.32,39.68 36.50,37.80 33.68,39.68 34.60,36.42 31.93,34.32 35.32,34.18\"/>", "nhacViec": "<path class=\"ioc\" d=\"M24 5a3 3 0 0 1 3 3v.9c5.6 1.4 9 6.1 9 12V30l3.5 4.6h-31L12 30v-9.1c0-5.9 3.4-10.6 9-12V8a3 3 0 0 1 3-3z\"/><rect class=\"ioc2\" x=\"8.5\" y=\"33\" width=\"31\" height=\"3\" rx=\"1.5\"/><path class=\"in\" d=\"M19.4 37.6h9.2a4.6 4.6 0 0 1-9.2 0z\"/><circle class=\"ird\" cx=\"36.5\" cy=\"11.5\" r=\"6.5\"/><rect class=\"iwh\" x=\"35.5\" y=\"7.6\" width=\"2\" height=\"4.6\" rx=\"1\"/><circle class=\"iwh\" cx=\"36.5\" cy=\"14.6\" r=\"1.2\"/>", "caiDat": "<polygon class=\"ib3\" points=\"31.76,17.75 35.82,18.59 35.82,23.41 31.76,24.25 30.62,27.01 32.89,30.48 29.48,33.89 26.01,31.62 23.25,32.76 22.41,36.82 17.59,36.82 16.75,32.76 13.99,31.62 10.52,33.89 7.11,30.48 9.38,27.01 8.24,24.25 4.18,23.41 4.18,18.59 8.24,17.75 9.38,14.99 7.11,11.52 10.52,8.11 13.99,10.38 16.75,9.24 17.59,5.18 22.41,5.18 23.25,9.24 26.01,10.38 29.48,8.11 32.89,11.52 30.62,14.99\"/><circle class=\"ib2\" cx=\"20\" cy=\"21\" r=\"8\"/><circle class=\"iwh\" cx=\"20\" cy=\"21\" r=\"4.2\"/><circle class=\"ite\" cx=\"35.5\" cy=\"35.5\" r=\"8.5\"/><path class=\"iwhs2\" d=\"M35.5 31.2v4.6l3 2\"/>", "quaHan": "<circle class=\"ib3\" cx=\"21\" cy=\"22\" r=\"17\"/><circle class=\"iwh\" cx=\"21\" cy=\"22\" r=\"13.5\"/><rect class=\"in\" x=\"20.1\" y=\"12.5\" width=\"1.8\" height=\"10.5\" rx=\"0.9\"/><rect class=\"in\" x=\"20.1\" y=\"21.1\" width=\"8.5\" height=\"1.8\" rx=\"0.9\"/><circle class=\"in\" cx=\"21\" cy=\"22\" r=\"1.9\"/><circle class=\"ird\" cx=\"36.5\" cy=\"35.5\" r=\"8.5\"/><rect class=\"iwh\" x=\"35.5\" y=\"30.6\" width=\"2\" height=\"6\" rx=\"1\"/><circle class=\"iwh\" cx=\"36.5\" cy=\"39.6\" r=\"1.3\"/>", "phanTo": "<rect class=\"ipp\" x=\"4\" y=\"6\" width=\"20\" height=\"27\" rx=\"2.5\"/><rect class=\"il\" x=\"8\" y=\"11\" width=\"12\" height=\"2\" rx=\"1\"/><rect class=\"il\" x=\"8\" y=\"15.5\" width=\"12\" height=\"2\" rx=\"1\"/><rect class=\"il\" x=\"8\" y=\"20\" width=\"8\" height=\"2\" rx=\"1\"/><rect class=\"ib\" x=\"24\" y=\"15\" width=\"20\" height=\"27\" rx=\"2.5\"/><rect class=\"ib2\" x=\"28\" y=\"20\" width=\"12\" height=\"2\" rx=\"1\"/><rect class=\"ib2\" x=\"28\" y=\"24.5\" width=\"12\" height=\"2\" rx=\"1\"/><rect class=\"ib2\" x=\"28\" y=\"29\" width=\"8\" height=\"2\" rx=\"1\"/><path class=\"ird\" d=\"M27 6.4h8V3l6 5.2-6 5.2V10h-8z\"/><path class=\"ite\" d=\"M21 41.6h-8V45l-6-5.2 6-5.2V38h8z\"/>"};

  function Illustration(p) {
    return h('svg', { className: cx('tp-illo', p.className), viewBox: '0 0 48 48', role: p.label ? 'img' : undefined, 'aria-label': p.label, 'aria-hidden': p.label ? undefined : 'true', dangerouslySetInnerHTML: { __html: ILLO[p.name] || ILLO.huongDan } });
  }

  function HomeHeader(p) {
    var multi = !!p.canSwitchRole;
    return h('div', { className: cx('tp-home', 'tp-home2', p.className) },
      h('div', { className: 'tp-home-top' },
        h('div', { className: cx('tp-home-row', p.brand === false && 'tp-home-row-greet') },
          p.brand === false ? h('div', { className: 'tp-home-greet' }, p.greeting || 'Xin chào') : null,
          p.brand !== false && p.logoSrc ? h('img', { className: 'tp-home-logo', src: p.logoSrc, alt: 'Quốc huy Tòa án nhân dân' }) : null,
          p.brand !== false ? h('span', { className: 'tp-home-brand' }, p.brand || 'Cổng dịch vụ tư pháp') : null,
          p.onCalendar ? h('button', { type: 'button', className: 'tp-bell tp-home-cal', 'aria-label': 'Lịch', onClick: p.onCalendar }, h(Icon, { name: 'calendar' })) : null,
          h('button', { type: 'button', className: 'tp-bell', 'aria-label': p.unread ? 'Thông báo, có thông báo mới' : 'Thông báo', onClick: p.onBell }, h(Icon, { name: 'bell' }), p.unread ? h('span', { className: 'tp-bell-dot' }) : null)),
        p.brand === false ? null : h('div', { className: 'tp-home-greet' }, p.greeting || 'Xin chào'),
        (p.role || p.subtitle) ? h('div', { className: 'tp-home-rolerow' },
          p.role ? (multi ? h('button', { type: 'button', className: 'tp-role', 'aria-haspopup': 'listbox', 'aria-label': 'Vai trò: ' + p.role + '. Chọn vai trò khác', onClick: p.onRoleClick }, p.role, h(Icon, { name: 'chevronDown' }))
            : h('span', { className: 'tp-role tp-role-static' }, p.role)) : null,
          p.subtitle ? h('span', { className: 'tp-home-sub' }, p.subtitle) : null) : null),
      p.searchPlaceholder ? h('button', { type: 'button', className: 'tp-search', onClick: p.onSearch },
        h('span', { className: 'tp-search-ico' }, h(Icon, { name: 'search' })), h('span', null, p.searchPlaceholder)) : null);
  }

  function BannerCarousel(p) {
    var st = React.useState(0), idx = st[0], set = st[1], slides = p.slides || [];
    var onScroll = function (e) { var el = e.currentTarget; set(Math.round(el.scrollLeft / Math.max(1, el.clientWidth))); };
    return h('div', { className: cx('tp-carousel', p.className), 'aria-roledescription': 'carousel' },
      h('div', { className: 'tp-carousel-track', onScroll: onScroll }, slides.map(function (s, i) {
        return h('div', { key: i, className: 'tp-slide', 'aria-label': (i + 1) + ' / ' + slides.length },
          s.imageSrc ? h('img', { src: s.imageSrc, alt: '' }) : null,
          h('div', { className: 'tp-slide-body' }, s.eyebrow ? h('div', { className: 'tp-slide-k' }, s.eyebrow) : null, h('div', { className: 'tp-slide-t' }, s.title), s.description ? h('div', { className: 'tp-slide-d' }, s.description) : null,
            s.cta ? h('button', { type: 'button', className: 'tp-btn tp-btn-gold tp-btn-sm tp-slide-cta', onClick: s.onClick }, s.cta) : null));
      })),
      slides.length > 1 ? h('div', { className: 'tp-dots', 'aria-hidden': 'true' }, slides.map(function (_, i) { return h('i', { key: i, className: i === idx ? 'on' : '' }); })) : null);
  }

  function QuickAction(p) {
    var size = p.size || 'lg';
    return h('button', { type: 'button', className: cx('tp-qa', 'tp-qa-' + (p.tone || 'plain'), size === 'md' && 'tp-qa-md', p.className), disabled: p.disabled, onClick: p.onClick },
      h('span', { className: 'tp-qa-circle' }, h(Icon, { name: p.icon })),
      h('span', null, h('span', { className: 'tp-qa-t', style: { display: 'block' } }, p.title), p.subtitle && size !== 'md' ? h('span', { className: 'tp-qa-s', style: { display: 'block' } }, p.subtitle) : null));
  }

  function NewsCard(p) {
    return h('button', { type: 'button', className: cx('tp-news', p.className), disabled: p.disabled, onClick: p.onClick },
      h('div', { className: 'tp-news-img' }, p.imageSrc ? h('img', { src: p.imageSrc, alt: '' }) : null, p.tag ? h('span', { className: 'tp-news-tag' }, p.tag) : null),
      h('div', { className: 'tp-news-t' }, p.title), p.date ? h('div', { className: 'tp-news-d' }, p.date) : null);
  }

  function FormSection(p) {
    var ctl = p.open !== undefined, st = React.useState(!!p.defaultOpen), open = ctl ? p.open : st[0];
    var toggle = function () { if (ctl) { p.onToggle && p.onToggle(!open); } else { st[1](!open); } };
    var done = p.status === 'done';
    return h('section', { className: cx('tp-sec-card', open && 'tp-sec-open', p.className) },
      h('button', { type: 'button', className: 'tp-sec-head', 'aria-expanded': open ? 'true' : 'false', onClick: toggle },
        h('span', null, p.title),
        p.status ? (function () { var ok = done || p.status === 'signed'; var txt = p.status === 'signed' ? 'Đã ký số' : p.status === 'unsigned' ? 'Chưa ký số' : done ? 'Đã nhập' : 'Chưa nhập'; return h(StatusBadge, { variant: 'outline', tone: ok ? 'success' : 'neutral', icon: ok ? 'checkCircle' : undefined }, txt); })() : null,
        h(Icon, { name: 'chevronRight' })),
      open ? h('div', { className: 'tp-sec-body' }, p.children) : null);
  }

  function SelectField(p) {
    var lid = React.useRef(null); if (!lid.current) lid.current = 'tp-s' + (++cid);
    var shown = p.labelVisible && p.label;
    var btn = h('div', { className: cx('tp-select', p.open && !p.disabled && 'tp-select-open', p.error && 'tp-select-error', p.disabled && 'tp-select-off', !shown && p.className) },
      h('button', { type: 'button', className: 'tp-select-btn', disabled: p.disabled, onClick: p.onClick, 'aria-invalid': p.error ? 'true' : undefined, 'aria-haspopup': 'listbox', 'aria-expanded': p.open ? 'true' : 'false', 'aria-labelledby': shown ? lid.current : undefined, 'aria-label': shown ? undefined : (p.label || p.placeholder) },
        p.icon ? h(Icon, { name: p.icon, className: 'tp-select-lead' }) : null,
        h('span', { className: p.value ? 'tp-select-val' : 'tp-select-ph' }, p.value || p.placeholder, !p.value && p.required && !shown ? h('span', { className: 'tp-field-req', 'aria-hidden': 'true' }, ' *') : null),
        h(Icon, { name: 'chevronRight', className: 'tp-select-caret' })),
      p.value && p.onClear && !p.disabled ? h('button', { type: 'button', className: 'tp-select-clear', 'aria-label': 'Bỏ chọn', onClick: p.onClear }, h(Icon, { name: 'x' })) : null,
      p.open && p.options && !p.disabled ? h('ul', { className: 'tp-listbox', role: 'listbox', 'aria-label': p.label || p.placeholder }, p.options.map(function (o, i) {
        var lab = typeof o === 'string' ? o : o.label, sel = lab === p.value;
        return h('li', { key: i, role: 'option', 'aria-selected': sel ? 'true' : 'false', className: sel ? 'tp-listbox-on' : undefined, onClick: function () { p.onSelect && p.onSelect(o); } }, lab, sel ? h(Icon, { name: 'check' }) : null);
      })) : null);
    if (!shown) return btn;
    return h('div', { className: cx('tp-field', p.error && 'tp-field-error', p.disabled && 'tp-field-off', p.className) },
      h('span', { className: 'tp-field-label', id: lid.current }, p.label, p.required ? h('span', { className: 'tp-field-req', 'aria-hidden': 'true' }, '*') : null), btn,
      p.error ? h('div', { className: 'tp-field-help' }, h(Icon, { name: 'alert' }), p.error) : null);
  }

  function OptionItem(p) {
    return h('label', { className: cx('tp-opt', p.checked && 'tp-opt-on', p.disabled && 'tp-opt-off', p.className) },
      h('span', { className: 'tp-opt-ill' }, h(Illustration, { name: p.illustration })),
      h('span', { className: 'tp-opt-txt' }, h('span', { className: 'tp-opt-t' }, p.title, p.onInfo ? h('span', { role: 'button', tabIndex: 0, 'aria-label': 'Thông tin ' + p.title, onClick: function (e) { e.preventDefault(); p.onInfo(); } }, h(Icon, { name: 'info' })) : null),
        p.meta ? h('span', { className: 'tp-opt-m' }, p.meta) : null),
      h('input', { type: 'checkbox', checked: !!p.checked, disabled: p.disabled, onChange: function (e) { p.onChange && p.onChange(e.target.checked); } }));
  }

  function SummaryBar(p) {
    var st = React.useState(!!p.defaultOpen), open = st[0];
    return h('div', { className: cx('tp-sum', open && 'tp-sum-open', p.className) },
      h('button', { type: 'button', className: 'tp-sum-head', 'aria-expanded': open ? 'true' : 'false', onClick: function () { st[1](!open); } },
        h('span', null, p.title || 'Xem thông tin án phí'), p.total ? h('span', { className: 'tp-sum-total' }, p.total) : null, h(Icon, { name: 'chevronRight' })),
      open && p.rows ? h('div', { className: 'tp-sum-rows' }, p.rows.map(function (r, i) { return h('div', { key: i, className: 'tp-sum-row' }, h('span', null, r.label), h('b', null, r.value)); })) : null,
      h('div', { className: 'tp-sum-act' },
        h(Button, { variant: 'tonal', onClick: p.onSecondary }, p.secondaryLabel || 'Lưu nháp'),
        h(Button, { disabled: p.primaryDisabled, onClick: p.onPrimary }, p.primaryLabel || 'Gửi đơn')));
  }

  function SheetMenu(p) {
    return h('div', { className: cx('tp-menu', p.className), role: 'dialog', 'aria-label': p.title },
      h('div', { className: 'tp-menu-handle', 'aria-hidden': 'true' }),
      p.title ? h('div', { className: 'tp-menu-title' }, p.title) : null,
      (p.items || []).map(function (it, i) {
        return h('button', { key: i, type: 'button', className: 'tp-menu-item', onClick: it.onClick },
          h(Illustration, { name: it.illustration }), h('span', null, it.label, it.description ? h('span', { className: 'tp-menu-desc' }, it.description) : null), h(Icon, { name: 'chevronRight' }));
      }));
  }

  function FilterCard(p) {
    return h('form', { className: cx('tp-filter', p.className), role: 'search', onSubmit: function (e) { e.preventDefault(); p.onSubmit && p.onSubmit(); } },
      h('div', { className: 'tp-input-ico' }, h(Icon, { name: 'search' }), h('input', { type: 'search', placeholder: p.placeholder || 'Nhập mã hồ sơ, số thụ lý', 'aria-label': p.placeholder || 'Tìm kiếm' })),
      p.children,
      h(Button, { block: true, type: 'submit', loading: p.loading }, p.submitLabel || 'Tra cứu'));
  }

  function HsCard(o) {
    var copy = function (v) { try { navigator.clipboard && navigator.clipboard.writeText(v); } catch (e) {} };
    if (o.loading) return h('div', { className: cx('tp-hs', 'tp-hs-skel', o.className), 'aria-busy': 'true' },
      h('span', { className: 'tp-sr' }, 'Đang tải'),
      h('div', { className: 'tp-hs-main', 'aria-hidden': 'true' }, ['30%', '90%', '60%', '75%'].map(function (w, i) { return h('span', { key: i, className: 'tp-skel', style: { width: w } }); }), h('span', { className: 'tp-skel tp-skel-pill' })));
    var meta = [o.court].concat(o.meta || []).concat([o.date]).filter(Boolean).join(' · ');
    var acts = (o.onStar || o.onArchive) ? h('span', { className: 'tp-hs-acts' },
      o.onStar ? h('button', { type: 'button', className: cx('tp-hs-act', o.starred && 'tp-hs-act-on'), 'aria-pressed': o.starred ? 'true' : 'false', 'aria-label': 'Đánh dấu', onClick: o.onStar }, h(Icon, { name: 'star' })) : null,
      o.onArchive ? h('button', { type: 'button', className: 'tp-hs-act', 'aria-label': 'Lưu trữ', onClick: o.onArchive }, h(Icon, { name: 'archive' })) : null) : null;
    var cr = o.caseRef;
    return h('div', { className: cx('tp-hs', o.className) },
      h('button', { type: 'button', className: 'tp-hs-hit', 'aria-label': 'Xem chi tiết: ' + (o.title || o.codeLabel + ' ' + o.code), onClick: o.onClick }),
      h('div', { className: 'tp-hs-main' },
        (o.kind || acts) ? h('div', { className: cx('tp-hs-top', acts && 'tp-hs-top-acts') }, o.kind ? h('p', { className: 'tp-hs-kind' }, o.kind) : h('span'), acts) : null,
        o.title ? h('p', { className: 'tp-hs-title' }, o.title) : null,
        o.code ? h('div', { className: 'tp-hs-code' }, h('span', null, o.codeLabel), h('b', { className: 'tp-num' }, o.code),
          h('button', { type: 'button', className: 'tp-copy', 'aria-label': 'Sao chép ' + o.codeLabel.toLowerCase() + ' ' + o.code, onClick: function () { copy(o.code); } }, h(Icon, { name: 'copy' }))) : null,
        meta ? h('p', { className: 'tp-hs-meta' }, meta) : null,
        o.status ? h('div', { className: 'tp-hs-row' }, h(StatusBadge, { tone: o.statusTone || 'info' }, o.status)) : null,
        o.children ? h('div', { className: 'tp-hs-extra' }, o.children) : null,
        cr ? h('div', { className: 'tp-hs-case' }, h('span', null, (cr.label || 'Vụ án') + ' ', h('b', { className: 'tp-num' }, cr.code), cr.title ? ' · ' + cr.title : '')) : null));
  }

  function RecordCard(p) {
    return HsCard(Object.assign({}, p, { codeLabel: p.codeLabel || 'Mã hồ sơ' }));
  }

  function ChatFab(p) {
    return h('button', { type: 'button', className: cx('tp-fab', p.className), 'aria-label': p.label || 'Hỗ trợ trực tuyến', onClick: p.onClick, style: p.style }, h(Illustration, { name: 'chat' }));
  }

  var fid = 0;
  function TextField(p) {
    var idRef = React.useRef(null); if (!idRef.current) idRef.current = p.id || 'tp-f' + (++fid);
    var id = idRef.current, helpId = id + '-help';
    var reveal = React.useState(false), cnt = React.useState(String(p.defaultValue || '').length);
    var isPw = p.type === 'password' && p.revealable !== false;
    var len = p.value !== undefined ? String(p.value).length : cnt[0];
    var msg = p.error || p.help;
    var rest = Object.assign({}, p); ['label', 'help', 'error', 'required', 'multiline', 'className', 'id', 'icon', 'onClear', 'revealable', 'showCount'].forEach(function (k) { delete rest[k]; });
    if (isPw) rest.type = reveal[0] ? 'text' : 'password';
    rest.onChange = function (e) { cnt[1](e.target.value.length); p.onChange && p.onChange(e); };
    var hasClear = p.onClear && len > 0 && !p.multiline && !p.disabled && !p.readOnly;
    var input = h(p.multiline ? 'textarea' : 'input', Object.assign({ id: id, className: cx('tp-field-input', p.icon && 'tp-field-has-lead', (hasClear || isPw) && 'tp-field-has-trail'), required: p.required, 'aria-invalid': p.error ? 'true' : undefined, 'aria-describedby': msg ? helpId : undefined }, rest));
    var control = (p.icon || hasClear || isPw) ? h('div', { className: 'tp-field-control' },
      p.icon ? h(Icon, { name: p.icon, className: 'tp-field-lead' }) : null, input,
      hasClear ? h('button', { type: 'button', className: 'tp-field-trail', 'aria-label': 'Xóa nội dung', onClick: function () { cnt[1](0); p.onClear(); } }, h(Icon, { name: 'x' })) : null,
      isPw ? h('button', { type: 'button', className: 'tp-field-trail', 'aria-label': reveal[0] ? 'Ẩn mật khẩu' : 'Hiện mật khẩu', 'aria-pressed': reveal[0] ? 'true' : 'false', onClick: function () { reveal[1](!reveal[0]); } }, h(Icon, { name: reveal[0] ? 'eyeOff' : 'eye' })) : null) : input;
    var counter = p.showCount && (p.maxLength || p.minLength) ? h('div', { className: 'tp-field-count tp-num', 'aria-live': 'polite' },
      h('span', null, p.minLength ? len + ' / tối thiểu ' + p.minLength + ' ký tự' : ''), h('span', null, p.maxLength ? len + ' / ' + p.maxLength : '')) : null;
    return h('div', { className: cx('tp-field', p.error && 'tp-field-error', p.disabled && 'tp-field-off', p.readOnly && 'tp-field-ro', p.className) },
      h('label', { className: 'tp-field-label', htmlFor: id }, p.label, p.required ? h('span', { className: 'tp-field-req', 'aria-hidden': 'true' }, '*') : null),
      control, counter,
      msg ? h('div', { className: 'tp-field-help', id: helpId }, p.error ? h(Icon, { name: 'alert' }) : null, msg) : null);
  }

  function StatusBadge(p) {
    var tone = p.tone || 'neutral';
    return h('span', { className: cx('tp-badge', 'tp-badge-' + tone, p.variant === 'outline' && 'tp-badge-outline', p.className) },
      p.icon ? h(Icon, { name: p.icon }) : p.icon === false ? null : h('span', { className: 'tp-badge-dot', 'aria-hidden': 'true' }), p.children);
  }

  function Tabs(p) {
    var items = p.items || [], ctl = p.value !== undefined, v = p.variant === 'chip' ? 'chip' : 'underline';
    var st = React.useState(p.defaultValue !== undefined ? p.defaultValue : (items[0] && items[0].key)), val = ctl ? p.value : st[0];
    return h('div', { className: cx('tp-tabs', 'tp-tabs-' + v, p.className), role: 'tablist', 'aria-label': p.label }, items.map(function (it) {
      var on = it.key === val;
      return h('button', { key: it.key, type: 'button', role: 'tab', 'aria-selected': on ? 'true' : 'false', className: cx('tp-tab', on && 'tp-tab-on'), disabled: it.disabled,
        onClick: function () { if (!ctl) st[1](it.key); p.onChange && p.onChange(it.key); } },
        v === 'chip' && on ? h(Icon, { name: 'check' }) : null,
        it.label, it.count !== undefined && it.count !== null ? h('span', { className: 'tp-tab-count tp-num' }, it.count) : null);
    }));
  }

  function ServiceTile(p) {
    return h('button', { type: 'button', className: cx('tp-tile', p.illustration && 'tp-tile-illo', p.className), disabled: p.disabled, onClick: p.onClick },
      p.illustration ? h('span', { className: 'tp-illo-circle' }, h(Illustration, { name: p.illustration }), p.count ? h('span', { className: 'tp-tile-count', 'aria-label': p.count + ' mới' }, p.count) : null)
        : h(IconBox, { icon: p.icon, count: p.count }),
      h('span', null, p.label));
  }

  function CaseCard(p) {
    return HsCard(Object.assign({}, p, { codeLabel: p.codeLabel || 'Số thụ lý', code: p.caseNo }));
  }

  function Timeline(p) {
    return h('ol', { className: cx('tp-tl', p.className) }, (p.steps || []).map(function (s, i) {
      var st = s.state || 'upcoming';
      return h('li', { key: i, className: cx('tp-tl-item', 'tp-tl-' + st), 'aria-current': st === 'current' ? 'step' : undefined },
        h('span', { className: 'tp-tl-dot' }, st === 'done' ? h(Icon, { name: 'check' }) : st === 'current' ? h(Icon, { name: 'clock' }) : null),
        h('div', null,
          st === 'current' ? h('div', { className: 'tp-tl-k' }, p.currentLabel || 'Đang diễn ra') : null,
          h('div', { className: 'tp-tl-title' }, s.title),
          s.date ? h('div', { className: 'tp-tl-date' }, s.date) : null,
          s.description ? h('div', { className: 'tp-tl-desc' }, s.description) : null));
    }));
  }

  function AppBar(p) {
    return h('header', { className: cx('tp-appbar', p.variant === 'plain' && 'tp-appbar-plain', p.variant === 'page' && 'tp-appbar-page', p.variant === 'page' && p.actions && p.actions.length && 'tp-has-action', p.className) },
      p.onBack ? h('button', { type: 'button', className: 'tp-appbar-btn', 'aria-label': 'Quay lại', onClick: p.onBack }, h(Icon, { name: p.variant === 'plain' ? 'chevronLeft' : 'arrowLeft' })) :
        p.logoSrc ? h('img', { className: 'tp-appbar-logo', src: p.logoSrc, alt: 'Quốc huy Tòa án nhân dân' }) : null,
      h('div', { className: 'tp-appbar-title' }, h('span', { className: 'tp-appbar-name' }, p.title), p.subtitle ? h('span', { className: 'tp-appbar-sub' }, p.subtitle) : null),
      (p.actions || []).map(function (a, i) {
        if (a.avatar) return h('button', { key: i, type: 'button', className: 'tp-appbar-btn', 'aria-label': a.label, onClick: a.onClick }, h('span', { className: 'tp-avatar', 'aria-hidden': 'true' }, a.avatar));
        if (a.text) return h('button', { key: i, type: 'button', className: 'tp-appbar-text', onClick: a.onClick }, a.text);
        return h('button', { key: i, type: 'button', className: 'tp-appbar-btn', 'aria-label': a.label, onClick: a.onClick },
          h(Icon, { name: a.icon }), a.dot ? h('span', { className: 'tp-appbar-dot' }) : null);
      }));
  }

  function BottomNav(p) {
    var lab = p.labels !== false;
    return h('nav', { className: cx('tp-nav', 'tp-nav2', !lab && 'tp-nav-icons', p.className), 'aria-label': 'Điều hướng chính' }, (p.items || []).map(function (it) {
      if (it.primary) return h('button', { key: it.key, type: 'button', className: 'tp-nav-main', 'aria-label': lab ? undefined : it.label, onClick: function () { if (it.onClick) it.onClick(); else if (p.onChange) p.onChange(it.key); } },
        h('span', { className: 'tp-nav-fab' }, h(Icon, { name: it.icon })), lab ? it.label : null);
      var on = it.key === p.active;
      return h('button', { key: it.key, type: 'button', className: cx('tp-nav-item', on && 'tp-nav-on'), 'aria-current': on ? 'page' : undefined, 'aria-label': lab ? undefined : it.label, onClick: function () { p.onChange && p.onChange(it.key); } },
        lab ? h(Icon, { name: it.icon }) : h('span', { className: 'tp-nav-pill' }, h(Icon, { name: it.icon })), lab ? it.label : null);
    }));
  }

  /* ---------- Thêm 30/10/2026: component từ màn Đăng nhập và luồng nộp đơn Khiếu nại – kiến nghị ---------- */

  function Spinner() { return h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }); }

  function BackLink(p) {
    return h(p.href ? 'a' : 'button', { className: cx('tp-back', p.className), href: p.href, type: p.href ? undefined : 'button', onClick: p.onClick },
      h(Icon, { name: 'chevronLeft' }), p.children);
  }

  /* color 1–20: bộ màu nhãn Trầm (token tag-N, tag-N-text, tag-N-bg; 03/11/2026) */
  function Tag(p) { return h('span', { className: cx('tp-tag', p.color && 'tp-tag-c tp-tag-' + p.color, p.className) }, p.children); }

  function Notice(p) {
    if (p.tone === 'reminder') {
      return h('section', { className: cx('tp-notice-rem', p.className), role: p.role || 'status' },
        h('span', { className: 'tp-notice-illo' }, h(Illustration, { name: p.illustration || 'uyQuyen' })),
        h('div', { className: 'tp-notice-tx' },
          p.title ? h('p', { className: 'tp-notice-t' }, p.title) : null,
          p.children ? h('div', { className: 'tp-notice-d' }, p.children) : null,
          p.actionLabel ? h(Button, { size: 'sm', className: 'tp-notice-btn', onClick: p.onAction }, p.actionLabel) : null),
        p.onClose ? h('button', { type: 'button', className: 'tp-notice-x', 'aria-label': p.closeLabel || 'Đóng thông báo', onClick: p.onClose }, h(Icon, { name: 'x' })) : null);
    }
    return h('div', { className: cx('tp-notice', p.className), role: p.role }, h(Icon, { name: p.icon || 'info' }), h('div', null, p.children));
  }

  function Stepper(p) {
    var steps = p.steps || [], cur = p.current || 1;
    return h('div', { className: cx('tp-stepper', p.className) },
      h('ol', { className: 'tp-stepper-dots', 'aria-label': 'Bước ' + cur + ' trên ' + steps.length },
        steps.map(function (s, i) {
          var n = i + 1, st = n < cur ? 'done' : n === cur ? 'cur' : 'todo';
          return h('li', { key: i, className: 'tp-stepper-' + st, 'aria-current': st === 'cur' ? 'step' : undefined },
            h('span', { className: 'tp-stepper-dot' }, st === 'done' ? h(Icon, { name: 'check' }) : String(n)),
            h('span', { className: 'tp-sr' }, s + (st === 'done' ? ' (đã xong)' : '')));
        })),
      steps[cur - 1] ? h('p', { className: 'tp-stepper-label' }, h('span', null, 'Bước ' + cur), ' · ', steps[cur - 1]) : null);
  }

  var cid = 0;
  function Checkbox(p) {
    var idRef = React.useRef(null); if (!idRef.current) idRef.current = p.id || 'tp-c' + (++cid);
    var rest = Object.assign({}, p); ['label', 'className', 'id', 'children', 'error'].forEach(function (k) { delete rest[k]; });
    var eid = idRef.current + '-err';
    return h('label', { className: cx('tp-check', p.disabled && 'tp-check-off', p.error && 'tp-check-err', p.className), htmlFor: idRef.current },
      h('input', Object.assign({ id: idRef.current, type: 'checkbox', 'aria-invalid': p.error ? 'true' : undefined, 'aria-describedby': p.error ? eid : undefined }, rest)),
      h('span', { className: 'tp-check-box', 'aria-hidden': 'true' }, h(Icon, { name: 'check' })),
      h('span', { className: 'tp-check-text' }, p.label || p.children,
        p.error ? h('span', { className: 'tp-check-help', id: eid }, h(Icon, { name: 'alert' }), p.error) : null));
  }

  function SegmentedControl(p) {
    var opts = p.options || [];
    var st = React.useState(p.defaultValue !== undefined ? p.defaultValue : (opts[0] && opts[0].value));
    var val = p.value !== undefined ? p.value : st[0];
    return h('div', { className: cx('tp-seg', p.disabled && 'tp-seg-off', p.className), role: 'group', 'aria-label': p.label },
      opts.map(function (o) {
        var on = o.value === val;
        return h('button', { key: o.value, type: 'button', className: on ? 'tp-seg-on' : undefined, 'aria-pressed': on ? 'true' : 'false', disabled: p.disabled || o.disabled,
          onClick: function () { st[1](o.value); p.onChange && p.onChange(o.value); } }, o.label);
      }));
  }

  function InfoList(p) {
    var v = p.variant || 'box';
    return h('dl', { className: cx('tp-info', 'tp-info-' + v, p.className) }, (p.items || []).map(function (it, i) {
      return h('div', { key: i }, h('dt', null, it.label), h('dd', { className: it.mono ? 'tp-num' : undefined }, it.value));
    }));
  }

  function ActionBar(p) { return h('div', { className: cx('tp-actionbar', p.className) }, p.children); }

  function Dialog(p) {
    var tidRef = React.useRef(null); if (!tidRef.current) tidRef.current = 'tp-dlg' + (++cid);
    var tid = tidRef.current, sheet = (p.variant || 'sheet') === 'sheet';
    if (p.open === false) return null;
    return h('div', { className: cx('tp-dlg-wrap', p.inline && 'tp-dlg-inline', p.className) },
      h('div', { className: 'tp-scrim', onClick: p.onClose }),
      h('div', { className: cx('tp-dlg', sheet ? 'tp-dlg-sheet' : 'tp-dlg-center'), role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': tid },
        h('div', { className: 'tp-dlg-head' }, h('h3', { id: tid }, p.title),
          p.onClose ? h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Đóng', onClick: p.onClose }, h(Icon, { name: 'x' })) : null),
        p.description ? h('p', { className: 'tp-dlg-desc' }, p.description) : null,
        h('div', { className: 'tp-dlg-body' }, p.children),
        p.footer ? h('div', { className: 'tp-dlg-foot' }, p.footer) : null));
  }

  function Accordion(p) {
    var groups = p.groups || [];
    var nm = React.useRef(null); if (!nm.current) nm.current = 'tp-acc' + (++cid);
    var st = React.useState(p.defaultOpen || []), open = p.open || st[0];
    var toggle = function (k) { var n = open.indexOf(k) >= 0 ? open.filter(function (x) { return x !== k; }) : open.concat([k]); st[1](n); p.onToggle && p.onToggle(n); };
    return h('div', { className: cx('tp-acc', 'tp-acc-cards', p.className) }, groups.map(function (g) {
      var on = open.indexOf(g.key) >= 0;
      return h('div', { key: g.key, className: 'tp-acc-group' },
        h('button', { type: 'button', className: 'tp-acc-head', 'aria-expanded': on ? 'true' : 'false', onClick: function () { toggle(g.key); } },
          h('span', { className: 'tp-acc-title' }, g.title), g.meta ? h('span', { className: 'tp-acc-meta' }, g.meta) : null, h(Icon, { name: 'chevronDown' })),
        on && (g.items || []).length ? h('ul', { className: 'tp-acc-items', role: 'radiogroup', 'aria-label': g.title }, g.items.map(function (it) {
          var sel = it.key === p.value;
          return h('li', { key: it.key }, h('label', { className: cx('tp-acc-radio', sel && 'tp-acc-on') },
            h('input', { type: 'radio', name: nm.current, value: it.key, checked: sel, onChange: function () { p.onSelect && p.onSelect(it.key); } }),
            h('span', { className: 'tp-acc-rdot', 'aria-hidden': 'true' }), it.label));
        })) : null);
    }));
  }

  function fileExt(name) { var m = /\.([a-z0-9]+)$/i.exec(name || ''); return m ? m[1].toUpperCase().slice(0, 4) : 'TỆP'; }

  function FileItem(p) {
    var st = p.status || 'done';
    return h('li', { className: cx('tp-file', st === 'error' && 'tp-file-err', p.className) },
      h('span', { className: 'tp-file-type', 'aria-hidden': 'true' }, fileExt(p.name)),
      h('span', { className: 'tp-file-text' },
        h('span', { className: 'tp-file-name' }, p.name),
        p.meta ? h('span', { className: 'tp-file-meta' }, p.meta) : null,
        st === 'uploading' ? h('span', { className: 'tp-file-prog', role: 'progressbar', 'aria-label': 'Đang tải ' + p.name, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': p.progress || 0 },
          h('span', { style: { width: (p.progress || 0) + '%' } })) : null,
        st === 'error' && p.error ? h('span', { className: 'tp-file-error', role: 'alert' }, h(Icon, { name: 'alert' }), p.error) : null),
      p.onRemove ? h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Xóa ' + p.name, onClick: p.onRemove }, h(Icon, { name: 'trash' })) : null);
  }

  function FilePick(p) {
    return h('label', { className: cx(p.className) },
      h('input', { type: 'file', className: 'tp-file-input', accept: p.accept, multiple: p.multiple, disabled: p.disabled,
        onChange: function (e) { p.onPick && p.onPick(Array.prototype.slice.call(e.target.files || [])); e.target.value = ''; } }),
      p.children);
  }

  function FileUpload(p) {
    var files = p.files || [], max = p.max || 10, full = files.length >= max;
    var uploadLabel = p.uploadLabel || 'Tải lên tài liệu bổ sung';
    var err = p.error ? h('p', { className: 'tp-upload-err', role: 'alert' }, h(Icon, { name: 'alert' }), p.error) : null;
    if (!files.length) {
      return h('div', { className: cx('tp-upload', p.error && 'tp-upload-error', p.disabled && 'tp-upload-off', p.className) },
        h('span', { className: 'tp-upload-ico' }, h(Icon, { name: 'upload' })),
        p.hint ? h('p', { className: 'tp-upload-hint' }, p.hint) : null,
        h(FilePick, { className: cx('tp-btn tp-btn-primary tp-btn-block tp-filepick', p.disabled && 'tp-filepick-off'), accept: p.accept, multiple: p.multiple !== false, disabled: p.disabled, onPick: p.onPick }, h(Icon, { name: 'upload' }), uploadLabel),
        p.onLibrary ? h(Button, { variant: 'ghost', icon: 'folder', disabled: p.disabled, onClick: p.onLibrary }, p.libraryLabel || 'Lấy từ kho dữ liệu cá nhân') : null, err);
    }
    full = full || !!p.disabled;
    return h('div', { className: cx('tp-upload-list', p.className) },
      h('div', { className: 'tp-upload-head' }, p.title ? h('span', null, p.title) : h('span', null), h('span', { className: 'tp-num' }, files.length + ' / ' + max + ' tệp')),
      h('ul', { className: 'tp-files' }, files.map(function (f, i) { return h(FileItem, Object.assign({ key: f.name + i }, f)); })),
      h('div', { className: cx('tp-upload-row', full && 'tp-upload-row-off') },
        h('span', { className: 'tp-upload-ico' }, h(Icon, { name: 'upload' })),
        h('span', { className: 'tp-upload-row-text' }, h('span', null, uploadLabel), h('span', null, files.length >= max ? 'tối đa ' + max + ' tệp' : (p.shortHint || ''))),
        full ? h('span', { className: 'tp-upload-add', 'aria-hidden': 'true' }, h(Icon, { name: 'plus' })) :
          h(FilePick, { className: 'tp-upload-add', accept: p.accept, multiple: p.multiple !== false, onPick: p.onPick }, h('span', { className: 'tp-sr' }, uploadLabel), h(Icon, { name: 'plus' }))), err);
  }

  /* ---------- Thêm 30/10/2026 (lần 3): component cho bản thiết kế lại app TATC ---------- */

  function TaskList(p) {
    return h('ul', { className: cx('tp-task', p.className) }, (p.items || []).map(function (t, i) {
      var warn = t.tone === 'warning' || t.tone === 'danger';
      return h('li', { key: i }, h('button', { type: 'button', className: 'tp-task-row', onClick: t.onClick },
        h('span', { className: cx('tp-task-date', warn && 'tp-task-date-' + t.tone), 'aria-hidden': 'true' }, h('b', { className: 'tp-num' }, t.day), h('span', null, t.month)),
        h('span', { className: 'tp-task-text' },
          h('span', { className: 'tp-task-title' }, t.title),
          t.code ? h('span', { className: 'tp-task-code tp-num' }, t.code) : null,
          h('span', { className: cx('tp-task-due', 'tp-task-due-' + (t.tone || 'info')) }, h(Icon, { name: 'clock' }), [t.remain, t.status].filter(Boolean).join(' · '))),
        h(Icon, { name: 'chevronRight', className: 'tp-task-chev' })));
    }));
  }

  function StatSummary(p) {
    var brand = p.variant !== 'plain';
    return h('section', { className: cx('tp-stat2', brand ? 'tp-stat2-brand tp-on-dark' : 'tp-stat2-plain', p.className) },
      p.title ? h('h3', { className: 'tp-stat2-title' }, p.title) : null,
      p.stats ? h('div', { className: 'tp-stat2-grid' }, p.stats.map(function (s, i) {
        return h('button', { key: i, type: 'button', onClick: s.onClick }, h('b', { className: 'tp-num' }, s.value), h('span', null, s.label));
      })) : null,
      p.amount ? h('div', { className: 'tp-stat2-amt' }, h('span', null, p.amountLabel), h('b', { className: 'tp-num' }, p.amount)) : null,
      p.subs ? h('div', { className: 'tp-stat2-subs' }, p.subs.map(function (s, i) {
        return h('div', { key: i }, h('span', null, s.label), h('b', { className: 'tp-num' }, s.value));
      })) : null);
  }

  function MenuList(p) {
    var groups = p.groups || (p.items ? [p.items] : []);
    return h('div', { className: cx('tp-menu2', p.className) }, groups.map(function (g, gi) {
      return h('ul', { key: gi, className: cx('tp-menu2-group', g.some(function (it) { return it.illustration; }) && 'tp-menu2-illos') }, g.map(function (it, i) {
        return h('li', { key: i }, h('button', { type: 'button', className: cx('tp-menu2-item', it.danger && 'tp-menu2-danger'), onClick: it.onClick },
          it.illustration ? h('span', { className: 'tp-menu2-illo' }, h(Illustration, { name: it.illustration })) : h(Icon, { name: it.icon, className: 'tp-menu2-ico' }),
          h('span', { className: 'tp-menu2-text' }, h('span', null, it.label), it.description ? h('small', null, it.description) : null),
          it.count ? h('span', { className: 'tp-menu2-count tp-num' }, it.count) : null,
          it.danger ? null : h(Icon, { name: 'chevronRight', className: 'tp-menu2-chev' })));
      }));
    }));
  }

  function ProfileCard(p) {
    var hd = p.variant === 'header';
    return h('div', { className: cx('tp-profile', hd && 'tp-profile-header', 'tp-on-dark', p.className) },
      h('div', { className: 'tp-profile-row' },
        hd ? null : h('span', { className: 'tp-profile-av', 'aria-hidden': 'true' }, p.initials),
        h('p', { className: 'tp-profile-name' }, p.name),
        p.onOpen ? h('button', { type: 'button', className: 'tp-profile-go', 'aria-label': p.openLabel || 'Thông tin tài khoản', onClick: p.onOpen }, h(Icon, { name: 'chevronRight' })) : null),
      (p.role || p.subtitle) ? h('div', { className: 'tp-home-rolerow' },
        p.role ? (p.canSwitchRole ? h('button', { type: 'button', className: 'tp-role', 'aria-haspopup': 'listbox', 'aria-label': 'Vai trò: ' + p.role + '. Chọn vai trò khác', onClick: p.onRoleClick }, p.role, h(Icon, { name: 'chevronDown' }))
          : h('span', { className: 'tp-role tp-role-static' }, p.role)) : null,
        p.subtitle ? h('span', { className: 'tp-home-sub' }, p.subtitle) : null) : null);
  }

  function MailList(p) {
    return h('ul', { className: cx('tp-mail', p.className) }, (p.items || []).map(function (m, i) {
      return h('li', { key: i, className: m.unread ? 'tp-mail-unread' : undefined },
        h('button', { type: 'button', className: 'tp-mail-hit', 'aria-label': (m.unread ? 'Chưa đọc. ' : '') + m.title, onClick: m.onClick }),
        m.unread ? h('i', { className: 'tp-mail-dot', 'aria-hidden': 'true' }) : null,
        h('div', { className: 'tp-mail-main' },
          h('div', { className: 'tp-mail-top' }, h('span', { className: 'tp-mail-from' }, m.from), h('span', { className: 'tp-mail-time tp-num' }, m.time)),
          h('p', { className: 'tp-mail-title' }, m.title),
          m.deadline ? h('span', { className: cx('tp-mail-due', 'tp-mail-due-' + (m.tone || 'info')) }, h(Icon, { name: 'clock' }), 'Hạn xử lý ' + m.deadline + (m.remain ? ' · ' + m.remain : '')) : null),
        h('button', { type: 'button', className: cx('tp-mail-star', m.starred && 'tp-mail-star-on'), 'aria-pressed': m.starred ? 'true' : 'false', 'aria-label': 'Đánh dấu', onClick: m.onStar }, h(Icon, { name: 'star' })));
    }));
  }

  function NotificationList(p) {
    return h('ul', { className: cx('tp-noti', p.className) }, (p.items || []).map(function (n, i) {
      return h('li', { key: i, className: n.unread ? 'tp-noti-unread' : undefined }, h('button', { type: 'button', className: 'tp-noti-row', onClick: n.onClick },
        h('span', { className: 'tp-noti-ico', 'aria-hidden': 'true' }, h(Icon, { name: n.icon || 'bell' })),
        h('span', { className: 'tp-noti-main' },
          n.group ? h('span', { className: 'tp-noti-grp' }, n.group) : null,
          h('span', { className: 'tp-noti-top' }, h('span', { className: 'tp-noti-title' }, n.unread ? h('span', { className: 'tp-sr' }, 'Chưa đọc. ') : null, n.title), h('span', { className: 'tp-noti-time tp-num' }, n.time)),
          n.description ? h('span', { className: 'tp-noti-desc' }, n.description) : null,
          n.code ? h('span', { className: 'tp-noti-code tp-num' }, n.code) : null)));
    }));
  }

  var WD = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  function CalendarCard(p) {
    var mode = p.mode || 'month', ev = p.eventDays || [], sel = p.selected, today = p.today;
    var day = function (d, i) {
      if (!d) return h('span', { key: 'e' + i });
      return h('button', { key: d, type: 'button', className: cx(d === today && 'tp-cal-today', d === sel && 'tp-cal-sel', ev.indexOf(d) >= 0 && 'tp-cal-ev', (i % 7) === 6 && 'tp-cal-sun'), 'aria-pressed': d === sel ? 'true' : 'false', onClick: function () { p.onSelect && p.onSelect(d); } }, h('span', null, d));
    };
    var cells = []; for (var i = 0; i < (p.offset || 0); i++) cells.push(null); for (var d = 1; d <= (p.days || 31); d++) cells.push(d);
    return h('section', { className: cx('tp-cal', p.className) },
      h('div', { className: 'tp-cal-head' }, h('h3', null, p.monthLabel),
        h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Tháng trước', onClick: p.onPrev }, h(Icon, { name: 'chevronLeft' })),
        h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Tháng sau', onClick: p.onNext }, h(Icon, { name: 'chevronRight' }))),
      p.modes === false ? null : h(SegmentedControl, { label: 'Chế độ xem', value: mode, onChange: p.onModeChange, options: [{ value: 'month', label: 'Tháng' }, { value: 'week', label: 'Tuần' }, { value: 'list', label: 'Danh sách' }] }),
      mode === 'list' ? null : h('div', { className: 'tp-cal-wd', 'aria-hidden': 'true' }, WD.map(function (w) { return h('span', { key: w }, w); })),
      mode === 'month' ? h('div', { className: 'tp-cal-grid' }, cells.map(day)) : null,
      mode === 'week' ? h('div', { className: 'tp-cal-week' }, (p.week || []).map(function (d, i) { return day(d, i); })) : null,
      h('div', { className: 'tp-cal-foot' }, h('span', { className: 'tp-cal-key' }, h('i'), p.legend || 'Có lịch hoặc nhắc việc'), h('button', { type: 'button', className: 'tp-link', onClick: p.onToday }, 'Hôm nay')));
  }

  function EventCard(p) {
    return h('article', { className: cx('tp-event', p.className) },
      h('span', { className: 'tp-event-date' }, h('b', { className: 'tp-num' }, p.day), h('span', null, p.month)),
      h('div', { className: 'tp-event-body' },
        p.kind ? h('p', { className: 'tp-event-kind' }, p.kind) : null,
        h('p', { className: 'tp-event-title' }, p.title),
        (p.lines || []).map(function (l, i) { return h('p', { key: i, className: 'tp-event-line' }, h(Icon, { name: l.icon }), l.text); }),
        p.status ? h(StatusBadge, { tone: p.statusTone || 'warning', className: 'tp-event-status' }, p.status) : null,
        p.actions && p.actions.length ? h('div', { className: 'tp-event-acts' }, p.actions.map(function (a, i) {
          return h(Button, { key: i, size: 'sm', variant: a.primary ? 'primary' : 'secondary', icon: a.icon, onClick: a.onClick }, a.label);
        })) : null));
  }

  function FinanceCard(p) {
    var warn = p.tone === 'warning' || p.tone === 'danger';
    return h('article', { className: cx('tp-fin', p.className) },
      h('button', { type: 'button', className: 'tp-fin-hit', 'aria-label': 'Xem chi tiết: ' + p.title, onClick: p.onClick }),
      h('div', { className: 'tp-fin-top' },
        h('div', { className: 'tp-fin-cap' }, h('span', null, p.kind), p.status ? h(StatusBadge, { tone: p.statusTone || 'danger' }, p.status) : null),
        h('div', { className: 'tp-fin-amt tp-num' }, p.amount),
        h('p', { className: 'tp-fin-title' }, p.title)),
      h('div', { className: 'tp-fin-cut', 'aria-hidden': 'true' }),
      h('div', { className: 'tp-fin-bot' },
        h('div', { className: 'tp-fin-info' }, [p.code, p.caseCode].filter(Boolean).map(function (c, i) { return h('span', { key: i, className: 'tp-num' }, c); }), p.court ? h('span', null, p.court) : null),
        p.deadline ? h('div', { className: cx('tp-fin-due', warn && 'tp-fin-due-' + p.tone) },
          h('span', null, p.deadlineLabel || 'Hạn nộp'), h('b', { className: 'tp-num' }, p.deadline), p.remain ? h('em', null, p.remain) : null) : null));
  }

  function CaseProgress(p) {
    var steps = p.steps || [], cur = p.current || 0;
    return h('ol', { className: cx('tp-cprog', p.className), 'aria-label': p.label || 'Tiến trình' }, steps.map(function (s, i) {
      var st = i < cur ? 'done' : i === cur ? 'cur' : 'todo';
      return h('li', { key: i, className: 'tp-cprog-' + st, 'aria-current': st === 'cur' ? 'step' : undefined },
        h('i', { 'aria-hidden': 'true' }, st === 'done' ? h(Icon, { name: 'check' }) : null), h('span', null, s));
    }));
  }

  function SearchToolbar(p) {
    return h('div', { className: cx('tp-qbar', 'tp-qbar-chips', p.className), role: 'search' },
      h('div', { className: 'tp-qbar-row' },
        h('label', { className: 'tp-qbar-field' }, h(Icon, { name: 'search' }), h('input', { type: 'search', placeholder: p.placeholder, 'aria-label': p.placeholder, defaultValue: p.defaultValue }))),
      h('div', { className: 'tp-qbar-chiprow' },
        h('button', { type: 'button', className: cx('tp-qbar-chip', p.filterCount && 'tp-qbar-chip-on'), onClick: p.onFilter }, h(Icon, { name: 'filter' }), 'Lọc' + (p.filterCount ? ' · ' + p.filterCount : '')),
        p.sortLabel ? h('button', { type: 'button', className: 'tp-qbar-chip', onClick: p.onSort }, h(Icon, { name: 'sort' }), p.sortLabel) : null),
      p.count ? h('p', { className: 'tp-qbar-count' }, p.count) : null);
  }

  function RatingStars(p) {
    var v = p.value || 0, max = p.max || 5, arr = []; for (var i = 1; i <= max; i++) arr.push(i);
    return h('div', { className: cx('tp-stars-field', p.className) },
      p.label ? h('span', { className: 'tp-field-label' }, p.label, p.required ? h('span', { className: 'tp-field-req', 'aria-hidden': 'true' }, '*') : null) : null,
      h('div', { className: 'tp-stars', role: 'radiogroup', 'aria-label': p.label }, arr.map(function (n) {
        return h('button', { key: n, type: 'button', role: 'radio', 'aria-checked': n === v ? 'true' : 'false', 'aria-label': n + ' / ' + max, className: n <= v ? 'tp-star-on' : undefined, onClick: function () { p.onChange && p.onChange(n); } }, h(Icon, { name: 'star' }));
      })));
  }

  function EmptyState(p) {
    /* 03/11/2026: variant center – trạng thái trống giữa màn (danh sách lọc/tìm không có kết quả, thư mục trống) */
    if (p.variant === 'center') return h('div', { className: cx('tp-empty', 'tp-empty-center', p.className), role: 'status' },
      h('span', { className: 'tp-empty-ico', 'aria-hidden': 'true' }, h(Icon, { name: p.icon || 'folder' })),
      p.title ? h('h2', null, p.title) : null,
      (p.children || p.text) ? h('p', null, p.children || p.text) : null,
      p.actionLabel ? h(Button, { size: 'sm', variant: 'secondary', icon: p.actionIcon, onClick: p.onAction, className: 'tp-empty-act' }, p.actionLabel) : null);
    return h('div', { className: cx('tp-empty', 'tp-empty-dashed', p.className) },
      h('span', { className: 'tp-empty-ico', 'aria-hidden': 'true' }, h(Icon, { name: p.icon || 'folder' })),
      h('p', null, p.children || p.text),
      p.actionLabel ? h(Button, { size: 'sm', variant: 'secondary', icon: p.actionIcon, onClick: p.onAction, className: 'tp-empty-act' }, p.actionLabel) : null);
  }


  /* ===== 03/11/2026: thành phần mới từ prototype app TATC (Hộp thư, Việc cần làm, Chi tiết đơn/vụ án, Giao nộp) ===== */
  var DUE_TONE = { qua: 'danger', sap: 'warning', an: 'success' };

  /* nút vuông 46px chỉ biểu tượng, dùng cạnh ô tìm; dot = đang có điều kiện lọc */
  function IconButton(p) {
    return h('button', { type: 'button', className: cx('tp-iconbtn', p.dot && 'tp-iconbtn-dot', p.className), 'aria-label': p.label + (p.dot ? ' (đang lọc)' : ''), 'aria-pressed': p.pressed, onClick: p.onClick, disabled: p.disabled }, h(Icon, { name: p.icon }));
  }

  /* thẻ văn bản Hộp thư tống đạt (phương án C, chốt 03/11/2026) */
  function InboxCard(p) {
    var due = p.deadline ? (p.dueLevel || 'an') : null;
    return h('article', { className: cx('tp-ibc', p.unread && 'tp-ibc-un', p.className) },
      p.onClick ? h('button', { type: 'button', className: 'tp-ibc-hit', 'aria-label': (p.unread ? 'Chưa đọc. ' : '') + p.title, onClick: p.onClick }) : null,
      h('div', { className: 'tp-ibc-h' },
        p.kind ? h('span', { className: cx('tp-ibc-kind', p.kindColor && 'tp-tag-' + p.kindColor) }, p.kind) : null,
        p.code ? h('span', { className: 'tp-ibc-code tp-num' }, p.code) : null,
        (p.onStar || p.onArchive) ? h('span', { className: 'tp-ibc-act' },
          p.onStar ? h('button', { type: 'button', className: cx('tp-ibc-btn', p.starred && 'tp-ibc-on'), 'aria-pressed': !!p.starred, 'aria-label': 'Đánh dấu quan trọng', onClick: p.onStar }, h(Icon, { name: 'star' })) : null,
          p.onArchive ? h('button', { type: 'button', className: cx('tp-ibc-btn', p.archived && 'tp-ibc-on'), 'aria-pressed': !!p.archived, 'aria-label': p.archived ? 'Bỏ lưu trữ' : 'Lưu trữ', onClick: p.onArchive }, h(Icon, { name: 'archive' })) : null) : null),
      h('p', { className: 'tp-ibc-t' }, p.unread ? h('i', { className: 'tp-ibc-dot', 'aria-hidden': 'true' }) : null, p.title),
      (p.court || p.time) ? h('p', { className: 'tp-ibc-from' }, [p.court, p.time].filter(Boolean).join(' · ')) : null,
      (p.status || p.deadline) ? h('div', { className: 'tp-ibc-foot' },
        p.status ? h(StatusBadge, { tone: p.statusTone || 'neutral', icon: false }, p.status) : null,
        p.deadline ? h('span', { className: 'tp-ibc-due' }, h('span', null, h(Icon, { name: 'clock' }), p.deadline), p.remain ? h('span', { className: 'tp-ibc-remain tp-ibc-remain-' + due }, p.remain) : null) : null) : null);
  }

  /* danh sách chọn một trong bảng từ đáy (Phân loại thư): biểu tượng hoặc chấm màu + tên + số đếm + nút tròn */
  function ChoiceList(p) {
    return h('div', { className: cx('tp-choice', p.className) },
      p.label ? h('p', { className: 'tp-choice-h' }, p.label) : null,
      h('ul', { role: 'radiogroup', 'aria-label': p.label }, (p.items || []).map(function (x) {
        var on = p.value === x.value;
        return h('li', { key: x.value }, h('button', { type: 'button', role: 'radio', 'aria-checked': on, className: cx('tp-choice-it', on && 'tp-choice-on'), onClick: function () { p.onChange && p.onChange(x.value); } },
          x.tag ? h('i', { className: 'tp-choice-dot tp-tag-' + x.tag, 'aria-hidden': 'true' }) : x.color ? h('i', { className: 'tp-choice-dot', style: { background: x.color }, 'aria-hidden': 'true' }) : x.icon ? h(Icon, { name: x.icon }) : null,
          h('span', { className: 'tp-choice-t' }, x.label),
          x.count != null ? h('span', { className: 'tp-choice-n tp-num' }, x.count) : null));
      })));
  }

  /* thanh nút có chữ dưới tiêu đề văn bản (Tải xuống, In, Quan trọng, Lưu trữ) */
  function DocToolbar(p) {
    return h('div', { className: cx('tp-doctool', p.className), role: 'toolbar', 'aria-label': p.label || 'Thao tác văn bản' }, (p.items || []).map(function (x) {
      return h('button', { key: x.label, type: 'button', className: cx('tp-doctool-b', x.active && 'tp-doctool-on'), 'aria-pressed': x.active == null ? undefined : !!x.active, onClick: x.onClick }, h(Icon, { name: x.icon }), x.label);
    }));
  }

  /* khối đơn vị ban hành: Tòa án, người ký, ngày; liên kết hồ sơ liên quan; trích yếu */
  function IssuerInfo(p) {
    return h('div', { className: cx('tp-issuer', p.className) },
      h('div', { className: 'tp-issuer-r' }, h('span', { className: 'tp-issuer-ic', 'aria-hidden': 'true' }, h(Icon, { name: 'building' })),
        h('div', null, h('b', null, p.court), (p.signer || p.date) ? h('small', null, p.signer ? h(React.Fragment, null, 'Người ký ', h('strong', null, p.signer), p.signerRole ? ' (' + p.signerRole + ')' : '') : null, p.date ? (p.signer ? ' · ' : '') + p.date : null) : null)),
      p.linkCode ? h('button', { type: 'button', className: 'tp-issuer-link', onClick: p.onLink }, h('span', null, p.linkLabel || 'Đơn liên quan'), h('b', { className: 'tp-num' }, p.linkCode), h(Icon, { name: 'chevronRight' })) : null,
      p.summary ? h('p', { className: 'tp-issuer-sum' }, p.summary) : null);
  }

  /* khung xem văn bản: tên tệp + trang thu nhỏ, chạm để mở toàn màn hình */
  function DocumentPreview(p) {
    return h('div', { className: cx('tp-docprev', p.className) },
      h('div', { className: 'tp-docprev-h' }, h(Icon, { name: 'file' }), h('span', { className: 'tp-num' }, p.fileName)),
      h('button', { type: 'button', className: 'tp-docprev-v', onClick: p.onOpen, 'aria-label': p.openLabel || 'Xem văn bản' },
        p.message ? h('span', { className: 'tp-docprev-msg' }, p.message) : h('span', { className: 'tp-docprev-page', 'aria-hidden': 'true' }, h('i'), h('i'), h('i'), h('i'), h('i'), h('i'))));
  }

  /* khối theo nhóm dưới văn bản: tiêu đề + biểu tượng, thông tin, phòng họp, dòng hạn, nút hành động (khóa khi quá hạn) */
  function DeadlineBlock(p) {
    var over = !!p.overdue;
    return h('section', { className: cx('tp-dlb', p.className) },
      h('div', { className: 'tp-dlb-h' }, h('span', { className: 'tp-dlb-ic', 'aria-hidden': 'true' }, h(Icon, { name: p.icon || 'file' })), h('h3', null, p.title)),
      p.items && p.items.length ? h(InfoList, { variant: 'rows', items: p.items }) : null,
      p.room && p.room.length ? h('div', { className: 'tp-dlb-room' }, h('p', null, p.roomTitle || 'Phòng họp trực tuyến'), h(InfoList, { variant: 'rows', items: p.room })) : null,
      p.deadline ? h('p', { className: cx('tp-dlb-due', over && 'tp-dlb-due-over') }, h(Icon, { name: 'clock' }), p.deadline) : null,
      over && p.lockedText !== false ? h('p', { className: 'tp-dlb-lock' }, p.lockedText || 'Đã hết hạn — công dân không thể thực hiện. Vui lòng liên hệ Tòa án để được hướng dẫn.') : null,
      p.actions && p.actions.length ? h('div', { className: 'tp-dlb-acts' }, p.actions.map(function (a, i) {
        return h(Button, { key: a.label, block: true, variant: i ? 'secondary' : 'primary', disabled: over || a.disabled, onClick: a.onClick }, a.label);
      })) : null);
  }

  /* dải chữ ký số + ghi nhận lần mở đầu cuối chi tiết văn bản */
  function SignatureNote(p) {
    return h('div', { className: cx('tp-signote', p.className) },
      h('p', { className: 'tp-signote-cks' }, h('span', { className: 'tp-signote-ic', 'aria-hidden': 'true' }, h(Icon, { name: 'shield' })), h('span', null, h('b', null, 'Đã ký số bởi ' + p.signedBy + ' · CKS hợp lệ'), p.servedAt ? ' · Tống đạt điện tử ' + p.servedAt : null)),
      p.firstOpened ? h('p', { className: 'tp-signote-open' }, h(Icon, { name: 'eye' }), h('span', null, 'Bạn đã mở văn bản này lần đầu lúc ', h('strong', null, p.firstOpened), '. Thông tin này được ghi nhận và gửi về Tòa án.')) : null);
  }

  /* phân bố mức độ khẩn cấp (Việc cần làm, phương án A): thanh tỉ lệ + 3 dòng chú giải */
  function UrgencySummary(p) {
    var lv = p.levels || [];
    return h('section', { className: cx('tp-urg', p.className) },
      p.title ? h('h3', { className: 'tp-urg-h' }, h(Icon, { name: 'star' }), p.title) : null,
      h('div', { className: 'tp-urg-bar', role: 'img', 'aria-label': lv.map(function (l) { return l.label + ' ' + l.count; }).join(', ') }, lv.map(function (l) { return l.count ? h('i', { key: l.key, className: 'tp-urg-' + l.key, style: { flexGrow: l.count } }) : null; })),
      h('ul', { className: 'tp-urg-leg' }, lv.map(function (l) {
        return h('li', { key: l.key, className: 'tp-urg-' + l.key }, h('span', { className: 'tp-urg-dot', 'aria-hidden': 'true' }), h('span', { className: 'tp-urg-t' }, h('b', null, l.label), l.description ? h('small', null, l.description) : null), h('b', { className: 'tp-urg-n tp-num' }, l.count));
      })));
  }

  /* thẻ một việc cần làm: ô biểu tượng màu theo mức, nhãn xám + mã, tên, dòng hạn, liên kết chữ đỏ + mũi tên căn phải */
  function TaskCard(p) {
    var lv = p.level || 'an';
    return h('article', { className: cx('tp-task2', p.className) },
      h('span', { className: 'tp-task2-ic tp-task2-ic-' + lv, 'aria-hidden': 'true' }, h(Icon, { name: p.icon || 'file' })),
      h('div', { className: 'tp-task2-tx' },
        (p.kind || p.code) ? h('p', { className: 'tp-task2-meta' }, p.kind ? h('span', { className: 'tp-task2-kind' }, p.kind) : null, p.code ? h('span', { className: 'tp-task2-code tp-num' }, p.code) : null) : null,
        h('b', null, p.title),
        p.deadline ? h('p', { className: 'tp-task2-due ' + (p.deadlineMuted ? 'tp-task2-due-none' : 'tp-task2-due-' + lv) }, p.deadline) : null,
        p.actionLabel ? h('button', { type: 'button', className: 'tp-task2-link', onClick: p.onAction }, p.actionLabel, h(Icon, { name: 'chevronRight' })) : null));
  }

  /* 03/11/2026: thẻ chức năng cao có ô minh họa (màn Hồ sơ, lưới 2 cột) */
  function FeatureCard(p) {
    return h('button', { type: 'button', className: cx('tp-feat', p.className), disabled: p.disabled, onClick: p.onClick },
      h('span', { className: 'tp-illo-circle tp-feat-ic' }, h(Illustration, { name: p.illustration })),
      h('b', null, p.title), p.description ? h('small', null, p.description) : null);
  }
  function FeatureGrid(p) {
    return h('div', { className: cx('tp-feat-grid', p.className) }, (p.items || []).map(function (x, i) { return h(FeatureCard, Object.assign({ key: x.title || i }, x)); }), p.children);
  }

  /* đầu trang chi tiết đơn / vụ án: dòng phụ, tên, nhãn trạng thái + thanh tab cuộn ngang dính đầu */
  function DetailHeader(p) {
    return h(React.Fragment, null,
      h('section', { className: cx('tp-dhead', p.className) },
        p.meta ? h('p', { className: 'tp-dhead-meta' }, p.meta) : null,
        h('h1', null, p.title),
        p.badges ? h('div', { className: 'tp-dhead-badges' }, p.badges) : null,
        p.children || null),
      p.tabs ? h('div', { className: 'tp-dhead-tabs' }, h(Tabs, { label: p.tabsLabel || p.title, items: p.tabs, value: p.tab, defaultValue: p.tabs[0] && p.tabs[0].key, onChange: p.onTab })) : null);
  }

  /* danh sách người ký (Giao nộp bước 3 – Xem lại & ký số): văn bản cần ký + từng người ký theo thứ tự */
  function SignerList(p) {
    return h('ul', { className: cx('tp-signers', p.className) },
      p.document ? h('li', null, h('div', null, h('b', null, p.document)), p.onView ? h(Button, { variant: 'secondary', size: 'sm', icon: 'eye', 'aria-label': 'Xem ' + p.document, onClick: p.onView }) : null) : null,
      (p.signers || []).map(function (s, i) {
        return h('li', { key: s.name }, h('span', { className: 'tp-signers-no' }, i + 1),
          h('div', null, h('b', null, s.name), s.role ? h('small', null, s.role) : null, s.signedAt ? h('small', { className: 'tp-signers-at' }, s.signedAt) : null),
          s.signed ? h(StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : s.onSign ? h(Button, { size: 'sm', icon: 'pen', onClick: s.onSign }, s.signLabel || 'Ký số') : h(StatusBadge, { tone: 'neutral', icon: false }, 'Chưa ký'));
      }));
  }

  window.TuPhap = Object.assign(window.TuPhap || {}, { Icon: Icon, Button: Button, LinkArrow: LinkArrow, SectionHeader: SectionHeader, HeroBanner: HeroBanner, ServiceCard: ServiceCard, ProcessSteps: ProcessSteps, Illustration: Illustration, HomeHeader: HomeHeader, BannerCarousel: BannerCarousel, QuickAction: QuickAction, NewsCard: NewsCard, FormSection: FormSection, SelectField: SelectField, OptionItem: OptionItem, SummaryBar: SummaryBar, SheetMenu: SheetMenu, FilterCard: FilterCard, RecordCard: RecordCard, ChatFab: ChatFab, illustrationNames: Object.keys(ILLO), TextField: TextField, StatusBadge: StatusBadge, Tabs: Tabs, ServiceTile: ServiceTile, CaseCard: CaseCard, Timeline: Timeline, AppBar: AppBar, BottomNav: BottomNav, iconNames: Object.keys(PATHS), BackLink: BackLink, Tag: Tag, Notice: Notice, Stepper: Stepper, Checkbox: Checkbox, SegmentedControl: SegmentedControl, InfoList: InfoList, ActionBar: ActionBar, Dialog: Dialog, Accordion: Accordion, FileUpload: FileUpload, FileItem: FileItem, TaskList: TaskList, StatSummary: StatSummary, MenuList: MenuList, ProfileCard: ProfileCard, MailList: MailList, NotificationList: NotificationList, CalendarCard: CalendarCard, EventCard: EventCard, FinanceCard: FinanceCard, CaseProgress: CaseProgress, SearchToolbar: SearchToolbar, RatingStars: RatingStars, EmptyState: EmptyState, IconButton: IconButton, InboxCard: InboxCard, ChoiceList: ChoiceList, DocToolbar: DocToolbar, IssuerInfo: IssuerInfo, DocumentPreview: DocumentPreview, DeadlineBlock: DeadlineBlock, SignatureNote: SignatureNote, UrgencySummary: UrgencySummary, TaskCard: TaskCard, DetailHeader: DetailHeader, SignerList: SignerList, FeatureCard: FeatureCard, FeatureGrid: FeatureGrid });

  /* ===== Mẫu mới đồng bộ prototype v145–v180 (04/11/2026) ===== */
  /* khối nhắc việc dạng banner (nhắc cam kết GDĐT): nền vàng nhạt, tiêu đề + nút nhỏ trái, hình minh họa phải; X chỉ khi có onClose */
  function ReminderBanner(p) {
    return h('section', { className: cx('tp-remb', p.className), role: 'status' },
      h('div', { className: 'tp-remb-tx' }, h('p', { className: 'tp-remb-t' }, p.title), p.actionLabel ? h(Button, { size: 'sm', onClick: p.onAction }, p.actionLabel) : null),
      h('span', { className: 'tp-remb-art', 'aria-hidden': 'true' }, h(Illustration, { name: p.illustration || 'yeuCau' })),
      p.onClose ? h('button', { type: 'button', className: 'tp-remb-x', 'aria-label': p.closeLabel || 'Đóng thông báo', onClick: p.onClose }, h(Icon, { name: 'x' })) : null);
  }
  /* banner tài khoản ở tab Cá nhân: thẻ trắng nổi trên header đỏ – chữ tắt, tên, chip vai trò, dấu định danh, số định danh che, "Xem" */
  function AccountBanner(p) {
    return h('section', { className: cx('tp-accb', p.className) },
      p.onOpen ? h('button', { type: 'button', className: 'tp-accb-hit', 'aria-label': p.openLabel || 'Xem thông tin tài khoản', onClick: p.onOpen }) : null,
      h('span', { className: 'tp-accb-av', 'aria-hidden': 'true' }, p.initials),
      h('span', { className: 'tp-accb-tx' }, h('b', null, p.name),
        h('span', { className: 'tp-accb-r' }, p.role ? h('button', { type: 'button', className: 'tp-accb-chip', 'aria-label': 'Vai trò sử dụng: ' + p.role, onClick: p.onRole }, p.role, h(Icon, { name: 'chevronDown' })) : null,
          p.verified ? h('span', { className: 'tp-accb-ver' }, p.verifiedLogo ? h('img', { src: p.verifiedLogo, alt: '' }) : h(Icon, { name: 'shield' }), p.verified) : null),
        p.idValue ? h('small', null, (p.idLabel || 'Số định danh') + ' ', h('span', { className: 'tp-num' }, p.idValue)) : null),
      p.onOpen ? h('span', { className: 'tp-accb-go', 'aria-hidden': 'true' }, p.openText || 'Xem', h(Icon, { name: 'chevronRight' })) : null);
  }
  /* thẻ việc cần làm gọn 1 dòng (Trang chủ, v160): ô biểu tượng 32px theo mức, tên 1 dòng, "loại · mã · Còn n ngày" (hạn tô màu), mũi tên; chạm cả thẻ */
  function TaskRow(p) {
    var lv = p.level || 'an';
    return h('button', { type: 'button', className: cx('tp-trow', p.className), onClick: p.onClick, 'aria-label': p.ariaLabel || p.title },
      h('span', { className: 'tp-trow-ic tp-trow-ic-' + lv, 'aria-hidden': 'true' }, h(Icon, { name: p.icon || 'file' })),
      h('span', { className: 'tp-trow-tx' }, h('b', null, p.title), h('small', null, [p.kind, p.code].filter(Boolean).join(' · '), p.due ? h(React.Fragment, null, ' · ', h('span', { className: p.dueMuted ? 'tp-trow-due' : 'tp-trow-due tp-trow-due-' + lv }, p.due)) : null)),
      h(Icon, { name: 'chevronRight' }));
  }
  /* 2 thẻ chọn nguồn/nhóm (KNTC: Hệ thống KNTC / QLA): hình 28px trái + nhãn hệ thống phải, tên, số hồ sơ; thẻ đang chọn nền vàng nhạt viền mảnh */
  function SourceSwitch(p) {
    var items = p.items || [];
    return h('div', { className: cx('tp-srcs', p.className), role: 'tablist', 'aria-label': p.label }, items.map(function (s) {
      var on = s.key === p.value;
      return h('button', { key: s.key, type: 'button', role: 'tab', 'aria-selected': on, className: cx('tp-srcs-it', on && 'tp-srcs-on'), onClick: function () { p.onChange && p.onChange(s.key); } },
        h('span', { className: 'tp-srcs-top' }, s.illustration ? h('span', { className: 'tp-srcs-ic', 'aria-hidden': 'true' }, h(Illustration, { name: s.illustration })) : h('span'),
          s.system ? h('span', { className: cx('tp-srcs-b', s.tone === 'brand' && 'tp-srcs-b-brand') }, h(Icon, { name: 'swap' }), s.system) : null),
        h('b', null, s.title), s.meta ? h('small', null, s.meta) : null);
    }));
  }
  /* thẻ một lần xác nhận cam kết (lịch sử Giao dịch điện tử): điều khoản, mã + ngày, chip vai trò, liên kết tải tài liệu đính kèm */
  function CommitCard(p) {
    return h('div', { className: cx('tp-cmc', p.className) }, h('b', null, p.title),
      h('small', null, p.code ? h(React.Fragment, null, 'Mã giao dịch ', h('span', { className: 'tp-num' }, p.code)) : null, p.date ? ' · ' + p.date : null),
      p.roles && p.roles.length ? h('span', { className: 'tp-cmc-tags' }, p.roles.map(function (r) { return h('span', { key: r, className: 'tp-chip-sm' }, r); })) : null,
      p.linkLabel ? h('button', { type: 'button', className: 'tp-cmc-go', onClick: p.onLink }, h(Icon, { name: 'download' }), p.linkLabel) : null);
  }
  /* dòng tóm tắt tệp đính kèm (nhiều tệp): biểu tượng thư mục, "n … đính kèm", dòng phụ, mũi tên – chạm mở Dialog sheet liệt kê FileItem + "Tải tất cả" */
  function AttachmentSummary(p) {
    return h('button', { type: 'button', className: cx('tp-atts', p.className), onClick: p.onClick },
      h(Icon, { name: p.icon || 'folder' }), h('span', { className: 'tp-atts-tx' }, h('b', null, p.title), p.meta ? h('small', null, p.meta) : null), h(Icon, { name: 'chevronRight' }));
  }
  /* thẻ chứng thư số: nguồn · CA, chủ thể, CA cấp, nhãn hiệu lực, dl Số serial/Hiệu lực/Dùng gần nhất/Kiểm tra gần nhất, hành động chữ ở chân */
  function CertificateCard(p) {
    return h('div', { className: cx('tp-cert', p.className) },
      h('div', { className: 'tp-cert-h' }, h('div', null, p.source ? h('small', null, p.source) : null, h('b', null, p.subject), p.issuer ? h('span', null, p.issuer) : null),
        p.status ? h(StatusBadge, { tone: p.statusTone || 'success', icon: false }, p.status) : null),
      p.rows && p.rows.length ? h('dl', { className: 'tp-cert-dl' }, p.rows.map(function (r) { return h(React.Fragment, { key: r[0] }, h('dt', null, r[0]), h('dd', null, r[1])); })) : null,
      p.actions && p.actions.length ? h('div', { className: 'tp-cert-f' }, p.actions.map(function (a) { return h('button', { key: a.label, type: 'button', className: cx('tp-cert-a', a.danger && 'tp-cert-a-danger'), onClick: a.onClick }, a.icon ? h(Icon, { name: a.icon }) : null, a.label); })) : null);
  }
  /* thẻ một phiên ký số (Lịch sử ký): thời gian, đơn, nhãn trạng thái, lý do, phương thức + tư cách + n/m tệp; "Xem tệp" mở danh sách tệp */
  function SignSessionCard(p) {
    var st = React.useState(!!p.defaultOpen), mo = st[0];
    return h('div', { className: cx('tp-sess', p.className) },
      h('div', { className: 'tp-cert-h' }, h('div', null, h('small', null, p.time), h('b', null, p.title)), p.status ? h(StatusBadge, { tone: p.statusTone || 'success', icon: false }, p.status) : null),
      p.reason ? h('p', { className: 'tp-sess-ly' }, p.reason) : null,
      h('div', { className: 'tp-sess-g' }, h('div', null, h('b', null, p.method), p.methodMeta ? h('small', null, p.methodMeta) : null), h('div', null, p.role ? h('small', null, p.role) : null, p.fileCount ? h('b', { className: 'tp-num' }, p.fileCount) : null)),
      p.files && p.files.length ? h('div', { className: 'tp-cert-f' }, h('button', { type: 'button', className: 'tp-cert-a', 'aria-expanded': mo, onClick: function () { st[1](!mo); } }, h(Icon, { name: mo ? 'chevronDown' : 'chevronRight' }), mo ? 'Thu gọn' : 'Xem tệp')) : null,
      mo ? h('ul', { className: 'tp-sess-tep' }, p.files.map(function (f) {
        return h('li', { key: f.name }, h('b', null, f.name), h('div', null, h('span', { className: f.ok ? 'tp-sess-ok' : 'tp-sess-no' }, f.status), f.ok && f.onView ? h('button', { type: 'button', className: 'tp-cert-a', onClick: f.onView }, h(Icon, { name: 'eye' }), 'Xem') : null, f.error ? h('small', null, f.error) : null));
      })) : null);
  }
  /* thẻ điểm tra cứu (điểm trợ giúp pháp lý): nhãn loại, tên, địa chỉ có ghim, chip lĩnh vực, nút "Xem chi tiết"; chạm cả thẻ */
  function PlaceCard(p) {
    return h('div', { className: cx('tp-place', p.className) },
      p.onClick ? h('button', { type: 'button', className: 'tp-place-hit', 'aria-label': (p.actionLabel || 'Xem chi tiết') + ' ' + p.title, onClick: p.onClick }) : null,
      p.kind ? h('span', { className: 'tp-place-kind' }, p.kind) : null, h('b', null, p.title),
      p.address ? h('span', { className: 'tp-place-adr' }, h(Icon, { name: 'mapPin' }), p.address) : null,
      p.tags && p.tags.length ? h('span', { className: 'tp-place-tags' }, p.tags.map(function (t) { return h('span', { key: t }, t); })) : null,
      p.onClick ? h(Button, { size: 'sm', variant: 'secondary', onClick: p.onClick }, p.actionLabel || 'Xem chi tiết') : null);
  }
  /* thanh thời hạn (KNTC): nhãn còn/quá hạn + ngày hạn, thanh tiến độ theo số ngày đã qua */
  function DeadlineBar(p) {
    var pc = Math.max(0, Math.min(100, Math.round((p.value || 0) / (p.max || 1) * 100))), lv = p.level || 'an';
    return h('div', { className: cx('tp-dlb', p.className) }, h('div', { className: 'tp-dlb-h' }, h('span', { className: 'tp-dlb-tag tp-dlb-tag-' + lv }, p.label), p.due ? h('small', null, p.due) : null),
      h('span', { className: 'tp-dlb-bar', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': pc, 'aria-label': p.label }, h('i', { className: 'tp-dlb-fill-' + lv, style: { width: pc + '%' } })));
  }
  /* thẻ phương thức giao dịch của một hồ sơ: dòng loại · mã, tên, Tòa án, "Tống đạt qua", nhãn trạng thái + chip vai trò, vùng hành động (children) */
  function MethodCard(p) {
    return h('div', { className: cx('tp-mtc', p.className) },
      h('p', { className: 'tp-mtc-e' }, p.icon ? h(Icon, { name: p.icon }) : null, p.kind, p.code ? h(React.Fragment, null, ' · ', h('span', { className: 'tp-num' }, p.code)) : null),
      h('b', null, p.title), p.court ? h('p', { className: 'tp-mtc-m' }, p.court) : null,
      p.via ? h('p', { className: 'tp-mtc-m' }, 'Tống đạt qua: ', h('b', null, p.via)) : null,
      h('div', { className: 'tp-mtc-s' }, p.status ? h(StatusBadge, { tone: p.statusTone || 'info' }, p.status) : null, (p.roles || []).map(function (r) { return h('span', { key: r, className: 'tp-chip-sm' }, r); })),
      p.children ? h('div', { className: 'tp-mtc-a' }, p.children) : null);
  }
  window.TuPhap = Object.assign(window.TuPhap || {}, { ReminderBanner: ReminderBanner, AccountBanner: AccountBanner, TaskRow: TaskRow, SourceSwitch: SourceSwitch, CommitCard: CommitCard, AttachmentSummary: AttachmentSummary, CertificateCard: CertificateCard, SignSessionCard: SignSessionCard, PlaceCard: PlaceCard, DeadlineBar: DeadlineBar, MethodCard: MethodCard });
})();
