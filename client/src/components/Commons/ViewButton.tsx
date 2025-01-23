import { Button, styled } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"

interface props {
  text: string
  onClick: () => void
}

const Styled = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  backgroundColor: "rgba(67, 160, 71, 0.6)",
  border: `5px solid rgba(67, 160, 71, 1)`,

  color: theme.palette.custom.fontColor,
  "&:hover": {
    backgroundColor: "rgba(0, 112, 26, 0.9)",
  },
}))

const ViewButton = ({ text, onClick }: props) => {
  return (
    <Styled
      endIcon={<AddOutlinedIcon />}
      startIcon={<AddOutlinedIcon />}
      onClick={onClick}
    >
      {text}
    </Styled>
  )
}

export default ViewButton
