// ═══════════════════════════════════════════
//  GALLERY PAGE — gallery.js
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

  // ── 1. COUNTER ANIMATION ──
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }

  // Trigger counters when hero is visible
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.g-stat-num').forEach(animateCounter);
        heroObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const heroSection = document.querySelector('.gallery-hero');
  if (heroSection) heroObserver.observe(heroSection);

  // ── 2. FILTER TABS ──
  const filterTabs = document.querySelectorAll('.filter-tab');
  const jobCards   = document.querySelectorAll('.job-card');
  const showingEl  = document.getElementById('galleryShowing');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Update active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');
      let visible = 0;

      jobCards.forEach((card, i) => {
        const group = card.getAttribute('data-group');
        const show  = filter === 'all' || group === filter;

        if (show) {
          card.classList.remove('hidden');
          card.style.animationDelay = (visible * 0.05) + 's';
          card.style.animation = 'none';
          // Force reflow so animation re-triggers
          void card.offsetWidth;
          card.style.animation = '';
          visible++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (showingEl) {
        showingEl.textContent = `Showing ${visible} job${visible !== 1 ? 's' : ''}`;
      }
    });
  });

  // ── 3. SCROLL REVEAL FOR CARDS ──
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  jobCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = `opacity 0.45s ease ${i * 0.04}s, transform 0.45s ease ${i * 0.04}s`;
    cardObserver.observe(card);
  });

  // ── 4. BACK TO TOP ──
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('active', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── 5. STICKY NAV SHRINK (if not already in script.js) ──
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    window.addEventListener('scroll', () => {
      mainNav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

});