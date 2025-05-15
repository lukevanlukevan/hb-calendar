import MonthChart from "./components/MonthChart"
import Sidebar from "./components/Sidebar"
export default function Home() {
  return (
    <div className="flex flex-row h-full min-h-screen">
      <div className="body grow">
        <MonthChart />
      </div>
      <Sidebar />
    </div>
  )
}
