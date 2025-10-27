/* ------------------------------
   R3D PRINT CI — Script global
   ------------------------------ */

/* ======== MENU BURGER ======== */
function toggleMenu() {
  document.getElementById('navMenu').classList.toggle('show');
}

/* ======== ANNÉE AUTOMATIQUE ======== */
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ======== ANIMATION AU SCROLL ======== */
document.addEventListener("scroll", () => {
  // Animation pour les services
  document.querySelectorAll(".service-card").forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) card.classList.add("visible");
  });
  // Animation pour les images de galerie
  document.querySelectorAll(".gallery img").forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) img.classList.add("visible");
  });
});

/* ======== LIGHTBOX GÉNÉRIQUE ======== */
const initLightbox = () => {
  const gallery = document.querySelectorAll("#gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const caption = document.getElementById("caption");
  let current = 0;

  if (!gallery.length || !lightbox) return;

  gallery.forEach((img, i) => {
    img.onclick = () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      if (caption) caption.textContent = img.alt || "";
      current = i;
    };
  });

  window.changeImage = dir => {
    current = (current + dir + gallery.length) % gallery.length;
    lightboxImg.src = gallery[current].src;
    if (caption) caption.textContent = gallery[current].alt || "";
  };

  window.closeLightbox = () => (lightbox.style.display = "none");

  document.addEventListener("keydown", e => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowLeft") changeImage(-1);
      if (e.key === "ArrowRight") changeImage(1);
      if (e.key === "Escape") closeLightbox();
    }
  });

  let startX = 0;
  lightbox.addEventListener("touchstart", e => (startX = e.touches[0].clientX));
  lightbox.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) changeImage(-1);
    else if (startX - endX > 50) changeImage(1);
  });
};

/* ======== FILTRE DE GALERIE ======== */
function filterGallery(category) {
  const imgs = document.querySelectorAll('.gallery img');
  document.querySelectorAll('.filter button').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  imgs.forEach(img => {
    img.style.display = (category === 'all' || img.classList.contains(category)) ? 'block' : 'none';
  });
}

/* ======== INITIALISATION ======== */
document.addEventListener("DOMContentLoaded", () => {
  initLightbox();
});
