export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function streaks(dates: string[], today = localDate()) {
  const sorted = [...new Set(dates)].sort()
  let bestStreak = 0
  let run = 0
  let previous = -Infinity
  for (const date of sorted) {
    const day = Date.parse(date) / 86400000
    run = day === previous + 1 ? run + 1 : 1
    bestStreak = Math.max(bestStreak, run)
    previous = day
  }
  const last = sorted[sorted.length - 1]
  const age = last ? (Date.parse(today) - Date.parse(last)) / 86400000 : Infinity
  return { streak: age === 0 || age === 1 ? run : 0, bestStreak }
}
