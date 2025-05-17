export function generateMonthDays(year, month) {
  const days = []

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  const startDay = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  // Fill in days from previous month
  const prevMonthLastDate = new Date(year, month, 0).getDate()
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDate - i),
      inMonth: false,
    })
  }

  // Fill in days for current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      inMonth: true,
    })
  }

  // Fill in next month days to complete the grid
  const totalCells = Math.ceil(days.length / 7) * 7
  const nextDays = totalCells - days.length
  for (let i = 1; i <= nextDays; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      inMonth: false,
    })
  }

  return days
}
