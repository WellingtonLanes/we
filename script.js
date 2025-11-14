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

/* ================== Helpers ================== */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

let currentMode = 'declaracao';
let slideTimer = null;
let heartsInterval = null;
let counterInterval = null;

/* ================== Build White Box ================== */
function buildWhiteBox(parent, heading, items) {
  if(!items || !items.length) return;
  const section = document.createElement('section');
  section.className = 'section';
  const h2 = document.createElement('h2'); h2.textContent = heading;
  section.appendChild(h2);

  items.forEach(item => {
    const wb = document.createElement('div'); wb.className = 'white-box';
    const content = document.createElement('div'); content.className = 'content-area';
    const overlay = document.createElement('div'); overlay.className = 'pink-overlay'; overlay.textContent = item;
    const btn = document.createElement('button'); btn.className = 'reveal-btn'; btn.textContent = 'Mostrar';
    btn.addEventListener('click', () => overlay.classList.toggle('show'));

    wb.appendChild(content); wb.appendChild(overlay); wb.appendChild(btn);
    section.appendChild(wb);
  });

  parent.appendChild(section);
}

/* ================== Build UI ================== */
function buildUI(mode){
  const data = SITE_DATA[mode];
  const main = $('#main-content');
  main.innerHTML = '';

  /* --- Slideshow --- */
  const slideshow = document.createElement('div'); slideshow.className='slideshow';
  data.fotos.forEach((src,i)=>{
    const slide = document.createElement('div'); slide.className=(mode==='declaracao'? 'mySlides':'mySlides2');
    const polaroid = document.createElement('div'); polaroid.className='polaroid';
    polaroid.classList.add(i%3===0?'rotate-1':i%3===1?'rotate-2':'rotate-3');

    const photo = document.createElement('div'); photo.className='photo';
    const img = document.createElement('img'); img.src=src; img.alt=`Foto ${i+1}`;
    photo.appendChild(img);

    const caption = document.createElement('div'); caption.className='caption';
    caption.textContent = data.datas[i] || '';
    polaroid.appendChild(photo); polaroid.appendChild(caption);
    slide.appendChild(polaroid); slideshow.appendChild(slide);
  });
  main.appendChild(slideshow);

  /* --- Carta --- */
  const carta = document.createElement('div'); carta.className='carta';
  data.texto.forEach(p=>{
    const pEl = document.createElement('p'); pEl.textContent=p;
    carta.appendChild(pEl);
  });
  main.appendChild(carta);

  /* --- Contador --- */
  const cont = document.createElement('div'); cont.className='card-like contador';
  const title = document.createElement('div'); title.className='title'; title.textContent='⏳ Nossos tempo juntos';
  const time = document.createElement('div'); time.className='time';
  time.innerHTML=`<span id="days">0</span> dias • <span id="hours">0</span>h <span id="mins">0</span>m <span id="secs">0</span>s`;
  cont.appendChild(title); cont.appendChild(time); main.appendChild(cont);

  /* --- Mensagens --- */
  buildWhiteBox(main,'💌 Nossas Mensagens',data.mensagens);
  buildWhiteBox(main,'📖 Versículos Bíblicos',data.versiculos);
  if(data.respostas && data.respostas.length) buildWhiteBox(main,'💘 Mensagem dela',data.respostas);

  /* --- Formulário --- */
  const formSec = document.createElement('section'); formSec.className='section';
  const formTitle = document.createElement('h2'); formTitle.textContent='💬 Enviar uma mensagem';
  const form = document.createElement('form'); form.method='POST'; form.action='https://formspree.io/f/xovkwzej';
  form.innerHTML=`
    <div class="form-row">
      <input type="text" name="name" placeholder="Seu nome" required />
      <input type="email" name="email" placeholder="Seu e-mail" required />
    </div>
    <textarea name="message" placeholder="Escreva sua mensagem..." required></textarea>
    <button type="submit">Enviar 💌</button>
    <div id="formStatus" class="box hidden" aria-live="polite"></div>
  `;
  formSec.appendChild(formTitle); formSec.appendChild(form); main.appendChild(formSec);

  startSlides(mode);
  startCounter(data.dataInicio);
}

/* ================== Slides ================== */
let slideIndex = 0;
function startSlides(mode){
  const slides = $$(mode==='declaracao'?'.mySlides':'.mySlides2');
  if(!slides.length) return;
  slides.forEach(s=>s.style.display='none');
  slideIndex=0; slides[slideIndex].style.display='flex';
  if(slideTimer) clearInterval(slideTimer);
  slideTimer = setInterval(()=>{
    slides[slideIndex].style.display='none';
    slideIndex = (slideIndex+1) % slides.length;
    slides[slideIndex].style.display='flex';
  },5000);
}

/* ================== Counter ================== */
function startCounter(startDate){
  if(counterInterval) clearInterval(counterInterval);
  const start=new Date(startDate).getTime();
  counterInterval = setInterval(()=>{
    const now = Date.now();
    let diff=Math.floor((now-start)/1000);
    const days=Math.floor(diff/86400); diff%=86400;
    const hours=Math.floor(diff/3600); diff%=3600;
    const mins=Math.floor(diff/60); const secs=diff%60;
    $('#days').textContent=days; $('#hours').textContent=hours;
    $('#mins').textContent=mins; $('#secs').textContent=secs;
  },1000);
}

/* ================== Hearts ================== */
function createHeart(){
  const d=document.createElement('div'); d.className='heart';
  d.style.left=Math.random()*window.innerWidth+'px';
  d.style.fontSize=(12+Math.random()*14)+'px'; d.style.color='#f78da7';
  d.textContent='❤';
  document.getElementById('coracoes').appendChild(d);
  setTimeout(()=>{ d.style.transform=`translateY(${window.innerHeight+40}px) rotate(${Math.random()*60-30}deg)`; d.style.opacity=0; },10);
  setTimeout(()=>d.remove(),3100);
}
function startHearts(){
  if(heartsInterval) clearInterval(heartsInterval);
  heartsInterval=setInterval(createHeart,400);
}

/* ================== Menu ================== */
$$('.menu-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    if(btn.classList.contains('disabled')) return;
    $$('.menu-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentMode=btn.dataset.mode;
    buildUI(currentMode);
  });
});

/* ================== Init ================== */
document.addEventListener('DOMContentLoaded', ()=>{
  buildUI(currentMode);
  startHearts();
});
