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
      },
    ],
  },
  {
    path: '/:page',
    component: () => import('../layouts/post.vue'),
    children: [
      {
        path: '',
        component: () => import('../pages/[page]/index.page.vue'),
        meta: {
          layout: 'post',
        },
      },
    ],
  },

  {
    path: '/posts',
    component: () => import('../layouts/post.vue'),
    children: [
      {
        path: ':category/:slug',
        component: () =>
          import('../pages/posts/[category]/[slug]/index.page.vue'),
        meta: {
          layout: 'post',
        },
      },
    ],
  },
  // archives
  {
    path: '/archives',
    component: () => import('../layouts/archives.vue'),
    children: [
      {
        path: '',
        component: () => import('../pages/timeline/index.vue'),
        meta: {
          layout: 'archives',
        },
      },
    ],
  },
  {
    path: '/timeline',
    component: () => import('../layouts/archives.vue'),
    children: [
      {
        path: '',
        component: () => import('../pages/timeline/index.vue'),
        meta: {
          layout: 'archives',
        },
      },
    ],
  },
]
