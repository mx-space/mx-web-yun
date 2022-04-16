import { useRoute } from 'vue-router'

import { isClient } from '@vueuse/core'

import { useAggregateData } from './use-page-context'

export function useFullUrl() {
  const config = useAggregateData()
  const route = useRoute()
  const url = computed(() => {
    const siteUrl = config!.url.webUrl.endsWith('/')
      ? config!.url.webUrl.slice(0, -1)
      : config!.url.webUrl
    const origin = siteUrl || (isClient && window.location.origin)
    return origin + route.path
  })
  return url
}
