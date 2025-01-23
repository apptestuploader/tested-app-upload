import { Container } from "@mui/material"
import { OrderMerged } from "../../../db/dbApi"
import SidecarOrder from "./SidecarOrder"

interface props {
  orders: OrderMerged[]
}

const SidecarContent = ({ orders }: props) => {
  return (
    <Container sx={{ mt: "1%" }}>
      {orders.map((order) => (
        <SidecarOrder order={order} key={order.id} />
      ))}
    </Container>
  )
}

export default SidecarContent
