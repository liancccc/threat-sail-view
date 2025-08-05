import { ref, onMounted } from 'vue';
import MarkdownIt from 'markdown-it';
const props = defineProps({
    content: {
        type: String,
        default: ''
    },
    src: {
        type: String,
        default: ''
    }
});
const md = new MarkdownIt({
    html: true, // 允许HTML标签
    linkify: true, // 自动转换URL为链接
    typographer: true // 优化排版
});
const compiledMarkdown = ref('');
const renderMarkdown = async () => {
    if (props.src) {
        const response = await fetch(props.src);
        const text = await response.text();
        compiledMarkdown.value = md.render(text);
    }
    else {
        compiledMarkdown.value = md.render(props.content);
    }
};
onMounted(() => {
    renderMarkdown();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "markdown-container" },
});
__VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.compiledMarkdown) }, null, null);
/** @type {__VLS_StyleScopedClasses['markdown-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            compiledMarkdown: compiledMarkdown,
        };
    },
    props: {
        content: {
            type: String,
            default: ''
        },
        src: {
            type: String,
            default: ''
        }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        content: {
            type: String,
            default: ''
        },
        src: {
            type: String,
            default: ''
        }
    },
});
; /* PartiallyEnd: #4569/main.vue */
