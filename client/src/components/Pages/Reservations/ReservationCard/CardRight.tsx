import { Reservation } from "../../../../api"
import { format } from "date-fns/esm"
import plLocale from "date-fns/locale/pl"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { ButtonGroup, Stack } from "@mui/material"
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople"
import ReservationButton from "./Icons/ReservationButton"
import VapeIcon from "./Icons/VapeIcon"

const CardRight = ({ reservation }: { reservation: Reservation }) => {
  const dateTime = new Date(reservation.date)
  const isReservationToday =
    format(dateTime, "dd.MM.yyyy") === format(new Date(), "dd.MM.yyyy")
  return (
    <Stack>
      <ButtonGroup orientation={"vertical"}>
        <ReservationButton variant={"contained"} size={"small"} disabled>
          <AccessTimeIcon />
          {format(dateTime, "HH:mm", { locale: plLocale })}
        </ReservationButton>
        <ReservationButton
          color={isReservationToday ? "error" : "warning"}
          variant={"contained"}
          size={"small"}
          disabled
        >
          <CalendarMonthIcon />
          {format(dateTime, "dd/MM", { locale: plLocale })}
        </ReservationButton>
        <ReservationButton variant={"contained"} size={"small"} disabled>
          <EmojiPeopleIcon />
          {reservation.people}
        </ReservationButton>
        <VapeIcon smoking={reservation.isWaterPipe ?? false} />
      </ButtonGroup>
    </Stack>
  )
}

export default CardRight
