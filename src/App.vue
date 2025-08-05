<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <el-menu
        mode="horizontal"
        :default-active="activeMenu"
        @select="handleMenuSelect"
        style="position: fixed; top: 0; left: 0; right: 0; z-index: 50;"
    >
      <el-menu-item index="">
        <svg width="80" height="40" xmlns="http://www.w3.org/2000/svg">
          <text x="40" y="28"
                font-family="PingFang SC, Microsoft YaHei, sans-serif"
                font-size="22"
                font-weight="600"
                text-anchor="middle"
                fill="#409EFF">菜菜</text>
        </svg>
      </el-menu-item>
      <el-menu-item index="/">
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/stats">
        <span>统计</span>
      </el-menu-item>
      <!-- 只有登录后才显示配置和爬虫菜单 -->
      <el-menu-item v-if="isLoggedIn" index="/config">
        <span>配置</span>
      </el-menu-item>
      <!-- 在 App.vue 的菜单中添加微信选项 -->
      <el-menu-item v-if="isLoggedIn" index="/weixin">
        <span>微信</span>
      </el-menu-item>
      <el-menu-item v-if="isLoggedIn" index="/job">
        <span>爬虫</span>
      </el-menu-item>
      <el-menu-item index="/about">
        <span>关于</span>
      </el-menu-item>
    </el-menu>

    <!-- 主要内容区 -->
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const activeMenu = ref(route.path)
const isLoggedIn = ref(false)

// 检查登录状态
const checkLoginStatus = () => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
}

// 监听路由变化更新菜单选中状态
watch(
    () => route.path,
    (newPath) => {
      activeMenu.value = newPath
    }
)

const handleMenuSelect = (index: string) => {
  if (!isLoggedIn.value && (index === '/config' || index === '/job' || index === '/weixin')) {
    router.push('/')
    return
  }
  router.push(index)
}

// 监听 localStorage 变化（用于登录后更新状态）
window.addEventListener('storage', checkLoginStatus)

onMounted(() => {
  checkLoginStatus()
})
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 50px;
  overflow-y: auto;
}
</style>