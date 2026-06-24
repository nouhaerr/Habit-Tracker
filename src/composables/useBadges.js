import { computed } from 'vue';
export const BADGES = [
    {
        id: 'first_step',
        name: 'First Step',
        description: 'Complete your first habit',
        icon: '🌱',
        check: (habits) => habits.some(h => h.completedDates.length >= 1)
    },
    {
        id: 'on_fire',
        name: 'On Fire',
        description: 'Reach a 7-day streak on any habit',
        icon: '🔥',
        check: (habits) => habits.some(h => h.bestStreak >= 7)
    },
    {
        id: 'unstoppable',
        name: 'Unstoppable',
        description: 'Reach a 30-day streak on any habit',
        icon: '⚡',
        check: (habits) => habits.some(h => h.bestStreak >= 30)
    },
    {
        id: 'collector',
        name: 'Habit Collector',
        description: 'Add 5 or more habits',
        icon: '🗂️',
        check: (habits) => habits.length >= 5
    },
    {
        id: 'perfect_day',
        name: 'Perfect Day',
        description: 'Complete all habits in one day',
        icon: '⭐',
        check: (habits) => {
            if (!habits.length)
                return false;
            const today = new Date().toISOString().split('T')[0];
            return habits.every(h => h.completedDates.includes(today));
        }
    },
    {
        id: 'dev_life',
        name: 'Dev Life',
        description: 'Complete the "Make a commit" habit 10 times',
        icon: '💻',
        check: (habits) => {
            const h = habits.find(h => h.name.toLowerCase().includes('commit'));
            return !!h && h.completedDates.length >= 10;
        }
    },
    {
        id: 'hydrated',
        name: 'Hydrated',
        description: 'Complete the water habit 7 times',
        icon: '💧',
        check: (habits) => {
            const h = habits.find(h => h.name.toLowerCase().includes('water'));
            return !!h && h.completedDates.length >= 7;
        }
    },
    {
        id: 'veteran',
        name: 'Veteran',
        description: 'Use the app for 14 days',
        icon: '🏅',
        check: (habits) => {
            if (!habits.length)
                return false;
            const first = new Date(habits[0].createdAt);
            const now = new Date();
            const diff = Math.floor((now.getTime() - first.getTime()) / (1000 * 60 * 60 * 24));
            return diff >= 14;
        }
    }
];
export function useBadges(habits) {
    const badges = computed(() => BADGES.map(b => ({
        ...b,
        earned: b.check(habits.value)
    })));
    const earnedCount = computed(() => badges.value.filter(b => b.earned).length);
    return { badges, earnedCount };
}
