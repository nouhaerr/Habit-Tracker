<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'
import AuthPanel from './components/AuthPanel.vue'
import { useAuth } from './composables/useAuth'
import { useHabits } from './composables/useHabits'

const route = useRoute()
const { completionRate, loading, loaded, saving, error, loadHabits } = useHabits()
const { session, ready, authError, signOut } = useAuth()

const navItems = [
  { path: '/', label: "Today's Habits", icon: '🌿' },
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/badges', label: 'Badges', icon: '🏅' }
]
</script>

<template>
  <div v-if="!ready" class="session-loading" role="status">Restoring your session…</div>
  <AuthPanel v-else-if="!session" :session-error="authError" />
  <div v-else class="app">
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
      <div class="account-bar">
        <span class="account-email">{{ session.user.email }}</span>
        <span v-if="saving" role="status">Saving…</span>
        <button :disabled="saving || loading" @click="signOut">Sign out</button>
      </div>
      <p v-if="authError" class="data-error" role="alert">{{ authError }}</p>
      <div v-if="error" class="data-error" role="alert">
        <span>{{ error }}</span>
        <button :disabled="saving || loading" @click="loadHabits">Reload habits</button>
      </div>
      <p v-if="loading" class="data-status" role="status">Loading your habits…</p>
      <div v-if="loaded" :inert="saving || loading">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  min-height: 100vh;
  min-height: 100dvh;
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
  overflow-y: auto;
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
  min-width: 0;
  padding: clamp(1.25rem, 3vw, 3rem);
  min-height: 100vh;
  min-height: 100dvh;
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
  padding: 0.5rem max(0.5rem, env(safe-area-inset-right)) calc(0.5rem + env(safe-area-inset-bottom)) max(0.5rem, env(safe-area-inset-left));
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
  flex: 1;
  min-width: 0;
  min-height: 48px;
  padding: 0.4rem 0.25rem;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.mobile-nav-item.active { color: var(--blue-600); }
.mobile-nav-label { font-size: 0.65rem; }

@media (max-width: 768px) {
  .sidebar { display: none; }
  .main {
    margin-left: 0;
    padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) calc(6rem + env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
  }
  .mobile-nav { display: flex; }
}

.session-loading { min-height: 100dvh; display: grid; place-items: center; padding: 1rem; }
.account-bar { max-width: 1120px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 0.75rem; font-size: 0.8rem; color: var(--text-secondary); }
.account-email { min-width: 0; overflow-wrap: anywhere; margin-right: auto; }
.account-bar button, .data-error button { min-height: 44px; padding: 0.5rem 0.75rem; border: 1px solid var(--beige-300); border-radius: var(--radius-sm); background: var(--white); color: var(--text-primary); }
.data-error { max-width: 1120px; margin: 0 auto 1rem; padding: 1rem; border-radius: var(--radius-sm); color: #b91c1c; background: #fef2f2; display: flex; align-items: center; flex-wrap: wrap; gap: 0.75rem; }
.data-status { max-width: 1120px; margin: 0 auto 1rem; }
</style>