import { Tooltip, TooltipProps } from "@mui/material"
import { ReactElement } from "react"

const StyledTooltip = (props: TooltipProps & { children: ReactElement }) => {
  return (
    <Tooltip {...props} enterDelay={props.enterDelay ?? 500}>
      {props.children}
    </Tooltip>
  )
}

export default StyledTooltip
