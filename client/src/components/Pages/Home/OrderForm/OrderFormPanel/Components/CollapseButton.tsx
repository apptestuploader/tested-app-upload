import FormButton from "../../../../../Commons/FormButton"
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown"
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp"
import { useTranslation } from "react-i18next"

const CollapseButton = ({
  open,
  toggleCollapse,
}: {
  open: boolean
  toggleCollapse: () => void
}) => {
  const { t } = useTranslation()
  const icon = open ? (
    <KeyboardDoubleArrowDownIcon />
  ) : (
    <KeyboardDoubleArrowUpIcon />
  )
  return (
    <FormButton
      startIcon={icon}
      endIcon={icon}
      onClick={toggleCollapse}
      style={{ width: "100%" }}
    >
      {open ? t("home.expandOrder") : t("home.collapseOrder")}
    </FormButton>
  )
}

export default CollapseButton
