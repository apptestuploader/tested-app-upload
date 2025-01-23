import priceFormatter from "../../../../../../utils/priceFormatter"
import { ACTION_TYPES, ItemAction } from "../../reducer/actions"
import NumberFormField from "./NumberFormField"
import { useTranslation } from "react-i18next"
import { OrderMerged } from "../../../../../../db/dbApi"
import { Dispatch } from "react"

const BasePriceField = ({
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
    <NumberFormField
      label={first ? t("home.item.basePrice") : ""}
      name={`items[${index}].basePrice`}
      value={priceFormatter(state.items[index].basePrice)}
      onChange={(event) =>
        dispatch({
          type: ACTION_TYPES.basePrice,
          value: priceFormatter(event.target.value),
        })
      }
    />
  )
}

export default BasePriceField
