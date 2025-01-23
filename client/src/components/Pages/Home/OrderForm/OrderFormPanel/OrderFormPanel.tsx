import FormButton from "../../../../Commons/FormButton"
import { createItem, OrderMerged } from "../../../../../db/dbApi"
import SendIcon from "@mui/icons-material/Send"
import { Dispatch } from "react"
import CollapseButton from "./Components/CollapseButton"
import OrderPanelLayout from "./OrderPanelLayout"
import { Action, ACTION_TYPES } from "../reducer/actions"
import { useTranslation } from "react-i18next"
import priceFormatter from "../../../../../utils/priceFormatter"
import Input from "../../../../Commons/Input"
import DeleteIcon from "@mui/icons-material/Delete"
import { useSnackbar } from "notistack"
import PaidButton from "./Components/PaidButton"
import DiscountToGoButton from "./Components/DiscountToGoButton"
import StyledTooltip from "../../../../Commons/StyledTooltip"
import DoneOutlineIcon from "@mui/icons-material/DoneOutline"
import AddItemButton from "./Components/AddItemButton"
import TableInput from "./Components/TableInput"
import DiscountInput from "./Components/DiscountInput"
import onSubmit from "./onSubmit"

interface props {
  baseSum: number
  totalSum: number
  state: OrderMerged
  dispatch: Dispatch<Action>
}
const OrderFormPanel = ({ baseSum, totalSum, state, dispatch }: props) => {
  const { t } = useTranslation()
  const emptyOrder = state.items.every((item) => item.name === "")
  const allPrepared = emptyOrder
    ? false
    : state.items.filter((item) => item.name).every((item) => item.prepared)

  const { enqueueSnackbar } = useSnackbar()
  const submitCallbacks = {
    onDelete: () =>
      enqueueSnackbar(t("alerts.orderDelete"), {
        variant: "warning",
      }),
    onSave: () =>
      enqueueSnackbar(t("alerts.orderSave"), {
        variant: "success",
      }),
    onError: (error: string) => enqueueSnackbar(error, { variant: "error" }),
  }

  return (
    <OrderPanelLayout>
      {{
        AddItemButton: (
          <AddItemButton
            tooltip={t("tooltips.addItem")}
            onClick={() => createItem({ orderId: state.id })}
          />
        ),

        TableField: (
          <TableInput
            label={t("home.table")}
            value={state.table}
            onChange={(event) => {
              dispatch({
                type: ACTION_TYPES.table,
                value: event.target.value,
              })
              setTimeout(() => {
                event.target.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "nearest",
                })
              }, 800)
            }}
          />
        ),

        CollapseButton: (
          <CollapseButton
            open={state.collapsed}
            toggleCollapse={() => {
              dispatch({
                type: ACTION_TYPES.collapsed,
                value: !state.collapsed,
              })
            }}
          />
        ),

        AllReady: allPrepared ? (
          <StyledTooltip title={t("tooltips.allPrepared")} placement={"left"}>
            <DoneOutlineIcon color={"success"} />
          </StyledTooltip>
        ) : null,

        DiscountField: (
          <DiscountInput
            label={t("home.discount")}
            discount={state.discount}
            onChange={(event) => {
              dispatch({
                type: ACTION_TYPES.discount,
                value: parseInt(event.target.value),
              })
            }}
            Adornment={
              <DiscountToGoButton
                discountToGo={state.discountToGo}
                onClick={() =>
                  dispatch({
                    type: ACTION_TYPES.discountToGo,
                    value: !state.discountToGo,
                  })
                }
              />
            }
          />
        ),

        SplitPaymentSwitch: <div></div>,

        BaseSumField: (
          <Input
            label={t("home.rawPrice")}
            type={"number"}
            value={priceFormatter(baseSum)}
            InputProps={{ readOnly: true }}
          />
        ),

        TotalSumField: (
          <Input
            label={t("home.totalPrice")}
            type={"number"}
            value={priceFormatter(totalSum)}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <PaidButton
                  isPaid={state.paid}
                  onClick={() => {
                    dispatch({
                      type: ACTION_TYPES.paid,
                      value: !state.paid,
                    })
                  }}
                />
              ),
            }}
          />
        ),

        SubmitButton: (
          <FormButton
            onClick={() => onSubmit(state, submitCallbacks)}
            $danger={emptyOrder}
            endIcon={emptyOrder ? <DeleteIcon /> : <SendIcon />}
            fullWidth
          >
            {emptyOrder ? t("home.deleteOrder") : t("home.closeOrder")}
          </FormButton>
        ),
      }}
    </OrderPanelLayout>
  )
}

export default OrderFormPanel
