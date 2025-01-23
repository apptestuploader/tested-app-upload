import { alpha, styled } from "@mui/material"

const SwitchIcon = (Icon: any) =>
  styled(Icon, {
    shouldForwardProp: (prop: string) => prop !== "state",
  })(({ theme, state }) => ({
    color: state
      ? alpha(theme.palette.custom.success, 0.7)
      : theme.palette.custom.greyscale.secondary,
    "&:hover": {
      color: state
        ? theme.palette.custom.success
        : theme.palette.custom.greyscale.main,
    },
  }))

export default SwitchIcon
