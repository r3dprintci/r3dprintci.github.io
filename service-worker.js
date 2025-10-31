// R3D PRINT CI - Service Worker pour la mise en cache
const CACHE_NAME = "r3dprintci-v1";
const ASSETS_TO_CACHE = [
  "index.html",
  "services.html",
  "realisations.html",
  "devis.html",
  "contact.html",
  "assets/style.css",
  "assets/main.js",
  "assets/logo.png",
  "assets/impression3d.webp",
  "assets/gravurelaser.webp",
  "assets/prototypage.webp",
  "assets/shot1.jpg",
  "assets/shot2.jpg",
  "assets/shot3.jpg",
  "assets/shot4.jpg"
];

// Installation et mise en cache initiale
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 Mise en cache des fichiers R3D PRINT CI");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activation et suppression des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("🧹 Suppression de l'ancien cache :", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Interception des requêtes et réponse depuis le cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Retourne la réponse du cache si dispo, sinon télécharge depuis le réseau
      return (
        cachedResponse ||
        fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
      );
    })
  );
});
