<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  command: string
  prefix?: string
}>()

const copied = ref(false)

function copy() {
  navigator.clipboard.writeText(props.command)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="install-command">
    <span class="prefix">{{ prefix || '$' }}</span>
    <span class="command">{{ command }}</span>
    <button class="copy-btn" @click="copy" :title="copied ? 'Copied!' : 'Copy to clipboard'">
      <svg v-if="!copied" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
      </svg>
      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </button>
  </div>
</template>
