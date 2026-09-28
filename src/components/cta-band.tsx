import { Link } from "@tanstack/react-router";
import { MessageCircle, Send } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="border-t border-border bg-gradient-to-br from-live-cyan/10 via-background to-live-pink/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Empieza a transmitir con CRBX</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/postular"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Send className="size-5" />
            Postular ahora
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 font-semibold hover:bg-secondary"
          >
            <MessageCircle className="size-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
