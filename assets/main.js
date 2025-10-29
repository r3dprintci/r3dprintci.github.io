// ==============================================
// R3D PRINT CI - SCRIPT PRINCIPAL (version finale)
// ==============================================

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

// === FORMULAIRE DEVIS DYNAMIQUE ===
document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("formContainer");
  const serviceButtons = document.querySelectorAll(".service-choice");
  const resumeContainer = document.getElementById("resume");

  // Effet visuel de sélection
  serviceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      serviceButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      showForm(btn.dataset.service);
    });
  });

  // Création dynamique du formulaire selon le service
  function showForm(service) {
    let html = "";

    if (service === "3d") {
      html = `
        <div class="service-panel fade-in">
          <h3>Impression 3D</h3>
          <label>Nom complet</label><input type="text" placeholder="Votre nom complet" required>
          <label>Nature de l’objet</label><input type="text" placeholder="Ex: prototype, trophée, pièce mécanique">
          <label>Dimensions (cm)</label><input type="text" placeholder="Ex: 15 x 10 x 5">
          <label>Lieu d’utilisation</label>
          <select>
            <option value="">Choisissez...</option>
            <option value="intérieur">Intérieur</option>
            <option value="extérieur">Extérieur</option>
          </select>
          <label>Couleurs souhaitées</label>
          <div id="colorChips">
            <input type="color" value="#c9af6b">
            <button id="addColor">+</button>
          </div>
          <label>Photos de référence</label><input type="file" multiple accept="image/*">
        </div>
      `;
    }

    else if (service === "laser") {
      html = `
        <div class="service-panel fade-in">
          <h3>Gravure Laser</h3>
          <label>Nom complet</label><input type="text" placeholder="Votre nom complet" required>
          <label>Type d’objet à graver</label><input type="text" placeholder="Ex: plaque, bouteille, trophée">
          <label>Quantité</label><input type="number" placeholder="Ex: 5">
          <label>Dimensions (cm)</label><input type="text" placeholder="Ex: 10 x 5 x 2">
          <label>Matériau</label>
          <select>
            <option value="">Choisissez...</option>
            <option>Bois</option>
            <option>Métal</option>
            <option>Verre</option>
            <option>PVC</option>
            <option>Autre</option>
          </select>
          <label>Photos de référence</label><input type="file" multiple accept="image/*">
        </div>
      `;
    }

    else if (service === "proto") {
      html = `
        <div class="service-panel fade-in">
          <h3>Prototypage</h3>
          <label>Nom complet</label><input type="text" placeholder="Votre nom complet" required>
          <label>Nature du prototype</label><input type="text" placeholder="Ex: boîtier électronique, pièce mécanique">
          <label>Dimensions (cm)</label><input type="text" placeholder="Ex: 20 x 10 x 8">
          <label>Matériau souhaité</label>
          <select>
            <option value="">Choisissez...</option>
            <option>PLA</option>
            <option>PETG</option>
            <option>Résine</option>
            <option>Autre</option>
          </select>
          <label>Photos de référence</label><input type="file" multiple accept="image/*">
        </div>
      `;
    }

    formContainer.innerHTML = `
      <form id="devisForm" class="fade-in">
        ${html}
        <div style="grid-column: 1 / -1; text-align:center; margin-top:20px;">
          <button type="button" class="btn gold" id="submitDevis">Envoyer la demande</button>
        </div>
      </form>
    `;

    // Activation de la logique couleur dynamique
    initColorAdder();
    initSubmitHandler(service);
  }

  // === GESTION DES COULEURS ===
  function initColorAdder() {
    const colorContainer = document.getElementById("colorChips");
    if (!colorContainer) return;
    const addBtn = colorContainer.querySelector("#addColor");
    addBtn.addEventListener("click", e => {
      e.preventDefault();
      const newColor = document.createElement("input");
      newColor.type = "color";
      colorContainer.insertBefore(newColor, addBtn);
    });
  }

  // === SOUMISSION + RÉSUMÉ ===
  function initSubmitHandler(service) {
    const submitBtn = document.getElementById("submitDevis");
    submitBtn.addEventListener("click", () => {
      const name = document.querySelector("#devisForm input[type='text']").value.trim();
      resumeContainer.innerHTML = `
        <div class="fade-in" style="text-align:center;padding:30px;background:#fffaf0;border-radius:12px;margin-top:30px;">
          <h3>Merci ${name || "cher client"} !</h3>
          <p>Votre demande de <strong>${getServiceLabel(service)}</strong> a bien été enregistrée.<br>
          Vous recevrez une réponse sous 24h.</p>
        </div>
      `;
      window.scrollTo({ top: resumeContainer.offsetTop, behavior: "smooth" });
    });
  }

  function getServiceLabel(code) {
    switch (code) {
      case "3d": return "service d’impression 3D";
      case "laser": return "service de gravure laser";
      case "proto": return "service de prototypage";
      default: return "demande personnalisée";
    }
  }
});
