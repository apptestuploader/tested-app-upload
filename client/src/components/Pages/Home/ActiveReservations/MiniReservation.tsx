import { Reservation, Reservations } from "../../../../api"
import { ButtonGroup, Container, Modal, Stack, styled } from "@mui/material"
import { format } from "date-fns/esm"
import plLocale from "date-fns/locale/pl"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople"
import React, { useContext } from "react"
import { ReservationContext } from "../../../Contexts/Reservations"
import type { ThemeOptions } from "../../../../theme/theme"
import DoneButton from "../../Reservations/ReservationCard/Icons/DoneButton"
import ReservationButton from "../../Reservations/ReservationCard/Icons/ReservationButton"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import StyledTooltip from "../../../Commons/StyledTooltip"
import { useTranslation } from "react-i18next"
import { useFlag } from "../../../hooks/useFlag"
import PaperModal from "../../../Commons/PaperModal"
import ReservationCard2 from "../../Reservations/ReservationCard2"
import CardAvatar from "../../Reservations/ReservationCard/CardAvatar"
import VapingRoomsIcon from "@mui/icons-material/VapingRooms"
import VapeFreeIcon from "@mui/icons-material/VapeFree"
import CloseButton from "../../../Commons/CloseButton"

const StyledContainer = styled(Container, {
  shouldForwardProp: (prop: string) => prop !== "odd",
})(({ theme }: { theme: ThemeOptions; odd: boolean }) => ({
  color: theme.palette.custom.fontColor,
  marginBottom: "5%",
  marginTop: "5%",
}))

const MiniReservation = ({ reservation }: { reservation: Reservation }) => {
  const { t } = useTranslation()
  const { fetcher } = useContext(ReservationContext)
  const switchDoneState = async () => {
    await Reservations.updateReservation(reservation.id, {
      ...reservation,
      isReservationDone: !reservation.isReservationDone,
    })
    await fetcher()
  }
  const isReservationInAnHour =
    new Date(reservation.date).getTime() - Date.now() < 60 * 60 * 1000

  const { flag, toggleTrue, toggleFalse } = useFlag()

  return (
    <StyledContainer>
      <ButtonGroup>
        <StyledTooltip title={t("tooltips.reservations.more")}>
          <ReservationButton
            color={"success"}
            size={"small"}
            style={{
              border: "none",
            }}
            onClick={toggleTrue}
          >
            <MoreHorizIcon />
          </ReservationButton>
        </StyledTooltip>

        <DoneButton
          mini={true}
          state={reservation.isReservationDone ?? false}
          onClick={switchDoneState}
        />
      </ButtonGroup>
      <Stack>
        <CardAvatar
          placement={"right"}
          tooltip={t("tooltips.reservations.time")}
          Icon={<AccessTimeIcon />}
          variant={"square"}
          value={format(new Date(reservation.date), "HH:mm", {
            locale: plLocale,
          })}
          color={isReservationInAnHour ? "red" : "blue"}
        />
        <CardAvatar
          placement={"right"}
          tooltip={t("tooltips.reservations.people")}
          Icon={<EmojiPeopleIcon />}
          variant={"square"}
          value={reservation.people}
          color={"blue"}
        />
        <CardAvatar
          placement={"right"}
          tooltip={t("tooltips.reservations.isHookah")}
          Icon={
            reservation.isWaterPipe ? <VapingRoomsIcon /> : <VapeFreeIcon />
          }
          variant={"square"}
          color={reservation.isWaterPipe ? "red" : "green"}
        />
      </Stack>

      <Modal open={flag} onClose={toggleFalse}>
        <PaperModal padding={"1%"}>
          <Stack>
            <CloseButton onClick={toggleFalse} />
            <ReservationCard2 reservation={reservation} />
          </Stack>
        </PaperModal>
      </Modal>
    </StyledContainer>
  )
}

export default MiniReservation
