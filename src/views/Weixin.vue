<template>
  <div class="weixin-container">
    <el-alert
        title="微信公众号平台登录状态"
        :closable="false"
        type="primary"
        show-icon
    />

    <!-- 操作按钮行 -->
    <div class="button-row">
      <el-button
          :loading="loading.startBrowser"
          :disabled="statusData.browser"
          @click="handleStartBrowser"
      >
        启动浏览器
      </el-button>

      <el-button
          :loading="loading.stopBrowser"
          :disabled="!statusData.browser"
          @click="handleStopBrowser"
      >
        关闭浏览器
      </el-button>

      <el-button
          :loading="loading.refreshQrcode"
          :disabled="!statusData.browser"
          @click="handleRefreshQrcode"
      >
        刷新二维码
      </el-button>

      <el-button
          :loading="loading.refreshLogin"
          :disabled="!statusData.browser"
          @click="handleRefreshLogin"
      >
        检测登录状态
      </el-button>

      <el-button
          :loading="loading.status"
          @click="handleRefreshStatus"
      >
        刷新状态
      </el-button>
    </div>

    <!-- 二维码卡片 -->
    <el-card>
      <template #header>
        <div class="card-header">
          <div class="status-info">
            <span class="status-item">
              上次登录时间：{{ formatLoginTime(statusData.last_login) }}
            </span>
            <span class="status-item">
              登录状态：<span :style="{ color: cookieStatusColor }">{{ cookieStatus }}</span>
            </span>
            <span class="status-item">
              浏览器：<span :style="{ color: browserStatusColor }">{{ browserStatus }}</span>
            </span>
          </div>
        </div>
      </template>

      <div class="qrcode-container">
        <div v-if="statusData.qr_code" class="qrcode-wrapper">
          <img
              :src="`data:image/png;base64,${statusData.qr_code}`"
              alt="微信登录二维码"
              class="qrcode-image"
          />
          <p class="qrcode-tip">请使用微信扫描二维码登录</p>
        </div>
        <div v-else class="no-qrcode">
          <el-icon class="no-qrcode-icon"><Picture /></el-icon>
          <p class="no-qrcode-text">暂无二维码</p>
          <p class="no-qrcode-desc">请先启动浏览器并刷新二维码</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Picture } from '@element-plus/icons-vue'
import {
  fetchWeixinStatus,
  startBrowser,
  stopBrowser,
  refreshQrcode,
  refreshLoginStatus
} from '@/api/weixin'

interface WeixinStatus {
  last_login: string
  cookies: any[]
  qr_code: string
  browser: boolean
}

const statusData = ref<WeixinStatus>({
  last_login: '',
  cookies: [],
  qr_code: '',
  browser: false
})

const loading = ref({
  status: false,
  startBrowser: false,
  stopBrowser: false,
  refreshQrcode: false,
  refreshLogin: false
})

// 计算属性
const cookieStatus = computed(() => {
  return statusData.value.cookies && statusData.value.cookies.length > 0 ? '有效' : '无效'
})

const cookieStatusColor = computed(() => {
  return statusData.value.cookies && statusData.value.cookies.length > 0 ? '#67C23A' : '#F56C6C'
})

const browserStatus = computed(() => {
  return statusData.value.browser ? '已启动' : '未启动'
})

const browserStatusColor = computed(() => {
  return statusData.value.browser ? '#67C23A' : '#F56C6C'
})

// 格式化登录时间
const formatLoginTime = (timeStr: string) => {
  if (!timeStr) return '暂无记录'
  try {
    const date = new Date(timeStr)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return '格式错误'
  }
}

// 获取状态
const loadStatus = async () => {
  loading.value.status = true
  try {
    const response = await fetchWeixinStatus()
    statusData.value = response.data
  } catch (error) {
    console.error('获取状态失败:', error)
    ElMessage.error('获取状态失败')
  } finally {
    loading.value.status = false
  }
}

// 启动浏览器
const handleStartBrowser = async () => {
  loading.value.startBrowser = true
  try {
    const response = await startBrowser()
    statusData.value = response.data
    ElMessage.success('浏览器启动成功')
  } catch (error) {
    console.error('启动浏览器失败:', error)
    ElMessage.error('启动浏览器失败')
  } finally {
    loading.value.startBrowser = false
  }
}

// 关闭浏览器
const handleStopBrowser = async () => {
  loading.value.stopBrowser = true
  try {
    const response = await stopBrowser()
    statusData.value = response.data
    ElMessage.success('浏览器关闭成功')
  } catch (error) {
    console.error('关闭浏览器失败:', error)
    ElMessage.error('关闭浏览器失败')
  } finally {
    loading.value.stopBrowser = false
  }
}

// 刷新二维码
const handleRefreshQrcode = async () => {
  loading.value.refreshQrcode = true
  try {
    const response = await refreshQrcode()
    statusData.value = response.data
    ElMessage.success('二维码刷新成功')
  } catch (error) {
    console.error('刷新二维码失败:', error)
    ElMessage.error('刷新二维码失败')
  } finally {
    loading.value.refreshQrcode = false
  }
}

// 检测登录状态
const handleRefreshLogin = async () => {
  loading.value.refreshLogin = true
  try {
    const response = await refreshLoginStatus()
    statusData.value = response.data
    ElMessage.success('登录状态检测完成')
  } catch (error) {
    console.error('检测登录状态失败:', error)
    ElMessage.error('检测登录状态失败')
  } finally {
    loading.value.refreshLogin = false
  }
}

// 刷新状态
const handleRefreshStatus = async () => {
  await loadStatus()
  ElMessage.success('状态刷新成功')
}

onMounted(() => {
  loadStatus()
})
</script>

<style scoped>
.weixin-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.el-alert {
  margin-bottom: 20px;
}

/* 按钮行样式 */
.button-row {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

/* 卡片头部样式 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.status-info {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.status-item {
  font-size: 14px;
  color: var(--el-text-color-regular);
  white-space: nowrap;
}

/* 二维码样式 */
.qrcode-container {
  text-align: center;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qrcode-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qrcode-image {
  width: 200px;
  height: 200px;
  border: 1px solid var(--el-border-color-light);
  border-radius: var(--el-border-radius-base);
  margin-bottom: 12px;
  object-fit: contain;
}

.qrcode-tip {
  color: var(--el-text-color-regular);
  font-size: 14px;
  margin: 0;
}

.no-qrcode {
  color: var(--el-text-color-placeholder);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.no-qrcode-icon {
  font-size: 48px;
  margin-bottom: 12px;
  color: var(--el-color-info-light-5);
}

.no-qrcode-text {
  font-size: 14px;
  margin: 0 0 4px 0;
  color: var(--el-text-color-regular);
}

.no-qrcode-desc {
  font-size: 12px;
  margin: 0;
  color: var(--el-text-color-placeholder);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .status-info {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
