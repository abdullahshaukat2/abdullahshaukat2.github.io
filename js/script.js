// ===== Theme toggle (day / night) =====
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
} else if (prefersDark) {
  root.setAttribute('data-theme', 'dark');
}
themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ===== Mobile nav =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Typewriter hero title =====
const typewriterEl = document.getElementById('typewriter');
const phrases = [
  'CLASS: COMPUTER SCIENCE',
  'TYPE: ML / DATA / RESEARCH',
  'STATUS: OPEN TO CO-OPS',
];
let phraseIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    charIdx++;
    typewriterEl.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIdx--;
    typewriterEl.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 70);
}
typeLoop();

// ===== Scroll reveal =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Project filter =====
const filterButtons = document.querySelectorAll('.filter');
const entries = document.querySelectorAll('.entry');
const noResults = document.getElementById('noResults');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.filter;
    filterButtons.forEach(b => b.classList.toggle('is-active', b === btn));
    let shown = 0;
    entries.forEach(entry => {
      const match = type === 'all' || entry.dataset.cat.split(' ').includes(type);
      entry.classList.toggle('is-hidden', !match);
      if (match) shown++;
    });
    noResults.hidden = shown > 0;
  });
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
