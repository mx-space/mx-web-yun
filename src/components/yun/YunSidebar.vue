<template>
  <div :class="$slots.default && '-mt-4'">
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
