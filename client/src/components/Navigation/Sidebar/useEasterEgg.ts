import {
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
  useSnackbar,
} from "notistack"
import { useEffect, useMemo, useState } from "react"

const BASE_IMAGE = "/teaplant.jpeg"
const EASTER_EGG_IMAGE = "/my-finest.jpg"
const messages = [
  "O Panie, to Ty na mnie spojrzałeś,",
  "Twoje usta dziś wyrzekły me imię.",
  "Swoją barkę pozostawiam na brzegu,",
  "Razem z Tobą nowy zacznę dziś łów.",
].reverse()

const deployLyrics = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey
) => {
  messages.forEach((message) => {
    enqueueSnackbar(message, {
      variant: "warning",
      autoHideDuration: 60000,
      TransitionProps: {
        // @ts-ignore - notistack is not up to date with material-ui
        direction: "right",
      },
    })
  })
}

const useEasterEgg = (controller: boolean) => {
  const [timeout, createTimeout] = useState(null)
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    if (controller) {
      createTimeout(
        // @ts-ignore
        setTimeout(() => {
          document.body.style.backgroundImage = `url(${EASTER_EGG_IMAGE})`
          deployLyrics(enqueueSnackbar)
        }, 3500)
      )
    } else {
      if (timeout !== null) {
        clearTimeout(timeout)
      }
      document.body.style.backgroundImage = `url(${BASE_IMAGE})`
    }
  }, [controller])
}

const theListener = (
  targetHour: number,
  targetMinute: number,
  callback: () => void
) => {
  const date = new Date()

  const hour = date.getHours()
  const minute = date.getMinutes()

  if (hour === targetHour && minute === targetMinute) {
    document.body.style.backgroundImage = `url(${EASTER_EGG_IMAGE})`
    callback()
    setTimeout(
      () => (document.body.style.backgroundImage = `url(${BASE_IMAGE})`),
      60000
    )
  }
}

const clearIntervals = (
  targetHour: number,
  targetMinute: number,
  targetSeconds: number,
  listenerToCancel: string | number | NodeJS.Timeout | undefined
) => {
  const date = new Date()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const seconds = date.getSeconds()
  if (
    hour === targetHour &&
    minute === targetMinute &&
    seconds > targetSeconds
  ) {
    clearInterval(listenerToCancel)
  }
}

const conjoinedIntervalsOfSuccess = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey
) => {
  const easterEggOff = parseInt(process.env.REACT_APP_EASTER_EGG_0 ?? "0") === 0
  if (easterEggOff) {
    return
  }
  const targetHour = 21
  const targetMinute = 37
  const targetSeconds = 1

  const setSpecialPicture = setInterval(
    () =>
      theListener(targetHour, targetMinute, () =>
        deployLyrics(enqueueSnackbar)
      ),
    1000
  )
  const clearSpecialPicture = setInterval(
    () =>
      clearIntervals(
        targetHour,
        targetMinute,
        targetSeconds,
        setSpecialPicture
      ),
    1000
  )
}

export const useConjoinedIntervalsOfSuccess = () => {
  // with strict mode it runs twice
  const { enqueueSnackbar } = useSnackbar()

  useMemo(() => conjoinedIntervalsOfSuccess(enqueueSnackbar), [])
}

export default useEasterEgg
