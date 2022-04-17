import type { TimelineData } from '@mx-space/api-client'
import { TimelineType } from '@mx-space/api-client'

import { apiClient } from '~/utils'

interface MapType {
  title: string
  meta: string[]
  date: Date
  href: string
  as: string
  id: string
  important?: boolean
}

export const useTimelineStore = defineStore('timeline', () => {
  const timelineData = ref({ posts: [] } as TimelineData)
  const sortedMap = reactive(new Map<number, MapType[]>())
  const sortedYears = computed(() => {
    sortedMap.clear()
    timelineData.value.posts?.forEach((post) => {
      const date = new Date(post.created)
      const year = date.getFullYear()
      const data = {
        title: post.title,
        meta: [post.category.name, '博文'],
        date,
        as: `/posts/${post.category.slug}/${post.slug}`,
        href: '/posts/[category]/[slug]',

        id: post.id,
      }
      sortedMap.set(
        year,
        sortedMap.get(year) ? sortedMap.get(year)!.concat(data) : [data],
      )
    })

    return [...sortedMap.keys()]
  })

  return {
    sortedMap,
    timelineData,
    async fetch() {
      const { data } = await apiClient.aggregate.getTimeline({
        sort: 'desc',
        type: TimelineType.Post,
      })

      timelineData.value = data

      return data
    },

    sortedYears,
  }
})
