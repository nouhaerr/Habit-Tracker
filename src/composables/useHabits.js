import { ref, computed, watch } from 'vue';
const TODAY = () => new Date().toISOString().split('T')[0];
const DEFAULT_HABITS = [
    { name: 'Make a commit', icon: '💻', category: 'dev', color: '#6B8CFF', reminderEnabled: false },
    { name: 'Drink 8 glasses of water', icon: '💧', category: 'health', color: '#60C5F1', reminderEnabled: false },
    { name: 'Take a break every 2h', icon: '🧘', category: 'mindset', color: '#A8D8B9', reminderEnabled: false },
    { name: 'Read 20 minutes', icon: '📚', category: 'dev', color: '#B8A9E8', reminderEnabled: false },
    { name: 'Exercise / walk', icon: '🏃', category: 'health', color: '#F4A89A', reminderEnabled: false },
];
function makeId() {
    return Math.random().toString(36).slice(2, 10);
}
function loadHabits() {
    try {
        const raw = localStorage.getItem('habitflow_habits');
        return raw ? JSON.parse(raw) : [];
    }
    catch {
        return [];
    }
}
function saveHabits(habits) {
    localStorage.setItem('habitflow_habits', JSON.stringify(habits));
}
function calcStreak(dates) {
    if (!dates.length)
        return 0;
    const sorted = [...dates].sort((a, b) => b.localeCompare(a));
    const today = TODAY();
    let streak = 0;
    let current = today;
    for (const d of sorted) {
        if (d === current) {
            streak++;
            const prev = new Date(current);
            prev.setDate(prev.getDate() - 1);
            current = prev.toISOString().split('T')[0];
        }
        else if (d < current) {
            break;
        }
    }
    return streak;
}
// Global state
const habits = ref(loadHabits());
// Seed default habits if empty
if (habits.value.length === 0) {
    habits.value = DEFAULT_HABITS.map(h => ({
        ...h,
        id: makeId(),
        createdAt: TODAY(),
        completedDates: [],
        streak: 0,
        bestStreak: 0
    }));
    saveHabits(habits.value);
}
watch(habits, (val) => saveHabits(val), { deep: true });
export function useHabits() {
    const today = TODAY();
    const todayHabits = computed(() => habits.value.map(h => ({
        ...h,
        completedToday: h.completedDates.includes(today)
    })));
    const completedToday = computed(() => habits.value.filter(h => h.completedDates.includes(today)).length);
    const totalToday = computed(() => habits.value.length);
    const completionRate = computed(() => totalToday.value === 0 ? 0 : Math.round((completedToday.value / totalToday.value) * 100));
    const longestStreak = computed(() => habits.value.reduce((max, h) => Math.max(max, h.bestStreak), 0));
    const weeklyStats = computed(() => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const date = d.toISOString().split('T')[0];
            const label = d.toLocaleDateString('en', { weekday: 'short' });
            const completed = habits.value.filter(h => h.completedDates.includes(date)).length;
            const rate = totalToday.value === 0 ? 0 : Math.round((completed / habits.value.length) * 100);
            days.push({ date, label, rate });
        }
        return days;
    });
    function toggleHabit(id) {
        const habit = habits.value.find(h => h.id === id);
        if (!habit)
            return;
        const idx = habit.completedDates.indexOf(today);
        if (idx === -1) {
            habit.completedDates.push(today);
        }
        else {
            habit.completedDates.splice(idx, 1);
        }
        habit.streak = calcStreak(habit.completedDates);
        habit.bestStreak = Math.max(habit.bestStreak, habit.streak);
    }
    function addHabit(data) {
        const habit = {
            id: makeId(),
            createdAt: TODAY(),
            completedDates: [],
            streak: 0,
            bestStreak: 0,
            ...data
        };
        habits.value.push(habit);
    }
    function deleteHabit(id) {
        habits.value = habits.value.filter(h => h.id !== id);
    }
    function updateReminder(id, time, enabled) {
        const habit = habits.value.find(h => h.id === id);
        if (!habit)
            return;
        habit.reminder = time;
        habit.reminderEnabled = enabled;
        if (enabled && 'Notification' in window) {
            Notification.requestPermission();
        }
    }
    // Schedule notification check
    function checkReminders() {
        if (!('Notification' in window) || Notification.permission !== 'granted')
            return;
        const now = new Date();
        const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const today = TODAY();
        habits.value.forEach(h => {
            if (h.reminderEnabled && h.reminder === hhmm && !h.completedDates.includes(today)) {
                new Notification('HabitFlow 🌿', {
                    body: `Don't forget: ${h.icon} ${h.name}`,
                    icon: '/favicon.ico'
                });
            }
        });
    }
    setInterval(checkReminders, 60000);
    return {
        habits,
        todayHabits,
        completedToday,
        totalToday,
        completionRate,
        longestStreak,
        weeklyStats,
        toggleHabit,
        addHabit,
        deleteHabit,
        updateReminder
    };
}
