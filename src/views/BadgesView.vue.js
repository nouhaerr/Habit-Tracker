import { useHabits } from '../composables/useHabits';
import { useBadges } from '../composables/useBadges';
const { habits } = useHabits();
const { badges, earnedCount } = useBadges(habits);
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['badge-card']} */ ;
/** @type {__VLS_StyleScopedClasses['badge-card']} */ ;
/** @type {__VLS_StyleScopedClasses['badge-card']} */ ;
/** @type {__VLS_StyleScopedClasses['badge-icon-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['earned']} */ ;
/** @type {__VLS_StyleScopedClasses['badge-status']} */ ;
/** @type {__VLS_StyleScopedClasses['locked']} */ ;
/** @type {__VLS_StyleScopedClasses['badges-grid']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "badges-page" },
});
/** @type {__VLS_StyleScopedClasses['badges-page']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "page-header" },
});
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
(__VLS_ctx.earnedCount);
(__VLS_ctx.badges.length);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "progress-banner" },
});
/** @type {__VLS_StyleScopedClasses['progress-banner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "banner-bar" },
});
/** @type {__VLS_StyleScopedClasses['banner-bar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "banner-fill" },
    ...{ style: ({ width: (__VLS_ctx.earnedCount / __VLS_ctx.badges.length * 100) + '%' }) },
});
/** @type {__VLS_StyleScopedClasses['banner-fill']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "banner-label" },
});
/** @type {__VLS_StyleScopedClasses['banner-label']} */ ;
(Math.round(__VLS_ctx.earnedCount / __VLS_ctx.badges.length * 100));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "badges-grid" },
});
/** @type {__VLS_StyleScopedClasses['badges-grid']} */ ;
for (const [badge] of __VLS_vFor((__VLS_ctx.badges))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (badge.id),
        ...{ class: "badge-card" },
        ...{ class: ({ earned: badge.earned, locked: !badge.earned }) },
    });
    /** @type {__VLS_StyleScopedClasses['badge-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['earned']} */ ;
    /** @type {__VLS_StyleScopedClasses['locked']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "badge-icon-wrap" },
        ...{ class: ({ earned: badge.earned }) },
    });
    /** @type {__VLS_StyleScopedClasses['badge-icon-wrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['earned']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "badge-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['badge-icon']} */ ;
    (badge.earned ? badge.icon : '🔒');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "badge-info" },
    });
    /** @type {__VLS_StyleScopedClasses['badge-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "badge-name" },
    });
    /** @type {__VLS_StyleScopedClasses['badge-name']} */ ;
    (badge.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "badge-desc" },
    });
    /** @type {__VLS_StyleScopedClasses['badge-desc']} */ ;
    (badge.description);
    if (badge.earned) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "badge-status" },
        });
        /** @type {__VLS_StyleScopedClasses['badge-status']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "badge-status locked" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vElse, ", {} as import('vue').ObjectDirective)(null!, { ...__VLS_directiveBindingRestFields,  }, null!, null!););
    /** @type {__VLS_StyleScopedClasses['locked']} */ ;
    // @ts-ignore
    [earnedCount, earnedCount, earnedCount, badges, badges, badges, badges, vElse, ",];];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
