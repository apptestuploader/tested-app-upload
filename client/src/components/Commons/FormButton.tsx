import { alpha, Button, styled } from "@mui/material"
import React from "react"

const FormButton = styled(Button, {
  shouldForwardProps: (prop: string) => prop !== "$danger",
})(({ theme, $danger }) => ({
  backgroundColor: $danger
    ? alpha(theme.palette.custom.danger, 0.3)
    : alpha(theme.palette.custom.info.main, 0.3),
  border: "3px solid rgba(0, 0, 255, 0.3)",
  color: theme.palette.custom.fontColor,
  transition: "border-radius 0.3s, background-color 0.5s ease",

  borderRadius: 0,
  paddingTop: "0",
  paddingBottom: "0",
  margin: "0",

  "&:hover": {
    borderRadius: 25,
    backgroundColor: $danger
      ? theme.palette.custom.danger
      : theme.palette.custom.info.secondary,
  },
}))

export default FormButton
