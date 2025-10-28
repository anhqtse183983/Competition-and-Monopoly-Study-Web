// Toggle mobile nav
const navToggle = document.getElementById('navToggle');
const topNav = document.getElementById('topNav');

navToggle?.addEventListener('click', () => {
  topNav.classList.toggle('open');
  navToggle.classList.toggle('open');
});

// Smooth scroll for in-page links
document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;
  const href = a.getAttribute('href');
  if (href && href.startsWith('#')) {
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
    // close mobile nav after click
    if (topNav.classList.contains('open')) {
      topNav.classList.remove('open');
      navToggle.classList.remove('open');
    }
  }
});

// Highlight active nav item on scroll
const navLinks = Array.from(document.querySelectorAll('.nav-list a'));
const sections = navLinks.map(a => {
  const id = a.getAttribute('href')?.slice(1);
  return id ? document.getElementById(id) : null;
});

function onScroll() {
  const pos = window.scrollY + window.innerHeight * 0.25;
  let idx = -1;
  sections.forEach((s, i) => {
    if (!s) return;
    if (s.offsetTop <= pos) idx = i;
  });
  navLinks.forEach((lnk, i) => lnk.classList.toggle('active', i === idx));
}
window.addEventListener('scroll', onScroll);
onScroll();
