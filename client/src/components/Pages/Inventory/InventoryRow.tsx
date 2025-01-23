import DeleteIcon from "@mui/icons-material/Delete"
import { ApiError, Inventory, Inventorys } from "../../../api"
import { Stack } from "@mui/material"
import { useFormik } from "formik"
import InventoryInput from "./InventoryInput"
import { InventoryContext } from "../../Contexts/Inventory"
import { useContext } from "react"
import { useTranslation } from "react-i18next"
import FormButton from "../../Commons/FormButton"
import SaveIcon from "@mui/icons-material/Save"
import RefreshIcon from "@mui/icons-material/Refresh"
import { priceParse } from "../../../utils/priceParse"
import { useSnackbar } from "notistack"
import StyledTooltip from "../../Commons/StyledTooltip"
import { useFlag } from "../../hooks/useFlag"
import DeleteDialog from "./DeleteDialog"

const InventoryRow = ({
  inventory,
  visible,
}: {
  inventory: Inventory
  visible: boolean
}) => {
  const { t } = useTranslation()
  const { fetcher } = useContext(InventoryContext)
  const { enqueueSnackbar } = useSnackbar()
  const {
    flag: deleteDialogOpen,
    toggleTrue: openDeleteDialog,
    toggleFalse: closeDeleteDialog,
  } = useFlag()

  const formik = useFormik({
    initialValues: {
      ...inventory,
      priceDefault: inventory.priceDefault / 100,
      priceGaiwan: inventory.priceGaiwan / 100,
      pricePackage: inventory.pricePackage / 100,
      priceBulk: inventory.priceBulk,
      priceGongfu: inventory.priceGongfu / 100,
    },
    onSubmit: async (values) => {
      try {
        const trimmedName = values.name.trim()
        if (trimmedName !== "") {
          await Inventorys.updateInventory(values.id, {
            ...values,
            name: trimmedName,
            priceDefault: priceParse(values.priceDefault),
            priceGaiwan: priceParse(values.priceGaiwan),
            pricePackage: priceParse(values.pricePackage),
            priceBulk: values.priceBulk,
            priceGongfu: priceParse(values.priceGongfu),
          })
          enqueueSnackbar(`${t("alerts.inventoryUpdated")} ${values.name}.`, {
            variant: "success",
          })
        }
      } catch (error) {
        // @ts-ignore

        const message = error?.body?.detail
        if (message === "Entry with this name already exists.") {
          formik.setErrors({ name: t("inventorys.entryExists") })
        }
        if (typeof error === "string") {
          enqueueSnackbar(error, { variant: "error" })
        } else if (error instanceof ApiError) {
          enqueueSnackbar(error.body?.detail ?? error.body.error, {
            variant: "error",
          })
        } else if (error instanceof Error) {
          enqueueSnackbar(error.message, { variant: "error" })
        }
        return
      }
      await fetcher()
    },
  })

  return (
    <Stack
      direction={"row"}
      sx={{ margin: 1 }}
      justifyContent={"center"}
      style={{ display: visible ? "flex" : "none" }}
    >
      <StyledTooltip title={t("tooltips.inventory.delete")} placement={"left"}>
        <FormButton $danger={true} onClick={openDeleteDialog}>
          <DeleteIcon />
        </FormButton>
      </StyledTooltip>
      <StyledTooltip title={t("tooltips.inventory.reset")} placement={"right"}>
        <FormButton
          onClick={async () => {
            formik.resetForm()
          }}
        >
          <RefreshIcon />
        </FormButton>
      </StyledTooltip>
      <InventoryInput
        name={"registerCode"}
        label={t("inventorys.registerCode")}
        id={`${inventory.id}-registerCode`}
        type={"text"}
        value={formik.values.registerCode}
        touched={formik.values.registerCode !== inventory.registerCode}
        onChange={formik.handleChange}
      />
      <InventoryInput
        name={"name"}
        label={t("inventorys.name")}
        id={`${inventory.id}-name`}
        type={"text"}
        error={formik.errors.name}
        value={formik.values.name}
        width={"30%"}
        touched={formik.values.name !== inventory.name}
        onChange={formik.handleChange}
      />
      <InventoryInput
        name={"priceDefault"}
        label={t("inventorys.priceDefault")}
        id={`${inventory.id}-priceDefault`}
        type={"number"}
        value={formik.values.priceDefault}
        touched={formik.values.priceDefault !== inventory.priceDefault / 100}
        onChange={formik.handleChange}
      />
      <InventoryInput
        name={"priceGaiwan"}
        label={t("inventorys.priceGaiwan")}
        id={`${inventory.id}-priceGaiwan`}
        type={"number"}
        value={formik.values.priceGaiwan}
        touched={formik.values.priceGaiwan !== inventory.priceGaiwan / 100}
        onChange={formik.handleChange}
      />
      <InventoryInput
        name={"pricePackage"}
        label={t("inventorys.pricePackage")}
        id={`${inventory.id}-pricePackage`}
        type={"number"}
        value={formik.values.pricePackage}
        touched={formik.values.pricePackage !== inventory.pricePackage / 100}
        onChange={formik.handleChange}
      />
      <InventoryInput
        name={"priceBulk"}
        label={t("inventorys.priceBulk")}
        id={`${inventory.id}-priceBulk`}
        type={"number"}
        value={formik.values.priceBulk}
        touched={formik.values.priceBulk !== inventory.priceBulk}
        onChange={formik.handleChange}
      />
      <InventoryInput
        name={"priceGongfu"}
        label={t("inventorys.priceGongfu")}
        id={`${inventory.id}-priceGongfu`}
        type={"number"}
        value={formik.values.priceGongfu}
        touched={formik.values.priceGongfu !== inventory.priceGongfu / 100}
        onChange={formik.handleChange}
      />
      <StyledTooltip title={t("tooltips.inventory.save")} placement={"right"}>
        <FormButton type={"submit"} onClick={() => formik.handleSubmit()}>
          <SaveIcon />
        </FormButton>
      </StyledTooltip>
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        inventory={inventory}
        callback={fetcher}
      />
    </Stack>
  )
}

export default InventoryRow
