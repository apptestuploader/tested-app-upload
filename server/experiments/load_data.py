import json
import os.path

import pandas


class Files:
    items = "items.json"
    menuitems = "menuitems.json"
    orders = "orders.json"
    tasks = "tasks.json"
    reservations = "reservations.json"


def load(file: str):
    data_path = os.path.join(
        os.path.dirname(__file__),
        "data",
        "transformed",
        file,
    )
    with open(data_path) as f:
        data = json.load(f)

    return data


def to_pandas(data: list[dict]) -> pandas.DataFrame:
    frame = pandas.DataFrame(data)
    frame.set_index("_id", inplace=True)

    return frame
