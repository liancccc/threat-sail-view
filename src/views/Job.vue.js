import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { listJobs, reloadJob } from '@/api/job';
const loading = ref(false);
const reloadingId = ref(null);
const jobs = ref([]);
const total = ref(0);
// 格式化时间显示
const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
};
// 获取任务列表
const fetchJobs = async () => {
    try {
        loading.value = true;
        const response = await listJobs();
        jobs.value = response.items;
        total.value = response.total;
    }
    catch (error) {
        ElMessage.error('获取任务列表失败: ' + error.message);
    }
    finally {
        loading.value = false;
    }
};
// 重新加载任务
const handleReload = async (id) => {
    try {
        reloadingId.value = id;
        await reloadJob(id);
        ElMessage.success('任务重新加载成功');
        await fetchJobs(); // 刷新列表
    }
    catch (error) {
        ElMessage.error('重新加载任务失败: ' + error.message);
    }
    finally {
        reloadingId.value = null;
    }
};
// 初始化加载数据
onMounted(() => {
    fetchJobs();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "jobs-container" },
});
const __VLS_0 = {}.ElAlert;
/** @type {[typeof __VLS_components.ElAlert, typeof __VLS_components.elAlert, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    title: (`展示正在运行的爬虫任务, 目前共 ${__VLS_ctx.total} 个任务`),
    closable: (false),
    type: "primary",
    showIcon: true,
}));
const __VLS_2 = __VLS_1({
    title: (`展示正在运行的爬虫任务, 目前共 ${__VLS_ctx.total} 个任务`),
    closable: (false),
    type: "primary",
    showIcon: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_4 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    data: (__VLS_ctx.jobs),
    ...{ style: {} },
    stripe: true,
}));
const __VLS_6 = __VLS_5({
    data: (__VLS_ctx.jobs),
    ...{ style: {} },
    stripe: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
__VLS_7.slots.default;
const __VLS_8 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    prop: "id",
    label: "ID",
    minWidth: "220",
}));
const __VLS_10 = __VLS_9({
    prop: "id",
    label: "ID",
    minWidth: "220",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const __VLS_12 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    label: "下次执行时间",
    minWidth: "200",
}));
const __VLS_14 = __VLS_13({
    label: "下次执行时间",
    minWidth: "200",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_15.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.formatDateTime(row.next_run_time));
}
var __VLS_15;
const __VLS_16 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    prop: "interval",
    label: "执行间隔",
    minWidth: "120",
}));
const __VLS_18 = __VLS_17({
    prop: "interval",
    label: "执行间隔",
    minWidth: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const __VLS_20 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    label: "操作",
    width: "120",
}));
const __VLS_22 = __VLS_21({
    label: "操作",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_23.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_24 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
        loading: (__VLS_ctx.reloadingId === row.id),
    }));
    const __VLS_26 = __VLS_25({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
        loading: (__VLS_ctx.reloadingId === row.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    let __VLS_28;
    let __VLS_29;
    let __VLS_30;
    const __VLS_31 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleReload(row.id);
        }
    };
    __VLS_27.slots.default;
    var __VLS_27;
}
var __VLS_23;
var __VLS_7;
/** @type {__VLS_StyleScopedClasses['jobs-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            loading: loading,
            reloadingId: reloadingId,
            jobs: jobs,
            total: total,
            formatDateTime: formatDateTime,
            handleReload: handleReload,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
