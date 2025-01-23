import { sortByTable } from "../../components/Pages/Home/utils"
import { DEFAULT_ORDER, OrderMerged } from "../../db/dbApi"

const baseOrder = { ...DEFAULT_ORDER, items: [], id: 0 }

const ordersWithTables = (tables: string[]): OrderMerged[] => {
  return tables.map((table) => ({ ...baseOrder, table: table }))
}
const getTables = (orders: OrderMerged[]): string[] =>
  orders.map((order) => order.table)

describe("sorting is ascending", () => {
  test.each([
    {
      name: "k",
      expectedTables: ["k1", "k2", "k7"],
      tables: ["k1", "k7", "k2"],
    },
    {
      name: "o",
      expectedTables: ["o1", "o2", "o5", "o34"],
      tables: ["o1", "o34", "o2", "o5"],
    },
    {
      name: "m",
      expectedTables: ["m1", "m2", "m5", "m34"],
      tables: ["m34", "m1", "m2", "m5"],
    },
    {
      name: "out",
      expectedTables: ["out1", "out2", "out5", "out34"],
      tables: ["out34", "out1", "out2", "out5"],
    },
  ])("$name", ({ tables, expectedTables }) => {
    const orders = ordersWithTables(tables)
    const sortedTables = getTables(sortByTable(orders))
    expect(sortedTables).toEqual(expectedTables)
  })
})

describe("table group order", () => {
  test.each([
    {
      name: "o after k",
      expectedTables: ["k1", "k2", "o1"],
      tables: ["k1", "o1", "k2"],
    },
    {
      name: "o after m",
      expectedTables: ["m1", "m2", "m5", "o34"],
      tables: ["m1", "m2", "o34", "m5"],
    },
    {
      name: "k after out",
      expectedTables: ["out1", "k1", "o1"],
      tables: ["k1", "o1", "out1"],
    },
    {
      name: "empty first",
      expectedTables: ["", "", "m1", "k5", "o34"],
      tables: ["m1", "", "k5", "o34", ""],
    },
    {
      name: "others after empty, before outside",
      expectedTables: ["", "", "bajojajo", "out34", "m1", "k5"],
      tables: ["m1", "", "k5", "out34", "", "bajojajo"],
    },
  ])("$name", ({ tables, expectedTables }) => {
    const orders = ordersWithTables(tables)
    const sortedTables = getTables(sortByTable(orders))
    expect(sortedTables).toEqual(expectedTables)
  })
})

describe("other cases", () => {
  test.each([
    {
      name: "ignores cases",
      expectedTables: ["", "M1", "m2", "k5", "K6", "o34"],
      tables: ["M1", "", "k5", "o34", "m2", "K6"],
    },
    {
      name: "considers patterns only at the table start",
      expectedTables: ["", "aak5", "M1", "m2", "k2", "o34"],
      tables: ["M1", "", "aak5", "o34", "m2", "k2"],
    },
    {
      name: "single letters always first",
      expectedTables: [
        "",
        "ak47",
        "out",
        "out1",
        "m",
        "m1",
        "k",
        "k2",
        "o",
        "o1",
      ],
      tables: ["", "ak47", "out", "out1", "m", "m1", "k", "k2", "o", "o1"],
    },
    {
      name: "taj is between k3 and k4",
      expectedTables: ["k3", "taj", "k4"],
      tables: ["k3", "k4", "taj"],
    },
    {
      name: "tadz is between k3 and k4",
      expectedTables: ["k3", "tadz", "k4"],
      tables: ["k3", "k4", "tadz"],
    },
    {
      name: "tadż is between k3 and k4",
      expectedTables: ["k3", "tadż", "k4"],
      tables: ["k3", "tadż", "k4"],
    },
  ])("$name", ({ tables, expectedTables }) => {
    const orders = ordersWithTables(tables)
    const sortedTables = getTables(sortByTable(orders))
    expect(sortedTables).toEqual(expectedTables)
  })
})
