import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Building2,
  Briefcase,
  Handshake,
  Headphones,
  Newspaper,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { PageBanner } from "@/components/page-banner";
import { Field, Area } from "@/components/form-fields";
import { enviarContacto, contactoSchema } from "@/lib/forms.functions";
import { WHATSAPP_URL, EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto Corporativo y Alianzas — CRBX Agencia" },
      {
        name: "description",
        content:
          "Contacto oficial para marcas, alianzas comerciales, prensa y soporte de la agencia de TikTok LIVE CRBX (Carbe Global Corp SAC).",
      },
      { property: "og:title", content: "Contacto Corporativo y Alianzas — CRBX Agencia" },
      {
        property: "og:description",
        content:
          "Ponte en contacto con el equipo directivo de CRBX para marcas, patrocinios, medios y atención general.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactoPage,
});

const motivosContacto = [
  { id: "Marcas y Patrocinios", label: "Marcas y Patrocinios", icon: Briefcase, desc: "Campañas con nuestros streamers" },
  { id: "Alianzas Comerciales", label: "Alianzas Comerciales", icon: Handshake, desc: "Convenios, agencias y eventos" },
  { id: "Soporte Creador Activo", label: "Soporte Creador Activo", icon: Headphones, desc: "Atención para miembros CRBX" },
  { id: "Prensa y Medios", label: "Prensa y Medios", icon: Newspaper, desc: "Entrevistas y comunicados" },
  { id: "Consulta General", label: "Consulta General", icon: HelpCircle, desc: "Información institucional" },
];

function ContactoPage() {
  const send = useServerFn(enviarContacto);
  const [loading, setLoading] = useState(false);
  const [selectedMotivo, setSelectedMotivo] = useState(motivosContacto[0].id);
  const [canalRespuesta, setCanalRespuesta] = useState("WhatsApp");
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("motivo", selectedMotivo);
    formData.set("canalRespuesta", canalRespuesta);

    const parsed = contactoSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      toast.error("Revisa los datos: completa todos los campos requeridos.");
      return;
    }

    setLoading(true);
    try {
      await send({ data: parsed.data });
      setSubmitted(true);
      toast.success("Mensaje corporativo enviado correctamente.");
      form.reset();
    } catch {
      toast.error("No se pudo enviar. Intenta de nuevo o contáctanos por WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  const canales = [
    { icon: MessageCircle, label: "WhatsApp Directo", value: PHONE_DISPLAY, href: WHATSAPP_URL },
    { icon: Phone, label: "Central Telefónica", value: PHONE_DISPLAY, href: PHONE_TEL },
    { icon: Mail, label: "Correo Corporativo", value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: MapPin, label: "Sede Principal", value: "Lima, Perú" },
    { icon: Building2, label: "Razón Social", value: "Carbe Global Corp SAC — RUC 20616178769" },
  ];

  return (
    <>
      <PageBanner label="Contacto Corporativo" />
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-5">
        
        {/* Canales de atención institucional */}
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm mb-6">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Atención Institucional
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Canal oficial para empresas, marcas, relaciones públicas y soporte a creadores ya vinculados a CRBX.
            </p>
          </div>

          {canales.map((c) => {
            const inner = (
              <>
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="size-5" />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">{c.label}</span>
                  <span className="block text-sm font-semibold text-foreground">{c.value}</span>
                </span>
              </>
            );
            return c.href ? (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
              >
                {inner}
              </a>
            ) : (
              <div key={c.label} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                {inner}
              </div>
            );
          })}
        </div>

        {/* Formulario Corporativo */}
        <div className="lg:col-span-3">
          {submitted ? (
            <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-xl">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-live-cyan/20 text-live-cyan">
                <CheckCircle2 className="size-8" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">¡Mensaje Enviado con Éxito!</h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">
                Hemos recibido tu solicitud sobre <strong>{selectedMotivo}</strong>. Nuestro equipo de gestión se comunicará contigo vía {canalRespuesta} en breve.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:bg-secondary"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6 rounded-3xl border border-border bg-card p-7 sm:p-8 shadow-xl">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Motivo de contacto *
                </label>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {motivosContacto.map((m) => {
                    const active = selectedMotivo === m.id;
                    const Icon = m.icon;
                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setSelectedMotivo(m.id)}
                        className={`flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                          active
                            ? "border-live-cyan bg-live-cyan/10 ring-1 ring-live-cyan shadow-sm"
                            : "border-border bg-background/50 hover:bg-background hover:border-border/80"
                        }`}
                      >
                        <div className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg ${active ? "bg-live-cyan text-black" : "bg-muted text-muted-foreground"}`}>
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${active ? "text-foreground font-bold" : "text-foreground"}`}>
                            {m.label}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{m.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nombre del contacto *" name="nombre" required maxLength={100} placeholder="Ej. Roberto Gómez" />
                <Field label="Empresa u Organización" name="empresa" maxLength={100} placeholder="Ej. Agencia / Marca / Canal" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Correo electrónico *" name="email" type="email" required maxLength={255} placeholder="contacto@empresa.com" />
                <Field label="Teléfono / WhatsApp *" name="telefono" type="tel" required maxLength={30} placeholder="+51 900 000 000" />
              </div>

              {/* Selector de medio preferido de respuesta */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Medio preferido de respuesta
                </label>
                <div className="flex gap-3">
                  {["WhatsApp", "Correo electrónico"].map((canal) => {
                    const active = canalRespuesta === canal;
                    return (
                      <button
                        type="button"
                        key={canal}
                        onClick={() => setCanalRespuesta(canal)}
                        className={`flex-1 rounded-xl border py-2.5 px-4 text-xs font-semibold transition-all ${
                          active
                            ? "border-live-pink bg-live-pink/10 text-foreground ring-1 ring-live-pink"
                            : "border-border bg-background/60 text-muted-foreground hover:bg-background"
                        }`}
                      >
                        Responder por {canal}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Field label="Asunto de la solicitud *" name="asunto" required maxLength={150} placeholder="Ej. Alianza comercial para campaña de directos" />
              <Area label="Mensaje detallado *" name="mensaje" required placeholder="Describe tu propuesta, objetivo o consulta institucional..." />

              <button
                disabled={loading}
                className="w-full rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 shadow-lg shadow-primary/20 transition-all"
              >
                {loading ? "Enviando mensaje…" : "Enviar Consulta Corporativa"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
