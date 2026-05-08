import { Check } from "lucide-react";

export type Step = {
  id: number;
  label: string;
};

type StepIndicatorProps = {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
};

export function StepIndicator({
  steps,
  currentStep,
  completedSteps,
}: StepIndicatorProps) {
  return (
    <ol
      className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:gap-2"
      aria-label="Pasos para agendar la cita"
    >
      {steps.map((step, idx) => {
        const isCompleted = completedSteps.includes(step.id);
        const isCurrent = currentStep === step.id;
        const reached = isCompleted || isCurrent;
        const isLast = idx === steps.length - 1;
        return (
          <li
            key={step.id}
            className="flex items-start gap-2 sm:min-w-0 sm:flex-1 sm:items-center"
            aria-current={isCurrent ? "step" : undefined}
          >
            <div className="relative flex shrink-0 flex-col items-center self-stretch sm:flex-row sm:items-center sm:self-auto">
              <span
                className={[
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  reached
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted-strong text-muted-foreground",
                ].join(" ")}
                aria-hidden="true"
              >
                {isCompleted ? <Check size={14} /> : step.id}
              </span>
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={[
                    "mt-1 w-px flex-1 sm:hidden",
                    reached ? "bg-primary/40" : "bg-border",
                  ].join(" ")}
                />
              )}
            </div>
            <span
              className={[
                "min-w-0 pt-0.5 text-sm leading-7 sm:whitespace-nowrap sm:pt-0",
                isCurrent
                  ? "font-semibold text-foreground"
                  : reached
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
              ].join(" ")}
            >
              {step.label}
            </span>
            {!isLast && (
              <span
                aria-hidden="true"
                className={[
                  "mx-1 hidden h-px flex-1 self-center sm:block",
                  reached ? "bg-primary/40" : "bg-border",
                ].join(" ")}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
