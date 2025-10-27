// Menu mobile
function toggleMenu() {
  document.getElementById('navMenu').classList.toggle('show');
}

// Année dynamique
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  // FAQ
  document.querySelectorAll(".faq-item h4").forEach(q => {
    q.addEventListener("click", () => {
      let p = q.nextElementSibling;
      p.style.display = (p.style.display === "block") ? "none" : "block";
    });
  });

  // Galerie Lightbox
  const gallery = document.querySelectorAll("#gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  let current = 0;

  if (gallery.length > 0) {
    gallery.forEach((img, i) => {
      img.onclick = () => { lightbox.style.display = "flex"; lightboxImg.src = img.src; current = i; };
    });
  }

  if (lightbox) {
    document.addEventListener("keydown", e => {
      if (lightbox.style.display === "flex") {
        if (e.key === "ArrowLeft") changeImage(-1);
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "Escape") closeLightbox();
      }
    });
  }

  // Animation au scroll
  const reveals = document.querySelectorAll(".reveal");
  const showOnScroll = () => {
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 80) el.classList.add("active");
    });
  };
  window.addEventListener("scroll", showOnScroll);
  showOnScroll();
});

// Lightbox navigation
function closeLightbox() { document.getElementById("lightbox").style.display = "none"; }
function changeImage(dir) {
  const imgs = document.querySelectorAll("#gallery img");
  const lightboxImg = document.getElementById("lightboxImg");
  current = (current + dir + imgs.length) % imgs.length;
  lightboxImg.src = imgs[current].src;
}

// Filtre galerie
function filterGallery(category) {
  const imgs = document.querySelectorAll('.gallery img');
  document.querySelectorAll('.filter button').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  imgs.forEach(img => {
    img.style.display = (category === 'all' || img.classList.contains(category)) ? 'block' : 'none';
  });
}
