<script lang="ts" setup>
import { useThemeConfig } from '~/composables'
import { useFullUrl } from '~/composables/use-full-url'
import { usePostStore } from '~/stores/post'

const config = useThemeConfig()

const url = useFullUrl()
const store = usePostStore()
const data = computed(() => store.currentPostData)
</script>

<template>
  <YunBase>
    <template #header>
      <div></div>
    </template>
    <template #content>
      <main text="left" m="auto" p="t-0 b-2">
        <router-view v-slot="{ Component }">
          <Transition appear>
            <component :is="Component" />
          </Transition>
        </router-view>
        <YunSponsor v-if="config.sponsor.enable" />
      </main>
    </template>
  </YunBase>
</template>
