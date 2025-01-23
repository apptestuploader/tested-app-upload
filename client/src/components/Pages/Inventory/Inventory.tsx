import BaseLayout from "../../Layouts/BaseLayout"
import Navigation from "../../Navigation/Navigation"
import InventoryContainer from "./InventoryContainer"
import { Modal } from "@mui/material"
import CreateForm from "./CreateForm/CreateForm"
import { useTranslation } from "react-i18next"
import { useFlag } from "../../hooks/useFlag"
import ViewButton from "../../Commons/ViewButton"

const Inventorys = () => {
  const { t } = useTranslation()
  const { flag, toggleTrue, toggleFalse } = useFlag()

  return (
    <BaseLayout
      Header={
        <Navigation
          ViewButton={
            <ViewButton
              text={t("inventorys.createInventory")}
              onClick={toggleTrue}
            />
          }
        />
      }
      Body={<InventoryContainer />}
      Modal={
        <Modal open={flag} onClose={toggleFalse}>
          <CreateForm close={toggleFalse} />
        </Modal>
      }
    />
  )
}

export default Inventorys
