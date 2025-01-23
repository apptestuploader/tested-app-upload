import RouterProvider from "./components/Routing/Router"
import ContextWrapper from "./components/Contexts/ContextWrapper"
import { useUser } from "./hooks"

const App = () => {
  const { user, authenticated, setUser } = useUser()

  return (
    <ContextWrapper loggedIn={user !== null}>
      {authenticated ? <RouterProvider user={user} setUser={setUser} /> : null}
    </ContextWrapper>
  )
}

export default App
