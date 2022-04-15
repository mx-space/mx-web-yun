import '@unocss/reset/tailwind.css'
import 'uno.css'
import '../styles/index.scss'

import { createSSRApp, defineComponent, h } from 'vue'
import { createI18n } from 'vue-i18n'

import { createHead } from '@vueuse/head'

import { setPageContext } from '../composables/use-page-context'
import BaseLayout from '../layouts/base.vue'
import type { PageContext } from './types'
// @ts-expect-error
import messages from '/@locales/messages'

export const head = createHead()

export function createApp(pageContext: PageContext) {
  const { Page, pageProps } = pageContext
  const PageWithLayout = defineComponent({
    render() {
      return h(
        BaseLayout,
        {},
        {
          default() {
            return h(Page, pageProps || {})
          },
        },
      )
    },
  })

  const app = createSSRApp(PageWithLayout, {
    pageProps: pageContext.pageProps,
  })

  const locale = useStorage('yun-locale', 'cn')
  app.use(head)
  // init i18n, by valaxy config
  const i18n = createI18n({
    legacy: false,
    locale: locale.value,
    messages,
  })
  app.use(i18n)

  // Make `pageContext` available from any Vue component
  setPageContext(app, pageContext)

  return app
}
