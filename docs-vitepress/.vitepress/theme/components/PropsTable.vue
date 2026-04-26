<script setup lang="ts">
defineProps<{
  props: Array<{
    name: string
    type: string
    default?: string
    required?: boolean
    description: string
  }>
}>()
</script>

<template>
  <table class="props-table">
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="prop in props" :key="prop.name">
        <td>
          <code>{{ prop.name }}</code>
          <span v-if="prop.required" style="color: var(--macos-red); margin-left: 2px;">*</span>
        </td>
        <td><code>{{ prop.type }}</code></td>
        <td><code v-if="prop.default">{{ prop.default }}</code><span v-else style="color: var(--vp-c-text-3);">-</span></td>
        <td>{{ prop.description }}</td>
      </tr>
    </tbody>
  </table>
</template>
