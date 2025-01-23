import { Grid } from "@mui/material"

interface props {
  DeleteButton: JSX.Element
  CodeDisplay: JSX.Element
  NameField: JSX.Element
  TypeField: JSX.Element
  QuantityField: JSX.Element
  HintField: JSX.Element
  BasePriceField: JSX.Element
  PriceField: JSX.Element
  PreparedCheckbox: JSX.Element
}

const ItemFormLayout = (props: props) => {
  const sizes = {
    delete: 0.8,
    code: 0.6,
    name: 4.3,
    type: 1.3,
    quantity: 0.9,
    hint: 1.3,
    basePrice: 1,
    price: 1,
    prepared: 0.8,
  }
  const validateGridSize = () => {
    const expectedSum = 12
    const sizesSum = Object.values(sizes).reduce((acc, v) => acc + v, 0)
    if (expectedSum !== sizesSum) {
      throw new Error("Row sizes don't comply with Grid layout")
    }
  }
  validateGridSize()

  return (
    <Grid container>
      <Grid item xs={sizes.delete}>
        {props.DeleteButton}
      </Grid>
      <Grid item xs={sizes.code}>
        {props.CodeDisplay}
      </Grid>
      <Grid item xs={sizes.name}>
        {props.NameField}
      </Grid>
      <Grid item xs={sizes.type}>
        {props.TypeField}
      </Grid>
      <Grid item xs={sizes.quantity}>
        {props.QuantityField}
      </Grid>
      <Grid item xs={sizes.hint}>
        {props.HintField}
      </Grid>
      <Grid item xs={sizes.basePrice}>
        {props.BasePriceField}
      </Grid>
      <Grid item xs={sizes.price}>
        {props.PriceField}
      </Grid>
      <Grid item xs={sizes.prepared}>
        {props.PreparedCheckbox}
      </Grid>
    </Grid>
  )
}

export default ItemFormLayout
