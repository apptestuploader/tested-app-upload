import Grid from "@mui/material/Grid"

interface props {
  children: {
    AddItemButton: JSX.Element
    TableField: JSX.Element
    CollapseButton: JSX.Element
    AllReady: JSX.Element | null
    DiscountField: JSX.Element
    SplitPaymentSwitch: JSX.Element
    SubmitButton: JSX.Element
    BaseSumField: JSX.Element
    TotalSumField: JSX.Element
  }
}

const OrderPanelLayout = ({ children }: props) => {
  return (
    <Grid container>
      <Grid item xs={0.8}>
        {children.AddItemButton}
      </Grid>

      <Grid item xs={0.8}>
        {children.TableField}
      </Grid>

      <Grid item xs={1.85}>
        {children.SplitPaymentSwitch}
      </Grid>
      <Grid item xs={1.5}>
        {children.CollapseButton}
      </Grid>
      <Grid item xs={1.35}></Grid>
      <Grid item xs={0.5}>
        {children.AllReady}
      </Grid>
      <Grid item xs={1.0}>
        {children.DiscountField}
      </Grid>
      <Grid item xs={1.5}>
        {children.BaseSumField}
      </Grid>
      <Grid item xs={1.5}>
        {children.TotalSumField}
      </Grid>
      <Grid item xs={1.2}>
        {children.SubmitButton}
      </Grid>
    </Grid>
  )
}

export default OrderPanelLayout
