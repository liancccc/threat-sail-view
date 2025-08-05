<template>
  <div class="stats-container">
    <el-alert
        title="展示数据标签和对应的统计信息"
        :closable="false"
        type="primary"
        show-icon
    />

    <el-table
        :data="statsData.stats"
        stripe
        border
        v-loading="loading"
        empty-text="暂无统计数据"
        style="width: 100%"
    >
      <el-table-column prop="tag" label="标签" width="300"/>
      <el-table-column prop="today" label="今日">
        <template #default="{ row }">
          {{ row.today }}
        </template>
      </el-table-column>
      <el-table-column prop="month" label="本月">
        <template #default="{ row }">
          {{ row.month }}
        </template>
      </el-table-column>
      <el-table-column prop="total" label="总数">
        <template #default="{ row }">
          {{ row.total }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchStats } from '@/api/stats'

interface StatItem {
  tag: string
  today: number
  month: number
  total: number
}

interface StatsResponse {
  stats: StatItem[]
}

const statsData = ref<StatsResponse>({ stats: [] })
const loading = ref(false)

const loadStats = async () => {
  loading.value = true
  try {
    statsData.value = await fetchStats()
  } catch (error) {
    console.error('获取统计失败:', error)
    statsData.value = { stats: [] }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStats()
})
</script>

<style scoped>
.stats-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.el-alert {
  margin-bottom: 10px;
}
</style>