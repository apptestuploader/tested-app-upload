import Input from "../../../../../Commons/Input"

interface props {
  label: string
  discount: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  Adornment: JSX.Element
}

const DiscountInput = ({ label, discount, onChange, Adornment }: props) => {
  return (
    <Input
      label={label}
      type={"number"}
      name={"discount"}
      value={discount}
      onChange={onChange}
      inputProps={{ min: 0, max: 100 }}
      InputProps={{
        endAdornment: Adornment,
      }}
    />
  )
}

export default DiscountInput
