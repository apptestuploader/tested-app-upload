import pandas


def format_prices(frame: pandas.DataFrame, column: str) -> pandas.DataFrame:
    def mapper(price: str) -> int:
        price = price.replace(",", ".")
        try:
            f = float(price)
        except ValueError:
            return 0

        if pandas.isna(f):
            return 0

        return int(round(f * 100, 0))

    frame = frame.copy()

    frame.loc[:, column] = frame[column].map(mapper).astype("int64")

    return frame


def split_prices(frame: pandas.DataFrame) -> pandas.DataFrame:

    frame = frame.copy()
    frame["price_default"] = frame.prices.apply(lambda entry: entry["default"])
    frame["price_gaiwan"] = frame.prices.apply(lambda entry: entry["gaiwan"])
    frame["price_package"] = frame.prices.apply(lambda entry: entry["package"])
    frame["price_bulk"] = frame.prices.apply(lambda entry: entry["bulk"])
    frame = frame.drop("prices", axis=1)
    return frame


def main(frame: pandas.DataFrame) -> pandas.DataFrame:
    return (
        frame.pipe(split_prices)
        .pipe(
            format_prices,
            "price_default",
        )
        .pipe(
            format_prices,
            "price_gaiwan",
        )
        .pipe(
            format_prices,
            "price_package",
        )
        .pipe(
            format_prices,
            "price_bulk",
        )
    )
