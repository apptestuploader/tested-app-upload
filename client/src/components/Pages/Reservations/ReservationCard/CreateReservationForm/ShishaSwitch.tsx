import { Button, ButtonGroup, styled } from "@mui/material"
import VapingRoomsIcon from "@mui/icons-material/VapingRooms"
import VapeFreeIcon from "@mui/icons-material/VapeFree"

const ShishaButton = styled(Button)(({ theme }) => ({
  color: theme.palette.custom.fontColor,
}))

const ShishaSwitch = ({
  state,
  setter,
}: {
  state: boolean
  setter: (arg0: boolean) => void
}) => {
  const variant = (flag: boolean) => (flag ? "contained" : "outlined")
  const setShisha = () => setter(true)
  const unsetShisha = () => setter(false)

  return (
    <ButtonGroup>
      <ShishaButton
        color={"error"}
        variant={variant(state)}
        onClick={setShisha}
      >
        <VapingRoomsIcon />
      </ShishaButton>
      <ShishaButton
        color={"success"}
        variant={variant(!state)}
        onClick={unsetShisha}
      >
        <VapeFreeIcon />
      </ShishaButton>
    </ButtonGroup>
  )
}

export default ShishaSwitch
