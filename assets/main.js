/* --- R3D PRINT CI - Script principal v6 --- */

// Apparition douce + fond neutre
document.documentElement.style.backgroundColor = "#fff";
document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.6s ease";
window.addEventListener("load", () => {
  setTimeout(() => { document.body.style.opacity = "1"; }, 100);
});

// Menu hamburger
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
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.classList.remove("is-active");
    }));
  }

  const reveals = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right");
  function reveal() {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < windowHeight - 100) el.classList.add("visible");
    });
  }
  window.addEventListener("scroll", reveal);
  reveal();
});
