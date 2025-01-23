import { useEffect, useReducer } from "react"
import { orderReducer } from "./reducer/orderReducer"
import { createItem, exportState, OrderMerged } from "../../../../db/dbApi"
import { ACTION_TYPES } from "./reducer/actions"
import { ItemRow } from "../../../../db/db"

const priceSums = (items: ItemRow[]) => {
  return items.reduce(
    (sums, { basePrice, price }) => ({
      base: sums.base + basePrice,
      total: sums.total + price,
    }),
    {
      base: 0,
      total: 0,
    }
  )
}

const createItemOnFullOrder = (state: OrderMerged) => {
  const emptyItems = state.items.filter((item) => !item.name).length
  if (!emptyItems) {
    createItem({ orderId: state.id })
  }
}

const didSidecarUpdate = (state: OrderMerged, order: OrderMerged) => {
  const f = state.items.map((item) => item.prepared).join("")
  const g = order.items.map((item) => item.prepared).join("")
  return f !== g
}

export const useOrder = (order: OrderMerged) => {
  const [state, dispatch] = useReducer(orderReducer, order)

  useEffect(() => {
    exportState({ order: state })
    createItemOnFullOrder(state)
  }, [state])

  // Update items on new one added.
  useEffect(() => {
    const newItem = order.items.length != state.items.length
    const itemUpdated = didSidecarUpdate(state, order)

    if (newItem || itemUpdated) {
      dispatch({
        type: ACTION_TYPES.updateItems,
        value: order.items,
      })
    }
  }, [order])

  return { state, dispatch, sums: priceSums(state.items) }
}
