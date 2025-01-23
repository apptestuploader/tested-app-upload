import { useContext, useMemo } from "react"
import FiltersContext from "./FiltersContext"
import { OrderMerged } from "../../../../db/dbApi"

const useVisible = (order: OrderMerged) => {
  const { table, product } = useContext(FiltersContext.Context)
  const productExists = product.trim().toLowerCase() !== ""
  const tableExists = table.trim().toLowerCase() !== ""

  const orderCondition = useMemo(() => {
    if (productExists) {
      return order.items.some((item) =>
        item.name.toLowerCase().includes(product.trim().toLowerCase())
      )
    }
    return true
  }, [product, order.items])

  const tableCondition = useMemo(() => {
    if (tableExists) {
      return order.table.toLowerCase().includes(table.trim().toLowerCase())
    }
    return true
  }, [table, order.table])

  return orderCondition && tableCondition
}

export default useVisible
