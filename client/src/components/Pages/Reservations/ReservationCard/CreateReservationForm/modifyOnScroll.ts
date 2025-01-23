const modifyOnScroll =
  ({
    value,
    setter,
    min,
    max,
    offset,
  }: {
    value: number
    setter: (arg0: number) => void
    min: number
    max: number
    offset: number
  }) =>
  ({ deltaY }: { deltaY: number }) => {
    const next = value + (deltaY > 0 ? offset : -offset)
    if (next > max || next < min) {
      return
    }
    setter(next)
  }

export default modifyOnScroll
