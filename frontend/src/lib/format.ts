const MONTHS_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const WEEKDAYS_LONG_ES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

/** "Miércoles 22 de mayo de 2024" */
export function formatLongDateES(d: Date): string {
  const weekday = WEEKDAYS_LONG_ES[d.getDay()];
  const day = d.getDate();
  const month = MONTHS_ES[d.getMonth()];
  const year = d.getFullYear();
  return `${weekday} ${day} de ${month} de ${year}`;
}

/** "Mayo 2024" */
export function formatMonthYearES(d: Date): string {
  const month = MONTHS_ES[d.getMonth()];
  return `${month.charAt(0).toUpperCase() + month.slice(1)} ${d.getFullYear()}`;
}

/** ISO local YYYY-MM-DD (sin TZ) */
export function toIsoLocalDate(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function parseIsoLocalDate(s: string): Date {
  const [y, m, d] = s.split("-").map((p) => Number(p));
  return new Date(y, m - 1, d);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function addMonths(d: Date, months: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + months, 1);
}
