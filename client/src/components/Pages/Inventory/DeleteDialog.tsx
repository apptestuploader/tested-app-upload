import { Modal, Stack, Typography } from "@mui/material"
import PaperModal from "../../Commons/PaperModal"
import { ApiError, Inventory, Inventorys } from "../../../api"
import { useTranslation } from "react-i18next"
import FormButton from "../../Commons/FormButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ClearIcon from "@mui/icons-material/Clear"
import { useSnackbar } from "notistack"
import CloseButton from "../../Commons/CloseButton"

interface props {
  open: boolean
  onClose: () => void
  callback: () => Promise<void>
  inventory: Inventory
}

const DeleteDialog = ({ open, onClose, inventory, callback }: props) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  return (
    <Modal open={open} onClose={onClose}>
      <PaperModal sx={{ height: "30%" }} padding={"1%"}>
        <Stack justifyContent={"space-between"} sx={{ height: "100%" }}>
          <CloseButton onClick={onClose} />
          <Typography align={"center"} variant={"h5"}>
            {t("inventorys.deleteDialog.areYouSure")}
          </Typography>

          <Typography align={"center"}>{inventory.name}</Typography>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <FormButton
              startIcon={<ClearIcon />}
              endIcon={<ClearIcon />}
              onClick={onClose}
            >
              {t("inventorys.deleteDialog.no")}
            </FormButton>
            <FormButton
              $danger={true}
              startIcon={<DeleteIcon />}
              endIcon={<DeleteIcon />}
              onClick={async () => {
                try {
                  await Inventorys.deleteInventory(inventory.id)
                  enqueueSnackbar(
                    `${t("alerts.inventoryDeleted")} ${inventory.name}.`,
                    { variant: "error" }
                  )
                  await callback()
                } catch (error) {
                  if (typeof error === "string") {
                    enqueueSnackbar(error, { variant: "error" })
                  } else if (error instanceof ApiError) {
                    enqueueSnackbar(error.body?.detail ?? error.body.error, {
                      variant: "error",
                    })
                  } else if (error instanceof Error) {
                    enqueueSnackbar(error.message, { variant: "error" })
                  }
                } finally {
                  onClose()
                }
              }}
            >
              {t("inventorys.deleteDialog.yes")}
            </FormButton>
          </Stack>
        </Stack>
      </PaperModal>
    </Modal>
  )
}

export default DeleteDialog
