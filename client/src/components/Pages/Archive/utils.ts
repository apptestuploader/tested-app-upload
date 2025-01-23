import { Order, Orders } from "../../../api"
import { compareDesc, format } from "date-fns"
import _ from "lodash"
import { useEffect, useState } from "react"
import priceFormatter from "../../../utils/priceFormatter"

const sortGrouped = (sortedOrders: { [p: string]: Order[] }) => {
  const sortedKeys = Object.keys(sortedOrders).sort(
    (keyA: string, keyB: string) => compareDesc(new Date(keyA), new Date(keyB))
  )
  return sortedKeys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: sortedOrders[key],
    }),
    {}
  )
}

const groupOrdersByDate = (orders: Order[]): { [p: string]: Order[] } => {
  const res: { [p: string]: Order[] } = {}

  return sortGrouped(
    orders.reduce((acc, order) => {
      const key = format(new Date(order.createdAt), "yyyy-MM-dd")
      const thisOrders = acc[key] ?? []
      return {
        ...acc,
        [key]: [...thisOrders, order],
      }
    }, res)
  )
}

const priceSum = (field: string) => (orders: Order[]) =>
  priceFormatter(
    orders.reduce(
      (acc, order) =>
        acc +
        // @ts-ignore
        _.sumBy(order.items, (i) => i[field]),
      0
    )
  )

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 //months start from 0
  const day = date.getDate()

  return `${year}-${month}-${day}`
}

export const useArchive = () => {
  const [{ fetchArchive }, archiveSetter] = useState<{
    fetchArchive: () => Promise<void>
  }>({
    fetchArchive: async () => {},
  })

  const [dates, setDates] = useState({
    from: new Date(),
    to: new Date(),
  })
  const [orders, setOrders] = useState<Order[]>([])

  const baseIncome = priceSum("price")(orders)
  const totalIncome = priceSum("discountedPrice")(orders)

  useEffect(() => {
    archiveSetter({
      fetchArchive: async () => {
        const orders = await Orders.readOrders(
          undefined,
          undefined,
          formatDate(dates.from),
          formatDate(dates.to)
        )
        setOrders(orders)
      },
    })
  }, [dates])

  useEffect(() => {
    fetchArchive()
  }, [fetchArchive])

  return {
    orders: groupOrdersByDate(orders),
    dates: {
      ...dates,
      setter: setDates,
    },
    fetchArchive,
    income: {
      base: baseIncome,
      total: totalIncome,
    },
  }
}
