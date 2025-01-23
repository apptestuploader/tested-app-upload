import { alpha, Collapse, Stack, styled } from "@mui/material"
import PastOrder from "./PastOrder/PastOrder"
import { Order } from "../../../../api"
import DayNav from "./DayNav"
import { useCollapse } from "../../../hooks/useCollapse"

const StyledStack = styled(Stack, {
  shouldForwardProp: (prop: string) => prop !== "odd",
})(({ theme, odd }) => ({
  backgroundColor: odd
    ? alpha(theme.palette.custom.greyscale.main, 0.75)
    : alpha(theme.palette.custom.greyscale.secondary, 0.75),
  padding: 0,
  borderRadius: 20,
}))

const DayDisplay = ({
  date,
  orders,
  odd,
}: {
  date: string
  orders: Order[]
  odd: boolean
}) => {
  const { open: expanded, toggle } = useCollapse()

  return (
    <StyledStack odd={odd}>
      <DayNav
        date={date}
        orders={orders}
        expanded={expanded}
        expandableCallback={toggle}
      />
      <Collapse in={expanded}>
        {expanded
          ? orders.map((order, id) => (
              <PastOrder key={order.id} order={order} odd={!!(id % 2)} />
            ))
          : null}
      </Collapse>
    </StyledStack>
  )
}

export default DayDisplay
