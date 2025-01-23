import { useContext } from "react"
import { ReservationContext } from "../../Contexts/Reservations"
import { Container, Grid, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import ReservationCard2 from "./ReservationCard2"

const ReservationDisplay = () => {
  const { t } = useTranslation()
  const { values } = useContext(ReservationContext)

  return (
    <Container>
      <Typography variant={"h5"}>
        {t("reservations.incomingReservations")}
      </Typography>

      <Grid container spacing={4} justifyContent={"center"}>
        {values.map((reservation) => (
          <Grid item xs={12} md={6} lg={4} key={reservation.id}>
            <ReservationCard2 reservation={reservation} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ReservationDisplay
