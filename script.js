/* ===== MEDGUARDIAN - SCRIPT.JS ===== */

// Dynamic branding configuration
const BrandConfig = {
  'momdad.help': {
    name: 'momdad.help',
    tagline: 'Door to Doctor · Doctor to Door',
    pageTitle: 'momdad.help – Healthcare Peace of Mind for Parents',
    metaDescription: 'momdad.help provides professional healthcare supervision for elderly parents, giving families abroad complete peace of mind.'
  },
  'ammananna.help': {
    name: 'ammananna.help',
    tagline: 'Door to Doctor · Doctor to Door',
    pageTitle: 'ammananna.help – Healthcare Peace of Mind for Your Parents',
    metaDescription: 'ammananna.help provides professional healthcare supervision for elderly parents in India, giving NRI families abroad complete peace of mind.'
  },
  'medgaurdian.com': {
    name: 'MedGaurdian',
    tagline: 'Door to Doctor · Doctor to Door',
    pageTitle: 'MedGaurdian – Healthcare Peace of Mind for NRI Families',
    metaDescription: 'MedGaurdian provides comprehensive healthcare supervision for elderly parents in India, giving NRI families abroad complete peace of mind.'
  }
};

function getBrandConfig() {
  const hostname = window.location.hostname.toLowerCase();
  return BrandConfig[hostname] || BrandConfig['medgaurdian.com'];
}

function applyBranding() {
  const brand = getBrandConfig();
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Update page title with page context
  const pageNames = {
    'index.html': '',
    'about.html': 'About Us',
    'services.html': 'Our Services',
    'why-choose-us.html': 'Why Choose Us',
    'our-promise.html': 'Our Promise',
    'contact.html': 'Get In Touch'
  };
  
  const pageName = pageNames[currentPage] || '';
  const titleSuffix = pageName ? ` – ${brand.pageTitle.split('–')[1].trim()}` : ` – ${brand.pageTitle}`;
  document.title = pageName ? `${pageName}${titleSuffix}` : brand.pageTitle;
  
  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', brand.metaDescription);
  }
  
  // Hide logo images in navbar and footer
  document.querySelectorAll('.navbar-logo img, .footer-brand-logo img').forEach(img => {
    img.style.display = 'none';
  });

  // Update all brand-name elements
  document.querySelectorAll('.brand-name').forEach(el => {
    el.textContent = brand.name;
  });
  
  // Update navbar brand
  const navbarBrand = document.querySelector('.navbar-logo-text span');
  if (navbarBrand) {
    navbarBrand.textContent = brand.name;
  }
  
  // Update navbar tagline
  const navbarTagline = document.querySelector('.navbar-logo-text small');
  if (navbarTagline) {
    navbarTagline.textContent = brand.tagline;
  }
  
  // Update footer brand
  const footerBrand = document.querySelector('.footer-brand-logo span');
  if (footerBrand) {
    footerBrand.textContent = brand.name;
  }
  
  // Update footer tagline
  const footerTagline = document.querySelector('.footer-tagline');
  if (footerTagline) {
    footerTagline.textContent = brand.tagline;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyBranding();
  initNavbar();
  initScrollAnimations();
  initMobileMenu();
  setActiveNav();
  initScrollTop();
  initParallaxOrbs();
});

/* ===== NAVBAR SCROLL SHADOW ===== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ===== ACTIVE NAV LINK ===== */
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ===== SCROLL ANIMATIONS =====
   Strategy:
   1. Only add .anim-ready to body AFTER confirming IntersectionObserver exists.
   2. Immediately observe all elements — those already in viewport get .visible instantly.
   3. No IntersectionObserver = content stays fully visible (no hidden elements).
*/
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  document.body.classList.add('anim-ready');

  const els = document.querySelectorAll('.fade-up, .fade-right, .fade-left, .fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.add('open');
    mobileNav.style.display = 'flex';
    requestAnimationFrame(() => mobileNav.classList.add('open'));
    document.body.style.overflow = 'hidden';
  });

  const close = () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { mobileNav.style.display = 'none'; }, 400);
  };

  if (mobileClose) mobileClose.addEventListener('click', close);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

/* ===== SCROLL TO TOP BUTTON ===== */
function initScrollTop() {
  if (!document.querySelector('.scroll-top')) {
    const btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>`;
    document.body.appendChild(btn);
  }
  const scrollTopBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== PARALLAX HERO ORBS ON MOUSEMOVE ===== */
function initParallaxOrbs() {
  const heroContent = document.querySelector('.hero-content');
  const heroOrb1 = document.querySelector('.hero-orb1');
  const heroOrb2 = document.querySelector('.hero-orb2');
  if (!heroContent) return;
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    if (heroOrb1) heroOrb1.style.transform = `translateY(-50%) translate(${x * 18}px, ${y * 12}px)`;
    if (heroOrb2) heroOrb2.style.transform = `translate(${x * -12}px, ${y * -8}px)`;
  });
}

/* ===== CONTACT FORM → WHATSAPP ===== */
function submitContactForm(event) {
  event.preventDefault();
  const name    = (document.getElementById('contactName')?.value || '').trim();
  const phone   = (document.getElementById('contactPhone')?.value || '').trim();
  const service = (document.getElementById('contactService')?.value || '').trim();

  if (!name || !phone || !service) {
    alert('Please fill in all fields before submitting.');
    return;
  }

  const domain = window.location.hostname.toLowerCase();
  const brand = BrandConfig[domain] || BrandConfig['medgaurdian.com'];
  const text = 'Hello, I am interested in ' + brand.name + ' services.\n\nName: ' + name + '\nPhone: ' + phone + '\nService: ' + service;
  window.open('https://wa.me/918885158989?text=' + encodeURIComponent(text), '_blank');
}