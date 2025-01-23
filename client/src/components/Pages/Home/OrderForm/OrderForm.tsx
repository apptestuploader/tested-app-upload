import { alpha, Collapse, Container, styled } from "@mui/material"
import ItemForm from "./ItemForm/ItemForm"
import { OrderMerged } from "../../../../db/dbApi"
import OrderFormPanel from "./OrderFormPanel/OrderFormPanel"
import { useOrder } from "./useOrder"
import useVisible from "../Filters/useFilters"

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    backgroundColor: alpha(theme.palette.custom.greyscale.main, 0.75),
    padding: 0,
    paddingTop: "1%",
    paddingBottom: "1%",
    marginTop: "1%",
    borderRadius: 25,
    // Allows for the last order be in the middle of the screen.
    "&:last-of-type": {
      marginBottom: "25%",
    },
  }
})

const OrderForm = ({ order }: { order: OrderMerged }) => {
  const { state, sums, dispatch } = useOrder(order)
  const visible = useVisible(state)
  return (
    <StyledContainer
      style={{
        display: visible ? "block" : "none",
      }}
    >
      <Container>
        <OrderFormPanel
          baseSum={sums.base}
          totalSum={sums.total}
          state={state}
          dispatch={dispatch}
        />
      </Container>
      <Collapse in={!order.collapsed}>
        <Container sx={{ paddingTop: 1 }}>
          {state.items.map((item, index) => (
            <ItemForm
              key={item.id}
              item={item}
              first={index === 0}
              index={index}
              dispatch={dispatch}
              state={state}
            />
          ))}
        </Container>
      </Collapse>
    </StyledContainer>
  )
}

export default OrderForm
