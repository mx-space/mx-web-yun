<script lang="ts" setup>
import { ref } from 'vue'

import type { CategoryModel } from '@mx-space/api-client'

const props = withDefaults(
  defineProps<{
    categories: CategoryModel[]
    /**
     * 当前层级
     */
    level?: number

    collapsable?: boolean
  }>(),
  {
    level: 0,
    collapsable: true,
  },
)

const collapsable = ref(props.collapsable)
</script>

<template>
  <ul
    v-for="category in categories"
    :key="category.name"
    class="category-list"
    m="l-4"
  >
    <YunCategory
      :name="category.name"
      :category="category"
      :level="level + 1"
      :collapsable="collapsable"
    />
  </ul>
</template>

<style lang="scss">
.post-list-item {
  a {
    color: var(--yun-c-text);

    &:hover {
      color: var(--yun-c-primary);
    }
  }
}

.category-list-item {
  .folder-action {
    &:hover {
      color: var(--yun-c-primary);
    }
  }
  .category-name {
    &:hover {
      color: var(--yun-c-primary);
    }
  }
}
</style>
