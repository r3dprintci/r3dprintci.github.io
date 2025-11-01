/* ============================================================
   R3D PRINT CI – SCRIPT PRINCIPAL VERSION STABLE 2025 (v12)
   ============================================================ */

function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const btn = document.querySelector(".hamburger");
  if (!nav || !btn) return;
  nav.classList.toggle("open");
  btn.classList.toggle("is-active");
}

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

  // Animation d’apparition douce
  const animated = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right");
  const revealOnScroll = () => {
    const height = window.innerHeight;
    animated.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < height - 100) el.classList.add("visible");
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);
  revealOnScroll();
});
