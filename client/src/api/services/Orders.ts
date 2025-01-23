/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Order } from "../models/Order"
import type { OrderCreate } from "../models/OrderCreate"
import type { OrderUpdate } from "../models/OrderUpdate"
import type { OrderWithItemsCreate } from "../models/OrderWithItemsCreate"

import type { CancelablePromise } from "../core/CancelablePromise"
import { OpenAPI } from "../core/OpenAPI"
import { request as __request } from "../core/request"

export class Orders {
  /**
   * Read Orders
   * Retrieve orders.
   * @param skip
   * @param limit
   * @param dateFrom
   * @param dateTo
   * @returns Order Successful Response
   * @throws ApiError
   */
  public static readOrders(
    skip?: number,
    limit?: number,
    dateFrom?: string,
    dateTo?: string
  ): CancelablePromise<Array<Order>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/orders/",
      query: {
        skip: skip,
        limit: limit,
        date_from: dateFrom,
        date_to: dateTo,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Order
   * @param requestBody
   * @returns Order Successful Response
   * @throws ApiError
   */
  public static createOrder(
    requestBody: OrderCreate
  ): CancelablePromise<Order> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/orders/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Submit Order
   * @param requestBody
   * @returns Order Successful Response
   * @throws ApiError
   */
  public static submitOrder(
    requestBody: OrderWithItemsCreate
  ): CancelablePromise<Order> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/orders/submit",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Order
   * Get order by ID.
   * @param id
   * @returns Order Successful Response
   * @throws ApiError
   */
  public static readOrder(id: string): CancelablePromise<Order> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/orders/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Order
   * Update an order.
   * @param id
   * @param requestBody
   * @returns Order Successful Response
   * @throws ApiError
   */
  public static updateOrder(
    id: string,
    requestBody: OrderUpdate
  ): CancelablePromise<Order> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/orders/{id}",
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
   * Delete Order
   * Delete an order.
   * @param id
   * @returns Order Successful Response
   * @throws ApiError
   */
  public static deleteOrder(id: string): CancelablePromise<Order> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/orders/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}
