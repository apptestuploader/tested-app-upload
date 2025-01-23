import { ItemRow } from "../../db/db"
import { baseState, discounted, inventorys } from "./fixtures"
import { orderReducer } from "../../components/Pages/Home/OrderForm/reducer/orderReducer"
import _ from "lodash"
import { ACTION_TYPES } from "../../components/Pages/Home/OrderForm/reducer/actions"

describe("Name update.", () => {
  it("Sets `name`, `code`, and prices", () => {
    const index = 0
    const expectedItem: ItemRow = {
      ...baseState.items[index],
      code: inventorys.sencha.registerCode,
      name: inventorys.sencha.name,
      basePrice: inventorys.sencha.priceDefault,
      price: inventorys.sencha.priceDefault,
      inventory: inventorys.sencha,
    }
    const newState = orderReducer(baseState, {
      type: ACTION_TYPES.newInventory,
      inventory: inventorys.sencha,
      itemIndex: index,
    })

    expect(newState.items[index]).toEqual(expectedItem)
  })
  it("Sets inventory property", () => {
    const index = 0
    const newState = orderReducer(baseState, {
      type: ACTION_TYPES.newInventory,
      inventory: inventorys.sencha,
      itemIndex: index,
    })

    expect(newState.items[index].inventory).toEqual(inventorys.sencha)
  })
  it("Sets price considering quantity.", () => {
    const index = 0
    const quantity = 4
    const state = _.chain(baseState)
      .cloneDeep()
      .set(`items[${index}].quantity`, quantity)
      .value()

    const expectedPrice =
      inventorys.sencha.priceDefault * state.items[index].quantity

    const newState = orderReducer(state, {
      type: ACTION_TYPES.newInventory,
      inventory: inventorys.sencha,
      itemIndex: index,
    })

    expect(newState.items[index].basePrice).toEqual(expectedPrice)
  })
  it("Sets price considering type.", () => {
    const index = 0
    const type = "bulk"
    const state = _.chain(baseState)
      .cloneDeep()
      .set(`items[${index}].type`, type)
      .value()

    const expectedPrice = inventorys.sencha.priceBulk

    const newState = orderReducer(state, {
      type: ACTION_TYPES.newInventory,
      inventory: inventorys.sencha,
      itemIndex: index,
    })

    expect(newState.items[index].basePrice).toEqual(expectedPrice)
  })
  it("Sets price considering discount.", () => {
    const index = 0
    const discount = 5
    const state = _.chain(baseState)
      .cloneDeep()
      .set("discount", discount)
      .value()

    const expectedPrice = discounted(inventorys.sencha.priceDefault, 5)

    const newState = orderReducer(state, {
      type: ACTION_TYPES.newInventory,
      inventory: inventorys.sencha,
      itemIndex: index,
    })

    expect(newState.items[index].price).toEqual(expectedPrice)
  })
  it("Sets price considering discount to go.", () => {
    const index = 0
    const discount = 5
    const discountToGo = true
    const type = "bulk"
    const state = _.chain(baseState)
      .cloneDeep()
      .set("discount", discount)
      .set("discountToGo", discountToGo)
      .set(`items[${index}].type`, type)
      .value()

    const expectedPrice = discounted(inventorys.sencha.priceBulk, 5)

    const newState = orderReducer(state, {
      type: ACTION_TYPES.newInventory,
      inventory: inventorys.sencha,
      itemIndex: index,
    })

    expect(newState.items[index].price).toEqual(expectedPrice)
  })
  it("Sets price considering quantity.", () => {
    const index = 0
    const quantity = 5
    const state = _.chain(baseState)
      .cloneDeep()
      .set(`items[${index}].quantity`, quantity)
      .value()

    const expectedPrice = quantity * inventorys.sencha.priceDefault

    const newState = orderReducer(state, {
      type: ACTION_TYPES.newInventory,
      inventory: inventorys.sencha,
      itemIndex: index,
    })

    expect(newState.items[index].price).toEqual(expectedPrice)
  })
})
