<template>
  <div class="home-container">
    <el-alert
        title="展示关于安全漏洞、博客、推文、公众号等, 基于 AI 实现信息过滤与总结 ."
        :closable="false"
        type="primary"
        show-icon
    />
    <!-- 搜索区域 -->
    <div class="search-area">
      <div class="search-controls">
        <el-input
            v-model="searchText"
            placeholder="关键词"
            clearable
            style="width: 600px"
        />
        <el-select
            v-model="selectedTags"
            multiple
            filterable
            collapse-tags
            placeholder="标签"
            style="width: 450px; margin-left: 10px"
        >
          <el-option
              v-for="tag in availableTags"
              :key="tag"
              :label="tag"
              :value="tag"
          />
        </el-select>
        <el-button
            type="primary"
            style="margin-left: 10px"
            @click="handleSearch"
        >
          搜索
        </el-button>
        <el-button
            style="margin-left: 10px"
            @click="handleReset"
        >
          重置
        </el-button>
      </div>
    </div>

    <!-- 数据列表 -->
    <div class="data-container" v-loading="loading">
      <!--  数据卡片    -->
      <el-row :gutter="16">
        <el-col
            v-for="item in threatData.items"
            :span="24"
        >
          <el-card class="data-card" shadow="hover">
            <div class="card-top">
              <div class="card-meta">
                <span class="create-time">
                  {{ formatDateTime(item.created_at) }}
                </span>
                <div class="tags-area">
                  <el-tag
                      v-for="tag in item.tags"
                      :key="tag"
                      size="small"
                      style="margin-right: 8px; cursor: pointer"
                      @click="addTagToFilter(tag)"
                  >
                    {{ tag }}
                  </el-tag>
                </div>
              </div>
              <div class="card-actions">
                <el-button
                    :type="item.link ? 'primary' : 'info'"
                    size="small"
                    :disabled="!item.link"
                    @click="openLink(item.link)"
                >
                  访问来源
                </el-button>
              </div>
            </div>

            <div class="desc-text">
              <pre v-if="item.desc">{{ item.desc }}</pre>
              <pre v-else>描述信息为空</pre>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 空状态 -->
      <el-empty v-if="!loading && threatData.items.length === 0" description="暂无数据" />

      <!-- 分页 -->
      <div class="pagination" v-if="threatData.total > 0">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total="threatData.total"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next"
            background
            @size-change="handleSearch"
            @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {fetchDataList, fetchDataTags, ThreatItem} from '@/api/data'

// 数据状态
const threatData = ref({
  items: [] as ThreatItem[],
  total: 0
})

// 搜索和分页参数
const searchText = ref('')
const selectedTags = ref<string[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const loading = ref(false)

// 可用标签列表
const availableTags = ref<string[]>([])

// 添加标签到筛选条件
const addTagToFilter = (tag: string) => {
  if (!selectedTags.value.includes(tag)) {
    selectedTags.value = [...selectedTags.value, tag]
  }
}

// 日期时间格式化
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Shanghai'
  };

  const formatter = new Intl.DateTimeFormat('zh-CN', options);
  const parts = formatter.formatToParts(date);

  const year = parts.find(p => p.type === 'year')?.value;
  const month = parts.find(p => p.type === 'month')?.value;
  const day = parts.find(p => p.type === 'day')?.value;
  const hour = parts.find(p => p.type === 'hour')?.value;
  const minute = parts.find(p => p.type === 'minute')?.value;

  return `${year}-${month}-${day} ${hour}:${minute}`;
}


const openLink = (url: string) => {
  window.open(url, '_blank')
}


const fetchData = async () => {
  loading.value = true
  try {
    const res = await fetchDataList({
      search: searchText.value,
      tags: selectedTags.value,
      page: currentPage.value,
      limit: pageSize.value
    })
    threatData.value = {
      items: res.items,
      total: res.total
    }
  } catch (error) {
    console.error('获取数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 获取所有标签
const fetchTags = async () => {
  try {
    const res = await fetchDataTags()
    availableTags.value = res.tags
  } catch (error) {
    console.error('获取标签失败:', error)
  }
}

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
  fetchData()
}

// 重置搜索
const handleReset = () => {
  searchText.value = ''
  selectedTags.value = []
  handleSearch()
}

// 分页变化
const handlePageChange = () => {
  scrollToTop()
  fetchData()
}

// 滚动到顶部函数
const scrollToTop = () => {
  window.scrollTo(0, 0)
}

// 初始化
onMounted(() => {
  fetchData()
  fetchTags()
})
</script>

<style scoped>
.home-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.search-area {
  margin-bottom: 24px;
}

.search-controls {
  display: flex;
  align-items: center;
}

.data-container {
  margin-top: 16px;
  min-height: 400px;
}

.data-card {
  margin-bottom: 16px;
  border-radius: 8px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-meta {
  display: flex;
  align-items: center;
}

.create-time {
  color: #999;
  font-size: 14px;
  margin-right: 16px;
}

.tags-area {
  display: flex;
  flex-wrap: wrap;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.desc-text {
  margin: 12px 0;
  line-height: 1.6;
  color: #333;
  background-color: #f8f8f8;
  padding: 12px;
  border-radius: 4px;
  font-size: 13px;
}

.desc-text pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}

.create-time {
  display: inline-flex;
  align-items: center;
  color: #606266;
  font-size: 13px;
  margin-right: 16px;
  background: #f0f2f5;
  padding: 4px 8px;
  border-radius: 4px;
}

.create-time .el-icon {
  margin-right: 6px;
  font-size: 14px;
  color: #909399;
}

.el-alert {
  margin-bottom: 20px;
}

</style>