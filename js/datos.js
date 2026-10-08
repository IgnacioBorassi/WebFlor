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
      icono: 'img/capacidades/resolucion-problemas.png',
      descripcion: 'Se les propusieron a los estudiantes situaciones en las que debieron recuperar sus conocimientos, formular hipótesis, buscar y analizar información de diferentes fuentes y establecer relaciones entre distintas evidencias para construir explicaciones sobre las transformaciones de la atmósfera y sus posibles causas.',
    },
    {
      nombre: 'Pensamiento crítico y reflexivo',
      icono: 'img/capacidades/pensamiento-critico.png',
      descripcion: 'Se les propuso a los estudiantes analizar y contrastar diferentes fuentes y perspectivas, fundamentar sus ideas a partir de evidencias y reconocer las distintas responsabilidades y posibilidades de acción de los actores sociales frente a las problemáticas ambientales, para construir una posición ética frente a la problemática.',
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
// Al bajar, la tarjeta muestra el título de cada parada; el texto se despliega al tocar.
//   fase:    etapa de la secuencia (Exploración, Investigación guiada, Síntesis)
//   titulo:  pregunta que guió la parada (siempre visible)
//   huella:  id de su huella de aprendizaje (ver más abajo)
//   texto:   qué hicieron los estudiantes (se despliega al tocar la parada)
const trayectoria = [
  {
    fase: 'Exploración',
    titulo: 'Exploramos con distintas fuentes',
    huella: 'exploracion',
    texto: 'En esta primera clase, los estudiantes exploraron distintas fuentes vinculadas con las actividades humanas y las transformaciones de la atmósfera, entre ellas imágenes, noticias, gráficos y testimonios. A partir de la rutina Conecto – Pienso – Me pregunto, registraron sus primeras ideas, establecieron relaciones entre la información presentada y formularon preguntas sobre aquello que les generaba curiosidad.',
  },
  {
    fase: 'Exploración',
    titulo: 'Pensamos una hipótesis',
    huella: 'exploracion',
    texto: 'A partir de las ideas que surgieron durante la exploración, los estudiantes retomaron algunas de las fuentes analizadas y profundizaron las relaciones que habían comenzado a establecer. Este trabajo permitió construir colectivamente una hipótesis acerca de cómo algunas actividades humanas pueden modificar la composición del aire y formular nuevas preguntas que orientarían la investigación posterior.',
  },
  {
    fase: 'Investigación guiada',
    titulo: '¿Cómo la atmósfera hace posible la vida en nuestro planeta?',
    huella: 'atmosfera',
    texto: 'Los estudiantes partieron de sus ideas iniciales acerca de la importancia de la atmósfera y, organizados en grupos, investigaron diferentes características y funciones a partir de diversas fuentes. Luego, pusieron en común lo investigado y construyeron relaciones entre la composición de la atmósfera, la protección frente a la radiación ultravioleta y el efecto invernadero natural como condiciones que hacen posible la vida en nuestro planeta.',
  },
  {
    fase: 'Investigación guiada',
    titulo: '¿Cómo modificó la Revolución Industrial las formas de producir, utilizar energía y transportarse de las sociedades?',
    huella: 'revolucion',
    texto: 'Los niños investigaron diferentes transformaciones vinculadas con la Revolución Industrial a partir del análisis de distintos casos, como la producción textil, la minería del carbón, el ferrocarril y el crecimiento de las ciudades industriales. A través de un cuadro y del intercambio colectivo, compararon las formas de producir, utilizar energía y transportarse antes y después de este proceso y establecieron relaciones entre los diferentes cambios.',
  },
  {
    fase: 'Investigación guiada',
    titulo: '¿Por qué no todos los actores sociales tienen el mismo grado de responsabilidad en las transformaciones actuales de la atmósfera?',
    huella: 'actores',
    texto: 'Los alumnos analizaron la problemática ambiental desde la perspectiva de distintos actores sociales, considerando sus intereses, necesidades, responsabilidades y posibilidades de acción. A partir de este trabajo, construyeron redes de relaciones y comenzaron a problematizar la idea de que todos los actores tienen la misma responsabilidad o las mismas posibilidades de intervenir frente a las transformaciones de la atmósfera.',
  },
  {
    fase: 'Investigación guiada',
    titulo: '¿Cómo podemos satisfacer nuestras necesidades de manera sostenible para el planeta?',
    huella: 'sostenible',
    texto: 'Los estudiantes investigaron diferentes actividades vinculadas con la satisfacción de nuestras necesidades, como la producción de alimentos, el transporte, la generación de electricidad, la agricultura, la construcción y el uso del plástico. A partir de la lectura y selección de información, elaboraron mapas conceptuales en los que relacionaron estas actividades con sus efectos sobre el ambiente y analizaron posibles transformaciones hacia formas más sostenibles de producir y consumir.',
  },
  {
    fase: 'Síntesis',
    titulo: 'Confeccionamos nuestro producto final',
    huella: 'sintesis',
    texto: 'Como cierre de la secuencia, los alumnos recuperaron las investigaciones y producciones realizadas a lo largo del recorrido para elaborar una infografía grupal. Primero realizaron un boceto, luego intercambiaron sus producciones con otros grupos para recibir retroalimentación y, finalmente, revisaron sus decisiones y elaboraron una versión final en la que integraron y relacionaron los principales aprendizajes construidos.',
  },
];

// ---------- 2do ciclo · Huellas de aprendizaje ----------
// Una huella por etapa, armada a partir de las presentaciones de Canva de Flor.
// Desde cada parada de la ruta hay un botón que lleva a su huella
// (campo "huella" de la trayectoria = "id" de acá).
//
// Cada huella tiene "momentos" (uno por diapositiva). Un momento puede tener:
//   texto:      párrafos
//   destacado:  una frase resaltada (ej. la hipótesis)
//   preguntas:  preguntas de los chicos, en globitos
//   fotos:      [{ src, alt }]  (se amplían al tocarlas)
//   pie:        texto chico debajo de las fotos
//   pasos:      para la síntesis: [{ nombre, texto, foto: { src, alt } }]
// Las fotos ya tienen difuminados los nombres y las caras de los chicos.
// "pendiente: true" muestra un aviso en lugar del contenido.
const H = 'img/huellas/';
const huellas = [
  {
    id: 'exploracion',
    fase: 'Exploración',
    titulo: 'Exploramos con distintas fuentes y pensamos una hipótesis',
    momentos: [
      {
        texto: [
          'Durante la clase de Exploración, los estudiantes trabajaron individualmente con diferentes fuentes, entre ellas imágenes, noticias, gráficos y testimonios, mediante la rutina de pensamiento “Conecto – Pienso – Me pregunto”.',
          'Varios chicos mencionaron las fábricas y los medios de transporte como actividades que liberan gases. Por ejemplo, al analizar un gráfico de emisiones, una de las niñas recuperó el dato de que el transporte representaba el 24 % y señaló que era una cantidad importante porque “puede contaminar muy rápido el aire”.',
        ],
        fotos: [
          { src: H + 'exploracion/1-rutina-a.webp', alt: 'Rutina “Conecto – Pienso – Me pregunto” completada por un estudiante' },
          { src: H + 'exploracion/1-rutina-b.webp', alt: 'Rutina “Conecto – Pienso – Me pregunto” completada por un estudiante' },
          { src: H + 'exploracion/1-rutina-c.webp', alt: 'Rutina “Conecto – Pienso – Me pregunto” completada por un estudiante' },
          { src: H + 'exploracion/1-rutina-d.webp', alt: 'Rutina “Conecto – Pienso – Me pregunto” completada por un estudiante' },
        ],
      },
      {
        texto: ['También surgieron inquietudes relacionadas con los efectos de los gases sobre la salud humana, así como preguntas acerca de las transformaciones de la atmósfera y su evolución a lo largo del tiempo. Entre ellas, los estudiantes formularon:'],
        preguntas: [
          '¿Qué tan tóxicos son esos gases para el ser humano?',
          '¿Qué pasará en un futuro si los autos usan CO₂? ¿Será malo?',
          'Al observar el gráfico de emisiones de 2023, me gustaría saber cómo era antes.',
        ],
      },
      {
        texto: [
          'Para finalizar, los estudiantes respondieron individualmente un ticket de salida con la pregunta: “¿Cómo se relacionan las actividades que realizamos todos los días con los cambios que ocurren en la composición del aire?”.',
          'Entre las respuestas, algunos niños expresaron que “las mismas personas contaminan el medioambiente” o que “la contaminación afecta a las personas, los animales y el planeta”.',
        ],
        fotos: [{ src: H + 'exploracion/3-tickets.webp', alt: 'Cuatro tickets de salida de la clase de Exploración' }],
      },
      {
        texto: ['Posteriormente, se destinó una clase adicional de 40 minutos a retomar las fuentes exploradas y las respuestas iniciales. A partir de un intercambio colectivo, construimos la siguiente hipótesis de manera colectiva:'],
        destacado: 'Creemos que algunas actividades que hacemos las personas pueden modificar la composición del aire porque pueden liberar gases y hacer que aumente la cantidad de algunos gases que ya están en la atmósfera.',
        textoFinal: 'A partir de ella, formulamos nuevas preguntas que orientaron la posterior Investigación Guiada.',
        preguntas: [
          '¿Cómo hace la atmósfera posible la vida en nuestro planeta?',
          '¿Cómo modificó la Revolución Industrial las formas de producir, utilizar energía y transportarse de las sociedades?',
          '¿Todos los actores sociales tienen el mismo grado de responsabilidad en las transformaciones actuales de la atmósfera?',
          '¿Cómo podemos satisfacer nuestras necesidades de manera sostenible para el planeta?',
        ],
      },
    ],
  },
  {
    id: 'atmosfera',
    fase: 'Investigación guiada',
    titulo: '¿Cómo la atmósfera hace posible la vida en nuestro planeta?',
    momentos: [
      {
        texto: ['Para comenzar, presenté a los estudiantes la pregunta orientadora y les propuse registrar cómo creían que la atmósfera hacía posible la vida en nuestro planeta. En sus primeras respuestas, algunos niños mencionaron principalmente la presencia de oxígeno, mientras que otros también hicieron referencia a su función protectora. Por ejemplo, una alumna escribió: “Solamente sabía que respiraba oxígeno”, mientras que otra señaló que creía que la atmósfera “nos protegía de meteoritos”.'],
        fotos: [
          { src: H + 'atmosfera/1-ideas-a.webp', alt: 'Respuesta inicial: “Solamente sabía que respiraba oxígeno”' },
          { src: H + 'atmosfera/1-ideas-b.webp', alt: 'Respuesta inicial: “Antes también creía que nos protegía de meteoritos”' },
          { src: H + 'atmosfera/1-ideas-c.webp', alt: 'Respuesta inicial sobre el oxígeno y la protección frente a los meteoritos' },
          { src: H + 'atmosfera/1-ideas-d.webp', alt: 'Respuesta inicial: “Pensaba que teníamos vida por la atmósfera porque sólo era una capa y aire”' },
        ],
      },
      {
        texto: ['Organizados en grupos, investigaron a partir de cuatro textos numerados, registrando de qué trataba cada uno, qué información aportaba para responder nuestra pregunta y qué nuevos interrogantes les surgían. En sus cuadros recuperaron diferentes funciones de la atmósfera, entre ellas la presencia de gases necesarios para la vida, la protección frente a la radiación ultravioleta y la regulación de la temperatura.'],
        fotos: [
          { src: H + 'atmosfera/2-grupos-a.webp', alt: 'Estudiantes trabajando en grupo con los textos' },
          { src: H + 'atmosfera/2-grupos-b.webp', alt: 'Estudiantes trabajando en grupo con los textos' },
          { src: H + 'atmosfera/2-cuadro-a.webp', alt: 'Cuadro grupal “Investigamos la atmósfera”' },
          { src: H + 'atmosfera/2-cuadro-b.webp', alt: 'Cuadro grupal “Investigamos la atmósfera”' },
        ],
      },
      {
        texto: [
          'Durante la puesta en común surgieron diferentes interpretaciones sobre el efecto invernadero. Por ejemplo, algunos alumnos expresaron ideas similares a: “El efecto invernadero lo crearon los seres humanos para mantener la temperatura de la Tierra” o “Gracias a las personas, el efecto invernadero ayuda a regular la temperatura del planeta”.',
          'Frente a estas intervenciones, pregunté: “¿Todos están de acuerdo con eso? ¿El efecto invernadero lo crearon los seres humanos? ¿Qué opinan?”.',
          'Esto dio lugar a nuevos aportes, entre los cuales un alumno expresó una idea similar a: “Yo entendí que el efecto invernadero ya existía antes, porque ayuda a mantener la temperatura de la Tierra. Lo que hacen las personas es que haya más gases y aumente la temperatura”.',
        ],
      },
      {
        texto: ['Finalmente, los estudiantes respondieron de manera individual un ticket de salida, retomando la pregunta inicial. En sus producciones mencionaron diferentes funciones de la atmósfera. Por ejemplo, una de las niñas explicó que nos proporciona oxígeno, que la capa de ozono nos protege de la radiación UV y que los gases de efecto invernadero contribuyen a retener el calor. En otros registros también aparecieron referencias a su importancia para las comunicaciones y la regulación de la temperatura.'],
        fotos: [
          { src: H + 'atmosfera/4-tickets-a.webp', alt: 'Ticket de salida sobre las funciones de la atmósfera' },
          { src: H + 'atmosfera/4-tickets-b.webp', alt: 'Ticket de salida sobre las funciones de la atmósfera' },
          { src: H + 'atmosfera/4-tickets-c.webp', alt: 'Ticket de salida sobre las funciones de la atmósfera' },
        ],
      },
    ],
  },
  {
    id: 'revolucion',
    fase: 'Investigación guiada',
    titulo: '¿Cómo modificó la Revolución Industrial las formas de producir, utilizar energía y transportarse de las sociedades?',
    momentos: [
      {
        texto: [
          'Para continuar con la Investigación Guiada, los estudiantes trabajaron grupalmente con seis casos vinculados con las transformaciones producidas durante la industrialización en Inglaterra. A partir de diferentes relatos e imágenes, completaron un cuadro en el que debían identificar cómo era cada actividad anteriormente, qué transformaciones se habían producido, qué evidencias de las fuentes permitían sostener sus respuestas y con qué otros cambios podían relacionarlas.',
          'En sus producciones aparecieron diferentes comparaciones entre el antes y el después. Por ejemplo, al analizar la producción textil, uno de los grupos señaló que anteriormente era “lenta y costosa”, mientras que luego pasó a ser “barata y con más producción”. En relación con el campo y las ciudades, otro grupo registró que antes “las actividades eran en el campo manualmente y la vida de las personas era más cansadora porque el trabajo era a mano”. Al investigar la minería del carbón, los chicos mencionaron que anteriormente “usaban carretas y niveles más altos”, mientras que luego aparecieron “excavaciones profundas”. En el caso del ferrocarril, uno de los grupos escribió que antes “los envíos eran tardíos” y que después “ahora los envíos son más rápidos y sencillos”.',
          'Por otro lado, en la última columna del cuadro, destinada a establecer relaciones entre los diferentes casos, los estudiantes también registraron algunas conexiones entre las transformaciones investigadas. Por ejemplo, vincularon la producción textil con los cambios producidos en el campo y las ciudades, así como el desarrollo del ferrocarril con la minería del carbón. En otros registros, las respuestas se limitaron a mencionar el caso con el que encontraban una relación.',
        ],
        fotos: [
          { src: H + 'revolucion/1-cuadro-a.webp', alt: 'Cuadro grupal “Investigamos las transformaciones de la industrialización”' },
          { src: H + 'revolucion/1-cuadro-b.webp', alt: 'Cuadro grupal “Investigamos las transformaciones de la industrialización”' },
          { src: H + 'revolucion/1-cuadro-c.webp', alt: 'Cuadro grupal “Investigamos las transformaciones de la industrialización”' },
        ],
      },
      {
        texto: [
          'Durante la puesta en común retomamos algunas de las relaciones que los grupos habían establecido entre los diferentes casos. A través de distintas preguntas, fuimos recuperando sus aportes para vincular las transformaciones en las formas de producción con la utilización de nuevas fuentes de energía, el desarrollo del ferrocarril y el crecimiento de las ciudades.',
          'A continuación, se presenta una reconstrucción, en formato de historieta, de algunas de las intervenciones que surgieron durante este intercambio.',
        ],
        fotos: [{ src: H + 'revolucion/2-historieta-a.webp', alt: 'Historieta que reconstruye la puesta en común sobre la Revolución Industrial' }],
        grande: true,
      },
      {
        texto: ['Para finalizar la puesta en común, retomamos nuestra pregunta orientadora: “¿Cómo modificó la Revolución Industrial las formas de producir, utilizar energía y transportarse de las sociedades?”. A partir de los aportes de los diferentes grupos, fuimos construyendo una respuesta colectiva. A medida que los estudiantes incorporaban nuevas ideas, las registrábamos en el pizarrón y establecíamos relaciones entre los cambios en la producción, la utilización del carbón como fuente de energía, el desarrollo del ferrocarril y el crecimiento de las ciudades.'],
        fotos: [{ src: H + 'revolucion/3-historieta-b.webp', alt: 'Historieta con la conclusión colectiva de la clase' }],
        pie: 'Reconstrucción en historieta de la clase.',
        grande: true,
      },
    ],
  },
  {
    id: 'actores',
    fase: 'Investigación guiada',
    titulo: '¿Por qué no todos los actores sociales tienen el mismo grado de responsabilidad en las transformaciones actuales de la atmósfera?',
    momentos: [
      {
        texto: ['En las redes conceptuales elaboradas por los grupos aparecieron distintas necesidades, posibilidades de intervención y relaciones según el actor social investigado. En el caso del Estado, los estudiantes registraron entre las decisiones que se encontraban a su alcance “establecer leyes obligatorias, sancionar incumplimientos”. Desde la perspectiva de una fábrica de indumentaria, recuperaron necesidades como “tener empleados” y “tener materia prima”, y establecieron relaciones con los consumidores, los trabajadores y el Estado. Por su parte, el grupo que investigó a una organización ambiental señaló que “se debería regular la quema de retazos porque dañan el entorno y contaminan el aire” y, al pensar sus posibilidades de intervención, escribió: “Podemos hacer campañas, presentar reclamos o pedir cambios pero no tomamos las decisiones”. Por último, al analizar la perspectiva de los vendedores de locales más chicos, otro grupo señaló como beneficio “vender mucho y ganar plata” y como problema “tener mucho stock y no venderlo”.'],
        fotos: [
          { src: H + 'actores/1-red-a.webp', alt: 'Red conceptual sobre una organización ambiental' },
          { src: H + 'actores/1-red-b.webp', alt: 'Red conceptual “La nueva fábrica de indumentaria”' },
          { src: H + 'actores/1-red-c.webp', alt: 'Red conceptual sobre una fábrica textil' },
          { src: H + 'actores/1-red-d.webp', alt: 'Red conceptual “La fábrica textil”' },
        ],
      },
      {
        texto: ['En los tickets de salida, los estudiantes respondieron individualmente a la pregunta: “¿Por qué no todos los actores sociales tienen el mismo grado de responsabilidad en las transformaciones actuales de la atmósfera?”. Entre las respuestas, uno de los estudiantes señaló que “hay grupos que no tienen las herramientas para decidir algunas cosas”. Otros recuperaron diferencias vinculadas con las acciones de los actores investigados. Por ejemplo, escribieron: “Porque algunos producen más mercadería que otros o producen de más”, “Porque cada uno cumple un rol” y “Porque algunos de los que contaminan no contaminan porque quieren”.'],
        fotos: [
          { src: H + 'actores/2-ticket-a.webp', alt: 'Ticket de salida sobre la responsabilidad de los actores sociales' },
          { src: H + 'actores/2-ticket-b.webp', alt: 'Ticket de salida sobre la responsabilidad de los actores sociales' },
          { src: H + 'actores/2-ticket-c.webp', alt: 'Ticket de salida sobre la responsabilidad de los actores sociales' },
          { src: H + 'actores/2-ticket-d.webp', alt: 'Ticket de salida sobre la responsabilidad de los actores sociales' },
          { src: H + 'actores/2-ticket-e.webp', alt: 'Ticket de salida sobre la responsabilidad de los actores sociales' },
          { src: H + 'actores/2-ticket-f.webp', alt: 'Ticket de salida sobre la responsabilidad de los actores sociales' },
        ],
      },
    ],
  },
  {
    id: 'sostenible',
    fase: 'Investigación guiada',
    titulo: '¿Cómo podemos satisfacer nuestras necesidades de manera sostenible para el planeta?',
    momentos: [
      {
        texto: [
          'En los mapas conceptuales elaborados por los grupos aparecieron relaciones entre diferentes formas de producción y consumo, sus consecuencias sobre la atmósfera y posibles transformaciones hacia prácticas más sostenibles. En el mapa sobre la construcción, por ejemplo, los estudiantes relacionaron “la extracción y producción de minerales” con las “emisiones de CO₂” y señalaron que estas “intensifican el efecto invernadero”. Como alternativa propusieron “hacer que haya menos emisiones de CO₂”, vinculándolo con una reducción de los gases de efecto invernadero.',
          'En otras producciones se establecieron relaciones similares a partir de diferentes casos. En el mapa sobre electricidad, los chicos recuperaron que anteriormente se utilizaban “combustibles fósiles” y explicaron que “se usaba carbón, petróleo y gas porque estas compuestas de C y se mezclaba con el O₂ del aire”, relacionando este proceso con el aumento del CO₂ en la atmósfera y el efecto invernadero. Frente a esto, incorporaron como transformación el reemplazo por “paneles solares y parque eólico”. Por su parte, en el mapa sobre agricultura registraron que la agricultura intensiva necesitaba “más fertilizantes” y producía “más daños en el suelo”, mientras que como transformación propusieron “obtener la misma cantidad de cultivos sin dañar el suelo, usar fertilizantes ni hacer descender el nivel del agua subterránea”.',
        ],
        fotos: [
          { src: H + 'sostenible/1-mapa-construccion.webp', alt: 'Mapa conceptual sobre la construcción' },
          { src: H + 'sostenible/1-mapa-electricidad.webp', alt: 'Mapa conceptual sobre la electricidad' },
          { src: H + 'sostenible/1-mapa-agricultura.webp', alt: 'Mapa conceptual sobre la agricultura' },
        ],
      },
      {
        texto: [
          'En otras producciones, los estudiantes recuperaron transformaciones vinculadas con los materiales, el consumo y el transporte. En el mapa sobre el plástico, registraron el uso de petróleo y gas natural para su producción y establecieron relaciones con la contaminación. Al pensar posibles transformaciones, se preguntaron: “¿Era necesario producir un plástico nuevo para cumplir esta función?”. A partir de allí, propusieron alternativas como “reemplazar por vidrio” y “usar menos plástico”, incorporando también la reutilización.',
          'En el mapa sobre alimentos y consumismo, los chicos partieron del “sobreconsumo” y del “desperdicio de comida” y registraron diferentes alternativas, entre ellas “planificar mejor las actividades”, “redistribuir alimentos todavía aptos para el consumo” y “comprar la cantidad justa”.',
          'Por último, en el mapa sobre transporte, los estudiantes relacionaron el uso del petróleo con la producción de energía y la contaminación. Al pensar posibles transformaciones, incorporaron la electricidad como alternativa y propusieron cambios en los medios de transporte.',
        ],
        fotos: [
          { src: H + 'sostenible/2-mapa-plastico.webp', alt: 'Mapa conceptual sobre el plástico' },
          { src: H + 'sostenible/2-mapa-alimentos.webp', alt: 'Mapa conceptual sobre alimentos y consumismo' },
          { src: H + 'sostenible/2-mapa-transporte.webp', alt: 'Mapa conceptual sobre el transporte' },
        ],
      },
    ],
  },
  {
    id: 'sintesis',
    fase: 'Síntesis',
    titulo: 'Confeccionamos nuestro producto final',
    momentos: [
      {
        titulo: 'Grupo 1',
        pasos: [
          { nombre: 'Boceto', texto: 'En el boceto, el grupo organizó la infografía a partir de diferentes preguntas vinculadas con la atmósfera, las actividades humanas, las transformaciones desde la Revolución Industrial y el cambio climático. La producción combinaba explicaciones escritas con algunos dibujos y esquemas.', foto: { src: H + 'sintesis/1-boceto.webp', alt: 'Boceto de la infografía del grupo 1' } },
          { nombre: 'Retroalimentación', texto: 'En la retroalimentación, sus compañeros destacaron especialmente “la 4 y las imágenes de la 2”, señalando que “las imágenes están bien logradas y son comprensibles” y que el punto 4 “llega al punto de la pregunta”. Como aspecto a revisar, señalaron el punto 1 porque “no se llega a entender bien su contenido” y mencionaron el uso de “muchas comas y mal usadas”.', foto: { src: H + 'sintesis/1-devolucion.webp', alt: 'Ficha de retroalimentación entre pares para el grupo 1' } },
          { nombre: 'Versión final', texto: 'En la versión final, el grupo mantuvo la organización a partir de los diferentes interrogantes, incorporó títulos y recuadros diferenciados y agregó recursos gráficos en distintos apartados. También aparece desarrollada nuevamente la explicación inicial sobre la atmósfera y su importancia para la vida (correspondiente al punto 1 de la retroalimentación de sus pares).', foto: { src: H + 'sintesis/1-final.webp', alt: 'Infografía final del grupo 1, “La atmósfera”' } },
        ],
      },
      {
        titulo: 'Grupo 2',
        pasos: [
          { nombre: 'Boceto', texto: 'En el boceto inicial, el grupo organizó la información en diferentes apartados vinculados con la atmósfera y su composición, el efecto invernadero, la Revolución Industrial y distintas problemáticas relacionadas con las actividades humanas. La información se encontraba distribuida principalmente en cuadros con explicaciones escritas.', foto: { src: H + 'sintesis/2-boceto.webp', alt: 'Boceto de la infografía del grupo 2' } },
          { nombre: 'Retroalimentación', texto: 'Durante la instancia de retroalimentación entre pares, otro grupo destacó la explicación sobre la atmósfera y escribió: “Está muy bien lograda la información de la atmósfera, está muy bien explicado y se entiende claro”. Como aspecto a revisar, señalaron: “No nos quedó muy clara la información de la Revolución Industrial, proponemos agregar contexto”.', foto: { src: H + 'sintesis/2-devolucion.webp', alt: 'Ficha de retroalimentación entre pares para el grupo 2' } },
          { nombre: 'Versión final', texto: 'En su última versión, el grupo mantuvo un apartado dedicado a la Revolución Industrial sin realizar cambios con respecto a la retroalimentación y volvió a organizar la información mediante un cuadro. La infografía se organizó alrededor de una imagen central e incorporaron flechas, ilustraciones y apartados dedicados al efecto invernadero, los actores sociales y sus responsabilidades, las posibles transformaciones y el cambio climático.', foto: { src: H + 'sintesis/2-final.webp', alt: 'Infografía final del grupo 2, “Lo que pasa en la atmósfera”' } },
        ],
      },
      {
        titulo: 'Grupo 3',
        pasos: [
          { nombre: 'Boceto', texto: 'En el inicio el grupo ubicó la atmósfera en el centro y organizó a su alrededor diferentes apartados vinculados con su importancia para la vida, el efecto invernadero, las transformaciones desde la Revolución Industrial, los actores sociales y las posibles transformaciones. La información se encontraba presentada principalmente mediante textos escritos, sin dibujos.', foto: { src: H + 'sintesis/3-boceto.webp', alt: 'Boceto de la infografía del grupo 3' } },
          { nombre: 'Retroalimentación', texto: 'En la retroalimentación entre pares, otro grupo destacó diferentes elementos de la producción y escribió: “La idea central, los puntos son claros, viñetas de punto y el efecto invernadero. Los dibujitos me gustaron”. Como aspecto a revisar, señalaron que había “errores de ortografía varios” y realizaron una observación sobre la explicación de la Revolución Industrial.', foto: { src: H + 'sintesis/3-devolucion.webp', alt: 'Ficha de retroalimentación entre pares para el grupo 3' } },
          { nombre: 'Versión final', texto: 'Por último en la versión final, el grupo mantuvo la atmósfera como elemento central y conservó la distribución de los diferentes contenidos a su alrededor. Los apartados aparecen delimitados mediante recuadros y se incorporaron ilustraciones, aunque persisten algunas faltas de ortografía.', foto: { src: H + 'sintesis/3-final.webp', alt: 'Infografía final del grupo 3, “La atmósfera”' } },
        ],
      },
      {
        titulo: 'Grupo 4',
        pasos: [
          { nombre: 'Boceto', texto: 'Al inicio, el grupo organizó la información alrededor de un recuadro central dedicado a la atmósfera y distribuyó a su alrededor diferentes apartados numerados. Entre ellos incluyeron información sobre las actividades humanas y su relación con la atmósfera, la Revolución Industrial, los actores sociales, el efecto invernadero y posibles transformaciones.', foto: { src: H + 'sintesis/4-boceto.webp', alt: 'Boceto de la infografía del grupo 4' } },
          { nombre: 'Retroalimentación', texto: 'Durante la instancia de retroalimentación entre pares, otro grupo destacó el punto 2 y escribió: “Está bien el punto 2 porque está bien relacionado y tiene info sobre el efecto invernadero”. Como aspectos a revisar, señalaron: “Tienen que mejorar la letra para que se entienda mejor y un título para cada punto”. También realizaron una observación vinculada con los porcentajes del nitrógeno incluidos en el punto 1.', foto: { src: H + 'sintesis/4-devolucion.webp', alt: 'Ficha de retroalimentación entre pares para el grupo 4' } },
          { nombre: 'Versión final', texto: 'En la versión final, el grupo mantuvo la organización de la atmósfera como elemento central y los diferentes contenidos distribuidos a su alrededor. Los apartados aparecen identificados mediante títulos como “Revolución Industrial”, “Actores sociales”, “Efecto invernadero” y “Posibles transformaciones”, y fueron diferenciados mediante recuadros de distintos colores. En el espacio central dedicado a la atmósfera aparecen explicitados los porcentajes de N₂ 78 % y O₂ 21 %. También incorporaron ilustraciones y un título vinculadas con algunos de los contenidos desarrollados.', foto: { src: H + 'sintesis/4-final.webp', alt: 'Infografía final del grupo 4, “La atmósfera está cambiando”' } },
        ],
      },
    ],
  },
];

// ---------- 2do ciclo · Construcción de identidad docente AIE ----------
// Cada apartado es desplegable: se ve el título y el subtítulo; al abrirlo,
// la evidencia (opcional), el texto y el botón "Mirá el desempeño", que abre el link en otra pestaña.
//   link: pegá acá el link del documento. Si queda vacío, el botón aparece deshabilitado.
const aie = [
  {
    titulo: 'Conceptualización',
    subtitulo: "Se define como la aptitud que permite: “Integrar el conocimiento de los contenidos con los marcos educativos y curriculares y con una comprensión amplia de la formación general en orden a los procesos de planificación, implementación, evaluación y reflexión.” (UCA, 2022, p.21)",
    evidencia: 'Ciencias Sociales y su Enseñanza - 2025',
    texto: [
      "Elegí como evidencia el Desempeño Final de la unidad curricular Ciencias Sociales y su Enseñanza. En éste pude recuperar una secuencia didáctica que había planificado e implementado previamente y volver sobre las decisiones tomadas para analizarlas. Esto me permitió fundamentar, desde los marcos analíticos específicos del área, por qué esas decisiones resultaban pertinentes para ese contenido, ese contexto y esos estudiantes. Esto se relaciona directamente con lo propuesto en el programa de la unidad curricular, que plantea el desarrollo de la Conceptualización a partir del manejo de distintos marcos disciplinares y de la superación de una perspectiva fragmentada de las Ciencias Sociales, recuperando las miradas y experiencias de los niños como punto de partida para la construcción de conocimiento (UCA, 2025).",
      "Uno de los aprendizajes significativos que construí durante esta materia fue transformar mi propia concepción acerca de la enseñanza de las Ciencias Sociales. Mi experiencia como alumna había estado vinculada con una enseñanza focalizada en acontecimientos, fechas y datos que debían ser aprendidos. A lo largo de la cursada pude descubrir otra manera de pensar su enseñanza: partir de la realidad que los niños conocen para ayudarlos a profundizarla, problematizarla y comprender su complejidad (Rodríguez & Rodríguez Villoldo, 2025). Esta transformación aparece en el propio Desempeño Final, cuando reconozco el pasaje de una enseñanza más vinculada a la transmisión, hacia otra orientada a comprender, interpretar y analizar la realidad social.",
      "En relación con lo anterior, comprendí la importancia del recorte didáctico y de los conceptos areales para abordar la complejidad de la realidad social. Rodríguez y Rodríguez Villoldo (2025) definen el recorte como “una parte de la realidad social ‘cercana’ a los niños, por lo tanto es multidimensional, conserva su complejidad y tiene su propia lógica sin perder la relación con el resto de la realidad” (p. 33). A partir del trabajo realizado en la materia, comprendí que construir un recorte supone delimitar intencionalmente esa realidad, seleccionando determinados aspectos y relaciones para convertirlos en objeto de enseñanza, sin descuidar esa complejidad. En esta construcción, los conceptos areales resultan fundamentales, ya que funcionan como categorías de análisis que permiten orientar la indagación, establecer relaciones entre sus diferentes dimensiones y profundizar progresivamente su comprensión. De esta forma, enseñar Ciencias Sociales también implica ofrecer a los niños herramientas conceptuales que les permitan construir interpretaciones cada vez más complejas sobre ella. Esto también me llevó a reconocer la importancia de la investigación previa del docente. Por ejemplo para construir un recorte, seleccionar los conceptos desde los cuales abordarlo y formular preguntas que problematicen la realidad, necesito primero conocerla, interrogarla y complejizar mi propia comprensión.",
      "Considero que estos aprendizajes se hicieron visibles durante mi Residencia. Al planificar la secuencia sobre la atmósfera, construí el recorte “El aire que respiramos en nuestro barrio, la atmósfera que compartimos en el planeta: ¿Cómo nuestras formas de vivir pueden transformarla?”, que me permitió delimitar una problemática cercana a los estudiantes sin perder las relaciones que la atravesaban. A partir de este recorte, la atmósfera no fue abordada únicamente desde su composición y funcionamiento, sino también desde las relaciones entre las actividades humanas, sus transformaciones y las responsabilidades de diferentes actores sociales. Conceptos areales como la multicausalidad y los actores sociales funcionaron como herramientas para orientar la indagación. Pero primero, para construir y abordar este recorte necesité realizar una investigación previa que me permitiera formularme preguntas significativas, seleccionar distintas fuentes y recuperar las ideas iniciales de los estudiantes para ponerlas en diálogo con nuevas evidencias. Esta decisión recupera una cuestión importante en la enseñanza del área: “son necesarias buenas preguntas que pongan ‘en crisis’ esas estructuras cognitivas y los inviten a adaptarlas desarrollando capacidades e incorporando conocimiento científico” (Rodríguez & Rodríguez Villoldo, 2025, p. 113). Además, el trabajo con distintas fuentes me permitió acercar a los estudiantes a diferentes perspectivas y construir explicaciones más complejas sobre la problemática, ya que su análisis posibilita “un acercamiento rico y complejo” a la realidad social (Rodríguez & Rodríguez Villoldo, 2025, p. 118). De esta manera, la propuesta buscó que los niños no solo comprendieran esa realidad, sino que también pudieran tomar una posición fundamentada frente a ella y pensar posibles formas de transformación (especialmente en la clase donde trabajamos diferentes actores sociales).",
      "Al mirar este recorrido, considero que puedo reconocer un avance desde el Nivel III de Conceptualización trabajado en Ciencias Sociales y su Enseñanza, hacia el Nivel IV durante mi Residencia. Este nivel plantea el dominio de las áreas disciplinares y del vínculo existente entre ellas, así como la integración intencional, autónoma y flexible de los conocimientos disciplinares con los marcos analíticos de la formación docente y los marcos curriculares e institucionales (UCA, 2022).",
      "Considero que esto lo trabajé al momento de articular intencionalmente Ciencias Naturales y Ciencias Sociales para comprender una misma problemática desde diferentes perspectivas. Esta articulación responde a una idea presente en el programa de la materia que explica que, aunque en el segundo ciclo comience una mayor diferenciación entre el estudio de lo social y lo natural, ambas áreas estudian una misma realidad y, por lo tanto, es necesario sostener un abordaje interdisciplinario (UCA, 2025). Durante la Residencia pude recuperar aprendizajes construidos previamente y utilizarlos con mayor autonomía para tomar decisiones sobre qué enseñar y cómo hacerlo (como expliqué anteriormente).",
      "Finalmente, este recorrido me permitió comprender que conceptualizar va más allá de conocer aquello que voy a enseñar. Implica también poder investigarlo, interrogarlo desde diferentes marcos, establecer relaciones entre disciplinas y tomar decisiones fundamentadas en relación a la didáctica de cada área para transformarlo en una propuesta significativa para un grupo de niños en particular.",
    ],
    link: "https://docs.google.com/document/d/13Bv3XLvHm7H4y0JwhjBw9l_-KOtX0218/edit?usp=sharing&ouid=101111947899605011022&rtpof=true&sd=true",
  },
  {
    titulo: 'Diagnóstico',
    subtitulo: '[Subtítulo]',
    texto: ['Texto de diagnóstico.'],
    link: '',
  },
  {
    titulo: 'Gestión efectiva',
    subtitulo: '[Subtítulo]',
    texto: ['Texto de gestión efectiva.'],
    link: '',
  },
  {
    titulo: 'Comunicación',
    subtitulo: '[Subtítulo]',
    texto: ['Texto de comunicación.'],
    link: '',
  },
  {
    titulo: 'Interacción Inclusiva',
    subtitulo: '[Subtítulo]',
    texto: ['Texto de interacción inclusiva.'],
    link: '',
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
