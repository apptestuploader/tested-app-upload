import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"

interface Languages {
  en: string
  pl: string
}

const lngs: Languages = {
  en: "English",
  pl: "Polski",
}

const LanguageChoice = () => {
  const labelId = "language-selection"
  const { t, i18n } = useTranslation()
  const width = 90
  const margin = (100 - width) / 2

  return (
    <FormControl sx={{ margin: `${margin}%`, width: `${width}%` }}>
      <InputLabel id={labelId}>{t("sidebar.language")}</InputLabel>
      <Select
        labelId={labelId}
        value={i18n.resolvedLanguage}
        onChange={(event) => i18n.changeLanguage(event.target.value)}
      >
        {Object.keys(lngs).map((lng) => (
          <MenuItem key={lng} value={lng}>
            {lngs[lng as keyof Languages]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default LanguageChoice
