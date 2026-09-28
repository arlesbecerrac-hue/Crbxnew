import { createFileRoute } from "@tanstack/react-router";
import { Check, MapPin, Gift, Users, Swords, GraduationCap } from "lucide-react";
import { beneficios, pasos, requisitos, preguntas } from "@/lib/site";
import { PageBanner } from "@/components/page-banner";
import { CtaBand } from "@/components/cta-band";
import creatorLive from "@/assets/creator-live.jpg";
import liveGifts from "@/assets/live-gifts.jpg";

export const Route = createFileRoute("/proceso")({
  head: () => ({
    meta: [
      { title: "Proceso y requisitos — CRBX Agencia de TikTok LIVE" },
      { name: "description", content: "Los 4 pasos para unirte a CRBX y los requisitos para postular." },
      { property: "og:title", content: "Proceso y requisitos — CRBX Agencia de TikTok LIVE" },
      { property: "og:description", content: "Los 4 pasos para unirte a CRBX y los requisitos para postular." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProcesoPage,
});

function ProcesoPage() {
  return (
    <>
      <PageBanner label="Proceso y requisitos" />
      <section id="proceso" className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-live-cyan">
            Proceso
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Cómo empezar
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pasos.map((p) => (
              <div key={p.numero} className="rounded-2xl border border-border bg-background p-6">
                <span className="font-display text-sm font-bold text-live-pink">
                  {p.numero}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requisitos */}
      <section id="requisitos" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-live-cyan">
              Requisitos
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Lo que necesitas para postular
            </h2>
            <p className="mt-4 text-muted-foreground">
              Buscamos personas con ganas de transmitir en serio. Si cumples
              estos puntos, puedes postular hoy.
            </p>
          </div>
          <ul className="space-y-4">
            {requisitos.map((r) => (
              <li key={r} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-live-cyan/20">
                  <Check className="size-3.5 text-foreground" />
                </span>
                <span className="text-sm leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
