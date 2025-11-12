/* main script: troca de conteúdo (Declaração / Namoro),
   slideshow automático 5s, contadores (duas datas),
   versículos (random), mensagens, formulário (Formspree),
   resposta dela somente na Declaração, e corações caindo.
*/

document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main');
  const menuBtns = document.querySelectorAll('.menu-btn');

  // dados de conteúdo
  const CONTENT = {
    declaracao: {
      fotos: Array.from({length:9}, (_,i)=> `imagens/foto${i+1}.jpg`),
      inicio: new Date('2025-08-11T11:10:00'),
      texto: [
        `"Oii, paz, prazer kkkk" foi assim que me apresentei...`,
        `Eu te acho muito linda, eu poderia olhar pro teu sorriso e pro teu olhar o dia todo kkkk.`,
        `Quero te dar muitos brigadeiros, flores e tirar fotos do pôr do sol juntos.`
      ],
      versiculos: [
        "O amor é paciente, o amor é bondoso. (1 Coríntios 13:4–7)",
        "Nós amamos porque Ele nos amou primeiro. (1 João 4:19)",
        "Acima de tudo, revistam-se do amor, que é o elo perfeito. (Colossenses 3:14)",
        "Façam tudo com amor. (1 Coríntios 16:14)"
      ],
      mensagens: [
        "Que bom, valeu a pena andar atrás das flores com você kkk.",
        "Qualquer coisa que eu faça contigo é muito bom.",
        "Acordei sorrindo lembrando da nossa conversa kkk."
      ],
      temResposta: true
    },
    namoro: {
      fotos: Array.from({length:10}, (_,i)=> `imagens/fotos${i+10}.jpg`),
      inicio: new Date('2025-11-09T16:20:00'),
      texto: [
        `Nosso namoro começou leve, com muitos sorrisos e orações...`,
        `Que Deus continue sendo o centro de tudo!`,
      ],
      versiculos: [
        "O amor é paciente, o amor é bondoso. (1 Coríntios 13:4–7)",
        "Nós amamos porque Ele nos amou primeiro. (1 João 4:19)",
        "Acima de tudo, revistam-se do amor. (Colossenses 3:14)",
        "Ama o teu próximo como a ti mesmo. (Mateus 22:39)",
        "O amor não faz mal ao próximo. (Romanos 13:10)"
      ],
      mensagens: [
        "Lembra daquele dia que rimos até doer a barriga? Quero repetir sempre.",
        "Tu é meu lugar seguro.",
        "Obrigado por cada abraço e cada cuidado."
      ],
      temResposta: false
    }
  };

  // inicial: carregar declaração
  let active = 'declaracao';
  carregarSecao(active);

  // menu handlers
  menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;
      const target = btn.dataset.section;
      if (!target) return;
      if (target === active) return;
      // update active class on menu
      menuBtns.forEach(b => b.classList.toggle('active', b.dataset.section === target));
      active = target;
      carregarSecao(target);
    });
  });

  /* ---------- função que monta e injeta o HTML para a seção --------- */
  let slideInterval = null;
  let contadorInterval = null;

  function carregarSecao(key) {
    // cleanup timers
    if (slideInterval) { clearInterval(slideInterval); slideInterval = null; }
    if (contadorInterval) { clearInterval(contadorInterval); contadorInterval = null; }

    const data = CONTENT[key];

    // build slideshow HTML (one visible slide at a time)
    const slidesHTML = data.fotos.map((src, i) => `
      <div class="slide ${i===0 ? 'active' : ''}">
        <div class="polaroid-frame">
          <img src="${src}" alt="foto${i+1}" class="photo" loading="lazy">
          <div class="polaroid-caption">Foto ${i+1}</div>
        </div>
      </div>
    `).join('');

    // build textual paragraphs
    const textoHTML = data.texto.map(t => `<p>${t}</p>`).join('');

    // build versiculos and mensagens placeholders (white inner)
    const cardVersos = `
      <div class="card">
        <h2>Versículos Bíblicos 📖</h2>
        <div class="inner" id="versiculosBox">
          <p>${data.versiculos[0]}</p>
        </div>
        <div class="center"><button class="btn" id="btnVersiculo">Mostrar versículo</button></div>
      </div>
    `;

    const cardMensagens = `
      <div class="card">
        <h2>Nossas Mensagens 💌</h2>
        <div class="inner" id="mensagensBox">
          <p>${data.mensagens[0]}</p>
        </div>
        <div class="center"><button class="btn" id="btnMensagem">Mostrar mensagem</button></div>
      </div>
    `;

    const contadorCard = `
      <div class="card">
        <h2>Tempo ${key === 'declaracao' ? 'que nos conhecemos' : 'de namoro'} ⏳</h2>
        <div class="inner center"><p id="contadorBox" style="font-weight:700;"></p></div>
      </div>
    `;

    const formCard = `
      <div class="card">
        <h2>Enviar uma mensagem 💬</h2>
        <div class="inner">
          <form id="formMensagem" action="https://formspree.io/f/xovkwzej" method="POST">
            <div class="form-row">
              <input type="text" name="name" placeholder="Seu nome" required>
            </div>
            <div class="form-row">
              <input type="email" name="email" placeholder="Seu e-mail" required>
            </div>
            <div class="form-row">
              <textarea name="message" rows="4" placeholder="Escreva sua mensagem..." required></textarea>
            </div>
            <div class="center"><button type="submit" class="btn">Enviar mensagem</button></div>
            <div id="formStatus" class="center" aria-live="polite" style="margin-top:8px;"></div>
          </form>
        </div>
      </div>
    `;

    // resposta dela (only on declaration, below form)
    const respostaHTML = data.temResposta ? `
      <div class="card resposta-area">
        <h2>Resposta dela 💌</h2>
        <div class="inner" id="respostaInner">
          <div class="center"><button id="btnMostrarResposta" class="btn">Mostrar resposta dela</button></div>
          <div id="respostaTexto" class="inner visually-hidden" style="margin-top:10px; text-align:center;"></div>
        </div>
      </div>
    ` : '';

    // final assembled HTML for main
    main.innerHTML = `
      <div class="block slideshow-wrap">
        <div class="slideshow" aria-live="polite">${slidesHTML}</div>
      </div>

      <div class="block">
        <div class="paper">${textoHTML}</div>
      </div>

      <div class="stack" style="width:100%; max-width:760px;">
        ${contadorCard}
        ${cardVersos}
        ${cardMensagens}
        ${formCard}
        ${respostaHTML}
      </div>
    `;

    // make fade-in visible
    requestAnimationFrame(()=> {
      document.querySelectorAll('.block, .card').forEach(el => el.classList.add('fade-in', 'show'));
    });

    // slideshow logic: show each slide for 5 seconds
    const slides = Array.from(document.querySelectorAll('.slideshow .slide'));
    let idx = 0;
    function showSlide(i) {
      slides.forEach((s, j) => s.classList.toggle('active', i === j));
    }
    showSlide(0);
    slideInterval = setInterval(() => {
      idx = (idx + 1) % slides.length;
      showSlide(idx);
    }, 5000);

    // contador logic
    const contadorEl = document.getElementById('contadorBox');
    function atualizarContador() {
      const now = new Date();
      const diff = Math.max(0, now - data.inicio);
      const dias = Math.floor(diff / (1000*60*60*24));
      const horas = Math.floor((diff / (1000*60*60)) % 24);
      const minutos = Math.floor((diff / (1000*60)) % 60);
      const segundos = Math.floor((diff / 1000) % 60);
      if (contadorEl) contadorEl.textContent = `${dias} dias, ${horas}h ${minutos}m ${segundos}s`;
    }
    atualizarContador();
    contadorInterval = setInterval(atualizarContador, 1000);

    // versiculo button
    const btnV = document.getElementById('btnVersiculo');
    const versBox = document.getElementById('versiculosBox');
    let vIdx = 0;
    if (btnV && versBox) {
      btnV.addEventListener('click', () => {
        vIdx = (vIdx + 1) % data.versiculos.length;
        versBox.innerHTML = `<p>${data.versiculos[vIdx]}</p>`;
        // keep inner white area same format
      });
    }

    // mensagem button
    const btnM = document.getElementById('btnMensagem');
    const msgBox = document.getElementById('mensagensBox');
    let mIdx = 0;
    if (btnM && msgBox) {
      btnM.addEventListener('click', () => {
        mIdx = (mIdx + 1) % data.mensagens.length;
        msgBox.innerHTML = `<p>${data.mensagens[mIdx]}</p>`;
      });
    }

    // form submit (Formspree) - feedback only
    const form = document.getElementById('formMensagem');
    const statusEl = document.getElementById('formStatus');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (statusEl) statusEl.textContent = 'Enviando...';
        const fd = new FormData(form);
        try {
          const res = await fetch(form.action, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' }});
          if (res.ok) {
            if (statusEl) statusEl.textContent = 'Mensagem enviada 💌';
            form.reset();
          } else {
            const j = await res.json().catch(()=> null);
            if (statusEl) statusEl.textContent = (j && j.error) ? j.error : 'Erro ao enviar — tente novamente';
          }
        } catch (err) {
          if (statusEl) statusEl.textContent = 'Erro ao enviar — verifique a conexão';
        }
        setTimeout(()=> { if (statusEl) statusEl.textContent = ''; }, 4000);
      });
    }

    // resposta dela button (only for declaracao)
    const btnResp = document.getElementById('btnMostrarResposta');
    const respTexto = document.getElementById('respostaTexto');
    if (btnResp && respTexto) {
      btnResp.addEventListener('click', () => {
        respTexto.classList.remove('visually-hidden');
        respTexto.innerHTML = `<p>"Quando li tua mensagem meu coração sorriu... 💕"</p>`;
        btnResp.style.display = 'none';
      });
    }

    // ensure page top (smooth)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } // end carregarSecao

  // initial state already loaded earlier; but call again to ensure first load
  carregarSecao(active);

  /* ---------- hearts falling (red only) ---------- */
  const heartsContainer = document.getElementById('coracoes');
  (function startHearts() {
    const redShades = ['#e23a5f','#d42855','#c21f4c'];
    function makeHeart() {
      const d = document.createElement('div');
      d.className = 'heart';
      d.textContent = '❤';
      d.style.left = Math.random() * 100 + 'vw';
      const size = 12 + Math.random() * 26;
      d.style.fontSize = size + 'px';
      d.style.color = redShades[Math.floor(Math.random()*redShades.length)];
      d.style.opacity = (0.5 + Math.random()*0.5).toString();
      const dur = 4 + Math.random()*4; // seconds
      d.style.animationDuration = dur + 's';
      heartsContainer.appendChild(d);
      setTimeout(()=> d.remove(), (dur+0.5)*1000);
    }
    setInterval(makeHeart, 420);
  })();

}); // DOMContentLoaded end
