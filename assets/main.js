// =============================================================
// R3D PRINT CI - EXPERIENCE FLUIDE PREMIUM (version finale)
// =============================================================

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

// =============================================================
// SCROLL FLUIDE UNIVERSEL
// =============================================================
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"], .scroll-smooth');
  for (let link of links) {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  }
});

// =============================================================
// ANIMATION DES SECTIONS AU SCROLL (FADE-IN DORÉ)
–
// =============================================================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right").forEach(el => {
  observer.observe(el);
});

// Ajout automatique de l’effet doré progressif
document.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  if (window.scrollY > 80) {
    header.style.boxShadow = "0 2px 10px rgba(201,175,107,0.25)";
  } else {
    header.style.boxShadow = "none";
  }
});

// =============================================================
// TRANSITIONS FLUIDES ENTRE FORMULAIRES DU DEVIS
// =============================================================
document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("formContainer");
  const serviceButtons = document.querySelectorAll(".service-choice");
  const resumeContainer = document.getElementById("resume");

  serviceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      serviceButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      transitionForm(btn.dataset.service);
    });
  });

  function transitionForm(service) {
    if (!formContainer) return;
    formContainer.style.opacity = "0";
    formContainer.style.transform = "translateY(10px)";
    setTimeout(() => {
      showForm(service);
      formContainer.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      formContainer.style.opacity = "1";
      formContainer.style.transform = "translateY(0)";
    }, 300);
  }

  // === FORMULAIRES SELON TYPE DE SERVICE ===
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
            <option>Intérieur</option>
            <option>Extérieur</option>
          </select>
          <label>Couleurs souhaitées</label>
          <div id="colorChips">
            <input type="color" value="#c9af6b">
            <button id="addColor">+</button>
          </div>
          <label>Photos de référence</label><input type="file" multiple accept="image/*">
        </div>`;
    }

    else if (service === "laser") {
      html = `
        <div class="service-panel fade-in">
          <h3>Gravure Laser</h3>
          <label>Nom complet</label><input type="text" placeholder="Votre nom complet" required>
          <label>Type d’objet</label><input type="text" placeholder="Ex: plaque, bouteille, trophée">
          <label>Quantité</label><input type="number" placeholder="Ex: 5">
          <label>Dimensions (cm)</label><input type="text" placeholder="Ex: 10 x 5 x 2">
          <label>Matériau</label>
          <select>
            <option>Bois</option>
            <option>Métal</option>
            <option>Verre</option>
            <option>PVC</option>
            <option>Autre</option>
          </select>
          <label>Photos de référence</label><input type="file" multiple accept="image/*">
        </div>`;
    }

    else if (service === "proto") {
      html = `
        <div class="service-panel fade-in">
          <h3>Prototypage</h3>
          <label>Nom complet</label><input type="text" placeholder="Votre nom complet" required>
          <label>Nature du prototype</label><input type="text" placeholder="Ex: boîtier, pièce technique">
          <label>Dimensions (cm)</label><input type="text" placeholder="Ex: 20 x 10 x 8">
          <label>Matériau souhaité</label>
          <select>
            <option>PLA</option>
            <option>PETG</option>
            <option>Résine</option>
            <option>Autre</option>
          </select>
          <label>Photos de référence</label><input type="file" multiple accept="image/*">
        </div>`;
    }

    formContainer.innerHTML = `
      <form id="devisForm" class="fade-in">
        ${html}
        <div style="grid-column: 1 / -1; text-align:center; margin-top:20px;">
          <button type="button" class="btn gold halo-anim" id="submitDevis">Envoyer la demande</button>
        </div>
      </form>
    `;

    initColorAdder();
    initSubmitHandler(service);
  }

  // === COULEURS DYNAMIQUES ===
  function initColorAdder() {
    const colorContainer = document.getElementById("colorChips");
    if (!colorContainer) return;
    const addBtn = colorContainer.querySelector("#addColor");
    addBtn.addEventListener("click", e => {
      e.preventDefault();
      const newColor = document.createElement("input");
      newColor.type = "color";
      newColor.style.opacity = "0";
      newColor.style.transition = "all 0.4s ease";
      colorContainer.insertBefore(newColor, addBtn);
      setTimeout(() => { newColor.style.opacity = "1"; }, 100);
    });
  }

  // === CONFIRMATION ANIMÉE ===
  function initSubmitHandler(service) {
    const submitBtn = document.getElementById("submitDevis");
    submitBtn.addEventListener("click", () => {
      const name = document.querySelector("#devisForm input[type='text']").value.trim();
      resumeContainer.innerHTML = `
        <div class="fade-in" style="text-align:center;padding:40px;background:#fffaf0;border-radius:14px;margin-top:30px;">
          <h3 style="color:#c9af6b;">Merci ${name || "cher client"} !</h3>
          <p>Votre demande de <strong>${getServiceLabel(service)}</strong> a bien été enregistrée.<br>
          Vous recevrez une réponse sous 24h.</p>
        </div>
      `;
      window.scrollTo({ top: resumeContainer.offsetTop - 100, behavior: "smooth" });
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

// =============================================================
// TRANSITION DORÉE ENTRE PAGES (effet global léger)
// =============================================================
window.addEventListener("beforeunload", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
});
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity 0.8s ease";
});
