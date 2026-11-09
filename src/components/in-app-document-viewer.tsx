import { useState } from "react";
import {
  X,
  Maximize2,
  Minimize2,
  RotateCw,
  FileText,
  BookOpen,
  ExternalLink,
  Check,
  Copy,
  Printer,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import type { CursoRecurso } from "@/lib/courses-data";
import crbxLogo from "@/assets/crbx-logo.png";

interface InAppDocumentViewerProps {
  recurso: CursoRecurso | null;
  onClose: () => void;
}

export function InAppDocumentViewer({ recurso, onClose }: InAppDocumentViewerProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [modoVisor, setModoVisor] = useState<"lectura" | "embed">("lectura");
  const [copiado, setCopiado] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  if (!recurso) return null;

  const isPdf = recurso.tipo === "pdf" || recurso.url.endsWith(".pdf");
  const embedUrl = isPdf
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(recurso.url)}&embedded=true`
    : recurso.url;

  function recargarVisor() {
    setIframeError(false);
    setIframeKey((prev) => prev + 1);
  }

  function copiarEnlace() {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(recurso.url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  }

  function handleImprimir() {
    window.print();
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md transition-all ${
        fullscreen ? "p-0" : "p-2 sm:p-4 lg:p-6"
      }`}
    >
      <div
        className={`flex flex-col size-full overflow-hidden bg-card shadow-2xl transition-all border border-border/40 ${
          fullscreen ? "rounded-none" : "rounded-2xl sm:rounded-3xl"
        }`}
      >
        {/* Barra superior de control del Visor In-App */}
        <header className="flex items-center justify-between gap-3 bg-background/90 px-4 py-3 sm:px-6 border-b border-border/50 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="grid size-9 sm:size-10 shrink-0 place-items-center rounded-xl bg-live-cyan/10 text-live-cyan">
              {isPdf ? (
                <FileText className="size-4 sm:size-5" />
              ) : (
                <BookOpen className="size-4 sm:size-5" />
              )}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
                  {recurso.tipoEtiqueta}
                </span>
                <span className="text-[11px] text-muted-foreground truncate hidden sm:inline">
                  {recurso.fuente}
                </span>
              </div>
              <h3 className="font-display text-sm sm:text-base font-bold text-foreground truncate mt-0.5">
                {recurso.titulo}
              </h3>
            </div>
          </div>

          {/* Acciones y controles */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Alternador de Vista */}
            <div className="flex items-center rounded-xl bg-secondary/80 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setModoVisor("lectura")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  modoVisor === "lectura"
                    ? "bg-foreground text-background shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Guía y Estudio
              </button>
              <button
                type="button"
                onClick={() => setModoVisor("embed")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  modoVisor === "embed"
                    ? "bg-foreground text-background shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Visor Web
              </button>
            </div>

            <button
              type="button"
              onClick={handleImprimir}
              title="Imprimir documento"
              className="hidden sm:grid size-8 sm:size-9 place-items-center rounded-xl bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Printer className="size-3.5 sm:size-4" />
            </button>

            <button
              type="button"
              onClick={recargarVisor}
              title="Recargar documento"
              className="grid size-8 sm:size-9 place-items-center rounded-xl bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <RotateCw className="size-3.5 sm:size-4" />
            </button>

            <button
              type="button"
              onClick={copiarEnlace}
              title="Copiar enlace del recurso"
              className="grid size-8 sm:size-9 place-items-center rounded-xl bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {copiado ? (
                <Check className="size-3.5 sm:size-4 text-emerald-500" />
              ) : (
                <Copy className="size-3.5 sm:size-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setFullscreen(!fullscreen)}
              title={fullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
              className="hidden sm:grid size-8 sm:size-9 place-items-center rounded-xl bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {fullscreen ? (
                <Minimize2 className="size-3.5 sm:size-4" />
              ) : (
                <Maximize2 className="size-3.5 sm:size-4" />
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              title="Cerrar visor"
              className="grid size-8 sm:size-9 place-items-center rounded-xl bg-secondary text-foreground hover:bg-destructive/20 hover:text-destructive transition-colors ml-1"
            >
              <X className="size-4 sm:size-5" />
            </button>
          </div>
        </header>

        {/* Cuerpo del Visor */}
        <div className="relative flex-1 bg-background overflow-hidden">
          {modoVisor === "embed" ? (
            <div className="relative size-full bg-[#0a0d14]">
              {iframeError ? (
                <div className="size-full flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <ShieldCheck className="size-12 text-live-pink" />
                  <h3 className="font-display text-lg font-bold text-foreground">
                    El portal externo requiere apertura en navegador
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-md">
                    Por políticas de seguridad de TikTok y Google, algunos dominios externos
                    restringen su carga dentro de marcos de aplicación.
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setModoVisor("lectura")}
                      className="rounded-xl bg-secondary px-4 py-2 text-xs font-bold text-foreground hover:bg-secondary/80"
                    >
                      Ver Guía de Estudio
                    </button>
                    <a
                      href={recurso.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-live-pink to-live-cyan px-4 py-2 text-xs font-bold text-white shadow-md"
                    >
                      <ExternalLink className="size-3.5" />
                      Abrir enlace en pestaña
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <iframe
                    key={iframeKey}
                    src={embedUrl}
                    title={recurso.titulo}
                    className="size-full border-0 bg-background"
                    allow="autoplay; encrypted-media; fullscreen"
                    loading="lazy"
                    onError={() => setIframeError(true)}
                  />

                  {/* Barra inferior */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl bg-background/90 border border-border px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-md shadow-lg">
                    <span>¿Problemas cargando?</span>
                    <button
                      type="button"
                      onClick={() => setModoVisor("lectura")}
                      className="font-bold text-live-cyan hover:underline"
                    >
                      Ver Guía Completa
                    </button>
                    <span className="text-border">|</span>
                    <a
                      href={recurso.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-live-pink hover:underline"
                    >
                      <ExternalLink className="size-3" />
                      Abrir enlace
                    </a>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Vista de Estudio Editorial Nativo */
            <div className="size-full overflow-y-auto p-4 sm:p-8 lg:p-12 max-w-4xl mx-auto space-y-8">
              {/* Encabezado con branding oficial */}
              <div className="rounded-3xl bg-card border border-border/50 p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center justify-between gap-3 border-b border-border/40 pb-4">
                  <div className="flex items-center gap-2.5">
                    <img src={crbxLogo} alt="CRBX" className="h-6 sm:h-7 w-auto object-contain" />
                    <span className="text-[11px] font-bold text-live-cyan uppercase tracking-wider">
                      Academia Oficial de Creadores
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-semibold">
                    Fuente: {recurso.fuente}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-live-pink">
                    {recurso.moduloTitulo}
                  </span>
                  <h2 className="font-display text-xl sm:text-3xl font-bold text-foreground mt-1">
                    {recurso.titulo}
                  </h2>
                  {recurso.subtitulo && (
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1">
                      {recurso.subtitulo}
                    </p>
                  )}
                </div>

                <div className="rounded-2xl bg-secondary/50 p-4 sm:p-5">
                  <h4 className="font-display text-xs font-bold uppercase tracking-wider text-foreground mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-live-cyan" />
                    Descripción y Fundamento Técnico
                  </h4>
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
                    {recurso.descripcion}
                  </p>
                </div>
              </div>

              {/* Puntos Clave y Objetivos */}
              <div className="space-y-4">
                <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
                  Puntos Clave y Directrices para tus LIVEs
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {recurso.puntosClave.map((punto, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border/50 bg-card p-4 flex items-start gap-3 shadow-xs"
                    >
                      <span className="size-6 rounded-full bg-live-cyan/15 text-live-cyan text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">
                        {punto}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setModoVisor("embed")}
                  className="inline-flex items-center gap-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2.5 text-xs font-bold transition-colors"
                >
                  <FileText className="size-3.5" />
                  Intentar Vista Embebida
                </button>

                <a
                  href={recurso.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-live-pink to-live-cyan text-white px-5 py-2.5 text-xs font-bold shadow-md hover:opacity-95 transition-opacity"
                >
                  <ExternalLink className="size-3.5" />
                  Abrir Recurso Original en TikTok
                </a>

                <button
                  type="button"
                  onClick={handleImprimir}
                  className="inline-flex items-center gap-2 rounded-xl bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground px-4 py-2.5 text-xs font-bold transition-colors"
                >
                  <Printer className="size-3.5" />
                  Imprimir Guía
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
