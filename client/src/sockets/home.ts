import { exportState, OrderMerged } from "../db/dbApi"

const homeSocketManager = () => {
  let ws: WebSocket | undefined = undefined
  let anySidecars = false
  return (activeOrders: OrderMerged[]) => {
    if (!ws) {
      ws = new WebSocket(`ws://tea.localhost/api/sidecar/ws?role=mom`)
    }
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      if (data.category === "any sidecars") {
        anySidecars = data.content
      }

      if (anySidecars && data.category === "orders please") {
        ws?.send(
          JSON.stringify({
            category: "orders here",
            content: activeOrders,
          })
        )
      }

      if (data.category === "item ready") {
        const { orderId, itemId } = data.content
        const order = activeOrders.find((order) => order.id === orderId)
        if (order) {
          const item = order.items.find((item) => item.id === itemId)

          if (item) {
            const otherItems = order.items.filter((item) => item.id !== itemId)
            exportState({
              order: {
                ...order,
                items: [...otherItems, { ...item, prepared: !item.prepared }],
              },
            })
          }
        }
      }
    }
    return { ws, anySidecars }
  }
}
const homeSocket = homeSocketManager()

export default homeSocket
