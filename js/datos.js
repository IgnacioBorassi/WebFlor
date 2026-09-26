// =========================================================
// DATOS EDITABLES — cambiá acá el contenido y la página se actualiza sola
// =========================================================

// ---------- 2do ciclo · Planificación ----------
// Se muestra como tarjetas ("vista linda") o como cuadro clásico (botón "Cuadro").
const planificacion = {
  datos: {
    'Área': '[Ciencias Naturales]',
    'Grado': '[5.° grado “B”]',
    'Duración': '[8 clases]',
    'Tema': '[Tema de la secuencia]',
  },
  bloques: [
    { titulo: 'Propósitos', items: ['[Propósito 1]', '[Propósito 2]'] },
    { titulo: 'Objetivos', items: ['[Objetivo 1]', '[Objetivo 2]', '[Objetivo 3]'] },
    { titulo: 'Contenidos', items: ['[Contenido 1]', '[Contenido 2]'] },
    { titulo: 'Actividades', items: ['[Actividad de inicio]', '[Actividad de desarrollo]', '[Actividad de cierre]'] },
    { titulo: 'Recursos', items: ['[Recurso 1]', '[Recurso 2]'] },
    { titulo: 'Evaluación', items: ['[Criterio 1]', '[Instrumento de evaluación]'] },
  ],
};

// ---------- 2do ciclo · Trayectoria ----------
// Un objeto por clase. Los colores se asignan solos según la fase.
//   tema:     nombre del tema (título grande)
//   resumen:  1 o 2 líneas para la tarjeta de la página principal
//   texto:    párrafos de la página de la clase (uno por string)
//   fotos:    fotos de la página de la clase. La primera es la de portada.
//             { src: 'img/clase-1/foto1.jpg', pie: 'Descripción' }
//             Si src queda vacío se muestra un recuadro de ejemplo.
const FOTOS_EJEMPLO = [
  { src: '', pie: 'Descripción de la foto' },
  { src: '', pie: 'Descripción de la foto' },
  { src: '', pie: 'Descripción de la foto' },
  { src: '', pie: 'Descripción de la foto' },
  { src: '', pie: 'Descripción de la foto' },
];
const TEXTO_EJEMPLO = [
  'Primer párrafo: se muestra más grande, como introducción a la clase.',
  'Contá qué se hizo, cómo respondió el grupo, qué pasó que no esperabas y qué aprendiste vos.',
  'Podés escribir todos los párrafos que quieras: cada string de esta lista es un párrafo nuevo.',
];

const trayectoria = [
  {
    fase: 'Exploración',
    tema: '[Tema de la clase 1]',
    resumen: 'Breve descripción de lo que se hizo en esta clase.',
    texto: TEXTO_EJEMPLO,
    fotos: FOTOS_EJEMPLO,
  },
  {
    fase: 'Investigación guiada',
    tema: '[Tema de la clase 2]',
    resumen: 'Breve descripción de lo que se hizo en esta clase.',
    texto: TEXTO_EJEMPLO,
    fotos: FOTOS_EJEMPLO,
  },
  {
    fase: 'Investigación guiada',
    tema: '[Tema de la clase 3]',
    resumen: 'Breve descripción de lo que se hizo en esta clase.',
    texto: TEXTO_EJEMPLO,
    fotos: FOTOS_EJEMPLO,
  },
  {
    fase: 'Investigación guiada',
    tema: '[Tema de la clase 4]',
    resumen: 'Breve descripción de lo que se hizo en esta clase.',
    texto: TEXTO_EJEMPLO,
    fotos: FOTOS_EJEMPLO,
  },
  {
    fase: 'Investigación guiada',
    tema: '[Tema de la clase 5]',
    resumen: 'Breve descripción de lo que se hizo en esta clase.',
    texto: TEXTO_EJEMPLO,
    fotos: FOTOS_EJEMPLO,
  },
  {
    fase: 'Investigación guiada',
    tema: '[Tema de la clase 6]',
    resumen: 'Breve descripción de lo que se hizo en esta clase.',
    texto: TEXTO_EJEMPLO,
    fotos: FOTOS_EJEMPLO,
  },
  {
    fase: 'Síntesis',
    tema: '[Tema de la clase 7]',
    resumen: 'Breve descripción de lo que se hizo en esta clase.',
    texto: TEXTO_EJEMPLO,
    fotos: FOTOS_EJEMPLO,
  },
  {
    fase: 'Síntesis',
    tema: '[Tema de la clase 8]',
    resumen: 'Breve descripción de lo que se hizo en esta clase.',
    texto: TEXTO_EJEMPLO,
    fotos: FOTOS_EJEMPLO,
  },
];

// ---------- 1er ciclo · Mensajes mientras no hay contenido ----------
const mensajesPrimerCiclo = [
  'Acá va a haber algo muy importante. Todavía no sabemos qué.',
  'Error 404: ciclo no encontrado.',
  'Si la profe está leyendo esto: ya casi está, lo prometo.',
  'Estamos trabajando para usted. Bueno, en realidad todavía no.',
  'Volvé más tarde. Traé mate.',
  'Seguís tocando el botón. Admiro tu fe.',
];
