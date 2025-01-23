import { Stack, Typography } from "@mui/material"
import priceFormatter from "../../../../../utils/priceFormatter"
import { useTranslation } from "react-i18next"
import Input from "../../../../Commons/Input"

interface props {
  table: string
  discount: number
  income: number
  incomeDiscounted: number
}

const PastOrderSummary = ({
  table,
  discount,
  income,
  incomeDiscounted,
}: props) => {
  const { t } = useTranslation()

  return (
    <Stack direction={"row"} sx={{ width: "50%" }}>
      <Input
        sx={{ width: "25%" }}
        label={t("archive.labels.table")}
        value={table}
      />
      <Input
        sx={{ width: "25%" }}
        label={t("archive.labels.discount")}
        value={discount}
        InputProps={{
          endAdornment: <Typography>%</Typography>,
        }}
      />
      <Input label={t("archive.labels.sum")} value={priceFormatter(income)} />
      <Input
        label={t("archive.labels.discountedSum")}
        value={priceFormatter(incomeDiscounted)}
      />
    </Stack>
  )
}

export default PastOrderSummary
