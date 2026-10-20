/* ─── NARA CREATIVE — app.js (clean rewrite) ─── */

/* ══════════════════════════════
   IMAGE PATH (lokal setelah download)
══════════════════════════════ */
const IMG = 'assets/reference.png';

/* ══════════════════════════════
   1. CUSTOM CURSOR
══════════════════════════════ */
const dot  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

if (dot && ring && window.matchMedia('(hover:hover)').matches) {
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx, ry = my;
  let ticking = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(moveRing);
    }
  });

  function moveRing() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    if (Math.abs(mx - rx) > 0.3 || Math.abs(my - ry) > 0.3) {
      requestAnimationFrame(moveRing);
    } else {
      ticking = false;
    }
  }

  document.addEventListener('mouseover', e => {
    const hoverable = e.target.closest('a, button, .work-card, .filter-btn, .service summary, .lb-nav');
    dot.classList.toggle('big',  !!hoverable);
    ring.classList.toggle('big', !!hoverable);
  });
}

/* ══════════════════════════════
   2. SCROLL PROGRESS BAR
══════════════════════════════ */
const bar = document.getElementById('scroll-progress-bar');
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  if (bar && h > 0) bar.style.width = (window.scrollY / h * 100).toFixed(2) + '%';
}, { passive: true });

/* ══════════════════════════════
   3. HEADER — auto-hide
══════════════════════════════ */
const header = document.getElementById('site-header');
let prevY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 24);
  if (y > prevY + 10 && y > 250) header.classList.add('hidden');
  else if (y < prevY - 6)        header.classList.remove('hidden');
  prevY = y;
}, { passive: true });

/* ══════════════════════════════
   4. MOBILE NAV
══════════════════════════════ */
const menuBtn   = document.getElementById('menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

function openNav()  {
  mobileNav.classList.add('open');
  menuBtn.setAttribute('aria-expanded', 'true');
  menuBtn.setAttribute('aria-label', 'Tutup menu');
  document.body.style.overflow = 'hidden';
}
function closeNav() {
  mobileNav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Buka menu');
  document.body.style.overflow = '';
}

menuBtn.addEventListener('click', () =>
  mobileNav.classList.contains('open') ? closeNav() : openNav()
);
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
document.addEventListener('click', e => {
  if (mobileNav.classList.contains('open') &&
      !mobileNav.contains(e.target) &&
      !menuBtn.contains(e.target)) closeNav();
});

/* ══════════════════════════════
   5. HERO ENTRANCE
══════════════════════════════ */
// Small delay so CSS transitions are registered
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.querySelector('.hero').classList.add('ready');
  });
});

/* ══════════════════════════════
   6. PARALLAX — hero photo
══════════════════════════════ */
const heroBg   = document.querySelector('.hero-bg');
const heroSec  = document.querySelector('.hero');
if (heroBg && heroSec) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < heroSec.offsetHeight * 1.3) {
      heroBg.style.transform = `translateY(${window.scrollY * 0.22}px)`;
    }
  }, { passive: true });
}

/* ══════════════════════════════
   7. SCROLL-REVEAL (IntersectionObserver)
══════════════════════════════ */
const io = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) {
      target.classList.add('in');
      io.unobserve(target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.reveal, .stagger').forEach(el => io.observe(el));

/* ══════════════════════════════
   8. SERVICES — accordion
══════════════════════════════ */
function makeSvg(box, alt) {
  return `<svg viewBox="${box}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${alt}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <image href="${IMG}" xlink:href="${IMG}" width="900" height="1600"/>
  </svg>`;
}

const SERVICES = [
  {
    num: '01', title: 'Creative Direction',
    short: 'Konsep, narasi, moodboard, dan strategi visual.',
    box: '115 612 215 70', alt: 'Still life keramik dalam cahaya natural',
    detail: 'Kami menerjemahkan karakter brand menjadi arah kreatif yang utuh: dari cerita, referensi visual, hingga art direction yang menjadi panduan produksi.'
  },
  {
    num: '02', title: 'Photography',
    short: 'Product, lifestyle, editorial, dan campaign imagery.',
    box: '115 695 215 76', alt: 'Detail lifestyle dengan cahaya lembut',
    detail: 'Fotografi yang menangkap tekstur, gestur, dan suasana. Pendekatan editorial dan dokumenter untuk produk, manusia, serta ruang yang punya cerita.'
  },
  {
    num: '03', title: 'Videography & Film',
    short: 'Brand film, campaign, BTS, dan short-form content.',
    box: '115 785 215 74', alt: 'Potret sinematik dengan bayangan alami',
    detail: 'Cerita dalam gerak. Kami menyusun narasi film, merekam momen yang autentik, dan menyelesaikannya dengan ritme serta warna yang sesuai identitas brand.'
  },
  {
    num: '04', title: 'Visual Content Production',
    short: 'Konten untuk social media, website, dan kampanye.',
    box: '115 873 215 78', alt: 'Botol produk dengan latar tekstur batu',
    detail: 'Dukungan produksi visual dari perencanaan hingga final delivery. Foto dan video dikurasi untuk kebutuhan kanal, format, dan perjalanan cerita brand Anda.'
  }
];

const svcList = document.getElementById('service-list');
svcList.innerHTML = SERVICES.map(s => `
  <details class="service reveal">
    <summary>
      <div class="svc-thumb">${makeSvg(s.box, s.alt)}</div>
      <div class="svc-text">
        <small>${s.num}</small>
        <h3>${s.title}</h3>
      </div>
      <p class="svc-short">${s.short}</p>
      <span class="svc-arrow">→</span>
    </summary>
    <p class="svc-detail">${s.detail}</p>
  </details>
`).join('');

// Observe new items
svcList.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Accordion: only one open
svcList.addEventListener('toggle', e => {
  if (e.target.tagName === 'DETAILS' && e.target.open) {
    svcList.querySelectorAll('details[open]').forEach(d => {
      if (d !== e.target) d.open = false;
    });
  }
}, true);

/* ══════════════════════════════
   9. GALLERY — render & filter
══════════════════════════════ */
const WORKS = [
  { title: 'The everyday ritual',    cat: 'F&B',      box: '116 1015 328 159', alt: 'Gelas kopi dan air di meja dengan cahaya matahari',    desc: 'Ritual sederhana, cerita yang dekat. Eksplorasi cahaya alami, refleksi kaca, dan kehangatan momen sehari-hari untuk brand food & beverage.' },
  { title: 'A quieter kind of beauty', cat: 'Beauty',  box: '458 1015 326 159', alt: 'Potret natural perempuan dalam cahaya hangat',          desc: 'Keindahan yang terasa manusiawi. Potret dekat dan tekstur kulit alami menjadi bahasa visual untuk cerita beauty & wellness yang jujur.' },
  { title: 'Objects with meaning',   cat: 'Beauty',   box: '116 1219 328 133', alt: 'Produk kecantikan di atas batu bertekstur',             desc: 'Studi objek, tekstur, dan cahaya. Pendekatan still life yang menghadirkan produk dalam konteks hangat, tenang, dan penuh karakter.' },
  { title: 'Somewhere, slowly',      cat: 'Lifestyle', box: '459 1219 325 133', alt: 'Perempuan berjalan di jalanan sepi sore hari',          desc: 'Visual perjalanan yang tenang. Cahaya sore, ritme lambat, dan momen diam yang berbicara untuk brand lifestyle dan wellness.' },
  { title: 'The texture of care',    cat: 'Beauty',   box: '116 1395 328 145', alt: 'Rangkaian produk skincare di permukaan kayu',           desc: 'Tekstur bahan alami bertemu estetika produk. Visual minimalis yang berbicara soal keaslian dan ketelitian dalam perawatan diri.' },
  { title: 'Worn with intention',    cat: 'Fashion',  box: '459 1395 325 145', alt: 'Detail pakaian dengan tekstur linen natural',           desc: 'Mode yang bercerita lewat detail. Lipatan kain, siluet, dan cahaya yang jatuh alami — semua menjadi narasi brand fashion yang berkelanjutan.' }
];

const grid = document.getElementById('work-grid');

// Build cards
grid.innerHTML = WORKS.map((w, i) => `
  <div class="work-card" data-cat="${w.cat}" data-i="${i}" tabindex="0" role="button" aria-label="Lihat: ${w.title}">
    <svg viewBox="${w.box}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${w.alt}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <image href="${IMG}" xlink:href="${IMG}" width="900" height="1600"/>
    </svg>
    <div class="work-caption">
      <strong>${w.title}</strong>
      <span class="cat">${w.cat}</span>
      <p>${w.desc}</p>
    </div>
  </div>
`).join('');

// Events
grid.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', () => openLightbox(+card.dataset.i));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(+card.dataset.i); }
  });
});

// Observe grid
io.observe(grid);

// Filter
let activeCat = 'all';
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    activeCat = btn.dataset.cat;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    grid.querySelectorAll('.work-card').forEach(card => {
      const show = activeCat === 'all' || card.dataset.cat === activeCat;
      if (show) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.96)';
        requestAnimationFrame(() => {
          card.style.transition = 'opacity .4s, transform .4s';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        });
      } else {
        card.style.transition = 'opacity .3s, transform .3s';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        const onEnd = () => {
          card.style.display = 'none';
          card.removeEventListener('transitionend', onEnd);
        };
        card.addEventListener('transitionend', onEnd);
      }
    });
  });
});

/* ══════════════════════════════
   10. LIGHTBOX
══════════════════════════════ */
const lb       = document.getElementById('lightbox');
const lbImg    = document.getElementById('lightbox-img');
const lbInfo   = document.getElementById('lightbox-info');
const lbClose  = document.getElementById('lightbox-close');
const lbPrev   = document.getElementById('lightbox-prev');
const lbNext   = document.getElementById('lightbox-next');
let lbIdx = 0;

function visibleWorks() {
  return WORKS.filter((_, i) => {
    const c = grid.querySelector(`[data-i="${i}"]`);
    return c && c.style.display !== 'none';
  });
}

function openLightbox(i) {
  lbIdx = i;
  const w = WORKS[i];
  lbImg.innerHTML = `
    <svg viewBox="${w.box}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${w.alt}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <image href="${IMG}" xlink:href="${IMG}" width="900" height="1600"/>
    </svg>`;
  lbInfo.innerHTML = `<strong>${w.title}</strong><p>${w.desc}</p>`;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  lbClose.focus();
}
function closeLightbox() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}
function navLightbox(dir) {
  const vis = visibleWorks();
  const cur = vis.findIndex((_, j) => WORKS.indexOf(vis[j]) === lbIdx);
  const next = vis[(cur + dir + vis.length) % vis.length];
  openLightbox(WORKS.indexOf(next));
}

lbClose.addEventListener('click', closeLightbox);
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
lbPrev.addEventListener('click', () => navLightbox(-1));
lbNext.addEventListener('click', () => navLightbox(1));
lbPrev.addEventListener('keydown', e => { if (e.key === 'Enter') navLightbox(-1); });
lbNext.addEventListener('keydown', e => { if (e.key === 'Enter') navLightbox(1); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   navLightbox(-1);
  if (e.key === 'ArrowRight')  navLightbox(1);
});

/* ══════════════════════════════
   11. BRIEF FORM
══════════════════════════════ */
document.getElementById('brief-form').addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const brand    = fd.get('brand')    || '—';
  const service  = fd.get('service')  || '—';
  const story    = fd.get('story')    || '—';
  const timeline = fd.get('timeline') || '—';
  const date     = new Date().toLocaleDateString('id-ID', { day:'2-digit', month:'long', year:'numeric' });

  const text = `NARA VISUAL CREATIVE STUDIO
Project Brief — ${date}
${'━'.repeat(44)}

Nama Brand     : ${brand}
Layanan        : ${service}
Timeline       : ${timeline}

Cerita Singkat
${'─'.repeat(16)}
${story}

${'━'.repeat(44)}
Dokumen ini disiapkan secara lokal.
Kirimkan kepada tim NARA melalui kanal kontak Anda.

NARA — Visual Stories for Meaningful Brands
`;

  const a   = document.createElement('a');
  a.href    = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  a.download = `NARA-Brief-${brand.replace(/\s+/g,'-')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
});

/* ══════════════════════════════
   12. BACK TO TOP
══════════════════════════════ */
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 450);
}, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ══════════════════════════════
   13. SMOOTH ANCHOR SCROLL
══════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const target = document.querySelector(id);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
