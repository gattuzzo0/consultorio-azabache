type HeroMoleculeProps = {
  className?: string;
  /** Variante de forma (hexágono simple, anillo benceno, cadena corta). */
  variant?: 0 | 1 | 2;
};

const VARIANTS = [
  // Hexágono aromático con un sustituyente
  (
    <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round">
      <polygon points="40,12 58,22 58,42 40,52 22,42 22,22" />
      <circle cx="40" cy="32" r="3" fill="currentColor" stroke="none" opacity="0.5" />
      <line x1="58" y1="22" x2="72" y2="14" />
      <line x1="72" y1="14" x2="78" y2="22" />
    </g>
  ),
  // Anillo + ramificación
  (
    <g stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round">
      <polygon points="36,18 50,26 50,42 36,50 22,42 22,26" />
      <line x1="50" y1="26" x2="64" y2="18" />
      <line x1="22" y1="42" x2="8" y2="50" />
      <line x1="8" y1="50" x2="4" y2="62" />
    </g>
  ),
  // Cadena lineal con nudos
  (
    <g stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round">
      <line x1="10" y1="40" x2="30" y2="32" />
      <line x1="30" y1="32" x2="50" y2="40" />
      <line x1="50" y1="40" x2="70" y2="28" />
      <circle cx="30" cy="32" r="4" />
      <circle cx="50" cy="40" r="4" />
      <polygon points="62,16 74,22 74,36 62,42 50,36 50,22" opacity="0.9" />
    </g>
  ),
];

/** Molécula decorativa estilo química orgánica con brillo naranja. */
export function HeroMolecule({ className, variant = 0 }: HeroMoleculeProps) {
  return (
    <svg
      viewBox="0 0 80 64"
      className={className}
      aria-hidden
      fill="none"
    >
      {VARIANTS[variant]}
    </svg>
  );
}
