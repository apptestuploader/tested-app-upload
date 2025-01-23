import { ReactNode, useContext } from "react"
import FilterContext from "./FiltersContext"
import Filter from "./Filter"
import { Chip, Stack } from "@mui/material"
import { useTranslation } from "react-i18next"
import SavingsIcon from "@mui/icons-material/Savings"
import StyledTooltip from "../../../Commons/StyledTooltip"

const chipColorPicker = (value: number) => {
  if (value > 2000) {
    return "error"
  }
  if (value > 1500) {
    return "warning"
  }
  if (value > 1000) {
    return "secondary"
  }
  if (value > 500) {
    return "info"
  }
  return "success"
}

const Filters = ({
  children,
  totalSum,
}: {
  children: ReactNode
  totalSum: number
}) => {
  const { t } = useTranslation()
  const { table, setTable, product, setProduct } = useContext(
    FilterContext.Context
  )
  return (
    <Stack direction={"row"}>
      <Filter
        label={t("filters.table")}
        value={table}
        setValue={setTable}
        width={"20%"}
      />
      {children}
      <Filter
        label={t("filters.product")}
        value={product}
        setValue={setProduct}
        width={"20%"}
      />
      <StyledTooltip title={t("tooltips.total$")} placement={"right"}>
        <Chip
          icon={<SavingsIcon />}
          label={
            totalSum < 10000
              ? totalSum.toString()
              : "Please stop, you animal..."
          }
          color={chipColorPicker(totalSum)}
          sx={{ mt: "1%", width: totalSum < 10000 ? "15%" : "100%" }}
        />
      </StyledTooltip>
    </Stack>
  )
}

export default Filters
