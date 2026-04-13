// ═══════════════════════════════════════════
//  JOB DETAIL PAGE — job.js
//  Lightbox for Before & After photo grids
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

  // ── LIGHTBOX STATE ──
  let currentImages = [];
  let currentIndex  = 0;

  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxCap   = document.getElementById('lightboxCaption');
  const lightboxLoader= document.getElementById('lightboxLoader');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev  = document.getElementById('lightboxPrev');
  const lightboxNext  = document.getElementById('lightboxNext');
  const lightboxOverlay = document.getElementById('lightboxOverlay');

  if (!lightbox) return;

  // ── OPEN LIGHTBOX ──
  function openLightbox(items, index) {
    currentImages = items;
    currentIndex  = index;
    showImage(currentIndex);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // ── SHOW IMAGE ──
  function showImage(index) {
    const item = currentImages[index];
    lightboxLoader.classList.add('show');
    lightboxImg.style.opacity = '0';

    const tempImg = new Image();
    tempImg.onload = function () {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
      lightboxImg.style.opacity = '1';
      lightboxLoader.classList.remove('show');
    };
    tempImg.onerror = function () {
      lightboxImg.src = item.src;
      lightboxImg.style.opacity = '1';
      lightboxLoader.classList.remove('show');
    };
    tempImg.src = item.src;

    lightboxCap.textContent = item.caption + '  ·  ' + (index + 1) + ' / ' + currentImages.length;

    // Update button states
    lightboxPrev.style.opacity = index === 0 ? '0.3' : '1';
    lightboxNext.style.opacity = index === currentImages.length - 1 ? '0.3' : '1';
  }

  // ── CLOSE LIGHTBOX ──
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  }

  // ── PREV / NEXT ──
  function prevImage() {
    if (currentIndex > 0) {
      currentIndex--;
      showImage(currentIndex);
    }
  }

  function nextImage() {
    if (currentIndex < currentImages.length - 1) {
      currentIndex++;
      showImage(currentIndex);
    }
  }

  // ── COLLECT IMAGES FROM SECTION ──
  function collectImages(sectionId) {
    const grid = document.getElementById(sectionId);
    if (!grid) return [];
    return Array.from(grid.querySelectorAll('.photo-item')).map(item => ({
      src:     item.getAttribute('data-src'),
      alt:     item.querySelector('img').getAttribute('alt'),
      caption: item.querySelector('.photo-label').textContent.trim()
    }));
  }

  // ── BIND CLICK EVENTS ──
  const beforeImages = collectImages('beforeGrid');
  const afterImages  = collectImages('afterGrid');

  document.querySelectorAll('#beforeGrid .photo-item').forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(beforeImages, i));
  });

  document.querySelectorAll('#afterGrid .photo-item').forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(afterImages, i));
  });

  // ── CONTROLS ──
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', prevImage);
  lightboxNext.addEventListener('click', nextImage);

  // ── KEYBOARD ──
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   prevImage();
    if (e.key === 'ArrowRight')  nextImage();
  });

  // ── SWIPE SUPPORT (MOBILE) ──
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  lightbox.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextImage() : prevImage();
  });

  // ── BACK TO TOP ──
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('active', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── NAVBAR SCROLL ──
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    window.addEventListener('scroll', () => {
      mainNav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

});