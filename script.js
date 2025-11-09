// ======== Troca de seções ========
document.querySelectorAll('.menu-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const alvo = btn.getAttribute('data-section');
    document.querySelectorAll('.secao').forEach(sec => sec.classList.remove('ativa'));
    document.getElementById(alvo).classList.add('ativa');
  });
});

// ======== Mostrar resposta dela ========
const btnResp = document.getElementById("btnMostrarResposta");
const boxResp = document.getElementById("respostaBox");
if (btnResp) {
  btnResp.addEventListener("click", () => {
    boxResp.classList.toggle("visually-hidden");
  });
}

// ======== Fade-in ========
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  function check() {
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 80) el.classList.add('show');
    });
  }
  window.addEventListener('scroll', check);
  window.addEventListener('load', check);
  check();
}
initFadeIn();

// ======== Slideshow ========
let slideIndex = 0;
function showSlides() {
  const slides = document.querySelectorAll(".mySlides");
  slides.forEach(s => s.style.display = "none");
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 4000);
}
showSlides();
