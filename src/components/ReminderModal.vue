<script setup lang="ts">
import { ref } from 'vue'
import type { Habit } from '../types'

const props = defineProps<{ habit: Habit; busy?: boolean; saveError?: string }>()
const emit = defineEmits<{
  save: [time: string, enabled: boolean]
  close: []
}>()

const time = ref(props.habit.reminder ?? '09:00')
const enabled = ref(props.habit.reminderEnabled)
</script>

<template>
  <Teleport to="body">
    <div class="overlay" @click.self="!busy && emit('close')">
      <div class="modal" :inert="busy" :aria-busy="busy">
        <div class="modal-header">
          <h2>{{ habit.icon }} Reminder</h2>
          <button @click="emit('close')">✕</button>
        </div>

        <p v-if="saveError" class="save-error" role="alert">{{ saveError }}</p>
        <p class="habit-name">{{ habit.name }}</p>

        <div class="toggle-row">
          <label class="toggle-label">Enable reminder</label>
          <button
            class="toggle"
            :class="{ on: enabled }"
            @click="enabled = !enabled"
          >
            <span class="toggle-thumb" />
          </button>
        </div>

        <div class="time-field" v-if="enabled">
          <label>Reminder time</label>
          <input type="time" v-model="time" />
        </div>

        <p class="note" v-if="enabled">
          💡 Make sure to allow notifications in your browser for reminders to work.
        </p>

        <div class="actions">
          <button class="btn-cancel" @click="emit('close')">Cancel</button>
          <button class="btn-save" @click="emit('save', time, enabled)">Save</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
}

.modal {
  background: var(--white);
  border-radius: var(--radius);
  width: 100%;
  max-width: 360px;
  padding: 1.5rem;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 { font-size: 1.1rem; font-weight: 700; }
.modal-header button {
  background: none; border: none;
  color: var(--text-muted); font-size: 1rem; cursor: pointer;
}

.habit-name { font-size: 0.9rem; color: var(--text-secondary); }

.toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-label { font-size: 0.9rem; font-weight: 500; }

.toggle {
  width: 44px; height: 24px;
  border-radius: 99px;
  border: none;
  background: var(--beige-300);
  position: relative;
  transition: background 0.2s;
  cursor: pointer;
}

.toggle.on { background: var(--blue-500); }

.toggle-thumb {
  position: absolute;
  top: 3px; left: 3px;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: white;
  transition: transform 0.2s;
  box-shadow: var(--shadow-sm);
}

.toggle.on .toggle-thumb { transform: translateX(20px); }

.time-field { display: flex; flex-direction: column; gap: 6px; }
.time-field label { font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); }
.time-field input {
  padding: 0.6rem 0.9rem;
  border: 1.5px solid var(--beige-200);
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  outline: none;
}
.time-field input:focus { border-color: var(--blue-400); }

.note { font-size: 0.78rem; color: var(--text-muted); background: var(--blue-50); padding: 0.75rem; border-radius: var(--radius-sm); }

.actions { display: flex; gap: 8px; }
.btn-cancel {
  flex: 1; padding: 0.65rem;
  border: 1.5px solid var(--beige-200);
  background: var(--white); border-radius: var(--radius-sm);
  font-size: 0.9rem; font-weight: 500; color: var(--text-secondary);
  transition: all 0.2s;
}
.btn-cancel:hover { background: var(--beige-100); }

.btn-save {
  flex: 1; padding: 0.65rem;
  background: var(--blue-500); border: none;
  border-radius: var(--radius-sm);
  font-size: 0.9rem; font-weight: 600; color: white;
  transition: all 0.2s;
}
.btn-save:hover { background: var(--blue-600); }

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
  .time-field input { font-size: 16px; }
}


.habit-name { overflow-wrap: anywhere; }
.modal-header button { min-width: 44px; min-height: 44px; }
.toggle { flex-shrink: 0; }

.save-error { padding: 0.75rem; margin-bottom: 0.75rem; border-radius: var(--radius-sm); background: #fef2f2; color: #b91c1c; font-size: 0.85rem; }
</style>