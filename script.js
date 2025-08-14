// JavaScript for Equinos Elite Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 90; // Increased offset to account for navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.navbar-nav .nav-link');

    function setActiveNavItem() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Increased offset for better detection
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavItem);

    // Counter animation for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-item h2');
        let hasAnimated = false;
        
        if (!hasAnimated) {
            counters.forEach(counter => {
                const target = parseInt(counter.innerText.replace(/\D/g, ''));
                const increment = target / 80;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        const suffix = counter.innerText.replace(/\d/g, '').replace(/\+/g, '');
                        counter.innerText = Math.ceil(current) + suffix;
                        setTimeout(updateCounter, 25);
                    } else {
                        counter.innerText = target + counter.innerText.replace(/\d+/, '');
                    }
                };
                
                updateCounter();
            });
            hasAnimated = true;
        }
    };

    // Advanced Intersection Observer for animations (DISABLED)
    // const observerOptions = {
    //     threshold: 0.15,
    //     rootMargin: '0px 0px -50px 0px'
    // };

    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach((entry, index) => {
    //         if (entry.isIntersecting) {
    //             // Add staggered animation delays
    //             setTimeout(() => {
    //                 entry.target.classList.add('animate-on-scroll');
    //             }, index * 100);
    //             
    //             // Special handling for different sections
    //             if (entry.target.classList.contains('bg-primary')) {
    //                 animateCounters();
    //             }
    //             
    //             // Add specific animations based on position
    //             if (index % 2 === 0) {
    //                 entry.target.classList.add('animate-left');
    //             } else {
    //                 entry.target.classList.add('animate-right');
    //             }
    //         }
    //     });
    // }, observerOptions);

    // Observe elements for animation (DISABLED)
    // const animateElements = document.querySelectorAll('.card, .service-item, .stat-item, .contact-item, .testimonial-card, .training-item');
    // animateElements.forEach(el => observer.observe(el));

    // Enhanced card hover effects (DISABLED)
    // const cards = document.querySelectorAll('.card');
    // cards.forEach(card => {
    //     card.addEventListener('mouseenter', function() {
    //         this.style.transform = 'translateY(-15px) scale(1.02)';
    //         this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    //     });
    //     
    //     card.addEventListener('mouseleave', function() {
    //         this.style.transform = 'translateY(0) scale(1)';
    //     });
    // });

    // Service items interactive effects (DISABLED)
    // const serviceItems = document.querySelectorAll('.service-item');
    // serviceItems.forEach(item => {
    //     item.addEventListener('mouseenter', function() {
    //         const icon = this.querySelector('.service-icon i');
    //         icon.style.transform = 'scale(1.2) rotate(5deg)';
    //         icon.style.transition = 'all 0.3s ease';
    //     });
    //     
    //     item.addEventListener('mouseleave', function() {
    //         const icon = this.querySelector('.service-icon i');
    //         icon.style.transform = 'scale(1) rotate(0deg)';
    //     });
    // });

    // Dynamic navbar background
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(13, 110, 253, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = '#0d6efd';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
        }
    });

    // Advanced parallax effects (DISABLED)
    // const heroSection = document.querySelector('.hero-section');
    // const trainingCircle = document.querySelector('.training-circle');
    // 
    // window.addEventListener('scroll', function() {
    //     const scrolled = window.pageYOffset;
    //     const parallax = scrolled * 0.3;
    //     
    //     if (heroSection) {
    //         heroSection.style.transform = `translateY(${parallax}px)`;
    //     }
    //     
    //     if (trainingCircle) {
    //         const circleOffset = scrolled * 0.1;
    //         trainingCircle.style.transform = `rotate(${circleOffset}deg)`;
    //     }
    // });

    // Interactive testimonials
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            testimonialCards.forEach(c => c.classList.remove('active-testimonial'));
            // Add active class to clicked card
            this.classList.add('active-testimonial');
        });
    });

    // Form handling with validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                    showValidationMessage(input, 'Este campo es obligatorio');
                } else {
                    input.classList.remove('is-invalid');
                    removeValidationMessage(input);
                }
                
                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    if (!utils.validateEmail(input.value)) {
                        isValid = false;
                        input.classList.add('is-invalid');
                        showValidationMessage(input, 'Email inválido');
                    }
                }
            });
            
            if (isValid) {
                showSuccessMessage('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.');
                this.reset();
            }
        });
    });

    // Page loader with horse animation
    createPageLoader();
    
    // Scroll to top button
    createScrollToTopButton();
    
    // Initialize wow animations if library is available
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
});

// Utility functions
const utils = {
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    formatPhone: function(phone) {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    },
    
    scrollToTop: function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },
    
    generateStars: function() {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars-container';
        starsContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: white;
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.2};
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: twinkle ${Math.random() * 3 + 2}s infinite;
            `;
            starsContainer.appendChild(star);
        }
        
        document.body.appendChild(starsContainer);
    }
};

// Helper functions
function showValidationMessage(input, message) {
    removeValidationMessage(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function removeValidationMessage(input) {
    const existingError = input.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

function showSuccessMessage(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alert.style.cssText = 'top: 100px; right: 20px; z-index: 9999; max-width: 400px;';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 5000);
}

function createPageLoader() {
    const pageLoader = document.createElement('div');
    pageLoader.className = 'page-loader';
    pageLoader.innerHTML = `
        <div class="d-flex flex-column align-items-center">
            <div class="spinner-border text-light mb-3" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <i class="fas fa-horse-head text-light" style="font-size: 3rem; animation: gallop 1s ease-in-out infinite;"></i>
            <p class="text-light mt-3">Cargando Equinos Elite...</p>
        </div>
    `;
    pageLoader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1e3a8a, #3b82f6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;

    document.body.appendChild(pageLoader);

    window.addEventListener('load', function() {
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            setTimeout(() => {
                if (pageLoader.parentNode) {
                    document.body.removeChild(pageLoader);
                }
            }, 500);
        }, 800);
    });
}

function createScrollToTopButton() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'btn btn-primary btn-scroll-top';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        display: none;
        z-index: 1000;
        box-shadow: 0 6px 20px rgba(13, 110, 253, 0.3);
        border: none;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('click', utils.scrollToTop);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 400) {
            scrollTopBtn.style.display = 'block';
            scrollTopBtn.style.transform = 'scale(1)';
        } else {
            scrollTopBtn.style.transform = 'scale(0)';
            setTimeout(() => {
                if (window.pageYOffset <= 400) {
                    scrollTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
}

// Add CSS animations (DISABLED)
// const style = document.createElement('style');
// style.textContent = `
//     @keyframes twinkle {
//         0%, 100% { opacity: 0.2; transform: scale(1); }
//         50% { opacity: 1; transform: scale(1.2); }
//     }
//     
//     .active-testimonial {
//         transform: scale(1.05) !important;
//         box-shadow: 0 25px 50px rgba(13, 110, 253, 0.2) !important;
//     }
//     
//     .is-invalid {
//         border-color: #dc3545 !important;
//         box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
//     }
// `;
// document.head.appendChild(style);

// Initialize stars background (DISABLED)
// utils.generateStars();
