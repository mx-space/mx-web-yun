import { acceptHMRUpdate, defineStore } from 'pinia'

import type { PostModel } from '@mx-space/api-client'

import type { Id } from '~/types/shared'
import { apiClient } from '~/utils'

export const usePageStore = defineStore('page', () => {
  const pageDataMap = new Map<Id, PostModel>()
  const slugToId = new Map<string, Id>()

  return {
    pageDataMap,
    async fetchPage(slug: string, force = false) {
      const joint = `/${slug}`

      if (!force) {
        const id = slugToId.get(joint)
        const data = id ? pageDataMap.get(id) : null
        if (data) return data
      }

      const data = await apiClient.page.getBySlug(slug)

      slugToId.set(joint, data.id)
      return data
    },
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
