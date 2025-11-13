/* ========= Conteúdo (JSON interno) =========
   Mantive tudo aqui para você editar fácil depois.
*/
const SITE_DATA = {
  declaracao: {
    dataInicio: "2025-08-11T11:10:00",
    fotos: [
      "imagens/foto1.jpg","imagens/foto2.jpg","imagens/foto3.jpg",
      "imagens/foto4.jpg","imagens/foto5.jpg","imagens/foto6.jpg",
      "imagens/foto7.jpg","imagens/foto8.jpg","imagens/foto9.jpg"
    ],
    texto: [
      "Desde o primeiro dia em que te conheci, tudo ficou mais leve.",
      "Tu és um presente de Deus na minha vida — cada momento contigo é precioso."
    ],
    mensagens: [
      "A cada lembrança contigo eu sorrio 💕",
      "Tu és minha paz e minha alegria ✨",
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
    texto: [
      "Cada dia do namoro é um capítulo lindo da nossa história.",
      "Que Deus guie e abençoe cada passo que damos juntos."
    ],
    mensagens: [
      "Contigo tudo fica mais leve 💞",
      "Teu sorriso é o meu lugar favorito 🌼",
      "Abençoo cada momento ao teu lado 🙏"
    ],
    versiculos: [
      "O cordão de três dobras não se quebra facilmente. (Eclesiastes 4:12)",
      "Acima de tudo, revistam-se do amor. (Colossenses 3:14)"
    ],
    respostas: [] // sem respostas automáticas pra namoro (se quiser, insira)
  }
};


/* ========= Helpers e estado ========= */
let currentMode = "declaracao"; // inicial
let slideTimer = null;
let heartsTimer = null;

/* ======== DOM util ======== */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));


/* ========= Inicializa UI (constroi conteúdo a partir do JSON) ========= */
function buildUIForMode(mode) {
  const data = SITE_DATA[mode];
  const main = $("#main-content");
  main.innerHTML = ""; // limpa

  // SLIDES (container)
  const slidesWrap = document.createElement("div");
  slidesWrap.className = "slideshow slide-frame";
  // criar frames (cada imagem como .mySlides)
  data.fotos.forEach((src, idx) => {
    const slide = document.createElement("div");
    slide.className = mode === "declaracao" ? "mySlides" : "mySlides2";
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Foto ${idx+1}`;
    slide.appendChild(img);
    slidesWrap.appendChild(slide);
  });
  main.appendChild(slidesWrap);

  // CARTA / TEXTO
  const carta = document.createElement("div");
  carta.className = "carta";
  data.texto.forEach(p => {
    const pEl = document.createElement("p");
    pEl.textContent = p;
    carta.appendChild(pEl);
  });
  main.appendChild(carta);

  // CONTADOR
  const contBox = document.createElement("div");
  contBox.className = "contador";
  const contTitle = document.createElement("h3"); contTitle.textContent = (mode === "declaracao" ? "Tempo que nos conhecemos ⏳" : "Tempo desde o namoro 💞");
  const contTime = document.createElement("div"); contTime.className = "time";
  contTime.innerHTML = `<span id="days">0</span> dias • <span id="hours">0</span>h <span id="mins">0</span>m <span id="secs">0</span>s`;
  contBox.appendChild(contTitle); contBox.appendChild(contTime);
  main.appendChild(contBox);

  // MENSAGENS (button + box hidden)
  const msgSection = document.createElement("section"); msgSection.className = "section";
  const msgTitle = document.createElement("h2"); msgTitle.textContent = "Nossas Mensagens";
  const msgBtn = document.createElement("button"); msgBtn.className = "reveal-btn"; msgBtn.id = "btnMsg"; msgBtn.textContent = "💌 Mostrar mensagem";
  const msgBox = document.createElement("div"); msgBox.id = "msgBox"; msgBox.className = "box hidden";
  msgSection.appendChild(msgTitle); msgSection.appendChild(msgBtn); msgSection.appendChild(msgBox);
  main.appendChild(msgSection);

  // VERSÍCULOS (button + box hidden)
  const vSection = document.createElement("section"); vSection.className = "section";
  const vTitle = document.createElement("h2"); vTitle.textContent = "Versículos Bíblicos";
  const vBtn = document.createElement("button"); vBtn.className = "reveal-btn"; vBtn.id = "btnVers"; vBtn.textContent = "📖 Mostrar versículo";
  const vBox = document.createElement("div"); vBox.id = "vBox"; vBox.className = "box hidden";
  vSection.appendChild(vTitle); vSection.appendChild(vBtn); vSection.appendChild(vBox);
  main.appendChild(vSection);

  // FORMULÁRIO (estilizado)
  const formWrap = document.createElement("section"); formWrap.className = "section";
  const formTitle = document.createElement("h2"); formTitle.textContent = "Enviar uma mensagem 💬";
  const form = document.createElement("form"); form.id = (mode==="declaracao"?"formDecl":"formNam"); form.method="POST";
  form.action = "https://formspree.io/f/xovkwzej"; // seu endpoint (alterar se desejar)
  form.innerHTML = `
    <div class="form-row">
      <input type="text" name="name" placeholder="Seu nome" required />
      <input type="email" name="email" placeholder="Seu e-mail" required />
    </div>
    <textarea name="message" placeholder="Escreva sua mensagem..." required></textarea>
    <button type="submit">Enviar 💌</button>
    <div class="status" id="${mode}-form-status" aria-live="polite"></div>
  `;
  formWrap.appendChild(formTitle); formWrap.appendChild(form);
  main.appendChild(formWrap);

  // Resposta dela: só no modo declaração
  if (mode === "declaracao") {
    const respWrap = document.createElement("div"); respWrap.className = "resposta section";
    const respBtn = document.createElement("button"); respBtn.id = "btnResp"; respBtn.className = "reveal-btn"; respBtn.textContent = "💖 Revelar resposta dela";
    const respBox = document.createElement("div"); respBox.id = "respBox"; respBox.className = "box hidden";
    respWrap.appendChild(respBtn); respWrap.appendChild(respBox);
    main.appendChild(respWrap);
  }

  // iniciar funcionalidades específicas (slides, contador, botões)
  initSlides(mode);
  initCounter(mode, new Date(SITE_DATA[mode].dataInicio));
  initButtons(mode, SITE_DATA[mode]);

  // attach form handler
  const f = main.querySelector("form");
  f.addEventListener("submit", async (e) => {
    e.preventDefault();
    const st = main.querySelector(`#${mode}-form-status`);
    st.textContent = "Enviando...";
    const fd = new FormData(f);
    try {
      const res = await fetch(f.action, { method: "POST", body: fd, headers: { 'Accept': 'application/json' } });
      if (res.ok) { st.textContent = "Mensagem enviada 💌"; f.reset(); }
      else { st.textContent = "Erro ao enviar — tente novamente"; }
    } catch {
      st.textContent = "Erro de conexão.";
    }
    setTimeout(()=> st.textContent = "", 4000);
  });
}

/* ========= Slides (unified, clears previous timers) ========= */
function initSlides(mode) {
  // limpar timer anterior
  if (slideTimer) { clearTimeout(slideTimer); slideTimer = null; }
  // selecionar slides do modo atual
  const selector = mode === "declaracao" ? ".mySlides" : ".mySlides2";
  // if created as mySlides and mySlides2 mixed, but we built only current ones
  const slides = $$(".mySlides").concat($$(".mySlides2"));
  // hide all then show those present
  slides.forEach(s => s.style.display = "none");
  const currentSlides = mode === "declaracao" ? $$(".mySlides") : $$(".mySlides2");
  let idx = 0;
  function show() {
    currentSlides.forEach(s=> s.style.display = "none");
    if (currentSlides.length === 0) return;
    idx = (idx % currentSlides.length);
    currentSlides[idx].style.display = "block";
    idx++;
    slideTimer = setTimeout(show, 4000); // 4s per slide
  }
  show();
}

/* ========= Contador ========= */
let counterInterval = null;
function initCounter(mode, startDate) {
  if (counterInterval) clearInterval(counterInterval);
  function update() {
    const now = Date.now();
    const diff = now - startDate.getTime();
    const dias = Math.floor(diff / (1000*60*60*24));
    const horas = Math.floor((diff / (1000*60*60)) % 24);
    const minutos = Math.floor((diff / (1000*60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);
    const daysEl = $("#main-content #days");
    if (daysEl) {
      $("#main-content #days").textContent = dias;
      $("#main-content #hours").textContent = horas;
      $("#main-content #mins").textContent = minutos;
      $("#main-content #secs").textContent = segundos;
    } else {
      // selectors for the dynamic IDs used in buildUI (if different)
      const d = $("#main-content #days") || $("#main-content #days"); // fallback
      const hours = $("#main-content #hours") || $("#main-content #hours");
    }
    // Also support older structure where ids were days/hours etc.
    const daysAlt = $("#main-content #days");
    if (daysAlt) { daysAlt.textContent = dias; }
    const hoursAlt = $("#main-content #hours"); if (hoursAlt) hoursAlt.textContent = horas;
    const minsAlt = $("#main-content #mins"); if (minsAlt) minsAlt.textContent = minutos;
    const secsAlt = $("#main-content #secs"); if (secsAlt) secsAlt.textContent = segundos;
  }
  // create simple ids inside container so selectors above find them
  // ensure there are elements with ids: days, hours, mins, secs
  const main = $("#main-content");
  if (!main.querySelector("#days")) {
    const timeDiv = main.querySelector(".time");
    if (timeDiv) {
      timeDiv.innerHTML = `<span id="days">0</span> dias • <span id="hours">0</span>h <span id="mins">0</span>m <span id="secs">0</span>s`;
    }
  }
  update();
  counterInterval = setInterval(update, 1000);
}

/* ========= Botões: mensagens/versículos/resposta ========= */
function initButtons(mode, data) {
  // mensagens
  const btnMsg = $("#main-content #btnMsg");
  const boxMsg = $("#main-content #msgBox");
  if (btnMsg && boxMsg) {
    let i = 0;
    btnMsg.onclick = () => {
      boxMsg.classList.add("pink");
      boxMsg.classList.remove("hidden");
      boxMsg.style.display = "block";
      boxMsg.textContent = data.mensagens[i];
      i = (i+1) % data.mensagens.length;
    };
  }
  // versiculos
  const btnV = $("#main-content #btnVers");
  const boxV = $("#main-content #vBox");
  if (btnV && boxV) {
    let j = 0;
    btnV.onclick = () => {
      boxV.classList.add("pink");
      boxV.classList.remove("hidden");
      boxV.style.display = "block";
      boxV.textContent = data.versiculos[j];
      j = (j+1) % data.versiculos.length;
    };
  }
  // resposta dela (only declaracao)
  const btnResp = $("#main-content #btnResp");
  const respBox = $("#main-content #respBox");
  if (btnResp && respBox) {
    let k=0;
    btnResp.onclick = () => {
      respBox.classList.add("pink");
      respBox.classList.remove("hidden");
      respBox.style.display = "block";
      if (data.respostas && data.respostas.length>0) {
        respBox.textContent = data.respostas[k % data.respostas.length];
        k++;
      } else respBox.textContent = "💬";
    };
  }
}

/* ========= Menu switching ========= */
$$(".menu-btn").forEach(btn=>{
  btn.addEventListener("click", () => {
    if (btn.classList.contains("disabled")) return;
    // visual active state
    $$(".menu-btn").forEach(b=> b.classList.remove("active"));
    btn.classList.add("active");
    const mode = btn.dataset.mode;
    if (!mode) return;
    currentMode = mode;
    buildUIForMode(mode);
  });
});

/* ========= Hearts light (CSS animation method, lightweight) ========= */
function startHearts() {
  if (heartsTimer) clearInterval(heartsTimer);
  const container = $("#coracoes");
  heartsTimer = setInterval(() => {
    const d = document.createElement("div");
    d.className = "heart";
    d.textContent = "💗";
    const size = 12 + Math.random()*20;
    d.style.fontSize = size + "px";
    d.style.left = (Math.random() * 100) + "vw";
    const dur = 6 + Math.random()*6;
    d.style.animationDuration = dur + "s";
    container.appendChild(d);
    setTimeout(()=> {
      d.remove();
    }, (dur*1000)+200);
  }, 450);
}
startHearts();

/* ========= inicial ======== */
document.addEventListener("DOMContentLoaded", () => {
  buildUIForMode(currentMode);
});
