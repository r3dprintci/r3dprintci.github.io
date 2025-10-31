/* ------------------------------------------
   R3D PRINT CI – Script principal
   Version finale Premium 2025
------------------------------------------- */

/* --- MENU HAMBURGER MOBILE --- */
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const btn = document.querySelector(".hamburger");
  const overlay = document.querySelector(".nav-overlay");

  if (!nav || !btn) return;

  // Ouvre ou ferme le menu
  nav.classList.toggle("open");
  btn.classList.toggle("is-active");

  // Active ou désactive l’overlay
  if (overlay) {
    if (nav.classList.contains("open")) {
      overlay.style.opacity = "1";
      overlay.style.pointerEvents = "all";
    } else {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
    }
  }
}

/* --- GESTION DU CLIC ET FERMETURE AUTOMATIQUE --- */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".hamburger");
  const nav = document.getElementById("navMenu");
  const overlay = document.querySelector(".nav-overlay");

  if (btn) {
    btn.addEventListener("click", toggleMenu);
  }

  // Ferme le menu quand on clique sur un lien
  if (nav) {
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        if (btn) btn.classList.remove("is-active");
        if (overlay) {
          overlay.style.opacity = "0";
          overlay.style.pointerEvents = "none";
        }
      });
    });
  }

  // Ferme le menu si on clique sur le fond flouté
  if (overlay) {
    overlay.addEventListener("click", () => {
      nav.classList.remove("open");
      if (btn) btn.classList.remove("is-active");
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
    });
  }
});

/* --- ANIMATION D’APPARITION AU SCROLL --- */
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
  revealOnScroll();
});

/* --- EFFET DOUX DE TRANSITION AU CHARGEMENT DE PAGE --- */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

/* --- FONCTION SUPPLÉMENTAIRE : BOUTON "BACK TO TOP" --- */
window.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.innerHTML = "⬆";
  btn.setAttribute("id", "backToTop");
  btn.style.position = "fixed";
  btn.style.bottom = "25px";
  btn.style.right = "25px";
  btn.style.border = "none";
  btn.style.background = "linear-gradient(135deg, #d8c58a, #c8a951)";
  btn.style.color = "#fff";
  btn.style.fontSize = "20px";
  btn.style.borderRadius = "50%";
  btn.style.padding = "12px";
  btn.style.cursor = "pointer";
  btn.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  btn.style.transition = "opacity 0.4s ease, transform 0.3s ease";
  btn.style.opacity = "0";
  btn.style.zIndex = "999";
  document.body.appendChild(btn);

  // Apparition au scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      btn.style.opacity = "1";
      btn.style.transform = "translateY(0)";
    } else {
      btn.style.opacity = "0";
      btn.style.transform = "translateY(10px)";
    }
  });

  // Remonte en haut
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
