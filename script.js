// ================== Corações ==================
(function hearts() {
  const canvas = document.getElementById('coracoes');
  const ctx = canvas.getContext('2d');
  let hearts = [];
  resize();
  window.addEventListener('resize', resize);

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function Heart() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 20 + 10;
    this.speed = Math.random() * 1 + 0.5;
    this.alpha = Math.random();
  }

  function drawHeart(x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 20, size / 20);
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.bezierCurveTo(0, 3, -3, 0, -6, 0);
    ctx.bezierCurveTo(-12, 0, -12, 6, -12, 6);
    ctx.bezierCurveTo(-12, 12, 0, 18, 0, 24);
    ctx.bezierCurveTo(0, 18, 12, 12, 12, 6);
    ctx.bezierCurveTo(12, 6, 12, 0, 6, 0);
    ctx.bezierCurveTo(3, 0, 0, 3, 0, 6);
    ctx.closePath();
    ctx.fillStyle = `rgba(231,84,128,${Math.random() * 0.5 + 0.3})`;
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
      drawHeart(h.x, h.y, h.size);
      h.y += h.speed;
      if (h.y > canvas.height + 30) h.y = -10;
    });
    requestAnimationFrame(animate);
  }

  for (let i = 0; i < 30; i++) hearts.push(new Heart());
  animate();
})();

// ================== Carregar blocos ==================
document.addEventListener("DOMContentLoaded", () => {
  carregarBloco("declaracao");
  document.getElementById("btnDeclaracao").onclick = () => carregarBloco("declaracao");
  document.getElementById("btnNamoro").onclick = () => carregarBloco("namoro");
});

async function carregarBloco(tipo) {
  const conteudo = document.getElementById("conteudoPrincipal");
  conteudo.innerHTML = "<p>Carregando...</p>";

  const resposta = await fetch(`${tipo}.json`);
  const data = await resposta.json();

  conteudo.innerHTML = `
    <div class="slideshow-container"></div>
    <div class="declaracao">${data.texto.map(p => `<p>${p}</p>`).join("")}</div>

    <div class="contador">
      <h2>Nosso tempo juntos 💕</h2>
      <div id="tempoJuntos"></div>
    </div>

    <div class="carta">
      <h2>Nossas Mensagens 💌</h2>
      <button id="btnCarta">Mostrar mensagem</button>
      <div id="cartaTexto" class="carta-box visually-hidden"></div>
    </div>

    <div class="frases">
      <h2>Versículos Bíblicos 📖</h2>
      <button id="btnVersiculo">Mostrar versículo</button>
      <div id="versiculoBox" class="versiculo-box visually-hidden"></div>
    </div>

    <div class="mensagem">
      <h2>Deixe uma mensagem 🌷</h2>
      <form id="formMensagem" action="https://formspree.io/f/xyzyabcd" method="POST">
        <div class="form-row">
          <input type="text" name="nome" placeholder="Seu nome" required />
          <input type="email" name="email" placeholder="Seu e-mail" required />
        </div>
        <textarea name="mensagem" rows="4" placeholder="Sua mensagem..." required></textarea>
        <button type="submit">Enviar 💌</button>
        <p id="formStatus"></p>
      </form>
    </div>

    ${tipo === "declaracao" ? '<button id="btnResposta">Mostrar resposta dela 💬</button><div id="respostaBox" class="versiculo-box visually-hidden"></div>' : ''}
  `;

  criarSlides(data.fotos);
  iniciarContador(new Date(data.dataInicio));
  iniciarBotoes(data);
}

function criarSlides(fotos) {
  const container = document.querySelector(".slideshow-container");
  fotos.forEach((f, i) => {
    container.innerHTML += `
      <div class="mySlides">
        <img src="${f}" alt="Foto ${i+1}">
        <div class="polaroid-caption">${new Date().toLocaleDateString()}</div>
      </div>`;
  });

  let slideIndex = 0;
  function showSlides() {
    const slides = document.querySelectorAll(".mySlides");
    slides.forEach(s => s.style.display = "none");
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000);
  }
  showSlides();
}

function iniciarContador(dataInicio) {
  const tempo = document.getElementById("tempoJuntos");
  function atualizar() {
    const diff = new Date().getTime() - dataInicio.getTime();
    const dias = Math.floor(diff / (1000*60*60*24));
    const horas = Math.floor((diff / (1000*60*60)) % 24);
    const minutos = Math.floor((diff / (1000*60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);
    tempo.innerHTML = `${dias} dias, ${horas}h ${minutos}m ${segundos}s`;
  }
  setInterval(atualizar, 1000);
  atualizar();
}

function iniciarBotoes(data) {
  const btnCarta = document.getElementById("btnCarta");
  const cartaBox = document.getElementById("cartaTexto");
  const btnVersiculo = document.getElementById("btnVersiculo");
  const versiculoBox = document.getElementById("versiculoBox");

  let i1 = 0, i2 = 0;
  btnCarta.onclick = () => {
    cartaBox.classList.remove("visually-hidden");
    cartaBox.textContent = data.mensagens[i1];
    i1 = (i1 + 1) % data.mensagens.length;
  };
  btnVersiculo.onclick = () => {
    versiculoBox.classList.remove("visually-hidden");
    versiculoBox.textContent = data.versiculos[i2];
    i2 = (i2 + 1) % data.versiculos.length;
  };

  const btnResposta = document.getElementById("btnResposta");
  if (btnResposta) {
    const box = document.getElementById("respostaBox");
    let ir = 0;
    btnResposta.onclick = () => {
      box.classList.remove("visually-hidden");
      box.textContent = data.respostas[ir];
      ir = (ir + 1) % data.respostas.length;
    };
  }
}
