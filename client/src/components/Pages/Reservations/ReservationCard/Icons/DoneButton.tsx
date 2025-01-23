import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import ReservationButton from "./ReservationButton"
import { Tooltip } from "@mui/material"
import { useTranslation } from "react-i18next"

const DoneButton = ({
  mini,
  state,
  onClick,
}: {
  mini?: boolean
  state: boolean
  onClick: () => void
}) => {
  const { t } = useTranslation()

  return (
    <Tooltip title={t("tooltips.reservations.ready")}>
      <ReservationButton
        style={
          mini
            ? { borderTopRightRadius: "4px", borderBottomRightRadius: 0 }
            : {}
        }
        size={mini ? "small" : "large"}
        onClick={onClick}
        variant={"contained"}
        color={state ? "success" : "error"}
      >
        <CheckCircleOutlineIcon />
      </ReservationButton>
    </Tooltip>
  )
}

export default DoneButton
