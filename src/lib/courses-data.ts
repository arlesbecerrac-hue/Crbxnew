export interface CursoRecurso {
  id: string;
  moduloId: string;
  moduloTitulo: string;
  titulo: string;
  subtitulo?: string;
  descripcion: string;
  url: string;
  tipo: "pdf" | "portal" | "manual" | "investigacion" | "tutorial";
  tipoEtiqueta: string;
  fuente: string;
  puntosClave: string[];
}

export interface ModuloCurso {
  id: string;
  numero: string;
  titulo: string;
  descripcion: string;
  recursos: CursoRecurso[];
}

export const modulosCursos: ModuloCurso[] = [
  {
    id: "modulo-1",
    numero: "I",
    titulo: "Guías Oficiales y Playbooks de TikTok (PDFs Directos)",
    descripcion:
      "Documentación técnica de nivel de agencia con flujos de algoritmo, diseño de formatos, manual operativo y optimización de GMV.",
    recursos: [
      {
        id: "m1-1",
        moduloId: "modulo-1",
        moduloTitulo: "Módulo I: Guías Oficiales PDF",
        titulo: "TikTok Media Certification Study Guide (PDF)",
        subtitulo:
          "Guía oficial de estudio técnico con flujos del algoritmo y retención en el feed",
        descripcion:
          "Guía oficial de certificación técnica de TikTok. Explica detalladamente cómo el sistema de recomendación evalúa señales en tiempo real, distribuye el tráfico en el feed Para Ti y maximiza la retención de espectadores.",
        url: "https://ads.tiktok.com/business/library/TikTok_MediaCertification_StudyGuide_ES.pdf",
        tipo: "pdf",
        tipoEtiqueta: "PDF Oficial de Estudio",
        fuente: "TikTok Business Academy",
        puntosClave: [
          "Señales de engagement en tiempo real evaluadas por el algoritmo",
          "Métricas clave de retención durante los primeros 3 a 5 segundos",
          "Distribución y escalado de audiencia en transmisiones en vivo",
        ],
      },
      {
        id: "m1-2",
        moduloId: "modulo-1",
        moduloTitulo: "Módulo I: Guías Oficiales PDF",
        titulo: "TikTok Agency Guidebook (PDF)",
        subtitulo: "Manual operativo integral sobre infraestructura de cuentas de la plataforma",
        descripcion:
          "Manual operativo confidencial y técnico para agencias de TikTok. Detalla la gestión de infraestructura de creadores, permisos de moderación, escalamiento de perfiles y resolución de incidencias.",
        url: "https://ads.tiktok.com/business/library/TikTok_Agency_Guidebook.pdf",
        tipo: "pdf",
        tipoEtiqueta: "Manual de Agencia PDF",
        fuente: "TikTok Agency Partnership",
        puntosClave: [
          "Arquitectura técnica de vinculación de creadores a agencias",
          "Herramientas exclusivas de TikTok LIVE Backstage",
          "Protocolos de moderación y desbloqueo de funcionalidades",
        ],
      },
      {
        id: "m1-3",
        moduloId: "modulo-1",
        moduloTitulo: "Módulo I: Guías Oficiales PDF",
        titulo: "TikTok Creative Playbook 2025 (PDF)",
        subtitulo: "Libro técnico de diseño de formatos de video y ganchos interactivos",
        descripcion:
          "Estrategias avanzadas de diseño creativo para retener audiencia en vivo. Analiza ganchos visuales, ritmo de narración, psicología de atención y técnicas de llamado a la acción.",
        url: "https://ads.tiktok.com/business/library/TikTok_SMB_Creative_Playbook_2025.pdf",
        tipo: "pdf",
        tipoEtiqueta: "Creative Playbook 2025",
        fuente: "TikTok Creative Center",
        puntosClave: [
          "Fórmulas de ganchos en los primeros segundos de transmisión",
          "Dinámicas interactivas para disparar comentarios en chat",
          "Diseño visual de escenografía e iluminación para directos",
        ],
      },
      {
        id: "m1-4",
        moduloId: "modulo-1",
        moduloTitulo: "Módulo I: Guías Oficiales PDF",
        titulo: "TikTok Formula 4 Success Manual (PDF)",
        subtitulo: "Metodologías oficiales para dirigir audiencias hacia conversiones en vivo",
        descripcion:
          "Metodología estructurada de 4 fases para canalizar la atención de la audiencia en vivo hacia objetivos medibles: regalos, suscripciones, seguimiento fiel y valor monetario.",
        url: "https://ads.tiktok.com/business/library/TikTok_Formula_4_Success.pdf",
        tipo: "pdf",
        tipoEtiqueta: "Manual Formula 4 Success",
        fuente: "TikTok Global Business Solutions",
        puntosClave: [
          "Las cuatro etapas de maduración del espectador en directos",
          "Técnicas de conversión psicológica de comentarios a regalos",
          "Sostenibilidad a largo plazo de comunidades de apoyo",
        ],
      },
      {
        id: "m1-5",
        moduloId: "modulo-1",
        moduloTitulo: "Módulo I: Guías Oficiales PDF",
        titulo: "TikTok What's Next Global Trend Report (PDF)",
        subtitulo: "Análisis oficial de comportamientos y tendencias de interacción en tiempo real",
        descripcion:
          "Reporte macro de tendencias globales de TikTok. Examina los patrones de consumo de contenido en vivo que dominarán las transmisiones y cómo adaptar la temática para capturar tendencias.",
        url: "https://ads.tiktok.com/business/library/WhatsNext_Global_Report.pdf",
        tipo: "pdf",
        tipoEtiqueta: "Reporte Global de Tendencias",
        fuente: "TikTok Trend Intelligence",
        puntosClave: [
          "Tendencias de comportamiento social en salas de chat en vivo",
          "Formatos de entretenimiento emergentes en LATAM y el mundo",
          "Alineación del contenido personal con el algoritmo global",
        ],
      },
      {
        id: "m1-6",
        moduloId: "modulo-1",
        moduloTitulo: "Módulo I: Guías Oficiales PDF",
        titulo: "Estrategias de Belleza y Live Selling SMB (PDF)",
        subtitulo: "Guía de optimización de transmisiones utilizando inteligencia artificial y GMV",
        descripcion:
          "Guía especializada para monetización directa y venta en transmisiones en vivo (Live Commerce y Live Gifting). Enseña cómo presentar productos, dinámicas de demostración y cierre en vivo.",
        url: "https://ads.tiktok.com/business/library/Be_Beauty_Next_Big_Thing_SMB_NA.pdf",
        tipo: "pdf",
        tipoEtiqueta: "Live Selling & GMV Guide",
        fuente: "TikTok Commerce SMB",
        puntosClave: [
          "Demostraciones visuales que retienen hasta un 40% más de tiempo",
          "Estrategias de urgencia y dinámicas de chat en tiempo real",
          "Optimización del volumen bruto de valor generado (GMV)",
        ],
      },
    ],
  },
  {
    id: "modulo-2",
    numero: "II",
    titulo: "Módulos de la Academia de Creadores de TikTok (Documentos de Aprendizaje)",
    descripcion:
      "Plataforma educativa central de TikTok con módulos específicos para creadores LIVE, configuración de herramientas y programas de recompensas.",
    recursos: [
      {
        id: "m2-1",
        moduloId: "modulo-2",
        moduloTitulo: "Módulo II: Academia de Creadores",
        titulo: "Academia de Creadores de TikTok: Tu Guía para el Éxito",
        subtitulo: "Repositorio central de aprendizaje oficial para creadores",
        descripcion:
          "El portal formativo oficial donde TikTok publica los estándares técnicos, directrices de contenido recomendado y metodologías paso a paso para perfiles en crecimiento.",
        url: "https://www.tiktok.com/creator-academy/es",
        tipo: "portal",
        tipoEtiqueta: "Portal Oficial Academia",
        fuente: "TikTok Creator Academy",
        puntosClave: [
          "Conceptos esenciales de crecimiento orgánico",
          "Normas de etiquetado y selección de temáticas",
          "Acceso a cursos modulares de la plataforma",
        ],
      },
      {
        id: "m2-2",
        moduloId: "modulo-2",
        moduloTitulo: "Módulo II: Academia de Creadores",
        titulo: "Guía para emitir en TikTok LIVE: Consejos y beneficios",
        subtitulo: "Estructuración de transmisiones móviles de alto impacto",
        descripcion:
          "Guía técnica para estructurar directos desde el celular: iluminación, encuadre vertical, gestión del micrófono, dinámicas de calentamiento y primeros minutos de transmisión.",
        url: "https://www.tiktok.com/creator-academy/es/articles/features",
        tipo: "manual",
        tipoEtiqueta: "Guía de Transmisión Móvil",
        fuente: "TikTok Creator Academy",
        puntosClave: [
          "Configuración óptima de cámara y resolución en smartphone",
          "Estructura recomendada para las primeras 2 horas de live",
          "Cómo saludar y capturar a espectadores que entran por el feed",
        ],
      },
      {
        id: "m2-3",
        moduloId: "modulo-2",
        moduloTitulo: "Módulo II: Academia de Creadores",
        titulo: "Guía completa para configurar y utilizar TikTok LIVE Studio",
        subtitulo: "Plantillas de escena, alertas y captura técnica desde PC",
        descripcion:
          "Tutorial completo del software nativo para PC de TikTok. Aprende a crear escenas de videojuegos, overlays personalizados, alertas de regalos y captura de múltiples pantallas.",
        url: "https://www.tiktok.com/creator-academy/es/article/LIVE-Studio-tools",
        tipo: "manual",
        tipoEtiqueta: "Manual LIVE Studio PC",
        fuente: "TikTok LIVE Studio Docs",
        puntosClave: [
          "Configuración de escenas horizontales y verticales duales",
          "Integración de alertas nativas de diamantes y cofres",
          "Ajustes de tasa de bits (bitrate) para cero pérdida de cuadros",
        ],
      },
      {
        id: "m2-4",
        moduloId: "modulo-2",
        moduloTitulo: "Módulo II: Academia de Creadores",
        titulo: "Guía Completa para Creadores en TikTok (Funcionalidades)",
        subtitulo: "Manual global de funciones in-app para optimizar el engagement",
        descripcion:
          "Recorrido exhaustivo por todas las herramientas de la aplicación: stickers interactivos, encuestas en vivo, fijación de comentarios, filtros de moderación y música de fondo.",
        url: "https://www.tiktok.com/creator-academy/es/articles/features",
        tipo: "manual",
        tipoEtiqueta: "Manual de Funcionalidades",
        fuente: "TikTok Creator Academy",
        puntosClave: [
          "Encuestas y preguntas fijadas para estimular la interacción",
          "Uso de stickers de metas de regalos en pantalla",
          "Activación de efectos sonoros y música autorizada",
        ],
      },
      {
        id: "m2-5",
        moduloId: "modulo-2",
        moduloTitulo: "Módulo II: Academia de Creadores",
        titulo: "Introducción a las Suscripciones LIVE",
        subtitulo: "Configuración de incentivos de pago recurrentes para fans",
        descripcion:
          "Aprende a habilitar y monetizar con suscripciones mensuales: creación de insignias exclusivas de suscriptor, emotes personalizados, chat solo para suscriptores y transmisiones privadas.",
        url: "https://www.tiktok.com/creator-academy/es/article/live-subscription-introduction",
        tipo: "manual",
        tipoEtiqueta: "Guía de Suscripciones",
        fuente: "TikTok Creator Academy",
        puntosClave: [
          "Diseño de badges de fidelidad de 1, 3, 6 y 12 meses",
          "Configuración de salas de chat VIP para suscriptores",
          "Cálculo de ingresos pasivos mensuales recurrentes",
        ],
      },
      {
        id: "m2-6",
        moduloId: "modulo-2",
        moduloTitulo: "Módulo II: Academia de Creadores",
        titulo: "Uso del Programa Creator Rewards",
        subtitulo: "Guía de monetización basada en el engagement y vistas en directo",
        descripcion:
          "Estructura del programa oficial de recompensas de TikTok. Cómo calificar, métricas de RPM, originalidad de contenido y cómo tus directos potencian tus ingresos globales.",
        url: "https://www.tiktok.com/creator-academy/es/article/creator-rewards-program-overview",
        tipo: "manual",
        tipoEtiqueta: "Creator Rewards Program",
        fuente: "TikTok Creator Rewards",
        puntosClave: [
          "Cálculo de RPM y valor por mil reproducciones cualificadas",
          "Sinergia entre videos cortos virales y transmisiones en vivo",
          "Directrices de elegibilidad y cobro mediante cuentas bancarias",
        ],
      },
      {
        id: "m2-7",
        moduloId: "modulo-2",
        moduloTitulo: "Módulo II: Academia de Creadores",
        titulo: "Guía de Eventos de LIVE con entradas",
        subtitulo: "Programación previa y comercialización de accesos exclusivos",
        descripcion:
          "Cómo programar directos con antelación, crear recordatorios en el perfil de tus seguidores y vender accesos o entradas especiales para directos temáticos o shows.",
        url: "https://www.tiktok.com/creator-academy/es/article/LIVE-Studio-tools",
        tipo: "manual",
        tipoEtiqueta: "Guía de Eventos & Entradas",
        fuente: "TikTok Creator Academy",
        puntosClave: [
          "Creación de eventos programados en el calendario de fans",
          "Notificaciones automáticas 'push' antes de salir en vivo",
          "Estrategias de contenido exclusivo y conciertos/charlas privadas",
        ],
      },
      {
        id: "m2-8",
        moduloId: "modulo-2",
        moduloTitulo: "Módulo II: Academia de Creadores",
        titulo: "Uso de Efectos y Realidad Aumentada en LIVE",
        subtitulo: "Integración de filtros interactivos de Effect House en transmisiones en vivo",
        descripcion:
          "Aprende a utilizar la herramienta oficial Effect House para crear o usar efectos de realidad aumentada que reaccionan a los regalos recibidos o a los toques de pantalla.",
        url: "https://effecthouse.tiktok.com/",
        tipo: "portal",
        tipoEtiqueta: "Portal Effect House AR",
        fuente: "TikTok Effect House",
        puntosClave: [
          "Filtros que reaccionan cuando los espectadores envían regalos",
          "Juegos interactivos de realidad aumentada dentro del directo",
          "Aumento de donaciones mediante dinámicas visuales automáticas",
        ],
      },
    ],
  },
  {
    id: "modulo-3",
    numero: "III",
    titulo: "Manuales y Blogs del Ecosistema de Redes LIVE (Documentos Oficiales)",
    descripcion:
      "Publicaciones y portales institucionales de TikTok Creator Networks (redes y agencias aliadas).",
    recursos: [
      {
        id: "m3-1",
        moduloId: "modulo-3",
        moduloTitulo: "Módulo III: Redes LIVE Oficiales",
        titulo: "Blog de Redes de Creadores: Cómo iniciar LIVE en TikTok",
        subtitulo: "Desglose paso a paso de metodologías móviles y de escritorio",
        descripcion:
          "Publicación oficial del equipo de Creator Networks con la metodología para iniciar transmisiones de manera consistente, construir hábitos y preparar el espacio de transmisión.",
        url: "https://www.tiktok.com/live/creator-networks/es/blog/how-to-go-live-on-tiktok",
        tipo: "manual",
        tipoEtiqueta: "Artículo Oficial de Redes",
        fuente: "TikTok Creator Networks",
        puntosClave: [
          "Preparación técnica previa al directo",
          "Buenas prácticas de saludo e interacción inicial",
          "Gestión de la energía y dinamismo durante 2 a 4 horas",
        ],
      },
      {
        id: "m3-2",
        moduloId: "modulo-3",
        moduloTitulo: "Módulo III: Redes LIVE Oficiales",
        titulo: "Plataforma del Centro de Redes de Creadores de TikTok LIVE",
        subtitulo: "Portal institucional de agencias aliadas",
        descripcion:
          "El portal central donde TikTok gestiona las agencias autorizadas y redes de creadores en todo el mundo. Explica el marco de colaboración y beneficios exclusivos.",
        url: "https://www.tiktok.com/live/creator-networks/es/home",
        tipo: "portal",
        tipoEtiqueta: "Portal Creator Networks",
        fuente: "TikTok Creator Networks",
        puntosClave: [
          "Rol de las agencias autorizadas como CRBX",
          "Acceso a bonificaciones e incentivos directos de TikTok",
          "Ecosistema de soporte institucional y asesoramiento",
        ],
      },
      {
        id: "m3-3",
        moduloId: "modulo-3",
        moduloTitulo: "Módulo III: Redes LIVE Oficiales",
        titulo: "Blog Oficial de Recompensas LIVE Proporcionales",
        subtitulo: "Registro de actualización de algoritmos: misiones semanales y evaluación",
        descripcion:
          "Explicación detallada de cómo TikTok calcula las recompensas proporcionales para creadores activos, cómo funcionan los multiplicadores de horas y los rankings de diamantes.",
        url: "https://www.tiktok.com/live/creator-networks/es/blog/tiktok-live-rewards",
        tipo: "manual",
        tipoEtiqueta: "Métricas de Recompensas",
        fuente: "TikTok LIVE Rewards Blog",
        puntosClave: [
          "Cumplimiento de misiones semanales de horas y días activos",
          "Tableros de rendimiento y asignación de bonos",
          "Optimización de ganancias según la categoría de creador",
        ],
      },
      {
        id: "m3-4",
        moduloId: "modulo-3",
        moduloTitulo: "Módulo III: Redes LIVE Oficiales",
        titulo: "Novedades de las Agencias de TikTok LIVE",
        subtitulo: "Historial técnico de actualizaciones y comunicados corporativos",
        descripcion:
          "Feed oficial de actualizaciones y anuncios de producto sobre cambios en el algoritmo de directos, nuevos formatos de batallas y políticas operativas.",
        url: "https://www.tiktok.com/live/creator-networks/es/blog",
        tipo: "portal",
        tipoEtiqueta: "Centro de Noticias de Agencias",
        fuente: "TikTok Creator Networks",
        puntosClave: [
          "Novedades de versiones de software y herramientas",
          "Calendario de campañas regionales de TikTok en LATAM",
          "Mejoras de la plataforma en seguridad y cobros",
        ],
      },
    ],
  },
  {
    id: "modulo-4",
    numero: "IV",
    titulo: "Centro de Ayuda Técnico de TikTok LIVE (Guías de Flujo y Soporte)",
    descripcion:
      "Documentación técnica oficial sobre economía de diamantes, batallas PK, estadísticas, cofres y herramientas.",
    recursos: [
      {
        id: "m4-1",
        moduloId: "modulo-4",
        moduloTitulo: "Módulo IV: Centro de Ayuda Técnico",
        titulo: "TikTok LIVE: Centro de Ayuda Oficial",
        subtitulo: "Centro de resolución de problemas e inicio rápido móvil",
        descripcion:
          "Repositorio central de soporte con soluciones para problemas de conexión, fallos de audio, compatibilidad de dispositivos y permisos de transmisión.",
        url: "https://support.tiktok.com/es/live-gifts-wallet/tiktok-live",
        tipo: "portal",
        tipoEtiqueta: "Centro de Ayuda Oficial",
        fuente: "TikTok Support Help Center",
        puntosClave: [
          "Diagnóstico de fallos técnicos frecuentes",
          "Ajustes de calidad de transmisión y permisos",
          "Guía de solución rápida para desconexiones",
        ],
      },
      {
        id: "m4-2",
        moduloId: "modulo-4",
        moduloTitulo: "Módulo IV: Centro de Ayuda Técnico",
        titulo: "Guía de Monedas y Regalos en TikTok",
        subtitulo: "Funcionamiento del sistema de diamantes y cobro de recompensas",
        descripcion:
          "Explicación matemática y operativa de cómo los usuarios adquieren monedas, cómo se envían los regalos virtuales y cómo se transforman en diamantes cobrables a dinero real.",
        url: "https://support.tiktok.com/es/live-gifts-wallet/tiktok-live/live-gifts",
        tipo: "manual",
        tipoEtiqueta: "Economía de Diamantes",
        fuente: "TikTok Wallet & Gifts",
        puntosClave: [
          "Equivalencia de monedas a diamantes y retiros a banco o PayPal",
          "Regalos exclusivos por eventos y temporadas",
          "Límites de retiro y tiempos de procesamiento",
        ],
      },
      {
        id: "m4-3",
        moduloId: "modulo-4",
        moduloTitulo: "Módulo IV: Centro de Ayuda Técnico",
        titulo: "Estadísticas de LIVE de TikTok",
        subtitulo: "Guía para interpretar métricas de retención y espectadores únicos",
        descripcion:
          "Manual para interpretar las analíticas posteriores al directo: espectadores máximos concurrentes, tiempo promedio de permanencia, nuevos seguidores ganados y diamantes totales.",
        url: "https://support.tiktok.com/es/using-tiktok/analytics/live-analytics",
        tipo: "manual",
        tipoEtiqueta: "Métricas de Analítica",
        fuente: "TikTok Analytics Guide",
        puntosClave: [
          "Picos de audiencia y qué dinámica los provocó",
          "Tasa de conversión de espectadores a seguidores",
          "Métricas de retención por minuto transmitido",
        ],
      },
      {
        id: "m4-4",
        moduloId: "modulo-4",
        moduloTitulo: "Módulo IV: Centro de Ayuda Técnico",
        titulo: "Uso del Modo Multiaudiencia en LIVE",
        subtitulo: "Reglas para invitar a múltiples espectadores a la pantalla en vivo",
        descripcion:
          "Configuración técnica del modo Multi-Guest para tener hasta 8 personas en pantalla dividida en formato cuadrícula o panel de audio, ideal para podcasts y debates.",
        url: "https://support.tiktok.com/es/live-gifts-wallet/tiktok-live/multi-guest-live",
        tipo: "manual",
        tipoEtiqueta: "Modo Multi-Invitado",
        fuente: "TikTok Multi-Guest Help",
        puntosClave: [
          "Configuración de cámara y micrófono de invitados",
          "Control de silenciamiento y expulsión de panelistas",
          "Dinámicas grupales para multiplicar el alcance conjunto",
        ],
      },
      {
        id: "m4-5",
        moduloId: "modulo-4",
        moduloTitulo: "Módulo IV: Centro de Ayuda Técnico",
        titulo: "Guía de Batallas LIVE (PK Match)",
        subtitulo: "Dinámicas competitivas en directo y reglas de puntuación",
        descripcion:
          "Estructura oficial de las batallas PK: duración estándar de 5 minutos, bonificaciones de tiempo doble (Speed Up / Double Points), guantes mágicos y metas de puntos.",
        url: "https://support.tiktok.com/es/live-gifts-wallet/tiktok-live/live-match",
        tipo: "manual",
        tipoEtiqueta: "Manual Batallas PK",
        fuente: "TikTok PK Battles Support",
        puntosClave: [
          "Mecánicas de puntuación y periodos de bonificación x2",
          "Estrategias de motivación al chat para ganar la batalla",
          "Conexión con creadores aliados y rivales deportivos",
        ],
      },
      {
        id: "m4-6",
        moduloId: "modulo-4",
        moduloTitulo: "Módulo IV: Centro de Ayuda Técnico",
        titulo: "Configuración de Moderadores de LIVE",
        subtitulo: "Asignación de roles, silenciamientos y expulsión de usuarios tóxicos",
        descripcion:
          "Cómo asignar moderadores de confianza, delegar permisos de bloqueo y silenciamiento temporal (Mute), y configurar filtros de palabras clave para mantener un chat limpio.",
        url: "https://support.tiktok.com/es/live-gifts-wallet/tiktok-live/live-moderators",
        tipo: "manual",
        tipoEtiqueta: "Gestión de Moderadores",
        fuente: "TikTok Safety & Moderators",
        puntosClave: [
          "Asignación y revocación de privilegios de moderación",
          "Gestión de filtros de palabras y spam en tiempo real",
          "Buenas prácticas para proteger la reputación del creador",
        ],
      },
      {
        id: "m4-7",
        moduloId: "modulo-4",
        moduloTitulo: "Módulo IV: Centro de Ayuda Técnico",
        titulo: "Uso de Cofres del Tesoro interactivos",
        subtitulo: "Dinámicas de retención mediante premios de monedas dentro del chat",
        descripcion:
          "Cómo utilizar y configurar los cofres de monedas (Treasure Boxes): temporizadores de apertura, cantidad de monedas y cómo incentivar que la audiencia espere hasta el final.",
        url: "https://support.tiktok.com/es/live-gifts-wallet/tiktok-live/live-features",
        tipo: "manual",
        tipoEtiqueta: "Cofres del Tesoro",
        fuente: "TikTok Interactive Features",
        puntosClave: [
          "Configuración de cofres para aumentar el tiempo de permanencia",
          "Estrategias para que los propios fans donen cofres a la sala",
          "Sincronización con momentos culminantes de la transmisión",
        ],
      },
      {
        id: "m4-8",
        moduloId: "modulo-4",
        moduloTitulo: "Módulo IV: Centro de Ayuda Técnico",
        titulo: "Habilitar Live en TikTok",
        subtitulo: "Documento base de requerimientos técnicos, edad mínima y monetización directa",
        descripcion:
          "Requisitos oficiales para desbloquear la función de directos en cuentas nuevas: límites de edad, verificación de identidad y alternativas de acceso a través de agencia.",
        url: "https://www.tiktok.com/discover/habilitar-live",
        tipo: "portal",
        tipoEtiqueta: "Requisitos de Habilitación",
        fuente: "TikTok Live Discover",
        puntosClave: [
          "Requisitos estándar de seguidores y edad (18+)",
          "Ventajas del desbloqueo acelerado mediante agencia CRBX",
          "Activación de botones de monetización y regalos",
        ],
      },
    ],
  },
  {
    id: "modulo-5",
    numero: "V",
    titulo: "Seguridad, Moderación de Comunidad y Políticas de Privacidad",
    descripcion:
      "Marco regulatorio obligatorio para transmitir sin infracciones, suspensiones ni penalizaciones algorítmicas.",
    recursos: [
      {
        id: "m5-1",
        moduloId: "modulo-5",
        moduloTitulo: "Módulo V: Seguridad y Moderación",
        titulo: "Guía de seguridad de LIVE: Herramientas y moderación",
        subtitulo: "Gestión segura de comunidades, palabras clave prohibidas y filtros",
        descripcion:
          "Manual integral sobre las herramientas de seguridad activas durante el directo: filtros de insultos, detección automática de contenido sensible y reporte de abusos.",
        url: "https://www.tiktok.com/safety/es/tools-and-guides/live-safety-guide",
        tipo: "manual",
        tipoEtiqueta: "Guía de Seguridad LIVE",
        fuente: "TikTok Trust & Safety",
        puntosClave: [
          "Configuración preventiva de listas negras de palabras",
          "Protocolo ante situaciones de acoso o troleo coordinado",
          "Herramientas de protección de privacidad y datos personales",
        ],
      },
      {
        id: "m5-2",
        moduloId: "modulo-5",
        moduloTitulo: "Módulo V: Seguridad y Moderación",
        titulo: "Normas de la Comunidad de TikTok",
        subtitulo: "Marco regulatorio obligatorio para transmisiones en directo",
        descripcion:
          "El reglamento oficial que rige todo el contenido en TikTok. Qué está terminantemente prohibido en directos (conducción peligrosa, menores desatendidos, violencia, derechos de autor).",
        url: "https://www.tiktok.com/community-guidelines/es/",
        tipo: "portal",
        tipoEtiqueta: "Normas de la Comunidad",
        fuente: "TikTok Legal & Compliance",
        puntosClave: [
          "Infracciones graves que causan baneo permanente",
          "Normativas de derechos de autor con música y videos",
          "Protección estricta de menores de edad en directos",
        ],
      },
      {
        id: "m5-3",
        moduloId: "modulo-5",
        moduloTitulo: "Módulo V: Seguridad y Moderación",
        titulo: "Normas de Moderación en LIVE Studio",
        subtitulo: "Panel técnico para configurar filtros de comentarios y políticas de propiedad",
        descripcion:
          "Configuración técnica de filtros automáticos dentro de LIVE Studio para PC. Evita que comentarios con spam o palabras ofensivas aparezcan en tu pantalla o en el chat.",
        url: "https://www.tiktok.com/live/studio/help/article/Before-you-go-LIVE/Community-Guidelines?lang=es",
        tipo: "manual",
        tipoEtiqueta: "Moderación en LIVE Studio",
        fuente: "TikTok LIVE Studio Help",
        puntosClave: [
          "Detección y bloqueo automático de enlaces sospechosos",
          "Configuración de límites de frecuencia de mensajes por usuario",
          "Políticas de transmisión de videojuegos con clasificación por edades",
        ],
      },
      {
        id: "m5-4",
        moduloId: "modulo-5",
        moduloTitulo: "Módulo V: Seguridad y Moderación",
        titulo: "Normativas sobre Regalos y Menores",
        subtitulo: "Restricciones legales de edad y políticas de reembolso de ítems virtuales",
        descripcion:
          "Directrices legales que prohíben la participación de menores de edad en el envío o recepción de regalos virtuales. Conoce las políticas para evitar cualquier penalización bancaria.",
        url: "https://www.tiktok.com/safety/es/tools-and-guides/virtual-items-policy",
        tipo: "manual",
        tipoEtiqueta: "Política de Ítems Virtuales",
        fuente: "TikTok Trust & Safety",
        puntosClave: [
          "Restricción estricta de 18 años para habilitar regalos",
          "Procedimientos oficiales en caso de solicitudes de reembolso",
          "Transparencia en la entrega de premios e incentivos a la audiencia",
        ],
      },
      {
        id: "m5-5",
        moduloId: "modulo-5",
        moduloTitulo: "Módulo V: Seguridad y Moderación",
        titulo: "Especificaciones de Efectos de Marca y Activos",
        subtitulo: "Dimensiones de archivos, limitaciones de texto y zonas seguras para overlays",
        descripcion:
          "Guía técnica de diseño para overlays, banners y logotipos en transmisiones: zonas seguras que no tapan los botones de TikTok, relaciones de aspecto y pesos máximos.",
        url: "https://ads.tiktok.com/resources/help/article/tiktok-branded-effect-asset-commercial-benefits-specs",
        tipo: "manual",
        tipoEtiqueta: "Especificaciones de Overlays",
        fuente: "TikTok Ads & Creator Specs",
        puntosClave: [
          "Zonas seguras de la interfaz móvil (Safe Zones 9:16)",
          "Formatos de video transparentes (WebM / ProRes)",
          "Límites de texto y visibilidad en dispositivos pequeños",
        ],
      },
    ],
  },
  {
    id: "modulo-6",
    numero: "VI",
    titulo: "Investigaciones Científicas y Enfoques de Comercio en Directo (PDF Directos)",
    descripcion:
      "Estudios académicos y rigurosos sobre psicología del consumidor en streaming, tasas de conversión y dinámicas de interacción.",
    recursos: [
      {
        id: "m6-1",
        moduloId: "modulo-6",
        moduloTitulo: "Módulo VI: Investigaciones Científicas",
        titulo: "Análisis del Ecosistema de TikTok LIVE (PDF)",
        subtitulo:
          "Estudio en PDF sobre interactividad, visibilidad algorítmica y sistemas de diamantes",
        descripcion:
          "Investigación exhaustiva sobre la arquitectura económica de TikTok LIVE, la interacción bidireccional entre espectador y emisor, y los catalizadores psicológicos del regalo virtual.",
        url: "https://irp.cdn-website.com/fc1b756e/files/uploaded/Ana-lisis_del_Ecosistema_de_TikTok_LIVE-2.pdf",
        tipo: "investigacion",
        tipoEtiqueta: "Paper Académico PDF",
        fuente: "Estudio Académico de Comunicación",
        puntosClave: [
          "Mapeo de la economía interna de los diamantes en Latinoamérica",
          "Factores de visibilidad algorítmica por tiempo de retención",
          "Psicología de la reciprocidad en transmisiones en directo",
        ],
      },
      {
        id: "m6-2",
        moduloId: "modulo-6",
        moduloTitulo: "Módulo VI: Investigaciones Científicas",
        titulo: "Del anonimato a la conversión: Live-Stream Shopping en TikTok (PDF)",
        subtitulo: "Estudio académico sobre tasas de conversión del 15% y estrategias relacionales",
        descripcion:
          "Análisis del fenómeno de live-streaming donde las tasas de conversión superan el 15% mediante vínculos parasociales, autenticidad y respuesta rápida en tiempo real.",
        url: "https://www.researchgate.net/search/publication?q=Live-Stream+Shopping+TikTok",
        tipo: "investigacion",
        tipoEtiqueta: "Investigación Científica",
        fuente: "ResearchGate Publications",
        puntosClave: [
          "Efecto del reconocimiento personal del espectador por su nombre",
          "Construcción de confianza inmediata frente a cámara",
          "Mecanismos de conversión espontánea en salas de transmisión",
        ],
      },
      {
        id: "m6-3",
        moduloId: "modulo-6",
        moduloTitulo: "Módulo VI: Investigaciones Científicas",
        titulo: "A Review of TikTok Livestreaming Commerce (PDF)",
        subtitulo:
          "Análisis técnico sobre monetización por regalos y dinámicas de creadores en LIVE",
        descripcion:
          "Revisión académica internacional que examina la evolución de los directos de TikTok desde el entretenimiento casual hacia plataformas millonarias de comercio interactivo y regalos.",
        url: "https://www.researchgate.net/publication/385339117_A_Review_of_Tiktok_Livestreaming_Commerce",
        tipo: "investigacion",
        tipoEtiqueta: "Revisión Académica Peer-Reviewed",
        fuente: "ResearchGate Journal",
        puntosClave: [
          "Modelos de negocio aplicados por creadores de alto rendimiento",
          "Dinámicas competitivas como motores de volumen de diamantes",
          "Estructuración de comunidades fieles de mecenazgo digital",
        ],
      },
      {
        id: "m6-4",
        moduloId: "modulo-6",
        moduloTitulo: "Módulo VI: Investigaciones Científicas",
        titulo: "TikTok Live Shopping Purchase Intention: A Conceptual Paper (PDF)",
        subtitulo: "El modelo de estímulo-respuesta del usuario en salas de transmisión directa",
        descripcion:
          "Marco teórico fundamentado en el modelo Estímulo-Organismo-Respuesta (SOR) que explica cómo los estímulos visuales y auditivos en un directo activan donaciones inmediatas.",
        url: "https://www.researchgate.net/search/publication?q=TikTok+Live+Shopping+Purchase+Intention",
        tipo: "investigacion",
        tipoEtiqueta: "Modelo Conceptual SOR",
        fuente: "International Marketing Review",
        puntosClave: [
          "Estímulos auditivos (música, alertas) y su impacto en la permanencia",
          "Validación social cuando otros usuarios envían regalos masivos",
          "Cómo aplicar la psicología del consumidor en tus propias transmisiones",
        ],
      },
      {
        id: "m6-5",
        moduloId: "modulo-6",
        moduloTitulo: "Módulo VI: Investigaciones Científicas",
        titulo: "News on TikTok: A Digital Methods-Based Study (PDF)",
        subtitulo:
          "Estudio de las técnicas narrativas y overlays de texto en las transmisiones de video",
        descripcion:
          "Investigación empírica sobre las narrativas más efectivas en TikTok: uso de textos sobreimpresos, modulación de voz, subtítulos y contacto visual sostenido.",
        url: "https://www.researchgate.net/publication/390488221_News_foryou_on_TikTok_A_Digital_Methods-Based_Study",
        tipo: "investigacion",
        tipoEtiqueta: "Estudio de Métodos Digitales",
        fuente: "Digital Communication & Media Studies",
        puntosClave: [
          "Overlays de texto que aumentan la comprensión instantánea",
          "Ritmo verbal de entre 140 y 160 palabras por minuto",
          "Técnicas narrativas que evitan el deslizamiento hacia abajo (scroll)",
        ],
      },
    ],
  },
  {
    id: "modulo-7",
    numero: "VII",
    titulo: "Guías y Manuales Técnicos en Blogs de Autoridad en Streaming",
    descripcion:
      "Desgloses profesionales elaborados por expertos en analítica, marketing y comercio electrónico.",
    recursos: [
      {
        id: "m7-1",
        moduloId: "modulo-7",
        moduloTitulo: "Módulo VII: Blogs de Autoridad",
        titulo: "Tutorial Completo de TikTok LIVE Studio en Metricool",
        subtitulo: "Análisis técnico de la plataforma nativa de streaming para PC",
        descripcion:
          "Guía paso a paso en español por Metricool analizando la herramienta para PC: requisitos del sistema, configuración de bitrate, fuentes de audio y captura de videojuegos.",
        url: "https://metricool.com/es/tiktok-live-studio/",
        tipo: "tutorial",
        tipoEtiqueta: "Tutorial Metricool",
        fuente: "Metricool Blog Oficial",
        puntosClave: [
          "Requisitos mínimos de hardware para PC sin caídas de FPS",
          "Configuración de alertas de eventos y suscripciones",
          "Programación de directos y análisis de métricas en Metricool",
        ],
      },
      {
        id: "m7-2",
        moduloId: "modulo-7",
        moduloTitulo: "Módulo VII: Blogs de Autoridad",
        titulo: "Estrategias de Monetización en TikTok LIVE por Cyberclick",
        subtitulo: "Desglose comercial del valor real de los regalos y suscripciones",
        descripcion:
          "Análisis financiero realizado por la agencia Cyberclick: cálculo del valor en dólares de cada regalo, comisiones retenidas por las tiendas y cómo generar ingresos predecibles.",
        url: "https://www.cyberclick.es/numerical-blog/como-ganar-dinero-en-tiktok-live",
        tipo: "tutorial",
        tipoEtiqueta: "Guía Financiera Cyberclick",
        fuente: "Cyberclick Marketing",
        puntosClave: [
          "Tabla de conversión exacta de monedas a dólares estadounidenses",
          "Estrategias de diversificación de ingresos para streamers",
          "Modelos de patrocinio de marcas en directos de creadores",
        ],
      },
      {
        id: "m7-3",
        moduloId: "modulo-7",
        moduloTitulo: "Módulo VII: Blogs de Autoridad",
        titulo: "Guía para empezar en TikTok a transmitir en vivo por Tienda Nube",
        subtitulo: "Manual orientado al e-commerce y transmisiones de venta directa",
        descripcion:
          "Manual práctico para conectar catálogos, organizar la puesta en escena, gestionar las preguntas de la audiencia y dinamizar la interacción comercial.",
        url: "https://www.tiendanube.com/blog/como-hacer-un-live-en-tiktok/",
        tipo: "tutorial",
        tipoEtiqueta: "Manual E-Commerce Tienda Nube",
        fuente: "Tienda Nube Blog",
        puntosClave: [
          "Estructura de guion para presentaciones de productos",
          "Interacción fluida con el chat resolviendo objeciones en vivo",
          "Cierre de ventas y llamados a la acción claros",
        ],
      },
      {
        id: "m7-4",
        moduloId: "modulo-7",
        moduloTitulo: "Módulo VII: Blogs de Autoridad",
        titulo: "¿Cómo transmitir en vivo en TikTok? - Crehana",
        subtitulo: "Guía educativa con enfoque en títulos atractivos y retención",
        descripcion:
          "Consejos clave para redactar títulos magnéticos, seleccionar la categoría precisa en TikTok y mantener la audiencia conectada durante largas sesiones.",
        url: "https://www.crehana.com/blog/redes-sociales/como-hacer-un-live-en-tiktok/",
        tipo: "tutorial",
        tipoEtiqueta: "Guía Crehana",
        fuente: "Crehana Educación Online",
        puntosClave: [
          "Redacción de títulos y selección de imagen de portada",
          "Técnicas de modulación de voz para no perder energía",
          "Dinámicas de preguntas y respuestas para mantener el chat activo",
        ],
      },
      {
        id: "m7-5",
        moduloId: "modulo-7",
        moduloTitulo: "Módulo VII: Blogs de Autoridad",
        titulo: "Guía de TikTok Shop y LIVE Selling en Shopify",
        subtitulo: "Cómo integrar catálogos de productos y vender en directo",
        descripcion:
          "Documento técnico de Shopify que explica la integración oficial de catálogos en TikTok LIVE, compras en un solo clic y gestión de inventario en tiempo real.",
        url: "https://www.shopify.com/es/blog/tiktok-shop",
        tipo: "tutorial",
        tipoEtiqueta: "Guía Oficial Shopify",
        fuente: "Shopify Blog en Español",
        puntosClave: [
          "Vinculación de pasarelas de pago y sincronización de productos",
          "Visualización de tarjetas interactivas de compra en pantalla",
          "Métricas de conversión y analítica de ventas en vivo",
        ],
      },
    ],
  },
  {
    id: "modulo-8",
    numero: "VIII",
    titulo: "Manuales en PDF y Documentos de Formación de Terceros",
    descripcion:
      "Guías estructuradas en PDF con capturas y pasos visuales para configuración móvil y de escritorio.",
    recursos: [
      {
        id: "m8-1",
        moduloId: "modulo-8",
        moduloTitulo: "Módulo VIII: Manuales Externos PDF",
        titulo: "Manual Técnico del Ecosistema TikTok | Grupo Táctica (PDF)",
        subtitulo:
          "Manual formativo externo estructurado que calca los menús de configuración hacia LIVE",
        descripcion:
          "Documento formativo completo en PDF que recorre cada menú de configuración de TikTok, los ajustes de privacidad, moderación de cuenta y arranque de directos.",
        url: "https://www.grupotactica.com/descarga/Manual-TikTok.pdf",
        tipo: "pdf",
        tipoEtiqueta: "Manual PDF de Formación",
        fuente: "Grupo Táctica Formación",
        puntosClave: [
          "Desglose visual de cada menú de la aplicación TikTok",
          "Configuración de parámetros de audio, video y red",
          "Buenas prácticas de publicación y transición hacia el directo",
        ],
      },
      {
        id: "m8-2",
        moduloId: "modulo-8",
        moduloTitulo: "Módulo VIII: Manuales Externos PDF",
        titulo: "Guía de Configuración Rápida en PDF (Scribd)",
        subtitulo:
          "Un documento estructurado paso a paso con capturas de pantalla de la secuencia móvil",
        descripcion:
          "Manual paso a paso ilustrado con capturas de pantalla reales que explica exactamente qué botones presionar para iniciar, configurar y finalizar un LIVE con éxito.",
        url: "https://www.scribd.com/document/741815416/Live-Tiktok",
        tipo: "manual",
        tipoEtiqueta: "Documento Paso a Paso Scribd",
        fuente: "Scribd Document Repository",
        puntosClave: [
          "Secuencia paso a paso para no saltarse ningún ajuste",
          "Selección de tema y portada atractiva",
          "Verificación del estado de conexión antes de transmitir",
        ],
      },
      {
        id: "m8-3",
        moduloId: "modulo-8",
        moduloTitulo: "Módulo VIII: Manuales Externos PDF",
        titulo: "Cómo Hacer un Live en TikTok - Manual Completo en Scribd (PDF)",
        subtitulo: "Guía estructurada paso a paso para descargar y consultar",
        descripcion:
          "Compendio formativo sobre las funcionalidades avanzadas de las salas de transmisión en vivo de TikTok, cómo gestionar la comunidad y evitar reportes de usuarios.",
        url: "https://es.scribd.com/document/790808920/Como-Hacer-TIK-TOK-Live",
        tipo: "manual",
        tipoEtiqueta: "Manual Completo Scribd",
        fuente: "Scribd Academia Digital",
        puntosClave: [
          "Configuración de alertas de moderación y listas de bloqueo",
          "Dinámicas para incentivar el toque en pantalla (likes)",
          "Estrategias para monetizar con regalos temáticos",
        ],
      },
    ],
  },
  {
    id: "modulo-9",
    numero: "IX",
    titulo: "Tutoriales de Configuración Técnica de Software de Terceros (PC / OBS)",
    descripcion:
      "Ajustes de audio, video, encoders, OBS Studio, Streamlabs, bitrate y diagnósticos de red profesional.",
    recursos: [
      {
        id: "m9-1",
        moduloId: "modulo-9",
        moduloTitulo: "Módulo IX: Software PC & OBS",
        titulo: "Manual de Configuración de OBS para TikTok en Streamlabs",
        subtitulo: "Pasos para conectar codificadores externos con Stream Keys",
        descripcion:
          "Guía técnica para configurar OBS Studio y Streamlabs Desktop: resolución vertical 1080x1920, conexión mediante clave de transmisión (Stream Key / RTMP) y escenas personalizadas.",
        url: "https://streamlabs.com/content-hub/post/how-to-stream-to-tiktok-from-a-pc",
        tipo: "tutorial",
        tipoEtiqueta: "Tutorial OBS / Streamlabs",
        fuente: "Streamlabs Creator Hub",
        puntosClave: [
          "Configuración de lienzo vertical 1080x1920 a 60 FPS",
          "Ajuste de codificador NVENC / x264 para máximo rendimiento",
          "Integración de alertas de chat y widgets interactivos",
        ],
      },
      {
        id: "m9-2",
        moduloId: "modulo-9",
        moduloTitulo: "Módulo IX: Software PC & OBS",
        titulo: "Manual de Configuración y Solución de Problemas de LIVE Studio",
        subtitulo: "Diagnóstico oficial de pérdida de fotogramas, latencia de red y bitrate",
        descripcion:
          "Documentación oficial para resolver problemas de sobrecarga del codificador, desincronización de audio y video, y cómo configurar el bitrate adecuado según tu conexión a internet.",
        url: "https://www.tiktok.com/live/studio/help",
        tipo: "manual",
        tipoEtiqueta: "Manual Oficial LIVE Studio",
        fuente: "TikTok LIVE Studio Support",
        puntosClave: [
          "Tabla de bitrates recomendados (3000 kbps a 6000 kbps)",
          "Solución a pérdida de fotogramas por sobrecarga de CPU/GPU",
          "Sincronización de audio con retardo de milisegundos",
        ],
      },
      {
        id: "m9-3",
        moduloId: "modulo-9",
        moduloTitulo: "Módulo IX: Software PC & OBS",
        titulo: "Lo que necesitas saber sobre TikTok LIVE - Epidemic Sound",
        subtitulo: "Guía de interfaz y adición de música libre de regalías para transmisiones",
        descripcion:
          "Cómo musicalizar tus directos sin arriesgarte a que te silencien la transmisión o te apliquen una infracción de derechos de autor. Configuración de pistas de música libre de regalías.",
        url: "https://www.epidemicsound.com/es/onboarding/how-to-use-tiktok-live/",
        tipo: "tutorial",
        tipoEtiqueta: "Música & Audio Legal",
        fuente: "Epidemic Sound Academy",
        puntosClave: [
          "Regulaciones de copyright en directos de TikTok",
          "Configuración de pistas de audio independientes en OBS",
          "Equilibrio de volumen entre voz de micrófono y música de fondo",
        ],
      },
      {
        id: "m9-4",
        moduloId: "modulo-9",
        moduloTitulo: "Módulo IX: Software PC & OBS",
        titulo: "¿Cómo hacer un live en TikTok paso a paso? - 2btube",
        subtitulo: "Requisitos de optimización de producción audiovisual en vivo",
        descripcion:
          "Recomendaciones técnicas de producción por la network 2btube: microfonía lavalier vs condensador, esquemas de tres puntos de iluminación y control de temperatura de color.",
        url: "https://2btube.com/como-hacer-un-live-en-tiktok/",
        tipo: "tutorial",
        tipoEtiqueta: "Producción Audiovisual 2btube",
        fuente: "2btube Media Network",
        puntosClave: [
          "Esquema de iluminación principal, relleno y contraluz",
          "Elección del micrófono para aislar el ruido de fondo",
          "Gestión de la mirada y conexión empática con el espectador",
        ],
      },
      {
        id: "m9-5",
        moduloId: "modulo-9",
        moduloTitulo: "Módulo IX: Software PC & OBS",
        titulo: "Optimización de Audio para LIVE por Vilma Núñez",
        subtitulo: "Configuración de entornos acústicos y hardware recomendado para transmisiones",
        descripcion:
          "Estrategias para que el sonido de tu directo sea impecable: tratamiento acústico básico, ganancia de micrófono, filtros antipop y cómo la calidad de audio determina la permanencia.",
        url: "https://vilmanunez.com/guia-tiktok-para-marcas/",
        tipo: "tutorial",
        tipoEtiqueta: "Optimización de Audio",
        fuente: "Vilma Núñez Escuela Digital",
        puntosClave: [
          "El 70% de la retención depende de la claridad del audio",
          "Configuración de filtros de ruido y compresión de voz",
          "Evitar la fatiga auditiva de la audiencia en directos largos",
        ],
      },
      {
        id: "m9-6",
        moduloId: "modulo-9",
        moduloTitulo: "Módulo IX: Software PC & OBS",
        titulo: "Guía de Algoritmos y Retención en Directos por HubSpot",
        subtitulo: "Factores técnicos que impulsan la aparición de tu LIVE en el feed 'Para ti'",
        descripcion:
          "Análisis del embudo de retención por HubSpot: cómo el algoritmo de TikTok decide a cuántas personas mostrarles la vista previa del directo en el feed y qué métricas activan el pico viral.",
        url: "https://blog.hubspot.es/marketing/como-funciona-el-algoritmo-de-tiktok",
        tipo: "tutorial",
        tipoEtiqueta: "Analítica Algorítmica HubSpot",
        fuente: "HubSpot Blog de Marketing",
        puntosClave: [
          "Tasa de retención en los primeros 10 segundos de vista previa",
          "Frecuencia de toques en pantalla e impacto en recomendaciones",
          "Cómo sincronizar los picos de actividad con los horarios de tu país",
        ],
      },
    ],
  },
];

export const totalRecursosCursos = modulosCursos.reduce((acc, mod) => acc + mod.recursos.length, 0);
