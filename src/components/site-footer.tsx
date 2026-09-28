import { Link } from "@tanstack/react-router";
import crbxLogo from "@/assets/crbx-logo.png";
import { navItems, EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={crbxLogo}
              alt="CRBX"
              className="h-9 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="font-display font-bold">CRBX</p>
              <p className="text-xs text-muted-foreground">Agencia de TikTok LIVE — Lima, Perú</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Convertimos el talento de los creadores latinos en una fuente de ingresos real a través de TikTok LIVE.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Páginas</p>
          <ul className="mt-4 grid grid-cols-2 gap-2.5">
            {[...navItems, { label: "Postular", to: "/postular" as const }].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="text-sm font-semibold text-foreground">Contacto</p>
          <div className="mt-4 space-y-2.5">
            <p className="font-medium text-foreground">Carbe Global Corp SAC</p>
            <p>RUC 20616178769</p>
            <p>
              <a href={`mailto:${EMAIL}`} className="hover:text-foreground">{EMAIL}</a>
            </p>
            <p>
              <a href={PHONE_TEL} className="hover:text-foreground">{PHONE_DISPLAY}</a>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-muted-foreground">
          © 2026 Carbe Global Corp SAC. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
