import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { Servicio } from "../lib/servicios";
import { ServicioIcon } from "./ServicioIcon";

type ServicioDetailOverlayProps = {
  servicio: Servicio;
  onClose: () => void;
};

export function ServicioDetailOverlay({
  servicio,
  onClose,
}: ServicioDetailOverlayProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="servicio-overlay-backdrop absolute inset-0 bg-brand-ink/65"
        aria-label="Cerrar detalle del servicio"
        onClick={onClose}
      />
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="servicio-overlay-card relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_48px_rgba(15,23,42,0.18)]"
      >
        {/* Imagen de servicio */}
        <div className="relative h-44 w-full overflow-hidden bg-muted sm:h-52">
          <img
            src={servicio.imageSrc}
            alt={servicio.name}
            className="h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="flex items-start gap-4 border-b border-border bg-muted/60 p-5 sm:p-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
            <ServicioIcon icon={servicio.icon} size={24} />
          </span>
          <div className="min-w-0 flex-1 pr-8">
            <h3
              id={titleId}
              className="text-lg font-semibold leading-snug text-foreground"
            >
              {servicio.name}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-foreground backdrop-blur-sm transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <p className="text-sm leading-relaxed text-foreground-soft">
            {servicio.description}
          </p>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Costo estimado
            </p>
            <ul className="mt-3 space-y-2">
              {servicio.prices.map((price) => (
                <li
                  key={price.label ?? price.range}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border bg-muted/40 px-4 py-3"
                >
                  {price.label ? (
                    <span className="text-sm text-foreground-soft">
                      {price.label}
                    </span>
                  ) : (
                    <span className="text-sm text-foreground-soft">
                      Precio
                    </span>
                  )}
                  <span className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
                    {price.range}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Los precios pueden variar según el estudio solicitado. Consulta
              disponibilidad al agendar.
            </p>
          </div>
        </div>
      </article>
    </div>,
    document.body,
  );
}
