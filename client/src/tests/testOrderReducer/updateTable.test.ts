import { orderReducer } from "../../components/Pages/Home/OrderForm/reducer/orderReducer"
import { filledState } from "./fixtures"
import _ from "lodash"
import { ACTION_TYPES } from "../../components/Pages/Home/OrderForm/reducer/actions"

describe("Update table.", () => {
  it("Table is updated.", () => {
    const table = "k4"
    const newState = orderReducer(filledState, {
      type: ACTION_TYPES.table,
      value: table,
    })

    expect(newState.table).toEqual(table)
  })

  it("Can be unset.", () => {
    const table = ""
    const state = _.chain(filledState)
      .cloneDeep()
      .set(`table`, "secret table")
      .value()

    const newState = orderReducer(state, {
      type: ACTION_TYPES.table,
      value: table,
    })

    expect(newState.table).toEqual(table)
  })
})
