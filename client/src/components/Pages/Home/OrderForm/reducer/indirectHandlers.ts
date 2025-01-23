import { ItemRow } from "../../../../../db/db"
import { Inventory } from "../../../../../api"
import { Prices } from "../../../../../api/models/Inventory"

export const inventoryHandler = ({
  item,
  inventory,
  discount,
  toGo,
}: {
  item: ItemRow
  inventory: Inventory
  discount: number
  toGo: boolean
}): ItemRow => {
  const { registerCode, name } = inventory
  const { basePrice, price } = pickPrices({
    type: item.type,
    quantity: item.quantity,
    discount: discount,
    toGo: toGo,
    inventory: inventory,
  })
  return {
    ...item,
    code: registerCode,
    name: name,
    basePrice: basePrice,
    price: price,
    inventory: inventory,
  }
}
export const handleDiscount = ({
  price,
  discount,
  type,
  toGo,
}: {
  price: number
  discount: number
  type: string
  toGo: boolean
}): number => {
  if (["bulk", "package"].includes(type) && !toGo) {
    return price
  }
  const discountMultiplier = (100 - (isNaN(discount) ? 0 : discount)) / 100
  return Math.round(price * discountMultiplier)
}

interface priceParams {
  type: string
  quantity: number
  inventory: Inventory
  discount: number
  toGo: boolean
}

export const pickPrice = ({
  type,
  quantity,
  inventory,
  discount,
  toGo,
}: priceParams): number => {
  const priceSelector = `price${type.charAt(0).toUpperCase()}${type.slice(1)}`
  return (
    quantity *
    handleDiscount({
      price: inventory[priceSelector as keyof Prices] ?? 0,
      discount: discount,
      type: type,
      toGo: toGo,
    })
  )
}

export const pickPrices = (priceParams: priceParams) => {
  const basePrice = pickPrice({ ...priceParams, discount: 0, toGo: false })
  const price = pickPrice(priceParams)

  return { basePrice, price }
}

export const shouldCollapse = (items: ItemRow[]): boolean => {
  return items.filter((item) => item.name).every((item) => item.prepared)
}
