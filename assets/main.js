/* ------------------------------------------
   R3D PRINT CI – Script principal
   Version stable 2025
------------------------------------------- */

/* --- Menu hamburger mobile --- */
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("open");
}

/* --- Animation d'apparition au scroll --- */
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal, .fade-in, .slide-in-left, .slide-in-right");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    reveals.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);
});
