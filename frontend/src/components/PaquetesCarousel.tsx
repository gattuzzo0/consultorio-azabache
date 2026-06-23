import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MAX_PAQUETE_LIST_ITEMS, PAQUETES, type Paquete } from "../lib/paquetes";

const INTERVAL_MS = 5000;
const SWIPE_THRESHOLD_PX = 60;
const SWIPE_HORIZONTAL_RATIO = 2;
const SWIPE_AXIS_LOCK_PX = 10;

type ListSlot = { text: string | null; id: string };

function centeredListSlots(items: readonly string[], maxItems: number): ListSlot[] {
  const padTotal = maxItems - items.length;
  const padBefore = Math.floor(padTotal / 2);
  const slots: ListSlot[] = [];

  for (let i = 0; i < padBefore; i += 1) {
    slots.push({ text: null, id: `pad-before-${i}` });
  }
  for (const text of items) {
    slots.push({ text, id: text });
  }
  for (let i = 0; i < padTotal - padBefore; i += 1) {
    slots.push({ text: null, id: `pad-after-${i}` });
  }

  return slots;
}

type SwipeStart = { x: number; y: number };
type SwipeAxis = "horizontal" | "vertical" | null;

type PaqueteSlideProps = {
  paquete: Paquete;
  isActive: boolean;
  dragOffset?: number;
  isSwiping?: boolean;
};

function PaqueteSlide({
  paquete,
  isActive,
  dragOffset = 0,
  isSwiping = false,
}: PaqueteSlideProps) {
  const priceLabel = paquete.price ?? paquete.discount;

  return (
    <article
      className={[
        "paquete-slide",
        isActive ? "paquete-slide--active" : "paquete-slide--hidden",
        isActive && isSwiping ? "paquete-slide--swiping" : "",
      ].join(" ")}
      aria-hidden={!isActive}
      style={
        isActive && dragOffset !== 0
          ? { transform: `translateX(${dragOffset}px)` }
          : undefined
      }
    >
      <div className="paquete-slide__image-wrap">
        <img
          src={paquete.imageSrc}
          alt={paquete.imageAlt}
          className="paquete-slide__image"
          loading={isActive ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
        />
      </div>
      <div className="paquete-slide__body">
        <h3 className="paquete-slide__title">{paquete.title}</h3>
        <ul className="paquete-slide__list">
          {centeredListSlots(paquete.items, MAX_PAQUETE_LIST_ITEMS).map(
            (slot) => (
              <li
                key={`${paquete.id}-${slot.id}`}
                className={
                  slot.text ? undefined : "paquete-slide__list-item--placeholder"
                }
                aria-hidden={!slot.text}
              >
                {slot.text ?? "\u00a0"}
              </li>
            ),
          )}
        </ul>
        <div className="paquete-slide__footer">
          {priceLabel ? (
            <p className="paquete-slide__price">{priceLabel}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function PaquetesCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const swipeStartRef = useRef<SwipeStart | null>(null);
  const swipeAxisRef = useRef<SwipeAxis>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [gesturePaused, setGesturePaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const total = PAQUETES.length;
  const paused = hoverPaused || gesturePaused;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index % total + total) % total);
    },
    [total],
  );

  const goNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((index) => (index - 1 + total) % total);
  }, [total]);

  const resetSwipe = useCallback(() => {
    swipeStartRef.current = null;
    swipeAxisRef.current = null;
    setDragOffset(0);
    setIsSwiping(false);
    setGesturePaused(false);
  }, []);

  const finishSwipe = useCallback(
    (deltaX: number, deltaY: number) => {
      swipeStartRef.current = null;
      swipeAxisRef.current = null;
      setDragOffset(0);
      setIsSwiping(false);
      setGesturePaused(false);

      const isValidSwipe =
        Math.abs(deltaX) >= SWIPE_THRESHOLD_PX &&
        Math.abs(deltaX) >= Math.abs(deltaY) * SWIPE_HORIZONTAL_RATIO;

      if (!isValidSwipe) return;

      if (deltaX > 0) goPrev();
      else goNext();
    },
    [goNext, goPrev],
  );

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) {
      resetSwipe();
      return;
    }

    const touch = event.touches[0];
    swipeStartRef.current = { x: touch.clientX, y: touch.clientY };
    swipeAxisRef.current = null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (swipeAxisRef.current === "vertical") {
      resetSwipe();
      return;
    }

    const start = swipeStartRef.current;
    if (!start) return;

    const touch = event.changedTouches[0];
    finishSwipe(
      touch.clientX - start.x,
      touch.clientY - start.y,
    );
  };

  const handleTouchCancel = () => {
    resetSwipe();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleTouchMove = (event: TouchEvent) => {
      const start = swipeStartRef.current;
      if (!start || event.touches.length !== 1) return;

      const touch = event.touches[0];
      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;

      if (swipeAxisRef.current === "vertical") return;

      if (swipeAxisRef.current === null) {
        const travel = Math.max(Math.abs(deltaX), Math.abs(deltaY));
        if (travel < SWIPE_AXIS_LOCK_PX) return;

        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          swipeAxisRef.current = "vertical";
          return;
        }

        swipeAxisRef.current = "horizontal";
        setIsSwiping(true);
        setGesturePaused(true);
      }

      if (swipeAxisRef.current !== "horizontal") return;

      event.preventDefault();
      setDragOffset(deltaX);
    };

    viewport.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => viewport.removeEventListener("touchmove", handleTouchMove);
  }, []);

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
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setHoverPaused(true)}
      onBlurCapture={() => setHoverPaused(false)}
    >
      <div className="paquetes-section__ambient" aria-hidden />
      <div className="paquetes-section__inner mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="paquetes-heading"
          className="paquetes-section__heading text-center text-3xl tracking-tight sm:text-4xl"
        >
          Paquetes promocionales
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed text-white/70">
          Promociones semanales y chequeos integrales para cuidar tu salud.
        </p>

        <div className="paquetes-carousel mt-10">
          <div
            ref={viewportRef}
            className={[
              "paquetes-carousel__viewport",
              isSwiping ? "paquetes-carousel__viewport--swiping" : "",
            ].join(" ")}
            aria-live="polite"
            aria-atomic="true"
            tabIndex={0}
            role="region"
            aria-label="Carrusel de paquetes promocionales"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
            onKeyDown={handleKeyDown}
          >
            {PAQUETES.map((paquete, index) => (
              <PaqueteSlide
                key={paquete.id}
                paquete={paquete}
                isActive={index === activeIndex}
                dragOffset={index === activeIndex ? dragOffset : 0}
                isSwiping={isSwiping && index === activeIndex}
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
