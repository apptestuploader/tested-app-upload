import Input from "../../../../../Commons/Input"
import { ACTION_TYPES, ItemAction } from "../../reducer/actions"
import { useTranslation } from "react-i18next"
import { OrderMerged } from "../../../../../../db/dbApi"
import { Dispatch } from "react"

const HintField = ({
  first,
  index,
  state,
  dispatch,
}: {
  first: boolean
  index: number
  state: OrderMerged
  dispatch: Dispatch<ItemAction>
}) => {
  const { t } = useTranslation()

  return (
    <Input
      label={first ? t("home.item.hint") : ""}
      name={`items[${index}].hint`}
      value={state.items[index].hint}
      onChange={(event) =>
        dispatch({
          type: ACTION_TYPES.hint,
          value: event.target.value,
        })
      }
    />
  )
}

export default HintField
