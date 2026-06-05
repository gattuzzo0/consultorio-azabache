import { useState } from "react";
import { SERVICIOS, type Servicio } from "../lib/servicios";
import { ServicioCard } from "./ServicioCard";
import { ServicioDetailOverlay } from "./ServicioDetailOverlay";

export function ServiciosSection() {
  const [selected, setSelected] = useState<Servicio | null>(null);

  return (
    <section
      id="servicios"
      className="py-16 sm:py-20 lg:py-24"
      aria-labelledby="servicios-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="servicios-heading"
          className="text-center text-3xl font-bold tracking-tight text-white drop-shadow-sm sm:text-4xl"
        >
          Servicios
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed text-white/90 drop-shadow-sm">
          Estudios, certificaciones y atención clínica para tu salud y
          cumplimiento en medicina ocupacional. Toca un servicio para ver más
          detalles.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {SERVICIOS.map((servicio) => (
            <ServicioCard
              key={servicio.id}
              servicio={servicio}
              onSelect={setSelected}
            />
          ))}
        </ul>
      </div>

      {selected && (
        <ServicioDetailOverlay
          servicio={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
