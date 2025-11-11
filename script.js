/* script.js - integra todas as funcionalidades */

/* ---- Fade-in ao rolar ---- */
function initFadeIn(){
  const els = document.querySelectorAll('.fade-in');
  function check(){
    els.forEach(el=>{
      const r = el.getBoundingClientRect();
      if(r.top < window.innerHeight - 80) el.classList.add('show');
    });
  }
  window.addEventListener('scroll', check);
  window.addEventListener('load', check);
  check();
}
initFadeIn();

/* ---- Slideshows ---- */
(function slideshow(selector, delay=3500){
  let idx = 0;
  const slides = document.querySelectorAll(selector);
  if(!slides || slides.length===0) return;
  function show(){
    slides.forEach(s => s.style.display = 'none');
    idx++;
    if(idx > slides.length) idx = 1;
    slides[idx-1].style.display = 'block';
    setTimeout(show, delay);
  }
  show();
})('.mySlides', 3500);
(function(){ slideshow('.mySlides2', 3500); })();

/* ---- Corações flutuantes ---- */
(function hearts(){
  const container = document.getElementById('coracoes');
  if(!container) return;
  function make(){
    const s = document.createElement('span');
    s.textContent = '❤️';
    const size = Math.random()*18 + 10;
    s.style.position = 'fixed';
    s.style.left = Math.random()*100 + 'vw';
    s.style.top = '-40px';
    s.style.fontSize = size + 'px';
    s.style.opacity = (Math.random()*0.6 + 0.3).toString();
    s.style.pointerEvents = 'none';
    s.style.zIndex = 0;
    s.style.transition = `transform ${6 + Math.random()*6}s linear, opacity ${6 + Math.random()*6}s linear`;
    container.appendChild(s);
    requestAnimationFrame(()=> {
      s.style.transform = `translateY(${window.innerHeight + 120}px) rotate(${(Math.random()*80)-40}deg)`;
      s.style.opacity = '0';
    });
    setTimeout(()=> s.remove(), 9000);
  }
  setInterval(make, 500);
})();

/* ---- Contador ---- */
(function contador(){
  const dataInicio = new Date("August 11, 2025 11:10:00").getTime(); // ajusta se quiser
  function atualizar(){
    const agora = Date.now();
    const diff = agora - dataInicio;
    const dias = Math.floor(diff / (1000*60*60*24));
    const horas = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const minutos = Math.floor((diff % (1000*60*60)) / (1000*60));
    const segundos = Math.floor((diff % (1000*60)) / 1000);
    const setIf = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
    setIf('dias', dias); setIf('horas', horas); setIf('minutos', minutos); setIf('segundos', segundos);
    setIf('dias_n', dias);
  }
  setInterval(atualizar, 1000);
  atualizar();
})();

/* ---- Versículos ---- */
(function versos(){
  const versos = [
    "O amor é paciente, o amor é bondoso. (1 Coríntios 13:4–7)",
    "Nós amamos porque Ele nos amou primeiro. (1 João 4:19)",
    "O amor não faz mal ao próximo. (Romanos 13:10)",
    "Ame o Senhor... e ame ao próximo. (Mateus 22:37-39)"
  ];
  let i = 0;
  const btn = document.getElementById('btnVersiculo');
  const box = document.getElementById('versiculoBox');
  if(!btn || !box) return;
  btn.addEventListener('click', ()=>{
    box.classList.remove('visually-hidden');
    box.textContent = versos[i];
    i = (i+1) % versos.length;
  });
})();

/* ---- Mensagens (carta) ---- */
(function cartas(){
  const frases = [
    "Que bomm, valeu muito a pena ter caminhado por 3 bairros atrás delas (flores) então kkkk. Eu caminharia de novooo.",
    "Mas a forma como tu chegou foi bem educada e natural, por isso que gostei.",
    "Qualquer coisa que eu faça contigo é muito bom.",
    "Eu também me sinto assim, conversar e ficar perto de ti é muito bom."
  ];
  let idx = 0;
  const btn = document.getElementById('btnCarta');
  const box = document.getElementById('cartaTexto');
  if(!btn || !box) return;
  btn.addEventListener('click', ()=>{
    box.classList.remove('visually-hidden');
    box.textContent = frases[idx];
    idx = (idx + 1) % frases.length;
  });
})();

/* ---- Formspree handler ---- */
(function formHandler(){
  const form = document.getElementById('formMensagem');
  const status = document.getElementById('formStatus');
  if(!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(status) status.textContent = 'Enviando...';
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, { method:'POST', body:data, headers:{'Accept':'application/json'} });
      if(res.ok){
        if(status) status.textContent = 'Mensagem enviada 💌';
        form.reset();
      } else {
        const j = await res.json();
        if(status) status.textContent = j.error || 'Erro ao enviar — tente novamente';
      }
    } catch(err){
      if(status) status.textContent = 'Erro ao enviar — verifique a conexão';
    }
    setTimeout(()=> { if(status) status.textContent = ''; }, 5000);
  });
})();

/* ---- Toggle de seções pelo menu (tudo na mesma página) ---- */
(function menu(){
  const buttons = document.querySelectorAll('.menu-btn');
  if(!buttons) return;
  function clearActive(){
    document.querySelectorAll('.content-section').forEach(s=>{
      s.classList.remove('active');
      s.classList.remove('show');
      s.setAttribute('aria-hidden','true');
    });
  }
  buttons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const target = btn.getAttribute('data-section');
      if(!target) return;

      // if Noivado or Casamento: only change the button to loading state (do NOT switch section)
      if(target === 'noivado' || target === 'casamento'){
        btn.classList.add('loading');
        btn.textContent = `🌼 Carregando ${target === 'noivado' ? 'Noivado' : 'Casamento'}...`;
        btn.disabled = true; // stays in loading state (per your request)
        return;
      }

      // otherwise switch section
      clearActive();
      const sec = document.getElementById(target);
      if(!sec) return;
      sec.classList.add('active');
      sec.classList.add('show');
      sec.setAttribute('aria-hidden','false');

      // mark menu active
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();

/* ---- Toggle resposta dela (apenas na seção Declaração) ---- */
(function toggleResposta(){
  const btn = document.getElementById('btnResposta');
  const box = document.getElementById('declaracaoResposta');
  if(!btn || !box) return;
  btn.addEventListener('click', ()=>{
    if(box.classList.contains('show')){
      box.classList.remove('show');
      box.classList.add('visually-hidden');
      btn.textContent = 'Ver o que ela respondeu 💌';
    } else {
      box.classList.remove('visually-hidden');
      box.classList.add('show');
      btn.textContent = 'Esconder resposta 💫';
      // optional: add little hearts when opened (you said no extra needed)
    }
  });
})();
