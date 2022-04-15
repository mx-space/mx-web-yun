<script lang="ts" setup>
import { providePageProps } from '~/composables/use-page-context'

import YunSidebar from '../components/yun/YunSidebar.vue'

const props = defineProps<{ pageProps: any }>()
providePageProps(props.pageProps)
</script>

<template>
  <aside class="va-card transition sidebar !md:transform !md:translate-x-0">
    <YunSidebar />
  </aside>

  <slot />
</template>
