document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  
  const CHANNEL_LINK = {
    name: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐒𝐋𝐈𝐘𝐀 𝐗𝐌𝐃 𝐌𝐈𝐍𝐈💝🫣",
    url: "https://whatsapp.com/channel/0029Vb8pc2E0QeahdPemsB2r"
  };

  
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-1';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  });

  const chars = "01アイウエオカキクケコサシスセソタチツテトQUEENASLIYA";
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(4,0,8,0.05)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#ff00ff'; // Queen Magenta
    ctx.font = fontSize + 'px Courier New';
    for(let i=0; i<drops.length; i++) {
      const text = chars[Math.floor(Math.random()*chars.length)];
      ctx.fillText(text, i*fontSize, drops[i]*fontSize);
      if(drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i]=0;
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 35);

  
  const scan = document.createElement('div');
  scan.className = 'scanline';
  scan.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 2px; background: #ff00ff; box-shadow: 0 0 10px #ff00ff; animation: scan 6s linear infinite; z-index: 9999; opacity: 0.5; pointer-events: none;`;
  document.body.appendChild(scan);

  
  const title = document.querySelector('h1');
  if(title){
    const txt = title.textContent;
    title.textContent = '';
    title.style.borderRight = '2px solid #ff00ff';
    let i = 0;
    const type = setInterval(() => {
      title.textContent += txt[i];
      i++;
      if(i >= txt.length) {
        clearInterval(type);
        title.style.borderRight = 'none';
      }
    }, 80);
  }

  
  const phoneInput = document.getElementById("phone");
  const requestPairingBtn = document.getElementById("requestPairing");
  const statusEl = document.getElementById("status");
  const channelModal = document.getElementById("channelModal");
  const modalClose = document.getElementById("modalClose");
  const confirmFollowBtn = document.getElementById("confirmFollow");
  const channelLinkBox = document.getElementById("channelLink");

  let channelsFollowed = localStorage.getItem('channelsFollowed') === 'true'

  
  if(channelLinkBox) {
    channelLinkBox.href = CHANNEL_LINK.url;
    channelLinkBox.innerHTML = `> 👑 ${CHANNEL_LINK.name}`;
    channelLinkBox.style.cssText = `display:block; padding:12px; margin:15px 0; border:1px solid #ff00ff; color:#ff00ff; text-decoration:none; border-radius:8px; text-align:center; transition:0.3s; font-weight:700;`;
    channelLinkBox.onmouseover = () => channelLinkBox.style.boxShadow = '0 0 20px #ff00ff';
    channelLinkBox.onmouseout = () => channelLinkBox.style.boxShadow = 'none';
  }

  
  if (!channelsFollowed && channelModal) {
    setTimeout(() => {
      channelModal.style.display = 'flex';
      setTimeout(() => channelModal.classList.add('active'), 10);
    }, 1500);
  }

  function closeModal() {
    if(!channelModal) return;
    channelModal.classList.remove('active');
    setTimeout(() => { channelModal.style.display = 'none'; }, 300);
  }
  if(modalClose) modalClose.addEventListener('click', closeModal);
  if(channelModal) channelModal.addEventListener('click', (e) => { if (e.target === channelModal) closeModal(); });

  if(confirmFollowBtn) confirmFollowBtn.addEventListener('click', () => {
    channelsFollowed = true;
    localStorage.setItem('channelsFollowed', 'true');
    closeModal();
    showStatus(`[ACCESS GRANTED] ✅ Channel Followed`, "success");
    playBeep(800);
  });


  socket.on("statsUpdate", ({ activeSockets, totalUsers }) => {
    animateNumber("activeSockets", activeSockets);
    animateNumber("totalUsers", totalUsers);
  });

  function animateNumber(id, target) {
    const el = document.getElementById(id);
    if(!el) return;
    let current = parseInt(el.textContent) || 0;
    const step = (target - current) / 10;
    const interval = setInterval(() => {
      current += step;
      if((step > 0 && current >= target) || (step < 0 && current <= target)) {
        current = target;
        clearInterval
