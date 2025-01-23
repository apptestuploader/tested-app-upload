import { compareAsc, compareDesc } from "date-fns"
import { Order, Reservation } from "../api"

export const sortReservations = (a: Reservation, b: Reservation) =>
  compareAsc(new Date(a.date), new Date(b.date))

export const sortOrders = (a: Order, b: Order) =>
  compareDesc(new Date(a.createdAt), new Date(b.createdAt))
