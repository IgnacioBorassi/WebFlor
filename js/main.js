// Separa el texto de [data-words] en palabras animables
document.querySelectorAll('[data-words]').forEach((el) => {
  el.innerHTML = el.textContent.trim().split(/\s+/)
    .map((w) => `<span class="w">${w}</span>`).join(' ');
});

// =========================================================
// Planificación: resumen (tarjetas) / cuadro
// =========================================================
const plan = document.getElementById('plan');
const P = planificacion;

// Íconos de las tarjetas del resumen
const svg = (d) => `<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const ICONOS = {
  check: svg('<circle cx="12" cy="12" r="10"/><path d="m8 12.5 2.5 2.5L16 9.5"/>'),
  foco: svg('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>'),
  lupa: svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M8.5 11h5M11 8.5v5"/>'),
};

// Separa la cita final "(CABA, 2024, p. 143)" del texto del contenido
const conCita = (txt) => {
  const m = txt.match(/^(.*?)\s*(\([^()]*\d{4}[^()]*\))\.?$/);
  return m ? `${esc(m[1])} <cite>${esc(m[2])}</cite>` : esc(txt);
};

// Recuadro con áreas y ejes (arriba de las dos vistas)
document.getElementById('planMeta').innerHTML = `
  <div><span class="plan-meta__label">Áreas</span>${P.areas.map((a) => `<span class="chip">${esc(a)}</span>`).join('')}</div>
  <div><span class="plan-meta__label">Ejes</span>${P.ejes.map((e) => `<span class="chip chip--soft">${esc(e)}</span>`).join('')}</div>`;

plan.innerHTML = `
  <div class="plan__view" data-view="cards">
    <div class="plan-hilo">
      <article class="plan-card plan-card--hilo">
        <h4>Hilo conductor</h4>
        <p>${esc(P.hiloConductor)}</p>
      </article>
      <span class="plan-flecha" aria-hidden="true"></span>
      <article class="plan-card plan-card--recorte">
        <h4>Recorte didáctico</h4>
        <p>${esc(P.recorte)}</p>
      </article>
    </div>

    <div class="plan-fila">
      <article class="plan-card">
        <h4 class="plan-card__titulo">${ICONOS.check} Objetivos</h4>
        <ol class="plan-objetivos">${P.objetivos.map((o, i) => `<li><span class="plan-card__num">${i + 1}</span><p>${esc(o)}</p></li>`).join('')}</ol>
      </article>
      <article class="plan-card plan-card--capacidades">
        <h4>Capacidades</h4>
        <ul class="plan-capacidades">${P.capacidades.map((c, i) => `
          <li>
            <div class="plan-capacidades__nombre"><span class="plan-capacidades__icono">${i === 0 ? ICONOS.foco : ICONOS.lupa}</span>${esc(c.nombre)}</div>
            <p>${esc(c.descripcion)}</p>
          </li>`).join('')}</ul>
      </article>
    </div>

    <article class="plan-card">
      <h4>Contenidos</h4>
      <ul class="plan-contenidos">${P.contenidos.map((c) => `<li>${conCita(c)}</li>`).join('')}</ul>
    </article>
  </div>

  <div class="plan__view" data-view="table" hidden>
    <div class="plan-table-wrap">
      <table class="plan-table">
        <caption>
          <span><strong>Áreas:</strong> ${esc(P.areas.join(', '))}</span>
          <span><strong>Ejes:</strong> ${esc(P.ejes.join('; '))}</span>
        </caption>
        <tbody>
          <tr><th scope="row">Contenidos</th><td><ul>${P.contenidos.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></td></tr>
          <tr><th scope="row">Capacidades</th><td><ul class="plan-table__capacidades">${P.capacidades.map((c) => `<li><strong>${esc(c.nombre)}:</strong> ${esc(c.descripcion)}</li>`).join('')}</ul></td></tr>
          <tr><th scope="row">Objetivos</th><td><ol>${P.objetivos.map((o) => `<li>${esc(o)}</li>`).join('')}</ol></td></tr>
          <tr><th scope="row">Hilo Conductor</th><td>${esc(P.hiloConductor)}</td></tr>
          <tr><th scope="row">Recorte Didáctico</th><td>${esc(P.recorte)}</td></tr>
        </tbody>
      </table>
    </div>
  </div>`;

document.querySelectorAll('.switch__btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.switch__btn').forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on);
    });
    plan.querySelectorAll('.plan__view').forEach((v) => { v.hidden = v.dataset.view !== btn.dataset.view; });
  });
});

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
    <button class="path__dot" style="--c:${colorFase(t.fase)}; grid-column: ${i + 1}" data-i="${i}" aria-label="Parada ${i + 1}: ${esc(t.titulo || t.fase)}">${i + 1}</button>`).join('')}`;

const dots = [...path.querySelectorAll('.path__dot')];
const phaseEls = [...path.querySelectorAll('.path__phase')];
const fill = path.querySelector('.path__fill');
let activePoint = -1;

// Todas las paradas van apiladas en la misma tarjeta y solo se ve la activa.
// La tarjeta toma el alto de la parada activa con una transición suave.
pathCard.innerHTML = trayectoria.map((t, i) => `
  <div class="path-card__parada" style="--c:${colorFase(t.fase)}" aria-hidden="true">
    <div class="path-card__top"><span class="pill">${esc(t.fase)}</span><small>Parada ${i + 1} de ${n}</small></div>
    ${t.titulo ? `<h4>${esc(t.titulo)}</h4>` : ''}
    <p>${esc(t.texto)}</p>
  </div>`).join('');
const paradasCard = [...pathCard.querySelectorAll('.path-card__parada')];

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
  paradasCard.forEach((el, j) => {
    el.classList.toggle('is-active', j === i);
    el.setAttribute('aria-hidden', j !== i);
  });
  ajustarAltoCard();
}

function ajustarAltoCard() {
  const activa = paradasCard[activePoint];
  if (!activa) return;
  const cs = getComputedStyle(pathCard);
  pathCard.style.height = `${activa.offsetHeight + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom)}px`;
}

// Posición de scroll en la que la trayectoria muestra la clase i
const pointScrollTop = (i) => pathScene.offsetTop + (pathScene.offsetHeight - innerHeight) * (0.02 + 0.96 * (i + 0.5) / n);

// Click en un punto: scrollea hasta esa clase
dots.forEach((d, i) => d.addEventListener('click', () => {
  scrollTo({ top: pointScrollTop(i), behavior: 'smooth' });
}));

function sizePath() {
  pathScene.style.height = `${innerHeight + n * innerHeight * 0.5}px`;
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
addEventListener('resize', () => { sizePath(); ajustarAltoCard(); requestUpdate(); });
sizePath();
setPoint(0);


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
