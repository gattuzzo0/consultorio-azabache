import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Error 404
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Página no encontrada
        </h1>
        <p className="mt-4 text-base text-foreground-soft">
          La página que buscas no existe o fue movida.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-[var(--primary-hover)]"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
