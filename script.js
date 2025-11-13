/* ========= SITE DATA (JSON-like) =========
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

/* ========= Helpers ========= */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

let currentMode = 'declaracao';
let slideTimer = null;
let heartsInterval = null;
let counterInterval = null;

/* ========= Build UI from SITE_DATA ========= */
function buildUI(mode){
  const data = SITE_DATA[mode];
  const main = $('#main-content');
  main.innerHTML = '';

  /* --- Slideshow / Polaroids --- */
  const slideshow = document.createElement('div');
  slideshow.className = 'slideshow';

  data.fotos.forEach((src, i) => {
    const slideWrapper = document.createElement('div');
    slideWrapper.className = mode === 'declaracao' ? 'mySlides' : 'mySlides2';

    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    // add small rotation variants for natural look
    const r = i % 3;
    if (r === 0) polaroid.classList.add('rotate-1');
    if (r === 1) polaroid.classList.add('rotate-2');
    if (r === 2) polaroid.classList.add('rotate-3');

    const photo = document.createElement('div'); photo.className = 'photo';
    const img = document.createElement('img'); img.src = src; img.alt = `Foto ${i+1}`;
    photo.appendChild(img);

    const caption = document.createElement('div'); caption.className = 'caption';
    caption.textContent = data.datas && data.datas[i] ? data.datas[i] : '';

    polaroid.appendChild(photo);
    polaroid.appendChild(caption);
    slideWrapper.appendChild(polaroid);
    slideshow.appendChild(slideWrapper);
  });

  main.appendChild(slideshow);

  /* --- Carta (texto) --- */
  const cartaDiv = document.createElement('div'); cartaDiv.className = 'carta';
  data.texto.forEach(p => {
    const pEl = document.createElement('p'); pEl.textContent = p; cartaDiv.appendChild(pEl);
  });
  main.appendChild(cartaDiv);

  /* --- Contador --- */
  const cont = document.createElement('div'); cont.className = 'card-like contador';
  const title = document.createElement('div'); title.className = 'title'; title.textContent = '⏳ Nossos tempo juntos';
  const time = document.createElement('div'); time.className = 'time';
  time.innerHTML = `<span id="days">0</span> dias • <span id="hours">0</span>h <span id="mins">0</span>m <span id="secs">0</span>s`;
  cont.appendChild(title); cont.appendChild(time);
  main.appendChild(cont);

  /* --- Mensagens --- */
  const msgSec = document.createElement('div'); msgSec.className='section';
  const msgH = document.createElement('h2'); msgH.textContent = '💌 Nossas Mensagens';
  const msgBtn = document.createElement('button'); msgBtn.className='reveal-btn'; msgBtn.id='btnMsg'; msgBtn.textContent='💌 Mostrar mensagem';
  const msgBox = document.createElement('div'); msgBox.id='msgBox'; msgBox.className='box hidden';
  msgSec.appendChild(msgH); msgSec.appendChild(msgBtn); msgSec.appendChild(msgBox);
  main.appendChild(msgSec);

  /* --- Versículos --- */
  const vSec = document.createElement('div'); vSec.className='section';
  const vH = document.createElement('h2'); vH.textContent = '📖 Versículos Bíblicos';
  const vBtn = document.createElement('button'); vBtn.className='reveal-btn'; vBtn.id='btnVers'; vBtn.textContent='📖 Mostrar versículo';
  const vBox = document.createElement('div'); vBox.id='vBox'; vBox.className='box hidden';
  vSec.appendChild(vH); vSec.appendChild(vBtn); vSec.appendChild(vBox);
  main.appendChild(vSec);

  /* --- Formulário --- */
  const formSec = document.createElement('section'); formSec.className='section';
  const formTitle = document.createElement('h2'); formTitle.textContent='💬 Enviar uma mensagem';
  const form = document.createElement('form'); form.id='msgForm'; form.method='POST'; form.action='https://formspree.io/f/xovkwzej';
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

  /* --- Resposta dela (somente declaração) --- */
  if (mode === 'declaracao') {
    const respSec = document.createElement('div'); respSec.className='section resposta';
    const respBtn = document.createElement('button'); respBtn.className='reveal-btn'; respBtn.id='btnResp'; respBtn.textContent='💘 Revelar mensagem dela';
    const respBox = document.createElement('div'); respBox.id='respBox'; respBox.className='box hidden';
    respSec.appendChild(respBtn); respSec.appendChild(respBox);
    main.appendChild(respSec);
  }

  /* initialize behaviors */
  initSlides(mode);
  initCounter(new Date(data.dataInicio));
  initInteractions(mode, data);

  // form handler
  const frm = $('#main-content form');
  if (frm) {
    frm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = $('#formStatus');
      status.classList.remove('hidden'); status.classList.add('pink'); status.style.display='block';
      status.textContent = 'Enviando...';
      const fd = new FormData(frm);
      try {
        const res = await fetch(frm.action, { method:'POST', body:fd, headers:{ 'Accept':'application/json' } });
        if (res.ok) { status.textContent = 'Mensagem enviada 💌'; frm.reset(); }
        else { status.textContent = 'Erro ao enviar — tente novamente'; }
      } catch {
        status.textContent = 'Erro de conexão.';
      }
      setTimeout(()=>{ status.textContent=''; status.classList.remove('pink'); status.style.display='none'; }, 4000);
    });
  }
}

/* ========= Slides (4s) ========= */
function initSlides(mode) {
  if (slideTimer) { clearTimeout(slideTimer); slideTimer = null; }
  const sel = mode === 'declaracao' ? '.mySlides' : '.mySlides2';
  const slides = Array.from(document.querySelectorAll(sel));
  if (!slides.length) return;
  slides.forEach(s=> s.style.display='none');
  let idx = 0;
  function show(){
    slides.forEach(s=> s.style.display='none');
    slides[idx].style.display = 'block';
    idx = (idx + 1) % slides.length;
    slideTimer = setTimeout(show, 4000);
  }
  show();
}

/* ========= Counter ========= */
function initCounter(startDate) {
  if (counterInterval) clearInterval(counterInterval);
  function update() {
    const now = Date.now();
    const diff = now - startDate.getTime();
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const mins = Math.floor((diff / (1000*60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    const daysEl = $('#days'), hoursEl = $('#hours'), minsEl = $('#mins'), secsEl = $('#secs');
    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minsEl) minsEl.textContent = mins;
    if (secsEl) secsEl.textContent = secs;
  }
  update();
  counterInterval = setInterval(update, 1000);
}

/* ========= Interactions: messages, verses, response ========= */
function initInteractions(mode, data) {
  // messages
  const btnMsg = $('#btnMsg'), msgBox = $('#msgBox');
  if (btnMsg && msgBox) {
    let i = 0;
    btnMsg.onclick = () => {
      const text = data.mensagens[i % data.mensagens.length];
      msgBox.textContent = text;
      msgBox.classList.add('pink'); msgBox.classList.remove('hidden'); msgBox.style.display='block';
      i++;
    };
  }
  // verses
  const btnV = $('#btnVers'), vBox = $('#vBox');
  if (btnV && vBox) {
    let j = 0;
    btnV.onclick = () => {
      const text = data.versiculos[j % data.versiculos.length];
      vBox.textContent = text;
      vBox.classList.add('pink'); vBox.classList.remove('hidden'); vBox.style.display='block';
      j++;
    };
  }
  // response (only declaracao)
  const btnR = $('#btnResp'), respBox = $('#respBox');
  if (btnR && respBox) {
    let k = 0;
    btnR.onclick = () => {
      const text = data.respostas && data.respostas.length ? data.respostas[k % data.respostas.length] : '💬';
      respBox.textContent = text;
      respBox.classList.add('pink'); respBox.classList.remove('hidden'); respBox.style.display='block';
      k++;
    };
  }
}

/* ========= Menu switching ========= */
$$('.menu-btn').forEach(btn=>{
  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) return;
    $$('.menu-btn').forEach(b=> b.classList.remove('active'));
    btn.classList.add('active');
    const mode = btn.dataset.mode || 'declaracao';
    currentMode = mode;
    buildUI(mode);
  });
});

/* ========= Hearts (lightweight) ========= */
function startHearts(){
  if (heartsInterval) clearInterval(heartsInterval);
  const container = $('#coracoes');
  heartsInterval = setInterval(()=>{
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
    setTimeout(()=> { d.remove(); }, (duration*1000)+300);
  }, 420);
}
startHearts();

/* ========= Init ========= */
document.addEventListener('DOMContentLoaded', () => {
  buildUI(currentMode);
});
