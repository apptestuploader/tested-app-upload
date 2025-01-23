/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Reservation } from "../models/Reservation"
import type { ReservationCreate } from "../models/ReservationCreate"
import type { ReservationUpdate } from "../models/ReservationUpdate"

import type { CancelablePromise } from "../core/CancelablePromise"
import { OpenAPI } from "../core/OpenAPI"
import { request as __request } from "../core/request"

export class Reservations {
  /**
   * Read Reservations
   * Retrieve reservations.
   * @param skip
   * @param limit
   * @param fromDate
   * @returns Reservation Successful Response
   * @throws ApiError
   */
  public static readReservations(
    skip?: number,
    limit: number = 1000,
    fromDate?: string
  ): CancelablePromise<Array<Reservation>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/reservations/",
      query: {
        skip: skip,
        limit: limit,
        from_date: fromDate,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Reservation
   * @param requestBody
   * @returns Reservation Successful Response
   * @throws ApiError
   */
  public static createReservation(
    requestBody: ReservationCreate
  ): CancelablePromise<Reservation> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/reservations/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Reservation
   * Get reservation by ID.
   * @param id
   * @returns Reservation Successful Response
   * @throws ApiError
   */
  public static readReservation(id: string): CancelablePromise<Reservation> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/reservations/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Reservation
   * Update an reservation.
   * @param id
   * @param requestBody
   * @returns Reservation Successful Response
   * @throws ApiError
   */
  public static updateReservation(
    id: string,
    requestBody: ReservationUpdate
  ): CancelablePromise<Reservation> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/reservations/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Reservation
   * Delete an reservation.
   * @param id
   * @returns Reservation Successful Response
   * @throws ApiError
   */
  public static deleteReservation(id: string): CancelablePromise<Reservation> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/reservations/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}
