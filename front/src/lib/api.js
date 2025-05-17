const API_BASE = "http://localhost:8000/calendar/"

export async function fetchCalendarItems() {
  const res = await fetch(API_BASE)
  if (!res.ok) throw new Error("Failed to fetch items")
  return res.json()
}

export async function createCalendarItem(data) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create item")
  return res.json()
}

export async function deleteCalendarItem(id) {
  const res = await fetch(`${API_BASE}${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete item")
  return res.json()
}
