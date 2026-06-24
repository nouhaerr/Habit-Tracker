<script setup lang="ts">
import { useHabits } from '../composables/useHabits'
import { useBadges } from '../composables/useBadges'

const { habits } = useHabits()
const { badges, earnedCount } = useBadges(habits)
</script>

<template>
  <div class="badges-page">
    <div class="page-header">
      <h1>Badges</h1>
      <p>{{ earnedCount }} / {{ badges.length }} earned</p>
    </div>

    <div class="progress-banner">
      <div class="banner-bar">
        <div class="banner-fill" :style="{ width: (earnedCount / badges.length * 100) + '%' }" />
      </div>
      <span class="banner-label">{{ Math.round(earnedCount / badges.length * 100) }}% collection complete</span>
    </div>

    <div class="badges-grid">
      <div
        v-for="badge in badges"
        :key="badge.id"
        class="badge-card"
        :class="{ earned: badge.earned, locked: !badge.earned }"
      >
        <div class="badge-icon-wrap" :class="{ earned: badge.earned }">
          <span class="badge-icon">{{ badge.earned ? badge.icon : '🔒' }}</span>
        </div>
        <div class="badge-info">
          <p class="badge-name">{{ badge.name }}</p>
          <p class="badge-desc">{{ badge.description }}</p>
          <span class="badge-status" v-if="badge.earned">✓ Earned</span>
          <span class="badge-status locked" v-else">In progress...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.badges-page { max-width: 680px; }

.page-header { margin-bottom: 1rem; }
.page-header h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
}
.page-header p { font-size: 0.88rem; color: var(--text-muted); }

.progress-banner {
  background: var(--white);
  border: 1px solid var(--beige-200);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.banner-bar {
  height: 10px;
  background: var(--beige-200);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.banner-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--blue-400), var(--lavender));
  border-radius: var(--radius-full);
  transition: width 0.6s ease;
}

.banner-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }

.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.badge-card {
  background: var(--white);
  border: 1.5px solid var(--beige-200);
  border-radius: var(--radius);
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.25s;
}

.badge-card.earned {
  border-color: var(--blue-300);
  background: var(--blue-50);
}

.badge-card.locked { opacity: 0.6; }

.badge-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }

.badge-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--beige-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  transition: all 0.2s;
}

.badge-icon-wrap.earned {
  background: var(--blue-100);
  animation: pulse-ring 2s infinite;
}

.badge-info { flex: 1; min-width: 0; }

.badge-name { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 3px; }
.badge-desc { font-size: 0.78rem; color: var(--text-muted); margin-bottom: 6px; }

.badge-status {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--blue-600);
  background: var(--blue-100);
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

.badge-status.locked { color: var(--text-muted); background: var(--beige-100); }

@media (max-width: 480px) {
  .badges-grid { grid-template-columns: 1fr; }
}
</style>