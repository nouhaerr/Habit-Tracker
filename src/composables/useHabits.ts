import { ref, computed, watch } from 'vue'
import type { Habit } from '../types'
import { supabase } from '../lib/supabase'
import { localDate, streaks } from '../lib/habitDates'
import { useAuth } from './useAuth'

interface HabitRow {
  id: string; user_id: string; name: string; icon: string; category: Habit['category'];
  color: string; created_at: string; completed_dates: string[];
  reminder: string | null; reminder_enabled: boolean
}
function fromRow(row: HabitRow): Habit {
  return {
    id: row.id, name: row.name, icon: row.icon, category: row.category, color: row.color,
    createdAt: row.created_at, completedDates: row.completed_dates,
    reminder: row.reminder?.slice(0, 5), reminderEnabled: row.reminder_enabled,
    ...streaks(row.completed_dates)
  }
}
const habits = ref<Habit[]>([])
const loading = ref(false)
const loaded = ref(false)
const saving = ref(false)
const error = ref('')
const today = ref(localDate())
const { session } = useAuth()
let generation = 0

async function loadHabits() {
  const userId = session.value?.user.id
  if (!supabase || !userId) return
  const request = ++generation
  loading.value = true
  error.value = ''
  try {
    const result = await supabase.from('habits').select('*').eq('user_id', userId).order('inserted_at')
    if (request !== generation) return
    if (result.error) throw result.error
    habits.value = (result.data as HabitRow[]).map(fromRow)
    loaded.value = true
  } catch {
    if (request === generation) error.value = 'Could not load your habits. Check your connection and try again.'
  } finally {
    if (request === generation) loading.value = false
  }
}
watch(() => session.value?.user.id, () => {
  generation++
  habits.value = []
  loaded.value = false
  loading.value = false
  saving.value = false
  error.value = ''
  if (session.value) void loadHabits()
}, { immediate: true })

async function mutate(action: (userId: string, request: number) => Promise<void>) {
  const userId = session.value?.user.id
  if (!supabase || !userId || saving.value || loading.value || !loaded.value) return false
  const request = generation
  saving.value = true
  error.value = ''
  try {
    await action(userId, request)
    return request === generation
  } catch {
    if (request === generation) error.value = 'Your change could not be saved. Check your connection and try again.'
    return false
  } finally {
    if (request === generation) saving.value = false
  }
}

function replaceRow(row: HabitRow, userId: string, request: number) {
  if (session.value?.user.id !== userId || request !== generation) return
  const index = habits.value.findIndex(h => h.id === row.id)
  if (index >= 0) habits.value[index] = fromRow(row)
}

// One reminder timer for the whole app, rather than one per mounted view.
setInterval(() => {
  today.value = localDate()
  habits.value = habits.value.map(h => ({ ...h, ...streaks(h.completedDates) }))
  if (!session.value || !('Notification' in window) || Notification.permission !== 'granted') return
  const now = new Date()
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  habits.value.forEach(h => {
    if (h.reminderEnabled && h.reminder === time && !h.completedDates.includes(today.value)) {
      new Notification('HabitFlow 🌿', { body: `Don't forget: ${h.icon} ${h.name}` })
    }
  })
}, 60000)
window.addEventListener('focus', () => {
  today.value = localDate()
  if (session.value && !saving.value && !loading.value) void loadHabits()
})

export function useHabits() {
  const todayHabits = computed(() => habits.value.map(h => ({ ...h, completedToday: h.completedDates.includes(today.value) })))
  const completedToday = computed(() => todayHabits.value.filter(h => h.completedToday).length)
  const totalToday = computed(() => habits.value.length)
  const completionRate = computed(() => totalToday.value ? Math.round(completedToday.value / totalToday.value * 100) : 0)
  const longestStreak = computed(() => habits.value.reduce((max, h) => Math.max(max, h.bestStreak), 0))
  const weeklyStats = computed(() => {
    // Depend on today's date so this refreshes after midnight.
    const current = today.value
    return Array.from({ length: 7 }, (_, index) => {
      const d = new Date(`${current}T12:00:00`)
      d.setDate(d.getDate() - (6 - index))
      const date = localDate(d)
      const completed = habits.value.filter(h => h.completedDates.includes(date)).length
      return { date, label: d.toLocaleDateString('en', { weekday: 'short' }), rate: totalToday.value ? Math.round(completed / totalToday.value * 100) : 0 }
    })
  })

  function toggleHabit(id: string) {
    return mutate(async (userId, request) => {
      const { data, error } = await supabase!.rpc('toggle_habit', { habit_id: id, completion_date: localDate() }).single()
      if (error || !data) throw error ?? new Error('Habit not found')
      replaceRow(data as HabitRow, userId, request)
    })
  }
  function addHabit(input: { name: string; icon: string; category: Habit['category']; color: string; reminder?: string; reminderEnabled: boolean }) {
    return mutate(async (userId, request) => {
      const { data, error } = await supabase!.from('habits').insert({
        user_id: userId, name: input.name.trim(), icon: input.icon, category: input.category,
        color: input.color, created_at: localDate(), reminder: input.reminder || null, reminder_enabled: input.reminderEnabled
      }).select().single()
      if (error) throw error
      if (session.value?.user.id === userId && request === generation) habits.value.push(fromRow(data as HabitRow))
    })
  }
  function deleteHabit(id: string) {
    return mutate(async (userId, request) => {
      const { data, error } = await supabase!.from('habits').delete().eq('id', id).eq('user_id', userId).select('id').single()
      if (error || !data) throw error ?? new Error('Habit not found')
      if (session.value?.user.id === userId && request === generation) habits.value = habits.value.filter(h => h.id !== id)
    })
  }
  function updateReminder(id: string, time: string, enabled: boolean) {
    if (enabled && 'Notification' in window) void Notification.requestPermission()
    return mutate(async (userId, request) => {
      const { data, error } = await supabase!.from('habits').update({ reminder: time || null, reminder_enabled: enabled })
        .eq('id', id).eq('user_id', userId).select().single()
      if (error) throw error
      replaceRow(data as HabitRow, userId, request)
    })
  }
  return { habits, todayHabits, completedToday, totalToday, completionRate, longestStreak, weeklyStats,
    loading, loaded, saving, error, loadHabits, toggleHabit, addHabit, deleteHabit, updateReminder }
}
