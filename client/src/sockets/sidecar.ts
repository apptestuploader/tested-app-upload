import { OrderMerged } from "../db/dbApi"

const sidecarSocketManager = () => {
  let ws: WebSocket | undefined = undefined
  return (setter: (orders: OrderMerged[]) => void) => {
    if (!ws) {
      ws = new WebSocket(`ws://tea.localhost/api/sidecar/ws?role=sidecar`)
      ws.onopen = () => {
        const orderRequest = {
          category: "orders please",
        }
        ws?.send(JSON.stringify(orderRequest))
      }
    }
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      if (data.category === "orders here") {
        setter(data.content)
      }
    }

    return ws
  }
}

const sidecarSocket = sidecarSocketManager()

export default sidecarSocket
