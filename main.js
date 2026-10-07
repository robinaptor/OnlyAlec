document.addEventListener('DOMContentLoaded', () => {
  // === CONFIGURATION GLOBALE ===
  let isMuted = true;
  let clickCount = 0;
  let lastActionTime = Date.now();
  let availablePhrases = [...CONFIG.phrases];
  
  // Audio Context (initialisé au premier clic d'un bouton)
  let audioCtx;
  const initAudio = () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if(audioCtx.state === 'suspended') audioCtx.resume();
  };

  // === 1. PARALLAX & HERO ===
  const hero = document.getElementById('hero');
  const parallaxLayers = document.querySelectorAll('.layer');
  const alecBtn = document.getElementById('alec-btn');
  const bubbleContainer = document.getElementById('bubble-container');
  const clickHint = document.getElementById('click-hint');
  const scrollHint = document.getElementById('scroll-hint');
  
  // Variables pour le parallax
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let time = 0;
  const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
  
  // Mobile / Mouse tracking
  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    lastActionTime = Date.now();
    clickHint.classList.remove('show');
  });
  
  // Pour mobile, on utilise le scroll et un léger balancement automatique
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      targetY = (window.scrollY / window.innerHeight - 0.5) * 2;
    }
  });

  // Boucle d'animation
  function animateParallax() {
    // Si on a scrollé au-delà du hero, on pause
    if (window.scrollY > window.innerHeight) {
      requestAnimationFrame(animateParallax);
      return;
    }

    // Auto balancement léger (sinus)
    time += 0.01;
    const autoX = Math.sin(time) * 0.2;
    
    currentX = lerp(currentX, targetX + autoX, 0.08);
    currentY = lerp(currentY, targetY, 0.08);

    parallaxLayers.forEach(layer => {
      const depth = parseFloat(layer.dataset.depth);
      const moveX = currentX * depth * -100; // max px movement
      const moveY = currentY * depth * -50;
      layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    // Hint trigger
    if (Date.now() - lastActionTime > 2500 && clickCount < 3) {
      clickHint.classList.add('show');
    }

    requestAnimationFrame(animateParallax);
  }
  requestAnimationFrame(animateParallax);

  // Génération de particules (Lucioles)
  const isMobile = window.innerWidth < 768;
  const numFireflies = isMobile ? 12 : 30;
  const fieldLayer = document.querySelector('.fireflies');
  if (fieldLayer) {
    for(let i=0; i<numFireflies; i++) {
      const f = document.createElement('div');
      f.className = 'firefly';
      f.style.left = Math.random() * 100 + '%';
      f.style.top = Math.random() * 100 + '%';
      f.style.animation = `twinkle ${Math.random()*3 + 2}s infinite alternate`;
      
      f.style.transition = 'transform 10s ease-in-out';
      setTimeout(() => {
        setInterval(() => {
          f.style.transform = `translate(${Math.random()*100 - 50}px, ${Math.random()*100 - 50}px)`;
        }, 10000);
        f.style.transform = `translate(${Math.random()*100 - 50}px, ${Math.random()*100 - 50}px)`;
      }, Math.random() * 1000);
      
      fieldLayer.appendChild(f);
    }
  }

  // Pollen
  const pollenLayer = document.querySelector('.pollen-particles');
  for(let i=0; i< (isMobile ? 10 : 20); i++) {
    const p = document.createElement('div');
    p.style.position = 'absolute';
    p.style.width = '6px'; p.style.height = '6px';
    p.style.background = 'rgba(255,255,255,0.4)';
    p.style.borderRadius = '50%';
    p.style.filter = 'blur(2px)';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.transition = 'transform 5s linear';
    pollenLayer.appendChild(p);
    
    setInterval(() => {
      p.style.transform = `translate(${Math.random()*200 - 100}px, ${Math.random()*200 - 100}px)`;
    }, 5000);
  }

  // Alec respiration
  alecBtn.classList.add('breathe');

  // === 2. INTERACTION ALEC ===
  const fartSound = new Audio('assets/burp-fart.mp3');
  const playPop = () => {
    if (isMuted || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch(e) {}
  };

  const playFartSound = () => {
    if (isMuted) return;
    fartSound.currentTime = 0;
    fartSound.play().catch((error) => {
      console.error('Impossible de jouer le son d’Alec.', error);
    });
  };

  const getRandomPhrase = () => {
    if (availablePhrases.length === 0) {
      availablePhrases = [...CONFIG.phrases]; // Refill sack
    }
    const idx = Math.floor(Math.random() * availablePhrases.length);
    return availablePhrases.splice(idx, 1)[0];
  };

  alecBtn.addEventListener('click', (e) => {
    initAudio();
    lastActionTime = Date.now();
    clickHint.classList.remove('show');
    clickCount++;
    
    // Squash & Stretch
    alecBtn.classList.remove('breathe');
    alecBtn.classList.add('squash');
    setTimeout(() => {
      alecBtn.classList.remove('squash');
      alecBtn.classList.add('breathe');
    }, 150);

    // Vibrate
    if (navigator.vibrate) navigator.vibrate(15);
    playPop();

    // Spawn Bubble
    if (document.querySelectorAll('.comic-bubble').length < 6) {
      const bubble = document.createElement('div');
      bubble.className = 'comic-bubble';
      bubble.textContent = getRandomPhrase();
      
      // Random position around Alec (but not exactly on face)
      const isLeft = Math.random() > 0.5;
      const x = isLeft ? Math.random() * 20 + 10 : Math.random() * 20 + 70; // %
      const y = Math.random() * 40 + 20; // %
      const rot = (Math.random() - 0.5) * 12; // +/- 6 deg
      
      bubble.style.left = `${x}%`;
      bubble.style.top = `${y}%`;
      bubble.style.transform = `scale(0.5) rotate(${rot}deg)`;
      
      bubbleContainer.appendChild(bubble);
      
      // Animate in
      requestAnimationFrame(() => {
        bubble.classList.add('show');
        bubble.style.transform = `scale(1) rotate(${rot}deg) translateY(-20px)`;
      });
      
      // Animate out
      setTimeout(() => {
        bubble.style.opacity = '0';
        bubble.style.transform = `scale(0.8) rotate(${rot}deg) translateY(-40px)`;
        setTimeout(() => bubble.remove(), 300);
      }, 3500);
    }

    // Events based on click count
    if (clickCount === 5) {
      document.body.style.transform = 'translate(5px, 5px)';
      setTimeout(() => document.body.style.transform = 'none', 50);
    } else if (clickCount === 10) {
      spawnEmojis(['🔺', '👂', '🍝']);
      playFartSound();
    } else if (clickCount === 35) {
      scrollHint.style.transform = 'scale(1.5)';
      scrollHint.style.color = 'var(--yellow)';
    } else if (clickCount === 50) {
      scrollToProfile();
    }
  });

  const spawnEmojis = (emojis) => {
    for(let i=0; i<20; i++) {
      const el = document.createElement('div');
      el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      el.style.position = 'absolute';
      el.style.left = '50%'; el.style.top = '50%';
      el.style.fontSize = '2rem';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '50';
      document.body.appendChild(el);
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = 50 + Math.random() * 100;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity - 100;
      
      el.style.transition = 'transform 1s cubic-bezier(.17,.67,.83,.67), opacity 1s';
      requestAnimationFrame(() => {
        el.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random()*360}deg)`;
        el.style.opacity = '0';
      });
      setTimeout(() => el.remove(), 1000);
    }
  }

  // Audio Toggle
  document.getElementById('audio-toggle').addEventListener('click', (e) => {
    isMuted = !isMuted;
    e.target.textContent = isMuted ? '🔇' : '🔊';
    initAudio();
  });

  // Scroll to Profile
  const profileSection = document.getElementById('profile');
  const scrollToProfile = () => {
    profileSection.classList.add('active');
    // Smooth scroll
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.2) {
      profileSection.classList.add('active');
    }
  });
  scrollHint.addEventListener('click', scrollToProfile);

  // === 3. BUILD PROFIL ONLYFANS ===
  const feedContainer = document.getElementById('feed-container');
  CONFIG.posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.className = 'of-post';
    
    let mediaHTML = '';
    if (post.isTextOnly) {
      mediaHTML = `<div class="post-media-wrap" style="background:#eee; display:flex; align-items:center; justify-content:center;">
        <div class="post-media" style="background:none; filter:blur(10px); color:black; font-size:1.5rem; text-align:center; padding:20px;">TEXTE CACHÉ<br>TOP SECRET</div>
        <div class="locked-overlay">
          <div class="lock-icon">🔒</div>
          <div>Débloquer pour ${post.price}</div>
          <button class="btn-unlock fake-pay-trigger">Débloquer le message</button>
        </div>
      </div>`;
    } else {
      mediaHTML = `
      <div class="post-media-wrap">
        <div class="post-media" style="background-position: ${post.imagePos}; background-size: ${post.imageScale};"></div>
        <div class="locked-overlay">
          <div class="lock-icon">🔒</div>
          <div>Débloquer pour ${post.price}</div>
          <button class="btn-unlock fake-pay-trigger">Débloquer</button>
        </div>
      </div>`;
    }

    postEl.innerHTML = `
      <div class="post-header">
        <div class="post-avatar"></div>
        <div class="post-author">
          <h4>Alec Vionnet <span class="verified-badge" style="font-size:1rem;">✓</span></h4>
          <span>@alec_cherche_une_naine • ${post.time}</span>
        </div>
        ${post.pinned ? '<div class="pin-icon">📌</div>' : ''}
      </div>
      <div class="post-text before-text">${post.beforeText}</div>
      <div class="post-text after-text" style="display:none;">${post.afterText}</div>
      ${mediaHTML}
      <div class="post-actions">
        <span>❤️</span> <span>💬 ${post.comments}</span>
        <span class="tip fake-pay-trigger">💸 Pourboire</span>
      </div>
      <div class="post-likes">${post.likes}</div>
    `;
    feedContainer.appendChild(postEl);
  });

  // Reviews
  const reviewsContainer = document.getElementById('reviews-container');
  CONFIG.reviews.forEach(rev => {
    const stars = '★'.repeat(rev.stars) + '☆'.repeat(5-rev.stars);
    const div = document.createElement('div');
    div.className = 'review';
    div.innerHTML = `<div class="stars-text">${stars}</div><p>"${rev.text}"</p><small>— ${rev.author}</small>`;
    reviewsContainer.appendChild(div);
  });

  // Mobile Sticky CTA Logic
  const mobileCta = document.querySelector('.mobile-cta');
  window.addEventListener('scroll', () => {
    if (window.innerWidth < 768 && window.scrollY > window.innerHeight * 1.5) {
      mobileCta.style.display = 'block';
    } else {
      mobileCta.style.display = 'none';
    }
  });

  // Viewer Count fluctuation
  setInterval(() => {
    const vc = document.getElementById('viewer-count');
    let count = parseInt(vc.textContent);
    count += Math.random() > 0.5 ? 1 : -1;
    if(count < 0) count = 0;
    if(count > 5) count = 5;
    vc.textContent = count;
  }, 3000);


  // === 4. PAIEMENT & REVELATION ===
  const paymentOverlay = document.getElementById('payment-overlay');
  const paymentModal = document.getElementById('payment-modal');
  const btnPay = document.getElementById('btn-pay');
  const paymentLoading = document.getElementById('payment-loading');
  const loadingText = document.getElementById('loading-text');
  const progressFill = document.getElementById('progress-fill');
  
  // Attach fake payment to all triggers
  document.querySelectorAll('.fake-pay-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      paymentOverlay.classList.add('show');
      paymentModal.classList.add('show');
    });
  });

  document.getElementById('close-modal').addEventListener('click', () => {
    paymentOverlay.classList.remove('show');
    paymentModal.classList.remove('show');
  });

  // Selection de l'offre
  window.selectOffer = function(el) {
    document.querySelectorAll('.offer').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
  };

  btnPay.addEventListener('click', () => {
    // Start fake process
    paymentLoading.classList.add('show');
    
    const steps = [
      { text: "Connexion à ta banque... 🏦", p: 20, time: 1300 },
      { text: "Vérification du solde... (aïe)", p: 40, time: 1300 },
      { text: "Appel de ta mère pour autorisation...", p: 60, time: 1500 },
      { text: "Conversion des euros en pâtes... 🍝", p: 80, time: 1200 },
      { text: "Traitement...", p: 99, time: 3000 },
      { text: "Erreur 418 : I'm a teapot ☕", p: 99, time: 1500 },
      { text: "Paiement ACCEPTÉ ✅", p: 100, time: 1000 }
    ];

    let currentStep = 0;
    const processStep = () => {
      if (currentStep >= steps.length) {
        triggerRevelation();
        return;
      }
      const step = steps[currentStep];
      loadingText.textContent = step.text;
      progressFill.style.width = step.p + '%';
      
      if (step.text.includes("Erreur 418")) {
        loadingText.style.color = "red";
      } else if (step.text.includes("ACCEPTÉ")) {
        loadingText.style.color = "green";
      } else {
        loadingText.style.color = "black";
      }

      currentStep++;
      setTimeout(processStep, step.time);
    };
    
    processStep();
  });

  function triggerRevelation() {
    // Hide Modals
    paymentOverlay.classList.remove('show');
    paymentModal.classList.remove('show');
    
    // Trigger body class
    document.body.classList.add('revelation-active');
    
    // Swap texts
    document.querySelectorAll('.of-post').forEach(post => {
      post.querySelector('.before-text').style.display = 'none';
      post.querySelector('.after-text').style.display = 'block';
    });

    // Confetti
    for(let i=0; i<50; i++) {
      const conf = document.createElement('div');
      conf.className = 'confetti';
      conf.textContent = Math.random() > 0.5 ? '🔺' : '🤡';
      conf.style.left = Math.random() * 100 + 'vw';
      conf.style.animationDuration = (Math.random() * 3 + 2) + 's';
      conf.style.animationDelay = Math.random() * 2 + 's';
      document.body.appendChild(conf);
    }
    
    // Play sound if possible
    initAudio();
    playPop();
  }

  // Easter Egg Refund button runs away
  const btnRefund = document.getElementById('btn-refund');
  const moveRefund = () => {
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    btnRefund.style.transform = `translate(${x}px, ${y}px)`;
  };
  btnRefund.addEventListener('mouseover', moveRefund);
  btnRefund.addEventListener('touchstart', (e) => { e.preventDefault(); moveRefund(); });

  // Share
  document.getElementById('btn-share').addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: 'Alec cherche une naine',
        text: 'Regarde ça, c\'est du génie.',
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié ! Va piéger un pote.');
    }
  });

  // Replay
  document.getElementById('btn-replay').addEventListener('click', () => {
    window.location.reload();
  });

  // === 5. GAGS BONUS ===
  // Tab Title
  const originalTitle = document.title;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.title = "Alec t'attend... 🥺";
    } else {
      document.title = originalTitle;
    }
  });

  // Toasts
  const toastContainer = document.getElementById('toast-container');
  setInterval(() => {
    if (Math.random() > 0.6 && !document.body.classList.contains('revelation-active')) {
      const text = CONFIG.toasts[Math.floor(Math.random() * CONFIG.toasts.length)];
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = text;
      toastContainer.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    }
  }, 8000);

  // Logo Spin
  let logoClicks = 0;
  document.getElementById('of-logo').addEventListener('click', () => {
    logoClicks++;
    if(logoClicks === 7) {
      document.body.style.transition = 'transform 2s';
      document.body.style.transform = 'rotate(360deg)';
      spawnEmojis(['🔺', '🔺', '🔺', '🔺']);
      setTimeout(() => {
        document.body.style.transition = 'none';
        document.body.style.transform = 'none';
        logoClicks = 0;
      }, 2000);
    }
  });
});
