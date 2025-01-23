/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Inventory } from "../models/Inventory"
import type { InventoryCreate } from "../models/InventoryCreate"
import type { InventoryUpdate } from "../models/InventoryUpdate"

import type { CancelablePromise } from "../core/CancelablePromise"
import { OpenAPI } from "../core/OpenAPI"
import { request as __request } from "../core/request"

export class Inventorys {
  /**
   * Read Inventorys
   * Retrieve inventorys.
   * @param skip
   * @param limit
   * @returns Inventory Successful Response
   * @throws ApiError
   */
  public static readInventorys(
    skip?: number,
    limit: number = 1000
  ): CancelablePromise<Array<Inventory>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/inventory/",
      query: {
        skip: skip,
        limit: limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Inventory
   * @param requestBody
   * @returns Inventory Successful Response
   * @throws ApiError
   */
  public static createInventory(
    requestBody: InventoryCreate
  ): CancelablePromise<Inventory> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/inventory/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad Request`,
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Inventory
   * Get inventory by ID.
   * @param id
   * @returns Inventory Successful Response
   * @throws ApiError
   */
  public static readInventory(id: string): CancelablePromise<Inventory> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/inventory/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Inventory
   * Update an inventory.
   * @param id
   * @param requestBody
   * @returns Inventory Successful Response
   * @throws ApiError
   */
  public static updateInventory(
    id: string,
    requestBody: InventoryUpdate
  ): CancelablePromise<Inventory> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/inventory/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad Request`,
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Inventory
   * Delete an inventory.
   * @param id
   * @returns Inventory Successful Response
   * @throws ApiError
   */
  public static deleteInventory(id: string): CancelablePromise<Inventory> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/inventory/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}
