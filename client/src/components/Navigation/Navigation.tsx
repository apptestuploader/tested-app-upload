import React from "react"
import NavigationLayout from "./NavigationLayout"
import NavigationButtonsGroup from "./Buttons/NavigationButtonsGroup"
import SettingsButton from "./Buttons/SettingsButton"

const Navigation = ({ ViewButton }: { ViewButton?: React.ReactNode }) => {
  return (
    <NavigationLayout
      NavigationButtons={<NavigationButtonsGroup />}
      SettingsButton={<SettingsButton />}
      ViewButton={ViewButton}
    />
  )
}

export default Navigation
