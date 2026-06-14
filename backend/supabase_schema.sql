-- =============================================================================
-- Esquema Supabase: ROGA Laboratorio médico y salud ocupacional
-- Aplicar manualmente desde el SQL Editor de Supabase.
-- Las tablas no se auto-crean desde el código.
-- =============================================================================

create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- Tabla: appointments
-- -----------------------------------------------------------------------------
create table if not exists public.appointments (
    id uuid primary key default gen_random_uuid(),
    doctor_id text not null,
    doctor_name text not null,
    appointment_date date not null,
    appointment_time_24h time not null,
    appointment_time_label text not null,
    patient_name text not null,
    patient_phone text not null,
    patient_email text not null default '', -- puede ser cadena vacía si el paciente no proporciona correo
    reason text not null,
    status text not null default 'pendiente',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists appointments_doctor_date_idx
    on public.appointments (doctor_id, appointment_date);

create index if not exists appointments_email_idx
    on public.appointments (patient_email);

-- Trigger para mantener updated_at
create or replace function public.set_appointments_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at := now();
    return new;
end;
$$;

drop trigger if exists trg_appointments_updated_at on public.appointments;
create trigger trg_appointments_updated_at
    before update on public.appointments
    for each row execute function public.set_appointments_updated_at();

-- =============================================================================
-- Row Level Security (RLS)
-- =============================================================================
-- El backend FastAPI usa service_role (bypassa RLS). Activamos RLS sin
-- políticas para cerrar el acceso público vía PostgREST con anon/authenticated.
-- Este bloque debe replicarse para CADA tabla nueva creada en el esquema public.

alter table public.appointments enable row level security;
alter table public.appointments force row level security;
