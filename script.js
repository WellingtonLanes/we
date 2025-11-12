/* script.js - mantém tudo numa página.
   - troca conteúdo (declaração / namoro) sem recarregar
   - slideshow automático 5s (polaroids 350x250)
   - contadores separados (datas diferentes)
   - versículos e mensagens com botão para trocar
   - formulário enviando para Formspree com feedback
   - resposta dela APENAS na declaração (botão abaixo do formulário)
   - corações vermelhos caindo (não girando)
   - fallback SVG para imagens que não existam
*/

document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main');
  const menuBtns = document.querySelectorAll('.menu-btn');

  // Conteúdo (você pode editar textos/imagens aqui)
  const CONTENT = {
    declaracao: {
      fotos: Array.from({length:9}, (_,i) => `imagens/foto${i+1}.jpg`),
      inicio: new Date('2025-08-11T11:10:00'),
      texto: [
        `"Oii, paz, prazer kkkk" foi assim que me apresentei e assim queria começar esse texto...`,
        `Eu te acho muito linda, eu poderia olhar pro teu sorriso e pro teu olhar o dia todo kkkk.`,
        `Quero te dar muitos brigadeiros, flores e tirar fotos do pôr do sol com você.`
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
      temResposta: true,
      respostaTexto: `"Quando li tua mensagem meu coração sorriu... 💕"`
    },
    namoro: {
      fotos: Array.from({length:10}, (_,i) => `imagens/fotos${i+10}.jpg`),
      inicio: new Date('2025-11-09T16:20:00'),
      texto: [
        `Nosso namoro começou leve, com muitos sorrisos e orações...`,
        `Que Deus continue sendo o centro de tudo.`
      ],
      versiculos: [
        "O amor é paciente, o amor é bondoso. (1 Coríntios 13:4–7)",
        "Nós amamos porque Ele nos amou primeiro. (1 João 4:19)",
        "Ama o teu próximo como a ti mesmo. (Mateus 22:39)",
        "O amor não faz mal ao próximo. (Romanos 13:10)",
        "Acima de tudo, revistam-se do amor. (Colossenses 3:14)"
      ],
      mensagens: [
        "Lembra daquele dia que rimos até doer a barriga? Quero repetir sempre.",
        "Tu é meu lugar seguro.",
        "Obrigado por cada cuidado e abraço."
      ],
      temResposta: false
    }
  };

  // placeholder SVG data URI used when image fails (so no broken icon shows)
  const svgPlaceholder = (label) => {
    const text = encodeURIComponent(label || 'Imagem indisponível');
    return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='%23f3e9ec'/><text x='50%' y='50%' font-size='20' fill='%23888888' dominant-baseline='middle' text-anchor='middle'>${text}</text></svg>`;
  };

  // initial active
  let active = 'declaracao';
  carregarSecao(active);

  // menu click handlers
  menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;
      const sec = btn.dataset.section;
      if (!sec) return;
      if (sec === active) return;
      menuBtns.forEach(b => b.classList.toggle('ativo', b.dataset.section === sec));
      active = sec;
      carregarSecao(sec);
    });
  });

  // timers holders
  let slideTimer = null;
  let contadorTimer = null;

  function carregarSecao(key) {
    // cleanup timers
    if (slideTimer) { clearInterval(slideTimer); slideTimer = null; }
    if (contadorTimer) { clearInterval(contadorTimer); contadorTimer = null; }

    const data = CONTENT[key];

    // build slideshow HTML
    const slidesHTML = data.fotos.map((src, i) => `
      <div class="slide ${i===0 ? 'active' : ''}">
        <div class="polaroid-frame">
          <img src="${src}" alt="foto${i+1}" class="photo" onerror="this.onerror=null;this.src='${svgPlaceholder('Imagem não encontrada')}'">
          <div class="polaroid-caption">Foto ${i+1}</div>
        </div>
      </div>
    `).join('');

    // build paragraphs text
    const textoHTML = data.texto.map(p => `<p>${p}</p>`).join('');

    // HTML montagem
    main.innerHTML = `
      <div class="block slideshow-wrap fade-in">
        <div class="slideshow" aria-live="polite">${slidesHTML}</div>
      </div>

      <div class="block fade-in">
        <div class="paper">${textoHTML}</div>
      </div>

      <div class="stack fade-in">
        <div class="card">
          <h2>Tempo ${key === 'declaracao' ? 'que nos conhecemos' : 'de namoro'} ⏳</h2>
          <div class="inner center"><p id="contadorBox" style="font-weight:700;"></p></div>
        </div>

        <div class="card">
          <h2>Versículos Bíblicos 📖</h2>
          <div class="inner" id="versiculosBox"><p>${data.versiculos[0]}</p></div>
          <div class="center" style="margin-top:8px;"><button id="btnVersiculo" class="btn">Mostrar versículo</button></div>
        </div>

        <div class="card">
          <h2>Nossas Mensagens 💌</h2>
          <div class="inner" id="mensagensBox"><p>${data.mensagens[0]}</p></div>
          <div class="center" style="margin-top:8px;"><button id="btnMensagem" class="btn">Mostrar mensagem</button></div>
        </div>

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

        ${data.temResposta ? `
        <div class="card resposta-area">
          <h2>Resposta dela 💌</h2>
          <div class="inner center" id="respostaInner">
            <button id="btnMostrarResposta" class="btn">Mostrar resposta dela</button>
            <div id="respostaTexto" class="visually-hidden" style="margin-top:10px; text-align:center;"></div>
          </div>
        </div>` : ''}

      </div>
    `;

    // fade-in show
    requestAnimationFrame(()=> {
      document.querySelectorAll('.fade-in').forEach(el => el.classList.add('show'));
    });

    // slideshow logic
    const slides = Array.from(document.querySelectorAll('.slideshow .slide'));
    let idx = 0;
    function show(i) { slides.forEach((s,j)=> s.classList.toggle('active', i===j)); }
    show(0);
    // auto-advance every 5s
    slideTimer = setInterval(()=> {
      idx = (idx + 1) % slides.length;
      show(idx);
    }, 5000);
    // pause on hover
    const slideshowEl = document.querySelector('.slideshow');
    slideshowEl.addEventListener('mouseenter', ()=> { if (slideTimer) clearInterval(slideTimer); });
    slideshowEl.addEventListener('mouseleave', ()=> {
      slideTimer = setInterval(()=> { idx = (idx + 1) % slides.length; show(idx); }, 5000);
    });

    // contador
    const contadorEl = document.getElementById('contadorBox');
    function atualizarContador(){ 
      const now = new Date();
      const diff = Math.max(0, now - data.inicio);
      const dias = Math.floor(diff / (1000*60*60*24));
      const horas = Math.floor((diff / (1000*60*60)) % 24);
      const minutos = Math.floor((diff / (1000*60)) % 60);
      const segundos = Math.floor((diff / 1000) % 60);
      if (contadorEl) contadorEl.textContent = `${dias} dias, ${horas}h ${minutos}m ${segundos}s`;
    }
    atualizarContador();
    contadorTimer = setInterval(atualizarContador, 1000);

    // versiculos button
    const btnV = document.getElementById('btnVersiculo');
    const versBox = document.getElementById('versiculosBox');
    let vIdx = 0;
    if (btnV && versBox){
      btnV.addEventListener('click', () => {
        vIdx = (vIdx + 1) % data.versiculos.length;
        versBox.innerHTML = `<p>${data.versiculos[vIdx]}</p>`;
      });
    }

    // mensagens button
    const btnM = document.getElementById('btnMensagem');
    const msgBox = document.getElementById('mensagensBox');
    let mIdx = 0;
    if (btnM && msgBox){
      btnM.addEventListener('click', () => {
        mIdx = (mIdx + 1) % data.mensagens.length;
        msgBox.innerHTML = `<p>${data.mensagens[mIdx]}</p>`;
      });
    }

    // form handler (Formspree feedback)
    const form = document.getElementById('formMensagem');
    const statusEl = document.getElementById('formStatus');
    if (form){
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (statusEl) statusEl.textContent = 'Enviando...';
        const fd = new FormData(form);
        try {
          const res = await fetch(form.action, { method:'POST', body: fd, headers: { 'Accept':'application/json' }});
          if (res.ok) {
            if (statusEl) statusEl.textContent = 'Mensagem enviada 💌';
            form.reset();
          } else {
            const j = await res.json().catch(()=>null);
            if (statusEl) statusEl.textContent = (j && j.error) ? j.error : 'Erro ao enviar — tente novamente';
          }
        } catch (err) {
          if (statusEl) statusEl.textContent = 'Erro ao enviar — verifique a conexão';
        }
        setTimeout(()=> { if (statusEl) statusEl.textContent = ''; }, 4000);
      });
    }

    // resposta dela (only for declaration)
    const btnResp = document.getElementById('btnMostrarResposta');
    const respTexto = document.getElementById('respostaTexto');
    if (btnResp && respTexto){
      btnResp.addEventListener('click', () => {
        respTexto.classList.remove('visually-hidden');
        respTexto.innerHTML = `<p>${data.respostaTexto}</p>`;
        btnResp.style.display = 'none';
      });
    }

    // scroll top smooth
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } // fim carregarSecao

  // start with active
  carregarSecao(active);

  // hearts falling (red)
  const heartsContainer = document.getElementById('coracoes');
  (function startHearts(){
    const colors = ['#ff304f','#e23a5f','#d42855'];
    function make(){
      const d = document.createElement('div');
      d.className = 'heart';
      d.textContent = '❤';
      d.style.left = Math.random()*100 + 'vw';
      const size = 10 + Math.random()*26;
      d.style.fontSize = size + 'px';
      d.style.color = colors[Math.floor(Math.random()*colors.length)];
      d.style.opacity = (0.5 + Math.random()*0.5).toString();
      const dur = 4 + Math.random()*4;
      d.style.animationDuration = dur + 's';
      heartsContainer.appendChild(d);
      setTimeout(()=> d.remove(), (dur+0.2)*1000);
    }
    setInterval(make, 420);
  })();

}); // DOMContentLoaded end
