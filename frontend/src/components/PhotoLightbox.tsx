import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type PhotoLightboxProps = {
  src: string;
  alt: string;
  objectPosition?: string;
  caption?: string;
  onClose: () => void;
};

export function PhotoLightbox({
  src,
  alt,
  objectPosition = "center center",
  caption,
  onClose,
}: PhotoLightboxProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <button
        type="button"
        className="servicio-overlay-backdrop absolute inset-0 bg-brand-ink/75"
        aria-label="Cerrar imagen ampliada"
        onClick={onClose}
      />
      <figure
        role="dialog"
        aria-modal="true"
        aria-label={alt}
        className="servicio-overlay-card relative z-10 flex max-h-[90vh] max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_48px_rgba(15,23,42,0.25)]"
      >
        <div className="relative min-h-0 flex-1 bg-muted">
          <img
            src={src}
            alt={alt}
            className="max-h-[min(80vh,720px)] w-full object-contain"
            style={{ objectPosition }}
            decoding="async"
          />
        </div>
        {caption ? (
          <figcaption className="border-t border-border px-5 py-3 text-center text-sm font-medium text-foreground">
            {caption}
          </figcaption>
        ) : null}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>
      </figure>
    </div>,
    document.body,
  );
}
