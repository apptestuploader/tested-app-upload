/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_auth_register } from "../models/Body_auth_register"
import type { UserCreds } from "../models/UserCreds"
import type { UserData } from "../models/UserData"

import type { CancelablePromise } from "../core/CancelablePromise"
import { OpenAPI } from "../core/OpenAPI"
import { request as __request } from "../core/request"

export class Auth {
  /**
   * Login
   * @param requestBody
   * @returns UserData Successful Response
   * @throws ApiError
   */
  public static login(requestBody: UserCreds): CancelablePromise<UserData> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/login",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Validate Session
   * @returns UserData Successful Response
   * @throws ApiError
   */
  public static validateSession(): CancelablePromise<UserData> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/validate-session",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Register
   * @param requestBody
   * @returns any Successful Response
   * @throws ApiError
   */
  public static register(
    requestBody: Body_auth_register
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/register",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }
}
