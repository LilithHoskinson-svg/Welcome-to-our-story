// script.js - interactivity for the romantic site
// Updated: added personalized open-when messages, animated timeline behaviors, meme embeds

document.addEventListener('DOMContentLoaded', ()=>{
  // Countdown to next Oct 18
  const countdownEl = document.getElementById('countdown');
  function updateCountdown(){
    const now = new Date();
    let year = now.getFullYear();
    const targetMonth = 9; // Oct (0-indexed)
    const targetDay = 18;
    let target = new Date(year, targetMonth, targetDay, 0,0,0);
    if(target <= now) target = new Date(year+1, targetMonth, targetDay, 0,0,0);
    const diff = target - now;
    const days = Math.floor(diff / (1000*60*60*24));
    const hrs = Math.floor((diff / (1000*60*60)) % 24);
    const mins = Math.floor((diff / (1000*60)) % 60);
    countdownEl.textContent = `Next anniversary: ${days}d ${hrs}h ${mins}m`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000*60);

  // Open when modals (personalized messages)
  const openWhen = document.getElementById('open-when');
  const openWhenBtn = document.getElementById('openWhenBtn');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modalContent');
  const closeModal = document.getElementById('closeModal');

  openWhenBtn.addEventListener('click', ()=>{
    openWhen.classList.toggle('hidden');
  });

  const messages = {
    sad: `Hey you — I'm sorry you're feeling down. Remember the way you make me laugh and the little things we share. Take a breath. I'm proud of you and I love you. — L`,
    thinking: `If you're thinking of me, know I'm thinking of you too. Picture us on a silly fair ride, holding tight. I'm always with you.`,
    mad: `If you're mad: I hear you. Your feelings matter. When you're ready, let's talk it out with hugs and bad snacks.`,
    bored: `Bored? Try this: open the meme section, or pick a photo and tell me your favorite moment from it.`,
    celebrate: `Hooray! Time to celebrate you. Confetti and kisses coming your way. I'm so proud of everything you are.`,
    miss: `If you miss me: close your eyes and remember our quiet nights. Imagine me sitting right beside you.`,
    tired: `Tired? Rest. I'm holding you in my thoughts. Take a nap and dream of toucans.`,
    angry: `Need a laugh? Remember that time we won the giant pink bear? It looked more surprised than you did.`
  };

  function showOpenWhen(key){
    modalContent.innerHTML = `<h3>${humanLabel(key)}</h3><p>${messages[key] || "I love you."}</p>`;
    showModal();
  }
  function humanLabel(k){
    return ({sad:"You're sad", thinking:"Thinking of me", mad:"You're mad", bored:"You're bored", celebrate:"Celebrate", miss:"You miss me", tired:"You're tired", angry:"Need a laugh"}[k]||k)
  }

  document.querySelectorAll('.open-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> showOpenWhen(btn.dataset.key));
  });

  function showModal(){modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false')}
  function hideModal(){modal.classList.add('hidden');modal.setAttribute('aria-hidden','true')}
  closeModal.addEventListener('click', hideModal);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) hideModal(); });

  // Surprise button -> random popup with tiny confetti animation
  const surpriseBtn = document.getElementById('surpriseBtn');
  surpriseBtn.addEventListener('click', ()=>{
    const surprises = [
      'You are my favorite person. ♥',
      'Remember the fair? I still have the ticket stub in my wallet.',
      'Tiny virtual hug incoming 🤗',
      'I made you a playlist in my head — love songs only.'
    ];
    const s = surprises[Math.floor(Math.random()*surprises.length)];
    modalContent.innerHTML = `<h3>Surprise</h3><p>${s}</p><div class="confetti" aria-hidden="true"></div>`;
    showModal();
    runConfetti();
  });

  function runConfetti(){
    // simple temporary confetti by adding colored squares
    const c = modalContent.querySelector('.confetti');
    if(!c) return;
    for(let i=0;i<28;i++){
      const d = document.createElement('div');
      d.style.position='absolute';
      d.style.left=Math.random()*80+'%';
      d.style.top=Math.random()*40+'%';
      d.style.width='8px';d.style.height='8px';d.style.background=['#ff8fab','#ffd1dc','#ffd66b','#a7e9af'][Math.floor(Math.random()*4)];
      d.style.opacity='0.95';d.style.transform='rotate('+Math.random()*360+'deg)';
      c.appendChild(d);
      setTimeout(()=>d.remove(),1800+Math.random()*1200);
    }
  }

  // Gallery loader - uses images placed in /assets/images/photo1.jpg..photo9.jpg
  const galleryGrid = document.getElementById('galleryGrid');
  function loadGallery(){
    const photos = [];
    for(let i=1;i<=9;i++) photos.push(`/assets/images/photo${i}.jpg`);
    photos.forEach((src, idx)=>{
      const img = document.createElement('img');
      img.src = src;
      img.className = 'gallery-item';
      img.alt = `Memory ${idx+1}`;
      img.addEventListener('click', ()=>{openLightbox(src)});
      img.addEventListener('error', ()=>{ img.style.opacity = '0.3'; img.alt = 'missing'; });
      galleryGrid.appendChild(img);
    });
  }
  function openLightbox(src){
    modalContent.innerHTML = `<img src="${src}" style="width:100%;border-radius:8px;"/>`;
    showModal();
  }
  loadGallery();

  // Meme area - curated Gen Z-style YouTube shorts / meme embeds
  const memeList = [
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/2Vv-BfVoq4g" title="YouTube video" frameborder="0" allowfullscreen></iframe>`,
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/yb0Qj6s1gA0" title="YouTube video" frameborder="0" allowfullscreen></iframe>`,
    `<div class="meme">"When we get matching plushies" — imagine the dance. 🐻🩷</div>`
  ];
  const memeFrame = document.getElementById('memeFrame');
  document.getElementById('randomMeme').addEventListener('click', ()=>{
    const m = memeList[Math.floor(Math.random()*memeList.length)];
    memeFrame.innerHTML = m;
  });

  // Accessibility: allow ESC to close modal
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') hideModal(); });

});
