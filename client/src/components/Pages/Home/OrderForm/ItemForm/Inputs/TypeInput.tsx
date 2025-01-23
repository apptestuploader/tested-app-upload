import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { useTranslation } from "react-i18next"

interface props {
  first: boolean
  value: string
  name: string
  onChange: (event: SelectChangeEvent) => void
}

const typeMap = {
  default: "default",
  gaiwan: "gaiwan",
  package: "package",
  bulk: "bulk",
  gongfu: "gongfu",
}

const TypeInput = ({ first, value, name, onChange }: props) => {
  const { t } = useTranslation()
  return (
    <FormControl fullWidth>
      {first ? (
        <InputLabel>{t("home.item.type")}</InputLabel> // TODO:
      ) : null}
      <Select // todo: find a way not to collapse the text, inputprops?
        autoWidth={true}
        name={name}
        value={value}
        onChange={onChange}
        IconComponent={() => null}
      >
        {Object.entries(typeMap).map(([displayValue, inventoryValue]) => (
          <MenuItem key={displayValue} value={inventoryValue}>
            {t(`home.item.types.${displayValue}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default TypeInput
