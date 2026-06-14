import {
  Activity,
  Bandage,
  ClipboardList,
  Ear,
  FileBadge,
  FlaskConical,
  Gauge,
  Stethoscope,
  TestTubes,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { ServicioIconKey } from "../lib/servicios";

const SERVICIO_ICONS: Record<ServicioIconKey, LucideIcon> = {
  laboratorio: FlaskConical,
  antidoping: TestTubes,
  examenes: ClipboardList,
  certificados: FileBadge,
  espirometria: Wind,
  audiometria: Ear,
  electrocardiograma: Activity,
  consulta: Stethoscope,
  enfermeria: Bandage,
  "presion-arterial": Gauge,
};

type ServicioIconProps = {
  icon: ServicioIconKey;
  size?: number;
  className?: string;
};

export function ServicioIcon({ icon, size = 20, className }: ServicioIconProps) {
  const Icon = SERVICIO_ICONS[icon];
  return <Icon size={size} className={className} aria-hidden />;
}
