import { useMemo, useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import { Home as HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { StepIndicator, type Step } from "../components/StepIndicator";
import { Calendar } from "../components/Calendar";
import { TimeSlots } from "../components/TimeSlots";
import { DoctorAvatar } from "../components/DoctorCard";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { findDoctor } from "../lib/doctors";
import {
  buildConsultAvailabilityMessage,
  getDoctorWhatsAppDigits,
} from "../lib/doctorWhatsApp";
import {
  formatLongDateES,
  startOfMonth,
  toIsoLocalDate,
} from "../lib/format";
import { openWhatsApp } from "../lib/openWhatsApp";

const DOCTOR_ID = "gloria-vazquez";

const STEPS: Step[] = [
  { id: 1, label: "Selecciona fecha" },
  { id: 2, label: "Selecciona horario" },
  { id: 3, label: "Tus datos" },
  { id: 4, label: "Confirmación" },
];

const WEEKDAY_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];
const SATURDAY_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"];

function slotsForDate(date: Date | null): string[] {
  if (!date) return [];
  const dow = date.getDay();
  if (dow === 6) return SATURDAY_SLOTS;
  if (dow >= 1 && dow <= 5) return WEEKDAY_SLOTS;
  return [];
}

const PHONE_RE = /^\d{10}$/;

type FormErrors = {
  patientName?: string;
  patientPhone?: string;
  reason?: string;
  general?: string;
};

type WhatsAppCompletion = {
  doctorName: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  reason: string;
};

export function AgendarCita() {
  const doctorId = DOCTOR_ID;
  const [viewMonth, setViewMonth] = useState<Date>(() =>
    startOfMonth(new Date()),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [reason, setReason] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [completion, setCompletion] = useState<WhatsAppCompletion | null>(
    null,
  );

  const availableSlots = useMemo(
    () => slotsForDate(selectedDate),
    [selectedDate],
  );

  const currentStep = useMemo(() => {
    if (!selectedDate) return 1;
    if (!selectedSlot) return 2;
    if (!completion) return 3;
    return 4;
  }, [selectedDate, selectedSlot, completion]);

  const completedSteps = useMemo(() => {
    const completed: number[] = [];
    if (selectedDate) completed.push(1);
    if (selectedSlot) completed.push(2);
    if (completion) completed.push(3, 4);
    return completed;
  }, [selectedDate, selectedSlot, completion]);

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!patientName.trim() || patientName.trim().length < 3) {
      e.patientName = "Ingresa tu nombre completo.";
    }
    if (!PHONE_RE.test(patientPhone)) {
      e.patientPhone = "Ingresa un teléfono de 10 dígitos.";
    }
    if (!reason.trim() || reason.trim().length < 4) {
      e.reason = "Cuéntanos brevemente el motivo de tu consulta.";
    }
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!selectedDate || !selectedSlot) {
      setErrors({
        general: "Completa los pasos previos: fecha y horario.",
      });
      return;
    }
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    const waDigits = getDoctorWhatsAppDigits(doctorId);
    if (!waDigits) {
      setErrors({
        general:
          "No hay número de WhatsApp para esta doctora. Configura VITE_GLORIA_WHATSAPP, VITE_LIDIA_WHATSAPP y VITE_CAROLINA_WHATSAPP en el entorno del frontend.",
      });
      return;
    }

    const doctor = findDoctor(doctorId);
    if (!doctor) return;

    const message = buildConsultAvailabilityMessage({
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      reason: reason.trim(),
      doctorShortName: doctor.shortName,
      dateLabel: formatLongDateES(selectedDate),
      time: selectedSlot,
    });

    const waLink = `https://wa.me/${waDigits}?text=${encodeURIComponent(message)}`;
    openWhatsApp(waLink);

    setCompletion({
      doctorName: doctor.shortName,
      date: toIsoLocalDate(selectedDate),
      time: selectedSlot,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      reason: reason.trim(),
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (completion) {
    return (
      <ConfirmationView
        completion={completion}
        steps={STEPS}
        currentStep={4}
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

        {selectedDoctor && (
          <div className="mb-6 flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
            <DoctorAvatar doctor={selectedDoctor} size={56} rounded="md" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Tu consulta médica será con
              </p>
              <p className="truncate text-base font-semibold text-foreground">
                {selectedDoctor.shortName}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedDoctor.specialty}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Paso 1: Fecha */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <h2 className="text-base font-semibold text-foreground">
                1. Selecciona fecha
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

            {/* Paso 2: Horario */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <h2 className="text-base font-semibold text-foreground">
                2. Selecciona horario disponible
              </h2>
              <div className="mt-4">
                <TimeSlots
                  slots={availableSlots}
                  selected={selectedSlot}
                  onSelect={setSelectedSlot}
                  disabled={!selectedDate}
                />
              </div>
            </div>
          </div>

          {/* Paso 3: Datos */}
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-base font-semibold text-foreground">
              3. Tus datos
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
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
                placeholder="(10 dígitos) Ej. 4448111213"
                value={patientPhone}
                onChange={(e) =>
                  setPatientPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                error={Boolean(errors.patientPhone)}
                helperText={errors.patientPhone}
                slotProps={{
                  htmlInput: { maxLength: 10, inputMode: "numeric", pattern: "[0-9]*" },
                }}
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
                  "Completa todos los pasos para consultar disponibilidad por WhatsApp."
                )}
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<WhatsAppIcon size={18} />}
              >
                Consultar disponibilidad
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

type ConfirmationViewProps = {
  completion: WhatsAppCompletion;
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
};

function ConfirmationView({
  completion,
  steps,
  currentStep,
  completedSteps,
}: ConfirmationViewProps) {
  const date = new Date(`${completion.date}T00:00:00`);
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
            <WhatsAppIcon size={36} />
          </div>
          <h2 className="mt-5 text-2xl font-bold text-foreground">
            Mensaje listo en WhatsApp
          </h2>
          <p className="mt-2 text-sm text-foreground-soft">
            Se abrió WhatsApp con tu nombre, teléfono, motivo de consulta y la
            preferencia de fecha y hora. Envía el mensaje para coordinar la
            cita con el consultorio.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Si no ves WhatsApp, permite ventanas emergentes o revisa que la app
            esté instalada.
          </p>

          <dl className="mx-auto mt-8 grid max-w-md grid-cols-1 gap-y-3 rounded-xl border border-border bg-muted px-6 py-5 text-left text-sm sm:grid-cols-3">
            <dt className="text-muted-foreground">Doctora</dt>
            <dd className="font-medium text-foreground sm:col-span-2">
              {completion.doctorName}
            </dd>

            <dt className="text-muted-foreground">Fecha</dt>
            <dd className="font-medium text-foreground sm:col-span-2">
              {formatLongDateES(date)}
            </dd>

            <dt className="text-muted-foreground">Hora</dt>
            <dd className="font-medium text-foreground sm:col-span-2">
              {completion.time}
            </dd>

            <dt className="text-muted-foreground">Paciente</dt>
            <dd className="font-medium text-foreground sm:col-span-2">
              {completion.patientName}
            </dd>

            <dt className="text-muted-foreground">Teléfono</dt>
            <dd className="font-medium text-foreground sm:col-span-2">
              {completion.patientPhone}
            </dd>

            <dt className="text-muted-foreground">Motivo</dt>
            <dd className="font-medium text-foreground sm:col-span-2">
              {completion.reason}
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
