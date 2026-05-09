import {
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
} from "lucide-react";
import { openWhatsApp } from "../lib/openWhatsApp";

const ADDRESS = "Azabache 555, C.P. 76399";
const UBICACION_WHATSAPP_HREF = "https://wa.me/5214449876543";
const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  ADDRESS,
)}`;
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS,
)}&output=embed`;

export function Ubicacion() {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Nuestra ubicación
            </h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-foreground-soft">
              <MapPin size={16} className="text-primary" />
              {ADDRESS}
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-muted shadow-card">
              <div className="relative aspect-[16/10] w-full bg-muted-strong">
                <iframe
                  title="Mapa del Consultorio Médico Azabache"
                  src={MAPS_EMBED_URL}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-border bg-card p-4">
                <p className="text-sm text-foreground-soft">
                  Frente al consultorio hay estacionamiento sobre la calle.
                </p>
                <a
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1f2937]"
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
                    444 316 1743
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
                  <p className="text-base font-semibold text-foreground">
                    Lunes a sábado
                  </p>
                  <p className="text-sm text-foreground-soft">
                    8:00 AM a 7:00 PM
                  </p>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
