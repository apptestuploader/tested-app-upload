import VapingRoomsIcon from "@mui/icons-material/VapingRooms"
import VapeFreeIcon from "@mui/icons-material/VapeFree"
import ReservationButton from "./ReservationButton"

const VapeIcon = ({ smoking }: { smoking: boolean }) => {
  return (
    <ReservationButton
      color={smoking ? "error" : "success"}
      variant={"contained"}
      size={"small"}
      disabled
    >
      {smoking ? <VapingRoomsIcon /> : <VapeFreeIcon />}
    </ReservationButton>
  )
}
export default VapeIcon
