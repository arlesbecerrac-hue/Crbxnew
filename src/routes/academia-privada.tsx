import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  Lock,
  Unlock,
  ShieldCheck,
  Search,
  BookOpen,
  FileText,
  CheckCircle2,
  Bookmark,
  Eye,
  LogOut,
  X,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Download,
  Printer,
  Compass,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { autenticarInvitado, verificarSesionInvitado } from "@/lib/vault.functions";
import { modulosCursos, totalRecursosCursos, type CursoRecurso } from "@/lib/courses-data";
import { documentosAgenciaOficiales, type DocumentoAgencia } from "@/lib/agency-documents";
import { InAppDocumentViewer } from "@/components/in-app-document-viewer";
import { AgencyDocumentReader } from "@/components/agency-document-reader";
import crbxLogo from "@/assets/crbx-logo.png";
import carbeGlobalLogo from "@/assets/carbe-global-logo.png";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/academia-privada")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: (search["token"] as string) || (search["invitacion"] as string) || "",
    email: (search["email"] as string) || "",
  }),
  head: () => ({
    meta: [
      { title: "Academia y Documentos Oficiales — CRBX TikTok LIVE" },
      {
        name: "description",
        content:
          "Manuales oficiales, playbooks y recursos de formación para creadores de la agencia CRBX TikTok LIVE.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AcademiaPrivadaPage,
});

export function AcademiaPrivadaPage() {
  const searchParams = useSearch({ strict: false }) as { token?: string; email?: string };
  const [cargandoAuth, setCargandoAuth] = useState(true);
  const [sesionInvitado, setSesionInvitado] = useState<{ nombre: string; email: string } | null>(
    null,
  );
  const [modoExplorador, setModoExplorador] = useState(false);

  // Formulario de ingreso manual
  const [emailInput, setEmailInput] = useState(searchParams?.email || "");
  const [claveInput, setClaveInput] = useState("");
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  const [validandoManual, setValidandoManual] = useState(false);

  // Estados del catálogo
  const [moduloSeleccionado, setModuloSeleccionado] = useState<string>("documentos-crbx");
  const [busqueda, setBusqueda] = useState<string>("");
  const [recursoPreview, setRecursoPreview] = useState<CursoRecurso | null>(null);
  const [documentoAbierto, setDocumentoAbierto] = useState<CursoRecurso | null>(null);
  const [documentoAgenciaAbierto, setDocumentoAgenciaAbierto] = useState<DocumentoAgencia | null>(
    null,
  );

  // Progreso guardado en localStorage
  const [completados, setCompletados] = useState<string[]>([]);
  const [guardados, setGuardados] = useState<string[]>([]);

  // Cargar progreso del creador desde localStorage
  useEffect(() => {
    try {
      const comp = localStorage.getItem("crbx_cursos_completados");
      if (comp) setCompletados(JSON.parse(comp));
      const fav = localStorage.getItem("crbx_cursos_guardados");
      if (fav) setGuardados(JSON.parse(fav));
    } catch {
      // Ignorar errores al acceder a localStorage
    }
  }, []);

  function toggleCompletado(id: string) {
    setCompletados((prev) => {
      const nuevo = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("crbx_cursos_completados", JSON.stringify(nuevo));
      return nuevo;
    });
  }

  function toggleGuardado(id: string) {
    setGuardados((prev) => {
      const nuevo = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("crbx_cursos_guardados", JSON.stringify(nuevo));
      return nuevo;
    });
  }

  // Verificación inicial de sesión o token en URL
  useEffect(() => {
    async function inicializar() {
      setCargandoAuth(true);

      // 1. Si viene con token en la URL, autenticar automáticamente
      if (searchParams?.token) {
        try {
          const res = await autenticarInvitado({
            data: { token: searchParams.token },
          });

          if (res.ok && res.sesionToken && res.invitado) {
            sessionStorage.setItem("crbx_guest_session_token", res.sesionToken);
            localStorage.setItem("crbx_guest_session_token", res.sesionToken);
            setSesionInvitado(res.invitado);
            setCargandoAuth(false);
            return;
          }
        } catch (err) {
          console.error("Error al autenticar por token:", err);
        }
      }

      // 2. Si hay token en sessionStorage o localStorage
      const tokenGuardado =
        sessionStorage.getItem("crbx_guest_session_token") ||
        localStorage.getItem("crbx_guest_session_token");
      if (tokenGuardado) {
        try {
          const res = await verificarSesionInvitado({
            data: { sesionToken: tokenGuardado },
          });

          if (res.ok && res.invitado) {
            setSesionInvitado(res.invitado);
            setCargandoAuth(false);
            return;
          } else {
            sessionStorage.removeItem("crbx_guest_session_token");
            localStorage.removeItem("crbx_guest_session_token");
          }
        } catch {
          sessionStorage.removeItem("crbx_guest_session_token");
          localStorage.removeItem("crbx_guest_session_token");
        }
      }

      setCargandoAuth(false);
    }

    inicializar();
  }, [searchParams?.token]);

  // Autenticación manual con Email + Clave
  async function handleLoginManual(e: React.FormEvent) {
    e.preventDefault();
    setErrorLogin(null);
    setValidandoManual(true);

    try {
      const res = await autenticarInvitado({
        data: {
          email: emailInput.trim(),
          clave: claveInput.trim(),
        },
      });

      if (res.ok && res.sesionToken && res.invitado) {
        sessionStorage.setItem("crbx_guest_session_token", res.sesionToken);
        localStorage.setItem("crbx_guest_session_token", res.sesionToken);
        setSesionInvitado(res.invitado);
      } else {
        setErrorLogin(res.error || "Clave o correo no válidos.");
      }
    } catch {
      setErrorLogin("Error al validar con el servidor de seguridad.");
    } finally {
      setValidandoManual(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("crbx_guest_session_token");
    localStorage.removeItem("crbx_guest_session_token");
    setSesionInvitado(null);
    setModoExplorador(false);
  }

  // Filtrado de documentos oficiales CRBX
  const documentosAgenciaFiltrados = useMemo(() => {
    return documentosAgenciaOficiales.filter((doc) => {
      if (busqueda.trim() === "") return true;
      const b = busqueda.toLowerCase();
      return (
        doc.titulo.toLowerCase().includes(b) ||
        doc.subtitulo.toLowerCase().includes(b) ||
        doc.codigo.toLowerCase().includes(b) ||
        doc.descripcion.toLowerCase().includes(b) ||
        doc.puntosClave.some((p) => p.toLowerCase().includes(b))
      );
    });
  }, [busqueda]);

  // Filtrado de recursos del catálogo general
  const todosLosRecursos = useMemo(() => {
    return modulosCursos.flatMap((m) => m.recursos);
  }, []);

  const recursosFiltrados = useMemo(() => {
    return todosLosRecursos.filter((r) => {
      const coincideModulo =
        moduloSeleccionado === "todos" ||
        moduloSeleccionado === "catalogo-general" ||
        r.moduloId === moduloSeleccionado;
      const coincideBusqueda =
        busqueda.trim() === "" ||
        r.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        r.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        r.moduloTitulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        r.puntosClave.some((p) => p.toLowerCase().includes(busqueda.toLowerCase()));

      return coincideModulo && coincideBusqueda;
    });
  }, [todosLosRecursos, moduloSeleccionado, busqueda]);

  const totalGeneral = documentosAgenciaOficiales.length + totalRecursosCursos;

  // ==========================================
  // ESTADO DE CARGA
  // ==========================================
  if (cargandoAuth) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col items-center justify-center text-foreground p-4">
        <RefreshCw className="size-8 animate-spin text-live-cyan mb-4" />
        <p className="font-display text-sm font-bold tracking-wider uppercase text-muted-foreground">
          Cargando Academia CRBX TikTok LIVE...
        </p>
      </div>
    );
  }

  // ==========================================
  // BARRERA DE SEGURIDAD / PANTALLA DE ACCESO RESPONSIVE
  // Optimizada 100% para celulares y escritorio
  // ==========================================
  if (!sesionInvitado && !modoExplorador) {
    return (
      <div className="relative min-h-screen bg-background font-sans text-foreground flex flex-col overflow-x-hidden">
        {/* Fondo ambiental centrado */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={heroBg}
            alt=""
            width={1920}
            height={1088}
            className="size-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
        </div>

        {/* Header simple y centrado */}
        <header className="relative z-10 bg-background/80 backdrop-blur-md border-b border-border/40">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 py-3.5">
            <div className="flex items-center gap-2">
              <img src={crbxLogo} alt="CRBX" className="h-7 sm:h-8 w-auto object-contain" />
              <span className="hidden sm:inline-block text-xs font-bold text-live-pink tracking-wider uppercase">
                TikTok LIVE Agency
              </span>
            </div>
            <button
              type="button"
              onClick={() => setModoExplorador(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary hover:bg-secondary/80 px-3.5 py-1.5 text-xs font-bold text-foreground transition-colors"
            >
              <Compass className="size-3.5 text-live-cyan" />
              <span>Explorar Documentos</span>
            </button>
          </div>
        </header>

        {/* Tarjeta de Ingreso perfectamente centrada vertical y horizontalmente */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 w-full">
          <div className="w-full max-w-md mx-auto rounded-3xl bg-card border border-border/60 p-6 sm:p-9 shadow-2xl backdrop-blur-md space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto size-12 rounded-2xl bg-secondary flex items-center justify-center shadow-xs">
                <Lock className="size-5 text-live-pink" />
              </div>
              <h1 className="font-display text-xl sm:text-2xl font-black text-foreground tracking-tight">
                Academia de Creadores CRBX
              </h1>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ingresa con tu clave de invitación para acceder al repositorio y registrar tu
                progreso oficial.
              </p>
            </div>

            {errorLogin && (
              <div className="rounded-2xl bg-destructive/10 border border-destructive/20 p-3.5 text-xs text-destructive flex items-start gap-2.5">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <span>{errorLogin}</span>
              </div>
            )}

            <form onSubmit={handleLoginManual} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                  Correo Electrónico Registrado
                </label>
                <input
                  type="email"
                  required
                  placeholder="tu-correo@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full rounded-xl bg-background border border-border px-3.5 py-2.5 sm:py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-live-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                  Clave Única de Invitación (Passkey)
                </label>
                <input
                  type="text"
                  required
                  placeholder="CRBX-XXXX-XXXX-XXXX"
                  value={claveInput}
                  onChange={(e) => setClaveInput(e.target.value)}
                  className="w-full rounded-xl bg-background border border-border px-3.5 py-2.5 sm:py-3 text-sm font-mono font-bold tracking-wider text-live-pink placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-live-pink uppercase"
                />
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Clave recibida por correo del manager de la agencia.
                </p>
              </div>

              <button
                type="submit"
                disabled={validandoManual}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-live-pink to-live-cyan py-3 sm:py-3.5 text-sm font-bold text-white shadow-lg shadow-live-pink/20 hover:opacity-95 transition-all disabled:opacity-50"
              >
                {validandoManual ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />
                    <span>Validando Clave...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="size-4" />
                    <span>Acceder a la Academia</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-border/50 space-y-3 text-center">
              <button
                type="button"
                onClick={() => setModoExplorador(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-secondary/80 hover:bg-secondary py-2.5 px-4 text-xs font-bold text-foreground transition-colors"
              >
                <Compass className="size-4 text-live-cyan" />
                <span>Explorar Documentos de la Academia</span>
              </button>

              <p className="text-xs text-muted-foreground">
                ¿Aún no eres creador de CRBX?{" "}
                <a href="/postular" className="text-live-cyan hover:underline font-bold">
                  Postula aquí sin costo
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // PORTAL DE DOCUMENTOS Y CURSOS OFICIALES
  // ==========================================
  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col overflow-x-hidden">
      {/* Header del Portal de Aprendizaje */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center">
              <img src={crbxLogo} alt="CRBX" className="h-7 sm:h-8 w-auto object-contain" />
            </a>
            <span className="hidden md:inline-block rounded-full bg-live-pink/15 text-live-pink px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-live-pink/20">
              Academia Oficial TikTok LIVE
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {sesionInvitado ? (
              <>
                <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-1.5 text-xs">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-foreground font-semibold max-w-[120px] sm:max-w-[200px] truncate">
                    {sesionInvitado.nombre}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Cerrar Sesión"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-secondary/60 hover:bg-secondary px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LogOut className="size-3.5" />
                  <span className="hidden sm:inline">Salir</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setModoExplorador(false)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-live-pink to-live-cyan px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:opacity-95 transition-opacity"
              >
                <Lock className="size-3.5" />
                <span>Ingresar Clave</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Banner Principal con heroBg y Colores Oficiales */}
      <div className="relative overflow-hidden border-b border-border/40">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/85 to-background" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-8 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-live-cyan">
                <Sparkles className="size-3.5 text-live-pink" />
                <span>Centro de Formación y Documentación Oficial</span>
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-black tracking-tight text-foreground">
                Documentos y Recursos para Creadores
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Playbooks estratégicos, manuales del algoritmo, guías de batallas PK, setup técnico
                de OBS y políticas oficiales creadas exclusivamente para la agencia CRBX TikTok
                LIVE.
              </p>
            </div>

            {/* Barra de progreso */}
            <div className="rounded-2xl bg-card border border-border/60 p-4 shrink-0 sm:min-w-[220px] shadow-sm backdrop-blur-xs">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-muted-foreground">Progreso de Estudio:</span>
                <span className="text-live-cyan font-bold">
                  {completados.length} / {totalGeneral}
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-live-pink to-live-cyan h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round((completados.length / totalGeneral) * 100)}%`,
                  }}
                ></div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 text-center">
                {completados.length > 0
                  ? `${Math.round((completados.length / totalGeneral) * 100)}% completado`
                  : "Empieza estudiando los playbooks oficiales"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <main className="mx-auto max-w-6xl px-4 sm:px-8 py-8 sm:py-12 space-y-8 flex-1 w-full">
        {/* Barra de Búsqueda y Filtros de Categoría */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Search className="size-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Buscar en documentos: algoritmo, batallas PK, diamantes, OBS, regalos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full rounded-2xl bg-card border border-border/60 pl-10 pr-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-live-cyan shadow-xs"
              />
              {busqueda && (
                <button
                  onClick={() => setBusqueda("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  Limpiar
                </button>
              )}
            </div>

            <div className="text-xs text-muted-foreground font-semibold px-1">
              Mostrando{" "}
              <span className="text-foreground font-bold">
                {moduloSeleccionado === "documentos-crbx"
                  ? documentosAgenciaFiltrados.length
                  : recursosFiltrados.length}
              </span>{" "}
              documentos
            </div>
          </div>

          {/* Botones de Filtro por Sección */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setModuloSeleccionado("documentos-crbx")}
              className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                moduloSeleccionado === "documentos-crbx"
                  ? "bg-gradient-to-r from-live-pink to-live-cyan text-white shadow-md shadow-live-pink/20"
                  : "bg-card border border-border/50 text-muted-foreground hover:text-foreground shadow-xs"
              }`}
            >
              <Sparkles className="size-3.5" />
              Documentos Oficiales CRBX ({documentosAgenciaOficiales.length})
            </button>

            <button
              onClick={() => setModuloSeleccionado("catalogo-general")}
              className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                moduloSeleccionado === "catalogo-general"
                  ? "bg-gradient-to-r from-live-pink to-live-cyan text-white shadow-md shadow-live-pink/20"
                  : "bg-card border border-border/50 text-muted-foreground hover:text-foreground shadow-xs"
              }`}
            >
              <BookOpen className="size-3.5" />
              Guías Técnicas TikTok ({totalRecursosCursos})
            </button>

            <button
              onClick={() => setModuloSeleccionado("todos")}
              className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                moduloSeleccionado === "todos"
                  ? "bg-gradient-to-r from-live-pink to-live-cyan text-white shadow-md shadow-live-pink/20"
                  : "bg-card border border-border/50 text-muted-foreground hover:text-foreground shadow-xs"
              }`}
            >
              Ver Todo ({totalGeneral})
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECCIÓN 1: DOCUMENTOS OFICIALES DE LA AGENCIA CRBX      */}
        {/* ======================================================== */}
        {(moduloSeleccionado === "documentos-crbx" || moduloSeleccionado === "todos") && (
          <section className="space-y-5">
            <div className="flex items-center justify-between gap-3 border-b border-border/40 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-7 place-items-center rounded-lg bg-live-pink/15 text-live-pink">
                  <ShieldCheck className="size-4" />
                </span>
                <div>
                  <h2 className="font-display text-lg sm:text-xl font-black text-foreground">
                    Documentos y Playbooks Oficiales CRBX
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Manuales creados por el equipo directivo de Carbe Global Corp SAC para la
                    agencia de TikTok LIVE
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-live-cyan hidden sm:inline">
                8 Documentos Activos
              </span>
            </div>

            {documentosAgenciaFiltrados.length === 0 ? (
              <div className="rounded-3xl bg-card border border-border/60 p-8 text-center text-muted-foreground">
                <p className="text-sm">No se encontraron documentos de agencia con esa búsqueda.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {documentosAgenciaFiltrados.map((doc) => {
                  const estaCompletado = completados.includes(doc.id);
                  const estaGuardado = guardados.includes(doc.id);

                  return (
                    <div
                      key={doc.id}
                      className="group rounded-3xl bg-card border border-border/60 overflow-hidden flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-live-cyan/50"
                    >
                      {/* Imagen y badges de portada */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
                        <img
                          src={doc.imagen}
                          alt={doc.titulo}
                          className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                        {/* Badges superiores */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                          <span className="rounded-md bg-black/80 backdrop-blur-md text-white font-mono text-[10px] font-black px-2 py-0.5 border border-white/20">
                            {doc.codigo}
                          </span>
                          <span className="rounded-md bg-live-pink/90 text-white text-[10px] font-bold px-2 py-0.5">
                            {doc.duracionLectura}
                          </span>
                        </div>

                        {/* Logo oficial CRBX en miniatura sobre la imagen */}
                        <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-white/90">
                          <img
                            src={crbxLogo}
                            alt="CRBX"
                            className="h-4 w-auto object-contain brightness-0 invert"
                          />
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            Documento Oficial
                          </span>
                        </div>
                      </div>

                      {/* Cuerpo de la tarjeta */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-live-cyan">
                              {doc.clasificacion}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => toggleGuardado(doc.id)}
                                title={
                                  estaGuardado ? "Quitar de favoritos" : "Guardar en favoritos"
                                }
                                className={`rounded-lg p-1.5 transition-colors ${
                                  estaGuardado
                                    ? "text-yellow-500 bg-yellow-500/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                }`}
                              >
                                <Bookmark
                                  className="size-4"
                                  fill={estaGuardado ? "currentColor" : "none"}
                                />
                              </button>
                              <button
                                onClick={() => toggleCompletado(doc.id)}
                                title={
                                  estaCompletado
                                    ? "Marcar como pendiente"
                                    : "Marcar como completado"
                                }
                                className={`rounded-lg p-1.5 transition-colors ${
                                  estaCompletado
                                    ? "text-emerald-500 bg-emerald-500/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                }`}
                              >
                                <CheckCircle2 className="size-4" />
                              </button>
                            </div>
                          </div>

                          <h3 className="font-display text-base sm:text-lg font-bold text-foreground group-hover:text-live-cyan transition-colors line-clamp-2 leading-snug">
                            {doc.titulo}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {doc.descripcion}
                          </p>
                        </div>

                        {/* Puntos destacados */}
                        <div className="space-y-1.5 pt-3 border-t border-border/40">
                          {doc.puntosClave.slice(0, 2).map((punto, pIdx) => (
                            <div
                              key={pIdx}
                              className="flex items-start gap-2 text-[11px] text-muted-foreground"
                            >
                              <span className="text-live-pink font-bold mt-0.5">•</span>
                              <span className="line-clamp-1">{punto}</span>
                            </div>
                          ))}
                        </div>

                        {/* Botón de Estudio */}
                        <div className="pt-3">
                          <button
                            type="button"
                            onClick={() => setDocumentoAgenciaAbierto(doc)}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-live-pink to-live-cyan py-2.5 px-4 text-xs font-bold text-white shadow-md shadow-live-pink/20 hover:opacity-95 transition-opacity"
                          >
                            <FileText className="size-3.5" />
                            <span>Estudiar Documento Oficial</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* ======================================================== */}
        {/* SECCIÓN 2: CATÁLOGO DE MÓDULOS Y GUÍAS DE TIKTOK        */}
        {/* ======================================================== */}
        {(moduloSeleccionado === "catalogo-general" || moduloSeleccionado === "todos") && (
          <section className="space-y-5 pt-6">
            <div className="flex items-center justify-between gap-3 border-b border-border/40 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-7 place-items-center rounded-lg bg-live-cyan/15 text-live-cyan">
                  <BookOpen className="size-4" />
                </span>
                <div>
                  <h2 className="font-display text-lg sm:text-xl font-black text-foreground">
                    Guías Técnicas y Módulos de Aprendizaje TikTok
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Manuales complementarios de estudio sobre LIVE Studio, analítica, multiaudiencia
                    y eventos
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-muted-foreground hidden sm:inline">
                {recursosFiltrados.length} Recursos
              </span>
            </div>

            {recursosFiltrados.length === 0 ? (
              <div className="rounded-3xl bg-card border border-border/60 p-8 text-center text-muted-foreground">
                <p className="text-sm">No se encontraron cursos para esta búsqueda.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recursosFiltrados.map((rec) => {
                  const estaCompletado = completados.includes(rec.id);
                  const estaGuardado = guardados.includes(rec.id);

                  return (
                    <div
                      key={rec.id}
                      className="group rounded-3xl bg-card border border-border/60 p-6 flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[11px] font-bold text-foreground">
                            {rec.tipo === "pdf" ? (
                              <FileText className="size-3 text-live-pink" />
                            ) : (
                              <BookOpen className="size-3 text-live-cyan" />
                            )}
                            {rec.tipoEtiqueta}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleGuardado(rec.id)}
                              title={estaGuardado ? "Quitar de favoritos" : "Guardar en favoritos"}
                              className={`rounded-lg p-1.5 transition-colors ${
                                estaGuardado
                                  ? "text-yellow-500 bg-yellow-500/10"
                                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                              }`}
                            >
                              <Bookmark
                                className="size-4"
                                fill={estaGuardado ? "currentColor" : "none"}
                              />
                            </button>

                            <button
                              onClick={() => toggleCompletado(rec.id)}
                              title={
                                estaCompletado ? "Marcar como pendiente" : "Marcar como completado"
                              }
                              className={`rounded-lg p-1.5 transition-colors ${
                                estaCompletado
                                  ? "text-emerald-500 bg-emerald-500/10"
                                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                              }`}
                            >
                              <CheckCircle2 className="size-4" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-live-cyan">
                            {rec.moduloTitulo}
                          </span>
                          <h3 className="mt-1 font-display text-base sm:text-lg font-bold tracking-tight text-foreground group-hover:text-live-cyan transition-colors line-clamp-2">
                            {rec.titulo}
                          </h3>
                          {rec.subtitulo && (
                            <p className="mt-1 text-xs text-muted-foreground line-clamp-2 font-medium">
                              {rec.subtitulo}
                            </p>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                          {rec.descripcion}
                        </p>

                        <div className="space-y-1.5 pt-2 border-t border-border/40">
                          {rec.puntosClave.slice(0, 2).map((punto, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-[11px] text-muted-foreground"
                            >
                              <span className="text-live-pink font-bold mt-0.5">•</span>
                              <span className="line-clamp-1">{punto}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/40 flex items-center gap-2">
                        <button
                          onClick={() => setRecursoPreview(rec)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-secondary/70 hover:bg-secondary px-3 py-2.5 text-xs font-bold text-foreground transition-colors"
                        >
                          <Eye className="size-3.5 text-live-cyan" />
                          Vista Previa
                        </button>

                        <button
                          type="button"
                          onClick={() => setDocumentoAbierto(rec)}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-secondary hover:bg-secondary/80 px-3.5 py-2.5 text-xs font-bold text-foreground border border-border/50 hover:border-live-cyan transition-colors"
                        >
                          <FileText className="size-3.5 text-live-pink" />
                          Estudiar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </main>

      {/* ======================================================== */}
      {/* MODAL DE VISTA PREVIA                                    */}
      {/* ======================================================== */}
      {recursoPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-3xl bg-card border border-border/60 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setRecursoPreview(null)}
              className="absolute top-5 right-5 rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="size-5" />
            </button>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-live-cyan/10 px-3 py-1 text-xs font-bold text-live-cyan uppercase tracking-wider">
                    {recursoPreview.tipoEtiqueta}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold">
                    Fuente: {recursoPreview.fuente}
                  </span>
                </div>

                <h2 className="mt-3 font-display text-xl sm:text-2xl font-bold text-foreground">
                  {recursoPreview.titulo}
                </h2>
                {recursoPreview.subtitulo && (
                  <p className="mt-1 text-sm text-muted-foreground font-medium">
                    {recursoPreview.subtitulo}
                  </p>
                )}
              </div>

              <div className="rounded-2xl bg-secondary/40 p-6 space-y-4">
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-foreground">
                  Resumen y Fundamentos Técnicos
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {recursoPreview.descripcion}
                </p>

                <div className="pt-3 border-t border-border/40">
                  <h4 className="font-display text-xs font-bold uppercase tracking-wider text-live-cyan mb-3">
                    Puntos Clave y Aplicación a tus LIVEs:
                  </h4>
                  <ul className="space-y-2">
                    {recursoPreview.puntosClave.map((punto, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{punto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleCompletado(recursoPreview.id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors ${
                      completados.includes(recursoPreview.id)
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    <CheckCircle2 className="size-4" />
                    {completados.includes(recursoPreview.id)
                      ? "Leído y Completado"
                      : "Marcar como Completado"}
                  </button>

                  <button
                    onClick={() => toggleGuardado(recursoPreview.id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors ${
                      guardados.includes(recursoPreview.id)
                        ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    <Bookmark
                      className="size-4"
                      fill={guardados.includes(recursoPreview.id) ? "currentColor" : "none"}
                    />
                    {guardados.includes(recursoPreview.id) ? "Favorito" : "Guardar"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setDocumentoAbierto(recursoPreview);
                    setRecursoPreview(null);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-live-pink to-live-cyan px-6 py-3 text-sm font-bold text-white shadow-xl shadow-live-pink/25 hover:opacity-95 transition-opacity"
                >
                  <FileText className="size-4" />
                  Estudiar Documento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VISOR OFICIAL DE DOCUMENTOS DE LA AGENCIA CRBX           */}
      {/* ======================================================== */}
      <AgencyDocumentReader
        documento={documentoAgenciaAbierto}
        onClose={() => setDocumentoAgenciaAbierto(null)}
      />

      {/* Visor In-App para recursos de catálogo general */}
      <InAppDocumentViewer recurso={documentoAbierto} onClose={() => setDocumentoAbierto(null)} />
    </div>
  );
}
