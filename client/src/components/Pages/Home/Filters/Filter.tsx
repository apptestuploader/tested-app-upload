import Input from "../../../Commons/Input"
import { IconButton } from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"
import SearchIcon from "@mui/icons-material/Search"

const Filter = ({
  label,
  value,
  setValue,
  width,
}: {
  label: string
  value: string
  setValue: (value: string) => void
  width: string
}) => {
  return (
    <Input
      label={label}
      style={{ width: width, marginTop: "1%" }}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      InputProps={{
        startAdornment: (
          <SearchIcon fontSize={"small"} style={{ color: "white" }} />
        ),
        endAdornment: (
          <IconButton
            onClick={() => setValue("")}
            style={{ padding: 0, color: value ? "red" : "transparent" }}
            disabled={!value}
          >
            <ClearIcon fontSize={"small"} />
          </IconButton>
        ),
      }}
    />
  )
}

export default Filter
