import crbxLogo from "@/assets/crbx-logo.png";
import crbxLogoCircle from "@/assets/crbx-logo-circle.png";
import carbeGlobalLogo from "@/assets/carbe-global-logo.png";
import creatorLive from "@/assets/creator-live.jpg";
import liveGifts from "@/assets/live-gifts.jpg";
import emailBanner from "@/assets/email-banner.png";
import heroBg from "@/assets/hero-bg.jpg";

export interface DocumentoSeccion {
  titulo: string;
  subtitulo?: string;
  contenido: string;
  puntos?: string[];
  tabla?: {
    encabezados: string[];
    filas: string[][];
  };
  destacado?: {
    tipo: "tip" | "warning" | "formula" | "meta";
    titulo: string;
    texto: string;
  };
}

export interface DocumentoAgencia {
  id: string;
  codigo: string;
  version: string;
  clasificacion: string;
  fechaActualizacion: string;
  departamento: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  imagen: string;
  colorAcento: "cyan" | "pink" | "gold" | "emerald";
  duracionLectura: string;
  puntosClave: string[];
  resumenEjecutivo: string;
  checklistFinal: string[];
  secciones: DocumentoSeccion[];
}

export const documentosAgenciaOficiales: DocumentoAgencia[] = [
  {
    id: "doc-crbx-01",
    codigo: "CRBX-DOC-2025-01",
    version: "v3.4 Oficial",
    clasificacion: "CONFIDENCIAL — CREADORES ACTIVOS CRBX",
    fechaActualizacion: "Enero 2025",
    departamento: "Dirección de Operaciones & Talento TikTok LIVE",
    titulo: "Playbook Maestro de Operaciones CRBX TikTok LIVE 2025",
    subtitulo:
      "Manual operativo integral: metodología de soporte, aceleración de cuentas y modelo de agencia sin comisiones",
    descripcion:
      "Documento oficial maestro de la agencia CRBX (Carbe Global Corp SAC). Establece los protocolos de trabajo entre el manager asignado y el creador, la infraestructura de soporte por WhatsApp 24/7, el monitoreo detrás de cámara y los escalones de crecimiento en Latinoamérica.",
    imagen: creatorLive,
    colorAcento: "cyan",
    duracionLectura: "15 min de estudio",
    puntosClave: [
      "100% de los regalos y diamantes van íntegros al creador (cero comisiones cobradas al talento)",
      "Monitoreo humano en vivo para advertir caídas de audiencia y sugerir dinámicas al instante",
      "Canal de comunicación directa por WhatsApp 24/7 con tu manager asignado",
      "Acceso a campañas y bonificaciones de tráfico oficiales de TikTok LIVE Backstage",
    ],
    resumenEjecutivo:
      "Este manual define el compromiso operativo de CRBX como agencia oficial de TikTok LIVE. Nuestra labor consiste en actuar como tu equipo técnico y estratégico detrás de la pantalla: monitoreamos tus directos en tiempo real, te enviamos pautas y guiones por chat privado cuando la audiencia baja, y gestionamos tu relación oficial con la plataforma para evitar sanciones y maximizar tus ingresos sin descontar un solo centavo de tus diamantes.",
    checklistFinal: [
      "Tener registrado el número de WhatsApp de tu manager de CRBX",
      "Configurar la calidad de video y audio según la norma técnica",
      "Transmitir mínimo 40 horas al mes para calificar a bonificaciones de la agencia",
      "Avisar con 30 minutos de anticipación antes de iniciar un directo especial o batalla",
    ],
    secciones: [
      {
        titulo: "1. Filosofía y Modelo Financiero de la Agencia",
        subtitulo: "¿Cómo opera CRBX y por qué no cobramos comisión?",
        contenido:
          "En el ecosistema oficial de TikTok LIVE, las agencias certificadas (como CRBX / Carbe Global Corp SAC) recibimos incentivos y remuneración directamente de la infraestructura global de TikTok cuando nuestros creadores crecen y cumplen metas de transmisión.\n\nEsto significa que el creador NO paga ninguna mensualidad, porcentaje ni comisión sobre sus regalos. El 100% de los diamantes que tus seguidores te donan ingresan de forma directa e intacta a tu cuenta bancaria o billetera de TikTok. Nuestro beneficio radica exclusivamente en que alcances tu máximo potencial en la plataforma.",
        destacado: {
          tipo: "tip",
          titulo: "Garantía de Transparencia Total",
          texto:
            "CRBX nunca te solicitará tus contraseñas personales ni acceso a tus métodos de cobro. Toda la vinculación se realiza mediante la invitación oficial in-app de TikTok LIVE Creator Network.",
        },
      },
      {
        titulo: "2. Monitoreo Detrás de la Pantalla en Tiempo Real",
        subtitulo: "Tu copiloto estratégico durante cada transmisión",
        contenido:
          "Una de las mayores ventajas de pertenecer a CRBX es que no estás solo mientras transmites. Nuestro equipo de soporte monitorea tus directos desde el panel interno:\n\n• Detección de Caídas: Si tus espectadores bajan de golpe, te avisamos por WhatsApp para cambiar de tema antes de que el algoritmo reduzca tu distribución.\n• Envío de Discursos y Retos: Te pasamos frases, dinámicas y preguntas preparadas para disparar el chat.\n• Alertas Preventivas de Infracción: Si detectamos música con copyright sensible o una acción que roce las políticas de TikTok, te alertamos inmediatamente para corregirlo.",
        puntos: [
          "Notificación inmediata ante anomalías de audiencia",
          "Recomendaciones de cambios de ritmo y tono en vivo",
          "Monitoreo de latencia y estabilidad de streaming",
        ],
      },
      {
        titulo: "3. Niveles de Creadores y Metas Mensuales de la Agencia",
        subtitulo: "Tabla de escalamiento dentro de CRBX",
        contenido:
          "Para estructurar el soporte personalizado, dividimos a nuestros creadores en tres rangos según su constancia y volumen de diamantes mensuales:",
        tabla: {
          encabezados: [
            "Nivel Creador",
            "Horas Mínimas / Mes",
            "Diamantes Mensuales",
            "Beneficio Exclusivo",
          ],
          filas: [
            ["Rookie Star", "30 horas", "0 - 50,000", "Manager de soporte + Revisión semanal"],
            [
              "Pro Streamer",
              "45 horas",
              "50,000 - 300,000",
              "Monitoreo prioritario + Guiones para batallas",
            ],
            [
              "Elite Ambassador",
              "60 horas",
              "300,000+",
              "Pauta de tráfico oficial + Manager VIP 24/7",
            ],
          ],
        },
      },
    ],
  },
  {
    id: "doc-crbx-02",
    codigo: "CRBX-DOC-2025-02",
    version: "v4.1 Avanzada",
    clasificacion: "METODOLOGÍA TÉCNICA — ALGORITMO Y TRÁFICO",
    fechaActualizacion: "Enero 2025",
    departamento: "Laboratorio de Algoritmos & Analítica de Datos",
    titulo: "Manual del Algoritmo de TikTok LIVE: Dominio del Feed 'Para Ti'",
    subtitulo:
      "Factores de ponderación en tiempo real, ventanas de prueba algorítmica y aceleración de retención",
    descripcion:
      "Análisis exhaustivo del sistema de recomendación de transmisiones en directo de TikTok. Desglosa las señales de engagement que determinan si una transmisión es enviada a miles de usuarios nuevos o frenada en el feed.",
    imagen: heroBg,
    colorAcento: "pink",
    duracionLectura: "18 min de estudio",
    puntosClave: [
      "Los primeros 3 a 5 segundos determinan el 70% de la tasa de retención del espectador",
      "La velocidad de comentarios por minuto (CPM) es el multiplicador más potente del tráfico nuevo",
      "Cada regalo recibido genera un impulso temporal de visibilidad en el feed 'Para Ti'",
      "El 'Efecto Avalancha': cómo sincronizar cofres de monedas con picos de audiencia",
    ],
    resumenEjecutivo:
      "TikTok evalúa las transmisiones en vivo mediante ciclos de micro-pruebas (batches de 20 a 50 espectadores). Si este grupo interactúa (deja un comentario, toca la pantalla para dar me gustas o permanece más de 30 segundos), el sistema abre la compuerta y envía 200 personas más. Si la sala está en silencio o el espectador sale en menos de 3 segundos, la distribución se detiene. Este manual enseña a mantener la sala caliente en cada segundo.",
    checklistFinal: [
      "Saludar a los espectadores por su nombre en cuanto aparecen en pantalla",
      "Fijar una pregunta polémica o curiosa en los comentarios fijados",
      "Colocar una meta de regalos visible en la pantalla (Goal bar)",
      "Programar un cofre del tesoro para los minutos 15 y 45 del LIVE",
    ],
    secciones: [
      {
        titulo: "1. La Ecuación del Algoritmo de LIVE",
        subtitulo: "¿Qué métricas pondera TikTok en tiempo real?",
        contenido:
          "El algoritmo asigna un puntaje dinámico a tu LIVE cada 60 segundos basado en la siguiente ponderación interna aproximada:",
        tabla: {
          encabezados: ["Variable", "Peso Relativo", "Cómo Dispararla"],
          filas: [
            [
              "Retención > 30s",
              "35%",
              "Historias en suspenso, preguntas abiertas, dinámicas visuales",
            ],
            [
              "Comentarios / Minuto (CPM)",
              "25%",
              "Preguntas de opción A vs B, pedir opiniones rápidas",
            ],
            [
              "Tap / Me Gustas en Pantalla",
              "15%",
              "Retos de 'Lleguemos a 10K me gustas y hago X cosa'",
            ],
            [
              "Regalos y Monedas",
              "20%",
              "Agradecimiento eufórico con efectos de sonido o carteles",
            ],
            ["Compartidos / Enlaces", "5%", "Invitar a compartir con amigos que necesiten reírse"],
          ],
        },
      },
      {
        titulo: "2. La Regla de los 3 Segundos (El Hook Visual)",
        subtitulo: "Cómo evitar que el usuario deslice hacia abajo en el feed",
        contenido:
          "Cuando un usuario pasa por tu LIVE en el feed, tienes menos de tres segundos antes de que haga swipe up. Si te encuentra en silencio mirando el teléfono o sin energía, se va.\n\nPara maximizar el Hook:\n1. Mantén contacto visual con la cámara, no con la esquina inferior.\n2. Ten un elemento visual llamativo de fondo (luces neón, cartel con reto actual, vestimenta característica).\n3. Habla continuamente: aunque nadie esté comentando, cuenta una anécdota o describe lo que estás a punto de hacer.",
        destacado: {
          tipo: "formula",
          titulo: "Fórmula del Hook Verbal",
          texto:
            "'¡Oigan los que acaban de entrar! En 2 minutos vamos a ver si puedo lograr este reto, quédense para decirme si lo logro o no.'",
        },
      },
      {
        titulo: "3. Uso Táctico del Cofre del Tesoro",
        subtitulo: "La herramienta número uno para inflar el tiempo de permanencia",
        contenido:
          "El cofre del tesoro (Treasure Box) permite al creador colocar monedas que se abren tras un temporizador de 1 a 5 minutos. Durante ese tiempo, las personas NO abandonan el directo porque quieren ganar las monedas.\n\nEstrategia CRBX: Coloca un cofre de 20 a 50 monedas programado para 3 minutos. Mientras el temporizador corre, pide me gustas en pantalla y haz que todos escriban en el chat la palabra clave que tú elijas. Esto genera una explosión de CPM que engaña positivamente al algoritmo y atrae oleadas masivas de público nuevo.",
      },
    ],
  },
  {
    id: "doc-crbx-03",
    codigo: "CRBX-DOC-2025-03",
    version: "v2.8 Oficial",
    clasificacion: "ESTRATEGIA COMPETITIVA — PK MATCH",
    fechaActualizacion: "Enero 2025",
    departamento: "Comité Táctico de Batallas y Dinámicas en Directo",
    titulo: "Estrategia Táctica de Batallas PK (PK Match Masterclass)",
    subtitulo:
      "Psicología del donador, pique sano, activación del guante multiplicador x5 y gestión de Whales",
    descripcion:
      "La guía definitiva para dominar los enfrentamientos en vivo contra otros creadores. Cómo generar rivalidad entretenida, cómo organizar batallas oficiales con tu manager y cómo motivar a tu comunidad para ganar rondas sin generar rechazo.",
    imagen: liveGifts,
    colorAcento: "gold",
    duracionLectura: "14 min de estudio",
    puntosClave: [
      "Las batallas PK generan el 65% del volumen de diamantes de los creadores profesionales",
      "El Minuto de Oro y la activación del guante multiplicador x5 multiplican los puntos exponencialmente",
      "El secreto de los 'Whales' (Grandes donadores): reconocimiento público y sentido de pertenencia",
      "Retos de castigo creativos y divertidos que no humillen ni violen normas de seguridad",
    ],
    resumenEjecutivo:
      "Una batalla PK no se gana pidiendo regalos de forma desesperada; se gana creando una narrativa entretenida donde la comunidad sienta que está respaldando a su líder frente a un rival. Esta guía enseña a estructurar las batallas en 4 fases, a seleccionar oponentes adecuados y a maximizar la activación de multiplicadores.",
    checklistFinal: [
      "Pactar el castigo con el rival antes de iniciar la batalla (debe ser cómico y seguro)",
      "Verificar que tus moderadores estén en la sala para coordinar el conteo de votos",
      "Guardar los regalos grandes para los últimos 30 segundos (efecto sorpresa o snipe)",
      "Agradecer con entusiasmo al 100% de los donadores, desde una rosa hasta un león",
    ],
    secciones: [
      {
        titulo: "1. Fases Cronológicas de una Batalla PK (5 Minutos)",
        subtitulo: "Cómo gestionar el tiempo de combate",
        contenido:
          "Cada batalla dura generalmente 5 minutos. Si tu comunidad gasta todos sus regalos en el primer minuto, el rival te remontará fácilmente al final. Sigue este esquema:",
        tabla: {
          encabezados: ["Fase", "Minutos", "Acción Estratégica"],
          filas: [
            [
              "1. Calentamiento",
              "0:00 - 2:00",
              "Charla amena con el rival, fijar el reto/castigo, pedir toques en pantalla",
            ],
            [
              "2. Activación Guante",
              "2:00 - 3:30",
              "Buscar la misión del guante para activar el multiplicador x5",
            ],
            [
              "3. Tensión y Pique",
              "3:30 - 4:30",
              "Animar al chat, comparar marcadores, generar expectativa",
            ],
            [
              "4. El Snipe Final",
              "4:30 - 5:00",
              "Lanzamiento de los regalos fuertes en los últimos 10 segundos",
            ],
          ],
        },
      },
      {
        titulo: "2. El Arte del Agradecimiento y Relación con Grandes Donadores",
        subtitulo: "Cómo cuidar a los donadores que sostienen tu transmisión",
        contenido:
          "Los grandes donadores en TikTok buscan reconocimiento, diversión y respeto. Cuando alguien envíe un regalo importante:\n\n1. Pronuncia su nombre completo y con tono de emoción real.\n2. Levántate, haz un baile o saludo característico que sea tu sello personal.\n3. Colócalo como moderador de sala si es un donador frecuente y de confianza.\n4. Nunca le exijas donaciones en días flojos; hazlo sentir valorado incluso cuando solo esté presente escuchando.",
        destacado: {
          tipo: "tip",
          titulo: "Consejo de Oro de Managers CRBX",
          texto:
            "Agradece tanto al que envió una rosa como al que envió un universo. La comunidad entera observa cómo tratas al pequeño donador, y de ahí nacen los futuros grandes donadores.",
        },
      },
      {
        titulo: "3. Retos de Castigo Recomendados",
        subtitulo: "Divertidos, dinámicos y 100% aprobados por TikTok",
        contenido:
          "Los castigos deben ser visuales y entretenidos, pero NUNCA peligrosos ni denigrantes para evitar suspensiones automáticas:\n\n• Pintarse la cara con labial o marcador de agua con el nombre del ganador.\n• Hacer 20 sentadillas o flexiones cantando una canción graciosa.\n• Comer una cucharada de mostaza o limón entero sin hacer muecas.\n• Ponerse una prenda ridícula o peluca durante los siguientes 15 minutos.\n• Cantar una canción en tono de ópera o imitando a un personaje famoso.",
      },
    ],
  },
  {
    id: "doc-crbx-04",
    codigo: "CRBX-DOC-2025-04",
    version: "v3.1 Oficial",
    clasificacion: "FINANZAS Y MONETIZACIÓN — INSTRUCCIÓN FORMAL",
    fechaActualizacion: "Enero 2025",
    departamento: "Departamento de Liquidaciones y Pagos Globales",
    titulo: "Guía Oficial de Monetización: Monedas, Diamantes y Cobros",
    subtitulo:
      "Tabla de equivalencia exacta de divisas, configuración de retiros a PayPal y bancos locales",
    descripcion:
      "Manual financiero para creadores de TikTok LIVE. Explica con total transparencia cómo se convierten los regalos virtuales en dinero real, qué comisiones retiene la plataforma y cómo retirar tus fondos de manera semanal o mensual sin complicaciones.",
    imagen: liveGifts,
    colorAcento: "emerald",
    duracionLectura: "12 min de estudio",
    puntosClave: [
      "1 Diamante equivale exactamente a $0.005 dólares estadounidenses netos",
      "200 diamantes = $1.00 USD | 100,000 diamantes = $500.00 USD",
      "TikTok no cobra comisiones adicionales al momento del retiro hacia cuentas verificadas",
      "Los retiros mínimos van desde $1 USD en PayPal hasta $10 USD en transferencias bancarias",
    ],
    resumenEjecutivo:
      "Muchos creadores confunden el valor de las monedas con el de los diamantes. Esta guía desglosa la matemática oficial de TikTok LIVE: cuando un espectador envía un regalo de monedas, TikTok convierte esas monedas en diamantes en una proporción de 2 monedas = 1 diamante para el creador (el 50% del valor total bruto). Cada diamante tiene un valor garantizado de medio centavo de dólar ($0.005 USD).",
    checklistFinal: [
      "Vincular tu cuenta bancaria local o cuenta de PayPal a tu perfil de TikTok",
      "Verificar que tu nombre legal en TikTok coincida con el titular de la cuenta receptora",
      "Establecer un día fijo de retiro semanal para llevar un control contable ordenado",
      "Consultar con tu manager CRBX si experimentas cualquier retraso en acreditación",
    ],
    secciones: [
      {
        titulo: "1. La Cadena de Valor: De la Moneda al Dinero en Mano",
        subtitulo: "¿Cómo se calcula cada regalo?",
        contenido:
          "El flujo financiero de TikTok LIVE es 100% automatizado por la plataforma de pagos:",
        tabla: {
          encabezados: [
            "Regalo Ejemplo",
            "Costo en Monedas",
            "Diamantes Recibidos",
            "Valor en USD",
          ],
          filas: [
            ["Rosa / Me gusta", "1 moneda", "0.5 diamantes", "$0.0025 USD"],
            ["Dona / Rosquilla", "30 monedas", "15 diamantes", "$0.075 USD"],
            ["Corgi / Perrito", "299 monedas", "149 diamantes", "$0.745 USD"],
            ["Gafas de Sol", "1,999 monedas", "999 diamantes", "$4.995 USD"],
            ["Ballena Voladora", "2,150 monedas", "1,075 diamantes", "$5.375 USD"],
            ["León (Lion)", "29,999 monedas", "15,000 diamantes", "$75.00 USD"],
            ["Universo TikTok", "44,999 monedas", "22,500 diamantes", "$112.50 USD"],
          ],
        },
      },
      {
        titulo: "2. Métodos de Retiro Disponibles en Latinoamérica",
        subtitulo: "PayPal vs Transferencia Bancaria Directa",
        contenido:
          "Dependiendo de tu país de residencia en LATAM (Perú, Colombia, México, Chile, Argentina, etc.), tienes acceso a las siguientes vías de cobro:\n\n• PayPal: La opción más rápida y recomendada. Los fondos se transfieren en minutos o en un plazo máximo de 24 horas. Desde PayPal puedes transferir a tu cuenta bancaria local o tarjetas de débito asociadas.\n• Transferencia Bancaria (PPO / Wire): Disponible en la mayoría de países. Tarda entre 2 y 5 días hábiles en acreditarse en tu banco local en moneda nacional al tipo de cambio oficial del día.",
        destacado: {
          tipo: "warning",
          titulo: "Atención con el Nombre del Titular",
          texto:
            "El nombre registrado en tu cuenta de TikTok debe coincidir exactamente con el nombre de tu cuenta bancaria o PayPal. Si utilizas la cuenta de un tercero no autorizado, TikTok puede bloquear el retiro temporalmente por motivos de seguridad antilavado.",
        },
      },
      {
        titulo: "3. Retención de Impuestos y Comisiones de la Agencia",
        subtitulo: "Recordatorio importante de CRBX",
        contenido:
          "Queremos reiterar con total claridad: CRBX (Carbe Global Corp SAC) NUNCA descuenta dinero de tus cobros. Cuando solicitas un retiro de $500 USD, recibes tus $500 USD completos (menos las pequeñas comisiones estándar de procesamiento que cobre tu banco o PayPal). Nuestra agencia se financia con incentivos otorgados por TikTok, nunca del bolsillo del creador.",
      },
    ],
  },
  {
    id: "doc-crbx-05",
    codigo: "CRBX-DOC-2025-05",
    version: "v2.6 Técnica",
    clasificacion: "INFRAESTRUCTURA — AUDIO, VIDEO Y TRANSMISIÓN",
    fechaActualizacion: "Enero 2025",
    departamento: "Soporte Técnico de Producción Audiovisual",
    titulo: "Setup Técnico Pro: TikTok LIVE Studio y OBS Studio",
    subtitulo:
      "Configuración de bitrate, resolución vertical 1080x1920, filtros de audio y eliminación de lag",
    descripcion:
      "Manual de ingeniería de transmisión para creadores que emiten desde PC. Contiene los parámetros exactos de codificación por GPU (NVIDIA NVENC / AMD), ecualización de micrófono para eliminar ecos y diagramas de escenas de streaming.",
    imagen: creatorLive,
    colorAcento: "cyan",
    duracionLectura: "16 min de estudio",
    puntosClave: [
      "Resolución vertical nativa recomendada: 1080 x 1920 a 60 FPS estables",
      "Tasa de bits (Bitrate) óptima: 4,500 kbps a 6,000 kbps en modo CBR",
      "Intervalo de fotogramas clave (Keyframe interval): forzado exactamente a 2 segundos",
      "Cadena de filtros de audio: Puerta de ruido -> Supresión -> Compresor -> Limitador a -1 dB",
    ],
    resumenEjecutivo:
      "Una calidad deficiente de audio o video ahuyenta de inmediato al espectador. TikTok LIVE favorece transmisiones fluidas sin pérdida de fotogramas (frame drops). Este manual detalla los ajustes técnicos recomendados para exprimir al máximo TikTok LIVE Studio y OBS Studio, garantizando nitidez cristalina y audio limpio sin saturación.",
    checklistFinal: [
      "Conectar la PC mediante cable de red Ethernet (evitar Wi-Fi inestable)",
      "Verificar velocidad de subida en speedtest (mínimo 15 Mbps constantes)",
      "Probar el micrófono con los 4 filtros de audio activos antes de salir al aire",
      "Comprobar que la iluminación principal apunte al rostro y no hacia la lente",
    ],
    secciones: [
      {
        titulo: "1. Parámetros de Video Recomendados",
        subtitulo: "Configuración en TikTok LIVE Studio y OBS",
        contenido:
          "Ingresa a los ajustes de salida de video y replica estos valores exactos para evitar advertencias de bitrate por parte de los servidores de TikTok:",
        tabla: {
          encabezados: ["Parámetro", "Valor Recomendado", "Nota Técnica"],
          filas: [
            [
              "Resolución Base / Salida",
              "1080 x 1920 (Vertical 9:16)",
              "Formato obligatorio para el feed móvil",
            ],
            [
              "Codificador (Encoder)",
              "NVIDIA NVENC H.264 o HEVC",
              "Libera a tu procesador de la carga gráfica",
            ],
            [
              "Control de Tasa (Rate Control)",
              "CBR (Constant Bitrate)",
              "Obligatorio para evitar saltos de lag",
            ],
            ["Bitrate de Video", "4,500 - 5,500 kbps", "El punto dulce de compresión y fluidez"],
            ["Keyframe Interval", "2 segundos", "Requerido por los servidores de TikTok"],
            ["Perfil (Profile)", "High", "Mejor compresión de color"],
            [
              "Tasa de Fotogramas",
              "60 FPS (o 30 FPS si tu PC es modesta)",
              "60 FPS brinda suavidad extrema",
            ],
          ],
        },
      },
      {
        titulo: "2. La Cadena de Filtros de Micrófono (Cero Ruido de Fondo)",
        subtitulo: "Cómo lograr que tu voz suene profesional como en radio",
        contenido:
          "El 80% del éxito de un directo reside en el audio. Si el ventilador de tu PC o los ruidos de la calle se escuchan en el micrófono, la gente abandonará la sala. Aplica estos 4 filtros en tu fuente de audio en OBS o LIVE Studio en este orden estricto:\n\n1. Supresión de Ruido (Noise Suppression): Método RNNoise (buena calidad, bajo uso de CPU) para borrar ruidos de ventiladores y ambiente.\n2. Puerta de Ruido (Noise Gate): Configura el umbral de apertura en -32 dB y de clausura en -38 dB para que el micrófono se apague cuando no estés hablando.\n3. Compresor (Compressor): Ratio 4:1 con umbral en -18 dB. Esto nivela los gritos con los susurros para no dejar sordos a tus oyentes.\n4. Limitador (Limiter): Ajustado en -1.0 dB para impedir absolutamente cualquier distorsión o clipeo digital cuando festejes un regalo grande.",
      },
      {
        titulo: "3. Iluminación y Cámara: El Secreto del Look Pro",
        subtitulo: "Incluso con una cámara web económica puedes lucir espectacular",
        contenido:
          "No necesitas una cámara de cine para triunfar en TikTok. La clave es la luz:\n\n• Luz Principal (Key Light): Debe estar a 45 grados de tu rostro, a la altura de tus ojos o ligeramente más alta.\n• Luz de Relleno (Fill Light): Del lado opuesto para suavizar sombras duras.\n• Luz de Fondo / Contorno (Backlight): Una luz cálida o tira LED neón que ilumine tus hombros y te separe del fondo, dándote profundidad tridimensional.",
      },
    ],
  },
  {
    id: "doc-crbx-06",
    codigo: "CRBX-DOC-2025-06",
    version: "v3.7 Regulatoria",
    clasificacion: "SEGURIDAD Y COMPLIANCE — OBLIGATORIO",
    fechaActualizacion: "Enero 2025",
    departamento: "Departamento Jurídico y Relaciones con la Plataforma",
    titulo: "Protocolo de Cero Sanciones, Seguridad y Prevención de Baneos",
    subtitulo:
      "Normas de comunidad de TikTok LIVE, lista de palabras prohibidas y protocolo de apelación urgente",
    descripcion:
      "Manual de supervivencia regulatoria para creadores. Detalla las infracciones más comunes que provocan suspensiones de directos (shadowbans o cierres de cuenta), cómo evitarlas y cómo activar el protocolo de soporte de CRBX ante una penalización indebida.",
    imagen: emailBanner,
    colorAcento: "pink",
    duracionLectura: "15 min de estudio",
    puntosClave: [
      "Presencia de menores de 18 años: causa número uno de suspensión inmediata e inapelable",
      "Seguridad vial: prohibido terminantemente transmitir mientras se conduce cualquier vehículo",
      "Filtros de moderación: configuración de palabras bloqueadas en el chat para evitar sabotajes",
      "Canal de apelación prioritaria de CRBX con los managers oficiales de TikTok Creator Network",
    ],
    resumenEjecutivo:
      "TikTok aplica algoritmos de inteligencia artificial que escanean imagen, audio y comentarios en vivo las 24 horas del día. Un solo descuido (un niño apareciendo en cámara, lenguaje de odio o música no autorizada) puede costar la suspensión de tu cuenta. Este documento contiene las normas no negociables para blindar tus directos de cualquier problema legal o técnico.",
    checklistFinal: [
      "Asegurar que nadie menor de 18 años esté a la vista de la cámara en ningún momento",
      "Activar la lista de palabras prohibidas sugerida por CRBX en los ajustes de moderación",
      "Asignar al menos 2 moderadores de confianza durante cada transmisión",
      "Tener a la mano el contacto de urgencia de tu manager CRBX si te llega un aviso amarillo",
    ],
    secciones: [
      {
        titulo: "1. Las 5 Infracciones Más Graves en TikTok LIVE",
        subtitulo: "Acciones que provocan cierre automático",
        contenido: "Estas faltas activan baneos de 7 días, 30 días o permanentes:",
        tabla: {
          encabezados: ["Falta Crítica", "Motivo de la Regla", "Sanción Habitual"],
          filas: [
            [
              "Menores en Pantalla",
              "Protección estricta de la infancia por leyes globales",
              "Baneo inmediato (a veces permanente)",
            ],
            [
              "Conducir mientras transmites",
              "Seguridad vial y peligro para la vida",
              "Cierre del directo + advertencia de 7 días",
            ],
            [
              "Contenido para adultos / Ropa sugerente",
              "Políticas de desnudez y sugerencia explícita",
              "Suspensión de 1 a 3 días",
            ],
            [
              "Violencia, armas o amenazas",
              "Tolerancia cero con violencia real o de juguete",
              "Baneo de cuenta para directos",
            ],
            ["Incentivar apuestas externas", "Leyes de juego no autorizado", "Suspensión severa"],
          ],
        },
      },
      {
        titulo: "2. Música y Derechos de Autor (Copyright)",
        subtitulo: "¿Puedo poner música mientras hablo o juego?",
        contenido:
          "TikTok permite usar música de su biblioteca oficial. Sin embargo, si reproduces canciones de plataformas externas a un volumen muy alto, el sistema de Content ID puede silenciar tu transmisión automáticamente.\n\nRecomendaciones CRBX:\n• Mantén la música de fondo a un volumen máximo del 20% respecto a tu voz.\n• Si recibes una notificación de que el audio fue silenciado, finaliza la canción de inmediato.\n• Prioriza listas de música libres de derechos (lo-fi, gaming beats o música comercial en bajas frecuencias).",
      },
      {
        titulo: "3. Protocolo de Apelación de Emergencia CRBX",
        subtitulo: "¿Qué hacer si TikTok suspende tu directo injustamente?",
        contenido:
          "Si eres sancionado por un falso positivo de la IA de TikTok:\n\n1. No entres en pánico ni crees otra cuenta para transmitir de inmediato (eso se considera evasión de baneo y agrava la sanción).\n2. Toma captura de pantalla completa del mensaje de infracción recibido dentro de la app.\n3. Abre WhatsApp y envía la captura a tu manager de CRBX con tu @nombreDeUsuario.\n4. Nuestro equipo escalará el ticket directamente a los moderadores de TikTok LIVE Creator Network para solicitar una revisión manual y el restablecimiento de tu cuenta.",
      },
    ],
  },
  {
    id: "doc-crbx-07",
    codigo: "CRBX-DOC-2025-07",
    version: "v2.2 Especializada",
    clasificacion: "NICHO GAMING — METODOLOGÍA SIN ROSTRO",
    fechaActualizacion: "Enero 2025",
    departamento: "División de Gaming & Creación de Contenido Digital",
    titulo: "Manual Especializado de Gaming & Streaming sin Rostro (No-Face)",
    subtitulo:
      "Estrategias de retención, modulación vocal y dinámicas interactivas para streamers de videojuegos",
    descripcion:
      "Guía especializada para creadores que transmiten videojuegos (Free Fire, Roblox, Call of Duty, Minecraft, Fortnite) o que eligen no encender cámara web. Enseña a conectar emocionalmente con la audiencia basándose en habilidad, carisma de voz y retos en vivo.",
    imagen: creatorLive,
    colorAcento: "cyan",
    duracionLectura: "13 min de estudio",
    puntosClave: [
      "No necesitas mostrar tu rostro para construir una comunidad millonaria en TikTok",
      "La regla del 'Comentarista Deportivo': hablar continuamente describiendo decisiones de juego",
      "Retos de partida vinculados a regalos virtuales (interacción en vivo)",
      "Configuración de captura móvil mediante TikTok LIVE Studio o aplicaciones de casteo",
    ],
    resumenEjecutivo:
      "Miles de los streamers con mayores ingresos en TikTok nunca han mostrado su rostro. Su secreto no es una cámara 4K, sino una personalidad sonora magnética, habilidad en el videojuego y una interacción obsesiva con el chat. Este manual enseña a transformar cada partida en un espectáculo participativo donde los espectadores deciden tu destino en el juego con sus regalos.",
    checklistFinal: [
      "Verificar que el volumen del juego no opaque tu voz (juego al 30%, voz al 100%)",
      "Colocar en la pantalla un cartel con el reto activo de la partida",
      "Leer y responder en voz alta al menos 1 comentario cada 20 segundos",
      "Invitar a seguidores a jugar contigo en partidas privadas de sala",
    ],
    secciones: [
      {
        titulo: "1. Los Pilares del Streaming sin Rostro",
        subtitulo: "¿Cómo compensar la falta de lenguaje corporal?",
        contenido:
          "Cuando no hay cámara, toda la carga emocional recae en dos factores:\n\n1. Tu Voz: Debe ser enérgica, clara y expresiva. Cambia de ritmo, ríete, susurra en momentos de sigilo y grita con emoción en jugadas épicas.\n2. La Pantalla: No dejes la pantalla del juego vacía. Agrega alertas de eventos, un contador de victorias y un chat flotante para que los espectadores vean sus propios nombres reflejados en tu directo.",
      },
      {
        titulo: "2. Dinámicas de Retos Gamificados por Regalos",
        subtitulo: "Convierte a tus espectadores en los directores de tu partida",
        contenido:
          "Crea una tabla en pantalla donde los regalos condicionen cómo juegas la siguiente ronda:",
        tabla: {
          encabezados: [
            "Regalo Donado",
            "Reto que debes Cumplir en la Partida",
            "Efecto en la Sala",
          ],
          filas: [
            [
              "1 Rosa",
              "Juego con la mira invertida o disparo al aire",
              "Divertido y accesible para todos",
            ],
            [
              "1 Perrito / Corgi",
              "Solo puedo usar pistolas o armas secundarias",
              "Genera tensión competitiva",
            ],
            [
              "1 Gafas de Sol",
              "Juego con una sola mano durante 2 minutos",
              "Provoca risas y apoyo del chat",
            ],
            [
              "1 León",
              "Borro un arma legendaria o salto de un precipicio",
              "Momento viral eufórico",
            ],
          ],
        },
      },
      {
        titulo: "3. Creación de Salas Comunitarias",
        subtitulo: "Juega con tu audiencia para fidelizarlos",
        contenido:
          "Crea salas personalizadas en Free Fire, Roblox o COD Mobile con contraseña y compártela únicamente con los espectadores que estén activos en el directo. Esto crea un sentido de exclusividad insuperable y convierte a simples curiosos en seguidores leales de por vida.",
      },
    ],
  },
  {
    id: "doc-crbx-08",
    codigo: "CRBX-DOC-2025-08",
    version: "v3.0 Guion Oficial",
    clasificacion: "ESTRUCTURA Y GUION — ESCENARIO DE DIRECTO",
    fechaActualizacion: "Enero 2025",
    departamento: "Laboratorio de Narrativa y Producción en Vivo",
    titulo: "Estructura y Guion del LIVE Perfecto de 2 Horas",
    subtitulo:
      "Cronograma minuto a minuto, ganchos de apertura, mitigación de fatiga y cierre de alta conversión",
    descripcion:
      "La plantilla paso a paso utilizada por los creadores Top 1% de TikTok LIVE. Desglosa una transmisión de 120 minutos en cuatro bloques estratégicos para evitar los silencios, sostener la energía alta y maximizar los seguidores nuevos.",
    imagen: heroBg,
    colorAcento: "gold",
    duracionLectura: "14 min de estudio",
    puntosClave: [
      "Dividir el directo en bloques de 30 minutos renueva el interés del público itinerante",
      "La apertura de 15 minutos debe incluir 3 ganchos de curiosidad sobre lo que pasará más adelante",
      "El 'Pico de Oro' (minuto 45 a 75) es el momento ideal para lanzar la batalla PK estelar",
      "El cierre debe dirigir a la audiencia a seguir tu perfil y activar las notificaciones",
    ],
    resumenEjecutivo:
      "Transmitir sin un plan de vuelo es la causa principal de que los creadores se cansen rápido, se queden sin palabras y pierdan espectadores. Este guion estructurado te proporciona una hoja de ruta precisa para saber qué hacer y qué decir desde el segundo 1 hasta que apagas la cámara, garantizando retención constante y crecimiento sostenido.",
    checklistFinal: [
      "Tener a la mano agua fresca y notas con los temas principales a tratar",
      "Definir el objetivo central del directo antes de encender (¿ganar seguidores o batallas?)",
      "Verificar que la iluminación y el audio estén listos antes de dar click en Iniciar",
      "Hacer un repaso mental de las frases de agradecimiento para los primeros donadores",
    ],
    secciones: [
      {
        titulo: "1. Cronograma Maestro de 120 Minutos",
        subtitulo: "La estructura de los cuatro cuartos",
        contenido: "Organiza tu energía y contenido como un partido deportivo de 4 cuartos:",
        tabla: {
          encabezados: ["Bloque", "Minutos", "Objetivo Principal", "Acción Clave"],
          filas: [
            [
              "Bloque 1: Apertura & Bienvenida",
              "0 - 30 min",
              "Atrapar al tráfico inicial",
              "Saludar, fijar pregunta del día, pedir me gustas en pantalla",
            ],
            [
              "Bloque 2: Dinámica / Retos",
              "30 - 60 min",
              "Elevar interacción y comentarios",
              "Lanzar cofre del tesoro, ronda de preguntas y respuestas",
            ],
            [
              "Bloque 3: Batalla PK Estelar",
              "60 - 90 min",
              "Monetización y clímax",
              "Enfrentamiento contra rival de la agencia con reto pactado",
            ],
            [
              "Bloque 4: Despedida & Fidelización",
              "90 - 120 min",
              "Conversión a seguidores fieles",
              "Agradecimiento a donadores, anunciar próximo LIVE y despedida",
            ],
          ],
        },
      },
      {
        titulo: "2. Speech de Apertura (Los Primeros 3 Minutos)",
        subtitulo: "Guion exacto para no quedarte en blanco al empezar",
        contenido:
          "En cuanto le des a 'Iniciar LIVE', di con entusiasmo:\n\n'¡Hola a todos los que van entrando! ¡Bienvenidos! Hoy tenemos una transmisión épica. En unos minutos vamos a cumplir un reto que me dejaron ayer en los comentarios, y además tendremos batalla con castigo incluido. Si acabas de llegar, déjame en los comentarios de qué país me estás viendo para saludarte con nombre y apellido. ¡Lleguemos primero a 5,000 me gustas en pantalla!'",
        destacado: {
          tipo: "tip",
          titulo: "Efecto Espejo de Bienvenida",
          texto:
            "Cuando alguien comenta 'Hola desde Perú', no digas solo 'Hola'. Di: '¡Qué grande Perú! ¿De qué ciudad, de Lima o provincias? Cuéntame qué están cenando por allá'. Eso genera 3 comentarios más de inmediato.",
        },
      },
      {
        titulo: "3. El Cierre Estratégico (Llamado a la Acción)",
        subtitulo: "No apagues el directo de golpe; capitaliza tus nuevos seguidores",
        contenido:
          "Los últimos 5 minutos de tu directo son cruciales para asegurar que los espectadores vuelvan mañana:\n\n1. Anuncia que faltan 5 minutos para terminar el directo.\n2. Repasa la tabla de donadores del día (Top 3) y dales un agradecimiento especial.\n3. Pide a todos los que estén viendo que toquen el signo '+' arriba para seguir tu perfil y activar la campanita de directos.\n4. Informa la fecha y hora exacta de tu próxima transmisión.",
      },
    ],
  },
];
