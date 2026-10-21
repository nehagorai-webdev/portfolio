/* ================================================================
   NEHA GORAI — Portfolio  ·  script.js
================================================================ */

/* ── 1. CUSTOM CURSOR ────────────────────────────────────────── */
(function () {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = -200, my = -200, rx = -200, ry = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function tick() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  })();

  const hover = 'a, button, input, textarea, .card, .skill, .goal-card, .mlink';
  document.querySelectorAll(hover).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = ring.style.opacity = '1';
  });
})();


/* ── 2. NAV: scroll style + active section highlight ─────────── */
(function () {
  const nav      = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-a');
  const sections = document.querySelectorAll('section[id]');

  function update() {
    nav.classList.toggle('solid', window.scrollY > 55);

    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ── 3. HAMBURGER / DRAWER ───────────────────────────────────── */
(function () {
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');

  function close() {
    burger.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    const opening = !drawer.classList.contains('open');
    burger.classList.toggle('open', opening);
    drawer.classList.toggle('open', opening);
    document.body.style.overflow = opening ? 'hidden' : '';
  });

  // Close on drawer link click
  drawer.querySelectorAll('.drawer-a').forEach(a => {
    a.addEventListener('click', close);
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!drawer.contains(e.target) && !burger.contains(e.target)) close();
  });
})();


/* ── 4. CONTACT MODAL ────────────────────────────────────────── */
(function () {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');

  function openModal() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // All elements with .open-modal open the modal
  document.querySelectorAll('.open-modal').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      // Close drawer if open
      const drawer = document.getElementById('drawer');
      const burger = document.getElementById('burger');
      if (drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        burger.classList.remove('open');
      }
      openModal();
    });
  });

  // Close on X button
  closeBtn.addEventListener('click', closeModal);

  // Close on overlay click (outside card)
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // Modal form submission
  const form = document.getElementById('modal-form');
  const ok   = document.getElementById('mok');
  const submitBtn = document.getElementById('modal-submit');

  form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    // Simulate send (replace with real API / EmailJS / Formspree)
    setTimeout(() => {
      ok.classList.add('show');
      form.reset();
      submitBtn.textContent = 'Send message';
      submitBtn.disabled = false;
      setTimeout(() => ok.classList.remove('show'), 5000);
    }, 1000);
  });
})();


/* ── 5. STARS (hero background) ─────────────────────────────── */
(function () {
  const hero = document.getElementById('home');
  if (!hero) return;

  for (let i = 0; i < 90; i++) {
    const s = document.createElement('div');
    s.classList.add('star');
    const size = Math.random() * 2 + .5;
    s.style.cssText = [
      'left:'   + Math.random() * 100 + '%',
      'top:'    + Math.random() * 100 + '%',
      'width:'  + size + 'px',
      'height:' + size + 'px',
      '--dur:'  + (Math.random() * 3 + 2) + 's',
      'animation-delay:' + (Math.random() * 4) + 's',
    ].join(';');
    hero.appendChild(s);
  }
})();


/* ── 6. SCROLL REVEAL (Intersection Observer) ────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Stagger project cards
  document.querySelectorAll('.card').forEach((c, i) => {
    c.style.transitionDelay = (i * 0.09) + 's';
  });

  // Stagger goal cards
  document.querySelectorAll('.goal-card').forEach((g, i) => {
    g.style.transitionDelay = (i * 0.07) + 's';
  });

  els.forEach(el => io.observe(el));
})();


/* ── 7. CARD 3D TILT (desktop only) ─────────────────────────── */
(function () {
  if (window.matchMedia('(max-width:860px)').matches) return;

  document.querySelectorAll('.card, .goal-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
      const dy = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
      card.style.transform = `translateY(-5px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ── 8. TYPED ROLE ANIMATION ─────────────────────────────────── */
(function () {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const roles = [
    'Web Developer',
    'CSE Student',
    'UI Enthusiast',
    'Problem Solver',
    'Creative Coder',
  ];

  let ri = 0, ci = 0, deleting = false;

  function tick() {
    const word = roles[ri];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 52 : 95);
  }

  setTimeout(tick, 1000);
})();


/* ── 9. SMOOTH SCROLL (nav links) ────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
