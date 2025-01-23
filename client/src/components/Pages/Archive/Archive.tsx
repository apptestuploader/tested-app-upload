import BaseLayout from "../../Layouts/BaseLayout"
import ArchiveView from "./ArchiveView"
import Navigation from "../../Navigation/Navigation"

const Archive = () => {
  return <BaseLayout Header={<Navigation />} Body={<ArchiveView />} />
}

export default Archive
