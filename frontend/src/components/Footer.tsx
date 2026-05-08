import { Link } from "react-router-dom";
import { Wordmark } from "./Logo";
import { MapPin, Phone, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-ink text-white/80">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Wordmark variant="light" size="md" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Atención médica general con calidad, calidez y compromiso contigo.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Enlaces</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-white/70 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/doctoras" className="text-white/70 hover:text-white">
                  Doctoras
                </Link>
              </li>
              <li>
                <Link to="/ubicacion" className="text-white/70 hover:text-white">
                  Ubicación
                </Link>
              </li>
              <li>
                <Link to="/agendar" className="text-white/70 hover:text-white">
                  Agendar cita
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contacto</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-white/60" />
                <span className="text-white/70">Azabache 555, C.P. 76399</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-white/60" />
                <a
                  href="tel:4441234567"
                  className="text-white/70 hover:text-white"
                >
                  444 123 4567
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle
                  size={16}
                  className="mt-0.5 shrink-0 text-white/60"
                />
                <a
                  href="https://wa.me/5214449876543"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white"
                >
                  444 987 6543
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Horario</h3>
            <p className="mt-4 text-sm text-white/70">
              Lunes a sábado
              <br />
              8:00 AM a 7:00 PM
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
          Este establecimiento no es una clínica, sino un consultorio médico.
          <br className="hidden sm:inline" />
          Para emergencias, acude al servicio médico más cercano.
        </div>
      </div>
    </footer>
  );
}
