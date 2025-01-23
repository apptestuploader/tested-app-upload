import { alpha, Stack, styled } from "@mui/material"
import { InventoryContext } from "../../Contexts/Inventory"
import { useContext, useState } from "react"
import InventoryRow from "./InventoryRow"
import Search from "./Search"

const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.custom.greyscale.main, 0.75),
  margin: "3%",
  paddingBottom: "3%",
  marginTop: "1%",
  borderRadius: 25,
}))

const InventoryContainer = () => {
  const { values: inventorys } = useContext(InventoryContext)
  const [search, setSearchPhrase] = useState("")
  return (
    <StyledStack>
      <Search search={search} setSearchPhrase={setSearchPhrase} />
      {inventorys.map((inventory) => (
        <InventoryRow
          key={inventory.id}
          inventory={inventory}
          visible={inventory.name.toLowerCase().includes(search)}
        />
      ))}
    </StyledStack>
  )
}

export default InventoryContainer
