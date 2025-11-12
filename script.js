// ===== CORAÇÕES CAINDO =====
function criarCoracoes() {
  const container = document.getElementById("coracoes");
  for (let i = 0; i < 20; i++) {
    const coracao = document.createElement("div");
    coracao.classList.add("coracao");
    coracao.innerHTML = "❤";
    coracao.style.left = Math.random() * 100 + "vw";
    coracao.style.animationDuration = 4 + Math.random() * 3 + "s";
    container.appendChild(coracao);
  }
}
criarCoracoes();

// ===== TROCA DE SEÇÕES =====
const botoes = document.querySelectorAll(".menu-btn");
const secoes = document.querySelectorAll(".secao");

botoes.forEach(botao => {
  botao.addEventListener("click", () => {
    botoes.forEach(b => b.classList.remove("ativo"));
    botao.classList.add("ativo");

    const alvo = botao.getAttribute("data-alvo");
    secoes.forEach(secao => {
      secao.classList.remove("ativa", "fade-in");
      if (secao.id === alvo) {
        secao.classList.add("ativa", "fade-in");
      }
    });
  });
});

// ===== CONTADORES =====
function atualizarContador(id, dataInicio) {
  const contador = document.getElementById(id);
  const inicio = new Date(dataInicio);
  setInterval(() => {
    const agora = new Date();
    const diff = agora - inicio;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    contador.innerHTML = `
      <h2>Juntos há ${dias} dias, ${horas}h ${minutos}m ${segundos}s 💕</h2>
    `;
  }, 1000);
}

// Data que se conheceram: 11/08/2025 às 11:10
atualizarContador("contador-conhecemos", "2025-08-11T11:10:00");
// Data de namoro: 09/11/2025 às 16:20
atualizarContador("contador-namoro", "2025-11-09T16:20:00");

// ===== BOTÕES DE CARREGAMENTO (MARGARIDA) =====
function botaoCarregando(botao) {
  const textoOriginal = botao.textContent;
  botao.disabled = true;
  botao.innerHTML = `🌼 Carregando...`;
  botao.classList.add("carregando");

  setTimeout(() => {
    botao.innerHTML = textoOriginal;
    botao.disabled = false;
  }, 5000);
}

document.querySelectorAll(".carregar-btn").forEach(botao => {
  botao.addEventListener("click", () => botaoCarregando(botao));
});

// ===== FORMULÁRIOS =====
document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Mensagem enviada com amor 💌");
    form.reset();
  });
});
