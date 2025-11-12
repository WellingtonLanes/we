/* script.js - compatível com o HTML/CSS acima
   - troca de seções
   - slideshows (declaração / namoro)
   - corações animados
   - contadores para cada seção
   - versículos / mensagens / forms
   - carregando estático para noivado/casamento (5s)
*/

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Seções / Menu ---------- */
  const menuBtns = document.querySelectorAll('.menu-btn');
  const sections = document.querySelectorAll('.section');

  function showSection(id) {
    sections.forEach(s => s.classList.toggle('active', s.id === id));
    menuBtns.forEach(b => b.classList.toggle('ativo', b.getAttribute('data-section') === id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // inicial
  showSection('declaracao');

  menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.section;
      if (!target) return;
      if (target === 'noivado' || target === 'casamento') {
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

  /* ---------- Slideshows (separados) ---------- */
  (function slideshow(selector) {
    const slides = Array.from(document.querySelectorAll(selector));
    if (!slides.length) return;
    let i = 0;
    slides.forEach((s, idx) => s.style.display = idx === 0 ? 'block' : 'none');
    setInterval(() => {
      slides.forEach(s => s.style.display = 'none');
      i = (i + 1) % slides.length;
      slides[i].style.display = 'block';
    }, 4000);
  })('.mySlides1');

  (function slideshow2() {
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

  /* ---------- Corações (efeito) ---------- */
  (function hearts(){
    const container = document.getElementById('coracoes');
    if (!container) return;
    function make() {
      const d = document.createElement('div');
      d.textContent = '❤';
      d.style.position = 'fixed';
      d.style.left = (Math.random() * 100) + 'vw';
      d.style.top = '-30px';
      d.style.fontSize = (10 + Math.random() * 22) + 'px';
      d.style.opacity = (0.25 + Math.random() * 0.7).toString();
      d.style.pointerEvents = 'none';
      d.style.transition = `transform ${6 + Math.random()*4}s linear, opacity ${6 + Math.random()*4}s linear`;
      container.appendChild(d);
      requestAnimationFrame(() => {
        d.style.transform = `translateY(${window.innerHeight + 80}px) rotate(${(Math.random()*60)-30}deg)`;
        d.style.opacity = '0';
      });
      setTimeout(()=> d.remove(), 9000);
    }
    setInterval(make, 450);
  })();

  /* ---------- Contadores ---------- */
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
      ['diasConhecimento','horasConhecimento','minutosConhecimento','segundosConhecimento']
        .forEach((id, idx) => {
          const el = document.getElementById(id);
          if (!el) return;
          const vals = [diasC, horasC, minutosC, segundosC];
          el.textContent = vals[idx];
        });

      // namoro
      const diffN = Math.max(0, now - startNamoro);
      const diasN = Math.floor(diffN / (1000*60*60*24));
      const horasN = Math.floor((diffN / (1000*60*60)) % 24);
      const minutosN = Math.floor((diffN / (1000*60)) % 60);
      const segundosN = Math.floor((diffN / 1000) % 60);
      ['diasNamoro','horasNamoro','minutosNamoro','segundosNamoro']
        .forEach((id, idx) => {
          const el = document.getElementById(id);
          if (!el) return;
          const vals = [diasN, horasN, minutosN, segundosN];
          el.textContent = vals[idx];
        });
    }

    update();
    setInterval(update, 1000);
  })();

  /* ---------- Versículos & Mensagens (Declaração) ---------- */
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

  /* ---------- Versículos & Mensagens (Namoro) ---------- */
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

  /* ---------- Forms (Formspree) ---------- */
  (function forms(){
    const maps = [
      { id: 'formDeclaracao', status: 'formStatusDeclaracao' },
      { id: 'formNamoro', status: 'formStatusNamoro' }
    ];
    maps.forEach(cfg => {
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

  /* ---------- Botão mostrar resposta (Declaração) ---------- */
  (function reply(){
    const btn = document.getElementById('btnResposta');
    const box = document.getElementById('respostaTexto');
    if (!btn || !box) return;
    btn.addEventListener('click', () => box.classList.toggle('hidden'));
  })();

}); // DOMContentLoaded end
