import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  verificarLlaveYCertificadoAdmin,
  generarTokenSesionAdmin,
  validarTokenSesionAdmin,
  obtenerTodasLasInvitaciones,
  crearInvitacion,
  cambiarEstadoInvitacion,
  validarAccesoInvitado,
  generarTokenSesionInvitado,
  validarTokenSesionInvitado,
  enviarInvitacionPorCorreo,
  generarClaveInvitadoAleatoria,
  MASTER_ACCESS_KEY,
  MASTER_CERTIFICATE_HASH,
} from "./vault.server";

// ==========================================
// 1. FUNCIONES DEL ADMINISTRADOR (ROOT VAULT)
// ==========================================

export const generarDescargaLlaveMaestra = createServerFn({ method: "POST" })
  .validator((d: { adminToken: string }) => d)
  .handler(async ({ data }) => {
    const autorizado = validarTokenSesionAdmin(data.adminToken);
    if (!autorizado) {
      return { ok: false, error: "No autorizado. Debes tener sesión activa." };
    }

    const json = JSON.stringify(
      {
        sistema: "CRBX TikTok LIVE Agency Root Vault",
        propietario: "becerraarles83@gmail.com",
        tipo: "ARCHIVO_CERTIFICADO_LLAVE_MAESTRA",
        masterKey: MASTER_ACCESS_KEY,
        certificateSignature: MASTER_CERTIFICATE_HASH,
        algoritmo: "SHA-256 HMAC Timing-Safe",
        emitidoPara: "Celular / Dispositivo Autorizado del Propietario",
        fechaEmision: new Date().toISOString(),
        instrucciones:
          "Guarda este archivo en tu celular. Para acceder al panel oculto (/vault-crbx-secure-admin), simplemente presiona 'Subir Archivo de Llave' y selecciónalo.",
      },
      null,
      2,
    );

    return {
      ok: true,
      nombreArchivo: "CRBX_LLAVE_MAESTRA.crbxkey",
      contenido: json,
    };
  });

export const solicitarEnvioLlaveAlCorreoPropietario = createServerFn({ method: "POST" })
  .validator((d: Record<string, unknown>) => d)
  .handler(async () => {
    // Solo y estrictamente a la dirección privada del propietario
    const PROPIETARIO_EMAIL = "becerraarles83@gmail.com";
    const SMTP_USER = process.env["SMTP_USER"] || "becerraarles83@gmail.com";
    const SMTP_PASS = (process.env["SMTP_PASS"] || "tjhglcvwwoyzngub").replace(/\s+/g, "");

    const nodemailerModule = await import("nodemailer");
    const transporter = nodemailerModule.default.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const keyContent = JSON.stringify(
      {
        agency: "CRBX TikTok LIVE Agency",
        owner: PROPIETARIO_EMAIL,
        type: "ROOT_HARDWARE_KEY_CERTIFICATE",
        masterKey: MASTER_ACCESS_KEY,
        certificateSignature: MASTER_CERTIFICATE_HASH,
        algorithm: "SHA-256 HMAC Timing-Safe",
        issuedAt: new Date().toISOString(),
      },
      null,
      2,
    );

    await transporter.sendMail({
      from: `"CRBX Security Root" <${SMTP_USER}>`,
      to: PROPIETARIO_EMAIL,
      subject: "Archivo Oficial de Llave Maestra: CRBX_LLAVE_MAESTRA.crbxkey",
      html: `
        <div style="font-family:'Space Grotesk',Inter,-apple-system,BlinkMacSystemFont,sans-serif;background:#090b10;color:#ffffff;padding:32px;border-radius:20px;border:1px solid #1f2430;max-width:560px;margin:0 auto;">
          <h2 style="font-family:'Space Grotesk',sans-serif;letter-spacing:-0.5px;color:#ffffff;margin-top:0;font-size:22px;">CRBX <span style="color:#25F4EE;">LIVE</span></h2>
          <p style="font-size:14px;color:#94a3b8;margin-bottom:20px;">Seguridad y Llave de Administración</p>
          <p style="font-size:14px;line-height:1.6;color:#e2e8f0;">Hola Arles: Adjunto a este correo tienes tu <strong>Archivo Oficial de Llave Maestra (CRBX_LLAVE_MAESTRA.crbxkey)</strong>.</p>
          <p style="font-size:13px;line-height:1.6;color:#94a3b8;">Descárgalo a tu celular y utilízalo para entrar al panel privado en <a href="https://crbx-agencia.ai.studio/vault-crbx-secure-admin" style="color:#25F4EE;text-decoration:none;font-weight:bold;">/vault-crbx-secure-admin</a> mediante el botón "Subir Archivo de Llave".</p>
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #1f2430;font-size:11px;color:#64748b;">
            CRBX TikTok LIVE Agency • Carbe Global Corp SAC
          </div>
        </div>
      `,
      attachments: [
        {
          filename: "CRBX_LLAVE_MAESTRA.crbxkey",
          content: keyContent,
          contentType: "application/json",
        },
      ],
    });

    return {
      ok: true,
      mensaje:
        "El archivo de llave ha sido enviado confidencialmente a tu correo becerraarles83@gmail.com.",
    };
  });

export const loginAdminVault = createServerFn({ method: "POST" })
  .validator((d: { llave: string; certificado: string }) => d)
  .handler(async ({ data }) => {
    const esValido = verificarLlaveYCertificadoAdmin(data.llave, data.certificado);

    if (!esValido) {
      return {
        ok: false,
        error: "Acceso denegado: La Llave Maestra o el Certificado Digital no son válidos.",
      };
    }

    const tokenSesion = generarTokenSesionAdmin();
    return {
      ok: true,
      tokenSesion,
    };
  });

export const obtenerInvitacionesAdmin = createServerFn({ method: "POST" })
  .validator((d: { adminToken: string }) => d)
  .handler(async ({ data }) => {
    const autorizado = validarTokenSesionAdmin(data.adminToken);
    if (!autorizado) {
      return { ok: false, error: "Sesión de administrador no autorizada." };
    }

    const invitaciones = await obtenerTodasLasInvitaciones();
    return {
      ok: true,
      invitaciones,
    };
  });

export const crearNuevaInvitacionAdmin = createServerFn({ method: "POST" })
  .validator(
    (d: {
      adminToken: string;
      nombre: string;
      email: string;
      nota?: string;
      clavePersonalizada?: string;
      enviarCorreo: boolean;
      dominioBase: string;
    }) => d,
  )
  .handler(async ({ data }) => {
    const autorizado = validarTokenSesionAdmin(data.adminToken);
    if (!autorizado) {
      return { ok: false, error: "Sesión de administrador no autorizada." };
    }

    if (!data.nombre || data.nombre.trim().length < 2) {
      return { ok: false, error: "Ingresa el nombre completo del invitado." };
    }

    if (!data.email || !data.email.includes("@")) {
      return { ok: false, error: "Ingresa un correo electrónico válido." };
    }

    const nueva = await crearInvitacion({
      nombre: data.nombre,
      email: data.email,
      nota: data.nota,
      clavePersonalizada: data.clavePersonalizada,
    });

    let envioResultado = { ok: false };
    if (data.enviarCorreo) {
      envioResultado = await enviarInvitacionPorCorreo({
        invitacionId: nueva.id,
        dominioBase: data.dominioBase,
      });
    }

    return {
      ok: true,
      invitacion: nueva,
      correoEnviado: envioResultado.ok,
    };
  });

export const enviarCorreoInvitacionAdmin = createServerFn({ method: "POST" })
  .validator((d: { adminToken: string; invitacionId: string; dominioBase: string }) => d)
  .handler(async ({ data }) => {
    const autorizado = validarTokenSesionAdmin(data.adminToken);
    if (!autorizado) {
      return { ok: false, error: "Sesión no autorizada." };
    }

    const res = await enviarInvitacionPorCorreo({
      invitacionId: data.invitacionId,
      dominioBase: data.dominioBase,
    });

    return res;
  });

export const cambiarEstadoInvitacionAdmin = createServerFn({ method: "POST" })
  .validator((d: { adminToken: string; id: string; nuevoEstado: "activo" | "revocado" }) => d)
  .handler(async ({ data }) => {
    const autorizado = validarTokenSesionAdmin(data.adminToken);
    if (!autorizado) {
      return { ok: false, error: "Sesión no autorizada." };
    }

    const ok = await cambiarEstadoInvitacion(data.id, data.nuevoEstado);
    return { ok };
  });

export const generarClaveAleatoriaAdmin = createServerFn({ method: "POST" })
  .validator((d: { adminToken: string }) => d)
  .handler(async ({ data }) => {
    const autorizado = validarTokenSesionAdmin(data.adminToken);
    if (!autorizado) {
      return { ok: false, error: "Sesión no autorizada." };
    }

    return {
      ok: true,
      clave: generarClaveInvitadoAleatoria(),
    };
  });

// ==========================================
// 2. FUNCIONES DEL PORTAL DE INVITADOS
// ==========================================

export const autenticarInvitado = createServerFn({ method: "POST" })
  .validator((d: { token?: string; email?: string; clave?: string }) => d)
  .handler(async ({ data }) => {
    const resultado = await validarAccesoInvitado({
      token: data.token,
      email: data.email,
      clave: data.clave,
    });

    if (!resultado.valido || !resultado.invitado) {
      return {
        ok: false,
        error:
          resultado.mensajeError ||
          "Acceso denegado: Credenciales de invitación inválidas o revocadas.",
      };
    }

    const sesionToken = generarTokenSesionInvitado(resultado.invitado);

    return {
      ok: true,
      sesionToken,
      invitado: {
        nombre: resultado.invitado.nombre,
        email: resultado.invitado.email,
      },
    };
  });

export const verificarSesionInvitado = createServerFn({ method: "POST" })
  .validator((d: { sesionToken: string }) => d)
  .handler(async ({ data }) => {
    const res = await validarTokenSesionInvitado(data.sesionToken);
    if (!res.valido) {
      return { ok: false };
    }

    return {
      ok: true,
      invitado: {
        nombre: res.nombre || "Creador Autorizado",
        email: res.email || "",
      },
    };
  });
