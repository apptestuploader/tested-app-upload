import * as React from "react"
import Input from "../../Commons/Input"
import { alpha, styled } from "@mui/material"

const TouchableInput = styled(Input, {
  shouldForwardProp: (prop: string) => prop !== "touched",
})(({ theme, touched }) => ({
  backgroundColor: touched
    ? alpha(theme.palette.custom.info.secondary, 0.4)
    : "transparent",
}))

const InventoryInput = ({
  id,
  type,
  name,
  disabled,
  onChange,
  error,
  value,
  label,
  touched,
  width = "8%",
}: {
  id: string
  type: "text" | "number"
  name: string
  touched?: boolean
  disabled?: boolean
  value: string | number
  error?: string | undefined
  label?: string
  width?: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
}) => {
  return (
    <TouchableInput
      sx={{ width: width }}
      id={`${id}-input`}
      name={name}
      type={type}
      error={!!error}
      helperText={error}
      onChange={onChange}
      value={value}
      disabled={disabled}
      touched={touched}
      label={label ?? name}
    />
  )
}

export default InventoryInput
