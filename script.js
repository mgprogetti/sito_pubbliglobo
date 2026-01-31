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
// SERVICES DATA
// ===================================

const servicesData = [
    {
        id: 'imbiancature',
        title: 'Imbiancature Professionali',
        description: 'Servizi di tinteggiatura professionale per dare nuova vita ai tuoi ambienti con finiture impeccabili.',
        image: 'images/header-imbiancature.jpg'
    },
    {
        id: 'ristrutturazioni',
        title: 'Ristrutturazioni Chiavi in Mano',
        description: 'Ristrutturazioni complete dalla progettazione alla consegna, senza pensieri per te.',
        image: 'images/header-ristrutturazioni.jpg'
    },
    {
        id: 'bagni',
        title: 'Rifacimento Bagni',
        description: 'Ristrutturazione completa del bagno con design moderno e materiali di alta qualità.',
        image: 'images/header-bagni.jpg'
    },
    {
        id: 'pavimenti',
        title: 'Pavimenti in Parquet e Gres',
        description: 'Installazione di pavimenti in parquet e gres porcellanato di alta qualità.',
        image: 'images/header-pavimenti.jpg'
    },
    {
        id: 'porte',
        title: 'Porte Interne e Blindate',
        description: 'Installazione di porte interne di design e porte blindate per la tua sicurezza.',
        image: 'images/header-porte.jpg'
    },
    {
        id: 'infissi',
        title: 'Finestre e Infissi',
        description: 'Installazione di infissi moderni ed efficienti per migliorare comfort e risparmio energetico.',
        image: 'images/header-infissi.jpg'
    },
    {
        id: 'inferriate',
        title: 'Inferriate di Sicurezza',
        description: 'Installazione di inferriate di sicurezza per proteggere la tua abitazione.',
        image: 'images/header-inferriate.jpg'
    },
    {
        id: 'traslochi',
        title: 'Servizio Traslochi',
        description: 'Servizio traslochi professionale per spostare i tuoi mobili in sicurezza.',
        image: 'images/header-traslochi.jpg'
    },
    {
        id: 'zanzariere',
        title: 'Zanzariere',
        description: 'Installazione di zanzariere su misura per finestre e porte.',
        image: 'images/header-zanzariere.jpg'
    }
];

// ===================================
// SERVICE CAROUSEL
// ===================================

class ServiceCarousel {
    constructor(container, currentServiceId) {
        this.container = container;
        this.currentServiceId = currentServiceId;
        this.items = servicesData.filter(service => service.id !== currentServiceId);
        this.currentIndex = 0;
        this.itemsPerView = 4;

        this.init();
    }

    init() {
        this.render();
        this.setupCarousel();
        this.setupResizeListener();
    }

    render() {
        // Clear existing content (pills)
        const pillsContainer = this.container.querySelector('.service-pills');
        if (pillsContainer) {
            pillsContainer.remove();
        }

        // Create carousel structure
        const carouselWrapper = document.createElement('div');
        carouselWrapper.className = 'service-carousel-wrapper';

        carouselWrapper.innerHTML = `
            <button class="service-carousel-btn prev" aria-label="Precedente" style="display: none;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <div class="service-carousel">
                <div class="service-carousel-track">
                    ${this.items.map(service => `
                        <div class="service-carousel-item">
                            <a href="#${service.id}" class="service-box">
                                <div class="service-box-image">
                                    <img src="${service.image}" alt="${service.title}" loading="lazy">
                                </div>
                                <div class="service-box-content">
                                    <h4>${service.title}</h4>
                                    <p>${service.description}</p>
                                    <span class="service-btn-text">Scopri di più</span>
                                </div>
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
            <button class="service-carousel-btn next" aria-label="Successivo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        `;

        this.container.appendChild(carouselWrapper);

        this.track = carouselWrapper.querySelector('.service-carousel-track');
        this.prevBtn = carouselWrapper.querySelector('.service-carousel-btn.prev');
        this.nextBtn = carouselWrapper.querySelector('.service-carousel-btn.next');
    }

    setupCarousel() {
        this.updateItemsPerView();
        this.updateButtons();

        this.prevBtn.addEventListener('click', () => {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.updateTrack();
            }
        });

        this.nextBtn.addEventListener('click', () => {
            if (this.currentIndex < this.items.length - this.itemsPerView) {
                this.currentIndex++;
                this.updateTrack();
            }
        });
    }

    updateItemsPerView() {
        const width = window.innerWidth;
        if (width >= 1024) {
            this.itemsPerView = 4;
        } else if (width >= 640) {
            this.itemsPerView = 2;
        } else {
            this.itemsPerView = 1;
        }

        // Ensure index is valid after resize
        if (this.currentIndex > this.items.length - this.itemsPerView) {
            this.currentIndex = Math.max(0, this.items.length - this.itemsPerView);
            this.updateTrack();
        }

        this.updateButtons();
    }

    updateTrack() {
        const itemWidth = 100 / this.itemsPerView;
        // We need to account for gap in calculation if we want precise scroll, 
        // but with flex gap property, percentage width might need adjustment or we use calc() in CSS.
        // In CSS: width: calc(25% - gap * 3/4)

        // Simpler approach: translate by percentage of container width
        // The track width is implicitly defined by content.
        // Let's translate by (100% / itemsPerView) * currentIndex + gap adjustment?

        // Actually, since we set flex-basis in CSS, we can just translate by (itemWidth + gap) * index.
        // But getting the exact pixel value including gap is safer.

        const item = this.track.querySelector('.service-carousel-item');
        if (!item) return;

        const itemStyle = window.getComputedStyle(item);
        const itemWidthPx = item.offsetWidth;
        const gap = parseFloat(window.getComputedStyle(this.track).gap) || 0;

        const moveAmount = (itemWidthPx + gap) * this.currentIndex;
        this.track.style.transform = `translateX(-${moveAmount}px)`;

        this.updateButtons();
    }

    updateButtons() {
        this.prevBtn.style.display = 'flex'; // Enable flex
        this.nextBtn.style.display = 'flex'; // Enable flex
        this.prevBtn.disabled = this.currentIndex === 0;

        // Special case: if total items <= visible items, hide controls or disable
        if (this.items.length <= this.itemsPerView) {
            this.nextBtn.disabled = true;
            this.prevBtn.disabled = true;
            // Optional: hide them
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = 'none';
        } else {
            this.nextBtn.disabled = this.currentIndex >= this.items.length - this.itemsPerView;
        }
    }

    setupResizeListener() {
        window.addEventListener('resize', this.debounce(() => {
            this.updateItemsPerView();
        }, 200));
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

    // Initialize Service Carousels
    document.querySelectorAll('.subpage .service-nav-container').forEach(container => {
        // Find parent section id
        const section = container.closest('section');
        if (section && section.id) {
            new ServiceCarousel(container, section.id);
        }
    });
});
