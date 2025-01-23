import { Autocomplete, AutocompleteValue, styled } from "@mui/material"
import { SyntheticEvent } from "react"
import Input from "../../../../../Commons/Input"

interface props {
  label: string
  name: string
  options: string[]
  value: string | null
  onChange: (
    event: SyntheticEvent,
    value: AutocompleteValue<unknown, undefined, undefined, undefined>
  ) => void
}

const StyledPopper = styled("ul")(({ theme }) => ({
  backgroundColor: theme.palette.custom.greyscale.main,
}))

const NameInput = ({ onChange, value, options, name, label }: props) => {
  return (
    <Autocomplete
      onChange={onChange}
      value={value}
      options={options}
      ListboxComponent={StyledPopper}
      renderInput={(params) => <Input {...params} name={name} label={label} />}
    />
  )
}

export default NameInput
