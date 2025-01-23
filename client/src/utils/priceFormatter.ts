const toStr = (price: number) => {
  if (price === 0) {
    return ""
  }
  return `${price / 100}`.replace(",", ".")
}
const toInt = (price: string) => {
  const separator = /\./
  if (price === "." || price === "") {
    return 0
  }

  const length = price.length - 1
  const baseMultiplier = 100
  const commaAt = price.search(separator)
  if (commaAt === -1) {
    return parseInt(price) * baseMultiplier
  }
  const periodMultiplier = 10 ** (commaAt - length)
  const number = Math.floor(
    parseFloat(price.replace(separator, "")) * baseMultiplier * periodMultiplier
  )
  return isNaN(number) ? 0 : number
}

function parse(price: number): string
function parse(price: string): number
function parse(price: any): any {
  if (typeof price === "string") {
    return toInt(price)
  }
  if (typeof price === "number") {
    return toStr(price)
  }
}

export default parse
