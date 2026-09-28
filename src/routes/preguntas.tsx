import { createFileRoute } from "@tanstack/react-router";
import { Check, MapPin, Gift, Users, Swords, GraduationCap } from "lucide-react";
import { beneficios, pasos, requisitos, preguntas } from "@/lib/site";
import { PageBanner } from "@/components/page-banner";
import { CtaBand } from "@/components/cta-band";
import creatorLive from "@/assets/creator-live.jpg";
import liveGifts from "@/assets/live-gifts.jpg";

export const Route = createFileRoute("/preguntas")({
  head: () => ({
    meta: [
      { title: "Preguntas frecuentes — CRBX Agencia de TikTok LIVE" },
      { name: "description", content: "Respuestas a las dudas más comunes sobre la agencia CRBX de TikTok LIVE." },
      { property: "og:title", content: "Preguntas frecuentes — CRBX Agencia de TikTok LIVE" },
      { property: "og:description", content: "Respuestas a las dudas más comunes sobre la agencia CRBX de TikTok LIVE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PreguntasPage,
});

function PreguntasPage() {
  return (
    <>
      <PageBanner label="Preguntas frecuentes" />
      <section id="preguntas" className="border-t border-border bg-card">
        <div className="mx-auto max-w-3xl scroll-mt-24 px-6 py-24">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-live-cyan">
            Preguntas frecuentes
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Resolvemos tus dudas
          </h2>
          <div className="mt-12 space-y-4">
            {preguntas.map((p) => (
              <details
                key={p.pregunta}
                className="group rounded-2xl border border-border bg-background p-6 open:shadow-md open:shadow-black/5"
              >
                <summary className="cursor-pointer list-none text-base font-semibold marker:hidden">
                  {p.pregunta}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.respuesta}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
