<script setup lang="ts">
import { computed, ref } from 'vue'

import type { PostModel } from '@mx-space/api-client/types/models/post'

const props = withDefaults(
  defineProps<{
    posts?: PostModel[]
    curPage?: number
    pageSize?: number
  }>(),
  {
    curPage: 1,
    pageSize: 10,
  },
)

const displayedPosts = props.posts
</script>

<template>
  <div w="full" p="x-4 lt-sm:0">
    <template v-if="!displayedPosts.length">
      <div py2 op50>博主还什么都没写哦～</div>
    </template>

    <Transition v-for="(post, i) in displayedPosts" :key="i" name="fade">
      <PostCard :post="post" />
    </Transition>
  </div>

  <ValaxyPagination
    :cur-page="curPage"
    :page-size="pageSize"
    :total="posts.length"
  />
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
