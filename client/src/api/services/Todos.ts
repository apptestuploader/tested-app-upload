/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Todo } from "../models/Todo"
import type { TodoCreate } from "../models/TodoCreate"
import type { TodoUpdate } from "../models/TodoUpdate"

import type { CancelablePromise } from "../core/CancelablePromise"
import { OpenAPI } from "../core/OpenAPI"
import { request as __request } from "../core/request"

export class Todos {
  /**
   * Read Todos
   * Retrieve todos.
   * @param skip
   * @param limit
   * @returns Todo Successful Response
   * @throws ApiError
   */
  public static readTodos(
    skip?: number,
    limit: number = 1000
  ): CancelablePromise<Array<Todo>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/todos/",
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
   * Create Todo
   * @param taskId
   * @param requestBody
   * @returns Todo Successful Response
   * @throws ApiError
   */
  public static createTodo(
    taskId: string,
    requestBody: TodoCreate
  ): CancelablePromise<Todo> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/todos/{task_id}",
      path: {
        task_id: taskId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Todo
   * Get todo by ID.
   * @param id
   * @returns Todo Successful Response
   * @throws ApiError
   */
  public static readTodo(id: string): CancelablePromise<Todo> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/todos/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Todo
   * Update an todo.
   * @param id
   * @param requestBody
   * @returns Todo Successful Response
   * @throws ApiError
   */
  public static updateTodo(
    id: string,
    requestBody: TodoUpdate
  ): CancelablePromise<Todo> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/todos/{id}",
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
   * Delete Todo
   * Delete an todo.
   * @param id
   * @returns Todo Successful Response
   * @throws ApiError
   */
  public static deleteTodo(id: string): CancelablePromise<Todo> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/todos/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}
