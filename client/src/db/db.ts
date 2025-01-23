import Dexie, { Table } from "dexie"
import { Inventory } from "../api"

export interface ItemRowCreate {
  id?: number
  orderId?: number
  code: string
  name: string
  type: string
  quantity: number
  basePrice: number
  price: number
  hint: string
  prepared: boolean
  inventory: Inventory
}
export interface ItemRow extends ItemRowCreate {
  id: number
  orderId: number
}

export interface OrderRowCreate {
  id?: number
  table: string
  discount: number
  discountToGo: boolean
  paid: boolean
  collapsed: boolean
  createdAt?: Date
}

export interface OrderRow extends OrderRowCreate {
  id: number
}

export class TeaDexie extends Dexie {
  orders!: Table<OrderRowCreate, number>
  items!: Table<ItemRowCreate, number>

  constructor() {
    super("TeaDB")
    this.version(1).stores({
      orders: "++id",
      items: "++id, orderId",
    })
  }
}

export const db = new TeaDexie()
