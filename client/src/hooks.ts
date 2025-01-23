import { Auth, UserData } from "./api"
import { useEffect, useState } from "react"
import LogRocket from "logrocket"
import { useTranslation } from "react-i18next"

const useLogrocket = (user: UserData | null) => {
  useEffect(() => {
    if (user?.name) {
      if (process.env.REACT_APP_LOGROCKET_ON === "true") {
        LogRocket.init("2ts6ff/new-tea-shop")
        LogRocket.identify(user.name, {
          name: user.name,
        })
      }
    }
  }, [user])
}

export const useUser = () => {
  const [user, setUser] = useState<UserData | null>(null)
  const [authenticated, setAuthenticated] = useState(false)
  const { i18n } = useTranslation()
  useLogrocket(user)
  useEffect(() => {
    i18n.changeLanguage(user?.language ?? "en")
  }, [user])

  useEffect(() => {
    const wrapper = async () => {
      try {
        const res = await Auth.validateSession()
        setUser(res)
      } finally {
        setAuthenticated(true)
      }
    }
    wrapper()
  }, [])

  return { user, setUser: (user: UserData) => setUser(user), authenticated }
}
