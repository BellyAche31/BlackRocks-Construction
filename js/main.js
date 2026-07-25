// BlackRocks Construction — shared site behaviour (vanilla JS, no dependencies)

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Sticky header on scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
    // Safety net: guarantee content is never stuck invisible (slow layout,
    // late-loading images shifting sections, etc.) by force-revealing after a delay.
    setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add('in-view'); });
    }, 2500);
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Before / After drag sliders ---------- */
  document.querySelectorAll('.slider-frame').forEach(function (frame) {
    var afterImg = frame.querySelector('.after-img');
    var handle = frame.querySelector('.slider-handle');
    var dragging = false;

    function setPos(clientX) {
      var rect = frame.getBoundingClientRect();
      var pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
      afterImg.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
      handle.style.left = pct + '%';
    }

    frame.addEventListener('pointerdown', function (e) {
      dragging = true;
      frame.setPointerCapture(e.pointerId);
      setPos(e.clientX);
    });
    frame.addEventListener('pointermove', function (e) {
      if (dragging) setPos(e.clientX);
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (evt) {
      frame.addEventListener(evt, function () { dragging = false; });
    });
  });

  /* ---------- Lightbox gallery ---------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  var lightbox = document.querySelector('.lightbox');
  if (galleryItems.length && lightbox) {
    var lbImg = lightbox.querySelector('img');
    var current = 0;

    function openAt(i) {
      current = i;
      lbImg.src = galleryItems[current].getAttribute('data-lightbox');
      lbImg.alt = galleryItems[current].getAttribute('data-caption') || '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    function step(dir) {
      current = (current + dir + galleryItems.length) % galleryItems.length;
      lbImg.src = galleryItems[current].getAttribute('data-lightbox');
      lbImg.alt = galleryItems[current].getAttribute('data-caption') || '';
    }

    galleryItems.forEach(function (item, i) {
      item.addEventListener('click', function () { openAt(i); });
    });
    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function () { step(-1); });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function () { step(1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }

  /* ---------- Portfolio filters ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryEls = document.querySelectorAll('.gallery-item');
  if (filterBtns.length && galleryEls.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.getAttribute('data-filter');
        galleryEls.forEach(function (item) {
          var show = f === 'all' || item.getAttribute('data-category') === f;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Contact form (FormSubmit.co — free, no signup required) ---------- */
  var form = document.querySelector('.quote-form');
  if (form) {
    // Pre-select service from ?service= query param (set by "Get a Quote" links on services page)
    var params = new URLSearchParams(window.location.search);
    var svc = params.get('service');
    var svcField = form.querySelector('#service');
    if (svc && svcField) {
      Array.prototype.forEach.call(svcField.options, function (opt) {
        if (opt.value === svc) opt.selected = true;
      });
    }

    var statusEl = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          statusEl.textContent = "Thank you — your message has been sent. We'll get back to you shortly.";
          statusEl.className = 'form-status show ok';
          form.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      }).catch(function () {
        statusEl.textContent = "Something went wrong sending your message. Please email us directly at blackrocksconstructionph@gmail.com or use WhatsApp/Viber below.";
        statusEl.className = 'form-status show err';
      }).finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
