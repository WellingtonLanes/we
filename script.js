/* ================== Helpers ================== */
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

let slideTimer = null;
let counterInterval = null;
let heartsInterval = null;

let currentMode = "declaracao";

/* ================== Dados do site ================== */
const data = {
  declaracao: {
    startDate: new Date("2024-10-02"),
    polaroids: [
      "imagens/foto1.jpg","imagens/foto2.jpg","imagens/foto3.jpg",
      "imagens/foto4.jpg","imagens/foto5.jpg","imagens/foto6.jpg",
      "imagens/foto7.jpg","imagens/foto8.jpg","imagens/foto9.jpg",
      "imagens/foto10.jpg","imagens/foto11.jpg","imagens/foto12.jpg",
      "imagens/foto13.jpg","imagens/foto14.jpg","imagens/foto15.jpg",
      "imagens/foto16.jpg","imagens/foto17.jpg","imagens/foto18.jpg",
      "imagens/foto19.jpg"
    ],
    textoPrincipal: 
      "Eu sou muito grato por você…\n\n" +
      "Cada dia contigo é uma alegria que Deus colocou no meu caminho. 💕\n" +
      "Eu quero que você se sinta amada todos os dias.\n\n" +
      "Obrigada por ser você.",
    mensagens: [
      "Você é a resposta mais bonita que Deus já mandou pra minha vida ❤️",
      "Eu oro por você todos os dias 🙏✨",
      "Você transforma tudo ao meu redor"
    ],
    versiculos: [
      "“O amor é paciente, o amor é bondoso…” – 1 Coríntios 13:4-7",
      "“Deus é amor.” – 1 João 4:8",
      "“A bênção do Senhor traz riqueza…” – Provérbios 10:22"
    ],
    respostaDela: "Eu também te amo muito! ❤️ Obrigada por tudo que você faz por mim."
  },

  namoro: {
    startDate: new Date("2024-10-15"),
    polaroids: [
      "imagens/foto1.jpg","imagens/foto2.jpg","imagens/foto3.jpg"
    ],
    textoPrincipal:
      "Cada novo capítulo nosso é ainda mais lindo. 💕\n\n" +
      "Nosso namoro é um presente que eu valorizo todos os dias.",
    mensagens: [
      "Você é meu abraço favorito 🤍",
      "Que Deus continue abençoando nossa história 🙏✨"
    ],
    versiculos: [
      "“Tudo posso naquele que me fortalece.” – Filipenses 4:13"
    ],
    respostaDela: "" // não mostra no namoro
  }
};

/* ================== CONSTRUTOR PRINCIPAL ================== */
function buildUI(mode) {
  const main = $("#main-content");
  main.innerHTML = ""; 

  const d = data[mode];

  /* ===== Polaroids ===== */
  const slide = document.createElement("div");
  slide.className = "slideshow-container";

  d.polaroids.forEach(src => {
    const s = document.createElement("div");
    s.className = mode === "declaracao" ? "mySlides" : "mySlides2";

    const pol = document.createElement("div");
    pol.className = "polaroid";

    const img = document.createElement("img");
    img.src = src;
    img.style.width = "100%";

    pol.appendChild(img);
    s.appendChild(pol);
    slide.appendChild(s);
  });

  main.appendChild(slide);
  initSlides(mode);

  /* ===== Texto ===== */
  const textBox = document.createElement("div");
  textBox.className = "text-content";
  textBox.textContent = d.textoPrincipal;
  main.appendChild(textBox);

  /* ===== Contador ===== */
  const secCont = document.createElement("section");
  secCont.className = "section";

  const titleCont = document.createElement("h2");
  titleCont.textContent = "Tempo que nos Conhecemos ⏳";

  const boxCont = document.createElement("div");
  boxCont.className = "counter-box";

  boxCont.innerHTML = `
    <div class="counter-flex">
      <div class="counter-item"><span id="days">0</span>Dias</div>
      <div class="counter-item"><span id="hours">0</span>Horas</div>
      <div class="counter-item"><span id="mins">0</span>Min</div>
      <div class="counter-item"><span id="secs">0</span>Seg</div>
    </div>
  `;

  secCont.appendChild(titleCont);
  secCont.appendChild(boxCont);
  main.appendChild(secCont);
  initCounter(d.startDate);

  /* ===== Nossas Mensagens ===== */
  buildWhiteBox("Nossas Mensagens 💌", d.mensagens, main);

  /* ===== Versículos ===== */
  buildWhiteBox("Versículos Bíblicos 📖", d.versiculos, main);

  /* ===== Formulário ===== */
  const formSec = document.createElement("section");
  formSec.className = "section";

  const formTitle = document.createElement("h2");
  formTitle.textContent = "Enviar uma mensagem 💬";

  const formBox = document.createElement("div");
  formBox.className = "white-box";

  formBox.innerHTML = `
    <form id="msgForm" action="https://formspree.io/f/xjkbzkjo" method="POST">
      <label>Seu nome:</label>
      <input type="text" name="nome" required>

      <label>Sua mensagem:</label>
      <textarea name="mensagem" rows="4" required></textarea>

      <button type="submit">Enviar ❤️</button>
      <p id="formStatus"></p>
    </form>
  `;

  formSec.appendChild(formTitle);
  formSec.appendChild(formBox);
  main.appendChild(formSec);
  initForm();

  /* ===== Resposta dela (somente declaração) ===== */
  if (d.respostaDela.trim() !== "") {
    buildWhiteBox("Resposta dela 💘", [d.respostaDela], main);
  }

  initHearts();
}

/* ================== White Box (Reveal) ================== */
function buildWhiteBox(titulo, lista, parent) {
  const sec = document.createElement("section");
  sec.className = "section";

  const h = document.createElement("h2");
  h.textContent = titulo;

  const box = document.createElement("div");
  box.className = "white-box";

  const overlay = document.createElement("div");
  overlay.className = "pink-overlay";

  const btns = document.createElement("div");
  btns.className = "btn-container";

  lista.forEach((txt, i) => {
    const b = document.createElement("button");
    b.className = "reveal-btn";
    b.textContent = `Mostrar ${i + 1}`;
    b.onclick = () => {
      overlay.textContent = txt;
      overlay.classList.add("show");
    };
    btns.appendChild(b);
  });

  overlay.onclick = () => overlay.classList.remove("show");

  box.appendChild(btns);
  box.appendChild(overlay);
  sec.appendChild(h);
  sec.appendChild(box);
  parent.appendChild(sec);
}

/* ================== Formulário ================== */
function initForm() {
  const form = $("#msgForm");
  if (!form) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const status = $("#formStatus");
    status.textContent = "Enviando…";

    const fd = new FormData(form);

    try {
      await fetch(form.action, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" }
      });

      status.textContent = "Mensagem enviada com sucesso! ❤️";
      form.reset();
    } catch {
      status.textContent = "Erro ao enviar 😢";
    }
  });
}

/* ================== Slides ================== */
function initSlides(mode) {
  const slides = mode === "declaracao" ? $$(".mySlides") : $$(".mySlides2");
  let idx = 0;

  slides.forEach(s => s.style.display = "none");

  function show() {
    slides.forEach(s => s.style.display = "none");
    slides[idx].style.display = "flex";
    idx = (idx + 1) % slides.length;
  }

  show();

  clearInterval(slideTimer);
  slideTimer = setInterval(show, 5000);
}

/* ================== Counter ================== */
function initCounter(date) {
  if (counterInterval) clearInterval(counterInterval);

  function update() {
    const diff = Math.floor((new Date() - date) / 1000);
    const d = Math.floor(diff / 86400);
    const h = Math.floor((diff % 86400) / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;

    $("#days").textContent = d;
    $("#hours").textContent = h;
    $("#mins").textContent = m;
    $("#secs").textContent = s;
  }

  update();
  counterInterval = setInterval(update, 1000);
}

/* ================== Corações ================== */
function initHearts() {
  if (heartsInterval) clearInterval(heartsInterval);

  const c = $("#coracoes");

  heartsInterval = setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = "❤️";
    h.style.left = Math.random() * window.innerWidth + "px";
    h.style.fontSize = (14 + Math.random() * 20) + "px";
    h.style.animationDuration = (4 + Math.random() * 3) + "s";
    c.appendChild(h);
    setTimeout(() => h.remove(), 6000);
  }, 350);
}

/* ================== Menu ================== */
$$(".menu-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("disabled")) return;
    $$(".menu-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode;
    buildUI(currentMode);
  });
});

/* ================== INIT ================== */
document.addEventListener("DOMContentLoaded", () => buildUI(currentMode));
