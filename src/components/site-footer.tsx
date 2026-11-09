import { Link } from "@tanstack/react-router";
import crbxLogo from "@/assets/crbx-logo.png";
import carbeGlobalLogo from "@/assets/carbe-global-logo.png";
import { navItems, EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        {/* Columna 1: Marca principal CRBX */}
        <div>
          <img src={crbxLogo} alt="CRBX" className="h-11 sm:h-12 w-auto object-contain" />
          <p className="mt-3 text-xs text-muted-foreground font-medium">
            Agencia de TikTok LIVE — Lima, Perú
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Convertimos el talento de los creadores latinos en una fuente de ingresos real a través
            de TikTok LIVE.
          </p>
        </div>

        {/* Columna 2: Navegación */}
        <div>
          <p className="text-sm font-semibold">Páginas</p>
          <ul className="mt-4 grid grid-cols-2 gap-2.5">
            {[...navItems, { label: "Postular", to: "/postular" as const }].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3: Empresa y Contacto */}
        <div className="text-sm text-muted-foreground">
          <p className="text-sm font-semibold text-foreground">Empresa y Contacto</p>
          <div className="mt-4 space-y-2.5">
            <div>
              <p className="font-semibold text-foreground text-sm leading-tight">
                Carbe Global Corp SAC
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">RUC 20616178769</p>
            </div>
            <p>
              <a href={`mailto:${EMAIL}`} className="hover:text-foreground transition-colors">
                {EMAIL}
              </a>
            </p>
            <p>
              <a href={PHONE_TEL} className="hover:text-foreground transition-colors">
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Franja institucional centrada limpia (un solo logo, centrado y sin marcos/cuadros) */}
      <div className="border-t border-border/60 py-8 px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
          <img
            src={carbeGlobalLogo}
            alt="Logo oficial Carbe Global Corp SAC"
            className="h-20 sm:h-24 w-auto max-w-[260px] object-contain mb-3"
          />
          <p className="font-display font-bold text-foreground text-base sm:text-lg tracking-tight">
            Carbe Global Corp SAC
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-md">
            RUC 20616178769 • Operador oficial de CRBX TikTok LIVE Agency
          </p>
        </div>
      </div>

      {/* Barra inferior con derechos */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-5 text-xs text-muted-foreground text-center">
          <p>© 2026 Carbe Global Corp SAC. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
