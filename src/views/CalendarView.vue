<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useHabits } from '../composables/useHabits'
import { localDate } from '../lib/habitDates'
import { dayProgress, monthDays, scheduledOn, WEEKDAYS } from '../lib/habitSchedule'

const { habits, today } = useHabits()
const visibleMonth = ref(new Date(`${today.value.slice(0, 7)}-01T12:00:00`))
const selectedDate = ref(today.value)
const filter = ref('')
const filteredHabits = computed(() => filter.value ? habits.value.filter(h => h.id === filter.value) : habits.value)
watch(habits, () => { if (filter.value && !habits.value.some(h => h.id === filter.value)) filter.value = '' })
const monthLabel = computed(() => visibleMonth.value.toLocaleDateString('en', { month: 'long', year: 'numeric' }))
const cells = computed(() => monthDays(visibleMonth.value.getFullYear(), visibleMonth.value.getMonth()).map(date => {
  const stats = date ? dayProgress(filteredHabits.value, date) : { total: 0, completed: 0, rate: 0 }
  return { date, ...stats, future: !!date && date > today.value }
}))
const summary = computed(() => {
  const elapsed = cells.value.filter(cell => cell.date && !cell.future)
  const completed = elapsed.reduce((sum, cell) => sum + cell.completed, 0)
  const total = elapsed.reduce((sum, cell) => sum + cell.total, 0)
  return { completed, total, rate: total ? Math.round(completed / total * 100) : 0 }
})
const selectedLabel = computed(() => new Date(`${selectedDate.value}T12:00:00`).toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }))
const details = computed(() => filteredHabits.value.filter(h => scheduledOn(h, selectedDate.value) || h.completedDates.includes(selectedDate.value)))
function moveMonth(offset: number) {
  const next = new Date(visibleMonth.value.getFullYear(), visibleMonth.value.getMonth() + offset, 1, 12)
  visibleMonth.value = next
  selectedDate.value = localDate(next)
}
function goToday() {
  visibleMonth.value = new Date(`${today.value.slice(0, 7)}-01T12:00:00`)
  selectedDate.value = today.value
}
function cellLabel(cell: typeof cells.value[number]) {
  if (!cell.date) return ''
  const date = new Date(`${cell.date}T12:00:00`).toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' })
  return `${date}: ${cell.future ? `${cell.total} planned` : `${cell.completed} of ${cell.total} completed`}`
}
</script>

<template>
  <div class="calendar-page">
    <header class="page-header">
      <h1>Progress Calendar</h1>
      <p>Your habits, one day at a time. Select a day to see the details.</p>
    </header>
    <div class="calendar-layout">
      <section class="calendar-card" aria-label="Monthly habit progress">
        <div class="toolbar">
          <div class="month-controls">
            <button aria-label="Previous month" @click="moveMonth(-1)">‹</button>
            <h2 aria-live="polite">{{ monthLabel }}</h2>
            <button aria-label="Next month" @click="moveMonth(1)">›</button>
          </div>
          <button @click="goToday">Today</button>
        </div>
        <label class="filter" for="habit-filter">Filter by habit
          <select id="habit-filter" v-model="filter">
            <option value="">All habits</option>
            <option v-for="habit in habits" :key="habit.id" :value="habit.id">{{ habit.icon }} {{ habit.name }}</option>
          </select>
        </label>
        <div class="weekdays" aria-hidden="true"><span v-for="day in WEEKDAYS" :key="day.value">{{ day.label }}</span></div>
        <div class="days">
          <template v-for="(cell, index) in cells" :key="cell.date ?? `blank-${index}`">
            <button v-if="cell.date" class="day" :class="{
              selected: cell.date === selectedDate, today: cell.date === today, future: cell.future,
              full: !cell.future && cell.total > 0 && cell.rate === 100,
              partial: !cell.future && cell.completed > 0 && cell.rate < 100,
              empty: !cell.future && cell.total === 0
            }" :aria-label="cellLabel(cell)" :aria-pressed="cell.date === selectedDate" :aria-current="cell.date === today ? 'date' : undefined" @click="selectedDate = cell.date">
              <span>{{ Number(cell.date.slice(-2)) }}</span>
              <small v-if="!cell.future && cell.total">{{ cell.completed }}/{{ cell.total }}</small>
              <small v-else-if="cell.future && cell.total" aria-hidden="true">·</small>
            </button>
            <span v-else aria-hidden="true" />
          </template>
        </div>
        <div class="legend"><span><i class="swatch full" />Complete</span><span><i class="swatch partial" />Some completed</span><span><i class="swatch empty" />Rest day</span></div>
        <p class="month-summary">{{ summary.completed }} / {{ summary.total }} scheduled completions · {{ summary.rate }}%<br><small>Future days are excluded from this month's summary.</small></p>
      </section>
      <section class="details-card" aria-live="polite">
        <h2>{{ selectedLabel }}</h2>
        <p v-if="!details.length" class="empty-state">No habits scheduled for this day.</p>
        <ul v-else>
          <li v-for="habit in details" :key="habit.id">
            <span class="habit-icon" :style="{ background: habit.color + '22' }">{{ habit.icon }}</span>
            <div><p class="habit-name">{{ habit.name }}</p><p class="status" :class="{ done: habit.completedDates.includes(selectedDate) }">{{ habit.completedDates.includes(selectedDate) ? '✓ Completed' : selectedDate > today ? 'Upcoming' : selectedDate === today ? 'To do today' : 'Not completed' }}</p></div>
          </li>
        </ul>
        <RouterLink v-if="selectedDate === today" to="/" class="today-link">Go to today's habits →</RouterLink>
        <p class="note">Schedules are recorded from the day they change. Rest days do not break your streak.</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.calendar-page { width: 100%; max-width: 1120px; margin-inline: auto; }
.page-header { margin-bottom: 1.5rem; }
h1 { font-family: 'Poppins', sans-serif; font-size: clamp(1.3rem, 3vw, 1.6rem); }
.page-header p, .note { color: var(--text-secondary); font-size: 0.85rem; }
.calendar-layout { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); gap: 1.25rem; align-items: start; }
.calendar-card, .details-card { min-width: 0; background: var(--white); padding: 1.25rem; border: 1px solid var(--beige-200); border-radius: var(--radius); box-shadow: var(--shadow-sm); }
.toolbar, .month-controls { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.toolbar { flex-wrap: wrap; margin-bottom: 1rem; }
h2 { font-size: 1rem; }
.toolbar button { min-height: 44px; min-width: 44px; padding: 0.4rem 0.65rem; background: var(--beige-50); border: 1px solid var(--beige-200); border-radius: var(--radius-sm); color: var(--text-primary); font-size: 1rem; }
.filter { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.25rem; font-size: 0.8rem; font-weight: 600; }
select { width: 100%; padding: 0.7rem; font-size: 16px; border: 1px solid var(--beige-300); border-radius: var(--radius-sm); background: white; }
.weekdays, .days { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 5px; }
.weekdays { text-align: center; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.5rem; }
.day { min-width: 0; min-height: 64px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; border: 1px solid var(--beige-200); border-radius: var(--radius-sm); background: var(--beige-50); color: var(--text-primary); font-size: 0.9rem; }
.day small { font-size: 0.65rem; }
.full { background: var(--blue-600); color: white; }
.partial { background: var(--blue-100); color: var(--blue-700); }
.empty { background: var(--beige-100); }
.day.future { color: var(--text-muted); border-style: dashed; }
.day.today > span { font-weight: 800; text-decoration: underline; text-underline-offset: 3px; }
.day.selected { outline: 2px solid var(--blue-700); outline-offset: 1px; }
.legend { display: flex; gap: 0.5rem 1rem; flex-wrap: wrap; margin-top: 1rem; font-size: 0.75rem; color: var(--text-secondary); }
.legend span { display: flex; align-items: center; gap: 5px; }
.swatch { width: 12px; height: 12px; border-radius: 3px; }
.month-summary { border-top: 1px solid var(--beige-200); margin-top: 1rem; padding-top: 1rem; font-size: 0.85rem; }
.month-summary small { color: var(--text-secondary); }
.details-card ul { list-style: none; display: flex; flex-direction: column; gap: 1rem; margin: 1.25rem 0; }
.details-card li { display: flex; align-items: center; gap: 0.75rem; }
.details-card li > div { min-width: 0; }
.habit-icon { width: 42px; height: 42px; flex-shrink: 0; border-radius: var(--radius-sm); display: grid; place-items: center; font-size: 1.25rem; }
.habit-name { font-weight: 600; font-size: 0.88rem; overflow-wrap: anywhere; }
.status { font-size: 0.78rem; color: var(--text-secondary); }
.status.done { color: var(--blue-600); }
.empty-state { margin: 1rem 0; color: var(--text-secondary); }
.today-link { color: var(--blue-600); display: inline-block; padding-block: 0.75rem; }
.note { margin-top: 1rem; }
@media (max-width: 1100px) { .calendar-layout { grid-template-columns: minmax(0, 1fr); } }
@media (max-width: 480px) { .calendar-card, .details-card { padding: 0.85rem; } .day { min-height: 48px; } .weekdays, .days { gap: 4px; } .weekdays { font-size: 0.65rem; } }
</style>
