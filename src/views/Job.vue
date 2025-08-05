<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import {listJobs, reloadJob, SchedulerJobItem, SchedulerJobsResponse} from '@/api/job'

const loading = ref(false)
const reloadingId = ref<string | null>(null)
const jobs = ref<SchedulerJobItem[]>([])
const total = ref(0)

// 格式化时间显示
const formatDateTime = (dateTime: string) => {
  return new Date(dateTime).toLocaleString()
}

// 获取任务列表
const fetchJobs = async () => {
  try {
    loading.value = true
    const response: SchedulerJobsResponse = await listJobs()
    jobs.value = response.items
    total.value = response.total
  } catch (error) {
    ElMessage.error('获取任务列表失败: ' + (error as Error).message)
  } finally {
    loading.value = false
  }
}

// 重新加载任务
const handleReload = async (id: string) => {
  try {
    reloadingId.value = id
    await reloadJob(id)
    ElMessage.success('任务重新加载成功')
    await fetchJobs() // 刷新列表
  } catch (error) {
    ElMessage.error('重新加载任务失败: ' + (error as Error).message)
  } finally {
    reloadingId.value = null
  }
}

// 初始化加载数据
onMounted(() => {
  fetchJobs()
})
</script>

<template>
  <div class="jobs-container">
    <el-alert
        :title="`展示正在运行的爬虫任务, 目前共 ${total} 个任务`"
        :closable="false"
        type="primary"
        show-icon
    />

    <el-table
          :data="jobs"
          v-loading="loading"
          style="width: 100%"
          stripe
      >
        <el-table-column prop="id" label="ID" min-width="220" />
        <el-table-column label="下次执行时间" min-width="200">
          <template #default="{ row }">
            {{ formatDateTime(row.next_run_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="interval" label="执行间隔" min-width="120" />
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button
                type="primary"
                size="small"
                @click="handleReload(row.id)"
                :loading="reloadingId === row.id"
            >
              重新加载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<style scoped>
.jobs-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-table .cell) {
  padding-left: 8px;
  padding-right: 8px;
}

.el-alert {
  margin-bottom: 10px;
}
</style>