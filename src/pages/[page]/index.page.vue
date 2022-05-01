<script lang="ts" setup>
import { useRoute } from 'vue-router'

import Box from '~/components/extra/Comments/box.vue'
import Comments from '~/components/extra/Comments/index.vue'
import Loading from '~/components/extra/Loading/index.vue'
import YunPageHeader from '~/components/yun/YunPageHeader.vue'
import { useUniversalFetch } from '~/composables/use-prefetch'
import { usePageStore } from '~/stores/page'
import { markdownRender } from '~/utils'

const pageStore = usePageStore()
const route = useRoute()
const slug = route.params.page as string
const data = useUniversalFetch(() => pageStore.fetchPage(slug), `page-${slug}`)
</script>

<template>
  <div v-if="data">
    <YunPageHeader :title="data.title"> </YunPageHeader>
    <ValaxyMd :post="data" :md="markdownRender(data.text)"> </ValaxyMd>
    <slot name="comment">
      <Box v-if="data.allowComment" :id="data.id" />
      <Comments :id="data.id" />
    </slot>
  </div>
  <Loading v-else />
</template>
