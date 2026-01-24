// ===================================
// SPA ROUTING
// ===================================

class Router {
    constructor() {
        this.routes = ['home', 'imbiancature', 'ristrutturazioni', 'bagni', 'pavimenti', 'porte', 'infissi', 'inferriate', 'traslochi', 'zanzariere', 'chisiamo', 'contatti'];
        this.init();
    }

    init() {
        // Handle initial load
        window.addEventListener('DOMContentLoaded', () => {
            this.handleRoute();
        });

        // Handle hash changes
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });

        // Handle navigation clicks
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const hash = link.getAttribute('href').substring(1);
                if (this.routes.includes(hash)) {
                    this.closeMobileMenu();
                }
            });
        });
    }

    handleRoute() {
        let hash = window.location.hash.substring(1) || 'home';

        // Validate route
        if (!this.routes.includes(hash)) {
            hash = 'home';
            window.location.hash = 'home';
        }

        // Update active page
        this.showPage(hash);

        // Update meta tags
        this.updateMetaTags(hash);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update active nav link
        this.updateActiveNavLink(hash);
    }

    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
    }

    updateMetaTags(pageId) {
        const pageTitles = {
            home: 'Pubbliglobo - Ristrutturazioni Civili',
            imbiancature: 'Imbiancature Professionali - Pubbliglobo',
            ristrutturazioni: 'Ristrutturazioni Chiavi in Mano - Pubbliglobo',
            bagni: 'Rifacimento Bagni - Pubbliglobo',
            pavimenti: 'Pavimenti in Parquet e Gres - Pubbliglobo',
            porte: 'Porte Interne e Porte Blindate - Pubbliglobo',
            infissi: 'Finestre e Infissi - Pubbliglobo',
            inferriate: 'Inferriate di Sicurezza - Pubbliglobo',
            traslochi: 'Servizio Traslochi - Pubbliglobo',
            zanzariere: 'Zanzariere - Pubbliglobo',
            chisiamo: 'Chi Siamo - Pubbliglobo',
            contatti: 'Contatti - Pubbliglobo'
        };

        const pageDescriptions = {
            home: 'Esperti in ristrutturazioni civili con oltre 20 anni di esperienza.',
            imbiancature: 'Servizi professionali di tinteggiatura e imbiancatura.',
            ristrutturazioni: 'Ristrutturazioni complete chiavi in mano.',
            bagni: 'Ristrutturazione completa del bagno con design moderno.',
            pavimenti: 'Installazione pavimenti in parquet e gres porcellanato.',
            porte: 'Installazione porte interne e porte blindate di sicurezza.',
            infissi: 'Installazione di infissi e finestre moderne.',
            inferriate: 'Installazione inferriate di sicurezza su misura.',
            traslochi: 'Servizio traslochi professionale per privati e aziende.',
            zanzariere: 'Installazione zanzariere su misura per finestre e porte.',
            chisiamo: 'Scopri la nostra storia e il nostro team di professionisti.',
            contatti: 'Contattaci per un preventivo gratuito e senza impegno.'
        };

        document.title = pageTitles[pageId] || pageTitles.home;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', pageDescriptions[pageId] || pageDescriptions.home);
        }
    }

    updateActiveNavLink(pageId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${pageId}`) {
                link.classList.add('active');
            }
        });
    }

    closeMobileMenu() {
        const navMenu = document.getElementById('navMenu');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }
}

// ===================================
// MOBILE MENU
// ===================================

class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('mobileMenuToggle');
        this.menu = document.getElementById('navMenu');
        this.init();
    }

    init() {
        if (this.toggle && this.menu) {
            this.toggle.addEventListener('click', () => {
                this.toggleMenu();
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav-wrapper') && this.menu.classList.contains('active')) {
                    this.closeMenu();
                }
            });
        }
    }

    toggleMenu() {
        this.menu.classList.toggle('active');
        this.toggle.classList.toggle('active');
    }

    closeMenu() {
        this.menu.classList.remove('active');
        this.toggle.classList.remove('active');
    }
}

// ===================================
// DROPDOWN MENU
// ===================================

class DropdownMenu {
    constructor() {
        this.dropdown = document.querySelector('.dropdown');
        this.dropdownToggle = document.getElementById('serviziDropdown');
        this.dropdownMenu = document.getElementById('serviziDropdownMenu');
        this.init();
    }

    init() {
        if (this.dropdownToggle && this.dropdown) {
            // Toggle dropdown on click (for mobile and desktop)
            this.dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleDropdown();
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.dropdown') && this.dropdown.classList.contains('active')) {
                    this.closeDropdown();
                }
            });

            // Handle dropdown link clicks
            if (this.dropdownMenu) {
                this.dropdownMenu.querySelectorAll('.dropdown-link').forEach(link => {
                    link.addEventListener('click', () => {
                        this.closeDropdown();
                    });
                });
            }
        }
    }

    toggleDropdown() {
        this.dropdown.classList.toggle('active');
        const isExpanded = this.dropdown.classList.contains('active');
        this.dropdownToggle.setAttribute('aria-expanded', isExpanded);
    }

    closeDropdown() {
        this.dropdown.classList.remove('active');
        this.dropdownToggle.setAttribute('aria-expanded', 'false');
    }
}


// ===================================
// GALLERY
// ===================================

class Gallery {
    constructor(element) {
        this.gallery = element;
        this.slides = element.querySelectorAll('.gallery-slide');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 3000; // 3 seconds
        this.init();
    }

    init() {
        // Create navigation dots
        this.createDots();

        // Setup controls
        this.setupControls();

        // Start autoplay
        this.startAutoPlay();

        // Pause on hover
        this.gallery.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.gallery.addEventListener('mouseleave', () => this.startAutoPlay());

        // Touch support for mobile
        this.setupTouchSupport();
    }

    createDots() {
        const dotsContainer = this.gallery.querySelector('.gallery-dots');
        if (!dotsContainer) return;

        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('gallery-dot');
            dot.setAttribute('aria-label', `Vai all'immagine ${index + 1}`);

            if (index === 0) {
                dot.classList.add('active');
            }

            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.pauseAutoPlay();
                this.startAutoPlay();
            });

            dotsContainer.appendChild(dot);
        });

        this.dots = dotsContainer.querySelectorAll('.gallery-dot');
    }

    setupControls() {
        const prevBtn = this.gallery.querySelector('.gallery-control.prev');
        const nextBtn = this.gallery.querySelector('.gallery-control.next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.pauseAutoPlay();
                this.startAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.pauseAutoPlay();
                this.startAutoPlay();
            });
        }
    }

    setupTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;

        this.gallery.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.gallery.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }

    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                this.nextSlide();
            } else {
                // Swipe right - previous slide
                this.prevSlide();
            }
            this.pauseAutoPlay();
            this.startAutoPlay();
        }
    }

    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentIndex].classList.remove('active');
        if (this.dots) {
            this.dots[this.currentIndex].classList.remove('active');
        }

        // Update index
        this.currentIndex = index;

        // Add active class to new slide and dot
        this.slides[this.currentIndex].classList.add('active');
        if (this.dots) {
            this.dots[this.currentIndex].classList.add('active');
        }
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.pauseAutoPlay(); // Clear any existing interval
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// ===================================
// CONTACT FORM
// ===================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }

    handleSubmit() {
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // In a real application, you would send this data to a server
        console.log('Form submitted:', data);

        // Show success message
        alert('Grazie per averci contattato! Ti risponderemo al più presto.');

        // Reset form
        this.form.reset();
    }
}

// ===================================
// LAZY LOADING IMAGES
// ===================================

class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.src; // Trigger load
                        imageObserver.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        }
    }
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

class NavbarScroll {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        if (this.navbar) {
            window.addEventListener('scroll', this.debounce(() => {
                const currentScroll = window.pageYOffset;

                // Add shadow when scrolled
                if (currentScroll > 10) {
                    this.navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                } else {
                    this.navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                }

                this.lastScroll = currentScroll;
            }, 100));
        }
    }

    debounce(func, wait) {
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
}

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Router
    new Router();

    // Initialize Mobile Menu
    new MobileMenu();

    // Initialize Dropdown Menu
    new DropdownMenu();

    // Initialize all galleries
    document.querySelectorAll('.gallery').forEach(gallery => {
        new Gallery(gallery);
    });

    // Initialize Contact Form
    new ContactForm();

    // Initialize Lazy Loading
    new LazyLoader();

    // Initialize Navbar Scroll Effect
    new NavbarScroll();
});
