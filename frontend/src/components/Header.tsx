import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X } from "lucide-react";
import { Wordmark } from "./Logo";

const NAV_LINKS = [
  { to: "/", label: "Inicio", end: true },
  { to: "/lista-estudios", label: "Estudios" },
  { to: "/salud-ocupacional", label: "Salud ocupacional" },
  { to: "/como-cuidar-tu-salud", label: "Salud preventiva" },
  { to: "/ubicacion", label: "Ubicación" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-hero text-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label="ROGA Laboratorio médico y salud ocupacional - Inicio"
          onClick={() => setOpen(false)}
        >
          <Wordmark variant="light" />
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  "text-sm font-medium transition-colors",
                  isActive
                    ? "text-white"
                    : "text-white/70 hover:text-white",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/agendar"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-[var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-[#1a1e23]"
          >
            Agendar Consulta Médica
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 hover:bg-white/10 md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Navegación móvil"
          className="border-t border-white/5 bg-hero md:hidden"
        >
          <ul className="flex flex-col gap-1 p-4">
            {NAV_LINKS.map((link) => {
              const active =
                link.end
                  ? location.pathname === link.to
                  : location.pathname.startsWith(link.to);
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={[
                      "block rounded-md px-3 py-2 text-sm font-medium",
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:bg-white/5 hover:text-white",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                to="/agendar"
                onClick={() => setOpen(false)}
                className="block w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground hover:bg-[var(--primary-hover)]"
              >
                Agendar Consulta Médica
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
