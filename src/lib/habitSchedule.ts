import type { Habit } from '../types/index.ts'
import { localDate } from './habitDates.ts'

export const EVERY_DAY = [0, 1, 2, 3, 4, 5, 6]
export const WEEKDAYS = [
  { value: 1, label: 'Mon' }, { value: 2, label: 'Tue' }, { value: 3, label: 'Wed' },
  { value: 4, label: 'Thu' }, { value: 5, label: 'Fri' }, { value: 6, label: 'Sat' }, { value: 0, label: 'Sun' }
]
type ScheduledHabit = Pick<Habit, 'createdAt' | 'scheduledDays' | 'scheduleHistory' | 'completedDates'>
export function scheduledOn(habit: ScheduledHabit, date: string): boolean {
  if (date < habit.createdAt) return false
  const version = [...habit.scheduleHistory].filter(v => v.from <= date).sort((a, b) => b.from.localeCompare(a.from))[0]
  const days = version?.days ?? habit.scheduledDays
  return days.includes(new Date(`${date}T12:00:00`).getDay())
}
export function dayProgress(habits: ScheduledHabit[], date: string) {
  const scheduled = habits.filter(h => scheduledOn(h, date))
  const completed = scheduled.filter(h => h.completedDates.includes(date)).length
  return { total: scheduled.length, completed, rate: scheduled.length ? Math.round(completed / scheduled.length * 100) : 0 }
}
export function scheduleLabel(days: number[]) {
  return days.length === 7 ? 'Every day' : WEEKDAYS.filter(d => days.includes(d.value)).map(d => d.label).join(' · ')
}
export function scheduledStreaks(habit: ScheduledHabit, today = localDate()) {
  const completed = new Set(habit.completedDates)
  let run = 0
  let bestStreak = 0
  const cursor = new Date(`${habit.createdAt}T12:00:00`)
  for (let date = localDate(cursor); date <= today; cursor.setDate(cursor.getDate() + 1), date = localDate(cursor)) {
    if (!scheduledOn(habit, date)) continue
    if (completed.has(date)) {
      run++
      bestStreak = Math.max(bestStreak, run)
    } else if (date < today) run = 0
  }
  return { streak: run, bestStreak }
}
export function monthDays(year: number, month: number): (string | null)[] {
  const first = new Date(year, month, 1, 12)
  const offset = (first.getDay() + 6) % 7
  const count = new Date(year, month + 1, 0, 12).getDate()
  const cells: (string | null)[] = Array(offset).fill(null)
  for (let day = 1; day <= count; day++) cells.push(localDate(new Date(year, month, day, 12)))
  while (cells.length % 7) cells.push(null)
  return cells
}
