<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { providePageProps } from '~/composables/use-page-context'

import type { PageProps } from './types'

const props = defineProps<{ pageProps: PageProps }>()

providePageProps(props.pageProps)

const seo = props.pageProps.aggregateData.seo
useHead({
  title: seo.title,
  meta: [{ name: 'description', content: seo.description }],
})

// TODO
onErrorCaptured((error) => {
  console.log('error--', error)

  return false
})
</script>

<template>
  <router-view />
</template>
