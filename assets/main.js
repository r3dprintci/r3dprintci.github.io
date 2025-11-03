/* ============================================================
   R3D PRINT CI – MAIN SCRIPT (Version corrigée finale 2025)
   ============================================================ */

/* --- MENU HAMBURGER MOBILE --- */
function toggleMenu() {
  const nav = document.querySelector("#navMenu");
  const btn = document.querySelector(".hamburger");

  if (!nav || !btn) return;

  // Bascule de l’état
  nav.classList.toggle("open");
  btn.classList.toggle("is-active");
}

/* --- INITIALISATION GLOBALE --- */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".hamburger");
  const nav = document.querySelector("#navMenu");

  // Vérifie la présence du bouton avant d’attacher les événements
  if (btn) {
    btn.addEventListener("click", toggleMenu);
  }

  // Fermer le menu lorsqu’un lien est cliqué
  if (nav) {
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        btn.classList.remove("is-active");
      });
    });
  }

  // Animation des éléments au défilement
  const reveals = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Exécution initiale
});

/* --- EFFET D’APPARITION DOUCE --- */
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.6s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
