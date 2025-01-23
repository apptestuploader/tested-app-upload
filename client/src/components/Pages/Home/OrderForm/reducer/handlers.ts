import {
  handleDiscount,
  inventoryHandler,
  pickPrices,
} from "./indirectHandlers"
import _ from "lodash"
import { OrderMerged } from "../../../../../db/dbApi"
import { Action, ACTION_TYPES } from "./actions"

const ACTION_SHOULD_NOT_BE_TRIGGERED = "Wrong handler triggered."

const handlers = {
  newInventory: ({
    clonedState,
    action,
  }: {
    clonedState: OrderMerged
    action: Action
  }) => {
    if (action.type === ACTION_TYPES.newInventory) {
      const updatedItem = inventoryHandler({
        item: clonedState.items[action.itemIndex],
        inventory: action.inventory,
        discount: clonedState.discount,
        toGo: clonedState.discountToGo,
      })
      const dateUpdate =
        clonedState.items.filter((item) => item.name).length < 1
          ? {
              createdAt: new Date(),
            }
          : {}
      return {
        ..._.set(clonedState, `items[${action.itemIndex}]`, updatedItem),
        ...dateUpdate,
      }
    }
    throw new Error(ACTION_SHOULD_NOT_BE_TRIGGERED)
  },
  type: ({
    clonedState,
    action,
  }: {
    clonedState: OrderMerged
    action: Action
  }) => {
    if (action.type === ACTION_TYPES.type) {
      const { basePrice, price } = pickPrices({
        type: action.value,
        quantity: clonedState.items[action.itemIndex].quantity,
        inventory: clonedState.items[action.itemIndex].inventory,
        discount: clonedState.discount,
        toGo: clonedState.discountToGo,
      })

      const updatedState = _.set(clonedState, `items[${action.itemIndex}]`, {
        ...clonedState.items[action.itemIndex],
        type: action.value,
        basePrice: basePrice,
        price: price,
      })
      return { ...updatedState }
    }
    throw new Error(ACTION_SHOULD_NOT_BE_TRIGGERED)
  },
  quantity: ({
    clonedState,
    action,
  }: {
    clonedState: OrderMerged
    action: Action
  }) => {
    if (action.type === ACTION_TYPES.quantity) {
      const { basePrice, price } = pickPrices({
        type: clonedState.items[action.itemIndex].type,
        quantity: action.value,
        inventory: clonedState.items[action.itemIndex].inventory,
        discount: clonedState.discount,
        toGo: clonedState.discountToGo,
      })

      return {
        ..._.set(clonedState, `items[${action.itemIndex}]`, {
          ...clonedState.items[action.itemIndex],
          quantity: action.value,
          basePrice: basePrice,
          price: price,
        }),
      }
    }
    throw new Error(ACTION_SHOULD_NOT_BE_TRIGGERED)
  },
  discount: ({
    clonedState,
    action,
  }: {
    clonedState: OrderMerged
    action: Action
  }) => {
    if (action.type === ACTION_TYPES.discount) {
      const updatedItems = clonedState.items.map((item) => {
        return {
          ...item,
          price: handleDiscount({
            type: item.type,
            price: item.basePrice,
            discount: action.value,
            toGo: clonedState.discountToGo,
          }),
        }
      })

      return { ...clonedState, discount: action.value, items: updatedItems }
    }
    throw new Error(ACTION_SHOULD_NOT_BE_TRIGGERED)
  },
  discountToGo: ({
    clonedState,
    action,
  }: {
    clonedState: OrderMerged
    action: Action
  }) => {
    if (action.type === ACTION_TYPES.discountToGo) {
      const updatedItems = clonedState.items.map((item) => {
        return {
          ...item,
          price: handleDiscount({
            type: item.type,
            price: item.basePrice,
            discount: clonedState.discount,
            toGo: action.value,
          }),
        }
      })

      return {
        ...clonedState,
        discountToGo: action.value,
        items: updatedItems,
      }
    }
    throw new Error(ACTION_SHOULD_NOT_BE_TRIGGERED)
  },
  basePrice: ({
    clonedState,
    action,
  }: {
    clonedState: OrderMerged
    action: Action
  }) => {
    if (action.type === ACTION_TYPES.basePrice) {
      const basePrice = action.value
      const price = handleDiscount({
        price: basePrice,
        type: clonedState.items[action.itemIndex].type,
        discount: clonedState.discount,
        toGo: clonedState.discountToGo,
      })
      _.set(clonedState, `items[${action.itemIndex}].basePrice`, basePrice)
      _.set(clonedState, `items[${action.itemIndex}].price`, price)

      return {
        ...clonedState,
      }
    }
    throw new Error(ACTION_SHOULD_NOT_BE_TRIGGERED)
  },
  setValue:
    ({ field }: { field: string }) =>
    ({ clonedState, action }: { clonedState: OrderMerged; action: Action }) => {
      if ("value" in action) {
        _.set(clonedState, field, action.value)
        return {
          ...clonedState,
        }
      }
      throw new Error(ACTION_SHOULD_NOT_BE_TRIGGERED)
    },
}

export default handlers
