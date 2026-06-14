"""Normalize hadith source citations for print cards."""

SOURCE_MAP = {
    "Muslim": "Sahih Muslim",
    "Bukhārī": "Sahih al-Bukhari",
    "Bukhari": "Sahih al-Bukhari",
    "Tirmidhī": "Jamiʿ al-Tirmidhi",
    "Tirmidhi": "Jamiʿ al-Tirmidhi",
    "Abū Dāwūd": "Sunan Abi Dawud",
    "Abu Dawud": "Sunan Abi Dawud",
    "Razīn": "Razin",
    "Bayhaqī": "al-Bayhaqi",
    "Bayhaqi": "al-Bayhaqi",
    "Shuʿab al-īmān": "Shuʿab al-Iman",
    "Shu'ab al-iman": "Shuʿab al-Iman",
    "Nasā'ī": "Sunan al-Nasa'i",
    "Nasai": "Sunan al-Nasa'i",
    "Dāramī": "Sunan al-Darimi",
    "Darimi": "Sunan al-Darimi",
    "Ibn Māja": "Sunan Ibn Majah",
    "Ibn Maja": "Sunan Ibn Majah",
    "Ṭabarānī": "al-Tabarani",
    "Tabarani": "al-Tabarani",
    "Al-Muʿjam al-kabīr": "al-Mu'jam al-Kabir",
    "Mustadrak": "al-Mustadrak",
    "Dāraquṭnī": "al-Daraqutni",
    "Daraqutni": "al-Daraqutni",
    "Aḥmad": "Musnad Ahmad",
    "Ahmad": "Musnad Ahmad",
    "Al-Adab al-Mufrad": "al-Adab al-Mufrad",
    "Ibn Ḥibbān": "Ibn Hibban",
    "Ibn Hibban": "Ibn Hibban",
    "Bukhārī without a chain [taʿlīqan]": "Sahih al-Bukhari (ta'liqan)",
}


def normalize_source(raw: str) -> str:
    """Convert parenthetical source string to readable citation."""
    parts = [p.strip() for p in raw.replace("\n", " ").split(",")]
    normalized = []
    for part in parts:
        mapped = SOURCE_MAP.get(part, part)
        if mapped not in normalized:
            normalized.append(mapped)

    if len(normalized) == 1:
        return normalized[0]
    if len(normalized) == 2:
        return f"{normalized[0]} & {normalized[1]}"
    return ", ".join(normalized[:-1]) + " & " + normalized[-1]
