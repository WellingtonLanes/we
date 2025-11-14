/* ================== SITE DATA ================== */
const SITE_DATA = {
  declaracao: {
    dataInicio: "2025-08-11T11:10:00",
    fotos: ["imagens/foto1.jpg","imagens/foto2.jpg","imagens/foto3.jpg","imagens/foto4.jpg","imagens/foto5.jpg","imagens/foto6.jpg","imagens/foto7.jpg","imagens/foto8.jpg","imagens/foto9.jpg"],
    datas: ["11/08/2025","12/08/2025","13/08/2025","14/08/2025","15/08/2025","16/08/2025","17/08/2025","18/08/2025","19/08/2025"],
    texto: ["Desde o primeiro dia em que te conheci, meu mundo ficou mais leve.","Quero guardar cada momento nosso com muito carinho."],
    mensagens: ["Cada lembrança contigo me faz sorrir 💕","Tu és minha paz e alegria ✨","Obrigado por existir, meu amor 💖"],
    versiculos: ["O amor é paciente e bondoso. (1 Coríntios 13:4–7) 💞","Nós amamos porque Ele nos amou primeiro. (1 João 4:19) 💗"],
    respostas: ["Eu também te amo muito ❤️","Tu me faz muito feliz, meu amor 💞"]
  },
  namoro: {
    dataInicio: "2025-11-09T16:20:00",
    fotos: ["imagens/fotos10.jpg","imagens/fotos11.jpg","imagens/fotos12.jpg","imagens/fotos13.jpg","imagens/fotos14.jpg","imagens/fotos15.jpg","imagens/fotos16.jpg","imagens/fotos17.jpg","imagens/fotos18.jpg","imagens/fotos19.jpg"],
    datas: ["09/11/2025","10/11/2025","11/11/2025","12/11/2025","13/11/2025","14/11/2025","15/11/2025","16/11/2025","17/11/2025","18/11/2025"],
    texto: ["Cada dia do nosso namoro é um capítulo lindo da nossa história.","Que Deus abençoe cada passo que damos juntos."],
    mensagens: ["Nosso amor é lindo demais 💕","Cada dia contigo é uma nova alegria 🌼","Você é minha melhor companhia 🙏"],
    versiculos: ["Acima de tudo, revistam-se do amor. (Colossenses 3:14) 💗","O cordão de três dobras não se rompe facilmente. (Eclesiastes 4:12) 💒"],
    respostas: []
  }
};

/* ================== Helpers ================== */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

let currentMode = 'declaracao';
let slideTimer = null, counterInterval = null, heartsInterval = null;

/* ================== Build UI ================== */
function buildUI(mode){
  const data = SITE_DATA[mode];
  const main = $('#main-content'); main.innerHTML='';

  // SLIDESHOW
  const slideshow = document.createElement('div'); slideshow.className='slideshow';
  data.fotos.forEach((src,i)=>{
    const slideWrapper = document.createElement('div');
    slideWrapper.className = mode==='declaracao'?'mySlides':'mySlides2';
    const polaroid = document.createElement('div'); polaroid.className='polaroid';
    const r=i%3; if(r===0) polaroid.classList.add('rotate-1'); if(r===1) polaroid.classList.add('rotate-2'); if(r===2) polaroid.classList.add('rotate-3');
    const photo=document.createElement('div'); photo.className='photo';
    const img=document.createElement('img'); img.src=src; img.alt=`Foto ${i+1}`; photo.appendChild(img);
    const caption=document.createElement('div'); caption.className='caption'; caption.textContent=data.datas[i]||'';
    polaroid.appendChild(photo); polaroid.appendChild(caption);
    slideWrapper.appendChild(polaroid); slideshow.appendChild(slideWrapper);
  });
  main.appendChild(slideshow);

  // CARTA
  const carta = document.createElement('div'); carta.className='carta';
  data.texto.forEach(p=>{ const pEl=document.createElement('p'); pEl.textContent=p; carta.appendChild(pEl); });
  main.appendChild(carta);

  // CONTADOR
  const cont=document.createElement('div'); cont.className='card-like contador';
  const title=document.createElement('div'); title.className='title'; title.textContent='⏳ Nossos tempo juntos';
  const time=document.createElement('div'); time.className='time';
  time.innerHTML='<span id="days">0</span> dias • <span id="hours">0</span>h <span id="mins">0</span>m <span id="secs">0</span>s';
  cont.appendChild(title); cont.appendChild(time); main.appendChild(cont);

  // WHITE-BOXES
  buildWhiteBoxWithButtons(main,{heading:'💌 Nossas Mensagens',idSuffix:'Msg',items:data.mensagens});
  buildWhiteBoxWithButtons(main,{heading:'📖 Versículos Bíblicos',idSuffix:'Vers',items:data.versiculos});
  if(mode==='declaracao') buildWhiteBoxWithButtons(main,{heading:'💘 Mensagem dela',idSuffix:'Resp',items:data.respostas});

  // FORMULÁRIO
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

  initSlides(mode); initCounter(new Date(data.dataInicio));
  const frm=$('#main-content form');
  if(frm) frm.addEventListener('submit', async e=>{
    e.preventDefault();
    const st=$('#formStatus'); if(st){ st.classList.remove('hidden'); st.style.display='block'; st.textContent='Enviando...'; }
    const fd=new FormData(frm);
    try{
      const res=await fetch(frm.action,{method:'POST',body:fd,headers:{'Accept':'application/json'}});
      if(res.ok){ if(st) st.textContent='Mensagem enviada 💌'; frm.reset(); } else { if(st) st.textContent='Erro ao enviar — tente novamente'; }
    }catch(err){ if(st) st.textContent='Erro de conexão.'; }
    setTimeout(()=>{ if(st){ st.textContent=''; st.classList.add('hidden'); st.style.display='none'; } },3500);
  });
}

/* ================== Build white-box ================== */
function buildWhiteBoxWithButtons(parent,{heading,idSuffix,items}){
  const section=document.createElement('div'); section.className='section';
  const h2=document.createElement('h2'); h2.textContent=heading;
  const whiteBox=document.createElement('div'); whiteBox.className='white-box'; whiteBox.id=`white${idSuffix}`;

