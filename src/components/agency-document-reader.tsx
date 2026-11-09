import { useState } from "react";
import {
  X,
  Printer,
  Download,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  BookOpen,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ChevronRight,
  Share2,
} from "lucide-react";
import type { DocumentoAgencia } from "@/lib/agency-documents";
import crbxLogo from "@/assets/crbx-logo.png";
import carbeGlobalLogo from "@/assets/carbe-global-logo.png";

interface AgencyDocumentReaderProps {
  documento: DocumentoAgencia | null;
  onClose: () => void;
}

export function AgencyDocumentReader({ documento, onClose }: AgencyDocumentReaderProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [tamanoFuente, setTamanoFuente] = useState<"sm" | "base" | "lg">("base");
  const [checklistCompletado, setChecklistCompletado] = useState<number[]>([]);

  if (!documento) return null;

  function toggleCheckItem(idx: number) {
    setChecklistCompletado((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  }

  function handleImprimir() {
    window.print();
  }

  function handleCopiarResumen() {
    if (navigator?.clipboard) {
      const texto = `[${documento.codigo}] ${documento.titulo}\n${documento.subtitulo}\n\nResumen Ejecutivo:\n${documento.resumenEjecutivo}\n\nCRBX TikTok LIVE Agency — Carbe Global Corp SAC`;
      navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  }

  function handleDescargarHTML() {
    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${documento.codigo} — ${documento.titulo}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #111; max-width: 800px; margin: 40px auto; padding: 0 20px; }
    h1 { color: #fe2c55; border-bottom: 2px solid #00f2fe; padding-bottom: 10px; }
    .badge { display: inline-block; background: #000; color: #fff; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; }
    .meta { font-size: 13px; color: #666; margin-bottom: 20px; }
    .box { background: #f4f6f8; border-left: 4px solid #00f2fe; padding: 15px; margin: 20px 0; border-radius: 4px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
    th { background: #0f1422; color: #fff; }
    .footer { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; color: #888; text-align: center; }
  </style>
</head>
<body>
  <div class="badge">${documento.clasificacion}</div>
  <p class="meta">Código: <strong>${documento.codigo}</strong> • Versión: ${documento.version} • ${documento.departamento}</p>
  <h1>${documento.titulo}</h1>
  <h3>${documento.subtitulo}</h3>
  <div class="box">
    <strong>Resumen Ejecutivo:</strong><br/>
    ${documento.resumenEjecutivo}
  </div>
  ${documento.secciones
    .map(
      (sec) => `
    <h2>${sec.titulo}</h2>
    ${sec.subtitulo ? `<p><em>${sec.subtitulo}</em></p>` : ""}
    <p>${sec.contenido.replace(/\n/g, "<br/>")}</p>
    ${
      sec.tabla
        ? `<table><thead><tr>${sec.tabla.encabezados
            .map((h) => `<th>${h}</th>`)
            .join("")}</tr></thead><tbody>${sec.tabla.filas
            .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
            .join("")}</tbody></table>`
        : ""
    }
  `,
    )
    .join("")}
  <div class="footer">
    © 2026 CRBX TikTok LIVE Agency • Carbe Global Corp SAC (RUC 20616178769)
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${documento.codigo}_${documento.titulo.replace(/[^a-zA-Z0-9]/g, "_")}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const fuenteClasses = {
    sm: "text-xs sm:text-sm",
    base: "text-sm sm:text-base",
    lg: "text-base sm:text-lg",
  };

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
        {/* Barra superior de control del Visor Editorial */}
        <header className="flex items-center justify-between gap-3 bg-background/90 border-b border-border/50 px-4 py-3 sm:px-6 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="grid size-9 sm:size-10 shrink-0 place-items-center rounded-xl bg-live-pink/10 text-live-pink">
              <FileText className="size-4 sm:size-5" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-md bg-foreground text-background px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                  {documento.codigo}
                </span>
                <span className="rounded-md bg-live-cyan/15 text-live-cyan px-2 py-0.5 text-[10px] font-bold">
                  {documento.version}
                </span>
                <span className="text-[11px] text-muted-foreground truncate hidden sm:inline">
                  {documento.clasificacion}
                </span>
              </div>
              <h3 className="font-display text-sm sm:text-base font-bold text-foreground truncate mt-0.5">
                {documento.titulo}
              </h3>
            </div>
          </div>

          {/* Botones de acción del documento */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Ajuste de tamaño de fuente */}
            <div className="hidden md:flex items-center rounded-xl bg-secondary p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setTamanoFuente("sm")}
                className={`px-2 py-1 rounded-lg font-bold ${
                  tamanoFuente === "sm" ? "bg-foreground text-background" : "text-muted-foreground"
                }`}
                title="Texto pequeño"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setTamanoFuente("base")}
                className={`px-2 py-1 rounded-lg font-bold ${
                  tamanoFuente === "base"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground"
                }`}
                title="Texto normal"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setTamanoFuente("lg")}
                className={`px-2 py-1 rounded-lg font-bold ${
                  tamanoFuente === "lg" ? "bg-foreground text-background" : "text-muted-foreground"
                }`}
                title="Texto grande"
              >
                A+
              </button>
            </div>

            <button
              type="button"
              onClick={handleImprimir}
              title="Imprimir o guardar en PDF"
              className="inline-flex items-center gap-1.5 rounded-xl bg-secondary/70 hover:bg-secondary px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-foreground transition-colors"
            >
              <Printer className="size-3.5 sm:size-4" />
              <span className="hidden sm:inline">Imprimir PDF</span>
            </button>

            <button
              type="button"
              onClick={handleDescargarHTML}
              title="Descargar documento offline"
              className="inline-flex items-center gap-1.5 rounded-xl bg-secondary/70 hover:bg-secondary px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-foreground transition-colors"
            >
              <Download className="size-3.5 sm:size-4 text-live-cyan" />
              <span className="hidden sm:inline">Descargar</span>
            </button>

            <button
              type="button"
              onClick={handleCopiarResumen}
              title="Copiar cita y resumen"
              className="grid size-8 sm:size-9 place-items-center rounded-xl bg-secondary/70 hover:bg-secondary text-foreground transition-colors"
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
              className="hidden sm:grid size-8 sm:size-9 place-items-center rounded-xl bg-secondary/70 hover:bg-secondary text-foreground transition-colors"
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

        {/* Cuerpo del Documento Editorial con diseño oficial CRBX */}
        <div className="relative flex-1 bg-background overflow-y-auto print:bg-white print:text-black">
          {/* Marca de agua sutil de fondo */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.02] overflow-hidden select-none">
            <span className="text-[12vw] font-black uppercase tracking-widest text-foreground rotate-[-25deg]">
              CRBX LIVE
            </span>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-10">
            {/* PORTADA EDITORIAL DEL DOCUMENTO */}
            <div className="rounded-3xl bg-card border border-border/60 overflow-hidden shadow-lg p-6 sm:p-10 space-y-6">
              {/* Encabezado con logotipos oficiales */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
                <div className="flex items-center gap-3">
                  <img src={crbxLogo} alt="CRBX" className="h-8 sm:h-9 w-auto object-contain" />
                  <div className="h-6 w-px bg-border/60" />
                  <span className="text-xs font-bold tracking-wider text-live-pink uppercase">
                    TikTok LIVE Agency
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs font-bold text-foreground">Carbe Global Corp SAC</p>
                  <p className="text-[11px] text-muted-foreground">RUC 20616178769 • Lima, Perú</p>
                </div>
              </div>

              {/* Insignias de clasificación */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-live-pink/15 text-live-pink border border-live-pink/20 px-3 py-1 text-xs font-bold tracking-wider uppercase">
                  {documento.clasificacion}
                </span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                  {documento.duracionLectura}
                </span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  Actualizado: {documento.fechaActualizacion}
                </span>
              </div>

              {/* Título Principal */}
              <div>
                <span className="text-xs font-bold text-live-cyan uppercase tracking-wider">
                  {documento.departamento}
                </span>
                <h1 className="font-display text-2xl sm:text-4xl font-black text-foreground tracking-tight mt-1 leading-tight">
                  {documento.titulo}
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
                  {documento.subtitulo}
                </p>
              </div>

              {/* Imagen de cabecera temática del documento */}
              <div className="relative rounded-2xl overflow-hidden aspect-[21/9] max-h-56 w-full">
                <img
                  src={documento.imagen}
                  alt={documento.titulo}
                  className="size-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                  <span className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-live-cyan" />
                    Documento Oficial Aprobado por la Dirección de CRBX
                  </span>
                  <span className="font-mono text-[11px] opacity-80">{documento.codigo}</span>
                </div>
              </div>

              {/* Resumen Ejecutivo Destacado */}
              <div className="rounded-2xl bg-secondary/40 border-l-4 border-live-cyan p-5 sm:p-6 space-y-2">
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-live-cyan flex items-center gap-2">
                  <Sparkles className="size-4" />
                  Resumen Ejecutivo
                </h4>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
                  {documento.resumenEjecutivo}
                </p>
              </div>

              {/* Puntos clave / Objetivos de Aprendizaje */}
              <div>
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Puntos Clave y Objetivos Centrales
                </h4>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {documento.puntosClave.map((punto, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl bg-background border border-border/50 p-3.5 flex items-start gap-3"
                    >
                      <span className="size-5 rounded-full bg-live-pink/15 text-live-pink text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-xs text-foreground font-medium leading-relaxed">
                        {punto}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECCIONES EDITORIALES DEL DOCUMENTO */}
            <div className={`space-y-10 ${fuenteClasses[tamanoFuente]}`}>
              {documento.secciones.map((sec, secIdx) => (
                <article
                  key={secIdx}
                  className="rounded-3xl bg-card border border-border/50 p-6 sm:p-8 space-y-5 shadow-sm"
                >
                  <div className="border-b border-border/40 pb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-live-cyan">
                      Sección {secIdx + 1}
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mt-0.5">
                      {sec.titulo}
                    </h2>
                    {sec.subtitulo && (
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1">
                        {sec.subtitulo}
                      </p>
                    )}
                  </div>

                  {/* Párrafos de contenido */}
                  <div className="text-foreground/90 leading-relaxed whitespace-pre-line space-y-3 font-normal">
                    {sec.contenido}
                  </div>

                  {/* Listado de puntos si aplica */}
                  {sec.puntos && (
                    <ul className="space-y-2 pt-2">
                      {sec.puntos.map((p, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tabla de datos oficial si aplica */}
                  {sec.tabla && (
                    <div className="mt-4 overflow-x-auto rounded-2xl border border-border/60">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-secondary/80 text-foreground font-bold">
                          <tr>
                            {sec.tabla.encabezados.map((enc, eIdx) => (
                              <th key={eIdx} className="px-4 py-3 whitespace-nowrap">
                                {enc}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                          {sec.tabla.filas.map((fila, fIdx) => (
                            <tr key={fIdx} className="hover:bg-secondary/30 transition-colors">
                              {fila.map((celda, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`px-4 py-3 ${
                                    cIdx === 0
                                      ? "font-bold text-foreground"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {celda}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Caja de llamado destacado (Tip, Warning, Fórmula) */}
                  {sec.destacado && (
                    <div
                      className={`rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 ${
                        sec.destacado.tipo === "warning"
                          ? "bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200"
                          : sec.destacado.tipo === "formula"
                            ? "bg-purple-500/10 border border-purple-500/30 text-purple-900 dark:text-purple-200"
                            : "bg-live-cyan/10 border border-live-cyan/30 text-cyan-900 dark:text-cyan-200"
                      }`}
                    >
                      {sec.destacado.tipo === "warning" ? (
                        <AlertTriangle className="size-5 text-amber-500 shrink-0 mt-0.5" />
                      ) : sec.destacado.tipo === "formula" ? (
                        <Sparkles className="size-5 text-purple-500 shrink-0 mt-0.5" />
                      ) : (
                        <Lightbulb className="size-5 text-live-cyan shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider">
                          {sec.destacado.titulo}
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm leading-relaxed opacity-90">
                          {sec.destacado.texto}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* CHECKLIST FINAL ANTES DE TRANSMITIR */}
            {documento.checklistFinal && documento.checklistFinal.length > 0 && (
              <div className="rounded-3xl bg-card border border-border/60 p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                      <CheckCircle2 className="size-5 text-emerald-500" />
                      Checklist Práctico del Creador
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Verifica cada elemento antes de aplicar este documento a tu próxima
                      transmisión.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-500">
                    {checklistCompletado.length} / {documento.checklistFinal.length} listos
                  </span>
                </div>

                <div className="space-y-2.5">
                  {documento.checklistFinal.map((item, idx) => {
                    const isChecked = checklistCompletado.includes(idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleCheckItem(idx)}
                        className={`w-full text-left rounded-xl p-3.5 flex items-center gap-3 transition-colors border ${
                          isChecked
                            ? "bg-emerald-500/10 border-emerald-500/30 text-foreground"
                            : "bg-background border-border/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span
                          className={`size-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                            isChecked
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : "border-border"
                          }`}
                        >
                          {isChecked && <Check className="size-3.5 stroke-[3]" />}
                        </span>
                        <span className="text-xs sm:text-sm font-medium leading-relaxed">
                          {item}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PIE DE PÁGINA INSTITUCIONAL DEL DOCUMENTO */}
            <footer className="border-t border-border/60 pt-8 pb-4 text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <img
                  src={carbeGlobalLogo}
                  alt="Carbe Global"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                Este documento es propiedad confidencial de <strong>Carbe Global Corp SAC</strong>{" "}
                (RUC 20616178769), operadora de la agencia <strong>CRBX TikTok LIVE</strong>.
                Distribución autorizada exclusivamente para creadores del programa.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleImprimir}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-secondary px-4 py-2 text-xs font-bold text-foreground hover:bg-secondary/80 transition-colors"
                >
                  <Printer className="size-3.5" />
                  Imprimir Copia en Papel
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-live-pink to-live-cyan px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-opacity"
                >
                  <Check className="size-3.5" />
                  Entendido y Finalizar Estudio
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
