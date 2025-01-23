import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom"
import Home from "../Pages/Home/Home"
import Inventory from "../Pages/Inventory/Inventory"
import Archive from "../Pages/Archive/Archive"
import Reservations from "../Pages/Reservations/Reservations"
import Login from "../Pages/Login/Login"
import React from "react"
import { UserData } from "../../api"
import { useConjoinedIntervalsOfSuccess } from "../Navigation/Sidebar/useEasterEgg"
import Sidecar from "../Pages/Sidecar/Sidecar"

const RouterProvider = ({
  user,
  setUser,
}: {
  user: UserData | null
  setUser: (arg0: UserData) => void
}) => {
  useConjoinedIntervalsOfSuccess()

  return (
    <BrowserRouter>
      <Routes>
        <Route element={user ? <Outlet /> : <Navigate to={"/login"} />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/reservations"} element={<Reservations />} />
          <Route path={"/inventory"} element={<Inventory />} />
          <Route path={"/archive"} element={<Archive />} />
          <Route path={"/sidecar"} element={<Sidecar />} />
        </Route>
        <Route
          path={"/login"}
          element={user ? <Navigate to={"/"} /> : <Login setUser={setUser} />}
        />
      </Routes>
    </BrowserRouter>
  )
}
export default RouterProvider
