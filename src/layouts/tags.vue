<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import type { PostModel } from '@mx-space/api-client'

import { useThemeConfig } from '~/composables'
import { useInvisibleElement } from '~/composables/use-invisible-element'
import { useTags } from '~/composables/use-tag'
import { apiClient } from '~/utils'

const route = useRoute()
const router = useRouter()

const themeConfig = useThemeConfig()

const { t } = useI18n()

const { tags, getTagStyle } = useTags({
  primary: themeConfig.colors.primary,
})

const curTag = computed(() => (route.query.tag as string) || '')

const collapse = ref()
const { show } = useInvisibleElement(collapse)

const displayTag = (tag: string) => {
  router.push({
    query: {
      tag,
    },
  })

  show()
}

const posts = ref([] as Partial<PostModel>[])

watch(
  () => curTag.value,
  (tag) => {
    apiClient.category.getTagByName(tag).then((res) => {
      posts.value = res.data

      show()
    })
  },
)
</script>

<template>
  <YunBase>
    <template #header>
      <YunPageHeader :title="t('menu.tags')" :icon="'i-ri-tag-line'" />
    </template>
    <template #content>
      <div class="yun-text-light" text="center" p="2">
        {{ t('counter.tags', Array.from(tags).length) }}
      </div>

      <div text="center">
        <span
          v-for="[key, tag] in Array.from(tags).sort()"
          :key="key"
          class="post-tag cursor-pointer"
          :style="getTagStyle(tag.count)"
          p="1"
          @click="displayTag(key.toString())"
        >
          #{{ key }}<span text="xs">[{{ tag.count }}]</span>
        </span>
      </div>

      <router-view />
    </template>
    <YunCard v-if="posts.length" ref="collapse" m="!t-4" w="full">
      <YunPageHeader m="t-4" :title="curTag" icon="i-ri-hashtag" />
      <YunPostCollapse
        w="full"
        m="b-4"
        p="x-20 lt-sm:x-5"
        :posts="posts"
        not-timeline
      />
    </YunCard>
  </YunBase>
</template>

<style lang="scss">
.post-tag {
  color: var(--yun-tag-color);

  &:hover {
    color: var(--yun-c-primary);
  }
}
</style>
