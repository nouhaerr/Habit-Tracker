<script setup lang="ts">
import type { Habit } from '../types'

const props = defineProps<{
  habit: Habit & { completedToday: boolean }
}>()

const emit = defineEmits<{
  toggle: [id: string]
  delete: [id: string]
  reminder: [id: string]
}>()
</script>

<template>
  <div class="card" :class="{ completed: habit.completedToday }">
    <!-- Left: icon + info -->
    <div class="card-left">
      <div class="icon-wrap" :style="{ background: habit.color + '22', borderColor: habit.color + '44' }">
        <span class="icon">{{ habit.icon }}</span>
      </div>
      <div class="info">
        <p class="name" :class="{ done: habit.completedToday }">{{ habit.name }}</p>
        <div class="meta">
          <span class="streak" v-if="habit.streak > 0">
            🔥 {{ habit.streak }}d streak
          </span>
          <span class="category">{{ habit.category }}</span>
          <span class="reminder-badge" v-if="habit.reminderEnabled && habit.reminder">
            ⏰ {{ habit.reminder }}
          </span>
        </div>
      </div>
    </div>

    <!-- Right: actions -->
    <div class="card-right">
      <button class="btn-reminder" @click="emit('reminder', habit.id)" title="Set reminder">⏰</button>
      <button class="btn-delete" @click="emit('delete', habit.id)" title="Delete habit">🗑️</button>
      <button
        class="btn-check"
        :class="{ checked: habit.completedToday }"
        :style="{ borderColor: habit.color, background: habit.completedToday ? habit.color : 'transparent' }"
        @click="emit('toggle', habit.id)"
      >
        <span v-if="habit.completedToday">✓</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--white);
  border: 1px solid var(--beige-200);
  border-radius: var(--radius);
  padding: 1rem 1.2rem;
  gap: 1rem;
  transition: all 0.25s ease;
  box-shadow: var(--shadow-sm);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.card.completed {
  background: var(--blue-50);
  border-color: var(--blue-200);
}

.card-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.icon-wrap {
  width: 46px;
  height: 46px;
  border-radius: var(--radius-sm);
  border: 1.5px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon { font-size: 1.4rem; }

.info { min-width: 0; }

.name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.2s;
}

.name.done {
  text-decoration: line-through;
  color: var(--text-muted);
}

.meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 3px;
  flex-wrap: wrap;
}

.streak {
  font-size: 0.75rem;
  font-weight: 600;
  color: #F97316;
}

.category {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  background: var(--beige-100);
  color: var(--text-muted);
  text-transform: capitalize;
}

.reminder-badge {
  font-size: 0.7rem;
  color: var(--blue-500);
}

.card-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.btn-reminder, .btn-delete {
  background: none;
  border: none;
  font-size: 1rem;
  opacity: 0.4;
  transition: opacity 0.2s;
  padding: 4px;
  border-radius: 6px;
}

.btn-reminder:hover { opacity: 1; }
.btn-delete:hover { opacity: 1; }

.btn-check {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2.5px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  transition: all 0.2s ease;
}

.btn-check.checked {
  animation: pop 0.3s ease;
}

.btn-check:hover:not(.checked) {
  opacity: 0.7;
}
</style>