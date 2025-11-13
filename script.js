/* FADE-IN */
function initFadeIn(){ const els=document.querySelectorAll('.fade-in'); function check(){ els.forEach(el=>{ const r=el.getBoundingClientRect(); if(r.top<window.innerHeight-80) el.classList.add('show'); });} window.addEventListener('scroll',check); window.addEventListener('load',check); check();}
initFadeIn();

/* SLIDES */
let slideIndex = 0;
function showSlides(){
  const slides = document.querySelectorAll(".mySlides");
  slides.forEach(s=>s.style.display="none");
  slideIndex++;
  if(slideIndex>slides.length) slideIndex=1;
  slides[slideIndex-1].style.display="flex";
  setTimeout(showSlides,3000); // 3s
}
showSlides();

/* CORAÇÕES */
(function hearts(){ const container=document.getElementById('coracoes'); function make(){ const d=document.createElement('div'); d.textContent='❤️'; const size=Math.random()*20+14; d.style.position='absolute'; d.style.left=(Math.random()*100)+'vw'; d.style.top='-40px'; d.style.fontSize=size+'px'; d.style.opacity=(Math.random()*0.6+0.25).toString(); d.style.pointerEvents='none'; d.style.transition=`transform ${6+Math.random()*6}s linear, opacity ${6+Math.random()*6}s linear`; container.appendChild(d); requestAnimationFrame(()=>{ d.style.transform=`translateY(${window.innerHeight+80}px) rotate(${(Math.random()*40)-20}deg)`; d.style.opacity='0'; }); setTimeout(()=>d.remove(),9000);} setInterval(make,350);})();

/* CONTADOR */
const blocosData = { declaracao:"August 11,2025 11:10:00", namoro:"November 9,2025 16:20:00"};
let blocoAtual="declaracao";
function atualizarContador(){
  const dataInicio=new Date(blocosData[blocoAtual]).getTime();
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

/* VERSICULOS */
(function versos(){
  const versos=[
    "O amor é paciente e bondoso ❤️ (1 Coríntios 13:4–7)",
    "Nós amamos porque Ele nos amou primeiro ✨ (1 João 4:19)",
    "O amor não faz mal ao próximo 💖 (Romanos 13:10)"
  ];
  let idx=0;
  const btn=document.getElementById('btnVersiculo');
  const box=document.getElementById('versiculoBox');
  if(!btn||!box) return;
  btn.addEventListener('click',()=>{
    box.classList.remove('visually-hidden');
    box.textContent=versos[idx];
    idx=(idx+1)%versos.length;
  });
})();

/* MENSAGENS */
const frasesCarta=[
  "Que bom, valeu muito a pena 💌",
  "Qualquer coisa que eu faça contigo é muito bom 💖",
  "só de poder compartilhar contigo já está bom 😘"
];
let indexCarta=0;
const btnCarta=document.getElementById("btnCarta");
const cartaTexto=document.getElementById("cartaTexto");
btnCarta.addEventListener("click",()=>{
  cartaTexto.classList.remove("visually-hidden");
  cartaTexto.textContent=frasesCarta[indexCarta];
  indexCarta=(indexCarta+1)%frasesCarta.length;
});

/* FORMSPREE */
(function formHandler(){
  const form=document.getElementById('formMensagem');
  const status=document.getElementById('formStatus');
  if(!form) return;
  form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    status.textContent='Enviando...';
    const data=new FormData(form);
    try{
      const res=await fetch(form.action,{method:'POST',body:data,headers:{'Accept':'application/json'}});
      if(res.ok){status.textContent='Mensagem enviada 💌'; form.reset();} 
      else {const json=await res.json(); status.textContent=json.error||'Erro ao enviar — tente novamente';}
    }catch(err){status.textContent='Erro ao enviar — verifique sua conexão';}
    setTimeout(()=>status.textContent='',5000);
  });
})();

/* REVELAR RESPOSTA DELA */
const btnResp=document.getElementById('btnResposta');
const respTexto=document.getElementById('respostaTexto');
btnResp.addEventListener('click',()=>{
  respTexto.classList.remove('visually-hidden');
  respTexto.textContent="Aqui está a resposta dela de exemplo 💌";
});

/* MENU */
const menuBtns=document.querySelectorAll('.menu-btn');
menuBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const bloco=btn.dataset.bloco;
    blocoAtual=bloco;
    atualizarContador();
    // Mostrar apenas slides do bloco
    document.querySelectorAll('.mySlides').forEach(s=>{
      s.style.display='none';
    });
    document.querySelectorAll(`.${bloco}-slide`).forEach(s=>s.style.display='flex');
    // Trocar texto
    document.getElementById('texto-bloco').textContent="Aqui vai o texto do bloco "+bloco;
  });
});
