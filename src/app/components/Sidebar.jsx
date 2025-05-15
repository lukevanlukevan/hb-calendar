"use client"
import { useState } from "react"
function Sidebar() {
  const [sidebarShowing, setSidebarShowing] = useState(true)
  return (
    <div className={`${sidebarShowing && "min-w-1/4"} max-w-1/2 flex flex-row`}>
      <div
        id="buttonholder"
        className="p-2 border border-r-0 h-fit rounded-l-md bg-gray-900"
        onClick={() => setSidebarShowing(!sidebarShowing)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          {!sidebarShowing ? (
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          ) : (
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          )}
        </svg>
      </div>
      <div
        id="button"
        className={`bg-gray-900 w-full h-full ${!sidebarShowing && "hidden"}`}
      ></div>
    </div>
  )
}

export default Sidebar
