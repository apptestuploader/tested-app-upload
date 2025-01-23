import { orderReducer } from "../../components/Pages/Home/OrderForm/reducer/orderReducer"
import { filledState } from "./fixtures"
import _ from "lodash"
import { ACTION_TYPES } from "../../components/Pages/Home/OrderForm/reducer/actions"

describe("Update paid.", () => {
  it("Paid is updated.", () => {
    const paid = true
    const newState = orderReducer(filledState, {
      type: ACTION_TYPES.paid,
      value: paid,
    })

    expect(newState.paid).toEqual(paid)
  })

  it("Paid is updated.", () => {
    const paid = false
    const state = _.chain(filledState).cloneDeep().set(`paid`, true).value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.paid,
      value: paid,
    })

    expect(newState.paid).toEqual(paid)
  })
})
