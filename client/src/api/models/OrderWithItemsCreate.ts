/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemInOrderCreate } from "./ItemInOrderCreate"

export type OrderWithItemsCreate = {
  discount: number
  isDiscountToGo: boolean
  closed: boolean
  table: string
  items: Array<ItemInOrderCreate>
  createdAt: string
}
