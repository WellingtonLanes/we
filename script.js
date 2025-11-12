document.addEventListener('DOMContentLoaded', () => {

  /* ---------- menu / seções ---------- */
  const menuBtns = document.querySelectorAll('.menu-btn');
  const sections = document.querySelectorAll('.section');

  function showSection(id) {
    sections.forEach(s => s.classList.toggle('active', s.id === id));
    menuBtns.forEach(b => b.classList.toggle('ativo', b.dataset.section === id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  showSection('declaracao');

  menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.section;
      if (!target) return;

      // loading for noivado/casamento
      if (btn.classList.contains('loading-btn')) {
        const original = btn.textContent;
        btn.disabled = true;
        btn.textContent = '🌼 Carregando...';
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = original;
          alert('🌸 Essa parte ainda está sendo preparada com muito amor 💕');
        }, 5000);
        return;
      }

      showSection(target);
    });
  });

  /* ---------- slideshow generic (auto + arrows) ---------- */
  function createSlideshow(rootSelector, interval = 4000) {
    const root = document.querySelector(rootSelector);
    if (!root) return;
    const slides = Array.from(root.querySelectorAll('.polaroid'));
    if (!slides.length) return;
    let index = 0;

    // show initial
    slides.forEach((s, i) => s.classList.toggle('active', i === 0));

    function show(i) {
      slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    }

    // auto
    let timer = setInterval(() => {
      index = (index + 1) % slides.length;
      show(index);
    }, interval);

    // arrows
    const prevBtn = root.parentElement.querySelector('.slide-arrow.prev');
    const nextBtn = root.parentElement.querySelector('.slide-arrow.next');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        clearInterval(timer);
        index = (index - 1 + slides.length) % slides.length;
        show(index);
        timer = setInterval(() => { index = (index + 1) % slides.length; show(index); }, interval);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        clearInterval(timer);
        index = (index + 1) % slides.length;
        show(index);
        timer = setInterval(() => { index = (index + 1) % slides.length; show(index); }, interval);
      });
    }

    // pause on hover
    root.addEventListener('mouseenter', () => clearInterval(timer));
    root.addEventListener('mouseleave', () => {
      timer = setInterval(() => { index = (index + 1) % slides.length; show(index); }, interval);
    });
  }

  createSlideshow('.slideshow-decl', 4500);
  createSlideshow('.slideshow-nam', 4500);

  /* ---------- corações vermelhos ---------- */
  (function hearts(){
    const container = document.getElementById('coracoes');
    if (!container) return;
    const reds = ['#ff3b5c', '#e83a62', '#c94057'];
    function makeOne() {
      const d = document.createElement('div');
      d.className = 'coracao';
      d.textContent = '❤';
      d.style.color = reds[Math.floor(Math.random() * reds.length)];
      d.style.left = Math.random() * 100 + 'vw';
      const size = 12 + Math.random() * 26;
      d.style.fontSize = size + 'px';
      d.style.opacity = (0.35 + Math.random() * 0.65).toString();
      d.style.transition = `transform ${6 + Math.random()*4}s linear, opacity ${6 + Math.random()*4}s linear`;
      container.appendChild(d);
      requestAnimationFrame(() => {
        d.style.transform = `translateY(${window.innerHeight + 120}px) rotate(${(Math.random()*80)-40}deg)`;
        d.style.opacity = '0';
      });
      setTimeout(()=> d.remove(), 10000);
    }
    const interval = setInterval(makeOne, 420);
    window.addEventListener('beforeunload', () => clearInterval(interval));
  })();

  /* ---------- contadores ---------- */
  (function counters(){
    const startConhecimento = new Date('2025-08-11T11:10:00').getTime();
    const startNamoro = new Date('2025-11-09T16:20:00').getTime();

    function update() {
      const now = Date.now();

      // conhecimento
      const diffC = Math.max(0, now - startConhecimento);
      const diasC = Math.floor(diffC / (1000*60*60*24));
      const horasC = Math.floor((diffC / (1000*60*60)) % 24);
      const minutosC = Math.floor((diffC / (1000*60)) % 60);
      const segundosC = Math.floor((diffC / 1000) % 60);
      const elIdsC = ['diasConhecimento','horasConhecimento','minutosConhecimento','segundosConhecimento'];
      [diasC, horasC, minutosC, segundosC].forEach((v, idx) => {
        const el = document.getElementById(elIdsC[idx]); if (el) el.textContent = v;
      });

      // namoro
      const diffN = Math.max(0, now - startNamoro);
      const diasN = Math.floor(diffN / (1000*60*60*24));
      const horasN = Math.floor((diffN / (1000*60*60)) % 24);
      const minutosN = Math.floor((diffN / (1000*60)) % 60);
      const segundosN = Math.floor((diffN / 1000) % 60);
      const elIdsN = ['diasNamoro','horasNamoro','minutosNamoro','segundosNamoro'];
      [diasN, horasN, minutosN, segundosN].forEach((v, idx) => {
        const el = document.getElementById(elIdsN[idx]); if (el) el.textContent = v;
      });
    }

    update();
    setInterval(update, 1000);
  })();

  /* ---------- versos & mensagens (declaração) ---------- */
  (function declContent(){
    const versos = [
      "O amor é paciente, o amor é bondoso. (1 Coríntios 13:4–7)",
      "Nós amamos porque Ele nos amou primeiro. (1 João 4:19)",
      "Acima de tudo, revistam-se do amor. (Colossenses 3:14)"
    ];
    let vi = 0;
    const btnV = document.getElementById('btnVersiculo');
    const boxV = document.getElementById('versiculoBox');
    if (btnV && boxV) btnV.addEventListener('click', () => { boxV.classList.toggle('hidden'); boxV.textContent = versos[vi]; vi = (vi + 1) % versos.length; });

    const msgs = [
      "Que bom, valeu a pena andar atrás das flores com você kkk.",
      "A forma como tu chegou foi natural e educada; gostei.",
      "Acordei sorrindo lembrando da nossa conversa kkk."
    ];
    let mi = 0;
    const btnM = document.getElementById('btnCarta');
    const boxM = document.getElementById('cartaTexto');
    if (btnM && boxM) btnM.addEventListener('click', () => { boxM.classList.toggle('hidden'); boxM.textContent = msgs[mi]; mi = (mi + 1) % msgs.length; });
  })();

  /* ---------- versos & mensagens (namoro) ---------- */
  (function namContent(){
    const versos = [
      "O amor é paciente, o amor é bondoso. (1 Coríntios 13:4–7)",
      "Nós amamos porque Ele nos amou primeiro. (1 João 4:19)",
      "Ama o teu próximo como a ti mesmo. (Mateus 22:39)"
    ];
    let vi = 0;
    const btnV = document.getElementById('btnVersiculoNamoro');
    const boxV = document.getElementById('versiculoBoxNamoro');
    if (btnV && boxV) btnV.addEventListener('click', () => { boxV.classList.toggle('hidden'); boxV.textContent = versos[vi]; vi = (vi + 1) % versos.length; });

    const msgs = [
      "Lembra daquele dia que rimos até doer a barriga? Quero repetir sempre.",
      "Tu é meu lugar seguro.",
      "Obrigado por cada cuidado, cada abraço e cada sorriso."
    ];
    let mi = 0;
    const btnM = document.getElementById('btnCartaNamoro');
    const boxM = document.getElementById('cartaTextoNamoro');
    if (btnM && boxM) btnM.addEventListener('click', () => { boxM.classList.toggle('hidden'); boxM.textContent = msgs[mi]; mi = (mi + 1) % msgs.length; });
  })();

  /* ---------- forms (Formspree) ---------- */
  (function forms(){
    const list = [
      { id:'formDeclaracao', status:'formStatusDeclaracao' },
      { id:'formNamoro', status:'formStatusNamoro' }
    ];
    list.forEach(cfg => {
      const form = document.getElementById(cfg.id);
      const status = document.getElementById(cfg.status);
      if (!form) return;
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (status) status.textContent = 'Enviando...';
        const data = new FormData(form);
        try {
          const res = await fetch(form.action, { method:'POST', body: data, headers: { 'Accept':'application/json' }});
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
        setTimeout(()=> { if (status) status.textContent = ''; }, 4000);
      });
    });
  })();

  /* ---------- resposta toggle ---------- */
  (function replyToggle(){
    const btn = document.getElementById('btnResposta');
    const box = document.getElementById('respostaTexto');
    if (!btn || !box) return;
    btn.addEventListener('click', () => box.classList.toggle('hidden'));
  })();

}); // DOMContentLoaded end
