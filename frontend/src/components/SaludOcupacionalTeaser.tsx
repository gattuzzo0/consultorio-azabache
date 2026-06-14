import { Link } from "react-router-dom";
import { ArrowRight, Building2 } from "lucide-react";
import { SALUD_OCUPACIONAL_INTRO } from "../lib/saludOcupacional";

export function SaludOcupacionalTeaser() {
  return (
    <section
      className="pb-16 sm:pb-20 lg:pb-24"
      aria-labelledby="salud-ocupacional-teaser-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="salud-ocupacional-teaser mx-auto max-w-3xl rounded-2xl border border-white/10 px-6 py-10 text-center sm:px-10 sm:py-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Building2 size={14} aria-hidden />
            Para empresas
          </span>
          <h2
            id="salud-ocupacional-teaser-heading"
            className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Tu aliado en salud ocupacional
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
            {SALUD_OCUPACIONAL_INTRO.lead}
          </p>
          <p className="mt-3 text-base leading-relaxed text-white/75 sm:text-lg">
            También contamos con expedición de certificados médicos para
            trámites laborales, escolares y administrativos de tu empresa.
          </p>
          <Link
            to="/salud-ocupacional"
            className="hero-btn-primary mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-md transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
          >
            Conocer salud ocupacional
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
