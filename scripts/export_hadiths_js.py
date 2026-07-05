#!/usr/bin/env python3
"""Export data/hadiths.yaml to web/hadiths.js for the interactive site."""

from __future__ import annotations

import json
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
YAML_PATH = ROOT / "data" / "hadiths.yaml"
COMMENTARY_PATH = ROOT / "data" / "commentary.yaml"
OUT_PATH = ROOT / "web" / "hadiths.js"


def main() -> None:
    hadiths = yaml.safe_load(YAML_PATH.read_text(encoding="utf-8"))
    if COMMENTARY_PATH.exists():
        commentary_rows = yaml.safe_load(COMMENTARY_PATH.read_text(encoding="utf-8")) or []
        by_id = {row["id"]: row.get("commentary", "") for row in commentary_rows}
        for hadith in hadiths:
            hadith["commentary"] = by_id.get(hadith["id"], "")
    payload = json.dumps(hadiths, ensure_ascii=False, indent=2)
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(f"const hadiths = {payload};\n", encoding="utf-8")
    print(f"Wrote {len(hadiths)} hadiths to {OUT_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
