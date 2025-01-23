import { Stack } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next"
import Calendar from "./Calendar"
import Input from "../../../Commons/Input"

interface props {
  income: {
    base: string
    total: string
  }
  dates: {
    from: Date
    to: Date
    setter: Dispatch<SetStateAction<{ from: Date; to: Date }>>
  }
}

const ArchivePanel = ({ income, dates }: props) => {
  const { t } = useTranslation()
  const today = new Date()

  const setDateFrom = (from: Date | null) => {
    if (from instanceof Date) {
      dates.setter({
        from: from,
        to: dates.to,
      })
    }
  }

  const setDateTo = (to: Date | null) => {
    if (to instanceof Date) {
      dates.setter({
        from: dates.from,
        to: to,
      })
    }
  }

  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      sx={{ marginTop: "3%", marginBottom: "1%" }}
    >
      <Calendar
        max={today}
        min={undefined}
        setter={setDateFrom}
        value={dates.from}
        label={t("archive.dateFrom")}
      />
      <Calendar
        max={today}
        min={dates.from ?? undefined}
        setter={setDateTo}
        value={dates.to}
        label={t("archive.dateTo")}
      />
      <Input label={t("archive.baseIncome")} value={income.base} />
      <Input label={t("archive.totalIncome")} value={income.total} />
    </Stack>
  )
}

export default ArchivePanel
