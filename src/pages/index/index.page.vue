<script lang="ts" setup>
import { useRoute } from 'vue-router'

import { ClientOnly } from '~/components/ClientOnly'
import { useUniversalFetch } from '~/composables/use-prefetch'
import { useHomeStore } from '~/stores/home'

const homeStore = useHomeStore()
useUniversalFetch(() => homeStore.fetchHomePostList())

const data = computed(() => homeStore.homePostListData)
const posts = computed(() => data?.value?.data)
const pager = computed(() => data?.value?.pagination)
const route = useRoute()

watch(
  () => route.query.page,
  () => {
    homeStore.fetchHomePostList()
  },
)
</script>

<template>
  <ClientOnly>
    <ValaxyPostList
      :posts="posts"
      :cur-page="pager?.currentPage"
      :page-size="pager?.totalPage"
      :total="pager?.total"
    />
  </ClientOnly>
</template>
