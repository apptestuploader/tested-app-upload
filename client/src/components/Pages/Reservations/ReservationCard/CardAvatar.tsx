import { alpha, Avatar } from "@mui/material"
import { ReactElement, ReactNode } from "react"
import StyledTooltip from "../../../Commons/StyledTooltip"

const colors = {
  red: "#bc0303",
  green: "#0db703",
  blue: "#0f0966",
}

const widthMap = {
  rounded: 100,
  circular: null,
  square: 85,
}

const ConditionalTooltip = ({
  tooltip,
  children,
  placement = "bottom",
}: {
  tooltip?: string
  children: ReactElement
  placement?: "bottom" | "right"
}) => {
  return tooltip ? (
    <StyledTooltip title={tooltip} placement={placement}>
      {children}
    </StyledTooltip>
  ) : (
    <>{children}</>
  )
}

const CardAvatar = ({
  tooltip,
  Icon,
  value,
  color = "blue",
  variant = "rounded",
  placement = "bottom",
}: {
  tooltip?: string
  Icon: ReactNode
  value?: string | number
  color?: "red" | "green" | "blue"
  variant?: "rounded" | "circular" | "square"
  placement?: "bottom" | "right"
}) => {
  const width = widthMap[variant]
  return (
    <ConditionalTooltip tooltip={tooltip} placement={placement}>
      <Avatar
        variant={variant}
        sx={{
          width: width,
          backgroundColor: alpha(colors[color], 0.5),
        }}
      >
        {Icon}
        {value ?? value}
      </Avatar>
    </ConditionalTooltip>
  )
}

export default CardAvatar
