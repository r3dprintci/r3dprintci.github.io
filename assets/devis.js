/* =========================================================
   SCRIPT DEVIS – R3D PRINT CI
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Éléments principaux
  const serviceCards = document.querySelectorAll(".service-card[data-service]");
  const panels = document.querySelectorAll(".panel");
  const serviceInput = document.getElementById("serviceType");
  const form = document.getElementById("devisForm");
  const summarySection = document.getElementById("summarySection");
  const confirmation = document.getElementById("confirmation");
  const summaryList = document.getElementById("summaryList");
  const summaryPhotos = document.getElementById("summaryPhotos");
  const btnReview = document.getElementById("btnReview");
  const btnEdit = document.getElementById("btnEdit");
  const btnConfirm = document.getElementById("btnConfirm");
  const confirmationTitle = document.getElementById("confirmationTitle");

  // 1) Choix du service + transition
  serviceCards.forEach((card) => {
    card.addEventListener("click", () => {
      serviceCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      const service = card.dataset.service;
      serviceInput.value = service;

      panels.forEach(p => { p.style.display = "none"; p.classList.remove("fade-card"); });

      if (service === "impression3d") showPanel("panel3D");
      if (service === "gravure")      showPanel("panelLaser");
      if (service === "prototypage")  showPanel("panelProto");

      // réinitialiser résumé / confirmation
      summarySection.classList.remove("active");
      confirmation.classList.remove("active");
      confirmationTitle.textContent = "Merci, votre demande a été envoyée !";
    });
  });

  function showPanel(id) {
    const panel = document.getElementById(id);
    panel.style.display = "block";
    // relance l’animation
    void panel.offsetWidth;
    panel.classList.add("fade-card");
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // 2) Gestion dynamique des couleurs (3D / Proto)
  initColorPicker("3D");
  initColorPicker("Proto");

  function initColorPicker(prefix) {
    const grid = document.getElementById(`colorGrid${prefix}`);
    const picker = document.getElementById(`colorPicker${prefix}`);
    const addBtn = document.getElementById(`addColor${prefix}`);
    const preview = document.getElementById(`colorPreview${prefix}`);
    const inputHidden = document.getElementById(`colors${prefix}`);
    let colors = [];

    grid.addEventListener("click", (e) => {
      if (e.target.classList.contains("color-circle") && e.target.classList.contains("empty")) {
        picker.click();
      }
    });

    picker.addEventListener("input", (event) => {
      const newColor = event.target.value;
      if (!newColor) return;
      colors.push(newColor);
      inputHidden.value = colors.join(", ");
      updateColorGrid();
    });

    addBtn.addEventListener("click", () => picker.click());

    function updateColorGrid() {
      grid.innerHTML = "";
      colors.forEach(c => {
        const div = document.createElement("div");
        div.className = "color-circle";
        div.style.background = c;
        div.title = c;
        grid.appendChild(div);
      });
      const emptyCircle = document.createElement("div");
      emptyCircle.className = "color-circle empty";
      grid.appendChild(emptyCircle);
      preview.textContent = colors.length ? `Couleurs : ${colors.join(", ")}` : "Aucune couleur sélectionnée";
    }
  }

  // 3) Upload d’images avec aperçu
  initDropzone("drop3D", "thumbs3D");
  initDropzone("dropLaser", "thumbsLaser");
  initDropzone("dropProto", "thumbsProto");

  function initDropzone(dropId, thumbsId) {
    const drop = document.getElementById(dropId);
    const input = drop.querySelector("input");
    const thumbs = document.getElementById(thumbsId);

    function handleFiles(files) {
      thumbs.innerHTML = "";
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement("img");
          img.src = e.target.result;
          thumbs.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    }

    drop.addEventListener("click", () => input.click());
    input.addEventListener("change", (e) => handleFiles(e.target.files));
  }

  // 4) Récapitulatif
  btnReview.addEventListener("click", () => {
    summaryList.innerHTML = "";
    summaryPhotos.innerHTML = "";

    const formData = new FormData(form);
    formData.forEach((val, key) => {
      if (!val) return;
      if (key === "colors3d" || key === "colors_proto") return;
      const li = document.createElement("li");
      li.textContent = `${key.replaceAll("_", " ")} : ${val}`;
      summaryList.appendChild(li);
    });

    document.querySelectorAll(".thumbs img").forEach(img => {
      const clone = img.cloneNode();
      summaryPhotos.appendChild(clone);
    });

    summarySection.classList.add("active");
    summarySection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // 5) Retour édition
  btnEdit.addEventListener("click", () => {
    summarySection.classList.remove("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 6) Confirmation
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    summarySection.classList.remove("active");

    const nomComplet = (document.getElementById("nomComplet").value || "").trim();
    confirmationTitle.innerHTML = nomComplet
      ? `Merci ${nomComplet}, votre demande a bien été envoyée ✨`
      : `Merci, votre demande a bien été envoyée ✨`;

    confirmation.classList.add("active");
    confirmation.scrollIntoView({ behavior: "smooth", block: "start" });

    // Réinitialisation partielle
    form.reset();
    panels.forEach(p => (p.style.display = "none"));
    serviceCards.forEach(c => c.classList.remove("active"));
  });
});
