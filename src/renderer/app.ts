import '@unocss/reset/tailwind.css'
import '../styles/index.scss'
import 'uno.css'

import { createSSRApp, defineComponent, h } from 'vue'
import { createI18n } from 'vue-i18n'

import { createHead } from '@vueuse/head'

import { router } from '~/router'

import { setPageContext } from '../composables/use-page-context'
import App from './App.vue'
import type { PageContext } from './types'
// @ts-expect-error
import messages from '/@locales/messages'

export const head = createHead()

export const pinia = createPinia()
export function createApp(pageContext: PageContext) {
  const { Page, pageProps } = pageContext
  const PageWithLayout = defineComponent({
    render() {
      return h(
        App,
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
  app.use(router)
  app.use(pinia)

  if (!import.meta.env.SSR)
    pinia.state.value = pageContext.pageProps.pinia || {}
  else pageContext.pageProps.pinia = pinia.state.value

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
