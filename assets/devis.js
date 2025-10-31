// =============================================================
// R3D PRINT CI - SCRIPT DYNAMIQUE DEVIS (version finale stable)
// =============================================================

document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("formContainer");
  const serviceButtons = document.querySelectorAll(".service-choice");
  const resumeContainer = document.getElementById("resume");

  if (!formContainer || !serviceButtons.length) return;

  serviceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      serviceButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderForm(btn.dataset.service);
      window.scrollTo({ top: formContainer.offsetTop - 100, behavior: "smooth" });
    });
  });

  function renderForm(service) {
    let html = "";

    if (service === "3d") {
      html = `
        <div class="service-panel fade-in visible">
          <h3>Impression 3D</h3>
          <label>Nom complet</label><input type="text" placeholder="Votre nom complet" required>
          <label>Nature de l’objet</label><input type="text" placeholder="Prototype, trophée...">
          <label>Dimensions (cm)</label><input type="text" placeholder="15 x 10 x 5">
          <label>Couleurs souhaitées</label><input type="color" value="#c9af6b">
          <label>Photos de référence</label><input type="file" multiple accept="image/*">
        </div>`;
    }
    else if (service === "laser") {
      html = `
        <div class="service-panel fade-in visible">
          <h3>Gravure Laser</h3>
          <label>Nom complet</label><input type="text" placeholder="Votre nom complet" required>
          <label>Type d’objet</label><input type="text" placeholder="Plaque, bouteille...">
          <label>Matériau</label><select><option>Bois</option><option>Métal</option><option>Verre</option></select>
          <label>Photos de référence</label><input type="file" multiple accept="image/*">
        </div>`;
    }
    else if (service === "proto") {
      html = `
        <div class="service-panel fade-in visible">
          <h3>Prototypage</h3>
          <label>Nom complet</label><input type="text" placeholder="Votre nom complet" required>
          <label>Nature du prototype</label><input type="text" placeholder="Boîtier, pièce...">
          <label>Dimensions (cm)</label><input type="text" placeholder="20 x 10 x 8">
          <label>Photos de référence</label><input type="file" multiple accept="image/*">
        </div>`;
    }

    formContainer.innerHTML = `
      <form id="devisForm" class="fade-in visible">
        ${html}
        <div style="text-align:center;margin-top:25px;">
          <button type="button" class="btn gold halo-anim" id="submitDevis">Envoyer la demande</button>
        </div>
      </form>
    `;

    setupSubmit(service);
  }

  function setupSubmit(service) {
    const btn = document.getElementById("submitDevis");
    if (!btn) return;
    btn.addEventListener("click", () => {
      resumeContainer.innerHTML = `
        <div class="fade-in visible" style="text-align:center;padding:35px;background:#fffaf0;border-radius:14px;margin-top:30px;">
          <h3 style="color:#c9af6b;">Merci !</h3>
          <p>Votre demande de <strong>${getServiceName(service)}</strong> a bien été enregistrée.<br>Vous recevrez une réponse sous 24h.</p>
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
