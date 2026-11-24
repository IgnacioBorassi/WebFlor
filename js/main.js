// Separa el texto de [data-words] en palabras animables
document.querySelectorAll('[data-words]').forEach((el) => {
  el.innerHTML = el.textContent.trim().split(/\s+/)
    .map((w) => `<span class="w">${w}</span>`).join(' ');
});

// =========================================================
// Planificación: resumen (tarjetas) / cuadro
// =========================================================
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

// Reparte el ancho entre Objetivos y Capacidades según cuánto texto tiene cada una,
// para que las dos tarjetas queden de alto parecido y no sobre espacio en blanco
const anchoFila = (P) => {
  const largo = (xs) => xs.join(' ').length;
  const obj = largo(P.objetivos) + 150 * P.objetivos.length;
  const cap = largo(P.capacidades.map((c) => `${c.nombre} ${c.descripcion}`)) + 250 * P.capacidades.length;
  const r = clamp(obj / cap, 0.7, 1.8);
  return `minmax(0, ${r.toFixed(2)}fr) minmax(0, 1fr)`;
};

// Arma la planificación de un ciclo dentro de su sección (resumen, cuadro y el switch entre los dos)
function armarPlanificacion(seccion, P) {
  // Con "relleno: true" los textos se ven como barras grises: queda el diseño armado sin texto de mentira
  const tx = (txt) => (P.relleno ? `<span class="relleno">${esc(txt)}</span>` : esc(txt));
  const plan = seccion.querySelector('.plan');
  // Recuadro con áreas y ejes (arriba de las dos vistas)
  seccion.querySelector('.plan-meta').innerHTML = `
    <div><span class="plan-meta__label">Áreas</span>${P.areas.map((a) => `<span class="chip">${tx(a)}</span>`).join('')}</div>
    <div><span class="plan-meta__label">Ejes</span>${P.ejes.map((e) => `<span class="chip chip--soft">${tx(e)}</span>`).join('')}</div>`;

  plan.innerHTML = `
    <div class="plan__view" data-view="cards">
      <div class="plan-hilo">
        <article class="plan-card plan-card--hilo">
          <h4>Hilo conductor</h4>
          <p>${tx(P.hiloConductor)}</p>
        </article>
        <span class="plan-flecha" aria-hidden="true"></span>
        <article class="plan-card plan-card--recorte">
          <h4>Recorte didáctico</h4>
          <p>${tx(P.recorte)}</p>
        </article>
      </div>

      <div class="plan-fila" style="--fila:${anchoFila(P)}">
        <article class="plan-card">
          <h4 class="plan-card__titulo">${ICONOS.check} Objetivos</h4>
          <ol class="plan-objetivos">${P.objetivos.map((o, i) => `<li><span class="plan-card__num">${i + 1}</span><p>${tx(o)}</p></li>`).join('')}</ol>
        </article>
        <article class="plan-card plan-card--capacidades">
          <h4>Capacidades</h4>
          <ul class="plan-capacidades">${P.capacidades.map((c, i) => `
            <li>
              <div class="plan-capacidades__nombre"><img class="capacidad-icono" src="${esc(c.icono)}" alt="" width="58" height="50">${tx(c.nombre)}</div>
              <p>${tx(c.descripcion)}</p>
            </li>`).join('')}</ul>
        </article>
      </div>

      <article class="plan-card">
        <h4>Contenidos</h4>
        <ul class="plan-contenidos">${P.contenidos.map((c) => `<li>${P.relleno ? tx(c) : conCita(c)}</li>`).join('')}</ul>
      </article>
    </div>

    <div class="plan__view" data-view="table" hidden>
      <div class="plan-table-wrap">
        <table class="plan-table">
          <caption>
            <span><strong>Áreas:</strong> ${tx(P.areas.join(', '))}</span>
            <span><strong>Ejes:</strong> ${tx(P.ejes.join('; '))}</span>
          </caption>
          <tbody>
            <tr><th scope="row">Contenidos</th><td><ul>${P.contenidos.map((c) => `<li>${tx(c)}</li>`).join('')}</ul></td></tr>
            <tr><th scope="row">Capacidades</th><td><ul class="plan-table__capacidades">${P.capacidades.map((c) => `<li><img class="capacidad-icono" src="${esc(c.icono)}" alt="" width="58" height="50"><span><strong>${tx(c.nombre)}:</strong> ${tx(c.descripcion)}</span></li>`).join('')}</ul></td></tr>
            <tr><th scope="row">Objetivos</th><td><ol>${P.objetivos.map((o) => `<li>${tx(o)}</li>`).join('')}</ol></td></tr>
            <tr><th scope="row">Hilo Conductor</th><td>${tx(P.hiloConductor)}</td></tr>
            <tr><th scope="row">Recorte Didáctico</th><td>${tx(P.recorte)}</td></tr>
          </tbody>
        </table>
      </div>
    </div>`;

  const botones = seccion.querySelectorAll('.switch__btn');
  botones.forEach((btn) => {
    btn.addEventListener('click', () => {
      botones.forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on);
      });
      plan.querySelectorAll('.plan__view').forEach((v) => { v.hidden = v.dataset.view !== btn.dataset.view; });
    });
  });
}
armarPlanificacion(document.getElementById('c1-planificacion'), primerCiclo.planificacion);
armarPlanificacion(document.getElementById('planificacion'), planificacion);

// =========================================================
// Desempeños: ruta con un hito por parada. Al lado de cada hito va el título;
// al tocarlo se despliega la descripción.
// =========================================================
// Hitos: pin de mapa en cada parada y bandera de llegada en la última
const HITO_PIN = '<svg viewBox="0 0 30 40" aria-hidden="true"><path class="hito__forma" d="M15 1C7.3 1 1 7.1 1 14.7 1 25 15 39 15 39s14-14 14-24.3C29 7.1 22.7 1 15 1z"/><circle cx="15" cy="14.5" r="5.5" fill="#fff"/></svg>';
const HITO_BANDERA = '<svg viewBox="0 0 30 40" aria-hidden="true"><path d="M5 2v37" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path class="hito__forma" d="M6 3h21v15H6z"/><path fill="#fff" d="M6 3h5.25v5H6zm10.5 0h5.25v5H16.5zM11.25 8h5.25v5h-5.25zm10.5 0H27v5h-5.25zM6 13h5.25v5H6zm10.5 0h5.25v5H16.5z"/></svg>';
// Huellitas (dos pisadas) para todo lo que tiene que ver con las huellas de aprendizaje
const HUELLITAS = '<svg class="huellitas" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor"><ellipse cx="7.2" cy="9.2" rx="2.6" ry="4" transform="rotate(-10 7.2 9.2)"/><ellipse cx="6.4" cy="15.6" rx="1.9" ry="1.6" transform="rotate(-10 6.4 15.6)"/><ellipse cx="16.6" cy="7" rx="2.6" ry="4" transform="rotate(10 16.6 7)"/><ellipse cx="17.6" cy="13.4" rx="1.9" ry="1.6" transform="rotate(10 17.6 13.4)"/></svg>';
const FLECHA = '<svg class="ruta__flecha" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

const sinAnimaciones = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Arma una ruta (una por ciclo) y devuelve cómo redibujarla y cómo actualizar su avance
function crearRuta(rutaEl, paradas, prefijo) {
  const n = paradas.length;
  rutaEl.innerHTML = `
    <svg class="ruta__camino" aria-hidden="true"></svg>
    <ol class="ruta__paradas">
      ${paradas.map((t, i) => `
        <li class="ruta__parada ruta__parada--${i % 2 ? 'der' : 'izq'} fade" style="--c:${t.fase ? colorFase(t.fase) : 'var(--destacado)'}">
          <button class="ruta__boton" type="button" aria-expanded="false" aria-controls="${prefijo}parada-${i}">
            <span class="ruta__hito">${i === n - 1 ? HITO_BANDERA : HITO_PIN}</span>
            <span class="ruta__textos">
              ${t.fase ? `<span class="ruta__fase">${esc(t.fase)}</span>` : ''}
              <span class="ruta__titulo">${esc(t.titulo)}</span>
              ${FLECHA}
            </span>
          </button>
          <div class="ruta__desc" id="${prefijo}parada-${i}" inert>
            <div class="ruta__desc-contenido">
              <p>${esc(t.texto)}</p>
              ${t.huella ? `<a class="ruta__huella" href="#huella-${t.huella}">${HUELLITAS} Ver huella de aprendizaje</a>` : ''}
            </div>
          </div>
        </li>`).join('')}
    </ol>`;

  const caminoSvg = rutaEl.querySelector('.ruta__camino');
  const hitosEls = [...rutaEl.querySelectorAll('.ruta__hito')];
  let hitosY = [];

  // Tocar una parada despliega u oculta su descripción (con animación de altura en el CSS)
  rutaEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.ruta__boton');
    if (!btn) return;
    const abrir = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', abrir);
    const desc = document.getElementById(btn.getAttribute('aria-controls'));
    desc.classList.toggle('is-open', abrir);
    desc.inert = !abrir; // cerrada: su link no se puede alcanzar con el teclado
  });

  // Dibuja el camino que baja serpenteando por los hitos (medidos sin transformaciones).
  // Si la ruta está oculta (es del otro ciclo), no hay nada que medir.
  function dibujar() {
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
        <mask id="${prefijo}caminoRecorrido" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}">
          <rect class="ruta__avance" x="0" y="0" width="${w}" height="0" fill="#fff"/>
        </mask>
      </defs>
      <path d="${d}" class="camino__asfalto camino__asfalto--pendiente"/>
      <path d="${d}" class="camino__linea camino__linea--pendiente"/>
      <g mask="url(#${prefijo}caminoRecorrido)">
        <path d="${d}" class="camino__asfalto"/>
        <path d="${d}" class="camino__linea"/>
      </g>`;
    // Cada hito se corre un poco para quedar apoyado sobre la curva
    hitosEls.forEach((hito, i) => { hito.style.transform = `translateX(${todos[i + 1].x - xc}px)`; });
    actualizar();
  }

  // El camino se pinta hasta la altura de 2/3 de la pantalla, y los hitos alcanzados se encienden.
  // El pintado no copia el scroll de golpe: lo persigue suavemente (rápido al principio, frena al llegar).
  let actual = null;
  let objetivo = 0;
  let raf = 0;

  function pintar() {
    const avance = caminoSvg.querySelector('.ruta__avance');
    if (!avance) return;
    avance.setAttribute('height', actual);
    hitosEls.forEach((hito, i) => hito.classList.toggle('is-done', hitosY[i] <= actual));
  }

  function animar() {
    raf = 0;
    const falta = objetivo - actual;
    if (Math.abs(falta) < 0.5) {
      actual = objetivo;
    } else {
      actual += falta * 0.08;
      raf = requestAnimationFrame(animar);
    }
    pintar();
  }

  function actualizar() {
    if (!caminoSvg.querySelector('.ruta__avance') || !rutaEl.offsetHeight) return;
    objetivo = clamp(innerHeight * 0.66 - rutaEl.getBoundingClientRect().top, 0, rutaEl.offsetHeight);
    // Al cargar la página (o sin animaciones) arranca directo en su lugar
    if (actual === null || sinAnimaciones) actual = objetivo;
    pintar(); // el camino se redibuja al abrir una parada: se repinta ya, sin esperar al próximo cuadro
    if (!raf) raf = requestAnimationFrame(animar);
  }

  // Mientras una descripción se abre o se cierra, la ruta cambia de alto:
  // se redibuja en cada cuadro para que el camino y los hitos acompañen el movimiento.
  // (También salta cuando la ruta aparece al cambiar de ciclo.)
  new ResizeObserver(() => dibujar()).observe(rutaEl.querySelector('.ruta__paradas'));

  return { dibujar, actualizar };
}

// La ruta de los desempeños es de 2do ciclo (en 1er ciclo es la montaña, más abajo)
const rutas = [crearRuta(document.querySelector('#desempenos .ruta'), trayectoria, '')];
const dibujarCaminos = () => rutas.forEach((r) => r.dibujar());

// =========================================================
// 1er ciclo · Desempeños: la docente ayuda a los chicos a escalar una montaña.
// Al bajar con el scroll, el grupo sube por el sendero; en cada parada se ve
// su desempeño en la tarjeta. La cima (con la bandera) es la última parada.
// =========================================================
const SVG_NS = 'http://www.w3.org/2000/svg';
// Personitas dibujadas con los pies en (0, 0) y mirando hacia la derecha
const FIGURA_DOCENTE = `
  <g class="m-cuerpo">
    <path class="m-piernas" d="M-2.5 0 L-1.2 -9 M2.5 0 L1.2 -9"/>
    <path class="m-guardapolvo" d="M-5 -8 L5 -8 L4 -21 Q0 -23.5 -4 -21 Z"/>
    <path class="m-brazo" d="M-2.5 -18 L-9 -13"/>
    <path class="m-pelo" d="M-4.6 -27 Q-5 -32.5 0 -32.5 Q5 -32.5 4.6 -27 Q2 -30 -4.6 -27 Z M-4 -28 Q-8 -24 -6.5 -19"/>
    <circle class="m-cara" cx="0" cy="-27" r="4.3"/>
  </g>`;
const figuraNene = (color) => `
  <g class="m-cuerpo">
    <path class="m-piernas" d="M-2 0 L-1 -7 M2 0 L1 -7"/>
    <path class="m-remera" style="fill:${color}" d="M-4 -6.5 L4 -6.5 L3.4 -15 Q0 -16.6 -3.4 -15 Z"/>
    <path class="m-brazo" d="M2 -13 L7.5 -16.5"/>
    <circle class="m-cara" cx="0" cy="-19.6" r="3.6"/>
    <path class="m-pelo" d="M-3.7 -20.4 Q-3.5 -24.6 0 -24.6 Q3.5 -24.6 3.7 -20.4 Q1 -22.6 -3.7 -20.4 Z"/>
  </g>`;
// Dónde está la mano de cada uno (para la soga), relativo a los pies, mirando a la derecha
const MANO_DOCENTE = [-9, -13];
const MANO_NENE = [7.5, -16.5];
const ESCALA = 1.7; // tamaño de las personitas en la montaña

// Cada título lleva el color con el que Flor lo resaltó en el doc (mismos colores que las fases)
const colorEtapa = (t) => (t.etapa ? `var(--fase-${t.etapa})` : 'var(--destacado)');

function crearMontana(raiz, paradas) {
  const n = paradas.length;
  raiz.innerHTML = `
    <div class="montana__pista" style="--paradas:${n}">
      <div class="montana__escena">
        <svg class="montana__svg" viewBox="0 0 600 700" role="img" aria-label="Montaña con ${n} paradas: la docente sube junto a los chicos">
          <circle class="m-cielo" cx="300" cy="400" r="330"/>
          <circle class="m-sol" cx="505" cy="120" r="42"/>
          <g class="m-nube"><ellipse cx="110" cy="150" rx="48" ry="16"/><ellipse cx="140" cy="138" rx="30" ry="18"/></g>
          <g class="m-nube m-nube--2"><ellipse cx="470" cy="250" rx="40" ry="13"/><ellipse cx="492" cy="240" rx="24" ry="14"/></g>
          <path class="m-fondo" d="M-20 700 L120 360 L210 470 L330 250 L470 430 L540 330 L640 700 Z"/>
          <path class="m-frente" d="M-10 700 L300 88 L610 700 Z"/>
          <path class="m-nieve" d="M300 88 L352 190 L330 178 L312 196 L292 176 L270 192 L250 185 Z"/>
          <path class="m-sendero" d="M110 655 Q300 645 455 602 Q525 582 420 545 Q262 500 192 470 Q128 444 232 410 Q362 368 408 336 Q448 306 360 280 Q266 252 252 226 Q240 200 310 182 Q350 166 322 140 L301 104"/>
          <path class="m-sendero-avance" d="M110 655 Q300 645 455 602 Q525 582 420 545 Q262 500 192 470 Q128 444 232 410 Q362 368 408 336 Q448 306 360 280 Q266 252 252 226 Q240 200 310 182 Q350 166 322 140 L301 104"/>
          <g class="m-bandera"><path d="M301 104 V58" class="m-mastil"/><path d="M302 59 H330 L322 68 L330 77 H302 Z"/></g>
          <g class="m-hitos"></g>
          <polyline class="m-soga" points=""/>
          <g class="m-grupo">
            <g class="m-persona m-nene" data-atras="0.06">${figuraNene('#3b6fd8')}</g>
            <g class="m-persona m-nene" data-atras="0.032">${figuraNene('#f2a541')}</g>
            <g class="m-persona m-docente" data-atras="0">${FIGURA_DOCENTE}</g>
          </g>
        </svg>
        <div class="montana__tarjeta" aria-live="polite">
          <p class="montana__paso"></p>
          <h4 class="montana__titulo"></h4>
          <p class="montana__texto"></p>
          <div class="montana__puntos">
            ${paradas.map((t, i) => `<button type="button" data-i="${i}" style="--c:${colorEtapa(t)}" aria-label="Ir a la parada ${i + 1}: ${esc(t.titulo)}"></button>`).join('')}
          </div>
        </div>
      </div>
    </div>`;

  const pista = raiz.querySelector('.montana__pista');
  const svg = raiz.querySelector('.montana__svg');
  const sendero = svg.querySelector('.m-sendero');
  const avance = svg.querySelector('.m-sendero-avance');
  const largo = sendero.getTotalLength();
  const punto = (f) => sendero.getPointAtLength(clamp(f) * largo);
  avance.style.strokeDasharray = `${largo} ${largo}`;

  // Hitos numerados a lo largo del sendero (el último es la cima)
  const hitos = svg.querySelector('.m-hitos');
  // El primer tramo del sendero queda antes de la parada 1, para que los chicos entren enteros
  const INICIO = 0.08;
  const enSendero = (a) => INICIO + a * (1 - INICIO);
  const fraccion = (i) => enSendero(i / (n - 1));
  paradas.forEach((t, i) => {
    const p = punto(fraccion(i));
    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('class', 'm-hito');
    g.style.setProperty('--c', colorEtapa(t));
    g.setAttribute('transform', `translate(${p.x} ${p.y})`);
    g.innerHTML = `<circle r="11"/><text y="4">${i + 1}</text>`;
    g.addEventListener('click', () => irAParada(i));
    hitos.appendChild(g);
  });
  const hitosEls = [...hitos.children];

  const personas = [...svg.querySelectorAll('.m-persona')];
  const soga = svg.querySelector('.m-soga');
  const titulo = raiz.querySelector('.montana__titulo');
  const texto = raiz.querySelector('.montana__texto');
  const etiqueta = raiz.querySelector('.montana__paso');
  const tarjeta = raiz.querySelector('.montana__tarjeta');
  const puntos = [...raiz.querySelectorAll('.montana__puntos button')];

  let actual = 0;      // dónde está dibujado el grupo (0..1 del sendero)
  let objetivo = 0;    // hacia dónde va, según el scroll
  let parada = -1;
  let animando = false;

  function mostrarParada(i) {
    if (i === parada) return;
    const primera = parada === -1;
    parada = i;
    const poner = () => {
      etiqueta.textContent = paradas[i].etapa ? fases[paradas[i].etapa - 1] : `Parada ${i + 1} de ${n}`;
      titulo.innerHTML = `<span>${esc(paradas[i].titulo)}</span>`;
      tarjeta.style.setProperty('--c', colorEtapa(paradas[i]));
      texto.textContent = paradas[i].texto;
      tarjeta.classList.remove('is-cambiando');
    };
    puntos.forEach((b, k) => b.classList.toggle('is-actual', k === i));
    if (primera || sinAnimaciones) return poner();
    tarjeta.classList.add('is-cambiando');
    clearTimeout(mostrarParada.t);
    mostrarParada.t = setTimeout(poner, 180);
  }

  function dibujarGrupo() {
    const manos = [];
    personas.forEach((el) => {
      const f = enSendero(actual) - Number(el.dataset.atras);
      const p = punto(f);
      const q = punto(f + 0.004);
      const mira = q.x >= p.x ? 1 : -1;
      el.setAttribute('transform', `translate(${p.x} ${p.y}) scale(${mira * ESCALA} ${ESCALA})`);
      const mano = el.classList.contains('m-docente') ? MANO_DOCENTE : MANO_NENE;
      manos.push(`${p.x + mano[0] * ESCALA * mira},${p.y + mano[1] * ESCALA}`);
    });
    // La soga va de la mano de cada chico a la de la docente
    soga.setAttribute('points', manos.join(' '));
    avance.style.strokeDashoffset = largo * (1 - enSendero(actual));
    hitosEls.forEach((h, i) => h.classList.toggle('is-pasado', enSendero(actual) >= fraccion(i) - 0.002));
  }

  function paso() {
    const falta = objetivo - actual;
    actual = Math.abs(falta) < 0.0005 || sinAnimaciones ? objetivo : actual + falta * 0.1;
    svg.classList.toggle('is-caminando', Math.abs(falta) > 0.002);
    dibujarGrupo();
    if (actual !== objetivo) requestAnimationFrame(paso);
    else animando = false;
  }

  const escena = raiz.querySelector('.montana__escena');
  const enCelular = matchMedia('(max-width: 800px)');
  // En pantallas anchas la escena queda fija en el medio (sin taparse con el menú)
  function centrar() {
    escena.style.top = enCelular.matches ? '' : `${Math.max(80, (innerHeight - escena.offsetHeight) / 2)}px`;
  }
  const arriba = () => parseFloat(getComputedStyle(escena).top) || 0;
  const recorridoTotal = () => pista.offsetHeight - escena.offsetHeight;

  function actualizar() {
    const recorrido = recorridoTotal();
    if (recorrido <= 0) return;
    const prog = clamp((arriba() - pista.getBoundingClientRect().top) / recorrido);
    // Suben parejo: lo que bajás con el scroll es lo que avanzan
    const tramo = prog * (n - 1);
    objetivo = prog;
    mostrarParada(Math.min(n - 1, Math.round(tramo)));
    if (!animando) { animando = true; requestAnimationFrame(paso); }
  }

  function irAParada(i) {
    const y = pista.getBoundingClientRect().top + scrollY - arriba() + recorridoTotal() * (i / (n - 1));
    window.scrollTo({ top: y, behavior: sinAnimaciones ? 'auto' : 'smooth' });
  }
  puntos.forEach((b) => b.addEventListener('click', () => irAParada(Number(b.dataset.i))));

  addEventListener('scroll', actualizar, { passive: true });
  addEventListener('resize', () => { centrar(); actualizar(); });
  centrar();
  mostrarParada(0);
  dibujarGrupo();
  actualizar();
}
crearMontana(document.getElementById('montana'), primerCiclo.trayectoria);


// =========================================================
// Construcción de identidad docente AIE: tarjetas compactas que abren
// un panel de lectura con el texto completo y el botón al desempeño
// =========================================================
const aieListas = document.querySelectorAll('.aie');
// Cada ciclo tiene sus sobres: 1er ciclo en primerCiclo.aie, 2do ciclo en aie
const datosAie = (el) => (el.closest('.ciclo')?.dataset.ciclo === '1' ? primerCiclo.aie : aie);
const botonDesempeno = (a) => a.link
  ? `<a class="aie__boton" href="${esc(a.link)}" target="_blank" rel="noopener">Mirá el desempeño <span aria-hidden="true">↗</span></a>`
  : '<span class="aie__boton is-pendiente" aria-disabled="true" title="Falta cargar el link">Mirá el desempeño <span aria-hidden="true">↗</span></span>';

// Cada apartado es un sobre cerrado con un sello numerado: al tocarlo se abre,
// sale la carta y recién ahí aparece el panel de lectura
// Íconos de los sellos (trazo blanco sobre el color del sobre)
const ICONOS_AIE = {
  cerebro: '<path d="M12 4.5a3 3 0 0 0-5.4-1.2A3 3 0 0 0 3.8 7.5a3.2 3.2 0 0 0 .4 5.3 3 3 0 0 0 2.9 4.7A3 3 0 0 0 12 19.5z"/><path d="M12 4.5a3 3 0 0 1 5.4-1.2 3 3 0 0 1 2.8 4.2 3.2 3.2 0 0 1-.4 5.3 3 3 0 0 1-2.9 4.7A3 3 0 0 1 12 19.5"/><path d="M8.5 8.5c1 .2 1.6.9 1.6 2M15.5 8.5c-1 .2-1.6.9-1.6 2M7.5 13.5c1.2 0 2 .5 2.3 1.5M16.5 13.5c-1.2 0-2 .5-2.3 1.5"/>',
  lupa: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5.5 5.5"/><path d="M8 8.5a3 3 0 0 1 2.5-1.5"/>',
  herramientas: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v2"/><path d="M3 13h7M14 13h7"/><rect x="10" y="11.5" width="4" height="3.5" rx="1"/>',
  megafono: '<path d="M3 10.5v3a1 1 0 0 0 1 1h2.5l8.5 4.5V5L6.5 9.5H4a1 1 0 0 0-1 1z"/><path d="m7 14.5 1.2 5h2.3l-1-4.4"/><path d="M18.5 9a4.5 4.5 0 0 1 0 6"/>',
  abrazo: '<circle cx="8" cy="5.5" r="2.5"/><circle cx="16" cy="5.5" r="2.5"/><path d="M3.5 20v-3.5A4.5 4.5 0 0 1 8 12a4.4 4.4 0 0 1 4 2.5A4.4 4.4 0 0 1 16 12a4.5 4.5 0 0 1 4.5 4.5V20"/><path d="M6 14.5c2 2.2 4 3 6 3s4-.8 6-3"/>',
};
const iconoAie = (a, i) => ICONOS_AIE[a.icono]
  ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONOS_AIE[a.icono]}</svg>`
  : String(i + 1);

const sobresHTML = (lista) => lista.map((a, i) => `
  <div class="sobre-item fade"${a.color ? ` style="--sobre-c:${esc(a.color)}"` : ''}>
    <button class="sobre" type="button" data-aie="${i}" aria-haspopup="dialog" aria-label="Abrir: ${esc(a.titulo)}">
      <span class="sobre__fondo" aria-hidden="true"></span>
      <span class="sobre__carta" aria-hidden="true"><span></span><span></span><span></span></span>
      <span class="sobre__frente" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <path class="sobre__pliegue" d="M0 0 L50 52 L0 100 Z"/>
          <path class="sobre__pliegue" d="M100 0 L50 52 L100 100 Z"/>
          <path class="sobre__pliegue sobre__pliegue--base" d="M0 100 L50 46 L100 100 Z"/>
        </svg>
      </span>
      <span class="sobre__solapa" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 0 H100 L50 100 Z"/></svg>
      </span>
      <span class="sobre__sello" aria-hidden="true">${iconoAie(a, i)}</span>
    </button>
    <p class="sobre__titulo">${esc(a.titulo)}</p>
  </div>`).join('');
aieListas.forEach((el) => { el.innerHTML = sobresHTML(datosAie(el)); });

// Texto blanco u oscuro sobre el color del sobre, según qué tan claro sea (el amarillo y el naranja llevan oscuro)
function tintaSobre(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return '#fff';
  const [r, g, b] = [0, 2, 4].map((k) => parseInt(m[1].slice(k, k + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luz > 0.3 ? '#2a1f00' : '#fff';
}

const lector = document.createElement('dialog');
lector.className = 'lector';
lector.setAttribute('aria-labelledby', 'lectorTitulo');
document.body.appendChild(lector);

function abrirLector(a, i) {
  lector.style.setProperty('--sobre-c', a.color || 'var(--destacado)');
  lector.style.setProperty('--sobre-tinta', tintaSobre(a.color));
  lector.innerHTML = `
    <div class="lector__bar">
      <span class="aie__num">${iconoAie(a, i)}</span>
      <strong>Construcción de identidad docente AIE</strong>
      <button class="lector__cerrar" type="button" aria-label="Cerrar">×</button>
    </div>
    <div class="lector__cuerpo">
      <article class="lector__articulo">
        <h3 class="lector__titulo" id="lectorTitulo">${esc(a.titulo)}</h3>
        ${a.subtitulo ? `<p class="lector__subtitulo">${esc(a.subtitulo)}</p>` : ''}
        ${a.evidencia ? `<p class="lector__evidencia">${esc(a.evidencia)}</p>` : ''}
        <div class="lector__texto">
          ${[].concat(a.texto || []).map((t) => `<p>${esc(t)}</p>`).join('')}
        </div>
        <div class="lector__acciones">${botonDesempeno(a)}</div>
      </article>
    </div>`;
  lector.showModal();
  lector.querySelector('.lector__cuerpo').scrollTop = 0;
}

let sobreAbierto = null;
// Al cerrar: primero baja la carta, después se cierra la solapa y vuelve el sello (ver .is-closing en el CSS)
function cerrarSobre() {
  const sobre = sobreAbierto;
  if (!sobre) return;
  sobreAbierto = null;
  sobre.classList.remove('is-open');
  sobre.classList.add('is-closing');
  setTimeout(() => sobre.classList.remove('is-closing'), 1000);
}

aieListas.forEach((lista) => lista.addEventListener('click', (e) => {
  const sobre = e.target.closest('.sobre');
  if (!sobre || sobreAbierto) return;
  sobreAbierto = sobre;
  sobre.classList.add('is-open');
  // Se deja ver la animación del sobre y después se abre el panel
  setTimeout(() => abrirLector(datosAie(lista)[sobre.dataset.aie], Number(sobre.dataset.aie)), sinAnimaciones ? 0 : 850);
}));
function cerrarLector() {
  if (lector.open) lector.close();
  cerrarSobre();
}
lector.addEventListener('click', (e) => {
  if (e.target === lector || e.target.closest('.lector__cerrar')) cerrarLector();
});
lector.addEventListener('close', cerrarSobre); // también al cerrar con Escape

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
document.addEventListener('click', (e) => {
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

// =========================================================
// 1er ciclo · Huellas de aprendizaje en video. Mientras no haya link,
// se ve el reproductor vacío con un aviso.
// =========================================================
const videoEl = document.getElementById('c1-video');
const linkVideo = primerCiclo.video;
// YouTube y Drive se insertan con su propio reproductor; un .mp4 con el del navegador
function videoEmbebido(url) {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const drive = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;
  const canva = url.match(/canva\.com\/design\/([\w-]+)\/([\w-]+)/);
  if (canva) return `https://www.canva.com/design/${canva[1]}/${canva[2]}/view?embed`;
  return null;
}
if (!linkVideo) {
  videoEl.innerHTML = `
    <div class="video__pantalla video__pantalla--vacia">
      <span class="video__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z"/></svg></span>
      <p class="video__aviso">El video de las huellas de aprendizaje va a estar acá muy pronto</p>
    </div>`;
} else if (videoEmbebido(linkVideo)) {
  videoEl.innerHTML = `<div class="video__pantalla"><iframe src="${esc(videoEmbebido(linkVideo))}" title="Huellas de aprendizaje de 1er ciclo" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>`;
} else {
  videoEl.innerHTML = `<div class="video__pantalla"><video src="${esc(linkVideo)}" controls preload="metadata"></video></div>`;
}
// Aviso temporal arriba del video (por ejemplo, mientras se muestra el Canva)
if (linkVideo && primerCiclo.avisoVideo) {
  videoEl.insertAdjacentHTML('beforebegin', `<p class="video__temporal"><span aria-hidden="true">⏳</span> ${esc(primerCiclo.avisoVideo)}</p>`);
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
// los ciclos (a la derecha) se muestra solo dentro de un ciclo y marca su subsección.
const navTargets = [...document.querySelectorAll('.chapter, [data-nav]')];
// Los puntitos apuntan a las secciones del ciclo que estás leyendo
// (y se ocultan las que ese ciclo no tiene, como los desempeños en 1er ciclo)
function apuntarSubnav(ciclo) {
  const prefijo = ciclo.dataset.ciclo === '1' ? 'c1-' : '';
  subnavLinks.forEach((a) => {
    a.setAttribute('href', `#${prefijo}${a.dataset.sec}`);
    a.hidden = !document.querySelector(a.getAttribute('href'));
  });
}
// Cartelito fijo abajo a la derecha: dice en qué ciclo (y grado) estás
const cicloTag = document.getElementById('cicloTag');
let cicloMarcado = null;
function marcarCiclo(ciclo) {
  cicloTag.classList.toggle('is-visible', Boolean(ciclo));
  if (!ciclo || ciclo === cicloMarcado) return;
  const primeraVez = !cicloMarcado;
  cicloMarcado = ciclo;
  const poner = () => {
    const n = ciclo.dataset.ciclo;
    document.getElementById('cicloTagGrado').textContent = ciclo.dataset.grado;
    document.getElementById('cicloTagCiclo').textContent = n === '1' ? '1er ciclo' : '2do ciclo';
    document.getElementById('cicloTagNombre').textContent = ciclo.dataset.gradoNombre;
    cicloTag.href = `#${ciclo.id}`;
    cicloTag.classList.remove('is-cambiando');
  };
  if (primeraVez) return poner();
  // Al pasar de un ciclo al otro, el contenido se da vuelta
  cicloTag.classList.add('is-cambiando');
  setTimeout(poner, 220);
}
const enElMedio = new Set();
const chapterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => (e.isIntersecting ? enElMedio.add(e.target) : enElMedio.delete(e.target)));
    if (!enElMedio.size) return;
    const enMedio = (a) => [...enElMedio].some((el) => `#${el.id}` === a.getAttribute('href'));
    menuLinks.forEach((a) => a.classList.toggle('is-active', enMedio(a)));
    const ciclo = [...enElMedio].find((el) => el.classList.contains('ciclo'));
    if (ciclo) apuntarSubnav(ciclo);
    subnavLinks.forEach((a) => a.classList.toggle('is-active', enMedio(a)));
    subnav.classList.toggle('is-visible', Boolean(ciclo));
    marcarCiclo(ciclo);
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
  rutas.forEach((r) => r.actualizar());

  const max = document.documentElement.scrollHeight - vh;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  bar.classList.toggle('is-dark', dark.getBoundingClientRect().top < 40);
}

function requestUpdate() {
  if (!ticking) { ticking = true; requestAnimationFrame(update); }
}

addEventListener('scroll', requestUpdate, { passive: true });
addEventListener('resize', () => { dibujarCaminos(); requestUpdate(); });
dibujarCaminos();
document.fonts?.ready.then(dibujarCaminos);


update();
observarFades();

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
