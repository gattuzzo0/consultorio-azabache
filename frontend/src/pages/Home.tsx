import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { AnimatedContent } from "../components/AnimatedContent";
import { HeroGlassCard } from "../components/HeroGlassCard";
import { PaquetesCarousel } from "../components/PaquetesCarousel";
import { ParticlesBand } from "../components/ParticlesBand";
import { ServiciosSection } from "../components/ServiciosSection";
import { SaludOcupacionalTeaser } from "../components/SaludOcupacionalTeaser";

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
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <AnimatedContent
                className="w-full sm:flex-1"
                distance={150}
                direction="horizontal"
                reverse
                duration={2.0}
                ease="bounce.out"
                initialOpacity={0.0}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.1}
              >
                <Link
                  to="/agendar"
                  className="hero-btn-primary inline-flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-md transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
                >
                  Agendar Consulta Médica
                </Link>
              </AnimatedContent>
              <AnimatedContent
                className="w-full sm:flex-1"
                distance={150}
                direction="horizontal"
                duration={2.0}
                ease="bounce.out"
                initialOpacity={0.0}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.25}
              >
                <a
                  href="#paquetes"
                  className="hero-btn-outline inline-flex w-full items-center justify-center rounded-lg border-2 px-6 py-3 text-sm font-semibold transition-colors hover:bg-[rgba(212,109,49,0.12)]"
                >
                  Consultar paquetes
                </a>
              </AnimatedContent>
            </div>
            <div className="mt-6 flex w-full justify-center">
              <Link
                to="/ubicacion"
                className="hero-learn-more inline-flex w-fit items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
              >
                <MapPin size={15} aria-hidden />
                Ver ubicación
              </Link>
            </div>
          </div>

          <div className="hero-visual-wrap order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
            <div className="hero-visual-wrap__glow" aria-hidden />
            <HeroGlassCard />
          </div>
        </div>
      </section>

      <ParticlesBand>
        <PaquetesCarousel />

        <ServiciosSection />

        <SaludOcupacionalTeaser />
      </ParticlesBand>
    </div>
  );
}
