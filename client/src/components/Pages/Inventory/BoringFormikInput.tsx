import { InventoryCreate } from "../../../api"
import InventoryInput from "./InventoryInput"
import { useTranslation } from "react-i18next"

const BoringFormikInput = ({
  name,
  values,
  handleChange,
  type = "number",
}: {
  name: keyof InventoryCreate
  values: InventoryCreate
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: "text" | "number"
}) => {
  const { t } = useTranslation()

  const idPattern = `create-form-${name}`
  const labelPattern = `inventorys.${name}`
  return (
    <InventoryInput
      name={name}
      label={t(labelPattern)}
      id={idPattern}
      type={type}
      value={values[name]}
      onChange={handleChange}
      width={"100%"}
    />
  )
}

export default BoringFormikInput
