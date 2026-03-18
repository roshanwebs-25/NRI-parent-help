/* ===== MEDGUARDIAN - SCRIPT.JS ===== */

// Dynamic branding configuration
const BrandConfig = {
  'momdad.help': {
    name: 'momdad.help',
<<<<<<< HEAD
    tagline: 'Door to Doctor · Doctor to Door',
=======
    tagline: 'Care for Your Parents · With Complete Peace of Mind',
>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
    pageTitle: 'momdad.help – Healthcare Peace of Mind for Parents',
    metaDescription: 'momdad.help provides professional healthcare supervision for elderly parents, giving families abroad complete peace of mind.'
  },
  'ammananna.help': {
    name: 'ammananna.help',
<<<<<<< HEAD
    tagline: 'Door to Doctor · Doctor to Door',
=======
    tagline: 'Caring for Your Loved Ones · Every Single Day',
>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
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
<<<<<<< HEAD

=======
  
  // Update page title with page context
>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
  const pageNames = {
    'index.html': '',
    'about.html': 'About Us',
    'services.html': 'Our Services',
    'why-choose-us.html': 'Why Choose Us',
    'our-promise.html': 'Our Promise',
    'contact.html': 'Get In Touch'
  };
<<<<<<< HEAD

  const pageName = pageNames[currentPage] || '';
  const titleSuffix = pageName ? ` – ${brand.pageTitle.split('–')[1].trim()}` : ` – ${brand.pageTitle}`;
  document.title = pageName ? `${pageName}${titleSuffix}` : brand.pageTitle;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', brand.metaDescription);

  // Hide logo images in navbar and footer
  document.querySelectorAll('.navbar-logo img, .footer-brand-logo img').forEach(img => {
    img.style.display = 'none';
  });

  document.querySelectorAll('.brand-name').forEach(el => {
    el.textContent = brand.name;
  });

  const navbarBrand = document.querySelector('.navbar-logo-text span');
  if (navbarBrand) navbarBrand.textContent = brand.name;

  const navbarTagline = document.querySelector('.navbar-logo-text small');
  if (navbarTagline) navbarTagline.textContent = brand.tagline;

  const footerBrand = document.querySelector('.footer-brand-logo span');
  if (footerBrand) footerBrand.textContent = brand.name;

  const footerTagline = document.querySelector('.footer-tagline');
  if (footerTagline) footerTagline.textContent = brand.tagline;

  // GLOBAL DOM TEXT REPLACEMENT
  const BRAND_PATTERN = /MedGaurdian|MedGuardian|medgaurdian|medguardian/gi;
  const TAGLINE_PATTERN = /Care for Your Parents\s*[·•·]\s*With Complete Peace of Mind|Caring for Your Loved Ones\s*[·•·]\s*Every Single Day|Door to Doctor\s*[·•·]\s*Doctor to Door/gi;

  function replaceInTextNode(node) {
    let val = node.nodeValue;
    BRAND_PATTERN.lastIndex = 0;
    val = val.replace(BRAND_PATTERN, brand.name);
    TAGLINE_PATTERN.lastIndex = 0;
    val = val.replace(TAGLINE_PATTERN, brand.tagline);
    node.nodeValue = val;
  }

  function walkDOM(root) {
    const skip = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA']);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (skip.has(node.parentElement?.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let node;
    while ((node = walker.nextNode())) replaceInTextNode(node);
  }

  walkDOM(document.body);

  BRAND_PATTERN.lastIndex = 0; TAGLINE_PATTERN.lastIndex = 0;
  document.title = document.title
    .replace(BRAND_PATTERN, brand.name)
    .replace(TAGLINE_PATTERN, brand.tagline);

  document.querySelectorAll('img[alt]').forEach(img => {
    BRAND_PATTERN.lastIndex = 0;
    img.alt = img.alt.replace(BRAND_PATTERN, brand.name);
  });

  document.querySelectorAll('[aria-label]').forEach(el => {
    BRAND_PATTERN.lastIndex = 0;
    el.setAttribute('aria-label', el.getAttribute('aria-label').replace(BRAND_PATTERN, brand.name));
  });
=======
  
  const pageName = pageNames[currentPage] || '';
  const titleSuffix = pageName ? ` – ${brand.pageTitle.split('–')[1].trim()}` : ` – ${brand.pageTitle}`;
  document.title = pageName ? `${pageName}${titleSuffix}` : brand.pageTitle;
  
  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', brand.metaDescription);
  }
  
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
>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
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

<<<<<<< HEAD
=======
/* ===== NAVBAR SCROLL SHADOW ===== */
>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

<<<<<<< HEAD
=======
/* ===== ACTIVE NAV LINK ===== */
>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

<<<<<<< HEAD
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;
  document.body.classList.add('anim-ready');
  const els = document.querySelectorAll('.fade-up, .fade-right, .fade-left, .fade-in');
=======
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

>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
<<<<<<< HEAD
  els.forEach(el => observer.observe(el));
}

=======

  els.forEach(el => observer.observe(el));
}

/* ===== MOBILE MENU ===== */
>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  if (!hamburger || !mobileNav) return;
<<<<<<< HEAD
=======

>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
  hamburger.addEventListener('click', () => {
    hamburger.classList.add('open');
    mobileNav.style.display = 'flex';
    requestAnimationFrame(() => mobileNav.classList.add('open'));
    document.body.style.overflow = 'hidden';
  });
<<<<<<< HEAD
=======

>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
  const close = () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { mobileNav.style.display = 'none'; }, 400);
  };
<<<<<<< HEAD
=======

>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
  if (mobileClose) mobileClose.addEventListener('click', close);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

<<<<<<< HEAD
=======
/* ===== SCROLL TO TOP BUTTON ===== */
>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
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

<<<<<<< HEAD
=======
/* ===== PARALLAX HERO ORBS ON MOUSEMOVE ===== */
>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
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

<<<<<<< HEAD
=======
/* ===== CONTACT FORM → WHATSAPP ===== */
>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
function submitContactForm(event) {
  event.preventDefault();
  const name    = (document.getElementById('contactName')?.value || '').trim();
  const phone   = (document.getElementById('contactPhone')?.value || '').trim();
  const service = (document.getElementById('contactService')?.value || '').trim();
<<<<<<< HEAD
=======

>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
  if (!name || !phone || !service) {
    alert('Please fill in all fields before submitting.');
    return;
  }
<<<<<<< HEAD
=======

>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
  const domain = window.location.hostname.toLowerCase();
  const brand = BrandConfig[domain] || BrandConfig['medgaurdian.com'];
  const text = 'Hello, I am interested in ' + brand.name + ' services.\n\nName: ' + name + '\nPhone: ' + phone + '\nService: ' + service;
  window.open('https://wa.me/918885158989?text=' + encodeURIComponent(text), '_blank');
<<<<<<< HEAD
}
=======
}
>>>>>>> 1bd6ca692b1c4c7bf9af1245ed97a39780b5964d
