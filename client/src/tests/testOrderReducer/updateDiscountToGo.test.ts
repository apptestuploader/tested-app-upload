import { orderReducer } from "../../components/Pages/Home/OrderForm/reducer/orderReducer"
import { baseState, discounted, filledState, inventorys } from "./fixtures"
import _ from "lodash"
import { ACTION_TYPES } from "../../components/Pages/Home/OrderForm/reducer/actions"

describe("Discount to go update", () => {
  it("Saves discount to go value.", () => {
    const discountToGo = true
    const newState = orderReducer(baseState, {
      type: ACTION_TYPES.discountToGo,
      value: discountToGo,
    })
    expect(newState.discountToGo).toEqual(discountToGo)
  })

  it("Doesn't set to go prices.", () => {
    const discount = 10
    const discountToGo = false
    const state = _.chain(filledState)
      .cloneDeep()
      .set(`discount`, discount)
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
      type: ACTION_TYPES.discountToGo,
      value: discountToGo,
    })

    expect(newState.items.map((item) => item.price)).toEqual(expectedPrices)
  })

  it("Sets existing prices.", () => {
    const discount = 10
    const discountToGo = true
    const state = _.chain(filledState)
      .cloneDeep()
      .set(`discount`, discount)
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
      type: ACTION_TYPES.discountToGo,
      value: discountToGo,
    })

    expect(newState.items.map((item) => item.price)).toEqual(expectedPrices)
  })

  it("Switched off resets prices.", () => {
    const discount = 10
    const discountToGo = false
    const state = _.chain(filledState)
      .cloneDeep()
      .set(`discount`, discount)
      .set(`discountToGo`, true)
      .set(`items[0].basePrice`, inventorys.sencha.priceGaiwan)
      .set(`items[1].basePrice`, inventorys.assam.priceBulk)
      .set(`items[0].type`, "gaiwan")
      .set(`items[0].price`, 1700)
      .set(`items[1].type`, "bulk")
      .set(`items[1].price`, 69)
      .value()

    const expectedPrices = [
      discounted(inventorys.sencha.priceGaiwan, discount),
      inventorys.assam.priceBulk,
    ]

    const newState = orderReducer(state, {
      type: ACTION_TYPES.discountToGo,
      value: discountToGo,
    })

    expect(newState.items.map((item) => item.price)).toEqual(expectedPrices)
  })
})
