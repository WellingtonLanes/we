/* FADE-IN AO ROLAR */
function initFadeIn() {
    const els = document.querySelectorAll('.fade-in');
    function check() { els.forEach(el => { const r = el.getBoundingClientRect(); if(r.top < window.innerHeight - 80) el.classList.add('show'); }); }
    window.addEventListener('scroll', check);
    window.addEventListener('load', check);
    check();
}
initFadeIn();

/* ===== Slideshow ===== */
let slideIndex = 0;
function showSlides() {
    const slides = document.querySelectorAll(".mySlides");
    slides.forEach(s => s.style.display="none");
    slideIndex++;
    if(slideIndex>slides.length){ slideIndex=1; }
    slides[slideIndex-1].style.display="block";
    setTimeout(showSlides, 3000); // 3 segundos
}
showSlides();

/* ===== Corações ===== */
(function hearts(){
  const container=document.getElementById('coracoes');
  function make(){ const d=document.createElement('div'); d.textContent='❤️'; const size=Math.random()*20+14; d.style.position='absolute'; d.style.left=(Math.random()*100)+'vw'; d.style.top='-40px'; d.style.fontSize=size+'px'; d.style.opacity=(Math.random()*0.6+0.25).toString(); d.style.pointerEvents='none'; d.style.transition=`transform ${6+Math.random()*6}s linear, opacity ${6+Math.random()*6}s linear`; container.appendChild(d); requestAnimationFrame(()=>{ d.style.transform=`translateY(${window.innerHeight+80}px) rotate(${(Math.random()*40)-20}deg)`; d.style.opacity='0'; }); setTimeout(()=>d.remove(),9000); }
  setInterval(make,350);
})();

/* ===== Contador ===== */
const datas = { declaracao: new Date("August 11, 2025 11:10:00").getTime(), namoro: new Date("November 9, 2025 16:20:00").getTime() };
let dataAtual = datas.declaracao;
function atualizarContador() {
    const agora=new Date().getTime();
    const diff=agora-dataAtual;
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

/* ===== Versículos ===== */
const versos=["O amor é paciente, o amor é bondoso. (1 Cor 13:4-7)","Nós amamos porque Ele nos amou primeiro. (1 João 4:19)","O amor não faz mal ao próximo. (Rm 13:10)"];
let idx=0;
const btnV=document.getElementById('btnVersiculo'), boxV=document.getElementById('versiculoBox');
btnV.addEventListener('click',()=>{ boxV.classList.remove('visually-hidden'); boxV.textContent="📖 "+versos[idx]; idx=(idx+1)%versos.length; });

/* ===== Mensagens ===== */
const frasesCarta=["Que bommm, valeu muito a pena...","Qualquer coisa que eu faça contigo é muito bom.","só de poder compartilhar contigo já está bommm ❤️"];
let indexCarta=0;
const btnC=document.getElementById("btnCarta"), cartaTexto=document.getElementById("cartaTexto");
btnC.addEventListener("click",()=>{ cartaTexto.classList.remove("visually-hidden"); cartaTexto.textContent="💌 "+frasesCarta[indexCarta]; indexCarta=(indexCarta+1)%frasesCarta.length; });

/* ===== Botão revelar resposta dela ===== */
const btnR=document.getElementById("btnResposta"), resposta=document.getElementById("respostaTexto");
btnR.addEventListener("click",()=>{ resposta.classList.remove("visually-hidden"); resposta.textContent="💖 Exemplo de resposta dela"; });

/* ===== Menu troca de blocos ===== */
document.querySelectorAll(".menu-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
        const bloco=btn.getAttribute("data-bloco");
        if(!bloco) return;
        dataAtual=datas[bloco]; // muda data do contador
        document.querySelectorAll(".slide").forEach(s=>s.style.display="none");
        document.querySelector("."+bloco+"-slide").style.display="block";
    });
});

/* ===== Formspree ===== */
(function formHandler(){
    const form=document.getElementById('formMensagem'), status=document.getElementById('formStatus');
    form.addEventListener('submit',async(e)=>{
        e.preventDefault();
        status.textContent='Enviando...';
        const data=new FormData(form);
        try{
            const res=await fetch(form.action,{ method:'POST', body:data, headers
