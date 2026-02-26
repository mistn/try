/* ── Theme ── */
const html     = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const iconSun  = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');

const saved      = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initDark   = saved ? saved === 'dark' : prefersDark;
if (initDark) applyTheme('dark');

themeBtn.addEventListener('click', () => {
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

function applyTheme(t) {
  html.dataset.theme = t;
  document.querySelector('meta[name="theme-color"][media*="light"]').content =
    t === 'dark' ? '#000' : '#fff';
  iconSun.style.display  = t === 'dark'  ? 'block' : 'none';
  iconMoon.style.display = t === 'light' ? 'block' : 'none';
}

// Init icons (avoid flash before JS runs)
iconSun.style.display  = initDark ? 'block' : 'none';
iconMoon.style.display = initDark ? 'none'  : 'block';

/* ── Nav glass on scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('docked', window.scrollY > 20);
}, { passive: true });

/* ── Scroll-reveal with IntersectionObserver ── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.rev').forEach(el => revObs.observe(el));

/* ── Project card — radial cursor glow ── */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top)  + 'px');
  });
});
