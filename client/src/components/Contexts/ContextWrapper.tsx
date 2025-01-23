import React from "react"
import { ReservationContextProvider } from "./Reservations"
import { InventoryContextProvider } from "./Inventory"
import { SnackbarKey, SnackbarProvider } from "notistack"
import theme from "../../theme/theme"
import { ThemeProvider } from "@mui/material"
import DismissAction from "../Commons/DismissSnackbarAction"

const ContextWrapper = ({
  children,
  loggedIn,
}: {
  children: React.ReactNode
  loggedIn: boolean
}) => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        action={(key: SnackbarKey) => <DismissAction id={key} />}
        maxSnack={4}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {loggedIn ? (
          <InventoryContextProvider>
            <ReservationContextProvider>{children}</ReservationContextProvider>
          </InventoryContextProvider>
        ) : (
          <>{children}</>
        )}
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default ContextWrapper
function closeSnackbar(key: SnackbarKey) {
  throw new Error("Function not implemented.")
}
