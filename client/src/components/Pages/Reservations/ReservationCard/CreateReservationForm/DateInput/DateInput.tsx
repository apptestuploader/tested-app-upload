import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import Input from "../../../../../Commons/Input"
import { Stack } from "@mui/material"
import TimeScroll from "./TimeScroll"
import useDateInput from "./useDateInput"

export const datePickerTestId = "date-input"

interface props {
  labels: {
    date: string
    scrollTip: string
  }
  datetime: string
  setDatetime: (date: string) => void
}

const DateInput = ({ labels, datetime, setDatetime }: props) => {
  const { time, date } = useDateInput(datetime, setDatetime)
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack>
        <TimeScroll
          time={time.value}
          setTime={time.setter}
          scrollTip={labels.scrollTip}
        />
        <DatePicker
          disablePast
          onChange={(value) => date.setter(value ?? new Date())}
          inputFormat={"dd-MM-yyyy"}
          label={labels.date}
          value={date.value}
          renderInput={(props) => (
            <Input
              {...props}
              inputProps={{
                ...props.inputProps,
                "data-testid": datePickerTestId,
              }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  )
}

export default DateInput
