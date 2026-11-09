import { createFileRoute } from "@tanstack/react-router";
import { AcademiaPrivadaPage } from "./academia-privada";

export const Route = createFileRoute("/cursos")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: (search["token"] as string) || (search["invitacion"] as string) || "",
    email: (search["email"] as string) || "",
  }),
  head: () => ({
    meta: [
      { title: "Academia de Creadores y Documentos — CRBX TikTok LIVE" },
      {
        name: "description",
        content:
          "Documentos, manuales y recursos oficiales para creadores de TikTok LIVE en la agencia CRBX.",
      },
    ],
  }),
  component: AcademiaPrivadaPage,
});
