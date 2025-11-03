/* ============================================================
   R3D PRINT CI – MAIN SCRIPT (Version stable corrigée 2025)
   ============================================================ */

/* --- MENU HAMBURGER MOBILE --- */
function toggleMenu() {
  const nav = document.querySelector(".nav ul");
  const btn = document.querySelector(".hamburger");

  if (!nav || !btn) return;

  nav.classList.toggle("open");
  btn.classList.toggle("is-active");

  if (nav.classList.contains("open")) {
    nav.style.right = "0";
  } else {
    nav.style.right = "-100%";
  }
}

/* --- INITIALISATION GLOBALE --- */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav ul");

  // Vérifie la présence des éléments avant d’attacher les événements
  if (btn) btn.addEventListener("click", toggleMenu);

  if (nav) {
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        btn.classList.remove("is-active");
        nav.style.right = "-100%";
      });
    });
  }

  // === ANIMATIONS AU SCROLL ===
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

  // Appels sécurisés
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // exécution immédiate
});

/* --- ANIMATION D’APPARITION DOUCE DE LA PAGE --- */
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.6s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
