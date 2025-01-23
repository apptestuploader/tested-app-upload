import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import plLocale from "date-fns/locale/pl"
import Input from "../../../Commons/Input"

interface props {
  max: Date
  min: Date | undefined
  setter: (newDate: Date | null) => void
  value: Date | null
  label: string
}

const Calendar = ({ max, min, setter, value, label }: props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={plLocale}>
      <DesktopDatePicker
        minDate={min}
        maxDate={max}
        onChange={setter}
        value={value}
        renderInput={(params) => <Input {...params} label={label} />}
      />
    </LocalizationProvider>
  )
}

export default Calendar
