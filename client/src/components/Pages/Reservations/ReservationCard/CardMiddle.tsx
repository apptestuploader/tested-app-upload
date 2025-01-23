import { Reservation } from "../../../../api"
import { ButtonGroup, Stack } from "@mui/material"
import PermIdentityIcon from "@mui/icons-material/PermIdentity"
import MoreIcon from "@mui/icons-material/More"
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant"
import ReservationButton from "./Icons/ReservationButton"

const CardMiddle = ({ reservation }: { reservation: Reservation }) => {
  return (
    <Stack style={{ width: "100%", marginLeft: "3%", marginRight: "3%" }}>
      <ButtonGroup orientation={"vertical"} style={{ width: "100%" }}>
        <ReservationButton
          color={"warning"}
          variant={"contained"}
          size={"small"}
          style={{ width: "100%" }}
          disabled
        >
          <TableRestaurantIcon />
          {reservation.table}
        </ReservationButton>
        <ReservationButton
          color={"info"}
          variant={"contained"}
          size={"small"}
          disabled
        >
          <PermIdentityIcon />
          {reservation.name}
        </ReservationButton>
        <ReservationButton
          color={"warning"}
          variant={"contained"}
          size={"small"}
          disabled
        >
          <MoreIcon />
          {reservation.hints}
        </ReservationButton>
      </ButtonGroup>
    </Stack>
  )
}

export default CardMiddle
