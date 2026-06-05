import type { ReactNode } from "react";
import { ParticleBackground } from "./ParticleBackground";

type ParticlesBandProps = {
  children: ReactNode;
};

/** Banda oscura con red de partículas sutil (equipo + servicios en inicio). */
export function ParticlesBand({ children }: ParticlesBandProps) {
  return (
    <div className="particles-band">
      <ParticleBackground className="particles-band__canvas" />
      {children}
    </div>
  );
}
