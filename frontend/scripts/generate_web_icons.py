"""Genera apple-touch-icon.png, icon-192.png e icon-512.png desde favicon.svg."""
from __future__ import annotations

import base64
import io
import re
from pathlib import Path

from PIL import Image

PUBLIC = Path(__file__).resolve().parents[1] / "public"


def load_logo_from_favicon() -> Image.Image:
    svg = (PUBLIC / "favicon.svg").read_text(encoding="utf-8")
    match = re.search(r"base64,([^\"]+)", svg)
    if not match:
        raise RuntimeError("favicon.svg no contiene PNG embebido")
    return Image.open(io.BytesIO(base64.b64decode(match.group(1)))).convert("RGBA")


def save_square(img: Image.Image, size: int, filename: str) -> None:
    canvas = Image.new("RGB", (size, size), (255, 255, 255))
    padding = max(8, int(size * 0.1))
    max_w = size - 2 * padding
    max_h = size - 2 * padding
    ratio = min(max_w / img.width, max_h / img.height)
    new_w = max(1, int(img.width * ratio))
    new_h = max(1, int(img.height * ratio))
    resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    layer = Image.new("RGBA", (new_w, new_h), (255, 255, 255, 0))
    layer.paste(resized, (0, 0), resized)
    flat = Image.new("RGB", (new_w, new_h), (255, 255, 255))
    flat.paste(layer, mask=layer.split()[3])
    canvas.paste(flat, ((size - new_w) // 2, (size - new_h) // 2))
    canvas.save(PUBLIC / filename, format="PNG", optimize=True)
    print(f"Wrote {filename} ({size}x{size})")


def main() -> None:
    logo = load_logo_from_favicon()
    save_square(logo, 180, "apple-touch-icon.png")
    save_square(logo, 192, "icon-192.png")
    save_square(logo, 512, "icon-512.png")


if __name__ == "__main__":
    main()
