<script setup lang="ts">
/* eslint-disable no-void */
import { useRoute } from 'vue-router'

import type { CommentModel, Pager } from '@mx-space/api-client'

import { apiClient } from '~/utils'

import Comment from './comment.vue'

const props = defineProps<{ id: string }>()
const $container = ref<HTMLDivElement>()

const data = ref([] as CommentModel[])
const pagination = ref<null | Pager>(null)
const loading = ref(true)

const fetchComment = async (page = 1, size = 10) => {
  loading.value = true
  data.value = []
  pagination.value = null
  apiClient.comment.getByRefId(props.id, { page, size }).then((res) => {
    data.value = res.data
    pagination.value = res.pagination
    loading.value = false
  })
}

watchEffect(() => {
  void props.id
  fetchComment()
})

const isInView = ref(false)
const { stop } = useIntersectionObserver($container, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    isInView.value = true
    stop()
  }
})

const route = useRoute()

watchEffect(() => {
  // @ts-expect-error
  const page = route.query['comment-page'] | 0
  fetchComment(page)
})

const jumpTo = (page: number) => {
  return `?comment-page=${page}`
}
</script>

<template>
  <div ref="$container"></div>
  <template v-if="isInView">
    <div class="mb-4 flex flex-col gap-6">
      <Comment v-for="comment in data" :key="comment.id" :comment="comment" />
    </div>

    <ValaxyPagination
      v-if="pagination && pagination.totalPage > 1"
      :cur-page="pagination.currentPage"
      :page-size="10"
      :total="pagination.total"
      :jump-to-route="jumpTo"
    />
  </template>
  <div class="pb-4"></div>
</template>

<style scoped></style>
