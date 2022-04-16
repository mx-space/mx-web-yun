<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { PostModel } from '@mx-space/api-client'

import { excerptMarkdownAndRenderToHtml } from '~/utils/markdown'

const props = defineProps<{
  post: PostModel
}>()

const { t } = useI18n()

const path = computed(() => `/${props.post.category.slug}/${props.post.slug}`)
const excerpt = computed(() => excerptMarkdownAndRenderToHtml(props.post.text))
</script>

<template>
  <YunCard m="!y-4 !auto" class="post-card">
    <ValaxyAppLink class="post-title-link" :to="path || ''" m="t-3">
      <div
        class="flex justify-center items-center title text-2xl"
        font="serif black"
      >
        {{ post.title }}
      </div>
    </ValaxyAppLink>

    <YunPostMeta :frontmatter="post" />

    <div
      class="markdown-body"
      text="left"
      w="full"
      p="x-6 y-5 lt-sm:4"
      v-html="excerpt"
    />

    <!-- <a
      v-if="path"
      :href="path"
      class="post-link-btn shadow hover:shadow-md"
      rounded
      target="_blank"
      m="b-4"
    >
      {{ t('post.view_link') }}
    </a> -->

    <div
      v-if="post.category || post.tags"
      w="full"
      class="yun-card-actions flex justify-between"
      border="t"
      text="sm"
    >
      <div class="inline-flex">
        <router-link
          v-if="post.category"
          :to="{
            path: '/categories/',
            query: {
              category: post.category.slug,
            },
          }"
          class="post-categories inline-flex justify-center items-center"
          m="l-2"
        >
          <div m="x-1" i-ri-folder-2-line />
          {{ post.category.name }}
        </router-link>
      </div>

      <div class="post-tags inline-flex" m="r-2">
        <template v-if="post.tags">
          <router-link
            v-for="(tag, i) in post.tags"
            :key="i"
            :to="{ path: '/tags/', query: { tag: tag } }"
            m="x-1"
            class="post-tag inline-flex justify-center items-center"
          >
            <div m="r-1" i-ri-price-tag-3-line />
            {{ tag }}
          </router-link>
        </template>
      </div>
    </div>
  </YunCard>
</template>

<style>
.yun-card-actions {
  border-top: 1px solid rgba(122, 122, 122, 0.15);
  min-height: 2.5rem;
}

.post-categories {
  color: var(--va-c-text);
}

.post-tag {
  color: var(--va-c-text);
}
</style>
