/** Dirección mostrada en la UI y en enlaces a Google Maps. */
export const UBICACION_ADDRESS = "Azabache 555, C.P. 76399";

export function ubicacionDirectionsUrl(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    UBICACION_ADDRESS,
  )}`;
}
