export interface Habit {
    id: string
    name: string
    icon: string
    category: 'health' | 'dev' | 'mindset' | 'custom'
    color: string
    createdAt: string
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