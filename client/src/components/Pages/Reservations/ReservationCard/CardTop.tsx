import { ButtonGroup, Stack, Typography } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { Reservation, Reservations } from "../../../../api"
import { useContext } from "react"
import { ReservationContext } from "../../../Contexts/Reservations"
import DoneButton from "./Icons/DoneButton"
import ReservationButton from "./Icons/ReservationButton"
import { formatDistance } from "date-fns"
import plLocale from "date-fns/locale/pl"

const CardTop = ({
  reservation,
  openModal,
}: {
  reservation: Reservation
  openModal: () => void
}) => {
  const { fetcher } = useContext(ReservationContext)

  const switchDoneState = async () => {
    await Reservations.updateReservation(reservation.id, {
      ...reservation,
      isReservationDone: !reservation.isReservationDone,
    })
    await fetcher()
  }
  const dateTime = new Date(reservation.date)

  return (
    <Stack direction={"row"} style={{ marginBottom: "3%" }}>
      <Typography textAlign={"right"}>
        {formatDistance(dateTime, new Date(), {
          addSuffix: true,
          locale: plLocale,
        })}
      </Typography>
      <ButtonGroup style={{ marginLeft: "auto" }}>
        <DoneButton
          state={reservation.isReservationDone ?? false}
          onClick={switchDoneState}
        />

        <ReservationButton
          onClick={openModal}
          variant={"contained"}
          size={"small"}
        >
          <EditIcon />
        </ReservationButton>
      </ButtonGroup>
    </Stack>
  )
}

export default CardTop
