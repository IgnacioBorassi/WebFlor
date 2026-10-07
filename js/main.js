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
            <div class="plan-capacidades__nombre"><img class="capacidad-icono" src="${esc(c.icono)}" alt="" width="58" height="50">${esc(c.nombre)}</div>
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
          <tr><th scope="row">Capacidades</th><td><ul class="plan-table__capacidades">${P.capacidades.map((c) => `<li><img class="capacidad-icono" src="${esc(c.icono)}" alt="" width="58" height="50"><span><strong>${esc(c.nombre)}:</strong> ${esc(c.descripcion)}</span></li>`).join('')}</ul></td></tr>
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
// Desempeños: ruta con un hito por parada. Al lado de cada hito va el título;
// al tocarlo se despliega la descripción.
// =========================================================
const rutaEl = document.getElementById('ruta');
const n = trayectoria.length;

// Hitos: pin de mapa en cada parada y bandera de llegada en la última
const HITO_PIN = '<svg viewBox="0 0 30 40" aria-hidden="true"><path class="hito__forma" d="M15 1C7.3 1 1 7.1 1 14.7 1 25 15 39 15 39s14-14 14-24.3C29 7.1 22.7 1 15 1z"/><circle cx="15" cy="14.5" r="5.5" fill="#fff"/></svg>';
const HITO_BANDERA = '<svg viewBox="0 0 30 40" aria-hidden="true"><path d="M5 2v37" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path class="hito__forma" d="M6 3h21v15H6z"/><path fill="#fff" d="M6 3h5.25v5H6zm10.5 0h5.25v5H16.5zM11.25 8h5.25v5h-5.25zm10.5 0H27v5h-5.25zM6 13h5.25v5H6zm10.5 0h5.25v5H16.5z"/></svg>';
// Huellitas (dos pisadas) para todo lo que tiene que ver con las huellas de aprendizaje
const HUELLITAS = '<svg class="huellitas" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor"><ellipse cx="7.2" cy="9.2" rx="2.6" ry="4" transform="rotate(-10 7.2 9.2)"/><ellipse cx="6.4" cy="15.6" rx="1.9" ry="1.6" transform="rotate(-10 6.4 15.6)"/><ellipse cx="16.6" cy="7" rx="2.6" ry="4" transform="rotate(10 16.6 7)"/><ellipse cx="17.6" cy="13.4" rx="1.9" ry="1.6" transform="rotate(10 17.6 13.4)"/></svg>';
const FLECHA = '<svg class="ruta__flecha" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

rutaEl.innerHTML = `
  <svg class="ruta__camino" aria-hidden="true"></svg>
  <ol class="ruta__paradas">
    ${trayectoria.map((t, i) => `
      <li class="ruta__parada ruta__parada--${i % 2 ? 'der' : 'izq'} fade" style="--c:${colorFase(t.fase)}">
        <button class="ruta__boton" type="button" aria-expanded="false" aria-controls="parada-${i}">
          <span class="ruta__hito">${i === n - 1 ? HITO_BANDERA : HITO_PIN}</span>
          <span class="ruta__textos">
            <span class="ruta__fase">${esc(t.fase)}</span>
            <span class="ruta__titulo">${esc(t.titulo)}</span>
            ${FLECHA}
          </span>
        </button>
        <div class="ruta__desc" id="parada-${i}" hidden>
          <p>${esc(t.texto)}</p>
          ${t.huella ? `<a class="ruta__huella" href="#huella-${t.huella}">${HUELLITAS} Ver huella de aprendizaje</a>` : ''}
        </div>
      </li>`).join('')}
  </ol>`;

const caminoSvg = rutaEl.querySelector('.ruta__camino');
const hitosEls = [...rutaEl.querySelectorAll('.ruta__hito')];
let hitosY = [];

// Tocar una parada despliega u oculta su descripción
rutaEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.ruta__boton');
  if (!btn) return;
  const abrir = btn.getAttribute('aria-expanded') !== 'true';
  btn.setAttribute('aria-expanded', abrir);
  document.getElementById(btn.getAttribute('aria-controls')).hidden = !abrir;
  dibujarCamino();
});

// Dibuja el camino que baja serpenteando por los hitos (medidos sin transformaciones)
function dibujarCamino() {
  const w = rutaEl.offsetWidth;
  const h = rutaEl.offsetHeight;
  if (!w || !h) return;
  const pts = hitosEls.map((hito) => {
    let y = hito.offsetHeight * 0.95; // la punta del pin
    let x = hito.offsetWidth / 2;
    for (let el = hito; el && el !== rutaEl; el = el.offsetParent) { y += el.offsetTop; x += el.offsetLeft; }
    return { x, y };
  });
  hitosY = pts.map((p) => p.y);
  const xc = pts[0].x;
  // En zigzag (pantallas anchas) la ruta se curva hacia el lado de cada parada
  const zigzag = matchMedia('(min-width: 761px)').matches;
  const amp = zigzag ? 26 : Math.min(14, w * 0.03);
  const todos = [{ x: xc, y: 0 }, ...pts.map((p, i) => ({ x: xc + (i % 2 ? amp : -amp), y: p.y })), { x: xc, y: h }];
  const d = todos.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const a = todos[i - 1];
    const my = (a.y + pt.y) / 2;
    return `${acc} C ${a.x} ${my}, ${pt.x} ${my}, ${pt.x} ${pt.y}`;
  }, '');
  caminoSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  caminoSvg.innerHTML = `
    <defs>
      <mask id="caminoRecorrido" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}">
        <rect class="ruta__avance" x="0" y="0" width="${w}" height="0" fill="#fff"/>
      </mask>
    </defs>
    <path d="${d}" class="camino__asfalto camino__asfalto--pendiente"/>
    <path d="${d}" class="camino__linea camino__linea--pendiente"/>
    <g mask="url(#caminoRecorrido)">
      <path d="${d}" class="camino__asfalto"/>
      <path d="${d}" class="camino__linea"/>
    </g>`;
  // Cada hito se corre un poco para quedar apoyado sobre la curva
  hitosEls.forEach((hito, i) => { hito.style.transform = `translateX(${todos[i + 1].x - xc}px)`; });
  actualizarCamino();
}

// =========================================================
// Huellas de aprendizaje: cada etapa con sus momentos (texto, preguntas y fotos)
// =========================================================
const fotoHuella = (f, clase = '') => `
  <button class="huella__foto ${clase}" type="button" data-src="${esc(f.src)}" data-alt="${esc(f.alt)}" aria-label="Ampliar: ${esc(f.alt)}">
    <img src="${esc(f.src)}" alt="${esc(f.alt)}" loading="lazy">
  </button>`;

const momentoHTML = (m) => `
  <li class="momento">
    ${m.titulo ? `<h5 class="momento__titulo">${esc(m.titulo)}</h5>` : ''}
    ${(m.texto || []).map((t) => `<p>${esc(t)}</p>`).join('')}
    ${m.destacado ? `<blockquote class="momento__destacado">${esc(m.destacado)}</blockquote>` : ''}
    ${m.textoFinal ? `<p>${esc(m.textoFinal)}</p>` : ''}
    ${m.preguntas ? `<ul class="momento__preguntas">${m.preguntas.map((q) => `<li>${esc(q)}</li>`).join('')}</ul>` : ''}
    ${m.fotos ? `<div class="momento__fotos${m.grande ? ' momento__fotos--grande' : ''}">${m.fotos.map((f) => fotoHuella(f)).join('')}</div>` : ''}
    ${m.pie ? `<p class="momento__pie">${esc(m.pie)}</p>` : ''}
    ${m.pasos ? `<div class="momento__pasos">${m.pasos.map((p, k) => `
      <div class="paso">
        <span class="paso__nombre"><span>${k + 1}</span>${esc(p.nombre)}</span>
        ${fotoHuella(p.foto)}
        <p>${esc(p.texto)}</p>
      </div>`).join('')}</div>` : ''}
  </li>`;

// Cada huella arranca cerrada: solo se ve el encabezado y al tocarlo se despliega
const cantFotos = (h) => h.momentos.reduce((n, m) => n + (m.fotos?.length || 0) + (m.pasos?.length || 0), 0);
document.getElementById('huellasLista').innerHTML = huellas.map((h) => `
  <article class="huella fade" id="huella-${esc(h.id)}" style="--c:${colorFase(h.fase)}">
    <button class="huella__head" type="button" aria-expanded="false" aria-controls="huella-cuerpo-${esc(h.id)}">
      <span class="huella__icono">${HUELLITAS}</span>
      <span class="huella__textos">
        <span class="huella__fase">${esc(h.fase)}</span>
        <span class="huella__titulo">${esc(h.titulo)}</span>
        ${h.pendiente ? '' : `<span class="huella__resumen">${h.momentos.length} momentos · ${cantFotos(h)} fotos</span>`}
      </span>
      ${FLECHA}
    </button>
    <div class="huella__cuerpo" id="huella-cuerpo-${esc(h.id)}" hidden>
      ${h.pendiente
        ? `<div class="huella__pendiente">${HUELLITAS}<span>Esta huella todavía no está cargada</span></div>`
        : `<ol class="huella__momentos">${h.momentos.map(momentoHTML).join('')}</ol>`}
    </div>
  </article>`).join('');

function abrirHuella(art, abrir = true) {
  art.querySelector('.huella__head').setAttribute('aria-expanded', abrir);
  art.querySelector('.huella__cuerpo').hidden = !abrir;
  art.classList.toggle('is-open', abrir);
}
document.getElementById('huellasLista').addEventListener('click', (e) => {
  const head = e.target.closest('.huella__head');
  if (head) abrirHuella(head.closest('.huella'), head.getAttribute('aria-expanded') !== 'true');
});
// "Ver huella" desde una parada de la ruta: abre esa huella antes de bajar hasta ella
rutaEl.addEventListener('click', (e) => {
  const link = e.target.closest('.ruta__huella');
  if (link) abrirHuella(document.querySelector(link.getAttribute('href')));
});

// Visor: al tocar una foto se amplía; con las flechas se recorren las de la misma huella
const visor = document.createElement('dialog');
visor.className = 'visor';
visor.setAttribute('aria-label', 'Foto ampliada');
visor.innerHTML = `
  <button class="visor__cerrar" type="button" aria-label="Cerrar">×</button>
  <button class="visor__nav visor__nav--prev" type="button" aria-label="Foto anterior">‹</button>
  <figure><img alt=""><figcaption></figcaption></figure>
  <button class="visor__nav visor__nav--next" type="button" aria-label="Foto siguiente">›</button>`;
document.body.appendChild(visor);
let visorFotos = [];
let visorI = 0;
function mostrarFoto(i) {
  visorI = (i + visorFotos.length) % visorFotos.length;
  const b = visorFotos[visorI];
  visor.querySelector('img').src = b.dataset.src;
  visor.querySelector('img').alt = b.dataset.alt;
  visor.querySelector('figcaption').textContent = b.dataset.alt;
  visor.classList.toggle('visor--una', visorFotos.length < 2);
}
document.getElementById('huellasLista').addEventListener('click', (e) => {
  const b = e.target.closest('.huella__foto');
  if (!b) return;
  visorFotos = [...b.closest('.huella').querySelectorAll('.huella__foto')];
  mostrarFoto(visorFotos.indexOf(b));
  visor.showModal();
});
visor.querySelector('.visor__cerrar').addEventListener('click', () => visor.close());
visor.querySelector('.visor__nav--prev').addEventListener('click', () => mostrarFoto(visorI - 1));
visor.querySelector('.visor__nav--next').addEventListener('click', () => mostrarFoto(visorI + 1));
visor.addEventListener('click', (e) => { if (e.target === visor) visor.close(); });
visor.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') mostrarFoto(visorI - 1);
  if (e.key === 'ArrowRight') mostrarFoto(visorI + 1);
});

// El camino se pinta hasta la altura de 2/3 de la pantalla, y los hitos alcanzados se encienden
function actualizarCamino() {
  const avance = caminoSvg.querySelector('.ruta__avance');
  if (!avance) return;
  const hasta = clamp(innerHeight * 0.66 - rutaEl.getBoundingClientRect().top, 0, rutaEl.offsetHeight);
  avance.setAttribute('height', hasta);
  hitosEls.forEach((hito, i) => hito.classList.toggle('is-done', hitosY[i] <= hasta));
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
const subnav = document.getElementById('subnav');
const subnavLinks = [...subnav.querySelectorAll('a')];
// Marca en el menú la sección que está en el medio de la pantalla. El submenú de
// 2do ciclo (a la derecha) se muestra solo dentro de ese capítulo y marca su subsección.
const navTargets = [...document.querySelectorAll('.chapter, [data-nav]')];
const enElMedio = new Set();
const chapterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => (e.isIntersecting ? enElMedio.add(e.target) : enElMedio.delete(e.target)));
    if (!enElMedio.size) return;
    const enMedio = (a) => [...enElMedio].some((el) => `#${el.id}` === a.getAttribute('href'));
    menuLinks.forEach((a) => a.classList.toggle('is-active', enMedio(a)));
    subnavLinks.forEach((a) => a.classList.toggle('is-active', enMedio(a)));
    subnav.classList.toggle('is-visible', [...enElMedio].some((el) => el.id === 'segundo-ciclo'));
  },
  { rootMargin: '-50% 0px -50% 0px' }
);
navTargets.forEach((c) => chapterObserver.observe(c));

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
  actualizarCamino();

  const max = document.documentElement.scrollHeight - vh;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  bar.classList.toggle('is-dark', dark.getBoundingClientRect().top < 40);
}

function requestUpdate() {
  if (!ticking) { ticking = true; requestAnimationFrame(update); }
}

addEventListener('scroll', requestUpdate, { passive: true });
addEventListener('resize', () => { dibujarCamino(); requestUpdate(); });
dibujarCamino();
document.fonts?.ready.then(dibujarCamino);


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
