import json
from pfandexploit.netto import generate_netto_code
from datetime import datetime
from .resources import


with open("bons.json", "r") as file:
    BONS = json.load(file)


def test_netto_codes():
    for bon in BONS:
        if bon.get("market") != "Netto":
            continue

        bon_date = datetime.strptime(bon["date"], "%Y-%m-%d %H:%M")
        code = generate_netto_code(bon["bon"], bon["price"],  bon_date, bon["store"])
        assert bon["code"] == code
