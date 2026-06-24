# 🌿 HabitFlow — Developer Habit Tracker

A soft blue/beige habit tracker built for developers. Vue 3 + Vite + TypeScript + LocalStorage.

## Features
- ✅ Add / delete habits (preset + custom)
- 🔥 Streak counter with best streak tracking
- 🏅 8 badges to unlock
- 📊 Dashboard with weekly chart and per-habit stats
- ⏰ Browser notifications reminders
- 💾 All data saved in LocalStorage — no backend needed

## Setup

```bash
# 1. Create Vite project
npm create vite@latest habit-tracker -- --template vue-ts
cd habit-tracker
npm install

# 2. Copy all files from this folder into the project

# 3. Run
npm run dev
```

## File structure
```
src/
  App.vue                        → Layout + sidebar + mobile nav
  main.ts                        → Entry point
  style.css                      → Global blue/beige theme
  vite-env.d.ts
  types/
    index.ts                     → Habit, Badge, DailyStats types
  router/
    index.ts                     → Vue Router (3 routes)
  composables/
    useHabits.ts                 → All habit logic + localStorage
    useBadges.ts                 → Badge definitions + checks
  components/
    HabitCard.vue                → Single habit row
    AddHabitModal.vue            → Add habit (preset + custom)
    ReminderModal.vue            → Set reminder time
  views/
    TodayView.vue                → Today's habits + progress
    DashboardView.vue            → Stats + weekly chart
    BadgesView.vue               → All badges
```

## How to add a new badge
In `useBadges.ts`, add to the `BADGES` array:
```typescript
{
  id: 'my_badge',
  name: 'My Badge',
  description: 'Do something 5 times',
  icon: '🎯',
  check: (habits) => habits.some(h => h.completedDates.length >= 5)
}
```