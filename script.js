document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main-content");
  montarPagina();

  // menu
  document.querySelectorAll(".menu-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("disabled")) return;

      document.querySelectorAll(".menu-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      montarPagina();
    });
  });
});

function montarPagina() {
  const container = document.getElementById("main-content");
  container.innerHTML = "";

  // TEXTO INICIAL
  const texto = document.createElement("div");
  texto.className = "texto-romantico";
  texto.innerHTML = "Meu amor, este é o nosso cantinho especial... ❤️";
  container.appendChild(texto);

  // POLAROIDS
  container.appendChild(buildPolaroids());

  // TEMPO JUNTOS
  container.appendChild(buildWhiteBox("⏳ Tempo que nos conhecemos", "Já fazem X dias desde que você entrou na minha vida..."));

  // MENSAGENS
  container.appendChild(buildWhiteBox("💌 Nossas Mensagens", "Aqui ficam as mensagens que escrevemos um para o outro..."));

  // VERSÍCULOS
  container.appendChild(buildWhiteBox("📖 Versículos Bíblicos", "“O amor tudo sofre, tudo crê, tudo espera, tudo suporta.” - 1 Coríntios 13:7"));

  // FORMULÁRIO
  container.appendChild(buildWhiteBoxComForm());

  // RESPOSTA DELA (AGORA EMBAIXO DO FORMULÁRIO)
  container.appendChild(buildWhiteBoxResposta());
}

/* =====================================================
   COMPONENTES DAS CAIXAS
===================================================== */
function buildWhiteBox(titulo, texto) {
  const box = document.createElement("div");
  box.className = "white-box";

  const h2 = document.createElement("h2");
  h2.textContent = titulo;
  box.appendChild(h2);

  const btnArea = document.createElement("div");
  btnArea.className = "btn-container";

  const btn = document.createElement("button");
  btn.className = "reveal-btn";
  btn.textContent = "Mostrar";
  btnArea.appendChild(btn);

  box.appendChild(btnArea);

  const content = document.createElement("div");
  content.className = "content-area";
  content.textContent = texto;
  box.appendChild(content);

  btn.addEventListener("click", () => {
    box.classList.toggle("showing");
    btn.textContent = box.classList.contains("showing") ? "Esconder" : "Mostrar";
  });

  return box;
}

/* FORMULÁRIO */
function buildWhiteBoxComForm() {
  const box = document.createElement("div");
  box.className = "white-box";

  const h2 = document.createElement("h2");
  h2.textContent = "💬 Enviar uma mensagem";
  box.appendChild(h2);

  const form = document.createElement("form");

  form.innerHTML = `
    <input type="text" placeholder="Seu nome">
    <textarea placeholder="Sua mensagem"></textarea>
    <button type="submit">Enviar</button>
  `;

  box.appendChild(form);
  return box;
}

/* RESPOSTA DELA */
function buildWhiteBoxResposta() {
  const box = document.createElement("div");
  box.className = "white-box";

  const h2 = document.createElement("h2");
  h2.textContent = "💝 Resposta dela";
  box.appendChild(h2);

  const area = document.createElement("div");
  area.className = "content-area showing"; 
  area.textContent = "Ainda não há resposta... mas quando houver, ela aparecerá aqui ❤️";

  box.appendChild(area);
  return box;
}

/* POLAROIDS */
function buildPolaroids() {
  const box = document.createElement("div");
  box.className = "polaroids-container";

  const fotos = ["imagens/foto1.jpg", "imagens/foto2.jpg", "imagens/foto3.jpg"];

  fotos.forEach(src => {
    const p = document.createElement("div");
    p.className = "polaroid";

    const img = document.createElement("img");
    img.src = src;

    p.appendChild(img);
    box.appendChild(p);
  });

  return box;
}
