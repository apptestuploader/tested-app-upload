import NumberFormField from "./NumberFormField"
import { ACTION_TYPES, ItemAction } from "../../reducer/actions"
import { IconButton } from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import { useTranslation } from "react-i18next"
import { OrderMerged } from "../../../../../../db/dbApi"
import { Dispatch } from "react"

const QuantityField = ({
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

  // value/onChange hack to still display prices and allow for easy input change
  return (
    <NumberFormField
      label={first ? t("home.item.quantity") : ""}
      name={`items[${index}].quantity`}
      value={state.items[index].quantity || ""}
      inputProps={{ style: { textAlign: "center" } }}
      onChange={(event) =>
        dispatch({
          type: ACTION_TYPES.quantity,
          value: parseInt(event.target.value) || 0,
        })
      }
      InputProps={{
        startAdornment: (
          <IconButton
            size={"small"}
            sx={{
              p: 0,
              mr: "auto",
            }}
            onClick={() =>
              dispatch({
                type: ACTION_TYPES.quantity,
                value:
                  state.items[index].quantity > 1
                    ? state.items[index].quantity - 1
                    : 1,
              })
            }
          >
            <RemoveIcon />
          </IconButton>
        ),
        endAdornment: (
          <IconButton
            size={"small"}
            sx={{
              p: 0,
              ml: "auto",
            }}
            onClick={() =>
              dispatch({
                type: ACTION_TYPES.quantity,
                value: state.items[index].quantity + 1,
              })
            }
          >
            <AddIcon />
          </IconButton>
        ),
        sx: {
          p: 0,
        },
      }}
    />
  )
}

export default QuantityField
