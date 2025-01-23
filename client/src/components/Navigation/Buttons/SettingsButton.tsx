import { Box, Button } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import Sidebar from "../Sidebar/Sidebar"
import React from "react"
import { useFlag } from "../../hooks/useFlag"

const SettingsButton = () => {
  const { flag, toggleTrue, toggleFalse } = useFlag()

  return (
    <Box display="flex" justifyContent={"flex-end"}>
      <Button sx={{ color: "white" }} onClick={toggleTrue}>
        <SettingsIcon />
      </Button>
      <Sidebar open={flag} toggle={toggleFalse} />
    </Box>
  )
}

export default SettingsButton
