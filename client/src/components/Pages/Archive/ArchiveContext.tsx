import React from "react"

export const ArchiveSetter = React.createContext<() => Promise<void>>(
  async () => {}
)
