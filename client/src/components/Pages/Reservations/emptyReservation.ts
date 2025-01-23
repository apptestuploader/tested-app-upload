import { ReservationCreate } from "../../../api"

export const EMPTY_RESERVATION: ReservationCreate = {
  date: new Date().toLocaleString("en-GB"),
  name: "",
  table: "",
  people: 2,
  isWaterPipe: false,
  hints: "",
  isReservationDone: false,
}
