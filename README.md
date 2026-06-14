# ROGA Laboratorio médico y salud ocupacional

Sitio web del ROGA Laboratorio médico y salud ocupacional: información del consultorio, doctoras, ubicación y agenda en línea de citas.

## Stack

- **Frontend**: Vite + React 19 + TypeScript estricto, Tailwind v4 (`@tailwindcss/vite`), MUI 6 (Emotion), React Router 7.
- **Backend**: FastAPI (Python) en `backend/`, persistencia en Supabase (Postgres) usando `service_role` desde el servidor.
- **Despliegue**: Vercel (dos proyectos separados: `frontend/` y `backend/`).

## Estructura

```
consultorio-azabache/
├── frontend/          # SPA pública (Home, Doctoras, Ubicación, Agendar cita)
├── backend/           # API FastAPI: POST /api/appointments, GET /api/doctors, /api/health
├── package.json       # Metadatos del monorepo + Husky + alias eslint
├── vercel.json        # Config Vercel (raíz) para el deploy del frontend
└── .husky/            # Hook pre-commit (ejecuta ESLint del frontend)
```

## Variables de entorno

### Frontend (`frontend/.env.local` o dashboard Vercel)

| Variable | Descripción |
| --- | --- |
| `VITE_BACKEND_URL` | URL pública del backend FastAPI (vacía en dev, Vite hace proxy). |

### Backend (`backend/.env` o dashboard Vercel)

| Variable | Descripción |
| --- | --- |
| `SUPABASE_URL` | URL del proyecto Supabase. |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (solo en servidor). |
| `SUPABASE_JWT_SECRET` | Opcional: acelera la verificación de JWT. |
| `CORS_EXTRA_ORIGINS` | Opcional: orígenes adicionales separados por coma. |

> Aplicar el esquema en `backend/supabase_schema.sql` desde el SQL Editor de Supabase. Las tablas no se auto-crean.

## Iconos PWA

Para iOS / Android instalable, generar PNG a partir de `frontend/public/favicon.svg`:

- `frontend/public/apple-touch-icon.png` (180×180)
- `frontend/public/icon-192.png` (192×192)
- `frontend/public/icon-512.png` (512×512)

Después agregar las entradas correspondientes en `index.html` (`apple-touch-icon`) y en `site.webmanifest` (`icons` con `purpose: "any"` y `"maskable"`).

## Comandos

```bash
# Frontend (en frontend/)
npm install
npm run dev            # http://localhost:5173 (proxy /api → 127.0.0.1:8000)
npm run build
npm run lint

# Backend (en backend/)
python -m venv .venv && .venv\Scripts\activate    # Windows
pip install -r requirements.txt
uvicorn server:app --reload --host 127.0.0.1 --port 8000
```
