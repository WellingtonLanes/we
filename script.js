const secoes = {
  declaracao: {
    inicio: "2023-03-01",
    versiculo: "“Eu te amei com amor eterno...” – Jeremias 31:3 💕",
    resposta: "“Sim! Eu aceito seu amor, pra sempre 💖”",
    imagens: ["imagens/foto1.jpg", "imagens/foto2.jpg", "imagens/foto3.jpg"]
  },
  namoro: {
    inicio: "2023-05-15",
    versiculo: "“O amor é paciente, o amor é bondoso...” – 1 Coríntios 13:4 💗",
    resposta: "“Eu te amo cada dia mais 💕”",
    imagens: ["imagens/namoro1.jpg", "imagens/namoro2.jpg", "imagens/namoro3.jpg"]
  },
  noivado: {
    inicio: "2024-10-20",
    versiculo: "“Melhor é serem dois do que um...” – Eclesiastes 4:9 💍",
    resposta: "“Sim, e logo será pra sempre 💖”",
    imagens: ["imagens/noivado1.jpg", "imagens/noivado2.jpg", "imagens/noivado3.jpg"]
  },
  casamento: {
    inicio: "2025-09-12",
    versiculo: "“E serão ambos uma só carne...” – Gênesis 2:24 💒",
    resposta: "“Agora somos um só coração 💞”",
    imagens: ["imagens/casamento1.jpg", "imagens/casamento2.jpg", "imagens/casamento3.jpg"]
  }
};

// --- Configuração inicial ---
let secaoAtual = "declaracao";
let slideIndex = 0;
let slideInterval;

const contadorEl = document.getElementById("contador");
const versiculoEl = document.getElementById("versiculo");
const respostaEl = document.getElementById("resposta");
const slider = document.getElementById("slider");

// Atualiza o conteúdo da página
function atualizarSecao(secao) {
  secaoAtual = secao;
  document.querySelectorAll(".menu-btn").forEach(btn => btn.classList.remove("ativo"));
  document.querySelector(`[data-secao="${secao}"]`).classList.add("ativo");

  const data = secoes[secao];

  // Contador
  const inicio = new Date(data.inicio);
  const hoje = new Date();
  const dias = Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24));
  contadorEl.textContent = `${dias} dias`;

  // Versículo
  versiculoEl.textContent = data.versiculo;

  // Resposta
  respostaEl.textContent = `Resposta dela: ${data.resposta}`;
  respostaEl.classList.add("oculto");

  // Atualiza as imagens
  slider.innerHTML = "";
  data.imagens.forEach(src => {
    const div = document.createElement("div");
    div.className = "polaroid";
    const img = document.createElement("img");
    img.src = src;
    div.appendChild(img);
    slider.appendChild(div);
  });

  // Reinicia o slide
  slideIndex = 0;
  clearInterval(slideInterval);
  mostrarSlide();
  slideInterval = setInterval(proximoSlide, 5000);
}

function mostrarSlide() {
  const slides = document.querySelectorAll(".slider .polaroid");
  slides.forEach((slide, i) => slide.style.display = (i === slideIndex) ? "block" : "none");
}

function proximoSlide() {
  const slides = document.querySelectorAll(".slider .polaroid");
  slideIndex = (slideIndex + 1) % slides.length;
  mostrarSlide();
}

// --- Formulário ---
const form = document.getElementById("mensagemForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  respostaEl.classList.remove("oculto");
  form.style.display = "none";
});

// --- Botões de navegação ---
document.querySelectorAll(".menu-btn").forEach(btn => {
  btn.addEventListener("click", () => atualizarSecao(btn.dataset.secao));
});

// --- Inicia a página ---
atualizarSecao("declaracao");
