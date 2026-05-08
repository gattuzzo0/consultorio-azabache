import os
from functools import lru_cache

from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))


def _env(*names: str) -> str | None:
    for n in names:
        v = os.getenv(n)
        if v:
            return v.strip()
    return None


@lru_cache
def get_supabase_url() -> str | None:
    return _env(
        "SUPABASE_URL",
        "supabase_SUPABASE_URL",
        "NEXT_PUBLIC_SUPABASE_URL",
    )


@lru_cache
def get_supabase_service_role_key() -> str | None:
    return _env(
        "SUPABASE_SERVICE_ROLE_KEY",
        "supabase_SUPABASE_SERVICE_ROLE_KEY",
    )


@lru_cache
def get_supabase_jwt_secret() -> str | None:
    return _env("SUPABASE_JWT_SECRET", "JWT_SECRET")


def is_database_configured() -> bool:
    return bool(get_supabase_url() and get_supabase_service_role_key())
