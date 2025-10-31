/* ============================================================
   R3D PRINT CI – SERVICE WORKER OFFICIEL (version finale 2025)
   Fonction : mise en cache intelligente pour PWA
============================================================ */

const CACHE_NAME = "r3dprintci-cache-v2025";
const urlsToCache = [
  "./",
  "index.html",
  "services.html",
  "realisations.html",
  "devis.html",
  "contact.html",
  "assets/style.css",
  "assets/main.js",
  "assets/devis.js",
  "assets/logo.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png"
];

/* --- INSTALLATION ET MISE EN CACHE INITIALE --- */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Mise en cache initiale...");
      return cache.addAll(urlsToCache);
    })
  );
});

/* --- ACTIVATION ET NETTOYAGE DES ANCIENS CACHES --- */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Suppression ancien cache :", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

/* --- STRATÉGIE DE FETCH : CACHE PUIS RÉSEAU --- */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si trouvé dans le cache → retourne la ressource
      if (response) return response;

      // Sinon → télécharge depuis le réseau et met en cache
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});

/* --- EVENTUEL MESSAGE DE CONFIRMATION --- */
self.addEventListener("message", (event) => {
  if (event.data === "updateSW") {
    self.skipWaiting();
  }
});
