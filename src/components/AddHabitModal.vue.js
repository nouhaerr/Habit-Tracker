import { ref } from 'vue';
const emit = defineEmits();
const PRESET_HABITS = [
    { name: 'Make a commit', icon: '💻', category: 'dev' },
    { name: 'Drink 8 glasses of water', icon: '💧', category: 'health' },
    { name: 'Take a break every 2h', icon: '🧘', category: 'mindset' },
    { name: 'Read 20 minutes', icon: '📚', category: 'dev' },
    { name: 'Exercise / walk', icon: '🏃', category: 'health' },
    { name: 'Meditate', icon: '🌸', category: 'mindset' },
    { name: 'Review pull requests', icon: '🔍', category: 'dev' },
    { name: 'Write in journal', icon: '✏️', category: 'mindset' },
    { name: 'Learn something new', icon: '🎯', category: 'dev' },
    { name: 'Sleep 8 hours', icon: '😴', category: 'health' },
];
const ICONS = ['💻', '💧', '🧘', '📚', '🏃', '🌸', '🔍', '✏️', '🎯', '😴', '🍎', '☕', '🎵', '🌿', '⚡', '🦋', '🌊', '🏋️', '🧠', '💡'];
const COLORS = ['#6B8CFF', '#60C5F1', '#A8D8B9', '#B8A9E8', '#F4A89A', '#FFD07B', '#FF9F9F', '#98D8C8', '#C5A3FF', '#FFB347'];
const tab = ref('preset');
const name = ref('');
const icon = ref('💻');
const category = ref('dev');
const color = ref('#6B8CFF');
function selectPreset(p) {
    emit('add', { name: p.name, icon: p.icon, category: p.category, color: color.value, reminderEnabled: false });
}
function submitCustom() {
    if (!name.value.trim())
        return;
    emit('add', { name: name.value.trim(), icon: icon.value, category: category.value, color: color.value, reminderEnabled: false });
}
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
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['preset-item']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['color-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['selected']} */ ;
/** @type {__VLS_StyleScopedClasses['color-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Teleport | typeof __VLS_components.Teleport} */
Teleport;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    to: "body",
}));
const __VLS_2 = __VLS_1({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('close');
            // @ts-ignore
            [emit,];
        } },
    ...{ class: "overlay" },
});
/** @type {__VLS_StyleScopedClasses['overlay']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "modal" },
});
/** @type {__VLS_StyleScopedClasses['modal']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "modal-header" },
});
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('close');
            // @ts-ignore
            [emit,];
        } },
    ...{ class: "close-btn" },
});
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "tabs" },
});
/** @type {__VLS_StyleScopedClasses['tabs']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.tab = 'preset';
            // @ts-ignore
            [tab,];
        } },
    ...{ class: ({ active: __VLS_ctx.tab === 'preset' }) },
});
/** @type {__VLS_StyleScopedClasses['active']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.tab = 'custom';
            // @ts-ignore
            [tab, tab,];
        } },
    ...{ class: ({ active: __VLS_ctx.tab === 'custom' }) },
});
/** @type {__VLS_StyleScopedClasses['active']} */ ;
if (__VLS_ctx.tab === 'preset') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "preset-list" },
    });
    /** @type {__VLS_StyleScopedClasses['preset-list']} */ ;
    for (const [p] of __VLS_vFor((__VLS_ctx.PRESET_HABITS))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.tab === 'preset'))
                        return;
                    __VLS_ctx.selectPreset(p);
                    // @ts-ignore
                    [tab, tab, PRESET_HABITS, selectPreset,];
                } },
            key: (p.name),
            ...{ class: "preset-item" },
        });
        /** @type {__VLS_StyleScopedClasses['preset-item']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "preset-icon" },
        });
        /** @type {__VLS_StyleScopedClasses['preset-icon']} */ ;
        (p.icon);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "preset-name" },
        });
        /** @type {__VLS_StyleScopedClasses['preset-name']} */ ;
        (p.name);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "preset-cat" },
        });
        /** @type {__VLS_StyleScopedClasses['preset-cat']} */ ;
        (p.category);
        // @ts-ignore
        [];
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "custom-form" },
    });
    /** @type {__VLS_StyleScopedClasses['custom-form']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "field" },
    });
    /** @type {__VLS_StyleScopedClasses['field']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        placeholder: "e.g. Drink green tea",
        maxlength: "40",
    });
    (__VLS_ctx.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "field" },
    });
    /** @type {__VLS_StyleScopedClasses['field']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "icon-grid" },
    });
    /** @type {__VLS_StyleScopedClasses['icon-grid']} */ ;
    for (const [ic] of __VLS_vFor((__VLS_ctx.ICONS))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.tab === 'preset'))
                        return;
                    __VLS_ctx.icon = ic;
                    // @ts-ignore
                    [name, ICONS, icon,];
                } },
            key: (ic),
            ...{ class: "icon-btn" },
            ...{ class: ({ selected: __VLS_ctx.icon === ic }) },
        });
        /** @type {__VLS_StyleScopedClasses['icon-btn']} */ ;
        /** @type {__VLS_StyleScopedClasses['selected']} */ ;
        (ic);
        // @ts-ignore
        [icon,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "field" },
    });
    /** @type {__VLS_StyleScopedClasses['field']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
        value: (__VLS_ctx.category),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
        value: "dev",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
        value: "health",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
        value: "mindset",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
        value: "custom",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "field" },
    });
    /** @type {__VLS_StyleScopedClasses['field']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "color-grid" },
    });
    /** @type {__VLS_StyleScopedClasses['color-grid']} */ ;
    for (const [c] of __VLS_vFor((__VLS_ctx.COLORS))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.tab === 'preset'))
                        return;
                    __VLS_ctx.color = c;
                    // @ts-ignore
                    [category, COLORS, color,];
                } },
            key: (c),
            ...{ class: "color-btn" },
            ...{ class: ({ selected: __VLS_ctx.color === c }) },
            ...{ style: ({ background: c }) },
        });
        /** @type {__VLS_StyleScopedClasses['color-btn']} */ ;
        /** @type {__VLS_StyleScopedClasses['selected']} */ ;
        // @ts-ignore
        [color,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.submitCustom) },
        ...{ class: "submit-btn" },
        disabled: (!__VLS_ctx.name.trim()),
    });
    /** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
}
// @ts-ignore
[name, submitCustom,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
});
export default {};
