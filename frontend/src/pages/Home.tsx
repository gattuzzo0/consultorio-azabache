import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { DoctorCard } from "../components/DoctorCard";
import { HeroGlassCard } from "../components/HeroGlassCard";
import { ParticlesBand } from "../components/ParticlesBand";
import { ServiciosSection } from "../components/ServiciosSection";
import { DOCTORS } from "../lib/doctors";

export function Home() {
  return (
    <div className="home-dark-surface">
      <section className="hero-section text-white">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-24">
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <h1 className="display-heading text-4xl leading-[1.08] sm:text-5xl lg:text-[3.25rem]">
              <span className="block font-serif text-[#f5f5f5]">
                En un solo lugar
              </span>
              <span className="hero-gradient-text mt-1 block text-[2rem] sm:text-[2.65rem] lg:text-[3rem]">
                análisis clínicos y consulta médica
              </span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
              Laboratorio especializado en análisis clínicos y medicina
              ocupacional, con un equipo comprometido con tu salud y bienestar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/agendar"
                className="hero-btn-primary inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-md transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
              >
                Agendar Consulta Médica
              </Link>
              <Link
                to="/ubicacion"
                className="hero-btn-outline inline-flex items-center justify-center gap-2 rounded-lg border-2 px-6 py-3 text-sm font-semibold transition-colors hover:bg-[rgba(212,109,49,0.12)]"
              >
                <MapPin size={16} />
                Ver ubicación
              </Link>
            </div>
            <Link
              to="/#servicios"
              className="hero-learn-more mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
            >
              Conocer más
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>

          <div className="hero-visual-wrap order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
            <div className="hero-visual-wrap__glow" aria-hidden />
            <HeroGlassCard />
          </div>
        </div>
      </section>

      <ParticlesBand>
        <section
          id="doctoras"
          className="team-section py-16 sm:py-20 lg:py-24"
          aria-labelledby="doctoras-heading"
        >
          <div className="team-section__ambient" aria-hidden />
          <div className="team-section__inner mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
              id="doctoras-heading"
              className="team-section__heading text-center text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Nuestro equipo
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
              {DOCTORS.map((d) => (
                <DoctorCard key={d.id} doctor={d} appearance="premium-dark" />
              ))}
            </div>
          </div>
        </section>

        <ServiciosSection />
      </ParticlesBand>
    </div>
  );
}
