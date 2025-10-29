// =============================================================
// R3D PRINT CI - SCRIPT GLOBAL FLUIDE PREMIUM (version corrigée sécurité affichage)
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

// === APPARITION DES BLOCS ===
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right").forEach(el => observer.observe(el));

// === TRANSITION ENTRE LES PAGES (corrigée) ===
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  document.body.style.opacity = "1"; // sécurité anti-page blanche
});

window.addEventListener("beforeunload", () => {
  document.body.style.transition = "opacity 0.5s ease";
  document.body.style.opacity = "0";
});

// === SÉCURITÉ SUPPLÉMENTAIRE : forcer affichage après 1,5s ===
setTimeout(() => {
  if (!document.body.classList.contains("loaded")) {
    document.body.style.opacity = "1";
  }
}, 1500);
