# 🌿 HabitFlow — Developer Habit Tracker

A soft blue/beige habit tracker built for developers. Vue 3 + Vite + TypeScript + Supabase (Auth + PostgreSQL).

## Features
- ✅ Add / edit / delete habits (preset + custom)
- 📅 Choose weekdays for each habit
- 🗓️ Monthly progress calendar with habit filters and daily details
- 🔥 Streak counter with best streak tracking
- 🏅 8 badges to unlock
- 📊 Dashboard with weekly chart and per-habit stats
- ⏰ Browser notification reminders while the app is open
- 🔐 Email sign-up, sign-in and sign-out
- 💾 Habits and progress saved in Supabase for each user
- 📱 Responsive layouts for mobile and desktop

## Setup

```bash
# 1. Clone the project
git clone https://github.com/nouhaerr/habit-tracker.git
cd habit-tracker
npm install

# 2. Create your local environment file
cp .env.example .env.local
```

Create a project in [Supabase](https://supabase.com/dashboard), then:

1. Run the SQL files in `supabase/migrations/` in order, once each, in **SQL Editor**. For an existing installation, run only the new `202610150002_habit_schedules.sql` migration.
2. Copy the **Project URL** and **Publishable key** from **Connect** into `.env.local`:

   ```dotenv
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-public-publishable-key
   ```

3. In **Authentication → URL Configuration**, allow `http://localhost:5173` for local development.
4. Start the app, create an account and confirm your email if confirmation is enabled:

   ```bash
   npm run dev
   ```

Restart Vite after changing environment variables. Use only the public publishable key; keep database passwords and secret keys out of the frontend. Local `.env` files are ignored by Git.

Each user can access only their own habits through database row-level security. Existing LocalStorage history is preserved in the browser but is not automatically imported into an account.

## Deploy on Vercel

- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in **Project Settings → Environment Variables** for **Production**, then deploy or redeploy.
- In Supabase, set **Site URL** to your production HTTPS URL and add it to **Redirect URLs**. Keep the localhost redirect for development.
- Vercel hosts the site; Supabase stores the data. Using the same Supabase project lets you access the same account and habits across devices.
- `vercel.json` supports refreshing `/dashboard` and `/badges` directly.

Schedule changes take effect from today. Previous schedules and completion history are retained for calendar statistics. Streaks count consecutive scheduled completions; rest days do not break them. The calendar is read-only and excludes future days from its monthly completion rate.

## Checks

```bash
npm run typecheck
npm test
npm run build
```

Tests require Node 22.6 or newer. To verify database access rules, run `supabase/tests/isolation.sql` in Supabase SQL Editor after the migration; its test data is rolled back.

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
    index.ts                     → Vue Router (4 routes)
  composables/
    useHabits.ts                 → Habit logic + Supabase storage
    useAuth.ts                   → Session + sign-out
    useBadges.ts                 → Badge definitions + checks
  lib/
    supabase.ts                  → Supabase client
    habitDates.ts                → Local dates + streak calculation
  components/
    AuthPanel.vue                → Sign-up + sign-in
    HabitCard.vue                → Single habit row
    AddHabitModal.vue            → Add / edit habit + weekday selection
    ReminderModal.vue            → Set reminder time
  views/
    TodayView.vue                → Today's habits + progress
    CalendarView.vue             → Monthly calendar + daily details
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
