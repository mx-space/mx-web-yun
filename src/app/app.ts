import '@unocss/reset/tailwind.css'

import { createHead } from '@vueuse/head'

import 'star-markdown-css'
import 'uno.css'

import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

import '../styles/index.scss'

import { createGlobalState } from './state'
// @ts-expect-error
import messages from '/@locales/messages'

export const head = createHead()
export const pinia = createPinia()
export const globalState = createGlobalState()

export function initApp(app: App<Element>, initialState: any) {
  const locale = useStorage('yun-locale', 'cn')
  app.use(head)

  app.use(pinia)
  app.use(globalState)

  if (!import.meta.env.SSR) pinia.state.value = initialState.pinia || {}
  else initialState.pinia = pinia.state.value

  // init i18n, by valaxy config
  const i18n = createI18n({
    legacy: false,
    locale: locale.value,
    messages,
  })
  app.use(i18n)

  return app
}
