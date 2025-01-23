import { Inventorys } from "../../api"
import { contextFactory } from "./EntityContextFactory"

const contextService = contextFactory({
  apiCall: async () => {
    const inventorys = await Inventorys.readInventorys(
      undefined,
      parseInt(process.env.REACT_APP_STOCK_LIMIT ?? "20")
    )
    return inventorys.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
  },
  initialValue: [],
})

export const InventoryContext = contextService.context
export const InventoryContextProvider = contextService.provider
