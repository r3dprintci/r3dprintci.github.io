/* ============================================================
   R3D PRINT CI – SCRIPT DEVIS DYNAMIQUE PREMIUM 2025 (v11)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("formContainer");
  const serviceButtons = document.querySelectorAll(".service-choice");
  const resumeContainer = document.getElementById("resume");

  if (!formContainer || !serviceButtons.length) return;

  /* --- ACTIVATION DES BOUTONS DE SERVICE --- */
  serviceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      serviceButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderForm(btn.dataset.service);
      window.scrollTo({ top: formContainer.offsetTop - 80, behavior: "smooth" });
    });
  });

  /* --- GÉNÉRATION DU FORMULAIRE SELON LE SERVICE --- */
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
          <input type="text" placeholder="Ex : 15 × 10 × 5">

          <label>Lieu d’utilisation</label>
          <select>
            <option value="">Choisissez...</option>
            <option>Intérieur</option>
            <option>Extérieur</option>
          </select>

          <label>Couleurs souhaitées</label>
          <div class="color-chips" id="colorChips">
            <input type="color" value="#c9af6b">
            <button type="button" class="add-color" id="addColor">+</button>
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
          <input type="number" min="1" placeholder="Ex : 5">

          <label>Dimensions (cm)</label>
          <input type="text" placeholder="Ex : 10 × 5 × 2">

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
          <h3>Prototypage Rapide</h3>

          <label>Nom complet</label>
          <input type="text" placeholder="Votre nom complet" required>

          <label>Nature du prototype</label>
          <input type="text" placeholder="Ex : boîtier, pièce technique">

          <label>Dimensions (cm)</label>
          <input type="text" placeholder="Ex : 20 × 10 × 8">

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
      <form id="devisForm" class="fade-in visible">
        ${html}
        <div class="form-actions">
          <button type="button" class="btn gold halo-anim" id="submitDevis">Envoyer la demande</button>
        </div>
      </form>
    `;

    setupColorAdder();
    setupSubmit(service);
  }

  /* --- AJOUT DYNAMIQUE DE COULEURS --- */
  function setupColorAdder() {
    const addBtn = document.getElementById("addColor");
    const container = document.getElementById("colorChips");
    if (!addBtn || !container) return;
    addBtn.addEventListener("click", e => {
      e.preventDefault();
      const newColor = document.createElement("input");
      newColor.type = "color";
      newColor.value = "#c9af6b";
      newColor.style.opacity = "0";
      newColor.style.transition = "opacity 0.4s ease";
      container.insertBefore(newColor, addBtn);
      setTimeout(() => (newColor.style.opacity = "1"), 50);
    });
  }

  /* --- CONFIRMATION DE SOUMISSION --- */
  function setupSubmit(service) {
    const btn = document.getElementById("submitDevis");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const name = document.querySelector("#devisForm input[type='text']")?.value.trim() || "";

      resumeContainer.innerHTML = `
        <div class="confirmation-box fade-in visible">
          <h3 style="color:#c9af6b;">Merci ${name || "cher client"} !</h3>
          <p>Votre demande de <strong>${getServiceName(service)}</strong> a bien été enregistrée.<br>
          Vous recevrez une réponse sous 24 heures.</p>
        </div>
      `;

      window.scrollTo({ top: resumeContainer.offsetTop - 100, behavior: "smooth" });
    });
  }

  function getServiceName(code) {
    return code === "3d" ? "service d’impression 3D"
      : code === "laser" ? "service de gravure laser"
      : "service de prototypage";
  }
});
