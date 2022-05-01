import { useContext } from 'vite-ssr'

import { defaultThemeConfig } from '~/config.default'

import type { PageProps } from '../app/types'

export function usePageContext() {
  return useContext().initialState.pageProps as PageProps
}

export const useAggregateData = () => {
  return usePageContext().aggregateData
}

export const useThemeConfig = () => {
  return usePageContext().themeConfig || defaultThemeConfig
}
