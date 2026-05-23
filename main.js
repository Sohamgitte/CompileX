/* ============================================
   CompileX - Premium Developer Studio
   Main JavaScript File
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Loading Screen
    // ==========================================
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
            initAnimations();
        }, 1800);
    });
    
    // ==========================================
    // Mouse Glow Effect
    // ==========================================
    const mouseGlow = document.getElementById('mouseGlow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        mouseGlow.classList.add('visible');
    });
    
    document.addEventListener('mouseleave', function() {
        mouseGlow.classList.remove('visible');
    });
    
    // Smooth mouse glow animation
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        mouseGlow.style.left = glowX + 'px';
        mouseGlow.style.top = glowY + 'px';
        
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
    
    // ==========================================
    // Navigation
    // ==========================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu on link click
    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // ==========================================
    // Smooth Scroll
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // Scroll Reveal Animations
    // ==========================================
    function initAnimations() {
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(function(el) {
            observer.observe(el);
        });
    }
    
    // ==========================================
    // Stats Counter Animation
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-card .stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        statNumbers.forEach(function(stat) {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(function() {
                current += step;
                if (current >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
        
        statsAnimated = true;
    }
    
    // Observe stats section
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // ==========================================
    // FAQ Accordion
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(function(faq) {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ==========================================
    // Multi-Step Form
    // ==========================================
    const bookingForm = document.getElementById('bookingForm');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const btnNext = document.querySelectorAll('.btn-next');
    const btnPrev = document.querySelectorAll('.btn-prev');
    const formSuccess = document.getElementById('formSuccess');
    const resetFormBtn = document.getElementById('resetFormBtn');
    
    let currentStep = 1;
    
    // Update form display
    function updateFormDisplay() {
        formSteps.forEach(function(step) {
            step.classList.remove('active');
            if (parseInt(step.getAttribute('data-step')) === currentStep) {
                step.classList.add('active');
            }
        });
        
        progressSteps.forEach(function(step, index) {
            step.classList.remove('active', 'completed');
            if (index + 1 < currentStep) {
                step.classList.add('completed');
            } else if (index + 1 === currentStep) {
                step.classList.add('active');
            }
        });
        
        // Update review section when on step 3
        if (currentStep === 3) {
            updateReviewSection();
        }
    }
    
    // Validate current step
    function validateStep(step) {
        const currentFormStep = document.querySelector(`.form-step[data-step="${step}"]`);
        const inputs = currentFormStep.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(function(input) {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#FF5F57';
            } else {
                input.style.borderColor = '';
            }
        });
        
        // Email validation for step 1
        if (step === 1) {
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value && !emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = '#FF5F57';
            }
        }
        
        return isValid;
    }
    
    // Next button click
    btnNext.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const nextStep = parseInt(this.getAttribute('data-next'));
            
            if (validateStep(currentStep)) {
                currentStep = nextStep;
                updateFormDisplay();
            }
        });
    });
    
    // Previous button click
    btnPrev.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const prevStep = parseInt(this.getAttribute('data-prev'));
            currentStep = prevStep;
            updateFormDisplay();
        });
    });
    
    // Update review section
    function updateReviewSection() {
        const reviewClient = document.getElementById('reviewClientDetails');
        const reviewProject = document.getElementById('reviewProjectDetails');
        
        // Client details
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value || 'Not provided';
        const company = document.getElementById('company').value || 'Not provided';
        
        reviewClient.innerHTML = `
            <div class="review-item">
                <span>Name</span>
                <span>${firstName} ${lastName}</span>
            </div>
            <div class="review-item">
                <span>Email</span>
                <span>${email}</span>
            </div>
            <div class="review-item">
                <span>Phone</span>
                <span>${phone}</span>
            </div>
            <div class="review-item">
                <span>Company</span>
                <span>${company}</span>
            </div>
        `;
        
        // Project details
        const projectType = document.getElementById('projectType');
        const projectTypeText = projectType.options[projectType.selectedIndex].text;
        const budget = document.getElementById('budget');
        const budgetText = budget.options[budget.selectedIndex].text;
        const timeline = document.getElementById('timeline');
        const timelineText = timeline.options[timeline.selectedIndex].text;
        const description = document.getElementById('description').value;
        
        reviewProject.innerHTML = `
            <div class="review-item">
                <span>Project Type</span>
                <span>${projectTypeText}</span>
            </div>
            <div class="review-item">
                <span>Budget</span>
                <span>${budgetText}</span>
            </div>
            <div class="review-item">
                <span>Timeline</span>
                <span>${timelineText}</span>
            </div>
            <div class="review-item" style="grid-column: 1 / -1;">
                <span>Description</span>
                <span>${description.substring(0, 150)}${description.length > 150 ? '...' : ''}</span>
            </div>
        `;
    }
    
    // ==========================================
    // Agreement Modal
    // ==========================================
    const modal = document.getElementById('agreementModal');
    const viewAgreementBtn = document.getElementById('viewAgreementBtn');
    const termsLink = document.getElementById('termsLink');
    const closeModal = document.getElementById('closeModal');
    const acceptAgreement = document.getElementById('acceptAgreement');
    const agreeTerms = document.getElementById('agreeTerms');
    const submitBtn = document.getElementById('submitBtn');
    
    // Open modal
    function openModal() {
        modal.classList.add('active');
        document.body.classList.add('no-scroll');
    }
    
    // Close modal
    function closeModalFn() {
        modal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
    
    viewAgreementBtn.addEventListener('click', openModal);
    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
    });
    closeModal.addEventListener('click', closeModalFn);
    
    // Close modal on overlay click
    document.querySelector('.modal-overlay').addEventListener('click', closeModalFn);
    
    // Accept agreement
    acceptAgreement.addEventListener('click', function() {
        agreeTerms.checked = true;
        submitBtn.disabled = false;
        closeModalFn();
    });
    
    // Checkbox change
    agreeTerms.addEventListener('change', function() {
        submitBtn.disabled = !this.checked;
    });
    
    // ==========================================
    // Form Submission
    // ==========================================
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!agreeTerms.checked) {
            alert('Please accept the terms and agreement to continue.');
            return;
        }
        
        // Hide all form steps
        formSteps.forEach(function(step) {
            step.classList.remove('active');
        });
        
        // Show success message
        formSuccess.classList.add('active');
        
        // Hide progress
        document.querySelector('.form-progress').style.display = 'none';
        
        // In production, you would send the form data to a server here
        console.log('Form submitted successfully');
    });
    
    // Reset form
    resetFormBtn.addEventListener('click', function() {
        bookingForm.reset();
        currentStep = 1;
        formSuccess.classList.remove('active');
        document.querySelector('.form-progress').style.display = 'flex';
        updateFormDisplay();
        submitBtn.disabled = true;
    });
    
    // ==========================================
    // Keyboard Navigation
    // ==========================================
    document.addEventListener('keydown', function(e) {
        // Close modal on Escape
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalFn();
        }
        
        // Close mobile menu on Escape
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
    
    // ==========================================
    // Active Nav Link on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // ==========================================
    // Lazy Loading Images
    // ==========================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
    
    // ==========================================
    // Performance: Throttle Scroll Events
    // ==========================================
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    }
    
    // Apply throttle to scroll-heavy functions if needed
    // window.addEventListener('scroll', throttle(someFunction, 100));
    
});
