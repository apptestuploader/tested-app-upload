/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from "../models/Item"
import type { ItemCreate } from "../models/ItemCreate"
import type { ItemUpdate } from "../models/ItemUpdate"

import type { CancelablePromise } from "../core/CancelablePromise"
import { OpenAPI } from "../core/OpenAPI"
import { request as __request } from "../core/request"

export class Items {
  /**
   * Read Items
   * Retrieve items.
   * @param skip
   * @param limit
   * @returns Item Successful Response
   * @throws ApiError
   */
  public static readItems(
    skip?: number,
    limit: number = 100
  ): CancelablePromise<Array<Item>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/items/",
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
   * Create Item
   * @param requestBody
   * @returns Item Successful Response
   * @throws ApiError
   */
  public static createItem(requestBody: ItemCreate): CancelablePromise<Item> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/items/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Item
   * Get item by ID.
   * @param id
   * @returns Item Successful Response
   * @throws ApiError
   */
  public static readItem(id: string): CancelablePromise<Item> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/items/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Item
   * Update an item.
   * @param id
   * @param requestBody
   * @returns Item Successful Response
   * @throws ApiError
   */
  public static updateItem(
    id: string,
    requestBody: ItemUpdate
  ): CancelablePromise<Item> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/items/{id}",
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
   * Delete Item
   * Delete an item.
   * @param id
   * @returns Item Successful Response
   * @throws ApiError
   */
  public static deleteItem(id: string): CancelablePromise<Item> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/items/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}
