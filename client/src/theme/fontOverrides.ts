import { createTheme } from "@mui/material"
import colors from "./colors"

const fontOverrides = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: colors.palette.custom.fontColor,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: colors.palette.custom.fontColor,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: colors.palette.custom.fontColor,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: colors.palette.custom.greyscale.main,
          color: colors.palette.custom.fontColor,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: colors.palette.custom.fontColor,
        },
        icon: {
          color: colors.palette.custom.fontColor,
        },
      },
    },
  },
})

export default fontOverrides
