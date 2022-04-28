<script lang="ts" setup>
import { useThemeConfig } from '~/composables/use-page-context'

const themeConfig = useThemeConfig()
</script>

<template>
  <div class="links">
    <router-link
      v-for="(item, i) in themeConfig.pages"
      :key="i"
      class="link-item yun-icon-btn"
      :to="item.url"
      :title="item.name"
      :target="item.url.startsWith('http') ? '_blank' : ''"
      :style="`color:${item.color}`"
    >
      <div :class="item.icon" class="icon" />
    </router-link>
  </div>
</template>

<style lang="scss">
.sidebar {
  .links {
    display: flex;
    justify-content: center;
  }

  .link-item {
    display: inline-flex;

    .icon {
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
