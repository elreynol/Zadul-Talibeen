#!/usr/bin/env python3
"""Clean OCR junk and fix typos in data/commentary.yaml."""

from __future__ import annotations

import re
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
COMMENTARY_PATH = ROOT / "data" / "commentary.yaml"

TYPO_REPLACEMENTS = [
    (r"\bal-nastha\b", "al-nasiha"),
    (r"\(duft\)", "(du'a)"),
    (r"\bhadlth\b", "hadith"),
    (r"\bwili\b", "will"),
    (r"\bnazdfa\b", "nadhafa"),
    (r"\bTyad\b", "Tiyad"),
    (r"\bHaytaml\b", "Haytami"),
    (r"\bKhattabI\b", "Khattabi"),
    (r"\bmundfiq\b", "munafiq"),
    (r"\bal-''Asqalanl\b", "al-'Asqalani"),
    (r"\bal-'Asqalanl\b", "al-'Asqalani"),
    (r"\bFath al-Bdri\b", "Fath al-Bari"),
    (r"Al-Jdmi[''']li ahkdm", "al-Jami' li-ahkam"),
    (r"\bahkdm\b", "ahkam"),
    (r"\bTkrima\b", "Ikrimah"),
    (r"\bQur an\b", "Qur'an"),
    (r"\bQuran\b", "Qur'an"),
    (r"\bmens\b", "men's"),
    (r"\bwomens\b", "women's"),
    (r"\ba persons mind\b", "a person's mind"),
    (r"\bdoing ones best\b", "doing one's best"),
    (r"\bones voice\b", "one's voice"),
    (r"\bisldm\b", "islam"),
    (r"\bma c azif\b", "ma'azif"),
    (r"\bc ud\b", "'ud"),
    (r"Mulla c Ali", "Mulla 'Ali"),
    (r"Mulla 'All al-Qarl", "Mulla 'Ali al-Qari"),
    (r"Mulla ''Ali al-Qarl", "Mulla 'Ali al-Qari"),
    (r"c Allama", "'Allama"),
    (r"fard c ayn", "fard 'ayn"),
    (r"\{fard kifaya\)", "(fard kifaya)"),
    (r"\bTd\b", "'Id"),
    (r"Al-hamdu li 'Lldh", "Al-hamdu li-Llah"),
    (r"Messenger of Allah ife", "Messenger of Allah ﷺ"),
    (r"Messenger of Allah &", "Messenger of Allah ﷺ"),
    (r"Messenger of Allah St", "Messenger of Allah ﷺ"),
    (r"Messenger of Allah #", "Messenger of Allah ﷺ"),
    (r"Messenger of Allah ®", "Messenger of Allah ﷺ"),
    (r"Allah['']s Messenger S\b", "Allah's Messenger ﷺ"),
    (r"\bal-Qarl\b", "al-Qari"),
    (r"His Messenger S\b", "His Messenger ﷺ"),
    (r"the Messenger &", "the Messenger ﷺ"),
    (r"the Messenger #", "the Messenger ﷺ"),
    (r"The Messenger #", "The Messenger ﷺ"),
    (r"Messenger &", "Messenger ﷺ"),
    (r"authority of'All\b", "authority of 'Ali"),
    (r"£>", ""),
    (r"''Abdullah", "'Abdullah"),
    (r"ibn Mas''ud", "ibn Mas'ud"),
    (r"ibn Mas'' ud", "ibn Mas'ud"),
    (r"haya''", "haya'"),
    (r"\{Mirqat", "(Mirqat"),
    (r"mafatlh", "mafatih"),
    (r"Ibn ''Abbas", "Ibn 'Abbas"),
    (r"Ibn ''Umar", "Ibn 'Umar"),
    (r"''Allama", "'Allama"),
    (r"Mulla ''All", "Mulla 'Ali"),
    (r"4s>", ""),
    (r"4 \*", ""),
    (r"\(\s*makruh\s*\)", "(makruh)"),
    (r"\(\s*ajnabiyya\s*\)", "(ajnabiyya)"),
    (r"\(\s*wudu\s*\)", "(wudu)"),
    (r"\(\s*tahara\s*\)", "(tahara)"),
    (r"\(\s*nafl\s*\)", "(nafl)"),
    (r"\(\s*awrad\s*\)", "(awrad)"),
    (r"\(\s*nadhafa\s*\)", "(nadhafa)"),
    (r"\(\s*hadath", "(hadath"),
    (r"ibn Mas' ud\b", "ibn Mas'ud"),
    (r'"Your Lord to not find you"', '"Let not Allah find you"'),
    (r"\[ Al-hamdu li-Llah\], The", "[Al-hamdu li-Llah]. The"),
    (r"Moderation in spending\.\.", "Moderation in spending…"),
]

INLINE_JUNK_RE = [
    re.compile(r"\b\d+\s+fsad\b", re.I),
    re.compile(r"\b\d+\s+psai\b", re.I),
    re.compile(r"\b\d+\s+f==[}\]]?\b", re.I),
    re.compile(r"^\d+\s*\*==\d+\s*$", re.M),
    re.compile(r"\\\s+"),
]

JUNK_LINE_RE = re.compile(
    r"^("
    r"[\d\s]*(?:psai|fsad|f==[}\]]?).*|"
    r".*[\{\}\\^*=<>].*|"
    r".*[»«].*|"
    r"[\d\s•\"'*^,\\-]+|"
    r"[A-Za-z]{1,2}\s*[\{\}\\^*=<>].*|"
    r".*\b(jUaUJl|QJUJlp|oujNi|oiklsi|jikln|dj-fr|LloJI|Jjjjl|dtlp|ppJS|iuuJji|jJljJl|llkll|lliL)\b.*|"
    r".*[Jj][\]\)>\\^].*|"
    r"Another Form of|"
    r"^\s*of'\s*$|"
    r"^\s*&\s*$"
    r")$",
    re.IGNORECASE,
)


def is_junk_paragraph(text: str) -> bool:
    stripped = text.strip()
    if not stripped:
        return True
    if len(stripped) < 4:
        return True
    if JUNK_LINE_RE.match(stripped):
        return True

    letters = sum(ch.isalpha() for ch in stripped)
    if letters == 0:
        return True

    weird = sum(ch in "{}\\^*=<>|[]" for ch in stripped)
    if weird >= 2 and letters < len(stripped) * 0.5:
        return True

    if len(stripped) < 40 and re.search(r"[A-Za-z].*\d|\d.*[A-Za-z]", stripped):
        if not re.search(r"\b(hadith|Allah|Qur'an|Imam|Messenger)\b", stripped, re.I):
            return True

    return False


def normalize_text(text: str) -> str:
    text = text.replace("\u2019", "'").replace("\u2018", "'")
    text = text.replace("\u00ac\n", "").replace("\u00ac", "")
    text = text.replace("\\\n", "\n")
    text = re.sub(r"[ \t]+\n", "\n", text)

    for pattern in INLINE_JUNK_RE:
        text = pattern.sub("", text)

    for pattern, repl in TYPO_REPLACEMENTS:
        text = re.sub(pattern, repl, text)

    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"  +", " ", text)
    text = re.sub(r" +\.", ".", text)
    return text.strip()


def clean_commentary(text: str) -> str:
    text = normalize_text(text)
    paragraphs = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]
    cleaned = [p for p in paragraphs if not is_junk_paragraph(p)]
    return "\n\n".join(cleaned)


def write_commentary(rows: list[dict]) -> None:
    lines = []
    for row in rows:
        lines.append(f"- id: {row['id']}")
        commentary = row.get("commentary", "") or ""
        if not commentary:
            lines.append("  commentary: ''")
            continue
        lines.append("  commentary: |")
        for line in commentary.splitlines():
            lines.append(f"    {line}")
        lines.append("")
    COMMENTARY_PATH.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")


def main() -> None:
    rows = yaml.safe_load(COMMENTARY_PATH.read_text(encoding="utf-8")) or []
    changed = 0
    for row in rows:
        original = row.get("commentary", "") or ""
        updated = clean_commentary(original)
        if updated != original.strip():
            changed += 1
        row["commentary"] = updated

    write_commentary(rows)
    print(f"Cleaned {changed} commentary entries in {COMMENTARY_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
