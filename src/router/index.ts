import { navigate } from 'vite-plugin-ssr/client/router'
import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
} from 'vue-router'

import { isClient } from '@vueuse/core'

import { routes } from './route'

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  })
}

export const router = createRouter()

router.beforeResolve(async (to, from, next) => {
  if (isClient) return await navigate(to.fullPath).then(next)

  next()
})
