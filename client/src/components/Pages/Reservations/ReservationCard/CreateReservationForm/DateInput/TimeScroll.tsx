import { MenuItem, Select, Stack, Tooltip } from "@mui/material"
import { useEffect, useState } from "react"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import modifyOnScroll from "../modifyOnScroll"

export const testIds = {
  hour: "time-input-hour",
  minutes: "time-input-minutes",
}

const hourOffset = 12
const hoursAvailable = 24 - hourOffset
const minuteStep = 5
const minuteSteps = 60 / minuteStep

const minuteOffset = (minute: number) => (minute < 10 ? "0" : "")

const timeString = (hour: number, minute: number) => {
  return `${hour}:${minuteOffset(minute)}${minute}`
}

const TimeScroll = ({
  time,
  setTime,
  scrollTip,
}: {
  time: string
  setTime: (time: string) => void
  scrollTip: string
}) => {
  const [propHour, propMinute] = time.split(":").map((t) => parseInt(t))
  const [hour, setHour] = useState(
    propHour < hourOffset ? hourOffset : propHour
  )
  const [minute, setMinute] = useState(
    Math.round(propMinute / minuteStep) * minuteStep
  )

  useEffect(() => {
    setTime(timeString(hour, minute))
  }, [hour, minute])

  return (
    <Stack direction={"row"} style={{ width: "100%" }}>
      <Select
        inputProps={{ "data-testid": testIds.hour }}
        value={hour}
        onChange={(e) => {
          setHour(e.target.value as number)
        }}
        onWheel={modifyOnScroll({
          value: hour,
          setter: setHour,
          min: hourOffset,
          max: 23,
          offset: 1,
        })}
      >
        {Array.from(Array(hoursAvailable).keys()).map((hour) => (
          <MenuItem key={hour} value={hour + hourOffset}>
            {`${hour + hourOffset}h`}
          </MenuItem>
        ))}
      </Select>
      <Select
        inputProps={{ "data-testid": testIds.minutes }}
        value={minute}
        onChange={(e) => {
          setMinute(e.target.value as number)
        }}
        onWheel={modifyOnScroll({
          value: minute,
          setter: setMinute,
          min: 0,
          max: 59,
          offset: minuteStep,
        })}
      >
        {Array.from(Array(minuteSteps).keys()).map((minute) => (
          <MenuItem key={minute} value={minute * minuteStep}>
            {minuteOffset(minute * minuteStep) + `${minute * minuteStep}m`}
          </MenuItem>
        ))}
      </Select>
      <Tooltip title={scrollTip}>
        <InfoOutlinedIcon style={{ color: "blue" }} />
      </Tooltip>
    </Stack>
  )
}

export default TimeScroll
