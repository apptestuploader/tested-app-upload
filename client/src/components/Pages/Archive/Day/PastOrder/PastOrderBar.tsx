import { ApiError, Inventory, Order, Orders } from "../../../../../api"
import { Chip, Stack } from "@mui/material"
import { format } from "date-fns"
import { reopenOrder } from "../../../../../db/dbApi"
import { useContext } from "react"
import { InventoryContext } from "../../../../Contexts/Inventory"
import { useTranslation } from "react-i18next"
import ScheduleIcon from "@mui/icons-material/Schedule"
import { ArchiveSetter } from "../../ArchiveContext"
import PastOrderSummary from "./PastOrderSummary"
import ArchiveButton from "../../Commons/ArchiveButton"
import { useSnackbar } from "notistack"

const reopen = async ({
  order,
  inventorys,
}: {
  order: Order
  inventorys: Inventory[]
}) => {
  order.items = order.items.map((item) => {
    const inventory = inventorys.filter(
      (inventory) => inventory.name === item.name
    )[0]
    return {
      ...item,
      basePrice: item.price,
      price: item.discountedPrice,
      code: inventory?.registerCode,
      inventory: inventory,
    }
  })
  await reopenOrder(order)
  await Orders.deleteOrder(order.id)
}

const PastOrderBar = ({
  order,
  expanded,
  expandedCallback,
}: {
  order: Order
  expanded: boolean
  expandedCallback: () => void
}) => {
  const { values } = useContext(InventoryContext)
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const fetchArchive = useContext(ArchiveSetter)

  return (
    <Stack direction={"row"} justifyContent={"space-around"}>
      <ArchiveButton
        onClick={async () => {
          try {
            await reopen({ order, inventorys: values })
            enqueueSnackbar(t("alerts.orderRestore"), { variant: "success" })
            await fetchArchive()
          } catch (error) {
            if (typeof error === "string") {
              enqueueSnackbar(error, { variant: "error" })
            } else if (error instanceof ApiError) {
              enqueueSnackbar(error.body?.detail ?? error.body.error, {
                variant: "error",
              })
            } else if (error instanceof Error) {
              enqueueSnackbar(error.message, { variant: "error" })
            }
            console.error(error)
          }
        }}
      >
        {t("archive.reopen")}
      </ArchiveButton>
      <Chip
        icon={<ScheduleIcon />}
        label={format(new Date(order.createdAt), "HH:mm:ss")}
      />
      <ArchiveButton onClick={expandedCallback}>
        {expanded ? t("archive.collapse") : t("archive.expand")}
      </ArchiveButton>
      <PastOrderSummary
        table={order.table}
        discount={order.discount}
        income={order.items.reduce((acc, item) => acc + item.price, 0)}
        incomeDiscounted={order.items.reduce(
          (acc, item) => acc + item.discountedPrice,
          0
        )}
      />
    </Stack>
  )
}

export default PastOrderBar
