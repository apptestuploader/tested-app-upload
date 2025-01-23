import { sortReservations } from "../../../../utils/dateSort"
import MiniReservation from "./MiniReservation"
import { Stack } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { ReservationContext } from "../../../Contexts/Reservations"
import { Reservation } from "../../../../api"
import { subHours } from "date-fns"

const filterReservations = (reservations: Reservation[]): Reservation[] => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const onlyAfter = subHours(now, 1)
  return reservations.filter((reservation) => {
    const targetDate = new Date(reservation.date)
    return (
      today.getFullYear() === targetDate.getFullYear() &&
      today.getMonth() === targetDate.getMonth() &&
      today.getDate() === targetDate.getDate() &&
      targetDate.getTime() >= onlyAfter.getTime()
    )
  })
}

const useReservations = () => {
  const { values: reservations } = useContext(ReservationContext)
  const [activeReservations, setActiveReservations] = useState(
    [] as Reservation[]
  )
  useEffect(() => {
    const minute = 1000 * 60
    setActiveReservations(filterReservations(reservations))

    const listener = setInterval(() => {
      setActiveReservations(filterReservations(reservations))
    }, minute)

    return () => clearInterval(listener)
  }, [reservations])

  return activeReservations
}

const ActiveReservations = () => {
  const activeReservations = useReservations()

  return (
    <Stack>
      {activeReservations.length
        ? activeReservations
            .sort(sortReservations)
            .map((reservation) => (
              <MiniReservation key={reservation.id} reservation={reservation} />
            ))
        : null}
    </Stack>
  )
}

export default ActiveReservations
