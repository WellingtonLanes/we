// ===== CORAÇÕES =====
setInterval(() => {
  const heart = document.createElement('div');
  heart.textContent = '💗';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (Math.random() * 20 + 14) + 'px';
  heart.style.position = 'fixed';
  heart.style.top = '-20px';
  heart.style.animation = `fall ${5 + Math.random() * 5}s linear`;
  document.getElementById('coracoes').appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}, 300);

// ===== SLIDES =====
function iniciarSlide(bloco) {
  let idx = 0;
  const slides = bloco.querySelectorAll(".mySlides");
  function mostrar() {
    slides.forEach(s => s.style.display = "none");
    idx = (idx + 1) % slides.length;
    slides[idx].style.display = "block";
  }
  mostrar();
  setInterval(mostrar, 4000);
}

// ===== TROCA DE BLOCOS =====
const botoes = document.querySelectorAll(".menu-btn[data-bloco]");
const blocos = document.querySelectorAll(".bloco");
botoes.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return;
    botoes.forEach(b => b.classList.remove("ativo"));
    blocos.forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");
    document.getElementById(btn.dataset.bloco).classList.add("ativo");
  });
});

// ===== CONTADOR DECLARAÇÃO =====
const dataInicio = new Date("August 11, 2025 11:10:00").getTime();
setInterval(() => atualizarContador("dias", "horas", "minutos", "segundos", dataInicio), 1000);

// ===== CONTADOR NAMORO =====
const dataNamoro = new Date("November 9, 2025 16:20:00").getTime();
setInterval(() => atualizarContador("diasNamoro", "horasNamoro", "minutosNamoro", "segundosNamoro", dataNamoro), 1000);

function atualizarContador(diasId, horasId, minutosId, segundosId, inicio) {
  const agora = new Date().getTime();
  const diff = agora - inicio;
  if (diff < 0) return;
  document.getElementById(diasId).textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById(horasId).textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
  document.getElementById(minutosId).textContent = Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById(segundosId).textContent = Math.floor((diff / 1000) % 60);
}

// ===== VERSÍCULOS =====
const versos = [
  "O amor é paciente, o amor é bondoso. (1 Coríntios 13:4)",
  "Nós amamos porque Ele nos amou primeiro. (1 João 4:19)",
  "Acima de tudo, revistam-se do amor. (Colossenses 3:14)"
];
let idxVerso = 0;
document.getElementById("btnVersiculo").addEventListener("click", () => {
  const box = document.getElementById("versiculoBox");
  box.classList.remove("oculto");
  box.textContent = versos[idxVerso];
  idxVerso = (idxVerso + 1) % versos.length;
});

// ===== CARTA =====
const msgs = [
  "Qualquer coisa contigo é especial 💖",
  "Adoro conversar e rir contigo 💕",
  "Tu me faz muito bem ❤️"
];
let idxMsg = 0;
document.getElementById("btnCarta").addEventListener("click", () => {
  const box = document.getElementById("cartaTexto");
  box.classList.remove("oculto");
  box.textContent = msgs[idxMsg];
  idxMsg = (idxMsg + 1) % msgs.length;
});

// ===== FORM =====
document.getElementById("formMensagem").addEventListener("submit", async (e) => {
  e.preventDefault();
  const status = document.getElementById("formStatus");
  status.textContent = "Enviando...";
  const data = new FormData(e.target);
  try {
    const res = await fetch(e.target.action, { method: "POST", body: data });
    if (res.ok) {
      status.textContent = "Mensagem enviada 💌";
      e.target.reset();
    } else status.textContent = "Erro ao enviar 😢";
  } catch {
    status.textContent = "Erro de conexão 😢";
  }
  setTimeout(() => status.textContent = "", 4000);
});

// ===== BOTÃO REVELAR RESPOSTA =====
document.getElementById("btnResposta").addEventListener("click", () => {
  const box = document.getElementById("respostaTexto");
  box.classList.toggle("oculto");
  box.textContent = "Resposta dela revelada 💕 (coloque o conteúdo real aqui depois)";
});

// ===== INICIALIZAÇÃO =====
document.querySelectorAll(".bloco").forEach(b => iniciarSlide(b));
