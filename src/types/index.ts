export interface Habit {
    id: string
    name: string
    icon: string
    category: 'health' | 'dev' | 'mindset' | 'custom'
    color: string
    createdAt: string
    scheduledDays: number[] // Sunday = 0, Monday = 1, ... Saturday = 6
    scheduleHistory: { from: string; days: number[] }[]
    completedDates: string[] // 'YYYY-MM-DD'
    streak: number
    bestStreak: number
    reminder?: string // HH:MM
    reminderEnabled: boolean
  }
  
  export interface Badge {
    id: string
    name: string
    description: string
    icon: string
    condition: (habit: Habit) => boolean
    earned: boolean
  }
  
  export interface DailyStats {
    date: string
    completed: number
    total: number
  }
export type HabitInput = Pick<Habit, 'name' | 'icon' | 'category' | 'color' | 'scheduledDays'>
