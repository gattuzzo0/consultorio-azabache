import asyncio
import logging

from fastapi import APIRouter, status
from fastapi.responses import JSONResponse

from api.appointments_routes import appointments_router
from api.config import is_database_configured
from api.supabase_client import get_supabase

logger = logging.getLogger(__name__)

api_router = APIRouter()
api_router.include_router(appointments_router, prefix="/appointments")


@api_router.get("/health")
async def health():
    if not is_database_configured():
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={"ok": False, "detail": "Base de datos no configurada"},
        )

    def ping():
        get_supabase().table("appointments").select("id").limit(1).execute()

    try:
        await asyncio.to_thread(ping)
    except Exception:
        logger.exception("Health check: fallo al consultar Supabase")
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={"ok": False, "detail": "No se pudo conectar a Supabase"},
        )

    return {"ok": True, "database": "connected"}
