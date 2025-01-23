import { Paper, styled } from "@mui/material"

const PaperModal = styled(Paper, {
  shouldForwardProps: (prop: string) => {
    const toForward = ["padding", "top"]
    return toForward.includes(prop)
  },
})(({ theme, padding, top }) => ({
  position: "absolute" as "absolute",
  top: top || "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  border: "2px solid #000",
  boxShadow: "24",
  padding: padding ?? "3%",
  backgroundColor: theme.palette.custom.greyscale.main,
}))

export default PaperModal
