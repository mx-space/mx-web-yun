<script setup lang="ts">
import { navigate } from 'vite-plugin-ssr/client/router'

defineProps<{
  to?: string
  title?: string
}>()
</script>

<template>
  <a :href="to" @click.stop.prevent="() => navigate(to)">
    {{ title }}
    <slot />
  </a>
</template>
