"use client"
import { useState, useEffect } from "react"
import MonthChart from "@/app/components/MonthChart"
import Sidebar from "@/app/components/Sidebar"
import { fetchCalendarItems } from "@/lib/api" // Update path if needed

export default function Home() {
  const [currentItem, setCurrentItem] = useState(null)
  const [sidebarShowing, setSidebarShowing] = useState(false)
  const [events, setEvents] = useState([])

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
    <div className="flex flex-row h-full min-h-screen">
      <div className="body grow">
        <MonthChart
          events={events}
          numMonths={2}
          setCurrentItem={handleEventClick}
        />
        <div
          id="addbtn"
          className="absolute bottom-0 right-0 w-9 h-9 bg-cell-light rounded-full m-5 flex items-center justify-center cursor-pointer"
          onClick={() => {
            setCurrentItem(null)
            setSidebarShowing(true)
          }}
        >
          +
        </div>
      </div>

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
