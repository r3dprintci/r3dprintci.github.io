// Désactivation complète des anciens caches
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  return self.clients.claim();
});

// Ne rien intercepter
self.addEventListener('fetch', () => {});
