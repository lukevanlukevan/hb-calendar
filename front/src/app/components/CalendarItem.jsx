function CalendarItem({ item, calendarDays, setCurrentItem }) {
  const start = new Date(item.startDate)
  const end = new Date(item.endDate)

  const startIndex = calendarDays.findIndex(
    (d) => new Date(d.date).toDateString() === start.toDateString(),
  )

  const endIndex = calendarDays.findIndex(
    (d) => new Date(d.date).toDateString() === end.toDateString(),
  )

  if (startIndex === -1 || endIndex === -1) {
    console.warn("CalendarItem: Invalid date range", item)
    return null
  }

  const rowsPerDay = 3
  const startRow = Math.floor(startIndex / 7)
  const endRow = Math.floor(endIndex / 7)
  const wrapped = endRow - startRow

  const elements = []

  for (let i = 0; i <= wrapped; i++) {
    const row = (startRow + i) * rowsPerDay + 1
    const weekStartIndex = (startRow + i) * 7
    const weekEndIndex = weekStartIndex + 6

    const segmentStartIndex = i === 0 ? startIndex : weekStartIndex
    const segmentEndIndex =
      i === wrapped ? endIndex : Math.min(weekEndIndex, endIndex)

    const colStart = (segmentStartIndex % 7) + 1
    const colEnd = (segmentEndIndex % 7) + 2

    elements.push(
      <div
        key={`${item.title}-${i}`}
        style={{
          gridColumnStart: colStart,
          gridColumnEnd: colEnd,
          gridRowStart: row + 1,
        }}
        className="pointer-events-auto bg-red-300 rounded-md p-0.5 px-2 m-1 hover:shadow-md hover:border-red-300 cursor-pointer"
        onClick={() => setCurrentItem(item)}
      >
        {item.title}
      </div>,
    )
  }

  return <>{elements}</>
}

export default CalendarItem
