import { Modal, Stack, Typography } from "@mui/material"
import PaperModal from "../../../../Commons/PaperModal"
import { useTranslation } from "react-i18next"
import { ReservationCreate } from "../../../../../api"
import FormButton from "../../../../Commons/FormButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ClearIcon from "@mui/icons-material/Clear"
import CloseButton from "../../../../Commons/CloseButton"

interface props {
  open: boolean
  reservation: ReservationCreate
  onClose: () => void
  callback: () => void
}

const DeleteDialog = ({ open, onClose, callback, reservation }: props) => {
  const { t } = useTranslation()
  return (
    <Modal open={open} onClose={onClose}>
      <PaperModal sx={{ height: "30%", pt: "1%" }}>
        <Stack justifyContent={"space-around"} sx={{ height: "100%" }}>
          <CloseButton onClick={onClose} />
          <Typography variant={"h6"} align={"center"}>
            {t("reservations.deleteDialog.areYouSure")}
          </Typography>
          <Typography variant={"h6"} align={"center"}>
            {reservation.date}
          </Typography>

          <Stack direction={"row"} justifyContent={"space-between"}>
            <FormButton
              onClick={onClose}
              startIcon={<ClearIcon />}
              endIcon={<ClearIcon />}
            >
              {t("reservations.deleteDialog.no")}
            </FormButton>
            <FormButton
              onClick={callback}
              $danger={true}
              startIcon={<DeleteIcon />}
              endIcon={<DeleteIcon />}
            >
              {t("reservations.deleteDialog.yes")}
            </FormButton>
          </Stack>
        </Stack>
      </PaperModal>
    </Modal>
  )
}

export default DeleteDialog
