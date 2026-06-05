import { HeroCardParticles } from "./HeroCardParticles";

/** Tarjeta glass del hero con logo ROGA (PNG transparente) y partículas animadas detrás. */
export function HeroGlassCard() {
  return (
    <div
      className="hero-glass-card relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl lg:mx-0 lg:max-w-none"
      aria-label="ROGA — análisis clínicos, chequeo y medicina ocupacional"
    >
      <div className="hero-glass-card__shine pointer-events-none absolute inset-0 z-[1]" />

      <HeroCardParticles className="pointer-events-none absolute inset-0 z-[2] h-full w-full" />

      <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center px-5 sm:px-7">
        <img
          src="/logo-roga-hero.png"
          alt="ROGA"
          width={1024}
          height={915}
          className="hero-glass-card__logo h-auto w-full max-w-[96%] object-contain sm:max-w-[92%]"
          draggable={false}
        />
      </div>
    </div>
  );
}
