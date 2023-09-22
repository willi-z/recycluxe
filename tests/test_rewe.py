import json
from pfandexploit.rewe import generate_rewe_code
from datetime import datetime


with open("bons.json", "r") as file:
    BONS = json.load(file)


def test_rewe_codes():
    for bon in BONS:
        if bon.get("market") != "REWE":
            continue

        bon_date = datetime.strptime(bon["date"], "%Y-%m-%d %H:%M")
        code = generate_rewe_code(bon["bon"], bon["price"],  bon_date, bon["store"])
        assert bon["code"] == code
