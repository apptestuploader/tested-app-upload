import { ItemRow } from "../../../../../db/db"
import { DEFAULT_STOCK, OrderMerged } from "../../../../../db/dbApi"
import ItemFormLayout from "./ItemFormLayout"
import { Dispatch, useContext } from "react"
import { InventoryContext } from "../../../../Contexts/Inventory"
import NameInput from "./Inputs/NameInput"
import TypeInput from "./Inputs/TypeInput"
import { Action, ACTION_TYPES, ItemAction } from "../reducer/actions"
import { useTranslation } from "react-i18next"
import DeleteButton from "./Inputs/DeleteButton"
import CodeDisplay from "./Inputs/CodeDisplay"
import QuantityField from "./Inputs/QuantityField"
import HintField from "./Inputs/HintField"
import BasePriceField from "./Inputs/BasePriceField"
import PriceField from "./Inputs/PriceField"
import PreparedCheckbox from "./Inputs/PreparedCheckbox"

interface props {
  item: ItemRow
  first: boolean
  index: number
  state: OrderMerged
  dispatch: Dispatch<Action>
}

const ItemForm = ({ item, first, index, state, dispatch }: props) => {
  const { t } = useTranslation()
  const { values: inventorys } = useContext(InventoryContext)

  const findInventorys = (value: unknown) => {
    if (typeof value === "string") {
      return inventorys.filter((inventory) => inventory.name === value)?.[0]
    } else {
      return DEFAULT_STOCK
    }
  }

  const itemDispatch = (
    (index: number) => (action: ItemAction) =>
      dispatch({ ...action, itemIndex: index })
  )(index)

  return (
    <ItemFormLayout
      DeleteButton={<DeleteButton item={item} state={state} />}
      CodeDisplay={<CodeDisplay first={first} index={index} state={state} />}
      NameField={
        <NameInput
          onChange={(event, value) => {
            itemDispatch({
              type: ACTION_TYPES.newInventory,
              inventory: findInventorys(value),
            })
          }}
          name={`items[${index}].name`}
          label={first ? t("home.item.name") : ""}
          options={inventorys.map((inventory) => inventory.name)}
          value={state.items[index].name || null}
        />
      }
      TypeField={
        <TypeInput
          first={first}
          value={state.items[index].type.split("price")[0].toLowerCase()}
          name={`items[${index}].type`}
          onChange={(event) =>
            itemDispatch({
              type: ACTION_TYPES.type,
              value: event.target.value,
            })
          }
        />
      }
      QuantityField={
        <QuantityField
          first={first}
          index={index}
          state={state}
          dispatch={itemDispatch}
        />
      }
      HintField={
        <HintField
          first={first}
          index={index}
          state={state}
          dispatch={itemDispatch}
        />
      }
      BasePriceField={
        <BasePriceField
          first={first}
          index={index}
          state={state}
          dispatch={itemDispatch}
        />
      }
      PriceField={
        <PriceField
          first={first}
          index={index}
          state={state}
          dispatch={itemDispatch}
        />
      }
      PreparedCheckbox={
        <PreparedCheckbox index={index} state={state} dispatch={itemDispatch} />
      }
    />
  )
}

export default ItemForm
