/* ============================================================
   R3D PRINT CI – Script dynamique Devis
   Version Premium 2025
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("formContainer");
  const serviceButtons = document.querySelectorAll(".service-choice");
  const resumeContainer = document.getElementById("resume");

  if (!formContainer || !serviceButtons.length) return;

  // --- Activation visuelle des boutons de service ---
  serviceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      serviceButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderForm(btn.dataset.service);
      window.scrollTo({ top: formContainer.offsetTop - 100, behavior: "smooth" });
    });
  });

  // --- Génération dynamique du formulaire selon le service choisi ---
  function renderForm(service) {
    let html = "";

    if (service === "3d") {
      html = `
        <div class="service-panel fade-in visible">
          <h3>Impression 3D</h3>
          <label>Nom complet</label>
          <input type="text" placeholder="Votre nom complet" required>
          <label>Nature de l’objet</label>
          <input type="text" placeholder="Ex : prototype, trophée, pièce mécanique">
          <label>Dimensions (cm)</label>
          <input type="text" placeholder="Ex : 15 x 10 x 5">
          <label>Lieu d’utilisation</label>
          <select>
            <option value="">Choisissez...</option>
            <option>Intérieur</option>
            <option>Extérieur</option>
          </select>
          <label>Couleurs souhaitées</label>
          <div id="colorChips" class="color-chips">
            <input type="color" value="#c9af6b">
            <button id="addColor" class="add-color">+</button>
          </div>
          <label>Photos de référence</label>
          <input type="file" multiple accept="image/*">
        </div>`;
    }

    else if (service === "laser") {
      html = `
        <div class="service-panel fade-in visible">
          <h3>Gravure Laser</h3>
          <label>Nom complet</label>
          <input type="text" placeholder="Votre nom complet" required>
          <label>Type d’objet</label>
          <input type="text" placeholder="Ex : plaque, bouteille, trophée">
          <label>Quantité</label>
          <input type="number" placeholder="Ex : 5">
          <label>Dimensions (cm)</label>
          <input type="text" placeholder="Ex : 10 x 5 x 2">
          <label>Matériau</label>
          <select>
            <option>Bois</option>
            <option>Métal</option>
            <option>Verre</option>
            <option>PVC</option>
            <option>Autre</option>
          </select>
          <label>Photos de référence</label>
          <input type="file" multiple accept="image/*">
        </div>`;
    }

    else if (service === "proto") {
      html = `
        <div class="service-panel fade-in visible">
          <h3>Prototypage</h3>
          <label>Nom complet</label>
          <input type="text" placeholder="Votre nom complet" required>
          <label>Nature du prototype</label>
          <input type="text" placeholder="Ex : boîtier, pièce technique">
          <label>Dimensions (cm)</label>
          <input type="text" placeholder="Ex : 20 x 10 x 8">
          <label>Matériau souhaité</label>
          <select>
            <option>PLA</option>
            <option>PETG</option>
            <option>Résine</option>
            <option>Autre</option>
          </select>
          <label>Photos de référence</label>
          <input type="file" multiple accept="image/*">
        </div>`;
    }

    formContainer.innerHTML = `
      <form id="devisForm" class="fade-in visible form-grid">
        ${html}
        <div class="form-actions">
          <button type="button" class="btn gold halo-anim" id="submitDevis">
            ✉️ Envoyer la demande
          </button>
        </div>
      </form>
    `;

    setupColorAdder();
    setupSubmit(service);
  }

  // --- Gestion de l’ajout de couleurs ---
  function setupColorAdder() {
    const addBtn = document.getElementById("addColor");
    const container = document.getElementById("colorChips");
    if (!addBtn || !container) return;
    addBtn.addEventListener("click", e => {
      e.preventDefault();
      const newColor = document.createElement("input");
      newColor.type = "color";
      newColor.classList.add("fade-in");
      container.insertBefore(newColor, addBtn);
      setTimeout(() => newColor.classList.add("visible"), 100);
    });
  }

  // --- Soumission du formulaire ---
  function setupSubmit(service) {
    const btn = document.getElementById("submitDevis");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const name = document.querySelector("#devisForm input[type='text']")?.value.trim() || "";
      resumeContainer.innerHTML = `
        <div class="fade-in visible confirmation-box">
          <h3 style="color:#c9af6b;">Merci ${name || "cher client"} !</h3>
          <p>Votre demande de <strong>${getServiceName(service)}</strong> a bien été enregistrée.</p>
          <p>Notre équipe vous contactera sous 24h via WhatsApp ou email pour la suite.</p>
        </div>`;
      window.scrollTo({ top: resumeContainer.offsetTop - 80, behavior: "smooth" });
    });
  }

  function getServiceName(code) {
    return code === "3d" ? "service d’impression 3D"
      : code === "laser" ? "service de gravure laser"
      : "service de prototypage";
  }
});
