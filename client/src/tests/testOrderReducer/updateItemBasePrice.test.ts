import { orderReducer } from "../../components/Pages/Home/OrderForm/reducer/orderReducer"
import { discounted, filledState } from "./fixtures"
import _ from "lodash"
import { ACTION_TYPES } from "../../components/Pages/Home/OrderForm/reducer/actions"

describe("Price update.", () => {
  it("Sets new basePrice", () => {
    const index = 0
    const basePrice = 6780

    const newState = orderReducer(filledState, {
      type: ACTION_TYPES.basePrice,
      value: basePrice,
      itemIndex: index,
    })

    expect(newState.items[index].basePrice).toEqual(basePrice)
  })

  it("Updates new price", () => {
    const index = 0
    const basePrice = 6780

    const newState = orderReducer(filledState, {
      type: ACTION_TYPES.basePrice,
      value: basePrice,
      itemIndex: index,
    })

    expect(newState.items[index].price).toEqual(basePrice)
  })

  it("Considers discount", () => {
    const index = 0
    const basePrice = 6780
    const discount = 20
    const expectedPrice = discounted(basePrice, discount)

    const state = _.chain(filledState)
      .cloneDeep()
      .set(`discount`, discount)
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.basePrice,
      value: basePrice,
      itemIndex: index,
    })

    expect(newState.items[index].price).toEqual(expectedPrice)
  })

  it("Ignores discount when type doesn't allow for it.", () => {
    const index = 0
    const basePrice = 6780
    const discount = 20
    const expectedPrice = basePrice

    const state = _.chain(filledState)
      .cloneDeep()
      .set(`items[${index}].type`, "bulk")
      .set(`discount`, discount)
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.basePrice,
      value: basePrice,
      itemIndex: index,
    })

    expect(newState.items[index].price).toEqual(expectedPrice)
  })

  it("Applies typed discount.", () => {
    const index = 0
    const basePrice = 6780
    const discount = 20
    const discountToGo = true
    const expectedPrice = discounted(basePrice, discount)

    const state = _.chain(filledState)
      .cloneDeep()
      .set(`items[${index}].type`, "bulk")
      .set(`discount`, discount)
      .set(`discountToGo`, discountToGo)
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.basePrice,
      value: basePrice,
      itemIndex: index,
    })

    expect(newState.items[index].price).toEqual(expectedPrice)
  })
})
