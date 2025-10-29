// =========================================================
// MENU HAMBURGER
// =========================================================
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("active");
}

// Fermer automatiquement après clic
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("navMenu").classList.remove("active");
    });
  });
});

// =========================================================
// FORMULAIRES DYNAMIQUES
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const serviceButtons = document.querySelectorAll(".choice-btn");
  const forms = document.querySelectorAll(".devis-form");

  // Cacher tous les formulaires au départ
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
      document.getElementById(`form-${service}`).style.display = "block";

      window.scrollTo({
        top: document.getElementById(`form-${service}`).offsetTop - 80,
        behavior: "smooth"
      });
    });
  });

  // =========================================================
  // AJOUT DYNAMIQUE DE COULEURS (uniquement impression 3D)
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
  // VALIDATION & MESSAGE PERSONNALISÉ
  // =========================================================
  const allForms = document.querySelectorAll("form.devis-form");
  allForms.forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const nameField = form.querySelector("input[type='text']");
      const name = nameField?.value.trim() || "client";

      form.innerHTML = `
        <div class="fade-in" style="text-align:center; padding:60px;">
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
