import { useState, useEffect } from "react"
import {
  createCalendarItem,
  updateCalendarItem,
  deleteCalendarItem,
} from "@/lib/api"

export default function Sidebar({
  item,
  sidebarShowing,
  setSidebarShowing,
  onSave,
  onDelete,
}) {
  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    end_date: "",
  })

  useEffect(() => {
    if (item) {
      const start = item.startDate ? new Date(item.startDate) : null
      const end = item.endDate ? new Date(item.endDate) : null

      setFormData({
        title: item.title || "",
        start_date: item.startDate?.slice(0, 10) || "",
        end_date: item.endDate?.slice(0, 10) || "",
      })
    } else {
      setFormData({
        title: "",
        start_date: "",
        end_date: "",
      })
    }
  }, [item])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { title, start_date, end_date } = formData

    if (!title || !start_date || !end_date) return

    const start = new Date(start_date)
    const end = new Date(end_date)
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return

    const span = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)))

    const payload = {
      title,
      tag: "default",
      start_date,
      end_date,
    }

    try {
      let savedItem
      if (item?.id) {
        // UPDATE logic
        savedItem = await updateCalendarItem(item.id, payload)
      } else {
        // CREATE logic
        savedItem = await createCalendarItem(payload)
      }

      onSave({
        ...savedItem,
        day: start.getDate(),
        span,
      })
      setSidebarShowing(false)
    } catch (err) {
      console.error("Error saving item:", err)
    }
  }

  const handleDelete = async () => {
    if (!item) return
    try {
      await deleteCalendarItem(item.id)
      onDelete(item.id)
      setSidebarShowing(false)
    } catch (err) {
      console.error("Error deleting item:", err)
    }
  }

  return (
    <div className={`${sidebarShowing && "min-w-1/4"} max-w-1/2 flex flex-row`}>
      <div
        id="buttonholder"
        className="p-2 h-fit rounded-l-md bg-cell-dark cursor-pointer"
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
        className={`bg-cell-dark w-full h-full p-4 ${
          !sidebarShowing && "hidden"
        }`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">
            {item ? "Edit Event" : "New Event"}
          </h2>

          <label>
            Title:
            <input
              className="w-full text-black px-2 py-1 rounded"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Start Date:
            <input
              className="w-full text-black px-2 py-1 rounded"
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            End Date:
            <input
              className="w-full text-black px-2 py-1 rounded"
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
            />
          </label>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              {item ? "Update" : "Create"}
            </button>

            {item && (
              <button
                type="button"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
