// =============================================================
// R3D PRINT CI - DEVIS WHATSAPP PRO (Version Premium 2025)
// =============================================================
document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("formContainer");
  const serviceButtons = document.querySelectorAll(".service-choice");
  const resumeContainer = document.getElementById("resume");

  const whatsappNumber = "2250757841323";

  if (!formContainer || !serviceButtons.length) return;

  // Activation des boutons de choix de service
  serviceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      serviceButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderForm(btn.dataset.service);
      window.scrollTo({ top: formContainer.offsetTop - 100, behavior: "smooth" });
    });
  });

  // === Génération dynamique du formulaire selon le service ===
  function renderForm(service) {
    let html = "";

    if (service === "3d") {
      html = `
        <div class="service-panel fade-in visible">
          <h3>🧱 Impression 3D</h3>
          <label>Nom complet</label><input id="nom" type="text" placeholder="Votre nom complet" required>
          <label>Nature de l’objet</label><input id="objet" type="text" placeholder="Ex : prototype, trophée, pièce mécanique">
          <label>Dimensions (cm)</label><input id="dimensions" type="text" placeholder="Ex : 15 x 10 x 5">
          <label>Lieu d’utilisation</label>
          <select id="lieu"><option value="">Choisissez...</option><option>Intérieur</option><option>Extérieur</option></select>
          <label>Couleurs souhaitées</label><input id="couleur" type="text" placeholder="Ex : doré, noir, blanc">
          <label>Photos ou fichiers (à envoyer sur WhatsApp après l’envoi)</label><input id="fichiers" type="file" multiple accept="image/*">
          <div class="form-actions"><button type="button" class="btn gold halo-anim" id="submitDevis">Envoyer la demande</button></div>
        </div>`;
    }

    else if (service === "laser") {
      html = `
        <div class="service-panel fade-in visible">
          <h3>🔦 Gravure Laser</h3>
          <label>Nom complet</label><input id="nom" type="text" placeholder="Votre nom complet" required>
          <label>Type d’objet</label><input id="objet" type="text" placeholder="Ex : plaque, bouteille, trophée">
          <label>Quantité</label><input id="quantite" type="number" placeholder="Ex : 5">
          <label>Dimensions (cm)</label><input id="dimensions" type="text" placeholder="Ex : 10 x 5 x 2">
          <label>Matériau</label>
          <select id="materiau"><option>Bois</option><option>Métal</option><option>Verre</option><option>PVC</option><option>Autre</option></select>
          <label>Photos ou fichiers (à envoyer sur WhatsApp après l’envoi)</label><input id="fichiers" type="file" multiple accept="image/*">
          <div class="form-actions"><button type="button" class="btn gold halo-anim" id="submitDevis">Envoyer la demande</button></div>
        </div>`;
    }

    else if (service === "proto") {
      html = `
        <div class="service-panel fade-in visible">
          <h3>⚙️ Prototypage</h3>
          <label>Nom complet</label><input id="nom" type="text" placeholder="Votre nom complet" required>
          <label>Nature du prototype</label><input id="objet" type="text" placeholder="Ex : boîtier, pièce technique">
          <label>Dimensions (cm)</label><input id="dimensions" type="text" placeholder="Ex : 20 x 10 x 8">
          <label>Matériau souhaité</label>
          <select id="materiau"><option>PLA</option><option>PETG</option><option>Résine</option><option>Autre</option></select>
          <label>Photos ou fichiers (à envoyer sur WhatsApp après l’envoi)</label><input id="fichiers" type="file" multiple accept="image/*">
          <div class="form-actions"><button type="button" class="btn gold halo-anim" id="submitDevis">Envoyer la demande</button></div>
        </div>`;
    }

    formContainer.innerHTML = html;
    setupSubmit(service);
  }

  // === Envoi du message WhatsApp professionnel ===
  function setupSubmit(service) {
    const btn = document.getElementById("submitDevis");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const date = new Date();
      const dateStr = date.toLocaleDateString("fr-FR");
      const heureStr = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

      // Récupération des champs
      const nom = document.getElementById("nom")?.value || "Non précisé";
      const objet = document.getElementById("objet")?.value || "Non précisé";
      const dimensions = document.getElementById("dimensions")?.value || "Non précisées";
      const lieu = document.getElementById("lieu")?.value || "";
      const couleur = document.getElementById("couleur")?.value || "";
      const quantite = document.getElementById("quantite")?.value || "";
      const materiau = document.getElementById("materiau")?.value || "";

      const serviceName =
        service === "3d" ? "Impression 3D"
        : service === "laser" ? "Gravure Laser"
        : "Prototypage";

      // Message formaté professionnellement
      const message = `📩 *NOUVELLE DEMANDE DE DEVIS – R3D PRINT CI*
──────────────────────────────
🧱 *Service :* ${serviceName}
👤 *Nom :* ${nom}
📦 *Objet :* ${objet}
📏 *Dimensions :* ${dimensions}
🎨 *Couleur(s) :* ${couleur}
🏷️ *Matériau :* ${materiau}
🔢 *Quantité :* ${quantite}
📍 *Lieu d’utilisation :* ${lieu || "Non précisé"}
📁 *Fichiers :* à envoyer dans cette conversation WhatsApp
──────────────────────────────
🕓 *Date :* ${dateStr} à ${heureStr}
🌐 *Origine :* https://r3dprint.pro`;

      // Encodage et ouverture de WhatsApp
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");

      // Confirmation visuelle sur le site
      resumeContainer.innerHTML = `
        <div class="confirmation-box fade-in visible">
          <h3>✅ Demande envoyée avec succès</h3>
          <p>Merci <strong>${nom}</strong> ! Votre demande de <strong>${serviceName}</strong> a été transmise à notre équipe.<br>
          Vous allez être redirigé vers WhatsApp pour compléter votre envoi.</p>
        </div>`;
    });
  }
});
