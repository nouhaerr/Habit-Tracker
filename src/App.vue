<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useHabits } from './composables/useHabits'

const route = useRoute()
const { completionRate } = useHabits()

const navItems = [
  { path: '/', label: "Today's Habits", icon: '🌿' },
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/badges', label: 'Badges', icon: '🏅' }
]
</script>

<template>
  <div class="app">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-icon">🌿</span>
        <span class="brand-name">HabitFlow</span>
      </div>

      <!-- Progress ring -->
      <div class="progress-section">
        <div class="ring-wrapper">
          <svg class="ring" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="24" fill="none" stroke="var(--beige-200)" stroke-width="5"/>
            <circle
              cx="30" cy="30" r="24"
              fill="none"
              stroke="var(--blue-500)"
              stroke-width="5"
              stroke-linecap="round"
              stroke-dasharray="150.8"
              :stroke-dashoffset="150.8 - (150.8 * completionRate / 100)"
              transform="rotate(-90 30 30)"
              style="transition: stroke-dashoffset 0.6s ease"
            />
          </svg>
          <span class="ring-label">{{ completionRate }}%</span>
        </div>
        <p class="ring-desc">Today's progress</p>
      </div>

      <!-- Nav -->
      <nav class="nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: route.path === item.path }"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <p>Built with 💙 for devs</p>
      </div>
    </aside>

    <!-- Mobile bottom nav -->
    <nav class="mobile-nav">
      <RouterLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="mobile-nav-item"
        :class="{ active: route.path === item.path }"
      >
        <span>{{ item.icon }}</span>
        <span class="mobile-nav-label">{{ item.label.split(' ')[0] }}</span>
      </RouterLink>
    </nav>

    <!-- Main -->
    <main class="main">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  min-height: 100vh;
}

/* ── Sidebar ── */
.sidebar {
  width: 240px;
  background: var(--white);
  border-right: 1px solid var(--beige-200);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  position: fixed;
  top: 0; left: 0; bottom: 0;
  z-index: 10;
  box-shadow: var(--shadow-sm);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 0.5rem 1.5rem;
  border-bottom: 1px solid var(--beige-200);
}

.brand-icon { font-size: 1.5rem; }
.brand-name {
  font-family: 'Poppins', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--blue-600);
}

.progress-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--beige-200);
}

.ring-wrapper {
  position: relative;
  width: 70px;
  height: 70px;
}

.ring { width: 100%; height: 100%; }

.ring-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--blue-600);
}

.ring-desc {
  margin-top: 8px;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.65rem 0.75rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.88rem;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-item:hover { background: var(--beige-100); color: var(--text-primary); }
.nav-item.active {
  background: var(--blue-50);
  color: var(--blue-600);
  font-weight: 600;
}

.nav-icon { font-size: 1.1rem; }

.sidebar-footer {
  font-size: 0.72rem;
  color: var(--text-muted);
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid var(--beige-200);
}

/* ── Main ── */
.main {
  flex: 1;
  margin-left: 240px;
  padding: 2rem;
  min-height: 100vh;
  background: var(--beige-50);
}

/* ── Mobile nav ── */
.mobile-nav {
  display: none;
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: var(--white);
  border-top: 1px solid var(--beige-200);
  z-index: 10;
  padding: 0.5rem;
  justify-content: space-around;
}

.mobile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  text-decoration: none;
  color: var(--text-muted);
  font-size: 0.7rem;
  padding: 0.4rem 1rem;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.mobile-nav-item.active { color: var(--blue-600); }
.mobile-nav-label { font-size: 0.65rem; }

@media (max-width: 768px) {
  .sidebar { display: none; }
  .main { margin-left: 0; padding: 1rem 1rem 5rem; }
  .mobile-nav { display: flex; }
}
</style>