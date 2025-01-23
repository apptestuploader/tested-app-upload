/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ReservationCreate = {
  date: string
  name: string
  table: string
  people?: number
  isWaterPipe?: boolean
  hints?: string
  isReservationDone?: boolean
}
