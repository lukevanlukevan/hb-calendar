import { useState, useEffect } from "react"
export default function Sidebar({
  item,
  sidebarShowing,
  setSidebarShowing,
  onSave,
  onDelete,
}) {
  const [formData, setFormData] = useState({ title: "", day: "", span: "" })

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        day: item.day || "",
        span: item.span || "",
      })
    } else {
      setFormData({ title: "", day: "", span: "" })
    }
  }, [item])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.day || !formData.span) return

    const newEvent = {
      ...formData,
      day: parseInt(formData.day, 10),
      span: parseInt(formData.span, 10),
    }

    onSave(newEvent)
    setSidebarShowing(false)
  }

  const handleDelete = () => {
    if (item && onDelete) {
      onDelete(item.id)
      setSidebarShowing(false)
    }
  }

  return (
    <div className={`${sidebarShowing && "min-w-1/4"} max-w-1/2 flex flex-row`}>
      <div
        id="buttonholder"
        className="p-2 border border-r-0 h-fit rounded-l-md bg-cell-dark"
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
        className={`bg-cell-dark w-full h-full p-4 text-white ${
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
            />
          </label>

          <label>
            Day:
            <input
              className="w-full text-black px-2 py-1 rounded"
              type="number"
              name="day"
              value={formData.day}
              onChange={handleChange}
            />
          </label>

          <label>
            Span:
            <input
              className="w-full text-black px-2 py-1 rounded"
              type="number"
              name="span"
              value={formData.span}
              onChange={handleChange}
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
