/* ------------------------------------------
   R3D PRINT CI – Script principal
   Version Premium 2025
------------------------------------------- */

/* --- FONCTION MENU HAMBURGER --- */
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const btn = document.querySelector(".hamburger");
  const overlay = document.querySelector(".nav-overlay");

  if (!nav || !btn) return;

  // Ouvre ou ferme le menu
  nav.classList.toggle("open");
  btn.classList.toggle("is-active");

  // Gère l’overlay doré flouté
  if (overlay) {
    if (nav.classList.contains("open")) {
      overlay.style.opacity = "1";
      overlay.style.pointerEvents = "all";
    } else {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
    }
  }
}

/* --- GESTION AUTOMATIQUE DU MENU --- */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".hamburger");
  const nav = document.getElementById("navMenu");
  const overlay = document.querySelector(".nav-overlay");

  // Clic sur le bouton hamburger
  if (btn) {
    btn.addEventListener("click", toggleMenu);
  }

  // Ferme le menu si on clique sur un lien
  if (nav) {
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        btn.classList.remove("is-active");
        if (overlay) {
          overlay.style.opacity = "0";
          overlay.style.pointerEvents = "none";
        }
      });
    });
  }

  // Ferme le menu si on clique sur le fond flouté
  if (overlay) {
    overlay.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.classList.remove("is-active");
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
    });
  }
});

/* --- ANIMATIONS AU SCROLL --- */
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    elements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("visible");
      }
    });
  }

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
