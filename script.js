/* Fade-in */
function initFadeIn() {
  document.querySelectorAll('.fade-in').forEach(el=>{
    const check = ()=> { if(el.getBoundingClientRect().top < window.innerHeight-80) el.classList.add('show'); };
    window.addEventListener('scroll', check);
    window.addEventListener('load', check);
    check();
  });
}
initFadeIn();

/* Slides */
let slideIndex=0, slideInterval;
function showSlides(){
  const slides=document.querySelectorAll('.mySlides');
  slides.forEach(s=>s.style.display='none');
  slideIndex++;
  if(slideIndex>slides.length) slideIndex=1;
  slides[slideIndex-1].style.display='block';
  slideInterval=setTimeout(showSlides,3000);
}
showSlides();

/* Corações */
(function hearts(){
  const container=document.getElementById('coracoes');
  function make(){
    const d=document.createElement('div');
    d.textContent='❤️';
    const size=Math.random()*20+14;
    d.style.position='absolute';
    d.style.left=(Math.random()*100)+'vw';
    d.style.top='-40px';
    d.style.fontSize=size+'px';
    d.style.opacity=(Math.random()*0.6+0.25).toString();
    d.style.pointerEvents='none';
    d.style.transition=`transform ${6+Math.random()*6}s linear, opacity ${6+Math.random()*6}s linear`;
    container.appendChild(d);
    requestAnimationFrame(()=>{ d.style.transform=`translateY(${window.innerHeight+80}px) rotate(${(Math.random()*40)-20}deg)`; d.style.opacity='0';});
    setTimeout(()=>d.remove(),9000);
  }
  setInterval(make,350);
})();

/* Contador */
let dataInicio=new Date("August 11, 2025 11:10:00").getTime();
function atualizarContador(){
  const agora=new Date().getTime();
  const diff=agora-dataInicio;
  const dias=Math.floor(diff/(1000*60*60*24));
  const horas=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const minutos=Math.floor((diff%(1000*60*60))/(1000*60));
  const segundos=Math.floor((diff%(1000*60))/1000);
  document.getElementById('dias').textContent=dias;
  document.getElementById('horas').textContent=horas;
  document.getElementById('minutos').textContent=minutos;
  document.getElementById('segundos').textContent=segundos;
}
setInterval(atualizarContador,1000);
atualizarContador();

/* Menu */
const menuBtns=document.querySelectorAll('.menu-btn');
const textoBloco=document.getElementById('texto-bloco');
menuBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const bloco=btn.dataset.bloco;
    document.querySelectorAll('.declaracao-slide, .namoro-slide').forEach(s=>s.style.display='none');
    if(bloco==='declaracao'){
      document.querySelectorAll('.declaracao-slide').forEach(s=>s.style.display='block');
      dataInicio=new Date("August 11, 2025 11:10:00").getTime();
      textoBloco.innerHTML="<p>Aqui vai o texto da Declaração</p>";
      document.getElementById('btnResposta').style.display='inline-block';
    } else if(bloco==='namoro'){
      document.querySelectorAll('.namoro-slide').forEach(s=>s.style.display='block');
      dataInicio=new Date("November 09, 2025 16:20:00").getTime();
      textoBloco.innerHTML="<p>Aqui vai o texto do Namoro</p>";
      document.getElementById('btnResposta').style.display='none';
      document.getElementById('respostaTexto').classList.add('visually-hidden');
    }
    slideIndex=0; clearTimeout(slideInterval); showSlides();
  });
});

/* Mensagens */
const frasesCarta=["Mensagem 1 💌","Mensagem 2 💖","Mensagem 3 💕"];
let indexCarta=0;
const btnCarta=document.getElementById("btnCarta");
const cartaTexto=document.getElementById("cartaTexto");
btnCarta.addEventListener("click",()=>{
  cartaTexto.classList.remove("visually-hidden");
  cartaTexto.textContent=frasesCarta[indexCarta];
  indexCarta=(indexCarta+1)%frasesCarta.length;
});

/* Versículos */
const versos=["O amor é paciente... (1 Coríntios 13:4-7) 💕","Nós amamos porque Ele nos amou primeiro (1 João 4:19) 💖"];
let idxVerso=0;
const btnVersiculo=document.getElementById("btnVersiculo");
const versiculoBox=document.getElementById("versiculoBox");
btnVersiculo.addEventListener("click",()=>{
  versiculoBox.classList.remove("visually-hidden");
  versiculoBox.textContent=versos[idxVerso];
  idxVerso=(idxVerso+1)%versos.length;
});

/* Formulário */
const form=document.getElementById('formMensagem');
const status=document.getElementById('formStatus');
form.addEventListener('submit',async e=>{
  e.preventDefault();
  status.textContent='Enviando...';
  const data=new FormData(form);
  try{
    const res=await fetch(form.action,{method:'POST',body:data,headers:{'Accept':'application/json'}});
    if(res.ok){status.textContent='Mensagem enviada 💌'; form.reset();}
    else{ const json=await res.json(); status.textContent=json.error||'Erro ao enviar';}
  } catch(err){status.textContent='Erro ao enviar — verifique sua conexão';}
  setTimeout(()=>status.textContent='',5000);
});

/* Resposta dela só Declaração */
const btnResposta=document.getElementById('btnResposta');
const respostaTexto=document.getElementById('respostaTexto');
btnResposta.addEventListener('click',()=>{
  respostaTexto.classList.remove('visually-hidden');
  respostaTexto.textContent="Aqui vai a resposta dela 💖";
});
