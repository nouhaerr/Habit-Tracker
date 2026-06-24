import { ref, computed } from 'vue';
import { useHabits } from '../composables/useHabits';
import HabitCard from '../components/HabitCard.vue';
import AddHabitModal from '../components/AddHabitModal.vue';
import ReminderModal from '../components/ReminderModal.vue';
const { todayHabits, completedToday, totalToday, completionRate, toggleHabit, addHabit, deleteHabit, updateReminder, habits } = useHabits();
const showAddModal = ref(false);
const reminderHabitId = ref(null);
const reminderHabit = computed(() => reminderHabitId.value ? habits.value.find(h => h.id === reminderHabitId.value) ?? null : null);
const greeting = computed(() => {
    const h = new Date().getHours();
    if (h < 12)
        return '☀️ Good morning';
    if (h < 18)
        return '🌤️ Good afternoon';
    return '🌙 Good evening';
});
const dateLabel = computed(() => new Date().toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' }));
function handleAdd(data) {
    addHabit(data);
    showAddModal.value = false;
}
function handleReminder(time, enabled) {
    if (reminderHabitId.value) {
        updateReminder(reminderHabitId.value, time, enabled);
    }
    reminderHabitId.value = null;
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['add-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['empty']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "today" },
});
/** @type {__VLS_StyleScopedClasses['today']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "page-header" },
});
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "greeting" },
});
/** @type {__VLS_StyleScopedClasses['greeting']} */ ;
(__VLS_ctx.greeting);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "date" },
});
/** @type {__VLS_StyleScopedClasses['date']} */ ;
(__VLS_ctx.dateLabel);
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showAddModal = true;
            // @ts-ignore
            [greeting, dateLabel, showAddModal,];
        } },
    ...{ class: "add-btn" },
});
/** @type {__VLS_StyleScopedClasses['add-btn']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "progress-card" },
});
/** @type {__VLS_StyleScopedClasses['progress-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "progress-info" },
});
/** @type {__VLS_StyleScopedClasses['progress-info']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "progress-label" },
});
/** @type {__VLS_StyleScopedClasses['progress-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "progress-count" },
});
/** @type {__VLS_StyleScopedClasses['progress-count']} */ ;
(__VLS_ctx.completedToday);
(__VLS_ctx.totalToday);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "progress-bar" },
});
/** @type {__VLS_StyleScopedClasses['progress-bar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "progress-fill" },
    ...{ style: ({ width: __VLS_ctx.completionRate + '%' }) },
});
/** @type {__VLS_StyleScopedClasses['progress-fill']} */ ;
if (__VLS_ctx.completionRate === 100) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "progress-msg" },
    });
    /** @type {__VLS_StyleScopedClasses['progress-msg']} */ ;
}
else if (__VLS_ctx.completionRate >= 50) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "progress-msg" },
    });
    /** @type {__VLS_StyleScopedClasses['progress-msg']} */ ;
}
else if (__VLS_ctx.completionRate > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "progress-msg" },
    });
    /** @type {__VLS_StyleScopedClasses['progress-msg']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "progress-msg" },
    });
    /** @type {__VLS_StyleScopedClasses['progress-msg']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "habits-section" },
});
/** @type {__VLS_StyleScopedClasses['habits-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-header" },
});
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "badge" },
});
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
(__VLS_ctx.totalToday);
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.TransitionGroup | typeof __VLS_components.TransitionGroup} */
TransitionGroup;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    name: "slide-up",
    tag: "div",
    ...{ class: "habits-list" },
}));
const __VLS_2 = __VLS_1({
    name: "slide-up",
    tag: "div",
    ...{ class: "habits-list" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['habits-list']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
for (const [habit] of __VLS_vFor((__VLS_ctx.todayHabits))) {
    const __VLS_6 = HabitCard;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        ...{ 'onToggle': {} },
        ...{ 'onDelete': {} },
        ...{ 'onReminder': {} },
        key: (habit.id),
        habit: (habit),
    }));
    const __VLS_8 = __VLS_7({
        ...{ 'onToggle': {} },
        ...{ 'onDelete': {} },
        ...{ 'onReminder': {} },
        key: (habit.id),
        habit: (habit),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_11;
    const __VLS_12 = {
        /** @type {typeof __VLS_11.toggle} */
        onToggle: (__VLS_ctx.toggleHabit),
    };
    const __VLS_13 = {
        /** @type {typeof __VLS_11.delete} */
        onDelete: (__VLS_ctx.deleteHabit),
    };
    const __VLS_14 = {
        /** @type {typeof __VLS_11.reminder} */
        onReminder: (...[$event]) => {
            __VLS_ctx.reminderHabitId = $event;
            // @ts-ignore
            [completedToday, totalToday, totalToday, completionRate, completionRate, completionRate, completionRate, todayHabits, toggleHabit, deleteHabit, reminderHabitId,];
        },
    };
    var __VLS_9;
    var __VLS_10;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_3;
if (__VLS_ctx.totalToday === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "empty" },
    });
    /** @type {__VLS_StyleScopedClasses['empty']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.totalToday === 0))
                    return;
                __VLS_ctx.showAddModal = true;
                // @ts-ignore
                [showAddModal, totalToday,];
            } },
        ...{ class: "add-btn" },
    });
    /** @type {__VLS_StyleScopedClasses['add-btn']} */ ;
}
let __VLS_15;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
    name: "scale",
}));
const __VLS_17 = __VLS_16({
    name: "scale",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_20 } = __VLS_18.slots;
if (__VLS_ctx.showAddModal) {
    const __VLS_21 = AddHabitModal;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
        ...{ 'onAdd': {} },
        ...{ 'onClose': {} },
    }));
    const __VLS_23 = __VLS_22({
        ...{ 'onAdd': {} },
        ...{ 'onClose': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    let __VLS_26;
    const __VLS_27 = {
        /** @type {typeof __VLS_26.add} */
        onAdd: (__VLS_ctx.handleAdd),
    };
    const __VLS_28 = {
        /** @type {typeof __VLS_26.close} */
        onClose: (...[$event]) => {
            if (!(__VLS_ctx.showAddModal))
                return;
            __VLS_ctx.showAddModal = false;
            // @ts-ignore
            [showAddModal, showAddModal, handleAdd,];
        },
    };
    var __VLS_24;
    var __VLS_25;
}
// @ts-ignore
[];
var __VLS_18;
let __VLS_29;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
    name: "scale",
}));
const __VLS_31 = __VLS_30({
    name: "scale",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const { default: __VLS_34 } = __VLS_32.slots;
if (__VLS_ctx.reminderHabit) {
    const __VLS_35 = ReminderModal;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
        ...{ 'onSave': {} },
        ...{ 'onClose': {} },
        habit: (__VLS_ctx.reminderHabit),
    }));
    const __VLS_37 = __VLS_36({
        ...{ 'onSave': {} },
        ...{ 'onClose': {} },
        habit: (__VLS_ctx.reminderHabit),
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    let __VLS_40;
    const __VLS_41 = {
        /** @type {typeof __VLS_40.save} */
        onSave: (__VLS_ctx.handleReminder),
    };
    const __VLS_42 = {
        /** @type {typeof __VLS_40.close} */
        onClose: (...[$event]) => {
            if (!(__VLS_ctx.reminderHabit))
                return;
            __VLS_ctx.reminderHabitId = null;
            // @ts-ignore
            [reminderHabitId, reminderHabit, reminderHabit, handleReminder,];
        },
    };
    var __VLS_38;
    var __VLS_39;
}
// @ts-ignore
[];
var __VLS_32;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
