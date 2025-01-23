import { ReservationCreate, Reservations } from "../../../../../api"
import { useState } from "react"
import { format, parse } from "date-fns"

const useReservationForm = ({
  reservation,
  id,
  callback,
}: {
  reservation: ReservationCreate
  id?: string
  callback: () => void
}) => {
  const [formData, setFormData] = useState({ ...reservation })
  const setPeople = (people: number) => {
    const maxPeople = 15
    const minPeople = 1
    setFormData({
      ...formData,
      people:
        people > maxPeople
          ? maxPeople
          : people < minPeople
          ? minPeople
          : people,
    })
  }
  const setShisha = (shishaState: boolean) => {
    setFormData({ ...formData, isWaterPipe: shishaState })
  }

  const submitReservation = async (send: ReservationCreate, id?: string) => {
    try {
      if (id) {
        await Reservations.updateReservation(id, send)
      } else {
        await Reservations.createReservation(send)
        setFormData({ ...reservation })
      }
    } finally {
      callback()
    }
  }

  const submit = async () => {
    if (formData.date !== null) {
      const toSubmit: ReservationCreate = {
        ...formData,

        date: format(
          parse(formData.date, "dd/MM/yyyy, HH:mm:ss", new Date()),
          "yyyy-MM-dd HH:mm:ss"
        ),
        isReservationDone: false,
      }
      await submitReservation(toSubmit, id)
    }
  }

  return {
    formData,
    setFormData,
    setShisha,
    setPeople,
    submitForm: submit,
  }
}

export default useReservationForm
