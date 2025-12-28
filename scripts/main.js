(function () {
  const body = document.body;
  const isArabic = body.classList.contains('lang-ar');
  const navToggle = document.querySelector('.menu-toggle');
  const mobilePanel = document.querySelector('.mobile-panel');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('.site-header');
  const logoImg = document.querySelector('.logo-image img');
  const logoText = document.querySelector('.logo-text');
  const languageButtons = document.querySelectorAll('[data-language-toggle]');
  const preferredKey = 'shehawy-language';
  const placeholder =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300" fill="none"><rect width="400" height="300" rx="16" fill="%23eef5ff"/><path d="M70 220c30-40 70-60 130-60s100 20 130 60" stroke="%231c7ed6" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity="0.35"/><circle cx="145" cy="140" r="40" fill="%231c7ed6" opacity="0.12"/><circle cx="255" cy="140" r="32" fill="%230fbf61" opacity="0.12"/><text x="200" y="160" text-anchor="middle" fill="%23155faf" font-family="Arial, sans-serif" font-size="22" font-weight="700">Shehawy Dental</text></svg>';

  function normalizePath(pathname) {
    let cleaned = pathname.replace(/index\.html$/i, '');
    if (cleaned.endsWith('/') && cleaned !== '/') cleaned = cleaned.slice(0, -1);
    if (cleaned === '') cleaned = '/';
    return cleaned;
  }

  function mappedPath(pathname, targetLang) {
    const normalized = normalizePath(pathname);
    const routes = {
      '/': { ar: '/', en: '/en/' },
      '/services': { ar: '/services', en: '/en/services' },
      '/team': { ar: '/team', en: '/en/team' },
      '/en': { ar: '/', en: '/en/' },
      '/en/services': { ar: '/services', en: '/en/services' },
      '/en/team': { ar: '/team', en: '/en/team' }
    };
    if (routes[normalized]) return routes[normalized][targetLang];
    if (targetLang === 'en') return normalized.startsWith('/en') ? normalized : `/en${normalized}`;
    return normalized.replace(/^\/en/, '') || '/';
  }

  function applyPreferredLanguage() {
    const stored = localStorage.getItem(preferredKey);
    if (!stored) return;
    const currentLang = isArabic ? 'ar' : 'en';
    if (stored !== currentLang) {
      const destination = mappedPath(window.location.pathname, stored);
      if (destination !== window.location.pathname) {
        window.location.replace(destination);
      }
    }
  }

  function bindLanguageSwitchers() {
    languageButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetLang = btn.dataset.languageToggle;
        const destination = mappedPath(window.location.pathname, targetLang);
        localStorage.setItem(preferredKey, targetLang);
        if (destination !== window.location.pathname) {
          window.location.href = destination;
        }
      });
    });
  }

  function bindNavigation() {
    navToggle?.addEventListener('click', () => {
      mobilePanel?.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', mobilePanel?.classList.contains('open'));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobilePanel?.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function bindScrollShadow() {
    const setShadow = () => {
      if (!header) return;
      header.classList.toggle('elevated', window.scrollY > 8);
    };
    setShadow();
    window.addEventListener('scroll', setShadow);
  }

  function applyImageFallbacks() {
    document.querySelectorAll('img[data-fallback]').forEach((img) => {
      const setPlaceholder = () => {
        if (img.dataset.fallbackApplied) return;
        img.dataset.fallbackApplied = 'true';
        img.src = placeholder;
        img.removeAttribute('srcset');
      };
      img.addEventListener('error', setPlaceholder, { once: true });
      if (img.complete && img.naturalWidth === 0) {
        setPlaceholder();
      }
    });
  }

  function handleLogoFallback() {
    if (!logoImg || !logoText) return;
    const toggleState = () => {
      if (logoImg.naturalWidth === 0) {
        logoImg.style.display = 'none';
      } else {
        logoText.style.display = 'none';
      }
    };
    logoImg.addEventListener('load', toggleState);
    logoImg.addEventListener('error', () => {
      logoImg.style.display = 'none';
      logoText.style.display = 'inline-flex';
    });
    if (logoImg.complete) {
      toggleState();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyPreferredLanguage();
    bindLanguageSwitchers();
    bindNavigation();
    bindScrollShadow();
    applyImageFallbacks();
    handleLogoFallback();
  });
})();
