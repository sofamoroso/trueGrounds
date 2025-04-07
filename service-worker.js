// Define a cache name
const CACHE_NAME = 'true-grounds-cache-v1';

// List of files to cache
const filesToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/assets/icon-1.svg',
    '/assets/icon-2.svg',
    '/assets/icon-3.svg',
    '/assets/icon-4.svg',
    '/assets/icon-5.svg',
    '/assets/icon-6.svg',
    '/assets/icon-7.svg',
  ];

// Install the service worker and cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching files...');
      return cache.addAll(filesToCache);
    })
  );
});

// Fetch cached resources or fetch from the network if not cached
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Serve from cache
        return cachedResponse;
      } else {
        // Fetch from network if not cached
        return fetch(event.request);
      }
    })
  );
});

// Optional: Update the cache with new content when the service worker is activated
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Clean up old caches
          }
        })
      );
    })
  );
});
