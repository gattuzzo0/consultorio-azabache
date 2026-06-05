import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
};

const LINK_DISTANCE = 130;
const PARTICLE_DENSITY = 3200;

type ParticleBackgroundProps = {
  className?: string;
};

export function ParticleBackground({ className }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationId = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const createParticles = () => {
      const count = Math.min(
        320,
        Math.max(100, Math.floor((width * height) / PARTICLE_DENSITY)),
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (reducedMotion ? 0 : 0.38),
        vy: (Math.random() - 0.5) * (reducedMotion ? 0 : 0.38),
        radius: Math.random() * 2.4 + 1.2,
        opacity: Math.random() * 0.12 + 0.08,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        a.x += a.vx;
        a.y += a.vy;

        if (a.x <= 0 || a.x >= width) a.vx *= -1;
        if (a.y <= 0 || a.y >= height) a.vy *= -1;

        a.x = Math.max(0, Math.min(width, a.x));
        a.y = Math.max(0, Math.min(height, a.y));

        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DISTANCE) continue;

          const alpha = (1 - dist / LINK_DISTANCE) * 0.09;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 0.55;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.arc(p.x, p.y, p.radius * 0.85, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) {
        animationId = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      window.cancelAnimationFrame(animationId);
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
