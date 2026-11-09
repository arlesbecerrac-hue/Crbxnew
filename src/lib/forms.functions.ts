import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sendMail, sendPostulacionConfirmationToApplicant } from "./mail.server";

const base = {
  nombre: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  email: z.string().trim().email("Ingresa un correo electrónico válido").max(255),
  telefono: z.string().trim().min(6, "Ingresa un número de teléfono válido").max(50),
};

export const contactoSchema = z.object({
  ...base,
  motivo: z.string().trim().min(2).max(100),
  empresa: z.string().trim().max(100).optional().default(""),
  canalRespuesta: z.string().trim().max(50).optional().default("WhatsApp"),
  asunto: z.string().trim().min(2).max(150),
  mensaje: z.string().trim().min(5).max(3000),
});

export const postularSchema = z.object({
  ...base,
  pais: z.string().trim().min(2, "Ingresa tu país").max(100),
  edad: z.string().trim().min(1, "Ingresa tu edad").max(10),
  tiktok: z.string().trim().min(1, "Ingresa tu usuario de TikTok").max(200),
  seguidores: z.string().trim().max(100).optional().default(""),
  experiencia: z.string().trim().max(200).optional().default(""),
  categoria: z.string().trim().max(2000).optional().default(""),
  disponibilidad: z.string().trim().max(200).optional().default(""),
  mensaje: z.string().trim().max(5000).optional().default(""),
});

export const enviarContacto = createServerFn({ method: "POST" })
  .inputValidator((d) => contactoSchema.parse(d))
  .handler(async ({ data }) => {
    await sendMail({
      subject: `[Contacto CRBX] ${data.motivo}: ${data.asunto}`,
      replyTo: data.email,
      fields: {
        "Motivo de Contacto": data.motivo,
        Nombre: data.nombre,
        Correo: data.email,
        "Teléfono / WhatsApp": data.telefono,
        "Empresa u Organización": data.empresa || "Particular / No especificado",
        "Medio de respuesta preferido": data.canalRespuesta || "WhatsApp",
        Asunto: data.asunto,
        Mensaje: data.mensaje,
      },
    });
    return { ok: true };
  });

export const enviarPostulacion = createServerFn({ method: "POST" })
  .inputValidator((d) => postularSchema.parse(d))
  .handler(async ({ data }) => {
    await sendMail({
      subject: `Nueva postulación creador CRBX: ${data.nombre}`,
      replyTo: data.email,
      fields: {
        Nombre: data.nombre,
        Correo: data.email,
        "Teléfono / WhatsApp": data.telefono,
        País: data.pais,
        Edad: data.edad,
        "Perfil TikTok": data.tiktok,
        Seguidores: data.seguidores || "No especificado",
        "Experiencia en LIVE": data.experiencia || "No especificado",
        "Categoría de contenido": data.categoria || "No especificado",
        "Disponibilidad mensual": data.disponibilidad || "No especificado",
        Mensaje: data.mensaje || "Sin mensaje adicional",
      },
    });

    // Enviar correo oficial de confirmación al postulante en formato claro con sus datos reales
    try {
      await sendPostulacionConfirmationToApplicant({
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        tiktok: data.tiktok,
        pais: data.pais,
      });
    } catch (e) {
      console.error("Error enviando confirmación al postulante:", e);
    }

    return {
      ok: true,
      datos: {
        nombre: data.nombre,
        tiktok: data.tiktok,
        telefono: data.telefono,
        email: data.email,
      },
    };
  });
