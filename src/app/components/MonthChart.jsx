function MonthChart({ numMonths = 1, events, setCurrentItem }) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  function calcColumns(date) {
    const startcol = date % 7
    const startrow = Math.floor(date * 7)
    return startcol, startrow
  }

  const dummy = {
    title: "foobar",
  }
  return (
    <div className="w-full h-full">
      <div id="headers" className="grid grid-cols-7">
        {days.map((day, i) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="w-full grid h-full grid-cols-7 grid-rows-5">
        {...Array(30)
          .fill()
          .map((day, i) => {
            const weekend = i % 7 == 0 || i % 7 == 6

            return (
              <div
                key={i}
                className={`${!weekend ? "bg-gray-500" : "bg-gray-700"} rounded-sm m-0.5 border`}
              ></div>
            )
          })}

        <div
          className={`col-start-3 col-span-3 bg-red-500 row-start-3"
          onClick={() => setCurrentItem(dummy)}
        ></div>
      </div>
    </div>
  )
}

export default MonthChart
