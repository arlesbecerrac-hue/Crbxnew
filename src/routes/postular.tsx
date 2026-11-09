import { useState, useRef, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import confetti from "canvas-confetti";
import {
  Check,
  MailCheck,
  ShieldCheck,
  MessageSquare,
  Gamepad2,
  Tv,
  Swords,
  Music,
  Laugh,
  Sparkles,
  GraduationCap,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { PageBanner } from "@/components/page-banner";
import { Field, Area } from "@/components/form-fields";
import { enviarPostulacion, postularSchema } from "@/lib/forms.functions";
import { requisitos, WHATSAPP_URL } from "@/lib/site";
import creatorLive from "@/assets/creator-live.jpg";

export const Route = createFileRoute("/postular")({
  head: () => ({
    meta: [
      { title: "Postular como Creador — CRBX Agencia TikTok LIVE" },
      {
        name: "description",
        content:
          "Envía tu postulación para unirte a CRBX Agencia de TikTok LIVE. Recibe acompañamiento, batallas oficiales y cero comisiones.",
      },
      { property: "og:title", content: "Postular como Creador — CRBX Agencia TikTok LIVE" },
      {
        property: "og:description",
        content:
          "Forma parte de CRBX Agencia oficial de TikTok LIVE. Respuesta rápida en 24 a 48 horas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PostularPage,
});

const paisesComunes = [
  { flag: "🇵🇪", nombre: "Perú" },
  { flag: "🇲🇽", nombre: "México" },
  { flag: "🇨🇴", nombre: "Colombia" },
  { flag: "🇦🇷", nombre: "Argentina" },
  { flag: "🇨🇱", nombre: "Chile" },
  { flag: "🇪🇨", nombre: "Ecuador" },
  { flag: "🇧🇴", nombre: "Bolivia" },
  { flag: "🇻🇪", nombre: "Venezuela" },
  { flag: "🇺🇾", nombre: "Uruguay" },
  { flag: "🇵🇾", nombre: "Paraguay" },
  { flag: "🇬🇹", nombre: "Guatemala" },
  { flag: "🌎", nombre: "Otro país" },
];

const categoriasContenido = [
  { id: "Gaming / Free Fire", label: "Gaming / Free Fire", icon: Gamepad2 },
  { id: "Charla / Entretenimiento / IRL", label: "Charla / IRL", icon: Tv },
  { id: "Batallas PK", label: "Batallas PK", icon: Swords },
  { id: "Música / Canto / Instrumentos", label: "Música & Canto", icon: Music },
  { id: "Comedia / Humor", label: "Comedia & Humor", icon: Laugh },
  { id: "Belleza / Moda / Estilo", label: "Belleza & Moda", icon: Sparkles },
  { id: "Educación / Consejos", label: "Educación / Tips", icon: GraduationCap },
  { id: "Otra categoría", label: "Otra categoría", icon: Layers },
];

const nivelesExperiencia = [
  { id: "Nunca he hecho un live", label: "Principiante", desc: "Nunca he hecho un live" },
  { id: "Menos de 3 meses", label: "Inicial", desc: "Menos de 3 meses transmitiendo" },
  { id: "De 3 a 12 meses", label: "Intermedio", desc: "De 3 a 12 meses activo" },
  { id: "Más de 1 año", label: "Experimentado", desc: "Más de 1 año en TikTok LIVE" },
];

const opcionesDisponibilidad = [
  { id: "Tiempo parcial (10 a 20 horas / mes)", label: "Tiempo parcial", horas: "10 a 20 h / mes" },
  { id: "Medio tiempo (20 a 40 horas / mes)", label: "Medio tiempo", horas: "20 a 40 h / mes" },
  { id: "Tiempo completo (40+ horas / mes)", label: "Tiempo completo", horas: "40+ horas / mes" },
];

interface SubmittedData {
  nombre: string;
  email: string;
  telefono: string;
  tiktok: string;
  categorias: string[];
}

function triggerCelebrationConfetti(originY = 0.25) {
  // Disparo central inicial directamente sobre el nombre
  confetti({
    particleCount: 85,
    spread: 75,
    origin: { x: 0.5, y: originY },
    colors: ["#06b6d4", "#f43f5e", "#a855f7", "#38bdf8", "#fb7185", "#ffd700"],
    ticks: 280,
  });

  // Cañones laterales apuntando hacia el centro donde está el nombre
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0.05, y: originY + 0.05 },
      colors: ["#06b6d4", "#f43f5e", "#a855f7", "#ffffff"],
      ticks: 300,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 0.95, y: originY + 0.05 },
      colors: ["#06b6d4", "#f43f5e", "#a855f7", "#ffffff"],
      ticks: 300,
    });
  }, 180);

  // Segunda ráfaga de estrellas y destellos dorados
  setTimeout(() => {
    confetti({
      particleCount: 45,
      spread: 100,
      origin: { x: 0.5, y: Math.max(0.12, originY - 0.06) },
      colors: ["#06b6d4", "#f43f5e", "#ffd700"],
      shapes: ["circle"],
      scalar: 1.2,
    });
  }, 380);
}

function PostularPage() {
  const send = useServerFn(enviarPostulacion);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  // Estados de selección personalizada
  const [pais, setPais] = useState("Perú");
  const [otroPaisInput, setOtroPaisInput] = useState("");
  // Soporte de selección de múltiples categorías
  const [categorias, setCategorias] = useState<string[]>([categoriasContenido[0].id]);
  const [experiencia, setExperiencia] = useState(nivelesExperiencia[0].id);
  const [disponibilidad, setDisponibilidad] = useState(opcionesDisponibilidad[1].id);

  const toggleCategoria = (id: string) => {
    setCategorias((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) {
          toast.info("Debes mantener al menos una categoría seleccionada");
          return prev;
        }
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (categorias.length === 0) {
      toast.error("Por favor selecciona al menos una categoría de contenido.");
      return;
    }

    const paisFinal = pais === "Otro país" && otroPaisInput.trim() ? otroPaisInput.trim() : pais;
    if (pais === "Otro país" && !otroPaisInput.trim()) {
      toast.error("Por favor especifica tu país.");
      return;
    }

    formData.set("pais", paisFinal);
    formData.set("categoria", categorias.join(", "));
    formData.set("experiencia", experiencia);
    formData.set("disponibilidad", disponibilidad);

    const rawData = Object.fromEntries(formData);
    const parsed = postularSchema.safeParse(rawData);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      toast.error(
        firstIssue?.message || "Por favor completa los campos obligatorios del formulario.",
      );
      return;
    }

    setLoading(true);
    try {
      await send({ data: parsed.data });
      setSubmittedData({
        nombre: parsed.data.nombre,
        email: parsed.data.email,
        telefono: parsed.data.telefono,
        tiktok: parsed.data.tiktok.startsWith("@") ? parsed.data.tiktok : `@${parsed.data.tiktok}`,
        categorias,
      });

      // Subir inmediatamente la pantalla a la tarjeta de confirmación justo donde está el nombre
      window.scrollTo({ top: 0, behavior: "instant" });
      setTimeout(() => {
        if (confirmationRef.current) {
          confirmationRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        triggerCelebrationConfetti(0.24);
      }, 60);

      toast.success("¡Postulación enviada! Revisa también tu correo.");
      form.reset();
    } catch {
      toast.error("No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageBanner label="Postular a CRBX" />

      {submittedData ? (
        <section
          ref={confirmationRef}
          className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-14 w-full flex justify-center"
        >
          <div className="w-full overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
            {/* Tarjeta de Confirmación en Formato Limpio y perfectamente centrada */}
            <div className="bg-gradient-to-r from-live-cyan/15 via-purple-500/10 to-live-pink/15 p-6 sm:p-8 text-center border-b border-border">
              <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-background shadow-lg ring-2 ring-live-cyan">
                <MailCheck className="size-7 text-live-cyan" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                ¡Hola {submittedData.nombre}!
              </h2>
              <p className="mt-2 text-base font-semibold text-live-pink">
                Recibimos tu postulación para unirte a CRBX Agencia
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3.5 py-1 text-xs text-muted-foreground border border-border">
                <span>Notificación enviada a tu correo:</span>
                <strong className="text-foreground">{submittedData.email}</strong>
              </div>
            </div>

            <div className="p-6 sm:p-10 space-y-6">
              <p className="text-sm text-foreground/90 leading-relaxed">
                Gracias por postularte para formar parte de la familia <strong>CRBX Agencia</strong>{" "}
                como creador oficial de <strong>TikTok LIVE</strong>.
              </p>

              {/* Categorías postuladas */}
              <div className="rounded-2xl border border-border bg-background/50 p-4">
                <span className="text-xs font-semibold text-muted-foreground block mb-2">
                  Categorías seleccionadas:
                </span>
                <div className="flex flex-wrap gap-2">
                  {submittedData.categorias.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full bg-live-pink/10 border border-live-pink/30 px-3 py-1 text-xs font-semibold text-live-pink"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-base text-foreground tracking-tight">
                  ¿Qué sigue ahora?
                </h3>

                <div className="space-y-3">
                  <div className="flex gap-4 rounded-2xl border border-border bg-background/60 p-4">
                    <div className="grid size-8 shrink-0 place-items-center rounded-full bg-live-cyan text-black font-extrabold text-sm">
                      1
                    </div>
                    <div className="text-sm">
                      <strong className="text-foreground">Revisión de tu cuenta:</strong>
                      <p className="text-muted-foreground mt-0.5">
                        Nuestro equipo de reclutamiento analizará tu perfil de TikTok (
                        <span className="font-semibold text-live-cyan">{submittedData.tiktok}</span>
                        ).
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 rounded-2xl border border-border bg-background/60 p-4">
                    <div className="grid size-8 shrink-0 place-items-center rounded-full bg-purple-500 text-white font-extrabold text-sm">
                      2
                    </div>
                    <div className="text-sm">
                      <strong className="text-foreground">Contacto directo:</strong>
                      <p className="text-muted-foreground mt-0.5">
                        Te escribiremos por WhatsApp al{" "}
                        <span className="font-semibold text-purple-400">
                          {submittedData.telefono}
                        </span>{" "}
                        o correo en un plazo de <strong>24 a 48 horas</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 rounded-2xl border border-border bg-background/60 p-4">
                    <div className="grid size-8 shrink-0 place-items-center rounded-full bg-live-pink text-white font-extrabold text-sm">
                      3
                    </div>
                    <div className="text-sm">
                      <strong className="text-foreground">Invitación oficial:</strong>
                      <p className="text-muted-foreground mt-0.5">
                        Recibirás la invitación oficial de CRBX directamente dentro de tu aplicación
                        de TikTok en la sección de <strong>Centro de Creadores LIVE</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-live-cyan/30 bg-live-cyan/5 p-4 text-xs sm:text-sm text-foreground/90 leading-relaxed flex items-start gap-3">
                <ShieldCheck className="size-5 shrink-0 text-live-cyan mt-0.5" />
                <div>
                  <strong>Recuerda que unirte a CRBX es 100% gratuito.</strong> Nunca te pediremos
                  contraseñas de tu cuenta ni te cobraremos ningún tipo de comisión sobre tus
                  diamantes (conservas el 100% de lo que ganas).
                </div>
              </div>

              <div className="text-center pt-2 border-t border-border">
                <p className="font-bold text-foreground text-sm">
                  ¡Nos vemos pronto en los directos!
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">El equipo de CRBX Agencia</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <MessageSquare className="size-4" />
                  Escribir por WhatsApp ahora
                </a>
                <button
                  onClick={() => {
                    setSubmittedData(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:bg-secondary"
                >
                  Enviar otra postulación
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 py-12 sm:py-16 lg:grid-cols-5">
          {/* Columna Lateral con Foto y Requisitos */}
          <div className="lg:col-span-2 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
              <img
                src={creatorLive}
                alt="Creadora transmitiendo en TikTok LIVE con CRBX"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full object-cover aspect-[4/3]"
              />
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-bold text-base text-foreground mb-4">
                Requisitos indispensables:
              </h3>
              <ul className="space-y-3.5">
                {requisitos.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-live-cyan/20 text-live-cyan">
                      <Check className="size-3" />
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Banner de Cero Comisiones */}
            <div className="rounded-3xl border border-live-pink/30 bg-live-pink/5 p-5 text-xs text-foreground/90 leading-relaxed flex items-start gap-3">
              <ShieldCheck className="size-5 shrink-0 text-live-pink mt-0.5" />
              <div>
                <strong>Cero comisiones:</strong> Conservas el 100% de los diamantes y regalos que
                envían tus seguidores. CRBX no te cobra ninguna tarifa por pertenecer a la agencia.
              </div>
            </div>
          </div>

          {/* Columna Principal: Formulario con UI Customizada */}
          <div className="lg:col-span-3">
            <form
              onSubmit={onSubmit}
              className="space-y-7 rounded-3xl border border-border bg-card p-7 sm:p-8 shadow-xl"
            >
              {/* Datos Personales */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-live-cyan mb-3">
                  1. Datos de Contacto
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Nombre completo *"
                    name="nombre"
                    required
                    maxLength={100}
                    placeholder="Ej. Carlos Mendoza"
                  />
                  <Field
                    label="Edad *"
                    name="edad"
                    type="number"
                    required
                    maxLength={3}
                    placeholder="18"
                  />
                  <Field
                    label="Correo electrónico *"
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    placeholder="tu@correo.com"
                  />
                  <Field
                    label="Teléfono / WhatsApp *"
                    name="telefono"
                    type="tel"
                    required
                    maxLength={30}
                    placeholder="+51 900 000 000"
                  />
                </div>
              </div>

              {/* Selector Visual de País */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  País de residencia *
                </label>
                <div className="flex flex-wrap gap-2">
                  {paisesComunes.map((p) => {
                    const active = pais === p.nombre;
                    return (
                      <button
                        type="button"
                        key={p.nombre}
                        onClick={() => setPais(p.nombre)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                          active
                            ? "bg-foreground text-background ring-2 ring-primary shadow-sm"
                            : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                        }`}
                      >
                        <span>{p.flag}</span>
                        <span>{p.nombre}</span>
                      </button>
                    );
                  })}
                </div>
                {pais === "Otro país" && (
                  <div className="mt-3">
                    <Field
                      label="Especifica tu país *"
                      name="otroPais"
                      required
                      placeholder="Ej. España, Costa Rica, Estados Unidos..."
                      onChange={(e) => setOtroPaisInput(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Perfil de TikTok */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-live-pink mb-3">
                  2. Tu Cuenta de TikTok
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Usuario de TikTok *"
                    name="tiktok"
                    required
                    placeholder="@tuusuario"
                  />
                  <Field
                    label="Número aproximado de seguidores"
                    name="seguidores"
                    maxLength={30}
                    placeholder="Ej. 1.2K, 15K, 100K"
                  />
                </div>
              </div>

              {/* Selector Visual de Múltiples Categorías */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-muted-foreground">
                    Categorías de tu contenido en vivo (puedes seleccionar varias) *
                  </label>
                  <span className="text-[11px] font-semibold text-live-pink">
                    {categorias.length} seleccionada{categorias.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {categoriasContenido.map((c) => {
                    const active = categorias.includes(c.id);
                    const Icon = c.icon;
                    return (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => toggleCategoria(c.id)}
                        className={`relative flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all ${
                          active
                            ? "border-live-pink bg-live-pink/15 ring-2 ring-live-pink text-foreground shadow-sm"
                            : "border-border bg-background/50 hover:bg-background hover:border-border/80 text-muted-foreground"
                        }`}
                      >
                        {active && (
                          <span className="absolute top-2 right-2 flex size-4 items-center justify-center rounded-full bg-live-pink text-white text-[10px] font-black shadow-sm">
                            ✓
                          </span>
                        )}
                        <Icon
                          className={`size-5 mb-1.5 ${active ? "text-live-pink" : "text-muted-foreground"}`}
                        />
                        <span
                          className={`text-xs font-semibold ${active ? "text-foreground font-bold" : "text-foreground"}`}
                        >
                          {c.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selector Visual de Experiencia */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Experiencia en TikTok LIVE *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {nivelesExperiencia.map((exp) => {
                    const active = experiencia === exp.id;
                    return (
                      <button
                        type="button"
                        key={exp.id}
                        onClick={() => setExperiencia(exp.id)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          active
                            ? "border-live-cyan bg-live-cyan/10 ring-1 ring-live-cyan shadow-sm"
                            : "border-border bg-background/50 hover:bg-background text-muted-foreground"
                        }`}
                      >
                        <p
                          className={`text-xs font-bold ${active ? "text-foreground" : "text-foreground"}`}
                        >
                          {exp.label}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
                          {exp.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selector Visual de Disponibilidad */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Disponibilidad mensual estimada *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {opcionesDisponibilidad.map((disp) => {
                    const active = disponibilidad === disp.id;
                    return (
                      <button
                        type="button"
                        key={disp.id}
                        onClick={() => setDisponibilidad(disp.id)}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          active
                            ? "border-live-pink bg-live-pink/10 ring-1 ring-live-pink shadow-sm"
                            : "border-border bg-background/50 hover:bg-background text-muted-foreground"
                        }`}
                      >
                        <span
                          className={`block text-xs font-bold ${active ? "text-foreground" : "text-foreground"}`}
                        >
                          {disp.label}
                        </span>
                        <span className="text-[11px] text-muted-foreground mt-0.5 block">
                          {disp.horas}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Area
                label="Cuéntanos tus metas o dudas (opcional)"
                name="mensaje"
                placeholder="¿Qué te gustaría lograr en TikTok LIVE con CRBX?"
              />

              <button
                disabled={loading}
                className="w-full rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 shadow-xl shadow-primary/25 transition-all text-base"
              >
                {loading ? "Enviando postulación…" : "Enviar postulación a CRBX"}
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
