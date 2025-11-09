/* script.js - integrado com todas as funcionalidades combinadas */

/* ---- Fade-in on scroll ---- */
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

/* ---- Slideshow for section "declaracao" (foto1..9) ---- */
(function slideshowMain(){
  let idx = 0;
  const slides = document.querySelectorAll('.mySlides');
  if (!slides || slides.length===0) return;
  function show(){
    slides.forEach(s => s.style.display = 'none');
    idx++;
    if (idx > slides.length) idx = 1;
    slides[idx-1].style.display = 'block';
    setTimeout(show, 3500);
  }
  show();
})();

/* ---- Slideshow for section "namoro" (fotos10..19) ---- */
(function slideshowNamoro(){
  let idx2 = 0;
  const slides = document.querySelectorAll('.mySlides2');
  if (!slides || slides.length===0) return;
  function show(){
    slides.forEach(s => s.style.display = 'none');
    idx2++;
    if (idx2 > slides.length) idx2 = 1;
    slides[idx2-1].style.display = 'block';
    setTimeout(show, 3500);
  }
  show();
})();

/* ---- Hearts falling (creates span elements) ---- */
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

/* ---- Contador (mantém teu data original) ---- */
(function contador(){
  // usa a data que tu definiu antes; ajusta se quiser
  const dataInicio = new Date("August 11, 2025 11:10:00").getTime();
  function atualizar(){
    const agora = Date.now();
    const diff = agora - dataInicio;
    const dias = Math.floor(diff / (1000*60*60*24));
    const horas = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const minutos = Math.floor((diff % (1000*60*60)) / (1000*60));
    const segundos = Math.floor((diff % (1000*60)) / 1000);
    const eDias = document.getElementById('dias');
    const eHoras = document.getElementById('horas');
    const eMinutos = document.getElementById('minutos');
    const eSegundos = document.getElementById('segundos');
    if(eDias) eDias.textContent = dias;
    if(eHoras) eHoras.textContent = horas;
    if(eMinutos) eMinutos.textContent = minutos;
    if(eSegundos) eSegundos.textContent = segundos;

    // simple counter for namoro page
    const dN = document.getElementById('dias_n');
    if(dN) dN.textContent = dias;
  }
  setInterval(atualizar, 1000);
  atualizar();
})();

/* ---- Versículos (bot) ---- */
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

/* ---- Formspree handler (feedback) ---- */
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
      if(status) status.textContent = 'Erro ao enviar — verifique sua conexão';
    }
    setTimeout(()=> { if(status) status.textContent = ''; }, 5000);
  });
})();

/* ---- Menu: troca de seções (tudo na mesma página) ---- */
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

      // If Noivado or Casamento -> only animate the button to 'loading' (do not switch sections)
      if(target === 'noivado' || target === 'casamento'){
        // put loading state on this button and set text accordingly
        btn.classList.add('loading');
        // show full label with name
        btn.textContent = `🌼 Carregando ${target === 'noivado' ? 'Noivado' : 'Casamento'}...`;
        // leave the button in loading state permanently (per your last instruction)
        btn.disabled = true;
        // do not switch sections
        return;
      }

      // for normal sections (declaracao, namoro) switch content
      clearActive();
      const sec = document.getElementById(target);
      if(!sec) return;
      sec.classList.add('active');
      sec.classList.add('show');
      sec.setAttribute('aria-hidden','false');

      // update menu active styles
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // scroll to top smoothly so header not hidden by fixed menu
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();

/* ---- Toggle resposta dela (só na seção Declaração) ---- */
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
      // optional: small hearts or focus
    }
  });
})();
