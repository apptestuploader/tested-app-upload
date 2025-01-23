import { createTheme } from "@mui/material"

const INPUT_PADDING = "2px"

const inputPaddingMadness = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiAutocomplete-inputRoot": {
            "& .MuiAutocomplete-input": {
              paddingTop: INPUT_PADDING,
              paddingBottom: INPUT_PADDING,
            },
            paddingTop: INPUT_PADDING,
            paddingBottom: INPUT_PADDING,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          paddingTop: INPUT_PADDING,
          paddingBottom: INPUT_PADDING,
        },
        input: {
          paddingTop: INPUT_PADDING,
          paddingBottom: INPUT_PADDING,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          paddingTop: INPUT_PADDING,
          paddingBottom: INPUT_PADDING,

          input: {
            paddingTop: INPUT_PADDING,
            paddingBottom: INPUT_PADDING,
          },
        },
      },
    },
  },
})

export default inputPaddingMadness
