import { createTheme } from "@mui/material"
import colors from "./colors"

const calendarOverrides = createTheme({
  components: {
    // @ts-ignore
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          backgroundColor: colors.palette.custom.greyscale.main,
        },
      },
    },
    // @ts-ignore
    MuiYearPicker: {
      styleOverrides: {
        root: {
          backgroundColor: colors.palette.custom.greyscale.main,
        },
      },
    },
  },
})

export default calendarOverrides
