/* Tự tải lại bản xem thử khi máy chủ có thay đổi; không lưu hoặc sửa dữ liệu màn hình. */
(function () {
  'use strict';
  if (location.protocol === 'file:') return;

  var script = document.currentScript;
  var baseline = script && script.dataset ? script.dataset.previewVersion : '';
  var pending = null, reloading = false, source = null, poll = null, check = null;
  var POLL_MS = 4000, CHECK_TIMEOUT_MS = 8000;

  function isOnline() { return navigator.onLine !== false; }
  function stopPolling() { if (poll !== null) clearInterval(poll); poll = null; }
  function closeSource() { if (source) source.close(); source = null; }
  function cancelCheck() {
    if (!check) return;
    clearTimeout(check.timer);
    if (check.controller) check.controller.abort();
    check = null;
  }
  function pause() { closeSource(); stopPolling(); cancelCheck(); }
  function reloadIfReady() {
    if (!pending || document.hidden || reloading) return;
    reloading = true;
    pause();
    /* location.reload giữ nguyên hash chứa đường đi của prototype. */
    location.reload();
  }
  function receive(version) {
    if (reloading || typeof version !== 'string' || !version) return;
    if (!baseline) { baseline = version; return; }
    pending = version !== baseline ? version : null;
    reloadIfReady();
  }
  function checkVersion() {
    if (reloading || document.hidden || !isOnline() || check || !window.fetch) return;
    var current = { controller: window.AbortController ? new window.AbortController() : null, timer: null };
    check = current;
    current.timer = setTimeout(function () { if (check === current) cancelCheck(); }, CHECK_TIMEOUT_MS);
    var options = { cache: 'no-store', credentials: 'same-origin' };
    if (current.controller) options.signal = current.controller.signal;
    window.fetch('/_preview/version', options).then(function (response) {
      if (!response.ok) throw new Error('Preview unavailable');
      return response.json();
    }).then(function (data) {
      if (check === current && data) receive(data.version);
    }).catch(function () {}).then(function () {
      if (check === current) { clearTimeout(current.timer); check = null; }
    });
  }
  function startPolling() {
    if (poll !== null || reloading || document.hidden || !isOnline()) return;
    poll = setInterval(checkVersion, POLL_MS);
  }
  function connect() {
    closeSource();
    if (reloading || document.hidden || !isOnline()) return;
    /* Poll cả khi stream chưa mở: service worker cũ có thể giữ kết nối SSE. */
    startPolling();
    if (!window.EventSource) return;
    try {
      var stream = new window.EventSource('/_preview/events');
      source = stream;
      stream.onopen = function () { if (source === stream) stopPolling(); };
      stream.onerror = function () { if (source === stream) startPolling(); };
      stream.addEventListener('version', function (event) {
        if (source !== stream) return;
        try { receive(JSON.parse(event.data).version); } catch (e) {}
      });
    } catch (e) { startPolling(); }
  }
  function resume() {
    if (reloading || document.hidden || !isOnline()) return;
    reloadIfReady();
    if (reloading) return;
    /* iOS có thể khôi phục trang nhưng không khôi phục stream trước khi ngủ. */
    pause();
    connect();
    checkVersion();
  }

  document.addEventListener('visibilitychange', function () { if (document.hidden) pause(); else resume(); });
  window.addEventListener('focus', resume);
  window.addEventListener('online', resume);
  window.addEventListener('offline', pause);
  window.addEventListener('pagehide', pause);
  window.addEventListener('pageshow', function (event) { if (event.persisted) resume(); });
  if (navigator.serviceWorker) navigator.serviceWorker.addEventListener('controllerchange', resume);
  connect();
  checkVersion();
})();
