/** Dígitos del número WhatsApp por `Doctor.id`; lectura desde `VITE_*` en `.env`. */
export function getDoctorWhatsAppDigits(doctorId: string): string {
  let raw = "";
  switch (doctorId) {
    case "gloria-vazquez":
      raw = import.meta.env.VITE_GLORIA_WHATSAPP ?? "";
      break;
    case "lidia-rodriguez":
      raw = import.meta.env.VITE_LIDIA_WHATSAPP ?? "";
      break;
    case "carolina-vazquez":
      raw = import.meta.env.VITE_CAROLINA_WHATSAPP ?? "";
      break;
    default:
      break;
  }
  return raw.replace(/\D/g, "");
}

export function buildConsultAvailabilityMessage(opts: {
  patientName: string;
  patientPhone: string;
  reason: string;
  doctorShortName: string;
  dateLabel: string;
  time: string;
}): string {
  return [
    "Hola, solicito consultar disponibilidad.",
    "",
    "*Mis datos*",
    `Nombre: ${opts.patientName}`,
    `Teléfono: ${opts.patientPhone}`,
    `Motivo de consulta: ${opts.reason}`,
    "",
    "*Preferencia de cita*",
    `Doctora: ${opts.doctorShortName}`,
    `Fecha: ${opts.dateLabel}`,
    `Hora: ${opts.time}`,
  ].join("\n");
}
