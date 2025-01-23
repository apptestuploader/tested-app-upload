import { Box, Drawer, Stack, styled, Typography } from "@mui/material"
import React from "react"
import LanguageChoice from "./LanguageChoice"
import { useTranslation } from "react-i18next"
import EasterEggButton from "./EasterEggButton"

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.custom.greyscale.secondary,
  overflow: "auto",
  width: 350,
  height: "100%",
}))

const Sidebar = ({ toggle, open }: { open: boolean; toggle: () => void }) => {
  const { t } = useTranslation()
  const easterEggOn = parseInt(process.env.REACT_APP_EASTER_EGG_0 ?? "0") === 1

  const width = 90
  const margin = (100 - width) / 2

  return (
    <Drawer anchor={"right"} open={open} onClose={toggle}>
      <StyledBox>
        <Stack alignItems={"center"} sx={{ height: "100%" }}>
          <Typography sx={{ margin: `${margin}%`, width: `${width}%` }}>
            {t("sidebar.options")}
          </Typography>
          <LanguageChoice />
          {easterEggOn && <EasterEggButton />}
        </Stack>
      </StyledBox>
    </Drawer>
  )
}

export default Sidebar
