import { ButtonGroup } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import NavigationButton from "./NavigationButton"

const NavigationButtonsGroup = () => {
  const { t } = useTranslation()

  return (
    <ButtonGroup variant={"contained"}>
      <NavigationButton target={"/"} label={t("navbar.home")} />
      <NavigationButton
        target={"/reservations"}
        label={t("navbar.reservations")}
      />
      <NavigationButton target={"/inventory"} label={t("navbar.inventorys")} />
      <NavigationButton target={"/archive"} label={t("navbar.archive")} />
    </ButtonGroup>
  )
}

export default NavigationButtonsGroup
