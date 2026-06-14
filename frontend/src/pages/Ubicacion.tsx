import { Typography } from "@mui/material";
import {
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
} from "lucide-react";
import {
  SHOP_LAT,
  SHOP_LNG,
  UBICACION_ADDRESS,
  UBICACION_GOOGLE_MAPS_URL,
  ubicacionDirectionsUrl,
} from "../lib/ubicacion";
import { HORARIO_LABORAL } from "../lib/horarios";
import { openWhatsApp } from "../lib/openWhatsApp";

/** Ancho del encuadre en grados de longitud (bbox). Valores mayores = más alejado. */
const MAP_BBOX_LON_SPAN = 0.0048;
/** Alto del encuadre en grados de latitud (bbox). */
const MAP_BBOX_LAT_SPAN = 0.0036;
/** Multiplica ambos spans (>1 aleja, <1 acerca el encuadre). */
const MAP_ZOOM_FACTOR = 1;

const UBICACION_WHATSAPP_HREF = "https://wa.me/5214449876543";
const MAPS_DIRECTIONS_URL = ubicacionDirectionsUrl();

function buildOsmEmbedSrc(): string {
  const lonHalf = (MAP_BBOX_LON_SPAN * MAP_ZOOM_FACTOR) / 2;
  const latHalf = (MAP_BBOX_LAT_SPAN * MAP_ZOOM_FACTOR) / 2;
  const minLon = SHOP_LNG - lonHalf;
  const minLat = SHOP_LAT - latHalf;
  const maxLon = SHOP_LNG + lonHalf;
  const maxLat = SHOP_LAT + latHalf;
  const bbox = `${minLon},${minLat},${maxLon},${maxLat}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${SHOP_LAT},${SHOP_LNG}`;
}

const GOOGLE_MAPS_SEARCH_URL = UBICACION_GOOGLE_MAPS_URL;

function formatCoordsShort(): string {
  return `${SHOP_LAT.toFixed(5)}°, ${SHOP_LNG.toFixed(5)}°`;
}

export function Ubicacion() {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-start gap-3">
              <MapPin
                size={32}
                className="mt-0.5 shrink-0 text-primary"
                aria-hidden
              />
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontFamily:
                    'Georgia, "Times New Roman", "Liberation Serif", serif',
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "text.primary",
                  lineHeight: 1.2,
                }}
              >
                Nuestra ubicación
              </Typography>
            </div>
            <p className="mt-3 text-sm text-foreground-soft">
              {UBICACION_ADDRESS}
            </p>

            <div className="mt-6 overflow-hidden rounded-[var(--radius)] border border-border bg-muted shadow-[var(--shadow-soft)]">
              <div className="relative aspect-[16/10] min-h-[220px] w-full sm:min-h-[300px]">
                <iframe
                  title="Mapa del consultorio en OpenStreetMap"
                  src={buildOsmEmbedSrc()}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="border-t border-border bg-card px-4 py-3 sm:px-5">
                <p className="text-sm text-foreground-soft">
                  <span className="text-muted-foreground">Coordenadas: </span>
                  <span className="font-medium text-foreground tabular-nums">
                    {formatCoordsShort()}
                  </span>
                  <span className="mx-2 text-border-strong">·</span>
                  <a
                    href={GOOGLE_MAPS_SEARCH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary underline-offset-2 hover:underline"
                  >
                    Abrir en Google Maps
                  </a>
                </p>
              </div>
              <div className="flex flex-col items-stretch justify-between gap-3 border-t border-border bg-card p-4 sm:flex-row sm:items-center">
                <p className="text-sm text-foreground-soft">
                  Frente al consultorio hay estacionamiento sobre la calle.
                </p>
                <a
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[var(--primary-hover)]"
                >
                  <Navigation size={15} />
                  Cómo llegar
                </a>
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-xl font-semibold text-foreground">
              Información de contacto
            </h2>

            <ul className="mt-5 space-y-5">
              {/* Teléfono fijo — desactivado temporalmente
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <Phone size={16} />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Teléfono
                  </p>
                  <a
                    href="tel:4441234567"
                    className="text-base font-semibold text-foreground"
                  >
                    444 123 4567
                  </a>
                </div>
              </li>
              */}
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <MessageCircle size={16} />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    WhatsApp
                  </p>
                  <a
                    href={UBICACION_WHATSAPP_HREF}
                    className="cursor-pointer text-base font-semibold text-foreground"
                    onClick={(e) => {
                      e.preventDefault();
                      openWhatsApp(UBICACION_WHATSAPP_HREF);
                    }}
                  >
                    444 567 6565
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <Clock size={16} />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Horario
                  </p>
                  <ul className="mt-1 space-y-1">
                    {HORARIO_LABORAL.map(({ day, hours }) => (
                      <li
                        key={day}
                        className="flex justify-between gap-4 text-sm"
                      >
                        <span className="font-medium text-foreground">
                          {day}
                        </span>
                        <span className="text-foreground-soft">{hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
