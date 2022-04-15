import type { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string
  }
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/home.vue'),
    children: [
      {
        path: '/',
        component: () => import('../pages/index/index.page.vue'),
        meta: {
          layout: 'home',
        },
        props: true,
      },
    ],
  },
]
