/* ================== SITE DATA (JSON inside JS) ================== */
const SITE_DATA = {
  declaracao: { 
    dataInicio: "2025-08-11T11:10:00",
    fotos: [ "imagens/foto1.jpg","imagens/foto2.jpg","imagens/foto3.jpg","imagens/foto4.jpg","imagens/foto5.jpg","imagens/foto6.jpg","imagens/foto7.jpg","imagens/foto8.jpg","imagens/foto9.jpg" ],
    datas: [ "11/08/2025","12/08/2025","13/08/2025","14/08/2025","15/08/2025","16/08/2025","17/08/2025","18/08/2025","19/08/2025" ],
    texto: [ "Desde o primeiro dia em que te conheci, meu mundo ficou mais leve.", "Quero guardar cada momento nosso com muito carinho." ],
    mensagens: [ "Cada lembrança contigo me faz sorrir 💕", "Tu és minha paz e alegria ✨", "Obrigado por existir, meu amor 💖" ],
    versiculos: [ "O amor é paciente e bondoso. (1 Coríntios 13:4–7) 💞", "Nós amamos porque Ele nos amou primeiro. (1 João 4:19) 💗" ],
    respostas: [ "Eu também te amo muito ❤️", "Tu me faz muito feliz, meu amor 💞" ]
  },
  namoro: {
    dataInicio: "2025-11-09T16:20:00",
    fotos: [ "imagens/fotos10.jpg","imagens/fotos11.jpg","imagens/fotos12.jpg","imagens/fotos13.jpg","imagens/fotos14.jpg","imagens/fotos15.jpg","imagens/fotos16.jpg","imagens/fotos17.jpg","imagens/fotos18.jpg","imagens/fotos19.jpg" ],
    datas: [ "09/11/2025","10/11/2025","11/11/2025","12/11/2025","13/11/2025","14/11/2025","15/11/2025","16/11/2025","17/11/2025","18/11/2025" ],
    texto: [ "Cada dia do nosso namoro é um capítulo lindo da nossa história.", "Que Deus abençoe cada passo que damos juntos." ],
    mensagens: [ "Nosso amor é lindo demais 💕", "Cada dia contigo é uma nova alegria 🌼", "Você é minha melhor companhia 🙏" ],
    versiculos: [ "Acima de tudo, revistam-se do amor. (Colossenses 3:14) 💗", "O cordão de três dobras não se rompe facilmente. (Eclesiastes 4:12) 💒" ],
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

  // Slideshow
  const slideshow = document.createElement('div');
  slideshow.className = 'slideshow';
  data.fotos.forEach((src,i)=>{
    const slideWrapper = document.createElement('div');
    slideWrapper.className = mode==='declaracao'?'mySlides':'mySlides2';
    const polaroid = document.createElement('div');
    polaroid.className='polaroid';
    const r=i%3; if(r===0) polaroid.classList.add('rotate-1'); if(r===1) polaroid.classList.add('rotate-2'); if(r===2) polaroid.classList.add('rotate-3');
    const photo = document.createElement('div'); photo.className='photo';
    const img = document.createElement('img'); img.src=src; img.alt=`Foto ${i+1}`;
    photo.appendChild(img);
    const caption = document.createElement('div'); caption.className='caption';
    caption.textContent=(data.datas&&data.datas[i])?data.datas[i]:'';
    polaroid.appendChild(photo); polaroid.appendChild(caption);
    slideWrapper.appendChild(polaroid);
    slideshow.appendChild(slideWrapper);
  });
  main.appendChild(slideshow);

  // Carta
  const carta = document.createElement('div'); carta.className='carta';
  data.texto.forEach(p=>{ const pEl=document.createElement('p'); pEl.textContent=p; carta.appendChild(pEl); });
  main.appendChild(carta);

  // Contador
  const cont=document.createElement('div'); cont.className='card-like contador';
  const title=document.createElement('div'); title.className='title'; title.textContent='⏳ Tempo que nos Conhecemos';
  const time=document.createElement('div'); time.className='time';
  time.innerHTML=`<span id="days">0</span> dias • <span id="hours">0</span>h <span id="mins">0</span>m <span id="secs">0</span>s`;
  cont.appendChild(title); cont.appendChild(time); main.appendChild(cont);

  // Nossas Mensagens
  buildWhiteBoxWithButtons(main,{heading:'💌 Nossas Mensagens',idSuffix:'Msg',items:data.mensagens});

  // Versículos
  buildWhiteBoxWithButtons(main,{heading:'📖 Versículos Bíblicos',idSuffix:'Vers',items:data.versiculos});

  // Formulário
  const formSec=document.createElement('section'); formSec.className='section';
  const formTitle=document.createElement('h2'); formTitle.textContent='💬 Enviar uma mensagem';
  const form=document.createElement('form'); form.id='msgForm'; form.method='POST'; form.action='https://formspree.io/f/xovkwzej';
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

  // Resposta dela
  if(mode==='declaracao'){
    buildWhiteBoxWithButtons(main,{heading:'💘 Mensagem dela',idSuffix:'Resp',items:data.respostas});
  }

  // initialize slides, counter, interactions
  initSlides(mode);
  initCounter(new Date(data.dataInicio));
  initInteractions(mode,data);

  // Form submit
  const frm=$('#main-content form');
  if(frm){frm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const status=$('#formStatus'); status.classList.add('hidden'); status.textContent='';
    const formData=new FormData(frm);
    try{
      const resp=await fetch(frm.action,{method:'POST',body:formData,headers:{'Accept':'application/json'}});
      if(resp.ok){ status.textContent='Mensagem enviada com sucesso! ❤️'; frm.reset(); } 
      else { status.textContent='Ops, ocorreu um erro 😢'; }
    } catch(err){ status.textContent='Erro ao enviar, tente novamente 😢'; }
    status.classList.remove('hidden');
  }});
}

/* ================== White box builder ================== */
function buildWhiteBoxWithButtons(parent,{heading,idSuffix,items=[]}){
  const sec=document.createElement('section'); sec.className='section';
  const h2=document.createElement('h2'); h2.textContent=heading; sec.appendChild(h2);
  if(items.length===0){ parent.appendChild(sec); return; }

  const whiteBox=document.createElement('div'); whiteBox.className='white-box';
  const btnContainer=document.createElement('div'); btnContainer.className='btn-container';
  const contentArea=document.createElement('div'); contentArea.className='content-area';
  const pinkOverlay=document.createElement('div'); pinkOverlay.className='pink-overlay';

  items.forEach((txt,i)=>{
    const btn=document.createElement('button'); btn.className='reveal-btn'; btn.textContent=`Mostrar ${i+1}`;
    btn.addEventListener('click',()=>{ pinkOverlay.textContent=txt; pinkOverlay.classList.add('show'); });
    btnContainer.appendChild(btn);
  });

  whiteBox.appendChild(btnContainer);
  whiteBox.appendChild(contentArea);
  whiteBox.appendChild(pinkOverlay);
  sec.appendChild(whiteBox);
  parent.appendChild(sec);
}

/* ================== Slides ================== */
function initSlides(mode){
  const slides=mode==='declaracao'?$$('.mySlides'):$$('.mySlides2');
  let idx=0;
  slides.forEach(s=>s.style.display='none');
  function showSlide(){ slides.forEach(s=>s.style.display='none'); slides[idx].style.display='flex'; idx=(idx+1)%slides.length; }
  showSlide(); clearInterval(slideTimer); slideTimer=setInterval(showSlide,5000);
}

/* ================== Counter ================== */
function initCounter(startDate){
  const daysEl=$('#days'), hoursEl=$('#hours'), minsEl=$('#mins'), secsEl=$('#secs');
  if(counterInterval) clearInterval(counterInterval);
  function updateCounter(){
    const now=new Date(); let diff=Math.floor((now-startDate)/1000);
    const d=Math.floor(diff/86400); diff%=86400; const h=Math.floor(diff/3600); diff%=3600; const m=Math.floor(diff/60); const s=diff%60;
    daysEl.textContent=d; hoursEl.textContent=h; minsEl.textContent=m; secsEl.textContent=s;
  }
  updateCounter(); counterInterval=setInterval(updateCounter,1000);
}

/* ================== Interactions ================== */
function initInteractions(mode,data){
  // hearts animation
  if(heartsInterval) clearInterval(heartsInterval);
  const coracoes=$('#coracoes');
  heartsInterval=setInterval(()=>{ 
    const h=document.createElement('div'); h.className='heart'; h.textContent='❤️'; 
    h.style.left=Math.random()*window.innerWidth+'px'; h.style.fontSize=(12+Math.random()*18)+'px';
    h.style.animation=`floatHeart ${4+Math.random()*3}s linear forwards`; coracoes.appendChild(h); 
    setTimeout(()=>{ coracoes.removeChild(h); },7000); 
  },300);

  // floating hearts CSS
  if(!document.getElementById('heartAnim')){
    const style=document.createElement('style'); style.id='heartAnim';
    style.innerHTML=`@keyframes floatHeart{0%{transform:translateY(0) rotate(0deg);opacity:1;}100%{transform:translateY(-320px) rotate(360deg);opacity:0;}}`;
    document.head.appendChild(style);
  }
}

/* ================== Menu switch ================== */
$$('.menu-btn').forEach(btn=>btn.addEventListener('click',()=>{
  if(btn.classList.contains('disabled')||btn.classList.contains('active')) return;
  $$('.menu-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  currentMode=btn.dataset.mode; buildUI(currentMode);
}));

/* ================== Init ================== */
document.addEventListener('DOMContentLoaded',()=>{ buildUI(currentMode); });
