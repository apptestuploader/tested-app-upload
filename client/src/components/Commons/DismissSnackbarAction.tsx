import { SnackbarKey, useSnackbar } from "notistack"
import { IconButton } from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"
import React from "react"

const DismissAction = ({ id }: { id: SnackbarKey }) => {
  const { closeSnackbar } = useSnackbar()
  return (
    <IconButton onClick={() => closeSnackbar(id)}>
      <ClearIcon />
    </IconButton>
  )
}

export default DismissAction
