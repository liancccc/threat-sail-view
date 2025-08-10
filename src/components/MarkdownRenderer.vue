<template>
  <div class="markdown-container" v-html="compiledMarkdown"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  src: {
    type: String,
    default: ''
  }
})

const md = new MarkdownIt({
  html: true,         // 允许HTML标签
  linkify: true,      // 自动转换URL为链接
  typographer: true   // 优化排版
})
const compiledMarkdown = ref('')
const isLoading = ref(false)
const error = ref<Error | null>(null)

const renderMarkdown = async () => {
  try {
    isLoading.value = true
    error.value = null

    if (props.src) {
      const response = await fetch(props.src)
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`)
      const text = await response.text()
      compiledMarkdown.value = md.render(text)
    } else {
      compiledMarkdown.value = md.render(props.content)
    }
  } catch (err) {
    error.value = err as Error
    compiledMarkdown.value = '<div class="error-message">Failed to load content</div>'
    console.error('Markdown render error:', err)
  } finally {
    isLoading.value = false
  }
}

// 初始加载
onMounted(renderMarkdown)

// 监听props变化
watch(
    () => [props.content, props.src],
    () => renderMarkdown(),
    { deep: true }
)
</script>

<style>
.markdown-container {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #24292e;
  max-width: 900px;
  margin: 0 auto;
}

.markdown-container h1,
.markdown-container h2 {
  padding-bottom: 0.3em;
  border-bottom: 1px solid #eaecef;
}

.markdown-container h1 { font-size: 2em; }
.markdown-container h2 { font-size: 1.5em; }
.markdown-container h3 { font-size: 1.25em; }

.markdown-container ul,
.markdown-container ol {
  padding-left: 2em;
}

.markdown-container blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  margin-left: 0;
}

.markdown-container pre {
  background-color: #f6f8fa;
  border-radius: 3px;
  padding: 16px;
  overflow: auto;
  line-height: 1.45;
}

.markdown-container code {
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  background-color: rgba(27,31,35,0.05);
  border-radius: 3px;
  padding: 0.2em 0.4em;
  font-size: 85%;
}

.markdown-container img {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #fff;
}

.error-message {
  color: #dc3545;
  padding: 1rem;
  border: 1px solid #f5c6cb;
  background-color: #f8d7da;
  border-radius: 4px;
}
</style>