// script.js - interactivity for the romantic site
document.addEventListener('DOMContentLoaded', ()=>{
  // Countdown to next Oct 18
  const countdownEl = document.getElementById('countdown');
  function updateCountdown(){
    const now = new Date();
    let year = now.getFullYear();
    const targetMonth = 9; // Oct (0-indexed)
    const targetDay = 18;
    const target = new Date(year, targetMonth, targetDay);
    if(target < now) target.setFullYear(year+1);
    const diff = target - now;
    const days = Math.floor(diff / (1000*60*60*24));
    countdownEl.textContent = `Next anniversary: ${days} day(s)`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000*60*60);

  // Open when modals
  const openWhen = document.getElementById('open-when');
  const openWhenBtn = document.getElementById('openWhenBtn');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modalContent');
  const closeModal = document.getElementById('closeModal');

  openWhenBtn.addEventListener('click', ()=>{
    openWhen.classList.toggle('hidden');
  });
  document.querySelectorAll('.open-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const key = btn.dataset.key;
      showOpenWhen(key);
    });
  });
  function showOpenWhen(key){
    const messages = {
      sad: "If you're sad: I'm here. Breathe. Remember our silly inside jokes. I love you more than words.",
      thinking: "If you're thinking of me: I'm probably thinking of you too. Remember our cozy nights and cartoony toucans.",
      mad: "If you're mad: It's okay. I'm listening. We'll work it out. Also: here's a cute dog gif (imagine it).",
      bored: "If you're bored: try our little game (coming soon) or open the meme section.",
      celebrate: "If it's a celebration: pop some confetti! You deserve it.",
      miss: "If you miss me: close your eyes, take a deep breath, and picture us at the fair winning stuffed friends."
    };
    modalContent.innerHTML = `<h3>${btnLabel(key)}</h3><p>${messages[key] || "Love you"}</p>`;
    showModal();
  }
  function btnLabel(k){
    return ({sad:"You're sad", thinking:"Thinking of me", mad:"You're mad", bored:"You're bored", celebrate:"Celebrate", miss:"You miss me"}[k]||k)
  }
  function showModal(){modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false')}
  function hideModal(){modal.classList.add('hidden');modal.setAttribute('aria-hidden','true')}
  closeModal.addEventListener('click', hideModal);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) hideModal(); });

  // Surprise button -> random popup
  const surpriseBtn = document.getElementById('surpriseBtn');
  surpriseBtn.addEventListener('click', ()=>{
    const surprises = [
      'You are my favorite person. ♥',
      'Remember the fair? I still have the ticket stub in my wallet.',
      'Tiny virtual hug incoming 🤗',
      'I made you a playlist (in your head) — love songs only.'
    ];
    const s = surprises[Math.floor(Math.random()*surprises.length)];
    modalContent.innerHTML = `<h3>Surprise</h3><p>${s}</p>`;
    showModal();
  });

  // Gallery loader - looks for images in /assets/images named photo1.jpg..photo8.jpg
  const galleryGrid = document.getElementById('galleryGrid');
  function loadGallery(){
    const photos = [];
    for(let i=1;i<=9;i++) photos.push(`/assets/images/photo${i}.jpg`);
    photos.forEach(src=>{
      const img = document.createElement('img');
      img.src = src;
      img.className = 'gallery-item';
      img.alt = 'Memory photo';
      img.addEventListener('click', ()=>{openLightbox(src)});
      galleryGrid.appendChild(img);
    });
  }
  function openLightbox(src){
    modalContent.innerHTML = `<img src="${src}" style="width:100%;border-radius:8px;"/>`;
    showModal();
  }
  loadGallery();

  // Meme area - static list; replace links with your TikToks/YT links
  const memeList = [
    '<div class="meme">Gen Z meme: <em>Replace with your link</em></div>',
    '<div class="meme">When we win stuffed animals: <em>Imagine it</em></div>'
  ];
  const memeFrame = document.getElementById('memeFrame');
  document.getElementById('randomMeme').addEventListener('click', ()=>{
    const m = memeList[Math.floor(Math.random()*memeList.length)];
    memeFrame.innerHTML = m;
  });

});
