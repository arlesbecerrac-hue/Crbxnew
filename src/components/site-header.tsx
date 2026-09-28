import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Sparkles } from "lucide-react";
import crbxLogo from "@/assets/crbx-logo.png";
import { navItems } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group" onClick={() => setOpen(false)}>
          <img
            src={crbxLogo}
            alt="Logo de CRBX"
            className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight">CRBX</span>
        </Link>

        {/* Menú de navegación en escritorio */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Acceso directo a la izquierda del botón de menú */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/postular"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-live-cyan via-purple-600 to-live-pink px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-white shadow-md shadow-live-pink/20 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="size-3.5 sm:size-4 fill-white/20" />
            <span>Postular</span>
          </Link>

          {/* Botón hamburguesa para móviles y tablets */}
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 sm:size-10 place-items-center rounded-full border border-border bg-card/60 text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-6 py-4 lg:hidden">
          <ul className="space-y-1">
            {[...navItems, { label: "Postular", to: "/postular" as const }].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: true }}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground hover:bg-secondary"
                  activeProps={{ className: "bg-secondary text-foreground" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
