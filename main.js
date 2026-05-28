import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

/* ============================================
   UTILITY
============================================ */
const qs  = (s) => document.querySelector(s);
const qsa = (s) => [...document.querySelectorAll(s)];

/* ============================================
   NOISE CANVAS
============================================ */
function initNoise() {
  const canvas = qs('#noise-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const S = 200;
  canvas.width = canvas.height = S;

  function gen() {
    const img = ctx.createImageData(S, S);
    const d   = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = 20;
    }
    ctx.putImageData(img, 0, 0);
    requestAnimationFrame(gen);
  }
  gen();
}

/* ============================================
   CIRCUIT BACKGROUND CANVAS
============================================ */
function initCircuitBackground() {
  const canvas = qs('#circuit-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    initGrid();
  });

  // Color theme: glowing crimson/red/purple highlights
  const colorTrace = 'rgba(239, 68, 68, 0.07)';
  const colorPulse = 'rgba(248, 113, 113, 0.75)';
  const colorNode = 'rgba(239, 68, 68, 0.35)';
  const colorText = 'rgba(239, 68, 68, 0.04)';

  // Traces config
  const maxTraces = 35;
  const traces = [];
  
  // Matrix rain columns
  const fontSize = 14;
  let cols = Math.floor(w / 30);
  const rainDrops = [];

  function initGrid() {
    cols = Math.floor(w / 30);
    rainDrops.length = 0;
    for (let i = 0; i < cols; i++) {
      rainDrops[i] = Math.random() * -h;
    }
  }
  initGrid();

  class Trace {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.length = 50 + Math.random() * 150;
      this.currentLen = 0;
      this.speed = 1.2 + Math.random() * 2.2;
      
      // 0, 45, 90, 135, 180, 225, 270, 315 degrees
      const angleChoice = [
        0, 
        Math.PI / 4, 
        Math.PI / 2, 
        (3 * Math.PI) / 4, 
        Math.PI, 
        (5 * Math.PI) / 4, 
        (3 * Math.PI) / 2, 
        (7 * Math.PI) / 4
      ];
      this.angle = angleChoice[Math.floor(Math.random() * angleChoice.length)];
      
      this.dx = Math.cos(this.angle) * this.speed;
      this.dy = Math.sin(this.angle) * this.speed;
      
      this.history = [{ x: this.x, y: this.y }];
      this.pulsePos = 0;
      this.pulseSpeed = 0.015 + Math.random() * 0.025;
      this.nodes = [];
    }

    update() {
      if (this.currentLen < this.length) {
        this.x += this.dx;
        this.y += this.dy;
        this.currentLen += this.speed;
        this.history.push({ x: this.x, y: this.y });

        // Periodically spawn small static nodes
        if (Math.random() < 0.018) {
          this.nodes.push({ x: this.x, y: this.y, size: 1.5 + Math.random() * 2 });
        }
      } else {
        // Trace is complete, animate the pulse along it
        this.pulsePos += this.pulseSpeed;
        if (this.pulsePos >= 1) {
          this.reset();
        }
      }
    }

    draw() {
      // Draw background trace path
      ctx.beginPath();
      ctx.moveTo(this.history[0].x, this.history[0].y);
      for (let i = 1; i < this.history.length; i++) {
        ctx.lineTo(this.history[i].x, this.history[i].y);
      }
      ctx.strokeStyle = colorTrace;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Draw pulse particle traveling along the trace
      if (this.history.length > 1 && this.currentLen >= this.length) {
        const pulseIndex = Math.min(
          this.history.length - 1,
          Math.floor(this.pulsePos * (this.history.length - 1))
        );
        const p = this.history[pulseIndex];
        if (p) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = colorPulse;
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(239, 68, 68, 0.9)';
          ctx.fill();
          ctx.shadowBlur = 0; // Reset shadow blur
        }
      }

      // Draw nodes
      this.nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = colorNode;
        ctx.fill();
      });
    }
  }

  // Populate traces
  for (let i = 0; i < maxTraces; i++) {
    traces.push(new Trace());
  }

  // Mouse interactivity
  let mouse = { x: -9999, y: -9999, active: false };
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  const chars = '01';
  let frame = 0;

  function render() {
    frame++;
    // Draw trail overlay (using deep dark bg color to fade canvas elements slowly)
    ctx.fillStyle = 'rgba(5, 1, 8, 0.12)';
    ctx.fillRect(0, 0, w, h);

    // 1. Draw Traces
    traces.forEach(t => {
      t.update();
      t.draw();
    });

    // 2. Draw Matrix rain of binary code
    if (frame % 2 === 0) {
      ctx.fillStyle = colorText;
      ctx.font = `${fontSize}px var(--font-mono)`;
      for (let i = 0; i < cols; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 30;
        const y = rainDrops[i];

        ctx.fillText(char, x, y);

        rainDrops[i] += fontSize;
        if (rainDrops[i] > h && Math.random() > 0.985) {
          rainDrops[i] = -20;
        }
      }
    }

    // 3. Mouse interactive circle glow
    if (mouse.active) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.02)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ============================================
   CUSTOM CURSOR
============================================ */
function initCursor() {
  const dot   = qs('#cursor-dot');
  const ring  = qs('#cursor-ring');
  const label = qs('#cursor-label');

  if (!dot || window.matchMedia('(pointer: coarse)').matches) return;

  let mx = 0, my = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;

    gsap.to(dot, { x: mx, y: my, duration: 0.04, ease: 'none' });
    gsap.to(ring, { x: mx, y: my, duration: 0.22, ease: 'power2.out' });

    if (label) {
      gsap.to(label, { x: mx + 20, y: my - 16, duration: 0.15, ease: 'power2.out' });
    }
  });

  // Hover interactions
  qsa('a, button, .bcard, .cert-card, .c-pill, .btn-primary, .btn-ghost, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(ring, { scale: 1.9, borderColor: '#c084fc', duration: 0.35, ease: 'power2.out' });
      gsap.to(dot, { scale: 0.5, duration: 0.2 });

      const text = el.getAttribute('data-cursor');
      if (text && label) {
        label.textContent = text;
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.25 });
      }
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(192,132,252,0.6)', duration: 0.35 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
      if (label) gsap.to(label, { opacity: 0, scale: 0.7, duration: 0.2 });
    });
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => gsap.to([dot, ring], { opacity: 0 }));
  document.addEventListener('mouseenter', () => gsap.to([dot, ring], { opacity: 1 }));
}


/* ============================================
   HERO ENTRANCE
============================================ */

function initHeroEntrance() {
  // ── STEP 1: Immediately set every hero element to its hidden state via
  //           inline GSAP styles (these beat CSS defaults, no flash).
  gsap.set('.nav',           { yPercent: -100 });
  gsap.set('.hero-eyebrow',  { opacity: 0, y: 20 });
  gsap.set('.hero-hi',       { opacity: 0, y: 20 });
  gsap.set('.nc',            { opacity: 0, y: 130, skewY: 8 });
  gsap.set('.hero-role-row', { opacity: 0, y: 20 });
  gsap.set('.hero-desc',     { opacity: 0, y: 20 });
  gsap.set('.hero-cta',      { opacity: 0, y: 20 });
  gsap.set('.hero-stats',    { opacity: 0, y: 20 });
  gsap.set('.scroll-hint',   { opacity: 0 });
  gsap.set('#hero-bitmoji',  { opacity: 0, x: 80 });
  gsap.set('.float-badge',   { opacity: 0, scale: 0 });

  // ── STEP 2: Animate everything in with gsap.to() (since we already set
  //           the start state above, to() goes straight to the end values).
  gsap.to('.nav', { yPercent: 0, duration: 1, ease: 'power3.out', delay: 0.15 });

  const tl = gsap.timeline({ delay: 0.25, defaults: { ease: 'power3.out' } });

  tl.to('.hero-eyebrow', { y: 0, opacity: 1, duration: 0.6 })
    .to('.hero-hi',       { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
    .to('.nc', {
      y: 0, opacity: 1, skewY: 0,
      stagger: 0.055,
      duration: 0.8,
      ease: 'power4.out'
    }, '-=0.2')
    .to('.hero-role-row', { y: 0, opacity: 1, duration: 0.5 }, '-=0.35')
    .to('.hero-desc',     { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
    .to('.hero-cta',      { y: 0, opacity: 1, duration: 0.5 }, '-=0.25')
    .to('.hero-stats',    { y: 0, opacity: 1, duration: 0.5 }, '-=0.25')
    .to('#hero-bitmoji',  { x: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }, 0.3)
    .to('.scroll-hint',   { opacity: 1, duration: 0.8 }, '-=0.3');

  // Counters
  qsa('.hs-num').forEach(el => {
    const target = parseInt(el.dataset.count || 0);
    gsap.to({ val: 0 }, {
      val: target,
      duration: 2,
      delay: 1.2,
      ease: 'power2.out',
      onUpdate() { el.textContent = Math.floor(this.targets()[0].val); },
      onComplete() { el.textContent = target; }
    });
  });
}

/* ============================================
   TYPED TEXT
============================================ */
function initTyped() {
  const el = qs('#typed-role');
  if (!el) return;

  const words = [
    'Full Stack Developer',
    'Blockchain Enthusiast',
    'Creative Coder',
    'Problem Solver',
    'React.js Developer',
  ];
  let i = 0;

  function type(word) {
    gsap.to(el, {
      duration: word.length * 0.06,
      text: { value: word, delimiter: '' },
      ease: 'none',
      onComplete: () => setTimeout(() => erase(word), 2200)
    });
  }

  function erase(word) {
    gsap.to(el, {
      duration: word.length * 0.035,
      text: { value: '', delimiter: '' },
      ease: 'none',
      onComplete: () => {
        i = (i + 1) % words.length;
        setTimeout(() => type(words[i]), 350);
      }
    });
  }

  setTimeout(() => type(words[0]), 1600);
}

/* ============================================
   MOUSE PARALLAX
============================================ */
function initParallax() {
  const bitmoji = qs('#hero-bitmoji');
  const orbs    = qsa('.orb');

  document.addEventListener('mousemove', (e) => {
    const nx = (e.clientX / window.innerWidth  - 0.5) * 2;  // -1 to 1
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;

    // Bitmoji follows mouse gently
    if (bitmoji) {
      gsap.to(bitmoji, {
        x: nx * 18,
        y: ny * 12,
        duration: 0.9,
        ease: 'power2.out'
      });
    }

    // Orbs parallax
    orbs.forEach((orb) => {
      const depth = parseFloat(orb.dataset.depth || 0.15) * 60;
      gsap.to(orb, {
        x: nx * depth,
        y: ny * depth,
        duration: 1.4,
        ease: 'power2.out'
      });
    });
  });
}

/* ============================================
   MAGNETIC BUTTONS
============================================ */
function initMagnetic() {
  qsa('.mag-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r  = btn.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      gsap.to(btn, {
        x: dx * 0.38,
        y: dy * 0.38,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0, y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.45)'
      });
    });
  });
}

/* ============================================
   TEXT SCRAMBLE
============================================ */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#';

function scramble(el) {
  const original = el.getAttribute('data-scramble') || el.textContent;
  let iter = 0;
  const total = original.length * 4;

  const iv = setInterval(() => {
    el.textContent = original.split('').map((ch, idx) => {
      if (ch === ' ') return ' ';
      if (idx < iter / 4) return original[idx];
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');

    if (iter >= total) { clearInterval(iv); el.textContent = original; }
    iter++;
  }, 28);
}

/* ============================================
   SCROLL ANIMATIONS
============================================ */
function initScrollAnimations() {
  const cfg = (trigger, start = 'top 83%') => ({
    scrollTrigger: { trigger, start, once: true }
  });

  // Section labels
  qsa('.sec-label').forEach(el => gsap.from(el, { ...cfg(el), x: -25, opacity: 0, duration: 0.7 }));

  // Section titles — scramble on scroll
  qsa('[data-scramble]').forEach(el => {
    ScrollTrigger.create({
      trigger: el, start: 'top 82%', once: true,
      onEnter: () => {
        gsap.from(el, { y: 55, opacity: 0, duration: 0.9, ease: 'power3.out' });
        scramble(el);
      }
    });
  });

  // About texts
  qsa('.about-p').forEach((p, i) => {
    gsap.from(p, { ...cfg(p), y: 30, opacity: 0, duration: 0.7, delay: i * 0.12 });
  });

  // Skill chips — stagger from random
  ScrollTrigger.create({
    trigger: '.skill-wrap', start: 'top 85%', once: true,
    onEnter: () => gsap.from('.skill-chip', {
      scale: 0, opacity: 0, stagger: { each: 0.05, from: 'random' },
      duration: 0.45, ease: 'back.out(1.8)'
    })
  });

  // Photo
  gsap.from('.photo-frame-wrap', {
    ...cfg('.photo-frame-wrap', 'top 80%'),
    scale: 0.88, opacity: 0, duration: 1, ease: 'power3.out'
  });

  // About float cards
  qsa('.about-float-card').forEach((c, i) => {
    gsap.from(c, { ...cfg(c), scale: 0, opacity: 0, duration: 0.6, delay: 0.3 + i * 0.1, ease: 'back.out(1.5)' });
  });

  // Bento cards — stagger reveal
  qsa('.bcard').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: '.bento-grid', start: 'top 82%', once: true },
      y: 70, opacity: 0, duration: 0.9,
      delay: i * 0.12,
      ease: 'power3.out'
    });
  });

  // Experience
  gsap.from('.exp-block', { ...cfg('.exp-block', 'top 80%'), x: -60, opacity: 0, duration: 0.9 });

  // Edu cards
  qsa('.edu-card').forEach((c, i) => {
    gsap.from(c, { ...cfg(c), y: 40, opacity: 0, duration: 0.7, delay: i * 0.15 });
  });

  // Cert cards — stagger
  qsa('.cert-card').forEach((c, i) => {
    gsap.from(c, {
      scrollTrigger: { trigger: '.certs-grid', start: 'top 83%', once: true },
      y: 55, opacity: 0, duration: 0.7,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });

  // Contact
  gsap.from('.contact-heading', { ...cfg('.contact-heading', 'top 80%'), y: 60, opacity: 0, duration: 1 });
  gsap.from('.contact-sub',     { ...cfg('.contact-sub', 'top 85%'), y: 30, opacity: 0, duration: 0.7, delay: 0.15 });
  gsap.from('.contact-email-link', { ...cfg('.contact-email-link', 'top 85%'), y: 30, opacity: 0, duration: 0.8, delay: 0.25 });

  qsa('.c-pill').forEach((c, i) => {
    gsap.from(c, {
      scrollTrigger: { trigger: '.contact-pills', start: 'top 88%', once: true },
      y: 25, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out'
    });
  });

  // Footer
  gsap.from('.footer', { ...cfg('.footer', 'top 95%'), y: 25, opacity: 0, duration: 0.7 });

  // Navbar on scroll
  ScrollTrigger.create({
    start: 'top -60',
    onEnter:     () => qs('.nav')?.classList.add('scrolled'),
    onLeaveBack: () => qs('.nav')?.classList.remove('scrolled')
  });
}

/* ============================================
   PROJECT CARD 3D TILT
============================================ */
function initCardTilt() {
  qsa('.bcard').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r  = card.getBoundingClientRect();
      const x  = ((e.clientX - r.left) / r.width  - 0.5);
      const y  = ((e.clientY - r.top)  / r.height - 0.5);

      gsap.to(card, {
        rotateY: x * 12,
        rotateX: -y * 12,
        transformPerspective: 900,
        duration: 0.35,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY: 0, rotateX: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.45)'
      });
    });
  });
}

/* ============================================
   SMOOTH ANCHOR NAV
============================================ */
function initSmoothNav() {
  qsa('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const target = qs(href);
      if (!target) return;
      e.preventDefault();

      gsap.to(window, {
        scrollTo: { y: target, offsetY: 70 },
        duration: 1.3,
        ease: 'power3.inOut'
      });

      // Close mobile menu if open
      qs('#mobile-menu')?.classList.remove('open');
    });
  });
}

/* ============================================
   MOBILE MENU
============================================ */
function initMobileMenu() {
  const hamburger = qs('#hamburger');
  const menu      = qs('#mobile-menu');
  const closeBtn  = qs('#mobile-close');

  hamburger?.addEventListener('click', () => {
    menu.classList.add('open');
    gsap.fromTo('.mobile-link', {
      y: 40, opacity: 0
    }, {
      y: 0, opacity: 1, stagger: 0.08, duration: 0.5, delay: 0.2
    });
  });

  closeBtn?.addEventListener('click', () => menu.classList.remove('open'));
}

/* ============================================
   NAV ACTIVE STATE (Intersection Observer)
============================================ */
function initNavActive() {
  const sections = qsa('section[id]');
  const links    = qsa('.nav-link[data-section]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.toggle('active', l.dataset.section === id));
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}

/* ============================================
   BITMOJI FLOAT ANIM (CSS handles most, GSAP adds badges)
============================================ */
function initBitmojiBadges() {
  // Re-entrance animation on the rings after hero loads
  gsap.to('.br-1', { opacity: 0.6, duration: 1.5, delay: 1.5 });
  gsap.to('.br-2', { opacity: 0.4, duration: 1.5, delay: 1.8 });
  gsap.to('.br-3', { opacity: 0.3, duration: 1.5, delay: 2.1 });

  // Float badges in
  qsa('.float-badge').forEach((b, i) => {
    gsap.from(b, { scale: 0, opacity: 0, duration: 0.5, delay: 1.2 + i * 0.2, ease: 'back.out(1.7)' });
  });
}

/* ============================================
   PHOTO HOVER 3D TILT
============================================ */
function initPhotoTilt() {
  const wrap = qs('.photo-frame-wrap');
  if (!wrap) return;

  wrap.addEventListener('mousemove', (e) => {
    const r = wrap.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5);
    const y = ((e.clientY - r.top)  / r.height - 0.5);

    gsap.to(wrap, {
      rotateY: x * 10,
      rotateX: -y * 10,
      transformPerspective: 800,
      duration: 0.35,
      ease: 'power2.out'
    });
  });

  wrap.addEventListener('mouseleave', () => {
    gsap.to(wrap, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  });
}

/* ============================================
   MARQUEE — HOVER PAUSE
============================================ */
function initMarquee() {
  const track = qs('.marquee-track');
  if (!track) return;

  const wrap = qs('.marquee-wrap');
  wrap?.addEventListener('mouseenter', () => {
    gsap.to(track, { animationPlayState: 'paused' });
    track.style.animationPlayState = 'paused';
  });
  wrap?.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
}

/* ============================================
   MAIN INIT
============================================ */
function main() {
  initNoise();
  initCircuitBackground();
  initCursor();
  initMobileMenu();
  initSmoothNav();

  // Direct reveal — no loader, straight into hero animation
  initHeroEntrance();
  initTyped();
  initParallax();
  initMagnetic();
  initBitmojiBadges();
  initPhotoTilt();
  initScrollAnimations();
  initCardTilt();
  initNavActive();
  initMarquee();

  setTimeout(() => ScrollTrigger.refresh(), 300);
}

window.addEventListener('DOMContentLoaded', main);
