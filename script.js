/* script.js - menu, slides, counters, corações, versos, mensagens, formspree */

/* ---------- Fade-in ao rolar ---------- */
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  function check() {
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 80) el.classList.add('show');
    });
  }
  window.addEventListener('scroll', check);
  window.addEventListener('load', check);
  check();
}
initFadeIn();

/* ---------- Slideshows (polaroid) ---------- */
(function slideshow(selector, delay = 4000) {
  let idx = 0;
  const slides = document.querySelectorAll(selector);
  if (!slides || slides.length === 0) return;
  slides.forEach((s, i) => s.style.display = i === 0 ? 'block' : 'none');
  function show() {
    const currentSlides = document.querySelectorAll(selector);
    if (!currentSlides || currentSlides.length === 0) return;
    currentSlides.forEach(s => s.style.display = 'none');
    idx++;
    if (idx > currentSlides.length) idx = 1;
    currentSlides[idx - 1].style.display = 'block';
    setTimeout(show, delay);
  }
  setTimeout(show, delay);
})('.mySlides', 4000);

(function slideshow2() {
  let idx = 0;
  const selector = '.mySlides2';
  const slides = document.querySelectorAll(selector);
  if (!slides || slides.length === 0) return;
  slides.forEach((s, i) => s.style.display = i === 0 ? 'block' : 'none');
  function show() {
    const currentSlides = document.querySelectorAll(selector);
    if (!currentSlides || currentSlides.length === 0) return;
    currentSlides.forEach(s => s.style.display = 'none');
    idx++;
    if (idx > currentSlides.length) idx = 1;
    currentSlides[idx - 1].style.display = 'block';
    setTimeout(show, 4000);
  }
  setTimeout(show, 4000);
})();

/* ---------- Corações flutuantes ---------- */
(function hearts(){
  const container = document.getElementById('coracoes');
  if (!container) return;
  function make() {
    const el = document.createElement('div');
    el.textContent = '❤️';
    const size = Math.random()*18 + 12;
    el.style.position = 'fixed';
    el.style.left = (Math.random() * 100) + 'vw';
    el.style.top = '-40px';
    el.style.fontSize = size + 'px';
    el.style.opacity = (Math.random()*0.6 + 0.25).toString();
    el.style.pointerEvents = 'none';
    el.style.transition = `transform ${6 + Math.random()*6}s linear, opacity ${6 + Math.random()*6}s linear`;
    container.appendChild(el);
    requestAnimationFrame(()=> {
      el.style.transform = `translateY(${window.innerHeight + 120}px) rotate(${(Math.random()*80)-40}deg)`;
      el.style.opacity = '0';
    });
    setTimeout(()=> el.remove(), 9000);
  }
  setInterval(make, 500);
})();

/* ---------- Contador Declaração (inicio 11/08/2025 11:10) ---------- */
(function contadorDeclaracao(){
  const inicio = new Date("August 11, 2025 11:10:00").getTime();
  function atualizar() {
    const agora = Date.now();
    const diff = agora - inicio;
    const dias = Math.floor(diff / (1000*60*60*24));
    const horas = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const minutos = Math.floor((diff % (1000*60*60)) / (1000*60));
    const segundos = Math.floor((diff % (1000*60)) / 1000);
    const setIf = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
    setIf('dias', dias); setIf('horas', horas); setIf('minutos', minutos); setIf('segundos', segundos);
  }
  atualizar();
  setInterval(atualizar, 1000);
})();

/* ---------- Contador Namoro (inicio 09/11/2025 16:20) ---------- */
(function contadorNamoro(){
  const inicio = new Date("November 9, 2025 16:20:00").getTime();
  function atualizar() {
    const agora = Date.now();
    const diff = agora - inicio;
    if (diff < 0) {
      const e = document.getElementById('dias_n'); if (e) e.textContent = '0'; return;
    }
    const dias = Math.floor(diff / (1000*60*60*24));
    const setIf = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setIf('dias_n', dias);
  }
  atualizar();
  setInterval(atualizar, 1000);
})();

/* ---------- Versículos Declaração ---------- */
(function versosDeclaracao(){
  const versos = [
    "O amor é paciente, o amor é bondoso. (1 Coríntios 13:4–7)",
    "Nós amamos porque Ele nos amou primeiro. (1 João 4:19)",
    "O meu mandamento é este: Que vos ameis uns aos outros. (João 15:12)",
    "Acima de tudo, revistam-se do amor, que é o elo perfeito. (Colossenses 3:14)"
  ];
  let i = 0;
  const btn = document.getElementById('btnVersiculo');
  const box = document.getElementById('versiculoBox');
  if (!btn || !box) return;
  btn.addEventListener('click', () => {
    box.classList.remove('visually-hidden');
    box.textContent = versos[i];
    i = (i + 1) % versos.length;
  });
})();

/* ---------- Mensagens Declaração ---------- */
(function mensagensDeclaracao(){
  const msgs = [
    "Que bomm, valeu muito a pena ter caminhado por 3 bairros atrás delas (flores) então kkkk.",
    "A forma como tu chegou foi bem educada e natural, por isso que gostei.",
    "Qualquer coisa que eu faça contigo é muito bom.",
    "Eu também me sinto assim, conversar e ficar perto de ti é muito bom."
  ];
  let idx = 0;
  const btn = document.getElementById('btnCarta');
  const box = document.getElementById('cartaTexto');
  if (!btn || !box) return;
  btn.addEventListener('click', () => {
    box.classList.remove('visually-hidden');
    box.textContent = msgs[idx];
    idx = (idx + 1) % msgs.length;
  });
})();

/* ---------- Versículos Namoro (5 sobre amor) ---------- */
(function versosNamoro(){
  const versos = [
    "O amor é paciente, o amor é bondoso. (1 Coríntios 13:4–7)",
    "Nós amamos porque Ele nos amou primeiro. (1 João 4:19)",
    "Acima de tudo, revistam-se do amor, que é o elo perfeito. (Colossenses 3:14)",
    "Ame o seu próximo como a si mesmo. (Mateus 22:39)",
    "O amor não faz mal ao próximo. (Romanos 13:10)"
  ];
  let i = 0;
  const btn = document.getElementById('btnVersiculoNamoro');
  const box = document.getElementById('versiculoBoxNamoro');
  if (!btn || !box) return;
  btn.addEventListener('click', () => {
    box.classList.remove('visually-hidden');
    box.textContent = versos[i];
    i = (i + 1) % versos.length;
  });
})();

/* ---------- Mensagens Namoro (genéricas) ---------- */
(function mensagensNamoro(){
  const msgs = [
    "Lembra daquele dia que rimos até doer a barriga? Quero repetir sempre.",
    "Tu é meu lugar seguro.",
    "Obrigado por cada cuidado, cada abraço e cada sorriso.",
    "Construindo memórias juntos, um passo de cada vez."
  ];
  let idx = 0;
  const btn = document.getElementById('btnCartaNamoro');
  const box = document.getElementById('cartaTextoNamoro');
  if (!btn || !box) return;
  btn.addEventListener('click', () => {
    box.classList.remove('visually-hidden');
    box.textContent = msgs[idx];
    idx = (idx + 1) % msgs.length;
  });
})();

/* ---------- Formspree handlers (feedback) ---------- */
(function formHandlers(){
  const forms = [
    { id: 'formDeclaracao', statusId: 'formStatusDeclaracao' },
    { id: 'formNamoro', statusId: 'formStatusNamoro' }
  ];
  forms.forEach(f => {
    const form = document.getElementById(f.id);
    const status = document.getElementById(f.statusId);
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (status) status.textContent = 'Enviando...';
      const data = new FormData(form);
      try {
        const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' }});
        if (res.ok) {
          if (status) status.textContent = 'Mensagem enviada 💌';
          form.reset();
        } else {
          const j = await res.json();
          if (status) status.textContent = j.error || 'Erro ao enviar — tente novamente';
        }
      } catch (err) {
        if (status) status.textContent = 'Erro ao enviar — verifique a conexão';
      }
      setTimeout(()=> { if (status) status.textContent = ''; }, 5000);
    });
  });
})();

/* ---------- Menu: troca de seções e Noivado/Casamento loading ---------- */
(function menu(){
  const buttons = document.querySelectorAll('.menu-btn');
  if (!buttons) return;

  function clearActive(){
    document.querySelectorAll('.content-section').forEach(s => {
      s.classList.remove('active');
      s.classList.remove('show');
      s.setAttribute('aria-hidden','true');
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-section');
      if (!target) return;

      // Noivado/Casamento => mudar o próprio botão para carregando e depois mostrar mensagem
      if (target === 'noivado' || target === 'casamento') {
        btn.classList.add('loading');
        btn.textContent = `🌼 Carregando ${target === 'noivado' ? 'Noivado' : 'Casamento'}...`;
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = `🌸 Essa parte ainda está sendo preparada com muito amor 💕`;
          // permanece desabilitado, conforme combinado
        }, 5000);
        return;
      }

      // troca de seção normal
      clearActive();
      const sec = document.getElementById(target);
      if (!sec) return;
      sec.classList.add('active');
      sec.classList.add('show');
      sec.setAttribute('aria-hidden','false');

      // atualizar botão ativo
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();

/* ---------- Toggle resposta Elyse (Declaração) ---------- */
(function toggleResposta(){
  const btn = document.getElementById('btnResposta');
  const box = document.getElementById('declaracaoResposta');
  if (!btn || !box) return;
  btn.addEventListener('click', () => {
    if (box.classList.contains('show')) {
      box.classList.remove('show');
      box.classList.add('visually-hidden');
      btn.textContent = 'Ver o que ela respondeu 💌';
    } else {
      box.classList.remove('visually-hidden');
      box.classList.add('show');
      btn.textContent = 'Esconder resposta 💫';
    }
  });
})();
