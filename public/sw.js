// Coded service worker — makes the app installable and fully usable offline.
// The build script replaces __BUILD_ID__ so every deploy gets a fresh cache.
const CACHE = 'coded-__BUILD_ID__';
const SHELL = [
  './',
  'index.html',
  'assets/app.js',
  'assets/app.css',
  'manifest.webmanifest',
  'favicon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'fonts/Inter-Regular.woff',
  'fonts/Inter-Medium.woff',
  'fonts/Inter-SemiBold.woff',
  'fonts/Inter-Bold.woff',
  'fonts/InterDisplay-ExtraBold.woff',
  'fonts/InterDisplay-Black.woff',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('coded-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  // Pages: network first (always get the newest deploy), fall back to the cached shell offline.
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match('index.html')));
    return;
  }
  // Assets: serve from cache instantly, refresh in the background.
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req);
      const network = fetch(req)
        .then((res) => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});
