import { orderReducer } from "../../components/Pages/Home/OrderForm/reducer/orderReducer"
import { baseState, discounted, filledState, inventorys } from "./fixtures"
import _ from "lodash"
import { ACTION_TYPES } from "../../components/Pages/Home/OrderForm/reducer/actions"

describe("Discount update", () => {
  it("Saves discount value.", () => {
    const discount = 3
    const newState = orderReducer(baseState, {
      type: ACTION_TYPES.discount,
      value: discount,
    })
    expect(newState.discount).toEqual(discount)
  })

  it("Sets existing prices.", () => {
    const discount = 3
    const state = _.chain(filledState).cloneDeep().value()

    const expectedPrices = state.items.map((item) =>
      discounted(item.basePrice, discount)
    )

    const newState = orderReducer(state, {
      type: ACTION_TYPES.discount,
      value: discount,
    })

    expect(newState.items.map((item) => item.price)).toEqual(expectedPrices)
  })

  it("Setting prices skips not discounted items.", () => {
    const discount = 3
    const state = _.chain(filledState)
      .cloneDeep()
      .set(`items[0].type`, "gaiwan")
      .set(`items[1].type`, "bulk")
      .set(`items[0].basePrice`, inventorys.sencha.priceGaiwan)
      .set(`items[1].basePrice`, inventorys.assam.priceBulk)
      .value()

    const expectedPrices = [
      discounted(inventorys.sencha.priceGaiwan, discount),
      inventorys.assam.priceBulk,
    ]

    const newState = orderReducer(state, {
      type: ACTION_TYPES.discount,
      value: discount,
    })

    expect(newState.items.map((item) => item.price)).toEqual(expectedPrices)
  })

  it("Setting prices considers discount type.", () => {
    const discount = 3
    const state = _.chain(filledState)
      .cloneDeep()
      .set("discountToGo", true)
      .set(`items[0].type`, "gaiwan")
      .set(`items[1].type`, "bulk")
      .set(`items[0].basePrice`, inventorys.sencha.priceGaiwan)
      .set(`items[1].basePrice`, inventorys.assam.priceBulk)
      .value()

    const expectedPrices = [
      discounted(inventorys.sencha.priceGaiwan, discount),
      discounted(inventorys.assam.priceBulk, discount),
    ]

    const newState = orderReducer(state, {
      type: ACTION_TYPES.discount,
      value: discount,
    })

    expect(newState.items.map((item) => item.price)).toEqual(expectedPrices)
  })

  it("Unset items get price 0.", () => {
    const discount = 3
    const expectedPrices = [0, 0]

    const newState = orderReducer(baseState, {
      type: ACTION_TYPES.discount,
      value: discount,
    })

    expect(newState.items.map((item) => item.price)).toEqual(expectedPrices)
  })

  it("Setting discount to 0 resets the prices.", () => {
    const discount = 0
    const state = _.chain(filledState)
      .cloneDeep()
      .set("discountToGo", true)
      .set(`items[0].price`, "6666")
      .set(`items[1].price`, "2000")
      .value()

    const expectedPrices = state.items.map((item) => item.basePrice)

    const newState = orderReducer(state, {
      type: ACTION_TYPES.discount,
      value: discount,
    })

    expect(newState.items.map((item) => item.price)).toEqual(expectedPrices)
  })

  it("Setting discount to NaN treats it as 0.", () => {
    const discount = NaN
    const state = _.chain(filledState)
      .cloneDeep()
      .set("discountToGo", true)
      .set(`items[0].price`, "6666")
      .set(`items[1].price`, "2000")
      .value()

    const expectedPrices = state.items.map((item) => item.basePrice)

    const newState = orderReducer(state, {
      type: ACTION_TYPES.discount,
      value: discount,
    })

    expect(newState.items.map((item) => item.price)).toEqual(expectedPrices)
  })
})
