import { format, parse } from "date-fns"
import { useEffect, useState } from "react"

export const formats = {
  date: "dd-MM-yyyy",
  time: "HH:mm",
  fromProps: "dd/MM/yyyy, HH:mm:ss",
}

const useDateInput = (
  datetime: string,
  setDatetime: (arg0: string) => void
) => {
  const dateFromString = parse(datetime, formats.fromProps, new Date())

  const [time, setTime] = useState(format(dateFromString, formats.time))
  const [date, setDate] = useState(dateFromString)

  useEffect(() => {
    const formattedDate = format(date, formats.date)
    const newDatetime = parse(
      `${formattedDate} ${time}`,
      `${formats.date} ${formats.time}`,
      new Date()
    ).toLocaleString("en-GB")

    setDatetime(newDatetime)
  }, [time, date])
  return {
    time: {
      value: time,
      setter: setTime,
    },
    date: {
      value: date,
      setter: setDate,
    },
  }
}

export default useDateInput
