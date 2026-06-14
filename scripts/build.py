#!/usr/bin/env python3
"""Build printable hadith cards (A4, 2×4 grid) from verified YAML + mockup overlays."""

from __future__ import annotations

import html
import math
import subprocess
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
OVERLAYS = ASSETS / "overlays"
OUT = ROOT / "output"
CHROME = Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")

CARDS_PER_PAGE = 8
IMAGE2_COUNT = 9


def load_themes() -> list[dict]:
    return yaml.safe_load((ASSETS / "themes.yaml").open(encoding="utf-8"))


def pick_theme(themes: list[dict], index: int) -> dict:
    if index % 10 == 9:
        for t in themes:
            if t["id"] == "master":
                return t
    return themes[index % IMAGE2_COUNT]


def ar_size(text: str) -> str:
    n = len(text)
    if n > 110:
        return "10pt"
    if n > 70:
        return "11.5pt"
    if n > 40:
        return "13.5pt"
    return "15.5pt"


def en_size(text: str) -> str:
    n = len(text)
    if n > 170:
        return "6.8pt"
    if n > 120:
        return "7.4pt"
    if n > 80:
        return "8pt"
    return "8.6pt"


def text_box(theme: dict) -> str:
    z = theme.get("zones", {})
    ar = z.get("arabic", [0.08, 0.34, 0.92, 0.58])
    en = z.get("english", [0.08, 0.72, 0.92, 0.86])
    return (
        f"top:{ar[1]*100:.1f}%;"
        f"bottom:{(1-en[3])*100:.1f}%;"
        f"left:{ar[0]*100:.1f}%;"
        f"right:{(1-ar[2])*100:.1f}%"
    )


def uri(path: Path) -> str:
    return path.resolve().as_uri()


def card_markup(hadith: dict, index: int, themes: list[dict]) -> str:
    theme = pick_theme(themes, index)
    overlay = uri(OVERLAYS / theme["overlay"])
    return f"""
    <article class="card" style="background:{theme['bg']}">
      <img class="overlay" src="{overlay}" alt="">
      <div class="copy" style="{text_box(theme)}">
        <p class="arabic" style="font-size:{ar_size(hadith['arabic'])}">{html.escape(hadith['arabic'])}</p>
        <p class="english" style="font-size:{en_size(hadith['english'])}">{html.escape(hadith['english'])}</p>
        <p class="source">{html.escape(hadith['source'])}</p>
      </div>
    </article>"""


def build_html(hadiths: list[dict], themes: list[dict]) -> str:
    pages = []
    for page_start in range(0, len(hadiths), CARDS_PER_PAGE):
        chunk = hadiths[page_start : page_start + CARDS_PER_PAGE]
        cards = "".join(
            card_markup(h, page_start + i, themes) for i, h in enumerate(chunk)
        )
        for _ in range(CARDS_PER_PAGE - len(chunk)):
            cards += '<article class="card card--empty"></article>'
        pages.append(f'<section class="page">{cards}</section>')

    scheh = uri(ASSETS / "fonts/ScheherazadeNew-Regular.ttf")
    corm = uri(ASSETS / "fonts/CormorantGaramond-Regular.ttf")
    corm_i = uri(ASSETS / "fonts/CormorantGaramond-Italic.ttf")

    return f"""<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="utf-8">
<title>Hadith Cards — Zad al-Talibin (1–60)</title>
<style>
@font-face {{ font-family: Scheherazade; src: url("{scheh}"); }}
@font-face {{ font-family: Cormorant; src: url("{corm}"); }}
@font-face {{ font-family: Cormorant; src: url("{corm_i}"); font-style: italic; }}

* {{ box-sizing: border-box; margin: 0; padding: 0; }}
@page {{ size: A4 portrait; margin: 5mm; }}
html, body {{ margin: 0; }}
body {{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }}

.page {{
  width: 200mm;
  height: 287mm;
  display: grid;
  grid-template-columns: 99mm 99mm;
  grid-template-rows: repeat(4, 70.25mm);
  gap: 2mm;
  page-break-after: always;
}}
.page:last-child {{ page-break-after: auto; }}

.card {{
  position: relative;
  width: 99mm;
  height: 70.25mm;
  border-radius: 3.2mm;
  overflow: hidden;
  outline: 0.25pt dashed #bdbdbd;
  outline-offset: -0.25pt;
}}
.card--empty {{ visibility: hidden; outline: none; background: none !important; }}

.overlay {{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  pointer-events: none;
}}

.copy {{
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5mm;
  z-index: 1;
}}

.arabic {{
  font-family: Scheherazade, "Traditional Arabic", serif;
  direction: rtl;
  color: #111;
  line-height: 1.14;
  width: 100%;
}}

.english {{
  font-family: Cormorant, Georgia, serif;
  color: #1a1a1a;
  line-height: 1.08;
  width: 100%;
}}

.source {{
  font-family: Cormorant, Georgia, serif;
  font-style: italic;
  font-size: 5.5pt;
  color: #3a3a3a;
  width: 100%;
  margin-top: 0.6mm;
  line-height: 1.05;
}}
</style>
</head>
<body>
{"".join(pages)}
</body>
</html>"""


def html_to_pdf(html_path: Path, pdf_path: Path) -> None:
    if not CHROME.exists():
        raise SystemExit("Google Chrome is required for PDF export.")
    subprocess.run(
        [
            str(CHROME),
            "--headless=new",
            "--disable-gpu",
            "--no-pdf-header-footer",
            f"--print-to-pdf={pdf_path}",
            html_path.as_uri(),
        ],
        check=True,
        capture_output=True,
    )


def main() -> None:
    from prepare_assets import main as prepare

    prepare()

    hadiths = sorted(
        yaml.safe_load((ROOT / "data/hadiths.yaml").open(encoding="utf-8")),
        key=lambda x: x["id"],
    )
    themes = load_themes()
    OUT.mkdir(exist_ok=True)

    html_path = OUT / "hadith-cards-print.html"
    pdf_path = OUT / "hadith-cards-print.pdf"
    html_path.write_text(build_html(hadiths, themes), encoding="utf-8")
    html_to_pdf(html_path, pdf_path)
    print(f"Wrote {pdf_path} ({math.ceil(len(hadiths) / CARDS_PER_PAGE)} pages, {len(hadiths)} cards)")


if __name__ == "__main__":
    main()
