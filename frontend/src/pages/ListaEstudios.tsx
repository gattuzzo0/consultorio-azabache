import { Helmet } from "react-helmet-async";
import { ClipboardList, FlaskConical } from "lucide-react";
import {
  LISTA_ESTUDIOS_CATEGORIAS,
  LISTA_ESTUDIOS_TOTAL,
} from "../lib/listaEstudios";
import { LISTA_ESTUDIOS_WHATSAPP_URL } from "../lib/contactWhatsApp";
import { openWhatsApp } from "../lib/openWhatsApp";

const PAGE_TITLE = "Lista completa de estudios | ROGA Laboratorio";
const PAGE_DESCRIPTION =
  "Catálogo de estudios de laboratorio clínico en ROGA: hematología, química, hormonas, microbiología, parasitología, inmunología y orina.";

const WHATSAPP_URL = LISTA_ESTUDIOS_WHATSAPP_URL;

function categoriaAnchorId(id: string): string {
  return `categoria-${id}`;
}

export function ListaEstudios() {
  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
      </Helmet>

      <section className="border-b border-border bg-muted/50 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              <FlaskConical size={14} aria-hidden />
              Laboratorio clínico
            </span>
            <h1 className="font-display mt-4 text-3xl tracking-tight text-foreground sm:text-4xl">
              Lista completa de estudios
            </h1>
            <p className="mt-4 text-base leading-relaxed text-foreground-soft sm:text-lg">
              Más de {LISTA_ESTUDIOS_TOTAL} pruebas disponibles. Solicita cotización
              o agenda tu cita para indicarte el estudio adecuado según tu
              requerimiento médico u ocupacional.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Categorías de estudios"
            className="mb-10 rounded-xl border border-border bg-card p-4 shadow-card sm:p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Ir a categoría
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {LISTA_ESTUDIOS_CATEGORIAS.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#${categoriaAnchorId(cat.id)}`}
                    className="inline-flex rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent"
                  >
                    {cat.title}
                    <span className="ml-1.5 text-muted-foreground">
                      ({cat.estudios.length})
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-8">
            {LISTA_ESTUDIOS_CATEGORIAS.map((cat) => (
              <article
                key={cat.id}
                id={categoriaAnchorId(cat.id)}
                className="scroll-mt-24 rounded-xl border border-border bg-card p-6 shadow-card sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                    <ClipboardList size={22} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                      {cat.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {cat.estudios.length} estudios
                    </p>
                  </div>
                </div>
                <ul className="mt-5 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
                  {cat.estudios.map((estudio) => (
                    <li
                      key={estudio}
                      className="mb-2 break-inside-avoid text-sm leading-relaxed text-foreground"
                    >
                      {estudio}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            ¿No encuentras el estudio que necesitas?{" "}
            <a
              href={WHATSAPP_URL}
              className="cursor-pointer font-medium text-primary underline-offset-2 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                openWhatsApp(WHATSAPP_URL);
              }}
            >
              Contáctanos
            </a>{" "}
            y te orientamos.
          </p>
        </div>
      </section>
    </>
  );
}
