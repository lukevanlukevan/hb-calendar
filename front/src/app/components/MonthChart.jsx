import { generateMonthDays } from "@/utils/calendarUtils"
import CalendarItem from "@/app/components/CalendarItem"
import { useEffect, useState } from "react"

export default function MonthChart({ numMonths, events, setCurrentItem }) {
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

  const allDays = generateMonthDays(baseYear, baseMonth, numMonths)

  const rowCount = () => {
    const weeks = allDays.length / 7

    return weeks
  }
  const rows = 4
  const gridsize = rowCount() * rows

  const gridstring = "grid-rows-" + gridsize

  console.log(gridsize)
  console.log(gridstring)

  return (
    <div className="flex h-full w-full grow flex-col">
      <div id="headers" className="grid grid-cols-7">
        {daysOfWeek.map((day) => (
          <div className="m-1 rounded-md bg-cell-light p-0.5 px-2" key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className="relative h-full grow">
        <div
          className={`grid-rows-[${rowCount()}] grid h-auto w-full grid-cols-7`}
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
                  items-left m-0.5 flex grow justify-start rounded-sm p-1 opacity-50 transition-opacity hover:opacity-100`}
              >
                <div
                  className={`items-left ${
                    isToday ? "border-2 rounded-full" : ""
                  } flex h-6 w-6 justify-start border-red-500 text-sm opacity-100`}
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
          // style={subgrid}
          className={`${gridstring} pointer-events-none absolute top-0 grid h-full w-full grid-cols-7`}
        >
          {events.map((item) => {
            console.log(item)
            return (
              <CalendarItem
                key={item.id}
                item={item}
                rows={rows}
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
