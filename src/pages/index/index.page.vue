<script lang="ts" setup>
import type { PaginateResult, PostModel } from '@mx-space/api-client'

import { usePageProps } from '~/composables'

const props = usePageProps<PaginateResult<PostModel>>()
const posts = computed(() => props.data)
const pager = computed(() => props.pagination)
</script>

<template>
  <div w="full" p="x-4 lt-sm:0">
    <template v-if="!posts.length">
      <div py2 op50>博主还什么都没写哦～</div>
    </template>

    <Transition v-for="(route, i) in posts" :key="i" name="fade">
      <ValaxyPostCard :post="route" />
    </Transition>
  </div>
</template>
