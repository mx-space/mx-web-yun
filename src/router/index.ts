import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
} from 'vue-router'

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

router.beforeEach((to, from) => {
  if (to.path !== from.path && !import.meta.env.SSR)
    window.scrollTo({ top: 0, behavior: 'smooth' })
})
