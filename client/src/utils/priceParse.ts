export const priceParse = (price: number): number => {
  return Number((price * 100).toFixed(2))
}
