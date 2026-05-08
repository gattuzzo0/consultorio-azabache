import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.router import api_router

app = FastAPI(title="Consultorio Azabache API", version="0.1.0")

_base_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
]
_extra = os.getenv("CORS_EXTRA_ORIGINS", "")
_extra_origins = [o.strip() for o in _extra.split(",") if o.strip()]
_origins = list(dict.fromkeys(_base_origins + _extra_origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_origin_regex=r"^https://[\w.-]+\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")


@app.get("/")
def root():
    return {
        "service": "consultorio-azabache-api",
        "docs": "/docs",
        "corsProfile": "origins-plus-vercel-app-regex",
    }
