import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAQUETES, type Paquete } from "../lib/paquetes";

const INTERVAL_MS = 5000;

type PaqueteSlideProps = {
  paquete: Paquete;
  isActive: boolean;
};

function PaqueteSlide({ paquete, isActive }: PaqueteSlideProps) {
  return (
    <article
      className={[
        "paquete-slide",
        isActive ? "paquete-slide--active" : "paquete-slide--hidden",
      ].join(" ")}
      aria-hidden={!isActive}
    >
      <div className="paquete-slide__image-wrap">
        <img
          src={paquete.imageSrc}
          alt={paquete.imageAlt}
          className="paquete-slide__image"
          loading={isActive ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <div className="paquete-slide__body">
        <h3 className="paquete-slide__title">{paquete.title}</h3>
        <ul className="paquete-slide__list">
          {paquete.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {(paquete.price || paquete.discount) && (
          <p className="paquete-slide__price">
            {paquete.price ?? paquete.discount}
          </p>
        )}
      </div>
    </article>
  );
}

export function PaquetesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = PAQUETES.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(goNext, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [goNext, paused]);

  return (
    <section
      id="paquetes"
      className="paquetes-section py-16 sm:py-20 lg:py-24"
      aria-labelledby="paquetes-heading"
      aria-roledescription="carrusel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="paquetes-section__ambient" aria-hidden />
      <div className="paquetes-section__inner mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="paquetes-heading"
          className="paquetes-section__heading text-center text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Paquetes promocionales
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed text-white/70">
          Promociones semanales y chequeos integrales para cuidar tu salud.
        </p>

        <div className="paquetes-carousel mt-10">
          <div
            className="paquetes-carousel__viewport"
            aria-live="polite"
            aria-atomic="true"
          >
            {PAQUETES.map((paquete, index) => (
              <PaqueteSlide
                key={paquete.id}
                paquete={paquete}
                isActive={index === activeIndex}
              />
            ))}
          </div>

          <div className="paquetes-carousel__controls">
            <button
              type="button"
              className="paquetes-carousel__nav"
              onClick={goPrev}
              aria-label="Paquete anterior"
            >
              <ChevronLeft size={22} />
            </button>

            <div
              className="paquetes-carousel__dots"
              role="tablist"
              aria-label="Seleccionar paquete"
            >
              {PAQUETES.map((paquete, index) => (
                <button
                  key={paquete.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`${paquete.title}, paquete ${index + 1} de ${total}`}
                  className={[
                    "paquetes-carousel__dot",
                    index === activeIndex ? "paquetes-carousel__dot--active" : "",
                  ].join(" ")}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>

            <button
              type="button"
              className="paquetes-carousel__nav"
              onClick={goNext}
              aria-label="Paquete siguiente"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
