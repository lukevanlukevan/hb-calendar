"use client"
import { useEffect, useState } from "react"
import MonthChart from "./components/MonthChart"
import Sidebar from "./components/Sidebar"
export default function Home() {
  const [currentItem, setCurrentItem] = useState()
  const [sidebarShowing, setSidebarShowing] = useState(false)

  useEffect(() => {
    setSidebar(currentItem)
  }, [currentItem])

  const setSidebar = (item) => {}

  return (
    <div className="flex flex-row h-full min-h-screen">
      <div className="body grow">
        <MonthChart numMonths={1} setCurrentItem={setCurrentItem} />
      </div>
      <Sidebar
        item={setCurrentItem}
        sidebarShowing={sidebarShowing}
        setSidebarShowing={setSidebarShowing}
      />
    </div>
  )
}
