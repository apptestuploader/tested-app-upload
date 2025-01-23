import FormButton from "../../../../../Commons/FormButton"
import {deleteItem, OrderMerged} from "../../../../../../db/dbApi"
import DeleteIcon from "@mui/icons-material/Delete"
import StyledTooltip from "../../../../../Commons/StyledTooltip"
import {useTranslation} from "react-i18next"
import {ItemRow} from "../../../../../../db/db"

const DeleteButton = ({
  item,
  state,
}: {
  item: ItemRow
  state: OrderMerged
}) => {
  const { t } = useTranslation()

  return (
    <StyledTooltip title={t("tooltips.deleteItem")} placement={"left"}>
      <span>
        <FormButton
          $danger={true}
          onClick={() => deleteItem({ id: item.id })}
          disabled={state.items.length < 2}
        >
          <DeleteIcon />
        </FormButton>
      </span>
    </StyledTooltip>
  )
}

export default DeleteButton
