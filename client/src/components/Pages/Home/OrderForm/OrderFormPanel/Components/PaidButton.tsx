import { IconButton } from "@mui/material"
import PaidIcon from "@mui/icons-material/Paid"
import SwitchIcon from "../../../../../Commons/SwitchIcon"
import { useTranslation } from "react-i18next"
import StyledTooltip from "../../../../../Commons/StyledTooltip"

const StyledPaidIcon = SwitchIcon(PaidIcon)
const PaidButton = ({
  isPaid,
  onClick,
}: {
  isPaid: boolean
  onClick: () => void
}) => {
  const { t } = useTranslation()
  return (
    <StyledTooltip title={t("tooltips.paid")}>
      <IconButton onClick={onClick} style={{ padding: 0 }}>
        <StyledPaidIcon state={isPaid} />
      </IconButton>
    </StyledTooltip>
  )
}

export default PaidButton
