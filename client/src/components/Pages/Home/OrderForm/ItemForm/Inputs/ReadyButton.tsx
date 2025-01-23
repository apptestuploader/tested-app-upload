import { IconButton } from "@mui/material"
import { GiSmokingPipe, GiTeapot, GiTeapotLeaves } from "react-icons/gi"
import SwitchIcon from "../../../../../Commons/SwitchIcon"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import StyledTooltip from "../../../../../Commons/StyledTooltip"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"

const StyledSuccess0 = SwitchIcon(GiTeapot)
const StyledSuccess1 = SwitchIcon(GiTeapotLeaves)
const StyledFailure = SwitchIcon(CheckBoxOutlineBlankIcon)
const StyledShisha = SwitchIcon(GiSmokingPipe)

const rainbowColors = {
  0: "#ff0000",
  1: "#ff7f00",
  2: "#ffff00",
  3: "#00ff00",
  4: "#0000ff",
  5: "#4b0082",
  6: "#9400d3",
}
const useRainbow = (change: boolean) => {
  const [rendered, updateRendered] = useState(0)
  useEffect(() => {
    if (change) {
      updateRendered(rendered + 1)
    }
  }, [change])
  return rendered > 10
    ? {
        color: rainbowColors[(rendered % 7) as keyof typeof rainbowColors],
      }
    : {}
}
const ReadyButton = ({
  state,
  alt,
  dispatch,
}: {
  state: boolean
  alt: boolean
  dispatch: () => void
}) => {
  const { t } = useTranslation()
  const fancyColor = useRainbow(state)
  const rand = useMemo(() => Math.random() > 0.5, [])
  const SuccessIcon = alt
    ? StyledShisha
    : rand
    ? StyledSuccess0
    : StyledSuccess1

  return (
    <StyledTooltip title={t("tooltips.ready")} placement={"right"}>
      <IconButton
        style={{ paddingTop: "2px", paddingBottom: "2px" }}
        onClick={dispatch}
      >
        {state ? (
          <SuccessIcon state={state} style={fancyColor} />
        ) : (
          <StyledFailure state={state} style={fancyColor} />
        )}
      </IconButton>
    </StyledTooltip>
  )
}

export default ReadyButton
