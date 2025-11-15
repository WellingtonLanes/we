/* ================== SITE DATA ================== */
const SITE_DATA = {
  declaracao: {
    dataInicio: "2025-08-11T11:10:00",
    fotos: [
      "imagens/foto1.jpg","imagens/foto2.jpg","imagens/foto3.jpg",
      "imagens/foto4.jpg","imagens/foto5.jpg","imagens/foto6.jpg",
      "imagens/foto7.jpg","imagens/foto8.jpg","imagens/foto9.jpg"
    ],
    datas: [
      "11/08/2025","12/08/2025","13/08/2025",
      "14/08/2025","15/08/2025","16/08/2025",
      "17/08/2025","18/08/2025","19/08/2025"
    ],
    texto: [
      "Desde o primeiro dia em que te conheci, meu mundo ficou mais leve.",
      "Quero guardar cada momento nosso com muito carinho."
    ],
    mensagens: [
      "Cada lembrança contigo me faz sorrir 💕",
      "Tu és minha paz e alegria ✨",
      "Obrigado por existir, meu amor 💖"
    ],
    versiculos: [
      "O amor é paciente e bondoso. (1 Coríntios 13:4–7) 💞",
      "Nós amamos porque Ele nos amou primeiro. (1 João 4:19) 💗"
    ],
    respostas: [
      "Eu também te amo muito ❤️",
      "Tu me faz muito feliz, meu amor 💞"
    ]
  },

  namoro: {
    dataInicio: "2025-11-09T16:20:00",
    fotos: [
      "imagens/fotos10.jpg","imagens/fotos11.jpg","imagens/fotos12.jpg",
      "imagens/fotos13.jpg","imagens/fotos14.jpg","imagens/fotos15.jpg",
      "imagens/fotos16.jpg","imagens/fotos17.jpg","imagens/fotos18.jpg",
      "imagens/fotos19.jpg"
    ],
    datas: [
      "09/11/2025","10/11/2025","11/11/2025","12/11/2025","13/11/2025",
      "14/11/2025","15/11/2025","16/11/2025","17/11/2025","18/11/2025"
    ],
    texto: [
      "Cada dia do nosso namoro é um capítulo lindo da nossa história.",
      "Que Deus abençoe cada passo que damos juntos."
    ],
    mensagens: [
      "Nosso amor é lindo demais 💕",
      "Cada dia contigo é uma nova alegria 🌼",
      "Você é minha melhor companhia 🙏"
    ],
    versiculos: [
      "Acima de tudo, revistam-se do amor. (Colossenses 3:14) 💗",
      "O cordão de três dobras não se rompe facilmente. (Eclesiastes 4:12) 💒"
    ],
    respostas: []
  }
};

const $ = s => document.querySelector(s);

/* ================== FUNÇÃO CREATE REVEAL BOX ================== */
function createRevealBox(parent, title, items) {
  const sec = document.createElement('section');
  sec.className = 'section';

  // Texto do botão separado do título
  let btnText = "";
  if (title.includes("Mensagens")) btnText = "Mostrar Mensagens";
  else if (title.includes("Versículos")) btnText = "Mostrar Versículos";
  else if (title.includes("Resposta")) btnText = "Mostrar Resposta";
  else btnText = "Mostrar Conteúdo";

  sec.innerHTML = `
    <h2>${title}</h2>
    <div class="white-box">
      <button class="reveal-btn">${btnText}</button>
      <div class="pink-overlay"></div>
    </div>
  `;

  const overlay = sec.querySelector('.pink-overlay');
  const btn = sec.querySelector('.reveal-btn');

  let index = 0;
  btn.addEventListener('click', () => {
    overlay.style.display = 'flex';
    overlay.textContent = items.length ? items[index % items.length] : "💌";
    index++;
  });

  parent.appendChild(sec);
  return sec;
}

/* ================== BUILD UI ================== */
function buildUI(mode) {
  const data = SITE_DATA[mode];
  const main = $('#main-content');
  main.innerHTML = '';

  /* ====== SLIDESHOW ====== */
  const slide = document.createElement('div');
  slide.className = 'slideshow';
  data.fotos.forEach((src, i) => {
    const wrap = document.createElement('div');
    wrap.className = mode === 'declaracao' ? 'mySlides' : 'mySlides2';

    const pol = document.createElement('div');
    pol.className = 'polaroid rotate-' + ((i % 3) + 1);

    const ph = document.createElement('div');
    ph.className = 'photo';
    const img = document.createElement('img');
    img.src = src;
    ph.appendChild(img);

    const cap = document.createElement('div');
    cap.className = 'caption';
    cap.textContent = data.datas[i];

    pol.appendChild(ph);
    pol.appendChild(cap);
    wrap.appendChild(pol);
    slide.appendChild(wrap);
  });
  main.appendChild(slide);

  /* ====== CARTA ====== */
  const carta = document.createElement('div');
  carta.className = 'carta';
  data.texto.forEach(t => {
    const p = document.createElement('p');
    p.textContent = t;
    carta.appendChild(p);
  });
  main.appendChild(carta);

  /* ====== CONTADOR ====== */
  const cont = document.createElement('div');
  cont.className = 'contador';
  cont.innerHTML = `
    <div class="title">⏳ Nosso tempo juntos</div>
    <div class="time">
      <span id="days">0</span> dias • 
      <span id="hours">0</span>h 
      <span id="mins">0</span>m 
      <span id="secs">0</span>s
    </div>
  `;
  main.appendChild(cont);
  initCounter(new Date(data.dataInicio));

  /* ====== MENSAGENS ====== */
  createRevealBox(main, "💌 Nossas Mensagens", data.mensagens);

  /* ====== VERSÍCULOS ====== */
  createRevealBox(main, "📖 Versículos Bíblicos", data.versiculos);

  /* ====== FORMULÁRIO ====== */
  const formSec = document.createElement('section');
  formSec.className = 'section';
  formSec.innerHTML = `
    <h2>💬 Enviar uma mensagem</h2>
    <form method="POST" action="https://formspree.io/f/xovkwzej">
      <div class="form-row">
        <input type="text" name="name" placeholder="Seu nome" required>
        <input type="email" name="email" placeholder="Seu e-mail" required>
      </div>
      <textarea name="message" placeholder="Escreva sua mensagem..." required></textarea>
      <button type="submit">Enviar 💌</button>
      <div id="formStatus" class="hidden"></div>
    </form>
  `;
  main.appendChild(formSec);

  /* ====== RESPOSTA DELA (somente declaração) ====== */
  if (mode === "declaracao") {
    const respostaSec = createRevealBox(main, "💘 Resposta dela", data.respostas);

    // Botão de flor aparece abaixo da resposta dela
    const flowerBtn = document.createElement('button');
    flowerBtn.textContent = 'Clique para flor 🌼';
    flowerBtn.style.marginTop = '12px';
    flowerBtn.style.fontSize = '1.2rem';
    flowerBtn.style.padding = '10px 18px';
    flowerBtn.style.border = 'none';
    flowerBtn.style.borderRadius = '12px';
    flowerBtn.style.background = '#ffd1e1';
    flowerBtn.style.cursor = 'pointer';
    flowerBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
    flowerBtn.addEventListener('click', createFlower);
    respostaSec.querySelector('.white-box').appendChild(flowerBtn);
  }

  initSlides(mode);
}

/* ====== SLIDES ====== */
function initSlides(mode) {
  const selector = mode === 'declaracao' ? '.mySlides' : '.mySlides2';
  const slides = document.querySelectorAll(selector);
  if (!slides.length) return;
  slides.forEach(s => s.style.display = 'none');
  let i = 0;

  function show() {
    slides.forEach(s => s.style.display = 'none');
    slides[i].style.display = 'block';
    i = (i + 1) % slides.length;
    setTimeout(show, 4000);
  }
  show();
}

/* ====== CONTADOR ====== */
function initCounter(start) {
  const daysSpan = $("#days");
  const hoursSpan = $("#hours");
  const minsSpan = $("#mins");
  const secsSpan = $("#secs");

  const update = () => {
    const diff = Date.now() - start.getTime();
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);

    daysSpan.textContent = d;
    hoursSpan.textContent = h;
    minsSpan.textContent = m;
    secsSpan.textContent = s;
  };

  update(); // atualiza na hora do carregamento
  setInterval(update, 1000);
}

/* ====== MENU ====== */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;
      document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildUI(btn.dataset.mode);
    });
  });

  buildUI("declaracao");
});

/* ====== CORAÇÕES ====== */
setInterval(() => {
  const c = document.createElement('div');
  c.className = 'heart';
  c.textContent = '💗';
  c.style.fontSize = (12 + Math.random()*22) + 'px';
  c.style.left = Math.random()*95 + 'vw';
  c.style.top = '100vh';
  document.querySelector('#coracoes').appendChild(c);
  setTimeout(() => c.remove(), 6000);
}, 500);

/* ====== BOTÃO DE FLOR CENTRALIZADO ====== */
function createFlowerButton(parent) {
  const flowerBtn = document.createElement('button');
  flowerBtn.textContent = 'Clique aqui 🌼';
  flowerBtn.style.display = 'block';
  flowerBtn.style.margin = '20px auto'; // centraliza
  flowerBtn.style.fontSize = '1.2rem';
  flowerBtn.style.padding = '10px 18px';
  flowerBtn.style.border = 'none';
  flowerBtn.style.borderRadius = '12px';
  flowerBtn.style.background = '#ffd1e1';
  flowerBtn.style.cursor = 'pointer';
  flowerBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';

  flowerBtn.addEventListener('click', createFlower);

  parent.appendChild(flowerBtn);
}

/* ====== FUNÇÃO CRIAR FLOR ====== */
function createFlower() {
  const flower = document.createElement('div');
  flower.textContent = '🌼'; // flor branca
  flower.style.position = 'fixed';
  flower.style.fontSize = '80px';
  flower.style.left = Math.random() * 70 + 'vw';
  flower.style.top = Math.random() * 60 + 'vh';
  flower.style.zIndex = 9999;
  flower.style.pointerEvents = 'none';
  document.body.appendChild(flower);
  setTimeout(() => flower.remove(), 3000);
}

