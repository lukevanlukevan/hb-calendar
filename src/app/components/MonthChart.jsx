export default function MonthChart({ numMonths = 1, events, setCurrentItem }) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  function gridClass({ day, span }) {
    var col = day % 7
    var row = Math.floor(day / 7) * 6
    var colspan = col + span
    const classString = {
      gridColumnStart: col,
      gridRowStart: row + 2,
      gridColumnEnd: colspan,
    }
    return classString
  }

  const dummy = [
    {
      title: "foobar",
      day: 15,
      span: 10,
    },
    {
      title: "test item",
      day: 5,
      span: 10,
    },
  ]
  return (
    <div className="w-full h-full">
      <div id="headers" className="grid grid-cols-7">
        {days.map((day, i) => (
          <div className="rounded-md bg-gray-500 p-0.5 m-1 px-2" key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className="h-11/12 relative">
        <div className="w-full grid h-full grid-cols-7 grid-rows-5">
          {...Array(30)
            .fill()
            .map((day, i) => {
              const weekend = i % 7 == 0 || i % 7 == 6

              return (
                <div
                  key={i}
                  className={`${!weekend ? "bg-gray-500" : "bg-gray-700"} rounded-sm m-0.5 p-1`}
                >
                  {i + 1 < 10 ? `0${i + 1}` : i + 1}
                </div>
              )
            })}
        </div>
        {/* items */}
        <div className="w-full grid h-full grid-cols-7 grid-rows-30 absolute top-0">
          {dummy.map((item) => (
            <div
              key={item.title}
              style={gridClass(item)}
              className={`bg-red-300 rounded-md p-0.5.5.5.5.5 px-2 m-1`}
              onClick={() => setCurrentItem(dummy)}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
