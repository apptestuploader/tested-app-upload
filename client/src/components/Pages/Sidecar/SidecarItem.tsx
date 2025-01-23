import { ItemRow } from "../../../db/db"
import { Stack } from "@mui/material"
import ReadyButton from "../Home/OrderForm/ItemForm/Inputs/ReadyButton"
import Input from "../../Commons/Input"
import { useTranslation } from "react-i18next"
import { pickColor } from "../Home/OrderForm/OrderFormPanel/Components/TableInput"

interface props {
  item: ItemRow
  table: string
  first?: boolean
  dispatch: () => void
}

const SidecarItem = ({ item, table, first, dispatch }: props) => {
  const { t } = useTranslation()

  return (
    <Stack direction={"row"}>
      <Input
        label={first ? t("home.table") : ""}
        name={"table"}
        sx={{ backgroundColor: pickColor(table) }}
        value={table}
      />
      <Input
        label={first ? t("home.item.name") : ""}
        value={item.name}
        fullWidth
      />{" "}
      <Input label={first ? t("home.item.type") : ""} value={item.type} />
      <Input label={first ? t("home.item.hint") : ""} value={item.hint} />
      <ReadyButton
        state={item.prepared}
        alt={item.name.toLowerCase() === "szisza fajka"}
        dispatch={dispatch}
      />
    </Stack>
  )
}

export default SidecarItem
