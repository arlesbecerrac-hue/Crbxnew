import { createFileRoute } from "@tanstack/react-router";
import { Check, Gift, Sparkles, Trophy } from "lucide-react";
import { PageBanner } from "@/components/page-banner";
import { CtaBand } from "@/components/cta-band";
import { TikTokPlayer } from "@/components/tiktok-embed";

export const Route = createFileRoute("/monetizacion")({
  head: () => ({
    meta: [
      { title: "Monetización — CRBX Agencia de TikTok LIVE" },
      { name: "description", content: "Cómo funcionan los regalos, diamantes e incentivos de TikTok LIVE con CRBX." },
      { property: "og:title", content: "Monetización — CRBX Agencia de TikTok LIVE" },
      { property: "og:description", content: "Cómo funcionan los regalos, diamantes e incentivos de TikTok LIVE con CRBX." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MonetizacionPage,
});

function MonetizacionPage() {
  return (
    <>
      <PageBanner label="Monetización" />
      <section id="monetizacion" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Video de Regalos y Diamantes LIVE con TikTokPlayer oficial */}
          <div className="flex justify-center">
            <div className="w-full max-w-[340px]">
              <TikTokPlayer
                videoId="7541198459685129478"
                title="Lluvia de regalos y diamantes en directo"
                aspect="vertical"
              />
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Demostración de lluvia de regalos virtuales, multiplicadores y diamantes en TikTok LIVE.
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-live-cyan">
              Monetización Oficial
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Regalos, diamantes e ingresos reales
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              En TikTok LIVE tu audiencia te apoya con regalos virtuales que se
              convierten en diamantes y luego en dinero en tu cuenta bancaria. Como parte de CRBX
              accedes a incentivos adicionales oficiales de la plataforma y a metas
              mensuales que premian tu constancia.
            </p>
            <ul className="mt-7 space-y-4">
              {[
                "El 100% de tus diamantes y regalos es tuyo: cero comisiones de CRBX.",
                "Los retiros los realizas tú directamente desde tu aplicación de TikTok a tu banco.",
                "Incentivos por horas de transmisión y metas de diamantes de TikTok LIVE.",
                "Batallas PK oficiales que multiplican la llegada de regalos en tiempo real.",
                "Reportes claros de tu rendimiento mensual y asesoría personalizada.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-live-cyan" />
                  <span className="text-sm text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Franja CTA */}
      <CtaBand />
    </>
  );
}
