import React, { ReactNode, useState } from "react"

interface props {
  table: string
  setTable: (table: string) => void
  product: string
  setProduct: (product: string) => void
}

const FiltersContext = (props: props) => {
  const Ctx = React.createContext({
    ...props,
  })
  const Provider = ({ children }: { children: ReactNode }) => {
    const [table, setTable] = useState(props.table)
    const [product, setProduct] = useState(props.product)

    return (
      <Ctx.Provider
        value={{
          table,
          setTable,
          product,
          setProduct,
        }}
      >
        {children}
      </Ctx.Provider>
    )
  }
  return {
    Context: Ctx,
    Provider: Provider,
  }
}

export default FiltersContext({
  table: "",
  setTable: (table: string) => {},
  product: "",
  setProduct: (product: string) => {},
})
