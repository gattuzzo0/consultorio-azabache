import type { Servicio } from "../lib/servicios";
import { ServicioIcon } from "./ServicioIcon";

type ServicioCardProps = {
  servicio: Servicio;
  onSelect: (servicio: Servicio) => void;
};

export function ServicioCard({ servicio, onSelect }: ServicioCardProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(servicio)}
        className="flex w-full cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4 text-left shadow-soft transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        aria-haspopup="dialog"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
          <ServicioIcon icon={servicio.icon} />
        </span>
        <span className="pt-2 text-sm font-medium leading-snug text-foreground">
          {servicio.name}
        </span>
      </button>
    </li>
  );
}
