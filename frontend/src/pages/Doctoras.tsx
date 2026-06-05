import { DoctorCard } from "../components/DoctorCard";
import { DOCTORS } from "../lib/doctors";

export function Doctoras() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nuestro equipo
          </h1>
          <p className="mt-3 text-base leading-relaxed text-foreground-soft">
            Profesionales especializados en análisis clínicos y medicina
            ocupacional. Conoce al equipo que cuida tu salud.
          </p>
        </header>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {DOCTORS.map((d) => (
            <DoctorCard key={d.id} doctor={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
