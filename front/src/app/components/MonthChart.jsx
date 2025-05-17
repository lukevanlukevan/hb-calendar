import CalendarItem from "@/app/components/CalendarItem"

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

  const today = () => {
    const date = new Date()
    return date
  }

  return (
    <div className="w-full h-full">
      <div id="headers" className="grid grid-cols-7">
        {days.map((day, _i) => (
          <div className="rounded-md bg-cell-light p-0.5 m-1 px-2" key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className="h-11/12 relative">
        {/* add numbers */}
        <div className="w-full grid h-full grid-cols-7 grid-rows-8">
          {...Array(7 * 4 * numMonths)
            .fill()
            .map((_day, i) => {
              const weekend = i % 7 == 0 || i % 7 == 6
              const zeroday = (i % 31) + 1
              return (
                <div
                  key={i}
                  className={`${weekend ? "bg-cell-dark" : "bg-cell-light"} rounded-sm m-0.5 p-1`}
                >
                  {zeroday < 10 ? `0${zeroday}` : zeroday}
                </div>
              )
            })}
        </div>
        {/* items */}
        <div className="w-full grid h-full grid-cols-7 grid-rows-30 absolute top-0">
          {events.map((item) => {
            return (
              <CalendarItem
                key={item.title}
                item={item}
                setCurrentItem={setCurrentItem}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
