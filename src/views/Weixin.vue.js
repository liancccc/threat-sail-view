import { ref, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { Picture } from '@element-plus/icons-vue';
import { fetchWeixinStatus, startBrowser, stopBrowser, refreshQrcode, refreshLoginStatus } from '@/api/weixin';
const statusData = ref({
    last_login: '',
    cookies: [],
    qr_code: '',
    browser: false
});
const loading = ref({
    status: false,
    startBrowser: false,
    stopBrowser: false,
    refreshQrcode: false,
    refreshLogin: false
});
// 计算属性
const cookieStatus = computed(() => {
    return statusData.value.cookies && statusData.value.cookies.length > 0 ? '有效' : '无效';
});
const cookieStatusColor = computed(() => {
    return statusData.value.cookies && statusData.value.cookies.length > 0 ? '#67C23A' : '#F56C6C';
});
const browserStatus = computed(() => {
    return statusData.value.browser ? '已启动' : '未启动';
});
const browserStatusColor = computed(() => {
    return statusData.value.browser ? '#67C23A' : '#F56C6C';
});
// 格式化登录时间
const formatLoginTime = (timeStr) => {
    if (!timeStr)
        return '暂无记录';
    try {
        const date = new Date(timeStr);
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    catch {
        return '格式错误';
    }
};
// 获取状态
const loadStatus = async () => {
    loading.value.status = true;
    try {
        const response = await fetchWeixinStatus();
        statusData.value = response.data;
    }
    catch (error) {
        console.error('获取状态失败:', error);
        ElMessage.error('获取状态失败');
    }
    finally {
        loading.value.status = false;
    }
};
// 启动浏览器
const handleStartBrowser = async () => {
    loading.value.startBrowser = true;
    try {
        const response = await startBrowser();
        statusData.value = response.data;
        ElMessage.success('浏览器启动成功');
    }
    catch (error) {
        console.error('启动浏览器失败:', error);
        ElMessage.error('启动浏览器失败');
    }
    finally {
        loading.value.startBrowser = false;
    }
};
// 关闭浏览器
const handleStopBrowser = async () => {
    loading.value.stopBrowser = true;
    try {
        const response = await stopBrowser();
        statusData.value = response.data;
        ElMessage.success('浏览器关闭成功');
    }
    catch (error) {
        console.error('关闭浏览器失败:', error);
        ElMessage.error('关闭浏览器失败');
    }
    finally {
        loading.value.stopBrowser = false;
    }
};
// 刷新二维码
const handleRefreshQrcode = async () => {
    loading.value.refreshQrcode = true;
    try {
        const response = await refreshQrcode();
        statusData.value = response.data;
        ElMessage.success('二维码刷新成功');
    }
    catch (error) {
        console.error('刷新二维码失败:', error);
        ElMessage.error('刷新二维码失败');
    }
    finally {
        loading.value.refreshQrcode = false;
    }
};
// 检测登录状态
const handleRefreshLogin = async () => {
    loading.value.refreshLogin = true;
    try {
        const response = await refreshLoginStatus();
        statusData.value = response.data;
        ElMessage.success('登录状态检测完成');
    }
    catch (error) {
        console.error('检测登录状态失败:', error);
        ElMessage.error('检测登录状态失败');
    }
    finally {
        loading.value.refreshLogin = false;
    }
};
// 刷新状态
const handleRefreshStatus = async () => {
    await loadStatus();
    ElMessage.success('状态刷新成功');
};
onMounted(() => {
    loadStatus();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['status-info']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "weixin-container" },
});
const __VLS_0 = {}.ElAlert;
/** @type {[typeof __VLS_components.ElAlert, typeof __VLS_components.elAlert, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    title: "微信公众号平台登录状态",
    closable: (false),
    type: "primary",
    showIcon: true,
}));
const __VLS_2 = __VLS_1({
    title: "微信公众号平台登录状态",
    closable: (false),
    type: "primary",
    showIcon: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-row" },
});
const __VLS_4 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.loading.startBrowser),
    disabled: (__VLS_ctx.statusData.browser),
}));
const __VLS_6 = __VLS_5({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.loading.startBrowser),
    disabled: (__VLS_ctx.statusData.browser),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    onClick: (__VLS_ctx.handleStartBrowser)
};
__VLS_7.slots.default;
var __VLS_7;
const __VLS_12 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.loading.stopBrowser),
    disabled: (!__VLS_ctx.statusData.browser),
}));
const __VLS_14 = __VLS_13({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.loading.stopBrowser),
    disabled: (!__VLS_ctx.statusData.browser),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_16;
let __VLS_17;
let __VLS_18;
const __VLS_19 = {
    onClick: (__VLS_ctx.handleStopBrowser)
};
__VLS_15.slots.default;
var __VLS_15;
const __VLS_20 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.loading.refreshQrcode),
    disabled: (!__VLS_ctx.statusData.browser),
}));
const __VLS_22 = __VLS_21({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.loading.refreshQrcode),
    disabled: (!__VLS_ctx.statusData.browser),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
let __VLS_24;
let __VLS_25;
let __VLS_26;
const __VLS_27 = {
    onClick: (__VLS_ctx.handleRefreshQrcode)
};
__VLS_23.slots.default;
var __VLS_23;
const __VLS_28 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.loading.refreshLogin),
    disabled: (!__VLS_ctx.statusData.browser),
}));
const __VLS_30 = __VLS_29({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.loading.refreshLogin),
    disabled: (!__VLS_ctx.statusData.browser),
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_32;
let __VLS_33;
let __VLS_34;
const __VLS_35 = {
    onClick: (__VLS_ctx.handleRefreshLogin)
};
__VLS_31.slots.default;
var __VLS_31;
const __VLS_36 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.loading.status),
}));
const __VLS_38 = __VLS_37({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.loading.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_40;
let __VLS_41;
let __VLS_42;
const __VLS_43 = {
    onClick: (__VLS_ctx.handleRefreshStatus)
};
__VLS_39.slots.default;
var __VLS_39;
const __VLS_44 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_47.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "status-info" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "status-item" },
    });
    (__VLS_ctx.formatLoginTime(__VLS_ctx.statusData.last_login));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "status-item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ style: ({ color: __VLS_ctx.cookieStatusColor }) },
    });
    (__VLS_ctx.cookieStatus);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "status-item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ style: ({ color: __VLS_ctx.browserStatusColor }) },
    });
    (__VLS_ctx.browserStatus);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "qrcode-container" },
});
if (__VLS_ctx.statusData.qr_code) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "qrcode-wrapper" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (`data:image/png;base64,${__VLS_ctx.statusData.qr_code}`),
        alt: "微信登录二维码",
        ...{ class: "qrcode-image" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "qrcode-tip" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "no-qrcode" },
    });
    const __VLS_48 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        ...{ class: "no-qrcode-icon" },
    }));
    const __VLS_50 = __VLS_49({
        ...{ class: "no-qrcode-icon" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    __VLS_51.slots.default;
    const __VLS_52 = {}.Picture;
    /** @type {[typeof __VLS_components.Picture, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({}));
    const __VLS_54 = __VLS_53({}, ...__VLS_functionalComponentArgsRest(__VLS_53));
    var __VLS_51;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "no-qrcode-text" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "no-qrcode-desc" },
    });
}
var __VLS_47;
/** @type {__VLS_StyleScopedClasses['weixin-container']} */ ;
/** @type {__VLS_StyleScopedClasses['button-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['status-info']} */ ;
/** @type {__VLS_StyleScopedClasses['status-item']} */ ;
/** @type {__VLS_StyleScopedClasses['status-item']} */ ;
/** @type {__VLS_StyleScopedClasses['status-item']} */ ;
/** @type {__VLS_StyleScopedClasses['qrcode-container']} */ ;
/** @type {__VLS_StyleScopedClasses['qrcode-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['qrcode-image']} */ ;
/** @type {__VLS_StyleScopedClasses['qrcode-tip']} */ ;
/** @type {__VLS_StyleScopedClasses['no-qrcode']} */ ;
/** @type {__VLS_StyleScopedClasses['no-qrcode-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['no-qrcode-text']} */ ;
/** @type {__VLS_StyleScopedClasses['no-qrcode-desc']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Picture: Picture,
            statusData: statusData,
            loading: loading,
            cookieStatus: cookieStatus,
            cookieStatusColor: cookieStatusColor,
            browserStatus: browserStatus,
            browserStatusColor: browserStatusColor,
            formatLoginTime: formatLoginTime,
            handleStartBrowser: handleStartBrowser,
            handleStopBrowser: handleStopBrowser,
            handleRefreshQrcode: handleRefreshQrcode,
            handleRefreshLogin: handleRefreshLogin,
            handleRefreshStatus: handleRefreshStatus,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
