const props = defineProps();
const emit = defineEmits();
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['name']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-reminder']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-delete']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-check']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-check']} */ ;
/** @type {__VLS_StyleScopedClasses['checked']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card" },
    ...{ class: ({ completed: __VLS_ctx.habit.completedToday }) },
});
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['completed']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card-left" },
});
/** @type {__VLS_StyleScopedClasses['card-left']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "icon-wrap" },
    ...{ style: ({ background: __VLS_ctx.habit.color + '22', borderColor: __VLS_ctx.habit.color + '44' }) },
});
/** @type {__VLS_StyleScopedClasses['icon-wrap']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "icon" },
});
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
(__VLS_ctx.habit.icon);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "info" },
});
/** @type {__VLS_StyleScopedClasses['info']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "name" },
    ...{ class: ({ done: __VLS_ctx.habit.completedToday }) },
});
/** @type {__VLS_StyleScopedClasses['name']} */ ;
/** @type {__VLS_StyleScopedClasses['done']} */ ;
(__VLS_ctx.habit.name);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "meta" },
});
/** @type {__VLS_StyleScopedClasses['meta']} */ ;
if (__VLS_ctx.habit.streak > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "streak" },
    });
    /** @type {__VLS_StyleScopedClasses['streak']} */ ;
    (__VLS_ctx.habit.streak);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "category" },
});
/** @type {__VLS_StyleScopedClasses['category']} */ ;
(__VLS_ctx.habit.category);
if (__VLS_ctx.habit.reminderEnabled && __VLS_ctx.habit.reminder) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "reminder-badge" },
    });
    /** @type {__VLS_StyleScopedClasses['reminder-badge']} */ ;
    (__VLS_ctx.habit.reminder);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card-right" },
});
/** @type {__VLS_StyleScopedClasses['card-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('reminder', __VLS_ctx.habit.id);
            // @ts-ignore
            [habit, habit, habit, habit, habit, habit, habit, habit, habit, habit, habit, habit, habit, emit,];
        } },
    ...{ class: "btn-reminder" },
    title: "Set reminder",
});
/** @type {__VLS_StyleScopedClasses['btn-reminder']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('delete', __VLS_ctx.habit.id);
            // @ts-ignore
            [habit, emit,];
        } },
    ...{ class: "btn-delete" },
    title: "Delete habit",
});
/** @type {__VLS_StyleScopedClasses['btn-delete']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('toggle', __VLS_ctx.habit.id);
            // @ts-ignore
            [habit, emit,];
        } },
    ...{ class: "btn-check" },
    ...{ class: ({ checked: __VLS_ctx.habit.completedToday }) },
    ...{ style: ({ borderColor: __VLS_ctx.habit.color, background: __VLS_ctx.habit.completedToday ? __VLS_ctx.habit.color : 'transparent' }) },
});
/** @type {__VLS_StyleScopedClasses['btn-check']} */ ;
/** @type {__VLS_StyleScopedClasses['checked']} */ ;
if (__VLS_ctx.habit.completedToday) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
// @ts-ignore
[habit, habit, habit, habit, habit,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
