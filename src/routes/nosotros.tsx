import { createFileRoute } from "@tanstack/react-router";
import { Check, MapPin, Gift, Users, Swords, GraduationCap } from "lucide-react";
import { beneficios, pasos, requisitos, preguntas } from "@/lib/site";
import { PageBanner } from "@/components/page-banner";
import { CtaBand } from "@/components/cta-band";
import creatorLive from "@/assets/creator-live.jpg";
import liveGifts from "@/assets/live-gifts.jpg";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — CRBX Agencia de TikTok LIVE" },
      { name: "description", content: "Conoce CRBX, la agencia de TikTok LIVE de Carbe Global Corp SAC en Lima, Perú." },
      { property: "og:title", content: "Nosotros — CRBX Agencia de TikTok LIVE" },
      { property: "og:description", content: "Conoce CRBX, la agencia de TikTok LIVE de Carbe Global Corp SAC en Lima, Perú." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NosotrosPage,
});

function NosotrosPage() {
  return (
    <>
      <PageBanner label="Nosotros" />
      <section id="nosotros" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-live-cyan">
              Nosotros
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Una agencia peruana para creadores de toda Latinoamérica
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              CRBX es la agencia de TikTok LIVE de Carbe Global Corp SAC, una
              empresa peruana constituida con RUC 20616178769. Nacimos en Lima
              con una convicción: el talento latinoamericano merece
              acompañamiento profesional para vivir de las transmisiones en
              vivo.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Trabajamos de la mano con cada creador: revisamos métricas,
              planificamos contenido, organizamos batallas y resolvemos dudas
              todos los días. No somos un número más en tu cuenta; somos tu
              equipo.
            </p>
            <div className="mt-7 flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0 text-live-pink" />
              Lima, Perú — operación remota para toda LATAM
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-live-cyan/25 to-live-pink/25 blur-2xl" />
            <img
              src={creatorLive}
              alt="Creadora de CRBX transmitiendo en vivo"
              width={1024}
              height={1024}
              loading="lazy"
              className="relative rounded-3xl border border-border object-cover shadow-xl shadow-black/10"
            />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
