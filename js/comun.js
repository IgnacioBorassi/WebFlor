// Utilidades compartidas entre la página principal y las páginas de clase

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
// Convierte p (0..1) en el avance dentro del tramo [a, b]
const range = (p, a, b) => clamp((p - a) / (b - a));
const ease = (t) => 1 - Math.pow(1 - t, 3);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Fases de la trayectoria y su color (--fase-1, --fase-2, ...)
const fases = [...new Set(trayectoria.map((t) => t.fase))];
const colorFase = (fase) => `var(--fase-${fases.indexOf(fase) + 1})`;

// Foto real o recuadro de ejemplo si todavía no hay imagen
const fotoHTML = (foto, extra = '') => foto.src
  ? `<img src="${esc(foto.src)}" alt="${esc(foto.pie || '')}" loading="lazy" ${extra}>`
  : `<div class="ph" ${extra}>Foto</div>`;

// Elementos .fade: aparecen al entrar en pantalla y se reinician al salir por abajo.
// Al salir por arriba se quedan visibles: si se ocultaran, el corrimiento de la
// animación los volvería a meter en pantalla y quedarían "vibrando" en el borde.
function observarFades() {
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      // (la segunda condición cubre bloques muy altos, que nunca llegan al 15 %)
      if (e.intersectionRatio >= 0.15 || e.intersectionRect.height > innerHeight * 0.3) e.target.classList.add('is-visible');
      else if (!e.isIntersecting && e.boundingClientRect.top > 0) e.target.classList.remove('is-visible');
    }),
    { threshold: [0, 0.05, 0.1, 0.15] }
  );
  document.querySelectorAll('.fade').forEach((el) => obs.observe(el));
}

// Barra superior: al bajar se achica y se vuelve una cápsula flotante
(function barraCompacta() {
  const bar = document.querySelector('.bar');
  if (!bar) return;
  const actualizar = () => bar.classList.toggle('is-compact', scrollY > 60);
  addEventListener('scroll', actualizar, { passive: true });
  actualizar();
})();

// Links internos (#seccion): desplazamiento suave hecho a mano, para que
// deslice siempre, aunque el navegador o el sistema no lo hagan solos
(function desplazamientoSuave() {
  const easeInOut = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  let animacion = 0;

  function irA(y) {
    const desde = scrollY;
    const distancia = y - desde;
    const duracion = clamp(Math.abs(distancia) / 4, 500, 1200);
    const t0 = performance.now();
    cancelAnimationFrame(animacion);
    const paso = (ahora) => {
      const t = clamp((ahora - t0) / duracion);
      window.scrollTo(0, desde + distancia * easeInOut(t));
      if (t < 1) animacion = requestAnimationFrame(paso);
    };
    animacion = requestAnimationFrame(paso);
  }

  // Si la persona usa la rueda o toca la pantalla, se corta la animación
  ['wheel', 'touchstart'].forEach((ev) => addEventListener(ev, () => cancelAnimationFrame(animacion), { passive: true }));

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link || e.defaultPrevented) return;
    const destino = document.querySelector(link.getAttribute('href'));
    if (!destino) return;
    e.preventDefault();
    // Respeta el scroll-margin-top del destino (para que no quede tapado por el menú)
    const margen = parseFloat(getComputedStyle(destino).scrollMarginTop) || 0;
    const y = link.getAttribute('href') === '#inicio' ? 0 : destino.getBoundingClientRect().top + scrollY - margen;
    irA(y);
    history.pushState(null, '', link.getAttribute('href'));
  });
})();