<script setup lang="ts">
import { RequestError } from '@mx-space/api-client'
import { useHead } from '@vueuse/head'

import { providePageProps } from '~/composables/use-page-context'

import ErrorPage from './_error.page.vue'
import { useGlobalState } from './state'
import type { PageProps } from './types'

const props = defineProps<{ pageProps: PageProps }>()

providePageProps(props.pageProps)

const seo = props.pageProps.aggregateData.seo
useHead({
  title: seo.title,
  meta: [{ name: 'description', content: seo.description }],
})

const _error = ref<Error>()

const globalState = useGlobalState()

const error = computed(
  () => _error.value || (globalState.renderError.value as any as Error),
)

// TODO
onErrorCaptured((errorCatch) => {
  _error.value = errorCatch

  return false
})

const cleanError = () => {
  _error.value = undefined

  globalState.setRenderError(undefined)
}

const is404 = computed(() => {
  const err = error.value

  if (err instanceof RequestError && err.status === 404) return true

  return false
})
</script>

<template>
  <router-view v-if="!_error" />
  <div v-else>
    <ErrorPage :error="error" :on-error-handled="cleanError" :is404="is404">
    </ErrorPage>
  </div>
</template>
