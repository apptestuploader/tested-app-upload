/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Item } from "./Item"

export type Order = {
  discount: number
  isDiscountToGo: boolean
  closed: boolean
  table: string
  id: string
  createdAt: string
  updatedAt: string
  items: Array<Item>
}
