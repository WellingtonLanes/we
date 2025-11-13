// Troca de seções
const botoes = document.querySelectorAll(".menu-btn");
const secoes = document.querySelectorAll(".conteudo");

botoes.forEach(btn => {
  btn.addEventListener("click", () => {
    botoes.forEach(b => b.classList.remove("ativo"));
    secoes.forEach(sec => sec.classList.remove("ativo"));
    btn.classList.add("ativo");
    document.getElementById(btn.dataset.section).classList.add("ativo");
  });
});

// Slide de polaroids automático
let slideIndex = 0;
const polaroids = document.querySelectorAll(".polaroid");
function mostrarSlide() {
  polaroids.forEach(p => p.style.display = "none");
  slideIndex = (slideIndex + 1) % polaroids.length;
  polaroids[slideIndex].style.display = "block";
}
if (polaroids.length > 0) {
  mostrarSlide();
  setInterval(mostrarSlide, 5000);
}

// Contador de tempo juntos
const inicio = new Date("2023-03-10"); // <-- tua data aqui
function atualizarTempo() {
  const agora = new Date();
  const diff = agora - inicio;
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const anos = Math.floor(dias / 365);
  const meses = Math.floor((dias % 365) / 30);
  const diasRestantes = dias - (anos * 365 + meses * 30);
  document.getElementById("tempoJuntos").textContent =
    `${anos} anos, ${meses} meses e ${diasRestantes} dias juntos 💕`;
}
atualizarTempo();

// Versículo do dia
const versiculos = [
  "1 Coríntios 13:4-7 — O amor é paciente, o amor é bondoso...",
  "Eclesiastes 4:9 — É melhor ter companhia do que estar sozinho.",
  "Cantares 8:7 — As muitas águas não poderiam apagar o amor.",
  "Provérbios 3:3 — Que o amor e a fidelidade nunca te abandonem.",
  "Colossenses 3:14 — Acima de tudo, revistam-se do amor, que é o elo perfeito."
];
document.getElementById("versiculo").textContent =
  versiculos[Math.floor(Math.random() * versiculos.length)];

// Mensagens
const form = document.getElementById("mensagemForm");
const container = document.getElementById("mensagens-container");

form.addEventListener("submit", e => {
  e.preventDefault();
  const msg = document.getElementById("novaMensagem").value;
  const p = document.createElement("p");
  p.textContent = `💌 ${msg}`;
  container.appendChild(p);
  form.reset();
});
