<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title?: string
  code?: string
}>()

const showCode = ref(false)
const copied = ref(false)

function copyCode(code: string) {
  navigator.clipboard.writeText(code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="playground-container">
    <div class="playground-header">
      <div class="playground-header-left" style="display: flex; align-items: center; gap: 12px;">
        <div class="traffic-lights-mini">
          <span style="background: #ff5f57;"></span>
          <span style="background: #febc2e;"></span>
          <span style="background: #28c840;"></span>
        </div>
        <span style="font-size: 13px; color: var(--vp-c-text-2); font-weight: 500;">{{ title || 'Preview' }}</span>
      </div>
      <button
        v-if="code"
        class="copy-btn"
        style="background: none; border: none; cursor: pointer; color: var(--vp-c-text-3); padding: 4px 8px; border-radius: 4px; font-size: 12px; transition: all 0.2s;"
        @click="copyCode(code)"
      >
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
    <div class="playground-preview">
      <slot />
    </div>
    <div v-if="code" class="playground-code">
      <button class="toggle-btn" @click="showCode = !showCode">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
        {{ showCode ? 'Hide Code' : 'Show Code' }}
      </button>
      <div v-show="showCode" style="padding: 0;">
        <slot name="code" />
      </div>
    </div>
  </div>
</template>
