<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'

import { useLayout } from '~/composables'
import { useAppStore } from '~/stores/app'

const app = useAppStore()

const isHome = useLayout('home')
console.log(useRouter().getRoutes())
</script>

<template>
  <main
    class="yun-main justify-center items-center"
    :class="isHome && !app.isSidebarOpen && '!pl-0'"
    flex="~ col"
    w="full"
  >
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
