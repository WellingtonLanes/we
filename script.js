/* script.js - final: seções, slides, corações, contadores, versos, mensagens, forms, carregando */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Seções / Menu ---------- */
  const menuBtns = document.querySelectorAll('.menu-btn');
  const sections = document.querySelectorAll('.section');

  function showSection(id) {
    sections.forEach(s => s.classList.toggle('active', s.id === id));
    menuBtns.forEach(b => b.classList.toggle('ativo', b.dataset.section === id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // initial
  showSection('declaracao');

  menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.section;
      if (!target) return;

      if (target === 'noivado' || target === 'casamento') {
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = '🌼 Carregando...';
        // static margarida (no rotation)
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = originalText;
          alert('🌸 Essa parte ainda está sendo preparada com muito amor 💕');
        }, 5000);
        return;
      }

      showSection(target);
    });
  });

  /* ---------- Slideshows (declaração / namoro) ---------- */
  (function slideshow(selectorRoot, interval = 4000) {
    const root = document.querySelector(selectorRoot);
    if (!root) return;
    const slides = Array.from(root.querySelectorAll('.polaroid'));
    if (!slides.length) return;
    let i = 0;
    slides.forEach((s, idx) => s.style.display = idx === 0 ? 'block' : 'none');
    setInterval(() => {
      slides.forEach(s => s.style.display = 'none');
      i = (i + 1) % slides.length;
      slides[i].style.display = 'block';
    }, interval);
  })('.slideshow-decl', 4000);

  (function slideshow2() {
    const root = document.querySelector('.slideshow-nam');
    if (!root) return;
    const slides = Array.from(root.querySelectorAll('.polaroid'));
    if (!slides.length) return;
    let i = 0;
    slides.forEach((s, idx) => s.style.display = idx === 0 ? 'block' : 'none');
    setInterval(() => {
      slides.forEach(s => s.style.display = 'none');
      i = (i + 1) % slides.length;
      slides[i].style.display = 'block';
    }, 4000);
  })();

  /* ---------- Corações flutuantes ---------- */
  (function hearts(){
    const container = document.getElementById('coracoes');
    if (!container) return;
    function makeOne() {
      const el = document.createElement('div');
      el.textContent = '❤';
      el.style.position = 'fixed';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = '-40px';
      el.style.fontSize = (10 + Math.random()*20) + 'px';
      el.style.opacity = (0.25 + Math.random()*0.7).toString();
      el.style.pointerEvents = 'none';
      el.style.transition = `transform ${6 + Math.random()*5}s linear, opacity ${6 + Math.random()*5}s linear`;
      container.appendChild(el);
      requestAnimationFrame(() => {
        el.style.transform = `translateY(${window.innerHeight + 80}px) rotate(${(Math.random()*60)-30}deg)`;
        el.style.opacity = '0';
      });
      setTimeout(()=> el.remove(), 9000);
    }
    setInterval(makeOne, 450);
  })();

  /* ---------- Contadores (2 contadores) ---------- */
  (function counters(){
    const startConhecimento = new Date('2025-08-11T11:10:00').getTime();
    const startNamoro = new Date('2025-11-09T16:20:00').getTime();

    function update() {
      const now = Date.now();

      const dC = Math.max(0, now - startConhecimento);
      const diasC = Math.floor(dC / (1000*60*60*24));
      const horasC = Math.floor((dC / (1000*60*60)) % 24);
      const minutosC = Math.floor((dC / (1000*60)) % 60);
      const segundosC = Math.floor((dC / 1000) % 60);

      const elIdsC = ['diasConhecimento','horasConhecimento','minutosConhecimento','segundosConhecimento'];
      [diasC, horasC, minutosC, segundosC].forEach((v, idx) => {
        const el = document.getElementById(elIdsC[idx]); if (el) el.textContent = v;
      });

      const dN = Math.max(0, now - startNamoro);
      const diasN = Math.floor(dN / (1000*60*60*24));
      const horasN = Math.floor((dN / (1000*60*60)) % 24);
      const minutosN = Math.floor((dN / (1000*60)) % 60);
      const segundosN = Math.floor((dN / 1000) % 60);
      const elIdsN = ['diasNamoro','horasNamoro','minutosNamoro','segundosNamoro'];
      [diasN, horasN, minutosN, segundosN].forEach((v, idx) => {
        const el = document.getElementById(elIdsN[idx]); if (el) el.textContent = v;
      });
    }
    update();
    setInterval(update, 1000);
  })();

  /* ---------- Versículos / Mensagens (Declaração) ---------- */
  (function declContent(){
    const versos = [
      "O amor é paciente, o amor é bondoso. (1 Coríntios 13:4–7)",
      "Nós amamos porque Ele nos amou primeiro. (1 João 4:19)",
      "Acima de tudo, revistam-se do amor, que é o elo perfeito. (Colossenses 3:14)",
      "Ame o Senhor... e ame ao próximo como a si mesmo. (Mateus 22:37-39)"
    ];
    let vi = 0;
    const btnV = document.getElementById('btnVersiculo');
    const boxV = document.getElementById('versiculoBox');
    if (btnV && boxV) btnV.addEventListener('click', () => {
      boxV.classList.remove('hidden'); boxV.textContent = versos[vi]; vi = (vi + 1) % versos.length;
    });

    const msgs = [
      "Que bom, valeu a pena andar atrás das flores com você kkk.",
      "A forma como tu chegou foi natural e educada; gostei.",
      "Qualquer coisa que eu faça contigo é muito bom.",
      "Acordei sorrindo lembrando da nossa conversa kkk."
    ];
    let mi = 0;
    const btnM = document.getElementById('btnCarta');
    const boxM = document.getElementById('cartaTexto');
    if (btnM && boxM) btnM.addEventListener('click', () => {
      boxM.classList.remove('hidden'); boxM.textContent = msgs[mi]; mi = (mi + 1) % msgs.length;
    });
  })();

  /* ---------- Versículos / Mensagens (Namoro) ---------- */
  (function namContent(){
    const versos = [
      "O amor é paciente, o amor é bondoso. (1 Coríntios 13:4–7)",
      "Nós amamos porque Ele nos amou primeiro. (1 João 4:19)",
      "Revesti-vos de amor... (Colossenses 3:14)",
      "Ama o teu próximo como a ti mesmo. (Mateus 22:39)",
      "O amor não faz mal ao próximo. (Romanos 13:10)"
    ];
    let vi = 0;
    const btnV = document.getElementById('btnVersiculoNamoro');
    const boxV = document.getElementById('versiculoBoxNamoro');
    if (btnV && boxV) btnV.addEventListener('click', () => {
      boxV.classList.remove('hidden'); boxV.textContent = versos[vi]; vi = (vi + 1) % versos.length;
    });

    const msgs = [
      "Lembra daquele dia que rimos até doer a barriga? Quero repetir sempre.",
      "Tu é meu lugar seguro.",
      "Obrigado por cada cuidado, cada abraço e cada sorriso.",
      "Construindo memórias juntos, um passo de cada vez."
    ];
    let mi = 0;
    const btnM = document.getElementById('btnCartaNamoro');
    const boxM = document.getElementById('cartaTextoNamoro');
    if (btnM && boxM) btnM.addEventListener('click', () => {
      boxM.classList.remove('hidden'); boxM.textContent = msgs[mi]; mi = (mi + 1) % msgs.length;
    });
  })();

  /* ---------- Forms (Formspree) ---------- */
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

  /* ---------- Reply toggle ---------- */
  (function replyToggle(){
    const btn = document.getElementById('btnResposta');
    const box = document.getElementById('respostaTexto');
    if (!btn || !box) return;
    btn.addEventListener('click', () => box.classList.toggle('hidden'));
  })();

}); // DOMContentLoaded end
