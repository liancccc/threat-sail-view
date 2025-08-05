import { ref, onMounted } from 'vue';
import { fetchDataList, fetchDataTags } from '@/api/data';
// 数据状态
const threatData = ref({
    items: [],
    total: 0
});
// 搜索和分页参数
const searchText = ref('');
const selectedTags = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const loading = ref(false);
// 可用标签列表
const availableTags = ref([]);
// 添加标签到筛选条件
const addTagToFilter = (tag) => {
    if (!selectedTags.value.includes(tag)) {
        selectedTags.value = [...selectedTags.value, tag];
    }
};
// 日期时间格式化
const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Shanghai'
    };
    const formatter = new Intl.DateTimeFormat('zh-CN', options);
    const parts = formatter.formatToParts(date);
    const year = parts.find(p => p.type === 'year')?.value;
    const month = parts.find(p => p.type === 'month')?.value;
    const day = parts.find(p => p.type === 'day')?.value;
    const hour = parts.find(p => p.type === 'hour')?.value;
    const minute = parts.find(p => p.type === 'minute')?.value;
    return `${year}-${month}-${day} ${hour}:${minute}`;
};
const openLink = (url) => {
    window.open(url, '_blank');
};
const fetchData = async () => {
    loading.value = true;
    try {
        const res = await fetchDataList({
            search: searchText.value,
            tags: selectedTags.value,
            page: currentPage.value,
            limit: pageSize.value
        });
        threatData.value = {
            items: res.items,
            total: res.total
        };
    }
    catch (error) {
        console.error('获取数据失败:', error);
    }
    finally {
        loading.value = false;
    }
};
// 获取所有标签
const fetchTags = async () => {
    try {
        const res = await fetchDataTags();
        availableTags.value = res.tags;
    }
    catch (error) {
        console.error('获取标签失败:', error);
    }
};
// 搜索处理
const handleSearch = () => {
    currentPage.value = 1;
    fetchData();
};
// 重置搜索
const handleReset = () => {
    searchText.value = '';
    selectedTags.value = [];
    handleSearch();
};
// 分页变化
const handlePageChange = () => {
    scrollToTop();
    fetchData();
};
// 滚动到顶部函数
const scrollToTop = () => {
    window.scrollTo(0, 0);
};
// 初始化
onMounted(() => {
    fetchData();
    fetchTags();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['desc-text']} */ ;
/** @type {__VLS_StyleScopedClasses['create-time']} */ ;
/** @type {__VLS_StyleScopedClasses['create-time']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "home-container" },
});
const __VLS_0 = {}.ElAlert;
/** @type {[typeof __VLS_components.ElAlert, typeof __VLS_components.elAlert, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    title: "展示关于安全漏洞、博客、推文、公众号等, 基于 AI 实现信息过滤与总结 .",
    closable: (false),
    type: "primary",
    showIcon: true,
}));
const __VLS_2 = __VLS_1({
    title: "展示关于安全漏洞、博客、推文、公众号等, 基于 AI 实现信息过滤与总结 .",
    closable: (false),
    type: "primary",
    showIcon: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "search-area" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "search-controls" },
});
const __VLS_4 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    modelValue: (__VLS_ctx.searchText),
    placeholder: "关键词",
    clearable: true,
    ...{ style: {} },
}));
const __VLS_6 = __VLS_5({
    modelValue: (__VLS_ctx.searchText),
    placeholder: "关键词",
    clearable: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
const __VLS_8 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    modelValue: (__VLS_ctx.selectedTags),
    multiple: true,
    filterable: true,
    collapseTags: true,
    placeholder: "标签",
    ...{ style: {} },
}));
const __VLS_10 = __VLS_9({
    modelValue: (__VLS_ctx.selectedTags),
    multiple: true,
    filterable: true,
    collapseTags: true,
    placeholder: "标签",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
for (const [tag] of __VLS_getVForSourceType((__VLS_ctx.availableTags))) {
    const __VLS_12 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        key: (tag),
        label: (tag),
        value: (tag),
    }));
    const __VLS_14 = __VLS_13({
        key: (tag),
        label: (tag),
        value: (tag),
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
}
var __VLS_11;
const __VLS_16 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onClick: (__VLS_ctx.handleSearch)
};
__VLS_19.slots.default;
var __VLS_19;
const __VLS_24 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_26 = __VLS_25({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_28;
let __VLS_29;
let __VLS_30;
const __VLS_31 = {
    onClick: (__VLS_ctx.handleReset)
};
__VLS_27.slots.default;
var __VLS_27;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "data-container" },
});
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const __VLS_32 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    gutter: (16),
}));
const __VLS_34 = __VLS_33({
    gutter: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.threatData.items))) {
    const __VLS_36 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        span: (24),
    }));
    const __VLS_38 = __VLS_37({
        span: (24),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_39.slots.default;
    const __VLS_40 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        ...{ class: "data-card" },
        shadow: "hover",
    }));
    const __VLS_42 = __VLS_41({
        ...{ class: "data-card" },
        shadow: "hover",
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_43.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-top" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-meta" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "create-time" },
    });
    (__VLS_ctx.formatDateTime(item.created_at));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tags-area" },
    });
    for (const [tag] of __VLS_getVForSourceType((item.tags))) {
        const __VLS_44 = {}.ElTag;
        /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
        // @ts-ignore
        const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
            ...{ 'onClick': {} },
            key: (tag),
            size: "small",
            ...{ style: {} },
        }));
        const __VLS_46 = __VLS_45({
            ...{ 'onClick': {} },
            key: (tag),
            size: "small",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_45));
        let __VLS_48;
        let __VLS_49;
        let __VLS_50;
        const __VLS_51 = {
            onClick: (...[$event]) => {
                __VLS_ctx.addTagToFilter(tag);
            }
        };
        __VLS_47.slots.default;
        (tag);
        var __VLS_47;
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-actions" },
    });
    const __VLS_52 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        ...{ 'onClick': {} },
        type: (item.link ? 'primary' : 'info'),
        size: "small",
        disabled: (!item.link),
    }));
    const __VLS_54 = __VLS_53({
        ...{ 'onClick': {} },
        type: (item.link ? 'primary' : 'info'),
        size: "small",
        disabled: (!item.link),
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    let __VLS_56;
    let __VLS_57;
    let __VLS_58;
    const __VLS_59 = {
        onClick: (...[$event]) => {
            __VLS_ctx.openLink(item.link);
        }
    };
    __VLS_55.slots.default;
    var __VLS_55;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "desc-text" },
    });
    if (item.desc) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
        (item.desc);
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
    }
    var __VLS_43;
    var __VLS_39;
}
var __VLS_35;
if (!__VLS_ctx.loading && __VLS_ctx.threatData.items.length === 0) {
    const __VLS_60 = {}.ElEmpty;
    /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        description: "暂无数据",
    }));
    const __VLS_62 = __VLS_61({
        description: "暂无数据",
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
}
if (__VLS_ctx.threatData.total > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pagination" },
    });
    const __VLS_64 = {}.ElPagination;
    /** @type {[typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, ]} */ ;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
        ...{ 'onSizeChange': {} },
        ...{ 'onCurrentChange': {} },
        currentPage: (__VLS_ctx.currentPage),
        pageSize: (__VLS_ctx.pageSize),
        total: (__VLS_ctx.threatData.total),
        pageSizes: ([10, 20, 50, 100]),
        layout: "total, sizes, prev, pager, next",
        background: true,
    }));
    const __VLS_66 = __VLS_65({
        ...{ 'onSizeChange': {} },
        ...{ 'onCurrentChange': {} },
        currentPage: (__VLS_ctx.currentPage),
        pageSize: (__VLS_ctx.pageSize),
        total: (__VLS_ctx.threatData.total),
        pageSizes: ([10, 20, 50, 100]),
        layout: "total, sizes, prev, pager, next",
        background: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    let __VLS_68;
    let __VLS_69;
    let __VLS_70;
    const __VLS_71 = {
        onSizeChange: (__VLS_ctx.handleSearch)
    };
    const __VLS_72 = {
        onCurrentChange: (__VLS_ctx.handlePageChange)
    };
    var __VLS_67;
}
/** @type {__VLS_StyleScopedClasses['home-container']} */ ;
/** @type {__VLS_StyleScopedClasses['search-area']} */ ;
/** @type {__VLS_StyleScopedClasses['search-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['data-container']} */ ;
/** @type {__VLS_StyleScopedClasses['data-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-top']} */ ;
/** @type {__VLS_StyleScopedClasses['card-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['create-time']} */ ;
/** @type {__VLS_StyleScopedClasses['tags-area']} */ ;
/** @type {__VLS_StyleScopedClasses['card-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['desc-text']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            threatData: threatData,
            searchText: searchText,
            selectedTags: selectedTags,
            currentPage: currentPage,
            pageSize: pageSize,
            loading: loading,
            availableTags: availableTags,
            addTagToFilter: addTagToFilter,
            formatDateTime: formatDateTime,
            openLink: openLink,
            handleSearch: handleSearch,
            handleReset: handleReset,
            handlePageChange: handlePageChange,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
