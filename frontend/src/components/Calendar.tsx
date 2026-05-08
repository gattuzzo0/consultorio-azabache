import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addMonths,
  formatMonthYearES,
  isSameDay,
  startOfMonth,
} from "../lib/format";

const WEEKDAY_HEADERS = ["L", "Ma", "Mi", "J", "V", "S", "D"];

type CalendarProps = {
  /** Mes mostrado actualmente (cualquier día de ese mes). */
  viewMonth: Date;
  onChangeViewMonth: (next: Date) => void;
  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;
  /** Fecha mínima seleccionable (incluida). Por defecto, hoy. */
  minDate?: Date;
};

function buildCalendarGrid(viewMonth: Date): Array<Date | null> {
  const first = startOfMonth(viewMonth);
  const daysInMonth = new Date(
    viewMonth.getFullYear(),
    viewMonth.getMonth() + 1,
    0,
  ).getDate();
  // Lunes-first: getDay() devuelve 0..6 con domingo=0; ajustamos
  // para que lunes=0 ... domingo=6.
  const firstDow = (first.getDay() + 6) % 7;
  const cells: Array<Date | null> = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function Calendar({
  viewMonth,
  onChangeViewMonth,
  selectedDate,
  onSelectDate,
  minDate,
}: CalendarProps) {
  const cells = useMemo(() => buildCalendarGrid(viewMonth), [viewMonth]);
  const today = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);
  const min = minDate ?? today;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onChangeViewMonth(addMonths(viewMonth, -1))}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted-strong hover:text-foreground"
          aria-label="Mes anterior"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-semibold text-foreground">
          {formatMonthYearES(viewMonth)}
        </span>
        <button
          type="button"
          onClick={() => onChangeViewMonth(addMonths(viewMonth, 1))}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted-strong hover:text-foreground"
          aria-label="Mes siguiente"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {WEEKDAY_HEADERS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((cell, idx) => {
          if (!cell) {
            return <div key={`empty-${idx}`} className="h-9 w-full" />;
          }
          const isSelected = selectedDate
            ? isSameDay(cell, selectedDate)
            : false;
          const isToday = isSameDay(cell, today);
          const isDisabled = cell.getTime() < min.getTime();
          // Domingo cerrado (siguiendo el horario "lunes a sábado")
          const isClosed = cell.getDay() === 0;
          const blocked = isDisabled || isClosed;
          return (
            <button
              key={cell.toISOString()}
              type="button"
              disabled={blocked}
              onClick={() => onSelectDate(cell)}
              className={[
                "relative flex h-9 w-full items-center justify-center rounded-md text-sm transition-colors",
                isSelected
                  ? "bg-primary text-primary-foreground font-semibold"
                  : blocked
                    ? "cursor-not-allowed text-muted-foreground/50"
                    : "text-foreground hover:bg-muted-strong",
                !isSelected && isToday
                  ? "ring-1 ring-inset ring-primary/40"
                  : "",
              ].join(" ")}
              aria-label={cell.toDateString()}
              aria-pressed={isSelected}
            >
              {cell.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
