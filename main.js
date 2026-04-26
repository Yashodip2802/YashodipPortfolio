import './style.css'
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    class: 'is-reveal'
});

// Update ScrollTrigger when Locomotive Scroll updates
scroll.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener('refresh', () => scroll.update());
ScrollTrigger.refresh();

// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const interactables = document.querySelectorAll('a, .btn, .contact-card, .bento-item');

document.addEventListener('mousemove', (e) => {
    // Update main cursor position instantly
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Smooth follow for the outer circle
    gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out"
    });
});

interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        cursorFollower.classList.add('hovered');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        cursorFollower.classList.remove('hovered');
    });
});

// GSAP Animations
const tl = gsap.timeline();

// Hero Animation
tl.from('.navbar', {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
})
.from('.greeting', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
}, "-=0.5")
.from('.name', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.3")
.from('.role', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
}, "-=0.5")
.from('.tagline', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
}, "-=0.4")
.from('.btn', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
}, "-=0.4");

// ScrollTrigger Animations for Sections
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
        scrollTrigger: {
            trigger: header,
            scroller: '[data-scroll-container]',
            start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

gsap.utils.toArray('.bento-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            scroller: '[data-scroll-container]',
            start: 'top 90%',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: i * 0.1
    });
});

gsap.utils.toArray('.contact-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            scroller: '[data-scroll-container]',
            start: 'top 90%',
        },
        scale: 0.8,
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.5)',
        delay: i * 0.2
    });
});

// Prevent default links from reloading and use Locomotive scrollTo instead
document.querySelectorAll('a[data-scroll-to]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.getAttribute('href');
        scroll.scrollTo(target);
    });
});
