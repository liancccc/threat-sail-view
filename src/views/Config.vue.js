import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { yaml } from '@codemirror/lang-yaml';
import { EditorView } from '@codemirror/view';
import { Codemirror } from 'vue-codemirror';
import { fetchConfig, saveConfig } from '@/api/config';
// 编辑器配置
const extensions = [
    yaml(),
    EditorView.theme({}, { dark: false })
];
// 状态管理
const configContent = ref('');
const error = ref('');
const saving = ref(false);
// 获取配置
const loadConfig = async () => {
    try {
        const res = await fetchConfig();
        configContent.value = res.content;
        if (res.error) {
            error.value = `加载失败: ${res.error}`;
        }
    }
    catch (err) {
        error.value = '加载失败: 服务器错误';
    }
};
// 保存配置
const handleSave = async () => {
    saving.value = true;
    error.value = '';
    try {
        const res = await saveConfig(configContent.value);
        if (res.error) {
            throw new Error(res.error);
        }
        ElMessage.success('保存成功');
    }
    catch (err) {
        error.value = `保存失败: ${err instanceof Error ? err.message : '未知错误'}`;
    }
    finally {
        saving.value = false;
    }
};
// 初始化加载
onMounted(loadConfig);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "config-management" },
});
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "plain-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "title-text" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    const __VLS_4 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
        loading: (__VLS_ctx.saving),
    }));
    const __VLS_6 = __VLS_5({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
        loading: (__VLS_ctx.saving),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    let __VLS_8;
    let __VLS_9;
    let __VLS_10;
    const __VLS_11 = {
        onClick: (__VLS_ctx.handleSave)
    };
    __VLS_7.slots.default;
    var __VLS_7;
}
if (__VLS_ctx.error) {
    const __VLS_12 = {}.ElAlert;
    /** @type {[typeof __VLS_components.ElAlert, typeof __VLS_components.elAlert, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        ...{ 'onClose': {} },
        title: (__VLS_ctx.error),
        type: "error",
        showIcon: true,
    }));
    const __VLS_14 = __VLS_13({
        ...{ 'onClose': {} },
        title: (__VLS_ctx.error),
        type: "error",
        showIcon: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    let __VLS_16;
    let __VLS_17;
    let __VLS_18;
    const __VLS_19 = {
        onClose: (...[$event]) => {
            if (!(__VLS_ctx.error))
                return;
            __VLS_ctx.error = '';
        }
    };
    var __VLS_15;
}
const __VLS_20 = {}.codemirror;
/** @type {[typeof __VLS_components.Codemirror, typeof __VLS_components.codemirror, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    modelValue: (__VLS_ctx.configContent),
    ...{ style: ({ height: '70vh' }) },
    extensions: (__VLS_ctx.extensions),
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.configContent),
    ...{ style: ({ height: '70vh' }) },
    extensions: (__VLS_ctx.extensions),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['config-management']} */ ;
/** @type {__VLS_StyleScopedClasses['plain-header']} */ ;
/** @type {__VLS_StyleScopedClasses['title-text']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Codemirror: Codemirror,
            extensions: extensions,
            configContent: configContent,
            error: error,
            saving: saving,
            handleSave: handleSave,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
