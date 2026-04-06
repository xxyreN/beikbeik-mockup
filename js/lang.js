// --- FOUT prevention ---
(function() {
  var timeout = setTimeout(function() {
    document.body.classList.add('fonts-loaded');
  }, 800);
  document.fonts.ready.then(function() {
    clearTimeout(timeout);
    document.body.classList.add('fonts-loaded');
  });
})();

// --- Language toggle ---
(function() {
  var lang = localStorage.getItem('bb-lang') || 'es';
  document.documentElement.classList.add('lang-' + lang);

  document.addEventListener('click', function(e) {
    if (e.target.closest('.lang-toggle')) {
      e.preventDefault();
      var current = document.documentElement.classList.contains('lang-es') ? 'es' : 'en';
      var next = current === 'es' ? 'en' : 'es';
      document.documentElement.classList.remove('lang-' + current);
      document.documentElement.classList.add('lang-' + next);
      localStorage.setItem('bb-lang', next);
      // Update toggle button text
      document.querySelectorAll('.lang-toggle').forEach(function(btn) {
        btn.textContent = next === 'es' ? 'EN' : 'ES';
      });
    }
  });

  // Set initial toggle text
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.lang-toggle').forEach(function(btn) {
      btn.textContent = lang === 'es' ? 'EN' : 'ES';
    });
  });
})();

// --- Nav scroll shadow ---
(function() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });
})();

// --- Hamburger menu ---
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.querySelector('.hamburger');
    var mobileMenu = document.querySelector('.mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  });
})();

// --- Image fallback: show filename when image is missing ---
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('img[src^="img/"]').forEach(function(img) {
    img.addEventListener('error', function() {
      var filename = this.src.split('/').pop();
      var wrapper = document.createElement('div');
      wrapper.className = 'img-placeholder';
      wrapper.style.width = '100%';
      wrapper.style.aspectRatio = this.style.aspectRatio || '4/3';
      wrapper.textContent = filename;
      this.parentNode.replaceChild(wrapper, this);
    });
  });
});
