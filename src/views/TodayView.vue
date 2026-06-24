<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHabits } from '../composables/useHabits'
import HabitCard from '../components/HabitCard.vue'
import AddHabitModal from '../components/AddHabitModal.vue'
import ReminderModal from '../components/ReminderModal.vue'
import type { Habit } from '../types'

const { todayHabits, completedToday, totalToday, completionRate, toggleHabit, addHabit, deleteHabit, updateReminder, habits } = useHabits()

const showAddModal = ref(false)
const reminderHabitId = ref<string | null>(null)

const reminderHabit = computed(() =>
  reminderHabitId.value ? habits.value.find(h => h.id === reminderHabitId.value) ?? null : null
)

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return '☀️ Good morning'
  if (h < 18) return '🌤️ Good afternoon'
  return '🌙 Good evening'
})

const dateLabel = computed(() =>
  new Date().toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' })
)

function handleAdd(data: Parameters<typeof addHabit>[0]) {
  addHabit(data)
  showAddModal.value = false
}

function handleReminder(time: string, enabled: boolean) {
  if (reminderHabitId.value) {
    updateReminder(reminderHabitId.value, time, enabled)
  }
  reminderHabitId.value = null
}
</script>

<template>
  <div class="today">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="greeting">{{ greeting }}, Dev! 👋</h1>
        <p class="date">{{ dateLabel }}</p>
      </div>
      <button class="add-btn" @click="showAddModal = true">+ Add Habit</button>
    </div>

    <!-- Progress bar -->
    <div class="progress-card">
      <div class="progress-info">
        <span class="progress-label">Today's progress</span>
        <span class="progress-count">{{ completedToday }} / {{ totalToday }} habits</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: completionRate + '%' }" />
      </div>
      <p class="progress-msg" v-if="completionRate === 100">🎉 Perfect day! You're unstoppable!</p>
      <p class="progress-msg" v-else-if="completionRate >= 50">💪 Great momentum, keep going!</p>
      <p class="progress-msg" v-else-if="completionRate > 0">🌱 Good start, you've got this!</p>
      <p class="progress-msg" v-else>🎯 Let's start building great habits!</p>
    </div>

    <!-- Habit list -->
    <div class="habits-section">
      <div class="section-header">
        <h2>Your Habits</h2>
        <span class="badge">{{ totalToday }}</span>
      </div>

      <TransitionGroup name="slide-up" tag="div" class="habits-list">
        <HabitCard
          v-for="habit in todayHabits"
          :key="habit.id"
          :habit="habit"
          @toggle="toggleHabit"
          @delete="deleteHabit"
          @reminder="reminderHabitId = $event"
        />
      </TransitionGroup>

      <div class="empty" v-if="totalToday === 0">
        <p>🌱</p>
        <p>No habits yet. Add your first one!</p>
        <button class="add-btn" @click="showAddModal = true">+ Add Habit</button>
      </div>
    </div>

    <!-- Modals -->
    <Transition name="scale">
      <AddHabitModal v-if="showAddModal" @add="handleAdd" @close="showAddModal = false" />
    </Transition>

    <Transition name="scale">
      <ReminderModal
        v-if="reminderHabit"
        :habit="reminderHabit"
        @save="handleReminder"
        @close="reminderHabitId = null"
      />
    </Transition>
  </div>
</template>

<style scoped>
.today { max-width: 680px; }

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.greeting {
  font-family: 'Poppins', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
}

.date { font-size: 0.88rem; color: var(--text-muted); margin-top: 2px; }

.add-btn {
  padding: 0.6rem 1.2rem;
  background: var(--blue-500);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s;
  white-space: nowrap;
}

.add-btn:hover {
  background: var(--blue-600);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.progress-card {
  background: var(--white);
  border: 1px solid var(--beige-200);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.progress-label { font-size: 0.88rem; font-weight: 600; color: var(--text-secondary); }
.progress-count { font-size: 0.88rem; font-weight: 700; color: var(--blue-600); }

.progress-bar {
  height: 10px;
  background: var(--beige-200);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--blue-400), var(--blue-600));
  border-radius: var(--radius-full);
  transition: width 0.5s ease;
}

.progress-msg { font-size: 0.82rem; color: var(--text-muted); }

.habits-section { display: flex; flex-direction: column; gap: 1rem; }

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-header h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
}

.badge {
  background: var(--blue-100);
  color: var(--blue-600);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: var(--radius-full);
}

.habits-list { display: flex; flex-direction: column; gap: 10px; }

.empty {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.empty p:first-child { font-size: 2.5rem; }
</style>