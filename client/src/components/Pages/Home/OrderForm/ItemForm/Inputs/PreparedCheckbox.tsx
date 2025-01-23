import ReadyButton from "./ReadyButton"
import { ACTION_TYPES, ItemAction } from "../../reducer/actions"
import { OrderMerged } from "../../../../../../db/dbApi"
import { Dispatch } from "react"

const PreparedCheckbox = ({
  index,
  state,
  dispatch,
}: {
  index: number
  state: OrderMerged
  dispatch: Dispatch<ItemAction>
}) => {
  return (
    <ReadyButton
      state={state.items[index].prepared}
      alt={state.items[index].name.toLowerCase() === "szisza fajka"}
      dispatch={() =>
        dispatch({
          type: ACTION_TYPES.prepared,
          value: !state.items[index].prepared,
        })
      }
    />
  )
}

export default PreparedCheckbox
