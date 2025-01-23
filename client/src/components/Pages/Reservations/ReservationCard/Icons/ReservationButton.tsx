import { alpha, Button, styled } from "@mui/material"

const colors = {
  info: "#0f0966",
  warning: "#a34000",
  error: "#bc0303",
  success: "#0db703",
}

const ReservationButton = styled(Button)(({ theme, color }) => {
  // @ts-ignore
  const finalColor = colors?.[color] ?? colors.info

  return {
    backgroundColor: alpha(finalColor, 0.5),
    color: theme.palette.custom.fontColor,
    "&:hover": {
      backgroundColor: alpha(finalColor, 0.7),
    },

    "&.Mui-disabled": {
      backgroundColor: alpha(finalColor, 0.5),
      color: theme.palette.custom.fontColor,
    },
  }
})

export default ReservationButton
