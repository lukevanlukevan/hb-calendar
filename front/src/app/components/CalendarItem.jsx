function CalendarItem({ item, setCurrentItem }) {
  function gridClass({ day, span }) {
    var col = day % 7
    var row = Math.floor(day / 7) * 6
    var colspan = col + span
    const classObject = {
      gridColumnStart: col,
      gridRowStart: row + 2,
      gridColumnEnd: colspan,
    }
    return classObject
  }

  return (
    <div
      style={gridClass(item)}
      className={`bg-red-300 rounded-md p-0.5.5.5.5.5 px-2 m-1 hover:shadow-md hover:border-red-300`}
      onClick={() => setCurrentItem(item)}
    >
      {item.title}
    </div>
  )
}

export default CalendarItem
