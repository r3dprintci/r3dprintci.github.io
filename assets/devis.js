/* =========================================================
   SCRIPT DEVIS – R3D PRINT CI
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // --- Sélection des éléments principaux ---
  const serviceCards = document.querySelectorAll(".service-card");
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

  // --- 1. Choix du service ---
  serviceCards.forEach((card) => {
    card.addEventListener("click", () => {
      serviceCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const service = card.dataset.service;
      serviceInput.value = service;

      panels.forEach(p => p.style.display = "none");
      if (service === "impression3d") document.getElementById("panel3D").style.display = "block";
      if (service === "gravure") document.getElementById("panelLaser").style.display = "block";
      if (service === "prototypage") document.getElementById("panelProto").style.display = "block";

      summarySection.classList.remove("active");
      confirmation.classList.remove("active");
    });
  });

  // --- 2. Gestion dynamique des couleurs ---
  function initColorPicker(prefix) {
    const grid = document.getElementById(`colorGrid${prefix}`);
    const picker = document.getElementById(`colorPicker${prefix}`);
    const addBtn = document.getElementById(`addColor${prefix}`);
    const preview = document.getElementById(`colorPreview${prefix}`);
    const inputHidden = document.getElementById(`colors${prefix}`);
    let colors = [];

    // Sélection d’une couleur vide
    grid.addEventListener("click", (e) => {
      if (e.target.classList.contains("color-circle")) {
        if (e.target.classList.contains("empty")) {
          picker.click();
          picker.oninput = (event) => {
            const newColor = event.target.value;
            colors.push(newColor);
            inputHidden.value = colors.join(", ");
            updateColorGrid();
          };
        }
      }
    });

    // Bouton “+” pour ajouter une autre couleur
    addBtn.addEventListener("click", () => {
      picker.click();
      picker.oninput = (event) => {
        const newColor = event.target.value;
        colors.push(newColor);
        inputHidden.value = colors.join(", ");
        updateColorGrid();
      };
    });

    // Actualisation visuelle
    function updateColorGrid() {
      grid.innerHTML = "";
      colors.forEach(c => {
        const div = document.createElement("div");
        div.className = "color-circle";
        div.style.background = c;
        grid.appendChild(div);
      });
      const emptyCircle = document.createElement("div");
      emptyCircle.className = "color-circle empty";
      grid.appendChild(emptyCircle);
      preview.textContent = colors.length
        ? `Couleurs : ${colors.join(", ")}`
        : "Aucune couleur sélectionnée";
    }
  }

  initColorPicker("3D");
  initColorPicker("Proto");

  // --- 3. Upload d’images avec aperçu ---
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

  initDropzone("drop3D", "thumbs3D");
  initDropzone("dropLaser", "thumbsLaser");
  initDropzone("dropProto", "thumbsProto");

  // --- 4. Génération du récapitulatif ---
  btnReview.addEventListener("click", () => {
    summaryList.innerHTML = "";
    summaryPhotos.innerHTML = "";

    const formData = new FormData(form);
    formData.forEach((val, key) => {
      if (val && key !== "colors3d" && key !== "colors_proto") {
        const li = document.createElement("li");
        li.textContent = `${key.replaceAll("_", " ")} : ${val}`;
        summaryList.appendChild(li);
      }
    });

    document.querySelectorAll(".thumbs img").forEach(img => {
      const clone = img.cloneNode();
      summaryPhotos.appendChild(clone);
    });

    summarySection.classList.add("active");
    summarySection.scrollIntoView({ behavior: "smooth" });
  });

  // --- 5. Modifier le récapitulatif ---
  btnEdit.addEventListener("click", () => {
    summarySection.classList.remove("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- 6. Confirmation personnalisée ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    summarySection.classList.remove("active");

    const nomComplet = document.getElementById("nomComplet").value || "";
    confirmationTitle.innerHTML = `Merci ${nomComplet}, votre demande a bien été envoyée ✨`;
    confirmation.classList.add("active");
    confirmation.scrollIntoView({ behavior: "smooth" });

    form.reset();
    panels.forEach(p => (p.style.display = "none"));
    serviceCards.forEach(c => c.classList.remove("active"));
  });
});
