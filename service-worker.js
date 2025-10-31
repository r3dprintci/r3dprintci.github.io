/* ============================================================
   R3D PRINT CI – Service Worker
   Version Premium 2025 (Cache intelligent + Auto-Update)
   ============================================================ */

const CACHE_NAME = "r3dprintci-v6";
const ASSETS = [
  "/",                // redirection vers index.html
  "/index.html",
  "/services.html",
  "/realisations.html",
  "/devis.html",
  "/contact.html",
  "/assets/style.css",
  "/assets/main.js",
  "/assets/devis.js",
  "/assets/logo.png",
  "/assets/gravurelaser.webp",
  "/assets/impressions3d.webp",
  "/assets/prototypage.webp",
  "/assets/shot1.jpg",
  "/assets/shot2.jpg",
  "/assets/shot3.jpg",
  "/assets/shot4.jpg"
];

/* === Installation : ajout en cache === */
self.addEventListener("install", event => {
  self.skipWaiting(); // active immédiatement la nouvelle version
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(() => {
        console.warn("⚠️ Certains fichiers n'ont pas pu être mis en cache");
      });
    })
  );
});

/* === Activation : suppression des anciens caches === */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("🧹 Suppression ancien cache :", key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

/* === Interception des requêtes === */
self.addEventListener("fetch", event => {
  // Stratégie réseau d’abord : charge la version en ligne si dispo
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => {
        // Si pas de réseau, on prend la version du cache
        return caches.match(event.request).then(cached => {
          return cached || caches.match("/index.html");
        });
      })
  );
});

/* === Auto-mise à jour === */
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
