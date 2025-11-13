// ==== Corações Caindo ====
(function hearts(){
  const canvas=document.getElementById('coracoes');
  const ctx=canvas.getContext('2d');
  let w,h,hearts=[];
  function resize(){w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight;}
  window.addEventListener('resize',resize);resize();
  function Heart(){this.x=Math.random()*w;this.y=Math.random()*h;this.size=Math.random()*16+10;this.speed=Math.random()*1+0.5;}
  Heart.prototype.draw=function(){ctx.font=this.size+'px serif';ctx.fillText('💗',this.x,this.y);}
  function loop(){ctx.clearRect(0,0,w,h);for(let i=0;i<hearts.length;i++){let ht=hearts[i];ht.y+=ht.speed;if(ht.y>h){ht.y=-10;ht.x=Math.random()*w;}ht.draw();}
    requestAnimationFrame(loop);}
  for(let i=0;i<25;i++)hearts.push(new Heart());
  loop();
})();

// ==== Dados ====
const blocos={
  declaracao:{
    dataInicio:new Date("2025-08-11T11:10:00"),
    slides:[...Array(9)].map((_,i)=>({img:`imagens/foto${i+1}.jpg`,date:`13/09/2025`})),
    texto:`<p>Desde o primeiro dia em que nos conhecemos, tudo ficou mais leve. Este cantinho é pra lembrar de cada momento que nos fez sorrir e agradecer a Deus pelo que Ele tem feito em nós.</p>`,
    mensagens:["Você é minha resposta de oração 💌","Cada dia contigo é um presente.","Obrigado por me fazer sorrir sempre ❤️"],
    versiculos:["O amor é paciente e bondoso. (1 Coríntios 13:4)","Nós amamos porque Ele nos amou primeiro. (1 João 4:19)"]
  },
  namoro:{
    dataInicio:new Date("2025-11-09T16:20:00"),
    slides:[...Array(10)].map((_,i)=>({img:`imagens/fotos${i+10}.jpg`,date:`09/11/2025`})),
    texto:`<p>Nosso namoro começou e com ele veio um novo capítulo. Que Deus continue sendo o centro de tudo o que vivemos, guiando nossos passos com amor e fé.</p>`,
    mensagens:["Te amo mais a cada dia 💕","A presença de Deus em nós é o que nos sustenta.","Contigo eu aprendi o verdadeiro amor 💗"],
    versiculos:["Acima de tudo, revistam-se do amor. (Colossenses 3:14)","O meu mandamento é este: que vos ameis uns aos outros. (João 15:12)"]
  }
};

let blocoAtual='declaracao',slideIndex=0;

// ==== Trocar conteúdo ====
function trocarBloco(nome){
  if(nome==='noivado'||nome==='casamento')return;
  blocoAtual=nome;
  const bloco=blocos[nome];
  const main=document.getElementById('conteudo');
  main.innerHTML=`
  <div class="slideshow-container" id="slideshow"></div>
  <div class="declaracao">${bloco.texto}</div>
  <div class="contador">
    <h2>Nosso tempo juntos</h2>
    <div id="tempoJuntos"><span id="dias"></span> dias, <span id="horas"></span>h <span id="minutos"></span>m <span id="segundos"></span>s</div>
  </div>
  <div class="revelar">
    <h2>Nossas mensagens</h2>
    <button id="btnMsg">Mostrar</button>
    <div id="msgBox" class="box-conteudo visually-hidden"></div>
  </div>
  <div class="versiculos">
    <h2>Versículos</h2>
    <button id="btnVerso">Mostrar</button>
    <div id="versoBox" class="box-conteudo visually-hidden"></div>
  </div>
  <form class="mensagem" id="formMensagem" action="https://formspree.io/f/mayvlpqd" method="POST">
    <div class="form-row">
      <input type="text" name="nome" placeholder="Seu nome" required>
      <input type="email" name="email" placeholder="Seu email" required>
    </div>
    <textarea name="mensagem" rows="4" placeholder="Escreva uma mensagem..." required></textarea>
    <button type="submit">Enviar 💌</button>
    <div id="formStatus"></div>
  </form>
  ${nome==='declaracao'?'<button id="btnResposta">Revelar resposta dela 💗</button>':''}
  `;
  carregarSlides(bloco.slides);
  iniciarContador(bloco.dataInicio);
  configurarBotoes(bloco);
}

// ==== Slides ====
function carregarSlides(slides){
  const cont=document.getElementById('slideshow');
  cont.innerHTML='';
  slides.forEach(s=>{
    const div=document.createElement('div');
    div.className='mySlides';
    div.innerHTML=`<img src="${s.img}"><div class="polaroid-caption">${s.date}</div>`;
    cont.appendChild(div);
  });
  slideIndex=0;
  mostrarSlides();
}
function mostrarSlides(){
  const slides=document.querySelectorAll('.mySlides');
  slides.forEach(s=>s.style.display='none');
  if(slides.length===0)return;
  slideIndex++;
  if(slideIndex>slides.length)slideIndex=1;
  slides[slideIndex-1].style.display='block';
  setTimeout(mostrarSlides,4000);
}

// ==== Contador ====
function iniciarContador(dataInicio){
  function atualizar(){
    const diff=new Date()-dataInicio;
    const dias=Math.floor(diff/(1000*60*60*24));
    const horas=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    const minutos=Math.floor((diff%(1000*60*60))/(1000*60));
    const segundos=Math.floor((diff%(1000*60))/1000);
    document.getElementById('dias').textContent=dias;
    document.getElementById('horas').textContent=horas;
    document.getElementById('minutos').textContent=minutos;
    document.getElementById('segundos').textContent=segundos;
  }
  clearInterval(window.contadorTimer);
  window.contadorTimer=setInterval(atualizar,1000);
  atualizar();
}

// ==== Mensagens e Versículos ====
function configurarBotoes(bloco){
  const btnM=document.getElementById('btnMsg');
  const boxM=document.getElementById('msgBox');
  const btnV=document.getElementById('btnVerso');
  const boxV=document.getElementById('versoBox');
  const btnR=document.getElementById('btnResposta');

  let i=0,j=0;
  btnM.onclick=()=>{boxM.classList.remove('visually-hidden');boxM.textContent=bloco.mensagens[i];i=(i+1)%bloco.mensagens.length;}
  btnV.onclick=()=>{boxV.classList.remove('visually-hidden');boxV.textContent=bloco.versiculos[j];j=(j+1)%bloco.versiculos.length;}
  if(btnR){btnR.onclick=()=>{alert('Resposta dela: 💬 "Eu te amo mais ainda!"');}}
}

// ==== Inicial ====
trocarBloco('declaracao');
