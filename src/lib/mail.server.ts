import nodemailer from "nodemailer";
import path from "node:path";
import fs from "node:fs";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const SMTP_USER = process.env["SMTP_USER"] || "becerraarles83@gmail.com";
const SMTP_PASS = (process.env["SMTP_PASS"] || "tjhg lcvw woyz ngub").replace(/\s+/g, "");
const RECIPIENT_EMAIL = process.env["SMTP_TO"] || "seguraxdata@gmail.com";

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

/**
 * Notificación interna para el equipo/administrador de CRBX
 */
export async function sendMail(opts: { subject: string; replyTo: string; fields: Record<string, string> }) {
  const transporter = createTransporter();

  const rows = Object.entries(opts.fields)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 14px;color:#475569;font-weight:600;border-bottom:1px solid #e2e8f0;width:35%;background-color:#f8fafc;">${esc(
          k
        )}</td><td style="padding:10px 14px;color:#0f172a;border-bottom:1px solid #e2e8f0;background-color:#ffffff;">${esc(
          v || "—"
        ).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");

  const text = Object.entries(opts.fields)
    .map(([k, v]) => `${k}: ${v || "—"}`)
    .join("\n");

  await transporter.sendMail({
    from: `"CRBX Agencia" <${SMTP_USER}>`,
    to: RECIPIENT_EMAIL,
    replyTo: opts.replyTo || RECIPIENT_EMAIL,
    subject: `[CRBX] ${opts.subject}`,
    text,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; width: 100%; margin: 0; padding: 16px; background-color: #f1f5f9; color: #0f172a;">
        <div style="width: 100%; max-width: 680px; margin: 0 auto; background-color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #0f172a; margin: 0 0 6px 0; font-size: 20px; font-weight: 700;">${esc(opts.subject)}</h2>
            <div style="height: 3px; width: 60px; background: linear-gradient(90deg, #06b6d4, #f43f5e); margin: 10px auto 0 auto; border-radius: 2px;"></div>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 15px; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
            ${rows}
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #64748b; text-align: center;">
            Notificación interna CRBX • Admin: ${esc(RECIPIENT_EMAIL)}
          </p>
        </div>
      </div>
    `,
  });
}

/**
 * Correo de confirmación oficial para el postulante:
 * - Cabecera con banner estilizado (olas cyan/pink con el logo de CRBX integrado sobre la imagen).
 * - Paleta cromática idéntica a la imagen de cabecera: Cian Eléctrico (#00f2fe / #06b6d4) y Rosa Neón TikTok (#fe2c55 / #f43f5e).
 * - Tipografía corporativa oficial del proyecto: Space Grotesk para títulos y Inter para cuerpo.
 * - Diseño premium no genérico, optimizado para Gmail (móvil y web), Outlook y Apple Mail.
 */
export async function sendPostulacionConfirmationToApplicant(data: {
  nombre: string;
  email: string;
  telefono: string;
  tiktok: string;
  pais?: string;
  categoria?: string;
}) {
  const transporter = createTransporter();

  // Formato adecuado de usuario
  const tiktokUser = data.tiktok.startsWith("@") || data.tiktok.startsWith("http")
    ? data.tiktok
    : `@${data.tiktok}`;

  const emailBannerPath = path.resolve(process.cwd(), "src/assets/email-banner.png");
  const bannerHeaderPath = path.resolve(process.cwd(), "src/assets/hero-bg.jpg");
  const logoPath = path.resolve(process.cwd(), "src/assets/crbx-logo.png");

  const attachments: Array<{ filename: string; path: string; cid: string }> = [];

  // Usamos el banner compuesto con logo integrado si existe
  if (fs.existsSync(emailBannerPath)) {
    attachments.push({
      filename: "crbx-banner.png",
      path: emailBannerPath,
      cid: "crbx-banner-header",
    });
  } else if (fs.existsSync(bannerHeaderPath)) {
    attachments.push({
      filename: "banner-header.jpg",
      path: bannerHeaderPath,
      cid: "crbx-banner-header",
    });
    if (fs.existsSync(logoPath)) {
      attachments.push({
        filename: "logo.png",
        path: logoPath,
        cid: "crbx-logo",
      });
    }
  }

  const textBody = `¡Hola ${data.nombre}!
Recibimos tu postulación para unirte a CRBX Agencia como creador oficial de TikTok LIVE.

Detalles de tu postulación:
- Cuenta de TikTok: ${tiktokUser}
- WhatsApp de contacto: ${data.telefono}
${data.categoria ? `- Categoría: ${data.categoria}\n` : ""}${data.pais ? `- País: ${data.pais}\n` : ""}

¿Qué sigue ahora?
1. Revisión de tu cuenta: Nuestro equipo de reclutamiento analizará tu perfil de TikTok (${tiktokUser}).
2. Contacto directo: Te escribiremos por WhatsApp al ${data.telefono} o correo en un plazo de 24 a 48 horas.
3. Invitación oficial: Recibirás la invitación oficial de CRBX directamente dentro de tu aplicación de TikTok en la sección de Centro de Creadores LIVE.

Cero comisiones:
Recuerda que unirte a CRBX es 100% gratuito. Nunca te pediremos contraseñas de tu cuenta ni te cobraremos ningún tipo de comisión sobre tus diamantes (conservas el 100% de lo que ganas).

¡Nos vemos pronto en los directos!
El equipo de CRBX Agencia
WhatsApp de atención: +51 916 753 556`;

  const htmlBody = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Postulación Recibida — CRBX Agencia</title>
  <!-- Tipografía oficial del proyecto: Space Grotesk e Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    @media only screen and (max-width: 620px) {
      .mobile-padding { padding-left: 18px !important; padding-right: 18px !important; }
      .mobile-title { font-size: 22px !important; }
      .step-table { margin-bottom: 12px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f1f5f9; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #0f172a;">
  
  <!-- Contenedor exterior 100% Ancho Completo -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%; margin: 0; padding: 0; background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 16px 8px 30px 8px;">
        
        <!-- Tarjeta Principal Adaptable a todo el ancho (hasta 640px) -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 640px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08);">
          
          <!-- BANNER HERO OFICIAL (Olas de fluido cian y rosa con el logo de CRBX integrado sobre la imagen) -->
          <tr>
            <td style="padding: 0; margin: 0; background-color: #ffffff; line-height: 0;">
              <img
                src="cid:crbx-banner-header"
                alt="CRBX Agencia TikTok LIVE"
                width="640"
                style="width: 100%; max-width: 100%; height: auto; display: block; border-top-left-radius: 20px; border-top-right-radius: 20px;"
              />
            </td>
          </tr>

          <!-- Divisoria de Degradado Neón con la paleta exacta de la imagen -->
          <tr>
            <td style="padding: 0; margin: 0; line-height: 0;">
              <div style="height: 4px; width: 100%; background: linear-gradient(90deg, #00f2fe 0%, #06b6d4 35%, #a855f7 65%, #fe2c55 100%);"></div>
            </td>
          </tr>

          <!-- TÍTULO Y SALUDO PERSONALIZADO CON COLORES DE MARCA -->
          <tr>
            <td class="mobile-padding" style="padding: 28px 32px 14px 32px; text-align: center; background-color: #ffffff;">
              
              <!-- Badge Oficial TikTok LIVE -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto 14px auto;">
                <tr>
                  <td style="padding: 5px 16px; border-radius: 999px; background: linear-gradient(90deg, #ecfeff 0%, #fff1f2 100%); border: 1px solid #e2e8f0; color: #0f172a; font-family: 'Space Grotesk', 'Inter', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase;">
                    <span style="color: #06b6d4;">✦</span> TIKTOK LIVE OFFICIAL AGENCY <span style="color: #fe2c55;">✦</span>
                  </td>
                </tr>
              </table>

              <!-- Saludo Principal -->
              <h1 class="mobile-title" style="margin: 0 0 6px 0; color: #0f172a; font-family: 'Space Grotesk', 'Inter', -apple-system, sans-serif; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.25;">
                ¡Hola <span style="color: #06b6d4;">${esc(data.nombre)}</span>!
              </h1>
              
              <!-- Subtítulo elegante -->
              <p style="margin: 0 0 14px 0; color: #fe2c55; font-family: 'Space Grotesk', 'Inter', sans-serif; font-size: 16px; font-weight: 700; letter-spacing: -0.2px;">
                Recibimos tu postulación para unirte a CRBX Agencia
              </p>

              <!-- Notificación de correo -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto;">
                <tr>
                  <td style="padding: 4px 14px; border-radius: 999px; background-color: #f8fafc; border: 1px solid #e2e8f0; color: #64748b; font-size: 12px; font-weight: 500;">
                    Confirmación oficial enviada a <strong style="color: #0f172a;">${esc(data.email)}</strong>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- INTRODUCCIÓN Y CHIPS DE DATOS -->
          <tr>
            <td class="mobile-padding" style="padding: 8px 32px 18px 32px; color: #475569; font-size: 14px; line-height: 1.6;">
              <p style="margin: 0 0 14px 0;">
                Gracias por postularte para formar parte de la familia <strong>CRBX Agencia</strong> como creador oficial de <strong>TikTok LIVE</strong>. Tu registro ha ingresado con prioridad a nuestro sistema de reclutamiento.
              </p>

              <!-- Tarjeta de Resumen con Datos del Creador -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%; background: linear-gradient(135deg, #f8fafc 0%, #f0fdff 100%); border-radius: 14px; border: 1px solid #e2e8f0; padding: 14px 16px;">
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 3px 0; font-size: 13px; color: #64748b;">
                          <strong style="color: #0f172a;">Perfil TikTok:</strong> <span style="display: inline-block; padding: 2px 8px; border-radius: 6px; background-color: #06b6d4; color: #ffffff; font-weight: 700; font-size: 12px;">${esc(tiktokUser)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 3px 0; font-size: 13px; color: #64748b;">
                          <strong style="color: #0f172a;">WhatsApp:</strong> <span style="color: #0f172a; font-weight: 600;">${esc(data.telefono)}</span>
                        </td>
                      </tr>
                      ${
                        data.categoria
                          ? `<tr>
                              <td style="padding: 3px 0; font-size: 13px; color: #64748b;">
                                <strong style="color: #0f172a;">Categoría:</strong> <span style="color: #fe2c55; font-weight: 600;">${esc(data.categoria)}</span>
                              </td>
                            </tr>`
                          : ""
                      }
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- SECCIÓN: ¿QUÉ SIGUE AHORA? CON COLORES DE LAS OLAS -->
          <tr>
            <td class="mobile-padding" style="padding: 6px 32px 20px 32px;">
              <h2 style="margin: 0 0 14px 0; color: #0f172a; font-family: 'Space Grotesk', 'Inter', sans-serif; font-size: 18px; font-weight: 800; letter-spacing: -0.3px;">
                ¿Qué sigue ahora?
              </h2>

              <!-- Paso 1 - Color Cian Eléctrico -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="step-table" style="width: 100%; margin-bottom: 12px; background-color: #f0fdff; border-radius: 14px; padding: 14px 16px; border: 1px solid #cffafe;">
                <tr>
                  <td width="36" valign="top" style="vertical-align: top;">
                    <div style="width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #00f2fe 0%, #06b6d4 100%); color: #ffffff; font-family: 'Space Grotesk', sans-serif; font-weight: 800; font-size: 14px; text-align: center; line-height: 30px; box-shadow: 0 3px 8px rgba(6, 182, 212, 0.35);">
                      1
                    </div>
                  </td>
                  <td style="padding-left: 14px; color: #334155; font-size: 14px; line-height: 1.5;">
                    <strong style="color: #0f172a; font-family: 'Space Grotesk', sans-serif; font-size: 15px;">Revisión de tu cuenta</strong><br>
                    Nuestro equipo de reclutamiento analizará tu perfil de TikTok (<span style="color: #0891b2; font-weight: 700;">${esc(tiktokUser)}</span>) para verificar el cumplimiento de normas comunitarias de TikTok LIVE.
                  </td>
                </tr>
              </table>

              <!-- Paso 2 - Color Púrpura Intermedio -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="step-table" style="width: 100%; margin-bottom: 12px; background-color: #faf5ff; border-radius: 14px; padding: 14px 16px; border: 1px solid #f3e8ff;">
                <tr>
                  <td width="36" valign="top" style="vertical-align: top;">
                    <div style="width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); color: #ffffff; font-family: 'Space Grotesk', sans-serif; font-weight: 800; font-size: 14px; text-align: center; line-height: 30px; box-shadow: 0 3px 8px rgba(168, 85, 247, 0.35);">
                      2
                    </div>
                  </td>
                  <td style="padding-left: 14px; color: #334155; font-size: 14px; line-height: 1.5;">
                    <strong style="color: #0f172a; font-family: 'Space Grotesk', sans-serif; font-size: 15px;">Contacto directo por WhatsApp</strong><br>
                    Te escribiremos por WhatsApp al <span style="color: #7c3aed; font-weight: 700;">${esc(data.telefono)}</span> o correo en un plazo de <strong>24 a 48 horas</strong> para darte la bienvenida y coordinar tu ingreso.
                  </td>
                </tr>
              </table>

              <!-- Paso 3 - Color Rosa Neón TikTok -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="step-table" style="width: 100%; margin-bottom: 14px; background-color: #fff1f2; border-radius: 14px; padding: 14px 16px; border: 1px solid #ffe4e6;">
                <tr>
                  <td width="36" valign="top" style="vertical-align: top;">
                    <div style="width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #fe2c55 0%, #f43f5e 100%); color: #ffffff; font-family: 'Space Grotesk', sans-serif; font-weight: 800; font-size: 14px; text-align: center; line-height: 30px; box-shadow: 0 3px 8px rgba(254, 44, 85, 0.35);">
                      3
                    </div>
                  </td>
                  <td style="padding-left: 14px; color: #334155; font-size: 14px; line-height: 1.5;">
                    <strong style="color: #0f172a; font-family: 'Space Grotesk', sans-serif; font-size: 15px;">Invitación oficial en la app</strong><br>
                    Recibirás la invitación oficial de <strong>CRBX Agencia</strong> directamente en tu app de TikTok dentro del <strong>Centro de Creadores LIVE</strong> para activarte con 1 solo toque.
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- GARANTÍA CERO COMISIONES (Diseño Premium Dark con acentos neón) -->
          <tr>
            <td class="mobile-padding" style="padding: 0 32px 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%); border-radius: 16px; border: 1px solid #334155; padding: 18px 20px;">
                <tr>
                  <td width="32" valign="top" style="vertical-align: top;">
                    <div style="font-size: 22px; line-height: 1;">
                      🛡️
                    </div>
                  </td>
                  <td style="padding-left: 12px; color: #cbd5e1; font-size: 13px; line-height: 1.6;">
                    <strong style="color: #ffffff; font-family: 'Space Grotesk', sans-serif; font-size: 14px; display: block; margin-bottom: 2px;">
                      Conservas el 100% de tus Diamantes y Ganancias
                    </strong>
                    Unirte a CRBX es <strong>100% gratuito</strong>. Nunca te pediremos contraseñas ni te cobraremos ninguna comisión sobre tus directos. Nuestro trabajo es potenciar tu crecimiento.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BOTÓN DE CONTACTO DIRECTO POR WHATSAPP -->
          <tr>
            <td class="mobile-padding" style="padding: 0 32px 28px 32px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto;">
                <tr>
                  <td align="center" style="border-radius: 999px; background: linear-gradient(90deg, #00f2fe 0%, #a855f7 50%, #fe2c55 100%); padding: 2px; box-shadow: 0 6px 20px rgba(254, 44, 85, 0.25);">
                    <a
                      href="https://wa.me/51916753556?text=Hola%20CRBX%2C%20acabo%20de%20enviar%20mi%20postulaci%C3%B3n%20para%20unirme%20a%20la%20agencia"
                      target="_blank"
                      style="display: inline-block; padding: 14px 30px; border-radius: 999px; background-color: #0f172a; color: #ffffff; text-decoration: none; font-family: 'Space Grotesk', 'Inter', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 0.2px;"
                    >
                      💬 Chatear con Reclutamiento por WhatsApp
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 16px 0 0 0; color: #0f172a; font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 700;">
                ¡Nos vemos pronto en los directos!
              </p>
              <p style="margin: 4px 0 0 0; color: #64748b; font-size: 13px;">
                El equipo de reclutamiento de <strong>CRBX Agencia</strong>
              </p>
            </td>
          </tr>

          <!-- FOOTER OFICIAL -->
          <tr>
            <td style="background-color: #f8fafc; padding: 22px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #334155; font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 700;">
                CRBX Agencia • Agencia Oficial de TikTok LIVE
              </p>
              <p style="margin: 6px 0 0 0; color: #64748b; font-size: 12px; line-height: 1.5;">
                Carbe Global Corp SAC • Lima, Perú • WhatsApp: +51 916 753 556
              </p>
              <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 11px;">
                Este correo fue enviado porque completaste el formulario de postulación en crbxagencia.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"CRBX Agencia" <${SMTP_USER}>`,
    to: data.email,
    replyTo: RECIPIENT_EMAIL,
    subject: `¡Hola ${data.nombre}! Recibimos tu postulación para unirte a CRBX Agencia`,
    text: textBody,
    html: htmlBody,
    attachments,
  });
}
