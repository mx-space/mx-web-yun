<script lang="ts" setup>
import { navigate } from 'vite-plugin-ssr/client/router'
import { useRoute, useRouter } from 'vue-router'

import { useLayout } from '~/composables'
import { useAppStore } from '~/stores/app'

const app = useAppStore()

const isHome = useLayout('home')

const router = useRouter()
const a = () => {
  navigate('/posts/programming/remix-get-initial-data-for-root')
  router.push('/posts/programming/remix-get-initial-data-for-root')
}
</script>

<template>
  <main
    class="yun-main justify-center items-center"
    :class="isHome && !app.isSidebarOpen && '!pl-0'"
    flex="~ col"
    w="full"
  >
    <button @click="a">a</button>
    <ValaxySidebar>
      <slot name="sidebar">
        <YunSidebar />
      </slot>
    </ValaxySidebar>

    <YunBanner />
    <YunSay w="full" />

    <slot name="board" />

    <router-view />

    <ValaxyFooter>
      <slot name="footer" />
    </ValaxyFooter>
  </main>
</template>
