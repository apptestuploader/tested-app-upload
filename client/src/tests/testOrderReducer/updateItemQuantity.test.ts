import { orderReducer } from "../../components/Pages/Home/OrderForm/reducer/orderReducer"
import { discounted, filledState, inventorys } from "./fixtures"
import _ from "lodash"
import { ACTION_TYPES } from "../../components/Pages/Home/OrderForm/reducer/actions"

describe("Quantity update.", () => {
  it("Sets new quantity", () => {
    const index = 0
    const quantity = 20

    const newState = orderReducer(filledState, {
      type: ACTION_TYPES.quantity,
      value: quantity,
      itemIndex: index,
    })

    expect(newState.items[index].quantity).toEqual(quantity)
  })

  it("Sets new basePrice", () => {
    const index = 0
    const quantity = 20
    const expectedBasePrice = quantity * inventorys.sencha.priceDefault
    const newState = orderReducer(filledState, {
      type: ACTION_TYPES.quantity,
      value: quantity,
      itemIndex: index,
    })

    expect(newState.items[index].basePrice).toEqual(expectedBasePrice)
  })

  it("Sets new price", () => {
    const index = 0
    const quantity = 20
    const discount = 7
    const expectedPrice =
      quantity * discounted(inventorys.sencha.priceDefault, discount)

    const state = _.chain(filledState)
      .cloneDeep()
      .set("discount", discount)
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.quantity,
      value: quantity,
      itemIndex: index,
    })

    expect(newState.items[index].price).toEqual(expectedPrice)
  })

  it("Skips discount when doesn't apply.", () => {
    const index = 0
    const quantity = 20
    const discount = 7
    const type = "bulk"
    const expectedPrice = quantity * inventorys.sencha.priceBulk

    const state = _.chain(filledState)
      .cloneDeep()
      .set("discount", discount)
      .set(`items[${index}].type`, type)
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.quantity,
      value: quantity,
      itemIndex: index,
    })

    expect(newState.items[index].price).toEqual(expectedPrice)
  })

  it("Sets discount considering type", () => {
    const index = 0
    const quantity = 20
    const discount = 7
    const type = "bulk"
    const discountToGo = true
    const expectedPrice =
      quantity * discounted(inventorys.sencha.priceBulk, discount)

    const state = _.chain(filledState)
      .cloneDeep()
      .set("discount", discount)
      .set("discountToGo", discountToGo)
      .set(`items[${index}].type`, type)
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.quantity,
      value: quantity,
      itemIndex: index,
    })

    expect(newState.items[index].price).toEqual(expectedPrice)
  })
})
