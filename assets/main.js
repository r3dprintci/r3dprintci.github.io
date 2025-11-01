/* ============================================================
   R3D PRINT CI – SCRIPT PRINCIPAL PREMIUM 2025
   ============================================================ */

/* --- MENU HAMBURGER --- */
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const btn = document.querySelector(".hamburger");
  if (!nav || !btn) return;
  nav.classList.toggle("open");
  btn.classList.toggle("is-active");
}

/* --- FERMETURE AUTOMATIQUE DU MENU --- */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".hamburger");
  const nav = document.getElementById("navMenu");

  if (btn) btn.addEventListener("click", toggleMenu);

  // Ferme le menu au clic sur un lien
  if (nav) {
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        if (btn) btn.classList.remove("is-active");
      });
    });
  }
});

/* --- ANIMATIONS D’APPARITION AU SCROLL --- */
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    animatedElements.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 100) {
        el.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);
  revealOnScroll();
});

/* --- TRANSITION DOUCE AU CHARGEMENT --- */
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.6s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

/* --- NETTOYAGE AUTOMATIQUE DU CACHE ET SERVICE WORKER --- */
(async () => {
  try {
    // Supprime les anciens caches
    if (window.caches && caches.keys) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    }

    // Désenregistre les anciens service workers
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (const r of regs) await r.unregister();
    }
  } catch (e) {
    console.warn("Nettoyage du cache ignoré :", e);
  }
})();

/* --- REDIRECTION HTTPS ET CORRECTION DE L’INDEX --- */
if (window.location.protocol !== "https:") {
  window.location.href = "https://" + window.location.host + window.location.pathname;
}

// Si on accède à la racine sans fichier index.html, on force la redirection
if (window.location.pathname === "/" || window.location.pathname === "") {
  window.location.replace(window.location.origin + "/index.html");
}
