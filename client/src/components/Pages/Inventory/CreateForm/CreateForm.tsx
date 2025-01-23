import { Button, Container, Stack, Typography } from "@mui/material"
import { forwardRef } from "react"
import InventoryInput from "../InventoryInput"
import { useTranslation } from "react-i18next"
import BoringFormikInput from "../BoringFormikInput"
import useInventoryForm from "./hooks"
import PaperModal from "../../../Commons/PaperModal"
import CloseButton from "../../../Commons/CloseButton"

const CreateForm = forwardRef(({ close }: { close: () => void }, ref) => {
  const { t } = useTranslation()
  const formik = useInventoryForm({
    callback: close,
    errorMessage: t("inventorys.entryExists"),
  })

  return (
    <Container>
      <PaperModal padding={"3%"} top={"25%"} sx={{ pt: "1%" }}>
        <Stack>
          <CloseButton onClick={close} />
          <Typography variant={"h4"}>
            {t("inventorys.createInventory")}
          </Typography>
          <Stack direction={"row"}>
            <BoringFormikInput
              name={"registerCode"}
              values={formik.values}
              handleChange={formik.handleChange}
              type={"text"}
            />

            <InventoryInput
              name={"name"}
              label={t("inventorys.name")}
              id={`create-form-name`}
              type={"text"}
              error={formik.errors.name}
              value={formik.values.name}
              onChange={formik.handleChange}
              width={"500%"}
            />
          </Stack>
          <Stack direction={"row"}>
            <BoringFormikInput
              name={"priceDefault"}
              values={formik.values}
              handleChange={formik.handleChange}
            />
            <BoringFormikInput
              name={"priceGaiwan"}
              values={formik.values}
              handleChange={formik.handleChange}
            />
            <BoringFormikInput
              name={"pricePackage"}
              values={formik.values}
              handleChange={formik.handleChange}
            />
            <BoringFormikInput
              name={"priceBulk"}
              values={formik.values}
              handleChange={formik.handleChange}
            />
            <BoringFormikInput
              name={"priceGongfu"}
              values={formik.values}
              handleChange={formik.handleChange}
            />

            <Button
              sx={{ width: "100%" }}
              variant={"contained"}
              color={"success"}
              type={"submit"}
              onClick={() => formik.handleSubmit()}
            >
              {t("inventorys.create")}
            </Button>
          </Stack>
        </Stack>
      </PaperModal>
    </Container>
  )
})

export default CreateForm
