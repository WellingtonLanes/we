document.addEventListener("DOMContentLoaded", () => {

  // troca de modo (declaração / namoro)
  const menuButtons = document.querySelectorAll(".menu-btn");
  const main = document.getElementById("main-content");

  menuButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("disabled")) return;

      menuButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      carregarConteudo(btn.dataset.mode);
    });
  });

  function carregarConteudo(mode) {
    main.innerHTML = `<p class="loading">Carregando conteúdo...</p>`;

    setTimeout(() => {
      if (mode === "declaracao") carregarDeclaracao();
      if (mode === "namoro") carregarNamoro();
    }, 300);
  }

  function carregarDeclaracao() {
    main.innerHTML = `
      <div class="white-box">
        <div class="btn-container">
          <button class="reveal-btn" data-type="mensagem">Mostrar mensagem</button>
          <button class="reveal-btn" data-type="versiculo">Mostrar versículos</button>
          <button class="reveal-btn" data-type="resposta">Revelar resposta dela</button>
        </div>

        <div class="content-area"></div>
        <div class="pink-overlay"></div>
      </div>
    `;

    ativarBotoes();
  }

  function carregarNamoro() {
    main.innerHTML = `
      <div class="white-box">
        <div class="btn-container">
          <button class="reveal-btn" data-type="mensagem">Mensagem do namoro</button>
          <button class="reveal-btn" data-type="versiculo">Versículo do namoro</button>
        </div>

        <div class="content-area"></div>
        <div class="pink-overlay"></div>
      </div>
    `;

    ativarBotoes();
  }

  function ativarBotoes() {
    const btns = document.querySelectorAll(".reveal-btn");
    const content = document.querySelector(".content-area");
    const overlay = document.querySelector(".pink-overlay");

    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        const tipo = btn.dataset.type;

        if (tipo === "mensagem")
          content.textContent = "Meu amor… desde o começo você ilumina tudo ao meu redor. ❤️";

        if (tipo === "versiculo")
          content.textContent = "“O amor tudo sofre, tudo crê, tudo espera, tudo suporta.” – 1 Coríntios 13:7";

        if (tipo === "resposta")
          content.textContent = "Sim! Ela disse que te ama mais do que imaginava. 💕";

        overlay.classList.add("show");
      });
    });
  }

  carregarConteudo("declaracao");
});
