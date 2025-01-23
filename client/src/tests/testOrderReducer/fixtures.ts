import { DEFAULT_STOCK } from "../../db/dbApi"

export const baseState = {
  id: 75,
  table: "",
  discount: 0,
  discountToGo: false,
  paid: false,
  collapsed: false,
  items: [
    {
      id: 1,
      orderId: 75,
      code: "",
      name: "",
      type: "default",
      quantity: 1,
      basePrice: 0,
      price: 0,
      hint: "",
      prepared: false,
      inventory: DEFAULT_STOCK,
    },
    {
      id: 2,
      orderId: 75,
      code: "",
      name: "",
      type: "default",
      quantity: 1,
      basePrice: 0,
      price: 0,
      hint: "",
      prepared: false,
      inventory: DEFAULT_STOCK,
    },
  ],
}

export const bigDummy = {
  ...baseState,
  items: [
    ...baseState.items,
    {
      id: 69,
      orderId: 75,
      code: "",
      name: "",
      type: "default",
      quantity: 1,
      basePrice: 0,
      price: 0,
      hint: "",
      prepared: false,
      inventory: DEFAULT_STOCK,
    },
    {
      id: 44,
      orderId: 75,
      code: "",
      name: "",
      type: "default",
      quantity: 1,
      basePrice: 0,
      price: 0,
      hint: "",
      prepared: false,
      inventory: DEFAULT_STOCK,
    },
  ],
}

export const inventorys = {
  sencha: {
    name: "Sencha Kyoto Bio",
    registerCode: "2",
    priceDefault: 2380,
    priceGaiwan: 1880,
    pricePackage: 6500,
    priceBulk: 130,
    priceGongfu: 6000,
    id: "70f7e16b-db5c-420d-a47b-acf5e92034d8",
  },
  assam: {
    name: "Assam Brahmaputra",
    registerCode: "3",
    priceDefault: 1680,
    priceGaiwan: 0,
    pricePackage: 4000,
    priceBulk: 40,
    priceGongfu: 4000,
    id: "e70c3776-5367-4c1b-a626-540e2c39fa99",
  },
}

export const filledState = {
  id: 75,
  table: "",
  discount: 0,
  discountToGo: false,
  paid: false,
  collapsed: false,
  items: [
    {
      id: 1,
      orderId: 75,
      code: inventorys.sencha.registerCode,
      name: inventorys.sencha.name,
      type: "default",
      quantity: 1,
      basePrice: inventorys.sencha.priceDefault,
      price: inventorys.sencha.priceDefault,
      hint: "",
      prepared: false,
      inventory: inventorys.sencha,
    },
    {
      id: 2,
      orderId: 75,
      code: inventorys.assam.registerCode,
      name: inventorys.assam.name,
      type: "default",
      quantity: 1,
      basePrice: inventorys.assam.priceDefault,
      price: inventorys.assam.priceDefault,
      hint: "",
      prepared: false,
      inventory: inventorys.assam,
    },
  ],
}

export const discounted = (price: number, discount: number) =>
  Math.round((price * (100 - discount)) / 100)
