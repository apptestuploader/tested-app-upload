import { IconButton, Tooltip } from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"
import { useTranslation } from "react-i18next"

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation()

  return (
    <Tooltip title={t("tooltips.close")}>
      <IconButton
        onClick={onClick}
        sx={{ maxWidth: "50px", ml: "auto", mt: 0 }}
      >
        <ClearIcon />
      </IconButton>
    </Tooltip>
  )
}

export default CloseButton
