function apiUrl(path: string): string {
  const base = (import.meta.env.VITE_BACKEND_URL ?? "").replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${p}` : p;
}

export class AppointmentsApiHttpError extends Error {
  public readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "AppointmentsApiHttpError";
    this.status = status;
  }
}

function backendHint(): string {
  const hasRemote = Boolean((import.meta.env.VITE_BACKEND_URL ?? "").trim());
  if (import.meta.env.DEV && !hasRemote) {
    return " En desarrollo, en backend/ ejecuta: uvicorn server:app --reload --host 127.0.0.1 --port 8000";
  }
  if (!hasRemote) return " Define VITE_BACKEND_URL con la URL pública del API.";
  return " Revisa que VITE_BACKEND_URL sea correcta y que el API esté en línea.";
}

function parseDetail(detail: unknown): string {
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((d) => {
        if (d && typeof d === "object" && "msg" in d) {
          return String((d as { msg: unknown }).msg ?? "");
        }
        return "";
      })
      .filter(Boolean)
      .join("; ");
  }
  return "Error de validación";
}

async function handleJsonError(res: Response): Promise<never> {
  const text = await res.text();
  let msg = res.statusText || "Error de red";
  try {
    const j = JSON.parse(text) as { detail?: unknown };
    if (j?.detail !== undefined) msg = parseDetail(j.detail);
  } catch {
    if (text.trim()) msg = text.trim().slice(0, 280);
  }
  if (res.status >= 502 && res.status <= 504) {
    msg = `${msg}.${backendHint()}`;
  }
  throw new AppointmentsApiHttpError(msg, res.status);
}

export type CreateAppointmentBody = {
  doctorId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  patientName: string;
  patientPhone: string;
  /** Opcional; si no hay correo se envía cadena vacía. */
  patientEmail?: string;
  reason: string;
};

export type AppointmentRecord = {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  reason: string;
  createdAt: string;
};

export async function createAppointment(
  body: CreateAppointmentBody,
): Promise<AppointmentRecord> {
  let res: Response;
  try {
    res = await fetch(apiUrl("/api/appointments"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new AppointmentsApiHttpError(
      `No se pudo conectar con el servidor.${backendHint()}`,
      0,
    );
  }
  if (!res.ok) await handleJsonError(res);
  return (await res.json()) as AppointmentRecord;
}
