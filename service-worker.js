/* ============================================================
   R3D PRINT CI – SERVICE WORKER (version finale 2025)
   Objectif : rapidité, fiabilité, cache sûr et auto-mise à jour
   ============================================================ */

const CACHE_NAME = "r3dprintci-v2025.2";
const ASSETS_TO_CACHE = [
  "/", 
  "/index.html",
  "/services.html",
  "/realisations.html",
  "/devis.html",
  "/contact.html",
  "/assets/style.css",
  "/assets/main.js",
  "/assets/devis.js",
  "/assets/logo.png",
  "/assets/impressions3d.webp",
  "/assets/gravurelaser.webp",
  "/assets/prototypage.webp",
  "/assets/shot1.jpg",
  "/assets/shot2.jpg",
  "/assets/shot3.jpg",
  "/assets/shot4.jpg"
];

/* --- INSTALLATION --- */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

/* --- ACTIVATION : suppression anciens caches --- */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

/* --- FETCH : priorité réseau avec secours cache --- */
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const cloned = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

/* --- MESSAGE : force la mise à jour --- */
self.addEventListener("message", (event) => {
  if (event.data === "force-update") {
    self.skipWaiting();
  }
});
