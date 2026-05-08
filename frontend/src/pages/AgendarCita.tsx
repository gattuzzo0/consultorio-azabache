import { useMemo, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Check, Home as HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { StepIndicator, type Step } from "../components/StepIndicator";
import { Calendar } from "../components/Calendar";
import { TimeSlots } from "../components/TimeSlots";
import { DoctorAvatar } from "../components/DoctorCard";
import { DOCTORS, findDoctor } from "../lib/doctors";
import {
  formatLongDateES,
  startOfMonth,
  toIsoLocalDate,
} from "../lib/format";
import {
  AppointmentsApiHttpError,
  createAppointment,
  type AppointmentRecord,
} from "../lib/appointmentsApi";

const STEPS: Step[] = [
  { id: 1, label: "Selecciona doctora" },
  { id: 2, label: "Selecciona fecha" },
  { id: 3, label: "Selecciona horario" },
  { id: 4, label: "Tus datos" },
  { id: 5, label: "Confirmación" },
];

const TIME_SLOTS = ["09:00 AM", "10:30 AM", "12:00 PM", "04:00 PM"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+()-]{7,}$/;

type FormErrors = {
  patientName?: string;
  patientPhone?: string;
  patientEmail?: string;
  reason?: string;
  general?: string;
};

export function AgendarCita() {
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [viewMonth, setViewMonth] = useState<Date>(() =>
    startOfMonth(new Date()),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [reason, setReason] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<AppointmentRecord | null>(
    null,
  );

  const currentStep = useMemo(() => {
    if (!doctorId) return 1;
    if (!selectedDate) return 2;
    if (!selectedSlot) return 3;
    if (!confirmation) return 4;
    return 5;
  }, [doctorId, selectedDate, selectedSlot, confirmation]);

  const completedSteps = useMemo(() => {
    const completed: number[] = [];
    if (doctorId) completed.push(1);
    if (selectedDate) completed.push(2);
    if (selectedSlot) completed.push(3);
    if (confirmation) completed.push(4, 5);
    return completed;
  }, [doctorId, selectedDate, selectedSlot, confirmation]);

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!patientName.trim() || patientName.trim().length < 3) {
      e.patientName = "Ingresa tu nombre completo.";
    }
    if (!PHONE_RE.test(patientPhone.trim())) {
      e.patientPhone = "Ingresa un teléfono válido.";
    }
    if (!EMAIL_RE.test(patientEmail.trim())) {
      e.patientEmail = "Ingresa un correo electrónico válido.";
    }
    if (!reason.trim() || reason.trim().length < 4) {
      e.reason = "Cuéntanos brevemente el motivo de tu consulta.";
    }
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!doctorId || !selectedDate || !selectedSlot) {
      setErrors({
        general:
          "Completa los pasos previos: doctora, fecha y horario.",
      });
      return;
    }
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const record = await createAppointment({
        doctorId,
        date: toIsoLocalDate(selectedDate),
        time: selectedSlot,
        patientName: patientName.trim(),
        patientPhone: patientPhone.trim(),
        patientEmail: patientEmail.trim(),
        reason: reason.trim(),
      });
      setConfirmation(record);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const message =
        err instanceof AppointmentsApiHttpError
          ? err.message
          : err instanceof Error
            ? err.message
            : "No se pudo crear la cita.";
      setErrors({ general: message });
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <ConfirmationView
        record={confirmation}
        steps={STEPS}
        currentStep={5}
        completedSteps={completedSteps}
      />
    );
  }

  const selectedDoctor = findDoctor(doctorId);

  return (
    <section className="bg-muted py-8 sm:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Agendar cita
          </h1>
        </header>

        <div className="mb-8">
          <StepIndicator
            steps={STEPS}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Paso 1: Doctora */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <h2 className="text-base font-semibold text-foreground">
                1. Selecciona doctora
              </h2>
              <ul className="mt-4 space-y-3">
                {DOCTORS.map((d) => {
                  const isSelected = doctorId === d.id;
                  return (
                    <li key={d.id}>
                      <button
                        type="button"
                        onClick={() => setDoctorId(d.id)}
                        className={[
                          "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                          isSelected
                            ? "border-primary bg-accent/40 ring-1 ring-primary"
                            : "border-border bg-card hover:bg-muted",
                        ].join(" ")}
                        aria-pressed={isSelected}
                      >
                        <DoctorAvatar
                          doctor={d}
                          size={44}
                          rounded="md"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {d.shortName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {d.specialty}
                          </p>
                        </div>
                        {isSelected && (
                          <span
                            aria-hidden="true"
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                          >
                            <Check size={14} />
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Paso 2: Fecha */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <h2 className="text-base font-semibold text-foreground">
                2. Selecciona fecha
              </h2>
              <div className="mt-4">
                <Calendar
                  viewMonth={viewMonth}
                  onChangeViewMonth={setViewMonth}
                  selectedDate={selectedDate}
                  onSelectDate={(d) => {
                    setSelectedDate(d);
                    setSelectedSlot(null);
                  }}
                />
              </div>
            </div>

            {/* Paso 3: Horario */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <h2 className="text-base font-semibold text-foreground">
                3. Selecciona horario disponible
              </h2>
              <div className="mt-4">
                <TimeSlots
                  slots={TIME_SLOTS}
                  selected={selectedSlot}
                  onSelect={setSelectedSlot}
                  disabled={!selectedDate}
                />
              </div>
            </div>
          </div>

          {/* Paso 4: Datos */}
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-base font-semibold text-foreground">
              4. Tus datos
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <TextField
                label="Nombre completo"
                placeholder="Ingresa tu nombre"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                error={Boolean(errors.patientName)}
                helperText={errors.patientName}
                fullWidth
                size="medium"
              />
              <TextField
                label="Teléfono"
                placeholder="Ingresa tu teléfono"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                error={Boolean(errors.patientPhone)}
                helperText={errors.patientPhone}
                inputMode="tel"
                fullWidth
                size="medium"
              />
              <TextField
                label="Correo electrónico"
                placeholder="Ingresa tu correo"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                error={Boolean(errors.patientEmail)}
                helperText={errors.patientEmail}
                type="email"
                fullWidth
                size="medium"
              />
            </div>

            <div className="mt-4">
              <TextField
                label="Motivo de consulta"
                placeholder="Cuéntanos brevemente el motivo de tu consulta"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                error={Boolean(errors.reason)}
                helperText={errors.reason}
                multiline
                minRows={3}
                fullWidth
                size="medium"
              />
            </div>

            {errors.general && (
              <Alert severity="error" className="mt-4">
                {errors.general}
              </Alert>
            )}

            <div className="mt-6 flex flex-col items-stretch justify-between gap-3 border-t border-border pt-5 sm:flex-row sm:items-center">
              <div className="text-sm text-foreground-soft">
                {selectedDoctor && selectedDate && selectedSlot ? (
                  <>
                    Cita con{" "}
                    <span className="font-semibold text-foreground">
                      {selectedDoctor.shortName}
                    </span>{" "}
                    el{" "}
                    <span className="font-semibold text-foreground">
                      {formatLongDateES(selectedDate)}
                    </span>{" "}
                    a las{" "}
                    <span className="font-semibold text-foreground">
                      {selectedSlot}
                    </span>
                    .
                  </>
                ) : (
                  "Completa todos los pasos para confirmar tu cita."
                )}
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={submitting}
                startIcon={
                  submitting ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    <Check size={16} />
                  )
                }
              >
                {submitting ? "Enviando..." : "Confirmar cita"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

type ConfirmationViewProps = {
  record: AppointmentRecord;
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
};

function ConfirmationView({
  record,
  steps,
  currentStep,
  completedSteps,
}: ConfirmationViewProps) {
  const date = new Date(`${record.date}T00:00:00`);
  return (
    <section className="bg-muted py-8 sm:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Agendar cita
          </h1>
        </header>

        <div className="mb-8">
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        </div>

        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary">
            <Check size={32} strokeWidth={2.5} />
          </div>
          <h2 className="mt-5 text-2xl font-bold text-foreground">
            ¡Cita agendada con éxito!
          </h2>
          <p className="mt-2 text-sm text-foreground-soft">
            Hemos enviado los detalles a tu correo electrónico.
          </p>

          <dl className="mx-auto mt-8 grid max-w-md grid-cols-1 gap-y-3 rounded-xl border border-border bg-muted px-6 py-5 text-left text-sm sm:grid-cols-3">
            <dt className="text-muted-foreground">Doctora</dt>
            <dd className="font-medium text-foreground sm:col-span-2">
              {record.doctorName}
            </dd>

            <dt className="text-muted-foreground">Fecha</dt>
            <dd className="font-medium text-foreground sm:col-span-2">
              {formatLongDateES(date)}
            </dd>

            <dt className="text-muted-foreground">Hora</dt>
            <dd className="font-medium text-foreground sm:col-span-2">
              {record.time}
            </dd>

            <dt className="text-muted-foreground">Paciente</dt>
            <dd className="font-medium text-foreground sm:col-span-2">
              {record.patientName}
            </dd>
          </dl>

          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1f2937]"
            >
              <HomeIcon size={16} />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
