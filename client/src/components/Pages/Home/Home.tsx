import BaseLayout from "../../Layouts/BaseLayout"
import Navigation from "../../Navigation/Navigation"
import React, { useEffect } from "react"
import { useActiveOrders } from "./hooks"
import ViewButton from "../../Commons/ViewButton"
import { useTranslation } from "react-i18next"
import { createOrder } from "../../../db/dbApi"
import Filters from "./Filters/Filters"
import FilterContext from "./Filters/FiltersContext"
import HomeContent from "./HomeContent"
import socket from "../../../sockets/home"
import { totalActiveSum } from "./utils"

const Home = () => {
  const activeOrders = useActiveOrders()
  const { t } = useTranslation()

  useEffect(() => {
    const { ws, anySidecars } = socket(activeOrders)
    if (ws.readyState && anySidecars) {
      ws?.send(
        JSON.stringify({
          category: "orders here",
          content: activeOrders,
        })
      )
    }
  }, [activeOrders])

  return (
    <FilterContext.Provider>
      <BaseLayout
        Header={
          <Navigation
            ViewButton={
              <Filters totalSum={totalActiveSum(activeOrders)}>
                <ViewButton
                  text={t("home.createOrder")}
                  onClick={createOrder}
                />
              </Filters>
            }
          />
        }
        Body={<HomeContent activeOrders={activeOrders} />}
      />
    </FilterContext.Provider>
  )
}

export default Home
