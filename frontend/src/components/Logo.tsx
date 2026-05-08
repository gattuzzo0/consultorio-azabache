type LogoProps = {
  size?: number;
  color?: string;
  className?: string;
};

/**
 * Marca oficial: estetoscopio en forma de corazón (referencia de marca).
 * — Auriculares: círculos sólidos arriba (hueco entre ellos).
 * — Tubos: dos ramas desde auriculares, curva inferior en U.
 * — Campana: segmento + anillo hueco (solo trazo).
 * — Corazón interior sólido.
 * viewBox 0 0 64 64; mismo dibujo que public/favicon.svg
 */
export function LogoMark({
  size = 36,
  color = "#ffffff",
  className,
}: LogoProps) {
  const sw = 2.5;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <g
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Rama desde auricular izquierdo hasta la curva inferior */}
        <path d="M22.6 15.7C13.8 17.8 8.5 26.5 10.2 34.8c1.6 6.7 7.2 12 13.4 14.4" />
        {/* Rama desde auricular derecho (cruce con la izquierda en la zona baja) */}
        <path d="M41.4 15.7C50.2 17.8 55.5 26.5 53.8 34.8c-1.6 6.7-7.2 12-13.4 14.4" />
        {/* Curva inferior en U */}
        <path d="M23.6 49.2Q32 56.7 40.4 49.2" />
        {/* Tramo hacia la campana */}
        <path d="M40.4 49.2l6.4.38" />
      </g>
      {/* Corazón interior (encima del tubo en la zona central) */}
      <path
        fill={color}
        d="M32 22.6c-4.4-3.1-10.4-1.2-10.4 5.8 0 6.6 10.4 14.8 10.4 14.8s10.4-8.2 10.4-14.8c0-7-6-8.9-10.4-5.8z"
      />
      {/* Auriculares */}
      <circle cx={22.6} cy={12.9} r={2.85} fill={color} />
      <circle cx={41.4} cy={12.9} r={2.85} fill={color} />
      {/* Campana / diafragma (anillo, sin relleno) */}
      <circle
        cx={51.9}
        cy={49.65}
        r={4.35}
        fill="none"
        stroke={color}
        strokeWidth={sw}
      />
    </svg>
  );
}

type WordmarkProps = {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
};

export function Wordmark({ variant = "light", size = "md" }: WordmarkProps) {
  const isDark = variant === "dark";
  const eyebrowColor = isDark ? "#475569" : "rgba(255,255,255,0.7)";
  const titleColor = isDark ? "#0f172a" : "#ffffff";
  const titleSize =
    size === "lg" ? "1.25rem" : size === "sm" ? "0.95rem" : "1.05rem";
  const eyebrowSize = size === "sm" ? "0.65rem" : "0.7rem";
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark
        size={size === "lg" ? 44 : size === "sm" ? 30 : 36}
        color={titleColor}
      />
      <div className="brand-wordmark text-center leading-tight">
        <span
          className="brand-eyebrow"
          style={{ color: eyebrowColor, fontSize: eyebrowSize }}
        >
          Consultorio Médico
        </span>
        <span
          style={{
            color: titleColor,
            fontSize: titleSize,
            display: "block",
            fontWeight: 700,
          }}
        >
          Azabache
        </span>
      </div>
    </div>
  );
}
