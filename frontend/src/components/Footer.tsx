import { Wordmark } from "./Logo";
import { MapPin, MessageCircle } from "lucide-react";
import { HORARIO_LABORAL } from "../lib/horarios";
import { openWhatsApp } from "../lib/openWhatsApp";

const FOOTER_WHATSAPP_HREF = "https://wa.me/5214445676565";

export function Footer() {
  return (
    <footer className="bg-brand-ink text-white/80">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <Wordmark variant="light" size="md" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Contribuir a mejorar la salud y la vida del ser humano, generando confianza, a través de calidad y respeto, 
            mediante los análisis clínicos, contribuyendo en el diagnóstico, pronóstico y tratamiento de las enfermedades 
            de nuestros pacientes.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contacto</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-white/60" />
                <span className="text-white/70">Blvd. Rio Españita 450-2, Esmeralda, 78399 San Luis Potosí, S.L.P.</span>
              </li>
              {/* Teléfono fijo — desactivado temporalmente
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-white/60" />
                <a
                  href="tel:4441234567"
                  className="text-white/70 hover:text-white"
                >
                  444 123 4567
                </a>
              </li>
              */}
              <li className="flex items-start gap-2">
                <MessageCircle
                  size={16}
                  className="mt-0.5 shrink-0 text-white/60"
                />
                <a
                  href={FOOTER_WHATSAPP_HREF}
                  className="cursor-pointer text-white/70 hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    openWhatsApp(FOOTER_WHATSAPP_HREF);
                  }}
                >
                  444 567 6565
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Horario</h3>
            <ul className="mt-4 space-y-1.5 text-sm text-white/70">
              {HORARIO_LABORAL.map(({ day, hours }) => (
                <li key={day} className="flex justify-between gap-4">
                  <span>{day}</span>
                  <span className="text-white/90">{hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}
