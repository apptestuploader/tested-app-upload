import React from "react"
import Version from "../Commons/Version"

interface props {
  Header: React.ReactNode
  Body: React.ReactNode
  Modal?: React.ReactNode
}

const BaseLayout = ({ Header, Body, Modal }: props) => {
  return (
    <div>
      {Header}
      {Body}
      {Modal}
      <Version />
    </div>
  )
}
export default BaseLayout
