import { Chip, Stack } from "@mui/material"
import priceFormatter from "../../../../utils/priceFormatter"
import { Order } from "../../../../api"
import { useTranslation } from "react-i18next"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import Input from "../../../Commons/Input"
import ArchiveButton from "../Commons/ArchiveButton"

const DayNav = ({
  date,
  orders,
  expanded,
  expandableCallback,
}: {
  date: string
  orders: Order[]
  expanded: boolean
  expandableCallback: () => void
}) => {
  const { t } = useTranslation()
  return (
    <Stack
      sx={{ width: "100%" }}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-around"}
    >
      <Chip icon={<CalendarMonthIcon />} label={date} />
      <ArchiveButton onClick={expandableCallback}>
        {expanded ? t("archive.collapse") : t("archive.expand")}
      </ArchiveButton>
      <Input
        label={t("archive.baseIncome")}
        value={priceFormatter(
          orders.reduce(
            (acc, order) =>
              acc + order.items.reduce((acc2, item) => acc2 + item.price, 0),
            0
          )
        )}
      />
      <Input
        label={t("archive.totalIncome")}
        value={priceFormatter(
          orders.reduce(
            (acc, order) =>
              acc +
              order.items.reduce(
                (acc2, item) => acc2 + item.discountedPrice,
                0
              ),
            0
          )
        )}
      />
    </Stack>
  )
}

export default DayNav
