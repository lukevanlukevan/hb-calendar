import { generateMonthDays } from "@/utils/calendarUtils"
import CalendarItem from "@/app/components/CalendarItem"

export default function MonthChart({ numMonths = 1, events, setCurrentItem }) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  const today = new Date()
  const baseMonth = today.getMonth()
  const baseYear = today.getFullYear()

  // Flatten all days for numMonths
  const allDays = []
  for (let i = 0; i < numMonths; i++) {
    const month = (baseMonth + i) % 12
    const year = baseYear + Math.floor((baseMonth + i) / 12)
    allDays.push(...generateMonthDays(year, month))
  }

  const rowCount = () => {
    const weeks = Math.ceil(allDays.length / 7) + 3

    return weeks
  }

  return (
    <div className="w-full h-full">
      <div id="headers" className="grid grid-cols-7">
        {daysOfWeek.map((day) => (
          <div className="rounded-md bg-cell-light p-0.5 m-1 px-2" key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className="h-11/12 relative">
        <div
          className={`w-full grid h-full grid-cols-7 grid-rows-[${rowCount()}]`}
        >
          {allDays.map((dayObj, i) => {
            const { date, inMonth } = dayObj
            const weekend = date.getDay() === 0 || date.getDay() === 6

            const isToday = (() => {
              const today = new Date()
              return (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
              )
            })()

            const month = date.toLocaleString("default", { month: "long" })

            return (
              <div
                key={i}
                className={`${weekend ? "bg-cell-dark" : "bg-cell-light"} 
                  ${inMonth ? "" : "opacity-30"} 
                  rounded-sm m-0.5 p-1 flex justify-start items-left hover:shadow`}
              >
                <div
                  className={`w-6 h-6 flex items-left justify-start text-sm ${
                    isToday ? "border-2 border-red-500 rounded-full" : ""
                  }`}
                >
                  {date.getDate().toString() == "1"
                    ? date.getDate().toString() + " " + month
                    : date.getDate().toString()}
                </div>
              </div>
            )
          })}
        </div>
        <div
          className={`w-full grid h-full grid-cols-7 absolute top-0 pointer-events-none grid-rows-30`}
        >
          {events.map((item) => {
            console.log(item)
            return (
              <CalendarItem
                key={item.id}
                item={item}
                calendarDays={allDays} // ← pass this
                setCurrentItem={setCurrentItem}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
