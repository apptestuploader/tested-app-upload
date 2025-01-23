/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Prices = {
  priceDefault: number
  priceGaiwan: number
  pricePackage: number
  priceBulk: number
  priceGongfu: number
}

export type Inventory = {
  name: string
  registerCode: string
  id: string
} & Prices
