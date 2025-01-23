import pandas
import plotly.express as px


def price_per_piece(frame: pandas.DataFrame, selector) -> pandas.Series:
    ppp = (
        (
            frame[selector].price
            / (frame[selector].quantity.map(lambda x: x if x > 0 else 1))
        )
        .astype("int64")
        .to_frame("ppp")
        .join(frame[selector].type)
    )

    return ppp


def plot_prices(
    frame: pandas.DataFrame,
    name: str,
    series: str,
    contains: bool = True,
    exclude: list[str] = None,
) -> None:
    if exclude:
        exclusion = ~frame.name.isin(exclude)
    else:
        exclusion = True
    if contains:
        selector = frame.name.str.contains(name) & exclusion
    else:
        selector = frame.name == name

    ppp_frame = price_per_piece(frame, selector=selector)
    ppp_frame = ppp_frame.join(frame[selector].createdAt)
    fig = px.scatter(ppp_frame, x=series, y="ppp", color="type", symbol="type")
    fig.show()

    return frame[selector].name.value_counts()
