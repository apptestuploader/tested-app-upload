import ActiveReservations from "./ActiveReservations/ActiveReservations"
import OrderForm from "./OrderForm/OrderForm"
import { Grid } from "@mui/material"
import { OrderMerged } from "../../../db/dbApi"

const HomeContent = ({ activeOrders }: { activeOrders: OrderMerged[] }) => {
  return (
    <Grid container>
      <Grid item xs={1}>
        <ActiveReservations />
      </Grid>
      <Grid item xs={11}>
        {activeOrders.map((order) => (
          <OrderForm key={order.id} order={order} />
        ))}
      </Grid>
    </Grid>
  )
}

export default HomeContent
