import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Sparkles } from "lucide-react";
import crbxLogo from "@/assets/crbx-logo.png";
import { navItems } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8 py-3.5 sm:py-4">
        {/* Logo oficial de la agencia a la izquierda */}
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img src={crbxLogo} alt="CRBX" className="h-7 sm:h-8 w-auto object-contain" />
        </Link>

        {/* Botón oficial de Postular con su icono original y menú de 3 líneas */}
        <div className="flex items-center gap-3">
          <Link
            to="/postular"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-live-pink to-live-cyan px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:opacity-95 transition-opacity"
          >
            <Sparkles className="size-3.5 sm:size-4" />
            <span>Postular</span>
          </Link>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center text-foreground hover:opacity-75 transition-opacity"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Menú desplegable limpio y minimalista: sin recuadros de invitación, sin iconos ni frases genéricas */}
      {open && (
        <div className="bg-background/98 backdrop-blur-lg px-6 py-6 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="mx-auto max-w-6xl">
            <nav>
              <ul className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      activeOptions={{ exact: true }}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-lg font-display font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors"
                      activeProps={{ className: "text-foreground font-bold bg-secondary/50" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
