/* ============================================================
   R3D PRINT CI – Script principal
   Version Premium 2025 (sécurisée et fluide)
   ============================================================ */

/* --- Apparition fluide & fond propre --- */
document.documentElement.style.backgroundColor = "#fff";
document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.6s ease";
window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 120);
});

/* --- MENU HAMBURGER --- */
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const btn = document.querySelector(".hamburger");
  if (!nav || !btn) return;
  nav.classList.toggle("open");
  btn.classList.toggle("is-active");
}

/* --- INITIALISATION --- */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".hamburger");
  const nav = document.getElementById("navMenu");

  // Ouvrir / fermer le menu
  if (btn) btn.addEventListener("click", toggleMenu);

  // Fermer le menu quand on clique sur un lien
  if (nav) {
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        btn.classList.remove("is-active");
      });
    });
  }

  /* --- ANIMATIONS AU SCROLL --- */
  const reveals = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right");
  const reveal = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < windowHeight - 100) {
        el.classList.add("visible");
      }
    });
  };
  window.addEventListener("scroll", reveal);
  reveal();

  /* --- Service Worker (mise en cache intelligente) --- */
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").then(reg => {
      console.log("✅ Service Worker actif :", reg.scope);
    }).catch(err => {
      console.warn("❌ Service Worker erreur :", err);
    });
  }
});

/* --- DÉTECTION HORS LIGNE / EN LIGNE --- */
window.addEventListener("offline", () => {
  const banner = document.createElement("div");
  banner.id = "offlineBanner";
  banner.textContent = "⚠️ Vous êtes hors ligne – affichage depuis le cache";
  banner.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0;
    background: #c9af6b; color: #fff; text-align: center;
    padding: 8px; font-size: 14px; z-index: 9999;
  `;
  document.body.appendChild(banner);
});

window.addEventListener("online", () => {
  const banner = document.getElementById("offlineBanner");
  if (banner) banner.remove();
});
