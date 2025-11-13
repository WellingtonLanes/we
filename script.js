/* ============================
   script.js - Nosso Cantinho
   ============================ */

/* FADE-IN AO ROLAR */
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  function check() { els.forEach(el => { const r = el.getBoundingClientRect(); if(r.top<window.innerHeight-80) el.classList.add('show'); }); }
  window.addEventListener('scroll', check);
  window.addEventListener('load', check);
  check();
}
initFadeIn();

/* CORAÇÕES */
(function hearts(){
  const container = document.getElementById('coracoes');
  function make() {
    const d = document.createElement('div');
    d.textContent = '❤️';
    const size = Math.random()*20 + 14;
    d.style.position='absolute';
    d.style.left=(Math.random()*100)+'vw';
    d.style.top='-40px';
    d.style.fontSize=size+'px';
    d.style.opacity=(Math.random()*0.6+0.25).toString();
    d.style.pointerEvents='none';
    d.style.transition=`transform ${6+Math.random()*6}s linear, opacity ${6+Math.random()*6}s linear`;
    container.appendChild(d);
    requestAnimationFrame(()=>{ d.style.transform=`translateY(${window.innerHeight+80}px) rotate(${(Math.random()*40)-20}deg)`; d.style.opacity='0'; });
    setTimeout(()=>d.remove(),9000);
  }
  setInterval(make,350);
})();

/* SLIDE DE POLAROIDS */
let slideIndex=0;
function showSlides(){
  const slides=document.querySelectorAll(".mySlides");
  slides.forEach(s=>s.style.display="none");
  slideIndex++;
  if(slideIndex>slides.length) slideIndex=1;
  slides[slideIndex-1].style.display="flex";
  setTimeout(showSlides,4000);
}
showSlides();

/* CONTADOR */
document.addEventListener("DOMContentLoaded",()=>{
  const dataInicio=new Date("August 11, 2025 11:10:00").getTime();
  function atualizarContador(){
    const agora=new Date().getTime();
    const diff=agora-dataInicio;
    const dias=Math.floor(diff/(1000*60*60*24));
    const horas=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    const minutos=Math.floor((diff%(1000*60*60))/(1000*60));
    const segundos=Math.floor((diff%(1000*60))/1000);
    document.getElementById("dias").textContent=dias;
    document.getElementById("horas").textContent=horas;
    document.getElementById("minutos").textContent=minutos;
    document.getElementById("segundos").textContent=segundos;
  }
  setInterval(atualizarContador,1000);
  atualizarContador();
});

/* MENU FUNCIONAL */
let currentMode="declaracao";
const letter=document.querySelector('.declaracao');
const slidesImgs=document.querySelectorAll(".mySlides img");

const contentData={
  declaracao:{ letter:`"Oii
