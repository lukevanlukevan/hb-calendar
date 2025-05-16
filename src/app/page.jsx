"use client"
import { useState } from "react"
import MonthChart from "./components/MonthChart"
import Sidebar from "./components/Sidebar"

export default function Home() {
  const [currentItem, setCurrentItem] = useState(null)
  const [sidebarShowing, setSidebarShowing] = useState(false)

  const [events, setEvents] = useState([
    { id: 1, title: "foobar", day: 15, span: 10 },
    { id: 2, title: "test item", day: 5, span: 10 },
  ])

  const handleSaveEvent = (newEvent) => {
    if (currentItem) {
      // Editing existing event
      setEvents((prev) =>
        prev.map((e) => (e.id === currentItem.id ? { ...e, ...newEvent } : e)),
      )
    } else {
      // Creating new event
      const newId = events.length ? Math.max(...events.map((e) => e.id)) + 1 : 1
      setEvents((prev) => [...prev, { ...newEvent, id: newId }])
    }

    // Clear current item after saving
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
    <div className="flex flex-row h-full min-h-screen">
      {/* Chart */}
      <div className="body grow">
        <MonthChart
          events={events}
          numMonths={1}
          setCurrentItem={handleEventClick}
        />
        {/* Add Button */}
        <div
          id="addbtn"
          className="absolute bottom-0 right-0 w-9 h-9 bg-cell-light rounded-full m-5 flex items-center justify-center cursor-pointer"
          onClick={() => {
            setCurrentItem(null) // Create mode
            setSidebarShowing(true)
          }}
        >
          +
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        item={currentItem}
        sidebarShowing={sidebarShowing}
        setSidebarShowing={setSidebarShowing}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  )
}
