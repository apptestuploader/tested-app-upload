import Input from "../../../../../Commons/Input"
import {useTranslation} from "react-i18next"
import {OrderMerged} from "../../../../../../db/dbApi"

const CodeDisplay = ({
  first,
  index,
  state,
}: {
  first: boolean
  index: number
  state: OrderMerged
}) => {
  const { t } = useTranslation()

  return (
    <Input
      label={first ? t("home.item.registerCode") : ""}
      name={`items[${index}].code`}
      value={state.items[index].code}
      onChange={() => {}}
      InputProps={{ readOnly: true }}
    />
  )
}

export default CodeDisplay
