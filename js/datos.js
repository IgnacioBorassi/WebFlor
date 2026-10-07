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
  capacidades: [
    {
      nombre: 'Resolución de Problemas',
      descripcion: 'Se les propondrá a los estudiantes situaciones en las que deberán recuperar sus conocimientos, formular hipótesis, buscar y analizar información de diferentes fuentes y establecer relaciones entre distintas evidencias para construir explicaciones sobre las transformaciones de la atmósfera y sus posibles causas.',
    },
    {
      nombre: 'Pensamiento crítico y reflexivo',
      descripcion: 'Se les propondrá a los estudiantes analizar y contrastar diferentes fuentes y perspectivas, fundamentar sus ideas a partir de evidencias y reconocer las distintas responsabilidades y posibilidades de acción de los actores sociales frente a las problemáticas ambientales, para construir una posición ética frente a la problemática.',
    },
  ],
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
// Una parada por etapa de la secuencia. Los colores se asignan solos según la fase.
// Al bajar, la tarjeta muestra el texto completo de cada parada.
//   fase:    etapa de la secuencia (Exploración, Investigación guiada, Síntesis)
//   titulo:  pregunta que guió la parada (puede quedar vacío '')
//   texto:   qué hicieron los estudiantes
const trayectoria = [
  {
    fase: 'Exploración',
    titulo: '',
    texto: 'En esta primera clase, los estudiantes exploraron distintas fuentes vinculadas con las actividades humanas y las transformaciones de la atmósfera, entre ellas imágenes, noticias, gráficos y testimonios. A partir de la rutina Conecto – Pienso – Me pregunto, registraron sus primeras ideas, establecieron relaciones entre la información presentada y formularon preguntas sobre aquello que les generaba curiosidad.',
  },
  {
    fase: 'Exploración',
    titulo: '',
    texto: 'A partir de las ideas que surgieron durante la exploración, los estudiantes retomaron algunas de las fuentes analizadas y profundizaron las relaciones que habían comenzado a establecer. Este trabajo permitió construir colectivamente una hipótesis acerca de cómo algunas actividades humanas pueden modificar la composición del aire y formular nuevas preguntas que orientarían la investigación posterior.',
  },
  {
    fase: 'Investigación guiada',
    titulo: '¿Cómo la atmósfera hace posible la vida en nuestro planeta?',
    texto: 'Los estudiantes partieron de sus ideas iniciales acerca de la importancia de la atmósfera y, organizados en grupos, investigaron diferentes características y funciones a partir de diversas fuentes. Luego, pusieron en común lo investigado y construyeron relaciones entre la composición de la atmósfera, la protección frente a la radiación ultravioleta y el efecto invernadero natural como condiciones que hacen posible la vida en nuestro planeta.',
  },
  {
    fase: 'Investigación guiada',
    titulo: '¿Cómo modificó la Revolución Industrial las formas de producir, utilizar energía y transportarse de las sociedades?',
    texto: 'Los niños investigaron diferentes transformaciones vinculadas con la Revolución Industrial a partir del análisis de distintos casos, como la producción textil, la minería del carbón, el ferrocarril y el crecimiento de las ciudades industriales. A través de un cuadro y del intercambio colectivo, compararon las formas de producir, utilizar energía y transportarse antes y después de este proceso y establecieron relaciones entre los diferentes cambios.',
  },
  {
    fase: 'Investigación guiada',
    titulo: '¿Por qué no todos los actores sociales tienen el mismo grado de responsabilidad en las transformaciones actuales de la atmósfera?',
    texto: 'Los alumnos analizaron la problemática ambiental desde la perspectiva de distintos actores sociales, considerando sus intereses, necesidades, responsabilidades y posibilidades de acción. A partir de este trabajo, construyeron redes de relaciones y comenzaron a problematizar la idea de que todos los actores tienen la misma responsabilidad o las mismas posibilidades de intervenir frente a las transformaciones de la atmósfera.',
  },
  {
    fase: 'Investigación guiada',
    titulo: '¿Cómo podemos satisfacer nuestras necesidades de manera sostenible para el planeta?',
    texto: 'Los estudiantes investigaron diferentes actividades vinculadas con la satisfacción de nuestras necesidades, como la producción de alimentos, el transporte, la generación de electricidad, la agricultura, la construcción y el uso del plástico. A partir de la lectura y selección de información, elaboraron mapas conceptuales en los que relacionaron estas actividades con sus efectos sobre el ambiente y analizaron posibles transformaciones hacia formas más sostenibles de producir y consumir.',
  },
  {
    fase: 'Síntesis',
    titulo: '',
    texto: 'Como cierre de la secuencia, los alumnos recuperaron las investigaciones y producciones realizadas a lo largo del recorrido para elaborar una infografía grupal. Primero realizaron un boceto, luego intercambiaron sus producciones con otros grupos para recibir retroalimentación y, finalmente, revisaron sus decisiones y elaboraron una versión final en la que integraron y relacionaron los principales aprendizajes construidos.',
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
