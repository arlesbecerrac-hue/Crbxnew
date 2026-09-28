import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Phone, ArrowRight, ShieldCheck, Zap, Trophy, CheckCircle2 } from "lucide-react";
import crbxLogo from "@/assets/crbx-logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import creatorLive from "@/assets/creator-live.jpg";
import liveGifts from "@/assets/live-gifts.jpg";
import { WHATSAPP_URL, PHONE_DISPLAY, stats } from "@/lib/site";
import { CtaBand } from "@/components/cta-band";
import { TikTokPlayer } from "@/components/tiktok-embed";

const destacados = [
  { to: "/nosotros", titulo: "Nosotros", texto: "Agencia peruana de Carbe Global Corp SAC para creadores de LATAM.", img: creatorLive },
  { to: "/monetizacion", titulo: "Monetización", texto: "Regalos, diamantes e incentivos que se convierten en ingresos.", img: liveGifts },
] as const;

const accesos = [
  { to: "/beneficios", titulo: "Beneficios", texto: "Acompañamiento, batallas PK y capacitación." },
  { to: "/proceso", titulo: "Proceso y requisitos", texto: "Cuatro pasos para empezar a transmitir." },
  { to: "/preguntas", titulo: "Preguntas frecuentes", texto: "Costos, pagos, permanencia y más." },
  { to: "/postular", titulo: "Postular", texto: "Envía tu perfil y te respondemos en 48 h." },
] as const;

const pilares = [
  {
    icon: ShieldCheck,
    titulo: "Cero comisiones a creadores",
    texto: "TikTok nos remunera directamente por tu desarrollo. El 100% de tus diamantes y regalos es tuyo.",
  },
  {
    icon: Zap,
    titulo: "Soporte y desbaneos rápidos",
    texto: "Canal directo con moderación oficial de TikTok LIVE para apelar advertencias y solucionar problemas técnicos.",
  },
  {
    icon: Trophy,
    titulo: "Batallas PK y torneos",
    texto: "Organización de eventos inter-agencias y batallas oficiales para maximizar tu audiencia y ranking.",
  },
] as const;

const requisitosRapidos = [
  "Ser mayor de 18 años con documento de identidad.",
  "Cuenta de TikTok en Perú o Latinoamérica.",
  "Disponibilidad de al menos 40 horas al mes para transmitir.",
  "Compromiso con las normas comunitarias de TikTok.",
] as const;

/**
 * Sección de Batallas de TikTok LIVE
 * Diseño limpio sin píldoras, sin subtítulos genéricos y sin textos duplicados
 */
function BatallasTikTokSection() {
  const videosBatallas = [
    "7616572978247093524",
    "7460034055338315013",
    "7586519546278776085",
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videosBatallas.map((id) => (
          <div key={id} className="flex justify-center">
            <TikTokPlayer videoId={id} aspect="vertical" />
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Sección de Setups y Espacios de Transmisión
 * Diseño limpio sin subtítulos genéricos ni duplicados
 */
function SetupsTikTokSection() {
  const videosSetups = [
    "7661582583578332449",
    "7262864792736599303",
    "7669833864805633310",
    "7653312954825182484",
    "7535955667446729991",
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {videosSetups.map((id) => (
          <div key={id} className="flex justify-center">
            <TikTokPlayer videoId={id} aspect="vertical" />
          </div>
        ))}
      </div>
    </section>
  );
}

function PilaresSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-6 md:grid-cols-3">
        {pilares.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.titulo}
              className="rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-lg hover:shadow-black/5"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-tight">{p.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
            </div>
          );
        })}
      </div>

      {/* Requisitos rápidos en diseño limpio */}
      <div className="mt-8 rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm">
        <h4 className="font-display text-lg font-bold tracking-tight">Requisitos básicos para unirte</h4>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {requisitosRapidos.map((req) => (
            <div key={req} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-live-cyan" />
              <span className="text-sm text-muted-foreground leading-relaxed">{req}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeLinks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-6 md:grid-cols-2">
        {destacados.map((d) => (
          <Link key={d.to} to={d.to} className="group overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-xl hover:shadow-black/5">
            <img src={d.img} alt={d.titulo} loading="lazy" width={1024} height={1024} className="aspect-[16/10] w-full object-cover" />
            <div className="p-7">
              <h2 className="text-2xl font-bold tracking-tight">{d.titulo}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{d.texto}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-live-pink">
                Ver más <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {accesos.map((a) => (
          <Link key={a.to} to={a.to} className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-black/5">
            <h3 className="font-semibold">{a.titulo}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{a.texto}</p>
            <ArrowRight className="mt-4 size-4 text-live-cyan transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CRBX — Agencia de TikTok LIVE en Perú" },
      {
        name: "description",
        content:
          "CRBX (Carbe Global Corp SAC) es una agencia de TikTok LIVE en Perú que ayuda a creadores de Latinoamérica a crecer y monetizar sus transmisiones en vivo.",
      },
      { property: "og:title", content: "CRBX — Agencia de TikTok LIVE en Perú" },
      {
        property: "og:description",
        content:
          "Únete a CRBX y convierte tus transmisiones en vivo de TikTok en una fuente de ingresos real. Acompañamiento, eventos y monetización para creadores de LATAM.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero principal idéntico a la imagen original */}
      <section className="relative overflow-hidden">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 text-center sm:pt-20">
          <div className="mx-auto mb-10 flex justify-center">
            <img
              src={crbxLogo}
              alt="CRBX — Agencia de TikTok LIVE"
              className="h-36 sm:h-44 w-auto object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="mx-auto max-w-2xl text-balance text-4xl font-bold leading-tight tracking-tight sm:text-6xl text-foreground">
            Tu talento en vivo,{" "}
            <span className="text-live-cyan">convertido </span>
            <span className="text-live-pink">en ingresos</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-muted-foreground leading-relaxed">
            Somos una agencia de TikTok LIVE con sede en Perú. Ayudamos a
            creadores de Latinoamérica a crecer, profesionalizar sus
            transmisiones y monetizar su contenido.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-base font-semibold text-background transition-colors hover:bg-foreground/90 shadow-xl shadow-black/10"
            >
              <MessageCircle className="size-5" />
              Postular por WhatsApp
            </a>
            <a
              href="tel:+51916753556"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Phone className="size-5" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* Video limpio sin textos redundantes ni títulos genéricos */}
      <section className="mx-auto max-w-md px-6 py-6">
        <div className="flex justify-center">
          <TikTokPlayer
            videoId="7567406768272264468"
            aspect="vertical"
            className="w-full max-w-[340px]"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.valor} className="text-center">
              <p className="font-display text-3xl font-bold tracking-tight text-live-pink sm:text-4xl">
                {s.valor}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Batallas de TikTok LIVE - Limpio sin textos dobles ni píldoras */}
      <BatallasTikTokSection />

      {/* Setups de creadores y estudio - Limpio */}
      <SetupsTikTokSection />

      {/* Pilares */}
      <PilaresSection />

      {/* Enlaces a secciones */}
      <HomeLinks />

      {/* Franja CTA */}
      <CtaBand />
    </>
  );
}
