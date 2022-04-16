<script lang="ts" setup>
import type { PostModel } from '@mx-space/api-client'

import { usePageProps, useThemeConfig } from '~/composables'
import { useFullUrl } from '~/composables/use-full-url'

const config = useThemeConfig()
const frontmatter = usePageProps<PostModel>()
const url = useFullUrl()
</script>

<template>
  <YunBase>
    <template #content>
      <main text="left" m="auto" p="t-0 b-2">
        <slot name="header">
          <YunPostMeta :frontmatter="frontmatter" />
        </slot>
        <router-view v-slot="{ Component }">
          <Transition appear>
            <component :is="Component" />
          </Transition>
        </router-view>
        <YunSponsor v-if="config.sponsor.enable" />
        <ValaxyCopyright v-if="frontmatter.copyright" :url="url" m="y-4" />
      </main>
    </template>
  </YunBase>
</template>
