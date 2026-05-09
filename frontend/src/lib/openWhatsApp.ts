/**
 * Abre WhatsApp con mensaje prellenado sin navegar la SPA como primera opción.
 *
 * Estrategia por plataforma:
 * - **iOS (Safari / PWA):** `window.location.href = whatsapp://…` en la misma pila del **click**
 *   del usuario. Apple suele exigir que la apertura de apps URL scheme venga de un gesto
 *   síncrono; `location` cumple eso mejor que `iframe`.
 * - **Android / escritorio:** `iframe` oculto con `src = whatsapp://…` ~1 s para intentar
 *   delegar en el SO/WhatsApp Desktop sin cambiar `location` del documento (evita salir de la SPA).
 *
 * Fallback (~2,3 s): si no hubo `blur` y el documento sigue visible, se abre `wa.me` en
 * pestaña nueva (`window.open`) como último recurso.
 *
 * Pruebas manuales sugeridas:
 * - **iPhone (Safari / PWA instalada):** tocar el enlace → debe abrir WhatsApp con número/texto;
 *   si no hay app, valorar fallback a wa.me.
 * - **Android Chrome:** mismo click → app WhatsApp o fallback.
 * - **Escritorio con WhatsApp Desktop:** click → protocolo o nueva pestaña wa.me tras timeout.
 */

export type ParsedWhatsAppLink = {
  phoneDigits: string;
  text: string;
};

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

/**
 * Interpreta `https://wa.me/…`, `https://api.whatsapp.com/send?…` u otras variantes conocidas.
 */
export function parseWhatsAppLink(input: string): ParsedWhatsAppLink | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  try {
    const u = new URL(trimmed);

    if (u.protocol === "whatsapp:") {
      const phoneRaw = u.searchParams.get("phone") ?? "";
      const digits = digitsOnly(phoneRaw);
      if (!digits) return null;
      const text = u.searchParams.get("text") ?? "";
      return { phoneDigits: digits, text };
    }

    const host = u.hostname.replace(/^www\./, "").toLowerCase();

    if (host === "wa.me") {
      const digits = digitsOnly(u.pathname);
      if (!digits) return null;
      const text = u.searchParams.get("text") ?? "";
      return { phoneDigits: digits, text };
    }

    if (host === "api.whatsapp.com" || host === "web.whatsapp.com") {
      const phoneRaw = u.searchParams.get("phone") ?? "";
      const digits = digitsOnly(phoneRaw);
      if (!digits) return null;
      const text = u.searchParams.get("text") ?? "";
      return { phoneDigits: digits, text };
    }
  } catch {
    return null;
  }

  return null;
}

export function buildWhatsAppDeepLink(phoneDigits: string, text: string): string {
  const phone = digitsOnly(phoneDigits);
  const params = new URLSearchParams();
  params.set("phone", phone);
  if (text.length > 0) {
    params.set("text", text);
  }
  return `whatsapp://send?${params.toString()}`;
}

/** iPadOS 13+ puede declararse como Macintosh + touch. */
export function isLikelyIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/i.test(ua)) return true;
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) return true;
  return false;
}

function removeIframeLater(iframe: HTMLIFrameElement, ms: number): void {
  window.setTimeout(() => {
    iframe.remove();
  }, ms);
}

/**
 * Desktop/Android: intenta disparar el protocolo sin sustituir `window.location`.
 */
function openViaHiddenIframe(deepLink: string): void {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.tabIndex = -1;
  iframe.style.display = "none";
  iframe.style.position = "fixed";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  iframe.src = deepLink;
  document.body.appendChild(iframe);
  removeIframeLater(iframe, 1000);
}

const FALLBACK_MS = 2300;

function scheduleWaMeFallback(waLink: string): void {
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
    window.removeEventListener("blur", onBlur);
    document.removeEventListener("visibilitychange", onVis);
    window.clearTimeout(timer);
  };

  const onBlur = () => {
    cancel();
  };

  const onVis = () => {
    if (document.visibilityState === "hidden") {
      cancel();
    }
  };

  window.addEventListener("blur", onBlur);
  document.addEventListener("visibilitychange", onVis);

  const timer = window.setTimeout(() => {
    window.removeEventListener("blur", onBlur);
    document.removeEventListener("visibilitychange", onVis);
    if (cancelled) return;
    if (document.visibilityState === "visible") {
      window.open(waLink, "_blank", "noopener,noreferrer");
    }
  }, FALLBACK_MS);
}

/**
 * Intenta abrir WhatsApp nativo con mensaje prellenado.
 *
 * @returns `true` si se construyó `whatsapp://` y se intentó abrir por iframe o location;
 *          `false` si el parseo falló y solo se usó `window.open(waLink)`.
 */
export function openWhatsApp(waLink: string): boolean {
  const parsed = parseWhatsAppLink(waLink);
  if (!parsed) {
    window.open(waLink, "_blank", "noopener,noreferrer");
    return false;
  }

  const deepLink = buildWhatsAppDeepLink(parsed.phoneDigits, parsed.text);

  if (isLikelyIOS()) {
    window.location.href = deepLink;
    scheduleWaMeFallback(waLink);
    return true;
  }

  openViaHiddenIframe(deepLink);
  scheduleWaMeFallback(waLink);
  return true;
}
