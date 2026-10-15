<script setup lang="ts">
import { useHabits } from '../composables/useHabits'

const { habits, completedToday, totalToday, completionRate, longestStreak, weeklyStats } = useHabits()

const totalCompletions = () => habits.value.reduce((sum, h) => sum + h.completedDates.length, 0)
const avgStreak = () => {
  if (!habits.value.length) return 0
  return Math.round(habits.value.reduce((s, h) => s + h.streak, 0) / habits.value.length)
}
</script>

<template>
  <div class="dashboard">
    <div class="page-header">
      <h1>Dashboard</h1>
      <p>Your habit journey at a glance</p>
    </div>

    <!-- Stat cards -->
    <div class="stats-grid">
      <div class="stat-card blue">
        <div class="stat-icon">✅</div>
        <div class="stat-value">{{ completedToday }} / {{ totalToday }}</div>
        <div class="stat-label">Today's habits</div>
      </div>
      <div class="stat-card sage">
        <div class="stat-icon">🔥</div>
        <div class="stat-value">{{ longestStreak }}d</div>
        <div class="stat-label">Best streak</div>
      </div>
      <div class="stat-card lavender">
        <div class="stat-icon">⭐</div>
        <div class="stat-value">{{ totalCompletions() }}</div>
        <div class="stat-label">Total completions</div>
      </div>
      <div class="stat-card peach">
        <div class="stat-icon">📈</div>
        <div class="stat-value">{{ completionRate }}%</div>
        <div class="stat-label">Today's rate</div>
      </div>
    </div>

    <!-- Weekly chart -->
    <div class="chart-card">
      <h2>Weekly Overview</h2>
      <div class="chart">
        <div v-for="day in weeklyStats" :key="day.date" class="chart-col">
          <span class="chart-pct">{{ day.rate }}%</span>
          <div class="chart-bar-wrap">
            <div
              class="chart-bar"
              :style="{ height: day.rate + '%', background: day.rate === 100 ? 'var(--blue-500)' : day.rate >= 50 ? 'var(--blue-400)' : 'var(--blue-200)' }"
            />
          </div>
          <span class="chart-label">{{ day.label }}</span>
        </div>
      </div>
    </div>

    <!-- Per habit stats -->
    <div class="habits-stats">
      <h2>Per Habit Stats</h2>
      <div class="habit-stat-list">
        <div v-for="habit in habits" :key="habit.id" class="habit-stat-row">
          <span class="habit-icon">{{ habit.icon }}</span>
          <span class="habit-name">{{ habit.name }}</span>
          <div class="habit-bars">
            <div class="mini-bar-wrap">
              <div
                class="mini-bar"
                :style="{ width: Math.min(100, habit.completedDates.length * 5) + '%', background: habit.color }"
              />
            </div>
            <span class="habit-count">{{ habit.completedDates.length }}x</span>
          </div>
          <span class="habit-streak">🔥 {{ habit.streak }}d</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard { width: 100%; max-width: 1120px; margin-inline: auto; }

.page-header { margin-bottom: 1.5rem; }
.page-header h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
}
.page-header p { font-size: 0.88rem; color: var(--text-muted); }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: var(--white);
  border: 1px solid var(--beige-200);
  border-radius: var(--radius);
  padding: 1.25rem;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s;
}

.stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }

.stat-card.blue { border-top: 3px solid var(--blue-400); }
.stat-card.sage { border-top: 3px solid var(--sage); }
.stat-card.lavender { border-top: 3px solid var(--lavender); }
.stat-card.peach { border-top: 3px solid var(--peach); }

.stat-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
.stat-value { font-family: 'Poppins', sans-serif; font-size: 1.8rem; font-weight: 700; color: var(--text-primary); }
.stat-label { font-size: 0.8rem; color: var(--text-muted); margin-top: 2px; }

.chart-card {
  background: var(--white);
  border: 1px solid var(--beige-200);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.chart-card h2, .habits-stats h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.chart {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 140px;
}

.chart-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  height: 100%;
}

.chart-pct { font-size: 0.65rem; color: var(--text-muted); font-weight: 600; }

.chart-bar-wrap {
  flex: 1;
  width: 100%;
  background: var(--beige-100);
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.chart-bar {
  width: 100%;
  border-radius: 6px 6px 0 0;
  transition: height 0.5s ease;
  min-height: 4px;
}

.chart-label { font-size: 0.7rem; color: var(--text-muted); font-weight: 500; }

.habits-stats {
  background: var(--white);
  border: 1px solid var(--beige-200);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.habit-stat-list { display: flex; flex-direction: column; gap: 12px; }

.habit-stat-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.habit-icon { font-size: 1.1rem; flex-shrink: 0; }
.habit-name { flex: 1; font-size: 0.88rem; font-weight: 500; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.habit-bars { display: flex; align-items: center; gap: 8px; width: 140px; flex-shrink: 0; }

.mini-bar-wrap {
  flex: 1;
  height: 8px;
  background: var(--beige-200);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.mini-bar {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.5s ease;
  min-width: 4px;
}

.habit-count { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; white-space: nowrap; }
.habit-streak { font-size: 0.78rem; color: #F97316; font-weight: 600; white-space: nowrap; }

@media (max-width: 480px) {
  .stat-card { padding: 1rem 0.75rem; }
  .stat-value { font-size: clamp(1.25rem, 6vw, 1.8rem); }
  .chart-card, .habits-stats { padding: 1rem; }
  .chart { gap: 4px; }
  .habit-stat-row { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: 6px 10px; }
  .habit-name { white-space: normal; overflow-wrap: anywhere; }
  .habit-bars { grid-column: 2 / -1; grid-row: 2; width: 100%; min-width: 0; }
  .habit-streak { grid-column: 3; grid-row: 1; }
}

.stat-card, .chart-col { min-width: 0; }
.stat-value { overflow-wrap: anywhere; }
@media (min-width: 481px) and (max-width: 1100px) {
  .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 480px) {
  .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem; }
}

</style>