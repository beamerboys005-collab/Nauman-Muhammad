/* =====================================================
   NAUMAN MUHAMMAD — ROYAL FUTURISTIC AI STUDIO
   Premium Portfolio JS — Professional Edition
   ===================================================== */

'use strict';

/* =================== LOADER =================== */
(function initLoader() {
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loader-bar');
  const loaderText = document.getElementById('loader-text');
  const messages = [
    'Loading Portfolio...',
    'Calibrating 3D Engine...',
    'Loading Credentials...',
    'Welcome!'
  ];
  let progress = 0;
  let msgIdx = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 25 + 10;
    if (progress > 100) progress = 100;
    bar.style.width = progress + '%';
    const newMsgIdx = Math.floor((progress / 100) * (messages.length - 1));
    if (newMsgIdx !== msgIdx) {
      msgIdx = newMsgIdx;
      loaderText.textContent = messages[msgIdx];
    }
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('loaded');
        document.body.style.overflow = '';
        triggerReveal();
      }, 300);
    }
  }, 50);
  document.body.style.overflow = 'hidden';
})();

/* =================== CUSTOM CURSOR =================== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }, { passive: true });

  (function animFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animFollower);
  })();

  document.querySelectorAll('a, button, .service-card, .skill-card, .cert-card, .pillar').forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
  });
}

/* =================== SCROLL REVEAL =================== */
function triggerReveal() {
  const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-right]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));
}

/* =================== NAVIGATION =================== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const navToggle = document.getElementById('nav-toggle');
const navLinksEl = document.getElementById('nav-links');
const sections = document.querySelectorAll('section[id]');

let isTicking = false;
window.addEventListener('scroll', () => {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      let current = 'home';
      sections.forEach(sec => {
        const top = sec.offsetTop - 140;
        if (window.scrollY >= top) current = sec.id;
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
      });
      isTicking = false;
    });
    isTicking = true;
  }
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* =================== SMOOTH SCROLL =================== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* =================== MAGNETIC BUTTONS =================== */
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate3d(0,0,0)';
  });
});

/* =================== 3D TILT CARDS =================== */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
  });
});

/* =================== PORTRAIT 3D EFFECT =================== */
const portrait3d = document.getElementById('portrait-3d');
if (portrait3d) {
  document.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const rx = ((e.clientY - centerY) / centerY) * -6;
    const ry = ((e.clientX - centerX) / centerX) * 6;
    portrait3d.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }, { passive: true });
}

/* =================== RELIABLE EMAIL BUTTON HANDLER =================== */
const emailAddress = 'naumanmuhammad.business@gmail.com';
document.querySelectorAll('.email-trigger').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    // 1. Copy email address to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailAddress).catch(() => {});
    }

    // 2. Open Gmail compose in new tab
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent('Inquiry for Nauman Muhammad')}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');

    // 3. Trigger native mailto: fallback
    setTimeout(() => {
      window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent('Inquiry for Nauman Muhammad')}`;
    }, 300);

    // 4. Show friendly toast notification
    showToast(`Copied email (${emailAddress}) & opened mail client!`);
  });
});

function showToast(msg) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    Object.assign(toast.style, {
      position: 'fixed', bottom: '30px', right: '30px', zIndex: '100001',
      background: 'rgba(6,6,8,0.95)', border: '1px solid #ff2a4b',
      borderRadius: '8px', padding: '14px 22px', color: '#ffffff',
      fontFamily: "'JetBrains Mono', monospace", fontSize: '13px',
      boxShadow: '0 10px 30px rgba(255,42,75,0.4)', transition: 'all 0.3s ease',
      opacity: '0', transform: 'translateY(20px)'
    });
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 4000);
}

/* =================== HERO THREE.JS CANVAS =================== */
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({
    canvas, alpha: true, antialias: false, powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  camera.position.z = 80;

  // Neural network nodes
  const particleCount = window.innerWidth < 768 ? 50 : 110;
  const positions = [];
  const nodePositions = [];
  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 190;
    const y = (Math.random() - 0.5) * 110;
    const z = (Math.random() - 0.5) * 50;
    positions.push(x, y, z);
    nodePositions.push(new THREE.Vector3(x, y, z));
  }

  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const nodeMat = new THREE.PointsMaterial({
    color: 0x8b0e20, size: 1.3, sizeAttenuation: true, transparent: true, opacity: 0.85
  });
  const nodes = new THREE.Points(nodeGeo, nodeMat);
  scene.add(nodes);

  // Line connections
  const linePositions = [];
  const maxDist = 32;
  for (let i = 0; i < nodePositions.length; i++) {
    for (let j = i + 1; j < nodePositions.length; j++) {
      if (nodePositions[i].distanceTo(nodePositions[j]) < maxDist) {
        linePositions.push(
          nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
          nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
        );
      }
    }
  }
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0x440812, transparent: true, opacity: 0.35 });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  // Floating geometric objects
  const torusGeo = new THREE.TorusGeometry(13, 0.35, 8, 48);
  const torusMat = new THREE.MeshBasicMaterial({ color: 0x620b16, wireframe: true, transparent: true, opacity: 0.15 });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.position.set(42, -8, -18);
  scene.add(torus);

  const icosaGeo = new THREE.IcosahedronGeometry(9, 0);
  const icosaMat = new THREE.MeshBasicMaterial({ color: 0x8b0e20, wireframe: true, transparent: true, opacity: 0.12 });
  const icosa = new THREE.Mesh(icosaGeo, icosaMat);
  icosa.position.set(-48, 18, -25);
  scene.add(icosa);

  let mouseNX = 0, mouseNY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseNX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseNY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  let rafId;
  function animate() {
    rafId = requestAnimationFrame(animate);
    const t = Date.now() * 0.0008;
    nodes.rotation.y = t * 0.04 + mouseNX * 0.06;
    nodes.rotation.x = t * 0.02 + mouseNY * 0.04;
    lines.rotation.y = nodes.rotation.y;
    lines.rotation.x = nodes.rotation.x;
    torus.rotation.x = t * 0.25;
    torus.rotation.y = t * 0.18;
    icosa.rotation.x = t * 0.12;
    icosa.rotation.z = t * 0.18;
    camera.position.x = mouseNX * 4;
    camera.position.y = -mouseNY * 2.5;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else animate();
  });
})();

/* =================== SERVICES CANVAS =================== */
(function initServicesCanvas() {
  const canvas = document.getElementById('services-canvas');
  if (!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 500);
  camera.position.z = 60;

  const count = 50;
  const pts = [];
  for (let i = 0; i < count; i++) {
    pts.push((Math.random() - 0.5) * 170, (Math.random() - 0.5) * 90, (Math.random() - 0.5) * 35);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const mat = new THREE.PointsMaterial({ color: 0xb01228, size: 1.4, transparent: true, opacity: 0.45 });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  let rafId;
  function animate() {
    rafId = requestAnimationFrame(animate);
    points.rotation.y += 0.002;
    points.rotation.x += 0.0008;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else animate();
  });
})();

/* =================== CONTACT CANVAS =================== */
(function initContactCanvas() {
  const canvas = document.getElementById('contact-canvas');
  if (!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 500);
  camera.position.z = 60;

  const ringGeos = [
    new THREE.TorusGeometry(18, 0.25, 6, 36),
    new THREE.TorusGeometry(12, 0.2, 6, 28)
  ];
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x620b16, wireframe: true, transparent: true, opacity: 0.18 });
  const rings = ringGeos.map(g => {
    const m = new THREE.Mesh(g, ringMat);
    scene.add(m);
    return m;
  });
  rings[0].position.set(38, 8, -18);
  rings[1].position.set(-38, -8, -10);

  let rafId;
  function animate() {
    rafId = requestAnimationFrame(animate);
    const t = Date.now() * 0.0008;
    rings[0].rotation.x = t * 0.25; rings[0].rotation.y = t * 0.18;
    rings[1].rotation.x = t * 0.18; rings[1].rotation.z = t * 0.22;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else animate();
  });
})();

/* =================== GSAP ANIMATIONS =================== */
(function initGSAP() {
  if (!window.gsap) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.0, ease: 'power3.out' });
  gsap.fromTo('.hero-name', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.9, delay: 1.2, ease: 'power3.out' });
  gsap.fromTo('.hero-roles', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.45, ease: 'power3.out' });
  gsap.fromTo('.hero-sub-roles', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.6, ease: 'power3.out' });
  gsap.fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.75, ease: 'power3.out' });
  gsap.fromTo('.hero-ctas', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.9, ease: 'power3.out' });
  gsap.fromTo('.hero-social', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 2.05, ease: 'power3.out' });
  gsap.fromTo('.portrait-glass-frame', { opacity: 0, scale: 0.93 }, { opacity: 1, scale: 1, duration: 1.1, delay: 1.3, ease: 'power3.out' });

  if (window.ScrollTrigger) {
    gsap.fromTo('.skill-card', { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.skills-section', start: 'top 82%' }
    });
    gsap.fromTo('.service-card', { opacity: 0, scale: 0.94 }, {
      opacity: 1, scale: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out',
      scrollTrigger: { trigger: '.services-section', start: 'top 82%' }
    });
    gsap.fromTo('.cert-card', { opacity: 0, y: 45 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.certs-section', start: 'top 82%' }
    });
    gsap.fromTo('.pillar', { opacity: 0, scale: 0.85 }, {
      opacity: 1, scale: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-pillars', start: 'top 88%' }
    });
  }
})();

/* =================== CONTACT FORM =================== */
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('form-name').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const service = document.getElementById('form-service').value;
  const details = document.getElementById('form-details').value.trim();
  const statusEl = document.getElementById('form-status');

  if (!name || !email || !service || !details) {
    statusEl.textContent = 'Please fill in all fields.';
    statusEl.className = 'form-status error';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    statusEl.textContent = 'Please enter a valid email address.';
    statusEl.className = 'form-status error';
    return;
  }

  const msg = encodeURIComponent(
    `Hello Nauman! 👋\n\nName: ${name}\nEmail: ${email}\nService: ${service}\n\nProject Details:\n${details}`
  );
  const waUrl = `https://wa.me/923714627153?text=${msg}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');

  statusEl.textContent = '✓ Opening WhatsApp with your message...';
  statusEl.className = 'form-status success';
  this.reset();
  setTimeout(() => { statusEl.textContent = ''; statusEl.className = 'form-status'; }, 5000);
});

/* =================== TYPED EFFECT =================== */
(function typeHeroRoles() {
  const el = document.querySelector('.hero-eyebrow span:last-child');
  if (!el) return;
  const texts = ['Available for Projects', 'Open to Collaborations', 'Let\'s Build Together'];
  let idx = 0;
  function cycle() {
    el.style.opacity = '0';
    setTimeout(() => {
      idx = (idx + 1) % texts.length;
      el.textContent = texts[idx];
      el.style.opacity = '1';
    }, 350);
  }
  el.style.transition = 'opacity 0.35s ease';
  setInterval(cycle, 3800);
})();
