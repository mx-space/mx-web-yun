<script setup lang="ts">
import type { CommentModel } from '@mx-space/api-client'

import { anonymousImage } from '~/constants'

import RelativeTime from '../Time/RelativeTime.vue'
import Comment from './comment.vue'

withDefaults(defineProps<{ comment: CommentModel; deep?: number }>(), {
  deep: 1,
})

const onImgError = (e: Event) => {
  const $ = e.target as HTMLImageElement
  $.src = anonymousImage

  $.onerror = () => {}
}
</script>

<template>
  <div :data-comment-id="comment.id" class="root">
    <div class="left">
      <img
        class="rounded-full shadow-light-300 shadow-sm"
        loading="lazy"
        :src="comment.avatar || anonymousImage"
        :alt="comment.author"
        :onError="onImgError"
      />
    </div>
    <div class="right">
      <p class="space-x-2 flex items-end">
        <a :href="comment.url" target="_blank">
          <span class="author">{{ comment.author }}</span>
        </a>
        <span class="date">
          <RelativeTime :datetime="comment.created" />
        </span>
      </p>

      <p class="mt-2">
        {{ comment.text }}
      </p>
    </div>
  </div>

  <div
    v-if="comment.children?.length"
    class="flex flex-col gap-6"
    :class="deep == 1 ? 'ml-8 <sm:ml-4' : ''"
  >
    <Comment
      v-for="child in comment.children"
      :key="child.id"
      :comment="child"
      :deep="deep + 1"
    ></Comment>
  </div>
</template>

<style scoped lang="postcss">
.root {
  @apply relative flex gap-3 w-full text-sm;
}
.left {
  width: 40px;
  flex-shrink: 0;
}

.right {
  @apply flex-grow min-w-0;
}

.date {
  @apply opacity-80;

  font-size: 12px;
}
</style>
