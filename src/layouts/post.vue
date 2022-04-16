<script lang="ts" setup>
import { useRoute } from 'vue-router'

import type { PostModel } from '@mx-space/api-client'

import { useThemeConfig } from '~/composables'
import { providePostContext } from '~/composables/page-context/use-post'
import { useFullUrl } from '~/composables/use-full-url'
import { useUniversalFetch } from '~/composables/use-prefetch'
import { apiClient } from '~/utils'

const config = useThemeConfig()

const url = useFullUrl()

const route = useRoute()
const data = ref<PostModel>()
useUniversalFetch(async () => {
  data.value = await apiClient.post.getPost(
    route.params.category as string,
    route.params.slug as string,
  )
})

providePostContext(data)
</script>

<template>
  <YunBase>
    <template v-if="data" #content>
      <main text="left" m="auto" p="t-0 b-2">
        <div flex="~ 1 col" w="full" p="l-4 lt-md:0" class="content">
          <slot name="header">
            <YunPageHeader :title="data?.title" />
            <YunPostMeta :frontmatter="data" mt="4"> </YunPostMeta>
          </slot>

          <slot name="content">
            <div mt="4">
              <router-view />
            </div>
          </slot>

          <YunSponsor v-if="config.sponsor.enable" />
          <ValaxyCopyright v-if="data.copyright" :url="url" m="y-4" />
        </div>
      </main>
    </template>
  </YunBase>
</template>
