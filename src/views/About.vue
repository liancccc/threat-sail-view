<template>
  <MarkdownRenderer :content="markdownText" />
</template>

<script setup lang="ts">
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
import { ref } from 'vue'
import {fetchAbout} from "@/api/about";

const markdownText = ref<string>('')

const loadAbout = async () => {
  try {
    const res = await fetchAbout()
    markdownText.value = res.content
    console.log(markdownText.value)
  } catch (err) {
    console.log(err)
  }
}

loadAbout()
</script>
