import { Reservation, Reservations } from "../../../api"
import {
  alpha,
  ButtonGroup,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { useFlag } from "../../hooks/useFlag"
import CreateReservationForm from "./ReservationCard/CreateReservationForm/CreateReservationForm"
import { format, formatDistance } from "date-fns"
import plLocale from "date-fns/locale/pl"
import enLocale from "date-fns/locale/en-GB"
import PermIdentityIcon from "@mui/icons-material/PermIdentity"
import MoreIcon from "@mui/icons-material/More"
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant"

import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople"
import VapingRoomsIcon from "@mui/icons-material/VapingRooms"
import VapeFreeIcon from "@mui/icons-material/VapeFree"
import DoneButton from "./ReservationCard/Icons/DoneButton"
import ReservationButton from "./ReservationCard/Icons/ReservationButton"
import { useContext } from "react"
import { ReservationContext } from "../../Contexts/Reservations"
import { useTranslation } from "react-i18next"
import CardAvatar from "./ReservationCard/CardAvatar"

const StyledCard = styled(Card)(({ theme }) => ({
  color: theme.palette.custom.fontColor,
  backgroundColor: alpha(theme.palette.custom.greyscale.main, 0.75),
}))

const dateLocaleMap = (locale: string) => {
  switch (locale) {
    case "pl":
      return plLocale
    case "en":
      return enLocale
    default:
      return enLocale
  }
}

const ReservationCard2 = ({ reservation }: { reservation: Reservation }) => {
  const { flag, toggleTrue, toggleFalse } = useFlag()
  const dateTime = new Date(reservation.date)
  const { fetcher } = useContext(ReservationContext)
  const { i18n, t } = useTranslation()
  const dateLocale = dateLocaleMap(i18n.language)
  const isReservationToday =
    format(dateTime, "dd.MM.yyyy") === format(new Date(), "dd.MM.yyyy")

  const switchDoneState = async () => {
    await Reservations.updateReservation(reservation.id, {
      ...reservation,
      isReservationDone: !reservation.isReservationDone,
    })
    await fetcher()
  }
  return (
    <StyledCard raised>
      <CardContent>
        <Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <CardAvatar
              tooltip={t("tooltips.reservations.day")}
              Icon={<CalendarMonthIcon sx={{ mr: "10%" }} />}
              value={format(dateTime, "dd/MM", { locale: plLocale })}
              color={isReservationToday ? "red" : "blue"}
            />

            <ButtonGroup>
              <DoneButton
                state={reservation.isReservationDone ?? false}
                onClick={switchDoneState}
              />
              <Tooltip title={t("tooltips.reservations.edit")}>
                <ReservationButton
                  onClick={toggleTrue}
                  variant={"contained"}
                  size={"large"}
                >
                  <EditIcon />
                </ReservationButton>
              </Tooltip>
            </ButtonGroup>
          </Stack>
          <Stack
            sx={{ mt: 1 }}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <CardAvatar
              tooltip={t("tooltips.reservations.time")}
              Icon={<AccessTimeIcon sx={{ mr: "10%" }} />}
              value={format(dateTime, "HH:mm", { locale: plLocale })}
            />
            <CardAvatar
              tooltip={t("tooltips.reservations.people")}
              Icon={<EmojiPeopleIcon sx={{ mr: "10%" }} />}
              value={reservation.people}
            />
            <CardAvatar
              tooltip={t("tooltips.reservations.isHookah")}
              Icon={
                reservation.isWaterPipe ? <VapingRoomsIcon /> : <VapeFreeIcon />
              }
              color={reservation.isWaterPipe ? "red" : "green"}
            />
          </Stack>

          <List sx={{ mt: 1 }}>
            {reservation.table && (
              <Tooltip
                title={t("tooltips.reservations.table")}
                placement={"left"}
              >
                <ListItem>
                  <ListItemAvatar>
                    <CardAvatar
                      Icon={<TableRestaurantIcon />}
                      variant={"circular"}
                    />
                  </ListItemAvatar>
                  {reservation.table}
                </ListItem>
              </Tooltip>
            )}
            {reservation.name && (
              <Tooltip
                title={t("tooltips.reservations.name")}
                placement={"left"}
              >
                <ListItem>
                  <ListItemAvatar>
                    <CardAvatar
                      Icon={<PermIdentityIcon />}
                      variant={"circular"}
                    />
                  </ListItemAvatar>
                  {reservation.name}
                </ListItem>
              </Tooltip>
            )}
            {reservation.hints && (
              <Tooltip
                title={t("tooltips.reservations.hints")}
                placement={"left"}
              >
                <ListItem>
                  <ListItemAvatar>
                    <CardAvatar Icon={<MoreIcon />} variant={"circular"} />
                  </ListItemAvatar>
                  {reservation.hints}
                </ListItem>
              </Tooltip>
            )}
            <ListItem>
              <Typography textAlign={"right"}>
                {formatDistance(dateTime, new Date(), {
                  addSuffix: true,
                  locale: dateLocale,
                })}
              </Typography>
            </ListItem>
          </List>
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

export default ReservationCard2
