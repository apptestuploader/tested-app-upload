import pandas


def format_prices(frame: pandas.DataFrame) -> pandas.DataFrame:
    def mapper(price: str) -> int:
        try:
            f = float(price)
        except ValueError:
            return 0

        if pandas.isna(f):
            return 0

        return int(f * 100)

    frame = frame.copy()

    frame.loc[:, "sum"] = frame["sum"].map(mapper).astype("int64")
    frame.loc[:, "discountedSum"] = frame.discountedSum.map(mapper).astype("int64")

    return frame


def main(frame: pandas.DataFrame) -> pandas.DataFrame:
    return frame.pipe(format_prices)
