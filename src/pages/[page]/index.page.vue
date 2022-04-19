<script lang="ts" setup>
import { useRoute } from 'vue-router'

import YunPageHeader from '~/components/yun/YunPageHeader.vue'
import { useUniversalFetch } from '~/composables/use-prefetch'
import { usePageStore } from '~/stores/page'
import { markdownRender } from '~/utils'

const pageStore = usePageStore()
const route = useRoute()
const slug = route.params.page as string
const data = useUniversalFetch(() => pageStore.fetchPage(slug), `page-${slug}`)

//  const data = computed(() => pageStore)
</script>

<template>
  <div v-if="data">
    <YunPageHeader :title="data.title"> </YunPageHeader>
    <ValaxyMd :frontmatter="data" :md="markdownRender(data.text)"> </ValaxyMd>
  </div>
</template>
