/**
 * Variables `VITE_*` se incrustan en el bundle público: no usar secretos (API keys
 * privadas, tokens de servicio). Solo datos concebidos como públicos (URL del API,
 * enlaces wa.me, etc.).
 */
export function assertPublicEnv(): void {
  if (!import.meta.env.PROD) return;

  const backend = (import.meta.env.VITE_BACKEND_URL ?? "").trim();
  if (backend && /^http:\/\//i.test(backend)) {
    console.warn(
      "[Consultorio Azabache] VITE_BACKEND_URL usa HTTP en un build de producción; debería ser HTTPS.",
    );
  }

  try {
    if (backend) {
      const u = new URL(backend);
      if (u.protocol !== "https:" && u.protocol !== "http:") {
        console.warn(
          "[Consultorio Azabache] VITE_BACKEND_URL tiene un protocolo inusual; revisa el despliegue.",
        );
      }
    }
  } catch {
    console.warn(
      "[Consultorio Azabache] VITE_BACKEND_URL no es una URL válida; revisa las variables de entorno del build.",
    );
  }
}
