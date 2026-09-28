import { Gift, Users, Swords, GraduationCap } from "lucide-react";

export const WHATSAPP_URL =
  "https://wa.me/51916753556?text=Hola%20CRBX%2C%20quiero%20unirme%20a%20la%20agencia%20de%20TikTok%20LIVE";
export const PHONE_DISPLAY = "+51 916 753 556";
export const PHONE_TEL = "tel:+51916753556";
export const EMAIL = "seguraxdata@gmail.com";

export const navItems = [
  { label: "Inicio", to: "/" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Beneficios", to: "/beneficios" },
  { label: "Monetización", to: "/monetizacion" },
  { label: "Proceso", to: "/proceso" },
  { label: "Preguntas", to: "/preguntas" },
  { label: "Contacto", to: "/contacto" },
] as const;

export const stats = [
  { valor: "LATAM", texto: "Creadores de toda Latinoamérica pueden postular" },
  { valor: "48 h", texto: "Tiempo máximo de respuesta a tu postulación" },
  { valor: "S/ 0", texto: "Unirte a la agencia no tiene ningún costo" },
  { valor: "24/7", texto: "Atención de tu manager por WhatsApp" },
];

export const beneficios = [
  {
    icono: Gift,
    titulo: "Acceso al programa de monetización",
    texto:
      "Te vinculamos al programa de incentivos de TikTok LIVE para que tus regalos y diamantes se conviertan en ingresos reales.",
  },
  {
    icono: Users,
    titulo: "Acompañamiento personalizado",
    texto:
      "Un manager de la agencia revisa tus métricas, te ayuda con tu contenido y resuelve tus dudas por WhatsApp o llamada.",
  },
  {
    icono: Swords,
    titulo: "Batallas y eventos",
    texto:
      "Participas en batallas PK y eventos de la comunidad que aumentan tu visibilidad y tus diamantes.",
  },
  {
    icono: GraduationCap,
    titulo: "Capacitación continua",
    texto:
      "Aprendes dinámicas de live, horarios que funcionan en Perú y LATAM, y buenas prácticas para crecer sin infracciones.",
  },
];

export const pasos = [
  {
    numero: "01",
    titulo: "Postula",
    texto: "Escríbenos por WhatsApp con el enlace de tu perfil de TikTok.",
  },
  {
    numero: "02",
    titulo: "Evaluación",
    texto: "Revisamos tu perfil y te respondemos en un plazo máximo de 48 horas.",
  },
  {
    numero: "03",
    titulo: "Onboarding",
    texto: "Te registramos en la agencia y configuramos tu cuenta para monetizar.",
  },
  {
    numero: "04",
    titulo: "Transmite y gana",
    texto: "Haces tus lives con nuestro respaldo y retiras tus ganancias.",
  },
];

export const requisitos = [
  "Ser mayor de 18 años",
  "Tener una cuenta de TikTok activa y sin infracciones",
  "Compromiso mínimo de 15 horas de transmisión a la semana",
  "Contenido propio y auténtico",
];

export const preguntas = [
  {
    pregunta: "¿Unirme a CRBX tiene algún costo?",
    respuesta:
      "No. La vinculación a la agencia es completamente gratuita. Nuestro modelo se basa en el crecimiento conjunto: ganamos cuando tú ganas.",
  },
  {
    pregunta: "¿Cómo recibo mis ganancias?",
    respuesta:
      "Los diamantes que generes en tus lives se convierten en dinero dentro de tu propia cuenta de TikTok y los retiras directamente tú, sin intermediarios.",
  },
  {
    pregunta: "¿Puedo salirme de la agencia cuando quiera?",
    respuesta:
      "Sí. No hay contratos de permanencia forzosa. Si decides continuar por tu cuenta, gestionamos tu salida sin trabas.",
  },
  {
    pregunta: "¿Debo vivir en Perú para postular?",
    respuesta:
      "No. Aunque nuestra sede está en Lima, aceptamos creadores de toda Latinoamérica. Todo el acompañamiento es remoto.",
  },
  {
    pregunta: "¿Qué pasa si nunca he hecho un live?",
    respuesta:
      "No hay problema. Te capacitamos desde cero: configuración, dinámicas, horarios y todo lo necesario para tu primera transmisión.",
  },
];
