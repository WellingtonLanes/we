/* ================== SITE DATA (JSON inside JS) ==================
   Edite fotos, datas, textos, mensagens e versículos aqui.
*/
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

/* ================== Helpers ================== */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

let currentMode = 'declaracao';
let slideTimer = null;
let heartsInterval = null;
let counterInterval = null;

/* ================== Build UI from JSON ================== */
function buildUI(mode) {
  const data = SITE_DATA[mode];
  const main = $('#main-content');
  main.innerHTML = '';

  /* --- SLIDESHOW (polaroids) --- */
  const slideshow = document.createElement('div');
  slideshow.className = 'slideshow';

  data.fotos.forEach((src, i) => {
    const slideWrapper = document.createElement('div');
    slideWrapper.className = mode === 'declaracao' ? 'mySlides' : 'mySlides2';

    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    // slight rotation for natural look
    const r = i % 3;
    if (r === 0) polaroid.classList.add('rotate-1');
    if (r === 1) polaroid.classList.add('rotate-2');
    if (r === 2) polaroid.classList.add('rotate-3');

    const photo = document.createElement('div'); photo.className = 'photo';
    const img = document.createElement('img'); img.src = src; img.alt = `Foto ${i+1}`;
    photo.appendChild(img);

    const caption = document.createElement('div'); caption.className = 'caption';
    caption.textContent = (data.datas && data.datas[i]) ? data.datas[i] : '';

    polaroid.appendChild(photo);
    polaroid.appendChild(caption);
    slideWrapper.appendChild(polaroid);
    slideshow.appendChild(slideWrapper);
  });

  main.appendChild(slideshow);

  /* --- CARTA (folha de caderno) --- */
  const carta = document.createElement('div'); carta.className = 'carta';
  data.texto.forEach(p => {
    const pEl = document.createElement('p'); pEl.textContent = p; carta.appendChild(pEl);
  });
  main.appendChild(carta);

  /* --- CONTADOR --- */
  const cont = document.createElement('div'); cont.className = 'card-like contador';
  const title = document.createElement('div'); title.className = 'title'; title.textContent = '⏳ Nossos tempo juntos';
  const time = document.createElement('div'); time.className = 'time';
  time.innerHTML = `<span id="days">0</span> dias • <span id="hours">0</span>h <span id="mins">0</span>m <span id="secs">0</span>s`;
  cont.appendChild(title); cont.appendChild(time);
  main.appendChild(cont);

  /* --- MENSAGENS (white box always visible) --- */
  const msgSection = document.createElement('div'); msgSection.className = 'section';
  const msgTitle = document.createElement('h2'); msgTitle.textContent = '💌 Nossas Mensagens';
  const whiteBoxMsg = document.createElement('div'); whiteBoxMsg.className = 'white-box'; whiteBoxMsg.id = 'whiteMsg';
  // The white box always visible (placeholder)
  whiteBoxMsg.innerHTML = `<div style="font-size:0.95rem;color:#8a5a66;">&nbsp;</div>`; // empty placeholder
  // create pink overlay inside white box (hidden)
  const overlayMsg = document.createElement('div'); overlayMsg.className = 'pink-overlay'; overlayMsg.id = 'overlayMsg';
  overlayMsg.style.display = 'none';
  whiteBoxMsg.appendChild(overlayMsg);

  const msgBtn = document.createElement('button'); msgBtn.className = 'reveal-btn'; msgBtn.id = 'btnMsg'; msgBtn.textContent = '💌 Mostrar mensagem';
  msgSection.appendChild(msgTitle); msgSection.appendChild(whiteBoxMsg); msgSection.appendChild(msgBtn);
  main.appendChild(msgSection);

  /* --- VERSÍCULOS (white box always visible) --- */
  const vSection = document.createElement('div'); vSection.className = 'section';
  const vTitle = document.createElement('h2'); vTitle.textContent = '📖 Versículos Bíblicos';
  const whiteBoxV = document.createElement('div'); whiteBoxV.className = 'white-box'; whiteBoxV.id = 'whiteV';
  whiteBoxV.innerHTML = `<div style="font-size:0.95rem;color:#8a5a66;">&nbsp;</div>`;
  const overlayV = document.createElement('div'); overlayV.className = 'pink-overlay'; overlayV.id = 'overlayV';
  overlayV.style.display = 'none';
  whiteBoxV.appendChild(overlayV);

  const vBtn = document.createElement('button'); vBtn.className = 'reveal-btn'; vBtn.id = 'btnVers'; vBtn.textContent = '📖 Mostrar versículo';
  vSection.appendChild(vTitle); vSection.appendChild(whiteBoxV); vSection.appendChild(vBtn);
  main.appendChild(vSection);

  /* --- FORMULÁRIO (centralizado) --- */
  const formSec = document.createElement('section'); formSec.className = 'section';
  const formTitle = document.createElement('h2'); formTitle.textContent = '💬 Enviar uma mensagem';
  const form = document.createElement('form'); form.id = 'msgForm'; form.method = 'POST'; form.action = 'https://formspree.io/f/xovkwzej';
  form.innerHTML = `
    <div class="form-row">
      <input type="text" name="name" placeholder="Seu nome" required />
      <input type="email" name="email" placeholder="Seu e-mail" required />
    </div>
    <textarea name="message" placeholder="Escreva sua mensagem..." required></textarea>
    <button type="submit">Enviar 💌</button>
    <div id="formStatus" class="box hidden" aria-live="polite"></div>
  `;
  formSec.appendChild(formTitle); formSec.appendChild(form);
  main.appendChild(formSec);

  /* --- BOTÃO REVELAR RESPOSTA DELA (somente DECLARAÇÃO) --- */
  if (mode === 'declaracao') {
    const respSec = document.createElement('div'); respSec.className = 'section resposta';
    const respBtn = document.createElement('button'); respBtn.className = 'reveal-btn'; respBtn.id = 'btnResp'; respBtn.textContent = '💘 Revelar mensagem dela';
    const whiteResp = document.createElement('div'); whiteResp.className = 'white-box'; whiteResp.id = 'whiteResp';
    whiteResp.innerHTML = `<div style="font-size:0.95rem;color:#8a5a66;">&nbsp;</div>`;
    const overlayResp = document.createElement('div'); overlayResp.className = 'pink-overlay'; overlayResp.id = 'overlayResp';
    overlayResp.style.display = 'none';
    whiteResp.appendChild(overlayResp);
    respSec.appendChild(whiteResp); respSec.appendChild(respBtn);
    main.appendChild(respSec);
  }

  /* initialize interactions and functional parts */
  initSlides(mode);
  initCounter(new Date(data.dataInicio));
  initInteractions(mode, data);

  // form submit handler
  const frm = $('#main-content form');
  if (frm) {
    frm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const st = $('#formStatus');
      st.classList.remove('hidden'); st.style.display = 'block';
      st.textContent = 'Enviando...';
      const fd = new FormData(frm);
      try {
        const res = await fetch(frm.action, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } });
        if (res.ok) { st.textContent = 'Mensagem enviada 💌'; frm.reset(); }
        else { st.textContent = 'Erro ao enviar — tente novamente'; }
      } catch (err) {
        st.textContent = 'Erro de conexão.';
      }
      setTimeout(()=> { st.textContent=''; st.classList.add('hidden'); st.style.display='none'; }, 3500);
    });
  }
}

/* ================== Slides (4s each) ================== */
function initSlides(mode) {
  if (slideTimer) { clearTimeout(slideTimer); slideTimer = null; }
  const selector = mode === 'declaracao' ? '.mySlides' : '.mySlides2';
  const slides = Array.from(document.querySelectorAll(selector));
  if (!slides.length) return;
  slides.forEach(s => s.style.display = 'none');
  let i = 0;
  function show() {
    slides.forEach(s => s.style.display = 'none');
    slides[i].style.display = 'block';
    i = (i + 1) % slides.length;
    slideTimer = setTimeout(show, 4000); // 4 seconds
  }
  show();
}

/* ================== Counter ================== */
function initCounter(startDate) {
  if (counterInterval) clearInterval(counterInterval);
  function update() {
    const diff = Date.now() - startDate.getTime();
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const mins = Math.floor((diff / (1000*60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    const d = $('#days'), h = $('#hours'), m = $('#mins'), s = $('#secs');
    if (d) d.textContent = days;
    if (h) h.textContent = hours;
    if (m) m.textContent = mins;
    if (s) s.textContent = secs;
  }
  // ensure placeholders exist
  const timeEl = document.querySelector('.contador .time');
  if (timeEl) {
    timeEl.innerHTML = `<span id="days">0</span> dias • <span id="hours">0</span>h <span id="mins">0</span>m <span id="secs">0</span>s`;
  }
  update();
  counterInterval = setInterval(update, 1000);
}

/* ================== Interactions (white box + pink overlay) ================== */
function initInteractions(mode, data) {
  // messages
  const btnMsg = $('#btnMsg'), overlayMsg = $('#overlayMsg');
  if (btnMsg && overlayMsg) {
    let i = 0;
    btnMsg.onclick = () => {
      overlayMsg.textContent = data.mensagens[i % data.mensagens.length];
      overlayMsg.style.display = 'flex';
      // add class to animate show
      requestAnimationFrame(()=> overlayMsg.classList.add('show'));
      i++;
    };
  }

  // versiculos
  const btnVers = $('#btnVers'), overlayV = $('#overlayV');
  if (btnVers && overlayV) {
    let j = 0;
    btnVers.onclick = () => {
      overlayV.textContent = data.versiculos[j % data.versiculos.length];
      overlayV.style.display = 'flex';
      requestAnimationFrame(()=> overlayV.classList.add('show'));
      j++;
    };
  }

  // resposta dela (declaracao only)
  const btnResp = $('#btnResp'), overlayResp = $('#overlayResp');
  if (btnResp && overlayResp) {
    let k = 0;
    btnResp.onclick = () => {
      const text = (data.respostas && data.respostas.length) ? data.respostas[k % data.respostas.length] : '💬';
      overlayResp.textContent = text;
      overlayResp.style.display = 'flex';
      requestAnimationFrame(()=> overlayResp.classList.add('show'));
      k++;
    };
  }
}

/* ================== Menu switching ================== */
$$('.menu-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) return;
    $$('.menu-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const mode = btn.dataset.mode || 'declaracao';
    currentMode = mode;
    buildUI(mode);
  });
});

/* ================== Hearts (lightweight) ================== */
function startHearts() {
  if (heartsInterval) clearInterval(heartsInterval);
  const container = $('#coracoes');
  heartsInterval = setInterval(()=> {
    const d = document.createElement('div');
    d.className = 'heart';
    d.textContent = '💗';
    const size = 12 + Math.random()*22;
    d.style.fontSize = size + 'px';
    d.style.left = (Math.random()*88) + 'vw';
    d.style.top = '-40px';
    const duration = 6 + Math.random()*5;
    d.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
    container.appendChild(d);
    requestAnimationFrame(()=> {
      d.style.transform = `translateY(${window.innerHeight + 40}px) rotate(${Math.random()*60-30}deg)`;
      d.style.opacity = 0;
    });
    setTimeout(()=> d.remove(), (duration*1000)+300);
  }, 420);
}
startHearts();

/* ================== Init ================== */
document.addEventListener('DOMContentLoaded', () => {
  buildUI(currentMode);
});
