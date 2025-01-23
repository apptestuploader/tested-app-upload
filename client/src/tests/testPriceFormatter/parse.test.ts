import priceFormatter from "../../utils/priceFormatter"

describe("Parses to int", () => {
  const toInt: Array<[string, number]> = [
    ["50.01", 5001],
    ["100", 10000],
    ["100.0", 10000],
    [".1", 10],
    [".", 0],
    ["100.", 10000],
    ["21.37", 2137],
    ["21.370", 2137],
    ["21.3799", 2137],
    ["21.3701", 2137],
  ]

  it.each(toInt)("%s => %i", (input, expected) => {
    expect(priceFormatter(input)).toEqual(expected)
  })
})

describe("Parses to string", () => {
  const toString: Array<[number, string]> = [
    [5001, "50.01"],
    [10000, "100"],
    [10, "0.1"],
    [0, ""],
    [2137, "21.37"],
  ]

  it.each(toString)("%i => %s", (input, expected) => {
    const price = priceFormatter(input)
    expect(price).toEqual(expected)
  })
})
