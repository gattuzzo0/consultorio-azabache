import { useCallback, useEffect, useState } from "react";
import { HeroGlassCard } from "./HeroGlassCard";

const SPLASH_VISIBLE_MS = 2000;
const SPLASH_FADE_MS = 320;

type SplashScreenProps = {
  onFinished: () => void;
};

export function SplashScreen({ onFinished }: SplashScreenProps) {
  const [phase, setPhase] = useState<"visible" | "exit">("visible");

  const finish = useCallback(() => {
    onFinished();
  }, [onFinished]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";

    const fadeTimer = window.setTimeout(
      () => setPhase("exit"),
      SPLASH_VISIBLE_MS - SPLASH_FADE_MS,
    );
    const doneTimer = window.setTimeout(finish, SPLASH_VISIBLE_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, [finish]);

  return (
    <div
      className={[
        "splash-screen",
        phase === "exit" ? "splash-screen--exit" : "",
      ].join(" ")}
      role="status"
      aria-live="polite"
      aria-label="Cargando ROGA"
    >
      <div className="splash-screen__inner">
        <HeroGlassCard />
      </div>
    </div>
  );
}

export { SPLASH_FADE_MS, SPLASH_VISIBLE_MS };
