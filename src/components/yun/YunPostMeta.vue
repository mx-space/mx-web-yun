<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { PostModel } from '@mx-space/api-client'

import { formatDate } from '~/utils/time-date'

const { t } = useI18n()

defineProps<{
  frontmatter: PostModel
}>()
</script>

<template>
  <!-- <div v-if="frontmatter.draft" class="post-draft-icon" title="draft">
    <div i-ri-draft-line />
  </div>
  <div v-if="frontmatter.top" class="post-top-icon">
    <div i-ri-pushpin-line />
  </div> -->

  <div v-if="frontmatter" class="post-meta justify-center" flex="~" text="sm">
    <div v-if="frontmatter.created" class="post-time flex items-center">
      <div class="inline-block" i-ri-calendar-line />
      <time m="l-1" :title="t('post.posted')">{{
        formatDate(frontmatter.created)
      }}</time>

      <template
        v-if="
          frontmatter.modified && frontmatter.modified !== frontmatter.created
        "
      >
        <span m="x-2">-</span>
        <div i-ri-calendar-2-line />
        <time m="l-1" :title="t('post.edited')">{{
          formatDate(frontmatter.modified)
        }}</time>
      </template>
    </div>
  </div>
</template>

<style>
.post-draft-icon {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: var(--yun-c-gray);
  font-size: 1.2rem;
}

.post-top-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: var(--yun-c-warning);
  font-size: 1.2rem;
}
</style>
