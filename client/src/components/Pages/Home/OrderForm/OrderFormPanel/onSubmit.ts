import { deleteOrder, OrderMerged } from "../../../../../db/dbApi"
import { ApiError, Orders } from "../../../../../api"

const onSubmit = async (
  state: OrderMerged,
  callbacks: {
    onSave: () => void
    onDelete: () => void
    onError: (error: string) => void
  }
) => {
  // Todo: Handled unhappy path.
  try {
    const itemsToCreate = state.items
      .filter((item) => item.name)
      .map((item) => ({
        ...item,
        discountedPrice: item.price,
        price: item.basePrice,
      }))

    if (itemsToCreate.length) {
      const orderToCreate = {
        ...state,
        discount: isNaN(state.discount) ? 0 : state.discount,
        isDiscountToGo: state.discountToGo,
        closed: true,
        items: itemsToCreate,
      }
      // @ts-ignore
      await Orders.submitOrder(orderToCreate)
      callbacks.onSave()
    } else {
      callbacks.onDelete()
    }

    await deleteOrder({ id: state.id })
  } catch (e) {
    if (typeof e === "string") {
      callbacks.onError(e)
    } else if (e instanceof ApiError) {
      callbacks.onError(e.body.error)
    } else if (e instanceof Error) {
      callbacks.onError(e.message)
    }
    console.error(e)
  }
}

export default onSubmit
