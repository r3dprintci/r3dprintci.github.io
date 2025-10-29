// =========================================================
// R3D PRINT CI – SCRIPT PRINCIPAL
// =========================================================

// === GESTION DU MENU HAMBURGER ===
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const body = document.body;
  nav.classList.toggle("active");
  body.classList.toggle("menu-open");
}

// Fermer le menu automatiquement après un clic sur un lien
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav a");
  const nav = document.getElementById("navMenu");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
});

// === EFFET D’APPARITION AU SCROLL (fade-in) ===
window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".fade-in");
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    }
  });
});

// === AJOUT D’UNE TRANSITION SUR LES BOUTONS ===
const buttons = document.querySelectorAll(".btn, .choice-btn, .add-color");
buttons.forEach(btn => {
  btn.addEventListener("mouseover", () => {
    btn.style.transition = "all 0.3s ease";
    btn.style.transform = "translateY(-2px)";
  });
  btn.addEventListener("mouseout", () => {
    btn.style.transform = "translateY(0)";
  });
});

// === SMOOTH SCROLL POUR LES ANCRES INTERNES ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});
