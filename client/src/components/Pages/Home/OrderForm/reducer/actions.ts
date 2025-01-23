import { Inventory } from "../../../../../api"
import { ItemRow } from "../../../../../db/db"

export enum ACTION_TYPES {
  discount = "discount",
  discountToGo = "discountToGo",
  type = "type",
  newInventory = "new-inventory",
  quantity = "quantity",
  basePrice = "basePrice",
  price = "price",
  hint = "hint",
  prepared = "prepared",
  table = "table",
  paid = "paid",
  collapsed = "collapsed",
  updateItems = "updateItems",
}

export type ItemAction =
  | { type: ACTION_TYPES.basePrice; value: number }
  | { type: ACTION_TYPES.price; value: number }
  | { type: ACTION_TYPES.hint; value: string }
  | { type: ACTION_TYPES.prepared; value: boolean }
  | {
      type: ACTION_TYPES.quantity
      value: number
    }
  | { type: ACTION_TYPES.type; value: string }
  | { type: ACTION_TYPES.newInventory; inventory: Inventory }
export type OrderAction =
  | { type: ACTION_TYPES.discount; value: number }
  | {
      type: ACTION_TYPES.discountToGo
      value: boolean
    }
  | { type: ACTION_TYPES.table; value: string }
  | { type: ACTION_TYPES.paid; value: boolean }
  | { type: ACTION_TYPES.collapsed; value: boolean }
  | { type: ACTION_TYPES.updateItems; value: ItemRow[] }
export type Action = (ItemAction & { itemIndex: number }) | OrderAction
