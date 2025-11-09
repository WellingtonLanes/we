/* ===== TROCA DE SEÇÕES (MENU) ===== */
document.addEventListener("DOMContentLoaded", () => {
  const botoes = document.querySelectorAll(".menu button[data-section]");
  const secoes = document.querySelectorAll(".secao");

  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      const alvo = btn.dataset.section;

      // Atualiza botões
      botoes.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Mostra a seção correspondente
      secoes.forEach(s => s.classList.remove("ativa"));
      document.getElementById(alvo).classList.add("ativa");

      // Reinicia slides da seção certa
      if (alvo === "inicio") showSlides();
      if (alvo === "pedido") showSlides2();
    });
  });

  // Botões desativados
  document.querySelectorAll(".menu button.disabled").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!document.querySelector(".em-breve")) {
        const aviso = document.createElement("div");
        aviso.textContent = "✨ Em breve...";
        aviso.classList.add("em-breve");
        btn.insertAdjacentElement("afterend", aviso);
        setTimeout(() => aviso.remove(), 2000);
      }
    });
  });
});

/* ===== NOVO SLIDESHOW (PEDIDO DE NAMORO) ===== */
let slideIndex2 = 0;
function showSlides2() {
  const slides = document.querySelectorAll(".mySlides2");
  if (slides.length === 0) return;
  slides.forEach(s => s.style.display = "none");
  slideIndex2++;
  if (slideIndex2 > slides.length) { slideIndex2 = 1; }
  slides[slideIndex2 - 1].style.display = "block";
  setTimeout(showSlides2, 4000);
}
