import { createRouter, createWebHistory } from 'vue-router'
import Today from '../views/TodayView.vue'
import Calendar from '../views/CalendarView.vue'
import Dashboard from '../views/DashboardView.vue'
import Badges from '../views/BadgesView.vue'

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', component: Today },
    { path: '/calendar', component: Calendar },
    { path: '/dashboard', component: Dashboard },
    { path: '/badges', component: Badges }
  ]
})