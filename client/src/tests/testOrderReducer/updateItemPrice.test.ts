import { orderReducer } from "../../components/Pages/Home/OrderForm/reducer/orderReducer"
import { filledState } from "./fixtures"
import _ from "lodash"
import { ACTION_TYPES } from "../../components/Pages/Home/OrderForm/reducer/actions"

describe("Price update.", () => {
  it("Sets new price", () => {
    const index = 0
    const price = 6780

    const newState = orderReducer(filledState, {
      type: ACTION_TYPES.price,
      value: price,
      itemIndex: index,
    })

    expect(newState.items[index].price).toEqual(price)
  })

  it("Disregards discount", () => {
    const index = 0
    const price = 6780
    const discount = 5
    const state = _.chain(filledState)
      .cloneDeep()
      .set("discount", discount)
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.price,
      value: price,
      itemIndex: index,
    })

    expect(newState.items[index].price).toEqual(price)
  })

  it("Disregards quantity", () => {
    const index = 0
    const price = 6780
    const quantity = 5
    const state = _.chain(filledState)
      .cloneDeep()
      .set(`item[${index}].quantity`, quantity)
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.price,
      value: price,
      itemIndex: index,
    })

    expect(newState.items[index].price).toEqual(price)
  })
})
