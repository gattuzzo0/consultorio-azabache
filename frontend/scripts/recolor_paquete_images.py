"""Recolorea acentos teal/verde de imágenes de paquetes a naranja ROGA (#F1732D)."""
from __future__ import annotations

import colorsys
from pathlib import Path

from PIL import Image

ASSETS = Path(__file__).resolve().parents[1] / "src" / "assets" / "paquetes"
PUBLIC = Path(__file__).resolve().parents[1] / "public" / "paquetes"

# Naranja marca ROGA
BRAND_ORANGE = (0xF1, 0x73, 0x2D)
BRAND_HUE = colorsys.rgb_to_hsv(BRAND_ORANGE[0] / 255, BRAND_ORANGE[1] / 255, BRAND_ORANGE[2] / 255)[0]

FILES = [
    "paquete-chequeo-basico-i.png",
    "paquete-chequeo-basico-ii.png",
    "paquete-chequeo-general.png",
    "paquete-covid-influenza.png",
    "paquete-dengue.png",
    "paquete-jueves-perfiles.png",
    "paquete-lunes-diabetes.png",
    "paquete-miercoles-urinario.png",
]


def should_recolor(h: float, s: float, v: float, r: int, g: int, b: int) -> bool:
    """True si el píxel pertenece a acentos teal/verde (no fondo oscuro neutro)."""
    if s < 0.14:
        return False
    if v < 0.14:
        return False

    deg = h * 360
    # Banda teal → verde (acentos de las ilustraciones)
    if 125 <= deg <= 215:
        return True

    # Refuerzo: dominancia verde/cian con saturación moderada
    if g > r + 8 and g >= b - 5 and s >= 0.18 and v >= 0.22:
        return True

    return False


def recolor_pixel(r: int, g: int, b: int) -> tuple[int, int, int]:
    h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)

    if not should_recolor(h, s, v, r, g, b):
        return r, g, b

    deg = h * 360
    # Mapear 125°–215° → banda naranja centrada en la marca
    t = max(0.0, min(1.0, (deg - 125) / 90))
    # Sombras más cálidas, highlights más cerca del naranja puro
    new_deg = 12 + t * 28
    new_h = new_deg / 360
    new_s = min(1.0, max(s, 0.35) * (1.02 + 0.08 * (1 - v)))
    new_v = v

    nr, ng, nb = colorsys.hsv_to_rgb(new_h, new_s, new_v)
    return int(round(nr * 255)), int(round(ng * 255)), int(round(nb * 255))


def recolor_image(path: Path) -> None:
    img = Image.open(path).convert("RGB")
    pixels = img.load()
    width, height = img.size

    for y in range(height):
        for x in range(width):
            pixels[x, y] = recolor_pixel(*pixels[x, y])

    img.save(path, format="PNG", optimize=True)
    print(f"Recolored {path.name} ({width}x{height})")


def main() -> None:
    import shutil

    for name in FILES:
        asset_path = ASSETS / name
        if not asset_path.is_file():
            raise FileNotFoundError(asset_path)

        recolor_image(asset_path)

        if PUBLIC.parent.is_dir():
            PUBLIC.mkdir(parents=True, exist_ok=True)
            shutil.copy2(asset_path, PUBLIC / name)
            print(f"Synced to public/paquetes/{name}")

    print(f"Done — brand hue target ~{BRAND_HUE * 360:.0f}° (#F1732D)")


if __name__ == "__main__":
    main()
