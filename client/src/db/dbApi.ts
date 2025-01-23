import { db, ItemRow, ItemRowCreate, OrderRow, OrderRowCreate } from "./db"
import { IndexableType } from "dexie"
import { Inventory, Order } from "../api"

export const DEFAULT_STOCK: Inventory = {
  name: "",
  registerCode: "",
  priceDefault: 0,
  priceGaiwan: 0,
  pricePackage: 0,
  priceBulk: 0,
  priceGongfu: 0,
  id: "",
}

export const DEFAULT_ORDER: OrderRowCreate = {
  table: "",
  discount: 0,
  discountToGo: false,
  paid: false,
  collapsed: false,
}

export const DEFAULT_ITEM: ItemRowCreate = {
  code: "",
  name: "",
  type: "default",
  quantity: 1,
  basePrice: 0,
  price: 0,
  hint: "",
  prepared: false,
  inventory: DEFAULT_STOCK,
}

const isOrderRow = (order: OrderRow | OrderRowCreate): order is OrderRow => {
  return order.id !== undefined
}

const isItemRow = (item: ItemRow | ItemRowCreate): item is ItemRow => {
  return item.id !== undefined && item.orderId !== undefined
}

export const createOrder = async () => {
  const orderId = await db.orders.add({
    ...DEFAULT_ORDER,
    createdAt: new Date(),
  })

  await createItem({ orderId })
  await createItem({ orderId })
  await createItem({ orderId })
}

export const createItem = async ({ orderId }: { orderId: number }) => {
  const newItem = { ...DEFAULT_ITEM, orderId: orderId }
  await db.items.add(newItem)
  if (isItemRow(newItem)) {
    return newItem
  }
  throw Error("Not an ItemRow")
}

export const readOrder = async ({ id }: { id: IndexableType }) => {
  const orders = await db.orders.where("id").equals(id).first()
  const items = await db.items.where("orderId").equals(id).toArray()
  return orders
}

export interface OrderMerged extends OrderRow {
  items: Array<ItemRow>
}

const mergeOrders = ({
  orders,
  items,
}: {
  orders: Array<OrderRow>
  items: Array<ItemRow>
}) => {
  return orders.map((order) => ({
    ...order,
    items: items.filter((item) => item.orderId === order.id),
  }))
}

export const readOrders = async () => {
  const orders = (await db.orders.toArray()).filter(isOrderRow)
  const items = (await db.items.toArray()).filter(isItemRow)

  return mergeOrders({ orders, items })
}

export const deleteOrder = async ({ id }: { id: number }) => {
  await db.orders.delete(id)
  const itemsToDelete = (
    await db.items.where("orderId").equals(id).toArray()
  ).filter(isItemRow)
  await db.items.bulkDelete(itemsToDelete.map((item) => item.id))
}

export const deleteItem = async ({ id }: { id: number }) => {
  await db.items.delete(id)
}

export const updateOrder = async ({ order }: { order: OrderRow }) => {
  await db.orders.update(order.id, order)
}

export const updateItem = async ({ item }: { item: ItemRow }) => {
  await db.items.update(item.id, item)
}

export const exportState = async ({ order }: { order: OrderMerged }) => {
  const { items, ...updatedOrder } = order
  await updateOrder({ order: updatedOrder })
  items.forEach(async (item) => {
    await updateItem({ item: item })
  })
}

export const reopenOrder = async (order: Order) => {
  const { items, ...leOrder } = order
  // @ts-ignore
  const orderId = await db.orders.add({
    ...leOrder,
    discountToGo: leOrder.isDiscountToGo,
  })
  items.forEach(async (item) => {
    // @ts-ignore
    await db.items.add({ ...item, orderId: orderId })
  })
}
