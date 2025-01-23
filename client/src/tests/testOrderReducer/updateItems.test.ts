import { orderReducer } from "../../components/Pages/Home/OrderForm/reducer/orderReducer"
import { filledState } from "./fixtures"
import { ItemRow } from "../../db/db"
import { DEFAULT_STOCK } from "../../db/dbApi"
import { ACTION_TYPES } from "../../components/Pages/Home/OrderForm/reducer/actions"

describe("Update Items.", () => {
  it("Items can be unset.", () => {
    const expectedItems: ItemRow[] = []
    const newState = orderReducer(filledState, {
      type: ACTION_TYPES.updateItems,
      value: expectedItems,
    })

    expect(newState.items).toEqual(expectedItems)
  })
  it("Items can be added.", () => {
    const addedItem = {
      id: 44,
      orderId: 75,
      code: "",
      name: "",
      type: "default",
      quantity: 1,
      basePrice: 0,
      price: 0,
      hint: "",
      prepared: false,
      inventory: DEFAULT_STOCK,
    }
    const expectedItems: ItemRow[] = [...filledState.items, addedItem]
    const newState = orderReducer(filledState, {
      type: ACTION_TYPES.updateItems,
      value: expectedItems,
    })

    expect(newState.items).toEqual(expectedItems)
  })
  it("Items can be removed.", () => {
    const expectedItems: ItemRow[] = [{ ...filledState.items[0] }]
    const newState = orderReducer(filledState, {
      type: ACTION_TYPES.updateItems,
      value: expectedItems,
    })

    expect(newState.items).toEqual([...expectedItems])
  })
})
