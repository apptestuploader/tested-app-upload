import { alpha, Card, CardContent, Stack, styled } from "@mui/material"
import { Reservation } from "../../../../api"
import CardTop from "./CardTop"
import CardMiddle from "./CardMiddle"
import CardRight from "./CardRight"
import { useFlag } from "../../../hooks/useFlag"
import CreateReservationForm from "./CreateReservationForm/CreateReservationForm"

const StyledCard = styled(Card)(({ theme }) => ({
  color: theme.palette.custom.fontColor,
  backgroundColor: alpha(theme.palette.custom.greyscale.main, 0.75),
}))

const ReservationCard = ({ reservation }: { reservation: Reservation }) => {
  const { flag, toggleTrue, toggleFalse } = useFlag()

  return (
    <StyledCard raised>
      <CardContent>
        <Stack>
          <CardTop reservation={reservation} openModal={toggleTrue} />
          <Stack direction={"row"} justifyContent={"space-between"}>
            <CardMiddle reservation={reservation} />
            <CardRight reservation={reservation} />
          </Stack>
        </Stack>
      </CardContent>

      <CreateReservationForm
        id={reservation.id}
        reservation={{
          ...reservation,
          date: new Date(reservation.date).toLocaleString("en-GB"),
        }}
        open={flag}
        onClose={toggleFalse}
      />
    </StyledCard>
  )
}

export default ReservationCard
