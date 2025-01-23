import { createTheme, Theme } from "@mui/material"

const mergeThemes = (themes: Theme[]): Theme => {
  return themes.reduce((acc, theme) => createTheme(acc, theme))
}

export default mergeThemes
