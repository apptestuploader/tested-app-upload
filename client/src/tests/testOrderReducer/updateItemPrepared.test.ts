import { orderReducer } from "../../components/Pages/Home/OrderForm/reducer/orderReducer"
import { filledState } from "./fixtures"
import _ from "lodash"
import { ACTION_TYPES } from "../../components/Pages/Home/OrderForm/reducer/actions"

describe("Update prepared.", () => {
  it("Prepared is set.", () => {
    const index = 0
    const prepared = true
    const newState = orderReducer(filledState, {
      type: ACTION_TYPES.prepared,
      value: prepared,
      itemIndex: index,
    })

    expect(newState.items[index].prepared).toEqual(prepared)
  })

  it("Prepared is unset.", () => {
    const index = 0
    const prepared = false
    const state = _.chain(filledState)
      .cloneDeep()
      .set(`items[${index}].prepared`, true)
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.prepared,
      value: prepared,
      itemIndex: index,
    })

    expect(newState.items[index].prepared).toEqual(prepared)
  })

  it("Prepared is set and order is collapsed.", () => {
    const prepared = true
    const state = _.chain(filledState)
      .cloneDeep()
      .set("collapsed", false)
      .value()

    const firstItemPrepared = orderReducer(state, {
      type: ACTION_TYPES.prepared,
      value: prepared,
      itemIndex: 0,
    })
    const allItemsPrepared = orderReducer(firstItemPrepared, {
      type: ACTION_TYPES.prepared,
      value: prepared,
      itemIndex: 1,
    })

    expect(allItemsPrepared.collapsed).toEqual(true)
  })
})
