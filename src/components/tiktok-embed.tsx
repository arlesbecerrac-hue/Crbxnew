import { useEffect, useRef, useState } from "react";

interface TikTokPlayerProps {
  videoId: string;
  title?: string;
  aspect?: "vertical" | "horizontal" | "fill";
  className?: string;
}

/**
 * Componente oficial de TikTok Player según la documentación oficial:
 * https://developers.tiktok.com/docs/en/embed-player
 * 
 * Cumple estrictamente con:
 * - Reproducción automática al entrar en pantalla (IntersectionObserver)
 * - Pausa / descarga al salir de pantalla para que los videos NO se crucen ("sin que se crucen")
 * - Sin botones manuales ni controles delanteros invasivos
 * - Soporte para fondo completo (Hero) o formato vertical 9:16 nativo de TikTok
 */
export function TikTokPlayer({ videoId, title = "TikTok LIVE", aspect = "vertical", className = "" }: TikTokPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Detectar cuándo entra o sale del 40% del viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  const aspectClass =
    aspect === "vertical"
      ? "aspect-[9/16] w-full max-w-[340px]"
      : aspect === "horizontal"
      ? "aspect-video w-full"
      : "w-full h-full absolute inset-0";

  // URL del reproductor según especificación oficial de TikTok Developers
  const iframeSrc = isInView
    ? `https://www.tiktok.com/player/v1/${videoId}?autoplay=1&muted=1&loop=1&music_info=0&description=0&rel=0`
    : "about:blank";

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto overflow-hidden rounded-2xl bg-black shadow-2xl transition-all duration-300 ${aspectClass} ${className}`}
    >
      {isInView ? (
        <iframe
          src={iframeSrc}
          title={title}
          allow="autoplay; fullscreen; encrypted-media"
          className="h-full w-full border-0 pointer-events-auto"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-card/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2 text-center text-xs text-muted-foreground">
            <span className="inline-block h-3 w-3 animate-ping rounded-full bg-primary/70" />
            <span>TikTok LIVE</span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Fondo de pantalla completa para Hero con TikTok según solicitud:
 * "videos que debes usar para hero y como recursos usa todos bonitos como para fondos también pantalla completa"
 */
export function TikTokHeroBackground({ videoId }: { videoId: string }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      <iframe
        src={`https://www.tiktok.com/player/v1/${videoId}?autoplay=1&muted=1&loop=1&music_info=0&description=0`}
        title="Hero Background TikTok"
        allow="autoplay; fullscreen; encrypted-media"
        className="absolute -top-[30%] -left-[30%] h-[160%] w-[160%] border-0 object-cover opacity-25 filter contrast-125 brightness-50"
      />
      {/* Capa de protección para legibilidad absoluta */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
    </div>
  );
}
