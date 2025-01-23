import pandas

from experiments.items.names_to_merge import Merger


def drop_empty(frame: pandas.DataFrame) -> pandas.DataFrame:
    return frame[frame.name != ""]


def format_quantity(frame: pandas.DataFrame) -> pandas.DataFrame:
    def mapper(value: str) -> float:

        if value:
            return float(value)
        return 1

    frame = frame.copy()
    frame.quantity = frame.quantity.map(mapper)
    return frame


def format_prices(frame: pandas.DataFrame) -> pandas.DataFrame:
    def mapper(price: str) -> int:
        try:
            f = float(price)
        except ValueError:
            return 0

        if pandas.isna(f):
            return 0

        return int(f * 100)

    frame = frame.copy()  # to prevent SettingWithCopyWarning
    frame.loc[:, "price"] = frame.price.map(mapper).astype("int64")
    frame.loc[:, "discountedPrice"] = frame.discountedPrice.map(mapper).astype("int64")
    frame = frame.copy()

    return frame


def format_names(frame: pandas.DataFrame) -> pandas.DataFrame:
    def mapper(name: str):
        return name.lower()

    frame.name = frame.name.map(mapper)

    return frame


def merge_names(frame: pandas.DataFrame, options: Merger) -> pandas.DataFrame:
    frame.name = frame.name.replace(
        to_replace=options.names,
        value=options.target,
    )
    return frame


def main(frame: pandas.DataFrame) -> pandas.DataFrame:
    return (
        frame.pipe(drop_empty)
        .pipe(format_quantity)
        .pipe(format_prices)
        .pipe(format_names)
    )
