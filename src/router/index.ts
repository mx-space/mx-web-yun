import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
} from 'vue-router'

import { springScrollToTop } from '~/utils/spring'

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

router.afterEach(() => {
  springScrollToTop()
})
