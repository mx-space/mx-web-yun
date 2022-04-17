<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useTimelineStore } from '~/stores/timeline'

const { t } = useI18n()

const postList = useTimelineStore().timelineData.posts
</script>

<template>
  <YunBase>
    <template #header>
      <YunPageHeader :title="t('menu.archives')" icon="i-ri-archive-line" />
    </template>
    <template #content>
      <router-view />
      <YunPostCollapse :posts="postList" />
    </template>
  </YunBase>
</template>
