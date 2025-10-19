/**
 * ==========================================================================
 * MAIN JAVASCRIPT FILE - Elevate Digital Landing Page
 * Pure vanilla JavaScript with no dependencies
 * ==========================================================================
 */

// ==========================================================================
// MOBILE NAVIGATION TOGGLE
// ==========================================================================

/**
 * Handles mobile menu toggle functionality
 * Opens and closes the navigation menu on mobile devices
 */
function initMobileNavigation() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Toggle mobile menu on button click
    mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinkItems.forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnToggle = mobileToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
}

// ==========================================================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ==========================================================================

/**
 * Implements smooth scrolling when clicking on anchor links
 * Accounts for fixed navbar height
 */
function initSmoothScrolling() {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            // Skip if it's just #
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================================
// NAVBAR SCROLL EFFECT
// ==========================================================================

/**
 * Adds shadow to navbar when scrolling
 * Enhances visual depth on scroll
 */
function initNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ==========================================================================
// TESTIMONIALS SLIDER
// ==========================================================================

/**
 * Manages testimonial carousel functionality
 * Includes navigation buttons, dots, and auto-rotation
 */
function initTestimonialsSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0;
    let autoRotateInterval;

    /**
     * Shows testimonial at specified index
     * @param {number} index - The index of the testimonial to show
     */
    function showTestimonial(index) {
        // Remove active class from all cards and dots
        testimonialCards.forEach(function(card) {
            card.classList.remove('active');
        });
        dots.forEach(function(dot) {
            dot.classList.remove('active');
        });

        // Add active class to current card and dot
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');

        currentIndex = index;
    }

    /**
     * Shows next testimonial in sequence
     * Loops back to first when reaching the end
     */
    function nextTestimonial() {
        let nextIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(nextIndex);
    }

    /**
     * Shows previous testimonial in sequence
     * Loops to last when at beginning
     */
    function prevTestimonial() {
        let prevIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(prevIndex);
    }

    /**
     * Starts automatic rotation of testimonials
     * Rotates every 5 seconds
     */
    function startAutoRotate() {
        autoRotateInterval = setInterval(nextTestimonial, 5000);
    }

    /**
     * Stops automatic rotation
     */
    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }

    // Event listeners for navigation buttons
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            stopAutoRotate();
            nextTestimonial();
            startAutoRotate();
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', function() {
            stopAutoRotate();
            prevTestimonial();
            startAutoRotate();
        });
    }

    // Event listeners for dot navigation
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            stopAutoRotate();
            showTestimonial(index);
            startAutoRotate();
        });
    });

    // Start auto-rotation on page load
    startAutoRotate();

    // Pause auto-rotation when user hovers over testimonials
    const testimonialsSection = document.querySelector('.testimonials-container');
    if (testimonialsSection) {
        testimonialsSection.addEventListener('mouseenter', stopAutoRotate);
        testimonialsSection.addEventListener('mouseleave', startAutoRotate);
    }
}

// ==========================================================================
// CONTACT FORM HANDLING
// ==========================================================================

/**
 * Handles contact form submission
 * Validates input and displays success message
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all fields');
                return;
            }

            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Simulate form submission
            // In production, this would be an actual API call
            console.log('Form submitted:', formData);

            // Hide form and show success message
            contactForm.style.display = 'none';
            formSuccess.classList.add('show');

            // Optional: Reset form and show it again after 5 seconds
            setTimeout(function() {
                contactForm.reset();
                contactForm.style.display = 'flex';
                formSuccess.classList.remove('show');
            }, 5000);
        });
    }
}

// ==========================================================================
// SCROLL REVEAL ANIMATIONS
// ==========================================================================

/**
 * Reveals elements as they scroll into view
 * Uses Intersection Observer API for performance
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.feature-card, .service-item, .testimonial-card, .about-grid'
    );

    // Add scroll-reveal class to elements
    revealElements.forEach(function(element) {
        element.classList.add('scroll-reveal');
    });

    // Create intersection observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: Stop observing after reveal
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    revealElements.forEach(function(element) {
        observer.observe(element);
    });
}

// ==========================================================================
// ACTIVE NAV LINK HIGHLIGHTING
// ==========================================================================

/**
 * Highlights navigation link corresponding to current section
 * Updates as user scrolls through page
 */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let currentSection = '';

        // Determine which section is currently in view
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.pageYOffset + 100;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update active nav link
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// ==========================================================================
// BUTTON HOVER EFFECT ENHANCEMENT
// ==========================================================================

/**
 * Adds ripple effect to buttons on click
 * Enhances user interaction feedback
 */
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            // Get click position
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            button.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });
}

// ==========================================================================
// PERFORMANCE OPTIMIZATION
// ==========================================================================

/**
 * Debounce function to limit function calls
 * Improves performance for scroll and resize events
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==========================================================================
// LAZY LOADING FOR IMAGES (if any are added)
// ==========================================================================

/**
 * Implements lazy loading for images
 * Loads images only when they're about to enter viewport
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
        });
    }
}

// ==========================================================================
// KEYBOARD NAVIGATION SUPPORT
// ==========================================================================

/**
 * Adds keyboard navigation support for accessibility
 * Allows users to navigate testimonials with arrow keys
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Only handle arrow keys when testimonials are in view
        const testimonialsSection = document.querySelector('.testimonials');
        const rect = testimonialsSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isInView) {
            if (e.key === 'ArrowLeft') {
                document.getElementById('prev-testimonial').click();
            } else if (e.key === 'ArrowRight') {
                document.getElementById('next-testimonial').click();
            }
        }
    });
}

// ==========================================================================
// PAGE LOAD OPTIMIZATION
// ==========================================================================

/**
 * Shows loading indicator and hides content until page is ready
 * Improves perceived performance
 */
function handlePageLoad() {
    // Add loaded class to body when everything is ready
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        // Initialize animations after a small delay
        setTimeout(function() {
            initScrollReveal();
        }, 100);
    });
}

// ==========================================================================
// BACK TO TOP BUTTON
// ==========================================================================

/**
 * Creates and manages back-to-top button
 * Appears when user scrolls down
 */
function initBackToTop() {
    // Create button element
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #0066cc, #004d99);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    `;

    document.body.appendChild(backToTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', debounce(function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    }, 100));

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    });

    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });
}

// ==========================================================================
// INITIALIZE ALL FUNCTIONS ON DOM CONTENT LOADED
// ==========================================================================

/**
 * Main initialization function
 * Calls all setup functions when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize core functionality
    initMobileNavigation();
    initSmoothScrolling();
    initNavbarScrollEffect();
    initTestimonialsSlider();
    initContactForm();
    initActiveNavHighlight();
    initButtonEffects();
    initLazyLoading();
    initKeyboardNavigation();
    initBackToTop();

    // Handle page load
    handlePageLoad();

    // Log initialization complete
    console.log('Elevate Digital landing page initialized successfully!');
});

// ==========================================================================
// HANDLE WINDOW RESIZE
// ==========================================================================

/**
 * Handles window resize events
 * Adjusts layout and closes mobile menu if needed
 */
window.addEventListener('resize', debounce(function() {
    const navLinks = document.getElementById('nav-links');
    const mobileToggle = document.getElementById('mobile-toggle');

    // Close mobile menu on resize to desktop
    if (window.innerWidth > 968) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
}, 250));

// ==========================================================================
// PREVENT ZOOM ON DOUBLE TAP (Mobile)
// ==========================================================================

/**
 * Prevents accidental zoom on mobile devices
 * Improves mobile user experience
 */
let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });
