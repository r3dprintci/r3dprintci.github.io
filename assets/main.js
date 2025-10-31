/* ------------------------------------------
   R3D PRINT CI – Script principal (Version Premium Anti-Flash)
   Version finale stable 2025
------------------------------------------- */

/* --- EFFET ANTI-FOND BEIGE & APPARITION DOUCE --- */
document.documentElement.style.backgroundColor = "#fff"; // fond neutre avant CSS
document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.6s ease-out";

/* --- Quand tout est prêt --- */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100); // petit délai pour éviter l'écran beige
});

/* --- MENU HAMBURGER MOBILE --- */
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const btn = document.querySelector(".hamburger");
  if (!nav || !btn) return;
  nav.classList.toggle("open");
  btn.classList.toggle("is-active");
}

/* --- INITIALISATION DU MENU ET DES ANIMATIONS --- */
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
