import NumberFormField from "./NumberFormField"
import priceFormatter from "../../../../../../utils/priceFormatter"
import { ACTION_TYPES, ItemAction } from "../../reducer/actions"
import { useTranslation } from "react-i18next"
import { OrderMerged } from "../../../../../../db/dbApi"
import { Dispatch } from "react"

const PriceField = ({
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
      label={first ? t("home.item.price") : ""}
      name={`items[${index}].price`}
      value={priceFormatter(state.items[index].price)}
      onChange={(event) =>
        dispatch({
          type: ACTION_TYPES.price,
          value: priceFormatter(event.target.value),
        })
      }
    />
  )
}
export default PriceField
