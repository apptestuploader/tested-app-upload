import React, { ReactNode, useEffect, useState } from "react"

type Signature = <Entity>(contextInitializer: {
  apiCall: () => Promise<Entity[]>
  initialValue: Entity[]
}) => {
  context: React.Context<{
    values: Entity[]
    fetcher: () => Promise<void>
  }>
  provider: ({ children }: { children: ReactNode }) => JSX.Element
}
export const contextFactory: Signature = ({ apiCall, initialValue }) => {
  const Ctx = React.createContext({
    values: initialValue,
    fetcher: async () => {}, // Hacking to avoid `Partial`, see: https://felixgerschau.com/react-typescript-context/
  })
  const Provider = ({ children }: { children: ReactNode }) => {
    const [values, setValues] = useState(initialValue)
    const fetcher = async () => {
      setValues(await apiCall())
    }

    useEffect(() => {
      fetcher() // one can add error handling via `.then().catch()`
    }, [])
    return (
      <Ctx.Provider
        value={{
          values,
          fetcher,
        }}
      >
        {children}
      </Ctx.Provider>
    )
  }
  return {
    context: Ctx,
    provider: Provider,
  }
}
