import { useRoute } from 'vue-router'

import type { PaginateResult, PostModel } from '@mx-space/api-client'

import { apiClient } from '~/utils'

export const useHomeStore = defineStore('home', () => {
  const homePostListData = ref<PaginateResult<PostModel>>()
  const route = useRoute()
  return {
    homePostListData,
    async fetchHomePostList() {
      const data = await apiClient.post.getList(
        parseInt((route.query.page as any) ?? '') || 1,
        parseInt((route.query.size as any) ?? '') || 10,
      )

      homePostListData.value = data
    },
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useHomeStore, import.meta.hot))
