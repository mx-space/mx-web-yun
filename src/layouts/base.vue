<script lang="ts" setup>
import YunSidebar from '../components/yun/YunSidebar.vue'
</script>

<template>
  <YunSidebar v-if="$slots['sidebar-child']">
    <slot name="sidebar-child" />
  </YunSidebar>
  <YunSidebar v-else />

  <slot />
</template>
