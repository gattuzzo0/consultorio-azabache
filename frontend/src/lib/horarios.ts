export type HorarioDia = {
  day: string;
  hours: string;
};

export const HORARIO_LABORAL: HorarioDia[] = [
  { day: "Lunes", hours: "7:30 a.m. – 5:00 p.m." },
  { day: "Martes", hours: "7:30 a.m. – 5:00 p.m." },
  { day: "Miércoles", hours: "7:30 a.m. – 5:00 p.m." },
  { day: "Jueves", hours: "7:30 a.m. – 5:00 p.m." },
  { day: "Viernes", hours: "7:30 a.m. – 5:00 p.m." },
  { day: "Sábado", hours: "7:30 a.m. – 1:30 p.m." },
  { day: "Domingo", hours: "Cerrado" },
];
