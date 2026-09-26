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

// Elementos .fade: aparecen al entrar en pantalla y se van al salir
function observarFades() {
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('is-visible', e.isIntersecting)),
    { threshold: 0.15 }
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
