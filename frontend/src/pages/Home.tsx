import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { LogoMark } from "../components/Logo";
import { DoctorCard } from "../components/DoctorCard";
import { DOCTORS } from "../lib/doctors";

export function Home() {
  return (
    <>
      <section className="bg-brand-ink text-white">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div className="flex flex-col justify-center">
            <h1 className="display-heading text-4xl text-white sm:text-5xl lg:text-[3.5rem]">
              Atención médica
              <br />
              general para toda
              <br />
              la familia
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">
              Somos un consultorio médico con 3 doctoras especializadas en
              medicina general, comprometidas con tu salud y bienestar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/agendar"
                className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-[var(--primary-hover)]"
              >
                Agendar cita
              </Link>
              <Link
                to="/ubicacion"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MapPin size={16} />
                Ver ubicación
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="hero-art relative aspect-[5/4] w-full overflow-hidden rounded-2xl shadow-2xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 py-8 text-center sm:px-6">
                <LogoMark
                  size={112}
                  color="#ffffff"
                  className="hero-logo-image max-w-full shrink-0"
                />
                {/* Misma proporción que Wordmark md (0.7rem / 1.05rem): ×2 en base, ×~2.14 en sm */}
                <div className="brand-wordmark leading-tight">
                  <span className="block font-medium tracking-[0.04em] text-[1.4rem] text-white/70 sm:text-[1.5rem]">
                    Consultorio Médico
                  </span>
                  <span className="block text-[2.1rem] font-bold text-white sm:text-[2.25rem]">
                    Azabache
                  </span>
                </div>
              </div>
              {/* Mostrador / piso al frente */}
              <div className="hero-art-floor absolute inset-x-0 bottom-0 h-[28%] border-t border-white/10" />
              <div className="absolute inset-x-12 bottom-[12%] h-2 rounded-full bg-white/15" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="doctoras"
        className="bg-background py-16 sm:py-20 lg:py-24"
        aria-labelledby="doctoras-heading"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="doctoras-heading"
            className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Nuestras doctoras
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
            {DOCTORS.map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
