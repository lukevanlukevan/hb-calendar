function CalendarItem({ item, calendarDays, setCurrentItem }) {
  const start = new Date(item.startDate)
  const end = new Date(item.endDate)

  const startIndex = calendarDays.findIndex(
    (d) => new Date(d.date).toDateString() === start.toDateString(),
  )

  const endIndex = calendarDays.findIndex(
    (d) => new Date(d.date).toDateString() === end.toDateString(),
  )

  const wrapped = Math.floor((startIndex + endIndex) / 7) // get how many lines we are dealing with

  function gridClass() {
    // Each day gets 3 rows, so we multiply
    const rowsPerDay = 3

    if (startIndex === -1 || endIndex === -1) {
      console.warn("CalendarItem: Invalid date range", item)
      return {}
    }

    const col = (startIndex % 7) + 1 // Tailwind grid is 1-indexed
    const row = Math.floor(startIndex / 7) * rowsPerDay + 1 // also 1-indexed
    const colEnd = (endIndex % 7) + 2
    const span = endIndex - startIndex + 1
    const rowEnd = row + 1 // you can adjust if you want the item to span multiple rows
    console.log(col, colEnd, row, rowEnd)
    return {
      gridColumnStart: col,
      gridColumnEnd: colEnd,
      gridRowStart: row + 1,
    }
  }

  console.log(item)

  return (
    <div
      style={gridClass()}
      className="pointer-events-auto bg-red-300 rounded-md p-1 px-2 m-1 hover:shadow-md hover:border-red-300 cursor-pointer"
      onClick={() => setCurrentItem(item)}
    >
      {item.title}
    </div>
  )
}

export default CalendarItem
