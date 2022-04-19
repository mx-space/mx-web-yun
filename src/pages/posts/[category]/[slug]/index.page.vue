<script lang="ts" setup>
import { useRoute } from 'vue-router'

import ValaxyMd from '~/components/valaxy/ValaxyMd.vue'
import { useUniversalFetch } from '~/composables/use-prefetch'
import { usePostStore } from '~/stores/post'
import { markdownRender } from '~/utils'

const postStore = usePostStore()
const route = useRoute()
const data = computed(() => postStore.currentPostData)
const category = computed(() => route.params.category as string)
const slug = computed(() => route.params.slug as string)
useUniversalFetch(() =>
  postStore.fetchPost(category.value, slug.value).then((res) => {
    postStore.setCurrentPostData(res)
    return res
  }),
)
</script>

<template>
  <div v-if="data">
    <ValaxyMd :frontmatter="data" :md="markdownRender(data.text)"> </ValaxyMd>
  </div>
</template>
