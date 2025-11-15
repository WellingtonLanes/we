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

/* ================== SELECTOR ================== */
const $ = s => document.querySelector(s);

/* ================== HELPERS: coracoes container ================== */
function ensureHeartsContainer() {
  let c = document.querySelector('#coracoes');
  if (!c) {
    c = document.createElement('div');
    c.id = 'coracoes';
    document.body.appendChild(c);
  }
  // ensure it's behind content (z-index controlled in CSS)
  c.style.position = 'fixed';
  c.style.inset = '0';
  c.style.pointerEvents = 'none';
  c.style.zIndex = '1';
  return c;
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
    img.alt = `Foto ${i+1}`;
    ph.appendChild(img);

    const cap = document.createElement('div');
    cap.className = 'caption';
    cap.textContent = data.datas[i] || '';

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
  createRevealBox(main, "💌 Nossas Mensagens", data.mensagens, "Mostrar Mensagens");

  /* ====== VERSÍCULOS ====== */
  createRevealBox(main, "📖 Versículos Bíblicos", data.versiculos, "Mostrar Versículos");

  /* ====== FORMULÁRIO ====== */
  const formSec = document.createElement('section');
  formSec.className = 'section';
  formSec.innerHTML = `
    <h2>💬 Enviar uma mensagem</h2>
    <div class="white-box">
      <form method="POST" action="https://formspree.io/f/xovkwzej">
        <div class="form-row">
          <input type="text" name="name" placeholder="Seu nome" required>
          <input type="email" name="email" placeholder="Seu e-mail" required>
        </div>
        <textarea name="message" placeholder="Escreva sua mensagem..." required></textarea>
        <button type="submit">Enviar 💌</button>
        <div id="formStatus" class="hidden"></div>
      </form>
    </div>
  `;
  main.appendChild(formSec);

  /* ====== RESPOSTA DELA (somente declaração) ====== */
  if (mode === "declaracao") {
    createRevealBox(main, "💘 Resposta dela", data.respostas, "Mostrar Resposta");
  }

  /* ====== BOTÃO DE FLOR ABAIXO DA RESPOSTA / FORMULÁRIO ======
     Create a flower button that is part of the main flow (not fixed).
     It will appear in both modes (added at end of main) and is centered.
  */
  const flowerBtnSec = document.createElement('section');
  flowerBtnSec.className = 'section';
  const inner = document.createElement('div');
  inner.className = 'white-box';
  inner.style.textAlign = 'center';
  inner.innerHTML = `<button class="flower-button">🌼 Revelar flor</button>`;
  flowerBtnSec.appendChild(inner);
  main.appendChild(flowerBtnSec);

  // attach event to the button
  const btn = flowerBtnSec.querySelector('.flower-button');
  btn.addEventListener('click', createFlower);

  initSlides(mode);
}

/* ====== BOX DE REVELAÇÃO ====== */
function createRevealBox(parent, title, items, btnText) {
  const sec = document.createElement('section');
  sec.className = 'section';

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
  const contadorSec = document.querySelector('.contador');
  if (!contadorSec) return;

  // ensure structure exists
  if (!contadorSec.querySelector('.time')) {
    contadorSec.innerHTML = `
      <div class="title">⏳ Nosso tempo juntos</div>
      <div class="time">
        <span id="days">0</span> dias • 
        <span id="hours">0</span>h 
        <span id="mins">0</span>m 
        <span id="secs">0</span>s
      </div>
    `;
  }

  const daysEl = contadorSec.querySelector('#days');
  const hoursEl = contadorSec.querySelector('#hours');
  const minsEl = contadorSec.querySelector('#mins');
  const secsEl = contadorSec.querySelector('#secs');

  function update() {
    const diff = Date.now() - start.getTime();
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);
    daysEl.textContent = d;
    hoursEl.textContent = h;
    minsEl.textContent = m;
    secsEl.textContent = s;
  }

  update();
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

  // ensure hearts container exists and behind content
  ensureHeartsContainer();

  buildUI("declaracao");
});

/* ====== CORAÇÕES ====== */
/*
  Hearts now append to #coracoes container (behind content).
  They spawn near the sides and fall behind the main content.
*/
(function startHearts() {
  const container = ensureHeartsContainer();

  function spawnHeart() {
    const h = document.createElement('div');
    h.className = 'heart';
    h.textContent = '💗';
    const size = 12 + Math.random() * 28;
    h.style.fontSize = size + 'px';
    // spawn near sides: left 5-18% or right 82-95%
    const side = Math.random() < 0.5 ? 'left' : 'right';
    if (side === 'left') {
      h.style.left = (5 + Math.random() * 13) + 'vw';
    } else {
      h.style.left = (82 + Math.random() * 13) + 'vw';
    }
    h.style.top = '-30px';
    h.style.opacity = 0.9;
    h.style.position = 'absolute';
    h.style.zIndex = 1; // behind content (content z-index:2)
    container.appendChild(h);

    // animate via CSS-like JS: translate down and fade
    const duration = 4500 + Math.random() * 2500; // 4.5s - 7s
    const start = performance.now();
    function frame(now) {
      const t = (now - start) / duration;
      if (t >= 1) {
        h.remove();
        return;
      }
      // move from -30px to viewport height + 50
      const y = -30 + t * (window.innerHeight + 80);
      h.style.transform = `translateY(${y}px) rotate(${t * 360}deg)`;
      h.style.opacity = String(0.9 * (1 - t));
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  setInterval(spawnHeart, 420);
})();

/* ====== FUNÇÃO CRIAR FLOR ====== */
/* creates a big white flower in the center for 3s */
function createFlower() {
  const f = document.createElement('div');
  f.className = 'temp-flower';
  f.textContent = '🌼';
  document.body.appendChild(f);
  // remove after 3s with fade
  setTimeout(() => {
    f.style.transition = 'opacity .4s ease, transform .4s ease';
    f.style.opacity = '0';
    f.style.transform = 'translate(-50%,-50%) scale(1.15)';
    setTimeout(() => f.remove(), 420);
  }, 3000);
}
