import Input from "../../Commons/Input"
import { useTranslation } from "react-i18next"

const Search = ({
  search,
  setSearchPhrase,
}: {
  search: string
  setSearchPhrase: (search: string) => void
}) => {
  const { t } = useTranslation()

  return (
    <Input
      label={t("inventorys.search")}
      sx={{ width: "30%", margin: "auto", marginTop: 2 }}
      value={search}
      onChange={(e) => setSearchPhrase(e.target.value.toLowerCase())}
    />
  )
}
export default Search
