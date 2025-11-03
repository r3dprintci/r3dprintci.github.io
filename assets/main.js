/* ============================================================
   R3D PRINT CI – MAIN SCRIPT (Version stable 2025)
   ============================================================ */

/* --- MENU HAMBURGER MOBILE --- */
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const btn = document.querySelector(".hamburger");

  if (!nav || !btn) return;

  nav.classList.toggle("open");
  btn.classList.toggle("is-active");
}

/* --- FERMETURE AUTO DU MENU --- */
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("navMenu");
  const btn = document.querySelector(".hamburger");

  if (nav && btn) {
    // Fermer le menu quand on clique sur un lien
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        btn.classList.remove("is-active");
      });
    });
  }
});

/* --- ANIMATIONS AU SCROLL --- */
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right");

  function reveal() {
    const triggerBottom = window.innerHeight * 0.85;
    elements.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) el.classList.add("visible");
    });
  }

  reveal();
  window.addEventListener("scroll", reveal);
});

/* --- FONDU D'APPARITION --- */
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.6s ease";
  setTimeout(() => (document.body.style.opacity = "1"), 100);
});
