import { TextField, TextFieldProps } from "@mui/material"

const Input = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      InputLabelProps={{ shrink: true, ...props?.InputLabelProps }}
      autoComplete={"off"}
    />
  )
}

export default Input
