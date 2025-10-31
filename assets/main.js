/* ------------------------------------------
   R3D PRINT CI – Script principal
   Version finale Premium 2025
------------------------------------------- */

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
  if (nav) {
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        btn.classList.remove("is-active");
      });
    });
  }

  // Animation au scroll
  const reveals = document.querySelectorAll(".fade-in");
  const reveal = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) el.classList.add("visible");
    });
  };
  window.addEventListener("scroll", reveal);
  reveal();
});
