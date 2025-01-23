import { orderReducer } from "../../components/Pages/Home/OrderForm/reducer/orderReducer"
import { discounted, filledState, inventorys } from "./fixtures"
import _ from "lodash"
import { ACTION_TYPES } from "../../components/Pages/Home/OrderForm/reducer/actions"

describe("Type update.", () => {
  it("Sets new type", () => {
    const index = 0
    const newType = "gaiwan"

    const newState = orderReducer(filledState, {
      type: ACTION_TYPES.type,
      value: newType,
      itemIndex: index,
    })

    expect(newState.items[index].type).toEqual(newType)
  })

  it("Sets new price.", () => {
    const index = 0
    const newType = "gaiwan"
    const expectedPrice = inventorys.sencha.priceGaiwan

    const newState = orderReducer(filledState, {
      type: ACTION_TYPES.type,
      value: newType,
      itemIndex: index,
    })

    expect(newState.items[index].basePrice).toEqual(expectedPrice)
  })

  it("Considers quantity.", () => {
    const quantity = 5
    const index = 0
    const newType = "gaiwan"
    const expectedPrice = inventorys.sencha.priceGaiwan * quantity

    const state = _.chain(filledState)
      .cloneDeep()
      .set(`items[${index}].quantity`, quantity)
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.type,
      value: newType,
      itemIndex: index,
    })
    expect(newState.items[index].basePrice).toEqual(expectedPrice)
  })

  it("Considers discount.", () => {
    const discount = 5
    const index = 0
    const newType = "gaiwan"
    const expectedPrice = discounted(inventorys.sencha.priceGaiwan, discount)

    const state = _.chain(filledState)
      .cloneDeep()
      .set(`discount`, discount)
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.type,
      value: newType,
      itemIndex: index,
    })
    expect(newState.items[index].price).toEqual(expectedPrice)
  })

  it("Discount doesn't change basePrice.", () => {
    const discount = 5
    const index = 0
    const newType = "gaiwan"
    const expectedPrice = inventorys.sencha.priceGaiwan

    const state = _.chain(filledState)
      .cloneDeep()
      .set(`discount`, discount)
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.type,
      value: newType,
      itemIndex: index,
    })
    expect(newState.items[index].basePrice).toEqual(expectedPrice)
  })

  it("Considers quantity and discount.", () => {
    const discount = 5
    const quantity = 3
    const index = 0
    const newType = "gaiwan"
    const expectedPrice =
      quantity * discounted(inventorys.sencha.priceGaiwan, discount)

    const state = _.chain(filledState)
      .cloneDeep()
      .set(`discount`, discount)
      .set(`items[${index}].quantity`, quantity)
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.type,
      value: newType,
      itemIndex: index,
    })
    expect(newState.items[index].price).toEqual(expectedPrice)
  })

  it("Doesn't apply discount when not `discountToGo` and item is to go.", () => {
    const discount = 5
    const index = 0
    const newType = "package"
    const expectedPrice = inventorys.sencha.pricePackage

    const state = _.chain(filledState)
      .cloneDeep()
      .set(`discount`, discount)
      .set("discountToGo", false)
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.type,
      value: newType,
      itemIndex: index,
    })
    expect(newState.items[index].price).toEqual(expectedPrice)
  })

  it("Applies discount when `discountToGo` and item is to go.", () => {
    const discount = 5
    const index = 0
    const newType = "package"
    const expectedPrice = discounted(inventorys.sencha.pricePackage, discount)

    const state = _.chain(filledState)
      .cloneDeep()
      .set(`discount`, discount)
      .set("discountToGo", true)
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.type,
      value: newType,
      itemIndex: index,
    })
    expect(newState.items[index].price).toEqual(expectedPrice)
  })
})
