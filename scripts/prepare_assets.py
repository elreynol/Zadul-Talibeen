#!/usr/bin/env python3
"""Extract print overlays from mockup PNGs.

Each overlay keeps borders and botanical artwork but makes the text
regions transparent so real hadith copy sits on a solid background.
"""

from __future__ import annotations

from pathlib import Path

import yaml
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OVERLAYS = ROOT / "assets" / "overlays"
THEMES = ROOT / "assets" / "themes.yaml"

IMAGE2_IDS = [
    "cream",
    "mint",
    "blush",
    "sky",
    "wheat",
    "lavender",
    "teal",
    "peach",
    "slate",
]


def text_bands(cell: Image.Image) -> list[tuple[float, float]]:
    w, h = cell.size
    rows: list[int] = []
    for y in range(h):
        dark = sum(
            1
            for x in range(int(w * 0.12), int(w * 0.88))
            if sum(cell.getpixel((x, y))[:3]) < 420
        )
        rows.append(dark)

    bands: list[tuple[int, int]] = []
    in_band = False
    start = 0
    y0, y1 = int(h * 0.12), int(h * 0.93)
    for y in range(y0, y1):
        if rows[y] > w * 0.06:
            if not in_band:
                start = y
                in_band = True
        elif in_band:
            bands.append((start, y))
            in_band = False
    if in_band:
        bands.append((start, y1))
    return [(a / h, b / h) for a, b in bands]


def detect_zones(cell: Image.Image) -> dict[str, tuple[float, float, float, float]]:
    bands = text_bands(cell)
    upper = [b for b in bands if b[1] <= 0.66]
    lower = [b for b in bands if b[0] >= 0.66]

    if not upper or not lower:
        return {
            "arabic": (0.08, 0.34, 0.92, 0.58),
            "english": (0.08, 0.72, 0.92, 0.86),
        }

    ar_top = max(0.10, min(b[0] for b in upper) - 0.055)
    ar_bot = min(0.66, max(b[1] for b in upper) + 0.025)
    en_top = max(0.66, min(b[0] for b in lower) - 0.015)
    en_bot = min(0.92, max(b[1] for b in lower) + 0.025)

    return {
        "arabic": (0.08, ar_top, 0.92, ar_bot),
        "english": (0.08, en_top, 0.92, en_bot),
    }


def sample_bg(cell: Image.Image) -> str:
    w, h = cell.size
    pixels = []
    for x in range(int(w * 0.2), int(w * 0.8), 4):
        for y in (int(h * 0.3), int(h * 0.5), int(h * 0.7)):
            pixels.append(cell.getpixel((x, y))[:3])
    rs = sorted(p[0] for p in pixels)
    gs = sorted(p[1] for p in pixels)
    bs = sorted(p[2] for p in pixels)
    m = len(rs) // 2
    return f"#{rs[m]:02x}{gs[m]:02x}{bs[m]:02x}"


def make_overlay(cell: Image.Image, zones: dict) -> Image.Image:
    im = cell.convert("RGBA")
    px = im.load()
    w, h = im.size
    ar = zones["arabic"]
    en = zones["english"]

    def clear_rect(box: tuple[float, float, float, float]) -> None:
        x0 = int(w * box[0])
        y0 = int(h * box[1])
        x1 = int(w * box[2])
        y1 = int(h * box[3])
        for y in range(y0, y1):
            for x in range(x0, x1):
                r, g, b, _ = px[x, y]
                px[x, y] = (r, g, b, 0)

    clear_rect(ar)
    clear_rect(en)
    clear_rect((ar[0], ar[3], ar[2], en[1]))  # gap / divider

    # Remove stray mockup glyphs in the text column
    for y in range(int(h * 0.10), int(h * 0.92)):
        for x in range(int(w * 0.10), int(w * 0.90)):
            r, g, b, a = px[x, y]
            if a and r + g + b < 520:
                px[x, y] = (r, g, b, 0)

    return im


def process_cell(cell: Image.Image, theme_id: str) -> dict:
    zones = detect_zones(cell)
    overlay = make_overlay(cell, zones)
    fname = f"{theme_id}.png"
    overlay.save(OVERLAYS / fname, optimize=True)
    return {
        "id": theme_id,
        "overlay": fname,
        "bg": sample_bg(cell),
        "zones": {
            "arabic": list(zones["arabic"]),
            "english": list(zones["english"]),
        },
    }


def from_image2() -> list[dict]:
    src = Image.open(ROOT / "image2.png").convert("RGB")
    gw, gh = src.size
    cw, ch = gw // 3, gh // 3
    themes = []
    for i, theme_id in enumerate(IMAGE2_IDS):
        r, c = divmod(i, 3)
        cell = src.crop((c * cw, r * ch, (c + 1) * cw, (r + 1) * ch))
        themes.append(process_cell(cell, theme_id))
    return themes


def from_master() -> dict:
    src = Image.open(ROOT / "image.png").convert("RGB")
    w, h = src.size
    card = src.crop((118, 118, w - 118, h - 118))
    return process_cell(card, "master")


def main() -> None:
    OVERLAYS.mkdir(parents=True, exist_ok=True)
    themes = from_image2()
    themes.append(from_master())
    THEMES.write_text(yaml.dump(themes, sort_keys=False, allow_unicode=True), encoding="utf-8")
    print(f"Prepared {len(themes)} overlays → {OVERLAYS}")


if __name__ == "__main__":
    main()
