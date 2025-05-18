export function generateMonthDays(year, month, monthRange) {
  const startDate = new Date(year, month, 1)
  const endDate = new Date(year, month + monthRange, 0) // ✅ last day of last month

  const days = []

  // Go to the previous Sunday
  const start = new Date(startDate)
  start.setDate(start.getDate() - start.getDay())

  // Go to the next Saturday
  const end = new Date(endDate)
  end.setDate(end.getDate() + (6 - end.getDay()))

  const current = new Date(start)
  while (current <= end) {
    const inMonth = current >= startDate && current <= endDate

    days.push({
      date: new Date(current),
      inMonth,
    })

    current.setDate(current.getDate() + 1)
  }

  // console.log(days)

  return days
}
