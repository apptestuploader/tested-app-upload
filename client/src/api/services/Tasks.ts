/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Task } from "../models/Task"
import type { TaskCreate } from "../models/TaskCreate"
import type { TaskUpdate } from "../models/TaskUpdate"

import type { CancelablePromise } from "../core/CancelablePromise"
import { OpenAPI } from "../core/OpenAPI"
import { request as __request } from "../core/request"

export class Tasks {
  /**
   * Read Tasks
   * Retrieve tasks.
   * @param skip
   * @param limit
   * @returns Task Successful Response
   * @throws ApiError
   */
  public static readTasks(
    skip?: number,
    limit: number = 1000
  ): CancelablePromise<Array<Task>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/tasks/",
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
   * Create Task
   * @param requestBody
   * @returns Task Successful Response
   * @throws ApiError
   */
  public static createTask(requestBody: TaskCreate): CancelablePromise<Task> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/tasks/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Task
   * Get task by ID.
   * @param id
   * @returns Task Successful Response
   * @throws ApiError
   */
  public static readTask(id: string): CancelablePromise<Task> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/tasks/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Task
   * Update an task.
   * @param id
   * @param requestBody
   * @returns Task Successful Response
   * @throws ApiError
   */
  public static updateTask(
    id: string,
    requestBody: TaskUpdate
  ): CancelablePromise<Task> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/tasks/{id}",
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
   * Delete Task
   * Delete an task.
   * @param id
   * @returns Task Successful Response
   * @throws ApiError
   */
  public static deleteTask(id: string): CancelablePromise<Task> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/tasks/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}
