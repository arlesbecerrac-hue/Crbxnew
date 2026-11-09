import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";
import {
  getInvitacionesFirestore,
  setInvitacionFirestore,
  updateEstadoInvitacionFirestore,
  registrarAccesoInvitadoFirestore,
  buscarInvitacionPorTokenFirestore,
  buscarInvitacionPorEmailYClaveFirestore,
  type InvitacionPersistente,
} from "./firebase";

// Clave Maestra y Certificado Criptográfico de Acceso (Solo el propietario de la agencia los posee)
export const MASTER_ACCESS_KEY =
  process.env["CRBX_MASTER_KEY"] || "CRBX-SECURE-MASTER-KEY-9F8A3C2B1E4D7F08A9B6C3D2E1F4A5B7";

export const MASTER_CERTIFICATE_HASH =
  process.env["CRBX_MASTER_CERT"] || "CERT-CRBX-ROOT-AUTH-SHA256-4D8E2B1A0F9C7E5A3D1B8F2E4A6C9872";

const VAULT_SECRET =
  process.env["CRBX_VAULT_SECRET"] ||
  "crbx-cryptographic-vault-secret-salt-2026-tiktok-live-defense";

const DATA_DIR = path.resolve(process.cwd(), "data");
const INVITATIONS_FILE = path.join(DATA_DIR, "invitations.json");

export type InvitacionInvitado = InvitacionPersistente;

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(INVITATIONS_FILE)) {
    fs.writeFileSync(INVITATIONS_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

export function obtenerInvitacionesLocal(): InvitacionInvitado[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(INVITATIONS_FILE, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error al leer archivo de invitaciones local:", err);
    return [];
  }
}

export function guardarInvitacionesLocal(invitaciones: InvitacionInvitado[]) {
  ensureDataFile();
  fs.writeFileSync(INVITATIONS_FILE, JSON.stringify(invitaciones, null, 2), "utf8");
}

/**
 * Obtiene todas las invitaciones de la base de datos persistente (Firestore como fuente principal)
 */
export async function obtenerTodasLasInvitaciones(): Promise<InvitacionInvitado[]> {
  try {
    const remotas = await getInvitacionesFirestore();
    if (remotas) {
      guardarInvitacionesLocal(remotas);
      return remotas;
    }
  } catch (err) {
    console.warn("Aviso: No se pudo conectar a Firestore, cargando datos locales:", err);
  }
  return obtenerInvitacionesLocal();
}

export function guardarInvitaciones(invitaciones: InvitacionInvitado[]) {
  guardarInvitacionesLocal(invitaciones);
}

/**
 * Comparación en tiempo constante para evitar ataques de temporización (timing attacks)
 */
function timingSafeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a.trim());
  const bufB = Buffer.from(b.trim());
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Valida la Llave Maestra y Certificado Digital del Administrador
 */
export function verificarLlaveYCertificadoAdmin(llave: string, certificado: string): boolean {
  if (!llave || !certificado) return false;
  const keyMatch = timingSafeCompare(llave, MASTER_ACCESS_KEY);
  const certMatch = timingSafeCompare(certificado, MASTER_CERTIFICATE_HASH);
  return keyMatch && certMatch;
}

/**
 * Genera un token de sesión criptográfico firmado para el administrador
 */
export function generarTokenSesionAdmin(): string {
  const payload = {
    rol: "ADMIN_ROOT",
    exp: Date.now() + 1000 * 60 * 60 * 12, // 12 horas
    nonce: crypto.randomBytes(16).toString("hex"),
  };
  const json = JSON.stringify(payload);
  const hmac = crypto.createHmac("sha256", VAULT_SECRET).update(json).digest("hex");
  return Buffer.from(json).toString("base64url") + "." + hmac;
}

export function validarTokenSesionAdmin(token: string): boolean {
  if (!token || !token.includes(".")) return false;
  const [b64, hmac] = token.split(".");
  if (!b64 || !hmac) return false;

  try {
    const json = Buffer.from(b64, "base64url").toString("utf8");
    const expectedHmac = crypto.createHmac("sha256", VAULT_SECRET).update(json).digest("hex");

    if (!timingSafeCompare(hmac, expectedHmac)) return false;

    const payload = JSON.parse(json);
    if (payload.rol !== "ADMIN_ROOT") return false;
    if (Date.now() > payload.exp) return false;

    return true;
  } catch {
    return false;
  }
}

/**
 * Generador automático de claves de acceso aleatorias de alta entropía para invitados
 */
export function generarClaveInvitadoAleatoria(): string {
  const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin caracteres ambiguos como O, 0, I, 1
  const randBytes = crypto.randomBytes(12);
  let p1 = "";
  let p2 = "";
  let p3 = "";

  for (let i = 0; i < 4; i++) p1 += charset[randBytes[i] % charset.length];
  for (let i = 4; i < 8; i++) p2 += charset[randBytes[i] % charset.length];
  for (let i = 8; i < 12; i++) p3 += charset[randBytes[i] % charset.length];

  return `CRBX-${p1}-${p2}-${p3}`;
}

/**
 * Genera un token único de enlace para el invitado
 */
export function generarTokenInvitado(): string {
  return crypto.randomBytes(24).toString("hex");
}

/**
 * Crea y persiste una nueva invitación de creador invitado
 */
export async function crearInvitacion(params: {
  nombre: string;
  email: string;
  nota?: string;
  clavePersonalizada?: string;
}): Promise<InvitacionInvitado> {
  const id = "inv_" + Date.now() + "_" + crypto.randomBytes(4).toString("hex");
  const token = generarTokenInvitado();
  const claveAcceso = (params.clavePersonalizada || generarClaveInvitadoAleatoria()).trim();

  const nuevaInvitacion: InvitacionInvitado = {
    id,
    token,
    claveAcceso,
    nombre: params.nombre.trim(),
    email: params.email.trim().toLowerCase(),
    creadoEn: new Date().toISOString(),
    accesosTotales: 0,
    estado: "activo",
    enviadoPorCorreo: false,
  };
  if (params.nota?.trim()) {
    nuevaInvitacion.nota = params.nota.trim();
  }

  // Guardar en Firestore persistente
  try {
    await setInvitacionFirestore(nuevaInvitacion);
  } catch (err) {
    console.error("Error al persistir nueva invitación en Firestore:", err);
  }

  // Guardar en respaldo local
  const locales = obtenerInvitacionesLocal();
  locales.unshift(nuevaInvitacion);
  guardarInvitacionesLocal(locales);

  return nuevaInvitacion;
}

/**
 * Revocar o reactivar una invitación
 */
export async function cambiarEstadoInvitacion(
  id: string,
  estado: "activo" | "revocado",
): Promise<boolean> {
  try {
    await updateEstadoInvitacionFirestore(id, estado);
  } catch (err) {
    console.error("Error al actualizar estado en Firestore:", err);
  }

  const locales = obtenerInvitacionesLocal();
  const idx = locales.findIndex((i) => i.id === id);
  if (idx !== -1) {
    locales[idx].estado = estado;
    guardarInvitacionesLocal(locales);
  }
  return true;
}

/**
 * Valida el acceso de un invitado mediante su clave + email o mediante su token
 */
export async function validarAccesoInvitado(params: {
  token?: string;
  email?: string;
  clave?: string;
}): Promise<{
  valido: boolean;
  invitado?: {
    nombre: string;
    email: string;
    token: string;
  };
  mensajeError?: string;
}> {
  // Buscar en Firestore primero
  let inv: InvitacionInvitado | null = null;
  try {
    if (params.token) {
      inv = await buscarInvitacionPorTokenFirestore(params.token);
    } else if (params.email && params.clave) {
      inv = await buscarInvitacionPorEmailYClaveFirestore(params.email, params.clave);
    }
  } catch (err) {
    console.warn("Fallo búsqueda en Firestore, intentando respaldo:", err);
  }

  // Si no se encontró en Firestore, intentar respaldo local
  if (!inv) {
    const locales = obtenerInvitacionesLocal();
    if (params.token) {
      inv = locales.find((i) => i.token === params.token) || null;
    } else if (params.email && params.clave) {
      const emailNorm = params.email.trim().toLowerCase();
      const claveNorm = params.clave.trim().toUpperCase();
      inv =
        locales.find(
          (i) => i.email.toLowerCase() === emailNorm && i.claveAcceso.toUpperCase() === claveNorm,
        ) || null;
    }
  }

  if (!inv) {
    return {
      valido: false,
      mensajeError: params.token
        ? "El enlace de invitación no es válido o ha expirado."
        : "La clave de acceso o el correo electrónico no coinciden.",
    };
  }

  if (inv.estado === "revocado") {
    return {
      valido: false,
      mensajeError: "Esta invitación ha sido revocada o desactivada por la administración de CRBX.",
    };
  }

  const nuevoAccesos = (inv.accesosTotales || 0) + 1;
  const nuevoUltimoAcceso = new Date().toISOString();

  // Actualizar en Firestore
  try {
    await registrarAccesoInvitadoFirestore(inv.id, nuevoAccesos, nuevoUltimoAcceso);
  } catch (err) {
    console.error("Error al registrar acceso en Firestore:", err);
  }

  // Actualizar en respaldo local
  const locales = obtenerInvitacionesLocal();
  const idx = locales.findIndex((i) => i.id === inv?.id);
  if (idx !== -1) {
    locales[idx].accesosTotales = nuevoAccesos;
    locales[idx].ultimoAcceso = nuevoUltimoAcceso;
    guardarInvitacionesLocal(locales);
  }

  return {
    valido: true,
    invitado: {
      nombre: inv.nombre,
      email: inv.email,
      token: inv.token,
    },
  };
}

/**
 * Genera token de sesión para el invitado autenticado
 */
export function generarTokenSesionInvitado(invitado: {
  nombre: string;
  email: string;
  token: string;
}): string {
  const payload = {
    rol: "GUEST_STUDENT",
    nombre: invitado.nombre,
    email: invitado.email,
    token: invitado.token,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 días
  };
  const json = JSON.stringify(payload);
  const hmac = crypto.createHmac("sha256", VAULT_SECRET).update(json).digest("hex");
  return Buffer.from(json).toString("base64url") + "." + hmac;
}

export async function validarTokenSesionInvitado(sesionToken: string): Promise<{
  valido: boolean;
  nombre?: string;
  email?: string;
}> {
  if (!sesionToken || !sesionToken.includes(".")) return { valido: false };
  const [b64, hmac] = sesionToken.split(".");
  if (!b64 || !hmac) return { valido: false };

  try {
    const json = Buffer.from(b64, "base64url").toString("utf8");
    const expectedHmac = crypto.createHmac("sha256", VAULT_SECRET).update(json).digest("hex");

    if (!timingSafeCompare(hmac, expectedHmac)) return { valido: false };

    const payload = JSON.parse(json);
    if (payload.rol !== "GUEST_STUDENT") return { valido: false };
    if (Date.now() > payload.exp) return { valido: false };

    // Validar que la invitación continúe activa en el almacenamiento (Firestore o local)
    let inv: InvitacionInvitado | null = null;
    try {
      inv = await buscarInvitacionPorTokenFirestore(payload.token);
    } catch {
      // ignore
    }
    if (!inv) {
      const invitaciones = obtenerInvitacionesLocal();
      inv = invitaciones.find((i) => i.token === payload.token) || null;
    }

    if (!inv || inv.estado === "revocado") return { valido: false };

    return { valido: true, nombre: payload.nombre, email: payload.email };
  } catch {
    return { valido: false };
  }
}

/**
 * Envía el correo oficial al invitado con su clave y enlace de acceso
 */
export async function enviarInvitacionPorCorreo(opts: {
  invitacionId: string;
  dominioBase: string;
}): Promise<{ ok: boolean; error?: string }> {
  const invitaciones = await obtenerTodasLasInvitaciones();
  const inv = invitaciones.find((i) => i.id === opts.invitacionId);
  if (!inv) return { ok: false, error: "Invitación no encontrada." };

  const SMTP_USER = process.env["SMTP_USER"] || "becerraarles83@gmail.com";
  const SMTP_PASS = (process.env["SMTP_PASS"] || "tjhg lcvw woyz ngub").replace(/\s+/g, "");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const enlaceAcceso = `${opts.dominioBase}/academia-privada?token=${inv.token}&email=${encodeURIComponent(inv.email)}`;

  const logoPath = path.resolve(process.cwd(), "src/assets/crbx-logo.png");
  const attachments: Array<{ filename: string; path: string; cid: string }> = [];
  if (fs.existsSync(logoPath)) {
    attachments.push({
      filename: "crbx-logo.png",
      path: logoPath,
      cid: "crbx-agency-logo",
    });
  }

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acceso a tus Clases y Recursos — CRBX</title>
</head>
<body style="margin:0;padding:0;background-color:#050505;color:#ffffff;font-family:'Space Grotesk',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;padding:36px 12px;margin:0;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background-color:#111111;border-radius:24px;border:1px solid #222222;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.85);">
          <!-- Cabecera con Logo Oficial de la Agencia -->
          <tr>
            <td style="padding:32px 28px 24px;background-color:#111111;border-bottom:1px solid #1f1f1f;text-align:center;">
              <img src="cid:crbx-agency-logo" alt="CRBX LIVE" width="150" style="display:block;margin:0 auto 12px;max-height:48px;height:auto;border:0;outline:none;" />
              <p style="margin:0;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#a1a1aa;font-weight:600;">
                Centro de Creadores • Recursos Oficiales
              </p>
            </td>
          </tr>

          <!-- Cuerpo Principal -->
          <tr>
            <td style="padding:32px 28px;">
              <h2 style="margin:0 0 14px;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">
                Hola, ${inv.nombre}
              </h2>
              <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#d4d4d8;">
                Tu acceso a las clases y recursos exclusivos de CRBX ha sido autorizado. A continuación encuentras tu clave personal y el enlace oficial para ingresar directamente a tus materiales.
              </p>

              <!-- Recuadro de Credenciales -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#171717;border-radius:18px;border:1px solid #262626;margin-bottom:26px;">
                <tr>
                  <td style="padding:22px 24px;">
                    <p style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#25F4EE;">
                      Credenciales de Ingreso
                    </p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#a1a1aa;width:35%;">Correo Registrado:</td>
                        <td style="padding:6px 0;font-size:13px;font-weight:600;color:#ffffff;">${inv.email}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;font-size:13px;color:#a1a1aa;">Clave de Acceso:</td>
                        <td style="padding:8px 0;">
                          <div style="display:inline-block;background-color:#0a0a0a;padding:8px 14px;border-radius:10px;border:1px solid #2e2e2e;">
                            <span style="font-size:16px;font-weight:800;font-family:monospace;letter-spacing:1.5px;color:#FE2C55;">
                              ${inv.claveAcceso}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Bloque con Icono de Copiar Código -->
                    <div style="margin-top:16px;padding-top:14px;border-top:1px solid #262626;display:flex;align-items:center;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="vertical-align:middle;padding-right:8px;">
                            <!-- Icono de Copiar Código SVG Real -->
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25F4EE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                            </svg>
                          </td>
                          <td style="vertical-align:middle;font-size:12px;color:#a1a1aa;font-weight:500;">
                            Copia esta clave para ingresarla en la plataforma.
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Botón de Ingreso Oficial -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td align="center">
                    <a href="${enlaceAcceso}" target="_blank" style="display:inline-block;padding:15px 36px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;background:linear-gradient(135deg, #FE2C55 0%, #25F4EE 100%);border-radius:12px;box-shadow:0 8px 24px -4px rgba(254,44,85,0.4);">
                      Ingresar a tus Clases
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Enlace directo -->
              <div style="background-color:#171717;border-radius:12px;padding:14px 16px;border:1px solid #262626;">
                <p style="margin:0 0 6px;font-size:11px;color:#71717a;font-weight:600;">
                  Enlace directo alternativo:
                </p>
                <p style="margin:0;font-size:12px;font-family:monospace;color:#25F4EE;word-break:break-all;">
                  ${enlaceAcceso}
                </p>
              </div>

              <!-- Nota de Seguridad -->
              <p style="margin:20px 0 0;font-size:11px;line-height:1.5;color:#71717a;text-align:center;">
                Este enlace y clave son personales para el creador registrado en CRBX.
              </p>
            </td>
          </tr>

          <!-- Pie del Correo -->
          <tr>
            <td style="padding:20px 24px;background-color:#0a0a0a;border-top:1px solid #1f1f1f;text-align:center;font-size:11px;color:#71717a;">
              CRBX TikTok LIVE Agency • Carbe Global Corp SAC (RUC 20616178769)<br>
              Atención a Creadores: contacto@crbxagency.com
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `"CRBX LIVE" <${SMTP_USER}>`,
      to: inv.email,
      subject: `Invitación y Clave de Acceso: ${inv.nombre}`,
      html,
      attachments,
    });

    inv.enviadoPorCorreo = true;
    try {
      await setInvitacionFirestore(inv);
    } catch (err) {
      console.warn("No se pudo actualizar enviadoPorCorreo en Firestore:", err);
    }
    guardarInvitaciones(invitaciones);
    return { ok: true };
  } catch (error: unknown) {
    console.error("Error al enviar correo al invitado:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "No se pudo enviar el correo electrónico.",
    };
  }
}
