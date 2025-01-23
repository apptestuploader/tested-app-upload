import { IconButton } from "@mui/material"
import { useTranslation } from "react-i18next"
import { TbPackage, TbPackageOff } from "react-icons/tb"
import SwitchIcon from "../../../../../Commons/SwitchIcon"
import StyledTooltip from "../../../../../Commons/StyledTooltip"

const StyledSuccess = SwitchIcon(TbPackage)
const StyledFailure = SwitchIcon(TbPackageOff)

const DiscountToGoButton = ({
  discountToGo,
  onClick,
}: {
  discountToGo: boolean
  onClick: () => void
}) => {
  const { t } = useTranslation()
  return (
    <StyledTooltip title={t("tooltips.discountToGo")}>
      <IconButton
        onClick={onClick}
        size={"medium"}
        style={{ margin: 0, padding: 0 }}
      >
        {discountToGo ? (
          <StyledSuccess state={discountToGo} />
        ) : (
          <StyledFailure state={discountToGo} />
        )}
      </IconButton>
    </StyledTooltip>
  )
}
export default DiscountToGoButton
