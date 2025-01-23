import { Reservations } from "../../api"
import { contextFactory } from "./EntityContextFactory"
import { sortReservations } from "../../utils/dateSort"

const contextService = contextFactory({
  apiCall: async () =>
    (await Reservations.readReservations(undefined, 100)).sort(
      sortReservations
    ),
  initialValue: [],
})

export const ReservationContext = contextService.context
export const ReservationContextProvider = contextService.provider
