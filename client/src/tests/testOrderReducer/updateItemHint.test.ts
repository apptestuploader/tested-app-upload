import { orderReducer } from "../../components/Pages/Home/OrderForm/reducer/orderReducer"
import { filledState } from "./fixtures"
import _ from "lodash"
import { ACTION_TYPES } from "../../components/Pages/Home/OrderForm/reducer/actions"

describe("Update hint.", () => {
  it("Hint is updated.", () => {
    const index = 1
    const hint = "bajo jajo"
    const newState = orderReducer(filledState, {
      type: ACTION_TYPES.hint,
      value: hint,
      itemIndex: index,
    })

    expect(newState.items[index].hint).toEqual(hint)
  })
  it("Can be unset.", () => {
    const index = 1
    const hint = ""
    const state = _.chain(filledState)
      .cloneDeep()
      .set(`items[1].hint`, "some hint")
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.hint,
      value: hint,
      itemIndex: index,
    })

    expect(newState.items[index].hint).toEqual(hint)
  })
})
