import { RouterView, RouterLink, useRoute } from 'vue-router';
import { useHabits } from './composables/useHabits';
const route = useRoute();
const { completionRate } = useHabits();
const navItems = [
    { path: '/', label: "Today's Habits", icon: '🌿' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/badges', label: 'Badges', icon: '🏅' }
];
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['main']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-nav']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "app" },
});
/** @type {__VLS_StyleScopedClasses['app']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
    ...{ class: "sidebar" },
});
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "brand" },
});
/** @type {__VLS_StyleScopedClasses['brand']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "brand-icon" },
});
/** @type {__VLS_StyleScopedClasses['brand-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "brand-name" },
});
/** @type {__VLS_StyleScopedClasses['brand-name']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "progress-section" },
});
/** @type {__VLS_StyleScopedClasses['progress-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ring-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['ring-wrapper']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "ring" },
    viewBox: "0 0 60 60",
});
/** @type {__VLS_StyleScopedClasses['ring']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
    cx: "30",
    cy: "30",
    r: "24",
    fill: "none",
    stroke: "var(--beige-200)",
    'stroke-width': "5",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
    cx: "30",
    cy: "30",
    r: "24",
    fill: "none",
    stroke: "var(--blue-500)",
    'stroke-width': "5",
    'stroke-linecap': "round",
    'stroke-dasharray': "150.8",
    'stroke-dashoffset': (150.8 - (150.8 * __VLS_ctx.completionRate / 100)),
    transform: "rotate(-90 30 30)",
    ...{ style: {} },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ring-label" },
});
/** @type {__VLS_StyleScopedClasses['ring-label']} */ ;
(__VLS_ctx.completionRate);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "ring-desc" },
});
/** @type {__VLS_StyleScopedClasses['ring-desc']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "nav" },
});
/** @type {__VLS_StyleScopedClasses['nav']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.navItems))) {
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        key: (item.path),
        to: (item.path),
        ...{ class: "nav-item" },
        ...{ class: ({ active: __VLS_ctx.route.path === item.path }) },
    }));
    const __VLS_2 = __VLS_1({
        key: (item.path),
        to: (item.path),
        ...{ class: "nav-item" },
        ...{ class: ({ active: __VLS_ctx.route.path === item.path }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    const { default: __VLS_5 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "nav-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['nav-icon']} */ ;
    (item.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "nav-label" },
    });
    /** @type {__VLS_StyleScopedClasses['nav-label']} */ ;
    (item.label);
    // @ts-ignore
    [completionRate, completionRate, navItems, route,];
    var __VLS_3;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "sidebar-footer" },
});
/** @type {__VLS_StyleScopedClasses['sidebar-footer']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "mobile-nav" },
});
/** @type {__VLS_StyleScopedClasses['mobile-nav']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.navItems))) {
    let __VLS_6;
    /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        key: (item.path),
        to: (item.path),
        ...{ class: "mobile-nav-item" },
        ...{ class: ({ active: __VLS_ctx.route.path === item.path }) },
    }));
    const __VLS_8 = __VLS_7({
        key: (item.path),
        to: (item.path),
        ...{ class: "mobile-nav-item" },
        ...{ class: ({ active: __VLS_ctx.route.path === item.path }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    /** @type {__VLS_StyleScopedClasses['mobile-nav-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    const { default: __VLS_11 } = __VLS_9.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (item.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "mobile-nav-label" },
    });
    /** @type {__VLS_StyleScopedClasses['mobile-nav-label']} */ ;
    (item.label.split(' ')[0]);
    // @ts-ignore
    [navItems, route,];
    var __VLS_9;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "main" },
});
/** @type {__VLS_StyleScopedClasses['main']} */ ;
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.RouterView | typeof __VLS_components.RouterView} */
RouterView;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
{
    const { default: __VLS_17 } = __VLS_15.slots;
    const [{ Component }] = __VLS_vSlot(__VLS_17);
    let __VLS_18;
    /** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
    Transition;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
        name: "fade",
        mode: "out-in",
    }));
    const __VLS_20 = __VLS_19({
        name: "fade",
        mode: "out-in",
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    const { default: __VLS_23 } = __VLS_21.slots;
    const __VLS_24 = (Component);
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({}));
    const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
    // @ts-ignore
    [];
    var __VLS_21;
    // @ts-ignore
    [];
    __VLS_15.slots['' /* empty slot name completion */];
}
var __VLS_15;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
