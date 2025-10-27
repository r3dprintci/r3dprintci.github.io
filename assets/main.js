/* ===============================
   NAVIGATION & MENU MOBILE
================================= */
function toggleMenu(){
  document.getElementById('navMenu').classList.toggle('show');
}

/* ===============================
   ANNEE AUTOMATIQUE DANS LE FOOTER
================================= */
document.addEventListener("DOMContentLoaded", ()=>{
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});

/* ===============================
   FAQ CLIQUABLE
================================= */
document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll(".faq-item h4").forEach(q=>{
    q.addEventListener("click",()=>{
      const p=q.nextElementSibling;
      p.style.display = (p.style.display==="block") ? "none" : "block";
    });
  });
});

/* ===============================
   LIGHTBOX GALERIE
================================= */
const gallery=document.querySelectorAll("#gallery img");
const lightbox=document.getElementById("lightbox");
const lightboxImg=document.getElementById("lightboxImg");
let current=0;

if(gallery.length && lightbox){
  gallery.forEach((img,i)=>{
    img.onclick=()=>{
      lightbox.style.display="flex";
      lightboxImg.src=img.src;
      current=i;
    };
  });

  function closeLightbox(){lightbox.style.display="none";}
  function changeImage(dir){
    current=(current+dir+gallery.length)%gallery.length;
    lightboxImg.src=gallery[current].src;
  }

  document.addEventListener("keydown",e=>{
    if(lightbox.style.display==="flex"){
      if(e.key==="ArrowLeft") changeImage(-1);
      if(e.key==="ArrowRight") changeImage(1);
      if(e.key==="Escape") closeLightbox();
    }
  });

  let startX=0;
  lightbox.addEventListener("touchstart",e=>startX=e.touches[0].clientX);
  lightbox.addEventListener("touchend",e=>{
    let endX=e.changedTouches[0].clientX;
    if(endX-startX>50) changeImage(-1);
    else if(startX-endX>50) changeImage(1);
  });

  // Exporter fonctions globales pour HTML
  window.closeLightbox = closeLightbox;
  window.changeImage = changeImage;
}

/* ===============================
   EFFET DE REVEAL AU SCROLL
================================= */
const reveals = document.querySelectorAll('.reveal');
function revealOnScroll(){
  reveals.forEach(el=>{
    const rect=el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100){
      el.style.opacity='1';
      el.style.transform='translateY(0)';
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

/* ===============================
   ANIMATION INITIALE DES ELEMENTS
================================= */
document.querySelectorAll('.reveal').forEach(el=>{
  el.style.opacity='0';
  el.style.transform='translateY(50px)';
  el.style.transition='all 0.8s ease';
});
