import { OrderMerged } from "../../../db/dbApi"

export const tajMatch = (table: string) =>
  ["taj", "tadz", "tadż", "t"].includes(table)
const rules = {
  colonial: /k\d+/,
  morocco: /m\d+/,
  oriental: /o\d+/,
  babylon: /b\d+/,
  center: /s\d+/,
  outside: /out/,
  empty: (table: string) => table === null || table === "" || table === " ",
  taj: tajMatch,
}

export const matcher = (table: string) => {
  const lowerTable = table.toLowerCase()
  if (rules.empty(table)) {
    return "empty"
  }
  if (rules.taj(lowerTable)) {
    return "babylon"
  }
  if (lowerTable.match(rules.babylon)?.index === 0 || lowerTable === "b") {
    return "babylon"
  }
  if (lowerTable.match(rules.center)?.index === 0 || lowerTable === "s") {
    return "center"
  }
  if (lowerTable.match(rules.colonial)?.index === 0 || lowerTable === "k") {
    return "colonial"
  }
  if (lowerTable.match(rules.morocco)?.index === 0 || lowerTable === "m") {
    return "morocco"
  }
  if (lowerTable.match(rules.oriental)?.index === 0 || lowerTable === "o") {
    return "oriental"
  }
  if (lowerTable.match(rules.outside)?.index === 0 || lowerTable === "out") {
    return "outside"
  }
  return "other"
}

const tableNumber = (order: OrderMerged) => {
  // TODO: taj exception could be smarter
  if (rules.taj(order.table.toLowerCase())) {
    return 2.5
  }
  return parseInt(order.table.match(/\d+/)?.[0] ?? "0")
}
const compareOrders = (order1: OrderMerged, order2: OrderMerged) => {
  return tableNumber(order1) - tableNumber(order2)
}

export const sortByTable = (orders: OrderMerged[]) => {
  const baseReducer = {
    empty: [],
    other: [],
    outside: [],
    babylon: [],
    center: [],
    oriental: [],
    morocco: [],
    colonial: [],
  }

  const grouped = orders.reduce((acc, order) => {
    const room = matcher(order.table)
    return {
      ...acc,
      [room]: [...acc[room], order],
    }
  }, baseReducer)
  const internallySorted = Object.entries(grouped).reduce(
    (acc, [key, orders]) => {
      return {
        ...acc,
        [key]: orders.sort(compareOrders),
      }
    },
    baseReducer
  )

  return Object.values(internallySorted).reduce(
    (acc, orders) => [...acc, ...orders],
    []
  )
}

export const totalActiveSum = (orders: OrderMerged[]) => {
  return (
    orders.reduce((acc, order) => {
      return acc + order.items.reduce((acc, item) => acc + item.price, 0)
    }, 0) / 100
  )
}
