import { render } from "@testing-library/react"
import DateInput, { datePickerTestId } from "./DateInput"
import "@testing-library/jest-dom/extend-expect"
import { testIds } from "./TimeScroll"

describe("<DatePicker />", () => {
  const dateTime = "01/09/2021, 12:00:55"
  const labels = {
    date: "Date",
    scrollTip: "Scroll to change time",
  }
  it("Renders", () => {
    const theThing = render(
      <DateInput labels={labels} datetime={dateTime} setDatetime={() => {}} />
    )
    expect(theThing).toBeTruthy()
  })
  it("Passed datetime is displayed on a date input", () => {
    const expectedDate = "01-09-2021"

    const { getByTestId } = render(
      <DateInput labels={labels} datetime={dateTime} setDatetime={() => {}} />
    )

    const el = getByTestId(datePickerTestId) as HTMLInputElement
    expect(el.value).toEqual(expectedDate)
  })

  it("Passed datetime is displayed on a time inputs", () => {
    const expectedHour = "12"
    const expectedMinutes = "0"
    const { getByTestId } = render(
      <DateInput labels={labels} datetime={dateTime} setDatetime={() => {}} />
    )

    const hourSelect = getByTestId(testIds.hour) as HTMLInputElement
    expect(hourSelect.value).toEqual(expectedHour)

    const minuteSelect = getByTestId(testIds.minutes) as HTMLInputElement
    expect(minuteSelect.value).toEqual(expectedMinutes)
  })
})
