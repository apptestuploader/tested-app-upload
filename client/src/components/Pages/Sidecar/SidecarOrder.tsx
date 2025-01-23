import { OrderMerged } from "../../../db/dbApi"
import SidecarItem from "./SidecarItem"
import { Stack } from "@mui/material"
import { useContext } from "react"
import SocketContext from "./SocketContext"

interface props {
  order: OrderMerged
}

const SidecarOrder = ({ order }: props) => {
  const ws = useContext(SocketContext)

  return (
    <Stack sx={{ mb: "1rem" }}>
      {order.items
        .filter((item) => item.name)
        .map((item, index) => (
          <SidecarItem
            key={item.id}
            item={item}
            table={order.table}
            first={index === 0}
            dispatch={() => {
              ws?.send(
                JSON.stringify({
                  category: "item ready",
                  content: {
                    itemId: item.id,
                    orderId: order.id,
                  },
                })
              )
            }}
          />
        ))}
    </Stack>
  )
}

export default SidecarOrder
