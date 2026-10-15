<script setup lang="ts">
import { ref } from 'vue'
import type { Habit, HabitInput } from '../types'
import { EVERY_DAY, WEEKDAYS } from '../lib/habitSchedule'

const props = defineProps<{ habit?: Habit; busy?: boolean; saveError?: string }>()

const emit = defineEmits<{
  add: [data: HabitInput]
  close: []
}>()

const PRESET_HABITS = [
  { name: 'Make a commit', icon: '💻', category: 'dev' as const },
  { name: 'Drink 8 glasses of water', icon: '💧', category: 'health' as const },
  { name: 'Take a break every 2h', icon: '🧘', category: 'mindset' as const },
  { name: 'Read 20 minutes', icon: '📚', category: 'dev' as const },
  { name: 'Exercise / walk', icon: '🏃', category: 'health' as const },
  { name: 'Meditate', icon: '🌸', category: 'mindset' as const },
  { name: 'Review pull requests', icon: '🔍', category: 'dev' as const },
  { name: 'Write in journal', icon: '✏️', category: 'mindset' as const },
  { name: 'Learn something new', icon: '🎯', category: 'dev' as const },
  { name: 'Sleep 8 hours', icon: '😴', category: 'health' as const },
]

const ICONS = ['💻','💧','🧘','📚','🏃','🌸','🔍','✏️','🎯','😴','🍎','☕','🎵','🌿','⚡','🦋','🌊','🏋️','🧠','💡']
const COLORS = ['#6B8CFF','#60C5F1','#A8D8B9','#B8A9E8','#F4A89A','#FFD07B','#FF9F9F','#98D8C8','#C5A3FF','#FFB347']

const tab = ref<'preset' | 'custom'>(props.habit ? 'custom' : 'preset')
const name = ref(props.habit?.name ?? '')
const icon = ref(props.habit?.icon ?? '💻')
const category = ref<Habit['category']>(props.habit?.category ?? 'dev')
const color = ref(props.habit?.color ?? '#6B8CFF')
const scheduledDays = ref([...(props.habit?.scheduledDays ?? EVERY_DAY)])
function toggleDay(day: number) {
  scheduledDays.value = scheduledDays.value.includes(day)
    ? scheduledDays.value.filter(d => d !== day) : [...scheduledDays.value, day].sort()
}

function selectPreset(p: typeof PRESET_HABITS[0]) {
  if (!scheduledDays.value.length) return
  emit('add', { name: p.name, icon: p.icon, category: p.category, color: color.value, scheduledDays: [...scheduledDays.value] })
}

function submitCustom() {
  if (!name.value.trim() || !scheduledDays.value.length) return
  emit('add', { name: name.value.trim(), icon: icon.value, category: category.value, color: color.value, scheduledDays: [...scheduledDays.value] })
}
</script>

<template>
  <Teleport to="body">
    <div class="overlay" @click.self="!busy && emit('close')">
      <div class="modal" :inert="busy" :aria-busy="busy">
        <div class="modal-header">
          <h2>{{ habit ? 'Edit Habit' : 'Add a Habit' }}</h2>
          <button class="close-btn" @click="emit('close')">✕</button>
        </div>

        <p v-if="saveError" class="save-error" role="alert">{{ saveError }}</p>

        <!-- Tabs -->
        <div v-if="!habit" class="tabs">
          <button :class="{ active: tab === 'preset' }" @click="tab = 'preset'">⚡ Quick add</button>
          <button :class="{ active: tab === 'custom' }" @click="tab = 'custom'">✏️ Custom</button>
        </div>

        <fieldset class="schedule-field">
          <legend>Repeat on</legend>
          <div class="day-buttons">
            <button v-for="day in WEEKDAYS" :key="day.value" :aria-pressed="scheduledDays.includes(day.value)" :class="{ selected: scheduledDays.includes(day.value) }" @click="toggleDay(day.value)">{{ day.label }}</button>
          </div>
          <p v-if="!scheduledDays.length" role="alert">Choose at least one day.</p>
          <p v-else-if="habit">Changes apply from today. Earlier schedules are preserved.</p>
        </fieldset>

        <!-- Preset list -->
        <div v-if="tab === 'preset'" class="preset-list">
          <button
            v-for="p in PRESET_HABITS"
            :key="p.name"
            class="preset-item"
            :disabled="!scheduledDays.length"
            @click="selectPreset(p)"
          >
            <span class="preset-icon">{{ p.icon }}</span>
            <span class="preset-name">{{ p.name }}</span>
            <span class="preset-cat">{{ p.category }}</span>
          </button>
        </div>

        <!-- Custom form -->
        <div v-else class="custom-form">
          <div class="field">
            <label>Habit name</label>
            <input v-model="name" placeholder="e.g. Drink green tea" maxlength="40" />
          </div>

          <div class="field">
            <label>Icon</label>
            <div class="icon-grid">
              <button
                v-for="ic in ICONS"
                :key="ic"
                class="icon-btn"
                :class="{ selected: icon === ic }"
                @click="icon = ic"
              >{{ ic }}</button>
            </div>
          </div>

          <div class="field">
            <label>Category</label>
            <select v-model="category">
              <option value="dev">💻 Dev</option>
              <option value="health">💪 Health</option>
              <option value="mindset">🧠 Mindset</option>
              <option value="custom">✨ Custom</option>
            </select>
          </div>

          <div class="field">
            <label>Color</label>
            <div class="color-grid">
              <button
                v-for="c in COLORS"
                :key="c"
                class="color-btn"
                :class="{ selected: color === c }"
                :style="{ background: c }"
                @click="color = c"
              />
            </div>
          </div>

          <button class="submit-btn" :disabled="!name.trim() || !scheduledDays.length" @click="submitCustom">
            {{ habit ? 'Save changes' : 'Add Habit 🌿' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal {
  background: var(--white);
  border-radius: var(--radius);
  width: 100%;
  max-width: 480px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
  padding: 1.5rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.modal-header h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  color: var(--text-primary);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  color: var(--text-muted);
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;
}
.close-btn:hover { background: var(--beige-100); }

.tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 1.25rem;
  background: var(--beige-100);
  padding: 4px;
  border-radius: var(--radius-sm);
}

.tabs button {
  flex: 1;
  padding: 0.5rem;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted);
  transition: all 0.2s;
}

.tabs button.active {
  background: var(--white);
  color: var(--blue-600);
  font-weight: 600;
  box-shadow: var(--shadow-sm);
}

.preset-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.preset-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem 1rem;
  border: 1px solid var(--beige-200);
  border-radius: var(--radius-sm);
  background: var(--white);
  text-align: left;
  transition: all 0.2s;
}

.preset-item:hover {
  background: var(--blue-50);
  border-color: var(--blue-200);
  transform: translateX(3px);
}

.preset-icon { font-size: 1.2rem; }
.preset-name { flex: 1; font-size: 0.9rem; font-weight: 500; color: var(--text-primary); }
.preset-cat {
  font-size: 0.7rem;
  padding: 2px 8px;
  background: var(--beige-100);
  color: var(--text-muted);
  border-radius: var(--radius-full);
  text-transform: capitalize;
}

.custom-form { display: flex; flex-direction: column; gap: 1rem; }

.field { display: flex; flex-direction: column; gap: 6px; }

.field label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.field input, .field select {
  padding: 0.65rem 0.9rem;
  border: 1.5px solid var(--beige-200);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.2s;
  background: var(--white);
}

.field input:focus, .field select:focus { border-color: var(--blue-400); }

.icon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border: 1.5px solid var(--beige-200);
  border-radius: var(--radius-sm);
  background: var(--white);
  font-size: 1.1rem;
  transition: all 0.15s;
}

.icon-btn.selected, .icon-btn:hover {
  border-color: var(--blue-400);
  background: var(--blue-50);
}

.color-grid { display: flex; gap: 8px; flex-wrap: wrap; }

.color-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid transparent;
  transition: all 0.15s;
}

.color-btn.selected, .color-btn:hover {
  border-color: var(--text-primary);
  transform: scale(1.15);
}

.submit-btn {
  padding: 0.75rem;
  background: var(--blue-500);
  color: var(--white);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.2s;
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background: var(--blue-600);
  transform: translateY(-1px);
}

.submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.overlay {
  padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
}
.modal {
  min-width: 0;
  max-height: calc(100vh - 2rem);
  max-height: calc(100dvh - max(1rem, env(safe-area-inset-top)) - max(1rem, env(safe-area-inset-bottom)));
  overflow-y: auto;
  overscroll-behavior: contain;
}
@media (max-width: 480px) {
  .modal { padding: 1rem; }
  .field input, .field select { font-size: 16px; }
}


.preset-name { min-width: 0; overflow-wrap: anywhere; }
.preset-icon, .preset-cat { flex-shrink: 0; }
.close-btn, .icon-btn { min-width: 44px; min-height: 44px; }
@media (max-width: 480px) {
  .preset-item { gap: 8px; padding: 0.75rem; }
}

.save-error { padding: 0.75rem; margin-bottom: 0.75rem; border-radius: var(--radius-sm); background: #fef2f2; color: #b91c1c; font-size: 0.85rem; }

.schedule-field { border: 0; margin-bottom: 1.25rem; }
.schedule-field legend { font-weight: 600; font-size: 0.85rem; margin-bottom: 0.5rem; }
.day-buttons { display: flex; flex-wrap: wrap; gap: 6px; }
.day-buttons button { min-width: 44px; min-height: 44px; border: 1px solid var(--beige-300); border-radius: var(--radius-sm); background: var(--white); color: var(--text-secondary); }
.day-buttons button.selected { background: var(--blue-50); color: var(--blue-600); border-color: var(--blue-400); font-weight: 600; }
.schedule-field p { font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.5rem; }
.preset-item:disabled { opacity: 0.5; cursor: not-allowed; }
</style>