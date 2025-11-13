/* ===== FADE-IN ===== */
function initFadeIn(){const els=document.querySelectorAll('.fade-in');function check(){els.forEach(el=>{const r=el.getBoundingClientRect();if(r.top<window.innerHeight-80)el.classList.add('show');});}window.addEventListener('scroll',check);window.addEventListener('load',check);check();}
initFadeIn();

/* ===== CORAÇÕES ===== */
(function hearts(){const container=document.getElementById('coracoes');function make(){const d=document.createElement('div');d.textContent='❤️';const size=Math.random()*20+14;d.style.position='absolute';d.style.left=(Math.random()*100)+'vw';d.style.top='-40px';d.style.fontSize=size+'px';d.style.opacity=(Math.random()*0.6+0.25).toString();d.style.pointerEvents='none';d.style.transition=`transform ${6+Math.random()*6}s linear, opacity ${6+Math.random()*6}s linear`;container.appendChild(d);requestAnimationFrame(()=>{d.style.transform=`translateY(${window.innerHeight+80}px) rotate(${(Math.random()*40)-20}deg)`;d.style.opacity='0';});setTimeout(()=>d.remove(),9000);}setInterval(make,350);})();

/* ===== DADOS DOS BLOCOS ===== */
const blocoData={
  declaracao:{
    slides:[
      {img:'imagens/foto1.jpg',date:'13/09/2025'},
      {img:'imagens/foto2.jpg',date:'13/09/2025'},
      {img:'imagens/foto3.jpg',date:'21/09/2025'},
      {img:'imagens/foto4.jpg',date:'21/09/2025'},
      {img:'imagens/foto5.jpg',date:'28/09/2025'},
      {img:'imagens/foto6.jpg',date:'28/09/2025'},
      {img:'imagens/foto7.jpg',date:'28/09/2025'},
      {img:'imagens/foto8.jpg',date:'04/10/2025'},
      {img:'imagens/foto9.jpg',date:'10/10/2025'}
    ],
    text:'<p>Este é o texto do bloco Declaração.</p>'
  },
  namoro:{
    slides:[
      {img:'imagens/fotos10.jpg',date:'09/11/2025'},
      {img:'imagens/fotos11.jpg',date:'09/11/2025'},
      {img:'imagens/fotos12.jpg',date:'10/11/2025'},
      {img:'imagens/fotos13.jpg',date:'10/11/2025'},
      {img:'imagens/fotos14.jpg',date:'11/11/2025'},
      {img:'imagens/fotos15.jpg',date:'11/11/2025'},
      {img:'imagens/fotos16.jpg',date:'12/11/2025'},
      {img:'imagens/fotos17.jpg',date:'12/11/2025'},
      {img:'imagens/fotos18.jpg',date:'13/11/2025'},
      {img:'imagens/fotos19.jpg',date:'13/11/2025'}
    ],
    text:'<p>Este é o texto do bloco Namoro.</p>'
  }
};

const slideContainer=document.getElementById('slideContainer');
let slideIndex=0;
let currentBloco='declaracao';

/* ===== CARREGAR BLOCOS ===== */
function carregarBloco(bloco){
  currentBloco=bloco;
  document.getElementById('textoBloco').innerHTML=blocoData[bloco].text;
  slideContainer.innerHTML='';
  blocoData[bloco].slides.forEach(s=>{
    const div=document.createElement('div');
    div.className='mySlides fade';
    div.innerHTML=`<img src="${s.img}"><div class="polaroid-caption">${s.date}</div>`;
    slideContainer.appendChild(div);
  });
  slideIndex=0;
  showSlides();
  // botão resposta apenas no declaracao
  if(bloco==='declaracao'){
    document.getElementById('btnResposta').classList.remove('visually-hidden');
  }else{
    document.getElementById('btnResposta').classList.add('visually-hidden');
  }
}

/* ===== SLIDE ===== */
function showSlides(){
  const slides=document.querySelectorAll(".mySlides");
  slides.forEach(s=>s.style.display='none');
  slideIndex++;
  if(slides.length>0){
    if(slideIndex>slides.length) slideIndex=1;
    slides[slideIndex-1].style.display='flex';
  }
  setTimeout(showSlides,4000);
}

carregarBloco('declaracao');

/* ===== CONTADOR ===== */
let inicioDatas={'declaracao':'August 11, 2025 11:10:00','namoro':'November 9, 2025 16:20:00'};
function atualizarContador(){
  const agora=new Date().getTime();
  const diff=agora-new Date(inicioDatas[currentBloco]).getTime();
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

/* ===== MENSAGENS ===== */
const frasesCarta=[
  "Mensagem 1",
  "Mensagem 2",
  "Mensagem 3"
];
let indexCarta=0;
const btnCarta=document.getElementById("btnCarta");
const cartaTexto=document.getElementById("cartaTexto");
btnCarta.addEventListener("click",()=>{
  cartaTexto.classList.remove("visually-hidden");
  cartaTexto.textContent=frasesCarta[indexCarta];
  indexCarta=(indexCarta+1)%frasesCarta.length;
});

/* ===== RESPOSTA DELA ===== */
const btnResposta=document.getElementById('btnResposta');
const respostaTexto=document.getElementById('respostaTexto');
btnResposta.addEventListener('click',()=>{
  respostaTexto.classList.remove('visually-hidden');
  respostaTexto.textContent='Resposta dela liberada ❤️';
});

/* ===== VERSÍCULOS ===== */
(function versos(){
  const versos=["Versículo 1","Versículo 2","Versículo 3"];
  let idx=0;
  const btn=document.getElementById('btnVersiculo');
  const box=document.getElementById('versiculoBox');
  btn.addEventListener('click',()=>{
    box.classList.remove('visually-hidden');
    box.textContent=versos[idx];
    idx=(idx+1)%versos.length;
  });
})();

/* ===== FORMULÁRIO ===== */
(function formHandler(){
  const form=document.getElementById('formMensagem');
  const status=document.getElementById('formStatus');
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    status.textContent='Enviando...';
    const data=new FormData(form);
    try{
      const res=await fetch(form.action,{method:'POST',body:data,headers:{'Accept':'application/json'}});
      if(res.ok){status.textContent='Mensagem enviada 💌';form.reset();}
      else{ const json=await res.json(); status.textContent=json.error||'Erro ao enviar — tente novamente';}
    }catch(err){ status.textContent='Erro ao enviar — verifique sua conexão'; }
    setTimeout(()=>status.textContent='',5000);
  });
})();
