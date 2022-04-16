// Hook `usePageContext()` to make `pageContext` available from any Vue component.
// See https://vite-plugin-ssr.com/pageContext-anywhere
import { cloneDeep } from 'lodash'
import { inject } from 'vue'
import type { App, InjectionKey, Ref } from 'vue'

import { defaultThemeConfig } from '~/config.default'

import type { PageContext, PageProps } from '../renderer/types'

const pageContextKey: InjectionKey<PageContext> = Symbol('page-context')

const pagePropsKey: InjectionKey<Ref<PageProps>> = Symbol('page-props')

export function usePageContext() {
  const pageContext = inject(pageContextKey)
  return pageContext as PageContext
}

export function setPageContext(app: App, pageContext: PageContext) {
  app.provide(pageContextKey, pageContext)
}
const refData = ref<PageProps>()
export const providePageProps = (pageProps: PageContext['pageProps']) => {
  refData.value = cloneDeep(pageProps)
  provide(pagePropsKey, refData)
}

export const useAggregateData = () => {
  return inject(pagePropsKey)?.value?.aggregateData
}

export const useThemeConfig = () => {
  return (
    inject(pagePropsKey)?.value?.themeConfig || cloneDeep(defaultThemeConfig)
  )
}

export const usePageProps = <T>() => {
  return inject(pagePropsKey)?.value?.pageProps as T
}

export const getPagePropsRef = () => {
  return refData
}
