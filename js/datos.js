// =========================================================
// DATOS EDITABLES — cambiá acá el contenido y la página se actualiza sola
// =========================================================

// ---------- 2do ciclo · Planificación ----------
// Se muestra como tarjetas ("resumen") o como cuadro clásico (botón "Cuadro").
// En los contenidos, la cita final entre paréntesis (CABA, ...) se muestra más chica.
const planificacion = {
  areas: ['Educación Ambiental', 'Ciencias Naturales', 'Ciencias Sociales'],
  ejes: ['Relaciones entre sociedades y naturaleza', 'La Tierra un Lugar en el Universo', 'Espacio y Sociedad'],
  hiloConductor: '¿Qué hace posible la vida en nuestro planeta y cuál es nuestra responsabilidad en su cuidado?',
  recorte: 'El aire que respiramos en nuestro barrio, la atmósfera que compartimos en el planeta: ¿Cómo nuestras formas de vivir pueden transformarla?',
  capacidades: ['Resolución de Problemas', 'Pensamiento Crítico y Reflexivo'],
  objetivos: [
    'Comprender las principales características y la composición de la atmósfera, reconociendo su carácter dinámico y su importancia para la vida a partir de la búsqueda y el análisis de información científica.',
    'Relacionar los cambios en las formas de producir, utilizar energía y transportarse desde la Revolución Industrial hasta la actualidad con las transformaciones producidas sobre la atmósfera.',
    'Conocer las responsabilidades de diferentes actores sociales y las posibles respuestas frente al cambio climático, para construir y fundamentar una posición propia acerca de quiénes pueden actuar, de qué manera y con qué alcances.',
    'Explicar, mediante la construcción y utilización de modelos, cómo determinadas actividades humanas pueden transformar la atmósfera, relacionando el aumento de gases de efecto invernadero con la intensificación del efecto invernadero y el cambio climático y fundamentando una posición ética frente a estas problemáticas.',
  ],
  contenidos: [
    'El ambiente como un sistema complejo conformado por las interacciones entre los sistemas naturales y socioculturales. Los problemas ambientales, entendidos como las alteraciones del equilibrio dinámico de un territorio que resultan de las interacciones entre una población humana y el subsistema natural. (CABA, 2024, p. 482)',
    'Características de la atmósfera terrestre en las que se desarrollan distintos fenómenos. (CABA, 2024, p. 143)',
    'Clima, su variabilidad natural y debida a las acciones humanas. Estrategias de mitigación y adaptación al cambio climático. (CABA, 2024, p. 143)',
    'Procesos que contribuyen a aumentar la concentración de gases de efecto invernadero en la atmósfera y su relación con el cambio climático. (CABA, 2024, p. 143)',
    'Otras formas en las que las actividades humanas afectan la atmósfera (“agujero” de ozono, contaminación atmosférica). (CABA, 2024, p. 143)',
    'Problemáticas ambientales relacionadas con el manejo de recursos naturales. Identificación de causas, actores sociales involucrados y sus diferentes grados de responsabilidad. (CABA, 2024, p. 178)',
    'Reconocimiento de las diferentes escalas de análisis que tienen los problemas ambientales estudiados. Problemáticas ambientales locales, regionales y globales. (CABA, 2024, p. 178)',
    'Los principales riesgos naturales que afectan a las poblaciones de Argentina y a la Ciudad Autónoma de Buenos Aires. Medidas de mitigación y gestión ambiental: reducción de emisiones de gases de efecto invernadero (GEI), gestión integral de cuencas hidrográficas, consumo responsable y reducción de huella de carbono, planificación estratégica para la construcción y movilidad sustentable. (CABA, 2024, p. 178)',
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
