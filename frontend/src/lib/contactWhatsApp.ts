/** WhatsApp del laboratorio (recepción / consultas generales). */
export const LAB_WHATSAPP_DIGITS = "5214448593032";

export function buildLabWhatsAppUrl(text?: string): string {
  const base = `https://wa.me/${LAB_WHATSAPP_DIGITS}`;
  const trimmed = text?.trim();
  if (!trimmed) return base;
  return `${base}?text=${encodeURIComponent(trimmed)}`;
}

/** Enlace sin mensaje prellenado (footer, ubicación). */
export const LAB_WHATSAPP_URL = buildLabWhatsAppUrl();

/** Consulta desde la lista completa de estudios. */
export const LISTA_ESTUDIOS_WHATSAPP_URL = buildLabWhatsAppUrl(
  "Hola, tengo una consulta sobre un estudio de laboratorio.",
);
