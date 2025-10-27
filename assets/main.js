/* ===============================
   R3D PRINT CI — Script global
   =============================== */

/* ======== MENU BURGER ======== */
function toggleMenu() {
  document.getElementById('navMenu').classList.toggle('show');
}

/* ======== ANNÉE AUTOMATIQUE ======== */
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ======== ANIMATION SCROLL (révèle les éléments) ======== */
const revealOnScroll = () => {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add("visible");
  });
};
document.addEventListener("scroll", revealOnScroll);
document.addEventListener("DOMContentLoaded", revealOnScroll);

/* ======== LIGHTBOX ======== */
const initLightbox = () => {
  const gallery = document.querySelectorAll("#gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  let current = 0;

  if (!gallery.length || !lightbox) return;

  gallery.forEach((img, i) => {
    img.onclick = () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      current = i;
    };
  });

  window.closeLightbox = () => (lightbox.style.display = "none");
  window.changeImage = dir => {
    current = (current + dir + gallery.length) % gallery.length;
    lightboxImg.src = gallery[current].src;
  };

  document.addEventListener("keydown", e => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowLeft") changeImage(-1);
      if (e.key === "ArrowRight") changeImage(1);
      if (e.key === "Escape") closeLightbox();
    }
  });
};

/* ======== FILTRE GALERIE ======== */
function filterGallery(category) {
  const imgs = document.querySelectorAll('.gallery img');
  document.querySelectorAll('.filter button').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  imgs.forEach(img => {
    img.style.display = (category === 'all' || img.classList.contains(category)) ? 'block' : 'none';
  });
}

/* ======== TRANSITION ENTRE PAGES ======== */
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
  document.querySelectorAll('a[href]').forEach(link => {
    const url = link.getAttribute('href');
    if (url && !url.startsWith('http') && !url.startsWith('#') && !url.match(/\.(png|jpg|jpeg|pdf)$/i)) {
      link.addEventListener('click', e => {
        e.preventDefault();
        document.body.style.opacity = 0;
        setTimeout(() => window.location.href = url, 300);
      });
    }
  });
});

/* ======== INITIALISATION ======== */
document.addEventListener("DOMContentLoaded", () => {
  initLightbox();
});
