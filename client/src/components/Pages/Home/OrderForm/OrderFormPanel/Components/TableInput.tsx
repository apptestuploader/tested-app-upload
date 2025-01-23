import Input from "../../../../../Commons/Input"
import { matcher, tajMatch } from "../../../utils"
import { ChangeEvent } from "react"

export const pickColor = (table: string) => {
  const tableCategory = matcher(table)
  if (tableCategory === "colonial") {
    if (tajMatch(table)) {
      return "rgba(135,0,0,0.3)"
    }
  }
  const colors = {
    empty: "rgba(255, 255, 255, 0.3)",
    other: "rgba(255, 255, 255, 0.3)",
    outside: "rgba(0, 255, 0, 0.3)",
    colonial: "rgba(255, 0, 0, 0.3)",
    babylon: "rgba(255,234,0,0.3)",
    center: "rgba(255, 0, 0, 0.3)",
    oriental: "rgba(255, 165, 0, 0.3)",
    morocco: "rgba(0, 205, 255, 0.3)",
  }

  return colors[tableCategory]
}

interface props {
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const TableInput = ({ label, value, onChange }: props) => {
  return (
    <Input
      label={label}
      name={"table"}
      sx={{ backgroundColor: pickColor(value) }}
      value={value}
      onChange={onChange}
    />
  )
}

export default TableInput
