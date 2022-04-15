import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'
import { getPage } from 'vite-plugin-ssr/client'
import { useClientRouter } from 'vite-plugin-ssr/client/router'

import { createApp, router } from './app'
import type { PageContext } from './types'

hydrate()

async function hydrate() {
  // We do Server Routing, but we can also do Client Routing by using `useClientRouter()`
  // instead of `getPage()`, see https://vite-plugin-ssr.com/useClientRouter
  const pageContext = await getPage<PageContextBuiltInClient & PageContext>()

  const app = createApp(pageContext)
  await router.isReady()
  app.mount('#app')
}

const { hydrationPromise } = useClientRouter({
  async render() {},

  // If `ensureHydration: true` then `vite-plugin-ssr` ensures that the first render is always
  // a hydration. (In other words, the hydration process is never interrupted — even if the
  // user clicks on a link before the hydration started. Default value: `false`.)
  // If we use Vue, we need `ensureHydration: true` to avoid "Hydration Mismatch" errors.
  // If we use React, we can leave `ensureHydration: false` for a slight performance improvement.
  ensureHydration: true,

  // See `Link prefetching` section below. Default value: `false`.
  prefetchLinks: true,
})
