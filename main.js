// main.js - ENHANCED WITH ALL NEW FEATURES
document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Set Active Navigation Link ---
    function setActiveNavLink() {
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('nav a, #mobile-menu a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            // Remove active classes first
            link.classList.remove('text-primary', 'font-semibold', 'border-b-2', 'border-primary');
            
            // Check if this link matches current page
            if ((currentPage.endsWith('/') && linkHref === '/') || 
                (currentPage.includes(linkHref) && linkHref !== '/')) {
                link.classList.add('text-primary', 'font-semibold', 'border-b-2', 'border-primary');
            } else {
                link.classList.add('hover:text-primary');
            }
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white/95', 'backdrop-blur-sm', 'shadow-lg');
            } else {
                navbar.classList.remove('bg-white/95', 'backdrop-blur-sm', 'shadow-lg');
            }
        });
    }

    // --- FIXED Language Switcher Logic ---
    const langEnButton = document.getElementById('lang-en');
    const langSeButton = document.getElementById('lang-se');

    // Function to update ALL translatable elements
    const translatePage = (lang) => {
        console.log('Translating to:', lang);
        
        if (typeof translations === 'undefined') {
            console.error('Translations object not found!');
            return;
        }

        if (!translations[lang]) {
            console.error(`Translations for language '${lang}' not found.`);
            return;
        }
        
        const dictionary = translations[lang];
        console.log('Dictionary loaded:', Object.keys(dictionary).length, 'keys');

        // Update all elements with data-key
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (dictionary[key]) {
                element.textContent = dictionary[key];
            }
        });

        // Update all placeholder elements
        document.querySelectorAll('[data-key-placeholder]').forEach(element => {
            const key = element.getAttribute('data-key-placeholder');
            if (dictionary[key]) {
                element.placeholder = dictionary[key];
            }
        });

        // Update page titles
        const pageTitles = {
            'en': {
                '': 'Zombo Elder Care - Home',
                'index.html': 'Zombo Elder Care - Home',
                'about.html': 'About Us | Zombo Elder Care',
                'programs.html': 'Our Programs | Zombo Elder Care',
                'impact.html': 'Our Impact | Zombo Elder Care',
                'stories.html': 'Impact Stories | Zombo Elder Care',
                'gallery.html': 'Gallery | Zombo Elder Care',
                'contact.html': 'Contact Us | Zombo Elder Care',
                'donate.html': 'Donate | Zombo Elder Care'
            },
            'se': {
                '': 'Zombo Elder Care - Hem',
                'index.html': 'Zombo Elder Care - Hem',
                'about.html': 'Om Oss | Zombo Elder Care',
                'programs.html': 'Våra Program | Zombo Elder Care',
                'impact.html': 'Vår Påverkan | Zombo Elder Care',
                'stories.html': 'Berättelser | Zombo Elder Care',
                'gallery.html': 'Galleri | Zombo Elder Care',
                'contact.html': 'Kontakta Oss | Zombo Elder Care',
                'donate.html': 'Donera | Zombo Elder Care'
            }
        };

        const currentPage = window.location.pathname.split('/').pop() || '';
        if (pageTitles[lang] && pageTitles[lang][currentPage]) {
            document.title = pageTitles[lang][currentPage];
        }

        // Update language button states
        updateLanguageButtons(lang);
        
        // Store preference
        localStorage.setItem('preferred-language', lang);
    };

    // Update language button styles
    const updateLanguageButtons = (lang) => {
        if (langEnButton && langSeButton) {
            // Reset both buttons
            langEnButton.classList.remove('font-semibold', 'text-warm-gray');
            langEnButton.classList.add('text-gray-500', 'hover:text-warm-gray');
            langSeButton.classList.remove('font-semibold', 'text-warm-gray');
            langSeButton.classList.add('text-gray-500', 'hover:text-warm-gray');
            
            // Set active button
            if (lang === 'en') {
                langEnButton.classList.add('font-semibold', 'text-warm-gray');
                langEnButton.classList.remove('text-gray-500', 'hover:text-warm-gray');
            } else {
                langSeButton.classList.add('font-semibold', 'text-warm-gray');
                langSeButton.classList.remove('text-gray-500', 'hover:text-warm-gray');
            }
        }
    };

    // Event listeners for language buttons
    if (langEnButton) {
        langEnButton.addEventListener('click', (e) => {
            e.preventDefault();
            translatePage('en');
        });
    }
    
    if (langSeButton) {
        langSeButton.addEventListener('click', (e) => {
            e.preventDefault();
            translatePage('se');
        });
    }

    // Initialize language on page load
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    translatePage(savedLanguage);

    // Set active nav link
    setActiveNavLink();

// --- ENHANCED Hero Section Background Slideshow ---
const heroBackgrounds = [
    document.getElementById('hero-background-1'),
    document.getElementById('hero-background-2'),
    document.getElementById('hero-background-3'),
    document.getElementById('hero-background-4'),
    document.getElementById('hero-background-5'),
    document.getElementById('hero-background-6')
].filter(bg => bg !== null);

if (heroBackgrounds.length > 0) {
    let currentHeroImageIndex = 0;
    const heroAnimationDuration = 4000; // Change image every 4 seconds

    function animateHeroBackgrounds() {
        // Set all images to opacity 0
        heroBackgrounds.forEach(bg => {
            bg.style.opacity = '0';
        });

        // Show current image
        currentHeroImageIndex = (currentHeroImageIndex + 1) % heroBackgrounds.length;
        const currentImage = heroBackgrounds[currentHeroImageIndex];

        if (currentImage) {
            currentImage.style.opacity = '1';
        }
    }

    // Initialize first image
    if (heroBackgrounds[0]) {
        heroBackgrounds[0].style.opacity = '1';
    }

    // Start hero slideshow
    setInterval(animateHeroBackgrounds, heroAnimationDuration);
}

    // --- Scroll Animations ---
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .zoom-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Initialize scroll animations
    initScrollAnimations();

// --- ENHANCED Stories Carousel with Mobile Centering ---
const storiesCarousel = document.querySelector('.stories-carousel');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');

if (storiesCarousel && carouselPrev && carouselNext) {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const scrollAmount = 344; // Width of card (320px) + gap (24px)
    let isScrolling = false;
    let autoSlideInterval;

    function scrollCarousel(direction) {
        if (isScrolling) return;
        
        isScrolling = true;
        const currentScroll = storiesCarousel.scrollLeft;
        const maxScroll = storiesCarousel.scrollWidth - storiesCarousel.clientWidth;
        
        let targetScroll;
        if (direction === 'next') {
            targetScroll = Math.min(currentScroll + scrollAmount, maxScroll);
        } else {
            targetScroll = Math.max(currentScroll - scrollAmount, 0);
        }
        
        storiesCarousel.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });

        // Reset auto-slide timer on manual navigation
        resetAutoSlide();

        // Enable scrolling again after animation
        setTimeout(() => {
            isScrolling = false;
            updateArrowVisibility();
        }, 300);
    }

    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            const currentScroll = storiesCarousel.scrollLeft;
            const maxScroll = storiesCarousel.scrollWidth - storiesCarousel.clientWidth;
            
            if (currentScroll >= maxScroll - 10) {
                // If at the end, scroll to start
                storiesCarousel.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                scrollCarousel('next');
            }
        }, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // Event listeners for navigation
    carouselPrev.addEventListener('click', () => scrollCarousel('prev'));
    carouselNext.addEventListener('click', () => scrollCarousel('next'));

    // Show/hide arrows based on scroll position
    function updateArrowVisibility() {
        const { scrollLeft, scrollWidth, clientWidth } = storiesCarousel;
        const tolerance = 10;
        
        carouselPrev.style.opacity = scrollLeft <= tolerance ? '0.5' : '1';
        carouselNext.style.opacity = scrollLeft >= scrollWidth - clientWidth - tolerance ? '0.5' : '1';
    }

    storiesCarousel.addEventListener('scroll', updateArrowVisibility);
    updateArrowVisibility();

    // Start auto-sliding
    startAutoSlide();

    // Pause auto-slide on hover
    storiesCarousel.addEventListener('mouseenter', stopAutoSlide);
    storiesCarousel.addEventListener('mouseleave', startAutoSlide);

    // Touch/swipe support for mobile
    let startX = 0;
    let startScrollLeft = 0;
    let isDragging = false;

    storiesCarousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startScrollLeft = storiesCarousel.scrollLeft;
        isDragging = true;
        stopAutoSlide();
    });

    storiesCarousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        storiesCarousel.scrollLeft = startScrollLeft + diff;
    });

    storiesCarousel.addEventListener('touchend', () => {
        isDragging = false;
        startAutoSlide();
    });
}

// --- Auto-Changing Testimonials ---
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
let currentTestimonial = 0;
let testimonialInterval;

function showTestimonial(index) {
    // Hide all slides
    testimonialSlides.forEach(slide => {
        slide.style.opacity = '0';
        slide.style.zIndex = '1';
    });
    
    // Remove active state from all dots
    testimonialDots.forEach(dot => {
        dot.style.opacity = '0.3';
        dot.style.transform = 'scale(1)';
    });
    
    // Show current slide
    testimonialSlides[index].style.opacity = '1';
    testimonialSlides[index].style.zIndex = '2';
    
    // Activate current dot
    testimonialDots[index].style.opacity = '1';
    testimonialDots[index].style.transform = 'scale(1.2)';
    
    currentTestimonial = index;
}

function nextTestimonial() {
    const nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
    showTestimonial(nextIndex);
}

function startTestimonialAutoSlide() {
    testimonialInterval = setInterval(nextTestimonial, 6000); // Change every 6 seconds
}

// Initialize testimonial slideshow
if (testimonialSlides.length > 0) {
    // Add click events to dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            showTestimonial(index);
            startTestimonialAutoSlide();
        });
    });
    
    // Start auto-sliding
    startTestimonialAutoSlide();
    
    // Pause on hover
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialContainer.addEventListener('mouseleave', startTestimonialAutoSlide);
    }
}

    // --- Story Modals Functionality ---
    const storyModal = document.getElementById('story-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.querySelector('.modal-close');

    // Story content data
    const storiesData = {
        1: {
            title: "Our New Community Health Day",
            image: "https://placehold.co/600x400?text=Community+Health+Day",
            content: "Our first-ever Community Health Day was a tremendous success, providing essential health checkups for over 50 elders in the Zombo district. The event featured free medical consultations, blood pressure monitoring, and distribution of essential medications. Many elders received treatment for chronic conditions that had gone untreated for years. The community response was overwhelming, with families expressing gratitude for this vital service that brought healthcare directly to their doorstep."
        },
        2: {
            title: "A Roof for George",
            image: "https://placehold.co/600x400?text=Elder+Receiving+Food",
            content: "George, 78, had lived with a leaking roof for over three years, making his home uninhabitable during the rainy season. Through our Shelter Support program, we mobilized volunteers and resources to completely replace his roof. 'I can finally sleep through the night without worrying about rain,' George shared with tears in his eyes. This transformation not only provided physical shelter but restored his dignity and sense of security in his golden years."
        },
        3: {
            title: "The Gift of Companionship",
            image: "https://placehold.co/600x400?text=Volunteer+and+Elder",
            content: "Grace, one of our dedicated volunteers, shares her experience visiting elders in the community. 'When I first met Mama Auma, she was isolated and lonely. Now, our weekly visits have become the highlight of both our weeks. We share stories, laugh together, and I help with small tasks around her home. The transformation in her spirit has been incredible - from withdrawn to joyful. This experience has taught me that sometimes, the greatest gift we can give is our time and attention.'"
        },
        4: {
            title: "Sarah's New Beginning",
            image: "https://placehold.co/600x400?text=Elder+Smiling",
            content: "Sarah's journey from isolation to community leadership is truly inspiring. After losing her husband, she withdrew from community life. Through our social engagement programs, Sarah gradually rediscovered her voice and talents. Today, she leads our weekly elder gatherings and has become a respected voice in community decisions. 'I went from feeling useless to knowing I still have so much to give,' Sarah says with a bright smile that lights up the room."
        }
    };

    // Read More button functionality
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', () => {
            const storyId = button.getAttribute('data-story');
            const story = storiesData[storyId];
            
            if (story) {
                modalTitle.textContent = story.title;
                modalImage.src = story.image;
                modalImage.alt = story.title;
                modalContent.textContent = story.content;
                
                storyModal.classList.remove('hidden');
                storyModal.classList.add('flex');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal functionality
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            storyModal.classList.add('hidden');
            storyModal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside content
    storyModal.addEventListener('click', (e) => {
        if (e.target === storyModal) {
            storyModal.classList.add('hidden');
            storyModal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        }
    });

    // --- FIXED Donation Frequency Toggle ---
    const monthlyBtn = document.getElementById('monthly-btn');
    const onceBtn = document.getElementById('once-btn');
    const frequencyInput = document.getElementById('donation-frequency');

    if (monthlyBtn && onceBtn && frequencyInput) {
        // Initialize active state
        monthlyBtn.classList.add('active');
        
        monthlyBtn.addEventListener('click', () => {
            monthlyBtn.classList.add('active');
            onceBtn.classList.remove('active');
            frequencyInput.value = 'monthly';
        });

        onceBtn.addEventListener('click', () => {
            onceBtn.classList.add('active');
            monthlyBtn.classList.remove('active');
            frequencyInput.value = 'once';
        });
    }

    // --- Donation Amount Buttons ---
    document.querySelectorAll('button[type="button"]').forEach(button => {
        if (button.textContent.includes('$')) {
            button.addEventListener('click', () => {
                // Remove active state from all amount buttons
                document.querySelectorAll('button[type="button"]').forEach(btn => {
                    if (btn.textContent.includes('$')) {
                        btn.classList.remove('bg-accent', 'text-primary');
                        btn.classList.add('hover:bg-accent');
                    }
                });
                
                // Add active state to clicked button
                button.classList.add('bg-accent', 'text-primary');
                button.classList.remove('hover:bg-accent');
                
                // Set the amount in the other amount field
                const amount = button.textContent.replace('$', '');
                document.querySelector('input[type="number"]').value = amount;
            });
        }
    });

    // --- Cookie Consent Banner ---
    function initCookieConsent() {
        const cookieBanner = document.getElementById('cookie-consent');
        const acceptCookiesBtn = document.getElementById('accept-cookies');

        if (!localStorage.getItem('cookies-accepted')) {
            // Show banner after a delay
            setTimeout(() => {
                cookieBanner.classList.remove('hidden');
                setTimeout(() => {
                    cookieBanner.classList.add('show');
                }, 100);
            }, 2000);
        }

        if (acceptCookiesBtn) {
            acceptCookiesBtn.addEventListener('click', () => {
                localStorage.setItem('cookies-accepted', 'true');
                cookieBanner.classList.remove('show');
                setTimeout(() => {
                    cookieBanner.classList.add('hidden');
                }, 500);
            });
        }
    }

    // Initialize cookie consent
    initCookieConsent();

    // --- Impact Counter Animation ---
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            // Start animation when counter is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }

    // Initialize counter animations
    animateCounters();

    // --- Add persuasive elements to donation page ---
    function enhanceDonationPage() {
        const donationSection = document.querySelector('main section.bg-white');
        if (donationSection && window.location.pathname.includes('donate.html')) {
            // Add impact breakdown
            const impactHTML = `
                <div class="mt-12 bg-accent rounded-lg p-8 slide-in-left">
                    <h3 class="text-2xl font-bold text-primary mb-6 text-center">Your Impact</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div class="bg-white p-6 rounded-lg zoom-in delay-100">
                            <div class="text-3xl text-primary font-bold mb-2">$25</div>
                            <p class="text-sm text-warm-gray">Provides nutritious meals for one elder for 2 weeks</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg zoom-in delay-200">
                            <div class="text-3xl text-primary font-bold mb-2">$50</div>
                            <p class="text-sm text-warm-gray">Covers medical checkups and essential medications</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg zoom-in delay-300">
                            <div class="text-3xl text-primary font-bold mb-2">$100</div>
                            <p class="text-sm text-warm-gray">Funds critical home repairs for safe living conditions</p>
                        </div>
                    </div>
                </div>
            `;
            donationSection.insertAdjacentHTML('beforeend', impactHTML);
        }
    }

    // Initialize donation page enhancements
    enhanceDonationPage();
});