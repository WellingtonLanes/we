/* ========= SITE DATA (JSON-like object) =========
   Edite texto, fotos, mensagens e versículos aqui.
*/
const SITE_DATA = {
  declaracao: {
    dataInicio: "2025-08-11T11:10:00",
    fotos: [
      "imagens/foto1.jpg","imagens/foto2.jpg","imagens/foto3.jpg",
      "imagens/foto4.jpg","imagens/foto5.jpg","imagens/foto6.jpg",
      "imagens/foto7.jpg","imagens/foto8.jpg","imagens/foto9.jpg"
    ],
    // dates for captions (fictitious) - same length as fotos
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
      "O amor é paciente e bondoso. (1 Coríntios 13:4–7)",
      "Nós amamos porque Ele nos amou primeiro. (1 João 4:19)"
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
      "Acima de tudo, revistam-se do amor. (Colossenses 3:14)",
      "O cordão de três dobras não se rompe facilmente. (Eclesiastes 4:12)"
    ],
    respostas: []
  }
};

/* ======= utilities ======= */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

let currentMode = 'declaracao';
let slideTimer = null;
let heartsInterval = null;

/* ========= build UI from data ========= */
function buildUI(mode){
  const data = SITE_DATA[mode];
  const main = $('#main-content');
  main.innerHTML = ''; // clear

  /* --- slideshow (one polaroid visible at a time) --- */
  const slideshow = document.createElement('div');
  slideshow.className = 'slideshow';

  data.fotos.forEach((src, i) => {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    // optional small random rotate to look natural
    if (i % 3 === 0) polaroid.classList.add('rotate-small');
    if (i % 5 === 0) polaroid.classList.add('rotate-small-2');

    const photoWrap = document.createElement('div');
    photoWrap.className = 'photo';
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Foto ${i+1}`;
    photoWrap.appendChild(img);

    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.textContent = data.datas && data.datas[i] ? data.datas[i] : '';

    // slide element (we'll use for show/hide)
    const slideEl = document.createElement('div');
    slideEl.className = mode === 'declaracao' ? 'mySlides' : 'mySlides2';
    slideEl.appendChild(photoWrap);
    slideEl.appendChild(caption);

    slideshow.appendChild(slideEl);
  });

  main.appendChild(slideshow);

  /* --- carta / texto --- */
  const carta = document.createElement('div');
  carta.className = 'carta';
  data.texto.forEach(p => {
    const pEl = document.createElement('p');
    pEl.textContent = p;
    carta.appendChild(pEl);
  });
  main.appendChild(carta);

  /* --- contador --- */
  const contBox = document.createElement('div');
  contBox.className = 'card-like contador';
  const contTitle = document.createElement('div');
  contTitle.className = 'title';
  contTitle.textContent = mode === 'declaracao' ? 'Tempo que nos conhecemos ⏳' : 'Tempo desde o namoro 💞';
  const contTime = document.createElement('div');
  contTime.className = 'time';
  // placeholders; initCounter will populate ids days/hours/mins/secs inside it
  contTime.innerHTML = `<span id="days">0</span> dias • <span id="hours">0</span>h <span id="mins">0</span>m <span id="secs">0</span>s`;
  contBox.appendChild(contTitle);
  contBox.appendChild(contTime);
  main.appendChild(contBox);

  /* --- mensagens (button + hidden box) --- */
  const msgSection = document.createElement('div'); msgSection.className='section';
  const msgH = document.createElement('h2'); msgH.textContent = 'Nossas Mensagens';
  const msgBtn = document.createElement('button'); msgBtn.className='reveal-btn'; msgBtn.id='btnMsg'; msgBtn.textContent='💌 Mostrar mensagem';
  const msgBox = document.createElement('div'); msgBox.id='msgBox'; msgBox.className='box hidden';
  msgSection.appendChild(msgH); msgSection.appendChild(msgBtn); msgSection.appendChild(msgBox);
  main.appendChild(msgSection);

  /* --- versículos --- */
  const vSection = document.createElement('div'); vSection.className='section';
  const vH = document.createElement('h2'); vH.textContent = 'Versículos Bíblicos';
  const vBtn = document.createElement('button'); vBtn.className='reveal-btn'; vBtn.id='btnVers'; vBtn.textContent='📖 Mostrar versículo';
  const vBox = document.createElement('div'); vBox.id='vBox'; vBox.className='box hidden';
  vSection.appendChild(vH); vSection.appendChild(vBtn); vSection.appendChild(vBox);
  main.appendChild(vSection);

  /* --- form --- */
  const formSection = document.createElement('section'); formSection.className='section';
  const formEl = document.createElement('form');
  formEl.id = 'mainForm';
  formEl.action = 'https://formspree.io/f/xovkwzej'; // keep your endpoint
  formEl.method = 'POST';
  formEl.innerHTML = `
    <div class="form-row">
      <input type="text" name="name" placeholder="Seu nome" required>
      <input type="email" name="email" placeholder="Seu e-mail" required>
    </div>
    <textarea name="message" placeholder="Escreva sua mensagem..." required></textarea>
    <button type="submit">Enviar 💌</button>
    <div id="formStatus" class="box hidden"></div>
  `;
  const formTitle = document.createElement('h2'); formTitle.textContent = 'Enviar uma mensagem 💬';
  formSection.appendChild(formTitle); formSection.appendChild(formEl);
  main.appendChild(formSection);

  /* --- resposta (only declaracao) --- */
  if (mode === 'declaracao') {
    const respSection = document.createElement('div'); respSection.className='section resposta';
    const respBtn = document.createElement('button'); respBtn.className='reveal-btn'; respBtn.id='btnResp'; respBtn.textContent='💖 Revelar resposta dela';
    const respBox = document.createElement('div'); respBox.id='respBox'; respBox.className='box hidden';
    respSection.appendChild(respBtn); respSection.appendChild(respBox);
    main.appendChild(respSection);
  }

  /* initialize behavior */
  initSlides(mode);
  initCounter(mode, new Date(data.dataInicio));
  initInteractions(mode, data);

  // attach form handler
  const form = main.querySelector('form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = $('#formStatus');
    status.classList.remove('hidden'); status.classList.add('pink'); status.style.display='block';
    status.textContent = 'Enviando...';
    const fd = new FormData(form);
    try {
      const res = await fetch(form.action, { method:'POST', body:fd, headers:{ 'Accept':'application/json' } });
      if (res.ok) { status.textContent = 'Mensagem enviada 💌'; form.reset(); }
      else { status.textContent = 'Erro ao enviar — tente novamente'; }
    } catch {
      status.textContent = 'Erro de conexão.';
    }
    setTimeout(()=>{ status.textContent=''; status.classList.remove('pink'); status.style.display='none'; }, 4000);
  });
}

/* ========= Slides =========
   Show one frame at a time, 4s per photo.
*/
function initSlides(mode) {
  if (slideTimer) { clearTimeout(slideTimer); slideTimer = null; }
  const selector = mode === 'declaracao' ? '.mySlides' : '.mySlides2';
  // collect slides present in DOM for this mode
  const slides = Array.from(document.querySelectorAll(selector));
  if (!slides.length) return;
  let i = 0;
  slides.forEach(s=> s.style.display = 'none');
  function show(){
    slides.forEach(s=> s.style.display='none');
    slides[i].style.display = 'block';
    i = (i + 1) % slides.length;
    slideTimer = setTimeout(show, 4000);
  }
  show();
}

/* ========= Counter ========= */
let counterInterval = null;
function initCounter(mode, startDate) {
  if (counterInterval) clearInterval(counterInterval);
  function update(){
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
  // ensure the placeholders exist
  const timeDiv = $('.contador .time');
  if (timeDiv) {
    timeDiv.innerHTML = `<span id="days">0</span> dias • <span id="hours">0</span>h <span id="mins">0</span>m <span id="secs">0</span>s`;
  }
  update();
  counterInterval = setInterval(update, 1000);
}

/* ========= interactions (messages, verses, response) ========= */
function initInteractions(mode, data) {
  // messages
  const btnMsg = $('#btnMsg'), msgBox = $('#msgBox');
  if (btnMsg && msgBox) {
    let idx = 0;
    btnMsg.onclick = () => {
      msgBox.classList.add('pink'); msgBox.classList.remove('hidden'); msgBox.style.display='block';
      msgBox.textContent = data.mensagens[idx % data.mensagens.length];
      idx++;
    };
  }
  // verses
  const btnV = $('#btnVers'), vBox = $('#vBox');
  if (btnV && vBox) {
    let j = 0;
    btnV.onclick = () => {
      vBox.classList.add('pink'); vBox.classList.remove('hidden'); vBox.style.display='block';
      vBox.textContent = data.versiculos[j % data.versiculos.length];
      j++;
    };
  }
  // response (only declaracao)
  const btnR = $('#btnResp'), respBox = $('#respBox');
  if (btnR && respBox) {
    let k = 0;
    btnR.onclick = () => {
      respBox.classList.add('pink'); respBox.classList.remove('hidden'); respBox.style.display='block';
      if (data.respostas && data.respostas.length) {
        respBox.textContent = data.respostas[k % data.respostas.length];
        k++;
      } else respBox.textContent = '💬';
    };
  }
}

/* ========= menu switching ========= */
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

/* ========= hearts: lightweight creation + removal ========= */
function startHearts(){
  if (heartsInterval) clearInterval(heartsInterval);
  const container = $('#coracoes');
  heartsInterval = setInterval(()=>{
    const d = document.createElement('div');
    d.className = 'heart';
    d.textContent = '💗';
    const size = 12 + Math.random()*22;
    d.style.fontSize = size + 'px';
    d.style.left = (Math.random()*90) + 'vw';
    const duration = 6 + Math.random()*5;
    d.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
    container.appendChild(d);
    // trigger animation via transform translateY (using setTimeout so element is in DOM)
    requestAnimationFrame(()=> {
      d.style.transform = `translateY(${window.innerHeight + 40}px) rotate(${Math.random()*40-20}deg)`;
      d.style.opacity = 0;
    });
    setTimeout(()=> { d.remove(); }, (duration*1000) + 200);
  }, 420);
}
startHearts();

/* ========= init ========= */
document.addEventListener('DOMContentLoaded', () => {
  buildUI(currentMode);
});
