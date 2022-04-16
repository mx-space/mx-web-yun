import type { AggregateRoot } from '@mx-space/api-client'

import type { ThemeConfig } from '~/types/config'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type PageProps = {
  aggregateData: AggregateRoot
  themeConfig: ThemeConfig

  pageProps?: any
} & Record<string, any>
// The `pageContext` that are available in both on the server-side and browser-side
export interface PageContext {
  Page: any
  pageProps: PageProps
  documentProps?: {
    title?: string
    description?: string
  }
}
