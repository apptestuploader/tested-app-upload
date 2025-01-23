import { ReactNode } from "react"

interface props {
  Body: ReactNode
}

const SidecarLayout = ({ Body }: props) => {
  return <div>{Body}</div>
}

export default SidecarLayout
