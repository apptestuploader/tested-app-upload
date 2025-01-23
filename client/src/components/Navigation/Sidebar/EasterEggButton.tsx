import EggIcon from "@mui/icons-material/Egg"
import { Button, ButtonGroup } from "@mui/material"
import { useFlag } from "../../hooks/useFlag"
import useEasterEgg from "./useEasterEgg"

const EasterEggButton = () => {
  const { flag, toggleTrue, toggleFalse } = useFlag()
  useEasterEgg(flag)
  return (
    <ButtonGroup sx={{ mt: "auto", ml: "auto" }}>
      <Button
        variant={flag ? "contained" : "outlined"}
        color={"success"}
        onClick={toggleTrue}
      >
        <EggIcon />
      </Button>
      <Button
        variant={flag ? "outlined" : "contained"}
        color={"error"}
        onClick={toggleFalse}
      >
        <EggIcon />
      </Button>
    </ButtonGroup>
  )
}

export default EasterEggButton
