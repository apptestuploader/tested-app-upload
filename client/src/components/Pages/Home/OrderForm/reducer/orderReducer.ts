import { OrderMerged } from "../../../../../db/dbApi"
import _ from "lodash"
import handlers from "./handlers"
import { Action, ACTION_TYPES } from "./actions"
import { shouldCollapse } from "./indirectHandlers"

export const orderReducer = (state: OrderMerged, action: Action) => {
  const clonedState = _.cloneDeep(state)

  switch (action.type) {
    case ACTION_TYPES.newInventory: {
      return handlers.newInventory({ clonedState, action })
    }
    case ACTION_TYPES.type: {
      return handlers.type({ clonedState, action })
    }
    case ACTION_TYPES.quantity: {
      return handlers.quantity({ clonedState, action })
    }
    case ACTION_TYPES.discount: {
      return handlers.discount({ clonedState, action })
    }
    case ACTION_TYPES.discountToGo: {
      return handlers.discountToGo({ clonedState, action })
    }
    case ACTION_TYPES.basePrice: {
      return handlers.basePrice({ clonedState, action })
    }
    case ACTION_TYPES.price: {
      return handlers.setValue({ field: `items[${action.itemIndex}].price` })({
        clonedState,
        action,
      })
    }
    case ACTION_TYPES.table: {
      return handlers.setValue({ field: "table" })({ clonedState, action })
    }
    case ACTION_TYPES.paid: {
      return handlers.setValue({ field: "paid" })({ clonedState, action })
    }
    case ACTION_TYPES.hint: {
      return handlers.setValue({ field: `items[${action.itemIndex}].hint` })({
        clonedState,
        action,
      })
    }
    case ACTION_TYPES.prepared: {
      const newState = handlers.setValue({
        field: `items[${action.itemIndex}].prepared`,
      })({ clonedState, action })

      if (shouldCollapse(newState.items)) {
        return handlers.setValue({ field: "collapsed" })({
          clonedState: newState,
          action: { type: ACTION_TYPES.collapsed, value: true },
        })
      }

      return newState
    }
    case ACTION_TYPES.updateItems: {
      return handlers.setValue({ field: "items" })({ clonedState, action })
    }
    case ACTION_TYPES.collapsed: {
      return handlers.setValue({ field: "collapsed" })({ clonedState, action })
    }
    default: {
      throw new Error("State not handled.")
    }
  }
}
