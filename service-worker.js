// R3D PRINT CI - Service Worker pour mise en cache de base
const CACHE_NAME = "r3dprintci-v1";
const ASSETS_TO_CACHE = [
  "index.html",
  "services.html",
  "realisations.html",
  "devis.html",
  "contact.html",
  "assets/style.css",
  "assets/main.js",
  "assets/logo.png"
];

// Installation du Service Worker et mise en cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
});

// Interception des requêtes pour servir depuis le cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
