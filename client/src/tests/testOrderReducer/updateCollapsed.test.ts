import { baseState } from "./fixtures"
import { ACTION_TYPES } from "../../components/Pages/Home/OrderForm/reducer/actions"
import { orderReducer } from "../../components/Pages/Home/OrderForm/reducer/orderReducer"

describe("Collapse update", () => {
  it("Setting the value.", () => {
    const collapsed = true

    const newState = orderReducer(baseState, {
      type: ACTION_TYPES.collapsed,
      value: collapsed,
    })

    expect(newState.collapsed).toEqual(collapsed)
  })
  it("Unsetting the value.", () => {
    const collapsed = false

    const newState = orderReducer(
      { ...baseState, collapsed: true },
      {
        type: ACTION_TYPES.collapsed,
        value: collapsed,
      }
    )

    expect(newState.collapsed).toEqual(collapsed)
  })
})
