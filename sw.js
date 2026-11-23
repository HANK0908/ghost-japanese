const CACHE = 'ghost-notebook-v526-reviewed-drill'
const ASSETS = [
  './',
  './index.html',
  './app-core.js',
  './kanji-data.js',
  './app-core.js?v=5.2.1',
  './kanji-data.js?v=5.2.1',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith('ghost-notebook-') && key !== CACHE)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  if (event.request.method !== 'GET' || url.origin !== location.origin) return
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)))
})
