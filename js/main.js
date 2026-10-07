// Separa el texto de [data-words] en palabras animables
document.querySelectorAll('[data-words]').forEach((el) => {
  el.innerHTML = el.textContent.trim().split(/\s+/)
    .map((w) => `<span class="w">${w}</span>`).join(' ');
});

// =========================================================
// Planificación: cuadro igual al documento original
// =========================================================
const plan = document.getElementById('plan');
const P = planificacion;

plan.innerHTML = `
    <div class="plan-table-wrap">
      <table class="plan-table">
        <caption>
          <span><strong>Áreas:</strong> ${esc(P.areas.join(', '))}</span>
          <span><strong>Ejes:</strong> ${esc(P.ejes.join('; '))}</span>
        </caption>
        <tbody>
          <tr><th scope="row">Contenidos</th><td><ul>${P.contenidos.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></td></tr>
          <tr><th scope="row">Capacidades</th><td>${esc(P.capacidades.join(' y '))}</td></tr>
          <tr><th scope="row">Objetivos</th><td><ol>${P.objetivos.map((o) => `<li>${esc(o)}</li>`).join('')}</ol></td></tr>
          <tr><th scope="row">Hilo Conductor</th><td>${esc(P.hiloConductor)}</td></tr>
          <tr><th scope="row">Recorte Didáctico</th><td>${esc(P.recorte)}</td></tr>
        </tbody>
      </table>
    </div>`;

// =========================================================
// Trayectoria: puntos agrupados por fase
// =========================================================
const path = document.getElementById('path');
const pathCard = document.getElementById('pathCard');
const pathScene = document.getElementById('trayectoria');
const n = trayectoria.length;

path.style.setProperty('--n', n);
path.innerHTML = `
  ${fases.map((f) => {
    const count = trayectoria.filter((t) => t.fase === f).length;
    return `<div class="path__phase" style="--c:${colorFase(f)}; grid-column: span ${count}" data-fase="${esc(f)}">${esc(f)}</div>`;
  }).join('')}
  <div class="path__rail"><div class="path__fill"></div></div>
  <div class="path__legend">
    ${fases.map((f) => `<span style="--c:${colorFase(f)}">${esc(f)}</span>`).join('')}
  </div>
  ${trayectoria.map((t, i) => `
    <button class="path__dot" style="--c:${colorFase(t.fase)}; grid-column: ${i + 1}" data-i="${i}" aria-label="Clase ${i + 1}: ${esc(t.tema)}">${i + 1}</button>`).join('')}`;

const dots = [...path.querySelectorAll('.path__dot')];
const phaseEls = [...path.querySelectorAll('.path__phase')];
const fill = path.querySelector('.path__fill');
let activePoint = -1;

function setPoint(i) {
  if (i === activePoint) return;
  activePoint = i;
  const t = trayectoria[i];
  dots.forEach((d, j) => {
    d.classList.toggle('is-done', j <= i);
    d.classList.toggle('is-active', j === i);
  });
  phaseEls.forEach((el) => el.classList.toggle('is-active', el.dataset.fase === t.fase));
  fill.style.transform = `scaleX(${n > 1 ? i / (n - 1) : 1})`;
  pathCard.style.setProperty('--c', colorFase(t.fase));
  pathCard.href = `clase.html?n=${i + 1}`;
  pathCard.innerHTML = `
    <div class="path-card__top"><span class="pill">${esc(t.fase)}</span><small>Clase ${i + 1} de ${n}</small></div>
    <h4>${esc(t.tema)}</h4>
    <p>${esc(t.resumen)}</p>
    <span class="path-card__more">Ver la clase <span aria-hidden="true">→</span></span>`;
  pathCard.classList.remove('is-in');
  void pathCard.offsetWidth; // reinicia la animación
  pathCard.classList.add('is-in');
}

// Posición de scroll en la que la trayectoria muestra la clase i
const pointScrollTop = (i) => pathScene.offsetTop + (pathScene.offsetHeight - innerHeight) * (0.02 + 0.96 * (i + 0.5) / n);

// Click en un punto: scrollea hasta esa clase
dots.forEach((d, i) => d.addEventListener('click', () => {
  scrollTo({ top: pointScrollTop(i), behavior: 'smooth' });
}));

function sizePath() {
  pathScene.style.height = `${innerHeight + n * innerHeight * 0.3}px`;
}

// =========================================================
// Animación de cada escena según su progreso (p: 0..1)
// =========================================================
const scenes = {
  hero(scene, p) {
    const out = ease(range(p, 0.2, 0.9));
    const hero = scene.querySelector('[data-hero]');
    hero.style.opacity = 1 - out;
    hero.style.transform = `translateY(${-out * 60}px) scale(${1 - out * 0.15})`;
    scene.querySelector('[data-blobs]').style.opacity = 1 - out;
    scene.querySelector('[data-hint]').style.opacity = 1 - range(p, 0, 0.12);
  },

  words(scene, p) {
    const words = scene.querySelectorAll('.w');
    const t = range(p, 0.1, 0.8) * words.length;
    words.forEach((w, i) => { w.style.opacity = 0.12 + 0.88 * clamp(t - i); });
  },

  path(scene, p) {
    setPoint(Math.min(n - 1, Math.floor(range(p, 0.02, 0.98) * n)));
  },
};

const sceneEls = [...document.querySelectorAll('[data-scene]')];

// Tarjetas apiladas: la de atrás se achica cuando la tapa la siguiente
const stackCards = [...document.querySelectorAll('.stack__card')];
function updateStack() {
  stackCards.forEach((card, i) => {
    const next = stackCards[i + 1];
    if (!next) return;
    const covered = clamp(1 - (next.getBoundingClientRect().top - card.getBoundingClientRect().top) / innerHeight);
    card.style.transform = `scale(${1 - covered * 0.08})`;
    card.style.filter = `brightness(${1 - covered * 0.3})`;
  });
}

// Fotos con leve efecto de profundidad
const parallaxEls = [...document.querySelectorAll('[data-parallax]')];
function updateParallax() {
  parallaxEls.forEach((el) => {
    const r = el.parentElement.getBoundingClientRect();
    const t = clamp((r.top + r.height / 2 - innerHeight / 2) / innerHeight, -1, 1);
    el.style.transform = `translateY(${t * 40}px)`;
  });
}

// =========================================================
// Menú
// =========================================================
const progress = document.getElementById('progress');
const bar = document.querySelector('.bar');
const dark = document.querySelector('.dark');
const menu = document.getElementById('menu');
const menuToggle = document.getElementById('menuToggle');

menuToggle.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  menu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

const menuLinks = [...menu.querySelectorAll('a')];
const chapterObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      menuLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${e.target.id}`));
    }
  }),
  { rootMargin: '-50% 0px -50% 0px' }
);
document.querySelectorAll('.chapter').forEach((c) => chapterObserver.observe(c));

// =========================================================
// Loop principal
// =========================================================
let ticking = false;
function update() {
  ticking = false;
  const vh = innerHeight;

  sceneEls.forEach((scene) => {
    const rect = scene.getBoundingClientRect();
    if (rect.bottom < -vh || rect.top > vh * 2) return; // fuera de pantalla
    const total = scene.offsetHeight - vh;
    const p = total > 0 ? clamp(-rect.top / total) : 0;
    scenes[scene.dataset.scene]?.(scene, p);
  });

  updateStack();
  updateParallax();

  const max = document.documentElement.scrollHeight - vh;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  bar.classList.toggle('is-dark', dark.getBoundingClientRect().top < 40);
}

function requestUpdate() {
  if (!ticking) { ticking = true; requestAnimationFrame(update); }
}

addEventListener('scroll', requestUpdate, { passive: true });
addEventListener('resize', () => { sizePath(); requestUpdate(); });
sizePath();
setPoint(0);

// Al volver desde una clase (index.html#clase-3) se retoma la trayectoria en esa clase
const volverA = location.hash.match(/^#clase-(\d+)$/);
if (volverA) {
  const i = clamp(Number(volverA[1]) - 1, 0, n - 1);
  scrollTo({ top: pointScrollTop(i), behavior: 'instant' });
}

update();
observarFades();

// =========================================================
// 1er ciclo: mensajes chistosos
// =========================================================
const wipBtn = document.getElementById('wipBtn');
const wipMsg = document.getElementById('wipMsg');
const wipCone = document.getElementById('wipCone');
let wipIndex = 0;

wipBtn.addEventListener('click', () => {
  wipIndex = (wipIndex + 1) % mensajesPrimerCiclo.length;
  wipMsg.classList.add('is-changing');
  wipCone.classList.remove('is-wobbling');
  void wipCone.offsetWidth;
  wipCone.classList.add('is-wobbling');
  setTimeout(() => {
    wipMsg.textContent = mensajesPrimerCiclo[wipIndex];
    wipMsg.classList.remove('is-changing');
  }, 250);
});
wipCone.addEventListener('animationend', () => wipCone.classList.remove('is-wobbling'));

// =========================================================
// Ver CV: abre el PDF en un visor con botón de descarga.
// En celulares (donde los PDF no se ven bien embebidos) el enlace
// abre el PDF directo en otra pestaña.
// =========================================================
const cvBtn = document.getElementById('cvBtn');
const cvModal = document.getElementById('cvModal');
const cvFrame = document.getElementById('cvFrame');
if (cvBtn && cvModal.showModal && !matchMedia('(pointer: coarse)').matches) {
  cvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!cvFrame.src) cvFrame.src = cvBtn.getAttribute('href') + '#navpanes=0&view=FitH';
    cvModal.showModal();
  });
  document.getElementById('cvClose').addEventListener('click', () => cvModal.close());
  // Cerrar al hacer clic afuera del visor
  cvModal.addEventListener('click', (e) => { if (e.target === cvModal) cvModal.close(); });
}
