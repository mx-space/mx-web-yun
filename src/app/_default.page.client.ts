import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'
import { getPage } from 'vite-plugin-ssr/client'

import { globalState } from '~/app/app'
import { router } from '~/router'

import { createApp } from './app'
import type { PageContext } from './types'

hydrate()

async function hydrate() {
  // We do Server Routing, but we can also do Client Routing by using `useClientRouter()`
  // instead of `getPage()`, see https://vite-plugin-ssr.com/useClientRouter
  const pageContext = await getPage<PageContextBuiltInClient & PageContext>()

  const app = createApp(pageContext)
  await router.isReady()
  app.mount('#app').$nextTick(() => {
    globalState.setHydrate()
  })
}
