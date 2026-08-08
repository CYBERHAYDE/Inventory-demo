/* Service worker for the Adaeze Gadgets inventory app.
   Strategy, kept deliberately simple for a zero-budget static-file deploy:
   - App shell (HTML/CSS/JS/icons) is precached on install, so the app opens
     and works with zero internet from the second visit onward.
   - Google Fonts and the ZXing barcode-scanning library are cached the first
     time they're actually used (cache-first with a network fallback), since
     they're loaded from a CDN and aren't known ahead of time.
   - Any navigation request that fails offline falls back to the cached
     index.html, so the app always opens instead of showing a browser error.
   Bump CACHE_VERSION whenever the app shell files change, so returning users
   pick up the new version instead of being stuck on a stale cache. */

const CACHE_VERSION = 'adaeze-inventory-v1';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './i18n.js',
  './app.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-512-maskable.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (isSameOrigin) {
    // App shell: cache-first, since these files only change on a new deploy.
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).catch(() => {
        // Offline and not cached — for a page navigation, fall back to the
        // app shell itself rather than showing a browser error screen.
        if (req.mode === 'navigate') return caches.match('./index.html');
      }))
    );
  } else {
    // Third-party (Google Fonts, ZXing CDN): try the network first so users
    // online always get the latest, but cache what succeeds so it still
    // works the next time there's no connection.
    event.respondWith(
      fetch(req).then(res => {
        const resClone = res.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(req, resClone));
        return res;
      }).catch(() => caches.match(req))
    );
  }
});
