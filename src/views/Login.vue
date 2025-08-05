<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <h3>管理员</h3>
      </div>

      <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
      >
        <el-form-item prop="token">
          <el-input
              v-model="loginForm.token"
              type="password"
              placeholder="请输入管理员 Token"
              show-password
              clearable
              @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-form-item>
          <el-button
              type="primary"
              class="login-btn"
              :loading="loading"
              @click="handleLogin"
          >
            {{ loading ? '验证中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElForm } from 'element-plus'
import { setToken } from '@/utils/auth'
import { md5 } from '@/utils/crypto'
import {login} from "@/api/auth";

const router = useRouter()
const loginFormRef = ref<InstanceType<typeof ElForm>>()

const loginForm = reactive({
  token: ''
})

const loginRules = {
  token: [
    { required: true, message: '请输入管理员 Token', trigger: 'blur' }
  ]
}

const loading = ref(false)

const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    await loginFormRef.value.validate()
    loading.value = true

    const hashedToken = md5(loginForm.token)

    const response = await login({"token": hashedToken})
    if (response.success) {
      setToken(hashedToken)
      ElMessage.success(response.message || '登录成功')
      window.location.href = '/'
    }

  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || 'Token 验证失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.login-card {
  width: 320px;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e4e7ed;
}

.login-header {
  text-align: center;
  margin-bottom: 24px;
}

.login-header h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 500;
  color: #303133;
}

.login-header p {
  margin: 0;
  font-size: 12px;
  color: #909399;
}

.login-form .el-form-item {
  margin-bottom: 16px;
}

.login-btn {
  width: 100%;
  border-radius: 4px;
}

:deep(.el-input__wrapper) {
  border-radius: 4px;
}
</style>
