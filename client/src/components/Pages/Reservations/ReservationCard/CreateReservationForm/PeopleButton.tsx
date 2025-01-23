import { Button, ButtonGroup, styled, Tooltip } from "@mui/material"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import modifyOnScroll from "./modifyOnScroll"
import { useTranslation } from "react-i18next"

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.custom.fontColor,
  backgroundColor: theme.palette.custom.info.secondary,
  [":disabled"]: {
    color: theme.palette.custom.fontColor,
  },
}))

const PeopleButton = ({
  people,
  setPeople,
}: {
  people: number
  setPeople: (people: number) => void
}) => {
  const { t } = useTranslation()
  return (
    <ButtonGroup style={{ marginLeft: "auto" }}>
      <StyledButton onClick={() => setPeople(people - 1)}>
        <PersonRemoveIcon />
      </StyledButton>
      <Tooltip title={t("tooltips.scrollPeople")}>
        <StyledButton
          onWheel={modifyOnScroll({
            value: people,
            setter: setPeople,
            min: 1,
            max: 15,
            offset: 1,
          })}
        >
          {people}
        </StyledButton>
      </Tooltip>

      <StyledButton onClick={() => setPeople(people + 1)}>
        <PersonAddIcon />
      </StyledButton>
    </ButtonGroup>
  )
}

export default PeopleButton
