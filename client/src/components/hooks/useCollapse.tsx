import { useState } from "react"

export const useCollapse = (initial?: boolean) => {
  const initialState = initial ?? false

  const [open, setOpen] = useState(initialState)
  const toggle = () => setOpen(!open)
  return { open, toggle }
}
