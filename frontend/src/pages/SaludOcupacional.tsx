import { Link } from "react-router-dom";
import {
  Activity,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  Megaphone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import {
  SALUD_OCUPACIONAL_BLOQUES,
  SALUD_OCUPACIONAL_INTRO,
  type SaludOcupacionalBloque,
} from "../lib/saludOcupacional";

const BLOQUE_ICONS: Record<
  SaludOcupacionalBloque["id"],
  typeof ClipboardList
> = {
  examenes: ClipboardList,
  vigilancia: Activity,
  deteccion: Stethoscope,
  campanas: Megaphone,
  normativo: ShieldCheck,
  indicadores: BarChart3,
};

function BloqueCard({ bloque, index }: { bloque: SaludOcupacionalBloque; index: number }) {
  const Icon = BLOQUE_ICONS[bloque.id];

  return (
    <article className="rounded-xl border border-border bg-card p-6 shadow-card sm:p-7">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
          <Icon size={22} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="mt-1 text-xl font-semibold text-foreground">
            {bloque.title}
          </h2>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-foreground-soft">
        {bloque.description}
      </p>
      <ul className="mt-4 space-y-2">
        {bloque.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
            <CheckCircle2
              size={16}
              className="mt-0.5 shrink-0 text-primary"
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function SaludOcupacional() {
  return (
    <>
      <section className="border-b border-border bg-muted/50 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              <Building2 size={14} aria-hidden />
              Para empresas
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {SALUD_OCUPACIONAL_INTRO.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-foreground-soft sm:text-lg">
              {SALUD_OCUPACIONAL_INTRO.lead}
            </p>
            <Link
              to="/agendar"
              className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-[var(--primary-hover)]"
            >
              Solicitar información
            </Link>
          </div>
        </div>
      </section>

      <section
        className="bg-background py-14 sm:py-20"
        aria-labelledby="salud-ocupacional-contenido"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="salud-ocupacional-contenido" className="sr-only">
            Cómo ROGA apoya a las empresas
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {SALUD_OCUPACIONAL_BLOQUES.map((bloque, index) => (
              <BloqueCard key={bloque.id} bloque={bloque} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
