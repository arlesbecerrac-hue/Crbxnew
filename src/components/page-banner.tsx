import heroBg from "@/assets/hero-bg.jpg";

export function PageBanner({ label }: { label: string }) {
  return (
    <div className="relative overflow-hidden border-b border-border">
      <img src={heroBg} alt="" width={1920} height={1088} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background/90" />
      <div className="relative mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          <span className="bg-gradient-to-r from-live-cyan to-live-pink bg-clip-text text-transparent">{label}</span>
        </h1>
      </div>
    </div>
  );
}
