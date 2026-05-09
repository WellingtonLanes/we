/* ================== SITE DATA ================== */
function imageRange(start, end, extension) {
  return Array.from(
    { length: end - start + 1 },
    (_, index) => `imagens/fotos${start + index}.${extension}`
  );
}

const BIBLE_VERSES = [
  "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor. O amor não se alegra com a injustiça, mas se alegra com a verdade. Tudo sofre, tudo crê, tudo espera, tudo suporta.\n1 Coríntios 13:4-7",
  "Quem não ama não conhece a Deus, porque Deus é amor.\n1 João 4:8",
  "O meu mandamento é este: amem-se uns aos outros como eu os amei.\nJoão 15:12",
  "Amem uns aos outros com amor fraternal e prefiram dar honra aos outros mais do que a si próprios.\nRomanos 12:10",
  "Por isso o homem deixa pai e mãe e se une à sua mulher, tornando-se os dois uma só carne.\nGênesis 2:24",
  "Melhor é serem dois do que um... Se um cair, o outro levanta... O cordão de três dobras não se rompe com facilidade.\nEclesiastes 4:9-12",
  "Maridos, amem suas esposas, assim como Cristo amou a igreja e entregou-se por ela.\nEfésios 5:25",
  "Quem encontra uma esposa encontra algo excelente; recebeu uma bênção do Senhor.\nProvérbios 18:22",
  "As muitas águas não podem apagar o amor; os rios não podem levá-lo na correnteza.\nCânticos 8:7",
  "Maridos, amem suas esposas e não as tratem com amargura.\nColossenses 3:19",
  "Sobretudo, amem-se sinceramente uns aos outros, porque o amor perdoa muitos pecados.\n1 Pedro 4:8",
  "O amigo ama em todos os momentos; é um irmão na adversidade.\nProvérbios 17:17",
  "Uma esposa exemplar, quem pode encontrá-la? Vale muito mais do que rubis. Seu marido tem plena confiança nela.\nProvérbios 31:10-11",
  "O meu amado é meu, e eu sou dele.\nCânticos 2:16",
  "Portanto, o que Deus uniu, ninguém separe.\nMarcos 10:9",
  "A esposa prudente vem do Senhor.\nProvérbios 19:14",
  "Alegre-se com a esposa da sua juventude.\nProvérbios 5:18-19",
  "Desfrute a vida com a mulher que você ama.\nEclesiastes 9:9"
];

const SITE_DATA = {
  declaracao: {
    dataInicio: "2025-08-11T11:10:00",
    fotos: [
      "imagens/foto1.jpg","imagens/foto2.jpg","imagens/foto3.jpg",
      "imagens/foto4.jpg","imagens/foto5.jpg","imagens/foto6.jpg",
      "imagens/foto7.jpg","imagens/foto8.jpg","imagens/foto9.jpg"
    ],
    datas: [
      "13/09/2025","13/09/2025","21/09/2025",
      "21/09/2025","28/09/2025","28/09/2025",
      "28/09/2025","04/10/2025","10/10/2025"
    ],
    texto: [
      "Oii, paz, prazer kkkk foi assim que me apresentei e assim queria começar esse texto, eu nunca fui bom em puxar assunto, não sou muito bom em expressar em palavras o que eu estou sentindo, me faltam palavras, e geralmente me enrolo todo kkkk, mas tu me faz querer expressar tudo o que estou sentindo, se não em palavras, por que não escrever né, mas de um jeito diferente até por que a minha letra não é das mais bonitas e tu ia ter um pouco de dificuldade em entender kkkkk.",
      "Eu gostaria de começar dizendo que me sinto tão bem e confortável ao teu lado, tu me transmite uma segurança muito grande, eu sou bem tímido, mas contigo minha timidez foi embora.",
      "Eu queria dizer que mandar aquela mensagem foi a melhor decisão que eu já tomei, e agradeço a Deus por Ele ter feito eu te conhecer, Ele foi muito bom comigo, quando eu te vi eu tive a certeza que eu precisava falar contigo e desde que a gente começou conversar meus dias ficaram muito mais alegres, que a tua simples presença e sorriso melhoram o meu dia, é muito bom conversar contigo, até um banho de chuva, assistir uma série pelo discord, jogar gartic, comprar um guarda-chuva é uma aventura contigo.",
      "Tu tem um jeito que é só teu que eu acho incrível, tu gosta do pôr do sol, ama lasanha (de todos sabores possíveis kkkk), ama brigadeiro, é ruim nos esportes, tem medo de cair de bicicleta, desenha muito melhor que eu, é muito boa no stop, gosta de friends e the office, gosta muito de ler, tem medo de lagartixa e sapo kkk, quer ter um poodle, e deseja conhecer New York.",
      "Tu é muito meiga, engraçada, simpática, inteligente, tem um coração muito grande e muitas outras qualidades.",
      "Eu te acho muito linda, eu poderia olhar pro teu sorriso e pro teu olhar o dia todo kkkk.",
      "Mas a coisa que mais admiro em ti é o fato tu ser tão temente a Deus, de fazer a obra Dele, de louvar, de ajudar na recepção, de virar atriz dos convites pros cultos, ensinar a palavra de Deus pras crianças (eu quero assistir uma aula tua ainda kkk) e de como as crianças gostam de ti.",
      "Eu quero louvar contigo ou até quem sabe tocar violão pra ti louvar, quero que tu me veja pregando, quero orar contigo, conhecer novos lugares contigo (quem sabe New York ou a rua em Paris com o teu nome).",
      "Eu quero te dar muitos brigadeiros, flores, te levar pra tirar muitas fotos do pôr do sol e fotos nossas tambem (até com o filtro de cachorro kkkk), até fazer skincare (coisa que eu nunca tinha pensado em fazer antes kkkk) comer muitos entreveros depois do culto. Tudo conforme a permissão de Deus.",
      "Eu acho que a gente combina muito em muitas coisas, temos as nossas diferenças, o que nos tornas unicos, mas até as nossas diferenças e o esforço de cada um pra fazer ou dar o que o outro gosta, faz eu gostar tanto da gente.",
      "O que eu quero dizer é que eu estou gostando muito de ti e fiz esse site pra te contar e pra tu não esquecer e poder ver sempre que tu quiser."
    ],
    mensagens: [
      "Que bomm, valeu muito a pena ter caminhado por 3 bairros atrás delas (flores) então kkkk. Eu caminharia de novooo.",
      "mas a forma como tu chegou foi bem educada e natural, por isso que gostei",
      "Qualquer coisa que eu faça contigo é muito bom.",
      "eu também me sinto assim, conversar e ficar perto de ti é muito bom",
      "E eu fico feliz que tu fica feliz vendo eu ficando feliz contigo feliz e ficamos todo mundo feliz kkkkkk.",
      "eu tambémm, acordei sorrindo hoje kkkk, acho que eu fiquei pensando na nossa conversa kkkk",
      "Capaaaz, tu pode falar o que está sentindo sempre comigo, sobre qualquer assunto, quando quiser. Nem sempre vou saber como ajudar ou o que falar, mas vou tentar e vou estar sempre aqui.",
      "só de poder compartilhar contigo já está bommm ❤️"
    ],
    versiculos: BIBLE_VERSES,
    respostas: [
      "Bom... Não sei muito bem como começar, mas eu queria que tu soubesse o quanto eu fiquei feliz lendo esse texto, eu não consegui me expressar muito bem aquela hora, mas o meu coração estava explodindo por dentro kkkk. O jeito que tu escreveu e lembrou de cada detalhe me deixou encantada. Receber aquela mensagem tua foi uma grande (e muito boa kkkk) surpresa, eu realmente não esperava, mas a maneira que tu falava me fez querer te conhecer mais e mais, e naquele dia não imaginei que tu se tornaria uma pessoa tão especial pra mim. Eu te acho extremamente fofo (pra mim esse é um dos melhores elogios que existem ta kkk) educado, atencioso, lindo, charmoso, inteligente e descobri que tu também é românico, dentre muuuitas outras qualidades. Eu acho muito lindo o teu jeito todo tímido (combina muito comigo kkkk), acho muito fofo que quando tu sorri (sorriso lindo inclusive) os teus olhos fecham, e eu adoro te ouvir falando, acho a tua voz tranquila e isso me acalma muito. Eu consigo ver que tu é um homem temente a Deus e quer sempre agradar a Ele, e isso me deixa ainda mais encantada por ti. Eu me sinto extremamente confortável perto de ti, parece que a gente já se conhece a muito mais tempo, e aquele dia no cinema que eu deitei no teu ombro, me senti em casa. Eu gosto muito de ti, conversar e rir contigo torna o meu dia muito melhor, mas quero te conhecer ainda mais, quero que a gente viva muitas experiências novas juntos, quero fazer tudo que tu falou no texto e muito mais, tudo conforme a vontade de Deus. É isso kkkk falei bastante mas ainda não falei tudo... 😚❤️"
    ]
  },

  namoro: {
    dataInicio: "2025-11-09T16:20:00",
    fotos: [
      "imagens/fotos10.jpg","imagens/fotos11.jpg","imagens/fotos12.jpg",
      "imagens/fotos13.jpg","imagens/fotos14.jpg","imagens/fotos15.jpg",
      "imagens/fotos16.jpg","imagens/fotos17.jpg","imagens/fotos18.jpg",
      "imagens/fotos19.jpg","imagens/fotos20.jpg","imagens/fotos21.jpg",
      "imagens/fotos22.jpg","imagens/fotos23.jpg"
    ],
    datas: [
      "12/10/2025","12/10/2025","14/10/2025","18/10/2025","24/10/2025",
      "24/10/2025","07/11/2025","08/11/2025","08/11/2025","08/11/2025",
      "09/11/2025","09/11/2025","09/11/2025","09/11/2025","09/11/2025",
      "09/11/2025","09/11/2025"
    ],
    texto: [
  "Eu fiquei pensando em como começar esse texto, então resolvi começar pelo começo kkkk.",
  "O Wellington de 11 de agosto de 2025 estava muito nervoso e com medo de te mandar mensagem, não sabia como fazer, mas sabia que devia fazer.",
  "Os meses de agosto e setembro eram os piores meses do ano pra mim desde que a minha mãe faleceu, mas Deus me fez te conhecer e o nosso primeiro encontro ser nesses meses.",
  "Outubro passou a ser o meu mês preferido pois soube que tu gostava de mim também.",
  "E novembro nem se fala pois viramos namoradooos.",
  "Eu nunca senti o que eu estou sentindo, eu fico sorrindo só de pensar na gente.",
  "Tu me faz um bem tão grande, eu me sinto muito mais confiante e resolvido com os meus sentimentos e pensamentos, eu não tenho dúvidas que tu foi um presente de Deus, e ele foi muito generoso viu, não sei se eu merecia tanto kkkk mas encontrei minha mulher virtuosa.",
  "Eu orava por ti antes de te conhecer, oro desde o primeiro dia que te vi e vou continuar orando a minha vida toda se Deus assim me permitir.",
  "O agir de Deus é incrível né, quando a gente menos espera está chamando alguém pra conversar pelo Instagram depois de ir em um culto no distrito dela e 3 meses depois estar namorando a pessoa mais meiga do mundo (Tenho 3 fontes que não me deixam mentir).",
  "Começamos pelo Instagram mas depois fomos pro culto, pra vigília, pra orla, gasômetro, praças, cafeterias, shoppings, fliperamas, sorveterias, cinema, teatro, museus e livrarias.",
  "Fiz coisas que não imaginava que queria fazer antes, adorei cada uma delas, e quero descobrir muitos hobbies novos contigo.",
  "A cada dia que passa eu sinto mais certeza que fiz a melhor escolha ao te chamar pra conversar, meus dias ganharam muito mais vida e cor como o Bobbie Goods que a gente pintou kkkk.",
  "Virei um fã de arte e museus e quero fazer skincare contigo, viajar pra vários lugares contigo e acho isso incrível como falei da outra vez.",
  "Eu quero fazer as coisas que tu gosta, pois se é importante pra ti então é importante pra mim também, quero ir na igreja contigo, fazer a obra de Deus juntos, um ajudando o outro a crescer mais e mais espiritualmente, quero te ver sempre com esse sorriso lindo que tu tem e vou me esforçar o máximo pra isso.",
  "Como eu já disse, amo ver o teu sorriso, acho muito fofo quando tu coloca a mão no rosto pra rir, amo ouvir tu falar, sobre teu dia, sobre teus sonhos, sobre tudo, amo o teu olhar, amo a tua companhia, amo estar ao teu lado poderia ficar o dia todo te olhando e conversando contigo, eu amo a gente.",
  "Eu amo ser seu namorado. 💗"
  ],
    mensagens: [
      "O quanto eu fico a vontade pra demostrar meus sentimentos depois que te conheci, eu não era assim kkk",
      "quanto mais tempo a gente ficar juntos melhooor ❤️",
      "Tu também faz muito bem para mim, tu alegrou meus dias e me traz uma paz muito grande ❤️",
      "eu também gostei de tudooo, mas só foi bom porque tu estava comigo ❤️",
      "Simm, é sempre muito bom ir nos cultos contigo ❤️",
      "eu tô gostando muito de orar juntos pela gente ❤️",
      "Eu achei muito bommm, a cada dia que passa eu tenho mais certeza, pq na minha opinião Deus confirma algo no dia a dia, nas pequenas coisas e foi muito bom esses dias que a gente passou orando, de várias formas, até espiritual também. Isso não quer dizer que não vamos sentir medo ou ter dificuldades, mas da certeza que se pode vencer todas elas com Jesus",
      "nem se eu imaginasse teria sido tão bom, tu faz muito bem pra mim, de verdade ❤️. quero que a gente seja muito felizes juntos ❤️❤️",
      "Eu que tive sorte de encontrar ela, sabia que eu amo ver o olhar dela e o sorriso dela pra mim, que eu acho muito fofo quando ela põe a mão no rosto pra rir ou quando está com vergonha, amo ver ela arrumando o cabelo mesmo com uma ventania que em menos de 1 minuto depois bagunça tudo de novo kkk eu poderia ficar olhando o dia todo pra ela e admirando o quão incrível ela é 🥰❤️",
      "eu amo o teu jeitooo, o jeito que tu me olha, o teu sorriso, o som da tua voz e amo te ver sorrindoo, acho muito fofo tu se esforçando mesmo sendo tímido ❤️",
      "obrigadaaa, isso faz eu me sentir muito bemmm, muito segura contigo 🥹❤️"
    ],
    versiculos: BIBLE_VERSES,
    respostas: [
      "Meu amorzinho, eu quero muito que tu saiba que eu me sinto muito abençoada em te ter na minha vida. Eu estava em um momento na vida onde tudo estava repetitivo e sem graça, e sinceramente, eu não sabia mais o que fazer pra melhorar, só orava e pedia para Deus me ajudar a entender a vontade Dele, e de repente, tu chegou e mudou tudo! Eu não sabia que era possível uma pessoa fazer eu sentir tudo o que sinto, eu me apaixonei completamente por ti, e sabe o que é mais estanho? Cada dia eu me apaixono mais ❤️\n\nEu orava muito pelo meu futuro relacionamento, sempre confiei que Deus faria algo incrível, mas não sabia que me presentearia com uma pessoa tão incrível assim. Tu simplesmente é toda a carta que eu escrevi com 16 anos, cada detalhe, cada gesto, e eu sei que ninguém é perfeito, mas tu com certeza é a pessoa perfeita pra mim ❤️\n\nEu já falei isso, mas me sinto em casa contigo, parece que o teu abraço foi feito só pra mim, tu faz eu me sentir tão especial, e eu quero sempre fazer tu sentir o mesmo, não tenho dúvidas que foi Deus que permitiu nós nos encontrarmos.\n\nEu amo tudo que fazemos juntos, amo o teu sorriso, amo ouvir a tua voz, amo quando tu abre o teu coração pra mim, amo o teu jeito, amo como tu cuida de mim, amo os teus beijinhos e o teu carinho, tudo fica muito melhor contigo, e eu quero dividir os meus dias contigo pra sempre meu amoooor ❤️ Eu amo ser a sua namorada! 🥰"
    ]
  },

  noivado: {
    dataInicio: "2026-05-09T18:00:00",
    fotos: [
      ...imageRange(24, 51, "jpg"),
      ...imageRange(52, 195, "jpg")
    ],
    datas: [
      "01/01/2026",
      "01/01/2026"
    ],
    texto: [
      "Quero começar esse texto, falando algo que ficou claro no texto anterior, mas que não consegui escrever, que EU TE AMO, amo muito, muito mesmoooooooooooooooooooo, muito mais que eu poderia imaginar que pudesse amar alguém, amo tanto que faltam palavras para descrever.",
      "Desde o dia que começamos falar que nos amávamos, eu não consigo mais para de falar e quero gritar pro mundo inteiro ouvir o quanto eu te amo.",
      "Quero deixar claro o quanto tu é especial pra mim, o quanto quero o teu bem e te proteger de todo o mal desse mundo, quero te ver sempre com um sorriso no rosto (sorriso esse que é o mais lindo do mundo todinho)",
      "Quero além de noivo, ser o teu melhor amigo, a pessoa que tu possa falar tudo que tu estiver sentindo e te ajudar com o que tu precisar, quero ser o teu esposo e passar a minha vida toda ao teu lado, quero ser o pai dos filhos (os filhos mais swags que já viram nesse mundo)",
      "Tu é uma pessoa maravilhosa e extremamente apaixonante, quero que tu nunca esqueça disso, que um simples sorriso ou olhar teu é capaz de melhorar o meu dia e me fazer sentir o cara mais sortudo desse mundo.",
      "Tu foi disparado a melhor coisa que já aconteceu na minha vida, te conhecer e conviver contigo, volto a dizer, trouxe cor aos meus dias, tu me faz um bem tão grande, apenas existindo e me chamando de meu amor.",
      "Os 6 meses de namoro foram incríveis, aprendemos tantas coisas juntos, aprendemos nos amar, nos cuidar e ainda vamos aprender tanta coisa juntos e tenho certeza que vão ser extraordinários, pois vai ser contigo.",
      "Nesses 6 meses, eu aprendi o caminho pra ir na casa da minha princesa, aprendi como se escreve Av. Engenheiro Ludolfo Boehl kkkk, aprendi fazer bolo de pote pra conseguir mais dinheiro pro nosso casamento, aprendi algumas palavras em inglês kkkk e tantas outras coisas ao teu lado.",
      "Eu sei que eu já falei isso antes também, mas tu me faz querer ser uma pessoa e um cristão melhor e me motiva e me da força pra eu realizar os nossos sonhos. E com a ajuda de Deus, vamos realizar todos eles.",
      "Elyse Lacortte Silveira, ou melhor, minha NOIVA, saiba que eu amo cada detalhe teu, e a única coisa que quero mudar em ti, é o teu sobrenome, acho que Lanes vai cair muito bem kkk"
    ],
    mensagens: [
      "teste"
    ],
    versiculos: BIBLE_VERSES,
    respostas: [
      "Aguardando sua resposta ❤️"
    ]
  }
};

/* ================== SELECTOR ================== */
const $ = s => document.querySelector(s);

/* ================== FIREBASE ================== */
const firebaseConfig = {
  apiKey: "AIzaSyA9DnGbZ6G-MMs3IFM6h3XTyFS6WPR77nQ",
  authDomain: "we--pray.firebaseapp.com",
  projectId: "we--pray",
  storageBucket: "we--pray.firebasestorage.app",
  messagingSenderId: "854638312112",
  appId: "1:854638312112:web:95f12677d2ad6a3ad2d975"
};

let db;

function initFirebase(){
  if (!window.firebase) return null;

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  db = firebase.firestore();
  return db;
}

/* ================== CONTROLE ================== */
let counterInterval;
let slideTimeout;
let prayerUnsubscribe;

/* ================== HEARTS ================== */
function ensureHeartsContainer() {
  let c = document.querySelector('#coracoes');
  if (!c) {
    c = document.createElement('div');
    c.id = 'coracoes';
    document.body.appendChild(c);
  }
  return c;
}

/* ================== BUILD UI ================== */
function buildUI(mode) {
  const data = SITE_DATA[mode];
  const main = $('#main-content');
  main.innerHTML = '';

  if (slideTimeout) clearTimeout(slideTimeout);

  /* ====== SLIDES ====== */
  const gallery = document.createElement('div');
  gallery.className = 'polaroid-gallery';

  const slide = document.createElement('div');
  slide.className = 'slideshow';

  data.fotos.forEach((src, i) => {
    const wrap = document.createElement('div');
    wrap.className = mode === 'declaracao' ? 'mySlides' : 'mySlides2';

    const pol = document.createElement('div');
    pol.className = 'polaroid';

    const ph = document.createElement('div');
    ph.className = 'photo';
    ph.style.backgroundImage = `url("${src}")`;

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Foto nossa de ${data.datas[i] || 'um momento especial'}`;
    img.loading = i < 3 ? 'eager' : 'lazy';
    img.decoding = 'async';

    ph.appendChild(img);

    pol.appendChild(ph);
    wrap.appendChild(pol);
    slide.appendChild(wrap);
  });

  const slideCounter = document.createElement('span');
  slideCounter.className = 'slide-counter';
  slideCounter.textContent = `1/${data.fotos.length}`;
  slide.appendChild(slideCounter);

  const slideControls = document.createElement('div');
  slideControls.className = 'slideshow-controls';
  slideControls.innerHTML = `
    <button class="slide-prev" type="button" aria-label="Foto anterior">←</button>
    <label class="slide-jump">
      <span>Ir para</span>
      <input class="slide-number" type="number" min="1" max="${data.fotos.length}" value="1" inputmode="numeric">
    </label>
    <button class="slide-next" type="button" aria-label="Próxima foto">→</button>
  `;

  gallery.appendChild(slide);
  gallery.appendChild(slideControls);
  main.appendChild(gallery);

  /* ====== CARTA ====== */
  const carta = document.createElement('div');
  carta.className = 'carta';

  data.texto.forEach(t => {
    const p = document.createElement('p');
    p.textContent = t;
    carta.appendChild(p);
  });

  main.appendChild(carta);
  /* ====== CONTADOR ====== */
  const cont = document.createElement('section');
  cont.className = 'section counter-section';

  cont.innerHTML = `
    <h2>⏳ Nosso tempo juntos</h2>
    <div class="white-box love-card contador">
      <div class="love-card-top">
        <span class="love-badge">⏳</span>
      </div>
      <div class="time">
        <div class="time-unit">
          <span id="days">0</span>
          <small>dias</small>
        </div>
        <div class="time-unit">
          <span id="hours">0</span>
          <small>horas</small>
        </div>
        <div class="time-unit">
          <span id="mins">0</span>
          <small>min</small>
        </div>
        <div class="time-unit">
          <span id="secs">0</span>
          <small>seg</small>
        </div>
      </div>
    </div>
  `;

  main.appendChild(cont);
  initCounter(new Date(data.dataInicio));

  /* ====== REVEALS ====== */
  if (mode !== 'noivado') {
    createRevealBox(main, "💌 Nossas Mensagens", data.mensagens, "Mostrar Mensagens");
  }

  /* ====== EXTRAS ====== */
  if (mode === 'noivado') {
    addRandomButton(main, data);
  }
  addCarousel100(main);
  createRevealBox(main, "📖 Versículos Bíblicos", data.versiculos, "Mostrar Versículos");
  addPrayerSystem(main);

  /* ====== FORM ====== */
  const formSec = document.createElement('section');
  formSec.className = 'section';

  formSec.innerHTML = `
    <h2>💬 Enviar uma mensagem</h2>
    <div class="white-box">
      <form method="POST" action="https://formspree.io/f/xovkwzej">
        <div class="form-row">
          <input type="text" name="name" placeholder="Seu nome" required>
          <input type="email" name="email" placeholder="Seu e-mail" required>
        </div>
        <textarea name="message" placeholder="Escreva sua mensagem..." required></textarea>
        <button type="submit">Enviar 💌</button>
        <div id="formStatus"></div>
      </form>
    </div>
  `;

  main.appendChild(formSec);

  const form = formSec.querySelector("form");
  const status = formSec.querySelector("#formStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Enviando... 💭";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      status.textContent = response.ok
        ? "Mensagem enviada 💌"
        : "Erro 😢";

      if (response.ok) form.reset();
    } catch {
      status.textContent = "Erro 😢";
    }
  });

  if (data.respostas?.length) {
    createSimpleRevealBox(main, "💘 Resposta dela", data.respostas, "Mostrar Resposta");
  }

  /* ====== BOTÃO FLOR ====== */
  const btn = document.createElement('button');
  btn.textContent = "Clique aqui 🌼";
  btn.className = "flower-button";
  btn.onclick = createFlower;
  main.appendChild(btn);

  initSlides(mode);
}

/* ================== SLIDES ================== */
function initSlides(mode) {
  const slides = document.querySelectorAll(
    mode === 'declaracao' ? '.mySlides' : '.mySlides2'
  );
  const controls = document.querySelector('.slideshow-controls');
  const prevBtn = controls?.querySelector('.slide-prev');
  const nextBtn = controls?.querySelector('.slide-next');
  const numberInput = controls?.querySelector('.slide-number');
  const counter = document.querySelector('.slide-counter');

  if (!slides.length) return;

  let current = 0;
  let transitionToken = 0;

  function preloadSlide(index) {
    const slide = slides[(index + slides.length) % slides.length];
    const img = slide?.querySelector('img');
    if (!img || (img.complete && img.naturalWidth > 0)) return;

    img.loading = 'eager';
    const preload = new Image();
    preload.src = img.currentSrc || img.src;
  }

  function waitForImage(img) {
    img.loading = 'eager';

    if (img.complete && img.naturalWidth > 0) {
      return Promise.resolve();
    }

    if (img.decode) {
      return img.decode();
    }

    return new Promise((resolve, reject) => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', reject, { once: true });
    });
  }

  function revealSlide(shouldRestart) {
    slides.forEach((slide, index) => {
      const isActive = index === current;
      slide.classList.toggle('active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });

    if (numberInput && document.activeElement !== numberInput) {
      numberInput.value = String(current + 1);
    }
    if (counter) counter.textContent = `${current + 1}/${slides.length}`;
    preloadSlide(current + 1);

    if (shouldRestart) scheduleNext();
  }

  function updateSlide(nextIndex, shouldRestart = true) {
    const target = (nextIndex + slides.length) % slides.length;
    const token = ++transitionToken;
    const targetImg = slides[target]?.querySelector('img');

    function finishTransition() {
      if (token !== transitionToken) return;
      current = target;
      revealSlide(shouldRestart);
    }

    if (targetImg && !(targetImg.complete && targetImg.naturalWidth > 0)) {
      waitForImage(targetImg)
        .then(finishTransition)
        .catch(() => {
          if (numberInput) numberInput.value = String(current + 1);
          if (shouldRestart) scheduleNext();
        });
      return;
    }

    finishTransition();
  }

  function scheduleNext() {
    if (slideTimeout) clearTimeout(slideTimeout);
    slideTimeout = setTimeout(() => {
      updateSlide(current + 1);
    }, 5200);
  }

  prevBtn?.addEventListener('click', () => updateSlide(current - 1));
  nextBtn?.addEventListener('click', () => updateSlide(current + 1));

  numberInput?.addEventListener('change', () => {
    const typedNumber = Number(numberInput.value);
    const target = Number.isFinite(typedNumber) ? typedNumber : current + 1;
    const clamped = Math.min(Math.max(target, 1), slides.length);
    updateSlide(clamped - 1);
  });

  numberInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') numberInput.blur();
  });

  if (numberInput) {
    numberInput.max = String(slides.length);
  }

  revealSlide(true);
}

/* ================== CONTADOR ================== */
function initCounter(start) {
  if (counterInterval) clearInterval(counterInterval);

  function update() {
    const diff = Date.now() - start;
    $('#days').textContent = Math.floor(diff / 86400000);
    $('#hours').textContent = Math.floor(diff / 3600000) % 24;
    $('#mins').textContent = Math.floor(diff / 60000) % 60;
    $('#secs').textContent = Math.floor(diff / 1000) % 60;
  }

  update();
  counterInterval = setInterval(update, 1000);
}

/* ================== PLAYER MÚSICA ================== */
function initMusicPlayer(){
  const music = document.getElementById("music");
  const musicBtn = document.getElementById("music-btn");
  const musicPlayer = document.getElementById("music-player");
  const musicProgressBar = document.getElementById("music-progress-bar");

  if (!musicBtn || !music) return;

  let isStarting = false;
  const initialText = musicBtn.textContent;
  const playTimeout = 7000;

  function setPlayerState(text, disabled = false){
    musicBtn.textContent = text;
    musicBtn.disabled = disabled;
    musicBtn.setAttribute('aria-busy', disabled ? 'true' : 'false');
  }

  function updateMusicButton(){
    if (isStarting) return;

    setPlayerState(music.paused ? initialText : "⏸ Pausar");

    if (musicPlayer) {
      musicPlayer.classList.toggle("is-playing", !music.paused);
    }
  }

  function updateMusicProgress(){
    if (!musicProgressBar) return;

    const progress = music.duration
      ? (music.currentTime / music.duration) * 100
      : 0;

    musicProgressBar.style.width = `${progress}%`;
  }

  function resetMusic(){
    music.pause();
    music.currentTime = 0;
    updateMusicProgress();
    if (musicPlayer) musicPlayer.classList.remove("is-playing");
    setPlayerState(initialText);
  }

  function withTimeout(promise, ms){
    let timer;

    const timeout = new Promise((_, reject) => {
      timer = setTimeout(() => {
        reject(new Error('Tempo esgotado ao carregar a musica.'));
      }, ms);
    });

    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
  }

  music.volume = 0.75;
  music.preload = "auto";

  musicBtn.addEventListener("click", async () => {
    if (isStarting) return;

    if (!music.paused) {
      music.pause();
      updateMusicButton();
      return;
    }

    isStarting = true;
    setPlayerState("Carregando...", true);
    if (musicPlayer) musicPlayer.classList.remove("is-playing");
    let hasFailed = false;

    try {
      if (music.error || music.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        music.load();
      }

      await withTimeout(music.play(), playTimeout);
    } catch {
      try {
        music.load();
        await withTimeout(music.play(), playTimeout);
      } catch {
        hasFailed = true;
        setPlayerState("Tentar de novo");
        if (musicPlayer) musicPlayer.classList.remove("is-playing");
      }
    } finally {
      isStarting = false;
      if (!hasFailed) updateMusicButton();
    }
  });

  music.addEventListener("play", updateMusicButton);
  music.addEventListener("pause", updateMusicButton);
  music.addEventListener("playing", updateMusicButton);
  music.addEventListener("waiting", () => {
    if (!music.paused) setPlayerState("Carregando...", true);
  });
  music.addEventListener("canplay", updateMusicButton);
  music.addEventListener("timeupdate", updateMusicProgress);
  music.addEventListener("loadedmetadata", updateMusicProgress);

  music.addEventListener("ended", () => {
    resetMusic();
  });

  music.addEventListener("error", () => {
    isStarting = false;
    setPlayerState("Tentar de novo");
    if (musicPlayer) musicPlayer.classList.remove("is-playing");
  });

  updateMusicButton();
}

function setCardText(element, text){
  element.classList.remove('is-long', 'is-extra-long');
  element.textContent = text;

  if (text.length > 520) {
    element.classList.add('is-extra-long');
  } else if (text.length > 220) {
    element.classList.add('is-long');
  }
}

function createSimpleRevealBox(parent, title, items, btnText) {
  const sec = document.createElement('section');
  sec.className = 'section';

  sec.innerHTML = `
    <h2>${title}</h2>
    <div class="white-box">
      <button class="reveal-btn">${btnText}</button>
      <div class="pink-overlay"></div>
    </div>
  `;

  const btn = sec.querySelector('.reveal-btn');
  const overlay = sec.querySelector('.pink-overlay');
  let i = 0;

  btn.onclick = () => {
    overlay.style.display = 'flex';
    overlay.textContent = items[i++ % items.length];
  };

  parent.appendChild(sec);
}

/* ================== REVEAL ================== */
function createRevealBox(parent, title, items, btnText) {
  const sec = document.createElement('section');
  sec.className = 'section reveal-section';
  if (title.includes('Versículos')) sec.classList.add('verse-section');
  const badge = title.trim().split(' ')[0];
  let index = 0;

  sec.innerHTML = `
    <h2>${title}</h2>
    <div class="white-box love-card reveal-card">
      <div class="love-card-top">
        <span class="love-badge">${badge}</span>
        <span class="love-counter reveal-counter"></span>
      </div>
      <p class="love-phrase reveal-phrase"></p>
      <div class="love-controls">
        <button class="prev" type="button" aria-label="Ver item anterior">←</button>
        <label class="slide-jump content-jump">
          <span>Ir para</span>
          <input class="slide-number content-number" type="number" min="1" max="${items.length}" value="1" inputmode="numeric">
        </label>
        <button class="next" type="button" aria-label="Ver próximo item">→</button>
      </div>
    </div>
  `;

  const phrase = sec.querySelector('.reveal-phrase');
  const counter = sec.querySelector('.reveal-counter');
  const numberInput = sec.querySelector('.content-number');

  function update(){
    setCardText(phrase, items[index]);
    counter.textContent = `${index + 1} / ${items.length}`;
    if (numberInput) numberInput.value = String(index + 1);
  }

  sec.querySelector('.prev').onclick = () => {
    index = (index - 1 + items.length) % items.length;
    update();
  };

  sec.querySelector('.next').onclick = () => {
    index = (index + 1) % items.length;
    update();
  };

  numberInput?.addEventListener('change', () => {
    const typedNumber = Number(numberInput.value);
    const target = Number.isFinite(typedNumber) ? typedNumber : index + 1;
    index = Math.min(Math.max(target, 1), items.length) - 1;
    update();
  });

  numberInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') numberInput.blur();
  });

  update();
  parent.appendChild(sec);
}

/* ================== RANDOM ================== */
function addRandomButton(parent, data){
  const lembrancas = [
    "Bobbie Goods",
    "Quebra-Cabeça",
    "Banco Imobiliário",
    "Uno",
    "Baralho",
    "Pôr do Sol",
    "Banho de Chuva",
    "Ir nos Cultos",
    "Oração",
    "Brigadeiro",
    "Lasanhas",
    "Gartic",
    "Stop",
    "Termo",
    "Filmes",
    "Séries",
    "The Office",
    "Documentários",
    "Museus",
    "Praças",
    "Piqueniques",
    "Livros",
    "Skincare",
    "Sorvete",
    "Pizza",
    "Balas azedinhas",
    "Barra de Chocolate ao Leite",
    "Tirar Fotos",
    "New York",
    "Santiago",
    "Gramado",
    "Dia 9",
    "Novembro",
    "Maio",
    "Casamento",
    "Inglês",
    "Alianças",
    "Ir na EBD",
    "Instagram",
    "WhatsApp",
    "Computador",
    "Músicas",
    "Cartinhas românticas",
    "Polaroids",
    "Bolo de Pote",
    "Capinha de Celular",
    "Andar de ônibus",
    "Andar de carro",
    "Andar de moto",
    "Andar de barco",
    "Andar de trem",
    "Avião",
    "Viagens",
    "Estudar",
    "Trabalhar",
    "Dormir",
    "Tomar café",
    "Almoçar",
    "Jantar",
    "Exatamente tudo"
  ];
  let index = 0;

  const sec = document.createElement('section');
  sec.className = 'section memory-section';

  sec.innerHTML = `
    <h2>🎲 Me lembra da gente</h2>
    <div class="white-box love-card memory-card">
      <div class="love-card-top">
        <span class="love-badge">🎲</span>
        <span class="love-counter memory-counter"></span>
      </div>
      <p class="love-phrase memory-result"></p>
      <div class="love-controls">
        <button class="prev" type="button" aria-label="Ver lembrança anterior">←</button>
        <label class="slide-jump content-jump">
          <span>Ir para</span>
          <input class="slide-number content-number" type="number" min="1" max="${lembrancas.length}" value="1" inputmode="numeric">
        </label>
        <button class="next" type="button" aria-label="Ver próxima lembrança">→</button>
      </div>
    </div>
  `;

  const result = sec.querySelector('.memory-result');
  const counter = sec.querySelector('.memory-counter');
  const numberInput = sec.querySelector('.content-number');

  function update(){
    setCardText(result, lembrancas[index]);
    counter.textContent = `${index + 1} / ${lembrancas.length}`;
    if (numberInput) numberInput.value = String(index + 1);
  }

  sec.querySelector('.prev').onclick = () => {
    index = (index - 1 + lembrancas.length) % lembrancas.length;
    update();
  };

  sec.querySelector('.next').onclick = () => {
    index = (index + 1) % lembrancas.length;
    update();
  };

  numberInput?.addEventListener('change', () => {
    const typedNumber = Number(numberInput.value);
    const target = Number.isFinite(typedNumber) ? typedNumber : index + 1;
    index = Math.min(Math.max(target, 1), lembrancas.length) - 1;
    update();
  });

  numberInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') numberInput.blur();
  });

  update();
  parent.appendChild(sec);
}

/* ================== ORAÇÃO ================== */
function addPrayerSystem(parent){
  const sec = document.createElement('section');
  sec.className = 'section prayer-section';

  if (prayerUnsubscribe) {
    prayerUnsubscribe();
    prayerUnsubscribe = null;
  }

  const storageKey = 'nosso-cantinho-prayers';
  const reactionStorageKey = 'nosso-cantinho-prayer-reactions';
  const defaultPrayers = [
    {
      id: 'example',
      text: 'Senhor, abençoa o nosso relacionamento, guia nossos passos e nos ajuda a cuidar um do outro com amor, paciência e sabedoria.',
      date: 'Exemplo de oração',
      reactions: { amem: 0, coracao: 0, orando: 0 }
    }
  ];

  let prayers = defaultPrayers;

  try {
    prayers = JSON.parse(localStorage.getItem(storageKey) || 'null') || defaultPrayers;
  } catch {
    prayers = defaultPrayers;
  }

  sec.innerHTML = `
    <h2>🙏 Pedidos de oração</h2>
    <div class="white-box">
      <form id="prayerForm">
        <textarea name="prayer" placeholder="Escreva uma oração..." required></textarea>
        <button type="submit">Guardar oração 🙏</button>
      </form>
      <div class="prayer-list"></div>
    </div>
  `;

  parent.appendChild(sec);

  const form = sec.querySelector('#prayerForm');
  const list = sec.querySelector('.prayer-list');
  const firestore = db || initFirebase();
  const prayersRef = firestore ? firestore.collection('prayers') : null;

  function savePrayers(){
    localStorage.setItem(storageKey, JSON.stringify(prayers));
  }

  let userReactions = loadUserReactions();

  function loadUserReactions(){
    try {
      return JSON.parse(localStorage.getItem(reactionStorageKey) || '{}') || {};
    } catch {
      return {};
    }
  }

  function saveUserReactions(){
    localStorage.setItem(reactionStorageKey, JSON.stringify(userReactions));
  }

  function getReactionKey(prayer, index, key){
    return `${prayer.id || `local-${index}`}:${key}`;
  }

  function hasReacted(prayer, index, key){
    return Boolean(userReactions[getReactionKey(prayer, index, key)]);
  }

  function setReacted(prayer, index, key, active){
    const reactionKey = getReactionKey(prayer, index, key);

    if (active) {
      userReactions[reactionKey] = true;
    } else {
      delete userReactions[reactionKey];
    }

    saveUserReactions();
  }

  function renderPrayers(){
    list.innerHTML = '';

    prayers.forEach((prayer, index) => {
      prayer.reactions = prayer.reactions || { amem: 0, coracao: 0, orando: 0 };

      const item = document.createElement('div');
      item.className = 'prayer-item';

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'delete-prayer';
      deleteBtn.title = 'Excluir pedido de oração';
      deleteBtn.setAttribute('aria-label', 'Excluir pedido de oração');
      deleteBtn.textContent = '🗑️';
      deleteBtn.onclick = () => {
        const shouldDelete = confirm('Excluir este pedido de oração?');
        if (!shouldDelete) return;

        if (prayersRef && prayer.id !== 'example') {
          prayersRef.doc(prayer.id).delete();
        } else {
          prayers.splice(index, 1);
          savePrayers();
          renderPrayers();
        }
      };

      const text = document.createElement('p');
      text.textContent = prayer.text;

      const date = document.createElement('small');
      date.textContent = prayer.date;

      const actions = document.createElement('div');
      actions.className = 'prayer-actions';

      [
        ['amem', '🙏🏻'],
        ['orando', '🙌🏻'],
        ['coracao', '❤️']
      ].forEach(([key, label]) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        const reacted = hasReacted(prayer, index, key);
        btn.classList.toggle('active', reacted);
        btn.setAttribute('aria-pressed', String(reacted));
        btn.textContent = `${label} (${prayer.reactions[key] || 0})`;
        btn.onclick = () => {
          const shouldReact = !hasReacted(prayer, index, key);
          const change = shouldReact ? 1 : -1;
          setReacted(prayer, index, key, shouldReact);

          if (prayersRef && prayer.id !== 'example') {
            prayersRef.doc(prayer.id).update({
              [`reactions.${key}`]: firebase.firestore.FieldValue.increment(change)
            }).catch(() => {
              setReacted(prayer, index, key, !shouldReact);
              renderPrayers();
            });
          } else {
            prayer.reactions[key] = Math.max((prayer.reactions[key] || 0) + change, 0);
            savePrayers();
            renderPrayers();
          }
        };
        actions.appendChild(btn);
      });

      item.appendChild(deleteBtn);
      item.appendChild(text);
      item.appendChild(date);
      item.appendChild(actions);
      list.appendChild(item);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const textarea = form.querySelector('textarea');
    const text = textarea.value.trim();

    if (!text) return;

    textarea.value = '';

    if (prayersRef) {
      prayersRef.add({
        text,
        date: new Date().toLocaleDateString('pt-BR'),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        reactions: { amem: 0, coracao: 0, orando: 0 }
      });
    } else {
      prayers.unshift({
        id: Date.now().toString(),
        text,
        date: new Date().toLocaleDateString('pt-BR'),
        reactions: { amem: 0, coracao: 0, orando: 0 }
      });

      savePrayers();
      renderPrayers();
    }
  });

  if (prayersRef) {
    prayerUnsubscribe = prayersRef
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        prayers = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        if (!prayers.length) {
          prayers = defaultPrayers;
        }

        renderPrayers();
      }, () => {
        renderPrayers();
      });
  } else {
    renderPrayers();
  }
}

/* ================== 100 COISAS ================== */
function addCarousel100(parent, data){
  const frases = [
    "O teu sorriso",
    "O brilho dos teus olhos",
    "O teu olhar",
    "A tua voz",
    "O teu abraço",
    "O teu cheiro",
    "O teu cabelo",
    "A tua beleza",
    "O teu rosto",
    "O teu carinho",
    "A tua delicadeza",
    "A tua doçura",
    "O teu coração",
    "A tua bondade",
    "A tua sinceridade",
    "A tua paciência",
    "A tua calma",
    "A tua inteligência",
    "A tua fé",
    "O jeito que tu fala super empolgada de algo que tu gosta",
    "A tua gentileza",
    "A tua personalidade",
    "O teu humor",
    "A tua companhia",
    "O teu companheirismo",
    "O teu cuidado",
    "O teu apoio",
    "A tua presença",
    "A tua alegria",
    "O teu jeito fofo",
    "O teu jeito meigo",
    "O teu jeito divertido",
    "O teu jeito carinhoso",
    "O teu jeito gentil",
    "O jeito que tu se esforça mesmo quando está cansada",
    "O teu jeitinho tímido",
    "O teu lado amoroso",
    "O teu lado cuidadoso",
    "O teu amor por Deus",
    "O teu coração temente a Deus",
    "O jeito que tu faz eu sorrir só de lembrar de ti",
    "O jeito que tu fala comigo",
    "O jeito que tu sorri pra mim",
    "O jeito que tu fala meu nome",
    "O jeito que tu pega na minha mão",
    "O jeito que tu se importa com a tua família",
    "O jeito que tu demonstra carinho",
    "O jeito que tu cuida de mim",
    "O jeito que tu se preocupa comigo",
    "O jeito que tu me escuta",
    "O jeito que tu me entende",
    "O jeito que tu me acalma",
    "O jeito que tu me acolhe",
    "O jeito que tu me respeita",
    "O jeito que tu confia em mim",
    "O jeito que tu me apoia",
    "O jeito que tu canta/louva com o coração",
    "O jeito que tu me motiva",
    "O jeito que tu me inspira",
    "O jeito que tu me faz rir",
    "O jeito que tu me anima",
    "O jeito que tu me dá paz",
    "O jeito que tu deixa tudo mais leve",
    "O jeito que tu faz eu me sentir amado",
    "O jeito que tu faz eu me sentir importante",
    "O jeito que tu faz eu me sentir seguro",
    "O jeito que tu faz eu me sentir em casa",
    "O jeito que tu faz meu coração acelerar",
    "O jeito que tu transforma dias comuns em especiais",
    "O jeito que tu melhora qualquer lugar",
    "O jeito que tu ilumina meus dias",
    "O jeito que tu lembra dos detalhes",
    "O jeito que tu manda mensagem",
    "O jeito que tu conversa comigo sobre tudo",
    "O jeito que tu compartilha teus sonhos",
    "O jeito que tu vibra pelas minhas conquistas",
    "O jeito que tu me inclui na tua vida",
    "O jeito que tu escolhe estar comigo",
    "O jeito que tu faz silêncio virar conforto",
    "O jeito que tu demonstra saudade",
    "O jeito que tu demonstra amor nos detalhes",
    "O jeito que tu se importa de verdade",
    "O jeito que tu cuida das pessoas",
    "O jeito que tu ora pela gente",
    "O jeito que tu combina comigo",
    "O jeito que tu é parceira pra tudo",
    "O jeito que tu fica feliz comigo",
    "O jeito que tu me faz querer ser melhor",
    "O jeito que tu me faz agradecer a Deus por te ter",
    "O jeito que tu torna minha vida mais bonita",
    "O jeito que tu faz tudo ter mais sentido",
    "O jeito que tu fica linda sem esforço",
    "O jeito que tu é especial nos detalhes",
    "O jeito que tu é forte mesmo sendo delicada",
    "O jeito que tu é amorosa sem precisar tentar",
    "O jeito que tu é incrível sem nem perceber",
    "O jeito que tu é exatamente quem eu precisava",
    "O jeito que tu é resposta das minhas orações",
    "O jeito que eu amo estar contigo",
    "Tu todinha e tudo que tu faz"
  ];

  let index = 0;

  const sec = document.createElement('section');
  sec.className = 'section love-carousel';

  sec.innerHTML = `
    <h2>💯 100 coisas que amo em ti</h2>
    <div class="white-box love-card">
      <div class="love-card-top">
        <span class="love-badge">❤️</span>
        <span id="contador" class="love-counter"></span>
      </div>
      <p id="frase" class="love-phrase"></p>
      <div class="love-controls">
        <button id="prev" type="button" aria-label="Ver frase anterior">←</button>
        <label class="slide-jump content-jump">
          <span>Ir para</span>
          <input class="slide-number content-number" type="number" min="1" max="${frases.length}" value="1" inputmode="numeric">
        </label>
        <button id="next" type="button" aria-label="Ver próxima frase">→</button>
      </div>
    </div>
  `;

  parent.appendChild(sec);

  const frase = sec.querySelector("#frase");
  const contador = sec.querySelector("#contador");
  const numberInput = sec.querySelector(".content-number");

  function update(){
    setCardText(frase, `${frases[index]} ❤️`);
    contador.textContent = `${index + 1} / ${frases.length}`;
    if (numberInput) numberInput.value = String(index + 1);
  }

  sec.querySelector("#prev").onclick = ()=>{
    index = (index - 1 + frases.length) % frases.length;
    update();
  };

  sec.querySelector("#next").onclick = ()=>{
    index = (index + 1) % frases.length;
    update();
  };

  numberInput?.addEventListener('change', () => {
    const typedNumber = Number(numberInput.value);
    const target = Number.isFinite(typedNumber) ? typedNumber : index + 1;
    index = Math.min(Math.max(target, 1), frases.length) - 1;
    update();
  });

  numberInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') numberInput.blur();
  });

  update();
}

/* ================== MENU ================== */
document.addEventListener("DOMContentLoaded", () => {
  ensureHeartsContainer();
  initFirebase();
  initMusicPlayer();

  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.onclick = () => {
      if (btn.classList.contains('active')) return;

      const main = $('#main-content');
      document.querySelectorAll('.menu-btn').forEach(item => {
        item.classList.remove('active');
      });
      btn.classList.add('active');
      main.classList.add('is-switching');

      setTimeout(() => {
        buildUI(btn.dataset.mode);
        requestAnimationFrame(() => {
          main.classList.remove('is-switching');
        });
      }, 180);
    };
  });

  buildUI("declaracao");
});

/* ================== FLOR ================== */
function createFlower() {
  const flor = document.createElement("img");
  flor.src = "imagens/flor.png";
  flor.className = "temp-flower-img";

  flor.style.left = Math.random() * window.innerWidth + "px";
  flor.style.top = window.scrollY + Math.random() * window.innerHeight + "px";

  document.body.appendChild(flor);
  setTimeout(() => flor.remove(), 2000);
}

/* ================== CORAÇÕES ================== */
(function startHearts() {
  const container = ensureHeartsContainer();
  const hearts = ['💗', '💕', '💖', '💘'];

  setInterval(() => {
    const h = document.createElement('div');
    const isMobile = window.innerWidth <= 600;
    const scale = (isMobile ? 0.75 : 0.9) + Math.random() * 0.55;
    const duration = 5.5 + Math.random() * 4;
    const side = Math.random() < 0.5 ? 1 : -1;

    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.className = 'heart';
    h.style.left = Math.random() * 96 + 'vw';
    h.style.fontSize = Math.round(18 * scale) + 'px';
    h.style.setProperty('--scale', scale.toFixed(2));
    h.style.setProperty('--duration', duration.toFixed(2) + 's');
    h.style.setProperty('--opacity', (0.45 + Math.random() * 0.35).toFixed(2));
    h.style.setProperty('--drift-mid', `${side * (18 + Math.random() * 32)}px`);
    h.style.setProperty('--drift-end', `${side * -1 * (22 + Math.random() * 44)}px`);
    h.style.setProperty('--rotate-mid', `${side * (10 + Math.random() * 28)}deg`);
    h.style.setProperty('--rotate-end', `${side * -1 * (18 + Math.random() * 42)}deg`);

    container.appendChild(h);

    setTimeout(() => h.remove(), duration * 1000);
  }, window.innerWidth <= 600 ? 850 : 520);
})();




