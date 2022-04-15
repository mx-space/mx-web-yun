import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'

import { renderToString } from '@vue/server-renderer'
import { renderHeadToString } from '@vueuse/head'

import { createApp, head } from './app'
import type { PageContext } from './types'

export { render }
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname']

async function render(pageContext: PageContextBuiltIn & PageContext) {
  const app = createApp(pageContext)
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

  return {
    documentHtml,
    pageContext: {
      pageProps: {
        a: 1,
      },
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  }
}
