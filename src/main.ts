import { cloneDeep, mergeWith } from 'lodash'
import viteSSR from 'vite-ssr'

import App from './app/App.vue'
import { head, initApp } from './app/app'
import { defaultThemeConfig } from './config.default'
import { routes } from './router/route'
import { apiClient } from './utils'

const fetchAggregateData = async () => {
  const fetchThemeConfig = apiClient.snippet
    .getByReferenceAndName('theme', 'yun')
    .catch(() => null)

  const fetchAggregateData = apiClient.aggregate.getAggregateData()

  const [themeConfig, aggregateData] = await Promise.allSettled([
    fetchThemeConfig,
    fetchAggregateData,
  ])

  if (aggregateData.status === 'rejected') throw aggregateData.reason

  return {
    themeConfig: mergeWith(
      cloneDeep(defaultThemeConfig),
      themeConfig.status === 'fulfilled' ? themeConfig.value : {},
      (old, newer) => {
        // 数组不合并
        if (Array.isArray(old)) return newer
      },
    ),
    aggregateData: aggregateData.value,
  }
}

export default viteSSR(
  App,
  { routes },
  async ({
    app,
    initialState,
    router,
    // url,
    // isClient,
    // initialRoute,
    // request,
  }) => {
    initApp(app, initialState)

    const { themeConfig, aggregateData } = await fetchAggregateData()

    const pageProps = {
      web: 'yun',

      themeConfig,
      aggregateData,
    }
    initialState.pageProps = pageProps
    // app.component(ClientOnly.name, ClientOnly)
    router.beforeEach((to, from) => {
      if (to.path !== from.path && !import.meta.env.SSR)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
    return { head }
  },
)
