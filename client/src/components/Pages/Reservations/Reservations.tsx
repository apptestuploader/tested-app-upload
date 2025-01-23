import BaseLayout from "../../Layouts/BaseLayout"
import Navigation from "../../Navigation/Navigation"
import ReservationDisplay from "./ReservationDisplay"
import ViewButton from "../../Commons/ViewButton"
import { useTranslation } from "react-i18next"
import { useFlag } from "../../hooks/useFlag"
import CreateReservationForm from "./ReservationCard/CreateReservationForm/CreateReservationForm"
import { EMPTY_RESERVATION } from "./emptyReservation"

const Reservations = () => {
  const { t } = useTranslation()
  const { flag, toggleTrue, toggleFalse } = useFlag()

  return (
    <BaseLayout
      Header={
        <Navigation
          ViewButton={
            <ViewButton
              text={t("reservations.createReservation")}
              onClick={toggleTrue}
            />
          }
        />
      }
      Body={<ReservationDisplay />}
      Modal={
        flag ? (
          <CreateReservationForm
            reservation={{
              ...EMPTY_RESERVATION,
              date: new Date().toLocaleString("en-GB"),
            }}
            open={flag}
            onClose={toggleFalse}
          />
        ) : null
      }
    />
  )
}

export default Reservations
