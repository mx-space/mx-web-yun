import type { PageContextBuiltIn } from 'vite-plugin-ssr'

import { generatePropsObject } from '~/utils'
import { apiClient } from '~/utils/api-client'

export async function onBeforeRender(pageContext: PageContextBuiltIn) {
  const data = await apiClient.post.getList(
    parseInt(pageContext.urlParsed.search?.size ?? '') || 10,
    parseInt(pageContext.urlParsed.search?.page ?? '') || 1,
  )

  return generatePropsObject(pageContext, data)
}