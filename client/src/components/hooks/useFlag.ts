import { useState } from "react"

export const useFlag = () => {
  const [flag, setFlag] = useState(false)

  const toggleTrue = () => setFlag(true)
  const toggleFalse = () => setFlag(false)

  return { flag, toggleTrue, toggleFalse }
}
