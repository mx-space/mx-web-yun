<script lang="ts" setup>
import Loading from './index.vue'

defineProps<{ loading: boolean }>()
</script>

<template>
  <div v-if="loading" class="yun-loading">
    <Loading />
  </div>
  <template v-else>
    <slot />
  </template>
</template>
