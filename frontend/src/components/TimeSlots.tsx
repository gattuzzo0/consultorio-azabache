type TimeSlotsProps = {
  slots: string[];
  selected: string | null;
  onSelect: (slot: string) => void;
  disabled?: boolean;
};

export function TimeSlots({
  slots,
  selected,
  onSelect,
  disabled,
}: TimeSlotsProps) {
  if (disabled) {
    return (
      <p className="rounded-md border border-dashed border-border bg-muted px-4 py-6 text-center text-sm text-muted-foreground">
        Primero selecciona una fecha.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3">
      {slots.map((slot) => {
        const isSelected = selected === slot;
        return (
          <button
            key={slot}
            type="button"
            onClick={() => onSelect(slot)}
            className={[
              "flex h-11 items-center justify-center rounded-md border text-sm font-medium transition-colors",
              isSelected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted",
            ].join(" ")}
            aria-pressed={isSelected}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
