/* Bộ nhớ đệm riêng cho prototype; ưu tiên tải bản mới, dùng bản đã lưu khi mất mạng. */
var PREFIX = 'tatc-proto-';
var C = PREFIX + 'v11';
var SCOPE = new URL(self.registration.scope);
var SHELL = new URL('index.html', SCOPE).href;
var FILES = ['index.html', 'manifest.webmanifest', 'live-reload.js', 'vendor/react.production.min.js', 'vendor/react-dom.production.min.js', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(C).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (key) { return key.indexOf(PREFIX) === 0 && key !== C; }).map(function (key) { return caches.delete(key); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request, url = new URL(req.url);
  /* Stream và số phiên bản chỉ đi qua mạng, không chạm vào Cache Storage. */
  if (req.method !== 'GET' || url.pathname.indexOf('/_preview/') === 0 || url.origin !== SCOPE.origin || url.pathname.indexOf(SCOPE.pathname) !== 0) return;

  e.respondWith(fetch(req).then(function (res) {
    /* Không lưu trang lỗi; chỉ nội dung HTML của trang app mới được dùng làm shell. */
    var isShell = req.mode === 'navigate' && (url.pathname === SCOPE.pathname || url.pathname === new URL(SHELL).pathname) && (res.headers.get('content-type') || '').indexOf('text/html') !== -1;
    if (!res.ok) return res;
    return caches.open(C).then(function (c) { return c.put(isShell ? SHELL : req, res.clone()); }).catch(function () {}).then(function () { return res; });
  }).catch(function () {
    return caches.open(C).then(function (c) {
      return c.match(req).then(function (cached) {
        if (cached) return cached;
        if (req.mode === 'navigate') return c.match(SHELL).then(function (shell) { return shell || Response.error(); });
        return Response.error();
      });
    });
  }));
});
