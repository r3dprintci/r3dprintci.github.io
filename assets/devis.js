// =============================================================
// R3D PRINT CI - FORMULAIRE DEVIS (version stable premium 2025)
// =============================================================

document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("formContainer");
  const serviceButtons = document.querySelectorAll(".service-choice");
  const resumeContainer = document.getElementById("resume");

  if (!formContainer || !serviceButtons.length) return;

  // --- Sélection du service ---
  serviceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      serviceButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderForm(btn.dataset.service);
      window.scrollTo({ top: formContainer.offsetTop - 80, behavior: "smooth" });
    });
  });

  // --- Création du formulaire selon le service ---
  function renderForm(service) {
    let html = "";

    if (service === "3d") {
      html = `
        <div class="service-panel fade-in visible">
          <h3 style="color:#c9af6b;text-align:center;margin-bottom:25px;">🧱 Impression 3D</h3>
          ${field("Nom complet","text","Votre nom complet",true)}
          ${field("Nature de l’objet","text","Ex : prototype, trophée, pièce mécanique")}
          ${field("Dimensions (cm)","text","Ex : 15 x 10 x 5")}
          <label class="label">Lieu d’utilisation</label>
          <select class="input">
            <option value="">Choisissez...</option>
            <option>Intérieur</option>
            <option>Extérieur</option>
          </select>
          <label class="label">Couleurs souhaitées</label>
          <div id="colorChips" class="color-chips">
            <input type="color" value="#c9af6b" class="color-btn">
            <button id="addColor" class="add-color">+</button>
          </div>
          <label class="label">Photos de référence</label>
          <input type="file" multiple accept="image/*" class="input">
        </div>`;
    }

    else if (service === "laser") {
      html = `
        <div class="service-panel fade-in visible">
          <h3 style="color:#c9af6b;text-align:center;margin-bottom:25px;">🔦 Gravure Laser</h3>
          ${field("Nom complet","text","Votre nom complet",true)}
          ${field("Type d’objet","text","Ex : plaque, bouteille, trophée")}
          ${field("Quantité","number","Ex : 5")}
          ${field("Dimensions (cm)","text","Ex : 10 x 5 x 2")}
          <label class="label">Matériau</label>
          <select class="input">
            <option>Bois</option><option>Métal</option><option>Verre</option>
            <option>PVC</option><option>Autre</option>
          </select>
          <label class="label">Photos de référence</label>
          <input type="file" multiple accept="image/*" class="input">
        </div>`;
    }

    else if (service === "proto") {
      html = `
        <div class="service-panel fade-in visible">
          <h3 style="color:#c9af6b;text-align:center;margin-bottom:25px;">⚙️ Prototypage</h3>
          ${field("Nom complet","text","Votre nom complet",true)}
          ${field("Nature du prototype","text","Ex : boîtier, pièce technique")}
          ${field("Dimensions (cm)","text","Ex : 20 x 10 x 8")}
          <label class="label">Matériau souhaité</label>
          <select class="input">
            <option>PLA</option><option>PETG</option><option>Résine</option><option>Autre</option>
          </select>
          <label class="label">Photos de référence</label>
          <input type="file" multiple accept="image/*" class="input">
        </div>`;
    }

    formContainer.innerHTML = `
      <form id="devisForm" class="fade-in visible" style="
        background:#fff;
        border-radius:16px;
        padding:40px 35px;
        box-shadow:0 4px 20px rgba(0,0,0,0.05);
        border:1px solid #eee;
        max-width:700px;
        margin:auto;">
        ${html}
        <div style="text-align:center;margin-top:30px;">
          <button type="button" class="btn gold halo-anim" id="submitDevis"
            style="padding:14px 35px;font-size:1.05rem;border-radius:50px;">📨 Envoyer la demande</button>
        </div>
      </form>
    `;

    styleEnhancements();
    setupColorAdder();
    setupSubmit(service);
  }

  // === Champ texte ou nombre ===
  function field(label, type, placeholder, required = false) {
    return `
      <label class="label">${label}</label>
      <input type="${type}" placeholder="${placeholder}" ${required ? "required" : ""} class="input">
    `;
  }

  // === Ajout d’un champ couleur ===
  function setupColorAdder() {
    const addBtn = document.getElementById("addColor");
    const container = document.getElementById("colorChips");
    if (!addBtn || !container) return;
    addBtn.addEventListener("click", e => {
      e.preventDefault();
      const newColor = document.createElement("input");
      newColor.type = "color";
      newColor.className = "color-btn";
      container.insertBefore(newColor, addBtn);
    });
  }

  // === Soumission du formulaire ===
  function setupSubmit(service) {
    const btn = document.getElementById("submitDevis");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const name = document.querySelector("#devisForm input[type='text']")?.value.trim() || "";
      resumeContainer.innerHTML = `
        <div class="confirmation-box">
          <h3 style="color:#c9af6b;">Merci ${name || "cher client"} !</h3>
          <p>Votre demande de <strong>${getServiceName(service)}</strong> a bien été enregistrée.<br>
          Vous recevrez une réponse sous 24h.</p>
        </div>`;
      window.scrollTo({ top: resumeContainer.offsetTop - 100, behavior: "smooth" });
    });
  }

  // === Nom du service lisible ===
  function getServiceName(code) {
    return code === "3d" ? "service d’impression 3D"
      : code === "laser" ? "service de gravure laser"
      : "service de prototypage";
  }

  // === Appliquer le style des inputs ===
  function styleEnhancements() {
    const inputs = document.querySelectorAll(".input");
    inputs.forEach(input => {
      input.addEventListener("focus", () => {
        input.style.borderColor = "#c9af6b";
        input.style.boxShadow = "0 0 6px rgba(201,175,107,0.3)";
      });
      input.addEventListener("blur", () => {
        input.style.borderColor = "#ddd";
        input.style.boxShadow = "none";
      });
    });
  }
});
