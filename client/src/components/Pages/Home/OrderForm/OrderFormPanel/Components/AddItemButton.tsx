import StyledTooltip from "../../../../../Commons/StyledTooltip"
import FormButton from "../../../../../Commons/FormButton"
import AddIcon from "@mui/icons-material/Add"

interface props {
  tooltip: string
  onClick: () => void
}

const AddItemButton = ({ tooltip, onClick }: props) => {
  return (
    <StyledTooltip title={tooltip} placement={"left"}>
      <FormButton onClick={onClick}>
        <AddIcon />
      </FormButton>
    </StyledTooltip>
  )
}

export default AddItemButton
