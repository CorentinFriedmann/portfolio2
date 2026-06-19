/* =========================================================
   CORENTIN FRIEDMANN — PORTFOLIO DEVCLOUD
   Interactive JavaScript — GSAP + Native Scroll
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// 1. CUSTOM CURSOR
// ─────────────────────────────────────────────
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const interactiveEls = document.querySelectorAll(
    '.magnetic-btn, .glass-card, .skill-chip, .contact-link, .trace-badge, .comp-nav-btn, .btn-premium, .btn-glass'
);

let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(cursor, { x: mouseX - 4, y: mouseY - 4, duration: 0.05, ease: "power2.out" });
});

gsap.ticker.add(() => {
    posX += (mouseX - posX) / 7;
    posY += (mouseY - posY) / 7;
    gsap.set(follower, { x: posX - 22, y: posY - 22 });
});

interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 0, duration: 0.25, ease: "power2.out" });
        gsap.to(follower, {
            scale: 1.6,
            borderColor: 'rgba(99, 102, 241, 0.5)',
            backgroundColor: 'rgba(99, 102, 241, 0.06)',
            duration: 0.35,
            ease: "power2.out"
        });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, duration: 0.25, ease: "power2.out" });
        gsap.to(follower, {
            scale: 1,
            borderColor: 'rgba(255,255,255,0.15)',
            backgroundColor: 'transparent',
            duration: 0.35,
            ease: "power2.out"
        });
    });
});

// ─────────────────────────────────────────────
// 2. NAVBAR — Scroll & Active Section
// ─────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('data-section') === id);
            });
        }
    });
}, { rootMargin: '-30% 0px -70% 0px', threshold: 0 });

sections.forEach(s => sectionObserver.observe(s));

// ─────────────────────────────────────────────
// 3. MOBILE MENU
// ─────────────────────────────────────────────
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenuOverlay.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ─────────────────────────────────────────────
// 4. HERO ANIMATIONS
// ─────────────────────────────────────────────
const tlHero = gsap.timeline({ defaults: { ease: "power4.out" } });

tlHero
    .fromTo('.hero-tag', { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, delay: 0.2 })
    .fromTo('.hero-title .line', { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.12 }, '-=0.5')
    .fromTo('.hero-subtitle', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.6')
    .fromTo('.hero-desc', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
    .fromTo('.hero-actions', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.4')
    .fromTo('.hero-stack', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.3')
    .fromTo('.hero-scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 1.2 }, '-=0.2');

// ─────────────────────────────────────────────
// 5. SCROLL ANIMATIONS
// ─────────────────────────────────────────────

// Section headings
gsap.utils.toArray('.section-heading').forEach(heading => {
    gsap.from(heading.querySelectorAll('.reveal-text, .section-tag'), {
        scrollTrigger: { trigger: heading, start: "top 85%" },
        y: 40, opacity: 0,
        duration: 0.9, stagger: 0.1, ease: "power3.out"
    });
});

// Reveal-up elements
gsap.utils.toArray('.reveal-up').forEach(el => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%" },
        y: 50, opacity: 0,
        duration: 0.9, ease: "power3.out"
    });
});

// Comp headers
gsap.utils.toArray('.comp-header').forEach(header => {
    gsap.from(header, {
        scrollTrigger: { trigger: header, start: "top 85%" },
        x: -30, opacity: 0,
        duration: 0.8, ease: "power3.out"
    });
});

// CV boxes stagger (legacy removal handled, just append progress bars)

// Progress Bars animation
gsap.utils.toArray('.progress-bar-fill').forEach(bar => {
    gsap.from(bar, {
        scrollTrigger: { trigger: '.progress-container', start: "top 85%" },
        width: "0%", 
        duration: 1.5, 
        ease: "power3.out"
    });
});

// Comp nav
gsap.from('.comp-nav', {
    scrollTrigger: { trigger: '.comp-nav', start: "top 88%" },
    y: 30, opacity: 0, duration: 0.8, ease: "power3.out"
});

// ─────────────────────────────────────────────
// 6. COMPETENCE TAB NAVIGATION
// ─────────────────────────────────────────────
const compNavBtns = document.querySelectorAll('.comp-nav-btn');
const compBlocks = document.querySelectorAll('.competence-block');

compNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.target;

        // Update active button
        compNavBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Switch content with animation
        compBlocks.forEach(block => {
            if (block.id === target) {
                block.classList.add('active');
                // Animate in
                gsap.fromTo(block, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
            } else {
                block.classList.remove('active');
            }
        });
    });
});

// ─────────────────────────────────────────────
// 7. SCROLL PROGRESS BAR
// ─────────────────────────────────────────────
const progressBar = document.querySelector('.scroll-progress');
window.addEventListener("scroll", () => {
    const scrollPos = document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight > 0) {
        progressBar.style.width = ((scrollPos / docHeight) * 100) + "%";
    }
});

// ─────────────────────────────────────────────
// 8. PARTICLES CANVAS
// ─────────────────────────────────────────────
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.3;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.fadeSpeed = Math.random() * 0.003 + 0.001;
            this.fadingIn = true;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.fadingIn) {
                this.opacity += this.fadeSpeed;
                if (this.opacity >= 0.5) this.fadingIn = false;
            } else {
                this.opacity -= this.fadeSpeed;
                if (this.opacity <= 0.05) this.reset();
            }

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(129, 140, 248, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.04 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        animFrame = requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// ─────────────────────────────────────────────
// 9. PARALLAX ORBS
// ─────────────────────────────────────────────
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    gsap.to('.orb-1', { x: x * 40, y: y * 25, duration: 2, ease: "power2.out" });
    gsap.to('.orb-2', { x: x * -25, y: y * -35, duration: 2, ease: "power2.out" });
    gsap.to('.orb-3', { x: x * 20, y: y * 20, duration: 2, ease: "power2.out" });
});

// ─────────────────────────────────────────────
// 10. SMOOTH ANCHOR SCROLLING (native)
// ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const yOffset = -80;
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    });
});

// ─────────────────────────────────────────────
// 11. FOOTER YEAR
// ─────────────────────────────────────────────
document.getElementById("current-year").textContent = new Date().getFullYear();