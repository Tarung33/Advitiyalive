// Enhanced JavaScript for Futuristic Advitiya Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeLoading();
    initializeCursor();
    initializeNavigation();
    initializeTypingEffect();
    initializeAnimations();
    initializeParticles();
    initializeCounters();
    initializeScrollEffects();
    initializeTilt();
    initializeForm();
    initializeInteractions();
});

// Loading Screen
function initializeLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.cursor = 'none'; // Enable custom cursor
            }, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 150);
}

// Custom Cursor
function initializeCursor() {
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');
    
    if (!cursorDot || !cursorOutline) return;
    
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = posX + 'px';
        cursorDot.style.top = posY + 'px';
        
        cursorOutline.style.left = posX + 'px';
        cursorOutline.style.top = posY + 'px';
    });
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .card, .team-card, .event-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(2)';
            cursorOutline.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}

// Navigation
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Smooth scrolling and active states
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Typing Effect
function initializeTypingEffect() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;
    
    const phrases = [
        "Innovation Starts Here",
        "Code the Future",
        "Data Science Excellence",
        "Build Tomorrow Today",
        "Tech Meets Creativity",
        "Where Ideas Come Alive"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before next phrase
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    typeText();
}

// Floating Particles
function initializeParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 15000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Create initial particles
    for (let i = 0; i < 10; i++) {
        setTimeout(createParticle, i * 200);
    }
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 20);
    }
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Scroll Animations
function initializeScrollEffects() {
    const animatedElements = document.querySelectorAll('.feature-card, .event-card, .team-card, .contact-item');
    
    // Add animation classes
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = (index * 0.1) + 's';
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    elementsToAnimate.forEach(el => {
        scrollObserver.observe(el);
    });
}

// Tilt Effect
function initializeTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Form Handling
function initializeForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Form field animations
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// Interactive Animations
function initializeInteractions() {
    // Button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.feature-card, .event-card, .team-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Hologram cube interaction
    const hologramCube = document.getElementById('hologramCube');
    if (hologramCube) {
        let isHovered = false;
        
        hologramCube.addEventListener('mouseenter', () => {
            isHovered = true;
            hologramCube.style.animationPlayState = 'paused';
        });
        
        hologramCube.addEventListener('mouseleave', () => {
            isHovered = false;
            hologramCube.style.animationPlayState = 'running';
        });
        
        hologramCube.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            
            const rect = hologramCube.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            const rotateY = x * 30;
            const rotateX = -y * 30;
            
            hologramCube.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        background: type === 'success' ? 'var(--accent-color)' : 'var(--primary-color)',
        color: 'var(--bg-dark)',
        borderRadius: 'var(--border-radius)',
        boxShadow: 'var(--shadow-neon)',
        zIndex: '10001',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '0.9rem',
        fontWeight: '500',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimize scroll events
window.addEventListener('scroll', throttle(() => {
    // Handle scroll-dependent animations here
}, 16)); // ~60fps

// Neural Network Animation
function initializeNeuralNetwork() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const neuralNetwork = document.getElementById('neuralNetwork');
    
    if (!neuralNetwork) return;
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    
    neuralNetwork.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const nodes = [];
    const connections = [];
    
    // Create nodes
    for (let i = 0; i < 50; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 3 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nodes
        nodes.forEach((node, i) => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 245, 255, 0.3)';
            ctx.fill();
            
            // Draw connections
            nodes.forEach((otherNode, j) => {
                if (i !== j) {
                    const distance = Math.sqrt(
                        Math.pow(node.x - otherNode.x, 2) + 
                        Math.pow(node.y - otherNode.y, 2)
                    );
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.strokeStyle = `rgba(0, 245, 255, ${0.1 * (1 - distance / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize neural network after DOM is loaded
setTimeout(initializeNeuralNetwork, 1000);

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: rippleEffect 0.6s linear;
    pointer-events: none;
}

@keyframes rippleEffect {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Add ripple CSS to head
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Advanced Scroll Animations
class ScrollAnimationManager {
    constructor() {
        this.elements = new Map();
        this.observer = null;
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            {
                threshold: [0, 0.25, 0.5, 0.75, 1],
                rootMargin: '0px 0px -10% 0px'
            }
        );
        
        this.setupElements();
        this.bindEvents();
    }
    
    setupElements() {
        const animationElements = document.querySelectorAll('[data-animation]');
        
        animationElements.forEach(el => {
            const animationType = el.dataset.animation;
            const delay = parseInt(el.dataset.delay) || 0;
            const duration = parseInt(el.dataset.duration) || 800;
            
            this.elements.set(el, {
                type: animationType,
                delay,
                duration,
                triggered: false
            });
            
            this.observer.observe(el);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
                const elementData = this.elements.get(entry.target);
                
                if (elementData && !elementData.triggered) {
                    this.triggerAnimation(entry.target, elementData);
                    elementData.triggered = true;
                }
            }
        });
    }
    
    triggerAnimation(element, data) {
        setTimeout(() => {
            element.classList.add('animate-' + data.type);
            element.style.animationDuration = data.duration + 'ms';
        }, data.delay);
    }
    
    bindEvents() {
        // Add parallax scrolling for certain elements
        window.addEventListener('scroll', throttle(() => {
            this.handleParallax();
        }, 16));
    }
    
    handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
}

// 3D Card Effects
class Card3D {
    constructor(element) {
        this.element = element;
        this.container = element.querySelector('.card-container') || element;
        this.init();
    }
    
    init() {
        this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    }
    
    handleMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 15;
        const rotateY = ((centerX - x) / centerX) * 15;
        
        this.container.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale3d(1.05, 1.05, 1.05)
        `;
    }
    
    handleMouseLeave() {
        this.container.style.transform = `
            perspective(1000px) 
            rotateX(0deg) 
            rotateY(0deg) 
            scale3d(1, 1, 1)
        `;
    }
    
    handleMouseEnter() {
        this.container.style.transition = 'none';
    }
}

// Initialize 3D cards
document.querySelectorAll('.feature-card, .event-card, .team-card').forEach(card => {
    new Card3D(card);
});

// Advanced Typing Effect with Multiple Lines
class AdvancedTypingEffect {
    constructor(element, options = {}) {
        this.element = element;
        this.lines = options.lines || ['Welcome to the future'];
        this.typeSpeed = options.typeSpeed || 100;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.pauseTime = options.pauseTime || 2000;
        this.currentLineIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        this.type();
    }
    
    type() {
        const currentLine = this.lines[this.currentLineIndex];
        
        if (this.isPaused) {
            setTimeout(() => {
                this.isPaused = false;
                this.isDeleting = true;
                this.type();
            }, this.pauseTime);
            return;
        }
        
        if (this.isDeleting) {
            this.element.textContent = currentLine.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentLineIndex = (this.currentLineIndex + 1) % this.lines.length;
            }
        } else {
            this.element.textContent = currentLine.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentLine.length) {
                this.isPaused = true;
            }
        }
        
        const speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        setTimeout(() => this.type(), speed);
    }
}

// Sound Effects (Optional)
class SoundManager {
    constructor() {
        this.sounds = new Map();
        this.enabled = false;
        this.init();
    }
    
    init() {
        // Create audio context for web audio (more modern approach)
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
            return;
        }
        
        this.createSounds();
    }
    
    createSounds() {
        // Create simple beep sounds programmatically
        this.sounds.set('click', this.createBeep(800, 0.1));
        this.sounds.set('hover', this.createBeep(1000, 0.05));
        this.sounds.set('success', this.createBeep(1200, 0.2));
    }
    
    createBeep(frequency, duration) {
        return () => {
            if (!this.enabled || !this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };
    }
    
    play(soundName) {
        const sound = this.sounds.get(soundName);
        if (sound) sound();
    }
    
    enable() {
        this.enabled = true;
        // Resume audio context if suspended
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
    
    disable() {
        this.enabled = false;
    }
}

// Initialize sound manager
const soundManager = new SoundManager();

// Add sound toggle button
function createSoundToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    toggle.className = 'sound-toggle';
    toggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: var(--gradient-primary);
        color: var(--bg-dark);
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        transition: var(--transition);
    `;
    
    let soundEnabled = false;
    
    toggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        
        if (soundEnabled) {
            soundManager.enable();
            toggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            toggle.style.background = 'var(--gradient-primary)';
        } else {
            soundManager.disable();
            toggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            toggle.style.background = 'var(--text-secondary)';
        }
    });
    
    document.body.appendChild(toggle);
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.isMonitoring = false;
        this.metrics = {
            fps: 0,
            frameTime: 0,
            memory: 0
        };
        
        if (window.performance && window.performance.memory) {
            this.init();
        }
    }
    
    init() {
        this.lastTime = performance.now();
        this.frameCount = 0;
        this.monitor();
    }
    
    monitor() {
        if (!this.isMonitoring) return;
        
        const now = performance.now();
        const delta = now - this.lastTime;
        this.frameCount++;
        
        if (this.frameCount >= 60) {
            this.metrics.fps = Math.round(1000 / (delta / this.frameCount));
            this.metrics.frameTime = Math.round(delta / this.frameCount * 100) / 100;
            
            if (window.performance.memory) {
                this.metrics.memory = Math.round(
                    window.performance.memory.usedJSHeapSize / 1048576
                );
            }
            
            this.frameCount = 0;
            this.lastTime = now;
            
            // Optimize based on performance
            this.optimizePerformance();
        }
        
        requestAnimationFrame(() => this.monitor());
    }
    
    optimizePerformance() {
        // Reduce animations if performance is poor
        if (this.metrics.fps < 30) {
            document.body.classList.add('low-performance');
        } else {
            document.body.classList.remove('low-performance');
        }
    }
    
    start() {
        this.isMonitoring = true;
        this.monitor();
    }
    
    stop() {
        this.isMonitoring = false;
    }
}

// Initialize performance monitor
const performanceMonitor = new PerformanceMonitor();
performanceMonitor.start();

// Keyboard Navigation
function initializeKeyboardNavigation() {
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    let currentFocus = 0;
    
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'Tab':
                // Custom tab handling if needed
                break;
            case 'Enter':
            case ' ':
                if (e.target.classList.contains('btn')) {
                    e.target.click();
                }
                break;
            case 'Escape':
                // Close any open modals or menus
                const activeMenu = document.querySelector('.nav-menu.active');
                if (activeMenu) {
                    activeMenu.classList.remove('active');
                    document.getElementById('hamburger').classList.remove('active');
                }
                break;
        }
    });
}

// Initialize all advanced features
function initializeAdvancedFeatures() {
    const scrollAnimManager = new ScrollAnimationManager();
    initializeKeyboardNavigation();
    createSoundToggle();
    
    // Add event listeners for sounds
    document.querySelectorAll('button, .btn').forEach(btn => {
        btn.addEventListener('click', () => soundManager.play('click'));
        btn.addEventListener('mouseenter', () => soundManager.play('hover'));
    });
}

// Call advanced initialization
setTimeout(initializeAdvancedFeatures, 2000);

// Easter Egg: Konami Code
function initializeKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    let userInput = [];
    
    document.addEventListener('keydown', (e) => {
        userInput.push(e.code);
        
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        
        if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
            activateEasterEgg();
            userInput = [];
        }
    });
}

function activateEasterEgg() {
    // Add rainbow animation to the logo
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.style.animation = 'rainbow 2s linear infinite';
    }
    
    // Show special message
    showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
    
    // Add rainbow CSS
    const rainbowCSS = `
    @keyframes rainbow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    `;
    
    const style = document.createElement('style');
    style.textContent = rainbowCSS;
    document.head.appendChild(style);
    
    logo.style.background = 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)';
    logo.style.backgroundSize = '400% 400%';
    logo.style.webkitBackgroundClip = 'text';
    logo.style.webkitTextFillColor = 'transparent';
}

// Initialize Konami Code
initializeKonamiCode();

// Cleanup function for performance
function cleanup() {
    // Remove event listeners when page is unloaded
    window.addEventListener('beforeunload', () => {
        performanceMonitor.stop();
        // Clean up any other resources
    });
}

cleanup();

// Export functions for potential external use
window.AdvitiyaWebsite = {
    showNotification,
    soundManager,
    performanceMonitor
};