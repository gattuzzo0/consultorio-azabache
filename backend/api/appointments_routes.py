import asyncio
import logging
import re
from datetime import date, time

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, ConfigDict, Field, field_validator

from api.config import is_database_configured
from api.supabase_client import get_supabase

logger = logging.getLogger(__name__)

appointments_router = APIRouter()


# Catálogo de doctoras conocido por el backend. Mantener sincronizado con
# frontend/src/lib/doctors.ts. Si crece, mover a tabla en Supabase.
DOCTORS: dict[str, str] = {
    "gloria-vazquez": "Dra. Gloria Vázquez Vázquez",
    "lidia-rodriguez": "Dra. Lidia Rodriguez Vázquez",
    "carolina-vazquez": "Dra. Carolina Vázquez Montes",
}


# Slots permitidos. Coincide con el frontend (TIME_SLOTS).
ALLOWED_SLOTS_24H: dict[str, str] = {
    "09:00 AM": "09:00",
    "10:30 AM": "10:30",
    "12:00 PM": "12:00",
    "04:00 PM": "16:00",
}


_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
_PHONE_RE = re.compile(r"^[\d\s+()\-]{7,}$")
_EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


class AppointmentCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    doctor_id: str = Field(alias="doctorId", min_length=1, max_length=64)
    appointment_date: str = Field(alias="date", min_length=10, max_length=10)
    appointment_time: str = Field(alias="time", min_length=1, max_length=16)
    patient_name: str = Field(alias="patientName", min_length=3, max_length=120)
    patient_phone: str = Field(alias="patientPhone", min_length=7, max_length=40)
    patient_email: str = Field(
        default="",
        alias="patientEmail",
        max_length=200,
    )
    reason: str = Field(min_length=4, max_length=2000)

    @field_validator("doctor_id")
    @classmethod
    def doctor_known(cls, v: str) -> str:
        if v not in DOCTORS:
            raise ValueError(f"doctorId desconocido: {v}")
        return v

    @field_validator("appointment_date")
    @classmethod
    def date_iso(cls, v: str) -> str:
        if not _DATE_RE.match(v):
            raise ValueError("date debe ser YYYY-MM-DD")
        try:
            d = date.fromisoformat(v)
        except ValueError as e:
            raise ValueError("date inválida") from e
        if d < date.today():
            raise ValueError("La fecha no puede ser anterior a hoy")
        if d.weekday() == 6:  # domingo
            raise ValueError("No hay atención los domingos")
        return v

    @field_validator("appointment_time")
    @classmethod
    def time_allowed(cls, v: str) -> str:
        if v not in ALLOWED_SLOTS_24H:
            allowed = ", ".join(ALLOWED_SLOTS_24H.keys())
            raise ValueError(f"time debe ser uno de: {allowed}")
        return v

    @field_validator("patient_phone")
    @classmethod
    def phone_ok(cls, v: str) -> str:
        if not _PHONE_RE.match(v):
            raise ValueError("Teléfono inválido")
        return v

    @field_validator("patient_email")
    @classmethod
    def email_ok(cls, v: str) -> str:
        v = v.strip().lower()
        if not v:
            return ""
        if not _EMAIL_RE.match(v):
            raise ValueError("Correo electrónico inválido")
        return v


class AppointmentOut(BaseModel):
    id: str
    doctorId: str
    doctorName: str
    date: str
    time: str
    patientName: str
    patientPhone: str
    patientEmail: str
    reason: str
    createdAt: str


def _row_to_out(row: dict) -> AppointmentOut:
    created = row.get("created_at")
    if hasattr(created, "isoformat"):
        created_iso = created.isoformat()
    else:
        created_iso = str(created) if created is not None else ""

    appt_date = row.get("appointment_date")
    if hasattr(appt_date, "isoformat"):
        date_iso = appt_date.isoformat()
    else:
        date_iso = str(appt_date)

    return AppointmentOut(
        id=str(row["id"]),
        doctorId=str(row["doctor_id"]),
        doctorName=str(row["doctor_name"]),
        date=date_iso,
        time=str(row["appointment_time_label"]),
        patientName=str(row["patient_name"]),
        patientPhone=str(row["patient_phone"]),
        patientEmail=str(row["patient_email"]),
        reason=str(row["reason"]),
        createdAt=created_iso,
    )


def _insert_appointment(payload: dict) -> dict:
    res = (
        get_supabase()
        .table("appointments")
        .insert(payload)
        .execute()
    )
    rows = res.data or []
    if not rows:
        raise RuntimeError("Supabase no devolvió la fila insertada")
    return rows[0]


@appointments_router.post(
    "",
    response_model=AppointmentOut,
    status_code=status.HTTP_201_CREATED,
)
async def create_appointment(body: AppointmentCreate) -> AppointmentOut:
    if not is_database_configured():
        raise HTTPException(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(
                "Base de datos no configurada. Define SUPABASE_URL y "
                "SUPABASE_SERVICE_ROLE_KEY en backend/.env."
            ),
        )

    time_24h = ALLOWED_SLOTS_24H[body.appointment_time]
    payload = {
        "doctor_id": body.doctor_id,
        "doctor_name": DOCTORS[body.doctor_id],
        "appointment_date": body.appointment_date,
        "appointment_time_24h": str(time(*map(int, time_24h.split(":")))),
        "appointment_time_label": body.appointment_time,
        "patient_name": body.patient_name.strip(),
        "patient_phone": body.patient_phone.strip(),
        "patient_email": body.patient_email,
        "reason": body.reason.strip(),
        "status": "pendiente",
    }

    try:
        row = await asyncio.to_thread(_insert_appointment, payload)
    except Exception:
        logger.exception("create_appointment: fallo al insertar")
        raise HTTPException(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="No se pudo guardar la cita. Intenta de nuevo en unos segundos.",
        ) from None

    return _row_to_out(row)


class DoctorOut(BaseModel):
    id: str
    name: str


@appointments_router.get("/doctors", response_model=list[DoctorOut])
async def list_doctors() -> list[DoctorOut]:
    return [DoctorOut(id=k, name=v) for k, v in DOCTORS.items()]
