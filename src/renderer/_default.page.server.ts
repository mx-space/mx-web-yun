import { cloneDeep, mergeWith } from 'lodash'
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'

import { renderToString } from '@vue/server-renderer'
import { renderHeadToString } from '@vueuse/head'

import { defaultThemeConfig } from '~/config.default'
import { apiClient } from '~/utils/api-client'

import { createApp, head, router } from './app'
import type { PageContext } from './types'

// See https://vite-plugin-ssr.com/data-fetching

export const passToClient = ['pageProps', 'urlPathname']

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

export async function render(pageContext: PageContextBuiltIn & PageContext) {
  const { themeConfig, aggregateData } = await fetchAggregateData()

  const pageProps = {
    web: 'yun',

    pinia: {},

    themeConfig,
    aggregateData,
  }
  const app = createApp({ ...pageContext, pageProps })
  const appHtml = await renderToString(app)

  const { headTags, htmlAttrs, bodyAttrs } = renderHeadToString(head)

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en" ${dangerouslySkipEscape(htmlAttrs)}>
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${dangerouslySkipEscape(headTags)}
      </head>
      <body ${dangerouslySkipEscape(bodyAttrs)}>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`

  router.push(pageContext.url)
  await router.isReady()

  return {
    documentHtml,
    pageContext: {
      pageProps,

      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  }
}
