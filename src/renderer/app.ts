import '@unocss/reset/tailwind.css'
import 'uno.css'
import '../styles/index.scss'

import { createSSRApp, defineComponent, h } from 'vue'
import { createI18n } from 'vue-i18n'

import BaseLayout from '../layouts/base.vue'
import type { PageContext } from './types'
import { setPageContext } from './usePageContext'
// @ts-expect-error
import messages from '/@locales/messages'

export { createApp }

function createApp(pageContext: PageContext) {
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

  const app = createSSRApp(PageWithLayout)
  const locale = useStorage('valaxy-locale', 'cn')

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
