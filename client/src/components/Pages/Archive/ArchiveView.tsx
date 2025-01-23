import ArchivePanel from "./ArchivePanel/ArchivePanel"
import { Stack } from "@mui/material"
import DayDisplay from "./Day/DayDisplay"
import { ArchiveSetter } from "./ArchiveContext"
import { useArchive } from "./utils"
import { sortOrders } from "../../../utils/dateSort"

const ArchiveView = () => {
  const { orders, income, dates, fetchArchive } = useArchive()

  return (
    <ArchiveSetter.Provider value={fetchArchive}>
      <Stack sx={{ width: "80%", marginLeft: "10%" }} alignItems={"stretch"}>
        <ArchivePanel dates={dates} income={income} />
        <Stack spacing={0.5}>
          {Object.entries(orders).map(([date, orders], index) => (
            <DayDisplay
              key={date}
              date={date}
              orders={orders.sort(sortOrders)}
              odd={!!(index % 2)}
            />
          ))}
        </Stack>
      </Stack>
    </ArchiveSetter.Provider>
  )
}

export default ArchiveView
