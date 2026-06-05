/// <reference types="vite/client" />

/**
 * Variables expuestas al cliente vía Vite. Cualquier `VITE_*` acaba en el JavaScript
 * público: no almacenar claves secretas; solo URL públicas o identificadores no
 * sensibles.
 */
interface ImportMetaEnv {
  /** URL pública del API (sin barra final). Vacía en dev con proxy de Vite. */
  readonly VITE_BACKEND_URL?: string;
  readonly VITE_GLORIA_WHATSAPP?: string;
  readonly VITE_LIDIA_WHATSAPP?: string;
  readonly VITE_CAROLINA_WHATSAPP?: string;
}
