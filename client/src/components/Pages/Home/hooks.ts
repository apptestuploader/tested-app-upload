import { useState } from "react"
import { OrderMerged, readOrders } from "../../../db/dbApi"
import { useLiveQuery } from "dexie-react-hooks"
import { sortByTable } from "./utils"
import { ItemRow } from "../../../db/db"

const sortItems = (a: ItemRow, b: ItemRow) => {
  const unimportant = ["", null, undefined]
  if (unimportant.includes(a.name)) {
    return 1
  }
  if (unimportant.includes(b.name)) {
    return -1
  }

  return 0
}

export const useActiveOrders = () => {
  const [activeOrders, setActiveOrders] = useState<Array<OrderMerged>>([])

  useLiveQuery(async () => {
    const orders = await readOrders()
    const ordersWithSortedItems = orders.map((order) => ({
      ...order,
      items: order.items.sort(sortItems),
    }))
    const sortedOrders = sortByTable(ordersWithSortedItems)

    setActiveOrders(sortedOrders)
  })

  return activeOrders
}
