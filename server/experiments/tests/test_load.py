from experiments.load_data import Files, load


def test_loads():
    items = load(Files.items)

    assert items
