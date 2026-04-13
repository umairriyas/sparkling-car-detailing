$(document).ready(function() {
    
    // ========================
    // Navigation Scroll Effect - BLACK BACKGROUND
    // ========================
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#mainNav').addClass('scrolled');
            $('#backToTop').addClass('show');
        } else {
            $('#mainNav').removeClass('scrolled');
            $('#backToTop').removeClass('show');
        }
    });
    
    // ========================
    // Hero Image Slider
    // ========================
    let currentSlide = 0;
    const slides = $('.hero-slide');
    const dots = $('.slider-dots .dot');
    const slideCount = slides.length;
    
    function showSlide(index) {
        slides.removeClass('active');
        dots.removeClass('active');
        
        $(slides[index]).addClass('active');
        $(dots[index]).addClass('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Dot click functionality
    dots.click(function() {
        clearInterval(slideInterval);
        currentSlide = $(this).data('slide');
        showSlide(currentSlide);
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // ========================
    // Smooth Scrolling
    // ========================
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-bs-toggle]').click(function(event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && 
            location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 800);
            }
        }
    });
    
    // ========================
    // Back to Top Button
    // ========================
    $('#backToTop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
    
    // ========================
    // Animate on Scroll
    // ========================
    function animateOnScroll() {
        $('.feature-card-wrapper, .service-item-wrapper').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).find('.feature-card, .service-item').css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }
        });
    }
    
    // Initialize animation styles
    $('.feature-card, .service-item').css({
        'opacity': '0',
        'transform': 'translateY(30px)',
        'transition': 'all 0.6s ease'
    });
    
    // Run on scroll and load
    $(window).on('scroll', animateOnScroll);
    animateOnScroll();
    
    // ========================
    // Service Cards Hover Effect
    // ========================
    $('.service-item').hover(
        function() {
            $(this).find('.service-icon-overlay').css('opacity', '1');
        },
        function() {
            $(this).find('.service-icon-overlay').css('opacity', '0');
        }
    );
    
    // ========================
    // Navbar Mobile Menu Close on Link Click
    // ========================
    $('.navbar-nav .nav-link').click(function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });
    
    // ========================
    // Add Active Class to Current Page
    // ========================
    var currentPage = window.location.pathname.split('/').pop();
    if (currentPage === '' || currentPage === 'index.html') {
        $('.navbar-nav .nav-link[href="index.html"]').addClass('active');
    } else {
        $('.navbar-nav .nav-link[href="' + currentPage + '"]').addClass('active');
    }
    
    // ========================
    // Lazy Loading Images
    // ========================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ========================
    // Initial Page Load Animation
    // ========================
    setTimeout(function() {
        $('body').addClass('loaded');
    }, 100);
    
});

// ========================
// Page Loading Animation
// ========================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(function() {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});


// Navbar scroll background
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});
