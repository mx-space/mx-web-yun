<script lang="ts" setup>
import { ClientOnly } from '~/components/ClientOnly'
import { useUniversalFetch } from '~/composables/use-prefetch'
import { useHomeStore } from '~/stores/home'

const homeStore = useHomeStore()
useUniversalFetch(() => homeStore.fetchHomePostList())

const data = computed(() => homeStore.homePostListData)
const posts = computed(() => data?.value?.data)
const pager = computed(() => data?.value?.pagination)
</script>

<template>
  <ClientOnly>
    <div v-if="data" w="full" p="x-4 lt-sm:0">
      <template v-if="!posts.length">
        <div py2 op50>博主还什么都没写哦～</div>
      </template>

      <Transition v-for="(route, i) in posts" :key="i" name="fade">
        <ValaxyPostCard :post="route" />
      </Transition>
    </div>
  </ClientOnly>
</template>
