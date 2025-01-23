import { Item } from "../../../../../api"
import { Stack } from "@mui/material"
import priceFormatter from "../../../../../utils/priceFormatter"
import { useTranslation } from "react-i18next"
import Input from "../../../../Commons/Input"

const PastItem = ({ item, first }: { item: Item; first: boolean }) => {
  const { t } = useTranslation()
  return (
    <Stack direction={"row"}>
      <Input
        label={first ? t("archive.labels.name") : ""}
        value={item.name}
        fullWidth
      />
      <Input label={first ? t("archive.labels.type") : ""} value={item.type} />
      <Input
        label={first ? t("archive.labels.quantity") : ""}
        value={item.quantity}
      />
      <Input
        label={first ? t("archive.labels.price") : ""}
        value={priceFormatter(item.price)}
      />
      <Input
        label={first ? t("archive.labels.discountedPrice") : ""}
        value={priceFormatter(item.discountedPrice)}
      />
    </Stack>
  )
}

export default PastItem
