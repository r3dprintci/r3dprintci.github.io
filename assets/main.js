// === GESTION DU MENU HAMBURGER ===
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const body = document.body;
  nav.classList.toggle("active");
  body.classList.toggle("menu-open");
}

// Fermer automatiquement le menu après un clic sur un lien
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("navMenu").classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
});
