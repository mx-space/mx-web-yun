<script lang="ts" setup>
import { useAggregateData } from '~/composables/use-page-context'

const showOverview = ref(true)
</script>

<template>
  <div v-if="showOverview" :class="$slots.default && '-mt-4'">
    <YunOverview />
  </div>
</template>

<style lang="scss">
.sidebar-nav {
  .sidebar-nav-item {
    color: var(--yun-c-primary);
    border: 1px solid var(--yun-c-primary);

    &.active {
      border: 1px solid var(--yun-c-primary);

      color: white;
      background-color: var(--yun-c-primary);
    }
  }
}
</style>
