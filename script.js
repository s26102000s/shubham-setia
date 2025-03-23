// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    window.addEventListener('load', () => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuBtn.innerHTML = mobileMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            body.style.overflow = '';
        });
    });

    // Update active link in both mobile and desktop nav
    const updateActiveLink = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const currentScroll = window.scrollY;
            const sectionId = section.getAttribute('id');

            if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll animations
    const scrollObserverOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, scrollObserverOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.animate-on-scroll, .timeline-item').forEach(el => {
        observer.observe(el);
    });

    // Achievement counter animation
    const achievementCards = document.querySelectorAll('.achievement-card h3');
    const achievementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.textContent);
                const suffix = target.parentElement.dataset.suffix || '';
                
                let startValue = 0;
                const duration = 2000;
                const increment = endValue / (duration / 16);

                const counter = setInterval(() => {
                    startValue += increment;
                    if (startValue >= endValue) {
                        target.textContent = endValue + suffix;
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(startValue) + suffix;
                    }
                }, 16);

                achievementObserver.unobserve(target);
            }
        });
    }, { threshold: 1 });

    achievementCards.forEach(card => {
        achievementObserver.observe(card);
    });

    // Skill tags stagger animation
    const skillTags = document.querySelectorAll('.skill-tags span');
    skillTags.forEach((tag, index) => {
        tag.style.transitionDelay = `${index * 100}ms`;
    });

    // Navbar scroll behavior and active section highlighting
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const sectionObserverOptions = {
        rootMargin: '-50% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
