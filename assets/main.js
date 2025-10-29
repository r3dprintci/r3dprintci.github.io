// =============================================================
// R3D PRINT CI - SCRIPT GLOBAL FLUIDE PREMIUM
// =============================================================

// === MENU HAMBURGER ===
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const body = document.body;
  nav.classList.toggle("active");
  body.classList.toggle("menu-open");
}

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("navMenu").classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
});

// === SCROLL FLUIDE ===
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
      }
    });
  });
});

// === APPARITION DES BLOCS (ANIMATION FADE-IN) ===
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right").forEach(el => observer.observe(el));

// === TRANSITION DORÉE ENTRE LES PAGES ===
window.addEventListener("beforeunload", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
});
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity 0.8s ease";
});
