import { ReservationCreate, Reservations } from "../../../../../api"
import {
  Button,
  CardContent,
  CardHeader,
  InputAdornment,
  Modal,
  Stack,
  styled,
  Typography,
} from "@mui/material"
import { useContext } from "react"
import { useTranslation } from "react-i18next"
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant"
import PermIdentityIcon from "@mui/icons-material/PermIdentity"
import ShishaSwitch from "./ShishaSwitch"
import MoreIcon from "@mui/icons-material/More"
import SendIcon from "@mui/icons-material/Send"
import { ReservationContext } from "../../../../Contexts/Reservations"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import useReservationForm from "./hooks"
import PaperModal from "../../../../Commons/PaperModal"
import Input from "../../../../Commons/Input"
import FormButton from "../../../../Commons/FormButton"
import PeopleButton from "./PeopleButton"
import { useFlag } from "../../../../hooks/useFlag"
import DeleteDialog from "./DeleteDialog"
import CloseButton from "../../../../Commons/CloseButton"
import DateInput from "./DateInput/DateInput"

const PaddedStack = styled(Stack)({
  paddingBottom: "1%",
  paddingTop: "1%",
})

interface props {
  id?: string
  reservation: ReservationCreate
  open: boolean
  onClose: () => void
}

const CreateReservationForm = ({ reservation, open, onClose, id }: props) => {
  const { t } = useTranslation()
  const { fetcher } = useContext(ReservationContext)
  const { formData, setFormData, setShisha, setPeople, submitForm } =
    useReservationForm({
      reservation: { ...reservation },
      id,
      callback: async () => {
        onClose()
        await fetcher()
      },
    })
  const {
    flag: deleteDialogOpen,
    toggleTrue: openDeleteDialog,
    toggleFalse: closeDeleteDialog,
  } = useFlag()
  return (
    <Modal open={open} onClose={onClose}>
      <PaperModal padding={"1%"}>
        <Stack>
          <CloseButton onClick={onClose} />
          <CardContent>
            <CardHeader
              title={
                id
                  ? t("reservations.form.update")
                  : t("reservations.form.create")
              }
              action={
                id !== undefined ? (
                  <>
                    <Button
                      color={"error"}
                      variant={"contained"}
                      onClick={openDeleteDialog}
                    >
                      {t("reservations.form.delete")}
                      <DeleteForeverIcon />
                    </Button>
                    <DeleteDialog
                      open={deleteDialogOpen}
                      reservation={reservation}
                      onClose={closeDeleteDialog}
                      callback={async () => {
                        await Reservations.deleteReservation(id)
                        await fetcher()
                        closeDeleteDialog()
                        onClose()
                      }}
                    />
                  </>
                ) : null
              }
            />
            <Stack>
              <PaddedStack direction={"row"}>
                <DateInput
                  labels={{
                    date: t("reservations.form.date"),
                    scrollTip: t("tooltips.scroll"),
                  }}
                  datetime={formData.date}
                  setDatetime={(datetime: string) =>
                    setFormData({ ...formData, date: datetime })
                  }
                />
                <PeopleButton
                  people={formData.people ?? 1}
                  setPeople={setPeople}
                />
                <ShishaSwitch
                  state={formData.isWaterPipe ?? false}
                  setter={setShisha}
                />
              </PaddedStack>
              <PaddedStack direction={"row"}>
                <Input
                  onChange={(event) =>
                    setFormData({ ...formData, name: event.target.value })
                  }
                  value={formData.name}
                  label={t("reservations.form.name")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position={"start"}>
                        <PermIdentityIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Input
                  style={{ marginLeft: "auto" }}
                  onChange={(event) =>
                    setFormData({ ...formData, table: event.target.value })
                  }
                  value={formData.table}
                  label={t("reservations.form.table")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position={"start"}>
                        <TableRestaurantIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </PaddedStack>
              <PaddedStack direction={"row"}>
                <Input
                  onChange={(event) =>
                    setFormData({ ...formData, hints: event.target.value })
                  }
                  value={formData.hints}
                  label={t("reservations.form.hints")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position={"start"}>
                        <MoreIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormButton
                  style={{ marginLeft: "auto" }}
                  variant={"contained"}
                  onClick={submitForm}
                  endIcon={<SendIcon />}
                >
                  <Typography fontSize={"large"}>
                    {t("reservations.form.save")}
                  </Typography>
                </FormButton>
              </PaddedStack>
            </Stack>
          </CardContent>
        </Stack>
      </PaperModal>
    </Modal>
  )
}

export default CreateReservationForm
