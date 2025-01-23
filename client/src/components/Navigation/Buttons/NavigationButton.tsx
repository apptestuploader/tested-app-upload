import { Link, useLocation } from "react-router-dom"
import { alpha, Button, styled } from "@mui/material"
import React from "react"

const Styled = styled(Button, {
  shouldForwardProp: (prop: string) => prop !== "color",
})(({ theme, color }) => {
  const onIdle = alpha(theme.palette.custom.greyscale.secondary, 0.7)
  const onHover = alpha(theme.palette.custom.greyscale.main, 1)
  const selected = alpha("#006a00", 0.7)

  return {
    borderRadius: 0,
    backgroundColor: color === "success" ? selected : onIdle,
    border: `5px solid ${color === "success" ? selected : onHover}`,
    color: theme.palette.custom.fontColor,
    "&:hover": {
      backgroundColor: color === "success" ? selected : onHover,
      border: `5px solid ${color === "success" ? selected : onHover}`,
    },
  }
})
const NavigationButton = ({
  target,
  label,
}: {
  target: string
  label: string
}) => {
  const location = useLocation()

  return (
    <Link to={target}>
      <Styled color={location.pathname === target ? "success" : "primary"}>
        {label}
      </Styled>
    </Link>
  )
}

export default NavigationButton
