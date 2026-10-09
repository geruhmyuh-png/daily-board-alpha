const CACHE_VERSION = 'daily-board-v0.1';
const APP_FILES = [
  './',
  './index.html',
  './home.html',
  './dashboard.html',
  './display.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => {
        return cache.addAll(APP_FILES);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName.startsWith('daily-board-') &&
                     cacheName !== CACHE_VERSION;
            })
            .map(cacheName => {
              return caches.delete(cacheName);
            })
        );
      })
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});