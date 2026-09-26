// Página de una clase de la trayectoria: clase.html?n=3
const total = trayectoria.length;
const num = Number(new URLSearchParams(location.search).get('n'));

if (!Number.isInteger(num) || num < 1 || num > total) {
  location.replace('index.html#trayectoria');
  throw new Error('Clase inexistente');
}

const clase = trayectoria[num - 1];
const [portada, ...galeria] = clase.fotos;
const anterior = trayectoria[num - 2];
const siguiente = trayectoria[num];

document.title = `Clase ${num} · ${clase.tema} | Flor`;
document.documentElement.style.setProperty('--c', colorFase(clase.fase));

const main = document.getElementById('clase');
main.innerHTML = `
  <section class="clase-hero">
    <a href="index.html#clase-${num}" class="btn-back"><span aria-hidden="true">←</span> Volver a la trayectoria</a>
    <nav class="mini-path" aria-label="Ir a otra clase">
      <p class="mini-path__label">Ir a otra clase</p>
      <div class="mini-path__dots">
        ${trayectoria.map((t, i) => `
          <a href="clase.html?n=${i + 1}" style="--c:${colorFase(t.fase)}" data-tema="${esc(t.tema)}"
             class="${i + 1 === num ? 'is-current' : ''}" ${i + 1 === num ? 'aria-current="page"' : ''}
             aria-label="Clase ${i + 1}: ${esc(t.tema)}">${i + 1}</a>`).join('')}
      </div>
    </nav>
    <div class="clase-hero__top">
      <span class="pill">${esc(clase.fase)}</span>
      <small>Clase ${num} de ${total}</small>
    </div>
    <h1>${esc(clase.tema)}</h1>
  </section>

  ${portada ? `
  <figure class="clase-cover" data-foto="0">
    <div class="clase-cover__frame" id="cover">${fotoHTML(portada)}</div>
    ${portada.pie ? `<figcaption>${esc(portada.pie)}</figcaption>` : ''}
  </figure>` : ''}

  <section class="clase-text narrow">
    ${clase.texto.map((p, i) => `<p class="${i === 0 ? 'lead ' : ''}fade">${esc(p)}</p>`).join('')}
  </section>

  ${galeria.length ? `
  <section class="bento bento--n${Math.min(galeria.length, 3)}">
    ${galeria.map((f, i) => `
      <figure class="bento__item fade" data-foto="${i + 1}">
        ${fotoHTML(f)}
        ${f.pie ? `<figcaption>${esc(f.pie)}</figcaption>` : ''}
      </figure>`).join('')}
  </section>` : ''}

  <nav class="clase-nav">
    ${anterior
      ? `<a href="clase.html?n=${num - 1}" style="--c:${colorFase(anterior.fase)}"><small>← Clase ${num - 1}</small><strong>${esc(anterior.tema)}</strong></a>`
      : `<a href="index.html#clase-${num}"><small>←</small><strong>Volver a la trayectoria</strong></a>`}
    ${siguiente
      ? `<a href="clase.html?n=${num + 1}" class="clase-nav__next" style="--c:${colorFase(siguiente.fase)}"><small>Clase ${num + 1} →</small><strong>${esc(siguiente.tema)}</strong></a>`
      : `<a href="index.html#clase-${num}" class="clase-nav__next"><small>→</small><strong>Volver a la trayectoria</strong></a>`}
  </nav>`;

// Portada que se agranda al scrollear + barra de progreso
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
let ticking = false;

function update() {
  ticking = false;
  if (cover) {
    const top = cover.getBoundingClientRect().top;
    const g = ease(range(innerHeight - top, 0, innerHeight * 0.7));
    cover.style.transform = `scale(${0.88 + g * 0.12})`;
    cover.style.borderRadius = `${40 - g * 16}px`;
  }
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
}
addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(update); }
}, { passive: true });
addEventListener('resize', update);
update();
observarFades();

// Visor de fotos (solo fotos reales)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

main.querySelectorAll('[data-foto]').forEach((fig) => {
  const foto = clase.fotos[Number(fig.dataset.foto)];
  if (!foto.src) return;
  fig.classList.add('is-zoomable');
  fig.addEventListener('click', () => {
    lightboxImg.src = foto.src;
    lightboxImg.alt = foto.pie || '';
    lightboxCaption.textContent = foto.pie || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
};
lightbox.addEventListener('click', (e) => { if (e.target !== lightboxImg) closeLightbox(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
