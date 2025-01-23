import SidecarLayout from "../../Layouts/SidecarLayout"
import SidecarContent from "./SidecarContent"
import { useState } from "react"
import { OrderMerged } from "../../../db/dbApi"
import socket from "../../../sockets/sidecar"
import SocketContext from "./SocketContext"

const Sidecar = () => {
  const [orders, setOrders] = useState<OrderMerged[]>([])
  const ws = socket(setOrders)

  return (
    <SocketContext.Provider value={ws}>
      <SidecarLayout Body={<SidecarContent orders={orders} />} />
    </SocketContext.Provider>
  )
}

export default Sidecar
