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
const $ = sel => document.querySelector(sel);
const $$ = sel => [...document.querySelectorAll(sel)];

let currentMode = "declaracao";
let slideTimer = null;
let counterInterval = null;
let heartsInterval = null;

/* ================== Build UI ================== */
function buildUI(mode){
  const data = SITE_DATA[mode];
  const main = $("#main-content");
  main.innerHTML = "";

  /* Slideshow */
  const slideshow = document.createElement("div");
  slideshow.className = "slideshow";

  data.fotos.forEach((src,i)=>{
    const wrap = document.createElement("div");
    wrap.className = mode==="declaracao" ? "mySlides" : "mySlides2";

    const pol = document.createElement("div");
    pol.className = "polaroid";

    const r = i%3;
    if(r===0) pol.classList.add("rotate-1");
    if(r===1) pol.classList.add("rotate-2");
    if(r===2) pol.classList.add("rotate-3");

    const ph = document.createElement("div");
    ph.className = "photo";

    const img = document.createElement("img");
    img.src = src;
    img.alt = "Foto "+(i+1);
    ph.appendChild(img);

    const cap = document.createElement("div");
    cap.className = "caption";
    cap.textContent = data.datas[i];

    pol.appendChild(ph);
    pol.appendChild(cap);
    wrap.appendChild(pol);
    slideshow.appendChild(wrap);
  });

  main.appendChild(slideshow);

  /* Carta */
  const carta = document.createElement("div");
  carta.className = "carta";
  data.texto.forEach(t=>{
    const p = document.createElement("p");
    p.textContent = t;
    carta.appendChild(p);
  });
  main.appendChild(carta);

  /* Contador */
  const cont = document.createElement("div");
  cont.className="card-like contador";
  cont.innerHTML = `
    <div class="title">⏳ Nosso tempo juntos</div>
    <div class="time"><span id="days">0</span> dias • <span id="hours">0</span>h <span id="mins">0</span>m <span id="secs">0</span>s</div>
  `;
  main.appendChild(cont);

  /* Caixas */
  buildWhiteBox(main,"💌 Nossas Mensagens",data.mensagens);
  buildWhiteBox(main,"📖 Versículos Bíblicos",data.versiculos);

  if(mode==="declaracao")
    buildWhiteBox(main,"💘 Mensagem dela",data.respostas);

  /* Formulário */
  const formSec = document.createElement("section");
  formSec.className = "section";

  const formTitle = document.createElement("h2");
  formTitle.textContent = "💬 Enviar uma mensagem";

  const form = document.createElement("form");
  form.method="POST";
  form.action="https://formspree.io/f/xovkwzej";
  form.innerHTML = `
    <div class="form-row">
      <input type="text" name="name" placeholder="Seu nome" required>
      <input type="email" name="email" placeholder="Seu e-mail" required>
    </div>
    <textarea name="message" required placeholder="Escreva sua mensagem..."></textarea>
    <button type="submit">Enviar 💌</button>
  `;

  formSec.appendChild(formTitle);
  formSec.appendChild(form);
  main.appendChild(formSec);

  initSlides(mode);
  initCounter(new Date(data.dataInicio));
}

/* ================== White Box ================== */
function buildWhiteBox(parent,title,items){
  const sec = document.createElement("div");
  sec.className="section";

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const box = document.createElement("div");
  box.className="white-box";

  const btnArea = document.createElement("div");
  btnArea.className="btn-container";

  const btn = document.createElement("button");
  btn.className="reveal-btn";
  btn.textContent = title;

  btnArea.appendChild(btn);

  const content = document.createElement("div");
  content.className="content-area";

  box.appendChild(btnArea);
  box.appendChild(content);

  sec.appendChild(h2);
  sec.appendChild(box);
  parent.appendChild(sec);

  let idx = 0;

  btn.addEventListener("click",()=>{
    content.textContent = items[idx % items.length];
    idx++;
    box.classList.add("showing");
  });
}

/* ================== Slides ================== */
function initSlides(mode){
  if(slideTimer) clearTimeout(slideTimer);

  const sel = mode==="declaracao" ? ".mySlides" : ".mySlides2";
  const slides = [...document.querySelectorAll(sel)];

  slides.forEach(s=>s.style.display="none");
  let i=0;

  function show(){
    slides.forEach(s=>s.style.display="none");
    slides[i].style.display="block";
    i = (i+1)%slides.length;
    slideTimer = setTimeout(show,4000);
  }
  show();
}

/* ================== Counter ================== */
function initCounter(start){
  if(counterInterval) clearInterval(counterInterval);

  function update(){
    const diff = Date.now()-start.getTime();
    const d = Math.floor(diff/86400000);
    const h = Math.floor((diff/3600000)%24);
    const m = Math.floor((diff/60000)%60);
    const s = Math.floor((diff/1000)%60);

    $("#days").textContent=d;
    $("#hours").textContent=h;
    $("#mins").textContent=m;
    $("#secs").textContent=s;
  }

  update();
  counterInterval = setInterval(update,1000);
}

/* ================== Hearts ================== */
function startHearts(){
  const c = $("#coracoes");
  if(heartsInterval) clearInterval(heartsInterval);

  heartsInterval = setInterval(()=>{
    const h = document.createElement("div");
    h.className="heart";
    h.textContent="💗";
    h.style.left = Math.random()*90+"vw";
    h.style.top = "-20px";
    h.style.fontSize = (14+Math.random()*20)+"px";
    c.appendChild(h);

    requestAnimationFrame(()=>{
      h.style.transform = `translateY(${window.innerHeight+40}px)`;
      h.style.opacity=0;
    });

    setTimeout(()=>h.remove(),6000);
  },450);
}

startHearts();

/* ================== Init ================== */
document.addEventListener("DOMContentLoaded",()=>{
  buildUI(currentMode);
});

/* ================== Menu switching ================== */
$$(".menu-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    if(btn.classList.contains("disabled")) return;
    $$(".menu-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode;
    buildUI(currentMode);
  });
});
