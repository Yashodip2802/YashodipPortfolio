import './style.css';
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ==========================================
   LOCOMOTIVE SCROLL SETUP
========================================== */
const locoScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  multiplier: 0.9,
  class: 'is-inview',
  smartphone: { smooth: false },
  tablet: { smooth: false },
});

locoScroll.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy('[data-scroll-container]', {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed',
});

ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
ScrollTrigger.refresh();

/* ==========================================
   CUSTOM CURSOR
========================================== */
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  gsap.set(cursor, { x: e.clientX, y: e.clientY });
  gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power2.out' });
});

document.querySelectorAll('a, button, .card-dark, .cert-card, .project-card, .contact-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursor, { scale: 2.5, backgroundColor: 'transparent', outline: '1.5px solid #00ff88', duration: 0.3 });
    gsap.to(follower, { scale: 1.5, opacity: 0.5, duration: 0.3 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursor, { scale: 1, backgroundColor: '#00ff88', outline: 'none', duration: 0.3 });
    gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
  });
});

/* ==========================================
   SMOOTH SCROLL LINKS
========================================== */
document.querySelectorAll('a[data-scroll-to]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');
    locoScroll.scrollTo(target);
    document.getElementById('mobile-menu')?.classList.remove('open');
  });
});

/* ==========================================
   HERO ENTRANCE ANIMATION
========================================== */
playHeroAnimation();

function playHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.navbar', { y: -80, opacity: 0, duration: 1 })
    .from('.hero-label', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
    .from('.hero-name span', {
      y: 100, opacity: 0, skewY: 8, duration: 1,
      stagger: 0.15, ease: 'power4.out'
    }, '-=0.5')
    .from('.hero-desc', { y: 30, opacity: 0, duration: 0.7 }, '-=0.6')
    .from('.hero-actions', { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
    .from('.hero-photo-wrap', {
      x: 80, opacity: 0, scale: 0.9, duration: 1.2,
      ease: 'power4.out'
    }, '-=1.2')
    .from('.hero-badge', { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)' }, '-=0.4')
    .from('.stats-bar .stat-item', {
      y: 40, opacity: 0, stagger: 0.12, duration: 0.7
    }, '-=0.4');

  // Animate stat numbers counting up
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = el.innerText;
    const num = parseInt(target);
    if (!isNaN(num)) {
      gsap.fromTo(el, { innerText: 0 }, {
        innerText: num,
        duration: 2,
        delay: 1.5,
        snap: { innerText: 1 },
        ease: 'power2.out',
        onUpdate: function() {
          el.innerText = Math.round(this.targets()[0].innerText) + target.replace(/[0-9]/g,'');
        }
      });
    }
  });
}

/* ==========================================
   SCROLL REVEAL — SECTION HEADERS
========================================== */
function makeReveal(selector, vars) {
  gsap.utils.toArray(selector).forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        scroller: '[data-scroll-container]',
        start: 'top 88%',
      },
      ...vars,
      delay: (vars.stagger ? 0 : i * 0.05),
    });
  });
}

makeReveal('.section-tag', { y: 20, opacity: 0, duration: 0.7 });
makeReveal('.section-heading', { y: 50, opacity: 0, duration: 0.9, ease: 'power3.out' });

/* ==========================================
   ABOUT SECTION
========================================== */
gsap.from('.about-text-card', {
  scrollTrigger: { trigger: '.about-text-card', scroller: '[data-scroll-container]', start: 'top 85%' },
  x: -80, opacity: 0, duration: 1, ease: 'power3.out',
});
gsap.from('.about-photo-card', {
  scrollTrigger: { trigger: '.about-photo-card', scroller: '[data-scroll-container]', start: 'top 85%' },
  x: 80, opacity: 0, duration: 1, ease: 'power3.out',
});
gsap.from('.skill-tags span', {
  scrollTrigger: { trigger: '.skill-tags', scroller: '[data-scroll-container]', start: 'top 90%' },
  scale: 0, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'back.out(2)',
});

/* ==========================================
   EDUCATION TIMELINE
========================================== */
gsap.from('.timeline-card', {
  scrollTrigger: { trigger: '.edu-timeline', scroller: '[data-scroll-container]', start: 'top 85%' },
  x: -60, opacity: 0, stagger: 0.2, duration: 0.9, ease: 'power3.out',
});

/* ==========================================
   EXPERIENCE
========================================== */
gsap.from('.exp-card', {
  scrollTrigger: { trigger: '.exp-card', scroller: '[data-scroll-container]', start: 'top 85%' },
  y: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
});

/* ==========================================
   ACHIEVEMENT CERT CARDS
========================================== */
gsap.from('.cert-card', {
  scrollTrigger: { trigger: '.cert-grid', scroller: '[data-scroll-container]', start: 'top 85%' },
  y: 80, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
});

/* ==========================================
   PROJECT CARDS — 3D TILT + REVEAL
========================================== */
gsap.from('.project-card', {
  scrollTrigger: { trigger: '.projects-grid', scroller: '[data-scroll-container]', start: 'top 85%' },
  y: 100, opacity: 0, stagger: 0.15, duration: 1, ease: 'power4.out',
});

// 3D Tilt on project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    gsap.to(card, { rotateX: y, rotateY: x, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
  });
});

/* ==========================================
   CONTACT ITEMS
========================================== */
gsap.from('.contact-item', {
  scrollTrigger: { trigger: '.contact-grid', scroller: '[data-scroll-container]', start: 'top 85%' },
  y: 60, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
});

/* ==========================================
   FOOTER
========================================== */
gsap.from('.footer', {
  scrollTrigger: { trigger: '.footer', scroller: '[data-scroll-container]', start: 'top 95%' },
  y: 30, opacity: 0, duration: 0.8,
});

/* ==========================================
   FLOATING PARTICLES BACKGROUND
========================================== */
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth, H = window.innerHeight;
  canvas.width = W; canvas.height = H;

  window.addEventListener('resize', () => {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W; canvas.height = H;
  });

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.1,
  }));

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 136, ${p.alpha})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

/* ==========================================
   MAGNETIC BUTTONS
========================================== */
document.querySelectorAll('.btn-green, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    gsap.to(btn, { x, y, duration: 0.4, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  });
});

/* ==========================================
   NAVBAR SCROLL EFFECT
========================================== */
locoScroll.on('scroll', ({ scroll }) => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  if (scroll.y > 80) {
    nav.style.boxShadow = '0 4px 40px rgba(0,0,0,0.5)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

/* ==========================================
   ACTIVE NAV LINK ON SCROLL
========================================== */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-link');

locoScroll.on('scroll', ({ currentElements }) => {
  const ids = Object.keys(currentElements);
  navLinks.forEach(link => link.classList.remove('active'));
  ids.forEach(id => {
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) link.classList.add('active');
  });
});
