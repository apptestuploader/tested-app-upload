import { alpha, Stack, styled } from "@mui/material"
import React from "react"
import StyledAppBar from "./Styled/StyledAppBar"

type Signature = React.FC<{
  NavigationButtons: React.ReactNode
  SettingsButton: React.ReactNode
  ViewButton?: React.ReactNode
}>
const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.custom.greyscale.main, 0.75),
  borderBottomLeftRadius: 25,
  borderBottomRightRadius: 25,
}))

const NavigationLayout: Signature = ({
  NavigationButtons,
  SettingsButton,
  ViewButton,
}) => {
  return (
    <StyledStack
      component={StyledAppBar}
      direction={"row"}
      justifyContent={"space-between"}
    >
      <div style={{ marginRight: "auto" }}>{NavigationButtons}</div>
      {ViewButton ? (
        <div style={{ marginRight: "auto", width: "45%" }}>{ViewButton}</div>
      ) : null}
      <div style={{ marginLeft: "auto" }}>{SettingsButton}</div>
    </StyledStack>
  )
}

export default NavigationLayout
