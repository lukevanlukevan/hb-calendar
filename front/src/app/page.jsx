"use client"
import { useState, useEffect } from "react"
import MonthChart from "@/app/components/MonthChart"
import Sidebar from "@/app/components/Sidebar"
import { fetchCalendarItems } from "@/lib/api" // Update path if needed

export default function Home() {
  const [currentItem, setCurrentItem] = useState(null)
  const [sidebarShowing, setSidebarShowing] = useState(false)
  const [events, setEvents] = useState([])
  const [monthCount, setMontCount] = useState(1)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const items = await fetchCalendarItems()
        const transformed = items.map((item) => {
          const start = new Date(item.start_date)
          const end = new Date(item.end_date)
          return {
            id: item.id,
            title: item.title,
            tag: item.tag,
            // day: start.getDate(),
            // span: Math.max(1, (end - start) / (1000 * 60 * 60 * 24)), // convert ms to days
            startDate: item.start_date,
            endDate: item.end_date,
          }
        })
        setEvents(transformed)
      } catch (err) {
        console.error("Failed to load events", err)
      }
    }

    loadEvents()
  }, [])

  const handleSaveEvent = (newEvent) => {
    if (currentItem) {
      setEvents((prev) =>
        prev.map((e) => (e.id === currentItem.id ? { ...e, ...newEvent } : e)),
      )
    } else {
      const newId = events.length ? Math.max(...events.map((e) => e.id)) + 1 : 1
      setEvents((prev) => [...prev, { ...newEvent, id: newId }])
    }
    setCurrentItem(null)
  }

  const handleEventClick = (item) => {
    setCurrentItem(item)
    setSidebarShowing(true)
  }

  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
    setCurrentItem(null)
  }

  return (
    <div className="flex h-full min-h-screen flex-col">
      <MonthChart
        events={events}
        numMonths={monthCount}
        setCurrentItem={handleEventClick}
      />
      <div id="Monthpicker" className="flex gap-2">
        <div
          onClick={() => setMontCount(1)}
          className="rounded-full bg-cell-light px-2"
        >
          1
        </div>
        <div
          onClick={() => setMontCount(2)}
          className="rounded-full bg-cell-light px-2"
        >
          2
        </div>
        <div
          onClick={() => setMontCount(3)}
          className="rounded-full bg-cell-light px-2"
        >
          3
        </div>
      </div>
      <div
        id="addbtn"
        className="absolute right-0 bottom-0 m-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-cell-light"
        onClick={() => {
          setCurrentItem(null)
          setSidebarShowing(true)
        }}
      >
        +
      </div>

      {/* <Sidebar */}
      {/*   item={currentItem} */}
      {/*   sidebarShowing={sidebarShowing} */}
      {/*   setSidebarShowing={setSidebarShowing} */}
      {/*   onSave={handleSaveEvent} */}
      {/*   onDelete={handleDeleteEvent} */}
      {/* /> */}
    </div>
  )
}
