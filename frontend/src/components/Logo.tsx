/** Dimensiones originales del logo ROGA (516 × 257 px, RGBA transparente). */
const ROGA_W = 516;
const ROGA_H = 257;
const ROGA_RATIO = ROGA_W / ROGA_H; // ≈ 2.01

type LogoMarkProps = {
  /** Altura en px; el ancho se ajusta automáticamente (ratio 516:257). */
  height?: number;
  /** Alias para compatibilidad con llamadas antiguas que pasaban `size`. */
  size?: number;
  /** Ignorado — el logo tiene su propio color naranja. Mantenido por compatibilidad. */
  color?: string;
  className?: string;
};

/** Logo ROGA completo (naranja, fondo transparente). */
export function LogoMark({ height, size, className }: LogoMarkProps) {
  const h = height ?? size ?? 36;
  const w = Math.round(h * ROGA_RATIO);
  return (
    <img
      src="/logo-roga.svg"
      alt="ROGA"
      width={w}
      height={h}
      className={className}
      draggable={false}
    />
  );
}

type WordmarkProps = {
  /** "light" = sobre fondo oscuro (header), "dark" = sobre fondo claro. Ambos muestran el mismo logo naranja con fondo transparente. */
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
};

/** Wordmark para la barra de navegación. El logo ROGA ya incluye el nombre. */
export function Wordmark({ size = "md" }: WordmarkProps) {
  const heights = { sm: 28, md: 36, lg: 48 };
  const h = heights[size];
  const w = Math.round(h * ROGA_RATIO);
  return (
    <img
      src="/logo-roga.svg"
      alt="ROGA"
      width={w}
      height={h}
      className="shrink-0"
      draggable={false}
    />
  );
}
