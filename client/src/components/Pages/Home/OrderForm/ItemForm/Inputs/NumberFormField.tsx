import Input from "../../../../../Commons/Input"
import { TextFieldProps } from "@mui/material"

const NumberFormField = ({
  label,
  name,
  value,
  onChange,
  ...rest
}: TextFieldProps) => {
  return (
    <Input
      {...rest}
      label={label}
      type={"number"}
      value={value}
      onChange={onChange}
      name={name}
      inputProps={{ ...rest.inputProps, min: 0 }}
    />
  )
}

export default NumberFormField
