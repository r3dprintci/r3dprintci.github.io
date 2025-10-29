// =========================================================
// 🎨 MENU HAMBURGER PREMIUM R3D
// =========================================================
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const burger = document.querySelector(".hamburger");

  // Toggle du menu
  nav.classList.toggle("active");
  burger.classList.toggle("open");

  // Animation dorée sur l'arrière-plan mobile
  if (nav.classList.contains("active")) {
    nav.style.background = "linear-gradient(120deg, rgba(255,248,231,0.95), rgba(255,255,255,0.98))";
    nav.style.transition = "all 0.4s ease";
  } else {
    nav.style.background = "transparent";
  }
}

// Fermeture automatique après clic sur un lien
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("navMenu").classList.remove("active");
      document.querySelector(".hamburger").classList.remove("open");
    });
  });
});

// =========================================================
// 🧱 FORMULAIRES DYNAMIQUES DEVIS
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const serviceButtons = document.querySelectorAll(".choice-btn");
  const forms = document.querySelectorAll(".devis-form");

  // Cacher tous les formulaires
  forms.forEach(f => (f.style.display = "none"));

  serviceButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Retirer les états actifs
      serviceButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Cacher tous les formulaires
      forms.forEach(form => (form.style.display = "none"));

      // Afficher le bon formulaire
      const service = button.dataset.service;
      const formToShow = document.getElementById(`form-${service}`);
      if (formToShow) {
        formToShow.style.display = "block";
        formToShow.classList.add("fade-in");
      }

      // Scroll fluide vers le formulaire
      window.scrollTo({
        top: formToShow.offsetTop - 80,
        behavior: "smooth"
      });
    });
  });

  // =========================================================
  // 🎨 AJOUT DYNAMIQUE DE COULEURS (Impression 3D)
  // =========================================================
  const colorContainer3d = document.getElementById("colorContainer3d");
  if (colorContainer3d) {
    colorContainer3d.addEventListener("click", e => {
      if (e.target.classList.contains("add-color")) {
        const newColor = document.createElement("input");
        newColor.type = "color";
        newColor.className = "color-circle";
        newColor.value = "#c9af6b";
        colorContainer3d.insertBefore(newColor, e.target);
      }
    });
  }

  // =========================================================
  // 💬 VALIDATION & MESSAGE PERSONNALISÉ
  // =========================================================
  const allForms = document.querySelectorAll("form.devis-form");
  allForms.forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const nameField = form.querySelector("input[type='text']");
      const name = nameField?.value.trim() || "client";

      form.innerHTML = `
        <div class="fade-in" style="text-align:center; padding:60px;">
          <div style="font-size:3rem; color:var(--gold); margin-bottom:15px;">✔️</div>
          <h2 style="color:var(--gold); font-size:2rem; margin-bottom:10px;">
            Merci ${name.split(" ")[0]} !
          </h2>
          <p>Votre demande a bien été envoyée.<br>Nous vous recontacterons très bientôt.</p>
          <div style="margin-top:25px;">
            <a href="index.html" class="btn gold">⬅ Retour à l’accueil</a>
          </div>
        </div>
      `;
    });
  });
});
