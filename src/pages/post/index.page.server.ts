import type { PageContextBuiltIn } from 'vite-plugin-ssr'

import { generatePropsObject } from '~/utils'
import { apiClient } from '~/utils/api-client'

export async function onBeforeRender(pageContext: PageContextBuiltIn) {
  console.log(pageContext.routeParams)

  return generatePropsObject(pageContext, {})
}
