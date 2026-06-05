/** Dirección mostrada en la UI. */
export const UBICACION_ADDRESS =
  "Blvd. Rio Españita 450-2, Esmeralda, 78399 San Luis Potosí, S.L.P.";

/** Coordenadas del pin (Google Maps). */
export const SHOP_LAT = 22.136327;
export const SHOP_LNG = -100.950419;

/** Enlace oficial del lugar en Google Maps. */
export const UBICACION_GOOGLE_MAPS_URL =
  "https://maps.app.goo.gl/Yu9wiRcG4925dveB6";

export function ubicacionDirectionsUrl(): string {
  return UBICACION_GOOGLE_MAPS_URL;
}

export function ubicacionGoogleMapsSearchUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${SHOP_LAT},${SHOP_LNG}`;
}
