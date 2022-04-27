<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { CategoryModel, PostModel } from '@mx-space/api-client'

import { apiClient } from '~/utils'

const props = withDefaults(
  defineProps<{
    name: string
    // to eliminate the warning
    category: CategoryModel
    level?: number

    /**
     * collapse children
     */
    collapsable?: boolean
  }>(),
  {
    collapsable: true,
  },
)

const collapsable = ref(props.collapsable)
const { t, locale } = useI18n()

const getTitle = (post: PostModel | any) => {
  const lang = locale.value === 'zh-CN' ? 'zh' : locale.value
  return post[`title_${lang}`] ? post[`title_${lang}`] : post.title
}

const posts = ref([] as Partial<PostModel>[])

watch(
  () => props.category.slug,
  () => {
    apiClient.category.getCategoryDetail(props.category.id).then((data) => {
      posts.value = data.children
    })
  },
  { immediate: true },
)
</script>

<template>
  <li
    v-if="category.count"
    class="category-list-item inline-flex items-center cursor-pointer"
    @click="collapsable = !collapsable"
  >
    <span class="folder-action inline-flex">
      <div v-if="collapsable" i-ri-folder-add-line />
      <div v-else style="color: var(--yun-c-primary)" i-ri-folder-reduce-line
    /></span>
    <span class="category-name" m="l-1">
      {{ name === 'Uncategorized' ? t('category.uncategorized') : name }} [{{
        category.count
      }}]
    </span>
  </li>

  <template v-if="!collapsable">
    <ul>
      <li v-for="(post, i) in posts" :key="i" class="post-list-item" m="l-4">
        <router-link
          v-if="post.title"
          :to="`/posts/${category.slug}/${post.slug}`"
          class="inline-flex items-center"
        >
          <div i-ri-file-text-line />
          <span m="l-1" font="serif black">{{ getTitle(post) }}</span>
        </router-link>
      </li>
    </ul>
  </template>
</template>
