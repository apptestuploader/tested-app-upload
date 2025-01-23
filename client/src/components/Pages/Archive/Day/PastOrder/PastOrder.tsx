import { Order } from "../../../../../api"
import { alpha, Box, Collapse, Container, styled } from "@mui/material"
import PastOrderBar from "./PastOrderBar"
import PastItem from "./PastItem"
import { useCollapse } from "../../../../hooks/useCollapse"

const StyledBox = styled(Box, {
  shouldForwardProp: (prop: string) => prop !== "odd",
})(({ theme, odd }) => ({
  backgroundColor: odd
    ? alpha(theme.palette.custom.greyscale.main, 0.5)
    : alpha(theme.palette.custom.greyscale.secondary, 0.5),
  padding: 8,
  borderRadius: 20,
}))

const PastOrder = ({ order, odd }: { order: Order; odd: boolean }) => {
  const { open: expanded, toggle } = useCollapse()

  return (
    <StyledBox odd={odd}>
      <PastOrderBar
        order={order}
        expanded={expanded}
        expandedCallback={toggle}
      />
      <Collapse in={expanded}>
        <Container sx={{ paddingTop: 1 }}>
          {expanded
            ? order.items.map((item, index) => (
                <PastItem key={item.id} item={item} first={index === 0} />
              ))
            : null}
        </Container>
      </Collapse>
    </StyledBox>
  )
}

export default PastOrder
