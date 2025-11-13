// FADE-IN
function initFadeIn(){
  const els=document.querySelectorAll('.fade-in');
  function check(){ els.forEach(el=>{ const r=el.getBoundingClientRect(); if(r.top<window.innerHeight-80) el.classList.add('show'); }); }
  window.addEventListener('scroll',check); window.addEventListener('load',check); check();
}
initFadeIn();

// CORAÇÕES
(function hearts(){
  const container=document.getElementById('coracoes');
  function make(){
    const d=document.createElement('div'); d.textContent='❤️';
    const size=Math.random()*20+14;
    d.style.position='absolute'; d.style.left=(Math.random()*100)+'vw'; d.style.top='-40px'; d.style.fontSize=size+'px';
    d.style.opacity=(Math.random()*0.6+0.25).toString(); d.style.pointerEvents='none';
    d.style.transition=`transform ${6+Math.random()*6}s linear, opacity ${6+Math.random()*6}s linear`;
    container.appendChild(d);
    requestAnimationFrame(()=>{ d.style.transform=`translateY(${window.innerHeight+80}px) rotate(${(Math.random()*40)-20}deg)`; d.style.opacity='0'; });
    setTimeout(()=>d.remove(),9000);
  }
  setInterval(make,350);
})();

// SLIDES
const slideContainer=document.querySelector('.slideshow-container');
let slideIndex=0;
let currentBloco='declaracao';
const blocoData={
  declaracao:{
    text:'<p>Aqui começa nossa história...</p>',
    slides:[
      {img:'images/foto1.jpg', date:'13/09/2025'},
      {img:'images/foto2.jpg', date:'13/09/2025'},
      {img:'images/foto3.jpg', date:'21/09/2025'},
      {img:'images/foto4.jpg', date:'21/09/2025'},
      {img:'images/foto5.jpg', date:'28/09/2025'},
      {img:'images/foto6.jpg', date:'28/09/2025'},
      {img:'images/foto7.jpg', date:'28/09/2025'},
      {img:'images/foto8.jpg', date:'04/10/2025'},
      {img:'images/foto9.jpg', date:'10/10/2025'}
    ],
    startDate:'August 11, 2025 11:10:00'
  },
  namoro:{
    text:'<p>Nosso namoro é incrível...</p>',
    slides:[
      {img:'images/fotos10.jpg', date:'09/11/2025'},
      {img:'images/fotos11.jpg', date:'09/11/2025'},
      {img:'images/fotos12.jpg', date:'10/11/2025'},
      {img:'images/fotos13.jpg', date:'10/11/2025'},
      {img:'images/fotos14.jpg', date:'11/11/2025'},
      {img:'images/fotos15.jpg', date:'11/11/2025'},
      {img:'images/fotos16.jpg', date:'12/11/2025'},
      {img:'images/fotos17.jpg', date:'12/11/2025'},
      {img:'images/fotos18.jpg', date:'13/11/2025'},
      {img:'images/fotos19.jpg', date:'13/11/2025'}
    ],
    startDate:'November 9, 2025 16:20:00'
  }
};

// CARREGAR BLOCO
function carregarBloco(bloco){
  currentBloco=bloco;
  document.getElementById('textoBloco').innerHTML=blocoData[bloco].text;
  slideContainer.innerHTML='';
  blocoData[bloco].slides.forEach(s=>{
    const div=document.createElement('div'); div.className='mySlides fade';
    div.innerHTML=`<img src="${s.img}"><div class="polaroid-caption">${s.date}</div>`;
    slideContainer.appendChild(div);
  });
  slideIndex=0;
  showSlides();
  // botão resposta só no bloco declaração
  if(bloco==='declaracao'){document.getElementById('btnResposta').classList.remove('visually-hidden');}else{document.getElementById('btnResposta').classList.add('visually-hidden');}
}
document.getElementById('btn-declaracao').addEventListener('click',()=>carregarBloco('declaracao'));
document.getElementById('btn-namoro').addEventListener('click',()=>carregarBloco('namoro'));

// SLIDES AUTOMÁTICO
function showSlides(){
  const slides=document.querySelectorAll(".mySlides");
  slides.forEach(s=>s.style.display="none");
  slideIndex++;
  if(slideIndex>slides.length) slideIndex=1;
  if(slides[slideIndex-1]) slides[slideIndex-1].style.display="flex";
  setTimeout(showSlides,4000);
}
carregarBloco('declaracao');

// CONTADOR
function atualizarContador(){
  const diff= new Date(blocoData[currentBloco].startDate).getTime() - 0; // placeholder
  const agora=new Date().getTime();
  const total=agora - new Date(blocoData[currentBloco].startDate).getTime();
  const dias=Math.floor(total/(1000*60*60*24));
  const horas=Math.floor((total%(1000*60*60*24))/(1000*60*60));
  const minutos=Math.floor((total%(1000*60*60))/(1000*60));
  const segundos=Math.floor((total%(1000*60))/1000);
  document.getElementById("dias").textContent=dias;
  document.getElementById("horas").textContent=horas;
  document.getElementById("minutos").textContent=minutos;
  document.getElementById("segundos").textContent=segundos;
}
setInterval(atualizarContador,1000);
atualizarContador();

// CARTA
const frasesCarta=["Mensagem 1 exemplo","Mensagem 2 exemplo","Mensagem 3 exemplo"];
let indexCarta=0;
const btnCarta=document.getElementById("btnCarta");
const cartaTexto=document.getElementById("cartaTexto");
btnCarta.addEventListener("click",()=>{
  cartaTexto.classList.remove("visually-hidden");
  cartaTexto.textContent=frasesCarta[indexCarta];
  indexCarta=(index
