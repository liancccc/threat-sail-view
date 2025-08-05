<template>
  <div class="config-management">
    <el-card>
      <template #header>
        <div class="plain-header">
          <span class="title-text">配置编辑</span>
          <div>
            <el-button
                type="primary"
                size="small"
                @click="handleSave"
                :loading="saving"
            >
              保存
            </el-button>
          </div>
        </div>
      </template>

      <el-alert
          v-if="error"
          :title="error"
          type="error"
          show-icon
          @close="error = ''"
      />

      <codemirror
          v-model="configContent"
          :style="{ height: '70vh' }"
          :extensions="extensions"
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { yaml } from '@codemirror/lang-yaml'
import { EditorView } from '@codemirror/view'
import { Codemirror } from 'vue-codemirror'
import { fetchConfig, saveConfig } from '@/api/config'

// 编辑器配置
const extensions = [
  yaml(),
  EditorView.theme({}, { dark: false })
]

// 状态管理
const configContent = ref<string>('')
const error = ref<string>('')
const saving = ref<boolean>(false)

// 获取配置
const loadConfig = async () => {
  try {
    const res = await fetchConfig()
    configContent.value = res.content
    if (res.error) {
      error.value = `加载失败: ${res.error}`
    }
  } catch (err) {
    error.value = '加载失败: 服务器错误'
  }
}

// 保存配置
const handleSave = async () => {
  saving.value = true
  error.value = ''
  try {
    const res = await saveConfig(configContent.value)
    if (res.error) {
      throw new Error(res.error)
    }
    ElMessage.success('保存成功')
  } catch (err) {
    error.value = `保存失败: ${err instanceof Error ? err.message : '未知错误'}`
  } finally {
    saving.value = false
  }
}

// 初始化加载
onMounted(loadConfig)
</script>

<style>
.config-management {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.plain-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cm-editor {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.cm-gutters {
  background-color: #f5f7fa;
}

.title-text {
  font-size: 14px;
  color: #606266;
}
</style>
