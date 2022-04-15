<script lang="ts" setup>
const showOverview = ref(true)
</script>

<template>
  <div class="sidebar-nav" m="t-6">
    <button
      m="x-4"
      class="sidebar-nav-item yun-icon-btn"
      :class="showOverview && 'active'"
      @click="showOverview = true"
    >
      <i-ri-passport-line />
    </button>
    <button
      m="x-4"
      class="sidebar-nav-item yun-icon-btn"
      :class="!showOverview && 'active'"
      @click="showOverview = false"
    >
      <i-ri-list-ordered />
    </button>
  </div>

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
