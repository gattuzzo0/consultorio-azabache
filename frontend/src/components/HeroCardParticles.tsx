import { useEffect, useRef } from "react";

type Particle = {
  angle: number;
  radius: number;
  radiusSpeed: number;
  angleSpeed: number;
  size: number;
  alpha: number;
};

function createParticles(count: number, w: number, h: number): Particle[] {
  const maxR = Math.min(w, h) * 0.38;
  return Array.from({ length: count }, () => ({
    angle: Math.random() * Math.PI * 2,
    radius: maxR * (0.15 + Math.random() * 0.85),
    radiusSpeed: (Math.random() - 0.5) * 0.15,
    angleSpeed: (Math.random() - 0.5) * 0.012,
    size: 0.8 + Math.random() * 2.2,
    alpha: 0.25 + Math.random() * 0.55,
  }));
}

type HeroCardParticlesProps = {
  className?: string;
};

/** Partículas naranjas en espiral alrededor del logo dentro de la tarjeta hero. */
export function HeroCardParticles({ className }: HeroCardParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(140, Math.floor((w * h) / 900));
      particles = createParticles(count, w, h);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.38;

      for (const p of particles) {
        p.angle += p.angleSpeed;
        p.radius += p.radiusSpeed;
        if (p.radius < maxR * 0.1 || p.radius > maxR) {
          p.radiusSpeed *= -1;
        }

        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * 0.85;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, p.size * 2);
        grad.addColorStop(0, `rgba(245, 166, 35, ${p.alpha})`);
        grad.addColorStop(0.5, `rgba(230, 126, 34, ${p.alpha * 0.6})`);
        grad.addColorStop(1, "rgba(230, 126, 34, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
    />
  );
}
