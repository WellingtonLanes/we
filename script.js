/* script.js - arquivo único, consistente e sem conflitos */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- util: mostrar / esconder seções ---------- */
  const menuBtns = document.querySelectorAll('.menu-btn');
  const sections = document.querySelectorAll('.section');

  function showSection(id) {
    sections.forEach(s => {
      if (s.id === id) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
    // marcar botão ativo
    menuBtns.forEach(b => b.classList.toggle('ativo', b.getAttribute('data-section') === id));
    // scroll to top (suavemente)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // inicial: declarar a seção ativa por padrão
  showSection('declaracao');

  menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-section');
      if (!target) return;

      // se for noivado/casamento: mostrar carregando estático por 5s
      if (target === 'noivado' || target === 'casamento') {
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = '🌼 Carregando...';
        // não girar: apenas texto estático
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = originalText;
          // informar usuário (pode ser alterado para exibir mensagem na UI em vez de alert)
          alert('🌸 Essa parte ainda está sendo preparada com muito amor 💕');
        }, 5000);
        return;
      }

      showSection(target);
    });
  });

  /* ---------- SLIDESHOW (Declaração) ---------- */
  (function slideShow1() {
    const slides = Array.from(document.querySelectorAll('.mySlides1'));
    if (!slides.length) return;
    let i = 0;
    slides.forEach((s, idx) => s.style.display = idx === 0 ? 'block' : 'none');
    setInterval(() => {
      slides.forEach(s => s.style.display = 'none');
      i = (i + 1) % slides.length;
      slides[i].style.display = 'block';
    }, 4000);
  })();

  /* ---------- SLIDESHOW (Namoro) ---------- */
  (function slideShow2() {
    const slides = Array.from(document.querySelectorAll('.mySlides2'));
    if (!slides.length) return;
    let i = 0;
    slides.forEach((s, idx) => s.style.display = idx === 0 ? 'block' : 'none');
    setInterval(() => {
      slides.forEach(s => s.style.display = 'none');
      i = (i + 1) % slides.length;
      slides[i].style.display = 'block';
    }, 4000);
  })();

  /* ---------- CORAÇÕES (gera alguns corações aleatórios) ---------- */
  (function hearts(){
    const container = document.getElementById('coracoes');
    if (!container) return;
    function makeOne() {
      const d = document.createElement('div');
      d.textContent = '❤';
      d.style.position = 'fixed';
      d.style.left = Math.random() * 100 + 'vw';
      d.style.top = '-30px';
      const size = 12 + Math.random() * 18;
      d.style.fontSize = size + 'px';
      d.style.opacity = (0.3 + Math.random() * 0.7).toString();
      d.style.pointerEvents = 'none';
      d.style.transition = `transform ${6 + Math.random()*4}s linear, opacity ${6 + Math.random()*4}s linear`;
      container.appendChild(d);
      requestAnimationFrame(() => {
        d.style.transform = `translateY(${window.innerHeight + 60}px) rotate(${(Math.random()*60)-30}deg)`;
        d.style.opacity = '0';
      });
      setTimeout(()=> d.remove(), 9000);
    }
    setInterval(makeOne, 450);
  })();

  /* ---------- CONTADORES (Declaração e Namoro) ---------- */
  (function counters(){
    const startConhecimento = new Date('2025-08-11T11:10:00').getTime(); // 11/08/2025 11:10
    const startNamoro = new Date('2025-11-09T16:20:00').getTime(); // 09/11/2025 16:20

    function update() {
      const now = Date.now();

      // conhecimento
      const diffC = Math.max(0, now - startConhecimento);
      const diasC = Math.floor(diffC / (1000*60*60*24));
      const horasC = Math.floor((diffC / (1000*60*60)) % 24);
      const minutosC = Math.floor((diffC / (1000*60)) % 60);
      const segundosC = Math.floor((diffC / 1000) % 60);
      document.getElementById('diasConhecimento').textContent = diasC;
      document.getElementById('horasConhecimento').textContent = horasC;
      document.getElementById('minutosConhecimento').textContent = minutosC;
      document.getElementById('segundosConhecimento').textContent = segundosC;

      // namoro
      const diffN = Math.max(0, now - startNamoro);
      const diasN = Math.floor(diffN / (1000*60*60*24));
      const horasN = Math.floor((diffN / (1000*60*60)) % 24);
      const minutosN = Math.floor((diffN / (1000*60)) % 60);
      const segundosN = Math.floor((diffN / 1000) % 60);
      document.getElementById('diasNamoro').textContent = diasN;
      document.getElementById('horasNamoro').textContent = horasN;
      document.getElementById('minutosNamoro').textContent = minutosN;
      document.getElementById('segundosNamoro').textContent = segundosN;
    }

    update();
    setInterval(update, 1000);
  })();

  /* ---------- VERSÍCULOS e MENSAGENS (Declaração) ---------- */
  (function versesAndMsgsDecl(){
    const versos = [
      "O amor é paciente, o amor é bondoso. (1 Coríntios 13:4–7)",
      "Nós amamos porque Ele nos amou primeiro. (1 João 4:19)",
      "Acima de tudo, revistam-se do amor, que é o elo perfeito. (Colossenses 3:14)",
      "Ame o Senhor... e ame ao próximo como a si mesmo. (Mateus 22:37-39)"
    ];
    let vi = 0;
    const btnV = document.getElementById('btnVersiculo');
    const boxV = document.getElementById('versiculoBox');
    if (btnV && boxV) {
      btnV.addEventListener('click', () => {
        boxV.classList.remove('hidden');
        boxV.textContent = versos[vi];
        vi = (vi + 1) % versos.length;
      });
    }

    const msgs = [
      "Que bom, valeu a pena andar atrás das flores com você kkk.",
      "A forma como tu chegou foi natural e educada; gostei.",
      "Qualquer coisa que eu faça contigo é muito bom.",
      "Acordei sorrindo lembrando da nossa conversa kkk."
    ];
    let mi = 0;
    const btnM = document.getElementById('btnCarta');
    const boxM = document.getElementById('cartaTexto');
    if (btnM && boxM) {
      btnM.addEventListener('click', () => {
        boxM.classList.remove('hidden');
        boxM.textContent = msgs[mi];
        mi = (mi + 1) % msgs.length;
      });
    }
  })();

  /* ---------- VERSÍCULOS e MENSAGENS (Namoro) ---------- */
  (function versesAndMsgsNam(){
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
    if (btnV && boxV) {
      btnV.addEventListener('click', () => {
        boxV.classList.remove('hidden');
        boxV.textContent = versos[vi];
        vi = (vi + 1) % versos.length;
      });
    }

    const msgs = [
      "Lembra daquele dia que rimos até doer a barriga? Quero repetir sempre.",
      "Tu é meu lugar seguro.",
      "Obrigado por cada cuidado, cada abraço e cada sorriso.",
      "Construindo memórias juntos, um passo de cada vez."
    ];
    let mi = 0;
    const btnM = document.getElementById('btnCartaNamoro');
    const boxM = document.getElementById('cartaTextoNamoro');
    if (btnM && boxM) {
      btnM.addEventListener('click', () => {
        boxM.classList.remove('hidden');
        boxM.textContent = msgs[mi];
        mi = (mi + 1) % msgs.length;
      });
    }
  })();

  /* ---------- FORMULARIOS (Formspree handler com feedback) ---------- */
  (function forms() {
    const forms = [
      { id:'formDeclaracao', status:'formStatusDeclaracao' },
      { id:'formNamoro', status:'formStatusNamoro' }
    ];
    forms.forEach(cfg => {
      const form = document.getElementById(cfg.id);
      const status = document.getElementById(cfg.status);
      if (!form) return;
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (status) status.textContent = 'Enviando...';
        const data = new FormData(form);
        try {
          const res = await fetch(form.action || 'https://formspree.io/f/xovkwzej', {
            method:'POST', body: data, headers: { 'Accept':'application/json' }
          });
          if (res.ok) {
            if (status) status.textContent = 'Mensagem enviada 💌';
            form.reset();
          } else {
            const j = await res.json();
            if (status) status.textContent = j.error || 'Erro ao enviar — tente novamente';
          }
        } catch (err) {
          if (status) status.textContent = 'Erro ao enviar — verifique sua conexão';
        }
        setTimeout(()=> { if (status) status.textContent = ''; }, 4000);
      });
    });
  })();

  /* ---------- botão mostrar resposta (Declaração) ---------- */
  (function replyToggle(){
    const btn = document.getElementById('btnResposta');
    const box = document.getElementById('respostaTexto');
    if (!btn || !box) return;
    btn.addEventListener('click', () => {
      box.classList.toggle('hidden');
    });
  })();

}); // DOMContentLoaded end
