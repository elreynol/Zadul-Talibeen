# AGENTS.md

## Cursor Cloud specific instructions

This repo is a static **hadith-card generator** (no server, database, or env vars). It has two related products built from the same content:

- **Print pipeline (Python)** — `scripts/` reads `data/hadiths.yaml`, extracts decorative overlays from `image.png`/`image2.png` into `assets/overlays/` + `assets/themes.yaml`, and renders `output/hadith-cards-print.html` and `.pdf`.
- **Web preview (static)** — `hadith-cards/` renders the same content (from its own `hadith-cards/hadiths.js`) as a 6-page printable layout.

Dependencies are just `PyYAML` + `Pillow` (installed by the startup update script `pip install -r requirements.txt`). Run all Python scripts from the repo root; they resolve paths relative to it.

### Print pipeline (Product A)

- Regenerate data/overlays: `python3 scripts/generate_yaml.py` then `python3 scripts/prepare_assets.py`.
- `python3 scripts/build.py` regenerates overlays and writes `output/hadith-cards-print.html`, **then fails the PDF step on Linux**: `build.py` hardcodes the macOS Chrome path (`CHROME = /Applications/Google Chrome.app/...`), so `html_to_pdf()` raises `SystemExit("Google Chrome is required for PDF export.")`. The HTML is written before that error, so it is still produced.
- To produce the PDF on this Linux VM without editing code, run the same command `build.py` would, pointed at the installed Chrome. Chrome is preinstalled as `google-chrome` (also `google-chrome-stable`):
  ```bash
  google-chrome --headless=new --no-sandbox --disable-gpu --no-pdf-header-footer \
    --user-data-dir="$(mktemp -d)" \
    --print-to-pdf=output/hadith-cards-print.pdf \
    "file://$PWD/output/hadith-cards-print.html"
  ```
- Chrome gotchas in this environment: pass `--no-sandbox` and always use a fresh `--user-data-dir` (a stale `~/.config/google-chrome/SingletonLock` otherwise aborts startup). Headless Chrome may not exit cleanly (the process can hang) even after it has already written the PDF/screenshot — check for the output file rather than trusting a clean exit.

### Web preview (Product B)

- Must be served over HTTP from the repo root (browsers block `file://` loads of `hadiths.js`): `python3 -m http.server 8000`, then open `http://localhost:8000/hadith-cards/`.

### Lint / test

- There is no configured linter, test suite, or CI in this repo. "Verification" is running the scripts and visually checking `output/` and the web preview.
