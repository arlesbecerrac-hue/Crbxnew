import { createFileRoute } from "@tanstack/react-router";
import { Check, MapPin, Gift, Users, Swords, GraduationCap } from "lucide-react";
import { beneficios, pasos, requisitos, preguntas } from "@/lib/site";
import { PageBanner } from "@/components/page-banner";
import { CtaBand } from "@/components/cta-band";
import creatorLive from "@/assets/creator-live.jpg";
import liveGifts from "@/assets/live-gifts.jpg";

export const Route = createFileRoute("/beneficios")({
  head: () => ({
    meta: [
      { title: "Beneficios — CRBX Agencia de TikTok LIVE" },
      { name: "description", content: "Monetización, acompañamiento, batallas PK y capacitación para creadores de TikTok LIVE." },
      { property: "og:title", content: "Beneficios — CRBX Agencia de TikTok LIVE" },
      { property: "og:description", content: "Monetización, acompañamiento, batallas PK y capacitación para creadores de TikTok LIVE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BeneficiosPage,
});

function BeneficiosPage() {
  return (
    <>
      <PageBanner label="Beneficios" />
      <section id="beneficios" className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-live-cyan">
            Beneficios
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Qué obtienes al unirte a CRBX
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {beneficios.map((b) => (
              <div
                key={b.titulo}
                className="rounded-2xl border border-border bg-background p-7 transition-shadow hover:shadow-lg hover:shadow-black/5"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-live-cyan/20 to-live-pink/20">
                  <b.icono className="size-5 text-foreground" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{b.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {b.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
