import { createFileRoute, Link } from "@tanstack/react-router";
import {
  TrendingUp,
  Monitor,
  BellRing,
  Target,
  Gamepad2,
  BarChart2,
  Gift,
  Rocket,
  Mic,
  CalendarDays,
  Trophy,
  Sparkles,
  Coins,
  CheckCircle2,
  MessageCircle,
  Tv,
  ArrowRight,
} from "lucide-react";
import { PageBanner } from "@/components/page-banner";
import { CtaBand } from "@/components/cta-band";
import { WHATSAPP_URL } from "@/lib/site";

export const Route = createFileRoute("/beneficios")({
  head: () => ({
    meta: [
      { title: "Beneficios de Unirte — CRBX Agencia Oficial TikTok LIVE" },
      {
        name: "description",
        content:
          "Conoce todos los beneficios de unirte a CRBX: promoción oficial, monitoreo en tiempo real, alertas instantáneas, guiones en vivo, asesoría gaming y 0% comisiones.",
      },
      { property: "og:title", content: "Beneficios de Unirte — CRBX Agencia Oficial TikTok LIVE" },
      {
        property: "og:description",
        content:
          "Gestión, promoción y dirección de tus transmisiones en vivo con herramientas oficiales de TikTok LIVE. 100% gratuito sin comisiones.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BeneficiosPage,
});

const listaBeneficios = [
  {
    icono: TrendingUp,
    titulo: "Promoción y pauta publicitaria",
    descripcion: [
      "Gestionamos campañas promocionales directamente desde las herramientas oficiales disponibles de TikTok LIVE Backstage para impulsar tus directos y aumentar su exposición ante nuevas audiencias.",
    ],
  },
  {
    icono: Monitor,
    titulo: "Monitoreo en tiempo real, detrás de la pantalla",
    descripcion: [
      "Mientras tú estás transmitiendo, nosotros estaremos detrás de la pantalla monitoreando tu LIVE en tiempo real, observando su evolución y analizando las métricas disponibles. Nuestro objetivo es detectar cuándo la audiencia disminuye, la interacción cae o la transmisión empieza a perder fuerza, para identificar qué está fallando y actuar a tiempo.",
    ],
  },
  {
    icono: BellRing,
    titulo: "Alertas e indicaciones al instante",
    descripcion: [
      "Si detectamos que tu transmisión está perdiendo espectadores, que la interacción está bajando o que necesitas cambiar la dinámica, te avisaremos en ese mismo momento mediante nuestro canal privado de comunicación. Así podrás reaccionar mientras el LIVE sigue activo, sin tener que esperar hasta terminar para conocer los problemas que identificamos.",
    ],
  },
  {
    icono: Target,
    titulo: "Guiones, speech y estrategias en tiempo real",
    descripcion: [
      "No solo te diremos qué está fallando. También te enviaremos frases, líneas de discurso, ideas y dinámicas preparadas para que puedas utilizarlas durante tu transmisión. Si necesitas recuperar la atención de tus espectadores, incentivar la conversación o darle un nuevo impulso a tu LIVE, tendrás indicaciones concretas para saber qué hacer y qué decir en cada momento.",
    ],
  },
  {
    icono: Gamepad2,
    titulo: "Beneficios para quienes transmiten videojuegos",
    destacado: true,
    descripcion: [
      "Si haces directos jugando videojuegos, también podrás recibir apoyo y orientación especializada, incluso si no muestras tu rostro y únicamente transmites la pantalla del juego. Te ayudaremos a mejorar la interacción con tu audiencia, crear dinámicas y retos, aprovechar los momentos interesantes de tus partidas y mantener activo el chat.",
      "Además, podremos prepararte frases, comentarios, ideas y estrategias adaptadas al videojuego que transmites, para ayudarte a mantener el interés de los espectadores, mejorar el ritmo de tus directos y desarrollar una comunidad de seguidores. También analizaremos las métricas disponibles para identificar oportunidades de mejora y orientarte sobre cómo hacer tus transmisiones de gaming más entretenidas y participativas, sin necesidad de aparecer frente a la cámara.",
    ],
  },
  {
    icono: BarChart2,
    titulo: "Análisis y dirección de tu LIVE",
    descripcion: [
      "Analizamos el comportamiento de tu audiencia, la retención y los resultados disponibles para identificar oportunidades de mejora y orientarte sobre las decisiones que pueden ayudar a mantener una transmisión más dinámica.",
    ],
  },
  {
    icono: Gift,
    titulo: "Estrategias para recibir más regalos",
    descripcion: [
      "Te orientamos sobre dinámicas, retos, objetivos y formas de interacción que pueden motivar a tu audiencia a participar y apoyarte durante tus transmisiones.",
    ],
  },
  {
    icono: Rocket,
    titulo: "Estrategias para crecer más rápido",
    descripcion: [
      "Te ayudamos a identificar oportunidades de crecimiento, mejorar tu contenido y desarrollar una estrategia adaptada a tu estilo para atraer nuevos espectadores y fidelizar a quienes ya te siguen.",
    ],
  },
  {
    icono: Mic,
    titulo: "Mejora de tu contenido y desempeño",
    descripcion: [
      "Te damos recomendaciones para mejorar tu comunicación, mantener conversaciones, evitar silencios prolongados y conseguir que tus transmisiones sean más entretenidas y dinámicas.",
    ],
  },
  {
    icono: CalendarDays,
    titulo: "Planificación y constancia",
    descripcion: [
      "Te ayudamos a organizar tus horarios, establecer objetivos y desarrollar hábitos de transmisión que te permitan trabajar de manera más estratégica y profesional.",
    ],
  },
  {
    icono: Trophy,
    titulo: "Acompañamiento y asesoría personalizada",
    descripcion: [
      "No tendrás que aprenderlo todo por tu cuenta. Contarás con orientación para resolver dudas, mejorar tus transmisiones y avanzar con una estrategia más clara.",
    ],
  },
  {
    icono: Sparkles,
    titulo: "Oportunidades de desarrollo",
    descripcion: [
      "Según tu rendimiento y las oportunidades disponibles, podrás recibir orientación sobre eventos, campañas, retos y programas para creadores que TikTok habilite para tu perfil.",
    ],
  },
  {
    icono: Coins,
    titulo: "Servicios gratuitos y sin descuentos de tus ingresos",
    destacado: true,
    resaltarFinal: true,
    descripcion: [
      "Todos los servicios de gestión, orientación, análisis, promoción y acompañamiento incluidos en nuestra propuesta son completamente gratuitos para ti. No tienes que pagar absolutamente nada por unirte a nuestra agencia ni por recibir estos servicios, y tampoco te descontamos ninguna comisión de tus ingresos por pertenecer a ella.",
      "Todo el dinero que generes en tus transmisiones y que TikTok te pague será íntegramente tuyo, sin ningún descuento por parte de nuestra agencia.",
    ],
  },
];

function BeneficiosPage() {
  return (
    <>
      <PageBanner label="Beneficios" />

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          {/* Introducción completa tal cual solicitada */}
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center rounded-full border border-live-cyan/30 bg-live-cyan/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-live-cyan">
              Agencia de TikTok LIVE
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground">
              Qué obtienes al unirte a nuestra agencia
            </h1>

            <p className="mt-6 text-lg sm:text-xl font-semibold leading-relaxed text-foreground">
              Quiero explicarte algo importante sobre lo que puedes obtener al unirte a nuestra
              agencia.
            </p>

            <div className="mt-6 rounded-3xl border border-border bg-background/80 p-6 sm:p-8 text-center shadow-sm">
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                Somos los encargados de gestionar, promocionar y dirigir tus transmisiones en vivo
                utilizando herramientas oficiales de TikTok para ayudarte a multiplicar tu audiencia
                y tus ingresos.
              </p>
              <p className="mt-4 text-base sm:text-lg font-semibold text-foreground">
                Específicamente, nuestro trabajo consiste en hacer lo siguiente por ti:
              </p>
            </div>
          </div>

          {/* Grilla con los 13 beneficios e iconos reales bonitos y centrados */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listaBeneficios.map((b) => {
              const Icono = b.icono;
              const isFull = b.destacado;

              return (
                <div
                  key={b.titulo}
                  className={`group rounded-3xl border border-border bg-background p-8 transition-all hover:border-live-cyan/40 hover:shadow-xl hover:shadow-black/5 ${
                    isFull
                      ? "sm:col-span-2 lg:col-span-3 bg-gradient-to-br from-background via-card to-background"
                      : ""
                  }`}
                >
                  {/* Icono real bonito y perfectamente centrado */}
                  <div className="flex justify-center">
                    <span className="grid size-14 place-items-center rounded-2xl border border-border/80 bg-gradient-to-br from-live-cyan/15 via-background to-live-pink/15 text-foreground shadow-sm transition-transform duration-300 group-hover:scale-110">
                      <Icono className="size-7 text-foreground" />
                    </span>
                  </div>

                  {/* Título centrado */}
                  <h3 className="mt-5 text-center text-xl font-bold tracking-tight text-foreground">
                    {b.titulo}
                  </h3>

                  {/* Descripción completa */}
                  <div className="mt-3 space-y-3 text-center">
                    {b.descripcion.map((parrafo, idx) => {
                      const esUltimoDestacado = b.resaltarFinal && idx === b.descripcion.length - 1;

                      if (esUltimoDestacado) {
                        return (
                          <div
                            key={idx}
                            className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm sm:text-base font-bold text-foreground"
                          >
                            {parrafo}
                          </div>
                        );
                      }

                      return (
                        <p
                          key={idx}
                          className="text-sm sm:text-base leading-relaxed text-muted-foreground"
                        >
                          {parrafo}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* En resumen */}
          <div className="mt-16 rounded-3xl border border-border bg-gradient-to-br from-background via-card to-background p-8 sm:p-12 shadow-sm">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <span className="grid size-14 place-items-center rounded-2xl border border-live-cyan/30 bg-live-cyan/10 text-live-cyan shadow-sm">
                  <Tv className="size-7" />
                </span>
              </div>
              <h2 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                En resumen: Tu equipo de producción, analítica, estrategia y promoción
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
                En resumen: seríamos tu equipo de producción, analítica, estrategia y promoción.
                Mientras tú estás frente a la cámara o transmites tus videojuegos, nosotros
                trabajamos detrás de la pantalla, monitoreando tu transmisión, identificando lo que
                necesita mejorar y enviándote recomendaciones y guiones que puedas aplicar durante
                el directo.
              </p>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                La idea es que no tengas que gestionar todo por tu cuenta: contarás con un equipo
                que te orientará durante tus transmisiones para ayudarte a tomar mejores decisiones
                y aprovechar las oportunidades de TikTok LIVE.
              </p>
            </div>
          </div>

          {/* Bloque final destacado: Y lo mejor */}
          <div className="mt-10 rounded-3xl border-2 border-live-pink/40 bg-card p-8 sm:p-12 text-center shadow-xl">
            <div className="mx-auto max-w-2xl">
              <div className="flex justify-center">
                <span className="grid size-14 place-items-center rounded-2xl border border-live-pink/30 bg-live-pink/10 text-live-pink shadow-sm">
                  <CheckCircle2 className="size-7" />
                </span>
              </div>
              <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Y lo mejor
              </h3>
              <p className="mt-4 text-lg sm:text-xl font-bold leading-relaxed text-foreground">
                Puedes acceder a estos beneficios al unirte a nuestra agencia, sin pagar
                absolutamente nada y sin que te descuenten ni un solo céntimo de tus ingresos.
              </p>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
                ¿Te gustaría conocer cómo puedes unirte a nuestra agencia y comenzar a aprovechar
                estos beneficios para tus transmisiones?
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/postular"
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-live-pink to-live-cyan px-8 text-base font-semibold text-white shadow-lg shadow-live-pink/25 transition-transform hover:scale-105"
                >
                  Postular a la Agencia
                  <ArrowRight className="size-5" />
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-background px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  <MessageCircle className="size-5 text-emerald-500" />
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
