import { useContext } from "react"
import { InventoryContext } from "../../../Contexts/Inventory"
import { useFormik } from "formik"
import { ApiError, InventoryCreate, Inventorys } from "../../../../api"
import { useSnackbar } from "notistack"
import { useTranslation } from "react-i18next"

const INITIAL_STOCK: InventoryCreate = {
  registerCode: "",
  name: "",
  priceDefault: 0,
  priceGaiwan: 0,
  pricePackage: 0,
  priceBulk: 0,
  priceGongfu: 0,
}
const useInventoryForm = ({
  errorMessage,
  callback,
}: {
  errorMessage: string
  callback: () => void
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const { fetcher } = useContext(InventoryContext)
  const formik = useFormik({
    initialValues: INITIAL_STOCK,
    onSubmit: async (values, { resetForm }) => {
      try {
        const trimmedName = values.name.trim()
        if (trimmedName !== "") {
          await Inventorys.createInventory({
            ...values,
            name: trimmedName,
            priceDefault: values.priceDefault * 100,
            priceGaiwan: values.priceGaiwan * 100,
            pricePackage: values.pricePackage * 100,
            priceBulk: values.priceBulk * 100,
            priceGongfu: values.priceGongfu * 100,
          })
        }
      } catch (error) {
        // @ts-ignore
        const message = error?.body?.detail
        if (message === "Entry with this name already exists.") {
          formik.setErrors({ name: errorMessage })
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
      resetForm()
      callback()
      enqueueSnackbar(`${t("alerts.inventoryCreated")} ${values.name.trim()}`, {
        variant: "success",
      })
    },
  })
  return formik
}

export default useInventoryForm
