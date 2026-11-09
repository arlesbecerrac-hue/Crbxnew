import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import {
  ShieldAlert,
  KeyRound,
  FileCheck2,
  Lock,
  Unlock,
  UserPlus,
  Copy,
  Check,
  RefreshCw,
  Mail,
  Send,
  Trash2,
  PowerOff,
  ExternalLink,
  Users,
  Search,
  BookOpen,
  MessageCircle,
  Smartphone,
  Upload,
  Download,
  ShieldCheck,
  Sparkles,
  FileText,
  Printer,
  Compass,
} from "lucide-react";
import {
  loginAdminVault,
  obtenerInvitacionesAdmin,
  crearNuevaInvitacionAdmin,
  enviarCorreoInvitacionAdmin,
  cambiarEstadoInvitacionAdmin,
  generarClaveAleatoriaAdmin,
  generarDescargaLlaveMaestra,
  solicitarEnvioLlaveAlCorreoPropietario,
} from "@/lib/vault.functions";
import type { InvitacionInvitado } from "@/lib/vault.server";
import { modulosCursos, type CursoRecurso } from "@/lib/courses-data";
import { documentosAgenciaOficiales, type DocumentoAgencia } from "@/lib/agency-documents";
import { InAppDocumentViewer } from "@/components/in-app-document-viewer";
import { AgencyDocumentReader } from "@/components/agency-document-reader";
import heroBg from "@/assets/hero-bg.jpg";
import crbxLogo from "@/assets/crbx-logo.png";

export const Route = createFileRoute("/vault-crbx-secure-admin")({
  head: () => ({
    meta: [
      { title: "Panel de Administración — CRBX TikTok LIVE Agency" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: VaultAdminPage,
});

function VaultAdminPage() {
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [llaveInput, setLlaveInput] = useState("");
  const [certInput, setCertInput] = useState("");
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [modoManual, setModoManual] = useState(false);

  // Invitaciones
  const [invitaciones, setInvitaciones] = useState<InvitacionInvitado[]>([]);
  const [cargandoInvitaciones, setCargandoInvitaciones] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  // Pestañas y Visores
  const [pestanaActiva, setPestanaActiva] = useState<"invitados" | "cursos">("invitados");
  const [recursoAbierto, setRecursoAbierto] = useState<CursoRecurso | null>(null);
  const [documentoAgenciaAbierto, setDocumentoAgenciaAbierto] = useState<DocumentoAgencia | null>(
    null,
  );

  // Formulario nuevo invitado
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoEmail, setNuevoEmail] = useState("");
  const [nuevaNota, setNuevaNota] = useState("");
  const [claveGenerada, setClaveGenerada] = useState("CRBX-7X9K-4M2P-9W3L");
  const [enviarCorreoAuto, setEnviarCorreoAuto] = useState(true);
  const [creando, setCreando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  // Estados de copia
  const [copiadoId, setCopiadoId] = useState<string | null>(null);

  // Enviar archivo al correo del propietario
  const [enviandoCorreoLlave, setEnviandoCorreoLlave] = useState(false);
  const [mensajeEnvioCorreo, setMensajeEnvioCorreo] = useState<string | null>(null);

  // Obtener dominio actual en el navegador
  const [dominioBase, setDominioBase] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDominioBase(window.location.origin);
    }
  }, []);

  // Cerrar sesión
  const cerrarSesion = useCallback(() => {
    sessionStorage.removeItem("crbx_vault_admin_token");
    localStorage.removeItem("crbx_vault_admin_token");
    setAdminToken(null);
    setInvitaciones([]);
  }, []);

  // Cargar invitaciones
  const cargarInvitaciones = useCallback(
    async (token: string) => {
      setCargandoInvitaciones(true);
      try {
        const res = await obtenerInvitacionesAdmin({ data: { adminToken: token } });
        if (res.ok && res.invitaciones) {
          setInvitaciones(res.invitaciones);
        } else if (res.error) {
          cerrarSesion();
        }
      } catch (err) {
        console.error(err);
      } finally {
        setCargandoInvitaciones(false);
      }
    },
    [cerrarSesion],
  );

  // Verificar si hay sesión guardada en sessionStorage o localStorage
  useEffect(() => {
    const saved =
      sessionStorage.getItem("crbx_vault_admin_token") ||
      localStorage.getItem("crbx_vault_admin_token");
    if (saved) {
      setAdminToken(saved);
      cargarInvitaciones(saved);
    }
  }, [cargarInvitaciones]);

  // Ejecución de login criptográfico
  async function ejecutarLogin(llave: string, cert: string) {
    setErrorLogin(null);
    setLoadingLogin(true);

    try {
      const res = await loginAdminVault({
        data: {
          llave: llave.trim(),
          certificado: cert.trim(),
        },
      });

      if (res.ok && res.tokenSesion) {
        setAdminToken(res.tokenSesion);
        sessionStorage.setItem("crbx_vault_admin_token", res.tokenSesion);
        localStorage.setItem("crbx_vault_admin_token", res.tokenSesion);
        await cargarInvitaciones(res.tokenSesion);
        generarNuevaClave(res.tokenSesion);
      } else {
        setErrorLogin(res.error || "Llave o Certificado no válidos.");
      }
    } catch {
      setErrorLogin("Error al validar con el servidor de seguridad.");
    } finally {
      setLoadingLogin(false);
    }
  }

  // Login manual
  async function handleLogin(e?: React.FormEvent) {
    if (e) e.preventDefault();
    await ejecutarLogin(llaveInput, certInput);
  }

  // Cargar archivo físico de llave (.crbxkey) desde el celular o computadora
  function handleSeleccionarArchivoLlave(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        let llave = "";
        let cert = "";

        try {
          const parsed = JSON.parse(text);
          llave = parsed.masterKey || parsed.llave || parsed.key || "";
          cert = parsed.certificateSignature || parsed.certificado || parsed.cert || "";
        } catch {
          const lines = text
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean);
          if (lines.length >= 2) {
            llave = lines[0];
            cert = lines[1];
          }
        }

        if (llave && cert) {
          setLlaveInput(llave);
          setCertInput(cert);
          setErrorLogin(null);
          await ejecutarLogin(llave, cert);
        } else {
          setErrorLogin(
            "El archivo seleccionado no contiene una Llave Maestra y Certificado válidos de CRBX.",
          );
        }
      } catch {
        setErrorLogin("No se pudo leer el archivo de llave desde tu dispositivo.");
      }
    };
    reader.readAsText(file);
  }

  // Descargar archivo físico (.crbxkey) como respaldo (solo disponible dentro de la sesión activa)
  async function handleDescargarArchivoLlave() {
    if (!adminToken) return;
    try {
      const res = await generarDescargaLlaveMaestra({ data: { adminToken } });
      if (res.ok && res.contenido) {
        const blob = new Blob([res.contenido], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = res.nombreArchivo || "CRBX_LLAVE_MAESTRA.crbxkey";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert("¡Archivo de Llave descargado con éxito a tu dispositivo!");
      } else {
        alert(res.error || "No autorizado para descargar.");
      }
    } catch {
      alert("Error al descargar respaldo de llave.");
    }
  }

  // Solicitar reenvío seguro al correo privado del propietario
  async function handleSolicitarEnvioAlCorreo() {
    setEnviandoCorreoLlave(true);
    setMensajeEnvioCorreo(null);
    try {
      const res = await solicitarEnvioLlaveAlCorreoPropietario({ data: {} });
      if (res.ok && res.mensaje) {
        setMensajeEnvioCorreo(res.mensaje);
      }
    } catch {
      alert("Error al solicitar el reenvío a tu correo.");
    } finally {
      setEnviandoCorreoLlave(false);
    }
  }

  // Generar nueva clave aleatoria
  async function generarNuevaClave(tok?: string) {
    const t = tok || adminToken;
    if (!t) return;
    try {
      const res = await generarClaveAleatoriaAdmin({ data: { adminToken: t } });
      if (res.ok && res.clave) {
        setClaveGenerada(res.clave);
      }
    } catch {
      const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
      const rand2 = Math.random().toString(36).substring(2, 6).toUpperCase();
      setClaveGenerada(`CRBX-${rand}-${rand2}-9W3L`);
    }
  }

  // Crear invitación
  async function handleCrearInvitacion(e: React.FormEvent) {
    e.preventDefault();
    if (!adminToken) return;
    setCreando(true);
    setMensajeExito(null);

    try {
      const res = await crearNuevaInvitacionAdmin({
        data: {
          adminToken,
          nombre: nuevoNombre,
          email: nuevoEmail,
          nota: nuevaNota,
          clavePersonalizada: claveGenerada,
          enviarCorreo: enviarCorreoAuto,
          dominioBase,
        },
      });

      if (res.ok && res.invitacion) {
        setMensajeExito(
          `Invitación creada con éxito para ${res.invitacion.nombre}.${
            res.correoEnviado
              ? " Correo oficial con clave y enlace enviado automáticamente."
              : " (Guardado sin envío de correo)."
          }`,
        );
        setNuevoNombre("");
        setNuevoEmail("");
        setNuevaNota("");
        generarNuevaClave();
        await cargarInvitaciones(adminToken);
      }
    } catch (err: unknown) {
      alert("Error al crear invitación: " + (err instanceof Error ? err.message : "Desconocido"));
    } finally {
      setCreando(false);
    }
  }

  // Reenviar correo
  async function handleReenviarCorreo(invitacionId: string) {
    if (!adminToken) return;
    try {
      const res = await enviarCorreoInvitacionAdmin({
        data: {
          adminToken,
          invitacionId,
          dominioBase,
        },
      });

      if (res.ok) {
        alert("Correo con credenciales enviado exitosamente al invitado.");
        await cargarInvitaciones(adminToken);
      } else {
        alert("Error al enviar correo: " + (res.error || "Desconocido"));
      }
    } catch {
      alert("Error de comunicación al enviar correo.");
    }
  }

  // Revocar / Reactivar
  async function handleToggleEstado(inv: InvitacionInvitado) {
    if (!adminToken) return;
    const nuevoEstado = inv.estado === "activo" ? "revocado" : "activo";
    try {
      await cambiarEstadoInvitacionAdmin({
        data: {
          adminToken,
          id: inv.id,
          nuevoEstado,
        },
      });
      await cargarInvitaciones(adminToken);
    } catch (err) {
      console.error(err);
    }
  }

  // Copiar al portapapeles
  function copiarTexto(texto: string, id: string) {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(texto);
      setCopiadoId(id);
      setTimeout(() => setCopiadoId(null), 2500);
    }
  }

  // Copiar mensaje completo para WhatsApp
  function copiarMensajeWhatsApp(inv: InvitacionInvitado) {
    const enlace = `${dominioBase}/academia-privada?token=${inv.token}&email=${encodeURIComponent(inv.email)}`;
    const texto = `Hola ${inv.nombre}, bienvenido(a) al centro oficial de creadores de CRBX TikTok LIVE Agency.

Has sido autorizado formalmente para acceder a nuestro repositorio exclusivo de cursos y manuales técnicos oficiales.

Tus credenciales de acceso:
- Correo registrado: ${inv.email}
- Clave de acceso: ${inv.claveAcceso}

Ingresa directamente desde tu celular por este enlace único:
${enlace}

(Este enlace y clave son personales e intransferibles).`;
    copiarTexto(texto, `wa_${inv.id}`);
  }

  const invitacionesFiltradas = invitaciones.filter(
    (i) =>
      i.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      i.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      i.claveAcceso.toLowerCase().includes(busqueda.toLowerCase()),
  );

  // ==========================================
  // VISTA 1: BARRERA DE SEGURIDAD (SIN ACCESO)
  // Con el diseño oficial, heroBg, tipografía Space Grotesk y cero menú público
  // ==========================================
  if (!adminToken) {
    return (
      <div className="relative min-h-screen bg-background font-sans text-foreground flex flex-col">
        {/* Imagen de fondo ambiental centrada y sobria */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={heroBg}
            alt=""
            width={1920}
            height={1088}
            className="size-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        {/* Barra superior ultra minimalista */}
        <header className="relative z-10 bg-background/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <img src={crbxLogo} alt="CRBX" className="h-7 sm:h-8 w-auto object-contain" />
              <div className="pl-3">
                <span className="font-display text-sm font-bold tracking-tight text-foreground">
                  Administración
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Tarjeta de desbloqueo perfectamente centrada en el visor, sin contornos */}
        <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
          <div className="w-full max-w-lg rounded-3xl bg-card p-7 sm:p-9 shadow-2xl backdrop-blur-md">
            <div className="text-center mb-6">
              <div className="mx-auto size-12 rounded-2xl bg-secondary flex items-center justify-center shadow-xs mb-3">
                <Lock className="size-5 text-live-pink" />
              </div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                Llave Maestra y Certificado
              </h1>
            </div>

            {errorLogin && (
              <div className="mb-6 rounded-2xl bg-destructive/10 p-4 text-xs sm:text-sm text-destructive flex items-start gap-3">
                <ShieldAlert className="size-5 shrink-0 mt-0.5" />
                <span>{errorLogin}</span>
              </div>
            )}

            {/* MÉTODO 1: CARGAR ARCHIVO FÍSICO DESDE EL CELULAR */}
            <div className="space-y-4">
              <label className="cursor-pointer group block p-6 sm:p-7 rounded-2xl bg-secondary/60 hover:bg-secondary/90 transition-all text-center">
                <input
                  type="file"
                  accept=".crbxkey,.json,.key,.txt"
                  onChange={handleSeleccionarArchivoLlave}
                  className="sr-only"
                />
                <div className="size-14 rounded-2xl bg-gradient-to-br from-live-cyan/20 to-live-pink/20 flex items-center justify-center text-live-cyan mx-auto group-hover:scale-110 transition-transform mb-3 shadow-xs">
                  <Smartphone className="size-7" />
                </div>
                <span className="block font-display text-base font-bold text-foreground group-hover:text-live-cyan transition-colors">
                  Tocar aquí para Subir tu Archivo de Llave (.crbxkey)
                </span>
                <span className="block text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  Selecciona el archivo guardado en tu celular para ingresar al instante
                </span>
              </label>

              {/* Opción de reenvío seguro a tu correo privado */}
              <div>
                {mensajeEnvioCorreo ? (
                  <div className="rounded-2xl bg-emerald-500/10 p-3.5 text-xs text-emerald-600 dark:text-emerald-400 text-center font-medium">
                    {mensajeEnvioCorreo}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSolicitarEnvioAlCorreo}
                    disabled={enviandoCorreoLlave}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-secondary/50 hover:bg-secondary py-3 px-4 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="size-3.5 text-live-cyan" />
                    {enviandoCorreoLlave
                      ? "Enviando archivo a tu correo..."
                      : "¿No tienes el archivo a la mano? Reenviar a mi correo (becerraarles83@gmail.com)"}
                  </button>
                )}
              </div>
            </div>

            {/* MÉTODO 2: ALTERNATIVA MANUAL */}
            <div className="mt-6 pt-6 border-t border-border/40">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">
                  ¿Prefieres escribir la clave de texto?
                </span>
                <button
                  type="button"
                  onClick={() => setModoManual(!modoManual)}
                  className="text-xs text-live-pink hover:underline font-bold"
                >
                  {modoManual ? "Ocultar" : "Escribir llaves"}
                </button>
              </div>

              {modoManual && (
                <form onSubmit={handleLogin} className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                      Llave Maestra Criptográfica (Master Key)
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <KeyRound className="size-4 text-muted-foreground" />
                      </div>
                      <input
                        type="text"
                        required
                        value={llaveInput}
                        onChange={(e) => setLlaveInput(e.target.value)}
                        placeholder="CRBX-SECURE-MASTER-KEY-..."
                        className="block w-full rounded-xl bg-background pl-9 pr-3 py-2.5 text-xs font-mono text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-live-cyan"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                      Certificado Digital (Certificate Signature)
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FileCheck2 className="size-4 text-muted-foreground" />
                      </div>
                      <input
                        type="text"
                        required
                        value={certInput}
                        onChange={(e) => setCertInput(e.target.value)}
                        placeholder="CERT-CRBX-ROOT-AUTH-SHA256-..."
                        className="block w-full rounded-xl bg-background pl-9 pr-3 py-2.5 text-xs font-mono text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-live-pink"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loadingLogin}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-live-pink to-live-cyan py-3 text-xs font-bold text-white shadow-md shadow-live-pink/20 hover:scale-[1.01] transition-transform disabled:opacity-50"
                  >
                    {loadingLogin ? (
                      <>
                        <RefreshCw className="size-3.5 animate-spin" />
                        Verificando...
                      </>
                    ) : (
                      <>
                        <Lock className="size-3.5" />
                        Desbloquear con Texto
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // VISTA 2: PANEL DE CONTROL DE ADMINISTRACIÓN
  // Con el diseño oficial, tipografía Space Grotesk,
  // banner heroBg, menú minimalista y cero elementos del sitio público
  // ==========================================
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Barra superior de administración privada ultra minimalista sin contornos */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
          <div className="flex items-center justify-between gap-3">
            {/* Logo y título */}
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={crbxLogo}
                alt="CRBX"
                className="h-6 sm:h-8 w-auto object-contain shrink-0"
              />
              <div className="border-l border-border/40 pl-2.5">
                <span className="font-display text-xs sm:text-sm font-bold tracking-tight text-foreground truncate block">
                  Administración
                </span>
              </div>
            </div>

            {/* Selector de pestañas para pantallas medianas y grandes */}
            <div className="hidden md:flex items-center rounded-xl bg-secondary/80 p-1">
              <button
                type="button"
                onClick={() => setPestanaActiva("invitados")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  pestanaActiva === "invitados"
                    ? "bg-foreground text-background shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="size-3.5 text-live-cyan" />
                <span>Invitados ({invitaciones.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setPestanaActiva("cursos")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  pestanaActiva === "cursos"
                    ? "bg-foreground text-background shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BookOpen className="size-3.5 text-live-pink" />
                <span>Cursos ({modulosCursos.reduce((acc, m) => acc + m.recursos.length, 0)})</span>
              </button>
            </div>

            {/* Acciones rápidas (Descargar Llave y Salir) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={handleDescargarArchivoLlave}
                className="inline-flex items-center gap-1.5 rounded-xl bg-secondary/60 hover:bg-secondary px-2.5 py-1.5 sm:px-3 text-xs font-semibold text-foreground transition-colors"
                title="Descargar copia del archivo de llave a tu celular"
              >
                <Download className="size-3.5 text-live-pink" />
                <span className="hidden sm:inline">Descargar Llave</span>
              </button>

              <button
                onClick={cerrarSesion}
                title="Cerrar Sesión"
                className="inline-flex items-center gap-1.5 rounded-xl bg-secondary/60 hover:bg-destructive/10 hover:text-destructive px-2.5 py-1.5 sm:px-3 text-xs font-semibold text-muted-foreground transition-colors"
              >
                <PowerOff className="size-3.5" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>

          {/* Selector de pestañas para celular (Full Width, Centrado, 50/50 y Cómodo) */}
          <div className="mt-2.5 grid grid-cols-2 gap-1 rounded-xl bg-secondary/80 p-1 md:hidden">
            <button
              type="button"
              onClick={() => setPestanaActiva("invitados")}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-colors ${
                pestanaActiva === "invitados"
                  ? "bg-foreground text-background shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="size-3.5 text-live-cyan" />
              <span>Invitados ({invitaciones.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setPestanaActiva("cursos")}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-colors ${
                pestanaActiva === "cursos"
                  ? "bg-foreground text-background shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BookOpen className="size-3.5 text-live-pink" />
              <span>Cursos ({modulosCursos.reduce((acc, m) => acc + m.recursos.length, 0)})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Banner Principal con la imagen oficial de fondo */}
      <div className="relative overflow-hidden">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Base de Datos Cloud Firestore Persistente
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {pestanaActiva === "invitados"
                  ? "Gestión de Invitados"
                  : "Cursos y Guías Oficiales"}
              </h1>
            </div>

            {/* Tarjetas de Métricas alineadas al estilo CRBX sin contornos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full md:w-auto">
              <div className="rounded-2xl bg-card px-3 sm:px-4 py-2.5 text-center shadow-xs">
                <p className="font-display text-lg sm:text-xl font-bold text-foreground">
                  {invitaciones.length}
                </p>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase">Creados</p>
              </div>
              <div className="rounded-2xl bg-emerald-500/10 px-3 sm:px-4 py-2.5 text-center shadow-xs">
                <p className="font-display text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {invitaciones.filter((i) => i.estado === "activo").length}
                </p>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase">Activos</p>
              </div>
              <div className="rounded-2xl bg-live-cyan/10 px-3 sm:px-4 py-2.5 text-center shadow-xs">
                <p className="font-display text-lg sm:text-xl font-bold text-live-cyan">
                  {invitaciones.reduce((acc, i) => acc + (i.accesosTotales || 0), 0)}
                </p>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase">Accesos</p>
              </div>
              <div className="rounded-2xl bg-live-pink/10 px-3 sm:px-4 py-2.5 text-center shadow-xs">
                <p className="font-display text-lg sm:text-xl font-bold text-live-pink">
                  {modulosCursos.reduce((acc, m) => acc + m.recursos.length, 0)}
                </p>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase">Cursos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10">
        {pestanaActiva === "invitados" ? (
          <>
            {/* Formulario de Creación de Invitado sin contornos */}
            <div className="rounded-3xl bg-card p-5 sm:p-8 md:p-9 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-foreground">
                  <UserPlus className="size-5 text-live-pink" />
                </span>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    Crear Invitación
                  </h2>
                </div>
              </div>

              {mensajeExito && (
                <div className="mb-6 rounded-2xl bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Check className="size-5 shrink-0 text-emerald-500" />
                    <span>{mensajeExito}</span>
                  </div>
                  <button
                    onClick={() => setMensajeExito(null)}
                    className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
                  >
                    Cerrar
                  </button>
                </div>
              )}

              <form onSubmit={handleCrearInvitacion} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Juan Pérez"
                      value={nuevoNombre}
                      onChange={(e) => setNuevoNombre(e.target.value)}
                      className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-live-cyan"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="creador@gmail.com"
                      value={nuevoEmail}
                      onChange={(e) => setNuevoEmail(e.target.value)}
                      className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-live-cyan"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                      Notas Internas (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: TikTok Live, intermedio"
                      value={nuevaNota}
                      onChange={(e) => setNuevaNota(e.target.value)}
                      className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-live-cyan"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Clave Aleatoria
                      </label>
                      <button
                        type="button"
                        onClick={() => generarNuevaClave()}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-live-cyan hover:underline"
                      >
                        <RefreshCw className="size-3" />
                        Regenerar clave
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={claveGenerada}
                        className="w-full rounded-xl bg-secondary/50 px-4 py-3 text-sm font-mono font-bold text-live-pink focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => copiarTexto(claveGenerada, "temp_key")}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-card px-4 py-3 text-xs font-bold text-foreground hover:bg-secondary transition-colors shrink-0 shadow-xs"
                      >
                        {copiadoId === "temp_key" ? (
                          <Check className="size-4 text-emerald-500" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                        Copiar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Switch de Envío de Correo */}
                <div className="rounded-2xl bg-secondary/40 p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-secondary text-live-pink shrink-0">
                      <Mail className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Enviar invitación por correo automáticamente
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={enviarCorreoAuto}
                      onChange={(e) => setEnviarCorreoAuto(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-live-pink"></div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={creando}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-live-pink to-live-cyan py-3.5 text-sm font-bold text-white shadow-lg shadow-live-pink/25 hover:scale-[1.01] transition-transform disabled:opacity-50"
                >
                  {creando ? (
                    <>
                      <RefreshCw className="size-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <UserPlus className="size-4" />
                      Crear Invitación y Clave
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Listado de Invitados sin contornos */}
            <div className="rounded-3xl bg-card p-6 sm:p-9 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-foreground">
                    <Users className="size-5 text-live-cyan" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                      Invitados
                    </h2>
                  </div>
                </div>

                <div className="relative w-full sm:w-72">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="size-4 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar por nombre o correo..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full rounded-xl bg-background pl-9 pr-4 py-2 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-live-cyan"
                  />
                </div>
              </div>

              {cargandoInvitaciones ? (
                <div className="py-12 text-center text-muted-foreground">
                  <RefreshCw className="size-6 animate-spin mx-auto mb-2 text-live-cyan" />
                  Cargando invitaciones...
                </div>
              ) : invitacionesFiltradas.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground rounded-2xl bg-secondary/30">
                  No hay invitados registrados que coincidan con la búsqueda.
                </div>
              ) : (
                <div className="space-y-4">
                  {invitacionesFiltradas.map((inv) => {
                    const enlaceDirecto = `${dominioBase}/academia-privada?token=${inv.token}&email=${encodeURIComponent(inv.email)}`;
                    const esActivo = inv.estado === "activo";

                    return (
                      <div
                        key={inv.id}
                        className={`rounded-2xl p-5 shadow-xs transition-all ${
                          esActivo
                            ? "bg-secondary/40 hover:bg-secondary/60"
                            : "bg-destructive/5 opacity-75"
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          {/* Información del Creador */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2.5">
                              <span className="font-display font-bold text-foreground text-base">
                                {inv.nombre}
                              </span>
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                                  esActivo
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                    : "bg-destructive/10 text-destructive"
                                }`}
                              >
                                {inv.estado}
                              </span>
                              {inv.enviadoPorCorreo && (
                                <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:text-blue-400">
                                  Correo Enviado
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-muted-foreground">
                              Correo:{" "}
                              <span className="font-semibold text-foreground">{inv.email}</span>
                              {inv.nota && (
                                <span className="ml-2 text-muted-foreground">• {inv.nota}</span>
                              )}
                            </p>

                            <p className="text-[11px] text-muted-foreground">
                              Creado: {new Date(inv.creadoEn).toLocaleDateString("es-PE")} • Accesos
                              registrados: {inv.accesosTotales}
                              {inv.ultimoAcceso &&
                                ` (Último: ${new Date(inv.ultimoAcceso).toLocaleDateString("es-PE")})`}
                            </p>
                          </div>

                          {/* Clave y Enlace de Acceso */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/30 w-full lg:w-auto">
                            {/* Clave */}
                            <div className="flex items-center justify-between sm:justify-start gap-2 rounded-xl bg-background px-3 py-2 w-full sm:w-auto">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className="text-[11px] text-muted-foreground font-medium shrink-0">
                                  Clave:
                                </span>
                                <span className="font-mono text-xs font-bold text-live-pink truncate">
                                  {inv.claveAcceso}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => copiarTexto(inv.claveAcceso, `key_${inv.id}`)}
                                title="Copiar Clave"
                                className="text-muted-foreground hover:text-foreground transition-colors p-1 shrink-0"
                              >
                                {copiadoId === `key_${inv.id}` ? (
                                  <Check className="size-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="size-3.5" />
                                )}
                              </button>
                            </div>

                            {/* Botones de acción organizados y responsivos */}
                            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 w-full sm:w-auto">
                              {/* Copiar Enlace Directo */}
                              <button
                                type="button"
                                onClick={() => copiarTexto(enlaceDirecto, `link_${inv.id}`)}
                                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-secondary/80 hover:bg-secondary px-3 py-2 text-xs font-bold text-foreground transition-colors"
                              >
                                {copiadoId === `link_${inv.id}` ? (
                                  <>
                                    <Check className="size-3.5 text-emerald-500" />
                                    <span>Copiado</span>
                                  </>
                                ) : (
                                  <>
                                    <ExternalLink className="size-3.5 text-live-cyan" />
                                    <span>Enlace</span>
                                  </>
                                )}
                              </button>

                              {/* Mensaje WhatsApp */}
                              <button
                                type="button"
                                onClick={() => copiarMensajeWhatsApp(inv)}
                                title="Copiar mensaje para WhatsApp"
                                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                              >
                                {copiadoId === `wa_${inv.id}` ? (
                                  <Check className="size-3.5" />
                                ) : (
                                  <MessageCircle className="size-3.5" />
                                )}
                                <span>WhatsApp</span>
                              </button>

                              {/* Reenviar Correo */}
                              <button
                                type="button"
                                onClick={() => handleReenviarCorreo(inv.id)}
                                title="Reenviar por correo electrónico"
                                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-secondary/80 hover:bg-secondary px-3 py-2 text-xs font-medium text-foreground transition-colors"
                              >
                                <Send className="size-3.5 text-live-pink" />
                                <span>Reenviar</span>
                              </button>

                              {/* Revocar / Reactivar */}
                              <button
                                type="button"
                                onClick={() => handleToggleEstado(inv)}
                                title={esActivo ? "Revocar acceso" : "Reactivar acceso"}
                                className={`inline-flex items-center justify-center gap-1 rounded-xl p-2 text-xs font-bold transition-colors ${
                                  esActivo
                                    ? "text-destructive hover:bg-destructive/10"
                                    : "text-emerald-500 hover:bg-emerald-500/10"
                                }`}
                              >
                                {esActivo ? (
                                  <>
                                    <Trash2 className="size-3.5" />
                                    <span className="sm:hidden text-xs">Revocar</span>
                                  </>
                                ) : (
                                  <>
                                    <RefreshCw className="size-3.5" />
                                    <span className="sm:hidden text-xs">Activar</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          /* =========================================================
         PESTAÑA 2: VISOR DE CURSOS Y GUÍAS OFICIALES
         ========================================================= */
          <div className="space-y-8">
            <div className="rounded-3xl bg-card p-5 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-foreground">
                    <BookOpen className="size-5 text-live-pink" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                      Cursos y Manuales Oficiales
                    </h2>
                  </div>
                </div>

                <Link
                  to="/cursos"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary/80 hover:bg-secondary px-4 py-2 text-xs font-bold text-foreground transition-colors"
                >
                  <span>Ver Academia en Vivo</span>
                  <ExternalLink className="size-3 text-live-cyan" />
                </Link>
              </div>
            </div>

            {/* Documentos Oficiales de la Agencia CRBX (8 Documentos Registrados) */}
            <div className="rounded-3xl bg-card p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-border/40 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-live-pink bg-live-pink/10 px-2.5 py-0.5 rounded-full">
                    REPOSITORIO MAESTRO CRBX
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {documentosAgenciaOficiales.length} Documentos Oficiales
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                  Playbooks, Contratos Operativos y Manuales Técnicos
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Documentación oficial con logos, normas de TikTok LIVE, tablas de ganancias y
                  guiones de transmisión listos para lectura, impresión y descarga.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {documentosAgenciaOficiales.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex flex-col justify-between rounded-2xl bg-secondary/40 p-5 hover:bg-secondary/60 transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-[11px] font-bold text-live-cyan bg-live-cyan/10 px-2 py-0.5 rounded-md">
                          {doc.codigo}
                        </span>
                        <span className="text-[11px] text-muted-foreground font-medium">
                          {doc.duracionLectura}
                        </span>
                      </div>

                      <h4 className="font-display text-sm font-bold text-foreground group-hover:text-live-pink transition-colors">
                        {doc.titulo}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {doc.subtitulo}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-border/40 text-[11px] text-muted-foreground flex items-center justify-between">
                        <span className="truncate max-w-[200px]">{doc.departamento}</span>
                        <span className="font-bold text-foreground">{doc.version}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setDocumentoAgenciaAbierto(doc)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-card hover:bg-secondary px-3 py-2 text-xs font-bold text-foreground hover:text-live-cyan transition-colors shadow-xs"
                      >
                        <FileText className="size-3.5 text-live-cyan" />
                        <span>Abrir Documento</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Módulos de Cursos sin contornos */}
            <div className="space-y-8">
              {modulosCursos.map((mod) => (
                <div key={mod.id} className="rounded-3xl bg-card p-6 sm:p-8 space-y-6 shadow-sm">
                  <div className="border-b border-border/40 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-live-cyan bg-live-cyan/10 px-2.5 py-0.5 rounded-full">
                        MÓDULO {mod.numero}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {mod.recursos.length} Recursos
                      </span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                      {mod.titulo}
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {mod.recursos.map((rec) => (
                      <div
                        key={rec.id}
                        className="flex flex-col justify-between rounded-2xl bg-secondary/40 p-5 hover:bg-secondary/60 transition-all group"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-foreground uppercase tracking-wider">
                              {rec.tipoEtiqueta}
                            </span>
                            <span className="text-[11px] text-muted-foreground font-medium truncate">
                              {rec.fuente}
                            </span>
                          </div>

                          <h4 className="font-display text-sm font-bold text-foreground group-hover:text-live-cyan transition-colors">
                            {rec.titulo}
                          </h4>

                          {rec.subtitulo && (
                            <p className="mt-1 text-xs font-medium text-live-pink">
                              {rec.subtitulo}
                            </p>
                          )}

                          <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                            {rec.descripcion}
                          </p>

                          {rec.puntosClave?.length > 0 && (
                            <ul className="mt-3 space-y-1 border-t border-border/40 pt-3">
                              {rec.puntosClave.slice(0, 2).map((pt, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-1.5 text-[11px] text-muted-foreground"
                                >
                                  <span className="text-live-cyan shrink-0 mt-0.5">•</span>
                                  <span className="line-clamp-1">{pt}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-muted-foreground uppercase">
                            ID: {rec.id}
                          </span>
                          <button
                            type="button"
                            onClick={() => setRecursoAbierto(rec)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-card px-3 py-1.5 text-xs font-bold text-foreground hover:text-live-cyan transition-colors shadow-xs"
                          >
                            <span>Ver Documento</span>
                            <FileText className="size-3 text-live-cyan" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Visor In-App de Documentos y Cursos (Carga DENTRO sin abrir pestañas fuera) */}
      <InAppDocumentViewer recurso={recursoAbierto} onClose={() => setRecursoAbierto(null)} />

      {/* Lector Maestro Interactivo de Documentos Oficiales de la Agencia CRBX */}
      <AgencyDocumentReader
        documento={documentoAgenciaAbierto}
        onClose={() => setDocumentoAgenciaAbierto(null)}
      />
    </div>
  );
}
