// animations.js — Safe Artistic Logic
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Reveal (Safe approach)
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        const text = heroTitle.textContent.trim();
        heroTitle.innerHTML = text.split(/\s+/).map(word => `<span class="word" style="display:inline-block; margin-inline-end: 0.3em;">${word}</span>`).join('');

        // Hide only when ready to animate
        gsap.set('.word', { y: 50, opacity: 0 });
        gsap.to('.word', { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, delay: 0.5, ease: 'expo.out' });
    }

    // Header entrance
    gsap.from('.site-header', { top: -100, opacity: 0, duration: 1.2, ease: 'power3.out' });

    // 2. Scroll-triggered reveal (Only for existing elements)
    refreshGSAP();

    // 3. Header Transformation
    ScrollTrigger.create({
        start: 'top -50',
        onEnter: () => document.querySelector('.site-header').classList.add('scrolled'),
        onLeaveBack: () => document.querySelector('.site-header').classList.remove('scrolled'),
    });
});

function initCreativeEffects() {
    // 3D Tilt Effect
    gsap.utils.toArray('.card:not(.tilt-ready)').forEach(card => {
        card.classList.add('tilt-ready');
        card.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;
            gsap.to(card, { rotateY: x * 8, rotateX: -y * 8, transformPerspective: 1000, duration: 0.4 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'power2.out' });
        });
    });

    // Smart Reveal (Safe: Hides then Shows)
    gsap.utils.toArray('.gsap-reveal:not(.already-revealed)').forEach(el => {
        // Set initial state via GSAP instead of CSS
        gsap.set(el, { opacity: 0, y: 30 });

        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                toggleActions: 'play none none none',
                onEnter: () => el.classList.add('already-revealed')
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        });
    });
}

function refreshGSAP() {
    ScrollTrigger.refresh();
    initCreativeEffects();
}

window.refreshGSAP = refreshGSAP;
