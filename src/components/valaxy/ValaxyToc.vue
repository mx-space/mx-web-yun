<script lang="ts" setup>
import { computed, ref } from 'vue'

import { useActiveSidebarLinks } from '~/composables/use-sidebar-toc'
import { useUIStore } from '~/stores/ui'

const uiStore = useUIStore()
const headers = computed(() => uiStore.toc)

const container = ref()
const marker = ref()
useActiveSidebarLinks(container, marker)

function getStylesByLevel(level: number) {
  return {
    // fontSize: `${(6 - level) * 0.1 + 0.7}rem`,
    paddingLeft: `${level * 1 - 1}rem`,
  }
}

// todo mobile toc widget
</script>

<template>
  <div v-if="headers" ref="container">
    <div ref="marker" class="outline-marker" />
    <ul class="va-toc" p="l-4">
      <li
        v-for="(header, i) in headers"
        :key="i"
        class="va-toc-item"
        :style="getStylesByLevel(header.level)"
      >
        <a class="toc-link-item" :href="`#${header.slug}`">{{
          header.title
        }}</a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.outline-marker {
  opacity: 0;
  position: absolute;
  background-color: var(--yun-c-primary);
  border-radius: 4px;
  width: 4px;
  height: 20px;
  top: 32px;
  left: 20px;
  z-index: 0;
  transition: top 0.25s cubic-bezier(0, 1, 0.5, 1), opacity 0.25s,
    background-color 0.5s;
}

.va-toc {
  top: 10px;
  width: var(--yun-sidebar-width-mobile);

  background-color: var(--yun-c-bg-light);

  font-size: 1rem;
  font-family: var(--yun-font-serif);
  font-weight: 900;
  line-height: 1.6;

  text-align: left;

  a {
    display: block;
    color: var(--c-toc-link);
    transition: color var(--yun-transition-duration);

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    font-weight: 900;

    &:hover {
      color: var(--yun-c-text);
    }
  }

  .toc-link-item {
    color: var(--yun-c-text-light);

    &:hover {
      color: var(--yun-c-text);
    }

    &.active {
      color: var(--yun-c-primary);
    }
  }
}
</style>
