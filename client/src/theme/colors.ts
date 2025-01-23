import { createTheme } from "@mui/material"

export interface MyColors {
  greyscale: {
    main: string
    secondary: string
  }
  fontColor: string
  danger: string
  info: {
    main: string
    secondary: string
  }
  success: string
}

declare module "@mui/material/styles" {
  interface Palette {
    custom: MyColors
  }
  interface PaletteOptions {
    custom: MyColors
  }
}

const colors = createTheme({
  palette: {
    custom: {
      greyscale: {
        main: "rgb(122 , 122, 122)",
        secondary: "rgb(166 , 166, 166)",
      },
      fontColor: "white",
      danger: "#ff0000",
      info: { main: "rgb(255, 255, 0)", secondary: "#FD9101" },
      success: "#40dc40",
    },
  },
})

export default colors
