<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useCategory } from '~/composables/use-category'

const { t } = useI18n()

const categories = useCategory()
</script>

<template>
  <YunBase>
    <template #header>
      <YunPageHeader
        :title="t('menu.categories')"
        :icon="'i-ri-folder-2-line'"
      />
    </template>
    <template #content>
      <div text="center" class="yun-text-light" p="2">
        {{ t('counter.categories', categories.length) }}
      </div>
      <YunCategories :categories="categories" />
      <router-view />
    </template>
  </YunBase>
</template>
