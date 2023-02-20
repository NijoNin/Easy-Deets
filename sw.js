// service worker

// easyDeetsCache-V1: 
// Renamed everything from dets -> deets
// updated other naming sense
// V2: Updated double click compatibility for iphones

var cacheName = 'easyDeetsCache-V2';
var filesToCache = [
  '/',
  '/index.html',
  '/images/Easy-Deets-icon-white.png',
  '/images/easydeets-icon-192x192.png',
  '/images/easydeets-icon-512x512.png',
  '/style.css',
  '/script.js',
  '/main-page.js'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});