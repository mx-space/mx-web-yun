<script lang="ts" setup>
import { useRoute } from 'vue-router'

import type { PaginateResult, PostModel } from '@mx-space/api-client'

import { useUniversalFetch } from '~/composables/use-prefetch'
import { apiClient } from '~/utils'

const route = useRoute()
const data = ref<PaginateResult<PostModel>>()
useUniversalFetch(async () => {
  data.value = await apiClient.post.getList(
    parseInt((route.query.page as any) ?? '') || 1,
    parseInt((route.query.size as any) ?? '') || 10,
  )
})
const posts = computed(() => data?.value?.data)
const pager = computed(() => data?.value?.pagination)

console.log(data)
</script>

<template>
  <div v-if="data" w="full" p="x-4 lt-sm:0">
    <template v-if="!posts.length">
      <div py2 op50>博主还什么都没写哦～</div>
    </template>

    <Transition v-for="(route, i) in posts" :key="i" name="fade">
      <ValaxyPostCard :post="route" />
    </Transition>
  </div>
</template>
