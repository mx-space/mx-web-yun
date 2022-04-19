<script setup lang="ts">
import type { PostModel } from '@mx-space/api-client/types/models/post'

import { ClientOnly } from '../ClientOnly'

const props = withDefaults(
  defineProps<{
    posts?: PostModel[]
    curPage?: number
    pageSize?: number
    total?: number
  }>(),
  {
    curPage: 1,
    pageSize: 10,
  },
)

const displayedPosts = computed(() => props.posts)
</script>

<template>
  <ClientOnly>
    <template #default>
      <div w="full" p="x-4 lt-sm:0">
        <template v-if="!displayedPosts.length">
          <div py2 op50>博主还什么都没写哦～</div>
        </template>

        <Transition v-for="(post, i) in displayedPosts" :key="i" name="fade">
          <ValaxyPostCard :post="post" />
        </Transition>
      </div>

      <ValaxyPagination
        :cur-page="curPage"
        :page-size="pageSize"
        :total="total"
      />
    </template>
  </ClientOnly>
</template>

<style>
.yun-card-actions {
  border-top: 1px solid rgba(122, 122, 122, 0.15);
  min-height: 2.5rem;
}

.post-categories {
  color: var(--yun-c-text);
}

.post-tag {
  color: var(--yun-c-text);
}
</style>
