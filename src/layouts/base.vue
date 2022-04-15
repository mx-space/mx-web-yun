<script lang="ts" setup>
import YunSidebar from '../components/yun/YunSidebar.vue'
</script>

<template>
  <aside class="va-card transition sidebar md:translate-x-0">
    <YunSidebar />
  </aside>

  <slot />
</template>
