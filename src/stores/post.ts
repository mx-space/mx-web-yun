import { acceptHMRUpdate, defineStore } from 'pinia'

import type { PostModel } from '@mx-space/api-client'

import type { Id } from '~/types/shared'
import { apiClient } from '~/utils'

export const usePostStore = defineStore('post', () => {
  const currentPostData = ref(null as PostModel | null)

  const postDataMap = new Map<Id, PostModel>()
  const slugToId = new Map<string, Id>()

  return {
    postDataMap,
    async fetchPost(category: string, slug: string, force = false) {
      const joint = `${category}/${slug}`

      if (!force) {
        const id = slugToId.get(joint)
        const data = id ? postDataMap.get(id) : null
        if (data) return data
      }

      const data = await apiClient.post.getPost(category, slug)

      postDataMap.set(data.id, { ...data })
      slugToId.set(joint, data.id)
      return data
    },
    currentPostData,
    setCurrentPostData(data: PostModel) {
      currentPostData.value = data
    },
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))
