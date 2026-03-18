/* ===== MEDGUARDIAN - SCRIPT.JS ===== */

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

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', brand.metaDescription);

  // Hide logo images
  document.querySelectorAll('.navbar-logo img, .footer-brand-logo img').forEach(img => {
    img.style.display = 'none';
  });

  // Update specific brand elements
  document.querySelectorAll('.brand-name').forEach(el => { el.textContent = brand.name; });

  const navbarBrand = document.querySelector('.navbar-logo-text span');
  if (navbarBrand) navbarBrand.textContent = brand.name;

  const navbarTagline = document.querySelector('.navbar-logo-text small');
  if (navbarTagline) navbarTagline.textContent = brand.tagline;

  const footerBrand = document.querySelector('.footer-brand-logo span');
  if (footerBrand) footerBrand.textContent = brand.name;

  const footerTagline = document.querySelector('.footer-tagline');
  if (footerTagline) footerTagline.textContent = brand.tagline;

  // GLOBAL DOM TEXT REPLACEMENT — replaces ALL occurrences site-wide
  const BRAND_PATTERN = /MedGaurdian|MedGuardian|medgaurdian|medguardian/gi;
  const TAGLINE_PATTERN = /Care for Your Parents\s*[·•]\s*With Complete Peace of Mind|Caring for Your Loved Ones\s*[·•]\s*Every Single Day|Door to Doctor\s*[·•]\s*Doctor to Door/gi;

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

  // Fix title, alt, aria-label too
  BRAND_PATTERN.lastIndex = 0; TAGLINE_PATTERN.lastIndex = 0;
  document.title = document.title.replace(BRAND_PATTERN, brand.name).replace(TAGLINE_PATTERN, brand.tagline);

  document.querySelectorAll('img[alt]').forEach(img => {
    BRAND_PATTERN.lastIndex = 0;
    img.alt = img.alt.replace(BRAND_PATTERN, brand.name);
  });

  document.querySelectorAll('[aria-label]').forEach(el => {
    BRAND_PATTERN.lastIndex = 0;
    el.setAttribute('aria-label', el.getAttribute('aria-label').replace(BRAND_PATTERN, brand.name));
  });

  // EQUAL WIDTH: stretch brand name letter-spacing to match tagline width
  equalizeLogoWidths();
}

/* ===== EQUAL WIDTH: Brand name matches tagline width ===== */
function equalizeLogoWidths() {
  // Pairs: [brandNameEl, taglineEl]
  const pairs = [
    [
      document.querySelector('.navbar-logo-text span'),
      document.querySelector('.navbar-logo-text small')
    ],
    [
      document.querySelector('.footer-brand-logo span'),
      document.querySelector('.footer-tagline')
    ]
  ];

  pairs.forEach(([nameEl, taglineEl]) => {
    if (!nameEl || !taglineEl) return;

    // Reset any previous letter-spacing so measurement is clean
    nameEl.style.letterSpacing = '0px';

    // Measure natural widths after paint
    requestAnimationFrame(() => {
      const taglineW = taglineEl.getBoundingClientRect().width;
      const nameW    = nameEl.getBoundingClientRect().width;
      const charCount = nameEl.textContent.length;

      if (charCount < 2 || taglineW <= 0) return;

      // Extra pixels needed spread across (charCount - 1) gaps
      const extraPx = taglineW - nameW;
      const spacingPx = extraPx / (charCount - 1);

      // Only apply if brand name is shorter than tagline
      if (spacingPx > 0) {
        nameEl.style.letterSpacing = spacingPx.toFixed(3) + 'px';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyBranding();
  initNavbar();
  initScrollAnimations();
  initMobileMenu();
  setActiveNav();
  initScrollTop();
  initParallaxOrbs();
  // Re-equalize on resize (mobile/desktop switch)
  window.addEventListener('resize', equalizeLogoWidths, { passive: true });
});

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

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

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
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