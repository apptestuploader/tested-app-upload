import { alpha, createTheme } from "@mui/material"
import inputPaddingMadness from "./inputPaddingMadness"
import colors, { MyColors } from "./colors"
import fontOverrides from "./fontOverrides"
import mergeThemes from "./mergeThemes"
import calendarOverrides from "./calendarOverrides"

export interface ThemeOptions {
  palette: {
    custom: MyColors
  }
}

const theme = createTheme({
  typography: {
    allVariants: {
      color: colors.palette.custom.fontColor,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha("#fffe00", 0.5),
            color: alpha("#fffe00", 0.5),
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#d7ff00",
          },
        },
      },
    },
  },
})

export default mergeThemes([
  colors,
  fontOverrides,
  inputPaddingMadness,
  calendarOverrides,
  theme,
])
