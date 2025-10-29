// =========================================================
// GESTION DU MENU HAMBURGER
// =========================================================
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("active");
}

// Fermer automatiquement le menu après un clic sur un lien
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("navMenu").classList.remove("active");
    });
  });
});

// =========================================================
// GESTION DU FORMULAIRE DEVIS
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const serviceButtons = document.querySelectorAll(".choice-btn");
  const form = document.getElementById("devisForm");
  const colorContainer = document.getElementById("colorContainer");

  // Cacher initialement tout le formulaire tant qu’un service n’est pas choisi
  if (form) form.style.display = "none";

  serviceButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Réinitialiser les états actifs
      serviceButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Afficher le formulaire une fois le type choisi
      if (form) form.style.display = "block";

      // Adapter le texte du placeholder selon le service
      const selectedService = button.dataset.service;
      const objetInput = document.getElementById("objet");
      const detailsLabel = document.querySelector('label[for="details"]');

      if (selectedService === "impression3d") {
        objetInput.placeholder = "Décrivez l’objet à imprimer (ex : pièce décorative, prototype...)";
        detailsLabel.textContent = "Détails techniques (matière, finitions, dimensions...)";
      } else if (selectedService === "gravure") {
        objetInput.placeholder = "Décrivez l’objet à graver (ex : plaque, trophée, planche bois...)";
        detailsLabel.textContent = "Détails de gravure (matériau, surface, profondeur...)";
      } else if (selectedService === "prototypage") {
        objetInput.placeholder = "Expliquez le prototype souhaité (ex : maquette, pièce test...)";
        detailsLabel.textContent = "Précisions sur le projet (fonction, assemblage, contraintes...)";
      }

      window.scrollTo({
        top: form.offsetTop - 80,
        behavior: "smooth"
      });
    });
  });

  // =========================================================
  // AJOUT DYNAMIQUE DE COULEURS
  // =========================================================
  if (colorContainer) {
    colorContainer.addEventListener("click", e => {
      if (e.target.classList.contains("add-color")) {
        const newColor = document.createElement("input");
        newColor.type = "color";
        newColor.className = "color-circle";
        newColor.value = "#c9af6b";
        colorContainer.insertBefore(newColor, e.target);
      }
    });
  }

  // =========================================================
  // SOUMISSION DU FORMULAIRE
  // =========================================================
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const name = document.getElementById("nom").value.trim();
      const container = document.querySelector(".form-container");

      // Masquer le contenu du formulaire avec animation
      container.innerHTML = `
        <div class="fade-in" style="text-align:center; padding:60px;">
          <h2 style="color:var(--gold); font-size:2rem; margin-bottom:10px;">
            Merci ${name ? name.split(" ")[0] : "pour votre demande"} !
          </h2>
          <p>Votre demande de devis a bien été envoyée.<br>
          Nous vous recontacterons très bientôt pour finaliser votre projet.</p>
          <div style="margin-top:25px;">
            <a href="index.html" class="btn gold">⬅ Retour à l’accueil</a>
          </div>
        </div>
      `;
    });
  }
});
